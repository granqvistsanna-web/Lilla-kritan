# Avsnitt 006 v2 – Orangea sången i art direction v2 (plan)

**Status (2026-11-26):** plan. Sanna valde "full 013-recept" och att Claude gör den nya konsten i Flow. Omgång 1 (två tagningar var av båten, apelsinen, sjön och bryggan) ligger i `original/` (`scene-01` båten, `-02` apelsinen, `-03` sjön, `-04` bryggan), jämförelse i `jamforelse-omgang1.jpg`. Sanna valde båten 01-v1, apelsinen 02-v1, sjön 03-v2 och bryggan 04-v1 (2026-11-26). **Urklippta:** `assets/rekvisita/orange-baten-v2/`, `apelsin-v2/`, `bryggan-v2/` (9 px kant, kontroll `kontroll-urklipp.jpg`) och plattan `assets/bakgrunder/sjon-v2/sjon-v2.png` (1920 × 1080, sömlös i sidled, `kontroll-sjon-tva.jpg`). **Fisken och fågeln** (omgång 2, ljusare guldorange `#F7A23B` än båten): `original/djur-scene-01-v1/v2` (fisken) och `djur-scene-02-v1/v2` (fågeln), jämförelse `jamforelse-djur.jpg`. Sanna valde fisken v1 och fågeln v2. **Urklippta:** `assets/rekvisita/fisk-orange-v2/` och `fagel-orange-v2/` (fågeln delad i kropp och vinge med rigg, kontroll `kontroll-fagel-flax.jpg`). **Sedan:** Disa i båten.

**Disa i båten (prov 2026-11-26):** [`prov/disa-bat.html`](prov/disa-bat.html) (`?zoom=2` = närbild), film `prov/disa-bat-z2.mp4` (12 s: sitter, vinkar, tittar framåt, pekar). v2-Disa live ur `uttryck.html` (SKALA 0,5), båten på **0,7** (ca 2 gånger hennes bredd; Sanna: "dino to big in boat" på 0,5). Relingen skär Disa vid y 720 i hennes ruta så att armarna syns, benen är dolda. **Flytvästen** i kod i kroppsgruppen, maskad med kroppens form minskad 16 px (går aldrig utanför kanten), med ett vitt band och ett spänne. **Flaggan** i aktern på motorn, bakom Disa, fladdrar bakåt. Skum längs skrovets botten, sjön glider. Disa fick `HAND` (tassarnas mitt) i `uttryck.html` så att `ARMROR.vinka/peka` fungerar.

