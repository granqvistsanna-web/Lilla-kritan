# Avsnitt 049 – Kaninen går till tandläkaren (plan)

**Status:** plan 2026-11-21, **grind 1 (manus) godkänd av Sanna 2026-11-21**, version 1. **Grind 2 (2026-11-21):** fyra tagningar av tandläkarstolen (`assets/rekvisita/tandlakarstolen/original/jamforelse.jpg`) och gosedjurselefanten (`assets/rekvisita/gosedjur-elefant/original/jamforelse.jpg`), doktorn B utan stetoskop och penna i två tagningar (`assets/karaktarer/doktorn-b/premium/original/utan-stetoskop-jamforelse.jpg`), alla Flow Nano Banana 2.1, 0 krediter. **Sanna valde 2026-11-21: stolen 2, elefanten 1, doktorn 1.** Utklippta: `assets/rekvisita/tandlakarstolen/cut/tandlakarstolen.png`, `assets/rekvisita/gosedjur-elefant/cut/gosedjur-elefant.png`; doktorn B:s kropp utan stetoskop i `cut/doktorn-b-body.png`. Filer: [`rekvisita/tandlakarstolen.md`](../../rekvisita/tandlakarstolen.md), [`rekvisita/gosedjur-elefant.md`](../../rekvisita/gosedjur-elefant.md). **Grind 3 godkänd av Sanna 2026-11-21:** tagning 1 (`malin-tagning.mp3`, 124,1 s) delad i `assets/ljud/roster/kaninen-gar-till-tandlakaren/` (50 filer, −3 dBFS, längder i `rost-langder.txt`, allt i rad i `provlyssna-rost.m4a`). Flyttat för hand: *"Bra!"* från 38 till 37, *"Hopp!"* från 41 till 40. Lyssna på 22–24 (whisper hör inte *"aaa"*), 19 (*"Hi hi"*), 21 (*"har"*), 03 och 06 (*"tandborste"*, *"kaninen"*). **Grind 4 (2026-11-21):** nya ljud `kanin-tack` (ElevenLabs, 4), `stol-vvv` och `borsta` (Openverse, CC BY, 4 var), allt i rad i `provlyssna-ljud.m4a` (tack 1–4, stol 1–4, borsta 1–4). Källor och kreditrader i [`ljud-effekter.md`](ljud-effekter.md). **Grind 4 godkänd 2026-11-21** (Sanna: "use any good ones", Claude valde efter mätt brus och skärpa): `kanin-tack-4` (mjukast i diskanten), `stol-vvv-2` upp och `stol-vvv-4` ner (minst brus), `borsta-1` (elefanten) och `borsta-2` (kaninen). **Grind 5 (2026-11-21):** [`storyboard/`](storyboard/) (`rader.mjs`, `scen.html`, `bygg.mjs --animatik`, förlaga 046), 49 bilder, 4:30,5, kontaktark `storyboard/kontaktark.jpg`, `animatik.mp4`. Tandläkarens hand i närbilderna är ett instick (rockärm + hand i kod), eftersom doktorn B saknar armbågsarmar; de görs till scenen (grind 6). **Grind 5 godkänd av Sanna 2026-11-21.** Nästa: grind 6, kodscenen `scener/mottagningen/` (förlaga 046) och doktorn B:s armbågsarmar, sedan `render.mjs --snabb`. Inget är byggt. **Feedback 1 (Sanna 2026-11-21), förhandsvisning 2:** tandläkarens ansikte mitt i närbilden, hela kaninen i rad 5, stolen delad (bara sätet åker upp, 36 px, foten står kvar, kolven fyller glappet), spegeln mitt i sakbilden med en glans som sveper, tandläkaren håller spegeln och tandborsten med sin egen riggarm (instickshanden borta, hon står 70 px närmare stolen), tandborsten i bröstfickan från början (handtaget nere i fickan), förbryllad min i 23b–23c (bryn, liten rund mun, axelryckning, ett frågetecken). Ny replik 51 i rad 4 efter *"Oj. Det är en stor stol."*: *"Du ska få sitta i den här tandläkarstolen. Då kan tandläkaren undersöka tänderna."* (ElevenLabs v3, Malin, tagning 1 av 2, rådata i `produktion/ljud-original/049/`). Andra avsnittet i **Besöket** ([`format/besoket.md`](../../format/besoket.md)), en gren av bilderboken ([`format/bilderbok.md`](../../format/bilderbok.md), skillen `bilderbok`). Syskon till 046 *Kaninen går till doktorn*: samma kanin, samma rum, samma ordning, så att barnet känner igen mönstret. Avsnittet förbereder små barn för ett besök hos tandläkaren. Malin berättar, kaninen svarar med ljud, öron och ansikte, **tandläkaren säger inga meningar**. Ca 4 min.

