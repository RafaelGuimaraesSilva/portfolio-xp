"use client";

import { useCallback, useEffect } from "react";
import { SITE } from "@/lib/site";
import { ArchLogo } from "@/components/icons/arch-icons";
import { useSound } from "./sound";

export function LoginScreen({ onEnter }: { onEnter: () => void }) {
  const { play } = useSound();

  const enter = useCallback(() => {
    play("startup");
    onEnter();
  }, [play, onEnter]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        enter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enter]);

  return (
    <div className="arch-login">
      <div className="arch-login-glow" aria-hidden="true" />
      <div className="arch-login-grid" aria-hidden="true" />
      <div className="arch-login-inner">
        <div className="arch-login-brand">
          <ArchLogo className="arch-login-logo" />
          <span>rafael@arch</span>
        </div>
        <p className="arch-login-distro">Arch Linux · Hyprland · tty1</p>

        <div className="arch-login-divider" />

        <p className="arch-login-prompt">Para começar, selecione seu usuário</p>

        <button type="button" className="arch-user-tile" onClick={enter}>
          <span className="arch-user-avatar">{SITE.initials}</span>
          <span className="arch-user-name">rafael</span>
          <span className="arch-user-role">{SITE.role}</span>
          <span className="arch-user-hint">clique ou pressione Enter</span>
        </button>

        <div className="arch-login-help">
          <span>Último login: hoje, 21:14 em tty1</span>
          <span>Sem senha — pode entrar.</span>
        </div>
      </div>
    </div>
  );
}
