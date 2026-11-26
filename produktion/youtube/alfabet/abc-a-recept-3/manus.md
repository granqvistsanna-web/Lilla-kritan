# Kritans ABC A – recept 3: Apan är hungrig

Görs 2026-11-21 efter `format/abc-recept-3-kompisen-vill.md`, kopierad ur förlagan `../abc-e-recept-3/`. Den gamla A-filmen (recept 1) ligger orörd i `../abc-a/` tills den här är godkänd.

**Läge (2026-11-21):** Sanna har godkänt replikerna (61 rader i `malin-a-recept-3.txt`). Scenen `index.html` är byggd med delarna 3–6 för A. Rösten är **Malins tagning 1** (ElevenLabs v4, 2026-11-21, `produktion/ljud-original/roster/abc-a-recept-3/tagning-1.mp3`), delad till `assets/ljud/roster/alfabet/abc-a-recept-3/`. Sex rader varierades lite så att A inte låter som E (rad 18, 26, 46, 55, 60, 61). Förhandsvisningen `abc-a-recept-3.mp4` är `--snabb` (960 × 540); platshållarversionen ligger i `aldre/`, uppladdad på feedbacksidan som `ABC-a3` (status granska). Stillbilder i `stills/`.

- Konturerna är spårade med `kontur-bild.py`: `alfons-faceless-kontur.json` (apan), `alfons-ansikte-kontur.json` (det ljusa ansiktet, ur färgen), `bil-rod/cut/bil-rod-kontur.json` (hjulen ritas som två cirklar efteråt), `ananas/cut/ananas-kontur.json`. Apelsinens fanns redan.
- Ögon: apans ritas där riggens `OGON` sitter (418, 401 och 601, 400). Apelsinen och ananasen har ögon, kinder och mun i kod som i recept 1.
- Vita kanter, mätta i bild (målet är 3 px + 1 % av höjden): apelsinen ca 8 px (mål 8), ananasen ca 5 px (mål 9, hellre tunn än tjock), bilen ca 4 px. Ingen behövde göras om.

**Meningen:** Apan (`apan-alfons`) är hungrig. Malin ber kritan rita något gott, och det måste börja på A. Kritan ritar fel (bilen, hej då!). Kritan ritar apelsinen, som rullar till apan: mums. Apan vill ha mer, och kritan ritar en ananas. Bladen kittlar: atjo!

**Handling:** *Hungrig* (receptets tabell): magen kurrar, saken glider fram, *"Mums!"*.

## Uppslagen (plan)

Rörelsen först, Malin efteråt. Delarna 1, 2, 7 och 8 är som i E.

