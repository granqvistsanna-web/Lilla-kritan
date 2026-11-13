# 035 – vad som behövs och vad som redan finns

Inventering 2026-11-13, efter bytet till katten och en ny vinterbakgrund. ✅ finns och kan användas · 🔧 finns men behöver justeras · ❌ saknas.

## Figur

| Vad | Status | Var |
|---|---|---|
| Katten, v2-rigg på `verktyg/rigg-motor.js`: uttryck (glad, jätteglad, förvånad, nyfiken, trumpen, sömnig, fnissig med vickande morrhår, stolt …), gång, vinkning, klapp, riktning | ✅ | `assets/karaktarer/katten-kaj/premium/uttryck.html`, `rigg-test.html` |
| Grävande framtass | 🔧 nytt i scenen: `-fram`-armen ner mot snön, ±12° kring axeln | samma |
| Tunn kant (`cut-tunn/`, 1 % av höjden) | ❌ katten har bara `cut/` (10 px kant) | `python3 verktyg/rigg_tunn.py premium/cut premium/cut-tunn`, och `uttryck.html` pekar dit |
| Status i `karaktarer/katten-kaj.md` | 🔧 står *"⏳ Inget referensark ännu"*, men riggen är använd och godkänd i 030 | Sanna avgör |

## Plats: Snögården (ny)

| Vad | Status |
|---|---|
| Plattan | ❌ görs i Google Flow, Nano Banana Pro, 16:9, uppskalad 2K, **0 krediter**, 4 tagningar. Stilreferens: vinterkullen och stranden-v2. Sanna väljer |
| Mappar | original `assets/bakgrunder/snogarden/original/snogarden-1…4.jpeg`, vald `assets/bakgrunder/snogarden/snogarden.jpeg`, beskrivning `bakgrunder/snogarden.md` + rad i `bakgrunder/README.md` |
| Fallande snö | ✅ kod finns i `produktion/youtube/shorts/jul/djur.js` |
| Gömställen | paket 1 vid stugans trappa, paket 2 under granen, paket 3 bakom katten |

```prompt
Images 1 and 2 are STYLE references only: copy their premium toddler picture-book look exactly – neat, controlled soft wax crayon and oil pastel with fine crayon hatching, soft even colour fields, NO dark outlines – not their subjects. Draw an empty, calm, snowy little yard on Christmas Eve in soft daylight as a backdrop for a toddler cartoon, wide 16:9, completely flat, static straight-on side view, no perspective. The ground is a flat, even layer of clean creamy white snow (#FAF8F2) with faint paper grain and a soft pale blue crayon shade along its top edge, filling the bottom quarter of the picture from edge to edge; its top edge is level at about 75 percent of the image height. Above it a pale, soft winter sky in light icy blue (#CFE3F0) with gentle crayon hatching. On the LEFT, taking up only the left 28 percent of the width: the front of a small, simple, chubby red wooden cottage (warm red #C8423A) seen flat from the front, its roof covered in a thick rounded layer of snow and partly cut off by the top edge, one small square window glowing warm yellow (#F6CF6A) with a white cross, and a plain wooden door with a round green Christmas wreath with a small red bow, two short snowy wooden steps in front of the door standing on the snow. On the RIGHT, taking up only the right 15 percent of the width: one small, simple, chunky spruce tree in soft muted green (#4E9270) with rounded white snow on its branches and a single loose string of small warm yellow lights, standing on the snow. Far behind, low along the horizon between them, a short, simple, snow-capped wooden fence in pale grey-brown, very low and quiet. The whole middle of the picture, at least 50 percent of the width, is completely empty: only plain sky above and plain snow below, so that one character can stand there. No sun, no clouds, no falling snow, no snowflakes, no stars, no animals, no people, no Santa, no presents, no snowman, no footprints, no tracks, no shadows, no text.
```

## Saker (inga nya)

