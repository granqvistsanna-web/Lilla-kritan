# Avsnitt 057 – Katten tvättar händerna (plan)

**Status:** ✅ grind 1 (manus) godkänd 2026-11-25 (Sanna: *"Ja, kör grind 2"*). ✅ De 10 samtalsreplikerna (✱) godkända 2026-11-25 (Sanna via planeringssessionen: *"godkänn de nya replikerna i alla sex manus"*). ✅ Grind 2: penseln tagning 3 (Sanna), `assets/rekvisita/pensel/cut/pensel.png` med tunn kant och `pensel-kontur.json`; tvålen finns redan (i kod, `rekvisita/tval.md`) och `rekvisita/malningen.md` (i kod). README-raderna i `rekvisita/README.md` läggs till när sakerna är valda (delad fil). Bilderbok i serien *Djuren hittar på!* enligt [`format/bilderbok.md`](../../format/bilderbok.md) och skillen `bilderbok`: ingen sång, Malin pratar med katten, katten svarar med mjau, öron och svans. Förlaga: 023 Björnen tvättar händerna (handfatet, katten bakom det, skumtussen), men med ett annat problem och en annan vändning. Grind 3: tagning 1 (ElevenLabs 2026-11-25, `produktion/ljud-original/roster/katten-tvattar-handerna/malin-tagning-1.mp3`, generation 2 sparad som `-1b.mp3`) delad till `assets/ljud/roster/katten-tvattar-handerna/` (45 filer, gränserna 01/02, 09/10, 27/28 och 35/36 rättade för hand), normaliserad till −3 dBFS, längderna i `rost-langder.txt`. Generation 2 delad till `produktion/ljud-original/roster/katten-tvattar-handerna/tagning-1b/` (45 filer, rena gränser), också −3 dBFS. Provlyssna A (generation 1) mot B (generation 2) rad för rad: `ljud/provlyssna-malin-a-b.m4a` med tiderna i `ljud/provlyssna-malin-a-b.txt`. ✅ Grind 3: Sanna valde **A rakt igenom** (2026-11-25). Filerna i `assets/ljud/roster/katten-tvattar-handerna/` är generation 1, längderna i `rost-langder.txt` gäller. ✅ Grind 4 (ljuden, se *Kattens röst och ljuden*). Grind 5: animatiken klar för granskning 2026-11-25 (`storyboard/animatik.mp4`, 4:18, 46 bilder; `storyboard/index.html`). Nästa: Sannas godkännande, sedan grind 6 (förhandsvisning).

**Skillnaden mot 023:** björnen *ville inte* och gömde tassarna. Katten *vill*, men **färgen sitter fast**: bara vatten hjälper inte. Kritan ritar tvålen, och skummet blir rött och gult när tassarna tvättas. Ingen hal tvål, ingen klapp, ingen ritad handduk. I stället ett skumskägg, färgade bubblor, och på slutet visar kritan vad katten har målat.

| | |
|---|---|
| **Titel** | Katten tvättar händerna (avsnitt 57). Introt *"Djuren hittar på!"* |
| **Figurer (1)** | **Katten Kaj** (v2, riggad, [`karaktarer/katten-kaj.md`](../../karaktarer/katten-kaj.md)), samma storlek som i 044 |
| **Platser (1)** | **Badrummet** (`bakgrunder/badrummet.md`). Inget platsbyte. Katten står bakom **handfatet** som björnen i 023, på pallen |
| **Saker som finns** | [handfatet](../../rekvisita/handfatet.md), [tvålen](../../rekvisita/tval.md) (i kod, kritan ritar den), [pallen](../../rekvisita/pall.md), [handduken](../../rekvisita/handduk.md) (hänger på kroken från början) |
| **Nya saker (grind 2)** | **penseln** (ritintrot) och **målningen** (kritans andra teckning: ett papper med tassavtryck). Se listan längst ner |
| **I kod** | röd färg på ena tassen, gul på den andra, en liten blå fläck på örat, röda och gula tassavtryck på golvet, vattenstrålen, droppar, skum som färgas rött och gult, skumskägget, tre färgade bubblor, skimret |
| **Musik** | ingen ny musik. `badrumsljud` lågt under, `kran` bara när vattnet rinner |
| **Kärna** | Kritan ritar en pensel. Katten kommer in med en röd och en gul tass: den har målat. Den vill tvätta, men bara vatten hjälper inte, färgen sitter fast. Kritan ritar en tvål: *"Varsågod!"* – *"Tack!"* Det blir mycket skum och ett skumskägg. *"Tvätta, tvätta … borta!"* röda tassen (rött skum), gula tassen (gult skum). Lite blått är kvar, men katten ser det inte: barnet hittar den blå fläcken på örat. Färgade bubblor stiger, röd, gul, blå. Torka på handduken. Kritan ritar kattens målning: tre tassavtryck, rött, gult, blått. Hej då! |
| **Tema (subtilt)** | färger: röd tass, gul tass, blå fläck, och samma tre i skummet, bubblorna och målningen. Malin nämner färgen som en del av det som händer, aldrig som en fråga om färger |
| **Samtal** | Malin frågar katten, katten svarar med mjau i pausen, Malin reagerar kort som om hon förstått (mönstret från 052, Sanna 2026-11-25). Nya rader markerade ✱ |
| **Barnet letar** | den blå fläcken på örat (rad 21). Den syns lite redan från rad 1, så barnet kan hitta den innan Malin pekar |
| **Favoriter** | 🐱 katt · 🎨 färger · 🫧 bubblor |

