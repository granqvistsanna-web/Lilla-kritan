import { chromium } from '/Users/sannagranqvist/.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs';
const b = await chromium.launch(), out = {};
for (const s of process.argv.slice(2)) {
  const p = await b.newPage();
  await p.goto(`${new URL(`../code-shot/${s}/index.html`, import.meta.url)}`);
  out[s] = await p.evaluate(() => window.SFX);
}
await b.close();
console.log(JSON.stringify(out));
