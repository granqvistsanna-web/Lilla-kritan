# Bilderbok – receptet från 020 Grisen badar

020 Grisen badar (byggd 2026-11-10) är förlagan för **bilderboksavsnitt**: inget sjungs i berättelsen, Malin (BERÄTTAREN) läser och pratar med **en** djurfigur, och djuret svarar bara med ljud, öron, tryne och ögon. Varje bild är ett uppslag i en bok utan text. Allt här är gjort och provat i `avsnitt/020-grisen-badar/`. Kopiera därifrån i stället för att börja om. Där 020 fortfarande har platshållare står det under **Öppet i 020** längst ner.

**Skillen `bilderbok`** (`.claude/skills/bilderbok/`) har arbetsordningen, grindarna och de regler som oftast bryts, och pekar hit för detaljerna. Säg "ny bilderbok" och djuret och vardagen, så börjar Claude där.

Färgsångernas recept är [fargsang-v2.md](fargsang-v2.md). Det här receptet ändrar de delar som skiljer sig, och resten (vita kanter, riggen, kritsvepet) är samma.

## Formen

| Del | 020 | Scentid (s) |
|---|---|---|
| Intro | formatets intro, 9,0 s, titeln *Grisen badar*, slutar med ett kritsvep i avsnittets färg | före scenen |
| Kritan ritar | konturen i ett lugnt drag (7 s), kritan väntar medan barnet gissar, den riktiga figuren fylls i, sedan zoom in i teckningen | 0–14 |
| Problemet | hej, figuren är smutsig, vill inte bada | 14–38 |
| Hjälpen | kritan ritar en sak i scenen (badankan, sedan båten och bubblorna), "Varsågod" – "Tack!" | 38–80 |
| Leken | upp på pallen, hoppa i, prata med ankan, ankan på huvudet | 80–118 |
| Lösningen | skrubba trynet och öronen, barnet hittar sista fläcken, blåsa en bubbla | 118–165 |
| Lek och hej då | plaska, vinka, hej då | 165–176 |
| Slutet | kritirisen, 0,6 s svart | 176–180 |

Tiderna är ungefärliga: de följer `rader.mjs`, som ändras när en replik spelas in igen. Hela filmen är ca 3:10. Short: uppslag 13–18 (tvätta, leta, bubblan), ca 45 s.

## Filerna

| Fil | Vad |
|---|---|
| `manus.md` | Planen: kärnan, uppslagstabellen, rörelsetabellen ("Så rör det sig"), replikblocken för ElevenLabs (en tagning per block), regelkollen, öppet |
| `rost.txt`, `rost-2.txt` … | Listan till `dela-tagning.py`, en fil per tagning: `NN-namn  [tagg] Text` |
| `ljud-effekter.md` | ElevenLabs-prompterna för de ljud som inte fanns på Openverse |
| `storyboard/rader.mjs` | **Styr allt:** `ROST` (filnamn och uppmätt längd) och `RADER` (ett uppslag per rad: `id`, `d`, `malin: [[nr, s in]]`, `ljud: [[fil, s in]]`, bildtext). Starttiderna är summan av `d` |
| `storyboard/bygg.mjs`, `scen.html` | Storyboarden: en stillbild per rad, tabellen i `storyboard.md` och `--animatik` |
| `scener/badet/index.html` | **Hela filmen efter introt i en kodscen:** papperet, badrummet, kritan, figuren, sakerna, kameran, ljudlistan (`ljud()`). `S['id'] = tl => ({…})` ger ett läge per rad |
| `scener/render.mjs` | Renderar en scen, tar stillbilder och kontaktark, skriver `<scen>-effekter.wav` |
| `intro/index.html` | Kopia av 011:s intro med avsnittets färg och titel (`FARGER`) |
| `film/rendera.sh` | Scenen i fyra delar, två åt gången, plus introt och effektljudet |
| `film/satt-ihop.sh` | Intro + scen, mix och mastring → `film/avsnitt-NNN.mp4` |
| `suno.md` | Prompten till den instrumentala mattan (inte gjord än i 020) |

**En tidsbas.** Det finns ingen sång att tajma mot, så **scentid** gäller överallt: 0 = rad `01a`, kritan börjar rita. **Filmtid = scentid + 9,0** (introts längd). Räkna om Sannas filmtid innan du letar i koden.

---

## 1. Berättelsen

### Kärnan

Sex steg, alltid i den här ordningen:

1. **Problemet.** Figuren har ett litet vardagsproblem och vill inte (vill inte bada, är smutsig).
2. **Kritan ritar en hjälpsak** inne i scenen: konturen, en kort gisspaus, sedan fylls den riktiga saken i. Malin: *"Varsågod!"*
3. **Tack.** Malin frågar barnet *"Vad säger man?"* (paus 4 s), sedan *"Tack!"* och figuren nickar.
4. **Leken.** Med saken blir det roligt. Figuren och saken "pratar" (nöff – pip – nöff – pip) och något litet överraskande händer (ankan sitter på huvudet).
5. **Lösningen med barnets hjälp.** Samma handling tre gånger (*"Skrubba, skrubba … borta!"*). Den sista gången vet figuren inte var, och barnet hjälper till.
6. **Lek och hej då.** Ett kort lekuppslag efter lösningen, sedan hej då till figuren och saken, och kritirisen.

Max **1 figur**, **1 plats**, inget platsbyte (alltså inget kritsvep inne i berättelsen). Saker: en hjälpsak som kritan ritar, plus det platsen behöver.

### Uppslagen

Varje rad i `manus.md` och `rader.mjs` är ett uppslag: **en bild, en rörelse**, och Malins replik. Figurens svar kommer i pausen **efter** repliken, så att den alltid får luft. Pauserna står utskrivna och hålls.

| # | Bild (en rörelse) | Malin säger | Figuren svarar, ljud |
|---|---|---|---|
| 1 | Helbild, figuren trippar in och stannar | *Hej, grisen!* | små steg, glatt nöff, öronen vippar |
| 4 | Närbild, figuren vänder bort trynet, öronen faller | *Oj då. Grisen vill visst inte bada.* | trumpet fnys |
| 6 | Figuren tittar på saken, öronen reser sig | *Vad säger man?* *(paus 4 s)* | nyfiket nöff |

### Replikerna

