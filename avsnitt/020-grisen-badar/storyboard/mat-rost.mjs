// Mäter om replikernas längder i ROST (rader.mjs) med ffprobe, t.ex. efter en ny tagning med samma filnamn:
//   node storyboard/mat-rost.mjs
// Raderna i tagning 3 räknar sina tider från längderna (L), så de flyttar med.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const fil = new URL('rader.mjs', import.meta.url), ROSTER = new URL('../../../assets/ljud/roster/grisen-badar/', import.meta.url);
const s = readFileSync(fil, 'utf8').replace(/\['(\d\d-[a-z-]+)', [\d.]+\]/g, (m, n) => {
  try { return `['${n}', ${(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', new URL(`${n}.m4a`, ROSTER).pathname])).toFixed(2)}]`; }
  catch { return m; } });
writeFileSync(fil, s);
