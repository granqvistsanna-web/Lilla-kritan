# Scener – avsnitt 004

Samma kodscen-kit som 003 (`kit.js` och `render.mjs` är kopierade därifrån, se `../../003-bussen-halsar-pa/scener/README.md` för hela API:t). Ändrat för 004: takten (ca 99 bpm, `BEAT = 0.6038`, `BEAT0 = 0.82`). Tiderna läses ur `../rader.txt` (avsnittstid = sångtid + 11 s) och SHOTS i `../storyboard/bygg.py`.

| Scen | Mapp | Storyboard | Sångtid |
|---|---|---|---|
| Intro | `../intro/` | 01 | – (jingeln, som 003) |
| Kritan ritar | `../kritan-ritar/` | 02–03 | 0:00–0:30 |
| Körscen 1 | `korscen-1/` | 04–10d | 0:30–1:22 |
| Körscen 2 | `korscen-2/` | 11–16d | 1:22–2:17 |
| Körscen 3 | `korscen-3/` | 17–17a | 2:17–2:29 |
| B · Badplatsen | `b-badplatsen/` | 18–22 | ingen sång, lugn instrumental bädd (finns inte än) |

Gemensamt för refrängernas musikvideo (a, c, d är samma bilder varje gång): `refrang.js` här i `scener/`.

Regler: ändra inte `kit.js` direkt från en scen. Behövs något nytt i kitet, be huvudsessionen. Raka klipp, inga kritsvep. Ingen text i bild.

```bash
python3 -m http.server 8000 -d ~/Documents/Lilla-kritan
node render.mjs korscen-1
```
