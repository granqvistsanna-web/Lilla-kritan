# Fjärilen Fia

**Art:** fjäril · **Favoritsak:** fjäril 🦋 · **Status:** ✅ Referensark klart

## Utseende
- Form: liten. En plommonbrun kropp som en böna, fyra rundade vingar och två korta antenner med prickar i topparna.
- Färger: lavendellila vingar (`#B9A3E3`) i kraftig vaxkrita med några gula prickar (`#F6C21C`), plommonbrun kropp (`#5A3A4A`).
- Kännetecken: **stora ögon** som täcker nästan hela huvudet. Väldigt minimal, inget annat på kroppen.

## Personlighet
- Drömmande och glad. Älskar blommor och färger.
- Hittar alltid de vackraste blommorna åt sina kompisar.

## Röst och repliker
- Röst: ljus och mjuk, lite viskande.
- Återkommande replik: *"Flaxa, flaxa, fladder!"*
- Ljud: ett lätt pling när hon landar.

## Cut out-delar
```delar
body without wings, left wing pair, right wing pair (eyes and mouth are drawn in code)
```

Bilderna ligger i [`assets/karaktarer/fjarilen-fia/`](../assets/karaktarer/fjarilen-fia/): framifrån, utan ansikte och kropp utan vingar, utklippta i `cut/`. Varje sidas vingpar är en egen bild som flaxar runt vridpunkten i `fia-rigg.json`. Ögonen sitter på (444, 410) och (579, 407) med radie 50. Delarna görs med `python3 verktyg/delar.py assets/karaktarer/fjarilen-fia fia --vingar`.

## Prompt
```prompt
Fia the butterfly: small, a plum-brown (#5A3A4A) bean-shaped body with two BIG round white eyes ringed in black with big black pupils, four rounded lavender (#B9A3E3) wings in heavy streaky wax crayon with a few round yellow (#F6C21C) dots, two short antennae with dot tips, no outline, a thin uneven white rim. Very minimal: no legs, no patterns, no marks.
```
