# Avsnitt 033 – Borsta, borsta (dinosaurier) (plan)

**Status (senast, 2026-11-12 senare):** grovklipp 1 är byggt: `film/avsnitt-033-grovklipp.mp4` (2:28.6, −14 LUFS), med `scener/badet` (kopia av 030:s scen anpassad till dinosaurierna och sångens tider), `intro/` (030:s intro, samma titel) och `film/satt-ihop.sh`. Allt som i 030 runda 9: tre borstar, en färg var (lila dinon grön, röda dinon gul, blå dinon rosa), tandborstmuggen på sidobordet, glitterflygturer, tandkrämen på borsterna. **Den roliga scenen** i röda dinons vers: varv 1 en liten borste (tänderna en fjärdedel vita), "En gång till!" flyger den stora in från vänster kanten, varv 2 den stora (röda dinons egen gula borste förstorad 1,9×). Dansmellanspelet och dansslutet är kortare än i 030 (ca 4 och 7 s), tre rader utan solon. **Saknas:** lila dinon som tittar fram med den stora borsten i mellanspelet, riktiga dinoläten (lånade björn- och kaninljud tills vidare), en storyboard, slutrendering (`node verktyg/render-delat.mjs avsnitt/033-borsta-borsta-dinosaurier/scener/badet`, sedan `bash film/satt-ihop.sh film/avsnitt-033.mp4`).

**Status (förra gången, 2026-11-12):** Sanna har gjort sången i Suno (Cover på 030:s tagning 2): `sang.m4a`, **2:19.96**, tider i [rader.txt](rader.txt) (Whisper plus Suno-filens eget textspår; ~ = ej hörd). Den har **ingen instrumental intro**, ett dansmellanspel på bara ca 4 s och ett dansslut på ca 7 s (030: 11 s och 22 s), så filmen blir ca 2:29 med introt och 030:s soloscheman för discot ryms inte. Figurerna är klara som v2-riggar (lila, röda och blå dinon; röda dinons hjässa jämnades 2026-11-12), videor av dem i `provbild/*.mp4`. **Nästa:** storyboard och scen (`scener/badet`, kopia av 030:s) efter de nya radtiderna; lyssna på "Där är de!" ("du"/"dom") och på de ~-markerade tiderna först.

**Status (förra gången, 2026-11-11):** plan 2026-11-11, **version 2** av sången (dubbla refränger, sista refräng, dans, ca 2:55 med intro), trion är **lila, röda och blå dinon** (den gula är struken; dess tagningar ligger kvar i `assets/karaktarer/dinon-gul/` som bortvalda). Texten och Suno-prompten är klara ([sang.md](sang.md), [suno.md](suno.md)). **Ingen tagning görs förrän Sanna ber om det** (ingen ny musik utan hennes ord). Alla tre figurerna är riggade med tandmun och borstpose; scenen är inte byggd. Statisterna, tandborstarna och ljuden nedan är fortfarande förslag: inga filer är skapade för dem.

Fjärde temat i **borstasången** (`format/borstasang.md`). Förlagan är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`, runda 2 och tagning 2): samma ord, samma form, samma bilder och klipp. Egna för 033 är figurerna, deras tänder och ljud, borstens färg och den roliga scenen.

| | |
|---|---|
| **Titelkort** | Avsnitt 33 · Borsta, borsta |
| **Figurer (3)** | **lila dinon** (Dinon Disa, `karaktarer/dinon-disa.md`) · **röda dinon** (`karaktarer/dinon-rod.md`, störst, trehornad med sköld) · **blå dinon** (`karaktarer/dinon-bla.md`, hög, med kam). Alla tre har v2-rigg, uttryckssida, tandmun och borstpose (2026-11-11); de två nya väntar på Sannas ok. Namnen i `karaktarer/` är bara filnamn: i sången heter de efter färgen |
| **Statister (0–2, valfria)** | **orange långhalsen** och **dinobebisen i ägget**, bara i sista refrängen och dansen (Sanna: "might need more dino characters"). De sjunger inte, borstar inte och har en rörelse var |
| **Ordning** | lila, röda, blå. Röda dinon står i vers 2, för där ligger den roliga scenen |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`). Inget platsbyte, så inget kritsvep |
| **Saker** | handfatet, pallen och tandkrämstuben (`rekvisita/tandkramen.md`) finns. **En ny sak: grön tandborste**, görs med Sanna. Den stora borsten är samma bild, förstorad i scenen |
| **I kod** | tänderna (matt → halvvit → vit), skum, glans och gnistor, mjuka hopp, kawaii-ögon, slutdansen: allt som 030 runda 2 |
| **Ljud i klippet** | tre mjuka dinoläten, ett per figur (**saknas i ljudbanken**) · `dunk` till stegen (finns) · borstljud och glans som 030 (`skrubb`, `tindra`) |
| **Utsnitt (3)** | helbild · ansiktet (2,8) · munnen (4,0) |
| **Nytt i riggarna** | klart: uttryckssida för alla tre med tandmunnen (`gapar`, `flinar`, `tander`) och posen `borstar`, ur den delade koden i `verktyg/rigg-motor.js`, egna tänder per dino. Återstår: borstens storlek ska kunna sättas per figur (den stora borsten) |
| **Favoriter** | 🦕 dinosaurie · 👅 mun (gapa) |
| **Barnet övar på** | gapa stort · peka på tänderna · färgerna lila, röd och blå · liten och stor · en gång till |

