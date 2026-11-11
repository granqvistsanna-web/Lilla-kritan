# Blå dinon v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-dinon-bla-v2` (2026-11-11). Samma steg som Pim (skillen `lk-figur` § 0). Tagningarna ligger i `premium/original/`.

## 1. Första tagningen (`original/dinon-bla-1.jpeg`, Sannas val; `-2`, `-3`, `-4` är bortvalda, `jamforelse.jpg` visar alla fyra)

Gjord av huvudsessionen för 033 (prompten står inte kvar här; förslaget den utgick från står i git-historiken för `avsnitt/033-borsta-borsta-dinosaurier/README.md`).

## 2. Utan ansikte (`original/dinon-bla-faceless.jpg`, bild 1 = valet)

Två tagningar, båda pixeljusterade mot valet (0,02 % skiljer utanför ansiktet). Tagning 1 är vald; tagning 2 ligger kvar som `dinon-bla-faceless-b.jpg`.

```prompt
Edit Image 1. Keep the little blue dinosaur EXACTLY the same: same blue egg shape, pose, position and size in the frame, same round pale light blue tummy patch, same darker blue curved crest on top of the head, same two small blue arm fins at the sides, same two blue legs with rounded feet, same long darker blue tail curving out at the lower right, same flat soft wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the two pink blush cheeks and remove the small smile. Fill those areas with the same flat blue crayon texture as the rest of the face, seamlessly, so the face is completely empty and plain blue. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`original/dinon-bla-body-flow.jpg`, bild 1 = valet)

Två tagningar. Tagning 1 är vald (samma bredd som valet, 407 mot 408 px; `skript/bla_delar.py` flyttar den 1 px); tagning 2 ligger kvar som `dinon-bla-body-flow-b.jpg`.

```prompt
Edit Image 1. Keep the little blue dinosaur's blue egg-shaped body EXACTLY the same: same shape, position and size in the frame, same round pale light blue tummy patch, same flat soft blue wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the two pink cheeks and the smile, and remove the darker blue curved crest on top of the head, both small blue arm fins at the sides, both blue legs with their feet, and the long darker blue tail. Close the outline with the same smooth egg curve and continue the same blue crayon texture and the white sticker border seamlessly where they were, so only one plain blue egg with its light tummy patch is left. No other changes, no shadow, no text.
```
