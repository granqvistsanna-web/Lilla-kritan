# three-rum: platta kritfigurer i riktiga 3D-rum (prov 2026-11-23)

Prov på om Lilla Kritan kan ha riktiga 3D-rum (ljus, skuggor, djup, kameraåkning) och ändå behålla de platta kritfigurerna med vit klistermärkeskant. Rummet är **lekrummet** (`assets/bakgrunder/lekrummet/lekrummet-v2.jpeg`, Kanel städar där i 037), byggt om i three.js. **Kanel** står i det som ett platt kort som alltid vänder sig mot kameran.

Idén kommer från kortfilmerna på kanalen LostClips6868 och den öppna skillen `mromidev/claude-animated-shorts` (MIT). Därifrån lånades teknikerna, inte utseendet: kort som bara vrids kring y, kortets ljustoning (`cardshade.ts`), kontaktskugga, lins-oskärpa, lätt bloom och gradering. Vi tog inte med snabba klipp, mörkt ljus eller textning.

## Scenen (runda 2, 18 s)
Kanel står på mattan med den röda bollen vid foten. Hon tittar på den, plockar upp den, tittar glatt på den och lägger den i den ljusblå leksakslådan. Bollen faller ner bakom lådans framkant med ett mjukt duns. Malin säger *"Hurra, bra jobbat!"* 0,6 s efter att bollen landat, och Kanel nickar. Sedan kommer ett klipp till halvnära, där hon vinkar och Malin säger hej då mitt i vinkningen. Allt är lugnt: två långsamma kameraåkningar och ett klipp.

- Film: `lekrummet/lekrummet.mp4` (18 s, 1920×1080, 30 fps, med ljud). Förhandsvisning: `lekrummet-snabb.mp4`. Stillbilder: `lekrummet/stills/` (`sheet.jpg` visar 0,5, 2,6, 4,2, 6, 9 och 14 s). Runda 1 (10 s, bara en kameraåkning) ligger i `lekrummet/aldre/`.
- Repliker ur röstbanken, inget nytt inspelat: `kaninen-stadar/hurra-bra-jobbat.m4a` (037) och `tittut/kanin-hejda.m4a` (037:s hej då). Dunset är `effekter/duns/duns-1.m4a`. Ingen musik.

## Filer
- `lekrummet/index.html` är sidan: en dold SVG med Kanels rigg och en canvas för three.js.
- `lekrummet/rum.js` har rummet, ljuset, Kanel-kortet med ljustoningen, bollen, scenen, kameran, efterbehandlingen och `window.LJUD`.
- `render.mjs` renderar som avsnittens `render.mjs`: Playwright och ffmpeg, `window.seek(t)`, ingen requestAnimationFrame-tid. Ljudet blandas ur `window.LJUD` till `<scen>-effekter.wav`.

## Köra
```bash
node produktion/three-rum/render.mjs produktion/three-rum/lekrummet --snabb
```
```bash
node verktyg/render-delat.mjs produktion/three-rum/lekrummet --bitar 3 --samtidigt 3
```
```bash
node produktion/three-rum/render.mjs produktion/three-rum/lekrummet 0.5 2.6 4.2 6 9 14
```
Den hela renderingen tar ca 55 s (540 bildrutor i tre bitar). three.js 0.160 hämtas från jsdelivr, så datorn måste vara uppkopplad.

## Hur det fungerar
- **Kanel är den riktiga riggen.** `v2-rigg.js` läser riggen ur `uttryck.html`. Varje bildruta ritar `L.rita()` henne i en dold SVG, och SVG:n blir en bild som läggs som textur på kortet. Ansiktet, blinkningarna, andningen, upplockningen (`plockaDel`), bollen i handen (`sakIn`/`sakBild`, samma mått som i `uttryck.html` men skala 0,26 i stället för 0,18) och `ARMROR.vinka` fungerar som i avsnitten. Figuren är inte ändrad.
- **Kortets ljustoning (nytt):** kortet ligger i rummets ljus. Sidan bort från solen blir upp till 16 % mörkare med en svag lavendelton, och solsidan får en varm inre kant på ca 3 px. Kanten ligger innanför den vita klistermärkeskanten: en pixel som inte själv är vit lyses upp om figuren tar slut inom kantbredd plus 3 px åt solens håll. Det finns ingen förskjuten kopia utanför figuren. Solens riktning räknas in i kortets plan varje bildruta, så tonen följer kameran.
- **Bollen** är en klistermärkessak i Kanels kort så länge hon har den: på golvet, i handen och över lådan. När hon släpper den tar ett eget litet kort med samma bild och samma vita kant över på exakt samma ställe. Det faller ner i lådan och döljs av lådans framkant.
- **Line boil och vit kant** ritas i SVG:n och räknas om mot 3D-kamerans skala varje bildruta: line boil 2,5 px i bild med ny brusbild 6 gånger/s, och 3 px kant i bild ovanpå den inbakade.
- **Rummet (fylligare och mer krita):** alla lådor har rundade hörn och vickar lite (en mjuk förskjutning av hörnen). Varje sida har kritkorn och skakiga, mörkare kritstreck längs kanterna. Väggens kritsvep är starkare och dubbla ibland, och de håller i parallax. Nytt: tre tejpade barnteckningar (en sol, ett hus och ett hjärta), en liten gul kloss på hyllan, en tornhög med klossar och en röd kloss på golvet, en ljusblå leksakslåda med en kloss i, en rund rosa golvkudde i förgrunden och en liten krukväxt i hörnet. Det finns inga byråer, gardiner eller fåtöljer. Dörren har mjuka fasade kanter och korn.
- **Kameran:** först en helbild som glider in och lite runt i 11 s, sedan ett klipp till halvnära som glider långsamt in i 7 s. Fokus ligger alltid på Kanel.
- **Efterbehandling:** samma som runda 1, alltså lins-oskärpa, lätt bloom, varm gradering och en vinjett på 0,12.

