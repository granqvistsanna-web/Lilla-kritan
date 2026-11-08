# Kolasåsen (plask och klick)

Två klistermärken av gyllene kolasås i tjock vaxkrita med vit kant, till kolasåshavet i 007:s refräng. **Plasket** är en rund krona av kola med fem mjuka flikar och fyra droppar som flyger upp; det poppar upp där lastbilen landar på "plask" (c). **Klicken** är en mjuk kolaklick med en snurrad topp och en droppe; den skvätter upp ur havet och landar på Bulles nos på "Kola på nosen" (f). Före dem var båda ritade i kod (Sanna 2026-11-06: de ska vara målade som resten).

**Valda bilder (2026-11-06):** `assets/rekvisita/kolasas/plask-v1.png` → `cut/plask.png` (bbox 67, 135, 972, 885) och `klick-v1.png` → `cut/klick.png` (bbox 84, 109, 942, 938), 18 px kant. Papperet gjordes vitt och lösa prickar togs bort före urklippet.

```prompt
A single splash of golden caramel sauce drawn by a toddler with chunky wax crayons on rough paper: a soft rounded splash crown seen from the side, five chubby rounded lobes rising in an arch from a flat bottom edge, plus four or five round caramel droplets flying up and out above it. Heavy rich wax crayon texture: mottled golden caramel and amber orange layered in visible crayon strokes, slightly darker amber streaks, paper grain showing through as tiny light specks, a couple of short creamy-white crayon shine marks. Extremely simple bold shapes for 2-year-olds, all rounded, nothing pointy, no black outline, only a thin chalky white rim around every shape. No text, no face. Plain pure white background, no shadow.
```

```prompt
A single small blob of thick golden caramel sauce drawn by a toddler with chunky wax crayons on rough paper: one soft lopsided rounded dollop, a little wider than tall, with a gentle rounded peak curling over on top and one fat round drip hanging down from one side. Heavy rich wax crayon texture: mottled golden caramel and amber orange layered in visible crayon strokes, slightly darker amber streaks, paper grain showing through as tiny light specks, one short curved creamy-white crayon shine mark on top. Extremely simple bold shape for 2-year-olds, no black outline, only a thin chalky white rim around the edge. No text, no face. Seen straight on. Plain pure white background, no shadow.
```

**Plask v2 (2026-11-08, art direction v2):** Sanna valde båda tagningarna A och B. `assets/rekvisita/kolasas/original/plask-v2-a.jpg` → `cut/plask-v2-a.png` (bred krona med sju flikar och åtta droppar på en vågig pöl, bbox 70, 127, 976, 889) och `plask-v2-b.jpg` → `cut/plask-v2-b.png` (pöl med två krullande vågor, en pelare i mitten och åtta droppar, bbox 28, 58, 934, 889). 1024-ruta med pölens botten centrerad på ca (520, 870), så att de passar `scale(0.36) translate(-520 -870)` precis som `plask.png`. Kanten är konstens egen, ca 16 px (klippt innanför den grå klipplinjen). `plask.png` ligger kvar orörd. Tagning C (samma stil som v1 plus ett litet plask) valdes inte.

Prompt för tagning A (Flow, Nano Banana Pro, referens `plask-v1.png`):

```prompt
A big joyful splash of thick golden caramel, drawn with chunky mottled wax crayon on paper, as a single cut-out sticker. A wide rounded splash crown seen from the side rising from a flat wavy base: six or seven chubby rounded tongues of caramel leaping up and outward in a fan, the middle ones tallest, each tip ending in a fat round blob, plus six round caramel droplets of different sizes flying up and out above and around it. Flat golden caramel colour (#E8A63A) with soft mottled crayon grain, a slightly darker amber crayon edge low down, and a few short creamy light-cream crayon shine strokes on the tongues. Flat colour, no shading, no 3D, no black outline. A thin even clean white sticker rim around every shape, droplets included. Simple bold rounded shapes for toddlers, nothing pointy. No text, no face. Plain pure white background, no shadow.
```

Prompt för tagning B:

```prompt
A big bouncy caramel splash shaped like a blooming flower of liquid, drawn with chunky mottled wax crayon on paper, as a single cut-out sticker. From a flat low puddle-shaped base, two big curling rounded waves of golden caramel arc out to the left and right, and a tall round column of caramel shoots up in the middle topped with a fat round drop just breaking free. Seven round caramel droplets of different sizes fly up and outward in an arc. Flat golden caramel colour (#E8A63A) with soft mottled crayon grain, a slightly darker amber crayon edge low down, short light-cream crayon shine strokes. Flat colour, no shading, no 3D, no black outline. A thin even clean white sticker rim around every shape, droplets included. Simple bold rounded shapes for toddlers, nothing pointy. No text, no face. Plain pure white background, no shadow.
```
