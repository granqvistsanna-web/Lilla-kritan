# Avsnitt 046 – Kaninen går till doktorn (plan)

**Status:** plan 2026-11-20, **grind 1 (manus) godkänd av Sanna 2026-11-20**, version 1. Grind 2: doktorn A (nu utan inbakat stetoskop), mottagningen v2, stetoskopet och öronlampan i kod (`uttryck.html?ark=saker`). Nästa: närbildsprovet med kodhanden mot kaninens mage och öra, sedan grind 3 (Malins röst). Piloten för **Besöket** ([`format/besoket.md`](../../format/besoket.md)), en gren av bilderboken ([`format/bilderbok.md`](../../format/bilderbok.md), skillen `bilderbok`). Avsnittet förbereder små barn för ett besök hos doktorn. Malin berättar och kaninen svarar med ljud, öron och ansikte. **Doktorn säger inget**, **ingen spruta**, **bara mottagningen** (Sanna 2026-11-20). Inget är byggt än. Ca 4 min.

| | |
|---|---|
| **Titel** | Kaninen går till doktorn (avsnitt 46) |
| **Figurer (2)** | **Kaninen Kanel** (v2, riggad, sittposen finns) · **Doktorn** (ny, **mer mänskliga proportioner och en egen rigg**, Sanna 2026-11-20: runt huvud på kort hals, kropp i rock, raka armar och ben; görs med `lk-figur`, prompterna i [`doktorn-prompter.md`](doktorn-prompter.md)). **Sanna valde doktorn A** 2026-11-20 (vit rock, röda lockar): [`karaktarer/doktorn-a.md`](../../karaktarer/doktorn-a.md). Doktorn står still vid britsen, nickar, ler och vinkar |
| **Platser (1)** | **Mottagningen** (ny platta 16:9, [`bakgrunder/mottagningen.md`](../../bakgrunder/mottagningen.md), alternativ D vald av Sanna 2026-11-20): himmelsblå vägg, korallröd brits med papper, vit pall, undersökningslampa på väggen, ljust golv. Inget platsbyte |
| **Saker** | **nallen** (finns, `rekvisita/nalle.md`, ritas av kritan) · **stetoskopet** och **öronlampan** ritas i kod (Sanna 2026-11-20, [`verktyg/doktor-saker.js`](../../verktyg/doktor-saker.js)), inga bilder |
| **I kod** | stetoskopets slang (mjuk kritkurva från doktorns hals till handen), lampans ljus, klistermärket med stjärnan (ritas av kritan), skimret, hjärtslagens små ringar |
| **Musik** | ingen |
| **Favoriter** | 🐰 kanin · 🧸 nalle |
| **Kärna** | Kaninen kommer till doktorn och är lite osäker. Kritan ritar en nalle: *"Varsågod!"* – *"Tack!"* Nallen är med. Upp på britsen. Doktorn gör tre saker, **först på nallen, sedan på kaninen**: lyssnar på magen (*"Lyssna, lyssna … dunk, dunk!"*), tittar i öronen (*"Titta, titta … fint!"*) och kaninen gapar (*"Gapa … aaa!"*). Nallen ramlar ner och gömmer sig bakom pallen, barnet hittar den. Kritan ritar ett klistermärke med en stjärna. *"Tack, doktorn!"* Hej då! |
| **Barnet övar på** | känna igen doktorns rum och saker · ordningen: hej, upp på britsen, lyssna, titta, gapa, klistermärke, hej då · peka på sin mage och sina öron · gapa · säga tack |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång (`L.ROR.ga`) från vänster, stannar framför pallen, före repliken |
| Lite osäker | öronen faller mjukt 12°, blicken ner, kroppen sjunker 6 px. Ingen gråt, inget darr |
| Kramar nallen | nallen vid tasspetsen framför magen, tassen framför nallens nederkant, huvudet lutar mot nallen. Öronen reser sig långsamt |
| Upp på britsen | två lugna skutt: upp på pallen, upp på britsen (`hopp()` som pallen i 020). Sedan **sittposen**, nallen i famnen, och kaninen sitter kvar till uppslag 30 |
| Doktorn | står still till höger om britsen. Rör bara: nick (huvudet ner och upp), litet leende, ena armen lite upp mot kaninen i den breda bilden, vinkning (armen bakom kroppen, ut förbi kanten). Går aldrig, sätter sig aldrig |
| Doktorns hand i närbild | **instick:** ett urklipp (rockärm, hand, saken) glider in från högra bildkanten på 0,6 s, stannar på magen, örat eller framför munnen, glider ut. Ingen riggarm i närbilderna |
| Lyssnar | **Stetoskopet sitter i doktorns öron när doktorn lyssnar** (Sanna 2026-11-20). Halvbilden på doktorn (11b, 14) visar öronpropparna i öronen och slangen ner till handen; stetoskopet ritas i kod på doktorn (runt halsen eller i öronen), så doktorns kropp behöver en version utan stetoskop. I närbilden: bröstdelen stilla mot magen. Två små mjuka ringar växer ut från den i takt med *"dunk, dunk"* |
| Lampan | en mjuk gul cirkel tänds med `lampa-klick` och lyser på örat. Örat glöder svagt varmt. Släcks när handen går ut |
| Örat ramlar ner | kaninens ena öra faller lugnt ner framför ögat (vridning 0 → 70° på 0,5 s) och lyfts upp igen av tassen (raka armen) |
| Gapar | O-munnen, öppnas på 0,3 s, hålls 1,2 s, stängs |
| Nallen ramlar | nallen glider ur famnen när kaninen klappar på magen, glider ner längs britsens kant och landar bakom pallen. Bara ena örat tittar fram över pallens kant (pallen ligger i plattan, så nallen läggs bakom en mask av pallen; Sanna 2026-11-20: britsens ram är öppen, så nallen gömmer sig bakom pallen) |
| Klistermärket | kritan ritar en gul stjärna i luften (kontur 2 s), den fylls i och flyttar sig lugnt till kaninens mage (klistras, `pop`). Sedan en liten till på nallen |
| Glatt skutt | 20 px upp med tryck ihop före och efter. Inget studs |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan papperet. Ingen jingel, inget titelkort.

