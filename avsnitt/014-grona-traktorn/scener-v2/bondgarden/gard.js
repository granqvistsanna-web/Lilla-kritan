// Bondgården v2 (014 v2, 10–14h): rummet, bänken och ärtvalvet i kod. Scenens koordinater 1920 × 1080.
// Gul vägg #F6C21C och vitt golv i kod; ladans dörr och höet är PLATSHÅLLARE ur v1-plattan (lager/dorr-v1.png, lager/ho-v1.png)
// tills Sannas v2-bilder finns (bildlista.md, v2). Ärtskidan ritas i kod (feedback 26/11, 1:49 "better peas in a pod drawing").
import { $, lagg, f1, lerp, kl, mjuk, HAR } from '../kit.js';

export const VAGG = 700;                 // väggens nederkant (golvets början)
export const BANK = { x0: 800, x1: 1720, sits: 740, tjock: 34, fot: 880 };   // sitsens överkant y 740, benen ner till golvet y 880
export const PLATS = { lova: 975, pip: 1255, gurra: 1535 };                   // var de sitter på bänken (x); feedback 26/11: glesare, ingen sitter i en annan
export const S = 0.5;                    // figurernas skala (v2, alla lika stora)
export const STA = 960;                  // fötterna när de står på golvet framför bänken
export const SITT = 790;                 // fötterna (riggens FOTTER) när de sitter på bänken (sitter-posen)
export const VALV = { a: 770, b: 1750, topp: 330, krona: 70, fot: 880 };
const GUL = '#F6C21C', GUL_M = '#E0AC0A', GOLV = '#FBF7EE', TRA = '#9A6535', TRA_M = '#6E4524';
const RANKA = '#3F8F3A', BLAD = '#6CBF55', SKIDA = '#86CF6E';
const SKID = '/assets/rekvisita/artskida/cut/';
export const SKIDA_BILD = { stangd: SKID + 'artskida-stangd.png', tom: SKID + 'artskida-tom.png', arta: [1, 2, 3].map(i => `${SKID}artskida-arta-${i}.png`) };   // PLATSHÅLLARE (v1)
export const ARTA_MITT = [[397, 476], [550, 469], [702, 460]];   // artskida-rigg.json, i skidans 1024-ruta
export const SKIDA_MITT = [505, 528];

// rummet: väggen med kritkorn, golvet, dörren och höet
export function rum() {
  $('platta').innerHTML = (`<rect width="1920" height="${VAGG}" fill="${GUL}"/>
    <rect width="1920" height="${VAGG}" fill="${GUL_M}" opacity="0.55" filter="url(#tygkrita)"/>
    <rect y="${VAGG}" width="1920" height="${1080 - VAGG}" fill="${GOLV}"/>
    <path d="M0 ${VAGG} H1920" stroke="#C9A227" stroke-width="5" opacity="0.6"/>
    <!-- PLATSHÅLLARE: ladans dörr ur v1-plattan -->
    <image href="${HAR}bondgarden/lager/dorr-v1.png" x="${1260 - 175}" y="${VAGG - 560}" width="350" height="566"/>
    <!-- PLATSHÅLLARE: höet ur v1-plattan, till höger, den avskurna sidan mot bildens kant -->
    <image href="${HAR}bondgarden/lager/ho-v1.png" transform="translate(${1920 - 218 * 1.25} ${VAGG + 60}) scale(1.25) translate(0 -197)" width="218" height="197"/>`);
}
// bänken: sitsen och fyra ben, trä som vagnen, vit kant
export function bank(lager = 'bakom') {
  const { x0, x1, sits, tjock, fot } = BANK, ben = [x0 + 50, x0 + 230, x1 - 230, x1 - 50];
  lagg(lager, `<g stroke="#fff" stroke-width="10" paint-order="stroke" stroke-linejoin="round">
    ${ben.map(x => `<rect x="${x - 18}" y="${sits + 10}" width="36" height="${fot - sits - 10}" rx="6" fill="${TRA_M}"/>`).join('')}
    <rect x="${x0}" y="${sits}" width="${x1 - x0}" height="${tjock}" rx="10" fill="${TRA}"/></g>
    <path d="M${x0 + 16} ${sits + 12} H${x1 - 16}" stroke="${TRA_M}" stroke-width="4" opacity="0.5"/>`);
}
// bänkens sits igen, framför figurerna som sitter på den (så att rumpan döljs), och benen
export const bankFram = () => bank('framfor');

