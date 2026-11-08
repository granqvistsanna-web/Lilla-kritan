# Kodscener – avsnitt 013 Röda sången (v2 med kaninen, byggda 2026-11-08)

Scenerna ritas med **samma kod som storyboarden**: `../storyboard-v2/scen-kit.js` (SVG:n, brandbil E, kaninen via `kanel-motor.js`, platserna, sakerna, kameran). Storyboarden (`board.html`) ställer upp en stillbild per bild; scenerna gör samma bilder i rörelse. Ändras ett utseende i kitet ändras både storyboarden och filmen.

- **`film.js`**: rörelsen för varje storyboardbild (`ANIM['04c'] = (u, s, d) => …`, u = 0–1 inom bilden, s = sekunder). Tiderna läses ur `../storyboard-v2/storyboard.md`, så scenerna följer storyboardens tabell. Kaninen blinkar, brandbilen gungar i takten (120 bpm, slagen från sångens start 24,5 s) och vägen rullar, utan att varje bild behöver säga det. Refräng 2 (07) spelar refräng 1:s rörelser.
- **`<scen>/index.html`**: sätter bara `window.SCEN = [första, sista]` och laddar kitet och film.js.
- **`render.mjs`**: som 007. `node render.mjs <scen> --snabb` för förhandsvisning (960×540, 15 fps), utan `--snabb` för slutrenderingen. `node render.mjs <scen> 2 7.5` ger stillbilder.
- **`../film/satt-ihop.sh`**: scenerna efter varandra, introt med jingeln (`../intro/intro.mp4`), sången från 24,5 s och scenernas effekter → `../film/avsnitt-013-grovklipp.mp4`.

| Scen | Storyboard | Avsnittstid |
|---|---|---|
| `../intro/` | 00 | 0:00–0:11.3 (formatets intro med jingeln, som 014) |
| `kritan-ritar/` | 01a–01c | 0:11.3–0:26.5 (zoom in i äpplet när sången börjar) |
| `vagen-1/` | 02a–04i | 0:26.5–1:12.9 (refräng 1 på äppelbacken) |
| `vagen-2/` | 05a–07a–i | 1:12.9–2:02.2 (bussen, ballongen, tungan med gissningspausen, refräng 2) |
| `chilibilen/` | 08a–12e | 2:02.2–2:44.9 |
| `discot/` | 13a–14c | 2:44.9–3:08.2 |
| `slutet/` | 15 | 3:08.2–3:24.9 (kritirisen) |

**Kvar:** ljudeffekterna ur `../ljud.md` är inte lagda (bara "Vad kan det vara?" ur röstbanken); de tre nya berättarrösterna saknas; munformerna och slangen är enkla; brandbilen är den oputsade E. Discot och slutet ska få 014:s utseende.

**Rörelseregler:** figurer och fordon snurrar och vänds aldrig, de lutar och skuttar. Brandbilen kör alltid åt höger. Inga effektstreck och inga puffar eller bubblor; blåljuset blinkar i takten. Sången klipps aldrig.
