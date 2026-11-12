# Avsnitt 031 – Borsta, borsta (bondgården) (plan)

**Status (2026-11-12 senare):** scenen är förberedd men **väntar på Murekatagningen** (ingen ljudfil hittades när Sanna skickade den). `scener/badet` är 033:s scen anpassad till grisen (grön borste), kon (röd) och lammet (gul): tre delar om tolv takter med nominella tider (`DEL` och `SLUTDEL` i filen, 96 bpm, takt 2,5 s), kons tungslick i första kroken (mu + slurp), nöff, mu, bä, dansen som i 030 (sex rader med tre djursolon och tuben). Intro och `film/satt-ihop.sh` är kopior. **Nästa:** lägg tagningen som `sang.m4a`, tajma sektionerna ur ljudet (`rader.txt`), sätt `DEL`, `SLUTDEL` och `DURATION`, grovklipp med `--snabb` och `film/satt-ihop.sh`.

**Status (2026-11-12 tidigare):** Sanna vill ha den här filmen med **en låt utan sång** (instrumental, inga ord). Suno-prompten för den ligger sist i [suno.md](suno.md) ("Version utan sång"), med sektioner om fyra takter så att bilden kan hänga på dem. Väntar på Sannas tagning, som hon gör själv i Mureka (inte Suno) senare. Griser, kor och lamm saknar fortfarande `gapar`, `borstar` och (lammet) tänder i riggarna: det görs medan tagningen väntas. Den sjungna texten nedan gäller inte för den här versionen; djurens ljud och borstljudet läggs i klippet.

**Status (2026-11-11):** plan 2026-11-11. Texten och Suno-prompten är klara ([sang.md](sang.md), [suno.md](suno.md)). Ingen tagning än: den görs med Cover på 030:s tagning. Inget är byggt.

Andra temat i **borstasången** (`format/borstasang.md`). Förlagan är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`): samma ord, samma form, samma bilder och klipp. Egna för 031 är bara figurerna, deras ljud, borstens färg och den roliga scenen.

| | |
|---|---|
| **Titelkort** | Avsnitt 31 · Borsta, borsta |
| **Figurer (3)** | **Grisen Greta** (v2, riggad, ✅ referensark klart) · **Kon Kajsa** (v2, riggad, ✅) · **Lammet Ludde** (v2, riggad, ✅). Ingen av dem har tandmunnen eller posen `borstar` än |
| **Ordning** | grisen, kon, lammet. Kon står i vers 2, för där ligger den roliga scenen (`format/borstasang.md`) |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`). Inget platsbyte, så inget kritsvep |
| **Saker** | handfatet och pallen (finns). **En ny sak: röd tandborste**, görs med Sanna (förslag nedan) |
| **I kod** | tänderna (matt → vit), skum, glansstjärnan, **kons tunga** |
| **Ljud i klippet** | `assets/ljud/effekter/noff`, `mu`, `ba` (finns alla) · `slurp` till tungan (finns) |
| **Utsnitt (3)** | helbild · ansiktet (2,8) · munnen (4,0) |
| **Nytt i riggarna** | tandmunnen (`gapar`, `flinar`, `tander`) och posen `borstar` på alla tre, ur kattens `uttryck.html`. Tungan på kon |
| **Favoriter** | 👅 mun, tunga (gapa, kons tunga) |
| **Barnet övar på** | gapa stort · peka på tänderna · göra djurens ljud (nöff, mu, bä) |

## Sången mot bilden
Se tabellen "Bilden på orden" i `format/borstasang.md`. Egen för 031 är bara den roliga scenen.

**Den roliga scenen (vers 2 och refräng 2): kons tunga slickar på borsten.** I mellanspelet efter "Gapa stort!" säger kon mu, och den stora rosa tungan kommer ut och slickar en gång på borsten (slurp). På "Borsta, borsta tänderna!" slickar den en gång till och åker in. Sedan borstas tänderna som vanligt, och scenen är slut på "Rena tänder!". Lugn rörelse, två slickar och inget mer.

## Det som saknas

**Tandmunnen per figur.** Alla tre har i dag `mun` och `oppen` i sin `uttryck.html`, men inte `gapar`, `flinar`, `tander` eller posen `borstar` (med `borstV`). De finns bara hos katten (`assets/karaktarer/katten-kaj/premium/uttryck.html`). Receptets steg 1 är att flytta dem till den delade riggkoden. Sedan behöver varje figur sina mått och en provbild som kattens (`avsnitt/025-katten-borstar-tanderna/provbild/`):

