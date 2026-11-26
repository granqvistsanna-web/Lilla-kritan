// ABC-miniatyrens hjältebild: still ur scenen utan hörnmärket, spegelvänd, 1280×720 (skill miniatyrer).
//   node produktion/youtube/alfabet/miniatyr-hjalte.mjs produktion/youtube/alfabet/abc-f-recept-3 150 ['#saker' = göm sakerna också]
//   -> <scen>/thumbnail/miniatyr-utan-text.png
import { createServer } from 'node:http'; import { readFile } from 'node:fs/promises'; import { join, extname } from 'node:path'; import { homedir } from 'node:os';
import { execFileSync } from 'node:child_process'; import { mkdirSync, unlinkSync } from 'node:fs';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = process.cwd(), [scen, t, dolj = ''] = process.argv.slice(2), ut = join(ROT, scen, "thumbnail", "still.png");
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => { try { const f = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); res.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); res.end(await readFile(f)); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/${scen}/index.html`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
await p.addStyleTag({ content: `#bokstav,#klosskuggor,#eansikte${dolj ? "," + dolj : ""}{visibility:hidden!important}` });
await p.evaluate(t => window.seek(t), +t);
mkdirSync(join(ROT, scen, 'thumbnail'), { recursive: true });
await p.screenshot({ path: ut });
await b.close(); server.close();
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', ut, '-vf', 'hflip,scale=1280:720:flags=lanczos', join(ROT, scen, 'thumbnail', 'miniatyr-utan-text.png')]); unlinkSync(ut);
