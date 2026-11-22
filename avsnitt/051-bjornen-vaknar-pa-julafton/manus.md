# Avsnitt 051 – Björnen vaknar på julafton (plan)

**Status:** grind 1 (manus) **godkänd av Sanna 2026-11-22, replikerna omskrivna av Sanna samma dag** (väckarklocka i stället för tomteluva, kläderna på väggen, luvan bakom krukan, nallen i paketet). Nästa: grind 2 (sovbilden utan ögon, se Öppet 1). Julbilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med björnen, björnen svarar med brum, öron och ansikte. Inget är byggt än. Ca 3,5–4 min.

**Julkalenderns lucka 24, den sista** (Sanna 2026-11-22: lucka 24 = julaftons morgon, göra sig fin). Kalenderramen är intro och outro som i lucka 17, så introt *"Djuren hittar på!"* är inte med. Mapp: `produktion/youtube/shorts/jul/24-bjornen-vaknar-pa-julafton/` (skapas när luckan byggs). Lucka 23 (050) leker i snön, så den här håller sig inomhus: snön syns bara i fönstret.

**Enkel animation.** Inget nytt ritas utom morgonhimlen i fönstret. Plaggen glider själva till björnen och läggs ovanpå i kod, som strumporna och mössan i 024 och 039. Björnen drar aldrig på något med böjda armar: tassen lyfts rakt, plagget glider på plats, ett litet ryck på *"på!"*.

