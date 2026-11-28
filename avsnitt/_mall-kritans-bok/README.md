# Mall för Kritans bok

Ett litet, körbart bokavsnitt (kaninen, solen, en glass, två blommor) att börja från. Receptet står i [`format/kritans-bok.md`](../../format/kritans-bok.md), motorn i `produktion/three-rum/popupbok/uppslag.js`. Manus, röst, ljud och YouTube görs som i bilderboken (`avsnitt/_mall/`, `format/bilderbok.md`).

## Börja

1. Kopiera mappen till `avsnitt/NNN-namn-i-boken/`. Inget i koden nämner mappens namn, så den fungerar direkt.
2. `storyboard/rader.mjs`: `TITEL`, `ROSTMAPP`, `MATTA`, replikerna (`ROST`) och raderna med läget per rad (`s`).
3. `storyboard/uppslaget.js`: pärmens färg och siluett, bilderna, korten och deras koordinater, huvudsaken och hjälpsaken (kritans två teckningar), figurens platser och vyerna. **Uppslaget byggs bara här**, storyboarden och scenen läser samma fil.
4. Grind 5: `storyboard/scen.js` (lägena per rad, figuren som platt kort) och `node avsnitt/NNN-namn/storyboard/bygg.mjs [--animatik]`.
5. Grind 6: `scener/boken/boken.js` (riggen, tiderna, rörelserna per rad, bildrutan, vyerna per rad, volymerna).

## Filerna

| Fil | Vad | Byts |
|---|---|---|
| `storyboard/rader.mjs` | replikerna och raderna, läget per rad | allt |
| `storyboard/uppslaget.js` | boken, korten, koordinaterna, vyerna (`byggUppslaget`) | allt som är temat |
| `storyboard/scen.js`, `scen.html`, `bygg.mjs`, `storyboard.md` | stillbilderna och animatiken | `scen.js`: figurens bild och lägena |
| `scener/boken/index.html` | sidan (`#bild`, `#kort`, `#ov`, skripten) | titeln |
| `scener/boken/boken.js` | scenen | riggen, tiderna, rörelserna, effekterna |
| `scener/render.mjs` | en rad som pekar på `produktion/three-rum/render.mjs` | – |

## Rendera

```bash
node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken 3 12 40       # stillbilder
node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken --snabb       # förhandsvisning
node verktyg/render-delat.mjs avsnitt/NNN-namn/scener/boken                         # slutrendering (eller verktyg/molnrender.sh)
```

Mallens röstfiler finns inte (`UPPSKATTAD = true`), så stillbilder går att rendera men filmen behöver riktiga ljud.
