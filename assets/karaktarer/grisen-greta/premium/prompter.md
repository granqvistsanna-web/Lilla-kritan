# Grisen Greta v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-greta-v2` (2026-11-10). Samma steg som Zebbe och Rut (skillen `lk-figur` § 0). Greta är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. Trynet hör till kroppen (lyfts ut som nosfläck, näsborrarna retuscheras bort och ritas i kod). Öronen och svansen klipps som egna delar, armarna och benen ritas som runda stumpar och ben med mörkare rosa klövar (som Zebbes och Ruts).

## 1. Första tagningen (`premium/original/greta-forsta-b.jpg`, Sannas val; `-a` är bortvald)

Gjord i projektet `lk-nya-djur` med v2-figurer som stil- och storleksreferens (som Ruts första tagning).

## 2. Utan ansikte (`premium/original/greta-faceless.jpg` → `premium/greta-faceless.png`, bild 1 = B)

Ögon, kinder och mun bort; trynet med näsborrarna blir kvar (det lyfts ut, och näsborrarna ritas i kod).

```prompt
Edit Image 1. Keep the pig EXACTLY the same: same pink egg shape, pose, position and size in the frame, same big round darker pink snout with its two nostrils, same floppy triangle ears on top, same pink arm nubs with darker pink hooves, same pink legs with darker pink hooves, same small curly tail, same flat pink wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, remove the pink blush cheeks and remove the smile under the snout. Fill those areas with the same flat pink crayon texture as the rest of the face, seamlessly, so the face is blank but the snout stays exactly as it is. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/greta-body-flow.jpg` → `premium/greta-body.png`, bild 1 = B)

```prompt
Edit Image 1. Keep the pig's round pink egg-shaped body EXACTLY the same: same shape, position and size in the frame, same big round darker pink snout with its two nostrils, same flat pink wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes, the pink cheeks and the smile (blank face, the snout stays), and remove both ears, both arms, both legs with the hooves and the curly tail. Close the outline with the same smooth egg curve and continue the same pink crayon texture and white sticker border seamlessly where they were. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/greta-sover-flow.jpg`, bild 1 = B)

Två tagningar, jämförelse i `greta-sover-jamforelse.jpg`. Båda ligger på magen; tagning 1 (`greta-sover-flow.jpg`, hakan på framklövarna) är vald, tagning 2 är `greta-sover-flow-b.jpg`.

```prompt
Edit Image 1. The same little pig, same flat wax-crayon style, same pink egg-shaped body, same big round darker pink snout with two nostrils, same floppy triangle ears, same small curly tail, same darker pink hooves, same thick clean white sticker border, now LYING DOWN flat on her tummy, seen from the front, sleeping peacefully: body long and low, stretched out on the ground, chin resting on her two front hooves tucked under the chin, the floppy ears relaxed and hanging down, eyes closed as two soft curved lines, pink blush cheeks, a tiny content smile. Not sitting, not standing: lying down. As big in the frame as Image 1, filling the width. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
