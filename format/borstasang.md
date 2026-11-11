# Borstasången – en sång, sex teman

**Status:** recept 2026-11-11, inte provat i film än. Piloten är 030 (`avsnitt/030-borsta-borsta-gulliga-djur/`). Skriv om det här när 030 är klar.

En mycket enkel sång om att borsta tänderna som görs om med nya figurer. **Sången, bilderna och klippen är desamma varje gång.** Bara figurerna, deras ljud, tandborstens färg och en rolig scen byts (Sanna 2026-11-11: "a concept i can reuse", "similar song to all but different themes", "super simple and not too much going on, pretty simple with some fun scenes").

## Sången (ca 1:30)

Det som står i **[hakar]** byts per tema. Allt annat sjungs likadant i alla sex.

**Öppning** (säger vad sången handlar om, Sanna 2026-11-11: "etablera låten lite mer")
Nu ska vi borsta tänderna! *(Borsta tänderna!)*
Nu ska vi borsta tänderna! *(Borsta tänderna!)*

**Intro:** två takter musik före öppningen, ingen ritscen (Sanna 2026-11-11: "no ukulele, no kritan ritar"). Filmen börjar direkt i badrummet, tandborsten ligger på handfatet.

**Vers** (tre gånger, en figur i taget)
Här kommer **[figuren]**! *(Hej, **[figuren]**!)*
Gapa stort! *(Gapa stort!)*
*(en takt musik: figurens ljud läggs i klippet)*

**Refräng** (efter varje vers, alltid likadan)
Borsta, borsta tänderna! *(Borsta, borsta!)*
Borsta uppe! *(Borsta uppe!)*
Borsta nere! *(Borsta nere!)*
Rena tänder! *(Hurra!)*

**Slut**
Var är tänderna?
*(paus 4 s)*
Där är de! *(Där är de!)*
Hej då! *(Hej då!)*

Kvinnliga körröster upprepar orden i parentes (vuxen kvinnoröst i sången, inga barnröster). **Inga ljudeffekter i sången** (Sanna 2026-11-11: "sound effects will be hard for ai"): djurens ljud, borstljudet och glansen läggs i klippet, från ljudbanken eller Openverse. Inga djurnamn: "katten", "kon", "apan".

## Bilden på orden

| Rad | Bild | Utsnitt |
|---|---|---|
| (intro, 2 takter) | badrummet, tandborsten på handfatet | helbild |
| Nu ska vi borsta tänderna! | tandborsten gungar lite i takt, figurerna tittar fram vid kanten på andra raden | helbild |
| Här kommer … | figuren går in, gör sitt ljud och tar borsten | helbild |
| Gapa stort! | munnen öppnas, matta tänder syns | ansiktet (2,8) |
| Borsta, borsta tänderna! | borsten gnuggar, lite skum | ansiktet (2,8) |
| Borsta uppe! | övre raden blir vit, en tand i taget | munnen (4,0) |
| Borsta nere! | undre raden blir vit, en tand i taget | munnen (4,0) |
| Rena tänder! | brett tandleende, **en** liten glansstjärna | ansiktet (2,8) |
| Var är tänderna? | alla tre i rad med stängda munnar, stilla i 4 s | helbild |
| Där är de! | tre tandleenden, ett i taget | helbild |
| Hej då! | vinkning, kritirisen | helbild |

Hårda klipp mellan stillastående utsnitt, som i `bilderbok.md`. Rörelsen är lugn: ingen studs på takten, inga snurr.

**En rolig scen per film**, i vers 2 och refräng 2, och inget mer än den. Den ska gå att förstå utan ord och sluta på "Rena tänder!".

## De sex temana

| Tema | Figurer (ljud i klippet) | Borstens färg | Den roliga scenen | Saknas |
|---|---|---|---|---|
| **Gulliga djur** (030) | katten (mjau), kaninen (hihi), pandan (mmm) | turkos (finns) | en skumklick på kaninens nos, som spricker på "Rena tänder!" | tandmun på kaninen och pandan |
| **Bondgården** (031) | kon (mu), grisen (nöff), lammet (bä) | röd | kons tunga slickar på borsten | tandmun på tre riggade figurer, ny borste |
| **Busiga apan** (032) | apan, ensam i alla tre verserna | gul | apan borstar örat, sedan bananen: *"Nej, nej, inte där!"* | tandmun på apan, ny borste. Texten i vers 2 avviker, skriv den i avsnittet |
| **Dinosaurier** (033) | tre dinosaurier (rar, mjukt) | grön | borsten är för liten för de stora tänderna, den får en större | nya figurer i v2 (`lk-figur`) |
| **Fordon** | bussen (tut), traktorn (tuff), bilen (brum) | blå | grillen är tänderna, lyktorna blinkar när den är ren | v2-ansikten med tandgrill |
| **Älvor och enhörning** | enhörningen, älvan | rosa | borsten lämnar en regnbågsrand | båda figurerna är nya och görs med Sanna |

Nya tandborstar är rekvisita och görs med Sanna, inte på eget initiativ.

## Byggs en gång

1. **Tandmunnen i den gemensamma riggen.** Kattens `uttryck.html` har redan `gapar`, `flinar` (tandleendet), gurgelmunnen, `tander: [8]` (0 matt … 1 vit) och posen `borstar` med `borstV`. Flytta det till den delade riggkoden så att varje v2-figur får det, med munnens mått per figur.
2. **En scenfil** som tar en lista: figur, ljud, borstens bild och färg, den roliga scenen. Tiderna läses ur `rader.txt` (sångtid), som i `fargsang-v2.md`.
3. **Platsen** är badrummet (`bakgrunder/badrummet.md`) i alla sex. Handfatet och pallen finns. **Inredningen** (Sanna 2026-11-11: mer inredning) är urklipp som redan finns plus tavlan: väggskåpet uppe till vänster (360 px brett), tavlan bredvid det (200 px), handduken på kroken uppe till höger (190 px), badankan på golvet till höger (110 px). Allt sitter högt och långt ut, så att det inte hamnar i ansikts- och munutsnitten. Förslagsbild: `avsnitt/030-borsta-borsta-gulliga-djur/provbild/badrum-inredning.jpg`.

## Suno

Samma stil och samma form i alla sex: funkig barnpop med studsig bas, gitarr, clavinet och handklapp (Sanna: "funky"), ingen ukulele, inga ljudeffekter. Gör 030 som en vanlig generering. För nästa tema: använd **Cover** på 030:s tagning med den nya texten, så står melodin kvar. Två fristående genereringar får aldrig samma melodi. Prompten i varje avsnitts `suno.md` är ändå hel och fristående.

## Avvikelser från `regler.md`

- **Längden** är ca 2 min med intro och slut, inte 3–4 min. Sångerna är gjorda för att läggas ihop till en mix på 9–10 min.
- **Ingen ritscen, inget tack och inget problem som löses med en kompis.** Sången ska vara mycket enkel.
- **Busiga apan** har en figur, de andra tre.

Det som står kvar: en fråga med paus 4 s, en vardagshandling, max 3 figurer och 1 plats, kritirisen i slutet, en Short går att klippa ut (vers 1 + refräng, ca 25 s).