- **Vardagligt och lite roat**, som en vuxen som pratar med ett barn i badet. Inga rim, inga ramsor.
- Varva att prata **till** figuren (*"Nu ska du väl bada?"*) med små kommentarer **om** den (*"Grisen vill visst inte bada."*). Ibland vänder Malin sig till barnet.
- **Korta meningar.** En tanke per replik, högst två korta meningar.
- **Upprepning:** samma fras tre gånger (*"Skrubba, skrubba … borta!"*), samma ord två gånger (*"… visst …"*), samma utbyte fram och tillbaka.
- **Glädje:** *"Oj!"*, *"Oj, oj, oj!"*, *"Oj då."*, små skratt (*"Ha ha!"*), *"Mmm …"*. Tagning 4 i 020 lade till dem överallt (Sanna: *"a bit of laugh and oj and more happy"*).
- **Frågor till barnet** med **paus 4–5 s**, och sedan visar bilden svaret. 020 har tre: *"Vad säger man?"* (4 s), *"Kan du hjälpa grisen? Kan du se var leran är?"* (5 s), *"Kan du blåsa en bubbla?"* (4 s).
- **Hjälpmönstret** (tagning 3, Sanna 2026-11-10):
  1. *"Oj, lite lera är kvar. Grisen vet inte var."* Figuren tittar åt vänster, sedan åt höger, med ett frågande nöff.
  2. *"Kan du hjälpa grisen? Kan du se var leran är?"* Paus 5 s. Klipp till närbild på fläcken. Efter ca 3 s av pausen börjar den skimra svagt.
  3. *"Ja, där! Ja, på kinden!"* Fläcken skimrar tydligt, glatt nöff.
  4. *"Skrubba, skrubba … borta!"*
- **Bilden på orden:** det som sägs syns när det sägs. Fläcken är borta på *"borta!"*, bubblan spricker på *"plopp!"*, grisen landar på *"ett steg … två steg …"*.
- **Mindre tal är bättre.** Lägg inte till repliker i onödan.

### Regler att kolla varje gång

- **Inga djurnamn** i det som sägs: *"Hej, grisen!"*, *"Hej då, ankan!"*, aldrig figurens namn. Det gäller filnamnen i röstbanken också.
- **Aldrig *"Vad kan det vara?"*.** I ritintrot säger Malin *"Hm … vad blir det nu?"*.
- Inget läskigt: inget vatten i ögonen, ingen gråt, ingen som är elak.
- Ett *"Varsågod"* och ett *"Tack!"* i varje avsnitt.
- `format/regler.md`: max 3 figurer och 2 platser (bilderboken använder 1 och 1), en fråga till barnet med paus, varje bild minst 3 s.

**Avsteg i 020 som receptet behåller:** ingen sång (Short = uppslag 13–18 i stället för sången), ca 12 kamerautsnitt (regeln säger 6, men utsnitten är stillbilder med klipp, se Kamera), och fler än 2 nya saker (badankan, båten, pallen, en ny handduk och ett nytt kar). Säg till Sanna när ett nytt avsnitt bryter mot `regler.md` på något annat sätt.

---

## 2. Rösten (ElevenLabs)

**Inställningar:** "Malin – Professional Swedish Narration", **Eleven v3**, stability 0,5, similarity 0,75. En tagning per kodblock i `manus.md`. Klistra in blocket som det är.

**Känslotaggarna** står först på raden, på engelska, i hakparentes. De läses inte upp. Taggarna som användes i 020 och vad de passar till:

| Tagg | Till |
|---|---|
| `[warmly]` | *Kritan ritar …*, *Vad säger man?*, *Kan du hjälpa …?* |
| `[curious]` | *Hm … vad blir det nu?*, *Hm … vad gör vi nu?*, *Kritan ritar mer …* |
| `[excited]` | svaret (*Oj! En gris!*), *Titta!*, *En båt!*, *Ja, där!* |
| `[happy]` | hej, tack, hej då, *Skrubba, skrubba … borta!* |
| `[cheerfully]` | frågorna till figuren: *Nu ska du väl bada?*, *Upp på pallen …* |
| `[laughs]`, `[chuckles]`, `[giggles]` | *Oj, oj, oj!*, *Oj då.*, *Ha ha!*, *Ni pratar visst …*, efter *plopp!* |
| `[surprised]` | *Oj! Nu hoppar grisen i badkaret!* |
| `[happy sigh]` | *Mmm … ganska skönt.* |
| `[playfully]` | *Fff … plopp!* |

**Filnamn:** `NN-kort-namn`, numrerade i manusets ordning (`01-kritan-ritar`, `02-vad-blir-det` …), i `assets/ljud/roster/<avsnitt-slug>/`. Nya repliker i senare tagningar får nästa lediga nummer (020: tagning 2 = 26–31, tagning 3 = 32–35, leken = 36), så att inget flyttas. En ny tagning av en gammal replik **behåller filnamnet** och ersätter filen.

**Dela tagningen:**

```bash
python3 verktyg/dela-tagning.py tagning.mp3 avsnitt/NNN-namn/rost-4.txt assets/ljud/roster/<slug>
```

- `rost-N.txt` har en rad per replik i tagningens ordning: `NN-namn  [tagg] Text`. Taggarna får stå kvar.
- Skriptet hittar gränserna med whisper (ord för ord) och tystnaden, klipper bort tystnaden före och efter och skriver m4a. Det skriver ut vad varje fil säger. **Läs utskriften.** Whisper hör ibland fel ("trätta" för "tvätta"), så lyssna på de rader som ser konstiga ut.
- **Befintliga filer skrivs inte över.** För en ny tagning som ersätter: flytta de gamla filerna till `produktion/ljud-original/roster/<avsnitt>/tagning-N/` först, kör sedan skriptet.
- Spara den hela tagningen (`malin-tagning-N.mp3`) i `produktion/ljud-original/roster/<avsnitt>/`.
- Normalisera filerna efteråt (se Bearbetning nedan) och mät längderna in i `ROST` i `rader.mjs`.

---

## 3. Ljudet

### Figurens röst

Figuren pratar aldrig, den svarar med **ljudfamiljer**. Riktiga djurljud från Openverse blev vuxna grisar, och tonhöjdshöjda kopior (`noff-sot`, `fnys-sot`, 3,5 halvtoner upp) blev inte riktigt gulliga. Sanna valde en **tecknad kultinggris från ElevenLabs** (`noff-gullig`), med de riktiga ljuden som komplement. Gör likadant för nästa djur: en familj på ca 8 tagningar, en per känsla.

| `noff-gullig` | Känsla | 020 använder den i |
|---|---|---|
| 1 | hej | 1 (kommer in) |
| 2 | förtjust | 5c, 5e, 6, 7, 13, 17 (ser saken, tack, ja där) |
| 3 | fniss | 5f, 8, 12b, 14, 17, 18d |
| 4 | mysig suck, *mmm-nöff* | 9, 11 (skönt i badet) |
| 5 | nyfiken, frågande | 2, 5b, 16a (vet inte var) |
| 6 | trumpen, *hmph* | 2b, 3, 4 (vill inte) |
| 7 | pratar, tre pip i rad | 10 (pratar med ankan) |
| 8 | hej då | 19 |
| 9 | extra tagning | 12a, 18c |

