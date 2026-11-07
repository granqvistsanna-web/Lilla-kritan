# Shorts – egna regler

Shorts som klipps ur avsnitten följer [`produktion/youtube/shorts-plan.md`](../produktion/youtube/shorts-plan.md). Den här filen gäller Shorts som görs från början, utan avsnitt. Det finns två serier: **Gissa teckningen** (skill: `gissa-teckningen`) och **Godnattsagan** (längre ner).

## Gissa teckningen

Kritan ritar en sak streck för streck. Berättaren frågar *"Vad kan det vara?"*, det blir tyst i 4 s och sedan kommer svaret och namnet en gång till. Sist **blir teckningen levande**: den låter som den riktiga saken och gör en enkel sak som passar den. Kon säger "Muu" och går ut ur bild, bilen kör iväg, bollen studsar bort. Sedan är papperet tomt och Shorten går runt.

| | Gissa teckningen | Avsnitten (`regler.md`) |
|---|---|---|
| Längd | ca 23–31 s | 3–4 min |
| Saker per film | **1** | – |
| Intro och outro | ett kort intro (kritan poppar fram, *"Gissa teckningen!"*) och *"Hej då!"* medan saken försvinner, fem varianter av varje | fasta |
| Platser | 1: papperet | max 2 |
| Figurer | inga, bara teckningen och kritan | max 3 |
| Slut | teckningen blir levande och lämnar bilden | kritirisen och outrot |
| Musik | samma instrumentala slinga i alla (`assets/ljud/musik/gissa-bad.m4a`), lågt och jämnt under rösten | en sång per avsnitt |
| Röst | berättaren (ElevenLabs), bara korta repliker | sång och berättare |
| Bild | 9:16, 1080×1920, inget viktigt under 75 % av höjden | 16:9 |

Det här bryter mot `regler.md` och är medvetet: ingen berättelse, ingen sång, bara ett kort intro utan text och ingen vardagshandling. Allt annat gäller fortfarande, särskilt pedagogiken.

Teckningarna ritas i kod med krita och vit kant (`verktyg/kant.js`, andel 0,025). Som dekorationerna i `regler.md` räknas de inte som nya saker i `rekvisita/`. Men läggs en sak sedan till i ett avsnitt, blir den rekvisita som vanligt.

## Pedagogik (Montessori)

1. **En sak i taget.** En teckning per Short. Ingenting i bakgrunden, och under pausen rör sig bara kritan, lugnt.
2. **Verklighetsnära.** Riktiga färger (en svartvit ko, inte en rosa) och riktiga ljud (en inspelad ko, inte ett tecknat "boing" över lätet). Teckningarna har inga ansikten med mun: de är saker, inte figurer.
3. **Det riktiga ordet.** "Ko", inte "kossa". "Rutschkana", inte "rutschis". Med artikel: *"En ko!"*
4. **Namnet två gånger.** Svaret (*"En ko!"*) och sedan lugnt *"Det är en ko."* Det är första steget i en namngivningslektion (det här är …).
5. **Gissningen är en inbjudan, inte ett prov.** Svaret kommer alltid, och ingen gissning är fel. Pausen är 4 s (regel 4 i `regler.md`).
6. **Ordningen gör gissningen.** Rita först det som kan vara många saker (en låda på ben), sedan ledtrådar (fläckarna) och det som avgör sist (huvudet med hornen), medan frågan ställs.
7. **Lugnt tempo.** En krita, inga blinkningar, inga snabba klipp, ingen text i bild.

Andra steget i namngivningen (*"Var är kon?"*) kräver flera saker att välja bland. Det passar i ett samlingsavsnitt per tema: alla teckningarna efter varandra, och sist tre bredvid varandra med frågan, en paus, och sedan hoppar rätt sak.

## Tidsmall (ca 23–31 s)

Tiderna räknas ut av motorn från replikernas riktiga längder: nästa replik börjar 0,5 s efter att den förra slutat.

