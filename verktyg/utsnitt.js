// Kameran för de fyra utsnitten i format/bildutsnitt.md. Ger [zoom, cx, cy] i plattans px (1920 × 1080, zoom kring cx, cy).
// fig: { x, golv, kropp } = figurens mitt, fötternas y och kroppshöjd (utan öron) i plattan, vid zoom 1.
// tx: var figuren ska stå i sidled (0.33, 0.5, 0.67). Standard: vänster tredjedel om figuren står till vänster, annars höger.
const UTSNITT = { hel: [0.40, 0.84], halv: [0.60, 0.95], nara: [1.15, 1.21] };   // [kroppshöjd / H, fötternas y / H]

function utsnitt(typ, fig, tx, W = 1920, H = 1080) {
  const [mal, g] = UTSNITT[typ];
  const zoom = Math.max(1, mal * H / fig.kropp);
  tx = tx ?? (fig.x < W / 2 ? 1 / 3 : 2 / 3);
  const vw = W / zoom, vh = H / zoom, kl = (v, a, b) => Math.min(b, Math.max(a, v));
  return [zoom, kl(fig.x + (0.5 - tx) * vw, vw / 2, W - vw / 2), kl(fig.golv + (0.5 - g) * vh, vh / 2, H - vh / 2)];
}

if (typeof module !== 'undefined') module.exports = { utsnitt, UTSNITT };
