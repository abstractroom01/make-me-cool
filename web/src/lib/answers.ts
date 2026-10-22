// Forgiving matching for fill-in answers: ignores case, punctuation, accents, "the/a/an", spaces versus hyphens,
// extra words around the answer, and a typo or two on longer words.

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/^(the|a|an) /, "");
}

function distance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export type FillResult = "exact" | "close" | "wrong";

export function checkFill(typed: string, answers: string[]): FillResult {
  const t = norm(typed);
  if (!t) return "wrong";
  const tCompact = t.replace(/ /g, "");
  let close = false;
  for (const raw of answers) {
    const a = norm(raw);
    const aCompact = a.replace(/ /g, "");
    if (t === a || tCompact === aCompact) return "exact";
    // the answer appears as whole words inside a longer reply
    if (` ${t} `.includes(` ${a} `)) close = true;
    // a typo or two on a longer word
    const allowed = aCompact.length >= 9 ? 2 : aCompact.length >= 5 ? 1 : 0;
    if (allowed > 0 && distance(tCompact, aCompact) <= allowed) close = true;
  }
  return close ? "close" : "wrong";
}
