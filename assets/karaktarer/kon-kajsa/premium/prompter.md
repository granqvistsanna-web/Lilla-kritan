# Kon Kajsa v2 – prompter

Nano Banana 2, image2image, 2K, 1:1. Samma steg som Lage och Agda (skillen `lk-figur` § 0). Kajsa är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

- Bild 1 = `assets/karaktarer/kon-kajsa/kon-kajsa.png` (v1, utseendet)
- Bild 2 = `assets/karaktarer/lejonet-lage/premium/original/lage-premium-d.png` (Lage v2, form och stil)

Spara tagningarna i `premium/original/`. Hornen, mulen och koskällan hör till kroppen. Öronen och svansen klipps som egna delar, armarna ritas om med `rita-lemmar.py --bara arm`.

## 1. Första tagningen (`premium/original/kajsa-forsta.png`)

```prompt
Image 1 is the character reference: the same little cow (same design, colours and proportions: creamy white #FAF6EE body with a few big soft black #1E1A18 patches, a big light pink #F4B6B0 muzzle, two short rounded yellow horns, a little golden cowbell on a red band). Image 2 is a STYLE and SHAPE reference only: copy its wax-crayon technique, its flat even colour, its thick white sticker border and its body proportions, not its subject. Redraw the cow as a premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, not messy, with flat even crayon colour and fine paper grain, no 3D shading. Her body is ONE round soft egg shape (head and body in one, no neck), slightly wider at the bottom, the same size in the frame as Image 2. A few big soft rounded black patches on the body, none of them on the face or the muzzle. NO dark outline: instead a THICK, clean, even, smooth white sticker border all around the whole silhouette, like a die-cut vinyl sticker. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks, and below the eyes a big rounded light pink muzzle as one clear flat oval lying on the face, inside the body silhouette, with two small darker pink nostrils, and a small happy smile under it. Two short rounded yellow horns on top of the head and two small rounded cream ears sticking out sideways just below the horns, each ear clearly separate from the head with a small gap. A small golden cowbell on a thin red band across the upper tummy. A thin tail with a black tuft peeking out at her lower right side, clearly away from the arm. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded cream nubs with dark tips held slightly out from the body with a clear gap, the two short legs are separate and slightly apart with big oval dark hooves, nothing overlapping the tummy. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

## 2. Plattare (`premium/original/kajsa-platt.png`, bild 1 = den godkända första tagningen)

Hoppa över steget om tagningen redan är platt (som Lage D).

```prompt
Edit Image 1. Keep the cow EXACTLY the same: same shape, pose, position and size in the frame, same cute face, muzzle, horns, ears, cowbell, arms, legs, hooves and tail, same black patches, same thick clean white sticker border, same pure white background. ONLY change: make her FLATTER. Remove most of the shading and highlights: the body becomes one even wax-crayon fill with fine paper grain and soft crayon strokes, with only a very faint slightly darker crayon edge along the bottom. No light glow on the head, no dark side, no rounded 3D look. Like a flat cut-paper sticker drawn in crayon. No other changes, no shadow, no text.
```

## 3. Utan ansikte (`premium/kajsa-faceless.png`, bild 1 = platt)

Mulen med näsborrarna blir kvar: den lyfts ut som nosfläck (`flackar.py … nos`) och följer ansiktet.

```prompt
Edit Image 1. Keep the cow EXACTLY the same: same shape, pose, position and size in the frame, same pink muzzle with its nostrils, same horns, ears, cowbell, arms, legs, hooves and tail, same black patches, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the pink blush cheeks and remove the smile under the muzzle. Fill those areas with the same flat creamy white wax-crayon texture as the rest of the face, seamlessly. No other changes, no shadow, no text.
```

## 4. Bara kroppen (`premium/kajsa-body.png`, bild 1 = faceless)

```prompt
Edit Image 1. Keep the cow's round egg-shaped body EXACTLY the same: same shape, position and size in the frame, same pink muzzle, same horns, same cowbell on its red band, same black patches, same flat creamy crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both ears, both arms, both legs with the hooves, and the tail. Close the outline with the same smooth egg curve and continue the same crayon texture, patches and white sticker border seamlessly where they were. No face, no other changes, no shadow, no text.
```

Om kroppen blir längre när benen tas bort (som Lages body-b): sätt ihop den i kod som `lejonet-lage/premium/skript/bygg-kropp.py`.
