# Avsnitt 033 – Borsta, borsta (dinosaurier) (plan)

**Status:** plan 2026-11-11. Texten och Suno-prompten är klara ([sang.md](sang.md), [suno.md](suno.md)). Ingen tagning än: den görs med Cover på 030:s tagning. Inget är byggt, och två av de tre figurerna finns inte. Allt under "Det som måste göras först" är förslag: inga filer är skapade i `karaktarer/`, `rekvisita/` eller `assets/`, och inga bilder är gjorda.

Fjärde temat i **borstasången** (`format/borstasang.md`). Förlagan är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`): samma ord, samma form, samma bilder och klipp. Egna för 033 är bara figurerna, deras ljud, borstens färg och den roliga scenen.

| | |
|---|---|
| **Titelkort** | Avsnitt 33 · Borsta, borsta |
| **Figurer (3)** | **lila dinon** (Dinon Disa, `karaktarer/dinon-disa.md`: v2-konst och rigg finns, uttryckssidan saknas) · **gula dinon** (ny, störst) · **blå dinon** (ny). Namnen i `karaktarer/` är bara filnamn: i sången heter de efter färgen |
| **Ordning** | lila, gula, blå. Gula dinon står i vers 2, för där ligger den roliga scenen (`format/borstasang.md`) |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`). Inget platsbyte, så inget kritsvep |
| **Saker** | handfatet och pallen (finns). **En ny sak: grön tandborste**, görs med Sanna. Den stora borsten är samma bild, förstorad i scenen (förslag nedan) |
| **I kod** | tänderna (matt → vit), skum, glansstjärnan |
| **Ljud i klippet** | tre mjuka dinoläten, ett per figur (**saknas i ljudbanken**, se nedan) · `dunk` till stegen (finns) |
| **Utsnitt (3)** | helbild · ansiktet (2,8) · munnen (4,0) |
| **Nytt i riggarna** | uttryckssida för alla tre med tandmunnen (`gapar`, `flinar`, `tander`) och posen `borstar`, ur den delade koden i `verktyg/rigg-motor.js`. Större tänder och större borste för gula dinon |
| **Favoriter** | 🦕 dinosaurie · 👅 mun (gapa) |
| **Barnet övar på** | gapa stort · peka på tänderna · färgerna lila, gul och blå · liten och stor |

## Sången mot bilden
Se tabellen "Bilden på orden" i `format/borstasang.md`. Egen för 033 är bara den roliga scenen.

**Den roliga scenen (vers 2 och refräng 2): borsten är för liten för de stora tänderna.**

| När | Bild | Utsnitt |
|---|---|---|
| Gapa stort! | gula dinon öppnar en bred mun: fyra stora, runda tänder uppe och fyra nere, alla matta | ansiktet (2,8) |
| mellanspelet (ca 6 s i 030:s tagning) | ett mjukt, mörkt "rar". Den lilla gröna borsten gnuggar på **en** tand och är mindre än tanden. Dinon stannar och tittar på tittaren | ansiktet (2,8) |
| mellanspelet, andra halvan | lila dinon kommer in från vänster med den stora gröna borsten, som är nästan lika lång som hon själv, och räcker över den. Gula dinon lägger den lilla på handfatet | helbild |
| Borsta, borsta tänderna! | den stora borsten gnuggar, och den räcker över hela raden | ansiktet (2,8) |
| Borsta uppe! / Borsta nere! | som vanligt: en tand i taget blir vit | munnen (4,0) |
| Rena tänder! | brett tandleende med de stora vita tänderna, **en** glansstjärna. Scenen är slut | ansiktet (2,8) |

Inget mer än detta. Tänderna är runda som sockerbitar, aldrig spetsiga. Lätet är mjukt och kort, inget vrål. Lugn rörelse: inga hopp, borsten byts med ett lugnt överräckande. Vers 3 använder den lilla borsten igen, och den passar.

## De tre dinosaurierna

De ska gå att skilja åt utan namn, med ett ord som en 2-åring ser och kan säga.

**Förslag (det som står i sången): färgen.** *lila dinon, gula dinon, blå dinon.*
- Tre lika långa ord (två stavelser + "dinon"), så att alla tre verserna sjungs likadant.
- Färger är det barnen redan övar på i färgsångerna, och färgen syns i varje utsnitt, också i närbilden på munnen.
- Ingen av dem är grön, så den gröna borsten syns mot alla tre.
- Storleken visas i bilden i stället: lila dinon är minst och står på pallen, gula dinon är störst.

