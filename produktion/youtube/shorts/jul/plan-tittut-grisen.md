# Plan: Tittut med grisen i julskogen (liggande, tittut-serien)

Status: **godkänd, förbereds** (Sanna 2026-11-13: *"push on"*). Scenmappen `produktion/youtube/tittut/julskogen/grisen-greta/` finns med `index.html` och `rost.txt`, och *"Hej grisen!"* / *"Hej då grisen!"* är kopierade till `assets/ljud/roster/tittut/`. Inga krediter använda. Det som väntar står under *Läge*.

Omgjord 2026-11-13 efter Sannas svar:
- *"ej short"* och *"som de andra"*: liggande 1920×1080, som de andra tittut-filmerna, ingen Short.
- Jultittut har tre gömställen: *"x mas tree, stort paket hög kanske, … maybe pepparkakshus"*.

Därför görs filmen nu i tittut-seriens motor (`produktion/youtube/tittut/tittut.js`, formatet i `format/tittut.md`), som lammet vid granen (lucka 19) och björnens jultittut (`plan-tittut-bjornen.md`). Den förra planen, en julkalendersaga i `djur.js` där hunden gräver fram grisen ur snön, är struken.

## Idé

Grisen leker tittut i **Julskogen**, samma nya plats som björnens jultittut. Den har tre julgömställen, och de **görs en gång och delas med björnens film**:

| Gömställe | Höjd | Grisen kommer fram | Extra |
|---|---|---|---|
| **Pepparkakshuset**: brunt med vit glasyr på taket, godiskanter och en liten dörr | mellan (ca 450 px i bild) | **upp** ovanför taket, och i runda 5 ut vid husets **hörn** | – |
| **Granen**: julklädd snögran med kulor | hög, toppen ut ur bild | ut vid **sidan** av stammen | snö faller från en gren när grisen kikar |
| **Pakethögen**: en stor hög med julklappar i olika färger och storlekar, rosetter | låg och bred (ca 380 px) | **upp ur** högen, mitt bland paketen | högen skakar i pausen (`skakar`), översta paketet gungar |

Det som skiljer grisen från björnen:
- **Ordningen:** grisen börjar vid pepparkakshuset.
- **Retningen:** grisens kännetecken är **knorren**. Den sticker upp ur pakethögen medan berättaren säger *"Jag ser en liten svans…"* (`svansKik`, som hundens svans i sanden).
- **Överraskningen:** grisen gömmer sig i pakethögen men kommer fram vid pepparkakshuset.

Björnens session får välja sin ordning och överraskning så att de inte blir likadana (se *Samordning med björnen*).

## Format

- **Liggande 1920×1080, tittut-serien.** Filen blir `produktion/youtube/tittut/julskogen/grisen-greta/index.html` med `tittut({ … })`. Den renderas med `node avsnitt/004-bussen-badar/scener/render.mjs <mapp>`.
- **Längd ca 2:15**, fem rundor (`varv: 2`), som lammets och björnens film.
- **Ingen Short** (`kort` utelämnas).
- **Julkalendern:** filmen kan ligga bakom en lucka som "hel video" (`video.js`, som 17 och 19). Se fråga 1.

## Takt (rundorna)

Motorn räknar tiderna ur röstfilernas längder. Tiderna nedan är ungefärliga och bygger på lammets film.