| | |
|---|---|
| **Titel** | Björnen vaknar på julafton (avsnitt 51) |
| **Figurer (1)** | **Björnen Bulle** (v2, riggad, ✅ referensark klart, samma som 023 och tittut i lucka 6). Sovbilden `bulle-sover.png` för början |
| **Platser (1)** | **Julsovrummet** (`assets/bakgrunder/julsovrummet/`, samma uppställning som 040: plattan, sängen, lampan). **Morgon i stället för kväll:** fönstret får en ljus morgonhimmel (ljusblått mot rosa nere vid snön) och lugnt snöfall i kod bakom `fonster-mask`, som kvällshimlen i 040. Lampan släckt. Ljusslingan över fönstret tänds på *"God jul!"*. Inget platsbyte, inget kritsvep |
| **Saker som finns** | väckarklockan (`ringklocka`, från 045), klädhängaren (`kladhangare`, från 039), gula stjärnan (`stjarna-gul`, i avskedet), sängen (`sangen`), täcket (`tacket`, julrött), kudden (`kudde`), strumporna (`strumpor`, de blå), halsduken (`halsduk`, röd-vit jul), tomteluvan (`tomteluva`), paketet (`paket` + `rosett`), nallen (`nalle`, i paketet) |
| **Nya saker** | **krukan** (luvans gömställe på golvet under klädhängaren), vid grind 2 |
| **I kod** | morgonhimlen och snön i fönstret, ljusslingans sken, bjällran på luvan (en liten guldprick i tofsen), klockans visare, glitter, skimret runt luvan |
| **Musik** | ingen ny musik: `assets/ljud/musik/jul/jul-julafton.m4a` lågt (ca 0,10 som dagbädden i 043), upp i sista leken. Ingen musik medan björnen sover, bara andningen |
| **Favoriter** | 🐻 björn · ⏰ väckarklocka · 🎁 paket · 🧸 nalle · 🎄 jul |
| **Kärna** | Det är julaftons morgon, men björnen vill sova lite till. Kritan ritar en väckarklocka, *"Ring, ring!"*, och björnen vaknar: *"Tack för hjälpen, kritan!"* Björnen gäspar. *"I dag är det julafton! Hurra!"* Tittut under täcket. Kläderna hänger på väggen. Tre gånger *"Dra, dra … på!"*: strumporna, halsduken och luvan, men luvan är borta och barnet hittar den bakom krukan. Nu är björnen fin. Kritan ritar ett paket till björnen, och i paketet ligger en nalle att krama. God jul! Hej då! Sist kalenderns avsked: tack för att du tittade, en riktigt god jul. |
| **Barnet övar på** | gissa vad kritan ritar · gäspa och sträcka på sig · tittut · hitta luvan · säga god jul |
| **Leken** | **tittut med täcket** (uppslag 13–14) |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Sover | `bulle-sover.png` ligger på madrassen med huvudet på kudden, täcket över ryggen. Lugn andning (skala 1 → 1,012, 3,6 s per andetag, som 040). Ögonen stängda. Ligger, står aldrig och sover |
| Vill inte vakna | täcket glider 30 px upp över öronen (0,6 s), ett trumpet brum under täcket. Bara öronen sticker upp |
| Väckarklockan ringer | står på golvet vid sängens huvudände, skakar ±4° i 1,5 s utan att flytta sig (som i 045), `ringklocka`. Tystnar på rad 10 |
| Vaknar | på *"Nu vaknar björnen!"*: ena ögat öppnas (ögonen i kod på sovbilden, som `sovOgon` i 040), sedan det andra. Täcket glider av. Sovbilden tonar över (0,4 s) till riggen som sitter/står bakom sängen, som zebran i 026 |
| Gäspar | huvudet bakåt 4°, munnen stor och rund i kod (0,8 s), ögonen kisar, `gaspning` |
| Sträcker på sig | båda raka armarna glider upp längs roten till ca 40° (0,6 s), stannar 1 s, tillbaka. Kroppen sträcks 2 % på höjden. Inga böjda armar |
| Tittut med täcket | björnen sitter i sängen; täcket glider upp över huvudet (0,5 s), bara öronspetsarna syns. På *"Tittut!"* glider det ner igen och björnen tittar fram |
| Kläderna på väggen | klädhängaren hänger på väggen bredvid sängen med strumporna och halsduken på var sin knopp; den tredje knoppen är tom. Luvans tofs och bjällra sticker upp bakom krukan på golvet under, från rad 16 |
| Luvan landar | luvan seglar i en mjuk båge (1,0 s) från krukan och sätter sig på huvudets överdel, lite snett, följer huvudet. `bjallror` när den landar. Vänds aldrig, bara flytta och vrid |
| Plaggen | varje plagg lyfter från sin knopp och glider till sin plats (0,7 s), `prassel-tyg`. På *"på!"* ett litet ryck (plagget 6 px upp och ner) och glitter. Strumporna på fötterna (två blå, en i taget), halsduken lågt på halsen så att munnen syns |
| Dra, dra | björnen lutar sig mot plagget (6°), en rak tass lyfts mot det två gånger i takt med *"dra, dra"* |
| Luvan hittad | tofsen skimrar svagt efter 3 s av frågepausen, tydligt på *"Ja, där!"*. Luvan lyfter från bakom krukan och seglar upp på huvudet |
| Kritan ritar paketet | på golvet framför björnen: konturen i ett drag (4 s), gisspaus 3 s, paketet fylls i, rosetten sist ovanpå |
| Paketet till björnen | paketet glider fram till björnens fötter (0,8 s) |
| Paketet öppnas | rosetten lyfter av och glider åt sidan, locket glider upp (0,6 s), nallen stiger upp ur paketet (0,8 s), `glitter` |
| Kramar nallen | nallen glider in framför björnens mage, de raka armarna glider in framför den längs roten, ögonen blundar glatt, huvudet lutar 4° mot nallen. Inga böjda armar. Nallen följer med björnen resten av avsnittet |
| Ljusslingan tänds | på *"God jul!"* tänds lamporna en i taget från vänster (0,1 s var), mjukt sken, `tindra` |
| Glatt skutt | 20 px upp, tryck ihop före och efter. Inget studs |
| Vickar | lugnt vick till musiken, ett litet skutt per fras. Ingen snurr |
| Vinkar | armen bakom kroppen, snett ut förbi kanten, 3–4 lugna vink, den andra armen i vila |
| Tittar efter | `rikt ±0,3` och ögonen åt sidan, huvudet vänds inte |

## INTRO

Julkalenderns ram (lucka 24) som i lucka 17.

## KRITAN RITAR (~14 s) – björnen

Kritan ritar björnen som sover (konturen av `bulle-sover`: den runda kroppen, de två runda öronen och nosen som egna drag, tassarna fram). Konturen i ett lugnt drag (ca 7 s), väntar medan barnet gissar, den sovande björnen fylls i inifrån. Zoom in i teckningen, in i julsovrummet.

## JULSOVRUMMET (morgon)

