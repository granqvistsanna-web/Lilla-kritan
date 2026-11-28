# Avsnitt 062 – Sommaren i boken (plan)

**Status:** ✅ grind 1 (manus) godkänd av Sanna 2026-11-27 (*"Ja, godkänt"*), med förslagen under Öppet som de står (egen serie med boken som intro, boken stängs i slutet, grodans rigg på kortet, kritan ritar solen). ✅ Grind 2 (rekvisita) godkänd 2026-11-27 (*"Ja, grind 3"*): `rekvisita/sol-gul.md` och `rekvisita/glass-rosa.md`, utklipp med tunnad kant (ca 1 %) och kritans konturer i `assets/rekvisita/sol-gul/` och `assets/rekvisita/glass-rosa/`. Grind 3 (rösten) klar för granskning 2026-11-27: Sannas tagning 1 (`produktion/ljud-original/roster/062/malin-tagning-1.mp3`, med hennes ändringar: *"Ha ha, hoppsan!"*, *"Ja, bra idé!"*, ett plask, barnet letar efter blommorna i stället för bladet) delad i 39 filer i `assets/ljud/roster/sommaren-i-boken/`, −3 dBFS, längderna under replikblocket. Första avsnittet i **Kritans bok**: bilderboken (`format/bilderbok.md`, skillen `bilderbok`) berättad i pop-up-boken i three.js (`produktion/three-rum/popupbok/`, prov 2 committat 2026-11-27 som a9549e55). Ingen sång. Malin pratar med grodan, och grodan svarar med kvak, ögon och små hopp. ✅ Grind 3 (rösten) godkänd 2026-11-27. ✅ Grind 4 (ljuden) klar 2026-11-27: bara befintliga ljud, grodans val per uppslag i `ljud-effekter.md`. Grind 5 (animatik) klar för granskning 2026-11-27: `storyboard/` (34 stillbilder i three.js-boken, `animatik.mp4` 2:16,5 med Malin, grodan och effekterna). Grodan är det platta kortet i stillbilderna, riggen kommer i scenen. ✅ Grind 5 godkänd 2026-11-27 (*"Ja, grind 6"*). Grind 6 (förhandsvisning) klar för granskning 2026-11-27: `scener/boken/` (`boken.js`, `boken.mp4` med `--snabb`, 2:15,5), grodans v2-rigg på kortet, kritan via `verktyg/kritan-ritar.js`. Ändringar mot manuset: glassen når nosen när grodan slickar (rad 12, armarna är för korta för en droppe uppifrån), korten fälls ner med grodan först (det som reste sig sist ligger underst), blommorna syns mer bakom busken (Sanna 27/11). Nya grodljud görs i ElevenLabs i en egen session.

| | |
|---|---|
| **Titel** | Sommaren i boken (avsnitt 62) |
| **Figurer (1)** | **Grodan** ([`karaktarer/grodan-gurra.md`](../../karaktarer/grodan-gurra.md)), v2-rigg i `assets/karaktarer/grodan-gurra/premium/uttryck.html`. Riggen ritas på grodans kort som Kanel i `produktion/three-rum/lekrummet/` |
| **Platser (1)** | **Sommaruppslaget i Kritans bok**: skrivbordet med boken, och inne i boken himlen på pärmen, kullarna, granarna, dammen med näckrosbladen och gräset. Inget platsbyte |
| **Saker som finns** | Sannas Flow-bilder 2026-11-27 i `produktion/three-rum/popupbok/bilder/`: himlen, solen, molnen, kullarna, hinken med spaden, sandhögen med sandslottet, blommorna, glassen. Ur `assets/bakgrunder/`: granarna, buskarna, dammen, näckrosbladen, vassen |
| **Nya saker** | inga nya bilder. Gula solen (`rekvisita/sol-gul.md`: skivan som kontur, tolv strålar som streck) och rosa glassen (`rekvisita/glass-rosa.md`: kontur, skarven och två våffelstreck), grind 2 |
| **I kod** | solens värme (varmare ljus), stänk och droppar vid plasket, glassdroppen på näsan, skimret, bokens öppning och stängning |
| **Musik** | ingen ny musik. `skogsljud` lågt under hela scenen |
| **Kärna** | Boken öppnas och det är sommar, men solen saknas. Kritan ritar solen, och det blir varmt. Grodan kommer upp på sitt blad: *"Hej, grodan!"* Grodan blir så varm. Kritan ritar en glass: *"Varsågod!"* – *"Tack, kritan!"* En glassdroppe hamnar på näsan. Sedan svalkar sig grodan i dammen: *"Hopp … plask!"* Var är blommorna? Barnet hittar dem bakom busken. Sedan poppar sandslottet upp. Hej då, och boken stängs. |
| **Samtal** | Malin frågar grodan, grodan svarar med kvak i pausen, Malin reagerar kort som om hon förstått. Raderna markerade ✱ |
| **Barnet** | gissar kritans två teckningar (solen, glassen) och hittar blommorna bakom busken (rad 18). Barnet ser blommornas toppar sticka fram redan på rad 17, så barnet vet mer än grodan |
| **Favoriter** | 🐸 groda · ☀️ sol · 🍦 glass · 🌸 blommor · 🏖️ sand |

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när de har landat), utom frågorna, som kommer först. Kamerorna klipper mellan stillastående utsnitt, utom öppningen, där kameran glider in i boken (som provet och referensen). Alla kort är platta urklipp med vit kant som fälls upp och ner kring sin fot.