| Tid (ca) | Vad händer | Berättaren (egen röstmapp `tittut/gris-jul/`) | Grisen |
|---|---|---|---|
| 0:00–0:03 | Kortet *"tittut!"* poppar i takt med jingeln, och sakerna poppar fram med glitter | röst B *"Titut!"* (delad) | – |
| 0:03–0:18 | Grisen skuttar in från vänster och stannar på fri snö i närbild. Den vinkar och nickar | *Hej grisen!* · *Ska vi leka tittut i snön?* · *Var gömmer du dig nu?* · *Okej! Vad roligt!* | noff (hej), fniss, glatt ja |
| 0:18–0:42 | **Runda 1, pepparkakshuset:** ner bakom huset. Retningar: öronen över taket, sedan en fot vid hörnet. Kommer **upp** ovanför taket | *Bakom pepparkakshuset… borta!* · *Tittut! På taket!* | fniss |
| 0:42–1:06 | **Runda 2, granen:** går in från sidan bakom stammen. Retningar: trynet vid stammen, och lite snö faller från en gren. Kommer ut vid **sidan** | *Bakom granen… borta!* · *Titt… ut! Vid granen!* · *Där är du!* | fniss, noff |
| 1:06–1:30 | **Runda 3, pakethögen:** ner i högen. Retningar: högen skakar och översta paketet gungar. Kommer **upp ur** högen | *I paketen nu…* · *Titt-ut! Ur paketen!* · *Vilken busig gris!* | fniss |
| 1:30–1:52 | **Runda 4, pakethögen igen** (*Igen! Igen!*). Retning: **knorren sticker upp ur paketen och vickar**. Kommer **upp ur** högen | *Prassel, prassel… borta!* · *Jag ser en liten svans…* · *Tittut!* | fniss |
| 1:52–2:10 | **Runda 5, överraskningen:** ner i pakethögen, och högen skakar. Grisen kommer fram **vid pepparkakshusets hörn** | *I paketen igen…* · *Oj! Tittut! Vid pepparkakshuset!* · *Där är du ju!* | noff, fniss |
| 2:10–2:25 | Grisen skuttar tillbaka till närbilden, studsar och vinkar. Kortet fälls ner och grisen tittar upp bakom ordet en sista gång | *Hej då grisen!* (`tittut/gris-hejda`, `hejdaDjur`) · *Nu är leken slut.* · *Tittut! Vi ses snart!* | noff (hej då) |
| + 10 s | Slutbild för YouTubes slutskärm | – | – |

`index.html` finns i `produktion/youtube/tittut/julskogen/grisen-greta/`, med rundorna ovan och `retas: 'oron'`, `svansKik`, `retasSkala: 0.7`, `skakar: ['pakethog']`, `hejdaDjur`, `kant: -1` och `rost: 'gris-jul'`.

Runda 4 och 5 har båda pakethögen som gömställe. Det är meningen: i runda 5 tror barnet att grisen kommer upp ur paketen igen, men den kommer fram vid huset. Ordningen kan också vändas, så att runda 4 är pepparkakshuset från sidan, om pakethögen blir för mycket.

## Nya röstrader

Röstmappen blir `assets/ljud/roster/tittut/gris-jul/`, med Malins röst, i samma form som lammets `rost.txt`. *"Hej grisen!"* finns redan (`jul/gris-hej`) och kopieras till mappen. Inga djurnamn sägs. "grisen" och "gris" är vad djuret är.

```
hej-hej-1        [excited] Hej hej!
lek-1            [playful] Ska vi leka tittut i snön?
gomma-1          [curious] Var gömmer du dig nu?
kul-1            [happy] Okej! Vad roligt!
borta-1          [whispers] Bakom pepparkakshuset… borta!
tittut-1         [laughs] Tittut! På taket!
borta-igen-1     [whispers] Bakom granen… borta!
tittut-2         [excited] Titt… ut! Vid granen!
dar-ar-du-1      [happy] Där är du!
borta-igen-2     [mischievously] I paketen nu…
tittut-3         [giggles] Titt-ut! Ur paketen!
busig-1          [laughs] Vilken busig gris!
igen-1           [excited] Igen! Igen!
borta-2          [playful] Prassel, prassel… borta!
jag-sag-nagot-1  [whispers] Jag ser en liten svans…
tittut-4         [excited] Tittut!
borta-igen-3     [mischievously] I paketen igen…
tittut-5         [surprised] Oj! Tittut! Vid pepparkakshuset!
dar-ar-du-2      [excited] Där är du ju!
tittut-6         [laughs] Tittuuut!
slut-1           [warm] Nu är leken slut.
hej-da-1         [giggles] Tittut! Vi ses snart!
```

