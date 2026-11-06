# Tittut – Leoparden Lova på lekplatsen (plan)

**Status:** plan, inget byggt. Skriven 2026-11-06 utifrån utkastet i [`format/tittut.md`](../../../../../format/tittut.md).

En figur, en plats, tre gömställen. Lova är snabb och glad ([`karaktarer/leoparden-lova.md`](../../../../../karaktarer/leoparden-lova.md), ✅ låst), så hon passar för en lekplats.

## Gömställena: vilka tre och varför

Kandidaterna i `format/tittut.md` är rutschkana, sandlåda, buske och gunga. En sak duger bara som gömställe om Lova kan försvinna **helt** bakom den.

| Runda | Gömställe | Hon kommer fram | Varför |
|---|---|---|---|
| 1 | **busken** | `upp`: upp ovanför busken | Rund, mjuk och tät, och samma rörelse som Kanels första runda i skogen. Första rundan ska vara den enklaste. Skogens buske (`assets/bakgrunder/skogen-saker/buske.png`) kan troligen återanvändas rakt av. |
| 2 | **rutschkanan** | `sida`: ut vid sidan | Det alla barn känner igen från lekplatsen. **Men den gula rutschkanan är genomskinlig** (stege med pinnar och en smal ränna), så Lova skulle synas genom den. Det krävs en rutschkana med en hel, tät del att gömma sig bakom, se frågorna. |
| 3 | **sandlådan** | `ur`: huvudet upp ur sanden | Roligast till sist: hon sjunker ner i sanden och huvudet kommer upp med lite sand som yr. Sandkornen är dekoration i kod, som löven i skogen 2. Ljudet `sand` finns redan. |

**Gungan väljs bort.** Den är en öppen ram med rep, så det finns inget att gömma sig bakom. Den kan stå stilla i bakgrunden som en vanlig sak på platsen, eller utelämnas.

Ordningen går från vänster till höger, så Lova glider åt samma håll hela filmen och barnet kan följa henne med blicken.

## Filmens ordning

Tiderna är ungefärliga. Den riktiga timingen räknas fram av motorn ur ljudfilernas längd.

| # | Del | Vad som händer | Replik | Ca tid |
|---|---|---|---|---|
| 1 | Intro | Kritan ritar snabbt lekplatsen: väggen, golvet, busken, rutschkanan och sandlådan. | *"Tittut!"* | 4 s |
| 2 | Lova kommer in | Hon glider in från vänster, stannar bredvid busken och vinkar. | *"Hej leoparden!"* | 4 s |
| 3a | Runda 1, busken | Glider ner bakom busken. | *"Borta!"* | 1,5 s |
| | | Paus. Allt står still, busken kan skaka lite en gång (`skakar`). | *"Var är leoparden?"* mitt i pausen | 2,5 s |
| | | Hon åker upp ovanför busken (`upp`), fniss och ett litet hopp. | *"Tittut!"* | 2,5 s |
| | | Glider fram till rutschkanan. | – | 2 s |
| 3b | Runda 2, rutschkanan | Glider ner bakom den täta delen. | *"Borta!"* | 1,5 s |
| | | Paus. Inget skakar (rutschkanan är hård). | *"Var är leoparden?"* | 2,5 s |
| | | Glider ut vid sidan (`sida`), fniss och hopp. | *"Tittut!"* | 2,5 s |
| | | Glider fram till sandlådan. | – | 2 s |
| 3c | Runda 3, sandlådan | Sjunker ner i sanden, lite sand yr (`sand`). | *"Borta!"* | 1,5 s |
| | | Paus. Sanden ligger still. | *"Var är leoparden?"* | 2,5 s |
| | | Huvudet kommer upp ur sanden (`ur`), sand yr, sedan hela Lova upp, fniss och hopp. | *"Tittut!"* | 3 s |
| 4 | Tassarna | Närbild, Lova mot barnet. Tassarna framför ögonen, paus 2 s, tassarna ut åt sidorna. 3 gånger. | *"Var är leoparden?"* … *"Tittut!"* | 3 × 6 s = 18 s |
| 5 | Hej då | Lova vinkar. | *"Hej då!"* | 4 s |

**Totalt ca 60 s** (formatet säger 1–1,5 min för den långa). Shorten är del 1, 2, runda 1, tassarna och hej då, ca 40 s.

Ingen överraskning (att hon kommer fram på ett annat ställe) i den här filmen. Lekplatsen är ny, så alla tre rundorna får vara raka.

## Data

Positionerna är grova och gäller i 1920×1080 med golvlinjen på ca 66 % (y ≈ 713), som skogen. Jag har antagit att `[x, y]` är sakens **mitt i x och nederkant i y** (där den står på golvet). Det är inte bestämt i formatet än, så motorn får avgöra.

```js
tittut({
  plats: 'lekplatsen',
  figur: 'leoparden-lova',
  saker: {
    buske:      [400, 760],   // ca 520 × 360, vänster
    rutschkana: [980, 740],   // ca 600 × 420, mitten, lite längre bak
    sandlada:   [1520, 820],  // ca 620 × 260, höger, närmast barnet
  },
  rundor: [
    ['buske', 'upp'],
    ['rutschkana', 'sida'],
    ['sandlada', 'ur'],
  ],
  tassar: 3,
  kort: [0],
});
```

- Lova bör vara ungefär lika stor som Kanel: ca 380–400 px hög i bild.
- Sandlådan ligger lägst och närmast. Den är så låg att Lova inte får plats bakom den stående. Hon måste sjunka **under** framkantens överkant, så motorn behöver klippa bort henne nedanför den linjen (som golvklippet bakom busken, bara högre upp).
- Rutschkanans `sida`: hon tittar fram på den sida som vetter mot sandlådan (höger), så nästa glid blir kort.

