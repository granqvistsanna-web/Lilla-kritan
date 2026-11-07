# 015 – figur-QA (2026-11-07, ca 16:30)

Läst: grovklippet byggt 16:25:59 (`grov2/`, och ett äldre uttag i `grov/`), stillbilder i `stills/`. Inget i scenerna är ändrat.
**Kan vara inaktuellt:** kritan-ritar (16:24), angen-1 (16:24), angen-3 och lamm.js (16:26:08, *efter* grovklippet) och slutet (16:23) ändrades medan jag tittade.
angen-2 (15:59) är inte ändrad sedan dess, så de fynden gäller säkert.

Rangordnat, viktigast först. Tid = avsnittstid.

| # | Scen | Tid | Vad är fel | Förslag | Bild |
|---|---|---|---|---|---|
| 1 | angen-3 (13, och 15 / slutet) ⚠ kan vara inaktuellt | 0:61–0:65 | Strumporna på händerna sitter **under** klövarna: den svarta klöven sticker upp ovanför strumpan, och den vänstra strumpan hänger lös utanför armen. I 15 och i kramen syns strumporna som blå klickar en bit från kroppen. | Fäst handstrumpan i armgruppen (följer armens vinkel) med strumpans öppning över klöven, och lägg den ovanpå klöven. | `stills/crop_angen-3_8_handsocks.jpg`, `stills/crop_angen-3_17_handsocks.jpg` |
| 2 | angen-1 → angen-2 (08, 10) | 0:39.8–0:45.0 | Utsnittet `fotter` skär genom Luddes ögon: överkanten tangerar ögonen i drygt 5 s, ögonen ser avhuggna ut. | Sänk `fotter` så att hela huvudet är ute (bara kropp och fötter), eller höj den ca 60 px så att ögonen och nosen kommer med. Ändra i `KAMERA.fotter` så att båda scenerna följer. | `stills/angen-1_22.5.jpg`, `stills/angen-2_0.1.jpg` |
| 3 | angen-2 (11b) | 0:53.5 | Mor "pekar" med `armR: 40`, men bara klövspetsen sticker ut vid sidan och lutningen är 7°. Det syns inte att hon pekar, och det är svaret på frågan. | Lyft armen fritt från kroppen (ca 70–80°, snett ner mot högen), låt den toppa på "Strumporna!" och hålla 1 s. Eventuellt mer lutning (10–12°). | `stills/angen-2_9.6_mor-pekar.jpg` |
| 4 | angen-3 (13 slutet, 14, 15) ⚠ | 0:65–1:16 | `skrattar` ritas utan mun: angen-3 skickar `m: 0` (rad 123 för Ludde, standardvärdet för far och mor), och då försvinner den öppna munnen. ^^-ögon och bara nosen ser sömniga ut, inte skrattande. I angen-1 (05, 0:24.5) har Ludde den öppna munnen. | Ge `m: 0.6–0.8` när humöret är `skrattar` (eller lägg det i lamm.js, så att `m` bara skriver över när det anges). | `stills/angen-3_12.5.jpg`, `stills/crop_angen-3_17_handsocks.jpg` |
| 5 | angen-2 (11b) | 0:54.45 | Han sätter sig i ett enda hopp: stående rigg → sittande bild på en ruta. Kroppen faller ca 30 px och benen slår ut, efter en huk på bara 0,2 s. | Längre och djupare huk (0,3 s, sy 0.85), byt bild i botten av huken och låt sittbilden landa med en tydligare efterstuds, eller tona över 2–3 rutor. | `stills/angen-2_sattersig_9.98-10.2.jpg` |
| 6 | angen-3 (14) ⚠ | 0:66–0:71 | Far "visar rocken" med armarna ±55, men riggens korta armar stannar inne i kroppens kontur (bara klövspetsarna syns), och samma sak för mors ±45. Brunt på brunt försvinner (crayon-cutout: en arm som vinkar ska lyftas fritt från kroppen). | Större vinkel (±90–110) så att armarna kommer ut över ytterkanten, eller låt dem peka på plagget i stället. | `stills/angen-3_12.5.jpg` |
| 7 | kritan-ritar → angen-1 (02 → 03) ⚠ | 0:19.0–0:20.8 | Kameran zoomar in mot Ludde till 0:20.0, står still i 0,2 s (tpad) och glider sedan genast ut till helbilden: in, stopp, ut på 1,8 s ser ut som en studs. | Låt 02 landa på helbilden (som förut), eller håll det nära utsnittet ca 1 s och glid ut med en mjuk ease-in-out. | `skarv-0200-ny.jpg` |
| 8 | angen-1 (06) | 0:28.2–0:34 | En smal remsa av mor/far i vänsterkanten med ett öga synligt under hela halvbilden. Den drar blicken. | Flytta utsnittet ca 40 px åt höger, så att ögat hamnar utanför bild (eller så att det syns mer av ansiktet). | `grov/29.jpg`, `grov/31.jpg` |
| 9 | angen-3 (12) ⚠ | 0:56–0:60 | Ludde tittar rakt fram medan han tar på strumporna. Storyboarden: han tar på dem själv. | `titt` mot foten och `tittY: 1` medan strumpan glider på. | `stills/angen-3_2.jpg` |
| 10 | angen-2 (10) | 0:44.6–0:47 | "Tittar ner på sina bara fötter": `ledsen` med tittY 0.5 ger bara en liten sänkning av pupillerna. | `tittY: 1` (som i 08). | `stills/angen-2_1.2.jpg` |
| 11 | slutet (17) ⚠ | 1:20–1:23 | Hjärtana har ingen vit kant (vita-kanter: alla saker). De blå handstrumporna på fars blå rock smälter ihop. | `kant.lagg(g, { andel: 0.01 })` på hjärtgruppen. | `stills/slutet_4.6.jpg` |

## Det som är bra
- Storleken stämmer i alla skarvar jag stämt av (0:44.4, 0:55.0, 0:76.4): samma figur, samma storlek, samma läge.
- Fötterna står på GOLV i alla bilder, också i kramen och sittposen. Inga ben eller armar lossnar, inga figurer snurrar.
- De vita kanterna finns på alla tre lammen, Fia, säcken, högen och de lösa strumporna. De är tunnare i helbild och tjockare i närbild, som regeln säger.
- Humören stämmer med storyboarden i 03, 05, 07, 08, 11, 12 och 17 (karleksfull med kinderna).
- Rocken och kjolen sitter på kropparna, och tussarna sitter i ringen.
