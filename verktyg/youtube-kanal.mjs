// YouTube-banner (2560×1440) och avatar (800×800) ur 013:s intro. Kräver att repot serveras på :8932 (python3 -m http.server 8932).
//   node verktyg/youtube-kanal.mjs assets/format/youtube
// Bilderna vid t = 8 (titelkortet klart, Fia på sista bokstaven)
import { createRequire } from 'module'; const require = createRequire('/Users/sannagranqvist/.claude/skills/launch-video/scripts/node_modules/');
const { chromium } = require('playwright');
const UT = process.argv[2], URL = 'http://localhost:8932/avsnitt/013-rod-brandbil/intro/index.html';
const REGNBAGE = ['#e2402f', '#f2862e', '#f6b81f', '#3f9b3c', '#2f7fe0', '#8e4fc9', '#ec5fa0'];
const b = await chromium.launch(), fel = [];
async function sida(w, h, skala) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: skala });
  p.on('pageerror', e => fel.push(e.message));
  await p.goto(URL); await p.evaluate(() => window.ready); await p.evaluate(() => { window.stilla = true; window.seek(8); $('fia-delar').querySelectorAll('g > image').forEach(i => i.removeAttribute('transform')); });   // vingarna helt utfällda i stillbilderna
  await p.evaluate(REG => {   // regnbågsbokstäver, ingen titel, ingen glimt
    // en färg: kritans röda (förval i introt)
    $('titel').style.display = 'none';
  }, REGNBAGE);
  return p;
}
// ---- banner: logga + Fia i mitten av det säkra området (1546×423 av 2560×1440 = 1160×317 i 1920-rutan, y 381–698)
{
  const p = await sida(1920, 1080, 4 / 3);
  await p.evaluate(() => {
    const svg = document.querySelector('svg'), g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const fiaLager = $('fia').parentNode; svg.insertBefore(g, $('golv')); g.append($('kort'), fiaLager);
    const a = $('ordmarke').getBoundingClientRect(), f = $('fia').getBoundingClientRect();
    // Fias delar är 1024-rutor med genomskinlig marginal, så bara bokstäverna mäts; Fia sitter ca 0,55 bokstavshöjd ovanför
    const r = a, s = 740 / r.width;
    // lite åt vänster: Fia på sista bokstaven väger åt höger
    g.setAttribute('transform', `translate(${960 - 0.03 * r.width * s} ${540 + 0.2 * r.height * s}) scale(${s}) translate(${-(r.x + r.width / 2)} ${-(r.y + r.height / 2)})`);
    const pos = { stor: [-30, 40], liten: [880, 70], mellan: [40, 545], lang: [1555, 560] };   // lika stora moln på var sin sida, i samma höjd
    MOLN.forEach(o => { const n = o.m.querySelector('image').getAttribute('href').match(/moln-(\w+)\.png/)[1]; const [x, y] = pos[n]; o.m.setAttribute('transform', `translate(${x} ${y})`); });
  });
  await p.screenshot({ path: `${UT}/banner.png` });
  await p.close();
}
// ---- avatar: den röda kritan stort och snett, med klottret, på himlen (visas som cirkel)
for (const [namn, vad] of [['avatar-krita', 'krita'], ['avatar-fia', 'fia']]) {
  const p = await sida(800, 800, 1);
  await p.evaluate(vad => {
    const H = $('himmel'); [...H.children].forEach((c, i) => { if (i > 0 && !MOLN.some(o => o.m === c)) c.style.display = 'none'; });
    $('kort').style.display = 'none'; $('himmel-bak').style.display = 'none';
    MOLN.forEach(o => o.m.style.display = 'none');
    const visa = (n, x, y, sk) => { const o = MOLN.find(o => o.m.querySelector('image').getAttribute('href').includes(`moln-${n}.png`)); o.m.style.display = ''; o.m.setAttribute('transform', `translate(${x} ${y}) scale(${sk})`); };
    if (vad === 'krita') { visa('stor', 500, 190, 0.8); visa('liten', 1210, 700, 0.9); } else { visa('stor', 440, 640, 0.75); visa('liten', 1230, 220, 0.9); }
    if (vad === 'krita') {
      $('fia').parentNode.style.display = 'none';
      KRITA.g.setAttribute('transform', 'translate(975 560) rotate(-30) scale(1.75)');
      KRITA.bild.setAttribute('transform', 'rotate(0)'); KRITA.skugga.style.display = 'none'; KRITA.inre.setAttribute('transform', 'scale(1)');
      KLOTT.g.setAttribute('transform', 'translate(940 790) scale(1.35 0.8)');
    } else {
      $('golv').style.display = 'none';
      const f = $('fia').parentNode, r = f.getBoundingClientRect(), vb = document.querySelector('svg').getScreenCTM().a;
      // skärmkoordinater → viewBox (800-rutan visar x 420–1500 av 1920)
      const cx = (r.x + r.width / 2) / vb + 420, cy = (r.y + r.height / 2) / vb, s = 1020 / (r.height / vb);
      f.setAttribute('transform', `translate(960 545) scale(${s}) translate(${-cx} ${-cy})`);
    }
  }, vad);
  await p.screenshot({ path: `${UT}/${namn}.png` });
  await p.close();
}
await b.close(); console.log('ok', fel.slice(0, 4));
