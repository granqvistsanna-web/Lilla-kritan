// 063 Hösten i boken, grind 6: hela scenen i Kritans bok. Uppslaget som storyboarden (storyboard/scen.js, grind 5 godkänd),
// motorn som 062 (avsnitt/062-sommaren-i-boken/scener/boken/boken.js): korten, kritan, rävens v2-rigg på ett kort, kameran som vyer.
// Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/063-hosten-i-boken/scener/render.mjs avsnitt/063-hosten-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { duk, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { $, k01, lerp, mjuk, bump, reser, v3, rader, scenen, bild, lad, ruta, dataUrl, kontur, bredare, urklipp, djup, mark, vik, stall, kortmotor,
  PARM, fallning, figurKort, vink, gaRikt, kritan, ljuset, djupskarpa, kamera, starta } from '/produktion/three-rum/popupbok/uppslag.js';
import { halsduk, halsdukPa } from '/avsnitt/063-hosten-i-boken/prov/halsduk/halsduk.js';

// ---- raderna ----
const RD = rader(await import('/avsnitt/063-hosten-i-boken/storyboard/rader.mjs')), { RAD, S, LN, MAL, SVAR, DURATION, rad, GLES } = RD;

// ---- renderaren ----
const SC = scenen(), { scen, cam } = SC;

// ---- bilderna ----
const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const [GRAN, HIMMEL, KULLE_BAK, KULLE_FRAM, MOLN1, MOLN2, MOLN3, EK_KAL, EK_HOST, TRAD, LOVHOG, SVAMP, EKOLLON, STUBBE,
  LOV_R, LOV_G, LOV_B] = await Promise.all([
  B + 'skogen-gron-saker/gran.png',
  ...['himmel', 'kulle-bak-host', 'kulle-fram-host', 'moln-stor', 'moln-mellan', 'moln-liten', 'ek-kal', 'ek-host', 'trad-gult', 'lovhog', 'svamp', 'ekollon'].map(n => P + n + '.png'),
  RQ + 'stubbe/cut/stubbe.png', ...['rott', 'gult', 'brunt'].map(n => `${RQ}lov/cut/lov-${n}.png`)].map(lad));
