# Avsnitt 032 – Borsta, borsta (busiga apan) (plan)

**Status:** plan 2026-11-11. Texten och Suno-prompten är klara ([sang.md](sang.md), [suno.md](suno.md)). Ingen tagning än: den görs med Cover på 030:s tagning. Inget är byggt.

Tredje temat i **borstasången** (`format/borstasang.md`). Förlagan är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`): samma öppning, refräng och slut, samma bilder och klipp. Egna för 032 är figuren, borstens färg och buset: apan borstar örat, sedan bananen, sedan tänderna.

| | |
|---|---|
| **Titelkort** | Avsnitt 32 · Borsta, borsta |
| **Figurer (1)** | **Apan Alfons** (v2, riggad, ✅ referensark klart), ensam i alla tre verserna. Har inte tandmunnen eller posen `borstar` än |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`). Inget platsbyte, så inget kritsvep |
| **Saker** | handfatet och pallen (finns) · bananen som ligger ner (`assets/rekvisita/banan/cut/banan-ligger.png`, finns, från 022). **En ny sak: gul tandborste**, görs med Sanna (förslag nedan) |
| **I kod** | tänderna (matt → vit), skum, glansstjärnan |
| **Ljud i klippet** | `assets/ljud/effekter/fniss` (finns). **Apans eget ljud saknas** i ljudbanken |
| **Utsnitt (3)** | helbild · ansiktet (2,8) · munnen (4,0) |
| **Nytt i riggen** | tandmunnen (`gapar`, `flinar`, `tander`) och posen `borstar`, ur kattens `uttryck.html`. Två riktningar till för borsten: mot örat och ner mot bananen |
| **Favoriter** | 🍌 banan · 👅 mun (gapa) |
| **Barnet övar på** | gapa stort · peka på tänderna · säga "nej, nej" och skaka på huvudet · peka på örat |

## Sången mot bilden
Refrängen, öppningen och slutet följer tabellen "Bilden på orden" i `format/borstasang.md`. Verserna är egna:

| Rad | Bild | Utsnitt |
|---|---|---|
| Här kommer apan! (vers 1) | apan går in och tar borsten | helbild |
| Nej, nej, inte där! | apan borstar **örat**. På "Nej, nej" stannar borsten | helbild (öronen sitter för långt ut för ansiktsutsnittet 2,8) |
| (mellanspel) | apan fnissar, flyttar borsten till munnen och gapar | ansiktet (2,8) |
| Här kommer apan! (vers 2) | apan går in, en banan ligger på handfatet | helbild |
| Nej, nej, inte där! | apan borstar **bananen** på handfatet. På "Nej, nej" stannar borsten | helbild |
| (mellanspel) | apan fnissar, flyttar borsten till munnen och gapar | ansiktet (2,8) |
| Här kommer apan! (vers 3) | apan går in och tar borsten | helbild |
| Gapa stort! | rätt direkt: munnen öppnas, matta tänder syns | ansiktet (2,8) |

**Den roliga scenen** är buset i vers 1 och 2, och inget mer än det. Det går att förstå utan ord: borsten är på fel ställe, stannar och flyttas till munnen. Efter varje bus borstas tänderna som vanligt i refrängen, så refrängens bilder är 030:s. Tänderna är matta igen när apan kommer in i nästa vers (munnen är stängd tills gapet, så det syns inte).

## Det som saknas

**Tandmunnen på apan.** `assets/karaktarer/apan-alfons/premium/uttryck.html` har `mun` och `oppen`, men inte `gapar`, `flinar`, `tander` eller posen `borstar` (med `borstV`). De finns bara hos katten. Receptets steg 1 flyttar dem till den delade riggkoden. Sedan behöver apan:

| Det som behövs | Att se upp med |
|---|---|
| munnens mått för gapet och tandraden · provbild som kattens (`avsnitt/025-katten-borstar-tanderna/provbild/`) | Munnen ligger på den ljusa ansiktsfläcken och är bred (472–548 px), så åtta tänder får plats. De matta tänderna får inte smälta ihop med fläckens ljusa ton |
| posen `borstar` mot munnen | som kattens |
| **borsten mot örat** | Armarna är korta stumpar som bara syns i vila eller uppe (`GOM`, `UT`). Armen lyfts högt och borstens huvud når örat (leden i 295, 385 och 719, 381). Provbild |
| **borsten ner mot bananen** på handfatet | Armen i vila, borsten pekar ner och ut. Bananen ligger still, apan flyttar sig inte |

**Apans ljud.** Ljudbanken har inget apljud. Sök först på Openverse (CC0/BY), annars ElevenLabs (fråga före krediter). Fnisset finns.

**Gul tandborste (ny sak, görs med Sanna).** Inget är tillagt i `rekvisita/` och ingen bild är gjord. Förslag:

