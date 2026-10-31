import { dayKey } from "@/lib/streak";

// Stories unlock at each reader's local midnight. The earliest place on earth is UTC+14, so a share link
// opens the moment anyone could legitimately have the story, and not a day before.
const EARLIEST_OFFSET_HOURS = 14;

export function earliestToday(now: Date = new Date()): string {
  const shifted = new Date(now.getTime() + EARLIEST_OFFSET_HOURS * 3_600_000);
  return dayKey(new Date(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()));
}

export function isLive(publishDate: string, now: Date = new Date()): boolean {
  return publishDate <= earliestToday(now);
}
