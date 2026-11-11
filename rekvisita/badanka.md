# Badankan

En liten gul badanka sedd rakt från sidan, vänd åt vänster, i art direction v2: en rund kropp som flyter, ett runt huvud ovanpå, en liten uppåtsvängd stjärt och en kort orange näbb. Platt vaxkrita med vit klistermärkeskant. **Inga ögon i bilden:** ett litet svart öga med glansprick ritas i kod, så att ankan kan blinka (som figurernas ansikten). Inga vingar, inga fötter (de är under vattnet).

Varmt äggula (`#FFD84A`, samma som gula stövlarna), så att den syns mot grisens rosa och badkarets dammrosa (`#E8A0B4`). Näbben orange (`#F26B1D`, som orange båten).

**Rörelse:** en stel urklippt bild. Den guppar (upp och ner, lite lutning) och glider sidledes på vattnet, men hoppar aldrig och vänds aldrig. Den hamnar på grisens huvud för att grisen kommer upp under den och glider av när öronen vippar (020, uppslag 12–13). Vattenlinjen läggs i kod över kroppens nedre del, så botten ska vara rundad men hel.

**Storlek i bild:** ungefär som ett av grisens öron, så att den får plats mellan öronen.

**Kritan ritar den** i 020 (uppslag 5): konturen i ett drag på ca 3 s, kropp → huvud → näbb, sedan fylls riktiga bilden i inifrån (se `format/` och ritintrot). Konturen mäts från den utklippta bilden.

Används i: 020 Grisen badar.

**Bilder (2026-11-10, Google Flow, Nano Banana 2.1, 0 krediter, Image 1 = `badkar-v1.jpeg`):** fyra tagningar i `assets/rekvisita/badanka/original/badanka-1…4.jpeg`, sida vid sida i `original/jamforelse.jpg`. Alla har rätt form, inga ögon och vit kant.

**Vald bild (Sanna, 2026-11-10):** nr 3, platt och lugn. Kopierad till `assets/rekvisita/badanka/badanka.jpeg` och utklippt med `verktyg/egen_kant.py` till `cut/badanka.png` (716×661). Klippet tog bort den vita kanten (den låg mot vit bakgrund), så lägg den i kod: `kant.lagg(g, { andel: 0.01 })`. Ögat ritas i kod på huvudet, ungefär mitt i den övre cirkeln strax bakom näbben.

Förslag: Nano Banana 2 (eller Google Flow, Nano Banana Pro), image2image med badkaret (`assets/rekvisita/badkar/badkar-v1.jpeg`) som stilreferens, Image 1, så att ankan och karet ser gjorda av samma hand ut. Gör 2–4 och välj den rundaste. Spara i `assets/rekvisita/badanka/` och klipp ut i `cut/`.

```prompt
Image 1 is a STYLE reference only: copy its wax-crayon technique exactly (flat grainy crayon fill with visible paper grain, no dark outline, no smooth digital shading, clean white sticker border), not its subject. Draw ONE small rubber bath duck seen exactly from the side, facing LEFT, very simple and childish like a toddler's crayon drawing. One round, slightly lopsided body that floats, with a small upturned pointed tail at the back on the right, and one round head sitting on top towards the front, slightly overlapping the body. A short, rounded, flat orange beak (#F26B1D) pointing left. The whole duck is warm egg yellow (#FFD84A) mottled grainy wax crayon with a few slightly lighter yellow crayon streaks and only a faint slightly darker yellow crayon edge along the bottom. The bottom of the body is a smooth complete round curve. NO eyes, no face, no mouth, no wings, no feet, no water, no bubbles, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole duck. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```
