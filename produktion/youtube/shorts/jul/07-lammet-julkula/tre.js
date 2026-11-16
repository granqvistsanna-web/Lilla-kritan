// Lucka 7 med three.js (Sanna 2026-11-16): själva WebGL-ritningen, djupet (tre: { z } i index.html) och dollyn (#kameras zoom, kam/kamTill)
// sköts av djur.js och verktyg/rigg-three.js. Här bara det som är lucka 7:s eget, efter att scenen byggts:
//  · <use> (skärvorna) byts mot kopior av det de pekar på, eftersom three-ritaren läser riktiga element
//  · spegeln (Sanna: "lammet speglar sig i kulan med reflektion"): lammets ansikte spegelvänt och rundat i silvret (spegel-lammet.png, tagen ur
//    riggen) i kulan (#sak-boll: kulans mitt i (0, 0), radie 70). spegel: [in, ut] på en bit = tonas in och ut (0,5 s), andas lite medan den syns
async function treJ07(svg) {
  window.ready = false;
  for (const u of [...svg.querySelectorAll('use')]) { if (u.closest('defs')) continue;
    let t = u; while (t?.tagName === 'use') t = svg.querySelector(t.getAttribute('href'));
    const c = t.cloneNode(true); c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
    if (u.getAttribute('transform')) { const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('transform', u.getAttribute('transform')); g.append(c); u.replaceWith(g); }
    else u.replaceWith(c); }
  const mapp = location.pathname.replace(/[^/]*$/, ''), R = 70;
  svg.querySelector('#sak-k1').insertAdjacentHTML('afterend', `<g id="spegel" opacity="0"><image href="${mapp}spegel-lammet.png" x="${-0.86 * R}" y="${-0.8 * R}" width="${1.72 * R}" height="${1.72 * R}"/></g>`);
  const SP = window.BITAR2.filter(b => b.spegel).map(b => [b.t0 + b.spegel[0], b.t0 + b.spegel[1]]), spegel = svg.querySelector('#spegel');
  const spegla = t => { const k = Math.max(0, ...SP.map(([a, c]) => Math.min(1, (t - a) / 0.5, (c - t) / 0.5)));
    spegel.setAttribute('opacity', k.toFixed(3)); spegel.setAttribute('transform', `scale(${(1 + 0.03 * Math.sin(t * 2.4)).toFixed(4)})`); };
  const rita = window.seek;
  window.seek = window.render = t => { spegla(t); rita(t); };
  // bilderna som lagts till efter att three-ritaren startade (silverkulan, julgransfoten, spegeln) laddas som texturer första gången de ritas:
  // rita en gång med allt synligt och vänta, så att de finns från första bildrutan i varje renderbit
  await Promise.all([...svg.querySelectorAll('#kamera image')].map(i => lucka.bild(i.getAttribute('href'))));
  spegel.setAttribute('opacity', 1); window.TRE?.(); await new Promise(r => setTimeout(r, 1500)); window.TRE?.();
  window.seek(0);
  window.ready = true;
}
