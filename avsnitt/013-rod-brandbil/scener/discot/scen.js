// Discot (013 Röda sången, storyboard 11a–12d, avsnittstid 1:38.3–2:10.5). Laddas efter ../film.js och skriver över
// ANIM-posterna för scenens bilder. Allt räknas i AVSNITTSTID (TID ur film.js), så rörelserna ligger på sångens slag.
// Kodens x = 1920 − skärmens x (#spegel).
//
// Uppställningen följer 005:s och 007:s discon (Sanna: "match closer"):
//   – rakt klipp in i discot (inget äppelsvep, Sanna); 11a gruppen på rad; 11b–11e SOLO, djuret ensamt stort mitt i bild med radens rörelsesymbol i övre högra hörnet;
//     11g gruppen igen och alla gör radens rörelse; 12a gruppen hoppar;
//   – 12b listan som 005:s sammanfattning: gruppen går ur bild, varje sak slås upp STOR mitt i bild på sitt ord och flyger
//     upp i bågen när nästa kommer; gruppen är tillbaka på "röda!"; 12c gruppen hoppar; 12d hej då med brandbilen.
//   – ljuset som 005:s discoljus.js i rött: en liten kula överst som snurrar (rutorna ritade i kod), mjuka käglor från
//     kulan, ljusfläckar som glider och byter ton var fjärde slag, en vit glimt på slaget, stjärnregn runt den som dansar.
//
// Takten ur sang.m4a (analys av basslagen): ett slag var 0,514 s, slag n ligger på avsnittstid 25,0 + 0,514·n.
// Varje rad i dansen är fyra slag med ett ord per slag (två sjungna + två i ekot): "Stampa (1), stampa (2)! (Stampa (3), stampa (4)!)".
// Listan: bussen 121,12 · ballongen 121,63 · chilin 122,15 · äpplet 122,67 · röda 123,18 · (röda) 124,21, ett ord per slag.