## Så rör det sig

| Rörelse | Hur |
|---|---|
| Trippar in | riggens gång, stannar före repliken. Ett tassavtryck per steg, växelvis rött och gult (som honungsspåren i 023), `tass` mjukt |
| Visar tassarna | armarna upp åt sidorna (`armar [40, 40]` som 023), tassspetsarna röd och gul. Klipp till närbild på tassarna |
| Stolt | öronen upp, svansen vippar en gång, en nick |
| Kliver upp på pallen | ett lugnt skutt, sedan står katten bakom handfatet och syns från magen och upp |
| Bara vatten | kranen rinner, tassarna upp framför magen (`klapp`-armarna), droppar faller. Färgen bleknar inte alls. Katten tittar ner på tassarna, öronen sjunker |
| Skakar tassarna | lugn vridning ±6° två gånger, tre droppar flyger, `plupp` |
| Skummet växer | skumtussen mellan tassarna växer i tre lugna steg, en liten tuss lossnar och landar under hakan: **skumskägget**. Katten tittar ner på det (ögonen ner), fnissar |
| Tvättar en tass | klappen framför magen, lugn vridning ±6°, skumtussen snurrar. Skummet tonas mot tassens färg (rosa-rött, sedan ljusgult). Färgen bleknar till 70 % och är borta **på ordet "borta"** med `tindra`, skummet blir vitt igen |
| Vet inte var | katten tittar på tassarna, sedan åt vänster och höger (`rikt ±0,3`). Örat med den blå fläcken är mot kameran hela tiden |
| Blå fläcken | liten, blå (`#5B8FD9`) på det högra örats framsida, synlig men liten från rad 1. I frågans paus skimrar den svagt efter 3 s, tydligt på *"Ja, där!"*. Örat vippar en gång |
| Örat tvättas | skumtussen svävar upp och snurrar över örat (armen når inte, som nosen i 023). Katten blundar och rynkar nosen |
| Färgade bubblor | tre bubblor stiger ur handfatet en i taget, en röd, en gul, en blå (svag färgton, genomskinliga), stiger lugnt och spricker i sex droppar med `pop` på ordet |
| Torkar | handduken (urklippet på kroken) glider ner framför tassarna och upp igen, stelt (flytta, inte skala) |
| Målningen | kritan ritar ett papper på väggen bredvid handfatet: rektangeln, sedan tre tassavtryck som egna drag. Fylls i: vitt papper, avtrycken röd, gul, blå |
| Vinkar | armen bakom kroppen, snett ut förbi kanten |

## INTRO (1 s + *Djuren hittar på!*)

Introkortet *"Djuren hittar på!"* (`produktion/youtube/bilderbok-intro/`), sedan papperet.

## KRITAN RITAR (~14 s) – papper

Kritan ritar **en pensel**, inte katten (Sanna 2026-11-25): skaftet (två långa streck), metallbiten (en liten ring), sedan den spetsiga tofsen som ett eget drag. Konturen ca 2,8 s, står kvar ca 1 s, gisspaus, sedan fylls den riktiga penseln i inifrån: ljust trä, silvergrå hylsa, **röd** färg på tofsen. Zoom in i teckningen, in i badrummet, som är tomt. Katten kommer in först på rad 1.

## BADRUMMET

