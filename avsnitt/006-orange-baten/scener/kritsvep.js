// 006:s enklare kritsvep (kopia av 003:s, Sanna 2026-11-05: "crayon transition overall is a bit cluttered maybe more simple"):
// ett lager breda, lugna drag i stället för två korsade, och ett mjukt svep bort i stället för smul. 003:s original är orört.
// Nytt kritsvep mellan scenerna. Läses in efter kit.js; sätter window.kritsvep(k, farg), samma signatur som kit.kritsvep.
// k 0→0,5: en krita färglägger bilden som ett barn, fram och tillbaka:
//   lager 1 sicksackar snett från vänster till höger, lager 2 går tillbaka från höger åt ett annat håll och täpper till gliporna.
//   Varje streck är lite vingligt, ljusare i ändarna och tyngre på mitten, med vaxkornet från våra egna kritväggar
//   (kritsvep-korn.png, ur bondgårdens gula vägg), så att papperet skymtar i strecken som på plattorna.
//   Kritan leder med en handledsrörelse och små ryck i vändningarna. Vid 0,5 täcker klottret hela bilden.
// k 0,5→0,8: klottret smular bort korn för korn från vänster till höger (brustroskel som vandrar), nya scenen syns igenom.
// farg = nya scenens väggfärg. Ljud: kritsvep.LJUD = k-värden där ett kort 'skrrrrt-kort' börjar (ett per kritdrag);
// scenen lägger dem själv, t.ex. kritsvep.LJUD.forEach((kk, i) => kit.ljud('skrrrrt-kort', t0 + kk * langd, { variant: i % 4 + 1 })).
(() => {
const { el, lerp, clamp, inUt, del } = kit;
const KORN = new URL('kritsvep-korn.png', document.currentScript.src).href;
const PAPPER = '#FBF7EE';

// samma slump varje gång (bilderna renderas en och en)
const slump = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
function blanda(hex, mot, k) {
  const a = parseInt(hex.slice(1), 16), b = parseInt(mot.slice(1), 16), c = i => Math.round(lerp((a >> i) & 255, (b >> i) & 255, k));
  return `rgb(${c(16)},${c(8)},${c(0)})`;
}

// Två lager. vinkel = strecken lutar så här mycket från lodrätt; steg = avstånd mellan strecken; fran/till = del av k.
const LAGER = [
  { vinkel: 18, steg: 150, fran: 0, till: 0.42, hit: 1, seed: 11 },
];
const UT = [0.43, 0.5];                                   // kritan lyfter och går ut till vänster
const SMUL = [0.5, 0.8];                                  // klottret smular bort

// sicksack i en vriden ram runt bildens mitt; varje drag är en egen bana med egen bredd och nyans
function bana(L) {
  const r = slump(L.seed), v = L.vinkel * Math.PI / 180, cs = Math.cos(v), sn = Math.sin(v);
  const W = 1920 * Math.abs(cs) + 1080 * Math.abs(sn);
  const ram = (X, Y) => [960 + X * cs - Y * sn, 540 + X * sn + Y * cs];
  const n = Math.ceil((W + 160) / L.steg);
  const P = Array.from({ length: n + 1 }, (_, j) => {
    const X = L.hit * (-(W / 2) - 80 + j * L.steg + (r() - 0.5) * 24);
    const Y = (j % 2 ? 1 : -1) * (540 / Math.abs(cs) - 10 + r() * 60);   // vändningarna i bildkanten, så att de syns
    return ram(X, Y);
  });
  return P.slice(1).map((b, j) => {
    const a = P[j], bula = (r() - 0.5) * 30, mx = (a[0] + b[0]) / 2 + bula * cs, my = (a[1] + b[1]) / 2 + bula * sn;
    return { d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`,
      w: 190 + r() * 30, ljus: (r() - 0.5) * 0.06, ner: j % 2 === 0 };
  });
}

let s;
function bygg() {
  const svg = kit.lager.overst.ownerSVGElement, defs = svg.querySelector('defs');
  const monster = (id, v) => `<pattern id="${id}" patternUnits="userSpaceOnUse" width="890" height="510" patternTransform="rotate(${v}) scale(1.45)">
      <image href="${KORN}" width="890" height="510"/></pattern>
    <mask id="${id}-mask" maskUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080">
      <rect x="-500" y="-500" width="2920" height="2080" fill="url(#${id})"/></mask>`;
  defs.insertAdjacentHTML('beforeend', `
    ${monster('nykorn-0', LAGER[0].vinkel - 8)}
    <linearGradient id="nysmul-ramp" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1920" y2="300">
      <stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <filter id="nysmul-f" filterUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="21" result="grov"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="22" result="fin"/>
      <feComposite in="grov" in2="fin" operator="arithmetic" k2="0.65" k3="0.35" result="brus"/>
      <feComposite in="SourceGraphic" in2="brus" operator="arithmetic" k2="0.82" k3="0.18" result="v"/>
      <feComponentTransfer in="v">
        <feFuncR class="tros" type="linear" slope="14" intercept="0"/><feFuncG class="tros" type="linear" slope="14" intercept="0"/>
        <feFuncB class="tros" type="linear" slope="14" intercept="0"/><feFuncA type="linear" slope="0" intercept="1"/>
      </feComponentTransfer>
    </filter>
    <filter id="nyrand" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2920" height="2080">
      <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="31" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="svepvax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <mask id="nysmul" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2320" height="1480">
      <rect x="-200" y="-200" width="2320" height="1480" fill="url(#nysmul-ramp)" filter="url(#nysmul-f)"/></mask>`);
  s = { tros: [...defs.querySelectorAll('#nysmul-f .tros')] };
  const yttre = el('g', { filter: 'url(#boil)' }, kit.lager.overst);
  s.g = el('g', { mask: 'url(#nysmul)' }, yttre);
  // botten: hel täckning sist i fyllningen, så att inga glipor blir kvar vid 0,5 (samma korn, så att den inte syns komma)
  s.botten = el('g', {}, s.g);
  el('rect', { x: -100, y: -100, width: 2120, height: 1280, fill: PAPPER }, s.botten);
  s.bottenFarg = el('rect', { x: -100, y: -100, width: 2120, height: 1280, mask: 'url(#nykorn-0-mask)' }, s.botten);
  // papperet under varje drag (det som skymtar i kornet), sedan färgen: hela draget ljusare, kärnan tyngre
  // trasiga kritkanter på alla drag (samma förskjutning för papperet och färgen, så att de följs åt)
  const rand = el('g', { filter: 'url(#nyrand)' }, s.g);
  const papper = el('g', {}, rand);
  const farg = LAGER.map((_, i) => el('g', { mask: `url(#nykorn-${i}-mask)` }, rand));
  const streck = (g, d, w, attrs = {}) => {
    const p = el('path', { d, fill: 'none', 'stroke-width': w.toFixed(1), 'stroke-linecap': 'round', ...attrs }, g);
    p.L = p.getTotalLength(); return p;
  };
  s.lager = LAGER.map((L, i) => bana(L).map(b => {
    const hel = streck(farg[i], b.d, b.w, { opacity: 0.88 });
    return { ...b, hel, L: hel.L, papper: streck(papper, b.d, b.w, { stroke: PAPPER }), karna: streck(farg[i], b.d, b.w * 0.8) };
  }));
  // kritan: samma orange vaxkrita som i kritan-ritar (färg, omslag, ränder och vaxkorn) på en ljus vaxbotten, så att himlen inte lyser igenom kornet
  s.krita = el('g', {}, yttre);
  const form = 'M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z';
  s.krita.innerHTML = `<path d="${form}" fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"/>
    <path d="${form}" fill="#FCD9B8"/>
    <g transform="rotate(-28)"><g filter="url(#svepvax)"><g transform="rotate(28)">
      <path d="${form}" fill="#F69646"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="#F9BA82"/>
      <path d="M-19 -92 Q0 -98 19 -92 M-19 -218 Q0 -224 19 -218" stroke="#D9732C" stroke-width="4" fill="none"/>
    </g></g></g>`;
}

// hur långt varje lager har kommit (i drag) vid k
const framsteg = (L, n, k) => inUt(del(L.fran, L.till, k)) * n;

function kritsvep(k, farg) {
  if (!s) bygg();
  const syns = k > 0 && k < SMUL[1];
  s.g.parentNode.style.display = syns ? '' : 'none';
  if (!syns) return;
  let spets = null;
  s.lager.forEach((drag, li) => {
    const p = framsteg(LAGER[li], drag.length, k);
    drag.forEach((b, j) => {
      const q = clamp(p - j), syns = q > 0;
      for (const e of [b.papper, b.hel, b.karna]) e.style.display = syns ? '' : 'none';
      if (!syns) return;
      b.papper.setAttribute('stroke-dasharray', `${q * b.L} ${b.L * 2}`);
      b.hel.setAttribute('stroke-dasharray', `${q * b.L} ${b.L * 2}`);
      b.hel.setAttribute('stroke', blanda(farg, '#ffffff', 0.05 + Math.max(0, b.ljus)));
      // kärnan: bara mitten av draget (15–85 %), där kritan trycker hårdast
      const m = Math.max(0, Math.min(q, 0.85) - 0.15) * b.L;
      b.karna.style.display = m > 0 ? '' : 'none';
      b.karna.setAttribute('stroke-dasharray', `0 ${0.15 * b.L} ${m} ${b.L * 2}`);
      b.karna.setAttribute('stroke', b.ljus < 0 ? blanda(farg, '#000000', -b.ljus) : farg);
      if (q < 1) spets = { b, q, li };
    });
    if (!spets && p >= drag.length && k < UT[0] && li === s.lager.length - 1) spets = { b: drag.at(-1), q: 1, li };
  });
  const bo = del(0.43, 0.49, k);
  s.botten.style.display = bo > 0 ? '' : 'none';
  s.botten.setAttribute('opacity', bo.toFixed(3));
  s.bottenFarg.setAttribute('fill', farg);

  // kritan: spetsen på draget som ritas, lutad åt det håll den drar, med ryck i vändningarna; lyfter ut i slutet
  const ritar = k < UT[1];
  s.krita.style.display = ritar ? '' : 'none';
  if (ritar) {
    let x, y, rot;
    if (spets && k < UT[0]) {
      const pt = spets.b.hel.getPointAtLength(spets.b.L * spets.q), ryck = Math.exp(-spets.q * 9);
      // spetsen hålls en bit in i bilden, så att kritan syns också när draget vänder vid överkanten
      x = pt.x + 14 * ryck; y = Math.min(1010, Math.max(300, pt.y)) - 10 * ryck;
      rot = 28 + (spets.b.ner ? 9 : -7) * Math.sin(Math.min(1, spets.q * 3) * Math.PI / 2) + 6 * ryck * (spets.b.ner ? -1 : 1);
    } else {
      const sista = s.lager.at(-1).at(-1), pt = sista.hel.getPointAtLength(sista.L), u = inUt(del(...UT, k));
      x = lerp(pt.x, -300, u); y = lerp(pt.y, -350, u); rot = 28 - 20 * u;
    }
    s.krita.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(2)}) scale(2.6)`);
  }

  // smulandet: allt där brus + ramp ligger under tröskeln c försvinner; c vandrar från vänster till höger
  const c = lerp(0.12, 1.02, inUt(del(...SMUL, k)));
  s.tros.forEach(f => f.setAttribute('intercept', (-14 * c + (k < SMUL[0] ? 100 : 0)).toFixed(3)));
}

// ljud: ett kort skrrrrt per kritdrag (fyra i lager 1, tre i lager 2), som k-värden
const tillK = (L, andel) => { let a = L.fran, b = L.till; for (let i = 0; i < 30; i++) { const m = (a + b) / 2; inUt(del(L.fran, L.till, m)) < andel ? a = m : b = m; } return a; };
kritsvep.LJUD = [0, 0.3, 0.6].map(q => tillK(LAGER[0], q)).map(k => +k.toFixed(3));
kritsvep.SMUL = SMUL;
window.kritsvep = kritsvep;
})();
