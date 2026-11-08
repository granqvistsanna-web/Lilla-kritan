# Glassarna i art direction v2

Avsnitt 005, kiosken (2026-11-08). Take 1 ur Google Flow (`original/glass-rosa-v2-1.jpg`, Nano Banana 2.1 med v1-glassen och v2-bilen som
referens), urklippt med `verktyg/egen_kant.py` → `cut/glass-rosa-v2-ra.png`. De polerade Flow-tagningarna (mer djup) kom aldrig ut ur Flow,
så djupet är lagt i kod i `gor-glass.py` (ljust uppe till vänster på kulan, mörkare nere till höger, skugga under kanten, strutens högra sida).

| Fil i `cut/` | Ruta | Vad |
|---|---|---|
| `glass-rosa.png` | 431 × 743 | skarven kula/strut på y 330 som v1 (`bilen.GLASS.rosa`) |
| `glass-gul.png`, `glass-gron.png` | 431 × 743 | kulan omfärgad |
| `glass-berg.png` | 434 × 940 | två kulor, skarven på y 525 |
| `glass-strut.png` | 431 × 743 | den tomma struten (allt ovanför y 334 bort) |
| `glass-rosa-v2.png` | originalets mått | den rosa med djupet, i Flow-bildens storlek |

Kör om: `~/.claude/skills/ai-video/.venv/bin/python -I gor-glass.py`. `kontroll-kiosken.jpg` = stillbilder ur kiosken.
