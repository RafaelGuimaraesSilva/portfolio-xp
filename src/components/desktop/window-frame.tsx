"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { APP_DEFS } from "@/lib/apps";
import { TASKBAR_HEIGHT, type Rect } from "@/lib/wm/reducer";
import type { WindowState } from "@/lib/wm/types";
import { ArchIcon } from "@/components/icons/arch-icons";
import { AppHost } from "@/components/apps/app-host";
import { useWindowManager } from "./window-manager";
import { useSound } from "./sound";
import { usePrefersReducedMotion } from "@/lib/hooks";

const RESIZE_HANDLES = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
] as const;

type DragSession = {
  pointerId: number;
  startX: number;
  startY: number;
  origin: Rect;
  latest: Rect;
};

type ResizeSession = {
  pointerId: number;
  dir: string;
  startX: number;
  startY: number;
  origin: Rect;
  latest: Rect;
};

export function WindowFrame({ win, active }: { win: WindowState; active: boolean }) {
  const { focus, close, minimize, toggleMax, move, resize } = useWindowManager();
  const { play } = useSound();
  const reducedMotion = usePrefersReducedMotion();
  const def = APP_DEFS[win.app];

  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragSession | null>(null);
  const resizeRef = useRef<ResizeSession | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    play("open");
  }, [play]);

  useEffect(() => {
    if (win.minimized) return;
    const frame = frameRef.current;
    if (!frame) return;
    if (frame.contains(document.activeElement)) return;
    frame.focus({ preventScroll: true });
  }, [win.minimized]);

  const schedule = useCallback((fn: () => void) => {
    pendingRef.current = fn;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const next = pendingRef.current;
        pendingRef.current = null;
        next?.();
      });
    }
  }, []);

  const flush = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const next = pendingRef.current;
    pendingRef.current = null;
    next?.();
  }, []);

  const onTitlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    focus(win.id);
    if (win.maximized) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: win.rect,
      latest: win.rect,
    };
  };

  const onTitlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const next: Rect = {
      ...drag.origin,
      x: drag.origin.x + (event.clientX - drag.startX),
      y: drag.origin.y + (event.clientY - drag.startY),
    };
    drag.latest = next;
    schedule(() => move(win.id, next.x, next.y));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    flush();
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onTitleDoubleClick = () => {
    if (!def.resizable) return;
    focus(win.id);
    toggleMax(win.id);
  };

  const onHandlePointerDown =
    (dir: string) => (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.stopPropagation();
      focus(win.id);
      event.currentTarget.setPointerCapture(event.pointerId);
      resizeRef.current = {
        pointerId: event.pointerId,
        dir,
        startX: event.clientX,
        startY: event.clientY,
        origin: win.rect,
        latest: win.rect,
      };
    };

  const onHandlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = resizeRef.current;
    if (!session || session.pointerId !== event.pointerId) return;
    const dx = event.clientX - session.startX;
    const dy = event.clientY - session.startY;
    const minW = def.minW ?? 340;
    const minH = def.minH ?? 220;
    let { x, y, w, h } = session.origin;

    if (session.dir.includes("e")) w = Math.max(minW, session.origin.w + dx);
    if (session.dir.includes("s")) h = Math.max(minH, session.origin.h + dy);
    if (session.dir.includes("w")) {
      w = Math.max(minW, session.origin.w - dx);
      x = session.origin.x + (session.origin.w - w);
    }
    if (session.dir.includes("n")) {
      h = Math.max(minH, session.origin.h - dy);
      y = session.origin.y + (session.origin.h - h);
    }

    const next = { x, y, w, h };
    session.latest = next;
    schedule(() => resize(win.id, next));
  };

  const endResize = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = resizeRef.current;
    if (!session || session.pointerId !== event.pointerId) return;
    flush();
    resizeRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClose = () => {
    play("close");
    close(win.id);
  };

  const handleMinimize = () => {
    play("minimize");
    const el = frameRef.current;
    const target = document.querySelector<HTMLElement>(
      `[data-taskbar-window="${win.id}"]`,
    );

    if (!el || !target || reducedMotion) {
      minimize(win.id);
      return;
    }

    const from = el.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const animation = el.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.08)`, opacity: 0.2 },
      ],
      {
        duration: 220,
        easing: "cubic-bezier(.4, 0, .85, .4)",
        fill: "forwards",
      },
    );
    animation.onfinish = () => {
      animation.cancel();
      minimize(win.id);
    };
    animation.oncancel = () => minimize(win.id);
  };

  const style: CSSProperties = win.maximized
    ? {
        left: 0,
        top: TASKBAR_HEIGHT,
        width: "100%",
        height: `calc(100% - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.z,
        borderRadius: 0,
      }
    : {
        left: win.rect.x,
        top: win.rect.y,
        width: win.rect.w,
        height: win.rect.h,
        zIndex: win.z,
      };

  if (win.minimized) {
    style.display = "none";
  }

  return (
    <div
      ref={frameRef}
      className={`arch-window${active ? " is-active" : ""}${
        win.maximized ? " is-max" : ""
      }`}
      style={style}
      role="dialog"
      aria-label={win.title}
      tabIndex={-1}
      onPointerDown={() => focus(win.id)}
    >
      <div
        className="arch-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onTitleDoubleClick}
      >
        <ArchIcon name={win.icon} size={16} className="arch-titlebar-icon" />
        <span className="arch-titlebar-title">{win.title}</span>
        <div className="arch-titlebar-buttons">
          <button
            type="button"
            className="arch-tb-btn"
            aria-label={`Minimizar ${win.title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={handleMinimize}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 7h6" />
            </svg>
          </button>
          {def.resizable ? (
            <button
              type="button"
              className="arch-tb-btn"
              aria-label={win.maximized ? "Restaurar" : "Maximizar"}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => toggleMax(win.id)}
            >
              {win.maximized ? (
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <rect x="1.5" y="3.5" width="5" height="5" />
                  <path d="M3.5 3V1.5h5v5H7" />
                </svg>
              ) : (
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <rect x="2" y="2" width="6" height="6" />
                  <path d="M2 2h6" strokeWidth="2.4" />
                </svg>
              )}
            </button>
          ) : null}
          <button
            type="button"
            className="arch-tb-btn close"
            aria-label={`Fechar ${win.title}`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={handleClose}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 2l6 6M8 2 2 8" />
            </svg>
          </button>
        </div>
      </div>

      <div className="arch-window-body">
        <div className="arch-content">
          <AppHost win={win} />
        </div>
      </div>

      {def.resizable && !win.maximized
        ? RESIZE_HANDLES.map((dir) => (
            <div
              key={dir}
              className={`arch-rz arch-rz-${dir}`}
              aria-hidden="true"
              onPointerDown={onHandlePointerDown(dir)}
              onPointerMove={onHandlePointerMove}
              onPointerUp={endResize}
              onPointerCancel={endResize}
            />
          ))
        : null}
    </div>
  );
}
