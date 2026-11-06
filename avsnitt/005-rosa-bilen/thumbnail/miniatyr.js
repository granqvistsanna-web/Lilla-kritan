// YouTube-miniatyr för avsnitt 005, i samma stil som 004:s: introts himmelsblå, titeln i rosa vaxkrita med vit kant till vänster,
// den rosa bilen med musen Mille till höger i ett glatt skutt: glassberget i ena tassen, två hjärtan och två moln. Rent: inget mer. Måtten är 004:s 1920×1080 och skalas till kit:s scen. window.REN = true ger samma bild utan text, window.EN = true engelsk text.
const ROSA = '#ee4f9a';
const TITEL = window.EN ? [['Pink', 450, 590, 270], ['Song', 450, 800, 200]] : [['Rosa', 450, 590, 270], ['sången', 450, 800, 200]];   // [text, mitt-x, baslinje, storlek]

async function bygg() {
  const { lager, el, W } = kit;
  kit.duk(null);
  const S = W / 1920, plan = g => el('g', { transform: `scale(${S})` }, g);   // 004:s mått på den här scenen
  lager.plate.innerHTML = '<rect x="-100" y="-100" width="2120" height="1280" fill="#3ab4ea"/>';
  const bil = bilen.ny(lager.figurer, { kontur: true });
  // moln i vaxkrita bakom allt
  const moln = (x, y, k) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${k})`, filter: 'url(#kritkant)' }, plan(lager.plate));
    [[0, 0, 70], [70, -30, 85], [150, 0, 70], [75, 25, 75]].forEach(([cx, cy, r]) => el('circle', { cx, cy, r, fill: '#fff' }, g)); };
  moln(80, 110, 0.9); moln(1640, 90, 0.8);
  bil.pose({ x: 1400 * S, y: 990 * S, h: 840 * S, tilt: -4, humor: 'skrattar', m: 0.9, titt: 1, arm_r: 125, arm_l: 155,
    glass: { s: 'r', typ: 'berg' } });
  // hjärtan som stiger runt musen (refrängens form)
  const hj = 'M0 42 C -60 0 -62 -42 -32 -48 C -12 -52 0 -36 0 -26 C 0 -36 12 -52 32 -48 C 62 -42 60 0 0 42z';
  [[1000, 330, 0.75, -12], [1790, 360, 0.55, 10]].forEach(([x, y, k, r]) =>
    el('path', { d: hj, fill: '#F06EAA', stroke: '#fff', 'stroke-width': 9, transform: `translate(${x} ${y}) rotate(${r}) scale(${k})`, filter: 'url(#kritkant)' }, plan(lager.overst)));
  await new Promise(r => setTimeout(r, 1500));   // bilens och musens bilder

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
  // vägen under hjulen: en ljus rand i vaxkrita
  el('path', { d: 'M-20 985 q480 -14 980 0 t1000 -6 L1960 1100 L-20 1100 Z', fill: '#f4efe4' }, plan(lager.plate));
  el('path', { d: 'M-20 985 q480 -14 980 0 t1000 -6 L1960 1100 L-20 1100 Z', fill: '#e6ddcc', filter: 'url(#vax)' }, plan(lager.plate));

  if (window.EN) await EN_BILD(lager, el);   // engelska: den sparade bilden utan text under texten (en/index.html)
  if (!window.REN) {
    await document.fonts.load('600 100px Fredoka', 'Rosa sången');
    const topp = plan(lager.overst), text = el('g', { transform: 'rotate(-3 470 650)' }, topp);
    for (const [ord, x, y, storlek] of TITEL) {
      const attr = { x, y, 'text-anchor': 'middle', 'font-size': storlek, 'font-family': 'Fredoka', 'font-weight': 600 };
      el('text', { ...attr, fill: '#fff', stroke: '#fff', 'stroke-width': storlek * 0.16, 'stroke-linejoin': 'round' }, text).textContent = ord;
      el('text', { ...attr, fill: ROSA }, el('g', { filter: 'url(#vax)' }, text)).textContent = ord;
    }
    const lapp = el('g', { transform: 'rotate(-6 470 300)' }, topp);
    el('rect', { x: 250, y: 228, width: 440, height: 136, rx: 68, fill: '#fff' }, lapp);
    el('rect', { x: 262, y: 240, width: 416, height: 112, rx: 56, fill: '#f4d252', filter: 'url(#vax)' }, lapp);
    el('text', { x: 470, y: 326, 'text-anchor': 'middle', 'font-size': window.EN ? 72 : 84, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516' }, lapp).textContent = window.EN ? 'Kids Song' : 'Barnsång';
    el('text', { x: 470, y: 900, 'text-anchor': 'middle', 'font-size': 76, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#fff', transform: 'rotate(-3 470 650)' }, topp).textContent = window.EN ? 'tiny crayon tv' : 'lilla kritan';
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