Det blir 22 korta repliker (`tittut-6` är en reserv, som i lammets film), en tagning var, som klipps till en fil per replik. Var "ut" börjar i varje tittut-tagning mäts med whisper och läggs i `UT` i `tittut.js`. Raderna för granen, paketen och pepparkakshuset kan delas med björnen om båda filmerna säger samma sak (t.ex. *"Bakom granen… borta!"*), men tittut-regeln är en fil per film. Det är enklast att spela in båda mapparna i samma ElevenLabs-session.

## Det som delas med björnen (görs en gång)

- **Plattan och förgrunden för Julskogen** (`bakgrunder/julskogen.md`, `assets/bakgrunder/julskogen/`), och platsljudet.
- **De tre gömställena som urklipp** i `assets/bakgrunder/julskogen-saker/`, med promptar i `julskogen.md` och kanterna tunnade med `tunn_kant.py`:
  - **Granen:** finns delvis redan. `assets/rekvisita/julgran/cut/julgran.png` är julkalenderns gran (lucka 22–24). Om den håller i ca 1850 px höjd och stammen döljer en figur behövs ingen ny. Annars görs en snögran med kulor från den.
  - **Pakethögen:** ny. Paketen i `assets/rekvisita/paket` och `rosett` (lucka 9, 24) är stilreferens, och `sack-paket` kan också vara det.
  - **Pepparkakshuset:** nytt, det finns inget i `assets/rekvisita/`. `pepparkaksgubbe`, `pepparkakshjarta` och `pepparkaksstjarna` ger färgen och glasyren.
- **Snö som yr** när figuren kommer upp, och **snö från granens gren**, om björnens session bygger det.
- **Platserna för sakerna** (`saker: { … }`) blir samma i båda filmerna, så att de mäts och kontrolleras en gång.

## Det som kan återanvändas

- **Motorn och formatet:** `tittut.js`, `scener/kit.js`, `verktyg/kant.js`, introkortet, jingeln, bädden `tittut-bad` och slutkortet.
- **Knorren som retning:** `svansKik` finns redan (hunden i sandlådan).
- **Grisen:** v2-riggen `grisen-greta` används i julkalendern (lucka 5 och 23).
- **Läten:** `noff-gullig` 1–9, `noff-fniss` 1–3, `noff-glad`, `prassel`, `glitter` och `pop`.
- **Repliker:** röst B:s *"Titut!"* (`tittut/tittut-6`) och *"Hej grisen!"* (`jul/gris-hej`).

## Det som saknas (bara grisens del)

1. **Grisen i tittut-motorn:** `kit.js` saknar grisen. Den behöver en post `grisen-greta-v2` (mapp, bbox, höjd, öronen framför), som `hunden-hugo-v2`. Höjden i bild blir ca 380 px. Knorren måste kunna sticka upp för `svansKik`.
2. **Röstmappen** `tittut/gris-jul/` med 22 repliker, plus `UT`-tiderna.
3. **Filmens mapp** `produktion/youtube/tittut/julskogen/grisen-greta/` med `index.html` och `rost.txt`.

## Samordning med björnen

Båda filmerna har samma plats och samma tre saker. Så skiljer de sig:

| | Grisen | Björnen (som byggd, `julskogen/bjornen-bulle/index.html`) |
|---|---|---|
| Runda 1 | pepparkakshuset, upp | pakethögen, upp |
| Runda 2 | granen, sida | granen, sida |
| Runda 3 | pakethögen, ur | pepparkakshuset, ur (huvudet över taket) |
| Runda 4 | pakethögen, ur (knorren) | granen, sida |
| Överraskning | i pakethögen → vid pepparkakshusets hörn | bakom pepparkakshuset → ur pakethögen |
| Retning | öronen, sedan knorren | huvudet |
| In och ut | vänster, hej på snön mellan pakethögen och granen | höger, hej mellan granen och huset |

