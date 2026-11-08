# Bildlista – Avsnitt 013 (v2 med kaninen, plan)

Det fasta (intro, outro, papper, kritsvep, ljud) finns redan i `assets/format/` och ska inte listas här. Lista bara det som är **nytt** i avsnittet. Det som redan finns i `assets/` står inom parentes. Bildnumren är [storyboard-v2](storyboard-v2/storyboard.md).

## Finns redan

| # | Typ | Vad | Fil | v2? |
|---|---|---|---|---|
| 1 | Figur | (Kaninen Kanel), huvudfigur, riggad | `assets/karaktarer/kaninen-kanel/premium/` | ✅ |
| 2 | Sak | (Brandbil E) i storyboarden, ett helt urklipp (stege, ratt, blåljus och rand finns i bilden) | `assets/rekvisita/brandbil-rod/cut/brandbil-e.png` | ✅ |
| 3 | Bakgrund | (Vägen), plats A: teal vägg och en grå väg | `assets/stiltest-premium/vagen-teal.png` (1376×768, gör om i 2K) + träd- och gräsurklipp | ✅ |
| 3b | Bakgrund | (Doodle-tapeten) bakom äppelbacken | `assets/stiltest-premium/skogen-monster-mild-a.png` | ✅ |
| 4 | Sak | (Chilibilen), musen kör den | `assets/rekvisita/chilibil/cut/chilibil.png` | ✅ |
| 4b | Sak | (Chilin), musen bjuder | `assets/rekvisita/chili/cut/chili.png` (896×1200) | ✅ |
| 5 | Sak | (Röda äpplet), bitarna i kod | `assets/rekvisita/applet-rott/cut/` | v1 |
| 6 | Sak | (Gosekaninen), fastspänd bak på brandbilen | `assets/rekvisita/gosekanin/cut/gosekanin-v4.png` | v1 |
| 7 | Figur | (Grodan Gurra), hoppar i danspausen (13d) | `assets/karaktarer/grodan-gurra/premium/cut/` (delar, ingen rigg-json än) | ✅ |
| 8 | Figur | (Musen Mille), kompisen, riggad | `assets/karaktarer/musen-mille/premium/` | ✅ |
| 9 | Statister | (Björnen Bulle stampar, Lammet Ludde viftar, i danspausen) | `assets/karaktarer/bjornen-bulle/premium/`, `lammet-ludde/premium/` | ✅ |
| 9b | Sak | Röda bussen utan ansikte (röd sak 1), i kod tills en v2-buss finns (Bettan är v1) | `storyboard-v2/buss.png` | i kod |

## Behöver göras

| # | Typ | Vad | Hur | Klar |
|---|---|---|---|---|
| 10 | Sång | **Ny Suno-tagning med den nya strukturen** (äpplet i introt, rallyt på äppelbacken, chilibilen, slangen; prompten i [suno.md](suno.md)). Tagning 2 (`sang.m4a`, `rader.txt`) har den gamla texten; tiderna mäts om när den nya är tagen | Sanna i Suno | ☐ |
| 10b | Bild | **Nya röda brandbilen, E vald** (`assets/rekvisita/brandbil-rod/brandbil-rod-v2-e.jpg`): lång låg balja som v2-bilen, stegen längs sidan, blåljus på nosen, slangrulle. Ska putsas (vit klistermärkeskant, enklare ratt och stötfångare, grå nav), klipps sedan i delar och ersätter platshållaren | Sanna putsar | ◐ |
| 11 | Titelkort | Avsnitt 13 · Röda sången + liten röd brandbil | ny text | ☐ |
| 12 | Kod | **Munformen "tunga"** för kaninen (06b, 06c, 09, 12d): rosa `#e7898c` droppe i `oppen`-munnen | i `uttryck.html` | ☐ |
| 13 | Kod | **Blåsmunnen** för kaninen (05d): liten rund `o` | i `uttryck.html` | ☐ |
| 15 | Kod | **Blåljuset** på en fot, lyser stilla | i kod | ☐ |
| 16 | Kod | **Röda ballongen** på ett snöre (05c–05d) | i kod tills bilden finns ([`rekvisita/ballong-rod.md`](../../rekvisita/ballong-rod.md)) | ☐ |
| 17 | Bild + kod | **Äppelbacken** (plats B, refrängen): plattan `assets/bakgrunder/appelbacken/appelbacken.png` och äppelträdet `appelbacken-saker/cut/appeltrad-mork.png` finns och ligger i storyboarden. Kvar i kod: jätteäpplena att studsa på, mållinjen och **äppelsvepet** (övergång) med `applet-rott` ([refrang-plan.md](refrang-plan.md)) | i kod | ◐ |
| 18 | Kod | Discot omfärgat till ljusrött | i kod | ☐ |
| 19 | Kod | **Slangen och vattnet** (12a–12d): slang från slangrullen till musens tassar, vattenbåge, regn. **Rosiga kinder** för kaninen (11a–11c) | i kod | ☐ |
| 20 | Bild, valfri | **Kanels främre armar** `kanel-arm-l-fram.png`, `-arm-r-fram.png` för klappen mot ratten (04a); tills dess tassarna på rattkanten | Sanna genererar | ☐ |
| 21 | Rigg, valfri | Gurras rigg (`gurra-rigg.json`) för hoppet i 13d; annars hoppar hela urklippet | med `lk-figur` | ☐ |

Används inte längre (bara v2-figurer, ny struktur 2026-11-08): Skogen grön och stegen som fälls upp, Bussen Bettan, Flygplanet Pella, Hästen Hulda, Hunden Hugo, Äppelbacken med rutschkanan, Nyckelpigan Nicke (bytt mot musen 2026-11-07), Leoparden Lova (hon är huvudfigur i 014 Gröna traktorn), Lovas hjälm, Vägen (v1-plattan), Äppelträdet (v1-plattan), `brandbil-rod` med öppet säte (v2-bilen tar dess plats).

## Kamerainställningar (max 6)
1. Kritan ritar · papper
2. Vägen · helbild och halvnära
3. Närbild kaninen i brandbilen
4. Äppelbacken · helbild (refrängen)
5. Äppelbacken · närbild på marken (studsen på äpplena)
6. Dansbild (teal-tapeten och discot)
