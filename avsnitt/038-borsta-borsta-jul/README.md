# Avsnitt 038 – Borsta, borsta (jul) (plan)

**Status (2026-11-14, sent kväll):** scenen är byggd på 030:s (`scener/badet/index.html`, `scener/render.mjs`): röd tomteluva på katten, grön på pandan (röd och grön kanal byter plats i ett filter, så brättet förblir vitt), randig halsduk på kaninen, tomtetavlan, en ljusslinga med granris i båda ändarna, och radtiderna ur Whisper i [rader.txt](rader.txt) (osäkra tider märkta med ~). **Tagningen har en annan form än 030:** "Rena tänder! (Hurra!)" i båda varven av varje refräng, ett instrumentalt dansmellanspel (ca 18 s) redan efter vers 3 (1:33–1:52), inget dansmellanspel före frågan, och ett dansslut på bara 12 s. Snabb förhandsvisning: `cd scener && node render.mjs badet --snabb` (`badet/badet.mp4`, utan intro än). Inget committat. **Intro och grovklipp:** `intro/` är 030:s intro med titeln "Borsta, borsta jul" på röd etikett (kritsvepet in mot badrummet är kvar turkost), och `film/satt-ihop.sh` bygger grovklippet `film/avsnitt-038-grovklipp.mp4` (178,6 s, snabb förhandsvisning 960×540 uppskalad). Slutrendering saknas (kör `render-delat.mjs` på `scener/badet` och `bash film/satt-ihop.sh film/avsnitt-038.mp4`).

**Tidigare (samma kväll):** julkläder och badrumspynt valda (Sanna: "Ta dina förslag"), de två nya sakerna är gjorda i Flow och utklippta (`rekvisita/tavlan-tomte.md`, `rekvisita/halsduk.md`, tavla 3 och halsduk 2). **Tidigare:** plan och text klara, **tagning vald** (`sang.m4a`, 2:50, Sanna gjorde den i Mureka; originalet är WAV i hennes Nedladdningar). Inget är byggt än. Mätt: −10,8 LUFS, topp +0,5 dBFS (sänk före mastring), **ingen tyst paus** på 4 s efter "Var är tänderna?" (musiken går rakt igenom). Lyssna efter det som inte går att mäta: att "God jul" uttalas bra, samma melodi i alla tre verserna och en lucka efter varje vers. Radtiderna tas ur ljudet och skrivs i `rader.txt` (finns inte än).

Femte temat i **borstasången** (`format/borstasang.md`), en **julversion** av 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`): samma ord, form, bilder och klipp. Egna för 038 är julkläderna, det pyntade badrummet och julklangen i musiken (bjällror, celesta). Samma tre figurer som 030, så att 030:s scen kan återanvändas.

| | |
|---|---|
| **Titelkort** | Avsnitt 38 · Borsta, borsta (jul) |
| **Figurer (3)** | **Katten Kaj** · **Kaninen Kanel** · **Pandan Pim** (alla v2, riggade, tandmunnen finns från 030), var och en med något juligt på sig |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`) med julpynt. Inget platsbyte, inget kritsvep |
| **Saker** | handfatet, pallen, tandborstarna, tandkrämen och tandborstmuggen (finns, från 030) · julsakerna nedan (tomtetavlan och halsduken är nya) |
| **I kod** | tänderna, skum, glansstjärnan som i 030 · gärna snö som faller utanför om badrummet får ett fönster (annars inte) |
| **Ljud i klippet** | som i 030 (mjau, kanin-gullig, brum-gullig, skrubb, tindra, plopp) · inga julljud sjungs eller läggs över sången, bjällrorna kommer från musiken |
| **Favoriter** | 🐱 katt · 🐰 kanin · 👅 mun (gapa) |
| **Barnet övar på** | gapa stort · peka på tänderna · säga "God jul!" |

## Julen i bilden (valt 2026-11-14: Sanna tog Claudes förslag)

Julen sjungs inte, den syns. Bara två rader i sången är juliga: *"Rena tänder! (God jul!)"* i sista refrängen och *"God jul!"* i slutet (Sanna 2026-11-14: öppna inte med "Det är jul").

**Djuren** (något på sig var, byts inte under filmen):

| Figur | Förslag | Finns? |
|---|---|---|
| Katten | röd tomteluva (`rekvisita/tomteluva.md`) | ✅ urklipp finns, sätts i kod |
| Kaninen | röd-vit randig halsduk | ✅ gjord 2026-11-14 (`rekvisita/halsduk.md`, tagning 2) |
| Pandan | grön tomteluva (samma urklipp, färgen byts med hue-rotate som borstarna) eller en liten julkula på örat | ✅ / ✅ |

Öronen och muntranslationerna får inte skymmas av hatten: hatten ska sitta på huvudets övre del, lite snett, och inte röra munnen i närbilderna (ansiktet 2,8 och munnen 4,0).