## Sången mot bilden
Formen och tiderna är 030:s tagning 2 (`avsnitt/030-borsta-borsta-gulliga-djur/rader.txt`). Egen för 033 är den roliga scenen.

| Del | Bild |
|---|---|
| Förspel och öppning | alla tre står fritt i badrummet, utan handfatet framför sig. Tandkrämstuben på handfatet lägger en klick på den gröna borsten |
| Vers + mellanspel (ca 5 s) | figuren kommer fram, gapar, säger sitt "rar" |
| Refräng, varv 1 | borstar: tänderna blir halvvita |
| En gång till! | figuren nickar, ett mjukt litet hopp |
| Refräng, varv 2 | borstar: tänderna blir helt vita. "Rena tänder!": tandleende, glans och gnistor |
| Alla borstar tänderna! | alla tre borstar i rad. Statisterna kommer in från kanterna |
| Dansmellanspel (ca 11 s) | alla dansar lugnt med borstarna, tuben hoppar lite |
| Var är tänderna? … Hej då! | stängda munnar, sedan tre tandleenden ett i taget, vinkning |
| Dansslut (ca 22 s) | slutdansen med borstarna och tandkrämstuben, kritirisen sent |

### Den roliga scenen: borsten är för liten (vers 2 och dess dubbelrefräng)

| När | Bild | Utsnitt |
|---|---|---|
| Gapa stort! | röda dinon öppnar en bred mun med stora tänder, alla matta | ansiktet (2,8) |
| mellanspelet, första halvan | ett mjukt, mörkt "rar". Den lilla gröna borsten läggs mot **en** tand och är mindre än tanden. Dinon tittar på tittaren | ansiktet (2,8) |
| mellanspelet, andra halvan | lila dinon tittar fram vid vänstra kanten med den stora gröna borsten, nästan lika lång som hon själv | helbild |
| **Varv 1:** Borsta, borsta … uppe … nere | den lilla borsten gnuggar tappert, en tand i taget. Tänderna blir bara lite vitare (ca en fjärdedel) | ansiktet, munnen |
| **En gång till!** | lila dinon räcker över den stora borsten. Röda dinon lägger den lilla på handfatet | helbild |
| **Varv 2:** Borsta, borsta … uppe … nere | den stora borsten räcker över hela raden. Alla tänder blir vita i ett svep per rad | ansiktet, munnen |
| Rena tänder! | brett tandleende med de stora vita tänderna, glans och gnistor. Scenen är slut | ansiktet (2,8) |

Dubbelrefrängen passar scenen: första varvet är problemet, "En gång till!" är lösningen, andra varvet är belöningen. Inget mer än detta. Lugn rörelse, borsten byts med ett lugnt överräckande. I sista refrängen och dansen har röda dinon kvar den stora borsten.

## De tre dinosaurierna (plus två valfria)

De ska gå att skilja åt utan namn, med ett ord som en 2-åring ser och kan säga, och på både färg och form.

**Det som står i sången: färgen.** *lila dinon, röda dinon, blå dinon.* Tre lika långa ord, färgen syns i varje utsnitt (också i närbilden på munnen), och ingen är grön, så den gröna borsten syns mot alla.

**Alternativ: storleken.** *lilla dinon, stora dinon, långa dinon.* "Stora dinon" förklarar skämtet i ordet, men "långa dinon" behöver en lång hals, och då når inte armen med borsten upp till munnen. "lilla" och "lila" låter också nästan likadant när de sjungs.

