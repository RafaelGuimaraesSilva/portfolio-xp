"use client";

import { useEffect, useState } from "react";
import { useClock } from "@/lib/hooks";
import { ArchIcon, ArchLogo } from "@/components/icons/arch-icons";
import { useWindowManager } from "./window-manager";
import { useSound } from "./sound";

const WORKSPACES = [1, 2, 3, 4, 5];

export function Taskbar({
  startOpen,
  onToggleStart,
}: {
  startOpen: boolean;
  onToggleStart: () => void;
}) {
  const { windows, topId, toggleFromTaskbar } = useWindowManager();
  const { enabled, toggle } = useSound();
  const now = useClock();
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (enabled) return;
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem("arch-sound-hint") === "dismissed";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setHint(true), 4500);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  const dismissHint = () => {
    setHint(false);
    try {
      window.localStorage.setItem("arch-sound-hint", "dismissed");
    } catch {
      /* ignore */
    }
  };

  const time = now
    ? now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const date = now ? now.toLocaleDateString("pt-BR") : "";

  return (
    <div className="arch-bar">
      <button
        type="button"
        data-start-button
        className={`arch-bar-launcher${startOpen ? " is-open" : ""}`}
        onClick={onToggleStart}
        aria-expanded={startOpen}
        aria-label="Abrir launcher"
        title="Launcher (Super + D)"
      >
        <ArchLogo className="arch-bar-logo" />
      </button>

      <div className="arch-bar-workspaces" aria-hidden="true">
        {WORKSPACES.map((workspace) => (
          <span
            key={workspace}
            className={workspace === 1 ? "is-active" : undefined}
          >
            {workspace}
          </span>
        ))}
      </div>

      <div className="arch-bar-tasks">
        {windows.map((win) => (
          <button
            key={win.id}
            type="button"
            data-taskbar-window={win.id}
            className={`arch-bar-task${win.id === topId ? " is-active" : ""}${
              win.minimized ? " is-min" : ""
            }`}
            onClick={() => toggleFromTaskbar(win.id)}
            title={win.title}
          >
            <ArchIcon name={win.icon} size={15} />
            <span className="arch-bar-task-label">{win.title}</span>
          </button>
        ))}
      </div>

      <div className="arch-bar-tray">
        <button
          type="button"
          className="arch-bar-tray-btn"
          onClick={() => {
            dismissHint();
            toggle();
          }}
          aria-label={enabled ? "Desativar sons do sistema" : "Ativar sons do sistema"}
          title={enabled ? "Sons ligados" : "Sons desligados"}
        >
          <ArchIcon
            name={enabled ? "volume" : "volumeMuted"}
            size={16}
            className="arch-bar-tray-icon"
          />
        </button>
        <button
          type="button"
          className="arch-bar-tray-btn"
          aria-label="Rede"
          title="Conexão local — 10 Mbps"
        >
          <ArchIcon name="network" size={16} className="arch-bar-tray-icon" />
        </button>
        <time
          className="arch-bar-clock"
          dateTime={now ? now.toISOString() : undefined}
          title={date}
        >
          {time}
        </time>

        {hint && !enabled ? (
          <div className="arch-balloon" data-ignore-escape role="status">
            <button
              type="button"
              className="arch-balloon-close"
              onClick={dismissHint}
              aria-label="Fechar aviso"
            >
              ×
            </button>
            <strong>Som do sistema</strong>
            <p>Quer ouvir os cliques e o som de inicialização?</p>
            <div className="arch-balloon-actions">
              <button
                type="button"
                className="arch-btn"
                onClick={() => {
                  dismissHint();
                  toggle();
                }}
              >
                Ativar sons
              </button>
              <button type="button" className="arch-btn" onClick={dismissHint}>
                Agora não
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