| Del | Tid | Ljud |
|---|---|---|
| Intro: kritan poppar fram, *"Gissa teckningen!"* (fem varianter) | ca 2,4 s | `pop`, berättaren |
| Kritan ritar ledtrådarna, *"Hmm…"* en tredjedel in (fem varianter) | ca 5 s | `skrrrrt-lang`, berättaren |
| *"Vad kan det vara?"* (fem varianter) medan det som avgör ritas | ca 2,5 s | berättaren |
| Paus, barnet gissar | 4 s | musiken ligger kvar, lågt |
| *"En ko!"*, teckningen poppar och får vit kant | ca 1,5 s | `pop`, `pling`, berättaren |
| *"Det är en ko."*, saken står still, kritan lyfter ut | ca 1,8 s | berättaren |
| *"Kon säger muu."* (djuren säger, sakerna gör: *"Bollen studsar."*), saken står still | ca 2 s | berättaren |
| Lätet och ett litet hopp | ca 0,5 s | riktigt läte |
| Den blir levande och lämnar bilden, *"Hej då!"* (fem varianter), papperet blir tomt (går runt) | ca 3,5 s | rörelsens ljud, berättaren, musiken tonas ut |

Namnet sägs medan saken står still, och den blir levande först efteråt. Barnet ska se saken när det hör ordet.

## Levande

En enda rörelse, som den riktiga saken gör. Samma regel som i avsnitten: urklippen **vänds aldrig och snurrar inte**. De rör sig bara åt det håll de redan tittar (rita saken vänd åt höger), med lugna steg och hopp. Saker som inte kan lämna bilden (gungan, sandlådan) gör sin rörelse på plats och tonar sedan bort.

## Teman

| Bondgården | Blir levande |
|---|---|
| ko | säger "Muu" och går lugnt ut åt höger |
| gris | säger "Nöff" och lunkar ut med små hopp |
| får | säger "Bä" och skuttar ut |
| häst | gnäggar och travar ut |
| höna | kacklar, pickar två gånger och tultar ut |
| anka | säger "Kvack" och vaggar ut |
| katt | säger "Mjau" och smyger ut |
| hund | säger "Vov" och springer glatt ut |
| traktor | kör fram och stannar, tuffar och kör ut åt höger |

| Fordon | Blir levande |
|---|---|
| bil | tutar och kör en runda: fram och bromsar, backar, runt och in från vänster, över ett gupp, tutar hej då och kör iväg |
| buss | stannar, dörren öppnas och stängs, kör ut åt höger |
| brandbil | blinkar och tjuter, kör ut åt höger |
| tåg | tjoffar och tuffar ut åt höger, vagnarna efter |
| båt | guppar på vågor och glider ut åt höger |
| flygplan | lyfter snett uppåt och flyger ut åt höger |
| cykel | plingar och rullar ut åt höger |

| Lekplatsen | Blir levande |
|---|---|
| gunga | gungar fram och tillbaka (knarr), tonar sedan bort |
| rutschkana | kritan åker ner för den, "wiii" |
| sandlåda | lite sand yr upp och lägger sig, tonar sedan bort |
| spade | gräver två tag och hoppar ut |
| hink | hoppar, tippar och häller ut sanden i en liten hög, reser sig och hoppar ut |
| boll | studsar på stället, ut åt höger, in från vänster och sist iväg i ett stort skutt; den rullar medan den studsar |
| gungbräda | vickar upp och ner, tonar sedan bort |

## Godnattsagan

Telefonen blir en bilderbok. Varje **sida** är en stillbild med en kort rad text. **En inläst röst berättar** (en tagning per sida), och texten står kvar i bild så att en förälder kan läsa med eller läsa själv med ljudet av. En liten sak rör sig långsamt och en mjuk instrumental slinga ligger under. Sist släcks ljuset och bilden tonas till svart.