| | Sägs | Färg | Form (det som syns i silhuetten) | Tänder | Storlek |
|---|---|---|---|---|---|
| 1 | lila dinon | lila `#B9A2E0`, taggar `#8E72C9` (finns) | rund päronklump med en rad runda bullar längs ryggen | små och runda, som pärlor | minst, på pallen |
| 2 | röda dinon | korallröd `#F4927C` (djupare nedtill), ljust rosa mage `#F7DACF`, sköld och svans djupare röd `#C04740`, gräddvita horn (finns) | bred och rund, med en låg sköld med prickar bakom hjässan och tre runda horn | **stora**, mjukt spetsiga uppe, runda nere | störst, ca 1,3 × lila |
| 3 | blå dinon | klarblå `#89C9EC` (djupare nedtill), ljusblå mage `#C0E5F8`, kam och svans mörkare blå `#4984BC` (finns) | hög och smal, med en rund kam som böjer sig bakåt från hjässan och en lång svans | två rundat spetsiga i mitten uppe, resten runda | mitt emellan |
| + | (statist) orange långhalsen | varmt korall-orange (förslag `#F07A5F`, som muggen) | liten rund kropp, lång mjuk hals rakt upp, litet runt huvud | visas inte | högst av alla, står längst bak |
| + | (statist) dinobebisen i ägget | turkos `#2FB5A8` i ett gräddvitt äggskal med prickar | ett halvt äggskal med ett litet runt huvud som tittar upp, en skalbit som hatt | visas inte | minst av alla, längst fram vid kanten |

Statisterna är med för att det ska bli fler dinosaurier i sista refrängen och dansen utan att berättelsen får mer än tre figurer (`format/regler.md`: högst 2 nya statister, en enkel rörelse var, ingen röst). Långhalsen gungar halsen i takt. Bebisen guppar upp och ner i skalet. Ingen av dem borstar, så de behöver varken tandmun eller borstpose.

## Det som måste göras först

### 1. Figurerna (med Sanna, skillen `lk-figur`)

**Lila dinon (Dinon Disa) – klar (2026-11-11).** Utseendet, delarna och vridpunkterna är orörda. Nytt är `assets/karaktarer/dinon-disa/premium/uttryck.html` med samma uttryck, poser och rörelser som de andra, tandmunnen med små runda pärltänder, borstposen och klapparmar. Figurfilen är uppdaterad.

**Röda dinon – klar (2026-11-11).** Sanna valde `assets/karaktarer/dinon-rod/premium/original/dinon-rod-vald.jpeg` (den gula dinosaurien ströks). Figurfilen är [`karaktarer/dinon-rod.md`](../../karaktarer/dinon-rod.md) och riggen ligger i `assets/karaktarer/dinon-rod/premium/`: skölden bakom kroppen, pannhornen och noshornet framför, de stora tänderna.

**Blå dinon – klar (2026-11-11).** Sanna valde `assets/karaktarer/dinon-bla/premium/original/dinon-bla-1.jpeg`. Figurfilen är [`karaktarer/dinon-bla.md`](../../karaktarer/dinon-bla.md) och riggen ligger i `assets/karaktarer/dinon-bla/premium/` (`uttryck.html`, `dinon-bla-rigg.json`, delar i `cut/`): samma uttryck, poser och rörelser som de andra v2-figurerna, kammen och den långa svansen släpar mjukt, och tandmunnen och borstposen kommer ur den delade koden. Det som återstår för den: Sannas ok, ett eget läte, och en sovbild om den ska sova i något avsnitt. Provbilder i [`provbild/`](provbild/):

| Bild | Visar |
|---|---|
| `bla-dinon-uttryck.jpg` | alla 15 uttryck |
| `bla-dinon-poser.jpg` | alla 19 poser |
| `borsta-bla-dinon-ansiktet.jpg` | borstningen, utsnittet ansiktet (2,8), 16 bilder ur slingan på 13 s |
| `borsta-bla-dinon-munnen.jpg` | borstningen, utsnittet munnen (4,0) |
| `bla-dinon-zoom-1.jpg`, `-1-6`, `-2-8`, `-4` | den stilla borstposen i badrummet i fyra utsnitt |

Samma ark finns för de andra två: `lila-dinon-…` och `roda-dinon-…` (uttryck, poser, `borsta-…-ansiktet`, `borsta-…-munnen` och fyra zoombilder var).

Att se upp med: **handfatet är ljusblått som dinon**, så de flyter ihop i helbild, och borsten på bilderna är den turkosa (den gröna finns inte än).

