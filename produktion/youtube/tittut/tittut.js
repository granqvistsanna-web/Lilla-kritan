// Tittut: motorn för serien (format/tittut.md). En figur gömmer sig bakom tre saker på en plats, tre varv: "Borta!", paus med
// en retning (huvudet, en arm eller ett ben tittar fram), "Tittut!". Ca 2,5 min, för ettåringar: lugnt, tydligt hej och hej då.
// Bygger på scener/kit.js (figuren med kodansikte, kameran, render-krokarna) och verktyg/kant.js. En film är en index.html:
//   <script src="../../scener/kit.js"></script><script src="../../../../../verktyg/kant.js"></script>
//   <script src="../../tittut.js"></script>
//   <script>tittut({ plats: 'skogen', figur: 'kaninen-kanel', ljud: 'fniss', hojd: 450, saker: {...}, rundor: [...] })</script>
// Allt i data är i 1920 × 1080 (formatets mått); kit-duken är 1376 × 768, så världen skalas med S.
// Djupet: figuren och sakerna ritas i fotpunktens ordning (det som står längre fram täcker). Figuren går mellan sakerna i
// en rad framför dem, hoppar in bakom låga saker (över toppen) och går in från sidan bakom höga (trädet).
// Förhandsvisning: python3 -m http.server 8765 i repots rot, sedan http://127.0.0.1:8765/<mapp>/
// Rendering: node avsnitt/004-bussen-badar/scener/render.mjs <mapp>          -> <mapp>/<namn>.mp4
//            node avsnitt/004-bussen-badar/scener/render.mjs <mapp> 5 12 30  -> stillbilder
(() => {
const { el, clamp, lerp, del, inUt, mjuk, over, ut: utE } = kit;
const S = kit.W / 1920;
const ROST = 'assets/ljud/roster/tittut', GISSA = 'assets/ljud/roster', VARIANTER = 12;
// djuret som det sägs (CLAUDE.md: aldrig figurens namn): filerna heter <djur>-hej, <djur>-var och <djur>-hejda
const DJUR = { 'kaninen-kanel': 'kanin', 'kaninen-kanel-v2': 'kanin', 'lammet-ludde': 'lamm', 'lammet-ludde-v2': 'lamm', 'kon-kajsa': 'ko', 'leoparden-lova': 'leopard', 'leoparden-lova-v2': 'leopard', 'lejonet-lage': 'lejon', 'hunden-hugo-v2': 'hund' };
const DJUR_ORD = { kanin: 'kaninen', lamm: 'lammet', ko: 'kon', leopard: 'leoparden', lejon: 'lejonet' };
const PLATSLJUD = { skogen: 'skogsljud/skogsljud-1', 'skogen-2': 'skogsljud/skogsljud-1', bondgarden: 'gardsljud/gardsljud-1',
  lekplatsen: 'lekplatsljud/lekplatsljud-1', hemma: 'hemmaljud/hemmaljud-1' };
const PRASSEL = { buske: 'prassel-buske', barbuske: 'prassel-buske', boll: 'studs', sandlada: 'sand', kulle: 'prassel-gras', lovhog: 'prassel-lov', hostack: 'prassel-ho', gardin: 'prassel-tyg', tacke: 'prassel-tyg' };
const BAD = 'assets/ljud/musik/tittut-bad.m4a';   // Suno-slingan, gemensam för alla filmer (saknas än: blir tyst)
// kritbokstäverna från kanalbilderna (kanal/kanal.js), plus u och !
const GLYF = {
  l: { d: 'M20 -182 Q17 -90 19 -20 Q20 2 36 -4', b: 44 },
  i: { d: 'M16 -98 Q14 -50 16 0', b: 32, prick: [16, -150] },
  a: { d: 'M74 -78 Q58 -106 32 -98 Q2 -88 4 -46 Q6 -2 36 -2 Q64 -2 74 -40 M76 -100 Q74 -50 78 0', b: 92 },
  k: { d: 'M16 -182 Q14 -90 16 0 M70 -100 Q40 -70 20 -46 Q46 -28 74 0', b: 82 },
  r: { d: 'M16 -98 Q14 -50 16 0 M16 -56 Q26 -100 66 -94', b: 70 },
  t: { d: 'M32 -158 Q30 -80 32 -22 Q34 2 58 -6 M6 -100 Q34 -103 62 -98', b: 66 },
  n: { d: 'M16 -98 Q14 -50 16 0 M16 -62 Q28 -104 56 -100 Q80 -96 79 -58 Q78 -30 80 0', b: 96 },
  u: { d: 'M14 -98 Q12 -40 28 -12 Q46 6 66 -12 Q80 -40 80 -98 M80 -98 Q78 -50 82 0', b: 96 },
  '!': { d: 'M20 -182 Q17 -120 19 -58', b: 38, prick: [19, -8] },
};
const FARG = ['#df342f', '#f28d3c', '#4fae4a', '#2fb3b5', '#8e44c9', '#e93c8f', '#3b8fe0'];
const VRID = [3, -4, 2.5, -3, 4, -2.5, 3.5, -4, 2, -3.5, 3];
const STJARNA = 'M0 -1 Q0.16 -0.16 1 0 Q0.16 0.16 0 1 Q-0.16 0.16 -1 0 Q-0.16 -0.16 0 -1Z';
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

// sakens synliga del (alfa): rutan, överkanten (konturen) och bredden rad för rad, i bildens px
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
    // raderna: [y, vänster kant, höger kant] var 8:e px, mätt från mitten av foten (stammens bredd, inte kronans)
    const rader = [], mitt = Math.round((fx0 + fx1) / 2);
    for (let y = y0; y <= y1; y += 8) {
      if (!a(mitt, y)) continue;
      let l = mitt, r = mitt; while (l > x0 && a(l - 2, y)) l -= 2; while (r < x1 && a(r + 2, y)) r += 2;
      rader.push([y, l, r]);
    }
    ok({ w: i.width, h: i.height, x0, y0, x1, y1, fx0, fx1, topp, rader });
  };
  i.onerror = () => ok(null);
  i.src = src;
});

