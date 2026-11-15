// Mesh-deformation, delbyten och följsamhet för v2-riggarna (2026-11-14, provat på Kanel). Laddas efter rigg-motor.js.
// En del (öra, svans, arm, kropp) ritas om på en canvas inne i SVG:n (foreignObject) och kan då böjas och formas om:
// rita() sätter fortfarande vridning, lager och opacitet på klassen, och boil-filtret och öronklippet gäller som förut.
// Allt räknas ur posen, så render(t) är fortfarande deterministisk och Playwright + ffmpeg fungerar som förut.
//
// Pose-nycklar (lägg i POSE0, de blandas som allt annat):
//   oraBoj [[grader, start], [grader, start]]  öronen böjs utåt (+) / inåt (−) från start (0 = roten … 1 = spetsen)
//   svansBoj  grader, svansen viker sig upp (+) / ner (−)
//   bula      kroppen päronformad (+, landning) / smalare nertill (−), 0,05 syns tydligt
//   armForm [[längd, tass], …]  armen längre (> 1) / kortare, tassen bredare (+). Armarna böjs ALDRIG (Sanna: armar i en bit).
// Sidan: meshIn(fig, DELAR) när figuren byggts, sist i rita(): if (fig.mesh) meshRita(fig, p).
// Följsamhet: p = folj(lage, t, p) före rita (lage(t) → [ansikte, pose], som filmSekvens ger).

// ---------- Delbyten (bibliotek) ----------
// Öronen: [grader, start]. vikt = spetsen viker sig ut, bojd = mjuk båge ut, hanger = hänger tungt, inat = spetsarna mot varandra (nyfiken),
// spetsad = raka och lite inåt (lyssnar).
const ORAFORM = { rak: [0, 0], vikt: [70, 0.6], bojd: [30, 0.1], hanger: [55, 0.3], inat: [-22, 0.4], spetsad: [-6, 0.1] };
// Armarna: [längd, tass]. lang = sträcker sig (når, pekar), kort = drar in armen (blyg, kall), tass = öppen tass (vinkar, tar emot).
const ARMFORM = { vanlig: [1, 0], lang: [1.16, 0], kort: [0.86, 0], tass: [1, 0.22], langTass: [1.14, 0.18] };
// Munnen (kodmunnen, samma nycklar som uttrycken): ljuden för "hej", "oj", "mm" och sånger.
const MUNFORM = { a: { mun: [20, 22, 0.3, 462], streck: 0 }, o: { mun: [11, 15, 0, 464], streck: 0 }, e: { mun: [24, 10, 0.85, 458], streck: 0 },
  i: { mun: [20, 6, 1, 456], streck: 0, le: 1.3 }, u: { mun: [7, 9, 0, 465], streck: 0 }, m: { mun: [0, 0, 0, 462], streck: 1, le: 0.25, leBred: 0.75 } };
const oraForm = (v, h = v) => ({ oraBoj: [ORAFORM[v], ORAFORM[h]] });
const armForm = (v, h = v) => ({ armForm: [ARMFORM[v], ARMFORM[h]] });
const munForm = (f, namn, k = 1) => blanda(f, { ...f, ...MUNFORM[namn] }, k);
// prata(f, 'hej!', tl): munnen går igenom ljuden, takt s per bokstav, mjuk övergång mellan dem. m/b/p sluter munnen,
// andra konsonanter är en halvöppen e-mun. Före och efter ordet: f som det är.
const LJUD = { a: 'a', e: 'e', i: 'i', o: 'o', u: 'u', y: 'u', å: 'o', ä: 'e', ö: 'o', m: 'm', b: 'm', p: 'm' };
const prata = (f, ord, tl, takt = 0.13) => { const tecken = [...ord.toLowerCase()].filter(c => /\p{L}/u.test(c)), n = tecken.length;
  if (tl < 0 || tl >= n * takt) return f;
  const form = c => LJUD[c] ? [LJUD[c], 1] : ['e', 0.4], i = Math.floor(tl / takt), u = tl / takt - i;
  const ut = (c, k) => munForm(f, form(c)[0], form(c)[1] * k);
  const [a, b] = [ut(tecken[i], 1), i + 1 < n ? ut(tecken[i + 1], 1) : f], ner = i === 0 ? mjuk(kl(0, 1, u / 0.4)) : 1;
  return blanda(blanda(f, a, ner), b, mjuk(kl(0, 1, (u - 0.6) / 0.4))); };

