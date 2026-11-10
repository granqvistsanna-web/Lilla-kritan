// Bygger bildstoryboarden för 013 Röda sången i art direction v2.
//
//   node bygg.mjs            (från den här mappen)
//
// Tre steg, inga krediter:
//   1. kanel-motor.js skrivs ut ur premium/uttryck.html (UTTRYCK, POSER, figur, rita, ansikte, pose …).
//      Motorn skrivs aldrig av för hand: den hämtas varje bygge, så att storyboarden följer figuren.
//   2. board.html renderas till frames/bild-N.png med stills.mjs ur skillen lk-figur.
//   3. index.html sätts ihop av bilderna och tabellen i storyboard.md (matchade på bild-id).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HÄR = dirname(fileURLToPath(import.meta.url));
const ROT = join(HÄR, '../../..');
const UTTRYCK_HTML = join(ROT, 'assets/karaktarer/kaninen-kanel/premium/uttryck.html');
const STILLS = join(ROT, '.claude/skills/lk-figur/scripts/stills.mjs');

// --- 1. Motorn ur uttryck.html -------------------------------------------------------------------------------
// Allt från rigg-tabellen till Object.assign(window, …) är figurmotorn. Resten av filen är arkets egen rendering.
async function motor() {
  const src = await readFile(UTTRYCK_HTML, 'utf8');
  const från = src.indexOf('const RIGG = {');
  const till = src.indexOf('Object.assign(window, {');
  if (från < 0 || till < 0) throw new Error('hittar inte motorn i uttryck.html – har filen byggts om?');
  const slut = src.indexOf('\n', src.indexOf(';', till));
  let kod = src.slice(från, slut);
  // Hrefarna i figur() är relativa till premium/. Här pekas de om med en bas som board.html kan sätta.
  kod = kod.replaceAll('href="cut/kanel-', 'href="${BAS}kanel-');
  const huvud = `// GENERERAD av bygg.mjs ur assets/karaktarer/kaninen-kanel/premium/uttryck.html. Ändra inte här.
// Ändra i uttryck.html och kör bygg.mjs igen, så följer storyboarden figuren.
const BAS = window.KANEL_BAS || '../../../assets/karaktarer/kaninen-kanel/premium/cut/';
`;
  // verktyg/rigg-motor.js först: det gemensamma (blanda-hjälparna, steg, klappNy, standardrörelserna) står där, inte i uttryck.html
  const bas = src.includes('rigg-motor.js') ? await readFile(join(ROT, 'verktyg/rigg-motor.js'), 'utf8') + '\n' : 'const mjuk = k => k * k * (3 - 2 * k);\n';
  const fot = `\nObject.assign(window, { RIGG, OGON, KINDER, FOTTER, UTTRYCK, NEUTRAL, POSER, POSE0,
  blanda, blandaPose, param, figur, rita, ansikte, pose, riktning, rorelse, ROR, mjuk, kl });\n`;
  await writeFile(join(HÄR, 'kanel-motor.js'), huvud + bas + await readFile(join(ROT, 'verktyg/blinka.js'), 'utf8') + '\n' + kod + fot);
  return (kod.match(/\n/g) || []).length + 1;
}

// --- 2. Bilderna ---------------------------------------------------------------------------------------------
function stills(antal) {
  const ts = Array.from({ length: antal }, (_, i) => String(i));
  return new Promise((ok, fel) => {
    const p = spawn('node', [STILLS, 'avsnitt/013-rod-brandbil/storyboard-v2/board.html',
      join(HÄR, 'frames/bild'), ...ts], { stdio: 'inherit' });
    p.on('exit', k => k === 0 ? ok() : fel(new Error('stills.mjs gav ' + k)));
  });
}

// --- 3. Tabellen ur storyboard.md ----------------------------------------------------------------------------
// Raderna är | # | Tid | Plats / kamera | Sjungs / sägs | I bild | Ansikten |.
async function tabell() {
  const md = await readFile(join(HÄR, 'storyboard.md'), 'utf8');
  const rader = new Map();
  for (const rad of md.split('\n')) {
    if (!rad.startsWith('|') || rad.includes('---') || rad.includes('| # |')) continue;
    const c = rad.split('|').slice(1, -1).map(s => s.trim());
    if (c.length < 6) continue;
    rader.set(c[0], { tid: c[1], plats: c[2], sjungs: c[3], bild: c[4], ansikten: c[5] });
  }
  return rader;
}

