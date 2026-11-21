// 049:s hjältebild: scenens bild 213 s (25e, "Ja! Varje morgon och kväll. Bra!"), kaninen och tandläkaren skrattar, kaninen i stolen
// med elefanten. Egen kamera: kaninens ansikte vid x ≈ 1150 av 1920, tandläkarens vid ≈ 1650, stolens rygg under strimman.
//   node avsnitt/049-kaninen-gar-till-tandlakaren/thumbnail/hjalte.mjs   (från repots rot) -> thumbnail/miniatyr-utan-text.png
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises'; import { join, extname, dirname } from 'node:path';
import { homedir, tmpdir } from 'node:os'; import { fileURLToPath } from 'node:url'; import { execFileSync } from 'node:child_process';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = join(HAR, '../../..'), T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png' };
const [TID, Z, CX, CY] = (process.argv[2] ?? '213,1.61,612,463').split(',').map(Number);
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname)); const d = await readFile(f); r.writeHead(200, { 'Content-Type': T[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${srv.address().port}/avsnitt/049-kaninen-gar-till-tandlakaren/scener/mottagningen/index.html`);
await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
await p.evaluate(([t, z, x, y]) => { seek(t); kamera(z, x, y); document.getElementById('boilStyrka').setAttribute('scale', (2.5 / z).toFixed(2)); }, [TID, Z, CX, CY]);
const ut = join(tmpdir(), 'lk-049-hjalte.png'); await p.screenshot({ path: ut });
await b.close(); srv.close();
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', ut, '-vf', 'scale=1280:720', join(HAR, 'miniatyr-utan-text.png')]);
console.log(join(HAR, 'miniatyr-utan-text.png'));
