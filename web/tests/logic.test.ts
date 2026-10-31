import { describe, it, expect, beforeEach } from "vitest";
import { stories } from "@/data/stories";
import { storyForToday, publishedStories, isArchived } from "@/lib/schedule";
import { buildTimeline, scoreForWindow, allScores, streaks, coolerMoment, earnedBadges, newBadgesFor, BADGES, isPublishedDay } from "@/lib/score";
import { weekStrip } from "@/lib/week";
import { dailyReminderIcs } from "@/lib/ics";
import { squares, shareText } from "@/lib/share";
import type { Completion } from "@/lib/types";

const first = "2026-10-24";
const comp = (day: string, story_id = "kuleshov", told = false): Completion => ({ story_id, completed_on: day, correct: 3, total: 4, points: 60, told });

describe("schedule", () => {
  it("before launch shows the first story, unpublished", () => {
    const r = storyForToday("2026-10-01");
    expect(r.story.id).toBe(stories.find((s) => s.publishDate === first)!.id);
    expect(r.published).toBe(false);
  });
  it.each(stories.map((s) => [s.publishDate, s.id] as const))("%s serves %s", (day, id) => {
    const r = storyForToday(day);
    expect(r.story.id).toBe(id);
    expect(r.published).toBe(true);
  });
  it("after the last story shows the latest, unpublished", () => {
    const last = [...stories].sort((a, b) => b.publishDate.localeCompare(a.publishDate))[0];
    const r = storyForToday("2030-01-01");
    expect(r.story.id).toBe(last.id);
    expect(r.published).toBe(false);
  });
  it("published list is newest first and never future", () => {
    const list = publishedStories("2026-11-05");
    expect(list.length).toBe(13);
    for (let i = 1; i < list.length; i++) expect(list[i - 1].publishDate > list[i].publishDate).toBe(true);
    expect(list.every((s) => s.publishDate <= "2026-11-05")).toBe(true);
  });
  it("publishedStories is empty before launch", () => expect(publishedStories("2026-10-23")).toEqual([]));
  it.each([
    ["2026-10-24", "2026-10-24", false], ["2026-10-24", "2026-10-30", false], ["2026-10-24", "2026-10-31", true],
    ["2026-10-24", "2026-11-30", true], ["2026-11-05", "2026-11-05", false],
  ])("isArchived(%s on %s) = %s", (pd, today, exp) => {
    const s = stories.find((x) => x.publishDate === pd)!;
    expect(isArchived(s, today)).toBe(exp);
  });
  it("isPublishedDay matches the story set", () => {
    expect(isPublishedDay(first)).toBe(true);
    expect(isPublishedDay("2026-10-23")).toBe(false);
  });
});

