// Skriver bara ../scener/pulka/rader.json ur rader.mjs (samma som bygg.mjs gör först), utan stillbilder och animatik:
//   node avsnitt/039-kaninen-aker-pulka/storyboard/rader-json.mjs
import { writeFileSync } from 'node:fs';
import { RADER, ROST, ORD } from './rader.mjs';
const HAR = new URL('./', import.meta.url).pathname;
writeFileSync(HAR + '../scener/pulka/rader.json', JSON.stringify({ RADER: RADER.map(({ id, d, malin, ljud }) => ({ id, d, malin, ljud })), ROST: ROST.map(r => [r[0], r[2]]), ORD }));