**Alternativ: storleken.** *lilla dinon, stora dinon, långa dinon.*
- Fördel: "stora dinon" förklarar skämtet i ordet (stor dino, stora tänder, stor borste).
- Nackdelar: "långa dinon" kräver en lång hals, och då når inte armen med borsten upp till munnen. Figuren blir svårare att rigga, och halsen som böjer sig ner blir en andra rolig scen, vilket receptet inte vill ha. "lilla" och "lila" låter också nästan likadant när de sjungs.

Alla tre är samma sorts figur: en rund klump där huvud och kropp är en form, på två ben, vänd mot tittaren, som Disa. Då sitter munnen där armen når, och Disas rigg och mått går att utgå från.

| | Sägs | Färg | Känns igen på | Storlek i bild |
|---|---|---|---|---|
| 1 | lila dinon | lila `#B9A2E0`, taggar `#8E72C9` (finns) | raden av runda taggar längs ryggen | minst, står på pallen |
| 2 | gula dinon | varmt gul `#FFD84A` (husets gula), ljusare gul mage, mörkare gul på horn och svans (förslag `#E0A92E`) | bredast och störst, tre små runda horn som bullar på huvudets topp, bred mun | störst, ca 1,3 × lila dinon |
| 3 | blå dinon | klarblå (förslag `#5B9BD5`), ljusblå mage, mörkare blå kam (förslag `#3F78B5`) | en mjuk rund kam mitt på huvudet, som en liten våg, och lång smal svans | mitt emellan |

## Det som måste göras först

### 1. Figurerna (med Sanna, skillen `lk-figur`)

**Lila dinon (Dinon Disa) – finns till största delen.** `karaktarer/dinon-disa.md` säger "inget referensark ännu", men v2-konsten är vald och riggen finns i `assets/karaktarer/dinon-disa/premium/` (delar i `cut/`, vridpunkter i `disa-rigg.json`, `rigg-test.html`), och ansiktets mått är tagna. Ingen ny bild behövs. Det som saknas:
- **`uttryck.html`** (uttryck och poser i den delade motorn, som kaninens och pandans), med tandmunnen och posen `borstar`.
- Armarna är korta (omritade med `--armlangd 0.55`). Borstarmens vridpunkt får glida in över magen som på katten (`BORST_IN`), annars når inte borsten munnen. Avgörs på provbilden.

**Gula dinon (ny).** Den största av de tre: en bred, rund, lite sned äggklump i varmt gult, ljusare gul mage, tre små runda horn som bullar i rad på huvudets topp, en kort tjock svans, korta armar och korta ben med stora platta fötter. Bred mun, så att de stora tänderna får plats. Snäll och lite förvånad, aldrig läskig. Första tagningen (Google Flow, Nano Banana, bild 1 = `assets/karaktarer/dinon-disa/premium/original/disa-djup.jpg` som stil- och släktreferens):

