# Scener – avsnitt 005 Rosa sången

Kodscener (HTML + SVG) som renderas till film, med samma kit som 003 och 004 (`kit.js` och `render.mjs` är kopierade från 004; hela API:t står i `../../003-bussen-halsar-pa/scener/README.md`). Tiderna läses ur `../rader.txt` och SHOTS/REFRÄNG_TID i `../storyboard/bygg.py` (`kit.manus()`, avsnittstid = sångtid + 11 s), så en omtajmad storyboard slår igenom vid nästa rendering.

| Scen | Mapp | Storyboard | Avsnittstid | Sångtid |
|---|---|---|---|---|
| Intro | `../intro/` | 01 | 0:00–0:11 | – (jingeln) |
| Kritan ritar | `kritan-ritar/` | 02–03 | 0:11.0–0:30.4 | 0:00–0:19.4 |
| Vägen 1 | `vagen-1/` | 03a–05f (vers 1, refräng 1) | 0:30.4–1:11.6 | 0:19.4–1:00.6 |
| Vägen 2 | `vagen-2/` | 06–09f (blommorna, ballongen, frågan, refräng 2) | 1:11.6–1:59.0 | 1:00.6–1:48.0 |
| Kiosken | `kiosken/` | 10–14e (kritsvep, glassen, vers 2) | 1:59.0–2:23.3 | 1:48.0–2:12.3 |
| Discot | `discot/` | 14f–17 (danspausen, sista refrängen, hej då, zoom ut) | 2:23.3–3:07.1 | 2:12.3–2:54.1, sedan tyst |
| Outro | – | 18 | 3:07.1–3:17.1 | saknas: ingen outrofil i `assets/format/` |

Raka klipp mellan scenerna och bilderna, utom kritsvepen in i refrängerna i vägen 1 och 2. Bild 10 är inget kritsvep längre: där öppnar sig de rosa molnen över kiosken (se `kiosken/README.md`). Ingen text i bild.

## Ändrat för 005

- **Duken är storyboardens mått, 1376 × 768** (viewBox). Alla konstanter i `bygg.py` gäller rakt av i scenerna. `render.mjs` renderar ändå 1920 × 1080, 30 fps.
- **Takten:** ca 107,6 bpm, `kit.BEAT = 0.5578`, `kit.BEAT0 = 0.409` (sångtid), uppmätt med librosa över hela `sang.m4a`. Raderna i `rader.txt` är där rösten börjar och ligger inte alltid på slaget.
- `kit.manus()` läser tiondelar (`0:11.0–0:17.3`) och refrängernas bilder ur REFRÄNG_TID (`M.bild('05a')`).
- `kit.FIGURER`: musen Mille med ritade lemmar (`musen-mille-rigg-lemmar.json`) och Dinon Disa. Musens armvinklar som i bygg.py: `kit.mot`, `kit.musHand`.

## Gemensamma filer

| Fil | Vad |
|---|---|
| `kit.js` | Kitet (se ovan). |
| `ansikten.js` | Kodansiktena med storyboardens humör, och musens rosa nos. |
| `bilen.js` | Rosa bilen med musen i, som `bilen()` i bygg.py: kaross, musen, kant, armarna framför, hjulen. Armarna som vinkel eller `'kant'` (standard): i bilen håller båda tassarna en ratt i kod framifrån (klockan 10 och 2, nedre halvan bakom kanten); en arm uppe (pekar, vinkar, glass) betyder att den tassen släpper ratten och den andra ligger kvar, båda uppe eller `lyft > 0` döljer ratten (Sanna, 2026-11-04: de böjda armarna såg konstiga ut; `'styra'` betyder samma sak); glass i tassen; vit kant och mörkrosa kontur per bildruta. `bilen.musen()` är musen på egna ben. |
| `refrang.js` | Refrängdansen (a–f) med rosa blixtar, mönstret av möss och glassberget med flaggan. Vägen 1 och 2 använder hela, discot glassberget (15e). |
| `lager/gor-lager.py` | Tar ut lagren som storyboarden räknar fram (blå kiosken, blixtplåtarna, discot med ljusprickar, glassdelarna, bilens kontur) som PNG i `lager/`. Kör om när bygg.py ändras; PNG:erna checkas inte in. |
| `render.mjs` | Renderar en scen (oförändrad från 004). |
| `_test/` | En liten testsida för riggen och refrängen 05. |

## Rendera

```bash
~/.claude/skills/ai-video/.venv/bin/python -I lager/gor-lager.py   # en gång, och när bygg.py ändras
node render.mjs vagen-1                    # hela scenen → vagen-1/vagen-1.mp4, med sångbiten och vagen-1-effekter.wav
node render.mjs vagen-1 2 30 45            # stillbilder → stills/<t>.jpg + stills/sheet.jpg
node render.mjs vagen-1 --fran 40 --till 50
```

Filmer, stills och lager-PNG:erna checkas inte in.

För att titta: `~/Downloads/005 Rosa sången – klipp/` har länkar till introt och varje scens mp4, numrerade i avsnittets ordning (01 intro … 06 discot). Länkarna pekar på filerna här, så en ny rendering syns där direkt.

## Engelska versionen (The Pink Song)

Samma scener, tajmade om till den engelska tagningen `../en/sang.m4a` (3:36.0). Scenerna räknar fortfarande i den svenska tagningens tider; `kit.kor()` gör om dem när sidan öppnas med `?en`:
en styckvis linjär karta svensk sångtid → engelsk sångtid ur paren i `../en/rader.txt` (varje rad har sin svenska tid `[sv M:SS.s]`). Bilden går fortare eller långsammare mellan raderna, ljudeffekterna flyttas med, sångbiten tas ur `en/sang.m4a`. Utan `?en` är allt som förut.

```bash
node render.mjs vagen-1 --en               # → vagen-1/vagen-1-en.mp4 och vagen-1-en-effekter.wav
node render.mjs vagen-1 --en 8.7 27.8      # stillbilder → vagen-1/stills-en/
../film/satt-ihop.sh en                    # → ../film/avsnitt-005-en.mp4 (efter alla fem scenerna med --en)
```

Ändra en tid: rätta raden i `../en/rader.txt` och rendera om. Engelska scenstarter (sångtid): kritan ritar 0:00, vägen 1 0:30.0, vägen 2 1:15.8, kiosken 2:10.1, discot 2:38.6; discot slutar 3:24.4 och sången tonas ut där (resten av instrumentalen till 3:36 används inte).
Kvar på svenska: introts titel och jingel (samma intro som den svenska filmen). `discot/sang-tyst.json` gäller den svenska tagningen, så de "tysta" effekterna i discot kan hamna på sång i den engelska.

## Ljud

`kit.ljud(namn, t)` som i 004. Effekterna per scen står i varje scens README. Saknas och är tysta tills de finns i `assets/ljud/effekter/`: **plopp** (flaggan på glassberget, `pop` ligger där så länge), **dunk** (dinon stampar), **klapp**.

## Det som saknas

- **Outrot (18):** ingen outrofil i `assets/format/`. 004 hade inget outro; 003 slutade med logotypen i C.
- **Grodans blå fluga** finns inte i utklippen (står i `bildlista.md`), så grodan är utan den.
- Replikerna i kioskluckan ("Hej, grodan!", "Rosa, tack!" …) och "Pip pip!" är inte inspelade; munnen rör sig på gissade tider.
