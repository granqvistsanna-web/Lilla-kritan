# Kritan ritar (bild 02–03)

Avsnittstid 0:11.0–0:30.4, sångtid 0:00–0:19.4. `node render.mjs kritan-ritar` → `kritan-ritar.mp4` med sångbiten. Jämförelse med storyboarden: `stills/jamforelse.jpg` (storyboarden till vänster).

| Bild | Sångtid | Vad som händer |
|---|---|---|
| 02 | 0:00–6.3 | Kritan poppar fram på papperet och ritar bilens rosa form: kanten 0,5–2,6 s, fyllnaden 2,7–5,7 s. När fyllnaden är klar får bilen en vit klistermärkeskant, samma som musens bil. |
| 02a | 6.3–9.7 | "vad kan det vara?": ett svart hjul med rosa nav (0,9 s), 0,5 s vila, sedan hjul två, på slagen (6,55 och 8,22 s). |
| 02b | 9.7–12.2 | "Vad kan det vara?": den gula framlyktan (10,45 s, 0,7 s). Kritan lyfter och vickar medan den väntar. |
| 02c | 12.2–17.4 | "En bil!" (12,3): stor studs med squash, sedan guppar bilen i takt och hjulen snurrar på stället. "En rosa bil!" (14,3): glad vickning. 15,5–16,7: hjulen rullar fram och tillbaka. "Brum-brum" (16,76 och 17,29): ett hopp med skakning och tre avgaspuffar i krita per brum, med brum-ljud. Kritan tonar ut till 17,4. |
| 03 | 17.4–19.4 | Den färdiga ritade bilen guppar vidare i takt. På "nu kör vi!" (17,94) tänds framlyktan med pling, och en gul ljuskägla i krita pulserar på slagen. Scenen slutar på den ritade bilen; övergången till vägen (rosa moln) läggs i `film/satt-ihop.sh`. |

Måtten kommer från `ritad_bil()` och `drive()` i `storyboard/bygg.py`. Papperet är introts (samma 1920-mått och korn).

**Ordens tider i 02c** är uppmätta i `stammor/vocals.wav`, inte tagna ur `rader.txt`: "Brum-brum" sjungs 1,35 s efter raden där (16,76 i stället för 15,4).

**Sista bilden** är den ritade bilen på papperet med lyktan tänd; molnen i hopsättningen tar över till vagen-1.

**Ljud:** pop (kritan kommer), skrrrrt-kort + skrrrrt-lang i loop under varje streck (kanten, fyllnaden, båda hjulen, lyktan), pop + pling ("En bil!"), brum på varje "brum", pling när lyktan tänds. skrrrrt-filerna är ca 16 dB tystare än pop, så de har vol 3–4 här.

**Krita överallt:** allt som ritas i kod har vaxkorn (`#vax`, som 004) och en ojämn kant. Den ritade bilen har en mildare variant av kitets `#kritkant` (`#kritkant-mild`, utslag 9 i stället för 26, annars fransar sig hjulen och lyktan) och sedan `#vitkant` (en kopia av den i bilen.js). Avgaspuffarna har samma krita och vit kant. Allt i figurlagret kokar med kitets `#boil`.

**Avvikelser:**
- Kritan har 004:s form (med omslag) i den rosa-orange färgen från `krita()` i bygg.py, inte storyboardens raka pinne.
- Bild 03 har ingen zoom in eller övergång: molnen i hopsättningen sköter platsbytet. Inga små effektstreck.
- Storyboardens pil i 02c ritas inte.
