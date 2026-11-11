# Kroppsrörelser (2026-11-11, provat på ugglan)

Fyra nya rörelser i `verktyg/rigg-motor.js`, avsnittet `// ---------- Kroppsrörelser ----------` (direkt före testfilmens hjälpare). De är opt-in: bara en figur som lägger in dem i sin egen `ROR` använder dem, och de andra riggarna renderar exakt som förut. Hittills är de bara inkopplade och godkända på ugglan (`assets/karaktarer/ugglan-ulla/premium/uttryck.html`).

| Rörelse | Slinga på ugglan | Klipp |
|---|---|---|
| Sätta sig och resa sig | `?rorelse=satta` (7 s) | `ulla-satta.mp4` |
| Lägga sig och sova / vila | `?rorelse=lagga`, `?rorelse=laggaVila` (12,5 s) | `ulla-lagga.mp4` |
| Gå upp och ner för en trappa | `?rorelse=trappa` (10,4 s) | `ulla-trappa.mp4` |
| Klättra upp och ner för en stege | `?rorelse=klattra` (11 s) | `ulla-klattra-2.mp4` |

## Använda dem i ett avsnitt

Alla är `tl => [ansikte, pose]` från en stående `[f, p]`, där `tl` är tiden in i rörelsen:

- `sattaSig(f, p, tl, d = 1.6, upp = false)`: sätter sig (slutar i `RORELSE.satta.pose`, oftast `sitter`). `upp = true` reser den sig från sittande.
- `laggaSig(f, p, tl, d, upp = false, sova = true)`: sätter sig, lägger sig på sidan och blundar (`sova`), andas sedan i 4 s-tag så länge `tl` fortsätter. `d` är 4 s ner och 3,6 s upp om du inte anger något. `sova = false` ger vila med öppna ögon.
- `trappa(f, p, tl, n = 3, upp = true, dir = 1)`: `n` steg upp eller ner, åt höger (`dir = 1`) eller vänster. Tar `n × takt` s. Ritar trappan med `trappaSvg(x0, y0, sk, n)`.
- `klattraStege(f, p, tl, n = 3, upp = true)`: `n` pinnar upp eller ner. Tar `n × takt` s. Ritar stegen bakom figuren med `stegeSvg(x, y, sk, pinnar = 7)`.

Slingorna `sattaSlinga`, `laggaSlinga`, `trappaSlinga` och `stegeSlinga` visar hur man syr ihop dem: blicken går före, en glad paus i mitten och sedan tillbaka till stående.

## Det en rigg behöver

1. I `rita()`, före `huvud(fig, p)`: `kroppRita(fig, f, p);`. Den hanterar `p.ligg` (vrider kroppen kring ellipsens mitt med kontakt mot golvet) och `p.golv` (lyfter figuren och skuggan på trappsteg och stegpinnar).
2. I `POSE0`: `ligg: 0, golv: [0, 0]`.
3. Rörelserna i `ROR`, och figurens egna tal i `RORELSE.satta`, `.lagga`, `.trappa` och `.stege`. Det som saknas tas ur `KROPPROR0`, och de talen är ugglans.

## Lärdomar

