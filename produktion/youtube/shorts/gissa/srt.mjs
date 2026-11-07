// Skriver SRT för alla Gissa-Shorts (sv + en) ur sidornas egna ljudlistor (window.LJUD) och manusens texter.
//   node produktion/youtube/shorts/gissa/srt.mjs   -> produktion/youtube/shorts/undertexter/gissa-<ord>(-en).srt
import { createServer } from 'node:http';
import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..'), G = 'produktion/youtube/shorts/gissa', UT = join(ROT, 'produktion/youtube/shorts/undertexter');
const md = await readFile(join(ROT, G, 'ljud-att-gora.md'), 'utf8');
const ren = s => s.replace(/\[[a-z ]+\]\s*/g, '').trim();
const SV = {}, EN = {};
for (const m of md.matchAll(/\| `assets\/ljud\/roster\/([a-z0-9-]+)\.m4a` \| `([^`]+)` \|/g)) SV[m[1]] ??= ren(m[2]);
for (const m of md.matchAll(/^\| ([1-5]) \| `([^`]+)` \| `([^`]+)` \| `([^`]+)` \| `([^`]+)` \|$/gm))
  ['intro', 'hmm', 'vad-kan-det-vara', 'hej-da'].forEach((k, i) => EN[`${k}-${m[1]}`] = ren(m[i + 2]));
const SAML = { sv: { 'var-ar-kon': 'Var är kon?', 'dar-ar-kon': 'Där är kon!' }, en: { 'var-ar-kon': 'Where is the cow?', 'dar-ar-kon': "There's the cow!" } };

const server = createServer(async (req, res) => {
  try { res.end(await readFile(join(ROT, decodeURIComponent(new URL(req.url, 'http://x').pathname)))); } catch { res.statusCode = 404; res.end(); }
}).listen(0);
const port = server.address().port;
const finns = f => access(join(ROT, f)).then(() => true, () => false);
const langd = f => +execFileSync('ffprobe', ['-v', '0', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(ROT, f)]).toString();
const tid = s => { const ms = Math.round(s * 1000); return new Date(ms).toISOString().slice(11, 23).replace('.', ','); };

const b = await chromium.launch(), p = await b.newPage();
const sidor = [];
for (const tema of ['bondgarden', 'fordon', 'lekplatsen'])
  for (const ord of (await readdir(join(ROT, G, tema))).sort()) if (await finns(`${G}/${tema}/${ord}/index.html`)) sidor.push([tema, ord]);
const fel = [];
for (const [tema, ord] of sidor) for (const sprak of ['sv', 'en']) {
  await p.goto(`http://localhost:${port}/${G}/${tema}/${ord}/index.html?staende${sprak === 'en' ? '&en' : ''}`, { waitUntil: 'networkidle' });
  await p.waitForFunction(() => window.ready);
  const ljud = await p.evaluate(() => window.LJUD.map(c => ({ t: c.t, fil: c.fil, tal: c.tal })));
  const rader = [];
  for (const c of ljud) {
    const fil = c.fil.replace(/^\//, ''), namn = fil.split('/').pop().replace('.m4a', '');
    let text;
    if (fil.includes('/roster/')) text = (sprak === 'en' ? EN : SV)[namn];
    else if (/\/(svar|saga)\.m4a$/.test(fil)) text = c.tal;
    else if (SAML[sprak][namn]) text = SAML[sprak][namn];
    else continue;   // effekter och musik
    if (!await finns(fil)) continue;   // tyst i renderingen
    if (!text) { fel.push(`${tema}/${ord} ${sprak}: ingen text för ${fil}`); continue; }
    rader.push([c.t, c.t + langd(fil), text]);
  }
  rader.sort((a, b) => a[0] - b[0]);
  const namn = ord === 'samling' ? `gissa-${tema}-samling` : `gissa-${ord}`;
  await writeFile(join(UT, `${namn}${sprak === 'en' ? '-en' : ''}.srt`), rader.map(([a, e, t], i) => `${i + 1}\n${tid(a)} --> ${tid(e)}\n${t}\n`).join('\n'));
}
await b.close(); server.close();
console.log(`${sidor.length * 2} SRT`); fel.forEach(f => console.log(f));
