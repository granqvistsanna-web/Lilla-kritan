// Bildstoryboarden för 021 Hunden leker (kopia av 020:s). Kör från repots rot:
//   node avsnitt/021-hunden-leker/storyboard/bygg.mjs              stillbilderna (frames/<id>.jpg), index.html och tabellen i storyboard.md
//   node avsnitt/021-hunden-leker/storyboard/bygg.mjs --animatik   dessutom animatik.mp4: stillbilderna i radernas längd, Malin och hundljuden på sina tider
// Raderna står i rader.mjs, scenerna i scen.html. Kostar inga krediter. Repliker som inte är inspelade än blir tystnad i animatiken.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, extname } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { RADER, ROST, TEXT, UPPSKATTAD } from './rader.mjs';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));

const HÄR = new URL('./', import.meta.url).pathname, ROT = new URL('../../../', import.meta.url).pathname;
const EFF = ROT + 'assets/ljud/effekter/', RÖST = ROT + 'assets/ljud/roster/hunden-leker/';
let t = 0; for (const r of RADER) { r.t = t; t += r.d; }
const LANGD = t, tid = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`;
const OBS = UPPSKATTAD ? ' (⚠ Malins längder uppskattade)' : '';

// --- stillbilderna ---------------------------------------------------------------------------------------------------------
const TYP = { '.html': 'text/html', '.png': 'image/png', '.jpeg': 'image/jpeg', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  const d = await readFile(f); r.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.error('sidfel:', e.message));
await p.goto(`http://localhost:${srv.address().port}/avsnitt/021-hunden-leker/storyboard/scen.html`);
await p.evaluate(() => window.klar);
await mkdir(HÄR + 'frames', { recursive: true });
for (const r of RADER) {
  await p.evaluate(id => window.rad(id), r.id); await p.waitForTimeout(120);
  await (await p.$('svg')).screenshot({ path: `${HÄR}frames/${r.id}.jpg`, type: 'jpeg', quality: 86 });
}
await b.close(); srv.close();

// --- tabellen i storyboard.md och index.html -------------------------------------------------------------------------------
const repl = r => (r.malin || []).map(([n, o]) => `*"${TEXT[n - 1]}"* (${tid(r.t + o)})`).join(' … ') || '–';
const rad = r => `| [${r.id}](frames/${r.id}.jpg) | ${tid(r.t)} | ${r.d.toFixed(1)} s | ${r.plats} | ${repl(r)} | ${r.bild} | ${r.ljudtext} | ${r.ansikte} |`;
const tabell = ['| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Hunden / bollen, ljud | Ansikte |', '|---|---|---|---|---|---|---|---|', ...RADER.map(rad)].join('\n');
const md = await readFile(HÄR + 'storyboard.md', 'utf8');
await writeFile(HÄR + 'storyboard.md', md.replace(/<!-- tabell -->[\s\S]*<!-- \/tabell -->/, `<!-- tabell -->\n${tabell}\n<!-- /tabell -->`)
  .replace(/\*\*Längd:\*\*[^\n]*/, `**Längd:** ${tid(LANGD)} med 1 s intro, utan outro (räknat av bygg.mjs ur raderna)${OBS}.`));

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/`(.+?)`/g, '<code>$1</code>');
const kort = r => `<figure class="frame"><img src="frames/${r.id}.jpg" alt="Bild ${r.id}" loading="lazy"><figcaption>
  <div class="t">${r.id} · ${tid(r.t)} · ${r.d.toFixed(1)} s · ${esc(r.plats)}</div><div class="said">${esc(repl(r))}</div>
  <p>${esc(r.bild)}</p><p class="ans">Ljud: ${esc(r.ljudtext)} · Ansikte: ${esc(r.ansikte)}</p></figcaption></figure>`;
await writeFile(HÄR + 'index.html', `<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hunden leker storyboard</title>
<style>
:root { --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --bla:#2f7fb5 }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --bla:#8cc6ec; color-scheme:dark } }
:root[data-theme="dark"] { --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --bla:#8cc6ec; color-scheme:dark }
* { box-sizing:border-box }
body { margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 system-ui,sans-serif }
.wrap { max-width:1240px; margin:0 auto; padding:40px 16px 72px }
h1 { font-size:clamp(30px,6vw,52px); margin:0 } h1 span { color:var(--bla) }
.lede { color:var(--muted); max-width:72ch }
.frames { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-top:24px }
.frame { margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }
.frame img { width:100%; height:auto; display:block }
figcaption { padding:12px 14px 14px; display:grid; gap:6px; font-size:14px } figcaption p { margin:0 }
.t { font:500 12px ui-monospace,monospace; color:var(--muted) }
.said { border-left:3px solid var(--bla); padding-left:10px }
.ans { color:var(--muted); font-size:13px }
</style></head><body><div class="wrap">
<h1>Hunden leker <span>storyboard</span></h1>
<p class="lede">Avsnitt 021, ${tid(LANGD)} med 1 s intro${OBS}. En stillbild per rad i <code>storyboard.md</code>. Lekplatsen med hinken, stöveln, lekstugan och rutschkanekullen, hunden ur sin v2-rigg, bollen ur lekplatsens saker. Röda streckade pilar visar rörelsen. ${RADER.length} bilder.</p>
<div class="frames">${RADER.map(kort).join('\n')}</div>
</div></body></html>
`);
console.log(`${RADER.length} bilder, ${tid(LANGD)}${OBS}`);

// --- animatiken (valfri) ---------------------------------------------------------------------------------------------------
if (process.argv.includes('--animatik')) {
  const lista = RADER.map(r => `file '${HÄR}frames/${r.id}.jpg'\nduration ${r.d}`).join('\n') + `\nfile '${HÄR}frames/${RADER.at(-1).id}.jpg'\n`;
  await writeFile(join(tmpdir(), 'hunden-leker-lista.txt'), lista);
  const ljud = [], saknas = [];
  for (const r of RADER) {
    for (const [n, o] of r.malin || []) { const f = RÖST + ROST[n - 1][0] + '.m4a'; existsSync(f) ? ljud.push([f, r.t + o, 1.0]) : saknas.push(ROST[n - 1][0]); }
    for (const [f, o] of r.ljud || []) if (f) ljud.push([EFF + f + '.m4a', r.t + o, 0.7]);
  }
  if (saknas.length) console.log(`tystnad i animatiken för ${saknas.length} repliker som inte är inspelade än`);
  const inn = ljud.flatMap(([f]) => ['-i', f]);
  const fil = ljud.map(([, s, v], i) => `[${i + 1}:a]adelay=${Math.round(s * 1000)}:all=1,volume=${v}[a${i}]`).join(';')
    + ';' + ljud.map((_, i) => `[a${i}]`).join('') + `amix=inputs=${ljud.length}:normalize=0,apad,atrim=0:${LANGD}[ut]`;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(tmpdir(), 'hunden-leker-lista.txt'), ...inn,
    '-filter_complex', fil, '-map', '0:v', '-map', '[ut]', '-vf', 'scale=1280:720,fps=25,format=yuv420p', '-c:v', 'libx264', '-crf', '24',
    '-c:a', 'aac', '-b:a', '128k', '-t', String(LANGD), HÄR + 'animatik.mp4']);
  console.log('animatik.mp4');
}