## Saknas

**Platsen**
- [ ] `bakgrunder/lekplatsen.md` och bakgrundsbilden. Görs tillsammans med Sanna. Förslag på vad den behöver, i samma stil som skogen:
  - Nästan tom bakgrund: vägg upptill, ljust golv nedtill, golvlinje på ca 66 %. Mitten tom, eftersom gömställena är egna urklipp.
  - **Väggfärg som inte är gul eller sandfärgad**, så att Lova (`#EFCB7A`) syns. Ljust himmelsblått passar, eller mintgrönt om skogens känsla ska gå igen.
  - Bara antydan om en lekplats längst ut vid kanterna: ett staket, en avlägsen gunga eller ett träd, blekt och med låg kontrast.
  - Golvet kan vara ljust grus eller samma benvita som skogen, med några grästuvor vid kanterna.
- [ ] Platsljud för lekplatsen, lågt och 60 s som går runt. Det finns inget nu (`fagelkvitter` finns, men är korta ljud). Förslag till ElevenLabs SFX: `a calm quiet park playground, soft distant birdsong, a gentle breeze in the trees, now and then a swing creaking softly far away, no children's voices, no music, no talking`. Utan barnröster, så att berättaren inte får konkurrens.

**Urklippen (gömställena)**
- [ ] **Busken.** Troligen ingen ny bild: återanvänd skogens `buske.png`. Om busken ska höra till lekplatsen behöver den nämnas i `bakgrunder/lekplatsen.md`.
- [ ] **Rutschkanan.** Ny bild behövs. `rekvisita/rutschkana-gul.md` och vattenrutschbanan i `rekvisita/rutschkana.md` är båda öppna, så Lova syns igenom. Se fråga 1.
- [ ] **Sandlådan.** `rekvisita/sandlada.md` finns (`assets/rekvisita/sandlada/cut/sandlada.png`). Den spårades från Gissa teckningen, så stilen och kanten bör jämföras med skogens saker (`vita-kanter`). Motorn behöver också linjen för framkantens överkant, eller sandlådan delad i två lager (sanden bakom Lova, framplankan framför).

**Figuren**
- [ ] **Lovas `tassar`-pose.** Hennes armar är egna delar med vridpunkter i `assets/karaktarer/leoparden-lova/leoparden-lova-rigg-lemmar.json`, så själva rörelsen kan göras i kod som Kanels. Men armarna är små stumpar: axeln sitter vid ca (206, 578) och spetsen vid (104, 672) i 1024-bilden, alltså bara ca 140 px långa. De når troligen inte upp till ögonen. Det måste provas först. Räcker de inte behövs längre armar för just den här posen, och det är hennes **en nya pose**. Figuren är låst, så det görs bara om Sanna säger ja.
- [ ] Lovas fniss. `fniss` är Kanels. Lova har ett "litet morrande spinn", och `spinn` finns redan bland effekterna. Se fråga 3.

**Röster** (`assets/ljud/roster/tittut/`, se [`ljud-att-gora.md`](../../ljud-att-gora.md))
- [ ] `leopard-hej.m4a`: `[excited] Hej leoparden!`
- [ ] `leopard-var.m4a`: `[curious] Var är leoparden?`
- [ ] De delade `borta-1` och `hej-da-1` saknas också, men görs redan till Kanels film.

**Ljudeffekter**
- `sand` (finns): när hon sjunker ner i sandlådan och när hon kommer upp.
- `prassel-buske` (står redan på listan till Kanels film): när busken skakar.
- `swoosh`, `pop`, `duns` (finns).

## Idéer och frågor till Sanna

1. **Vilken rutschkana att gömma sig bakom?** Den gula är för öppen. Tre förslag:
   - **Rutschkana i en kulle:** en rund grön gräskulle med en gul rutschkana nerför framsidan, som på många svenska lekplatser. Mjuk, tät och trygg, och Lova tittar fram vid sidan av kullen. Min favorit.
   - **Rutschkana med ett litet torn:** som den gula, men stegen ersätts av ett tätt trätorn med vägg.
   - **Byt ut rutschkanan** mot något annat tätt på lekplatsen, till exempel en lekstuga. Då är det inte längre en av kandidaterna i formatet.
2. **Får busken komma från skogen?** Det sparar en bild, och samma buske på två platser känns bara bekant för barnet.
3. **Fniss eller spinn?** Ska Lova få ett eget ljud när hon tittar fram (`spinn`, hennes morrande spinn), eller delar alla figurer på `fniss`? Ett eget ljud per figur gör henne mer till sig själv.
4. **Sanden och Lova har nästan samma färg.** När bara huvudet syns ur sandlådan kan hon smälta in. Sanden kan göras ljusare och kallare, eller så får prickarna och den vita kanten bära henne. Det bör provas med en stillbild innan rundan byggs.
5. **Svansen.** Lova har en lång svans med krok. En svansspets som syns ovanför busken i pausen vore en klassisk tittut-ledtråd, men formatet säger att inget rör sig och att hon är helt borta. Jag har inte tagit med den. Ska den provas i någon runda?
6. **Gungan i bakgrunden?** `gunga-bla` finns som urklipp. Den kan stå stilla till höger eller vänster som "lekplatsmärke". Den får inte röra sig under pauserna.
7. **"Vips! Där var jag!"** är Lovas replik, men i Tittut pratar bara berättaren. Jag har inte använt den.