## KRITAN RITAR (~16 s) – papper

Kritan ritar kaninen: konturen i lugna drag (7 s), de långa öronen och armarna som egna drag, väntar medan barnet gissar, den riktiga kaninen fylls i. Zoom in i teckningen, in i mottagningen.

## MOTTAGNINGEN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar konturen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! En kanin! | krita-ritar |
| 1 | Helbild. Kaninen trippar in från vänster och vinkar | Hej, kaninen! Hej, hej! | `smasteg`, `kanin-hej` |
| 2 | Halvbild på doktorn vid britsen. Doktorn vinkar och ler | Titta, där är doktorn. Hej, doktorn! | – |
| 3 | Närbild, kaninen. Öronen faller lite, blicken ner | Idag är kaninen hos doktorn. | `kanin-ny-fragande` |
| 4 | Samma, kaninen tittar upp på doktorn och sedan ner igen | Oj. Kaninen är visst lite osäker. | `kanin-ny-trumpen` (mjuk) |
| 5 | Helbild, doktorn nickar lugnt | Doktorn ska bara titta att du växer och mår bra. *(paus 1 s)* Hm … vad gör vi nu? | – |
| 6 | Kritan kommer in och ritar en nalle bredvid kaninen: konturen (4 s), gisspaus, nallen fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En nalle! Varsågod, kaninen. | krita-ritar, `glitter` |
| 7 | Kaninen tittar på nallen, öronen reser sig | Ska vi säga tack? *(paus 2,5 s)* | `kanin-gullig-5` (nyfiken) |
| 8 | Kaninen nickar direkt och kramar nallen | Tack! | `kanin-ny-fortjust` |
| 9 | Närbild, kaninen med nallen i famnen, huvudet lutar mot nallen | Nallen är med. Då går det bra. | `kanin-gullig-4` (mysig suck) |
| 10 | Helbild. Doktorn pekar på britsen. Kaninen skuttar upp på pallen, sedan på britsen, och sätter sig | Upp på britsen! Hopp … och hopp! | `hopp-mjuk` ×2 |
| 11 | Närbild, instick: handen med stetoskopet glider in och stannar i bild | Titta, ett stetoskop. Med det lyssnar doktorn. | `kanin-ny-fragande` |
| 11b | Halvbild på doktorn: stetoskopet lyfts från halsen och öronpropparna sätts i öronen, armen pekar mot britsen. Ingen ny replik (under slutet av 11) | – | – |
| 12 | Närbild på nallens mage, stetoskopet mot den, två små ringar | Först nallen. Lyssna, lyssna … dunk, dunk! | hjärtslag ×2 (mjukt) |
| 13 | Närbild på kaninens mage, stetoskopet mot den, två små ringar | Nu kaninen. Lyssna, lyssna … dunk, dunk! | hjärtslag ×2, `kanin-ny-fniss` |
| 14 | Halvbild på doktorn med stetoskopet i öronen: doktorn nickar och ler, sedan tillbaka runt halsen | Fint! Doktorn hörde magen. | `kanin-ny-ja` |
| 15 | Halvbild, kaninen klappar sig på magen med ena tassen | Kan du visa var din mage är? *(paus 4 s)* Där! | `klapp` |
| 16 | Närbild, instick: handen med öronlampan glider in, ljuset tänds | Och här är en lampa. Doktorn tittar i öronen. | `lampa-klick` |
| 17 | Närbild på nallens öra, ljuset lyser på det | Först nallen. Titta, titta … fint! | `tindra` |
| 18 | Närbild på kaninens långa öra, ljuset lyser, örat glöder | Nu kaninen. Vilka långa öron! Titta, titta … fint! | `kanin-gullig-2` (förtjust) |
| 19 | Samma. Kaninens öra ramlar ner framför ögat | Oj! Örat ramlade ner! | `kanin-ny-fniss` |
| 20 | Kaninen lyfter upp örat med tassen | Ha ha! Upp igen. | `kanin-ny-ja` |
| 21 | Halvbild, kaninen vickar på öronen | Var är dina öron? *(paus 4 s)* Där! | `kanin-gullig-3` (fniss) |
| 22 | Helbild, doktorn nickar | Nu ska doktorn titta i munnen. | – |
| 23 | Närbild på nallen, lampan framför nallens mun. Nallen gapar inte | Först nallen. Gapa … oj! Nallen kan inte gapa! | `kanin-ny-fniss` |
| 24 | Närbild på kaninen, lampan framför munnen. Kaninen gapar stort (O-munnen) | Nu kaninen. Gapa … aaa! | `kanin-aaa` (nytt) |
| 25 | Halvbild, kaninen stänger munnen och ser stolt ut | Fint! Kan du också gapa? *(paus 4 s)* Aaa! | `kanin-ny-jippi` |
| 26 | Helbild. Kaninen klappar händerna. Nallen glider ur famnen, ner längs britsen och bakom pallen | Oj! Var är nallen? | `kanin-ny-fragande` |
| 27 | Kaninen tittar åt vänster, sedan åt höger, öronen faller lite | Kaninen vet inte var nallen är. | `kanin-gullig-7` (frågande) |
| 28 | Helbild, efter 3 s klipp till närbild: nallens öra tittar fram över pallens kant och skimrar | Kan du hjälpa kaninen? Kan du se var nallen är? *(paus 5 s)* | tyst, sedan `tindra` |
| 29 | Samma, örat skimrar tydligt | Ja, där! Bakom pallen! | `kanin-ny-jippi` |
| 30 | Helbild. Kaninen skuttar ner, tar nallen och kramar den | Där är du, nallen! | `hopp-mjuk`, `kanin-gullig-4` |
| 31 | Kritan kommer in och ritar en stjärna i luften: konturen (2 s), gisspaus, den fylls i gul | Titta! Kritan ritar igen. *(gisspaus 3 s)* En stjärna! Ett klistermärke! | krita-ritar, `glitter` |
| 32 | Stjärnan glider till kaninens mage och klistras fast | Till kaninen. | `pop`, `kanin-gullig-2` |
| 33 | En liten stjärna glider till nallen | Och en till nallen! | `pop`, `kanin-ny-fniss` |
| 34 | Kaninen tittar ner på stjärnan, glatt skutt | Bra, kaninen! Nu är det klart. | `kanin-ny-jippi` |
| 35 | Kaninen vänder sig mot doktorn och nickar. Doktorn nickar tillbaka | Ska vi säga tack till doktorn? *(paus 2,5 s)* Tack, doktorn! | `kanin-ny-ja` |
| 36 | Helbild. Doktorn vinkar | Hej då, doktorn! | – |
| 37 | Halvbild, kaninen vinkar med nallen i andra tassen (armen bakom kroppen) | Hej då, kaninen! Hej då, nallen! | `kanin-hejda` |
| 38 | Samma, kaninen vinkar klart | Hej då! Vi ses snart! | `kanin-hejda` |
| 39 | Kritirisen runt kaninen och nallen | – | – |

