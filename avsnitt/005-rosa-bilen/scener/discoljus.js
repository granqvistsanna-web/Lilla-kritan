// Discots ljus, rosa (avsnitt 005): kopia av 006-orange-baten/scener/discoljus.js med rosa och varma toner, 005:s kula och
// 005:s dansgolv (rutorna som lyser). Den stora kulan snurrar och glittrar, mjuka ljuskäglor från kulan och ljusfläckar som
// glider över vägg och golv (bakom figurerna) och byter färgton på takten. Lugnt för små barn: inget blinkar, färgerna glider
// över på 0,6 s, inget går fortare än takten. Läses in efter kit.js.
//   const ljus = discoljus.ny({ plate: g })   (allt läggs i g, bakom figurerna)
//   ljus.rita(k)                              k = scenens klocka, samma som kit.BEAT0 räknar med
//   ljus.fade(o)                              ljusfläckarna, käglorna och rutorna tonas (0–1), kulan står kvar
(() => {
const { W, H, el, bild, BEAT, BEAT0 } = kit;
const KULA = [688, 78, 64], MITT = [513, 583], R0 = 291;   // klotet i assets/bakgrunder/danspaus/cut/discokula.png
const FASETT = ['#D8789F', '#D86090', '#F0A8C0', '#D890A8'], FASETT_N = 16, FASETT_RADER = 8, VARV = 9;   // ett varv på 9 s
// ljusfläckarnas färger: varma och mjuka; varje fläck tar nästa färg på varje ny takt (fyra slag)
const FARG = ['#FFF4F8', '#FFC8DC', '#FFE2C4', '#FFD6EA', '#F4DCFF', '#FFF0D2'];   // rosa och varmt
// fläckarna: [x, y, rx, ry, svep x, svep y, period (s), fas]; golvfläckarna platta, väggfläckarna runda
const FLACK = [[330, 640, 150, 48, 260, 30, 13, 0], [900, 700, 170, 54, 300, 26, 16, 2.1], [640, 600, 130, 40, 380, 18, 11, 4.0],
  [250, 300, 70, 70, 160, 90, 14, 1.0], [1120, 260, 64, 64, 170, 100, 12, 3.2], [700, 200, 76, 76, 330, 40, 17, 5.1]];
const KAGLA = [-58, -22, 22, 58];
// 005:s dansgolv (discot/index.html): några rutor lyser upp mjukt och långsamt, nya varje takt
const GOLV = { TOPP: 560, VP: [688, 120], RAD: [560, 598, 652, 732, 850, 1000], N: 7, B: 230 };
const RUTOR = (() => {
  const { VP, RAD, N, B } = GOLV, at = (xb, y) => VP[0] + (xb - VP[0]) * (y - VP[1]) / (H - VP[1]), u = [];
  for (let j = 0; j < RAD.length - 1; j++) for (let i = -N; i < N; i++) {
    const xa = VP[0] + i * B, xb = xa + B, [y0, y1] = [RAD[j], RAD[j + 1]];
    u.push({ i: i + N, j, d: `M${at(xa, y0)} ${y0}L${at(xb, y0)} ${y0}L${at(xb, y1)} ${y1}L${at(xa, y1)} ${y1}Z` });
  }
  return u;
})();   // ljuskäglorna från kulan, grader från lodrätt; de svajar sakta

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const blanda = (a, b, k) => 'rgb(' + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * k)).join(',') + ')';
const stjarnaD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };

