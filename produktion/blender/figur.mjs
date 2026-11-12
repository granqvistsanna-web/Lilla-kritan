// Tar ut en figur ur 030:s scen till Blender (bygg.py --figur): varje del som egen bild i riggens mått, delens läge i varje bildruta
// (matrisen från riggens mått till skärmen: lutning, böj, hopp, gång och allt annat är redan med) och ansiktet som genomskinliga bilder.
//   node produktion/blender/figur.mjs <ut-mapp> <från s> <till s>     -> <ut>/delar.json, <ut>/del-N.png, <ut>/ansikte/NNNNN.png
// ponytail: tar figuren som står i #figurer vid <från> (i 030:s rad 10 katten), en figur och en scen. Fler: ge scen och figur som argument.
import { createServer } from 'node:http'; import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path'; import { homedir } from 'node:os'; import { fileURLToPath } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MJS ?? join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));
const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '../..'), [UT, FRAN, TILL] = [resolve(process.argv[2]), +process.argv[3], +process.argv[4]];
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => { try { const fil = join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); const d = await readFile(fil); res.writeHead(200, { 'Content-Type': TYP[extname(fil)] || 'application/octet-stream' }); res.end(d); } catch { res.writeHead(404); res.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1400 } });
await p.goto(`http://localhost:${server.address().port}/avsnitt/030-borsta-borsta-gulliga-djur/scener/badet/index.html?lager=figurer`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => window.ready); await p.evaluate(() => window.ready);
await mkdir(join(UT, 'ansikte'), { recursive: true });
// bara ansiktet (.drag på kroppen), utan kritbruset och den vita kanten: det projiceras på den runda kroppen i Blender
await p.addStyleTag({ content: `html.ansikte #figurer > g > g > g > :not(.kropp), html.ansikte .kropp > image { display:none !important }
  html.ansikte #kamera > g, html.ansikte #figurer > g > g { filter:none !important } html.delar body > svg:first-of-type { visibility:hidden }` });
await p.evaluate(t => window.seek(t), FRAN);

// delarna: barnen i figurens grupp (kroppen = dess bild), märkta data-del
const delar = await p.evaluate(() => { const rot = document.querySelector('#figurer > g').children[1].children[0], ut = []; let fram = false;
  for (const e of rot.children) { const k = e.getAttribute('class') || ''; if (/bubblor|gnista|borste/.test(k)) continue;
    const el = k === 'kropp' ? e.querySelector('image') : e, bb = el.getBBox(), x0 = Math.floor(bb.x) - 8, y0 = Math.floor(bb.y) - 8;
    el.dataset.del = ut.length; ut.push({ namn: k, fram, x0, y0, w: Math.ceil(bb.width) + 16, h: Math.ceil(bb.height) + 16 }); if (k === 'kropp') fram = true; }
  return ut; });
for (const [i, d] of delar.entries()) {
  await p.evaluate(([i, d]) => { document.documentElement.classList.add('delar'); document.getElementById('enDel')?.remove();
    const k = document.querySelector(`[data-del="${i}"]`).cloneNode(true); ['transform', 'filter', 'display', 'opacity', 'style', 'mask', 'clip-path'].forEach(a => k.removeAttribute(a));
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.id = 'enDel'; s.setAttribute('viewBox', `${d.x0} ${d.y0} ${d.w} ${d.h}`);
    s.setAttribute('style', `position:fixed; left:0; top:0; width:${d.w}px; height:${d.h}px`); s.appendChild(k); document.body.appendChild(s); }, [i, d]);
  d.png = `del-${i}.png`; await p.screenshot({ path: join(UT, d.png), omitBackground: true, clip: { x: 0, y: 0, width: d.w, height: d.h } });
}
await p.evaluate(() => { document.getElementById('enDel').remove(); document.documentElement.classList.remove('delar'); });
await p.setViewportSize({ width: 1920, height: 1080 });

const rutor = [];
for (let f = Math.round(FRAN * 30); f < Math.round(TILL * 30); f++) {
  await p.evaluate(t => window.seek(t), f / 30);
  rutor.push(await p.evaluate(n => Array.from({ length: n }, (_, i) => { const e = document.querySelector(`[data-del="${i}"]`);
    if (!e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null; const m = e.getScreenCTM(); return [m.a, m.b, m.c, m.d, m.e, m.f].map(v => +v.toFixed(4)); }), delar.length));
  await p.evaluate(() => document.documentElement.classList.add('ansikte'));
  await p.screenshot({ path: join(UT, 'ansikte', `${String(f).padStart(5, '0')}.png`), omitBackground: true });
  await p.evaluate(() => document.documentElement.classList.remove('ansikte'));
}
await writeFile(join(UT, 'delar.json'), JSON.stringify({ delar, rutor }));
console.log(UT, delar.map(d => d.namn + (d.fram ? '+' : '')).join(' '));
await b.close(); server.close();
