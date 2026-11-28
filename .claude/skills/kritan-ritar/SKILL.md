---
name: kritan-ritar
description: Hur kritan ritar i Lilla Kritan, så att det alltid ser likadant ut i varje avsnitt och short – ritintrot, saker kritan ritar mitt i en scen (gosedjuret, stjärnan, stetoskopet) och Gissa teckningen. En detaljerad teckning (kontur + detaljstreck mätta ur bilden) i en mörk kritlinje med mjuk, jämn rörelse, kritans spets alltid i linjens ände (125°), glidning i en båge mellan strecken, väntplats där kritan svajar (140°), fyllning inifrån med en växande cirkel, linjen tonas bort, krit-gnistor, kritan flyger ut uppe till höger. Delad kod i verktyg/kritan-ritar.js och konturer ur verktyg/kontur.py. Use when the user says "kritan ritar", "kritan ska rita", "rita med kritan", "ritintro", "krita draws", "crayon draws", "the crayon drawing looks different", "kritan hoppar", "kritan flimrar", eller när en ny scen eller ett nytt avsnitt låter kritan rita något.
---

# Kritan ritar

Kritan är **en sak, inte en figur**: en röd vaxkrita utan ansikte som aldrig vänds och aldrig knackar. Den ritar alltid på samma sätt, oavsett om det är ritintrot, en sak mitt i en scen eller en Gissa teckningen-short. Reglerna kommer från färgsångerna (`format/ritintro.md`), 045 och 046, där Sanna godkände dem.

**All ny kod använder `verktyg/kritan-ritar.js`.** Där finns de godkända siffrorna (vinklar, skalor, svaj, fart, fyllning, gnistor) på ett ställe. Kopiera inte in egna varianter i avsnittet, och ändra en siffra i den filen om Sanna vill ändra något. Provsidan är `verktyg/prov/kritan-ritar-prov.html`. `verktyg/qa-scen.py` (raden `krita kod`) flaggar scener och intron som visar kritan utan att ladda filen; från avsnitt 052 ska den raden vara tom, äldre avsnitt flyttas över när de ändå renderas om (Sanna 2026-11-25).

## Målet: detaljerat, mjukt, likadant

Tre saker gör att teckningarna hänger ihop mellan avsnitten (Sanna 2026-11-26: "detailed and smooth nice animation", och i 006: "fler detaljer så den blir lättare att gissa"):

1. **Detaljerad:** konturen och sedan de inre linjerna som gör saken lätt att känna igen, mätta ur bilden den blir.
2. **Mjuk:** kritan rör sig alltid med mjuk start och mjukt slut. Den stannar aldrig tvärt, hoppar aldrig och rycker aldrig igång. Allt det sköter `ritBana` + `kritaFas`; skriv ingen egen rörelse för kritan.
3. **Likadan:** samma krita, linje, storlek, ordning, ljud och tider i varje avsnitt. Siffrorna finns bara i `verktyg/kritan-ritar.js`.

## Förloppet (alltid i den här ordningen)

| Fas | Vad som händer | Värden |
|---|---|---|
| 1. In | Kritan kommer in uppifrån höger till första streckets början och sänker spetsen | 0,4 s, mjuk |
| 2. Ritar | **Konturen först i ett drag, sedan detaljerna**, i en mörk kritlinje. Linjen växer fram och **kritans spets sitter alltid i linjens ände**. Varje streck börjar och slutar mjukt. Mellan strecken **glider kritan i en liten båge** (40 px) i lugn fart, och den hoppar aldrig. Efter konturen kan kritan vila en stund (`vila`) innan detaljerna. | konturen: ritintrot ca 2,8 s (Sanna 2026-11-23, förut 7 s), saker mitt i en scen ca 3–5 s; detaljerna ca 1,5–2,5 s till; `ritfart`; vinkel **125°** |
| 3. Står kvar | När konturen är klar står kritan kvar i sista spetsen tills nästa fas. Den får inte försvinna och komma tillbaka (det ger flimmer). | |
| 4. Väntar | Kritan glider i en båge till en **väntplats på fri yta** och svajar lugnt medan barnet gissar | 0,8 s; svaj ±5/±4 px, vinkel **140° ± 1,5°** (lugnt, Sanna 2026-11-21) |
| 5. Svaret | Den riktiga bilden **fylls i inifrån** med en cirkel som växer från sakens mitt (`r ∝ mjuk(f)^1.2`, 0,5–0,8 s). Linjen tonas bort under tiden (från 15 % till 90 % av fyllningen). Fem **krit-gnistor** poppar fram runt saken. | `pling` eller `tindra` |
| 6. Ut | Kritan flyger ut uppe till höger, ut ur bild | 0,8 s, mjuk |