| | |
|---|---|
| **Titel** | Kaninen går till tandläkaren (avsnitt 49) |
| **Figurer (2)** | **Kaninen Kanel** (v2, riggad, sittposen finns) · **Tandläkaren = doktorn B** ([`karaktarer/doktorn-b.md`](../../karaktarer/doktorn-b.md), ljusblå rock, mörkbrun page, rigg klar, sparad till tandläkaren). Står still vid stolen, nickar, ler, vinkar |
| **Platser (1)** | **Mottagningen**, rummet med grönblå vägg (`assets/bakgrunder/mottagningen/mottagningen-teal.png`, take 1, Sanna 2026-11-21) med **tandläkarstolen** som eget urklipp i stället för britsen. Inget platsbyte |
| **Saker** | **tandläkarstolen** (ny, grind 2) · **gosedjuret** (nytt utseende, grind 2, förslag: en liten blå elefant, heter *"elefanten"*) · **tandspegeln** och **tandläkarlampan** i kod (`doktor-saker.js`, som stetoskopet) · **tandborsten** finns ([`rekvisita/tandborsten.md`](../../rekvisita/tandborsten.md)) |
| **I kod** | spegeln (ett litet runt glas på ett skaft), lampans ljuskägla, tänderna (kaninens två stora framtänder + en rad små, ritade som i 025), glittret på blanka tänder, klistermärket |
| **Musik** | ingen ny; samma svaga loop som 046 (`gissa-bad.m4a` på 0,075) |
| **Favoriter** | 🐰 kanin · 🦷 tänder |
| **Kärna** | Kaninen kommer till tandläkaren. Stolen är stor och kaninen vill inte. Kritan ritar en gosedjurselefant: *"Varsågod!"* – *"Tack, kritan!"*, och kaninen tackar med sitt ljud Upp i stolen, stolen åker upp. Kritan ritar en spegel. Tandläkaren gör tre saker, **först på elefanten, sedan på kaninen**: lampan tänds (*"Klick … ljus!"*), tittar med spegeln och räknar tänderna (*"Gapa … aaa! En, två … fina tänder!"*), borstar (*"Borsta, borsta … blankt!"*), men först hittar tandläkaren inte tandborsten och barnet ser att den ligger i fickan. Tandläkaren undrar om godis (*"Bara ibland. Det är bra!"*) och tandborstning (*"Varje morgon och kväll. Bra!"*).  Kritan ritar ett klistermärke, en glad tand. *"Tack, tandläkaren!"* Hej då! |
| **Barnet övar på** | känna igen stolen, lampan och spegeln · ordningen: hej, upp i stolen, stolen åker upp, lampan, spegeln, borsta, klistermärke, hej då · gapa · visa sina tänder · säga tack |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång (`L.steg`, klocka efter sträckan som i 037) från vänster, stannar framför stolen, före repliken |
| Vill inte | tittar upp på stolen, backar ett litet steg, skakar lugnt på huvudet, öronen faller 12°, oroligt ansikte (bryn snett upp, blicken ner). Ingen ny replik under själva backandet |
| Kramar elefanten | elefanten vid tasspetsen framför magen, tassen framför, huvudet lutar in, små hjärtan stiger bredvid ansiktet. Öronen reser sig långsamt |
| Upp i stolen | två lugna skutt: upp på fotstödet, upp i sätet (`hopp()`), sedan sittposen, elefanten i famnen. Sitter kvar till uppslag 30 |
| Stolen åker upp | **en rörelse**: hela stolen med kaninen glider 60 px uppåt på 2 s (ease in-out), med ett mjukt *vvvv*. Kaninen ler och tittar ner. Samma ner igen i uppslag 26 |
| Tandläkaren | står still till höger om stolen. Nickar, lutar huvudet, ena armen fram med saken (armbågsarmen i kod), vinkar (armen bakom kroppen). Går aldrig, sätter sig aldrig. Reagerar på sina ljud som doktorn i 046 |
| Lampan | lampan på stolens arm tänds med `lampa-klick`: en mjuk gul ljuskägla på ansiktet. Kaninen blinkar en gång och fnissar |
| Spegeln | i tandläkarens vänstra hand. I närbilden står spegeln stilla framför den öppna munnen; tänderna lyser upp en i taget när Malin räknar |
| Gapar | O-munnen med tänderna synliga, öppnas på 0,3 s, hålls medan Malin räknar, stängs |
| Borstar | tandborsten i tandläkarens hand, tre lugna fram-och-tillbaka över framtänderna, sedan ett litet glitter på tänderna (`tindra`) |
| Tandborsten borta | tandläkaren tittar på sin tomma hand, sedan vänster, höger, vänster med huvudet (riktningsposerna, armarna stilla), förvånat ansikte som doktorn i 046. Tandborsten sticker upp ur bröstfickan (fickan och borsten i kod på rocken) och skimrar efter 3 s. På *"I fickan!"* tittar tandläkaren ner, armen tar upp den |
| Ner igen | stolen glider ner 60 px på 2 s, kaninen skuttar ner på golvet med elefanten i famnen. Elefanten tappas inte |
| Klistermärket | kritan ritar en liten glad tand i luften (kontur 2 s), den fylls i och flyttar sig lugnt till kaninens mage (`pop`), sedan en liten till på elefanten |
| Glatt skutt | 20 px upp med tryck ihop före och efter. Inget studs |

