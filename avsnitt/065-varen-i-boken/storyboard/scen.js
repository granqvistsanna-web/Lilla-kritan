// 065 Våren i boken: stillbilderna till storyboarden, i samma uppslag som scenen (uppslaget.js: boken, korten, koordinaterna, vyerna).
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Musen är det platta kortet (musen-mille.png):
// riggen på kortet kommer i scenen (grind 6), så vinka, nicka, klappa och öronen syns bara i bildtexten.
// Fjärilen och nyckelpigan är Flow-förlagorna som platta kort här; i scenen ritas de i kod (bildlista.md).
import * as THREE from 'three';
import { duk, tex, trim, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { v3, scenen, bild, lad, kontur, mat, vik, stall, ljuset, djupskarpa, BOKVYER } from '/produktion/three-rum/popupbok/uppslag.js';
import { RQ, TH, TPOS, ROSA, GULA, KANNAPOS, KH, BO_OFF, MH, MUSPOS, byggUppslaget } from './uppslaget.js';

const SC = scenen(), { scen, cam } = SC;
const U = await byggUppslaget(scen), { satt, kort, platt, BAK, SKOG, LOVTRAD, BUSKE_K, TULPAN, ROSA_K, GULA_K, KANNA_K, KANNA, BOET } = U;
const VY = { ...BOKVYER, ...U.VY }; VY.in = VY.bred; VY.logga = VY.bord;

// ---- det som bara finns i storyboarden ----
const PROV = '/avsnitt/065-varen-i-boken/prov/insekter/bilder/';
const [MUS_B, FJARIL_B, PIGA_B] = await Promise.all(['/assets/karaktarer/musen-mille/cut/musen-mille.png', PROV + 'fjaril-flow.png', PROV + 'nyckelpiga-flow.png'].map(lad));
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått, liggande där scenen ritar den (platt bakåt från foten)
async function teckning(sak, h, [x, z]) {
  const drag = await kontur(`${RQ}${sak}/cut/${sak}-kontur.json`), i = await bild(`${RQ}${sak}/cut/${sak}.png`);
  const c = duk(i.width, i.height), q = c.getContext('2d');
  q.strokeStyle = '#3a2a20'; q.lineWidth = i.height / 70; q.lineCap = q.lineJoin = 'round';
  for (const d of drag) q.stroke(new Path2D(d));
  const map = tex(trim(c)); return platt(map, h * map.image.width / map.image.height, x, z - h / 2, h, SIDA + 0.002);
}
const TKONTUR = await teckning('tulpan-gul', TH, TPOS.gul), KKONTUR = await teckning('vattenkanna', KH, KANNAPOS);
function siffra(n) {   // siffrorna 1, 2, 3 i krita (mörk linje, vit kant)
  const c = duk(220, 260), x = c.getContext('2d'); x.font = 'bold 220px "Fredoka", "Comic Sans MS", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineJoin = 'round'; x.strokeStyle = '#FFF'; x.lineWidth = 26; x.strokeText(n, 110, 140); x.fillStyle = '#3a2a20'; x.fillText(n, 110, 140); return tex(c);
}
const SIFFROR = ['1', '2', '3'].map((n, i) => { const [x, z] = TPOS[['rod', 'gul', 'lila'][i]]; return kort(siffra(n), 0.09, x + 0.16, z + 0.03, { y: SIDA + 0.16, flik: false }); });
const FJARIL = kort(FJARIL_B, 0.075, 0, 0, { flik: false }), NYCKELPIGA = kort(PIGA_B, 0.05, GULA[0], GULA[1] + 0.008, { y: SIDA + 0.075, flik: false });
const HANDKANNA = kort(KANNA, KH, 0, 0, { flik: false });   // pipen åt höger, mot blomman
const MUSKORT = kort(MUS_B, MH, ...MUSPOS.start, { y: SIDA + 0.004, flik: false }), mus = MUSKORT.m;
// kritan: en liten krita utan ansikte (seriens kritan ritar i 2D; här bara som markering i stillbilden)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  const papper = new THREE.Mesh(new THREE.CylinderGeometry(0.0185, 0.0185, 0.09, 20), mat(null, { color: '#4FA845' })); papper.position.y = 0.01;
  kritan.add(kropp, spets, papper); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }
