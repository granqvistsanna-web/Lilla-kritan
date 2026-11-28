// 064 Vintern i boken, grind 6: hela scenen i Kritans bok. Uppslaget som storyboarden (storyboard/scen.js, grind 5 godkänd),
// motorn som 063 (avsnitt/063-hosten-i-boken/scener/boken/boken.js): korten, kritan, kaninens v2-rigg på ett kort, kameran som vyer.
// Snön i kod: kullarna, granarna och trädet har en snöfri och en snöig bild (kod/vinter.js, prov/trad/trad.js), och snön växer in
// uppifrån (marken nerifrån) i rad 05b. Fåglarna är 043:s fagel.js. Scenens t = 0 är rad 01a (loggan, rad 00, läggs på i sammansättningen).
//   node avsnitt/062-sommaren-i-boken/scener/render.mjs avsnitt/064-vintern-i-boken/scener/boken --snabb
import * as THREE from 'three';
import { duk, tex, trim, skrivbord, skapaBok, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { $, k01, lerp, mjuk, bump, reser, v3, rader, scenen, bild, lad, ruta, dataUrl, kontur, bredareC, mat, mark, vik, stall, kortmotor,
  PARM, SLUTET, fallning, figurKort, vink, gaRikt, kritan, ljuset, djupskarpa, kamera, starta } from '/produktion/three-rum/popupbok/uppslag.js';
import { kaltTrad, sittplats, W as TW, H as TH } from '/avsnitt/064-vintern-i-boken/prov/trad/trad.js';
import { granSno, kulleSno, frost } from '/avsnitt/064-vintern-i-boken/kod/vinter.js';

// ---- raderna ----
const RD = rader(await import('/avsnitt/064-vintern-i-boken/storyboard/rader.mjs')), { RAD, RR, S, LN, MAL, SVAR, DURATION, rad, GLES, MATTA } = RD;
const ORD = { snoflinga: 0.37, knarr1: 0.06, knarr2: 0.73, plopp1: 0.05, plopp2: 0.15, snoboll: 1.2, stor: 0.22, mellan: 1.11, liten: 2.4,
  en: 0.06, tva: 0.72, tre: 1.15, rod: 0.26, bla: 0.27, gul: 0.49, snogubbe: 0.75, ogon: 0.33, morot: 0.35, armar: 0.24, halsduk: 0.6, fin: 0.44 };   // samma som rader.mjs (whisper)

// ---- renderaren ----
const SC = scenen(), { scen, cam } = SC;

// ---- bilderna ----
const P = '/produktion/three-rum/popupbok/bilder/', B = '/assets/bakgrunder/', RQ = '/assets/rekvisita/';
const [HIMMEL, MOLN1, MOLN2, MOLN3, SNOBOLL, GUBBE, TUSS] = await Promise.all([
  ...['himmel', 'moln-stor', 'moln-mellan', 'moln-liten'].map(n => P + n + '.png'),
  RQ + 'snoboll/cut/snoboll.png', RQ + 'snogubbe/cut/snogubbe.png', RQ + 'snotuss/cut/snotuss.png'].map(lad));
const PB_SRC = '/avsnitt/039-kaninen-aker-pulka/klader-lager/pannband.png';   // bandet på huvudet (039): kritans teckning, kortet och bandet är samma bild
const [GRAN_I, KBAK_I, KFRAM_I, FLINGA_I, PB_I] = await Promise.all([B + 'skogen-gron-saker/gran.png', P + 'kulle-bak.png', P + 'kulle-fram.png',
  RQ + 'snoflinga/cut/snoflinga.png', PB_SRC].map(bild));
const FLINGA = tex(trim(FLINGA_I)), PANNBAND = tex(trim(PB_I));
const KONTUR = Object.fromEntries(await Promise.all([['flinga', 'snoflinga-kontur.json'], ['pannband', 'pannband-kontur.json']].map(async ([n, f]) => [n, await kontur('/avsnitt/064-vintern-i-boken/kod/' + f)])));   // kod/: konturerna med detaljstreck (2026-11-28)
// snöflingan: bara konturen, i sex drag (ett per arm), så att armarna blir skarpa (Sanna 28/11: "no need for inner drawing, just outline")
const FLINGA_DRAG = (await (await fetch('/avsnitt/064-vintern-i-boken/kod/snoflinga-kontur-armar.json')).json()).drag;
const FLINGA_URL = await dataUrl(RQ + 'snoflinga/cut/snoflinga.png'), PB_URL = await dataUrl(PB_SRC);

// ---- snön på korten: en snöfri bild (A) och en snöig (B) i samma ruta; snön växer in uppifrån (marken: nerifrån) ----
function union(A, Bc) {   // beskär båda till det som syns i någon av dem
  let y0 = A.height, y1 = 0, x0 = A.width, x1 = 0;
  for (const c of [A, Bc]) { const a = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (let y = 0; y < c.height; y++) for (let u = 0; u < c.width; u++) if (a[(y * c.width + u) * 4 + 3] > 128) { if (y < y0) y0 = y; if (y > y1) y1 = y; if (u < x0) x0 = u; if (u > x1) x1 = u; } }
  return [A, Bc].map(c => { const ut = duk(x1 - x0 + 3, y1 - y0 + 3); ut.getContext('2d').drawImage(c, x0 - 1, y0 - 1, ut.width, ut.height, 0, 0, ut.width, ut.height); return ut; });
}
function snoBild(A, Bc, nerifran = false) {
  const c = duk(A.width, A.height), x = c.getContext('2d'), tmp = duk(A.width, A.height), y = tmp.getContext('2d'), T = tex(c); let kk = -1;
  const satt = k => { k = Math.round(k01(k) * 90) / 90; if (k === kk) return; kk = k; const Hh = A.height, mj = 0.35;   // mjuk kant: snön lägger sig, inget svep
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
BAK.forEach(k => k.m.receiveShadow = false);   // annars blev granarnas och trädets skuggor grå spökträd på de snöiga kullarna
const VHIMMEL = (() => { const c = frost(HIMMEL.image), x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = 0.35; x.fillStyle = '#F2F6FA'; x.fillRect(0, 0, c.width, c.height); return tex(bredareC(c, 1.5)); })();
pa(VHIMMEL, 1.53, 0, 0.01 + 1.53 / 2, 0.004, 2.3);   // vinterhimmel: blekare, kallare
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
  const klass = img.getAttribute('class'), s = klass.at(-1), yttre = document.createElementNS(NS, 'g'), grupp = document.createElementNS(NS, 'g');
  // yttre: riggens vridning; grupp (inre): örat dras ner under bandet (gom), med frosten och flingorna
  yttre.setAttribute('class', klass); grupp.setAttribute('class', 'ora-in ora-in-' + s); img.setAttribute('class', 'ora-bild'); img.replaceWith(yttre); yttre.appendChild(grupp); grupp.appendChild(img);
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
const PBPOS = [-0.22, 0.37], PBW = 402 * 0.34 / (FOT - TOPP), PB_STOR = 2.1;   // 28/11: större (teckningen var en smal remsa) och längre åt vänster, fritt från kaninens fötter   // lika bred som bandet på huvudet (bildens x 308–710): inget byte när kortet når fram
const PBKORT = kort(PANNBAND, PBW * PANNBAND.image.height / PANNBAND.image.width, ...PBPOS, { y: SIDA + 0.003 });
// den stora rullas längst bort (mot granarna), de mindre stannar före den: ingen boll rullar genom en annan
const BOLLPOS = [[-0.4, 0.2, 0.15], [-0.26, 0.2, 0.115], [-0.15, 0.2, 0.085]];
const BOLLTEX = BOLLPOS.map(() => { const T = SNOBOLL.clone(); T.center.set(0.5, 0.5); T.needsUpdate = true; return T; });   // egen textur per boll, så att den kan rulla
const BOLLAR = BOLLPOS.map(([x, z, h], i) => kort(BOLLTEX[i], h, x, z, { flik: false }));
BOLLAR.forEach((k, i) => { k.m.material.color.set('#E2EAF6'); k.m.material.emissiveMap = BOLLTEX[i]; });   // lite blåare än snön, så att bollarna syns mot den
// snögubben (Sanna 28/11: "adding nose eyes arms"): tornet av de tre bollarna är snögubben, och ögonen, moroten, pinnarmarna och halsduken
// poppar upp på sina ord (rad 22c–22f). Delarna är urklippta ur snogubbe.png (kod/gubbe-delar/), armarna ritas här. Bollarna och delarna
// ligger i gruppen GUBB med foten i den stora bollens fotpunkt, så att tornet fälls ner som ett kort när boken stängs.
// SNOGUBBEN är ett osynligt kort som bara ger fällningens tider och vinkel (FALL.ner).
const SNOGUBBEN = kort(GUBBE, 0.30, -0.4, 0.207); SNOGUBBEN.m.visible = false; if (SNOGUBBEN.flik) SNOGUBBEN.flik.visible = false;
const [BX, BZ] = [BOLLPOS[0][0], BOLLPOS[0][1]], GUBB = new THREE.Group(); GUBB.position.set(BX, SIDA, BZ); scen.add(GUBB);
BOLLAR.forEach(k => GUBB.attach(k.m));
const GD = '/avsnitt/064-vintern-i-boken/kod/gubbe-delar/', [OGA_V, OGA_H, MOROT, HALSDUK] = await Promise.all(['oga-v', 'oga-h', 'morot', 'halsduk'].map(n => lad(GD + n + '.png')));
const ARM = (() => { const c = duk(320, 120), x = c.getContext('2d'), gren = (w, f) => { x.lineWidth = w; x.strokeStyle = f; x.lineCap = x.lineJoin = 'round';
    x.beginPath(); x.moveTo(8, 78); x.quadraticCurveTo(150, 70, 300, 30); x.moveTo(205, 58); x.quadraticCurveTo(232, 40, 250, 14); x.moveTo(120, 72); x.lineTo(150, 98); x.stroke(); };
  gren(30, '#FFFFFF'); gren(15, '#6B4426'); x.globalAlpha = 0.35; gren(6, '#8A5C36');   // vit kant, brun pinne, ljusare mitt (kritton)
  return tex(c); })();
// en del: ett platt kort i gruppen, w bred i världen, origo i (ox, oy) av bilden (0–1); pop: tid då den poppar ut
const GDEL = [];
function del(map, w, [x, y, z], pop, o = {}) { const h = w * map.image.height / map.image.width, g = new THREE.PlaneGeometry(w, h);
  g.translate((0.5 - (o.ox ?? 0.5)) * w, ((o.oy ?? 0.5) - 0.5) * h, 0);
  const m = new THREE.Mesh(g, mat(map, { alphaTest: 0.5, side: THREE.DoubleSide })); m.position.set(x, y, z); if (o.rz) m.rotation.z = o.rz; if (o.sx) m.scale.x = o.sx;
  GUBB.add(m); GDEL.push({ m, pop, sx: o.sx ?? 1, vira: o.vira }); return m; }
const HUVUD = 0.15 * 0.8 + 0.115 * 0.8 + 0.085 / 2, MITT = 0.15 * 0.8 + 0.115 / 2, KH = 0.085 / 456, KM = 0.115 / 582;   // bollarnas mitt; snogubbe.png:s px → världen
const TUSSEN = kort(TUSS, 0.06, 0, 0, { flik: false });
Object.assign(TUSSEN.m.material, { emissiveMap: TUSS, emissive: new THREE.Color(0.32, 0.32, 0.34) });   // vitare snö, inte en grå mössa
// spåren: fotspåren (rad 06 och 06c, byggs efter gångarna) och bollarnas rullspår (rad 15–15c), ljusblå i snön
// fotspåret (28/11 "polish fotsteg i snön"): en mjuk fördjupning, inte en blå fläck: ljust blågrå botten, mörkare skugga i den bakre
// kanten (ljuset kommer uppifrån vänster), en ljus snövall runt om och tre små tåintryck fram
const SPAR_TEX = (() => { const c = duk(96, 128), x = c.getContext('2d');
  const oval = (cx, cy, rx, ry, fill, blur = 0) => { x.filter = blur ? `blur(${blur}px)` : 'none'; x.fillStyle = fill; x.beginPath(); x.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); x.fill(); };
  oval(48, 70, 30, 44, 'rgba(255,255,255,0.9)', 4);          // snövallen runt
  oval(48, 72, 22, 36, 'rgba(140,168,210,0.95)', 2.5);       // fördjupningen
  oval(46, 62, 17, 26, 'rgba(100,132,184,0.85)', 3);          // skuggan i bakre kanten
  oval(50, 80, 15, 22, 'rgba(178,200,230,0.8)', 3);          // ljusare botten fram
  [[34, 30], [48, 24], [62, 30]].forEach(([u, v]) => oval(u, v, 7, 8, 'rgba(140,168,208,0.8)', 1.5));   // tårna
  x.filter = 'none'; return tex(c); })();
const sparMat = () => new THREE.MeshBasicMaterial({ map: SPAR_TEX, transparent: true, depthWrite: false, opacity: 0 });
const PLATS = { in: [0.52, 0.2], mitt: [-0.08, 0.2], steg: [0.06, 0.24], bollar: [0.04, 0.26], gran: [-0.52, 0.0], trad: [0.16, 0.1], 'vid-bollar': [0.14, 0.3], 'mot-trad': [-0.2, 0.1] };
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
const ANDE = [0, 1, 2].map(() => { const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: FLINGA_TEX, depthWrite: false, transparent: true, opacity: 0 })); m.visible = false; scen.add(m); return m; });
const FOTPUFF = Array.from({ length: 7 }, puff);

