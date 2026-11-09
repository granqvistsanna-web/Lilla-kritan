# Mamma Mor v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-mor-v2` (2026-11-09). Samma steg som Olle och Zebbe (skillen `lk-figur` § 0). Mor är den vuxna: hon visas ca 1,4 gånger så hög som Olle (se `stil/art-direction-v2.md`).

Spara tagningarna i `premium/original/`. Håret med knuten och klänningens korta ärmar hör till kroppen. Armarna (persikofärgade stumpar) och benen (med skor) klipps som egna delar. Ansiktet (ögon med fransar, liten näsa, kinder, mun) ritas i kod.

## 1. Första tagningen (`premium/original/mor-forsta-a.jpg`, Sannas val; `-b` är bortvald)

Gjord i en tidigare session (Flow-jobbet `lk-mor-v2` scen 01). Bild 1 = v1-Mor (utseendet), bild 2 = Olle (enligt prompten), bild 3 = en v2-figur som stilreferens.

```prompt
Image 1 is the character reference: the same mum (same design, colours and proportions: a taller, slimmer, slightly lopsided egg shape where head and body are one, light peach skin crayon on top, a simple mustard yellow #F4D252 dress on the lower part, dark brown hair with a round bun on top, small brown shoes). Images 2 and 3 are STYLE references only: copy their wax-crayon technique and texture amount, their flat even colour and their thick white sticker border, not their subjects. Image 2 is her little boy: she is the same style and family, about 1.4 times as tall as him. Redraw her as a premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. Her body is ONE tall soft egg shape (head and body in one, no neck), slightly wider at the bottom: peach on top, the mustard yellow dress as one flat area on the lower half with a soft wavy hem line. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. Dark brown hair as one smooth cap on top of the egg with a round bun on top, the hair not covering the face. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, a tiny small nose and a warm gentle smile. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded peach nubs held slightly out from the body with a clear gap, the two short legs are separate and slightly apart with small rounded brown shoes, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Armarna ut (`premium/original/mor-platt.jpg`, bild 1 = A)

I A låg armarna tätt intill kroppen. Två tagningar; tagning 2 är vald (tydligast glipa mellan arm och kropp), tagning 1 ligger kvar som `mor-platt-b.jpg`.

```prompt
Edit Image 1. Keep the mum EXACTLY the same: same tall egg shape, pose, position and size in the frame, same cute face with eyelashes, small nose, pink cheeks and smile, same dark brown hair cap with the round bun, same flat mustard yellow dress with its wavy hem, same legs and small brown shoes, same flat peach crayon texture, same thick clean white sticker border, same pure white background. ONLY change the two arms: each arm is one short rounded nub, a short mustard yellow sleeve ending in a round peach hand, held a little further OUT from the body at about 45 degrees down, with a clear gap of white background between each arm and the body all along the arm, so only the very root at the shoulder touches the body. No other changes, no shadow, no text.
```

## 3. Utan ansikte (`premium/original/mor-faceless.jpg` → `premium/mor-faceless.png`, bild 1 = platt)

```prompt
Edit Image 1. Keep the mum EXACTLY the same: same tall egg shape, pose, position and size in the frame, same dark brown hair cap with the round bun, same mustard yellow dress with its sleeves and wavy hem, same arms, legs and small brown shoes, same flat peach crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes with their lashes, remove the small nose, remove the pink blush cheeks and remove the smile. Fill those areas with the same flat light peach wax-crayon texture as the rest of the face, seamlessly, so the face is completely blank peach. No other changes, no shadow, no text.
```
