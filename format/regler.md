# Produktionsregler

Reglerna finns för att varje avsnitt ska gå att göra på rimlig tid. Ett avsnitt som följer dem kräver få nya bilder. Det mesta finns redan.

## Antal

| | Max per avsnitt | Varför |
|---|---|---|
| **Figurer i berättelsen** | **3** | Varje figur är en docka som ska riggas, animeras och ha röst |
| **Platser (bakgrunder)** | **2** | En bakgrund är många bilder: förgrund, bakgrund och vinklar |
| **Platsbyten** | **1** (A → B), eventuellt tillbaka till A | Färre övergångar, enklare berättelse |
| **Kamerainställningar** | **6** totalt | Helbild, närbild, en panorering … resten är upprepning |
| **Nya statister** | **2** (befintliga statister fritt) | Statister har inga repliker och bara en rörelse, se nedan |
| **Nya saker (rekvisita)** | **2** | Saker från tidigare avsnitt får användas fritt |
| **Nya poser per figur** | **1** | Standardposerna räcker oftast (se nedan) |
| **Sånger** | **1** | Plus intro- och outrojingeln, som alltid är samma |
| **Längd** | **3–4 min** inklusive intro och outro | Lagom för små barn och möjligt att göra varje vecka |

## Favoriter utan extra arbete

Favoritsaker som inte är med i berättelsen kan finnas **i bakgrunden**: fjärilar på ängen, ett flygplan långt bort på himlen, äpplen i trädet. De är målade i bakgrundsbilden och räknas inte som figurer. Högst en enkel rörelse, till exempel att fjärilen glider över himlen.

## Statister

En **statist** säger inget och gör bara **en enkel rörelse**: går förbi, kör förbi, vinkar eller tutar. Statister räknas inte som figurer, eftersom de inte behöver läppsynk eller röst.

- Alla figurer som redan finns får vara statister, till exempel Traktorn Tuff som plöjer i bakgrunden.
- Ett fordon som någon kör och som inte pratar är en statist (bara tut och snurrande hjul).
- Högst 2 **nya** statister per avsnitt. När de väl är gjorda kan de återanvändas fritt.

## Standardposer (görs en gång per figur)

Varje figur får de här delarna och poserna när den skapas. Sedan återanvänds de i alla avsnitt:

- står (framifrån, och lätt vriden åt höger – speglas för vänster)
- hoppar (figuren lyfter, skuggan på golvet blir mindre)
- går / kör / flyger (rörelsecykel)
- glad, ledsen, förvånad (ansiktsdelar som byts)
- vinkar
- munformer: stängd, öppen, O. **Alla figurer har en mun**, också fordonen. Den ritas i kod, är glad som standard och ritas inte dubbelt om den ansiktslösa bilden redan har en.
- blinkar

Behövs något annat, till exempel att figuren äter glass, räknas det som avsnittets **en nya pose**.

## Berättelsen

- **En händelse, ett litet problem, en lösning.** Inga sidospår.
- **Upprepning.** Samma replik eller händelse kommer 2–3 gånger (räkna, tuta, hoppa).
- **En fråga till tittaren** per avsnitt utöver introfrågan, med paus.
- Problemet löses alltid **tillsammans** och utan att någon är elak.
- **Bågen, känslan och kritans personlighet:** se [berattelse.md](berattelse.md).

## Pedagogik för 2-åringar

Granskat mot förskolepedagogik och Montessori (se fliken Pedagogik i `format/arbetsflode.html`). Gäller varje avsnitt:

1. **Tempo.** Närbilder 1,5–2,5 s. Varje bild syns i snitt minst 3 s, och högst ett klipp per sjungen rad. 2-åringar behöver tid att uppfatta en bild.
2. **En sak i taget.** Högst en sak rör sig i bakgrunden medan huvudhändelsen pågår; resten står still eller väntar på sin tur.
3. **Verklighetsnära.** Att fordonen pratar är fantasi, så allt annat är på riktigt: riktiga djurläten, och fordon som stannar, öppnar dörren och tutar som riktiga.
4. **Delaktighet.** Efter frågan till tittaren: pausa 4–5 s, sedan visar en figur svaret. Bjud in barnet att vinka, hoppa och tuta med, tydligt och flera gånger.
5. **Vardagssaker.** En vardagshandling och ett "tack" (och "varsågod") i varje avsnitt, till exempel att någon kliver på bussen själv eller tar emot en glass.

## Övergångar och effekter (tillagt efter 005)

Formatets övergångar är zoom in, kritsvep och zoom ut. Sedan 005 får också de här användas:

- **Molnövergång mellan scener.** Mjuka moln i avsnittets färg glider in från sidorna, täcker bilden en kort stund och glider undan. Den används vid skarvarna mellan kodscenerna, inte efter introt. Den läggs på i sammansättningen (`film/moln/`), inte i scenerna.
- **Kritirisen i slutet** (som i Lilla Kvack). En vinglig cirkel sluts runt figuren, svart utanför. Efter den kommer det vanliga outrot.
- **Små dekorationer i kod** räknas inte som nya saker när de bara är pynt och ritas i kod med krita och vit kant. Exempel: hjärtan som flyger upp, en blomma vid en buske, vita avgaspuffar. Saker som figurerna använder eller pratar om är fortfarande rekvisita och räknas.

Effektstreck (fartstreck, dunsstreck, strålar) används inte. De såg billiga ut i 005 och togs bort.

## Checklista innan manus är klart

- [ ] Högst 3 figurer i berättelsen
- [ ] Högst 2 platser
- [ ] Högst 2 nya saker
- [ ] Högst 1 ny pose per figur
- [ ] Introt har titel och nummer, och outrot är det vanliga
- [ ] Kritsvep vid platsbyte, zoom in och ut i början och slutet av berättelsen
- [ ] Sången går att klippa ut som Short (30–60 s)
- [ ] `harriets-favoriter.md` är uppdaterad
- [ ] Pedagogiken ovan: tempo, en sak i taget, verklighetsnära, paus 4–5 s efter frågan, en vardagshandling och ett tack
