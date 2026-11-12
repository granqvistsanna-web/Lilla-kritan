# Ljusslingan

Den klädda [julgranens](julgran.md) ljusslinga ensam: en tunn krämvit sträng med små runda ljus, i fyra svängar, i **samma 1024-ruta som granbilden**, så den läggs med granens plats och skala. Två filer med samma form: `ljusslinga.png` (gula, tända ljus) och `ljusslinga-gra.png` (grå sträng och grå ljus som inte lyser, gjord ur den tända i kod). Ersätter de kodritade slingorna (Sanna 2026-11-12).

**I julkalendern:** lucka 22 (den grå slingan suddas bort, och kritan ritar den tända). Den vänds aldrig.

**Urklippet:** `assets/rekvisita/ljusslinga/cut/ljusslinga.png`. **Konturen:** `assets/rekvisita/ljusslinga/cut/ljusslinga-kontur.json`, en sluten bana i urklippets pixlar (bbox [206, 170, 575, 644], 90 stödpunkter), gjord med `python3 verktyg/kontur.py` (alfat krympt till färgytans kant). Kritan ritar konturen, och sedan fylls bilden i (`rita.js`).

**Bild (2026-11-12, Google Flow, Nano Banana Pro, 0 krediter):** Bild 1 = `assets/rekvisita/julgran/original/julgran-kladd-1.jpeg` (redigering). Tagning 1 vald; urklippt efter den varma färgen, kant 7 px. Konturen `ljusslinga-kontur.json` gäller båda. Tagningarna ligger i `assets/rekvisita/ljusslinga/original/`.

```prompt
Edit Image 1. Remove the Christmas tree, its trunk and all the round baubles completely, so that ONLY the garland is left: the same thin warm cream string with the same small round warm yellow lights, in EXACTLY the same place, shape, swags and size in the frame as now, drawn in the same soft grainy wax-crayon technique. Give the garland a thick, clean, even white sticker border all around it, also around each light. Everything else becomes plain pure solid white background. No tree, no green, no baubles, no star, no glow, no shine, no shading, no shadow, no text, no other changes.
```

Används i: julkalendern 2026, lucka 22 (den grå slingan suddas bort, och kritan ritar den tända).
