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
| 7 | Tre bildklossar poppar fram. Blandningen, muren, hunden | Nu leker vi! · Titta noga. Var är apan? · Där är den! · Titta! En till. · Apa! · Apelsin! · Ananas! · Hund. · Vilken ska bort? · Vilken börjar inte på A? *(paus 4 s)* · Hunden! · Hund börjar inte på A. · Hej då, hunden! | som i E |
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

## Öppet

- **Malins tagning:** en tagning med alla 61 rader ur `malin-a-recept-3.txt`, delad med `verktyg/dela-tagning.py` till `assets/ljud/roster/alfabet/abc-a-recept-3/`. Gjort 2026-11-21: tagning 1 av 2 valdes (tagning 2 sa "Deal" på "Bil?").
- **Förlagan E (rör inte härifrån):** E:s `ELSA`-mått (nederkant 328,84) lägger elefantens kontur ca 15 enheter för lågt. Riggen ritas med fötterna (`FOTTER` 930) i y 252, så det borde vara 675,84 + 252 − 0,66 · 930 = 314,04. A räknar så (`ALFONS`). Samma rättelse behövs i E och i B om B kopierade E:s tal.
- Apan äter genom att maten glider in i munnen och krymper bort (riggen håller aldrig något). Apelsinen och ananasen växer sedan fram på sina klossar på *"Nu leker vi!"*.

- *"Atjo!"* säger Malin. Alternativet är ett nysljud från Openverse och att Malin bara säger *"Prosit, apan!"*.
- Apan håller inte i maten (receptet: aldrig hålla i något). Apelsinen och ananasen läggs framför tassarna, som ekollonet i E.
