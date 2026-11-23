// Kameran för three-rum: scenen skrivs som vyer, inte som nycklar. En vy = en plats, var kameran står i början och slutet,
// hur den rör sig inne i vyn och hur vyn kommer in. Idén kommer från stickman-kittet (devassistant-io/claude-stickman-shorts,
// MIT), anpassad till Lilla Kritan: bara lugna rörelser, ingen snabb åkning, och formatets egna övergångar
// (format/overgangar-och-maner.md).
//
//   import { kameraplan } from '/verktyg/kamera3d.mjs';
//   const plan = kameraplan({ cam, canvas: $('bild'), platser: { kanel: KANEL }, langd: 18, vyer: [
//     { t: 0,  mot: 'kanel', fran: [-20, 4.0, 0.85, -0.18, 0.55], till: [-6, 3.25, 0.74, -0.12, 0.5], in: 'zoomin' },
//     { t: 11, mot: 'kanel', fran: [10, 2.05, 0.66, 0.02, 0.56], till: [15, 1.85, 0.66, 0.02, 0.56], ut: 'zoomut' } ] });
//   async function seek(t) { await plan.rita(t, () => bildruta(t)); }   // bildruta(t): allt som beror på kameran + komp.render()
//   window.LJUD = [...egnaLjud, ...plan.ljud];
//
// Läge (fran, till): [vinkel° runt platsen, avstånd, höjd över platsen, titta x, titta y]. Vinkel 0 = rakt framifrån (längs +z).
// Kameran tittar på platsen + [titta x, titta y, 0]. Utan till står kameran på fran hela vyn. fov: valfritt per vy.
// rorelse (inne i vyn): glid (standard: startar och stannar mjukt), push (jämn), settle (kommer in och landar),
//   hold (stilla, högst 3 s: längre blir fryst bild i qa-film.sh).
// in (hur vyn kommer in, centrerad på vyns t): cut (standard), dissolve (0,5 s), kritsvep (1,6 s, farg = nästa plats väggfärg,
//   valfri mork = färgen på vaxdragen), moln (ett klipp här; molnen läggs på i sammansättningen, film/moln/, se format/regler.md;
//   tiderna står i plan.moln), zoomin (bara första vyn: 1,5 s från papperet, kameran glider in från 1,6 × avståndet).
// ut: 'zoomut' (bara sista vyn: sista 1,5 s glider kameran ut och papperet tonar in).
// plan.ljud: skrrrrt vid kritsvep, swoosh vid zoom. plan.stillbilder: första rutan efter varje övergång och mitten av varje vy,
//   för `node produktion/three-rum/render.mjs <scen> <tider…>`. Självtest: `node verktyg/kamera3d.mjs`.

const kl = (a, b, x) => Math.min(b, Math.max(a, x)), lerp = (a, b, k) => a + (b - a) * k;
const mjuk = k => (k = kl(0, 1, k), k * k * (3 - 2 * k));
const RORELSE = { glid: k => 0.5 - 0.5 * Math.cos(Math.PI * k), push: k => k, settle: k => 1 - (1 - k) ** 3, hold: () => 0 };
const LANGD = { cut: 0, moln: 0, dissolve: 0.5, kritsvep: 1.6, zoomin: 1.5, zoomut: 1.5 };
const LJUD = { kritsvep: ['skrrrrt-kort/skrrrrt-kort-1.m4a', 1], zoomin: ['swoosh/swoosh-1.m4a', 1.2], zoomut: ['swoosh/swoosh-2.m4a', 1.2] };
const PAPPER = '#F6EFE3', ZOOM = 1.6;

