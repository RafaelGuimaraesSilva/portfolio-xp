import type { IconName } from "@/lib/icons";
import type { AppId } from "@/lib/wm/types";

export type AppDef = {
  title: string;
  icon: IconName;
  w: number;
  h: number;
  resizable: boolean;
  minW?: number;
  minH?: number;
};

export const APP_DEFS: Record<AppId, AppDef> = {
  computer: {
    title: "Sobre mim",
    icon: "user",
    w: 730,
    h: 570,
    resizable: true,
    minW: 420,
    minH: 300,
  },
  projects: {
    title: "~/projetos",
    icon: "projects",
    w: 800,
    h: 560,
    resizable: true,
    minW: 460,
    minH: 320,
  },
  project: {
    title: "Projeto",
    icon: "txt",
    w: 660,
    h: 600,
    resizable: true,
    minW: 400,
    minH: 320,
  },
  stack: {
    title: "pacman -Q",
    icon: "stack",
    w: 700,
    h: 570,
    resizable: true,
    minW: 420,
    minH: 300,
  },
  contact: {
    title: "~/contato",
    icon: "mail",
    w: 610,
    h: 540,
    resizable: true,
    minW: 380,
    minH: 320,
  },
  run: {
    title: "Launcher",
    icon: "search",
    w: 460,
    h: 250,
    resizable: false,
  },
  cmd: {
    title: "Terminal",
    icon: "terminal",
    w: 680,
    h: 430,
    resizable: true,
    minW: 380,
    minH: 240,
  },
  mine: {
    title: "Campo Minado",
    icon: "mine",
    w: 352,
    h: 470,
    resizable: false,
  },
  recycle: {
    title: "~/.local/share/Trash",
    icon: "trash",
    w: 620,
    h: 440,
    resizable: true,
    minW: 400,
    minH: 280,
  },
  winver: {
    title: "neofetch",
    icon: "info",
    w: 520,
    h: 430,
    resizable: false,
  },
  help: {
    title: "Ajuda",
    icon: "help",
    w: 640,
    h: 520,
    resizable: true,
    minW: 380,
    minH: 280,
  },
};

export const DESKTOP_ICONS = [
  { app: "computer", label: "Sobre mim" },
  { app: "projects", label: "Projetos" },
  { app: "stack", label: "Stack" },
  { app: "contact", label: "Contato" },
  { app: "cmd", label: "Terminal" },
  { app: "mine", label: "Campo Minado" },
  { app: "recycle", label: "Lixeira" },
] as const satisfies ReadonlyArray<{ app: AppId; label: string }>;

export const START_PROGRAMS = [
  { app: "computer", label: "Sobre mim" },
  { app: "projects", label: "Projetos" },
  { app: "stack", label: "Stack / pacotes" },
  { app: "contact", label: "Contato" },
  { app: "cmd", label: "Terminal" },
  { app: "run", label: "Launcher" },
  { app: "mine", label: "Campo Minado" },
  { app: "recycle", label: "Lixeira" },
  { app: "winver", label: "neofetch" },
  { app: "help", label: "Ajuda" },
] as const satisfies ReadonlyArray<{ app: AppId; label: string }>;