| # | Bild (en rörelse) | Malin säger | Katten svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar penselns kontur, väntar, penseln fylls i med röd färg på tofsen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus 3 s)* Oj! En pensel! | krita-ritar, skogsljud, `glitter` |
| 1 | Helbild, badrummet. Katten trippar in, röda och gula tassavtryck efter sig, stannar och vinkar | Hej, katten! Hej, hej! | `tass`, mjau hej |
| 1b ✱ | Halvbild, katten tittar på oss, svansen vippar. **Pausen:** glatt mjau, öronen upp | Hur är det, katten? *(paus: glatt mjau)* Jaså, du är glad i dag! | glatt mjau |
| 2 | Närbild, katten håller upp tassarna: en röd, en gul | Oj, oj, oj! En röd tass … och en gul tass! | förtjust mjau |
| 3 | Halvbild, katten nickar stolt, svansen vippar | Har du målat, katten? *(paus: stolt trill, nick)* | `mjau-trill` (stolt) |
| 3b ✱ | Samma, katten håller upp tassarna lite igen | Ja, vad kul! | – |
| 4 | Helbild, avtrycken på golvet, katten tittar ner på dem | Titta, röda och gula tassar på golvet! | fniss-mjau |
| 5 | Katten tittar mot handfatet | Ska vi tvätta bort färgen? *(paus: glatt mjau, nick)* | glatt mjau |
| 5b ✱ | Katten kliver upp på pallen bakom handfatet, kranen börjar rinna | Ja, bra idé! | `tass`, `kran` |
| 6 | Närbild, tassarna under vattnet, droppar. Färgen sitter kvar | Bara vatten. Plask, plask … | `kran`, `plask` mjukt |
| 7 | Samma, katten tittar på tassarna, öronen sjunker | Hm. Färgen sitter kvar. | frågande mjau |
| 8 | Katten skakar tassarna, droppar flyger, färgen kvar. Kranen stängs | Oj då. Färgen sitter visst fast. *(paus: trumpet mjau, öronen ner)* | `plupp` ×3, trumpet mjau |
| 8b ✱ | Närbild, katten tittar ner på tassarna, sedan på oss | Mm, det är inte roligt. *(paus 1 s)* Hm … vad gör vi nu? | – |
| 9 | Kritan kommer in och ritar en tvål på handfatets kant: konturen, gisspaus 3 s | Titta! Kritan ritar något. | krita-ritar |
| 10 | Tvålen fylls i, glimt. Katten tittar, öronen upp | En tvål! Varsågod, katten. | `glitter`, `mjau-ooo` |
| 10b ✱ | Närbild, katten lutar sig mot tvålen och nosar (nosen puffar), blundar. **Pausen:** mysig suck | Mm, den luktar gott! | mysig suck med spinn |
| 11 | Katten tittar på tvålen | Ska vi säga tack? *(paus 2,5 s)* | nyfiket mjau |
| 12 | Katten nickar direkt | Tack! | förtjust mjau |
| 13 | Halvbild, kranen rinner, tvålen mellan tassarna, skummet växer i tre steg | Oj! Mycket skum! | `skrubb`, `kran` |
| 14 | Närbild ansiktet: en skumtuss landar under hakan. Katten tittar ner på den | Ha ha! Ett skumskägg! *(paus: fniss-mjau)* | fniss-mjau |
| 14b ✱ | Samma, katten tittar upp på oss med skägget kvar | Jaså, det tycker du är roligt? | glatt mjau |
| 15 | Närbild röda tassen, skummet blir rosa-rött | Först den röda tassen. Tvätta, tvätta … borta! | `skrubb`, `tindra-3` på "borta" |
| 16 | Närbild gula tassen, skummet blir ljusgult | Och den gula tassen. Tvätta, tvätta … borta! | `skrubb`, `tindra-3` på "borta" |
| 17 | Halvbild, katten håller upp två rena tassar | Rena tassar! *(paus: spinn)* | `mjau-spinn` |
| 17b ✱ | Samma, svansen vippar | Oj, så fina! | – |
| 18 | Samma, katten tittar på tassarna, sedan åt vänster och höger. Fläcken på örat syns lite | Men lite blått är kvar. Katten vet inte var. | frågande mjau |
| 19 | Halvbild (örat syns), sedan efter ca 2 s klipp till närbild på örat: den blå fläcken. Skimrar svagt efter 3 s | Kan du hjälpa katten? Kan du se den blå fläcken? *(paus 5 s)* | tyst, `glimt-2` svagt när skimret börjar |
| 20 | Fläcken skimrar tydligt, örat vippar | Ja, där! På örat! | `mjau-oj`, `glimt` |
| 21 | Skumtussen svävar upp och snurrar över örat, katten blundar | Tvätta, tvätta … borta! | `skrubb`, `tindra-3` på "borta" |
| 22 | Halvbild, en röd bubbla stiger ur handfatet, sedan en gul, sedan en blå | Oj! Bubblor! | – |
| 23 | Bubblorna spricker en i taget på orden, katten tittar efter varje | En röd … en gul … och en blå. Plopp! | `pop` ×3, fniss-mjau |
| 24 | Droppar från tassarna. Handduken glider ner framför tassarna och upp | Torka, torka. Mmm … mjuk handduk. | `droppar`, mysig suck med spinn |
| 25 | Katten tittar mot den tomma väggen bredvid handfatet | Men vad har du målat, katten? *(paus: tre mjau)* | `mjau-gullig-7` (tre mjau) |
| 25b ✱ | Samma, katten tittar på väggen igen | Jaså? Får vi se? | – |
| 26 | Kritan flyger in och ritar ett papper på väggen, sedan tre tassavtryck | Titta! Kritan ritar igen. | krita-ritar |
| 27 | Papperet fylls i, avtrycken röd, gul, blå, glimt | Tassar! En röd, en gul … och en blå! | `glitter`, `mjau-ooo` |
| 28 | Halvbild, katten och målningen, katten nickar stolt, svansen vippar | Vilken fin målning! Tack, kritan! | förtjust mjau |
| 28b ✱ | Halvbild, katten tittar på oss | Var det roligt att tvätta tassarna? *(paus: glatt mjau, nick)* | glatt mjau |
| 28c ✱ | Samma, katten myser | Mm, jag tyckte också det! | – |
| 29 | Katten vinkar (armen bakom kroppen), tvålen på kanten | Hej då, katten! Hej då, tvålen! | mjau hej då |
| 30 | Samma, katten vinkar klart | Hej då! Vi ses snart! | mjau hej då |
| 31 | Kritirisen runt katten och målningen | – | – |

