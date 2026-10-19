import { stories } from "@/data/stories";
import type { Completion } from "@/lib/types";
import { dayKey } from "@/lib/streak";

const DAY = 86_400_000;

function parse(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(k: string, n: number): string {
  const d = parse(k);
  return dayKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
}
function diffDays(a: string, b: string): number {
  return Math.round((parse(a).getTime() - parse(b).getTime()) / DAY);
}

export type DayStatus = "finished" | "rest" | "missed" | "open" | "none" | "before";

const publishedDays = new Set(stories.map((s) => s.publishDate));

/** A day counts only if a story was published for it. */
export function isPublishedDay(k: string): boolean {
  return publishedDays.has(k);
}

export type Timeline = {
  joinedOn: string;
  today: string;
  status: Record<string, DayStatus>;
  told: Set<string>;
  finished: Set<string>;
};

/**
 * Build the day-by-day status from the join date to today.
 * One rest day per rolling 7 days is applied automatically to the first missed day.
 */
export function buildTimeline(completions: Completion[], today: string, joinedOn?: string): Timeline {
  const finished = new Set(completions.map((c) => c.completed_on));
  const told = new Set(completions.filter((c) => c.told === true).map((c) => c.completed_on));
  const first = completions.length ? completions.map((c) => c.completed_on).sort()[0] : today;
  const joined = joinedOn && joinedOn < first ? joinedOn : first;
  const status: Record<string, DayStatus> = {};
  let lastRest: string | null = null;
  const n = Math.max(0, diffDays(today, joined));
  for (let i = 0; i <= n; i++) {
    const k = addDays(joined, i);
    if (!isPublishedDay(k) && !finished.has(k)) {
      status[k] = "none";
      continue;
    }
    if (finished.has(k)) {
      status[k] = "finished";
    } else if (k === today) {
      status[k] = "open";
    } else if (!lastRest || diffDays(k, lastRest) >= 7) {
      status[k] = "rest";
      lastRest = k;
    } else {
      status[k] = "missed";
    }
  }
  return { joinedOn: joined, today, status, told, finished };
}

export type WindowScore = { window: number; score: number; unlocked: boolean; unlocksInDays: number };

export function scoreForWindow(t: Timeline, window: number): WindowScore {
  const sinceJoin = diffDays(t.today, t.joinedOn) + 1;
  let N = 0;
  let F = 0;
  let T = 0;
  for (let i = 0; i < window; i++) {
    const k = addDays(t.today, -i);
    const s = t.status[k];
    if (!s) continue;
    if (s === "finished") {
      N++;
      F++;
      if (t.told.has(k)) T++;
    } else if (s === "missed" || s === "open") {
      N++;
    }
  }
  if (window === 7 && sinceJoin < 7) N = Math.max(N, 7);
  const score = N === 0 ? 0 : Math.round(100 * (0.7 * (F / N) + 0.3 * (T / N)));
  const unlocked = window === 7 || sinceJoin >= window;
  return { window, score, unlocked, unlocksInDays: unlocked ? 0 : window - sinceJoin };
}

export function allScores(t: Timeline): WindowScore[] {
  return [7, 30, 90, 365].map((w) => scoreForWindow(t, w));
}

export type StreakResult = { current: number; best: number };

export function streaks(t: Timeline): StreakResult {
  const days = Object.keys(t.status).sort();
  let run = 0;
  let best = 0;
  for (const k of days) {
    const s = t.status[k];
    if (s === "finished") {
      run++;
      best = Math.max(best, run);
    } else if (s === "missed") {
      run = 0;
    }
  }
  // current streak: walk back from today; open, rest and none days do not break it
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const s = t.status[days[i]];
    if (s === "finished") current++;
    else if (s === "missed") break;
  }
  return { current, best };
}

/** The change in the 7-day score caused by today's finished story. */
export function coolerMoment(before: number, after: number): { kind: "percent"; value: number } | { kind: "plain" } {
  if (before >= 20 && after > before) {
    const x = Math.round(((after - before) / before) * 100);
    if (x >= 1) return { kind: "percent", value: x };
  }
  return { kind: "plain" };
}

// ---- badges ----

export type Badge = { id: string; name: string; how: string; group: string };

export const BADGES: Badge[] = [
  { id: "week", name: "a week of cool", how: "finish a story on 7 days in a row", group: "showing up" },
  { id: "month", name: "a month of cool", how: "30 days in a row", group: "showing up" },
  { id: "quarter", name: "a quarter of cool", how: "90 days in a row", group: "showing up" },
  { id: "year", name: "a year, disgustingly cool", how: "365 days in a row", group: "showing up" },
  { id: "told1", name: "first told", how: "tell your first story to someone", group: "telling" },
  { id: "told10", name: "ten told", how: "tell 10 stories to someone", group: "telling" },
  { id: "told50", name: "fifty told", how: "tell 50 stories to someone", group: "telling" },
  { id: "explorer", name: "explorer", how: "finish stories in 5 different subjects", group: "range" },
  { id: "polymath", name: "polymath", how: "finish stories in all 10 subjects", group: "range" },
  { id: "comeback", name: "comeback", how: "finish a story after 3 or more days away", group: "resilience" },
  { id: "weekend", name: "weekend regular", how: "finish 8 weekend stories", group: "rhythm" },
  { id: "coolmonth", name: "cool month", how: "keep your 7-day score at 80 or more across a whole month", group: "monthly" },
];

export function earnedBadges(completions: Completion[], today: string, joinedOn?: string): Set<string> {
  const t = buildTimeline(completions, today, joinedOn);
  const out = new Set<string>();
  const { best } = streaks(t);
  if (best >= 7) out.add("week");
  if (best >= 30) out.add("month");
  if (best >= 90) out.add("quarter");
  if (best >= 365) out.add("year");

  const toldCount = completions.filter((c) => c.told === true).length;
  if (toldCount >= 1) out.add("told1");
  if (toldCount >= 10) out.add("told10");
  if (toldCount >= 50) out.add("told50");

  const fields = new Set<string>();
  for (const c of completions) {
    const s = stories.find((x) => x.id === c.story_id);
    s?.fields.forEach((f) => fields.add(f));
  }
  if (fields.size >= 5) out.add("explorer");
  if (fields.size >= 10) out.add("polymath");

  const days = [...new Set(completions.map((c) => c.completed_on))].sort();
  for (let i = 1; i < days.length; i++) {
    if (diffDays(days[i], days[i - 1]) >= 4) out.add("comeback");
  }

  const weekend = days.filter((k) => {
    const w = parse(k).getDay();
    return w === 0 || w === 6;
  });
  if (weekend.length >= 8) out.add("weekend");

  // cool month: every day of a fully elapsed calendar month had a 7-day score of 80 or more on average
  const months = new Map<string, number[]>();
  for (const k of Object.keys(t.status)) {
    const m = k.slice(0, 7);
    const sub = { ...t, today: k };
    months.set(m, [...(months.get(m) ?? []), scoreForWindow(sub, 7).score]);
  }
  for (const [m, scores] of months) {
    const [y, mo] = m.split("-").map(Number);
    const daysInMonth = new Date(y, mo, 0).getDate();
    const lastDay = `${m}-${String(daysInMonth).padStart(2, "0")}`;
    if (lastDay < today && scores.length >= daysInMonth) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avg >= 80) out.add("coolmonth");
    }
  }
  return out;
}

export function newBadgesFor(before: Completion[], after: Completion[], today: string, joinedOn?: string): string[] {
  const a = earnedBadges(before, today, joinedOn);
  const b = earnedBadges(after, today, joinedOn);
  return [...b].filter((x) => !a.has(x));
}