(() => {   // egen räckvidd: kitets och film.js namn (P, T, …) krockar annars
const P = 0.514, SLAG = n => 25.0 + P * n;
const RAD = k => SLAG(148 + 4 * k);                 // dansens rader: 0–3 varv 1 (stampa, vifta, hoppa, klappa), 4–7 varv 2
const ORD = [180, 187, 188, 189, 190].map(SLAG);    // klistermärkena: brandbilen (på första "Röd"), bussen, ballongen, chilin, äpplet
const RODA = [191, 193].map(SLAG);                  // "röda!" och ekot
const LISTA = [ORD[1] - 0.2, RODA[0] - 0.02];       // gruppen ur bild medan sakerna slås upp stora
const IIIOOO = [[SLAG(182) - 0.05, SLAG(183) - 0.05], [SLAG(185), SLAG(186) + 0.4], [SLAG(198), SLAG(199) + 0.4]];
const HEJ = [128.1, 128.31, 128.6, 128.82], TUT = [129.34, 129.86];
const SX = x => 1920 - x;
const k01 = v => Math.max(0, Math.min(1, v));

// --- defs ----------------------------------------------------------------------------------------------------
document.querySelector('svg defs').insertAdjacentHTML('beforeend', `
  <filter id="smakrita" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.08 0.3" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.55" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
  <filter id="kritkorn" filterUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="9" result="v"/>
    <feDisplacementMap in="SourceGraphic" in2="v" scale="5" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="3" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -6 2.3" result="p"/>
    <feComposite in="p" in2="d" operator="in" result="pk"/>
    <feMerge><feMergeNode in="d"/><feMergeNode in="pk"/></feMerge>
  </filter>
  <filter id="ikonkant" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter>
  <filter id="markskugga" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="dekalskugga" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="ljusoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="kaglaoskarpa" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="9"/></filter>
  <linearGradient id="kagla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF2EE" stop-opacity="0.5"/><stop offset="1" stop-color="#FFF2EE" stop-opacity="0"/></linearGradient>
  <radialGradient id="kulskugga" cx="0.42" cy="0.38" r="0.62"><stop offset="0.55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#5a1218" stop-opacity="0.4"/></radialGradient>
  <clipPath id="kulklipp"><circle cx="960" cy="128" r="76"/></clipPath>
  <radialGradient id="vinjett" cx="50%" cy="48%" r="75%"><stop offset="0.55" stop-color="#3a0d10" stop-opacity="0"/><stop offset="1" stop-color="#3a0d10" stop-opacity="1"/></radialGradient>`);
$('kamera').insertAdjacentHTML('beforeend', '<g id="fram"></g>');   // förgrunden, skärmens koordinater
const fram = h => $('fram').insertAdjacentHTML('beforeend', h);

// --- små klistermärken: gnista, hjärta, stjärnregn ---------------------------------------------------------------
const stjarna = (r, x = 0, y = 0) => `M${x} ${y - r} Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y} Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r} Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y} Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z`;
const gnista = (x, y, r, rot = 0) => r > 0.5 && fram(`<g stroke-linejoin="round" transform="rotate(${rot.toFixed(1)} ${x} ${y})">
  <path d="${stjarna(r, x, y)}" fill="#fff" stroke="#fff" stroke-width="${(3 + 0.16 * r).toFixed(1)}"/>
  <path d="${stjarna(r, x, y)}" fill="#F2C94C"/><path d="${stjarna(r, x, y)}" fill="#F7DA74" filter="url(#smakrita)"/>
  <path d="${stjarna(r * 0.5, x, y)}" fill="#FFF7D6" filter="url(#smakrita)"/></g>`);
const HJ_D = 'M0 33 L-28.8 0 A15 15 0 0 1 0 -10.5 A15 15 0 0 1 28.8 0 Z';
const hjarta = (x, y, s, rot = 0) => s > 0.02 && fram(`<g transform="translate(${x} ${y}) rotate(${rot.toFixed(1)}) scale(${(s * 1.3).toFixed(3)})" stroke-linejoin="round">
  <path d="${HJ_D}" fill="#fff" stroke="#fff" stroke-width="9"/><path d="${HJ_D}" fill="#EC7896"/>
  <path d="${HJ_D}" fill="#C9506F" opacity="0.5" filter="url(#smakrita)" transform="translate(0 5)"/>
  <ellipse cx="-12" cy="-2" rx="5" ry="3.4" fill="#FFE3EA" opacity="0.85" transform="rotate(-35 -12 -2)"/></g>`);
const poppa = (q, L = 0.45) => q < 0 || q > L ? 0 : q < 0.08 ? 1.15 * q / 0.08 : q < 0.16 ? 1.15 - 0.15 * (q - 0.08) / 0.08 : 1 - ease((q - L + 0.12) / 0.12);
const stjD = r => { const k = r * 0.28; return `M0 ${-r}L${k} ${-k}L${r} 0L${k} ${k}L0 ${r}L${-k} ${k}L${-r} 0L${-k} ${-k}Z`; };
// stjärnregnet (005): små vita stjärnor runt den som dansar, som tänds och släcks en i taget
function stjarnregn(xs, ymitt, rx, ry, t) {
  let h = '';
  for (let i = 0; i < 9; i++) {
    const v = i / 9 * 2 * Math.PI + 0.4, g = Math.max(0, Math.sin(2 * Math.PI * (t / 1.8 + i * 0.37))) ** 2;
    if (g < 0.03) continue;
    const x = xs + rx * Math.cos(v), y = ymitt + ry * Math.sin(v) - 30 * Math.sin(v * 2 + t);
    h += `<path d="${stjD(9 + (i % 3) * 4)}" fill="#fff" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(25 * g).toFixed(1)}) scale(${g.toFixed(3)})"/>`;
  }
  fram(`<g filter="url(#kritkorn)">${h}</g>`);
}

// --- tidshjälpare -------------------------------------------------------------------------------------------
const senast = (lista, t) => { let b = -Infinity; for (const x of lista) if (x <= t) b = x; return b; };
const studsSlag = q => q < 0 ? 0 : Math.exp(-q * 11) * Math.cos(q * 30);   // landningens tryck och efterdallring
const iFonster = (f, t) => f.some(([a, b]) => t >= a && t < b);

// --- ljuset (005:s discoljus.js i rött, ritat i #platta) ----------------------------------------------------------
const KULA = [960, 128, 76], VARV = 9;
const FASETT = ['#E0505A', '#C23440', '#F29090', '#D8666E'], FASETT_N = 16, FASETT_RADER = 8;
const FARG = ['#FFF4F0', '#FFC8C0', '#FFE2C4', '#FFD6D0', '#FFE6F0', '#FFF0D2'];
const FLACK = [[460, 900, 210, 66, 360, 40, 13, 0], [1250, 980, 240, 76, 420, 36, 16, 2.1], [890, 840, 180, 56, 530, 25, 11, 4.0],
  [350, 420, 98, 98, 220, 120, 14, 1.0], [1560, 360, 90, 90, 240, 140, 12, 3.2], [980, 280, 106, 106, 460, 56, 17, 5.1]];
const KAGLA = [-58, -22, 22, 58];
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const blanda2 = (a, b, k) => 'rgb(' + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * k)).join(',') + ')';
function ljus(t) {
  const [cx, cy, R] = KULA, k = t - 98.3, vrid = -k * 2 * Math.PI / VARV;
  const takt = (t - 25.0) / P / 4, n = Math.floor(takt), over = Math.min(1, (takt - n) * 4 * P / 0.6);
  // fläckarna bakom figurerna, byter ton var fjärde slag (0,6 s övergång)
  const m = j => FARG[((j % FARG.length) + FARG.length) % FARG.length];
  const flackar = FLACK.map(([x, y, rx, ry, ax, ay, p, f], i) => { const v = 2 * Math.PI * k / p + f;
    return `<ellipse cx="${(x + ax * Math.sin(v)).toFixed(1)}" cy="${(y + ay * Math.sin(2 * v + 1)).toFixed(1)}" rx="${rx}" ry="${ry}" fill="${blanda2(m(n - 1 + i), m(n + i), over)}"/>`; }).join('');
  const kaglor = KAGLA.map((a, i) => `<path d="M-16 0L16 0L230 1150L-230 1150Z" fill="url(#kagla)" transform="translate(${cx} ${cy}) rotate(${(a + 10 * Math.sin(2 * Math.PI * k / 14 + i * 1.7)).toFixed(2)})"/>`).join('');
  // kulans rutor: 16 longituder × 8 rader på framsidan, snurrar ett varv på 9 s
  const d = FASETT.map(() => ''), lat = j => -Math.PI / 2 + Math.PI * j / FASETT_RADER;
  const pt = (lo, la) => `${(cx + R * Math.cos(la) * Math.sin(lo)).toFixed(1)} ${(cy + R * Math.sin(la)).toFixed(1)}`;
  let nat = '';
  for (let i = 0; i < FASETT_N; i++) {
    let a = vrid + i * 2 * Math.PI / FASETT_N; a = Math.atan2(Math.sin(a), Math.cos(a)); const b = a + 2 * Math.PI / FASETT_N;
    const a2 = Math.max(a, -Math.PI / 2), b2 = Math.min(b, Math.PI / 2);
    if (Math.abs(a) < Math.PI / 2) nat += 'M' + Array.from({ length: 13 }, (_, q) => pt(a, -Math.PI / 2 + Math.PI * q / 12)).join('L');
    if (b2 <= a2) continue;
    for (let j = 0; j < FASETT_RADER; j++) d[(i * 7 + j * 3 + (i * j) % 5) % FASETT.length] += `M${pt(a2, lat(j))}L${pt(b2, lat(j))}L${pt(b2, lat(j + 1))}L${pt(a2, lat(j + 1))}Z`;
  }
  for (let j = 1; j < FASETT_RADER; j++) { const la = lat(j), w = R * Math.cos(la), y = cy + R * Math.sin(la); nat += `M${cx - w} ${y}L${cx + w} ${y}`; }
  const glimtar = [[-0.35, 13, 0], [0.3, 10, 2.1], [0.05, 9, 4.0], [-0.6, 7, 1.2], [0.6, 7, 3.3], [-0.1, 8, 5.2]].map(([la, r, f0]) => {
    const v = vrid + f0, c = Math.cos(v); if (c <= 0) return '';
    return `<path d="${stjD(r)}" fill="#fff" transform="translate(${(cx + (R - 4) * Math.sin(v) * Math.sqrt(1 - la * la)).toFixed(1)} ${(cy + (R - 4) * la).toFixed(1)}) scale(${(0.4 + 0.6 * c).toFixed(2)})"/>`; }).join('');
  const qb = (t - 25.0) % P, slagGlimt = Math.max(0, 1 - qb / 0.3);   // en vit glimt på kulan på varje slag
  const glitter = [[-1.3, 0.35, 12], [1.35, -0.2, 10], [1.0, 0.95, 9]].map(([dx, dy, r], i) => { const g = Math.max(0, Math.sin(2 * Math.PI * (k / 3.6 + i / 3)));
    return g < 0.03 ? '' : `<path d="${stjD(r)}" fill="#fff" transform="translate(${cx + dx * R} ${cy + dy * R}) rotate(${20 * g}) scale(${g.toFixed(3)})"/>`; }).join('');
  $('platta').innerHTML = `<image href="${DISCO}" width="1920" height="1080"/>
    <g opacity="0.33" filter="url(#ljusoskarpa)">${flackar}</g>
    <g opacity="0.9" filter="url(#kaglaoskarpa)">${kaglor}</g>
    <path d="M${cx} -10V${cy - R}" stroke="#F4E6E0" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#fff" filter="url(#kritkorn)"/>
    <g clip-path="url(#kulklipp)"><g filter="url(#kritkorn)">${d.map((p, i) => `<path d="${p}" fill="${FASETT[i]}"/>`).join('')}
      <path d="${nat}" fill="none" stroke="#9C2630" stroke-width="2" stroke-linejoin="round"/></g>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#kulskugga)"/><g filter="url(#kritkorn)">${glimtar}</g></g>
    <g filter="url(#kritkorn)">${glitter}<path d="${stjD(22)}" fill="#fff" opacity="${(0.95 * slagGlimt).toFixed(2)}" transform="translate(${cx - 32} ${cy - 36}) scale(${(0.5 + 0.6 * slagGlimt).toFixed(2)})"/></g>`;
}

