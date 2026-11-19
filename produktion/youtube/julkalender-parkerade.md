# Julkalendern – parkerade luckor

**Ny ordning (Sanna 2026-11-19):** bara nya avsnitt, de som är längst fram först. Lucka 8–11 och 13–24 står öppna (tomma) tills vidare.
Mapparna har kvar sina gamla nummer i namnet; numret i `index.html` (`lucka: N`) och id:t på feedbacksidan är det som gäller.

| Lucka | Feedbacksidan | Mapp (`produktion/youtube/shorts/jul/`) | Läge |
|---|---|---|---|
| 1 | J01 | `20-kaninen-aker-pulka` | 039 hel video, granska. Omrenderad som lucka 1 (18/11), uppladdad som J01 |
| 2 | J02 | `07-lammet-julkula` | granska. Renderad som lucka 7, renderas om |
| 3 | J03 | `21-leoparden-gar-och-lagger-sig` | 040 byggs (animatiken godkänd), ingen film på sidan än |
| 4 | J04 | `05-grisen-pulka` | granska. Feedback 19/11 fixad (säcken högre, åket ut på kullarna utan ut-och-in, längre kullåk, grisen nickar), 169,7 s, ingen overall; luckan (hel-video.sh) byggs om när filmen är godkänd |
| 5 | J05 | `13-tre-pussel` | granska. Renderad som lucka 13 med gamla introt, renderas om |
| 6 | J06 | `06-tittut-bjornen` (ny) | Tittut med björnen i julskogen, hel video (`fran: 4.0, till: 159.5`), inte renderad |
| 7 | J07 | `07-hunden-ater-julmat` (ny) | 036 Hunden äter julmat, hel video (`fran: 3.34`, utan bilderboksintrot). Sanna 2026-11-19 |
| 8–11 | – | – | öppna |
| 12 | J12 | `12-tittut-grisen` (ny) | Tittut med grisen i julskogen, hel video (`fran: 4.0, till: 136.4`), inte renderad. Mitt i kalendern (Sanna 2026-11-18: "one early and one in middle") |
| 13–24 | – | – | öppna |

Allt annat är arkiverat på feedbacksidan under id `JP-<namn>` (t.ex. `JP-stjarna`), med sin feedback kvar.
De redan publicerade (Bä bä, Röda, Bruna, Rosa, Tittut lammet) är borttagna ur kalendern.
Ta upp en parkerad lucka: ge den ett dagnummer, ändra `lucka: N` i dess `index.html` och flytta id:t på feedbacksidan.

## Parkerade (läget 2026-11-18, före nya ordningen)

| Lucka | Mapp (`produktion/youtube/shorts/jul/`) | Läge när den parkerades |
|---|---|---|
| J01 | `01-stjarna` | granska, renderad 16/11 – gamla introt |
| J02 | `02-lammet-tittut` | granska, närmare kamera (17/11); J02-bg ej vald |
| J03 | `03-hunden-snoflingor` | granska, glitter, blåsen, snöbollar fixade (18/11); J03-bg ej vald |
| J04 | `04-bjornen-pepparkaka` | granska, renderad 16/11 – gamla introt |
| J05 | `05-grisen-pulka` | granska, mindre figurer, snögranar, säcken (18/11); J05-bg ej vald |
| J06 | `06-leoparden-ljus` | granska, mjukare sken runt ljusen (18/11); J06-bg och J06-zoom ej valda |
| J08 | `08-hunden-snogubbe` | granska, ny bakgrund Björkdungen (18/11); J08-bg: förslag 1 valt preliminärt |
| J09 | `09-paketet` | granska, renderad 16/11 – gamla introt |
| J10 | `10-ba-ba-vita-lamm` | granska, hel video. **Nya introt** (omrenderad 18/11 12:29, 93 s, ej uppladdad) |
| J11 | `11-roda-sangen` | granska, hel video, 16/11 – gamla introt |
| J12 | `12-kaninen-ater-frukost` | granska, hel video, 16/11 – gamla introt |
| J13 | `13-tre-pussel` | granska, tre pussel i stället för Lucia (17/11) – gamla introt. Lucia-versionen (J13-lucia) var redan arkiverad |
| J14 | `14-bruna-sangen` | granska, hel video, 17/11 – gamla introt |
| J15 | `15-lammet-klar-pa-sig` | granska, hel video, 17/11 – gamla introt |
| J16 | `16-bjornen-tvattar-handerna` | granska, hel video, 16/11 – gamla introt |
| J17 | `17-borsta-borsta-jul` | granska, hel video, 17/11 – gamla introt |
| J18 | `18-rosa-sangen` | granska, hel video, 17/11 – gamla introt |
| J19 | `19-tittut-lammet` | granska, hel video, 16/11 – gamla introt |
| J20 (gamla) | `20-bjornen-fyra-ljus` | var redan arkiverad (17/11); J20-bg ej vald. **Platsen tagen av 039** (18/11, Sanna: "find a spot and add to kal"): J20 på feedbacksidan är nu `20-kaninen-aker-pulka` |
| J21 (gamla) | `21-blinka-lilla-stjarna` | granska, hel video, 17/11 – gamla introt . **Platsen tagen av 040** (18/11, Sanna: \"Yes, lucka 21\") |
| J22 | `22-julgranen` | granska, renderad 16/11 – gamla introt |
| J23 | `23-grisen-granen` | granska, ny bakgrund Granbrynet (18/11); **J23-bg godkänd (klar)**; J23-zoom ej vald |
| J24 | `24-julafton` | granska, Gula vardagsrummet (05:39 på sidan); **J24-bg godkänd (klar)**. Filmen från 18/11 12:13 är trasig och måste renderas om. Öppen feedback (18/11): 1:17 julgransfot, 1:17 matcha Malins replik bättre, 1:42 leoparden i stället för björnen |

"Gamla introt" = renderad före det nya kalenderintrot (lucka.js, 17/11 09:15). Renderas om när luckan tas upp:
hela-video-luckor med `hel-video.sh <mapp>`, kodluckor med `node verktyg/render-delat.mjs <mapp>` och sedan `mastra.sh <mapp>`.
