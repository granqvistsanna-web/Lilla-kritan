// v2-figurerna (art direction v2, Sanna 2026-11-08: "update bruna sång with v2 characters") med samma API som kit.figur + ansikten.js,
// så att scenerna fungerar som förut. Vanligt skript efter kit.js och v2-riggar.js (gor-v2.py):
//   const f = await v2.figur('lammet-ludde', parent, { h, s, ben }, armar)
//   f.pose({ x, y, s|h, k, tilt, sx, sy, flip, synlig, opacity, andas,     // som kit.figur; (x, y) = fötterna (FOTTER)
//            humor, titt, tittY, blink, m,                                 // ansikten.js-humören blir v2-uttryck (HUMOR2); m öppnar munnen
//            r, l, armSk, vrid: { r, l }, fram,                            // fram: armarna framför kroppen;                                  // armen pekar mot en punkt i 1024-rutan (från v2-axeln), sträckt armSk, vriden vrid grader till
//            delar,                                                        // { 'arm-r'|'leg-l'…: grader | [grader, dx, dy, sk] | (px, py) => transform }; armgrader är v1-vinklar (lastbilen.peka)
//            pose2,                                                        // en v2-pose rakt in i rita (t.ex. { fram: [1, 1], armar: [-95, -95], klapp: 40 }, sitter)
//            uppe })                                                       // armar: 'bara' visar bara armarna i uppe
//   f.punkt([x, y]) → bild, f.g, f.inre, f.fig (v2-gruppen), f.delar (benen: delar['leg-l'].style.display), f.F.bbox, f.fot
// armar: false = utan armar, 'bara' = bara armarna (kopian framför lastbilens kaross). Benen syns bara med opt.ben (eller delar[..].style).
// Utan mål vilar armarna längs sidan som i v2-riggen.
(() => {
const { el } = kit;
const HUMOR2 = { glad: 'glad', open: 'glad', skelogd: 'glad', skrattar: 'jatteglad', ropar: 'jatteglad', forvanad: 'forvanad', big: 'forvanad',
  nyfiken: 'nyfiken', ledsen: 'ledsen', blinkar: 'blinkar', slickar: 'fnissig', mums: 'fnissig', sleep: 'sover',
  njuter: U => ({ ...U.glad, sov: 1 }), happy: U => ({ ...U.glad, glad: [1, 1] }), karleksfull: U => ({ ...U.glad, glad: [1, 1] }) };
function ansikte(R, humor, o = {}, F = null) {
  // humor: ett ansikten.js-namn (HUMOR2), ett namn ur figurens ark (R.UTTRYCK: jatteglad, stolt, tanker …) eller ett färdigt ansikte F (ur ROR)
  const h = R.UTTRYCK[humor] ? humor : (HUMOR2[humor] ?? 'glad'), f = F ? { ...F } : R.param(typeof h === 'function' ? h(R.UTTRYCK) : h);   // figurens egna uttryck först (Bulles skrattar, ropar, mums …)
  if (!F) { f.armar = [8, 8]; f.luta = 0; }   // armarna och lutningen styr scenen (ROR-rörelserna har sina egna)
  f.titt = [f.titt[0] + 10 * (o.titt || 0), f.titt[1] + 8 * (o.tittY || 0)];
  f.lock = f.lock.map(v => Math.max(v, o.blink || 0));
  if (o.m != null) {   // munnens öppning (ropar 1,6, skrattar 0,8); 0 = stängd, leendet
    const m = Math.min(1.6, o.m);
    if (m < 0.1) { f.mun = [0, 0, 0, f.mun[3]]; f.streck = 1; f.le = Math.max(f.le, 1); }
    else { f.mun = [16 + 6 * Math.min(1, m), 13 * m, f.mun[0] ? f.mun[2] : 0.6, f.mun[3] - (f.mun[0] ? 0 : 4)]; f.streck = 0; }
  }
  return f;
}
// Arkets rörelser har en in- och uttoning per varv (klappa 3 s, dansa 4 s). rorTid håller dem i den jämna mitten och sträcker tiden så
// att ett varv (en klapp, ett gung) tar takt sekunder: [start, längd av den jämna delen, ett varv i arket]
const ROR_TID = { klappa: [0.4, 2.16, 0.36], dansa: [0.4, 3, 1], hoppa: [0, 2.4, 2.4], ga: [0, 8, 8] };
const rorTid = (n, t, takt) => { const [a, l, v] = ROR_TID[n] || [0, 1e9, 1]; return a + ((takt ? t / takt * v : t) % l + l) % l; };
const V1VILA = { r: 42.4, l: 137.3 };   // v1-riggens armvila (lastbilen.peka), för delar i grader
const tf = (deg, px, py, dx = 0, dy = 0, sx = 1, sy = sx) =>
  `translate(${dx} ${dy}) rotate(${deg} ${px} ${py}) translate(${px} ${py}) scale(${sx} ${sy}) translate(${-px} ${-py})`;
let nr = 0;
async function figur(slug, parent, opt = {}, armar = true) {
  const R = v2riggar[slug], g = el('g', {}, parent), inre = el('g', {}, g);
  const fig = R.figur(512, R.FOTTER, 1, inre), q = s => [...fig.querySelectorAll(s)];
  fig.querySelector('.skugga').style.display = 'none';
  const visa = (s, v) => q(s).forEach(e => (e.style.display = v));
  const delar = Object.fromEntries(['leg-l', 'leg-r'].map(n => [n, { style: { set display(v) { visa('.' + n, v); } } }]));
  if (!opt.ben) for (const n in delar) delar[n].style.display = 'none';
  if (armar === 'bara') visa('.figuren > :not([class^="arm-"])', 'none');
  const F = { bbox: R.BBOX }, fot = [512, R.FOTTER], skala = (opt.h || 352) / (F.bbox[3] - F.bbox[1]), fas = (nr++ * 0.618) % 1;
  const f = { slug, g, inre, fig, delar, F, fot, skala, R };
  f.pose = (p = {}) => {
    const s = (p.s ?? opt.s ?? skala) * (p.k ?? 1), flip = p.flip ? -1 : 1;
    const andas = Math.sin(2 * Math.PI * ((kit.nu || 0) / 2.8 + fas)) * (p.andas ?? 1), asx = 1 - 0.008 * andas, asy = 1 + 0.015 * andas;
    g.style.display = p.synlig === false ? 'none' : '';
    g.setAttribute('opacity', p.opacity ?? 1);
    g.setAttribute('transform', `translate(${p.x ?? 688} ${p.y ?? 650}) rotate(${p.tilt || 0}) scale(${s * flip * (p.sx ?? 1) * asx} ${s * (p.sy ?? 1) * asy}) translate(${-fot[0]} ${-fot[1]})`);
    // arkets poser och rörelser (Sanna 2026-11-08: "use character sheet for v2 animations"): p.poseNamn 'hurra' | 'magen' | 'pekar' | 'lyssnar' …
    // (blandas in med p.poseK 0–1 från neutral), p.rorelse [namn, t, takt] = en rörelse ur arket (klappa, dansa, hoppa, ga) i jämn takt (rorTid)
    let F = null, P2 = { ...R.POSE0 };
    if (p.poseNamn) P2 = R.blandaPose('neutral', p.poseNamn, p.poseK ?? 1);
    if (p.rorelse) { const [n, t, takt] = p.rorelse, [rf, rp] = R.ROR[n](rorTid(n, t, takt)), k = p.rorelseK ?? 1;
      F = k < 1 ? R.blanda(ansikte(R, p.humor || 'glad', p), rf, k) : rf; P2 = R.blandaPose(P2, rp, k); }
    if (p.pose2) P2 = { ...P2, ...p.pose2 };
    R.rita(fig, ansikte(R, p.humor || 'glad', p, F), P2);
    for (const sd of 'rl') {
      const n = `arm-${sd}`, [px, py] = R.PIV[sd], v = p.delar?.[n];
      let t = null;
      if (p[sd]) t = tf(Math.atan2(p[sd][1] - py, p[sd][0] - px) * 180 / Math.PI - R.VILA[sd] + (p.vrid?.[sd] || 0), px, py, 0, 0, p.armSk || 1);
      else if (typeof v === 'function') t = v(px, py);
      else if (v != null) { const [deg, dx, dy, sk] = Array.isArray(v) ? v : [v]; t = tf(deg + V1VILA[sd] - R.VILA[sd], px, py, dx, dy, sk); }
      if (t) q('.' + n).forEach((e, j) => { e.setAttribute('transform', t); e.setAttribute('opacity', (j === 0) !== !!p.fram ? 1 : 0); });   // p.fram: armen framför kroppen (riggens -fram-kopia)
      if (!p.pose2?.rikt) q(`.${n}2`).forEach(e => e.setAttribute('opacity', 0));
      visa('.' + n, armar === false || (armar === 'bara' && !(p.uppe || []).includes(sd)) ? 'none' : '');
    }
    for (const n of ['leg-l', 'leg-r']) {
      const v = p.delar?.[n]; if (v == null) continue;
      const [px, py] = R.RIGG[n], [deg, dx, dy, sk = 1] = Array.isArray(v) ? v : [v];
      q('.' + n).forEach(e => e.setAttribute('transform', typeof v === 'function' ? v(px, py) : tf(deg, px, py, dx, dy, 1, sk)));
    }
  };
  f.punkt = ([ax, ay]) => { const pt = new DOMPoint(ax, ay).matrixTransform(kit.lager.figurer.getCTM().inverse().multiply(g.getCTM())); return [pt.x, pt.y]; };
  f.pose();
  return f;
}
// Gången (som steg() i figurernas uttryck.html, Sanna 2026-11-08: "polish pass v2 animations such as walking"): en pose2 för ett steg.
// t sekunder, amp 0–1 stegens styrka, rikt −1 … 1 gångriktningen, fart steg per sekund / 1,2. Riktningsposen åt det hållet, benen lyfts
// i otakt, kroppen guppar och lutar, bakre armen framför kroppen och den främre tittar fram (gang/sving i riggens rita).
const steg = (t, amp, rikt, fart = 2.4) => {
  const f = Math.sin(t * fart * Math.PI) * amp;
  return { rikt, luta: 4 * f, lyft: -Math.abs(f) * 12, ben: [16 * f, 16 * f], benY: [-40 * Math.max(0, -f), -40 * Math.max(0, f)], gang: Math.abs(rikt), sving: f,
    oron: [8 * (1 - Math.abs(f / (amp || 1))) - 3, 8 * (1 - Math.abs(f / (amp || 1))) - 3],   // öronen hänger vid varje fotisättning och fjädrar upp i luften
    bred: 0.035 * (1 - Math.abs(f / (amp || 1))) * amp, strack: -0.045 * (1 - Math.abs(f / (amp || 1))) * amp };   // lite squash när foten sätts i
};
window.v2 = { figur, HUMOR2, steg };
})();
