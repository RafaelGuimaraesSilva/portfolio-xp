"use client";

import { useEffect } from "react";

export function KernelPanic({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        onDismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  return (
    <div
      className="arch-panic"
      data-ignore-escape
      role="alertdialog"
      aria-label="Kernel panic"
      onClick={onDismiss}
      tabIndex={0}
    >
      <div className="arch-panic-inner">
        <p className="arch-panic-brand">KERNEL PANIC</p>
        <p>
          O portfólio encontrou uma exceção não tratada e foi interrompido para
          evitar danos à sua curiosidade.
        </p>
        <p>
          Se esta for a primeira vez que você vê esta tela, tente não levar tão a
          sério.
        </p>
        <pre>{`[  0.000000] Kernel panic - not syncing: CURIOSITY_OVERFLOW_EXCEPTION
[  0.000001] CPU: 0 PID: 1 Comm: rafael-arch Not tainted 6.12.4-arch1-1
[  0.000002] Hardware name: Arch Linux/Hyprland, BIOS rolling-release
[  0.000003] Call Trace:
[  0.000004]  <TASK>
[  0.000005]  portfolio_init+0x2a/0x40
[  0.000006]  do_one_initcall+0x5a/0x1f0
[  0.000007]  kernel_init_freeable+0x1f8/0x2c0
[  0.000008]  kernel_init+0x1a/0x1c0
[  0.000009]  ret_from_fork+0x2d/0x50
[  0.000010]  </TASK>
[  0.000011] ---[ end Kernel panic - not syncing: CURIOSITY_OVERFLOW_EXCEPTION ]---`}</pre>
        <p className="arch-panic-hint">
          Pressione qualquer tecla ou clique para reiniciar.
        </p>
      </div>
    </div>
  );
}
