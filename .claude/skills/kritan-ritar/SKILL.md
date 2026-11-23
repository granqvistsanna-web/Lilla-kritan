---
name: kritan-ritar
description: Hur kritan ritar i Lilla Kritan, så att det alltid ser likadant ut i varje avsnitt och short – ritintrot, saker kritan ritar mitt i en scen (gosedjuret, stjärnan, stetoskopet) och Gissa teckningen. Konturen i en mörk kritlinje i ett lugnt drag, kritans spets alltid i linjens ände (125°), glidning i en båge mellan strecken, väntplats där kritan svajar (140°), fyllning inifrån med en växande cirkel, linjen tonas bort, krit-gnistor, kritan flyger ut uppe till höger. Delad kod i verktyg/kritan-ritar.js och konturer ur verktyg/kontur.py. Use when the user says "kritan ritar", "kritan ska rita", "rita med kritan", "ritintro", "krita draws", "crayon draws", "the crayon drawing looks different", "kritan hoppar", "kritan flimrar", eller när en ny scen eller ett nytt avsnitt låter kritan rita något.
---

# Kritan ritar

Kritan är **en sak, inte en figur**: en röd vaxkrita utan ansikte som aldrig vänds och aldrig knackar. Den ritar alltid på samma sätt, oavsett om det är ritintrot, en sak mitt i en scen eller en Gissa teckningen-short. Reglerna kommer från färgsångerna (`format/ritintro.md`), 045 och 046, där Sanna godkände dem.

**All ny kod använder `verktyg/kritan-ritar.js`.** Där finns de godkända siffrorna (vinklar, skalor, svaj, fart, fyllning, gnistor) på ett ställe. Kopiera inte in egna varianter i avsnittet, och ändra en siffra i den filen om Sanna vill ändra något. Provsidan är `verktyg/prov/kritan-ritar-prov.html`.

## Förloppet (alltid i den här ordningen)

| Fas | Vad som händer | Värden |
|---|---|---|
| 1. In | Kritan kommer in uppifrån höger till första streckets början och sänker spetsen | 0,4 s, mjuk |
| 2. Ritar | **Bara konturen**, i en mörk kritlinje. Linjen växer fram och **kritans spets sitter alltid i linjens ände**. Flera streck: kritan **glider i en liten båge** (40 px) från ett strecks slut till nästas början, och den hoppar aldrig. | ritintrot ca 2,8 s (Sanna 2026-11-23, förut 7 s); saker mitt i en scen ca 3–5 s; `ritfart` (jämn fart med mjuk start); vinkel **125°** |
| 3. Står kvar | När konturen är klar står kritan kvar i sista spetsen tills nästa fas. Den får inte försvinna och komma tillbaka (det ger flimmer). | |
| 4. Väntar | Kritan glider i en båge till en **väntplats på fri yta** och svajar lugnt medan barnet gissar | 0,8 s; svaj ±5/±4 px, vinkel **140° ± 1,5°** (lugnt, Sanna 2026-11-21) |
| 5. Svaret | Den riktiga bilden **fylls i inifrån** med en cirkel som växer från sakens mitt (`r ∝ mjuk(f)^1.2`, 0,5–0,8 s). Linjen tonas bort under tiden (från 15 % till 90 % av fyllningen). Fem **krit-gnistor** poppar fram runt saken. | `pling` eller `tindra` |
| 6. Ut | Kritan flyger ut uppe till höger, ut ur bild | 0,8 s, mjuk |

## Linjen och konturen

- **Färg:** mörk kritlinje `#3a2c28`, eller i färgsångerna en mörk ton av avsnittets färg. Runda ändar och hörn.
- **Bredd:** 12 px i helbild (ungefär 3 % av sakens höjd). Ritas linjen i bildens egna pixlar, dela bredden med sakens skala.
- **Konturen ur en urklippt bild:**

  ```bash
  python3 verktyg/kontur.py assets/rekvisita/<sak>/cut/<sak>.png assets/rekvisita/<sak>/cut/<sak>-kontur.json --krymp 28 --mitt
  ```

  Det ger en enda sluten, mjuk bana (`d`) i bildens pixlar, plus `start` och `mitt` (fyllningens mitt). `--krymp` lägger linjen innanför den vita kanten. Använd 5 för små bilder och ca 28 för stora (600–900 px).
