// YouTube-miniatyr för avsnitt 004, i samma stil som 003:s: introts himmelsblå (003 fick den gula med väg, Sanna 2026-11-04), titeln i röd vaxkrita med vit kant till vänster,
// bussen till höger. Här står bussen med hjulen i vattnet med grodan och ankan i fönstren. window.REN = true ger samma bild utan text.
const ROD = '#df342f';
const TITEL = [['Vi ska', 470, 520, 200], ['bada!', 470, 730, 200]];   // [text, mitt-x, baslinje, storlek]

async function bygg() {
  const { lager, el } = kit;
  kit.duk('vagen');
  lager.plate.innerHTML = '<rect x="-100" y="-100" width="2120" height="1280" fill="#3ab4ea"/>';
  const buss = await kit.figur('bussen-tva-fonster');
  const gurra = await kit.figur('grodan-gurra'), agda = await kit.figur('ankan-agda');
  const gb = kit.iFonster(buss, gurra, 0), ab = kit.iFonster(buss, agda, 1);
  buss.pose({ x: 1370, y: 975, k: 1.3, tilt: -3, ogon: 'happy', mun: 0.5, delar: { 'del-1': 20, 'del-2': 20 } });
  gurra.pose({ ...gb, ogon: 'happy', mun: 0.6, titt: 1 });
  agda.pose({ ...ab, ogon: 'happy', mun: 0.6, titt: 1 });

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
  // vattnet framför hjulen: en vågig blå rand i vaxkrita med ett vitt krön som kritstreck
  const vag = (y, a) => { let d = `M-20 ${y}`; for (let x = -20; x < 1960; x += 120) d += ` q30 ${-a} 60 0 t60 0`; return d; };
  el('path', { d: vag(948, 18) + ' L1960 1100 L-20 1100 Z', fill: '#3a9be0' }, lager.overst);   // hel botten, så att det gula inte lyser igenom
  el('path', { d: vag(948, 18) + ' L1960 1100 L-20 1100 Z', fill: '#1f7fc8', filter: 'url(#vax)' }, lager.overst);
  el('path', { d: vag(1018, 12), fill: 'none', stroke: '#7fcdf4', 'stroke-width': 9, 'stroke-linecap': 'round', filter: 'url(#vax)' }, lager.overst);
  el('path', { d: vag(948, 18), fill: 'none', stroke: '#fff', 'stroke-width': 16, 'stroke-linecap': 'round', filter: 'url(#vax)' }, lager.overst);

  if (!window.REN) {
    await document.fonts.load('600 100px Fredoka', 'Vi ska bada!');
    const text = el('g', { transform: 'rotate(-3 470 625)' }, lager.overst);
    for (const [ord, x, y, storlek] of TITEL) {
      const attr = { x, y, 'text-anchor': 'middle', 'font-size': storlek, 'font-family': 'Fredoka', 'font-weight': 600 };
      el('text', { ...attr, fill: '#fff', stroke: '#fff', 'stroke-width': storlek * 0.16, 'stroke-linejoin': 'round' }, text).textContent = ord;
      el('text', { ...attr, fill: ROD }, el('g', { filter: 'url(#vax)' }, text)).textContent = ord;
    }
    const lapp = el('g', { transform: 'rotate(-6 470 300)' }, lager.overst);
    el('rect', { x: 250, y: 228, width: 440, height: 136, rx: 68, fill: '#fff' }, lapp);
    el('rect', { x: 262, y: 240, width: 416, height: 112, rx: 56, fill: '#f4d252', filter: 'url(#vax)' }, lapp);
    el('text', { x: 470, y: 326, 'text-anchor': 'middle', 'font-size': 84, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#2a2516' }, lapp).textContent = 'Barnsång';
    el('text', { x: 470, y: 880, 'text-anchor': 'middle', 'font-size': 76, 'font-family': 'Fredoka', 'font-weight': 600, fill: '#fff', transform: 'rotate(-3 470 625)' }, lager.overst).textContent = 'lilla kritan';
  }
  kit.kor(() => {}, 1 / 30);
}
bygg();
