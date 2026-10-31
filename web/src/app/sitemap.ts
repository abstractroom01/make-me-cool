import type { MetadataRoute } from "next";
import { stories } from "@/data/stories";
import { isLive } from "@/lib/published";

const base = "https://makemecool.me";

// rebuilt at most once a day, so each new story appears without a redeploy
export const revalidate = 86400;

// Only stories already published are listed, so tomorrow's story is not advertised early.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/how", "/privacy", "/terms", "/refunds"].map((p) => ({ url: `${base}${p}` }));
  const published = stories
    .filter((s) => isLive(s.publishDate))
    .map((s) => ({ url: `${base}/s/${s.id}`, lastModified: s.publishDate }));
  return [...pages, ...published];
}
