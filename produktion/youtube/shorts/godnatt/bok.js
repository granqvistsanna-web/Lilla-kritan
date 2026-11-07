// Bilderboken för godnattsagorna (Sanna 2026-11-07, skiss 2). Sagan börjar som ett bokomslag som slås upp mot första sidan
// och slutar med att boken stängs och omslaget säger Godnatt. Omslaget lever lite: stjärnorna tindrar, figuren andas,
// månen blinkar. I slutet blundar månen och "Godnatt" glider fram.
//   <script src="../bok.js"></script>
//   bok.svg({ titel: ['Lammet', 'går hem'], figur: 'assets/…/ludde-sover.png', figurY })   sist i <svg>, före #morker
//   bok.rita(tt, bok.INTRO, slutet)     varje bildruta; slutet = när sista sidan tar slut
//   ljud: bok.ljud(slutet, effekt)       glimt och swoosh
// Filmen blir bok.INTRO längre i början och bok.OUTRO längre i slutet (sidorna börjar vid INTRO).
(() => {
const INTRO = 5, OUTRO = 6.5;
const X = 40;   // omslagets vänsterkant: boken vänds kring den
const SAKER = 'assets/bakgrunder/nattkullen-saker';
const STJARNOR = [[150, 230, 44], [930, 210, 36], [120, 820, 32], [960, 760, 40], [930, 1560, 32], [150, 1600, 36], [540, 1810, 28]];
const VAND = 1.9, LYFT = 0.35;   // sekunder: hur länge omslaget vänds, och lyfts innan det vänds
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const del = (a, b, t) => clamp((t - a) / (b - a));
const inUt = k => k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
const inn = k => 1 - Math.cos(Math.PI / 2 * k), ut = k => Math.sin(Math.PI / 2 * k);
// bokpärm: rak rygg till vänster (små hörn), rundad till höger
const parm = (x, y, w, h, rv, rh, extra) => `<path d="M${x + rv} ${y}H${x + w - rh}A${rh} ${rh} 0 0 1 ${x + w} ${y + rh}V${y + h - rh}A${rh} ${rh} 0 0 1 ${x + w - rh} ${y + h}H${x + rv}A${rv} ${rv} 0 0 1 ${x} ${y + h - rv}V${y + rv}A${rv} ${rv} 0 0 1 ${x + rv} ${y}Z" ${extra}/>`;
const img = (href, x, y, w, h, extra = '') => `<image href="/${href}" x="${x}" y="${y}" width="${w}" height="${h}" ${extra}/>`;
const text = (x, y, s, ord, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" fill="#F8F2DD" stroke="#0b1236" stroke-width="12" stroke-opacity=".55" paint-order="stroke" font-family="Fredoka" font-weight="600" font-size="${s}" ${extra}>${ord}</text>`;

function svg({ titel, figur, figurY = 1070 }) {
  const storlek = Math.max(...titel.map(r => r.length)) > 9 ? 104 : 118;
  return `<defs><linearGradient id="bok-kastgrad"><stop offset="0" stop-color="#0b1236" stop-opacity=".7"/><stop offset="1" stop-color="#0b1236" stop-opacity="0"/></linearGradient></defs>` +
  ['upp', 'stang'].map(id => `<g id="bok-${id}" opacity="0">
    <rect id="bok-${id}-kast" x="0" y="40" width="150" height="1840" fill="url(#bok-kastgrad)" opacity="0"/>
    <g id="bok-${id}-sida">
      ${parm(X - 14, 26, 1080 - 2 * X + 28, 1868, 30, 74, 'fill="#2F3A6B"')}
      ${parm(X, 40, 1080 - 2 * X, 1840, 18, 62, 'fill="#2F3A6B" stroke="#F8F2DD" stroke-width="22"')}
      <path d="M${X + 82} 52V1868" stroke="#101a4a" stroke-width="7" opacity=".45"/><path d="M${X + 91} 52V1868" stroke="#F8F2DD" stroke-width="3" opacity=".1"/>
      ${STJARNOR.map(([x, y, w]) => `<g transform="translate(${x} ${y})"><g class="bok-stj">${img(SAKER + '/stjarna.png', -w / 2, -w / 2, w, w * 797 / 823)}</g></g>`).join('')}
      ${id === 'upp'
        ? `<text x="540" y="330" text-anchor="middle" fill="#F6D873" font-family="Fredoka" font-weight="600" font-size="46" letter-spacing="14">GODNATTSAGA</text>
           ${titel.map((r, i) => text(540, 480 + i * 120, storlek, r)).join('')}`
        : `<g id="bok-ord">${text(540, 470, 150, 'Godnatt')}</g>`}
      <circle cx="540" cy="930" r="230" fill="url(#manglod)"/>
      ${img(SAKER + '/mane.png', 410, 780, 260, 260 * 325 / 300, 'filter="url(#ljusare)"')}
      <g transform="translate(506 910) scale(1.5)" stroke="#1d1d1d" stroke-width="3.5" stroke-linecap="round" fill="none">
        <g fill="#F29AA2" stroke="none" opacity=".55"><ellipse cx="-24" cy="10" rx="7" ry="4.5"/><ellipse cx="24" cy="10" rx="7" ry="4.5"/></g>
        <g id="bok-${id}-oppna" fill="#1d1d1d" stroke="none"><ellipse cx="-14" rx="5.5" ry="7"/><ellipse cx="14" rx="5.5" ry="7"/>
          <circle cx="-15.8" cy="-2.6" r="1.6" fill="#fff"/><circle cx="12.2" cy="-2.6" r="1.6" fill="#fff"/></g>
        <path id="bok-${id}-sov" d="M-22 -1 Q-14 7 -6 -1 M6 -1 Q14 7 22 -1"/><path d="M-8 13 Q0 21 8 13"/></g>
      <g id="bok-${id}-figur">${img(figur, 210, figurY, 660, 660)}</g>
    </g>
    ${parm(X, 40, 1080 - 2 * X, 1840, 18, 62, `id="bok-${id}-skugga" fill="#101a4a" opacity="0"`)}
    <rect id="bok-${id}-kant" x="0" y="40" width="1" height="1840" rx="9" fill="#1d2756" opacity="0"/>
  </g>`).join('');
}

// omslaget lyfts lite (lyft 0..1) och vänds kring vänsterkanten (k 0 = stängd, 1 = helt uppslagen); det blir mörkare ju mer det vänds.
// Djupet: den fria kanten blir lite högre (kommer mot oss), pärmens tjocklek syns som en kant, och pärmen kastar en mjuk skugga
// på sidan under. zoom: hela boken skalas kring mitten (omslaget sätter sig i början).
function vand(id, k, lyft, zoom = 1) {
  const $ = document.getElementById.bind(document), c = Math.max(0.001, Math.cos(Math.PI / 2 * k)), s = 1 + 0.015 * lyft + 0.03 * Math.sin(Math.PI * k);
  const z = `translate(540 960) scale(${zoom}) translate(-540 -960) `, tf = z + `translate(${X} 960) scale(${c * s} ${s}) translate(${-X} -960)`;
  const kant = X + (1080 - 2 * X + 14) * c * s, tjock = 18 * Math.sin(Math.PI / 2 * k) * s;   // fria kantens x, och pärmens synliga tjocklek
  $(`bok-${id}`).setAttribute('opacity', k < 0.999 ? 1 : 0);
  $(`bok-${id}-sida`).setAttribute('transform', tf);
  $(`bok-${id}-skugga`).setAttribute('transform', tf);
  $(`bok-${id}-skugga`).setAttribute('opacity', 0.55 * k);
  $(`bok-${id}-kant`).setAttribute('transform', z + `translate(${kant - 8} 960) scale(1 ${s}) translate(0 -960)`);
  $(`bok-${id}-kant`).setAttribute('width', tjock + 8);
  $(`bok-${id}-kant`).setAttribute('opacity', k > 0 ? 1 : 0);
  $(`bok-${id}-kast`).setAttribute('transform', z + `translate(${kant + tjock} 960) scale(${0.6 + 0.8 * Math.sin(Math.PI * k) + 0.4 * lyft} ${s}) translate(0 -960)`);
  $(`bok-${id}-kast`).setAttribute('opacity', Math.min(1, lyft + 3 * k) * (1 - k) * 0.9);
}

function rita(tt, intro, slut) {
  const $ = document.getElementById.bind(document);
  const borjar = intro - VAND - 0.1;   // när omslaget börjar vändas
  // uppslaget: börjar mjukt och sveper sen ut ur bild utan att stanna som en smal remsa vid ryggen; i början sätter sig boken lugnt
  vand('upp', ((p) => (inn(p) + inUt(p)) / 2)(del(borjar, borjar + VAND, tt)), Math.sin(Math.PI * del(borjar - LYFT, borjar + 0.4, tt)), 1 + 0.035 * (1 - ut(del(0, 1.6, tt))));
  vand('stang', 1 - inUt(del(slut - 0.2, slut - 0.2 + VAND, tt)), 0);
  // stjärnorna tindrar en i taget, figuren andas lugnt
  document.querySelectorAll('.bok-stj').forEach((e, i) => e.setAttribute('transform', `scale(${1 + 0.12 * Math.sin(2 * Math.PI * (tt / 2.8 + i * 0.37))})`));
  const a = 0.018 * Math.sin(2 * Math.PI * tt / 4.5);
  for (const id of ['upp', 'stang']) $(`bok-${id}-figur`).setAttribute('transform', `translate(540 1700) scale(${1 - a / 2} ${1 + a}) translate(-540 -1700)`);
  // månen blinkar på omslaget; i slutet blundar den när boken har stängts, och sen glider "Godnatt" fram
  const blink = ((tt + 2.2) % 3.9) < 0.15, stangd = slut - 0.2 + VAND;
  const oga = (id, oppen) => { $(`bok-${id}-oppna`).setAttribute('opacity', oppen ? 1 : 0); $(`bok-${id}-sov`).setAttribute('opacity', oppen ? 0 : 1); };
  oga('upp', !blink);
  oga('stang', tt < stangd + 0.9 && !blink);
  const k = inUt(del(stangd + 0.5, stangd + 1.6, tt));
  $('bok-ord').setAttribute('opacity', k);
  $('bok-ord').setAttribute('transform', `translate(0 ${24 * (1 - k)})`);
}

// ljuden: ett glimt när omslaget syns, swoosh när boken slås upp och stängs, ett glimt på Godnatt
const ljud = (slut, effekt) => [
  { t: 0.4, fil: effekt('glimt', 2), vol: 0.4 },
  { t: INTRO - VAND - 0.1, fil: effekt('swoosh', 1), vol: 0.15 },
  { t: slut - 0.2, fil: effekt('swoosh', 2), vol: 0.15 },
  { t: slut - 0.2 + VAND + 0.5, fil: effekt('glimt', 1), vol: 0.35 },
];

window.bok = { svg, rita, ljud, INTRO, OUTRO };
})();
