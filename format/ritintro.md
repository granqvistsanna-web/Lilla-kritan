# Ritintrot – kritan ritar dagens sak

Så görs scenen där kritan ritar dagens sak, likadant i varje färgsång. Receptet bygger på Bruna sången (007), Röda sången (013), Rosa sången (019) och Gula sången (011, 2026-11-10), och samlar det Sanna har godkänt och det hon har avvisat i dem. När avsnitten skiljer sig åt gäller det som står här.

**Mall att kopiera:** `avsnitt/011-gula-helikoptern/scener/kritan-ritar/` (`scen.js` + `index.html`). Lägg till kritans skugga och smulorna från 019 (steg 5).

## Grundidén

Kritan ritar **bara konturen** av dagens sak i ett enda lugnt drag, så att barnet hinner följa linjen och gissa. Sedan väntar kritan. På svaret fylls den riktiga bilden i inifrån och linjen tonas bort. Ingen musik spelas under ritandet, bara skogsljud och berättaren. Sången börjar efter "Nu kör vi!".

## Tidslinjen

Tiderna är scentid: s = 0 när kritsvepet ut ur introt är klart. Skriv dem som avsnittstid i `scen.js` (s + introts längd).

| s | Bild | Ljud |
|---|---|---|
| 0,0–0,4 | Kritan poppar fram vid konturens startpunkt och sänker spetsen mot papperet. Kameran är redan nära. | skogsljud tonas in (1,2 s) |
| 0,2 | | **"Titta!"** (`titta-1…4`) |
| 0,6–8,0 | **Konturen i ett drag, ca 7,4 s.** Spetsen har nästan jämn fart (`jamn`), skakar lite (`skrrt`, 17 Hz, ±1,6°) och lutar 40°. Kameran följer spetsen i närbild (zoom 1,8 med 0,25 s eftersläp). | `krita-ritar`, två tagningar med 0,5 s övertoning |
| ca 4,5 | Mitt i ritandet | **ledtråden om formen:** "Något runt." / "Något långt." … |
| 8,0–8,8 | Kritan lyfter till en väntplats bredvid och vickar lugnt. Kameran glider ut till hela konturen. | |
| 8,8–10,1 | **Gissningspaus**, ungefär 1,5–2 s. Kameran kryper sakta in (+12 %). Kritan gungar lite. | bara skogsljud |
| 10,1 | **Svaret.** Den riktiga bilden fylls i inifrån på 0,7 s med vaxig kant, och linjen tonas bort. Bilden hoppar (40 px) och gungar på sin botten, fyra krit-gnistor poppar fram och kritan flyger ut uppe till höger. Kameran går nära bilden (+20 %). | **"Ett rött äpple!" / "En gul banan!"**, `pling` |
| svar + ca 0,5 | Ett litet skutt (18 px) på färgordet | |
| svar + 3 | **"Nu kör vi!"** / "Nu flyger vi!". Kameran går till helbild. | |
| sedan | **Övergången in i första scenen: zoom in genom ett hål i papperet** som växer fram med vaxig kant. Under hålet syns första platsen. | `swoosh`, sångens första ton |

Hela scenen är ungefär 14–15 s. När konturen görs längre ska svaret och sången flyttas lika mycket, så att sången står kvar i takt. Se `KAP` i `satt-ihop.sh` och `fargsang-v2.md`.

## Bilden