**Shorts:** (1) uppslag 10–15, stetoskopet, *"Lyssna, lyssna … dunk, dunk!"*, ca 45 s. (2) uppslag 16–21, öronlampan och örat som ramlar ner, ca 40 s. (3) uppslag 22–29, gapa och var är nallen, ca 50 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/kaninen-gar-till-doktorn/` (`01-kritan-ritar` …).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! En kanin!
[happy] Hej, kaninen! Hej, hej!
[cheerfully] Titta, där är doktorn. Hej, doktorn!
[warmly] Idag är kaninen hos doktorn.
[softly] Oj. Kaninen är visst lite osäker.
[warmly] Doktorn ska bara titta att du växer och mår bra.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En nalle! Varsågod, kaninen.
[warmly] Ska vi säga tack?
[happy] Tack!
[warmly] Nallen är med. Då går det bra.
[cheerfully] Upp på britsen! Hopp … och hopp!
[curious] Titta, ett stetoskop. Med det lyssnar doktorn.
[happy] Först nallen. Lyssna, lyssna … dunk, dunk!
[happy] Nu kaninen. Lyssna, lyssna … dunk, dunk!
[cheerfully] Fint! Doktorn hörde magen.
[warmly] Kan du visa var din mage är?
[excited] Där!
[curious] Och här är en lampa. Doktorn tittar i öronen.
[happy] Först nallen. Titta, titta … fint!
[delighted] Nu kaninen. Vilka långa öron! Titta, titta … fint!
[surprised] Oj! Örat ramlade ner!
[laughs] Ha ha! Upp igen.
[warmly] Var är dina öron?
[excited] Där!
[cheerfully] Nu ska doktorn titta i munnen.
[chuckles] Först nallen. Gapa … oj! Nallen kan inte gapa!
[happy] Nu kaninen. Gapa … aaa!
[cheerfully] Fint! Kan du också gapa?
[playfully] Aaa!
[surprised] Oj! Var är nallen?
[curious] Kaninen vet inte var nallen är.
[warmly] Kan du hjälpa kaninen? Kan du se var nallen är?
[excited] Ja, där! Bakom pallen!
[happy] Där är du, nallen!
[excited] Titta! Kritan ritar igen.
[delighted] En stjärna! Ett klistermärke!
[happy] Till kaninen.
[giggles] Och en till nallen!
[happy] Bra, kaninen! Nu är det klart.
[warmly] Ska vi säga tack till doktorn?
[happy] Tack, doktorn!
[happy] Hej då, doktorn!
[happy] Hej då, kaninen! Hej då, nallen!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Kaninens röst och ljuden

Familjerna finns: `kanin-gullig` (8 känslor, plus `kanin-hej` och `kanin-hejda`) och `kanin-ny` (`hej`, `fortjust`, `fniss`, `trumpen`, `fragande`, `ja`, `jippi`, `mmm`). Övrigt som finns: `smasteg`, `hopp-mjuk`, `klapp`, `glitter`, `tindra`, `krita-ritar`, `lampa-klick`, `pop`.

**Nytt till grind 4:** `kanin-aaa` (kaninen gapar, ett kort ljust "aaa", ElevenLabs SFX) och **mjuka hjärtslag** (Openverse först, CC0).

## Regelkoll

- [x] Inga djurnamn: "kaninen", "nallen", "doktorn"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot säger *"Hm … vad blir det nu?"*
- [x] Frågor till barnet med paus: var är magen (4 s), var är öronen (4 s), kan du gapa (4 s), var är nallen (5 s)
- [x] *"Varsågod"*, *"Ska vi säga tack?"* och *"Tack!"*, plus *"Tack, doktorn!"*
- [x] Samma mönster tre gånger: *"Först nallen … Nu kaninen …"* med *"Lyssna, lyssna"*, *"Titta, titta"*, *"Gapa"*
- [x] Kritan ritar två gånger: nallen och stjärnan
- [x] Inget läskigt: ingen spruta, ingen gråt, inga ord som ont, sjuk, farligt, rädd eller modig. Känslan *"lite osäker"* sägs högt och nallen hjälper
- [x] Fniss: 19–20, 23, 33 (högst 3–4, aldrig två rader i följd med fniss över Malin)
- [x] Ingen ny musik
- [x] Inga nya saker som bilder: stetoskopet och öronlampan ritas i kod, som plåstret
- [ ] **Avsteg:** 2 figurer. Bilderboken har 1, men doktorn behövs. Doktorn är tyst och står still, så det är en lätt figur
- [ ] **Avsteg:** ny figur (doktorn) och ny platta (mottagningen). Båda görs en gång och återanvänds i hela Besöket
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt

## Öppet

- ~~Hur doktorn ser ut~~ **Doktorn A**, vit rock och röda lockar (Sanna 2026-11-20). Doktorn B (ljusblå rock) sparas till BVC eller tandläkaren.
- ~~Mottagningens vägg~~ **himmelsblå** (alternativ D, Sanna 2026-11-20).
- ~~Vad doktorn heter internt~~ `doktorn-a` (filnamnet i `karaktarer/`). I det som sägs är det alltid *"doktorn"*.
