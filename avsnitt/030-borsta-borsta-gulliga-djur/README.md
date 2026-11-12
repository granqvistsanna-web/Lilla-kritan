# Avsnitt 030 – Borsta, borsta (gulliga djur) (plan)

**Status (senast, 2026-11-12 förmiddag):** runda 9 är slutrenderad (`film/avsnitt-030.mp4`, 1920×1080, 30 fps, 2:53.5, −14,0 LUFS, topp −1,1 dBFS, med `verktyg/render-delat.mjs`). Nytt sedan runda 6: tandkrämen sätts på borsterna tätt på (kameran följer tuben), **tre tandborstar, en färg var** (katten turkos, kaninen rosa, pandan gul; färgen byts i kod med hue-rotate), de ligger på läppen och flyger med glitter ner i **tandborstmuggen** på ett litet sidobord (pallen som bord, `rekvisita/tandborstmuggen.md`, bild från Flow, tagning 4) och ur den till djurets hand i versen (glittersmäll i handen), kattens vink med armen snett upp ur kroppen, kattens svans gungar, kaninens armar närmare kroppen, och dansslutet med **solon**: katten, kattens borste, kaninen, kaninens borste, pandan, pandans borste och tuben, var och en ensam i bild och nära (som i 005:s discot); borstarna och tuben dansar med armar och tassar. Äldre filmer: `film/avsnitt-030-runda5.mp4`, `-runda6.mp4`; grovklippen `-runda7` och `-runda8`.

**Status (förra gången, 2026-11-11 sent kväll):** runda 6 är slutrenderad (Sanna: "Yes, render"): `film/avsnitt-030.mp4`, 1920×1080, 30 fps, 2:53.5, −14,0 LUFS, topp −1,0 dBFS. Kaninens näsa mot munnen, djuren tittar på den som kommer, nya danser på discots takt, stängda munnar under dansen, skåpet 40 px lägre och scenens effektljud 3 dB lägre. Scenen körs på senaste riggarna utan ändring (kroppsböjen och blicken var redan på); den nya grepprutinen finns bara i kaninens rigg och passar inte kattens tub eller pandans borste än. Runda 5:s film ligger kvar som `film/avsnitt-030-runda5.mp4`, förhandsvisningarna från runda 5b och 6 i `scener/badet/aldre/`. Öppet: solobilderna klipper tuben eller borsten i bildkanten, stjärnregnet är litet, kaninens huvudvridning mot pandan är svag.

**Status (förra rundan, 2026-11-11 kväll):** runda 4 och 5 är inne (Sanna: ja till commit och slutrendering): öppningen tomhänt och utan anka, kattens öron och vitare ögon, lugnare gång, tunnare kanter, handduken lägre, kaninens mun utan brun linje, handfatet på samma plats i alla helbilder, närmare "Var är tänderna?", tandglans, och slutet som turkost disco med egna danssteg per figur och tandborsten och tuben som dansar med ansikten. Grovklippen från tidigare rundor ligger kvar i `film/` (`-runda1` … `-runda5`). Slutfilmen: `film/avsnitt-030.mp4`.

**Status (senast):** tagning 2 vald 2026-11-11 (`sang.m4a`, 2:44.8, den längre versionen: varje refräng två gånger, sista refräng där alla borstar, dansmellanspel och ett dansslut på ca 22 s). Radtiderna står i [rader.txt](rader.txt); tagning 1 ligger kvar som `sang-tagning1.m4a`. Scenen är omtajmad efter tagning 2 med runda 3 (öppningen utan handfat, korken som öppnas, tuben vid handfatets vänstra kant, ny kran i kod, dubbla refränger, sista refrängen där alla borstar, dansslut). Grovklippet `film/avsnitt-030-grovklipp.mp4` är 2:53.5 (Sanna 2026-11-11: ja till commit och slutrendering). Slutrenderingen: `bash film/rendera.sh` och `bash film/satt-ihop.sh film/avsnitt-030.mp4`. Äldre status:

