# 019 Rosa sången – granskning 2026-11-09

Film före granskningen: `film/avsnitt-019.mp4` (3:37,3), sparad som `film/avsnitt-019-fore-qa.mp4` innan omrenderingen.
Tider: **filmtid** (som på YouTube) = sångtid + 23,3 s (introt 11,3 s + kritan ritar 12 s). Sångtid står inom parentes.
Metod: kontaktark med en bild per sekund över hela filmen, tätare ark (2–6 bilder/s) runt varje punkt, ljudnivåer med ffmpeg.

## Användarens feedback

| # | Punkt | Vad jag såg i filmen | Åtgärd | Klar |
|---|---|---|---|---|
| 1 | Fia lite större | 0:28–0:38: Fia är ca 110 px hög, nästan bara en prick mot den rosa väggen | Fia 110 → 150 px | ✅ |
| 2 | Närbild på den rosa blomman, med gnistor | 0:45–0:49 ("En rosa blomma", 22,3): kameran står still på hela vägen, blomman är liten | Kameran åker in nära blomman på "En rosa blomma (Åh, åh!)", gnistor runt den, blomman gungar; ut igen till "och en till" | ✅ |
| 3 | "Titta!" i stället för "Vad ritar kritan?" som i 013 (`0f1ff22`) | 0:11,6: Malins "Vad ritar kritan?" när kritan börjar rita | `vad-ritar-kritan-1` → `titta-1` (varm), samma ställe. "Hmm" (4,6 s före svaret) står kvar som gissningspaus | ✅ |
| 4 | Bättre molnhopp, och hoppet av molnet, fallet och landningen i bilen | 1:11–1:18 och 1:39–1:45: hoppen saknar sats, sträck och tryck (`sx`/`sy` skickades aldrig till Mille), molnen svarar inte när hon landar. Det finns inget fall ner i bilen i dag: hon flyger upp i strålarna, molnsvepet, sedan sitter hon redan i bilen på kullarna | Sats (huk) före hoppet, sträckt i luften med armarna upp, tryck vid landningen, molnet trycks ner och puffar. Nytt: hon kliver av molnet, faller med armarna upp förbi molnen och landar i bilen med en studs | ✅ |
| 5 | Närmare beskärning på Mille på molnen | 1:11–1:18: Mille är ca 120 px hög i bild, 1:39–1:46 ca 280 px | Kameran närmare och följer henne (refräng 1 och refräng 2) | ✅ |
| 6 | Molnövergången runt 1:50 underifrån/ovanifrån | 1:52,9 (89,6): molnbanken drar över från höger till vänster som de andra | Det här svepet går lodrätt: molnen kommer underifrån och drar uppåt medan hon faller | ✅ |
| 7 | Lammet pekar på skylten och vinkar till Mille vid 2:04 | 2:01–2:05: lammet står still bredvid skylten och lyssnar, vinkar först när bilen har kört förbi | Lammet pekar på skylten (tittar dit) när bilen kommer, vänder sig sedan och vinkar till Mille | ✅ |
| 8 | Fler ljudeffekter, Openverse först | Tyst: Fias flaxande, molnlandningarna i refräng 2, fallet, landningen i bilen, närbilden på blomman, lammets pekande, glassarnas småhopp, klappgnistorna | Se ljudlistan nedan | ✅ |
| 9 | Bättre dansande glassar | 2:25–2:38: fyra glassar på rad som hoppar lite; stela mellan hoppen, inget tryck/sträck i luften, stort tomrum ovanför | Se glassdansen nedan | ✅ |
| 10 | Mille och djuren klappar bättre | 2:42–2:44 (Milles solo) och 2:49–2:51 (alla): Milles tassar möts aldrig, de stannar vid sidorna av kroppen, så ingen klapp syns. Lammets klövar syns knappt mot magen | Mille klappar med riggens egen klapp (`ROR.klappa`, tassarna möts framför bröstet). Lammet lyfter klövarna högre så de syns. Gnista mellan tassarna på varje klapp | ✅ |
| 11 | Milles kawaii-ansikte ibland | Används inte i filmen | Kawaii på blomman (närbilden), ballongen ("En rosa ballong"), utsikten ("Åh, vad fint"), tre kulor i kiosken och "Vilken rosa dag" | ✅ |
| 12 | Tona ut musiken snyggare | Sången klingar av på ca −26 dB efter "Hej då!" och tar slut tvärt vid 3:37,3 samtidigt som filmen | Sången tonas ut mjukt de sista 4,5 s (från 3:32,8), effekterna också; sångtagningen är annars oklippt | ✅ |

