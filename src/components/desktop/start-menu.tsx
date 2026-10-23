"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { START_PROGRAMS } from "@/lib/apps";
import { SITE } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "./window-manager";
import { useSound } from "./sound";
import { useShell } from "./shell-context";
import type { AppId } from "@/lib/wm/types";
import type { IconName } from "@/lib/icons";

const PROGRAM_ICONS: Record<string, IconName> = {
  computer: "user",
  projects: "projects",
  stack: "stack",
  contact: "mail",
  cmd: "terminal",
  run: "search",
  mine: "mine",
  recycle: "trash",
  winver: "info",
  help: "help",
};

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { open } = useWindowManager();
  const { play, enabled, toggle } = useSound();
  const { theme, setTheme, logoff, shutdown } = useShell();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return START_PROGRAMS;
    return START_PROGRAMS.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.app.toLowerCase().includes(term),
    );
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (ref.current?.contains(target)) return;
      if (target.closest("[data-start-button]")) return;
      onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const launch = (app: AppId) => {
    play("click");
    open(app);
    onClose();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = results[selected];
      if (item) launch(item.app);
    }
  };

  return (
    <div
      className="arch-launcher"
      ref={ref}
      data-ignore-escape
      role="dialog"
      aria-label="Launcher de aplicativos"
    >
      <div className="arch-launcher-search">
        <span className="arch-launcher-prompt" aria-hidden="true">
          ❯
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Buscar aplicativos…"
          aria-label="Buscar aplicativos"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd>Esc</kbd>
      </div>

      <div className="arch-launcher-list" role="listbox" aria-label="Aplicativos">
        {results.length ? (
          results.map((item, index) => (
            <button
              key={item.app}
              type="button"
              role="option"
              aria-selected={index === selected}
              className={`arch-launcher-item${
                index === selected ? " is-selected" : ""
              }`}
              onMouseEnter={() => setSelected(index)}
              onClick={() => launch(item.app)}
            >
              <ArchIcon name={PROGRAM_ICONS[item.app] ?? "folder"} size={20} />
              <span>{item.label}</span>
              <span className="arch-launcher-key">
                {item.app === "cmd" ? "super+enter" : ""}
              </span>
            </button>
          ))
        ) : (
          <p className="arch-launcher-empty">Nenhum aplicativo encontrado.</p>
        )}
      </div>

      <div className="arch-launcher-foot">
        <div className="arch-launcher-user">
          <span className="arch-launcher-avatar">{SITE.initials}</span>
          <span>{SITE.osName}</span>
        </div>
        <div className="arch-launcher-actions">
          <button
            type="button"
            className="arch-launcher-toggle"
            aria-pressed={enabled}
            onClick={() => {
              play("click");
              toggle();
            }}
          >
            <ArchIcon name={enabled ? "volume" : "volumeMuted"} size={15} />
            <span>{enabled ? "som on" : "som off"}</span>
          </button>
          <button
            type="button"
            className="arch-launcher-toggle"
            aria-pressed={theme === "green"}
            onClick={() => {
              play("click");
              setTheme(theme === "green" ? "blue" : "green");
            }}
          >
            <ArchIcon name="settings" size={15} />
            <span>{theme === "green" ? "acento verde" : "acento azul"}</span>
          </button>
          <button
            type="button"
            className="arch-launcher-toggle"
            onClick={() => {
              play("click");
              onClose();
              logoff();
            }}
          >
            <ArchIcon name="logoff" size={15} />
            <span>logoff</span>
          </button>
          <button
            type="button"
            className="arch-launcher-toggle is-power"
            onClick={() => {
              play("click");
              onClose();
              shutdown();
            }}
          >
            <ArchIcon name="power" size={15} />
            <span>poweroff</span>
          </button>
        </div>
      </div>
    </div>
  );
}
