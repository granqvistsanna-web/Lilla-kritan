// v2-riggen för godnattsagorna, hämtad direkt ur figurens assets/karaktarer/<mapp>/premium/uttryck.html (samma utsnitt som
// avsnitt/007-bruna-ladbilen/scener/gor-v2.py: från "const RIGG" till slutet av "const ROR"), så att sagan alltid har samma
// rigg, ansikte och poser som karaktärsarket. Kräver /verktyg/blinka.js före.
//   const L = await v2rigg('lammet-ludde')
//   const g = L.figur(x, y, skala, parent)        fötterna i (x, y)
//   L.rita(g, ansikte, pose)                      ansikte = L.blanda('neutral', 'somnig', k) …, pose = L.blandaPose(…)
//   L.skakaHuvud(f, p, tl) / L.nicka(f, p, tl) / L.vila(f, p, t) → [f, p] (skakar på huvudet / nickar / ser sig omkring medan den väntar), L.ROR.klappa(t) …, L.param(namn), L.FOTTER, L.RIGG, L.POSE0, L.NEUTRAL
async function v2rigg(mapp) {
  const bas = `/assets/karaktarer/${mapp}/premium/`, rader = (await (await fetch(bas + 'uttryck.html')).text()).split('\n');
  // från "const RIGG", eller "const GOM" när den står före (kons armar som göms bakom kroppen)
  const a = rader.findIndex(r => r.startsWith('const RIGG') || r.startsWith('const GOM')), r0 = rader.findIndex(r => r.startsWith('const ROR'));
  const b = rader.findIndex((r, i) => i > r0 && r.startsWith('};')) + 1;
  // verktyg/rigg-motor.js först: det gemensamma (blanda-hjälparna, steg, klappNy, standardrörelserna) står där, inte i uttryck.html
  const motor = rader.some(r => r.includes('rigg-motor.js')) ? await (await fetch('/verktyg/rigg-motor.js')).text() : 'const mjuk = k => k * k * (3 - 2 * k);';   // Fia har kvar sin egen kod
  const kod = rader.slice(a, b).join('\n')
    .replace(/href="(cut[^/"]*)\//g, (_, d) => `href="${bas}${d}/`)   // cut/ och cut-tunn/ (Kanel, Bulle)
    .replaceAll("'../../../rekvisita/", "'/assets/rekvisita/")   // riggens saker (tandborsten): sökvägen är relativ rigg-sidan, inte scenen
    .replace(/^function figur\(x, y, skala\) \{/m, 'function figur(x, y, skala, parent) {')
    .replace("document.querySelectorAll('#figurer > g').length", `'${mapp}-' + (v2rigg.nr = (v2rigg.nr || 0) + 1)`)
    .replace("document.getElementById('figurer').appendChild(g);", 'parent.appendChild(g);');
  return new Function(`${motor}\n${kod}
    return { figur, rita, blanda, blandaPose, param, UTTRYCK, NEUTRAL, POSER, POSE0, ROR, RIGG, FOTTER, skakaHuvud, nicka,
      vila: typeof vila === 'function' ? vila : (f, p) => [f, p] };`)();   // vila: motorns liv i en figur som står och väntar (blicken, tyngden, ett öra)
}
