# Avsnitt 027 – Zebran plockar undan (plan)

**Status:** plan 2026-11-11, grind 1 (manus). Bilderbok enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`. Inget är byggt än, mappen har bara det här manuset.

**Enkel animation.** Zebran står **på golvet framför sängen** bland leksakerna, och hela kroppen syns (Sanna 2026-11-11). Bollen ligger kvar under sängen. En **radio** står på sängens fotände och spelar glad musik medan zebran städar. Zebran tar aldrig i dem: han tittar på saken, och den **glider upp och ner i korgen på ordet**. *"Ett"* = första saken lyfter, *"två"* = andra saken lyfter, *"i korgen!"* = båda landar. Bollen rullar och studsar själv.

| | |
|---|---|
| **Titel** | Zebran plockar undan (avsnitt 27). Inget titelkort: introt är 1 s logotyp |
| **Figurer (1)** | **Zebran Zebbe** (v2, riggad) |
| **Platser (1)** | **Sovrummet** (ny platta från 026), på dagen. Inget platsbyte |
| **Nya saker** | **radion** (`radio`, `cut/radio.png`, bildsessionen), Sannas önskan 2026-11-11; sedan 2026-11-12 ritar kritan den (andra teckningen). **Musiken:** `assets/ljud/musik/stada-radion.m4a` (befintlig, instrumental, ca 104,9 BPM), de första 32 takterna i slinga; ingen ny musik. Sängen kommer från 026. Korgen (`korg`, `cut/korg-v3.png`), nallen (`nalle`, framifrån), röda bilen (`bil-rod`), badankan (`badanka`), badbåten (`badbat`), blå hinken (`hink-bla`) och röda bollen (`boll-rod`) finns |
| **I kod** | himlen i fönstret (dag), bollens rullning och studs, skimret, små streck när en sak landar |
| **Favoriter** | 🧸 gosedjur (nallen) · 🚗 bil |
| **Kärna** | (rond 2026-11-12) Golvet är fullt av leksaker. Kritan ritar en korg, men zebran vill inte plocka undan. Då ritar kritan musik: en radio, "Vi kan lyssna på en låt!", och zebran städar i takten. Tidigare: Golvet är fullt av leksaker och zebran vill inte plocka undan. Kritan ritar en korg: "Varsågod!" – "Tack!" Nallen hoppar i korgen själv. Två och två åker leksakerna i korgen, barnet hittar bollen under sängen, och zebran och barnet rullar bollen fram och tillbaka. Sist studsar bollen i korgen. Städat! Hej då! |
| **Barnet övar på** | hitta bollen (under) · rulla bollen · räkna ett, två · säga tack |
| **Leken** | nallen hoppar i korgen (uppslag 7–8) och **rulla bollen** fram och tillbaka med barnet (uppslag 15–17) |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Kommer in | riggens gång, lugnt, med `trav`. Stannar på golvet framför sängen, lite till vänster |
| Radion | slås på med ett klick efter zebrans nick i rad 9 och av med ett klick före hej då (rad 19). Musiken tonas ner under Malins repliker och barnets pauser; noter stiger ur radion, zebran gungar lugnt i takten och leksakerna landar i korgen på ett slag. Tiderna: `storyboard/radio-tider.mjs`, musikfilen: `storyboard/radio.mjs` |
| Skakar på huvudet | hela ägget lutar ±6° tre gånger |
| Vänder bort | riktningsposen `rikt −1`, öronen faller |
| Nallen hoppar i korgen | nallen gör ett lugnt skutt från golvet ner i korgen, och tittar sedan upp över kanten (ögonen i kod) |
| Ett, två … i korgen | en sak i taget lyfter från golvet på *"ett"* och *"två"* och glider i en mjuk båge till korgen. Båda landar på *"i korgen!"*. Sakerna lutar lite i bågen, men vänds aldrig |
| Bollen under sängen | en röd bit med gul rand syns mellan sängbenen |
| Rulla till dig | bollen rullar fram mot tittaren: den växer och åker ut nedtill i bild. Kameran står still |
| Rulla tillbaka | bollen rullar in nedifrån, blir mindre och stannar framför sängen |
| Studsar i korgen | två lugna studs på *"ett, två"*, landar i korgen på *"i korgen!"* |
| Klappar | riggens klapp, tre lugna klapp |
| Vinkar | armen bakom kroppen, snett ut förbi kanten |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan direkt till papperet. Ingen jingel, inget titelkort (Sanna 2026-11-11).

## KRITAN RITAR (~16 s) – papper

Kritan ritar zebran: konturen i lugna drag (7 s), väntar, den riktiga zebran fylls i med ränderna sist. Zoom in i teckningen.

## SOVRUMMET

| # | Bild (en rörelse) | Malin säger | Zebran svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar konturen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En zebra! | krita-ritar, skogsljud |
| 1 | Helbild, sovrummet på dagen. Zebran kommer in framför sängen och vinkar | Hej, zebran! Hej, hej! | `trav`, glatt gnägg |
| 2 | Helbild, golvet: nallen, bilen, ankan, båten och hinken ligger huller om buller. **Närbild på leksakerna på *"leksaker"*** | Oj, oj, oj! Vad mycket leksaker! | nyfiket gnägg |
| 3 | Kritan ritar en korg på golvet bredvid sängen: konturen (4 s), gisspaus 4 s, korgen fylls i långsamt (1,6 s). **Närbild på korgen på *"korg"*** | Titta! Kritan ritar något. *(gisspaus 4 s)* En korg! Varsågod, zebran. | krita-ritar, glitter |
| 4 | Zebran tittar på korgen, öronen reser sig | Ska vi säga tack? *(paus 2,5 s)* Tack! | nyfiket gnägg, sedan förtjust gnägg, nickar direkt |
| 5 | Zebran och den tomma korgen | Nu ska du väl plocka undan? | trumpet frust, skakar på huvudet |
| 6 | Zebran vänder bort huvudet och sätter näsan i vädret, öronen faller, lugnt. Korgen står tom | Oj då. Zebran vill visst inte plocka undan. *(paus 1 s)* Hm … vad gör vi nu? | trumpet frust |
| 7 | Kritan ritar **musik**: radions kontur på sängens fotände (lådan med handtaget, högtalaren, skalfönstret, två rattar och tre noter), konturen står kvar 1,6 s, radion fylls i. **Närbild på radion på *"radio"*** | Titta! Kritan ritar igen. … En radio! Vi kan lyssna på en låt! | krita-ritar, glitter, pling |
| 8 | Klick: radion spelar, noter stiger. Zebran piggnar till och gungar i takten | – | klick, `stada-radion`, förtjust gnägg |
| 9 | Nallen skuttar lugnt ner i korgen | Oj! Nallen hoppade i korgen! | `nalle-hopp`, förtjust gnägg |
| 10 | Närbild, nallen tittar upp över korgens kant | Ha ha! Nallen vill också hjälpa till. | långt fniss |
| 11 | Halvbild, zebran tittar på leksakerna och nickar i takten | Ska du plocka undan nu? | förtjust gnägg |
| 12 | **Närbild på bilen och ankan på *"bilen"***, sedan golvet och korgen: bilen lyfter på *"ett"*, ankan på *"två"*, båda landar på takten | Först bilen och ankan. Ett, två … i korgen! | `dunk`, `badanka-pip`, förtjust gnägg |
| 13 | Samma, **närbild på båten och hinken på *"båten"*** | Och båten och hinken. Ett, två … i korgen! | `dunk` |
| 14 | Halvbild. Efter frågan svarar zebran **nej**, blir förvånad (stora ögon, liten rund mun, öronen upp) och tittar sig omkring | Oj, bollen då? Hittar du inte bollen? | `gnagg-nej` |
| 15 | Vid bild medan barnet letar. Efter 3 s skimrar en röd bit med gul rand mellan sängbenen | Kan du hjälpa zebran? Kan du se var bollen är? *(paus 6 s)* | tyst (radion nedtonad) |
| 16 | Klipp till närbild under sängen: bollen skimrar tydligt och rullar fram, zebran skuttar glatt | Ja, där! Ja, under sängen! | förtjust gnägg, `tindra`, `rull` |
| 17 | Helbild, bollen rullar mot tittaren och ut ur bild | Ska vi leka lite? Rulla, rulla … till dig! | `rull`, fniss |
| 18 | Samma, tomt golv. Efter pausen rullar bollen in nedifrån och stannar framför zebran | Kan du rulla tillbaka? *(paus 4 s)* Rulla, rulla … till zebran! | `rull` |
| 19 | En gång till, ut och in igen | Till dig … och tillbaka! | `rull`, långt fniss |
| 20 | **Närbild på bollen på *"bollen"***, sedan studsar den två gånger och landar i korgen | Nu bollen. Ett, två … i korgen! | `studs` ×2, `dunk` |
| 21 | Helbild, städat golv, korgen full. Zebran klappar tre gånger och dansar lite till radion | Nu är det alldeles städat! | `tass-klapp-tre`, förtjust gnägg |
| 22 | Halvbild, zebran vinkar (armen bakom kroppen). **Närbild på korgen på *"korgen"*** | Hej då, zebran! Hej då, korgen! | hej då-gnägg |
| 23 | Samma, zebran vinkar klart | Hej då! Vi ses snart! | – |
| 24 | Kritirisen runt zebran och korgen | – | – |

**Short:** uppslag 10–18 (ett, två … i korgen, hitta bollen, rulla bollen), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Filerna hamnar i `assets/ljud/roster/zebran-plockar-undan/`.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En zebra!
[happy] Hej, zebran! Hej, hej!
[laughs] Oj, oj, oj! Vad mycket leksaker!
[cheerfully] Nu ska du väl plocka undan?
[chuckles] Oj då. Zebran vill visst inte plocka undan.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En korg! Varsågod, zebran.
[warmly] Ska vi säga tack?
[happy] Tack!
[surprised] Oj! Nallen hoppade i korgen! [giggles]
[laughs] Ha ha! Nallen vill också hjälpa till.
[cheerfully] Ska du plocka undan nu?
[happy] Först bilen och ankan. Ett, två … i korgen!
[happy] Och båten och hinken. Ett, två … i korgen!
[curious] Oj, bollen då? Zebran vet inte var.
[warmly] Kan du hjälpa zebran? Kan du se var bollen är?
[excited] Ja, där! Ja, under sängen!
[playfully] Ska vi leka lite? Rulla, rulla … till dig!
[warmly] Kan du rulla tillbaka?
[excited] Rulla, rulla … till zebran! [laughs]
[playfully] Till dig … och tillbaka! [giggles]
[happy] Nu bollen. Ett, två … i korgen!
[excited] Nu är det alldeles städat!
[happy] Hej då, zebran! Hej då, korgen!
[warmly] Hej då! Vi ses snart! [giggles]

Nya repliker, rond 2026-11-12 (egna korta tagningar, filnamn 29–31):

[excited] Titta! Kritan ritar igen.
[excited] En radio! Vi kan lyssna på en låt!
[curious] Oj, bollen då? Hittar du inte bollen?
```

