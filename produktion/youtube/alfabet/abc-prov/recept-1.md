# Kritans ABC – recept 1: Klossbygget

Sparat 2026-11-18 (Sanna: *"spara detta som recept 1"*). Förlagan är skissen `../skiss-form/riktning-1.png` (riktning 1 av 3).
Den frysta scenen ligger i `recept-1/`: `recept-1/index.html` med en egen kopia av `recept-1/klossar.js`, så att
senare ändringar i `abc-prov/` eller i `../klossar.js` inte ändrar receptet. Samma dag gjordes receptet om efter Sannas
granskning (A-klistermärket, teckningar som liknar bilderna, inga utdragna ord, blandningen och utrullningen). Filmen som hör
till är `recept-1/recept-1.mp4` (3:23, renderad 2026-11-18 kl. 20.45). Manuset finns också som Google-dokument: https://docs.google.com/document/d/1lckHE1v6cbpN8gVKTnZHj-DOwdh-Jq5glbjWCQQQeHg/edit. De tidigare versionerna av sidan ligger i `recept-1/aldre/`.

Se den: `python3 -m http.server 8765` i repots rot, sedan http://127.0.0.1:8765/produktion/youtube/alfabet/abc-prov/recept-1/

## Formen

Allt är träklossar på ett golv. Orden blir bildklossar, och leken är en liten mur där den udda klossen åker ut.