**Short:** uppslag 15–23 (tvätta, hitta den blå fläcken, bubblorna), ca 55 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/katten-tvattar-handerna/` (`01-kritan-ritar` …).

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[happy] Oj! En pensel!
[happy] Hej, katten! Hej, hej!
[warmly] Hur är det, katten?
[happy] Jaså, du är glad i dag!
[laughs] Oj, oj, oj! En röd tass … och en gul tass!
[curious] Har du målat, katten?
[happy] Ja, vad kul!
[chuckles] Titta, röda och gula tassar på golvet!
[cheerfully] Ska vi tvätta bort färgen?
[happy] Ja, bra idé!
[warmly] Bara vatten. Plask, plask …
[curious] Hm. Färgen sitter kvar.
[chuckles] Oj då. Färgen sitter visst fast.
[warmly] Mm, det är inte roligt.
[curious] Hm … vad gör vi nu?
[happy] Titta! Kritan ritar något.
[happy] En tvål! Varsågod, katten.
[happy sigh] Mm, den luktar gott!
[warmly] Ska vi säga tack?
[happy] Tack!
[surprised] Oj! Mycket skum!
[laughs] Ha ha! Ett skumskägg!
[chuckles] Jaså, det tycker du är roligt?
[happy] Först den röda tassen. Tvätta, tvätta … borta!
[happy] Och den gula tassen. Tvätta, tvätta … borta!
[warmly] Rena tassar!
[happy] Oj, så fina!
[curious] Men lite blått är kvar. Katten vet inte var.
[warmly] Kan du hjälpa katten? Kan du se den blå fläcken?
[happy] Ja, där! På örat!
[happy] Tvätta, tvätta … borta!
[surprised] Oj! Bubblor!
[playfully] En röd … en gul … och en blå. Plopp!
[happy sigh] Torka, torka. Mmm … mjuk handduk.
[curious] Men vad har du målat, katten?
[curious] Jaså? Får vi se?
[happy] Titta! Kritan ritar igen.
[happy] Tassar! En röd, en gul … och en blå!
[warmly] Vilken fin målning! Tack, kritan!
[warmly] Var det roligt att tvätta tassarna?
[happy] Mm, jag tyckte också det!
[happy] Hej då, katten! Hej då, tvålen!
[warmly] Hej då! Vi ses snart! [giggles]
```

