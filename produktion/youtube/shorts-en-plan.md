# Shorts på engelska – plan (Tiny Crayon TV)

Plan 2026-11-06, inget byggt än. Gäller alla Shorts som finns på svenska i dag. Kanalen: [`kanal-en/kanal.md`](kanal-en/kanal.md), avsnitten: [`kanal-en/oversattning.md`](kanal-en/oversattning.md).

## Regler

- **De svenska Shortsen ligger kvar.** Den engelska versionen läggs bredvid: `<namn>-en.mp4` och `<namn>-en.srt` i samma mapp. Inget svenskt skrivs över.
- **Inga djurnamn i det som sjungs eller sägs:** "the mouse", "the frog", "the lion", aldrig Gurra, Lage eller Mille. Samma i YouTube-texterna nedan, så att det är enkelt.
- **Sången klipps aldrig.** En Short är ett utsnitt av den engelska tagningen, som de svenska. Utsnittet börjar och slutar på en hel fras med 0,3 s toning.
- **YouTube-texten kallar aldrig sångerna "calm".** Amerikansk engelska (color, favorite).
- Samma bildformat som den svenska Shorten: 006/007 kvadratiska 1080×1080, 003/004 och Gissa/Godnatt stående 1080×1920.
- Gjort för barn: **Ja**. Språk: engelska. Undertexter: engelsk SRT bredvid varje film (ur `en/rader.txt` eller replikerna).

**Titelmall:** `<Short> <emoji> | <Episode title> | Tiny Crayon TV`.
**Beskrivning:** två meningar + `Full episode: LINK` + `#shorts #kidssongs #tinycrayontv`. Byt `LINK` mot det engelska avsnittets länk före publicering.

## Översikt

38 svenska Shorts finns i dag:

| Grupp | Antal | Källa | Engelska versionen väntar på |
|---|---|---|---|
| Gissa teckningen | 23 + Bondgårdens samling = 24 | kod + röstrader + Suno-slinga (instrumental) | engelska röstrader (Sanna) + språkflagga i `gissa.js`. **Kan börja nu.** |
| Godnattsagan, Lejonet Lage | 1 | kod + inläsning per sida + instrumental vaggvisa | engelsk inläsning (Sanna) + engelsk text i bild. **Kan börja nu.** |
| 006 Orangea sången | 4 | utsnitt ur avsnittsfilmen | engelska 006-filmen + `en/rader.txt` (sessionen *orange-en-film*) |
| 007 Bruna sången | 4 | utsnitt ur avsnittsfilmen | engelska 007-filmen + `en/rader.txt` (sessionen *brown-en-film*) |
| 004 Vi ska bada! | 3 | scenerna renderade stående | engelsk sång (utkast, inte godkänt, ingen tagning) + omtajmade scener |
| 003 Bussen hälsar på | 1 | scenerna renderade stående | engelsk sång (utkast, inte godkänt, ingen tagning) + omtajmade scener |
| B som i Boll | 1 | AI-video, bild i ruta | en engelsk B is for Ball finns inte än |

Musiken under Gissa och Godnatt är instrumental och kan användas som den är. Ingen ny Suno-slinga behövs för Shortsen. Ljudeffekterna (`assets/ljud/effekter/`) är riktiga ljud och används också som de är.

