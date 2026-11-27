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
| Glassen i handen | kortet fälls ner, glassen glider i en båge till handens spets. Tassen ritas framför struten, armen får en mörkare kritkant (receptets "hålla en sak") |
| Smakar | glassen lyfts till munnen, en liten bit av kulan är borta **på ordet "Mums"**, `slick` |
| Droppen på näsan | en rosa droppe faller från kulan och landar på grodans näsa (ritad i kod). Grodan tittar i kors upp mot den, skakar lugnt på huvudet (±4°), droppen faller ner i dammen, `plupp` |
| Glassen är slut | grodan håller en tom strut, den glider ner på gräset och kortet fälls ner |
| Hopp … plask | grodan hukar, ett lugnt hopp i en båge (30 px, ingen studs) till nästa blad. **På ordet "plask"** landar hon, och vattnet stänker upp runt bladet (droppar i kod), `plask`. Droppar faller på grodan, som blundar glatt |
| Blommorna bakom busken | från rad 17 sticker blommornas toppar fram bakom buskens kort, bara lite |
| Blommorna hittas | topparna skimrar svagt efter 3 s, tydligt på *"Ja, där är blommorna!"*, och blommornas kort fälls upp framför busken |
| Blommorna och sandslottet | blommorna fälls upp på *"Ja, där är blommorna!"* och sandslottet **på ordet** "sandslott", med ett `pop` var. Grodan vänder sig mot dem (riktningsposen, figuren speglas aldrig) |
| Luktar | grodan lutar sig mot blommorna, blundar, en lugn suck |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, hela armen syns |
| Boken stängs | korten fälls ner i omvänd ordning (grodan sist), pärmen slås igen, siluetten syns. Ersätter kritirisen (Öppet 2) |

**Inget går genom något:** korten fälls ner åt samma håll och i den ordningen att det som reser sig först ligger överst (provets regel). Pärmen slås igen först när alla kort ligger platt. Grodan landar **på** bladet, aldrig i vattnet eller genom sidan. Glassen ligger i handens spets, framför tassen. Blommorna sticker fram **bakom** buskens kort och fälls upp framför det. Täta bilder (6 per sekund) i QA runt raderna 01b, 9, 11, 12, 15, 19, 20, 22 och 26.

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
| 17 | Halvbild, grodan tittar runt. Bakom busken bredvid dammen sticker blommornas toppar fram, bara lite | Vad mer finns på sommaren? Blommor! | frågande kvak |
| 17b | Samma, grodan tittar framåt, sedan åt vänster och höger | Var är blommorna? | frågande kvak |
| 18 | Bred bild över dammen. Efter ca 2 s klipp till närbild på busken: blommornas toppar sticker fram. De skimrar svagt efter 3 s | Kan du hjälpa grodan att hitta blommor? *(paus 5 s)* | tyst, `glimt-2` svagt när skimret börjar |
| 19 | Topparna skimrar tydligt, och blommornas kort fälls upp framför busken. Klipp till grodan, glad | Ja, där är blommorna! | `glimt`, `pop`, förtjust kvak |
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
[happy] Blommor!
[curious] Var är blommorna?
[warmly] Kan du hjälpa grodan att hitta blommor?
[happy] Ja, där är blommorna!
[happy] Vad fina!
[happy sigh] Mmm … vad gott de luktar.
[happy] Och sand!
[happy] Titta, ett sandslott!
[warmly] Var det en fin sommardag, grodan?
[happy] Hej då, grodan! Hej då, solen!
[warmly] Hej då! Vi ses snart! [giggles]
```

**Tagning 1 (Sanna 2026-11-27), längder efter normalisering (blir `ROST` i `rader.mjs`):** 01 1,69 · 02 2,25 · 03 2,79 · 04 1,46 · 05 1,69 · 06 1,49 · 07 1,62 · 08 1,01 · 09 2,01 · 10 2,32 · 11 2,34 · 12 1,21 · 13 1,50 · 14 2,09 · 15 2,23 · 16 1,00 · 17 2,73 · 18 1,53 · 19 2,66 · 20 1,98 · 21 1,44 · 22 2,83 · 23 1,42 · 24 1,31 · 25 1,27 · 26 1,49 · 27 1,59 · 28 1,41 · 29 0,83 · 30 0,83 · 31 1,86 · 32 1,29 · 33 0,93 · 34 2,05 · 35 0,82 · 36 1,70 · 37 1,83 · 38 2,14 · 39 2,51 s

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