| Rörelse | Hur |
|---|---|
| Boken öppnas | som prov 2: pärmen slås upp till stående (0,9 s) med himlen på insidan, alla kort fälls upp tätt efter varandra (ca 0,8 s), grodans kort ligger kvar nedfällt. `prassel-tyg` |
| Kameran glider in | en lång, lugn glidning från bordet in i boken (ca 4 s), sedan klipp |
| Kritan ritar på himlen | kritan (liten, utan ansikte, via `verktyg/kritan-ritar.js`) ritar solens kontur på himlen: cirkeln och strålarna, 2–6 detaljstreck mätta ur bilden. Gisspaus 3 s, kritan svajar. Solen fylls i inifrån, `glitter`, och ljuset blir varmare |
| Kritan ritar på sidan | samma, en glass på gräset bredvid dammen: strutens kontur, rutmönstret som två streck, kulan. Gisspaus 3 s. Teckningen fylls i, och kortet fälls upp med ett `pop` |
| Grodans kort fälls upp | som de andra korten, med en liten efterstudsning, `pop`. Grodan står på sitt näckrosblad |
| Varm | ljuset blir varmare (gradering), grodan tittar upp mot solen (`rikt` uppåt), kinderna rosigare, en lugn suck med axlarna nedåt. Inget svettigt eller ledset |
| Glassen i handen | glassen glider i en båge till handen och är ca en tredjedel av grodans höjd (`GS` 0,75). Tassen ritas framför struten, armen får en mörkare kritkant (receptets "hålla en sak") |
| Smakar | glassen lyfts till munnen, en liten bit av kulan är borta **på ordet "Mums"**, `slick` |
| Droppen på näsan | en rosa droppe faller från kulan och landar på grodans näsa (ritad i kod). Grodan tittar i kors upp mot den, skakar lugnt på huvudet (±4°), droppen faller ner i dammen, `plupp` |
| Glassen är slut | grodan slickar upp det sista av kulan (tre slick) och äter upp struten i två tuggor, handen är tom |
| Hopp … plask | grodan hukar, ett lugnt hopp i en båge ut i dammen. **På ordet "plask"** landar hon mitt i vattnet och sjunker ner till axlarna (bad 4), vattnet stänker och ringar sig, `plask`. Droppar faller på grodan, som blundar glatt |
| Badar | hon simmar ett varv (helbild, simtagen syns över ytan) och plaskar med händerna på *"Plask, plask, plask!"*; upp ur vattnet i själva hoppet upp på bladet |
| Blommorna | fyra enskilda blommor (röd, gul, lila, rosa) står vid stranden från början. De skimrar svagt när barnet letar, tydligt på *"Ja, där är blommorna!"*, och varje blomma studsar på sitt färgord. Grodans ansikte och blommorna är i samma bild |
| Sandslottet | grodan tar spaden ur hinken, fyller hinken, vänder den över sandhögen och lyfter på *"lyft!"* (två torn). Hela slottet reser sig **på ordet** "sandslott", grodan lägger spaden i hinken och klappar. Grodan vänder sig mot det (riktningsposen, figuren speglas aldrig) |
| Luktar | grodan lutar sig mot blommorna, blundar, en lugn suck |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, hela armen syns |
| Boken stängs | kameran glider ut till bordet (1,5 s) medan korten fälls ner (grodan först, det som reste sig sist ligger underst), sedan slås pärmen igen (0,7 s) och den stängda boken står kvar mitt i bild ca 1 s med en svag push in. Ersätter kritirisen (Öppet 2) |

