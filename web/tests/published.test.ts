import { describe, it, expect } from "vitest";
import { earliestToday, isLive } from "@/lib/published";
import { stories } from "@/data/stories";

const at = (iso: string) => new Date(iso);

describe("earliestToday (UTC+14)", () => {
  it.each([
    ["2026-10-23T09:59:00Z", "2026-10-23"],
    ["2026-10-23T10:00:00Z", "2026-10-24"],
    ["2026-10-23T23:59:00Z", "2026-10-24"],
    ["2026-10-24T09:59:00Z", "2026-10-24"],
    ["2026-12-31T10:00:00Z", "2027-01-01"],
    ["2028-02-28T10:00:00Z", "2028-02-29"],
  ])("%s -> %s", (now, day) => expect(earliestToday(at(now))).toBe(day));
});

describe("isLive", () => {
  it("a story is hidden before the earliest midnight", () => expect(isLive("2026-10-24", at("2026-10-23T09:00:00Z"))).toBe(false));
  it("a story opens at the earliest midnight", () => expect(isLive("2026-10-24", at("2026-10-23T10:00:00Z"))).toBe(true));
  it("a past story stays open", () => expect(isLive("2026-10-24", at("2027-01-01T00:00:00Z"))).toBe(true));
  it("tomorrow's story is hidden for an india reader at midday", () => expect(isLive("2026-11-02", at("2026-10-31T06:30:00Z"))).toBe(false));
  it.each(stories.map((s) => [s.id, s.publishDate] as const))("%s is hidden a day before %s", (_id, d) => {
    const dayBefore = new Date(Date.parse(`${d}T00:00:00Z`) - 24 * 3_600_000);
    expect(isLive(d, dayBefore)).toBe(false);
  });
});