Numren är nedladdningsordningen, ungefär promptordningen. **Lyssna och bekräfta ordningen** innan du lägger dem på rätt känsla.

**Prompten** (en rad per känsla, byt djuret):

```
noff-gullig-1: Tiny cute cartoon piglet saying a happy little hello oink, a short bright "oink!" rising in pitch, sweet squeaky baby voice, close dry recording, no music, no background
```

Resten står i `avsnitt/020-grisen-badar/ljud-effekter.md`. Mönstret är *Tiny cute cartoon <baby animal> + känslan + ljudet i ord + "sweet, close dry recording, no music, no background"*. Inga ord, inget skrik, inget argt.

**Sakens röst:** badankan har en egen familj, `badanka-pip` (1 frågande, 2 mjukt sjunkande). Kycklingpipet `pip` lät inte som en badanka.

### Effekter per ögonblick

| Ögonblick | Ljud | Vol |
|---|---|---|
| Kritan ritar (ritintrot, sakerna) | `krita-ritar` 1–2 i loop, längd = konturens längd | 0,9–1,1 |
| Fotsteg | `tass` 1–6, ett per lerigt fotavtryck | 0,4 |
| Saken fylls i | `glitter` 1–3 | 0,9 |
| Något tänds eller blir rent | `tindra` 1–2 | 0,9 |
| Skimret i gisspausen | `lysmask-1` | 0,5 |
| Kliver på pallen | `tass` på varje landning | 0,5 |
| Hoppar i, plaskar, saken landar | `plask` 1–4 | 0,6–0,9 |
| Kranen rinner | `kran-1` i loop, från replikens slut tills figuren hoppar i | 0,6 |
| Skrubba | `skrubb` 1–2, en bit på 1,3–1,5 s | 0,7 |
| Kritans tre bubblor spricker | `pop` 1–3 | 0,5 |
| Bubblan spricker | `plopp-1` | 1,0 |
| Skumbubblorna spricker | `plopp-1` på var tredje bubbla | 0,3 |

Samma händelse har alltid samma ljud. Högst 2–3 ljud samtidigt.

### Mattor

| Matta | Fil | När | Vol |
|---|---|---|---|
| Ritintrot | `skogsljud-1` | 0 → rad 1 + 1,2 s, in 1,0 s, ut 1,5 s | 0,8 |
| Platsen | `badrumsljud-2` (lugnt vatten och rumsljud, −33 LUFS, lågpass 1,8 kHz) | rad 1 → kritirisens slut, in 1,0 s, ut 1,5 s | 1,0 |
| Musik | Suno, instrumental ([suno.md](../avsnitt/020-grisen-badar/suno.md)) | under berättelsen, sänkt i pauserna | inte gjord |

Platsmattan ska vara **låg och lugn** (Sanna: *"turn down bathroom sound and make it a bit more calm"*). Mixa den av Openverse-ljud: lågpass, kompressor, −30 till −33 LUFS, loopbar.

### Var ljuden hämtas

1. **Openverse först:** `https://api.openverse.org/v1/audio/?q=<ord>&license=cc0,by`. Bara CC0 eller CC BY. Skriv krediten för CC BY i `assets/ljud/effekter/README.md` och i YouTube-texten.
2. **ElevenLabs Sound Effects** för det som saknas: **prompt influence 0,55**, längden inställd för hand (inte auto), 4 tagningar per rad, välj den mjukaste. Skriv prompterna i avsnittets `ljud-effekter.md`. Mönster: *ljudet + "soft, gentle" + "close recording, no voice, no music, no background"*.
3. Filerna läggs i `assets/ljud/effekter/<familj>/<familj>-N.m4a`, numrerade utan luckor, med en rad i `assets/ljud/effekter/README.md`. Rådatan sparas i `produktion/ljud-original/effekter/<familj>/`.

### Bearbetning

Varje ny fil:

1. **Klipp bort tystnaden** före och efter:
   `silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse`
2. **Normalisera toppen:** mät med `volumedetect` och höj eller sänk till målet.

   | Sort | Topp |
   |---|---|
   | Röster (Malin, `noff-gullig`, `badanka-pip`) | −3 dBFS |
   | Skrubb och liknande mjuka ljud | −9 dBFS |
   | Kran och andra långa mattor | −12 dBFS |

3. **AAC 160k**, m4a.

```bash
max=$(ffmpeg -i in.wav -af volumedetect -f null - 2>&1 | sed -n 's/.*max_volume: \(.*\) dB/\1/p')
ffmpeg -y -i in.wav -af "volume=$(echo "-3 - ($max)" | bc)dB,afade=t=in:d=0.02" -c:a aac -b:a 160k ut.m4a
```

**Tona aldrig ut med `st=0`.** `afade=t=out:st=0:d=…` tonar ut från första samplet, och då blir hela filen tyst. Det var därför grisljuden inte hördes i 020 först. Behöver en fil en uttoning, räkna ut `st` = längden − uttoningen, eller korta den i scenen med `langd` och `fade` (render.mjs gör det rätt).

### Mixen och mastringen

- **I scenen** (`ljud()` i `index.html`): varje ljud är `{ t, fil, vol, langd?, loop?, fadeIn?, fade? }`. `render.mjs` sätter varje ljud till `vol × 0,4` (−8 dB), kortar `langd` med uttoning, mixar utan normalisering och lägger en limiter (0,95) sist. Resultatet blir `scener/<scen>/<scen>-effekter.wav`.
- **Volymerna i 020:** Malin 2,5. Figurens ljud 1,3 (`noff-gullig`, `-sot`) och riktiga djurljud 1,6. Effekterna enligt tabellen ovan.
- **Byt ljud på ett ställe.** 020 la ljuden först i `rader.mjs` och bytte sedan i scenen med `BYT` (rad + fil → ny fil och längd) och `GLADARE` (extra ljud per rad: `[fil, s in, vol, längd]`). I ett nytt avsnitt: skriv det riktiga ljudet direkt i `rader.mjs` och hoppa över `BYT`.
- **`satt-ihop.sh`:** introts jingel (första 9,9 s, ut 9,5–9,9) och introts effekter (+6 dB). Scenens effektljud läggs på +6 dB med `adelay` = introts längd. Mixen blir 24-bit wav.
- **Mastring i två pass:** mät först med `loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json`, och kör sedan `loudnorm` med de uppmätta värdena och `linear=true`. Det ger −14 LUFS och topp högst −1,5 dBTP. Ljudet kodas som AAC 192k.

---

## 4. Platsen och sakerna

### Så görs sakerna

