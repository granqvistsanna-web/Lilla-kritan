# Kodscener – avsnitt 017

En enda kodscen för hela sången, som 026 och 027: `skogen/index.html` (bilderna) och `skogen/skog.js` (platsen, figurerna, kritan, ritintrot och kritirisen). Tiden är **sångtid**: t = 0 är början på `../sang.mp3`, som aldrig klipps. Avsnittstid = sångtid + 9 s intro.

| Mapp | Bilder | Sångtid | Status |
|---|---|---|---|
| `../intro/` | 00 (016:s intro, blåbärsblå `#3A4FB8`, *Mors lilla Olle*; `intro-med-jingel.mp4` = `intro.mp4` + jingel + effekter) | – | ✅ renderad |
| `skogen/` | 01–28 (ritintro på papper, zoom in, sedan Skogen 1) | 0:00–2:15 | 🟡 `--snabb` |

- Rendera: `node verktyg/render-delat.mjs avsnitt/017-mors-lilla-olle/scener/skogen` (förhandsvisning `--snabb`). Stillbilder: `node render.mjs skogen 9 23 45 …` från den här mappen.
- `render.mjs` är 016:s, med `../sang.mp3` tillagd som sångfil.
- Ett läge per storyboardbild i `B` (sångtid); ansikten och poser glider 0,45 s in i nästa bild.
- Blåbären är kod: på busken (`buskBar`), i korgen (`korgN`: +1 när ett plockat bär landar, −1 för varje tugga i bild 18), i luften (`FLYG`).
- Lagren: mor ritas framför Olle (bild 25–28, hon står bredvid honom och räcker bären över hans huvud). Björnen bakom busken eller stenen har `bak: true` och klipps vid marken.
- Slutet: kritirisen startar 2:11,6 och sluter sig vid 2:14,8.