**Inget går genom något:** korten fälls ner åt samma håll och i den ordningen att det som reser sig först ligger överst (provets regel). Pärmen slås igen först när alla kort ligger platt. Grodan landar **på** bladen eller mitt i dammen (badet), aldrig genom sidan. Glassen ligger i handens spets, framför tassen. Pärmen faller först när kameran är ute, aldrig genom kamerans siktlinje. Täta bilder (6 per sekund) i QA runt raderna 01b, 9, 11, 12, 15, 19, 20, 22 och 26.

## INTRO

Lilla Kritans logotyp 1 s, sedan skrivbordet med den stängda boken. Inget kort med *"Djuren hittar på!"* och inget ritintro på papper: boken och solen som kritan ritar gör det jobbet (Öppet 1).

## BOKEN

| # | Bild (en rörelse) | Malin säger | Grodan svarar, ljud |
|---|---|---|---|
| 01a | Helbild, skrivbordet: den stängda boken med grodans siluett, ljuset glimtar över pärmen | Titta! En bok. | `skogsljud` lågt, `glimt` |
| 01b | Pärmen slås upp, korten fälls upp, kameran börjar glida in | Oj! Det är sommar i boken! | `prassel-tyg`, `pop` mjukt |
| 02 | Kameran glider in och stannar. Himlen är tom, molnen glider | Himlen är blå. Men var är solen? | – |
| 03 | Kritan kommer in och ritar solens kontur på himlen, svajar sedan | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus 3 s)* | `krita-ritar` |
| 04 | Solen fylls i och glimtar, ljuset blir varmare | Oj! En sol! | `glitter`, `tindra` |
| 05 | Halvbild, grodans kort fälls upp på sitt blad. Grodan vinkar | Hej, grodan! Hej, hej! | `pop`, kvak hej |
| 05b ✱ | Samma, grodan tittar runt och sedan på oss. **Pausen:** glatt kvak | Hur är det, grodan? *(paus: glatt kvak)* Jaså, du tycker om sommaren! | förtjust kvak |
| 06 | Halvbild, grodan tittar upp mot solen, ljuset blir ännu varmare | Solen skiner. Det blir varmt! | `tindra` svagt |
| 07 | Närbild, grodan suckar, rosiga kinder, axlarna ner | Puh! Grodan är så varm. | trött kvak |
| 07b ✱ | Samma, grodan tittar på oss. **Pausen:** trött kvak | Är du varm, grodan? *(paus: trött kvak)* Hm … vad gör vi nu? | frågande kvak |
| 08 | Kritan kommer in och ritar en glass på gräset bredvid grodan (nära bild), svajar | Titta! Kritan ritar något. *(gisspaus 3 s)* | `krita-ritar` |
| 09 | Glassen fylls i, kortet fälls upp. Grodan ser den, stora glada ögon (kawaii) | En glass! Varsågod, grodan. | `glitter`, `pop`, förtjust kvak |
| 10 | Närbild, grodan nickar | Tack, kritan! | glatt kvak |
| 11 | Halvbild: glassen glider till grodans hand. Grodan smakar, en bit av kulan är borta på *"Mums"* | Grodan smakar på glassen. Mums! | `swoosh` mjukt, `slick` |
| 11b ✱ | Närbild, grodan blundar glatt. **Pausen:** mysigt kvak | Är glassen kall och god? *(paus: mysigt kvak)* Mmm, kall glass när det är varmt! | mysig suck |
| 12 | Närbild: en rosa droppe faller från kulan och landar på grodans näsa. Grodan tittar i kors upp mot den | Oj! Glass på näsan! | `plupp` mjukt, förvånat kvak |
| 12b | Samma, grodan skakar lugnt på huvudet, droppen faller ner i dammen | Ha ha, hoppsan! | `plupp`, fniss-kvak |
| 13 | Halvbild: struten är tom, den glider ner på gräset och kortet fälls ner. Grodan tittar ut över dammen | Nu är glassen slut. Det är fortfarande varmt. | – |
| 14 ✱ | Bred bild över dammen med två näckrosblad. Grodan tittar på vattnet | Ska du svalka dig i dammen? *(paus: glatt kvak, nick)* Ja, bra idé! | `vagor` svagt, förtjust kvak |
| 15 | Halvbild: grodan hoppar till nästa blad, vattnet stänker på *"plask"* | Hopp … plask! | `hopp-mjuk`, `plask`, `droppar` |
| 15b | Närbild, droppar faller på grodan, hon blundar glatt | Ah, vad skönt! | glatt kvak |
| 16 ✱ | Närbild, grodan sval och glad, droppar glittrar | Nu är du sval och glad! *(paus: förtjust kvak)* | förtjust kvak |
| 17 | Halvbild, grodan tittar runt. Fyra blommor (röd, gul, lila, rosa) står i en rad vid stranden, synliga från början | Vad mer finns på sommaren? | frågande kvak |
| 18 | Hela uppslaget. Barnet tittar (3 s), blommorna skimrar svagt efter 2 s | Ser du några blommor? *(paus 3 s)* | tyst, `glimt-2` svagt |
| 19 | Närbild på blommorna, de studsar lite. Grodan glad | Ja, där är blommorna! | `glimt`, förtjust kvak |
| 19b | Samma. Varje blomma studsar och glimtar på sitt färgord | En röd blomma! En gul blomma! Och en lila och en rosa! | `glimt` per blomma |
| 20 | Halvbild: grodan hoppar till stranden bredvid blommorna och tittar på dem | Vad fina! | `hopp-mjuk`, mysigt kvak |
| 21 | Närbild, grodan lutar sig mot blommorna, blundar och luktar | Mmm … vad gott de luktar. | mysig suck |
| 22 | Halvbild: sandslottets kort fälls upp på *"sandslott"*, hinken bredvid. Grodan klappar glatt | Och sand! Titta, ett sandslott! | `pop`, `klapp`, fniss-kvak |
| 23 ✱ | Närbild, grodan tittar på oss | Var det en fin sommardag, grodan? *(paus: glatt kvak, nick)* | förtjust kvak |
| 24 | Halvbild, grodan vinkar (armen bakom kroppen), solen glimtar | Hej då, grodan! Hej då, solen! | kvak hej då |
| 25 | Samma, grodan vinkar klart | Hej då! Vi ses snart! | kvak hej då |
| 26 | Kameran glider ut ur boken. Korten fälls ner, grodan sist, pärmen slås igen | – | `prassel-tyg`, `landa-mjuk` |