| Del | Så ser det ut |
|---|---|
| Rummet | Papperet är väggen, och de nedersta 330 px är ett varmt, ljust golv med en mjuk kant och svaga plankstreck. Klossarna har mjuka markskuggor. |
| Klossarna | three.js-klossar med rundade kanter och mycket trä (`tra: 'mer'`: ådring, årsband och en kvist). Framsidan har en målad, krämvit platta med en färgad ram. Sidorna är bara trä. |
| Vinkeln | Alla klossar lutar lika mycket (`RX 0,2`, `RY −0,22`), och dessutom är varje kloss vriden lite åt sitt eget håll (`platta[3]`). Bilklossen är vriden åt andra hållet (0,16). |
| A-märket | Ett klistermärke (`klister: true`, `rund: 0`, `djup: 0.02`) med ett tjockt, rött A med kritkorn, lite snett (−0,05). I introt är det den fyrkantiga, krämvita plattan med röd ram och vit klistermärkskant (Sanna: *"intro should be square like before"*), fast på en hel träkloss: klossen snurrar in ett varv mitt på väggen i vinjetten (swoosh, pop när den landar), så att träet syns från början (Sanna 2026-11-18: *"cube spin on intro to establish the wood blocks"*). Den står lika snett som de andra klossarna medan A:et ritas (`tra` i `K.rita`, 0 = platt märke, 1 = träkloss) och kritan ritar A:et i tre drag (kameran zoomar in). Sedan flyttar det, och på vägen tonar träet bort och märket blir runt och vitt (`form` i `K.rita`, 0 = fyrkant, 1 = rund). Det flyttar till övre vänstra hörnet och ligger där som ett lager ovanpå bilden resten av filmen: kameran flyttar och zoomar inte det (`las` i `klossO`). Det vickar på A-orden och kommer aldrig tillbaka till mitten. |
| Orden | Teckningen ritas **mitt i bild** (`MITT` x 960) och kliver fram i närbild där (`NARA`). Teckningen har samma form, proportioner och delar som bilden den blir, mätt ur bilden i teckningens mått (apan är ett ägg med huvudet i, apelsinen har ett kort skaft och bladet snett upp åt höger, ananasen är äggformad med fem blad som en solfjäder). Frukterna ritas utan ögon och kinder; de kommer med bilden. Sedan poppar en bildkloss fram i raden till vänster på golvet (`RAD`, x 175–575, sidan 180), och saken krymper ner på plattan. Den lever kvar där: frukterna blinkar och apan vinkar. |
| Ansiktena | Frukterna och avokadon har en glad, öppen mun i kod (`mun: [x, y, bredd]`, som apans). Avokadons ögon har en vit ring (`ogonKant`), annars försvinner de mot den bruna kärnan (Sanna 2026-11-18 kväll). Teckningarna har en svag markskugga som växer fram med kroppen. |
| Ramfärger | apa orange, apelsin grön, ananas rosa, bil blå, ko gul, anka turkos, avokado lila, ambulans rosa, boll grön. Kon är pusslets ko (`produktion/youtube/pussel/bilder/cut/ko.png`) på en ljusgrön platta. Ankan är badankan och har ett öga i kod, avokadon har två ögon på kärnan. |
| Blandningen | På "Nu leker vi!" hoppar de tre klossarna fram till mitten (`RC`), den högra först så att vägen är fri, och kameran går nära (1,5 ×). Sedan byter grannar plats tre gånger: den ena hoppar i en båge över, den andra glider under. Efter blandningen står apelsinen till vänster, apan i mitten och ananasen till höger. Till muren hoppar apan upp först i en hög båge, och apelsinen och ananasen glider in under den efteråt, så att ingen går igenom mittenklossen. |
| Vilken ska bort? | Apelsinen och ananasen glider ut till muren 2 × 2 (nere till vänster och höger), och apan hoppar upp ovanpå. Muren står mitt i bild. Den udda dunsar ner uppe till höger. Malin säger alla fyra orden i varje runda innan frågan, så att barnet hör hur de låter. Klossen hon pratar om nickar lite fram mot kameran (litet nog för att inte gå in i grannarna; muren har glipa 1,14). På svaret hoppar den udda upp och åt höger förbi muren, landar på golvet och glider ut. Muren står kvar. När bilen kör vinkar apan (klossen nickar fram) och Malin säger *"Hej då, bilen!"* (Sanna 2026-11-18). |
| Blandningen mellan lekarna | Före kons runda hoppar murens tre klossar ner på golvet, byter plats två gånger och bygger muren igen (mittenklossen hoppar upp först). Sedan står ananasen överst, apan nere till vänster och apelsinen nere till höger (`blandaMur`). |
| Tredje rundan | Lite svårare (Sanna 2026-11-18). De tre klossarna flyttar till en rad på golvet till vänster (de är samlade). Fyra nya dunsar ner en i taget: ankan (pip), avokadon (plopp), ambulansen (siren) och sist den udda bollen (boing, *"Boll."* som de andra, inget "Titta! En till."). Alla fyra blandas (tre byten), och muren byggs med bollen **nere** till höger under avokadon. Malin säger orden i en annan ordning, med bollen som andra ord. På svaret glider bollen ut under avokadon och studsar ut ur bild, och avokadon faller ner där bollen stod. |
| Slutet | Alla sex bildklossarna i en rad på golvet (ananas, apa, apelsin, anka, ambulans, avokado), och A-märket sitter kvar i hörnet. I raden vrids de mer, åt olika håll. Orden sägs inte igen (Sanna 2026-11-18 kväll), bara *"Alla börjar på bokstaven A."* Sedan *"Nu dansar vi!"* och ett kort disco (26 slag, ca 16 s): 005:s discokula (`assets/bakgrunder/danspaus/cut/discokula.png`) sänks ner på sitt snöre och pendlar lugnt, och mjuka ljusfläckar glider över väggen och golvet bakom klossarna och byter färg på varje takt. Torndansen (Sanna 2026-11-18 kväll): raden glider isär åt sidorna, och klossarna hoppar en i taget till mitten och snurrar ett helt varv i luften (`spinn`). De landar på slaget och bygger en pyramid, tre, två och en, med apan överst. Apan hoppar två gånger och snurrar en gång till på toppen. Sedan hoppar de ner en i taget, översta först, och ställer sig i raden. Bilden på plattan döljs medan framsidan är vänd bort. Apan vinkar och frukterna gungar. Efter "Hej då!" rullar klossarna åt höger, kant över kant (de vrids bara i bildplanet, så bilderna följer med), stannar ett ögonblick och hoppar ut ur bild, den högra först. A-märket sitter kvar, och sedan tonar allt ut. |
| Musiken | Tre delar (Sanna 2026-11-18 kväll: den korta slingan hördes gå om): `gissa-bad.m4a` medan kritan ritar, Städa-radions sömlösa slinga (`stada-radion-slinga.m4a`, 64 s) från "Nu leker vi!" och den funkiga tagningen `disco-funkig.m4a` (98,35 BPM, första slaget 0,10 s, 20,8 s, Suno-tagningen som inte användes till Gissa teckningen) från discot till slutet. |
| Kameran | Lugna inzoomningar i stilla stunder (1,4 × när A:et ritas, 1,5 × på klossarna medan de blandas, 1,3 × på muren under leken, 1,12 × i slutet). Ingen zoom när ordet sägs. Kameran går ut till hela bilden innan något flyttar sig långt, och utsnittet stannar alltid inom scenen. |

## Manus

Filnamnen i tabellen är nycklarna i `TAL`. Ljudet för dem kommer ur Malins tagning i `abc-recept-1/` (se `NY`).

Inga utdragna ord (Sanna 2026-11-18: det låter konstigt). Ingen "Lyssna!", ingen "Kan du gapa stort? Aaaa!" och inget "Säg du: …".