// ---------- Deformationerna (punkt i delens 1024-ruta → ny punkt) ----------
// Böj längs en axel från roten P mot spetsen S: från start böjs axeln i en jämn båge, grader totalt vid spetsen.
const bojFn = (P, S, grader, start) => { const L = Math.hypot(S[0] - P[0], S[1] - P[1]), d = [(S[0] - P[0]) / L, (S[1] - P[1]) / L], n = [-d[1], d[0]];
  const th = grader * Math.PI / 180, s0 = start * L, A = L - s0;
  if (Math.abs(th) < 1e-3) return null;
  return ([x, y]) => { const vx = x - P[0], vy = y - P[1], s = vx * d[0] + vy * d[1], w = vx * n[0] + vy * n[1];
    if (s <= s0) return [x, y];
    const ex = Math.max(0, s - L), ph = th * (s - ex - s0) / A, R = A / th, c = Math.cos(ph), si = Math.sin(ph);
    const qd = s0 + R * si + ex * c - w * si, qn = R * (1 - c) + ex * si + w * c;   // (d, n)-ramen: bågen, sedan rakt ut förbi spetsen
    return [P[0] + qd * d[0] + qn * n[0], P[1] + qd * d[1] + qn * n[1]]; }; };
// Päronform: bredare nertill (mest kring magen, y 470–fötterna), ansiktet (ovanför 470) rörs inte, så kodansiktet passar.
const bulaFn = b => Math.abs(b) < 1e-4 ? null : ([x, y]) => [512 + (x - 512) * (1 + b * Math.sin(Math.PI * kl(0, 1, (y - 470) / (FOTTER - 470)))), y];
// Armen: längre längs axeln och bredare ytterst (tassen). Roten (inne under kroppen) rörs inte. Ingen böj.
const armFn = (P, S, lang, tass) => { if (Math.abs(lang - 1) < 1e-3 && Math.abs(tass) < 1e-3) return null;
  const L = Math.hypot(S[0] - P[0], S[1] - P[1]), d = [(S[0] - P[0]) / L, (S[1] - P[1]) / L], n = [-d[1], d[0]];
  return ([x, y]) => { const vx = x - P[0], vy = y - P[1], s = vx * d[0] + vy * d[1], w = vx * n[0] + vy * n[1];
    if (s <= 0) return [x, y];
    const s2 = s * lang, w2 = w * (1 + tass * mjuk(kl(0, 1, (s / L - 0.55) / 0.45)));
    return [P[0] + s2 * d[0] + w2 * n[0], P[1] + s2 * d[1] + w2 * n[1]]; }; };

// ---------- Canvas-delarna ----------
const MESHKALLA = {};
// Bilden en gång per fil: pixlarna, ytan med färg (box) och vilka rutor i nätet som har något i sig.
const meshKalla = href => MESHKALLA[href] || (MESHKALLA[href] = new Promise((ok, fel) => { const im = new Image();
  im.onerror = fel;
  im.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 1024;
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0, 1024, 1024);
    const a = x.getImageData(0, 0, 1024, 1024).data; let x0 = 1024, y0 = 1024, x1 = 0, y1 = 0;
    for (let y = 0; y < 1024; y++) for (let xx = 0; xx < 1024; xx++) if (a[(y * 1024 + xx) * 4 + 3] > 8) {
      if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    ok({ c, a, box: [Math.max(0, x0 - 2), Math.max(0, y0 - 2), Math.min(1024, x1 + 3), Math.min(1024, y1 + 3)] }); };
  im.src = href; }));
const langst = (a, box, P) => { let b = 0, S = P;   // delens spets: pixeln längst från roten
  for (let y = box[1]; y < box[3]; y += 2) for (let x = box[0]; x < box[2]; x += 2)
    if (a[(y * 1024 + x) * 4 + 3] > 20) { const d = (x - P[0]) ** 2 + (y - P[1]) ** 2; if (d > b) { b = d; S = [x, y]; } }
  return S; };

