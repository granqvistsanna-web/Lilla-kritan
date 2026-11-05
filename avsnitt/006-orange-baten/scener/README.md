# Kodscener – avsnitt 006 Orangea sången

Samma upplägg som 005: SVG-scener på en 1376 × 768-duk som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).
Tiderna läses ur `../storyboard/bygg.py` (SHOTS och REFRÄNG_TID) av `kit.manus()`. De kommer ur sången (`rader.txt`) genom klippet i
`../film/klipp-sang.sh`: avsnittstid = klipptid + 11 s, där klipptid är tiden i `../sang-klippt.m4a`. render.mjs tar sångbiten därifrån.

| Scen | Storyboard | Avsnittstid | Status |
|---|---|---|---|
| `sjon-1/` | 03–05f (zoom ut, vinkar, kör med Fia, spanar, refräng 1) | 0:36.9–1:21.6 | ✅ stillbilder och mp4 med sångbiten (44,7 s) |
| `kritan-ritar/` | 02–02c (kritan ritar båten, gissningspausen, "En båt!") | 0:11.0–0:35.2 | ✅ stillbilder och mp4 med sångbiten (24,2 s) |
| `sjon-2/` | 06–09f (fisken, fågeln, frågan och västen, dunk, refräng 2) | 1:17.3–2:05.6 | ✅ stillbilder och mp4 med sångbiten (48,3 s); ljud: tuff-tuff (motorn, lågt) och tuta-tut (tutet) tills Sanna valt, plask, fladder, dunk, plopp (tyst) |
| `bryggan/` | 10–14g (kritsvep, apelsinen, vers 2 och 3, upp på den långa bryggan) | 2:05.6–2:54.9 | ✅ stillbilder och mp4 med sångbiten (49,3 s); repliker i 11d–12 utan röst, snyftet tyst |
| `discot/` | 15a–16f (danspausen med Gurra, Fia och Mille, V-raden, sista refrängen med småbilderna i bågen, Disa puttrar iväg i båten) | 2:54.9–3:46.0 | ✅ stillbilder och mp4 med sångbiten (51,1 s), se `discot/README.md` |
| `slutet/` | 17 (kritirisen runt Disa, som 005:s bild 17; inget fast outro efter) | 3:46.0–3:50.4 | ✅ mp4 med sångbiten (4,4 s) |

## Filer
- `kit.js`, `render.mjs`, `ansikten.js`: kopior av 005:s. Ändrat i kit.js: Disas armar framför kroppen (`framfor`) och takten `BEAT = 0.5882, BEAT0 = 0.064` (uppmätt i sang-klippt.m4a, klipptid). render.mjs läser `../sang-klippt.m4a`.
- `baten.js`: orange båten med Disa i (som `båten()` i bygg.py). Disas armar är förlängda 1,4× och har vit kant, annars syns de inte mot den lila kroppen.
- `refrang.js`: refrängen a–f, samma båda gångerna (`refrang.ny(M, '05', S)` eller `'09'`). Rad 6 (d) är apelsinens ögonblick: kameran glider in mot bubblan, fem glimtar tindrar runt den och `glitter` läggs när den poppar upp (refrang.js lägger ljudet själv).
- Texturpasset (2026-11-05): `kit.duk` lägger `lager/korn.png` (fint papperskorn och liggande kritdrag, 55 %) över alla scener, så att de hänger ihop. `kit.mjukaKlipp(render, gränser)` låter kameran glida 0,9 s över bildgränserna i stället för att klippa (sjon-1, sjon-2, bryggan).
- Bryggans slut (14e–14g): Disa och Agda står på plankorna med skuggor, Agda delar apelsinen i två halvor (`nyHalva`), och den ena halvan flyger i en båge över huvudena till Disa. Fruktkorgen är flätad och har handtag (`ph_korg` i bygg.py). Ut till discot går det med ett kritsvep.
- `lager/`: PNG:er som `lager/gor-lager.py` tar ut ur storyboarden (plåtar, båtens delar, västen, sakerna). Kör om när bygg.py eller `assets/` ändras.

## Köra
```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py
node render.mjs sjon-1 42.5 44.0   # stillbilder vid de tiderna → sjon-1/stills/
node render.mjs sjon-1             # hela scenen → sjon-1/sjon-1.mp4 med sångbiten
node render.mjs sjon-1 --snabb     # förhandsvisning: 960 × 540, 15 bilder/s, ca 3× fortare (samma filnamn)
../film/klipp-sang.sh              # sang.m4a → ../sang-klippt.m4a (pauserna, se storyboard.md "Klippet")
../film/satt-ihop.sh [--snabb]     # grovklipp: storyboardbilder + renderade scener + sången + scenernas effektljud → film/avsnitt-006-grovklipp.mp4
```
Förhandsvisa med `--snabb` och stillbilder, och rendera fullt en gång när scenen är klar. När flera sessioner jobbar parallellt bygger bara huvudsessionen storyboarden och grovklippet, och högst två renderar samtidigt.
Lärdomarna om polish (andning, svävande kamera, poser som glider över, parallax) och arbetsflödet står i skillen `ai-video`, avsnittet "Code episodes".

## Platshållare (ritade i bygg.py tills bilderna finns i assets/)
Orange båten (skrov och insida), apelsinen, fisken, pumpan, fruktkorgen, sjön och bryggan. (Jättepumpan är struken ur refrängen.)
Agdas näbb, Disas väst, den orange flaggan och discokulan är också ritade eller omfärgade i kod (antagande, se storyboard.md).

## Kvar
1. Kodscenerna efter 005:s: se tabellen ovan. (Outrot är slutet/, kritirisen som 005.)
2. Ljudeffekter (`kit.ljud`) i scenerna, och en satt-ihop.sh med effekter och jinglar som 005:s.
3. Stammarna från Suno till `../stammor/`: gör om de inlagda takterna i klipp-sang.sh med bara de instrumentala stammarna och rätta "≈"-tiderna i `rader.txt`.
- Övergångarna (2026-11-05): `kritsvep.js` här är en enklare kopia av 003:s, med ett lager breda drag och ett mjukt svep bort i stället för smul (003:s original är orört). Agda hoppar upp ur vattnet på bryggan i 14e. I discot springer raden ut åt sidorna när 16a börjar och in igen i 16d, så att figurerna inte försvinner eller poppar fram. De vita kanterna (`baten.js`) är ojämna och kritiga, inte släta.
- Putsen (2026-11-05 kväll): papper→sjö tonar bara bakgrunden till himmelsblått (båten behåller färgen, ingen grå mellanbild) och sjon-1 tonar fram sjön runt båten; refrängens orange torka har en vågig kant (`KANT` i refrang.js, filtret i masken gav en rak linje); V-raden i 15g zoomar bara 1,05 och hela raden stannar i bild; Fia flyger över och mellan Gurra och Disa.
