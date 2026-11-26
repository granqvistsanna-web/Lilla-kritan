# Orange fågeln (v2)

En orange sjöfågel, en liten mås, som glider från sidan med nosen åt höger (speglas när den flyger åt vänster), i art direction v2: lång smal kropp i varm guldorange (`#F7A23B`), gul näbb, liten kluven stjärt och en lång vinge i djupare orange (`#E9822A`) som flaxar i kod. Platt kritfyllning, ingen kontur, vit klistermärkeskant. Ögat ritas i kod. Orange sak 2 i 006 (pip, pip, pip).

Gjord i Google Flow (Nano Banana Pro, 1:1, 0 krediter) 2026-11-26 för 006 Orangea sången v2. Sanna valde tagning 2 av två (`original/fagel-orange-v2-val.jpg`). Referenser: v1-fågeln (`assets/bakgrunder/sjon-saker/fagel-orange.png`, design) och `apelsin-v2` (stil). Kroppen utan vinge är Flows redigering av samma bild (tagning 1, `original/fagel-orange-v2-utan-vinge.jpg`; tagning 2 fick en puckel på ryggen).

**Filer:**
- `cut/fagel-orange-v2.png`: hela fågeln, beskuren, 9 px kant.
- `delar/` i 1024-rutan: `fagel-kropp.png`, `fagel-vinge.png` (vingen = originalet minus kroppen, med en rot i vingens färg 35 px ner bakom kroppen), `fagel-hel.png` och `fagel-rigg.json` (vingens vridpunkt (514, 613), ögat (818, 655), bbox). Kroppen och originalet ligger pixelrätt (IoU 0,99 under kroppens mittlinje).
- **Flax** som v1: vingen trycks ihop i höjdled runt vridpunktens y, scaleY 1 (uppe, som ritad) till 0,3, ca 2 gånger/s. Kontroll: `avsnitt/006-orange-baten/v2/kontroll-fagel-flax.jpg`.

Används i: 006 v2.

```prompt
Image 1 is the DESIGN reference: the same orange sea bird gliding, same shape, seen from the side. Image 2 is a STYLE reference only: copy its drawing technique exactly (soft premium toddler picture-book look, flat even wax-crayon fill with fine paper grain and soft crayon strokes, only a faint slightly darker crayon edge, no dark outline, no 3D shading, a clean even white sticker border around the whole silhouette), not its subject. Draw ONE cute orange sea bird like a little gull, gliding, seen exactly from the side, flying to the right, completely flat: a long slim soft streamlined body in a warm golden orange (#F7A23B), NOT a round ball, a small pointed sunny yellow beak at the right end, a neat small forked tail at the left end, and one long narrow wing in a slightly deeper orange (#E9822A) rising from the middle of its back in a gentle upward curve and tapering to a soft rounded tip, clearly separate from the head. No legs, no eye, no face, no water, no text. Centered, the bird fills about 80 percent of the frame width, plain pure solid white background, no shadow, no ground.
```

Kroppen utan vinge (image2image på bilden ovan):

```prompt
Image 1 is the exact source: redraw the SAME picture pixel for pixel, same size, same position, same colours, same crayon texture and same white sticker border, with only one change: the long darker orange wing on the back is completely removed. Where the wing was, the bird's back is simply the smooth continuous golden orange body (#F7A23B) with its soft curved top edge and the white sticker border following that edge. Keep the yellow beak, the forked tail and the body shape exactly as they are. No wing, no stump, no eye, no face, no legs, no text. Plain pure solid white background, no shadow.
```
