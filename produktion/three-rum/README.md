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

## Är vägen värd att ta?
**Ja, för återkommande rum och lugna scener, men som ett tillägg, inte som ny grund.** Runda 2 visar att vardagshandlingar fungerar utan nya bilder och utan att rigga om något: plocka upp, lägga i, vinka och Malin efter handlingen. Riggen bär hela handlingen, och 3D-rummet ger djup och lugna kameraåkningar som de platta scenerna inte har. Kostnaden är byggtiden. Rummet och scenen tog ungefär en arbetsdag med provet inräknat, och varje ny sak som går mellan figuren och rummet (bollen i lådan) behöver en liten överlämning i kod. Det lönar sig för ett rum som används i många avsnitt (lekrummet, köket, sovrummet, badrummet), inte för en plats som bara syns en gång.

## Nästa steg (förslag)
1. **Rumsbyggsats:** flytta lådan, klotet, teckningen, väggen, golvet, ljuset, kortet, kameran och efterbehandlingen ur `rum.js` till en gemensam fil, så att ett nytt rum bara blir en lista med saker. Prova sedan köket eller badrummet.
2. **Saker som egna kort:** en sak på golvet blir ett eget kort och lämnas över till handen vid greppet, så att den ligger still när kameran sveper.
3. **Flera vyer som byts vid klipp:** trekvart och sida för Kanel i v2, för kameravinklar över ca 30°. Bara vid klipp, aldrig en snurr.
4. **Enklare armar som tillval:** raka kritstreck som hålls stilla per bild, för figurer där kodarmarna blir besvärliga.
5. **Ett riktigt avsnitt:** en bilderbokscen (`format/bilderbok.md`) i det här rummet med Malins hela manus, för att se om det håller i flera minuter och om renderingen står pall (nu ca 3 s per sekund film).
