# Övergångar och manér

Samma rörelser, ljud och sätt att prata i alla avsnitt. Barn känner igen det och det går fortare att göra.

## Övergångar – bara tre sorter

| Övergång | När | Hur | Ljud |
|---|---|---|---|
| **Zoom in i teckningen** | Från papperet in i berättelsen | Kameran zoomar in i det kritan just ritat. Teckningen tonar över till platsen. ~1,5 s | mjukt *swoosh* |
| **Kritsvep** | Platsbyte (A → B) och till/från titelkortet | Ett stort kritklotter i nästa plats **väggfärg** (se `bakgrunder/README.md`) fyller bilden från vänster till höger och suddas sedan bort åt samma håll så att nästa bild syns. ~1 s | *skrrrrt* |
| **Zoom ut till papperet** | Från berättelsen till avslutningen | Omvänd zoom: platsen krymper och blir en teckning på papperet. ~1,5 s | mjukt *swoosh* |

**Inom samma plats:** ingen övergång. Klipp direkt eller låt kameran glida.

Inga andra övergångar (inga stjärnwipes, inga 3D-vändningar, inga blixtar).

## Kamera

- Utgångsläget är **helbild** där man ser platsen och alla figurer.
- **Närbild** bara på känslor: när någon blir glad, ledsen eller förvånad.
- Högst **en långsam panorering** per plats, till exempel när bussen kör.
- Kameran rör sig alltid långsamt och mjukt, aldrig med skak eller snabba zoomar.

## Körscen (återanvändbar)

För avsnitt där någon kör eller reser. **En enda kamerainställning** räcker för hela resan:

- Fordonet står still i mitten och gungar lite. Hjulen snurrar.
- Väggen och golvet glider långsamt från höger till vänster bakom fordonet (en väggbild som går att upprepa sömlöst).
- Det som händer på vägen glider in från höger, ett i taget: en statist, ett hus, väder.
- När fordonet stannar slutar bakgrunden att glida. Inget klipp behövs.

## Väder (återanvändbart, `assets/format/`)

- **Regn:** ett grått moln glider in, regndroppar faller i ett eget lager och ljudet *plitt-platt* hörs. Väggen blir lite mörkare.
- **Sol efter regn:** molnet glider bort och väggen ljusnar igen.

## Rörelse

- En sak i taget rör sig. De andra står stilla och blinkar.
- Den som pratar gungar lite.
- Skuggan på golvet står kvar när figuren hoppar och blir mindre ju högre figuren är.
- Figurer som går studsar lätt. Flygande saker svävar i mjuka vågor. Fordon gungar och hjulen snurrar.
- Saker som dyker upp gör en liten *pop* och växer fram (med ett *pling*).

## Berättarens manér

I världen Lilla Kritan finns ingen programledare. Det är en krita utan ansikte som ritar, och en varm **berättarröst** som pratar till tittaren.


- Säger alltid samma sak i början: *"Hej! Välkommen till Lilla Kritan. Vad ska vi rita idag?"*
- Kritan ritar dagens sak och berättaren frågar: *"Vad tror du att det är?"* med **3 sekunders paus**, och svarar sedan.
- Pratar en gång till tittaren mitt i berättelsen (räkna, färger, ljud) med paus.
- Sammanfattar i en mening på slutet: *"Glass med kompisar är bäst!"*
- Säger alltid samma sak på slutet: *"Hej då! Vi ritar mer en annan dag!"*

## Ljudbibliotek (`assets/ljud/effekter/`)

| Ljud | Används när |
|---|---|
| `skrrrrt` | kritan ritar, kritsvep |
| `pling` | Något nytt dyker upp |
| `swoosh` | Zoom in och ut |
| `boing` | Hopp |
| `pop` | Saker poppar fram |
| `plupp` | Något ramlar ner |

Nya ljud får läggas till, men samma händelse ska alltid ha samma ljud.

## Musik

- Lugn bakgrundsmusik under berättelsen, samma tema i alla avsnitt (ukulele, xylofon, glockenspiel).
- Musiken sänks när någon pratar.
- Sången är avsnittets höjdpunkt och har samma instrument.
