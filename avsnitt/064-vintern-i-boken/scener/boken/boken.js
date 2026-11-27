// 064 Vintern i boken, grind 6: hela scenen i Kritans bok. Uppslaget som storyboarden (storyboard/scen.js, grind 5 godkänd),
// motorn som 063 (avsnitt/063-hosten-i-boken/scener/boken/boken.js): korten, kritan, kaninens v2-rigg på ett kort, kameran som vyer.
// Snön i kod: kullarna, granarna och trädet har en snöfri och en snöig bild (kod/vinter.js, prov/trad/trad.js), och snön växer in
// uppifrån (marken nerifrån) i rad 05b. Fåglarna är 043:s fagel.js. Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/064-vintern-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { duk, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { $, k01, lerp, mjuk, bump, reser, v3, rader, scenen, bild, lad, ruta, dataUrl, kontur, bredareC, mat, mark, vik, stall, kortmotor,
  PARM, fallning, figurKort, vink, gaRikt, kritan, ljuset, djupskarpa, kamera, starta } from '/produktion/three-rum/popupbok/uppslag.js';
import { kaltTrad, sittplats, W as TW, H as TH } from '/avsnitt/064-vintern-i-boken/prov/trad/trad.js';
import { granSno, kulleSno, frost } from '/avsnitt/064-vintern-i-boken/kod/vinter.js';

// ---- raderna ----
const RD = rader(await import('/avsnitt/064-vintern-i-boken/storyboard/rader.mjs')), { RAD, S, LN, MAL, SVAR, DURATION, rad, GLES, MATTA } = RD;
const ORD = { snoflinga: 0.37, knarr1: 0.06, knarr2: 0.73, plopp1: 0.05, plopp2: 0.15, snoboll: 1.2, stor: 0.22, mellan: 1.11, liten: 2.4,
  en: 0.06, tva: 0.72, tre: 1.15, rod: 0.26, bla: 0.27, gul: 0.49, snogubbe: 0.75 };   // samma som rader.mjs (whisper)

// ---- renderaren ----
const SC = scenen(), { scen, cam } = SC;

// ---- bilderna ----
const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const [HIMMEL, MOLN1, MOLN2, MOLN3, SNOBOLL, GUBBE, TUSS] = await Promise.all([
  ...['himmel', 'moln-stor', 'moln-mellan', 'moln-liten'].map(n => P + n + '.png'),
  RQ + 'snoboll/cut/snoboll.png', RQ + 'snogubbe/cut/snogubbe.png', RQ + 'snotuss/cut/snotuss.png'].map(lad));
const [GRAN_I, KBAK_I, KFRAM_I, FLINGA_I, PB_I] = await Promise.all([B + 'skogen-gron-saker/gran.png', P + 'kulle-bak.png', P + 'kulle-fram.png',
  RQ + 'snoflinga/cut/snoflinga.png', RQ + 'pannband/cut/pannband.png'].map(bild));
const FLINGA = tex(trim(FLINGA_I)), PANNBAND = tex(trim(PB_I));
const KONTUR = Object.fromEntries(await Promise.all([['flinga', 'snoflinga/cut/snoflinga-kontur-skarp.json'], ['pannband', 'pannband/cut/pannband-kontur.json']].map(async ([n, f]) => [n, await kontur(RQ + f)])));
const FLINGA_URL = await dataUrl(RQ + 'snoflinga/cut/snoflinga.png'), PB_URL = await dataUrl(RQ + 'pannband/cut/pannband.png');

