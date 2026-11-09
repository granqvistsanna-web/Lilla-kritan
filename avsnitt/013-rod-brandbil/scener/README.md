# Kodscener – avsnitt 013 Röda sången (v2 med kaninen, byggda 2026-11-08)

Scenerna ritas med **samma kod som storyboarden**: `../storyboard-v2/scen-kit.js` (SVG:n, brandbil E, kaninen via `kanel-motor.js`, platserna, sakerna, kameran). Storyboarden (`board.html`) ställer upp en stillbild per bild; scenerna gör samma bilder i rörelse. Ändras ett utseende i kitet ändras både storyboarden och filmen.

- **`film.js`**: rörelsen för varje storyboardbild (`ANIM['04c'] = (u, s, d) => …`, u = 0–1 inom bilden, s = sekunder). Tiderna läses ur `../storyboard-v2/storyboard.md`, så scenerna följer storyboardens tabell. Kaninen blinkar, brandbilen gungar i takten (120 bpm, slagen från sångens start 24,5 s) och vägen rullar, utan att varje bild behöver säga det. Refräng 2 (07) spelar refräng 1:s rörelser.
- **`<scen>/index.html`**: sätter bara `window.SCEN = [första, sista]` och laddar kitet och film.js.
- **`render.mjs`**: som 007. `node render.mjs <scen> --snabb` för förhandsvisning (960×540, 15 fps), utan `--snabb` för slutrenderingen. `node render.mjs <scen> 2 7.5` ger stillbilder.
- **`../film/satt-ihop.sh`**: scenerna efter varandra, introt med jingeln (`../intro/intro.mp4`), sången från 24,5 s och scenernas effekter → `../film/avsnitt-013-grovklipp.mp4`.

| Scen | Storyboard | Avsnittstid |
|---|---|---|
| `../intro/` | 00 | 0:00–0:09.0 (formatets intro med jingeln, kortat; slutar med kritsvepet `svepIn`) |
| `kritan-ritar/` | 01a–01c | 0:11.3–0:26.5 (konturen 0:11.3–0:18.5; väntan 0:19.5–0:21.0 klipps bort i `../film/satt-ihop.sh`) |
| `vagen-1/` | 02a–07i | 0:26.5–1:35.3 (vägen, bussen, ballongen, blomman, refräng 1 och 2 på äppelbacken) |
| `applemarsch/` | 08a | 1:35.3–1:50.6 (danspausen: äpplena marscherar och hoppar) |
| `discot/` | 11a–12d | 1:50.6–2:32.8 (discot, sista refrängen, hejdå med brandbilen som kör fram) |
| `slutet/` | 13 | 2:32.8– (kritirisen) |

`chilibilen/` och `_skiss-ratt/` används inte i filmen längre. Byggs ihop av `../film/satt-ihop.sh` (`SCENER=(kritan-ritar vagen-1 applemarsch discot slutet)`). Receptet för nästa färgsång: [format/fargsang-v2.md](../../../format/fargsang-v2.md).


**Rörelseregler:** figurer och fordon snurrar och vänds aldrig, de lutar och skuttar. Brandbilen kör alltid åt höger. Inga effektstreck och inga puffar eller bubblor; blåljuset blinkar i takten. Sången klipps aldrig.