| # | Bild (en rörelse) | Malin säger | Björnen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar konturen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* En björn! Som sover. | krita-ritar |
| 1 | Helbild, morgon. Snön faller utanför fönstret, björnen sover i sängen och andas lugnt | God morgon! Titta, det snöar. | andning, `brum-gullig-4` (mysig suck) |
| 2 | Närbild på björnens ansikte, ett öra vickar | I dag är det julafton! | tyst, örat vickar |
| 3 | Halvbild på sängen | Vakna, björnen! Vakna! | trumpet `brum-gullig-6` |
| 4 | Täcket glider upp, bara öronen syns | Oj då. Björnen vill visst sova lite till. | `prassel-tyg`, litet trumpet brum |
| 5 | Halvbild, sängen är stilla | Hm … vad gör vi nu? | – |
| 6 | Kritan kommer in och ritar på golvet vid sängens huvudände: konturen i ett drag (4 s), gisspaus 3 s, väckarklockan fylls i, visarna sist | Titta! Kritan ritar något. *(gisspaus 3 s)* En väckarklocka! | krita-ritar, `glitter` |
| 7 | Närbild, klockan ringer och skakar ±4° (1,5 s, som i 045) | Ring, ring! | `ringklocka` |
| 8 | Björnen öppnar ena ögat, sedan det andra. Täcket glider av, björnen sitter upp bakom sängen | Nu vaknar björnen! | `brum-gullig-2` (förtjust) |
| 9 | Halvbild, björnen vinkar | Hej, björnen! Hej, hej! God morgon! | `brum-gullig-1` (hej) |
| 10 | Björnen tittar på klockan och kritan, nickar | Tack för hjälpen, kritan! | glatt brum, klockan tystnar |
| 11 | Halvbild. Björnen gäspar stort, sedan sträcker den på sig | Oj, vilken gäspning! Kan du också gäspa? *(paus 4 s)* | `gaspning`, armarna upp |
| 12 | Björnen tittar mot fönstret, öronen reser sig, glatt skutt på *"Hurra!"* | Vet du, björnen? I dag är det julafton! Hurra! | `brum-gullig-2b` |
| 13 | Täcket glider upp över huvudet, bara öronen syns | Oj! Var är björnen? *(paus 3 s)* | `brum-fniss` under täcket |
| 14 | Täcket glider ner, björnen tittar fram | Tittut! Där är du! | `brum-gullig-3b` |
| 15 | Helbild. Björnen står bredvid sängen | Nu ska björnen bli fin för julafton. | `brum-gullig-2` |
| 16 | Klipp till klädhängaren på väggen: strumporna och halsduken på var sin knopp, den tredje knoppen tom. Bakom krukan på golvet under sticker luvans tofs upp, ingen säger något om den | Kläderna hänger på väggen. Vad bra! | – |
| 17 | Närbild på strumporna | Först strumporna. | – |
| 18 | Strumporna glider från knoppen på, en i taget | Dra, dra … på! Dra, dra … på! | `prassel-tyg` ×2, `glitter`, `brum-glad` |
| 19 | Björnen vickar på fötterna, tittar ner | Blå strumpor! | `brum-gullig-3` |
| 20 | Närbild på halsduken | Och halsduken. | – |
| 21 | Halsduken glider på, lågt på halsen | Dra, dra … på! | `prassel-tyg`, `glitter`, `brum-glad` |
| 22 | Björnen tittar ner på halsduken, glatt skutt | Så mjuk och varm! | `brum-gullig-4` (mysig suck) |
| 23 | Klipp till den tomma knoppen, sedan björnen som känner på huvudet med tassen | Och nu luvan … Oj! Var är luvan? | frågande `brum-gullig-5` |
| 24 | Björnen tittar åt vänster, sedan åt höger | Björnen vet inte var luvan är. | frågande `brum-gullig-7` |
| 25 | Helbild, sedan klipp till närbild på krukan där tofsen tittar fram. Efter 3 s skimrar den svagt | Kan du hjälpa björnen? Kan du se var luvan är? *(paus 5 s)* | tyst, bjällran plingar svagt en gång |
| 26 | Närbild, tofsen skimrar tydligt | Ja, där! Bakom krukan! | `tindra`, `brum-gullig-2` |
| 27 | Luvan seglar upp på huvudet | Dra, dra … på! | `bjallror`, `glitter` |
| 28 | Helbild. Björnen står fin med strumpor, halsduk och luva, glatt skutt | Nu är du fin, björnen! Strumpor, halsduk och luva. | `brum-glad`, `bjallror` |
| 29 | Kritan kommer in och ritar på golvet framför björnen: konturen (4 s), gisspaus 3 s, paketet fylls i, rosetten sist | Titta! Kritan ritar igen. *(gisspaus 3 s)* Ett paket! | krita-ritar, `glitter` |
| 30 | Björnen tittar på paketet, sedan mot kameran | Vem är det till? | frågande `brum-gullig-5` |
| 31 | Paketet glider fram till björnen | Till dig! | `brum-gullig-2` (förtjust), `glitter` |
| 32 | Rosetten lyfter av, locket glider upp och nallen kommer upp ur paketet | Björnen öppnar … *(paus 1 s)* En nalle! | `prassel`, `glitter`, `brum-gullig-2b` |
| 33 | Nallen glider in framför björnens mage, armarna sluter sig raka runt den, ögonen blundar glatt | Åh! Krama nallen. | `brum-gullig-4` (mysig suck) |
| 34 | Ljusslingan i fönstret tänds, en lampa i taget | God jul! | `tindra`, `brum-gullig-2` |
| 35 | Musiken kommer upp. Björnen vickar vid fönstret med nallen, snön faller | *(efter några takter)* Vad mysigt på julafton! | `jul-julafton` upp, `bjallror` |
| 36 | Halvbild, björnen vinkar (armen bakom kroppen, nallen i den andra) | Hej då, björnen! God jul! | `brum-gullig-8` (hej då) |
| 37 | Samma, björnen vinkar klart | Hej då! Vi ses snart! | `brum-gullig-8b` |

