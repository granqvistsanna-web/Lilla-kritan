// Figurerna till mix 3:s miniatyr: en genomskinlig PNG per figur ur riggarnas uttryck.html (?bara=<uttryck>&pose=<pose>).
// Kör från repots rot med en server igång (python3 -m http.server 8765): node produktion/youtube/mix/mix-3/thumbnail/hjalte/figurer.mjs
import { join, dirname } from 'node:path'; import { homedir } from 'node:os'; import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url));
const FIG = [['grisen-greta', 'glad', 'hurra'], ['kaninen-kanel', 'jatteglad', 'neutral'], ['hunden-hugo', 'jatteglad', 'hurra']];
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
for (const [namn, u, pose] of FIG) {
  await p.goto(`http://localhost:8765/assets/karaktarer/${namn}/premium/uttryck.html?bara=${u}&pose=${pose}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => { window.stilla = true; document.body.style.background = 'transparent';
    document.querySelector('svg > rect').remove(); document.getElementById('etiketter').remove(); window.render(2); });
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(HAR, `${namn}.png`), omitBackground: true });
}
await b.close();