- **Namn:** `rekvisita/tandborsten-gul.md`, bilder i `assets/rekvisita/tandborsten-gul/`.
- **Utseende:** exakt samma form som den turkosa (`rekvisita/tandborsten.md`), så att greppet, storleken (skaftet ca 220 px i riggens ruta) och `borstV` är desamma. Skaftet klargult `#FFD84A` (husets gula), borsten vit med ljust himmelsblå topp `#BFE3F2`. Gult syns bra mot apans bruna päls.
- **Att tänka på:** bananen är också gul. När borsten ligger på bananen i vers 2 skiljs de åt av de vita kanterna och borstens vita huvud, men det behöver en provbild.
- **Enklaste vägen (0 bilder):** färga om det färdiga urklippet `assets/rekvisita/tandborsten/cut/tandborsten.png` i kod, bara skaftets turkos byts mot gult. Då blir formen och kanten identiska.
- **Om Sanna hellre vill ha en ny ritad bild:** Google Flow, Nano Banana, med den turkosa som formreferens och pallen som stilreferens. Klipp med `verktyg/egen_kant.py`, kanten ca 1 % (`tunn_kant`).

```prompt
Image 1 is the design reference: the same chunky toddler toothbrush, same shape, same size, same side view, lying horizontally with the head on the left. Image 2 is a STYLE reference only: copy its drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not its subject. Redraw the toothbrush with only the colour of the handle changed: a long, thick, softly rounded handle in bright sunny yellow (#FFD84A) that is a little wider towards the right end, a short slim neck in the same yellow, and on the left end a small head with one neat chunky block of soft bristles standing straight up, the bristles in white with a pale sky blue top (#BFE3F2). Bold and simple like a toy, about five times as long as it is tall. No toothpaste, no water, no text, no logo, no face, no shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around the whole toothbrush. Centered with space around, plain pure solid white background, no shadow, no ground, no text.
```

**Övrigt som saknas:** Suno-tagningen (Cover på 030) och `rader.txt` · scenfilen (receptets steg 2, byggs för 030 först; den behöver kunna ta samma figur tre gånger och ett bus per vers) · storyboard.

## Regelkoll (`format/regler.md`)
- [x] 1 figur, 1 plats, 1 ny sak (gula tandborsten; högst 2 tillåtna). Bananen finns
- [x] En fråga till tittaren med paus 4 s: *"Var är tänderna?"*, sedan visar apan svaret
- [x] Vardagshandling: borsta tänderna
- [x] Upprepning: samma vers tre gånger, "Nej, nej, inte där!" två gånger, samma refräng tre gånger
- [x] En sak i taget: bara borsten rör sig under buset
- [x] Inget läskigt, ingen blir ledsen eller tillrättavisad: "Nej, nej" sjungs glatt och apan fnissar
- [x] Inga djurnamn i det som sjungs, egen sång
- [x] Går att klippa ut som Short: vers 1 + refräng (ca 25 s), med buset
- [ ] **Ingen ritscen och inget tack** (Sanna 2026-11-11: "no kritan ritar"). Filmen börjar direkt i badrummet
- [ ] **Längden** blir ca 2 min, inte 3–4 min (medvetet, se `format/borstasang.md`)
- [ ] **Inget problem som löses med en kompis** (medvetet). Apan är ensam, och det är sången som säger "inte där"
- [ ] **Fler än en ny pose:** `borstar` får tre riktningar (munnen, örat, bananen). Regeln säger en ny pose per figur
- [ ] **Den roliga scenen ligger i vers 1 och 2**, inte bara i vers 2 och refräng 2 som receptet säger. Det är temats idé
- [ ] **Verserna avviker från borstasångens text**: andra raden i vers 1 och 2 är "Nej, nej, inte där!" i stället för "Gapa stort!"

## Öppet
1. **Texten i buset.** Nu sjungs *"Nej, nej, inte där! (Inte där!)"* båda gångerna, och bilden visar örat och bananen. Alternativet är att orden sjungs: *"Nej, nej, inte örat! (Inte örat!)"* och *"Nej, nej, inte bananen! (Inte bananen!)"*. Det lär ut orden men blir längre rader, som är svårare att få in i 030:s melodi.
2. **Tänderna mellan verserna.** Nu borstas de rena i varje refräng och är matta igen i nästa vers, som i 030. Alternativet är att refräng 1 och 2 bara blir halvrena och att allt blir vitt först i refräng 3, men då skiljer refrängens bilder från de andra temana.
3. **Gula tandborsten** mot den gula bananen: gul som receptet säger, eller en annan färg för apan? Och: färga om den turkosa i kod, eller en ny ritad bild?
4. **Var bananen kommer ifrån.** Förslaget är att den bara ligger på handfatet i vers 2. Ska apan i stället bära in den?
5. **Apans ljud** saknas. Ett mjukt "o-o-a-a" från Openverse, eller bara fnisset?
6. **Suno:** Cover-tagningen av 030 har pausen ca 1 s i stället för 4 s (`030/rader.txt`). Cover ärver troligen det. Godta, eller gör om 030 först?
