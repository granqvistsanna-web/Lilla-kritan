# Räven Rut v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-rut-v2` (2026-11-09). Samma steg som Zebbe (skillen `lk-figur` § 0). Rut är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. Kindbandet och magen hör till kroppen (lyfts ut som fläckar). Öronen, benen och svansen klipps som egna delar, armarna ritas som runda stumpar (som Zebbes).

## 1. Första tagningen (`premium/original/rut-forsta-b.jpg`, Sannas val; `-a` är bortvald)

Gjord i projektet `lk-nya-djur` med tre v2-figurer som stil- och storleksreferens.

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little fox: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, bright orange (#E8742C). Cream-white (#FBF3E6) cheeks around the lower face and a cream-white oval tummy patch, lying flat inside the body silhouette. A small black nose. Two pointed orange ears with dark brown tips on top, each clearly separate from the head with a small gap. A big bushy orange tail with a white tip peeking out at the lower right side, clearly away from the arm. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, a small happy smile under the nose. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded orange nubs with dark brown (#4A2E22) tips held slightly out from the body with a clear gap, the two short legs are dark brown socks, separate and slightly apart with big oval feet, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Utan ansikte (`premium/original/rut-faceless.jpg` → `premium/rut-faceless.png`, bild 1 = B)

Ögon, kinder, mun OCH den svarta nosen bort; kindbandet blir kvar. Nosen ritas i kod (`class="nasa"`).

```prompt
Edit Image 1. Keep the fox EXACTLY the same: same orange egg shape, pose, position and size in the frame, same cream cheek band across the face, same cream oval tummy, same pointed ears with dark tips, same arms with dark brown tips, same dark brown legs, same bushy tail with the white tip, same flat orange wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the pink blush cheeks, remove the small black nose and remove the smile. Fill those areas with the same flat crayon texture around them (cream on the cheek band, orange above it), seamlessly, so the face is blank but the cream cheek band stays exactly as it is. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/rut-body-flow.jpg` → `premium/rut-body.png`, bild 1 = B)

```prompt
Edit Image 1. Keep the fox's round orange egg-shaped body EXACTLY the same: same shape, position and size in the frame, same cream cheek band across the face, same cream oval tummy, same flat orange wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the pink cheeks, the black nose and the smile (blank face, the cream cheek band stays), and remove both ears, both arms, both dark brown legs and the bushy tail. Close the outline with the same smooth egg curve and continue the same orange crayon texture and white sticker border seamlessly where they were. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/rut-sover-flow.jpg`, bild 1 = B)

Två tagningar, jämförelse i `rut-sover-jamforelse.jpg`.

```prompt
Edit Image 1. The same little fox, same flat wax-crayon style, same bright orange egg-shaped body, same cream cheek band across the face, same cream tummy, same pointed ears with dark brown tips, same small black nose, same dark brown legs, same big bushy orange tail with a white tip, same thick clean white sticker border, now curled up lying down, seen from the front, sleeping peacefully: body low and round like a soft curled-up ball, the head resting forward, the big bushy tail wrapped around the front of his body like a cosy blanket with the white tip near his cheek, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile, ears relaxed. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
