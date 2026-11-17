// Genomskinliga stillbilder av apan ur riggen (assets/karaktarer/apan-alfons/premium/uttryck.html) till alfabetsprovet.
// Kör: node produktion/youtube/alfabet/apa-stills.mjs [apa|anka]  → produktion/youtube/alfabet/<figur>/<namn>.png (1920×1080, fötterna i (960, 1000))
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));

const FIG = process.argv[2] || 'apa', SIDA = { apa: 'apan-alfons/premium', anka: 'ankan-agda/premium' }[FIG];
const ROT = join(dirname(fileURLToPath(import.meta.url)), '../../..'), UT = join(ROT, 'produktion/youtube/alfabet', FIG);
const TYP = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try { const data = await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    res.writeHead(200, { 'content-type': TYP[extname(req.url.split('?')[0])] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end(); }
}).listen(0);

// [filnamn, uttryck, pose] – pose är ett namn ur POSER eller ett objekt som läggs ovanpå (bas = posens namn, standard neutral)
const SVING = [0, 1, 2, 3, 4, 5, 6, 7].map(i => { const v = Math.sin(i / 8 * 2 * Math.PI);
  return [`sving-${i}`, 'jatteglad', { armar: [45 + 45 * v, 45 - 45 * v], luta: 2 * v }]; });   // armarna upp och ner om vartannat
const GEMENSAM = [['neutral', 'neutral', 'neutral'], ['glad', 'glad', 'neutral'], ['nyfiken', 'nyfiken', 'lyssnar'],
  ['forvanad', 'forvanad', 'neutral'], ['hurra', 'jatteglad', 'hurra'], ['huka', 'glad', 'huka'],
  ['kawaii', 'kawaii', 'neutral'], ['fnissig', 'fnissig', 'neutral'], ['tanker', 'tanker', 'neutral'],
  ['lyssnar-hoger', 'nyfiken', { bas: 'hoger', oron: [-12, -12] }], ['vinkar', 'glad', { bas: 'hurra', armar: [0, 85] }],
  ['hoger-glad', 'glad', 'hoger']];
const BILDER = FIG === 'apa' ? [...GEMENSAM, ...SVING,
  ['pekar-a', 'glad', { bas: 'hoger', armar: [0, 70], upp: 0.5 }],          // pekar upp mot A:et i övre högra hörnet
  ['pekar-a-ivrig', 'jatteglad', { bas: 'hoger', armar: [0, 85], upp: 0.6 }],
  ['snopen', 'ledsen', { armar: [-8, -8], strack: -0.03 }],
  ['magen', 'tanker', 'magen'], ['mums', 'mums', 'neutral'],
  ['luktar', 'nyfiken', { bas: 'hoger', luta: 6 }],                          // lutar sig mot ananasen till höger
  ['nys-in', 'forvanad', { bas: 'upp', strack: 0.04 }],                      // drar in luft
  ['nys-atjo', 'skrattar', { luta: 7, strack: -0.06, armar: [10, 10] }],     // atjo!
  ['arm', 'jatteglad', { bas: 'hurra', armar: [0, 85] }]]
  : GEMENSAM;

await mkdir(UT, { recursive: true });
const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(`http://localhost:${server.address().port}/assets/karaktarer/${SIDA}/uttryck.html?ark=kawaii`);
await p.waitForLoadState('networkidle');
for (const [fil, u, po] of BILDER) {
  await p.evaluate(([u, po]) => {
    window.stilla = true;
    document.body.style.background = 'transparent';
    const svg = document.querySelector('svg'); svg.style.width = '1920px';
    svg.querySelector(':scope > rect').setAttribute('fill', 'none');
    document.getElementById('figurer').innerHTML = ''; document.getElementById('etiketter').innerHTML = '';
    const fig = figur(960, 1000, 0.8); ansikte(u, 1, fig);
    if (typeof po === 'object') { const { bas = 'neutral', ...extra } = po; rita(fig, fig.ansikte, { ...blandaPose('neutral', bas, 1), ...extra }); } else pose(po, 1, fig);
  }, [u, po]);
  await p.waitForTimeout(300);
  await p.locator('svg').screenshot({ path: join(UT, `${fil}.png`), omitBackground: true });
  console.log(fil);
}
await browser.close(); server.close();
