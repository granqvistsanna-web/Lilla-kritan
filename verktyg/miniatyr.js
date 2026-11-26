// Färgstrimman: YouTube-miniatyrernas text och ram, samma i alla avsnitt (skill `miniatyrer`, Sanna 2026-11-07).
// En sned kritstrimma i avsnittets färg till vänster med vit klistermärkeskant och mjuk skugga, titeln i Fredoka på två rader,
// och en stor gul cirkel som klipps av hörnet uppe till vänster med videons ungefärliga längd ("4 min").
// Ingen glans. Bilden till höger (hjälten) ritar avsnittets miniatyr.js själv, med sin kit-scen, innan detta läggs ovanpå.
//
//   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=block">
//   <script src="…/verktyg/miniatyr.js"></script>
//   await miniatyr.strimma(lager.overst, {
//     farg: '#3E9B35',               // avsnittets färg (strimman); kritstrukturen (miniatyr-textur.png) läggs ovanpå
//     titel: ['Gröna', 'sången'],    // två rader: färgordet stort, resten mindre (krymps om de är för breda); tre ord ger tre lika stora rader
//     kanal: '',                     // standard: inget kanalnamn (YouTube visar det under bilden); 'lilla kritan' om det ska stå
//     cirkel: ['4', 'min'],          // videons längd i hela minuter (miniatyr.html räknar fram den ur tid); [] = ingen cirkel
//   });
//
// Måtten är i en 1280×720-ruta som läggs över den synliga delen av scenen (duken skärs lite i sidorna, 1376×768 mot 16:9).
// Högra nedre hörnet lämnas åt bilden: där ligger YouTubes tidsbricka.
(() => {
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attr, parent) => { const e = document.createElementNS(NS, tag); for (const k in attr) e.setAttribute(k, attr[k]); parent?.appendChild(e); return e; };
const STRIMMA = 'M-40 -40 H560 L420 760 H-40 Z';   // överkanten x 560, nederkanten x 420: kanten lutar in mot hjälten
const MORK_TEXT = '#2a2516', GUL = '#f4d252';
const TEXTUR = new URL('miniatyr-textur.png', document.currentScript.src).href;   // kritstruktur ur OpenArt ("Drag 1", Sanna 2026-11-07)

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
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
    <filter id="mi-vax-latt" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feColorMatrix in="korn" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.2 0 0 0 1.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="mi-sax" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="11" result="k"/>
      <feDisplacementMap in="SourceGraphic" in2="k" scale="16" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="mi-skugga" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="4" dy="8" stdDeviation="16" flood-color="#14321a" flood-opacity=".2"/>
    </filter>
    <filter id="mi-sken" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
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

// Julkalendern (Sanna 2026-11-14): luckmärket i stället för cirkeln, som kalenderluckan i filmernas ram (röd lucka, grön ram,
// vitt nummer, guldknopp, snö på taket), snöflingor på strimman och en ljusslinga längs kanten.
const SNOFLINGOR = [[70, 300, 22], [395, 70, 30], [470, 250, 16], [330, 655, 26], [60, 640, 18], [250, 250, 14], [435, 470, 20], [150, 700, 12], [300, 120, 12]];
const LAMPOR = ['#E8463A', '#F4C542', '#4FB06A', '#5B9BE0'];
function snoflinga(x, y, r, parent) {
  const g = el('g', { transform: `translate(${x} ${y}) rotate(${(x * 7) % 30})`, stroke: '#fff', 'stroke-width': Math.max(3, r * 0.2), 'stroke-linecap': 'round', fill: 'none', opacity: 0.9 }, parent);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3, [c, s] = [Math.cos(a), Math.sin(a)], ux = c * r, uy = s * r, m = 0.55;
    el('path', { d: `M0 0 L${ux} ${uy} M${c * r * m} ${s * r * m} l${Math.cos(a + 0.9) * r * 0.32} ${Math.sin(a + 0.9) * r * 0.32} M${c * r * m} ${s * r * m} l${Math.cos(a - 0.9) * r * 0.32} ${Math.sin(a - 0.9) * r * 0.32}` }, g);
  }
}
function julpynt(g, lucka) {
  const sno = el('g', { filter: 'url(#mi-sax)' }, g);
  for (const [x, y, r] of SNOFLINGOR) snoflinga(x, y, r, sno);
  // ljusslingan längs strimmans kant (560, -40) → (420, 760), en mjuk båge mellan fästena
  const slinga = el('g', {}, g), P = t => [568 - 140 * t + Math.sin(t * Math.PI * 5) * 10, -30 + 780 * t];
  let d = ''; for (let i = 0; i <= 60; i++) { const [x, y] = P(i / 60); d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }
  el('path', { d, stroke: '#2d3a2a', 'stroke-width': 4, fill: 'none', opacity: 0.85 }, slinga);
  for (let i = 0; i < 11; i++) {
    const t = (i + 0.5) / 11, [x, y] = P(t), farg = LAMPOR[i % 4];
    el('circle', { cx: x + 14, cy: y + 4, r: 26, fill: farg, opacity: 0.28, filter: 'url(#mi-sken)' }, slinga);
    const l = el('g', { transform: `translate(${x} ${y}) rotate(${-80 + (i % 2) * 20})` }, slinga);
    el('rect', { x: -5, y: -6, width: 10, height: 10, rx: 2, fill: '#3b4637' }, l);
    el('ellipse', { cx: 0, cy: 16, rx: 10, ry: 15, fill: farg, stroke: '#fff', 'stroke-width': 3 }, l);
    el('ellipse', { cx: -3, cy: 11, rx: 3, ry: 5, fill: '#fff', opacity: 0.55 }, l);
  }
  // luckmärket: som kalenderluckan i ramen
  const [x, y, w, h] = [36, 48, 214, 222], m = el('g', { transform: `rotate(-6 ${x + w / 2} ${y + h / 2})`, filter: 'url(#mi-skugga)' }, g);
  el('rect', { x: x - 12, y: y - 12, width: w + 24, height: h + 24, rx: 34, fill: '#fff' }, m);
  el('rect', { x, y, width: w, height: h, rx: 24, fill: '#2F7D4A', filter: 'url(#mi-vax-latt)' }, m);
  el('rect', { x: x + 16, y: y + 16, width: w - 32, height: h - 32, rx: 16, fill: '#D93A2F', filter: 'url(#mi-vax-latt)' }, m);
  el('rect', { x: x + 26, y: y + 26, width: w - 52, height: h - 52, rx: 12, fill: 'none', stroke: '#a82a22', 'stroke-width': 3, opacity: 0.6 }, m);
  // glans på luckan (Sanna 2026-11-15, bara julmärket): mjukt sken uppifrån, en sned ljusstrimma och blank guldknopp
  const svg = g.ownerSVGElement;
  if (!svg.querySelector('#mi-glans')) svg.querySelector('defs').insertAdjacentHTML('beforeend', `
    <linearGradient id="mi-glans" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <radialGradient id="mi-knopp" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#F4C542"/><stop offset="1" stop-color="#c8901f"/></radialGradient>`);
  el('rect', { x: x + 16, y: y + 16, width: w - 32, height: (h - 32) * 0.55, rx: 16, fill: 'url(#mi-glans)' }, m);
  el('path', { d: `M${x + 30} ${y + h - 70} L${x + 92} ${y + 30} L${x + 120} ${y + 30} L${x + 58} ${y + h - 70} Z`, fill: '#fff', opacity: 0.22 }, m);
  el('path', { d: `M${x + 30} ${y + 52} Q${x + 34} ${y + 30} ${x + 60} ${y + 28}`, stroke: '#fff', 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none', opacity: 0.7 }, m);
  el('circle', { cx: x + w - 38, cy: y + h - 40, r: 11, fill: 'url(#mi-knopp)', stroke: '#fff', 'stroke-width': 3 }, m);
  el('circle', { cx: x + w - 41, cy: y + h - 44, r: 3.5, fill: '#fff', opacity: 0.9 }, m);
  // snö på taket
  el('path', { d: `M${x - 10} ${y + 6} Q${x - 8} ${y - 26} ${x + 30} ${y - 22} Q${x + 70} ${y - 34} ${x + 110} ${y - 22} Q${x + 160} ${y - 34} ${x + w + 4} ${y - 18} Q${x + w + 18} ${y} ${x + w - 4} ${y + 14} Q${x + w - 30} ${y + 28} ${x + w - 54} ${y + 12} Q${x + 120} ${y + 26} ${x + 80} ${y + 12} Q${x + 40} ${y + 30} ${x + 14} ${y + 18} Q${x - 12} ${y + 22} ${x - 10} ${y + 6} Z`, fill: '#fff' }, m);
  text('lucka', x + w / 2, y + 74, 40, w - 70, '#fff', m, { 'letter-spacing': 1 });
  text(String(lucka), x + w / 2 - 4, y + h - 38, 136, w - 76, '#fff', m);
}

// Kritans ABC (Sanna 2026-11-26): seriens märke är bokstavsklossen ur filmernas intro, en träkloss med krämvit sida,
// en ram i bokstavens färg och bokstaven stor, med "Kritans ABC" under. Den ersätter titeln; cirkeln med längden står kvar.
function abcKloss(g, farg, bokstav) {
  const [x, y, s] = [104, 262, 232], m = el('g', { transform: `rotate(-7 ${x + s / 2} ${y + s / 2})`, filter: 'url(#mi-skugga)' }, g);
  el('rect', { x: x - 12, y: y - 12, width: s + 40, height: s + 40, rx: 36, fill: '#fff' }, m);
  el('rect', { x: x + 16, y: y + 16, width: s, height: s, rx: 26, fill: '#b9814c', filter: 'url(#mi-vax-latt)' }, m);   // klossens sida, djupet
  el('rect', { x, y, width: s, height: s, rx: 26, fill: '#dba56c', filter: 'url(#mi-vax-latt)' }, m);
  el('rect', { x: x + 20, y: y + 20, width: s - 40, height: s - 40, rx: 16, fill: '#fbf4e4', stroke: farg, 'stroke-width': 12 }, m);
  text(bokstav, x + s / 2, y + s / 2 + 58, 168, s - 64, farg, m, { stroke: '#fff', 'stroke-width': 6, 'paint-order': 'stroke' });
}

async function strimma(parent, { farg, titel, kanal = '', cirkel = [], jul = null, abc = null }) {
  if (jul) cirkel = [];
  const svg = parent.ownerSVGElement; defs(svg);
  await document.fonts.load('600 100px Fredoka', titel.join(' ') + kanal + '0123456789 min');
  const vb = svg.viewBox.baseVal, box = svg.getBoundingClientRect(), k = Math.max(box.width / vb.width, box.height / vb.height), w = box.width / k, h = box.height / k;
  const g = el('g', { transform: `translate(${(vb.width - w) / 2} ${(vb.height - h) / 2}) scale(${w / 1280})` }, parent);
  const ljus = ljushet(farg) > 0.4, fg = ljus ? MORK_TEXT : '#fff';   // ljusa färger (gult, vitt, rosa) får mörk text
  // strimman: vit kant, färgen och kritstrukturen ovanpå (soft-light, gråskala: fungerar för alla färger); saxad kant och mjuk skugga mot bilden
  const s = el('g', { filter: 'url(#mi-sax)' }, el('g', { filter: 'url(#mi-skugga)' }, g));
  el('path', { d: STRIMMA, fill: '#fff', stroke: '#fff', 'stroke-width': 28, 'stroke-linejoin': 'round' }, s);
  el('path', { d: STRIMMA, fill: farg }, s);
  if (!svg.querySelector('#mi-klipp')) el('path', { d: STRIMMA }, el('clipPath', { id: 'mi-klipp' }, svg.querySelector('defs')));
  el('image', { href: TEXTUR, x: -40, y: -40, width: 620, height: 820, preserveAspectRatio: 'xMidYMid slice', 'clip-path': 'url(#mi-klipp)', style: 'mix-blend-mode:soft-light' }, s);

  // cirkeln: stor och gul, mitten nära hörnet så att bildkanten klipper den
  if (cirkel.length) {
    const [x, y, r] = [104, 96, 120], c = el('g', { transform: `rotate(-8 ${x} ${y})` }, el('g', { filter: 'url(#mi-skugga)' }, g));
    el('circle', { cx: x, cy: y, r: r + 12, fill: '#fff' }, c);
    el('circle', { cx: x, cy: y, r, fill: ljus ? '#fdfbf4' : GUL, filter: 'url(#mi-vax)' }, c);   // på en ljus strimma blir cirkeln vit
    if (cirkel.length === 1) text(cirkel[0], x, y + r * 0.36, r * 1.02, r * 1.5, MORK_TEXT, c);
    else { text(cirkel[0], x + 6, y + 22, r * 0.86, r * 1.3, MORK_TEXT, c); text(cirkel[1], x + 6, y + 72, r * 0.4, r, MORK_TEXT, c); }
  }

  // titeln och kanalnamnet, lutade som strimmans kant
  const t = el('g', { transform: `translate(0 ${jul ? 36 : 0}) rotate(-7 222 453)`, filter: ljus ? '' : 'url(#mi-skugga-text)' }, g);
  if (abc) {
    abcKloss(g, farg, abc.bokstav);
    text(titel[0], 222, 590, 64, 330, fg, t);   // "Kritans" mindre, "ABC" stort: seriens namn läses i 168 px
    if (titel[1]) text(titel[1], 222, 686, 112, 320, fg, t);
  } else if (titel.length === 3) {   // tre rader, alla stora: för långa titlar som annars blir små på andra raden (Sanna 2026-11-13)
    text(titel[0], 222, 352, 132, 370, fg, t);
    text(titel[1], 222, 476, 132, 350, fg, t);
    text(titel[2], 222, 600, 132, 330, fg, t);
  } else {
    text(titel[0], 222, 394, 172, 370, fg, t);
    text(titel[1], 222, 512, 110, 333, fg, t);
  }
  if (kanal) text(kanal, 196, 664, 40, 300, fg, g, { opacity: 0.95, transform: 'rotate(-7 196 664)' });
  if (jul) julpynt(g, jul.lucka);
  return g;
}

window.miniatyr = { strimma, STRIMMA };
})();