// ---- snön på korten: en snöfri bild (A) och en snöig (B) i samma ruta; snön växer in uppifrån (marken: nerifrån) ----
function union(A, Bc) {   // beskär båda till det som syns i någon av dem
  let y0 = A.height, y1 = 0, x0 = A.width, x1 = 0;
  for (const c of [A, Bc]) { const a = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (u < x0) x0 = u; if (u > x1) x1 = u; } }
  return [A, Bc].map(c => { const ut = duk(x1 - x0 + 3, y1 - y0 + 3); ut.getContext('2d').drawImage(c, x0 - 1, y0 - 1, ut.width, ut.height, 0, 0, ut.width, ut.height); return ut; });
}
function snoBild(A, Bc, nerifran = false) {
  const c = duk(A.width, A.height), x = c.getContext('2d'), tmp = duk(A.width, A.height), y = tmp.getContext('2d'), T = tex(c); let kk = -1;
  const satt = k => { k = Math.round(k01(k) * 90) / 90; if (k === kk) return; kk = k; const Hh = A.height, mj = 0.1;
    x.clearRect(0, 0, c.width, c.height); x.drawImage(A, 0, 0);
    if (k >= 1) x.drawImage(Bc, 0, 0);
    else if (k > 0) { y.globalCompositeOperation = 'source-over'; y.clearRect(0, 0, c.width, c.height); y.drawImage(Bc, 0, 0);
      const e = k * (1 + mj), g = y.createLinearGradient(0, 0, 0, Hh);
      const s0 = k01(e - mj), s1 = k01(e); if (nerifran) { g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(Math.min(0.999, 1 - s1 + 1e-4), 'rgba(0,0,0,0)'); g.addColorStop(Math.min(1, 1 - s0), '#000'); g.addColorStop(1, '#000'); }
      else { g.addColorStop(0, '#000'); g.addColorStop(s0, '#000'); g.addColorStop(Math.min(1, Math.max(s0 + 1e-4, s1)), 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0)'); }
      y.globalCompositeOperation = 'destination-in'; y.fillStyle = g; y.fillRect(0, 0, c.width, c.height); x.drawImage(tmp, 0, 0); }
    T.needsUpdate = true; };
  satt(0); return { T, satt };
}
const GRAN_S = snoBild(...union(granSno(GRAN_I, 0), granSno(GRAN_I, 1)));
const KBAK_S = snoBild(bredareC(kulleSno(KBAK_I, 0), 5.2), bredareC(kulleSno(KBAK_I, 1), 5.2));
const KFRAM_S = snoBild(bredareC(kulleSno(KFRAM_I, 0), 6.2), bredareC(kulleSno(KFRAM_I, 1), 6.2));
const TRAD_S = snoBild(kaltTrad({ sno: 0 }), kaltTrad({ sno: 1 }));   // otrimmat, så att sittplats() stämmer
const MARK_S = snoBild(mark('#9DB39A', '#B2C4AE', '#879E86'), mark('#F7F9FC', '#FFFFFF', '#DCE6F2'), true);

skrivbord(scen);
const { insida, satt } = await skapaBok(scen, { farg: '#3F7FC4', figur: FLINGA.image, doodles: true, oppna: PARM });

// ---- uppslaget (som storyboarden) ----
const { kort, platt, pa } = kortmotor(scen, insida, { kskugga: ['40,50,70', 0.36, 0.14] });
// kortet byter inte bild när snön växer: snoBild ritar om samma canvas (texturen), djupmaterialet följer med
const BAK = [kort(KBAK_S.T, 2.15 / 5.2, 0, -0.6), kort(KFRAM_S.T, 1.95 / 6.2, 0.05, -0.47)];
const VHIMMEL = (() => { const c = frost(HIMMEL.image), x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.35; x.fillStyle = '#F2F6FA'; x.fillRect(0, 0, c.width, c.height); return tex(bredareC(c, 1.5)); })();
pa(VHIMMEL, 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3);   // vinterhimmel: blekare, kallare
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.36, 1.08], [MOLN3, 0.13, 0.66, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
const FL = { x: 0.12, upp: 1.12, h: 0.26 };   // snöflingan på himlen (kritans första teckning)
const FLINGAN = pa(FLINGA, FL.h, FL.x, FL.upp, 0.012);
const GRANAR = [[-0.7, -0.2, 0.62], [-0.93, -0.3, 0.5]].map(([x, z, h]) => kort(GRAN_S.T, h, x, z));
const TR = { x: 0.4, z: -0.16, h: 0.8 }, TRADET = kort(TRAD_S.T, TR.h, TR.x, TR.z, { vaj: 1 }), TS = TR.h / TH;
const MARKEN = platt(MARK_S.T, 2.26, 0, 0.0, 1.5, SIDA + 0.0004);

// ---- fåglarna (043:s fagel.js) på trädets grenar: barn till trädkortet, så att de fälls upp och ner med det ----
const FB = { x: -150, y: -330, w: 1100, h: 1050 }, FE = 0.07 / 689, FAGEL_F = ['rod', 'bla', 'gul'];
const FAGEL_URL = await Promise.all(FAGEL_F.map(f => dataUrl(`${RQ}smafaglar/cut/fagel-kropp-${f}-kod.png`)));
const FAGLAR = FAGEL_F.map((f, i) => {
  const c = duk(440, 420), T = tex(c), g = new THREE.PlaneGeometry(FB.w * FE, FB.h * FE);
  g.translate((FB.x + FB.w / 2 - 400) * FE, (689 - (FB.y + FB.h / 2)) * FE, 0);   // origo i fötterna
  const m = new THREE.Mesh(g, mat(T, { alphaTest: 0.5, side: THREE.DoubleSide })); m.castShadow = true;
  m.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: T, alphaTest: 0.5 });
  TRADET.m.add(m); return { f, i, c, T, m, nyckel: '', img: new Image() };
});
async function ritaFagel(F, o) {   // ritar om bara när läget ändras
  const q = { flax: +o.flax.toFixed(2), oppen: +o.oppen.toFixed(2), blink: +o.blink.toFixed(1), t: o.flax > 0.01 ? +o.t.toFixed(3) : 0 }, n = JSON.stringify(q);
  if (n === F.nyckel) return; F.nyckel = n;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FB.x} ${FB.y} ${FB.w} ${FB.h}" width="440" height="420">${window.fagelSvg(F.f, { ...q, href: FAGEL_URL[F.i] })}</svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); F.img.src = url; await F.img.decode(); URL.revokeObjectURL(url);
  const x = F.c.getContext('2d'); x.clearRect(0, 0, 440, 420); x.drawImage(F.img, 0, 0, 440, 420); F.T.needsUpdate = true;
}
const tradLokal = p => v3((p.x - TW / 2) * TS, (TH - p.y) * TS, 0.004);   // trädets px → trädkortets egna koordinater

// ---- kaninen: v2-riggen på ett kort ----
const NS = 'http://www.w3.org/2000/svg';
const L = await v2rigg('kaninen-kanel'), FOT = L.FOTTER || 947, TOPP = 31, G = L.figur(512, FOT, 1, $('figurer'));
// öronen i egna grupper (som 039), så att frosten och snöflingorna på spetsarna följer örat
const SPETS = { l: [316, 36], r: [706, 36] };
G.querySelectorAll('image.ear-l, image.ear-r').forEach(img => {
  const klass = img.getAttribute('class'), s = klass.at(-1), grupp = document.createElementNS(NS, 'g');
  grupp.setAttribute('class', klass); img.setAttribute('class', 'ora-bild'); img.replaceWith(grupp); grupp.appendChild(img);
  const [x, y] = SPETS[s];
  $('defs').insertAdjacentHTML('beforeend', `<mask id="oramask-${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><image href="${img.getAttribute('href')}" width="1024" height="1024" filter="url(#oraform)"/></mask>`);
  grupp.insertAdjacentHTML('beforeend', `<radialGradient id="frostg-${s}" gradientUnits="userSpaceOnUse" cx="${x}" cy="${y}" r="150"><stop offset="0" stop-color="#C4DAF4"/><stop offset="0.55" stop-color="#C4DAF4" stop-opacity="0.6"/><stop offset="1" stop-color="#C4DAF4" stop-opacity="0"/></radialGradient>
    <rect class="frost" x="${x - 160}" y="${y - 20}" width="320" height="200" fill="url(#frostg-${s})" opacity="0" mask="url(#oramask-${s})"/>
    <g class="oronsno">${[[-14, 6, 15], [12, 2, 13], [0, -10, 12]].map(([dx, dy, r], i) => `<g class="flk" data-i="${i}" data-x="${x + dx}" data-y="${y + dy}">
      <circle r="${r + 6}" fill="#fff"/><circle cy="3" r="${r}" fill="#C9DAEE"/><circle cy="-1" r="${r - 2}" fill="#F7F9FC"/></g>`).join('')}</g>`);
});
// pannbandet på huvudet (039:s kodband, klader-lager/pannband.png: bandet x 304–714, y 209–324), i kroppen efter magen så att det följer huvudet
G.querySelector('.mage').insertAdjacentHTML('afterend', `<g id="band" display="none"><image href="/avsnitt/039-kaninen-aker-pulka/klader-lager/pannband.png" width="1024" height="1024"/></g>`);
// lika hög som kanel.png-kortet i storyboarden (0,34)
const KANKORT = await figurKort(scen, cam, L, G, { fot: FOT, topp: TOPP, hojd: 0.34 }), { m: kanin, fig2varld, BL, nick } = KANKORT;
L.rita(G, L.NEUTRAL, L.POSE0);

