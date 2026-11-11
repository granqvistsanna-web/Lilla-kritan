# Röda dinon v2 – prompter

Google Flow, Nano Banana Pro, 1:1, 0 krediter (2026-11-11). Samma steg som blå dinon (skillen `lk-figur` § 0). Tagningarna ligger i `premium/original/`.

## 1. Första tagningen (`original/dinon-rod-vald.jpeg`, Sannas val: tagning 2 av de tre korallröda `dinon-rod-1…3.jpeg`)

Gjord av huvudsessionen för 033, bild 1 = `assets/karaktarer/dinon-disa/premium/original/disa-djup.jpg`.

```prompt
Image 1 is a STYLE and family reference: a little lilac dinosaur. Copy its drawing technique exactly (premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, a soft even fill with fine paper grain, slightly lighter at the top and slightly deeper at the bottom, NO dark outline, a THICK, clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker). Draw a NEW dinosaur from the same family with a clearly different silhouette: a wide, low, sturdy three-horned dinosaur, clearly larger than the one in Image 1. One wide, round, slightly lopsided blob where head and body are one shape, soft coral red (#EE6B5B) with a pale pink-cream tummy. ONLY behind the very top of the head, like the brim of a hat seen from the front, a low smooth crescent-shaped shield in a deeper red (#C94F45) with three pale round dots on it; the shield does NOT go down the sides of the face, the cheeks and sides of the body are plain. Three short, chunky, rounded horns in creamy white like soft cones with round tips: one small one in the middle of the face above the mouth, and two a little longer on the forehead pointing up and slightly outwards. A short thick tail in the deeper red peeking out at the lower right. CUTE FACE: two medium black oval eyes set wide apart, each with one tiny white shine dot, soft pink round blush cheeks and a wide, gentle closed smile below the small horn. No teeth, no claws, no spikes, nothing sharp, every tip is round. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded nubs held slightly out from the body with a clear gap, the two legs are separate and slightly apart with big flat oval feet, nothing overlapping the tummy or the mouth. Friendly, soft and gentle, not scary at all, for 2-year-olds. Standing, facing the viewer straight on, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Utan ansikte (`original/dinon-rod-faceless.jpg`, bild 1 = valet, projekt `lk-dinon-rod-v2`)

Två tagningar, båda pixeljusterade mot valet (0,01 % skiljer utanför ansiktet). Tagning 1 är vald; tagning 2 ligger kvar som `dinon-rod-faceless-b.jpg`. Hornen tas ändå ur den valda bilden, så att de sitter exakt som där.

```prompt
Edit Image 1. Keep the little coral red three-horned dinosaur EXACTLY the same: same round coral red egg shape, pose, position and size in the frame, same round pale pink-cream tummy patch, same deeper red crescent shield behind the top of the head with its three pale round dots, same three creamy white rounded horns (two on the forehead and one small one in the middle of the face), same two small red arm nubs at the sides, same two red legs with flat feet, same deeper red tail at the lower right, same flat soft wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both black eyes, remove the two pink blush cheeks and remove the black smile line. Fill those areas with the same flat coral red crayon texture as the rest of the face, seamlessly, so the face is completely empty and plain coral red except for the small cream horn in the middle. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`original/dinon-rod-body-flow.jpg`, bild 1 = valet)

Två tagningar. Tagning 1 är vald (`skript/rod_delar.py` skalar den 0,8 % och flyttar den 5 px); tagning 2 ligger kvar som `dinon-rod-body-flow-b.jpg`.

```prompt
Edit Image 1. Keep the little dinosaur's round coral red egg-shaped body EXACTLY the same: same shape, position and size in the frame, same round pale pink-cream tummy patch, same flat soft coral red wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the two pink cheeks and the smile, remove all three creamy white horns (the two on the forehead and the small one in the middle of the face), remove the deeper red crescent shield with dots behind the head, both small red arm nubs at the sides, both red legs with their feet, and the deeper red tail. Close the outline with the same smooth egg curve and continue the same coral red crayon texture and the white sticker border seamlessly where they were, so only one plain coral red egg with its pale tummy patch is left. No other changes, no shadow, no text.
```
