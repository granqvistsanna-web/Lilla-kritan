# Julkalendern: vilken ny bakgrund passar vilken lucka

Skriven 2026-11-17. Bara ett förslag: inga scener är ändrade. Källor: `produktion/youtube/shorts/jul/NN-*/index.html` (vad luckan använder nu), `produktion/youtube/julkalender-plan.md`, headerkommentarerna i `produktion/rum/*/index.html` och `bakgrunder/*.md`.

**Så läser du tabellen.** *Nu* är det luckan använder i dag. Luckor som är hela videor (G) visar avsnittets egna platser och kan inte få ny bakgrund utan att avsnittet görs om, så de står som "ingen byte". Max två platser per avsnitt gäller (`format/regler.md`): alla förslag är en plats.

Vad som finns att välja på:
- **Inne** (6 s loopar, kod över Flow-platta): `brasrummet`, `julhallen`, `granrummet`, `julkoket`, `julsovrummet`, `lekrummet`, `matsalen` (ännu inte klar).
- **Ute** (plattor): `brevladan` (mandarin, eftermiddag), `vinterkvallen` (kungsblå kväll, stuga), `granbrynet` (turkos dag, granar), `pulkagarden` (himmelsblå dag, staket och liten kälke), `julgranen-ute` (violett, pyntad gran och snögubbe), `bjorkdungen` (turkos, björkar och fågelholk), `granstugan` (blå dag, två granar och röd stuga), `grinden` (kungsblå, grind med krans och buske med ljusslinga), `parkbanken` (rosa, gul bänk och bärbuske). De fyra sista har ingen `bakgrunder/*.md` än (den andra sessionen bygger dem).
- **Äldre**: `julrummet`, `julskogen*`, `lekplatsen`, `vinterkullen*`.

## Tabellen

