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

## Engelska versionen (Let's Go Swimming!)

Samma scener, tajmade om till de engelska tagningarna `../en/sang.m4a` (3:12.6) och `../en/badplatsen-sang.m4a` (1:20.4), som 005 och 007.
Scenerna räknar fortfarande i den svenska tagningens tider; `kit.kor()` gör om dem när sidan öppnas med `?en`: en styckvis linjär karta
svensk tid → engelsk tid ur paren i `../en/rader.txt` (scen A, sångtid) och `../en/rader-badplatsen.txt` (badplatsen, scenens tid).
Två par med samma engelska tid är ett hopp (körscen 1 hoppar över närbilden och dansen före "The sun is shining", mellanspelet är 2,5 s i stället för 15).
Introt (`../intro/index.html?en`) och badplatsens slutkort skriver "tiny crayon tv"; introt "Episode 4", "Let's Go Swimming!". Utan `?en`/`--en` är allt som förut.

```bash
node scener/render.mjs intro --en                  # (från avsnittsmappen) → intro/intro-en.mp4
node scener/render.mjs scener/korscen-1 --en       # → korscen-1-en.mp4, korscen-1-en-effekter.wav; med tider: stills-en/
film/satt-ihop.sh en                               # → film/avsnitt-004-en.mp4 (jingeln: ../../format/jingel-en.m4a)
```

Engelska starter (sångtid): kritan ritar 0:00, körscen 1 0:24.3, körscen 2 1:29.7, körscen 3 2:42.5, slut 2:57.6; badplatsen 1:07.5 (sången tonas ut 1:04.5–1:07.5).