describe("timeline and scores", () => {
  it("no completions: today open, score 0", () => {
    const t = buildTimeline([], "2026-10-26");
    expect(t.status["2026-10-26"]).toBe("open");
    expect(scoreForWindow(t, 7).score).toBe(0);
  });
  it("finished day is marked finished", () => {
    const t = buildTimeline([comp("2026-10-26")], "2026-10-26");
    expect(t.status["2026-10-26"]).toBe("finished");
  });
  it("a perfect, told week scores 100", () => {
    const days = ["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30"];
    const t = buildTimeline(days.map((d) => comp(d, "kuleshov", true)), "2026-10-30");
    expect(scoreForWindow(t, 7).score).toBe(100);
  });
  it("a finished-but-untold week scores 70", () => {
    const days = ["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30"];
    const t = buildTimeline(days.map((d) => comp(d)), "2026-10-30");
    expect(scoreForWindow(t, 7).score).toBe(70);
  });
  it("first missed day in 7 is a rest day, second is missed", () => {
    const t = buildTimeline([comp("2026-10-24"), comp("2026-10-27")], "2026-10-28", "2026-10-24");
    expect(t.status["2026-10-25"]).toBe("rest");
    expect(t.status["2026-10-26"]).toBe("missed");
  });
  it("windows 30, 90, 365 are locked early", () => {
    const t = buildTimeline([comp("2026-10-26")], "2026-10-26");
    const s = allScores(t);
    expect(s.map((x) => x.window)).toEqual([7, 30, 90, 365]);
    expect(s[0].unlocked).toBe(true);
    expect(s[1].unlocked).toBe(false);
    expect(s[1].unlocksInDays).toBe(29);
  });
  it("score is between 0 and 100 for many shapes", () => {
    for (let n = 0; n <= 14; n++) {
      const days = Array.from({ length: n }, (_, i) => `2026-10-${String(24 + (i % 7)).padStart(2, "0")}`);
      const t = buildTimeline(days.map((d, i) => comp(d, "kuleshov", i % 2 === 0)), "2026-11-05");
      for (const w of allScores(t)) {
        expect(w.score).toBeGreaterThanOrEqual(0);
        expect(w.score).toBeLessThanOrEqual(100);
      }
    }
  });
  it("streaks: three in a row", () => {
    const t = buildTimeline([comp("2026-10-24"), comp("2026-10-25"), comp("2026-10-26")], "2026-10-26");
    expect(streaks(t)).toEqual({ current: 3, best: 3 });
  });
  it("streaks: a missed day resets current but keeps best", () => {
    const t = buildTimeline(
      [comp("2026-10-24"), comp("2026-10-25"), comp("2026-10-26"), comp("2026-10-29"), comp("2026-10-30")],
      "2026-10-30",
    );
    const r = streaks(t);
    expect(r.best).toBeGreaterThanOrEqual(3);
    expect(r.current).toBeGreaterThanOrEqual(2);
  });
});

describe("coolerMoment", () => {
  it.each([
    [50, 60, { kind: "percent", value: 20 }], [20, 30, { kind: "percent", value: 50 }], [100, 100, { kind: "plain" }],
    [10, 40, { kind: "plain" }], [60, 50, { kind: "plain" }], [0, 20, { kind: "plain" }], [95, 96, { kind: "percent", value: 1 }],
  ])("%i -> %i", (b, a, exp) => expect(coolerMoment(b, a)).toEqual(exp));
});

describe("badges", () => {
  it("has 12 badges with unique ids", () => {
    expect(BADGES).toHaveLength(12);
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(12);
  });
  it.each(BADGES.map((b) => [b.id, b] as const))("badge %s is lowercase and explained", (_id, b) => {
    expect(b.name).toBe(b.name.toLowerCase());
    expect(b.how.length).toBeGreaterThan(5);
  });
  it("no completions earns nothing", () => expect(earnedBadges([], "2026-10-26").size).toBe(0));
  it("first told badge", () => expect(earnedBadges([comp("2026-10-26", "kuleshov", true)], "2026-10-26").has("told1")).toBe(true));
  it("untold earns no told badge", () => expect(earnedBadges([comp("2026-10-26")], "2026-10-26").has("told1")).toBe(false));
  it("seven in a row earns week", () => {
    const days = ["2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30"];
    expect(earnedBadges(days.map((d) => comp(d)), "2026-10-30").has("week")).toBe(true);
  });
  it("comeback after 4 days away", () => {
    expect(earnedBadges([comp("2026-10-24"), comp("2026-10-28")], "2026-10-28").has("comeback")).toBe(true);
  });
  it("newBadgesFor lists only what was gained", () => {
    const before = [comp("2026-10-24")];
    const after = [comp("2026-10-24"), { ...comp("2026-10-25", "tikka"), told: true }];
    expect(newBadgesFor(before, after, "2026-10-25")).toContain("told1");
  });
});

describe("week strip", () => {
  it("seven days ending today", () => {
    const w = weekStrip(buildTimeline([comp("2026-10-26")], "2026-10-26"));
    expect(w).toHaveLength(7);
    expect(w[6].today).toBe(true);
    expect(w[6].done).toBe(true);
  });
  it("labels are single lowercase letters", () => {
    for (const x of weekStrip(buildTimeline([], "2026-10-26"))) expect(x.label).toMatch(/^[smtwf]$/);
  });
});