45 repliker (35 + 10 samtals- och reaktionsrepliker, 2026-11-25, markerade ✱ i tabellen).

## Kattens röst och ljuden

✅ **Grind 4 godkänd 2026-11-25 (Sanna: *"Ja, bra"*): allt finns, inget nytt.** Provlyssna: `ljud/provlyssna-ljud.m4a` (1:07, varje ljud satt till −6 dBFS bara för lyssningen), tiderna i `ljud/provlyssna-ljud.txt`.

| Ljud | Rader |
|---|---|
| `mjau-gullig` 1 hej, 2 förtjust och glatt svar, 3 fniss, 4 mysig suck med spinn, 5 nyfiken, 6 trumpen, 7 pratar, 8 hej då | genom hela |
| `mjau-trill-1` (stolt), `mjau-ooo-1` (förtjust), `mjau-oj-1` (förvånad), `mjau-spinn-1` (nöjd) | 3, 10 och 27, 20, 17 |
| `tass`, `kran` (bara när vattnet rinner), `plask`, `droppar` ×3, `skrubb` (1,5 s åt gången) | 1, 5b–13, 8, 24 |
| `tindra-3` på "borta", `glimt-1` på *Ja, där!* och när något fylls i, `glimt-2` för skimret i frågans paus | 15, 16, 21, 10, 20, 27, 19 |
| `pop-1`, `-2`, `-4` på röd, gul, blå | 23 |
| `glitter`, `krita-ritar`, `skogsljud` (ritintrot), `badrumsljud-2` lågt | 01, 9, 26, 27, hela scenen |

**Används inte:** `lysmask` och `tindra-1`/`2` (platshållare enligt README), `pop-3` (tyst), och Sannas mjau-tagningar från 22/11 (`mjau-aah`, `mjau-fraga`, `mjau-glad`, `mjau-prat`), som alla 16 är nästan tysta (medel −58 till −79 dB) fast README säger topp −3 dBFS.

## Lösningar från förlagorna

Läst 2026-11-25 innan animatiken byggdes om (Sanna: *"study the similar videos and how they solve things"*). Källor: 023:s `scener/badet/index.html` och `storyboard/rader.mjs`, 020:s `scener/badet/index.html` och manus, `git log` för båda mapparna (020 rond 5–9, 023 2026-11-11). Feedbacksidan har inga poster för 020 eller 023: deras feedback kom före sidan och står som kommentarer i scenkoden.