## Linjen och konturen

- **Färg:** en mörk ton av sakens egen färg, `linjeFarg(bild)` (ljushet 30 %, gult blir mörk orangebrun), så att teckningen är lättare att gissa: rosa glass får en vinröd linje, blå kanna en mörkblå. `#3a2c28` bara när saken saknar bild. I färgsångerna en mörk ton av avsnittets färg. Runda ändar och hörn.
- **Vaxkrita, aldrig en slät linje** (Sanna 2026-11-28: *"no crayon texture"*): linjen ritas genom `kritKorn(id, t)`, ojämn kant och korn med ljusa luckor, nytt korn 6 gånger/s som boilen. Filtret läggs på en `<g>` **utan** transform runt linjen, så att kornet räknas i skärmens px och blir lika stort i närbild och helbild.
- **Aldrig `vector-effect="non-scaling-stroke"` på linjen.** Då räknas `pathLength`/strecket i skärmens px men kritans spets i bildens px, och linjen springer före kritan (1/skalan gånger fortare; Kritans bok före 2026-11-28). Ge i stället bredden i linjens egna enheter: bredden i bild delad med skalan.
- **Bredd:** 12 px i helbild (ungefär 3 % av sakens höjd). Ritas linjen i bildens egna pixlar, dela bredden med sakens skala.
- **Konturen ur en urklippt bild:**

  ```bash
  python3 verktyg/kontur.py assets/rekvisita/<sak>/cut/<sak>.png assets/rekvisita/<sak>/cut/<sak>-kontur.json --krymp 28 --mitt
  ```

  Det ger en enda sluten, mjuk bana (`d`) i bildens pixlar, plus `start` och `mitt` (fyllningens mitt). `--krymp` lägger linjen innanför den vita kanten. Använd 5 för små bilder och ca 28 för stora (600–900 px).
- **Konturen + detaljer.** Ytterformen i ett drag, sedan **2–6 detaljstreck** för de delar som gör saken lätt att känna igen: relingen och motorn på båten (006 v2), sätets rygg, naven och avgasröret på traktorn (014 v2), nallens ansikte (056), hylsan på tvålpumpen (057). Detaljerna är korta, enkla linjer längs kanter och delar som syns i bilden, inte skuggor, mönster eller fyllning.
- **Teckningen är bilden:** samma siluett, proportioner och delar som bilden den fylls till. Mät detaljerna i bildens pixlar: lägg en stillbild av teckningen och en av bilden bredvid varandra innan strecken skrivs, och kontrollera fyllningen med stillbilder. Ett detaljstreck som inte finns i bilden gör att teckningen ser ut som en annan sak.
- **Allt i samma `ritBana`-anrop:** `ritBana([KONTUR.d, ...DETALJ_DRAG], k, { vikt, vila })`. Då glider kritan själv mellan strecken med mjuk fart. Dela inte upp i flera `ritBana` med egen glid-kod emellan (som 006 v2 gör; det fungerar men är lätt att få ryckigt). `vikt` styr hur lång tid varje streck får (standard: längden), `vila: [0.8]` låter kritan stå still 0,8 viktenheter efter konturen.
- **Gissa teckningen:** gör Flow-bilden först och rita strecken efter dess siluett, inte tvärtom.
- **Saker i kod** (stetoskop, stjärna): skriv strecken som en lista med SVG-banor i scenens mått (som `STETO_DRAG` i 046) och ge dem till `ritBana`.

