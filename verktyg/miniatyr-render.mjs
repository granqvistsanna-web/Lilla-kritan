// Renderar miniatyrerna i verktyg/miniatyr.html till PNG, 1280×720, svenska och engelska (skill `miniatyrer`).
//   node verktyg/miniatyr-render.mjs            -> alla
//   node verktyg/miniatyr-render.mjs 014 mix-2  -> bara de här (B-bilden heter 014-b)
// Sparas som miniatyr-strimma.png och miniatyr-strimma-en.png (B: miniatyr-strimma-b.png, -b-en.png) i hjältebildens mapp (eller `ut`), bredvid de gamla miniatyrerna.
// Lägg till kanal (--kanal) om kanalnamnet ska stå i bilden.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
const args = process.argv.slice(2), kanal = args.includes('--kanal'), ids = args.filter(a => !a.startsWith('--'));
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    res.writeHead(200, { 'content-type': TYP[extname(req.url.split('?')[0])] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const bas = `http://localhost:${server.address().port}/verktyg/miniatyr.html`;

const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await p.goto(bas);
const alla = await p.evaluate('MINIATYRER.map(m => ({ id: m.id, ut: m.ut || m.bild.split("/").slice(0, -1).join("/"), b: m.variant ? "-b" : "", en: !!m.en }))');
for (const m of alla.filter(m => !ids.length || ids.includes(m.id))) {
  for (const en of m.en ? [false, true] : [false]) {   // mix-1 finns bara på svenska
    await p.goto(`${bas}?id=${m.id}${en ? '&en' : ''}${kanal ? '&kanal' : ''}`);
    await p.waitForSelector('body[data-klar]'); await p.waitForLoadState('networkidle');   // kritstrukturen laddas efter
    const fil = join(ROT, m.ut, `miniatyr-strimma${m.b}${en ? '-en' : ''}.png`);
    await p.screenshot({ path: fil });
    console.log(fil.slice(ROT.length + 1), Math.round((await stat(fil)).size / 1024), 'kB');
  }
}
await browser.close(); server.close();