// --- dansarna: de riktiga riggarna (lk-figur) -----------------------------------------------------------------
// Varje djurs motor (rigg, rita, uttryck) läses ur dess premium/uttryck.html och körs i en egen räckvidd, så att namnen
// inte krockar med kanin-motorn. Figurerna ligger i #dansare (bakom bilen, med kitets boil). Skala 0,5 överallt = samma
// 5 px vita kant som resten av scenen; solot zoomas med kameran, inte med skalan. Figuren ritas med scale(−s s) så att
// #spegel tar ut sig: ingen vänds eller speglas. Allt räknas ur tiden t, inget tillstånd mellan bilderna.
const GOLVY = 985, S = 0.6, HOJD = 492;              // tre djur, 20 % större än förut (Sanna); HOJD ≈ figurens höjd på skärmen
const DJUR = [null, ['lammet-ludde', 'ludde'], ['grodan-gurra', 'gurra'], ['musen-mille', 'mille']];   // björnen är borta (Sanna): tre dansare + Fia
const DANS = [{ x: -999 }, { x: 420 }, { x: 960 }, { x: 1500 }];   // kodens x: lammet till höger i bild, grodan i mitten, musen till vänster
const BJORN = 0, LAMM = 1, GRODA = 2, MUSEN = 3;
const ROR = ['stampa', 'vifta', 'hoppa', 'klappa'];   // radernas rörelser (symbolen i hörnet)
const SOLO_Z = 1.3, SOLO_CY = 631;                    // solot: kamerazoom 1,3, fötterna nära bildens underkant, grodans hopp ryms
$('bakom').insertAdjacentHTML('afterend', '<g id="dansare" filter="url(#boil)"></g>');
const MOTOR = [];
const laddat = (async () => {
  const kod = await Promise.all(DJUR.map(async d => { if (!d) return null; const [mapp] = d;
    const bas = ASSETS + 'karaktarer/' + mapp + '/premium/', html = await (await fetch(bas + 'uttryck.html')).text();
    return html.slice(html.indexOf('const RIGG = {'), html.indexOf('Object.assign(window, {'))
      .replaceAll('href="cut/', 'href="' + bas + 'cut/').replaceAll("'#figurer > g'", "'#dansare > g'")
      .replaceAll("getElementById('figurer')", "getElementById('dansare')").replaceAll('lock-${', 'dlock-${');
  }));
  kod.forEach((k, i) => { if (!k) return;   // i tur och ordning, så att figurernas id (klipp för ögonlocken) blir 0–3
    const m = new Function('mjuk', k + '\nreturn { figur, rita, blanda, POSE0, NEUTRAL, FOTTER };')(mjuk);
    m.fig = m.figur(0, 0, S); m.fig.setAttribute('opacity', 0); MOTOR[i] = m;
  });
})();

// --- koreografin ------------------------------------------------------------------------------------------------
// Slag n ligger på SLAG(n). Raderna: stampa 148–151 (björnens solo) och 164–167, vifta 152–155 (lammet) och 168–171,
// hoppa 156–159 (grodan) och 172–175, klappa 160–163 (musen) och 176–179. Hopp också på "Danspaus!" och i refrängen.
const fas = t => (t - 25.0) / P;
const iRad = (n, a) => (n >= a && n < a + 4) || (n >= a + 16 && n < a + 20);
const stampPa = n => iRad(n, 148), viftPa = n => iRad(n, 152);
const RODA_N = [191, 193];
function hoppH(i, n) {          // hopphöjden (figurens px) på slag n, 0 = inget hopp
  if (n >= 143 && n <= 146) return 60;
  if (n >= 156 && n <= 159) return 300;                                     // grodans solo: stora hopp
  if (n >= 172 && n <= 175) return [150, 170, 300, 170][i];
  if (n >= 181 && n <= 186) return [80, 100, 150, 100][i];
  if (RODA_N.includes(n)) return [220, 240, 330, 240][i];                   // "röda!"
  if (n >= 192 && n <= 199) return [70, 90, 140, 90][i];
  return 0;
}
const HURRA = [105, 70, 70, 70];                      // varje djurs hurra-armar (POSER.hurra)
// klappen ur varje djurs ROR.klappa (c = 0: tassarna möts): björnen och musen möts mitt på bröstet, lammet och grodan
// har korta armar och klappar på magens kanter (lk-figur)
const KLAPP = [c => [-135 + 20 * c, 170 - 45 * c, 0], c => [-95 + 26 * c, 40 - 16 * c, 0], c => [-95 + 26 * c, 40 - 16 * c, 0], c => [-120 + 34 * c, 178 - 120 * c, -50]];
const TRE = [0, 0.28, 0.56];                          // tass-klapp-tre: tre klapp på slag 179 (ljudet flyttat så att de landar här)
function klappLage(t) {         // [in 0–1, c 0–1] för klapp-raderna
  const s = SLAG;
  if (t >= s(160) && t < s(163)) return [1 - mjuk(k01((t - s(162) - P / 2) / (P / 2 - 0.03))), Math.abs(Math.sin(Math.PI * fas(t)))];
  if (t >= s(175) + 0.2 && t < s(179) + 0.95) {
    const in_ = mjuk(k01((t - s(175) - 0.2) / 0.3)) * (1 - mjuk(k01((t - s(179) - 0.62) / 0.33))), q = t - s(179);
    return [in_, q < 0 ? Math.abs(Math.sin(Math.PI * fas(t))) : q < 0.56 ? Math.abs(Math.sin(Math.PI * q / 0.28)) : mjuk(k01((q - 0.56) / 0.12))];
  }
  return [0, 1];
}
const KONTAKT = [160, 161, 162].map(SLAG).map(t => [t, true]).concat([176, 177, 178].map(SLAG).map(t => [t, false]), TRE.map(d => [SLAG(179) + d, false]));
const mixa = (a, b, k) => a + (b - a) * k;

