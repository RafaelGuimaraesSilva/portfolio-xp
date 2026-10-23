"use client";

import { SITE } from "@/lib/site";
import { ArchLogo } from "@/components/icons/arch-icons";

export function ShutdownScreen({ onPowerOn }: { onPowerOn: () => void }) {
  return (
    <div className="arch-shutdown">
      <div className="arch-shutdown-log" aria-hidden="true">
        <p>[  OK  ] Stopped target Graphical Interface.</p>
        <p>[  OK  ] Stopped Hyprland compositor.</p>
        <p>[  OK  ] Reached target Power-Off.</p>
        <p>[  OK  ] System is powering down.</p>
      </div>

      <div className="arch-shutdown-card">
        <ArchLogo className="arch-shutdown-logo" />
        <h1>Sistema finalizado.</h1>
        <p>
          É seguro desligar o computador. Nenhum projeto foi perdido — e o
          próximo boot é só um clique.
        </p>
        <button
          type="button"
          className="arch-btn arch-shutdown-btn"
          onClick={onPowerOn}
        >
          Ligar novamente
        </button>
      </div>

      <span className="arch-shutdown-brand">{SITE.osName}</span>
    </div>
  );
}
