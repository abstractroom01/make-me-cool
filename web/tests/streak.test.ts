import { describe, it, expect } from "vitest";
import { computeStreak, dayKey, pointsFor } from "@/lib/streak";

const d = (s: string) => {
  const [y, m, day] = s.split("-").map(Number);
  return new Date(y, m - 1, day, 12);
};

describe("dayKey", () => {
  it.each([["2026-10-24"], ["2026-01-01"], ["2026-12-31"], ["2027-02-28"], ["2028-02-29"], ["2026-11-09"]])("round trips %s", (k) =>
    expect(dayKey(d(k))).toBe(k),
  );
  it("pads month and day", () => expect(dayKey(new Date(2026, 0, 5))).toBe("2026-01-05"));
});

describe("pointsFor", () => {
  it.each([
    [0, 4, 20], [1, 4, 30], [2, 4, 40], [3, 4, 50], [4, 4, 70],
    [0, 3, 20], [1, 3, 30], [2, 3, 40], [3, 3, 60],
    [0, 1, 20], [1, 1, 40], [5, 5, 80],
  ])("%i of %i -> %i", (c, t, p) => expect(pointsFor(c, t)).toBe(p));
  it("perfect always beats one short", () => {
    for (let t = 1; t <= 8; t++) expect(pointsFor(t, t)).toBeGreaterThan(pointsFor(t - 1, t));
  });
});

describe("computeStreak (2026-10-26 is a monday)", () => {
  it("empty is zero", () => expect(computeStreak([], d("2026-10-26")).streak).toBe(0));
  it("done today counts one", () => {
    const r = computeStreak(["2026-10-26"], d("2026-10-26"));
    expect(r.streak).toBe(1);
    expect(r.doneToday).toBe(true);
  });
  it("unfinished today does not break the run", () => {
    const r = computeStreak(["2026-10-23", "2026-10-22"], d("2026-10-26"));
    expect(r.streak).toBe(2);
    expect(r.doneToday).toBe(false);
  });
  it("weekend never breaks", () => {
    expect(computeStreak(["2026-10-23", "2026-10-22", "2026-10-21"], d("2026-10-26")).streak).toBe(3);
  });
  it("one missed weekday per week is forgiven", () => {
    expect(computeStreak(["2026-10-23", "2026-10-21", "2026-10-20"], d("2026-10-24")).streak).toBe(3);
  });
  it("two missed weekdays in a week break it", () => {
    expect(computeStreak(["2026-10-23", "2026-10-20"], d("2026-10-24")).streak).toBe(1);
  });
  it("a long unbroken run counts every weekday", () => {
    const days: string[] = [];
    for (let i = 0; i < 28; i++) {
      const x = new Date(2026, 9, 26 - i);
      if (x.getDay() !== 0 && x.getDay() !== 6) days.push(dayKey(x));
    }
    expect(computeStreak(days, d("2026-10-26")).streak).toBe(days.length);
  });
  it("week strip has 7 days ending today", () => {
    const r = computeStreak([], d("2026-10-26"));
    expect(r.week).toHaveLength(7);
    expect(r.week[6].today).toBe(true);
    expect(r.week[6].key).toBe("2026-10-26");
    expect(r.week[0].key).toBe("2026-10-20");
  });
  it("week strip marks weekends", () => {
    const r = computeStreak([], d("2026-10-26"));
    expect(r.week.filter((x) => x.weekend).map((x) => x.key)).toEqual(["2026-10-24", "2026-10-25"]);
  });
  it("week strip marks done days", () => {
    expect(computeStreak(["2026-10-22"], d("2026-10-26")).week.find((x) => x.key === "2026-10-22")?.done).toBe(true);
  });
  it.each(["2026-03-29", "2026-10-25", "2026-11-01", "2027-01-01", "2028-02-29"])("does not throw around %s", (k) => {
    expect(() => computeStreak(["2026-10-24"], d(k))).not.toThrow();
  });
});
