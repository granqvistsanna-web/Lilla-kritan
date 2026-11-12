// Renderar en kodscen i bitar, några åt gången, med avsnittets egen render.mjs (--fran/--till) och sätter ihop bilden.
//   node verktyg/render-delat.mjs <scenmapp> [--bitar 4] [--samtidigt 2] [flaggor till render.mjs: --snabb --en --staende …]
// Bitarna skrivs i en egen tillfällig mapp per körning, så två körningar krockar aldrig. Utfilen blir samma som render.mjs
// utan --fran/--till ger (t.ex. badet.mp4), utan ljud (-an) som i rendera.sh; sammanslagningen lägger ljudet. Den gamla
// filen flyttas först till <scenmapp>/aldre/. Effekt-wav:en skrivs om med --bara-ljud. Antalet bildrutor kontrolleras
// (fyra Chromium samtidigt tappade ibland bilder i 019, därför 2 åt gången som standard).
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync, rmSync, copyFileSync, mkdirSync, existsSync, renameSync } from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';
import { tmpdir } from 'node:os';

const args = process.argv.slice(2), dir = resolve(args.shift() ?? '');
const tal = (n, std) => { const i = args.indexOf(n); return i < 0 ? std : +args.splice(i, 2)[1]; };
const BITAR = tal('--bitar', 4), SAMTIDIGT = tal('--samtidigt', 2), R = join(dirname(dir), 'render.mjs');
const UT = args.includes('--ut') ? resolve(args.splice(args.indexOf('--ut'), 2)[1]) : undefined;   // annan utfil (test, molnet); då bara bilden, ingen effekt-wav
if (!existsSync(join(dir, 'index.html')) || !existsSync(R)) { console.error('användning: node verktyg/render-delat.mjs <scenmapp> [--bitar 4] [--samtidigt 2] [--snabb …]'); process.exit(1); }
if (args.includes('--snabb') && !readFileSync(R, 'utf8').includes("'--snabb'")) { console.error(`${R} har inget --snabb (003–005); kör utan`); process.exit(1); }

const { langd, fps, ut: std } = JSON.parse(execFileSync('node', [R, dir, ...args, '--langd'], { encoding: 'utf8' }).trim().split('\n').at(-1));
const ut = UT ?? std;
const frames = Math.round(langd * fps), gr = Array.from({ length: BITAR + 1 }, (_, i) => +(Math.round(i * frames / BITAR) / fps).toFixed(6));
const tmp = mkdtempSync(join(tmpdir(), `lk-${basename(dir)}-`)), del = i => join(tmp, `del-${i}.mp4`), t0 = Date.now();
const stada = () => rmSync(tmp, { recursive: true, force: true });
process.on('SIGINT', () => { stada(); process.exit(130); });

try {
  const kor = i => new Promise((ok, fel) => spawn('node', [R, dir, ...args, '--fran', gr[i], '--till', gr[i + 1], '--ut', del(i)], { stdio: ['ignore', 'ignore', 'inherit'] })
    .on('close', c => c ? fel(new Error(`bit ${i + 1} (${gr[i]}–${gr[i + 1]} s) felade`)) : (console.log(`bit ${i + 1}/${BITAR} klar`), ok())));
  let nasta = 0;
  await Promise.all(Array.from({ length: Math.min(SAMTIDIGT, BITAR) }, async () => { while (nasta < BITAR) await kor(nasta++); }));

  const lista = join(tmp, 'delar.txt'), hel = join(tmp, 'hel.mp4');
  writeFileSync(lista, Array.from({ length: BITAR }, (_, i) => `file '${del(i)}'`).join('\n'));
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lista, '-an', '-c', 'copy', '-movflags', '+faststart', hel]);
  const n = parseInt(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', hel], { encoding: 'utf8' }));   // skriver "1900,"
  if (n !== frames) throw new Error(`fel antal bildrutor: ${n}, väntade ${frames}. Gamla ${basename(ut)} är orörd.`);

  if (existsSync(ut)) { mkdirSync(join(dirname(ut), 'aldre'), { recursive: true }); renameSync(ut, join(dirname(ut), 'aldre',basename(ut, '.mp4') + '-' + new Date().toISOString().replace(/\D/g, '').slice(0, 12) + '.mp4')); }
  copyFileSync(hel, ut);   // copy, inte rename: tmp kan ligga på en annan volym
  if (!UT) execFileSync('node', [R, dir, ...args.filter(a => a !== '--snabb'), '--bara-ljud'], { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log(`${ut}: ${langd} s, ${n} bildrutor, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
} catch (e) { console.error(e.message); process.exitCode = 1; }
finally { stada(); }
