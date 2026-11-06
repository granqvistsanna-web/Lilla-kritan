# QA karaktärer – avsnitt 014 · Gröna sången (2026-11-06)

**Omdöme: revise.** Lova, Pip, Gurra, Kajsa och Fia är on-model i ansiktet och formen, ingen figur snurrar eller vänds, ratten syns i alla traktorbilder (också med armarna uppe) och armarna är lugna efter dagens ändring. Kvar: Lovas svans är grön, Gurra är halvt avskuren i bondgårdens tvåbild, figurerna är för små i ärtskidan, och mellanspelet 2:01–2:17 står nästan still.

Granskat: `film/avsnitt-014-grovklipp.mp4` (3:37,4, --snabb 960×540, ljud med, byggt efter ljud- och armändringarna) varannan sekund, 109 bilder, plus stillbilder i full storlek av 14h. Rörelse mellan bilderna och ljudet är inte bedömda. Tider är avsnittstid.

## Fynd

| Scen | Tid | Figur | Problem | Åtgärd | Allvar |
|---|---|---|---|---|---|
| bondgarden, discot, slutet | 1:50–3:32 | Lova | **Svansen är grön** med prickar, som jackan. Lovas svans ska vara sandgul `#EFCB7A` (karaktarer/leoparden-lova.md). Jackans grönfärg (`lova-jacka.png`, gor-lager.py) täcker eller färgar svansen | Ta bort svansen ur jackmasken i `gor-lager.py`, eller lägg svansen ovanpå jackan | bör |
| bondgarden | 1:52–2:18, 2:42–2:46 | Gurra | Halva Gurra är utanför vänsterkanten i tvåbilden (`CAM.TVA`), bara ögat och kinden syns | Flytta TVA ca 40 px åt vänster eller Gurra in mot bänken | bör |
| bondgarden | 2:01–2:17 | Alla | Mellanspelet (instrumentalt, 16 s) står i samma tvåbild nästan hela tiden: ingen handling, och replikerna som skulle fylla det är inte inspelade | Se förslaget i huvudsessionen (Lova leker med ärtan och tappar den) | bör |
| vagen-1, vagen-2 (refrängen) | 0:54–0:56, 1:40–1:42 | Lova, traktorn | I den stora skidan är traktorn ca 15 % av bildhöjden och Lovas ansikte går inte att läsa (regeln: 35–45 %) | Zooma in på traktorn i d/e, eller gör skidan mindre i bild | bör |
| vagen-1, vagen-2 | 0:36, 0:44–0:48, 1:22–1:34 | flaggan | I närbilderna är flaggan avskuren av överkanten (bara spetsen syns) | Sänk kameran något eller acceptera (flaggan är inte huvudsaken) | kan |
| vagen-2 | 1:20 | trafikljuset | Lampan står ovanpå traktorns flagga i övergången till refrängen | Lägg trafikljuset bakom traktorn i den bilden | kan |
| bondgarden | 1:54–2:00 | Pip | Skidan i vingen täcker Pips näbb och mun när hon pratar och räknar | Håll skidan lägre eller längre ut från kroppen | kan |
| slutet | 3:28 | Gurra | Gurra tangerar högerkanten | Flytta in 20 px | kan |
| discot | 2:52–3:24 | Alla | Pass: alla hela i bild, läsbara ansikten, Kajsa och Fia on-model, småbilderna läsbara | – | pass |
| bondgarden 14h | 2:47–2:52 | Alla | Pass efter ändringen i dag: alla tre i bild under inåkningen, Pips ansikte syns under skidan | – | pass |

## Kontroll av kravlistan

- **Lova:** on-model (sandgul äggform, bruna prickar, kodansikte), utom svansen. Ratten syns hela tiden i traktorn (0:36–1:46, 3:28–3:34). Humören passar raderna: förvånad vid grodan och trafikljuset, ledsen med tår 2:28, glad i discot.
- **Pip:** solgul, hel, sitter framför ladans röda dörr och syns. Trillar och pickar fram ärtan (2:36–2:40) utan vridning.
- **Gurra:** on-model, hoppar över vägen (1:08–1:12) och ur bild åt höger. Avskuren i tvåbilden, se ovan.
- **Kajsa och Fia:** en rörelse var i danspausen (2:56–3:00), on-model.
- **Snurrar och vänds:** ingen figur vänds eller snurrar. Traktorn kör alltid åt höger.
- **Tekniskt:** 960×540, 30 bilder/s, ljud med, 217,4 s = storyboardens längd.

**Inte gjort:** full rendering (bara --snabb), rörelsen bild för bild, ljudmixen.
