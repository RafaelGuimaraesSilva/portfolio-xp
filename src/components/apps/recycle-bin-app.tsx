"use client";

import { useState } from "react";
import { RECYCLE_FILE } from "@/lib/site";
import { ArchIcon } from "@/components/icons/arch-icons";

export function RecycleBinApp() {
  const [selected, setSelected] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <div className="arch-app arch-recycle">
      <div className="arch-toolbar">
        <ArchIcon name="trash" size={20} />
        <strong>~/.local/share/Trash</strong>
        <span className="arch-pill">1 arquivo</span>
        {opened ? (
          <button type="button" className="arch-btn arch-toolbar-btn" onClick={() => setOpened(false)}>
            Voltar
          </button>
        ) : null}
      </div>

      {opened ? (
        <div className="arch-recycle-preview">
          <div className="arch-recycle-preview-head">
            <ArchIcon name="txt" size={22} />
            <strong>{RECYCLE_FILE.name}</strong>
            <span>1 KB</span>
          </div>
          <pre>{RECYCLE_FILE.content}</pre>
        </div>
      ) : (
        <div className="arch-recycle-body">
          <button
            type="button"
            className={`arch-file-row${selected ? " is-selected" : ""}`}
            onClick={() => setSelected(true)}
            onDoubleClick={() => setOpened(true)}
          >
            <ArchIcon name="txt" size={34} />
            <span className="arch-file-info">
              <strong>{RECYCLE_FILE.name}</strong>
              <em>1 KB · 16/08/2026 21:20</em>
            </span>
          </button>
          <p className="arch-recycle-hint">
            Duplo clique para abrir. Tem coisa aqui — e não é lixo.
          </p>
        </div>
      )}

      <div className="arch-statusbar">
        <span>1 arquivo</span>
        <span>Não esvazie. Ainda dá ideia.</span>
      </div>
    </div>
  );
}
