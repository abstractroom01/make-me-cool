import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const layout = readFileSync(path.resolve(__dirname, "..", "src", "app", "layout.tsx"), "utf8");

describe("layout", () => {
  it("clarity script tag id does not shadow window.clarity", () => {
    const ids = [...layout.matchAll(/<Script[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) expect(id).not.toBe("clarity");
  });
  it("loads the clarity project tag", () => expect(layout).toContain("z55qgti7ty"));
  it("has the search console verification tag", () => expect(layout).toContain("verification"));
});
