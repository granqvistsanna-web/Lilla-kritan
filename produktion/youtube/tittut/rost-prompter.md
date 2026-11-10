# Tittut – röstprompter att klistra in

ElevenLabs, **Eleven v3**, samma berättarröst som Gissa teckningen: stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9.
Filerna läggs i `assets/ljud/roster/tittut/` (eller i Hämtade filer, så sorterar Claude in dem). Fullständig lista med status: [`ljud-att-gora.md`](ljud-att-gora.md).

Djuren kallas alltid vad de är, aldrig vid namn.

## De andra djuren (lammet, kon, leoparden, lejonet)

Allt annat delas med kaninens film, och `-hej` och `-var` finns redan. Det som saknas är bara hej då. Klistra in hela blocket och generera i en tagning:

```
[warm] Hej då lammet!

[warm] Hej då kon!

[warm] Hej då leoparden!

[warm] Hej då lejonet!
```

Dela med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/tittut/djur-hejda.txt`.

## Saknas 2026-11-07

**Röst, en tagning** (klistra in i ett svep; filnamnen i samma ordning står i [`tagning-3.txt`](tagning-3.txt)). Filmen börjar med "Hej hej!" och är tyst där tills filen finns.

```
[excited] Hej hej!
[happy] Hej hej!
[playful] Hej hej hej!
```

**Ljudeffekter (ElevenLabs Sound Effects, 1–2 s, en per tagning).** Lammet: `assets/ljud/effekter/ba/` och `ba-fniss/`. Kaninen: `fniss/`. Utan `ba-fniss` fnissar lammet inte alls (inget extra bää).

```
ba-5        A happy, short baby lamb bleat, cute and soft, "baa", close mic, no background
ba-6        A cheeky little lamb bleat that rises at the end, playful, close mic, no background
ba-7        A tiny surprised baby lamb "baa!", short and bright, close mic, no background
ba-8        A long, wobbly, giggly baby lamb bleat, "baa-aa-aa", cute, close mic, no background
ba-fniss-1  A baby lamb giggling, soft trembling "heh-heh" bleats, cheeky and cute, close mic, no background
ba-fniss-2  A muffled little lamb giggle, as if hiding behind leaves, soft and playful, no background
ba-fniss-3  A short cheeky lamb snicker, tiny bleat-laugh, cute cartoon style, close mic, no background
fniss-4     A tiny cartoon bunny giggle, quick "hee-hee", high and soft, close mic, no background
fniss-5     A muffled little bunny snicker, as if hiding behind a bush, playful, no background
fniss-6     A short cheeky cartoon giggle "hoho", small and warm, close mic, no background
fniss-7     A bright surprised little laugh "hihi!", toddler cartoon style, close mic, no background
```

**Musik (Suno), `assets/ljud/musik/tittut-bad.m4a`**, gemensam för alla Tittut-filmer. Hela prompten (instrumental, klistra in i Suno som den är):

```
Style: gentle playful toddler instrumental, ukulele, glockenspiel, soft pizzicato strings, light hand claps, warm and bouncy, 100 bpm, major key, simple repeating melody, cozy, no drums, no vocals, seamless loop
Lyrics: [Instrumental]
Title: Tittut-bädden
```

Exportera, klipp en jämn slinga på 30–60 s och spara som `assets/ljud/musik/tittut-bad.m4a`. Motorn spelar den lågt under hela filmen.

## Nytt 2026-11-07: inledningen och fler tagningar

En film använder **varje fil bara en gång**. En film har 9 rundor, så "Tittut!" och "Borta!" behöver många tagningar. Saknas en ny tagning blir det tyst där (och djuret låter i stället).

Raderna (med filnamn och känsla) står i filmens manus: [`skogen/kaninen-kanel/manus.md`](skogen/kaninen-kanel/manus.md). Det är den lista som gäller; äldre förslag längre ner med samma filnamn ersätts av manuset.


**Ljudeffekter (ElevenLabs Sound Effects, 1–2 s, en per tagning):** läggs i `assets/ljud/effekter/ba/` och `assets/ljud/effekter/ba-fniss/`.

```
ba-5        A happy, short baby lamb bleat, cute and soft, "baa", close mic, no background
ba-6        A cheeky little lamb bleat that rises at the end, playful, close mic, no background
ba-7        A tiny surprised baby lamb "baa!", short and bright, close mic, no background
ba-8        A long, wobbly, giggly baby lamb bleat, "baa-aa-aa", cute, close mic, no background
ba-fniss-1  A baby lamb giggling, soft trembling "heh-heh" bleats, cheeky and cute, close mic, no background
ba-fniss-2  A muffled little lamb giggle, as if hiding behind leaves, soft and playful, no background
ba-fniss-3  A short cheeky lamb snicker, tiny bleat-laugh, cute cartoon style, close mic, no background
```

## Nytt: repliker som gör talet mindre upprepat (2:30-filmerna)

Alla är valfria. Motorn hoppar över en replik som saknas, så filmen funkar redan nu och blir bättre för varje fil som kommer in.

```
lek-1            [warm] Ska vi leka tittut?
igen-1           [excited] En gång till!
igen-2           [playful] Igen!
borta-igen-1     [playful] Borta igen!
borta-igen-2     [whispers] Borta igen…
jag-sag-nagot-1  [whispers] Jag såg något…
dar-ar-du-1      [excited] Där är du!
dar-ar-du-2      [laughs] Där är du ju!
busig-1          [laughs] Vad busig du är!
busig-2          [playful] Busigt!
slut-1           [warm] Nu är leken slut.
hej-da-1         [warm] Hej då!
hej-da-5         [warm] Hej hej!
kanin-hejda      [warm] Hej då kaninen!
lamm-hejda       [warm] Hej då lammet!
ko-hejda         [warm] Hej då kon!
leopard-hejda    [warm] Hej då leoparden!
lejon-hejda      [warm] Hej då lejonet!
```

Gör gärna 2–3 tagningar av samma rad och spara som `-1`, `-2`, `-3`: motorn turas om mellan dem.

## Först: det här behöver första filmen (kaninen i skogen)

```
borta-1       [whispers] Borta!
kanin-hej     [excited] Hej kaninen!
kanin-var     [curious] Var är kaninen?
```

## De andra fyra djuren

```
lamm-hej      [excited] Hej lammet!
lamm-var      [curious] Var är lammet?
ko-hej        [excited] Hej kon!
ko-var        [curious] Var är kon?
leopard-hej   [excited] Hej leoparden!
leopard-var   [curious] Var är leoparden?
lejon-hej     [excited] Hej lejonet!
lejon-var     [curious] Var är lejonet?
```

## Fler varianter (senare, så att filmerna inte låter likadant)

```
borta-2       [playful] Borta!
borta-3       [whispers] Borta… borta…
borta-4       [playful] Oj! Borta!
borta-5       [whispers] Borta… var tog du vägen?
tittut-1      [excited] Titt… ut!
tittut-3      [laughs] Tittut!
tittut-4      [surprised] Titt… ut! Där är du!
tittut-5      [excited] Tittuuut!
hej-da-2      [warm] Hej då! Vi leker igen snart.
hej-da-3      [warm] Hej då! Tittut en annan gång.
hej-da-4      [warm] Hej då! Vi ses snart.
hej-da-5      [warm] Hej hej!
```

Finns redan: `tittut-2` och "Hej då!" (`assets/ljud/roster/hej-da-1.m4a` från Gissa teckningen).

## Kaninen i skogen grön (svampen i stället för busken), 2026-11-07

Filmen `skogen-gron/kaninen-kanel` har jättesvampen där busken var, så de fyra busken-raderna görs om. Allt annat är kopior av kaninens filer (`roster/tittut/kanin-svamp/`). Klistra in i ett svep; filnamnen i samma ordning står i [`tagning-svamp.txt`](tagning-svamp.txt). Dela med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/tittut/tagning-svamp.txt assets/ljud/roster/tittut/kanin-svamp`, och mät "ut" i `tittut-1` och `tittut-5` (whisper) till `UT` i `tittut.js`.