**Status:** grovklipp 2026-11-11: `film/avsnitt-030-grovklipp.mp4` (1:49.5), byggt med `film/satt-ihop.sh` av introt (`intro/`, 013:s intro i turkos med titeln, 9,0 s) och scenen (`scener/badet`, förhandsvisning `--snabb`, 960×540 och 15 fps). **Avsnittstid = sångtid + 8,6** (introt tonar över till badrummet på 0,4 s). Ljud i klippet: kattens `mjau-1`, kaninens `kanin-gullig-3`, pandans brum (`brum-gullig-2`, björnens, tills pandan får egna ljud), borstljud `skrubb-1`, glans `tindra-3`, `plopp-1` när skumklicken spricker. Mastrat till −14 LUFS. **Slutrendering:** `bash film/rendera.sh` (scenen i 1920×1080 och 30 fps i fyra delar, introt och effektljudet) och sedan `bash film/satt-ihop.sh film/avsnitt-030.mp4`; utan argument skriver `satt-ihop.sh` grovklippet. Förhandsvisningen ligger kvar som `scener/badet/badet-snabb.mp4`. Första slutrenderingen startades 2026-11-11 efter Sannas ja till grovklippet, men görs om: hon vill ha mer i början ("a bit empty at start"), en tandkrämstub och en QA-runda först. **Runda 2 (2026-11-11, Sanna: "Looks good"):** ny öppning med tandkrämstuben (`rekvisita/tandkramen.md`), kaninens två långa framtänder, kattens lite spetsiga tänder, glans och gnistor i refrängerna, slutdans och sen kritiris. Grovklippet är ombyggt på förhandsvisningen; runda 1 ligger kvar som `film/avsnitt-030-grovklipp-runda1.mp4` och `film/avsnitt-030-runda1.mp4`. **Nästa:** Sanna gör den längre tagningen (version 2 i [suno.md](suno.md)); bilden tajmas om efter den och slutrenderas sedan. Tagning 1 är vald (`sang.m4a`), radtiderna står i [rader.txt](rader.txt).

Piloten för **borstasången** (`format/borstasang.md`): en mycket enkel sång som görs om med nya figurer. 025 Katten borstar tänderna är bilderboken och står kvar som den är; det här avsnittet lånar dess rigg, tandborste och badrum.

| | |
|---|---|
| **Titelkort** | Avsnitt 30 · Borsta, borsta |
| **Figurer (3)** | **Katten Kaj** (v2, har tandmunnen och borstposen) · **Kaninen Kanel** (v2, riggad) · **Pandan Pim** (v2, riggad) |
| **Platser (1)** | Badrummet (`bakgrunder/badrummet.md`). Inget platsbyte, så inget kritsvep |
| **Saker** | tandborsten (`rekvisita/tandborsten.md`, finns) · handfatet och pallen (finns). Inga nya saker |
| **I kod** | tänderna (matt → vit), skum, skumklicken på nosen, glansstjärnan |
| **Utsnitt (3)** | helbild · ansiktet (2,8) · munnen (4,0) |
| **Nytt i riggarna** | tandmunnen (`gapar`, `flinar`, `tander`) och posen `borstar` på kaninen och pandan, ur kattens `uttryck.html` |
| **Favoriter** | 🐱 katt · 🐰 kanin · 👅 mun (gapa) |
| **Barnet övar på** | gapa stort · peka på tänderna · göra djurens ljud |

## Sången mot bilden
Se tabellen "Bilden på orden" i `format/borstasang.md`. Egen för 030 är bara den roliga scenen: skumklicken på kaninens nos i refräng 2.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer, 1 plats, inga nya saker
- [x] En fråga till tittaren med paus 4 s: *"Var är tänderna?"*, sedan visar figurerna svaret
- [x] Vardagshandling: borsta tänderna
- [ ] **Ingen ritscen och inget tack** (Sanna 2026-11-11: "no kritan ritar"). Filmen börjar direkt i badrummet
- [x] Upprepning: samma vers och refräng tre gånger
- [x] Inget läskigt, inga djurnamn i det som sjungs, egen sång
- [x] Går att klippa ut som Short: vers 1 + refräng (ca 25 s)
- [ ] **Längden** blir ca 2 min, inte 3–4 min (medvetet, se `format/borstasang.md`)
- [ ] **Inget problem som löses med en kompis** (medvetet, sången ska vara mycket enkel)

## Öppet
1. **Suno-tagningen**: se "Lyssna efter" i [suno.md](suno.md).
2. **Tänderna på kaninen och pandan**: munnens mått per figur. Pandans svarta nosfläck och kaninens ljusa nosfläck behöver varsin provbild som kattens (`avsnitt/025-katten-borstar-tanderna/provbild/`).
3. **Borsten byter hand** mellan figurerna: prova att den ligger på handfatet mellan verserna.
