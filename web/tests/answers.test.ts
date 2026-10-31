import { describe, it, expect } from "vitest";
import { checkFill } from "@/lib/answers";

// [typed, accepted answers, expected]
const cases: [string, string[], "exact" | "close" | "wrong"][] = [
  // exact: case, punctuation, articles, spacing, accents
  ["soup", ["soup"], "exact"],
  ["SOUP", ["soup"], "exact"],
  ["Soup!", ["soup"], "exact"],
  ["  soup  ", ["soup"], "exact"],
  ["the soup", ["soup"], "exact"],
  ["a soup", ["soup"], "exact"],
  ["an apple", ["apple"], "exact"],
  ["The Apple", ["apple"], "exact"],
  ["café", ["cafe"], "exact"],
  ["cafe", ["café"], "exact"],
  ["naïve", ["naive"], "exact"],
  ["zoë", ["zoe"], "exact"],
  ["ice cream", ["icecream"], "exact"],
  ["ice-cream", ["ice cream"], "exact"],
  ["icecream", ["ice cream"], "exact"],
  ["hedy lamarr", ["hedy lamarr"], "exact"],
  ["HEDY   LAMARR", ["hedy lamarr"], "exact"],
  ["hedy.lamarr", ["hedy lamarr"], "exact"],
  ["van gogh", ["van gogh", "vincent van gogh"], "exact"],
  ["vincent van gogh", ["van gogh", "vincent van gogh"], "exact"],
  ["1929", ["1929"], "exact"],
  ["nineteen", ["nineteen", "19"], "exact"],
  ["19", ["nineteen", "19"], "exact"],
  ["k-pop", ["kpop"], "exact"],
  ["rock & roll", ["rock roll"], "exact"],
  // close: the answer inside a longer reply
  ["it was soup", ["soup"], "close"],
  ["i think soup", ["soup"], "close"],
  ["the answer is hedy lamarr", ["hedy lamarr"], "close"],
  ["it is zero", ["zero"], "close"],
  ["maybe 1929 or so", ["1929"], "close"],
  // close: a typo on longer words
  ["lamar", ["lamarr"], "close"],
  ["kuleshev", ["kuleshov"], "close"],
  ["antikythra", ["antikythera"], "close"],
  ["frankenstine", ["frankenstein"], "close"],
  ["semmelwies", ["semmelweis"], "close"],
  ["rossetta", ["rosetta"], "close"],
  ["voynitch", ["voynich"], "close"],
  ["stendal", ["stendhal"], "close"],
  ["dabbawalla", ["dabbawala"], "close"],
  ["mughall", ["mughal"], "close"],
  ["panini", ["panini"], "exact"],
  // wrong
  ["", ["soup"], "wrong"],
  ["   ", ["soup"], "wrong"],
  ["!!!", ["soup"], "wrong"],
  ["...", ["soup"], "wrong"],
  ["salad", ["soup"], "wrong"],
  ["sou", ["soup"], "wrong"],
  ["cat", ["dog"], "wrong"],
  ["dog", ["cat"], "wrong"],
  ["zero", ["one"], "wrong"],
  ["x", ["y"], "wrong"],
  ["1930", ["1929"], "wrong"],
  ["the", ["soup"], "wrong"],
  ["a", ["soup"], "wrong"],
];

describe("checkFill table", () => {
  it.each(cases)("%j vs %j -> %s", (typed, answers, expected) => {
    expect(checkFill(typed, answers)).toBe(expected);
  });
});

describe("checkFill invariants", () => {
  const words = ["soup", "hedy lamarr", "antikythera", "bababudan", "nutmeg", "voynich", "greatstink", "tolkien", "panini", "zero", "chai", "emoji"];
  it.each(words)("%s matches itself exactly", (w) => {
    expect(checkFill(w, [w])).toBe("exact");
  });
  it.each(words)("%s upper-case matches exactly", (w) => {
    expect(checkFill(w.toUpperCase(), [w])).toBe("exact");
  });
  it.each(words)("%s with trailing punctuation matches exactly", (w) => {
    expect(checkFill(`${w}!`, [w])).toBe("exact");
  });
  it.each(words)("%s with a 'the' prefix matches exactly", (w) => {
    expect(checkFill(`the ${w}`, [w])).toBe("exact");
  });
  it.each(words)("%s against an empty answer list is wrong", (w) => {
    expect(checkFill(w, [])).toBe("wrong");
  });
  it.each(words)("%s matches any accepted answer", (w) => {
    expect(checkFill(w, ["nope", w, "other"])).toBe("exact");
  });
  it.each(words)("%s inside a sentence is not wrong", (w) => {
    expect(checkFill(`i guess ${w} maybe`, [w])).not.toBe("wrong");
  });
  it.each(words)("%s against gibberish is wrong", (w) => {
    expect(checkFill("qqqqqqqqqqqq", [w])).toBe("wrong");
  });
});