export function kameraplan({ cam, canvas, platser, vyer, langd }) {
  const slut = i => vyer[i + 1]?.t ?? langd, FOV = cam.fov;
  const fel = (i, s) => { throw new Error(`kamera3d, vy ${i + 1}: ${s}`); };
  vyer.forEach((v, i) => {
    if (!platser[v.mot]) fel(i, `okänd plats "${v.mot}"`);
    for (const l of [v.fran, v.till ?? v.fran]) if (l?.length !== 5) fel(i, 'fran/till ska vara [vinkel, avstånd, höjd, titta x, titta y]');
    if (!((v.rorelse ?? 'glid') in RORELSE)) fel(i, `okänd rörelse "${v.rorelse}"`);
    if (!((v.in ?? 'cut') in LANGD) || v.in === 'zoomut') fel(i, `okänd övergång in "${v.in}"`);
    if (v.in === 'zoomin' && i) fel(i, 'zoomin bara på första vyn');
    if (v.ut && (v.ut !== 'zoomut' || i < vyer.length - 1)) fel(i, 'ut: bara zoomut, och bara på sista vyn');
    if (i && v.t <= vyer[i - 1].t) fel(i, 'vyerna ska komma i tidsordning');
    if (v.in === 'kritsvep' && !v.farg) fel(i, 'kritsvep behöver farg (nästa plats väggfärg)');
    if (v.rorelse === 'hold' && slut(i) - v.t > 3) fel(i, 'hold längre än 3 s blir fryst bild');
  });

  function stall(i, t) {   // ställer kameran som vy i ser ut vid tiden t
    const v = vyer[i], e = RORELSE[v.rorelse ?? 'glid'](kl(0, 1, (t - v.t) / (slut(i) - v.t))), b = v.till ?? v.fran;
    let [vk, r, h, tx, ty] = v.fran.map((a, j) => lerp(a, b[j], e));
    if (v.in === 'zoomin') r *= lerp(ZOOM, 1, mjuk((t - v.t) / LANGD.zoomin));
    if (v.ut === 'zoomut') r *= lerp(1, ZOOM, mjuk((t - slut(i) + LANGD.zoomut) / LANGD.zoomut));
    const p = platser[v.mot], [x, y, z] = Array.isArray(p) ? p : [p.x, p.y, p.z], a = vk * Math.PI / 180;
    cam.position.set(x + r * Math.sin(a), y + h, z + r * Math.cos(a));
    cam.lookAt(x + tx, y + ty, z);
    if (cam.fov !== (v.fov ?? FOV)) { cam.fov = v.fov ?? FOV; cam.updateProjectionMatrix(); }
    cam.updateMatrixWorld();
  }

  // två lager ovanpå three.js-bilden: förra vyn (dissolve) och övergångarna i SVG (kritsvep, papperet)
  let forra, svg;
  if (typeof document !== 'undefined') {
    const css = 'position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;display:none';
    forra = document.createElement('canvas'); forra.width = canvas.width; forra.height = canvas.height; forra.style.cssText = css;
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1920 1080'); svg.setAttribute('preserveAspectRatio', 'none'); svg.style.cssText = css;
    document.body.append(forra, svg);
  }

  async function rita(t, ritaBild) {
    const i = Math.max(0, vyer.findLastIndex(v => v.t <= t)), v = vyer[i];
    const j = vyer.findIndex(w => w.in && LANGD[w.in] && Math.abs(t - w.t) < LANGD[w.in] / 2 && w.in !== 'zoomin');   // övergång pågår
    const k = j < 0 ? 0 : (t - vyer[j].t) / LANGD[vyer[j].in] + 0.5;
    forra.style.display = 'none'; let over = '';
    if (j > 0 && vyer[j].in === 'dissolve') {   // förra vyn ritas först, kopieras till lagret och tonas bort över nästa
      stall(j - 1, t); await ritaBild();
      forra.getContext('2d').drawImage(canvas, 0, 0, forra.width, forra.height);
      forra.style.display = 'block'; forra.style.opacity = (1 - mjuk(k)).toFixed(3);
    }
    if (j >= 0 && vyer[j].in === 'kritsvep') over = kritsvep(k, vyer[j].farg, vyer[j].mork ?? vyer[j].farg, t);
    const zi = i === 0 && v.in === 'zoomin' ? 1 - mjuk((t - v.t) / LANGD.zoomin) : 0;
    const zu = v.ut === 'zoomut' ? mjuk((t - slut(i) + LANGD.zoomut) / LANGD.zoomut) : 0;
    if (zi + zu > 0) over += `<rect width="1920" height="1080" fill="${PAPPER}" opacity="${(zi + zu).toFixed(3)}"/>`;
    svg.innerHTML = over; svg.style.display = over ? 'block' : 'none';
    stall(i, t); await ritaBild();
  }

  const stillbilder = vyer.flatMap((v, i) => {
    const land = v.t + (v.in === 'zoomin' ? LANGD.zoomin : LANGD[v.in ?? 'cut'] / 2) + 0.04;
    return [land, (land + slut(i) - (v.ut ? LANGD.zoomut : 0)) / 2];
  }).map(x => +x.toFixed(2));
  const ljud = vyer.flatMap((v, i) => [[v.in, v.in === 'zoomin' ? v.t : v.t - LANGD[v.in] / 2], [v.ut, slut(i) - LANGD.zoomut]])
    .filter(([n]) => LJUD[n]).map(([n, t]) => ({ t: +Math.max(0, t).toFixed(2), fil: 'assets/ljud/effekter/' + LJUD[n][0], vol: LJUD[n][1] }));
  const moln = vyer.filter(v => v.in === 'moln').map(v => v.t);
  return { rita, stall, stillbilder, ljud, moln };
}