- **Google Flow, Nano Banana 2.1** (0 krediter), image2image, med **avsnittets redan valda saker som stilreferens** (Image 1 och 2), så att allt ser gjort av samma hand ut. Mall: *"Images 1 and 2 are STYLE references only: copy their drawing technique exactly (clean, smooth, even colour fill with only a very subtle fine crayon grain, soft premium toddler picture-book look, no dark outline, clean white sticker border), not their subjects. Draw ONE …"*, sedan saken sedd **rakt från sidan**, färger med hex, och *"No … shading, no 3D, no shine, no outline. A thick, clean, even white sticker border all around. Centered with space around, plain pure solid white background, no shadow, no ground, no text."* Prompterna står i `rekvisita/badanka.md`, `badbat.md` och `pall.md`.
- **4 tagningar**, sida vid sida i `original/jamforelse.jpg`. Sanna väljer.
- **Saker som flyter** vänds åt vänster, har hel rundad botten och inget vatten i bilden. Vattenlinjen och skummet läggs i kod. **Saker med ansikte** (badankan) får inga ögon i bilden: ögat med glansprick ritas i kod.
- **Klipp ut** med `python3 verktyg/egen_kant.py in.jpeg cut/<namn>.png`. Mot vit bakgrund försvinner ofta kanten i klippet. Lägg den då i kod: `kant.lagg(g, { andel: 0.01 })` (skillen `vita-kanter`).
- **För tjock kant** (kranen på karet): `python3 verktyg/tunn_kant.py 7 cut/<namn>.png` → en `-tunn.png`-kopia.
- **Enkla saker ritas i kod** utan bild: tvålen (`tval()`), lerfläckarna, skummet, bubblorna, skumtussen, vattenstrålen, droppar, skimmer. Skriv ändå en `rekvisita/<sak>.md` (som `tval.md`) med mått och färger.
- Varje ny sak får en fil i `rekvisita/` enligt formatet där och en rad i `rekvisita/README.md`. Sakerna görs tillsammans med Sanna.

### Uppställningen (badrummet, 1920 × 1080)

- **Platta:** `assets/bakgrunder/badrummet/badrummet-v1.jpeg`, havsgrön kakelvägg, vitt golv. Golvet ligger på `GOLV = 905`.
- **Huvudsaken till höger** (karet, `KX = 1370`, skala 1,085, filen i **en** konstant `KAR`, så att den går att byta med en rad). Pallen står till vänster om karet, och figuren kommer in från vänster och stannar vid `STA = [240, GOLV]`.
- **Väggsaken** (handduken på kroken) hänger bakom karet till höger om kranen, lite mindre än figuren, och rör sig aldrig.
- **Lagren** i SVG:n, bakifrån: platta → `bak` (kranstrålen, fotspåren) → `kontur` (kritans linjer) → figuren → sakerna på vattnet → karet → `fram` (skum, bubblor, skumtuss, skimmer) → tvålen → kritan → `ram` (svep, iris, svart).
- **Figuren i karet:** riggen står bakom karet med riggens y 640 vid kanten, så bara huvudet och en skymt av axlarna syns. Ben, svans, skugga och de armar som inte används döljs (`ikar`).
- **Kokningen** (`#boil`, feTurbulence 0,025, skala 5 delat med zoomen, seed byts 10 gånger per sekund) ligger på figuren, sakerna och förgrunden, inte på plattan.

---

## 5. Animationen och kameran

### Riggen

Figuren är v2-riggen live ur `assets/karaktarer/<mapp>/premium/uttryck.html`:

```html
<script src="/verktyg/blinka.js"></script>
<script src="/verktyg/kant.js"></script>
<script src="/produktion/youtube/shorts/godnatt/v2-rigg.js"></script>
```

```js
L = await v2rigg('grisen-greta'); G = L.figur(512, L.FOTTER, 1, $('gomda')); BLINKA = skapaBlinka(21);
L.rita(G, BLINKA(ansikte, t), pose);   // ansikte = L.blanda(a, b, k), pose = L.blandaPose(a, b, k)
```

Gången: `L.ROR.ga(fas)` ger `[ansikte, pose]`. Riktningsposen: `rikt` −1…1. Mer i skillen `lk-figur`.

**Ett läge per rad:** `S['id'] = (tl, d) => ({ kam, pos, f, p, … })`, där `tl` är sekunder in i raden. Mellan två rader på samma plats blandas ansiktet och posen mjukt in på **0,45 s**. Kameran klipper.

### Lugn rörelse

En sak rör sig i taget. Allt är lugnt och tydligt, inget studsar (Sanna avvisade "jagged, hectic, bouncy" i 011). Figurer **snurrar aldrig och speglas aldrig**. Inga böjda armar, inget eftersläp på armarna.

| Rörelse | Hur (020) |
|---|---|
| Öronen vippar | ±10° på 0,4 s, avtar, `oronVipp(tl, t0, n)` |
| Trynet puffar | nosen växer 9 % och lyfts 5 px på 0,35 s, `puff(tl, t0…)` |
| Glatt skutt | 20 px upp med tryck ihop före och vid landningen, `skutt` + `tryck`. Inget studs |
| Nickar | `strack −0,06`, `bred +0,04` en gång |
| Skakar på huvudet | hela ägget lutar ±6° tre gånger, `luta` |
| Vänder bort | riktningsposen `rikt −1`, öronen faller 12° |
| Tittar åt sidorna | `rikt ±0,3` och ögonen `titt ±36·rikt`. Huvudet vänds inte |
| Kliver upp, hoppar i | `hopp(tl, a, b, från, till, höjd)`: ett lugnt skutt per steg (80 px), hoppet i karet 190 px. Huk före, tryck vid landningen, armarna lite ut i luften |
| Sjunker i skummet | hela figuren rakt ner (`sjunk`) bakom kanten och rakt upp |
| Leker | sjunker 34 px och kommer upp tre gånger på 1,1 s, plask när den kommer upp |
| Sakerna på vattnet | `gupp`: ±4 px upp och ner, ±3° lutning, olika perioder (1,8 och 2,3 s). Glider sidledes, hoppar aldrig själva |

### Ansiktet

Glada uttryck har **öppna ögon**: `glad`, `jatteglad`, `fnissig` och `stolt` får `glad: [0, 0]` (Sanna: *"more expressions of gris not just closed eyes"*). Ögonbågar (`glad: [1, 1]`) bara där raden ber om det (ankan på huvudet, bubblan spricker). Sömnigt och blundande i *"ganska skönt"*. Blinkningen sköts av `blinka.js`. Munnen blir ett O inför bubblan (`mun: [10, 12, 0, 466]`).

### Armen och tvålen

Armen är **riggens egen raka arm, fast i figuren**. Kodarmar såg ut att flyga (Sanna: *"hands are flying in the air"*). Två lägen:

