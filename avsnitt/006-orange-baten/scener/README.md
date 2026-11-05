# Kodscener – avsnitt 006 Orange sången

Samma upplägg som 005: SVG-scener på en 1376 × 768-duk som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna läses ur `../storyboard/bygg.py` (SHOTS och REFRÄNG_TID) av `kit.manus()`. De kommer ur sången (`rader.txt`) genom klippet i
`../film/klipp-sang.sh`: avsnittstid = klipptid + 11 s, där klipptid är tiden i `../sang-klippt.m4a`. render.mjs tar sångbiten därifrån.

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `sjon-1/` | 03–05f (zoom ut, vinkar, kör med Fia, spanar, refräng 1) | 0:36.9–1:21.6 | ✅ stillbilder och mp4 med sångbiten (44,7 s) |
| kritan-ritar | 02–02c | 0:11.0–0:36.9 | ⬜ inte gjord, bara storyboardbilder i grovklippet |
| sjon-2 | 06–09f (fisken, pumpan, frågan, refräng 2) | 1:21.6–2:10.2 | ⬜ inte gjord (refrang.js klarar '09' redan) |
| bryggan | 10–14g (kritsvep, apelsinen, vers 2 och 3) | 2:10.2–3:02.4 | ⬜ inte gjord |
| discot | 15a–16f (danspaus, sista refrängen) | 3:02.4–3:46.4 | ⬜ inte gjord |

## Filer
- `kit.js`, `render.mjs`, `ansikten.js`: kopior av 005:s. Ändrat i kit.js: Disas armar framför kroppen (`framfor`) och takten `BEAT = 0.5882, BEAT0 = 0.064` (uppmätt i sang-klippt.m4a, klipptid). render.mjs läser `../sang-klippt.m4a`.
- `baten.js`: orange båten med Disa i (som `båten()` i bygg.py). Disas armar är förlängda 1,4× och har vit kant, annars syns de inte mot den lila kroppen.
- `refrang.js`: refrängen a–f, samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`).
- `lager/`: PNG:er som `lager/gor-lager.py` tar ut ur storyboarden (plåtar, båtens delar, västen, sakerna). Kör om när bygg.py eller `assets/` ändras.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs sjon-1 42.5 44.0   # stillbilder vid de tiderna → sjon-1/stills/
node render.mjs sjon-1             # hela scenen → sjon-1/sjon-1.mp4 med sångbiten
../film/klipp-sang.sh              # sang.m4a → ../sang-klippt.m4a (pauserna, se storyboard.md "Klippet")
../film/satt-ihop.sh               # grovklipp: storyboardbilder + renderade scener + sången → film/avsnitt-006-grovklipp.mp4
```

## Platshållare (ritade i bygg.py tills bilderna finns i assets/)
Orange båten (skrov och insida), apelsinen, fisken, pumpan, solen, fruktkorgen, sjön och bryggan. (Jättepumpan är struken ur refrängen.)
Agdas näbb, Disas väst, den orange flaggan och discokulan är också ritade eller omfärgade i kod (antagande, se storyboard.md).

## Kvar
1. Kodscenerna kritan-ritar, sjon-2, bryggan och discot (efter 005:s), och introt och outrot med jinglarna.
2. Ljudeffekter (`kit.ljud`) i scenerna, och en satt-ihop.sh med effekter och jinglar som 005:s.
3. Stammarna från Suno till `../stammor/`: gör om de inlagda takterna i klipp-sang.sh med bara de instrumentala stammarna och rätta "≈"-tiderna i `rader.txt`.