### KALENDERNS AVSKED (~15 s, efter berättelsen, före kalenderramens outro)

Avskedet för hela julkalendern (Sanna 2026-11-22). Musiken ligger kvar lågt.

| # | Bild (en rörelse) | Malin säger | Björnen svarar, ljud |
|---|---|---|---|
| 39 | Helbild. Björnen står vid fönstret med luvan på och nallen i famnen och vinkar lugnt. Kritan kommer in och ritar en liten gul stjärna (`stjarna-gul`) i luften ovanför björnen: konturen (2 s), fylls i, `tindra` | Tack för att du tittade på julkalendern! | krita-ritar, `tindra` |
| 40 | Stjärnan glimmar, ljusslingan lyser, snön faller. Björnen gör ett litet glatt skutt | Med Lilla Kritan och alla djuren. | `brum-gullig-2` |
| 41 | Samma, björnen vinkar, stjärnan glimmar | En riktigt god jul! | `bjallror` |
| 42 | Kritirisen runt björnen och stjärnan | – | musiken tonar ut |

**Kamera:** bara hårda klipp mellan stillastående utsnitt. Helbild på sängen och fönstret, halvbild på björnen bakom sängen, närbild på ansiktet, på klädhängaren (16), på plaggen när de nämns (17, 20), på krukan med tofsen och på paketet med nallen.

**Shorts:** (1) uppslag 15–28, påklädningen och luvan bakom krukan, ca 55 s. (2) uppslag 1–10, björnen som inte vill vakna och väckarklockan. (3) uppslag 29–34, paketet, nallen, God jul.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/bjornen-vaknar-pa-julafton/` (`01-kritan-ritar` …) med `rost.txt`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[softly] En björn! Som sover.
[warmly] God morgon! Titta, det snöar.
[excited] I dag är det julafton!
[cheerfully] Vakna, björnen! Vakna!
[chuckles] Oj då. Björnen vill visst sova lite till.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[delighted] En väckarklocka!
[playfully] Ring, ring!
[laughs] Nu vaknar björnen!
[happy] Hej, björnen! Hej, hej! God morgon!
[warmly] Tack för hjälpen, kritan!
[laughs] Oj, vilken gäspning! Kan du också gäspa?
[excited] Vet du, björnen? I dag är det julafton! Hurra!
[surprised] Oj! Var är björnen?
[playfully] Tittut! Där är du!
[cheerfully] Nu ska björnen bli fin för julafton.
[cheerfully] Kläderna hänger på väggen. Vad bra!
[cheerfully] Först strumporna.
[happy] Dra, dra … på! Dra, dra … på!
[delighted] Blå strumpor!
[cheerfully] Och halsduken.
[happy] Dra, dra … på!
[happy sigh] Så mjuk och varm!
[surprised] Och nu luvan … Oj! Var är luvan?
[curious] Björnen vet inte var luvan är.
[warmly] Kan du hjälpa björnen? Kan du se var luvan är?
[excited] Ja, där! Bakom krukan!
[happy] Dra, dra … på!
[delighted] Nu är du fin, björnen! Strumpor, halsduk och luva.
[excited] Titta! Kritan ritar igen.
[delighted] Ett paket!
[curious] Vem är det till?
[warmly] Till dig!
[excited] Björnen öppnar … En nalle!
[warmly] Åh! Krama nallen.
[happy] God jul!
[happy sigh] Vad mysigt på julafton!
[happy] Hej då, björnen! God jul!
[warmly] Hej då! Vi ses snart! [giggles]
[warmly] Tack för att du tittade på julkalendern!
[warmly] Med Lilla Kritan och alla djuren.
[warmly] En riktigt god jul!
```

