# New faces: arg and ledsen on every rig, then mums, laugh, usch, crying, proud (2026-11-11)

Sanna: "roll arg and ledsen out to every rig, then add mums, a laugh, usch, crying and proud." Approved step by step on 2026-11-11.
Fold this into `SKILL.md` when the sibling branches are merged. Shared code is in the engine section `// ---------- Känslor ----------`
(end of `verktyg/rigg-motor.js`); the faces themselves are data in each `uttryck.html` (`UTTRYCK`).

## Part 1: arg and ledsen (26 engine rigs; Fia has her own copy of the code and was not touched)

**arg (angry, grumpy, never scary).** One parameter set, the owl's: `titt [0,2]`, `lock [0.22,0.22]`, `bryn 1`, `brynY [9,9]` (brows down),
`brynV -22` (inner ends down), `kind 1` (red cheeks), `le -0.9`, `leBred 0.7`, `oron [10,10]` (ears back), `armar [-6,-6]`, `strack 0.98`.
Every rig shares the same face coordinates (eyes about (418,402) and (601,401), rx 17–20, ry 25–29), so the same numbers fit; check a close-up
anyway. What differs by kind of face:
- Snout, muzzle, nose (dog, pig, cow, zebra, bear, lion, leopard, fox, mouse, hedgehog, rabbit, lamb, monkey, panda, dinos, frog, cat, human): the frown is `le` under the nose.
- Beak with a drawn mouth (owl, chick): `le` bends the beak seam. Beak with a baked smile (duck, Agda): `le`, `leBred` and `streck` do nothing, the face reads through brows, lids, cheeks and wings. A frowning duck beak needs new art.
- Trunk (elephant): the trunk's little hook bends down; the ears move less (`ORA 0.4`).
- Panda (Pim): brows are drawn in the dark line colour and vanish on the dark eye patches, so `arg` uses heavier lids (`lock 0.3`) and `ledsen` `lock 0.14`. Pale brows on the patches would help every face with brows, but change old faces.
- Cat (Kaj): keeps `trumpen` (sulky, looks away) as its own face and its `stampar` pairing; `arg` is extra.
- `PAR` (the pose sheet) pairs `stampar` with `arg` on every rig except the cat. Poses are untouched.

**ledsen (sad, retuned on 25 rigs; the owl keeps the values Sanna approved).** Old: smaller eyes, brows down 4. It read as worried or cranky at phone size.
New: `titt [0,6]`, `ogonS [1.05,1.05]` (bigger, pleading eyes), `lock [0.08,0.08]`, `brynY [-4,-4]`, `brynV 30`, `kind 0.55`, `le -0.65`, `leBred 0.6`, `oron [28,28]`, `armar [-6,-6]`, `luta 2`, `strack 0.97`.
Anything that blends `ledsen` (the `skaka` loop, episode scenes that load the rig live, such as 027 sovrummet) now shows the new look.

