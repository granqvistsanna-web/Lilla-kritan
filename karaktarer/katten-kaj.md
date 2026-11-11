# Katten Kaj

**Art:** katt · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-09):** gjord som Disa, Hugo och Hulda (`dinon-disa/premium/original/disa-djup.jpg` som stilreferens), skillen `lk-figur`. Kaj står på två ben och är en **stor figur: SKALA 0,5** (kroppen ca 694 px från fötterna till äggets topp), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/katten-kaj/premium/`](../assets/karaktarer/katten-kaj/premium/): kropp, öron, armar (`-fram`-kopior), ben och svans i `cut/`, vridpunkter i `kaj-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/katten-kaj/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna, blundar och lägger sig på sidan och sover; svansen viftar). Öron, svans och ben har lång rot i egen färg (`verktyg/langre_rot.py`, originalen i `cut/v1/`). Morrhåren är borta i v2 (de skulle klippas som egna delar); rita dem i kod om de behövs.
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): `premium/original/kaj-forsta-a.jpg` och `-b` (**vald**) → `kaj-djup.jpg` (mattare päls) → `kaj-faceless.jpg`. `kaj-body-flow.jpg` tappade skuggningen, så den används bara som form: kroppen är fasladens pixlar innanför den formen, med en ny 17 px kant innan delningen.
>
> **Gräddvita tassar:** tassarna och svanstippen är nästan vita, och `tunn_kant.py` äter vitt. De är därför värmda en aning (× 0,975 / 0,955 / 0,9) i `kaj-faceless.png` innan delningen. **Svansen** ringlar runt högerarmens tass, så `premium/skript/delar-kaj.py` (körs efter `delar.py`) delar dem på färg. Öronen ligger bakom huvudet inne i `#kropp` och gungar högst ±15°. Armarna ritade med `rita-lemmar.py … 548,588,644,684 --bara arm --armlangd 0.55`, spetsen (t > 0,84) gräddvit (originalen i `cut/v1/`).
>
> **Ansiktet i kod**, ljust på svart päls: gräddvita ögonfläckar (411, 399) och (610, 399) rx 44 ry 47 med pupill rx 19 ry 27 (lite inåt), blinkar som en helhet; glada bågar och mun i gräddvitt `#efe6d2`; rosa nos och kinder (383, 455) och (639, 454) rx 28 ry 16. FOTTER 923.
>
> **Uttryck och poser (2026-11-11, för 025):** [`uttryck.html`](../assets/karaktarer/katten-kaj/premium/uttryck.html), byggd från lejonets sida på motorn `verktyg/rigg-motor.js`. Uttryck: neutral, glad, jätteglad, förvånad, nyfiken, tänker, lite ledsen, trumpen, sömnig, fnissig (morrhåren vickar), blinkar, stolt, och för tandborstningen `gapar` (gapet ca 90 × 64 px, mörkröd insida, rosa tunga, 4 + 4 tänder), `flinar` (brett leende med tänderna) och `gurglar` (litet O, `puff` rundar kinderna). Varje tand är matt (gräddgul) eller blank (vit med glansprick): `{ ...param('gapar'), tander: [8 värden 0–1] }`, övre raden först. Tre morrhår per sida i kod (`morr` = vinkel). Pose `borstar`: vänstra tassen (bara handen, `-klapp`-kopian) framför bröstet med tandborsten mot munnen, `borstV` gnuggar. `?prov=borsta&zoom=1|1.6|2.8|4` är provbilden i badrummet bakom handfatet.

