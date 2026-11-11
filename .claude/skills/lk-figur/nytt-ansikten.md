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
