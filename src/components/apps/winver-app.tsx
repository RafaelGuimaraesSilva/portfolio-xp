"use client";

import { SITE } from "@/lib/site";
import { ArchLogo } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";

const SPECS = [
  ["Distro", SITE.distro],
  ["Kernel", SITE.kernel],
  ["WM", SITE.wm],
  ["Shell", SITE.shell],
  ["Terminal", SITE.terminal],
  ["Runtime", "Bun 1.3"],
  ["Stack", "Next.js 16 · React 19"],
  ["Fonte", "JetBrains Mono"],
];

export function NeofetchApp({ windowId }: { windowId: string }) {
  const { close } = useWindowManager();

  return (
    <div className="arch-app arch-winver">
      <div className="arch-winver-head">
        <ArchLogo className="arch-winver-flag" />
        <div>
          <h1>{SITE.osName}</h1>
          <p>{SITE.osVersion}</p>
          <p>Portfólio interativo de {SITE.name}</p>
        </div>
      </div>

      <dl className="arch-winver-specs">
        {SPECS.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <p className="arch-winver-copy">
        © 2026 {SITE.name}. Feito com Arch Linux, café e algumas madrugadas.
      </p>

      <div className="arch-winver-foot">
        <button type="button" className="arch-btn" onClick={() => close(windowId)}>
          OK
        </button>
      </div>
    </div>
  );
}