## Svar på frågorna (rekommendationer, efter Sannas *"push on"* 2026-11-13)

1. **Julkalendern:** filmen läggs ut som en vanlig Tittut-film i december och hålls som **reserv för lucka 17**. Lucka 17 (leopardens tittut, ingen vinter) passar svagt, och grisen i julskogen passar bättre. Bytet görs bara om Sanna säger ja när filmen är klar, eftersom luckorna 01–24 inte ändras nu.
2. **En plats för båda:** ja, Julskogen för både grisen och björnen. Då behövs en bakgrund och tre saker, och björnens session gör dem.
3. **Överraskningen:** ja. Grisen gömmer sig i paketen och kommer fram vid pepparkakshusets hörn.
4. **Knorren:** ja, i runda 4 (*"Jag ser en liten svans…"*, `svansKik`). Det är grisens kännetecken och skiljer filmen från björnens.
5. **Bilder och röster:** bilderna gör björnens session, en gång för båda. Rösterna (22 rader i `rost.txt`) spelas in i ElevenLabs först när Sanna har sagt ja i den här sessionen, eftersom det kostar krediter. Helst i samma omgång som björnens repliker.

## Ändrat efter Sannas feedback (2026-11-13, kväll)

Gäller före det som står ovan:
- **Säcken med paket ersätter pakethögen** (`sack`, delad med björnen). Rundorna 3–5 sker vid säcken. Replikerna säger fortfarande *"I paketen…"* och *"Ur paketen!"*, precis som björnens.
- **Större gran** och **varm kvällston** i Julskogen. Det kommer från den delade plattan.
- **Grisen klättrar inte upp** på saker (`klattra: false`, som björnen). Den står på snön framför och kikar fram över taket.
- **Snöfall:** lätt snöfall (`sno: 60`). Grisen har **ingen** tomteluva eller halsduk (Sanna: samma säck, gran, platta och snöfall som björnen, men inte hans kläder).
- **Knorren** i runda 4 är förstorad (`svansSkala: 3.2`, standard 1,7), så att den syns ordentligt ovanför säcken (kontrollerat i stillbild vid 89 s).
- `UT`-tiderna för `gris-jul` finns i `tittut.js`.

## Kimis granskning (2026-11-13, före inspelningen)

Kimi har läst de 22 raderna. Två förslag är med:
- `lek-1` heter nu *"Ska vi leka tittut i snön?"*. Den sades vid granen, men första gömstället är pepparkakshuset.
- `jag-sag-nagot-1` heter nu *"Jag ser en liten svans…"*. Ordet "knorr" kan vara okänt för 1–3-åringar. I bilden är det fortfarande knorren som sticker upp.

Avböjt:
- *"Titt… ut!"*, *"Prassel, prassel…"*, `[warm]` på *"Nu är leken slut."* och *"Tittut! Vi ses snart!"*: alla följer tittut-seriens mönster (lammets och hundens film), och `UT` mäts per tagning.
- `borta-igen-3` och `tittut-5` (*"I paketen igen…"*, och sedan *"Vid pepparkakshuset!"*): den motsägelsen är överraskningen.
- Att byta alla taggar till adverb (`[happily]` …): taggarna är desamma som i seriens andra röstmappar.

## Läge

