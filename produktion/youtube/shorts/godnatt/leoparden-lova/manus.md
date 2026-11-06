# Godnattsagan: Leoparden Lova

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen. Mallen är [Lejonet Lage](../lejonet-lage/manus.md).

- **Figur:** Leoparden Lova (✅ referensark, bilderna i `assets/karaktarer/leoparden-lova/`)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80 s

Lova är snabbast av alla och vill springa en gång till. Men nu är det kväll, så hon går långsamt i stället: tass, tass, tass. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Leoparden", inte "Lova".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Leoparden springer en sista gång. | Leoparden glider lugnt in från höger (svansen bakåt) och stannar. Hon är vänd mot oss hela tiden, inga hopp | `swoosh`, lågt |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, leopardens ansikte nederst. Månen lyser upp och vaknar, leopardens mun rör sig med repliken | `glimt` |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget | `ding`, ett per stjärna |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Sedan helbild igen | `swoosh`, lågt |
| 5 | Vips! … Nej.<br>Nu går leoparden långsamt.<br>Tass. Tass. Tass. | En rörelse: en liten ansats åt vänster som stannar direkt, sedan tre långsamma steg åt vänster, ett litet vagg per steg. Hon vänds aldrig | `steg`, ett per tass |
| 6 | Leoparden kryper ner<br>i det mjuka gräset. | Leoparden trycks ihop och lägger sig (**tillfälligt:** den stående bilden trycks ihop till en låg limpa, se nedan) | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Leoparden blundar.<br>Kan du också blunda? | Leoparden, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, leopard! | Leoparden andas djupt, bilden mörknar till svart | musiken tonas ut |

Hela tiden, lugnt: leoparden andas, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena ritas i kod. Lovas ögon (413, 398) och (604, 396) och mun (512, 497, samma som i 014:s `kit.js`) i 1024-rutan, fötterna på (520, 912), uppmätta i `cut/leoparden-lova-faceless.png` 2026-11-06. Hon står på x 600 på sida 1–4 och tassar till x 540 på sida 5.

**Godnatt-ljudet (tillfälligt):** efter varje "Godnatt, …" på sida 2–4 ska Lova säga godnatt med ett eget mjukt spinn. Det finns inget spinn i `assets/ljud/effekter/` än, så Lages `bobo` (1, 2, 4) används som platshållare. När spinnet finns: lägg det som `assets/ljud/effekter/spinn/spinn-N.m4a`, byt `effekt('bobo', k)` mot `effekt('spinn', k)` och `MUN['bobo-' …]` i `index.html`, och byt `GODNATT` i `mun.py`. Ett spinn är tyst med munnen: munnen kan få vara stängd (ta då bort `bo` ur munnen).

**Den liggande posen (tillfälligt):** finns inte än. Prompten står i [`karaktarer/leoparden-lova.md`](../../../../../karaktarer/leoparden-lova.md#pose-ligger-och-sover-godnattsagan). Tills dess trycks den stående bilden ihop på sida 6. När `assets/karaktarer/leoparden-lova/ligger/leoparden-lova-ligger.png` finns: sätt `LIGGER = true` i `index.html` och mät `ligger`-punkterna (fötterna, ögonen, munnen) i bilden.

`mun.json` räknas fram ur `sida-N.m4a` och godnatt-ljudet med `python3 produktion/youtube/shorts/godnatt/leoparden-lova/mun.py` (i repots rot). Kör den igen när inläsningen eller ljudet är klart.

## Att tänka på

- Leoparden vänds aldrig och snurrar inte. Hon är vänd mot tittaren hela filmen, också när hon glider in och tassar.
- "Vips!" är bara en ansats: hon kommer knappt iväg innan "Nej." Inget hopp, inget spring.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, så tiderna i `SIDOR` är bara ungefärliga.
- Tassarna (`steg`) ligger på 50, 64 och 78 % av sida 5. När inläsningen finns: lyssna att stegen hamnar på "Tass. Tass. Tass." och flytta `STEG` i `index.html` (och samma tal i `ljud`) om de inte gör det.
- Rad två på sida 1 är lång ("Leoparden springer en sista gång."). Den får plats men nästan kant i kant.
- Gräskullen täcker nedre delen av bilden på sida 6–8, så inget viktigt hamnar under 75 % av höjden.

## YouTube

- **Titel:** Godnatt, Lova 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns blir sidan inläsningen + 4 s och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/leoparden-lova/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/leoparden-lova --staende` → `leoparden-lova-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 4 15 40 45 56` → `stills-staende/sheet.jpg`.