// ---- ljuset (blekt vinterljus) och skärpedjupet ----
ljuset(scen, { himmel: ['#F4F8FF', '#C8D2DC', 2.3], sol: ['#FFF6EA', 2.0], hojd: 4.4 });
const DOF = djupskarpa(SC);

// ---- tiderna ----
const OPPNA = S('01b'), STANG = S('26');
const SNO = [S('05b') - 0.4, S('05b') + RR['05b'].d - 1.0];   // snön växer in (ca 4,3 s), klar 1 s före klippet: ett reaktionsslag på den vita världen
const KANIN_UPP = S('06');   // 28/11: kaninen går in i bild från höger ("have bunny walk in view"); kortet står redan, utanför bild
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
// tornet (Sanna 28/11: "better assemble animation of the 3 snöbollar"): den mellersta hoppar i en båge upp på den stora, sedan den lilla
// upp på den mellersta (landar 0,8 och 1,6 s in i rad 22, sno-duns), och på "snögubbe" tonas snögubben in över tornet
const STAPEL = [null, { a: S('22') + 0.15, d: 0.65, y: 0.15 * 0.8 }, { a: S('22') + 0.95, d: 0.65, y: 0.15 * 0.8 + 0.115 * 0.8 }];
const KLAPP0 = MAL('22g', 49) + LN(49) + 0.15 - 1.0;   // klappen börjar; första klappen 1,0 s in
const POP = { ogon: MAL('22c', 45) + ORD.ogon, morot: MAL('22d', 46) + ORD.morot, armar: MAL('22e', 47) + ORD.armar, halsduk: MAL('22f', 48) + ORD.halsduk + 0.1, fin: MAL('22g', 49) + ORD.fin };
const ANS = 1.4;   // ansiktet större än på snogubbe.png: huvudet är litet i bild, ögonen och moroten ska synas tydligt
del(OGA_V, 38 * KH * ANS, [-90 * KH, HUVUD - 5 * KH, 0.012], POP.ogon); del(OGA_H, 38 * KH * ANS, [94 * KH, HUVUD - 2 * KH, 0.012], POP.ogon + 0.18);
del(MOROT, 167 * KH * ANS, [0, HUVUD - 62 * KH, 0.013], POP.morot, { ox: 0.1 });   // växer ut från roten (vänster ände), mitt under ögonen
del(ARM, 0.085, [0.045, MITT + 0.012, 0.0012], POP.armar + 0.25, { ox: 0.02, oy: 0.65, rz: 0.3 });             // bildens höger
del(ARM, 0.085, [-0.045, MITT + 0.012, 0.0012], POP.armar, { ox: 0.02, oy: 0.65, rz: -0.3, sx: -1 });          // bildens vänster (speglad pinne)
del(HALSDUK, 450 * KM, [3 * KM, HUVUD - 0.085 / 2 + 0.003 - 0.5 * 305 * KM, 0.014], POP.halsduk, { vira: true });
const TU = { a: S('17') + 0.15, land: S('17') + 0.7, skak: MAL('17', 29) + LN(29) + 0.5, ner: MAL('17', 29) + LN(29) + 1.3 };
const VINK = (id, n, d = 1.8) => [MAL(id, n) + 0.3, d];