| Figur | Det som behövs | Att se upp med |
|---|---|---|
| **Grisen** | ✅ klart 2026-11-12: `gapar`, större `flinar`, posen `borstar` och provbilden (`?prov=borsta&rorelse=borsta`), se `karaktarer/grisen-greta.md` | Gapet öppnas nedåt under trynet; åtta tänder räckte i den storleken (mörk kontur mot det rosa) |
| **Kon** | munnens mått · posen `borstar` · provbild · **tungan** (ny, i kod, som kattens `tunga`) | Mulen är en egen del (`kajsa-nos.png`): munnen och tänderna ska ligga på mulen och följa den i riktningsposen. Handen är en klöv, borsten hålls i klövens spets |
| **Lammet** | munnens mått · posen `borstar` · provbild | Kroppen är vit: de vita tänderna syns bara mot en mörk munhåla (`#7a2a1c`), och de matta tänderna får inte se ut som ullen. Lammet är mindre än de andra och står på pallen |

**Röd tandborste (ny sak, görs med Sanna).** Inget är tillagt i `rekvisita/` och ingen bild är gjord. Förslag:

- **Namn:** `rekvisita/tandborsten-rod.md`, bilder i `assets/rekvisita/tandborsten-rod/`.
- **Utseende:** exakt samma form som den turkosa (`rekvisita/tandborsten.md`), så att greppet, storleken (skaftet ca 220 px i riggens ruta) och `borstV` är desamma. Skaftet klarrött `#E0533D` (husets röda), borsten vit med ljust himmelsblå topp `#BFE3F2`. Rött syns mot grisens rosa, kons grädde och lammets vita.
- **Enklaste vägen (0 bilder):** färga om det färdiga urklippet `assets/rekvisita/tandborsten/cut/tandborsten.png` i kod, bara skaftets turkos byts mot rött. Då blir formen och kanten identiska.
- **Om Sanna hellre vill ha en ny ritad bild:** Google Flow, Nano Banana, med den turkosa som formreferens och pallen som stilreferens. Klipp med `verktyg/egen_kant.py`, kanten ca 1 % (`tunn_kant`).

```prompt
Image 1 is the design reference: the same chunky toddler toothbrush, same shape, same size, same side view, lying horizontally with the head on the left. Image 2 is a STYLE reference only: copy its drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not its subject. Redraw the toothbrush with only the colour of the handle changed: a long, thick, softly rounded handle in bright warm red (#E0533D) that is a little wider towards the right end, a short slim neck in the same red, and on the left end a small head with one neat chunky block of soft bristles standing straight up, the bristles in white with a pale sky blue top (#BFE3F2). Bold and simple like a toy, about five times as long as it is tall. No toothpaste, no water, no text, no logo, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole toothbrush. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```

**Övrigt som saknas:** Suno-tagningen (Cover på 030) och `rader.txt` · scenfilen (receptets steg 2, byggs för 030 först) · storyboard.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer, 1 plats, 1 ny sak (röda tandborsten; högst 2 tillåtna)
- [x] En ny pose per figur: `borstar`
- [x] En fråga till tittaren med paus 4 s: *"Var är tänderna?"*, sedan visar figurerna svaret
- [x] Vardagshandling: borsta tänderna
- [x] Upprepning: samma vers och refräng tre gånger
- [x] Verklighetsnära läten: nöff, mu, bä ur ljudbanken
- [x] Inget läskigt, inga djurnamn i det som sjungs, egen sång
- [x] Går att klippa ut som Short: vers 1 + refräng (ca 25 s)
- [ ] **Ingen ritscen och inget tack** (Sanna 2026-11-11: "no kritan ritar"). Filmen börjar direkt i badrummet
- [ ] **Längden** blir ca 2 min, inte 3–4 min (medvetet, se `format/borstasang.md`)
- [ ] **Inget problem som löses med en kompis** (medvetet, sången ska vara mycket enkel)
- [ ] **Ordningen** är grisen, kon, lammet, inte receptets "kon, grisen, lammet", så att kons scen hamnar i vers 2

## Öppet
1. **Ordningen.** Kon i vers 2 (som här), eller kon först och den roliga scenen i vers 1? Det senare bryter mot receptets "vers 2 och refräng 2".
2. **Röda tandborsten:** färga om den turkosa i kod, eller en ny ritad bild? Och är `#E0533D` rätt röd?
3. **Bondgårdsdjur i badrummet.** Receptet säger badrummet i alla sex. Ska något litet visa att det är bondgården, eller räcker figurerna (kon har redan sin koskälla)?
4. **Tungan:** två slickar, eller bara en? Och ska borsten bli blöt (en droppe i kod) eller inte alls?
5. **Tänderna på grisen:** färre och större tänder än kattens åtta, om munnen är för smal. Avgörs på provbilden.
6. **Suno:** Cover-tagningen av 030 har pausen ca 1 s i stället för 4 s (`030/rader.txt`). Cover ärver troligen det. Godta, eller gör om 030 först?
