# Avsnitt 063 – Hösten i boken (plan)

**Status:** ✅ grind 1 (manus) godkänd av Sanna 2026-11-27 (*"Ja, grind 1 godkänd för 063 med dina förslag i Öppet"*). Samma dag ändrade Sanna figuren från igelkotten till **räven**. Hon skrev också om replikerna: tittut stryks, *"Hopp!"* utan *"prassel"*, *"Löv på huvudet!"*, ekorren kommer fram vid ekollonen och svampen är giftig. Replikblocket nedan är hennes text, putsad. Sanna bad sedan om mer att gissa, lite pedagogik och ett lugnt tempo, så det är också inarbetat (se *Gissa, lära, lugnt*). Grind 2 (rekvisita) klar, se [`bildlista.md`](bildlista.md). ✅ **Grind 3 (rösten) godkänd av Sanna 2026-11-27** (*"Yes, approved"*) med tagning 1 och omtagningen av 07, 08, 11, 28 och 30. Replikerna ligger i `assets/ljud/roster/hosten-i-boken/` (49 filer). Grind 5 (storyboarden) gjord 2026-11-27 i [`storyboard/`](storyboard/storyboard.md): 43 stillbilder i three.js-boken, kontaktark och animatik (3:48). ✅ **Grind 5 godkänd av Sanna 2026-11-27** (*"Approved"*), med längden 3:48 som den är. Nästa: grind 6, scenen i `scener/boken/`. Andra avsnittet i **Kritans bok** (receptet `format/kritans-bok.md`, temabladets rad **Höst**, förlagan `avsnitt/062-sommaren-i-boken/`). Ingen sång. Malin pratar med räven, och räven svarar med sina ljud, ögon, öron, svans och små hopp.

| | |
|---|---|
| **Titel** | Hösten i boken (avsnitt 63) |
| **Figurer (2)** | **Räven** ([`karaktarer/raven-rut.md`](../../karaktarer/raven-rut.md), ✅ referensark klart, låst), v2-rigg i `assets/karaktarer/raven-rut/premium/uttryck.html` med tunna kanter i `cut-tunn/`. Riggen ritas på rävens kort som grodan i 062. Stor tvåbent figur med öron och yvig svans som viftar. **Ekorren** är statist: ett platt kort (`assets/rekvisita/ekorre-orange/cut/ekorre-orange.png`, sittande, från sidan) som poppar upp vid eken och gör små skutt |
| **Platser (1)** | **Höstuppslaget i Kritans bok**: skrivbordet med boken, och inne i boken himlen på pärmen, höstkullarna, granarna, eken mitt i, lövhögen, stubben och marken med löv. Inget platsbyte |
| **Bokens pärm** | **brun** (ca `#8A5A34`), siluetten är **det orange lövet** (temats huvudsak) |
| **Kärna** | Boken öppnas och det är höst, men trädet är kalt. Kritan ritar ett stort orange löv på en gren, och trädet fylls av höstlöv som sedan faller sakta. Räven kommer upp: *"Hej, räven!"* Det börjar blåsa, och räven fryser. Kritan ritar en halsduk: *"Varsågod!"* – *"Tack, kritan!"* Sedan hoppar räven i lövhögen: *"Hopp!"*, två gånger, och kommer upp med löv på huvudet. Barnet tittar efter löven på marken (rött, gult, brunt) och ekollonen, och ekorren kommer fram, för den tycker om ekollon. Sist poppar en svamp upp, en giftig svamp som man bara tittar på. Hej då, och boken stängs. |
| **Samtal** | Malin pratar med räven, räven svarar med `rav-gullig` i pausen, Malin reagerar kort. Raderna markerade ✱ |
| **Barnet** | gissar kritans två teckningar (lövet, halsduken), tittar efter tre löv på marken och tre ekollon under eken (de syns hela tiden, inget är gömt) |
| **Favoriter** | 🦊 räv · 🍂 löv · 🧣 halsduk · 🌰 ekollon · 🐿️ ekorre · 🍄 svamp |

## Uppslaget – korten

Bakifrån och fram, i den ordning de fälls upp. **Finns** = befintlig bild, **ny** = Sanna gör den i Flow (prompterna i `bildlista.md`), **kod** = ritas i kod.

