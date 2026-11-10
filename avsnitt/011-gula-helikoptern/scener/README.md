# Kodscener – avsnitt 011 Gula sången (färgsång v2)

Byggt som 013 efter `format/fargsang-v2.md`. Scenerna är SVG-sidor som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).

- `../storyboard-v2/scen-kit.js`: platserna (himlen, dammen, jättesolen, discot), helikoptern v3 (bubblan och rotorn ritas i kod, bara rotorn snurrar, helikoptern flyger alltid åt höger), riggarna (laddas live ur varje figurs `uttryck.html` med `verktyg/rigg-motor.js`), sakerna, kameran, kritsvepet, kritirisen och vita kanter (`verktyg/kant.js`).
- `film.js`: en `ANIM` per storyboardrad. Tiderna läses ur `../storyboard-v2/storyboard.md` (kolumnen Tid), så en ändrad tid där flyttar bilden. Orden (ha-ha, upp, surr, mums, vifta, hej) står i `ORD`, effekterna i `EFFEKTER_FILM`.
- `<scen>/index.html` sätter `window.SCEN = [första rad, sista rad]` och scenens röster (`ROSTER`).

**Tid:** avsnittstid = sångtid + 22,2 s (introt 9,0 s + kritan ritar 13,2 s). Scenens t = 0 är dess första storyboardrad. Sången (`../sang.m4a`) klipps aldrig.

| Scen | Rader | Avsnittstid | Innehåll |
|---|---|---|---|
| `kritan-ritar/` | 01a–01c | 0:09.0–0:22.2 | Kritan ritar bananens kontur (ca 7 s, skogsljud under), knackar, "En gul banan!", fyllningen |
| `himlen/` | 02a–06e | 0:22.2–1:32.0 | Helikoptern i himlen, vers 1, refräng 1 (solen), humlan, bananen, refräng 2, kritsvep till dammen |
| `dammen/` | 07a–09e | 1:32.0–2:09.1 | Kon i solhatten, vinden tar hatten, grodan hämtar den, refräng 3 vid dammen |
| `discot/` | 10a–11e | 2:09.1–2:39.9 | Discot i gult: klappa, gunga, hoppa; klistermärkena banan, humla, hatt, helikopter |
| `slutet/` | 12 | 2:39.9–2:53.2 | Helikoptern flyger in, Lage vinkar och blir sömnig, kritirisen, svart |

## Köra
```bash
node render.mjs himlen 1 5 9.5            # stillbilder → himlen/stills/sheet.jpg
node render.mjs himlen --snabb            # förhandsvisning (960×540, 15 fps, samma filnamn)
node render.mjs himlen                    # hela scenen
../film/satt-ihop.sh                      # → ../film/avsnitt-011-grovklipp.mp4 (173,2 s)
```
Högst två scener renderas samtidigt.

## Ljud
- Rösterna (`titta-4`, `nagot-langt-1`, `en-banan-en-gul-banan-1`, `nu-flyger-vi-1`) och ElevenLabs-effekterna (`helikopter-start`, `-stannar`, `-surr`, `moln-puff`, `vind-hatt`, `ryt-gasp`, tagning 1 av varje) finns; `helikopter-surr` loopar lågt medan rotorn snurrar. Effektlistan i `film.js` tar första filen som finns, så en annan tagning väljs där.