// delar: { klass: { typ: 'ora' | 'svans' | 'arm' | 'bula', spets?: [x, y], rot?: [x, y] } }. rot: där böjen börjar (standard RIGG); lägg
// den strax innanför kroppens kant, så att skarven göms under kroppen (Kanels svans: vridpunkten låg utanför kanten och roten syntes). Varje <image class="klass"> i figuren byts mot en canvas
// (originalbilden ligger kvar gömd, så att det som läser bildens href fortfarande hittar den). Rotpunkten tas ur RIGG.
const meshIn = (fig, delar) => Promise.all(Object.entries(delar).flatMap(([klass, o]) => [...fig.querySelectorAll('image.' + klass)].map(async im => {
  const k = await meshKalla(im.getAttribute('href')), i = klass.includes('-r') ? 1 : 0, rigg = typeof RIGG !== 'undefined' && RIGG[klass.replace('2', '')];
  const P = o.rot || rigg || [512, FOTTER], S = o.spets || langst(k.a, k.box, P), L = Math.hypot(S[0] - P[0], S[1] - P[1]);
  const m = { ora: 0.85 * L, svans: 0.8 * L, arm: 0.35 * L, bula: 80 }[o.typ];
  const rx = Math.floor(k.box[0] - m), ry = Math.floor(k.box[1] - m), rw = Math.ceil(k.box[2] - k.box[0] + 2 * m), rh = Math.ceil(k.box[3] - k.box[1] + 2 * m);
  const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  [['x', rx], ['y', ry], ['width', rw], ['height', rh]].forEach(([n, v]) => fo.setAttribute(n, v));
  ['class', 'clip-path', 'transform', 'opacity'].forEach(n => im.hasAttribute(n) && fo.setAttribute(n, im.getAttribute(n)));
  const cv = document.createElement('canvas'); cv.width = rw; cv.height = rh; cv.style.display = 'block'; fo.appendChild(cv);
  im.after(fo); im.removeAttribute('class'); im.setAttribute('display', 'none');
  const tecken = i ? 1 : -1;   // vänstra örat: utåt = moturs
  const form = o.typ === 'ora' ? p => { const [g, s] = p.oraBoj[i]; return [`${g.toFixed(2)} ${s.toFixed(3)}`, () => bojFn(P, S, tecken * g, s)]; }
    : o.typ === 'svans' ? p => [p.svansBoj.toFixed(2), () => bojFn(P, S, -p.svansBoj, 0)]
    : o.typ === 'arm' ? p => { const [l, t] = p.armForm[i]; return [`${l.toFixed(3)} ${t.toFixed(3)}`, () => armFn(P, S, l, t)]; }
    : p => [p.bula.toFixed(4), () => bulaFn(p.bula)];
  (fig.mesh ||= []).push({ ctx: cv.getContext('2d'), k, region: [rx, ry, rw, rh], form, nyckel: null });
})));

// Ritar om de delar vars form ändrats sedan förra bilden (samma pose → samma bild, så det är fortfarande ren funktion av t).
const meshRita = (fig, p) => fig.mesh.forEach(e => { const [nyckel, fn] = e.form(p); if (nyckel === e.nyckel) return; e.nyckel = nyckel;
  const { ctx, k, region: [rx, ry, rw, rh] } = e, f = fn();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, rw, rh); ctx.setTransform(1, 0, 0, 1, -rx, -ry);
  if (!f) { ctx.drawImage(k.c, 0, 0); return; }
  const [x0, y0, x1, y1] = k.box, steg = rw * rh > 400000 ? 32 : 16, nx = Math.ceil((x1 - x0) / steg), ny = Math.ceil((y1 - y0) / steg);
  const V = []; for (let j = 0; j <= ny; j++) for (let ii = 0; ii <= nx; ii++) V.push(f([x0 + ii * steg, y0 + j * steg]));
  const har = (ii, j) => { for (let y = y0 + j * steg; y < Math.min(y1, y0 + (j + 1) * steg); y += 3)   // tomma rutor hoppas över
    for (let x = x0 + ii * steg; x < Math.min(x1, x0 + (ii + 1) * steg); x += 3) if (k.a[(y * 1024 + x) * 4 + 3] > 0) return true; return false; };
  const fulla = e.fulla ||= (() => { const ut = []; for (let j = 0; j < ny; j++) for (let ii = 0; ii < nx; ii++) if (har(ii, j)) ut.push([ii, j]); return ut; })();
  const src = (ii, j) => [x0 + ii * steg, y0 + j * steg], dst = (ii, j) => V[j * (nx + 1) + ii];
  for (const [ii, j] of fulla) {
    meshTri(ctx, k.c, src(ii, j), src(ii + 1, j), src(ii + 1, j + 1), dst(ii, j), dst(ii + 1, j), dst(ii + 1, j + 1));
    meshTri(ctx, k.c, src(ii, j), src(ii + 1, j + 1), src(ii, j + 1), dst(ii, j), dst(ii + 1, j + 1), dst(ii, j + 1)); } });
