# Tittut – en serie för små barn

**Status:** utkast, inget byggt än. Omskrivet 2026-11-06 från kurragömma (blunda, räkna, leta, gissa fel) till riktig tittut.

En figur försvinner och kommer tillbaka, om och om igen. Kanel glider ner bakom busken, berättaren säger *"Borta!"*, det blir tyst och spännande en kort stund och så: *"Tittut!"* Hon kommer fram, fnissar och hoppar till. Samma sak bakom stenen och stocken. Sist gör Kanel tittut med tassarna framför ögonen, och barnet härmar.

Det roliga är att hon **kommer tillbaka**, inte att man letar. Barnet vet vad som ska hända och väntar på det. Ingen blundar, ingen räknar och ingen gissar fel.

Serien bygger på samma grund som Gissa teckningen ([`shorts.md`](shorts.md)): korta delade repliker, en paus och en motor som läser en kort datalista per film.

## Jämfört med de andra formaten

| | Tittut | Gissa teckningen | Avsnitten (`regler.md`) |
|---|---|---|---|
| Längd | lång: ca 1–1,5 min (3 rundor + tassarna). Short: ca 30 s, högst 40 s (runda 1 + tassarna 2 gånger) | ca 23–31 s | 3–4 min |
| Platser | **1** | 1: papperet | max 2 |
| Figurer | **1** | inga | max 3 |
| Gömställen | **3** saker på platsen, samma genom hela filmen | – | – |
| Intro | *"Tittut!"* (talat) medan kritan ritar platsen | *"Gissa teckningen!"* | fast intro |
| Slut | Kanel gör tittut med tassarna, *"Hej då!"* | teckningen lämnar bilden | kritirisen och outrot |
| Musik | en instrumental slinga för alla filmer, lågt och jämnt | samma | en sång per avsnitt |
| Röst | berättaren, bara repliker från röstbanken | samma | sång och berättare |
| Bild | lång: 16:9. Short: 9:16 | 9:16 | 16:9 |

Det här bryter mot `regler.md` på samma sätt som Gissa teckningen: ingen berättelse, ingen sång och ingen vardagshandling. Pedagogiken gäller fortfarande. Gömställena är urklipp som hör till platsen (`bakgrunder/skogen.md`) och räknas inte som nya saker. Tassarna för ögonen är figurens **en nya pose**.

## Ordningen i en film

1. **Intro.** Berättaren säger *"Tittut!"* medan kritan snabbt ritar platsen: skogen med busken, stenen och stocken.
2. **Kanel kommer in** från sidan och vinkar. *"Hej kaninen!"*
3. **Tre rundor**, en per gömställe, alltid i samma rytm:
   1. Kanel står bredvid saken. Hon glider ner bakom den och är borta. *"Borta!"*
   2. Paus, 2–3 s. Tyst och spännande. Inget rör sig, utom att gömstället där figuren verkligen är kan skaka lite en gång (se *Skakningen*).
   3. Mitt i pausen: *"Var är kaninen?"*
   4. *"Tittut!"* Hon kommer fram, gör figurens ljud (`ljud`) och ett litet hopp.
4. **Tassarna.** Närbild, Kanel vänd mot barnet. Hon lyfter tassarna framför ögonen. *"Var är kaninen?"* Paus i 2 s. Tassarna åker ut åt sidorna. *"Tittut!"* Figurens ljud. Samma sak 2–3 gånger (2 i Shorten).
5. **Hej då.** Kanel vinkar. *"Hej då!"*

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

Alla Shorts har samma längd och samma delar: intro, figuren kommer in, **runda 1**, **tassarna 2 gånger** och hej då. Det blir ca 30 s och får aldrig bli över 40 s. Överraskningen är aldrig med, eftersom den aldrig ligger i runda 1. I data: `kort: [0]`, och tassarna blir 2 i Shorten oavsett vad `tassar` säger för den långa filmen.

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
| `tassar` | armarna lyfts från sidorna upp framför ansiktet och tillbaka ut, med de vanliga armarna (bara vridning, ingen förlängning). Når de inte ögonen är det kinderna som gäller: kaninens korta armar når kinderna, och så får det vara (beslutat 2026-11-06). Armarna ritas framför kroppen medan tassarna är uppe |

Efter *"Tittut!"* står figuren kvar och gör sitt ljud. Sedan glider hon fram till nästa sak.

### Klippet under gömstället

