const DAY = 86_400_000;

export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseKey(k: string): Date {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function isWeekday(d: Date): boolean {
  const w = d.getDay();
  return w !== 0 && w !== 6;
}

// Monday-based week id, so the one free missed weekday resets each week.
function weekId(d: Date): string {
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  return dayKey(monday);
}

export type StreakInfo = {
  streak: number;
  doneToday: boolean;
  // the last 7 weekdays-or-days ending today, for the week strip
  week: { key: string; label: string; done: boolean; today: boolean; weekend: boolean }[];
};

/**
 * Streak counts weekdays with at least one finished story. One missed weekday
 * per calendar week is forgiven. Weekends never break a streak. Today stays
 * open until local midnight, so an unfinished today does not break it.
 */
export function computeStreak(completedDays: string[], now: Date = new Date()): StreakInfo {
  const done = new Set(completedDays);
  const todayKey = dayKey(now);
  const doneToday = done.has(todayKey);

  let streak = 0;
  const usedMiss = new Set<string>();
  let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  for (let i = 0; i < 400; i++) {
    const key = dayKey(cursor);
    if (isWeekday(cursor)) {
      if (done.has(key)) {
        streak++;
      } else if (key === todayKey) {
        // today is still open
      } else {
        const wk = weekId(cursor);
        if (usedMiss.has(wk)) break;
        usedMiss.add(wk);
      }
    }
    cursor = new Date(cursor.getTime() - DAY);
    // guard against DST drift
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
  }

  const labels = ["s", "m", "t", "w", "t", "f", "s"];
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = dayKey(d);
    week.push({ key, label: labels[d.getDay()], done: done.has(key), today: key === todayKey, weekend: !isWeekday(d) });
  }
  return { streak, doneToday, week };
}

export function pointsFor(correct: number, total: number): number {
  const base = 20 + correct * 10;
  return correct === total ? base + 10 : base;
}

export { parseKey };