| | Godnattsagan |
|---|---|
| Bild | 9:16, 1080×1920, nattpapper (mörkblått med kritstjärnor), samma urklippsstil |
| Längd | 6–8 sidor, ca 90 s (Lage). Sömnsagan: 10 sidor, ca 2 min |
| Figurer | 1, högst 2, bara befintliga |
| Platser | 1, **en egen per saga** (nattversion i 9:16 av en befintlig plats), så att filmerna inte ser likadana ut. Månen finns med i alla |
| Rörelse per sida | en huvudrörelse per sida, långsam: en stjärna tindrar, månen lyser upp. Bakom den får allt röra sig mycket lugnt (andas, gunga, blinka). När figuren går: små lugna hopp (*tripp, tripp*), aldrig snurr |
| Ljud | mjuka, låga effekter på sidans händelse (ett glimt, ett pling per stjärna, ett svisch, ett prassel i gräset). Efter varje *"Godnatt, …"* säger figuren själv godnatt med ett eget litet ljud (lejonet: `bobo`, Kvacks nalle-*"bo bo"*). Figurens eget djurläte går bra, mjukt och sparsamt: högst tre per saga, strax efter berättaren, vol ca 0.3 (lammet: tre bää ur `effekter/ba`). Munnen öppnas och ögonen ler (^) medan det låter |
| Sidbyte | **en bild per sida, som uppslag i en bilderbok** (`SKOTT`): helbild, närbild på figuren, närbild på det man säger godnatt till, tvåbild med nallen. Mellan sidorna en kort dipp till natthimlen (0,35 s åt varje håll). Inga kritsvep. Ingen långsam zoom: bilden står still. Kameran rör sig bara när figuren går (följer den, ingen dipp mellan gå-sidorna) och när vägen upprepas |
| Godnatt-sidorna | närbild på det man säger godnatt till (månen, molnet, stjärnan), eller figurens ansikte nära med månen ovanför och munnen efter inläsningen (`mun.json`). Den delade bilden från Lage används inte längre. Den som får godnatt vaknar (ansikte i kod: ögon, leende, blinkar) och ler med ^-ögon efter sitt godnatt |
| Ansikten | ritas i kod på allt som säger eller får godnatt. Alla blundar på sidan *"blundar"*. Figurens ögon i husets stil (vit ring, pupill med glans): **blicken** går dit berättelsen pekar (upp mot månen, på flaskan, på prickarna som räknas, på den som blundar), **^-ögon** när det är mysigt (fniss, *"Mmm"*, nallen kommer), **ögonlock** i kroppens färg som sänks när figuren blir trött, slutna bågar när den sover. Månen, molnet och stjärnan har rosa kinder. Månen lyser fullt hela tiden, med ett varmt sken |
| Vita kanter | alla klippta saker (figur, nalle, kudde, flaska, måne, stjärnor, molnen) får kanten enligt skill `vita-kanter` (`kant.js`, `kant.uppdatera()` sist i varje bildruta). Bara platsbilden i bakgrunden får ingen. Lösa kritsmulor runt en bild: `kant.lagg(bild, { rensa: 4 })` |
| Poser | stående figur, och en **liggande, sovande pose** utan ansikte för *"kryper ner"* (bildprompten står i figurens fil) |
| Text | 1–2 korta meningar per sida, stor, i övre halvan (inget under 75 % av höjden), med en mjuk mörk kontur så att den syns i närbilderna. Små stjärnor och moln som hamnar bakom texten tonas bort |
| Tid per sida | inläsningens längd plus ca 4 s, minst 8 s |
| Röst | ElevenLabs, Malin – Professional Swedish Narration, Eleven v3, stabilitet ca 0,6, style 0. **Hela sagan i en tagning** (ett paste-block utan sidnummer, siffror läses upp), delas sen i `sida-N.m4a` med `verktyg/dela-tagning.py`. Taggar `[softly]`, `[slowly]`, `[quietly]`, `[gently]`, `[yawns]`, `[exhales]`. Aldrig `[whispers]` (låter illa) |
| Musik | samma instrumentala vaggvisa i alla (`assets/ljud/musik/godnatt-bad-loop.m4a`: Suno-tagningen `godnatt-bad.m4a` med 3 s överton från slutet in i början, 17,5 s, går runt), lågt och jämnt (vol 0.25, rösten ligger tydligt över), tonas ut på sista sidan |
| Slut | ljuset släcks, figuren sover, bilden tonas till svart. Inget outro, inget "Hej då!" |

