"use client";

import { useEffect, useRef, useState } from "react";
import { runCommand } from "@/lib/commands";
import { useWindowManager } from "@/components/desktop/window-manager";
import { useShell } from "@/components/desktop/shell-context";
import { useSound } from "@/components/desktop/sound";

const PROMPT = "[rafael@arch ~]$";

type Line = {
  id: number;
  text: string;
  kind: "system" | "input" | "output" | "error";
};

const INITIAL: Line[] = [
  { id: 1, text: "Arch Linux 6.12.4-arch1-1 (tty1)", kind: "system" },
  {
    id: 2,
    text: "rafael@arch · Hyprland · rolling release",
    kind: "system",
  },
  { id: 3, text: 'Digite "help" para ver os comandos.', kind: "system" },
  { id: 4, text: "", kind: "output" },
];

export function CommandPromptApp({ windowId }: { windowId: string }) {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(10);
  const { open, close } = useWindowManager();
  const shell = useShell();
  const { play } = useSound();

  useEffect(() => {
    const screen = screenRef.current;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }, [lines]);

  const push = (text: string, kind: Line["kind"]) => {
    setLines((prev) => [...prev, { id: nextId.current++, text, kind }]);
  };

  const execute = (raw: string) => {
    const command = raw.trim();
    push(`${PROMPT} ${raw}`, "input");
    setInput("");
    setHistory((prev) => (command ? [...prev, command] : prev));
    setHistoryIndex(null);

    if (!command) return;

    const result = runCommand(command);

    switch (result.kind) {
      case "output":
        if (result.lines.length === 0) {
          push("", "output");
        } else {
          for (const line of result.lines) push(line, "output");
        }
        break;
      case "error":
        play("error");
        push(result.message, "error");
        break;
      case "open":
        play("click");
        push(`Abrindo ${result.app}...`, "output");
        open(result.app, result.payload);
        break;
      case "panic":
        play("error");
        push("Kernel panic — reiniciando o sistema...", "output");
        shell.showPanic();
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        close(windowId);
        break;
    }
  };

  return (
    <div className="arch-app arch-cmd" onPointerDown={() => inputRef.current?.focus()}>
      <div className="arch-cmd-screen" ref={screenRef}>
        {lines.map((line) => (
          <div key={line.id} className={`arch-cmd-line is-${line.kind}`}>
            {line.text || "\u00A0"}
          </div>
        ))}

        <form
          className="arch-cmd-form"
          onSubmit={(event) => {
            event.preventDefault();
            execute(input);
          }}
        >
          <span className="arch-cmd-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="arch-cmd-input"
            value={input}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                if (!history.length) return;
                const index =
                  historyIndex === null
                    ? history.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(index);
                setInput(history[index] ?? "");
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                if (historyIndex === null) return;
                const index = historyIndex + 1;
                if (index >= history.length) {
                  setHistoryIndex(null);
                  setInput("");
                } else {
                  setHistoryIndex(index);
                  setInput(history[index] ?? "");
                }
              }
              if (event.key === "l" && event.ctrlKey) {
                event.preventDefault();
                setLines([]);
              }
            }}
            aria-label="Comando do prompt"
          />
        </form>
      </div>
    </div>
  );
}