| Kort | Bild | Finns? |
|---|---|---|
| Himlen på pärmens insida | `produktion/three-rum/popupbok/bilder/himmel.png`, svalare och lite blekare i kod (höstljus) | finns + kod |
| Molnen | `popupbok/bilder/moln-stor.png`, `moln-mellan.png`, `moln-liten.png`, glider fortare när det blåser | finns |
| Kullarna bak och fram | höstfärgade versioner av `popupbok/bilder/kulle-bak.png` och `kulle-fram.png` (ockra och olivgrönt gräs, små orange prickar) | **ny** (Flow edit, samma form) |
| Granarna, två–tre vid kanterna | `assets/bakgrunder/skogen-gron-saker/gran.png` | finns |
| **Eken**, stor, mitt i–vänster: först kal, sedan full av höstlöv | `ek-kal.png` och `ek-host.png`, två Flow-edits av `assets/rekvisita/ek/cut/ek.png` med samma stam och samma plats | **ny** (2 edits) |
| Ett gult lövträd längre bak | Flow-edit av `assets/bakgrunder/skogen-saker/trad.png` med gul krona | **ny** |
| Stubben, höger | `assets/rekvisita/stubbe/cut/stubbe.png` (kanten 1,0 %, orörd) | finns |
| **Lövhögen**, höger fram | `popupbok/bilder/lovhog.png` (kopia av `skogen-saker/lovhog.png` med tunnad kant), delad i kod i en bakre och en främre halva så att räven kan sjunka ner i den | finns + kod |
| Marken | gräsarket i `kritYta`, ockrabrunt med gröna fläckar | kod |
| **Tre löv på marken** (rött, gult, brunt), utspridda och platta: ett vid eken, ett mitt fram, ett vid stubben | ur det nya lövarket (`lov-rott`, `lov-gult`, `lov-brunt`) | **ny** (ett Flow-ark) |
| **Tre ekollon** under eken, i gräset | `popupbok/bilder/ekollon.png` (tunnad kopia), små | finns |
| **Ekorren**, bakom ekens stam, nedfälld tills rad 35 | `assets/rekvisita/ekorre-orange/cut/ekorre-orange.png` (kanten 0,7 %) | finns |
| Rävens kort, mitt fram, upp efter löven | v2-riggen | finns |
| **Svampen**, vid stubben: halvt uppfälld så att den röda hatten syns lite från rad 18, och helt uppfälld på *"En svamp!"* (rad 40) | `popupbok/bilder/svamp.png` (kopia av `skogen-gron-saker/svamp.png`, nedskalad och kanten 1 %) | finns |
| Fallande löv, hela tiden efter rad 09, lövyran och löven på huvudet | ritas i kod i fyra former med kritfyllning, vit kant och boil (se *Ritas i kod* i `bildlista.md`), faller långsamt i en svajande bana och lägger sig **på** sidan | kod |
| Vinden (rad 11–19) | några vita kritkrumelurer som glider över bilden, molnen fortare, korten vajar lite | kod |
| **Kritans teckning 1: det orange lövet** | `lov-orange`, ritas på eken. Också pärmens siluett | **ny** (Flow) + kontur (grind 2) |
| **Kritans teckning 2: halsduken** | `assets/rekvisita/halsduk/cut/halsduk-bok.png` (röd och vit, från 038, kanten tunnad till 1 % för boken) | finns + kontur (grind 2) |

**Nya saker enligt `format/regler.md`:** en (löven: det orange och arket med rött, gult och brunt). Eken, kullarna och lövträdet är landskapskort (receptets grind 2). Halsduken, ekollonen, svampen, stubben, lövhögen och ekorren finns redan. Vinden och de fallande löven är pynt i kod.

## Så rör det sig

Alla rörelser börjar före Malins replik (0,4–0,8 s in eller när de har landat), utom frågorna, som kommer först. Kameran glider mellan närliggande vyer och klipper när platsen i boken byts (receptet). Varje rad har reaktionsslaget `GLES` 0,9 s i slutet.

