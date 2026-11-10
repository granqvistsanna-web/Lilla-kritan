// Grafikputs för Nattkullen (Sanna 2026-11-07: "improve graphics any way you can"). Laddas direkt efter natt.js och gör allt av sig själv:
// natt.scen() får de nya lagren, och kit.kor() kör putsen efter scenens egen render varje bildruta. Scenerna behöver inte ändras.
//  - djup i himlen: ett lager små kritprickar (avlägsna stjärnor) som tindrar svagt, var och en i sin egen takt; de små stjärnorna tindrar också lite
//  - skenen (månen, stjärnan) får kritkorn i stället för en slät gradient, och månen ett svagt sken hela tiden
//  - nattton: figurerna och sakerna på kullen blir lite svalare och mörkare, så att de sitter i natten
//  - gräs: några tuvor längs kullens kant som vajar lugnt; tre eldflugor som svävar sakta nere vid gräset
//  - premium (015:s recept, Sanna 2026-11-09): mjuka markskuggor under nallen och de liggande figurerna, en svag varm ton och en vinjett (högst 0,14)
//  - ett stjärnfall en gång, i vers 2:s lugna helbild (sångtid STJARNFALL), en liten stjärna utan streck och några glimtar efter
// Allt räknas i sångtid (kit.nu + kit.sang0), så skarvarna mellan scenerna passar.
(() => {
const { el, clamp, lerp, mjuk, W, H } = kit;
const STJARNFALL = window.STJARNFALL ?? 96.2;
// små ekon av stjärndansen vid frasslut i verserna (Sanna: "more dancing stars"): fem stjärnor nära stora stjärnan tänds på åttondelarna,
// gungar två slag och tonas ut, 2,6 s. Sångtid; inte i mellanspelet (57,5–84), som dansar själv, och inte samtidigt som stjärnfallet.
const EKO = window.EKO ?? [32.0, 44.2, 92.0, 104.0, 114.4], BEAT = 0.745;   // sångtid: vers 2, bild 18 (helbilden, kameran glider sakta in), inget annat rör sig i himlen då
let P = null;

function lagg(N) {
  const svg = N.L.plate.ownerSVGElement, defs = svg.querySelector('defs'), m = N.m;
  defs.insertAdjacentHTML('beforeend', `
    <filter id="kritsken" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="9" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.3" result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in"/>
    </filter>
    <filter id="markskugga" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>
    <radialGradient id="vinjett" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="#0B1026" stop-opacity="0"/><stop offset="1" stop-color="#0B1026" stop-opacity="0.14"/></radialGradient>
    <filter id="nattton" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0.93 0 0 0 0.01  0 0.94 0 0 0.015  0 0 0.97 0 0.04  0 0 0 1 0"/>
    </filter>`);
  // skenen: kritkorn
  svg.querySelectorAll('circle[fill^="url(#"]').forEach(c => c.setAttribute('filter', 'url(#kritsken)'));
  // nattton på kullen (filten, nallen, kudden och figurerna)
  N.mark.setAttribute('filter', 'url(#nattton)');
  N.fig.setAttribute('filter', 'url(#nattton)');
  // månens vaxiga ring (som solen i 015), svag
  const [mx, my, mh] = m.MAN;
  const ring = el('circle', { cx: mx, cy: my - mh / 2, r: mh * 0.75, fill: 'url(#mansken)', opacity: 0.16, filter: 'url(#kritsken)' }, N.himmel);
  N.himmel.insertBefore(ring, N.himmel.firstChild);
  // avlägsna stjärnor: kritprickar längst bak
  let fro = 77; const rnd = () => (fro = (fro * 16807) % 2147483647) / 2147483647;
  const prickG = el('g', {}, N.himmel); N.himmel.insertBefore(prickG, N.himmel.firstChild);
  const prickar = [];
  for (let n = 0; prickar.length < 40 && n < 3000; n++) {
    const x = 20 + rnd() * (W - 40), y = 15 + rnd() * 430;
    if (y > N.kulle(x) - 40 || Math.hypot(x - mx, y - my + mh / 2) < 120) continue;
    prickar.push({ c: el('circle', { cx: x.toFixed(0), cy: y.toFixed(0), r: (1.4 + rnd() * 1.8).toFixed(1), fill: '#F8F2DD' }, prickG), bas: 0.35 + rnd() * 0.4, fas: rnd() * 6.28, fart: 0.5 + rnd() * 1.2 });
  }
  // gräs: tuvor längs kullens kant (bakom filten)
  const grasG = el('g', { filter: 'url(#nattton)' }, N.L.figurer); N.L.figurer.insertBefore(grasG, N.mark);
  const tuvor = [70, 190, 330, 455, 960, 1080, 1210, 1320].map((x, i) => {
    const y = N.kulle(x) + 6, g = el('g', {}, grasG), inre = el('g', {}, g);
    g.setAttribute('transform', `translate(${x} ${y})`);
    const s = 0.8 + 0.4 * ((i * 37) % 10) / 10;
    inre.innerHTML = `<g transform="scale(${s})" filter="url(#boil)" stroke-linecap="round" fill="none">
      <path d="M-9 0 Q-12 -14 -16 -24" stroke="#4E6B4A" stroke-width="5"/><path d="M0 0 Q1 -18 -2 -32" stroke="#5E7C57" stroke-width="5"/>
      <path d="M8 0 Q12 -12 18 -20" stroke="#4E6B4A" stroke-width="5"/></g>`;
    return { inre, fas: i * 1.3 };
  });
  // eldflugor: tre varma prickar med ett litet sken, nere vid gräset till vänster och höger
  const flugor = [[120, 600], [1230, 560], [380, 640]].map(([x, y], i) => {
    const g = el('g', {}, N.L.figurer);
    el('circle', { r: 11, fill: '#FFE9A0', opacity: 0.35, filter: 'url(#kritsken)' }, g);
    el('circle', { r: 3.2, fill: '#FFF4C8' }, g);
    return { g, x, y, fas: i * 2.1 };
  });
  // stjärnfallet: en liten stjärnbild med vit kant och tre glimtar efter
  const fall = natt.sak(natt.BILD.stjarna, N.himmel, { x: 0, y: 0, h: 34, synlig: false }, { andel: 0.01 });
  const spar = [0, 1, 2].map(() => el('path', { d: natt.GLIMT_D, fill: '#FFF8D6', opacity: 0 }, N.himmel));
  // ekon av dansen i verserna
  // (de fem som syns i tvåbilden och helbilden: i tvåbildens himmel, närmast dess överkant mitt på; runda 5: tvåbilden ligger STIG_DY lägre)
  const [tx, ty, tw] = m.KAMERA.tva, topp = ty - tw * H / W / 2;
  const eko = N.dans.lista.map((d, i) => [i, d.pos]).filter(([, [x, y, h]]) => Math.abs(x - tx) < tw / 2 - 40 && y - h > topp + 10)
    .sort((a, b) => Math.hypot(a[1][0] - tx, a[1][1] - topp - 60) - Math.hypot(b[1][0] - tx, b[1][1] - topp - 60)).slice(0, 5)
    .sort((a, b) => a[1][0] - b[1][0]).map(([i]) => i);
  // markskuggor (015): mjuka mörkgröna ellipser på marken, lite åt höger; under nallen bakom den, under de liggande ovanpå filten
  const skugga = fore => { const e = el('ellipse', { fill: '#14240F', filter: 'url(#markskugga)' }); fore ? fore.before(e) : N.mark.appendChild(e); return e; };
  const skuggor = [[N.korg, skugga(N.korg.g), 0.4], [N.nalle, skugga(N.nalle.g), 0.42], [N.lage.ligg, skugga(), 0.45], [N.nicke.sov, skugga(), 0.42]];
  // riggarnas egen skugga (hård svart ellips) blir mjuk och mörkgrön som markskuggorna
  for (const f of [N.lage.st.fig, N.nicke.st.fig]) { const e = f.querySelector('.skugga'); e.setAttribute('fill', '#14240F'); e.setAttribute('filter', 'url(#markskugga)'); e.setAttribute('ry', 26); }
  // ton och vinjett över bilden (skärmen, följer inte kameran), under kornet
  const korn = N.L.overst.previousSibling, ton = el('g', { style: 'pointer-events:none' });
  svg.insertBefore(ton, korn);
  el('rect', { width: W, height: H, fill: '#FFC07A', opacity: 0.05, style: 'mix-blend-mode:soft-light' }, ton);
  el('rect', { width: W, height: H, fill: 'url(#vinjett)' }, ton);
  P = { N, prickar, tuvor, flugor, fall, spar, eko, skuggor };
}

function tick() {
  if (!P) return;
  P.N.nalle.ogon();
  P.skuggor.forEach(([sak, e, b]) => {   // följer sakens pose (x = mitt, y = underkant, h = höjd)
    const p = sak.p, syns = sak.g.style.display !== 'none' && (p.opacity ?? 1) > 0.01 && p.skugga !== false;   // skugga: false = i luften / i korgen
    e.style.display = syns ? '' : 'none';
    if (!syns) return;
    const rx = p.h * b * (p.sx ?? 1);
    e.setAttribute('cx', (p.x + 6).toFixed(1)); e.setAttribute('cy', (p.y - 2).toFixed(1));
    e.setAttribute('rx', rx.toFixed(1)); e.setAttribute('ry', (rx * 0.16).toFixed(1));
    e.setAttribute('opacity', (0.32 * (p.opacity ?? 1)).toFixed(3));
  });
  const ts = kit.nu + kit.sang0, { N } = P;
  P.prickar.forEach(p => p.c.setAttribute('opacity', (p.bas * (0.75 + 0.25 * Math.sin(ts * p.fart + p.fas))).toFixed(3)));
  N.sma.lista.forEach((s, i) => s.inre.setAttribute('opacity', (0.82 + 0.18 * Math.sin(ts * (0.7 + 0.13 * i) + i * 1.7)).toFixed(3)));
  P.tuvor.forEach(t => t.inre.setAttribute('transform', `rotate(${(3 * Math.sin(ts * 0.9 + t.fas)).toFixed(2)})`));
  P.flugor.forEach(f => {
    const x = f.x + 26 * Math.sin(ts * 0.31 + f.fas), y = f.y + 14 * Math.sin(ts * 0.47 + f.fas * 1.7);
    const ljus = 0.25 + 0.75 * mjuk(clamp(Math.sin(ts * 0.8 + f.fas) * 2));
    f.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`); f.g.setAttribute('opacity', ljus.toFixed(3));
  });
  const styr = N.dans.styr;   // [från, till] i sångtid: där styr scenen dansstjärnorna själv (vers-1:s himmelsbild, slutet)
  if ((ts < 57.5 || ts >= 84) && !(styr && ts >= styr[0] && ts < styr[1])) {
    const e = EKO.find(a => ts >= a && ts < a + 2.6), ord = new Map(P.eko.map((i, j) => [i, j]));
    N.dans.pose(i => {
      if (e === undefined || !ord.has(i)) return { opacity: 0 };
      const u = ts - e - ord.get(i) * BEAT / 2, ut = 1 - mjuk(clamp((ts - e - 2.0) / 0.6, 0, 1));
      if (u <= 0) return { opacity: 0 };
      const pop = 1 - Math.exp(-7 * u) * Math.cos(16 * u), vag = Math.sin(Math.PI * (ts - e) / BEAT + ord.get(i));
      return { opacity: Math.min(1, u / 0.08) * ut, k: pop * lerp(0.7, 1, ut), dy: -5 * vag, rot: 8 * vag };
    });
  }
  // stjärnfallet: 1,4 s från uppe till vänster ner mot mitten, tonas in och ut; glimtarna ligger kvar en stund där den har varit
  const k = (ts - STJARNFALL) / 1.4, A = [330, 175], B = [600, 285];
  const pos = q => [lerp(A[0], B[0], q), lerp(A[1], B[1], q) + 18 * Math.sin(q * Math.PI)];
  if (k > 0 && k < 1) { const [x, y] = pos(mjuk(k)); P.fall.pose({ x, y: y + 17, h: 34, rot: 200 * k, synlig: true, opacity: Math.min(1, k * 5, (1 - k) * 4) }); }
  else P.fall.pose({ synlig: false });
  P.spar.forEach((g, j) => {
    const q = 0.3 + 0.25 * j, d = ts - STJARNFALL - 1.4 * q, [x, y] = pos(mjuk(q)), op = d > 0 ? Math.max(0, 1 - d / 1.1) : 0;
    g.setAttribute('opacity', op.toFixed(3));
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(7 * (1 - 0.3 * j)).toFixed(2)})`);
  });
}

const scen0 = natt.scen;
natt.scen = async (...a) => { const N = await scen0(...a); lagg(N); return N; };
const kor0 = kit.kor;
kit.kor = (render, D, opt) => kor0(t => { render(t); tick(); }, D, opt);
})();