| Tid | Replik | Fil |
|---|---|---|
| 0:01.6 | Kritans ABC! | `p-abc` |
| 0:04.3 | Kritan ritar. *(A:et ritas)* | `kritan-ritar-1` |
| 0:09.1 | Det är ju A! · Bokstaven A. · A säger ah. · Kan du säga ah? | `d-det-ar-a`, `d-bokstaven-a`, `d-a-sager-ah`, `d-kan-du-saga-ah` (nycklarna i `TAL`; filerna via `NY`) |
| 0:19.4 | Kritan ritar något på bokstaven A. | `d-kritan-ritar-nagot` (Malin, `tagning-4.mp3`) |
| 0:23.2 | Hmm … | `hmm-1` |
| 0:26.1 | Vem är det? | `a03-t1` |
| 0:33.3 | Apa! | `a04-t1` |
| 0:36.1 | En apa! | `a05-t1` |
| 0:39.3 | Ja! Apa börjar på bokstaven A. | `a07-t1` |
| | Hmm … · Vad blir det? · Apelsin! · En apelsin! · Apelsin börjar också på A! | `hmm-6`, `a18-t1`, `a19-t1`, `a20-t1`, `p-ocksa-apelsin` |
| | Hmm … · Vad blir det? · Ananas! · En ananas! · Ananas börjar också på A! | `hmm-7`, `a18-t1`, `a26-t1`, `a27-t1`, `p-ocksa-ananas` |
| 1:22.7 | Nu leker vi! *(klossarna blandas och bygger muren)* | `p-nuleker` |
| | Titta! En till. · Apa! · Apelsin! · Ananas! · Bil. · Vilken ska bort? · Vilken börjar inte på A? · Bilen! · Bil börjar inte på A. · *(apan vinkar)* Hej då, bilen! | `p-entill`, …, `d-hej-da-bilen` |
| | En gång till! *(muren blandas om)* · Apa! · Apelsin! · Ananas! · Ko. · Vilken ska bort? · Vilken börjar inte på A? · Kon! · Ko börjar inte på A. · Hej då! | `p-engang`, …, `hej-da-1` |
| | En gång till! · Anka! · Avokado! · Ambulans! · Boll. *(blandas, muren)* · Anka! · Boll. · Ambulans! · Avokado! · Vilken ska bort? · Vilken börjar inte på A? · Bollen! · Boll börjar inte på A. · Hej då! | `p-engang`, `a23-t1`, `a32-t1`, `a35-t1`, `p-entill`, `d-boll`, `d-bollen`, `d-boll-inte`, `hej-da-1` |
| | Alla börjar på bokstaven A. · Nu dansar vi! *(discot)* · Hej då! | `a40-t1`, `d-nu-dansar` (Malin, `tagning-4.mp3`) (klippt före "Aaa!"; hela tagningen är `a40-t1-hel`), `a41-t1` |

## Det som är fast

- Tidslinjen räknas ur replikernas längd.
- Vinjettens ordning, slagen per ord (utan "Säg du"), närbilden, krit-gnistorna, den varma tonen och vinjetten (högst 0,14).
- Teckningen ska alltid likna bilden den blir. Mät bilden först och jämför teckningen och bilden på samma plats med stillbilder.
- Alla repliker är Malin ur **en** tagning (ElevenLabs v3, stability 0,5, 2026-11-18), så att rösten låter lika genom hela filmen. Blocket och filnamnen finns i `recept-1-malin-alla.txt`, originalet i `produktion/ljud-original/roster/abc-recept-1/` och replikerna i `assets/ljud/roster/alfabet/abc-recept-1/` (delade på tystnaderna, −3 dBFS). `NY` i `index.html` kopplar replikerna i `TAL` till filerna. *"Bilen!"* och *"Bil börjar inte på A."* lät fel i tagningen och är Malins tidigare (`a-film/p-bilen`, `p-bil-inte`). Inga nya fonetiska eller utdragna repliker med Malin.

## Till en ny bokstav

1. Kopiera `recept-1/` till den nya bokstavens mapp, och peka om `klossar.js` om den ska följa den delade.
2. Byt `A_DRAG` (bokstavens drag i rutan −260…260 × −330…330), `A_ROD` och replikerna i `TAL`.
3. Byt `SAKER`: tre ord på bokstaven och två udda till de två första rundorna, och tre nya ord och en udda till den tredje (som ritas inte; färdiga urklipp med `bild`). Varje sak får `platta: [ramfärg, mitten y, höjd, vridning, plattans färg]`. Höjden styr hur stor bilden blir på plattan (lägre tal ger större bild), och en vit sak behöver en färgad platta. Rita strecken efter bilden (`bild: [fil, bredd, höjd, höjd i teckningens mått, nederkant]` ger måtten), men utan ögon och kinder (de kommer med bilden).
4. Kontrollera med stillbilder: vinjetten, varje teckning bredvid sin bild, varje ord när det blir kloss, blandningen (ingen kloss går igenom en annan), muren, den udda som åker ut i båda rundorna, slutbilden och utrullningen.