| Rörelse | Hur |
|---|---|
| Boken öppnas | som 062: kameran driver mot den bruna boken med lövets siluett, pärmen slås upp (0,9 s), korten fälls upp bakifrån och fram (ca 0,8 s). **Eken står kal.** Rävens kort, ekorren och svampen ligger kvar nedfällda. `prassel-tyg` |
| Kritan ritar lövet | kritan (× 1,25 i närbild, via `verktyg/kritan-ritar.js`) ritar lövets kontur på en av ekens grenar, sedan 2–6 detaljstreck (skaftet, mittnerven, sidonerverna). Gisspaus 3 s, kritan svajar. Lövet fylls i inifrån, `glitter` |
| Trädet fylls | **på "Så många löv!"**: kronan växer ut från det ritade lövet i en växande cirkel (kritans fyllning), `ek-kal` tonas över till `ek-host`, `tindra`. Det ritade lövet ligger kvar i kronan |
| Löven faller | från rad 08: några löv lossnar ur kronan ett i taget och singlar ner i en lugn svajande bana (ca 4 s per löv), lägger sig på marken och ligger kvar. Högst 3 i luften samtidigt |
| Rävens kort fälls upp | med en liten efterstudsning, `pop`. Räven vinkar (riggens vink, armen ut förbi kanten), svansen viftar |
| Nu är det höst | räven tittar upp på ett fallande löv som singlar förbi, öronen följer efter |
| Det blåser | på *"Nu blåser det!"*: vindkrumelurer över bilden, fler löv i luften (högst 5), molnen fortare, korten vajar ±2°. Rävens öron fladdrar bakåt, räven blundar och lutar sig lite bakåt. `vind` lågt |
| Fryser | räven darrar lätt (±1,5 px, 8 Hz, i 1 s), armarna in mot magen, svansen lindad runt benen, liten andningspuff i kod. Ingen ledsen min, bara besvärad. Kinderna rosigare |
| Kritan ritar halsduken | på gräset bredvid räven: kontur, sedan ränderna och tofsarna som detaljstreck. Gisspaus 3 s. Fylls i, kortet fälls upp med `pop`. Räven ser den, stora glada ögon |
| Halsduken på | kortet fälls ner, halsduken glider i en båge till räven och lägger sig runt halsen under kindbandet (ett eget lager i riggen, följer kroppens gungning). Den hängande änden åt det håll räven inte tittar. Darrandet slutar och svansen viftar igen **på "Så där!"** |
| Mjuk och varm | räven trycker nosen ner i halsduken, blundar, mysig suck |
| Hopp | räven hukar och gör ett lugnt hopp i en båge in i lövhögen. **På "Hopp!"** sjunker den ner bakom högens främre halva så att bara huvudet, öronen och svansspetsen syns, löven yr upp (8–10 löv ritade i kod) och singlar ner igen, `hostlov`. Andra hoppet: upp ur högen och ner igen |
| Löv på huvudet | räven kliver ut ur högen med tre små löv på huvudet och mellan öronen (ritade i riggen, följer huvudet). Den tittar upp mot dem, skakar lugnt (±4°), ett löv faller av och de andra sitter kvar. `rav-fniss` |
| Barnet tittar efter löven | hela uppslaget. Barnet tittar 3 s. Sedan studsar och glimtar varje löv på marken **på sitt färgord** (rad 28–30), `glimt` |
| Ekollonen | samma: barnet tittar 3 s, sedan glimtar ekollonen ett i taget **på "Ett, två, tre!"**. Räven går dit (riktningsposen, speglas aldrig) och luktar: nosen ner, blundar, `nos` |
| Ekorren | rad 37: ekorrens svansspets syns bakom ekens stam (ett litet kort, rör sig lite). **På "Titta, där är den ju!"** fälls ekorrens kort upp bredvid stammen med `pop`, den gör två små skutt fram till ekollonen, tar ett och skuttar tillbaka. **På "Hej, ekorren!"** gör den ett glatt skutt, och räven vinkar |
| Svampen | svampens kort fälls upp **på ordet "svamp"** med `pop`, vid stubben. Räven vänder sig dit. På *"Den ska man inte äta"* skakar räven lugnt på huvudet, och på *"titta på den"* lutar den sig fram och tittar med stora ögon. Ingen rädd min |
| Hej då | räven vinkar i en närmare vy, sedan en kort bild per sak som nämns: ekorren (skuttar), lövträdet (löven glimtar), lövhögen (prasslar lite), svampen (studsar). Räven vinkar klart |
| Boken stängs | kameran glider ut, korten fälls ner framifrån (räven först, sedan ekorren), pärmen slås igen och lövets siluett syns. `prassel-tyg`, `landa-mjuk` |

**Lugnt tempo:** rörelserna är 20–30 % långsammare än i 062. Lövet faller på ca 4 s, kameran glider på 2–3 s och räven går i stället för att skutta. `GLES` är 1,1 s, och en rad med en färg eller ett tal får 0,5 s extra innan nästa. Vinden blåser som mest 3 s och lägger sig sedan. Mattan är mjuk: `skogsljud` 0,25 och vinden svag. Pausen före Malins svar på en gissning är alltid 3 s, inte kortare.

**Inget går genom något:** löven som faller lägger sig **på** sidan och på korten, aldrig genom dem. Räven sjunker ner **mellan** lövhögens två halvor (som i en riktig lövhög), aldrig genom marken. Halsduken ligger **på** halsen, framför kroppen och under nosen. Löven på huvudet ligger ovanpå huvudet. Ekorren kommer fram **bakom** stammen och skuttar på marken. Korten fälls ner åt samma håll, det som reste sig först ligger överst, och pärmen slås igen först när allt ligger platt. Täta bilder (6 per sekund) i QA runt bildraderna 01b, 04–06, 07, 11, 13, 16–17, 21b, 22 och 26.

## INTRO

Lilla Kritans logotyp 1 s, sedan skrivbordet med den stängda bruna boken (receptet). Inget *"Djuren hittar på!"* och inget ritintro på papper.