## INTRO (1 s)

Lilla Kritans logotyp i 1 s, sedan papperet. Ingen jingel, inget titelkort.

## KRITAN RITAR (~16 s) – papper

Som i 046 ritar kritan **besökets sak** i ritintrot: **tandborsten** (en sak barnet redan känner, så ingången är trygg). Konturen i ett drag (`verktyg/kontur.py`, ca 7 s, skogsljud under), gisspaus, bilden fylls i inifrån. *"En tandborste! Nu ska vi till tandläkaren."* Zoom in i mottagningen.

## MOTTAGNINGEN

| # | Bild (en rörelse) | Malin säger | Kaninen svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar tandborstens kontur | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* En tandborste! | krita-ritar |
| 1 | Helbild. Kaninen trippar in från vänster och vinkar | Hej, kaninen! Hej, hej! | `smasteg`, `kanin-hej` |
| 2 | Närbild på tandläkaren vid stolen, vinkar och ler | Titta, där är tandläkaren. Hej, tandläkaren! | `doktor-hej` |
| 3 | Närbild, kaninen | Idag är kaninen hos tandläkaren. Tandläkaren tittar på tänderna. | `kanin-ny-fragande` |
| 4 | Helbild. Tandläkaren pekar på stolen. Kaninen tittar upp, backar ett steg, skakar på huvudet, öronen faller | *(tyst 1,5 s, sedan)* Oj. Det är en stor stol. Du ska få sitta i den här tandläkarstolen. Då kan tandläkaren undersöka tänderna. | `kanin-ny-trumpen` (mjuk) |
| 5 | Närbild, kaninen orolig | Kaninen är visst lite osäker. Hm … vad gör vi nu? | – |
| 6 | Kritan kommer in och ritar ett gosedjur bredvid kaninen: konturen (4 s), gisspaus, fylls i | Titta! Kritan ritar något. *(gisspaus 3 s)* En elefant! Varsågod, kaninen. | krita-ritar, `glitter` |
| 7 | Kaninen tittar på elefanten, öronen reser sig, tittar upp mot kritan och nickar | Tack, kritan! | `kanin-tack` (kaninen säger tack med sitt eget ljud, ett glatt litet tvåstavigt pip) |
| 8 | Kaninen kramar elefanten, små hjärtan | – | `kanin-ny-fortjust` |
| 9 | Närbild, kaninen med elefanten, huvudet lutar in | Elefanten är med. Då går det bra. | `kanin-gullig-4` (mysig suck) |
| 10 | Helbild. Kaninen skuttar upp på fotstödet och upp i stolen, sätter sig | Upp i stolen! Hopp … och hopp! | `hopp-mjuk` ×2 |
| 11 | Samma. Stolen åker lugnt upp | Stolen åker upp … upp … upp! Stopp! | stol-vvv (nytt), `kanin-ny-fniss` |
| 12 | Närbild, kaninen tittar ner och ler | Oj, vad högt! | `kanin-gullig-2` (förtjust) |
| 13 | Närbild på lampan på stolens arm. Ljuset tänds | Titta, en lampa. Klick … ljus! | `lampa-klick` |
| 14 | Närbild på elefanten, ljuset på den | Först elefanten. Klick … ljus! | `doktor-ooo` |
| 15 | Närbild på kaninen, ljuset på ansiktet, kaninen blinkar och fnissar | Nu kaninen. Klick … ljus! Hi hi, det blinkar. | `kanin-ny-fniss` |
| 16 | Kritan ritar spegeln i luften framför tandläkaren: skaftet och den runda glasbiten streck för streck (3 s), gisspaus 3 s, den fylls i och tandläkaren tar den | Titta! Kritan ritar något. *(gisspaus 3 s)* En liten spegel! Med den tittar tandläkaren på tänderna. | krita-ritar, `glitter` |
| 17 | Sakbild: spegeln ensam på rosa botten med mjuka strålar | – *(under slutet av 16)* | `tindra` |
| 18 | Närbild på elefanten, spegeln framför snabeln | Först elefanten. Gapa … oj! Elefanten har en snabel! | `kanin-ny-fniss`, `doktor-fniss` |
| 19 | Halvbild, kaninen visar: gapar själv först | Kan du också gapa? *(paus 4 s)* Aaa! | – |
| 20 | Närbild på kaninen, gapar stort, spegeln framför munnen. Tänderna lyser upp en i taget | Nu kaninen. Gapa … aaa! En, två, tre … | `doktor-hmm` |
| 21 | Samma, de två stora framtänderna glittrar | Vilka stora tänder! Fina tänder! | `doktor-bra`, `kanin-gullig-2` |
| 22 | Halvbild, kaninen stänger munnen och ser stolt ut | Kan du visa dina tänder? *(paus 4 s)* Där! | `kanin-ny-ja` |
| 23 | Närbild på tandläkaren, tittar på sin tomma hand, förvånad (stora ögon, liten rund mun) | Nu ska tandläkaren borsta lite. Men … var är tandborsten? | `doktor-oj` |
| 23b | Halvbild. Tandläkaren tittar vänster, höger, vänster (bara huvudet), bryn snett. Kaninen tittar också | Tandläkaren hittar inte tandborsten. | `doktor-hmm`, `kanin-gullig-7` (frågande) |
| 23c | Helbild, efter 3 s närbild: tandborsten sticker upp ur tandläkarens bröstficka och skimrar | Kan du hjälpa tandläkaren? Kan du se var tandborsten är? *(paus 5 s)* | tyst, sedan `tindra` |
| 23d | Samma. Tandläkaren tittar ner på fickan, förvånad, tar upp tandborsten och fnissar | Ja, där! I fickan! | `doktor-oj`, `doktor-fniss`, `kanin-ny-fniss` |
| 24 | Närbild på elefanten, tandborsten borstar snabeln | Först elefanten. Borsta, borsta … | borst (befintligt), `kanin-ny-ja` |
| 25 | Närbild på kaninen, tandborsten över framtänderna, glitter | Nu kaninen. Borsta, borsta … blankt! | borst, `tindra`, `kanin-ny-jippi` |
| 25b | Halvbild, tandläkaren lutar huvudet. En liten tankebubbla med en godisbit i kod bredvid kaninen | Tandläkaren undrar … äter kaninen godis? | `doktor-hmm` |
| 25c | Närbild, kaninen nickar lite, en liten tass lyfts. Bubblan krymper | Bara ibland. Det är bra! | `kanin-ny-ja`, `doktor-bra` |
| 25d | Samma. Ny bubbla: tandborsten med en liten sol och en måne | Och borstar kaninen tänderna? | `doktor-hmm` |
| 25e | Kaninen nickar stort, glatt skutt i sätet | Ja! Varje morgon och kväll. Bra! | `kanin-ny-jippi`, `doktor-bra` |
| 25f | Halvbild, kaninen tittar på tittaren | Borstar du också tänderna? *(paus 4 s)* Bra! | `kanin-ny-ja` |
| 26 | Helbild. Stolen åker lugnt ner. Kaninen skuttar ner på golvet med elefanten i famnen | Stolen åker ner … Hopp! | stol-vvv, `hopp-mjuk`, `kanin-ny-jippi` |
| 31 | Kritan ritar en liten glad tand i luften: konturen (2 s), gisspaus, fylls i vit med ett leende | Titta! Kritan ritar igen. *(gisspaus 3 s)* En glad tand! Ett klistermärke! | krita-ritar, `glitter` |
| 32 | Tanden glider till kaninens mage och klistras fast | Till kaninen. | `pop`, `kanin-gullig-2` |
| 33 | En liten tand glider till elefanten | Och en till elefanten! | `pop`, `kanin-ny-fniss` |
| 34 | Närbild, kaninen tittar ner på klistermärket, glatt skutt | Bra, kaninen! Nu är det klart. | `kanin-ny-jippi` |
| 35 | Kaninen vänder sig mot tandläkaren och nickar, tandläkaren nickar tillbaka | Ska vi säga tack till tandläkaren? *(paus 2,5 s)* Tack, tandläkaren! | `doktor-bra` |
| 36 | Närbild, tandläkaren vinkar | Hej då, tandläkaren! | `doktor-hejda` |
| 37 | Halvbild, kaninen vinkar med elefanten i andra tassen (armen bakom kroppen) | Hej då, kaninen! Hej då, elefanten! | `kanin-hejda` |
| 38 | Samma, vinkar klart | Hej då! Vi ses snart! | `kanin-hejda` |
| 39 | Kritirisen runt kaninen och elefanten | – | – |