**Shared helpers (engine, `Känslor`).** `ledsenDel(tl, d = 3)` looks down and sighs (the owl's sad beat), `argDel(tl, d = 3)` is the grumpy face with two stomps. Both fade in and out, use only `ledsen`/`arg` and the poses `ner`/`stampar` that every rig has. `kanslorRorelser()` gives loops `?rorelse=ledsen` and `?rorelse=arg` (3.6 s); a rig adds `...kanslorRorelser(),` first in `const ROR = {`, and `ledsen`/`arg` to the `NAMN` labels. In a film: `[3, tl => ledsenDel(tl)]`.

**Proof (2026-11-11).** `ryck.mjs` over all 26 rigs: no hit from this round (the new loops are clean). Three hits are in HEAD too and untouched: Disa `?film=1` 21.82 s and Elsa `?film=1` 26.20 s (a blink releasing while the happy arcs fade in, hidden by the arcs, the same class as the known Hugo/Lage one), Humle `?film=1` (no film).
Before/after: `svg.outerHTML` hashes of 26 rigs, 13,803 states (every face at k 1 and ½, every pose, every standard move at 40 times, 120 film frames), `HEAD` against the working tree with the old `ledsen` and the old `stampar` pairing put back: all identical, except Humle's `?film=1`, which has no film and draws the face sheet, now with one more cell (`arg`).

## Part 2: mums, skrattar, usch, gratar, stolt (all 26 engine rigs)

**Names and what each is.** Keys are in every rig's `UTTRYCK`; `?bara=<key>` shows one, the default sheet shows all.
- `mums` (yum): closed happy arcs, cheeks up, a small open mouth and a tongue that licks the corner. The bear had a `mums` without a tongue; it keeps its mouth and gets the tongue. Move `ROR.mumsa` (2.8 s loop: two licks, sweeping from out to the side up toward the upper lip and back, a small nod). Helper `mumsDel(tl, d)`.
- `skrattar` (laugh): closed arcs, big open mouth, cheeks up, ears up, arms up. Generalised from the bear's `skrattar` under the same name; the mouth is the rig's own `jatteglad` mouth × 1.36 wide, × 1.5 open. Move `ROR.skratta` (1.6 s loop: three "ha" per loop, the body stretches 1.4 % and the arms lift 3° on each, the mouth widens a little, no bounce). Helper `skrattDel(t)`. No teeth in the laugh, on purpose: `flinar`/`gapar` stay the brushing-song faces.
- `usch` (yuck): eyes squeezed (`lock 0.8`), brows low and together (steeper than `arg`), small open mouth with the tongue hanging out and wiggling, ears back. Move `ROR.usch` (3 s: head shake, tongue wiggle). Helper `uschDel(tl, d)`. Snout or nose wrinkling is not drawn (the muzzle art is baked in).
- `gratar` ("gråter", crying): sad face, bigger eyes looking down, brows high in the middle, a glossy tear film under each eye, one light-blue drop per eye with a white rim that runs down toward the cheek and fades (the two drops are half a cycle apart), a small wobbly downward mouth. Sad, not distressed. Move `ROR.grata` (4 s loop: drops every 2 s, the mouth quivers at 2.25 Hz, three soft sobs). Helper `gratDel(t)`.
- `stolt` (proud): existed everywhere as happy arcs (it looked like `jatteglad`). Now: big sparkling eyes (`kawaii 0.7`) with half-lowered lids looking a little up, brows lifted, small smile, red cheeks; rigs without the `kawaii` parameter use `ogonS 1.2` (Hugo, Kanel, Kaj, Ludde, Lage, Agda) or `ogonS 1.28 + glans 1` (Humle, Pip). New pose `stolt` (chest out `strack 0.05`, chin up `upp 0.55`, a little wider, wings out), paired in `PAR`. Move `ROR.stolt` (3.6 s). Helper `stoltDel(tl, d)`. The owl film is `?kanslor=1` (all five in the forest, 17.7 s).

**New parameters (every rig's `NEUTRAL`)**: `tungan: [0, 0, 0]` [length 0–1, sideways −1…1 over the half mouth width, direction in degrees from straight down, + to the right, 180 = up] and `tar: [0, 0.3]` [tears 0–1, phase 0–1 for the drop on its way down; the other eye is half a cycle ahead]. All faces share them, so they blend like the rest. `kansloRita(fig, f)` in the engine draws them (a `.kanslor` group inside `.drag`, created the first time something shows, `display none` otherwise).

**To add them to a new rig** (copy Ulla's or Rut's `uttryck.html` and do the same):
1. `NEUTRAL`: add `tungan: [0, 0, 0], tar: [0, 0.3]`. 2. `UTTRYCK`: copy `mums`, `skrattar`, `usch`, `gratar`, `stolt` from a rig of the same kind; set the mouth numbers from the rig's own `jatteglad` (`mun [rx, ry, d, cy]`: `mums` rx×0.37, ry×0.45, d 0; `skrattar` rx×1.36, ry×1.5, d 1; `usch` [12, 14, 0, cy of forvanad]). 3. `POSER`: add `stolt`; `PAR`: `stolt: 'stolt'`. 4. `rita()`: `kansloRita(fig, f);` on the line before `huvud(fig, p);`. 5. `ROR`: `...kanslorRorelser(),` first (it adds the five loops only for faces the rig has), and the labels in `NAMN`. 6. Look at close-ups of all five.
**What to measure.** The engine reads most of it from the rig: eyes from `OGON`, cheeks from `KINDER`, eye half height from `OGONR[1]` (else 25; set `const KANSLOR = { ogonRy }` when the eyes are bigger, Gurra), the mouth from the bounding box of `.mun` when it is open and `.le` otherwise. If the tongue starts in the wrong place, set `const MUNPUNKT = [x, y, half width]`. Tongue and tear sizes: `KANSLOR = { tungaB, tungaL, tarB }`. Check that the default `?`-less sheet still fits (more than 18 faces switches the 6-wide pages to four tighter rows; two-row pages go to three rows when there are more faces than fit).

**Sheets.** The default face sheet and `?ark=poser` ran out of room with more faces and poses (they were already past the page for 19+ poses). Now: 6-wide pages use four tighter rows above 18 faces, two-row pages use three rows when needed, Bulle's sheet is nine wide, and the pose sheet goes nine wide above 18 poses.

**Proof.** `ryck.mjs` over all 26 rigs: nothing new (the three older hits stay). It found two real problems in the new loops while building them (a tongue direction and tear phase that wrapped, a blink switched on and off while the eyes turned into arcs) and both are fixed. Before/after (`svg.outerHTML` hashes, HEAD before Part 2 against the working tree with the old `stolt` put back and the five new faces left out): 26 rigs, 14,279 states: every old face at k 1 and ½, every pose, every standard move at 40 times, 120 film frames, the tooth faces `gapar` and `flinar`, the borsta move, and `?prov=borsta` at zoom 1.6 and `mun`; all identical except Humle's `?film=1` (no film; the face sheet now has more faces). The new faces are not covered by that comparison, they were checked by eye on contact sheets (whole figure, close-up, phone size).

## Rigs where a face does not read well, and what it would need
- **Duck (Agda):** the smile is baked into the beak art, so `ledsen`, `arg` and `gratar` keep a smiling beak (they read through brows, lids, tears and wings); `mums`/`usch` show the tongue through the beak gap, fine. Needs a beak with a code-drawn mouth line (or a frowning beak variant).
- **Elephant (Elsa):** no visible mouth, the trunk hook is the mouth, so `mums` and `usch` poke the tongue out through the trunk, which reads odd. Needs a mouth under the trunk (or the tongue dropped for her).
- **Dinos (Blå, Disa, Röd), bee (Humle), ladybird (Nicke), frog (Gurra):** very small mouths, so the `mums` tongue sometimes floats without a visible mouth. A slightly bigger mouth in `mums` would fix it.
- **Panda (Pim):** the brows vanish on the dark eye patches (`arg`, `ledsen`, `usch`, `gratar` read through lids, cheeks and mouth); the happy arcs are low contrast on the patches too. Needs pale brows and arcs on the patches (changes every face with brows, so not done).
- **Owl (Ulla) and chick (Pip):** a small beak, so the laugh is a modest gap and a dark mouth.
- **No face has wrinkled noses:** the snout and muzzle art is baked, so `usch` is eyes, brows, tongue and ears.
- **Fia** has her own copy of the code and has none of the new faces or `arg`/`ledsen` retune.