// ---- pannbandets kort, snöbollarna, snögubben, snötussen ----
const PBPOS = [-0.18, 0.36], PBW = 0.16;
const PBKORT = kort(PANNBAND, PBW * PANNBAND.image.height / PANNBAND.image.width, ...PBPOS, { y: SIDA + 0.003 });
const BOLLPOS = [[-0.2, 0.2, 0.15], [-0.34, 0.2, 0.115], [-0.45, 0.2, 0.085]];
const BOLLAR = BOLLPOS.map(([x, z, h]) => kort(SNOBOLL, h, x, z, { flik: false }));
const SNOGUBBEN = kort(GUBBE, 0.36, -0.32, 0.17);
const TUSSEN = kort(TUSS, 0.06, 0, 0, { flik: false });
// spåren: fotspåren (rad 06c) och bollarnas rullspår (rad 15–15c), ljusblå i snön
const SPAR_TEX = (() => { const c = duk(64, 96), x = c.getContext('2d'); x.fillStyle = 'rgba(160,188,220,0.85)'; x.beginPath(); x.ellipse(32, 48, 22, 34, 0, 0, Math.PI * 2); x.fill(); return tex(c); })();
const sparMat = () => new THREE.MeshBasicMaterial({ map: SPAR_TEX, transparent: true, depthWrite: false, opacity: 0 });
const PLATS = { mitt: [-0.08, 0.2], steg: [0.06, 0.24], bollar: [0.04, 0.26], gran: [-0.48, 0.06], trad: [0.16, 0.1], 'vid-bollar': [0.06, 0.3], 'mot-trad': [-0.2, 0.1] };
const SPAR = [0.2, 0.45, 0.7].flatMap((u, i) => [-1, 1].map(s => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.03), sparMat());
  m.rotation.x = -Math.PI / 2; m.rotation.z = Math.PI / 2; m.position.set(lerp(PLATS.mitt[0], PLATS.steg[0], u) + s * 0.012, SIDA + 0.0016, lerp(PLATS.mitt[1], PLATS.steg[1], u) + 0.01 + s * 0.012);
  m.userData.u = u + (s > 0 ? 0.08 : 0); scen.add(m); return m; }));
const RULLSPAR = BOLLPOS.map(([x, z, h]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: '#B4CBE6', transparent: true, opacity: 0, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.y = SIDA + 0.0014; scen.add(m); return m; });

// snöfallet: platta kritflingor (små vita sprites med mjuk kant) som faller lugnt och vajar; de som når marken börjar om uppe
const FLINGA_TEX = (() => { const c = duk(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 4, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.6, 'rgba(255,255,255,0.9)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return tex(c); })();
let fro = 11; const sl = () => (fro = (fro * 9301 + 49297) % 233280) / 233280;
const SNOFALL = Array.from({ length: 150 }, () => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLINGA_TEX, depthWrite: false, transparent: true }));
  m.userData = { x: -1.1 + 2.2 * sl(), z: -0.45 + 0.95 * sl(), fas: sl(), fart: 0.07 + 0.05 * sl(), s: 0.008 + 0.01 * sl(), v: sl() * 6 }; m.visible = false; scen.add(m); return m; });
// små vita moln: andedräkten vid nosen (rad 07, 07b) och snöpuffar vid fötterna (skutten rad 06b, bollarna)
const puff = () => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0, depthWrite: false })); m.visible = false; scen.add(m); return m; };
const ANDE = puff(), FOTPUFF = Array.from({ length: 6 }, puff);

// ---- ljuset (blekt vinterljus) och skärpedjupet ----
ljuset(scen, { himmel: ['#F4F8FF', '#C8D2DC', 2.3], sol: ['#FFF6EA', 2.0], hojd: 4.4 });
const DOF = djupskarpa(SC);

// ---- tiderna ----
const OPPNA = S('01b'), STANG = S('26');
const SNO = [S('05b') + 0.5, S('05b') + 5.0];                 // snön växer in (rad 05b, ca 4,5 s)
const KANIN_UPP = S('06') + 0.2;
const FL_KLAR = S('04') + 0.6;                                // snöflingan på himlen är ifylld
const PB_KLAR = S('09') + 0.6, PB_UPP = S('09') + 0.85;       // pannbandet ifyllt, kortet reser sig (pop 0,85)
const PB_GLID = [S('11') + 0.15, S('11') + 1.15], PB_PA = PB_GLID[1] + 0.45;   // glider till huvudet, bandet glider ner över öronen
const PLOPP = [MAL('12', 20) + ORD.plopp1, MAL('12b', 21) + ORD.plopp2];
const ORONSNO = [S('07') + 0.2, PB_GLID[1] + 0.1];            // flingorna på öronspetsarna: landar, faller av när bandet kommer
const FROST = [S('07') + 1.0, S('13') + 0.4];                 // spetsarna frostblå
const DARR = [S('07') + 1.3, S('08') + 0.2];                  // huttrar
const ANDAS = [S('07') + 0.8, S('08')];                       // andedräkten
const ROLL = ['15', '15b', '15c'].map((id, i) => ({ i, a: S(id) + 0.15, b: MAL(id, 26) + ORD.snoboll }));   // bollen stannar på "snöboll"
const GUBBE_UPP = MAL('22', 37) + ORD.snogubbe;
const TU = { a: S('17') + 0.25, land: S('17') + 1.0, skak: MAL('17', 29) + LN(29) + 0.5, ner: MAL('17', 29) + LN(29) + 1.3 };
const VINK = (id, n, d = 1.8) => [MAL(id, n) + 0.3, d];

