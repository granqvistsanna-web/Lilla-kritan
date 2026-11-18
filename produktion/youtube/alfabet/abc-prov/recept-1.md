# Kritans ABC – recept 1: Klossbygget

Sparat 2026-11-18 (Sanna: *"spara detta som recept 1"*). Förlagan är skissen `../skiss-form/riktning-1.png` (riktning 1 av 3).
Den frysta scenen ligger i `recept-1/`: `recept-1/index.html` med en egen kopia av `recept-1/klossar.js`, så att
senare ändringar i `abc-prov/` eller i `../klossar.js` inte ändrar receptet. Samma dag gjordes receptet om efter Sannas
granskning (A-klistermärket, teckningar som liknar bilderna, inga utdragna ord, blandningen och utrullningen). Filmen som hör
till är `recept-1/recept-1.mp4` (en `--snabb`-förhandsvisning, 2:38). Manuset finns också som Google-dokument: https://docs.google.com/document/d/1lckHE1v6cbpN8gVKTnZHj-DOwdh-Jq5glbjWCQQQeHg/edit. De tidigare versionerna av sidan ligger i `recept-1/aldre/`.

Se den: `python3 -m http.server 8765` i repots rot, sedan http://127.0.0.1:8765/produktion/youtube/alfabet/abc-prov/recept-1/

## Formen

Allt är träklossar på ett golv. Orden blir bildklossar, och leken är en liten mur där den udda klossen åker ut.

| Del | Så ser det ut |
|---|---|
| Rummet | Papperet är väggen, och de nedersta 330 px är ett varmt, ljust golv med en mjuk kant och svaga plankstreck. Klossarna har mjuka markskuggor. |
| Klossarna | three.js-klossar med rundade kanter och mycket trä (`tra: 'mer'`: ådring, årsband och en kvist). Framsidan har en målad, krämvit platta med en färgad ram. Sidorna är bara trä. |
| Vinkeln | Alla klossar lutar lika mycket (`RX 0,2`, `RY −0,22`), och dessutom är varje kloss vriden lite åt sitt eget håll (`platta[3]`). Bilklossen är vriden åt andra hållet (0,16). |
| A-märket | Ett runt, vitt klistermärke (`klister: true`, `rund: 0`, `djup: 0.02`) med ett tjockt, rött A med kritkorn, lite snett (−0,05). Det poppar fram mitt på väggen i vinjetten och kritan ritar A:et i tre drag (kameran zoomar in). Sedan flyttar det till övre vänstra hörnet och ligger där som ett lager ovanpå bilden resten av filmen: kameran flyttar och zoomar inte det (`las` i `klossO`). Det vickar på A-orden och kommer aldrig tillbaka till mitten. |
| Orden | Teckningen ritas **mitt i bild** (`MITT` x 960) och kliver fram i närbild där (`NARA`). Teckningen har samma form, proportioner och delar som bilden den blir, mätt ur bilden i teckningens mått (apan är ett ägg med huvudet i, apelsinen har ett kort skaft och bladet snett upp åt höger, ananasen är äggformad med fem blad som en solfjäder). Frukterna ritas utan ögon och kinder; de kommer med bilden. Sedan poppar en bildkloss fram i raden till vänster på golvet (`RAD`, x 175–575, sidan 180), och saken krymper ner på plattan. Den lever kvar där: frukterna blinkar och apan vinkar. |
| Ramfärger | apa orange, apelsin grön, ananas rosa, bil blå, ko gul. Kon är pusslets ko (`produktion/youtube/pussel/bilder/cut/ko.png`) på en ljusgrön platta. |
| Blandningen | På "Nu leker vi!" hoppar de tre klossarna fram till mitten (`RC`), den högra först så att vägen är fri, och kameran går nära (1,5 ×). Sedan byter grannar plats tre gånger: den ena hoppar i en båge över, den andra glider under. Efter blandningen står apelsinen till vänster, apan i mitten och ananasen till höger. Till muren hoppar apan upp först i en hög båge, och apelsinen och ananasen glider in under den efteråt, så att ingen går igenom mittenklossen. |
| Vilken ska bort? | Apelsinen och ananasen glider ut till muren 2 × 2 (nere till vänster och höger), och apan hoppar upp ovanpå. Muren står mitt i bild. Den udda dunsar ner uppe till höger. Malin säger alla fyra orden i varje runda innan frågan, så att barnet hör hur de låter. Klossen hon pratar om nickar lite fram mot kameran (litet nog för att inte gå in i grannarna; muren har glipa 1,14). På svaret hoppar den udda upp och åt höger förbi muren, landar på golvet och glider ut. Muren står kvar. |
| Slutet | De tre bildklossarna i en rad på golvet, och A-märket sitter kvar i hörnet. I raden vrids de mer, och apan och ananasen vrids åt andra hållet. De hoppar på sina ord. Efter "Hej då!" rullar klossarna åt höger, kant över kant (de vrids bara i bildplanet, så bilderna följer med), stannar ett ögonblick och hoppar ut ur bild, den högra först. A-märket sitter kvar, och sedan tonar allt ut. |
| Kameran | Lugna inzoomningar i stilla stunder (1,4 × när A:et ritas, 1,5 × på klossarna medan de blandas, 1,3 × på muren under leken, 1,12 × i slutet). Ingen zoom när ordet sägs. Kameran går ut till hela bilden innan något flyttar sig långt, och utsnittet stannar alltid inom scenen. |

