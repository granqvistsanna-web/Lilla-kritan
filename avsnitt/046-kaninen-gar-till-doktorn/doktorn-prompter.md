# Doktorn – Flow-prompter (grind 2, utkast)

Sanna 2026-11-20: doktorn får **mer mänskliga proportioner** (inte Mors ägg) och **en egen rigg** (skillen `lk-figur`). Därför: ett runt huvud på en kort hals, en kropp i rock, längre raka armar och ben med tydlig glipa, så att varje del kan klippas ut och riggas.

Google Flow, Nano Banana Pro, 1:1, 0 krediter (Sanna körde Flow själv), bild 1 = `assets/karaktarer/mamma-mor/premium/original/mor-platt.jpg` (bara stilreferens). Resultatet: [`karaktarer/doktorn-a.md`](../../karaktarer/doktorn-a.md) och [`doktorn-b.md`](../../karaktarer/doktorn-b.md), konsten i `assets/karaktarer/doktorn-{a,b}/premium/original/`.

## A – vit rock, turkos under, rött lockigt hår

```prompt
A kind, friendly grown-up doctor for a toddler picture book, drawn in EXACTLY the drawing technique of Image 1 (STYLE reference only, not its body shape): soft wax crayon and oil pastel, flat even colour with fine paper grain, no dark outline, a thick clean even white sticker border all around the whole silhouette like a die-cut vinyl sticker, no 3D shading. MORE HUMAN PROPORTIONS than Image 1: a round head on a short neck, clearly separate from the body, about four and a half heads tall in total, a simple rounded torso, longer arms and legs. BUILT FOR CUT-OUT ANIMATION: both arms hang straight and slightly out from the body at about 20 degrees with a clear gap of white background between arm and body all along, ending in simple rounded mitten hands (no fingers); the two legs are straight, separate and slightly apart with a clear gap, small rounded shoes; nothing overlaps the torso. Clothes: a white doctor's coat to the knees with long sleeves, drawn in very light warm grey-white crayon with a soft grey crayon edge so it reads against the white sticker border, open at the front in a narrow V over a calm turquoise #3BB4A8 top, one breast pocket with a pen, turquoise trousers. A simple stethoscope around the neck: a soft dark grey tube in a U over the coat with a small round silver chest piece. Hair: short soft curly warm auburn #B5562F hair as one smooth cap, not covering the face. Light peach skin. CUTE FACE: two medium black oval eyes with one tiny white shine dot each, soft pink round cheeks, a tiny nose, a warm gentle smile. Standing, facing the viewer, centered, full body with space around, pure solid white background, no shadow, no ground, no text.
```

## B – ljusblå rock, mörkbrun page

```prompt
A kind, friendly grown-up doctor for a toddler picture book, drawn in EXACTLY the drawing technique of Image 1 (STYLE reference only, not its body shape): soft wax crayon and oil pastel, flat even colour with fine paper grain, no dark outline, a thick clean even white sticker border all around the whole silhouette like a die-cut vinyl sticker, no 3D shading. MORE HUMAN PROPORTIONS than Image 1: a round head on a short neck, clearly separate from the body, about four and a half heads tall in total, a simple rounded torso, longer arms and legs. BUILT FOR CUT-OUT ANIMATION: both arms hang straight and slightly out from the body at about 20 degrees with a clear gap of white background between arm and body all along, ending in simple rounded mitten hands (no fingers); the two legs are straight, separate and slightly apart with a clear gap, small rounded white shoes; nothing overlaps the torso. Clothes: a soft light-blue #8EC8E8 doctor's coat to the knees with long sleeves, two small round white buttons and one breast pocket with a pen, darker blue trousers. A simple stethoscope around the neck: a soft dark grey tube in a U over the coat with a small round silver chest piece. Hair: short soft dark brown hair in a neat rounded bob, one smooth cap, not covering the face. Light peach skin. CUTE FACE: two medium black oval eyes with one tiny white shine dot each, soft pink round cheeks, a tiny nose, a warm gentle smile. Standing, facing the viewer, centered, full body with space around, pure solid white background, no shadow, no ground, no text.
```

Sedan, som för Mor: ett ansiktslöst steg (ögon, näsa, kinder och mun bort) och delarna (huvud, kropp, armar, ben) för riggen med `lk-figur`.

## Efter valet: riggstegen (bild 1 = den valda tagningen)

Som `lk-figur` § 0: första tagningen → armarna ut (bara om de ligger för nära) → utan ansikte → utan armar och ben. Huvudet klipps loss lokalt vid halsen, så att doktorn kan nicka och luta huvudet; halsen följer med kroppen och går upp under huvudet.

### 1. Armarna och benen ut (bara om det behövs)

```prompt
Edit Image 1. Keep the doctor EXACTLY the same: same head, hair, face, coat, stethoscope, colours, proportions, position and size in the frame, same flat wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change the pose of the limbs: both arms straight, held a little further OUT from the body at about 30 degrees down, with a clear gap of white background between each arm and the coat all along the arm, so only the shoulder root touches the body; the two legs straight and a little further apart with a clear gap between them. The stethoscope stays on the chest and does not touch the arms. No other changes, no shadow, no text.
```

### 2. Utan ansikte

```prompt
Edit Image 1. Keep the doctor EXACTLY the same: same head shape, hair, coat, stethoscope, arms, legs, shoes, colours, pose, position and size in the frame, same flat wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the nose, the pink cheeks and the mouth. Fill those areas with the same flat light peach crayon texture as the rest of the face, seamlessly, so the face is completely blank peach. No other changes, no shadow, no text.
```

### 3. Utan armar och ben (bild 1 = den ansiktslösa)

```prompt
Edit Image 1. Keep the doctor's head and body EXACTLY the same: same blank face, hair, neck, coat with its sleeves' shoulder seams, stethoscope, colours, position and size in the frame, same flat crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both arms with the hands, and remove both legs with the shoes. Close the outline of the coat at the shoulders and at the hem with the same smooth curve, and continue the coat texture and the white sticker border seamlessly where the limbs were. No face, no other changes, no shadow, no text.
```

Lokalt sedan: `verktyg/doktor_delar.py` klipper armar och ben (skillnaden mellan steg 2 och 3, med lång rot) och huvudet vid halsen, `verktyg/klapparm.py` gör klapparmarna, och ansiktet ritas i kod.
