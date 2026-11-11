# 028 Leoparden bygger i sanden – storyboard

**Status:** första storyboarden 2026-11-11, byggd ur `../manus.md` (godkänt av Sanna). Förlaga: 023.

**Längd:** räknas av bygg.mjs.

Stillbilderna tas ur själva kodscenen (`../scener/stranden/index.html`), så storyboard, animatik och film är samma bild. Raderna (tider, repliker, ljud) står i `rader.mjs`.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/028-leoparden-bygger-i-sanden/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/028-leoparden-bygger-i-sanden/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg och val

- **Introt** är det gemensamma bilderbok-introt (`produktion/youtube/bilderbok-intro/`, 3,3 s). Scenen öppnar på rent papper, inget kritsvep.
- **Leoparden** är Lovas v2-rigg med tunna kanter (`premium/cut-tunn/`, ca 1 % av höjden; originalen var ca 1,6 %).
- **Hinken och spaden** är tunna kopior (`hink-gul-tunn.png`, `spade-rod-tunn.png`, inbakad kant 1 % av höjden, koden lägger grunden 3 px).
- **Hinken som tippar** vrids 180° i bildplanet i en lugn båge (0,8 s) och landar upp och ner. Ser det ut som att den snurrar: låt den landa upp och ner direkt (manus, öppen punkt 3).
- **Klappen** är riggens klapp med två klapp (den tredje hoppas över) på Malins två "klapp".
- **Spaden** blir kvar bakom hinken efter sandkaka två (rad 11), därför syns bara skaftet i rad 12–13.

## Platshållare som väntar på ljud

| Vad | Var i koden | Väntar på |
|---|---|---|
| ⚠ Malins repliker | `ROST`, `UPPSKATTAD` och `MATT` i `rader.mjs` | tagningen i `assets/ljud/roster/leoparden-bygger-i-sanden/`; mät längderna och orden (klapp, sandkaka, hopp) |
| ⚠ Leopardens `spinn-gullig` | `SP()` i `rader.mjs`, `SPINN` | ljudfamiljen (8 känslor); tills dess `spinn-fniss` kort som stand-in |

<!-- tabell -->
<!-- /tabell -->