Det här bryter mot `regler.md` och Gissa teckningen och är medvetet: inget intro eller outro, ingen sång, en annan röst än berättaren, ingen fråga med paus (bara ett mjukt *"Kan du också blunda?"*), ingen vardagshandling och text i bild. Texten är till för föräldern, inte barnet: samma ord som inläsningen, ordagrant. Det riktiga ordet, upprepningen och en sak i taget gäller fortfarande.

### Berättelsen

En godnattrunda som blir lite tystare för varje sida. Inget problem att lösa, inget som händer plötsligt.

1. Var och när: *"Det är kväll vid dammen."*
2–4. Samma mening tre gånger: *"Agda säger godnatt till grodan. Godnatt, Gurra."* (grodan, månen, stjärnorna)
5. En gäspning att göra med: *"Agda gäspar. Gääsp."*
6. Hon lägger sig: *"Agda kryper ner i sitt bo."*
7. *"Agda blundar. Kan du också blunda?"*
8. *"Godnatt."* Bilden blir mörk.

**Sömnsagan (från och med sagorna efter Lage).** Samma runda, men med lugna grepp som hjälper barnet att varva ner: rösten pratar direkt till barnet (*"Är du också sömnig?"*), barnet bjuds in att gäspa med, kroppen blir tung (*"Benen blir tunga. Så tunga."*), andningen görs tillsammans (*"… andas in … och ut. In … och ut. Kan du också?"*) och slutet säger godnatt till barnet också (*"Godnatt, zebra. Godnatt, du."*). Orden *sömnig*, *tung* och *mjuk* upprepas. Inläsningen blir lite långsammare och tystare för varje sida (Eleven v3 med taggarna `[softly]`, `[slowly]`, `[quietly]`, `[yawns]`, `[exhales]`; med Multilingual v2 i stället hastighet ca 0,9 på sida 1 ner till ca 0,75 på sida 10), och sida 9–10 får stå längre (inläsningen + 5 s).

Stommen nedan gäller de första sagorna. Från och med kon, ankan och grodan (2026-11-07) är varje saga en egen sort, se `produktion/youtube/shorts/godnatt/inlasning.md`, och vällingen i flaskan ersätter mjölken. Stommen var densamma i de första sagorna, och det är den som blir godnattrutinen. Platsen och godnatt-målen är figurens egna:

1. Var, när och sömnig: *"Det är kväll vid dammen. Zebran är sömnig. Är du också sömnig?"*
2. *"Godnatt, måne."* (i alla sagor, en gemensam inläsning)
3–4. Godnatt till platsens två saker: *"Godnatt, näckros."* / *"Godnatt, vass."* Saken vaknar och gör sin enda lugna rörelse.
5. Figurens egen grej och en gäspning: *"… Zebran gäspar. Gääsp. Kan du också gäspa?"*
6. *"Zebran lägger sig vid dammen. Benen blir tunga. Så tunga."*
7. Den mjuka sidan: *"Vattnet är stilla. Gräset är mjukt. Allt är så mjukt."*
8. *"Zebran andas in … och ut. In … och ut. Kan du också?"* Två andetag, ca 5 s vardera, och andningen syns tydligt.
9. Alla som fått godnatt blundar, en i taget: *"Månen blundar. Näckrosen blundar. Vassen blundar."*
10. *"Zebran blundar. Nu sover zebran. Godnatt, zebra. Godnatt, du."* Bilden blir mörk.

