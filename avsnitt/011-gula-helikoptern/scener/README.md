# Kodscener – avsnitt 011 Gula sången v5 (färgsång v2)

Byggt som 013 efter `format/fargsang-v2.md`, från storyboard v5 (`../storyboard-v5/storyboard.md`, godkänd 2026-11-10). Scenerna är SVG-sidor som `render.mjs` filmar (Playwright + ffmpeg, 1920 × 1080, 30 bilder/s).

- `../storyboard-v2/scen-kit.js`: platserna (ängen `angen-v4.png` med bergen och sidoblommorna i plattan, himlen, jättesolen, discot), helikoptern v3 (bubblan, rotorn och stjärtrotorn ritas i kod, glasbubblan kan fällas upp bakåt med `lucka`, helikoptern flyger alltid åt höger), solfiguren (`solFigur`: strålar och kropp ur den målade jättesolen i `_bilder/sol/`, ansiktet i kod), riggarna (laddas live ur varje figurs `uttryck.html` med `verktyg/rigg-motor.js`), sakerna, klistermärkena (helikopter, sol, banan, humla, smörblomma), kameran, kritsvepet, kritirisen och vita kanter (`verktyg/kant.js`). Kitet ligger kvar i `storyboard-v2/`; sidorna pekar ut v5:s tider med `window.STORYBOARD`.
- `film.js`: en `ANIM` per storyboardrad. Tiderna läses ur `../storyboard-v5/storyboard.md` (kolumnen Tid), så en ändrad tid där flyttar bilden. Ekoorden (snurr, hej, mums, ha-ha, surr, vifta) står i `EKO_RAD`, effekterna i `EFFEKTER_FILM`, refrängdansen i `DANS_ROR`, bananernas dans (04f, 07f) i `bananRad` och molnpassagerna upp till solen i `MOLNPASS`. Hörnet uppe till höger (013:s skiva): rörelsen i discot i `ROR_RAD`, ordmärken i `ORD_RAD` (tom: saken syns alltid i bild). Kawaiiögonen är ett eget uttryck (`kawaii`, blandbart med `U(namn, 'jatteglad', 'kawaii', k)`) som kitet lägger till i varje rigg. Introts gula kritsvep (`SVEP`) är det enda kvar; alla andra byten är molnpassager (`MOLNPASS`, riktning upp eller ner). Lages bilder läses ur `_bilder/` + `LAGE_MAPP` i kitet (nu `lage-gul-2/`, gulare kopior; `lage-tunn/` är den förra).
- `<scen>/index.html` sätter `window.SCEN = [första rad, sista rad]` och scenens röster (`ROSTER`).

**Tid:** avsnittstid = sångtid + 23,4 s. Scenens t = 0 är dess första storyboardrad. Sången (`../sang-v5.m4a`) klipps aldrig. Rörelserna är lugna: gungningar och mjuka lyft, ingen slagpuls (den studsiga riktningen avvisades).

| Scen | Rader | Avsnittstid | Innehåll |
|---|---|---|---|
| `kritan-ritar/` | 01a–01c | 0:09.0–0:23.4 | Kritan ritar (papperet fyller bilden) bananens kontur i närbild (ingen knackning), "En banan! En gul banan!", fyllningen, "Nu flyger vi!", hålet i papperet mot ängen |
| `vers1/` | 02a–04f | 0:23.4–1:20.4 | Kritan ritar långsammare (konturen ca 7 s). Lage lite ledsen på ängen, hoppar in, upp i himlen (solen långt borta säger hej), tre lyft, molnpassage till jättesolen, refräng 1 (bananen på molnet, bubblan öppnas, två tuggor, bananerna dansar) |
| `vers2/` | 05a–07f | 1:20.4–2:08.4 | Molnen öppnar sig nedåt, landar på ängen, Lage kliver ut och hittar humlan och smörblomman till fots, hoppar in igen, molnpassage, refräng 2 med Humle |
| `svansen/` | 08a–09b | 2:08.4–2:41.4 | Landar på ängen igen: den gula svansen bland smörblommorna (tittut), Lage hoppar in och de lyfter, molnen öppnar sig mot discot, Lage hoppar ut |
| `discot/` | 10a–11g | 2:41.4–3:43.5 | Två dansvarv (Lage, Kanel, Hugo; Humle är inte med), frågeleken med klistermärkena i bågen, den långa skrattkroken |
| `slutet/` | 12a–12b | 3:43.5–3:56.6 | Helikoptern hämtar Lage, Kanel och Hugo vinkar, hem mot solen, kameran glider in i solskenet mot Lage, kritirisen sluter sig långsamt, svart |

## Köra
```bash
node render.mjs vers1 1 5 9.5             # stillbilder → vers1/stills/sheet.jpg
node render.mjs vers1 --snabb             # förhandsvisning (960×540, 15 fps, samma filnamn)
node render.mjs vers1                     # hela scenen
../film/satt-ihop.sh                      # → ../film/avsnitt-011-grovklipp.mp4
```
Högst två scener renderas samtidigt. v2:s renderingar och kod ligger i `../film/gamla-v2/` och `../film/gamla/v2-kod/`.

## Ljud
- Rösterna (`titta-4` 9,2, `nagot-langt-1` 13,5, `en-banan-en-gul-banan-1` 18,7, `nu-flyger-vi-1` 22,2) står i `kritan-ritar/index.html`. `en-banan` börjar 18,7 i stället för storyboardens 20,0, annars krockar den med "Nu flyger vi!".
- Effekterna (helikopter-start/-surr/-stannar, moln-puff, mums, surr, glitter, svansvift, ryt-gasp, landa-mjuk, klistra, och från 2026-11-10 swoosh på molnpassagerna, hopp-mjuk på Lages hopp, gung-knarr när bubblan fälls, pling, glitter på kawaiiögonen, fågelkvitter under ängen, plopp när bananerna dansar; ritljudet i introt är `krita-ritar`) ligger lågt under sången. Listan i `film.js` tar första filen som finns.
- Ekoordens tider är uppskattade ur radernas tider och takten (100 bpm), inte uppmätta. Justera `EKO_RAD` om en mun eller tugga kommer fel.
