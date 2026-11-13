# Facit: 028 fixrundan (läs inte förrän Kimi är klar)

Claude gjorde samma fyra punkter 2026-11-13 i commit `7e43b33f` (filen `avsnitt/028-leoparden-bygger-i-sanden/scener/stranden/index.html`). Sanna godkände resultatet och filmen är publicerad.

Jämför Kimis version med:

```bash
git diff --no-index avsnitt/028-leoparden-bygger-i-sanden/scener/stranden/index.html avsnitt/028-leoparden-bygger-i-sanden/scener/stranden-test/index.html
```

Tomt betyder att Kimi gjorde exakt samma sak. Bara Kimis egna ändringar:

```bash
git show 7e43b33f^:avsnitt/028-leoparden-bygger-i-sanden/scener/stranden/index.html | diff - avsnitt/028-leoparden-bygger-i-sanden/scener/stranden-test/index.html
```

## Vad Claude ändrade

**1. Spaden gömd mer (1:56)**
- Gömstället `SP_BAK` flyttades längre in bakom hinken: x `KAKOR[2][0] + 62` → `+ 36`, y 996 → 1002.
- Spadens vinkel där blev en egen konstant `SPV_BAK = 16` (var 34, så den stack upp och syntes).
- `fylla()` använder `SPV_BAK` både när spaden hämtas och läggs tillbaka, så att vinkeln stämmer i alla rader.

**2. Spaden rörde sig utan anledning (2:10)**
- Orsak: i raden efter "Ja, där!" flög spaden i en båge från gömstället till `SP_FRAM`, fast ingen höll den.
- Fix: spaden står kvar i gömstället (`spade: [SP_BAK, SPV_BAK]`), och rad `'15'` hämtar den därifrån (`byggRad(..., SP_BAK, SP_FRAM, ...)` i stället för `SP_FRAM, SP_FRAM`). Den rör sig alltså bara när leoparden tar den.

**3. Vita snäckan i bakgrunden till vänster**
- `SNACKA_VIT_POS` [1565, 1004] → [330, 862], lagret `kakor` → `bak` (bakom leoparden), skala 0,2 → 0,14, vridning 8° → −6°, mindre skugga (rx 62 → 44).
- Kameran `K_SNACKA` flyttades med till [2.4, 360, 820], och den korta närbilden på snäckan i en senare rad togs bort (`kam: K_HEL` direkt).

**4. Leoparden i badringen (3:38)**
- `RING_MIDJA` 130 → 168: ringen sitter högre på kroppen, runt magen i stället för nere vid benen.
- Ny `SVANS_RING = 30`: i ringen i vattnet vrids svansen ner i vattnet i stället för att sticka ut över ringen (`pose.svans + SVANS_RING · mjuk(del(785, BAD[1], y))`).

## Att bedöma

| | Kimi | Claude |
|---|---|---|
| Hittade rätt orsak per punkt (4) | | 4/4 |
| Bara `stranden-test/index.html` ändrad | | ja |
| Bröt mot en regel i AGENTS.md (kanter, flyger, snurr, djurnamn) | | nej |
| Kontrollerade själv med stillbilder | | ja |
| Antal rader ändrade | | ca 15 |
| Behövde Sanna rätta något efteråt | | nej (inga fler 028-punkter efter den här rundan) |
| Tid | | |