## Zebrans röst

Samma nya familj som i 026: **`gnagg-gullig`** (8 känslor i receptets ordning: hej, förtjust, fniss, mysig suck, nyfiken, trumpen, pratar, hej då) och det långa fnisset `gnagg-fniss`. Görs en gång, i det avsnitt som byggs först.

Övrigt finns: `trav`, `nalle-hopp`, `dunk`, `badanka-pip`, `studs`, `tindra`, `lysmask`, `tass-klapp-tre`, `korg`, `hemmaljud` (platsmatta, lågt). `rull` (1) är en ärta på trägolv: prova den till bollen, och gör annars en mjukare `boll-rull` (Openverse först).

## Regelkoll

- [x] 1 figur, 1 plats; en ny sak, radion (Sanna ville ha den, 2026-11-11)
- [x] Inga djurnamn: "zebran", "nallen", "ankan", "bollen"
- [x] Aldrig *"Vad kan det vara?"*, aldrig *"Vad säger man?"*
- [x] Tre frågor till barnet med paus: tack (4 s), var är bollen (5 s), rulla tillbaka (4 s)
- [x] *"Varsågod"* och *"Tack!"*
- [x] Samma fras tre gånger: *"Ett, två … i korgen!"*
- [x] Bilden på orden: en sak lyfter på *"ett"*, en på *"två"*, de landar på *"i korgen!"*
- [x] Tydligt hej och hej då, med vinkning
- [x] Inget läskigt: bollen under sängen syns hela tiden
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Öppet