const [LOV_I, EKORRE_I] = await Promise.all([bild(RQ + 'lov/cut/lov-orange.png'), bild(RQ + 'ekorre-orange/cut/ekorre-orange.png')]);
const LOV_O = tex(trim(LOV_I));
const HD_C = await halsduk();   // halsduken i kod, färg B (samma ruta som halsduk-bok.png, så att konturen passar)
const HALSDUK = tex(trim(HD_C));
const KONTUR = Object.fromEntries(await Promise.all([['lov', 'lov/cut/lov-orange-kontur.json'], ['halsduk', 'halsduk/cut/halsduk-kontur.json']].map(async ([n, f]) => [n, await kontur(RQ + f)])));
const LOV_URL = await dataUrl(RQ + 'lov/cut/lov-orange.png'), HD_URL = HD_C.toDataURL();
const LOVSMA_URL = await Promise.all(['rott', 'gult', 'brunt'].map(n => dataUrl(`${RQ}lov/cut/lov-${n}.png`)));
// ekorren får ett öga (Sanna 27/11 "eyes on squirrel"): bilden har inget, riggfilen anger ögat (819, 420, r 26). Ett mörkt öga med
// glans, som solens i 062, och en blinkning (ögat stängt = en böjd linje)
const ekorre = blund => { const c = duk(EKORRE_I.width, EKORRE_I.height), x = c.getContext('2d'), [ex, ey] = [812, 418]; x.drawImage(EKORRE_I, 0, 0);
  x.fillStyle = 'rgba(232,110,90,0.35)'; x.beginPath(); x.ellipse(ex + 14, ey + 46, 24, 15, 0, 0, 7); x.fill();
  if (blund) { x.strokeStyle = '#3A2414'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.arc(ex, ey - 4, 15, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke(); }
  else { x.fillStyle = '#3A2414'; x.beginPath(); x.ellipse(ex, ey, 14, 19, 0, 0, 7); x.fill();
    x.fillStyle = '#FFF'; x.beginPath(); x.arc(ex - 4, ey - 7, 5.5, 0, 7); x.fill(); }
  return tex(trim(c)); };
const EKORRE = ekorre(false), EKORRE_BLUND = ekorre(true);

function nedre(map, andel) {   // lövhögens främre halva, som räven sjunker ner bakom
  const i = map.image, h = Math.round(i.height * andel), c = duk(i.width, h);
  c.getContext('2d').drawImage(i, 0, i.height - h, i.width, h, 0, 0, i.width, h); return tex(c);
}
skrivbord(scen, [['#E2563F', 2.15, 0.75, 0.5], ['#F2C23A', 2.35, 0.98, 0.35], ['#3F8FD2', -2.25, 1.15, -0.25]]);
const { insida, satt } = await skapaBok(scen, { farg: '#8A5A34', figur: LOV_I, doodles: true, oppna: PARM });

// ---- uppslaget (som storyboarden) ----
const { kort, platt, pa } = kortmotor(scen, insida, { kskugga: ['52,40,14', 0.42, 0.16] });
const BAK = [kort(bredare(KULLE_BAK, 5.2), 2.15 / 5.2, 0, -0.6), kort(bredare(KULLE_FRAM, 6.2), 1.95 / 6.2, 0.05, -0.47)];
pa(bredare(HIMMEL, 1.5), 1.53, 0, 0.07 + 1.53 / 2, 0.004, 2.3, '#E4EAEC');   // höstljus: svalare och lite blekare
const MOLNEN = [[MOLN1, 0.22, -0.66, 0.9], [MOLN2, 0.16, -0.26, 1.05], [MOLN3, 0.13, 0.62, 1.0]].map(([m, h, x, y], i) => ({ m: pa(m, h, x, y), x, i }));
const SKOG = [[-1.0, -0.36, 0.5], [-0.8, -0.42, 0.6], [0.88, -0.38, 0.56], [1.02, -0.32, 0.44]].map(([x, z, h]) => kort(GRAN, h, x, z));
const TRADET = kort(TRAD, 0.62, 0.42, -0.4, { vaj: 1 });
// eken: den kala och den höstiga står på samma fot. Den höstiga kronan växer ut från kritans löv (rad 05): kortets bild ritas om
// med en växande cirkel kring lövet, och den kala eken syns bakom tills kronan är hel
const EK = { x: -0.42, z: -0.2, h: 1.0 };
const EKHOST_C = duk(EK_HOST.image.width, EK_HOST.image.height), EKHOST_T = tex(EKHOST_C);
const EKHOST = kort(EKHOST_T, EK.h, EK.x, EK.z), EKKAL = kort(EK_KAL, EK.h * EK_KAL.image.height / EK_HOST.image.height, EK.x, EK.z + 0.002, { flik: false });
const LOVPOS = v3(EK.x + 0.2, SIDA + 0.7, EK.z + 0.02), LOVH = 0.15;   // kritans löv på en gren
const LOVET = kort(LOV_O, LOVH, LOVPOS.x, LOVPOS.z, { y: LOVPOS.y, flik: false });
const LOVRUTA = ruta(LOV_I), HD_R = ruta(HD_C);
let kronaK = -1;
function krona(k) {   // 0 = bara lövet, 1 = hela kronan
  k = Math.round(k * 60) / 60; if (k === kronaK) return; kronaK = k;
  const x = EKHOST_C.getContext('2d'), iw = EKHOST_C.width, ih = EKHOST_C.height, w = EK.h * iw / ih;
  const cx = ((LOVPOS.x - EK.x) / w + 0.5) * iw, cy = (1 - (LOVPOS.y - SIDA) / EK.h) * ih;
  x.clearRect(0, 0, iw, ih); if (k <= 0) { EKHOST_T.needsUpdate = true; return; }
  x.save(); x.beginPath(); x.arc(cx, cy, Math.hypot(iw, ih) * mjuk(k), 0, 7); x.clip(); x.drawImage(EK_HOST.image, 0, 0); x.restore();
  EKHOST_T.needsUpdate = true;
}
platt(tex(mark('#B99A45', '#CDB264', '#8F8A3A')), 2.26, 0, 0.0, 1.5, SIDA + 0.0004);   // marken: höstgräs, ockrabrunt med gröna fläckar
const STUBBEN = kort(STUBBE, 0.17, 0.78, -0.08);
const SVAMPEN = kort(SVAMP, 0.13, 0.66, 0.16, { flik: false });
const HOG = { x: 0.34, z: 0.34 }, HOGBAK = kort(LOVHOG, 0.26, HOG.x, HOG.z), HOGFRAM = kort(nedre(LOVHOG, 0.5), 0.13, HOG.x, HOG.z + 0.06, { flik: false });
const EKOLLON_POS = [[-0.5, 0.06], [-0.38, 0.1], [-0.26, 0.05]], EKOLLONEN = EKOLLON_POS.map(([x, z]) => kort(EKOLLON, 0.05, x, z, { flik: false }));
const EKORREN = kort(EKORRE, 0.15, EK.x - 0.1, EK.z - 0.06, { flik: false });
// tre löv på marken, platta: det röda vid eken, det gula mitt fram, det bruna vid stubben
const MARKLOV = [[LOV_R, -0.66, 0.24], [LOV_G, 0.22, 0.52], [LOV_B, 0.78, 0.22]].map(([m, x, z]) => { const p = platt(m, 0.07, x, z, undefined, SIDA + 0.0015); p.userData.p = p.position.clone(); return p; });
// halsduken: ligger (bildsidan upp) där kritan ritar den, reser sig, glider till räven
const HDPOS = [-0.2, 0.33], HDW = 0.2;
const HALSDUKKORT = kort(HALSDUK, HDW * HALSDUK.image.height / HALSDUK.image.width, ...HDPOS, { y: SIDA + 0.003 });

// löv i luften (fallande, lövyran): små kort ur löven
const LOVSORT = [LOV_O, LOV_R, LOV_G, LOV_B];
const smalov = (n, s) => Array.from({ length: n }, (_, i) => { const map = LOVSORT[i % 4], m = new THREE.Mesh(new THREE.PlaneGeometry(s * map.image.width / map.image.height, s), urklipp(map));
  m.castShadow = true; m.customDepthMaterial = djup(map); m.visible = false; scen.add(m); return m; });
const FALLER = smalov(9, 0.045), YRA = smalov(10, 0.04);
// vinden: öppna krumelurer i vit krita på en genomskinlig skiva
const VIND = (() => { const c = duk(2048, 700), x = c.getContext('2d'); x.strokeStyle = '#FFFFFF'; x.lineCap = 'round'; x.lineWidth = 14;
  for (const [cx, cy, s] of [[300, 220, 1], [900, 420, 0.8], [1450, 180, 1.1], [1800, 480, 0.7]]) {
    x.beginPath(); x.moveTo(cx - 220 * s, cy + 30 * s); x.bezierCurveTo(cx - 80 * s, cy - 40 * s, cx + 60 * s, cy + 40 * s, cx + 120 * s, cy);
    x.arc(cx + 120 * s, cy - 40 * s, 40 * s, Math.PI / 2, -Math.PI, true); x.stroke(); }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.68), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, opacity: 0, depthWrite: false }));
  m.position.set(0, SIDA + 0.42, 0.15); m.visible = false; scen.add(m); return m; })();
