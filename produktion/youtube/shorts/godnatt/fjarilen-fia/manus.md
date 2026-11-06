# Godnattsagan: Fjärilen Fia

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen. Mallen är [Lejonet Lage](../lejonet-lage/manus.md).

- **Figur:** Fjärilen Fia (✅ referensark, bilderna i `assets/karaktarer/fjarilen-fia/cut/`: kroppen och vingparen var för sig)
- **Plats:** [Nattkullen](../../../../../bakgrunder/nattkullen.md): `assets/bakgrunder/nattkullen/nattkullen.png`, med månen, stjärnan och molnet som urklipp i `assets/bakgrunder/nattkullen-saker/`
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 80 s

Fia flyger hem en kväll, säger godnatt, viker ihop vingarna och landar på ett grässtrå. Det är hela sagan.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Fjärilen", inte "Fia".

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll.<br>Fjärilen flyger hem. | Fjärilen flyger sakta in från vänster, under texten, och stannar och svävar över grässtrået. Vingarna fladdrar lätt. Hon vänds aldrig, alltid framifrån | `fladder`, lågt |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, fjärilens ansikte nederst. Månen lyser upp och vaknar, fjärilens mun rör sig med repliken | `glimt`, sedan Fias `pling` |
| 3 | Godnatt, stjärnor. | Delad bild: kameran glider till stjärnorna, de tindrar och vaknar en i taget | `ding`, ett per stjärna, sedan `pling` |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det åt höger. Sedan helbild igen | `swoosh`, lågt, sedan `pling` |
| 5 | Fjärilen viker ihop<br>sina vingar. Sakta, sakta. | **Sidans enda rörelse:** vingarna viks sakta ihop mot kroppen och fladdret stannar | – |
| 6 | Fjärilen landar<br>på ett mjukt grässtrå. | Hon sjunker ner de sista centimetrarna och landar på stråets topp, strået ger efter lite | `pling` när hon landar |
| 7 | Fjärilen blundar.<br>Kan du också blunda? | Fjärilen, månen, stjärnorna och molnet sluter ögonen | – |
| 8 | Godnatt, fjäril! | Fjärilen andas djupt, bilden mörknar till svart | musiken tonas ut |

Hela tiden, lugnt: fjärilen andas och svävar med ett litet gupp tills hon landat, månen gungar lite, tända stjärnor andas, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena ritas i kod: Fias stora ögon (vit rund med tjock svart ring och stor pupill, som på referensarket) på (444, 410) och (579, 407) och munnen på (512, 486) i 1024-rutan. Närbilden på Fias ansikte är zoom 2,4 med ögonen precis under skarven. Munnen på sida 2–4 följer `mun.json`.

Godnatt-ljudet är Fias eget lätta pling (`assets/ljud/effekter/pling`, tagning 1–3 efter replikerna, 4 vid landningen), i stället för Lages "bo bo". Ett pling är inget tal, så munnen rör sig inte med det.

Sidan står inläsningen + 4 s, minst 8 s.

## Ihopvikta vingar (tillfälligt i kod)

Vingarna är egna bilder (`cut/fia-wing-l.png`, `cut/fia-wing-r.png`) och viks i kod: de trycks ihop på bredden (scaleX till 0,14) runt riggens vridpunkter i `fia-rigg.json`, mot kroppen. Det blir två smala vingkanter på var sida om kroppen. Grässtrået ritas också i kod (grönt, böjt, vit klistermärkskant).

När den riktiga posen finns (prompten i [`karaktarer/fjarilen-fia.md`](../../../../../karaktarer/fjarilen-fia.md#pose-hopvikta-vingar-godnattsagan)): lägg den i `assets/karaktarer/fjarilen-fia/vilar/`, mät kroppens underkant och ögonen, och tona över från den flygande bilden till den vilande på sida 5, som Lages liggande pose på sida 6.

## Att tänka på

- Fjärilen vänds aldrig och snurrar inte, inga hopp. Hon flyger in rakt framifrån och svävar lugnt.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-8.m4a` i den här mappen. Sidans tid blir inläsningen plus 4 s, så tiderna i tabellen är bara ungefärliga.
- Gräskullen täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden. Fias kropp vilar på y 1470, strået går ner genom zonen.
- Sida 5 har flest ord. Den får stå längst.

## YouTube

- **Titel:** Godnatt, Fia 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (kopia av Lages, 2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i tabellen i filen; när filen finns blir sidan inläsningen + 4 s, och allt räknas om av sig självt.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/fjarilen-fia/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/fjarilen-fia --staende` → `fjarilen-fia-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 6 14 44 54 64` → `stills-staende/sheet.jpg`.
- `mun.json` är tom tills inläsningen finns. Räkna fram den ur `sida-2.m4a` … `sida-4.m4a` (ljudstyrkan, 30 värden per sekund, 0–1), körd i den här mappen:

```bash
python3 -c "
import json,subprocess,array
d={}
for n in (2,3,4):
  a=array.array('h',subprocess.run(['ffmpeg','-v','error','-i',f'sida-{n}.m4a','-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout)
  r=[(sum(x*x for x in a[i:i+533])/533)**.5 for i in range(0,len(a),533)]
  t=sorted(r)[int(len(r)*.95)] or 1
  d[str(n)]=[round(min(1,v/t),2) for v in r]
json.dump(d,open('mun.json','w'))"
```
