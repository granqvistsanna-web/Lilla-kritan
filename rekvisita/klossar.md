# Klossarna

Tre tjocka leksaksklossar sedda framifrån: en **röd cirkel** (`#E8483B` ungefär), en **blå fyrkant** (`#3B7FD9`) med rundade hörn och en **grön trekant** (`#4BB35E`) med rundade hörn. Varje kloss har en mörkare kant i samma färg nere till höger, så att tjockleken syns och den ser ut som en riktig kloss och inte som ett platt klistermärke (Sanna 2026-11-25: *"blocks with a bit of shading or 3d effect"*). Mjuk krita, ingen mörk kontur, vit klistermärkeskant runt var och en.

**I 053:** klossarna ligger överallt på golvet i sovrummet. Leoparden puffar till dem med en rak tass, och de glider själva: upp på den fulla korgen och ner igen framför den, och sedan ner i sitt hål i [formlådan](formlada.md). Trekanten blir en hatt på leopardens huvud, glider in under täcket och syns med ett hörn tills barnet hittar den. Klossarna flyttas och vrids men skalas aldrig. Ritintrot ritar trekanten.

**Urklippen** i `assets/rekvisita/klossar/cut/`:

| Fil | Storlek |
|---|---|
| `kloss-cirkel.png` | 400 × 396 |
| `kloss-fyrkant.png` | 391 × 393 |
| `kloss-trekant.png` | 411 × 380 |

Den ritade kanten var ca 16 px (4 %). Den är tunnad till 4 px med `tunn_kant.py 4`, ca 1 % av höjden, och kontrollerad mot mörk bakgrund. De tjocka urklippen finns i `original/tjock-kant/`. Klossarna klipptes ur samma ark med `egen_kant.py --ark`.

**Kontur för kritan:** trekantens kontur görs vid bygget ur `kloss-trekant.png` med `verktyg/kontur.py`. Tjockleksranden längs nederkanten och högra sidan blir ett eget drag (skillen `kritan-ritar`, *teckningen som bilden*).

Används i: 053 Leoparden städar.

**Bild (2026-11-25, Google Flow, Nano Banana 2.1, 0 krediter, 16:9, stilreferenser `korg/cut/korg-v3.png` och `sangen/cut/sangen.png`):** tre tagningar i `assets/rekvisita/klossar/original/klossar-1…3.jpeg`, sida vid sida i `original/jamforelse.jpg`. Sanna valde först nr 3 (platt, gul trekant). Hon bytte sedan till nr 2, med tjocklek och skuggning och grön trekant. En fjärde tagning kom aldrig fram i kön.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw THREE chunky children's wooden toy blocks in one row with clear empty space between them, each seen straight from the front and all the same height: on the left a ROUND block, a flat thick disc seen face-on as a perfect circle, bright friendly red (#E8483B); in the middle a SQUARE block seen face-on as a square with softly rounded corners, clear bright blue (#3B7FD9); on the right a TRIANGLE block seen face-on as an upright triangle with softly rounded corners, fresh bright green (#4BB35E). Each block shows its thickness only as a thin, slightly darker band of the same colour along its lower right edge, so it reads as a solid block, not a flat sticker. No holes, no letters, no numbers, no faces, no pattern, no shading, no 3D, no shine, no outline. Each block has its own thick, clean, even white sticker border all around, and the three blocks do not touch. Centered, plain pure solid white background, no shadow, no ground, no text.
```
