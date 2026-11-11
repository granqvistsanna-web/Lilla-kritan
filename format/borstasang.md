# Borstasången – en sång, sex teman

**Status:** recept 2026-11-11, inte provat i film än. Piloten är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`). Skriv om det här när 030 är klar.

En mycket enkel sång om att borsta tänderna som görs om med nya figurer. **Sången, bilderna och klippen är desamma varje gång.** Bara figurerna, deras ljud, tandborstens färg och en rolig scen byts (Sanna 2026-11-11: "a concept i can reuse", "similar song to all but different themes", "super simple and not too much going on, pretty simple with some fun scenes").

## Sången (ca 1:30)

Det som står i **[hakar]** byts per tema. Allt annat sjungs likadant i alla sex.

**Intro**
Kritan ritar …
*(paus, tandborsten ritas)*
En tandborste!
Varsågod! *(Tack!)*

**Vers** (tre gånger, en figur i taget)
Här kommer **[figuren]**! *(**[ljudet]**!)*
Gapa stort! *(Aaa!)*

**Refräng** (efter varje vers, alltid likadan)
Borsta, borsta! *(Tsch, tsch!)*
Där uppe! *(Tsch, tsch!)*
Där nere! *(Tsch, tsch!)*
Titta … blank!

**Slut**
Var är tänderna?
*(paus 4 s)*
Där är de! *(Blänk!)*
Hej då!

Ekot i parentes sjungs av kören. Inga djurnamn: "katten", "kon", "apan".

## Bilden på orden

| Rad | Bild | Utsnitt |
|---|---|---|
| Kritan ritar … | kritan ritar tandborsten i temats färg (`ritintro.md`) | papperet |
| Varsågod! (Tack!) | borsten landar i första figurens tass | halvbild |
| Här kommer … | figuren går in och gör sitt ljud | helbild |
| Gapa stort! (Aaa!) | munnen öppnas, matta tänder syns | ansiktet (2,8) |
| Borsta, borsta! | borsten gnuggar, lite skum | ansiktet (2,8) |
| Där uppe! | övre raden blir vit, en tand i taget | munnen (4,0) |
| Där nere! | undre raden blir vit, en tand i taget | munnen (4,0) |
| Titta … blank! | brett tandleende, **en** liten glansstjärna | ansiktet (2,8) |
| Var är tänderna? | alla tre i rad med stängda munnar, stilla i 4 s | helbild |
| Där är de! (Blänk!) | tre tandleenden, ett i taget | helbild |
| Hej då! | vinkning, kritirisen | helbild |

Hårda klipp mellan stillastående utsnitt, som i `bilderbok.md`. Rörelsen är lugn: ingen studs på takten, inga snurr.

**En rolig scen per film**, i vers 2 och refräng 2, och inget mer än den. Den ska gå att förstå utan ord och sluta på "blank!".

## De sex temana

| Tema | Figurer (ljud) | Borstens färg | Den roliga scenen | Saknas |
|---|---|---|---|---|
| **Gulliga djur** (030) | katten (mjau), kaninen (hihi), pandan (mmm) | turkos (finns) | en skumklick på kaninens nos, som spricker på "blank!" | tandmun på kaninen och pandan |
| **Bondgården** | kon (mu), grisen (nöff), lammet (bä) | röd | kons tunga slickar på borsten | tandmun på tre riggade figurer, ny borste |
| **Busiga apan** | apan, ensam i alla tre verserna | gul | apan borstar örat, sedan bananen: *"Nej, nej, inte där!"* | tandmun på apan, ny borste. Texten i vers 2 avviker, skriv den i avsnittet |
| **Dinosaurier** | tre dinosaurier (rar, mjukt) | grön | borsten är för liten för de stora tänderna, kritan ritar en större | nya figurer i v2 (`lk-figur`) |
| **Fordon** | bussen (tut), traktorn (tuff), bilen (brum) | blå | grillen är tänderna, lyktorna blinkar när den är ren | v2-ansikten med tandgrill |
| **Älvor och enhörning** | enhörningen, älvan | rosa | borsten lämnar en regnbågsrand | båda figurerna är nya och görs med Sanna |

Nya tandborstar är rekvisita och görs med Sanna, inte på eget initiativ.

## Byggs en gång

1. **Tandmunnen i den gemensamma riggen.** Kattens `uttryck.html` har redan `gapar`, `flinar` (tandleendet), gurgelmunnen, `tander: [8]` (0 matt … 1 blank) och posen `borstar` med `borstV`. Flytta det till den delade riggkoden så att varje v2-figur får det, med munnens mått per figur.
2. **En scenfil** som tar en lista: figur, ljud, borstens bild och färg, den roliga scenen. Tiderna läses ur `rader.txt` (sångtid), som i `fargsang-v2.md`.
3. **Platsen** är badrummet (`bakgrunder/badrummet.md`) i alla sex. Handfatet och pallen finns.

## Suno

Samma stil och samma form i alla sex. Gör 030 som en vanlig generering. För nästa tema: använd **Cover** på 030:s tagning med den nya texten, så står melodin kvar. Två fristående genereringar får aldrig samma melodi. Prompten i varje avsnitts `suno.md` är ändå hel och fristående.

## Avvikelser från `regler.md`

- **Längden** är ca 2 min med intro och slut, inte 3–4 min. Sångerna är gjorda för att läggas ihop till en mix på 9–10 min.
- **"Problem som löses med en kompis"** är nedskuret till att kritan ger tandborsten (*"Varsågod!"* – *"Tack!"*).
- **Busiga apan** har en figur, de andra tre.

Det som står kvar: en fråga med paus 4 s, en vardagshandling, tack och varsågod, max 3 figurer och 1 plats, kritirisen i slutet, en Short går att klippa ut (vers 1 + refräng, ca 25 s).