## Kodens delar

- `klossar.js`: de valfria fälten `platta` (ramfärg), `bakgrund` (plattans färg), `skala` (bokstavens storlek), `tra: 'mer'`, `djup` (tunn platta), `klister` (platt klistermärke utan trä och sidor) och `kam: { x, y, zoom }` i `K.rita`. Utan dem ritar den som förut (a-film använder den).
- `index.html`:
  - `agg()` ritar en äggform (apan, ananasen).
  - `klossO()` räknar ut varje klosses läge, pop, hopp eller nick, vridning och rullning (`rull`).
  - `framsida()` gör om klossens framsida till en SVG-matris, så att saken sitter på plattan.
  - `kamTill()` lägger kamerans nyckelrutor.
  - Saker, gnistor och krita ligger i en SVG ovanpå klossarnas canvas. Golvet och skuggorna ligger under.

## Miniatyren

`recept-1/thumbnail/miniatyr-strimma.png` (färgstrimman, skill `miniatyrer`, raden `abc-a` i `verktyg/miniatyr.html`): röd strimma i A:ets färg (`#E5302A`), titeln *"A / Kritans ABC"*, cirkeln "4 min" (filmen 3:36) och apan som skrattar och vinkar, stor framför tre bildklossar (Sanna 2026-11-18: *"bigger monkey and klossar in bg"*). `thumbnail/hjalte.py` sätter ihop `thumbnail/miniatyr-utan-text.png`: apan klipps ur filmen vid 0:41 (skillnaden mot det tomma rummet vid 0:19,5), förstoras 1,42 × och ställs med en mjuk skugga framför klossarna ur leken vid 2:00, som flyttas 330 px åt höger. För en ny bokstav: ta en bildruta där första ordets sak gör sitt i närbild, byt `farg`, titelns bokstav, `tid` och `yt`. YouTube-titeln: *Kritans ABC: Bokstaven A 🐒🍊 Apa, apelsin och ananas | lilla kritan*.

## Lärdomar från B (2026-11-19, gäller nästa bokstav)

Sannas granskning av B gav de här reglerna. `../abc-b/index.html` är förlagan för dem; den frysta `recept-1/` har dem inte.

| Del | Så gör vi |
|---|---|
| Bokstaven i hörnet | Ligger **ovanpå allt** (klossar, bilder, gnistor), aldrig bakom ett torn i en närbild (feedback 3:32). Bokstavsmärket ritas i en egen canvas överst (`#bokstav`, `KB = bokstavsklossar(…)`); i `K` är den kvar men osynlig, så att måtten (`K.skarm(0, …)`) och väggskuggan fungerar. Kritan som ritar bokstaven i introt ritas i `KB`, annars hamnar den under märket. |
| Ansikten på bilderna | Ögon och mun sitter mitt på sakens största yta, mätt i bilden (bananens breda mage, inte kanten; Sanna: *"fix banana face"*). Kontrollera med en stillbild i närbild. |
| Närbildsreaktioner | Figuren i första ordet (B: björnen) reagerar i närbild när något händer: kameran går nära dess kloss (lite mot det den tittar på), den får ett uttryck och en pose, klossen nickar och den låter (`reaktion()`: `ansikte`, `pose`, `ljud`, `mot`, `tillbaka`). En när en ny udda kloss kommer (förvånad), en när den udda åker ut (jätteglad, hurra). Varje händelse får sitt reaktionsslag, så att små barn hinner med. |
| Sakernas ljud | Varje sak har ett eget ljud (`LAT`: brum, vick, wiii, mu, pip …) som hörs efter ordet, när klossen hoppar till, och när den snurrar i dansen. Figuren brummar i sina närbilder (`BRUM(k)`). Ljuden ligger i klippet, inte i musiken. |
| Discot | Figuren hoppar ur sin kloss och dansar **stor** mitt på golvet (skala 1,15, riggens `dansa`, ett gung på två slag). Klossarna bygger två torn bredvid den, **en i taget** på vartannat slag, med ett varv i luften och sitt eget ljud. Närbild på den som dansar, alla hoppar tillsammans, figuren hoppar tillbaka in i klossen, och sedan bygger alla en **pyramid** mitt i bild (tre, två, en) med figurens kloss överst. Inga klistermärken vid kulan (feedback 3:27: de tävlade med dansen). I stället **dansgolv och sken**: golvet blir rutor i perspektiv som alla lyser svagt i pastell och några i taget lyser upp i en mjuk båge över takten, fem färgade ljuskäglor från kulan svajar sakta, ljusfläckar och ljusprickar på väggen, lite varmare ton. Allt bakom klossarna, inget blinkar (efter 006:s `discoljus.js`). |
| Outrot | Klossarna rullar åt höger kant över kant i **jämn fart hela vägen ut ur bild**, den högra först och en halv sekund isär (när de stannade och hoppade hann nästa ikapp och gick in i den). Medan den sista rullar ut hoppar bokstavsmärket från hörnet till mitten, stort (sidan 470), med gnistor och ett pling, och står kvar en stund innan allt tonar ut. Bokstaven sist. Discotagningen (20,8 s) tar slut under utrullningen, så introts bädd (`gissa-bad.m4a`) tonar in mjukt och bär slutet. |

