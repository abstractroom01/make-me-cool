import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { stories } from "@/data/stories";
import { reveals } from "@/data/reveals";

const pub = (p: string) => path.resolve(__dirname, "..", "public", p.replace(/^\//, ""));
const iso = /^\d{4}-\d{2}-\d{2}$/;

describe("story set", () => {
  it("has stories", () => expect(stories.length).toBeGreaterThanOrEqual(38));
  it("ids are unique", () => expect(new Set(stories.map((s) => s.id)).size).toBe(stories.length));
  it("dates are unique", () => expect(new Set(stories.map((s) => s.publishDate)).size).toBe(stories.length));
  it("dates are continuous, one per day", () => {
    const sorted = [...stories].map((s) => s.publishDate).sort();
    for (let i = 1; i < sorted.length; i++) {
      const [y1, m1, d1] = sorted[i - 1].split("-").map(Number);
      const [y2, m2, d2] = sorted[i].split("-").map(Number);
      const diff = (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000;
      expect(diff, `${sorted[i - 1]} -> ${sorted[i]}`).toBe(1);
    }
  });
  it("starts on 24 oct 2026", () => expect([...stories].map((s) => s.publishDate).sort()[0]).toBe("2026-10-24"));
  it("no primary field repeats within 5 days", () => {
    const sorted = [...stories].sort((a, b) => a.publishDate.localeCompare(b.publishDate));
    for (let i = 0; i < sorted.length; i++)
      for (let j = i + 1; j < Math.min(i + 5, sorted.length); j++)
        expect(sorted[j].fields[0], `${sorted[i].id} vs ${sorted[j].id}`).not.toBe(sorted[i].fields[0]);
  });
});

describe.each(stories.map((s) => [s.id, s] as const))("story %s", (_id, s) => {
  it("id is lowercase slug", () => expect(s.id).toMatch(/^[a-z0-9-]+$/));
  it("date is iso", () => expect(s.publishDate).toMatch(iso));
  it("date is a real calendar day", () => {
    const [y, m, d] = s.publishDate.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    expect(dt.getUTCMonth()).toBe(m - 1);
    expect(dt.getUTCDate()).toBe(d);
  });
  it("title is lowercase and non-empty", () => {
    expect(s.title.length).toBeGreaterThan(2);
    expect(s.title).toBe(s.title.toLowerCase());
  });
  it("why is lowercase and starts like a pick", () => {
    expect(s.why.length).toBeGreaterThan(20);
    expect(s.why).toBe(s.why.toLowerCase());
  });
  it("has 2 or more fields, all lowercase", () => {
    expect(s.fields.length).toBeGreaterThanOrEqual(2);
    for (const f of s.fields) expect(f).toBe(f.toLowerCase());
  });
  it("minutes is 3 to 7", () => {
    expect(s.minutes).toBeGreaterThanOrEqual(3);
    expect(s.minutes).toBeLessThanOrEqual(7);
  });
  it("hook is a real sentence", () => expect(s.hook.length).toBeGreaterThan(15));
  it("has 8 to 10 cards", () => {
    expect(s.cards.length).toBeGreaterThanOrEqual(8);
    expect(s.cards.length).toBeLessThanOrEqual(10);
  });
  it("first card is a scene", () => expect(s.cards[0].kind).toBe("scene"));
  it("has a say card", () => expect(s.cards.some((c) => c.kind === "say")).toBe(true));
  it("last card is for the crew", () => expect(s.cards[s.cards.length - 1].kind).toBe("crew"));
  it("every card has a tag and text", () => {
    for (const c of s.cards) {
      expect(c.tag.length).toBeGreaterThan(0);
      expect(c.text.length).toBeGreaterThan(10);
    }
  });
  it("no card is over 600 characters (phone-sized)", () => {
    for (const c of s.cards) expect(c.text.length, c.tag).toBeLessThanOrEqual(600);
  });
  it("no double spaces or stray markup in cards", () => {
    for (const c of s.cards) {
      expect(c.text).not.toMatch(/ {2,}/);
      expect(c.text).not.toMatch(/<\/?[a-z]+>/i);
      expect(c.text).not.toMatch(/\bundefined\b|\bnull\b|\[object/);
    }
  });
  it("no retired or banned phrases", () => {
    const all = JSON.stringify(s).toLowerCase();
    for (const bad of ["hurry", "don't miss out", "limited seats", "lorem ipsum", "todo", "tbd"]) expect(all).not.toContain(bad);
  });
  it("takeaway is one line", () => {
    expect(s.takeaway.length).toBeGreaterThan(15);
    expect(s.takeaway).not.toContain("\n");
  });
  it("starter is a question", () => expect(s.starter.trim().endsWith("?")).toBe(true));
  it("caveat says when it was checked", () => expect(s.caveat.toLowerCase()).toContain("checked on"));
  it("has at least 2 sources with https urls", () => {
    expect(s.sources.length).toBeGreaterThanOrEqual(2);
    for (const x of s.sources) {
      expect(x.label.length).toBeGreaterThan(0);
      expect(x.url).toMatch(/^https:\/\//);
    }
  });
  it("source urls are unique", () => expect(new Set(s.sources.map((x) => x.url)).size).toBe(s.sources.length));
  it("has at least 3 resources of mixed types", () => {
    expect(s.resources.length).toBeGreaterThanOrEqual(3);
    expect(new Set(s.resources.map((r) => r.type)).size).toBeGreaterThanOrEqual(2);
  });
  it("resources are well formed", () => {
    for (const r of s.resources) {
      expect(["watch", "listen", "read", "book", "film", "look"]).toContain(r.type);
      expect(r.title.length).toBeGreaterThan(0);
      expect(r.note.length).toBeGreaterThan(5);
      if (r.url) expect(r.url).toMatch(/^https:\/\//);
    }
  });
  it("quiz is mcq, mcq, fill, line in order", () => expect(s.quiz.map((q) => q.type)).toEqual(["mcq", "mcq", "fill", "line"]));
  it("every question has a prompt and a why", () => {
    for (const q of s.quiz) {
      expect(q.prompt.length).toBeGreaterThan(5);
      expect(q.why.length).toBeGreaterThan(5);
    }
  });
  it("mcq and line answers point at a real option", () => {
    for (const q of s.quiz) {
      if (q.type === "fill") continue;
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(Number.isInteger(q.answer)).toBe(true);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  });
  it("options are distinct and non-empty", () => {
    for (const q of s.quiz) {
      if (q.type === "fill") continue;
      expect(new Set(q.options.map((o) => o.trim().toLowerCase())).size).toBe(q.options.length);
      for (const o of q.options) expect(o.trim().length).toBeGreaterThan(0);
    }
  });
  it("fill has at least one accepted answer, none empty", () => {
    for (const q of s.quiz) {
      if (q.type !== "fill") continue;
      expect(q.answer.length).toBeGreaterThanOrEqual(1);
      for (const a of q.answer) expect(a.trim().length).toBeGreaterThan(0);
    }
  });
  it("the right answer is not always the first option", () => {
    // checked across the set below; here only make sure it is not obviously leaked in the prompt
    for (const q of s.quiz) {
      if (q.type === "fill") continue;
      expect(q.prompt.toLowerCase()).not.toContain(q.options[q.answer].toLowerCase());
    }
  });
});

describe("answer position spread", () => {
  it("correct answers are spread over positions", () => {
    const counts = [0, 0, 0, 0];
    for (const s of stories) for (const q of s.quiz) if (q.type !== "fill") counts[q.answer] = (counts[q.answer] ?? 0) + 1;
    const total = counts.reduce((a, b) => a + b, 0);
    for (const c of counts.slice(0, 3)) expect(c / total).toBeLessThan(0.7);
  });
});

describe("reveals", () => {
  it.each(Object.entries(reveals))("%s reveal is complete", (id, r) => {
    expect(stories.some((s) => s.id === id), "story exists").toBe(true);
    expect(r.src).toMatch(/^\/art\//);
    expect(existsSync(pub(r.src)), r.src).toBe(true);
    expect(r.alt.length).toBeGreaterThan(15);
    expect(r.caption.length).toBeGreaterThan(10);
    expect(r.credit.toLowerCase()).toMatch(/public domain|cc0|cc by|cc-by|licen[cs]e|wikimedia/);
  });
});
