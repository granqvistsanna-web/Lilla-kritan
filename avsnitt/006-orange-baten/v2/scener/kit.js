// 006 v2 – det som scenerna delar: hjälpare, kameran och line boil, båten med Disa (som provet ../prov/disa-bat.html, godkänt
// 2026-11-26), 033:s vinkning och det orangea kritsvepet. Avsnittstid = sångtid + 9,0 (storyboard-v2/storyboard.md).
// Laddas efter /verktyg/blinka.js, /produktion/youtube/shorts/godnatt/v2-rigg.js och /verktyg/kritan-ritar.js.
// Sidan har <g id="kamera"> och i defs #boil med #brus och #flytt (samma som provet).
const NS = 'http://www.w3.org/2000/svg', $ = id => document.getElementById(id);
const kl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x)), mjuk = k => (k = kl(k), k * k * (3 - 2 * k)), lerp = (a, b, u) => a + (b - a) * u;
const del = (a, b, u) => mjuk((u - a) / (b - a));
const pop = tau => tau <= 0 ? 0 : 1 - Math.exp(-7 * tau) * Math.cos(16 * tau);   // klistermärkes-pop: 0 → översväng → 1
const SANG0 = 9.0, SLAG = 0.576;   // introts längd; ett slag (104 bpm)
const ORANGE = '#F28C28', ORANGE_M = '#B85A14';

// Kameran: (cx, cy) i mitten av bilden, zoom z, klämd så att bilden aldrig går utanför plattan. Line boil 2,5 px i bild:
// feDisplacementMap 2,5 / zoom, ny brusbild 6 gånger/s.
function kamera(cx, cy, z, t) {
  $('kamera').setAttribute('transform', `translate(${kl(960 - cx * z, 1920 - 1920 * z, 0).toFixed(1)} ${kl(540 - cy * z, 1080 - 1080 * z, 0).toFixed(1)}) scale(${z.toFixed(4)})`);
  $('flytt').setAttribute('scale', (2.5 / z).toFixed(3)); $('brus').setAttribute('seed', Math.floor(t * 6) % 50 + 1);
}
const kamMix = (a, b, k) => a.map((v, i) => lerp(v, b[i], mjuk(k)));