// ---- kaninens platser och rörelser ----
const GA = [   // går lugnt: [start, slut, från, till, skutt]
  [S('06') + 0.1, S('06') + 2.5, PLATS.in, PLATS.mitt, false],   // in i bild (halvbilden visar x −0,46 … 0,30)
  [S('06c') + 0.15, S('06c') + 2.6, PLATS.mitt, PLATS.steg, false],
  [S('15') - 0.9, S('15') + 0.05, PLATS.steg, PLATS.bollar, false],
  [S('17') - 0.002, S('17'), PLATS.bollar, PLATS.gran, false],   // på klippet: vägen till granen går genom bollarna
  [S('19b') + 0.5, S('19b') + 1.0, PLATS.gran, PLATS['mot-trad'], false],   // utanför bild (trädet i närbild)
  [S('20') + 0.05, S('20') + 1.1, PLATS['mot-trad'], PLATS.trad, true],
  [S('21') - 0.002, S('21'), PLATS.trad, PLATS['vid-bollar'], false],   // på klippet (förut syntes den glida i trädets vy)
];
const SKUTT = [SVAR('06b', 10) + 0.25, SVAR('06b', 10) + 0.85];   // två små skutt på stället
function kaninPos(t) {
  let [x, z] = GA[0][2], y = 0;
  for (const [a, b, f, g, sk] of GA) { if (t >= b) [x, z] = g; else if (t >= a) { const u = (t - a) / (b - a), m = mjuk(u);
    x = lerp(f[0], g[0], m); z = lerp(f[1], g[1], m); y = sk ? 0.03 * Math.abs(Math.sin(Math.PI * 2 * u)) : 0; } }   // gången: riggens steg gungar kroppen själv (lyft), inget eget gung i otakt
  for (const s of SKUTT) if (t > s && t < s + 0.4) y = 0.06 * Math.sin(Math.PI * (t - s) / 0.4);
  return [x, y, z];
}
const GA_LANG = GA.filter(([a, b, , , sk]) => b - a > 0.3 && sk);   // skutten: riktningsposen (gångarna vänder sig själva i gang())
// gången som filmens gang() (lk-figur, rigg-motor.js): stegklockan följer farten till hälften, stegen och riktningen tonas in och ut
// (figuren vänder sig mot oss i början och slutet), blicken går 0,2 s före; speglas aldrig, armarna som riggens gångarmar
const stegKlocka = (tl, d) => 0.5 * tl + 0.5 * d * mjuk(tl / d);
function gang(f, p, t, [a, b, fr, ti]) {
  const d = b - a, tl = t - a, kant = Math.min(tl, d - tl), rs = Math.abs(ti[0] - fr[0]) > 0.1 ? Math.sign(ti[0] - fr[0]) : 0;
  const [, gp] = L.steg(stegKlocka(tl, d), mjuk((kant - 0.2) / 0.3), 0.8 * rs * mjuk((kant - 0.1) / 0.5));
  return [{ ...f, titt: [9 * rs * mjuk((kant + 0.2) / 0.3), 2] }, L.blandaPose(p, gp, mjuk((kant + 0.2) / 0.3))];
}
// ett spår där en fot sätts ner i gången (stegklockan i gang(): foten står när steget byter sida), vänster och höger fot om vartannat,
// under fötterna (riggens fötter ca ±90 px = ±0,033 från mitten); syns från nedsättningen, kvar tills boken stängs
const SPAR = [];
for (const [a, b, f, g, sk] of GA) { if (sk || b - a < 1 || !(a >= S('06') && a < S('07'))) continue;   // gången in och stegen i 06c
  const d = b - a, rs = Math.sign(g[0] - f[0]); let fore = 0;
  for (let tl = 0.05; tl < d; tl += 1 / 120) { const n = Math.floor(stegKlocka(tl, d) * 2.4); if (n === fore) continue; fore = n;
    if (tl < 0.35 || tl > d - 0.25) continue;   // inga spår när figuren nästan står still
    const u = mjuk(tl / d), sida = n % 2 ? 1 : -1, m = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.04), sparMat());
    m.rotation.x = -Math.PI / 2; m.rotation.z = -rs * Math.PI / 2;   // tårna i gångriktningen; spåret är bredare i djupled (kameran ser snön snett uppifrån, annars blev det streck)
    m.position.set(lerp(f[0], g[0], u) + sida * 0.03, SIDA + 0.0016, lerp(f[1], g[1], u) + 0.012 + sida * 0.006);
    m.userData.t = a + tl; scen.add(m); SPAR.push(m); } }