Flera figurer är högre än det de gömmer sig bakom, och fötter eller klövar kan synas under en stam eller bredvid en låg sak. Därför är det en grundregel i motorn: **så länge figuren är bakom en sak klipps den bort nedanför sakens klipplinje.** Klipplinjen är sakens överkant (eller kanten på öppningen, för `ur`). Figuren syns bara ovanför linjen, och bara på väg upp eller ut. När den är `ner` syns ingenting, så den är helt borta.

För de flesta saker räknar motorn ut linjen från sakens bild. För saker där det inte går (en sandlåda där figuren ska upp ur sanden, en stam med fri luft under) anges linjen i data med `klipp`.

## Röstbanken

Sakerna nämns aldrig vid namn, så det behövs **ingen ny inspelning** för en ny plats.

**Delade repliker**, upp till fem varianter av varje (varje film får samma variantnummer via en hash av mappnamnet, och om en variant saknas används en annan som finns):

1. "Borta!"
2. "Tittut!"
3. "Hej då!"

**Per figur**, inspelade en gång och sedan återanvända i alla filmer:

1. "Hej kaninen!"
2. "Var är kaninen?"

**Figurens ljud** när den kommer fram är en egen ljudeffekt per figur, satt med `ljud` i data: kaninen `fniss`, lammet `ba`, kon `mu`, leoparden `spinn`, lejonet `lejon-skratt`. Det är aldrig ord, så det säger inget namn. Alla repliker med filnamn, vad som redan finns och vad som saknas står i [`produktion/youtube/tittut/ljud-att-gora.md`](../produktion/youtube/tittut/ljud-att-gora.md).

## Musik och "Tittut!"

- **Bädden:** en instrumental slinga från Suno, lekfull men inte stressig, gemensam för alla filmer. Den blir tystare under pausen, så att spänningen hörs.
- **Platsljudet:** varje plats har ett eget ljud lågt under hela filmen. Skogen: `assets/ljud/effekter/skogsljud/skogsljud-1.m4a` (60 s, går runt).
- **"Tittut!" är talat** av berättaren, inte sjunget. Det sägs glatt och lite överraskat, med en liten paus mellan "Titt" och "ut".

## Teman

Platser och saker som delvis redan finns i `bakgrunder/` och `rekvisita/`:

| Tema | Gömställen |
|---|---|
| Skogen ([`bakgrunder/skogen.md`](../bakgrunder/skogen.md)) | skogen 1: buske, sten, stock. Skogen 2: lövhög, träd, stubbe |
| Hemma | gardin, soffa, låda, täcke |
| Bondgården | höstack, ladugårdsdörr, vagn, tunna |
| Lekplatsen | rutschkana, sandlåda, buske, gunga |

Figurer: de som har referensark (Kaninen Kanel, Katten Kaj, Kon Kajsa, Lejonet Lage, Leoparden Lova). Varje ny figur behöver tassarna som sin nya pose.

## Pedagogik

1. **Objektpermanens.** Det som inte syns finns kvar. Barnet får se det om och om igen, och det är kärnan i leken.
2. **Förutsägbar rytm.** Borta, paus, tittut, varje gång. Barnet lär sig rytmen och kan säga "tittut" själv.
3. **En sak i taget.** Under pausen står allt stilla, utom gömstället där figuren är, som kanske skakar lite.
4. **Kort spänning.** Pausen är 2–3 s, inte längre. Figuren kommer alltid tillbaka.
5. **Delaktighet genom att härma.** I slutet gör Kanel tittut med tassarna. Barnet ser hela tiden skärmen och härmar av sig självt. Ingen ber barnet att blunda.
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
  },
  rundor: [                     // en per sak; [sak, rörelse] eller [sak, rörelse, kommerFramVid]
    ['buske', 'upp'],
    ['sten', 'sida'],
    ['stock', 'ur'],            // t.ex. ['stock', 'upp', 'buske'] = överraskningen, aldrig i runda 1
  ],
  skakar: ['buske'],            // vilka saker som får skaka när figuren verkligen är där
  tassar: 3,                    // den långa filmen: 2–3. Shorten har alltid 2
  kort: [0],                    // Shorten: alltid runda 1
});
```

Rörelserna i `rundor` är bara de i tabellen under *Rörelserna*. En ny rörelse läggs till där först.

Den långa filmen och Shorten görs av samma data (se *Shorten*).

## Att bestämma innan första filmen

- [x] "Tittut!" är talat (beslutat 2026-11-06).
- [x] Första filmen är Kaninen Kanel i skogen (beslutat 2026-11-06).
- [x] Riktig tittut i stället för kurragömma: inget blunda, ingen räkning, inga falska ledtrådar (beslutat 2026-11-06).
- [ ] Ska den långa versionen och Shorten göras samtidigt, eller bara Shorten först?