// Vinkningen (2026-11-26, Sanna: "improve dino rigs and waving", "motion on waved"). Dinoriggarna gömmer armen bakom kroppen
// mellan 26° och 80° (GOM), så 033:s 55° ± 12° syntes knappt. Nu sätts riggens vink: 1 (armen göms inte, glider 24 px ut längs
// sig själv, roten under kroppen) och armen vinkar på ca 62° ± 14° (riggen lägger till uttryckets armar, jätteglad 20).
// Rörelsen: en liten dipp före lyftet, lyft med översväng (pop), svängar 1,25/s som saktar in i ändarna, kroppen gungar emot,
// ansiktet lutar lite mot handen, ner med efterstuds. Inga rörelsestreck (Sanna 2026-11-26). Aldrig ARMROR.vinka.
const sving = u => { const x = Math.sin(2 * Math.PI * 1.25 * u); return Math.sign(x) * Math.pow(Math.abs(x), 0.7); };
function vink(u, W = 2.9, { bas = 42, amp = 14, kropp = 3 } = {}) {
  const upp = pop(Math.max(0, u - 0.12) * 1.1) * (1 - del(W - 0.5, W, u)), dipp = -6 * Math.sin(Math.PI * kl(u / 0.14));
  const env = del(0.3, 0.6, u) * (1 - del(W - 0.6, W - 0.3, u)), v = Math.max(0, u - 0.4), sv = sving(v) * env;
  return { armar: [0, upp * (bas + amp * sv) + dipp], luta: -kropp * sv * upp, boj: 2 * upp, rikt: 0.12 * upp, upp: -0.15 * upp,
    vink: kl(upp * 1.5), vinkFart: Math.cos(2 * Math.PI * 1.25 * v) * env * upp };
}
// Samma vinkning med vänster arm (bildens vänster). Disas högra arm ligger på svanssidan och flöt ihop med svansen
// (samma ljuslila, QA 2026-11-27), så i båten vinkar hon med den andra armen, ut mot himlen.
const vinkV = (u, W, o) => { const v = vink(u, W, o); return { ...v, armar: [v.armar[1], v.armar[0]], luta: -v.luta, boj: -v.boj, rikt: -v.rikt }; };
// Blicken mot en punkt i scenen: ögonen (titt, högst ca 12) och lite av huvudet (rikt, upp) vänds dit. fran = ansiktets mitt.
function tittaPa(f, p, fran, mal, k = 1) {
  const dx = mal[0] - fran[0], dy = mal[1] - fran[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  return [{ ...f, titt: [lerp(f.titt[0], 16 * ux, k), lerp(f.titt[1], 13 * uy, k)] },
    { ...p, rikt: lerp(p.rikt || 0, 0.45 * ux, k), upp: lerp(p.upp || 0, -0.5 * uy, k) }];
}
// --- Båten med Disa -------------------------------------------------------------------------------------------------------
// I båtens egna koordinater: urklippet 883 × 325 i skala 0,7 med övre vänstra hörnet i (0, 0). Botten (y 313) är vattenlinjen.
// Disa SKALA 0,5, relingen (y ≈ 84 vid x 480) skär henne vid y 720 i hennes ruta. Flaggan i aktern på motorn, bakom Disa.
const BS = 0.7, BW = 883 * BS, BH = 313 * BS, SK = 0.5, FOT = 921;
const DISA = [480 * BS, 84 * BS + (FOT - 720) * SK], MAST = [60 * BS, -170 * BS], FOREN = [860 * BS, 60 * BS];
const VAST = `<mask id="vastmask" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024" style="mask-type:alpha">
    <filter id="vastkrymp"><feMorphology operator="erode" radius="16"/></filter>
    <image href="/assets/karaktarer/dinon-disa/premium/cut/disa-body.png" width="1024" height="1024" filter="url(#vastkrymp)"/></mask>
  <g class="vast" mask="url(#vastmask)">
    <path d="M200 860 L200 600 Q230 552 300 548 Q420 548 470 566 Q494 576 498 600 L498 860Z" fill="#FF7A21"/>
    <path d="M824 860 L824 600 Q794 552 724 548 Q604 548 554 566 Q530 576 526 600 L526 860Z" fill="#FF7A21"/>
    <path d="M300 548 Q420 548 470 566 Q494 576 498 600 L486 604 Q480 584 462 578 Q420 562 300 562 Q236 566 206 612 L200 600 Q230 552 300 548Z" fill="#FFA35C" opacity="0.85"/>
    <path d="M724 548 Q604 548 554 566 Q530 576 526 600 L538 604 Q544 584 562 578 Q604 562 724 562 Q788 566 818 612 L824 600 Q794 552 724 548Z" fill="#FFA35C" opacity="0.85"/>
    <rect x="200" y="640" width="298" height="15" fill="#FFF6E8"/><rect x="526" y="640" width="298" height="15" fill="#FFF6E8"/>
  </g>
  <rect x="490" y="634" width="44" height="27" rx="7" fill="#5b5b66"/>`;

// Bygger båten i parent. B.mast är en grupp i båtens koordinater där en sak på flaggstången (Fia) kan sitta och gunga med.
async function batBygg(parent) {
  const g = document.createElementNS(NS, 'g'); parent.appendChild(g);
  g.innerHTML = `<g class="flaggan"><g transform="scale(${BS})"><path d="M60 90 L60 -170" stroke="#8a5a36" stroke-width="12" stroke-linecap="round"/>
      <path class="flagga" fill="#FF7A21" stroke="#fff" stroke-width="6" stroke-linejoin="round"/></g></g>
    <g class="figurer"></g>
    <g class="skrov"><image href="/assets/rekvisita/orange-baten-v2/cut/orange-baten-v2.png" width="883" height="325" transform="scale(${BS})"/></g>
    <path class="vag" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="26 18" opacity="0.85"/>
    <g class="mast"></g>`;
  const B = { g, flagga: g.querySelector('.flagga'), vag: g.querySelector('.vag'), mast: g.querySelector('.mast'), blinka: skapaBlinka(11) };
  B.L = await v2rigg('dinon-disa');
  B.fig = B.L.figur(DISA[0], DISA[1], SK, g.querySelector('.figurer'));
  B.fig.querySelector('.kropp').firstElementChild.insertAdjacentHTML('afterend', VAST);   // västen sitter i kroppen, under ansiktet
  B.fig.querySelectorAll('.leg-l, .leg-r, .skugga').forEach(e => e.style.display = 'none');   // benen är dolda av skrovet
  return B;
}

// x, y: var skrovets botten mitt ligger (vattenlinjen). s: hur långt båten kört (skummet och flaggan), fart 0–1, hopp px uppåt.
function batRita(B, t, { x = 960, y = 760, s = 0, fart = 1, hopp = 0, f, p, fl = 1, blink = true }) {
  const gung = Math.sin(t * 2.2) * 5 * (0.4 + 0.6 * fart) - hopp, lut = Math.sin(t * 1.7) * 1.2;
  B.g.setAttribute('transform', `translate(${(x - BW / 2).toFixed(1)} ${(y - BH + gung).toFixed(1)}) rotate(${lut.toFixed(2)} ${BW / 2} ${BH - 20})`);
  const v = Math.sin(t * 6) * 10 * (0.5 + 0.5 * fart) * fl;   // fl > 1: fladdrar extra ("och flaggan med!")
  B.flagga.setAttribute('d', `M60 -170 Q0 ${-160 + v} -70 ${-130 + v * 0.6} Q0 ${-110 + v} 60 -90Z`);   // fladdrar bakåt, båten kör åt höger
  let d = ''; for (let x0 = 90 * BS; x0 <= 820 * BS; x0 += 15) d += `${d ? ' L' : 'M'}${x0.toFixed(0)} ${(BH - 8 + Math.sin(x0 / 30 + t * 4) * 3).toFixed(1)}`;
  B.vag.setAttribute('d', d); B.vag.setAttribute('stroke-dashoffset', (s * 0.85).toFixed(1)); B.vag.setAttribute('opacity', (0.25 + 0.6 * fart).toFixed(2));
  B.L.rita(B.fig, blink ? B.blinka(f, t) : f, p);   // inga rörelsestreck när hon vinkar (Sanna 2026-11-26)
}
// En punkt i båtens koordinater → scenens (utan gungningen, räcker för att sikta).
const batPunkt = (x, y, [lx, ly]) => [x - BW / 2 + lx, y - BH + ly];

// --- Orange kritsvep (013:s rodsvep i orange, utan sak: Sanna "kritsvep: krita, snabbt, ingen sak"), 1,6 s, klippet vid k 0,5 ---
// Ritas i <g id="ram"> (skärmens koordinater, utanför kameran). Kornet är 006:s eget (kopierat till 013).
const KORN = '/avsnitt/013-rod-brandbil/storyboard-v2/kritsvep-korn.png';
function orangesvep(k) {
  const ram = $('ram'); if (!ram) return;
  if (k <= 0 || k >= 1) { ram.innerHTML = ''; return; }
  // jämnare (Sanna 2026-11-26 "improve crayon transitions"): helt orange bara ett ögonblick runt klippet, ut med mjuk start och stopp
  const ut = k > 0.52, inne = k >= 0.48 && !ut, u = ut ? (k - 0.52) / 0.48 : Math.min(1, k / 0.48);
  const E = inne ? 2200 : lerp(-260, 2200, ut ? mjuk(u) : 1 - (1 - u) * (1 - u));
  const kant = []; for (let y = -120; y <= 1200; y += 40) kant.push([E + 30 * Math.sin(y * 0.013) + 14 * Math.sin(y * 0.07 + 1.3) + 6 * Math.sin(y * 0.31), y]);
  const yta = ut ? `M2400 -200 L${kant.map(p => p.join(' ')).join(' L')} L2400 1300Z` : `M-400 -200 L${kant.map(p => p.join(' ')).join(' L')} L-400 1300Z`;
  const drag = Array.from({ length: 11 }, (_, i) => { const x = i * 250 - 380 + 30 * Math.sin(i * 2.7), w = 46 + 20 * Math.abs(Math.sin(i * 1.9)),
    o = 0.22 + 0.12 * Math.abs(Math.sin(i * 3.1)), b = 24 * Math.sin(i * 1.3);
    return `<path d="M${x.toFixed(0)} -100 Q${(x + 160 + b).toFixed(0)} 540 ${(x + 320).toFixed(0)} 1180" stroke-width="${w.toFixed(0)}" opacity="${o.toFixed(2)}"/>`; }).join('');
  let h = `<defs>
    <pattern id="svep-korn" patternUnits="userSpaceOnUse" width="890" height="510" patternTransform="rotate(10) scale(1.45)"><image href="${KORN}" width="890" height="510"/></pattern>
    <mask id="svep-m" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><rect x="-500" y="-500" width="2920" height="2080" fill="url(#svep-korn)"/></mask>
    <filter id="svep-rand" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="31"/>
      <feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter>
    <clipPath id="svep-yta"><path d="${yta}"/></clipPath></defs>
    <g filter="url(#svep-rand)"><g clip-path="url(#svep-yta)">
      <rect x="-400" y="-200" width="2800" height="1500" fill="#FBF7EE"/><rect x="-400" y="-200" width="2800" height="1500" fill="${ORANGE}" opacity="0.3"/>
      <rect x="-400" y="-200" width="2800" height="1500" fill="${ORANGE}" mask="url(#svep-m)"/>
      <g fill="none" stroke="${ORANGE_M}" stroke-linecap="round" mask="url(#svep-m)">${drag}</g></g>
      ${!inne ? `<path d="${yta}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="70 9 26 7" opacity="0.6"/>` : ''}</g>`;
  if (!ut && !inne) { const y = 540 + 360 * Math.sin(u * Math.PI * 4), v = 28 + 8 * Math.cos(u * Math.PI * 4);   // kritan vid kanten, lugnt sicksack
    // en orange vaxkrita (som introts kritsvep), inte den röda ritkritan
    h += `<g transform="translate(${E.toFixed(0)} ${y.toFixed(0)}) rotate(${v.toFixed(1)}) scale(2.2)">
      <path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${ORANGE}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${ORANGE_M}"/></g>`; }
  ram.innerHTML = h;
}

// Plask: en ring på vattnet och fem droppar (w 0–1 under ca 0,7 s), s skala.
function plaskRita(x, y, w, s = 1) {
  const ring = `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})"><ellipse cx="${x}" cy="${y + 8}" rx="${(40 + 110 * w).toFixed(0)}" ry="${(10 + 24 * w).toFixed(0)}" fill="none" stroke="#fff" stroke-width="${(7 * (1 - w)).toFixed(1)}" opacity="${(0.9 * (1 - w)).toFixed(2)}"/>`;
  const dr = [-60, -30, 0, 30, 60].map((a, i) => { const r = (a - 90) * Math.PI / 180, L = 120 * w + 40 * Math.sin(i * 2.3) * w, g = 260 * w * w;
    return `<circle cx="${(x + L * Math.cos(r) * 1.4).toFixed(0)}" cy="${(y + L * Math.sin(r) + g).toFixed(0)}" r="${(12 * (1 - w) + 3).toFixed(1)}" fill="#fff" opacity="${(1 - w).toFixed(2)}"/>`; }).join('');
  return ring + dr + '</g>';
}

// En punkt (x, y) i elementet el:s egna koordinater, i gruppen g:s koordinater (t.ex. tassens spets på en riggarm).
const punkt = (g, el, x, y) => new DOMPoint(x, y).matrixTransform(g.getCTM().inverse().multiply(el.getCTM()));

// Skottlistan: [[avsnittstid, namn, kamera [cx, cy, z], fart 0–1, (tl, d) => [f, p] , extra], …]. Inom samma kamera blandas
// läget från förra skottets slut in över 0,45 s; ett kamerabyte är ett klipp.
function skott(S, E) {
  let i = 0; while (i + 1 < S.length && E >= S[i + 1][0]) i++;
  return { i, s: S[i], tl: E - S[i][0], d: (S[i + 1]?.[0] ?? Infinity) - S[i][0] };
}
