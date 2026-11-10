# Ugglan Ulla v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-ulla-v2` (2026-11-10). Samma steg som Rut och Elsa (skillen `lk-figur` § 0). Ulla är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. Ögonskivorna och magen hör till kroppen (lyfts ut som fläckar). Örontofsarna och benen klipps som egna delar, vingarna ritas som runda stumpar i ett stycke (som Ruts och Elsas armar). Näbben ritas i kod (som Pips).

## 1. Första tagningen (`premium/original/ulla-forsta-a.jpg`, Sannas val; `-b` är bortvald)

Gjord i projektet `lk-nya-djur` med tre v2-figurer som stil- och storleksreferens.

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little owl: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, warm brown-orange (#C9803F). A cream (#F3E2C3) oval tummy patch on the lower body with a few small soft crayon V-shaped feathers. Two big round cream eye discs on the face, a small yellow-orange beak between them. Two little pointed ear tufts on top of the head, each clearly separate from the other. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: inside each cream eye disc a medium black oval eye with one tiny white shine dot, soft pink round blush cheeks below the discs. BUILT FOR CUT-OUT ANIMATION: the arms are two short rounded brown-orange wing nubs held slightly out from the body with a clear gap, the two short legs are separate and slightly apart with small orange feet with three rounded toes, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Utan ansikte (`premium/original/ulla-faceless.jpg` → `premium/ulla-faceless.png`, bild 1 = A)

Ögon, kinder och näbben bort; ögonskivorna blir kvar. Näbben ritas i kod.

```prompt
Edit Image 1. Keep the owl EXACTLY the same: same brown-orange egg shape, pose, position and size in the frame, same two big round cream eye discs, same cream oval tummy with its small brown crayon V feathers, same two ear tufts on top, same wings held at the sides, same short brown legs and orange three-toed feet, same flat brown-orange wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both black eyes, remove the pink blush cheeks and remove the small yellow beak. Fill those areas with the same flat crayon texture around them (cream inside the eye discs, brown-orange between them), seamlessly, so the face is blank but the two cream eye discs stay exactly as they are. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/ulla-body-flow.jpg` → `premium/ulla-body.png`, bild 1 = A)

```prompt
Edit Image 1. Keep the owl's round brown-orange egg-shaped body EXACTLY the same: same shape, position and size in the frame, same two big round cream eye discs, same cream oval tummy with its small brown crayon V feathers, same flat brown-orange wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both black eyes, the pink cheeks and the yellow beak (blank face, the cream eye discs stay), and remove both ear tufts on top, both wings at the sides and both legs with the orange feet. Close the outline with the same smooth egg curve and continue the same brown-orange crayon texture and white sticker border seamlessly where they were. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/ulla-sover-flow.jpg`, bild 1 = A)

Två tagningar, jämförelse i `ulla-sover-jamforelse.jpg`.

```prompt
Edit Image 1. The same little owl, same flat wax-crayon style, same warm brown-orange egg-shaped body, same two big round cream eye discs, same small yellow-orange beak, same cream tummy with small brown V feathers, same two ear tufts on top, same thick clean white sticker border, now settled down low on her tummy, seen from the front, sleeping peacefully: body low, wide and round like a soft fluffy ball sitting flat on the ground, no legs showing, the orange toes just peeking out under the front, wings tucked in close against her sides, the head sunk a little into the round body, eyes closed as two soft curved lines inside the cream eye discs, pink blush cheeks, ear tufts relaxed. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no branch, no shading, no shadow, no ground, pure white background, no text.
```
