// Bildstoryboarden för 047 Katten åker buss. Kör från repots rot:
//   node avsnitt/047-katten-aker-buss/storyboard/bygg.mjs              stillbilderna (frames/<id>.jpg), index.html och tabellen i storyboard.md
//   node avsnitt/047-katten-aker-buss/storyboard/bygg.mjs --animatik   dessutom animatik.mp4 och kontaktark.jpg: stillbilderna i radernas
//                                                                  längd, Malin, kattens mjau och effekterna, mattorna ur MATTOR
// Raderna står i rader.mjs, scenerna i scen.html (?rad=15 visar en). Kostar inga krediter. (Gjord ur 044:s bygg.mjs.)
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, extname } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { RADER, ROST, MATTOR } from './rader.mjs';
const { chromium } = await import(join(homedir(), '.claude/skills/launch-video/scripts/node_modules/playwright/index.mjs'));

const HÄR = new URL('./', import.meta.url).pathname, ROT = new URL('../../../', import.meta.url).pathname;
const EFF = ROT + 'assets/ljud/effekter/', RÖST = ROT + 'assets/ljud/roster/katten-aker-buss/';
let t = 0; for (const r of RADER) { r.t = t; t += r.d; }
// raderna till kodscenen (grind 6): scener/resan/index.html läser rader.json (tiderna, Malin och effekterna), som 044
await mkdir(HÄR + '../scener/resan', { recursive: true });
await writeFile(HÄR + '../scener/resan/rader.json', JSON.stringify({ RADER: RADER.map(({ id, d, malin, ljud, reak }) => ({ id, d, malin, ljud, reak })), ROST: ROST.map(r => [r[0], r[2]]) }));
const LANGD = t, tid = s => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`;

// --- stillbilderna ---------------------------------------------------------------------------------------------------------
const TYP = { '.html': 'text/html', '.png': 'image/png', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' };
const srv = createServer(async (q, r) => { try { const f = join(ROT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  const d = await readFile(f); r.writeHead(200, { 'Content-Type': TYP[extname(f)] || 'application/octet-stream' }); r.end(d); } catch { r.writeHead(404); r.end(); } }).listen(0);
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.error('sidfel:', e.message));
await p.goto(`http://localhost:${srv.address().port}/avsnitt/047-katten-aker-buss/storyboard/scen.html`);
await p.evaluate(() => window.klar);
await mkdir(HÄR + 'frames', { recursive: true });
const bara = process.argv.find(a => a.startsWith('--rader='))?.slice(8).split(',');   // --rader=14,15: bara de stillbilderna
for (const r of RADER) {
  if (bara && !bara.includes(r.id)) continue;
  await p.evaluate(id => window.rad(id), r.id); await p.waitForTimeout(150);
  await (await p.$('svg')).screenshot({ path: `${HÄR}frames/${r.id}.jpg`, type: 'jpeg', quality: 86 });
}
await b.close(); srv.close();
if (bara) process.exit(0);

// --- tabellen i storyboard.md och index.html -------------------------------------------------------------------------------
const repl = r => (r.malin || []).map(([n, o]) => `*"${ROST[n - 1][1]}"* (${tid(r.t + o)})`).join(' … ') || '–';
const rad = r => `| [${r.id}](frames/${r.id}.jpg) | ${tid(r.t)} | ${r.d.toFixed(1)} s | ${r.plats} | ${repl(r)} | ${r.bild} | ${r.ljudtext} | ${r.ansikte} |`;
const tabell = ['| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Katten, ljud | Ansikte |', '|---|---|---|---|---|---|---|---|', ...RADER.map(rad)].join('\n');
const md = await readFile(HÄR + 'storyboard.md', 'utf8');
await writeFile(HÄR + 'storyboard.md', md.replace(/<!-- tabell -->[\s\S]*<!-- \/tabell -->/, `<!-- tabell -->\n${tabell}\n<!-- /tabell -->`)
  .replace(/\*\*Längd:\*\*[^\n]*/, `**Längd:** ${tid(LANGD)} med logotypen (räknat av bygg.mjs ur raderna).`));

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/`(.+?)`/g, '<code>$1</code>');
const kort = r => `<figure class="frame"><img src="frames/${r.id}.jpg" alt="Bild ${r.id}" loading="lazy"><figcaption>
  <div class="t">${r.id} · ${tid(r.t)} · ${r.d.toFixed(1)} s · ${esc(r.plats)}</div><div class="said">${esc(repl(r))}</div>
  <p>${esc(r.bild)}</p><p class="ans">Ljud: ${esc(r.ljudtext)} · Ansikte: ${esc(r.ansikte)}</p></figcaption></figure>`;