**Längd:** 39 röstfiler (63 s tal i tagning 1) och ca 33 bilder. Animatiken (grind 5) är 2:16,5 med loggan, kortare än planen efter Sannas strykningar i tagning 1. Förut: sikta på ca 3:00–3:20 med 057:s tempo (`GLES` 0,15 s, barnets pauser orörda: gisspauserna 3 s, letandet 5 s).

**Short:** uppslag 14–21 (plasket och blommorna bakom busken), ca 45 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/sommaren-i-boken/` (`01-titta-en-bok` …). Listan till `dela-tagning.py` är [`rost.txt`](rost.txt). Blocket nedan är som Sanna läste in det i tagning 1.

```
[warmly] Titta! En bok.
[happy] Oj! Det är sommar i boken!
[curious] Himlen är blå. Men var är solen?
[warmly] Kritan ritar …
[curious] Vad blir det nu?
[happy] Oj! En sol!
[happy] Hej, grodan! Hej, hej!
[warmly] Hur är det, grodan?
[happy] Jaså, du tycker om sommaren!
[warmly] Solen skiner. Det blir varmt!
[chuckles] Puh! Grodan är så varm.
[warmly] Är du varm, grodan?
[curious] Hm … vad gör vi nu?
[happy] Titta! Kritan ritar något.
[happy] En glass! Varsågod, grodan.
[happy] Tack, kritan!
[warmly] Grodan smakar på glassen. Mums!
[curious] Är glassen kall och god?
[happy sigh] Mmm, kall glass när det är varmt!
[surprised] Oj! Glass på näsan!
[laughs] Ha ha, hoppsan!
[warmly] Nu är glassen slut. Det är fortfarande varmt.
[cheerfully] Ska du svalka dig i dammen?
[happy] Ja, bra idé!
[playfully] Hopp … plask!
[happy sigh] Ah, vad skönt!
[happy] Nu är du sval och glad!
[curious] Vad mer finns på sommaren?
[curious] Ser du några blommor?
[happy] Ja, där är blommorna!
[happy] En röd blomma!
[happy] En gul blomma!
[warmly] Och en lila och en rosa!
[happy] Vad fina!
[happy sigh] Mmm … vad gott de luktar.
[happy] Och sand!
[happy] Titta, ett sandslott!
[warmly] Var det en fin sommardag, grodan?
[happy] Hej då, grodan! Hej då, solen!
[warmly] Hej då! Vi ses snart! [giggles]
```

**Tagning 1 (Sanna 2026-11-27), längder efter normalisering (blir `ROST` i `rader.mjs`):** 01 1,69 · 02 2,25 · 03 2,79 · 04 1,46 · 05 1,69 · 06 1,49 · 07 1,62 · 08 1,01 · 09 2,01 · 10 2,32 · 11 2,34 · 12 1,21 · 13 1,50 · 14 2,09 · 15 2,23 · 16 1,00 · 17 2,73 · 18 1,53 · 19 2,66 · 20 1,98 · 21 1,44 · 22 2,83 · 23 1,42 · 24 1,31 · 25 1,27 · 26 1,49 · 27 1,59 · 28 1,41 · 29 0,83 · 30 0,83 · 31 1,86 · 32 1,29 · 33 0,93 · 34 2,05 · 35 0,82 · 36 1,70 · 37 1,83 · 38 2,14 · 39 2,51 s

**Runda 4 (Sanna 2026-11-27):** blommorna gömmer sig inte längre. Malin frågar *"Ser du några blommor?"* och säger färgerna. Replikerna 29–31 (*"Blommor!"*, *"Var är blommorna?"*, *"Kan du hjälpa grodan att hitta blommor?"*) används inte. Tagning 2 (ElevenLabs v3, Natural, `produktion/ljud-original/roster/062/malin-tagning-2a.mp3`, 43 ur 2b där 2a klipptes av i "rosa"): 40 1,36 · 41 1,20 · 42 1,19 · 43 2,63 s. Enskilda blommor ur `rekvisita/blomma-rod`, `blommor-gula`, `blomma-rosa` (lila, rosa) och lövträd (`skogen-saker/trad.png`, `lekplatsen-saker/appeltrad.png`, `rekvisita/ek`) bland granarna.

**Runda 6 (Sanna 2026-11-27, feedback på runda 5):** allt fälls upp när boken öppnas, också grodan och sandslottet (sandslottet studsar och glimtar på *"sandslott"* i stället för att poppa upp, grodan står redan på bladet på *"Hej, grodan!"*). Solens strålar ritas som bildens tjocka, rundade strålar (ut, runt toppen, in, medurs), så att kritans rörelse och teckningen blir bilden, och kritan ritar lugnare (4,4 s). Solen gungar lugnt ±2° i stället för att snurra hela tiden. Blommorna 0,72 av förut. Hinken och sandslottet i ett sandhörn längst fram till vänster, glassen ritas lite närmare dammen.

**Runda 7 (Sanna 2026-11-27, *"Både A och B"*):** utkast A och B under Öppet är byggda. **A:** på bad 4 simmar grodan ett varv i dammen (rad 15c, *"Grodan badar!"*) och plaskar med händerna (rad 15d, *"Är vattnet svalt, grodan?"* – fniss-kvak – *"Plask, plask, plask!"*). **B:** sandhögen och hinken står uppe från början, slottet är inte byggt. Grodan hoppar över bladen till sandhörnet (rad 22, *"Och sand! Titta, en hink och en spade."*), svarar ja (22b), tar spaden ur hinken och fyller den (22c), hinken vänds över sandhögen och lyfts på *"lyft!"* (22d), torn 1 i närbild (22e), en gång till (22f), och på *"sandslott"* reser sig mitten och hela slottet står (22g); grodan klappar med spaden i handen. Bilderna är Sannas hink.png och sand.png delade i `produktion/three-rum/popupbok/bilder/delat/` (hinken utan spade, spaden, sandhögen, två torn och mitten), inga nya bilder. Sandhögen är 1,5 gånger större (0,36) och hinken lite mindre (0,22), så att hinken kan forma tornen. **Rösten:** tagning 4 (ElevenLabs v3, Natural, `produktion/ljud-original/roster/062/malin-tagning-4.mp3`) delad i repliker 47–57 (`rost-4.txt`), −3 dBFS: 47 1,55 · 48 1,66 · 49 1,55 · 50 2,20 · 51 1,86 · 52 1,45 · 53 2,02 · 54 2,25 · 55 1,02 · 56 1,91 · 57 1,52 s.

```
[happy] Grodan badar!
[curious] Är vattnet svalt, grodan?
[playfully] Plask, plask, plask!
[curious] Titta, en hink och en spade.
[curious] Ska du bygga ett sandslott, grodan?
[happy] Ja, vad kul!
[warmly] Grodan fyller hinken med sand.
[playfully] Vänd på hinken … och lyft!
[happy] Ett torn!
[playfully] En gång till … och lyft!
[happy] Ett, två torn!
```

**Bad 4 (Sanna 2026-11-27, *"is there any way to get frog to bada in dammen?"*, *"Yes, use bad 4"*):** grodan hoppar mitt ut i dammen på *"plask"* och sjunker till bröstet, utan blad under och utan vågkort. Figuren glider ner i sitt kort, det under vattenlinjen ritas inte och en vågig vattenkant i dammens färg täcker snittet. Hon guppar lugnt, ringarna sprider sig, och hon kommer upp ur vattnet i själva hoppet upp på bladet (står aldrig på vattnet). Stillbilder i `scener/boken/stills-prov/bad4-*.jpg`, bad 1–3 kvar med `?bad=`.

**Runda 5 (Sanna 2026-11-27, feedback på runda 4):** pärmens siluett är solen, solen är större och har ansikte (ritat i kod), replikerna 10 (*"Solen skiner. Det blir varmt!"*) och 12 (*"Är du varm, grodan?"*) används inte (för mycket "varm"), grodan äter upp hela glassen med struten (två tuggor, ingen tom strut på gräset), lugna vattenringar under bladen (glädjeskutten, badet, hoppet upp), blommorna utspridda, sandfläck under sandslottet, sandslottet till vänster om hinken, kamerorna visar inget utanför boken. Hej då: solen i bild på *"Hej då, solen!"*, sedan tre nya repliker med en bild var. Tagning 3 (ElevenLabs v3, Natural, `produktion/ljud-original/roster/062/malin-tagning-3.mp3`): 44 *"Hej då, blommorna!"* 1,37 · 45 *"Hej då, sandslottet!"* 1,71 · 46 *"Hej då, dammen!"* 1,30 s.

38 rader. Inga tomma medhåll (*"Ja, det är du"*, *"Ja, det tycker jag också"*, Sanna 2026-11-27): Malins reaktion säger något nytt. Ord som mäts per tagning: *"plask"* i 25, 27 och 31 (`PLASK`), *"Mums"* i 17, *"Blommor"* i 33 och *"sandslott"* i 35 (korten fälls upp på orden).

## Grodans röst och ljuden

| Ljud | Finns? | Rader |
|---|---|---|
| Grodans familj, 8 känslor i seriens ordning (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trött/trumpen, 7 pratar, 8 hej då), förslag `kvak-gullig` | befintliga ljud (Sanna 2026-11-27): `kvak` 1–4 och känsloljud, mest musens `mus-*`. Valda 2026-11-27, ljud per uppslag i `ljud-effekter.md`. Inga nya ElevenLabs-ljud | genom hela, aldrig samma två gånger i rad |
| `pop`, `prassel-tyg`, `glimt`, `glimt-2`, `glitter`, `tindra`, `krita-ritar`, `skogsljud` | ja (provet och 061) | öppningen, kritans teckningar, korten |
| `slick`, `plupp`, `swoosh`, `hopp-mjuk`, `plask`, `droppar`, `vagor`, `klapp`, `landa-mjuk` | ja | glassen, droppen, hoppen, sandslottet, stängningen |

Fniss på rad 12b och 22 (`olle-fniss-4`).

## Regelkoll

- [x] 1 figur (grodan), 1 plats (sommaruppslaget), inget platsbyte
- [x] Inga djurnamn: "grodan", "kritan", "solen", "glassen". Röstfilerna heter `07-hej-grodan` osv.
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Aldrig *"Vad kan det vara?"*, *"Vad säger man?"*, *"Ska vi säga tack?"* eller *"Ni pratar visst med varandra"*. Ritteckningen: *"Hm … vad blir det nu?"*, tacket direkt: *"Tack, kritan!"*
- [x] Kritan ritar två gånger (solen, glassen), och den första är en sak ur berättelsen, inte figuren
- [x] Inga uppmaningar att göra något med kroppen. Barnets del: gissa teckningarna och **leta efter blommorna** (5 s, närbild med topparna bakom busken, skimmer efter 3 s, *"Ja, där är blommorna!"*)
- [x] *"Varsågod"* och *"Tack, kritan!"*
- [x] Samma fras tre gånger: *"Hopp … plask!"* (rad 15, 16, 20), den tredje efter barnets hjälp
- [x] Samtal: Malin frågar, grodan svarar i pausen, Malin reagerar (05b, 07b, 11b, 14–14b, 20b, 23). Inga tomma medhåll som *"Ja, det är du"*
- [x] Tydliga repliker: handlingen och saken sägs (*"Grodan smakar på glassen"*, *"Ska du svalka dig i dammen?"*)
- [x] Reaktionsslag och närbilder: 05b, 07, 10, 11b, 12, 15b, 19, 20b, 21b, 23
- [x] Bilden på orden: solen fylls i på *"En sol!"*, bit borta på *"Mums"*, stänk på *"plask"*, korten upp på *"Blommor!"* och *"sandslott"*
- [x] Malin efter handlingen, frågorna före
- [x] Inget går genom något (se *Så rör det sig*)
- [x] Rörelserna går med en vanlig v2-rigg: raka armar, glassen i handens spets, klapp, vink bakom kroppen, lugna hopp utan studs. Figuren vänds aldrig
- [x] Inga utdragna ord (*"Puh!"* och *"Ah"* är korta)
- [x] Inget läskigt: värmen är mild och går över, ingen gråt
- [x] Ingen ny musik. Allt innehåll på svenska
- [ ] **Problemet är "för varmt", inte "vill inte".** Som 061 ("kan inte") är det ett vardagsproblem utan trots
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] **Nytt avsteg:** inget *"Djuren hittar på!"*-intro och inget ritintro på papper. Boken öppnas i stället, och kritan ritar solen inne i boken (Öppet 1)
- [ ] **Nytt avsteg:** kameran glider in i boken i början och ut i slutet, i stället för zoom in från papperet och kritirisen (Öppet 2)
- [ ] **Förutsättning som inte är uppfylld:** grodan har ingen hel ljudfamilj (grind 4), och grodans figurfil säger `⏳ Inget referensark ännu` fast riggen finns
- [ ] `harriets-favoriter.md`: rad tillagd som förslag, numret bekräftas när manuset är godkänt

## Öppet (Sanna bestämmer)

1. **Introt:** är Kritans bok en egen serie med boken som intro (logotypen 1 s, sedan den stängda boken), eller en del av *Djuren hittar på!* med det kortet före boken? Mitt förslag: egen serie. Boken är introt, och kritan ritar solen som första teckning.
2. **Slutet:** boken stängs (korten fälls ner, pärmen slås igen) i stället för kritirisen. Det blir en fin rim med början och ett kännetecken för serien. Vill du ha kritirisen kvar efter stängningen går det också.
3. **Grodan i 3D:** riggen ritas på grodans kort varje bildruta, som Kanel i lekrummet. Då kan hon vinka, hålla glassen, blunda och huka. Alternativet är det platta `gurra.png` med bara hopp och andning, men då går rad 07, 10, 11, 12b, 21b och 24 inte att spela.
4. **Glassen:** Sannas glass från 27/11 (`bilder/glass.png`) används, och kritan ritar den. Konturen och rekvisitafilen är gjorda i grind 2 (`rekvisita/glass-rosa.md`). Rosa kula, inga ansikten.
5. **Solen ritas på himlen** i stället för att glida upp bakom kullen som i provet. Glidningen kan vara kvar efter fyllningen (solen stiger lite när den är klar) om du gillar den.
6. **Två näckrosblad** över dammen, lika stora, ett hopp mellan dem (tagning 1 har bara ett plask). Blommorna gömmer sig bakom busken i stället för bladet bakom vassen.
7. **Seriens nästa uppslag:** höst, vinter och vår med samma bok och grodan, eller en ny figur per årstid? Det avgör om grodans siluett ska vara bokens fasta omslag (sessionen *Kritans bok: återanvändbart omslag* bygger omslaget så att det kan bytas).
8. **Grodan badar på riktigt (Sanna 27/11 "kan grodan bada?"):** utkast A nedan, ✅ godkänt och byggt i runda 7 (tagning 4 gjord).
9. **Grodan bygger sandslottet (Sanna 27/11 "maybe add scene where frog build sand castle"):** utkast B nedan, ✅ godkänt och byggt i runda 7 (tagning 4 gjord).

### Utkast A: grodan badar (ersätter rad 15–16)

På *"plask"* landar grodan i dammen, inte på bladet: hon sjunker ner till bröstet bakom en lugn vattenlinje (koden finns kvar från bad 1, `SJUNK`), vattenringar runt henne. Hon simmar lugnt fram och tillbaka med armarna, plaskar, och hoppar sedan upp på bladet som i dag. Ljud: `plask`, `simma`, `droppar`, `vagor` (finns).

| # | Bild | Malin säger | Grodan |
|---|---|---|---|
| 15 | Halvbild: grodan hoppar, landar i vattnet på *"plask"* | Hopp … plask! *(finns, 25)* | `plask` |
| 15b | Närbild, bara huvudet och armarna över vattnet, hon blundar glatt | Ah, vad skönt! *(finns, 26)* | glatt kvak |
| 15c | Halvbild, grodan simmar ett varv, vattenringar | Grodan badar! | `simma` |
| 15d ✱ | Närbild, grodan plaskar med händerna. **Pausen:** fniss-kvak | Är vattnet svalt, grodan? *(paus: fniss-kvak)* Plask, plask, plask! | fniss-kvak, `plask` lågt |
| 16 | Hon hoppar upp på bladet, droppar glittrar | Nu är du sval och glad! *(finns, 27)* | förtjust kvak |

Nya repliker (ElevenLabs v3, Natural):

```
[happy] Grodan badar!
[curious] Är vattnet svalt, grodan?
[playfully] Plask, plask, plask!
```

### Utkast B: grodan bygger sandslottet (ersätter rad 22)

Grodan hoppar från blommorna till sandhörnet. Sandhögen och hinken står uppe från början, men slottet är inte byggt. Hon fyller hinken med spaden, vänder den, och ett torn fälls upp som pop-up. En gång till: ett torn till, och sedan reser sig hela slottet. Barnet räknar tornen. Bilderna: tornen behöver delas ur `bilder/sand.png` (eller en ny Flow-bild med ett ensamt torn, som Sanna gör). Ljud: `sand`, `hink-dunk`, `pop`, `klapp` (finns).

| # | Bild | Malin säger | Grodan |
|---|---|---|---|
| 22 | Halvbild: grodan hoppar till sandhörnet, tittar på hinken | Och sand! *(finns, 35)* Titta, en hink och en spade. | `hopp-mjuk`, nyfiket kvak |
| 22b ✱ | Samma, grodan tittar på oss. **Pausen:** glatt kvak, nick | Ska du bygga ett sandslott, grodan? *(paus: glatt kvak)* Ja, vad kul! | förtjust kvak |
| 22c | Grodan fyller hinken med spaden, två skopor | Grodan fyller hinken med sand. | `sand`, `sand` |
| 22d | Hon vänder hinken, lyfter: ett torn fälls upp på *"lyft"* | Vänd på hinken … och lyft! | `hink-dunk`, `pop` |
| 22e | Närbild på tornet, grodan glad | Ett torn! | glatt kvak |
| 22f | Samma rörelse en gång till, torn två fälls upp | En gång till … och lyft! | `hink-dunk`, `pop` |
| 22g | Halvbild: hela slottet reser sig, grodan klappar. Tornen glimtar på *"ett, två"* | Ett, två torn! Titta, ett sandslott! *(sista delen finns, 36)* | `pop`, `klapp`, fniss-kvak |

Nya repliker (ElevenLabs v3, Natural):

```
[curious] Titta, en hink och en spade.
[curious] Ska du bygga ett sandslott, grodan?
[happy] Ja, vad kul!
[warmly] Grodan fyller hinken med sand.
[playfully] Vänd på hinken … och lyft!
[happy] Ett torn!
[playfully] En gång till … och lyft!
[happy] Ett, två torn!
```

Båda tillsammans gör filmen ca 35 s längre (2:48 → ca 3:25). Ingen ny musik.