async function tittut(g) {
  if (document.readyState === 'loading') await new Promise(r => addEventListener('DOMContentLoaded', r));
  const mapp = decodeURIComponent(location.pathname).replace(/^\//, '').replace(/index\.html$/, '');
  const djur = DJUR[g.figur];
  const H = g.hojd ?? 450;   // figurens höjd i bild (med öronen)
  const HUVUD = g.retas === 'huvud' || g.retas === 'fot';   // g.retas 'fot' (Hugo, Sanna 2026-11-10): som 'huvud', men andra kiken är en fot som sticker fram
  const LJUD = g.ljud ?? 'fniss', FNISS = g.fniss ?? LJUD, JA = g.ja ?? FNISS;   // ljudet när den kommer fram, och det busiga småljudet

  // ---------- duken: platsen, världen i 1920-mått; figuren ligger bland sakerna i djupordning ----------
  const lager = kit.duk(g.plats);
  const defs = lager.plate.ownerSVGElement.querySelector('defs');
  // gräset och blommorna framför figuren (Sanna 2026-11-07): urklippta ur plattan, ritas över figurerna och följer kameran
  const fgFil = `assets/bakgrunder/${g.plats}/${g.plats}-forgrund.png`;
  if (await finns(fgFil)) {
    const fg = el('g', { class: 'kamera' });
    lager.figurer.parentNode.after(fg);
    kit.bild('/' + fgFil, fg, { width: kit.W, height: kit.H, preserveAspectRatio: 'xMidYMid slice' });
  }
  // närgrunden (Sanna 2026-11-07): några saker nära kameran i bildens hörn, ett eget lager som rör sig lite mer än världen
  // när kameran panorerar (parallax NARA) och är lite mjukt (skärpedjup). g.nara: [{ fil, x, y (fotpunkten), h, spegel }] i 1920-mått.
  const NARA = 1.25;
  let naraG = null;
  if (g.nara?.length) {
    defs.insertAdjacentHTML('beforeend', '<filter id="tittut-nara" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>');
    naraG = el('g', {}, lager.overst.parentNode);
    lager.overst.previousSibling.before(naraG);   // under kornet, som allt annat
    const inre = el('g', { transform: `scale(${S})`, filter: 'url(#tittut-nara)' }, el('g', { filter: 'url(#boil)' }, naraG));
    for (const n of g.nara) {
      const r = await alfaRuta('/' + n.fil), s = n.h / (r.y1 - r.y0), mx = (r.x0 + r.x1) / 2;
      kit.bild('/' + n.fil, inre, { width: r.w, height: r.h, transform: `translate(${n.x} ${n.y}) scale(${n.spegel ? -s : s} ${s}) translate(${-mx} ${-r.y1})` });
    }
  }
  const varld = el('g', { transform: `scale(${S})` }, lager.figurer);
  const sakerG = el('g', {}, varld);
  const kritaG = el('g', {}, varld);
  const figurG = el('g', {}, sakerG);

  const klipp = el('path', { 'clip-rule': 'evenodd' }, el('clipPath', { id: 'tittut-klipp', clipPathUnits: 'userSpaceOnUse' }, defs));
  const fig = await kit.figur(g.figur, { h: H, forelder: figurG, rigg: g.rigg, framfor: g.framfor, kant: g.figurKant });
  const figB = (fig.F.bbox[2] - fig.F.bbox[0]) * H / (fig.F.bbox[3] - fig.F.bbox[1]);   // figurens bredd i bild
  // skuggan på marken (Sanna 2026-11-07): mjuk oval under fötterna, mindre och svagare ju högre den skuttar, så att hoppen syns
  defs.insertAdjacentHTML('beforeend', '<filter id="tittut-skugga" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>');
  const skugga = el('ellipse', { fill: '#24301a', filter: 'url(#tittut-skugga)' });
  figurG.insertBefore(skugga, fig.g);

  // sakerna: [x, y] = fotpunkten (mitt i x, botten), h = höjd i bild. kontur = överkanten i världens mått.
  const SAKER = {};
  for (const [namn, [x, y, opt = {}]] of Object.entries(g.saker)) {
    const fil = opt.fil ?? `assets/bakgrunder/${g.plats.replace(/-\d+$/, '')}-saker/${namn}.png`;
    const r = await alfaRuta('/' + fil), h = opt.h ?? 340, s = h / (r.y1 - r.y0), mx = (r.x0 + r.x1) / 2;
    const yttre = el('g', {}, sakerG), inre = el('g', {}, yttre);
    kit.bild('/' + fil, inre, { width: r.w, height: r.h, transform: `translate(${x} ${y}) scale(${s}) translate(${-mx} ${-r.y1})` });
    const kontur = r.topp.map(([px, py]) => [x + s * (px - mx), y + s * (py - r.y1) + 4]);   // 4 px in under den vita kanten
    const rader = r.rader.map(([py, l, rr]) => [y + s * (py - r.y1), x + s * (l - mx), x + s * (rr - mx)]);
    const fx0 = x + s * (r.fx0 - mx), fx1 = x + s * (r.fx1 - mx);   // den del som står på marken (stammen, inte kronan)
    SAKER[namn] = { namn, x, y, h, w: fx1 - fx0, x0: fx0, x1: fx1, kontur, rader, yttre, inre, farg: opt.farg ?? '#7FB069' };
  }
  const ordning = Object.keys(SAKER);
  const DJUP = Object.values(SAKER).sort((a, b) => a.y - b.y);   // längst bak först
  for (const s of DJUP) sakerG.appendChild(s.yttre);
  const START = g.start ?? [960, Math.max(...DJUP.map(s => s.y)) + 140];
  // gången framför sakerna; en sak närmare kameran än start (skogen-gron: stocken) står framför gången och figuren går bakom den
  const RAD = Math.max(START[1], ...DJUP.filter(s => s.y < START[1]).map(s => s.y + 120));
  // sakens lägsta överkant över figurens bredd vid x: så djupt måste toppen ner för att figuren ska vara helt dold
  const lagstaTopp = (s, x) => Math.max(...s.kontur.filter(([px]) => Math.abs(px - x) < figB * 0.45).map(([, py]) => py), s.y - s.h);
  const hogsta = s => Math.min(...s.kontur.map(([, py]) => py));
  const behov = (s, x) => Math.max(0, H - (s.y - 6 - lagstaTopp(s, x)) + 18);
  const toppVid = (s, x) => s.kontur.reduce((b, p) => Math.abs(p[0] - x) < Math.abs(b[0] - x) ? p : b)[1];
  const kantVid = (s, y, dir) => { const r = s.rader.reduce((b, p) => Math.abs(p[0] - y) < Math.abs(b[0] - y) ? p : b); return dir > 0 ? r[2] : r[1]; };
  // inom saken: där figuren kan stå helt bakom den (aldrig utanför, så att inget syns under golvet bredvid saken)
  const inom = (s, x) => { const lo = s.x0 + figB * 0.62, hi = s.x1 - figB * 0.62; return lo > hi ? (s.x0 + s.x1) / 2 : clamp(x, lo, hi); };   // 0,62: armarna sticker ut lite utanför kroppen; smalare sak än figuren: mitt bakom
  const hog = s => s.h > H * 1.6;
  const bakY = s => s.hog ? s.y - 40 : s.y - 6;   // fötterna bakom saken (högre upp bakom trädet: inget syns mellan rötterna)   // mycket högre än figuren (trädet): går in från sidan och tittar fram från sidan
  // höga saker får masken efter sin riktiga form rad för rad (stammen är smalare än rötterna), låga efter överkanten
  for (const s of DJUP) {
    s.hog = hog(s);
    let r = s.rader; const f = n => n.toFixed(1);
    if (s.hog) {   // svampfoten (Sanna 2026-11-07: fötterna syntes under svampen): de rundade hörnen nertill fylls ut
      const band = r.filter(([y]) => y > s.y - 140), l0 = Math.min(...band.map(q => q[1])), r0 = Math.max(...band.map(q => q[2]));
      r = r.map(([y, l, rr]) => y > s.y - 140 ? [y, l0, r0] : [y, l, rr]);
    }
    // hela den synliga bredden (en rund stock är bredare upptill än där den står): låga saker håller figuren sig utanför
    s.vid = s.hog ? [s.x0, s.x1] : [Math.min(...r.map(q => q[1])), Math.max(...r.map(q => q[2]))];
    s.rr = r;
    s.ram = 'M' + r.map(([y, l]) => `${f(l + 3)} ${f(y + 4)}`).join('L') + 'L' + [...r].reverse().map(([y, , rr]) => `${f(rr - 3)} ${f(y + 4)}`).join('L') + 'Z';
  }

  // inte genom sakerna (Sanna 2026-11-07): beside = där figuren står bredvid en sak utan att överlappa den,
  // och lyftet = hur högt fötterna måste upp för att skutta över de låga saker som ligger mellan start och mål
  const KLAR = () => figB * 0.5 + 18;
  const beside = (s, dir) => clamp(dir > 0 ? s.vid[1] + KLAR() : s.vid[0] - KLAR(), figB * 0.6 + 20, 1920 - figB * 0.6 - 20);
  // ute i gången framför sakerna: överlappar kroppen en låg sak står figuren uppe på den i stället för att synas rakt
  // igenom den (sakerna står tätare än en figurbredd, så det finns ingen plats bredvid). Mjukt upp när den kliver på.
  const paTopp = L => {
    if (L.klipp || L.kik || g.klattra === false) return L;   // g.klattra false: går på marken framför sakerna (lekplatsen: inte uppe på bollen)
    const z = L.z ?? L.y;
    const hw = figB * 0.35;
    let y = L.y;
    for (const s of DJUP) {
      if (s.hog) continue;
      const o = Math.min(L.x + hw, s.vid[1]) - Math.max(L.x - hw, s.vid[0]);
      if (o <= 0) continue;
      const under = s.kontur.filter(([px]) => Math.abs(px - L.x) < figB * 0.18).map(q => q[1]);   // där fötterna står
      const topp = (under.length ? Math.min(s.y, under.reduce((a, b) => a + b) / under.length) : s.y) + 4;
      // bara när den är framför saken; tonar in strax innan djupet byter sida, så att den kliver upp utan ryck
      y = Math.min(y, lerp(L.y, Math.min(L.y, topp), mjuk(clamp(o / (hw * 0.8))) * mjuk(clamp((z - s.y + 40) / 60))));
    }
    return y === L.y ? L : { ...L, y, paSak: true };
  };

  // ---------- rösterna ----------
  const nr = [...mapp].reduce((h, c) => h * 31 + c.charCodeAt(0) >>> 0, 7) % VARIANTER + 1;
  // alla tagningar av en replik som finns, med filmens variant först
  // filmens eget manus (Sanna 2026-11-07): finns assets/ljud/roster/tittut/<djur>/ används bara de filerna, i nummerordning
  // (-1 i första rundan som använder repliken, -2 i nästa …), så att raderna kan nämna gömstället. Annars de delade tagningarna.
  // g.rost: egen röstmapp för filmen (skogen-gron: 'kanin-svamp', samma kanin-repliker men svampen i stället för busken)
  const RMAPP = `${ROST}/${g.rost ?? djur}`;
  const EGEN = (await finns(`${RMAPP}/tittut-1.m4a`)) || (await finns(`${RMAPP}/lek-1.m4a`)) ? RMAPP : null;
  const alla = async (namn, mapp = EGEN ?? ROST) => (await Promise.all(Array.from({ length: VARIANTER }, (_, i) => `${mapp}/${namn}-${((EGEN ? 1 : nr) - 1 + i) % VARIANTER + 1}.m4a`)
    .map(async f => (await finns(f)) ? f : null))).filter(Boolean);
  const ett = async f => (await finns(f)) ? f : null;
  const [BORTOR, TITTUTS, HEJDOR, IGENS, DARS, BUSIGA, SAGS, LEK, IGEN, SLUT, GOMMA, KUL, HEJHEJ] = await Promise.all(
    ['borta', 'tittut', 'hej-da', 'borta-igen', 'dar-ar-du', 'busig', 'jag-sag-nagot', 'lek', 'igen', 'slut', 'gomma', 'kul', 'hej-hej'].map(n => alla(n)));
  // gamla tagningar (hmm, "Hej då lammet!") borttagna (Sanna 2026-11-07: stack ut för mycket); "Hej kaninen!" kvar
  const HEJ = await ett(`${ROST}/${djur}-hej.m4a`);
  const HEJDOR2 = HEJDOR.length ? HEJDOR : (await Promise.all([1, 2, 3, 4, 5].map(i => ett(`${GISSA}/hej-da-${i}.m4a`)))).filter(Boolean);
  // varje replikfil används högst en gång per film: samma tagning två gånger hörs som en upprepning. Finns ingen ny tagning
  // kvar blir det tyst där (eller figurens eget ljud), så fler tagningar gör filmen rikare.
  const anvand = new Set();
  const ny = lista => () => { const f = lista.find(f => f && !anvand.has(f)); if (f) anvand.add(f); return f ?? null; };
  const borta = ny(BORTOR), bortaIgen = ny(IGENS), tittutR = ny(TITTUTS), dar = ny(DARS), busig = ny(BUSIGA), gomma = ny(GOMMA),
    sagNagot = ny(SAGS), igen = ny(IGEN);
  const LANGD = {};
  await Promise.all([...new Set([...BORTOR, ...TITTUTS, ...HEJDOR2, ...IGENS, ...DARS, ...BUSIGA, ...SAGS, ...LEK, ...IGEN, ...SLUT,
    ...GOMMA, ...KUL, ...HEJHEJ, HEJ].filter(Boolean))].map(async f => { LANGD[f] = await langd(f, 1); }));
  // när "ut" i "Tittut!" börjar i varje tagning (whisper, ordtider), och hur långt in i 'fram' huvudet syns
  const UT = { 'kanin/tittut-1.m4a': 0.61, 'kanin/tittut-2.m4a': 0.56, 'kanin/tittut-3.m4a': 0.61, 'kanin/tittut-4.m4a': 0.3,
    'kanin/tittut-5.m4a': 0.91, 'kanin/tittut-6.m4a': 1.04, 'lamm/tittut-1.m4a': 0.8, 'lamm/tittut-2.m4a': 0.5,
    'lamm/tittut-3.m4a': 0.51, 'lamm/tittut-4.m4a': 0.24, 'lamm/tittut-5.m4a': 0.88, 'lamm/tittut-6.m4a': 1.01,
    'kanin-svamp/tittut-1.m4a': 1.05, 'kanin-svamp/tittut-5.m4a': 0.94,   // egna tagningar (Malin 2026-11-07, tagning 2)
    'kanin-svamp/tittut-2.m4a': 0.56, 'kanin-svamp/tittut-3.m4a': 0.61, 'kanin-svamp/tittut-4.m4a': 0.3, 'kanin-svamp/tittut-6.m4a': 1.04,   // kopior av kanin/
    'hund-lekplats/tittut-1.m4a': 0.47, 'hund-lekplats/tittut-2.m4a': 0.63, 'hund-lekplats/tittut-3.m4a': 0.99,   // Malin 2026-11-10, tagning 1:
    'hund-lekplats/tittut-4.m4a': 0.24, 'hund-lekplats/tittut-5.m4a': 1.37 };   // "ut" mätt i ljudet (stavelsens början), whispers ord kom för sent i 1–2
  const POPP = 0.2;
  const JINGEL = await ett('assets/ljud/musik/tittut-jingel.m4a');
  if (JINGEL) LANGD[JINGEL] = await langd(JINGEL, 3);
  const ljud = [];   // { t, fil, vol, loop, langd, fade }
  // säg en replik om filen finns; returnerar när den är slut (eller t, om den saknas, så att inget hål blir)
  const sag = (t, fil) => { if (!fil) return t; ljud.push({ t, fil, vol: 2.5 }); return t + LANGD[fil]; };
  const fxLista = [];
  const fx = (t, n, vol = 1, extra = {}) => fxLista.push({ t, n, vol, ...extra });
  // djurets eget ljud med munnen öppen medan det hörs (Sanna 2026-11-07: tydligt hej och hej då från djuret självt)
  const BLA = [];
  // stegen och hoppen hörs svagt (Sanna 2026-11-07): ett mjukt steg vid varje landning i ett skutt, "hupp" när den tar sats
  // g.mjukaSteg (v2, Sanna 2026-11-07: fler ljud när den går och hoppar): tass, hopp-mjuk och landa-mjuk i stället för steg, hupp och duns (ljud-v2-kanel.md)
  const steg = ([a, b], n0, vol = 0.3, sort = null) => { const n = g.gang ? 2 * Math.round(n0 * 1.25) : n0; for (let i = 1; i <= n; i++) fx(a + (b - a) * i / n - 0.02, sort ?? (g.mjukaSteg ? 'tass' : 'steg'), sort ? 0.9 : g.mjukaSteg ? 0.22 : vol); };
  const hupp = (t, vol = 0.35) => fx(t, g.mjukaSteg ? 'hopp-mjuk' : 'hupp', g.mjukaSteg ? 0.25 : vol);
  const duns = (t, vol) => fx(t, g.mjukaSteg ? 'landa-mjuk' : 'duns', g.mjukaSteg ? 0.35 : vol);
  const bla = (t, vol = 1.4) => { fx(t, LJUD, vol); BLA.push([t, t + (g.munTid ?? 0.75)]); };   // munTid: längre babbel (hej-babbel) håller munnen öppen längre

  // ---------- tiderna ----------
  const T = { intro: [], rundor: [], nick: [] };
  // introt (Sanna 2026-11-07): ett papperskort, kritan skriver "tittut!", figuren tittar upp bakom ordet (tyst,
  // Sanna 2026-11-07), dyker ner, kortet lyfts bort och sakerna poppar fram, ca 3 s
  // enklare och lugnare (Sanna 2026-11-07): bokstäverna tonar in en i taget till jingeln, ingen figur, kortet tonar bort
  // Skissen (Sanna 2026-11-07): "Snabb pop" i takt med jingeln – en bokstav på varje slag (jingeln har 7 slag, ordet 7
  // tecken), röst B:s "Titut!" (tittut-6) med "Ti" och "ut" på slag 4 och 5, och ordet studsar till på sista slaget
  const SLAG = [0.05, 0.29, 0.43, 0.86, 1.14, 1.30, 1.57];
  T.kort = { skriv: [0.35, 2.2], upp: [99, 99], ner: [99, 99], bort: [3.0, 3.9], slag: SLAG, ut: SLAG[6] };
  if (JINGEL) ljud.push({ t: 0, fil: JINGEL, vol: 1 });
  sag(SLAG[3] - 0.07, await ett(`${ROST}/tittut-6.m4a`));
  ordning.forEach((n, i) => { const t0 = 3.3 + i * 0.3; T.intro.push([n, t0]); fx(t0 + 0.6, 'pop', 0.7); if (!i) fx(t0 + 0.62, 'glitter', 0.6); });   // glittret mjukare (Sanna 2026-11-07)
  let t = 3.3 + ordning.length * 0.3 + 0.9;
  // hej: skuttar in i närbild och vinkar. "Hej lammet!" Sedan inledningen, med ett litet nick och fniss efter varje fråga:
  // "Ska vi leka tittut?" ... "Ska du gömma dig?" ... "Okej, vad kul!"
  T.in = [t, t + 3.6]; steg(T.in, 4);
  T.hej = T.in[1] + 0.3;
  // hej: djuret vinkar och säger själv hej, "bä!" och ett fniss, sedan "Hej lammet!" om tagningen finns
  bla(T.hej + 0.1); T.fnissHej = T.hej + 1.0; fx(T.fnissHej, FNISS, 1.2);
  let e = HEJ ? sag(T.fnissHej + 1.0, HEJ) : T.fnissHej + 1.0;
  T.vinka = [T.hej - 0.2, e + 0.6];
  e += 0.5;
  // g.gommaForst: frågan är "Var ska du gömma dig?" (kaninen) och sägs i inledningen; annars ("Var gömmer du dig nu?")
  // först när den gömt sig (Sanna 2026-11-07)
  for (const fraga of [ny(LEK)(), g.gommaForst ? gomma() : null]) {
    if (!fraga) continue;
    e = sag(e + ANDAS, fraga);
    T.nick.push([e + 0.3, e + 0.9]); fx(e + 0.4, JA, 1.1);   // g.ja: svarar "ja!" med ett eget ljud när den nickar (Sanna 2026-11-07)
    e += 1.4;
  }
  e = sag(e, ny(KUL)());
  t = Math.max(T.vinka[1], e) + 0.8;

  let fran = START, franTopp = null, varv = -1;   // franTopp: saken figuren står bakom med huvudet över (efter 'upp')
  const VARV = g.varv ?? 3;
  for (const [i, [namn, rorelse, framVid, kikar]] of g.rundor.entries()) {
    const sak = SAKER[namn], ut = SAKER[framVid ?? namn];
    const R = { i, namn, rorelse, sak, ut, fran, franTopp, hog: hog(sak) };
    const nyttVarv = Math.floor(i * VARV / g.rundor.length);
    if (nyttVarv !== varv && i > 0) { const f = igen(); if (f) { R.igen = t; t = sag(t, f) + 0.2; fx(R.igen, 'boing', 0.5); } }   // "En gång till!"
    varv = nyttVarv;
    // vägen dit: hoppar fram över saken den stod bakom, skuttar lugnt i gången framför sakerna, stannar och blinkar
    R.dir0 = Math.sign(sak.x - fran[0]) || 1;
    let p = fran;
    // hög sak: fram till stammen på den sida där det finns plats, så att den aldrig kliver över stenen bredvid (Sanna 2026-11-07: 1:27)
    const hogX = sd => clamp(kantVid(sak, sak.y - H * 0.6, sd) + sd * figB * 0.45, figB * 0.6, 1920 - figB * 0.6);
    const trangt = x => Math.max(0, ...DJUP.filter(s => s !== sak && !s.hog).map(s => s.w / 2 + figB / 2 - Math.abs(x - s.x)));   // hur mycket den skulle överlappa
    const hogSida = trangt(hogX(R.dir0)) < trangt(hogX(-R.dir0)) ? R.dir0 : -R.dir0;
    const malX = R.hog ? hogX(hogSida) : beside(sak, -R.dir0);
    if (franTopp) {   // hoppar ner bredvid, eller direkt dit den ska om det är närmare
      const land = beside(franTopp, R.dir0);
      R.lamna = [t, t + 1.9]; hupp(t + 0.05); p = [R.dir0 * (malX - land) < 0 ? malX : land, RAD]; t = R.lamna[1]; duns(R.lamna[1] - 0.05, 0.5);
    }
    R.vagFran = p; R.vagTill = [malX, RAD];
    const d = Math.abs(malX - p[0]) + Math.abs(RAD - p[1]);
    R.ga = [t, t + (1.8 + d / 240) * (g.lugn ?? 1) * (g.smyg ? 1.25 : 1)];   // g.smyg: smyger på tå, lite långsammare   // lugnare skutt (Sanna 2026-11-07); g.lugn > 1 går ännu lugnare
    R.skutt = Math.max(2, Math.round(d / 240)); steg(R.ga, R.skutt, 0.3, g.smyg ? 'smyg' : null);
    if (g.smyg) fx(R.ga[1] + 0.15, 'nos', 0.7);   // nosar vid gömstället (Hugo; tyst tills familjen finns)
    R.blick = [R.ga[1], R.ga[1] + 0.85];                    // tittar busigt på barnet och hukar
    if (i % 2) fx(R.blick[0] + 0.45, FNISS, 0.9);   // fnissen lite senare (Sanna 2026-11-07: kom för tidigt)
    // in bakom: låga saker hoppar den över och ner bakom; höga går den fram till och glider in bakom från sidan
    if (R.hog) { R.upp = [R.blick[1], R.blick[1] + 1.6]; R.ner = [R.upp[1], R.upp[1] + 1.7]; steg(R.upp, 2, 0.25); }
    else { R.ner = [R.blick[1], R.blick[1] + 1.7]; hupp(R.ner[0]); }
    fx(R.ner[0] + 0.2, 'swoosh', 0.5);
    if (!R.hog && PRASSEL[sak.namn]) fx(R.ner[1] - 0.35, PRASSEL[sak.namn], 0.6);
    // repliker: varje fil en gång. "Borta!" / "Borta igen!", en fråga ibland, och en retning mitt i pausen
    // "borta" bara varannan runda (Sanna 2026-11-07: för tjatigt); filen tas ändå varje runda så att tagningarna följer gömställena
    const bortaFil = i % 3 ? (bortaIgen() ?? borta()) : (borta() ?? bortaIgen());
    R.borta = R.ner[1] - 0.05; e = sag(R.borta, i % 2 === 0 ? bortaFil : null);
    R.paus = e + ANDAS;
    e = sag(R.paus, i === 0 ? gomma() : null);   // "Var gömmer du dig nu?" när den just gömt sig första gången
    // retas två gånger, lugnare (Sanna 2026-11-07: mer retsamt och långsammare bakom varje sak)
    R.retas = [Math.max(e, R.paus + 0.9), 0]; R.retas[1] = R.retas[0] + 2.3;
    R.retas2 = [R.retas[1] + 0.4, R.retas[1] + 2.3];
    R.kik = (R.hog ? ['sida', 'arm', 'ben'] : ['topp', 'arm', 'ben'])[i % 3];
    // ritade armar sitter fast i kroppen, och lammets små armar syns bara som en klöv (Sanna 2026-11-07: såg ut som ett horn)
    if (R.kik === 'arm' && (fig.rigg.ritadeDelar || g.armar)) R.kik = R.hog ? 'sida' : 'topp';
    const huvud = R.hog ? 'sida' : 'topp';   // andra kiken: huvudet om första var en arm/ett ben, annars ett ben
    // "Jag ser ett öra." sägs medan öronen faktiskt syns (Sanna 2026-11-07): den rundan kikar huvudet först
    if (i % 4 === 3) { R.kik = huvud; R.sag = sagNagot(); if (R.sag) sag(R.retas[0] + (g.svansKik ? 0.3 : 0.75), R.sag); }   // svansKik: tidigare, så att svansen syns hela repliken
    R.kik2 = R.kik === huvud ? 'ben' : huvud;
    // g.retas 'huvud' (v2-Kanel, Sanna 2026-11-07: armen som sticker ut såg konstig ut): bara huvudet, två gånger
    if (HUVUD) { R.kik = R.kik2 = huvud; }
    if (g.retas === 'fot') R.kik2 = 'ben';
    // g.svansKik (Hugo, Sanna 2026-11-10): "Jag ser en liten svans…" sägs medan svansen sticker upp ur gömstället
    if (g.svansKik && R.sag) R.kik = 'svans';
    // fjärde värdet 'sidor': huvudet tittar fram på ena sidan, dyker undan och tittar fram på den andra, fyra gånger (Sanna 2026-11-07)
    if (kikar === 'sidor') R.kik = R.kik2 = 'sidor';
    fx(R.retas[0] + 0.8, FNISS, 0.55); fx(R.retas2[0] + 0.7, FNISS, 0.5);
    R.skakar = (g.skakar ?? []).includes(ut.namn) ? R.retas[0] - 0.2 : null;
    if (R.skakar != null) fx(R.skakar, PRASSEL[ut.namn] ?? 'prassel-buske', 1.1);
    e = R.retas2[1];
    // "Tittut!": repliken startar så att "ut" hörs i samma ögonblick som huvudet poppar upp (Sanna 2026-11-07)
    const tf = tittutR() ?? dar(), off = UT[tf?.split('/').slice(-2).join('/')] ?? 0.3;
    R.tittut = e + 0.5 + Math.max(0, off - POPP - 0.3);
    R.fram = [R.tittut, R.tittut + (rorelse === 'ur' ? 3.0 : rorelse === 'sida' ? 3.0 : 1.7)];
    sag(R.tittut + POPP - off, tf); e = tf ? R.tittut + POPP - off + LANGD[tf] : R.tittut;
    fx(R.tittut + POPP, 'pop', 0.8);
    if (g.glad) { fx(R.tittut + POPP + 0.5, 'svansvift', 0.5); if (i % 2) fx(R.tittut + POPP + 0.1, 'vov-pip', 0.7); }   // svansen viftar, och ett litet vov när babblet inte hörs (Hugo)   // svansen viftar (Hugo); tyst tills familjen finns
    R.ljud = Math.max(e, R.tittut + 0.7) + 0.1; if (i % 2 === 0) bla(R.ljud);   // djurljudet varannan gång, annars tjatigt
    R.hopp = [R.fram[1] + 0.25, R.fram[1] + 1.45]; hupp(R.hopp[0] - 0.05, 0.3); duns(R.hopp[1] - 0.05, 0.7);
    if (g.glad) fx(R.hopp[1] + 0.15, 'flamt-valp', 0.6);   // flåsar glatt efter hoppet (Hugo)
    const efter = i % 4 === 1 ? dar() : i % 4 === 2 ? busig() : null;
    e = sag(Math.max(R.ljud + 1.0, R.hopp[1] + 0.3), efter);
    if (!efter) { R.fniss2 = R.hopp[1] + 0.6; fx(R.fniss2, FNISS, 1.0); e = Math.max(e, R.fniss2 + 0.8); }
    R.slut = Math.max(R.hopp[1] + 1.0, e + 0.5);
    // var den står när den kommit fram: upp = kvar bakom saken med huvudet över, sida/ur = bredvid saken (i gången om det är trångt)
    const nasta = SAKER[g.rundor[i + 1]?.[0]], ar = Math.sign((nasta?.x ?? START[0]) - ut.x) || (ut.x < 960 ? 1 : -1);
    R.dir = ar;
    R.inne = rorelse === 'upp' || (hog(ut) && HUVUD) ? ut.x : inom(ut, ut.x + ar * ut.w);   // vid kanten, helt bakom
    const granne = Object.values(SAKER).filter(o => ar > 0 ? o.x > ut.x : o.x < ut.x).sort((a, b) => Math.abs(a.x - ut.x) - Math.abs(b.x - ut.x))[0];
    const kant = ar > 0 ? ut.x1 : ut.x0, bortre = granne ? (ar > 0 ? granne.x0 : granne.x1) : (ar > 0 ? 1920 : 0);
    R.lyft = Math.max(0, ut.y - 6 - lagstaTopp(ut, ut.x) - H * 0.4);
    R.slutPos = rorelse === 'upp' ? [ut.x, ut.y - 6 - R.lyft]
      : [beside(ut, ar), Math.abs(bortre - (ar > 0 ? ut.vid[1] : ut.vid[0])) >= figB + 2 * KLAR() ? ut.y + 10 : RAD];
    T.rundor.push(R);
    fran = R.slutPos; franTopp = rorelse === 'upp' ? ut : null; t = R.slut;
  }
  // hej då: hoppar fram, skuttar tillbaka till närbilden. "Nu är leken slut." "Hej då lammet!" Vinkar, skuttar ut medan "Hej då!"
  const sistR = T.rundor.at(-1);
  T.mittFran = fran;
  if (franTopp) { T.lamna = [t, t + 1.3]; hupp(t + 0.05); duns(t + 1.25, 0.5); T.mittFran = [beside(franTopp, Math.sign(START[0] - fran[0]) || 1), RAD]; t = T.lamna[1]; }
  T.mitt = [t, t + 4.2];   // långsammare och studsigare (Sanna 2026-11-07)
  steg(T.mitt, 4);
  e = sag(T.mitt[1] + 0.2, ny(SLUT)());
  // hej då: djuret vinkar stort och säger själv "bä!", berättaren "Hej då!", ett fniss till sist
  T.vinka2 = [e + 0.2, 0];
  bla(e + 0.4);
  e = sag(e + 1.3, ny(HEJDOR2)());
  bla(e + 0.2); fx(e + 1.0, FNISS, 1.0); T.fnissHejda = e + 1.0;
  T.vinka2[1] = e + 2.3;
  // sista tittut (Sanna 2026-11-07): kortet fälls ner över bilden, kritan skriver "tittut!", figuren tittar upp bakom
  // ordet en sista gång ("Tittut! Hej då!") och dyker ner. Sedan blir kortet slutbilden: 10 s med plats för YouTubes slutskärm.
  const k0 = T.vinka2[1];
  T.slut = { ner: [k0, k0 + 1.0], skriv: [k0 + 0.8, k0 + 2.0], upp: [k0 + 2.2, k0 + 2.7] };
  fx(k0, 'swoosh', 0.7); fx(T.slut.skriv[0], 'skrrrrt-lang', 2.0); fx(T.slut.skriv[1] + 0.1, 'glimt', 0.45); fx(T.slut.upp[0] + 0.05, 'pop', 0.8);
  e = sag(T.slut.upp[1], ny(HEJDOR2)());
  fx(e + 0.1, LJUD, 1.0);
  T.slut.dyk = [e + 1.0, e + 1.35];
  T.slut.kort = [T.slut.dyk[1] + 0.3, T.slut.dyk[1] + 1.3];
  T.ga = [k0 + 0.8, k0 + 4.4];   // skuttar ut bakom kortet (syns inte)
  T.utZoom = [T.ga[0], T.ga[0] + 1.6];
  const DURATION = T.slut.kort[1] + 10;
  ljud.unshift({ t: 0, fil: BAD, vol: 0.6, loop: true, langd: DURATION, fade: 1.5 },   // BAD saknas än (tyst)
    { t: 0, fil: `assets/ljud/effekter/${PLATSLJUD[g.plats] ?? 'skogsljud/skogsljud-1'}.m4a`, vol: g.platsVol ?? 0.5, loop: true, langd: DURATION, fade: 1.5 });
  // effekterna: tagningarna i mappen i tur och ordning (fniss-1, -2, -3 …), saknade blir tysta
  const antal = {}, nasta = {}, djurljud = [], repliker = ljud.filter(c => LANGD[c.fil]).map(c => ({ t: c.t, slut: c.t + LANGD[c.fil] }));
  for (const c of fxLista.sort((a, b) => a.t - b.t)) {
    antal[c.n] ??= (await Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => finns(`assets/ljud/effekter/${c.n}/${c.n}-${i}.m4a`)))).lastIndexOf(true) + 1;
    // busljudet saknas än: tyst, inte figurens vanliga ljud (Sanna 2026-11-07: bää för ofta)
    if (!antal[c.n]) continue;
    // fniss och djurljud pratar aldrig i munnen på berättaren (Sanna 2026-11-07): inget mitt i en replik, och
    // tonas ut före nästa replik
    let langdFx;
    if (c.n === LJUD || c.n === FNISS || c.n === JA) {
      if (repliker.some(r => c.t > r.t - 0.1 && c.t < r.slut)) continue;
      const nastaR = Math.min(...repliker.filter(r => r.t >= c.t).map(r => r.t));
      langdFx = nastaR - c.t - 0.1;
      if (langdFx < 0.5) continue;
    }
    const fil = `assets/ljud/effekter/${c.n}/${c.n}-${((nasta[c.n] ?? -1) + 1) % antal[c.n] + 1}.m4a`;
    // bää och fniss aldrig ovanpå varandra (Sanna 2026-11-07); långa bää kortas till 1.8 s
    if (c.n === LJUD || c.n === FNISS || c.n === JA) {
      langdFx = Math.min(langdFx, await langd(fil, 1), 1.8);
      if (djurljud.some(([a, b]) => c.t < b + 0.1 && c.t + langdFx > a - 0.1)) continue;
      djurljud.push([c.t, c.t + langdFx]);
    }
    nasta[c.n] = ((nasta[c.n] ?? -1) + 1) % antal[c.n];
    ljud.push({ t: c.t, fil, vol: c.vol, ...(langdFx < 9 ? { langd: langdFx, fade: 0.25 } : {}) });
  }

  // ---------- kameran: [tid, x, y, zoom] i 1920-mått, mjukt mellan punkterna ----------
  const MITT = START, halv = y => y - H * 0.5;   // hej då där hej var
  const KAMERA = [[0, 960, 540, 1], [T.in[0] + 0.8, 960, 540, 1], [T.in[1] + 0.2, START[0], halv(START[1]), 1.35], [T.vinka[1] + 0.2, START[0], halv(START[1]), 1.35]];
  for (const R of T.rundor) {
    const xs = [R.sak.x, R.ut.x, R.rorelse === 'upp' ? R.ut.x : R.slutPos[0], R.vagFran[0], R.fran[0]], cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    // med alla saker den kan stå uppe på (och hoppa över) i rundan, så att öronen aldrig klipps (Sanna 2026-11-07); lugnare zoom
    const x0 = Math.min(...xs) - figB * 0.5, x1 = Math.max(...xs) + figB * 0.5;
    const inom_ = Object.values(SAKER).filter(s => s === R.sak || s === R.ut || (!s.hog && s.vid[1] > x0 && s.vid[0] < x1));
    const topp = Math.min(...inom_.map(s => s.hog ? s.y - H * 1.1 : hogsta(s) - H - 90)), cy = (topp + RAD) / 2 + 30;
    const z = clamp(1080 / (RAD - topp + 200), 1, R.ut === R.sak ? 1.2 : 1.08);
    KAMERA.push([R.ga[0] - 0.2, ...KAMERA.at(-1).slice(1)], [Math.min(R.ga[0] + 1.2, R.ga[1]), cx, cy, z], [R.slut - 0.2, cx, cy, z]);   // hela vägen i bild
  }
  KAMERA.push([T.mitt[0] + 0.4, ...KAMERA.at(-1).slice(1)], [T.mitt[1] + 0.3, MITT[0], halv(MITT[1]), 1.4], [T.ga[0] + 0.6, MITT[0], halv(MITT[1]), 1.4], [T.ga[1], 960, 540, 1]);

  // ---------- kortet: introt och slutbilden. Kritbokstäverna från kanalbilderna (kanal/kanal.js) ----------
  defs.insertAdjacentHTML('beforeend', `
    <filter id="kort-vax" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="kort-skugga" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
    <linearGradient id="kort-sken" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="kort-korn" x="0" y="0" width="1" height="1">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.47  0 0 0 0 0.36  1.1 0 0 0 -0.47"/>
    </filter>`);
  const kortG = el('g', { transform: `scale(${S})` }, lager.overst), papper = el('g', {}, kortG);
  el('rect', { x: -60, y: -60, width: 2040, height: 1200, fill: '#FBF7EE' }, papper);
  el('rect', { x: -60, y: -60, width: 2040, height: 1200, filter: 'url(#kort-korn)' }, papper);
  const ORD_Y = 640, KLIPP_Y = ORD_Y - 80;   // figuren syns bara ovanför mitten av bokstäverna, som bakom ordet
  el('rect', { x: -60, y: -3000, width: 2040, height: 3000 + KLIPP_Y }, el('clipPath', { id: 'kort-klipp', clipPathUnits: 'userSpaceOnUse' }, defs));
  const kortFig = await kit.figur(g.figur, { h: H, rigg: g.rigg, framfor: g.framfor, forelder: el('g', { filter: 'url(#boil)' }, el('g', { 'clip-path': 'url(#kort-klipp)' }, papper)) });
  const ordG = el('g', {}, papper);
  const ORD = ord('tittut!', ORD_Y, 1.7, 0, ordG), MARKE = el('g', {}, papper);
  ord('lilla kritan', 1010, 0.4, 3, el('g', { transform: 'translate(0 0)' }, MARKE));
  const GNISTA = [[-0.52, -200, 0, 60], [-0.2, -270, 0.08, 44], [0.18, -235, 0.16, 66], [0.55, -160, 0.05, 52], [-0.42, 45, 0.12, 40], [0.38, 55, 0.2, 48]].map(([fx_, dy, d, r], j) =>
    ({ x: 960 + fx_ * ORD.bredd, y: ORD_Y + dy, d, r, el: el('path', { d: STJARNA, fill: j % 2 ? '#FFE27A' : '#FFFFFF', stroke: '#F2C94C', 'stroke-width': 0.08 }, ordG) }));
  const GLITTER = T.intro.map(([n]) => Array.from({ length: 5 }, (_, j) => {
    const a = -Math.PI / 2 + (j - 2) * 0.55, s = SAKER[n];
    return { s, a, r: 0.5 + 0.25 * ((j * 7) % 3), el: el('path', { d: STJARNA, fill: j % 2 ? '#FFE27A' : '#FFFFFF', stroke: '#F2C94C', 'stroke-width': 0.08 }, kritaG) };
  }));

  // ---------- rörelserna ----------
  // skutt: lugna hopp med squash and stretch (sträcks i luften, trycks ihop när den landar). Figurer vänds aldrig.
  // Gången (Sanna 2026-11-07): framåt bara i luften, fötterna står still vid varje landning (inget glid), första och
  // sista skuttet lite lägre. p = hur långt den kommit (0–1), luft = 0 på marken, 1 högst upp.
  const skutt = (k, n, h) => {
    if (k <= 0 || k >= 1) return { dy: 0, sx: 1, sy: 1, fas: 0, p: clamp(k), luft: 0 };
    // g.gang (v2, Sanna 2026-11-07): går i stället för att skutta, som Kanels gång i premium/rigg-test.html och uttryck.html:
    // benen saxar ±16° och lyfter foten, kroppen guppar och vickar lite, jämn fart med mjuk start och stopp
    if (g.gang) {
      const steg = 2 * Math.round(n * 1.25), amp = clamp(Math.min(k, 1 - k) * 8), f = Math.sin(Math.PI * k * steg) * amp;
      return { dy: -Math.abs(f) * 6, sx: 1, sy: 1, fas: 0, p: 0.6 * k + 0.4 * inUt(k), luft: 0, gang: f };
    }
    const i = Math.floor(k * n), u = k * n % 1, luft = Math.sin(Math.PI * u), mark = clamp(1 - luft * 3);
    const p = (i + inUt(clamp((u - 0.12) / 0.76))) / n, hh = h * (0.8 + 0.2 * Math.sin(Math.PI * k));
    return { dy: -hh * luft, sy: 1 + 0.08 * luft - 0.1 * mark, sx: 1 - 0.04 * luft + 0.08 * mark, fas: u, p, luft };
  };
  // ett hopp på stället: hukar (förberedelse), hoppar, landar och trycks ihop
  const hoppa = (t, [a, b], h = 46) => {
    if (t < a - 0.15 || t > b + 0.15) return { dy: 0, sx: 1, sy: 1 };
    if (t < a) { const q = Math.sin(Math.PI * del(a - 0.15, a + 0.05, t)); return { dy: 0, sx: 1 + 0.06 * q, sy: 1 - 0.08 * q }; }
    if (t > b) { const q = Math.sin(Math.PI * del(b - 0.03, b + 0.15, t)); return { dy: 0, sx: 1 + 0.07 * q, sy: 1 - 0.1 * q }; }
    const k = del(a, b, t), luft = Math.sin(Math.PI * k);
    return { dy: -h * luft, sx: 1 - 0.04 * luft, sy: 1 + 0.08 * luft };
  };
  // ett stort hopp över en sak från a till b (fötterna): upp med ease-out till över toppen, ner med ease-in
  const overHopp = (k, a, b, topp) => {
    const apex = Math.min(a[1], b[1], topp) - 12, st = Math.sin(Math.PI * k);
    const y = k < 0.5 ? lerp(a[1], apex, 1 - (1 - 2 * k) ** 2) : lerp(apex, b[1], (2 * k - 1) ** 2);
    return { x: lerp(a[0], b[0], inUt(k)), y, sx: 1 - 0.05 * st, sy: 1 + 0.1 * st, luft: st };
  };
  // retningen: kommer fram lugnt (ease-out), stannar och kikar, dyker undan fort (ease-in)
  const retas = (t, [a, b]) => {
    const k = del(a, b, t);
    return k < 0.3 ? utE(k / 0.3) : k < 0.78 ? 1 : 1 - (del(0.78, 1, k) ** 2);
  };
  const ingen = { sx: 1, sy: 1, tilt: 0, titt: 0 };
  // tittut: huvudet vickar fram och tillbaka (Sanna 2026-11-07), två lugna vickningar när den kommit fram
  const lage = t => {
    const L = paTopp(lage0(t)), R = T.rundor.find(R => t >= R.tittut + POPP && t < R.tittut + POPP + 1.5);
    if (!R) return L;
    const u = (t - R.tittut - POPP) / 1.5;
    return { ...L, tilt: (L.tilt ?? 0) + 8 * Math.sin(2 * Math.PI * 2 * u) * Math.sin(Math.PI * u) };
  };
  function lage0(t) {
    // → { x, y (fötterna), z (djupet), sjunk (px nedåt), klipp (saken), sx, sy, tilt, titt, fas, blick, kik }
    const IN = (g.kant ?? START[0] - 960) > 0 ? 2300 : -320;   // kommer in från närmaste kant, eller g.kant (1 höger, −1 vänster)
    if (t < T.in[0]) return { ...ingen, x: IN, y: START[1], sjunk: 0 };
    if (t < T.in[1]) {
      const k = del(T.in[0], T.in[1], t), s = skutt(k, 4, 40), d = Math.sign(START[0] - IN);
      return { x: lerp(IN, START[0], s.p), y: START[1] + s.dy, z: START[1], sjunk: 0, sx: s.sx, sy: s.sy, tilt: 5 * d * s.luft, titt: d * 0.8, fas: s.fas, gang: s.gang, dir: d };
    }
    const nick = T.nick.find(([a, b]) => t > a - 0.2 && t < b + 0.2);
    if (nick && (!T.rundor[0] || t < T.rundor[0].ga[0])) { const h = hoppa(t, nick, 26); return { ...ingen, x: START[0], y: START[1] + h.dy, z: START[1], sjunk: 0, sx: h.sx, sy: h.sy, nick: true }; }
    for (const R of T.rundor) {
      if (t >= R.slut) continue;
      const { sak, ut } = R;
      // står kvar (eller hoppar fram över saken den stod bakom)
      if (t < R.ga[0]) {
        if (R.lamna && t >= R.lamna[0]) {
          const k = del(R.lamna[0], R.lamna[1], t), o = overHopp(k, R.fran, R.vagFran, hogsta(R.franTopp));
          return { x: o.x, y: o.y, z: k < 0.5 ? R.franTopp.y - 6 : RAD, sjunk: 0, klipp: k < 0.5 ? R.franTopp : null, sx: o.sx, sy: o.sy, hopp: o.luft, tilt: 6 * R.dir0 * Math.sin(Math.PI * k), titt: R.dir0 };
        }
        return { ...ingen, x: R.fran[0], y: R.fran[1], z: R.franTopp ? R.franTopp.y - 6 : R.fran[1], sjunk: 0, klipp: R.franTopp };
      }
      // skuttar i gången framför sakerna
      if (t < R.ga[1]) {
        const k = del(R.ga[0], R.ga[1], t), s = skutt(k, R.skutt, 30), dir = Math.sign(R.vagTill[0] - R.vagFran[0]);
        const y = lerp(R.vagFran[1], R.vagTill[1], s.p), x = lerp(R.vagFran[0], R.vagTill[0], s.p);
        if (g.smyg) return { x, y: y + s.dy * 0.4, z: y, sjunk: 0, sx: 1.04, sy: 0.93, tilt: 3 * dir, titt: -dir * 0.7, fas: s.fas, gang: s.gang, dir, smyg: true };   // hukar, tittar bakåt mot barnet
        return { x, y: y + s.dy, z: y, sjunk: 0, sx: s.sx, sy: s.sy, tilt: 5 * dir * s.luft, titt: dir, fas: s.fas, gang: s.gang, dir };
      }
      // en busig blick mot barnet, och hukar inför hoppet
      if (t < R.blick[1]) {
        const huk = Math.sin(Math.PI * clamp(del(R.blick[1] - 0.35, R.blick[1] + 0.05, t)));
        return { ...ingen, x: R.vagTill[0], y: RAD, z: RAD, sjunk: 0, sx: 1 + 0.06 * huk, sy: 1 - 0.09 * huk, blick: true, runda: R.i };
      }
      const ner0 = behov(sak, sak.x), start = R.hog ? inom(sak, sak.x) : sak.x;
      if (t < R.ner[1]) {
        if (R.hog && t < R.upp[1]) {   // höga saker: upp bredvid stammen
          const k = del(R.upp[0], R.upp[1], t), s = skutt(k, 2, 26), y = lerp(RAD, bakY(sak), inUt(k));
          return { x: R.vagTill[0], y: y + s.dy, z: y, sjunk: 0, sx: s.sx, sy: s.sy, titt: Math.sign(sak.x - R.vagTill[0]), fas: s.fas, gang: s.gang };
        }
        const k = del(R.ner[0], R.ner[1], t);
        if (R.hog) {   // och glider in bakom stammen
          const x = lerp(R.vagTill[0], start, inUt(k));
          return { x, y: bakY(sak), z: sak.y - 6, sjunk: 0, klipp: Math.abs(x - sak.x) < sak.w / 2 + figB / 2 ? sak : null, sx: 1, sy: 1, tilt: 0, titt: Math.sign(start - R.vagTill[0]) };
        }
        // låga saker: hoppar över toppen och ner bakom (djupet byter sida högst upp, där inget överlappar)
        const o = overHopp(k, [R.vagTill[0], RAD], [sak.x, sak.y - 6 + ner0], hogsta(sak));
        return { x: o.x, y: o.y, z: k < 0.5 ? RAD : sak.y - 6, sjunk: 0, klipp: k < 0.5 ? null : sak, sx: o.sx, sy: o.sy, hopp: o.luft, tilt: 0, titt: 0 };
      }
      if (t < R.fram[0]) {
        // pausen: glider osynligt dit den ska komma fram (mellan två saker under golvet), och retas mitt i
        const m = mjuk(del(R.retas[0] - 1.0, R.retas[0] - 0.1, t));
        const x = lerp(start, R.inne, m), y = lerp(bakY(sak), bakY(ut), m);
        const djupt = R.ut !== sak ? (H + 40 - ner0) * Math.sin(Math.PI * m) : 0;
        const nu = m > 0.5 ? ut : sak, kvar = hog(nu) ? 0 : Math.max(ner0, behov(nu, x));   // bakom en hög sak står den på marken, stammen döljer den
        let sj = kvar + djupt, kx = 0, kik = null, tt = 0, lut = 0;
        // bakom en hög sak (trädet) lutar den sig ut i stället för att gå ut: fötterna står kvar bakom stammen (Sanna 2026-11-07)
        const lutaUt = (sida, qq) => {
          const halv = (kantVid(nu, nu.y - H * 0.6, 1) - kantVid(nu, nu.y - H * 0.6, -1)) / 2;
          const fotHalv = (kantVid(nu, nu.y - 50, 1) - kantVid(nu, nu.y - 50, -1)) / 2;
          const skjut = Math.max(0, fotHalv - figB * 0.32), behovs = Math.max(0, halv - figB / 2) + figB * 0.45;
          if (HUVUD) {   // v2 (Sanna 2026-11-07): hela kroppen glider ut tills huvudet och ett öga syns vid stammens kant
            kx = (nu.x - x) + sida * qq * (halv - figB * 0.2); lut = sida * qq * 8; return;
          }
          kx = (nu.x - x) + sida * qq * Math.min(skjut, behovs);
          lut = sida * qq * Math.min(35, Math.atan2(Math.max(0, behovs - skjut), H * 0.7) * 180 / Math.PI);
        };
        const RT = [R.retas, R.retas2].find(([a, b]) => t >= a && t < b);
        if (RT) {
          const q = retas(t, RT), kikTyp = RT === R.retas ? R.kik : R.kik2;
          if (kikTyp === 'sidor') {   // två kikar per retning: först på ena sidan, sedan på den andra (flyttar sig medan den är dold)
            const m = (RT[0] + RT[1]) / 2, forst = t < m, qq = retas(t, forst ? [RT[0], m] : [m, RT[1]]), sida = forst ? -R.dir : R.dir;
            if (hog(nu)) lutaUt(sida, qq);
            else { kx = inom(nu, nu.x + sida * nu.w) - x; sj -= qq * H * 0.38; }
            tt = sida * qq;
          }
          else if (kikTyp === 'topp' && HUVUD) sj = lerp(sj, Math.min(sj, H * 0.62 - (nu.y - 6 - toppVid(nu, x))), q);   // v2: öronen och ögonen över sakens kant mitt för ansiktet, oavsett hur saken ser ut
          else if (kikTyp === 'topp') sj -= q * H * 0.38;   // toppen av huvudet och ögonen   // toppen av huvudet och ögonen
          else if (kikTyp === 'sida') { lutaUt(R.dir, q); tt = R.dir * q; }
          else kik = { typ: kikTyp, q, sak: nu, dir: R.dir, hog: hog(nu) };
        }
        return { x: x + kx, y, z: nu.y - 6, sjunk: sj, klipp: nu, sx: 1, sy: 1, tilt: lut, titt: tt || (kx ? R.dir : 0), kik, kikar: !!RT };
      }
      // fram: upp = sträcker sig upp över saken; sida/ur = upp vid kanten, ut bredvid saken, och sedan fram i gången om det är trångt
      const k = del(R.fram[0], R.fram[1], t), h = hoppa(t, R.hopp, g.glad ? 95 : 46), kvar = behov(ut, R.inne);
      if (R.rorelse === 'upp') {
        const q = over(k), st = Math.sin(Math.PI * clamp(k / 0.8));
        return { x: ut.x, y: ut.y - 6 + h.dy - R.lyft * q, z: ut.y - 6, sjunk: kvar * (1 - q), klipp: ut,
          sx: h.sx * (1 - 0.06 * st), sy: h.sy * (1 + 0.1 * st), tilt: 0, titt: 0 };
      }
      const delUpp = R.rorelse === 'ur' ? 0.35 : hog(ut) ? 0.1 : 0.4;   // bakom en hög sak står den redan uppe: hela tiden går till att gå ut (lugnt)   // först upp vid kanten (ur: bara huvudet, stannar en stund), sedan ut
      const ku = R.rorelse === 'ur' ? (k < 0.25 ? over(k / 0.25) * 0.7 : k < 0.55 ? 0.7 : 0.7 + 0.3 * inUt((k - 0.55) / 0.2)) : over(clamp(k / delUpp));
      const kx = inUt(del(R.rorelse === 'ur' ? 0.6 : delUpp, 1, k));
      const st = Math.sin(Math.PI * clamp(k / delUpp));
      const px = clamp(kx / 0.7), py = del(0.7, 1, kx);
      const x = lerp(R.inne, R.slutPos[0], hog(ut) ? px : inUt(px)),   // hög sak: en mjukning, inte två (gick ut på 0,6 s)
         y = lerp(bakY(ut), R.slutPos[1], inUt(py));
      const ute = x < ut.vid[0] - figB * 0.45 || x > ut.vid[1] + figB * 0.45;
      return { x, y: y + h.dy, z: y, sjunk: kvar * (1 - clamp(ku)), klipp: ute ? null : ut,
        sx: h.sx * (1 - 0.05 * st), sy: h.sy * (1 + 0.08 * st), tilt: 5 * R.dir * Math.sin(Math.PI * px), titt: R.dir * Math.sin(Math.PI * px) };
    }
    // hej då: hoppar fram över saken (om den stod bakom en), skuttar till närbilden, vinkar och skuttar ut
    if (T.lamna && t < T.lamna[1]) {
      const k = del(T.lamna[0], T.lamna[1], t), s = sistR.ut, o = overHopp(k, sistR.slutPos, T.mittFran, hogsta(s));
      return { x: o.x, y: o.y, z: k < 0.5 ? s.y - 6 : RAD, sjunk: 0, klipp: k < 0.5 ? s : null, sx: o.sx, sy: o.sy, hopp: o.luft, tilt: 0, titt: 0 };
    }
    if (t < T.ga[0]) {
      if (t > T.mitt[1] + 0.3) {   // studsar glatt på stället medan den säger hej då och vinkar
        const a = T.mitt[1] + 0.3, n = Math.max(1, Math.round((T.ga[0] - a) / 0.6)), s = skutt(del(a, T.ga[0], t), n, 22);
        return { ...ingen, x: MITT[0], y: MITT[1] + s.dy, z: MITT[1], sjunk: 0, sx: s.sx, sy: s.sy, fas: s.fas, gang: s.gang };
      }
      const k = del(T.mitt[0], T.mitt[1], t), s = skutt(k, 4, 48), dir = Math.sign(MITT[0] - T.mittFran[0]);
      const y = lerp(T.mittFran[1], MITT[1], s.p), x = lerp(T.mittFran[0], MITT[0], s.p);
      return { x, y: y + s.dy, z: y, sjunk: 0, sx: s.sx, sy: s.sy, tilt: 5 * dir * s.luft, titt: 0, fas: s.fas, gang: s.gang, dir };
    }
    const k = del(T.ga[0], T.ga[1], t), s = skutt(k, 5, 40);
    const UT = (g.kant ?? MITT[0] - 960) > 0 ? 2350 : -350;
    return { x: lerp(MITT[0], UT, k < 0.15 ? 0 : inUt((k - 0.15) / 0.85)), y: MITT[1] + (k < 0.15 ? 0 : s.dy), z: MITT[1], sjunk: 0, sx: s.sx, sy: s.sy, tilt: k < 0.15 ? 0 : 4 * Math.sign(UT - MITT[0]), titt: -0.6, fas: s.fas, gang: s.gang };
  }

  // en arm eller ett ben som sticker fram ur gömstället medan resten är dold: delen flyttas (i figurens 1024-ruta) så att
  // vridpunkten hamnar dold strax innanför saken och vrids ut. Låga saker: rakt upp över toppen. Höga: ut åt sidan.
  const sk = fig.skala, fot = fig.fot;
  function stickUt(t, L) {
    const { typ, q, sak, dir, hog: hoga } = L.kik, rig = fig.rigg.delar, yv = L.y + L.sjunk;
    const n = typ === 'svans' ? 'tail' : (typ === 'arm' ? 'arm-' : 'leg-') + (dir > 0 ? 'r' : 'l'), [px, py] = rig[n].vridpunkt;
    const vx = L.x + (px - fot[0]) * sk, vy = yv + (py - fot[1]) * sk;
    // armen vinkar lugnt, benet sprattlar lite (Sanna 2026-11-07: lammets arm såg ut som ett horn)
    const vig = (typ === 'arm' ? Math.sin(t * 7) * 24 : typ === 'svans' ? Math.sin(t * 15) * 22 : Math.sin(t * 13) * 16) * clamp(q * 1.4 - 0.3);
    const skala = typ === 'svans' ? 1.7 : g.fotSkala ?? 2.0;   // lammets små klövar förstorade; Hugos fot behöver mindre
    let tx, ty, vrid;
    if (hoga) {   // ut från sidan av stammen: armen i axelhöjd, benet utsträckt vid marken
      ty = typ === 'arm' ? sak.y - H * 0.55 : sak.y - 28;
      tx = kantVid(sak, ty, dir) + dir * (typ === 'arm' ? lerp(-50, 18, q) : lerp(-90, -12, q));
      vrid = -dir * (typ === 'arm' ? 75 : 85);   // pekar ut från stammen, klöven ytterst
    } else {      // upp över toppen: armen eller benet uppochner, med klöven överst
      tx = clamp(L.x + dir * figB * 0.15, sak.x0 + 40, sak.x1 - 40);
      ty = toppVid(sak, tx) + (typ === 'arm' ? lerp(55, -22, q) : typ === 'svans' ? lerp(150, 28, q) : lerp(95, 8, q));
      vrid = typ === 'svans' ? -100 : 180;   // svansen ligger ner vid roten och böjer sig upp: vrid den så att roten går ner i saken
    }
    return { [n]: [vrid + vig, (tx - vx) / sk, (ty - vy) / sk, skala] };
  }

  // g.armar: större armar runt axeln (lammets små klövar syntes knappt, Sanna 2026-11-07)
  const storaArmar = (A, L) => {
    if (!g.armar || L.kik) return A;
    for (const n of ['arm-l', 'arm-r']) { const [d, dx = 0, dy = 0, sk = 1] = [].concat(A[n] ?? 0); A[n] = [d, dx, dy, sk * g.armar]; }
    return A;
  };
  // armarna: vinkar (hej, hej då), en liten "ta-da" när den kommit fram, svänger lite i varje skutt, sticker fram i retningen
  function armar(t, L) {
    // g.retas 'huvud': armarna ner längs kroppen medan huvudet tittar fram, annars kommer armen först (Sanna 2026-11-07)
    if (L.kik) return HUVUD ? { ...stickUt(t, L), 'arm-l': -55, 'arm-r': 55 } : stickUt(t, L);
    if (HUVUD && L.klipp) return { 'arm-l': -55, 'arm-r': 55 };   // bakom en sak: armarna intill kroppen (Sanna 2026-11-07: armen som stack ut såg konstig ut)
    const vink = [T.vinka, T.vinka2].find(([a, b]) => t >= a && t < b);
    if (vink || (t >= T.ga[0] && t < T.ga[1])) {
      const [a, b] = vink ?? T.ga, k = del(a, b, t), upp = Math.min(1, 4 * k, 4 * (1 - k)) ** 0.6;
      // v2 (g.gang): armen sitter bakom kroppen och kit.js trycker ihop vinkeln över 20° (0,29), så 82–190° in blir 38–70° ut,
      // samma vink som uttryck.html (38 + 16·sin, plus glad). Lugnt: ett vink i sekunden (Sanna 2026-11-08). Figurer utan
      // F.armMax stannar vid 55°.
      // g.glad (Hugo, Sanna 2026-11-10: vinket syntes knappt): armen lyfts upp och ut förbi kroppens kant medan den vinkar
      if (vink && g.gang && g.glad) return { 'arm-r': [-upp * (136 + 54 * Math.sin(t * 6)), 20 * upp, -55 * upp, 1 + 0.15 * upp], 'arm-l': 6 * Math.sin(t * 3) };
      if (vink && g.gang) return { 'arm-r': -upp * (136 + 54 * Math.sin(t * 6)), 'arm-l': 6 * Math.sin(t * 3) };
      return { 'arm-r': -upp * (115 + 22 * Math.sin(t * 9)), 'arm-l': 8 * Math.sin(t * 4) };
    }
    const R = T.rundor.find(R => t >= R.tittut && t < R.hopp[1] + 0.3);
    // armar och ben (Sanna 2026-11-07: lammets händer och ben var stela): armarna upp i jubel vid tittut, benen sparkar ut i hoppen
    if (R) {
      const k = over(del(R.tittut, R.tittut + 0.35, t)) * (1 - del(R.hopp[1] - 0.2, R.hopp[1] + 0.3, t)), w = 12 * Math.sin(t * 11) * k;
      const luft = R.hopp && t > R.hopp[0] && t < R.hopp[1] ? Math.sin(Math.PI * del(R.hopp[0], R.hopp[1], t)) : 0;
      return { 'arm-l': [105 * k + w, -22 * k, -8 * k], 'arm-r': [-105 * k + w, 22 * k, -8 * k], 'leg-l': 6 * k + 20 * luft, 'leg-r': -6 * k - 20 * luft };
    }
    if (L.nick) return { 'arm-l': 40, 'arm-r': -40, 'leg-l': 5 * Math.sin(t * 8), 'leg-r': 5 * Math.sin(t * 8) };
    if (g.gang && L.gang != null) {   // gången: benen saxar och foten lyfts, armarna pendlar i otakt (rigg-test.html)
      const f = L.gang;
      // smyg: på tå, foten lyfts högt och sätts ner försiktigt, tassarna uppe framför bröstet
      if (L.smyg) return { 'arm-l': 35, 'arm-r': -35, 'leg-l': [8 * f, 0, -70 * Math.max(0, -f) ** 0.7], 'leg-r': [-8 * f, 0, -70 * Math.max(0, f) ** 0.7] };
      return { 'arm-l': 8 - 20 * f, 'arm-r': -8 - 20 * f, 'leg-l': [16 * f, 0, -40 * Math.max(0, -f)], 'leg-r': [-16 * f, 0, -40 * Math.max(0, f)] };
    }
    if (g.gang && L.hopp > 0) {   // hoppet: armarna ut, fötterna upp under kroppen i luften
      const h = L.hopp;
      return { 'arm-l': 40 * h, 'arm-r': -40 * h, 'leg-l': [0, 0, -30 * h], 'leg-r': [0, 0, -30 * h] };
    }
    if (!L.fas) return { 'arm-l': 4 * Math.sin(t * 2), 'arm-r': -4 * Math.sin(t * 2 + 1) };   // står: armarna andas lite
    const luft = Math.sin(Math.PI * L.fas), mark = clamp(1 - luft * 3);
    // i luften: armarna flaxar ut och benen sparkar isär; vid landningen trycks benen ihop under kroppen
    // och svänger bakåt vid avstampet, framåt inför landningen (åt det håll den skuttar)
    const sving = (L.dir ?? 0) * 16 * Math.cos(Math.PI * L.fas) * luft ** 0.5;
    return { 'arm-l': 10 + 45 * luft, 'arm-r': -10 - 45 * luft, 'leg-l': 22 * luft - 6 * mark + sving, 'leg-r': -22 * luft + 6 * mark + sving };
  }

  // ansiktet: busigt. Stora ögon och öppen mun när den kommer fram, sedan en blinkning med ena ögat och ett flin;
  // en busig blick mot barnet innan den gömmer sig och när den kikar; glad i hej, nicken och hej då
  function ansikte(t, L) {
    const b = BLA.find(([a, c]) => t >= a && t < c);
    if (b) return { ogon: g.glad ? 'open' : 'happy', mun: 0.6 + 0.35 * Math.sin(Math.PI * del(b[0], b[1], t)) };   // Hugo pratar med öppna ögon (Sanna 2026-11-10)
    const R = T.rundor.find(R => t >= R.tittut && t < R.slut);
    if (R) {
      const u = t - R.tittut;
      if (u < 0.4) return { ogon: 'big', mun: 0.9 };
      if (u < 1.6) return { ogon: 'open', mun: 0.55 + 0.15 * Math.sin(u * 18) * (u > 0.7 ? 1 : 0) };   // fnissar
      // öppna ögon och tittar på barnet; glada (stängda) bara medan den fnissar (Sanna 2026-11-10: blundade för ofta)
      const fn = R.fniss2 && t > R.fniss2 && t < R.fniss2 + 0.8;
      return { ogon: fn ? 'happy' : 'open', mun: 0.25 + (fn ? 0.3 : 0), blink: ((t + 0.7) % 3.7) < 0.15 ? 1 : 0 };
    }
    // busig blick, utan att blinka med ena ögat (Sanna 2026-11-07)
    if (L.smyg) return { ogon: 'open', mun: 0, titt: L.titt };   // smyger: stängd mun, tittar mot barnet
    if (L.blick || L.kikar) return { ogon: 'open', mun: 0.35 };
    if (L.nick) return { ogon: 'happy', mun: 0.5 };
    if (g.gang && L.hopp > 0.3) return { ogon: 'big', mun: 0.6 };   // glad i luften, med stora ögon
    const hej = (t >= T.hej && t < T.vinka[1]) || t >= T.vinka2[0];
    if (hej) return { ogon: t > T.fnissHej && t < T.fnissHej + 1.2 ? 'happy' : 'open', mun: t < T.fnissHej + 1.2 ? 0.5 : 0.2 };
    return { ogon: 'open', mun: 0, blink: ((t + 0.7) % 3.7) < 0.15 ? 1 : 0, titt: L.titt };
  }

  // kritord centrerat i x 960 på baslinjen bas; varje bokstav har sina streck (ritas med dashoffset) och sin prick
  function ord(text, bas, s, start, parent) {
    let x = 0; const pos = [];
    for (const ch of text) { if (ch === ' ') { x += 36; continue; } pos.push({ ch, x }); x += GLYF[ch].b + 26; }
    const g = el('g', { transform: `translate(960 ${bas}) scale(${s}) translate(${-(x - 26) / 2} 0)` }, parent);
    const vax = p => el('g', { transform: 'rotate(28)' }, el('g', { filter: 'url(#kort-vax)' }, el('g', { transform: 'rotate(-28)' }, p)));
    // glans (Sanna 2026-11-07): mjuk skugga under, en vit glansrand på varje streck och ett skensvep över ordet när det är skrivet
    const skuggG = el('g', { filter: 'url(#kort-skugga)', opacity: 0.22, transform: 'translate(0 12)' }, g), id = `kort-glans-${start}`;
    const mask = el('mask', { id, maskUnits: 'userSpaceOnUse', x: -400, y: -400, width: x + 800, height: 800 }, defs);
    const bokstaver = pos.map((b, i) => {
      const gl = GLYF[b.ch], farg = FARG[(start + i) % FARG.length], st = { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 2' };
      const tr = `translate(${b.x} 0) rotate(${VRID[(start + i) % VRID.length] * 0.4} ${gl.b / 2} -60)`, p = el('g', { transform: tr }, g);
      const ps = el('g', { transform: tr }, skuggG), pm = el('g', { transform: tr }, mask);
      el('path', { d: gl.d, fill: 'none', stroke: '#fff', 'stroke-width': 40, 'stroke-linecap': 'round' }, pm);
      const streck = [el('path', { ...st, d: gl.d, stroke: '#3a2a1a', 'stroke-width': 46 }, ps), el('path', { ...st, d: gl.d, stroke: '#fff', 'stroke-width': 46 }, p),
        el('path', { ...st, d: gl.d, stroke: farg, 'stroke-width': 32 }, vax(p)),
        el('path', { ...st, d: gl.d, stroke: '#fff', 'stroke-width': 7, opacity: 0.6, transform: 'translate(-5 -6)' }, p)];
      const prick = gl.prick ? [el('circle', { cx: gl.prick[0], cy: gl.prick[1] + 0, r: 30, fill: '#3a2a1a' }, ps), el('circle', { cx: gl.prick[0], cy: gl.prick[1], r: 30, fill: '#fff' }, p),
        el('circle', { cx: gl.prick[0], cy: gl.prick[1], r: 16, fill: farg }, vax(p)), el('circle', { cx: gl.prick[0] - 5, cy: gl.prick[1] - 6, r: 5, fill: '#fff', opacity: 0.7 }, p)] : [];
      if (gl.prick) el('circle', { cx: gl.prick[0], cy: gl.prick[1], r: 20, fill: '#fff' }, pm);
      return { streck, prick, g: p, s: ps, tr, w: gl.b };
    });
    const sken = el('rect', { x: -60, y: -330, width: 70, height: 460, fill: 'url(#kort-sken)', transform: 'skewX(-22)' }, el('g', { mask: `url(#${id})` }, g));
    sken.style.display = 'none';
    bokstaver.glans = k => {   // k 0..1 sveper skenet från vänster till höger
      sken.style.display = k > 0 && k < 1 ? '' : 'none';
      sken.setAttribute('x', (lerp(-260, x + 200, k)).toFixed(1));
    };
    bokstaver.bredd = (x - 26) * s;
    return bokstaver;
  }

  // kortet: introt (skrivs, figuren tittar upp, lyfts bort) och slutet (fälls ner, skrivs, sista tittut, blir slutbilden)
  function kort(t) {
    const K = T.kort, U = T.slut;
    let y = null, skriv, upp, ner;
    const intro = t < K.bort[1];
    if (intro) { y = 0; [skriv, upp, ner] = [K.skriv, K.upp, K.ner]; }
    else if (t >= U.ner[0]) { y = -1250 * (1 - mjuk(del(U.ner[0], U.ner[1], t))); [skriv, upp, ner] = [U.skriv, U.upp, U.dyk]; }
    if (y == null) { papper.style.display = 'none'; return; }
    papper.style.display = '';
    papper.setAttribute('transform', `translate(0 ${y.toFixed(1)})`);
    papper.setAttribute('opacity', intro ? (1 - mjuk(del(K.bort[0], K.bort[1], t))).toFixed(3) : 1);
    // bokstäverna tonar in en i taget, lyfter sig mjukt och blir hela (Sanna 2026-11-07: skrivandet såg hackigt ut)
    const steg = (skriv[1] - skriv[0]) / ORD.length;
    ORD.forEach((b, i) => {
      let k = mjuk(del(skriv[0] + i * steg, skriv[0] + i * steg + 0.7, t)), lyft = (1 - k) * 30, sk = 0.9 + 0.1 * k;
      if (intro) {   // pop: 0 → 1.18 → 1 på 0.3 s
        const q = del(K.slag[i] - 0.06, K.slag[i] + 0.24, t);   // toppen av poppen på slaget
        k = clamp(q * 3); lyft = 0; sk = q < 0.6 ? 1.18 * utE(q / 0.6) : lerp(1.18, 1, mjuk((q - 0.6) / 0.4));
      }
      for (const p of b.streck) { p.style.display = ''; p.setAttribute('stroke-dashoffset', 0); }
      for (const c of b.prick) c.style.display = '';
      for (const el_ of [b.g, b.s]) { el_.setAttribute('opacity', k.toFixed(3)); el_.setAttribute('transform', `translate(0 ${lyft.toFixed(1)}) ${b.tr} translate(${b.w / 2} -90) scale(${sk.toFixed(3)}) translate(${-b.w / 2} 90)`); }
    });
    ORD.glans(intro ? 0 : mjuk(del(skriv[1] + 0.05, skriv[1] + 0.65, t)));
    // gnistor som blinkar till runt ordet när skenet har passerat
    GNISTA.forEach(({ x, y, d, r, el: st }) => {
      if (intro) { st.style.display = 'none'; return; }
      const k = del(skriv[1] + 0.2 + d * 2, skriv[1] + 1.4 + d * 2, t);
      if (k <= 0 || k >= 1) { st.style.display = 'none'; return; }
      const sk = Math.sin(Math.PI * k);
      st.style.display = '';
      st.setAttribute('opacity', (0.85 * sk).toFixed(2));
      st.setAttribute('transform', `translate(${x} ${y}) rotate(${(k * 25).toFixed(1)}) scale(${(r * 0.65 * sk).toFixed(1)})`);
    });
    // slutbilden: ordet flyttar upp och blir mindre, märket tonar in nertill; mitten lämnas fri för slutskärmen
    const s = t >= U.ner[0] ? mjuk(del(U.kort[0], U.kort[1], t)) : 0, cy = ORD_Y - 120;
    const studs = intro ? 1 + 0.07 * Math.sin(Math.PI * del(K.ut, K.ut + 0.26, t)) : 1;   // ordet studsar till på "ut"
    ordG.setAttribute('transform', `translate(960 ${(cy - 330 * s + 6 * s * Math.sin(t * 2.2)).toFixed(1)}) scale(${(lerp(1, 0.55, s) * studs).toFixed(3)}) translate(-960 ${-cy})`);
    MARKE.setAttribute('opacity', s.toFixed(2));
    // figuren tittar upp bakom ordet, så högt att ögonen syns ovanför bokstäverna
    const h = t < upp[0] || t > ner[1] ? 0 : t < upp[1] ? over(del(upp[0], upp[1], t)) : t < ner[0] ? 1 : 1 - inUt(del(ner[0], ner[1], t));
    kortFig.pose({ x: 960 + 8 * Math.sin(t * 3), y: lerp(KLIPP_Y + H + 40, KLIPP_Y - H * 0.02, h), sx: 1, sy: 1, tilt: 3 * h * Math.sin(t * 2.5),
      delar: {}, ogon: h > 0.95 ? 'happy' : 'big', mun: 0.45, titt: 0, blink: 0 });
  }

  // ---------- en bildruta ----------
  function render(t) {
    // introt: sakerna poppar fram när kritan har ritat dem, med glitter; skakar lite när figuren verkligen är där
    for (const [n, t0] of T.intro) {
      const s = SAKER[n], k = t < t0 + 0.6 ? 0 : over(del(t0 + 0.6, t0 + 1.1, t));
      let skak = 0;
      for (const R of T.rundor) if (R.skakar != null && R.ut === s && t > R.skakar) skak += 2.5 * Math.sin((t - R.skakar) * 34) * Math.exp(-4 * (t - R.skakar));
      s.yttre.setAttribute('transform', `translate(${s.x} ${s.y}) rotate(${skak.toFixed(2)}) scale(${k.toFixed(3)}) translate(${-s.x} ${-s.y})`);
    }
    T.intro.forEach(([, t0], i) => GLITTER[i].forEach(({ s, a, r, el: st }, j) => {
      // mjukt glitter: små stjärnor som tonar in och ut, glider lugnt utåt och snurrar sakta
      const k = del(t0 + 0.65 + j * 0.08, t0 + 2.1 + j * 0.08, t);
      if (k <= 0 || k >= 1) { st.style.display = 'none'; return; }
      const rr = s.h * r * (0.6 + 0.3 * mjuk(k)), cx = s.x + Math.cos(a) * rr * 0.9, cy = s.y - s.h * 0.5 + Math.sin(a) * rr - 20 * k;
      const sk = Math.sin(Math.PI * k);
      st.style.display = '';
      st.setAttribute('opacity', (0.85 * sk).toFixed(2));
      st.setAttribute('transform', `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${(k * 30).toFixed(1)}) scale(${(24 * sk).toFixed(1)})`);
    }));
    kort(t);

    // figuren
    const L = lage(t), A = storaArmar(armar(t, L), L), F = ansikte(t, L);
    // g.svans (v2-Lova, Sanna 2026-11-08): svansen vickar lugnt, och viks in bakom kroppen när figuren är gömd,
    // annars sticker spetsen ut vid kanten på en rund sak (bollen)
    if (g.svans && A.tail == null) A.tail = L.klipp || L.kik ? g.svans : 7 * Math.sin(t * 1.8);
    // g.glad (Hugo, Sanna 2026-11-10): svansen viftar fort när den är glad: tittut till rundans slut, hej, nickarna och hej då
    if (g.glad && !L.klipp && !L.kik && (T.rundor.some(R => t >= R.tittut && t < R.slut) || L.nick || (t >= T.hej && t < T.vinka[1]) || t >= T.vinka2[0])) A.tail = 24 * Math.sin(t * 17);
    if (g.ben != null) for (const b of ['leg-l', 'leg-r']) if (typeof A[b] === 'number') A[b] *= g.ben;   // Sanna 2026-11-07: benroten syntes i hoppen
    fig.pose({ x: L.x, y: L.y + L.sjunk, sx: L.sx, sy: L.sy, tilt: L.tilt, delar: A, ogon: F.ogon, vink: F.vink, blink: F.blink ?? 0,
      mun: F.mun, titt: F.titt ?? 0 });
    // bakom en hög sak och över den: alltid masken, i vilket läge den än är (Sanna 2026-11-07: fötterna under svampen)
    const zz = L.z ?? L.y, KL = L.klipp ?? DJUP.find(s => s.hog && zz < s.y && Math.abs(L.x - s.x) < s.w / 2 + figB / 2) ?? null;
    // skuggan: på marken framför sakerna och uppe på en låg sak, inte bakom en sak
    const mark = L.paSak ? L.y : L.z ?? L.y, hojd = Math.max(0, mark - L.y), kh = clamp(1 - hojd / 160);
    skugga.style.display = KL || L.kik ? 'none' : '';
    skugga.setAttribute('cx', L.x.toFixed(1)); skugga.setAttribute('cy', (mark - 4).toFixed(1));
    skugga.setAttribute('rx', (figB * 0.42 * (0.65 + 0.35 * kh)).toFixed(1)); skugga.setAttribute('ry', (20 * (0.65 + 0.35 * kh)).toFixed(1));
    skugga.setAttribute('opacity', (0.38 * (0.45 + 0.55 * kh)).toFixed(3));
    // djupet: sakerna som står längre fram än figuren (och saken den gömmer sig bakom) ritas framför den
    const z = zz, fram = DJUP.find(s => s === KL || s.y > z);
    const fore = fram ? fram.yttre : null;
    if (figurG.nextSibling !== fore) sakerG.insertBefore(figurG, fore);
    // bakom en sak: masken följer sakens överkant, så att inget syns nedanför den när figuren sjunker
    if (KL) {
      const s = KL, golv = s.hog ? s.y - 75 : Math.max(s.y, z) + 4;   // hög sak: inget nedanför foten (Sanna 2026-11-07: fötterna under svampen)
      const f1 = n => n.toFixed(1), rr = s.hog ? s.rr.filter(([y]) => y + 4 < golv) : null;   // hålet slutar vid golv, annars syns en rand under foten (evenodd)
      const hal = s.hog ? 'M' + rr.map(([y, l]) => `${f1(l + 3)} ${f1(y + 4)}`).join('L') + 'L' + [...rr].reverse().map(([y, , r2]) => `${f1(r2 - 3)} ${f1(y + 4)}`).join('L') + 'Z' : 'M' + s.kontur.map(([x, y]) => `${x.toFixed(1)} ${Math.min(y, golv).toFixed(1)}`).join('L') + `L${s.kontur.at(-1)[0].toFixed(1)} ${golv}L${s.kontur[0][0].toFixed(1)} ${golv}Z`;
      klipp.setAttribute('d', `M-2000 -2000H4000V${golv}H-2000Z ${hal}`);
      figurG.setAttribute('clip-path', 'url(#tittut-klipp)');
    } else figurG.removeAttribute('clip-path');

    // kameran: följer leken lugnt, närmare gömstället i varje runda och närmast i hej och hej då (ettåringar ser figuren stort)
    let i = KAMERA.findIndex(k => k[0] > t);
    if (i < 0) i = KAMERA.length - 1;
    const [t0, x0, y0, z0] = KAMERA[Math.max(0, i - 1)], [t1, x1, y1, z1] = KAMERA[i], q = mjuk(del(t0, t1, t));
    const kx = lerp(x0, x1, q) * S, ky = lerp(y0, y1, q) * S, kz = lerp(z0, z1, q);
    kit.kamera(kx, ky, kz);
    if (naraG) {   // samma kamera, men förflyttningen från mitten gånger NARA (närmare kameran = rör sig mer)
      const W = kit.W, Hh = kit.H, z = kz * 1.012, hw = W / 2 / z, hh = Hh / 2 / z;
      const cx = clamp(kx, hw, W - hw), cy = clamp(ky, hh, Hh - hh);
      naraG.setAttribute('transform', `translate(${W / 2} ${Hh / 2}) scale(${z}) translate(${-(W / 2 + (cx - W / 2) * NARA)} ${-(Hh / 2 + (cy - Hh / 2) * NARA)})`);
    }
  }

  kit.kor(render, DURATION);
  for (const c of ljud) if (c.fil && await finns(c.fil)) window.LJUD.push(c);
  window.TIDER = T; T.saker = SAKER; T.lage = lage;
}

window.tittut = tittut;
})();