- **Lägga sig:** de gamla liggbilderna var svaga. Ugglans `sover` sitter upp (bryter regeln), `liggMage` och lammets `ligger`/`liggBoll`/`liggStor` trycker ihop ägget så att det ser tillplattat ut, `liggSida` lutar bara 32° och svävar 40 px, och Huldas rig-test faller som en planka kring fötterna. Nu sätter sig figuren först och vrids sedan kring kroppens mitt med kontakt mot golvet (`lagga.kropp` är kroppens ellips mätt ur body.png). Armarna skjuts in bakom kroppen (`klapp`), annars sticker vingstumpar ut vid kanten.
- **Trappa:** följefoten väntar tills den ledande foten har landat, och kroppen lyfts mellan dem. Annars sträcks benen så att roten syns. Skuggan bleknar medan fötterna står på olika steg (tredje värdet i `golv`), annars hänger den över sättsteget. Fötterna glider lite längs stegen precis som i den godkända gången.
- **Stege:** armarna ska aldrig försvinna. Sanna: *"just avoid arms flashing away"*. I första versionen sänktes den ena armen till vila genom gömzonen samtidigt som den andra lyftes, så båda försvann en stund. Nu stannar båda uppe över gömzonen (`upp` 96° för sträcket, `grepp` 82° för hållet, båda över `GOM.till`). Bara i början (första armen upp) och i slutet (ner en i taget) glider en arm in bakom kroppen. `bredd` och `r` beror på armlängden: handen ska landa på holmen och pinnen.
- **Ryck:** blicken (`titt`) och lutningen (`boj`) får inte byta värde vid ett steg- eller pinnbyte. Låt dem vara fulla från början av rörelsen och blekna bara i slutet, och blanda sidan kontinuerligt (`sd` i `klattraStege`).
- **Namnkrockar:** `klattra` (007 och tittut.js) och `stege(` (013 scen-kit.js) var redan tagna, därför `klattraStege`, `stegeSvg` och `stegeSlinga`.
- **Inga zzz i slingan:** `filmZzz` lägger till dem i avsnitt.

## Bevis att inget annat ändrades

Fingeravtryck av `<svg>.outerHTML` vid 40 tider (0–12 s, en mikrotask efter `render(t)`, seedad `Math.random`) i varje läge (standard, varje `?rorelse=`-nyckel och `?film=1`) på alla 32 sidor som laddar `rigg-motor.js`. Jämförelsen gjordes mot förgreningspunkten d93e3c63: 0 skillnader. Det täcker alla 24 andra figurriggar, ugglans gamla lägen och avsnittsscenerna. 5 lägen är nya (ugglans satta, lagga, laggaVila, trappa och klattra). 6 scensidor saknar global `render` och kunde inte provas, varken före eller efter. Jämfört med `claude/adoring-cerf-4qwj7e` skiljer sig bara katten-kaj och 030-scenen badet, och det är den grenens egna ändringar, inte motorns.

## Före en utrullning: rigga som behöver egna tal

Ingen rigg utom ugglan har rörelserna. Varje rigg behöver punkterna 1–3 ovan, och dessutom:

- **Alla med ben:** `lagga.kropp` (kroppens ellips ur body.png), `lagga.vinkel` och `lagga.pose` (armar in bakom kroppen), och en kontroll av att `satta.pose` (`sitter`) finns och ser rätt ut. `hunden-hugo` och `kaninen-kanel` saknar också en `sover`-ansiktsbild att blunda med (kolla `UTTRYCK`).
- **Rigga med gömzon (`GOM`) som ugglan:** apan-alfons, elefanten-elsa, grisen-greta, kon-kajsa, mamma-mor, nyckelpigan-nicke, pandan-pim, raven-rut och zebran-zebbe. Stegens `bredd`, `r`, `upp` och `grepp` ska mätas så att handen landar på stegen och båda vinklarna ligger över figurens `GOM.till`. Trappans `djup` är ungefär 2 × fötternas avstånd och `h` en lagom steghöjd för benlängden.
- **Rigga utan gömzon** (kanel-familjen): ankan-agda, bjornen-bulle, grodan-gurra, humlan-humle, hunden-hugo, igelkotten-igge, kaninen-kanel, katten-kaj, kycklingen-pip, lammet-ludde, lejonet-lage, leoparden-lova och musen-mille. Deras armar har inte ugglans vinklar, så stegens armlogik (`upp`/`grepp` över gömzonen) måste provas om innan den används. Trappan bygger på gångens armar (`p.gang`) och bör fungera, men måste tittas på.
- **fjarilen-fia:** har inga ben (inget `benY`, ingen gång). Rörelserna passar inte.

Rulla ut en figur i taget: rörelserna i `ROR`, `ryck.mjs <figur>` ska bara skriva `klart`, ett närark över varje byte och ett klipp till Sanna.
