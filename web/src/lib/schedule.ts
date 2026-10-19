import { stories, type Story } from "@/data/stories";
import { dayKey } from "@/lib/streak";

const DAY = 86_400_000;

function parse(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayKey(): string {
  return dayKey(new Date());
}

/** Today's story. Before the first story is published, the first one; after the last, the latest. */
export function storyForToday(today: string = todayKey()): { story: Story; published: boolean } {
  const exact = stories.find((s) => s.publishDate === today);
  if (exact) return { story: exact, published: true };
  const past = stories.filter((s) => s.publishDate <= today).sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  if (past.length) return { story: past[0], published: false };
  return { story: stories[0], published: false };
}

/** Stories already published as of today, newest first. */
export function publishedStories(today: string = todayKey()): Story[] {
  return stories.filter((s) => s.publishDate <= today).sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

/** Free users see the last 7 days of stories. Older ones are part of plus. */
export function isArchived(story: Story, today: string = todayKey()): boolean {
  const age = Math.round((parse(today).getTime() - parse(story.publishDate).getTime()) / DAY);
  return age >= 7;
}
