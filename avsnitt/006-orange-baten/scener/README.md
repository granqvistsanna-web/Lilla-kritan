# Kodscener – avsnitt 006 Orange sången

Samma upplägg som 005: SVG-scener på en 1376 × 768-duk som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna läses ur `../storyboard/bygg.py` (SHOTS och REFRÄNG_TID) av `kit.manus()`. **Alla tider är uppskattade**: ingen sång finns än.

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `sjon-1/` | 03–05f (zoom ut, vinkar, kör med Fia, spanar, refräng 1) | 0:30.1–1:23.3 | ✅ stillbilder och tyst mp4 (53,2 s) |
| kritan-ritar | 02–02c | 0:11.0–0:30.1 | ⬜ inte gjord, bara storyboardbilder i grovklippet |
| sjon-2 | 06–09f (fisken, pumpan, bryggan, Agda, refräng 2) | 1:23.3–2:21.9 | ⬜ inte gjord (refrang.js klarar '09' redan) |
| discot | 10–18 (danspaus, sista refrängen, avslutning) | 2:21.9–3:55.1 | ⬜ inte gjord |

## Filer
- `kit.js`, `render.mjs`, `ansikten.js`: kopior av 005:s. Ändrat i kit.js: Disas armar framför kroppen (`framfor`) och `BEAT = 60 / 88` (uppskattat tempo).
- `baten.js`: orange båten med Disa i (som `båten()` i bygg.py). Disas armar är förlängda 1,4× och har vit kant, annars syns de inte mot den lila kroppen.
- `refrang.js`: refrängen a–f, samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`).
- `lager/`: PNG:er som `lager/gor-lager.py` tar ut ur storyboarden (plåtar, båtens delar, västen, sakerna). Kör om när bygg.py eller `assets/` ändras.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs sjon-1 42.5 44.0   # stillbilder vid de tiderna → sjon-1/stills/
node render.mjs sjon-1             # hela scenen → sjon-1/sjon-1.mp4 (tyst)
../film/satt-ihop.sh               # tyst grovklipp: storyboardbilder + renderade scener → film/avsnitt-006-grovklipp.mp4
```

## Platshållare (ritade i bygg.py tills bilderna finns i assets/)
Orange båten (skrov och insida), apelsinen, fisken, pumpan, solen, fruktkorgen, sjön, bryggan och jättepumpan (med toppen).
Agdas näbb, Disas väst, den orange flaggan och discokulan är också ritade eller omfärgade i kod (antagande, se storyboard.md).

## Väntar på Suno-taget
1. `sang.m4a` i avsnittsmappen och `rader.txt` med riktiga tider (sångtid; avsnittstid = sångtid + 11 s).
2. Byt SHOTS och REFRÄNG_TID i `bygg.py` och kör om den, sedan `gor-lager.py`.
3. Sätt `BEAT` och `BEAT0` i `kit.js` efter sångens tempo och första slag.
4. Ge scenerna sångbiten med `kit.kor(render, T.SLUT, { sang: [från, till] })` (som i 005) så att render.mjs lägger på sången, och gör en satt-ihop.sh med ljud efter 005:s.
