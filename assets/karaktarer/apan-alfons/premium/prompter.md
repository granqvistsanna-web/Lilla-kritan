# Apan Alfons v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-alfons-v2` (2026-11-10). Samma steg som Rut och Elsa (skillen `lk-figur` § 0). Alfons är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. Den tan jordnötsformade ansiktsfläcken hör till kroppen (lyfts ut som fläck och följer ansiktet, som Ruts kindband). Näsborrarna tas bort i konsten och ritas i kod (`class="nasa"`). Öronen, benen och svansen klipps som egna delar, armarna ritas som runda stumpar i ett stycke (som Ruts och Elsas).

## 1. Första tagningen (`premium/original/alfons-forsta-b.jpg`, Sannas val; `-a` är bortvald)

Gjord i projektet `lk-nya-djur` med tre v2-figurer som stil- och storleksreferens.

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little monkey: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, warm brown (#8B5A3C). A light tan (#E8C39E) face patch shaped like a peanut around the eyes and muzzle, lying flat on the face inside the body silhouette. Two round tan ears sticking out at the sides, each clearly separate from the head with a small gap. A long curly brown tail peeking out at the lower right side, clearly away from the arm. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE inside the tan patch: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, a small happy smile. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded brown nubs held slightly out from the body with a clear gap, the two short legs are separate and slightly apart with big oval tan feet, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Utan ansikte (`premium/original/alfons-faceless.jpg` → `premium/alfons-faceless.png`, bild 1 = B)

Ögon, kinder, mun OCH näsborrarna bort; ansiktsfläcken blir kvar.

```prompt
Edit Image 1. Keep the monkey EXACTLY the same: same brown egg shape, pose, position and size in the frame, same light tan peanut-shaped face patch, same round brown ears with tan insides at the sides, same brown arm nubs, same brown legs with tan feet, same long curly brown tail, same flat warm brown wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the pink blush cheeks, remove the two small nostrils and remove the smile. Fill those areas with the same flat light tan crayon texture as the rest of the face patch, seamlessly, so the face patch is one blank even tan shape with exactly the same outline as before. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/alfons-body-flow.jpg` → `premium/alfons-body.png`, bild 1 = B)

```prompt
Edit Image 1. Keep the monkey's round brown egg-shaped body EXACTLY the same: same shape, position and size in the frame, same light tan peanut-shaped face patch, same flat warm brown wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the pink cheeks, the two nostrils and the smile (blank face, the tan face patch stays exactly as it is), and remove both round ears, both arm nubs, both legs with the tan feet and the curly tail. Close the outline with the same smooth egg curve and continue the same brown crayon texture and white sticker border seamlessly where they were. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/alfons-sover-flow.jpg`, bild 1 = B)

Två tagningar med samma prompt. Jämförelse: `alfons-sover-jamforelse.jpg`.

```prompt
Edit Image 1. The same little monkey, same flat wax-crayon style, same warm brown egg-shaped body, same light tan peanut-shaped face patch, same round brown ears with tan insides, same two small nostrils, same brown arm nubs, same tan feet, same long curly brown tail, same thick clean white sticker border, now lying down flat on his tummy, seen from the front, sleeping peacefully: body low and wide like a soft round loaf resting on the ground, the head resting forward, his two little brown hands folded under his chin, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile, round ears relaxed, tan feet peeking out behind at the sides, the long curly tail curled around the side of his body. Lying down, not sitting up. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