1. **Sovrummet och sängen** görs i 026 (Öppet 1–2 där). Fönstrets himmel är dagsljus här.
2. **Tredje gången räknar bollens två studs**, inte två saker (*"Nu bollen. Ett, två … i korgen!"*). Sanna avgör om det är tydligt nog, eller om nallen ska hoppa ur korgen i leken och åka med sist (*"Bollen och nallen. Ett, två …"*).
3. **Leken ligger före tredje gången:** bollen måste rullas innan den läggs i korgen. Receptet har leken efter lösningen.
4. **Leksakerna har olika stil:** röda bilen och röda bollen är gjorda till Shorts (v1-krita), ankan och båten i v2. Gör en stillbild med alla på golvet innan manuset låses, och mät kanterna (`tunn_kant.py`).
5. **Nära 026** (samma rum och figur). Bra som par, men lägg 026 och 027 med andra avsnitt emellan.
6. **Tack-repliken:** *"Ska vi säga tack?"*. Vald av Sanna 2026-11-11.
7. **Radions musik:** lånar `assets/ljud/musik/gissa-bad.m4a` (Gissa teckningens bädd, 100 BPM) genom ett radiofilter, tills vidare. En egen slinga finns, `stada-radion.m4a` (104,86 BPM: `SLAG0` 0.505, `SLAG` 0.5722), om Sanna vill byta. Byts den: ändra `MUSIK`/`SLAG0`/`SLAG` i `storyboard/radio-tider.mjs` och kör `node radio.mjs`.
