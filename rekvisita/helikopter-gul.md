# Gula helikoptern

Lages helikopter i 011: en liten rund leksakshelikopter från sidan, vänd åt höger (flapp, flapp). Klart citrongul (`#FFE14D`), ljusare och kallare än Lage (`#F2B544`, varmt solgul), så att hans orangebruna man ligger som en ram mellan dem. Inget ansikte, inga konturer, inga fartstreck, ingen text.

Byggd som gröna traktorn i 014 och röda brandbilen i 013, så att Lage kan sitta i den i kod:

- **Kaross:** en rund bubbla med en **låg och bred öppen sits** upptill. Framkanten är låg, så att Lage syns från midjan och upp och armarna når fritt över kanten (peka, vinka, fläkta, armarna upp). I 007 nådde Bulles armar inte över lastbilens kant. Karossen delas i kod i ryggstöd (bakom Lage) och framdel (framför honom).
- **Svansen:** en kort, tjock svans bakåt (till vänster) med en liten grå propeller längst ut. Propellern ligger fri från svansen med vitt mellanrum, så att den kan klippas ut och snurra i kod.
- **Medarna:** två enkla grå medar under karossen på korta stag, med vitt mellanrum mot bubblan så att de kan klippas ut som eget lager (de gungar lite när helikoptern landar).
- **Rotorfoten:** en kort grå stump ovanpå karossen. Själva **huvudrotorn ritas i kod** (två gråa blad som snurrar), liksom de vita vindvirvlarna under den.

Lages svans hänger ut över sitsens bakkant som eget lager ur hans rigg och kan vifta (frågan, 06b–06d). Helikoptern flyger alltid åt höger och vänds aldrig. Kritan ritar i ordningen kaross, svans med propeller, medar, rotor (se 011 README, "Ledtrådar när kritan ritar").

Används i: 011 Gula sången.

Förslag: gör den i OpenArt (eller Google Flow, Nano Banana) med `traktor-gron-oppen` och `brandbil-rod` (eller `lastbil-brun`) som stilreferenser, Image 1 och 2, som traktorn och brandbilen.

**Bilder (2026-11-06, OpenArt Nano Banana 2, image2image, Image 1 = `lastbil-brun-v2`, Image 2 = `rosa-bilen`):** `assets/rekvisita/helikopter-gul/helikopter-gul-v1.png` och `-v2.png`, utklippta i `cut/` (8 px kant). Båda har en djup halvmånesits med låg framkant, rotorfot, svans med fri propeller och medar med vitt mellanrum. v2 är klarare citrongul.

**Vald bild (Sanna, 2026-11-06):** v2, kopierad till `assets/rekvisita/helikopter-gul/helikopter-gul.png` och `cut/helikopter-gul.png`. v1 är reserv.

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly, not the vehicles. Draw a single small round toy helicopter seen exactly from the side, facing right, very minimal and childish like a toddler's crayon drawing. NO black outline. One chunky, slightly lopsided round bubble body in bright lemon yellow wax crayon (#FFE14D), with a low, wide open seat cut into the top of the bubble, with a very low front edge, so a pilot sitting there would show from the waist up with free arms resting on the edge. On top of the body, behind the seat, one short thick dark grey stub for the rotor, with NO rotor blades. At the back on the left a short thick yellow tail, and at its very end one tiny light grey propeller with two blades, standing free with a small gap of white background between it and the tail. Under the body two simple light grey landing skids on short grey struts, with a clear gap of white background between the skids and the body. Mottled, grainy, slightly streaky wax crayon texture with visible paper grain, only a thin uneven white rim around the edge of every part. No pilot, no main rotor blades, no windows, no glass, no face, no eyes, no mouth, no speed lines, no text, no numbers, no logos. Very simple, bold, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground.
```

```delar
helicopter body (split in code into seat back behind the pilot and front part in front of the pilot), rotor stub, tail propeller, landing skids
```

## Art direction v2 med glasbubbla (Sanna, 2026-11-08: "v2 of helikopter", "a glass bubble over helikopter which lion can fit"; saknas än)

**✅ Bild klar 2026-11-10:** `assets/rekvisita/helikopter-gul/helikopter-gul-v3.png`, utklippt i `cut/helikopter-gul-v3.png` (1669×984), variant b i `original/`. Öppet kar med gräddvit insida, fri svanspropeller, medarna. Glaset, rotorfoten och rotorn ritas i kod. Mät öppningen mot Lage innan scenen byggs.

Halvmånesitsen i v1-bilden är för smal: Lages man göms bakom ryggstödet och han ser nedsjunken ut. I v2 byggs helikoptern som v2-bilen (`assets/stiltest-premium/bil/hel-b.png`): ett brett öppet kar med gräddvit insida, och ovanpå en **stor glasbubbla** som Lage ryms i, hela vägen från magen till manens topp.

- **Bilden** är bara karet: kaross, svans med fri propeller och medar. Ingen bubbla, ingen rotorfot.
- **Glasbubblan ritas i kod:** en halvsfär över öppningen, ljust blåvit ton (ca 20 % täckning) så att Lage syns tydligt, en vit klistermärkeskant runt, två vita glansstreck uppe till vänster. Kod för att den ska vara genomskinlig: bildmodellen ritar glas som en tät yta som inte går att klippa.
- **Rotorfoten och huvudrotorn ritas i kod** ovanpå bubblan.
- **Lager**, som bilen: karets baksida med den gräddvita insidan → Lage (armar, kropp, ansikte; benen göms) → frampanelen (allt under insidans nedre kant, klipps ur samma bild) → glasbubblan → rotorfot och rotor. Svansen ur Lages rigg kan sticka ut över karets bakkant, framför glaset.
- **Storlek:** öppningen ska vara lika bred som Lage med man (ca 680 px i hans 1024-ruta), så att han sitter mitt i utan att något skärs av.

Spara som `assets/rekvisita/helikopter-gul/helikopter-gul-v3.png`, klipp med `verktyg/egen_kant.py` (kanten på hela helikoptern innan den delas). Nano Banana 2, image2image, 2K, 1:1: bild 1 = `cut/helikopter-gul.png` (formen: svans, propeller, medar), bild 2 = `assets/stiltest-premium/bil/hel-b.png` (v2-stilen och det öppna karet).

```prompt
Image 1 is the design reference: the same small toy helicopter seen exactly from the side, facing right, with the same short thick tail to the left ending in a tiny free-standing light grey two-blade propeller, and the same two simple light grey landing skids on short struts. Image 2 is the STYLE and BUILD reference: copy its premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel, bold flat colour with fine crayon hatching, a slightly darker crayon line only along the edges, NO black outline, and a clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker – and copy how its body is an open tub with a wide oval opening on top showing a flat cream (#F6E9D2) inside. Redraw the helicopter in that style: the body becomes one chunky, rounded, slightly lopsided bright lemon yellow (#FFE14D) tub, wider than it is tall, with a WIDE oval cockpit opening on top that takes up most of the body's length, showing the flat cream inside, and a low rounded rim. The top of the body is open: NO glass, NO dome, NO windows, NO rotor stub, NO rotor blades, NO steering wheel, nothing inside. Keep the short thick yellow tail on the left with the tiny grey propeller standing free with a small gap of white background, and the two grey skids under the body with a clear gap of white background between them and the body. Very simple, chunky shapes for 2-year-olds, no face, no pilot, no speed lines, no text. Centered, full helicopter with space around, on a pure solid white background, no shadow, no ground.
```