1. **Dagens sak:** samma utklippta bild som på titelkortet (`assets/rekvisita/<sak>/cut/…png`). Den ska vara ungefär 560–640 px hög i helbild, centrerad och lite under mitten.
2. **Konturen:** spåra den ur bildens alfakanal och krymp den 5 px, så att linjen hamnar innanför den vita kanten. Det görs med cv2 (`findContours` på alfat efter `erode`) och ger en `M … L …`-sträng i bildens egna pixlar. Ta med **bara ytterformen** och högst en liten detalj (skaft eller blad). Formen ska gå att gissa. Börja på en naturlig punkt, till exempel skaftet eller toppen.
3. **Linjen:** i en **mörkare ton av avsnittets färg**, med runda ändar, ungefär 3 % av bildens höjd i bredd, och med filtret `#vax` (kopiera det ur mallen).
4. **Fyllningen:** en cirkel i en mask som växer från mitten (`r ∝ ease(k)^1.2`) med förskjuten vaxig kant (`#fyllkant`). Linjens opacitet går till 0 mellan fyllningens start + 0,15 s och slutet + 0,2 s.
5. **Kritan:** `#krita-form` med 12 px vit kant och `#vax`, i avsnittets färg. Bandet har en ljusare ton och ringarna en mörkare. Den har **en mjuk skugga** (`#kritskugga`, feDropShadow 10/16, blur 7, opacitet 0,2) och **smulor** som faller från spetsen. Båda finns i 019, `index.html`, rad 92–97.
6. **Papperet:** krämvitt `#FDFBF4` som **fyller hela bilden**, utan arkkant, ram eller skugga (Sanna 2026-11-10: "no edges of paper"). Det är scen-kitets `papper()`.
7. **Finputs:** boil på teckningen (seed byts 6 gånger/s, skalan delas med zoomen) och en varm soft-light 0,07 ovanpå. Vinjetten är högst 0,14.
8. **Krit-gnistorna:** fyruddiga gula klistermärken med vit kant, fyra stycken runt bilden, som poppar fram en i taget och krymper bort efter ungefär 1,2 s.

## Ljudet

| Vad | Fil | Inställning |
|---|---|---|
| Kritan ritar | `effekter/krita-ritar` (8 tagningar à 4 s) | Två tagningar efter varandra, 0,5 s övertoning, vol 1,6. **Inte** `skrrrrt` (det lät konstigt och "knackade", Sanna 2026-11-10) |
| Under allt | `effekter/skogsljud/skogsljud-1` | vol 0,4, in 1,2 s, ut 2,2 s, från svepet ut ur introt tills sången har börjat. Läggs i `satt-ihop.sh` |
| Svaret | `effekter/pling/pling-1` | vol 1,2 |
| Berättaren (Malin) | `roster/titta-*`, `nagot-<form>-*`, `<sak>-*`, `nu-kor-vi-*` / `nu-flyger-vi-*` | Ledtråden och svaret spelas in nya för varje avsnitt |

## Gör inte

- **Ingen knackning** med kritan och inget `tass`-ljud (Sanna 2026-11-10).
- **Aldrig "Vad kan det vara?"**. Repliken låter stel. Ledtråden om formen ersätter den.
- **Rita inte hela bilden med många kritor** som i 007. Det blev långt och svårt att gissa. Konturen räcker, och den riktiga bilden kommer på svaret.
- **Inget kritsvep ut ur ritscenen** (013 hade det), och ingen platt färgad bild i en djup zoom (019 sänktes från 16× till 9×). Zooma in genom hålet i papperet.
- **Ingen sång under ritandet.** Musiken börjar efter "Nu kör vi!".
- Kritan är en sak, inte en figur. Den har inget ansikte och vänds aldrig.

## Checklista för ett nytt avsnitt

1. Kopiera mallens `scener/kritan-ritar/` och byt sak och färg: `KONTUR`, bildens mått och ankare, linjens färg och kritans tre färger.
2. Spela in Malins ledtråd och svar. Lägg tiderna i `index.html` (`ROSTER`).
3. Sätt tiderna i `T` efter tabellen ovan, räknade från när introt slutar.
4. Lägg in skogsljudet i `satt-ihop.sh` och se till att sångens `adelay` hamnar efter "Nu kör vi!".
5. Kontrollera med ett kontaktark (lk-figur, `stills.mjs`):
   - spetsen följer linjen
   - linjen är borta när bilden är fylld
   - papperet syns aldrig med kant
   - kameran hoppar inte vid hålet

## Hur avsnitten gjorde

| | 007 Bruna | 013 Röda | 019 Rosa | 011 Gula |
|---|---|---|---|---|
| Ritar | hela lastbilen, 14 drag i flera färger | konturen i 3 drag med pauser | kontur, sicksackfyllning, spiral, stjälk (3 kritor) | **konturen i 1 drag** |
| Ljud | skrrrrt, plupp, pop | skrrrrt, tass, pling | skrrrrt, pop, boing, pling | **krita-ritar, pling** |
| Kamera | stilla, mitt i bild | på äpplet, ut när bilen kör in | +6 % in, zoom in i mitten | **följer spetsen nära, ut, kryper in** |
| Ut | tonar över | kritsvep | zoom in i gula mitten | **hål i papperet** |
| Extra | | | kritskugga, smulor | |

Det som står i fetstil är standarden. Kritskuggan och smulorna från 019 läggs till.
