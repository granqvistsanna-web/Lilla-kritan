// Snö som faller utanför ett fönster i julrummen (Sanna 2026-11-17: "improve falling snow animation").
// Tre lager ger djup: långt bort små, svaga flingor; i mitten mellanstora; nära några stora, mjuka.
// Varje flinga faller en bit av fönstret per loop och tonas in och ut, så snön faller långsamt fast loopen bara är 6 s. Varje flinga svajar lugnt i sin egen takt, tonas in i överkanten och är en mjuk rund prick (inte en skarp cirkel).
// Allt räknas ur t och går jämnt upp på D sekunder, så loopen är sömlös.
//   const s = snoFonster(F, D);   F = { x0, x1, y0, y1 } (fönstrets glas i scenen), D = loopens längd
//   s.defs i <defs>, s.svg inne i fönstrets mask, s.seek(t) i sidans seek
function snoFonster(F, D) {
  const slump = i => { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };   // fast "slump", samma varje gång
  const LAGER = [
    { n: 30, r: [1.8, 2.6], op: 0.55, svaj: 4, varv: 1, mjuk: 0 },
    { n: 18, r: [3.2, 4.4], op: 0.85, svaj: 7, varv: 1, mjuk: 0 },
    { n: 7, r: [5.5, 7], op: 0.95, svaj: 11, varv: 1, mjuk: 1.1 },
  ];
  const w = F.x1 - F.x0, h = F.y1 - F.y0 + 70;
  const SPANN = 0.4;   // varje flinga faller bara 40 % av fönstrets höjd per loop (lugnt, Sanna 2026-11-17: "slow snow"), tonas in och ut i ändarna
  let k = 0;
  const flingor = LAGER.flatMap((L, l) => Array.from({ length: L.n }, (_, j) => { const i = k++;
    return { l, L, x: F.x0 - 15 + slump(i) * (w + 30), fas: slump(i + 50), r: L.r[0] + slump(i + 99) * (L.r[1] - L.r[0]),
      takt: 1 + (i % 2), ph: slump(i + 7) * 6.283, ph2: slump(i + 13) * 6.283, start: slump(i + 31) * (1 - SPANN) }; }));
  const defs = `<radialGradient id="sno-flinga"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="sno-mjuk" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${LAGER[2].mjuk}"/></filter>`;
  const svg = LAGER.map((L, l) => `<g class="sno-lager"${L.mjuk ? ' filter="url(#sno-mjuk)"' : ''}>${flingor.filter(f => f.l === l)
    .map(f => `<circle r="${(f.r * 1.25).toFixed(1)}" fill="url(#sno-flinga)"/>`).join('')}</g>`).join('');
  let els;
  const seek = t => {
    els ??= [...document.querySelectorAll('.sno-lager circle')];
    flingor.forEach((f, i) => { const u = (f.L.varv * t / D + f.fas) % 1, T = 2 * Math.PI * t / D;
      const x = f.x + f.L.svaj * Math.sin(f.takt * T + f.ph) + 2 * Math.sin(3 * T + f.ph2), y = F.y0 - 35 + (f.start + u * SPANN) * h;
      els[i].setAttribute('cx', x.toFixed(1)); els[i].setAttribute('cy', y.toFixed(1));
      els[i].setAttribute('opacity', (f.L.op * Math.min(1, u / 0.15, (1 - u) / 0.15)).toFixed(2)); });
  };
  return { defs, svg, seek };
}
