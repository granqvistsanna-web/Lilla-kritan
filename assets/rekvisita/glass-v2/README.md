# Glassarna i art direction v2

Avsnitt 005, kiosken (2026-11-08). Take 1 ur Google Flow (`original/glass-rosa-v2-1.jpg`, Nano Banana 2.1 med v1-glassen och v2-bilen som
referens), urklippt med `verktyg/egen_kant.py` → `cut/glass-rosa-v2-ra.png`. De polerade Flow-tagningarna (mer djup) kom aldrig ut ur Flow,
så djupet är lagt i kod i `gor-glass.py` (ljust uppe till vänster på kulan, mörkare nere till höger, skugga under kanten, strutens högra sida).

| Fil i `cut/` | Ruta | Vad |
|---|---|---|
| `glass-rosa.png` | 431 × 743 | skarven kula/strut på y 330 som v1 (`bilen.GLASS.rosa`) |
| `glass-gul.png`, `glass-gron.png` | 431 × 743 | kulan omfärgad |
| `glass-berg.png` | 434 × 940 | två kulor, skarven på y 525 |
| `glass-tva.png`, `glass-tre.png` | 431 × 933, 431 × 1123 | två och tre kulor (019:s kiosk): glass-rosa längst ner, kulan (struten bortplockad) 190 px upp per kula, varje ny kula framför den under (Sanna 2026-11-09) |
| `glass-strut.png` | 431 × 743 | den tomma struten (allt ovanför y 334 bort) |
| `glass-rosa-v2.png` | originalets mått | den rosa med djupet, i Flow-bildens storlek |

Kör om: `~/.claude/skills/ai-video/.venv/bin/python -I gor-glass.py`. `kontroll-kiosken.jpg` = stillbilder ur kiosken.

## Dansglassarna (019, 2026-11-09)

Fyra engångsglassar ur Google Flow (Nano Banana, `cut/glass-rosa-v2.png` som referens): glans i bilden och en slät yta mitt på kulan,
där scenen ritar ett levande ansikte (`glassAnsikte` i 019:s `scener/index.html`: blinkar, öppen mun i hoppen, ^ ^ när den landar).
Originalen i `original/dans/` (första omgången i `original/dans/forsta/`). Kör om: `~/.claude/skills/ai-video/.venv/bin/python -I gor-dans.py`
(klipper ut med `verktyg/egen_kant.py`; jordgubbsglassen kom utan vit kant, den läggs i kod).

| Fil i `cut/` | Ruta | Vad |
|---|---|---|
| `glass-jordgubb.png` | 690 × 1191 | jordgubbsrosa kula |
| `glass-hallon.png` | 680 × 1164 | hallonrosa kula med strössel överst, rinner |
| `glass-korsbar.png` | 638 × 1193 | ljusrosa kula med ett körsbär |
| `glass-hjarta.png` | 610 × 1139 | rosa kula med grädde och ett hjärta |