v1 (`../film/avsnitt-006.mp4`, publicerad på https://youtu.be/EMhD7juFARg) rörs inte. v2 byggs i den här mappen, som `007-bruna-ladbilen/v2/`, och följer [`format/fargsang-v2.md`](../../../format/fargsang-v2.md) (förlagan 013 Röda sången), med figurerna som v2-riggar som dinosaurierna i 033.

## Det som ligger fast

| | |
|---|---|
| **Sången** | `../sang.m4a` (tagning 2, 4:00, ca 104 bpm), **oförändrad** (klipp aldrig sången). Tider i `../rader.txt`. Slutet tonas ut som i v1 (ca 3:32.7) |
| **Berättelsen** | som v1: Disa kör sin orange båt, fisken, fågeln, västen och flaggan, apelsinen av Agda vid bryggan, den flyter bort, Agda simmar och hämtar den, en halva var, danspaus, discot, hejdå |
| **Figurer (2)** | Dinon Disa (`assets/karaktarer/dinon-disa/premium/`, v2-rigg 2026-11-09) och Ankan Agda (`assets/karaktarer/ankan-agda/premium/`, v2-rigg 2026-11-07). I sången heter de "dinon" och "ankan" |
| **Platser (2)** | Sjön och bryggan, plus discot och refrängdansen som i 013 |

## Nytt i v2

| Del | v2 | Källa |
|---|---|---|
| Intro | formatets intro, 9,0 s, kritsvep in i ritandet | 013 `intro/` |
| Kritan ritar | den delade koden `verktyg/kritan-ritar.js` (skillen `kritan-ritar`): båtens kontur i ett drag, sedan fylls v2-båten i inifrån. Tajmas på de sjungna raderna 0:00–0:22 | 013, ritintro.md |
| Figurer | Disa och Agda live ur `uttryck.html` (v2-rigg.js + rigg-motor.js), som 033 | 033 `scener/badet` |
| Saker | ny v2-båt, v2-apelsin och v2-brygga (urklipp med vit kant, `vita-kanter`), flytväst och flagga i kod | Flow, nedan |
| Platta | ny v2-sjö (himmel + vatten, sömlös i sidled); bryggan är ett eget urklipp ovanpå, inget på plattan | Flow, nedan |
| Fisken och fågeln | v2-urklipp (nästa omgång i Flow) | – |
| Kamera | `verktyg/utsnitt.js`, `format/bildutsnitt.md` | – |
| Kritsvep | `rodsvep` i orange, 1,6 s, ingen sak i svepet | 013 `scen-kit.js` |
| Slut | hej då, rakt klipp till prenumerera-kortet (utan dess öppnings-iris), kortets iris är slutet | `produktion/youtube/prenumerera/` |
| Line boil | 2,5 px i bild, delad med zoomen | CLAUDE.md |

## Att se upp med

- **"Vad kan det vara?"** sjungs i sången (0:06.8 och 0:13.2). Repliken används aldrig, men sången klipps inte: den får stå kvar sjungen, och Malin säger inget ovanpå. Säg till om du vill något annat.
- Ritintrot är sjunget i 006, inte talat som i 013, så 013:s `KAP` (kortad väntan efter konturen) går inte att använda: bilden följer sångens tider.
- Båten ska ha en annan ton av orange än det vi letar efter (011:s lärdom), och inget annat orange i bakgrunden.

## Ordning

1. **Konsten** (nu): båten, apelsinen, sjön, bryggan → Sannas val → urklipp och kanter. Sedan fisken och fågeln.
2. Disa i båten (sittpose bakom relingen, flytvästen i kod), provbild.
3. **Storyboard (utkast 2026-11-26):** [`storyboard-v2/storyboard.md`](storyboard-v2/storyboard.md), avsnittstid = sångtid + 9,0. Inga repliker, fyra dansare utan Mille (Sanna 2026-11-26). Godkänd att bygga på.
4. **Scener (påbörjade 2026-11-26):** `scener/kit.js` (båten med Disa, kameran och boil, 033:s vinkning, orange kritsvep, skottlistan), `scener/render.mjs` (033:s). Klara som förhandsvisning: `scener/kritan-ritar` (01a–01e, avsnitt 0:09.0–0:33.2) och `scener/sjon` (03–09f, 0:33.2–1:59.4, slutar mitt i kritsvepet); ihop med sången i `film/forhand-ritar-sjon.mp4` (börjar vid avsnitt 0:09.0). Kvar: introt (013), `bryggan` (11–14g), `discot` (15a–16f), prenumerera och kritirisen, grovklipp.
5. QA (`verktyg/qa-film.sh`), feedbacksidan, slutrendering.
6. **QA-fixar 2026-11-27 (29 punkter):** alla fyra scenerna och `film/satt-ihop.sh` ändrade, grovklippet byggt om (`film/avsnitt-006-v2-grovklipp.mp4`, förhandsvisning `--snabb`). Ritscenen: lugnare tajming och knackningar. Sjön: blickar, vinkning med vänster arm, Fia in och ut till vänster, fisken och fågeln (refräng 2: fågeln på fören), mindre sol. Bryggan: pantomimen äpple/banan/apelsin, överlämningen, närbild på Agda, apelsinen driver ut, hoppet rakt fram, kritringen på "rund", halvorna på "halva". Discot: ekona (ett drag per dansare), öppna ögon varvat, alla hela i bild, ny väst och hoppa-märke, hej då med Disa i båten. Slutet: ett slut, rakt klipp till kortet utan dess öppnings-iris. Detaljer i storyboarden.

## Flow-prompterna (omgång 1, Nano Banana Pro, 0 krediter)

Stilreferens för sakerna: `assets/rekvisita/cykel-v2/cut/cykel-v2.png`. Designreferens: v1-bilden av samma sak. Sjön: `assets/bakgrunder/stranden/stranden-v2.png` (himmel och vatten) och `skogen-gron-tom.png` (stil).

```prompt
Image 1 is the DESIGN reference: the same little open toy motorboat, same shape and side view. Image 2 is a STYLE reference only: copy its drawing technique exactly (soft premium toddler picture-book look, flat even wax-crayon fill with fine paper grain and soft crayon strokes, only a faint slightly darker crayon edge, no dark outline, no 3D shading, a clean even white sticker border around the whole silhouette), not its subject. Draw ONE cute, chunky little open toy motorboat seen exactly from the side, facing right, completely flat, no perspective. A round, soft, deep hull in bright warm orange (#F28C28) with a gently curved bottom and a slightly raised rounded bow on the right, a thin lighter orange rim (#F7B266) along the top edge, an open top with room for a small character to sit inside, and a small simple rounded outboard motor in light grey at the back on the left. Friendly, round, simple shapes a toddler recognises at once. No face, no rider, no flag, no water, no windows, no text. Centered, the boat fills about 80 percent of the frame width, plain pure solid white background, no shadow, no ground.
```

```prompt
Image 1 is the DESIGN reference: the same orange fruit. Image 2 is a STYLE reference only: copy its drawing technique exactly (soft premium toddler picture-book look, flat even wax-crayon fill with fine paper grain and soft crayon strokes, only a faint slightly darker crayon edge, no dark outline, no 3D shading, a clean even white sticker border around the whole silhouette), not its subject. Draw ONE round, plump orange fruit seen straight from the side, completely flat: a bright juicy orange colour (#F5922A) with a few tiny darker dimple dots of the peel drawn in crayon, a small brown stem on top and one small fresh green leaf (#4FA34A) sticking out to the right. Friendly, simple, round. No face, no slice, no shine, no text. Centered, the orange fills about 70 percent of the frame, plain pure solid white background, no shadow, no ground.
```

```prompt
Image 1 is the SKY and WATER reference: the same soft light sky blue and the same calm sea band. Image 2 is the STYLE reference: copy its premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, soft even colour fields, NO dark outlines. Redraw as an empty open lake backdrop for a toddler cartoon, wide 16:9, completely flat, static straight-on view, no perspective, in two horizontal bands: the top 55 percent a flat soft light blue sky (#A8DCF2) with grainy oil pastel texture and a few loose lighter crayon strokes, a straight horizon line, and below it a flat calm lake in medium lake blue (#4FA8DC), slightly deeper blue towards the bottom, with a few short white crayon wave dashes scattered evenly across it. No sun, no clouds, no shore, no sand, no land, no boats, no birds, nothing else, completely empty. No orange anywhere. The picture must tile seamlessly horizontally: the left and right edges match exactly.
```

```prompt
Image 1 is a STYLE reference only: copy its drawing technique exactly (soft premium toddler picture-book look, flat even wax-crayon fill with fine paper grain and soft crayon strokes, only a faint slightly darker crayon edge, no dark outline, no 3D shading, a clean even white sticker border around the whole silhouette), not its subject. Draw ONE simple low wooden jetty seen exactly from the side, completely flat, no perspective: a long flat deck made of a few wide warm light brown planks (#C98B55) with a straight flat top edge that a small character can sit on, the plank ends drawn as soft lines, standing on three short thick round wooden posts in a slightly deeper brown (#A86A3D) that go straight down below the deck. Chunky, friendly and simple like a toy. No water, no boat, no rope, no ladder, no railing, no text. Centered, the jetty fills about 85 percent of the frame width, plain pure solid white background, no shadow, no ground.
```