## QA
`bash verktyg/qa-film.sh lekrummet.mp4` gav:
- line boil 1,6 px/s (gränsen är 4,5)
- inga svarta och inga frysta bilder
- ingen röst som klipps vid klippet
- −16 LUFS, topp −5,4 dB

Tysta partier finns, eftersom provet inte har någon musik. Kontaktarket i qa-film.sh felar fortfarande (`Invalid duration for option ss: .9000…`, ett tal utan nolla före decimaltecknet). Felet ligger i det delade verktyget, så det är orört.

## Vad som fungerade
- **Det ser ut som ett riktigt, mysigt rum.** Det är fylligare än runda 1, och sakerna ser tecknade ut i stället för maskingjorda: rundade och lite sneda lådor med kritkanter. Teckningarna på väggen och kudden i förgrunden ger djup.
- **Handlingen fungerar med riggen som den är.** Upplockningen och bollen i handen kommer rakt ur riggen, och överlämningen från bollen i kortet till ett eget 3D-kort syns inte. Bollen hamnar på riktigt i lådan bakom framkanten och syns sedan i lådan i halvnära.
- **Vinkningen syns i halvnära,** och klippet från helbild till halvnära är lugnt.
- **Ljustoningen sätter Kanel i rummet** utan att ändra hennes färger. Den är svag med flit och syns mest som att hon har en ljus och en skuggsida som lådorna.

## Vad som fortfarande ser konstigt ut
- **Ljustoningen är nästan för svag för att märkas** i helbild. Den hjälper mest i halvnära. Starkare blir det lila och "3D-renderat" på den vita kanten.
- **Bollen ligger i Kanels kortplan.** När kameran glider runt följer den med henne en aning, i stället för att ligga helt still på golvet. Det syns knappt med vår lugna kamera, men en större sväng skulle avslöja det. Lösningen är att låta bollen vara ett eget kort hela tiden och bara lämna över den till handen när hon tar den.
- **Ingen egen skugga för bollen i handen.** Den är en del av Kanels skugga. Det är rätt, men det syns inte.
- **Upplockningen är riggens golvplock från sidan.** Den läses bra men är liten i helbild. En närbild på handen eller en tydligare blick ner hade hjälpt barnen följa med.
- **Väggen är stark, men 3D-sakerna har fortfarande raka linjer** jämfört med plattans handritade. Rundningen och vickningen hjälper, men det är fortfarande ett 3D-rum med kritkläder.

## Runda 3: kodarmar med armbåge (prov, Sanna sa ja)
Samma 18 s-scen, men Kanels målade armar är dolda i den här sidans kopia av riggen och ersatta med armar ritade i kod (`lekrummet/tunna-armar.js`). Hennes riktiga filer är orörda.

- **Hur:** varje arm är ett kritstreck genom axel, armbåge och hand, en mjuk kurva. Armbågen räknas med tvåbens-IK mot en punkt ut och ner från axeln, så den böjer sig alltid samma naturliga väg och aldrig bakåt. Det finns inget släp, ingen fjäder och ingen efterstudsning. Handen följer riggens (osynliga) hand, så bollen sitter i den, och den följer egna mål i vilan och i vinkningen. Strecket har kroppens bruna, lite mörkare, kritkorn och vit klistermärkeskant. Line boil är som för figuren. Axeln sitter inne i kroppen, så ingen stump syns.
- **Handen:** först en rund prick, nu en oval tass längs underarmen med en liten tumme åt kroppen till, i samma bruna med vit kant.
- **Tre bredder** (`?armar=a|b|c`, `--fraga armar=b` i render.mjs, `armar=bild` ger dagens målade armar): A 24 enheter (5 % av huvudet), B 34 (7 %), C 60 (12 %, ungefär lika tjock som dagens), D 84. Filmen använder D i runda 4.
- **Ändrat i scenen:** lådan står 10 cm längre till vänster, så att handen och bollen på golvet inte skyms av lådans hörn.
- Jämförelse: `lekrummet/stills/jamfor-armar.jpg` (dagens målade armar mot de nya D-armarna vid sträcker sig, håller, släpper och vinkar). Runda 2:s film ligger i `lekrummet/aldre/lekrummet-202611232049.mp4`.
- QA: line boil 1,7 px/s, −16,3 LUFS, topp −5,4 dB, ingen röst klipps vid klippet.

