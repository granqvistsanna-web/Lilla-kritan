// Klistermärken i Lilla Kritan (skillen klistermarken): en siffra, en bokstav eller en sak på ett runt klistermärke som slås upp på sitt ord.
// Förlagor: märket och rörelsen från 013 Röda sångens disco (dekal(), slagUpp(); som 005:s), siffran i krita från 063 Hösten i boken
// (Sanna 2026-11-28: "make numbers in stickers look better", "look at stickers from disco scene red song – animation and design visual").
// Kräver verktyg/kritan-ritar.js (ritBana, ritfart) före den här filen. Ger SVG-strängar i skärmens px (#ov 1920 × 1080 eller en 2D-scen).
//
//   klistermarke(t, { x, y, d, t0, t1, siffra | drag + mitt | bild + hb, skiva, linje, tilt, gung, gnistor })
//   Utseendet: 063 (vit kant enligt vita-kanter runt en ljust gyllene platta, mjuk skugga, siffran i krita); rörelsen: 013:s disco.
//     x, y    märkets mitt i px när det sitter      d  märkets diameter i px (med den vita kanten)
//     t0      ordet: märket landar och fastnar (faller in 0,18 s före), siffran/bokstaven ritas 0,4 s från t0
//     t1      borta: allt tonas ut de sista 0,3 s
//     siffra  '1', '2' eller '3' (färdiga banor, 063)
//     drag    egna banor i en 100 × 140-ruta (bokstav, annan siffra), mitt = banornas mitt i x
//     bild    en urklippt sak (url) i stället för linjen; hb = höjd/bredd (standard 1)
//     skiva   plattans färg innanför den vita kanten: standard ljust gyllene (063), får följa avsnittets färger (013 '#FCE4E2')
//     tilt    grader, varje märke lite snett (013: −5, 4, −4, 5)          gung  lugnt gung medan det sitter (013: ja)
//     gnistor tre små gula gnistor runt märket när det landar (standard ja)
//
// Siffrorna nedan är godkända. Ändra dem här, inte i avsnitten.

const MARKE = {
  R: 80,                                            // märkets egna enheter (diameter 160)
  KANT_BAS: 3, KANT_ANDEL: 0.01,                    // vit kant i bild = 3 px + 1 % av märkets höjd, som alla klistermärken (vita-kanter; Sanna 28/11 "add rim to the sticker")
  VAG: 2,                                           // kantens lätt handklippta vågighet (feDisplacementMap, i märkets enheter)
  SKIVA: '#F6DC94',                                 // ljust gyllene platta (063); får följa avsnittets färger, den vita kanten är alltid kvar
  SKUGGA: 'rgba(70,45,20,0.22)', SKUGGA_XY: [3.4, 5.7], SKUGGA_BLUR: 2,   // mjuk skugga snett nedåt höger (063)
  LINJE: '#6B3F1D', BRED: 10,                       // siffrans/bokstavens kritlinje, i märkets enheter (063: 1,5 × KRITAN.BRED = 18 px på ett 290 px-märke)
  ANDEL: 0.64, BILD: 0.8,                           // siffran ca 64 % av märket, en sak ca 80 % av plattan
  FALL: 0.18, FALL_PX: 46, RIT: 0.4, UT: 0.3,       // sekunder; FALL_PX i skärmens px vid 160 px märke
};

const MARKE_SIFFROR = {   // samma banor som 063 och 065, i en 100 × 140-ruta; mitt = siffrans mitt i x
  1: { drag: ['M30 38 L56 14 L56 128'], mitt: 43 },
  2: { drag: ['M20 46 C20 6 88 4 86 46 C84 78 40 96 18 128 L90 128'], mitt: 54 },
  3: { drag: ['M22 26 C44 4 90 12 82 44 C77 64 52 68 44 68 C62 68 92 76 86 102 C80 136 30 136 16 112'], mitt: 53 },
};

const _mk01 = x => Math.max(0, Math.min(1, x));