- **`under`** (trynet, kinden): armen framför kroppen (`-klapp`-kopian, roten tonad, så bara handen syns) stiger upp bakom badkarskanten. Figuren sjunker lite (`sank`, upp till 100) så att handen når. `armTill()` räknar ut vinkeln så att klöven hamnar på fläcken.
- **`bakom`** (öronen): armen bakom kroppen, upp förbi huvudets kant som i vinkningen, med handen vid örats yttre kant (`bakomArm()`).
- **Gnidet** är en lugn vridning ±6° kring axeln (`6·sin(8t)`). Tvålen sitter i handens spets och syns bara ovanför badkarskanten. Skumtussen snurrar över fläcken, och fläcken tonar bort på ca 3 s så att den är borta på *"borta!"*.

### Vinkningen

Armen kommer upp ur skummet bakom kroppen, snett ut förbi kanten (130°), och vinkar lugnt 3–4 gånger (±18°, 1,15 Hz). Den sänks igen före kritirisen.

### Bubblor och skum

- **Skum:** sju vita tussar längs badkarskanten som växer in en i taget. Sanna ville ha *"a bit less bubbles"*.
- **Lösa bubblor:** 40 bubblor med fasta tider (ingen slump som byter bild). De stiger 34–48 px/s, driver ±22 px och lever 3,6–5,2 s. Sedan spricker de i sex droppar på 0,3 s. Var tredje får ett mjukt `plopp`.
- **Den blåsta bubblan:** radien växer från 18 till 92 på 1,6 s framför munnen och spricker i nio droppar.

### Kritan ritar inne i scenen

Samma grepp som ritintrot, men på en sak i scenen:

1. Kritan kommer in uppifrån till höger (2,4 s).
2. Den ritar **konturen i ett drag**: ankan på 4,5 s, båten på 4 s. Konturen är mätt ur bildens kant och ritas i sakens mörkare ton.
3. Den väntar bredvid ca 3 s och vickar lugnt medan barnet gissar (`kritaVanta`).
4. På svaret fylls den riktiga bilden i inifrån (en cirkel som växer på 0,8 s), med `glitter`.
5. Bubblorna: en cirkel på 0,5 s var, de flyger uppåt och spricker med `pop`. Sedan flyger kritan ut uppe till höger.

**Kritan är liten:** `krita()` skala 0,33 i scenen. Den är en sak, utan ansikte, och vänds aldrig.

### Fotspår och lera

Lerfläckarna (tryne, öron, kind) ritas i kod i riggen och följer ansiktet och öronen (`leraIn()`). Opaciteten styrs per fläck. När figuren trippar in lämnar den ett lerigt avtryck per steg (75 px isär), med ett mjukt `tass`, och avtrycken ligger kvar på golvet.

### Kameran

**Hårda klipp mellan stillastående utsnitt.** Ingen zoom eller panorering inne i scenen (Sanna: *"do cuts instead"*, *"closer crop composition"*). Utsnitten är `[zoom, cx, cy]` och kameran stannar alltid innanför plattan.

| Utsnitt | 020 | Används till |
|---|---|---|
| Helbild | `K_HEL` zoom 1 | pallen, hoppet i |
| Figuren vid sidan | `K_STA` 1,3, `K_STA_N` 2,0 | hej, smutsig, tack |
| Bort | `K_BORT` 1,7 | vill inte |
| Saken som ritas | `K_ANKA` 2,6, `K_BAT` 2,4, `K_BUBB` 2,1 | kritan ritar |
| Badet | `K_BAD` 2,2, `K_HATT` 2,0 (ankan på huvudet syns) | i karet |
| Ansiktet nära | `K_NARA` 2,8, `K_HALV` 2,5 | skrubba, bubblan, hej då |
| Frågans närbild | `K_KIND` 3,2 | gisspausen: bara fläcken |

- Klippet sker vid **radbytet**. Ska kameran byta inne i en rad: `kamMix(a, b, k)`, som klipper mitt i (k ≥ 0,5).
- Ett klipp per replik som mest. Varje utsnitt står minst 3 s.
- **Frågans närbild** klipps in när pausen börjar, så att barnet bara ser stället att leta på.

---

## 6. Intro, ritintro, slut

### Introt

Kopiera ett färdigt intro (020 kopierade 011:s, `intro/index.html`) och ändra bara `FARGER`: `{ f: '<avsnittets färg>', sv: '<Titel>', en: '<English title>' }`. Ändra också `svepIn`:s två färger (ljus, mörk). 9,0 s. Introt slutar med kritsvepet i avsnittets färg, och scenen börjar med samma svep som glider undan åt höger på 1,0 s (`svepUt`). Samma två färger i båda (020: `#F2A0B8`, `#E07898`).

### Ritintrot

Som [ritintro.md](ritintro.md), men kritan ritar **figuren**:

| Scentid | Bild | Ljud |
|---|---|---|
| 0–7,0 | Konturen i lugna drag, en del i taget: kroppen (ägget, 2,6 s), öronen, trynet (oval och två prickar), benen, svansen. Linjen är varm brun (`#7a4a32`), 11 breda, i riggens 1024-ruta | `krita-ritar-1` i loop 7 s; *"Kritan ritar …"* vid 0,5 |
| 4,0 | | *"Hm … vad blir det nu?"* |
| 7,0–11,5 | Kritan väntar bredvid konturen och vickar lugnt: barnet gissar | skogsljud |
| 11,5 | Den riktiga figuren fylls i inifrån (0,9 s), lerfläckarna sist | *"Oj! En gris!"* vid 12,1 |
| sista 0,8 s | Zoom in i teckningen (1 → 2,6) och vitt över (0,45 s), som tonar bort i första uppslaget (0,4 s) | |

Papperet är vitt och fyller hela bilden, utan kant. Skogsljudet ligger under hela ritandet. Delarna står i `RITDELAR()`, och koordinaterna är riggens. Gör konturen **enkel att rita** (Sanna: *"make it more easy to draw a gris"*): ytterformen och de delar som gör djuret igenkänt, inga detaljer.

### Zoom, klipp eller övergång?

Fråga: **byter vi värld, plats eller bara utsnitt?**

| Byte | Använd | Varför | Ljud |
|---|---|---|---|
| Introt → kritan ritar | **kritsvep** i avsnittets färg (1,6 s, ut över scenens första 1,0 s) | titelkortet och papperet är två olika världar | inget eget, jingeln klingar ut |
| Papperet → första platsen | **zoom in i teckningen** (sista 0,8 s, 1 → 2,6) och vitt över | vi kliver in i det kritan ritat. **Det är den enda zoomen i avsnittet** | skogsljudet tonas ut |
| Plats A → plats B | **kritsvep** i nästa plats väggfärg | ny plats. Bilderboken har bara en plats, så normalt aldrig | `skrrrrt` |
| En kodscen → nästa kodscen på samma plats | **molnövergång** (läggs i `satt-ihop.sh`, inte efter introt) | bara när filmen måste delas i flera scener. 020 är en scen och behöver den inte | |
| Ett utsnitt → ett annat på samma plats | **klipp** | helbild ↔ närbild, frågans närbild, saken som ritas. Sanna: *"do cuts instead"* | inget |
| Inne i ett utsnitt | **stilla kamera** | figuren rör sig, kameran står still | |
| Berättelsen → slutet | **kritirisen** (+ 0,6 s svart, sedan outrot) | avslutar på figuren. Zoom ut till papperet används inte i bilderboken | |

