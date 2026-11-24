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

## rum2: rikare rum och ljusdetaljer (2026-11-24, Sanna godkände, standard)
**rum2 är standardrummet**, också i `?ricks`; `?rum1` ger det gamla rummet från runda 7 för jämförelse. **Det är mönstret för 3D-rum i Lilla Kritan:** nya 3D-rum (köket, sovrummet, badrummet, rumsbyggsatsen i Nästa steg) byggs med samma recept: trä, tyg och papper som kanvastexturer med kritkorn, jämn vägg i en stark färg med svag tapet (inga stora fläckar, inget grovt korn), solfläck bara på golvet, hörn- och kontaktskuggor som multiply-lager, svagt motljus utan skugga, papperskornet över hela bilden och lite mer mättnad. Allt är kanvastexturer och three.js, inga nya bilder.
- **Material:** trägolv (ljusare och varmare, fyra plankor per 2 m med egen ton, ådror och förskjutna ändskarvar, `golvBit2`), träådror på hyllan, dörren och leksakslådan (svagare, målat trä; `adror`, `lada(..., { tra })`), vävd matta med luddiga kanter mellan ringarna (`mattBit2`), kudden i tyg med en söm runt (`klot(..., tyg)`).
- **Ljus som målade lager:** en mjuk solfläck på golvet från ett fönster till vänster utanför bild (ingen på väggen, Sanna 24/11), fylld med ljusa snea kritdrag som i plattan (`solBit`, additiv), mjuk hörnskugga där golvet möter väggarna med en aning grönt från väggen, kontaktskuggor under lådan, klossarna, kudden och krukan, och en mjuk skugga under hyllan (`rum2Ljus`, multiply). Ett svagt varmt motljus från höger utan skugga så att sakernas skuggsidor inte blir grumliga.
- **Vägg, växt och papper (Sanna 24/11):** väggen mer turkos (`#0fa08d`, golvlisten `#136a5e`) med en svag tapet: ljusa kritränder var 30:e cm och små femprickiga blommor emellan (`tapet`). Ny krukväxt: terrakottakruka med kant och jord, nio platta blad i två gröna med kritad mittnerv i en solfjäder (`vaxt`). Väggen utan de stora ljusa och mörka fläckarna och utan det grova kornet (en kornruta på 1,5 m gav moln), så den är jämn; bara det fina kornet är kvar. Hela bilden ligger på papper: papperskornet läggs still över bilden i två skalor, ±8 %, i graderingen, så att Kanel och rummet ser ritade på samma ark ut.
- **Leksaksbil (Sanna 24/11):** gul kaross, blå hytt, ljusa fönster, fyra hjul med navkapslar, 30 cm, på golvet framme till vänster mellan kudden och mattan (`bil`, `BIL`), med kontaktskugga. Syns i helbilderna, inte i närbilden; ingen rör den.
- **Gradering:** 6 % mer mättnad, svala skuggor och varmt ljus. Vinjetten oförändrad (0,12).
- Inte gjort: kantljus (rim light) på klossarna, ljusare vägg. Platthetens emissive-pass (runda 7) gäller också i rum2.
- Prov: `lekrummet/rum2-fore-efter.jpg` (överst runda 7, underst rum2, 2, 8 och 14 s), `lekrummet/lekrummet-rum2-snabb.mp4`, `lekrummet/lekrummet-ricks-rum2-snabb.mp4` (`?ricks` med rum2 som standard).

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
