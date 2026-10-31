import type { MetadataRoute } from "next";
import { stories } from "@/data/stories";

const base = "https://makemecool.me";

// rebuilt at most once a day, so each new story appears without a redeploy
export const revalidate = 86400;

// Only stories already published are listed, so tomorrow's story is not advertised early.
export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);
  const pages = ["", "/how", "/privacy", "/terms", "/refunds"].map((p) => ({ url: `${base}${p}` }));
  const published = stories
    .filter((s) => s.publishDate <= today)
    .map((s) => ({ url: `${base}/s/${s.id}`, lastModified: s.publishDate }));
  return [...pages, ...published];
}