// Kritsvepet ur 013 (rodsvep utan äpplet, format/overgangar-och-maner.md): breda vaxdrag i nästa plats färg med 006:s vaxkorn,
// trasiga kritkanter och kritan som sicksackar vid kanten. k 0→1 över 1,6 s, helt täckt 0,46–0,54 där klippet sker (k = 0,5).
function kritsvep(k, farg, mork, t) {
  if (k <= 0 || k >= 1) return '';
  const ut = k > 0.54, inne = k >= 0.46 && !ut, u = ut ? (k - 0.54) / 0.46 : Math.min(1, k / 0.46);
  const E = inne ? 2200 : lerp(-260, 2200, ut ? u * u : 1 - (1 - u) * (1 - u));
  const kant = []; for (let y = -120; y <= 1200; y += 40) kant.push(`${E + 30 * Math.sin(y * 0.013) + 14 * Math.sin(y * 0.07 + 1.3) + 6 * Math.sin(y * 0.31)} ${y}`);
  const yta = `M${ut ? 2400 : -400} -200 L${kant.join(' L')} L${ut ? 2400 : -400} 1300Z`;
  const drag = Array.from({ length: 11 }, (_, i) => { const x = i * 250 - 380 + 30 * Math.sin(i * 2.7), w = 46 + 20 * Math.abs(Math.sin(i * 1.9)),
    o = 0.22 + 0.12 * Math.abs(Math.sin(i * 3.1)), b = 24 * Math.sin(i * 1.3);
    return `<path d="M${x.toFixed(0)} -100 Q${(x + 160 + b).toFixed(0)} 540 ${(x + 320).toFixed(0)} 1180" stroke-width="${w.toFixed(0)}" opacity="${o.toFixed(2)}"/>`; }).join('');
  const S = 'userSpaceOnUse" x="-500" y="-500" width="2920" height="2080';
  let h = `<defs>
    <filter id="k3boil" filterUnits="${S}"><feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="${Math.floor(t * 6) % 50 + 1}"/>
      <feDisplacementMap in="SourceGraphic" scale="2.5"/></filter>
    <pattern id="k3korn" patternUnits="userSpaceOnUse" width="890" height="510" patternTransform="rotate(10) scale(1.45)"><image href="/verktyg/kritsvep-korn.png" width="890" height="510"/></pattern>
    <mask id="k3m" maskUnits="${S}"><rect x="-500" y="-500" width="2920" height="2080" fill="url(#k3korn)"/></mask>
    <filter id="k3rand" filterUnits="${S}"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="31"/>
      <feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter>
    <clipPath id="k3yta"><path d="${yta}"/></clipPath></defs>
  <g filter="url(#k3boil)"><g filter="url(#k3rand)"><g clip-path="url(#k3yta)">
    <rect x="-400" y="-200" width="2800" height="1500" fill="#FBF7EE"/><rect x="-400" y="-200" width="2800" height="1500" fill="${farg}" opacity="0.3"/>
    <rect x="-400" y="-200" width="2800" height="1500" fill="${farg}" mask="url(#k3m)"/>
    <g fill="none" stroke="${mork}" stroke-linecap="round" mask="url(#k3m)">${drag}</g></g>
    ${inne ? '' : `<path d="${yta}" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="70 9 26 7" opacity="0.6"/>`}</g></g>`;
  if (!ut && !inne) {   // kritan vid kanten, ett lugnt sicksack
    const y = 540 + 360 * Math.sin(u * Math.PI * 4), v = 28 + 8 * Math.cos(u * Math.PI * 4);
    h += `<g filter="url(#k3boil)" transform="translate(${E} ${y}) rotate(${v}) scale(2.8)">
      <path d="M-9 -2 Q0 4 9 -2 L19 -46 L19 -262 Q19 -270 11 -270 L-11 -270 Q-19 -270 -19 -262 L-19 -46 Z" fill="${farg}" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
      <path d="M-19 -78 Q0 -84 19 -78 L19 -232 Q0 -238 -19 -232 Z" fill="${mork}"/></g>`;
  }
  return h;
}