## BOKEN

| # | Bild (en rörelse) | Malin säger | Räven svarar, ljud |
|---|---|---|---|
| 01a | Helbild, skrivbordet: den bruna boken med lövets siluett, kameran driver mot den | Titta! En bok. | matta lågt, `glimt` |
| 01b | Pärmen slås upp, korten fälls upp, kameran glider in | Oj! Det är höst i boken! | `prassel-tyg`, `pop` mjukt |
| 02 | Halvbild mot eken. Den är kal, molnen glider | Titta, trädet. Men var är löven? | – |
| 03 | Närbild: kritan kommer in och ritar lövets kontur på en gren, svajar sedan | Kritan ritar … *(paus)* Vad blir det nu? *(paus 3 s)* | `krita-ritar` |
| 04 | Lövet fylls i och glimtar | Oj! Ett löv! | `glitter` |
| 05 | Kameran glider långsamt ut till halvbild: kronan fylls av röda och gula löv på *"Så många löv."* | Så många löv. På hösten blir löven röda och gula. | `tindra` mjukt |
| 06 | Samma, ett löv lossnar uppe i kronan och singlar ner till marken, sedan ett till | Och sedan faller de ner … sakta, sakta. | `prassel-lov` svagt |
| 07 | Halvbild, rävens kort fälls upp mitt fram. Räven vinkar | Hej, räven! Hej, hej! | `pop`, `rav-gullig-1` (hej) |
| 07b ✱ | Samma, räven tittar upp på ett fallande löv och följer det med blicken ner till marken. **Pausen:** förtjust | Räven, nu är det höst. *(paus: förtjust)* | `rav-gullig-2` |
| 08 | Bred bild: vinden kommer, löven yr, molnen fortare | Oj! Nu blåser det! | `vind`, `prassel-lov` |
| 09 | Närbild, räven darrar, armarna in, andningspuff | Brr. Räven fryser. | `rav-gullig-6` (frusen) |
| 09b | Samma, räven tittar på oss | Hm … vad gör vi nu? | `rav-gullig-5` (nyfiken) |
| 10 | Kritan kommer in och ritar en halsduk på gräset bredvid räven, långsamt, svajar sedan | Titta, kritan ritar något varmt … *(paus)* Vad blir det? *(gisspaus 3 s)* | `krita-ritar` |
| 11 | Halsduken fylls i, kortet fälls upp. Räven ser den, stora glada ögon | En halsduk! Varsågod, räven. | `glitter`, `pop`, `rav-gullig-2b` |
| 12 | Närbild, räven nickar | Tack, kritan! | `rav-gullig-7` (pratar) |
| 13 | Halvbild: halsduken glider långsamt till räven och lägger sig runt halsen, darrandet slutar på *"Så där."* | Räven tar på sig halsduken. Så där. | `swoosh` mjukt, `prassel-tyg` |
| 13b ✱ | Närbild, nosen ner i halsduken, blundar. **Pausen:** mysig suck. Sedan en svag vindkrumelur förbi, och räven sitter kvar varm | Är halsduken mjuk och varm? *(paus: mysig suck)* Mmm. Vinden är kall, men halsduken är varm. | `rav-gullig-4`, `vind` svagt |
| 15 | Halvbild, räven vänder sig mot lövhögen | Titta, en stor lövhög. | – |
| 15b ✱ | Samma, räven tittar på oss. **Pausen:** förtjust, nick | Ska du hoppa i löven? *(paus: förtjust, nick)* Ja, bra idé! | `rav-gullig-2c` |
| 16 | Halvbild: räven hoppar in i lövhögen, löven yr på *"Hopp!"* | Hopp! | `hopp-mjuk`, `hostlov` |
| 16b | Samma, en lugn paus, sedan upp ur högen och ner igen | En gång till … hopp! | `hopp-mjuk`, `hostlov` |
| 17 | Närbild: räven kliver ut med löv på huvudet, skakar lugnt, ett faller av | Ha ha, löv på huvudet. | `rav-fniss` |
| 18 | Halvbild, räven tittar runt | Vad mer finns på hösten? | `rav-gullig-5b` |
| 19 | Hela uppslaget. Barnet tittar (3 s) | Ser du några löv på marken? *(paus 3 s)* | tyst |
| 19b | Samma. Varje löv studsar lugnt och glimtar på sitt färgord, med en paus mellan | Ett rött löv. Ett gult löv. Och ett brunt löv. | `glimt` per löv |
| 20 | Halvbild mot eken. Barnet tittar (3 s) | Och ser du ekollonen? *(paus 3 s)* | tyst |
| 20b | Närbild, ekollonen glimtar ett i taget på talen, med en paus mellan varje | Där är ekollonen. Vi räknar. Ett … två … tre. | `glimt` per ekollon |
| 21 | Halvbild: räven går långsamt till ekollonen och tittar på dem | Vad fina ekollon. | `rav-gullig-4b` |
| 21b | Närbild, räven luktar, nosen ner, blundar | Mmm … de luktar skog. | `nos`, mysig suck |
| 21c | Halvbild mot ekollonen och ekens stam. Ekorrens svans syns lite bakom stammen (aldrig gömd) | Ekorren tycker om ekollon. Den samlar dem till vintern. | – |
| 21d | Samma: ekorrens kort fälls upp bredvid stammen på *"Titta"* med `pop`, två små skutt fram till ekollonen, den tar ett och skuttar tillbaka till stammen. Räven vinkar till den på *"Hej, ekorren"* | Titta, där är den ju! Hej, ekorren! Hej, hej! | `pop`, `hopp-mjuk` litet, `rav-gullig-1b` |
| 22 | Halvbild mot stubben: svampens röda hatt syns lite över gräset från rad 18 (kortet halvt uppfällt, aldrig gömt). Barnet gissar (3 s) | Titta, vid stubben. Vad växer där? *(gisspaus 3 s)* | – |
| 22b | Svampens kort fälls upp helt på *"svamp"* med `pop`. Räven vänder sig dit, svampen studsar lite | En svamp! En röd svamp med vita prickar. | `pop` |
| 22c | Halvbild, räven skakar lugnt på huvudet, sedan lutar den sig fram och tittar | Den är giftig. Den ska man inte äta. Men man kan titta på den. | `rav-gullig-7b` |
| 23 ✱ | Närbild, räven tittar på oss | Var det en fin höstdag, räven? *(paus: förtjust, nick)* | `rav-gullig-2d` |
| 24 | Närmare halvbild, räven vinkar lugnt (armen ut förbi kanten) | Hej då, räven! | `rav-gullig-8` (hej då) |
| 24b | Ekorren skuttar | Hej då, ekorren! | `glimt` |
| 24c | Eken, löven glimtar | Hej då, löven! | `glimt` |
| 24d | Lövhögen, den prasslar lite | Hej då, lövhögen! | `prassel-lov` |
| 24e | Svampen studsar | Hej då, svampen! | `glimt` |
| 25 | Halvbild, räven vinkar klart | Hej då! Vi ses snart! | `rav-gullig-8b` |
| 26 | Kameran glider ut ur boken. Korten fälls ner, räven först, pärmen slås igen | – | `prassel-tyg`, `landa-mjuk` |