**Badrummet** (pyntat, men inget i ansikts- och munutsnitten, som i 030:s inredning):

| Sak | Förslag | Finns? |
|---|---|---|
| Tavlan | samma ram, men med en **tomte** i stället för fisken (Sanna: "tavlan kanske har en tomte") | ✅ gjord 2026-11-14 (`rekvisita/tavlan-tomte.md`, tagning 3) (`rekvisita/tavlan.md` som stilreferens) |
| Granris | `rekvisita/grankvist.md` över skåpets överkant eller på handfatets kant, med en liten julkula | ✅ |
| Ljusslinga | `rekvisita/ljusslinga.md` (gula ljus) längs väggen under taket | ✅ (görs i kod eller som urklipp) |
| Stjärna | en liten gul stjärna (`rekvisita/stjarna-gul.md`) på tavlan eller skåpet | ✅ |

Allt sitter högt och långt ut, som tavlan, skåpet och handduken i 030. Nya saker läggs inte i `rekvisita/` förrän Sanna har valt.

## Sången mot bilden

Se tabellen "Bilden på orden" i `format/borstasang.md`. Egna rader här: *"Rena tänder! (God jul!)"* i sista refrängen (alla tre tandleenden, en extra glansstjärna) och *"God jul!"* i slutet (alla tre vinkar med luvan på).

Tagningen är en kortare variant av 030 version 2: en refräng två gånger efter varje vers, en sista refräng med alla, ett dansmellanspel på 8 takter och ett dansslut på 4 takter (se [suno.md](suno.md)).

## Regelkoll (`format/regler.md`)

- [x] 3 figurer, 1 plats
- [x] **Nya saker:** tavlan med tomten och kaninens halsduk, båda klara
- [x] En fråga till tittaren med paus: *"Var är tänderna?"* (pausen hålls av bilden, se status)
- [x] Vardagshandling: borsta tänderna
- [ ] Ingen ritscen, inget tack och inget problem som löses med en kompis (som 030, medvetet)
- [x] Inget läskigt, inga djurnamn i det som sjungs, egen sång (Exclude: kända julmelodier)
- [x] Går att klippa ut som Short: vers 1 + refräng (ca 25 s)

## Öppet

1. **Lyssna på tagningen** (se status) och tajma `rader.txt`.
2. **Välj julkläderna och badrumspyntet** (tabellerna ovan) och gör de nya sakerna med Sanna.
3. **Pausen på 4 s:** bilden håller munnarna stängda, annars ny tagning.
4. **Nivån:** sänk ca 2 dB före mastring till −14 LUFS så att topparna inte krasar.

## Nya saker: Flow-prompter (körda 2026-11-14, se rekvisitafilerna)

Stilreferenser: bild 1 = `assets/rekvisita/tavlan/tavlan.jpeg` (ramen), bild 2 = `assets/rekvisita/tomteluva/cut/tomteluva.png`. Flow, Nano Banana Pro. Utklipp, kant (ca 1 %) och filer görs som för tavlan och tomteluvan.

**Tavlan med tomte** (`assets/rekvisita/tavlan/` blir `tavlan-tomte`; ersätter fisken, samma ram och storlek):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE small framed picture that hangs on a wall, seen exactly straight from the front, very simple and childish: a chunky rounded square frame in warm light wood (#E8B97E), the same wood as image 1, and inside it a plain creamy white picture (#FAF3E3) with ONE small, simple, friendly Santa gnome seen from the front: a round red body (#C8372D), a soft red pointed hat with a white brim and a white pompom, a big round fluffy white beard covering the lower face, a tiny round peach nose and two tiny dot eyes under the brim. Beside him two small pale green fir twigs and a few small white dots like snowflakes. Nothing else in the picture. No glass shine, no nail, no string, no text, no shading, no 3D, no outline. A thick, clean, even white sticker border all around the frame. Centered with space around, plain pure solid white background, no shadow, no wall, no text.
```

**Kaninens halsduk** (liggande, urklippt, läggs runt halsen i kod; en bild, rak, utan figur):

```prompt
Images 1 and 2 are STYLE references only: copy their drawing technique exactly (flat, even wax-crayon fill with fine speckled paper grain, soft mottled crayon strokes, no dark outline, clean white sticker border), not their subjects. Draw ONE Christmas scarf lying flat, seen from the front, very simple and childish like a toddler picture-book drawing: a short chunky knitted scarf laid out as a gently curved horizontal band with stripes in red (#C8372D) and warm off-white (#F4EFE6), about six stripes, a short hanging tail at the right end with three small white fringe tassels, no knot. The off-white stripes have a faint light grey crayon edge so they show on white. No face, no pattern except the stripes, no text, no shading, no 3D, no shine. A thick, clean, even white sticker border all around the whole scarf. Centered, fills about 60 percent of the frame width, plain pure solid white background, no shadow.
```