## Kritan

- Bilden är `assets/rekvisita/krita-rod/cut/krita-rod-tunn.png` (tunn vit kant, som vita-kanter-regeln; Sanna 2026-11-25), spetsen i (742, 132). Den tjocka `krita-rod.png` används inte i nya scener.
- **Skala:** 0,42 på ritpapperet. I en scen är skalan 0,33/√zoom (`kritaSkala(zoom)`), så att kritan är lika stor i bild hur nära kameran än går.
- **Kritan går aldrig över ett ansikte.** Lägg väntplatsen och ut-banan på fri yta, bort från figurerna. Kommer kritan in i en scen med figurer, ska den komma uppifrån höger.
- Ingen knackning, inget `tass`-ljud och inget `skrrrrt`. Ljudet är `effekter/krita-ritar` i loop under fas 2, vol ca 0,9–1,6, med 0,4 s fade.

## Rörelsen

Det här ger den mjuka animationen. Det mesta finns i koden, men det går att förstöra i scenen:

- **Använd `ritfart` på hela ritfasen** och låt `ritBana` sköta resten: varje streck har mjuk start och mjukt slut (`KRITAN.RAMP`, minst `RAMP_MIN`), glidningen mellan strecken är mjuk och inte snabbare än ritandet (`KRITAN.RESA`).
- **Bara `kritaFas` flyttar kritan** (in, ritar, står kvar, glider till väntplatsen, svajar, ut). Ingen egen `lerp` för kritans läge, inga egna vinklar.
- **Spetsen räknas från samma transform som linjen.** Om teckningen gungar, hoppar eller kameran zoomar, räkna om spetsen genom samma `translate/scale/rotate` (`tillScen` eller `getCTM`), annars glider kritan av linjen.
- **Kameran följer mjukt.** I ritintrot följer kameran spetsens medelläge över 0,6 s (`spetsVid` i 014 v2), aldrig spetsen direkt, och glider ut till helbild före väntan.
- **Linjen ritas i bildens pixlar** med bredden `KRITAN.BRED / skala`, så den är lika tjock i bild överallt.

## Var

- **Ritintrot:** krämvitt papper som fyller hela bilden (`#FBF7EE`/`#FDFBF4`), utan kant. Kameran följer saken. I gissningspausen kryper den sakta in (+12 %), och efter svaret zoomar den in i teckningen. Se `format/ritintro.md` för tidslinjen och repliker (*"Titta!"*, ledtråden, svaret).
- **Vad som ritas i ritintrot:** i bilderböcker en sak ur berättelsen (halsduken, handduken, lådan), inte djurfiguren; figuren kommer in efteråt (Sanna 2026-11-25). Skogsljudet `skogsljud-1` ligger lågt under.
- **I en scen** (gosedjuret, stjärnan): samma förlopp direkt i rummet, på fri yta bredvid figuren. Den fyllda saken flyttas sedan dit den ska (till famnen, till magen).
- **Besöket:** kritan ritar besökets sak i introt, till exempel stetoskopet (`format/besoket.md`).

## Användning

```html
<script src="/verktyg/kritan-ritar.js"></script>
```