(Rad 14 och 14b, tittut, är strukna av Sanna. Numren står kvar så att raderna stämmer med den förra planen.)

**Längd:** 49 röstfiler och ca 40 bilder. Uppskattat 3:05–3:20 med det lugna tempot (`GLES` 1,1 s, tre gisspauser och två tittpauser på 3 s). Det är i överkanten av receptets spann. Receptet siktar på 2:30–3:15.

**Short:** uppslag 15–17 (lövhögen) och 20–21d (ekollonen och ekorren), ca 40 s.

## Malins repliker att klistra in (ElevenLabs)

Malin – Professional Swedish Narration, Eleven v3, stability 0,5, similarity 0,75. Ett block, en tagning. Filerna hamnar i `assets/ljud/roster/hosten-i-boken/` (`01-titta-en-bok` …). Listan till `dela-tagning.py` är [`rost.txt`](rost.txt). Det här är Sannas text från 2026-11-27, putsad (se *Putsningen* under blocket) och omgjord för gissning, pedagogik och lugnt tempo (se *Gissa, lära, lugnt*).

```
[warmly] Titta! En bok.
[happy] Oj! Det är höst i boken!
[curious] Titta, trädet. Men var är löven?
[warmly] Kritan ritar …
[curious] Vad blir det nu?
[happy] Oj! Ett löv!
[warmly] Så många löv.
[warmly] På hösten blir löven röda och gula.
[warmly] Och sedan faller de ner … sakta, sakta.
[happy] Hej, räven! Hej, hej!
[warmly] Räven, nu är det höst.
[surprised] Oj! Nu blåser det!
[warmly] Brr. Räven fryser.
[curious] Hm … vad gör vi nu?
[warmly] Titta, kritan ritar något varmt …
[curious] Vad blir det?
[happy] En halsduk! Varsågod, räven.
[happy] Tack, kritan!
[warmly] Räven tar på sig halsduken. Så där.
[curious] Är halsduken mjuk och varm?
[happy sigh] Mmm. Vinden är kall, men halsduken är varm.
[warmly] Titta, en stor lövhög.
[cheerfully] Ska du hoppa i löven?
[happy] Ja, bra idé!
[playfully] Hopp!
[warmly] En gång till … hopp!
[chuckles] Ha ha, löv på huvudet.
[curious] Vad mer finns på hösten?
[curious] Ser du några löv på marken?
[warmly] Ett rött löv.
[warmly] Ett gult löv.
[warmly] Och ett brunt löv.
[curious] Och ser du ekollonen?
[warmly] Där är ekollonen. Vi räknar. Ett … två … tre.
[warmly] Vad fina ekollon.
[happy sigh] Mmm … de luktar skog.
[warmly] Ekorren tycker om ekollon. Den samlar dem till vintern.
[happy] Titta, där är den ju! Hej, ekorren! Hej, hej!
[curious] Titta, vid stubben. Vad växer där?
[happy] En svamp! En röd svamp med vita prickar.
[warmly] Den är giftig. Den ska man inte äta.
[warmly] Men man kan titta på den.
[warmly] Var det en fin höstdag, räven?
[warmly] Hej då, räven!
[warmly] Hej då, ekorren!
[warmly] Hej då, löven!
[warmly] Hej då, lövhögen!
[warmly] Hej då, svampen!
[warmly] Hej då! Vi ses snart! [giggles]
```

