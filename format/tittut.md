# Tittut – en serie för små barn

**Status:** två filmer byggda (kaninen i skogen, lammet i skogen 2). Omskrivet 2026-11-06 från kurragömma till riktig tittut. Uppdaterat 2026-11-07 efter QA av båda filmerna; det som står under *Beslutat 2026-11-07 (QA-rundorna)* gäller före äldre beslut.

**Målgrupp: ettåringar.** Långsamt, tydligt och mycket upprepning.

En figur försvinner och kommer tillbaka, om och om igen. Kaninen glider ner bakom busken, berättaren säger *"Borta!"*, det blir tyst och spännande en stund och så: *"Tittut!"* Hon kommer fram med ett busigt ansikte, fnissar och hoppar till. Samma sak bakom stenen och stocken, tre varv.

### Beslutat 2026-11-06 (efter första bygget)

- **Längd ca 2:30.** Tre varv förbi de tre gömställena, alltså **9 rundor**. Överraskningen ligger i andra varvet.
- **Tydligt hej och hej då**, i närbild på fri mark (`start`), aldrig framför ett gömställe. Figuren hoppar in från närmaste kant och ut samma väg.
- **Inga tassar för ögonen.** Det gav för lite. `tassar` används inte längre.
- **Retas i varje paus:** figuren tittar fram lite (öronen eller toppen av huvudet) och duckar igen innan *"Tittut!"*. Pausen är upp till ca 3,5 s.
- **Busiga ansikten:** stora ögon i första ögonblicket, sedan en blinkning och ett brett flin. Ta-da-armar efter *"Tittut!"*.
- **Talet varierar:** varje replik har flera tagningar som turas om, och valfria repliker (*"Borta igen!"*, *"Hmm…"*, *"Där är du!"*, *"Vad busig du är!"*, *"En gång till!"*) kommer i ett fast mönster så att det inte låter likadant varje runda.
- **Kameran följer leken:** närbild på gömstället i varje runda, lite vidare i överraskningsrundan.
- **Maskerna följer sakens kontur**, så att figuren försvinner bakom sakens egen kant och inte bakom en rak linje.

### Beslutat 2026-11-07 (efter QA av lammets film)

- **Varje röstfil används högst en gång per film.** Saknas en ny tagning blir det tyst där, och djuret låter i stället. Därför behövs många tagningar av "Tittut!" och "Borta!".
- **Längre inledning:** *"Hej lammet!"* … *"Ska vi leka tittut?"* … *"Ska du gömma dig?"* … *"Okej, vad kul!"*, med ett nick och ett fniss efter varje fråga.
- **"Var är lammet?" bara en gång** per film. Annars *"Hmm…"* eller tystnad.
- **Djuret låter mer:** ett busigt småljud (`fniss` i data, t.ex. `ba-fniss`) före gömningen, i retningen och efter hoppet.
- **Retningen varierar:** toppen av huvudet, en arm eller ett ben sticker fram över saken. Bakom höga saker (trädet) tittar huvudet, armen eller benet fram från sidan.
- **Inget överlappar fel:** saker och figur ritas i djupordning. Figuren skuttar i en gång framför sakerna, hoppar över låga saker och ner bakom dem, går in från sidan bakom höga, och hoppar fram över saken när den lämnar den.
- **Lugnare:** långsammare skutt och hopp. Kritan ritar varje sak med kritljud, och saken poppar fram med glitter.

### Beslutat 2026-11-07 (QA-rundorna)