```
[whispers] Bakom svampen… borta!

[laughs] Tittut! Vid svampen!

[playful] Hopp, bakom svampen!

[surprised] Oj! Tittut! Vid svampen!
```

## Leoparden på ängen (Tittut 3), 2026-11-07

Filmen `angen/leoparden-lova` har ett eget manus som nämner gömstället (busken, huset, staketet), så Malin läser alla raderna i en tagning. Klistra in i ett svep; filnamnen i samma ordning står i [`angen/leoparden-lova/rost.txt`](angen/leoparden-lova/rost.txt). Dela med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/tittut/angen/leoparden-lova/rost.txt assets/ljud/roster/tittut/leopard`, och mät när "ut" börjar i `tittut-1` till `tittut-6` (whisper) till `UT` i `tittut.js`. "Hej leoparden!" finns redan (`leopard-hej`).

```
[excited] Hej hej!

[playful] Ska vi leka tittut på ängen?

[curious] Var gömmer du dig nu?

[happy] Okej! Vad roligt!

[whispers] Bakom busken… borta!

[laughs] Tittut! Ovanför busken!

[whispers] Bakom huset… borta!

[excited] Titt… ut! Vid huset!

[happy] Där är du!

[mischievously] Bakom staketet nu…

[giggles] Titt-ut! Där uppe!

[laughs] Vilken busig leopard!

[excited] Igen! Igen!

[playful] Prassel, prassel… borta!

[whispers] Jag ser ett öra…

[excited] Tittut!

[mischievously] Bakom staketet igen…

[surprised] Oj! Tittut! Ur busken!

[whispers] Bakom det lilla huset…

[laughs] Tittuuut!

[excited] Där är du ju!

[warm] Nu är leken slut.

[giggles] Tittut! Vi ses snart!
```

## Hunden på lekplatsen (Tittut), 2026-11-10 – klart

Filmen `lekplatsen/hunden-hugo` har eget manus (sanden, lekstugans tak, kullen med rutschkanan) i [`lekplatsen/hunden-hugo/rost.txt`](lekplatsen/hunden-hugo/rost.txt). Malin läste "Hej hunden!" och alla raderna i en tagning (Eleven v3, stability 0,5). Tagning 1 användes: `roster/tittut/hund-hej.m4a` och `roster/tittut/hund-lekplats/`. "Ut" i `tittut-1` till `tittut-5` är uppmätt i `UT` i `tittut.js`.