// kroppen för djur i vid tiden t (utan öron och svans, de räknas ur rörelsen efteråt)
function kropp(i, t) {
  const B = { lyft: 0, luta: 0, x: 0, strack: 0, bred: 0, armar: [10, 10], fram: [0, 0], klapp: 0, armY: 0, ben: [0, 0], benY: [0, 0], acc: 0.15, tryck: 0, svans: 0 };
  const p = fas(t), n = Math.floor(p), q = t - SLAG(n), u = q / P;
  let fri = true;
  // stampa: foten för nästa slag lyfts under andra halvan av slaget och stampar ner på slaget; björnen gungar och vickar på magen
  if (stampPa(n) || stampPa(n + 1)) {
    fri = false;
    const a = n < 152 ? 1.3 : 0.9, sida = (n + 1) % 2, L = stampPa(n + 1) && u > 0.45 ? Math.sin(Math.PI / 2 * (u - 0.45) / 0.55) : 0;
    const imp = stampPa(n) ? studsSlag(q) : 0, efter = stampPa(n) ? Math.exp(-q * 9) : 0;
    B.benY[sida] -= 75 * a * L; B.ben[sida] += 8 * a * L; B.lyft -= 16 * a * L;
    B.luta += (sida ? 1 : -1) * 5 * a * L + (n % 2 ? 1 : -1) * 3 * a * efter;
    B.strack -= 0.09 * a * imp; B.bred += 0.08 * a * imp; B.tryck = Math.max(0, imp);
    B.armar[sida ? 0 : 1] += 34 * L * a; B.armar[sida] += 10 * L;
    B.acc = Math.max(B.acc, 0.25 + 0.75 * efter);
    if (i === BJORN) { B.luta += 4 * Math.sin(Math.PI * p); B.bred += 0.035 * Math.sin(4 * Math.PI * p); B.x += 22 * Math.sin(Math.PI * p); }   // gungar och vickar på magen
  }
  // vifta: armarna upp och vinkar, kroppen gungar med ytterläget på slaget och små skutt emellan (lammets öron flaxar)
  if (viftPa(n)) {
    fri = false;
    const a = n < 156 ? 1.25 : 0.9, r0 = n < 156 ? 152 : 168, env = mjuk(k01((t - SLAG(r0)) / 0.25)) * mjuk(k01((SLAG(r0 + 4) - t) / 0.25));
    const c = Math.cos(Math.PI * p), v = Math.sin(4 * Math.PI * p);
    B.luta += 7 * a * c * env; B.x += 40 * a * c * env;
    B.lyft -= (i === LAMM ? 95 : 60) * a * Math.sin(Math.PI * u) * env;
    B.armar = [mixa(10, 72 + 18 * c + 8 * v, env), mixa(10, 72 - 18 * c - 8 * v, env)];
    const imp = studsSlag(q) * env; B.strack -= 0.06 * imp; B.bred += 0.05 * imp; B.tryck = Math.max(0, imp);
    B.acc = Math.max(B.acc, (0.4 + 0.6 * Math.exp(-q * 5)) * env);
  }
  // hoppa: huk före, luften 0,4 s (sträckt, armarna ut, grodans ben isär), landning med tryck; grodan hoppar åt sidorna
  const H = hoppH(i, n), Hn = hoppH(i, n + 1), D = 0.4;
  if (H || Hn) {
    fri = false;
    let press = 0;
    if (H && q < D) {
      const k = q / D, s = Math.sin(Math.PI * k), sc = Math.min(1, H / 250);
      const arm = n === 175 ? 0 : (iFonster(IIIOOO, t) || RODA_N.includes(n) ? 0 : (i === GRODA ? 40 : 30));
      B.lyft -= 4 * H * k * (1 - k); B.strack += 0.07 * sc * Math.abs(1 - 2 * k); B.bred -= 0.05 * sc * Math.abs(1 - 2 * k);
      B.armar = B.armar.map(v => v + arm * s); B.benY = B.benY.map(v => v - 34 * s); B.ben = B.ben.map(v => v + (i === GRODA ? 24 : 6) * s);
      B.acc = Math.max(B.acc, 0.55 + 0.45 * s);
    } else if (H) {              // landat: trycket från landningen går över i huken före nästa hopp
      const g = (q - D) / (P - D);
      press = (Hn ? Math.sin(Math.PI * g) : studsSlag(q - D)) * Math.min(1, 0.5 + H / 400);
      B.acc = Math.max(B.acc, Math.exp(-(q - D) * 5));
    } else if (q > P - 0.15) press = 0.7 * Math.sin(Math.PI * (q - P + 0.15) / 0.15);   // huk före första hoppet
    B.strack -= 0.12 * press; B.bred += 0.1 * press; B.armar = B.armar.map(v => v - 12 * Math.max(0, press)); B.tryck = Math.max(B.tryck, press);
    if (i === GRODA && n >= 156 && n <= 159) {        // grodans solo: åt sidan och tillbaka, ett hopp i taget
      const xe = m => (m % 2 ? 1 : -1) * 70, k = H && q < D ? mjuk(q / D) : 1;
      B.x += mixa(xe(n - 1), xe(n), k);
    }
  }
  // klappa: tassarna fram och ihop exakt på slaget (och på tass-klapp-trens tre klapp)
  const [in_, c] = klappLage(t);
  if (in_ > 0) {
    fri = false;
    const [a, k, y] = KLAPP[i](c), smack = in_ * (1 - c) ** 4;
    B.fram = [in_, in_]; B.armar = B.armar.map(v => mixa(v, a, in_)); B.klapp = in_ * k; B.armY = in_ * y;
    B.strack -= 0.03 * smack; B.bred += 0.025 * smack; B.lyft -= 10 * in_ * Math.abs(Math.sin(Math.PI * p));
    B.acc = Math.max(B.acc, 0.3 + 0.7 * smack);
  }
  // musens solo slutar (slag 163): armarna snurrar runt, svansen virvlar, ett litet skutt på pipet
  if (i === MUSEN && n === 163) {
    fri = false;
    const w = 2 * Math.PI * 2 * u, e = mjuk(k01(u / 0.15)) * mjuk(k01((1 - u) / 0.2));
    B.armar = [mixa(10, 50 + 55 * Math.sin(w), e), mixa(10, 50 + 55 * Math.sin(w + Math.PI), e)];
    B.svans = 70 * Math.sin(2 * Math.PI * 3 * u) * e; B.lyft -= 80 * Math.sin(Math.PI * u); B.acc = 1;
  }
  // "iii-ooo" och "röda!": armarna upp (hurra)
  const hurra = Math.max(...IIIOOO.map(([a, b]) => mjuk(k01((t - a + 0.12) / 0.12)) * mjuk(k01((b - t) / 0.15))),
    ...RODA.map(r => mjuk(k01((t - r + 0.15) / 0.12)) * mjuk(k01((r + 0.5 - t) / 0.15))));
  if (hurra > 0) { B.armar = B.armar.map(v => mixa(v, HURRA[i], hurra)); B.acc = Math.max(B.acc, hurra); }
  // annars ett lugnt gung i takten (noll på slaget, så att det går ihop med rörelserna)
  if (fri) { B.lyft -= 12 * Math.abs(Math.sin(Math.PI * p)); B.luta += 3 * Math.sin(Math.PI * p); B.armar = B.armar.map((v, j) => v + (j ? -8 : 8) * Math.sin(Math.PI * p)); }
  return B;
}

// öronen och svansen släpar efter kroppen: de räknas ur hastigheten en stund bakåt, och trycket vid landningen fäller dem
function stallning(i, t, kr = kropp) {
  const m = MOTOR[i], B = kr(i, t), B1 = kr(i, t - 0.04), B2 = kr(i, t - 0.09), Bl = kr(i, t - 0.12);
  const v = (B1.lyft - B2.lyft) / 0.05, flax = i === LAMM ? 1.6 : 1;
  const ora = k01((-0.008 * v + 24) / 48) * 48 - 24 + 16 * B.tryck, sv = 1.6 * (Bl.luta - B.luta);
  const oron = [flax * (ora - sv), flax * (ora + sv)];
  const svans = B.svans || 3 * Math.sin(t * 3) - 2.2 * Bl.luta - 0.012 * v;
  const f = { ...m.blanda('glad', 'jatteglad', B.acc), armar: m.NEUTRAL.armar, luta: 0 };
  if (B.acc < 0.6 && (t + i * 0.77) % 3.1 < 0.12) f.lock = [1, 1];            // blinkar, var och en i sin takt
  const pz = { ...m.POSE0, lyft: B.lyft, luta: B.luta, x: B.x, strack: B.strack, bred: B.bred, armar: B.armar, fram: B.fram,
    klapp: B.klapp, ben: B.ben, benY: B.benY, oron, svans };
  if ('armY' in m.POSE0) pz.armY = B.armY;
  return { f, p: pz };
}

// ritar djur i med fötterna i (x, GOLVY) i koden; st = null döljer det. Egen röd kontaktskugga, motorns svarta göms.
function ritaDjur(i, x, st, s = S) {
  const m = MOTOR[i]; if (!m) return;
  if (!st) { m.fig.setAttribute('opacity', 0); return; }
  m.fig.setAttribute('opacity', 1);
  m.fig.setAttribute('transform', `translate(${x.toFixed(1)} ${GOLVY}) scale(${-s} ${s}) translate(-512 ${-m.FOTTER})`);
  m.rita(m.fig, st.f, st.p);
  m.fig.querySelector('.skugga').setAttribute('opacity', 0);
  const xs = x - st.p.x * s, k = 1 - 0.5 * k01(-st.p.lyft / 400), rx = 290 * s * k * (1 + st.p.bred);
  lagg('bakom', `<ellipse cx="${(xs - 9 * k).toFixed(1)}" cy="${GOLVY + 4}" rx="${rx.toFixed(1)}" ry="${(rx * 0.14).toFixed(1)}" fill="#4a0f14" opacity="${(0.3 * k).toFixed(3)}" filter="url(#markskugga)"/>`);
}
const skarmX = (i, x, st, s = S) => SX(x - st.p.x * s);   // var djuret står på skärmen