**Shorts:** (1) uppslag 10–15, stolen åker upp och lampan, ca 40 s. (2) uppslag 16–22, spegeln och räkna tänderna, ca 50 s. (3) uppslag 23–25f, var är tandborsten, borsta, godis, ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Repliker som finns i 046 (*"Kritan ritar …"*, *"Hm … vad blir det nu?"*, *"Hej, kaninen! Hej, hej!"*, *"Ska vi säga tack?"*, *"Tack!"*, *"Titta! Kritan ritar något."*, *"Upp … Hopp … och hopp!"*, *"Kaninen vet inte …"* osv.) kan återanvändas därifrån där orden är exakt lika; resten spelas in här.

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[delighted] En tandborste!
[happy] Hej, kaninen! Hej, hej!
[cheerfully] Titta, där är tandläkaren. Hej, tandläkaren!
[warmly] Idag är kaninen hos tandläkaren. Tandläkaren tittar på tänderna.
[softly] Oj. Det är en stor stol.
[softly] Kaninen är visst lite osäker.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] En elefant! Varsågod, kaninen.
[happy] Tack, kritan!
[warmly] Elefanten är med. Då går det bra.
[cheerfully] Upp i stolen! Hopp … och hopp!
[playfully] Stolen åker upp … upp … upp! Stopp!
[delighted] Oj, vad högt!
[curious] Titta, en lampa. Klick … ljus!
[happy] Först elefanten. Klick … ljus!
[giggles] Nu kaninen. Klick … ljus! Hi hi, det blinkar.
[delighted] En liten spegel! Med den tittar tandläkaren på tänderna.
[chuckles] Först elefanten. Gapa … oj! Elefanten har en snabel!
[cheerfully] Kan du också gapa?
[playfully] Aaa!
[happy] Nu kaninen. Gapa … aaa! En, två, tre …
[delighted] Vilka stora tänder! Fina tänder!
[warmly] Kan du visa dina tänder?
[excited] Där!
[surprised] Nu ska tandläkaren borsta lite. Men … var är tandborsten?
[curious] Tandläkaren hittar inte tandborsten.
[warmly] Kan du hjälpa tandläkaren? Kan du se var tandborsten är?
[excited] Ja, där! I fickan!
[happy] Först elefanten. Borsta, borsta …
[happy] Nu kaninen. Borsta, borsta … blankt!
[curious] Tandläkaren undrar … äter kaninen godis?
[warmly] Bara ibland. Det är bra!
[curious] Och borstar kaninen tänderna?
[happy] Ja! Varje morgon och kväll. Bra!
[warmly] Borstar du också tänderna?
[happy] Bra!
[playfully] Stolen åker ner … Hopp!
[excited] Titta! Kritan ritar igen.
[delighted] En glad tand! Ett klistermärke!
[happy] Till kaninen.
[giggles] Och en till elefanten!
[happy] Bra, kaninen! Nu är det klart.
[warmly] Ska vi säga tack till tandläkaren?
[happy] Tack, tandläkaren!
[happy] Hej då, tandläkaren!
[happy] Hej då, kaninen! Hej då, elefanten!
[warmly] Hej då! Vi ses snart! [giggles]
```

## Kaninens röst och ljuden

Finns: `kanin-gullig`, `kanin-ny`, `kanin-hej`, `kanin-hejda`, `smasteg`, `hopp-mjuk`, `glitter`, `tindra`, `krita-ritar`, `lampa-klick`, `pop`, `duns`, tandborstljudet från 025/030, och doktorns ljud `doktor-*` (hej, hmm, mhm, ooo, oj, bra, fniss, hejda).

**Nytt till grind 4:** `kanin-tack`, kaninens tack som ett glatt litet tvåstavigt pip i samma röst som `kanin-ny` (inga ord). Bröstfickan med tandborsten ritas i kod på doktorn B:s rock. Tankebubblorna (godisbiten, tandborsten med sol och måne) ritas i kod. `stol-vvv`, ett mjukt, kort surr när stolen åker upp och ner (Openverse först, annars ElevenLabs SFX). Inget som låter som en borr.

## Regelkoll

- [x] Inga djurnamn: "kaninen", "elefanten", "tandläkaren"
- [x] Aldrig *"Vad kan det vara?"*. Ritintrot säger *"Hm … vad blir det nu?"*
- [x] Frågor till barnet med paus: kan du gapa (4 s), visa dina tänder (4 s), borstar du också tänderna (4 s), var är tandborsten (5 s)
- [x] *"Varsågod"* och *"Tack, kritan!"*, kaninen tackar med sitt eget ljud (Sanna 2026-11-21: inget *"Ska vi säga tack?"* efter gåvan). *"Ska vi säga tack till tandläkaren?"* i slutet står kvar
- [x] Samma mönster tre gånger: *"Först elefanten … Nu kaninen …"* med *"Klick … ljus!"*, *"Gapa"*, *"Borsta, borsta"*
- [x] Kritan ritar tre gånger i scenen: elefanten, spegeln, klistermärket (receptets max), plus ritintrots tandborste som i 046
- [x] Inget läskigt: ingen borr, ingen sug, inga ljud som surrar högt, inga ord som ont, hål, borra, sjuk, rädd, modig, *"det gör inte ont"*. Känslan *"lite osäker"* sägs högt och elefanten hjälper
- [x] Fniss: 15, 18, 23d, 33 (fyra, aldrig två i följd över Malin)
- [x] Ingen ny musik
- [x] Säger *"tandläkaren"*, namnger sakerna en gång: *"en lampa"*, *"en liten spegel"*
- [ ] **Avsteg (som 046):** 2 figurer. Tandläkaren är tyst och står still
- [ ] **Avsteg:** en ny sak som bild, **tandläkarstolen**, plus gosedjurets nya utseende. Spegeln och lampans ljus ritas i kod

## Beslut (Sanna 2026-11-21, manuset godkänt; ändringar samma dag: *"Tack, kritan!"* i stället för *"Ska vi säga tack?"*, kaninen tackar med ljud, godis och tandborstning tillagt efter 25; elefanten tappas inte, i stället hittar tandläkaren inte tandborsten, som ligger i bröstfickan (23–23d))

1. **Gosedjuret:** en liten blå elefant, heter *"elefanten"*. Görs i grind 2 (`rekvisita/gosedjur-elefant.md`).
2. **Tandläkaren:** doktorn B. Stetoskopet tas bort med en Flow-redigering som för doktorn A.
3. **Tandläkarens ljud:** `doktor-*` återanvänds.
4. **Djuret:** kaninen, syskon till 046.
5. **Ritintrot:** tandborsten.
