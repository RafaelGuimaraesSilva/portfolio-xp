import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROJECTS } from "@/lib/content";

const VALID_SLUGS = new Set(PROJECTS.map((project) => project.slug));

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>404 — Página não encontrada | Rafael Guimarães Silva</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #0a0a0b; color: #f4f4f5; font-family: "Helvetica Neue", Arial, sans-serif;
         padding: 2rem; }
  main { max-width: 34rem; }
  p.kicker { font-family: ui-monospace, monospace; font-size: 0.7rem; letter-spacing: 0.1em;
             text-transform: uppercase; color: #71717a; margin: 0; }
  h1 { font-size: clamp(2.5rem, 8vw, 4rem); line-height: 1; letter-spacing: -0.045em;
       font-weight: 600; margin: 0.75rem 0 0; }
  p.lede { color: #a1a1aa; font-size: 1.0625rem; line-height: 1.6; margin: 1.25rem 0 0; }
  a { display: inline-block; margin-top: 1.75rem; color: #ff8a66; text-decoration: none;
      border: 1px solid rgba(255,255,255,0.2); padding: 0.7rem 1.4rem; border-radius: 2px; }
  a:hover { border-color: #ff5c33; }
</style>
</head>
<body>
<main>
  <p class="kicker">Erro 404</p>
  <h1>Essa página não existe.</h1>
  <p class="lede">O endereço pode ter mudado ou nunca existiu. Os cases e o currículo estão no início.</p>
  <a href="/">Voltar para o início</a>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2] ?? "";

  if (!VALID_SLUGS.has(slug)) {
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/projetos/:slug",
};
