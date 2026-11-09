// 007 v2: närbilder när någon åker rutschkanan (Sanna 2026-11-09: "zoom in on face going down slide with brown bg and speed lines,
// happy faces"). Korta inklipp (1,2–1,8 s) mitt i åket, lagda ovanpå v2-landet i sammansättningen (tiderna i v2/bilder.json).
// Bilden underifrån som på bildreferensen: figuren stor i bild med armarna upp och munnen öppen, rännans bruna väggar på sidorna,
// fartstreck som strålar ut från mitten och kolastänk som flyger förbi. Figuren skakar lite och vänds aldrig.
// Varje mapp v2-fartN har samma index.html; mappens namn väljer figuren här.
(async () => {
const { el, lerp, mjuk, del, clamp, W, H } = kit;
const VEM = { 'v2-fart1': ['grodan-gurra', 1], 'v2-fart2': ['lammet-ludde', -1], 'v2-fart3': ['grodan-gurra', -1],
  'v2-fart4': ['lammet-ludde', 1], 'v2-fart5': ['igelkotten-igge', 1] };
const id = location.pathname.split('/').at(-2), [slug, sida] = VEM[id];
const M = await kit.manus();
const [a0, a1] = M.bild(id), SLUT = a1 - a0, K0 = a0 - M.av;
const L = kit.duk();
const defs = document.querySelector('svg defs');
defs.insertAdjacentHTML('beforeend', `<radialGradient id="fartbg" cx="0.5" cy="0.38" r="0.75"><stop offset="0" stop-color="#C98C55"/><stop offset="0.55" stop-color="#A0673A"/><stop offset="1" stop-color="#6E4226"/></radialGradient>`);
el('rect', { x: -200, y: -200, width: W + 400, height: H + 400, fill: 'url(#fartbg)' }, L.plate);
// fartstrecken: ljusa kritstreck längs strålar från en punkt bakom figuren, som rör sig utåt och kommer tillbaka
const MITT = [W / 2 + 60 * sida, 0.36 * H], N = 22;
const streckG = el('g', { opacity: 0.85 }, L.plate);
const streck = Array.from({ length: N }, (_, i) => el('path', { stroke: i % 3 ? '#F3DDB8' : '#FFF4DF', 'stroke-linecap': 'round', fill: 'none' }, streckG));
// rännans väggar: två mörka kilar från de nedre hörnen in mot mitten bakom figuren (rännan i perspektiv), med en ljusare kant
const vagg = el('g', {}, L.plate);
for (const s of [-1, 1]) {
  const ytter = [W / 2 + s * (W / 2 + 200), H + 80], inner = [W / 2 + s * 470, H + 80], topp = [MITT[0] + s * 60, MITT[1] + 30];
  el('path', { d: `M${ytter} L${inner} Q${W / 2 + s * 300} ${0.62 * H} ${topp} Z`, fill: '#5E3A20', opacity: 0.85 }, vagg);
  el('path', { d: `M${inner} Q${W / 2 + s * 300} ${0.62 * H} ${topp}`, fill: 'none', stroke: '#9A6438', 'stroke-width': 22, 'stroke-linecap': 'round' }, vagg);
}
// kolastänk som flyger förbi
const stank = Array.from({ length: 7 }, () => { const g = el('g', {}, L.figurer); el('circle', { r: 1, fill: '#E8A63A', stroke: '#fff', 'stroke-width': 0.18 }, g); return g; });
const f = await v2.figur(slug, L.figurer, { h: 900 });
f.pose({ humor: 'ropar' });   // första bilden utan övertoning från 'glad'
const UPP = f.R.POSER.hurra?.armar || [60, 60];
const slump = i => { const x = Math.sin(i * 91.7 + 13.1) * 43758.5; return x - Math.floor(x); };

function render(t) {
  const fart = 1 + 0.4 * mjuk(del(0, 0.3, t));
  streck.forEach((p, i) => {   // varje streck på sin stråle, utåt med fart, tonar in nära mitten
    const a = 2 * Math.PI * (i + 0.5 * slump(i)) / N, v = 1500 + 700 * slump(i + 7), u = ((slump(i + 3) + t * v / 1400 * fart) % 1);
    const r = lerp(200, 1300, u), l = lerp(90, 520, u), w = lerp(8, 30 + 14 * slump(i + 11), u);
    const [x0, y0] = [MITT[0] + Math.cos(a) * r, MITT[1] + Math.sin(a) * r], [x1, y1] = [MITT[0] + Math.cos(a) * (r + l), MITT[1] + Math.sin(a) * (r + l)];
    p.setAttribute('d', `M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}`); p.setAttribute('stroke-width', w.toFixed(1));
    p.setAttribute('opacity', Math.min(1, u * 4).toFixed(2));
  });
  stank.forEach((g, i) => {
    const a = -Math.PI * (0.15 + 0.7 * slump(i + 20)) + (i % 2 ? Math.PI : 0) * 0, u = (slump(i + 30) + t * 0.9) % 1, r = lerp(380, 1200, u);
    const x = MITT[0] + Math.cos(a) * r * (i % 2 ? -1 : 1), y = MITT[1] + 260 - Math.sin(a) * r * 0.55 + 500 * u * u;
    g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(22 + 30 * u).toFixed(1)})`);
  });
  const sk = Math.sin(t * 41), sk2 = Math.sin(t * 33 + 1);
  f.pose({ x: W / 2 + 6 * sk, y: H + 260 + 5 * sk2, /* ögonen på ca 0,4 H, magen ut under bildkanten */ tilt: sida * (3 + 2 * Math.sin(t * 6)), poseNamn: 'hurra', humor: 'ropar', m: 1.3,
    pose2: { armar: UPP.map((v, i) => v + 7 * Math.sin(t * 18 + i * 2)), oron: [-14, -14] } });
  const z = lerp(1.06, 1.0, mjuk(del(0, 0.35, t))) + 0.03 * t / SLUT;
  kit.kamera(W / 2, H / 2, z, false, true);
}
kit.kor(render, SLUT, { sang: [K0, K0 + SLUT] });
})();