const text = s => (s || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>')
  .replace(/`(.+?)`/g, '<code>$1</code>');

async function index(ids, rader) {
  const saknas = ids.filter(id => !rader.has(id));
  const rutor = ids.map((id, i) => {
    const r = rader.get(id) || {};
    return `<figure class="bild">
    <img src="frames/bild-${i}.png" alt="Bild ${id}" loading="lazy">
    <figcaption><b class="id">${id}</b> <span class="tid">${r.tid || ''}</span>
      <span class="plats">${text(r.plats)}</span>
      <p class="sjungs">${text(r.sjungs)}</p>
      <p class="ibild">${text(r.bild)}</p>
      <p class="ansikten">${text(r.ansikten)}</p></figcaption></figure>`;
  }).join('\n');

  await writeFile(join(HÄR, 'index.html'), `<!doctype html>
<html lang="sv"><head><meta charset="utf-8"><title>013 Röda sången – bildstoryboard v2</title>
<style>
  :root { --papper:#F6EFE3; --ink:#3a2a22; --rod:#DD4424; }
  body { margin:0; background:var(--papper); color:var(--ink); font:16px/1.5 Fredoka, "Arial Rounded MT Bold", system-ui, sans-serif; }
  header { padding:40px 32px 8px; max-width:1500px; margin:0 auto; }
  h1 { margin:0 0 6px; font-size:34px; color:var(--rod); }
  header p { margin:4px 0; max-width:62ch; }
  .varning { background:#fff4d6; border-left:5px solid #e3b43a; padding:10px 14px; border-radius:6px; }
  main { display:grid; gap:26px; grid-template-columns:repeat(auto-fill, minmax(330px, 1fr));
         padding:24px 32px 80px; max-width:1500px; margin:0 auto; }
  .bild { margin:0; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px #0001; }
  .bild img { width:100%; display:block; background:#eee; aspect-ratio:16/9; object-fit:cover; }
  figcaption { padding:10px 14px 14px; font-size:13.5px; }
  .id { color:var(--rod); font-size:16px; } .tid { color:#8a7a6c; }
  .plats { display:block; color:#8a7a6c; margin-top:2px; }
  .sjungs { margin:8px 0 4px; font-weight:600; }
  .ibild { margin:4px 0; } .ansikten { margin:4px 0 0; color:#7a6a5c; font-size:12.5px; }
  code { background:#f1e9da; padding:1px 4px; border-radius:4px; font-size:12px; }
</style></head><body>
<header>
  <h1>013 Röda sången – bildstoryboard, art direction v2</h1>
  <p>${ids.length} bilder, byggda av <code>board.html</code> med kaninens premium-rigg och den röda v2-bilen.
     Planen är <a href="storyboard.md">storyboard.md</a>. Leopard-versionen ligger kvar i
     <a href="../storyboard/index.html">../storyboard/</a>.</p>
  <p class="varning"><b>Tiderna är provisoriska.</b> De kommer ur leopard-tagningen. Sången ska tas om med
     &rdquo;Kaninen&rdquo; i vers 1, och då mäts tiderna om mot en ny <code>rader.txt</code>.</p>
  <p class="varning">Ritat i kod tills bilderna finns: stegen, blåljuset, ballongen, äppelbacken med rutschkanan
     och discot. <b>Nicke är den enda figuren som fortfarande är v1.</b></p>
  ${saknas.length ? `<p class="varning">Bilder utan rad i storyboard.md: ${saknas.join(', ')}</p>` : ''}
</header>
<main>
${rutor}
</main></body></html>`);
  return saknas;
}

// --- Kör -----------------------------------------------------------------------------------------------------
await mkdir(join(HÄR, 'frames'), { recursive: true });
const rader = await motor();
console.log(`kanel-motor.js: ${rader} rader ur uttryck.html`);

// Bild-id:na står i board.html (window.BILDER). De läses ur filen, så att bygget inte behöver starta en webbläsare
// bara för att veta hur många bilder det är.
const html = await readFile(join(HÄR, 'board.html'), 'utf8');
const ids = [...html.matchAll(/^\s*\['([^']+)',/gm)].map(m => m[1]);
if (!ids.length) throw new Error('hittar inga bild-id i board.html');
console.log(`${ids.length} bilder: ${ids.join(' ')}`);

await stills(ids.length);
const saknas = await index(ids, await tabell());
if (saknas.length) console.warn('VARNING: ingen rad i storyboard.md för', saknas.join(', '));
console.log('klart: index.html');
