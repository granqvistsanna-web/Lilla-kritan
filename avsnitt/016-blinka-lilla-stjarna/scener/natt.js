// Nattkullen i avsnitt 016: himlen (månen, stjärnan, de små stjärnorna, molnet), filten, kudden, nallen, hunden (N.lage; var lejonet Lage till 2026-11-10) och
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
// N.korg.pose({ x, y, h, rot, synlig })  // korgen: standard på marken till vänster om nallen (kullen: Lage bär den upp)
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
  flaska: [A + 'rekvisita/vallingflaska/cut/vallingflaska-v1.png', [0, 0, 496, 857], [496, 857]],   // vällingflaskan (rekvisita/vallingflaska.md), egen kant
  korg: [A + 'rekvisita/korg/cut/korg-v3-natt.png', [118, 83, 903, 937], [1024, 1024]],   // v2-korgen (007) med hålet under handtaget urklippt, varmare färg och ny jämn tjock kant ("basket looks a bit jagged and old") (Sanna 2026-11-09: "carry everything in a basket")
  hundLigger: [A + 'karaktarer/hunden-hugo/premium/cut/hugo-ligger.png', [77, 281, 945, 841], [1024, 1024]],   // ritad liggbild (Flow 2026-11-10), ansiktet i kod
  nalle: [A + 'rekvisita/nalle/cut/nalle-v2-ljus-tunn.png', [39, 42, 809, 816], [848, 856]],   // tunnare kant (QA 2026-11-10: 11 px i stället för 21)
    // v2-nallen (007, Sanna 2026-11-09: "update nalle v2"), ansiktslös: ansiktet i kod
  nickeSover: [A + 'karaktarer/nyckelpigan-nicke/premium/cut/nicke-sover.png', [119, 226, 906, 815], [1024, 1024]],
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
const KORG_X = 392;   // korgens plats på kullen (till vänster om nallen, syns i helbilden; 418 → 392 så att nallen inte överlappar korgen)
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

// diamanten i stjärnans 823-ruta (ritad i kod): platt topp, krona i trekanter, spets nedåt; isblå fasetter, tunna vita fasettlinjer,
// vit klistermärkeskant och två små vita glanser. Ansiktet (stjarnAnsikte) hamnar mitt på den, som på stjärnan.
const DIAMANT_SVG = (() => {
  const T = [[211, 140], [411, 140], [611, 140]], G = [[51, 300], [231, 300], [411, 300], [591, 300], [771, 300]], P = [411, 770];
  const kontur = [T[0], T[2], G[4], P, G[0]];
  const bitar = [[G[0], T[0], G[1], '#E4F5FF'], [T[0], G[1], T[1], '#C6E8FA'], [G[1], T[1], G[2], '#EAF8FF'], [T[1], G[2], G[3], '#BFE3F7'],
    [T[1], G[3], T[2], '#E2F4FE'], [T[2], G[3], G[4], '#A9D7F1'],
    [G[0], G[1], P, '#CBEAFB'], [G[1], G[2], P, '#9FD0EE'], [G[2], G[3], P, '#D8F0FD'], [G[3], G[4], P, '#8FC6E8']];
  const pts = a => a.map(([x, y]) => `${x},${y}`).join(' ');
  return `<polygon points="${pts(kontur)}" fill="#fff" stroke="#fff" stroke-width="44" stroke-linejoin="round"/>` +
    bitar.map(([a, b, c, f]) => `<polygon points="${pts([a, b, c])}" fill="${f}" stroke="${f}" stroke-width="2" stroke-linejoin="round"/>`).join('') +
    `<path d="M${pts([T[0], T[2]])} M${G[0]} L${G[4]} M${T[0]} L${G[1]} L${T[1]} L${G[3]} L${T[2]} M${G[1]} L${P} M${G[2]} L${P} M${G[3]} L${P} M${T[1]} L${G[2]}"
      fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/>` +
    `<path d="${GLIMT_D}" transform="translate(205 205) scale(46)" fill="#fff"/><path d="${GLIMT_D}" transform="translate(640 560) scale(30)" fill="#fff"/>`;
})();

