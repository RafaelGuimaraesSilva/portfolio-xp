import type { AppId } from "@/lib/wm/types";

export type CommandResult =
  | { kind: "open"; app: AppId; payload?: string }
  | { kind: "panic" }
  | { kind: "clear" }
  | { kind: "exit" }
  | { kind: "output"; lines: string[] }
  | { kind: "error"; message: string };

export const COMMAND_HELP = [
  "Comandos disponíveis:",
  "  help ................ mostra esta lista",
  "  about ............... abre ~/sobre",
  "  projects ............ abre ~/projetos",
  "  stack ............... abre os pacotes instalados",
  "  contact ............. abre ~/contato",
  "  term ................ abre o Terminal",
  "  run ................. abre o launcher",
  "  mine ................ abre o Campo Minado",
  "  trash ............... abre a lixeira",
  "  neofetch ............ informações do sistema",
  "  ls .................. lista os arquivos do home",
  "  pwd ................. mostra o diretório atual",
  "  whoami .............. quem está por trás disso",
  "  uname ............... informações do kernel",
  "  date ................ data e hora atuais",
  "  pacman .............. simula um system upgrade",
  "  sudo ................ boa sorte",
  "  panic ............... não digite isso",
  "  clear ............... limpa a tela",
  "  exit ................ fecha a janela",
];

export const LS_OUTPUT = [
  "total 4",
  "drwxr-xr-x 2 rafael rafael 4096 dez 16 21:14 projetos",
  "drwxr-xr-x 2 rafael rafael 4096 dez 16 21:14 stack",
  "-rw-r--r-- 1 rafael rafael 1482 dez 16 21:02 sobre.txt",
  "-rw-r--r-- 1 rafael rafael 2048 dez 16 21:09 contato.txt",
  "-rw-r--r-- 1 rafael rafael 4096 dez 16 21:20 README.md",
];

export const UNAME_OUTPUT =
  "Linux arch 6.12.4-arch1-1 #1 SMP PREEMPT_DYNAMIC Thu, 19 Dec 2026 18:22:13 +0000 x86_64 GNU/Linux";

export const PACMAN_OUTPUT = [
  ":: Synchronising package databases...",
  " core is up to date",
  " extra is up to date",
  " multilib is up to date",
  ":: Starting full system upgrade...",
  " there is nothing to do",
];

export const SUDO_OUTPUT = [
  "rafael is not in the sudoers file. This incident has been reported.",
];

export function runCommand(input: string): CommandResult {
  const trimmed = input.trim();
  const cmd = trimmed.toLowerCase();

  if (!cmd) return { kind: "output", lines: [] };

  switch (cmd) {
    case "help":
    case "ajuda":
      return { kind: "output", lines: COMMAND_HELP };
    case "about":
    case "sobre":
      return { kind: "open", app: "computer" };
    case "projects":
    case "projetos":
    case "portfolio":
      return { kind: "open", app: "projects" };
    case "stack":
    case "skills":
    case "pacotes":
      return { kind: "open", app: "stack" };
    case "contact":
    case "contato":
      return { kind: "open", app: "contact" };
    case "cmd":
    case "prompt":
    case "term":
    case "terminal":
      return { kind: "open", app: "cmd" };
    case "run":
    case "executar":
    case "dmenu":
    case "launcher":
      return { kind: "open", app: "run" };
    case "mine":
    case "campominado":
      return { kind: "open", app: "mine" };
    case "recycle":
    case "lixeira":
    case "trash":
      return { kind: "open", app: "recycle" };
    case "sysinfo":
    case "neofetch":
      return { kind: "open", app: "winver" };
    case "panic":
      return { kind: "panic" };
    case "clear":
    case "cls":
      return { kind: "clear" };
    case "exit":
    case "sair":
      return { kind: "exit" };
    case "whoami":
      return { kind: "output", lines: ["rafael"] };
    case "pwd":
      return { kind: "output", lines: ["/home/rafael"] };
    case "uname":
    case "uname -a":
      return { kind: "output", lines: [UNAME_OUTPUT] };
    case "date":
    case "data":
      return { kind: "output", lines: [new Date().toLocaleString("pt-BR")] };
    case "ls":
    case "ls -la":
    case "dir":
      return { kind: "output", lines: LS_OUTPUT };
    case "pacman":
    case "pacman -syu":
    case "sudo pacman -syu":
      return { kind: "output", lines: PACMAN_OUTPUT };
    case "sudo":
    case "sudo su":
      return { kind: "output", lines: SUDO_OUTPUT };
    default:
      return {
        kind: "error",
        message: `zsh: command not found: ${trimmed}`,
      };
  }
}