**När klipp, och vart:**

- Klipp vid **radbytet** (nytt uppslag), helst precis före repliken. Högst ett klipp per replik, och varje utsnitt står minst 3 s.
- Klipp **in till närbild** på en känsla (vill inte, förtjust, blundar), på det som sägs (fläcken, fötterna) och när frågans paus börjar (bara stället att leta på syns).
- Klipp **ut till helbild** när figuren förflyttar sig (kommer in, pallen, hoppar i) och när en ny sak kommer in i bilden.
- Kritan som ritar en sak: klipp till sakens utsnitt när kritan börjar, och ut igen när saken är fylld (`kamMix` mitt i raden).
- **Zooma aldrig inne i scenen** för att byta utsnitt, och panorera inte. En långsam kameraåkning är bara för en körscen där något färdas, och högst en per plats.

### Slutet

**Kritirisen** runt figurens huvud och saken: radien går från 1400 till 300 på 1,5 s, står 0,4 s och går till 0 på 0,6 s, svart utanför och en krämvit vinglig ring. Sedan **0,6 s svart** (`SVART`). Outrot ska komma efter (se Öppet).

---

## 7. Rendera, bygga, kontrollera

### Rendera

```bash
node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/<scen> 12 40 95 130   # stillbilder + stills/sheet.jpg
node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/<scen> --snabb          # förhandsvisning 960×540, 15 fps
bash avsnitt/NNN-namn/film/rendera.sh       # hela scenen i fyra delar, två åt gången, plus effektljudet och introt
bash avsnitt/NNN-namn/film/satt-ihop.sh     # → film/avsnitt-NNN.mp4
```

- Spara den gamla filmen först: `cp film/avsnitt-NNN.mp4 film/avsnitt-NNN-fore-<runda>.mp4`.
- **Högst två Chromium samtidigt.** Fyra samtidiga tappade bilder i 019. `rendera.sh` delar scenen vid 0/44/88/132/176 s. Är scenen längre än 176 s: lägg till en gräns i `G`.
- Kontrollera `rendera.log`. Kraschar en del, rendera om den delen (`--fran a --till b`).
- Ändras bara ljudet: `render.mjs <scen> --bara-ljud` och `satt-ihop.sh`, ingen ny bild.

### Kontrollera

1. **Längden:** `ffprobe -v error -show_entries format=duration -of csv=p=0 film/avsnitt-NNN.mp4` ska vara intro + scenens `DURATION`.
2. **Ljudstyrkan:** `ffmpeg -nostats -i film/avsnitt-NNN.mp4 -af ebur128=peak=true -f null - 2>&1 | tail -12` ska ge I ≈ −14 LUFS och topp högst −1,5 dBFS.
3. **Kontaktark** på det som ändrats: stillbilder ur scenen (ovan, scentid), eller hela filmen:
   `ffmpeg -i film/avsnitt-NNN.mp4 -vf "fps=1/5,scale=480:-1,tile=6x6" -frames:v 1 kontakt.jpg`. Titta särskilt på armen och tvålen, att inget snurrar, att kritan är liten, och att klippen landar på rätt replik.
4. **Whisper i bitar** på den färdiga mixen: dela ljudet i 30 s-bitar och lyssna av varje bit mot `rost*.txt`:
   ```bash
   d=$(mktemp -d); ffmpeg -i film/avsnitt-NNN.mp4 -ar 16000 -ac 1 -f segment -segment_time 30 $d/bit-%02d.wav
   for f in $d/bit-*.wav; do whisper-cli -m ~/.flow-mcp/models/ggml-large-v3-turbo-q5_0.bin -l sv -f $f; done
   ```
   Alla repliker ska höras, i rätt ordning, och ingen ska klippas av.
5. **Pauserna** efter frågorna ska vara 4–5 s. Mät ur `rader.mjs`:
   ```bash
   node -e "import('./avsnitt/NNN-namn/storyboard/rader.mjs').then(({RADER,ROST})=>{let s=0;const r=[];for(const x of RADER){if(['00','21'].includes(x.id))continue;for(const [n,o] of x.malin||[])r.push([s+o,s+o+ROST[n-1][1],ROST[n-1][0]]);s+=x.d}r.sort((a,b)=>a[0]-b[0]);r.forEach((x,i)=>i&&console.log(x[2].padEnd(22),(x[0]-r[i-1][1]).toFixed(1)+' s tyst före'))})"
   ```
   Raden efter en fråga ska ha 4–5 s tyst före. Ingen replik ska ha under ca 0,4 s, för då krockar de.
6. **Figurens ljud hörs:** lyssna på några svar. Tysta grisljud i 020 berodde på en uttoning från `st=0`.

---

## 8. Gör ett nytt avsnitt

### Steg för steg

1. **Tema:** ett djur med v2-rigg (`✅ Referensark klart` i `karaktarer/`), en vardagshandling och en plats som finns (`bakgrunder/`). Se listan nedan.
2. **Kopiera 020:** `cp -r avsnitt/020-grisen-badar avsnitt/NNN-kort-namn`. Ta bort `film/*.mp4`, `scener/*/*.mp4`, `*.wav`, `stills/`, `ljud/` och `tagning-*/`. Lägg till avsnittet i `harriets-favoriter.md`.
3. **Manus** (`manus.md`) efter mallen nedan: kärnan, uppslagen, rörelsetabellen, regelkollen. Läs replikerna högt. Kolla: inga djurnamn, inget *"Vad kan det vara?"*, tre frågor med paus, varsågod och tack.
4. **Sakerna** med Sanna: hjälpsaken som kritan ritar, och det platsen behöver. Flow-prompt, 4 tagningar, klipp ut, `rekvisita/<sak>.md`.
5. **Rösten:** klistra in replikblocket med taggar i ElevenLabs. Dela med `dela-tagning.py`, normalisera till −3 dBFS och mät längderna in i `ROST`.
6. **Figurens röst:** en `noff-gullig`-liknande familj för djuret (ElevenLabs, 8 känslor), plus sakens ljud. Openverse först för allt annat. Bearbeta enligt tabellen.
7. **`rader.mjs`:** ett uppslag per rad. Räkna `d` ur replikernas längder plus pauserna, som 020:s `L(n)`: `d: 0.3 + L(32) + 1.2 + L(33) + 0.1`. Lägg de riktiga ljuden direkt här.
8. **Storyboarden:** `node avsnitt/NNN-namn/storyboard/bygg.mjs --animatik`. Visa Sanna stillbilderna och animatiken innan scenen byggs.
9. **Scenen** (`scener/<plats>/index.html`): byt plattan, sakerna (`SAKER`, konturerna), figuren (`v2rigg('<mapp>')`, fläckarna eller det som ska bort), kamerautsnitten och `RITDELAR()` för ritintrot. Skriv `S['id']` för varje rad och `ljud()`.
10. **Introt:** `FARGER` och `svepIn`:s färger, och samma färger i scenens `SVEP`.
11. **Förhandsvisa** med `--snabb` och stillbilder. Sedan `rendera.sh` och `satt-ihop.sh`.
12. **Kontrollera** enligt avsnitt 7 innan Sanna ser filmen.