// ---- kaninens platser och rörelser ----
const GA = [   // går lugnt: [start, slut, från, till, skutt]
  [S('06c') + 0.15, S('06c') + 2.6, PLATS.mitt, PLATS.steg, false],
  [S('15') - 0.9, S('15') + 0.05, PLATS.steg, PLATS.bollar, false],
  [MAL('16b', 28) + LN(28) + 0.15, MAL('16b', 28) + LN(28) + 1.75, PLATS.bollar, PLATS.gran, false],
  [S('19b') + 0.5, S('19b') + 1.0, PLATS.gran, PLATS['mot-trad'], false],   // utanför bild (trädet i närbild)
  [S('20') + 0.05, S('20') + 1.1, PLATS['mot-trad'], PLATS.trad, true],
  [S('21') - 0.6, S('21') - 0.05, PLATS.trad, PLATS['vid-bollar'], false],   // utanför bild (efter vinken, före klippet)
];
const SKUTT = [SVAR('06b', 10) + 0.25, SVAR('06b', 10) + 0.85];   // två små skutt på stället
function kaninPos(t) {
  let [x, z] = PLATS.mitt, y = 0;
  for (const [a, b, f, g, sk] of GA) { if (t >= b) [x, z] = g; else if (t >= a) { const u = (t - a) / (b - a), m = mjuk(u);
    x = lerp(f[0], g[0], m); z = lerp(f[1], g[1], m); y = sk ? 0.03 * Math.abs(Math.sin(Math.PI * 2 * u)) : 0.006 * Math.abs(Math.sin(Math.PI * 5 * u)); } }
  for (const s of SKUTT) if (t > s && t < s + 0.4) y = 0.035 * Math.sin(Math.PI * (t - s) / 0.4);
  return [x, y, z];
}
// öronen ploppar ut ur bandet (039): ihoptryckta −14 → ut med en liten efterstudsning
const plopp = (t, a) => t < a ? -14 : t < a + 0.25 ? lerp(-14, 5, mjuk((t - a) / 0.25)) : 5 * Math.exp(-(t - a - 0.25) * 7) * Math.cos((t - a - 0.25) * 14);
const REAKTION = { '06': 'jatteglad', '06b': 'kawaii', '06c': 'glad', '07b': 'nyfiken', '09': 'kawaii', '10': 'jatteglad', '11': 'forvanad',
  '12b': 'skrattar', '13': 'kawaii', '14': 'jatteglad', '15': 'ivrig', '15b': 'jatteglad', '15c': 'skrattar', '16': 'kawaii', '16b': 'jatteglad',
  '17': 'fnissig', '18': 'nyfiken', '20': 'jatteglad', '21': 'nyfiken', '22': 'skrattar', '23': 'kawaii' };