await writeFile(HÄR + 'index.html', `<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Katten åker buss</title>
<style>
:root { --paper:#fbfaf6; --card:#fff; --ink:#2a2620; --muted:#6e675c; --line:#e6e1d6; --rosa:#c2185b }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --rosa:#f48fb1; color-scheme:dark } }
:root[data-theme="dark"] { --paper:#1d1c22; --card:#26252c; --ink:#f1ede4; --muted:#a8a196; --line:#3a3842; --rosa:#f48fb1; color-scheme:dark }
* { box-sizing:border-box }
body { margin:0; background:var(--paper); color:var(--ink); font:16px/1.5 system-ui,sans-serif }
.wrap { max-width:1240px; margin:0 auto; padding:40px 16px 72px }
h1 { font-size:clamp(30px,6vw,52px); margin:0 } h1 span { color:var(--rosa) }
.lede { color:var(--muted); max-width:72ch }
.frames { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-top:24px }
.frame { margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }
.frame img { width:100%; height:auto; display:block }
figcaption { padding:12px 14px 14px; display:grid; gap:6px; font-size:14px } figcaption p { margin:0 }
.t { font:500 12px ui-monospace,monospace; color:var(--muted) }
.said { border-left:3px solid var(--rosa); padding-left:10px }
.ans { color:var(--muted); font-size:13px }
</style></head><body><div class="wrap">
<h1>Katten åker buss <span>storyboard</span></h1>
<p class="lede">Avsnitt 047, ${tid(LANGD)}. En stillbild per uppslag, tajmad efter Malins klippta repliker och manusets pauser. Hållplatsen i vinter, i bussen (bild A ut genom fönstret, bild B på sätet), farmors dörr. Kattens v2-rigg med nallen, farmor (grå Kaj), kaninen i pulkan, fågeln, bussen och snöplogen. Platshållare i kod: kattens huvud bakifrån, vantehanden, kortläsaren, julgranen, imman, tassen vid knappen, den öppna dörren. Lila streckade pilar visar rörelsen. ${RADER.length} bilder.</p>
<div class="frames">${RADER.map(kort).join('\n')}</div>
</div></body></html>
`);
console.log(`${RADER.length} bilder, ${tid(LANGD)}`);

// --- animatiken (valfri) ---------------------------------------------------------------------------------------------------
if (process.argv.includes('--animatik')) {
  const lista = RADER.map(r => `file '${HÄR}frames/${r.id}.jpg'\nduration ${r.d.toFixed(3)}`).join('\n') + `\nfile '${HÄR}frames/${RADER.at(-1).id}.jpg'\n`;
  await writeFile(join(tmpdir(), 'katten-buss-lista.txt'), lista);
  const ljud = [];   // [fil, start, volym, längd (för mattorna)]
  for (const r of RADER) {
    for (const [n, o] of r.malin || []) ljud.push([RÖST + ROST[n - 1][0] + '.m4a', r.t + o, 1.0]);
    for (const [f, o] of r.ljud || []) if (f) ljud.push([EFF + f + '.m4a', r.t + o, 0.7]);
  }
  const rd = id => RADER.find(r => r.id === id);
  const mattor = MATTOR.map(([f, a, b, v]) => { const s = rd(a).t, e = b ? rd(b).t : LANGD; return [EFF + f + '.m4a', s, e - s, v]; });
  // mattor längre än filen loopas med 1 s övertoning mellan varven (acrossfade), inte med ett hårt skarv
  const langd = f => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString();
  for (const m of mattor) {
    const d = langd(m[0]); if (m[2] <= d - 0.5) continue;
    const n = Math.ceil((m[2] - 1) / (d - 1)) + 1, ut = join(tmpdir(), `loop-${n}-` + m[0].split('/').pop());
    const kedja = Array.from({ length: n - 1 }, (_, i) => `${i ? `[x${i - 1}]` : '[0:a]'}[${i + 1}:a]acrossfade=d=1:c1=tri:c2=tri[x${i}]`).join(';');
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...Array.from({ length: n }, () => ['-i', m[0]]).flat(), '-filter_complex', kedja, '-map', `[x${n - 2}]`, '-c:a', 'aac', '-b:a', '160k', ut]);
    m[0] = ut;
  }
  const inn = [...ljud.flatMap(([f]) => ['-i', f]), ...mattor.flatMap(([f]) => ['-i', f])];
  const fil = [...ljud.map(([, s, v], i) => `[${i + 1}:a]adelay=${Math.round(s * 1000)}:all=1,volume=${v}[a${i}]`),
    ...mattor.map(([, s, l, v], j) => `[${ljud.length + 1 + j}:a]atrim=0:${l.toFixed(2)},afade=t=in:d=0.6,afade=t=out:st=${(l - 0.8).toFixed(2)}:d=0.8,adelay=${Math.round(s * 1000)}:all=1,volume=${v}[m${j}]`)].join(';')
    + ';' + ljud.map((_, i) => `[a${i}]`).join('') + mattor.map((_, j) => `[m${j}]`).join('') + `amix=inputs=${ljud.length + mattor.length}:normalize=0,alimiter=limit=0.9,atrim=0:${LANGD.toFixed(2)}[ut]`;
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', join(tmpdir(), 'katten-buss-lista.txt'), ...inn,
    '-filter_complex', fil, '-map', '0:v', '-map', '[ut]', '-vf', 'scale=1280:720,fps=25,format=yuv420p', '-c:v', 'libx264', '-crf', '24',
    '-c:a', 'aac', '-b:a', '128k', '-t', LANGD.toFixed(2), HÄR + 'animatik.mp4']);
  // kontaktarket: alla stillbilder i rader om 8
  const ark = RADER.map(r => ['-i', `${HÄR}frames/${r.id}.jpg`]).flat(), n = RADER.length, k = 8, rr = Math.ceil(n / k);
  const xs = RADER.map((_, i) => `${(i % k) ? Array.from({ length: i % k }, () => 'w0').join('+') : 0}_${Math.floor(i / k) ? Array.from({ length: Math.floor(i / k) }, () => 'h0').join('+') : 0}`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...ark, '-filter_complex', RADER.map((r, i) => `[${i}:v]scale=320:180[v${i}]`).join(';') + ';' + RADER.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:layout=${xs.join('|')}:fill=black`, '-frames:v', '1', '-q:v', '3', HÄR + 'kontaktark.jpg']);
  console.log('animatik.mp4, kontaktark.jpg');
}