```js
const T = { in: [0, 0.4], rit: [0.6, 5.6], vanta: [5.8, 6.6], ut: [10.1, 10.9] };   // sekunder i scenen
const DETALJ_DRAG = ['M846 44 Q700 86 100 122', 'M94 108 Q96 180 106 250'];        // mätta i bildens pixlar
const k = ritfart((t - T.rit[0]) / (T.rit[1] - T.rit[0])), f = kl((t - 10.1) / 0.7);
const R = ritBana([KONTUR.d, ...DETALJ_DRAG], k, { vila: [0.6],  attr: `fill="none" stroke="${KRITAN.LINJE}" stroke-width="${KRITAN.BRED / sk}" stroke-linecap="round" stroke-linejoin="round" opacity="${linjeOpacitet(f)}"` });
// bilden: fyllMask('fy', KONTUR.mitt[0], KONTUR.mitt[1], R, f) + <image clip-path="url(#fy)">, sedan R.html ovanpå
const kr = kritaFas(t, T, { start: tillScen(R.start), spets: tillScen(R.spets), slut: tillScen(R.slut), vanta: [1430, 300], s: kritaSkala(zoom) });
if (kr) svg += kritaBild(kr.x, kr.y, kr);
svg += gnistor(cx, cy, 330, t - 10.1);
```

`tillScen` räknar om en punkt från bildens pixlar till scenens koordinater (translate + scale). I en kamera-grupp gör du som `leoSpets` i 046 och använder `getCTM`. Ett helt exempel finns i `verktyg/prov/kritan-ritar-prov.html`.

## Kontroll före rendering

Rendera stillbilder och lägg dem på ett kontaktark med minst en bild ur varje fas. Kontrollera:

1. Spetsen ligger på linjens ände i varje bild under fas 2, även när teckningen eller kameran rör sig.
2. Detaljstrecken ligger på bildens kanter och delar när fyllningen är klar (stillbild av teckningen bredvid bilden).
3. Mellan strecken glider kritan och hoppar aldrig; den saktar in i slutet av varje streck.
4. Kritan står kvar mellan fas 2 och 4 och försvinner inte.
5. Linjen är borta när bilden är fylld.
6. Kritan är aldrig över ett ansikte.
7. Kritan har samma storlek i bild som i de andra scenerna.
8. Linjen är vaxkrita (korn, ojämn kant) i sakens mörka ton, inte en slät mörk linje.
9. Teckningen står upprätt mot kameran, aldrig liggande eller snedvriden av en yta.
10. Den färdiga teckningen (bild 6 på arket) går att gissa utan fyllningen: ytterform + detaljer som syns i den storlek den ritas.

**Kritans bok och 3D-scener:** `node avsnitt/NNN/scener/render.mjs avsnitt/NNN/scener/boken --krita` ger ett ark per teckning i `stills/krita/<teckning>.jpg` (9 bilder: kritan kommer, 20/40/60/80/100 % ritat, gisspausen, fyllningen, klart) på någon minut. Visa arken och en kort `--snabb --fran --till`-film av varje teckning för Sanna och få ett ja **innan** avsnittet renderas om (en omrendering av ett bokavsnitt tar ungefär en timme). Ändras den delade koden (`kritan-ritar.js`, `uppslag.js`): ark före och efter för alla avsnitt som använder den, som i `produktion/three-rum/popupbok/krita-prov/`.

Titta också på täta bildrutor (6 per sekund) runt varje fasbyte och varje glidning mellan streck, för ryck och flimmer syns inte i enstaka bilder.

## Gör inte

- Rita inte hela bilden med många kritor och färger (007), och inga skuggor, mönster eller fyllning med linjen. Detaljer betyder några tydliga linjer, inte en färdig målning.
- Ingen teckning med bara ytterformen när saken har delar som gör den lätt att gissa.
- Ingen egen glid-, fart- eller vinkelkod för kritan i avsnittet.
- Rita inte på en liggande eller lutande yta (marken, en sida i boken). Kritan ritar alltid på ett stående plan mot kameran, på sakens fotpunkt; i Kritans bok gör `uppslag.js` det själv (`staende()`).
- Ingen platt färgad bild i en djup zoom, och inget kritsvep ut ur ritscenen.
- Fäst inte kritan vid en punkt som räknas om från ett annat streck än det som ritas just nu. Använd `ritBana`, så följer spetsen linjen.
- Skriv inte nya egna `krita()`-funktioner med andra vinklar eller skalor. Äldre avsnitt (011, 045, 046) har egna kopior. De får ligga kvar, men nya scener använder den delade filen.
