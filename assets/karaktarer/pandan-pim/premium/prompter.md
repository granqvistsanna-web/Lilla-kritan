# Pandan Pim v2 – prompter

Google Flow, Nano Banana Pro, image2image, 1:1, 0 krediter, projekt `lk-pim-v2` (2026-11-10). Samma steg som Zebbe och Rut (skillen `lk-figur` § 0). Pim är en tvåbent figur, så kroppen ska bli 710–790 px hög i 1024-rutan (SKALA 0,5 som de andra).

Spara tagningarna i `premium/original/`. De svarta ögonfläckarna hör till ansiktet (lyfts ut som fläck och följer ansiktet). Öronen, benen och svansen klipps som egna delar, armarna ritas som runda svarta stumpar (som Zebbes och Ruts).

## 1. Första tagningen (`premium/original/pim-forsta-a.jpg`, Sannas val; `-b` är bortvald)

Gjord i projektet `lk-nya-djur` med andra v2-figurer som stil- och storleksreferens (prompten står inte kvar här).

## 2. Utan ansikte (`premium/original/pim-faceless.jpg` → `premium/pim-faceless.png`, bild 1 = A)

Två tagningar, båda nästan pixeljusterade mot A (0,5 % skiljer). Tagning 1 är vald; tagning 2 ligger kvar som `pim-faceless-b.jpg`. Ögonen, kinderna, munnen och den lilla svarta nosen bort; ögonfläckarna blir kvar. Nosen ritas i kod (`class="nasa"`).

```prompt
Edit Image 1. Keep the panda EXACTLY the same: same cream egg shape, pose, position and size in the frame, same two big grey-black oval eye patches on the face, same round black ears on top, same black arm nubs, same black legs and feet, same small black tail, same flat cream wax-crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes (fill them with the same flat grey-black crayon as the eye patches, so each eye patch becomes one plain even grey-black oval), remove the pink blush cheeks, remove the small black nose and remove the smile. Fill those areas with the same flat cream crayon texture as the rest of the face, seamlessly. KEEP both eye patches exactly as they are. No other changes, no shadow, no text.
```

## 3. Bara kroppen (`premium/original/pim-body-flow.jpg` → `premium/pim-body.png`, bild 1 = A)

```prompt
Edit Image 1. Keep the panda's round cream egg-shaped body EXACTLY the same: same shape, position and size in the frame, same two big grey-black oval eye patches on the face, same flat cream crayon texture, same thick clean white sticker border, same pure white background. ONLY change: remove both eyes (each eye patch becomes one plain even grey-black oval), the pink cheeks, the black nose and the smile, and remove both black ears, both black arms, both black legs and the small black tail. Close the outline with the same smooth egg curve and continue the same cream crayon texture and white sticker border seamlessly where they were. KEEP both eye patches. No other changes, no shadow, no text.
```

## 4. Sover (`premium/original/pim-sover-flow.jpg`, bild 1 = A)

Två tagningar, båda ligger på magen. Tagning 1 är vald (`pim-sover-flow.jpg`: rund limpa, tassarna under hakan, blundar); tagning 2 (`pim-sover-flow-b.jpg`) ligger också men fick en svart axelrand som Pim inte har. Jämförelse: `pim-sover-jamforelse.jpg`.

```prompt
Edit Image 1. The same little panda, same flat wax-crayon style, same cream egg-shaped body, same big grey-black oval eye patches, same round black ears, same small black nose, same black arms and legs, same small black tail, same thick clean white sticker border, now lying down flat on his tummy, seen from the front, sleeping peacefully: body low and wide like a soft round loaf resting on the ground, the head resting forward, his two black front paws folded under his chin, eyes closed as two soft curved lines inside the eye patches, pink blush cheeks, a tiny content smile, round ears relaxed, black back feet peeking out behind at the sides. Lying down, not sitting up. Same size in the frame as Image 1. No zzz, no pillow, no blanket, no shading, no shadow, no ground, pure white background, no text.
```