// öronen ploppar ut ur bandet (039): ihoptryckta −14 → ut med en liten efterstudsning
const plopp = (t, a) => t < a ? -14 : t < a + 0.25 ? lerp(-14, 5, mjuk((t - a) / 0.25)) : 5 * Math.exp(-(t - a - 0.25) * 7) * Math.cos((t - a - 0.25) * 14);
const REAKTION = { '22b': 'nyfiken', '22c': 'kawaii', '22d': 'skrattar', '22e': 'jatteglad', '22f': 'kawaii', '22g': 'skrattar', '06': 'jatteglad', '06b': 'kawaii', '06c': 'glad', '07b': 'nyfiken', '09': 'kawaii', '10': 'jatteglad', '11': 'forvanad',
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
    // 19: lyssnarposen från 18 tonar ut medan kameran glider till trädet
    case '18': case '19': { const k = id === '18' ? mjuk((tl - 0.3) / 0.4) : 1 - mjuk(tl / 0.5); f = { ...B('nyfiken'), titt: [12 * k, -6 * k] }; p.rikt = 0.35 * k; p.oron = [-6 * k, 14 * k]; p.luta = 2 * k; break; }
    case '20': { f = { ...B('glad'), titt: [12, -14] }; p.upp = 0.45 * mjuk((tl - 1.1) / 0.4); p.rikt = 0.3;
      const a = SVAR('20', 35) - 0.1; [f, p] = vink(f, p, t - a, 2.0); f = L.blanda(f, 'jatteglad', bump(a, a + 2.0, t)); break; }
    case '21': f = { ...B('nyfiken'), titt: [-14, 6] }; p.rikt = -0.45; break;
    case '22': f = L.blanda({ ...B('nyfiken'), titt: [-14, 0] }, 'jatteglad', mjuk((t - GUBBE_UPP) / 0.3)); p.rikt = -0.45; break;
    case '22b': case '22c': case '22d': case '22e': case '22f': { f = { ...B('nyfiken'), titt: [-14, -4] }; p.rikt = -0.45; if (id === '22b') p.luta = 3 * mjuk((tl - 1.2) / 0.5);
      const glad = Object.values(POP).reduce((m, a) => Math.max(m, bump(a, a + 1.0, t, 0.2)), 0); f = L.blanda(f, 'jatteglad', glad); break; }
    case '22g': { const k0 = KLAPP0; f = L.blanda({ ...B('nyfiken'), titt: [-14, 0] }, 'jatteglad', mjuk((t - POP.fin) / 0.3)); p.rikt = -0.45 * (1 - mjuk((t - k0) / 0.4));
      if (t > k0 && t < k0 + 3) p = L.blandaPose(p, L.ROR.klappa(t - k0)[1], 1); break; }   // riggens klapp: händerna möts på k0 + 1,0, 1,5 och 2,0 s (klappljuden i rader.mjs)
    case '23': [f, p] = nick({ ...f, titt: [0, 0] }, p, t - SVAR('23', 38)); break;
  }
  if (id === '24' || id === '25') { const n = id === '24' ? 39 : 43; [f, p] = vink({ ...B('jatteglad') }, p, t - MAL(id, n), r.d - 0.4, true); }
  // öronen: ihoptryckta under bandet tills de ploppar ut ett i taget (bildens vänstra först)
  if (t >= PB_PA - 0.35 && t < S('13')) { const k = mjuk((t - PB_PA + 0.35) / 0.35); p.oron = [lerp(p.oron[0], plopp(t, PLOPP[0]), k), lerp(p.oron[1], plopp(t, PLOPP[1]), k)]; }
  // fryser: darrar lätt
  const darr = bump(DARR[0], DARR[1], t, 0.3); if (darr > 0) { p.luta = (p.luta || 0) + darr * 1.2 * Math.sin(2 * Math.PI * 7 * t); p.strack = (p.strack || 0) - 0.02 * darr; }
  { const w = GA.find(([a, b, , , sk]) => !sk && b - a > 0.3 && t > a - 0.2 && t < b + 0.2); if (w) [f, p] = gang(f, p, t, w); }   // riktiga steg
  const gr = gaRikt(GA_LANG, t, 0.8); if (gr) { p.rikt = gr; f = { ...f, titt: [12 * Math.sign(gr), 2] }; }   // går i riktningsposen, speglas aldrig
  for (const s of SKUTT) { p = L.blandaPose(p, 'huka', bump(s - 0.25, s + 0.02, t, 0.12) + 0.6 * bump(s + 0.38, s + 0.6, t, 0.1)); }
  // reaktionsslaget tonar ut 0,35 s in i nästa rad (förut slutade det tvärt på radgränsen, och det syntes där kameran glider i stället för att klippa)
  const reak = (rr, x) => { const RE = REAKTION[rr.id], k = RE ? bump(rr.d - GLES - 0.15, rr.d + 0.35, x, 0.3) : 0; if (k > 0) { f = L.blanda(f, RE, 0.9 * k); p.luta = (p.luta || 0) + (RAD.indexOf(rr) % 2 ? 2.5 : -2.5) * k; } };
  const fo = RAD[RAD.indexOf(r) - 1]; reak(r, tl); if (fo && tl < 0.4) reak(fo, tl + fo.d);
  p.strack = (p.strack || 0) + 0.006 * Math.sin(t * 2.4);   // andas
  return [BL(f, t), p];
}

