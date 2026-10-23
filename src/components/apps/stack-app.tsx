"use client";

import { useMemo, useState } from "react";
import { STACK } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";

export function StackApp() {
  const [copied, setCopied] = useState(false);

  const listing = useMemo(
    () => STACK.map((dep) => `${dep.name} ${dep.version}`).join("\n"),
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(listing);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — no drama */
    }
  };

  return (
    <div className="arch-app arch-stack">
      <div className="arch-toolbar">
        <ArchIcon name="stack" size={20} />
        <strong>pacman -Q</strong>
        <span className="arch-pill">{STACK.length} pacotes</span>
        <button type="button" className="arch-btn arch-copy" onClick={copy}>
          {copied ? "Copiado!" : "Copiar lista"}
        </button>
      </div>

      <div className="arch-code" aria-label="Pacotes instalados no sistema">
        <p className="arch-code-line arch-code-muted">
          {"# pacotes instalados · Arch Linux rolling release"}
        </p>
        {STACK.map((dep) => (
          <div className="arch-dep" key={dep.name} title={dep.where}>
            <span className="arch-code-line">
              <span className="arch-key">{dep.name}</span>
              <span className="arch-punc"> </span>
              <span className="arch-str">{dep.version}</span>
            </span>
            <span className="arch-dep-where">{"# "}{dep.where}</span>
          </div>
        ))}
      </div>

      <div className="arch-statusbar">
        <span>{STACK.length} pacotes</span>
        <span>Passe o mouse para ver onde cada um aparece</span>
      </div>
    </div>
  );
}