> **Tandmunnen och borstningen (2026-11-11, för 030 Borsta, borsta; Sanna godkände):** kattens sida använder nu samma kod som kaninens och pandans (`verktyg/rigg-motor.js`: `tandmun`, `tandmunRita`, `borsteBild`, `borsteRita`, `borstArm`, `provBorsta`, `borsta`); den egna kopian är borta. **Gapet är större:** 128 × 76 px (`mun: [64, 42, 0.2, 487]`, y 453–529; förut 90 × 60), ca 22 % av kroppens bredd som på de andra två, varje tand ca 27 × 27 px. Det ligger under nosen (442) och ögonfläckarna (446), mellan kinderna (411 och 611). Tandleendet 124 × 24 px (y 458–482). Morrhåren flyttar ut med gapet och börjar vid mungipan. Utseendet i övrigt är orört. **Borstningen:** borsten leds av munnen och vänstra armen följer i ett stycke, rakt upp framför kroppen, bara tassen syns (`-klapp`-kopian). Posen bär `borstX`, `borstY`, `borstNer`, `skum`, ansiktet `glimt` (glansstjärnan). `rorelse('borsta', t)` är hela borstningen (13 s); filmen tar delarna med `ROR.borsta('upp' | 'skrubba' | 'uppe' | 'nere' | 'klar', tl, d)`. **025:** `?prov=borsta` finns kvar med samma zoomvärden, men bilderna blir andra än i `avsnitt/025-katten-borstar-tanderna/provbild/` (större gap, borsten i mungipan, armen rakt upp, zoom 4 mitt på munnen); de bilderna är inte omrenderade. Nytt utsnitt `&zoom=mun`: gapet fyller en tredjedel av bildens bredd (zoom 10,0). Prov: `avsnitt/030-borsta-borsta-gulliga-djur/provbild/katt-*.jpg` och `provbild/borsta-rorelse/`.

> **Gulligare tandmun (2026-11-11, Sanna: tänderna såg arga ut, "cuter and happier", "some bubble and closed eyes"):** gapet är nu ett glatt gap med platt överkant och rund botten (`mun: [64, 52, 0.55, 477]`, samma ytterkanter som förut), små runda tänder med luft emellan (höjd 24 % av gapet), varmt rosaröd mun medan tänderna syns, större tunga och inga höjda bryn. Tandleendet `flinar` är `mun: [60, 32, 1, 456]` och visar bara övre raden (`tandNere: 0`) över tungan. Medan figuren borstar blundar den glatt och små bubblor stiger från borsten (posens `bubblor: { k, t }`, sätts av `ROR.borsta`). Jämförelse: `avsnitt/030-borsta-borsta-gulliga-djur/provbild/borsta-rorelse/5-gulligare-mun-alla-tre.jpg`.

## Utseende
- Form: rund kropp, trekantiga öron, lång svans som slutar i en krok.
- Färger: svart (`#1E1A18`) med vita tassar och en vit svanstipp. Vita cirklar runt ögonen syns tydligt.
- Kännetecken: den vita svanstippen och tre långa morrhår på varje sida.

## Personlighet
- Nyfiken och lite busig. Smyger, klättrar och vill alltid se vad som händer.

## Röst och repliker
- Röst: len och lite lurig.
- Återkommande replik: *"Mjau! Vad är det där?"*
- Ljud: mjau, spinn (purr).

## Cut out-delar
```delar
head-and-body, front ear, back ear, tail (2 positions), front leg, back leg, eyes closed, mouth open, whiskers
```

## Prompt
```prompt
Kaj the cat, a round soft black cat (#1E1A18) with a thin chalky light edge, two triangle ears, white paws and a white tip on his long curled tail, three long white whiskers on each side, small black dot eyes in clear white circles and a curious little smile, short stubby legs.
```

## Pose: sitter med blåbärshinken (012, förslag)
Kaj sitter under äppelträdet med blåbärshinken (`rekvisita/blabar.md`) framför magen, och i stoppet ställer han den i mopedens korg. Ändrar inte figuren: utseendet och huvudprompten ovan gäller.

**Ingen ny bild behövs.** `katten-kaj-body.png` och delarna i `cut/` (`katten-kaj-rigg.json`) läggs ihop i kod: hinken som eget lager framför magen, tassarna ovanpå hinkens kant, svansen med den vita tippen fri bakom. Den ljusgrå hinken syns tydligt mot den svarta pälsen.
