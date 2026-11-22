# Armrörelserna: ARMROR (2026-11-22)

Sanna 22/11: "rigs of arms often hard to get right … we need polish rigs so it's more easy to get right and work the same."
Every scene used to write its own `vinka` with its own number (021 Hugo 38, 051 Lova 62, 050 Kanel 80, 036 Hugo 92, 046/049/039 Kanel 150).
The pose's `armar` number is an angle **relative to the arm picture's rest**, and that rest points differently per rig
(Kanel −45°, Lova −38°, Zebbe −50°, Bulle −60° in screen), so the same number gives a different arm on every animal.
At 150, Lova's arm was hidden behind her head (J24 feedback).

`ARMROR` in `verktyg/rigg-motor.js` works in **screen angles** instead, computed from the figure's own measurements:
shoulder `RIGG['arm-l'|'arm-r']`, paw/grip `HAND.l|r` and body ellipse `RORELSE.lagga.kropp`.
**Height (höjd)** = the arm's angle above horizontal, outward from the shoulder: 0 straight out, 90 straight up, about −45 at rest.

Rules held (do not change without Sanna): straight one-piece arms, no bend, no lag/overshoot (memory "armar i en bit");
a raised arm goes behind the body (`fram 0`) and out past its edge, never hidden behind the head (memory "vinkande arm bakom kroppen");
calm (one sway speed, small lean); figures never turn.

## API

All take and return `[ansikte, pose]` (like `nicka`/`skakaHuvud`) and lay on top of what the figure already does (walk, expression).
`k` 0–1 blends the move in; `ARMROR.inUt(tl, d, r = 0.4)` gives a k that rises over r s at the start and falls at the end.
In scenes: `const L = await v2rigg('kaninen-kanel'); const A = L.ARMROR;` (exported by `produktion/youtube/shorts/godnatt/v2-rigg.js`).

| Preset | Call | What it does |
|---|---|---|
| vinka | `A.vinka(f, p, tl, k, { hand })` | arm behind the body, height 30° ± 16°, 1.3 sways/s, body leans 1.5° ± 1.2° with it. Right hand by default. If the paw would not clear the body at the top of the sway (short arms), the height is lowered automatically until it does |
| peka | `A.peka(f, p, mal, k, { hand })` | `mal = [x, y]` in the figure's 1024 frame (feet at `FOTTER`). The arm on that side points there, height kept within `HAND.peka` (default −30 … 40), eyes go there, body leans 1.5° that way |
| räkna fram | `A.rakna(f, p, tl, mal[], k, { tider, hand })` | points at each thing in turn at `tider` (default 0.4 + 1 s each; put them on the voice), the arm glides to the next one over 0.35 s, a small nod and a 6° arm tap on each count. Show the numbers at `tider` |
| plocka upp | `A.plockaUpp(tl, d, o)` / `A.laggaNer(tl, d, o)` | `plockaDel` with the figure's own bend poses: `o.fri [x, y, v]` where the thing lies, `o.fram` = from a table in front (`HAND.bord`), else the floor beside (`HAND.golv`). Hand chosen by the side it lies on. d ≈ 2.2 s. Needs `sakIn(fig, sak)` first |
| bära | `A.bara(f, p, k, { hand, fram })` | carry what is in the hand: beside (arm `HAND.bara`, default 10°, out from rest so the thing clears the legs) or `fram` = in front of the tummy (`sakFramVag`, k 0 → 1 moves it there). Apply after the walk (`steg`) so the arm stays still while walking |

Helpers: `A.hojd(n, A)` pose angle → screen height · `A.tass(n, h)` paw point at height h · `A.fri(n, h)` does the whole paw show outside the body · `A.vinkTal(n)` the figure's wave [height, sway] · `A.satt(f, p, i, h, k)` set one arm to a screen height.

```js
// a scene: walks in carrying the ball, waves hello
const [f1, p1] = L.steg(tl, 1, 1);                       // walking
let [f, p] = A.bara(f1, p1, 1);                           // ball in the left paw, arm still
[f, p] = A.vinka(f, p, tl, A.inUt(tl - 2, 2.5));          // waves with the right
L.rita(G, f, p);
```

## Per-figure numbers live in the rig, not the scene

In `HAND` in `uttryck.html` (all optional; defaults above):
`vinka: [höjd, sving]` · `peka: [lägst, högst]` · `bara: grader` · plus the existing `l`, `r` (grip = paw centre in the arm picture),
`kant`, `byte`, `fram`, `mun`, `golv`, `bord`. A figure without `byte`/`fram` (Lova) gets Kanel's numbers.

**Rigs with a hidden zone** (`GOM { fran, till }`: Zebbe, kon, grisen, ugglan, pandan, apan, dinosaurierna … ): between those pose angles
(26–80) the rig slides the arm behind the body on purpose, so arms never "fly". A wave swinging through it made the zebra's arm slide in
and out with only the hoof peeking (Sanna 22/11, "zebra wave look odd"). `ARMROR` now lifts the wave so the whole swing stays above
`GOM.till`, and `peka` snaps to the nearest edge of the zone.

