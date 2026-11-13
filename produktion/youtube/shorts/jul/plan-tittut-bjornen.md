# Plan: Tittut med björnen i julskogen (liggande, tittut-serien)

Status: **byggd 2026-11-13.** Filmen ligger i `produktion/youtube/tittut/julskogen/bjornen-bulle/`, och rösterna är inspelade (Malin, tagning 2). Den väntar på Sannas granskning. Inget är committat.

Ändringslogg:
- 2026-11-13: Sanna svarade *liggande som de andra tittut* och *ny bakgrund behövs*. Filmen görs därför i tittut-seriens motor (`produktion/youtube/tittut/tittut.js`, format i `format/tittut.md`), som lammet i skogen (lucka 19) och leoparden på lekplatsen (lucka 17). Den görs inte i julkalenderns `djur.js`.
- 2026-11-13 kväll: Sanna vill ha gömställena **julgranen, en stor hög med paket och ett pepparkakshus**. De ersätter snöhögen och det ensamma paketet. Grisens tittut får **samma tre saker på samma plats**, som en delad uppsättning.
- 2026-11-13 kväll: "push on". Frågorna besvarades med Claudes rekommendationer (se Beslut). Bilderna gjordes i Flow och rösterna i ElevenLabs, efter Sannas ja (högst 2 000 krediter).
- 2026-11-13: Pepparkakshuset fick ingen dörrmask. Björnen kommer upp **över taket** i stället för ut genom dörren. Replik tittut-3 blev *Titt-ut! Ovanpå taket!*.
- 2026-11-13 kväll, Sannas granskning av första renderingen: säcken med paket i stället för pakethögen, en mycket större gran, en varmare platta, tomteluva och grön halsduk på björnen (`luva`, `halsduk` i tittut.js), och lätt snöfall (`sno: 60`). Den första filmen ligger i `aldre/bjornen-bulle-v1-pakethog.mp4`. Replikerna *Bakom paketen…* och *Ur paketen!* passar fortfarande, eftersom paketen ligger i säcken.
- 2026-11-13 natt, ny komposition (Sanna: "Ja, rendera"):
  - Granen är större (h 1100) och huset står närmare (x 1590).
  - I förgrunden ligger en snödriva till vänster och snöbuskar med röda bär till höger (`nara`), båda utan liten gran (Sanna: "too much med gran i snö").
  - Huset fick h 460. Högre än så blir hoppet över taket för stort.
  - Två motorfixar i `tittut.js` för höga saker: benen klipps inte längre ute på snön bredvid granen, och inga fotbitar syns under grenarna när figuren är bakom.
  - Den förra filmen ligger i `aldre/bjornen-bulle-fore-komposition.mp4`.
- 2026-11-13 natt, Sannas feedback:
  - *"add subtle bg noise, winter outdoors loop"*: en ny vindslinga, `vinterljud-2` (CC0). Den förra var mest bas och hördes inte.
  - *"improve bear behind big julgran, not perfectly cropped"*: klippet under grenarna i `tittut.js` skär inte längre lodrätt genom kroppen vid grenspetsen, och inga hattbitar syns i grenkanten. När björnen tittar fram står han med benen i snön bakom granen.
- 2026-11-13: Kimi granskade replikerna (Sanna: "kimi review innan malin"). Inget behövde ändras, se Granskning.

## Idé

En ny plats: **Julskogen**, en snöig glänta med bleka snögranar i bakgrunden, vit snö på marken och ljus vinterhimmel. Björnen leker tittut bakom tre julsaker:

| Gömställe | Höjd | Björnen kommer fram | Extra |
|---|---|---|---|
| **Julgranen**: den klädda granen från lucka 1 | hög | ut vid **sidan** av granen | – |
| **Säcken med paket**: röd säck med tre paket i öppningen | låg och bred | **upp** ovanför säcken | skakar i pausen (`skakar`) |
| **Pepparkakshuset**: brunt med vit glasyr och godisknappar | mellan | huvudet **upp över taket** (`ur`) | – |

Fem rundor (`varv: 2`). I överraskningen i runda 5 gömmer sig björnen bakom pepparkakshuset men kommer upp ur säcken. Hej och hej då sker på fri snö mellan granen och huset. Rytmen är som i alla tittut: borta, en paus med två retningar, tittut på "ut", ett vickande huvud och brummande.

## Format

- **Liggande 1920×1080, tittut-serien:** `produktion/youtube/tittut/julskogen/bjornen-bulle/index.html` med `tittut({ … })`. Den renderas med `node avsnitt/004-bussen-badar/scener/render.mjs <mapp>`.
- **Short:** `kort: [0]` ger seriens vanliga Short (intro, hej, runda 1, hej då) ur samma fil.
- **Inte i julkalendern.** Den läggs ut som en vanlig Tittut-film i december.

## Den delade uppsättningen (björnen och grisen)

- `bakgrunder/julskogen.md`: platsen, de tre sakerna, prompterna, måtten och fotpunkterna.
- `assets/bakgrunder/julskogen/julskogen.png`: plattan (Flow), med original i `original/`. Förgrunden är `julskogen-saker/snodriva.png` och `snobuskar.png` (`nara`).
- `assets/bakgrunder/julskogen-saker/`:
  - `gran.png`: en kopia av `julgran-kladd.png` med kanten tunnad till 5 px.
  - `pakethog.png` och `pepparkakshus.png` (Flow), med original i `original/`.