| Handling | Vad som var svårt | Hur det löstes | Vad 057 tar |
|---|---|---|---|
| **Figuren bakom handfatet** | Benen och skuggan syntes under handfatet, pallen hamnade fel | `VID = [BX, RIM + (L.FOTTER − FATKANT) · GS]`, pallens skala räknas ur `VID` (`PALL_KS`, `PALL_HOG`), `bakom` döljer ben och skugga (023) | Samma kod. `FATKANT` 700 för katten (armarna y 532–645 syns), svansen döljs också |
| **Fläckar på tassarna** | Kladdet måste följa armen i alla poser, även klappen | Fläckarna ligger efter armarna i riggens 1024-ruta och får den synliga armbildens `transform` efter varje `rita()`; opacitet per fläck; `tassPunkt()` mäter fläckens mitt ur `getBoundingClientRect` (023 `bjorn()`, `honungIn()`) | `fargIn()` och `katt()` gör likadant med röd och gul färg. Den blå fläcken ligger i `.ear-r` och följer örat |
| **Fläcken försvinner** | *"match borta malin better to animation"* (020 rond 5) | Fläcken bleknar till 70 % medan tussen gnider och är borta **exakt på ordet**, med en skumpuff (`pop`) i samma ögonblick. Ordets tid mäts i repliken (`REN`/`BORTA`) | `BORTA` 26/27/33 mätta med silencedetect och whisper; samma 70 %-blekning och puff |
| **Gnugga** | En egen kodarm med tvål *"flyger i luften"* och såg ut som ett sugrör (020 rond 8) | 023: ingen egen arm. Riggens **klapp** framför magen, en lugn vridning ±6° (`klapp(1.11 + 0.025·sin)`), skumtussen snurrar på fläcken. Ansiktet tvättas med **bara tussen**, armen når inte dit | Klappen för tassarna; örat tvättas med bara tussen (rad 21) |
| **Skummet** | Skummet försvann för tidigt (020 feedback 14/11) | Skummet längs läppen växer under tvätten och ligger kvar resten av scenen (`skum: 0.6–1`) | Skummet ligger kvar från rad 13 till hej då |
| **Tvålen ritas** | Kritan täckte den lilla konturen; konturen blev en lila andra kant | Egen nära bild `K_TVAL` (zoom 3,2), mindre krita (`kritaS 0.18`), konturen tonas bort medan tvålen fylls i (023 rad 6a–6b) | Rad 9–10 i nära bild som 023 |
| **Kranen** | Bildens kran såg grov ut; vattnet lät hela tiden | Kranen maskas och ritas om i kod (`KRANBILD`), strålen vickar och skumkransen pulserar där den möter handfatet; kranen rinner **bara medan tassarna tvättas**, tre sista droppar faller när den stängs (`droppar()`) | Rinner i rad 5b–7 (bara vatten) och 13–16; stängs i rad 8 och efter rad 16 med tre droppar |
| **Handduken** | *"improve towel animation"* (023) | Handduken lyfts av kroken, glider i en båge till tassarna, gnider vänster–höger två gånger och tillbaka till kroken där den gungar till; lägre, så att munnen syns (`handdukFlyg()`, QA 11/11) | Rad 24 kopierar `handdukFlyg()`; handduken hänger på kroken från början, kritan ritar den inte |
| **Blöta tassar** | – | Droppar faller från fläckarnas punkter på fasta tider, med `plupp` på samma tider (`TASSDROPP`, `tassDroppar()`) | Rad 8 (skakar) och 24, samma teknik |
| **Ansiktet** | *"more expressions, not just closed eyes"* (020) | Glada ansikten har öppna ögon; blunda bara där raden ber om det (`glad: [1, 1]`) | Samma `F()`/`ANS()` |
| **Kameran** | Zoomar kändes oroliga (020 *"do cuts instead"*); för långt ifrån fläcken (023 *"zoom in on nose"*) | Bara klipp mellan fasta kameror; fläcken i ansiktet får en egen nära bild (`K_NOS` zoom 4,6) | Bara klipp; örat får en egen nära bild (rad 19b–21) |
| **Tack** | – | Figuren blir glad och nickar **på ordet** *"Tack!"* (023 rad 7) | Rad 12 |
| **Ljuden** | *"turn down bathroom soundtrack"*, *"turn down bear sounds"* (023) | Badrumsljudet −6 dB, figurens ljud lägre med uttoning; fniss högst 3–4 gånger och aldrig på rader i följd | Badrumsljudet lågt, fniss-mjau på rad 4, 14 och 23 |

**Inget går genom något (CLAUDE.md):** strålen slutar vid tassarna när de är under den (rad 6), annars vid läppen. Handduken glider framför katten men bakom handfatets kant (lagret `mellan`). Tvålen ligger på läppen, inte i den. Skumtussen ligger framför örat. Kritan ritar målningen på väggen bredvid katten, och papperet överlappar inte katten. Täta bilder (6 per sekund) runt rad 6, 13, 21 och 24 i QA.

**Kopieras till scenen (grind 6):** från 023 `scener/badet/index.html`: `kamera()`, `badrum()` med `KRANBILD`, `kran()`, `droppar()`, `tuss()`/`skum()`, `skimmer()`, `tval()` med `ritad`/`fyll`, `ritKrita()`/`kritaVanta()`, `handdukFlyg()`, `tassDroppar()`, `bjorn()` → `katt()`, `tassPunkt()`/`tassMitt()`, `klapp()`, `vink()`, `oronVipp()`, `hopp()` (upp på pallen) och irisen. Kritan i ritintrot, tvålen och målningen går genom `verktyg/kritan-ritar.js` (regeln från 052), inte 023:s egen kritkod.

## Regelkoll