function kaninen(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  switch (id) {
    case '06': { const [a, d] = VINK('06', 9, 2.2); [f, p] = vink(f, p, t - a, d); break; }
    case '06b': { const s = SVAR('06b', 10); f = { ...B('nyfiken'), titt: [14 * Math.sin(tl * 1.6) * (1 - mjuk((t - s + 0.6) / 0.5)), 6 * (1 - mjuk((t - s + 0.6) / 0.5))] };
      p.rikt = 0.35 * Math.sin(tl * 1.6) * (1 - mjuk((t - s + 0.6) / 0.5)); f = L.blanda(f, 'jatteglad', bump(s, s + 1.6, t)); break; }
    case '06c': f = { ...B('glad'), titt: [10, 4] }; break;
    case '07': case '07b': { const k = mjuk((t - S('07') - 0.8) / 0.8); f = L.blanda(f, { ...B('nyfiken'), titt: [0, -12] }, 0.5 * bump(S('07') + 0.3, S('07') + 2.0, t));   // tittar upp på flingorna
      f = L.blanda(f, 'ledsen', 0.3 * k); p.oron = [10 * k, 10 * k]; p = L.blandaPose(p, 'magen', 0.7 * k);
      if (id === '07b') { f = L.blanda(f, { ...B('nyfiken'), titt: [0, 0] }, 0.5); [f, p] = nick(f, p, t - SVAR('07b', 14));
        f = L.blanda(f, B('nyfiken'), mjuk((t - MAL('07b', 15) - LN(15)) / 0.3)); } break; }
    case '08': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-12, 8]; p.rikt = -0.35; p.oron = [8, 8]; break;
    case '09': f = L.blanda(L.blanda(B('nyfiken'), 'kawaii', mjuk((t - PB_KLAR) / 0.4)), 'jatteglad', bump(PB_UPP, PB_UPP + 1.4, t)); f.titt = [-12, 6]; p.rikt = -0.35; p.oron = [8 * (1 - mjuk((t - PB_UPP) / 0.5)), 8 * (1 - mjuk((t - PB_UPP) / 0.5))]; break;
    case '10': [f, p] = nick({ ...f, titt: [0, 0] }, p, t - SVAR('10', 18)); break;
    case '11': { const u = k01((t - PB_GLID[0]) / (PB_GLID[1] - PB_GLID[0])); f = { ...B('nyfiken'), titt: [lerp(-12, 0, mjuk(u)), lerp(6, -14, mjuk(u))] };
      p.upp = 0.4 * mjuk(u) * (1 - mjuk((t - PB_PA - 0.2) / 0.4)); f = L.blanda(f, 'forvanad', mjuk((t - PB_PA + 0.1) / 0.3)); break; }
    case '12': { f = L.blanda(B('forvanad'), { ...B('nyfiken'), titt: [-12, -14] }, mjuk((t - PLOPP[0] - 0.1) / 0.4)); p.luta = 4 * mjuk((t - PLOPP[0] - 0.2) / 0.5); p.upp = 0.35 * mjuk((t - PLOPP[0] - 0.1) / 0.4); break; }
    case '12b': f = L.blanda({ ...B('nyfiken'), titt: [-12, -14] }, 'fnissig', mjuk((t - PLOPP[1] - 0.2) / 0.3)); p.upp = 0.35 * (1 - mjuk((t - PLOPP[1]) / 0.4)); break;
    case '13': { const k = bump(SVAR('13', 22) - 0.1, MAL('13', 23) + 0.3, t, 0.4); f = L.blanda(f, { ...B('glad'), glad: [1, 1], streck: 0 }, k); p.luta = (p.luta || 0) + 3 * k;
      p.oron = [-8 * mjuk((t - S('13') - 0.3) / 0.8), -8 * mjuk((t - S('13') - 0.3) / 0.8)]; break; }
    case '14': f = { ...B('nyfiken'), titt: [-12, 4] }; p.rikt = -0.4 * (1 - mjuk((t - MAL('14', 24) - LN(24) + 0.1) / 0.4)); [f, p] = nick(f, p, t - SVAR('14', 24)); break;
    case '15': case '15b': case '15c': { const R0 = ROLL[['15', '15b', '15c'].indexOf(id)], k = bump(R0.a - 0.2, R0.b + 0.15, t, 0.3);
      p = L.blandaPose(p, 'vanster', k); p.armar = [p.armar[0] + 18 * k, p.armar[1] + 18 * k]; p.luta = (p.luta || 0) - 3 * k; f = { ...B('glad'), titt: [-14, 6] };
      f = L.blanda(f, 'jatteglad', bump(R0.b, R0.b + 1.2, t)); break; }
    case '16': case '16b': f = { ...B('glad'), titt: [-14, 6] }; p.rikt = -0.4; break;
    case '17': { const land = mjuk((t - TU.land) / 0.2), sk = TU.skak;
      f = L.blanda(B('glad'), { ...B('forvanad'), titt: [0, -16] }, land * (1 - mjuk((t - sk - 0.2) / 0.3))); p.upp = 0.4 * land * (1 - mjuk((t - sk) / 0.3));
      if (t > sk && t < sk + 1.2) [f, p] = L.skakaHuvud(f, p, t - sk, 1.2, 1.0);
      f = L.blanda(f, 'fnissig', mjuk((t - sk - 1.0) / 0.3)); break; }
    case '18': { const k = mjuk((tl - 0.3) / 0.4); f = { ...B('nyfiken'), titt: [12 * k, -6 * k] }; p.rikt = 0.35 * k; p.oron = [-6 * k, 14 * k]; p.luta = 2 * k; break; }
    case '20': { f = { ...B('glad'), titt: [12, -14] }; p.upp = 0.45 * mjuk((tl - 1.1) / 0.4); p.rikt = 0.3;
      const a = SVAR('20', 35) - 0.1; [f, p] = vink(f, p, t - a, 2.0); f = L.blanda(f, 'jatteglad', bump(a, a + 2.0, t)); break; }
    case '21': f = { ...B('nyfiken'), titt: [-14, 6] }; p.rikt = -0.45; break;
    case '22': { const a = MAL('22', 37) + LN(37) + 0.1; f = L.blanda({ ...B('nyfiken'), titt: [-14, 0] }, 'jatteglad', mjuk((t - GUBBE_UPP) / 0.3)); p.rikt = -0.45 * (1 - mjuk((t - a) / 0.4));
      const h = bump(a, a + 1.2, t, 0.2), sl = Math.abs(Math.sin(Math.PI * 2.5 * (t - a))); p = L.blandaPose(p, 'hurra', h * (0.4 + 0.6 * sl)); break; }   // klappar: armarna upp i takt
    case '23': [f, p] = nick({ ...f, titt: [0, 0] }, p, t - SVAR('23', 38)); break;
  }
  if (id === '24' || id === '25') { const n = id === '24' ? 39 : 43; [f, p] = vink({ ...B('jatteglad') }, p, t - MAL(id, n), r.d - 0.4, true); }
  // öronen: ihoptryckta under bandet tills de ploppar ut ett i taget (bildens vänstra först)
  if (t >= PB_PA - 0.35 && t < S('13')) { const k = mjuk((t - PB_PA + 0.35) / 0.35); p.oron = [lerp(p.oron[0], plopp(t, PLOPP[0]), k), lerp(p.oron[1], plopp(t, PLOPP[1]), k)]; }
  // fryser: darrar lätt
  const darr = bump(DARR[0], DARR[1], t, 0.3); if (darr > 0) { p.luta = (p.luta || 0) + darr * 1.2 * Math.sin(2 * Math.PI * 7 * t); p.strack = (p.strack || 0) - 0.02 * darr; }
  const gr = gaRikt(GA, t, 0.8); if (gr) { p.rikt = gr; f = { ...f, titt: [12 * Math.sign(gr), 2] }; }   // går i riktningsposen, speglas aldrig
  for (const s of SKUTT) { p = L.blandaPose(p, 'huka', bump(s - 0.25, s + 0.02, t, 0.12) + 0.6 * bump(s + 0.38, s + 0.6, t, 0.1)); }
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