const PUFF = new THREE.Mesh(new THREE.SphereGeometry(0.014, 16, 12), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0, depthWrite: false })); PUFF.visible = false; scen.add(PUFF);

// ---- räven: v2-riggen på ett kort ----
const L = await v2rigg('raven-rut'), FOT = L.FOTTER || 925, TOPP = 80, G = L.figur(512, FOT, 1, $('figurer'));
// halsduken på räven: ritad i kod efter kroppens kontur (halsdukPa), i kroppen under kindbandet, så att den följer kroppen
const KROPP_I = await bild('/assets/karaktarer/raven-rut/premium/cut-tunn/rut-body-tom.png');
const HALSEN_URL = halsdukPa(KROPP_I, { yc: 588, tjock: 84, dip: 34, ande: -0.36 }).toDataURL();
G.querySelector('.mage').insertAdjacentHTML('afterend', `<image id="halsen" href="${HALSEN_URL}" width="1024" height="1024" display="none"/>`);
// löven på huvudet (rad 17): i kroppen, efter ansiktet (ansiktet har en mask)
G.querySelector('.kropp').insertAdjacentHTML('beforeend', `<g id="huvudLov">${[[440, 196, -35], [516, 178, 10], [594, 198, 38]].map(([x, y, r], i) =>
  `<image class="hlov" href="${LOVSMA_URL[i]}" x="-48" y="-48" width="96" height="96" transform="translate(${x} ${y}) rotate(${r})" data-x="${x}" data-y="${y}" data-r="${r}"/>`).join('')}</g>`);
// lika hög som rut.png-kortet i storyboarden (0,34)
const RAVKORT = await figurKort(scen, cam, L, G, { fot: FOT, topp: TOPP, hojd: 0.34 }), { m: rav, fig2varld, BL, nick } = RAVKORT;
L.rita(G, L.NEUTRAL, L.POSE0);

// ---- ljuset (lite lägre och varmare höstsol) och skärpedjupet ----
ljuset(scen, { himmel: ['#FFF8EC', '#D8B892', 2.2], sol: ['#FFE8CC', 2.2] });
const DOF = djupskarpa(SC);

// ---- rävens platser och rörelser ----
const PLATS = { mitt: [0.08, 0.2], 'fore-hog': [0.06, 0.48], hog: [HOG.x, HOG.z + 0.02], 'framfor-hog': [0.14, 0.42], ekollon: [-0.11, 0.15], svamp: [0.5, 0.06] };   // ekollon: så att det tredje ekollonet syns bredvid räven
// hopp: xz flyttas inom [xz0, xz1] av hoppet (in i högen: först fram, sedan rakt ner; ut ur högen: först upp, sedan fram)
const HOPP = [
  { t0: S('16') + 0.1, t1: S('16') + 0.55 + 0.25, fran: PLATS['fore-hog'], till: PLATS.hog, h: 0.15, xz: [0.15, 0.75] },   // in i högen över främre halvan, landar på "Hopp!"
  { t0: MAL('16b', 26) + 1.55, t1: MAL('16b', 26) + 2.05, fran: PLATS.hog, till: PLATS.hog, h: 0.16, xz: [0, 1] },   // en gång till … hopp!
  { t0: S('17') + 0.15, t1: S('17') + 0.85, fran: PLATS.hog, till: PLATS['framfor-hog'], h: 0.2, xz: [0.35, 1] },   // ut ur högen, över främre halvan
];
const GA = [   // går lugnt: [start, slut, från, till]
  [S('15') + 0.5, S('15') + 1.7, PLATS.mitt, PLATS['fore-hog']],   // fram till högen (hoppar in framifrån, över den låga främre halvan)
  [S('21') + 0.2, S('21') + 1.9, PLATS['framfor-hog'], PLATS.ekollon],
  [S('22b') + 1.0, S('22b') + 2.6, PLATS.ekollon, PLATS.svamp],
];
function ravPos(t) {   // hoppen och gångerna i tidsordning
  const E = [...HOPP.map(H => ({ a: H.t0, b: H.t1, f: H.fran, g: H.till, y: u => H.h * Math.sin(Math.PI * u), m: u => mjuk((u - H.xz[0]) / (H.xz[1] - H.xz[0])) })),
    ...GA.map(([a, b, f, g]) => ({ a, b, f, g, y: u => 0.008 * Math.abs(Math.sin(Math.PI * 4 * u)), m: mjuk }))].sort((p, q) => p.a - q.a);
  let [x, z] = PLATS.mitt, y = 0;
  for (const e of E) { if (t >= e.b) [x, z] = e.g; else if (t >= e.a) { const u = (t - e.a) / (e.b - e.a), m = e.m(u);
    x = lerp(e.f[0], e.g[0], m); z = lerp(e.f[1], e.g[1], m); y = e.y(u); } }
  return [x, y, z];
}
// i lövhögen: figuren sjunker i sitt kort (allt under kortets fot klipps bort), högens främre halva döljer kanten; bara huvudet syns
const SJUNK = 230;
const iHogen = t => { const [a, b, c] = HOPP;
  return t < a.t1 - 0.3 ? 0 : t < b.t0 ? mjuk((t - a.t1 + 0.3) / 0.35) * (1 - 0.75 * bump(MAL('16b', 26) + 0.1, b.t0 + 0.1, t, 0.4))   // reser sig lite under "En gång till"
    : t < c.t0 ? Math.max(1 - mjuk((t - b.t0 + 0.05) / 0.2), mjuk((t - b.t1 + 0.3) / 0.35)) : 1 - mjuk((t - c.t0 + 0.05) / 0.2); };