**Filmen är omrenderad 2026-11-13 efter Sannas feedback** (*"change up composition and add some new item … put clothes on pig"*, *"add subtle bg noise"*): `produktion/youtube/tittut/julskogen/grisen-greta/grisen-greta.mp4`, 1920×1080, 30 fps, 2:27,6 (4427 bildrutor). Egen komposition: pepparkakshuset till vänster [320, 945, h 460], en stor snögubbe bredvid [790, 990, h 560] (den befintliga från lucka 8, `rekvisita/snogubbe.md`, bara pynt, inga krediter), granen [1430, 890, h 1100] och säcken [1690, 950, h 420] till höger, förgrundssnön på andra sidor än hos björnen. Grisen har tomteluva och blå halsduk (björnens är grön, snögubbens röd). Vinterljudet `vinterljud-2` på platsVol 0,6 som björnen. Runda 1 är `ur` (huvudet över taket). Avkodas utan fel, kontaktbilden är `kontaktbild.jpg`, whisper hör replikerna. Förra versionen ligger i `aldre/`. Ej committad, väntar på Sannas feedback.

| Klart | Väntar på |
|---|---|
| `julskogen/grisen-greta/index.html` med rundorna, retningen, knorren och överraskningen | – (Julskogen och de tre sakerna klara 2026-11-13, samma mått som björnens film) |
| Rösterna: Malin, Eleven v3, stability 0,5, två tagningar 2026-11-13 (originalen i `produktion/ljud-original/roster/tittut-gris-jul/`). Tagning B används, delad med `dela-tagning.py` till `assets/ljud/roster/tittut/gris-jul/` (22 filer). *"borta!"* i `borta-1` hamnade i `tittut-1` vid delningen och är flyttat tillbaka för hand. Kontrollerat med whisper | `UT`-tiderna (1,02 · 1,65 · 2,6 · 0,24 · 1,54 · 1,95 för `tittut-1`–`6`) ska in i `tittut.js` (skickat till björnens session). Sedan hel rendering och Sannas lyssning |
| `tittut/gris-hej.m4a` och `gris-hejda.m4a` (kopior av julkalenderns) | – |
| `grisen-greta-v2` i `kit.js` med näsborrar (`naborrar`), lagt in av björnens session. `gris` i `DJUR` | – |
| Stillbilder utan röster (`julskogen/grisen-greta/stills/`, 2026-11-13): grisen, ansiktet, taket, granen, pakethögen och hej är rätt | knorren i runda 4 syns bara som en liten rosa krok ovanför rosetten. Bör den bli större? `svans`-kiken skalas 1,7 i `tittut.js`, som är delad |

Posten för `kit.js`, uppmätt ur `assets/karaktarer/grisen-greta/premium/` (`uttryck.html` och urklippen i `cut/`):

```js
// Greta i art direction v2 (assets/karaktarer/grisen-greta/premium, uttryck.html): kropp utan tryne (greta-body-tom), trynet som lapp
// (greta-nos.png), näsborrar och leende ritade i kod, hängöronen framför huvudet som Hugos. h 390 = skala 0,5.
'grisen-greta-v2': { mapp: 'grisen-greta/premium', namn: 'greta', v2: true, bbox: [141, 161, 876, 941], h: 390, framfor: ['ear-l', 'ear-r'],
  ogon: [[419, 402], [602, 401]], kinder: [[371, 451], [647, 450]], kind: [30, 19],
  tom: 'cut/greta-body-tom.png', nos: 'cut/greta-nos.png', armMax: 70,
  le: 'M487 535 Q511 559 535 535', munY: 541 },
```

Två saker att kontrollera i förhandsvisningen:
- **Näsborrarna:** (476, 465) och (541, 464), rx 10,5, ry 15,5, `#ad5567`. `kit.js` ritar inga näsborrar än. Trynet utan dem ser tomt ut, så de behöver läggas till i ansiktet eller tas från en lapp med näsborrar.
- **Knorren:** `tail`, vridpunkt (754, 734), måste fungera med `svansKik`.

I `tittut.js` behövs `'grisen-greta-v2': 'gris'` i `DJUR` och `gris: 'grisen'` i `DJUR_ORD`.

## YouTube-texten

Platsljudet i julskogen är `vinterljud-2` (mjuk vind, klangfabrik "winter wind 01c", CC0), så ingen kredit behövs i beskrivningen. Den gamla krediten för klankbeeld gällde vinterljud-1, som inte används längre.