async function ritaKanin(t) {
  const [f, p] = kaninen(t); L.rita(G, f, p);
  // bandet: glider ner över öronen (150 px på 0,45 s), sitter kvar till slutet
  const band = t >= PB_GLID[1]; $('band').setAttribute('display', band ? 'inline' : 'none');
  if (band) $('band').setAttribute('transform', `translate(0 ${(-150 * (1 - mjuk((t - PB_GLID[1]) / 0.45))).toFixed(1)})`);
  // frosten och flingorna på öronspetsarna
  const fr = 0.5 * mjuk((t - FROST[0]) / 1.2) * (1 - mjuk((t - FROST[1]) / 1.0));
  G.querySelectorAll('.frost').forEach(e => e.setAttribute('opacity', fr.toFixed(3)));
  G.querySelectorAll('.flk').forEach(e => { const i = +e.dataset.i, x0 = +e.dataset.x, y0 = +e.dataset.y, a = ORONSNO[0] + i * 0.45, u = k01((t - a) / 0.9), av = k01((t - ORONSNO[1] - i * 0.05) / 0.6);
    const vis = t > a && av < 1; e.setAttribute('display', vis ? 'inline' : 'none'); if (!vis) return;
    e.setAttribute('transform', `translate(${(x0 + 30 * Math.sin(u * 5 + i) * (1 - u) + 40 * av).toFixed(1)} ${(y0 - 160 * (1 - mjuk(u)) + 220 * av * av).toFixed(1)}) scale(${(0.6 + 0.4 * mjuk(u)).toFixed(2)})`);
    e.setAttribute('opacity', (1 - av).toFixed(2)); });
  await KANKORT.textur(t);
}

// ---- korten: upp när boken öppnas, ner när den stängs (det främsta först, så att inget går genom något) ----
const FALL = fallning(satt, OPPNA, STANG);
const ORDNING = FALL.upp([...BAK, ...GRANAR, TRADET]);
KANKORT.upp = KANIN_UPP; SNOGUBBEN.upp = GUBBE_UPP;
KANKORT.z = PLATS['vid-bollar'][1];   // där kaninen står när boken stängs
FALL.ner([...ORDNING, KANKORT, SNOGUBBEN]);

// ---- kritan ritar ----
const KR = kritan(cam), { glimt } = KR;
{ const a = S('03'), b = S('04'), c = S('08'), d = S('09'), va = MAL('03', 5) + 0.3, vc = MAL('08', 16) + LN(16) - 0.2;
  KR.teckning('flinga', FLINGA_URL, KONTUR.flinga, ruta(FLINGA_I), () => FLINGAN,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, va - 0.2], vanta: [va, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, FL_KLAR], [240, 40]);
  KR.teckning('pannband', PB_URL, KONTUR.pannband, ruta(PB_I), () => PBKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, vc - 0.2], vanta: [vc, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, PB_KLAR], [260, -60]); }

// ---- en bildruta ----
const nivaSnofall = t => { const r = rad(t), n = [0, 60, 150][r.st.snofall], f = RAD[RAD.indexOf(r) - 1], n0 = f ? [0, 60, 150][f.st.snofall] : 0; return lerp(n0, n, mjuk((t - r.s) / 1.5)); };
const FAGEL_ORD = [MAL('19b', 32) + ORD.rod, MAL('19b', 33) + ORD.bla, MAL('19b', 34) + ORD.gul];
const FAGEL_PIP = [[S('18') + 0.1, 1], [S('18') + 0.7, 2], [S('18') + 1.4 + LN(30) + 1.8, 0], ...FAGEL_ORD.map((t, i) => [t - 0.05, i]),
  ...[0.7, 1.0, 1.3].map((o, i) => [MAL('20', 35) + LN(35) + o, i]), [MAL('24c', 41) + 0.3, 0], [MAL('24c', 41) + 0.45, 1], [MAL('24c', 41) + 0.6, 2]];
