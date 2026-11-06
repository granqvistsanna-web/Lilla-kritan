import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = process.cwd();
const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.m4a': 'audio/mp4' };
const server = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(q.url.split('?')[0])); const buf = await readFile(f); r.writeHead(200, { 'content-type': typ[extname(f)] || 'application/octet-stream' }); r.end(buf); } catch { r.writeHead(404); r.end(); } }).listen(0);
const port = server.address().port, b = await chromium.launch();
const dur = {}; const d = f => dur[f] ??= +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(ROT, f)]).toString();

import { writeFileSync } from 'node:fs';
const ut = {};
for (const dir of process.argv.slice(2)) {
  const n = dir.split('/').pop();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(`http://localhost:${port}/${dir}/index.html?staende`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.ready);
  const svar = (await p.evaluate(() => window.LJUD)).find(c => /\/svar\.m4a/.test(c.fil)).t;
  const info = await p.evaluate(t => {
    window.render(t);
    const k = document.querySelector('use[href="#krita-form"]'); k.parentNode.parentNode.style.display = 'none';
    document.querySelectorAll('image').forEach(i => i.style.display = 'none');
    const m = document.querySelector('[clip-path^="url(#k-"]').getScreenCTM();
    return { a: m.a, d: m.d, e: m.e, f: m.f };
  }, svar - 0.3);
  await p.screenshot({ path: `${process.env.S}/spar/${n}-skarm.png` });
  ut[n] = { ...info, svar };
  await p.close();
}
writeFileSync(`${process.env.S}/spar/ctm.json`, JSON.stringify(ut, null, 1));
await b.close(); server.close();