async function ritaKanin(t) {
  const [f, p] = kaninen(t); L.rita(G, f, p);
  // bandet: glider ner över öronen (150 px på 0,45 s), sitter kvar till slutet
  const band = t >= PB_GLID[1]; $('band').setAttribute('display', band ? 'inline' : 'none');
  if (band) $('band').setAttribute('transform', `translate(0 ${(-150 * (1 - mjuk((t - PB_GLID[1]) / 0.45))).toFixed(1)})`);
  // öronen trycks ner under bandet när det glider på (180 px ner, 30° inåt: helt dolda bakom huvudet och bandet) och ploppar upp ett i taget
  [['l', 350, 300, 1], ['r', 675, 305, -1]].forEach(([s, px, py, v], i) => {
    const g = mjuk((t - PB_GLID[1]) / 0.45) * (1 - reser((t - PLOPP[i]) / 0.25));
    G.querySelector('.ora-in-' + s).setAttribute('transform', Math.abs(g) < 1e-3 ? '' : `translate(0 ${(180 * g).toFixed(1)}) rotate(${(30 * v * g).toFixed(2)} ${px} ${py})`); });
  // frosten och flingorna på öronspetsarna
  const fr = 0.85 * mjuk((t - FROST[0]) / 1.2) * (1 - mjuk((t - FROST[1]) / 1.0));
  G.querySelectorAll('.frost').forEach(e => e.setAttribute('opacity', fr.toFixed(3)));
  G.querySelectorAll('.flk').forEach(e => { const i = +e.dataset.i, x0 = +e.dataset.x, y0 = +e.dataset.y, a = ORONSNO[0] + i * 0.45, u = k01((t - a) / 0.9), av = k01((t - ORONSNO[1] - i * 0.05) / 0.6);
    const vis = t > a && av < 1; e.setAttribute('display', vis ? 'inline' : 'none'); if (!vis) return;
    e.setAttribute('transform', `translate(${(x0 + 30 * Math.sin(u * 5 + i) * (1 - u) + 40 * av).toFixed(1)} ${(y0 - 160 * (1 - mjuk(u)) + 220 * av * av).toFixed(1)}) scale(${(0.6 + 0.4 * mjuk(u)).toFixed(2)})`);
    e.setAttribute('opacity', (1 - av).toFixed(2)); });
  await KANKORT.textur(t);
}

// ---- korten: upp när boken öppnas, ner när den stängs (det främsta först, så att inget går genom något) ----
const FALL = fallning(satt, OPPNA, STANG, { ner: SLUTET.ner, parm: SLUTET.parm, slag: true });   // slutet ur uppslag.js (Sanna 28/11 "more snappy")
const ORDNING = FALL.upp([...BAK, ...GRANAR, TRADET]);
KANKORT.upp = KANIN_UPP - 0.6; SNOGUBBEN.upp = GUBBE_UPP - 0.6;   // står redan när de syns (kaninen utanför bild, snögubben tonas in)
KANKORT.z = PLATS['vid-bollar'][1];   // där kaninen står när boken stängs
FALL.ner([...ORDNING, KANKORT, SNOGUBBEN]);

// ---- kritan ritar ----
// mindre gnistor i hela avsnittet (Sanna 28/11: "smaller sparkles overall"): bara i 064. verktyg/kritan-ritar.js och uppslag.js är delade med
// 062, 063 och 065, så den globala gnistor() lindas här: stjärnorna × 0,6 runt sin mitt, utspridda lite tätare (× 0,85)
{ const G0 = window.gnistor, GN = 0.6, SPRID = 0.85;
  window.gnistor = (cx, cy, R, t, n) => `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${GN}) translate(${(-cx).toFixed(1)} ${(-cy).toFixed(1)})">${G0(cx, cy, R * SPRID / GN, t, n)}</g>`; }
const KR = kritan(cam), { glimt } = KR;
{ const a = S('03'), b = S('04'), c = S('08'), d = S('09');
  // ritar under båda replikerna (ca 3,8 s, regel 5: 2–4,5 s; förut 2,1 s och kritan for runt) och är klar när frågan är ställd: sedan gisspausen
  const fa = MAL('03', 5) + LN(5) - 0.1;
  KR.teckning('flinga', FLINGA_URL, FLINGA_DRAG, ruta(FLINGA_I), () => FLINGAN,
    { in: [a + 0.1, a + 0.5], rit: [a + 0.6, fa], vanta: [fa + 0.15, b - 0.1], ut: [b + 0.1, b + 0.9] }, [b + 0.05, FL_KLAR], [240, 40]);
  // pannbandet: ritas på ca 3,4 s (förut 1,8 s), sedan gisspausen (rad 08 fick 1,2 s till)
  const pa_ = c + 0.6 + 3.4;
  KR.teckning('pannband', PB_URL, KONTUR.pannband, ruta(PB_I), () => PBKORT.m,
    { in: [c + 0.1, c + 0.5], rit: [c + 0.6, pa_], vanta: [pa_ + 0.15, d - 0.1], ut: [d + 0.1, d + 0.9] }, [d + 0.05, PB_KLAR], [-280, -170]); }   // väntar uppe till vänster, inte på kaninens mage

