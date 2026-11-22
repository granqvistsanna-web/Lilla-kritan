# 035 Katten hittar julklappar

Julavsnitt i bilderboksserien *Djuren hittar på!* (ingen sång, Malin berättar, en figur). Recept: [`format/bilderbok.md`](../../format/bilderbok.md), skillen `bilderbok`. Förlagor: [022](../022-kaninen-ater-frukost/manus.md) och [023](../023-bjornen-tvattar-handerna/manus.md).

**Status (2026-11-13):** grind 1–4 klara (manus, Snögården, Malin, `mjau-gullig`). Claude valde tagningarna, se nedan. Filmen `film/avsnitt-035.mp4` är klar för Sannas granskning (grind 6).

| | |
|---|---|
| **Figur** | Katten (Kaj, v2-rigg) |
| **Plats** | Snögården, ny: en snöig gård med en röd stuga och en gran, julafton |
| **Kritan ritar** | en tomteluva (gåvan) och en pulka (för paketen) |
| **Tre gånger** | *"Gräv, gräv … ett paket!"* |
| **Barnet hjälper** | det sista paketet ligger precis bakom katten, bara rosetten syns |
| **Leken** | katten fångar snöflingor, och en landar på nosen |
| **Frågor till barnet** | säga tack (2,5 s), var är paketet (5 s), säga god jul (4 s) |
| **Nya saker** | inga (en ny platta) |
| **Längd** | ca 4 min med introt |

## Berättelsen i korthet

Det är julafton och det snöar. Katten trippar ut i snön, men fryser och vill gå in. Kritan ritar en tomteluva: "Varsågod!" – "Tack!" Med luvan på blir det varmt och skönt, och katten fångar snöflingor tills en landar på nosen. Ett rött hörn sticker upp ur snön. *"Gräv, gräv … ett paket!"* vid trappan, sedan under granen. Ett paket är kvar, och barnet ser rosetten precis bakom katten. Tre paket är för många att bära, så kritan ritar en pulka, och paketen hoppar upp: ett, två, tre. *"Det är julafton! Kan du säga god jul?"* Hej då!

## Filerna

| Fil | Vad |
|---|---|
| [manus.md](manus.md) | kärnan, rörelserna, uppslagen, Malins replikblock, regelkollen |
| [storyboard.md](storyboard.md) | uppslagen med uppskattade tider och kamerautsnitt |
| [behov.md](behov.md) | vad som behövs och vad som finns, bakgrundens Flow-prompt |
| [rost.txt](rost.txt) | filnamn + repliker för `verktyg/dela-tagning.py` |
| [storyboard/rader.mjs](storyboard/rader.mjs) | raderna med tider, som scenen läser |
| [scener/snogarden/](scener/snogarden/index.html) | kodscenen (ritintrot, Snögården, kritirisen) |
| [film/satt-ihop.sh](film/satt-ihop.sh) | introt + scenen + mixen → `film/avsnitt-035.mp4`. Rendera först med `node verktyg/render-delat.mjs avsnitt/035-katten-hittar-julklappar/scener/snogarden --bitar 6` |

## Grindarna

| # | Grind | Läge |
|---|---|---|
| 1 | Manus | ✅ 2026-11-13 (*"push on"*), sedan katt och ny bakgrund |
| 2 | Saker och plats | ✅ Snögården tagning 1 (Claudes val, se nedan); luvan och pulkan ritas av kritan |
| 3 | Rösten | ✅ 35 repliker i `assets/ljud/roster/katten-hittar-julklappar/` |
| 4 | Kattens ljud | ✅ `mjau-gullig` 1–8 (Claudes val, se nedan och `ljud-effekter.md`) |
| 5 | Animatik | hoppades över, se nedan |
| 6 | Förhandsvisning | 🎬 `film/avsnitt-035.mp4` (3:59, −14,2 LUFS, topp −1,6 dBFS, whisper hör alla repliker, pauserna efter frågorna 4,5–5,5 s), Sanna granskar |

## Feedback J06 2026-11-22

- Ny bakgrund: den blå björkdungen (`bjorkdungen/bjorkdungen-platt-bla.jpeg`) i stället för Snögården. Paket 1 ligger vid björkarna (x 310), paket 2 vid fågelholken (x 1700). Ingen stuga, så katten tittar bara bort åt vänster när den vill gå in.
- Större katt (`GS` 0,38 → 0,46; rosettnärbilden vidare så att katten syns).
- Fler och nya kattljud i stället för samma `mjau-gullig-2` överallt: 044:s kattunge (`mjau-trill`, `-ooo`, `-oj`, `-spinn`, `-puttar`) och Sannas nya tagningar (`mjau-aah`, `-fraga`, `-glad`, `-prat`, provlyssna i `ljud/provlyssna-mjau-sanna.m4a`), plus ett litet oj-mjau när katten fryser.
- Snöret i kod mellan pulkan och tassen bort.
- *"Det är julafton!"* bort: replik `32b-saga-god-jul` (bara *"Kan du säga god jul?"*).
- Outrot: kameran glider in på kattens ansikte och kritirisen sluts runt det.

## Feedback J06 2026-11-22, runda 2