const YR = [HOPP[0].t1, HOPP[1].t1];   // lövyran
// halsduken: kritan ritar den (rad 10), kortet reser sig (rad 11), glider till halsen (rad 13)
const HD_KLAR = S('11') + 0.6, HD_UPP = S('11') + 0.8, HD_GLID = [S('13') + 0.3, S('13') + 1.9], HD_PA = HD_GLID[1];
const DARR = [S('09') - 0.2, MAL('13', 19) + 2.4];   // fryser: från "Brr" till "Så där"
const HUVUDLOV = [S('17') - 0.1, S('26') + 0.3], LOV_AV = MAL('17', 27) + LN(27) + 0.4;   // ett löv faller av när räven skakar
const VINK = (id, n, d = 1.8) => [MAL(id, n) + 0.3, d];
const REAKTION = { '07': 'jatteglad', '07b': 'kawaii', '09': 'tanker', '09b': 'nyfiken', '11': 'kawaii', '12': 'jatteglad', '13': 'stolt', '13b': 'kawaii',
  '15': 'nyfiken', '15b': 'jatteglad', '16': 'skrattar', '16b': 'skrattar', '17': 'fnissig', '18': 'nyfiken', '19b': 'kawaii', '20': 'nyfiken',
  '20b': 'jatteglad', '21': 'nyfiken', '21b': 'kawaii', '21c': 'forvanad', '21d': 'jatteglad', '22': 'tanker', '22b': 'forvanad', '22c': 'kawaii',
  '23': 'jatteglad', '24': 'kawaii' };
