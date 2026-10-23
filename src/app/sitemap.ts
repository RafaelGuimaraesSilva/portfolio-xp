import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
const LAST_MODIFIED = new Date("2026-10-23T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