### Ärlig jämförelse
- **Dagens målade armar** har mest krita och form, men är raka pinnar som bara vrids vid axeln. Handen når bollen genom att hela armen pekar dit, och vinkningen är en stel arm som svänger.
- **Tunna A och B** böjer sig fint och läses tydligt, men ser ut som streckgubbsarmar på en rund figur. De är för smala för Kanels kropp, särskilt A.
- **Tjocka C** är bäst av kodarmarna. Den är lika tung som dagens arm men har en riktig armbåge i vinkningen och när hon bär bollen. Den ser inte ut som de böjda korvarna från november, eftersom strecket är jämnt, armbågen mjuk och det inte finns något släp. Den är ändå plattare än den målade armen: kornet är svagare, och kanten är helt jämn.
- **Handen med tumme** läses som en tass och greppar bollen bättre än pricken.
- **Kvar att lösa:** när hon sträcker sig ner till golvet ligger armen bakom benet och syns lite, och i helbild är handen liten. Armen kunde få lite mer krita (ojämnare kant) för att möta den målade kroppen.

### Runda 4 (Sannas feedback: "ser riktigt dåligt ut", "inte mjukt som referensen", tjockare, ingen vit kant vid roten, inga händer)
- **Ryck borta:** en mätning av handens bana bildruta för bildruta hittade ett hopp på 87 enheter vid släppet. Det kom av att `sakIn(G, null)` byter armlager i riggen. Nu ligger bollen kvar i riggen och döljs bara. Vinkningen startade och slutade tvärt. Nu går handen i en båge runt axeln (som referensens `swingArm`) med 0,8 s mjuk in- och uttoning. Efter ändringen finns inga ryck över 6 enheter per bildruta i hela scenen.
- **Vila:** armarna hänger nästan raka och lite ut, i stället för de böjda "boxararmarna". De svajar mjukt med andningen, så något rör sig hela tiden, som i referensen.
- **Tjockare (D, 84 enheter), ingen hand:** armen slutar i strecket runda ände.
- **Ingen vit kant vid roten:** det bruna strecket ligger framför kroppen i kroppens egen färg (#ab6643, mätt i `kanel-body`). Den vita kanten ligger bakom kroppen och syns bara utanför den. Det vita strecket vid roten var kroppens egen klistermärkeskant, som korsade armen.
- Runda 4:s film ersätter C-filmen, som ligger i `aldre/lekrummet-202611232058.mp4`. QA: boil 1,6 px/s, −16,3 LUFS, inget klippt.

### Beslut (Sanna 2026-11-23): de gamla armarna är bättre
Kodarmarna läggs ner. Filmen `lekrummet.mp4` använder Kanels målade armar igen (`armar=bild` är nu standard). Lådan står kvar 10 cm längre till vänster, så att greppet syns. `tunna-armar.js` finns kvar och går att visa med `?armar=d`, men inget använder den. Runda 4:s film ligger i `aldre/`.

## Runda 5 (Sanna: städa rummet, mer rörelse)
- **Väggen:** de långa kritsvepen är borta. Väggen är nu plattans gröna med mjuka, stora fläckar, tät, nästan osynlig kritskraffering och kritkorn i två skalor. Den ser ut som en vaxkritad yta utan streck.
- **Teckningarna:** allt fylls med kritklotter ända ut till papperskanten (himmel, gräs, sol med ring och strålar, ett moln, huset med tak och dörr, hjärtat på rosa botten), så den vita remsan under bilden är borta. Pappret är lite ojämnt och gräddvitt, har tejp i två hörn och en mjuk skugga mot väggen.
- **Kanel rör sig mer:** hon tittar sig omkring mellan handlingarna, med blick och huvudlutning. Först ut i rummet, sedan ner på bollen. Efter "bra jobbat" tittar hon på lådan, upp mot teckningarna och tillbaka på oss, och efter hej då åt sidan. Hon flyttar också vikten långsamt hela tiden. Allt är mjukt mellan lägena, och hon vänder sig aldrig runt.
- QA: boil 1,8 px/s, −16,3 LUFS, inget klippt.

### Runda 6 (prov 23/11, efter Ricks Clips): kurvarmar och kurvben, jämn dolly
- `?armar=kurva`: kritarmar och kritben (64 enheter; tidigare 30 och 48: `lekrummet-kurva-snabb-30.mp4`, `-48.mp4`), alla omritade som kurvor varje bildruta (`tunna-armar.js`, `ben: true`). Benen ligger bakom kroppen. Foten står kvar på golvet när kroppen sjunker, så knät böjs utåt. Benlängden är riggens.
- `?dolly`: kameraåkningarna går med jämn fart, utan in- och uttoning.
- Sanna: tjockare armar och de målade benen. Nu: kurvarmar 64 enheter, lite kortare (74 + 70) och närmare kroppen i vilan (9°). Kurvbenen finns kvar med `ben: true` men används inte.
- `?ricks`: huvudet vänder sig dit hon tittar (riggens `rikt`, bara ansikte, mage och öron) och en reaktionsnärbild 3,4–4,8 s medan hon håller bollen. Förhandsvisning: `lekrummet/lekrummet-ricks-snabb.mp4` (`--fraga "armar=kurva&dolly&ricks"`).
- Armarna (Sanna: "ser ut som en mallig kille"): axeln högre, kortare (62 + 58), armbågen böjer nedåt i stället för utåt, vilan 4° från kroppen.
- Uttryckspopp med `?ricks`: ansiktet slår om på 0,1 s och glider tillbaka. Glittriga ögon (kawaii) i närbilden, förvånad (runda ögon, o-mun, öronen spetsas, lite uppåt) när bollen landar, jätteglad 0,5 s efter, på Malins "Hurra".
- Armarna har en smal vit kant även framför kroppen (från 30 % av armen, så roten smälter in) och är en aning mörkare (#a05d3e), så att de inte flyter ihop med kroppen.
- Mer rörelse med `?ricks`: båda armarna upp på "Hurra", sedan två klapp vid magen (armarna sträcks så långt som behövs, gummiarm). Kroppen dippar lite med nicken. Bollen studsar upp över lådkanten en gång efter landningen, med squash vid kontakt och ett svagare andra duns.
- Hel film: `lekrummet/lekrummet-ricks.mp4` (1920×1080, 30 fps, ca 2 min 15 s att rendera). Obs: `--ut` gör filmen stum (den är till för render-delat), så ljudet blandas med `--bara-ljud --fraga …` och läggs på med ffmpeg; ljudet ligger i `lekrummet-ricks-effekter.wav`. QA: −16,3 LUFS, topp −5,4 dB, line boil 3,1 px/s (gräns 4,5).
- Förgrund med `?ricks`: två klossar nära kameran nere till höger i helbilden (0,5/1,6 och 0,74/1,42), placerade så att de inte krockar med något och inte syns i närbilden eller halvnära.
- Förhandsvisning: `lekrummet/lekrummet-kurva-snabb.mp4` (`--snabb --fraga "armar=kurva&dolly" --ut …`). Stillbilder: `lekrummet/stills/runda6/`. Standardfilmen är oförändrad.

## Runda 6 (Sanna: 3D-effekt på Kanel och fler uttryck)
- **Volym på kortet:** Kanel ser ut som ett pösigt klistermärke. I kortets shader blir en suddad kopia av figurens form (80 punkter, radie 110 riggenheter) en höjdkarta, och normalen ur den belyses av rummets sol. Kanterna mot solen blir ljusare, kanterna bort från solen mörkare, och det blir lite mörkare mot konturen och en svag glans på solsidan. Mitten är oförändrad, och den vita kanten och den vita tussen rörs inte. Mörkningen är begränsad till högst 16 %. Kroppen, öronen, armarna och benen ser runda ut, men kortet är fortfarande platt och vänt mot kameran, så hon snurrar aldrig. `?platt` stänger av volymen för jämförelse.
- **Fler uttryck** (riggens egna, blandade ovanpå, med blicken och armarna kvar): nyfiken på bollen, jätteglad när hon håller den, lite förvånad av dunset, jätteglad på "bra jobbat", stolt mot lådan, nyfiken mot teckningarna, fnissig efter hej då och en blinkning till oss på slutet.
- QA: boil 2,5 px/s (gränsen är 4,5; glansen följer boilen lite), −16,3 LUFS, inget klippt.
- Obs: stillbilder som renderas i omvänd ordning (t.ex. 13 före 4,2) kan tappa bollen, eftersom riggen minns att den släppts. Filmen spelas alltid framåt och påverkas inte.

## Runda 7 (Sanna: rummet lite plattare och med mer textur)
- **Plattare:** rummets ytor lyser till 40 % av sig själva (golv och matta 20 %, så att Kanels skugga syns kvar), så att lådsidor, dörr, hylla och kudde läses som platta målade färgfält. Objektivet är längre (24° i stället för 30°, kameran längre bort med samma utsnitt), så att perspektivet blir mindre brant.
- **Mer textur:** starkare vaxkorn i två skalor, mjuk ojämn färg på saker, golv och kudde och ett tredje kornlager på väggen. Fortfarande inga streck på väggen. Dörren har bara korn, eftersom dess bild upprepas och fläckarna blev ett mönster.

## Runda 8 (Sanna: lugnare och mer avsiktliga ansiktsuttryck)
- **Färre uttryck, kvar längre:** fyra stunder i stället för åtta: nyfiken när hon ser bollen (0,5–3,3 s), nöjd när hon håller den (3,1–4,9), jätteglad när "hurra" kommer (ca 2,5 s) och riggens glada ansikte i vinkningen. Förvånad, stolt, nyfiken mot teckningarna, fnissig och blinkningen på slutet är borta. Bytena tonas på 0,4 s.
- **Blicken:** den flyttas bara med ett syfte och långsamt. Hon tittar ner på bollen när hon ser den och en gång mot lådan där bollen hamnade, annars på oss. Blickflytten ut i rummet i början och blicken åt sidan efter hej då är borta.
- **Ingen blinkning ovanpå en ändring:** ingen blinkning inom 0,45 s från ett uttrycksbyte eller en blickflytt.
- QA: boil 1,9 px/s, −16,3 LUFS, inget klippt.

### Beslut (Sanna, efter runda 6): de gamla armarna igen
Kurvarmarna läggs ner igen. `?ricks` fungerar med Kanels målade armar (standard `armar=bild`): hurra-armarna blandas in i riggens `armar`, och klappen är riggens egen (`L.ROR.klappa`, tre klapp med gnistor) med klappljud från `effekter/klapp/`. Förhandsvisning: `lekrummet/lekrummet-ricks-bild-snabb.mp4` (`--fraga "dolly&ricks"`).

### Runda 7: ryck och bollen genom lådan (Sanna: "jittery", bollen gick genom lådan)
Mätt bildruta för bildruta (30 fps) i riggens värden. Det som ryckte, allt bakom `?ricks`:
- **Armarna:** klappen började när hurra-armarna stod på 70°, och riggens klapp börjar på 0°, så armarna föll 70° på en ruta. Klappen börjar nu när hurra-armarna är nere, och tonas in och ut på 0,25 s.
- **Riggens klapp-skutt:** riggens `lyft` (6 enheter på en enda ruta vid varje klapp) och sträckning togs med. Nu bara armarna.
- **Uttryckspoppen** steg på 0,1–0,15 s med en kurva som tog halva vägen på första rutan. Nu mjukt in på 0,25–0,3 s. Förvånad fick också extra sträckning och öron ovanpå uttryckets egna (dubbelt); borttaget. Uttrycken rör inte armarna längre.
- **Blicken och huvudet** hoppade 14 steg (och huvudvridningen med) när upplockningen började; tonas nu över på 0,6 s.
- **Nicken** hoppade på första och sista rutan (örat i fas 0,15 med `% 1`). Nu en mjuk 1 − cos. (Samma fel finns kvar i standardfilmen, orört.)

Bollen: handen släpper den framför lådans framvägg, och den gled snett ner genom framväggens överkant och landade delvis i den gula klossen. Nu går den först in över kanten och faller sedan, och landar i vänstra främre hörnet. Klossen i lådan (13 cm, ett hörn ut genom bakväggen, svävade 2 cm) är med `?ricks` 12 cm, lutad framåt i högra bakre hörnet, vilande på botten. Kollad var 1/120 s mot alla lådor med bollen som ellipsoid inklusive squashen: djupast 0,7 mm (vilar på botten). Täta bilder i `lekrummet/stills/runda7/`.

**Viktflytten** (Sanna: "som ett stelt papperskort"): förut vreds hela kortet kring fötterna (`luta` 1,2°, och blickens huvudlutning också som `luta`). Med `?ricks` går den nu genom riggens delar i samma takt (4,7 s): kroppen böjer sig från fötterna (`boj` 2,2°, fötterna står kvar) med 0,3° höft, huvudet följer 0,25 s efter och lutar lite emot (`skak`), öronen släpar 0,45 s (`skak[1]`, `oron` ±2,4 som `lutaH`), armarna pendlar 2° efter och kroppen trycks ihop en aning när vikten landar. Blickens lutning blir `boj` + `skak`.
**Armarna** (Sanna: "som en fågelskrämma"): uttryckens armar (glad 16, kawaii 20, jätteglad 40 ovanpå vilans 8) togs bort, och i vila hänger armarna 22° lägre, intill sidorna (inte i upplockningen och inte den vinkande armen). Hurra-armarna går till 45° (förut 78) och ner efter 0,2 s. Före/efter: `stills/runda7/fore/` och `efter/` (`vikt.jpg`, `armar.jpg`).

## Lärdomar (2026-11-24, gäller nästa rundor)
**Referensen (LostClips / claude-animated-shorts):** looken kommer från rummet, ljuset, kameran och klippen, inte från avancerade riggar. Platta kort mot kameran, riktiga skuggor från korten plus kontaktskuggor, lite skärpedjup, glöd och varm färgton. Olika vyer av en figur är separata teckningar som byts vid ett klipp. Ett kort vrids aldrig runt (figurer snurrar inte). Deras armar är tre punkter (axel, armbåge, hand) i ett tunt kurvstreck med en prick som hand, benen tvåbens-IK.

**Sannas beslut:**
- Kanels målade armar gäller. Kurvarmarna finns bara kvar som prov bakom `?armar=kurva`. Tunna streckarmar får provas, men tjocka böjda tuber och eftersläp/överslag är avvisade.
- Rummet ska vara plattare och texturerat (krita, papper), inte blankt 3D. Pallen och hyllan ser fortfarande för 3D ut, och golvet är fortfarande slätt: de är nästa sak att göra.
- Uttrycken ska vara lugna och avsiktliga: håll ett uttryck, byt på ett slag, inga små ryck.

**Inget går genom något** (QA-regel i `CLAUDE.md`, 1e356cec): ingen sak, figur, arm, tass eller kamera genom vägg, golv, lådkant, bord eller en annan figur. En boll som läggs i en låda går över kanten och faller ner. En tass som håller något ligger på det. Kameran stannar i rummet. Kontaktarket med 20 bilder missar korta ögonblick, så titta på täta bilder (6/s) runt varje kontakt. Sakhanteringen (bollen) är den svagaste delen hittills.

**Arbetssätt:** rendera bara headless (Playwright + ffmpeg, `window.seek`), öppna aldrig en videospelare. `--snabb` för förhandsvisningar, `verktyg/render-delat.mjs` för slutrenderingar, `qa-film.sh` på varje film. Line boil 2,5 px i bild (delat med zoomen), Malin 0,4–0,8 s efter handlingen, inga djurnamn, låsta figurer ändras inte (använd kopior). Committa när Sanna ber om det. Vid `.git/index.lock` från en annan session: vänta och försök igen, ta aldrig bort låset.

## Är vägen värd att ta?
**Ja, för återkommande rum och lugna scener, men som ett tillägg, inte som ny grund.** Runda 2 visar att vardagshandlingar fungerar utan nya bilder och utan att rigga om något: plocka upp, lägga i, vinka och Malin efter handlingen. Riggen bär hela handlingen, och 3D-rummet ger djup och lugna kameraåkningar som de platta scenerna inte har. Kostnaden är byggtiden. Rummet och scenen tog ungefär en arbetsdag med provet inräknat, och varje ny sak som går mellan figuren och rummet (bollen i lådan) behöver en liten överlämning i kod. Det lönar sig för ett rum som används i många avsnitt (lekrummet, köket, sovrummet, badrummet), inte för en plats som bara syns en gång.

## Nästa steg (förslag)
1. **Rumsbyggsats:** flytta lådan, klotet, teckningen, väggen, golvet, ljuset, kortet, kameran och efterbehandlingen ur `rum.js` till en gemensam fil, så att ett nytt rum bara blir en lista med saker. Prova sedan köket eller badrummet.
2. **Saker som egna kort:** en sak på golvet blir ett eget kort och lämnas över till handen vid greppet, så att den ligger still när kameran sveper.
3. **Flera vyer som byts vid klipp:** trekvart och sida för Kanel i v2, för kameravinklar över ca 30°. Bara vid klipp, aldrig en snurr.
4. ~~Kodarmar~~: avvisade 23/11. De målade armarna gäller.
5. **Ett riktigt avsnitt:** en bilderbokscen (`format/bilderbok.md`) i det här rummet med Malins hela manus, för att se om det håller i flera minuter och om renderingen står pall (nu ca 3 s per sekund film).

### Riggprov i rummet (`?prov`, Sanna 2026-11-24: "more walking and stuff, jumping sitting full test rig")
34 s med riggens egna rörelser i lekrummet, utan boll: står → går 0,5 m åt höger (`L.steg`, kortet flyttas i rummet, stegen följer sträckan) → två hopp (`ROR.hoppa`; hela kortet lyfts från golvet, kontaktskuggan krymper) → går tillbaka → sätter sig, sitter och tittar åt sidan, reser sig (`sattaSig`) → dansar (`ROR.dansa`) → klappar (`ROR.klappa`) → vinkar (`ARMROR.vinka`). Delarna blandas på 0,3 s vid varje skarv (inga hopp, mätt var 1/30 s). Armarna styrs av rörelsen och hänger 22° lägre i vila som i `?ricks`. Kameran följer i sidled med eftersläp. Förhandsvisning: `lekrummet/lekrummet-prov-snabb.mp4` (`--fraga prov`, stum).

### Rötterna och armen när kroppen vrids (`?ricks` och `?prov`, Sanna 2026-11-24)
- **Ingen vit söm vid rötterna** ("can the root of arms and legs have no white rim"): de vita linjerna var delarnas inbakade kanter (mest kroppens egen kant över armens och benets rot). Delarna bakom kroppen (kropp, armar, ben, öron, svans) får den rent vita kanten bortnyckad i ett SVG-filter (`#utanKant`), och kant.js-kanten runt hela silhuetten blir 7 enheter bredare, så att ytterkanten, händerna och fötterna har samma kant som förut. Armarna framför kroppen (klapp) behåller sin kant. Kanels bilder är orörda.
- **Armen när kroppen vrids**: gången i `?prov` använder inte riggens gångarmar (bakre armen framför kroppen ut över magen), båda stannar bakom kroppen och pendlar lite. Axlarna följer vridningen (`axlar`: 18 enheter per hel vridning), och den bortre armen blir lite kortare (86 % vid hel vridning). Före/efter: `lekrummet/stills/rot/`.

## Julkalenderns intro i 3D (prov 2026-11-24, `julkalender-intro/`)
Samma intro som `lucka.js` (liggande) med exakt samma tider och repliker, byggt med det vi lärt oss i lekrummet. Lucka 24 är provet (`?lucka=N`, `?inne=<forst.png>`).
- **Tavlan** står i snön som ett tjockt pepparkakskort (sju siluettlager bakåt, snökanten ljus lavendel), med en driva vid foten och riktiga skuggor. Himlen är Vinterkvällen utan stuga och gran långt bak, mjuka snökullar ger parallax.
- **Luckorna är dörrar på gångjärn** med kartongbaksida. De tidigare dagarna står öppna 100°, och insidan är papper med mjuk skugga.
- **Effekter:** girlangens bär tindrar, glitter blänker i snön, snön faller i tre djup (de närmaste flingorna suddiga, ingen flinga där tavlan eller Kanel står). Dagens lucka får en lysande guldram, vickar två gånger (4° och 3°) och sprider krit-gnistor när kaninen pekar. När den öppnas strömmar ett dämpat varmt ljus och gnistor ut (ingen vit blixt).
- **Kameran:** helbilden glider sakta in, knuffar mot luckan när kaninen pekar, åker fram medan "Nu öppnar vi …" sägs och väntar medan dörren slås upp. Sist glider den in i ljuset tills insidan (`forst.png`) fyller bilden. Gradering, bloom och oskärpa tonas bort de sista 0,4 s, så att skarven inte syns. `window.koll()`: kameran är som närmast 0,30 m från dörrens svep.
- **Skarven:** `skarva.sh` tar introts 328 rutor, sedan lucka 24:s film från ruta 328 (dess `OPPEN`) och till sist 3D-outrot i stället för luckans sista 350 rutor, med luckans eget ljud och tre nya effekter ovanpå (tindra vid guldramen, glitter när ljuset kommer, tindra på sista "Hurra!"). Film: `julkalender-intro/lucka-24-3d.mp4`. Bara introt: `julkalender-intro.mp4`, bara outrot: `julkalender-slut.mp4`. Luckans riktiga film är orörd.
- **Outrot (`?del=slut`, Sanna 24/11: "outro in 3d too"):** samma tider som lucka.js stängning (T0 = OPPEN + 3): kameran står i luckan när filmen tagit slut (sist.png, svart), backar ut medan dörren stängs, helbild, lucka 24 öppnas igen och inre guldramen glöder på de tre "Hurra!" medan kaninen vinkar. Sidan räknar sin tid från T0 (`OFFSET`), så filmen blir exakt de 350 rutorna. Fokus och snön följer med ut, och den rena bilden i luckan tonas till vanlig gradering de första 0,4 s.
- **Runda 25/11 (Sanna: mindre kameraåkning, tjockare kalender, putsad bakgrund):** plattan är 30 cm tjock (`DJ`) och kameran står till höger, så att bara den högra kanten syns. Kameran driver bara lite i början och knuffar mindre mot luckan. Himlen målas i koden (`himmelBild`): blå övergång, varmt sken vid horisonten, svaga stjärnor, en blek måne och två rader granar långt bort (horisonten 1,2 m upp, över kullarna).
- **Kanel 25/11 (Sanna: bättre vinka och uttryck, ett glatt hopp):** vinkningen är husets `ARMROR.vinka` med armen mot tavlan (den yttre armen hamnar utanför bild). Uttrycken: vänligt glad i vila, jätteglad på "Hej!", nyfiken när den letar, kort förvånad när den hittar luckan och sedan jätteglad, jätteglad på "Hurra!". På sista "Hurra!" ett lugnt glatt hopp (riggens `ROR.hoppa`, 45 % höjd).
- **Luckorna och snön 25/11 (Sanna):** snötaket är mjuka platta klumpar med en rundad läpp, tre droppar och snö som glider ner över högra sidan. Bakom de öppnade luckorna en kvällsfärg med dagens sak som vit kritsiluett (`ikoner/NN.png`, husets urklipp ur `assets/rekvisita`, skiss 3 av 3). Alla luckor har gångjärnet till höger och de tidigare står i 105°; grannarna precis till vänster om dagens lucka står i 85° så att den sveper fritt. Kaninen står på x 1,65 (förut 1,45) och kameran är flyttad med. Pepparkakskanten har kritdrag och kryddprickar, girlangen en mjuk skugga, och marken låga snöhögar och tassavtryck.
- **Lamporna ("polish lights"):** varje bär i girlangen är en riktig lampa: en rund kärna som lyser (lite tillplattad), en mjuk halo och ett svagt varmt sken på tavlan bakom. De tindrar lugnt, var för sig. Guldramen kring dagens lucka sitter på dörren (inte framför tavlan), så den aldrig går genom en öppen grannlucka.
- QA (introt): inget svart, fryst eller tyst, boil 3,5 px/s (gräns 4,5).
- **Ikonerna, snön framför och alla dagar 25/11 (Sanna):** ikonerna blänker svagt till när kaninens blick sveper från lucka 1 till dagens lucka på "Vilken dag är det idag?" (`ikonGlod`), och i slutet tänds de i guld en i taget från 1 på "Nu är alla luckor öppnade!", med `glimt` i `LJUD_SLUT`. Sex stora suddiga flingor driver precis framför kameran när den åker fram mot luckan (`naraFlingor`). Luckorna sticker bara ut 5,2 mm upp och ner (`EY`; raderna har 11,8 mm springa, och 6 mm gick 1 mm in i luckan ovanför när dagens dörr svängde). `window.kollAlla()` provar kameran mot varje öppen dörr och dagens dörr genom hela svepet mot de öppna grannarna. Alla 24 dagar klarar provet (minst 1 mm vid gångjärnen, kameran som närmast 4,9 cm från lucka 11 på dag 19).
- **Alla luckor (Sanna 25/11: "all julkal needs new intro + outro"):** `skarva.sh <luckmapp>` gör samma skarv för vilken lucka som helst, och `skarva.sh --alla` för alla 24 i tabellen i `produktion/youtube/julkalender-parkerade.md`. Numret och `slut` läses ur luckans `index.html`, tiderna ur sidan (`render.mjs --tider`), och bilderna bakom dörren (`forst.png`, `sist.png`) tas ur luckans egen film vid skarvarna. Vanliga luckor får 3D-stängningen med *"Vi ses i morgon!"* (`?slut=vi-ses-i-morgon`, 72 rutor: dörren stängs, kameran backar, kaninen vinkar), lucka 24 alla-luckor (350 rutor). Introt och outrot sparas i `<luckmapp>/3d/` och renderas bara om när `rum.js`, tiderna eller bilderna har ändrats (ca 2 min per lucka). Filmen skrivs över och märks `comment=…-3d`; 2D-versionen läggs i `<luckmapp>/aldre/<namn>-2d.mp4` första gången. `jul/mastra.sh` kör skarven sist av sig själv (`SKARVA=0` hoppar över), så `hel-video.sh` och kodluckornas `render-delat.mjs` + `mastra.sh` ger 3D-ramen direkt. Skarvkontroll: stämmer inte rutorna vid OPPEN och stängningen (PSNR under 22), är 2D-luckan byggd med andra tider och måste byggas om först.
- Inte gjort: kvällsluckorna (`kvall`, lucka 2) får samma 3D-ram, det finns ingen kvällsvariant; Shorts (stående) är inte byggda i 3D.

### ?prov runda 2 (24/11, inte godkänt än): upplockning, flygande kamera, ljud, ?djup och ?puff
- **Kanten:** utan rötterna blev kant.js-kanten 7 enheter bredare, för tjockt (Sanna). Nu 3 enheter, i ?ricks och ?prov.
- **Upplockningen** är provets första del (0–8 s, samma tider som ?ricks, så bollens fall i lådan och den mindre klossen gäller). Filmen är 42 s.
- **Kameran** skrivs som vyer med `verktyg/kamera3d.mjs` (`KPLAN.stall`): flyger in uppifrån, åker in till närbild när hon håller bollen, ut igen, sedan en båge på högst 30° (−20° till +10°) som följer henne (platsen `folj`), och närmare till klappen och vinkningen.
- **Ljud** (`PROV_LJUD`, bara effekter/): steg (smyg), hopp-mjuk och landa-mjuk, lagga-sig, prassel-tyg, tass i dansen, klapp, duns för bollen, hemmaljud 0,3. Tiderna är mätta ur riggen och räknas från delarnas start. `lekrummet-prov-effekter.wav` görs med `--bara-ljud --fraga prov` (skriver över `lekrummet-effekter.wav`, så ta en kopia först).
- **?djup** (inom v2): silhuettens mjuka skugga på golvet (åt höger, solens egen faller rakt bakåt och syns inte), skugga under nosen och under de främre armarna, varm/kall ton i kortet, förgrundsklossar som blir suddiga. Ingen skugga på väggen: hon kommer aldrig nära den.
- **?puff** (bryter mot v2, bara test): volymen bredare (radie 240), ±13 %, ingen glans.

### Runda 2 av introt (Sanna 24/11: konturen, snön, mysigare, närmare, riggens lärdomar)
- **Konturen:** tjockleksskikten hade fått kritkornet i de genomskinliga hörnen (multiply fyller genomskinligt), så en grå rektangel syntes runt tavlan. Nu klipps de med tavlans egen alfa.
- **Snötaket i 3D:** bildens snö mäts kolumn för kolumn, jämnas ut och blir en pösig, rundad kudde (ca 13 cm djup), som hänger ut fram och bak och kastar en mjuk skugga på tavlan. Den täcker den målade snöns kant.
- **Tjockare tavla:** en massiv pepparkaksplatta, 16 cm, med rundade kanter (2 cm) i tavlans kontur och mörkare sidor (lagren är borta). Kameran börjar snett från vänster (ca 35°), så att kanten syns, och glider runt till nästan rakt fram när kaninen pekar. Därifrån syns också siffrorna på de öppna luckorna.
- **Mysigare ljus:** lägre och gyllene sol med längre skuggor, lavendel i skuggorna, ett varmt punktljus från girlangen, större och starkare bärlampor och en varmare gradering.
- **Närmare:** helbilden står ca 0,6 m närmare, och Kanel står 17 cm närmare tavlan, så att båda ryms.
- **Kanel enligt runda 7–8:** ingen rigg-vila (blicken flyttas bara mot tavlan och luckan), lutningen går genom `boj` + `skak` i stället för `luta` på hela kortet, armarna hänger 22° lägre intill sidorna när de inte används, uttryckens egna armar är borta, viktflytt i 4,7 s-takt med huvudet och öronen efter, inga blinkningar inom 0,45 s från en ändring och ett lugnare skutt.
- QA: boil 3,7 px/s, inget svart, fryst eller tyst; kameran som närmast 0,29 m från dörren.
- **Rötterna (24/11, Sanna: "roots of legs and tail is showing"):** benens långa rötter tonas bort i sin yttre ände (osynliga 62 enheter in i kroppen från leden, fulla 28 in), så den raka kanten där roten slutar syns inte när benen spretar. Leden och roten närmast kroppen är orörda. Svansens bruna rot-skiva tas bort på färgen (med 6 enheter runt om), bara tofsen är kvar. Armarna lämnas: deras rot ligger utanför kroppen i gången och fäster armen. Kanten (kant.js) byggs av en brantare alfa (under ca 0,4 ingen kant), annars blev tonade rötter bleka. Gäller ?ricks och ?prov. ?prov har ?djup alltid (Sanna: djup före puff).
