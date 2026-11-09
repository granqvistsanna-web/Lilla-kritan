# Hunden Hugo

**Art:** hund · **Status:** ⏳ Inget referensark ännu

> **Art direction v2 (2026-11-09):** gjord som Disa (samma mjukare kritstruktur och lite djup, `dinon-disa/premium/original/disa-djup.jpg` som stilreferens), skillen `lk-figur`. Hugo står på två ben och är en **stor figur: SKALA 0,5** (kroppen ca 717 px från fötterna till äggets topp), alla delar med 10 px vit kant. Riggen ligger i [`assets/karaktarer/hunden-hugo/premium/`](../assets/karaktarer/hunden-hugo/premium/): kropp (med nosfläck och bröstfläck), hängöron, armar (`-fram`-kopior), ben och svans i `cut/`, vridpunkter i `hugo-rigg.json`, och [`rigg-test.html`](../assets/karaktarer/hunden-hugo/premium/rigg-test.html) (15 s: vinkar, går, hoppar, klappar händerna, blundar och lägger sig på sidan och sover; svansen viftar). Öron, svans och ben har lång rot i egen färg (`verktyg/langre_rot.py`, originalen i `cut/v1/`).
>
> **Konsten** (Google Flow, Nano Banana Pro, 0 krediter): `premium/original/hugo-forsta-a.jpg` (**vald**, `-b` är systertagningen) → `hugo-faceless.jpg` (nosfläcken kvar, tom) och `hugo-body-flow.jpg`.
>
> **Hängöronen** nuddar armarna utanför kroppen, så `delar.py` kan inte skilja dem. `premium/skript/delar-hugo.py` (körs efter `delar.py`) tar öronen ur den bruna färgen, hela örat även där det ligger över huvudet, och lägger dem **framför** huvudet inne i `#kropp` (så att de trycks ihop med kroppen), med konstens egen kant bara på yttersidan (ingen `tunn_kant.py` på öronen, då blir det en vit linje mot huvudet). Vridpunkt i örats rot, (350, 269) och (665, 269); öronen gungar högst ±12°. Armarna ritade med `rita-lemmar.py … 272,575,368,671 --bara arm --armlangd 0.55` (originalen i `cut/v1/`).
>
> **Ansiktet i kod:** ögon (417, 402) och (602, 401) rx 19 ry 27, kinder (387, 456) och (639, 454) rx 27 ry 16, nos en svart ellips (512, 424) rx 22 ry 14 med liten glans, mun `M512 438 L512 452 M482 452 Q497 468 512 452 Q527 468 542 452`. Nosfläcken sitter kvar i kroppen (`flackar.py` tog hela den gyllene kroppen som ljus fläck och tappade skuggningen); lyft ut den med en gräddvit tröskel när `uttryck.html` görs. Uttryck- och posesida finns inte än.

## Utseende
- Form: rund bönform, kort nos, långa hängöron som fladdrar när han springer.
- Färger: gyllene orange (`#E9A23B`) med vit nos och en vit fläck på bröstet, bruna öron.
- Kännetecken: svansen viftar nästan hela tiden, och han har en liten röd boll som han gärna har med sig.

## Personlighet
- Glad, ivrig och lekfull. Alla är hans bästa kompis. Älskar att springa och apportera.

## Röst och repliker
- Röst: glad och lite andfådd.
- Återkommande replik: *"Vov-vov, ska vi leka?"*
- Ljud: vov, flåsande, tassar som springer.

## Cut out-delar
```delar
head-and-body, front ear, back ear, wagging tail (2 positions), front leg, back leg, red ball, eyes closed, mouth open, tongue out
```

## Prompt
```prompt
Hugo the dog, a soft round bean-shaped golden orange dog (#E9A23B), a short white muzzle with a black nose, a white patch on his chest, long floppy brown ears, a wagging tail, small black dot eyes in white circles and a happy open smile, short stubby legs with black tips.
```
