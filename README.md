# Portfólio — rafael@arch

Portfólio interativo de **Rafael Guimarães Silva**, desenvolvedor fullstack e
especialista em automações. A interface simula um desktop **Arch Linux com
Hyprland**: boot, login, barra superior estilo Waybar, launcher, janelas
flutuantes e aplicativos temáticos.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Bun

## Rodando localmente

```bash
bun install
bun dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
bun dev     # ambiente de desenvolvimento
bun build   # build de produção
bun start   # serve o build
bun lint    # ESLint
```

## O que tem no desktop

- **Sobre mim** — trajetória, especialidades e impacto.
- **Projetos** — detalhes de problema, decisão técnica e impacto.
- **pacman -Q** — stack como pacotes instalados.
- **Terminal** — comandos como `help`, `neofetch`, `pacman` e `panic`.
- **Launcher** — busca de aplicativos estilo rofi.
- **Campo Minado** e **Lixeira** — easter eggs.

Atalhos: `Super + Enter` abre o terminal, `Super + Q` fecha a janela em foco,
`Super + E` abre os projetos e `Super + D` abre o launcher. `Esc` também fecha
a janela em foco.

## Estrutura

```text
src/
  app/                 layout, metadata, CSS global
  components/
    apps/              conteúdo de cada aplicativo
    desktop/           shell, janelas, barra, boot e login
    icons/             ícones SVG
  lib/                 dados do portfólio, comandos e window manager
```

## Deploy

O projeto é compatível com qualquer plataforma que rode Next.js. Defina
`NEXT_PUBLIC_SITE_URL` com a URL pública para canonical, sitemap e Open Graph.