// vilken bild som syns: 'grupp', 'solo' (k = vem) eller 'lista'
function bild(t) {
  for (let k = 1; k < 4; k++) if (t >= RAD(k) && t < RAD(k + 1)) return { typ: 'solo', vem: k };
  if (t >= LISTA[0] && t < LISTA[1]) return { typ: 'lista' };
  return { typ: 'grupp' };
}

// --- Fia, den lilla fjärilen (som i introt: kropp + vingar, ögon och mun i kod) -------------------------------------
// Ritas i skärmens koordinater (i #kamera, efter #spegel), så hon vänds aldrig. En tredjedel av en dansares höjd.
// Vingarna slår i takt (helt öppna på slaget), hon guppar lite, flyger varv runt discokulan, fladdrar kring den som har solo
// och landar på musens huvud en stund i gruppbilden (varv 2). Hon lutar bara lite åt det håll hon flyger, snurrar aldrig.
const FIA_A = ASSETS + 'karaktarer/fjarilen-fia/cut/', FIA_S = 0.26, FINK = '#1d1d1d';
document.querySelector('svg defs').insertAdjacentHTML('beforeend', `<filter id="fiakant" x="-20%" y="-20%" width="140%" height="140%">
  <feMorphology in="SourceAlpha" operator="dilate" radius="11" result="d"/><feFlood flood-color="#fff"/><feComposite in2="d" operator="in" result="k"/>
  <feMerge><feMergeNode in="k"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`);   // vit kant som dansarnas (~5 px på skärmen)
$('fram').insertAdjacentHTML('beforebegin', `<g id="fia" filter="url(#boil)"><g filter="url(#fiakant)">
  <image class="vinge" href="${FIA_A}fia-wing-l.png" width="1024" height="1024"/><image class="vinge" href="${FIA_A}fia-wing-r.png" width="1024" height="1024"/>
  <image href="${FIA_A}fia-body.png" width="1024" height="1024"/>
  ${[[428, 407], [595, 405]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(2.1)"><g class="oppen"><circle r="26" fill="#fff" stroke="${FINK}" stroke-width="6"/><circle class="pupill" r="10" fill="${FINK}"/></g>
    <path class="glad" d="M-22 8 Q0 -18 22 8" fill="none" stroke="${FINK}" stroke-width="7" stroke-linecap="round"/></g>`).join('')}
  <path d="M-20 -5 Q0 14 20 -5" transform="translate(512 478) scale(1.2)" fill="none" stroke="#f6e7f0" stroke-width="5" stroke-linecap="round"/></g></g>`);
const FIA_VINGE = [[385, 547], [643, 541]];
function fiaRita({ x, y, tilt = 0, flax = 1, glad = 0, blink = 0, titt = 0, tittY = 0 }) {
  const g = $('fia');
  g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${tilt.toFixed(2)}) scale(${FIA_S}) translate(-512 -500)`);
  g.querySelectorAll('.vinge').forEach((e, i) => { const [px, py] = FIA_VINGE[i]; e.setAttribute('transform', `translate(${px} ${py}) scale(${flax.toFixed(3)} 1) translate(${-px} ${-py})`); });
  g.querySelectorAll('.oppen').forEach(e => { e.style.display = glad ? 'none' : ''; e.setAttribute('transform', `scale(1 ${(1 - 0.92 * blink).toFixed(3)})`); });
  g.querySelectorAll('.glad').forEach(e => e.style.display = glad ? '' : 'none');
  g.querySelectorAll('.pupill').forEach(e => { e.setAttribute('cx', (9 * Math.max(-1, Math.min(1, titt))).toFixed(1)); e.setAttribute('cy', (9 * Math.max(-1, Math.min(1, tittY))).toFixed(1)); });
}
// banorna (skärmens koordinater vid zoom 1)
const fiaKula = t => { const v = 2 * Math.PI * (t - 98.3) / 4.11 + Math.PI; return [960 + 270 * Math.cos(v), 215 + 85 * Math.sin(v)]; };   // varv runt kulan
const fiaGolv = t => [960 + 600 * Math.sin(2 * Math.PI * (t - 117) / 8.22), 312 + 25 * Math.sin(2 * Math.PI * (t - 117) / 2.06)];   // under klistermärkenas båge
const fiaSolo = t => [960 + 330 * Math.sin(2 * Math.PI * t / 2.47), 390 + 70 * Math.sin(2 * Math.PI * t / 1.235)];   // en åtta över den som har solo
const fiaHej = t => [960 + 220 * Math.sin(2 * Math.PI * (t - 128.1) / 3.1), 335 + 20 * Math.sin(2 * Math.PI * (t - 128.1) / 1.55)];   // över bilen i 12d
const FIA_LANDA = [110.0, 110.9, 113.0, 113.8];   // flyger ner, sitter på musens huvud, lyfter
function fiaHuvud(t) {   // musens huvud (mellan öronen), där Fia sitter
  if (!MOTOR[MUSEN]) return [SX(DANS[MUSEN].x), GOLVY - 427];
  const { p } = stallning(MUSEN, t);
  return [SX(DANS[MUSEN].x - p.x * S), GOLVY + p.lyft * S - (MOTOR[MUSEN].FOTTER - 212) * (1 + p.strack) * S - 263 * FIA_S + 16];
}
const blandaP = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
function fiaPunkt(t, b) {   // [x, y, sitter]
  if (t >= 128.1) return [blandaP(fiaGolv(t), fiaHej(t), mjuk(k01((t - 128.1) / 0.8))), 0];
  if (b.typ === 'solo') return [fiaSolo(t), 0];
  const [l0, l1, l2, l3] = FIA_LANDA;
  if (t < 99.4) { const u = t - 98.3; return [blandaP([-150 + 700 * u, 520 - 150 * u], fiaKula(t), mjuk(k01(u / 1.1))), 0]; }   // flyger in
  if (t >= l0 && t < l3) {
    if (t < l1) { const k = mjuk((t - l0) / (l1 - l0)), q = blandaP(fiaKula(t), fiaHuvud(t), k); return [[q[0], q[1] - 60 * Math.sin(Math.PI * k)], 0]; }
    if (t < l2) return [fiaHuvud(t), 1];
    const k = mjuk((t - l2) / (l3 - l2)), q = blandaP(fiaHuvud(t), fiaKula(t), k); return [[q[0], q[1] - 60 * Math.sin(Math.PI * k)], 0];
  }
  if (t < 117) return [fiaKula(t), 0];
  return [blandaP(fiaKula(t), fiaGolv(t), mjuk(k01((t - 117) / 1.3))), 0];
}
function fia(t, b) {
  const [[x, y0], sitter] = fiaPunkt(t, b), [[x1]] = fiaPunkt(t + 0.04, b), u = fas(t);
  if (sitter) {
    const e = t - FIA_LANDA[1];
    fiaRita({ x, y: y0 + (e < 0.6 ? Math.exp(-e * 8) * Math.sin(e * 30) * 6 : 0), flax: 0.78 + 0.22 * Math.cos(e * 4.2),
      glad: e > 0.5 && e < 1.4 ? 1 : 0, blink: (e > 1.6 && e < 1.72) ? 1 : 0, titt: 0.6, tittY: 1 });
    return;
  }
  fiaRita({ x, y: y0 + 10 * Math.sin(2 * Math.PI * u), tilt: Math.max(-12, Math.min(12, (x1 - x) / 3)),
    flax: 0.35 + 0.65 * Math.abs(Math.cos(2 * Math.PI * u)), titt: (960 - x) / 300, tittY: 0.7 });
}

