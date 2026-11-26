# Storyboard – Avsnitt 006 · Orangea sången, art direction v2 (utkast 2026-11-26)

Samma berättelse och samma bilder som v1 ([`../../storyboard.md`](../../storyboard.md), godkänd och publicerad), flyttade till v2: figurerna är v2-riggarna (Disa, Agda), sakerna och sjön är v2-bilderna ([`../README.md`](../README.md)), och formen följer [`format/fargsang-v2.md`](../../../../format/fargsang-v2.md) (013). **Sången är oförändrad** (`../../sang.m4a`, 4:00, ord i [`../../rader.txt`](../../rader.txt)).

## Tiderna

- **Avsnittstid = sångtid + 9,0** (introt är 9,0 s och sången börjar direkt efter det, som i v1:s slutklipp).
- v1:s storyboard är skriven med introt på 11 s och en inlagd takt efter "Kan du se?" som togs bort i slutklippet. Därför: bilderna **före 1:43 i v1** = v1:s tid − 2,0 s; **därefter** räknas tiden om från sångens ord i `rader.txt` (+ 9,0). Tider märkta ≈ ska kollas mot ljudet innan scenerna byggs.
- Sångens slut tonas ut som i v1: rösten slutar på sångtid 3:29.7 (avsnitt 3:38.7), sedan prenumerera-kortet och kritirisen.

## Det som är nytt mot v1

| v1 | v2 |
|---|---|
| Intro 11 s | Formatets intro, **9,0 s**, slutar med ett orange kritsvep rakt in i ritandet (013) |
| Kritan ritar skrov, flagga, våglinje och en ventil | **Delad kod** `verktyg/kritan-ritar.js`: v2-båtens kontur (skrov och motor) i ett drag, ca 2,8 s, sedan flaggan. Ingen våglinje och ingen ventil: teckningen har samma delar som bilden den blir (båten har ingen ventil). Riktiga båten fylls i inifrån på "En båt!" |
| Disa, Agda i v1 | v2-riggarna live ur `uttryck.html`. Disa i båten som i provet `../prov/disa-bat.html` (båten 0,7, västen i kod, flaggan i aktern) |
| Vinkningar med pose | 033:s `vink()` (armen bakom kroppen, 55° ± 12°), pekar med Disas `pekar`. Aldrig `ARMROR.vinka` (armen lossnar, Sanna 2026-11-26) |
| Discot: Disa, Agda, Gurra, Fia, Mille (fem) | **Fyra** i dansen (013: högst fyra djur): Disa, Agda, Gurra, Fia. "Klappa, klappa!" går till Agda i stället för Mille |
| "Snurra runt!": Fia snurrar | Fia flyger en **ögla** (figurer snurrar aldrig, de vänds inte) |
| Slutet: kritiris | **Prenumerera-kortet** före kritirisen (formatet) |
| Line boil fast | 2,5 px i bild, delad med zoomen, 6 gånger/s |

**Ansikten och poser** är v2:s: uttrycken `neutral glad jatteglad forvanad nyfiken tanker ledsen somnig fnissig blinkar stolt`, poserna `hoger pekar hurra magen sitter …` i `uttryck.html`. Kawaii-ögon högst tre gånger (05d, 09d, 14g). Ingen helbild står still mer än ca 5 s.

## Bilderna