- **Bara ytterformen** och högst en liten detalj. Formen ska gå att gissa. Ett drag är bäst. En sak med tydliga delar, som stetoskopet, får flera streck (`ritBana` med `vikt` per streck).
- **Saker i kod** (stetoskop, stjärna): skriv strecken som en lista med SVG-banor i scenens mått (som `STETO_DRAG` i 046) och ge dem till `ritBana`.

## Kritan

- Bilden är `assets/rekvisita/krita-rod/cut/krita-rod.png`, spetsen i (742, 132).
- **Skala:** 0,42 på ritpapperet. I en scen är skalan 0,33/√zoom (`kritaSkala(zoom)`), så att kritan är lika stor i bild hur nära kameran än går.
- **Kritan går aldrig över ett ansikte.** Lägg väntplatsen och ut-banan på fri yta, bort från figurerna. Kommer kritan in i en scen med figurer, ska den komma uppifrån höger.
- Ingen knackning, inget `tass`-ljud och inget `skrrrrt`. Ljudet är `effekter/krita-ritar` i loop under fas 2, vol ca 0,9–1,6, med 0,4 s fade.

## Var

- **Ritintrot:** krämvitt papper som fyller hela bilden (`#FBF7EE`/`#FDFBF4`), utan kant. Kameran följer saken. I gissningspausen kryper den sakta in (+12 %), och efter svaret zoomar den in i teckningen. Se `format/ritintro.md` för tidslinjen och repliker (*"Titta!"*, ledtråden, svaret).
- **I en scen** (gosedjuret, stjärnan): samma förlopp direkt i rummet, på fri yta bredvid figuren. Den fyllda saken flyttas sedan dit den ska (till famnen, till magen).
- **Besöket:** kritan ritar besökets sak i introt, till exempel stetoskopet (`format/besoket.md`).

## Användning

```html
<script src="/verktyg/kritan-ritar.js"></script>
```

```js
const T = { in: [0, 0.4], rit: [0.6, 8], vanta: [8, 8.8], ut: [10.1, 10.9] };   // sekunder i scenen
const k = ritfart((t - T.rit[0]) / (T.rit[1] - T.rit[0])), f = kl((t - 10.1) / 0.7);
const R = ritBana([KONTUR.d], k, { attr: `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${KRITAN.BRED / sk}" stroke-linecap="round" stroke-linejoin="round" opacity="${linjeOpacitet(f)}"` });
// bilden: fyllMask('fy', KONTUR.mitt[0], KONTUR.mitt[1], R, f) + <image clip-path="url(#fy)">, sedan R.html ovanpå
const kr = kritaFas(t, T, { start: tillScen(R.start), spets: tillScen(R.spets), slut: tillScen(R.slut), vanta: [1430, 300], s: kritaSkala(zoom) });
if (kr) svg += kritaBild(kr.x, kr.y, kr);
svg += gnistor(cx, cy, 330, t - 10.1);
```

`tillScen` räknar om en punkt från bildens pixlar till scenens koordinater (translate + scale). I en kamera-grupp gör du som `leoSpets` i 046 och använder `getCTM`. Ett helt exempel finns i `verktyg/prov/kritan-ritar-prov.html`.

## Kontroll före rendering

Rendera stillbilder och lägg dem på ett kontaktark med minst en bild ur varje fas. Kontrollera:

1. Spetsen ligger på linjens ände i varje bild under fas 2.
2. Mellan strecken glider kritan och hoppar aldrig.
3. Kritan står kvar mellan fas 2 och 4 och försvinner inte.
4. Linjen är borta när bilden är fylld.
5. Kritan är aldrig över ett ansikte.
6. Kritan har samma storlek i bild som i de andra scenerna.

Titta också på 2–3 bildrutor i rad runt varje fasbyte, för flimmer syns inte i enstaka bilder.

## Gör inte

- Rita inte hela bilden med många kritor och färger (007). Det blir långt och svårt att gissa.
- Ingen platt färgad bild i en djup zoom, och inget kritsvep ut ur ritscenen.
- Fäst inte kritan vid en punkt som räknas om från ett annat streck än det som ritas just nu. Använd `ritBana`, så följer spetsen linjen.
- Skriv inte nya egna `krita()`-funktioner med andra vinklar eller skalor. Äldre avsnitt (011, 045, 046) har egna kopior. De får ligga kvar, men nya scener använder den delade filen.
