# Godnattsagan: Zebran Zebbe

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** [Zebran Zebbe](../../../../../karaktarer/zebran-zebbe.md) (✅ referensark, bilderna i `assets/karaktarer/zebran-zebbe/`)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80–90 s

Zebbe är glad och sprallig och räknar gärna sina ränder. I kväll somnar han mitt i räkningen. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Zebran", inte "Zebbe".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Zebran är trött. | Zebran andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, zebrans ansikte nederst. Månen lyser upp och vaknar, zebrans mun rör sig med repliken | `glimt`, sedan zebrans godnattljud |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget | `ding`, ett per stjärna, sedan godnattljudet |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Sedan helbild igen | `swoosh`, lågt, sedan godnattljudet |
| 5 | Zebran räknar sina ränder.<br>En, två, tre …<br>fyra …<br>Zebran somnade visst. | En lugn huvudrörelse: ögonlocken blir tyngre för varje siffra och bilden mörknar lite (6 % per siffra). På "somnade visst" sluts ögonen nästan helt. Mörkret ligger kvar resten av filmen | (rösten) |
| 6 | Zebran kryper ner<br>i det mjuka gräset. | Zebran trycks ihop och lägger sig. **Tillfälligt:** den stående bilden trycks bara ihop och blir lite bredare, tills den liggande posen finns | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Zebran blundar.<br>Kan du också blunda? | Zebran, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, zebra! | Zebran andas djupt, bilden mörknar till svart | musiken tonas ut |

Hela tiden, lugnt: zebran andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Zebrans ansikte ritas också i kod på `zebran-zebbe-faceless.png`: ögonen (414, 401) och (603, 400), radie 25, och munnen (505, 530) i nedre delen av mulen, uppmätta mot `zebran-zebbe.png`. Munnen är ett litet leende (mindre och sömnigare än bilden med ansikte) som öppnas med mörk insida och tunga. Närbilden på zebrans ansikte har zoom 3,6.

### Sida 5: räkningen

Malin läser siffrorna långsammare och långsammare: *"En, två, tre …"* med korta pauser, sedan en längre paus före *"fyra …"*, och *"Zebran somnade visst"* viskande. När bilden mörknar och ögonen blir tyngre styrs av `RAKNA` i `index.html` (när varje siffra sägs, som andel av sidans rörelse). Flytta värdena när inläsningen finns, så att varje steg kommer på sin siffra.

### Godnattljudet (sida 2–4)

Förslag: ett **mjukt, lågt frustande**, läpparna som fladdrar (som en häst som slappnar av), kort, ca 0,6–0,8 s. Inget gnägg (för högt och sprallig) och inget som låter som ett bää. Det finns inget sådant ljud i `assets/ljud/effekter/` än, så **tills vidare lånar zebran lejonets `bobo`** (`GODNATT_LJUD` i `index.html`, märkt TILLFÄLLIGT). Förslag till ElevenLabs SFX:

```
a soft, gentle, sleepy horse lip flutter snort, low and relaxed, very short, close and quiet, no neigh, no whinny
```

Läggs det in som `assets/ljud/effekter/frust/frust-1.m4a` … : sätt `GODNATT_LJUD = 'frust'` och `BOBO` till de tagningar som ska användas, och `LJUD = 'frust'` i `mun.py`.

## Att tänka på

- Zebran vänds aldrig och snurrar inte. Han står still, vänd mot tittaren, hela filmen. Inga hopp och ingen galopp, fast han är sprallig annars.
- Ränderna räknas inte i bild (ingen pekar, inga siffror tänds). Barnet får räkna med rösten.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, så tiderna i `SIDOR` är bara ungefärliga.
- Sida 5 har fyra rader. Texten slutar ca 60 px ovanför zebrans öron.
- Gräskullen täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Zebbe 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (2026-11-06, kopierad från Lages). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/zebran-zebbe/`. Sidor utan inläsning läses av talsyntesen.
- Munnen: `python3 produktion/youtube/shorts/godnatt/zebran-zebbe/mun.py` i repots rot, efter nya `sida-N.m4a` eller nytt godnattljud. Skriver `mun.json`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/zebran-zebbe --staende` → `zebran-zebbe-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 12.6 22 40 46 50.5 59 68` → `stills-staende/sheet.jpg`.

## Kvar att göra

- [ ] Inläsningen `sida-1.m4a` … `sida-8.m4a` (Malin), sedan `mun.py` och `RAKNA`.
- [ ] Den liggande posen `assets/karaktarer/zebran-zebbe/ligger/zebran-zebbe-ligger.png` (prompten i [`karaktarer/zebran-zebbe.md`](../../../../../karaktarer/zebran-zebbe.md#pose-ligger-och-sover-godnattsagan)). Mät sedan ögon, mun och punkten mellan hovarna i bilden och fyll i `ZEBBE.ligger` i `index.html`.
- [ ] Godnattljudet (frustet), se ovan.
