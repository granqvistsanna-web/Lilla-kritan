# Avsnitt 025 – Katten borstar tänderna (byggplan)

**Status:** byggplan 2026-11-11. Inget manus än. Tandborstningen behöver mer än de andra avsnitten: **en färdig rigg för katten, fler utsnitt och fler saker** (Sanna 2026-11-11: "more scenes and crops and rigs for brushing teeth", "maybe use cat"). Den här filen säger vad som ska göras och i vilken ordning. Manuset skrivs när provbilden i steg 2 är godkänd.

## Varför katten

- Vita tänder mot svart päls syns tydligt, också i en liten bild.
- Katten har v2-delar och vridpunkter (`assets/karaktarer/katten-kaj/premium/`, `kaj-rigg.json`, `rigg-test.html`) men **ingen uttryck- och posesida** än. Den ska ändå byggas, så den stora munnen och tänderna kan byggas in från början.
- Figuren har status `⏳ Inget referensark ännu`, så den är inte låst.

## 1. Riggen (skillen `lk-figur`)

| Del | Vad | Varför |
|---|---|---|
| `uttryck.html` för katten | uttrycken och poserna som de andra v2-figurerna (glad, jätteglad, förvånad, trumpen, sömnig, fnissig, stolt, riktning, vinkar, klapp) | krävs av `v2rigg('katten-kaj')` |
| **Gapet** | ny munform: ca 90 × 64 px, rundad, mörkröd insida, rosa tunga i nederkanten | dagens största mun i riggarna är 44 × 40 px, för liten för tänder |
| **Tänderna** | en rad på 4 rundade tänder uppe och 4 nere, ritade i kod inne i munnen. Varje tand har två lägen: **matt** (gräddgul, utan glans) och **blank** (vit med en liten glansprick) | *"Borsta, borsta … blank!"* byter läge på ordet |
| **Stängd tandmun** | ett brett leende där tänderna syns | belöningen: visa tänderna |
| **Gurgelmun** | litet O, kinderna rundas två gånger | gurglet |
| **Morrhår** | tre per sida, i kod, vickar lite när katten fnissar | de togs bort i v2-klippet |
| **Borstarmen** | armen framför kroppen (`-fram`-kopian) pekar in och upp. Mät hur långt handen når mot munnen | avgör borstens längd |

## 2. Provbild före manuset

En stillbild i 1920 × 1080: katten bakom handfatet, gapet med tänder, armen med en platshållare till tandborste. Tre saker ska synas:

1. Når borsthuvudet munnen med ett **långt skaft** (ca 220 px i riggens ruta)? Annars sjunker katten lite bakom handfatet, som grisen i 020.
2. Ser borsten bra ut där den korsar magen och hakan?
3. Går tänderna att läsa i halvbild, eller bara i närbild?

Sanna godkänner bilden innan något annat görs.

**Provbilden (2026-11-11):** `provbild/provbild-ark.jpg` (zoom 1, 1,6, 2,8, 4) från `uttryck.html?prov=borsta&zoom=…`. 1. Ja: med tassen framför bröstet når en borste på ca 235 px (grepp → huvud 164 px) munnen, katten behöver inte sjunka. 2. Borsten går över magen från vänstra tassen upp till munnens vänstra sida; tassens handled syns som en vit kant. 3. Tänderna läses i ansiktsbilden (2,8) och munnens närbild (4); i halvbilden (1,6) syns bara en ljus fläck. Väntar på Sannas svar.

## 3. Sakerna (med Sanna, grind 2)

| Sak | Not |
|---|---|
| **tandborsten** | tjock, barnslig, långt skaft, en stark färg som syns mot svart päls (förslag: turkos). Den kritan ritar |
| **muggen** | liten, med vatten. Kritan ritar den som andra sak |
| **tandkrämstuben** | valfri. En klick tandkräm kan i stället ritas i kod |
| **handfatet** | samma som i 023 |
| skum, tandkrämsklick, vattenstråle, bubblor, glans | i kod |

## 4. Scenerna och utsnitten

Platsen är badrummet (`badrummet-v1.jpeg`). Tandborstningen behöver fler och närmare utsnitt än 020, för allt händer i munnen. Hårda klipp mellan stillastående utsnitt, som i receptet.

| Utsnitt | Zoom (ca) | Används till |
|---|---|---|
| Helbild | 1,0 | katten kommer in, kliver upp på pallen, hej då |
| Halvbild vid handfatet | 1,6 | vill inte gapa, tack, gurglet |
| Saken som ritas | 2,4 | kritan ritar tandborsten, sedan muggen |
| Ansiktet | 2,8 | gapet öppnas, fnisset, leendet |
| **Munnen, uppe** | 4,0 | *"Först där uppe."* Bara överraden och borsthuvudet |
| **Munnen, nere** | 4,0 | *"Och där nere."* Bara underraden |
| **Frågans närbild** | 4,4 | hela munnen, alla tänder blanka utom en matt. Barnet letar |
| Muggen | 2,4 | katten dricker, vattnet sjunker |
| Spegelbilden (valfri) | 2,0 | katten ser sitt blanka leende i en rund spegel på väggen. Kräver en spegel som sak och riggen ritad två gånger |

Tre saker att prova i förhandsvisningen: att zoom 4 håller skärpan (riggen är 1024 px, kör `render.mjs` i full storlek på de utsnitten), att kokningen inte blir för grov så nära (skalan delas redan med zoomen), och att den vita kanten runt katten inte blir för tjock (`vita-kanter`).

## 5. Berättelsen (skiss)

| Steg | Innehåll |
|---|---|
| Hej | katten kommer in och vinkar. *"Hej, katten! Hej, hej!"* |
| Problemet | *"Nu ska du väl borsta tänderna?"* Katten kniper ihop munnen och skakar på huvudet. *"Katten vill visst inte gapa."* |
| Hjälpen | kritan ritar en tandborste. *"Varsågod!"* – *"Ska vi säga tack?"* – *"Tack!"* Sedan muggen |
| Leken | **kittla**: borsten kittlar på nosen, katten fnissar och får en skumklick på nosen. *"Kan du gapa stort? Aaaa!"* (barnet gapar, paus 4 s), och katten gapar |
| Lösningen | *"Borsta, borsta … blank!"* uppe, nere, och sedan den sista tanden: *"En tand är kvar. Katten vet inte var. Kan du se vilken tand det är?"* (paus 5 s, den matta tanden skimrar efter 3 s) |
| Belöningen | gurgla (*"Grrrl … ptt!"*) och visa tänderna i ett stort leende, `tindra` |
| Hej då | *"Hej då, katten! Hej då, tandborsten!"*, vinkning, kritirisen |

*"Längst in"* är struket: det går inte att visa rakt framifrån.

## 6. Kattens röst

Ny familj `mjau-gullig` (8 känslor i receptets ordning). `mjau` och `spinn` finns och kan komplettera. `spinn-fniss` är leopardens. Nya ljud: tandborstning (mjukt skrubb, prova `skrubb` först), gurgel, spott.

## Ordning

1. Uttryck- och posesidan för katten med gapet och tänderna.
2. Provbilden. **Sanna godkänner.**
3. Manuset (`manus.md`) efter 021–024.
4. Sakerna, rösten, kattens ljud, animatiken, förhandsvisningen: grindarna i skillen `bilderbok`.
