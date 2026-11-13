# Avsnitt 034 – Musen pyntar granen

**Status (2026-11-13):** 🎬 första hela filmen klar för Sannas granskning (`film/avsnitt-034.mp4`). Grindarna 2–6 valdes av Claude på Sannas *"push on"*, se *Claudes val* nedan. **Figuren bytt till musen** (Sanna: *"ej kon använd musen"*), platsen till ett nytt vardagsrum (*"ej säng i rummet, mysig snö som faller utanför fönster, mysig inredning"*). Julavsnitt (jul inne) i serien *Djuren hittar på!*, bilderbok utan sång, Malin berättar, en figur. Recept: [`format/bilderbok.md`](../../format/bilderbok.md), skillen `bilderbok`. Förlagor: 022 Kaninen äter frukost och 023 Björnen tvättar händerna.

| | |
|---|---|
| **Figur** | Musen Mille (v2-rigg, ✅ referensark klart). Första bilderboken med musen |
| **Plats** | Vardagsrummet (ny platta, se [platsen.md](platsen.md)), snö som faller utanför fönstret i kod |
| **Händelse** | pynta granen |
| **Hjälpsak** | julkulor (röd, gul, blå); sedan stjärnan |
| **Tre gånger** | *"Upp, upp … pling!"* |
| **Barnet hjälper** | hittar den blå kulan under granen; säger *"upp!"* så att stjärnan kommer upp |
| **Leken** | tittut med spegelbilden i julkulan |
| **Längd** | ca 3:40–4:10 |

## Filer

| Fil | Vad |
|---|---|
| [manus.md](manus.md) | kärnan, rörelserna, uppslagen, Malins replikblock med v3-taggar, regelkoll |
| [rost.txt](rost.txt) | filnamnen till `dela-tagning.py` (36 repliker) |
| [storyboard.md](storyboard.md) | uppställningen, utsnitten, uppslagen med ungefärliga tider, prov före animatiken |
| [bildlista.md](bildlista.md) | vad som behövs och vad som redan finns: figur, plats, saker, ljud |

## Grindar

| # | Grind | Läge |
|---|---|---|
| 1 | Manus | ✅ "push on", 2026-11-13 |
| 2 | Saker och plats | ✅ (Claude) vardagsrummet **blå 2 med trägolv** (`vardagsrummet-v2.jpeg`); julgran, julgransfot, julkula och stjärnan fanns redan |
| 3 | Rösten | ✅ (Claude) tagning A, utom 11, 15, 18 och 19 som är B |
| 4 | Musens ljud | ✅ (Claude) 9 befintliga `mus-pip` + 5 nya familjer från ElevenLabs (80 krediter), se [ljud-effekter.md](ljud-effekter.md) |
| 5 | Animatik | hoppad: scenen byggdes direkt efter `storyboard/rader.mjs` |
| 6 | Förhandsvisning och film | ⏳ Sanna granskar `film/avsnitt-034.mp4` och lämnar feedback i feedback-artifacten |

## Claudes val (Sanna 2026-11-13: "push on")

Allt här kan ändras. Säg till, så byts det.

- **Plattan: blå 2 med trägolv** (`assets/bakgrunder/vardagsrummet/vardagsrummet-v2.jpeg`, Flow-edit av blå 2, original i `original/vardagsrummet-bla-tragolv-1|2.jpeg`). Varför: Sanna sa *"maybe floor is not stark white"* och gillade blå 2. Det varma honungsgolvet ger mysig känsla, och layouten, golvlinjen och de vita fönsterrutorna (där snön läggs i kod) är kvar som i blå 2. Den röda kulan och den gula stjärnan syns tydligt mot det blå. `vardagsrummet-v1.jpeg` (vitt golv) finns kvar.
- **Malin: tagning A, utom 11 *"Tack!"*, 15 *"Röd, gul och blå"*, 18 *"Ska vi pynta granen nu?"* och 19 *"Först den röda. Upp, upp, pling!"*, som är B.** Varför: båda tagningarna säger rätt (whisper), och A låter mest levande. Men i A hörs *"Räd"* i 15 och *"Uppt"* i 19, och B är tydligare där. 11 och 18 tog jag också från B när jag jämförde tagningarna. A-filerna ligger i `produktion/ljud-original/roster/musen-pyntar-granen/tagning-1a/`, så det går att byta tillbaka.
- **Musens röst:** tabellen i [ljud-effekter.md](ljud-effekter.md). Openverse hade inga tecknade muspip, därför ElevenLabs. Hej och hej då valdes för att whisper hör *"Hej!"* och *"Hej då!"* i dem. Byt fil i `storyboard/rader.mjs`, `MUS_FIL`.
- **Granen:** julgranen står i en mindre julgransfot till höger om musen. Den blå kulan rullar in bakom fotens ben och kikar fram där.
- **Spegelbilden i kulan:** musen syns liten i den röda kulan när den böjer sig ner. Det är tittut-leken.

## Filmen

- Scenen: `scener/vardagsrummet/index.html`, tider och ljud i `storyboard/rader.mjs`.
- Snabb förhandsvisning: `cd scener && node render.mjs vardagsrummet --snabb`
- Slutrendering: `node verktyg/render-delat.mjs avsnitt/034-musen-pyntar-granen/scener/vardagsrummet`, sedan `bash avsnitt/034-musen-pyntar-granen/film/satt-ihop.sh` (introt 3,31 s + scenen).

## Beslut (2026-11-13)

Sanna sa *"push on"* (via huvudsessionen): det räknas som ja till manuset (grind 1). Frågorna är besvarade med Claudes rekommendation och kan ändras.

1. **Platsen: ett nytt vardagsrum** (Sanna 2026-11-13: *"ej säng i rummet, mysig snö som faller utanför fönster, mysig inredning"*): stort fönster med snö som faller utanför (i kod), röda gardiner, en knubbig fåtölj med filt och en rund matta. Ingen säng. Plan och Flow-prompt i [platsen.md](platsen.md).
2. **Händelsen: pynta granen.**
3. **Manuset** gäller som det står, med *"Upp, upp … pling!"* och *"Säg: upp!"*.
4. **Leken: spegelbilden i kulan** med tittut. Görs först som ett prov (en stillbild). Läses den inte, blir det kulan på örat i stället.
5. **Ljusslingan: nej.** Stjärnan är belöningen. Färre saker, lugnare film.
6. **"God jul!" behålls.** Det är ett julavsnitt.
7. **Musens röst:** de befintliga `mus-pip` 1–9 sorteras på känslorna först. Det som saknas (troligen mysig suck, trumpen, hej, hej då) och ett långt `mus-fniss` görs i ElevenLabs Sound Effects, **efter att Sanna har sagt ja till kostnaden** (frågas i den här sessionen).
8. **Publicering:** början av december, i spellistorna *lilla kritan – alla avsnitt* och *Vardagsberättelser*.
9. **Musens rigg får inga tunnare kanter** (`cut-tunn/`) för 034: figuren är låst, så kanterna lämnas som de är om de inte ser tjocka ut i scenen.
