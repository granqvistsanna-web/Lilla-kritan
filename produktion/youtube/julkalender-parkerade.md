# Julkalendern – parkerade luckor

Sanna 2026-11-18: vi jobbar med **två avsnitt åt gången** och gör dem riktigt bra. Allt annat är arkiverat på feedbacksidan
(status `arkiv`) och väntar här. Ta upp en lucka genom att säga dess nummer; sätt då tillbaka den med
`python3 verktyg/feedback.py status granska J05` (och `-bg`-sidan om bakgrunden ska väljas om).

**Nu:** 039 Kaninen ska åka pulka (ligger som **lucka 20**, `20-kaninen-aker-pulka`, hel video med nya introt, 18/11) och J07 Lammet och julkulan.

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
| J21 | `21-blinka-lilla-stjarna` | granska, hel video, 17/11 – gamla introt |
| J22 | `22-julgranen` | granska, renderad 16/11 – gamla introt |
| J23 | `23-grisen-granen` | granska, ny bakgrund Granbrynet (18/11); **J23-bg godkänd (klar)**; J23-zoom ej vald |
| J24 | `24-julafton` | granska, Gula vardagsrummet (05:39 på sidan); **J24-bg godkänd (klar)**. Filmen från 18/11 12:13 är trasig och måste renderas om |

"Gamla introt" = renderad före det nya kalenderintrot (lucka.js, 17/11 09:15). Renderas om när luckan tas upp:
hela-video-luckor med `hel-video.sh <mapp>`, kodluckor med `node verktyg/render-delat.mjs <mapp>` och sedan `mastra.sh <mapp>`.
