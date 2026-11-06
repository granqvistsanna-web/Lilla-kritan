// Mjuka poser (Sanna, 2026-11-06: "make animations smooth"):
//   kit.kor(kit.mjukaKlipp(mjukaPoser(render, figurer, { klipp }), …), …)
// Figurernas pose läses var 1/60 s (armarnas mål l/r, delarnas vinklar, x, y, s, tilt). Ändras något mer på en sådan
// sextiondel än en rörelse hinner (ett knäpp: armen byter läge, en figur flyttas), läggs hoppet tillbaka och tonas bort på
// d s (inUt), så att det glider dit. Rörelser som redan pågår (vinkningar, hopp, steg) är under gränsen och behåller sin takt.
// render ska vara en ren funktion av t (som för kit.mjukaKlipp). klipp: tider för raka klipp, där hopp ska få vara kvar.
// figurer: [[figur, vila]], vila = armens viloläge för figurer vars arm saknar mål när den hänger (Lova: LOVA_VILA).
// Under blandningen ligger den pose som faktiskt används i f.mjuk (annars saknas den), så att saker i handen kan följa armen.
// Hör hemma i kit.js (se bondgarden/BEHOV.md); ligger här tills vidare eftersom kit.js ändras av en annan session.
(() => {
const STEG = 1 / 60, TOPP = ['x', 'y', 's', 'tilt'];
const LOVA_VILA = { r: [910, 665], l: [104, 672] };
// största ändring på en sextiondel som räknas som rörelse; mer än så är ett knäpp
const GRANS = { x: 20, y: 20, s: 0.03, tilt: 6, arm: 220, del: 18 };
const vek = (o, vila) => {   // posen som platta tal: nyckel → värde (null för en dold figur)
  if (o.synlig === false) return null;
  const v = {};
  for (const k of TOPP) if (typeof o[k] === 'number') v[k] = o[k];
  for (const s of 'rl') { const p = o[s] || (vila && vila[s]); if (p) { v[s + 0] = p[0]; v[s + 1] = p[1]; } }
  for (const n in o.delar || {}) { const d = o.delar[n]; if (typeof d === 'number') v['d:' + n] = d; else if (Array.isArray(d)) v['d:' + n] = d[0]; }
  return v;
};
function mjukaPoser(render, figurer, { klipp = [], d = 0.25 } = {}) {
  const prov = new Map(), hopp = new Map(), orig = () => figurer.map(([f]) => f.pose);
  const fanga = k => {   // posen vid sextiondel k (rå, utan blandning)
    if (prov.has(k)) return prov.get(k);
    const m = new Map(), o0 = orig();
    figurer.forEach(([f, vila], i) => { f.pose = (o = {}) => { m.set(f, vek(o, vila)); o0[i](o); }; });
    try { render(k * STEG); } finally { figurer.forEach(([f], i) => { f.pose = o0[i]; }); }
    prov.set(k, m);
    return m;
  };
  const knapp = k => {   // hoppen mellan sextiondel k−1 och k: figur → { nyckel: före − efter }
    if (hopp.has(k)) return hopp.get(k);
    const ut = new Map();
    if (!klipp.some(c => c > (k - 1) * STEG && c <= k * STEG)) {
      const fore = fanga(k - 1), efter = fanga(k);
      for (const [f, e] of efter) {
        const a = fore.get(f); if (!a || !e) continue;
        const dv = {}, noll = n => n.startsWith('d:') ? 0 : undefined;   // en del som saknas står i 0
        for (const n of new Set([...Object.keys(a), ...Object.keys(e)])) {
          const x = a[n] ?? noll(n), y = e[n] ?? noll(n);
          if (x === undefined || y === undefined) continue;
          const g = n.startsWith('d:') ? GRANS.del : n === 's' ? GRANS.s * (Math.abs(y) || 1) : GRANS[n];
          if (g !== undefined && Math.abs(x - y) > g) dv[n] = x - y;
        }
        for (const s of 'rl') {   // armens mål: ett knäpp om punkten flyttas långt
          if (!(s + 0 in a && s + 0 in e)) continue;
          if (Math.hypot(a[s + 0] - e[s + 0], a[s + 1] - e[s + 1]) > GRANS.arm) { dv[s + 0] = a[s + 0] - e[s + 0]; dv[s + 1] = a[s + 1] - e[s + 1]; }
        }
        if (Object.keys(dv).length) ut.set(f, dv);
      }
    }
    hopp.set(k, ut);
    return ut;
  };
  return t => {
    const off = new Map();   // figur → summan av de avtonande hoppen
    for (let k = Math.floor(t / STEG + 1e-6); k > 0 && k * STEG > t - d; k--) {
      const w = 1 - kit.inUt((t - k * STEG) / d);
      for (const [f, dv] of knapp(k)) {
        const o = off.get(f) || {};
        for (const n in dv) o[n] = (o[n] || 0) + w * dv[n];
        off.set(f, o);
      }
    }
    if (!off.size) return render(t);
    const o0 = orig();
    figurer.forEach(([f, vila], i) => {
      const dv = off.get(f);
      if (dv) f.pose = (o = {}) => {
        const p = { ...o, delar: { ...(o.delar || {}) } };
        for (const n of TOPP) if (dv[n] && typeof o[n] === 'number') p[n] = o[n] + dv[n];
        for (const s of 'rl') if (dv[s + 0] || dv[s + 1]) { const q = o[s] || (vila && vila[s]); if (q) p[s] = [q[0] + (dv[s + 0] || 0), q[1] + (dv[s + 1] || 0)]; }
        for (const n in dv) { if (!n.startsWith('d:')) continue; const del = n.slice(2), v = p.delar[del] ?? 0;
          if (typeof v === 'number') p.delar[del] = v + dv[n]; else if (Array.isArray(v)) p.delar[del] = [v[0] + dv[n], ...v.slice(1)]; }
        f.mjuk = p;
        o0[i](p);
      };
    });
    try { render(t); } finally { figurer.forEach(([f], i) => { f.pose = o0[i]; delete f.mjuk; }); }
  };
}
mjukaPoser.LOVA_VILA = LOVA_VILA;
// kit.hopp med halva huken och sträckningen: huken slutar helt hopsjunken och hoppet sträcker direkt, vilket blir ett ryck
// på stora figurer (Lova i discot). Hör också hemma i kit.js (bondgarden/BEHOV.md).
mjukaPoser.hopp = (...a) => { const h = kit.hopp(...a); return { ...h, sx: 1 + 0.5 * (h.sx - 1), sy: 1 + 0.5 * (h.sy - 1) }; };
window.mjukaPoser = mjukaPoser;
})();