## Björnens röst och ljud

Allt finns i `assets/ljud/effekter/`: `brum-gullig` (alla 8 känslor från 023, två tagningar var), `brum-glad`, `brum-fniss`, `gaspning`, `ringklocka`, `prassel`, `bjallror`, `prassel-tyg`, `glitter`, `tindra`, `nos`, `krita-ritar`. Inga nya ljud behövs. Andningen när björnen sover: `brum-gullig-4` mycket lågt, eller bara bilden. Fniss och skratt högst 3–4 gånger (rad 8, 11, 13 och sista hej då).

## Regelkoll

- [x] 1 figur, 1 plats (julsovrummet), inget kritsvep, inget platsbyte. Lucka 23 är ute i snön, den här är inne
- [x] Inga djurnamn: "björnen", "nallen"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot säger *"Hm … vad blir det nu?"*
- [ ] **Avsteg (Sannas repliker):** inget *"Varsågod"* och ingen *"Ska vi säga tack?"*-paus; tacket är Malins *"Tack för hjälpen, kritan!"*. Aldrig *"Vad säger man?"*
- [x] Samma fras tre gånger: *"Dra, dra … på!"* (strumporna, halsduken, luvan)
- [x] Frågor till barnet med paus: vad ritar kritan (3 s), kan du gäspa (4 s), var är björnen (3 s), var är luvan (5 s)
- [x] Barnet hjälper till: luvan bakom krukan. Tofsen har synts där sedan uppslag 16
- [x] Malin efter handlingen: rörelsen först, repliken 0,4–0,8 s in (plaggen glider på, sedan *"på!"*)
- [x] Sovande björnen ligger ner med stängda ögon. Väckarklockan ringer kort och glatt (1,5 s, som i 045), inget läskigt
- [x] Inga snurrar, inga böjda armar: sträckningen och kramen är raka armar längs roten. Plagg flyttas och vrids, skalas aldrig
- [x] *"I dag är det julafton!"* på rad 2 och igen efter gäspningen (rad 12, *"Vet du, björnen? … Hurra!"*), sedan *"God jul!"* (rad 34) (Sanna 2026-11-22)
- [x] Kalenderns avsked efter berättelsen, före ramens outro: tack för julkalendern, en riktigt god jul (Sanna 2026-11-22)
- [x] Ingen ny musik: `jul-julafton.m4a`
- [ ] Nya saker: krukan, grind 2
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Grind 2 – saker (2026-11-22)

Kollbild: `original/saker-koll.jpg` (de befintliga sakerna på julsovrummet med en provisorisk morgonhimmel i fönstret).