## Manus

Inga utdragna ord (Sanna 2026-11-18: det låter konstigt). Ingen "Lyssna!", ingen "Kan du gapa stort? Aaaa!" och inget "Säg du: …".

| Tid | Replik | Fil |
|---|---|---|
| 0:01.6 | Kritans ABC! | `p-abc` |
| 0:04.3 | Kritan ritar. *(A:et ritas)* | `kritan-ritar-1` |
| 0:09.1 | Det är ju A! · Bokstaven A. · A säger ah. · Kan du säga ah? | `d-det-ar-a`, `d-bokstaven-a`, `d-a-sager-ah`, `d-kan-du-saga-ah` (datorröst i `platshallare/`) |
| 0:20.4 | Hmm … | `hmm-1` |
| 0:26.1 | Vem är det? | `a03-t1` |
| 0:33.3 | Apa! | `a04-t1` |
| 0:36.1 | En apa! | `a05-t1` |
| 0:39.3 | Ja! Apa börjar på bokstaven A. | `a07-t1` |
| | Hmm … · Vad blir det? · Apelsin! · En apelsin! · Apelsin börjar också på A! | `hmm-6`, `a18-t1`, `a19-t1`, `a20-t1`, `p-ocksa-apelsin` |
| | Hmm … · Vad blir det? · Ananas! · En ananas! · Ananas börjar också på A! | `hmm-7`, `a18-t1`, `a26-t1`, `a27-t1`, `p-ocksa-ananas` |
| 1:22.7 | Nu leker vi! *(klossarna blandas och bygger muren)* | `p-nuleker` |
| | Titta! En till. · Apa! · Apelsin! · Ananas! · Bil. · Vilken ska bort? · Vilken börjar inte på A? · Bilen! · Bil börjar inte på A. · Vinka hej då till bilen! | `p-entill`, …, `p-vinka` |
| | En gång till! · Apa! · Apelsin! · Ananas! · Ko. · Vilken ska bort? · Vilken börjar inte på A? · Kon! · Ko börjar inte på A. · Hej då! | `p-engang`, …, `hej-da-1` |
| | Apa! · Apelsin! · Ananas! · Alla börjar på bokstaven A. · Hej då! | `a04-t1`, `a19-t1`, `a26-t1`, `a40-t1` (klippt före "Aaa!"; hela tagningen är `a40-t1-hel`), `a41-t1` |

## Det som är fast

- Tidslinjen räknas ur replikernas längd.
- Vinjettens ordning, slagen per ord (utan "Säg du"), närbilden, krit-gnistorna, den varma tonen och vinjetten (högst 0,14).
- Teckningen ska alltid likna bilden den blir. Mät bilden först och jämför teckningen och bilden på samma plats med stillbilder.
- Replikerna med prefixet `p-` är Malins (ElevenLabs, klippta ur en fil). De fyra `d-`-replikerna i introt är fortfarande datorröst och byts när Malin har läst dem. Inga nya fonetiska eller utdragna repliker med Malin.

## Till en ny bokstav

1. Kopiera `recept-1/` till den nya bokstavens mapp, och peka om `klossar.js` om den ska följa den delade.
2. Byt `A_DRAG` (bokstavens drag i rutan −260…260 × −330…330), `A_ROD` och replikerna i `TAL`.
3. Byt `SAKER`: tre ord på bokstaven och två udda. Varje sak får `platta: [ramfärg, mitten y, höjd, vridning, plattans färg]`. Höjden styr hur stor bilden blir på plattan (lägre tal ger större bild), och en vit sak behöver en färgad platta. Rita strecken efter bilden (`bild: [fil, bredd, höjd, höjd i teckningens mått, nederkant]` ger måtten), men utan ögon och kinder (de kommer med bilden).
4. Kontrollera med stillbilder: vinjetten, varje teckning bredvid sin bild, varje ord när det blir kloss, blandningen (ingen kloss går igenom en annan), muren, den udda som åker ut i båda rundorna, slutbilden och utrullningen.

## Kodens delar

- `klossar.js`: de valfria fälten `platta` (ramfärg), `bakgrund` (plattans färg), `skala` (bokstavens storlek), `tra: 'mer'`, `djup` (tunn platta), `klister` (platt klistermärke utan trä och sidor) och `kam: { x, y, zoom }` i `K.rita`. Utan dem ritar den som förut (a-film använder den).
- `index.html`:
  - `agg()` ritar en äggform (apan, ananasen).
  - `klossO()` räknar ut varje klosses läge, pop, hopp eller nick, vridning och rullning (`rull`).
  - `framsida()` gör om klossens framsida till en SVG-matris, så att saken sitter på plattan.
  - `kamTill()` lägger kamerans nyckelrutor.
  - Saker, gnistor och krita ligger i en SVG ovanpå klossarnas canvas. Golvet och skuggorna ligger under.