## Egna fynd

| Tid | Fynd | Åtgärd |
|---|---|---|
| 1:39–1:45 | Molnhoppen i refräng 2: kroppen trycks inte ihop och sträcks inte (se 4) | Rättat med 4 |
| 1:46–1:52 | Mille svävar uppåt i strålarna i 6 s utan att något händer, liten i bild | Kortare: hon kliver av molnet och faller (4) |
| 2:25–2:38 | Glassarnas strutar försvinner bakom molnen nertill; nästan halva bilden är tom himmel | Glassarna större och lite högre upp |
| 2:42–2:44 | Kameran är nära Mille på klappsolot, men tassarna syns inte (se 10) | Rättat med 10 |
| Hela | Inga trasiga bilder, inga hål i lagren, kanterna lika, kameran går aldrig utanför plattorna | – |
| 3:37 | Filmen slutar 0,3 s efter att kritirisen stängt, ljudet klipps samtidigt | Rättat med 12 |

## Ljud (punkt 8)

Ur projektets bibliotek först, sedan Openverse:
- `fladder` – Fia flyger runt bilen (0:28–0:38)
- `glimt` – närbilden på blomman
- `hopp-mjuk` och `landa-mjuk` / `puff` – molnhoppen i refräng 2 (förut bara `boing`)
- **Nytt ur Openverse:** `visselpipa-ner` – Mille faller ner i bilen ([slide_whistle_down_slow_01](https://freesound.org/people/joedeshon/sounds/79673), joedeshon, CC BY 4.0, krediteras i `youtube.md`)
- `studs` + `landa-mjuk` – hon landar i bilen
- `pling` – lammet pekar på skylten
- `studs` – glassarnas småhopp, `klapp`-gnistorna i discot följer sången (inga extra klappar, kören klappar redan)

## Resultat

Ny final `film/avsnitt-019.mp4`, fortfarande 3:37,3 (sången oklippt, samma tider, så kapitlen i `youtube.md` gäller). Kontrollerat med kontaktark (1 bild/s) över hela filmen och närbilder runt varje punkt. Ljudet i slutet går nu från −14,7 dB till −56 dB de sista 4,5 s i stället för att klippas på −29 dB.

Saker att veta:
- **Fallet ner i bilen är nytt** (punkt 4). Förut flög Mille upp och svepet bytte direkt till bilen. Nu flyger hon upp till ett moln (1:46–1:49), kliver av, faller med armarna upp och molnsvepet kommer underifrån (1:51–1:53). Sedan landar hon i bilen med en studs (1:54).
- Mille dansar i discot som en vanlig v2-figur (som lammet och Lova), så att hon kan använda riggens klapp. Tassarna har fått en mjuk skugga, annars syns de inte mot den grå magen.
- Visselpipan är CC BY 4.0: krediten står i `youtube.md` (beskrivningen) och i `assets/ljud/effekter/README.md`.
- Gamla filmen: `film/avsnitt-019-fore-qa.mp4`.

## Runda 2 (samma dag)

Film före runda 2: `film/avsnitt-019-fore-runda2.mp4`.

| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 13 | Ballongen får fler ansiktsuttryck: blinkar | Ansiktet var stilla (bara blinkningen med ena ögat i slutet) | Ansiktet ritas i kod varje bild (som glassarnas): blinkar var 2,9:e sekund överallt där ballongen syns, ^ ^ när den fnissar (1:26), blinkar med ena ögat i slutet (3:33) | ✅ |
| 14 | "oo"-mun när den studsar på molnet | 1:33–1:35: ballongen puttar molnet två gånger med samma leende | Runda "oo"-munnen öppnas när den åker upp mot molnet och stängs när den släpper, båda studsarna | ✅ |
| 15 | Bättre klapp för alla djuren i discot | 2:42–2:51: lammets och leopardens klövar/tassar klappar mot magens kanter och möts aldrig; Milles tassar stannar vid kinderna | Alla tre: armarna in framför magen, händerna möts mitt på magen på varje slag och går isär mellan slagen (provat på en provbänk med nio vinklar). Tassarna har en mjuk skugga så de syns mot magen. Gnistan slår ut där händerna möts | ✅ |
| 16 | Kawaii-ögon och hjärtan vid 1:42 | 1:41–1:44: Mille står på molnet och jublar, inget extra händer | Kawaii-ögon 1:41,3–1:43,6 och sju små rosa hjärtan som poppar fram växelvis på båda sidor om henne och stiger och tonar bort | ✅ |
| 17 | Full QA av hela filmen | – | Se nedan | ✅ |

### QA av hela filmen efter runda 2

- Ny final `film/avsnitt-019.mp4`: 1920×1080, 3:37,3 med ljud (snitt −16,2 dB, topp −0,4 dB). Sången är oklippt och tiderna är desamma, så kapitlen i `youtube.md` gäller fortfarande.
- Kontaktark med en bild per sekund över hela filmen: inga tomma eller trasiga bilder, inga hål i lagren, och figurerna är hela i bild.
- Närbilder: ballongen fnissar med ^ ^ (1:26), blinkar (1:30), gör "oo" på båda molnstudsarna (1:33–1:35) och blinkar med ena ögat i slutet (3:33). Kawaii-ögon och hjärtan vid 1:41–1:44. I discot möts klövarna och tassarna mitt på magen på slaget för alla tre, både i soloklappen (2:42) och när alla klappar (2:49).
- Förhandsvisning av ändringarna: `film/forhandsvisning-runda2.mp4` (33 s, git-ignorerad).

## Runda 3 (samma dag)

Film före runda 3: `film/avsnitt-019-fore-runda3.mp4`.

| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 18 | Scen 1 kan ha annan bakgrundsfärg, och sedan "gör himmel blå" i alla scener med himmel | Rosa vägg och rosa himmel överallt: den rosa bilen, blommorna, molnen och ballongen flyter ihop med bakgrunden | Himlen är blå i glasskioskens blå (#44A9D3) överallt utom i discot: vägscenerna (`assets/bakgrunder/vagen/vagen-bla.png`, samma vägbild med väggen omfärgad), molnhoppen, ballongen och slutet (`glassberget/varianter/bla-himmel.png`, den rosa himlen omfärgad till en blå toning med samma kritdrag), utsikten över glassbergen (`glassbergen-vy-bla.png`, bara himlen), kullarna och glassdansen. Marken och vägen är som förut. Inga nya bilder, bara omfärgade. Scen 1 har fortfarande inga moln, eftersom du tog bort dem där tidigare | ✅ |
| 19 | Lite liv vid 2:04 när lammet pekar på skylten | 2:03–2:06: bara bilen rör sig | Fjärilen från introt (Fia) fladdrar in från vänster förbi Mille, över lammet och fram till skylten och ut till höger (2:02,7–2:06,7), med ett tyst fladderljud | ✅ |
| 20 | Bättre molnhopp med växlande utsnitt | Refräng 1 (1:11–1:18) var en nära följande kamera; refräng 2 lika | Refräng 1: vid bild på hela molntrappan och himlen, tät närbild på ansiktet med kawaii-ögonen när hon landar på tredje molnet (1:13,7–1:15), vid igen för hoppet till sista molnet, nära på studsarna. Refräng 2: vid på de tre första hoppen, tät närbild med kawaii och hjärtan (1:41–1:44), sedan som förut. Lugna zoomar (0,6–0,7 s) på hopp-slagen, inga klipp | ✅ |
| 21 | Musljud till Mille (fniss, pip, "hehe") | – | Ur projektets bibliotek (`mus-pip`, `fniss`), lågt och bara där ingen sjunger: tre pip och ett fniss på molnhoppen i refräng 1 (instrumentalt), fniss när hon landar i bilen (1:54), fniss när hon får tre nya kulor (2:22) och ett pip efter "hurra" i discot (2:58). Inget i själva klappen, där sjunger kören "klappa händer" | ✅ |
| 22 | Glassvissla vid 2:28 | Glassarna dansar utan eget ljud | Visselpipa uppåt på ett hopp (2:28,2), upp och ner på vågen (2:29,9) och platsbytet (2:31,3), uppåt på sista stora hoppet (2:37,2). Ur Openverse: joedeshons slide_whistle_up_01 och slide_whistle_up_down_01 (CC BY 4.0), som `visselpipa-upp` i biblioteket, krediterade i `youtube.md` | ✅ |
| 23 | Ingen konfetti i discot | 2:39–3:01: strösslet regnar över hela discot | Borttaget. Ljusstrålarna, discokulan, golvet och gnistorna vid klappen ligger kvar | ✅ |
| 24 | Bättre glass i kiosken | 2:13–2:24: glassarna är små och platta jämfört med dansglassarna, och skyltglassen på taket är avklippt i överkanten | Glansiga glassar i dansglassarnas stil (byggda av den rosa dansglassen, gul och grön omfärgade, tornet av samma kula: `assets/rekvisita/glass-v2/gor-glans.py`, `cut/glass-glans-*.png`), större på disken (74 → 96) och i tassen (1,7 → 2,05). Kameran lite längre ut, så att skyltglassen syns hel, och himlen och marken fortsätter åt sidorna. Tappet fanns redan (kulan vinglar, faller, studsar, plaskar med ljud, Mille blir ledsen, grodan får en idé och räcker över tre kulor) och har kvar sina ljud. Kawaii-ögon och fniss när hon får tornet | ✅ |
| 25 | Glasstornet vid 3:25 | 3:20–3:28: tornet sitter stelt bakom henne och ser suddigt ut | Glansiga tornet i tassen framför kroppen. Hon slickar på "mums, mums, mums" som förut. Klistermärkena syns tydligt mot den blå himlen | ✅ |

### QA efter runda 3

- Ny final `film/avsnitt-019.mp4`: 1920×1080, 3:37,3, topp −0,4 dB. Sången är oklippt och tiderna är desamma, så kapitlen gäller. Gamla filmen: `film/avsnitt-019-fore-runda3.mp4`.
- Kontaktark med en bild per sekund över hela filmen och två bilder per sekund över refräng 1: blå himmel överallt utom i discot, inga tomma bilder och inga kanter utanför bilden. Hittat och rättat: vid utzoomningen över glassbergen syntes en blå rand under marken, så marken fortsätter nu nedåt.
- Kvar att veta: den rosa diset över de avlägsna glassbergen ligger kvar (det läses som avstånd). Glasstornet är en bild, så kulorna vickar inte var för sig.
- Förhandsvisning med ljud: `film/forhandsvisning-runda3.mp4` (65 s: molnhoppen i refräng 1, refräng 2 och fallet ner i bilen, kiosken och glassdansen med visslan, slutet i bilen).

## Runda 4 (samma dag, "fixa allt")

Film före runda 4: `film/avsnitt-019-fore-runda4.mp4`. Stillbilder före bygget: `film/runda4-stillbilder.jpg`.

| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 26 | 3:14–3:16: närbilden på Mille i bilen klipper öronen och glasstornet | Kameran gick nära på ansiktet | Utsnittet ligger högre och lite längre ut, så att öronen och hela tornet alltid syns. Öronen klipps aldrig | ✅ |
| 27 | Discot 2:42–2:48: leoparden och lammet delvis utanför bild i soloorna | Solot zoomade 1,3 på den som har solot | Solot går bara en liten bit närmare (1,06) och lite mot den som har solot, så alla tre är hela hela tiden | ✅ |
| 28 | 1:48, strålarna: ett moln täcker Milles huvud | Molnen låg framför figurerna | Molnen ligger nu bakom Mille i alla molnscener | ✅ |
| 29 | 2:08–2:10: ta bort björnen och igelkotten | Fyra figurer i bild (max tre) | Bara lammet står vid vägen och pekar på skylten | ✅ |
| 30 | Samma blå i hela filmen med en ljus toning mot horisonten | Olika blå i olika scener | En toning överallt, #44A9D3 uppe och #B2E0F2 vid horisonten, med kritdragen kvar: vägen, glassberget, utsikten (de avlägsna bergen blir blådisiga), kiosken (`scener/lager/kiosk-ra-bla.png`) och himlarna i kod. Allt ur `assets/bakgrunder/vagen/gor-bla.py`, inga nya bilder | ✅ |
| 31 | Grön kulle bakom vägen i första (0:26–0:46) och sista (3:02–3:28) vägscenen | Bara himmel bakom vägen | `vagen-bla-kulle.png`: en mjuk grön kulle i kullarnas färg från 1:58, med en mörkare kritkant överst. Scenen med kullarna vid 1:58 har kvar sin släta platta | ✅ |
| 32 | Mer variation 0:28–0:46 och 3:18–3:28, slutet ska bygga upp | Samma vida bild hela vägen | Början: halvnära på Mille, nära med kawaii när fjärilen kommer, tillbaka ut, halvnära igen, och små hopp i bilen på slagen. Slutet: kameran går långsamt upp och in mot Mille och tornet (3:23–3:27) och sedan ut till sista bilden | ✅ |
| 33 | 1:34–1:36: tom himmel | Ballongen flög ut ur bild | Ballongen stannar i bild, flyger snett upp åt höger och blir mindre | ✅ |
| 34 | 2:30, glassdansen: glassarna överlappar | Platsbytet lät dem gå igenom varandra | Avsiktlig bonk med ett lågt "boing" mitt i varje platsbyte (i stället för visslan där) | ✅ |
| 35 | 2:18–2:22: den tappade kulan ska tydligt plaska | Kulan låg platt utan stänk | Kulan plattas ut vid marken och nio rosa droppar stänker upp och ut | ✅ |
| – | Kolla: gul ram vid 0:24 | – | Det är inzoomningen i blommans gula mitt, som tänkt. Ingen ändring | ✅ |
| – | Kolla: glassbergets himmel 0:58–1:08 ska vara blå | Rosa | Blå, se 30 | ✅ |
| 36 | Grodan trollar fram mer glass med ett trollspö | Grodan satte på kulorna med handen | Ett trollspö ritat i kod (kort lila pinne med en gul stjärna och vit kant, ingen ny bild). Grodan lyfter det när hon får idén, svingar det mot Milles strut en gång per kula, och ett spår av små stjärnor flyger dit innan kulan poppar fram. Ljud ur biblioteket: `glimt` när spöet kommer fram, `glitter` på varje sving, `pop` och `pling` på kulan. Allt i mellanspelet, inget över sången. Kameran går ut ur närbilden innan grodan trollar, så att spöet syns | ✅ |
| 37 | 1:15: för mycket zoom in och ut på molnhoppen | Nära, vid, nära igen på två sekunder | Vid bild över hela molntrappan till 1:14, sedan en enda lugn inzoomning (1,3 s) till halvnära (2,4, förut 3,2) som stannar resten av hoppen | ✅ |
| 38 | 1:28: bättre animation | Ballongen gled upp stelt steg för steg | Tryck före varje steg, sträck på väg upp och en liten gungning efteråt, öppen glad mun på varje "upp", sträckt i sista farten ut ur bild | ✅ |
| 39 | 1:38: panorering i stället för klipp | Hårt klipp från ballongen till molnhoppen | Kameran lämnar ballongen och sveper neråt genom himlen. Ett stort rosa moln far upp förbi kameran mitt i svepet, och svepet bromsar in på Mille som hoppar på molnen | ✅ |
| 40 | 2:03: djuren vinkar längs vägen | Lammet pekade bara på skylten | Lammet vinkar till Mille med ena armen redan när hon kör in och pekar på skylten med den andra, och vinkar sedan med båda när hon kör förbi. Bara lammet, så det blir högst tre figurer | ✅ |
| 41 | 2:05: ta bort Fia | Fjärilen fladdrade förbi skylten | Borttagen, med sitt fladderljud | ✅ |
| 42 | 2:16: zooma in mer | Kiosken i vid bild när kulan vinglar | Kameran går in till 1,14 på Mille och glassen när kulan börjar vingla och stannar där till hurra, med närbilden (1,32) på det ledsna ansiktet | ✅ |
| – | Hittat på vägen | Visslan på glassarnas sista stora hopp (2:37) hade hamnat i en kommentar | Tillbaka | ✅ |

### QA efter runda 4

- Ny final `film/avsnitt-019.mp4`: 1920×1080, 3:37,3 med ljud (snitt −16,2 dB, topp −0,4 dB). Sången är oklippt och tiderna är desamma, så kapitlen i `youtube.md` gäller. Gamla filmen: `film/avsnitt-019-fore-runda4.mp4`.
- Kontaktark med en bild per sekund över hela filmen: inga tomma eller trasiga bilder, blå himmel med samma toning överallt utom i discot, och alla tre är hela i discot. Svepet vid 1:38 och trolleriet vid 2:18 kollade med fem bilder per sekund ur finalen.
- Kvar att veta: grodans hand syns inte bakom disken, så spöet sticker upp bredvid huvudet. Glasstornets kulor vickar inte var för sig.
- Förhandsvisning med ljud: `film/forhandsvisning-runda4.mp4` (76 s).

## Runda 5 (samma dag)

Film före runda 5: `film/avsnitt-019-fore-runda5.mp4`. Stillbilder före bygget: `film/runda5-stillbilder.jpg`.

| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 43 | Malin säger "titta" två gånger | "Titta!" vid 0:11 (`titta-1`) och "Oj, titta!" vid 0:16 (`hmm-3`) när kritan ritar | `hmm-3` bytt mot `hmm-4` ("Mm, jag undrar.") ur röstbanken, på samma ställe. Ingen ny tagning. Kollat med Whisper på filmens första 40 s | ✅ |
| 44 | Två moln till i molnscenen vid 1:14 | Tomt uppe till vänster och nere till höger. Molnen var 13 och scenen använde alla, så nya moln syntes inte | Två rosa moln till (ett litet uppe, ett mellan nere), och plats för 16 moln | ✅ |
| 45 | Zooma in lite på trollspöet och gör det mer likt filmens stil | Platt vektorspö som stack upp bredvid huvudet | Spöet i vaxkrita (samma `#vax` som den ritade blomman), vit klistermärkeskant med `kant.js`, och det kokar med figurerna. En grön tass i grodans färg håller pinnen mot kroppen vid axeln. Kameran går in till 1,3 på grodan och struten medan hon trollar | ✅ |

### QA efter runda 5

- Ny final `film/avsnitt-019.mp4`: 1920×1080, 3:37,3 med ljud (snitt −16,2 dB, topp −0,4 dB). Sången är oklippt och tiderna är desamma, så kapitlen i `youtube.md` gäller. Gamla filmen: `film/avsnitt-019-fore-runda5.mp4`.
- Kontaktark med en bild per sekund över hela filmen: inga tomma eller trasiga bilder, och blå himmel överallt utom i discot. Två bilder per sekund över molnhoppen (1:12–1:18): de nya molnen fyller hörnen. En bild per sekund över kiosken (2:15–2:27): spöet är i vaxkrita med vit kant, och kameran går in på grodan och struten medan hon trollar.

## Runda 6 (samma dag, Sanna: "do all six suggestions for the rosa video … keep the burst of rays")
Film före runda 6: `film/avsnitt-019-fore-runda6.mp4`.

| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 46 | Bilen i samma bild länge | 1:54–2:11 och 3:03–3:21: samma helbild i 15–18 s | Halvnära på Mille uppför och nerför kullarna (1,4), nära på hennes nyfikna ansikte före kiosken (1,6), halvnära på sista refrängens första rader (1,3) och helbild igen när blommorna, berget och ballongen åker förbi. `halvnara()` i scenen | ✅ |
| 47 | Markisen avklippt vid kiosken | 2:12–2:21: markisen och taket utanför överkanten i inzoomningen | Inzoomningen 1,04 (var 1,14) och högre upp, också när grodan trollar (1,12, var 1,3): markisen hel. Närbilden på Milles ledsna ansikte är kvar | ✅ |
| 48 | Discot ser likadant ut i 30 s | Solona syntes knappt (kameran 1,06 för att alla tre ska vara hela, punkt 27) | Den som har solot kliver fram: 14 % större, lite närmare, i ett mjukt ljus på golvet; de andra 5 % mindre. Alla tre är kvar hela i bild | ✅ |
| 49 | Platt bild i zoomen genom blomman | 0:23–0:24: ca 1 s helt gul/rosa yta | Zoomen in till 9 (var 16) och ut från 12 (var 44), fortare ut | ✅ |
| 50 | Klistermärkena små i telefonen | Ca 8 % av bildens bredd | Radie 100 (var 80), samma 2 × 2 till höger | ✅ |
| – | Strålarna bakom Mille vid 1:24 | | Ligger kvar (Sanna: "keep the burst of rays") | – |

## Runda 7 (samma dag)
| # | Punkt | Vad jag såg | Åtgärd | Klar |
|---|---|---|---|---|
| 51 | Nosarna saknades | Mille utan rosa nos i runda 6: nosarna ritades om i kod i figurernas `uttryck.html` (5558ae8) och bilderna blev utan, men avsnitten laddar bara bilden | `verktyg/baka-nasor.mjs` bakar in nosen i `cut/<namn>-nos.png` för Bulle, Igge, Kanel, Lage, Lova och Mille. Ny final | ✅ |
| 52 | Ny tagning för ritintrot | Sanna: "use this" (ElevenLabs, Malin) | "Nu ska vi se vad kritan ritar." (i stället för "Titta!"), "Hmm." (i stället för "Mm, jag undrar."), "En blomma!" (i stället för "En blomma! En rosa blomma!"), samma tider. Klippen `nu-ska-vi-se-vad-kritan-ritar-1`, `hmm-7`, `en-blomma-1`; originalet i `produktion/ljud-original/roster/019-rosa-sangen/` | ✅ |
| 53 | Muspip | Sanna: "mouse sounds" (fem nya pip) | `mus-pip-4` till `-9` (normaliserade, med fade; originalen i `produktion/ljud-original/effekter/mus-pip/`): pip när Mille dyker upp i ritintrot och efter hurra i introt, tre pip i lekscenen (49,1, 52,5, 53,3) och ett bubbligt pip i slutet (155,6). Fnisset vid 51,3 är kvar | ✅ |
| 54 | Trollstavsscenen för kort | Sanna: "make magic wand scene a bit longer" | Kulorna kommer vid 9,3, 10,4 och 11,5 efter kioskens start (var 9,0, 9,6, 10,2), hurra vid 12,3 (var 10,9). Trollandet ca 1,4 s längre, molnsvepet vid 123,0 och glassraden in vid 123,4. Sången oklippt | ✅ |
