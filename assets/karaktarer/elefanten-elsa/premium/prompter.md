# Elefanten Elsa v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-elsa-v2` (2026-11-09). Samma steg som Zebbe och Kajsa (skillen `lk-figur` § 0). Elsa är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. Snabeln är ritad som linjer på ansiktet och hör till ansiktet (den lyfts ut som nosfläck och följer ansiktet). Öronen, benen och svansen klipps som egna delar, armarna ritas i kod som runda stumpar (som Zebbes och Kajsas).

## 1. Första tagningen (`premium/original/elsa-forsta-b.jpg`, Sannas val; `-a` är bortvald)

Gjord i projektet `lk-nya-djur` med andra v2-figurer som stil- och storleksreferens.

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little elephant: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, soft grey-blue (#9FB3C8). Two big round flappy ears at the sides with soft pink (#F2B8C0) insides, each clearly separate from the head with a small gap. A short curved trunk hanging from the middle of the face, inside the body silhouette, curling up a little at the tip. A thin little tail with a tuft at the lower right side, clearly away from the arm. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE above the trunk: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, a small happy smile just beside the trunk. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded grey-blue nubs held slightly out from the body with a clear gap, the two short legs are separate and slightly apart with big round feet with little pale toenails, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

B höll redan armarna en bit ut från kroppen med en glipa, så inget platt steg behövdes.

## 2. Utan ansikte (`premium/original/elsa-faceless.jpg`, bild 1 = B)

Snabeln blir kvar.

```prompt
Edit Image 1. Keep the elephant EXACTLY the same: same egg shape, pose, position and size in the frame, same short curled trunk drawn on the face with its grey-blue crayon lines and wrinkle marks, same big ears with pink insides, same arms with pale toenails, same legs with pale toenails, same tail with its tuft, same flat grey-blue wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the pink blush cheeks and remove the small smile next to the trunk. Fill those areas with the same flat grey-blue wax-crayon texture as the rest of the face, seamlessly. KEEP the trunk exactly as it is. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/elsa-body-flow.jpg`, bild 1 = B)

```prompt
Edit Image 1. Keep the elephant's round egg-shaped body EXACTLY the same: same shape, position and size in the frame, same short curled trunk drawn on the face with its grey-blue crayon lines, same flat grey-blue crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both big ears, both arms, both legs with the toenails, and the tail, and remove the eyes, the pink cheeks and the smile. Close the outline with the same smooth egg curve and continue the same crayon texture and white sticker border seamlessly where they were. KEEP the trunk. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/elsa-sover-flow.jpg`, bild 1 = B)

Två tagningar med samma prompt. Jämförelse: `elsa-sover-jamforelse.jpg`.

```prompt
Edit Image 1. The same little elephant, same flat wax-crayon style, same soft grey-blue body, same big round ears with pink insides, same short curled trunk, same pale toenails, same small tail with a tuft, same thick clean white sticker border, now lying down on her tummy, seen from the front, sleeping peacefully: body low and wide like a soft round loaf, the head resting forward, her two little front feet folded under her chin, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile beside the trunk, the big ears relaxed and drooping a little, back feet peeking out behind, the tail curled around the side. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
