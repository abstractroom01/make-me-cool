import { dayKey } from "@/lib/streak";
import type { Timeline } from "@/lib/score";

const labels = ["s", "m", "t", "w", "t", "f", "s"];

/** The last seven days, ending today, for the week strip. */
export function weekStrip(t: Timeline) {
  const out = [];
  const [y, m, d] = t.today.split("-").map(Number);
  for (let i = 6; i >= 0; i--) {
    const day = new Date(y, m - 1, d - i);
    const key = dayKey(day);
    const s = t.status[key];
    out.push({
      key,
      label: labels[day.getDay()],
      done: s === "finished",
      today: key === t.today,
      weekend: day.getDay() === 0 || day.getDay() === 6,
    });
  }
  return out;
}
