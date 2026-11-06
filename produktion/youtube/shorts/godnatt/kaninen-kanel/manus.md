# Godnattsagan: Kaninen Kanel

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** Kaninen Kanel (✅ referensark), den bruna versionen utan ansikte: `assets/karaktarer/kaninen-kanel/cut/kanel-faceless.png`. Inte den rosa i `v2/` och inte de gamla rosa vyerna (`kanel-34`, `kanel-side`, `kanel-back`).
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80 s

Kanel vill hoppa, som hon alltid gör, men hon är för trött. Det blir bara ett jättelitet hopp. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Kaninen", inte "Kanel".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Kaninen är trött. | Kaninen andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, kaninens ansikte nederst. Månen lyser upp och vaknar, kaninens mun rör sig med repliken. Sedan säger hon själv godnatt med en liten studs | `glimt`, sedan `duns` |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget. Kaninen studsar lite | `ding`, ett per stjärna, sedan `duns` |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Kaninen studsar lite. Sedan helbild igen | `swoosh`, lågt, sedan `duns` |
| 5 | Ett, två, tre – hopp!<br>Nej, det blev ett litet hopp.<br>Ett jättelitet. | **Inget riktigt hopp:** fötterna står kvar. Kroppen trycks ihop och sträcker på sig lite på "hopp!", och en gång till, ännu mindre, på "ett jättelitet" | `duns`, mjukt, på varje studs |
| 6 | Kaninen kryper ner<br>i det mjuka gräset. | Kaninen trycks ihop och lägger sig. **Tillfälligt:** tills den liggande bilden finns trycks den stående bilden bara ihop | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Kaninen blundar.<br>Kan du också blunda? | Kaninen, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, kanin! | Kaninen andas djupt, bilden mörknar till svart | musiken tonas ut |

Hela tiden, lugnt: kaninen andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Kaninens ögon (412, 396) och (605, 401) och munnen (510, 458) i 1024-rutan, som i `karaktarer/kaninen-kanel.md`. Fötterna står på (521, 925).

Kanels godnatt-ljud är ett mjukt `duns` (hennes hoppljud, `assets/ljud/effekter/duns/`) i stället för lejonets `bobo`. Ljudet är inte en röst, så munnen är stängd under det. Hon studsar till på stället i stället.

Öronen hänger inte efter studsen: de sitter i samma bild som kroppen. Ska de sjunka behövs öronen som egna urklipp.

## Den liggande posen (saknas)

Prompten står i [`karaktarer/kaninen-kanel.md`](../../../../../karaktarer/kaninen-kanel.md#pose-ligger-och-sover-godnattsagan) (image2image, bild 1 = `kanel-faceless.png`, bild 2 = `lammet-ludde/ludde-sover.png` bara för posen, öronen bakåt). När bilden finns:

1. Lägg den som `assets/karaktarer/kaninen-kanel/ligger/kanel-ligger.png` (1024×1024, utklippt, vit kant), originalen i `ligger/original/`.
2. Mät fötterna (konst), ögonen och munnen i bilden och skriv in dem i `LAGE.ligger` i `index.html`. Punkterna som står där nu är gissade.
3. Ta bort `platt: 0.72` i `LAGE`. Då tonas den stående bilden över i den liggande, som hos Lage.

## Att tänka på

- Kaninen vänds aldrig och snurrar inte. Hon står still, vänd mot tittaren, hela filmen.
- Inga hopp (formatet): studsen på sida 5 är en liten fjädring på stället, fötterna lämnar aldrig marken. Sagans poäng är att hoppet blir så litet.
- "Ett, två, tre – hopp!" läses in glatt men sömnigt, inte uppspelt. "Ett jättelitet" nästan viskat.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, så tiderna i tabellen är bara ungefärliga.
- Studsarna på sida 5 sitter på 22 % och 72 % av sidan (`HOPP` i `index.html`). Flytta dem till orden "hopp!" och "jättelitet" när inläsningen finns.
- Gräskullen täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Kanel 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen ovan och läses av talsyntesen i förhandsvisningen; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter), och allt räknas om av sig självt.

- Munnen: `mun.json` räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/kaninen-kanel/mun.py produktion/youtube/shorts/godnatt/kaninen-kanel` (ljudstyrkan, 30 värden per sekund, behöver ffmpeg). Kör om den när sidorna läses in på nytt. Den är tom (`{}`) tills inläsningen finns.
- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/kaninen-kanel/`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/kaninen-kanel --staende` → `kaninen-kanel-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 12.4 39.4 39.9 54 64` → `stills-staende/sheet.jpg`.