| Sak | Status | Var | Att göra |
|---|---|---|---|
| Tomteluvan | ✅ urklipp + kontur | `assets/rekvisita/tomteluva/cut/tomteluva.png`, `tomteluva-kontur.json`, `rekvisita/tomteluva.md` | prova skala och vinkel mellan kattens öron; mät kanten (12 px i filen, troligen för tjock i den här skalan → `tunn_kant.py`) |
| Paketet | ✅ | `assets/rekvisita/paket/cut/paket.png` | tre röda i tre storlekar; ingen kontur behövs |
| Rosetten | ✅ | `assets/rekvisita/rosett/cut/rosett.png` | på det minsta paketet; den sticker upp ur snön |
| Snötussen | ✅ | `assets/rekvisita/snotuss/cut/snotuss.png` | snön på paketens lock |
| Snöflingan | ✅ | `assets/rekvisita/snoflinga/cut/snoflinga.png` | flingan katten fångar, liten, roterar sakta |
| Pulkan | ✅ urklipp + kontur | `assets/rekvisita/pulka/cut/pulka.png`, `pulka-kontur.json` | repet i kod till tassen |

Gör i kod: tassavtryck, snöpuffar, paketens röda hörn som sticker upp, skimret, pulkans rep.

## Röst (Malin)

| Vad | Status |
|---|---|
| 35 repliker, en tagning | ❌ grind 3. ElevenLabs, ca 1 300 tecken (v3) |
| Mapp | `assets/ljud/roster/katten-hittar-julklappar/` |

## Kattens röst

| Känsla | Finns | Förslag |
|---|---|---|
| 1–8 | bara `mjau-1` (en kattunge, 1,4 s) | ny familj **`mjau-gullig`**, 8 prompter × 4 tagningar i ElevenLabs Sound Effects; hej och hej då ska låta som svenska ord |
| 4 mysig suck | – | ett mjukt spinn |
| långt fniss | – | ev. en extra prompt, som `spinn-fniss` för leoparden |

Prompt-mönster (influence 0,55, längden för hand), skrivs i `ljud-effekter.md` när grind 4 börjar:

```
mjau-gullig-1: Tiny cute cartoon kitten saying a happy little hello meow that sounds like "hej!", short and bright, rising in pitch, sweet squeaky baby voice, close dry recording, no music, no background
```

## Effekter

| Ögonblick | Ljud | Status |
|---|---|---|
| Kritan ritar | `krita-ritar` | ✅ |
| Saken fylls i | `glitter` | ✅ |
| Paketet kommer upp | `pling` | ✅ |
| Gräver i snön | `puff` (CC BY, kreditrad) | 🔧 lyssna; annars *snow dig* på Openverse |
| Paketen landar på pulkan | `duns` eller `landa-mjuk` | ✅ |
| Fryser | `brr`, `huttra` | ✅ lyssna om det är en röst eller ett ljud |
| Skimret | `glimt` | ✅ |
| Luvan glider upp | `swoosh` | ✅ (mjukt, lågt) |
| **Steg i snö** (knarr) | – | ❌ Openverse: *snow footsteps*, CC0/BY |
| **Vintermatta** (lugn vind, tyst snö) | – | ❌ Openverse, mixas lågt (−30 till −33 LUFS); reserv `sus` |
| Ritintrots matta | `skogsljud` | ✅, eller vintermattan direkt |

## Musik

Ingen (som serien). Ingen ny musik görs.

## Bygga (efter grind 2–4)

- Kopiera upplägget från 022 (`storyboard/`, `scener/`, `film/`), byt platta, figur (`v2rigg('katten-kaj')`), saker och utsnitt.
- `RITDELAR()` för katten: kroppen, öronen, armarna, benen, svansen, morrhåren.
- Lägg till 035 i `harriets-favoriter.md` (huvudsessionen gör det).
- YouTube: kreditrad för `puff` (Cotton Thud, rainial.co, CC BY) och för nya CC BY-ljud.