// --- klistermärkena: bågen runt kulan och listans stora (005:s dekaler) ---------------------------------------------
// Mjuk skugga, tjock vit stansad kant, ljusrosa skiva och motivet. Faller in 46 px ovanifrån på 0,18 s och FASTNAR PÅ SITT
// ORD (trycks ihop mot underkanten, vickar till). I listan slås de upp stora mitt i bild och flyger upp i bågen när nästa
// kommer (005:s 15a–15c, 007:s 16a). Brandbilen sätts direkt i bågen på första "Röd". På "röda!" skuttar alla till.
const DEKAL_R = 80, FALL = 0.18, TILT = [-5, 4, -4, 5, -5];
const BAGE_X = [290, 520, 750, 1170, 1400];           // skärmens x: tre till vänster om kulan, två till höger, som 005:s båge
const bagPlats = i => [BAGE_X[i], 128 + 0.00026 * (BAGE_X[i] - 960) ** 2];
const STOR = { x: 960, y: 560, skala: 2.4 };
function slagUpp(q) {
  let dy = 0, rot = 0, sx = 1, sy = 1;
  if (q < 0) { const k = k01(1 + q / FALL); dy = -46 * (1 - k * k); rot += 10 * (1 - k); sx = sy = 1.15 - 0.15 * k; }
  else { const s = Math.exp(-q * 9) * Math.cos(q * 28); sx = 1 + 0.12 * s; sy = 1 - 0.14 * s; rot += 5 * Math.exp(-q * 6) * Math.sin(q * 26); }
  return { dy, rot, sx, sy };
}
const dekal = (i, xs, y, skala, { dy, rot, sx, sy }) => { const x = SX(xs), R0 = DEKAL_R;   // i #pynt (speglat), som kitets rad
  pynt(`<g transform="translate(${x} ${y + dy}) rotate(${-rot}) scale(${skala.toFixed(3)}) translate(0 ${R0}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${-R0})">
    <circle cx="-5" cy="9" r="${R0}" fill="#6a1a20" opacity="0.28" filter="url(#dekalskugga)"/>
    <circle r="${R0}" fill="#fff" filter="url(#ikonkant)"/><circle r="${R0 - 12}" fill="#FCE4E2"/>
    <g transform="translate(${-x} ${-y})">${IKONER[i](x, y, 74)}</g></g>`); };
function dekaler(t) {
  ORD.forEach((tOrd, i) => {
    const q = t - tOrd; if (q < -FALL) return;
    const [bx, by] = bagPlats(i), u = slagUpp(q), stor = i > 0;
    const flyg = stor ? (i < 4 ? [ORD[i + 1] - 0.24, ORD[i + 1] - 0.02] : [RODA[0] - 0.22, RODA[0]]) : [0, 0];
    let x = bx, y = by, skala = 1;
    if (stor && t < flyg[1]) {   // stor i mitten, ett lugnt gupp; flyger upp i en båge till sin plats
      const f = ease(k01((t - flyg[0]) / (flyg[1] - flyg[0])));
      x = lerp(STOR.x, bx, f); y = lerp(STOR.y, by, f) - 70 * Math.sin(Math.PI * f); skala = lerp(STOR.skala, 1, f);
    } else if (q >= 0) {
      u.rot += 1.2 * Math.sin(Math.PI * (t - 25.0) / P + i * 1.3); u.dy += 3 * Math.sin(Math.PI * (t - 25.0) / P + i * 1.3);   // lugnt gung
      const r = senast(RODA, t); if (r > tOrd) { const s2 = studsSlag(t - r); u.sy -= 0.14 * s2; u.sx += 0.12 * s2; u.dy -= 18 * Math.max(0, Math.sin(Math.PI * k01((t - r) / 0.3))); }
      if (i === 0 && iFonster(IIIOOO, t)) u.rot += 6 * Math.sin((t - 25.0) * 22);   // brandbilen vickar på "iii-ooo"
    }
    u.rot += TILT[i];
    dekal(i, x, y, skala, u);
    if (q >= 0 && q < 0.5) { const p = poppa(q, 0.5), rr = DEKAL_R * skala; [[-1, -1], [1, -0.6], [0.8, 1]].forEach(([a, b], j) => gnista(x + a * (rr + 22), y + b * (rr + 10), (stor && t < flyg[0] ? 26 : 16) * p, j * 20)); }
  });
}

// --- rörelsesymbolen i övre högra hörnet (005:s, 1,3 gånger större) ---------------------------------------------
// Slås upp när raden börjar och dras av (krymper med en vickning) när den slutar. Ingen text, inga pilar.
const SYM = [[98.75, RAD(0), 'noter'], ...[0, 1, 2, 3, 4, 5, 6, 7].map(k => [RAD(k), RAD(k + 1), ROR[k % 4]]),
  [ORD[0], LISTA[0] - 0.05, 'noter'], [RODA[0], 128.1, 'noter']];
const BRUN = '#8A5A3B', SYMX = 1735, SYMY = 150, SYMR = DEKAL_R * 1.3;
// en tass med trampdynor (läses som tass, inte som en klump)
const tass = (x, y, rx, ry, rot = 0) => `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">
  <ellipse rx="${rx}" ry="${ry}" fill="${BRUN}" stroke="#fff" stroke-width="5"/><ellipse cy="${(ry * 0.25).toFixed(1)}" rx="${(rx * 0.45).toFixed(1)}" ry="${(ry * 0.32).toFixed(1)}" fill="#E9B9A4"/>
  ${[-0.5, 0, 0.5].map(k => `<circle cx="${(k * rx * 0.9).toFixed(1)}" cy="${(-ry * 0.42 - Math.abs(k) * -ry * 0.12).toFixed(1)}" r="${(rx * 0.17).toFixed(1)}" fill="#E9B9A4"/>`).join('')}</g>`;
