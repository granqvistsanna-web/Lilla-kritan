// Avsnitt 007: vattenrutschbanan på kolastranden (Sanna 2026-11-06: "lets build a rutschkana which bear rides with the teddy
// (no truck)", "a more large rutschkana like a waterslide", "end on rutsch in kolasås"). Delas av refrängen (refrang.js) och
// slutrefrängen (discot/16c). Läses in efter kit.js, ansikten.js och lastbilen.js.
//   const rb = await rutschbana.ny(L, { kronor: 2 })   kolahavet i L.plate, banan, Bulle och nallen och det främre våglagret i L.figurer,
//                                                     kolasåsen i lager.overst (rb.sas: undefined → egen grupp)
//   rb.syns(bool)                                     allt på stranden av/på (inte kolasåsen)
//   rb.stall(t, { x, y, tilt, sitter, humor, m, titt, tittY, armar, steg })   Bulle med nallen i famnen; x, y = fötterna
//   rb.ak(t, a, landa) → { x, y, tilt, sitter }        ett åk: rännan med jämn acceleration, sedan ut i en båge och PLASK vid landa
//   rb.flytNalle(t, { x, humor, m })                  nallen flyter i kolan bredvid Bulle (16d, slutet); rb.flytNalle(t, false) döljer
//   rb.vag(x, t, dyn)                                  havets våg vid x (px); rb.fram(t, dyn) ritar det främre våglagret
//   rb.krona(i, t, a, x, storlek)                       plaskkrona nummer i från tiden a (0,7 s)
//   rb.sasRita(t, t0)                                  kolasåsen väller in före t0 och rinner av efter t0
// opt.bara: bara banan och Bulle (refrängen har eget hav, våglager och egen kolasås); opt.havG: där palmerna läggs då
// Banan: assets/rekvisita/rutschkana/cut/vattenrutschbana.png (1200 × 896), åkvägen uppmätt längs rännans överkant.
(() => {
const { el, bild, mjuk, del, lerp, clamp, W, H, ROT } = kit;
const A = `${ROT}assets/`;
const KOLA = '#E8A63A', KOLA_LJUS = '#F6D89A', GRADDE = '#FFF4DC';
// Kompositionen (Sanna 2026-11-06: "bigger, more zoomed in", "rethink composition"): banan fyller högra två tredjedelarna, tornet
// högst upp till höger, utloppet och plasket i vänstra tredjedelen; Bulle stor; plattan bara himmel och kolahav (platt-hav-v2)
const SL = { fil: `${A}rekvisita/rutschkana/cut/vattenrutschbana.png`, s: 0.85, x: 336, y: 70 };
const SL_VAG = [[972, 232], [900, 252], [850, 266], [805, 293], [768, 340], [735, 405], [700, 470], [665, 513], [625, 535], [585, 532],
  [548, 513], [510, 492], [470, 482], [430, 488], [392, 507], [355, 545], [318, 598], [280, 648], [240, 688], [195, 713], [140, 732], [80, 750], [30, 766]];
const SL_STEGE = [[1080, 832], [1048, 250]];   // stegens fot och topp (fötterna)
const BULLE_H = 205, NALLE_H = 132, FLYT_H = 170, HAV_Y0 = 668;
const iSL = ([x, y]) => [SL.x + x * SL.s, SL.y + y * SL.s];
const lagg = (g, andel = 0.01) => window.kant ? kant.lagg(g, { andel }) : g;
const UPP = { r: [1500, -700], l: [-480, -700] }, UT = { r: [1400, 520], l: [-380, 520] };   // UT: armarna ut åt sidorna, i balans
const BLINK = Array.from({ length: 40 }, (_, i) => 1.3 + i * 2.9);
const DROPP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => 70 + 90 * Math.abs(Math.sin(i * 2.7)));
const SAS_IN = 0.75, SAS_UT = 0.6;

function kolakorn() {
  if (document.getElementById('kolakorn')) return;
  // kritkorn (Sanna 2026-11-06: mer textur): fläckigt vax, mörkare kolaströmmar och ljusa glansstreck, inte en platt yta
  document.querySelector('svg defs').insertAdjacentHTML('beforeend', `
    <filter id="kolakorn" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="4" result="f"/>
      <feColorMatrix in="f" type="matrix" values="0 0 0 0 0.72  0 0 0 0 0.42  0 0 0 0 0.12  -1.4 0 0 0 0.75" result="flack"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.004 0.06" numOctaves="2" seed="9" result="s"/>
      <feColorMatrix in="s" type="matrix" values="0 0 0 0 1  0 0 0 0 0.93  0 0 0 0 0.75  4 0 0 0 -2.55" result="vax"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" seed="2" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 6 -4.3" result="korn"/>
      <feMerge result="m"><feMergeNode in="flack"/><feMergeNode in="vax"/><feMergeNode in="korn"/></feMerge>
      <feComposite in="m" in2="SourceGraphic" operator="in" result="tex"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="tex"/></feMerge>
    </filter>`);
}

async function ny(L, opt = {}) {
  kolakorn();
  const rb = { HAV_X: opt.havX ?? 245, HAV_Y: HAV_Y0 + 52, HAV_Y0 };
  rb.hav = el('g', {}, opt.bara ? null : L.plate);
  if (!opt.bara) bild(`${A}bakgrunder/kolasashavet/platt-hav-v2.png`, rb.hav, { width: W, height: H, preserveAspectRatio: 'none' });
  // palmer (Sanna 2026-11-06: "more palm trees"): en liten ö med två palmer vid horisonten bakom rännan (djup), och en stor palm
  // i förgrunden till vänster som lutar in över bilden och ramar in den; foten står i kolan (det främre våglagret täcker den)
  const havG = opt.havG || rb.hav, PALM = `${A}bakgrunder/vagen-saker/palm.png`, palm = (x, fot, h, spegel = false, g = havG) => {
    const w = h * 742 / 1073, pg = el('g', { transform: `translate(${x} ${fot}) scale(${spegel ? -1 : 1} 1)` }, g);
    bild(PALM, pg, { x: -w / 2, y: -h, width: w, height: h });
    return pg;
  };
  {
    const ö = el('g', {}, havG);
    el('ellipse', { cx: 655, cy: 480, rx: 120, ry: 20, fill: '#F2D6A2', stroke: '#fff', 'stroke-width': 5 }, ö);
    palm(620, 482, 150, false, ö); palm(700, 484, 118, true, ö);
    rb.storPalm = palm(70, 700, 600, true);   // refrang.js döljer den i närbilden f (den skar över Bulles ansikte)
  }
  // banan, Bulle och nallen (bakom det främre våglagret, så att de sitter i kolan när de flyter)
  rb.strand = el('g', {}, L.figurer);
  bild(SL.fil, el('g', { transform: `translate(${SL.x} ${SL.y}) scale(${SL.s})` }, rb.strand), { width: 1200, height: 896 });
  const bulleF = rb.bulle = await lastbilen.bulle(el('g', {}, rb.strand), { h: BULLE_H, ben: true }, true);
  // nallen åker inte med (Sanna 2026-11-06: "remove teddy from refräng"); opt.nalle: true sätter tillbaka den
  const nalleG = opt.nalle ? el('g', {}, rb.strand) : null;
  let nAnsikte = null;
  if (nalleG) {
    const nInre = el('g', { transform: `scale(${NALLE_H / 898}) translate(-302 -898)` }, nalleG);
    bild(lastbilen.NALLE, nInre, { width: 605, height: 898 });
    lagg(nInre);
    nAnsikte = ansikten.bygg(nInre, lastbilen.NALLE_ANSIKTE);
  }
  // nallen som flyter i kolan bredvid Bulle (Sanna 2026-11-06: "make the teddy visible in the outro wave"): bakom det främre
  // våglagret, så högt att huvudet och överkroppen är över kolan; guppar med vågen. Dold tills rb.flytNalle anropas.
  const flytG = el('g', { style: 'display:none' }, rb.strand), flytInre = el('g', { transform: `scale(${FLYT_H / 898}) translate(-302 -898)` }, flytG);
  bild(lastbilen.NALLE, flytInre, { width: 605, height: 898 });
  lagg(flytInre);
  const flytAnsikte = ansikten.bygg(flytInre, lastbilen.NALLE_ANSIKTE);
  // rb.flytNalle(t, { x, humor, m }) visar och poserar den (varje bildruta); rb.flytNalle(t, false) döljer den.
  // Förval x: till vänster om Bulle (den fria sidan, han vinkar med höger), inom irisen i slutet. humor: t.ex. ur lastbilen.nalleUttryck (kisar ^ ^ på "Hej då").
  rb.flytNalle = (t, o = {}) => {
    flytG.style.display = o ? '' : 'none';
    if (!o) return;
    const x = o.x ?? rb.HAV_X - 118, sida = x < rb.HAV_X ? 1 : -1, liv = lastbilen.nalleLiv(t, 0.83);
    const y = HAV_Y0 + rb.vag(x, t) * 0.8 + 3 * Math.sin(t * 1.7 + 1) + 0.34 * FLYT_H;   // fötterna under ytan: två tredjedelar ovanför
    flytG.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(3 * Math.sin(t * 1.3) + 5 * sida * liv.titt).toFixed(2)}) scale(1 ${(1 + 0.018 * liv.andas).toFixed(4)})`);
    flytAnsikte.satt(o.humor || 'glad', { blink: o.humor === 'forvanad' ? 0 : liv.blink, titt: 0.9 * sida * liv.titt, m: o.m });   // tittar mot Bulle
  };
  // det främre våglagret och plaskkronorna
  rb.fg = el('g', {}, opt.bara ? null : L.figurer);
  const framVag = el('path', { fill: KOLA, stroke: GRADDE, 'stroke-width': 6, filter: 'url(#kolakorn)' }, rb.fg);
  const kronor = Array.from({ length: opt.kronor ?? 2 }, () => {
    const g = el('g', {}, rb.fg); bild(`${A}rekvisita/kolasas/cut/plask.png`, el('g', { transform: 'scale(0.36) translate(-520 -870)' }, g)); return g;
  });
  // kolasåsen: eget lager ovanpå lager.overst, i dukens koordinater (discot/ skalar lager.overst till 1920-rutan, och då täckte
  // såsen bara 3/4 av bilden, Sanna 2026-11-07)
  const sas = el('g', { filter: 'url(#boil)' }, opt.bara ? null : el('g', {}, kit.lager.overst.parentNode));
  const sasKorn = el('g', { filter: 'url(#kolakorn)' }, sas);
  sas.kropp = el('path', { fill: KOLA, stroke: '#fff', 'stroke-width': 9, 'stroke-linejoin': 'round' }, sasKorn);
  sas.strom = [0, 1, 2].map(i => el('path', { fill: 'none', stroke: '#C9822A', 'stroke-width': 26 + 10 * i, 'stroke-linecap': 'round', opacity: 0.35 }, sasKorn));
  sas.glans = [0, 1, 2].map(() => el('path', { fill: 'none', stroke: KOLA_LJUS, 'stroke-width': 14, 'stroke-linecap': 'round' }, sasKorn));
  sas.style.display = 'none';

  // åkvägen i bild med sträcka, för jämn fart längs rännan
  const vagPt = SL_VAG.map(iSL).filter(p => p[1] < 650), vagL = [0];   // rännans slut går ner i kolan: åket slutar vid ytan
  for (let i = 1; i < vagPt.length; i++) vagL.push(vagL[i - 1] + Math.hypot(vagPt[i][0] - vagPt[i - 1][0], vagPt[i][1] - vagPt[i - 1][1]));
  const langs = u => {
    const L0 = clamp(u) * vagL.at(-1); let i = 1; while (i < vagL.length - 1 && vagL[i] < L0) i++;
    const k = (L0 - vagL[i - 1]) / (vagL[i] - vagL[i - 1]), [a, b] = [vagPt[i - 1], vagPt[i]];
    return { x: lerp(a[0], b[0], k), y: lerp(a[1], b[1], k), lut: Math.atan2(a[1] - b[1], a[0] - b[0]) * 180 / Math.PI };
  };
  rb.TOPP = iSL([1000, 232]); rb.STEGE = SL_STEGE.map(iSL); rb.UPP = UPP;

  rb.syns = on => { for (const g of [rb.hav, rb.strand, rb.fg]) g.style.display = on ? '' : 'none'; if (!on) kronor.forEach(g => (g.style.display = 'none')); };
  // Bulle (med nallen i famnen om opt.nalle): sitter = benen fram (åt vänster), nallen framför magen
  rb.stall = (t, { x, y, tilt = 0, sitter = 0, humor = 'skrattar', m, titt = -0.6, tittY = 0, armar, steg = 0 }) => {
    const ben = sitter * 75, gang = steg * 18;
    bulleF.pose({ x, y: y + 95 * sitter, tilt, humor, m, titt, tittY, blink: kit.blink(t, BLINK), ...(armar || (nalleG ? { r: [640, 640], l: [380, 640] } : UT)),
      delar: { 'leg-l': ben + gang, 'leg-r': ben - gang } });
    const [nx, ny] = bulleF.punkt([470, 860 - 120 * sitter]);
    const liv = lastbilen.nalleLiv(t, 0.61);   // samma liv som på flaket; tittar upp mot Bulle
    if (nalleG) nalleG.setAttribute('transform', `translate(${nx.toFixed(1)} ${ny.toFixed(1)}) rotate(${(tilt + 3 * Math.sin(t * 1.6)).toFixed(2)}) scale(1 ${(1 + 0.018 * liv.andas).toFixed(4)})`);
    nAnsikte?.satt('glad', { blink: liv.blink, titt: 0.3 * liv.titt, tittY: -0.8 * liv.titt });
    rb.pos = [x, y];
  };
  // kameran (Sanna 2026-11-06: "a bigger more zoomed in version"): nära, banan fyller bilden och kameran följer Bulle lite
  // två lägen: HEL (hela banan och plasket, stilla) och TOPP (halvbild på Bulle högst upp på tornet)
  rb.HEL = [W / 2, H / 2, 1]; rb.TOPPBILD = [W, rb.TOPP[1] - 70, 1.45];   // hela tornet med taket, Bulle på högra tredjedelen, rännan till vänster (x klämms till plattans kant)
  // kameran efter en lista [[tid, läge], …]: varje byte glider mjukt på dur sekunder från tiden
  rb.kamera = (t, nycklar, dur = 0.9) => nycklar.slice(1).reduce((c, [a, k]) => {
    const q = kit.inUt(del(a, a + dur, t)); return c.map((v, i) => lerp(v, k[i], q));
  }, nycklar[0][1]);
  rb.ak = (t, a, landa) => {
    const ut = landa - 0.32, k = del(a, ut, t);
    if (t < ut) { const q = langs(0.15 * k + 0.85 * k * k); return { x: q.x, y: q.y, tilt: clamp(q.lut, -28, 28) * 0.8, sitter: 1 }; }
    const e = vagPt.at(-1), q = del(ut, landa, t);
    return { x: lerp(e[0], rb.HAV_X, q), y: lerp(e[1], rb.HAV_Y, q) - 90 * Math.sin(Math.PI * q), tilt: lerp(-10, 0, q), sitter: 1 - q };
  };
  rb.vag = (x, t, dyn = 1) => 9 * dyn * Math.sin(x / 110 - t * 1.1) + 4 * Math.sin(x / 47 + t * 1.6);   // #24: långsammare
  rb.fram = (t, dyn = 1) => {
    let d = `M-20 ${H + 20}`;
    for (let xx = -20; xx <= W + 20; xx += 16) d += ` L${xx} ${(HAV_Y0 + rb.vag(xx, t, dyn)).toFixed(1)}`;
    framVag.setAttribute('d', `${d} L${W + 20} ${H + 20} Z`);
  };
  rb.krona = (i, t, a, x = rb.HAV_X, st = 1.1) => {
    const k = del(a - 0.02, a + 0.7, t), g = kronor[i];
    if (k <= 0 || k >= 1) return;
    g.style.display = '';
    g.setAttribute('transform', `translate(${x} ${HAV_Y0 + 14}) rotate(-4) scale(${(st * Math.sin(Math.PI * Math.min(1, k * 1.3)) + 0.001).toFixed(3)})`);
  };
  rb.dolj = () => kronor.forEach(g => (g.style.display = 'none'));
  // Kolasåsövergången: tjock kolasås rinner ner över hela bilden med droppar i underkanten (in, före t0) och rinner av nedåt (ut)
  rb.sasRita = (t, t0) => {
    const inn = del(t0 - SAS_IN, t0, t), ut = del(t0, t0 + SAS_UT, t);
    if (inn <= 0 || ut >= 1) return (sas.style.display = 'none');
    sas.style.display = '';
    const botten = lerp(-160, H + 200, ut > 0 ? 1 : mjuk(inn)) + 260 * mjuk(ut), topp = ut > 0 ? lerp(-30, H + 60, mjuk(ut)) : -60;
    let d = `M-40 ${topp}`;
    for (let x = -40; x <= W + 40; x += 43) d += ` L${x} ${(topp + 16 * Math.sin(x / 70 + t * 4)).toFixed(1)}`;
    for (let i = 11; i >= 0; i--) {   // underkanten höger → vänster: en rund droppe per bit, som hängande kola
      const x = -40 + (i + 0.5) * (W + 80) / 12, b = botten + DROPP[i] * (1 - 0.5 * ut), r = 26 + 8 * Math.sin(i * 1.7);
      d += ` L${(x + 58).toFixed(0)} ${(botten + 10 * Math.sin(i)).toFixed(1)} Q${(x + r).toFixed(0)} ${(botten + 8).toFixed(1)} ${(x + r).toFixed(0)} ${(b - r).toFixed(1)}`
         + ` A${r.toFixed(0)} ${r.toFixed(0)} 0 0 1 ${(x - r).toFixed(0)} ${(b - r).toFixed(1)} Q${(x - r).toFixed(0)} ${(botten + 8).toFixed(1)} ${(x - 58).toFixed(0)} ${(botten + 10 * Math.sin(i + 1)).toFixed(1)}`;
    }
    sas.kropp.setAttribute('d', d + ' Z');
    sas.strom.forEach((g, i) => {
      const x = 230 + i * 450 + 60 * Math.sin(i * 1.9), y0 = topp + 40, y1 = Math.min(botten - 40, y0 + 900);
      let p = `M${x} ${y0}`; for (let y = y0; y <= y1; y += 50) p += ` L${(x + 45 * Math.sin(y / 140 + i * 2 + t * 1.5)).toFixed(1)} ${y}`;
      g.setAttribute('d', p); g.style.display = y1 - y0 > 80 ? '' : 'none';
    });
    sas.glans.forEach((g, i) => {
      const x = 260 + i * 420, y = lerp(topp, botten, 0.35 + 0.15 * i);
      g.setAttribute('d', `M${x} ${y.toFixed(1)} q60 -24 130 -6`);
      g.style.display = botten - topp > 160 ? '' : 'none';
    });
  };
  rb.SAS_IN = SAS_IN;
  return rb;
}

window.rutschbana = { ny, SL, iSL };
})();