const RAV_UPP = S('07') + 0.2;
function raven(t) {
  const r = rad(t), tl = t - r.s, id = r.id, B = n => L.blanda('neutral', n, 1);
  let f = B('glad'), p = { ...L.POSE0, armar: [0, 0], fram: [0, 0] };
  [f, p] = L.vila(f, p, t); p = { ...p, armar: p.armar || [0, 0], fram: p.fram || [0, 0] };
  switch (id) {
    case '07': { const [a, d] = VINK('07', 10, 2.2); [f, p] = vink(f, p, t - a, d); p.svans = 14 * Math.sin(t * 6) * bump(a, a + 3.2, t); break; }
    case '07b': { const u = k01((tl + 0.3) / 2.6); f = { ...f, titt: [-12, lerp(-14, 10, mjuk(u))] }; p.rikt = -0.25; f = L.blanda(f, 'kawaii', bump(SVAR('07b', 11) - r.s, r.d, tl)); break; }
    case '08': { const k = bump(MAL('08', 12) + 0.5, r.e ?? r.s + r.d + 0.3, t, 0.4);   // vinden: blundar, öronen fladdrar, lutar sig undan
      f = L.blanda(f, { ...B('glad'), sov: 1 }, k); p.oron = [k * (-10 + 6 * Math.sin(t * 13)), k * (-10 + 6 * Math.sin(t * 11 + 1))]; p.luta = (p.luta || 0) + 4 * k; break; }
    case '09': case '09b': { f = L.blanda({ ...f, kind: 1.2 }, 'ledsen', 0.35); if (id === '09b') f = L.blanda(f, { ...B('nyfiken'), titt: [0, 0] }, 0.6);
      p = L.blandaPose(p, 'magen', 0.8); break; }
    case '10': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-12, 8]; p.rikt = -0.35; break;
    case '11': f = L.blanda(L.blanda(B('nyfiken'), 'kawaii', mjuk((t - HD_KLAR) / 0.4)), 'jatteglad', bump(HD_UPP, HD_UPP + 1.4, t)); f.titt = [-12, 6]; p.rikt = -0.35 * (1 - mjuk((t - HD_UPP - 1.6) / 0.6));
      p.svans = 14 * Math.sin(t * 6) * bump(HD_UPP, HD_UPP + 2.5, t); break;
    case '12': [f, p] = nick(f, p, t - SVAR('12', 18)); break;
    case '13': { const u = k01((t - HD_GLID[0]) / (HD_GLID[1] - HD_GLID[0])); f = L.blanda(B('nyfiken'), 'kawaii', mjuk((t - HD_PA) / 0.4));
      f.titt = [lerp(-12, 0, mjuk(u)), lerp(4, 10, mjuk(u))]; p = L.blandaPose(p, 'magen', 0.8 * (1 - mjuk((t - HD_PA) / 0.5))); break; }
    case '13b': { const k = bump(MAL('13b', 20) + 0.6, MAL('13b', 21) + 0.3, t, 0.4);   // nosen ner i halsduken, blundar
      f = L.blanda(f, { ...B('kawaii'), sov: 1, titt: [0, 8] }, k); p.luta = (p.luta || 0) + 2 * k; p.strack = -0.02 * k; break; }
    case '15': p.rikt = 0.55 * mjuk((tl - 0.4) / 0.6); f = { ...B('nyfiken'), titt: [12, 2] }; break;
    case '15b': f = { ...f, titt: [0, 0] }; p.rikt = 0.25; [f, p] = nick(f, p, t - SVAR('15b', 23)); break;
    case '16': case '16b': f = L.blanda(f, 'jatteglad', bump(HOPP[0].t0, HOPP[1].t1 + 1.5, t, 0.3)); break;
    case '17': { const sk = LOV_AV - 0.5 - r.s; f = L.blanda(B('nyfiken'), 'fnissig', mjuk((tl - sk - 0.4) / 0.3)); f.titt = [0, -14 * (1 - mjuk((tl - sk) / 0.3))];
      if (tl > sk) [f, p] = L.skakaHuvud(f, p, tl - sk, 1.2, 1.0); break; }
    case '18': f = { ...B('nyfiken'), titt: [12 * Math.sin(tl * 1.3), 0] }; p.rikt = 0.45 * Math.sin(tl * 1.3); break;
    case '20': case '20b': f = { ...f, titt: [-12, 6] }; p.rikt = -0.3; break;
    case '21': f = L.blanda(B('nyfiken'), 'glad', 0.3); f.titt = [-10, 10]; p.rikt = -0.3 * mjuk((tl - 2.0) / 0.5); break;
    case '21b': { const k = bump(0.2, r.d - GLES, tl, 0.4); f = L.blanda(f, { ...B('kawaii'), sov: 1, titt: [-8, 12] }, k); p.rikt = -0.3; p.luta = (p.luta || 0) - 3 * k; p.strack = -0.02 * k; break; }
    case '21c': f = { ...B('nyfiken'), titt: [-14, -2] }; p.rikt = -0.45; break;
    case '21d': { f = { ...B('jatteglad'), titt: [-14, -2] }; p.rikt = -0.45; const a = MAL('21d', 38) + 2.0; [f, p] = vink(f, p, t - a, 2.2); break; }
    case '22': f = { ...B('nyfiken'), titt: [12, 4] }; p.rikt = 0.4; break;
    case '22b': f = L.blanda(B('nyfiken'), 'forvanad', bump(MAL('22b', 40) + 0.4, MAL('22b', 40) + 1.4, t)); f.titt = [12, 6]; break;
    case '22c': { const a = MAL('22c', 41) + 0.4; f = { ...B('glad'), titt: [10, 6] }; p.rikt = 0.35;
      if (t > a && t < a + 1.6) [f, p] = L.skakaHuvud(f, p, t - a, 1.6, 1.0);   // nej, den ska man inte äta
      const k = mjuk((t - MAL('22c', 42)) / 0.5); f = L.blanda(f, { ...B('kawaii'), titt: [12, 8] }, k); p.luta = (p.luta || 0) - 4 * k; break; }   // lutar sig fram och tittar
    case '23': f = { ...f, titt: [0, 0] }; [f, p] = nick(f, p, t - SVAR('23', 43)); break;
  }
  if (id === '24' || id === '25') { const n = id === '24' ? 44 : 49; [f, p] = vink(f, p, t - MAL(id, n), r.d - 0.4, true); }
  // fryser: darrar lätt, svansen tätt
  const darr = bump(DARR[0], DARR[1], t, 0.3); if (darr > 0) { p.luta = (p.luta || 0) + darr * 1.2 * Math.sin(2 * Math.PI * 7 * t); p.svans = (p.svans || 0) - 18 * darr; }
  const gr = gaRikt(GA, t); if (gr) { p.rikt = gr; f = { ...f, titt: [12 * gr, 2] }; }   // går i riktningsposen, speglas aldrig
  // hoppen: hukar före, sträcker sig i luften
  for (const H of HOPP) { p = L.blandaPose(p, 'huka', bump(H.t0 - 0.35, H.t0 + 0.05, t, 0.2) + 0.6 * bump(H.t1 - 0.02, H.t1 + 0.3, t, 0.15));
    if (t > H.t0 && t < H.t1) { p.strack = 0.03; p.armar = [p.armar[0] + 20, p.armar[1] + 20]; } }
  const RE = REAKTION[id];
  if (RE) { const k = bump(r.d - GLES - 0.15, r.d + 0.1, tl, 0.3); f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(r) % 2 ? 2.5 : -2.5) * k; }
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

async function ritaRav(t) {
  const [x, y, z] = ravPos(t); rav.position.set(x, RAVKORT.y + y, z);
  const [f, p] = raven(t); L.rita(G, f, p);
  $('halsen').setAttribute('display', t >= HD_PA ? 'inline' : 'none');
  // löven på huvudet: ett faller av när räven skakar, de andra sitter kvar
  $('huvudLov').setAttribute('display', t >= HUVUDLOV[0] && t < HUVUDLOV[1] ? 'inline' : 'none');
  $('huvudLov').querySelectorAll('.hlov').forEach((im, i) => { if (i !== 1) return; const u = k01((t - LOV_AV) / 0.9), [x0, y0, r0] = ['x', 'y', 'r'].map(k => +im.dataset[k]);
    im.setAttribute('transform', `translate(${x0 + 70 * Math.sin(Math.PI * u)} ${lerp(y0, FOT - 30, u * u)}) rotate(${r0 + 200 * u})`); im.setAttribute('opacity', (1 - k01((t - LOV_AV - 1.0) / 0.4)).toFixed(2)); });
  // lövhögen: figuren nedåt i kortet, allt under kortets fot klipps bort
  const sj = SJUNK * iHogen(t); $('figurer').setAttribute('transform', `translate(0 ${sj.toFixed(1)})`);
  $('vattenKant').setAttribute('d', sj > 0.5 ? `M-400 -400H1600V${(FOT - 200 * iHogen(t)).toFixed(1)}H-400Z` : 'M-400 -400H1600V2000H-400Z'); $('vattenYta').innerHTML = '';
  await RAVKORT.textur(t);
}

