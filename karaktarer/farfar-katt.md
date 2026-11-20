# Farfar

**Art:** katt (grå) · **Favoritsak:** 🐱 katt · **Status:** ⏳ Inget referensark ännu

> **Kattens rigg, omfärgad (2026-11-20, för 047 Katten åker buss; Sanna bestämde att farmor och farfar är grå katter).** Riggen ligger i [`assets/karaktarer/farfar-katt/premium/`](../assets/karaktarer/farfar-katt/premium/): alla delar i `cut/` och `farfar-faceless.png` är Kajs urklipp ([katten-kaj.md](katten-kaj.md), låst, orörd) där den mörka pälsen (luminans L < 0,55) blivit grå, g = 0,40 + L, med en svag varm ton (× 1,04 / 1,0 / 0,95) (`premium/skript/gra-katt.py`, gemensamt för båda). Rosa öron, gräddvita tassar och den vita kanten är orörda och pixlarna ligger kvar, så vridpunkterna i `farfar-rigg.json` är Kajs. Kanten mätt efter omfärgningen: 10 px i 1024-rutan som Kaj (kroppen 1,6 % av sin höjd), alltså ca 5 px i bild vid SKALA 0,5.
>
> **[`uttryck.html`](../assets/karaktarer/farfar-katt/premium/uttryck.html)** byggs av `farmor-katt/premium/skript/bygg-uttryck.py` ur Kajs sida (ändra skriptet och kör om, inte sidan): samma motor, uttryck, poser, rörelser och `?film=1`. Skillnader mot Kaj: öronen i kod är grå; **ögonen är mörka direkt på den grå pälsen** (rx 18, ry 25, glansprick, inga gräddvita ögonfläckar); bågar, bryn, lock och mun är mörka (`#3a2a24`), morrhåren vita. Samma blinkning, kinder och leende. Eget blinkfrö (47).
>
> **Tillbehör i kod (färgerna är förslag):** en **keps i mörkgrönt** (`#3d6b4a`, skärmen `#2a4c34`, en knapp på toppen och en söm) mellan öronen, med vit kant som allt annat, och en **stickad halsduk i senapsgult** (`#d9a52b`, resårränder) runt halsen med en knut och en hängande snibb med fransar. Kläderna ligger på kroppen och är klippta 14 px innanför dess kant, så de skymmer aldrig armarna (armarna sitter bakom kroppen, och de främre armarna ritas ovanpå). De följer kroppens sträckning och ansiktet till 40 %. Det som sitter på huvudet ligger i ansiktsgruppen och följer riktning, skakning och nickning.

## Utseende
- Form: som katten: rund äggkropp, trekantiga öron, lång svans med krok, korta ben.
- Färger: varmgrå, mörkare än farmor; gräddvita tassar och svanstipp; grön keps, gul halsduk.
- Kännetecken: kepsen och den gula halsduken.

## Personlighet
- Varm och lugn. Väntar på hållplatsen, vinkar, nickar och kramar.

## Röst och repliker
- Röst: ingen. Farfar säger inget (som doktorn); Malin berättar.
- Återkommande replik: –
- Ljud: ett glatt mjau när de kramas (om något).

## Cut out-delar
```delar
head-and-body, back ears (code), tail, front leg, back leg, arms (+ -fram and -klapp copies), eyes and mouth in code, accessories in code
```

## Prompt
```prompt
Grandpa, a round soft warm grey cat with a thin white sticker edge, two triangle ears with pink insides, cream white paws and a cream tip on his long curled tail, small dark dot eyes, pink cheeks and a little smile, a deep green flat cap between his ears and a knitted mustard yellow scarf with a hanging fringed end, short stubby legs.
```
