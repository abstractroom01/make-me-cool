// moves an approved draft month into the app and registers it.
// usage: npm run publish:month -- 2026-12
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const month = process.argv[2];
if (!/^\d{4}-\d{2}$/.test(month ?? "")) {
  console.error("usage: npm run publish:month -- YYYY-MM");
  process.exit(1);
}
const from = path.join(root, "drafts", month);
const to = path.join(root, "src/data/months", month);
if (!fs.existsSync(from)) { console.error(`no draft at drafts/${month}`); process.exit(1); }
if (fs.existsSync(to)) { console.error(`months/${month} already exists`); process.exit(1); }

// the draft must pass the validator on its own before it goes live
try {
  execSync(`node scripts/check-stories.mjs --dir drafts/${month}`, { cwd: root, stdio: "inherit" });
} catch { console.error("\ndraft has errors. fix them first."); process.exit(1); }

fs.mkdirSync(to, { recursive: true });
for (const f of fs.readdirSync(from)) {
  let src = fs.readFileSync(path.join(from, f), "utf8");
  src = src.replaceAll('"../../src/data/stories"', '"../../stories"');
  fs.writeFileSync(path.join(to, f), src);
}
fs.rmSync(from, { recursive: true });

const idx = path.join(root, "src/data/months/index.ts");
let s = fs.readFileSync(idx, "utf8");
const name = "m" + month.replace("-", "");
s = s.replace(/(\n\/\/ every approved month)/, `\nimport { stories as ${name} } from "./${month}";$1`);
s = s.replace(/\[(\.\.\.[^\]]*)\];/, (_, list) => `[${list}, ...${name}];`);
fs.writeFileSync(idx, s);
console.log(`published ${month}. now run: npx tsc --noEmit && npm run check:stories && npm run build`);
