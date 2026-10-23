import type { IconName } from "@/lib/icons";

export type AppId =
  | "computer"
  | "projects"
  | "project"
  | "stack"
  | "contact"
  | "run"
  | "cmd"
  | "mine"
  | "recycle"
  | "winver"
  | "help";

export type Rect = { x: number; y: number; w: number; h: number };

export type WindowState = {
  id: string;
  app: AppId;
  title: string;
  icon: IconName;
  rect: Rect;
  z: number;
  minimized: boolean;
  maximized: boolean;
  restoreRect?: Rect;
  payload?: string;
};

export type Viewport = { w: number; h: number };

export type WindowAction =
  | { type: "open"; app: AppId; payload?: string; viewport: Viewport }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "restore"; id: string }
  | { type: "toggleMax"; id: string; viewport: Viewport }
  | { type: "move"; id: string; x: number; y: number; viewport: Viewport }
  | { type: "resize"; id: string; rect: Rect; viewport: Viewport }
  | { type: "clamp"; viewport: Viewport };

export type WMState = {
  windows: WindowState[];
  nextZ: number;
};
