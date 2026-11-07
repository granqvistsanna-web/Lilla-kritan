# Discot – avsnitt 007, bild 15a–16d

Danspausen och sista refrängen i det ljusbruna discot, sedan rutschbanan på kolastranden och "Hej då" kvar i kolan, där `../slutet/` (17, kritirisen) tar vid.
Tagning 5: avsnittstid 2:48.6–3:35.0 (scenen är 46,4 s). Sången är oklippt, så avsnittstid = sångtid + 11 s. Takten kommer från kit.js (92,4 bpm).
Byggt efter 006:s `discot/` (och 005:s) med 007:s figurer, och efter Sannas grovklippsanteckningar 2026-11-06 (#5, #13, #14, #15).

```bash
node render.mjs discot --snabb              # förhandsvisning
node render.mjs discot                      # → discot/discot.mp4 och discot-effekter.wav
node render.mjs discot 1 7 9.5 14.5 27 45   # stillbilder → discot/stills/
python3 discot/gor-plat.py                  # plåten disco-beige.png igen
```

Tiderna kommer ur `../lager/matt.json` (`M.bild`) och `../../rader.txt` (`M.rad`), måtten ur `../../storyboard/bygg.py`.
Plåten är `disco-beige.png`: 006:s plåt omfärgad till beige/ljusbrunt (den första `bruna_discot()`). Ljusen kommer från `../discoljus.js`
med den bruna kulan, men med 006:s bleka käglor, rutor och fläckar, som sätts lokalt (se `BEHOV.md`).

## In från ängen

Inget hårt klipp: `angen/` täcker bilden med kritsvepet (`../kritsvep.js`) i discots väggfärg `#D5BBA1` (ängens uppmätta väggfärg; plåten är #D3B79D) på sina sista 0,6 s, med en hel yta under svepet de täckta bildrutorna,, och discot
börjar helt täckt och smular bort det på 0,6 s (`kritsvep(0.5 + 0.3·del(0, 0.6, t))`), som vagen-2 → ängen och 006. `lager.overst` skalas
som i angen/ (kritsvep.js ritar i 1920 × 1080) och rörelsesymbolerna har den omvända transformen.

## Bilder

| Bild | Vad |
|---|---|
| 15a | "Nu dansar vi loss!": Bulle landar i mitten (boing, jippi), Ludde hoppar in från höger (bää) och Igge trippar in från vänster |
| 15c | "Hoppa, hoppa!": Gurra solo, ett hopp på varje slag. Symbolen "hoppa" syns i hörnet |
| 15d | "Rulla runt!": Igge rullar ihop sig till en boll och rullar fram och tillbaka och gungar. Han snurrar aldrig |
| 15e | "Klappa, klappa!": Mille solo, som i 006. Tassarna möts framför magen på slaget (klapp) |
| 16a | "Kotten, nallen, bullen": klistermärkena slås upp ett i taget stora mitt i bild och flyger upp i raden bredvid kulan |
| 16b | "bruna! (Bruna!)": alla fem gör björnstampet i ett svagt V, sedan klappar de på magen på "den godaste färgen" (mums) |
| 16c | "Rutscha ner i kolasås" tre gånger: kolasåsen väller in, Bulle och nallen åker, plaskar (jubel på "alla bruna!", jippi på sista) och klättrar upp i mellanspelet. Kameran klipper rakt på slaget till halvbild högst upp, och glider lugnt ut till hela stranden på de två slagen före andra åket (QA 2026-11-07: det hårda klippet ut vid 3:19 togs bort) |
| 16d | "Hej då, hej då – tut, tut!": kvar i kolan. Bulle vinkar och guppar till på varje "tut" (plupp) |

Raden med småbilder ligger kvar i discot. På stranden syns den inte, och `slutet/` har den inte heller.

## Övergången till slutet (17)

Sista bildrutan: kameran står på `rb.HEL`. Bulle flyter i kolan på `rb.HAV_X`, `rb.HAV_Y + 6·sin(2,2·t) + 0,6·vag` och vinkar med höger arm
(`r: [1500 + 200·sin(π·fas), −600 + 200·sin(π·fas)]`, `l: [380, 640]`, humor `njuter`/`skrattar`, m 0,5). Kolasåsen ligger kvar.
Det är exakt det `slutet/` ritar, med samma klocka.

## Ljud

- boing (Bulle och Ludde landar, Gurras första hopp), jippi och ba (bää) i 15a, pop och swoosh när Igge rullar, klapp på Milles slag
- klistra (symbolerna och raden), pop (klistermärkena), duns på stampen, mums
- slurp när kolasåsen väller in, swoosh och plask-stor på åken, plupp när han klättrar och på "tut", jubel och jippi på plasken