**Gissa, lära, lugnt (Sanna 2026-11-27: *"make sure there are some guessing element and some pedadgic touches, and calm"*):**

- **Tre gisspauser på 3 s**, där barnet hinner gissa innan Malin säger svaret. Den första är lövet (*"Kritan ritar … Vad blir det nu?"*). Den andra är halsduken, med en ledtråd: *"Titta, kritan ritar något varmt … Vad blir det?"*. Den tredje är svampen: dess röda hatt syns lite vid stubben från rad 18, *"Vad växer där?"*, och kortet fälls upp på *"En svamp!"*. Inget är gömt, och ingen replik är *"Vad kan det vara?"*.
- **Pedagogik som Malin säger en gång och bilden visar:**
  - Årstiden: *"På hösten blir löven röda och gula. Och sedan faller de ner … sakta, sakta."*
  - Ekorren *"samlar dem till vintern"* och bär ett ekollon till stammen.
  - Motsatspar: kall och varm (*"Vinden är kall, men halsduken är varm."*), upp och ner (löven faller ner, räven hoppar upp och ner i lövhögen) och stor (*"en stor lövhög"*).
  - Färgorden: rött, gult och brunt.
  - Räkna till tre: *"Vi räknar. Ett … två … tre."*
- **Lugnt:**
  - Inga utrop i rad. Färgorden, räkningen, *"Så många löv."*, *"Så där."*, *"Ha ha, löv på huvudet."* och svampens varning sägs lugnt med punkt, och utropen ligger glest.
  - Det andra hoppet kommer efter en paus (*"En gång till … hopp!"*). Hej då är `[warmly]` hela vägen.
  - Rörelserna är långsamma (se *Lugnt tempo* under *Så rör det sig*).

**Putsningen (mot Sannas text 27/11):**
- *"det är höst!"* blev *"Nu är det höst, räven!"*, så att det inte låter som rad 02 och så att repliken vänder sig till räven.
- *"Hopp … !"* blev *"Hopp!"*, eftersom ElevenLabs läser en tom paus före utropstecknet konstigt. Prasslet hörs som ljud (`hostlov`).
- *"dom gillar ekorren att äta hej hej ekorren"* blev två repliker: *"Ekorren tycker om att äta ekollon."* och *"Hej, ekorren! Hej, hej!"*. *"Mmm … de luktar skog."* flyttades före ekorren, så att räven luktar på ekollonen innan ekorren kommer.
- *"den ska man inte äta, den är giftig, men man kan titta på den"* blev korta meningar: *"Den är giftig. Den ska man inte äta."* och *"Men man kan titta på den!"*.
- *"Hej då, ekorren!"* lades till, eftersom receptet säger hej då till varje sak som varit med.

Ord som mäts i tagningen: *"löv"* i 07 (kronan fylls), *"ner"* i 09 (lövet når marken), *"blåser"* i 12 (vinden), *"Så där"* i 19 (darrandet slutar), *"hopp"* i 25 och 26 (`HOPP`), färgorden i 30–32, *"Ett … två … tre"* i 34, *"Titta"* i 38 (ekorren kommer fram), *"svamp"* i 40.

## Tagning 1 (grind 3, 2026-11-27)

Sannas tagning i ElevenLabs (v3, s50, 153 s) ligger i `ljud/malin-tagning-1.mp3`. Den är delad med `verktyg/dela-tagning.py` i 49 filer i `ljud/tagning-1/` (flyttade till `assets/ljud/roster/hosten-i-boken/` 2026-11-27, när tagningen godkändes). Gränsen mellan 28 och 29 hamnade fel och är klippt om för hand (28 slutade med *"Ser du några löv på"*). QA:s koll av röstfilerna hittar inga filer som börjar eller slutar mitt i ett ord.

