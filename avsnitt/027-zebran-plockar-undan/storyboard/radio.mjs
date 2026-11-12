// Bygger radions musik för 027: ../ljud/radio-musik.m4a (scenens tid PA → AV), liten radio-klang (hög- och lågpass),
// full volym mellan replikerna och 8 dB lägre under Malins repliker och barnets pauser (tiderna i radio-tider.mjs).
// Topparna: ca −13 dBFS fullt och −21 dBFS nedtonat, alltså ca 18 dB under Malins toppar (−3 dBFS). Scenen spelar filen
// med vol 2.5 (= gånger 1 i render.mjs). Kör om när rader.mjs ändras:  node radio.mjs  (från storyboard/)
import { execFileSync } from 'node:child_process'; import { mkdirSync } from 'node:fs'; import { dirname, join, resolve } from 'node:path'; import { fileURLToPath } from 'node:url';
import { MUSIK, SLAG0, SLAG, PA, AV, SANKT, RAMP } from './radio-tider.mjs';
const HAR = dirname(fileURLToPath(import.meta.url)), ROT = resolve(HAR, '../../..'), UT = join(HAR, '../ljud/radio-musik.m4a');
const FULL = -12.9, NER = 8;   // dB på källan (gissa-bad topp −1,7 dBFS → −11,3; stada-radion −3,2 → −9,8; Midtempo Bloom −0,1 → −12,9)
// Midtempo Bloom (Mureka) är längre än radiodelen: hela låten från första slaget, ingen slinga (stream_loop gör inget då),
// tonas ut de sista 2 s när radion slås av. (stada-radion, 94 s, behövde en slinga på 128 slag.)
const SLINGA = 600, TMP = join(HAR, '../ljud/.radio-slinga.wav');
const f = v => v.toFixed(3), d = AV - PA;
const D = SANKT.map(([a, b]) => `clip((t-${f(a - PA - RAMP)})/${RAMP},0,1)*clip((${f(b - PA + RAMP)}-t)/${RAMP},0,1)`).join('+') || '0';
mkdirSync(dirname(UT), { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', f(SLAG0), '-t', f(SLINGA), '-i', join(ROT, MUSIK), '-af', `afade=t=in:d=0.01,afade=t=out:st=${f(SLINGA - 0.01)}:d=0.01`, TMP].map(String));
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-stream_loop', '-1', '-i', TMP, '-t', f(d),
  '-af', `highpass=f=220,lowpass=f=5000,volume='pow(10,(${FULL}-${NER}*min(1,${D}))/20)':eval=frame,afade=t=in:d=0.15,afade=t=out:st=${f(d - 2)}:d=2`,
  '-c:a', 'aac', '-b:a', '160k', UT].map(String));
execFileSync('rm', [TMP]);
console.log(UT, f(d), 's,', SANKT.length, 'nedtoningar');
