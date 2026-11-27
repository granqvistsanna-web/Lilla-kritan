// Omslagsprov för Kritans bok (2026-11-27): tre stängda böcker sida vid sida på skrivbordet, en per berättelse.
// Stillbilder: 0 alla tre med siluett, 1–3 varje bok nära, 4–5 färgbild, 6–7 Lilla Kritans symbol (kritan) i stället för djuret,
// 8 grodans bok halvöppen (insidan, bladbunten, ryggen).
import * as THREE from 'three';
import { skrivbord, skapaBok } from '../bok-parm.js';

const R = new THREE.WebGLRenderer({ canvas: document.getElementById('bild'), antialias: true, preserveDrawingBuffer: true });
R.setPixelRatio(1.5); R.setSize(1920, 1080, false);
R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
const scen = new THREE.Scene(); scen.background = new THREE.Color('#E9D9C2');
const cam = new THREE.PerspectiveCamera(30, 16 / 9, 0.05, 40);
skrivbord(scen, [['#E2563F', 3.9, 1.25, 0.5], ['#F2C23A', -4.1, 1.35, -0.3], ['#3F8FD2', 1.3, 1.45, 0.15]]);

// en rad per berättelse: urklipp och pärmfärg. Bara art direction v2 (Sanna 27/11): bilder/kanel.png och ludde.png är
// premium/original/<namn>-platt.png med alfan ur premium/cut/<namn>-faceless.png, alltså v2-figuren med ansikte och vit kant.
const BERATTELSER = [
  ['/produktion/three-rum/popupbok/bilder/gurra.png', '#E8683A'],        // grodan, orange
  ['/produktion/three-rum/popupbok/bilder/kanel.png', '#3F9A40'],      // kaninen, grön
  ['/produktion/three-rum/popupbok/bilder/ludde.png', '#2F78C8'],          // lammet, blå
];
const PLATS = [[-2.75, 0.05, 0.07], [0, -0.08, -0.02], [2.75, 0.06, -0.06]];   // x, z, vridning
// fyra uppsättningar: djuret som siluett, djuret som färgbild, Lilla Kritans symbol (kritan) som siluett och som färgbild
const SETT = {};
for (const [namn, fargbild, krita] of [['sil', false, false], ['farg', true, false], ['krita', false, true], ['kritaFarg', true, true]]) {
  SETT[namn] = [];
  for (const [i, [figur, farg]] of BERATTELSER.entries()) {
    const b = await skapaBok(scen, { farg, figur: krita ? 'kritan' : figur, fargbild });
    b.bok.position.set(PLATS[i][0], 0, PLATS[i][1]); b.bok.rotation.y = PLATS[i][2]; SETT[namn].push(b);
  }
}

scen.add(new THREE.HemisphereLight('#FFFAF0', '#D8B892', 2.3));
const sol = new THREE.DirectionalLight('#FFF0DC', 2.2); sol.position.set(-2.2, 4, 3); sol.castShadow = true;
Object.assign(sol.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 0.5, far: 14 });
sol.shadow.mapSize.set(4096, 4096); sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.01; sol.shadow.radius = 4; scen.add(sol);

const HEL = [0, 6.4, 5.4, 0, 0, -0.1, 33], NARA = x => [x, 2.5, 2.6, x, 0, 0.05, 32];
const VYER = [   // [sättet, öppen bok (index) eller -1, kamera x, y, z, titta x, y, z, fov]
  ['sil', -1, ...HEL], ['sil', -1, ...NARA(-2.75)], ['sil', -1, ...NARA(0)],
  ['sil', -1, ...NARA(2.75)], ['farg', -1, ...HEL], ['farg', -1, ...NARA(0)],
  ['krita', -1, ...HEL], ['kritaFarg', -1, ...NARA(-2.75)], ['sil', 0, -2.0, 2.2, 3.2, -2.75, 0.35, -0.25, 34],
];
window.DURATION = VYER.length;
window.seek = async t => {
  const [sett, oppen, ...v] = VYER[Math.min(VYER.length - 1, Math.floor(t))];
  for (const [namn, lista] of Object.entries(SETT)) lista.forEach((b, i) => { b.bok.visible = namn === sett; b.satt(i === oppen ? 2 : 0); });   // öppen: pärmen står som i filmen
  cam.position.set(v[0], v[1], v[2]); cam.fov = v[6]; cam.updateProjectionMatrix(); cam.lookAt(v[3], v[4], v[5]);
  R.render(scen, cam);
};
window.ready = window.seek(0);