**Orange långhalsen (valfri statist).** En liten rund kropp i varmt korall-orange med en lång, mjuk hals rakt upp och ett litet runt huvud med ett glatt ansikte. Kort svans, fyra korta ben varav två syns framifrån. Delar: kropp och hals med huvud (halsen gungar från sitt fäste). Ansiktet får vara kvar i bilden, eftersom en statist inte byter uttryck.

```prompt
Image 1 is a STYLE and family reference: a little lilac dinosaur. Copy its drawing technique exactly (premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, a soft even fill with fine paper grain, NO dark outline, a THICK, clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker). Draw a NEW long-necked dinosaur from the same family: a small round slightly lopsided body in warm coral orange (#F07A5F) with a lighter peach tummy, a long, soft, thick neck going straight up from the top of the body, and a small round head on top. A short rounded tail peeking out at the lower right side, two short legs with flat oval feet. CUTE FACE on the small head: two small black oval eyes, each with one tiny white shine dot, soft pink round blush cheeks and a small happy closed smile. No teeth, no claws, no spikes, nothing sharp. BUILT FOR CUT-OUT ANIMATION: the neck is straight and clearly separate from everything else, nothing overlaps it. Friendly, soft and gentle, not scary at all, for 2-year-olds. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

**Dinobebisen i ägget (valfri statist).** Ett halvt äggskal i gräddvitt med några stora ljusa prickar och en mjukt vågig kant. Upp ur skalet tittar ett litet runt turkost huvud med ett glatt ansikte, och en liten skalbit sitter kvar som hatt. Delar: skalet och huvudet (huvudet guppar upp och ner bakom skalets kant).

```prompt
Image 1 is a STYLE and family reference: a little lilac dinosaur. Copy its drawing technique exactly (premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, a soft even fill with fine paper grain, NO dark outline, a THICK, clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker). Draw a tiny NEW baby dinosaur from the same family peeking up out of an egg: the bottom half of a big round eggshell in creamy white (#FBF4E6) with a few large soft pale turquoise dots and a softly wavy rounded broken edge at the top, and rising out of it a small round head in bright turquoise (#2FB5A8) with two tiny round arm nubs resting on the edge of the shell. One small rounded piece of creamy white eggshell sits on top of the head like a little hat. CUTE FACE: two medium black oval eyes, each with one tiny white shine dot, soft pink round blush cheeks and a small happy closed smile. No teeth, no claws, no spikes, no sharp shell edges, everything rounded. Friendly, soft and gentle, not scary at all, for 2-year-olds. Facing the viewer, centered, with space around, on a pure solid white background, no shadow, no ground, no text.
```

Statisterna, om de görs: en bild och en enkel rigg var (två delar), sedan `karaktarer/<filnamn>.md` efter `karaktarer/_mall.md` och en rad i `karaktarer/README.md`. Förslag på filnamn: `dinon-langhals`, `dinon-bebis`.

### 2. Tandmunnen på en dino framifrån

Koden finns och är gemensam, sist i `verktyg/rigg-motor.js` (`tandmun()`, `tandmunRita()`, `borsteRita()`, `provBorsta()`), med samma parametrar som kattens `assets/karaktarer/katten-kaj/premium/uttryck.html`:

- **`gapar`**: munnen öppnas till en rundad ruta mot en varmt rosaröd munhåla. Fyra tänder längs överkanten och fyra längs underkanten, klippta av munnens form.
- **`flinar`**: det breda, låga tandleendet där raderna möts. På "Rena tänder!" och "Där är de!".
- **`tander: [8]`**: en siffra per tand, 0 matt … 1 vit. De fyra första är övre raden. Varv 1 slutar på ca 0,5, varv 2 på 1.
- **`glimt`**: glansstjärnan på tanden. **`borstar`** (pose) med `borste` och `borstV`.

Tändernas storlek följer redan gapet (bredden `1,7 · rx / 4`, höjden ca en fjärdedel av gapets höjd), så en bred mun ger stora tänder utan ny kod. Formen sätts per figur med `tandmun(id, kant, form)`: `spetsiga` ger kattens rundade spetsar och `langa` kaninens framtänder, i övre raden.

| Figur | Gapet (förslag, mäts på provbilden) | Tänderna | Att se upp med |
|---|---|---|---|
| **Lila dinon** (klar) | 136 × 77 px, samma storlek mot ansiktet som pandans | alla runda, små pärlor. Ingen `form` | Gapets underkant ligger 9 px ovanför magfläcken. Armen är kort, så dess vridpunkt glider in till borstens grepp |
| **Röda dinon** (klar) | 170 × 91 px, tydligt bredast | ca 36 × 22 px mot de andras 25–29 px breda. `form: { mjuka: [0, 1, 2, 3] }`: alla fyra uppe har en mjuk, trubbig spets, de fyra nere är runda (`mjuka` är en ny form i den delade koden; `spetsiga` såg vassa ut i den storleken) | Gapet ryms precis: överkanten 5 px under noshornet, underkanten 12 px in över magfläcken, kinderna precis utanför mungiporna. Se provbilderna |
| **Blå dinon** (klar) | 118 × 73 px, samma storlek mot ansiktet som pandans | `form: { spetsiga: [1, 2] }`: två rundade spetsar i mitten uppe | Spetsarna läses som mjuka i 4,0. Kontur `#b8545e` som pandans |

Det som håller det snällt: åtta tänder och inte fler, breda och låga, vita med en liten glanspunkt, rosaröd munhåla, glada ögon och rosa kinder hela tiden, och munnen öppnas lugnt. Inga huggtänder, ingen tunga som sticker ut, inget vrål.

Röda dinons tänder är så stora att de läses redan i helbild, vilket hjälper skämtet. De andras läses först i 2,8 och 4,0 (030:s provbilder).

**En liten kodändring behövs:** borstens skala är en fast siffra (`TANDMUN.sk`, 0,28) och längden `BORSTL` räknas ur den. Den stora borsten behöver en skala per pose eller figur (förval 0,28).

### 3. Tandborstarna (ny sak, görs med Sanna)

Inget är tillagt i `rekvisita/` och ingen bild är gjord. Förslag:

- **Namn:** `rekvisita/tandborsten-gron.md`, bilder i `assets/rekvisita/tandborsten-gron/`.
- **Den lilla (vanliga) gröna:** exakt samma form som den turkosa (`rekvisita/tandborsten.md`), så att greppet, storleken och `borstV` är desamma. Skaftet klargrönt (förslag `#4FA34A`, trädens gröna i art direction v2), borsten vit med ljust himmelsblå topp `#BFE3F2`.
- **Den stora:** samma bild, ca 1,8 gånger så stor i scenen. Ingen egen bild och ingen egen sak. Den vita kanten får inte bli tjockare av förstoringen: följ kantregeln (3 px + 1 % av höjden, `verktyg/kant.js`).
- **Enklaste vägen (0 bilder):** färga om det färdiga urklippet `assets/rekvisita/tandborsten/cut/tandborsten.png` i kod, bara skaftets turkos byts mot grönt.
- **Tandkrämstuben** har ett turkost band. Den får stå som den är: den hör till badrummet, inte till temat.
- **Om Sanna hellre vill ha en ny ritad bild:** Google Flow, Nano Banana, med den turkosa som formreferens och pallen som stilreferens. Klipp med `verktyg/egen_kant.py`, kanten ca 1 % (`tunn_kant`).

```prompt
Image 1 is the design reference: the same chunky toddler toothbrush, same shape, same size, same side view, lying horizontally with the head on the left. Image 2 is a STYLE reference only: copy its drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not its subject. Redraw the toothbrush with only the colour of the handle changed: a long, thick, softly rounded handle in bright fresh grass green (#4FA34A) that is a little wider towards the right end, a short slim neck in the same green, and on the left end a small head with one neat chunky block of soft bristles standing straight up, the bristles in white with a pale sky blue top (#BFE3F2). Bold and simple like a toy, about five times as long as it is tall. No toothpaste, no water, no text, no logo, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole toothbrush. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```

### 4. Ljuden i klippet

Ljudbanken (`assets/ljud/effekter/`) har inget dinoläte. `ryt-gasp` är lejonungens och är 3 s, för långt och fel djur.

| Ljud | Var | Finns? |
|---|---|---|
| litet, ljust "rar" (lila dinon), ca 0,6 s | mellanspelet efter vers 1 | **saknas** |
| mjukt, mörkt, runt "rar" (röda dinon), ca 0,8 s, mer brum än ryt | mellanspelet efter vers 2 | **saknas** |
| glatt "rar" i mellanläge (blå dinon), ca 0,6 s | mellanspelet efter vers 3 | **saknas** |
| `dunk` (ett stamp) | när en dino går in, lågt | finns |
| `skrubb`, `tindra` | borstljud och glans, som i 030 | finns |
| ett litet "plink" när den lilla borsten möter den stora tanden, ett mjukt svep när den stora räcks över | den roliga scenen | välj ur banken när scenen byggs (t.ex. `pop`, `swoosh`) |

Statisterna har inga läten. Sök först på Openverse (CC0/BY). Ett snällt tecknat dinoläte är svårt att hitta där, så troligen blir det ElevenLabs SFX, vilket kostar krediter: fråga Sanna först. Förslag på filnamn: `dino-rar-ljus`, `dino-rar-mork`, `dino-rar`. Förslag på prompter:

```
A tiny cute baby dinosaur says one short soft happy "rawr", high and small, friendly cartoon voice, gentle, not scary, no growl, no echo, dry, 0.6 seconds
A big gentle friendly cartoon dinosaur says one short soft low "rawr", warm and round like a sleepy hum, quiet, not scary, no roar, no growl, no echo, dry, 0.8 seconds
A small friendly cartoon dinosaur says one short cheerful "rawr", mid pitch, soft and playful, not scary, no growl, no echo, dry, 0.6 seconds
```

### 5. Övrigt som saknas
- **Sången.** Görs med Cover på 030:s tagning 2, men bara när Sanna ber om det. Sedan `rader.txt`.
- **Scenfilen.** 030:s scen (`avsnitt/030-borsta-borsta-gulliga-djur/scener/badet`) är förlagan: byt figurer, borste och ljud, och lägg till borstbytet och statisterna.
- **Slutdansen.** Rörelsen `dansa` finns i den delade motorn, och alla tre får den med sin uttryckssida. Tandkrämstuben och borstarna dansar som i 030.
- **Introt** (013:s intro i grönt med titeln, som 030:s i turkos) och **storyboard**.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer, 1 plats, 1 ny sak (gröna tandborsten, i två storlekar; högst 2 tillåtna)
- [x] Högst 2 nya statister, en rörelse var, ingen röst (långhalsen och bebisen, om de görs)
- [x] En ny pose per figur: `borstar`
- [x] En fråga till tittaren: *"Var är tänderna?"*, sedan visar figurerna svaret
- [x] Vardagshandling: borsta tänderna
- [x] Upprepning: samma vers och dubbelrefräng tre gånger
- [x] Inget läskigt: runda och rundat spetsiga tänder, mjuka korta läten, inget vrål, inga klor. Inga namn i det som sjungs, egen sång
- [x] Kompisen hjälper till: lila dinon hämtar den stora borsten
- [x] Går att klippa ut som Short: vers 1 + refräng
- [x] Längden: ca 2:55 med intro, nära regelns 3–4 min
- [ ] **Ingen ritscen och inget tack** (Sanna 2026-11-11: "no kritan ritar")
- [ ] **Pausen** efter frågan blir troligen ca 1 s, inte 4 s (ärvs av 030:s tagning). Bilden håller munnarna stängda före frågan i stället
- [ ] **Verklighetsnära läten** går inte: ingen vet hur en dinosaurie lät. Lätet är ett påhittat, mjukt "rar"
- [ ] **Mycket nytt på en gång:** två nya figurer (båda riggade nu) och upp till två nya statister. De andra borstasångerna har bara färdiga figurer

## Öppet (med rekommendation)
1. **Vad heter de i sången?** Färgen (lila, röda, blå dinon) eller storleken (lilla, stora, långa dinon)? *Färgen.*
2. **Extradinosaurier i slutet:** ingen, en eller två? *Börja utan, bygg filmen med de tre, och lägg till långhalsen först om slutet känns tomt.* Varje statist är en bild och en enkel rigg till.
3. **Blå och röda dinon:** är riggarna godkända som de är (se `provbild/`)? *Ja, om kammen, skölden, hornen och tänderna ser rätt ut för dig.*
4. **Röda dinons tänder:** mjuk trubbig spets uppe (som nu), eller helt runda? *Som nu; säg till om de ändå ser vassa ut i närbilden.*
5. **Vem kommer med den stora borsten?** Lila dinon (som här) eller ligger den på handfatet från början? *Lila dinon.*
6. **Gröna borsten:** färga om den turkosa i kod, eller en ny ritad bild? *Färga om i kod och titta på en provbild.*
7. **Dinoljuden:** tre nya läten i ElevenLabs (krediter) om Openverse inte ger något? *Ja, tre korta, efter ditt ok.*
8. **Sången:** säg till när Cover-tagningen ska göras. *Figurerna och orden (lila, röda, blå) är klara, så den kan göras när du vill.*
9. **Disas status:** ska den räknas som låst (✅) när uttryckssidan är klar? *Ja.*
