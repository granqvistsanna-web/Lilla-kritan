# Plan: alla ABC-filmer efter recept 3

Skriven 2026-11-21. Receptet: `format/abc-recept-3-kompisen-vill.md`. Förlagan: `abc-e-recept-3/`.

A–D (och E i den gamla formen) är gjorda med recept 1. De görs om i nya mappar `abc-x-recept-3/` bredvid de gamla. Den gamla mappen står kvar tills den nya filmen är godkänd (regeln om gamla versioner).

## Steg 0: gör klart E först (förlagan)

Allt som rättas i E följer med när mappen kopieras. Därför görs det före A–D.

1. Lyssna på blandningen, särskilt *"Det är ju E!"*, *"Kan du det, kritan?"*, *"Nu ritar kritan."* och *"E, e, elefant!"*. Klipp om dem som hamnat fel.
2. **Hunden i leken** får en ny bild ur Flow: ett vanligt litet djur från sidan, med delar (svans, ben) som katten och ekorren. Den används i alla bokstäver, så den görs en gång.
3. **Muren:** den står fortfarande still ca 12 s. Kolla att `tittaMot()` och den långsamma zoomen räcker, annars lägg till mer liv.
4. Elefantens ljud: sök ett mjukt trumpetande på Openverse i stället för björnens `brum-glad`.
5. Feedbacksidan, Sanna godkänner, slutrendering i molnet (`verktyg/molnrender.sh`).

## Steg 1: gemensamma bilder (en gång för alla bokstäver)

De udda djuren som kritan ritar fel blir vanliga små djur från sidan, med delar som rör sig, mun i kod och kontur ur `kontur-bild.py`. Samma bild kan återanvändas i flera bokstäver.

| Bild | Behövs i | Finns i dag |
|---|---|---|
| Hunden (leken) | alla | gammal ritad stil |
| Kon från sidan | B | `ko.md`, kolla om den är "från sidan" |
| Grisen från sidan | D | `gris-rosa.md`, kolla stilen |
| Katten | E (klar) | `katt-abc` |

Saker som inte är djur (bil, boll) behöver ingen ny bild, bara en kontur.

**Clownen (C)** är en ny figur i art direction v2: en mjuk tygclown, rund näsa, mjuka färger och ett litet, snällt leende i kod (inget stort målat leende, inget vitt ansikte). Den görs i Flow, riggas med `lk-figur` och får en fil i `karaktarer/` efter `_mall.md`. Sanna godkänner bilden innan den riggas.

## Steg 2: meningen och sakerna per bokstav

Förslagen ur receptet, med vad som saknas. Sanna väljer eller ändrar meningen innan något byggs.

| | Kompisen (rigg) | Viljan | Ritas fel | Ord 2 | Ord 3 | Saknas |
|---|---|---|---|---|---|---|
| **B** | björnen `bjornen-bulle` | vill leka | kon | bollen studsar, björnen hoppar med | ballongen flyger upp | kontroll av kons bild |
| **A** | apan `apan-alfons` | är hungrig | bilen | apelsinen, mums | ananasen: bladen kittlar, atjo! | inget nytt, bara konturer |
| **D** | dinon `dinon-disa` (bestämt 2026-11-21; v2-rigg med uttryck och poser finns) | vill veta vem som bor bakom dörren | grisen | dörren (`dorr-abc`): dinon knackar, knack knack | dockan tittar fram | grisen från sidan. Dinon är stor (SKALA 0,5), mät `KOMPIS`-skalan mot dörren |
| **C** | clownen, en mjuk tygclown (ny rigg) | vill cykla men har ingen cykel | bollen | cykeln | cirkeln blir hjulet som fattas | **ny rigg** med `lk-figur`, som Sanna godkänner innan scenen byggs |

**Bestämt 2026-11-21: C:s kompis är clownen.** Alternativen som vägdes: Svenska djur på C som små barn känner finns knappt (cikada; schimpans och chinchilla låter sj). Två vägar:

