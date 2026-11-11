# 029 Leoparden plockar äpplen – storyboard

**Status:** första storyboarden 2026-11-11, byggd ur `../manus.md` (godkänt av Sanna). Förlaga: 023.

**Längd:** räknas av bygg.mjs.

Stillbilderna tas ur själva kodscenen (`../scener/appeltradet/index.html`), så storyboard, animatik och film är samma bild. Raderna (tider, repliker, ljud) står i `rader.mjs`.

Bygg (från repots rot, kostar inga krediter):

```
node avsnitt/029-leoparden-plockar-applen/storyboard/bygg.mjs              # frames/, index.html och tabellen här
node avsnitt/029-leoparden-plockar-applen/storyboard/bygg.mjs --animatik   # dessutom animatik.mp4
```

## Avsteg och val

- **Introt** är det gemensamma bilderbok-introt (`produktion/youtube/bilderbok-intro/`, 3,3 s). Scenen öppnar på rent papper, inget kritsvep.
- **Leoparden** är Lovas v2-rigg med tunna kanter (`premium/cut-tunn/`).
- **Korgen** är `korg-v3-tunn.png` (kanten 1 % av höjden, det vita hålet under handtaget urklippt). Äpplena är `applet-rott-v3-tunn.png`, ansiktet ritas inte.
- **Vips:** posen `strack`, äpplet lossnar på *"Vips"* och landar på *"korgen"*. Leoparden tar aldrig i äpplena.
- **Tittut:** leoparden är bakom kronan; bara huvudet och öronen (klippta i en ellips) kommer fram vid kronans kant.

## Platshållare som väntar på bilder och ljud

| Vad | Var i koden | Väntar på |
|---|---|---|
| ⚠ Plattan | `PLATTA` (null = vägg, golv och gräsrand i kod) i `../scener/appeltradet/index.html` | v2-plattan av äppelträdet utan träd |
| ⚠ Trädet | `TRAD` (fil och mått) | det tomma trädet med den breda stammen; nu `appeltrad-mork-tom-tunn.png` (smal stam) |
| ⚠ Malins repliker | `ROST`, `UPPSKATTAD` och `MATT` i `rader.mjs` | tagningen i `assets/ljud/roster/leoparden-plockar-applen/`; mät längderna och orden (vips, korgen) |
| ⚠ Leopardens `spinn-gullig` | `SP()` i `rader.mjs`, `SPINN` | ljudfamiljen (8 känslor); tills dess `spinn-fniss` kort som stand-in |

<!-- tabell -->
<!-- /tabell -->
