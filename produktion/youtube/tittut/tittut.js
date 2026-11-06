// Tittut: motorn för serien (format/tittut.md). En figur gömmer sig bakom tre saker på en plats, tre varv: "Borta!", paus med
// en retning (öronen tittar fram och dyker ner), "Tittut!". Ca 2,5 min, för ettåringar: lugnt, tydligt hej och hej då.
// Bygger på scener/kit.js (figuren med kodansikte, kameran, render-krokarna) och verktyg/kant.js. En film är en index.html:
//   <script src="../../scener/kit.js"></script><script src="../../../../../verktyg/kant.js"></script>
//   <script src="../../tittut.js"></script>
//   <script>tittut({ plats: 'skogen', figur: 'kaninen-kanel', ljud: 'fniss', hojd: 450, saker: {...}, rundor: [...] })</script>
// Allt i data är i 1920 × 1080 (formatets mått); kit-duken är 1376 × 768, så världen skalas med S.
// Förhandsvisning: python3 -m http.server 8765 i repots rot, sedan http://127.0.0.1:8765/<mapp>/
// Rendering: node avsnitt/004-bussen-badar/scener/render.mjs <mapp>          -> <mapp>/<namn>.mp4
//            node avsnitt/004-bussen-badar/scener/render.mjs <mapp> 5 12 30  -> stillbilder
(() => {
const { el, clamp, lerp, del, inUt, mjuk, over, ut: utE } = kit;
const S = kit.W / 1920;
const ROST = 'assets/ljud/roster/tittut', GISSA = 'assets/ljud/roster', VARIANTER = 5;
// djuret som det sägs (CLAUDE.md: aldrig figurens namn): filerna heter <djur>-hej, <djur>-var och <djur>-hejda
const DJUR = { 'kaninen-kanel': 'kanin', 'lammet-ludde': 'lamm', 'kon-kajsa': 'ko', 'leoparden-lova': 'leopard', 'lejonet-lage': 'lejon' };
const DJUR_ORD = { kanin: 'kaninen', lamm: 'lammet', ko: 'kon', leopard: 'leoparden', lejon: 'lejonet' };
const PLATSLJUD = { skogen: 'skogsljud/skogsljud-1', 'skogen-2': 'skogsljud/skogsljud-1', bondgarden: 'gardsljud/gardsljud-1',
  lekplatsen: 'lekplatsljud/lekplatsljud-1', hemma: 'hemmaljud/hemmaljud-1' };
const PRASSEL = { buske: 'prassel-buske', lovhog: 'prassel-lov', hostack: 'prassel-ho', gardin: 'prassel-tyg', tacke: 'prassel-tyg' };
const BAD = 'assets/ljud/musik/tittut-bad.m4a';   // Suno-slingan, gemensam för alla filmer (saknas än: blir tyst)
const KRITA = 'M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z';
const ANDAS = 0.45;   // luft mellan två repliker (s); ettåringar behöver tid

// en m4a-fils längd ur mvhd-boxen (som gissa.js), eller reserv om filen saknas
const langd = async (fil, reserv) => {
  if (!fil) return reserv;
  const r = await fetch('/' + fil).catch(() => null); if (!r?.ok) return reserv;
  const b = new DataView(await r.arrayBuffer());
  for (let i = 0; i < b.byteLength - 32; i++) if (b.getUint32(i) === 0x6d766864) {
    const v1 = b.getUint8(i + 4) === 1, o = i + (v1 ? 24 : 16);
    return (v1 ? Number(b.getBigUint64(o + 4)) : b.getUint32(o + 4)) / b.getUint32(o);
  }
  return reserv;
};
const finns = async fil => !!fil && (await fetch('/' + fil, { method: 'HEAD' }).catch(() => ({}))).ok;

// sakens synliga del (alfa): rutan och överkanten (konturen) i bildens px, så att masken kan följa sakens form
const alfaRuta = src => new Promise(ok => {
  const i = new Image();
  i.onload = () => {
    const c = document.createElement('canvas'); c.width = i.width; c.height = i.height;
    const x = c.getContext('2d'); x.drawImage(i, 0, 0);
    const d = x.getImageData(0, 0, i.width, i.height).data, a = (xx, y) => d[(y * i.width + xx) * 4 + 3] > 40;
    let x0 = i.width, y0 = i.height, x1 = 0, y1 = 0;
    for (let y = 0; y < i.height; y += 2) for (let xx = 0; xx < i.width; xx += 2) if (a(xx, y)) {
      x0 = Math.min(x0, xx); x1 = Math.max(x1, xx); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
    // överkanten var 6:e px, men bara där saken når ner mot marken (nedersta tredjedelen). Kolumner som inte gör det
    // (en trädkrona) döljer inget, så figuren syns bredvid stammen.
    const topp = [], mark = y1 - 0.3 * (y1 - y0);
    let fx0 = x1, fx1 = x0;
    for (let xx = x0; xx <= x1; xx += 6) {
      let yb = y1; while (yb > y0 && !a(xx, yb)) yb--;
      if (yb < mark) { topp.push([xx, y1]); continue; }
      let y = y0; while (y < y1 && !a(xx, y)) y++;
      topp.push([xx, y]); fx0 = Math.min(fx0, xx); fx1 = Math.max(fx1, xx);
    }
    ok({ w: i.width, h: i.height, x0, y0, x1, y1, fx0, fx1, topp });
  };
  i.onerror = () => ok(null);
  i.src = src;
});

async function tittut(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const mapp = decodeURIComponent(location.pathname).replace(/^\//, '').replace(/index\.html$/, '');
  const djur = DJUR[g.figur], djurOrd = DJUR_ORD[djur] ?? 'kompisen';
  const H = g.hojd ?? 450;   // figurens höjd i bild (med öronen)

  // ---------- duken: platsen, världen i 1920-mått, figuren bakom sakerna när den gömmer sig ----------
  const lager = kit.duk(g.plats);
  const varld = el('g', { transform: `scale(${S})` }, lager.figurer);
  const figurG = el('g', {}, varld);
  const sakerG = el('g', {}, varld);
  const kritaG = el('g', {}, varld);
  const defs = lager.plate.ownerSVGElement.querySelector('defs');
  const klipp = el('path', { 'clip-rule': 'evenodd' }, el('clipPath', { id: 'tittut-klipp', clipPathUnits: 'userSpaceOnUse' }, defs));
  const fig = await kit.figur(g.figur, { h: H, forelder: figurG });
  const figB = (fig.F.bbox[2] - fig.F.bbox[0]) * H / (fig.F.bbox[3] - fig.F.bbox[1]);   // figurens bredd i bild

  // sakerna: [x, y] = fotpunkten (mitt i x, botten), h = höjd i bild. kontur = överkanten i världens mått.
  const SAKER = {};
  for (const [namn, [x, y, opt = {}]] of Object.entries(g.saker)) {
    const fil = opt.fil ?? `assets/bakgrunder/${g.plats.replace(/-\d+$/, '')}-saker/${namn}.png`;
    const r = await alfaRuta('/' + fil), h = opt.h ?? 340, s = h / (r.y1 - r.y0), w = (r.x1 - r.x0) * s, mx = (r.x0 + r.x1) / 2;
    const yttre = el('g', {}, sakerG), inre = el('g', {}, yttre);
    kit.bild('/' + fil, inre, { width: r.w, height: r.h, transform: `translate(${x} ${y}) scale(${s}) translate(${-mx} ${-r.y1})` });
    const kontur = r.topp.map(([px, py]) => [x + s * (px - mx), y + s * (py - r.y1) + 4]);   // 4 px in under den vita kanten
    const fx0 = x + s * (r.fx0 - mx), fx1 = x + s * (r.fx1 - mx);   // den del som står på marken (stammen, inte kronan)
    SAKER[namn] = { namn, x, y, h, w: fx1 - fx0, x0: fx0, x1: fx1, kontur, yttre, inre, farg: opt.farg ?? '#7FB069' };
  }
  const ordning = Object.keys(SAKER);
  const START = g.start ?? [960, Math.max(...Object.values(SAKER).map(s => s.y)) + 40];
  // sakens lägsta överkant över figurens bredd vid x: så djupt måste toppen ner för att figuren ska vara helt dold
  const lagstaTopp = (s, x) => Math.max(...s.kontur.filter(([px]) => Math.abs(px - x) < figB * 0.45).map(([, py]) => py), s.y - s.h);
  const behov = (s, x) => Math.max(0, H - (s.y - 6 - lagstaTopp(s, x)) + 18);
  // inom saken: där figuren kan stå helt bakom den (aldrig utanför, så att inget syns under golvet bredvid saken)
  const inom = (s, x) => clamp(x, s.x0 + figB * 0.62, s.x1 - figB * 0.62);   // 0,62: armarna sticker ut lite utanför kroppen

  // ---------- rösterna ----------
  const nr = [...mapp].reduce((h, c) => h * 31 + c.charCodeAt(0) >>> 0, 7) % VARIANTER + 1;
  // alla tagningar av en replik som finns, med filmens variant först; inom filmen tas de i tur och ordning
  const alla = async (namn, mapp = ROST) => (await Promise.all(Array.from({ length: VARIANTER }, (_, i) => `${mapp}/${namn}-${(nr - 1 + i) % VARIANTER + 1}.m4a`)
    .map(async f => (await finns(f)) ? f : null))).filter(Boolean);
  const tur = lista => { let i = 0; return () => lista.length ? lista[i++ % lista.length] : null; };
  const ett = async f => (await finns(f)) ? f : null;
  const [BORTOR, TITTUTS, HEJDOR, IGENS, DARS, BUSIGA, SAGS, LEK, IGEN, SLUT] = await Promise.all(
    ['borta', 'tittut', 'hej-da', 'borta-igen', 'dar-ar-du', 'busig', 'jag-sag-nagot', 'lek', 'igen', 'slut'].map(n => alla(n)));
  const HMMS = (await Promise.all(['hmm-1', 'hmm-3', 'hmm-4'].map(n => ett(`${GISSA}/${n}.m4a`)))).filter(Boolean);   // Gissa teckningens "Hmm."
  const [HEJ, VAR, HEJDA_DJUR] = await Promise.all(['hej', 'var', 'hejda'].map(n => ett(`${ROST}/${djur}-${n}.m4a`)));
  const borta = tur(BORTOR), tittutR = tur(TITTUTS), igenR = tur(IGENS), dar = tur(DARS), busig = tur(BUSIGA), hmm = tur(HMMS);
  const HEJDA = HEJDOR[0] ?? await ett(`${GISSA}/hej-da-1.m4a`);
  const LANGD = {};
  await Promise.all([...new Set([...BORTOR, ...TITTUTS, ...HEJDOR, ...IGENS, ...DARS, ...BUSIGA, ...SAGS, ...LEK, ...IGEN, ...SLUT, ...HMMS,
    HEJ, VAR, HEJDA_DJUR, HEJDA].filter(Boolean))].map(async f => { LANGD[f] = await langd(f, 1); }));
  const ljud = [];   // { t, fil, vol, loop, langd, fade }
  // säg en replik om filen finns; returnerar när den är slut (eller t, om den saknas, så att inget hål blir)
  const sag = (t, fil) => { if (!fil) return t; ljud.push({ t, fil, vol: 2.5 }); return t + LANGD[fil]; };
  const fxLista = [];
  const fx = (t, n, vol = 1, extra = {}) => fxLista.push({ t, n, vol, ...extra });

  // ---------- tiderna ----------
  const T = { intro: [], rundor: [] };
  let t = 0.4;
  sag(t, TITTUTS[0]);
  ordning.forEach((n, i) => { const t0 = 0.8 + i * 1.1; T.intro.push([n, t0]); fx(t0, 'skrrrrt-kort', 2.5); fx(t0 + 0.6, 'pop', 0.7); });
  t = 0.8 + ordning.length * 1.1 + 0.8;
  // hej: skuttar in, stannar mitt i bild, vinkar mot barnet. "Hej kaninen!" ... "Ska vi leka tittut?"
  T.in = [t, t + 2.8];
  T.hej = T.in[1] + 0.3;
  let e = HEJ ? sag(T.hej, HEJ) : T.hej + 1.3;
  T.vinka = [T.hej - 0.2, e + 0.8];
  fx(e + 0.3, g.ljud ?? 'fniss', 1.2); T.fnissHej = e + 0.3;
  e = sag(e + 1.0, LEK[0]);
  t = Math.max(T.vinka[1], e) + 0.6;
  let fran = START, varv = -1;
  const VARV = g.varv ?? 3;
  for (const [i, [namn, rorelse, framVid]] of g.rundor.entries()) {
    const sak = SAKER[namn], ut = SAKER[framVid ?? namn];
    const R = { i, namn, rorelse, sak, ut, fran };
    const nyttVarv = Math.floor(i * VARV / g.rundor.length);
    if (nyttVarv !== varv && i > 0) { R.igen = t; t = sag(t, IGEN[0]) + 0.2; fx(R.igen, 'boing', 0.5); }   // "En gång till!"
    varv = nyttVarv;
    R.ga = [t, t + 2.5];                                   // skuttar dit, bakom saken
    R.ner = [R.ga[1] + 0.25, R.ga[1] + 1.15];              // tittar på barnet, hukar lite, och glider ner
    fx(R.ner[0] + 0.25, 'swoosh', 0.5);
    // repliker: tagningarna byts av, och frågan är inte samma varje gång (format/tittut.md, Röstbanken)
    const bortaFil = i % 3 !== 0 ? (igenR() ?? borta()) : borta();
    R.borta = R.ner[1] - 0.05; e = sag(R.borta, bortaFil);
    R.paus = e + ANDAS;
    const fraga = [VAR, HMMS.length ? hmm() : null, VAR, null][i % 4];
    e = sag(R.paus, fraga);
    // retningen: öronen (eller huvudet vid kanten) tittar fram en stund, kikar, och dyker ner igen med ett dämpat fniss
    R.retas = [Math.max(e - 0.2, R.paus + 0.6), 0]; R.retas[1] = R.retas[0] + 1.5;
    fx(R.retas[0] + 0.3, g.ljud ?? 'fniss', 0.45);
    R.skakar = (g.skakar ?? []).includes(ut.namn) ? R.retas[0] - 0.1 : null;
    if (R.skakar != null) fx(R.skakar, PRASSEL[ut.namn] ?? 'prassel-buske', 1.1);
    e = R.retas[1];
    if (i % 4 === 3) e = sag(e + 0.15, SAGS[0]);               // "Jag såg något…"
    R.tittut = e + 0.4;
    R.fram = [R.tittut, R.tittut + (rorelse === 'ur' ? 2.2 : rorelse === 'sida' ? 1.6 : 0.9)];
    e = sag(R.tittut, tittutR()) || R.tittut + 1;
    fx(R.tittut + 0.05, 'pop', 0.8);
    R.ljud = Math.max(e, R.tittut + 0.7) + 0.1; fx(R.ljud, g.ljud ?? 'fniss', 1.4);
    R.hopp = [R.fram[1] + 0.15, R.fram[1] + 0.8]; fx(R.hopp[1] - 0.05, 'duns', 0.7);
    const efter = [null, dar(), busig(), null][i % 4];
    e = sag(Math.max(R.ljud + 0.9, R.hopp[1] + 0.2), efter);
    R.slut = Math.max(R.hopp[1] + 1.0, e + 0.5);
    // var den står när den kommit fram: upp = kvar bakom saken med ansiktet över, sida/ur = bredvid saken
    const nasta = SAKER[g.rundor[i + 1]?.[0]], ar = Math.sign((nasta?.x ?? 960) - ut.x) || (ut.x < 960 ? 1 : -1);
    R.dir = ar;
    R.inne = rorelse === 'upp' ? ut.x : inom(ut, ut.x + ar * ut.w);   // vid kanten, helt bakom
    const granne = Object.values(SAKER).filter(o => ar > 0 ? o.x > ut.x : o.x < ut.x).sort((a, b) => Math.abs(a.x - ut.x) - Math.abs(b.x - ut.x))[0];
    const kant = ar > 0 ? ut.x1 : ut.x0, bortre = granne ? (ar > 0 ? granne.x0 : granne.x1) : (ar > 0 ? 1920 : 0);
    R.slutPos = rorelse === 'upp' ? [ut.x, ut.y - 6]
      : [clamp(kant + ar * (figB * 0.5 + 10), figB * 0.6 + 30, 1920 - figB * 0.6 - 30), ut.y + 10 + (Math.abs(bortre - kant) < figB + 20 ? 70 : 0)];
    T.rundor.push(R);
    fran = R.slutPos; t = R.slut;
  }
  // hej då: fram till mitten, lite närmare. "Nu är leken slut." "Hej då kaninen!" Vinkar, och skuttar ut medan "Hej då!"
  T.mitt = [t, t + 2.4]; T.zoom = [T.mitt[0] + 1.2, T.mitt[1] + 0.8];
  e = sag(T.mitt[1] + 0.2, SLUT[0]);
  T.vinka2 = [e + 0.2, 0];
  e = sag(e + 0.3, HEJDA_DJUR);
  e = sag(Math.max(e, T.vinka2[0]) + 0.4, HEJDA ?? null);
  T.vinka2[1] = e + 1.6;
  fx(e + 0.2, g.ljud ?? 'fniss', 1.0);
  T.ga = [T.vinka2[1] - 0.6, T.vinka2[1] + 2.8];         // skuttar ut till höger och vinkar
  T.utZoom = [T.ga[0], T.ga[0] + 1.6];
  const DURATION = T.ga[1] + 1.5;
  ljud.unshift({ t: 0, fil: BAD, vol: 0.6, loop: true, langd: DURATION, fade: 1.5 },
    { t: 0, fil: `assets/ljud/effekter/${PLATSLJUD[g.plats] ?? 'skogsljud/skogsljud-1'}.m4a`, vol: 0.5, loop: true, langd: DURATION, fade: 1.5 });
  // effekterna: tagningarna i mappen i tur och ordning (fniss-1, -2, -3 …), saknade blir tysta
  const antal = {}, nasta = {};
  for (const c of fxLista.sort((a, b) => a.t - b.t)) {
    antal[c.n] ??= (await Promise.all([1, 2, 3, 4, 5, 6, 7].map(i => finns(`assets/ljud/effekter/${c.n}/${c.n}-${i}.m4a`)))).lastIndexOf(true) + 1;
    if (!antal[c.n]) continue;
    nasta[c.n] = ((nasta[c.n] ?? -1) + 1) % antal[c.n];
    ljud.push({ t: c.t, fil: `assets/ljud/effekter/${c.n}/${c.n}-${nasta[c.n] + 1}.m4a`, vol: c.vol });
  }

  // ---------- kameran: [tid, x, y, zoom] i 1920-mått, mjukt mellan punkterna ----------
  const MITT = START, halv = y => y - H * 0.5;   // hej då där hej var
  const KAMERA = [[0, 960, 540, 1], [T.in[0] + 0.8, 960, 540, 1], [T.in[1] + 0.2, START[0], halv(START[1]), 1.45], [T.vinka[1] + 0.2, START[0], halv(START[1]), 1.45]];
  for (const R of T.rundor) {
    const xs = [R.sak.x, R.ut.x, R.rorelse === 'upp' ? R.ut.x : R.slutPos[0]], fx = (Math.min(...xs) + Math.max(...xs)) / 2;
    KAMERA.push([R.ga[0] + 0.6, ...KAMERA.at(-1).slice(1)], [R.ga[1] + 0.2, fx, R.sak.y - H * 0.42, R.ut === R.sak ? 1.4 : 1.15], [R.slut - 0.2, fx, R.sak.y - H * 0.42, R.ut === R.sak ? 1.4 : 1.15]);
  }
  KAMERA.push([T.mitt[0] + 0.4, ...KAMERA.at(-1).slice(1)], [T.mitt[1] + 0.3, MITT[0], halv(MITT[1]), 1.5], [T.ga[0] + 0.6, MITT[0], halv(MITT[1]), 1.5], [T.ga[1], 960, 540, 1]);

  // ---------- kritan i introt ----------
  const krita = el('g', {}, kritaG);
  el('path', { d: KRITA, fill: 'none', stroke: '#fff', 'stroke-width': 12, 'stroke-linejoin': 'round' }, krita);
  const kritFarg = el('path', { d: KRITA }, krita);

  // ---------- rörelserna ----------
  // skutt: lugna hopp med squash and stretch (sträcks i luften, trycks ihop när den landar). Figurer vänds aldrig.
  const skutt = (k, n, h) => {
    if (k <= 0 || k >= 1) return { dy: 0, sx: 1, sy: 1, fas: 0 };
    const u = k * n % 1, luft = Math.sin(Math.PI * u), mark = clamp(1 - luft * 3);
    return { dy: -h * luft, sy: 1 + 0.07 * luft - 0.09 * mark, sx: 1 - 0.035 * luft + 0.07 * mark, fas: u };
  };
  // ett hopp på stället efter "Tittut!": hukar (förberedelse), hoppar, landar och trycks ihop
  const hoppa = (t, [a, b], h = 46) => {
    if (t < a - 0.15 || t > b + 0.15) return { dy: 0, sx: 1, sy: 1 };
    if (t < a) { const q = Math.sin(Math.PI * del(a - 0.15, a + 0.05, t)); return { dy: 0, sx: 1 + 0.06 * q, sy: 1 - 0.08 * q }; }
    if (t > b) { const q = Math.sin(Math.PI * del(b - 0.03, b + 0.15, t)); return { dy: 0, sx: 1 + 0.07 * q, sy: 1 - 0.1 * q }; }
    const k = del(a, b, t), luft = Math.sin(Math.PI * k);
    return { dy: -h * luft, sx: 1 - 0.04 * luft, sy: 1 + 0.08 * luft };
  };
  // retningen: kommer upp snabbt (ease-out), stannar och kikar, dyker ner fort (ease-in)
  const retas = (t, [a, b]) => {
    const k = del(a, b, t);
    return k < 0.25 ? utE(k / 0.25) : k < 0.75 ? 1 : 1 - (del(0.75, 1, k) ** 2);
  };
  const ingen = { sx: 1, sy: 1, tilt: 0, titt: 0 };
  function lage(t) {
    // → { x, y (fötterna), sjunk (px nedåt), klipp (saken), sx, sy, tilt, titt, fas }
    const IN = START[0] > 960 ? 2300 : -320;   // kommer in från närmaste kant
    if (t < T.in[0]) return { ...ingen, x: IN, y: START[1], sjunk: 0 };
    if (t < T.in[1]) {
      const k = del(T.in[0], T.in[1], t), s = skutt(k, 5, 44);
      const d = Math.sign(START[0] - IN);
      return { x: lerp(IN, START[0], inUt(k)), y: START[1] + s.dy, sjunk: 0, sx: s.sx, sy: s.sy, tilt: 4 * d * Math.sin(Math.PI * k), titt: d * 0.8, fas: s.fas };
    }
    for (const R of T.rundor) {
      if (t >= R.slut) continue;
      const { sak, ut } = R, bakom = [sak.x, sak.y - 6];
      if (t < R.ga[0]) return { ...ingen, x: R.fran[0], y: R.fran[1], sjunk: 0 };
      if (t < R.ga[1]) {
        const k = del(R.ga[0], R.ga[1], t), s = skutt(k, 4, 34), dir = Math.sign(bakom[0] - R.fran[0]);
        const x = lerp(R.fran[0], bakom[0], inUt(k)), y = lerp(R.fran[1], bakom[1], inUt(k)) + s.dy;
        const bakomSak = Math.abs(x - sak.x) < sak.w / 2 + figB * 0.5 || k > 0.5;   // bakom saken först när den når fram
        return { x, y, sjunk: 0, klipp: bakomSak ? sak : null, sx: s.sx, sy: s.sy, tilt: 4 * dir * Math.sin(Math.PI * k), titt: dir, fas: s.fas };
      }
      const ner0 = behov(sak, bakom[0]);
      if (t < R.fram[0]) {
        // ner: en busig blick mot barnet, hukar (förberedelse), sedan ner fort (ease-in). Under pausen glider den osynligt
        // dit den ska komma fram; mellan två saker under golvet.
        const a = del(R.ner[0], R.ner[1], t);
        let sj = a < 0.35 ? -10 * Math.sin(Math.PI * a / 0.35) : ner0 * ((a - 0.35) / 0.65) ** 2;
        const huk = a < 0.35 ? Math.sin(Math.PI * a / 0.35) : 0;
        const m = mjuk(del(R.retas[0] - 1.0, R.retas[0] - 0.1, t));
        const x = lerp(bakom[0], R.inne, m), y = lerp(bakom[1], ut.y - 6, m);
        const djupt = R.ut !== sak ? (H + 40 - ner0) * Math.sin(Math.PI * m) : 0;
        const nu = m > 0.5 ? ut : sak, kvar = Math.max(ner0, behov(nu, x));
        sj = a >= 1 ? kvar + djupt : sj;
        // retningen: öronen över kanten en stund
        // höga saker (trädet) döljer figuren stående: då tittar den fram från sidan i stället
        let kx = 0;
        if (t >= R.retas[0]) { if (kvar > H * 0.3) sj -= retas(t, R.retas) * H * 0.3; else kx = R.dir * retas(t, R.retas) * (Math.max(0, nu.x1 - nu.x0 - figB) / 2 + figB * 0.4); }
        return { x: x + kx, y, sjunk: sj, klipp: nu, sx: 1 + 0.05 * huk, sy: 1 - 0.07 * huk, tilt: 0, titt: 0, blick: a < 0.4, kik: t >= R.retas[0] && t < R.retas[1] };
      }
      // fram: upp = sträcker sig upp över saken; sida/ur = upp vid kanten och sedan ut bredvid saken (aldrig under golvet)
      const k = del(R.fram[0], R.fram[1], t), h = hoppa(t, R.hopp), kvar = behov(ut, R.inne);
      if (R.rorelse === 'upp') {
        const lyft = Math.max(0, ut.y - 6 - lagstaTopp(ut, ut.x) - H * 0.4), q = over(k), st = Math.sin(Math.PI * clamp(k / 0.8));
        return { x: ut.x, y: ut.y - 6 + h.dy - lyft * q, sjunk: kvar * (1 - q), klipp: ut,
          sx: h.sx * (1 - 0.06 * st), sy: h.sy * (1 + 0.1 * st), tilt: 0, titt: 0 };
      }
      const delUpp = R.rorelse === 'ur' ? 0.35 : 0.4;   // först upp vid kanten (ur: bara huvudet, stannar en stund), sedan ut
      const ku = R.rorelse === 'ur' ? (k < 0.25 ? over(k / 0.25) * 0.7 : k < 0.55 ? 0.7 : 0.7 + 0.3 * inUt((k - 0.55) / 0.2)) : over(clamp(k / delUpp));
      const kx = inUt(del(R.rorelse === 'ur' ? 0.6 : delUpp, 1, k));
      const st = Math.sin(Math.PI * clamp(k / delUpp));
      const x = lerp(R.inne, R.slutPos[0], kx), y = lerp(ut.y - 6, R.slutPos[1], kx) + h.dy;
      const ute = Math.abs(x - ut.x) > ut.w / 2 + figB * 0.45;
      return { x, y, sjunk: kvar * (1 - clamp(ku)), klipp: ute ? null : ut,
        sx: h.sx * (1 - 0.05 * st), sy: h.sy * (1 + 0.08 * st), tilt: 5 * R.dir * Math.sin(Math.PI * kx), titt: R.dir * Math.sin(Math.PI * kx) };
    }
    const sist = T.rundor.at(-1)?.slutPos ?? START, MITT = START;
    if (t < T.ga[0]) {
      const k = del(T.mitt[0], T.mitt[1], t), s = skutt(k, 4, 34), dir = Math.sign(MITT[0] - sist[0]);
      return { x: lerp(sist[0], MITT[0], inUt(k)), y: lerp(sist[1], MITT[1], inUt(k)) + s.dy, sjunk: 0, sx: s.sx, sy: s.sy, tilt: 4 * dir * Math.sin(Math.PI * k), titt: 0, fas: s.fas };
    }
    const k = del(T.ga[0], T.ga[1], t), s = skutt(k, 6, 44);
    const UT = MITT[0] > 960 ? 2350 : -350;
    return { x: lerp(MITT[0], UT, k < 0.15 ? 0 : inUt((k - 0.15) / 0.85)), y: MITT[1] + (k < 0.15 ? 0 : s.dy), sjunk: 0, sx: s.sx, sy: s.sy, tilt: k < 0.15 ? 0 : 4, titt: -0.6, fas: s.fas };
  }

  // armarna: vinkar (hej, hej då), en liten "ta-da" när den kommit fram, och svänger lite i varje skutt
  function armar(t, L) {
    const vink = [T.vinka, T.vinka2].find(([a, b]) => t >= a && t < b);
    if (vink || (t >= T.ga[0] && t < T.ga[1])) {
      const [a, b] = vink ?? T.ga, k = del(a, b, t), upp = Math.min(1, 4 * k, 4 * (1 - k)) ** 0.6;
      return { 'arm-r': -upp * (115 + 22 * Math.sin(t * 9)), 'arm-l': 8 * Math.sin(t * 4) };
    }
    const R = T.rundor.find(R => t >= R.tittut && t < R.hopp[1] + 0.3);
    if (R) { const k = del(R.tittut, R.tittut + 0.4, t) * (1 - del(R.hopp[1] - 0.2, R.hopp[1] + 0.3, t)); return { 'arm-l': 70 * k, 'arm-r': -70 * k }; }
    const sving = L.fas ? 14 * Math.sin(2 * Math.PI * L.fas) : 0;
    return { 'arm-l': sving, 'arm-r': sving };
  }

  // ansiktet: busigt. Stora ögon och öppen mun när den kommer fram, sedan en blinkning med ena ögat och ett flin;
  // en snabb blick mot barnet innan den gömmer sig; glad i hej och hej då
  function ansikte(t, L) {
    const R = T.rundor.find(R => t >= R.tittut && t < R.slut);
    if (R) {
      const u = t - R.tittut;
      if (u < 0.4) return { ogon: 'big', mun: 0.9 };
      if (u < 1.6) return { ogon: 'open', vink: R.i % 2, mun: 0.55 + 0.15 * Math.sin(u * 18) * (u > 0.7 ? 1 : 0) };   // blinkar, fnissar
      return { ogon: 'happy', mun: 0.25 };
    }
    if (L.blick) return { ogon: 'open', vink: 1, mun: 0.3 };   // busig blinkning innan den dyker ner
    const hej = (t >= T.hej && t < T.vinka[1]) || t >= T.vinka2[0];
    if (hej) return { ogon: (t > T.fnissHej && t < T.fnissHej + 1.2) || t > T.ga[0] ? 'happy' : 'open', mun: t < T.fnissHej + 1.2 ? 0.5 : 0.2, vink: t > T.ga[0] ? 0 : undefined };
    return { ogon: 'open', mun: 0, blink: ((t + 0.7) % 3.7) < 0.15 ? 1 : 0, titt: L.titt };
  }

  // ---------- en bildruta ----------
  function render(t) {
    // introt: sakerna poppar fram när kritan har ritat dem; skakar lite när figuren verkligen är där
    for (const [n, t0] of T.intro) {
      const s = SAKER[n], k = t < t0 + 0.6 ? 0 : over(del(t0 + 0.6, t0 + 1.1, t));
      let skak = 0;
      for (const R of T.rundor) if (R.skakar != null && R.ut === s && t > R.skakar) skak += 2.5 * Math.sin((t - R.skakar) * 34) * Math.exp(-4 * (t - R.skakar));
      s.yttre.setAttribute('transform', `translate(${s.x} ${s.y}) rotate(${skak.toFixed(2)}) scale(${k.toFixed(3)}) translate(${-s.x} ${-s.y})`);
    }
    const kSlut = T.intro.at(-1)[1] + 0.8;
    if (t < kSlut + 0.7) {
      const ki = T.intro.findIndex(([, t0]) => t < t0 + 0.8), i = ki < 0 ? T.intro.length - 1 : ki, [n, t0] = T.intro[i], s = SAKER[n];
      const k = t < t0 ? inUt(del(t0 - 0.35, t0, t)) : 0, prev = i ? SAKER[T.intro[i - 1][0]] : { x: -100, y: s.y - 200, h: 0 };
      const x = t < t0 ? lerp(prev.x, s.x, k) : s.x + 0.16 * s.w * Math.sin((t - t0) * 14);
      const y = t < t0 ? lerp(prev.y - prev.h * 0.6, s.y - s.h * 0.6, k) - 60 * Math.sin(Math.PI * k) : s.y - s.h * 0.55 + 20 * Math.sin((t - t0) * 19);
      const ut = del(kSlut, kSlut + 0.7, t);
      krita.style.display = '';
      krita.setAttribute('transform', `translate(${lerp(x, 2200, inUt(ut))} ${lerp(y, -300, inUt(ut))}) rotate(38) scale(0.9)`);
      kritFarg.setAttribute('fill', s.farg);
    } else krita.style.display = 'none';

    // figuren
    const L = lage(t), A = armar(t, L), F = ansikte(t, L);
    fig.pose({ x: L.x, y: L.y + L.sjunk, sx: L.sx, sy: L.sy, tilt: L.tilt, delar: A, ogon: F.ogon, vink: F.vink, blink: F.blink ?? 0,
      mun: F.mun, titt: F.titt ?? 0 });
    // bakom sakerna bara när den gömmer sig; masken följer sakens överkant, så att kanten aldrig syns
    if (L.klipp) {
      if (figurG.nextSibling !== sakerG) varld.insertBefore(figurG, sakerG);
      const s = L.klipp, golv = Math.max(s.y, L.y) + 4;
      const hal = 'M' + s.kontur.map(([x, y]) => `${x.toFixed(1)} ${Math.min(y, golv).toFixed(1)}`).join('L') + `L${s.kontur.at(-1)[0].toFixed(1)} ${golv}L${s.kontur[0][0].toFixed(1)} ${golv}Z`;
      klipp.setAttribute('d', `M-2000 -2000H4000V${golv}H-2000Z ${hal}`);
      figurG.setAttribute('clip-path', 'url(#tittut-klipp)');
    } else {
      if (sakerG.nextSibling !== figurG) varld.insertBefore(figurG, kritaG);
      figurG.removeAttribute('clip-path');
    }

    // kameran: följer leken lugnt, närmare gömstället i varje runda och närmast i hej och hej då (ettåringar ser figuren stort)
    let i = KAMERA.findIndex(k => k[0] > t);
    if (i < 0) i = KAMERA.length - 1;
    const [t0, x0, y0, z0] = KAMERA[Math.max(0, i - 1)], [t1, x1, y1, z1] = KAMERA[i], q = mjuk(del(t0, t1, t));
    kit.kamera(lerp(x0, x1, q) * S, lerp(y0, y1, q) * S, lerp(z0, z1, q));
  }

  kit.kor(render, DURATION);
  for (const c of ljud) if (c.fil && await finns(c.fil)) window.LJUD.push(c);
  window.TIDER = T; T.saker = SAKER; T.lage = lage;
}

window.tittut = tittut;
})();
