// YouTube-miniatyr för avsnitt 006, i 005:s stil: titeln i orange vaxkrita med vit kant till vänster, Disa i den orange båten
// till höger med armarna upp, en apelsin och fisken som hoppar, sjöns himmel och vatten. Texten mäts i 005:s 1920×1080 och skalas
// till kit:s scen. window.REN = true ger samma bild utan text, window.EN = true engelsk text.
const ORANGE = '#f28a1e';
const TITEL = window.EN ? [['Orange', 470, 590, 220], ['Song', 470, 790, 200]] : [['Orangea', 470, 590, 220], ['sången', 470, 790, 200]];   // [text, mitt-x, baslinje, storlek]

async function bygg() {
  const { lager, el, bild, W, H } = kit;
  const L = kit.duk('avsnitt/006-orange-baten/scener/lager/sjon.png');
  const S = W / 1920, plan = g => el('g', { transform: `scale(${S})` }, g);
  baten.moln(L.plate).rita(0, 0);
  const bat = await baten.ny(L.figurer), vagor = baten.vagor(L.figurer, 0);
  const y = 0.97 * H;
  bat.pose({ x: 0.72 * W, y, h: 0.64 * H, tilt: -3, humor: 'skrattar', r: [1500, -700], l: [-480, -700], titt: 0.3 });
  vagor.rita(0.4, 0, y - 0.05 * H);
  // fisken hoppar framför fören, apelsinen svävar uppe till höger (båda med vit kant, verktyg/kant.js)
  const LAGER = `${kit.ROT}avsnitt/006-orange-baten/scener/lager/`;
  const fisk = el('g', { transform: `translate(${0.93 * W} ${0.6 * H}) rotate(-24) scale(-0.26 0.26) translate(-502 -507)` }, lager.overst);
  bild(`${LAGER}fisk.png`, fisk); ansikten.bygg(fisk, ansikten.FISK).satt('skrattar', { titt: 0.5 });
  const ap = el('g', { transform: `translate(${0.9 * W} ${0.17 * H}) rotate(10) scale(0.19) translate(-512 -515)` }, lager.overst);
  bild(`${LAGER}apelsin.png`, ap);
  await new Promise(r => setTimeout(r, 1500));   // bilderna
  window.kant?.lagg(fisk); window.kant?.lagg(ap);

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

  if (window.EN) await EN_BILD(lager, el);   // engelska: den sparade bilden utan text under texten (en/index.html)
  if (!window.REN) {
    await document.fonts.load('600 100px Fredoka', 'Orangea sången');
    const topp = plan(lager.overst), text = el('g', { transform: 'rotate(-3 470 650)' }, topp);
    for (const [ord, x, yy, storlek] of TITEL) {
      const attr = { x, y: yy, 'text-anchor': 'middle', 'font-size': storlek, 'font-family': 'Fredoka', 'font-weight': 600 };
      el('text', { ...attr, fill: '#fff', stroke: '#fff', 'stroke-width': storlek * 0.16, 'stroke-linejoin': 'round' }, text).textContent = ord;
      el('text', { ...attr, fill: ORANGE }, el('g', { filter: 'url(#vax)' }, text)).textContent = ord;
    }
    const lapp = el('g', { transform: 'rotate(-6 470 300)' }, topp);
    el('rect', { x: 250, y: 228, width: 440, height: 136, rx: 68, fill: '#fff' }, lapp);
    el('rect', { x: 262, y: 240, width: 416, height: 112, rx: 56, fill: '#f4d252', filter: 'url(#vax)' }, lapp);
    el('text', { x: 470, y: 326, 'text-anchor': 'middle', 'font-size': window.EN ? 72 : 84, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516' }, lapp).textContent = window.EN ? 'Kids Song' : 'Barnsång';
    el('text', { x: 470, y: 920, 'text-anchor': 'middle', 'font-size': 76, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#fff', stroke: '#3b8cc4', 'stroke-width': 10, 'paint-order': 'stroke', transform: 'rotate(-3 470 650)' }, topp).textContent = window.EN ? 'tiny crayon tv' : 'lilla kritan';
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