- **Längd ca 2:15.** Fem rundor (`varv: 2`, överraskningen i runda 5). Lugnare tempo i stället för fler rundor.
- **Intro:** papperskortet med *"tittut!"*. Bokstäverna poppar in en i taget, **en på varje slag i jingeln** (`assets/ljud/musik/tittut-jingel.m4a`, 3 s, 7 slag = 7 tecken). Röst B säger *"Titut!"* (`roster/tittut/tittut-6.m4a`) med "Ti" och "ut" på slag 4 och 5, och ordet studsar till på sista slaget. Kortet tonar sedan bort mot platsen. Ingen figur bakom ordet, inget kritskrap och inget *"Hej hej!"* i introt.
- **Hej:** figuren skuttar in i närbild. *"Hej kaninen!"* (den gamla tagningen `roster/tittut/<djur>-hej.m4a`) … *"Ska vi leka tittut?"* … *"Okej, vad kul!"*, med nick och fniss.
- **"Var gömmer du dig?" sägs när det stämmer:** är frågan *"Var ska du gömma dig?"* (före) sägs den i inledningen (`gommaForst: true`). Är den *"Var gömmer du dig nu?"* sägs den först när figuren har gömt sig i runda 1.
- **"Borta!" bara varannan runda.** Filen tas ändå varje runda, så att tagningarna följer gömställena i ordning.
- **Bort:** "Var är kaninen?", *"Hmm"*, *"Oj, titta!"*, *"Mm, jag undrar"* och de gamla *"Hej då kaninen!"*-tagningarna. De stack ut bredvid de nya.
- **"Tittut!" i takt med bilden:** repliken startar så att **"ut"** hörs precis när huvudet poppar fram (`UT` i motorn = när "ut" börjar i varje tagning, mätt med whisper). Popljudet ligger på samma ögonblick.
- **Retas två gånger, lugnt:** i varje paus tittar figuren fram två gånger (ca 2,3 s var): först huvudet eller en arm/ett ben, sedan den andra sortens. Ett litet fniss på varje.
- **Tittut med vickande huvud:** när figuren kommer fram vickar den huvudet fram och tillbaka två gånger.
- **Ingen blinkning med ena ögat.**
- **Djurljuden krockar aldrig:** bää och fniss ligger aldrig ovanpå varandra eller i en replik. Långa bää kortas till 1,8 s och tonas ut. Fnisset kommer lite efter rörelsen, inte före.
- **Gången:** figuren rör sig framåt bara i luften och står still vid varje landning (inget glid). Den lutar sig in i skuttet, och benen svänger bakåt vid avstampet och framåt inför landningen.
- **Står den i vägen för en låg sak** ställer den sig uppe på saken, aldrig igenom den. Bakom höga saker (trädet) går den in från sidan.
- **Blommor och gräs i förgrunden** (`assets/bakgrunder/<plats>/<plats>-forgrund.png`) ligger framför figuren.
- **Kameran:** lugn zoom (högst 1,2 i rundorna, 1,35–1,4 i närbilderna), och hela vägen plus allt figuren kan stå uppe på är i bild. Öronen klipps aldrig.
- **Hej då:** figuren skuttar långsamt och studsigt tillbaka till närbilden och studsar glatt på stället medan den vinkar. Kortet fälls ner lugnt och blir slutbilden (10 s för YouTubes slutskärm).
- **Lammets armar** är förstorade 1,35 gånger runt axeln (`armar: 1.35`), annars syntes klövarna knappt.

Det roliga är att hon **kommer tillbaka**, inte att man letar. Barnet vet vad som ska hända och väntar på det. Ingen blundar, ingen räknar och ingen gissar fel.

Serien bygger på samma grund som Gissa teckningen ([`shorts.md`](shorts.md)): korta delade repliker, en paus och en motor som läser en kort datalista per film.

## Jämfört med de andra formaten

| | Tittut | Gissa teckningen | Avsnitten (`regler.md`) |
|---|---|---|---|
| Längd | lång: ca 2:15 (5 rundor). Short: ca 30 s, högst 40 s (runda 1) | ca 23–31 s | 3–4 min |
| Platser | **1** | 1: papperet | max 2 |
| Figurer | **1** | inga | max 3 |
| Gömställen | **3** saker på platsen, samma genom hela filmen | – | – |
| Intro | kortet *"tittut!"* poppar i takt med jingeln, röst B säger *"Titut!"* | *"Gissa teckningen!"* | fast intro |
| Slut | *"Nu är leken slut."*, vinkar, kortet fälls ner: *"Tittut! Hej då!"* | teckningen lämnar bilden | kritirisen och outrot |
| Musik | en instrumental slinga för alla filmer, lågt och jämnt | samma | en sång per avsnitt |
| Röst | berättaren, bara repliker från röstbanken | samma | sång och berättare |
| Bild | lång: 16:9. Short: 9:16 | 9:16 | 16:9 |

Det här bryter mot `regler.md` på samma sätt som Gissa teckningen: ingen berättelse, ingen sång och ingen vardagshandling. Pedagogiken gäller fortfarande. Gömställena är urklipp som hör till platsen (`bakgrunder/skogen.md`) och räknas inte som nya saker.

## Ordningen i en film

