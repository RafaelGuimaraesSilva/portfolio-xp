import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";

import {
  ABOUT,
  CV_SKILLS,
  CV_SUMMARY,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PRINCIPLES,
  PROJECTS,
  STACK,
} from "@/lib/content";
import { SITE } from "@/lib/site";

function json(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

function buildServer() {
  const server = new McpServer(
    { name: "rafael-guimaraes-portfolio", version: "1.0.0" },
    {
      instructions:
        "Read-only access to Rafael Guimarães Silva's portfolio. Every tool reads the same content as the public site, so answers stay consistent with the pages. Use get_project before describing a case in detail.",
    },
  );

  server.registerTool(
    "get_profile",
    {
      title: "Get profile",
      description:
        "Current role, location, availability, contact links and a short professional summary.",
      inputSchema: {},
    },
    async () =>
      json({
        name: SITE.name,
        role: SITE.role,
        location: SITE.location,
        timezone: SITE.timezone,
        availability: SITE.availability,
        summary: CV_SUMMARY,
        contact: {
          email: SITE.email,
          phone: SITE.phone,
          whatsapp: SITE.whatsapp,
          github: SITE.github,
          linkedin: SITE.linkedin,
          site: SITE.url,
        },
      }),
  );

  server.registerTool(
    "list_projects",
    {
      title: "List projects",
      description:
        "Case studies with slug, year, role, stack and one-line summary. Use get_project for the full write-up.",
      inputSchema: {},
    },
    async () =>
      json(
        PROJECTS.map((project) => ({
          slug: project.slug,
          name: project.name,
          year: project.year,
          role: project.role,
          stack: project.stack,
          summary: project.summary,
          highlight: project.highlight,
          featured: Boolean(project.featured),
          url: `${SITE.url}/projetos/${project.slug}`,
        })),
      ),
  );

  server.registerTool(
    "get_project",
    {
      title: "Get project",
      description:
        "Full case study: problem, constraints, technical decision, impact, learnings and the architecture diagram.",
      inputSchema: { slug: z.string().describe("Project slug from list_projects") },
    },
    async ({ slug }) => {
      const project = PROJECTS.find((item) => item.slug === slug);
      if (!project) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Unknown slug "${slug}". Available: ${PROJECTS.map((item) => item.slug).join(", ")}.`,
            },
          ],
          isError: true,
        };
      }
      return json({ ...project, url: `${SITE.url}/projetos/${project.slug}` });
    },
  );

  server.registerTool(
    "get_experience",
    {
      title: "Get experience",
      description: "Professional experience with periods, roles and responsibilities.",
      inputSchema: {},
    },
    async () => json(EXPERIENCE),
  );

  server.registerTool(
    "get_skills",
    {
      title: "Get skills",
      description: "Technical stack grouped by area and where each group is applied.",
      inputSchema: {},
    },
    async () => json({ stack: STACK, cvSkills: CV_SKILLS }),
  );

  server.registerTool(
    "get_cv",
    {
      title: "Get CV",
      description:
        "Resume facts: summary, education, languages, skills and working principles.",
      inputSchema: {},
    },
    async () =>
      json({
        summary: CV_SUMMARY,
        education: EDUCATION,
        languages: LANGUAGES,
        skills: CV_SKILLS,
        principles: PRINCIPLES,
        resumeUrl: `${SITE.url}/cv`,
      }),
  );

  server.registerTool(
    "search_content",
    {
      title: "Search content",
      description:
        "Case-insensitive search across project cases, experience and stack. Returns matching snippets with where they came from.",
      inputSchema: {
        query: z.string().min(2).describe("Term to search, e.g. 'n8n', 'RAG', 'Linux'"),
      },
    },
    async ({ query }) => {
      const term = query.toLowerCase();
      const hits: { source: string; text: string }[] = [];

      for (const project of PROJECTS) {
        const text = [
          project.name,
          project.summary,
          project.problem,
          project.decision,
          project.impact,
          ...project.constraints,
          ...project.stack,
        ].join(" ");
        if (text.toLowerCase().includes(term)) {
          hits.push({ source: `project:${project.slug}`, text: project.summary });
        }
      }

      for (const role of EXPERIENCE) {
        if (`${role.role} ${role.company} ${role.bullets.join(" ")}`.toLowerCase().includes(term)) {
          hits.push({ source: `experience:${role.company}`, text: role.bullets.join(" ") });
        }
      }

      for (const group of STACK) {
        if (`${group.area} ${group.tools.join(" ")}`.toLowerCase().includes(term)) {
          hits.push({ source: `stack:${group.area}`, text: group.tools.join(", ") });
        }
      }

      for (const paragraph of ABOUT) {
        if (paragraph.toLowerCase().includes(term)) {
          hits.push({ source: "about", text: paragraph });
        }
      }

      return json({ query, matches: hits.length, hits: hits.slice(0, 8) });
    },
  );

  return server;
}

async function handle(request: Request) {
  const server = buildServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);
  return transport.handleRequest(request);
}

export { handle as POST, handle as GET, handle as DELETE };
