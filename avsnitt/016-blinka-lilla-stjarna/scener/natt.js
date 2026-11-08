// Nattkullen i avsnitt 016: himlen (månen, stjärnan, de små stjärnorna, molnet), filten, kudden, nallen, lejonet Lage och
// nyckelpigan Nicke. Samma mått, skalor och placeringar som storyboard/bygg.py (lager/matt.json). Laddas efter kit.js, kant.js och ansikten.js:
//   <script src="../kit.js"></script><script src="../../../../verktyg/kant.js"></script><script src="../ansikten.js"></script><script src="../natt.js"></script>
//
// const M = await kit.manus(), m = M.matt;
// const N = await natt.scen();          // kit.duk med 16:9-plattan och allt nedan, i den ordningen bakifrån
// N.mane.pose({ sken })                 // sken 0..1: månen lyser upp (mjukt gulvitt sken bakom)
// N.stjarna.pose({ glans, k, synlig })  // glans 0..1: större (+12 %) och ljusare med sken; k = extra skala (tindra)
// N.glimt(i).pose({ x, y, r, rot, opacity })   // fyruddiga glimtar (i = 0..5), krämgula, i kritlagret
// N.sma.pose(t => 0..1 per stjärna)     // de små stjärnorna (opacity per stjärna; standard 1)
// N.moln.pose({ x, y, h, synlig })      // molnet (moln-2.png): x = mitt, y = underkant (standard STJ[1] + 30), h = höjd (135)
// N.filt.pose({ x, y, h, sx, rot })     // [mitt x, underkant y, höjd] som place() (standard: på kullens topp, 1,25 ×)
// N.kudde.pose({ x, y, h, rot, synlig }) · N.nalle.pose({ x, y, h, rot })     // som place(); standard som i bygg.py (kudden synlig bakom lejonets huvud)
// N.lage.pose({ x, y,                    fötterna (standard: LAGE_X på kullen, eller liggande på filten)
//               ligger,                  true = liggande bilden (ligger/lejonet-lage-ligger.png), samma skala
//               sitter,                  0..1: hukar ihop (sy 0,86 = storyboardens sittpose, tills den nya posen finns)
//               humor, titt, tittY, blink, m,   ansiktet (ansikten.js); blinkar själv var 3–4:e s om blink inte anges
//               armL, armR,              grader som i bygg.py (PIL): armR 35 / armL −35 = vila; N.lage.peka([x, y]) = armR mot en punkt i bild
//               tilt, sx, sy, synlig, opacity, andas })
// N.nicke.pose({ x, y, sover, humor, titt, tittY, blink, m, tilt, sx, sy, synlig, opacity, andas })
//               sover: true = sovbilden (slutna ögon inbakade), samma storlek som stående (NICKE_SOVER_K)
// N.lage.punkt([x, y]) / N.nicke.punkt([x, y])   en punkt i figurens 1024-ruta → bild (med senaste posen), t.ex. irisens mitt
// natt.kulle(x) = kullens kant (y) vid x. natt.KAMERA = matt.KAMERA. kit.utsnitt(natt.KAMERA.tva) osv.
// Figurerna snurrar och vänds aldrig (platta urklipp): bara lugna hopp, gung och lutning.
(() => {
const { el, bild, clamp, lerp, mjuk, ROT } = kit;
const A = `${ROT}assets/`, LAGER = new URL('lager/', document.currentScript.src).href;
const SAK = `${A}bakgrunder/nattkullen-saker/`;
// [fil, bbox, bildens storlek]
const BILD = {
  stjarna: [SAK + 'stjarna.png', [0, 0, 823, 797], [823, 797]],
  mane: [SAK + 'mane.png', [0, 0, 800, 867], [800, 867]],
  moln: [SAK + 'moln-2.png', [1, 1, 835, 465], [836, 466]],
  filt: [LAGER + 'filt-lila.png', [25, 327, 1005, 723], [1024, 1024]],
  kudde: [A + 'rekvisita/kudde/cut/kudde-v1.png', [0, 0, 859, 844], [859, 844]],
  nalle: [A + 'rekvisita/nalle/cut/nalle-framifran-v1.png', [0, 0, 623, 877], [623, 877]],
  lageLigger: [A + 'karaktarer/lejonet-lage/ligger/lejonet-lage-ligger.png', [144, 166, 935, 936], [1024, 1024]],
  nicke: [LAGER + 'nicke.png', [170, 88, 849, 929], [1024, 1024]],
  nickeSover: [A + 'karaktarer/nyckelpigan-nicke/cut/nyckelpigan-nicke-sover.png', [105, 214, 909, 806], [1024, 1024]],
};
const GLIMT_D = Array.from({ length: 8 }, (_, i) => { const v = Math.PI / 4 * i - Math.PI / 2, r = i % 2 ? 0.28 : 1; return `${i ? 'L' : 'M'}${(r * Math.cos(v)).toFixed(3)} ${(r * Math.sin(v)).toFixed(3)}`; }).join('') + 'Z';
let m, kulle, stig;

// en sak som place(): x = bboxens mitt, y = underkant, h = bboxens höjd i bild
function sak([fil, bb, [bw, bh]], parent, std = {}, kantOpt) {
  const g = el('g', {}, parent), inre = el('g', {}, g);
  bild(fil, inre, { width: bw, height: bh });
  if (kantOpt !== false) window.kant?.lagg(inre, kantOpt);
  const o = { g, inre, p: { ...std } };
  o.pose = (p = {}) => {
    p = o.p = { ...std, ...p };
    const s = p.h / (bb[3] - bb[1]);
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.rot || 0}) scale(${s * (p.sx ?? 1)} ${s * (p.sy ?? 1)}) translate(${-(bb[0] + bb[2]) / 2} ${-bb[3]})`);
  };
  o.pose();
  return o;
}

// mjukt sken: en radiell gradient
function sken(parent, id, farg) {
  const svg = parent.ownerSVGElement;
  svg.querySelector('defs').insertAdjacentHTML('beforeend', `<radialGradient id="${id}"><stop offset="0" stop-color="${farg}" stop-opacity="1"/>
    <stop offset=".45" stop-color="${farg}" stop-opacity=".45"/><stop offset="1" stop-color="${farg}" stop-opacity="0"/></radialGradient>`);
  return el('circle', { fill: `url(#${id})`, r: 0 }, parent);
}

// blinkning av sig själv: var 3–4:e s, 0,12 s, i sångtid (kit.nu är scentid; fasen per figur)
const BLINKAR = [0.4, 3.9, 7.1, 10.8, 14.2, 17.3];
const autoBlink = (fas) => { const t = ((kit.nu + kit.sang0 + fas) % 20 + 20) % 20; return BLINKAR.some(b => t >= b && t < b + 0.12) ? 1 : 0; };

// stjärnans ansikte i stjarna.png:s 823-ruta (mitt ca 411, 440), som i godnattsagan: mörka prickögon med en glans, rosa kinder,
// ett litet leende. humor: glad (prickögon), blinkar/skrattar (^ ^), sleep/njuter (slutna bågar); m 0..1 öppnar munnen lite.
// titt/tittY −1..1 flyttar prickarna; blink 0..1 kniper ihop dem.
const S_INK = '#2a1d14';
function stjarnAnsikte(humor, { titt = 0, tittY = 0, blink = 0, m = 0 } = {}) {
  const glada = humor === 'blinkar' || humor === 'skrattar' || humor === 'happy', sover = humor === 'sleep' || humor === 'njuter';
  const linje = d => `<path d="${d}" fill="none" stroke="${S_INK}" stroke-width="20" stroke-linecap="round"/>`;
  let s = [285, 537].map(x => `<ellipse cx="${x}" cy="488" rx="44" ry="26" fill="#F29AA2" opacity=".6"/>`).join('');
  for (const x of [330, 492]) {
    if (glada) s += linje(`M${x - 40} 430 Q${x} 370 ${x + 40} 430`);
    else if (sover) s += linje(`M${x - 40} 410 Q${x} 452 ${x + 40} 410`);
    else {
      const ex = x + clamp(titt, -1, 1) * 14, ey = 412 + clamp(tittY, -1, 1) * 12, ry = 40 * (1 - 0.92 * clamp(blink));
      s += `<ellipse cx="${ex}" cy="${ey}" rx="31" ry="${ry.toFixed(1)}" fill="${S_INK}"/>`;
      if (blink < 0.5) s += `<circle cx="${ex - 10}" cy="${ey - 14}" r="10" fill="#fff"/>`;
    }
  }
  s += m > 0.05 || humor === 'skrattar'
    ? `<path d="M371 488 Q411 ${500 + 60 * Math.max(m, 0.6)} 451 488 Q411 ${492 + 10 * m} 371 488Z" fill="#7a3324" stroke="${S_INK}" stroke-width="12" stroke-linejoin="round"/>`
    : linje('M376 490 Q411 525 446 490');
  return s;
}

async function scen() {
  const M = await kit.manus();
  m = M.matt;
  const [k0, k1, kx, kw] = m.KULLE;
  kulle = x => k0 + k1 * ((x - kx) / kw) ** 2;
  stig = x => kulle(x) + (m.STIG_DY || 0);
  const L = kit.duk('assets/bakgrunder/nattkullen/nattkullen-16x9.png');
  const N = { L, M, m };
  const himmel = el('g', {}, L.figurer), mark = el('g', {}, L.figurer), fig = el('g', {}, L.figurer), fram = el('g', {}, L.figurer);
  Object.assign(N, { himmel, mark, fig, fram });
  const [sx, sy, sh] = m.STJ, [mx, my, mh] = m.MAN;

  // månen med sitt sken
  const manSken = sken(himmel, 'mansken', '#F8F2DD');
  const mane = sak(BILD.mane, himmel, { x: mx, y: my, h: mh, rot: -8 }, { andel: 0.01 });
  N.mane = { ...mane, pose: (p = {}) => {
    const s = clamp(p.sken ?? 0);
    manSken.setAttribute('cx', mx); manSken.setAttribute('cy', my - mh / 2); manSken.setAttribute('r', 150 * (1 + 0.5 * s));
    manSken.setAttribute('opacity', (0.55 * s).toFixed(3));
    mane.pose({ ...p, sken: undefined });
  } };
  N.mane.pose();

  // de små stjärnorna
  const sma = m.SMA.map(([x, y, h]) => sak(BILD.stjarna, himmel, { x, y, h }, { andel: 0.01 }));
  N.sma = { lista: sma, pose: (f = () => 1) => sma.forEach((s, i) => s.pose({ opacity: clamp(f(i)) })) };

  // dansstjärnorna (mellanspelet, Sanna 2026-11-07): många små stjärnor som tänds en i taget. Dolda från början.
  // N.dans.lista[i].pos = [x, underkant y, höjd], sorterade från vänster till höger. N.dans.pose(i => ({ opacity, k, dx, dy, rot }))
  let fro = 16;
  const rnd = () => (fro = (fro * 16807) % 2147483647) / 2147483647;
  const dansPos = [];
  for (let n = 0; dansPos.length < 40 && n < 6000; n++) {
    const x = 40 + rnd() * (W - 80), y = 30 + rnd() * 380, h = 16 + rnd() * 18;
    if (Math.hypot(x - mx, y - my + mh / 2) < 170 || Math.hypot(x - sx, y - sy + sh / 2) < 130 || y > kulle(x) - 70) continue;
    if (dansPos.some(([a, b]) => Math.hypot(a - x, b - y) < 78) || m.SMA.some(([a, b]) => Math.hypot(a - x, b - y) < 70)) continue;
    dansPos.push([Math.round(x), Math.round(y), Math.round(h)]);
  }
  dansPos.sort((a, b) => a[0] - b[0]);
  const dans = dansPos.map(([x, y, h]) => { const s = sak(BILD.stjarna, himmel, { x, y, h, opacity: 0 }, { andel: 0.01 }); s.pos = [x, y, h]; return s; });
  N.dans = { lista: dans, pose: (f = () => ({ opacity: 0 })) => dans.forEach((s, i) => {
    const q = f(i, s.pos) || {}, [x, y, h] = s.pos, k = q.k ?? 1;
    s.pose({ x: x + (q.dx || 0), y: y + (q.dy || 0) - h * (1 - k) / 2, h: h * k, rot: q.rot || 0, opacity: clamp(q.opacity ?? 1) });
  }) };
  N.dans.pose();

  // stjärnan: växer runt sin mitt, sken bakom. Ansiktet (Sanna 2026-11-07: "face for star") ritas i kod i bildens 823-ruta.
  const stjSken = sken(himmel, 'stjsken', m.GUL);
  const stj = sak(BILD.stjarna, el('g', {}, himmel), { x: sx, y: sy, h: sh }, { andel: 0.01 });
  const stjAnsikte = el('g', {}, stj.g);
  N.stjarna = { ...stj, pose: (p = {}) => {
    stjAnsikte.style.display = p.ansikte === false ? 'none' : '';
    stjAnsikte.innerHTML = stjarnAnsikte(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink ?? autoBlink(2.9), m: p.m || 0 });
    const g = clamp(p.glans ?? 0), k = (1 + 0.12 * g) * (p.k ?? 1), cy = sy - sh / 2;
    stjSken.style.display = stj.g.style.display = p.synlig === false ? 'none' : '';
    stjSken.setAttribute('cx', sx); stjSken.setAttribute('cy', cy);
    stjSken.setAttribute('r', (110 * (0.8 + 0.4 * g) * (p.k ?? 1)).toFixed(1));
    stjSken.setAttribute('opacity', (g > 0 ? 0.35 + 0.25 * g : 0.2).toFixed(3));
    stj.pose({ x: sx, y: cy + sh * k / 2, h: sh * k, rot: p.rot || 0, synlig: p.synlig });
  }, mitt: () => [sx, sy - sh / 2] };
  N.stjarna.pose();

  // glimtarna (ritade i kod, krämgula, vit kant)
  const glimtar = Array.from({ length: 6 }, () => {
    const g = el('g', {}, himmel), p = el('path', { d: GLIMT_D, fill: '#FFF8D6' }, el('g', {}, g));
    window.kant?.lagg(p.parentNode, { andel: 0.01 });
    const o = { g, pose: ({ x = 0, y = 0, r = 20, rot = 0, opacity = 1 } = {}) => {
      g.style.display = opacity > 0.001 && r > 0.1 ? '' : 'none';
      g.setAttribute('opacity', opacity.toFixed(3));
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${r.toFixed(2)})`);
    } };
    o.pose({ opacity: 0 });
    return o;
  });
  N.glimt = i => glimtar[i];

  // molnet (framför stjärnan)
  N.moln = sak(BILD.moln, himmel, { x: -300, y: sy + 30, h: 135, synlig: false }, { andel: 0.01 });

  // filten, nallen, kudden på kullens topp
  const fk = m.FILT_K;
  N.filt = sak(BILD.filt, mark, { x: m.FILT_X, y: m.FILT_Y + 16 * fk, h: 120 * fk });
  N.kudde = sak(BILD.kudde, mark, { x: m.LIGG_LAGE_X - 85, y: m.FILT_Y - 4, h: 80 });   // synlig som standard; kritan-ritar och kullen döljer den med synlig: false
  N.nalle = sak(BILD.nalle, mark, { x: m.FILT_X - 165 * fk, y: m.FILT_Y - 2, h: 95 });
  // nallens ögon (Sanna 2026-11-07: "add eyes to teddy"): två mörka prickar med en liten glans, ovanför nosen i bildens 623-ruta;
  // blinkar lugnt ibland av sig själv. Ritas om i kit.kor efter varje render (natt.nalleOgon), så scenerna behöver inget.
  const nOgon = el('g', {}, N.nalle.g);
  N.nalle.ogon = (blink = autoBlink(8.3)) => {
    const ry = 25 * (1 - 0.9 * clamp(blink));
    nOgon.innerHTML = [250, 398].map(x => `<ellipse cx="${x}" cy="188" rx="22" ry="${ry.toFixed(1)}" fill="#0d0908" stroke="#F3E3C8" stroke-opacity=".55" stroke-width="5"/>` +
      (blink < 0.5 ? `<circle cx="${x - 7}" cy="178" r="8" fill="#fff"/>` : '')).join('');
  };
  N.nalle.ogon(0);

  N.lage = await lage(fig);
  N.nicke = nicke(fig);
  N.kulle = kulle;
  // stigen: kullens kant flyttad STIG_DY ner (Sanna runda 5: "move blanket lower down on hill"); filten och figurerna står på den
  N.stig = stig;
  return N;
}

// ---------- lejonet Lage: riggen stående (kit.figur, ritade armar), bilden liggande ----------
const PIV = { 'arm-r': [734, 590], 'arm-l': [290, 590] }, SPETS = { 'arm-r': [734, 795], 'arm-l': [290, 795] };
async function lage(parent) {
  const f = await kit.figur('lejonet-lage', { forelder: parent, h: 841 * m.LAGE_K });
  const a = ansikten.iFigur(f);
  const ligg = sak(BILD.lageLigger, parent, { x: m.LIGG_LAGE_X, y: m.FILT_Y + 8, h: (936 - 166) * m.LAGE_K, synlig: false });
  const la = ansikten.bygg(ligg.g, {});   // ansiktet i bildens 1024-ruta, utanför den inre gruppen (som har kanten)
  const LA = m.LAGE_LIGG_ANS;
  const o = { f, a, ligg, fas: 1.3 };
  let senast = {};
  o.pose = (p = {}) => {
    senast = p;
    const ligger = !!p.ligger, blink = p.blink ?? autoBlink(o.fas);
    const humor = p.humor || 'glad', opt = { titt: p.titt || 0, tittY: p.tittY || 0, blink, m: p.m || undefined };
    if (!opt.m) delete opt.m;
    const vis = p.synlig !== false;
    if (ligger) {
      f.pose({ synlig: false });
      const andas = Math.sin(2 * Math.PI * ((kit.nu + kit.sang0) / 3.6 + 0.3)) * (p.andas ?? 1);
      ligg.pose({ x: p.x ?? m.LIGG_LAGE_X, y: p.y ?? m.FILT_Y + 8, rot: p.tilt || 0, sx: (p.sx ?? 1) * (1 - 0.006 * andas), sy: (p.sy ?? 1) * (1 + 0.018 * andas), synlig: vis, opacity: p.opacity });
      la.satt(humor, { ...opt, ogon: LA.ogon, ogonSkala: 1.1, mun: LA.mun, munSkala: LA.munskala * 1.2 });
      return;
    }
    ligg.pose({ synlig: false });
    const x = p.x ?? m.LAGE_X, sy = (p.sy ?? 1) * lerp(1, 0.86, clamp(p.sitter || 0));
    const armR = p.armR ?? 35, armL = p.armL ?? -35;
    f.pose({ x, y: p.y ?? stig(x) + 14, tilt: p.tilt || 0, sx: p.sx ?? 1, sy, synlig: vis, opacity: p.opacity, andas: p.andas,
      delar: { 'arm-r': -armR, 'arm-l': -armL, ...(p.delar || {}) } });
    a.satt(humor, { ...opt, ogonSkala: 1.1, munSkala: 1.45 });
  };
  // armR i bygg.py-grader mot en punkt i bild (med senaste posen): vinkel_mot() i bygg.py
  o.pekVinkel = ([bx, by], arm = 'arm-r') => {
    const inv = f.g.getCTM().inverse().multiply(kit.lager.figurer.getCTM()), q = new DOMPoint(bx, by).matrixTransform(inv);
    const [px, py] = PIV[arm], [sx, sy] = SPETS[arm];
    return (Math.atan2(py - q.y, q.x - px) - Math.atan2(py - sy, sx - px)) * 180 / Math.PI;
  };
  o.punkt = pt => senast.ligger ? ligg.punkt(pt) : f.punkt(pt);
  ligg.punkt = ([ax, ay]) => { const r = kit.lager.figurer.getCTM().inverse().multiply(ligg.g.getCTM()), q = new DOMPoint(ax, ay).matrixTransform(r); return [q.x, q.y]; };
  o.pose();
  return o;
}

// ---------- nyckelpigan Nicke: stående bild (med huvudet), sovbilden ----------
function nicke(parent) {
  const st = sak(BILD.nicke, parent, { x: m.NICKE_X, y: 0, h: (929 - 88) * m.NICKE_K });
  const NA = m.NICKE_ANS, a = ansikten.bygg(st.g, {});
  const sov = sak(BILD.nickeSover, parent, { x: m.LIGG_NICKE_X, y: m.FILT_Y + 8, h: (806 - 214) * m.NICKE_SOVER_K, synlig: false });
  const o = { st, sov, a, fas: 5.7 };
  let senast = {};
  o.pose = (p = {}) => {
    senast = p;
    const vis = p.synlig !== false, andas = Math.sin(2 * Math.PI * ((kit.nu + kit.sang0) / (p.sover ? 3.6 : 2.8) + 0.71)) * (p.andas ?? 1);
    if (p.sover) {
      st.pose({ synlig: false });
      sov.pose({ x: p.x ?? m.LIGG_NICKE_X, y: p.y ?? m.FILT_Y + 8, rot: p.tilt || 0, sx: (p.sx ?? 1) * (1 - 0.006 * andas), sy: (p.sy ?? 1) * (1 + 0.018 * andas), synlig: vis, opacity: p.opacity });
      return;
    }
    sov.pose({ synlig: false });
    const x = p.x ?? m.NICKE_X;
    st.pose({ x, y: p.y ?? stig(x) + 12, rot: p.tilt || 0, sx: (p.sx ?? 1) * (1 - 0.008 * andas), sy: (p.sy ?? 1) * (1 + 0.015 * andas), synlig: vis, opacity: p.opacity });
    const opt = { ogon: NA.ogon, ogonSkala: 1.2, mun: NA.mun, munSkala: NA.munskala * 1.5, titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink ?? autoBlink(o.fas) };
    if (p.m) opt.m = p.m;
    a.satt(p.humor || 'glad', opt);
  };
  const punkt = s => ([ax, ay]) => { const r = kit.lager.figurer.getCTM().inverse().multiply(s.g.getCTM()), q = new DOMPoint(ax, ay).matrixTransform(r); return [q.x, q.y]; };
  o.punkt = pt => (senast.sover ? punkt(sov) : punkt(st))(pt);
  o.pose();
  return o;
}

window.natt = { scen, BILD, stjarnAnsikte, get KAMERA() { return m.KAMERA; }, kulle: x => kulle(x), sak, GLIMT_D };
})();
