import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/content";
import { SITE } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-11-11T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = PROJECTS.map((project) => ({
    url: `${SITE.url}/projetos/${project.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/cv`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPages,
  ];
}
