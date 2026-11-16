// Lucka 7 i three.js (Sanna 2026-11-16: "use the latest three js effects"): scenen ritas som förut i SVG:n och tecknas varje bildruta med
// WebGL (rigg-three-jul.js, en kopia av verktyg/rigg-three.js): rummet får djup (väggen långt bort, sängen mitt emellan, golvet med djuren
// och granen närmast) och kameran kan åka in (dolly) med parallax. Introt och slutet (kalendern, luckan) ritas av SVG:n som förut.
// På bitarna: dolly: [från, till, mitt?] = kameran åker in från → till px (0 = ingen åkning, ca 150–350 är lagom) under biten, mjukt;
// mitt = den höjd i bilden som står still (standard golvet). Utan dolly står kameran still.
async function treJ07(svg) {
  // <use> kan three-ritaren inte läsa: byt dem mot kopior av det de pekar på (skärvorna)
  for (const u of [...svg.querySelectorAll('use')]) { if (u.closest('defs')) continue;
    let t = u; while (t?.tagName === 'use') t = svg.querySelector(t.getAttribute('href'));
    const c = t.cloneNode(true); c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
    if (u.getAttribute('transform')) { const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', u.getAttribute('transform')); g.append(c); u.replaceWith(g); }
    else u.replaceWith(c); }
  // djup: väggen med fönstret, gardinen, tavlan och lampans sken långt bort, sängen och radion mitt emellan, resten (golvet, granen, djuren) i z 0
  const kam = svg.querySelector('#kamera'), z = (e, v) => e?.setAttribute('data-z', v);
  z(svg.querySelector('#djup-bak') ?? kam.querySelector(':scope > image'), 900);   // rumsbilden (djur.js lägger den i #djup-bak)
  z(kam.querySelector(':scope > g[clip-path="url(#fonsterklipp)"]'), 900); z(svg.querySelector('#gardin'), 900);
  kam.querySelectorAll(':scope > image').forEach(i => { const h = i.getAttribute('href');
    if (/tavla/.test(h)) z(i, 900); else if (/sangen|kudde|tacket/.test(h)) z(i, 300); });
  z(svg.querySelector('#radio'), 300); svg.querySelectorAll('.radionot').forEach(e => z(e, 300));
  kam.querySelectorAll(':scope > circle').forEach(c => { if (/sak-sken/.test(c.getAttribute('fill'))) z(c, 900); });

  // spegeln (Sanna: "lammet speglar sig i kulan med reflektion"): lammets ansikte spegelvänt och rundat i silvret (spegel-lammet.png, tagen ur
  // riggen), i kulan (#sak-boll: kulans mitt i (0, 0), radie 70). spegel: [in, ut] på en bit = tonas in och ut (0,5 s), andas lite medan den syns
  const mapp = location.pathname.replace(/[^/]*$/, ''), R = 70;
  svg.querySelector('#sak-k1').insertAdjacentHTML('afterend', `<g id="spegel" opacity="0"><image href="${mapp}spegel-lammet.png" x="${-0.86 * R}" y="${-0.8 * R}" width="${1.72 * R}" height="${1.72 * R}"/></g>`);
  await lucka.bild(mapp + 'spegel-lammet.png');
  const SP = window.BITAR2.filter(b => b.spegel).map(b => [b.t0 + b.spegel[0], b.t0 + b.spegel[1]]), spegel = svg.querySelector('#spegel');
  const spegla = t => { const k = Math.max(0, ...SP.map(([a, c]) => Math.min(1, (t - a) / 0.5, (c - t) / 0.5)));
    spegel.setAttribute('opacity', k.toFixed(3)); spegel.setAttribute('transform', `scale(${(1 + 0.03 * Math.sin(t * 2.4)).toFixed(4)})`); };

  const stil = svg.getAttribute('style') || '';
  const tegna = await treRitare(svg, { golv: 940 }); await tegna.klar;
  const cv = tegna.R.domElement, dold = svg.getAttribute('style');
  const B = window.BITAR2, T0 = B[0].t0, T1 = window.DURATION - 2.4, rita = window.seek;
  const mjuk = k => (k = Math.min(1, Math.max(0, k)), k * k * (3 - 2 * k));
  const kamera = t => { const b = B.findLast(q => t >= q.t0); if (!b?.dolly) return {};
    const [a, c, mitt] = b.dolly; return { dolly: a + (c - a) * mjuk((t - b.t0) / b.d), ...(mitt != null && { mitt }) }; };
  window.seek = window.render = t => { rita(t); spegla(t); const tre = t >= T0 && t < T1;
    cv.style.display = tre ? 'block' : 'none'; svg.setAttribute('style', tre ? dold : stil);
    if (!tre) return;
    // luckan och kalendertavlan (utanför #kamera) syns inte medan scenen spelar men ligger kvar i SVG:n, delvis utanför sina inre <svg>-rutor
    // (som three-ritaren inte klipper): de göms bara medan bilden tecknas
    const ute = [...svg.children].filter(e => e.id !== 'kamera' && e.tagName !== 'defs').map(e => [e, e.getAttribute('display')]);
    ute.forEach(([e]) => e.setAttribute('display', 'none'));
    tegna(kamera(t));
    ute.forEach(([e, d]) => d == null ? e.removeAttribute('display') : e.setAttribute('display', d)); };
  window.seek(0);
  window.ready = true;
}