- **Kaninen vill cykla (förslaget).** Kompisen är kaninen (`kaninen-kanel`, riggad i v2) och börjar inte på C. Orden är fortfarande tre C-ord: kaninen vill cykla men har ingen cykel. Kritan ritar fel (bollen, hej då!), sedan cykeln (ord 1). Cykeln saknar ett hjul, och kritan ritar en cirkel som blir hjulet (ord 2). Citronen rullar in (ord 3). Kaninen sitter inte på cykeln (receptets *"aldrig sitta i något"*), den hoppar bredvid och cykeln rullar. Muren: cykel, cirkel, citron.
- **Cikadan.** Kompisen börjar på C, men det kräver en ny rigg, och ordet är svårt för små barn.
- **En leksak: clownen** (Sannas idé 2026-11-21, *"eller leksak"*). En mjuk tygclown är en leksak som små barn känner, och den börjar på C. Clownen vill cykla men har ingen cykel. Kritan ritar fel (bollen, hej då!), sedan cykeln (ord 2). Ett hjul fattas, och kritan ritar en cirkel som blir hjulet (ord 3). Muren: clown, cykel, cirkel. Det kräver en ny rigg (`lk-figur`), och clownen måste se mjuk och snäll ut, med rund näsa och utan stort målat leende, så att den inte blir läskig. **Obs:** clown uttalas med k, men cykel och cirkel med s. Filmen lär då ut två ljud för C.

Ordning: **B, A, D, C**. B, A och D har riggade kompisar. C väntar på clownens nya rigg.

## Steg 2b: F till Ö (bestämt 2026-11-21: alla bokstäver görs i recept 3)

De nya bokstäverna börjar efter A–E, en i taget i alfabetisk ordning, samma steg som nedan. Kompisen ska helst vara en figur som redan har en v2-rigg; det sparar en hel figur per bokstav. Meningen (viljan, ord 2 och ord 3) skrivs när bokstaven är på tur, och Sanna godkänner den.

| | Kompis med rigg i dag | Kompis att göra | Anmärkning |
|---|---|---|---|
| F | fjärilen `fjarilen-fia` ✅ | | |
| G | grisen `grisen-greta` ✅, grodan `grodan-gurra` | | |
| H | hästen `hasten-hulda`, humlan, hunden `hunden-hugo` | | ingen har referensark än; välj en och gör den klar |
| I | igelkotten `igelkotten-igge` | | inget referensark än |
| J | – | förslag: jordgubben som leksak? | inget vanligt djur på J |
| K | kaninen ✅, kon ✅, katten, kycklingen | | välj en; kon är redan udda i B |
| L | lammet ✅, lejonet ✅, leoparden ✅ | | |
| M | musen `musen-mille` ✅ | | |
| N | nyckelpigan `nyckelpigan-nicke` ✅ | | |
| O | – | förslag: ormen (snäll, rund) | |
| P | pandan `pandan-pim` ✅ | | |
| R | räven `raven-rut` ✅ | | |
| S | – | förslag: sälen eller snigeln | |
| T | traktorn `traktorn-tuff` (ingen v2) | förslag: tigern, eller traktorn i v2 | samma fråga som cykeln: ett fordon behöver ansikte |
| U | ugglan `ugglan-ulla` ✅ | | |
| V | – | förslag: valen | |
| Z | zebran `zebran-zebbe` ✅ | | |
| Å, Ä, Ö | – | förslag: älgen (Ä), örnen (Ö); Å svårt | |
| Q, W, X, Y | – | – | få ord som små barn känner. Förslag: korta filmer eller en gemensam film, inte recept 3. Sanna bestämmer när det är dags |

✅ = referensark klart. Utan ✅ finns riggen men den är inte godkänd, så Sanna godkänner den innan den blir kompis.

## Slutet och ljudkartan (samma i varje bokstav, 2026-11-22)

Sanna 2026-11-22: *"now it ends with sounding letter, is a bit random … where should sounding letters be placed in clip, same in every letter."* Förlagan är B (`abc-b-recept-3`).

**Slutet**, efter discot (klossarna står i slutraden):
1. *"Nu är vi klara för i dag."*
2. De tre orden en gång till, i berättelsens ordning (*"Björn!"*, *"Boll!"*, *"Ballong!"*, kompisens och sakernas egna `lang`-repliker): varje kloss hoppar på sitt ord.
3. Bokstavsmärket hoppar från hörnet till mitten ovanför raden, får ögon och mun och säger *"b, b, B!"* en sista gång. Klossarna hoppar med.
4. *"Tack för att du lekte med B!"* medan kompisen vinkar från sin kloss.
5. *"Hej då! Vi ses!"* Alla hoppar en gång, gnistor.
6. Klossarna rullar ut åt höger. Märket glider ner till mitten, lite större, ler och står kvar medan musiken och bilden tonar ut (bokstaven sist).