// Självtest: node verktyg/kamera3d.mjs
if (typeof process !== 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  const { strict: ok } = await import('node:assert');
  const cam = { fov: 30, position: { set(...a) { this.v = a; } }, lookAt() {}, updateMatrixWorld() {}, updateProjectionMatrix() {} };
  const vyer = [{ t: 0, mot: 'a', fran: [0, 4, 1, 0, 0.5], in: 'zoomin' },
    { t: 5, mot: 'a', fran: [90, 2, 1, 0, 0.5], till: [90, 1, 1, 0, 0.5], rorelse: 'push', in: 'kritsvep', farg: '#E8483B', ut: 'zoomut' }];
  const p = kameraplan({ cam, platser: { a: [0, 0, 0] }, langd: 10, vyer });
  p.stall(0, 0); ok.deepEqual(cam.position.v.map(x => +x.toFixed(3)), [0, 1, 6.4]);    // zoomin: börjar 1,6 × avståndet bort
  p.stall(0, 2); ok.deepEqual(cam.position.v.map(x => +x.toFixed(3)), [0, 1, 4]);
  p.stall(1, 6); ok.equal(+cam.position.v[0].toFixed(3), 1.8);                          // push: 2 → 1 över 5 s, 1 s in
  p.stall(1, 10); ok.equal(+cam.position.v[0].toFixed(3), 1.6);                         // zoomut: slutar 1,6 × 1 bort
  ok.deepEqual(p.ljud.map(l => l.t), [0, 4.2, 8.5]);
  ok.deepEqual(p.stillbilder, [1.54, 3.27, 5.84, 7.17]);
  ok.ok(kritsvep(0.3, '#f00', '#a00', 1).includes('k3yta') && kritsvep(1, '#f00', '#a00', 1) === '');
  for (const [v, s] of [[{ ...vyer[1], in: 'whip' }, 'okänd övergång'], [{ ...vyer[1], farg: undefined }, 'farg'],
    [{ ...vyer[1], t: 0 }, 'tidsordning'], [{ ...vyer[1], mot: 'b' }, 'okänd plats'], [{ ...vyer[1], rorelse: 'hold', ut: undefined }, 'fryst']])
    ok.throws(() => kameraplan({ cam, platser: { a: [0, 0, 0] }, langd: 10, vyer: [vyer[0], v] }), new RegExp(s));
  console.log('kamera3d: ok');
}