Inte med här: Shorts som bara är planerade på svenska (004 #4–6, 003 #7, 8, 10, B som i Boll #12–15) och 005, som inte har några Shorts. Gör dem på båda språken samtidigt när de görs. Tittut är bara ett utkast; röstbanken kan få en engelsk kolumn när den spelas in.

---

## 1. Gissa teckningen → Guess the Drawing (24)

**Källa:** `produktion/youtube/shorts/gissa/<tema>/<ord>/index.html` + `gissa.js`. Tiderna räknas ut från röstfilernas längd, så bilden anpassar sig själv till de engelska replikerna.
**Svenskt i dag:** bara rösten (intro, hmm, frågan, hej då, svar, namn, saga). Ingen text i bild. Titel och beskrivning.
**Så görs den engelska:**

1. **Kod (klar 2026-11-06):** `gissa.js` läser `?en` i adressen (som `?staende`). Då hämtas delade repliker ur `assets/ljud/roster/en/` och Shortens egna ur `<short>/en/`, och talsyntesen i förhandsvisningen läser engelska (`svar`, `namn`, `saga` och `latText` behöver ett `en`-fält i varje `index.html`). `render.mjs` får skicka vidare `?en` och skriva `<ord>-staende-en.mp4`. Exporten blir `export/gissa-<ord>-en.mp4`, undertexten `undertexter/gissa-<ord>-en.srt`. Samma för `bondgarden/samling/`.
2. **Röst (Sanna):** alla rader står redan i [`shorts/gissa/ljud-att-gora.md`](shorts/gissa/ljud-att-gora.md), avsnittet *Engelsk version*: 20 delade (intro, hmm, frågan och hej då i fem varianter) och 3 per Short (69). Samlingen behöver 2 till, se nedan.
3. **Rendera**, granska stillbilder, ladda upp.

Den engelska frågan är "What can it be?", samma ord som i de engelska avsnittens sånger, så serierna hänger ihop.

### Samlingen: Bondgården, slutet (`bondgarden/samling/`)

| Fil | Text |
|---|---|
| `shorts/gissa/bondgarden/samling/en/var-ar-kon.m4a` | `Where is the cow?` |
| `shorts/gissa/bondgarden/samling/en/dar-ar-kon.m4a` | `There's the cow!` |
| `assets/ljud/roster/en/hej-da-4.m4a` | finns redan i listan (`Bye-bye! Soon the crayon will draw something new.`) |

### Titlar och beskrivningar

Titel: `What can it be? <emoji> | Guess the Drawing | Tiny Crayon TV`. Spellista: `Guess the Drawing – Farm / Vehicles / Playground`. Beskrivningen slutar med en tom rad och `#shorts #kidssongs #tinycrayontv` (ingen avsnittslänk; de hör inte till något avsnitt).

Alla titlar och beskrivningar, svenska och engelska bredvid varandra: [`shorts/gissa/youtube-text.md`](shorts/gissa/youtube-text.md). Undertexterna: `shorts/undertexter/gissa-<ord>-en.srt`.

**Status:** kan börja nu. Väntar på: röstvalet (beslut 1) och inspelningen.

---

## 2. Godnattsagan: Lejonet Lage → Goodnight, Lion (1)

**Källa:** `produktion/youtube/shorts/godnatt/lejonet-lage/` (`index.html`, `sida-1…8.m4a`, `mun.json`), musiken `godnatt-bad-loop.m4a` (instrumental, används som den är).
**Svenskt i dag:** inläsningen (Malin), texten i bild (`SIDOR`, ordagrant samma som inläsningen), munrörelserna (`mun.json` räknas ur inläsningen), titeln.
**Så görs den engelska:** `index.html?en` väljer engelska `SIDOR` och läser `en/sida-N.m4a` och `en/mun.json` (räknas om ur de engelska filerna). Allt annat är samma bild. Typsnittet (Fredoka) har alla bokstäver som behövs. Utdata: `lejonet-lage-staende-en.mp4`.

**Engelska sidorna** (text i bild = inläsningen, ordagrant; ny rad där `<br>` står):

| # | Text |
|---|---|
| 1 | It's evening.<br>The lion is tired. |
| 2 | Goodnight, moon. |
| 3 | Goodnight, stars. |
| 4 | Goodnight, cloud. |
| 5 | The lion wants to roar. Rrroar …<br>Oh! It turned into<br>a yawn. Yaaawn. |
| 6 | The lion snuggles down<br>in the soft grass. |
| 7 | The lion closes its eyes.<br>Can you close your eyes too? |
| 8 | Goodnight, lion! |

Inläsningen: en engelsk röst, långsam och nära, samma inställningar som Malins (ElevenLabs). Ryt och gäsp mjukt, aldrig läskigt. `bobo`-ljudet efter varje "Goodnight" är inte ett ord och används som det är.

| | |
|---|---|
| Titel | `Goodnight, Lion 🌙 A bedtime story to read together \| Tiny Crayon TV` |
| Beskrivning | `It's evening, and the lion is tired. The lion says goodnight to the moon, the stars and the cloud, tries to roar and yawns instead. A bedtime story to read together, with the words on every page.` + `#shorts #bedtimestory #tinycrayontv` |

**Status:** kan börja nu. Väntar på: röstvalet (beslut 1) och inläsningen.

---

## 3. 006 Orangea sången → The Orange Song (4)

**Källa:** utsnitt ur avsnittsfilmen, kvadratiska. **Svenskt:** hela ljudet (sången), SRT, titel och beskrivning. Bilden har ingen text.
**Så görs den engelska:** när den omtajmade engelska filmen finns (`film/avsnitt-006-en.mp4` eller vad *orange-en-film* döper den till) och `en/rader.txt` med tider. 006 har inget skript för Shortsen; gör om 007:s `shorts/gor-shorts.py` till ett skript som tar avsnittet och `--en` (film, `en/rader.txt`, förskjutning och utfil `NN-namn-en`). Tiderna i tabellen nedan sätts från `en/rader.txt`: utsnittet ges som första och sista sjungna raden.

Hänger på: [orange-en-film](#local_e10a27ee-9b18-4c4f-8c01-3cb412e51415). Den engelska tagningen (`en/sang.m4a`) finns, men `en/rader.txt` och den engelska filmen finns inte än.

| # | Fil | Utsnitt (engelska raderna) | Titel | Beskrivning |
|---|---|---|---|---|
| 1 | `01-vad-kan-det-vara-bat-en` | "The crayon draws …" → "A boat! An orange boat! Toot-toot, off we go!" | `What can it be? ⛵ \| The Orange Song \| Tiny Crayon TV` | `The crayon is drawing something … what can it be? Guess before the answer comes!` |
| 2 | `02-vad-ar-orange-en` | refrängen "Orange! (Orange!)" → "The fish is orange – splash, splash, splash!" | `What's orange? 🐟 \| The Orange Song \| Tiny Crayon TV` | `Orange! Orange! Shout along with the echo and look – the fish is orange, splash, splash, splash!` |
| 3 | `03-vem-kan-hjalpa-en` | "Uh-oh, splash!" → "Yum, yum, yum – hooray, hooray!" | `Who can help? 🦆🍊 \| The Orange Song \| Tiny Crayon TV` | `Splash! The orange floats away and the dino is sad. The duck jumps in and swims after it – half for each of them!` |
| 4 | `04-danspaus-en` | "Dance break!" → "Everybody's dancing – orange dance! (Orange dance!)" | `Dance break! 🧡 \| The Orange Song \| Tiny Crayon TV` | `Dance break! Hop, hop, hop, spin around and clap, clap, clap – everybody's dancing the orange dance.` |

Den svenska danspausen slutar med två extra "Orange dans!". Den engelska texten har inga; sluta där takten slutar efter sista ekot, före sista refrängen.

**Status:** väntar på engelska 006-filmen.

---

## 4. 007 Bruna sången → The Brown Song (4)

Samma som 006: utsnitt ur den engelska filmen med `gor-shorts.py --en`, kvadratiska. Den engelska tagningen (`en/sang.m4a`, version 8, calypso) finns; `en/sang.md` och `en/rader.txt` finns inte än.

Hänger på: [brown-en-film](#local_62264b7b-ad34-4222-8456-b0e5e2204d04).

| # | Fil | Utsnitt (engelska raderna) | Titel | Beskrivning |
|---|---|---|---|---|
| 1 | `01-vad-kan-det-vara-lastbil-en` | "The crayon draws …" → "A truck! A brown truck! Toot-toot, here we go!" | `What can it be? 🚚 \| The Brown Song \| Tiny Crayon TV` | `The crayon is drawing something … what can it be? Guess before the answer comes!` |
| 2 | `02-rutscha-ner-i-kolasas-en` | "The bear dreams … what if, what if …" (förrefräng 1) → "What is brown? Peek-a-boo!" (refräng 1) | `Slide down in caramel! 🤎 \| The Brown Song \| Tiny Crayon TV` | `The bear dreams … what if? A slide right down into caramel – wheee, splash, splash, splash! Sing along: brown, brown!` |
| 3 | `03-vem-kan-hjalpa-en` | "Uh-oh! The bun is rolling!" → "Yum, yum – hooray!" | `Who can help? 🦔 \| The Brown Song \| Tiny Crayon TV` | `Uh-oh! The bun rolls down the hill and the bear is sad. The hedgehog curls up tight and stops it – a piece each for all three!` |
| 4 | `04-danspaus-en` | "Let's dance, let's go!" → "Brown is the yummiest color! (Mmm!)" (två första raderna i sista refrängen) | `Dance break! 🤎 \| The Brown Song \| Tiny Crayon TV` | `Let's dance! Hop, hop, roll around and clap, clap – cone, teddy and bun, all brown!` |

Den engelska förrefrängen 1 har en rad mer än den svenska ("Palm trees and sun!"), så nr 2 blir någon sekund längre. Det gör inget (under 45 s).

**Status:** väntar på engelska 007-filmen.

---

## 5. 004 Vi ska bada! → Let's Go Swimming! (3)

**Källa:** scenerna renderade stående (`render.mjs <scen> --staende`), inte utsnitt ur filmen. **Svenskt:** sången i scenerna, SRT, titel. Bilden har ingen text.
**Så görs den engelska:** först hela kedjan för avsnittet (godkänd `en/sang.md` → Suno → `en/sang.m4a` → `en/rader.txt` → scenerna läser språket), sedan samma stående rendering med engelska ljudet. Ingen session jobbar med 004 på engelska än.

| # | Fil | Utsnitt (engelska utkastet) | Titel | Beskrivning |
|---|---|---|---|---|
| 01 | `01-vad-kan-det-vara-sol-en` | "The crayon draws, round and yellow …" → "A sun! A sun that shines so warm, now we're off to swim!" | `What can it be? ☀️ The crayon draws \| Tiny Crayon TV #shorts` | `The crayon draws something round and yellow … what can it be? Guess together before the answer comes!` |
| 02 | `02-vi-ska-bada-en` | vers 1 + refrängen + körvers 1, slutar på "stop!" | `Let's go swimming! 🚌💦 Toot-toot, sing along \| Tiny Crayon TV #shorts` | `The sun is shining and it's warm – let's go for a swim! The little bus drives off to pick up all its friends. Toot along, and shout stop when the bus stops!` |
| 03 | `03-grodan-vill-bada-en` | "Toot-toot, we stop – stop!" → vers 2 ("Hey, hey, little frog, hop on board! … One, two, three – hop, hop, hop!") + refrängen + körvers 2 till "Who is waiting for us there?" | `The frog wants to swim! 🐸 Ribbit-ribbit and hop, hop, hop \| Tiny Crayon TV #shorts` | `Stop! The frog is waiting by the road and wants to swim too. Ribbit-ribbit! One, two, three – hop, hop, hop, into the bus. Shout stop, ribbit and hop along!` |

Pausen efter stoppet har ett "tut-tut" och ett kväkande. Är de ljudeffekter (`tuta-tut`, `kvak`) följer de med som de är. Är det en svensk röst behövs "Toot-toot!" och "Ribbit-ribbit!" inspelade på engelska. Kolla i scenen när den byggs om.

Titlarna följer de svenska Shortsens titlar (`shorts-text.md`), inte avsnittsmallen. Lägg in avsnittets namn om du vill ha samma mall som 006/007.

**Status:** väntar på engelska 004-sången (utkastet är inte godkänt) och omtajmningen.

---

## 6. 003 Bussen hälsar på → The Bus Comes to Visit (1)

Som 004: stående rendering av scenerna med engelska ljudet. Ingen session jobbar med 003 på engelska än, och 003 har många hårdkodade tider (`oversattning.md`).

| # | Fil | Utsnitt (engelska utkastet) | Titel | Beskrivning |
|---|---|---|---|---|
| 09 | `09-hur-sager-lammet-en` | vers 3 "The lamb is sleeping by the hay" → vers 4 "and we all wave: bye, bye, bye!" | `How does the lamb go? 🐑 Baa-baa! \| Tiny Crayon TV #shorts` | `The lamb is sleeping by the hay. Snore … squeak … How does the lamb go? Do you know? Baa-baa! Good morning, little lamb.` |

Den talade repliken efter vers 3 ("Baa-aa, how cosy! …") är inte med i den svenska Shorten och tas inte med här heller.

**Status:** väntar på engelska 003-sången och omtajmningen.

---

## 7. B som i Boll → B is for Ball (1)

**Källa:** AI-video (bild i ruta), hela klippet ligger utanför repot. **Svenskt:** "B! Björn! B! Boll!" i ljudet (inte bekräftat vilka ord, se `shorts-text.md`).
**Så görs den engelska:** först en engelsk B is for Ball (avsnittet), sedan samma utsnitt. Björn och Boll blir **Bear** och **Ball**, så B:et fungerar.

| # | Fil | Utsnitt | Titel | Beskrivning |
|---|---|---|---|---|
| 11 | `11-b-som-i-bjorn-och-boll-en` | samma bild som den svenska (0:39–1:03), engelskt ljud | `B is for Bear and Ball! 🐻⚽ \| Tiny Crayon TV #shorts` | `The little duck and the teddy play at the playground, and a big B is painted. B is for bear! B is for ball! Say the word together.` + `#shorts #letterB #tinycrayontv` |

Ingenting sägs om Lil Quack med namn i ljudet ("the little duck"); namnet får stå i avsnittets titel.

**Status:** sist. Väntar på att B is for Ball blir till på engelska och att 3:33-klippet hittas (`oversattning.md`).

---

## Ordning

1. **Nu, parallellt:**
   - Sanna bestämmer den engelska rösten och spelar in Gissa-raderna (89 + 2 för samlingen) och Godnattsagans 8 sidor.
   - Under tiden: `?en` i `gissa.js`, `render.mjs` och Godnattsagans `index.html`. Förhandsvisningen läser med talsyntes tills filerna finns, så koden kan göras och granskas innan inspelningen.
   - Ordning för Gissa: Bondgården (9 + samlingen, samma ordning som på svenska), sedan Fordon och Lekplatsen.
2. **När 006- och 007-filmerna är klara:** gemensamt `gor-shorts.py --en`, sedan 006:s fyra och 007:s fyra. 006 först (piloten), om båda inte blir klara samtidigt.
3. **004 och 003:** när deras engelska sånger är godkända, inspelade och scenerna tajmade om. Först 004 (tre Shorts), sedan 003.
4. **B is for Ball** sist.

Publicera som på svenska: högst en Short om dagen, och blanda serierna (Guess the Drawing, Sing along, Goodnight), så att ingen vecka bara är en sak. Avsnittsklippen kommer bäst ut samma vecka som sitt avsnitt, så att länken leder någonstans.

## Det Sanna behöver göra eller bestämma

1. **Den engelska rösten.** En berättarröst i ElevenLabs för alla Gissa-Shorts (och Tittut senare). För Godnattsagan: samma röst eller en egen, långsammare? Förslag: samma röst i båda, så känner barnet igen den.
2. **Röstinställningarna.** `ljud-att-gora.md` säger Multilingual v2 (stability 0,6, similarity 0,8), skillen säger Eleven v3 (0,5/0,75). Raderna har ljudtaggar (`[excited]`), som bara Eleven v3 läser. Förslag: Eleven v3 för alla engelska rader.
3. **Spela in:** Gissa-raderna i `shorts/gissa/ljud-att-gora.md` (avsnittet *Engelsk version*), de två samlingsraderna ovan och Godnattsagans 8 sidor ovan.
4. **Godkänna** de engelska sångtexterna för 004 och 003 (utkasten är inte godkända), så att de kan gå till Suno.
5. **Titlarna för 004/003/B:** behåll de svenska Shortsens titelmall (som ovan) eller gå över till avsnittsmallen `<Short> | <Episode> | Tiny Crayon TV` för alla.