```prompt
Image 1 is a STYLE and family reference: a little lilac dinosaur. Copy its drawing technique exactly (premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, a soft even fill with fine paper grain, slightly lighter at the top and slightly deeper at the bottom, NO dark outline, a THICK, clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker). Draw a NEW dinosaur from the same family, bigger and wider than the one in Image 1: one big, wide, round, slightly lopsided egg-shaped blob where head and body are one shape, warm sunny yellow (#FFD84A) with a lighter pale yellow tummy, three small round bumps in a row on the very top of the head like little buns in a deeper golden yellow (#E0A92E), a short thick tail in the same deeper yellow peeking out at the lower right side. CUTE FACE: two medium black oval eyes set wide apart, each with one tiny white shine dot, soft pink round blush cheeks and a wide, gentle closed smile. No teeth, no claws, no spikes, nothing sharp. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded nubs held slightly out from the body with a clear gap, the two legs are separate and slightly apart with big flat oval feet, nothing overlapping the tummy. Friendly, soft and gentle, not scary at all, for 2-year-olds. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

**Blå dinon (ny).** Lite högre och smalare än lila dinon: en rund äggklump i klarblått, ljusblå mage, en mjuk rund kam mitt på huvudet som en liten våg, en lång smal svans som svänger ut åt sidan, korta armar och korta ben med stora platta fötter. Glad och nyfiken. Samma referens som ovan:

```prompt
Image 1 is a STYLE and family reference: a little lilac dinosaur. Copy its drawing technique exactly (premium, well-crafted toddler picture-book illustration in soft wax crayon and oil pastel, neat and controlled, a soft even fill with fine paper grain, slightly lighter at the top and slightly deeper at the bottom, NO dark outline, a THICK, clean, even, smooth white sticker border all around the whole silhouette like a die-cut vinyl sticker). Draw a NEW dinosaur from the same family, a little taller and slimmer than the one in Image 1: one round, slightly lopsided, tall egg-shaped blob where head and body are one shape, clear bright blue (#5B9BD5) with a pale light blue tummy, ONE soft rounded crest standing on the middle of the top of the head like a small smooth wave in a deeper blue (#3F78B5), a long slim tail in the same deeper blue curving out at the lower right side with a rounded tip. CUTE FACE: two medium black oval eyes set a little wide apart, each with one tiny white shine dot, soft pink round blush cheeks and a small happy closed smile. No teeth, no claws, no spikes, nothing sharp. BUILT FOR CUT-OUT ANIMATION: both arms are short rounded nubs held slightly out from the body with a clear gap, the two legs are separate and slightly apart with big flat oval feet, nothing overlapping the tummy. Friendly, soft and gentle, not scary at all, for 2-year-olds. Standing, facing the viewer, centered, full body with space around, on a pure solid white background, no shadow, no ground, no text.
```

För båda nya, efter att Sanna valt en tagning: plattare version, utan ansikte, bara kroppen, delar med lång rot (`verktyg/langre_rot.py`), rigg-json, ansiktet mätt med `ansikte_matt.py`, `uttryck.html`, kanten ca 1 % (`tunn_kant`). Sedan `karaktarer/<filnamn>.md` efter `karaktarer/_mall.md` och en rad i `karaktarer/README.md`. Filnamnen bestäms med Sanna (förslag: `dinon-gul`, `dinon-bla`, utan egennamn, eftersom de aldrig sägs).

### 2. Tandmunnen på en dino framifrån

Koden finns redan och är gemensam: `tandmun()`, `tandmunRita()`, `borsteBild()`, `borsteRita()` och `provBorsta()` sist i `verktyg/rigg-motor.js` (gjord för kaninen och pandan i 030). Den ger samma parametrar som kattens `assets/karaktarer/katten-kaj/premium/uttryck.html`:

- **`gapar`**: munnen öppnas till en rundad ruta, ögonen blir lite större, ögonbrynen åker upp. Fyra tänder längs överkanten och fyra längs underkanten, klippta av munnens form, mot en mörk munhåla.
- **`flinar`**: det breda, låga tandleendet där raderna möts. Används på "Rena tänder!" och "Där är de!".
- **`tander: [8]`**: en siffra per tand, 0 matt (gulbeige) … 1 vit med en liten glanspunkt. De fyra första är övre raden, de fyra sista undre. Sätts per scen: `{ ...param('gapar'), tander: [...] }`.
- **`borstar`** (pose) med `borste` och `borstV` (gnuggar).

Per figur behövs munnens mått `[rx, ry, d, my]`, färgen på munnens kontur (`kant`) och en provbild (`?prov=borsta&zoom=1|1.6|2.8|4`):

| Figur | Gapet (förslag, mäts på provbilden) | Att se upp med |
|---|---|---|
| **Lila dinon** | ca 90 × 60 px, som pandans. Munnen sitter på (514, 470), leendet går från x 477 till 551 | Kort arm: borsten når kanske inte munnen utan `BORST_IN`. Kontur i mörklila `#8E72C9` |
| **Gula dinon** | ca 150 × 90 px, tydligt bredare än de andras | **De stora tänderna.** Tandens bredd följer munnen (`1.7 · rx / 4`, alltså ca 32 px här mot ca 19 px på pandan), men höjden är låst till högst 17 px i `tandmunRita`. Gör taket till ett värde per figur (17 som förval, ca 30 för gula dinon), så blir tänderna stora och nästan kvadratiska, med runda hörn. Ljus kropp: de vita tänderna behöver den mörka munhålan och en mörkare gul kontur. De matta tänderna (gulbeige) får inte flyta ihop med den gula kroppen: prova, och gör de matta lite gråare om det behövs |
| **Blå dinon** | ca 90 × 60 px | Inget särskilt. Kontur i mörkare blå |

Fortfarande åtta tänder på alla tre, så att `tander: [8]`, scenfilen och tiderna är desamma som i 030. Skillnaden är bara storleken.

Enligt 030:s provbilder läses enskilda tänder först vid zoom 2,8 och 4,0. Gula dinons tänder är större och kan läsas redan vid 1,6, vilket hjälper skämtet i helbild.

### 3. Tandborstarna (ny sak, görs med Sanna)

Inget är tillagt i `rekvisita/` och ingen bild är gjord. Förslag:

- **Namn:** `rekvisita/tandborsten-gron.md`, bilder i `assets/rekvisita/tandborsten-gron/`.
- **Den lilla (vanliga) gröna:** exakt samma form som den turkosa (`rekvisita/tandborsten.md`), så att greppet, storleken (skaftet ca 220 px i riggens ruta) och `borstV` är desamma. Skaftet klargrönt (förslag `#4FA34A`, trädens gröna i art direction v2), borsten vit med ljust himmelsblå topp `#BFE3F2`.
- **Den stora:** samma bild, ca 1,8 gånger så stor i scenen (skaftet ca 400 px). Ingen egen bild och ingen egen sak. I koden är borstens skala i dag en fast siffra (`TANDMUN.sk`, 0,28): den behöver kunna sättas per pose. Den vita kanten får inte bli tjockare av förstoringen: följ kantregeln (3 px + 1 % av höjden, `verktyg/kant.js`).
- **Enklaste vägen (0 bilder):** färga om det färdiga urklippet `assets/rekvisita/tandborsten/cut/tandborsten.png` i kod, bara skaftets turkos byts mot grönt. Turkos och grönt ligger nära varandra, så välj en tydligt gräsgrön.
- **Om Sanna hellre vill ha en ny ritad bild:** Google Flow, Nano Banana, med den turkosa som formreferens och pallen som stilreferens. Klipp med `verktyg/egen_kant.py`, kanten ca 1 % (`tunn_kant`).

```prompt
Image 1 is the design reference: the same chunky toddler toothbrush, same shape, same size, same side view, lying horizontally with the head on the left. Image 2 is a STYLE reference only: copy its drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not its subject. Redraw the toothbrush with only the colour of the handle changed: a long, thick, softly rounded handle in bright fresh grass green (#4FA34A) that is a little wider towards the right end, a short slim neck in the same green, and on the left end a small head with one neat chunky block of soft bristles standing straight up, the bristles in white with a pale sky blue top (#BFE3F2). Bold and simple like a toy, about five times as long as it is tall. No toothpaste, no water, no text, no logo, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole toothbrush. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```

### 4. Ljuden i klippet

Ljudbanken (`assets/ljud/effekter/`) har inget dinoläte. `ryt-gasp` är lejonungens och är 3 s, för långt och fel djur.

| Ljud | Var | Finns? |
|---|---|---|
| litet, ljust "rar" (lila dinon), ca 0,6 s | mellanspelet efter vers 1 | **saknas** |
| mjukt, mörkt, runt "rar" (gula dinon), ca 0,8 s, mer brum än ryt | mellanspelet efter vers 2 | **saknas** |
| glatt "rar" i mellanläge (blå dinon), ca 0,6 s | mellanspelet efter vers 3 | **saknas** |
| `dunk` (ett stamp) | när en dino går in, lågt | finns (4 varianter) |
| borstljudet och glansen | refrängerna | samma som 030 väljer |
| ett litet "plink" när den lilla borsten gnuggar den stora tanden, och ett mjukt svep när den stora räcks över | den roliga scenen | välj ur banken när scenen byggs (t.ex. `pop`, `swoosh`), annars utan |

Sök först på Openverse (CC0/BY). Ett snällt tecknat dinoläte är svårt att hitta där, så troligen blir det ElevenLabs SFX, vilket kostar krediter: fråga Sanna först. Förslag på filnamn: `dino-rar-ljus`, `dino-rar-mork`, `dino-rar`. Förslag på prompter:

```
A tiny cute baby dinosaur says one short soft happy "rawr", high and small, friendly cartoon voice, gentle, not scary, no growl, no echo, dry, 0.6 seconds
A big gentle friendly cartoon dinosaur says one short soft low "rawr", warm and round like a sleepy hum, quiet, not scary, no roar, no growl, no echo, dry, 0.8 seconds
A small friendly cartoon dinosaur says one short cheerful "rawr", mid pitch, soft and playful, not scary, no growl, no echo, dry, 0.6 seconds
```

### 5. Övrigt som saknas
Suno-tagningen (Cover på 030) och `rader.txt` · scenfilen (receptets steg 2, byggs för 030 först) · storyboard.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer, 1 plats, 1 ny sak (gröna tandborsten, i två storlekar; högst 2 tillåtna)
- [x] En ny pose per figur: `borstar`
- [x] En fråga till tittaren med paus 4 s: *"Var är tänderna?"*, sedan visar figurerna svaret
- [x] Vardagshandling: borsta tänderna
- [x] Upprepning: samma vers och refräng tre gånger
- [x] Inget läskigt: runda tänder, mjuka korta läten, inget vrål, inga klor. Inga namn i det som sjungs, egen sång
- [x] Kompisen hjälper till: lila dinon hämtar den stora borsten (det enda borstasångsavsnittet hittills där en kompis löser något)
- [x] Går att klippa ut som Short: vers 1 + refräng (ca 25 s)
- [ ] **Ingen ritscen och inget tack** (Sanna 2026-11-11: "no kritan ritar"). Filmen börjar direkt i badrummet
- [ ] **Längden** blir ca 2 min, inte 3–4 min (medvetet, se `format/borstasang.md`)
- [ ] **Verklighetsnära läten** går inte: ingen vet hur en dinosaurie lät. Lätet är ett påhittat, mjukt "rar"
- [ ] **Två nya figurer i samma avsnitt.** Ingen regel sätter ett tak, men det är mycket nytt på en gång: två figurer ska ritas, riggas och få uttryckssida innan filmen kan byggas. De andra borstasångerna hittills har bara färdiga figurer

## Öppet
1. **Vad ska de heta i sången?** Färgen (lila, gula, blå dinon) eller storleken (lilla, stora, långa dinon)? *Rekommendation: färgen.* Lika långa ord, lätt att se i varje utsnitt, och ingen lång hals att rigga.
2. **"dinon" eller "dinosaurien"?** "Här kommer lila dinosaurien!" blir tio stavelser mot fem i "Här kommer katten!". *Rekommendation: "dinon".* Det är kort och det barn själva säger.
3. **Två nya figurer, eller Disa i tre färger?** Billigaste vägen är att färga om Disas färdiga rigg till gult och blått (0 bilder, en rigg, bara storleken skiljer). *Rekommendation: två nya figurer*, men med samma kroppsform som Disa, så att de känns igen på mer än färgen och går att använda i andra avsnitt. Vill du se filmen fort är omfärgningen ett bra första steg, och figurerna kan bytas ut senare.
4. **De nya färgerna.** Gult `#FFD84A` och blått `#5B9BD5` är förslag. Gult är också apans tandborste (032), men de möts aldrig. Ska gula dinon hellre vara orange, så att de matta tänderna syns tydligare?
5. **Vem kommer med den stora borsten?** Lila dinon bär in den (som här), eller ligger den redan på handfatet bredvid den lilla från början? *Rekommendation: lila dinon bär in den.* Det är roligare och en kompis hjälper till, men det kostar en helbild till i mellanspelet. Ligger den framme från början blir scenen ännu enklare.
6. **Gröna tandborsten:** färga om den turkosa i kod, eller en ny ritad bild? Och är `#4FA34A` tillräckligt långt från turkos? *Rekommendation: färga om i kod och titta på en provbild.*
7. **Dinoljuden:** tre nya läten i ElevenLabs (krediter), om Openverse inte ger något? Disas replik i figurfilen är "Rawr! Dunk, dunk!": ska stampet (`dunk`) höras när de går in?
8. **Dinosaurier i badrummet.** Receptet säger badrummet i alla sex. Räcker figurerna, som i 031?
9. **Suno:** Cover-tagningen av 030 har pausen ca 1 s i stället för 4 s (`030/rader.txt`). Cover ärver troligen det. Godta, eller gör om 030 först? (Samma fråga som i 031.)
10. **Disas status.** Figurfilen säger "inget referensark ännu", fast v2-konsten och riggen finns. Ska den räknas som låst (✅) när uttryckssidan är klar?
