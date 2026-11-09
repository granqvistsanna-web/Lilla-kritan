// v2-riggen för godnattsagorna, hämtad direkt ur figurens assets/karaktarer/<mapp>/premium/uttryck.html (samma utsnitt som
// avsnitt/007-bruna-ladbilen/scener/gor-v2.py: från "const RIGG" till slutet av "const ROR"), så att sagan alltid har samma
// rigg, ansikte och poser som karaktärsarket. Kräver /verktyg/blinka.js före.
//   const L = await v2rigg('lammet-ludde')
//   const g = L.figur(x, y, skala, parent)        fötterna i (x, y)
//   L.rita(g, ansikte, pose)                      ansikte = L.blanda('neutral', 'somnig', k) …, pose = L.blandaPose(…)
//   L.ROR.klappa(t) …, L.param(namn), L.FOTTER, L.RIGG, L.POSE0, L.NEUTRAL
async function v2rigg(mapp) {
  const bas = `/assets/karaktarer/${mapp}/premium/`, rader = (await (await fetch(bas + 'uttryck.html')).text()).split('\n');
  // från "const RIGG", eller "const GOM" när den står före (kons armar som göms bakom kroppen)
  const a = rader.findIndex(r => r.startsWith('const RIGG') || r.startsWith('const GOM')), r0 = rader.findIndex(r => r.startsWith('const ROR'));
  const b = rader.findIndex((r, i) => i > r0 && r.startsWith('};')) + 1;
  const kod = rader.slice(a, b).join('\n')
    .replaceAll('href="cut/', `href="${bas}cut/`)
    .replace(/^function figur\(x, y, skala\) \{/m, 'function figur(x, y, skala, parent) {')
    .replace("document.querySelectorAll('#figurer > g').length", `'${mapp}-' + (v2rigg.nr = (v2rigg.nr || 0) + 1)`)
    .replace("document.getElementById('figurer').appendChild(g);", 'parent.appendChild(g);');
  return new Function(`const mjuk = k => k * k * (3 - 2 * k);\n${kod}
    return { figur, rita, blanda, blandaPose, param, UTTRYCK, NEUTRAL, POSER, POSE0, ROR, RIGG, FOTTER };`)();
}
