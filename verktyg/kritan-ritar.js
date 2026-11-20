// Kritan ritar – samma ritande i alla avsnitt (skillen kritan-ritar, format/ritintro.md).
// Bygger på ritintrot (011/045) och 046 Kaninen går till doktorn. Allt är SVG-strängar i scenens 1920×1080-koordinater.
// Ladda med <script src="/verktyg/kritan-ritar.js"></script>. Kräver att kritans bild finns (KRITAN.BILD).
//
//   kritaBild(x, y, {s, v})        kritan med spetsen i (x, y), vriden v grader, skala s
//   kritaSkala(zoom)              kritans skala i en scen med kamerazoom (lika stor i bild hur nära kameran än går)
//   ritBana(drag, k, {vikt, attr}) linjen ritas streck för streck fram till k (0–1); kritan glider mellan strecken i en liten båge.
//                                 Ger { html, spets, start, slut }. Ett drag (en kontur) = ett streck.
//   kritaFas(t, T, spets, slut)   var kritan är under hela förloppet: in, ritar, glider till väntplatsen, svajar, flyger ut.
//                                 Ger { x, y, v } eller null (kritan är borta).
//   ritfart(k)                    jämn fart med mjuk start (0,6 linjär + 0,4 mjuk)
//   fyllMask(id, cx, cy, R, f)    cirkeln som fyller den riktiga bilden inifrån (f 0–1)
//   linjeOpacitet(f)              linjen tonas bort medan bilden fylls
//   gnistor(cx, cy, R, t, n)      krit-gnistorna på svaret
//
// Siffrorna nedan är godkända av Sanna. Ändra dem här, inte i avsnitten.

const KRITAN = {
  BILD: '/assets/rekvisita/krita-rod/cut/krita-rod.png', WH: [755, 265], SPETS: [742, 132],
  LINJE: '#3a2c28',          // mörk kritlinje (i färgsångerna: en mörk ton av avsnittets färg)
  BRED: 12,                  // linjens bredd i helbild (ca 3 % av sakens höjd); dela med sakens skala om linjen ritas i bildens pixlar
  VINKEL_RITAR: 125, VINKEL_VANTAR: 140,
  SKALA_PAPPER: 0.42,        // på ritpapperet (ritintrot)
  SKALA_SCEN: 0.33,          // i en scen, delas med √zoom
  SVAJ: { ax: 5, ay: 4, fx: 1.2, fy: 1.7, av: 1.5, fv: 1.0 },   // lugnt (Sanna 2026-11-21: "a bit less wobbly crayon")
  RESA: { bas: 0.25, perPx: 1 / 900, bage: 40 },   // glidningen mellan två streck: vikt och båge
};

const _kl = x => Math.max(0, Math.min(1, x)), _lerp = (a, b, t) => a + (b - a) * t, _mjuk = t => (t = _kl(t), t * t * (3 - 2 * t));
const _f1 = x => (+x).toFixed(1);

function kritaBild(x, y, { s = KRITAN.SKALA_PAPPER, v = KRITAN.VINKEL_RITAR } = {}) {
  return `<image class="krita" href="${KRITAN.BILD}" width="${KRITAN.WH[0]}" height="${KRITAN.WH[1]}" transform="translate(${_f1(x)} ${_f1(y)}) rotate(${_f1(v)}) scale(${s.toFixed(3)}) translate(${-KRITAN.SPETS[0]} ${-KRITAN.SPETS[1]})"/>`;
}
const kritaSkala = (zoom = 1) => KRITAN.SKALA_SCEN / Math.sqrt(zoom);
const ritfart = k => (k = _kl(k), 0.6 * k + 0.4 * _mjuk(k));

// Streckens längd, start och slut mäts en gång per uppsättning drag (kräver en <svg> i dokumentet).
const _matt = new Map();
function _mat(drag) {
  const key = drag.join('|'); if (_matt.has(key)) return _matt.get(key);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('style', 'position:absolute;width:0;height:0');
  document.body.appendChild(svg);
  const m = drag.map(d => { const e = document.createElementNS('http://www.w3.org/2000/svg', 'path'); e.setAttribute('d', d); svg.appendChild(e);
    const L = e.getTotalLength(), a = e.getPointAtLength(0), b = e.getPointAtLength(L); return { e, L, a: [a.x, a.y], b: [b.x, b.y] }; });
  _matt.set(key, m); return m;
}