| Del | Bild (en rörelse) | Malin | Ljud |
|---|---|---|---|
| 1 | Klossen snurrar in, kritan ritar A:et (röd) | Hej hej! · Kritan ritar. · Det är ju A! · Bokstaven A. | swoosh, pop, krita, pling |
| 2 | Kritan ritar apans kontur mitt i bild | Kritan ritar något på bokstaven A. · Hmm … · Vem är det? *(paus 4 s)* | krita |
| 2 | Bilden fylls i, apan hoppar | Apa! · A, a, apa! · Ja! Apa börjar på bokstaven A. | pop, pling, jippi |
| 2 | Apan skuttar åt vänster och vinkar | Hej, apan! | dunk, dunk |
| 3 | Närbild: magen kurrar, apan tittar ner på magen (förvånad, sedan ledsen) | Oj. Vad var det som lät? · Apan är hungrig. | kurr |
| 3 | Hela bilden | Kritan! Kan du rita något gott? | – |
| 3 | Apan lutar sig fram och "viskar", sedan hoppar den till: ja! | Vad sa du, apan? · Måste det börja på bokstaven A? | – |
| 3 | – | Kan du det, kritan? · Nu ritar kritan. | – |
| 4 | Kritan ritar bilens kontur till höger | Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 4 | Bilden fylls i: den röda bilen. Den gungar till | Bil? · En bil! | pop, tut |
| 4 | Närbild: apan blir förvånad, sedan skrattar den | Ha ha! Busiga kritan! · En bil kan man inte äta! · Bil börjar inte på A. | – |
| 4 | Bilen rullar ut åt höger, apan vinkar | Hej då, bilen! | brum |
| 5 | Kritan ritar apelsinens kontur till höger, apan tittar nyfiket | En gång till! · Något gott på bokstaven A, tack! · Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 5 | Bilden fylls i: apelsinen. Apan jublar | Apelsin! · A, a, apelsin! · Apelsin börjar också på A! | pop, pling, jippi |
| 5 | Apelsinen rullar fram till apans fötter och krymper, apan hoppar till | Apelsinen rullar! · Varsågod, apan! | rull, plopp |
| 5 | Apan gungar glatt, apelsinen hoppar med | Mums! | mums |
| 6 | Apan tittar mot kritan, lutar sig fram (nyfiken) | Oj. Apan vill ha mer. · Kritan, rita något mer! | – |
| 6 | Kritan ritar ananasens kontur till höger | Hmm … · Vad blir det? *(paus 4 s)* | krita |
| 6 | Bilden fylls i: ananasen. Apan jublar | Ananas! · En ananas! · Ananas börjar också på A! | pop, pling, jippi |
| 6 | Ananasen glider fram till apan, bladen vickar mot apans nos | Oj! Bladen kittlar. | prassel |
| 6 | Närbild: apan nyser och hoppar bakåt, sedan skrattar den | Atjo! · Prosit, apan! | atjo-ljud? (se Öppet) |
| 6 | Ananasen krymper bredvid apelsinen, apan gungar | Mums! · Nu är apan mätt och glad. | mums |
| 7 | Tre bildklossar poppar fram. Blandningen, muren, bilen igen | Nu leker vi! · Titta noga. Var är apan? · Där är den! · Titta! En till. · Apa! · Apelsin! · Ananas! · Bil? · Vilken ska bort? · Vilken börjar inte på A? *(paus 4 s)* · Hunden! · Hund börjar inte på A. · Hej då, hunden! | som i E |
| 8 | Klossarna på rad, discot, pyramiden, hej då | Apa, apelsin, ananas. · Alla börjar på bokstaven A. · Nu dansar vi! · Apan dansar! · Apelsinen snurrar! · Ananasen snurrar! · Det var allt för i dag. · Vad kul det var att leka! · Hej då! | disco |

## Repliker som skiljer sig från E

- *"Vem är det?"* bara för apan. Bilen, apelsinen och ananasen är saker: *"Vad blir det?"*.
- Viljan är mat, inte en kompis: *"Kritan! Kan du rita något gott?"* i stället för *"… en kompis?"*, och *"Något gott på bokstaven A, tack!"*. Viskningen blir *"Måste det börja på bokstaven A?"*.
- Ny rad: *"En bil kan man inte äta!"* (skämtet i det felritade).
- Ord 2 leker inte med apan (det är en frukt). E:s tre lekrader (*"Ekorren hoppar!"* …) blir *"Apelsinen rullar!"*, *"Varsågod, apan!"* och *"Mums!"*.
- Ord 3: *"Oj! Bladen kittlar."*, *"Atjo!"*, *"Prosit, apan!"*.

## Regelkoll

- Inga djurnamn (apan, hunden), inga utdragna ord, ingen *"Lyssna!"*, inget *"Säg du"*, aldrig *"Vad kan det vara?"*.
- *"Hej hej!"* i introt, en v3-tagg per rad, 61 rader.

## B:s ändringar 2026-11-21 (Sannas feedback på B, flyttad hit)

- Klossen i introt är större (400 → 560) och står mitt i bild (y 420 → 500).
- apans skiss får näsborrarna, munnen och fyllda ögon (mätta i `uttryck.html`).
- Kritan kommer in i bild när Malin ber den rita (båda gångerna), nickar efter *"Kan du det, kritan?"* och går därifrån direkt till att rita (`KVISA`, `KNICK`, `KFRAM`).