| # | Tid (avsnitt) | Plats / kamera | Sjungs / sägs | I bild | Ansikten |
|---|---|---|---|---|---|
| 00 | 0:00.0 | Intro (fast) | jingeln | Logotypen, titelkortet *Avsnitt 6 · Orangea sången* (ljusblå vägg, en liten orange båt), orange kritsvep in i ritandet | – |
| 01a | 0:09.3 | Papper · kritan ritar | ♪ Kritan ritar, orange, lång … | Kritan ritar v2-båtens kontur i ett lugnt drag (skrovet och motorn), ca 2,8 s, skrrrrt. Skogsljud under (0,4) | – |
| 01b | 0:15.8 | Papper | ♪ vad kan det vara? | Kritan ritar flaggstången och den lilla flaggan i aktern, en ledtråd till | – |
| 01c | 0:22.2 | Papper | ♪ Vad kan det vara? … gissningspausen ca 4,2 s | Konturen står stilla, barnet gissar. Kritan väntar bredvid, vickar och knackar två gånger på papperet | – |
| 01d | 0:28.1 | Papper | ♪ En båt! En orange båt! | Riktiga v2-båten fylls i inifrån (pling), krit-gnistor, båten gungar till | – |
| 01e | 0:31.4 | Papper → **zoom in** | ♪ Tut-tut, nu kör vi! | Mistluren, kritan flyger ut uppe till höger, kameran åker in i båten | – |
| 03 | 0:33.2 | Sjön · zoom in | (instrumentalt) | Den ritade båten blir Disas båt på sjön, Disa sitter redan i den med västen på | Disa: **glad** |
| 03a | 0:35.2 | Närbild Disa | (instrumentalt, ingen replik) | Disa vinkar till tittaren (033:s vinkning) med ett glatt litet ljud | Disa: **jatteglad** |
| 03b | 0:37.4 | Närbild Disa | (instrumentalt) | Tassarna på relingen, tittar framåt | Disa: **glad** + **hoger** |
| 04 | 0:39.3≈ | Sjön · körscen, kameran glider in | ♪ Dinon kör sin orange båt, | Sjön glider, båten gungar, skum vid skrovet. Fia fladdrar in från höger och landar på flaggstången | Disa: **glad** |
| 041 | 0:43.2 | Närbild Disa | (raden fortsätter) | Disa klappar på relingen på slagen, tittar bakåt mot Fia på flaggan | Disa: **fnissig** |
| 042 | 0:47.6 | Sjön · körscen | ♪ tut, tut, tut – på vågorna! | Båten hoppar till på varje tut (mistluren), Fia skuttar på stången | Disa: **jatteglad** |
| 04a | 0:51.2 | Sjön · körscen | ♪ Dinon letar orange nu, leta med – jag och du! | Disa pekar åt vänster, sedan åt höger, så att barnet kan peka med. Fia lyfter och flyger ut | Disa: **nyfiken** + **pekar** |
| 05a | 1:01.3 | Refräng · dansbild på sjön | ♪ Orange! (Orange!) Orange! (Orange!) | Vattnet står still, båten mitt i bild, armarna upp på rösten, ner på ekot. Himlen glöder mjukt persikoorange | Disa: **jatteglad** + **hurra** |
| 05b | 1:03.6 | Samma bild | ♪ Orange är bästa färgen! | Händerna på västen, gungar åt sidorna | Disa: **glad** + **magen** |
| 05c | 1:05.9 | Samma bild | ♪ Orange! (Orange!) Orange! (Orange!) | Som 05a | Disa: **jatteglad** + **hurra** |
| 05d | 1:08.2 | Samma bild, kameran glider in | ♪ Som en fin apelsin! | En bubbla med v2-apelsinen poppar upp till höger med glitter, Disa pekar och tittar upp | Disa: **kawaii** (1 av 3) + **pekar** |
| 05e | 1:10.5 | Samma bild | ♪ Tut, tut, tut, tut – | Båten gungar på de första två, två små knytnävspumpar på de sista | Disa: **jatteglad** |
| 05f | 1:12.8 | Närbild Disa | ♪ vad är orange? Titta ut! | Pekar ut åt höger och tittar dit, sedan åt vänster | Disa: **nyfiken** + **pekar** |
| 06 | 1:14.9 | Sjön · körscen | ♪ Vad är orange? (Vad är orange?) | v2-fisken hoppar upp framför fören i en hög båge, plask med droppar. Disa tittar dit | Disa: **forvanad** |
| 06a | 1:17.5 | Sjön, stannar | ♪ Titta där! (Titta där!) Fisken är orange – | Sjön stannar, Disa pekar på fisken | Disa: **glad** + **pekar** |
| 06b | 1:20.9 | Närbild Disa | ♪ plask, plask, plask! | Fisken hoppar tre gånger i en båge bredvid båten, Disa klappar en gång per plask | Disa: **jatteglad** · fisken: glad |
| 07 | 1:22.7 | Sjön · körscen | ♪ Vad är orange? (Vad är orange?) | Sjön glider igen, v2-fågeln flyger in från höger, vingen flaxar | Disa: **nyfiken** |
| 07a | 1:26.8 | Sjön, stannar | ♪ Titta där! (Titta där!) Fågeln är orange – | Fågeln flaxar på stället framför fören, Disa pekar | Disa: **glad** + **pekar** |
| 07b | 1:30.0 | Närbild Disa | ♪ pip, pip, pip! | Disa flaxar med armarna, en gång per pip (lugnt, armarna bakom kroppen ut förbi kanten), fågeln bredvid | Disa: **fnissig** |
| 08 | 1:32.3 | Närbild Disa | ♪ Vad mer är orange? Kan du se? | Disa tittar på tittaren med huvudet på sned, frågande | Disa: **nyfiken** |
| 08a | 1:37.2 | Närbild Disa, inåkning | (Kan du se? / ledtråden) | Disa tittar ner på sin väst, kameran glider in mot västen | Disa: **tanker** |
| 08b | 1:39.0 | Närbild Disa | ♪ Västen är orange – och flaggan med! | Klappar på västen, pekar bakåt på flaggan och tittar upp | Disa: **stolt** |
| 08c | 1:43.0 | Närbild Disa | ♪ Dunk, dunk, dunk! | Klappar på relingen tre gånger, båten gungar | Disa: **jatteglad** |
| 09a–09f | 1:45.0 | Refräng 2 | (som 05a–05f, varje rad 2,3 s: 1:45.0, 1:47.3, 1:49.6, 1:51.9, 1:54.2, 1:56.5) | Exakt samma bilder som refräng 1 | som 05, kawaii i 09d (2 av 3) |
| 10 | 1:58.6≈ | Kritsvep | – | Orange kritsvep, 1,6 s, ingen sak i svepet, klippet mitt i | – |
| 11 | 1:59.1 | Bryggan · helbild | ♪ Vad är orange? (Vad är orange?) | Agda sitter på v2-bryggans kant med korgen (apelsin, grönt äpple, gul banan). Båten puttrar in från vänster | Agda: **glad** · Disa: **glad** |
| 11a | 2:01.0 | Bryggan · helbild | ♪ Titta där! (Titta där!) Apelsinen är orange – | Båten lägger till, Agda visar fram apelsinen | Agda: **stolt** · Disa: **forvanad** |
| 11b | 2:05.5≈ | Närbild Disa | ♪ rund, rund, rund! | Disa ritar en cirkel i luften med tassen | Disa: **glad** |
| 11d | 2:08.0≈ | Närbild Agda | (lucka i sången ca 9,5 s, grooven fortsätter) | Agda med korgen: apelsinen, äpplet, bananen. Disa pekar på apelsinen | Agda: **nyfiken** |
| 11e | 2:13.5≈ | Tvåbild | (luckan, inga repliker: Sanna 2026-11-26) | Agda räcker ner apelsinen, Disa tar emot den och nickar glatt (tacket syns i bild: nick, ett litet glatt ljud) | båda: **glad** |
| 13a | 2:18.0 | Tvåbild | ♪ Oj, oj, plask! (Plask!) | Apelsinen glider ur Disas tassar, plask | Disa: **forvanad** |
| 13b | 2:20.3 | Tvåbild | ♪ Där flöt den bort! | Apelsinen guppar bort åt höger | Disa: **forvanad** |
| 13c | 2:22.6 | Tvåbild | ♪ Längre, längre, längre bort … (Åh nej!) | Ett steg utåt per "längre", mindre och mindre | Disa: **ledsen** |
| 13d | 2:27.1 | Närbild Disa | ♪ Dinon är ledsen – snyft, snyft, snyft. | Ledsen, en liten tår, en snyft per ord. Bara raden | Disa: **ledsen** |
| 13e | 2:31.8 | Närbild Disa | ♪ Vem kan hjälpa? (Vem kan hjälpa?) | Tittar på tittaren, frågande, inte ledsen längre | Disa: **nyfiken** |
| 13f | 2:34.3≈ | Tvåbild | (hållen takt ca 2,3 s) | Agda vrider sig och pekar med vingen på apelsinen som blänker | Agda: **nyfiken** |
| 14a | 2:36.6 | Tvåbild | ♪ Ankan! (Ankan!) | Agda ställer sig upp, redo att hoppa | Agda: **stolt** · Disa: **glad** |
| 14b | 2:38.0≈ | Tvåbild | ♪ Ankan hoppar i – plask! | Agda hoppar i, stort plask (lugnt hopp, ingen vändning) | Agda: **jatteglad** |
| 14c | 2:40.0 | Tvåbild | ♪ Ankan simmar, kvack, kvack, kvack! | Agda simmar ut, bara huvudet över vattnet, ringar efter | Agda: **glad** |
| 14d | 2:42.1 | Tvåbild | ♪ Hit med apelsinen – hit, hit, hit! | Agda knuffar apelsinen tillbaka, ett kliv per "hit", Disa sträcker fram tassen | Disa: **jatteglad** |
| 14e | 2:44.5 | Tvåbild på bryggan | ♪ En halva var – till dig och mig! | Båda på bryggan, var sin halva (halvorna i kod) | båda: **glad** |
| 14f | 2:46.8 | Samma bild | ♪ Mums, mums, mums – | En tugga per mums | båda: **fnissig** |
| 14g | 2:48.2≈ | Samma bild | ♪ – hurra, hurra! | Båda armarna upp | båda: **kawaii** (3 av 3) + **hurra** |
| 15a | 2:50.6 | Rakt klipp → discot | ♪ Danspaus! (Danspaus!) Danspaus! (Danspaus!) | Discot omfärgat till ljusorange, orange discokula. Disa i mitten, Agda hoppar in bredvid | båda: **jatteglad** |
| 15c | 3:00.2 | Discot, solo | ♪ Hoppa, hoppa! (Hoppa, hoppa!) | Grodan hoppar (lugnt), stjärnregn | Gurra: **jatteglad** |
| 15d | 3:02.6 | Discot, solo | ♪ Snurra runt! (Snurra runt!) | Fjärilen flyger en ögla (ingen snurr på figuren) | Fia: **glad** |
| 15e | 3:04.8 | Discot, solo | ♪ Klappa, klappa! (Klappa, klappa!) | Ankan klappar, händerna möts framför bröstet | Agda: **fnissig** |
| 15f | 3:07.3 | Discot, alla fyra | ♪ Alla dansar – orange dans! (Orange dans!) … | Alla fyra i ett svagt V, Disa i mitten, sedan en i taget till ekona. Kameran glider sakta in och ut (ingen stillbild över 5 s) | alla: **jatteglad** |
| 16a | 3:19.0 | Discot | ♪ Fisken – orange! (Orange!) | Fisken poppar upp i bågen under kulan, alla tittar upp | alla: **forvanad → glad** |
| 16b | 3:20.4 | Discot | ♪ Fågeln – orange! (Orange!) | Fågeln poppar upp i bågen | alla: **glad** |
| 16c | 3:22.7 | Discot | ♪ Väst och apelsin och båt – orange! (Orange!) | Västen, apelsinen och båten poppar upp, en per ord | alla: **jatteglad** |
| 16d | 3:27.8 | Discot | ♪ Orange är bästa färgen, | Alla med händerna på magen | alla: **glad** + **magen** |
| 16e | 3:29.9 | Discot | ♪ som en fin apelsin! | Apelsinen i bågen gungar extra | alla: **glad** |
| 16f | 3:32.4 | Discot | ♪ Hej då, hej då – tut, tut! Hej då! Hej då! | Disa i båten kör fram genom en lucka mellan dansarna och vinkar, de andra vinkar en i taget (0,25 s isär) | alla: **jatteglad** |
| 16g | 3:39.0≈ | Prenumerera-kortet | (instrumentalt) | `produktion/youtube/prenumerera/` | – |
| 17 | 3:43.0≈ | Kritiris | (instrumentalt, tonas ut) | Kritirisen sluter sig runt Disas ansikte i båten, stjärnglimt, svart | Disa: **glad** |

**Längd:** ca 3:47 (sången 3:29.7 + 9,0 s intro, sedan kortet och kritirisen). Exakt längd sätts när slutet tajmas mot ljudet.

## Repliker

**Inga repliker i avsnittet** (Sanna 2026-11-26: "No lines"). Allt som sägs sjungs i sången. Tacket i luckan (11e) och hälsningen (03a) syns i bild: en nick, en vinkning och ett litet glatt ljud. Ingen ElevenLabs.

## Beslut

- **Fyra dansare** i discot: Disa, Agda, Gurra, Fia. Mille är inte med, Agda tar "Klappa, klappa!" (Sanna 2026-11-26).

Inga öppna frågor kvar i storyboarden.