function ritBana(drag, k, { vikt = null, attr = '' } = {}) {
  const M = _mat(drag), steg = [], R = KRITAN.RESA;
  const st = attr || `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${KRITAN.BRED}" stroke-linecap="round" stroke-linejoin="round"`;
  drag.forEach((d, i) => {
    if (i) { const [x0, y0] = M[i - 1].b, [x1, y1] = M[i].a, dist = Math.hypot(x1 - x0, y1 - y0); if (dist > 4) steg.push({ resa: i, w: R.bas + dist * R.perPx }); }
    steg.push({ rita: i, w: vikt ? vikt[i] : M[i].L / 300 });
  });
  const sum = steg.reduce((a, x) => a + x.w, 0); let acc = 0, html = '', spets = M.at(-1).b;
  for (const s of steg) {
    const a = acc / sum, b = (acc += s.w) / sum, u = _kl((k - a) / (b - a));
    if (s.rita != null && u > 0) html += `<path d="${drag[s.rita]}" pathLength="1" ${st} stroke-dasharray="1 1" stroke-dashoffset="${(1 - u).toFixed(4)}"/>`;
    if (k >= a && k < b) {
      if (s.rita != null) { const q = M[s.rita].e.getPointAtLength(M[s.rita].L * u); spets = [q.x, q.y]; }
      else { const P0 = M[s.resa - 1].b, P1 = M[s.resa].a, m = _mjuk(u); spets = [_lerp(P0[0], P1[0], m), _lerp(P0[1], P1[1], m) - R.bage * Math.sin(Math.PI * m)]; }
    }
  }
  return { html, spets, start: M[0].a, slut: M.at(-1).b };
}

// Kritans hela förlopp. T = { in: [t0, t1], rit: [t0, t1], vanta: [t0, t1], ut: [t0, t1] } i sekunder (ut kan vara samma tid som svaret).
// start: där första strecket börjar. spets: ritBana(...).spets just nu. slut: ritBana(...).slut. vanta: väntplatsen [x, y].
// in: kritan kommer uppifrån höger. Den går aldrig över ett ansikte – lägg väntplatsen och ut-banan på fri yta.
function kritaFas(t, T, { start, spets, slut, vanta, s = KRITAN.SKALA_PAPPER }) {
  const SV = KRITAN.SVAJ, sv = [vanta[0] + SV.ax * Math.sin(t * SV.fx), vanta[1] + SV.ay * Math.sin(t * SV.fy)], vs = KRITAN.VINKEL_VANTAR + SV.av * Math.sin(t * SV.fv);
  const bit = (x, y, v) => ({ x, y, v, s });
  if (t < T.in[0]) return null;
  if (t < T.rit[0]) { const m = _mjuk((t - T.in[0]) / (T.in[1] - T.in[0])); return bit(_lerp(2100, start[0], m), _lerp(60, start[1], m), KRITAN.VINKEL_RITAR); }
  if (t < T.vanta[0]) return bit(spets[0], spets[1], KRITAN.VINKEL_RITAR);             // ritar, eller står kvar i sista spetsen (inget flimmer)
  if (t < T.ut[0]) { const m = _mjuk((t - T.vanta[0]) / (T.vanta[1] - T.vanta[0]));       // glider i en båge till väntplatsen och svajar
    return bit(_lerp(slut[0], sv[0], m), _lerp(slut[1], sv[1], m) - 60 * Math.sin(Math.PI * m), _lerp(KRITAN.VINKEL_RITAR, vs, m)); }
  const m = _mjuk((t - T.ut[0]) / (T.ut[1] - T.ut[0]));                                   // flyger ut uppe till höger
  return m >= 1 ? null : bit(_lerp(sv[0], 2100, m), _lerp(sv[1], 60, m), vs);
}

const fyllMask = (id, cx, cy, R, f) => `<clipPath id="${id}"><circle cx="${_f1(cx)}" cy="${_f1(cy)}" r="${_f1(R * Math.pow(_mjuk(f), 1.2))}"/></clipPath>`;
const linjeOpacitet = f => 1 - _kl((f - 0.15) / 0.75);

const _gnistaD = (x, y, r) => `M${_f1(x)} ${_f1(y - r)} Q${_f1(x + r * 0.18)} ${_f1(y - r * 0.18)} ${_f1(x + r)} ${_f1(y)} Q${_f1(x + r * 0.18)} ${_f1(y + r * 0.18)} ${_f1(x)} ${_f1(y + r)} Q${_f1(x - r * 0.18)} ${_f1(y + r * 0.18)} ${_f1(x - r)} ${_f1(y)} Q${_f1(x - r * 0.18)} ${_f1(y - r * 0.18)} ${_f1(x)} ${_f1(y - r)}Z`;
function gnistor(cx, cy, R, t, n = 5) {
  return Array.from({ length: n }, (_, i) => { const u = (t - 0.25 * i) / 1.4; if (u < 0 || u > 1) return '';
    const a = -Math.PI / 2 + i * 2 * Math.PI / n + 0.4, x = cx + R * Math.cos(a), y = cy + R * 0.8 * Math.sin(a), r = 44 * Math.sin(Math.PI * Math.min(1, u * 1.6)) * (1 - 0.3 * u);
    return r > 0.5 ? `<path d="${_gnistaD(x, y, r)}" fill="#ffd23f" stroke="#fff" stroke-width="6" stroke-linejoin="round" paint-order="stroke" transform="rotate(${_f1(20 * u)} ${_f1(x)} ${_f1(y)})"/>` : ''; }).join('');
}

if (typeof window !== 'undefined') Object.assign(window, { KRITAN, kritaBild, kritaSkala, ritfart, ritBana, kritaFas, fyllMask, linjeOpacitet, gnistor });