Inget bokstavsljud efter hej då, och märket pratar inte med i hej då (det är Malins replik).

**Ljudkartan**, bokstavens ljud (*"b, b, B!"*, märket med ögon och mun) på fem fasta ställen och aldrig ovanpå Malin:

| # | Var | Hur |
|---|---|---|
| 1 | Introt, efter *"Bokstaven B."* | stora klossen mitt i bild |
| 2–4 | Efter varje ord, när berömmet (*"Boll börjar också på B!"*) är sagt | märket i hörnet växer lite och säger det en gång (`bLjud()` i `gissning()`) |
| 5 | Slutet, efter de tre orden | märket i mitten ovanför raden (punkt 3 ovan) |

Mellan dem finns minst en replik av Malin, så att ljuden aldrig kommer tätt.

## Steg 3: per bokstav (samma steg varje gång)

En session per bokstav (som i feedbackomgångarna), högst två samtidigt så att rösterna och renderingarna inte krockar.

1. **Manus** (Opus): kopiera `abc-b-recept-3/` (den har feedbacken från 21/11) till `abc-x-recept-3/`, skriv `manus.md` och `malin-x-recept-3.txt` (ca 61 rader, ca 20 nya). Byt bokstavens drag och färg, `SAKER` och `TAL`. Regelkoll: inga djurnamn, inga utdragna ord, *"Vem är det?"* / *"Vad blir det?"*, en v3-tagg per rad, *"Hej hej!"* i introt.
   → **Sanna godkänner replikerna.**
2. **Bilder:** konturer med `kontur-bild.py` för varje sak, ögats plats mätt, kanter mätta (`tunn_kant.py`). Nya Flow-bilder bara om tabellen ovan säger det.
3. **Malins tagning** i ElevenLabs (en tagning, alla rader), delad med `verktyg/dela-tagning.py` och kontrollerad rad för rad.
   → **Fråga Sanna före krediterna.**
4. **Scenen:** delarna 3–6 skrivs nya (`kanner`, `narbild`, `gissning`, `flytta`), delarna 1, 2, 7 och 8 följer med från B. Se receptets *Lärdomar* (skissens ansikte, kontrast i det felritade, `KVISA`/`KNICK`, renderingen). Stillbilder enligt receptets punkt 4.
   Från ABC-b3 (2026-11-22) följer med från B: markskuggorna på golvet, slutet och ljudkartan (ovan), raka klossar i discot och bädden `abc-bad-lang.m4a`. Kör `krock.mjs`.
5. **Förhandsvisning** med `--snabb`, lokalt (020:s `render.mjs`, inte `render-delat.mjs`). Länk till feedbacksidan (`…/feedback/#ep`).
   → **Sanna granskar.**
6. **Slutrendering** i molnet, miniatyr (`miniatyrer`-skillen, färgstrimman), `youtube.md`. Den gamla mappen flyttas till `aldre/` eller tas bort när den nya är godkänd.

## Vad som kostar

- **Malins tagningar:** 4 nya (A–D) à ca 61 rader. Det är den stora kostnaden.
- **Flow:** hunden, och kanske kon och grisen (Nano Banana, 0 krediter).
- **Musik:** ingen ny, samma tre spår som i dag.
- **Rendering:** molnet för slutfilmerna, ca 4 min film per bokstav.

## Frågor till Sanna innan start

1. ~~C~~: clownen (bestämt 2026-11-21).
2. ~~D~~: dinon knackar på dörren (bestämt 2026-11-21).
3. ~~Publicerade~~: ingen ABC-film ligger ute (Sanna 2026-11-21). Recept 3-filmerna ersätter recept 1-filmerna helt. Recept 1-filmerna publiceras inte.
4. ~~Fler bokstäver~~: alla görs i recept 3 (bestämt 2026-11-21). Kvar: kompisar för J, O, S, T, V, Å–Ö, och vad som görs med Q, W, X, Y.
