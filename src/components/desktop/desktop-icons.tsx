"use client";

import { useState } from "react";
import { DESKTOP_ICONS } from "@/lib/apps";
import { ArchIcon } from "@/components/icons/arch-icons";
import type { IconName } from "@/lib/icons";
import { useWindowManager } from "./window-manager";
import { useSound } from "./sound";

const ICON_FOR: Record<string, IconName> = {
  computer: "user",
  projects: "projects",
  stack: "stack",
  contact: "mail",
  cmd: "terminal",
  mine: "mine",
  recycle: "trash",
};

export function DesktopIcons() {
  const { open } = useWindowManager();
  const { play } = useSound();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="arch-icons" aria-label="Área de trabalho">
      {DESKTOP_ICONS.map((item) => {
        const isSelected = selected === item.app;
        return (
          <button
            key={item.app}
            type="button"
            className={`arch-icon${isSelected ? " is-selected" : ""}`}
            onPointerDown={() => setSelected(item.app)}
            onDoubleClick={() => {
              play("click");
              open(item.app);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                play("click");
                open(item.app);
              }
            }}
            title={`${item.label} (duplo clique para abrir)`}
          >
            <ArchIcon name={ICON_FOR[item.app] ?? "folder"} size={40} />
            <span className="arch-icon-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
