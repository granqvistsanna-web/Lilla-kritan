# Godnattsagan: Fjärilen Fia

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen. Mallen är [Lejonet Lage](../lejonet-lage/manus.md), men Fia har en egen plats och egna godnatt-mål så att filmerna skiljer sig åt.

- **Figur:** Fjärilen Fia (✅ referensark). Flygande: `assets/karaktarer/fjarilen-fia/cut/` (kroppen och vingparen var för sig). Vilande: `assets/karaktarer/fjarilen-fia/vilar/fia-vilar.png`
- **Plats:** [Ängen på natten](../../../../../bakgrunder/angen-natt.md): `assets/bakgrunder/angen-natt/angen-natt.png` (9:16, Google Flow 2026-11-06), med månen och molnet som urklipp ur `assets/bakgrunder/nattkullen-saker/`
- **Godnatt-mål:** månen (`assets/bakgrunder/nattkullen-saker/mane.png`), blommorna (prästkragarna och vallmon i tuvan nere till vänster) och molnet (`nattkullen-saker/moln.png`)
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min

Fia är sömnig en kväll på ängen. Hon säger godnatt, viker ihop vingarna, gäspar, landar på ett grässtrå, gungar, andas och somnar. Barnet får gäspa, andas och blunda med henne. Sagan pratar direkt till barnet och blir långsammare sida för sida.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Fjärilen", inte "Fia". **Varje sida läses lite långsammare och mjukare än den förra:** hastighet ca 0,9 på sida 1, ner till ca 0,75 på sida 10.

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll på ängen.<br>Fjärilen är sömnig.<br>Är du också sömnig? | Fjärilen flyger sakta in från vänster, under texten, och stannar och svävar över ett grässtrå. Vingarna fladdrar lätt. Hon vänds aldrig, alltid framifrån | `fladder`, lågt |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, fjärilens ansikte nederst. Månen lyser upp och vaknar, fjärilens mun rör sig med repliken | `glimt`, sedan Fias `pling` |
| 3 | Godnatt, blommor. | Delad bild: kameran glider ner till vänstra blomtuvan (zoom 2,4). Den största prästkragens mitt lyser upp och får ett ansikte som vaknar, sedan sluter sig blommorna sakta | `glitter`, lågt, sedan `pling` |
| 4 | Godnatt, moln. | Delad bild: kameran glider till molnet och följer det sakta åt höger. Sedan helbild igen | `swoosh`, lågt, sedan `pling` |
| 5 | Fjärilen viker ihop sina vingar.<br>Sakta, sakta.<br>Fjärilen gäspar. Gääsp.<br>Kan du också gäspa? | Först viks vingarna sakta ihop mot kroppen och fladdret stannar, sedan en stor gäspning: munnen blir ett stort O och ögonen kniper ihop | (rösten) |
| 6 | Fjärilen landar på ett grässtrå.<br>Antennerna blir tunga.<br>Så tunga. | Hon sjunker ner på strået, sedan tonas den vilande bilden in (vingarna ihop, eget grässtrå, antennerna hänger) | `pling` när hon landar |
| 7 | Grässtrået gungar.<br>Fram … och tillbaka.<br>Allt är så mjukt. | **Sidans enda rörelse:** strået med fjärilen gungar sakta fram och tillbaka runt stråets fäste, två gånger, och stannar | – |
| 8 | Fjärilen andas in … och ut.<br>In … och ut.<br>Kan du också? | Fjärilen andas synligt djupt, två andetag, ca 5 s vardera. Tajmas mot inläsningen när den finns | – |
| 9 | Månen blundar.<br>Blommorna blundar.<br>Molnet blundar. | Månen, blomman och molnet sluter ögonen, **en i taget, i den ordning de nämns** (en tredjedel av sidan var). Tajmas mot inläsningen | – |
| 10 | Fjärilen blundar.<br>Nu sover fjärilen.<br>Godnatt, fjäril.<br>Godnatt, du. | Fjärilen sluter ögonen och andas lugnt och djupt, bilden mörknar till svart | musiken tonas ut |

Hela tiden, lugnt: fjärilen andas och svävar med ett litet gupp tills hon landat, månen gungar lite, molnet guppar, och alla som är vakna blinkar var 5,5 s. Ansiktena ritas i kod: månen, blomman och molnet får prickögon och ett litet leende. Fias stora ögon (vit rund med tjock svart ring och stor pupill, som på referensarket) sitter på (444, 410) och (579, 407) och munnen på (512, 486) i den flygande bilden, och på (458, 538) och (566, 538), skalade 0,8, och munnen på (512, 598) i den vilande. Närbilden på Fias ansikte är zoom 2,4 med ögonen precis under skarven. Munnen på sida 2–4 följer `mun.json`.

Godnatt-ljudet är Fias eget lätta pling (`assets/ljud/effekter/pling`, tagning 1–3 efter replikerna, 4 vid landningen), i stället för Lages "bo bo". Ett pling är inget tal, så munnen rör sig inte med det.

Sidan står inläsningen + 4 s, sida 9 och 10 inläsningen + 5 s (`EFTER` i `index.html`), minst 8 s. Rader längre än 26 tecken får mindre text (54 i stället för 64) så att de ryms i bredden.

## Bilderna

- **Den vilande posen:** `assets/karaktarer/fjarilen-fia/vilar/fia-vilar.png` (Google Flow, Nano Banana, 0 krediter, 2026-11-06, variant 2). Den vita bakgrunden är bortklippt och en vit klistermärkskant (ca 1 % av höjden) är tillagd, eftersom bilden inte hade någon. Originalen ligger i `vilar/original/`. Kroppens underkant (512, 772), stråets fäste för gungningen (115, 878).
- **Ihopvikta vingar på sida 5:** de flygande vingarna (`cut/fia-wing-l.png`, `cut/fia-wing-r.png`) trycks ihop på bredden (scaleX till 0,14) runt riggens vridpunkter i `fia-rigg.json`. Sedan tar den vilande bilden över på sida 6.
- **Grässtrået på sida 1–6:** ritat i kod (grönt, böjt, vit kant). Det tonas ut när den vilande bilden, som har ett eget strå, tonas in.
- **Blommorna:** tuvan sitter i bakgrundsbilden, så den kan inte röra sig på riktigt. På sida 3 tonas en mjuk skugga över den. Blir blommorna ett eget urklipp kan kronorna tryckas ihop.

## Att tänka på

- Fjärilen vänds aldrig och snurrar inte, inga hopp. Hon flyger in rakt framifrån och svävar lugnt.
- Inläsningen: en fil per sida, `sida-1.m4a` … `sida-10.m4a` i den här mappen. Sidans tid blir inläsningen plus 4–5 s, så tiderna i `SIDOR` är bara ungefärliga.
- Inget viktigt under 75 % av höjden: Fias kropp vilar på y 1470.
- Sida 5, 8 och 10 har flest ord. Sida 9 och 10 får stå längst.

## YouTube

- **Titel:** Godnatt, fjäril 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen (byggd från Lages, 2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR`; när filen finns räknas allt om av sig självt. Bakgrunden är `ANGEN`, blommans plats i världen `BLOMMA`.

- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/fjarilen-fia/`. Sidor utan inläsning läses av talsyntesen.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/fjarilen-fia --staende` → `fjarilen-fia-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 7 15 25 33 47 58 72 86 97 103 112` → `stills-staende/sheet.jpg`.
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
