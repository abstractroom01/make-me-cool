// checks every story against the style rules.
// usage: node scripts/check-stories.mjs [--links] [--dir <folder with an index.ts of stories>]
// exits 1 on any error. warnings never fail the run.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// tiny loader: compiles .ts on the fly so we can read the real data files
const cache = new Map();
function resolveFile(from, spec) {
  const base = path.resolve(path.dirname(from), spec);
  for (const c of [base + ".ts", path.join(base, "index.ts"), base]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  throw new Error(`cannot resolve ${spec} from ${from}`);
}
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const src = fs.readFileSync(file, "utf8");
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const req = (spec) => (spec.startsWith(".") ? load(resolveFile(file, spec)) : require(spec));
  new Function("exports", "require", "module", out)(mod.exports, req, mod);
  return mod.exports;
}

const args = process.argv.slice(2);
const checkLinks = args.includes("--links");
const dirIdx = args.indexOf("--dir");
let stories;
if (dirIdx >= 0) {
  stories = load(path.join(path.resolve(args[dirIdx + 1]), "index.ts")).stories;
} else {
  stories = load(path.join(root, "src/data/stories.ts")).stories;
}

const errors = [];
const warns = [];
const err = (s, m) => errors.push(`${s.id}: ${m}`);
const warn = (s, m) => warns.push(`${s.id}: ${m}`);

const ids = new Set();
const sorted = [...stories].sort((a, b) => a.publishDate.localeCompare(b.publishDate));
const dayMs = 86400000;

for (let i = 0; i < sorted.length; i++) {
  const s = sorted[i];
  if (ids.has(s.id)) err(s, "duplicate id");
  ids.add(s.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.publishDate)) err(s, "bad publishDate");
  if (i > 0) {
    const gap = (Date.parse(s.publishDate) - Date.parse(sorted[i - 1].publishDate)) / dayMs;
    if (gap !== 1) err(s, `dates not continuous (gap of ${gap} days after ${sorted[i - 1].id})`);
  }

  // voice: all lowercase text, no placeholders
  const flat = JSON.stringify([s.title, s.hook, s.takeaway, s.starter, s.why, s.cards]);
  if (/sample story/i.test(flat)) err(s, "contains 'sample story'");
  if (/\b(tbd|todo|lorem)\b/i.test(flat)) err(s, "placeholder text");
  if (s.title !== s.title.toLowerCase()) warn(s, "title is not lowercase");
  if (!s.fields || s.fields.length < 2) err(s, "needs at least two fields");
  if (!s.why.startsWith("i picked this because")) warn(s, "'why' should start with 'i picked this because'");

  // shape
  if (s.cards.length < 8 || s.cards.length > 10) err(s, `cards: ${s.cards.length} (want 8 to 10)`);
  if (s.cards[0]?.kind !== "scene") err(s, "first card must be a scene");
  if (!s.cards.some((c) => c.kind === "say")) err(s, "missing 'say' card");
  if (s.cards[s.cards.length - 1]?.kind !== "crew") err(s, "last card must be 'crew'");
  const words = s.cards.reduce((n, c) => n + c.text.split(/\s+/).length, 0);
  if (words > 520) warn(s, `long: ${words} words on cards (aim for under ~450 for 5 minutes)`);
  for (const c of s.cards) if (c.text.split(/\s+/).length > 70) warn(s, `card '${c.tag}' is over 70 words`);

  // quiz: mcq, mcq, fill, line
  const order = s.quiz.map((q) => q.type).join(",");
  if (order !== "mcq,mcq,fill,line") err(s, `quiz order is ${order}`);
  for (const q of s.quiz) {
    if (q.type !== "fill" && (q.answer < 0 || q.answer >= q.options.length)) err(s, "quiz answer index out of range");
    if (q.type === "fill" && !q.answer.length) err(s, "fill has no accepted answers");
    if (q.type === "fill" && !/finish the line/.test(q.prompt)) warn(s, "fill prompt usually 'finish the line'");
    if (q.type === "fill" && q.before.trim() + " " + q.after.trim() === "") err(s, "fill is empty");
  }
  const fill = s.quiz.find((q) => q.type === "fill");
  if (fill) {
    const sentence = `${fill.before} ${fill.answer[0]}${fill.after}`.replace(/\s+/g, " ").trim().toLowerCase();
    if (!sentence.includes(s.takeaway.replace(/\.$/, "").toLowerCase().slice(0, 12)))
      warn(s, "fill sentence doesn't echo the takeaway");
  }

  // honesty
  if (!/checked on/.test(s.caveat)) err(s, "caveat must contain 'checked on'");
  if (!/still open/.test(s.caveat)) warn(s, "caveat should say what is 'still open'");
  if (s.sources.length < 2) err(s, "needs at least 2 sources");
  if (s.resources.length < 3) err(s, "needs at least 3 resources");
  const types = new Set(s.resources.map((r) => r.type));
  if (types.size < 2) err(s, "resources should mix types");
  for (const r of s.resources) if (r.type === "read" && !r.url) warn(s, `read resource without url: ${r.title}`);
}

// rotation: no primary field repeats within 5 days
for (let i = 0; i < sorted.length; i++) {
  for (let j = Math.max(0, i - 4); j < i; j++) {
    if (sorted[i].fields[0] === sorted[j].fields[0])
      errors.push(`${sorted[i].id}: primary field '${sorted[i].fields[0]}' repeats within 5 days (${sorted[j].id})`);
  }
}

if (checkLinks) {
  const urls = new Map();
  for (const s of stories) {
    for (const x of s.sources) urls.set(x.url, s.id);
    for (const r of s.resources) if (r.url) urls.set(r.url, s.id);
  }
  console.log(`checking ${urls.size} links...`);
  const bad = [];
  const queue = [...urls];
  async function worker() {
    while (queue.length) {
      const [url, id] = queue.shift();
      let status = 0;
      for (const method of ["HEAD", "GET"]) {
        try {
          const res = await fetch(url, {
            method,
            redirect: "follow",
            signal: AbortSignal.timeout(15000),
            headers: { "user-agent": "Mozilla/5.0 (compatible; makemecool-linkcheck)" },
          });
          status = res.status;
          if (res.ok) break;
        } catch {
          status = 0;
        }
      }
      // 403/429 usually means the site blocks bots, not that the page is gone
      if (status === 403 || status === 429 || status === 999) warns.push(`${id}: link blocked (${status}): ${url}`);
      else if (status < 200 || status >= 400) bad.push(`${id}: ${status} ${url}`);
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  errors.push(...bad.map((b) => `broken link ${b}`));
}

for (const w of warns) console.log("warn  ", w);
for (const e of errors) console.log("ERROR ", e);
console.log(`\n${stories.length} stories, ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