- **Ritintrot ritar paketet** (det gröna med röd rosett, paket 1) i stället för katten, med `verktyg/kritan-ritar.js` och konturen `assets/rekvisita/paket/cut/paket-hog-kontur.json`. Svaret är *"… ett paket!"*, klippt ur Malins `25-grav-grav` (från 2,52 s) till `03b-ett-paket.m4a`, så ingen ny tagning behövdes. Övergången in i björkdungen är hålet i papperet (som 011), inte den vita toningen.
- **Svansen** vickar lugnt hela tiden och släpar efter stegen i gången.
- **Förgrunden:** julkulan, pepparkaksstjärnan, grankvisten och den gula stjärnan bort. Snötussarna är kvar.
- **Brr** (`effekter/brr`, 1,1 s) och ett litet huttrande när rad 6 börjar, före *"Katten vill visst gå in"*.
- **Kameran** i grävnärbilderna (rad 16 och 17) är flyttad upp (y 790 → 700), så att luvan inte klipps.
- **Spaden** (`rekvisita/spade`, bladet tonat till tydligt gult i scenen så att det inte blir en till röd sak i snön): står nedstucken vid björken från början, katten tar den i rad 16, byter tass framför magen i 16b och 18 och lägger den på pulkan i rad 24. Grävandet är ett riktigt tag per *"gräv"*: lyft, stick ner, kasta, och en snöklump flyger ut och puffar i snön.
- Line boil sänkt till 2,5 px i bild, 6 gånger/s (CLAUDE.md). `qa-film.sh` flaggar ändå boil i filmen (16,7 px/s), men förra versionen mätte lika (15,5): det är snöfallet som mäts, inte kanterna.
- Kritan gick över kattens ansikte vid tomteluvan (katten blev större i förra rundan). Luvan ritas nu längre till vänster (x 690), kritan kommer högt in och sedan rakt ner, väntar till vänster om luvan och flyger ut uppåt vänster.

## Kimis granskning av replikerna (2026-11-13)

Sanna bad om en granskning av Kimi innan Malins röst görs. Kimi hade fem anmärkningar. Ingen ändrades, för alla fem är val som serien redan gjort och Sanna godkänt i 020–024:

- tack-pausen är 2,5 s, inte 4–5 s (Sanna 2026-11-11: snabbare tackscen);
- *"Katten vet inte var."* är receptets fras (*"Björnen vet inte var."* i 023);
- uppslag 22 återanvänder replik 10, *"Hm … vad gör vi nu?"*, och står i manuset;
- `[happy sigh]` fungerade i 020;
- `[giggles]` sist på raden fungerade i 022 och 023.

Inga djurnamn, inget *"Vad kan det vara?"* och inget *"Vad säger man?"*.

## Beslut (2026-11-13)

Sanna gav klartecken (*"push on"*) och bad att de öppna frågorna besvaras med Claudes rekommendation. Sedan bytte hon figur (*"katt istället för agda"*) och plats (*"ny vinter bg"*).

1. **Handlingen:** som i manuset. Leken är att katten fångar snöflingor och får en på nosen.
2. **Figuren:** katten. Riggen är godkänd i 030 men statusraden i `karaktarer/katten-kaj.md` säger fortfarande ⏳.
3. **Kattens röst:** en egen familj `mjau-gullig` (8 känslor), som sedan används i alla kattens avsnitt. Kostar ElevenLabs-krediter.
4. **Paketen:** tre röda (samma som julkalendern) i tre storlekar. De öppnas inte.
5. **Titeln:** *Katten hittar julklappar*, Malin säger *paket*.
6. **Musik:** ingen. En lugn vintermatta under scenen.
7. **Platsen:** ny platta, Snögården (julkalenderns snöplats används inte).
8. **Publicering:** före julafton, som ett vanligt avsnitt.

## Claudes val (2026-11-13, Sanna: *"välj själv och skriv varför"*)

- **Snögården: tagning 1.** Hela stugan med snötak, fönster, krans och trappa syns, granen står fri och mitten är tom för katten. Tagning 3 och 4 skär av taket i överkanten; tagning 2 kom ut från Flow som en ljudfil. Se `bakgrunder/snogarden.md`.
- **Malin:** tagning a, utom 03 och 04 från tagning b (i a hamnade *"En katt!"* i fel fil).
- **Kattens röst `mjau-gullig`:** tagning 3, 3, 3, 3, 1, 1, 1, 3 för känsla 1–8.
  - 1 hej och 8 hej då: tagning 3, den enda där svensk whisper hör *"Hej"* respektive ett tydligt *"Hej då!"*.
  - 2 förtjust: tagning 3, ett tvådelat *"mew-mew!"* som prompten bad om.
  - 3 fniss och 4 mysig suck: tagning 3, längst och med flest små fniss respektive hela spinnet (2,0 s).
  - 7 pratar: tagning 1, den enda med tre skilda mjau.
  - 5 och 6: tagning 1, korta och rena.
- **Effekter:** bara ljud som redan fanns i `assets/ljud/effekter/`, inget nytt laddades ner. `vinterljud` (vind i snögranar) går under hela scenen, `tass` är kattens steg, `puff` grävandet och snöpuffarna, plus plingar, pop och tindra. **`vinterljud` är CC BY 4.0: skriv "pineforest winter NL by klankbeeld (freesound.org), CC BY 4.0" i YouTube-texten.**
- **Animatiken hoppades över:** Sanna bad om en färdig film att granska direkt, så grind 5 och 6 görs i samma steg.