### Lås i den här ordningen

Varje steg bygger på det förra, så ett sent byte kostar mer ju längre ner det sker. Claude stannar och väntar på Sannas ja vid varje grind, och bygger inte vidare på något som inte är godkänt.

| Grind | Sanna godkänner | Det som sedan är dyrt att ändra |
|---|---|---|
| 1. Manus | kärnan, uppslagen och replikerna (lästa högt) | allt |
| 2. Saker | en tagning per sak | konturerna som kritan ritar, uppställningen |
| 3. Rösten | Malins tagning, rad för rad | alla tider: `d` i `rader.mjs` räknas ur replikernas längd |
| 4. Figurens ljud | vilken tagning som är vilken känsla | ljudlistan |
| 5. Animatiken | stillbilderna och tempot | scenen |
| 6. Förhandsvisningen (`--snabb`) | rörelsen och klippen | slutrenderingen (ca 10 min per runda) |

Nya repliker efter grind 3 får nya nummer och en egen kort tagning. Hela manuset spelas bara in igen när tonen ska ändras (som tagning 4).

### Det Claude kan göra själv

De flesta stegen ovan kan Claude göra från början till slut, utom att välja. Sanna väljer tagningar och bilder, och Claude sparar, klipper och ordnar.

| Steg | Verktyg | Claude gör | Sanna gör |
|---|---|---|---|
| Bilder till saker och platser | **Flow-verktygen** (`flow_generate` med `type: "image"`, Nano Banana, 0 krediter, `reference_images` = avsnittets valda saker som stilreferens, `variants: 4`) | genererar 4 tagningar per sak, lägger dem i `assets/rekvisita/<sak>/original/<sak>-1…4.jpeg`, gör `jamforelse.jpg` sida vid sida, klipper ut den valda med `egen_kant.py` till `cut/`, skriver `rekvisita/<sak>.md` och raden i README | väljer nummer |
| Bilder när Flow inte räcker | **OpenArt-verktygen** (skillen `ai-video`): `openart_model_cost` först, sedan `openart_generate_image` | frågar om kostnaden innan något genereras, sparar som ovan | godkänner krediterna, väljer |
| Malins repliker | **Webbläsaren** på elevenlabs.io (Text to Speech, Malin, v3), där Sanna redan är inloggad | klistrar in replikblocket, genererar, laddar ner, flyttar originalet till `produktion/ljud-original/roster/<avsnitt>/`, delar med `dela-tagning.py` till `assets/ljud/roster/<slug>/`, normaliserar och mäter `ROST` | lyssnar och säger vilka rader som ska göras om |
| Ljudeffekter och figurens röst | **Openverse-API:t** först (curl, CC0/BY), sedan **webbläsaren** på ElevenLabs Sound Effects (influence 0,55, längden för hand, 4 per prompt) | söker, laddar ner, klipper, normaliserar enligt tabellen, numrerar utan luckor i `assets/ljud/effekter/<familj>/`, sparar rådatan och skriver README-raden med kredit | lyssnar igenom en provlyssningsfil (`ljud/provlyssna-*.m4a`, alla tagningar efter varandra) och väljer |
| Musikmattan | **Webbläsaren** på Suno (Instrumental, prompten ur `suno.md`) | genererar 2–4, laddar ner som m4a | väljer den jämnaste |
| Allt efter det | lokalt | `rader.mjs`, scenen, rendering, mix, kontrollerna i avsnitt 7 | tittar på filmen |

**Så går det till i webbläsaren:**

- Claude använder den inbyggda webbläsaren (eller Chrome om Sanna ber om det). Är sidan utloggad loggar Sanna in själv. Claude skriver aldrig lösenord.
- Claude **frågar innan varje nedladdning** och säger vilka filer, varifrån och ungefär hur stora. En fråga per omgång räcker ("4 tagningar av `noff-gullig`, ca 50 kB var, från ElevenLabs").
- Claude frågar innan något kostar krediter som inte är gratis (OpenArt, Flow-video, ElevenLabs-tecken om kontot är nära gränsen). Flow-bilder med Nano Banana är gratis.
- Nedladdningarna hamnar i `~/Downloads`. Claude flyttar dem direkt till rätt mapp och döper om dem enligt reglerna, så att inget ligger kvar med ElevenLabs- eller Flow-namn.
- Webbläsaren är långsam och kan fastna på inloggning och popupfönster. Kan Sanna göra en omgång snabbare själv, lägger hon filerna i `~/Downloads` och säger till, så tar Claude det därifrån.

**Mappar, alltid samma:**

| Vad | Original (orört) | Färdigt (används i filmen) |
|---|---|---|
| Malins tagning | `produktion/ljud-original/roster/<avsnitt>/malin-tagning-N.mp3` | `assets/ljud/roster/<slug>/NN-namn.m4a` |
| Ljudeffekt | `produktion/ljud-original/effekter/<familj>/` | `assets/ljud/effekter/<familj>/<familj>-N.m4a` + rad i README |
| Sak | `assets/rekvisita/<sak>/original/` | `assets/rekvisita/<sak>/cut/<sak>.png` + `rekvisita/<sak>.md` |
| Plats | `assets/bakgrunder/<plats>/original/` | `assets/bakgrunder/<plats>/<plats>-vN.jpeg` + `bakgrunder/<plats>.md` |
| Musik | | `avsnitt/NNN-namn/sang.m4a` (eller `matta.m4a`) |

### Mall: uppslag

