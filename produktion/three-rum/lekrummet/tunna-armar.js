// PROV (runda 3, 2026-11-23): tunna, böjbara kritarmar på en KOPIA av Kanel, bara i den här scenen. Kanels riktiga filer är
// låsta och orörda: riggen laddas som vanligt (v2-rigg.js), och här görs hennes målade armar osynliga i just den här sidans SVG.
// Riggen räknar fortfarande ut armarna som förut (vinkel, var handen är, var bollen sitter), och de nya armarna ritas ovanpå.
//
// Som referensens toon.ts (drawArm/curve/ik): varje arm är ETT tunt streck genom tre punkter (axel, armbåge, hand), en mjuk kurva,
// och en liten rund tumvante. Armbågen räknas med tvåbens-IK mot en "pol" ut och ner från axeln, så att den alltid böjer sig
// samma, naturliga väg (ner/utåt), aldrig bakåt. Inget släp, ingen fjäder, ingen tjock tub (det som avvisades i november).
//   const A = tunnaArmar(G, L, { bredd: 24 })     bredd i riggens enheter (huvudet ca 483 brett: 24 = 5 %, 34 = 7 %)
//   A.rita({ mal: { r: [dx, dy] }, k: { r: 0..1 } })  efter L.rita(): handen följer riggens (osynliga) hand, eller blandas mot ett
//   eget mål, en förskjutning från axeln i figurens enheter
const NS = 'http://www.w3.org/2000/svg';
// Runda 6 (ben: true): benen är också kritstreck (höft–knä–fot), ritade bakom kroppen. Foten står kvar på golvet när kroppen
// sjunker, så knät böjer sig utåt av sig självt. Benlängden är riggens (figuren är låst), bara lite längre så att knät alltid böjs.
export function tunnaArmar(G, L, { bredd = 24, ben = false } = {}) {
  const svg = G.ownerSVGElement, kanel = G.querySelector('.kanel'), kropp = kanel.querySelector('.kropp');
  // armfärgen: kroppens egen bruna (#ac6744 i kanel-body), så att roten smälter in i kroppen; kanten som figurens inbakade (ca 7 enheter vit)
  const FARG = '#ab6643', VANTE = '#97553b', VIT = 7, BEN = [88, 84];   // överarm, underarm (enheter)
  // kritkorn i strecken: ljusa prickar inne i strecket, som vaxkritan i pälsen
  svg.querySelector('defs').insertAdjacentHTML('beforeend', `<filter id="armkorn" x="-0.2" y="-0.2" width="1.4" height="1.4">
    <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 0.86  0 0 0 0 0.74  0 0 0 -2.6 1.25" result="prick"/>
    <feComposite in="prick" in2="SourceAlpha" operator="in" result="p2"/>
    <feComponentTransfer in="p2" result="p3"><feFuncA type="linear" slope="0.45"/></feComponentTransfer>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="p3"/></feMerge></filter>`);
  // runda 4 (Sanna: tjockare, ingen vit kant vid roten, inga händer): den vita kanten ligger BAKOM kroppen och syns bara
  // utanför den; det bruna strecket ligger FRAMFÖR kroppen i kroppens färg, så roten smälter in och kroppens kant inte korsar armen.
  // Armen slutar i strecket runda ände, ingen hand.
  const bak = document.createElementNS(NS, 'g'), fram = document.createElementNS(NS, 'g');
  bak.setAttribute('class', 'arm-kant'); fram.setAttribute('class', 'arm-farg');
  bak.innerHTML = ['l', 'r'].map(n => `<path class="${n}" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="${bredd + 2 * VIT}"/>`).join('');
  fram.innerHTML = `<g filter="url(#armkorn)">${['l', 'r'].map(n => `<path class="${n}" fill="none" stroke="${FARG}" stroke-linecap="round" stroke-width="${bredd}"/>`).join('')}</g>`;
  kanel.insertBefore(bak, kropp); kropp.after(fram);
  const benG = document.createElementNS(NS, 'g');
  if (ben) { bak.insertAdjacentHTML('beforeend', ['bl', 'br'].map(n => `<path class="${n}" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="${bredd + 2 * VIT}"/>`).join(''));
    benG.innerHTML = `<g filter="url(#armkorn)">${['bl', 'br'].map(n => `<path class="${n}" fill="none" stroke="${FARG}" stroke-linecap="round" stroke-width="${bredd}"/>`).join('')}</g>`;
    kanel.insertBefore(benG, kropp); }
  // de målade armarna (och deras kopior) syns inte i kopian; riggen flyttar dem fortfarande, så vi kan läsa var handen är
  const malade = [...G.querySelectorAll('image')].filter(i => (ben ? /^(arm|leg)-/ : /^arm-/).test(i.getAttribute('class') || ''));
  malade.forEach(i => i.setAttribute('visibility', 'hidden'));

  const pt = (m, x, y) => { const q = new DOMPoint(x, y).matrixTransform(m); return [q.x, q.y]; };
  const rel = (fran, till) => till.getCTM().inverse().multiply(fran.getCTM());   // fran:s egna enheter → till:s
  const synlig = (n, del = 'arm') => malade.filter(i => i.getAttribute('class') === del + '-' + n).find(i => i.getAttribute('display') !== 'none' && +(i.getAttribute('opacity') ?? 1) > 0.01)
    || malade.find(i => i.getAttribute('class') === del + '-' + n);
  // tvåbens-IK: armbågen på den sida av axel–hand-linjen som ligger närmast polen (ut och ner från axeln)
  const ik = (S, H, pol, [a, b] = BEN) => { let dx = H[0] - S[0], dy = H[1] - S[1]; const d0 = Math.hypot(dx, dy) || 1;
    const d = Math.min(Math.max(d0, Math.abs(a - b) + 1), a + b - 0.5), ux = dx / d0, uy = dy / d0;
    const x = (a * a - b * b + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a * a - x * x)), mx = S[0] + ux * x, my = S[1] + uy * x;
    const e1 = [mx - uy * h, my + ux * h], e2 = [mx + uy * h, my - ux * h];
    const E = Math.hypot(e1[0] - pol[0], e1[1] - pol[1]) < Math.hypot(e2[0] - pol[0], e2[1] - pol[1]) ? e1 : e2;
    return [E, [S[0] + ux * d, S[1] + uy * d]]; };   // handen når aldrig längre än armen
  return {
    bredd,
    // o.mal[n] = handens mål i figurens 1024-ruta (som riggen), o.k[n] = hur mycket det målet gäller (annars riggens hand)
    rita(o = {}) {
      const mK = kropp.getCTM ? rel(kropp, kanel) : null, mitt = pt(mK, 512, 600);
      for (const [n, sida] of [['l', -1], ['r', 1]]) {
        const img = synlig(n), m = rel(img, kanel), [px, py] = L.RIGG['arm-' + n], [hx, hy] = L.HAND[n];
        const P = pt(m, px, py); let H = pt(m, hx, hy);
        // axeln en bit in i kroppen (ingen stump syns), polen ut och ner
        const v = [mitt[0] - P[0], mitt[1] - P[1]], lv = Math.hypot(...v) || 1, S = [P[0] + v[0] / lv * 42, P[1] + v[1] / lv * 42 - 6];
        // eget mål: en förskjutning från axeln (följer kroppens lutning och andning), blandat in med k
        if (o.mal?.[n] && o.k?.[n]) { const M = [S[0] + o.mal[n][0], S[1] + o.mal[n][1]], k = o.k[n]; H = [H[0] + (M[0] - H[0]) * k, H[1] + (M[1] - H[1]) * k]; }
        const [E, H2] = ik(S, H, [S[0] + sida * 160, S[1] + 170]);
        const C = [2 * E[0] - (S[0] + H2[0]) / 2, 2 * E[1] - (S[1] + H2[1]) / 2];   // kontrollpunkt så att kurvan går genom armbågen
        const d = `M${S[0].toFixed(1)} ${S[1].toFixed(1)} Q${C[0].toFixed(1)} ${C[1].toFixed(1)} ${H2[0].toFixed(1)} ${H2[1].toFixed(1)}`;
        svg.querySelectorAll(`.arm-kant .${n}, .arm-farg .${n}`).forEach(q => q.setAttribute('d', d));
      }
      if (ben) for (const [n, sida] of [['l', -1], ['r', 1]]) {
        const img = synlig(n, 'leg'), m = rel(img, kanel), [px, py] = L.RIGG['leg-' + n];
        const S = pt(m, px, py), F = pt(m, px + sida * 6, 947); F[1] = Math.min(F[1], 947);   // foten aldrig under golvet
        const lang = 0.56 * (947 - py), [E, F2] = ik(S, F, [S[0] + sida * 200, (S[1] + F[1]) / 2], [lang, lang]);
        const C = [2 * E[0] - (S[0] + F2[0]) / 2, 2 * E[1] - (S[1] + F2[1]) / 2];
        const d = `M${S[0].toFixed(1)} ${S[1].toFixed(1)} Q${C[0].toFixed(1)} ${C[1].toFixed(1)} ${F2[0].toFixed(1)} ${F2[1].toFixed(1)}`;
        svg.querySelectorAll(`.b${n}`).forEach(q => q.setAttribute('d', d));
      }
    },
  };
}