const FAGEL_LYFT = [[S('19') + 0.5, 0], [S('19') + 0.65, 1], [S('19') + 0.8, 2], ...FAGEL_ORD.map((t, i) => [t, i]), [MAL('24c', 41) + 0.25, 0], [MAL('24c', 41) + 0.4, 1], [MAL('24c', 41) + 0.55, 2]];
async function bildruta(t) {
  FALL.parm(t);
  { const [x, y, z] = kaninPos(t); kanin.position.set(x, KANKORT.y + y, z); }   // först: tussen och pannbandet räknar mot kaninen
  for (const k of [...ORDNING, SNOGUBBEN]) {
    stall(k, FALL.e(k, t));
    if (k.vaj !== undefined) k.m.rotation.z = 0.015 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  SNOGUBBEN.m.visible = t >= GUBBE_UPP;
  SNOGUBBEN.m.scale.setScalar(1 + 0.04 * bump(MAL('24d', 42) + 0.3, MAL('24d', 42) + 0.9, t, 0.15) * Math.abs(Math.sin((t - MAL('24d', 42)) * 10)));
  // snön växer in: kullarna, granarna och trädet uppifrån, marken nerifrån
  const sk = k01((t - SNO[0]) / (SNO[1] - SNO[0])), kort1 = mjuk(k01((sk - 0.25) / 0.75));
  MARK_S.satt(mjuk(k01(sk / 0.7))); KBAK_S.satt(kort1); KFRAM_S.satt(kort1); GRAN_S.satt(kort1); TRAD_S.satt(kort1);
  // snöflingan på himlen
  FLINGAN.visible = t >= FL_KLAR - 0.05; FLINGAN.rotation.y = 0.05 * Math.sin((t - FL_KLAR) * 1.2) * k01((t - FL_KLAR) / 0.8);
  FLINGAN.scale.setScalar(1 + 0.06 * bump(MAL('24b', 40) + 0.3, MAL('24b', 40) + 1.0, t, 0.2));
  for (const k of MOLNEN) k.m.position.x = k.x + 0.01 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3);
  // fåglarna: sitter på sina grenar (ovanpå snön), lyfter vingen, piper, studsar
  for (const F of FAGLAR) {
    const p = sittplats(F.i, kort1), lyft = FAGEL_LYFT.filter(([a, i]) => i === F.i).reduce((m, [a]) => Math.max(m, bump(a, a + 0.7, t, 0.15)), 0);
    const pip = FAGEL_PIP.filter(([a, i]) => i === F.i).reduce((m, [a]) => Math.max(m, bump(a, a + 0.3, t, 0.08)), 0);
    const st = FAGEL_ORD[F.i], hopp = Math.max(bump(st, st + 0.45, t, 0.12), 0.6 * bump(MAL('24c', 41) + 0.25 + 0.15 * F.i, MAL('24c', 41) + 0.7 + 0.15 * F.i, t, 0.1));
    F.m.position.copy(tradLokal(p)).add(v3(0, -0.006 + 0.025 * hopp, 0));
    F.m.scale.set(1, 1 + 0.06 * hopp, 1);
    await ritaFagel(F, { t, flax: 0.55 * lyft, oppen: pip, blink: ((t + F.i * 1.1) % 3.4) < 0.12 ? 1 : 0 });
  }
  // snöfallet
  const nf = nivaSnofall(t);
  SNOFALL.forEach((m, i) => { const u = m.userData; m.visible = i < nf; if (!m.visible) return;
    const hojd = 1.1, y = hojd - ((t * u.fart + u.fas * hojd) % hojd);
    m.position.set(u.x + 0.03 * Math.sin(t * 0.9 + u.v), SIDA + 0.01 + y, u.z + 0.02 * Math.sin(t * 0.7 + u.v)); m.scale.setScalar(u.s);
    m.material.opacity = k01((i + 1 - nf) * -1 + 1) * k01(y / 0.05); });
  // pannbandet: ligger (bildsidan upp) där kritan ritar det, reser sig, glider i en båge till huvudet
  { const K = PBKORT; K.m.visible = t >= PB_KLAR - 0.05 && t < PB_GLID[1]; K.flik.visible = K.m.visible && t > PB_UPP + 0.3 && t < PB_GLID[0];
    K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - PB_UPP) / 0.45)); K.m.position.set(K.x, K.y, K.z); K.m.scale.setScalar(1);
    if (t >= PB_GLID[0] && t < PB_GLID[1]) { const u = mjuk((t - PB_GLID[0]) / (PB_GLID[1] - PB_GLID[0])), mal = fig2varld([509, 324 - 150]);
      K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y, u) + 0.12 * Math.sin(Math.PI * u), lerp(K.z, mal.z + 0.004, u)); K.m.scale.setScalar(lerp(1, 0.95, u)); } }
  // snöbollarna: rullas från kaninens tassar åt vänster, växer och stannar på "snöboll"; studsar på "En, två, tre"
  const R16 = [MAL('16b', 28) + ORD.en, MAL('16b', 28) + ORD.tva, MAL('16b', 28) + ORD.tre];
  BOLLAR.forEach((k, i) => { const Q = ROLL[i], [bx, bz, bh] = BOLLPOS[i], ut = t >= GUBBE_UPP - 0.3;
    const u = mjuk((t - Q.a) / (Q.b - Q.a)), x0 = PLATS.bollar[0] - 0.12, x = lerp(x0, bx, u), s = lerp(0.25, 1, u);
    k.m.visible = t >= Q.a && t < GUBBE_UPP - 0.03;   // borta när de ligger platt (baksidan syntes som en ljus remsa) k.m.position.set(x, SIDA + 0.03 * bump(R16[i], R16[i] + 0.45, t, 0.12), bz + 0.0005 * i);
    k.m.scale.setScalar(s * (1 + 0.012 * Math.sin(t * 9) * (u > 0 && u < 1)));
    k.m.rotation.x = ut ? Math.PI / 2 * mjuk((t - GUBBE_UPP + 0.3) / 0.3) : 0;   // fälls ner när snögubben reser sig
    const sp = RULLSPAR[i]; sp.material.opacity = t >= Q.a && t < STANG + 0.3 ? 0.55 : 0;
    const xs = Math.min(x0, x), xe = Math.max(x0, x); sp.scale.set(Math.max(0.001, xe - xs), 0.022 + 0.04 * s, 1); sp.position.set((xs + xe) / 2, SIDA + 0.0014, bz + 0.008); });
  // snötussen: glider av granens gren, landar på huvudet, faller ner bredvid när kaninen skakar på huvudet
  { const K = TUSSEN, start = v3(-0.56, SIDA + 0.42, -0.14); K.m.visible = t >= TU.a && t < STANG;
    const huvud = fig2varld([512, 214]).add(v3(0, -0.02, 0.012)), mark2 = v3(kanin.position.x + 0.11, SIDA + 0.001, kanin.position.z + 0.04);
    if (t < TU.land) { const u = mjuk((t - TU.a) / (TU.land - TU.a)); K.m.position.set(lerp(start.x, huvud.x, u), lerp(start.y, huvud.y, u) + 0.05 * Math.sin(Math.PI * u), lerp(start.z, huvud.z, u)); K.m.rotation.z = 0.6 * (1 - u); }
    else if (t < TU.skak + 0.3) { K.m.position.copy(huvud); K.m.rotation.z = t > TU.skak ? 0.25 * Math.sin((t - TU.skak) * 18) : 0; }
    else { const u = k01((t - TU.skak - 0.3) / 0.5); K.m.position.set(lerp(huvud.x, mark2.x, u), lerp(huvud.y, mark2.y, u * u), lerp(huvud.z, mark2.z, u)); K.m.rotation.z = -0.8 * u; }
    K.m.scale.setScalar(1 - 0.4 * mjuk((t - TU.ner - 0.5) / 1.5)); }
  // fotspåren (rad 06c) syns när kaninen gått förbi, kvar till slutet
  const [ga0, ga1] = GA[0]; SPAR.forEach(m => m.material.opacity = 0.8 * k01((((t - ga0) / (ga1 - ga0)) - m.userData.u) / 0.1) * (1 - mjuk((t - STANG - 0.2) / 0.3)));
  // andedräkten vid nosen och snöpuffar vid fötterna
  const pu = ((t - ANDAS[0]) % 1.4) / 1.0; ANDE.visible = t > ANDAS[0] && t < ANDAS[1] && pu < 1;
  if (ANDE.visible) { const n = fig2varld([560, 455]); ANDE.position.set(n.x + 0.05 * pu, n.y + 0.015 * pu, n.z + 0.05); ANDE.scale.setScalar(0.5 + 1.3 * pu); ANDE.material.opacity = 0.75 * Math.sin(Math.PI * pu); }
  const PUFFAR = [...SKUTT.map(s => s + 0.4), ...ROLL.map(q => q.b)];
  FOTPUFF.forEach((m, i) => { const a = PUFFAR[i], u = (t - a) / 0.6; m.visible = a != null && u > 0 && u < 1; if (!m.visible) return;
    const p = i < 2 ? v3(kanin.position.x + (i ? 0.05 : -0.05), SIDA + 0.012, kanin.position.z + 0.02) : v3(BOLLPOS[i - 2][0] + 0.06, SIDA + 0.012, BOLLPOS[i - 2][1] + 0.02);
    m.position.copy(p).add(v3(0, 0.02 * u, 0)); m.scale.setScalar(0.6 + 1.6 * u); m.material.opacity = 0.8 * (1 - u); });
  TRADET.m.updateMatrixWorld(true);
  vik(KANKORT, FALL.e(KANKORT, t)); kanin.visible = t >= KANIN_UPP;
  await ritaKanin(t);
  DOF.fokus(KAM.aktiv(t));
  scen.updateMatrixWorld(true);
  // kritan och glimtarna i #ov
  let ov = KR.rita(t);
  const flp = FLINGAN.getWorldPosition(v3());
  ov += glimt(t, MAL('04', 6) + ORD.snoflinga, flp, 160, 5) + glimt(t, MAL('24b', 40) + 0.3, flp, 160, 5) + glimt(t, S('01a') + 0.2, v3(0, SIDA + 0.1, 0.2), 120, 4);
  const bollTopp = i => BOLLAR[i].m.position.clone().add(v3(0.02, BOLLPOS[i][2] * 0.85, 0.02));
  [MAL('16', 27) + ORD.stor, MAL('16', 27) + ORD.mellan, MAL('16', 27) + ORD.liten].forEach((a, i) => ov += glimt(t, a, bollTopp(i), 70, 4));
  R16.forEach((a, i) => ov += glimt(t, a, bollTopp(i), 50, 3));
  const giss21 = MAL('21', 36) + LN(36) + 1.6; [0, 1, 2].forEach(i => ov += glimt(t, giss21 + 0.3 * i, bollTopp(i), 45, 3));
  FAGLAR.forEach(F => { const w = F.m.getWorldPosition(v3()).add(v3(0, 0.06, 0.01)); ov += glimt(t, FAGEL_ORD[F.i] + 0.1, w, 60, 4) + glimt(t, S('19') + 0.5 + 0.15 * F.i, w, 50, 3); });
  ov += glimt(t, MAL('24d', 42) + 0.3, SNOGUBBEN.m.position.clone().add(v3(0.04, 0.36, 0.02)), 110, 5) + glimt(t, GUBBE_UPP, SNOGUBBEN.m.position.clone().add(v3(0, 0.2, 0.02)), 160, 5);
  $('ov').innerHTML = ov;
  DOF.komp.render();
}

