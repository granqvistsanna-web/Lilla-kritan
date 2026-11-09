// 013 Röda sången, scen chilibilen (storyboard 08a–10b, avsnittstid 1:07.6–1:38.3). Laddas efter ../film.js och skriver
// över bildernas ANIM-poster. Scenen är speglad: kodens x = 1920 − skärmens x, så allt nedan placeras med S(skärmens x).
// Finputs som 007/015: mjuk markskugga, gnistor och hjärtan som klistermärken, förgrunden rör sig 12 % mer än kameran,
// bakgrunden mjuk bara vid inzoomning, varm soft-light 0.07 och vinjett 0.14.
(() => {   // egen räckvidd: kitets namn (slang, pol, P …) krockar inte
const S = x => 1920 - x;
const svg = document.querySelector('svg');
svg.querySelector('defs').insertAdjacentHTML('beforeend', `
  <filter id="mskugga" x="-30%" y="-200%" width="160%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="bgmjuk" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur id="bgmjuk-b" stdDeviation="0"/></filter>
  <filter id="smakrita" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.08 0.3" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.55" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
  </filter>
  <radialGradient id="vinjett" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="#3B2A12" stop-opacity="0"/><stop offset="1" stop-color="#3B2A12" stop-opacity="0.14"/></radialGradient>`);
// grästuvorna närmast kameran i ett eget lager (parallax), och tonen överst
$('ram').insertAdjacentHTML('beforebegin', `<g id="fram2k"><g transform="translate(1920 0) scale(-1 1)"><g id="fram2" filter="url(#boil)"></g></g></g>`);
svg.insertAdjacentHTML('beforeend', `<g id="ton" pointer-events="none"><rect width="1920" height="1080" fill="#FFC07A" opacity="0.07" style="mix-blend-mode:soft-light"/><rect width="1920" height="1080" fill="url(#vinjett)"/></g>`);
// kaninens ansikte kan rodna: en mjuk röd ton över huvudet, under nosfläcken
// (kroppens egen siluett färgad röd, så att tonen stannar innanför kanten)
svg.querySelector('defs').insertAdjacentHTML('beforeend', `<filter id="rodton"><feMorphology in="SourceAlpha" operator="erode" radius="12" result="a"/><feFlood flood-color="#E0402F"/><feComposite in2="a" operator="in"/></filter>`);
{ const kr = KANEL.querySelector('.kropp').firstElementChild;
  kr.insertAdjacentHTML('afterend', `<image class="rodnad" href="${kr.getAttribute('href')}" width="1024" height="1024" filter="url(#rodton)" opacity="0"/>`); }

// en mjukare tunga: ljusrosa med vit klistermärkeskant, en mittlinje och en glans (figurens pixlar, hänger ner från munnen)
const TP = 'M-17 0 C-25 16 -23 40 0 42 C23 40 25 16 17 0';   // smal upptill (inne i munnen), rund nertill
KANEL.querySelector('.tunga').innerHTML = `<path d="${TP}" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
  <path d="${TP} Z" fill="#F4A3AE"/><path d="${TP}" fill="none" stroke="#D9707F" stroke-width="3" stroke-linecap="round"/>
  <path d="M0 7 Q-1.5 19 0 29" fill="none" stroke="#C95F6E" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="-9" cy="18" rx="4.5" ry="7.5" fill="#fff" opacity="0.55"/>`;
// tungan vickar lite (efter kanin())
const viggla = (s, a = 6) => { const t = KANEL.querySelector('.tunga'); t.setAttribute('transform', t.getAttribute('transform') + ` rotate(${(a * Math.sin(s * 11)).toFixed(2)})`); };
// munnen för tungan: rund och lagom öppen, så att tungan kommer ut ur en tydlig mun
const TUNGMUN = [21, 14, 0, 458];

// ---- hjälpare ----
// vägen rullar och bromsar in mjukt tills brandbilen står still (STOPP), när chilibilen har kört fram
const STOPP = 69.9, vagO = T => 140 * (T < STOPP - 1 ? T : STOPP - 1 + (u => u - u * u / 2)(Math.min(1, T - STOPP + 1)));
korscen = () => {
  platta(VÄG);
  SCROLL = vagO(TID);   // hjulen rullar med vägen och står still när bilen står
  vagStreck(SCROLL);    // mittlinjen glider med vägen
  const o = SCROLL % 2240, x = b => ((b + o) % 2240) - 160;
  sak('bakom', TRAD, x(300), 868, 640); sak('bakom', BUSKE, x(1180), 866, 180); sak('bakom', TRAD, x(1720), 868, 640);
  sak('fram2', GRAS, x(330), 1090, 180); sak('fram2', GRAS, x(1620), 1090, 180);
};
// mjuk skugga på marken (skärmens x), lite åt höger, mindre och ljusare när saken är högt upp
const skugga = (lager, sx, y, rx, hojd = 0) => { const k = 1 - 0.45 * kl01(hojd / (rx * 2.2));
  lagg(lager, `<ellipse cx="${S(sx + 8 * k)}" cy="${y}" rx="${rx * k}" ry="${rx * k * 0.15}" fill="#23401E" opacity="${(0.26 * k).toFixed(3)}" filter="url(#mskugga)"/>`); };
const VAG = 1012;   // vägen där hjulen och fötterna står
// musen stående på vägen: skärmens x, fötterna på fot, hopp uppåt, sq = squash (1 = normal), lut i grader (skärm)
// Sanna 2026-11-09: "mouse looks surprised, mouse same size as bunny": musen med stängt leende (^-ögon, uttrycket stolt ur
// hennes uttryck.html, med och utan hurra-armar) i stället för mus-glad/mus-upp, och 1,6 gånger större (300 → 480 px)
const MUS_LE = SB + 'mus-le.png', MUS_LE_UPP = SB + 'mus-le-upp.png'; MATT[MUS_LE] = 457 / 519; MATT[MUS_LE_UPP] = 475 / 531;
const MUS_H = 480, MK = MUS_H / 300;   // MK: tassarnas avstånd från fötterna växer med henne
function musStar(sx, { hopp = 0, sq = 1, lut = 0, fil = MUS, h = MUS_H } = {}) {
  fil = fil === MUS_UPP ? MUS_LE_UPP : MUS_LE;
  skugga('framfor', sx, VAG, h * 0.36, hopp);
  const x = S(sx), fot = VAG - hopp;
  sak('framfor', fil, x, fot + 4, h, `translate(${x} ${fot}) rotate(${-lut}) scale(${2 - sq} ${sq}) translate(${-x} ${-fot})`);
}
// kaninens mun i skärmen (före kameran), läst ur riggen efter kanin()
const munnen = () => { const m = KANEL.querySelector('.munnen'), b = m.getBBox(), p = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform($('spegel').getCTM().inverse().multiply(m.getCTM())); return [S(p.x), p.y]; };
// en punkt i kaninens ansikte (figurens pixlar) i skärmen
const iAnsiktet = (x, y) => { const p = new DOMPoint(x, y).matrixTransform($('spegel').getCTM().inverse().multiply(KANEL.querySelector('.drag').getCTM())); return [S(p.x), p.y]; };
// hett! ett rött, plågat ansikte: oroliga bryn (inre ändarna upp), stora ögon, en darrig öppen mun. Inte läskigt.
const hett = (s, tunga = false, blund = 0) => ({ ...blanda('forvanad', 'ledsen', 0.45), bryn: 1, brynY: [-8, -8], brynV: 26, ogonS: [1.12, 1.12], titt: [0, 2], kind: 1, streck: 0,
  le: 0, mun: tunga ? [TUNGMUN[0] + 2 * Math.sin(s * 13), TUNGMUN[1] + 2 * Math.sin(s * 9 + 1), 0, TUNGMUN[3]] : [15 + 4 * Math.sin(s * 13), 13 + 3 * Math.sin(s * 9 + 1), 0, 466],
  lock: [blund, blund], oron: [-10, -10], luta: 0, armar: [10, 10] });   // blund 0–1: ögonen kniper ihop
// blanda två färdiga uttryck eller poser (alla fält) mjukt, k 0–1
const mixa = (A, B, k) => Object.fromEntries(Object.keys({ ...A, ...B }).map(n => [n, typeof (A[n] ?? B[n]) === 'string' ? (k < 0.5 ? A[n] : B[n]) : mix(A[n] ?? B[n], B[n] ?? A[n], k)]));
// fortfarande het: fläktar med tassarna framför munnen (f = fas för fläktandet)
// Armarna (Sanna 2026-11-08: "improve rigged arms"): tassen på rattsidan (arm-l, index 0, skärmens höger) håller ratten
// (66° som i lk-figur), den andra tassen gör gesten. Kanel har inga -fram-filer, så armarna stannar bakom kroppen: inga
// armstumpar med full kant över bröstet. RATT räknar bort uttryckets egna armar så greppet sitter still när uttrycket byts.
const RATT = 66, uArm = ut => (typeof ut === 'string' ? blanda('neutral', ut, 1) : { ...blanda('neutral', 'neutral', 1), ...ut }).armar;
const grepp = (ut, fri = 0, o = {}) => { const a = uArm(ut); return { ...POSE0, ...o, armar: [RATT - a[0], fri - a[1]] }; };
// fläktar: den fria tassen uppe vid kinden och viftar snabbt (bakom kroppen, armen sticker ut vid sidan av ansiktet)
const flakt = s => 112 + 20 * Math.sin(s * 11);
const flaktPose = (s, ut) => grepp(ut, flakt(s), { oron: [-6, -6] });
// tassens spets (figurens pixlar på den synliga armbilden) i skärmen
const tass = i => { const n = i ? 'arm-r' : 'arm-l', e = [...KANEL.querySelectorAll('.' + n)].find(e => e.getAttribute('opacity') !== '0') || KANEL.querySelector('.' + n);
  const p = new DOMPoint(i ? 900 : 124, 648).matrixTransform($('spegel').getCTM().inverse().multiply(e.getCTM())); return [S(p.x), p.y]; };
// en liten tår i ögonvrån (k 0–1), glittrar
const tar2 = (k, s) => { if (k <= 0.02) return; const [x, y] = iAnsiktet(OGON[0][0] + 22, OGON[0][1] + 44); droppe(x, y + 6 * Math.sin(s * 3), 0.42 * pop(k)); };
// blanka, tårfyllda ögon (k 0–1): en ljusblå kant under ögat och en extra glans
const blanka = (k, s) => { if (k <= 0.02) return; const a = iAnsiktet(...OGON[0]), b = iAnsiktet(...OGON[1]), sk = Math.hypot(a[0] - b[0], a[1] - b[1]) / 181;
  OGON.forEach(([x, y]) => { const [ex, ey] = iAnsiktet(x, y + 21), [gx, gy] = iAnsiktet(x - 7, y + 9);
    pynt(`<g opacity="${k.toFixed(2)}"><ellipse cx="${S(ex)}" cy="${ey}" rx="${15 * sk}" ry="${4.5 * sk}" fill="#A9DDF6"/><circle cx="${S(gx)}" cy="${gy + sk * Math.sin(s * 4)}" r="${4 * sk}" fill="#fff"/></g>`); }); };
const bilSkugga = () => skugga('bakom', 960, VAG, 470);
// kaninen hoppar/sjunker i sätet (figurens pixlar, + = ner) med squash kring fötterna
const kaninDy = (dy, sq = 1) => KANEL.setAttribute('transform', KANEL.getAttribute('transform') + ` translate(512 ${947 + dy}) scale(${2 - sq} ${sq}) translate(-512 -947)`);
// röd i ansiktet: 0–1
function rosig(k) {
  KANEL.querySelector('.rodnad').setAttribute('opacity', (0.62 * k).toFixed(3));
  KANEL.querySelectorAll('.kind').forEach(c => { c.setAttribute('rx', 30 + 16 * k); c.setAttribute('ry', 18 + 9 * k); c.setAttribute('fill', k > 0.01 ? '#E85A5E' : KIND);
    if (k > 0.01) c.setAttribute('opacity', 0.75 + 0.25 * k); });
}
// klistermärken (som 015): gnista och hjärta, skärmens x
const stj = (r, x, y) => `M${x} ${y - r} Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y} Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r} Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y} Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z`;
const gnista = (sx, y, r) => { if (r <= 0.5) return; const x = S(sx); pynt(`<g stroke-linejoin="round"><path d="${stj(r, x, y)}" fill="#fff" stroke="#fff" stroke-width="${3 + 0.16 * r}"/>
  <path d="${stj(r, x, y)}" fill="#F2C94C"/><path d="${stj(r, x, y)}" fill="#F7DA74" filter="url(#smakrita)"/><path d="${stj(r * 0.5, x, y)}" fill="#FFF7D6" filter="url(#smakrita)"/></g>`); };
const HJ_D = 'M0 33 L-28.8 0 A15 15 0 0 1 0 -10.5 A15 15 0 0 1 28.8 0 Z';
const hjarta = (sx, y, k, op = 1) => { if (k <= 0.01) return; pynt(`<g transform="translate(${S(sx)} ${y}) scale(${k})" opacity="${op}"><path d="${HJ_D}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/>
  <path d="${HJ_D}" fill="#EC7896"/><path d="${HJ_D}" fill="#C9506F" opacity="0.5" filter="url(#smakrita)" transform="translate(0 5)"/>
  <ellipse cx="-12" cy="-2" rx="5" ry="3.4" fill="#FFE3EA" opacity="0.85" transform="rotate(-35 -12 -2)"/></g>`); };
const pop = k => k <= 0 ? 0 : k >= 1 ? 1 : ease(k) * (1 + 0.3 * Math.sin(Math.PI * k));   // slås upp och studsar till
// en vattendroppe (droppform, vit kant), skärmens x
const droppe = (sx, y, r = 1, lager = 'pynt') => lagg(lager, `<g transform="translate(${S(sx)} ${y}) scale(${r})"><path d="M0 -26 Q15 -4 15 7 A15 15 0 0 1 -15 7 Q-15 -4 0 -26Z" fill="#8CC8EE" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>
  <ellipse cx="-5" cy="5" rx="3.5" ry="5.5" fill="#fff" opacity="0.7"/></g>`);
// regnet: n droppar faller i ett band, i tur och ordning från start; inga droppar i ansiktena (frizoner, skärmens rutor)
const FRI = [[690, 220, 1070, 570], [90, 760, 420, 1000]];
const fri = (sx, y) => !FRI.some(([a, b, c, d]) => sx > a && sx < c && y > b && y < d);   // kaninens och musens ansikten
function regn(s, { x0 = 120, x1 = 1350, y0 = 150, y1 = 1000, n = 34, v = 760, slut = 99 } = {}) {
  const span = y1 - y0;
  for (let i = 0; i < n; i++) {
    const ti = (i * 0.5698403 % 1) * span / v, sx = x0 + (x1 - x0) * ((0.3 + i * 0.7548777) % 1), ds = s - ti;
    if (ds < 0) continue;
    const varv = Math.floor(ds * v / span), y = y0 + (ds * v) % span;
    if (ti + (varv * span) / v > slut) continue;          // när det slutar regna faller de sista klart
    if (FRI.some(([a, b, c, d]) => sx > a && sx < c && y > b && y < d)) continue;
    droppe(sx, y, 0.8 + 0.3 * (i % 3) / 2);
    const sk = ((ds * v) % span) / v; if (varv > 0 && sk < 0.35) stank(sx, sk / 0.35);   // förra varvets stänk
  }
}
// slangen: från slangrullen på brandbilens sida ner till vägen och fram till musens tass, i en mjuk kurva med lite slack
// som gungar (sving 0–1). rull = hur långt slangen dragits ut (rullen snurrar medan den dras).
const RULLE = [570, 735];
function slang(till, { sving = 0, s = 0, rull = 0, munstycke = true } = {}) {
  const [x0, y0] = RULLE, [x3, y3] = till, g = sving * 26 * Math.sin(s * 7), slack = 40 + 20 * sving * Math.sin(s * 5 + 1);
  const c1 = [x0 - 30, 1000 + slack * 0.4 + g * 0.5], c2 = [x3 + 90 + g, Math.min(1035, Math.max(y3 + 120, 960) + slack)];
  const d = `M${S(x0)} ${y0} C ${S(c1[0])} ${c1[1]} ${S(c2[0])} ${c2[1]} ${S(x3)} ${y3}`;
  lagg('framfor', `<g filter="url(#boil)"><path d="${d}" fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#9A9A93" stroke-width="20" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="#C9C6BE" stroke-width="8" stroke-linecap="round" transform="translate(0 -4)"/>
    ${rull ? `<g transform="rotate(${-rull * 900} ${S(x0)} ${y0})"><path d="M${S(x0) - 34} ${y0} A34 34 0 0 1 ${S(x0)} ${y0 - 34}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>` : ''}
    ${munstycke ? `<rect x="${S(x3) - 14}" y="${y3 - 50}" width="28" height="58" rx="9" fill="${GUL}" stroke="#fff" stroke-width="7" transform="rotate(-12 ${S(x3)} ${y3})"/>` : ''}</g>`);
}
// vattenstrålen: en båge ur munstycket (x0, y0) upp till toppen och lite åt brandbilen, där den bryts upp i droppar.
// a/b = vilken del av bågen som syns (0–1): början växer ut i en skur, slutet lossnar nerifrån när den stängs av.
function strale(x0, y0, topp, a, b, s) {
  if (b <= a) return;
  const p = k => { const m = 1 - k, wob = 8 * Math.sin(s * 10 + k * 6) * k;
    return [m * m * x0 + 2 * m * k * (x0 + 40) + k * k * (x0 + 230) + wob, m * m * y0 + 2 * m * k * (topp - 130) + k * k * (topp + 50)]; };   // bryts upp till vänster om kaninens öron
  let d = '';
  for (let i = 0; i <= 14; i++) { const [x, y] = p(a + (b - a) * i / 14); d += `${i ? 'L' : 'M'}${S(x).toFixed(1)} ${y.toFixed(1)} `; }
  pynt(`<g stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="${d}" stroke="#fff" stroke-width="54"/><path d="${d}" stroke="#8CC8EE" stroke-width="36"/><path d="${d}" stroke="#D8F0FB" stroke-width="10" transform="translate(-6 0)"/></g>`);
  if (b > 0.97) { const [tx, ty] = p(1);   // där bågen bryts: droppar som stänker ut
    for (let i = 0; i < 7; i++) { const k = (s * 1.7 + i / 7) % 1, vx = (i % 2 ? 1 : -0.6) * (70 + 35 * (i % 3)); const dx = tx + vx * k * 2, dy = ty - 90 * k + 300 * k * k; if (fri(dx, dy)) droppe(dx, dy, 0.85); } }
  return p;
}
// ett litet stänk där en droppe landar på vägen (k 0–1)
const stank = (sx, k) => { if (k <= 0 || k >= 1) return; const r = 14 + 26 * k, o = 1 - k;
  pynt(`<g opacity="${o.toFixed(2)}" fill="#8CC8EE" stroke="#fff" stroke-width="4">${[-1, -0.35, 0.35, 1].map(v => `<ellipse cx="${S(sx + v * r)}" cy="${VAG - 6 - 22 * Math.sin(Math.PI * k) * (1 - Math.abs(v) * 0.4)}" rx="6" ry="9"/>`).join('')}</g>`); };
// en båge i himlen (regnbåge), bakom träden
const regnbage = op => { if (op <= 0) return; const r0 = 330, cx = S(1500), cy = 868, f = ['#E86A5A', '#F2A64C', '#F2C94C', '#7DBE5A', '#68A8E0'];
  $('bakom').insertAdjacentHTML('afterbegin', `<g opacity="${op}" filter="url(#boil)" fill="none"><path d="M${cx - r0 - 14} ${cy} A${r0 + 14} ${r0 + 14} 0 0 1 ${cx + r0 + 14} ${cy}" stroke="#fff" stroke-width="18"/>
    ${f.map((c, i) => { const r = r0 - i * 20; return `<path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}" stroke="${c}" stroke-width="22"/>`; }).join('')}
    <path d="M${cx - r0 + 92} ${cy} A${r0 - 92} ${r0 - 92} 0 0 1 ${cx + r0 - 92} ${cy}" stroke="#fff" stroke-width="12"/></g>`); };
const pol = (sx, k) => k > 0 && lagg('bakom', `<ellipse cx="${S(sx)}" cy="${VAG + 18}" rx="${110 * k}" ry="${20 * k}" fill="#8CC8EE" stroke="#fff" stroke-width="6" opacity="0.9"/>`);
// ett äpple i skärmens x, med ett bett (0/1/2) och squash
function aepple(sx, y, h, { bett = 0, sq = 1 } = {}) {
  const x = S(sx), id = 'bett' + Math.round(sx) + Math.round(y);
  const hal = [[0.42, -0.12], [0.44, 0.14]].slice(0, bett).map(([dx, dy]) => `M${x - dx * h + 0.17 * h} ${y + dy * h} a${0.17 * h} ${0.17 * h} 0 1 0 ${-0.34 * h} 0 a${0.17 * h} ${0.17 * h} 0 1 0 ${0.34 * h} 0Z`).join(' ');
  pynt(`<clipPath id="${id}"><path clip-rule="evenodd" d="M${x - h} ${y - h} h${2 * h} v${2 * h} h${-2 * h}Z ${hal}"/></clipPath>
    <g clip-path="url(#${id})" transform="translate(${x} ${y + h / 2}) scale(${2 - sq} ${sq}) translate(${-x} ${-y - h / 2})"><image href="${APPLE}" x="${x - h / 2}" y="${y - h / 2}" width="${h}" height="${h}"/></g>`);
}
const chili = (sx, y, h, vrid) => sak('pynt', CHILI, S(sx), y + h / 2, h, `rotate(${-vrid} ${S(sx)} ${y})`);   // vrid = grader medurs i bild

// ---- ljud (scentid; scenen börjar 67.6). vol 1 = effektnivån; under sång bara svagt ----
const LJUDN = { 'hjul-gnissel': 4, 'brandbil-motor': 3, nom: 2, mums: 4, flamt: 3, puff: 3, glimt: 2, tass: 6, swoosh: 4, plask: 4, pling: 4, slurp: 2,
  'slang-start': 3, 'slang-spruta': 3, 'hett-pip': 3, 'mus-pip': 3 };
const tur = {}, LJ = [];
const ljud = (namn, t, { vol = 1, langd, loop = false, fade = 0.3 } = {}) => { tur[namn] = ((tur[namn] ?? -1) + 1) % LJUDN[namn];
  LJ.push({ fil: `assets/ljud/effekter/${namn}/${namn}-${tur[namn] + 1}.m4a`, t, vol, langd, loop, fade }); };
ljud('brandbil-motor', 0, { vol: 0.2, langd: 2.4, fade: 1.2 });   // motorn mjukt medan brandbilen rullar, tonas ut när den bromsar in
[0.33, 0.66, 1.0, 1.33].forEach(t => ljud('tass', t, { vol: 0.35 }));   // musen tassar in längs vägen (under sång: lågt)
ljud('mus-pip', 1.6, { vol: 0.4 });                          // musen är framme
ljud('hjul-gnissel', 2.05, { vol: 0.3 });                     // brandbilen stannar
ljud('nom', 3.7, { vol: 0.35 }); ljud('nom', 4.2, { vol: 0.35 });   // tuggorna i chilin (nam sjungs: bara ett svagt eko)
ljud('hett-pip', 5.75, { vol: 0.8 });                        // 09a: det är starkt! ansiktet blir rött ("iiih!")
ljud('flamt', 7.2, { vol: 0.7 });                            // tungan ute, flämtar
ljud('puff', 9.9, { vol: 0.4 }); ljud('puff', 10.9, { vol: 0.4 }); ljud('puff', 11.9, { vol: 0.4 });   // 09b: fläktar
ljud('glimt', 12.6, { vol: 0.7 });                           // slangrullen glimtar: ledtråden
[13.8, 14.2, 14.6, 15.0].forEach(t => ljud('tass', t, { vol: 0.7 }));   // 09c: musen skuttar till rullen
ljud('mus-pip', 15.15, { vol: 0.7 });                        // hon tar slangen
ljud('swoosh', 15.45, { vol: 0.4 });                         // slangen dras ut
ljud('slang-start', 16.9, { vol: 0.8 });                     // 09d: vattnet kommer
ljud('slang-spruta', 17.3, { vol: 0.4, langd: 2.8, fade: 0.45 });   // under strålen, tonas ut när den stängs av (20.1)
ljud('plask', 20.15, { vol: 0.45 });                         // sista plasket
ljud('pling', 26.3, { vol: 0.35 });                          // äpplet landar hos musen
ljud('mums', 29.7, { vol: 0.35 }); ljud('slurp', 30.25, { vol: 0.35, langd: 0.6 });   // "nam, nam": ett svagt eko

// ---- bilderna ----
const narZoom = (z, cx = 950, cy = 460) => kamera(z, cx, cy);
const MS = 255;   // musens plats på vägen bakom brandbilen, fri från bilarna
const musPaw = (sx, hopp = 0) => [sx + 118 * MK, VAG - 150 * MK - hopp];

// musen står på vägen bredvid brandbilens nos (skärmens x) och håller chilin i tassen mot brandbilen
const MP = 1620, pawV = (sx, hopp = 0) => [sx - 118 * MK, VAG - 150 * MK - hopp];

// 08a: "Vad är rött?" musen tassar in längs vägen med en liten röd chili; vägen bromsar in
ANIM['08a'] = (u, s) => { korscen(); bilSkugga(); bil({});
  { const ut = blanda('nyfiken', 'glad', fas(u, 0.6, 1)); kanin({ iBil: true, uttryck: ut, pose: grepp(ut, 0), rikt: -0.35 }); }
  const k = fas(s, 0, 1.45), sx = lerp(2160, MP, k), hopp = k < 1 ? 24 * Math.abs(Math.sin(Math.PI * s / 0.33)) : 10 * Math.sin(Math.PI * kl01((s - 1.45) / 0.3));
  musStar(sx, { hopp, sq: k < 1 ? 1 : 1 - 0.06 * Math.sin(Math.PI * kl01((s - 1.45) / 0.3)), lut: k < 1 ? 4 * Math.sin(Math.PI * s / 0.33) : 0 });
  const paw = pawV(sx, hopp); chili(paw[0] - 5, paw[1] - 90, 150, -12);   // större med den större musen
  kamera(lerp(1, 1.12, ease(u)), 1250, 620); };

// 08b: "Musen har en chili! (Nam, nam!)" musen håller upp chilin, den hoppar över till kaninens mun, en tugga per "nam"
ANIM['08b'] = (u, s) => { korscen(); bilSkugga(); bil({});
  const visar = s < 0.65, flyg = fas(s, 0.65, 1.15), b1 = s > 1.3, b2 = s > 1.8, mh = visar ? 14 * studs(s * 2) : 0;
  musStar(MP, { hopp: mh, fil: s < 1.3 ? MUS : MUS_UPP });
  const nam = Math.max(0, 1 - Math.abs(s - 1.3) / 0.18, 1 - Math.abs(s - 1.8) / 0.18);   // munnen öppen kring tuggorna
  const ut8 = nam > 0.3 ? { ...blanda('neutral', 'jatteglad', 1), mun: [18, 16, 1, 458] } : flyg > 0 ? 'jatteglad' : 'nyfiken';
  kanin({ iBil: true, uttryck: ut8, pose: grepp(ut8, 30 * Math.sin(Math.PI * fas(s, 0.4, 1.4)) + 18 * fas(s, 1.2, 1.6)), rikt: lerp(-0.35, -0.15, flyg) });
  const mun = munnen(), paw = pawV(MP, mh), h = lerp(150, 170, flyg) * (1 - 0.17 * b1 - 0.17 * b2);
  const start = [paw[0] - 5, paw[1] - 90 - 60 * fas(s, 0, 0.4)], mal = [mun[0] + 40 + h * 0.35 - 12 * nam, mun[1]];
  const sx = lerp(start[0], mal[0], flyg), sy = lerp(start[1], mal[1], flyg) - 170 * Math.sin(Math.PI * flyg);
  chili(sx, sy, h, lerp(-12, 80, flyg));
  kamera(1.2, 1290, 600); };

// 08c: "Oj!" ögonen spärras upp, ett litet hopp i sätet, gnistor runt huvudet; det börjar bli varmt
ANIM['08c'] = (u, s) => { korscen(); bil({});
  { const ut = { ...blanda('neutral', 'forvanad', 1), mun: [16, 14, 1, 458] }; kanin({ iBil: true, uttryck: ut, pose: grepp(ut, 18 + 26 * Math.sin(Math.PI * kl01(s / 0.45))), rikt: 0 }); } kaninDy(-40 * Math.sin(Math.PI * kl01(s / 0.45)), 1.04);
  rosig(0.25 * u);
  [[700, 300, 0], [1060, 250, 0.08], [1110, 420, 0.16]].forEach(([x, y, d]) => gnista(x, y, 30 * pop((s - d) / 0.25)));
  narbild(); };

// 09a: (mellanspel) hett! hela ansiktet blir rött takt för takt, oroliga bryn, darrig mun med tungan ute, öronen rakt upp,
// en tår i ögonvrån och en svettdroppe. Ingen eld, ingen rök.
ANIM['09a'] = (u, s) => { korscen(); bil({});
  const r = fas(s, 0, 3.0) * (0.93 + 0.07 * studs(s)), oron = -6 * fas(s, 0.3, 1.2);
    kanin({ iBil: true, uttryck: hett(s, true), tunga: 0.8 + 0.2 * studs(s * 1.9), pose: grepp(hett(s, true), lerp(18, flakt(s), ease(fas(s, 2.4, 3.4))), { luta: 3 * Math.sin(s * 6) * r, oron: [oron, oron] }), rikt: 0 }); viggla(s);
  kaninDy(-8 * studs(s * 1.9)); rosig(r);
  blanka(fas(s, 0.4, 1.2), s); tar2(fas(s, 1.3, 1.7), s);
  if (s > 1.6) { const m = munnen(), k = fas(s, 1.6, 3.7); droppe(m[0] - 125, m[1] - 120 + 50 * k, 0.75 * pop((s - 1.6) / 0.3)); }   // en liten svettdroppe
  narZoom(lerp(1.65, 1.78, ease(u)), 950, 390); };   // öronen ska synas

// 09b: fläktar med tassarna framför munnen, fortfarande röd och plågad; musen tittar bekymrat (lutar huvudet); slangrullen glimtar: ledtråden
ANIM['09b'] = (u, s) => { korscen(); bilSkugga(); bil({});
  kanin({ iBil: true, uttryck: hett(s, true), tunga: 0.85, pose: flaktPose(s, hett(s, true)), rikt: 0 }); viggla(s, 8);
  rosig(1 - 0.15 * u); blanka(1, s); tar2(1, s);
  const ide = fas(s, 3.3, 3.6);
  musStar(MP, { lut: ide ? 0 : 6 * Math.sin(s * 1.6), hopp: 26 * Math.sin(Math.PI * ide), fil: s > 3.4 ? MUS_UPP : MUS });
  if (s > 3.0) gnista(RULLE[0] + 40, RULLE[1] - 50, 40 * pop((s - 3.0) / 0.35) * (0.85 + 0.15 * Math.sin(s * 12)));
  kamera(1.12, 1100, 610); };

// 09c: (musiken blir glad) musen skuttar till slangrullen, tar slangen och backar till sin plats bakom brandbilen;
// slangen rullas ut i en mjuk kurva med lite slack som gungar
ANIM['09c'] = (u, s) => { korscen(); bilSkugga(); bil({});
  const H = [MP, 1330, 980, 690, 455];
  let sx, hopp = 0, sq = 1, fil = MUS_UPP;
  if (s < 1.6) { const k = s / 0.4, st = Math.min(3, Math.floor(k)), inom = k - st;   // fyra skutt längs vägen
    sx = lerp(H[st], H[st + 1], inom); hopp = 140 * Math.sin(Math.PI * inom); sq = inom < 0.12 ? 0.9 : 1.04; }
  else if (s < 2.0) { sx = H[4]; sq = 1 - 0.08 * Math.sin(Math.PI * (s - 1.6) / 0.4); fil = MUS; }
  else { const k = fas(s, 2.0, 3.0); sx = lerp(H[4], MS, k); hopp = 12 * Math.abs(Math.sin(Math.PI * (s - 2.0) / 0.25)) * (k < 1) + (s > 3.05 ? 30 * Math.sin(Math.PI * kl01((s - 3.05) / 0.35)) : 0); }
  if (s >= 1.75) slang(musPaw(sx, hopp), { sving: s > 2.0 ? 1 - 0.6 * fas(s, 2.8, 3.5) : 0.2, s, rull: fas(s, 2.0, 3.0) });
  if (s > 1.6 && s < 2.2) gnista(RULLE[0] + 40, RULLE[1] - 50, 34 * (1 - fas(s, 1.7, 2.2)));
  musStar(sx, { hopp, sq, fil });
  kanin({ iBil: true, uttryck: hett(s, true), tunga: 0.7, pose: flaktPose(s, hett(s, true)), rikt: lerp(-0.3, 0.3, ease(kl01((1100 - sx) / 500))) }); viggla(s);   // fortfarande het tills vattnet kommer
  kaninDy(-6 * studs(s * 1.9)); rosig(0.85); blanka(1, s); tar2(1, s);
  kamera(1, 960, 540); };

// 09d: musen sprutar: en skur, en båge upp som bryts i droppar och regnar över dem båda (inte i ansiktet), stänk där de landar;
// strålen stängs av rent på slutet. En regnbåge tittar fram.
ANIM['09d'] = (u, s) => { korscen(); bilSkugga();
  regnbage(0.85 * fas(u, 0.45, 0.85));
  pol(430, fas(s, 0.9, 2.3)); pol(1230, fas(s, 1.3, 2.7));
  bil({});
  const hopp = 10 * studs(s), paw = musPaw(MS, hopp);
  slang(paw, { sving: 0.35, s });
  musStar(MS, { hopp, fil: MUS_UPP, lut: 3 * Math.sin(s * 5) });
  const sval = fas(s, 0.85, 1.35);   // regnet når henne: från het till lättad och glad på en halv sekund
  kanin({ iBil: true, uttryck: mixa(hett(s, true), blanda('neutral', 'fnissig', 1), sval), tunga: 0.7 * (1 - sval), pose: mixa(flaktPose(s, hett(s, true)), { ...blandaPose('neutral', 'hurra', 1), armar: [70 + 8 * studs(s), 70 + 8 * studs(s)] }, sval), rikt: -0.2 });
  if (sval < 1) viggla(s); kaninDy(-22 * studs(s) * sval - 6 * studs(s * 1.9) * (1 - sval), 1 + 0.03 * studs(s) * sval);
  rosig(0.85 * (1 - fas(s, 0.9, 2.4))); blanka(1 - sval, s); tar2(1 - sval, s);
  strale(paw[0], paw[1] - 50, 130, fas(s, 2.85, 3.25), fas(s, 0, 0.3), s);
  if (s < 0.5) for (let i = 0; i < 6; i++) { const k = kl01((s - i * 0.04) / 0.4); if (k > 0 && k < 1) droppe(paw[0] + (i - 2.5) * 40 * k, paw[1] - 60 - 160 * k + 220 * k * k, 0.8); }   // skuren när den sätter igång
  if (s > 0.4) regn(s - 0.4, { slut: 2.5 });
  kamera(1); };

// 10a: "Ahh, så skönt!" sjunker nöjd ner, tassarna på magen, kinderna vanliga igen; några droppar rinner av, ett hjärta
ANIM['10a'] = (u, s) => { korscen(); bil({});
  { const k = ease(fas(s, 0, 1.2)); kanin({ iBil: true, uttryck: 'somnig', pose: grepp('somnig', lerp(78, -6, k)), rikt: 0 }); } kaninDy(30 * fas(s, 0, 1.2) + 4 * Math.sin(s * 2.2)); rosig(0);
  [[760, 0.0], [1010, 0.6], [690, 1.3]].forEach(([x, d]) => { const k = (s - d) / 1.3; if (k > 0 && k < 1) droppe(x, 250 + 420 * k * k, 0.9); });
  [[1080, 1.2], [1000, 2.4]].forEach(([x, d]) => { const k = (s - d) / 2; if (k > 0 && k < 1) hjarta(x + 30 * Math.sin(k * 6), 380 - 230 * k, 1.5 * pop(k * 3), 1 - fas(k, 0.7, 1)); });
  narZoom(lerp(1.8, 1.92, ease(u))); };

// 10b: "Ett äpple till dig – och ett till mig! Nam, nam!" ett äpple flyger över till musen, ett till kaninen, en tugga
// samtidigt, och på "nam, nam" zoomar kameran in nära på tungan
ANIM['10b'] = (u, s) => { korscen(); bilSkugga(); bil({});
  const nam1 = 4.7, nam2 = 5.22, bitt = (s > nam1) + (s > nam2);
  const tunga = Math.max(0, 1 - Math.abs(s - nam1 - 0.12) / 0.22, 1 - Math.abs(s - nam2 - 0.12) / 0.22, fas(s, 5.4, 5.6));
  const mh = s > 1.6 && s < 2.2 ? 30 * Math.sin(Math.PI * (s - 1.6) / 0.6) : 6 * studs(s);
  musStar(MS, { hopp: mh, fil: s > 1.6 ? MUS_UPP : MUS });
  // rattassen håller äpplena: lyfts lite och visar fram (0.15), kastar upp till musen (0.75), tar nästa (1.6), slänger upp det till munnen (3.4)
  let a = RATT; [[74, 0.15, 0.45], [100, 0.75, 0.92], [74, 1.6, 1.95], [104, 3.4, 3.62], [RATT, 4.3, 4.8]].forEach(([v, t0, t1]) => { a = lerp(a, v, ease(fas(s, t0, t1))); });
  const ut10 = tunga > 0.1 ? { ...blanda('neutral', 'jatteglad', 1), mun: [21, 15, 0, 458] } : 'glad', ua = uArm(ut10);
  kanin({ iBil: true, uttryck: ut10, tunga, pose: { ...POSE0, armar: [a - ua[0], 10 - ua[1]] }, rikt: lerp(0.2, -0.2, ease(fas(s, 1.5, 1.9))) }); viggla(s, 5);
  const mun = munnen(), tp = tass(0), hand = [tp[0], tp[1] - 34], m = musPaw(MS, mh);
  // äpple 1: dyker upp vid tassen (0.3), flyger i en båge över till musens tass (0.9–1.6)
  const f1 = fas(s, 0.9, 1.6);
  aepple(lerp(hand[0], m[0], f1), lerp(hand[1], m[1] - 20, f1) - 300 * Math.sin(Math.PI * f1), 92 * pop((s - 0.3) / 0.35), { bett: bitt });
  if (s > 0.3 && s < 1.0) gnista(hand[0] + 70, hand[1] - 70, 26 * pop((s - 0.3) / 0.3) * (1 - fas(s, 0.7, 1.0)));
  // äpple 2: "och ett till mig" (1.9), upp till munnen (3.6–4.3)
  const f2 = fas(s, 3.6, 4.3);
  if (s > 1.9) aepple(lerp(hand[0], mun[0] + 62, f2), lerp(hand[1], mun[1] + 30, f2), 92 * pop((s - 1.9) / 0.35), { bett: bitt, sq: s > nam1 && s < nam1 + 0.2 ? 0.92 : 1 });
  if (s > 1.9 && s < 2.6) gnista(hand[0] + 70, hand[1] - 70, 26 * pop((s - 1.9) / 0.3) * (1 - fas(s, 2.3, 2.6)));
  const z = fas(s, 4.35, 4.95);
  kamera(lerp(1, 2.8, z), lerp(960, mun[0] + 20, z), lerp(540, mun[1] + 10, z)); };

// ---- tagning 7: mellanspelet är bara ca 12 s. Bild 09b, 10a och 10b är borta; de andra spelar sin rörelse från tagning 4
// lite fortare (s räknas om till den gamla bildlängden). Ljuden flyttas på samma sätt, och ljud i borttagna bilder faller bort.
const GAMMAL = { '08a': [0, 2.4], '08b': [2.4, 2.5], '08c': [4.9, 0.6], '09a': [5.5, 3.7], '09b': [9.2, 4.2], '09c': [13.4, 3.5], '09d': [16.9, 3.5], '10a': [20.4, 4.6], '10b': [25.0, 5.7] };
for (const [id, [, L]] of Object.entries(GAMMAL)) { const f = ANIM[id]; ANIM[id] = u => f(u, u * L, L); }
const flyttaLjud = T => { const A0 = T['08a'][0], ut = [];
  for (const c of LJ) { const id = Object.keys(GAMMAL).find(i => c.t >= GAMMAL[i][0] && c.t < GAMMAL[i][0] + GAMMAL[i][1]);
    if (!id || !T[id] || T[id][0] > T['09d'][0] + 1e-6 && id !== '09d') continue;
    const [g0, gL] = GAMMAL[id], k = (T[id][1] - T[id][0]) / gL;
    ut.push({ ...c, t: T[id][0] - A0 + (c.t - g0) * k, langd: c.langd && c.langd * k }); }
  return ut; };

// ---- efter varje bild: parallax på förgrunden, mjuk bakgrund vid inzoomning; ljuden läggs till ----
const P = 1.12;
function efter() {
  const m = ($('kamera').getAttribute('transform') || '').match(/translate\(([-\d.e]+) ([-\d.e]+)\) scale\(([-\d.e]+)\)/);
  const [tx, ty, z] = m ? m.slice(1).map(Number) : [0, 0, 1];
  const z2 = 1 + (z - 1) * P, f = (t, c) => c - z2 * (c + ((c - t) / z - c) * P);
  $('fram2k').setAttribute('transform', `translate(${f(tx, 960)} ${f(ty, 540)}) scale(${z2})`);
  const b = kl01((z - 1.3) / 0.8) * 2.2;
  $('bgmjuk-b').setAttribute('stdDeviation', b.toFixed(2));
  ['platta', 'bakom'].forEach(l => b > 0.05 ? $(l).setAttribute('filter', 'url(#bgmjuk)') : $(l).removeAttribute('filter'));
}
window.ready = window.ready.then(r => {
  const s0 = window.seek, A0 = ANIM.TIDER[window.SCEN[0]][0];
  window.seek = t => { $('fram2').innerHTML = ''; rosig(0); s0(t); efter(); };
  window.LJUD.push(...flyttaLjud(ANIM.TIDER).filter(c => c.t < window.DURATION));
  window.seek(0);
  return r;
});
})();
