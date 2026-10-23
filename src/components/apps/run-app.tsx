"use client";

import { useState } from "react";
import { runCommand } from "@/lib/commands";
import { ArchIcon } from "@/components/icons/arch-icons";
import { useWindowManager } from "@/components/desktop/window-manager";
import { useShell } from "@/components/desktop/shell-context";
import { useSound } from "@/components/desktop/sound";

export function RunApp({ windowId }: { windowId: string }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { open, close } = useWindowManager();
  const shell = useShell();
  const { play } = useSound();

  const execute = () => {
    const result = runCommand(value);

    if (result.kind === "open") {
      play("click");
      close(windowId);
      open(result.app, result.payload);
      return;
    }
    if (result.kind === "panic") {
      play("error");
      close(windowId);
      shell.showPanic();
      return;
    }
    if (result.kind === "exit") {
      close(windowId);
      return;
    }
    if (result.kind === "clear") {
      setValue("");
      setMessage(null);
      return;
    }
    if (result.kind === "output") {
      setMessage(result.lines.join("\n") || null);
      return;
    }
    if (result.kind === "error") {
      play("error");
      setMessage(result.message);
    }
  };

  return (
    <div className="arch-app arch-run">
      <div className="arch-run-top">
        <ArchIcon name="terminal" size={34} />
        <p>
          Digite o nome de um programa ou comando e o sistema abre para você.
        </p>
      </div>

      <label className="arch-run-label" htmlFor="arch-run-input">
        Executar:
      </label>
      <input
        id="arch-run-input"
        className="arch-input arch-run-input"
        value={value}
        autoFocus
        onChange={(event) => {
          setValue(event.target.value);
          setMessage(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            execute();
          }
        }}
        aria-label="Nome do programa ou comando"
      />

      {message ? <pre className="arch-run-message">{message}</pre> : null}

      <p className="arch-run-hint">
        tente:{" "}
        {["projects", "contact", "mine", "panic"].map((example, index) => (
          <span key={example}>
            {index > 0 ? " · " : ""}
            <button type="button" onClick={() => setValue(example)}>
              {example}
            </button>
          </span>
        ))}
      </p>

      <div className="arch-run-actions">
        <button type="button" className="arch-btn" onClick={execute}>
          OK
        </button>
        <button type="button" className="arch-btn" onClick={() => close(windowId)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