// ---- kameran: vyerna ur storyboarden, en svag glidning i varje ----
satt(PARM[1]); scen.updateMatrixWorld(true);
const FLW = FLINGAN.getWorldPosition(v3());
const VY = {
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  himmel: () => [v3(0, 0.62, 1.75), v3(0, 0.62, -0.6), 34],
  flinga: () => [FLW.clone().add(v3(0.04, -0.12, 0.95)), FLW.clone(), 28],
  'flinga-hej': () => [FLW.clone().add(v3(0.06, -0.3, 1.5)), FLW.clone().add(v3(0, -0.15, 0)), 32],
  bred: () => [v3(0, 0.55, 1.55), v3(0, 0.34, -0.2), 31],
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.27, 0.6)), g.clone().add(v3(0, 0.22, 0)), 28],
  pannband: () => [v3(-0.02, 0.45, 1.05), v3(-0.04, 0.16, 0.28), 30],
  bollar: () => [v3(-0.16, 0.4, 1.1), v3(-0.2, 0.13, 0.22), 32],
  trad: () => [v3(0.32, 0.55, 1.2), v3(0.34, 0.42, -0.1), 28],
  tradnara: () => [v3(0.36, 0.6, 0.85), v3(0.38, 0.52, -0.16), 30],
  tradhej: () => [v3(0.38, 0.66, 0.85), v3(0.38, 0.57, -0.16), 30],   // 24c: lite högre, kaninens öra vid bollarna kommer inte med
  gubbe: () => [v3(-0.28, 0.36, 0.95), v3(-0.32, 0.18, 0.17), 30],
  hejda: g => [g.clone().add(v3(0.18, 0.34, 0.95)), g.clone().add(v3(-0.18, 0.2, -0.3)), 32],
};
const KAM = kamera(cam, VY, { blur: n => /nara|flinga$/.test(n) ? 0.008 : /halv|pannband|bollar|gubbe|tradnara/.test(n) ? 0.006 : 0.003 }), { vy, glid } = KAM;
const GLID = { '02': [0, 1.6], '19': [0, 1.3] };   // in mot himlen; från kaninen vid granen till trädet
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'logga' ? 'bord' : r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (KAM.VY[namn].length ? r.st.plats : '');
  if (r.id === '01a') { KAM.oppning(r.s, S('01b') + 0.9, 'in'); forra = 'in'; continue; }
  if (r.id === '01b') continue;
  if (r.id === '26') { KAM.stangning(r.s + 0.1); continue; }
  if (r.id === '24c') { vy(r.s, 'tradhej', g); forra = 'tradhej'; continue; }   // närbild: kaninen vid bollarna kommer inte med i bild
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
const plan = KAM.plan(DURATION);

// ---- ljudet: Malin, kaninen och effekterna ur raderna, kritans ritljud som slinga, vinterljudet lågt under allt ----
const VOL = f => /kanin-/.test(f) ? 2.0 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|landa-mjuk)/.test(f) ? 0.7 : 1.0;
starta(RD, plan, bildruta, { rost: 'vintern-i-boken', vol: VOL, matta: MATTA, RIT: KR.RIT });
