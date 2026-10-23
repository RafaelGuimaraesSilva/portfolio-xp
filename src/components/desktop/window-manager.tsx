"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  initialWMState,
  wmReducer,
  type Rect,
} from "@/lib/wm/reducer";
import type { AppId, WindowState } from "@/lib/wm/types";

type WindowManagerValue = {
  windows: WindowState[];
  topId: string | null;
  activeWindow: WindowState | null;
  open: (app: AppId, payload?: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, rect: Rect) => void;
  toggleFromTaskbar: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

function viewport() {
  if (typeof window === "undefined") return { w: 1280, h: 800 };
  return { w: window.innerWidth, h: window.innerHeight };
}

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wmReducer, undefined, initialWMState);

  const open = useCallback(
    (app: AppId, payload?: string) =>
      dispatch({ type: "open", app, payload, viewport: viewport() }),
    [],
  );
  const close = useCallback((id: string) => dispatch({ type: "close", id }), []);
  const focus = useCallback((id: string) => dispatch({ type: "focus", id }), []);
  const minimize = useCallback(
    (id: string) => dispatch({ type: "minimize", id }),
    [],
  );
  const restore = useCallback(
    (id: string) => dispatch({ type: "restore", id }),
    [],
  );
  const toggleMax = useCallback(
    (id: string) => dispatch({ type: "toggleMax", id, viewport: viewport() }),
    [],
  );
  const move = useCallback(
    (id: string, x: number, y: number) =>
      dispatch({ type: "move", id, x, y, viewport: viewport() }),
    [],
  );
  const resize = useCallback(
    (id: string, rect: Rect) =>
      dispatch({ type: "resize", id, rect, viewport: viewport() }),
    [],
  );

  const topId = useMemo(() => {
    const visible = state.windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((top, w) => (w.z > top.z ? w : top)).id;
  }, [state.windows]);

  const activeWindow = useMemo(
    () => state.windows.find((w) => w.id === topId) ?? null,
    [state.windows, topId],
  );

  const toggleFromTaskbar = useCallback(
    (id: string) => {
      const win = state.windows.find((w) => w.id === id);
      if (!win) return;
      if (win.minimized) {
        dispatch({ type: "restore", id });
      } else if (id === topId) {
        dispatch({ type: "minimize", id });
      } else {
        dispatch({ type: "focus", id });
      }
    },
    [state.windows, topId],
  );

  useEffect(() => {
    const onResize = () => dispatch({ type: "clamp", viewport: viewport() });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && topId) {
        const target = event.target as HTMLElement | null;
        if (target?.closest("[data-ignore-escape]")) return;
        dispatch({ type: "close", id: topId });
        return;
      }

      if (!event.metaKey) return;
      const key = event.key.toLowerCase();

      if (key === "enter") {
        event.preventDefault();
        open("cmd");
      } else if (key === "q" && topId) {
        event.preventDefault();
        dispatch({ type: "close", id: topId });
      } else if (key === "e") {
        event.preventDefault();
        open("projects");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [topId, open]);

  const value = useMemo<WindowManagerValue>(
    () => ({
      windows: state.windows,
      topId,
      activeWindow,
      open,
      close,
      focus,
      minimize,
      restore,
      toggleMax,
      move,
      resize,
      toggleFromTaskbar,
    }),
    [
      state.windows,
      topId,
      activeWindow,
      open,
      close,
      focus,
      minimize,
      restore,
      toggleMax,
      move,
      resize,
      toggleFromTaskbar,
    ],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used inside WindowManagerProvider");
  }
  return ctx;
}
