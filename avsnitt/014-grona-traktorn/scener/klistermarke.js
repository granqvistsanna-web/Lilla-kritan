// Klistermärken för saker på ord (som 005:s discot): en PNG som poppar upp i bild (växer med en liten översväng), glimtar en gång
// och gungar lugnt, och tonas ut eller flyttas tillbaka av scenen. Vanligt skript efter kit.js och verktyg/kant.js.
//   const k = klistermarke.ny(parent, src, bb, h)        bb = sakens bbox i bilden (px), h = höjden i bild
//   k.rita(t, { t0, x, y, ut, skala, rot })               t0 = när den poppar; ut = [a, b]: tonas ut mellan a och b; skala, rot extra
// Saker med inbakad vit kant (cut/) får grundkanten ovanpå (kant.lagg, andel 0), som de andra sakerna.
(() => {
const { el, bild, mjuk, del } = kit;
const pop = q => q <= 0 ? 0 : 1 - Math.exp(-7 * q) * Math.cos(16 * q);   // 0 → översväng → 1 (som kritan-ritar)
const stjarnaD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };

function ny(parent, src, bb, h) {
  const g = el('g', {}, parent), inre = el('g', {}, g), s = h / (bb[3] - bb[1]);
  bild(src, el('g', { transform: `scale(${s}) translate(${-(bb[0] + bb[2]) / 2} ${-(bb[1] + bb[3]) / 2})` }, inre));
  window.kant?.lagg(inre);
  const glimt = el('path', { d: stjarnaD(0.13 * h), fill: '#fff' }, g);
  const rita = (t, { t0, x, y, ut = [Infinity, Infinity], skala = 1, rot = 0 }) => {
    const q = t - t0;
    g.style.display = q >= 0 && t < ut[1] ? '' : 'none';
    if (q < 0 || t >= ut[1]) return;
    const lugn = mjuk(del(0.4, 0.9, q)), borta = mjuk(del(ut[0], ut[1], t));
    const dy = 5 * lugn * Math.sin(2 * Math.PI * q / 1.6), vick = 2.5 * lugn * Math.sin(2 * Math.PI * q / 2.1 + 0.7);
    g.setAttribute('transform', `translate(${x} ${y + dy}) rotate(${rot + vick}) scale(${skala * pop(q) * (1 - 0.3 * borta)})`);
    g.setAttribute('opacity', (1 - borta).toFixed(3));
    const gl = Math.sin(Math.PI * del(0.15, 0.7, q));   // en glimt strax efter poppen, i övre högra hörnet
    glimt.setAttribute('transform', `translate(${0.36 * h} ${-0.36 * h}) rotate(${25 * gl}) scale(${Math.max(0, gl)})`);
  };
  return { g, rita };
}

window.klistermarke = { ny };
})();