// En triangel: klipp till målet (0,7 px större, så att inga hårfina sömmar syns), avbilda källan affint dit.
const meshTri = (ctx, img, s0, s1, s2, d0, d1, d2) => {
  const cx = (d0[0] + d1[0] + d2[0]) / 3, cy = (d0[1] + d1[1] + d2[1]) / 3;
  const ut = ([x, y]) => { const l = Math.hypot(x - cx, y - cy) || 1; return [x + 0.7 * (x - cx) / l, y + 0.7 * (y - cy) / l]; };
  const [a0, a1, a2] = [ut(d0), ut(d1), ut(d2)];
  const u1 = [s1[0] - s0[0], s1[1] - s0[1]], u2 = [s2[0] - s0[0], s2[1] - s0[1]], v1 = [d1[0] - d0[0], d1[1] - d0[1]], v2 = [d2[0] - d0[0], d2[1] - d0[1]];
  const det = u1[0] * u2[1] - u2[0] * u1[1]; if (!det) return;
  const a = (v1[0] * u2[1] - v2[0] * u1[1]) / det, c = (v2[0] * u1[0] - v1[0] * u2[0]) / det;
  const b = (v1[1] * u2[1] - v2[1] * u1[1]) / det, d = (v2[1] * u1[0] - v1[1] * u2[0]) / det;
  ctx.save(); ctx.beginPath(); ctx.moveTo(...a0); ctx.lineTo(...a1); ctx.lineTo(...a2); ctx.closePath(); ctx.clip();
  ctx.transform(a, b, c, d, d0[0] - a * s0[0] - c * s0[1], d0[1] - b * s0[0] - d * s0[1]); ctx.drawImage(img, 0, 0); ctx.restore(); };

// ---------- Följsamhet (fjädrar på öron, svans och kropp) ----------
// Huvudets läge i figurens px ur posen: hopp, sjunk, sträckning (ca 600 px över fötterna) och lutning (ca 10 px per grad).
// En dämpad fjäder (hz, zeta) följer huvudet, simulerad över de senaste fonster s av lage(t) varje bild, så att inget sparas mellan
// bilderna. Där massan släpar efter (u) böjer sig öronen, svansen och magen: uppåt-släp → öronen hänger ut, kroppen blir päron.
// Armarna får ingen fjäder (Sanna: ingen efterstudsning på armar). Figurens egna tal: const FOLJ = { … } i sidan.
// Lugnt (Sanna: lugn rörelse, inte studsig): 1,6 Hz och zeta 0,7 ger ett mjukt efterslag utan fladder.
const FOLJ0 = { hz: 1.6, zeta: 0.7, fonster: 1.4, ora: 0.45, oraMax: [-8, 26], sida: 0.35, svans: 0.5, svansMax: 18, bula: 0.0009, bulaMax: [-0.02, 0.05], start: 0.3 };
const huvudPunkt = (f, p) => [p.x + 10 * (p.luta + p.boj), p.lyft + p.sank - 600 * ((f.strack ?? 1) - 1 + p.strack)];
const folj = (lage, t, p, o = {}) => { o = { ...FOLJ0, ...(typeof FOLJ !== 'undefined' ? FOLJ : {}), ...o };
  const dt = 1 / 60, N = Math.round(o.fonster / dt), w = 2 * Math.PI * o.hz, D = [];
  for (let k = -1; k <= N + 1; k++) { const [f, q] = lage(Math.max(0, t - o.fonster + k * dt)); D.push(huvudPunkt(f, q)); }
  const u = [0, 0], v = [0, 0];
  for (let k = 1; k <= N + 1; k++) for (let j = 0; j < 2; j++) {
    const a = kl(-20000, 20000, (D[k + 1][j] - 2 * D[k][j] + D[k - 1][j]) / (dt * dt));   // hopp i lage (avsnittsbyte) ger inga jättestötar
    v[j] += (-w * w * u[j] - 2 * o.zeta * w * v[j] - a) * dt; u[j] += v[j] * dt; }
  const ora = o.ora * u[1], sida = o.sida * u[0];
  const oraBoj = p.oraBoj.map(([g, s], i) => [g + kl(o.oraMax[0], o.oraMax[1], ora + (i ? 1 : -1) * sida),
    o.start + (s - o.start) * Math.min(1, Math.abs(g) / 10)]);   // posens start gäller när posen själv böjer örat
  return { ...p, oraBoj, svansBoj: p.svansBoj + kl(-o.svansMax, o.svansMax, -o.svans * u[1]), bula: p.bula + kl(o.bulaMax[0], o.bulaMax[1], o.bula * u[1]) }; };
