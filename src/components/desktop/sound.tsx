"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SoundName =
  | "click"
  | "open"
  | "close"
  | "minimize"
  | "error"
  | "ding"
  | "flag"
  | "startup";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

type Note = {
  freq: number;
  at: number;
  dur: number;
  type?: OscillatorType;
  gain?: number;
  to?: number;
};

const SOUNDS: Record<SoundName, Note[]> = {
  click: [{ freq: 1400, at: 0, dur: 0.025, type: "square", gain: 0.03 }],
  open: [
    { freq: 660, at: 0, dur: 0.05, type: "triangle", gain: 0.045 },
    { freq: 990, at: 0.045, dur: 0.06, type: "triangle", gain: 0.035 },
  ],
  close: [
    { freq: 620, at: 0, dur: 0.06, type: "triangle", gain: 0.04 },
    { freq: 420, at: 0.05, dur: 0.08, type: "triangle", gain: 0.035 },
  ],
  minimize: [
    { freq: 780, at: 0, dur: 0.16, type: "sine", gain: 0.05, to: 260 },
  ],
  error: [
    { freq: 330, at: 0, dur: 0.1, type: "square", gain: 0.035 },
    { freq: 220, at: 0.11, dur: 0.16, type: "square", gain: 0.035 },
  ],
  ding: [
    { freq: 880, at: 0, dur: 0.28, type: "sine", gain: 0.05, to: 860 },
  ],
  flag: [{ freq: 1046, at: 0, dur: 0.04, type: "square", gain: 0.025 }],
  startup: [
    { freq: 261.63, at: 0, dur: 0.5, type: "triangle", gain: 0.05 },
    { freq: 329.63, at: 0.13, dur: 0.5, type: "triangle", gain: 0.05 },
    { freq: 392.0, at: 0.26, dur: 0.5, type: "triangle", gain: 0.05 },
    { freq: 523.25, at: 0.39, dur: 0.8, type: "triangle", gain: 0.055 },
    { freq: 130.81, at: 0, dur: 1.2, type: "sine", gain: 0.035 },
    { freq: 196.0, at: 0.2, dur: 1.0, type: "sine", gain: 0.025 },
  ],
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(window.localStorage.getItem("arch-sound") === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
    try {
      window.localStorage.setItem("arch-sound", enabled ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [enabled]);

  const play = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    try {
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) return;
        ctxRef.current = new Ctor();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      for (const note of SOUNDS[name]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + note.at;
        const peak = note.gain ?? 0.04;

        osc.type = note.type ?? "sine";
        osc.frequency.setValueAtTime(note.freq, start);
        if (note.to) {
          osc.frequency.exponentialRampToValueAtTime(
            Math.max(40, note.to),
            start + note.dur,
          );
        }

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + note.dur);

        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + note.dur + 0.02);
      }
    } catch {
      /* audio is a bonus, never break the UI */
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        enabledRef.current = true;
        window.setTimeout(() => play("ding"), 40);
      }
      return next;
    });
  }, [play]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}