**Bra:** 01–06, 09, 10, 12–27, 29, 31–49. Whisper hör *"Äckorren"*, *"krytan rytar"*, *"e-kolonen"* och *"ekollen"*, men det är vanligt svenskt uttal och whisper som stavar fel. *"Ha ha"* i 27 finns med. **Rad 38 har ett tillägg:** *"Titta, där är den ju! Hej, ekorren! Hej, hej!"* (5,8 s). Det passar bra när ekorren kommer fram, så det får vara kvar. Bilden räknar med den längre repliken.

**Behöver ny tagning:**
- 07 *"Så många löv."* hörs som *"Som många löv"*.
- 08 och 28 *"hösten"* hörs som *"hästen"*. Det hörs så även när whisper får *"hösten"* som ledtråd, medan *"höst"* i 02, 11 och 43 hörs rätt.
- 11 *"Nu är det höst, räven."* går ihop till *"hösträven"*, med bara 0,06 s paus vid kommat. Den nya texten är *"Räven, nu är det höst."*
- 30 *"Ett rött löv."* hörs som *"Ett rätt löv"*, också med ledtråd.

Gör gärna 3–4 tagningar av blocket och välj den där ö:et låter tydligast:

```
[warmly] Så många löv.
[warmly] På hösten blir löven röda och gula.
[warmly] Räven, nu är det höst.
[curious] Vad mer finns på hösten?
[warmly] Ett rött löv.
```

**Tagning 2 (2026-11-27):** Sannas omtagning av de fem raderna (`ljud/malin-tagning-2.mp3`, 10,4 s) är delad i `ljud/tagning-2/`. Whisper hör alla fem rätt (*"hösten"*, *"höst"*, *"rött"*), och inga filer börjar eller slutar mitt i ett ord. De har ersatt 07, 08, 11, 28 och 30 i `ljud/tagning-1/`, och de gamla ligger i `ljud/tagning-1/aldre/` tills tagningen är godkänd. Nu är alla 49 rader bra.

## Rävens röst och ljuden (grind 4)

| Ljud | Finns? | Rader |
|---|---|---|
| Rävens familj `rav-gullig` 1–8 (1 hej, 2 förtjust, 3 fniss, 4 mysig suck, 5 nyfiken, 6 trött/frusen, 7 pratar, 8 hej då), med a–d-varianter, och `rav-fniss` 1–4 | **ja** (från 055–059) | genom hela, aldrig samma två gånger i rad |
| Ekorren | ett litet skutt (`hopp-mjuk`) räcker, statisten säger inget | 21c, 21d, 24b |
| `pop`, `prassel-tyg`, `glimt`, `glitter`, `tindra`, `krita-ritar`, `landa-mjuk`, `swoosh`, `hopp-mjuk`, `nos` | ja | öppningen, teckningarna, korten, hoppen |
| `hostlov` (`lovhog.mp3`, `lovbuske.mp3`), `prassel-lov` | ja | lövhögen, löven som faller |
| Mattan: skog med lite vind (`skogsljud` 0,3 och en mild vind under rad 08–13b) | `skogsljud` ja, **`vind-host`** ja (Openverse, CC0, 2026-11-27, ännu ej lyssnad) | hela scenen |

## Regelkoll