const not = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" fill="#B0303A" stroke="#B0303A" stroke-width="7" stroke-linecap="round">
  <ellipse cx="0" cy="0" rx="14" ry="10" transform="rotate(-22)" stroke="none"/><path d="M12 -4V-64" fill="none"/><path d="M12 -64Q16 -48 34 -42" fill="none"/></g>`;
function symbolMotiv(typ, t) {
  const n = Math.floor((t - 25.0) / P), q = t - SLAG(n), qn = t - SLAG(n + 1), p = q / P;
  if (typ === 'stampa') {   // en fot lyfts och stampar ner på en marklinje, varannan sida
    const lift = qn > -0.24 ? Math.sin(Math.PI / 2 * (qn + 0.24) / 0.24) : 0, x = (n % 2 ? -1 : 1) * 16;
    return `<path d="M-46 36H46" stroke="${BRUN}" stroke-width="7" stroke-linecap="round"/>${tass(x, 18 - 30 * lift, 26, 17, x * lift * 0.6)}`;
  }
  if (typ === 'vifta') {    // en tass som vinkar fram och tillbaka, ytterläget på slaget
    const v = (n % 2 ? 1 : -1) * 28 * Math.cos(Math.PI * Math.min(1, p));
    return `<g transform="rotate(${v.toFixed(1)} 0 40)"><path d="M0 44V0" stroke="${BRUN}" stroke-width="20" stroke-linecap="round"/>${tass(0, -18, 27, 29)}</g>`;
  }
  if (typ === 'hoppa') {    // en prickad båge mellan två markstreck, bollen hoppar fram och tillbaka längs den
    const f = n % 2 ? 1 - p : p, x = lerp(-48, 48, f), y = 30 - 4 * 62 * f * (1 - f);
    const prickar = Array.from({ length: 9 }, (_, i) => { const g = i / 8; return `<circle cx="${lerp(-48, 48, g).toFixed(1)}" cy="${(30 - 248 * g * (1 - g)).toFixed(1)}" r="4.5" fill="#B07A70"/>`; }).join('');
    return `${prickar}<path d="M-62 40H-34M34 40H62" stroke="${BRUN}" stroke-width="6" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${(y - 12).toFixed(1)}" r="13" fill="${RÖD}" stroke="#fff" stroke-width="4"/>`;
  }
  if (typ === 'klappa') {   // två tassar som slår ihop på slaget
    const isar = q < 0.12 ? 0 : qn > -0.18 ? -qn / 0.18 : 1, gap = 8 + 30 * ease(isar);
    return tass(-gap - 14, 0, 20, 30, 12) + tass(gap + 14, 0, 20, 30, -12);
  }
  const g = Math.sin(Math.PI * (t - 25.0) / P);   // noter: två noter som gungar på slaget
  return not(-22, 30 - 6 * g, 0.85) + not(26, 22 + 6 * g, 0.7);
}
function symbol(t) {
  for (const [a, b, typ] of SYM) {
    if (t < a - FALL || t >= b) continue;
    let { dy, rot, sx, sy } = slagUpp(t - a), skala = 1;
    if (t > b - 0.2) { const k = (b - t) / 0.2; skala = ease(k); rot += 12 * Math.sin((1 - k) * 9); }   // dras av
    lagg('ram', `<g transform="translate(${SYMX} ${SYMY + dy}) rotate(${rot.toFixed(2)}) scale(${skala.toFixed(3)}) translate(0 ${SYMR}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${-SYMR})">
      <circle cx="5" cy="9" r="${SYMR}" fill="#6a1a20" opacity="0.28" filter="url(#dekalskugga)"/>
      <circle r="${SYMR}" fill="#fff" filter="url(#ikonkant)"/><circle r="${SYMR - 14}" fill="#FCE4E2"/>
      <g filter="url(#kritkorn)" transform="scale(1.3)">${symbolMotiv(typ, t)}</g></g>`);
  }
}

// --- ton, kamera ---------------------------------------------------------------------------------------------------
const ton = () => lagg('ram', `<rect width="1920" height="1080" fill="#FFB27A" opacity="0.07" style="mix-blend-mode:soft-light"/>
  <rect width="1920" height="1080" fill="url(#vinjett)" opacity="0.13"/>`);
function kam(z, skak = 0, cx = 960, cy = 540) {   // stillastående kamera (005), en lätt golvskakning på stampen; förgrunden 12 % mer
  kamera(z * 1.012, cx, cy);   // en aning in, så att skakningen aldrig visar plattans kant
  if (skak) { const m = $('kamera').getAttribute('transform').match(/translate\(([-\d.e]+) ([-\d.e]+)\) scale\(([-\d.e]+)\)/);
    $('kamera').setAttribute('transform', `translate(${m[1]} ${+m[2] + skak}) scale(${m[3]})`); }
  $('fram').setAttribute('transform', `translate(0 ${(0.12 * skak).toFixed(2)})`);
}

// --- bilderna 11a–12c: en och samma funktion, styrd av avsnittstiden ----------------------------------------------
function dansen() {
  const t = TID, b = bild(t);
  $('fram').innerHTML = '';
  ljus(t);
  bil({ synlig: false });
  const syns = i => b.typ === 'grupp' || (b.typ === 'solo' && i === b.vem);
  const xAv = i => b.typ === 'solo' ? 960 : DANS[i].x;
  const st = DJUR.map((_, i) => MOTOR[i] && syns(i) ? stallning(i, t) : null);
  st.forEach((s, i) => ritaDjur(i, xAv(i), s));
  // stjärnregnet följer den som dansar: solo runt djuret, i gruppen runt alla när alla dansar
  const aktiv = b.typ === 'solo' || (t >= RAD(4) && t < RAD(8)) || t >= ORD[0];
  st.forEach((s, i) => { if (s && aktiv) stjarnregn(skarmX(i, xAv(i), s), GOLVY + s.p.lyft * S - HOJD * 0.55, HOJD * 0.62, HOJD * 0.5, t + i * 0.7); });
  // golvet skakar lite på stampen
  let skak = 0;
  const nB = Math.floor(fas(t));
  for (const n of [nB, nB - 1]) if (stampPa(n)) { const q = t - SLAG(n); skak += (b.typ === 'solo' ? 4 : 4) * Math.exp(-q * 14) * Math.cos(q * 40); }
  // gnistor där tassarna möts (klappen) och över huvudet på "röda!"
  for (const [tk, solo] of KONTAKT) { const q = t - tk; if (q < 0 || q > 0.42) continue;
    st.forEach((s, i) => { if (!s || (solo && i !== MUSEN)) return; const p = poppa(q, 0.42), xs = skarmX(i, xAv(i), s), y = GOLVY + s.p.lyft * S - 300 * S;
      gnista(xs - 96 * S, y - 14, 18 * p, tk * 97 % 40); gnista(xs + 100 * S, y + 8, 13 * p, tk * 61 % 40); }); }
  for (const r of RODA) { const q = t - r; if (q < 0 || q > 0.42) continue;
    st.forEach((s, i) => { if (!s) return; const p = poppa(q, 0.42), xs = skarmX(i, xAv(i), s), y = GOLVY + s.p.lyft * S - HOJD;
      gnista(xs + (i % 2 ? 1 : -1) * 150, y + 40, 22 * p, i * 23); }); }
  dekaler(t);
  fia(t, b);
  symbol(t);
  if (b.typ === 'solo') kam(SOLO_Z, skak, 960, SOLO_CY); else kam(1, skak);
  ton();
}
['11a', '11b', '11c', '11d', '11e', '11g', '12a', '12b', '12c'].forEach(id => ANIM[id] = dansen);

