// Färgstrimman: YouTube-miniatyrernas text och ram, samma i alla avsnitt (skill `miniatyrer`, Sanna 2026-11-07).
// En sned kritstrimma i avsnittets färg till vänster med vit klistermärkeskant och mjuk skugga, titeln i Fredoka på två rader,
// kanalnamnet nere och en stor gul cirkel som klipps av hörnet uppe till vänster (avsnittsnummer, eller "25 min" i mixar).
// Ingen glans. Bilden till höger (hjälten) ritar avsnittets miniatyr.js själv, med sin kit-scen, innan detta läggs ovanpå.
//
//   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=block">
//   <script src="…/verktyg/miniatyr.js"></script>
//   await miniatyr.strimma(lager.overst, {
//     farg: '#3E9B35',               // avsnittets färg (strimman); mörkare grund och ljusare kritdrag räknas fram
//     titel: ['Gröna', 'sången'],    // två rader: färgordet stort, resten mindre (krymps om de är för breda)
//     kanal: '',                     // standard: inget kanalnamn (YouTube visar det under bilden); 'lilla kritan' om det ska stå
//     cirkel: ['14'],                // ['25', 'min'] i mixar; [] = ingen cirkel
//   });
//
// Måtten är i en 1280×720-ruta som läggs över den synliga delen av scenen (duken skärs lite i sidorna, 1376×768 mot 16:9).
// Högra nedre hörnet lämnas åt bilden: där ligger YouTubes tidsbricka.
(() => {
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attr, parent) => { const e = document.createElementNS(NS, tag); for (const k in attr) e.setAttribute(k, attr[k]); parent?.appendChild(e); return e; };
const STRIMMA = 'M-40 -40 H560 L420 760 H-40 Z';   // överkanten x 560, nederkanten x 420: kanten lutar in mot hjälten
const MORK_TEXT = '#2a2516', GUL = '#f4d252';

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const tillHex = c => '#' + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const blanda = (a, b, k) => tillHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * k));
const ljushet = h => { const [r, g, b] = hex(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };

function defs(svg) {
  if (svg.querySelector('#mi-vax')) return;
  const d = svg.querySelector('defs') || el('defs', {}, svg);
  d.insertAdjacentHTML('beforeend', `
    <filter id="mi-vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="mi-sax" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="11" result="k"/>
      <feDisplacementMap in="SourceGraphic" in2="k" scale="16" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="mi-skugga" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="4" dy="8" stdDeviation="16" flood-color="#14321a" flood-opacity=".2"/>
    </filter>
    <filter id="mi-skugga-text" x="-10%" y="-20%" width="120%" height="150%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#0f2a12" flood-opacity=".45"/>
    </filter>`);
}

// text med en största bredd (krymps efter mätning)
function text(s, x, y, size, max, fill, parent, attr = {}) {
  const t = el('text', { x, y, 'text-anchor': 'middle', 'font-size': size, 'font-family': 'Fredoka', 'font-weight': 600, fill, ...attr }, parent);
  t.textContent = s;
  const w = t.getComputedTextLength(); if (w > max) t.setAttribute('font-size', size * max / w);
  return t;
}

async function strimma(parent, { farg, titel, kanal = '', cirkel = [] }) {
  const svg = parent.ownerSVGElement; defs(svg);
  await document.fonts.load('600 100px Fredoka', titel.join(' ') + kanal + '0123456789 min');
  const vb = svg.viewBox.baseVal, box = svg.getBoundingClientRect(), k = Math.max(box.width / vb.width, box.height / vb.height), w = box.width / k, h = box.height / k;
  const g = el('g', { transform: `translate(${(vb.width - w) / 2} ${(vb.height - h) / 2}) scale(${w / 1280})` }, parent);
  const ljus = ljushet(farg) > 0.4, fg = ljus ? MORK_TEXT : '#fff';   // ljusa färger (gult, vitt, rosa) får mörk text
  const mork = blanda(farg, '#000000', 0.2), drag = blanda(farg, '#ffffff', 0.22);
  const id = `mi-drag-${farg.slice(1)}`;
  el('rect', { width: 34, height: 11, fill: drag }, el('pattern', { id, width: 34, height: 34, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-32)' }, svg.querySelector('defs')));

  // strimman: vit kant, mörkare grund, kritfärgen, sneda kritdrag; saxad kant och mjuk skugga mot bilden
  const s = el('g', { filter: 'url(#mi-sax)' }, el('g', { filter: 'url(#mi-skugga)' }, g));
  el('path', { d: STRIMMA, fill: '#fff', stroke: '#fff', 'stroke-width': 28, 'stroke-linejoin': 'round' }, s);
  el('path', { d: STRIMMA, fill: mork }, s);
  el('path', { d: STRIMMA, fill: farg, filter: 'url(#mi-vax)' }, s);
  el('path', { d: STRIMMA, fill: `url(#${id})`, filter: 'url(#mi-vax)', opacity: 0.3 }, s);

  // cirkeln: stor och gul, mitten nära hörnet så att bildkanten klipper den
  if (cirkel.length) {
    const [x, y, r] = [104, 96, 120], c = el('g', { transform: `rotate(-8 ${x} ${y})` }, el('g', { filter: 'url(#mi-skugga)' }, g));
    el('circle', { cx: x, cy: y, r: r + 12, fill: '#fff' }, c);
    el('circle', { cx: x, cy: y, r, fill: ljus ? '#fdfbf4' : GUL, filter: 'url(#mi-vax)' }, c);   // på en ljus strimma blir cirkeln vit
    if (cirkel.length === 1) text(cirkel[0], x, y + r * 0.36, r * 1.02, r * 1.5, MORK_TEXT, c);
    else { text(cirkel[0], x + 6, y + 22, r * 0.86, r * 1.3, MORK_TEXT, c); text(cirkel[1], x + 6, y + 72, r * 0.4, r, MORK_TEXT, c); }
  }

  // titeln och kanalnamnet, lutade som strimmans kant
  const t = el('g', { transform: 'rotate(-7 222 453)', filter: ljus ? '' : 'url(#mi-skugga-text)' }, g);
  text(titel[0], 222, 394, 172, 370, fg, t);
  text(titel[1], 222, 512, 110, 333, fg, t);
  if (kanal) text(kanal, 196, 664, 40, 300, fg, g, { opacity: 0.95, transform: 'rotate(-7 196 664)' });
  return g;
}

window.miniatyr = { strimma, STRIMMA };
})();