## Feedback 2026-11-22 (ABC-a3, renderingarna 21/11 18:54 och 20:34)

- 0:50: apan "viskar" (babbel) innan Malin säger *"Vad sa du, apan?"*.
- 1:18: kritan kommer fram på *"Busiga kritan!"* och fnissar (tre fniss, kritan skakar, `KFNISS`).
- 1:30: bädden är `abc-bad-lang.m4a` (den längre slingan från 22/11) i stället för `gissa-bad.m4a`.
- 1:47, 1:50: apelsinen och ananasen har inga ansikten, apan äter upp dem.
- 2:36: klossarna vänder ryggen till innan de blandas och vänder sig tillbaka efteråt, apan sist (`vand`).
- 2:38: apelsinen stod upp och ner på klossen (rullningens vinkel räknades efter rullningen). Rättat.

## C:s riktning 2026-11-23 (Sanna: "Bring C's direction into A, B, D and E")

- Introt: *"Titta, kritan ritar en bokstav."* (C:s klipp) och kritan börjar rita på *"Titta"*. Efter *"Bokstaven A."*: Malin *"Hej, A!"*, märket *"Hej! A! A!"*, Malin *"Hur låter A?"*, märket *"a, a, A!"*.
- Efter varje ord frågar Malin först och märket svarar med ordet: *"Hur låter A i apa?"* → *"a, a, apa!"*, *"Och i apelsin?"* → *"a, a, apelsin!"*, efter ananasen bara märket: *"a, a, ananas!"*.
- Gömleken: *"Titta noga."*, klossarna vänder ryggen till, tre lugna byten, *"Var är apan?"* och 3,2 s paus med ledtrådar (apan låter inifrån klossen, klossen vickar två gånger, kameran glider mot den). Apans kloss vänder sig först: *"Där är den!"*. Apans kloss vrids nu som de andra (−0,06, var 0,10), så att en sida syns.
- Skissen: också öronens ljusa insida, den rullade svansen och fötternas sulor (mätta på `alfons-faceless.png`).
- Armarna: vinkningen 90° ± 6° i 1,3 gånger/s (var 124° ± 12°), `hurra` 84° i den här scenen (riggen har 100°).
- Rösterna: `produktion/ljud-original/roster/abc-recept-3-adbe/` (Malin `malin-1.mp3`, bokstaven `louise-1.mp3`, *"a, a, apa!"* ur `louise-2.mp3`). `n-titta-noga` är delad i `n-titta-noga-1` och `n-var-ar-apan`.

## E:s riktning 2026-11-25 (Sanna: "A:s och D:s repliker är ok, spela in dem i ElevenLabs")

Efter receptets *E:s riktning* (`format/abc-recept-3-kompisen-vill.md`), på samma sätt som B. Scenen före ändringen ligger i git, filmen i `aldre/abc-a-recept-3-fore-e-riktning.mp4`.