```markdown
| | |
|---|---|
| **Titelkort** | Avsnitt NN · <Djuret> <gör något> |
| **Figurer (1)** | <Figuren> (v2, riggad) |
| **Platser (1)** | <Platsen> (`bakgrunder/<plats>.md`). Inget platsbyte |
| **Nya saker** | <hjälpsaken som kritan ritar> |
| **I kod** | <fläckar, skum, droppar …> |
| **Kärna** | <Djuret> <problem>. Kritan ritar <sak>: "Varsågod!" – "Tack!" Med <saken> blir det roligt, <lösningen> tre gånger, barnet hjälper med den sista. Lek. Hej då! |
| **Barnet övar på** | <peka på …> · <hitta …> · säga tack |

| # | Bild (en rörelse) | Malin säger | Djuret svarar, ljud |
|---|---|---|---|
| 01 | Papperet: kritan ritar konturen | Kritan ritar … *(paus)* Hm … vad blir det nu? *(paus)* Oj! <En …>! | krita-ritar |
| 1 | Helbild, djuret kommer in | Hej, <djuret>! | steg, hej-ljud |
| 2 | Närbild, problemet syns | Oj, oj, oj! <Problemet>! | belåtet ljud |
| 3 | Helbild, det vuxna förslaget | Nu ska du väl <göra något>? | trumpet ljud, skakar på huvudet |
| 4 | Närbild, vänder bort | Oj då. <Djuret> vill visst inte <…>. *(paus 1 s)* Hm … vad gör vi nu? | trumpet ljud |
| 5 | Kritan ritar hjälpsaken | Titta! Kritan ritar något. *(gisspaus 3 s)* <En …>! Varsågod, <djuret>. | krita-ritar, glitter |
| 6 | Djuret tittar på saken | Vad säger man? *(paus 4 s)* | nyfiket ljud |
| 7 | Nickar | Tack! | förtjust ljud |
| 8 | Leken börjar | Oj! Nu <…>! | <…> |
| 9–12 | Leken, en överraskning | <kort kommentar>. Ni pratar visst med varandra. | ljud – sakens ljud – ljud |
| 13 | Lösningen börjar | Ska du <…> nu? | förtjust ljud |
| 14 | Första gången | Först <…>. <Fras, fras> … borta! | effekt, fniss |
| 15 | Andra gången | Och <…>. <Fras, fras> … borta! | effekt |
| 16 | Vet inte var | Oj, lite <…> är kvar. <Djuret> vet inte var. Kan du hjälpa <djuret>? Kan du se var <…> är? *(paus 5 s, skimrar efter 3 s)* | frågande ljud |
| 17 | Barnet hittade | Ja, där! Ja, på <…>! <Fras, fras> … borta! | förtjust ljud, effekt |
| 18 | Belöningen | Nu är du <…>! Kan du <göra något>? *(paus 4 s)* <ljudord> | fniss |
| 18b | Lek | Nu leker <djuret>! <Ljudord, ljudord>! | fniss, effekt |
| 19 | Hej då | Hej då, <djuret>! Hej då, <saken>! | hej då-ljud, sakens ljud |
| 20 | Kritirisen | – | – |
```

### Mall: replikblock

```
[warmly] Kritan ritar …
[curious] Hm … vad blir det nu?
[excited] Oj! <En …>!
[happy] Hej, <djuret>!
[laughs] Oj, oj, oj! <Problemet>!
[cheerfully] Nu ska du väl <…>?
[chuckles] Oj då. <Djuret> vill visst inte <…>.
[curious] Hm … vad gör vi nu?
[excited] Titta! Kritan ritar något.
[happy] <En …>! Varsågod, <djuret>.
[warmly] Vad säger man?
[happy] Tack!
[surprised] Oj! Nu <…>!
[giggles] Ni pratar visst med varandra.
[cheerfully] Ska du <…> nu?
[happy] Först <…>. <Fras, fras> … borta!
[happy] Och <…>. <Fras, fras> … borta!
[curious] Oj, lite <…> är kvar. <Djuret> vet inte var.
[warmly] Kan du hjälpa <djuret>? Kan du se var <…> är?
[excited] Ja, där! Ja, på <…>!
[happy] <Fras, fras> … borta!
[happy] Nu är du <…>! Kan du <…>?
[playfully] <Ljudord> … [laughs]
[laughs] Nu leker <djuret>! <Ljudord, ljudord>!
[happy] Hej då, <djuret>! Hej då, <saken>!
```

### Teman

Ett djur med färdig v2-rigg och en vardagshandling. Hjälpsaken är det kritan ritar, och det upprepade är lösningen tre gånger.

| Djuret | Vardagen | Platsen | Kritan ritar | Tre gånger, och barnet hittar |
|---|---|---|---|---|
| Kaninen | borstar tänderna | badrummet | en tandborste med en blomma | borsta uppe, nere, och den sista tanden |
| Lammet | klär på sig | lammets rum | en mössa | ena strumpan, andra strumpan, var är vanten? |
| Kon | äter frukost | bondgården | en sked | blåsa på gröten (barnet blåser), en tugga till |
| Björnen | går och lägger sig | lammets rum (natt) | ett gosedjur | gäspa, filten, släcka lampan. Sover liggande på sidan |
| Pandan | städar leksakerna | lammets rum | en låda | bollen, bilen, var är sista klossen? |
| Elefanten | vattnar blommorna | ängen | en vattenkanna | en blomma, två, var är den törstiga? |
| Räven | tar på stövlar i regnet | vägen (regnet ur `overgangar-och-maner.md`) | ett paraply | hoppa i pölar, var är andra stöveln? |
| Musen | tvättar händerna | badrummet | en tvål med bubblor | ena tassen, andra, och smutsen på nosen |

Kolla att platsen finns i `bakgrunder/` och att figuren har v2-rigg innan manuset skrivs.

---

## Öppet i 020

Saker som inte är klara i 020 och som påverkar receptet:

1. **Ingen musikmatta.** Suno-prompten finns i `suno.md` men ingen tagning är gjord, och `satt-ihop.sh` har ingen plats för den än. När den görs: lägg den låg under scenen och sänk den (inte klipp) i pauserna efter frågorna.
2. **Inget outro.** Filmen slutar med kritirisen och 0,6 s svart. Rad `21` i `rader.mjs` är en platshållare, och `satt-ihop.sh` lägger inte till outrojingeln.
3. **Kritan knackar i väntan.** `kritaVanta` låter kritan knacka två gånger mot papperet medan barnet gissar, men `ritintro.md` säger "ingen knackning". Det hörs inget ljud. Bestäm med Sanna vilket som gäller och ändra den ena filen.
4. **`overgangar-och-maner.md` är gammal:** där står fortfarande "ingen berättarröst" och att sången börjar med *"Vad kan det vara?"*. Kritan som ritar inne i scenen (manus Öppet 1) står inte där heller.
5. **`noff-gullig`-ordningen** är nedladdningsordningen. Sanna har inte lyssnat igenom vilken tagning som är vilken känsla.
6. **Storyboarden** (`storyboard.md`) har kvar gamla tider, zoomar och ⚠-platshållare för ljud som nu finns. Bygg om den med `bygg.mjs` när scenen är klar.
7. **Regelavstegen** (ingen sång, ca 12 utsnitt, fler än 2 nya saker) står inte i `regler.md`. Om bilderboken blir ett fast format bör de skrivas in där.