| Lucka | Scen i en rad | Bakgrund nu | Föreslagen ny | Varför | Krockar / att tänka på |
|---|---|---|---|---|---|
| 1 | Kritan ritar en stjärna, himmel, moln, suddgummi, sist en gran | Papper + ritad natthimmel (`natthimmel`) | **Ingen byte** | Kritan ritar allt själv, bakgrunden är en del av berättelsen | – |
| 2 | Lammet leker tittut bakom luckan, björnen hjälper till att dra. Ute, dag, snö | `julskogen-v3` | **`brevladan`** | Brevlådan är en lucka i miniatyr, dagsljus, tom mitt | Luckan täcker hela bilden när den är stängd, så plattan syns mest på slutet. Björnen kommer in från höger: lyktstolpen sitter längst till höger |
| 3 | Hunden fångar flingor, grisen blåser ner den ur granen. Ute, dag | `julskogen-v3` + egen stor gran (`storGran 1.2`) | **`granbrynet`** | Granar i kanten, ljus dag, platt snö | Luckans egen stora gran blir en tredje gran bredvid plattans två till vänster: placera den (`sakPlats`) till höger |
| 4 | Björnen i tomteluva, pepparkaksdans vid bordet. Inne, kväll | `koket-v2` (julköket, redan i bruk) | **`julkoket`** (samma platta) | Redan rätt rum | Kodkompositionens tre pepparkakshjärtan i taket dubblerar kakorna som dansar: använd bara plattan eller stäng av hjärtana. Adventsstjärnan i fönstret går bra |
| 5 | Grisen åker pulka, björnen knuffar, paket i pulkan. Ute, dag, backe | `skogen-gron-saker`/vinterkullen-v3 med `backe` ritad i kod | **`pulkagarden`** | Namnet säger det: luftig dag, staket | Plattan har redan en liten röd kälke längst till höger som krockar med luckans pulka (ritad av kritan): täck den eller ta granbrynet i stället. Ingen plattan har en kulle, backen ritas i kod som förut |
| 6 | Leoparden och fyra adventsljus, vinden blåser ut dem, lammet blir vindskydd. Sovrum, kväll, fönstret blåser upp | `julrummet` (`plats: vardagsrummet`, fönstermask) | **`granrummet`** | Fönster med snö och måne (kan blåsa upp, har `fonster-mask.png`), strumpor, lugn gran | Luckan har sin egen ljusstake med fyra ljus till vänster: plattans lilla gran står till höger, så de ligger inte ovanpå varandra. Fönstret ligger på x 486–773, nära dagens fönster (489–777), så `vrum`-värdena är nästan oförändrade |
| 7 | Lammet puttar julkulan, den faller, spaden och kvasten, hunden tröstar. Sovrum, kväll, stor gran, snö i runt fönster | `sovrummet-v2` (rosa) | **`julsovrummet`** (välvt fönster) | Sovrum, kväll, snö och måne i fönstret, ljusslinga | Rummets nalle med tomteluva är ett extra "djur" i bild: stäng av nallen (luckan har två figurer, lammet och hunden). Rummet har ingen gran, så luckans `storGran` behövs (bra, ingen dubblering) |
| 8 | Hunden bygger snögubbe, nysen slänger näsan i granen, leoparden klättrar. Ute, dag | `vinterkullen-v3` | **`bjorkdungen`** | Träd att klättra i, ljus dag, fågelholken är en fin detalj | Plattan har björkar, inte gran: replikerna nämner "granen". Byt till "trädet" eller använd `granstugan` (två små granar). Undvik `julgranen-ute`, den har redan en snögubbe |
| 9 | Kritan ritar fot, gran, paket, moln, suddgummi | Papper | **Ingen byte** | Allt ritas av kritan | – |
| 10 | Hel video 015 Bä, bä, vita lamm | Videons egen | **Ingen byte** | Hel video | – |
| 11 | Hel video 013 Röda sången | Videons egen | **Ingen byte** | Hel video | – |
| 12 | Hel video 022 Kaninen äter frukost | Videons egen (kök) | **Ingen byte** | Hel video. Julkoket skulle ändå passa en framtida omgörning | – |
| 13 | Lucia: lammet med ljuskrona går över isen till grisens dörr, sjunger. Kväll, ute, dörr och isfläck, blå solo-bakgrund i sången | Eget hus, dörr, krans och is ritade i kod över kvällsblått | **`vinterkvallen`** | Kvällsblå himmel, röd stuga med dörr och tänt fönster, ingen måne | Stugan sitter längst till vänster, delvis utanför kanten: dörren i luckan (där grisen bor) måste hamna vid den. Isfläcken och kransen ritas som förut. Sången (solo) kan behålla sitt enfärgade blå |
| 14 | Hel video 007 Bruna sången | Videons egen | **Ingen byte** | Hel video | – |
| 15 | Hel video 024 Lammet klär på sig | Videons egen (hallen) | **Ingen byte** | Hel video. `julhallen` är den naturliga platsen om den görs om | – |
| 16 | Hel video 023 Björnen tvättar händerna | Videons egen | **Ingen byte** | Hel video | – |
| 17 | Hel video 038 Borsta, borsta jul | Videons egen | **Ingen byte** | Hel video | – |
| 18 | Hel video 019 Rosa sången | Videons egen | **Ingen byte** | Hel video | – |
| 19 | Hel video Tittut med lammet (gröna skogen) | Videons egen | **Ingen byte** | Hel video | – |
| 20 | Björnen och hunden, fyra ljus där det fjärde är för kort. Sovrum, kväll, fönstret stängt, samma scen som lucka 6 | `sovrummet-v2` (rosa) med `stake: true` | **`granrummet`** (som lucka 6) | Planen säger "samma scen som lucka 6", och julkalendern återkopplar till de fyra ljusen i lucka 24 | Luckorna 6 och 20 delar rum med flit; 14 luckor ifrån varandra. Vill du hellre ha ett nytt rum: `julsovrummet` (men det används i 7). `matsalen` har en egen ljusstake med sju ljus som krockar |
| 21 | Hel video 016 Blinka lilla stjärna (grovklipp) | Videons egen (`nattkullen`) | **Ingen byte** | Hel video | – |
| 22 | Kritan ritar gran, ljusslinga, suddgummi, fot, paket | Papper (snökulle ritas) | **Ingen byte** | Allt ritas av kritan. Granen ska ha samma plats som i lucka 1 | – |
| 23 | Grisen med tomteluva klär granen, kulorna rullar iväg, hunden hjälper. Ute, dag, snö | `julskogen-v3` + stor gran | **`grinden`** | Tom mitt, kungsblå dag, ljusslingan i busken passar | Plattan har en buske med ljusslinga längst till höger som ska bli granens granne, inte granen. Undvik `julgranen-ute` (färdig pyntad gran dubblerar) |
| 24 | Julafton: kaninen, lammet och björnen runt paketet, tre lyft, nallen. Kväll, klädd gran, fyra ljus, paket | `vinterkullen-natt-v3` (kväll, ute) | **`brasrummet-tom` (inkopplad 2026-11-17)** | Brasa, strumpor, krans och matta: julaftonsrummet, utan rummets egen gran och paket | **Klart.** Bakgrunden är en stillbild (`assets/bakgrunder/brasrummet-tom/brasrummet-tom.jpeg`), så brasan står stilla. Ljusen står på spisens hylla. Luckans egen gran med stjärna och paketet från lucka 9 är kvar, och skuggan ersätter snön under granen. Kameran kör aldrig in i spisen. Tre närbilder (ca 36, 63 och 117 s) klipper ljusen vid bildens överkant. Förhandsvisning: `24-julafton/24-julafton-brasrummet-preview.mp4` |