// vattendropparna: en båge ur pipen ner mot målet
const DROPPAR = new THREE.Group();
for (let i = 0; i < 9; i++) DROPPAR.add(new THREE.Mesh(new THREE.SphereGeometry(0.006 + 0.002 * (i % 2), 12, 10), mat(null, { color: '#BFE6FF', emissive: '#3f86c0', emissiveIntensity: 0.35 })));
scen.add(DROPPAR);
function bage(fran, till) {
  DROPPAR.children.forEach((d, i) => { const t = (i + 0.5) / 9; d.position.lerpVectors(fran, till, t); d.position.y += 0.05 * Math.sin(Math.PI * t); d.position.z += 0.006 * Math.sin(i * 2.3); });
}
ljuset(scen);
const DOF = djupskarpa(SC);

// de nedfällda korten ligger i en hög, det bakersta underst (som scenens ordning)
const STAR = [...BAK, ...SKOG, LOVTRAD, BUSKE_K, ...Object.values(TULPAN).flatMap(T => [T.knopp, T.uppe, T.hanger]), ROSA_K, GULA_K].sort((a, b) => a.z - b.z);
STAR.forEach((k, i, a) => k.hog = 0.004 + 0.001 * (a.length - i));
const syns = (k, ja) => { k.m.visible = ja; if (k.flik) k.flik.visible &&= ja; };

window.rad = s => {
  satt(s.parm ? 2 : 0);
  for (const k of STAR) stall(k, s.kort ? 1 : 0);
  for (const f of ['rod', 'gul', 'lila']) for (const l of ['knopp', 'uppe', 'hanger']) syns(TULPAN[f][l], s[f] === l);
  TKONTUR.visible = s.gul === 'kontur';
  stall(KANNA_K, 1); syns(KANNA_K, s.kanna === 'gras'); KKONTUR.visible = s.kanna === 'kontur';
  const [mx, mz] = MUSPOS[s.pos]; mus.position.set(mx, SIDA + 0.004, mz); vik(MUSKORT, s.kort && s.mus === 'uppe' ? 1 : 0);
  HANDKANNA.m.visible = s.kanna === 'hand'; HANDKANNA.m.position.set(mx + 0.12, SIDA + 0.035, mz + 0.02);
  // boet sitter i lövträdets grenklyka och fälls med trädet (som i scenen)
  LOVTRAD.m.updateMatrixWorld(true); BOET.m.position.copy(LOVTRAD.m.localToWorld(BO_OFF.clone())); BOET.m.rotation.x = LOVTRAD.m.rotation.x; BOET.m.visible = !!s.kort;
  FJARIL.m.visible = NYCKELPIGA.m.visible = !!s.kort;
  FJARIL.m.position.set(...(s.fjaril === 'huvud' ? [mx, SIDA + 0.22, mz + 0.012] : [ROSA[0], SIDA + 0.085, ROSA[1] + 0.008]));
  SIFFROR.forEach((k, i) => k.m.visible = s.siffra === '123' || s.siffra === String(i + 1));
  DROPPAR.visible = !!s.droppar;
  const pip = v3(mx + 0.2, SIDA + 0.085, mz + 0.03);
  if (s.droppar === 'fotter') bage(pip, v3(mx + 0.05, SIDA + 0.012, mz + 0.03));
  else if (s.droppar) { const [x, z] = TPOS[s.droppar]; bage(pip, v3(x - 0.03, SIDA + 0.055, z + 0.02)); }
  kritan.visible = s.kritan;
  if (s.gul === 'kontur') { kritan.position.set(TPOS.gul[0] + 0.06, SIDA + 0.1, TPOS.gul[1] - TH / 2); kritan.rotation.set(0.3, 0, -0.6); }
  if (s.kanna === 'kontur') { kritan.position.set(KANNAPOS[0] + 0.07, SIDA + 0.1, KANNAPOS[1] - KH / 2); kritan.rotation.set(0.3, 0, -0.6); }
  // kameran: vyns plats (0,06 högre än vyn, som scenens kamera), utan rörelse
  scen.updateMatrixWorld(true);
  const [pos, mal, fov] = VY[s.vy](v3(mx, SIDA, mz)); if (!['bord', 'logga', 'in'].includes(s.vy)) pos.y += 0.06;
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); DOF.fokus({ mal, blur: 0.003 }); DOF.komp.render();
};
window.klar = true;