- Platsljudet `assets/ljud/effekter/vinterljud/vinterljud-2.m4a` (mjuk vind, CC0, ingen kredit), i `PLATSLJUD` som `julskogen`.
- Sakerna och fotpunkterna, kopierade av båda filmerna:

```js
saker: {
  sack:          [250, 935, { h: 440, farg: '#D9382E' }],
  gran:          [540, 890, { h: 1100, farg: '#397653' }],
  pepparkakshus: [1590, 940, { h: 460, farg: '#B5743B' }],
},
```

Björnen står på `start: [1100, 1060]`, kommer in från höger (`kant: 1`) och har `klattra: false`. Grisen står på `[670, 1035]` och kommer in från vänster.

## Rundorna

```js
rundor: [
  ['sack', 'upp'],
  ['gran', 'sida'],
  ['pepparkakshus', 'ur'],                // huvudet upp över taket
  ['gran', 'sida'],
  ['pepparkakshus', 'ur', 'sack'],        // överraskningen
],
```

## Repliker

De ligger i `produktion/youtube/tittut/julskogen/bjornen-bulle/rost.txt`. Rösterna finns i `assets/ljud/roster/tittut/bjorn-julskog/`, och hela tagningarna i `produktion/ljud-original/roster/tittut/bjorn-julskog/`. *Hej björnen!* och *Hej då björnen!* är kopior från `roster/jul/` (`tittut/bjorn-hej.m4a`, `bjorn-hejda.m4a`). `UT`-tiderna står i `tittut.js`.

```
bjorn-hej        [excited] Hej björnen!
hej-hej-1        [excited] Hej hej!
lek-1            [playful] Ska vi leka tittut i snön?
gomma-1          [curious] Var gömmer du dig nu?
kul-1            [happy] Okej! Vad roligt!
borta-1          [whispers] Bakom paketen… borta!
tittut-1         [laughs] Tittut! Där uppe!
borta-igen-1     [whispers] Bakom granen… borta!
tittut-2         [excited] Titt… ut! Vid granen!
dar-ar-du-1      [happy] Där är du!
borta-igen-2     [mischievously] Bakom pepparkakshuset nu…
tittut-3         [giggles] Titt-ut! Ovanpå taket!
busig-1          [laughs] Vilken busig björn!
igen-1           [excited] Igen! Igen!
borta-2          [playful] Prassel, prassel… borta!
jag-sag-nagot-1  [whispers] Jag ser något brunt och mjukt…
tittut-4         [excited] Tittut!
borta-igen-3     [mischievously] Bakom pepparkakshuset igen…
tittut-5         [surprised] Oj! Tittut! Ur paketen!
dar-ar-du-2      [excited] Där är du ju!
slut-1           [warm] Nu är leken slut.
hej-da-1         [giggles] Tittut! Vi ses snart!
```

Björnens läten är `brum-glad` (kopior av brum-gullig 1, 2, 1b, 2b, 1c och 1e) och `brum-fniss` (brum-gullig 3, 3b och fniss-lang).

## Granskning (Kimi, 2026-11-13)

Kimi gav 12 punkter. Inget av dem krävde en ny inspelning:
- **Avvisade, eftersom Kimi saknade seriens sammanhang:**
  - *Okej! Vad roligt!* svarar på björnens nick efter *Ska vi leka?*.
  - *Hej björnen!* är seriens öppning.
  - *Var gömmer du dig nu?*, *Nu är leken slut.* och filnamnen följer lammets och leopardens filmer.
  - Det olika uttalet av "tittut" (Tittut / Titt… ut / Titt-ut) är medvetet.
- **Möjliga småändringar, om rösterna ändå görs om:**
  - *Bakom pepparkakshuset… borta!* i stället för *…nu…*.
  - *Titt-ut! Över taket!* i stället för *Ovanpå taket!* (huvudet kommer upp över taket, det står inte på det).
- **Sedan tidigare:** inga djurnamn och inget "Vad kan det vara?".

## Beslut (2026-11-13, Sanna: "push on", svaren är Claudes rekommendationer)

1. **Reserv i julkalendern** (Sanna 2026-11-13: "add this to julkalender planning"): för lucka 19 eller 21, se `produktion/youtube/julkalender-plan.md`. Annars läggs den ut som en vanlig Tittut-film i december.
2. **Pepparkakshuset:** björnen kommer upp över taket. Motorns `ur` betyder huvudet över kanten, och någon dörrmask behövdes inte.
3. **Julgranen:** den klädda granen från lucka 1 används som den är, utan snö.
4. **Bilderna** gjordes i Flow (0 krediter). **Rösterna** gjordes i ElevenLabs efter Sannas ja.
5. **Short:** ja, `kort: [0]`.

## Kvar

- Sannas granskning av filmen (feedback-artifacten).
- Bädden `assets/ljud/musik/tittut-bad.m4a` saknas i repot, liksom för alla tittut-filmer, så musiken är tyst i renderingen.
- Snöflingor från granen gjordes inte. Det var ett tillval i den första planen.