## Så är rummen fördelade

`brevladan` (2), `granbrynet` (3), `julkoket` (4), `pulkagarden` (5), `granrummet` (6 och 20), `julsovrummet` (7), `bjorkdungen` (8), `vinterkvallen` (13), `grinden` (23), `brasrummet` (24). Grannluckor delar aldrig rum. Ej tilldelade: `lekrummet`, `julhallen`, `matsalen`, `parkbanken`, `granstugan` och `julgranen-ute` (reserver, se nedan).

## Där ingen ny bakgrund passar eller något saknas

1. **Lucka 1, 9 och 22** (kritan ritar allt): behöver ingen bakgrund. Ingen brist.
2. **Hela videor (10, 11, 12, 14–19, 21):** inget att byta. Om en blir omgjord: 12 julkoket, 15 julhallen, 21 en nattplatta.
3. **Backe/kulle för lucka 5 (pulka) och 8:** ingen ny utomhusplatta har en kulle eller sluttning, alla är helt plana (snökant på 76 %). Backen måste ritas i kod som i dag. Saknas: en `pulkabacken` med mjuk sluttning.
4. **Natt utomhus:** av de nya finns bara `vinterkvallen` (blå kväll). Lucka 24 skulle behöva en ny natt-/kvällsplatta ute (med gran och stuga) om den ska stanna ute. Lucka 6 och 20 skulle vilja ha ett kvällsljus i fönstret som är lite mörkare än granrummets, men det klarar koden.
5. ~~**Lucka 24 utan dubblering**~~ Löst: `brasrummet-tom` (utan gran och paket) är gjord och inkopplad.
6. **Lucka 13:** en blå kvällsplatta med en tydlig dörr på mitten och isfläck finns inte. Vinterkvällens stuga ligger i kanten.
7. **Matsalen** är inte klar och inte tilldelad. Dess sju ljus passar advent (6 eller 20) men krockar med luckans egen ljusstake.

## Att bestämma

1. ~~Lucka 24~~ **Klart 2026-11-17: `brasrummet-tom` är inkopplad** (`produktion/rum/brasrummet-tom/`, bakgrund som stillbild, ljusen på spisens hylla). Kvar: tre närbilder klipper ljusen vid överkanten; sänk kamerapositionerna i `KAM` eller låt vara.
2. Lucka 6 och 20 i samma rum (`granrummet`) enligt planen, eller ge 20 ett eget?
3. Lucka 8: `bjorkdungen` (byt "granen" till "trädet" i repliken) eller `granstugan`?
4. Lucka 5: `pulkagarden` (täck plattans lilla kälke) eller `granbrynet`?
5. Lucka 4: ska pepparkakshjärtana i kodscenens tak stängas av?