1. **Intro (ca 3 s).** Kortet med *"tittut!"*: en bokstav per slag i jingeln, röst B:s *"Titut!"*, kortet tonar bort och sakerna poppar fram med mjukt glitter.
2. **Hej.** Kaninen skuttar in från närmaste kant till fri mark, i närbild, och vinkar. *"Hej kaninen!"* *"Vill du leka tittut?"* (*"Var ska du gömma dig? I skogen?"*) *"Ja, nu leker vi!"*
3. **Fem rundor**, alltid i samma rytm:
   1. Hon skuttar till saken, tittar busigt på barnet och hoppar ner bakom den. *"Borta!"* (varannan runda).
   2. Pausen. Hon retas två gånger: tittar fram lite och duckar igen. Gömstället där hon verkligen är kan skaka en gång (se *Skakningen*).
   3. *"Tittut!"* Hon kommer fram på "ut", vickar på huvudet, låter (`ljud`, varannan runda) och hoppar till. Ibland *"Där är du!"* eller *"Vad busig du är!"*.
4. **Andra varvet** börjar med *"En gång till!"* (runda 4). Överraskningen ligger i runda 5.
5. **Hej då.** Hon skuttar tillbaka till närbilden. *"Nu är leken slut."* Hon studsar och vinkar. Kortet fälls ner, *"tittut!"* skrivs, hon tittar upp bakom ordet en sista gång (*"Tittut! Hej då!"*) och dyker ner. Kortet blir slutbilden.

### Åt vilket håll hon kommer fram

Rytmen är alltid densamma. Det enda som ändras är var hon tittar fram, så att barnet får något nytt att titta efter:

| Runda | Gömställe | Hon kommer fram |
|---|---|---|
| 1 | busken | upp ovanför busken |
| 2 | stenen | ut vid sidan av stenen |
| 3 | stocken | huvudet ut ur ena änden av stocken |

I skogen 2 är det lövhögen (upp ur högen, med löv som yr upp), trädet (ut vid sidan av stammen) och stubben (upp ovanför).

Hon kan någon gång komma fram på ett annat ställe än där hon gömde sig, till exempel bakom stenen fast hon gick ner bakom busken. Det är en liten överraskning, men den används högst en gång per film och aldrig i första rundan.

**Tre gömställen per film**, inte fler. Barnet ska kunna hålla alla i huvudet och titta på dem en i taget. Andra saker på platsen är bara bakgrund.

### Shorten

Alla Shorts har samma längd och samma delar: intro, figuren kommer in, **runda 1** och hej då. Det blir ca 30 s och får aldrig bli över 40 s. Överraskningen är aldrig med, eftersom den aldrig ligger i runda 1. I data: `kort: [0]`.

### Skakningen

Skakningen är en ärlig ledtråd, aldrig en falsk. **Bara gömstället där figuren verkligen är kan skaka**, en gång, mitt i pausen. I en överraskningsrunda är det alltså stället där figuren kommer fram som skakar, inte stället där den gick ner. Inget annat skakar.

Det är valfritt per film och per gömställe (`skakar` i data). Ett barn som har sett att busken skakar när kaninen är där kan lita på det resten av filmen.

## Rörelserna

Byggs en gång i motorn och återanvänds. Figuren ligger **bakom** sakens lager och glider bara upp, ner eller åt sidan. Den vänds aldrig och snurrar inte (se `regler.md`).

| Rörelse | Hur |
|---|---|
| `ner` | figuren glider ner bakom saken tills den är helt dold, ca 0,5 s |
| `upp` | figuren åker upp ovanför saken, lite över målet och tillbaka |
| `sida` | figuren glider ut vid sidan av saken |
| `ur` | huvudet kommer ut ur en öppning (stocken) |
| `skakar` | gömstället där figuren är skakar lite en gång under pausen, valfritt (se *Skakningen*) |
| `retas` | i pausen tittar figuren fram lite och duckar igen, två gånger (huvudet, en arm eller ett ben), med ett kvävt fniss. Görs i varje runda |

Efter *"Tittut!"* vickar figuren på huvudet, gör sitt ljud och hoppar till. Sedan skuttar hon till nästa sak: framåt bara i luften, stilla vid varje landning, uppe på låga saker som står i vägen.

### Klippet under gömstället

Flera figurer är högre än det de gömmer sig bakom, och fötter eller klövar kan synas under en stam eller bredvid en låg sak. Därför är det en grundregel i motorn: **så länge figuren är bakom en sak klipps den bort nedanför sakens klipplinje.** Klipplinjen är sakens överkant (eller kanten på öppningen, för `ur`). Figuren syns bara ovanför linjen, och bara på väg upp eller ut. När den är `ner` syns ingenting, så den är helt borta.