// 013:s slagUpp: faller in ovanifrån och krymper till rätt storlek, landar och trycks ihop mot underkanten, vickar till och lugnar sig
function markeSlag(q) {
  if (q < 0) { const k = _mk01(1 + q / MARKE.FALL); return { dy: -MARKE.FALL_PX * (1 - k * k), rot: 10 * (1 - k), sx: 1.15 - 0.15 * k, sy: 1.15 - 0.15 * k }; }
  const s = Math.exp(-q * 9) * Math.cos(q * 28);
  return { dy: 0, rot: 5 * Math.exp(-q * 6) * Math.sin(q * 26), sx: 1 + 0.12 * s, sy: 1 - 0.14 * s };
}
// 013:s poppa: gnistorna växer fort, står en stund och krymper bort (L sekunder)
const markePoppa = (q, L = 0.5) => q < 0 || q > L ? 0 : q < 0.08 ? 1.15 * q / 0.08 : q < 0.16 ? 1.15 - 0.15 * (q - 0.08) / 0.08 : 1 - (k => k * k * (3 - 2 * k))(_mk01((q - L + 0.12) / 0.12));
const _stj = (x, y, r) => `M${x} ${y - r}Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y}Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r}Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y}Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z`;

const MARKE_DEFS = `<filter id="mk-kant" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${MARKE.VAG}"/></filter>`
  + `<filter id="mk-skugga" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${MARKE.SKUGGA_BLUR}"/></filter>`;

function klistermarke(t, { x, y, d, t0, t1 = Infinity, siffra, drag, mitt = 50, bild, hb = 1, skiva = MARKE.SKIVA, linje = MARKE.LINJE, tilt = 0, gung = true, gnistor = true }) {
  const q = t - t0;
  if (q < -MARKE.FALL || t > t1) return '';
  const { R } = MARKE, s = d / (2 * R), op = _mk01((t1 - t) / MARKE.UT), u = markeSlag(q), f = v => (+v).toFixed(2);
  if (gung && q > 0) { u.rot += 1.2 * Math.sin(1.9 * t + x * 0.01); u.dy += 3 * Math.sin(1.9 * t + x * 0.01); }   // lugnt gung, inte i takt med något
  const KANT = (MARKE.KANT_BAS + MARKE.KANT_ANDEL * d) / s;   // i märkets enheter
  if (siffra) ({ drag, mitt } = MARKE_SIFFROR[siffra]);
  let inne = '';
  if (bild) { const b = 2 * (R - KANT) * MARKE.BILD / Math.max(1, hb), h = b * hb;
    inne = `<image href="${bild}" x="${f(-b / 2)}" y="${f(-h / 2)}" width="${f(b)}" height="${f(h)}"/>`; }
  else if (drag) { const k = 2 * R * MARKE.ANDEL / 140;   // linjen ritas streck för streck i kritans vaxkrita (ritBana)
    inne = `<g transform="scale(${f(k)}) translate(${-mitt} -70)">`
      + ritBana(drag, ritfart(q / MARKE.RIT), { t, attr: `fill="none" stroke="${linje}" stroke-width="${f(MARKE.BRED / k)}" stroke-linecap="round" stroke-linejoin="round"` }).html + '</g>'; }
  let h = `<g opacity="${f(op)}" transform="translate(${f(x)} ${f(y + u.dy * s)}) rotate(${f(tilt + u.rot)}) scale(${f(s)}) translate(0 ${R}) scale(${f(u.sx)} ${f(u.sy)}) translate(0 ${-R})">`
    + `<defs>${MARKE_DEFS}</defs>`
    + `<circle cx="${MARKE.SKUGGA_XY[0]}" cy="${MARKE.SKUGGA_XY[1]}" r="${R}" fill="${MARKE.SKUGGA}" filter="url(#mk-skugga)"/>`
    + `<circle r="${R}" fill="#fff" filter="url(#mk-kant)"/><circle r="${f(R - KANT)}" fill="${skiva}"/>${inne}</g>`;
  if (gnistor && q >= 0 && q < 0.5) { const p = markePoppa(q), rr = d / 2;   // tre gnistor snett runt märket (013)
    [[-1, -1], [1, -0.6], [0.8, 1]].forEach(([a, b], j) => { const gx = x + a * (rr + 22 * s), gy = y + b * (rr + 10 * s), r = 16 * s * p;
      if (r > 0.5) h += `<g transform="rotate(${j * 20} ${f(gx)} ${f(gy)})" opacity="${f(op)}"><path d="${_stj(gx, gy, r)}" fill="#F2C94C" stroke="#fff" stroke-width="${f(3 + 0.16 * r)}" stroke-linejoin="round" paint-order="stroke"/><path d="${_stj(gx, gy, r * 0.5)}" fill="#FFF7D6"/></g>`; }); }
  return h;
}

if (typeof window !== 'undefined') Object.assign(window, { MARKE, MARKE_SIFFROR, klistermarke, markeSlag, markePoppa });
