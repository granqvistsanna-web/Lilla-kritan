# Tvättbjörnen Tilda v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter. Samma steg som Rut och Pim (skillen `lk-figur` § 0). Tvåbent figur: kroppen 710–790 px hög i 1024-rutan (SKALA 0,5).

Spara tagningarna i `premium/original/` (`tilda-forsta-a.jpg`, `-b` …). Masken, nospartiet och magen hör till kroppen (lyfts ut som fläckar). Öronen, benen och svansen klipps som egna delar, armarna ritas som runda stumpar.

## 1. Första tagningen (2026-11-27: `tilda-forsta-a.jpg` med prompten nedan, `-b` och `-c` med variant B; jämförelse i `tilda-forsta-jamforelse.jpg`. **Sanna valde B**)

De tre filerna från 2026-11-25 visade ett hjul, inte en tvättbjörn, och ligger i `premium/aldre/`.

Projektet `lk-nya-djur`, bild 1–3 = `raven-rut/premium/original/rut-forsta-b.jpg`, `pandan-pim/premium/original/pim-forsta-a.jpg`, `kaninen-kanel/premium/original/kanel-premium.png` (stil och storlek).

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little raccoon: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, warm soft grey (#9A949C). A soft black (#2A2426) mask band across the eyes, rounded at the ends, lying flat inside the body silhouette. A cream-white (#F6F0E6) muzzle area below the mask and a cream-white oval tummy patch, both lying flat inside the body silhouette. A small black nose. Two small round grey ears with cream insides on top, each clearly separate from the head with a small gap. A thick fluffy tail with soft grey and black rings peeking out at the lower right side, clearly away from the arm. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: two medium black oval eyes inside the mask, each with a soft lighter ring and one tiny white shine dot so they read clearly, soft pink round blush cheeks on the cream muzzle, a small happy smile under the nose. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded grey nubs with black (#2A2426) tips held slightly out from the body with a clear gap, the two short legs are black socks, separate and slightly apart with big oval feet, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

Variant B (`tilda-forsta-b.jpg`, `-c.jpg`): masken i två runda fläckar med vita ögon, så att ögonen syns mot det svarta.

```prompt
Images 1, 2 and 3 are STYLE and SIZE references only, not their subjects: draw a NEW character from the same set in exactly their style and at exactly their size in the frame. A little raccoon: ONE round soft egg-shaped body (head and body in one, no neck), slightly wider at the bottom, warm soft grey (#9A949C). A raccoon mask made of two soft rounded black (#2A2426) patches around the eyes, like a soft pair of goggles, joined by a narrow bridge over the nose, lying flat inside the body silhouette, with a cream-white (#F6F0E6) stripe above the mask. A cream-white muzzle area below the mask and a cream-white oval tummy patch, both lying flat inside the body silhouette. A small black nose. Two small round grey ears with cream insides on top, each clearly separate from the head with a small gap. A thick fluffy tail with three soft grey and black rings peeking out at the lower right side, clearly away from the arm. Premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: two medium round eyes inside the mask patches, each a white eye with a big black pupil and one tiny white shine dot so they read clearly on the dark mask, soft pink round blush cheeks on the cream muzzle, a small happy smile under the nose. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded grey nubs with black (#2A2426) tips held slightly out from the body with a clear gap, the two short legs are black socks, separate and slightly apart with big oval feet, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Utan ansikte (`premium/original/tilda-faceless.jpg` → `premium/tilda-faceless.png`, bild 1 = B)

Två tagningar, båda pixeljusterade mot B (0,85 % skiljer). Tagning 1 är vald; tagning 2 ligger kvar som `tilda-faceless-b.jpg`. Nosen ritas i kod (`class="nasa"`).

```prompt
Edit Image 1. Keep the raccoon EXACTLY the same: same grey egg shape, pose, position and size in the frame, same two black rounded mask patches around the eyes joined over the nose, same cream stripe above the mask, same cream muzzle band below the mask, same cream oval tummy, same round grey ears with cream insides, same grey arm nubs with black tips, same black legs and feet, same ringed grey and black tail, same flat grey wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes (fill them with the same flat black crayon as the mask, so each mask patch becomes one plain even black shape), remove the pink blush cheeks, remove the small black nose and remove the smile. Fill those areas with the same flat cream crayon texture as the muzzle, seamlessly. KEEP the black mask patches and the cream muzzle exactly as they are. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/tilda-body-flow.jpg` → `premium/tilda-body.png`, bild 1 = B)

Tagning 1 är vald; tagning 2 (`tilda-body-flow-b.jpg`) gjorde om masken till ett band och används inte.

```prompt
Edit Image 1. Keep the raccoon's round grey egg-shaped body EXACTLY the same: same shape, position and size in the frame, same two black rounded mask patches around the eyes joined over the nose, same cream stripe above the mask, same cream muzzle band below the mask, same cream oval tummy, same flat grey crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes (each mask patch becomes one plain even black shape), the pink cheeks, the black nose and the smile, and remove both ears, both arms, both black legs and the ringed tail. Close the outline with the same smooth egg curve and continue the same grey crayon texture and white sticker border seamlessly where they were. KEEP the mask and the cream muzzle. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/tilda-sover-flow.jpg` → `cut/tilda-sover.png`, bild 1 = B)

Tagning 1 är vald (ihoprullad framifrån, svansen som filt, blundar); tagning 2 (`tilda-sover-flow-b.jpg`) ligger på sidan och används inte.

```prompt
Edit Image 1. The same little raccoon, same flat wax-crayon style, same grey egg-shaped body, same black rounded mask patches around the eyes, same cream stripe above the mask, same cream muzzle and tummy, same round grey ears with cream insides, same small black nose, same black-tipped arms and black legs, same thick ringed grey and black tail, same thick clean white sticker border, now curled up lying down, seen from the front, sleeping peacefully: body low and round like a soft curled-up ball, the head resting forward, the ringed tail wrapped around the front of the body like a cosy blanket, eyes closed as two soft curved light lines inside the black mask, pink blush cheeks, a tiny content smile, ears relaxed. Lying down, not sitting up. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