För de flesta saker räknar motorn ut linjen från sakens bild. För saker där det inte går (en sandlåda där figuren ska upp ur sanden, en stam med fri luft under) anges linjen i data med `klipp`.

## Röstbanken

Sakerna nämns aldrig vid namn, så det behövs **ingen ny inspelning** för en ny plats.

**Egen röstmapp per film (gäller sedan 2026-11-07):** `assets/ljud/roster/tittut/<djur>/` med Malins tagningar, klippta till en replik per fil: `hej-hej`, `lek`, `gomma`, `kul`, `borta-1…`, `borta-igen-1…`, `tittut-1…6` (en per runda, i rundornas ordning, de nämner gömstället), `dar-ar-du`, `busig`, `igen`, `jag-sag-nagot`, `slut`, `hej-da`. Finns `tittut-1.m4a` i mappen används den, annars de delade replikerna i `roster/tittut/`. Varje fil spelas högst en gång.

**Andra gömställen, samma djur:** nämner replikerna andra saker än djurets första film, får filmen en egen mapp med `rost` i data (t.ex. `roster/tittut/kanin-svamp/`, där busken-raderna är omgjorda till svampen). Övriga filer kopieras från djurets mapp, och tittut-tiderna läggs i `UT` under den nya mappen.

**En sak nära kameran:** en sak vars fotpunkt ligger längre ner än `start` står framför gången. Figuren går bakom den (bara öronen syns) i stället för framför (skogen-gron: stocken).

**Delade:** röst B:s *"Titut!"* i introt (`roster/tittut/tittut-6.m4a`) och *"Hej kaninen!"* / *"Hej lammet!"* (`roster/tittut/<djur>-hej.m4a`).

**När en ny tittut-tagning läggs in** mäts var "ut" börjar (whisper med ordtider) och läggs i `UT` i `tittut.js`, annars hamnar ordet fel mot bilden.

**Figurens ljud** när den kommer fram är en egen ljudeffekt per figur, satt med `ljud` i data: kaninen `fniss`, lammet `ba`, kon `mu`, leoparden `spinn`, lejonet `lejon-skratt`. Det är aldrig ord, så det säger inget namn. Alla repliker med filnamn, vad som redan finns och vad som saknas står i [`produktion/youtube/tittut/ljud-att-gora.md`](../produktion/youtube/tittut/ljud-att-gora.md).

## Musik och "Tittut!"

- **Bädden:** en instrumental slinga från Suno, lekfull men inte stressig, gemensam för alla filmer. Den blir tystare under pausen, så att spänningen hörs.
- **Platsljudet:** varje plats har ett eget ljud lågt under hela filmen. Skogen: `assets/ljud/effekter/skogsljud/skogsljud-1.m4a` (60 s, går runt).
- **Jingeln:** `assets/ljud/musik/tittut-jingel.m4a` under introt. Slagen (0,05 0,29 0,43 0,86 1,14 1,30 1,57 s) står i `SLAG` i motorn. Byts jingeln mäts slagen om.
- **"Tittut!" är talat** av berättaren, inte sjunget. Det sägs glatt och lite överraskat, med en liten paus mellan "Titt" och "ut".

## Teman

Platser och saker som delvis redan finns i `bakgrunder/` och `rekvisita/`:

| Tema | Gömställen |
|---|---|
| Skogen ([`bakgrunder/skogen.md`](../bakgrunder/skogen.md)) | skogen 1: buske, sten, stock. Skogen 2: lövhög, träd, stubbe |
| Hemma | gardin, soffa, låda, täcke |
| Bondgården | höstack, ladugårdsdörr, vagn, tunna |
| Lekplatsen | rutschkana, sandlåda, buske, gunga |

Figurer: de som har referensark (Kaninen Kanel, Katten Kaj, Kon Kajsa, Lejonet Lage, Leoparden Lova).

## Pedagogik

1. **Objektpermanens.** Det som inte syns finns kvar. Barnet får se det om och om igen, och det är kärnan i leken.
2. **Förutsägbar rytm.** Borta, paus, tittut, varje gång. Barnet lär sig rytmen och kan säga "tittut" själv.
3. **En sak i taget.** Under pausen står allt stilla, utom gömstället där figuren är, som kanske skakar lite.
4. **Kort spänning.** Pausen är upp till ca 3,5 s, med en retsam titt i mitten. Figuren kommer alltid tillbaka.
5. **Delaktighet.** Barnet hinner säga "tittut" själv i pausen. Ingen ber barnet att blunda.
6. **Inget läskigt.** Figuren är alltid glad när den kommer fram. Ingen skräms, inget "bu!".

