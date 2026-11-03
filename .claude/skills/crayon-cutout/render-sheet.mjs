// Renders style-sheet.html to style-sheet.png:  node ~/.claude/skills/crayon-cutout/render-sheet.mjs
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
const { chromium } = createRequire(join(homedir(), '.claude/skills/launch-video/scripts/'))('playwright');
const dir = dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.goto(pathToFileURL(join(dir, 'style-sheet.html')).href, { waitUntil: 'networkidle' });
await p.evaluate(() => Promise.all([document.fonts.ready, window.ready]));
await p.screenshot({ path: join(dir, 'style-sheet.png'), fullPage: true });
await b.close();
