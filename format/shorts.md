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
| Längd | 6–8 sidor, ca 90 s – 2 min |
| Figurer | 1, högst 2, bara befintliga |
| Platser | 1 |
| Rörelse per sida | en huvudrörelse per sida, långsam: en stjärna tindrar, månen lyser upp. Bakom den får allt röra sig mycket lugnt (andas, gunga, blinka). Inga hopp |
| Ljud | mjuka, låga effekter på sidans händelse (ett glimt, ett pling per stjärna, ett svisch, ett prassel i gräset). Efter varje *"Godnatt, …"* säger figuren själv godnatt med ett eget litet ljud (lejonet: `bobo`, Kvacks nalle-*"bo bo"*). Inga djurläten som låter som ett bää |
| Sidbyte | långsam övertoning. Inga kritsvep. Mjuka kamerarörelser in och ut går bra |
| Godnatt-sidorna | **delad bild:** närbild på det man säger godnatt till överst (månen, stjärnorna, molnet), figurens ansikte nederst med munnen i fokus. Munnen öppnas efter inläsningen (`mun.json`) och efter godnatt-ljudet, tungan syns. Den som får godnatt vaknar (ansikte i kod: ögon, leende, blinkar) |
| Ansikten | ritas i kod på allt som säger eller får godnatt. Alla blundar på sidan *"blundar"* |
| Poser | stående figur, och en **liggande, sovande pose** utan ansikte för *"kryper ner"* (bildprompten står i figurens fil) |
| Text | 1–2 korta meningar per sida, stor, i övre halvan (inget under 75 % av höjden) |
| Tid per sida | inläsningens längd plus ca 4 s, minst 8 s |
| Röst | en inläsning per sida (`sida-N.m4a`), långsam och nära. Lejonet Lage: ElevenLabs, Malin |
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

Filmerna ligger i `produktion/youtube/shorts/godnatt/<figur>/`. Den första är Lejonet Lage, och dess mapp är **mallen**: kopiera `index.html` och `manus.md`, byt figur, plats, sidor (`SIDOR`), godnatt-målen (`NARA`) och ansiktspunkterna (`LAGE`), lägg in `sida-N.m4a`, räkna om `mun.json` och rendera med `node avsnitt/004-bussen-badar/scener/render.mjs <mapp> --staende`.

### Text i bild

- Kritstil, stor och lätt att läsa i halvmörker: ljus text på det mörka papperet, aldrig rent vitt.
- Hela sidans text syns direkt. Den skrivs inte fram ord för ord.
- Korta rader, högst 6–7 ord per rad.

### YouTube-texten

Kalla inte musiken lugn i beskrivningen. Skriv till exempel *"en godnattsaga att läsa tillsammans"*.