function ny(L) {
  const defs = document.querySelector('svg defs'), [cx, cy, R] = KULA;
  if (!defs.querySelector('#kritkorn')) defs.insertAdjacentHTML('beforeend', `
  <filter id="kritkorn" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="v"/>
    <feDisplacementMap in="SourceGraphic" in2="v" scale="5" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="3" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 2.3" result="p"/>
    <feComposite in="p" in2="d" operator="in" result="pk"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
  </filter>`);
  defs.insertAdjacentHTML('beforeend', `
  <filter id="ljusoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="24"/></filter>
  <filter id="kaglaoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="7"/></filter>
  <linearGradient id="kagla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0F6" stop-opacity="0.55"/><stop offset="1" stop-color="#FFF0F6" stop-opacity="0"/></linearGradient>
  <filter id="rutsken" x="-0.2" y="-0.2" width="1.4" height="1.4"><feGaussianBlur stdDeviation="5"/></filter>
  <clipPath id="kulklipp"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
  <radialGradient id="kulskugga" cx="0.42" cy="0.38" r="0.62">
    <stop offset="0.55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#8a2c5a" stop-opacity="0.35"/></radialGradient>`);
  const KRITA = { filter: 'url(#kritkorn)' };

  // golvrutorna som lyser upp, på golvet under figurerna
  const rutG = el('g', { filter: 'url(#rutsken)' }, L.plate);
  const rutor = RUTOR.map(r => ({ ...r, e: el('path', { d: r.d, fill: '#FFF2F8', opacity: 0 }, rutG) }));

  // ljuskäglorna bakom kulan
  const kaglor = el('g', { filter: 'url(#kaglaoskarpa)', opacity: 0.9 }, L.plate);
  const kagla = KAGLA.map(() => el('path', { d: `M-14 0L14 0L170 900L-170 900Z`, fill: 'url(#kagla)' }, kaglor));

  // kulan: 005:s discokula.png, rutorna ritas i kod ovanpå i kulans rosa toner och snurrar åt vänster
  const s = R / R0;
  bild(`${kit.ROT}assets/bakgrunder/danspaus/cut/discokula.png`, L.plate, { transform: `translate(${cx - MITT[0] * s} ${cy - MITT[1] * s}) scale(${s})` });
  const kulRutor = el('g', { 'clip-path': 'url(#kulklipp)' }, L.plate), krita = el('g', KRITA, kulRutor);
  const vag = FASETT.map(fill => el('path', { fill }, krita));
  const nat = el('path', { fill: 'none', stroke: '#B84E80', 'stroke-width': 2, 'stroke-linejoin': 'round' }, krita);
  el('circle', { cx, cy, r: R, fill: 'url(#kulskugga)' }, kulRutor);
  const glimtG = el('g', KRITA, el('g', { 'clip-path': 'url(#kulklipp)' }, L.plate));
  const glimtar = [[-0.35, 13, 0], [0.3, 10, 2.1], [0.05, 9, 4.0], [-0.6, 7, 1.2], [0.6, 7, 3.3], [-0.1, 8, 5.2]].map(([lat, r, fas0]) =>
    ({ lat, fas0, e: el('path', { d: stjarnaD(r), fill: '#fff' }, glimtG) }));
  // tre små glitterstjärnor runt kulan som växer och krymper sakta, en i taget
  const glitter = [[-1.25, 0.35, 11], [1.3, -0.2, 9], [0.95, 0.95, 8]].map(([dx, dy, r]) =>
    ({ x: cx + dx * R, y: cy + dy * R, e: el('path', { d: stjarnaD(r), fill: '#fff' }, el('g', KRITA, L.plate)) }));

  // ljusfläckarna på väggen och golvet bakom figurerna, svagare än förr (granskningen 2026-11-05: ovanpå figurerna blektes de)
  const ljusG = el('g', {}, L.plate);
  const flackar = FLACK.map(() => el('ellipse', { filter: 'url(#ljusoskarpa)', opacity: 0.35 }, ljusG));

  function rutorPaKulan(vrid) {
    const d = FASETT.map(() => ''), lat = j => -Math.PI / 2 + Math.PI * j / FASETT_RADER;
    const pt = (lo, la) => `${(cx + R * Math.cos(la) * Math.sin(lo)).toFixed(1)} ${(cy + R * Math.sin(la)).toFixed(1)}`;
    for (let i = 0; i < FASETT_N; i++) {
      let a = vrid + i * 2 * Math.PI / FASETT_N;
      a = Math.atan2(Math.sin(a), Math.cos(a)); const b = a + 2 * Math.PI / FASETT_N;
      const a2 = Math.max(a, -Math.PI / 2), b2 = Math.min(b, Math.PI / 2);   // bara framsidan
      if (b2 <= a2) continue;
      for (let j = 0; j < FASETT_RADER; j++) {
        const ix = (i * 7 + j * 3 + (i * j) % 5) % FASETT.length;           // färgen följer rutan runt
        d[ix] += `M${pt(a2, lat(j))}L${pt(b2, lat(j))}L${pt(b2, lat(j + 1))}L${pt(a2, lat(j + 1))}Z`;
      }
    }
    vag.forEach((e, k) => e.setAttribute('d', d[k]));
    let n = '';
    for (let j = 1; j < FASETT_RADER; j++) { const la = lat(j), w = R * Math.cos(la), y = cy + R * Math.sin(la); n += `M${cx - w} ${y}L${cx + w} ${y}`; }
    for (let i = 0; i < FASETT_N; i++) {
      const lo = Math.atan2(Math.sin(vrid + i * 2 * Math.PI / FASETT_N), Math.cos(vrid + i * 2 * Math.PI / FASETT_N));
      if (Math.abs(lo) >= Math.PI / 2) continue;
      n += 'M' + Array.from({ length: 13 }, (_, k) => pt(lo, -Math.PI / 2 + Math.PI * k / 12)).join('L');
    }
    nat.setAttribute('d', n);
  }

  function rita(k) {
    const vrid = -k * 2 * Math.PI / VARV;
    rutorPaKulan(vrid);
    glimtar.forEach(({ lat, fas0, e }) => {
      const v = vrid + fas0, c = Math.cos(v);
      e.style.display = c > 0 ? '' : 'none';
      e.setAttribute('transform', `translate(${cx + (R - 4) * Math.sin(v) * Math.sqrt(1 - lat * lat)} ${cy + (R - 4) * lat}) scale(${0.4 + 0.6 * c})`);
    });
    glitter.forEach(({ x, y, e }, i) => {
      const g = Math.max(0, Math.sin(2 * Math.PI * (k / 3.6 + i / 3)));   // en i taget, 3,6 s per varv
      e.setAttribute('transform', `translate(${x} ${y}) rotate(${20 * g}) scale(${g})`);
    });
    kagla.forEach((e, i) => e.setAttribute('transform', `translate(${cx} ${cy}) rotate(${KAGLA[i] + 10 * Math.sin(2 * Math.PI * k / 14 + i * 1.7)})`));
    const takt = (k - BEAT0) / BEAT / 4, n = Math.floor(takt), over = Math.min(1, (takt - n) * 4 * BEAT / 0.6);   // ny takt: 0,6 s övergång
    // rutorna: var sjunde ruta (olika varje takt) tänds och släcks i en mjuk båge över hela takten, högst 0,45 i opacitet
    const bage = Math.sin(Math.PI * (takt - n)) ** 2;
    rutor.forEach(({ i, j, e }) => e.setAttribute('opacity', ((i * 3 + j * 5 + n * 4) % 7 === 0 ? 0.45 * bage : 0).toFixed(3)));
    flackar.forEach((e, i) => {
      const [x, y, rx, ry, ax, ay, p, f] = FLACK[i], v = 2 * Math.PI * k / p + f;
      e.setAttribute('cx', x + ax * Math.sin(v)); e.setAttribute('cy', y + ay * Math.sin(2 * v + 1));
      e.setAttribute('rx', rx); e.setAttribute('ry', ry);
      const m = j => FARG[(((i + j) % FARG.length) + FARG.length) % FARG.length];
      e.setAttribute('fill', blanda(m(n - 1), m(n), over));
    });
  }
  const fade = o => { rutG.style.opacity = o; ljusG.style.opacity = o; kaglor.style.opacity = 0.9 * o; };
  return { rita, fade };
}

window.discoljus = { ny, KULA };
})();
