"use client";

import { createContext, useContext } from "react";
import type { AppId } from "@/lib/wm/types";

export type Theme = "blue" | "green";

export type ShellContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showPanic: () => void;
  logoff: () => void;
  shutdown: () => void;
  open: (app: AppId, payload?: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

export const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside ShellContext");
  return ctx;
}
