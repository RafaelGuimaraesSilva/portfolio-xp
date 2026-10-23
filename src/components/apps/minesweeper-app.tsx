"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/components/desktop/sound";

const ROWS = 9;
const COLS = 9;
const MINES = 10;
const SIZE = ROWS * COLS;

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

type Status = "ready" | "playing" | "won" | "lost";

const createCells = (): Cell[] =>
  Array.from({ length: SIZE }, () => ({
    mine: false,
    revealed: false,
    flagged: false,
    adjacent: 0,
  }));

function neighbors(index: number) {
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const result: number[] = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) result.push(r * COLS + c);
    }
  }
  return result;
}

function shuffle<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function formatCounter(value: number) {
  if (value < 0) {
    return `-${Math.min(99, Math.abs(value)).toString().padStart(2, "0")}`;
  }
  return Math.min(999, value).toString().padStart(3, "0");
}

function Face({ status }: { status: Status }) {
  return (
    <svg viewBox="0 0 26 26" className="arch-face" aria-hidden="true">
      <circle cx="13" cy="13" r="11.5" fill="#ffd83d" stroke="#a8791a" strokeWidth="1.5" />
      {status === "lost" ? (
        <>
          <path d="M7.5 8.5l3 3M10.5 8.5l-3 3M15.5 8.5l3 3M18.5 8.5l-3 3" stroke="#3a2a05" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.5 18c1.5-2 7.5-2 9 0" stroke="#3a2a05" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      ) : status === "won" ? (
        <>
          <rect x="6.5" y="8" width="13" height="4" rx="1.4" fill="#20262e" />
          <path d="M8 18c1.5 1.8 8.5 1.8 10 0" stroke="#3a2a05" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="9.5" cy="10" r="1.5" fill="#3a2a05" />
          <circle cx="16.5" cy="10" r="1.5" fill="#3a2a05" />
          <path d="M8 16c1.6 2.2 8.4 2.2 10 0" stroke="#3a2a05" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function MinesweeperApp() {
  const [cells, setCells] = useState<Cell[]>(createCells);
  const [status, setStatus] = useState<Status>("ready");
  const [seconds, setSeconds] = useState(0);
  const [boom, setBoom] = useState<number | null>(null);
  const { play } = useSound();

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => {
      setSeconds((prev) => Math.min(999, prev + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  const reset = () => {
    setCells(createCells());
    setStatus("ready");
    setSeconds(0);
    setBoom(null);
    play("click");
  };

  const reveal = (index: number) => {
    if (status === "won" || status === "lost") return;
    if (cells[index].flagged || cells[index].revealed) return;

    const board = cells.map((cell) => ({ ...cell }));
    let nextStatus: Status = status;

    if (status === "ready") {
      const forbidden = new Set([index, ...neighbors(index)]);
      const pool: number[] = [];
      for (let i = 0; i < SIZE; i += 1) {
        if (!forbidden.has(i)) pool.push(i);
      }
      shuffle(pool);
      for (let i = 0; i < MINES; i += 1) board[pool[i]].mine = true;
      for (let i = 0; i < SIZE; i += 1) {
        board[i].adjacent = neighbors(i).filter((n) => board[n].mine).length;
      }
      nextStatus = "playing";
    }

    if (board[index].mine) {
      board.forEach((cell, cellIndex) => {
        if (cell.mine) {
          cell.revealed = true;
          cell.flagged = false;
        }
        if (cellIndex === index) cell.revealed = true;
      });
      setBoom(index);
      setCells(board);
      setStatus("lost");
      play("error");
      return;
    }

    const stack = [index];
    while (stack.length) {
      const current = stack.pop();
      if (current === undefined) continue;
      const cell = board[current];
      if (cell.revealed || cell.flagged) continue;
      cell.revealed = true;
      if (cell.adjacent === 0) {
        for (const n of neighbors(current)) {
          if (!board[n].revealed && !board[n].flagged && !board[n].mine) {
            stack.push(n);
          }
        }
      }
    }

    const remaining = board.filter((cell) => !cell.mine && !cell.revealed).length;
    if (remaining === 0) {
      nextStatus = "won";
      board.forEach((cell) => {
        if (cell.mine) cell.flagged = true;
      });
      play("ding");
    } else if (status === "ready") {
      play("click");
    }

    setCells(board);
    setStatus(nextStatus);
  };

  const toggleFlag = (index: number) => {
    if (status === "won" || status === "lost") return;
    if (cells[index].revealed) return;
    play("flag");
    setCells((prev) =>
      prev.map((cell, cellIndex) =>
        cellIndex === index ? { ...cell, flagged: !cell.flagged } : cell,
      ),
    );
  };

  const flags = cells.filter((cell) => cell.flagged).length;

  return (
    <div className="arch-app arch-mine">
      <div className="arch-mine-panel">
        <span className="arch-led">{formatCounter(MINES - flags)}</span>
        <button
          type="button"
          className="arch-face-btn"
          onClick={reset}
          aria-label="Novo jogo"
          title="Novo jogo"
        >
          <Face status={status} />
        </button>
        <span className="arch-led">{formatCounter(seconds)}</span>
      </div>

      <div className="arch-mine-grid" role="grid" aria-label="Campo Minado">
        {cells.map((cell, index) => {
          const isBoom = boom === index;
          const label = cell.flagged
            ? "marcada"
            : cell.revealed
              ? cell.mine
                ? "mina"
                : `${cell.adjacent} vizinhas`
              : "oculta";
          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              className={`arch-mine-cell${cell.revealed ? " is-revealed" : ""}${
                isBoom ? " is-boom" : ""
              }${cell.flagged ? " is-flagged" : ""}${
                cell.revealed && cell.adjacent > 0 && !cell.mine
                  ? ` n${cell.adjacent}`
                  : ""
              }`}
              aria-label={`Linha ${Math.floor(index / COLS) + 1}, coluna ${
                (index % COLS) + 1
              }: ${label}`}
              onClick={() => reveal(index)}
              onContextMenu={(event) => {
                event.preventDefault();
                toggleFlag(index);
              }}
            >
              {cell.flagged ? (
                <span className="arch-mine-flag" aria-hidden="true" />
              ) : cell.revealed && cell.mine ? (
                <span className="arch-mine-bomb" aria-hidden="true" />
              ) : cell.revealed && cell.adjacent > 0 ? (
                cell.adjacent
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="arch-mine-foot">
        <span>Botão direito marca a bandeira</span>
        <span>Clique no rosto para reiniciar</span>
      </div>
    </div>
  );
}
