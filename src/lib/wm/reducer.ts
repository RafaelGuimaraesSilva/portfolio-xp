import { APP_DEFS } from "@/lib/apps";
import { PROJECTS } from "@/lib/site";
import type { Rect, Viewport, WMState, WindowAction } from "./types";

export const TASKBAR_HEIGHT = 34;
export const MIN_WINDOW_W = 340;
export const MIN_WINDOW_H = 220;

export function windowId(app: string, payload?: string) {
  return payload ? `${app}:${payload}` : app;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function initialWMState(): WMState {
  return { windows: [], nextZ: 10 };
}

function fitRect(rect: Rect, viewport: Viewport, minW: number, minH: number): Rect {
  const w = clamp(rect.w, minW, Math.max(minW, viewport.w - 8));
  const h = clamp(rect.h, minH, Math.max(minH, viewport.h - TASKBAR_HEIGHT - 8));
  return {
    x: clamp(rect.x, 0, Math.max(0, viewport.w - w)),
    y: clamp(rect.y, TASKBAR_HEIGHT, Math.max(TASKBAR_HEIGHT, viewport.h - h)),
    w,
    h,
  };
}

export function wmReducer(state: WMState, action: WindowAction): WMState {
  switch (action.type) {
    case "open": {
      const id = windowId(action.app, action.payload);
      const existing = state.windows.find((w) => w.id === id);

      if (existing) {
        return {
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: false, z: state.nextZ } : w,
          ),
          nextZ: state.nextZ + 1,
        };
      }

      const def = APP_DEFS[action.app];
      const project = PROJECTS.find((p) => p.id === action.payload);
      const offset = (state.windows.length % 6) * 26;
      const { w: vw, h: vh } = action.viewport;
      const width = Math.min(def.w, Math.max(MIN_WINDOW_W, vw - 48));
      const height = Math.min(
        def.h,
        Math.max(MIN_WINDOW_H, vh - TASKBAR_HEIGHT - 48),
      );
      const x = clamp(
        Math.round((vw - width) / 2) + offset - 40,
        8,
        Math.max(8, vw - width - 8),
      );
      const y = clamp(
        TASKBAR_HEIGHT + Math.round((vh - TASKBAR_HEIGHT - height) / 2) + offset - 30,
        TASKBAR_HEIGHT + 8,
        Math.max(TASKBAR_HEIGHT + 8, vh - height - 8),
      );

      const win = {
        id,
        app: action.app,
        title: action.app === "project" && project ? project.name : def.title,
        icon: def.icon,
        rect: { x, y, w: width, h: height },
        z: state.nextZ,
        minimized: false,
        maximized: false,
        payload: action.payload,
      };

      return { windows: [...state.windows, win], nextZ: state.nextZ + 1 };
    }

    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };

    case "focus": {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win || win.z === state.nextZ - 1) return state;
      return {
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, z: state.nextZ } : w,
        ),
        nextZ: state.nextZ + 1,
      };
    }

    case "minimize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w,
        ),
      };

    case "restore":
      return {
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, minimized: false, z: state.nextZ }
            : w,
        ),
        nextZ: state.nextZ + 1,
      };

    case "toggleMax": {
      const { w: vw, h: vh } = action.viewport;
      return {
        nextZ: state.nextZ,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized) {
            return {
              ...w,
              maximized: false,
              rect: w.restoreRect ?? w.rect,
              restoreRect: undefined,
            };
          }
          return {
            ...w,
            maximized: true,
            restoreRect: w.rect,
            rect: { x: 0, y: TASKBAR_HEIGHT, w: vw, h: vh - TASKBAR_HEIGHT },
          };
        }),
      };
    }

    case "move": {
      const { w: vw, h: vh } = action.viewport;
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id || w.maximized) return w;
          const x = clamp(action.x, -w.rect.w + 120, Math.max(0, vw - 80));
          const y = clamp(
            action.y,
            TASKBAR_HEIGHT,
            Math.max(TASKBAR_HEIGHT, vh - 34),
          );
          if (x === w.rect.x && y === w.rect.y) return w;
          return { ...w, rect: { ...w.rect, x, y } };
        }),
      };
    }

    case "resize": {
      const { w: vw, h: vh } = action.viewport;
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id || w.maximized) return w;
          const def = APP_DEFS[w.app];
          const minW = def.minW ?? MIN_WINDOW_W;
          const minH = def.minH ?? MIN_WINDOW_H;
          const next: Rect = {
            x: clamp(action.rect.x, 0, Math.max(0, vw - minW)),
            y: clamp(
              action.rect.y,
              TASKBAR_HEIGHT,
              Math.max(TASKBAR_HEIGHT, vh - minH),
            ),
            w: clamp(action.rect.w, minW, Math.max(minW, vw - action.rect.x)),
            h: clamp(
              action.rect.h,
              minH,
              Math.max(minH, vh - action.rect.y),
            ),
          };
          return { ...w, rect: next };
        }),
      };
    }

    case "clamp": {
      const { viewport } = action;
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.maximized) {
            return {
              ...w,
              rect: {
                x: 0,
                y: TASKBAR_HEIGHT,
                w: viewport.w,
                h: viewport.h - TASKBAR_HEIGHT,
              },
            };
          }
          const def = APP_DEFS[w.app];
          return {
            ...w,
            rect: fitRect(
              w.rect,
              viewport,
              def.minW ?? MIN_WINDOW_W,
              def.minH ?? MIN_WINDOW_H,
            ),
          };
        }),
      };
    }

    default:
      return state;
  }
}

export type { Rect, Viewport };
