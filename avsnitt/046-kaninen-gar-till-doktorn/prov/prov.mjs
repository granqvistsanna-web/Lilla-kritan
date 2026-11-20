// Stillbilder ur närbildsprovet: node avsnitt/046-kaninen-gar-till-doktorn/prov/prov.mjs [utmapp]
// Serverar repots rot på en ledig port (som scenernas render.mjs) och tar bild 1–5 ur narbilder.html.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url), { chromium } = require('playwright');
const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..'), UT = resolve(process.argv[2] || dirname(fileURLToPath(import.meta.url)));
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)), data = await readFile(fil);
    res.writeHead(200, { 'content-type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);
const port = server.address().port, b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const fel = []; pg.on('pageerror', e => fel.push(e.message)); pg.on('console', m => m.type() === 'error' && fel.push(m.text()));
for (const [n, t] of [[1, 1.2], [2, 1.2], [3, 1.0], [4, 1.5], [5, 1.2]]) {
  await pg.goto(`http://localhost:${port}/avsnitt/046-kaninen-gar-till-doktorn/prov/narbilder.html?bild=${n}&t=${t}`);
  await pg.evaluate(() => window.ready); await pg.evaluate(t => window.seek(t), t); await pg.waitForTimeout(400);
  await pg.screenshot({ path: join(UT, `prov-${n}.png`) });
}
console.log(fel.join('\n') || 'inga fel'); await b.close(); server.close();
