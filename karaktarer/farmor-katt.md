# Farmor

**Art:** katt (grå) · **Favoritsak:** 🐱 katt · **Status:** ⏳ Inget referensark ännu

> **Kattens rigg, omfärgad (2026-11-20, för 047 Katten åker buss; Sanna bestämde att farmor och farfar är grå katter).** Riggen ligger i [`assets/karaktarer/farmor-katt/premium/`](../assets/karaktarer/farmor-katt/premium/): alla delar i `cut/` och `farmor-faceless.png` är Kajs urklipp ([katten-kaj.md](katten-kaj.md), låst, orörd) där den mörka pälsen (luminans L < 0,55) blivit grå, g = 0,52 + L, med en svag kall ton (× 0,97 / 1,0 / 1,04) (`premium/skript/gra-katt.py`, gemensamt för båda). Rosa öron, gräddvita tassar och den vita kanten är orörda och pixlarna ligger kvar, så vridpunkterna i `farmor-rigg.json` är Kajs. Kanten mätt efter omfärgningen: 10 px i 1024-rutan som Kaj (kroppen 1,6 % av sin höjd), alltså ca 5 px i bild vid SKALA 0,5.
>
> **[`uttryck.html`](../assets/karaktarer/farmor-katt/premium/uttryck.html)** byggs av `farmor-katt/premium/skript/bygg-uttryck.py` ur Kajs sida (ändra skriptet och kör om, inte sidan): samma motor, uttryck, poser, rörelser och `?film=1`. Skillnader mot Kaj: öronen i kod är grå; **ögonen är mörka direkt på den grå pälsen** (rx 18, ry 25, glansprick, inga gräddvita ögonfläckar); bågar, bryn, lock och mun är mörka (`#3a2a24`), morrhåren vita. Samma blinkning, kinder och leende. Eget blinkfrö (31).
>
> **Tillbehör i kod (färgerna är förslag):** **runda tunna glasögon** (bruna bågar `#6e4b3e`, r 42 runt ögonen, en lätt glans i glasen) som följer ögonens höjd, och en **stickad sjal i varm rosa** (`#d98a95`, stickrader i `#b5687a`) över axlarna med en spets ner mitt fram. Kläderna ligger på kroppen och är klippta 14 px innanför dess kant, så de skymmer aldrig armarna (armarna sitter bakom kroppen, och de främre armarna ritas ovanpå). De följer kroppens sträckning och ansiktet till 40 %. Det som sitter på huvudet ligger i ansiktsgruppen och följer riktning, skakning och nickning.

## Utseende
- Form: som katten: rund äggkropp, trekantiga öron, lång svans med krok, korta ben.
- Färger: ljusgrå, nästan silver, med en kall ton och en ljus glans på huvudet; gräddvita tassar och svanstipp; rosa sjal.
- Kännetecken: glasögonen och den rosa sjalen.

## Personlighet
- Varm och lugn. Väntar på hållplatsen, vinkar, nickar och kramar.

## Röst och repliker
- Röst: ingen. Farmor säger inget (som doktorn); Malin berättar.
- Återkommande replik: –
- Ljud: ett glatt mjau när de kramas (om något).

## Cut out-delar
```delar
head-and-body, back ears (code), tail, front leg, back leg, arms (+ -fram and -klapp copies), eyes and mouth in code, accessories in code
```

## Prompt
```prompt
Grandma, a round soft light grey cat (cool silvery grey) with a thin white sticker edge, two triangle ears with pink insides, cream white paws and a cream tip on her long curled tail, small dark dot eyes behind round thin brown glasses, pink cheeks and a little smile, a soft knitted warm rose shawl over her shoulders, short stubby legs.
```
