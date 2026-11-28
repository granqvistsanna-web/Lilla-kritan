// Mall för Kritans bok: stillbilderna till storyboarden (grind 5), i samma uppslag som scenen (uppslaget.js).
// window.rad(s) ställer boken i radens läge (s ur rader.mjs) och ritar en bild. Figuren är ett platt kort här, riggen kommer i scenen.
import * as THREE from 'three';
import { duk, tex, trim, SIDA } from '/produktion/three-rum/popupbok/bok-parm.js';
import { v3, scenen, bild, lad, kontur, mat, vik, stall, ljuset, djupskarpa, BOKVYER } from '/produktion/three-rum/popupbok/uppslag.js';
import { HUVUDSAK, HJALPSAK, SAKPOS, SAKH, FH, PLATS, byggUppslaget } from './uppslaget.js';

const SC = scenen(), { scen, cam } = SC;
const U = await byggUppslaget(scen), { satt, kort, platt, BAK, SOLEN, MOLNEN, SKOG, BLOMMOR, SAKKORT } = U, VY = { ...BOKVYER, ...U.VY };

// ---- det som bara finns i storyboarden ----
const FIGKORT = kort(await lad('/produktion/three-rum/popupbok/bilder/kanel.png'), FH, ...PLATS.mitt, { y: SIDA + 0.004, flik: false });   // BYT: figurens bild (urklipp)
// kritans teckning: konturen och detaljstrecken ur kontur.json, i bildens egna mått
async function teckning(sak) {
  const drag = await kontur(sak + '-kontur.json'), i = await bild(sak + '.png'), c = duk(i.width, i.height), q = c.getContext('2d');
  q.strokeStyle = '#3a2a20'; q.lineWidth = i.height / 70; q.lineCap = q.lineJoin = 'round';
  for (const d of drag) q.stroke(new Path2D(d));
  return tex(trim(c));
}
const SOLK = await teckning(HUVUDSAK), SAKK = await teckning(HJALPSAK);
// huvudsakens kontur på himlen (samma plats och storlek som SOLEN), hjälpsakens liggande där kortet ligger (platt bakåt från foten)
const SOLKONTUR = new THREE.Mesh(SOLEN.geometry, mat(SOLK, { alphaTest: 0.5 })); SOLKONTUR.position.copy(SOLEN.position); SOLKONTUR.rotation.copy(SOLEN.rotation); SOLEN.parent.add(SOLKONTUR);
const SAKKONTUR = platt(SAKK, SAKH * SAKK.image.width / SAKK.image.height, SAKPOS[0], SAKPOS[1] - SAKH / 2, SAKH, SIDA + 0.002);
// kritan: en liten krita utan ansikte, bara som markering i stillbilden (i scenen ritar verktyg/kritan-ritar.js)
const kritan = new THREE.Group();
{ const kropp = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 20), mat(null, { color: '#F2C23A' }));
  const spets = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.035, 20), mat(null, { color: '#3a2a20' })); spets.position.y = -0.0975; spets.rotation.x = Math.PI;
  kritan.add(kropp, spets); kritan.rotation.set(0.3, 0, -0.6); kritan.traverse(o => o.castShadow = true); scen.add(kritan); }
ljuset(scen);
const DOF = djupskarpa(SC);

// de nedfällda korten ligger i en hög, det bakersta underst (som scenens ordning)
const STAR = [...BAK, ...SKOG, ...BLOMMOR].sort((a, b) => a.z - b.z);
STAR.forEach((k, i, a) => k.hog = 0.004 + 0.001 * (a.length - i));

window.rad = s => {
  satt(s.parm ? 2 : 0);
  for (const k of STAR) stall(k, s.kort ? 1 : 0);
  SOLEN.visible = s.sol === 'ja'; SOLKONTUR.visible = s.sol === 'kontur';
  stall(SAKKORT, s.kort ? 1 : 0); SAKKORT.m.visible = s.sak === 'ja'; SAKKORT.flik.visible &&= SAKKORT.m.visible; SAKKONTUR.visible = s.sak === 'kontur';
  const [fx, fz] = PLATS[s.plats]; FIGKORT.m.position.set(fx, SIDA + 0.004, fz); vik(FIGKORT, s.kort && s.figur === 'uppe' ? 1 : 0);
  scen.updateMatrixWorld(true);
  kritan.visible = s.kritan;
  if (s.sol === 'kontur') kritan.position.copy(SOLEN.getWorldPosition(v3())).add(v3(0.2, 0.1, 0.08));
  if (s.sak === 'kontur') kritan.position.set(SAKPOS[0] + 0.09, SIDA + 0.1, SAKPOS[1] - SAKH / 2);
  // kameran: vyns plats, utan rörelse
  const [pos, mal, fov] = VY[s.vy](v3(fx, SIDA, fz));
  cam.position.copy(pos); cam.fov = fov; cam.updateProjectionMatrix(); cam.lookAt(mal);
  scen.updateMatrixWorld(true); DOF.fokus({ mal, blur: 0.003 }); DOF.komp.render();
};
window.klar = true;