## Så byggs det (förslag)

Som Gissa teckningen: en motor och en kort datalista per film.

- `produktion/youtube/tittut/tittut.js`: motorn med platsen, lagren (saken framför figuren), rörelserna, timingen från ljudfilernas längd och förhandsvisningen.
- `produktion/youtube/tittut/<tema>/<figur>/index.html`: en film, bara data.

### Dataformatet

Alla filmer använder exakt det här formatet. Fält som inte står här läggs inte till i en film. Behövs något nytt ändras formatet här först, så att motorn och alla planer följer samma sak.

```js
tittut({
  plats: 'skogen',              // mappnamn i bakgrunder/
  figur: 'kaninen-kanel',       // mappnamn i karaktarer/ (bara internt, sägs aldrig)
  ljud: 'fniss',                // figurens ljud när den kommer fram
  hojd: 450,                    // figurens höjd i bild, px i 1920 × 1080
  start: [820, 770],            // var figuren stannar när den har kommit in
  saker: {                      // exakt 3, [x, y] = sakens fotpunkt i 1920 × 1080
    buske: [400, 755],
    sten:  [960, 785],
    stock: [1495, 800, { klipp: 705 }],  // valfritt: egen klipplinje (y)
    // { hel: true }  valfritt: hela saken döljer, också delar som inte når marken (gunganden: benen syntes bredvid fjädern)
    // { gom: -63 }   valfritt: figuren gömmer sig så många px åt sidan från bildens mitt (stöveln: bakom skaftet, inte tån)
    // { vick: 5 }    valfritt: saken gungar så många grader kring fotpunkten när figuren gömmer sig, skakar och kommer fram (gunganden)
  },
  rundor: [                     // fem rundor; [sak, rörelse] eller [sak, rörelse, kommerFramVid]
    ['buske', 'upp'],
    ['sten', 'sida'],
    ['stock', 'ur'],
    ['buske', 'sida'],
    ['sten', 'upp', 'buske'],   // överraskningen, aldrig i runda 1
  ],
  skakar: ['buske'],            // vilka saker som får skaka när figuren verkligen är där
  varv: 2,                      // varv i rundlistan ("En gång till!" när ett nytt varv börjar)
  gommaForst: true,             // valfritt: gomma-repliken är en fråga före gömmandet och sägs i inledningen
  armar: 1.35,                  // valfritt: förstora figurens armar runt axeln (lammet)
  retas: 'huvud',              // valfritt: bara huvudet tittar fram i pauserna, armarna intill kroppen bakom saken; ögonen precis över kanten
  // retas: 'fot'               // valfritt: som 'huvud', men andra kiken är en fot som sticker fram och sprattlar (Hugo)
  // retas: 'oron'              // valfritt: som 'huvud', men första kiken är bara öronspetsarna som vickar (kaninen på lekplatsen)
  fotSkala: 2.0,                // valfritt: hur stor foten eller armen är när den sticker fram (standard 2,0, lammets små klövar)
  smyg: true,                   // valfritt: smyger på tå till gömstället: hukar, lyfter fötterna högt, tittar mot barnet, ljudet smyg (Hugo)
  glad: true,                   // valfritt: högt glädjehopp efter tittut, svansen viftar fort när figuren är glad, ljudet svansvift (Hugo)
                                // smyg/glad ger också ljuden nos (vid gömstället), vov-pip (vid varannan tittut) och flamt-valp (efter hoppet); glad ger öppna ögon när figuren pratar och ett tydligare vink
  svansKik: true,               // valfritt: i rundan med "Jag ser en liten svans…" sticker svansen upp ur gömstället (Hugo)
  figurKant: false,             // valfritt: bara figurens inbakade kant, utan kodkantens 3 px (tunnare)
  platsVol: 1.1,                // valfritt: platsljudets volym (0,5 om inget anges)
  bortaVarje: true,             // valfritt: borta-repliken sägs varje runda (annars varannan); för filmer med eget manus där varje borta nämner gömstället
  darVarje: true,               // valfritt: "Där är du ju!" också efter fjärde rundan, så att dar-ar-du-2 används
  retasSkala: 0.7,              // valfritt: kikarna kortare (0,7 = 30 % kortare) där inget sägs; rundan med "Jag ser…" behåller full tid
  hejdaDjur: true,              // valfritt: "Hej då hunden!" (roster/tittut/<djur>-hejda.m4a) som första hej då, filmens hej-da-tagning på slutkortet
  hoppaHem: true,               // valfritt: sista hoppet (från en hög saks topp) landar direkt där hej var, i stället för bredvid saken och en promenad dit
  svans: -60,                   // valfritt: svansens vinkel när figuren är gömd (v2-figurer med svans)
  ben: 0.4,                     // valfritt: skala benens sving i hoppen (v2-figurer, så att benroten inte syns)
  gang: true,                   // valfritt: v2-gång (benen saxar, foten lyfts, armarna pendlar) i stället för skutt, och hopp-posen (armarna ut, fötterna upp, glad)
  kant: 1,                      // valfritt: kommer in och går ut på den sidan (1 höger, −1 vänster), annars närmaste kant
  mjukaSteg: true,              // valfritt: mjuka ljud för små tassar: tass, hopp-mjuk och landa-mjuk i stället för steg, hupp och duns
  munTid: 1.3,                  // valfritt: hur länge munnen är öppen när djurljudet spelas (standard 0,75 s; längre för hej-babbel)
  ja: 'ja-babbel',              // valfritt: ljudet när djuret nickar ja på frågorna i inledningen (annars fniss)
  rost: 'kanin-svamp',          // valfritt: egen röstmapp i roster/tittut/ (annars djurets mapp), när gömställena har andra namn
  kort: [0],                    // Shorten: alltid runda 1
});
```

