# Godnattsagan: Kaninen Kanel

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** Kaninen Kanel (✅ referensark), den bruna versionen utan ansikte: `assets/karaktarer/kaninen-kanel/cut/kanel-faceless.png`. Inte den rosa i `v2/` och inte de gamla rosa vyerna (`kanel-34`, `kanel-side`, `kanel-back`).
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 90 s

Kanel vill hoppa, som hon alltid gör, men hon är för sömnig. Det blir bara ett jättelitet hopp, och sedan en gäspning. Sagan blir tystare för varje sida: barnet får gäspa med, andas med och blunda med, och berättaren pratar direkt till barnet.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Kaninen", inte "Kanel".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Kaninen är sömnig.<br>Är du också sömnig? | Kaninen andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, kaninens ansikte nederst. Månen lyser upp och vaknar, kaninens mun rör sig med repliken. Sedan säger hon själv godnatt med en liten studs | `glimt`, sedan `duns` |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget. Kaninen studsar lite | `ding`, ett per stjärna, sedan `duns` |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Kaninen studsar lite. Sedan helbild igen | `swoosh`, lågt, sedan `duns` |
| 5 | Ett, två, tre – hopp!<br>Det blev ett jättelitet hopp.<br>Kaninen gäspar. Gääsp.<br>Kan du också gäspa? | **Inget riktigt hopp:** en jätteliten studs på stället på "hopp!", fötterna står kvar. Sedan gäspningen: munnen blir ett stort O och ögonen kniper ihop | `duns`, mjukt, på studsen |
| 6 | Kaninen kryper ner<br>i det mjuka gräset.<br>Öronen blir tunga. Så tunga. | Kaninen lägger sig (den stående bilden tonas över i den liggande) och sjunker några pixlar till på "tunga". **Tillfälligt:** tills den liggande bilden finns trycks den stående bilden bara ihop | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Kaninen andas in …<br>och ut.<br>In … och ut.<br>Kan du också? | Kaninen andas synligt djupt, ca 4 s per andetag. Det är sidans enda rörelse. Läggs i takt med inläsningen när den finns | – |
| 8 | Kaninen blundar.<br>Nu sover kaninen.<br>Godnatt, kanin.<br>Godnatt, du. | Kaninen, månen, stjärnorna och molnet sluter ögonen, sedan mörknar bilden till svart | musiken tonas ut |

## Inläsningen

Malin läser varje sida lite långsammare och mjukare än den förra: ElevenLabs-hastighet ca 0,9 på sida 1, ner till ca 0,75 på sida 8. På sida 7 gör hon riktiga andetag i pauserna ("in …" och "ut"). Sida 7 och 8 står inläsningen + 5 s, de andra + 4 s.

Hela tiden, lugnt: kaninen andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena på månen, stjärnorna och molnet ritas i kod (prickögon och ett litet leende). Kaninens ögon (412, 396) och (605, 401) och munnen (510, 458) i 1024-rutan, som i `karaktarer/kaninen-kanel.md`. Fötterna står på (521, 925).

Kanels godnatt-ljud är ett mjukt `duns` (hennes hoppljud, `assets/ljud/effekter/duns/`) i stället för lejonets `bobo`. Ljudet är inte en röst, så munnen är stängd under det. Hon studsar till på stället i stället.

Öronen sitter i samma bild som kroppen, så på "Öronen blir tunga" sjunker hela kaninen lite i stället. Den liggande posen har öronen bakåtlagda.

## Den liggande posen (saknas)

Prompten står i [`karaktarer/kaninen-kanel.md`](../../../../../karaktarer/kaninen-kanel.md#pose-ligger-och-sover-godnattsagan) (image2image, bild 1 = `kanel-faceless.png`, bild 2 = `lammet-ludde/ludde-sover.png` bara för posen, öronen bakåt). När bilden finns:

1. Lägg den som `assets/karaktarer/kaninen-kanel/ligger/kanel-ligger.png` (1024×1024, utklippt, vit kant), originalen i `ligger/original/`.
2. Mät fötterna (konst), ögonen och munnen i bilden och skriv in dem i `LAGE.ligger` i `index.html`. Punkterna som står där nu är gissade.
3. Ta bort `platt: 0.72` i `LAGE`. Då tonas den stående bilden över i den liggande, som hos Lage.

## Att tänka på

- Kaninen vänds aldrig och snurrar inte. Hon står still, vänd mot tittaren, hela filmen.
- Inga hopp (formatet): studsen på sida 5 är en liten fjädring på stället, fötterna lämnar aldrig marken. Sagans poäng är att hoppet blir så litet.
- "Ett, två, tre – hopp!" läses in sömnigt, inte uppspelt. Gäspningen mjuk och lång, så att barnet gäspar med.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Tiderna i tabellen är bara ungefärliga.
- Tiderna på sidan, som del av sidan (0 → 1) i `index.html`, flyttas till orden när inläsningen finns: studsen `HOPP` (nu 12 %, "hopp!"), gäspningen `GASP` (45–85 %, "Gääsp") och sjunket `TUNGA` (75 %, "tunga"). Andningen på sida 7 går 4 s per andetag från sidans början; ändra perioden (`/ 4`) om Malins andetag är längre.
- Nämn inga befintliga böcker eller serier i filerna eller i YouTube-texten.
- Gräskullen täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Kanel 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen ovan och läses av talsyntesen i förhandsvisningen; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter; sida 7–8 + 5 s), och allt räknas om av sig självt.

- Munnen: `mun.json` räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/kaninen-kanel/mun.py produktion/youtube/shorts/godnatt/kaninen-kanel` (ljudstyrkan, 30 värden per sekund, behöver ffmpeg). Kör om den när sidorna läses in på nytt. Den är tom (`{}`) tills inläsningen finns.
- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/kaninen-kanel/`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/kaninen-kanel --staende` → `kaninen-kanel-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 5 38.6 46 62 66 81 88` → `stills-staende/sheet.jpg`.