- **Introt är ett samtal:** *"Titta, kritan ritar en bokstav."* → *"Bokstaven A."* → A puffar upp (`a-glad`) → *"Hej, A!"* → `a-halsar` (A vickar) → *"Ska vi leka, A?"* → `a-ja` (två hopp) → *"Ja! Vad kul!"* → A flyger till hörnet medan Malin säger *"Vad ritar kritan nu?"*. *"Det är ju A!"*, *"Hur låter A?"*, *"Kritan ritar något på bokstaven A."*, *"Hej! A! A!"* och *"a, a, A!"* går bort.
- **A säger bara A, i fem toner**, och tycker till före Malin: `a-ja` efter apan, apelsinen och ananasen (*"Hur låter A i apa?"*, *"Och i apelsin?"* och märkets *"a, a, apa!"* … går bort), `a-undrar` + `a-nej` efter *"En bil!"*, `a-nej` efter den udda i muren, `a-ja` i slutet och `a-halsar` samtidigt som Malins *"Hej då! Vi ses snart!"*.
- **A:s ansikte är större:** `HUVUD` [0, -95, 42, 52] (var [0, -110, 28, 38]), rosa kinder, större mun. Stillbild: ansiktet ryms i A:ets topp.
- **Snabbare teckningar:** apan `tempo` 0,4 (konturen 2,6 s, hela apan med detaljerna ca 6,5 s, var ca 15), bilen 0,42, apelsinen och ananasen 0,45. Gissningspausen 4 → 3,3 s.
- **Mjukare skuggor** som E och B (ca 60 % av förra styrkan, klossarnas lite bredare).
- **Lugnare gömlek:** vändningen 0,9 s, varje byte 1,6 s med 0,7 s vila, båda klossarna snurrar ett varv medan de byter, pausen 2,8 s (`VANDSEK`, `BYTSEK`). `krock.mjs`: inga krockar.
- **Musiken** i introt och berättelsen 0,5 → 0,38.
- **Röster (inspelade 2026-11-25 av Sanna):** `produktion/ljud-original/roster/abc-a-intro-2026-11-25/`, delade med D (A:s rad och toner först i varje tagning). *"Ska vi leka, A?"* är `malin-a-och-d.mp3` 0,04–1,58. A:s toner är **Olivia** (*Bright, Youthful and Engaging*, v4; samma röst som E och B, Sanna 2026-11-25: "No, redo with Olivia"), klippta ur `olivia-1.mp3` (A:s fem toner först, sedan D:s) efter tonhöjden: `a-glad` 0,00–0,69 (hög, fallande), `a-halsar` 0,89–1,63 (hög–låg), `a-ja` 1,84–3,07 (två höga *A!*), `a-nej` 3,46–4,00 (lågt, fallande), `a-undrar` 4,47–4,86 (stiger). Louise-tagningarna i samma mapp används inte. `n-ja-vad-kul` och `n-vad-ritar-nu` är E:s klipp. Whisper hör *"Ah!"*, *"Ah, ah!"*, *"Aa."*, *"A."* (och *"Ey!"* för `a-glad`, lite e-färgat i det korta klippet) och *"Ska vi leka? Ja."*; ingen har lyssnat i blandningen.

## Öppet

- `a-glad` hörs som *"Ey!"* av whisper. Lyssna om det låter som A; annars görs den om.

- **Malins tagning:** en tagning med alla 61 rader ur `malin-a-recept-3.txt`, delad med `verktyg/dela-tagning.py` till `assets/ljud/roster/alfabet/abc-a-recept-3/`. Gjort 2026-11-21: tagning 1 av 2 valdes (tagning 2 sa "Deal" på "Bil?").
- **Förlagan E (rör inte härifrån):** E:s `ELSA`-mått (nederkant 328,84) lägger elefantens kontur ca 15 enheter för lågt. Riggen ritas med fötterna (`FOTTER` 930) i y 252, så det borde vara 675,84 + 252 − 0,66 · 930 = 314,04. A räknar så (`ALFONS`). Samma rättelse behövs i E och i B om B kopierade E:s tal.
- Apan äter genom att maten glider in i munnen och krymper bort (riggen håller aldrig något). Apelsinen och ananasen växer sedan fram på sina klossar på *"Nu leker vi!"*.

- *"Atjo!"* säger Malin. Alternativet är ett nysljud från Openverse och att Malin bara säger *"Prosit, apan!"*.
- Apan håller inte i maten (receptet: aldrig hålla i något). Apelsinen och ananasen läggs framför tassarna, som ekollonet i E.

**Kritan svarar utan ord (Sanna 2026-11-26):** när Malin frågar eller säger något till kritan svarar den med kroppen och ett kort krit-ljud (`kSvar(t, typ)`, `KSVAR`): ett litet hopp på *"Kritan! Kan du rita …?"*, två nickar på *"Kan du det, kritan?"* och på bönen i del 6, och på *"Busiga kritan!"* tittar den in en kort stund (`KVISA` med [från, till]) och vickar blygt (A fnissar i stället, `KFNISS`).
