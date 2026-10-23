"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArchLogo } from "@/components/icons/arch-icons";

const LINES = [
  "Started Journal Service.",
  "Reached target Local File Systems.",
  "Started udev Kernel Device Manager.",
  "Reached target Network is Online.",
  "Started Hyprland compositor.",
  "Started kitty terminal emulator.",
  "Reached target Graphical Interface.",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const done = useRef(false);
  const [visible, setVisible] = useState(0);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible((value) => Math.min(value + 1, LINES.length));
    }, 170);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visible < LINES.length) return;
    const timer = window.setTimeout(finish, 620);
    return () => window.clearTimeout(timer);
  }, [visible, finish]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  return (
    <div
      className="arch-boot"
      role="button"
      tabIndex={0}
      aria-label="Iniciando o Arch Linux. Clique para pular."
      onClick={finish}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") finish();
      }}
    >
      <div className="arch-boot-brand">
        <ArchLogo className="arch-boot-logo" />
        <div className="arch-boot-wordmark">
          <span className="arch-boot-name">Arch Linux</span>
          <span className="arch-boot-tag">rolling release</span>
        </div>
      </div>

      <div className="arch-boot-log" aria-live="polite">
        {LINES.slice(0, visible).map((line) => (
          <p key={line}>
            <span className="arch-boot-ok">[  OK  ]</span> {line}
          </p>
        ))}
      </div>

      <div className="arch-boot-progress" aria-hidden="true">
        <span style={{ width: `${(visible / LINES.length) * 100}%` }} />
      </div>

      <p className="arch-boot-caption">Iniciando o portfólio…</p>
      <p className="arch-boot-hint">clique ou pressione Enter para pular</p>
    </div>
  );
}