// ---- korten: upp när boken öppnas, ner när den stängs (det främsta först, så att inget går genom något) ----
const OPPNA = S('01b'), STANG = S('26');
const KORTEN = fallning(satt, OPPNA, STANG);
const ORDNING = KORTEN.upp([...BAK, ...SKOG, TRADET, EKKAL, EKHOST, STUBBEN, HOGBAK, HOGFRAM, ...EKOLLONEN]);
RAVKORT.upp = RAV_UPP; EKORREN.upp = S('21c') + 0.1; SVAMPEN.upp = S('18') + 0.2;
RAVKORT.z = PLATS.svamp[1]; EKORREN.z = EK.z + 0.18;   // där de står när boken stängs
KORTEN.ner([...ORDNING, RAVKORT, EKORREN, SVAMPEN]);
const SVAMP_UPP = MAL('22b', 40) + 0.45;   // helt upp på "svamp"

// ---- kritan ritar ----
const KR = kritan(cam), { glimt } = KR;
{ const a = S('03'), b = S('04'), c = S('10'), d = S('11'), va = MAL('03', 5) + 0.3, vc = MAL('10', 16) + 0.3;
  KR.teckning('lov', LOV_URL, KONTUR.lov, LOVRUTA, () => LOVET.m,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, va - 0.2], vanta: [va, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, b + 0.6], [230, -30]);
  KR.teckning('halsduk', HD_URL, KONTUR.halsduk, HD_R, () => HALSDUKKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, vc - 0.2], vanta: [vc, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, HD_KLAR], [260, 40]); }
const LOV_KLAR = S('04') + 0.6;
const KRONA = [S('05') + 1.2, S('05') + 2.6];   // kronan växer ut på "Så många löv"

// ---- löven som faller (rad 06–09), vinden (rad 08 och 13b) ----
// [start, längd, x0, y0 (över sidan), z, dx (vinden)]
const FALL = [[S('06') + 0.6, 3.2, -0.3, 0.6, -0.06, 0.06], [S('06') + 2.0, 3.0, -0.52, 0.55, -0.02, -0.05], [S('07') + 0.2, 3.0, -0.24, 0.62, 0.04, 0.05],
  [S('07b') - 0.4, 2.8, -0.08, 0.5, 0.12, -0.06],   // räven följer det med blicken
  ...[0, 1, 2, 3, 4].map(i => [MAL('08', 12) + 0.5 + i * 0.25, 2.4, -0.62 + i * 0.1, 0.55 + 0.05 * (i % 3), -0.08 + 0.03 * i, 0.6 + 0.08 * i])];
const FALL_UT = S('10');   // borta när kritan ritar halsduken (de skulle annars räknas som markens löv i rad 19)
function lov(t) {
  FALLER.forEach((m, i) => { const F = FALL[i]; m.visible = !!F && t >= F[0] && t < FALL_UT; if (!m.visible) return;
    const [t0, d, x0, y0, z, dx] = F, u = k01((t - t0) / d), vind = dx > 0.3;
    if (u < 1) { m.position.set(x0 + dx * mjuk(u) + (vind ? 0.02 : 0.05) * Math.sin(2 * Math.PI * 1.3 * u + i), SIDA + 0.003 + y0 * (1 - u), z);
      m.rotation.set(0.3 * Math.sin(u * 7 + i), 0.5 * Math.sin(u * 5), (vind ? 6 : 2.5) * u + i); }
    else { m.position.set(x0 + dx, SIDA + 0.002 + i * 0.0002, z); m.rotation.set(-Math.PI / 2, 0, i * 1.3); } });
  // lövyran ur högen: upp i en båge och ner i högen igen (rad 16, 16b); två löv lyfter på "Hej då, lövhögen" (24d)
  const yr = YR.findLast(a => t >= a && t < a + 1.6), yh = MAL('24d', 47) + 0.2;
  YRA.forEach((m, i) => { const a = i / 10 * Math.PI * 2, v = 0.7 + 0.3 * ((i * 7) % 5) / 5;
    if (yr != null) { const u = (t - yr) / 1.6, y = 0.35 * v * Math.sin(Math.PI * Math.min(1, u * 1.1));
      m.visible = y > 0.02; m.position.set(HOG.x + Math.cos(a) * 0.14 * u * v, SIDA + 0.1 + y, HOG.z + 0.03 + Math.sin(a) * 0.03); m.rotation.set(0.2, 0, a * 1.7 + 5 * u); }
    else if (i < 2 && t >= yh && t < yh + 1.2) { const u = (t - yh) / 1.2; m.visible = true;
      m.position.set(HOG.x - 0.05 + i * 0.1, SIDA + 0.2 + 0.08 * Math.sin(Math.PI * u), HOG.z + 0.02); m.rotation.set(0.2, 0, i + 3 * u); }
    else m.visible = false; });
  // vinden
  const w = Math.max(bump(MAL('08', 12) + 0.4, S('09') + 0.2, t, 0.4), 0.45 * bump(MAL('13b', 21) + 0.6, MAL('13b', 21) + 3.2, t, 0.5));
  VIND.visible = w > 0.01; VIND.material.opacity = 0.85 * w; VIND.position.x = -0.25 + 0.5 * k01(((t - MAL('08', 12)) % 4) / 4);
  for (const k of MOLNEN) k.m.position.x = k.x + 0.012 * t * (k.i % 2 ? -1 : 1) * (1 + k.i * 0.3) + 0.06 * k01((t - MAL('08', 12)) / 3);
  TRADET.m.rotation.z = 0.025 * Math.sin(t * 1.1) + 0.03 * w * Math.sin(t * 4);
  // andningspuffen vid nosen (rad 09)
  const pu = ((t - S('09') - 0.6) % 1.4) / 1.0; PUFF.visible = t > S('09') + 0.6 && t < S('09b') && pu < 1;
  if (PUFF.visible) { const n = fig2varld([510, 470]); PUFF.position.set(n.x + 0.04 * pu, n.y + 0.02 * pu, n.z + 0.04); PUFF.scale.setScalar(0.5 + 1.3 * pu); PUFF.material.opacity = 0.8 * Math.sin(Math.PI * pu); }
}