// valvets linje (u 0–1): vänstra stolpen upp, böjen, högra stolpen ner
export const valvP = u => {
  const { a, b, topp, krona, fot } = VALV, ben = (fot - topp) / ((fot - topp) * 2 + (b - a) * 1.25);
  if (u < ben) return [a, lerp(fot, topp, u / ben)];
  if (u > 1 - ben) return [b, lerp(topp, fot, (u - 1 + ben) / ben)];
  const s = (u - ben) / (1 - 2 * ben), m = (a + b) / 2;
  return [(1 - s) ** 2 * a + 2 * s * (1 - s) * m + s * s * b, (1 - s) ** 2 * topp + 2 * s * (1 - s) * krona + s * s * topp];
};
// små skidor längs valvet (u-läge, sida ±1). nya: hur många av de extra skidorna som poppat ut (14g–14h), pop: senaste 0–1
const SMA = [0.12, 0.2, 0.3, 0.38, 0.62, 0.7, 0.8, 0.88];
const EXTRA = [0.16, 0.25, 0.34, 0.44, 0.56, 0.66, 0.75, 0.84];
const skidaLiten = ([x, y], v, k = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${k.toFixed(3)})">
  <path d="M0 0 C 6 26 4 48 -4 70 C -16 60 -20 26 0 0Z" fill="${SKIDA}" stroke="#fff" stroke-width="5" paint-order="stroke"/>
  <path d="M-1 8 C 2 28 0 46 -4 62" stroke="${RANKA}" stroke-width="3" fill="none" opacity="0.6"/></g>`;
export function valv({ mogen = 1, nya = 0, gung = 0 } = {}) {
  const pts = Array.from({ length: 61 }, (_, i) => valvP(i / 60)), d = 'M' + pts.map(p => p.map(f1).join(' ')).join('L');
  let h = `<path d="${d}" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${RANKA}" stroke-width="18" stroke-linecap="round"/>`;
  // bladen: parvis längs rankan
  for (let i = 1; i < 30; i++) { const u = i / 30, [x, y] = valvP(u), s = i % 2 ? 1 : -1, v = (i * 47) % 60 - 30 + gung * 4 * Math.sin(i);
    h += `<ellipse cx="${f1(x + s * 22)}" cy="${f1(y + 6)}" rx="26" ry="15" transform="rotate(${f1(v + s * 30)} ${f1(x + s * 22)} ${f1(y + 6)})" fill="${BLAD}" stroke="#fff" stroke-width="5" paint-order="stroke"/>`; }
  SMA.forEach((u, i) => { const [x, y] = valvP(u); h += skidaLiten([x + (i % 2 ? 14 : -14), y + 10], (i % 2 ? -10 : 10) + gung * 6 * Math.sin(i + 1), 0.9); });
  EXTRA.forEach((u, i) => { if (i >= Math.ceil(nya)) return; const pop = i < Math.floor(nya) ? 1 : nya - Math.floor(nya);
    const k = pop < 1 ? 1.25 * Math.sin(Math.PI / 2 * kl(pop / 0.7)) - 0.25 * del01(pop, 0.7, 1) : 1, [x, y] = valvP(u);
    h += skidaLiten([x + (i % 2 ? -12 : 12), y + 12], (i % 2 ? 12 : -12) + gung * 6 * Math.sin(i + 3), 0.9 * k); });
  lagg('bakom', `<g filter="url(#boil)">${h}</g>`);
  if (mogen > 0) mogenSkida(MOGEN, -8, mogen);
}
const del01 = (k, a, b) => mjuk((k - a) / (b - a));
// den mogna skidan högst upp i valvet (stängd v1-skida, PLATSHÅLLARE), hänger i rankan
export const MOGEN = [1260, 150];
export const MOGEN_H = 230;   // skidans höjd i scenen (1024-rutan × 0,146)
// Ärtskidan i kod (feedback 26/11, 1:49 "better peas in a pod drawing"), i samma 1024-ruta som v1-bilden (SKIDA_MITT, ARTA_MITT),
// så att alla skalor står kvar. En böjd skida med spetsiga ändar och skaft med en liten klänge till vänster. Stängd: buktar över
// de tre ärtorna inuti, sömmen ovanpå. Öppen: den övre halvan uppfälld bakom, ljus insida, ärtorna i rad i skålen, främre kanten över deras nedre halva.
const SK = { farg: '#5FB03C', mork: '#3C8A2B', ljus: '#9BD86A', insida: '#D3F0A6' };
const skaft = `<g fill="none" stroke-linecap="round"><path d="M178 478 Q128 470 112 430 Q102 398 132 392" stroke="#fff" stroke-width="30"/>
  <path d="M178 478 Q128 470 112 430 Q102 398 132 392" stroke="${RANKA}" stroke-width="16"/><path d="M150 448 q-30 -6 -36 -32 q-4 -18 12 -22" stroke="${RANKA}" stroke-width="7" opacity="0.8"/></g>`;
