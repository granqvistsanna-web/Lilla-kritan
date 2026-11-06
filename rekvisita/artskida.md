# Ärtskidan

Pips enda ärtskida med precis tre ärtor: en till Lova, en till Pip och en till Gurra. Ljust ärtgrön (`#8CCB4E`), ljusare än traktorn och Gurra. Tre varianter: den öppna skidan med tre ärtor i rad (huvudbilden), samma skida stängd (redigerad ur den öppna, pixeljusterad) och en lös ärta (klippt ur den öppna skidan, så att den är exakt lika). Ärtorna klipps ut var för sig så att de kan plockas ur skidan i kod. Ingen korg: då finns det inte fler.

Gjord i Google Flow (Nano Banana, 0 krediter) med gröna traktorn som stilreferens. Bilderna ligger i `assets/rekvisita/artskida/`.

Används i: 014 Gröna sången.

**Vald bild (Sanna, 2026-11-05):** v1 (mörkgrönt inuti, så att ärtorna syns). Stängd: v2 av redigeringen (tre små bulor längs ovansidan), tom: v1. Reserver: `artskida-v2.jpeg`, `artskida-stangd-v1.jpeg`, `artskida-tom-v2.jpeg`.

Utklippen i `cut/`: `artskida.png` (öppen med ärtor), `artskida-tom.png` (öppen utan ärtor), `artskida-stangd.png` och `artskida-arta-1..3.png` (ärtorna på sina platser, utan inbakad kant; en lös ärta får kanten i kod med `kant.lagg(g, { andel: 0.01 })`). Lovas ärta är `arta-1`. Platserna står i `artskida-rigg.json`.

```prompt
Image 1 is a STYLE reference only: copy its drawing technique exactly, not the tractor. Draw a single pea pod split open, lying on its side, in that same soft crayon style, very minimal and childish like a toddler's crayon drawing: a slightly lopsided long rounded pod shape in fresh pea green wax crayon (#8CCB4E), open along the top, with three round peas inside in a row, the peas a little lighter green, one tiny curled stem at the left end. NO black outline, mottled grainy streaky wax crayon with visible paper grain, only a thin uneven white rim around the edge. No face, no text. Very simple, bold, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground.
```

```delar
open pod without peas, pea 1, pea 2, pea 3, closed pod
```
