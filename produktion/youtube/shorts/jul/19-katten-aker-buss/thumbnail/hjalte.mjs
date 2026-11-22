// Hjältebilder till lucka 19 (047 Katten åker buss), som lucka 8:s hjalte.mjs: scenens sida laddas, en rad får en egen pose och
// kamera, och bilden tas. Ingen spegelvändning (figurer vänds aldrig). Ansiktet kring x 1200–1425, vänstra tredjedelen lugn
// (kritstrimman), högra nedre hörnet tomt (tidsbrickan).
//   A (bussen): hållplatsen, katten jätteglad med nallen och en arm ut, gula bussen med öppen dörr bredvid
//   B (fönstret): katten på sätet vänd mot oss, nallen bredvid, snögubben med röda fågeln i fönstret
//   node hjalte.mjs [a|b]  ->  hjalte.png + miniatyr-utan-text.png (A), hjalte-b.png + miniatyr-utan-text-b.png (B)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../../../../..');
const VAL = process.argv.slice(2).filter(a => /^[ab]$/.test(a)), VARIANTER = VAL.length ? VAL : ['a', 'b'];
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    const typ = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' }[req.url.match(/\.\w+$/)?.[0]] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': typ }); res.end(data); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/047-katten-aker-buss/scener/resan/index.html`, { waitUntil: 'networkidle' });
await p.evaluate(() => window.ready);
for (const v of VARIANTER) {
  const rad = await p.evaluate(v => {
    const glad = ANS('jatteglad', { titt: [0, 2] });
    if (v === 'a') {
      // rad 7: bussen står med dörren öppen; katten till vänster om den öppna dörren, jätteglad mot oss, nallen i ena tassen och den andra armen ut
      S['7'] = tl => { hall(); kamera(1.6, 1000, 700); buss(BUSS_X0, { oppen: 1 }); katt(glad, { ...ENHAND, armar: [-124, 40], upp: 0.6, oron: [-6, -6] }, { x: 1200, fot: HGOLV }); };
      return '7';
    }
    // rad 21: bussen står vid snögubben; katten på sätet vänd mot oss (som i reaktionsbilderna), snögubben med fågeln till vänster om den
    S['21'] = tl => { GUNG = 0; inne(); kamera(2.0, 540, 410);
      const U = uAv(grupp('20')), X = PLATS.gubbe[0], cx = X - (470 - FON.cx) / RS;
      const U2 = { ...U, cx, P2: (x, y) => [FON.cx + (x - cx) * RS, HORISONT + (y - HZ) * RS] };
      const top = snogubbe(U2); fagel(top[0] + 4, top[1] + 4, { s: FAGEL_S });
      // utan säcken: högra nedre hörnet tomt för tidsbrickan
      katt(glad, { ...L.POSER.sitter, ...ENHAND, upp: 0.6, armar: [-124, 40], oron: [-6, -6] }, { x: SATE.x, fot: SATE.fot, skugg: false }); };
    return '21';
  }, v);
  await p.evaluate(id => window.seek(RR[id].s + RR[id].d * 0.5), rad);
  const ut = v === 'a' ? 'hjalte.png' : 'hjalte-b.png', mini = v === 'a' ? 'miniatyr-utan-text.png' : 'miniatyr-utan-text-b.png';
  await p.screenshot({ path: join(HAR, ut) });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', join(HAR, ut), '-vf', 'scale=1280:720', join(HAR, mini)]);
  console.log(ut, mini);
}
await b.close(); server.close();