// ---- ekorren (rad 21c, 21d, 24b): tittar fram bakom stammen, skuttar till ekollonen, tar ett och skuttar tillbaka ----
const EKP = { svans: [EK.x - 0.1, EK.z - 0.06], uppe: [EK.x - 0.2, EK.z + 0.18], mitt: [EK.x - 0.15, EK.z + 0.22], ekollon: [EKOLLON_POS[0][0] - 0.04, EKOLLON_POS[0][1] - 0.04] };
const E0 = MAL('21d', 38);
const SKUTT = [[E0 + 0.05, E0 + 0.45, 'svans', 'uppe', 0.05], [E0 + 0.8, E0 + 1.1, 'uppe', 'mitt', 0.04], [E0 + 1.3, E0 + 1.6, 'mitt', 'ekollon', 0.04],
  [E0 + 2.3, E0 + 2.8, 'ekollon', 'uppe', 0.06], [MAL('24b', 45) + 0.1, MAL('24b', 45) + 0.6, 'uppe', 'uppe', 0.06]];
const TAR = E0 + 1.9;
function ekorrPos(t) {
  let [x, z] = EKP.svans, y = 0;
  for (const [a, b, f, g, h] of SKUTT) { if (t >= b) [x, z] = EKP[g]; else if (t >= a) { const u = (t - a) / (b - a), m = mjuk(u);
    x = lerp(EKP[f][0], EKP[g][0], m); z = lerp(EKP[f][1], EKP[g][1], m); y = h * Math.sin(Math.PI * u); } }
  return [x, y, z];
}

// ---- en bildruta ----
async function bildruta(t) {
  KORTEN.parm(t);
  for (const k of [...ORDNING, EKORREN, SVAMPEN]) {
    // svampen: hatten tittar fram, sedan helt upp
    stall(k, k === SVAMPEN ? KORTEN.e(k, t, t < SVAMP_UPP ? 0.45 * mjuk((t - k.upp) / 0.5) : 0.45 + 0.55 * reser((t - SVAMP_UPP) / 0.45)) : KORTEN.e(k, t));
    if (k.vaj !== undefined) k.m.rotation.z = 0.02 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  EKORREN.m.visible = t >= EKORREN.upp; SVAMPEN.m.visible = t >= SVAMPEN.upp;
  // eken: kal, kritans löv, kronan som växer ut från lövet
  krona(t < KRONA[0] ? 0 : (t - KRONA[0]) / (KRONA[1] - KRONA[0]));
  EKKAL.m.visible = t < KRONA[1];
  LOVET.m.visible = t >= LOV_KLAR - 0.05 && t < KRONA[1]; LOVET.m.scale.setScalar(1 - 0.6 * mjuk((t - KRONA[1] + 0.5) / 0.5));
  LOVET.m.rotation.z = 0.06 * Math.sin((t - LOV_KLAR) * 1.6) * k01((t - LOV_KLAR) / 0.8);
  EKHOST.m.scale.setScalar(1 + 0.025 * bump(MAL('24c', 46) + 0.3, MAL('24c', 46) + 1.0, t, 0.2));
  // svampen studsar (rad 24e), stubben och svampen glimtar
  SVAMPEN.m.scale.setScalar(1 + 0.12 * Math.max(bump(SVAMP_UPP, SVAMP_UPP + 0.5, t, 0.15), bump(MAL('24e', 48) + 0.2, MAL('24e', 48) + 0.8, t, 0.2)));
  HOGBAK.m.scale.set(1 + 0.03 * bump(MAL('24d', 47) + 0.1, MAL('24d', 47) + 1.2, t, 0.3) * Math.sin(t * 14), 1, 1);
  // markens löv studsar på sina färgord (rad 19b)
  const ORD = [30, 31, 32].map(n => MAL('19b', n) + 0.25), hejLov = MAL('24c', 46) + 0.3;
  MARKLOV.forEach((m, i) => { const h = Math.max(bump(ORD[i], ORD[i] + 0.6, t, 0.2), 0.7 * bump(hejLov + i * 0.12, hejLov + 0.6 + i * 0.12, t, 0.2));
    m.position.y = m.userData.p.y + 0.02 * h; m.scale.setScalar(1 + 0.25 * h); });
  // ekorren
  { const [x, y, z] = ekorrPos(t); EKORREN.m.position.set(x, SIDA + y, z);
    const bl = ((t + 1.3) % 3.6) < 0.14; EKORREN.m.material.map = EKORREN.m.customDepthMaterial.map = bl ? EKORRE_BLUND : EKORRE; }
  // ekollonet ekorren tar: följer med i famnen, ligger kvar hos den
  { const k = EKOLLONEN[0]; if (t >= TAR) { const [x, y, z] = ekorrPos(t); k.m.position.set(x + 0.045, SIDA + y + 0.035 * k01((t - TAR) / 0.25), z + 0.012); }
    else k.m.position.set(k.x, k.y, k.z); }
  // halsduken: ligger där kritan ritade den, reser sig, glider i en båge till rävens hals
  { const K = HALSDUKKORT; K.m.visible = t >= HD_KLAR - 0.05 && t < HD_PA; K.flik.visible = K.m.visible && t > HD_UPP + 0.3 && t < HD_GLID[0];
    K.m.rotation.x = -Math.PI / 2 * (1 - reser((t - HD_UPP) / 0.45)); K.m.position.set(K.x, K.y, K.z); K.m.scale.setScalar(1);
    if (t >= HD_GLID[0] && t < HD_PA) { const u = mjuk((t - HD_GLID[0]) / (HD_GLID[1] - HD_GLID[0])), mal = fig2varld([512, 640]);
      K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y - K.h * 0.6 * 0.5, u) + 0.12 * Math.sin(Math.PI * u), lerp(K.z, mal.z + 0.02, u)); K.m.scale.setScalar(lerp(1, 0.6, u)); } }
  lov(t);
  vik(RAVKORT, KORTEN.e(RAVKORT, t)); rav.visible = t >= RAV_UPP;
  await ritaRav(t);
  DOF.fokus(KAM.aktiv(t));
  scen.updateMatrixWorld(true);
  // kritan och glimtarna i #ov
  let ov = KR.rita(t);
  MARKLOV.forEach((m, i) => { ov += glimt(t, ORD[i], m.position); ov += glimt(t, hejLov + i * 0.12, m.position, 70, 3); });
  const ORD3 = [3.66, 4.55, 5.68].map(s => MAL('20b', 34) + s);   // "Ett … två … tre"
  EKOLLONEN.forEach((k, i) => { const h = bump(ORD3[i], ORD3[i] + 0.5, t, 0.15); k.m.scale.setScalar(1 + 0.25 * h); ov += glimt(t, ORD3[i], k.m.position.clone().add(v3(0, 0.03, 0)), 60, 3); });
  ov += glimt(t, hejLov, v3(EK.x, SIDA + 0.75, EK.z), 160, 5) + glimt(t, MAL('24e', 48) + 0.2, SVAMPEN.m.position.clone().add(v3(0, 0.1, 0)), 80, 4)
    + glimt(t, MAL('24b', 45) + 0.3, EKORREN.m.position.clone().add(v3(0, 0.12, 0)), 70, 3) + glimt(t, S('01a') + 0.2, v3(0, SIDA + 0.1, 0.2), 120, 4);
  $('ov').innerHTML = ov;
  DOF.komp.render();
}