describe("calendar reminder (ics)", () => {
  const ics = dailyReminderIcs("8:05", "https://makemecool.me");
  it("is a vcalendar", () => {
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.endsWith("END:VCALENDAR")).toBe(true);
  });
  it("repeats daily", () => expect(ics).toContain("RRULE:FREQ=DAILY"));
  it("pads the time", () => expect(ics).toMatch(/DTSTART:\d{8}T080500/));
  it("uses CRLF line endings", () => expect(ics.split("\r\n").length).toBeGreaterThan(10));
  it("carries the url", () => expect(ics).toContain("https://makemecool.me"));
  it("has an alarm", () => expect(ics).toContain("BEGIN:VALARM"));
  it.each(["00:00", "07:30", "12:00", "23:59"])("accepts %s", (t) => {
    expect(dailyReminderIcs(t, "https://x.y")).toMatch(/DTSTART:\d{8}T\d{6}/);
  });
});

describe("share text", () => {
  it("squares map right and wrong", () => expect(squares([true, false, true, true])).toBe("🟩⬜🟩🟩"));
  it("squares of nothing is empty", () => expect(squares([])).toBe(""));
  const t = shareText({ title: "the kuleshov effect", day: 1, marks: [true, true, false, true], takeaway: "put two things side by side.", link: "https://makemecool.me/s/kuleshov" });
  it("shows the score", () => expect(t).toContain("3/4"));
  it("shows the title and link", () => {
    expect(t).toContain("the kuleshov effect");
    expect(t).toContain("https://makemecool.me/s/kuleshov");
  });
  it("starts with the brand and day", () => expect(t.startsWith("make me cool · day 1")).toBe(true));
  it("omits the score row when there are no marks", () => {
    expect(shareText({ title: "t", day: 2, marks: [], takeaway: "x", link: "l" })).not.toContain("/");
  });
});

describe("guest and progress storage", () => {
  const store = new Map<string, string>();
  beforeEach(() => {
    store.clear();
    (globalThis as unknown as { localStorage: Storage }).localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
      key: () => null,
      length: 0,
    } as Storage;
  });
  it("guest list starts empty", async () => {
    const { loadGuest } = await import("@/lib/guest");
    expect(loadGuest()).toEqual([]);
  });
  it("guest list saves and loads", async () => {
    const { loadGuest, saveGuest } = await import("@/lib/guest");
    saveGuest([comp("2026-10-26")]);
    expect(loadGuest()).toHaveLength(1);
  });
  it("guest list clears", async () => {
    const { loadGuest, saveGuest, clearGuest } = await import("@/lib/guest");
    saveGuest([comp("2026-10-26")]);
    clearGuest();
    expect(loadGuest()).toEqual([]);
  });
  it("corrupt guest data does not throw", async () => {
    const { loadGuest } = await import("@/lib/guest");
    store.set("mmc_guest_completions", "{not json");
    expect(loadGuest()).toEqual([]);
  });
  it("progress saves and merges", async () => {
    const { saveProgress, getProgress } = await import("@/lib/progress");
    saveProgress("kuleshov", { card: 3 });
    saveProgress("kuleshov", { q: { i: 1, correct: 1, marks: [true] } });
    const p = getProgress("kuleshov");
    expect(p?.card).toBe(3);
    expect(p?.q?.i).toBe(1);
  });
  it("progress for another story is ignored", async () => {
    const { saveProgress, getProgress } = await import("@/lib/progress");
    saveProgress("kuleshov", { card: 2 });
    expect(getProgress("tikka")).toBeNull();
  });
  it("progress clears", async () => {
    const { saveProgress, getProgress, clearProgress } = await import("@/lib/progress");
    saveProgress("kuleshov", { card: 2 });
    clearProgress();
    expect(getProgress("kuleshov")).toBeNull();
  });
  it("corrupt progress does not throw", async () => {
    const { getProgress } = await import("@/lib/progress");
    store.set("mmc_progress", "nope");
    expect(getProgress("kuleshov")).toBeNull();
  });
});