## Bokstäver gjorda med receptet

- **A, omgjord** (2026-11-19): `../abc-a/`, byggd ur `../abc-b/index.html` med A:ets innehåll (apan `apan-alfons`, apelsinen och ananasen; bilen och kon udda; anka, avokado, ambulans och den udda bollen), samma repliker (Malins `abc-recept-1/`, *"Bilen!"* och *"Bil börjar inte på A."* ur `a-film/`) och färger. Lärdomarna från B är med: A-märket i eget lager överst, apans närbildsreaktioner (`reaktion()`), sakernas ljud (`LAT`), discot och outrot. Apan har ingen egen röst i ljudbanken, så den låter med ett ordlöst babbel (`hej-babbel`) och "oj oj" (`APA` i `index.html`). Den frysta `recept-1/` är orörd.

- **B** (2026-11-18): `../abc-b/`. Björnen (riggen `bjornen-bulle`), bananen och ballongen ritas; de udda är kon och ankan; tredje rundan bi, buss och boll med den udda apelsinen som rullar ut. B:et är korta raka drag (klossar.js ritar bara raka streck), blått `#2E78D2`. Introt: *"B som i boll. B, b, boll!"* (stoppljud kan inte dras ut). Manuset för Malins tagning: `../abc-b/malin-b.txt`; tills den finns läser scenen datorrösten ur `abc-b/platshallare/` (`ROST` i `index.html`). Granskad och putsad 2026-11-19 (se *Lärdomar från B* ovan).
- **C** (2026-11-19): `../abc-c/`. Sanna valde cykel, citron och cirkel (alla med s-ljudet) och ingen figur: cykeln är första ordet och tar björnens närbildsreaktioner (klossen hoppar, cykeln rullar fram och tillbaka på plattan med snurrande hjul, `hjulC`, och ringer i klockan). De udda: bollen (studsar iväg) och ankan. C har få ord som små barn känner, så tredje rundan är de tre C-klossarna och apelsinen (rund och gul som citronen och cirkeln), som rullar ut under muren. Discot utan figur: klossarna snurrar en i taget, närbild på cykeln, en pyramid två och en. C:et är ett drag, lila `#8E5BD0`. Introt: *"C som i cykel. C, c, cykel!"* Citronen och cirkeln är nya bilder ur Flow (`rekvisita/citron.md`, `cirkel.md`). Manuset för Malins tagning: `../abc-c/malin-c.txt`; tills den finns läser scenen datorrösten (Alva) ur `abc-c/platshallare/`.
- **D** (2026-11-19): `../abc-d/`. Dinosaurien (riggen `dinon-disa`, `RIGG_SKALA` 0,74), dockan och dörren ritas; de udda är grisen och ankan; tredje rundan delfin, druvor och duva med den udda bilen. Dinon har ingen röst i ljudbanken, så den låter med `brum-glad` och dunsar när den hoppar (`LAT` och `BRUM` i `index.html`). Dörren är en ny dörr utan julkrans (`rekvisita/dorr-abc.md`); delfinen, druvorna och duvan är nya bilder ur Flow, duvans öga ritas i kod. D:et är orange `#E0803A`. Introt: *"D som i docka. D, d, docka!"* Discot som B: Disa hoppar ur sin kloss och dansar, klossen står tom så länge. Manuset för Malins tagning: `../abc-d/malin-d.txt`; tills den finns läser scenen datorrösten (Alva) ur `abc-d/platshallare/`.
