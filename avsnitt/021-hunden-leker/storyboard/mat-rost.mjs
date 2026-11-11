// Mäter replikernas längder i ROST (rader.mjs) med ffprobe, när Malins filer finns i assets/ljud/roster/hunden-leker/:
//   node avsnitt/021-hunden-leker/storyboard/mat-rost.mjs
// Raderna räknar sina tider från längderna (L), så de flyttar med. Sätt UPPSKATTAD = false i rader.mjs när alla är mätta.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const fil = new URL('rader.mjs', import.meta.url), ROSTER = new URL('../../../assets/ljud/roster/hunden-leker/', import.meta.url);
let mätta = 0;
const s = readFileSync(fil, 'utf8').replace(/\['(\d\d-[a-z-]+)', [\d.]+\]/g, (m, n) => {
  try { const d = (+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', new URL(`${n}.m4a`, ROSTER).pathname])).toFixed(2); mätta++; return `['${n}', ${d}]`; }
  catch { return m; } });
writeFileSync(fil, s);
console.log(`${mätta} repliker mätta`);
