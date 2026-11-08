// Ärtskidornas övergång mellan bondgården och discot (Sanna 2026-11-06: "pea pod becoming more and more and cover the screen
// as a transition to dance scene"). Ett undantag från formatets övergångar (zoom in, kritsvep, zoom ut), som Sanna har bett om.
// Rörelsen fortsätter det som händer i 14h (nya skidor poppar ut i valvet): skidorna blir fler och fler och större och större,
// först några få ut från valvet, sedan allt tätare (takten ökar), tills de täcker hela bilden (k = 0,5: skarven mellan scenerna).
// Varannan skida är öppen med tre glada ärtor. I discot poppar de bort igen, snabbare, inifrån och ut, så att dansarna i mitten
// syns först. Inga toningar: varje skida poppar med en liten översväng, som klistermärkena.
// Vanligt skript efter kit.js och verktyg/kant.js:
//   const ov = artovergang.ny()   (efter kit.duk; ritas överst, utanför kameran)
//   ov.rita(k)                    k 0 → 0,5 i den första scenen, 0,5 → 1 i den andra; utanför (0, 1) syns inget
//   artovergang.LJUD              k-värden (0–0,5) där en skida poppar upp, glesade för ljudet ('plupp')
(() => {
const { el, del, over, mjuk, lerp, W, H } = kit;
const SKAL = ['#4F9E3A', '#5BAE3F', '#46913A', '#62B548'], INNE = '#B5DC7E', ART = '#80C446', INK = '#302822';
const START = [W * 0.5, H * 0.18];   // valvets topp i 14h: härifrån sprider de sig
const IN = 0.42, POP = 0.05, UT = 0.36, UT_POP = 0.07;   // när den sista poppar upp (k), hur länge ett popp tar; samma åt andra hållet

// en slumpföljd som är likadan varje gång (bilderna renderas en och en)
const slump = s => () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const r = slump(14);
// platserna: ett skakat rutnät som täcker bilden med marginal, två lager förskjutna en halv ruta (inga glipor), sorterade efter
// avståndet från valvet; den i-te av N poppar vid IN · (i/N)^0,45 (fler och fler per sekund: en lång ramp, i bondgården 5,5 s från 2:47)
// och är större ju senare den kommer (de första små)
const PLATS = [];
for (const [ox, oy] of [[0, 0], [0.5, 0.5]]) for (let gy = -0.5; gy < 6.5; gy++) for (let gx = -0.5; gx < 9.5; gx++)
  PLATS.push({ x: (gx + ox + (r() - 0.5) * 0.6) * W / 9, y: (gy + oy + (r() - 0.5) * 0.6) * H / 6, rot: (r() - 0.5) * 70, oppen: r() < 0.5, f: Math.floor(r() * 4), fas: r() });
PLATS.forEach(p => { p.d = Math.hypot(p.x - START[0], (p.y - START[1]) * 1.2); p.dm = Math.hypot(p.x - W / 2, (p.y - H * 0.55) * 1.3); });
PLATS.sort((a, b) => a.d - b.d);
const N = PLATS.length;
PLATS.forEach((p, i) => { const u = i / (N - 1); p.in = IN * Math.pow(u, 0.45); p.L = lerp(120, 400, Math.pow(u, 0.7)); });
[...PLATS].sort((a, b) => a.dm - b.dm).forEach((p, i) => { p.ut = 0.5 + 0.03 + UT * Math.pow(i / (N - 1), 0.8); });
const LJUD = PLATS.filter((_, i) => i < 6 || i % 7 === 0).map(p => p.in);

function ny() {
  const svg = document.querySelector('svg'), defs = svg.querySelector('defs');
  // eget kritkantfilter (som kit:s kritkant) i skidans egen ruta (längd 2, mitt i 0), så att ändarna inte klipps
  defs.insertAdjacentHTML('beforeend', `<filter id="skidkant" filterUnits="objectBoundingBox" x="-0.1" y="-0.2" width="1.2" height="1.4">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter>`);
  const g = el('g', { style: 'display:none' }, svg);
  // grönt under högen bara kring skarven, när alla skidor redan ligger där: täpper till de sista små gliporna
  const botten = el('rect', { x: -20, y: -20, width: W + 40, height: H + 40, fill: SKAL[0] }, g), alla = el('g', {}, g);
  // en skida, längd 200 (−100 … 100): stängd (lins med söm och stjälk) eller öppen (ljus insida, tre ärtor med ansikten, främre kant)
  const skida = p => {
    const s = el('g', {}, alla), inre = el('g', {}, s), skal = SKAL[p.f];
    if (p.oppen) {
      el('path', { d: 'M-100 0Q-50 -58 0 -55Q50 -58 100 0Q50 34 0 34Q-50 34 -100 0Z', fill: INNE, filter: 'url(#skidkant)' }, inre);
      [-50, 0, 50].forEach((x, i) => {   // ärtorna: prickögon eller glada bågar, ett leende, vit glans
        const a = el('g', { transform: `translate(${x} -8)` }, inre);
        el('circle', { r: 22, fill: ART }, a);
        el('ellipse', { cx: -9, cy: -11, rx: 4, ry: 3.2, fill: '#fff', opacity: 0.7 }, a);
        for (const u of [-1, 1]) (i + p.f) % 2
          ? el('path', { d: `M${u * 7 - 4} -3Q${u * 7} -8 ${u * 7 + 4} -3`, fill: 'none', stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, a)
          : el('circle', { cx: u * 7, cy: -3, r: 2.6, fill: INK }, a);
        el('path', { d: 'M-7 4Q0 12 7 4', fill: 'none', stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, a);
      });
      el('path', { d: 'M-104 -3Q-50 16 0 15Q50 16 104 -3Q70 44 0 46Q-70 44 -104 -3Z', fill: skal, filter: 'url(#skidkant)' }, inre);
    } else {
      el('path', { d: 'M-100 0Q-50 -46 0 -44Q50 -46 100 0Q50 46 0 44Q-50 46 -100 0Z', fill: skal, filter: 'url(#skidkant)' }, inre);
      el('path', { d: 'M-80 -4Q0 -26 80 -4', fill: 'none', stroke: '#3C7F2C', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.6 }, inre);
      [-45, 0, 45].forEach(x => el('ellipse', { cx: x, cy: 4, rx: 20, ry: 16, fill: '#fff', opacity: 0.12 }, inre));   // ärtorna anas genom skalet
    }
    el('path', { d: 'M98 -2Q116 -8 118 -26Q119 -36 110 -38', fill: 'none', stroke: skal, 'stroke-width': 7, 'stroke-linecap': 'round' }, inre);
    return s;
  };
  const skidor = PLATS.map(p => ({ p, s: skida(p) }));
  window.kant?.lagg(alla, { andel: 0.004 });   // en vit klistermärkeskant runt högen (inte runt varje skida: lugnare)

  const rita = k => {
    g.style.display = k > 0 && k < 1 ? '' : 'none';
    if (k <= 0 || k >= 1) return;
    const takt = (kit.nu - kit.BEAT0) / kit.BEAT;
    // tonas in och ut (förr tändes den på en bild: ett grönt blink i gliporna, Sanna 2026-11-07)
    const bo = mjuk(del(IN - 0.06, IN + POP, k)) * (1 - mjuk(del(0.5, 0.56, k)));
    botten.style.display = bo > 0.01 ? '' : 'none'; botten.setAttribute('opacity', bo.toFixed(3));
    skidor.forEach(({ p, s }) => {
      // upp: popp med översväng; ner (i discot): sväller lite och krymper bort
      const q = k <= 0.5 ? over(del(p.in, p.in + POP, k)) : 1 - mjuk(del(p.ut, p.ut + UT_POP, k)) ** 1.6 + 0.12 * Math.sin(Math.PI * del(p.ut - 0.02, p.ut + UT_POP * 0.4, k));
      s.style.display = q > 0.01 ? '' : 'none';
      if (q <= 0.01) return;
      const gung = 4 * Math.sin(Math.PI * (takt + p.fas * 2));   // gungar lite i takt, var och en i sin fas
      s.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.rot + gung).toFixed(1)}) scale(${(p.L / 200 * q).toFixed(3)})`);
    });
  };
  return { g, rita };
}

window.artovergang = { ny, LJUD };
})();
