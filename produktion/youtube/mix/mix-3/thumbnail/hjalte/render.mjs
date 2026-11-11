// node produktion/youtube/mix/mix-3/thumbnail/hjalte/render.mjs  → ../miniatyr-utan-text.png (1280×720); servern som i figurer.mjs
import { join, dirname } from 'node:path'; import { homedir } from 'node:os'; import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto('http://localhost:8765/produktion/youtube/mix/mix-3/thumbnail/hjalte/', { waitUntil: 'networkidle' });
await p.screenshot({ path: join(dirname(fileURLToPath(import.meta.url)), '../miniatyr-utan-text.png') });
await b.close();