| Sak | Läge |
|---|---|
| Tomteluvan | ✅ finns, v2. Bjällran i kod (guldprick i tofsen). Kritan ritar den inte längre |
| Paketet + rosetten | ✅ finns, kontur `paket-kontur.json` och `rosett-kontur.json` |
| Gula stjärnan (avskedet) | ✅ finns, kontur `stjarna-gul-kontur.json` |
| Strumporna (blå) | ✅ finns, syns bra mot rosa vägg och ljust golv |
| Halsduken | ✅ finns |
| Sängen, kudden, lampan | ✅ finns (040:s uppställning). Lampan lyser i plattan: släcks i kod eller får lysa |
| Täcket | `tacket.png` är korallrött, inte julrött; 040 ritade julbäddningen i kod. Löses av sovbilden nedan |
| Nallen | ✅ i paketet (Sannas repliker). `nalle-framifran-v1.png`, mörk chokladbrun mot björnens mellanbrun |
| Väckarklockan | ✅ `ringklocka` från 045, kontur `ringklocka-kontur.json`, visarna i kod. Vanlig klocka, ingen tomte (Sanna 2026-11-22) |
| Klädhängaren | ✅ `kladhangare` från 039 (röd ribba, gula knoppar), plaggen på knopparna i kod |
| **Krukan** | **saknas.** Förslag: en röd julblomma i en rund kruka på golvet, stor nog att luvan får plats bakom. 4 tagningar i Flow |
| **Sovbilden** (björnen i sängen utan ögon) | ✅ **nr 3 vald**, `bulle-sover-sangen-jul.png` + kontur (se Öppet 1). Ritintrots kontur görs från den valda tagningen (`verktyg/kontur.py`), så att teckningen har samma form som bilden |

## Öppet

1. **Björnen i sängen.** 040 har en egen sovbild i sängen (`lova-sover-sangen-jul.png`). `bulle-sover.png` ligger på magen med ögonen i bilden. Förslag: en Flow-edit av `bulle-sover` utan ögon (ögonen i kod, så att de kan öppnas på rad 8), lagd på madrassen med täcket över ryggen. Görs vid grind 2 med Sanna. **Grind 2 påbörjad 2026-11-22:** Flow (Nano Banana, 4 tagningar, 16:9, referenser `bulle-sover.png`, `sangen.png`, `tacket.png`, projekt `LK-051-bjornen-sover`) föll två gånger på Flows gränssnitt (knappen *Agent* hittades inte), samma fel som ko-jobbet tidigare. Prompten finns i Flow-köns jobb `84d827f2`; kör om när Flow fungerar. **Gjord 2026-11-22 för hand i Flow i Chrome** (Flow-verktygets kö kör gammal kod; Flow är på svenska och knappen heter *Flow-agent*), med Sannas tillägg: hela sängen och täcket som täcker björnen. Fyra tagningar i `original/sovbild/bulle-sover-sangen-1…4.jpg`, sida vid sida i `original/jamforelse.jpg`. **Vald: nr 3 (Sanna 2026-11-22).** Original `assets/karaktarer/bjornen-bulle/premium/original/bulle-sover-sangen-jul.jpg`, urklipp `premium/cut-tunn/bulle-sover-sangen-jul.png` (1191 × 631, den ritade vita kanten tunnad till ca 8 px; madrassen hel), ritintrots kontur `premium/cut-tunn/bulle-sover-sangen-jul-kontur.json` (59 punkter, start vänster). Öronen, nosen och täckets kant läggs till som egna drag när ritintrot byggs (`kritan-ritar`).
2. **Vaknar och sätter sig upp:** övergången från sovbilden till riggen bakom sängen (rad 8). `sov-overgang-test.mp4` i björnens mapp gör samma sak baklänges (står → ligger); kolla om den går att vända.
3. **Morgonhimlen:** ljusblå med ett rosa sken nere vid snön, och snöfall. Kod bakom fönstermasken som 040:s kvällshimmel. Vilket fönster: det valvda (`julsovrummet-valvt-v2.jpeg` + `fonster-mask-valvt.png`, med ljusslingan) är förslaget, eftersom slingan ska tändas på *"God jul!"*.
4. ~~**Sista repliken**~~ löst 2026-11-22: berättelsen slutar med *"Hej då! Vi ses snart!"* som alla andra, och kalenderns avsked (rad 39–41) tackar för julkalendern (Sanna).
5. **Julgran i rummet?** Julsovrummet har ingen gran. Förslag: ingen, slingan i fönstret räcker (färre saker). Alternativ: `julgran-kladd` i hörnet till höger som tänds på *"God jul!"*.
6. **Strumporna** är lammets ullstrumpor (rosa och blå). Förslag: de blå, och repliken *"Blå strumpor!"*. Fungerar de på björnens fötter (`bulle-leg-*-fram.png`)? Mät vid bygget.
7. **Avsnittets färg:** julröd som tomteluvan.
8. ~~**Tomten på väckarklockan**~~ löst 2026-11-22: vanlig klocka, ingen tomte (Sanna).
9. **Krukan:** vilken kruka? Förslaget är en röd julblomma i kruka på golvet under klädhängaren.
