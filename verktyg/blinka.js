// Blinkning för v2-riggarna (uttryck.html). En script-tagg, sedan i riggen:  const blinka = skapaBlinka(frö);  f = blinka(f, t)
// - Locket stänger snabbt (2 rutor), är stängt 1 ruta och öppnas långsammare (ca 4 rutor), inte av och på.
// - Ojämn takt: 2,4–5 s mellan blinkningarna, ibland en dubbelblinkning. Bestämd av fröet, så samma film varje rendering.
// - Eget frö per figur, så att två figurer i samma bild inte blinkar samtidigt.
// - Ögat blir en aning lägre när det stänger. Ingen blinkning när ögonen är glada bågar eller sover; ett sömnigt lock
//   (lock 0,66) går ner därifrån och tillbaka dit.
function skapaBlinka(fro = 1) {
  let s = (fro * 7919) % 233280;
  const slump = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const tider = [];
  for (let t = 0.6 + 1.8 * slump(); t < 900; t += 2.4 + 2.6 * slump()) {
    tider.push(t);
    if (slump() < 0.15) tider.push(t += 0.3);
  }
  const kurva = d => {
    if (d < 0 || d > 0.25) return 0;
    if (d < 0.067) return (d / 0.067) ** 2;          // stänger, accelererar
    if (d < 0.1) return 1;                            // stängt
    return (1 - (d - 0.1) / 0.15) ** 2;               // öppnar, saktar in
  };
  return (f, t) => {
    if ((f.sov || 0) > 0.5 || Math.max(...(f.glad || [0])) > 0.5) return f;
    let d = -1;
    for (const b of tider) { if (b > t) break; d = t - b; }
    const k = kurva(d);
    if (!k) return f;
    return { ...f, lock: f.lock.map(l => l + (1 - l) * k), ogonS: [f.ogonS[0] * (1 + 0.03 * k), f.ogonS[1] * (1 - 0.06 * k)] };
  };
}