// --- 12d: "Hej då, hej då! (Tut, tut!)" -------------------------------------------------------------------------
// Dansarna skuttar åt sidorna och öppnar en lucka i mitten; kaninen i brandbilen kör in från vänster (åt höger) och stannar
// i luckan, blinkar och vinkar. Dansarna vinkar tillbaka med armen mot bilen. Ingen täcks av bilen.
const BK = 0.6, BIL_Y = 992 - (CY + 1573 * CS * BK), BIL_X = 960 - CX - 1209 * CS * BK;
const LUCKA = [0, -60, 510, 270];       // dx i koden: lammet → skärm 1560, grodan → 450, musen → 150
const S12 = 0.48;                       // lite mindre här, så att alla tre och bilen får plats
const VINKAR = [0, 0, 1, 1];            // armen mot bilen: björnen och lammet står till höger om den, grodan och musen till vänster
function kropp12d(i, t) {
  const B = { lyft: 0, luta: 0, x: 0, strack: 0, bred: 0, armar: [10, 10], fram: [0, 0], klapp: 0, armY: 0, ben: [0, 0], benY: [0, 0], acc: 0.3, tryck: 0, svans: 0 };
  if (t < 128.8) {                      // två små skutt åt sidan
    const k = (Math.max(0, t - 128.1) / 0.35) % 1, s = Math.sin(Math.PI * k01(k));
    B.lyft -= 90 * s; B.benY = [-30 * s, -30 * s]; B.acc = 0.5 + 0.5 * s;
    const g = Math.sin(Math.PI * k01((k - 0.85) / 0.15)); B.strack -= 0.08 * g; B.bred += 0.06 * g; B.tryck = g;
  } else {                              // vinkar och guppar i takten
    const p = fas(t), e = mjuk(k01((t - 128.8) / 0.3)), w = VINKAR[i];
    B.armar[w] = mixa(10, 62 + 20 * Math.sin((t - 128.8) * 13), e); B.armar[1 - w] = 10 - 4 * e;
    B.lyft -= 14 * Math.abs(Math.sin(Math.PI * p)); B.luta += 4 * Math.cos(Math.PI * p) * e;
    B.acc = 0.45 + 0.55 * Math.max(...HEJ.map(h => Math.exp(-Math.max(0, t - h) * 4) * (t >= h ? 1 : 0)), ...TUT.map(h => Math.exp(-Math.max(0, t - h) * 4) * (t >= h ? 1 : 0)));
  }
  return B;
}
ANIM['12d'] = () => {
  const t = TID;
  $('fram').innerHTML = '';
  ljus(t);
  const kor = ease(k01((t - 128.15) / 0.9)), bx = lerp(BIL_X + 1450, BIL_X, kor);
  const tq = t - senast(TUT, t), tut = tq < 0.25 ? Math.sin(Math.PI * tq / 0.25) : 0;
  const stanna = t > 129.05 ? 3 * Math.exp(-(t - 129.05) * 6) * Math.sin((t - 129.05) * 20) : 0;
  const by = BIL_Y - 12 * tut - 2 * studs(t - SANG0);
  bil({ x: bx, y: by, k: BK, lut: stanna - 1.5 * tut, blaljus: tq < 0.4 ? 1 : blink(t - SANG0) * 0.6, lampa: 1 });
  kanin({ iBil: true, uttryck: 'blinkar', pose: { armar: [0, 56 + 20 * Math.sin((t - 128.1) * 6)] }, rikt: 0 });
  const gx = CX + bx + 1209 * CS * BK, gy = CY + by + 1573 * CS * BK;
  lagg('bakom', `<ellipse cx="${(gx - 10).toFixed(1)}" cy="${(gy + 4).toFixed(1)}" rx="${(620 * CS * BK).toFixed(1)}" ry="16" fill="#4a0f14" opacity="0.3" filter="url(#markskugga)"/>`);
  const flytt = ease(k01((t - 128.1) / 0.7)), xAv = i => DANS[i].x + LUCKA[i] * flytt;
  const st = DJUR.map((_, i) => MOTOR[i] ? stallning(i, t, kropp12d) : null);
  st.forEach((s, i) => ritaDjur(i, xAv(i), s, S12));
  dekaler(t);
  fia(t, { typ: 'grupp' });
  HEJ.forEach((h, i) => { const p = poppa(t - h - 0.6, 0.7); if (p <= 0) return; const d = [MUSEN, LAMM, GRODA, LAMM][i];
    hjarta(SX(DANS[d].x + LUCKA[d]), GOLVY - HOJD * S12 / S - 40 - 50 * (t - h - 0.6), p * 1.1, i % 2 ? 12 : -12); });
  const lx = SX(CX + bx + LJUS[0] * CS * BK), ly = CY + by + LJUS[1] * CS * BK - 40;
  TUT.forEach((tt, i) => { const p = poppa(t - tt, 0.4); if (p > 0) { gnista(lx - 50, ly - 30, 22 * p, i * 30); gnista(lx + 55, ly - 5, 16 * p, i * 50); } });
  kam(1);
  ton();
};

// --- ljudeffekter (avsnittstid; flyttas till scentid när tiderna är lästa) -----------------------------------------
// Lågt och helst mellan orden (ljud.md). Filerna i assets/ljud/effekter/<namn>/<namn>-<n>.m4a.
const EFF = [];
const eff = (namn, t, vol, variant = 1, langd = 1.5) => EFF.push({ fil: `assets/ljud/effekter/${namn}/${namn}-${variant}.m4a`, t, vol, langd, fade: 0.25 });
eff('glitter', 98.9, 0.25, 1, 1.5);                                                   // discot börjar (005)
[0, 1, 2, 3].forEach(j => { eff('dunk', SLAG(148 + j), 0.45, 1 + j % 4, 0.6); eff('dunk', SLAG(164 + j), 0.4, 1 + (j + 2) % 4, 0.6); });   // stampa, varv 1 och 2
eff('fniss', RAD(1) + 1.95, 0.35, 3, 1.2);                                            // efter "vifta"-raden
[0, 1, 2, 3].forEach(j => { eff('boing', SLAG(156 + j), 0.3, 1 + j % 4, 0.6); eff('boing', SLAG(172 + j), 0.25, 1 + (j + 1) % 4, 0.6); });   // hoppa, varv 1 och 2
// klappa (Sannas nya tass-ljud, ett ljud i taget): en tass-klapp per slag. Musens solo slutar med ett mus-pip i stället för
// fjärde klappen; varv 2 slutar dansen med tass-klapp-tre (tre snabba klapp) på sista slaget.
[0, 1, 2].forEach(j => eff('tass-klapp', SLAG(160 + j), 0.25, 1 + j % 3, 0.45));
eff('mus-pip', SLAG(163) + 0.02, 0.28, 2, 0.5);
[0, 1, 2].forEach(j => eff('tass-klapp', SLAG(176 + j), 0.25, 1 + (j + 1) % 3, 0.45));
eff('tass-klapp-tre', SLAG(179) - 0.24, 0.3, 1, 1.2);   // filens första klapp ligger 0,24 s in: klappen landar på slaget (TRE)
SYM.forEach(([a, , typ], i) => typ !== 'klappa' && eff('klistra', a, 0.3, 1 + i % 2, 0.5));   // rörelsesymbolen slås upp (svagt; inte på klapp-raderna)
ORD.forEach((t, i) => { if (i === 0) return; eff('pop', t - FALL, 0.3, 1 + i % 4, 0.4); eff('klistra', t, 0.55, 1 + i % 2, 0.6); });   // klistermärkena på sina ord (brandbilen tyst: tass-klapp-tre ringer ut där)
RODA.forEach((t, i) => eff('glitter', t + 0.05, 0.3, 3 + i, 1.2));                     // "röda!": alla studsar till
eff('brum', 128.12, 0.3, 2, 1.1);                                                      // brandbilen kör in
eff('tuta-tut', TUT[1] + 0.12, 0.25, 2, 0.5);                                          // svagt eko efter sista tutet (tutarna sjungs)

window.ready = window.ready.then(async r => {
  await laddat; await new Promise(ok => setTimeout(ok, 1500));   // riggarnas urklipp hinner laddas
  const A0 = ANIM.TIDER[window.SCEN[0]][0];
  window.LJUD = [...(window.LJUD || []), ...EFF.map(c => ({ ...c, t: c.t - A0 })).filter(c => c.t >= 0 && c.t < window.DURATION)];
  window.seek(0);
  return r;
});
})();
