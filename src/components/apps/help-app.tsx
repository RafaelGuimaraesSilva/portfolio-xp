"use client";

import { HELP_ITEMS } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";

export function HelpApp() {
  const { open } = useWindowManager();

  return (
    <div className="arch-app arch-help">
      <div className="arch-help-head">
        <ArchIcon name="help" size={34} />
        <div>
          <h1>Ajuda e dicas</h1>
          <p>Atalhos e coisas escondidas neste desktop.</p>
        </div>
      </div>

      <ul className="arch-help-list">
        {HELP_ITEMS.map(([title, detail]) => (
          <li key={title}>
            <kbd>{title}</kbd>
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      <section className="arch-help-cmds">
        <h2>Comandos do terminal / launcher</h2>
        <p className="arch-help-code">
          help · about · projects · stack · contact · cmd · mine · recycle · ls ·
          pwd · uname · pacman · neofetch · panic · clear · exit
        </p>
        <div className="arch-help-actions">
          <button type="button" className="arch-btn" onClick={() => open("cmd")}>
            Abrir Terminal
          </button>
          <button type="button" className="arch-btn" onClick={() => open("run")}>
            Abrir Launcher
          </button>
        </div>
      </section>

      <div className="arch-statusbar">
        <span>{HELP_ITEMS.length} dicas</span>
        <span>Esc fecha a janela em foco</span>
      </div>
    </div>
  );
}