Computed wave on today's rigs (all clear the body at 46°, so all wave at 30° ± 16°; in old pose numbers):
Kanel 75, Lova 68, Ludde 75, Hugo 75, Zebbe 80, Bulle 90. That matches the approved hand-tuned waves (050 Kanel 80, 051 Lova 62).

**A new figure** needs a correct `HAND.l/r` (measure: the paw's centre, ~0.8 of the way from the pivot to the arm picture's farthest pixel)
and `RORELSE.lagga.kropp`. Check with the test sheet, `?prick=1` draws the grip point on each paw.

## Test sheet

`verktyg/prov/armar.html`: six figures (kaninen, leoparden, lammet, hunden, zebran, björnen) do each preset at the same time,
110 s: vinka 0–4.5, peka 4.5–9.5, räkna 9.5–14.1, plocka 14.1–20.5, bära 20.5–27.5. `?t=` shows one frame, `?prick=1` the grip points.
```bash
node verktyg/rigg-video.mjs /verktyg/prov/armar.html "" 110 <scratchpad>/armar.mp4 1600
node .claude/skills/lk-figur/scripts/stills.mjs "verktyg/prov/armar.html" <scratchpad>/armar.jpg 1.2 6.5 8.5 12 15.8 17.5 22 26.5
```
Known gap: Alma's `HAND` is a copy of Ludde's and her arm pictures point up at rest, so she is left out until her grip is measured.

# Stunder: STUNDER, expressions and small body moves by name (2026-11-22)

Sanna 22/11: "more movements and face expressions to enhance characters". `STUNDER` in `verktyg/rigg-motor.js` (exported as `L.STUNDER`)
gives each one by name on every v2 figure. It is built only from what all rigs have: the expressions `glad`, `forvanad`, `nyfiken`,
`tanker`, `ledsen`, `fnissig`, `somnig` and the poses `lutaH`, `lutaV`, `blyg`, `ner`, `sitter`. Faces stay drawn in code via the figure's
own `UTTRYCK`. `STUNDER.namn(tl, d)` returns `[ansikte, pose]`, fading in and out within d. Calm: lifts ≤ 20 px, no turning, arms barely move.

| Name | Face | Body |
|---|---|---|
| `glad` | glad | one small nod at 0.5 s |
| `forvanad` | förvånad, quick 0.25 s in | body stretches a little, ears up |
| `nyfiken` | nyfiken (head tilt, eyes to the side) | leans right (`lutaH`) |
| `fundersam` | tänker (eyes up) | leans left, slow 0.4 Hz head rock |
| `blyg` | new: half glad, eyes down to the side, lids a little down, full cheeks | `blyg` pose + slow side-to-side sway 0.5 Hz |
| `ledsenLite` | half ledsen | looks down a little, one small sigh |
| `fnissig` | fnissig | shoulders shake a little (4 Hz, tiny) |
| `somnig` | sömnig | head droops slowly and lifts, ears hang |
| `nicka` | glad | two nods (`nicka`) |
| `lutaHuvud(tl, d, sida)` | a little nyfiken | head and body tilt, sida 1 right / −1 left |
| `titta` | nyfiken, eyes down-front | leans forward from the feet to look at something |
| `studs` | glad | two soft 18 px lifts with a small crouch before |
| `satta` / `resa` | glad | sits down / stands up (`sattaSig`, the figure's own numbers) |
| `jublar` | jätteglad | arms up (`hurra`), one small 16 px lift, tail wags |
| `ivrig` | ivrig | leans forward, rocks softly on its toes, tail wags |
| `ah` | kawaii (delighted) | paws in on the tummy, slow sway |
| `skrattar` / `mums` / `usch` / `stolt` | the engine's existing moments (skrattDel, mumsDel, uschDel, stoltDel), now by name | |
| `oj` | förvånad in 0.2 s | a small hop back, leans back, ears up, calms down. Surprised, not scared |
| `gaspar` | sömnig | round mouth opens wide (förvånad's mouth scaled up, at the figure's own mouth height), stretches a little |
| `blinkar` | glad → wink | head tilts a little |
| `lyssnar(tl, d, sida)` | a little nyfiken, eyes to the side | `lyssnar` pose, ear toward the sound |
| `nej` | a little thoughtful | soft head shake (`skakaHuvud`), not cross |
| `tack` | glad | small bow: nods down from the feet, tail wags |
| `letar` | a little nyfiken | eyes go one way then the other, head follows 0.25 s later. Never turns |
| `trostad` | ledsen lite → glad | a sigh, then happy again (problems get solved), tail wags at the end |

**Tail:** every happy moment wags the tail (`glad`, `studs`, `jublar`, `ivrig`, `ah`, `skrattar`, `mums`, `blinkar`, `tack`, `trostad`), using the
figure's own dance wag (`RORELSE.svansDans`, default 8°) at 2 wags/s (Sanna 22/11, "wiggle tail at happy").

Face only, no body: `blanda('neutral', STUNDER.ansikte('blyg'), k)` (`fundersam` → `tanker`, `ledsenLite` → half `ledsen`).
Combine with arms: `A.vinka(...STUNDER.glad(tl, 3), tl, k)`. `STUNDLISTA` lists the names in order.
The test sheet `verktyg/prov/armar.html` shows them after the arm presets, 27.5–110 s (`stunder-kontaktark.jpg`).
