# Godnattsagan: Kaninen Kanel

Format: [`format/shorts.md`](../../../../../format/shorts.md#godnattsagan). Mallen är [Lejonet Lage](../lejonet-lage/manus.md). Sanna läser in texten. Texten står också i bild, ordagrant som inläsningen.

- **Figur:** Kaninen Kanel (✅ referensark). Stående: den bruna versionen utan ansikte, `assets/karaktarer/kaninen-kanel/cut/kanel-faceless.png` (inte den rosa i `v2/`, inte de gamla rosa vyerna). Liggande: `assets/karaktarer/kaninen-kanel/ligger/kaninen-kanel-ligger.png`.
- **Plats:** [Äppelträdet](../../../../../bakgrunder/appeltradet.md), på natten. **Tillfälligt:** dagbilden `assets/bakgrunder/appeltradet/appeltradet.png` (16:9) görs mörk och blå i kod. En 9:16-nattbild görs i Google Flow.
- **Godnatt-målen:** månen (`assets/bakgrunder/nattkullen-saker/mane.png`), äppelträdet (kronan) och äpplena i trädet. Ansiktena ritas i kod.
- **Musik:** `assets/ljud/musik/godnatt-bad-loop.m4a` (17,5 s, går runt hela filmen, lågt: vol 0.25, tonas ut på sista sidan)
- **Längd:** ca 2 min

Kanel vill hoppa, som hon alltid gör, men hon är för sömnig. Det blir bara ett jättelitet hopp, och sedan en gäspning. Sagan blir tystare för varje sida: barnet får gäspa med, andas med och blunda med, och berättaren pratar direkt till barnet.

## Sidorna

Texten är det Malin säger i inläsningen (ElevenLabs, rösten "Malin – Professional Swedish Narration"), ordagrant. Hon säger "Kaninen", inte "Kanel". Sida 1 står på två rader i bild ("Det är kväll / under äppelträdet.") men läses som en mening.

| # | Text | Det som rör sig | Ljud |
|---|---|---|---|
| 1 | Det är kväll under äppelträdet.<br>Kaninen är sömnig.<br>Är du också sömnig? | Kaninen andas | – |
| 2 | Godnatt, måne. | **Delad bild:** närbild på månen överst, kaninens ansikte nederst. Månen lyser upp och vaknar, kaninens mun rör sig med repliken. Sedan säger hon själv godnatt med en liten studs | `glimt`, sedan `duns` |
| 3 | Godnatt, äppelträd. | Delad bild: kameran glider till trädet. Trädet vaknar (ansikte på kronan) och kronan gungar sakta. Kaninen studsar lite | `swoosh`, lågt, sedan `duns` |
| 4 | Godnatt, äpplen. | Delad bild: kameran glider till äpplena. Äpplena gungar i sina skaft, och tre av dem vaknar ett i taget. Kaninen studsar lite. Sedan helbild igen | `ding`, ett per äpple, sedan `duns` |
| 5 | Ett, två, tre … hopp!<br>Det blev ett jättelitet hopp.<br>Kaninen gäspar. Gääsp.<br>Kan du också gäspa? | **Inget riktigt hopp:** en jätteliten studs på stället på "hopp!", fötterna står kvar. Sedan gäspningen: munnen blir ett stort O och ögonen kniper ihop | `duns`, mjukt, på studsen |
| 6 | Kaninen kryper ner<br>i det mjuka gräset.<br>Öronen blir tunga. Så tunga. | Den stående bilden tonas över i den liggande, och hon sjunker några pixlar till på "tunga" | lövprassel (`produktion/sfx/new/leaves-3.mp3`) |
| 7 | Gräset är mjukt.<br>Natten är mjuk.<br>Allt är så mjukt. | Den mjuka sidan: ett milt sken runt månen sväller sakta upp och lägger sig igen. Inget annat händer | – |
| 8 | Kaninen andas in … och ut.<br>In … och ut.<br>Kan du också? | Kaninen andas synligt djupt, ca 5 s per andetag, två varv. Det är sidans enda rörelse | – |
| 9 | Månen blundar.<br>Trädet blundar.<br>Äpplena blundar. | Månen, trädet och äpplena sluter ögonen, en i taget, i den ordning de nämns | – |
| 10 | Kaninen blundar.<br>Nu sover kaninen.<br>Godnatt, kanin.<br>Godnatt, du. | Kaninen sluter ögonen, sedan mörknar bilden till svart | musiken tonas ut |

Hela tiden, lugnt: kaninen andas, månen gungar lite, kronan och äpplena gungar svagt när de vaknat, och alla som är vakna blinkar var 5,5 s. Kaninens ögon och mun i 1024-rutan: stående (412, 396), (605, 401) och (510, 458), fötterna på (521, 925); liggande (420, 598), (604, 598) och (512, 670), fötterna på (512, 862).

Kanels godnatt-ljud är ett mjukt `duns` (hennes hoppljud, `assets/ljud/effekter/duns/`) i stället för lejonets `bobo`. Ljudet är inte en röst, så munnen är stängd under det. Hon studsar till på stället i stället.

## Inläsningen

Malin läser varje sida lite långsammare och mjukare än den förra: ElevenLabs-hastighet ca 0,9 på sida 1, ner till ca 0,75 på sida 10. På sida 8 gör hon riktiga andetag i pauserna ("in …" och "ut"). Sida 9 och 10 står inläsningen + 5 s, de andra + 4 s. Filerna heter `sida-1.m4a` … `sida-10.m4a`.

## Nattbilden (saknas)

Tills nattbilden finns ligger dagbilden under en mörkblå färgmatris (`natt` i `index.html`), utsträckt med väggens och golvets färg utanför bilden. Kronan och äpplena är klippta ur bilden som egna lager så att de kan gunga. När nattbilden (9:16) finns: byt `PLATTA.fil`, sätt `k` = 1080 / bildens bredd, `x0` och `y0` = 0, `natt: false`, och mät kronan, äpplena, horisonten och trädets ansikte i den (i bildens egna pixlar). Kolla närbilderna i `NARA` med stillbilder.

## Att tänka på

- Kaninen vänds aldrig och snurrar inte. Hon står still, vänd mot tittaren, hela filmen.
- Inga hopp (formatet): studsen på sida 5 är en liten fjädring på stället, fötterna lämnar aldrig marken. Sagans poäng är att hoppet blir så litet.
- "Ett, två, tre … hopp!" läses in sömnigt, inte uppspelt. Gäspningen mjuk och lång, så att barnet gäspar med.
- Tiderna på sidan, som del av sidan (0 → 1) i `index.html`, flyttas till orden när inläsningen finns: studsen `HOPP` (12 %, "hopp!"), gäspningen `GASP` (45–85 %, "Gääsp"), sjunket `TUNGA` (75 %, "tunga") och blundandet `SOMNAR` (5, 38 och 71 %, "Månen", "Trädet", "Äpplena"). Andningen på sida 8 går 5 s per andetag från 1 s in på sidan; ändra perioden (`/ 5`) om Malins andetag är längre.
- Gräset täcker nedre delen av bilden, så inget viktigt hamnar under 75 % av höjden.
- Nämn inga befintliga böcker eller serier i filerna eller i YouTube-texten.

## YouTube

- **Titel:** Godnatt, Kanel 🌙 Godnattsaga att läsa tillsammans | Lilla Kritan
- Kalla inte musiken lugn i beskrivningen.

## Kodscenen

`index.html` i den här mappen, kopierad från Lages (2026-11-06). Sidornas text står överst i filen (`SIDOR`) och måste vara samma ord som inläsningen. Sidor utan `sida-N.m4a` får tiden i `SIDOR` och läses av talsyntesen i förhandsvisningen; när filen finns blir sidan inläsningen + 4 s (1 s in, 3 s efter; sida 9–10 + 5 s), och allt räknas om av sig självt.

- Munnen: `mun.json` räknas fram ur `sida-N.m4a` med `python3 produktion/youtube/shorts/godnatt/kaninen-kanel/mun.py produktion/youtube/shorts/godnatt/kaninen-kanel` (ljudstyrkan, 30 värden per sekund, behöver ffmpeg). Kör om den när sidorna läses in på nytt. Den är tom (`{}`) tills inläsningen finns.
- Förhandsvisning: `python3 -m http.server 8765` i repots rot, öppna `http://127.0.0.1:8765/produktion/youtube/shorts/godnatt/kaninen-kanel/`.
- Rendering: `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/godnatt/kaninen-kanel --staende` → `kaninen-kanel-staende.mp4` här.
- Stillbilder: samma kommando med tider efter, t.ex. `… --staende 5 24 33.5 45.6 70 108` → `stills-staende/sheet.jpg`.