- [x] 1 figur, 1 plats (badrummet)
- [x] Inga djurnamn: "katten", "tvålen", "kritan"
- [x] Aldrig *"Vad kan det vara?"* eller *"Vad säger man?"*. Ritintrot: *"Hm … vad blir det nu?"*, tacket: *"Ska vi säga tack?"*
- [x] Ritintrot ritar en sak ur berättelsen (penseln), inte katten
- [x] Inga uppmaningar att göra något med kroppen. Barnets del: gissa teckningen, säga tack, **leta efter den blå fläcken**
- [x] Ny sorts problem: **färgen sitter fast** (inte "vill inte"). Katten vill tvätta, vattnet räcker inte, kritan ritar det som behövs
- [x] Tema subtilt: färgerna sägs bara som det som syns (*"den röda tassen"*, *"lite blått"*), ingen fråga om färger
- [x] *"Varsågod"* och *"Tack!"*, och *"Tack, kritan!"* efter målningen
- [x] Samma fras tre gånger: *"Tvätta, tvätta … borta!"* (röd tass, gul tass, örat), den tredje med barnets hjälp
- [x] Bilden på orden: färgen borta på *"borta"*, bubblorna spricker på *"röd … gul … blå"*, skägget syns före *"skumskägg"*
- [x] Kritan ritar två gånger: tvålen (löser problemet) och målningen (vändningen: där kom färgen ifrån)
- [x] Fniss högst 3–4: rad 4, 14, 23 (+ giggles i sista repliken)
- [x] Tydligt hej och hej då, med vinkning. Inget läskigt: ingen tvål i ögonen, färgen är rolig, inte ett misstag
- [x] Ingen ny musik
- [x] 2 nya saker (penseln, målningen)
- [ ] Avsteg som receptet redan har: ingen sång, fler än 6 utsnitt
- [ ] Avsteg mot receptets "tre frågor till barnet": här två (tack 2,5 s, blå fläcken 5 s) plus gisspausen i ritintrot och vid tvålen, enligt 25/11-regeln att barnet letar i stället för att göra

## Öppet

1. **Nära 023 och 025** (samma badrum och handfat; 025 är också katten vid handfatet). Lägg inte 023, 025 och 057 efter varandra på kanalen.
2. **"Händerna" eller "tassarna"?** Titeln säger *händerna* (det föräldrar söker på), replikerna *tassen*, som i 023.
3. **Kritans andra teckning** är målningen (tre tassavtryck), inte en handduk som i 023, så att vändningen blir en ny. Handduken hänger på kroken från början. Säg till om du hellre vill ha en annan andra teckning eller ingen.
4. **Målningens blå avtryck:** katten har ingen blå tass när den kommer in. Tanken är att den blå tassen redan torkats och att lite blått hamnade på örat. Små barn lär inte fundera på det, men alternativet är att målningen visar *"en röd tass, en gul tass … och en blå fläck"*.
5. **Den blå fläcken** måste synas men vara liten mot den svarta katten: blått på det inre, ljusare örat, prova i första stillbilden. Örat ska vara mot kameran i rad 18–20.
6. **Katten bakom handfatet:** 025 har kanske redan uppställningen (katten, handfatet, pallen). Kolla 025:s scen innan scenen byggs.
7. **Längden:** ca 31 uppslag, sikta på 3:45–4:15 genom reaktionsslag och närbilder, inte segare rörelser.

## Saker: finns och nya

**Finns i `rekvisita/` (används som de är):**

| Sak | Fil | Roll |
|---|---|---|
| Handfatet | `rekvisita/handfatet.md`, `assets/rekvisita/handfatet/cut/handfatet.png` | katten står bakom det |
| Tvålen | `rekvisita/tval.md` (i kod) | kritan ritar den, rad 9–10 |
| Pallen | `rekvisita/pall.md` | katten kliver upp på den |
| Handduken | `rekvisita/handduk.md` | hänger på kroken, torka i rad 24 |
| Badrummet | `bakgrunder/badrummet.md` | platsen |

**Nya (görs med Sanna på grind 2, inget skapat än):**

| Sak | Hur | Roll |
|---|---|---|
| **Penseln** | Flow-bild (4 tagningar, handfatet och tvålen som stilreferens): kort barnpensel sedd från sidan, ljust träskaft, silvergrå hylsa, rund spetsig tofs med röd färg. Plus en kontur som kritan kan rita (skaft, hylsa, tofs) | ritintrot |
| **Målningen** | i kod, ingen bild: ett vitt papper med lite krämvit ton och vit kant, tre tassavtryck (samma form som golvavtrycken) i rött, gult, blått. Får ändå en `rekvisita/malningen.md` med mått och färger | kritans andra teckning, rad 26–28 |

I kod utan egen rekvisitafil (som lerfläckarna i 020): färgen på tassarna, den blå fläcken, golvavtrycken, skummet i färg, skumskägget, de tre färgade bubblorna.