const kritYta = (d, farg) => `<path d="${d}" fill="${farg}"/><path d="${d}" fill="${SK.mork}" opacity="0.28" filter="url(#tygkrita)"/>`;
export function mogenSkida([x, y], v = -8, syn = 1, lager = 'bakom', _bild, k = MOGEN_H / 1024) {
  const d = 'M172 482 C250 400 380 372 515 374 C650 372 790 404 862 470 C800 530 760 548 702 556 C660 600 600 604 550 568 C500 610 440 612 397 566 C330 590 260 560 172 482Z';
  lagg(lager, `<g opacity="${syn.toFixed(2)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${k.toFixed(4)}) translate(${-SKIDA_MITT[0]} ${-SKIDA_MITT[1]})">
    ${skaft}<path d="${d}" fill="#fff" stroke="#fff" stroke-width="26" stroke-linejoin="round"/>${kritYta(d, SK.farg)}
    ${ARTA_MITT.map(([ax, ay]) => `<path d="M${ax - 52} ${ay + 40} Q${ax} ${ay + 92} ${ax + 52} ${ay + 40}" fill="none" stroke="${SK.mork}" stroke-width="9" stroke-linecap="round" opacity="0.45"/>
      <ellipse cx="${ax - 18}" cy="${ay + 10}" rx="26" ry="14" fill="${SK.ljus}" opacity="0.8"/>`).join('')}
    <path d="M200 474 C330 404 700 396 836 466" fill="none" stroke="${SK.mork}" stroke-width="10" stroke-linecap="round"/>
    <path d="M260 450 C380 410 520 404 620 410" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.45"/></g>`);
}
// den öppna skidan: kvar = vilka ärtor som ligger kvar [1,1,1]; pop 0–1 lyfter ärtan ur skålen
export function oppenSkida([x, y], v = 0, k = 0.3, kvar = [1, 1, 1], lager = 'framfor', pop = [0, 0, 0]) {
  // feedback 26/11 (014-v2 1:49): ärtorna syntes knappt (samma ljusgröna som locket, främre kanten över halva ärtan). Nu: locket
  // visar sin ljusa insida med mörkgrön kant, ärtorna är mörkare och större och sitter högt, främre kanten täcker bara deras nederkant.
  const lock = 'M176 478 C250 312 420 262 520 276 C650 276 800 330 860 466 C780 430 640 418 515 420 C380 420 260 436 176 478Z';
  const fram = 'M170 474 C260 500 380 556 515 558 C650 556 770 500 864 464 C820 574 700 654 515 660 C330 654 210 574 170 474Z';
  let h = `${skaft}<path d="${lock}" fill="#fff" stroke="#fff" stroke-width="26" stroke-linejoin="round"/>${kritYta(lock, SK.insida)}
    <path d="${lock}" fill="none" stroke="${SK.farg}" stroke-width="24" stroke-linejoin="round"/>
    <path d="M250 440 C370 360 670 350 800 432" fill="none" stroke="${SK.ljus}" stroke-width="8" opacity="0.8" stroke-linecap="round"/>
    <path d="${fram}" fill="#fff" stroke="#fff" stroke-width="26" stroke-linejoin="round"/>
    <path d="M176 478 C260 436 380 420 515 420 C640 418 780 430 860 466 C770 500 650 556 515 558 C380 556 260 500 176 478Z" fill="#3F7F2A"/>`;   // skidans mörka insida bakom ärtorna
  ARTA_MITT.forEach(([ax, ay], i) => { if (!kvar[i]) return; const l = 90 * pop[i], cy = ay + 6 - l;
    h += `<g><circle cx="${ax}" cy="${f1(cy)}" r="80" fill="#fff"/><circle cx="${ax}" cy="${f1(cy)}" r="72" fill="#6DBE45"/><circle cx="${ax}" cy="${f1(cy)}" r="72" fill="#3C8A2B" opacity="0.3" filter="url(#tygkrita)"/>
      <path d="M${ax - 54} ${f1(cy + 32)} Q${ax} ${f1(cy + 82)} ${ax + 54} ${f1(cy + 32)}" fill="none" stroke="#3C8A2B" stroke-width="10" opacity="0.45" stroke-linecap="round"/>
      <circle cx="${ax - 24}" cy="${f1(cy - 26)}" r="17" fill="#fff" opacity="0.8"/></g>`; });
  h += `${kritYta(fram, SK.farg)}<path d="M200 486 C320 514 420 566 515 568 C610 566 720 514 834 478" fill="none" stroke="${SK.ljus}" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
    <path d="M300 606 C400 640 630 640 730 604" fill="none" stroke="${SK.mork}" stroke-width="8" stroke-linecap="round" opacity="0.4"/>`;
  lagg(lager, `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(v)}) scale(${k.toFixed(4)}) translate(${-SKIDA_MITT[0]} ${-SKIDA_MITT[1]})">${h}</g>`);
}
// en lös ärta (rund, ljusgrön, vit kant) med mitten i (x, y), radie r
export const arta = ([x, y], r = 18, lager = 'framfor') => lagg(lager, `<g transform="translate(${f1(x)} ${f1(y)})">
  <circle r="${r + 4}" fill="#fff"/><circle r="${r}" fill="#9ED86A"/><circle r="${r}" fill="#5FA03C" opacity="0.35" filter="url(#tygkrita)"/>
  <circle cx="${f1(-r * 0.35)}" cy="${f1(-r * 0.35)}" r="${f1(r * 0.25)}" fill="#fff" opacity="0.7"/></g>`);
