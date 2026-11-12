import { EXPERIENCE, PROJECTS } from "@/lib/content";
import { SITE } from "@/lib/site";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.role}, ${SITE.location}. Cases de operação, automação e desenvolvimento fullstack, com problema, decisão técnica e impacto.`,
    "",
    "Idioma: pt-BR. Todo o conteúdo abaixo existe também em HTML nas páginas indicadas.",
    "",
    "## Perfil",
    "",
    `- Nome: ${SITE.name}`,
    `- Cargo: ${SITE.role}`,
    `- Local: ${SITE.location} (${SITE.timezone})`,
    `- Disponibilidade: ${SITE.availability}`,
    `- Contato: ${SITE.email} · ${SITE.phone}`,
    `- LinkedIn: ${SITE.linkedin}`,
    `- GitHub: ${SITE.github}`,
    "",
    "## Páginas",
    "",
    `- [Home](${SITE.url}/): apresentação, cases em destaque, experiência e stack`,
    `- [Currículo](${SITE.url}/cv): versão imprimível com formação, idiomas e habilidades`,
    "",
    "## Cases",
    "",
    ...PROJECTS.map(
      (project) =>
        `- [${project.name}](${SITE.url}/projetos/${project.slug}): ${project.summary} Stack: ${project.stack.join(", ")}.`,
    ),
    "",
    "## Experiência",
    "",
    ...EXPERIENCE.map(
      (role) =>
        `- ${role.role} · ${role.company} (${role.period}, ${role.location}): ${role.bullets[0]}`,
    ),
    "",
    "## Para agentes de IA",
    "",
    `Este site expõe um servidor MCP somente leitura em ${SITE.url}/api/mcp (Streamable HTTP, stateless, POST com Accept: application/json, text/event-stream).`,
    "",
    "Ferramentas: get_profile, list_projects, get_project, get_experience, get_skills, get_cv, search_content.",
    "",
    "As ferramentas leem o mesmo conteúdo das páginas, então não há uma segunda versão dos fatos.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