// ---- kameran: vyerna ur storyboarden, en svag glidning i varje ----
const VY = {
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  ek: () => [v3(EK.x + 0.25, 0.62, 1.55), v3(EK.x + 0.12, 0.5, EK.z), 32],
  gren: () => [LOVPOS.clone().add(v3(0.05, 0.0, 0.78)), LOVPOS.clone(), 30],
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.27, 0.6)), g.clone().add(v3(0, 0.22, 0)), 28],
  bred: () => [v3(0, 0.6, 1.8), v3(0, 0.34, -0.2), 32],
  halsduk: () => [v3(-0.08, 0.42, 0.95), v3(-0.07, 0.12, 0.28), 30],
  hog: () => [v3(HOG.x - 0.14, 0.5, HOG.z + 1.08), v3(HOG.x - 0.14, 0.25, HOG.z + 0.02), 30],   // vidare än storyboarden: hoppet syns helt
  uppslag: () => [v3(0, 0.98, 1.8), v3(0, 0.12, -0.02), 32],   // närmare: bokens kant syns inte
  ekmark: () => [v3(-0.3, 0.42, 0.95), v3(-0.33, 0.13, 0.02), 30],
  ekollon: () => [v3(-0.38, 0.22, 0.42), v3(-0.38, 0.1, 0.06), 28],
  stam: () => [v3(-0.5, 0.4, 0.9), v3(-0.5, 0.16, -0.04), 30],
  stubbe: () => [v3(0.6, 0.36, 0.82), v3(0.66, 0.1, 0.0), 30],
  'rav-svamp': () => [v3(0.62, 0.42, 1.05), v3(0.6, 0.16, 0.1), 30],
  hejda: g => [g.clone().add(v3(0.18, 0.34, 0.95)), g.clone().add(v3(-0.18, 0.2, -0.3)), 32],
};
satt(PARM[1]); scen.updateMatrixWorld(true);
const KAM = kamera(cam, VY, { blur: n => /nara|ekollon|gren/.test(n) ? 0.008 : /halv|halsduk|hog|stam|stubbe|svamp|ekmark/.test(n) ? 0.006 : 0.003 }), { vy, glid } = KAM;
const GLID = { '02': [0, 1.6], '05': [0.1, 1.3] };   // in mot eken; ut från grenen till eken
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'logga' ? 'bord' : r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (KAM.VY[namn].length ? r.st.plats : '');
  if (r.id === '01a') { KAM.oppning(r.s, S('01b') + 0.9, 'in'); forra = 'in'; continue; }
  if (r.id === '01b') continue;
  if (r.id === '26') { KAM.stangning(r.s + 0.1); continue; }
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
const plan = KAM.plan(DURATION);

// ---- ljudet: Malin, räven och effekterna ur raderna, kritans ritljud som slinga, skogen lågt under allt ----
const VOL = f => /rav-/.test(f) ? 1.5 : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|hopp-mjuk|landa-mjuk)/.test(f) ? 0.7 : 1.0;
starta(RD, plan, bildruta, { rost: 'hosten-i-boken', vol: VOL, matta: ['skogsljud/skogsljud-1', 0.25], RIT: KR.RIT });
