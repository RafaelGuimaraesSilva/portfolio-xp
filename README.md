# Portfólio — Rafael Guimarães Silva

Portfólio editorial em tema escuro para **Rafael Guimarães Silva**, supervisor
de operações técnicas e desenvolvedor fullstack. Cases escritos como problema →
decisão técnica → impacto, com diagramas em texto (sem prints de cliente).

O site também expõe um **servidor MCP somente leitura** em `/api/mcp`, então
qualquer agente compatível consulta perfil, cases, experiências e CV sem
depender de scraping.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Bun
- `@modelcontextprotocol/sdk` (transporte Streamable HTTP, modo stateless)

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

## Estrutura

```text
src/
  app/
    api/mcp/           servidor MCP (JSON-RPC over HTTP)
    projetos/[slug]/   case pages + Open Graph por case
    cv/                currículo print-first
  components/
    sections/          hero, trabalho, experiência, stack, sobre, contato
    ui/                primitivos (heading, tag)
  lib/
    content.ts         todo o conteúdo editorial tipado
    site.ts            identidade, contatos e navegação
```

Conteúdo, cases e currículo vivem em `src/lib/content.ts`. Alterar texto não
exige mexer em componente.

## Servidor MCP

Endpoint: `POST /api/mcp` com `Accept: application/json, text/event-stream`.

Ferramentas: `get_profile`, `list_projects`, `get_project`, `get_experience`,
`get_skills`, `get_cv`, `search_content`.

```bash
curl -s http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{"name":"get_project","arguments":{"slug":"crm-rag"}}}'
```

O servidor é stateless: cada requisição monta o servidor, responde e encerra.
Nenhuma escrita, nenhum dado de visitante.

`/llms.txt` publica o mesmo conteúdo como índice em texto para agentes que
preferem ler antes de chamar ferramentas.

## Deploy

Compatível com qualquer plataforma que rode Next.js. Defina
`NEXT_PUBLIC_SITE_URL` com a URL pública para canonical, sitemap e Open Graph.
