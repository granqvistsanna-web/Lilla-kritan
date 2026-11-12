// Radion i 027 (Sanna 2026-11-11: "add a radio playing music to make städa more fun"). Tiderna räknas ur rader.mjs, så att
// scenen (noterna, gungningen, leksakerna landar på takten) och radio.mjs (musikfilen med nedtoningen) är överens.
// Scenens t = 0 är rad 01a. Musiken: assets/ljud/musik/stada-radion.m4a (Städa-radion, instrumental, ca 104,9 BPM, första slaget
// 0,505 s, slag 0,5722 s), redan betald och nedladdad; vald 2026-11-12 framför den lånade gissa-bad (SLAG0 0.17, SLAG 0.6) för att den
// är gjord för städningen och har jämn takt utan sång (ingen ny musik, Sanna).
import { RADER, L } from './rader.mjs';

let acc = 0;
const RAD = RADER.filter(r => r.id !== '00').map(r => { const s = acc; acc += r.d; return { ...r, s }; });
const Rd = Object.fromEntries(RAD.map(r => [r.id, r]));

export const MUSIK = 'assets/ljud/musik/stada-radion.m4a', SLAG0 = 0.505, SLAG = 0.5722;
// på: med ett klick i början av rad 4d, efter "En radio! Vi kan lyssna på en låt!" (kritan har ritat radion); av: strax före hej då
export const PA = Rd['4d'].s + 0.3, AV = Rd['20'].s - 0.5;
// nedtoning: under Malins repliker och barnets pauser (rad 13: leta bollen, rad 16: rulla tillbaka)
const r13 = Rd['13'], r16 = Rd['16'];
const rader = RAD.flatMap(r => (r.malin || []).filter(([n]) => n).map(([n, o]) => [r.s + o - 0.15, r.s + o + L(n) + 0.25]));
const pauser = [[r13.s + 0.3 + L(19), r13.s + r13.d], [r16.s + 0.3 + L(22), r16.s + 0.3 + L(22) + 4.0]];
export const SANKT = [...rader, ...pauser].filter(([a, b]) => b > PA && a < AV).sort((x, y) => x[0] - y[0])
  .reduce((ut, [a, b]) => { const s = ut.at(-1); if (s && a <= s[1] + 0.4) s[1] = Math.max(s[1], b); else ut.push([a, b]); return ut; }, []);
export const RAMP = 0.25;
const kl = (k, a = 0, b = 1) => Math.max(a, Math.min(b, k));
// 0 = full volym, 1 = nedtonad
export const sankt = t => Math.max(0, ...SANKT.map(([a, b]) => kl((t - a + RAMP) / RAMP) * kl((b + RAMP - t) / RAMP)));
export const spelar = t => t >= PA && t < AV;
// takten i scenens tid (musiken startas så att ett slag faller på PA)
export const fas = t => (t - PA) / SLAG;
export const nastaSlag = t => PA + Math.ceil((t - PA) / SLAG - 1e-6) * SLAG;