Rörelserna i `rundor` är bara de i tabellen under *Rörelserna*. En ny rörelse läggs till där först.

Den långa filmen och Shorten görs av samma data (se *Shorten*).

## Arbetsflöde för en ny film

1. **Data:** kopiera en befintlig film till `produktion/youtube/tittut/<plats>/<djur-namn>/index.html` och ändra `plats`, `figur`, `ljud`, `start`, `saker` och `rundor`. Förgrunden (`<plats>-forgrund.png`) skärs ur bakgrundsplattan om platsen har gräs eller blommor framför figuren.
2. **Manus till Malin:** en replik per rad i rundornas ordning (se [`rost-prompter.md`](../produktion/youtube/tittut/rost-prompter.md)). Tittut-replikerna nämner gömstället, så ordningen måste följa `rundor`.
3. **Klipp tagningarna:** transkribera med whisper (`-l sv`, och `-ml 1 -sow` för ordtider), dela vid pauserna, trimma tystnad, en fil per replik i `assets/ljud/roster/tittut/<djur>/`. Lyssna att varje fil säger rätt sak.
4. **Mät "ut"** i varje `tittut-N` och lägg tiderna i `UT` i `tittut.js`.
5. **Kontrollera timingen** (inga krockar, längden): rita stillbilder med `node avsnitt/004-bussen-badar/scener/render.mjs <mapp> 12 30.5 …` (blir `<mapp>/stills/sheet.jpg`). Titta särskilt på: öron i bild, figuren aldrig genom en sak, armarna sitter fast.
6. **Förhandsvisning:** `node avsnitt/004-bussen-badar/scener/render.mjs <mapp>` (vanlig kvalitet, flera filmer kan renderas samtidigt). Skicka för QA.
7. **Slutversion:** samma kommando med `--kvalitet` (PNG-rutor, x264 slow crf 15, ca dubbelt så långsamt). Bara när filmen är godkänd.
8. **Ljudeffekter** som saknas står i [`ljud-att-gora.md`](../produktion/youtube/tittut/ljud-att-gora.md). Varje effekt är en familj `assets/ljud/effekter/<n>/<n>-1…9.m4a` utan hål i numreringen; en tagning som tas bort flyttas till `effekter/_borttagna/` och resten numreras om.

## Att bestämma innan första filmen

- [x] "Tittut!" är talat (beslutat 2026-11-06).
- [x] Första filmen är Kaninen Kanel i skogen (beslutat 2026-11-06).
- [x] Riktig tittut i stället för kurragömma: inget blunda, ingen räkning, inga falska ledtrådar (beslutat 2026-11-06).
- [ ] Ska den långa versionen och Shorten göras samtidigt, eller bara Shorten först?
