// YouTube-miniatyr för avsnitt 007, som 006:s: titeln i brun vaxkrita med vit kant till vänster, Bulle i den bruna lastbilen
// till höger med armarna upp och nallen på flaket, en kanelbulle och en kotte, vägens platta. Texten mäts i 1920×1080 och skalas
// till kit:s scen. window.REN = true ger samma bild utan text.
const BRUN = '#8B4E24';
const TITEL = [['Bruna', 470, 590, 230], ['sången', 470, 800, 200]];   // [text, mitt-x, baslinje, storlek]

async function bygg() {
  const { lager, el, bild, W, H, ROT } = kit;
  const M = await kit.manus();
  const L = kit.duk(kit.VAG_PLATTA);
  kit.vag(L.plate).rulla(0);
  const S = W / 1920, plan = g => el('g', { transform: `scale(${S})` }, g);
  const bil = await lastbilen.ny(L.figurer, M);
  bil.pose({ x: 0.715 * W, y: 0.95 * H, h: 0.68 * H, tilt: -2, humor: 'skrattar', m: 0.8, r: [1500, -700], l: [-480, -700], titt: 0.2,
    nalle: { humor: 'skrattar', m: 0.6 }, ror: 0 });
  // kanelbullen svävar uppe till höger, kotten ligger på vägen framför (båda med vit kant, verktyg/kant.js)
  const R = `${ROT}assets/rekvisita/`;
  const bulle = el('g', { transform: `translate(${0.9 * W} ${0.16 * H}) rotate(10) scale(0.2) translate(-512 -512)` }, lager.overst);
  bild(`${R}kanelbulle/cut/kanelbulle-v1.png`, bulle);
  const kotte = el('g', { transform: `translate(${0.08 * W} ${0.86 * H}) rotate(-18) scale(0.13) translate(-512 -512)` }, lager.overst);
  bild(`${R}kotte/cut/tunn/kotte-v1.png`, kotte);
  await new Promise(r => setTimeout(r, 1500));   // bilderna
  window.kant?.lagg(bulle); window.kant?.lagg(kotte);

  document.querySelector('defs').insertAdjacentHTML('beforeend', `
    <filter id="vax" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" result="korn"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="2" seed="8" result="strak"/>
      <feComposite in="korn" in2="strak" operator="arithmetic" k2="0.55" k3="0.45" result="mix"/>
      <feColorMatrix in="mix" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -7 0 0 0 4.5" result="tand"/>
      <feComposite in="SourceGraphic" in2="tand" operator="in" result="fyll"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="5" result="kant"/>
      <feDisplacementMap in="fyll" in2="kant" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`);

  if (!window.REN) {
    await document.fonts.load('600 100px Fredoka', 'Bruna sången');
    const topp = plan(lager.overst), text = el('g', { transform: 'rotate(-3 470 650)' }, topp);
    for (const [ord, x, yy, storlek] of TITEL) {
      const attr = { x, y: yy, 'text-anchor': 'middle', 'font-size': storlek, 'font-family': 'Fredoka', 'font-weight': 600 };
      el('text', { ...attr, fill: '#fff', stroke: '#fff', 'stroke-width': storlek * 0.16, 'stroke-linejoin': 'round' }, text).textContent = ord;
      el('text', { ...attr, fill: BRUN }, el('g', { filter: 'url(#vax)' }, text)).textContent = ord;
    }
    const lapp = el('g', { transform: 'rotate(-6 470 300)' }, topp);
    el('rect', { x: 250, y: 228, width: 440, height: 136, rx: 68, fill: '#fff' }, lapp);
    el('rect', { x: 262, y: 240, width: 416, height: 112, rx: 56, fill: '#f4d252', filter: 'url(#vax)' }, lapp);
    el('text', { x: 470, y: 326, 'text-anchor': 'middle', 'font-size': 84, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516' }, lapp).textContent = 'Barnsång';
    el('text', { x: 470, y: 930, 'text-anchor': 'middle', 'font-size': 76, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#fff', stroke: '#4f8a34', 'stroke-width': 10, 'paint-order': 'stroke', transform: 'rotate(-3 470 650)' }, topp).textContent = 'lilla kritan';
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