| Saga | Plats | Godnatt till |
|---|---|---|
| Zebran Zebbe | Dammen | måne, näckros, vass |
| Lammet Ludde | Bondgården | måne, lada, hö |
| Fjärilen Fia | Ängen | måne, blommor, moln |
| Leoparden Lova | Skogen | måne, träd, lövhög |
| Kaninen Kanel | Äppelträdet | måne, äppelträd, äpplen |
| Kon Kajsa | Äppelbacken | måne, nallen (kon nattar nallen) |
| Nyckelpigan Nicke | Himlen (bland molnen) | måne, moln, stjärna |
| Ankan Agda | Bryggan | måne (vaggsaga på vattnet) |
| Grodan Gurra | Sjön | måne, vågor, vind, båt (lyssnasaga) |
| Lammet Ludde (färden) | Badplatsen | måne, vatten, träd (en liten färd hem) |

Filmerna ligger i `produktion/youtube/shorts/godnatt/<figur>/`. **Mallarna** (2026-11-07) är `lammet-ludde-fard/` (en bred plats där kameran följer figuren) och `nyckelpigan-nicke/` (en fast natthimmel). Lejonet Lage är den första och har den äldre delade bilden.

### Arbetsgång

1. **Sagan.** Välj en ny sort (se tabellen i `inlasning.md`, ingen saga får vara som den förra), en figur med referensark och en egen plats. Skriv sidorna i `inlasning.md` som ett paste-block och en `sidor.txt` (`sida-N  [tagg] Text`, en rad per sida). Välling i flaska, inte mjölk.
2. **Inläsningen.** Sanna läser in hela sagan i ElevenLabs. Dela: `python3 verktyg/dela-tagning.py <tagning> <mapp>/sidor.txt <mapp>` och lyssna på det som skrivs ut. Hör man ett annat ord än manuset, ändra texten i bild till det som sägs (som mjölken på nyckelpigans sida 2) eller spela in sidan igen.
3. **Scenen.** Kopiera mallens `index.html`. Byt `SIDOR` (texten ordagrant som inläsningen), figuren (bild, `konst` = fötterna, ögon- och munpunkter i 1024-rutan), platsen, godnatt-målen och `SKOTT` (en bild per sida). Tider som ska följa orden (räkna, andas, blunda) tas med whisper ur `sida-N.m4a` och läggs i `ORD`. Behövs en ny sak (som vällingflaskan), gör den tillsammans med Sanna (`rekvisita/`).
4. **Stillbilder.** `node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende 5 13 22 …` (en tid mitt i varje sida) ger bara stillbilder och `stills-staende/sheet.jpg`, **ingen film**. Kontrollera: inget viktigt under y 1440, inget bakom texten, figuren inte avskuren, ansiktena läsbara.
5. **Filmen.** Samma kommando utan tider ger `<mapp>-staende.mp4`.
6. **QA.** Inga konsolfel eller saknade filer i webbläsaren, alla ljud finns, något rör sig hela tiden. `ffprobe`: 1080×1920, 30 fps, ljud, rätt längd. Ett kontaktark med en bild var 4:e sekund, granskat för avskurna figurer, fel lager, trasig text och oläsliga ansikten. Lyssna på ljudnivån (rösten tydligt över musiken, bää och effekter mjuka).
7. **YouTube.** Titel och beskrivning i `produktion/youtube/shorts-text.md` (djuren heter *lammet*, *nyckelpigan*, aldrig *lugn*), undertexter som `.srt` i `shorts/undertexter/`, kopian i `Downloads/Lilla Kritan Shorts/` som `Godnatt NN – …`.

### Text i bild

- Kritstil, stor och lätt att läsa i halvmörker: ljus text på det mörka papperet, aldrig rent vitt.
- Hela sidans text syns direkt. Den skrivs inte fram ord för ord.
- Korta rader, högst 6–7 ord per rad.

### YouTube-texten

Kalla inte musiken lugn i beskrivningen. Skriv till exempel *"en godnattsaga att läsa tillsammans"*.