// ---- en bildruta ----
const nivaSnofall = t => { const r = rad(t), n = [0, 60, 150][r.st.snofall], f = RAD[RAD.indexOf(r) - 1], n0 = f ? [0, 60, 150][f.st.snofall] : 0; return lerp(n0, n, mjuk((t - r.s) / 1.5)); };
const FAGEL_ORD = [MAL('19b', 32) + ORD.rod, MAL('19b', 33) + ORD.bla, MAL('19b', 34) + ORD.gul];
const FAGEL_PIP = [[S('18') + 0.1, 1], [S('18') + 0.7, 2], [S('18') + 1.4 + LN(30) + 1.8, 0], ...FAGEL_ORD.map((t, i) => [t - (i === 1 ? 0.35 : 0.05), i]),   // den blåa piper före "blå" (pipet dolde ordet)
  ...[0.7, 1.0, 1.3].map((o, i) => [MAL('20', 35) + LN(35) + o, i]), [MAL('24c', 41) + 0.3, 0], [MAL('24c', 41) + 0.45, 1], [MAL('24c', 41) + 0.6, 2]];
const FAGEL_LYFT = [[S('19') + 0.5, 0], [S('19') + 0.65, 1], [S('19') + 0.8, 2], ...FAGEL_ORD.map((t, i) => [t, i]), [MAL('24c', 41) + 0.25, 0], [MAL('24c', 41) + 0.4, 1], [MAL('24c', 41) + 0.55, 2]];
async function bildruta(t) {
  FALL.parm(t);
  { const [x, y, z] = kaninPos(t); kanin.position.set(x, KANKORT.y + y, z); }   // först: tussen och pannbandet räknar mot kaninen
  for (const k of [...ORDNING, SNOGUBBEN]) {
    stall(k, FALL.e(k, t));
    if (k.vaj !== undefined) k.m.rotation.z = 0.015 * Math.sin(t * 1.1 + k.vaj) * k01((t - k.upp - 0.45) / 0.5);
  }
  // tornet fälls som snögubbens (osynliga) kort, studsar på "fin" och "Hej då, snögubben"
  SNOGUBBEN.m.visible = false; GUBB.rotation.x = SNOGUBBEN.m.rotation.x;
  GUBB.scale.setScalar(1 + 0.04 * Math.max(bump(MAL('24d', 42) + 0.3, MAL('24d', 42) + 0.9, t, 0.15) * Math.abs(Math.sin((t - MAL('24d', 42)) * 10)),
    bump(POP.fin, POP.fin + 0.6, t, 0.15) * Math.abs(Math.sin((t - POP.fin) * 10))));
  for (const D of GDEL) { const u = (t - D.pop) / 0.3; D.m.visible = u > 0; if (!D.m.visible) continue;
    const s = reser(u);   // poppar ut med en liten efterstudsning
    if (D.vira) D.m.scale.set(s, mjuk(u * 1.6), 1); else D.m.scale.set(D.sx * s, s, 1); }
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
  // pannbandet: står (som teckningen, kritans regel 3) när fyllningen är klar och studsar lite på popen, glider sedan i en båge till huvudet
  { const K = PBKORT; K.m.visible = t >= PB_KLAR - 0.05 && t < PB_GLID[1]; K.flik.visible = K.m.visible && t < PB_GLID[0];
    K.m.rotation.x = 0; K.m.position.set(K.x, K.y, K.z); K.m.scale.setScalar(PB_STOR * (1 + 0.06 * bump(PB_UPP - 0.05, PB_UPP + 0.3, t, 0.12)));
    if (t >= PB_GLID[0] && t < PB_GLID[1]) { const u = mjuk((t - PB_GLID[0]) / (PB_GLID[1] - PB_GLID[0])), mal = fig2varld([509, 324 - 150]);
      K.m.position.set(lerp(K.x, mal.x, u), lerp(K.y, mal.y, mjuk(u * 1.6)) + 0.02 * Math.sin(Math.PI * u), lerp(K.z, mal.z + 0.004, u)); K.m.scale.setScalar(lerp(PB_STOR, 1, u)); }   // upp först, sedan in över huvudet: inte framför ansiktet
    K.m.castShadow = t < PB_GLID[0]; }   // ingen skugga över ansiktet när det flyger
  // snöbollarna: rullas från kaninens tassar åt vänster, växer och stannar på "snöboll"; studsar på "En, två, tre"
  const R16 = [MAL('16b', 28) + ORD.en, MAL('16b', 28) + ORD.tva, MAL('16b', 28) + ORD.tre];
  BOLLAR.forEach((k, i) => { const Q = ROLL[i], [bx, bz, bh] = BOLLPOS[i];
    const u = mjuk((t - Q.a) / (Q.b - Q.a)), x0 = PLATS.bollar[0] - 0.09, x = lerp(x0, bx, u), s = lerp(0.25, 1, u);
    k.m.visible = t >= Q.a;
    k.m.position.set(x - BX, 0.03 * bump(R16[i], R16[i] + 0.45, t, 0.12), bz + 0.0005 * i - BZ);   // i gruppen GUBB (foten i den stora bollens fotpunkt)
    k.m.scale.setScalar(s * (1 + 0.012 * Math.sin(t * 9) * (u > 0 && u < 1)));
    BOLLTEX[i].rotation = (x0 - x) / (bh * lerp(0.25, 1, u * 0.5) / 2);   // rullar: rund, vrids moturs när den rullar åt vänster
    // tornet: hoppar i en båge upp på bollen under (lite framför den, så att inget går genom något), sjunker in lite när den landar
    const H = STAPEL[i]; if (H && t > H.a) { const v = k01((t - H.a) / H.d), m = mjuk(v), land = t - H.a - H.d;
      k.m.position.set(lerp(bx, BX, m) - BX, H.y * m + 0.09 * Math.sin(Math.PI * v), lerp(bz, BZ + 0.002 * i, m) - BZ);
      BOLLTEX[i].rotation += 0.6 * m;   // vrider sig lite i luften
      if (land > 0) k.m.scale.y *= 1 - 0.08 * Math.sin(Math.PI * k01(land / 0.22)); }
    const sp = RULLSPAR[i]; sp.material.opacity = t >= Q.a && t < STANG + 0.3 ? 0.55 : 0;
    const xs = Math.min(x0, x), xe = Math.max(x0, x); sp.scale.set(Math.max(0.001, xe - xs), 0.022 + 0.04 * s, 1); sp.position.set((xs + xe) / 2, SIDA + 0.0014, bz + 0.008); });
  // snötussen: glider av granens gren, landar på huvudet, faller ner bredvid när kaninen skakar på huvudet
  { const K = TUSSEN, start = v3(-0.56, SIDA + 0.42, -0.14); K.m.visible = t >= TU.a && t < STANG;
    const huvud = fig2varld([512, 214]).add(v3(0, -0.02, 0.012)), mark2 = v3(kanin.position.x + 0.16, SIDA + 0.001, kanin.position.z + 0.04);
    if (t < TU.land) { const u = mjuk((t - TU.a) / (TU.land - TU.a)); K.m.position.set(lerp(start.x, huvud.x, u), lerp(start.y, huvud.y, u) + 0.05 * Math.sin(Math.PI * u), lerp(start.z, huvud.z, u)); K.m.rotation.z = 0.6 * (1 - u); }
    else if (t < TU.skak + 0.3) { K.m.position.copy(huvud); K.m.rotation.z = t > TU.skak ? 0.25 * Math.sin((t - TU.skak) * 18) : 0; }
    else { const u = k01((t - TU.skak - 0.3) / 0.5); K.m.position.set(lerp(huvud.x, mark2.x, mjuk(u / 0.45)), lerp(huvud.y, mark2.y, u * u), lerp(huvud.z, mark2.z, u)); K.m.rotation.z = -0.8 * u; }   // först åt sidan, sedan ner
    K.m.scale.setScalar(1 - 0.4 * mjuk((t - TU.ner - 0.5) / 1.5)); }
  // fotspåren syns från nedsättningen, kvar till slutet
  SPAR.forEach(m => m.material.opacity = 0.85 * mjuk((t - m.userData.t) / 0.12) * (1 - mjuk((t - STANG) / 0.25)));
  // andedräkten vid nosen och snöpuffar vid fötterna
  ANDE.forEach((m, j) => { const t0 = ANDAS[0] + 0.2 * j, pu = ((t - t0) % 2.2) / 1.2; m.visible = t > t0 && t < ANDAS[1] && pu < 1; if (!m.visible) return;   // ett andetag var 2,2 s: tre små moln
    const n = fig2varld([555, 492]); m.position.set(n.x + 0.12 * Math.sqrt(pu) + 0.004 * j, n.y + 0.03 * pu + 0.004 * j, n.z + 0.006);   // från munnen, ut förbi kinden och kroppens kant, i kortets skärpeplan
    m.scale.setScalar(0.008 + 0.024 * pu); m.material.opacity = 0.8 * mjuk(pu / 0.1) * (1 - mjuk((pu - 0.45) / 0.55)); });
  const PUFFAR = [...SKUTT.map(s => s + 0.4), ...ROLL.map(q => q.b), ...STAPEL.slice(1).map(H => H.a + H.d)];   // + snöpuffar där tornets bollar landar
  FOTPUFF.forEach((m, i) => { const a = PUFFAR[i], u = (t - a) / 0.6; m.visible = a != null && u > 0 && u < 1; if (!m.visible) return;
    const p = i < 2 ? v3(kanin.position.x + (i ? 0.05 : -0.05), SIDA + 0.012, kanin.position.z + 0.02) : i < 5 ? v3(BOLLPOS[i - 2][0] + 0.06, SIDA + 0.012, BOLLPOS[i - 2][1] + 0.02)
      : v3(BOLLPOS[0][0] + 0.05, SIDA + STAPEL[i - 4].y + 0.01, BOLLPOS[0][1] + 0.03);
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
  const bollTopp = i => BOLLAR[i].m.getWorldPosition(v3()).add(v3(0.02, BOLLPOS[i][2] * 0.85, 0.02));
  [MAL('16', 27) + ORD.stor, MAL('16', 27) + ORD.mellan, MAL('16', 27) + ORD.liten].forEach((a, i) => ov += glimt(t, a, bollTopp(i), 70, 4));
  R16.forEach((a, i) => ov += glimt(t, a, bollTopp(i), 50, 3));
  const giss21 = MAL('21', 36) + LN(36) + 1.6; [0, 1, 2].forEach(i => ov += glimt(t, giss21 + 0.3 * i, bollTopp(i), 45, 3));
  FAGLAR.forEach(F => { const w = F.m.getWorldPosition(v3()).add(v3(0, 0.06, 0.01)); ov += glimt(t, FAGEL_ORD[F.i] + 0.1, w, 60, 4) + glimt(t, S('19') + 0.5 + 0.15 * F.i, w, 50, 3); });
  const gubbe = y => GUBB.localToWorld(v3(0.02, y, 0.02));
  ov += glimt(t, MAL('24d', 42) + 0.3, gubbe(0.3), 110, 5) + glimt(t, GUBBE_UPP, gubbe(0.17), 120, 4) + glimt(t, POP.fin, gubbe(0.2), 140, 5);
  ov += glimt(t, POP.ogon, gubbe(HUVUD + 0.01), 50, 3) + glimt(t, POP.morot, gubbe(HUVUD - 0.01), 50, 3) + glimt(t, POP.armar, gubbe(MITT + 0.03), 60, 3) + glimt(t, POP.halsduk, gubbe(HUVUD - 0.04), 60, 3);
  $('ov').innerHTML = ov;
  DOF.komp.render();
}

// ---- kameran: vyerna ur storyboarden, en svag glidning i varje ----
satt(PARM[1]); scen.updateMatrixWorld(true);
const FLW = FLINGAN.getWorldPosition(v3());
const VY = {
  in: () => [v3(-0.1, 1.25, 2.4), v3(0, 0.32, -0.2), 32],
  himmel: () => [v3(0, 0.62, 1.12), v3(0, 0.62, -0.6), 34],   // närmare: bokens kanter och skrivbordet utanför bild
  flinga: () => [FLW.clone().add(v3(0.04, -0.12, 0.95)), FLW.clone(), 28],
  'flinga-hej': () => [FLW.clone().add(v3(0.06, -0.3, 1.5)), FLW.clone().add(v3(0, -0.15, 0)), 32],
  bred: () => [v3(0.03, 0.54, 1.39), v3(0.03, 0.33, -0.2), 31.5],   // 28/11 lite längre ut ("zoom out a bit"), bokens kanter fortfarande utanför bild
  halv: g => [g.clone().add(v3(0.06, 0.26, 0.78)), g.clone().add(v3(0, 0.16, 0)), 30],
  nara: g => [g.clone().add(v3(0.03, 0.3, 0.62)), g.clone().add(v3(0, 0.245, 0)), 28],   // öronspetsarna (snön, frosten, ploppet) med även efter pushen
  pannband: () => [v3(-0.05, 0.8, 1.15), v3(-0.07, 0.15, 0.27), 30],   // högre och längre bak: hela öronen med, teckningen på snön syns uppifrån
  bollar: () => [v3(-0.13, 0.46, 1.3), v3(-0.16, 0.15, 0.22), 32],     // bollarna och hela kaninen
  trad: () => [v3(0.36, 0.6, 1.0), v3(0.28, 0.48, -0.1), 27],   // vriden lite åt vänster: himmelskortets högerkant och pärmen utanför bild, också efter pushen
  tradnara: () => [v3(0.4, 0.6, 0.82), v3(0.3, 0.52, -0.16), 30],   // vriden lite åt vänster: himmelskortets högerkant utanför bild, också efter pushen
  tradkanin: () => [v3(0.24, 0.52, 1.15), v3(0.28, 0.42, 0.0), 27],   // rad 20: kaninen (halvbild) och alla tre fåglarna
  tradhej: () => [v3(0.44, 0.66, 0.85), v3(0.32, 0.57, -0.16), 30],   // 24c: lite högre, kaninens öra vid bollarna kommer inte med; vriden åt vänster så att himmelskortets kant är utanför bild
  gubbe: () => [v3(-0.37, 0.42, 1.08), v3(-0.38, 0.2, 0.17), 28],   // hela snögubben, kaninens arm utanför
  gubbnara: () => [v3(-0.37, SIDA + 0.29, 0.86), v3(-0.4, SIDA + 0.2, 0.2), 28],   // 22b–22f: huvudet och den mellersta bollen nära (delarna poppar)
  hejda: g => [g.clone().add(v3(0.06, 0.34, 0.95)), g.clone().add(v3(-0.1, 0.2, -0.3)), 30],   // rakare och smalare: skrivbordet utanför bild
  slut: () => [v3(-0.2, 2.1, 3.5), v3(0, 0.12, -0.1), 32],   // ute vid skrivbordet: hela den stängda boken i mitten (även efter pushen)
};
const KAM = kamera(cam, VY, { blur: n => /nara|flinga$/.test(n) ? 0.008 : /halv|pannband|bollar|gubbe|tradnara/.test(n) ? 0.006 : 0.003 }), { vy, glid } = KAM;
const GLID = { '02': [0, 1.6], '06c': [0.15, 2.45], '19': [0, 1.3], '22b': [0.1, 1.8], '22g': [0, 1.2] };   // in mot himlen; följer kaninen när den går; från kaninen vid granen till trädet
let forra = '';
for (const r of RAD) {
  const namn = r.st.vy === 'logga' ? 'bord' : r.st.vy, pl = PLATS[r.st.plats] || PLATS.mitt, g = v3(pl[0], SIDA, pl[1]), key = namn + (KAM.VY[namn].length ? r.st.plats : '');
  if (r.id === '01a') { KAM.oppning(r.s, S('01b') + 0.9, 'in'); forra = 'in'; continue; }
  if (r.id === '01b') continue;
  if (r.id === '26') { KAM.slutet(r.s, insida); continue; }   // ut ur boken, pärmen slår igen, kameran åker upp mot medaljongen, kritirisen sluter sig (Sanna 28/11)
  if (r.id === '24c') { vy(r.s, 'tradhej', g); forra = 'tradhej'; continue; }   // närbild: kaninen vid bollarna kommer inte med i bild
  if (key === forra) continue; forra = key;
  if (GLID[r.id]) glid(r.s + GLID[r.id][0], GLID[r.id][1], namn, g); else vy(r.s, namn, g);
}
const plan = KAM.plan(DURATION);

// ---- ljudet: Malin, kaninen och effekterna ur raderna, kritans ritljud som slinga, vinterljudet lågt under allt ----
// kaninens ljud: varje fil får sin egen volym så att den ligger 3 dB under Malin (största momentana ljudstyrkan, ebur128 M, mätt 2026-11-28;
// Malins repliker: median −14,4 LUFS × 2,5 = −6,4). Förut 2,0 på alla: de starkaste låg 9 dB över henne.
const KANIN_M = { 'gullig-2': -11.6, 'gullig-3': -12.6, 'gullig-5': -14.7, 'gullig-7': -11.0, 'hej-4': -9.0, 'hejda-2': -10.0, 'hejda-3': -9.7, 'ny-brr-1': -15.6, 'ny-fniss-1': -14.7, 'ny-fniss-2': -13.4, 'ny-fortjust-1': -12.0, 'ny-fortjust-2': -11.0, 'ny-fragande-1': -9.5, 'ny-fragande-2': -10.2, 'ny-hej-2': -11.6, 'ny-ja-1': -8.6, 'ny-jippi-1': -9.8, 'ny-jippi-2': -10.6, 'ny-mmm-1': -7.4, 'tack-1': -14.6 };
const kaninVol = f => { const m = KANIN_M[f.match(/kanin-([\w-]+?)(\.m4a)?$/)[1]]; return m == null ? 1.2 : Math.min(3, 10 ** ((-6.4 - 3 - m) / 20)); };
const VOL = f => /kanin-/.test(f) ? kaninVol(f) : /(glitter|tindra|glimt)/.test(f) ? 0.85 : /prassel/.test(f) ? 0.9 : /(pop|swoosh|landa-mjuk)/.test(f) ? 0.7 : 1.0;
starta(RD, plan, bildruta, { rost: 'vintern-i-boken', vol: VOL, matta: MATTA, RIT: KR.RIT });
