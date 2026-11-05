# Discot – avsnitt 006, bild 15a–16f

Danspausen, sista refrängen i det ljusorange discot och hej då: Disa puttrar in till mitten i båten, där `../slutet/` (17, kritirisen) tar vid.
Avsnittstid 2:54.9–3:46.0 (scenen är 51,1 s), klipptid 2:43.9–3:35.0 i `sang-klippt.m4a`. Efter 005:s `discot/`, omfärgat och med 006:s figurer.

```bash
node render.mjs discot                    # → discot/discot.mp4 och discot-effekter.wav
node render.mjs discot 0.6 10.6 18 40     # stillbilder → discot/stills/
```

Tiderna läses ur SHOTS i `../../storyboard/bygg.py` (`M.bild`), måtten är bygg.py:s (`SOLO_H/FOT`, `DUO_H`, `KULA`, `IKON_BÅGE/IKON_R`,
`RAD` ur `_v_rad()`, `EGEN`, `SLUT_X/Y/H`). Bilderna ur `../lager/` (`gor-lager.py`): `disco-prickar.png` (discoplåten med ljusprickarna
och stjärnorna, samma som i `slut.png`), `discokula-orange.png`, småbilderna (`fisk`, `fagel`, `vastbild`, `apelsin`, `ikon-bat`) och
`fagel-ner.png` (vingarna nere, för fladdret).

## Bilder

| Bild | Scentid | Vad |
|---|---|---|
| 15a | 0–1,2 | "Danspaus!": rakt klipp från bryggan. Disa landar mitt i bild (boing) och dansar med armarna upp, hopp på slaget, stjärnregn runt henne |
| 15b | 1,2–9,6 | Ekot: Disa tar ett steg åt vänster och blir mindre (`DUO_H`), Agda hoppar in från höger i en hög båge och landar i höger tredjedel (boing). Båda armarna upp och hopp på slaget |
| 15c | 9,6–12,0 | "Hoppa, hoppa!": Gurra solo, armarna snett upp och ett hopp på varje slag |
| 15d | 12,0–14,3 | "Snurra runt!": Fia solo (0,3·H) flyger ett stort varv i luften på fyra slag och svävar sedan; vingarna fladdrar (fladder) |
| 15e | 14,3–16,7 | "Klappa, klappa!": Mille solo, armarna upp och tassarna slår ihop ovanför huvudet på slaget (klapp) |
| 15f | 16,7–19,1 | "Alla dansar – orange dans!": V-raden (Gurra, Disa störst och ett steg fram, Agda, Mille, Fia flyger ovanför Gurras axel). Disa och Agda armarna upp, Disa hoppar; statisterna gör sin egen rörelse |
| 15g | 19,1–28,4 | Ekot och grooven: samma rad, Disa och Agda med händerna på magen och gungar |
| 16a | 28,4–29,9 | "Fisken – orange!": Gurra hoppar, fisken hoppar i en båge bredvid honom (ett hopp på två slag). Fisken poppar upp i bågen (pop) |
| 16b | 29,9–32,2 | "Fågeln – orange!": Mille klappar, fågeln fladdrar på stället bredvid henne. Fågeln poppar upp (pop) |
| 16c | 32,2–37,3 | "Väst och apelsin och båt – orange!": Disa (0,48·H, fötterna 0,9·H) hoppar med armarna upp. Västen, apelsinen och båten poppar upp två slag isär (pop, pop, pop) |
| 16d | 37,3–39,3 | "Orange är bästa färgen": V-raden, händerna på magen |
| 16e | 39,3–41,9 | "som en fin apelsin!": samma, apelsinen i bågen gungar extra (±14° runt sin överkant) |
| 16f | 41,9–51,1 | "Hej då, hej då – tut, tut!": vattenremsan längs golvet, Disa i båten puttrar från vänster tredjedel (0,38·W) in till mitten och vinkar; båten studsar på tuten. Rakt klipp från V-raden (de andra är borta) |

**Småbilderna** är vita kritskivor (r 54) med saken i, som `ikoner()` i bygg.py, på `IKON_BÅGE`. De poppar upp (växer ur ingenting,
studsar över och lägger sig) och gungar sedan lugnt i takt. Gunget tonas bort de sista 1,5 s, eftersom `slut.png` står still.

**Kulan** snurrar åt vänster, ett varv på 9 s (rutorna ritas i kod ovanpå bilden i kulans orange toner, som i 005).

**Rörelserna** (bygg.py `EGEN`): Gurra hoppar med armarna snett upp, Fia snurrar (solo ett stort varv, i raden en liten ögla var fjärde slag),
Mille klappar med armarna upp. Disa och Agda gör radens rörelse (`upp` eller `mage`). Gurras och Agdas armar ritas framför kroppen, som
`figur()` i bygg.py gör (bakom kroppen gömdes de när de lyftes). Agda har kit-ansiktet, eftersom näbben är hennes mun.

## Övergången till slutet (17)

16f räknar båtens gung, lutning och vinkning med samma formler som `../slutet/index.html`, från scenens slut, och kör 12 px/s som slutet
de sista sekunderna. Sista bildrutan har båten på `SLUT_BAT` (W/2 − 26, 0,92·H, höjd 0,5·H), samma ställe och pose som slutets första.
Vattnet (remsan och `baten.vagor` med fart 40) är också samma.

## Ljud

boing (Disa landar i 15a, Agda i 15b), duns (Gurra, svagt), fladder (Fia i 15d, fågeln i 16b, svagare), klapp (Mille på varje slag
i 15e och svagare i 16b), pop (varje småbild), swoosh (båten glider in i 16f), tuta-tut ×2 ("tut, tut").

## Att se upp med

- **Mistluren:** Sanna väljer fortfarande ljud för båtens mistlur. Tills dess är det `tuta-tut` (bussens tuta).
- **Uppskattade tider:** rader.txt har bara radernas början. Tuten ligger på femte och sjätte slaget i "Hej då, hej då – tut, tut!",
  och västen, apelsinen och båten poppar på första, tredje och femte slaget i 16c. Lyssna och flytta `TUT`/`POP` om de inte sitter.
- **Ingen golvbild:** storyboarden har inget dansgolv (005 ritade ett rosa i kod), så discot är bara plåten.