async function scen() {
  const M = await kit.manus();
  m = M.matt;
  // ingen överlappning (Sanna 2026-11-10: "try to avoid overlapping characters"): Nicke står och ligger lite längre åt höger,
  // fri från hunden och dess svans, fortfarande på filten och i tvåbilden
  m.NICKE_X = 850; m.LIGG_NICKE_X = 858;
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
  // QA 2026-11-10: gula klistermärken med halv opacitet blir grå mot natthimlen, så de små stjärnorna tindrar med storleken i stället
  N.sma = { lista: sma, pose: (f = () => 1) => sma.forEach((s, i) => { const [x, y, h] = m.SMA[i], v = clamp(f(i)), k = 0.25 + 0.75 * v;
    s.pose({ x, y: y - h * (1 - k) / 2, h: h * k, opacity: v > 0.03 ? 1 : 0 }); }) };

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
  const dans = dansPos.map(([x, y, h]) => { const s = sak(BILD.stjarna, himmel, { x, y, h, opacity: 0 }, { andel: 0.01 }); s.pos = [x, y, h]; s.ans = el('g', {}, s.g); return s; });
  // humor: ett ansikte som stora stjärnans (svansens dansscen, Sanna 2026-11-09: "a scene with dancing stars"); utan humor inget ansikte
  N.dans = { lista: dans, pose: (f = () => ({ opacity: 0 })) => dans.forEach((s, i) => {
    // opaciteten blir storlek (QA 2026-11-10: halvgenomskinliga gula stjärnor ser grå ut), så de poppar/krymper i stället för att tonas
    const q = f(i, s.pos) || {}, [x, y, h] = s.pos, o = clamp(q.opacity ?? 1), k = (q.k ?? 1) * (o < 1 ? mjuk(o) : 1);
    s.ans.innerHTML = q.humor && o > 0.01 ? stjarnAnsikte(q.humor, { m: q.m || 0, blink: q.blink || 0 }) : '';
    s.pose({ x: x + (q.dx || 0), y: y + (q.dy || 0) - h * (1 - k) / 2, h: Math.max(0.01, h * k), rot: q.rot || 0, opacity: k > 0.02 ? 1 : 0 });
  }) };
  N.dans.pose();

  // stjärnan: växer runt sin mitt, sken bakom. Ansiktet (Sanna 2026-11-07: "face for star") ritas i kod i bildens 823-ruta.
  const stjSken = sken(himmel, 'stjsken', m.GUL);
  const stj = sak(BILD.stjarna, el('g', {}, himmel), { x: sx, y: sy, h: sh }, { andel: 0.01 });
  const stjDiamant = el('g', {}, stj.g), stjAnsikte = el('g', {}, stj.g);
  stjDiamant.innerHTML = DIAMANT_SVG + `<clipPath id="diaklipp"><polygon points="211,140 611,140 771,300 411,770 51,300"/></clipPath>
    <g clip-path="url(#diaklipp)"><rect class="skimmer" x="-120" y="60" width="90" height="800" fill="#fff" opacity="0.75" transform="rotate(20 411 440)"/></g>`;
  const skimmer = stjDiamant.querySelector('.skimmer');
  N.stjarna = { ...stj, pose: (p = {}) => {
    stjAnsikte.style.display = p.ansikte === false ? 'none' : '';
    stjAnsikte.innerHTML = stjarnAnsikte(p.humor || 'glad', { titt: p.titt || 0, tittY: p.tittY || 0, blink: p.blink ?? autoBlink(2.9), m: p.m || 0 });
    // diamant (Sanna 2026-11-10: "a scene where [the star] morph to diamond on that lyric"): stjärnbilden krymper bort och diamanten
    // poppar fram på samma plats; ansiktet följer den som syns. p.stjK = stjärnbildens skala, p.diamant = diamantens skala (0 = borta)
    const sk = p.stjK ?? 1, dk = p.diamant ?? 0, om = (k, cx, cy) => `translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`;
    stj.inre.setAttribute('transform', om(sk, 411, 400)); stj.inre.style.display = sk > 0.01 ? '' : 'none';
    stjDiamant.setAttribute('transform', om(dk, 411, 440)); stjDiamant.style.display = dk > 0.01 ? '' : 'none';
    stjAnsikte.setAttribute('transform', om(Math.max(sk, dk), 411, 440));
    // glansen som sveper över fasetterna (p.skimmer 0 → 1 = vänster → höger; utanför 0..1 syns den inte)
    const sw = p.skimmer ?? -1; skimmer.style.display = sw > 0 && sw < 1 ? '' : 'none'; skimmer.setAttribute('x', (-120 + 960 * clamp(sw)).toFixed(0));
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
  N.korg = sak(BILD.korg, mark, { x: KORG_X, y: stig(KORG_X) + 8, h: 100 }, false);   // till vänster om nallen; v2 har kanten i bilden
  N.nalle = sak(BILD.nalle, mark, { x: m.FILT_X - 165 * fk, y: m.FILT_Y - 2, h: 95 });
  // vällingflaskan (Sanna 2026-11-10: "include bottle in picnic from start and only nicke drinks"): åker med i korgen, står sedan
  // i gräset till vänster om korgen. drack(k): vällingen sjunker (en ruta i glasfärgen växer nedåt från vällingens kant, y 410).
  // FLASKA_HEM = standardplatsen; FLASKA_NAPP = nappens topp i bilden (vridpunkt när Nicke dricker)
  const FLASKA_HEM = [KORG_X - 70, stig(KORG_X - 70) + 8]; N.flaska_hem = FLASKA_HEM; N.flaska_nicke = [m.LIGG_NICKE_X + 56, stig(m.LIGG_NICKE_X + 56) + 8];   // bredvid Nicke efter att hon druckit (vers 2, slutet)
  N.flaska = sak(BILD.flaska, mark, { x: FLASKA_HEM[0], y: FLASKA_HEM[1], h: 80 }, false);
  const flTom = el('rect', { x: 48, y: 410, width: 400, height: 0, rx: 18, fill: '#E0EEF1' }, N.flaska.inre);
  N.flaska.drack = k => flTom.setAttribute('height', (170 * clamp(k)).toFixed(1));
  // nallens ansikte i v2-stil (som 007:s nalleAnsikte, nalle-v2-ljus.png:s 848-ruta): ljus nosfläck med nos, ovala ögon med glans
  // och tunn ljus kant, rosa kinder, leende. Blinkar lugnt ibland av sig själv; blink 1 = sluten båge (sover med lejonet).
  // Ritas om i kit.kor efter varje render (natt-puts.js), så scenerna behöver inget.
  const nOgon = el('g', {}, N.nalle.g), NV = { ogon: [[352, 246], [498, 246]], kinder: [[306, 304], [544, 304]], nos: [425, 300], mun: [425, 338] };
  N.nalle.ogon = (blink = autoBlink(8.3)) => {
    const b = clamp(blink), [nx, ny] = NV.nos, [mx, my] = NV.mun;
    nOgon.innerHTML = `<ellipse cx="${nx}" cy="${ny + 14}" rx="70" ry="52" fill="#F1DFC1"/><ellipse cx="${nx}" cy="${ny}" rx="20" ry="14" fill="#3a1d12"/>`
      + `<path d="M${nx} ${ny + 12} L${nx} ${ny + 26}" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`
      + NV.kinder.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="28" ry="17" fill="#ec8f96" opacity=".8"/>`).join('')
      + NV.ogon.map(([x, y], i) => b > 0.85
        ? `<path d="M${x - 19} ${y} Q${x} ${y + 15} ${x + 19} ${y}" fill="none" stroke="#f3e6d6" stroke-width="12" stroke-linecap="round"/><path d="M${x - 19} ${y} Q${x} ${y + 15} ${x + 19} ${y}" fill="none" stroke="#140c08" stroke-width="7" stroke-linecap="round"/>`
        : `<g transform="translate(${x} ${y}) scale(${i ? 0.92 : 1} ${1 - 0.92 * b})"><ellipse rx="19" ry="26" fill="#140c08" stroke="#f3e6d6" stroke-width="3"/><circle cx="-6" cy="-10" r="7" fill="#fff"/></g>`).join('')
      + `<path d="M${mx - 22} ${my - 6} Q${mx - 11} ${my + 6} ${mx} ${my - 4} Q${mx + 11} ${my + 6} ${mx + 22} ${my - 6}" fill="none" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`;
  };
  N.nalle.ogon(0); N.nalle.ansikte = nOgon;

  N.lage = await lage(fig);
  N.nicke = await nicke(fig);
  N.kulle = kulle;
  // stigen: kullens kant flyttad STIG_DY ner (Sanna runda 5: "move blanket lower down on hill"); filten och figurerna står på den
  N.stig = stig;
  return N;
}

// ---------- v2-riggarna (art direction v2, Sanna 2026-11-09: "use v2 characters") ----------
// Riggen, ansiktet och poserna hämtas direkt ur figurens premium/uttryck.html (som produktion/youtube/shorts/godnatt/v2-rigg.js),
// så att avsnittet alltid har samma figur som karaktärsarket. Scenernas gamla API (humor, titt, armR, sitter, ligger, sover …) behålls.
async function v2rigg(mapp) {
  const bas = `${A}karaktarer/${mapp}/premium/`, rader = (await (await fetch(bas + 'uttryck.html')).text()).split('\n');
  const a = rader.findIndex(r => r.startsWith('const RIGG') || r.startsWith('const GOM')), r0 = rader.findIndex(r => r.startsWith('const ROR'));
  const b = rader.findIndex((r, i) => i > r0 && r.startsWith('};')) + 1;
  // verktyg/rigg-motor.js först: det gemensamma (blanda-hjälparna, steg, klappNy, standardrörelserna) står där, inte i uttryck.html
  const motor = rader.some(r => r.includes('rigg-motor.js')) ? await (await fetch(`${A}../verktyg/rigg-motor.js`)).text() : 'const mjuk = k => k * k * (3 - 2 * k);';   // Fia har kvar sin egen kod
  const kod = rader.slice(a, b).join('\n')
    .replaceAll('href="cut/', `href="${bas}cut/`)
    .replace(/^function figur\(x, y, skala\) \{/m, 'function figur(x, y, skala, parent) {')
    .replace("document.querySelectorAll('#figurer > g').length", `'${mapp}-' + Math.floor(Math.random() * 1e9)`)
    .replace("document.getElementById('figurer').appendChild(g);", 'parent.appendChild(g);');
  const skapaBlinka = () => f => f;   // natt.js blinkar själv (autoBlink)
  return new Function('skapaBlinka', `${motor}\n${kod}
    return { figur, rita, blanda, blandaPose, param, NEUTRAL, POSE0, RIGG, FOTTER, steg, ROR };`)(skapaBlinka);
}

// de gamla humörnamnen (ansikten.js) → v2-uttryck. blinkar = båda ögonen glada bågar (Sanna 2026-11-06: ingen blinkning med ett öga)
function v2ansikte(R, humor, { titt = 0, tittY = 0, blink = 0, m: mun = 0 } = {}) {
  const U = {
    glad: 'glad', skrattar: 'jatteglad', ropar: 'jatteglad', forvanad: 'forvanad', nyfiken: 'nyfiken',
    blinkar: { glad: [1, 1], kind: 1, le: 1.3, leBred: 1.1, oron: [-4, -4], armar: [16, 16] },
    njuter: { lock: [1, 1], kind: 1, le: 0.9, oron: [6, 6], luta: 2 },
    sleep: { lock: [1, 1], kind: 0.8, le: 0.5, leBred: 0.8, oron: [12, 12], strack: 0.98 },
    orolig: { ogonS: [1.06, 1.06], bryn: 1, brynY: [-4, -4], brynV: 22, kind: 0.5, streck: 0, mun: [7, 8, 0, 466], oron: [12, 12], armar: [2, 2] },
  };
  const f = R.param(U[humor] || 'glad');
  f.titt = [f.titt[0] + 11 * clamp(titt, -1, 1), f.titt[1] + 10 * clamp(tittY, -1, 1)];
  f.lock = f.lock.map(l => Math.max(l, clamp(blink)));
  if (f.lock[0] > 0.5) f.glad = [0, 0];
  if (mun > 0.05) { f.mun = [10 + 10 * mun, 9 + 12 * mun, 0, 462]; f.streck = 0; }
  return f;
}

// en v2-figur stående: fötterna i (x, y), höjd från öronen till fötterna = h px (samma storlek som v1-figuren)
async function v2figur(mapp, parent, h, topp) {
  const R = await v2rigg(mapp), sk = h / (R.FOTTER - topp);
  const g = el('g', {}, parent);
  const fig = R.figur(0, 0, sk, g);
  return { R, g, fig, sk };
}


// v2-riggens gång (steg() ur uttryck.html, variant B): benen kliver, kroppen gungar och lyfts, öronen följer med; med armar: true
// också riktningsposen och armarna som pendlar (Nicke), utan (Lage bär filten i högerhanden). gar = { t, amp 0–1, rikt −1…1, armar }
// Liv i vila (Sanna 2026-11-09 "polish all animations"): svansen svänger lugnt och öronen fladdrar lite, i sångtid.
function v2rorelse(R, q, p, fas) {
  const ts = kit.nu + kit.sang0;
  q.svans = (q.svans || 0) + 4 * Math.sin(ts * 2.1 + fas);
  const fl = 1.5 * Math.sin(ts * 1.7 + fas * 2);
  q.oron = [q.oron[0] + fl, q.oron[1] - fl];
  if (!p.gar || !(p.gar.amp > 0.001)) return q;
  const [, g] = R.steg(p.gar.t, p.gar.amp, p.gar.rikt);
  q.luta += g.luta; q.lyft = g.lyft;
  q.ben = q.ben.map((v, i) => v + g.ben[i]); q.benY = q.benY.map((v, i) => v + g.benY[i]);
  q.oron = q.oron.map((v, i) => v + g.oron[i]);
  if (p.gar.armar) { q.rikt = g.rikt; q.gang = g.gang; q.sving = g.sving; }
  return q;
}

// ---------- hunden (Sanna 2026-11-10: "change lion to dog"): hunden Hugos v2-rigg, både stående och liggande ----------
// N.lage heter kvar så (scenernas API), men är nu hunden. Liggande = den ritade liggbilden hugo-ligger.png (på magen som en limpa,
// tassarna under hakan, som lejonets), ansiktet i kod (liggAnsikte, HUND_LIGG).
const HUND_V2 = 'hunden-hugo', HUND_TOPP = 206;
// liggbildens ansikte (hugo-ligger.png, 1024-rutan): ögonen ovanför nosfläcken (mitt 343, 634), nosen överst på den, munnen under
const HUND_LIGG = { ogon: [[286, 548], [404, 544]], nos: [343, 598], mun: [343, 648], oga: 0.82 };
// det liggande ansiktet (från lejonets lejonLigger): ovala ögon med glans, lock som stängs till en båge, kinder, nos, leende, öppen mun
const LV = { linje: '#2a1d1a', mun: '#3a2a22', munFarg: '#7a2a1c', kind: '#ec8f96' };
function liggAnsikte(humor, { titt = 0, tittY = 0, blink = 0, m = 0 } = {}, Q = HUND_LIGG) {
  const sluten = humor === 'sleep' || humor === 'njuter', glad = humor === 'blinkar' || humor === 'skrattar' || humor === 'ropar';
  const orolig = humor === 'orolig', lock = sluten ? 1 : clamp(blink), dx = 6 * clamp(titt, -1, 1), dy = 5 * clamp(tittY, -1, 1);
  let s = Q.ogon.map(([x, y], i) => {
    let o = `<ellipse cx="${i ? 37 : -37}" cy="52" rx="26" ry="16" fill="${LV.kind}" opacity="${glad || sluten ? 0.95 : 0.75}"/>`;
    if (glad) o += `<path d="M-20 6 Q0 -18 20 6" fill="none" stroke="${LV.linje}" stroke-width="7" stroke-linecap="round"/>`;
    else if (lock > 0.85) o += `<path d="M-19 -2 Q0 14 19 -2" fill="none" stroke="${LV.linje}" stroke-width="6" stroke-linecap="round"/>`;
    else {
      const ly = -27 + lock * 42, w = 18 * Math.sqrt(Math.max(0, 1 - (ly / 26) ** 2));
      o += `<g transform="translate(${dx} ${dy})"><clipPath id="ll-${i}"><path d="M-40 ${ly} H${-w} Q0 ${ly + 8} ${w} ${ly} H40 V60 H-40Z"/></clipPath>
        <g clip-path="url(#ll-${i})"><ellipse rx="18" ry="26" fill="${LV.linje}"/><circle cx="-6" cy="-10" r="6" fill="#fff"/></g>
        ${lock > 0.02 ? `<path d="M${-w} ${ly} Q0 ${ly + 8} ${w} ${ly}" fill="none" stroke="${LV.linje}" stroke-width="6" stroke-linecap="round"/>` : ''}</g>`;
      if (orolig) o += `<path d="M-16 -46 Q0 -54 16 -46" transform="rotate(${i ? 18 : -18} 0 -48)" fill="none" stroke="${LV.linje}" stroke-width="6" stroke-linecap="round"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${Q.oga})">${o}</g>`;
  }).join('');
  const oppen = m > 0.05 || humor === 'skrattar' || humor === 'ropar' ? Math.max(m, 0.5) : orolig ? 0.25 : 0;
  const rx = 10 + 10 * oppen, ry = 8 + 12 * oppen, my = 14, h = ry * 4 / 3;
  if (Q.nos) s += `<g transform="translate(${Q.nos[0]} ${Q.nos[1]}) scale(${Q.oga})"><ellipse rx="22" ry="14" fill="#2a1d1a"/><ellipse cx="-7" cy="-5" rx="6" ry="3.5" fill="#fff" opacity="0.8"/></g>`;
  s += `<g transform="translate(${Q.mun[0]} ${Q.mun[1]}) scale(${Q.oga})"><g fill="none" stroke="${LV.mun}" stroke-width="6" stroke-linecap="round"><path d="M0 -21 L0 ${oppen ? my - h * 0.75 : 0}"/>
    ${oppen ? '' : '<path d="M-34 -3 Q-17 22 0 0 Q17 22 34 -3"/>'}</g>
    ${oppen ? `<path d="M${-rx} ${my} C${-rx} ${my - h} ${rx} ${my - h} ${rx} ${my} C${rx} ${my + h} ${-rx} ${my + h} ${-rx} ${my}Z" fill="${LV.munFarg}"/>` : ''}</g>`;
  return s;
}
async function lage(parent) {
  const V = await v2figur(HUND_V2, parent, 841 * m.LAGE_K, HUND_TOPP), { R } = V;
  const [px, py] = R.RIGG['arm-r'], VILA = 49.7, LANGD = 58;     // arm-r: vilriktning (grader i bilden) och avstånd till handens mitt
  // liggande: den ritade liggbilden (hugo-ligger.png, Sanna 2026-11-10 "gör en liggbild"), i samma skala per bildpixel som lejonets
  const ligg = sak(BILD.hundLigger, parent, { x: m.LIGG_LAGE_X, y: m.FILT_Y + 8, h: (841 - 281) * m.LAGE_K, synlig: false }, false);
  const lansikte = el('g', {}, ligg.g);
  const o = { st: V, ligg, fas: 1.3 };
  let senast = {};
  o.pose = (p = {}) => {
    senast = p;
    const vis = p.synlig !== false, blink = p.blink ?? autoBlink(o.fas), humor = p.humor || 'glad';
    V.g.style.display = vis && !p.ligger ? '' : 'none';
    V.g.setAttribute('opacity', p.opacity ?? 1);
    const andas = Math.sin(2 * Math.PI * ((kit.nu + kit.sang0) / 3.2 + 0.3)) * (p.andas ?? 1);
    const f = v2ansikte(R, humor, { ...p, blink });
    const q = R.blandaPose('neutral', 'sitter', clamp(p.ligger ? 0 : p.sitter || 0));
    f.armar = [f.armar[0] + (-(p.armL ?? -35) - 35), f.armar[1] + ((p.armR ?? 35) - 35)];
    q.bred += (p.sx ?? 1) - 1;
    q.strack += (p.sy ?? 1) - 1 + 0.008 * andas;
    if (p.ligger) {   // den ritade liggbilden (som lejonets), ansiktet i kod; riggen göms
      V.g.style.display = 'none';
      const la = Math.sin(2 * Math.PI * ((kit.nu + kit.sang0) / 3.6 + 0.3)) * (p.andas ?? 1);
      ligg.pose({ x: p.x ?? m.LIGG_LAGE_X, y: p.y ?? m.FILT_Y + 8, rot: p.tilt || 0, sx: (p.sx ?? 1) * (1 - 0.006 * la), sy: (p.sy ?? 1) * (1 + 0.018 * la), synlig: vis, opacity: p.opacity });
      lansikte.innerHTML = liggAnsikte(humor, { titt: p.titt || 0, tittY: p.tittY || 0, blink, m: p.m || 0 });
      return;
    } else {
      ligg.pose({ synlig: false });
      const x = p.x ?? m.LAGE_X, y = p.y ?? stig(x) + 14;
      V.g.setAttribute('transform', `translate(${x} ${y})`);
      q.luta += p.tilt || 0;
    }
    if (p.gar) f.titt = [f.titt[0] + 6 * Math.sign(p.gar.rikt) * p.gar.amp, f.titt[1]];
    R.rita(V.fig, f, v2rorelse(R, q, p, o.fas));
  };
  const tillBild = (e, [ax, ay]) => { const r = kit.lager.figurer.getCTM().inverse().multiply(e.getCTM()), q = new DOMPoint(ax, ay).matrixTransform(r); return [q.x, q.y]; };
  o.liggH = (841 - 281) * m.LAGE_K;   // liggbildens höjd i bild (t.ex. för vällingflaskan)
  o.punkt = pt => senast.ligger ? tillBild(ligg.g, pt) : tillBild(V.fig.querySelector('.figuren'), pt);
  // handen på högra armen vid armR (bygg.py-grader), i bild; armen vrids −lyft kring axeln
  o.hand = (armR = 35) => { const v = (VILA - (armR - 35 + 16)) * Math.PI / 180; return o.punkt([px + LANGD * Math.cos(v), py + LANGD * Math.sin(v)]); };
  // armR (bygg.py-grader) som pekar högra armen mot en punkt i bild (med senaste posen)
  o.pekVinkel = ([bx, by]) => {
    const e = V.fig.querySelector('.figuren'), r = e.getCTM().inverse().multiply(kit.lager.figurer.getCTM()), q = new DOMPoint(bx, by).matrixTransform(r);
    const mal = Math.atan2(q.y - py, q.x - px) * 180 / Math.PI;
    return VILA - mal - 16 + 35;     // lyft = vila − mål; glad har redan 16 i uttrycket
  };
  o.pose();
  return o;
}

// ---------- nyckelpigan Nicke: v2-riggen stående (nu med armar), v2-sovbilden (premium/cut/nicke-sover.png, slutna ögon inbakade) ----------
const NICKE_V2 = 'nyckelpigan-nicke', NICKE_TOPP = 90;
// v1-bildens ruta → v2-riggens ruta, så att scenernas gamla punkter (N.nicke.punkt) hamnar på samma ställe på figuren
const V1N = [170, 88, 849, 929], V2N = [162, 90, 853, 942];
async function nicke(parent) {
  const V = await v2figur(NICKE_V2, parent, (929 - 88) * m.NICKE_K, NICKE_TOPP), { R } = V;
  const sov = sak(BILD.nickeSover, parent, { x: m.LIGG_NICKE_X, y: m.FILT_Y + 8, h: (815 - 226) * m.NICKE_SOVER_K, synlig: false }, false);
  const o = { st: V, sov, fas: 5.7 };
  let senast = {};
  o.pose = (p = {}) => {
    senast = p;
    const vis = p.synlig !== false, andas = Math.sin(2 * Math.PI * ((kit.nu + kit.sang0) / (p.sover ? 3.6 : 2.8) + 0.71)) * (p.andas ?? 1);
    if (p.sover) {
      V.g.style.display = 'none';
      sov.pose({ x: p.x ?? m.LIGG_NICKE_X, y: p.y ?? m.FILT_Y + 8, rot: p.tilt || 0, sx: (p.sx ?? 1) * (1 - 0.006 * andas), sy: (p.sy ?? 1) * (1 + 0.018 * andas), synlig: vis, opacity: p.opacity });
      return;
    }
    sov.pose({ synlig: false });
    V.g.style.display = vis ? '' : 'none';
    V.g.setAttribute('opacity', p.opacity ?? 1);
    const x = p.x ?? m.NICKE_X, y = p.y ?? stig(x) + 12;
    V.g.setAttribute('transform', `translate(${x} ${y})`);
    const f = v2ansikte(R, p.humor || 'glad', { ...p, blink: p.blink ?? autoBlink(o.fas) });
    // haller 0–1: händerna på magen (posen 'magen'), t.ex. om kudden (kullen, Sanna 2026-11-10: "place pillow in nickes hands")
    const hal = clamp(p.haller || 0), q = R.blandaPose('neutral', 'magen', hal);
    if (hal) f.armar = f.armar.map(a => a * (1 - hal));
    q.luta += p.tilt || 0;
    q.bred += (p.sx ?? 1) - 1 - 0.008 * andas;
    q.strack += (p.sy ?? 1) - 1 + 0.015 * andas;
    if (p.gar) f.titt = [f.titt[0] + 6 * Math.sign(p.gar.rikt) * p.gar.amp, f.titt[1]];
    R.rita(V.fig, f, v2rorelse(R, q, { ...p, gar: p.gar && { armar: hal < 0.5, ...p.gar } }, o.fas));
  };
  const tillBild = (e, [ax, ay]) => { const r = kit.lager.figurer.getCTM().inverse().multiply(e.getCTM()), q = new DOMPoint(ax, ay).matrixTransform(r); return [q.x, q.y]; };
  const v1tillV2 = ([ax, ay]) => [V2N[0] + (ax - V1N[0]) * (V2N[2] - V2N[0]) / (V1N[2] - V1N[0]), V2N[1] + (ay - V1N[1]) * (V2N[3] - V2N[1]) / (V1N[3] - V1N[1])];
  o.punkt = pt => senast.sover ? tillBild(sov.g, pt) : tillBild(V.fig.querySelector('.figuren'), v1tillV2(pt));
  o.mun = () => tillBild(V.fig.querySelector('.figuren'), [510, 468]);   // munnen i v2-riggen (uttryck.html: ögonen y 400, kinderna y 458)
  o.pose();
  return o;
}

window.natt = { scen, BILD, stjarnAnsikte, get KAMERA() { return m.KAMERA; }, kulle: x => kulle(x), sak, GLIMT_D };
})();