- [x] 2 figurer (räven och ekorren som statist), 1 plats (höstuppslaget), inget platsbyte
- [x] Räven är låst (✅ referensark klart): utseendet och prompten ändras inte. Halsduken och löven på huvudet är egna lager ovanpå riggen
- [x] Inga djurnamn: "räven", "ekorren", "kritan". Röstfilerna heter `09-hej-raven` osv.
- [x] Varje replik har en v3-tagg, ingen `[excited]`. Hej då varmt
- [x] Aldrig *"Vad kan det vara?"*, *"Vad säger man?"*, *"Ska vi säga tack?"* eller *"Ni pratar visst med varandra"*. Teckningen: *"Vad blir det nu?"*, tacket direkt: *"Tack, kritan!"*
- [x] Kritan ritar två gånger (lövet, halsduken), och den första är temats huvudsak, inte figuren
- [x] Gissning: tre gisspauser på 3 s (lövet, halsduken med ledtråden *"något varmt"*, svampen som syns lite vid stubben) innan Malin säger svaret
- [x] Pedagogik i handlingen, sagd en gång: löven blir röda och gula och faller ner, ekorren samlar till vintern, kall och varm, upp och ner, stor, färgorden, räkna till tre
- [x] Lugnt: inga utrop i rad, långsamma rörelser, mjuk matta
- [x] Barnet letar inte efter något gömt: löven och ekollonen syns hela tiden. Ekorren poppar upp på sitt ord och är inget barnet ska hitta. Svampens hatt syns hela tiden från rad 18
- [x] Inga uppmaningar till barnet att göra något med kroppen. *"Ska du hoppa i löven?"* frågas till räven
- [x] *"Varsågod"* och *"Tack, kritan!"*
- [x] Temats fras två gånger: *"Hopp!"* (rad 23, 24)
- [x] Samtal: Malin pratar med räven, räven svarar i pausen, Malin reagerar med något nytt (07b, 13b, 15b, 23). Inga tomma medhåll
- [x] Inte samma sak tre gånger: kylan sägs en gång (*"Brr! Räven fryser."*), vinden visas, och *"nu fryser du inte"* löser det
- [x] Tydliga repliker: handlingen och saken sägs (*"Räven tar på sig halsduken"*, *"Ekorren tycker om att äta ekollon"*)
- [x] Bilden på orden: kronan fylls på *"löv"*, vinden på *"blåser"*, löven yr på *"Hopp"*, löven och ekollonen glimtar på sina ord, ekorren på *"Ekorren"*, svampen på *"svamp"*
- [x] Hej då till varje sak: räven, ekorren, löven, lövhögen och svampen, en bild var
- [x] Malin efter handlingen, frågorna före
- [x] Inget går genom något (se *Så rör det sig*)
- [x] Rörelserna går med rävens v2-rigg: halsduken bärs, inte hålls, vink, klapp, lugna hopp, svansen viftar. Figuren vänds aldrig
- [x] Inga utdragna ord (*"Brr!"* och *"Mmm"* är korta)
- [x] Inget läskigt: kylan är mild och går över, vinden är lugn, ingen gråt. Svampen: *"giftig"* sägs lugnt och varmt, följt av *"Men man kan titta på den!"*, och räven är nyfiken, inte rädd
- [x] Högst 2 nya saker (en: löven), högst 2 nya statister (ekorren finns redan). Ingen ny musik. Allt på svenska
- [ ] **Problemet är "det blåser och är kallt"**, ett vardagsproblem utan trots, som 062:s värme
- [ ] Avsteg som receptet redan har: ingen sång, inget *"Djuren hittar på!"*, boken i stället för ritintro och kritiris, fler än 6 utsnitt
- [ ] **Nytt för Kritans bok:** en statist i uppslaget (receptet har den bara för djurtemat)
- [ ] `harriets-favoriter.md`: inte ändrad, eftersom den här sessionen bara rör avsnittsmappen och grind 2:s filer. Läggs till när Sanna säger till

## Beslut 2026-11-27 (Sanna, efter grind 3)

- **Grind 2 godkänd** (*"Approved"*): bilderna i `bildlista.md` gäller som de är.
- **Halsduken ritas i kod** (*"code scarf"*): samma form som 038:s `halsduk-bok.png`, så `halsduk-kontur.json` och detaljstrecken gäller, men ränderna fylls med `kritYta` i höstfärger. Sanna valde **färg B, mossgrön och ljust senapsgul** (*"B, green-yellow"*), så att den syns mot den orange räven. Koden är `prov/halsduk/halsduk.js` (`await halsduk()` ger en canvas i samma ruta som `halsduk-bok.png`), med skuggningen utjämnad och mjuka randkanter. Prov i `prov/halsduk/stills/0.jpg`. Ingen ny sak i Flow. **Halsduken på räven** ritas också i kod (Sanna 2026-11-27 *"consider code halsduk to make it fit better"*): `halsdukPa(bild, { yc, tjock, dip, ande })` i samma fil ritar den efter rävens egen kontur, ett band under kindbandet som slutar vid kroppens kant och svänger ner lite i mitten, ränder tvärs över och en hängande ände med tofsar över magen. Storyboarden använder `{ yc: 430, tjock: 72, dip: 30, ande: -0.36 }` på `rut.png`. I scenen (grind 6) blir det ett lager i riggen som följer kroppen.
- **Ekorren är det platta kortet** `ekorre-orange` med två små skutt.
- **Lövhögen delas i kod** i en bakre och en främre halva, så att räven sjunker ner i den på *"Hopp!"*.

## Öppet (Sanna bestämmer)

1. **Halsduken** är den röda och vita från 038, enligt förslaget i grind 1. Den ser lite jul ut. En ny höstfärgad halsduk blir avsnittets andra nya sak.
2. **Ekorren** är det platta kortet `ekorre-orange` (sittande från sidan, ingen rigg), med två små skutt. Ekorrens v2-rigg (`assets/karaktarer/ekorren/premium/`) kan användas i stället om den ska göra mer.
3. **Lövhögen** delas i en bakre och en främre halva i kod så att räven kan sjunka ner i den (förslaget från grind 1).
