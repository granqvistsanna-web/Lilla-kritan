# Kritans bok – receptet från 062 Sommaren i boken

**Kritans bok** är bilderboken ([bilderbok.md](bilderbok.md)) berättad i en uppfällbar bok i three.js. Boken ligger på ett skrivbord, pärmen slås upp, landskapet reser sig i papperskort, och berättelsen händer inne i uppslaget. Ingen sång: Malin (BERÄTTAREN) pratar med **en** djurfigur, som svarar med ljud, ögon och små hopp. Varje avsnitt har **ett tema** (en årstid, ett väder, en färg, djur på en plats) i stället för en vardagshändelse.

Förlagan för berättelsen är `avsnitt/062-sommaren-i-boken/` (grind 6, runda 7, 2026-11-27). Sedan dess finns också 063 Hösten, 064 Vintern och 065 Våren i boken, och **den nyaste scenkoden är 064 och 065** (de har hjälpare som 062 saknar). Allt som inte står här gör man som i bilderboken: rösten, ljuden, grindarna, QA och YouTube. Det här receptet beskriver bara det som skiljer sig. **Skillen `bilderbok`** pekar hit för bokavsnitt. Receptet gicks igenom mot alla fyra avsnitten 2026-11-27. Det som är Sannas beslut står med datum eller runda, och det som är förslag från genomgången står under *Puts att pröva*.

## Formen

| Del | 062 | Scentid (s), runda 7 |
|---|---|---|
| Intro | Lilla Kritans logotyp 1 s. Inget *"Djuren hittar på!"*-kort och inget ritintro på papper: boken är introt | före scenen |
| Boken öppnas | skrivbordet med den stängda boken (temats huvudsak i siluett på pärmen). Kameran driver lugnt mot boken, pärmen slås upp (0,9 s), korten fälls upp bakifrån och fram (ca 0,8 s), kameran glider in i boken (ca 4 s). *"Titta! En bok."* – *"Oj! Det är sommar i boken!"* | 0–10 |
| Något saknas | *"Himlen är blå. Men var är solen?"* Kritan ritar temats huvudsak inne i boken (solen på himlen), gisspaus 3 s, den fylls i | 10–22 |
| Hej, figuren | figurens kort fälls upp sist med ett `pop`. Hej, samtal (Malin frågar, figuren svarar i pausen) | 22–33 |
| Problemet | temat ger problemet (för varmt). Inget trots: figuren vill, men något i temat är svårt | 33–46 |
| Hjälpen | kritan ritar en hjälpsak på sidan (glassen), *"Varsågod"* – *"Tack, kritan!"*, leken med saken och en liten överraskning (glass på näsan) | 46–90 |
| Temats lek | figuren gör leken på riktigt (hoppar mellan bladen, *"Hopp … plask!"*, och badar: simmar ett varv och plaskar, runda 7) | 90–119 |
| Barnet hittar och säger | saker som syns i uppslaget hela tiden, barnet tittar och Malin säger dem med färgorden (*"Ser du några blommor?"* … *"En röd blomma! En gul blomma!"*), och figuren går dit och luktar | 119–149 |
| En sista sak | i 062 **bygger figuren den** (sandslottet: spaden, hinken vänds två gånger, hela slottet på *"sandslott"*, runda 7). I 063–065 poppar den upp på sitt ord (svampen, snögubben av de tre bollarna, fågelboet i trädet) | 149–187 |
| Hej då | hej då till figuren och till varje sak i boken, sedan *"Hej då! Vi ses snart!"* | 187–211 |
| Boken stängs | kameran glider ut, korten fälls ner i omvänd ordning (figuren först), pärmen slås igen. Ersätter kritirisen | 211–214 |

**Längden:** 062 är 3:34 i runda 7 (2:16 i animatiken, den har vuxit med badet, sandslottet och hej då). De godkända animatikerna för 063–065 är 3:48, 3:21 och 3:55 med loggan (*"Behåll 3:55"*, Sanna 27/11). Räkna med **3:15–4:00**, och **räkna längden ur raderna** innan du lovar något: röstfilernas längd + `GLES` × antalet rader + gisspauserna (3 s var) + öppningens och stängningens rörelse. 065 uppskattades till 3:00–3:15 och blev 3:55, för `GLES` 1,0 s på 43 rader (43 s) räknades inte med. Prenumerera-kortet och outrot läggs på efter stängningen som i alla avsnitt (`format/intro-outro.md`).

## Filerna

Samma som bilderboken (`manus.md`, `rost*.txt`, `ljud-effekter.md`, `storyboard/`), men scenen är en three.js-sida:

| Fil | Vad |
|---|---|
| `manus.md` | som 062, plus tabellen **Uppslaget – korten** (varje kort bakifrån och fram: bild, och om det *finns*, är *nytt* i Flow eller ritas i *kod*) och avsnittet *Gissa, lära, lugnt* (063–065). Skriv **statusen som en tabell**, en rad per grind (datum, Sannas ord, filen), inte som ett långt stycke: nästa session läser den för att veta var arbetet står |
| `bildlista.md` | grind 2: bara det som är nytt eller ska göras i ordning (Flow-prompterna, kritans två teckningar, tunnade kanter), avsnittet *Ritas i kod* och vilken tagning Sanna valde |
| `grind2/`, `prov/`, `kod/` | kontrollbilder för konturer och kort sida vid sida (`grind2/`), stillbildsprov som Sanna väljer mellan (`prov/<sak>/`), och det som ritas i kod för temat (064: `kod/vinter.js`) |
| `storyboard/rader.mjs` | raderna som i bilderboken, plus `s` per rad: bokens läge (vy, pärm, kort, saker, figurens plats). Varje rad ärver läget från raden före |
| `storyboard/scen.js`, `scen.html`, `bygg.mjs` | stillbilderna i three.js-boken till animatiken (grind 5). Figuren är ett platt kort här, riggen kommer i grind 6 |
| `storyboard/uppslaget.js` | **uppslaget, byggt en gång** (065 och mallen): boken, korten, koordinaterna och vyerna (`byggUppslaget(scen)`). Både `storyboard/scen.js` och `scener/boken/boken.js` läser den. 062–064 har uppslaget kvar i båda filerna (se avsnitt 5) |
| `scener/boken/index.html` | sidan: canvasen, den dolda SVG:n `#kort` där riggen ritas, `#ov` där kritan ritar, vinjetten |
| `scener/boken/boken.js` | scenen. Läser `rader.mjs` direkt och sätter `window.seek`, `window.LJUD`, `window.DURATION` |
| `scener/render.mjs` | en rad som pekar på den delade renderaren `produktion/three-rum/render.mjs` (filen finns kvar för att `render-delat.mjs` och `molnrender.sh` letar efter den bredvid scenmappen). `--snabb` för förhandsvisning, tider för stillbilder |
| `produktion/three-rum/popupbok/bok-parm.js` | **delad:** skrivbordet, boken (`skapaBok`), krit-ytor, `trim`, `tex`, `SIDA` |
| `produktion/three-rum/popupbok/uppslag.js` | **delad:** motorn för uppslaget (kortmotorn, ordningen upp och ner, figuren på sitt kort, kritan på en 3D-yta, kameran, skärpedjupet, ljuset, ljudet). Se avsnitt 5 |
| `produktion/three-rum/popupbok/bilder/` | Sannas Flow-bilder för boken (himmel, moln, kullar, sol, glass, sand …) |
| `avsnitt/_mall-kritans-bok/` | **mallen:** ett litet körbart bokavsnitt (`storyboard/` och `scener/`) som pekar på modulen. Kopiera den och byt det som är temat |

### Rendera

En hel förhandsvisning i en enda process tar lång tid: 065 gick i 0,62 s per bildruta, alltså ca 36 min för 3:55, och `render.mjs` skriver rakt på `boken.mp4`, så den gamla filmen går inte att titta på under tiden och är borta om körningen dör. Gör så här i stället:

| När | Kommando |
|---|---|
| Stillbilder (layout, vyer, en rörelse) | `node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken 12 45.5 103` → `stills/<t>.jpg` och `stills/sheet.jpg` |
| En feedbackrunda: bara raderna som ändrats | `node …/render.mjs …/scener/boken --snabb --fran 96 --till 119` → `boken-96-119.mp4` med ljud |
| Hela förhandsvisningen (en gång per runda) | `node verktyg/render-delat.mjs avsnitt/NNN-namn/scener/boken --snabb --bitar 4` (bitar i en egen tillfällig mapp, den gamla filmen till `aldre/`, antalet bildrutor kontrolleras) |
| Slutrenderingen | i molnet: `bash verktyg/molnrender.sh avsnitt/NNN-namn/scener/boken` (committa och pusha först), eller `render-delat.mjs` utan `--snabb` |

Scenen hämtar three.js från jsdelivr (`importmap` i `index.html`), så både datorn och molnets maskiner behöver nätet när de renderar.

## 1. Berättelsen

### Kärnan

Samma kärna som bilderboken, men problemet kommer ur temat:

1. **Boken öppnas och temat syns.** Malin säger temat i första repliken (*"Det är sommar i boken!"*).
2. **Något saknas.** Temats huvudsak fattas (solen). Kritan ritar den inne i boken, och den är också siluetten på pärmen. Kritans första teckning är alltid en sak, aldrig figuren.
3. **Hej, figuren.** Figuren kommer upp sist, på sitt kort. Hej och ett första samtal.
4. **Problemet** är temats: för varmt, för kallt, blött, blåsigt, något har tappat sin färg. Ett vardagsproblem utan trots.
5. **Kritan ritar en hjälpsak** på sidan. *"Varsågod, …"* – *"Tack, kritan!"* direkt. Leken med saken och en liten överraskning.
6. **Temats lek** med en fras som upprepas (*"Hopp … plask!"*). **Figuren gör leken på riktigt:** badar, bygger, rullar, vattnar. I 062 kom badet och sandslottsbygget först i runda 7 (*"kan grodan bada?"*, *"maybe add scene where frog build sand castle"*) och krävde en ny rösttagning. Skriv in det i grind 1.
7. **Barnet hittar och säger** saker i uppslaget: de syns hela tiden, barnet tittar, Malin säger namnet och färgen på varje.
8. **En sista sak** poppar upp på sitt ord, eller så bygger figuren den (062:s sandslott, 064:s snögubbe av de tre bollarna).
9. **Hej då** till figuren och sakerna, och boken stängs.

### Gissa, lära, lugnt (Sanna 2026-11-27)

*"Make sure there are some guessing element and some pedagogic touches, and calm."* Gäller alla bokavsnitt från 063 och står som ett eget avsnitt i manuset (förlaga: 064).

- **Gissa:** tre–fyra gisspauser på 3 s, och svaret kommer efter pausen. Kritans två teckningar är alltid två av dem. De andra kan vara ett ljud innan man ser vem som låter (064: *"Vem är det som piper?"*), vad något ska bli (064: de tre snöbollarna), eller något uppe i trädet (065: boet). Inget är gömt, och aldrig *"Vad kan det vara?"*.
- **Lära:** några få saker, **en gång var, och bilden visar det när Malin säger det.** Färger (en sak i taget), räkna till tre (varje sak studsar på sitt tal, 065 visar siffran i krita bredvid), stor/mellan/liten, kall och varm, hur något låter.
- **Lugnt:** `GLES` 1,0–1,1 s (062: 0,9), kameran glider mellan närliggande vyer, figuren rör sig med små skutt och lugna steg, vädret faller långsamt och glest (064: ca 0,4 flingor per sekund i halvbild), mattan lågt (ca 0,25), mjuka `pop`. Malins repliker är mest påståenden med `[warmly]` och `[softly]`, och utrop bara där något händer.

### Fem saker byts per avsnitt

**Temat, figuren, huvudsaken (det som saknas), hjälpsaken och sakerna barnet hittar.** Allt annat (boken, skrivbordet, öppningen, stängningen, kameran, kritan) är samma. Se temabladet längst ner.

### Regler för manuset

Alla bilderbokens regler (inga djurnamn, v3-taggar utan `[excited]`, aldrig *"Vad kan det vara?"*, *"Vad säger man?"* eller *"Ska vi säga tack?"*, inga tomma medhåll, Malin efter handlingen, frågor före, inga utdragna ord). Dessutom, från 062:

- **Barnet letar inte efter något gömt.** Sakerna barnet ska hitta står synliga och utspridda i uppslaget hela tiden. Malin frågar *"Ser du några …?"*, barnet tittar 3 s, sedan säger Malin dem en i taget med färgen, och varje sak studsar och glimtar på sitt ord (runda 4).
- **Inte samma sak tre gånger med olika ord.** *"Solen skiner. Det blir varmt!"* – *"Puh! Grodan är så varm."* – *"Är du varm, grodan?"* blev för upprepande (runda 5). Säg det en gång och visa det i bilden.
- **Hej då till varje sak:** figuren, huvudsaken, sakerna och platsen, en kort bild per sak (*"Hej då, solen!"*, *"Hej då, blommorna!"*, *"Hej då, dammen!"*). Kameran visar saken när den nämns, och saken studsar och glimtar på sitt ord (runda 5, 062 rad 24–24d).
- **Allt i uppslaget fälls upp när boken öppnas** (runda 6). Bara figuren, kritans hjälpsak och den sista saken kommer senare, och **de poppar upp på sitt ord**. Blommorna, som förut fälldes upp på *"Ja, där är blommorna!"*, står nu uppe från början.
- **Statister** (063:s ekorre, 064:s fåglar, 065:s fjäril och nyckelpiga) är vanliga små djur, platta kort eller ritade i kod, med ett ljud och en rörelse var. Bara den riggade figuren pratar med Malin.

### Avstegen som receptet redan har

Ingen sång. Inget *"Djuren hittar på!"* och inget ritintro på papper. Kameran glider in i boken i början och ut i slutet i stället för zoom in och kritiris. Fler än 6 utsnitt. En plats (uppslaget) och inget platsbyte. Säg till Sanna om manuset bryter `format/regler.md` på något annat sätt.

## 2. Grindarna

Bilderbokens sex grindar i samma ordning, med Sannas ja vid varje. Det som är annorlunda:

| # | Grind | Extra i Kritans bok |
|---|---|---|
| 1 | Manus | temat, huvudsaken, bokens färg och siluetten på pärmen bestäms här. Tabellen *Uppslaget – korten* (vad som finns, vad som är nytt, vad som ritas i kod). Kolla före Sannas ja: *Gissa, lära, lugnt* finns, figuren **gör** temats lek, och längden är räknad ur raderna |
| 2 | Rekvisita | `bildlista.md`. Kritans två teckningar behöver urklipp med tunn kant och kontur: `verktyg/kontur.py` ger `<sak>-kontur.json` (kontur + 2–6 detaljstreck) bredvid `cut/<sak>.png`, med en kontrollbild i `grind2/`. Nya landskapskort görs i Flow (helst som en edit av ett befintligt kort, så att formen är densamma) och hamnar i `popupbok/bilder/`, alla tagningar i `original/`. **Ritas i kod eller bild?** Se regeln nedan. Befintliga urklipp med för tjock eller tunn kant får en kopia för boken med kanten ca 1 % (`tunn_kant.py`), originalen i `assets/` rörs inte. Alla kort sida vid sida i en bild (`grind2/landskapskort.jpg`) |
| 3 | Rösten | som bilderboken |
| 4 | Ljuden | som bilderboken. Befintliga ljud först (062–065 använde bara befintliga). En matta under hela scenen som passar temat |
| 5 | Animatik | stillbilderna ritas i three.js-boken (`storyboard/scen.js`), inte i 2D. Figuren är ett platt kort |
| 6a | **Stillbilder ur scenen** | innan någon rörelse putsas och innan någon film renderas: **en stillbild per rad ur den riktiga scenen**, med riggen på kortet, i ett kontaktark. Här ser Sanna layouten, skalan, vyerna, bokens kanter och färgerna. 062:s runda 3–5 handlade nästan bara om sådant (större bok, sakerna utspridda, större sol, hela uppslaget i bild, kameran högre), och varje runda kostade en hel förhandsvisning. Gå igenom *Bokkollen* (under Scenen) på stillbilderna först |
| 6b | Förhandsvisning | `boken.js` med `--snabb` (se *Rendera*). **Är en del osäker** (062:s bad), gör ett **stillbildsprov** först: varianter bakom en URL-parameter (`?bad=2`, `?prov=s`), stillbilder sida vid sida, och Sanna väljer innan rörelsen putsas |

**Ritas i kod eller bild (Sanna 2026-11-27, *"consider what can be drawn in code"*):** det som är litet, finns i många exemplar och rör sig ritas i kod (fallande löv, snö, droppar, vindkrumelurer, fjärilen, nyckelpigan, snön som växer in på granen). Det som är stort, står stilla och ska se ut som en kritbild är bilder (landskapskorten, träden, kritans två teckningar, sakerna barnet säger färgen på i närbild). Kod-sakerna får samma utseende som bilderna: `kritYta()` för fyllningen, vit kant enligt `verktyg/kant.js`, boil 2,5 px i bild och kontaktskuggan under. Formerna finns i `avsnitt/065-varen-i-boken/prov/insekter/prov.js` (`blob()`, `krit()`, `vit()`), och 063:s `bildlista.md` har en tabell att utgå från.

**Uppslaget byggs i dag två gånger,** i `storyboard/scen.js` (grind 5) och i `scener/boken/boken.js` (grind 6), så det Sanna godkänner i animatiken ritas om för hand i scenen. Kopiera koordinaterna och vyerna rakt av, och jämför en helbild ur båda innan grind 6a visas. När den delade modulen finns (avsnitt 5) ska båda läsa samma layoutfil.

## 3. Scenen

Börja från en kopia av **065:s eller 064:s** `scener/` och `storyboard/` (de nyaste, med `glimt`, `gaRikt`, `MAL` och kodritade saker som 062 saknar), eller från `uppslag.js` när den finns (se avsnitt 5). Byt bilderna, uppslagets layout, vyerna och figurens rörelser per rad. De fyra `boken.js` har glidit isär (bara ca 170 av 530–630 rader är fortfarande lika med 062), så en rättning som gäller hela serien måste göras i alla fyra tills modulen finns.

### Vad som är gemensamt och vad som byts

| Del i `boken.js` | Gemensamt | Byts per tema |
|---|---|---|
| Skrivbordet och boken (`skrivbord`, `skapaBok`) | ja, ur `bok-parm.js` | `farg` (pärmens färg), `figur` (siluetten: temats huvudsak) |
| Kortmotorn: `kort()`, `vik()`, `reser()`, `platt()`, `pa()` (på pärmens insida), `bredare()`, vit baksida, kontaktskuggan `KSKUGGA` | ja | – |
| Ordningen: korten upp bakifrån och fram när pärmen öppnas, ner framifrån när den stängs (`ORDNING`, `NER`), figuren upp sist och ner först | ja | vilka kort som är med |
| Marken: gräsarket i `kritYta` med rundade hörn | formen | färgen (gräs, snö, löv, sand) |
| Uppslagets layout: himmel och moln på pärmen, kullar längst bak, träd, buskar, platta saker (dammen, bladen), korten fram | strukturen | bilderna och koordinaterna |
| Figuren: v2-riggen ritad i `#kort` varje bildruta och lagd som textur på ett kort (som Kanel i lekrummet), boil 2,5 px och vit kant 3 px i bild räknat mot kamerans avstånd, `fig2varld` för saker i handen | ja | riggens mapp, `HAND` om figuren saknar referensark, kortets höjd |
| Figurens platser och hopp (`BLADPOS`, `HOPP`, `SKUTT`, `grodPos`) | hoppmotorn | platserna |
| Figurens rörelser per rad (`switch (id)` i `grodan(t)`), `REAKTION` (reaktionsslaget i radens slut) | mönstret, `vink()`, `nick`, `blicka` | varje rad |
| Kritan ritar på en 3D-yta: `affin()`, `teckning()`, `ritaKritan()` via `verktyg/kritan-ritar.js`, kritan ×1,25 i närbild | ja | vilka två saker och var |
| Kameran: vyer (`VY`), `vy()`, `glid()`, `lage`, `fran3`, `skjut`, `kameraplan` ur `verktyg/kamera3d.mjs`, öppningens och stängningens glidning | ja | vyernas koordinater |
| Skärpedjupet (`BokehPass` med kortens egna djupmaterial), oskärpa per vy | ja | – |
| Ljuset och värmegraderingen | ljuset | om temat ändrar ljuset (varmare, kallare, grått) |
| Effekter: ringar på vattnet, stänk, droppar, svett och värmestreck, tungan som slickar | – | temats egna (snöfall, löv som faller, regn, regnbåge) |
| Ljudet ur raderna, kritans ritljud som slinga, mattan lågt under allt | ja | mattan, figurens ljudfamilj, volymerna |

### Uppslaget

- **Boken fyller bilden.** Inne i boken ska kanterna och bordet inte synas, utom i öppningen och stängningen (runda 5: *"can book be bigger so I don't see the edges outside book?"*). Gör boken större eller vyerna snävare hellre än att visa skrivbordet bakom. Det här missas lätt i vyer nära sidans kant och hörn: i förhandsvisningarna 27/11 syntes bordet eller sidans kant i 062 (sandhörnet), 063 (helbilden och vyn vid eken) och 064 (trädet med fåglarna). Se *Bokkollen*.
- **Bredare bild, sakerna i skala.** Uppslaget ska kännas som ett landskap, inte några stora saker på ett bord (runda 4). Prova med `?prov=s` (sakerna × 0,72) om bilden känns trång.
- **Temats huvudsak är stor** och syns tydligt (runda 5: solen större, gärna med ett enkelt ansikte). Den **gungar lugnt, den snurrar inte**, och det som ritas runt den i kod följer bilden (runda 6: solens strålar som bilden).
- **Sakerna barnet hittar är små nog att få plats** bredvid varandra (runda 6: mindre blommor).
- **Sakerna barnet ska hitta står utspridda,** inte i en rad där de skymmer varandra (runda 5), och syns hela tiden.
- **En sak står på något:** sandslottet får en sandfläck under sig, en sak på gräset står på marken med sin kontaktskugga (runda 5).
- **Kontaktskugga, inte vikflik:** en mjuk rund skugga vid kortets fot. Den gröna vikfliken såg ut som en fyrkantig skugga (Sanna 27/11).
- **Lövträd bland granarna** och enskilda blomurklipp i stället för en blomgrupp (runda 4): ett uppslag blir levande av några olika sorter.
- Siluetten på pärmen är **temats huvudsak**, inte figuren (runda 5: *"book cover silhouette should be sun"*). `skapaBok(scen, { farg, figur: <huvudsakens urklipp> })`. Välj en form som går att känna igen som siluett: solen, lövet och snöflingan gör det, men 065:s tulpan i knopp blir en klump. Titta på pärmen i liten storlek (miniatyrens storlek) innan den bestäms.
- **Korten ska passa temat.** Ett kort som lånas från ett annat avsnitt kan ha fel årstid: 065:s vår har äppelträd med röda äpplen och en ek med ekollon. Gå igenom varje lånat kort i grind 2.
- **Vinjetten får temats ton** (064: kall blågrå i stället för varm brun), högst 0,14.

### Figuren på kortet

- Riggen är den vanliga v2-riggen (`lk-figur`), raka armar, figuren speglas och snurrar aldrig. Det som riggen inte har (en hand som håller, munnen) mäts i scenen, inte i riggen.
- **Visa känslan i bilden:** värme med svettdroppar och värmestreck över huvudet och en lite besvärad min, inte bara orden (runda 4: *"show signs of heat"*, *"look a bit distressed"*). Svaret ja är en nick.
- **Glad = munnen syns** (`jatteglad`, inte `mums`, som inte har någon mun).
- **Glädjehopp** på stället är två små skutt, inte ett stort.
- **Äta:** tungan slickar på kulan, en bit är borta på *"Mums"*, och det sista äts upp med tre slick innan struten släpps. Glassen hoppar aldrig ur handen (runda 4 och 5).
- **Vinka hej då** med armen högre och tydligare vift, på den sida som inte skyms av ett kort, i en närmare vy (runda 3).
- **Reaktionsslaget:** varje rad har `GLES` s luft i slutet (062: 0,9 s) där figuren byter uttryck och lutar huvudet lite. Öppningen och stängningen får ingen extra luft.

### Vatten, väder och andra effekter

- **Ringar på vattnet** när figuren hoppar: få, lugna, svaga, och **under** bladen, aldrig över dem (runda 5).
- **Figuren sjunker inte** genom sidan. 062 slutade med **bad 4** (Sanna 27/11 *"make bad 4"*): figuren badar utan vågkort, vattenlinjen ligger i kortets fot och en vattenkant ritas framför kroppen, och i runda 7 simmar hon ett varv och plaskar. Bad 3 (figuren på ett tredje blad, vattnet ringar sig runt bladet) och vågkortet framför figuren (bad 1–2) valdes bort. 063 löser samma sak för lövhögen genom att dela den i en bakre och en främre halva.
- **Droppar** har en tydlig väg: faller på huvudet, delar sig, rinner ner. Slumpade droppar *"make little sense"* (runda 3).
- Ett nytt väder (snö, regn, löv) är ett lager av små platta kort eller sfärer i kod som faller långsamt och lägger sig **på** sidan, aldrig genom den.

### Inget går genom något

- Korten fälls ner åt samma håll, och det som reser sig först ligger överst. Pärmen slås igen först när alla kort ligger platt.
- Figuren landar **på** ett blad, en sten eller marken. Saker i handen ligger i handens spets, framför tassen.
- Kameran stannar inne i boken och går aldrig under sidan eller bakom pärmen.
- Täta bilder (6 per sekund) i QA runt öppningen, varje hopp, varje kort som fälls upp, saken i handen och stängningen.

### Bokkollen

Gå igenom stillbilderna i grind 6a och förhandsvisningen med den här listan, före Sanna. (Punkt 1–3 går att räkna i kod och borde bli en `--bok`-koll i `verktyg/qa-scen.py`. Den finns inte än.)

1. **Kanten:** i varje vy utom öppningen och stängningen ligger bildens fyra hörn på sidan eller pärmens insida. Inget bord, ingen vägg, ingen pärmkant.
2. **Skuggor:** varje urklipp som kastar skugga har sitt eget djupmaterial (`customDepthMaterial: djup(map)` eller `alphaTest`), annars blir skuggan en fyrkant. I 064:s förhandsvisning (21:23 den 27/11) låg en fyrkantig skugga under snöbollarna vid ca 2:03. Orsaken är inte undersökt.
3. **Kortens rutor syns inte:** ett kort som tonas eller maskas i kod (snö, frost, höstton) ska hålla sig inom urklippets alfa. I samma förhandsvisning syntes kullkorten som grå rektanglar med raka kanter bakom trädet vid ca 2:25. Orsaken är inte undersökt.
4. **Den vita kanten syns** mot det som ligger bakom, också på ljus mark (se *Puts att pröva*).
5. **Längden** stämmer med det som räknats ur raderna.
6. **Årstiden:** inget lånat kort säger emot temat.

### Kameran

- Vyer med `verktyg/kamera3d.mjs`: en vy per utsnitt, en svag push in i varje (`skjut`). Halvbild, närbild och halvbild mot huvudsaken har samma fov, så att kameran kan glida mellan dem utan hopp.
- **Glid mellan närliggande vyer** i stället för att klippa (runda 3: *"more smooth camera shots"*). Klipp när platsen i boken byts.
- **Introt är kort med lite rörelse:** kameran driver lugnt mot den stängda boken redan innan den öppnas (runda 4: *"we need a faster intro"*).
- **Kameran lite högre och lite längre bort** än man tror (runda 3).
- **Hela uppslaget i bild** när barnet ska titta efter sakerna (runda 3: *"show full scene"*).
- **Stängningen** närmare och snabbare: korten ner på 0,5 s, pärmen 0,7 s (runda 3).
- Fokus på vyns mål, mer oskärpa i närbilder (0,008) än i halvbilder (0,006) och helbilder (0,003).

### Kritan ritar i boken

Allt via `verktyg/kritan-ritar.js` (skillen `kritan-ritar`). Konturen (bildens egna px ur `kontur.json`) läggs på 3D-ytan med en affin avbildning ur kamerans projektion varje bildruta, fylls i inifrån och tonas över till 3D-urklippet. Kritan är × 1,25 i närbild (runda 4: *"bigger crayon"*) och följer linjen den ritar. Den första teckningen ritas på pärmens insida (himlen), den andra på sidan, där kortet sedan fälls upp med ett `pop`.

### Puts att pröva (genomgången 2026-11-27, inte beslutat av Sanna)

Det här syntes när de fyra förhandsvisningarna lades bredvid varandra. Pröva var och en som ett stillbildsprov (med och utan, sida vid sida) och låt Sanna välja, innan det blir en regel ovan.

- **Tom mark.** I halvbilderna är marken ofta nästan halva bilden i en enda ton (063:s senapsgula, 064:s vita). 065:s små vita blommor i gräset visar lösningen: strö temats småsaker över marken (tuvor, små löv, stenar, snödrivor), ge marken en svag variation i tonen, och ställ två–tre kort i förgrunden vid bildens kanter så att bilden får djup och oskärpa fram.
- **Ljus mark (snö, sand, en ljus färg).** 064:s snö blir helt vit, utan kritstreck, och den vita kanten runt kaninen och snöbollarna försvinner. Förslag: blåaktigt benvit mark med synliga kritstreck, mjuka blå kontaktskuggor, och en svag blågrå skugga utanför den vita kanten.
- **Skuggor på korten längst bak.** 063:s ek och 064:s granar kastar stora skuggor över kullarna. Förslag: himlen och kullarna tar inte emot skuggor (`receiveShadow = false`), marken och korten fram gör det.
- **Läget före förändringen.** 064 före snön är avmättat i kod och blir grågrönt och ser ofärdigt ut. Förslag: flytta färgtonen mot kallt blågrönt i stället för att ta bort färgen, eller gör en Flow-edit med samma form som 063:s höstkullar.
- **Armarna i vila.** Räven och kaninen står med armarna rakt ut i de flesta bilder. Förslag: en vilopose med armarna snett nedåt, och lyft dem bara för en gest. Samma målade armar i en bit, inga böjda.
- **Stam utan krona.** I närbilder på saker på marken bredvid ett högt kort (063:s ekollon och svamp) fyller en avklippt stam övre delen av bilden. Förslag: flytta kameran i sidled eller ge kortet mer oskärpa.
- **Papperskorn över bilden.** Bokfilmerna har inget papperskorn över hela bilden, som julkalendern får i masteringen (0,45). Pröva det i `film/satt-ihop.sh`, inte i scenen.

## 4. Ljudet

Som bilderboken: figurens ljudfamilj (8 känslor), `pop` när kort fälls upp, `prassel-tyg` när pärmen slås upp och igen, `landa-mjuk` när den stängs, `krita-ritar` som slinga medan kritan ritar, `glitter` och `tindra` när teckningen fylls i, `glimt` per sak som barnet hittar. **En matta under hela scenen** som hör till temat (062: `skogsljud` 0,3), Openverse först. Ingen ny musik.

## 5. Den delade modulen

Det som är gemensamt för bokavsnitten ligger i **`produktion/three-rum/popupbok/uppslag.js`**, bredvid `bok-parm.js`, och alla fyra avsnitten (062–065) importerar den (2026-11-28). Där ligger bara det som minst två avsnitt gör likadant. Flytten ändrade ingenting i bild: stillbilder före och efter på 20–40 valda tider och var 2,5:e sekund i varje avsnitt skiljer 0, och ljudlistorna är identiska.

| Export | Vad den gör |
|---|---|
| `rader(await import('…/rader.mjs'))` | radernas tider: `RAD`, `S(id)`, `LN(n)`, `MAL(id, n)` (när repliken börjar), `SVAR(id, n)` (figurens svar 0,2 s efter repliken), `rad(t)`, `DURATION` |
| `scenen()` | renderaren, scenen och kameran (`?snabb` ger 960 × 540) |
| `bild`, `lad`, `ruta`, `dataUrl`, `kontur`, `bredare`, `mark(färg, ljus, mörk)` | bilderna: urklipp som textur, bildens synliga ruta (till kritans kontur), `kontur.json`, kullar och himmel utdragna på bredden, markarket |
| `kortmotor(scen, insida, { kskugga, paSkuggsida })` | `kort()` (står, med vit baksida och kontaktskugga), `platt()` (ligger på sidan), `pa()` (på pärmens insida). `vik(k, e)` och `stall(k, e)` fäller kortet |
| `fallning(satt, OPPNA, STANG)` | `upp(korten)` (bakifrån och fram när pärmen slås upp), `ner(korten)` (framifrån när boken stängs), `e(k, t)` (hur uppfällt kortet är), `parm(t)` |
| `figurKort(scen, cam, L, G, { fot, topp, hojd })` | v2-riggen på ett kort: `#kort` → textur varje bildruta (`textur(t)`), boil 2,5 px och vit kant 3 px i bild räknat mot kamerans avstånd, `fig2varld`, `nick`. `vink()` och `gaRikt()` för figurer som 063 och 064 |
| `kritan(cam)` | `teckning(namn, bild, drag, ruta, yta, tider, fyllning, väntplats)`, `rita(t)` för `#ov`, `glimt(t, t0, punkt)` (gnistor på en sak), `skarm`, `affin` |
| `ljuset(scen, { himmel, sol })`, `djupskarpa(SC)` | ljuset med skuggorna; kompositören med `BokehPass` och kortens djupmaterial, `fokus(vy)` |
| `kamera(cam, VY, { blur, lyft })` | `vy()` (klipp), `glid()`, `oppning()` (driver mot den stängda boken och glider in), `stangning()`, `aktiv(t)`, `plan(längd)` (till `verktyg/kamera3d.mjs`). Vyerna `bord` och `slut` finns i modulen |
| `starta(RD, plan, bildruta, { rost, vol, matta, RIT })` | ljudet ur raderna (Malin, effekterna, kritans ritslinga, mattan) och `window.seek`, `LJUD`, `DURATION`, `TIDER`, `ready` |

Kvar i avsnittets `boken.js` är det som är temat: bilderna, uppslagets kort och koordinater, figurens platser och rörelser per rad, vyerna, det som händer i bildrutan och temats effekter (062: 570 rader av 747, 063: 361 av 548, 064: 387 av 570, 065: 400 av 655). Effekter (ringar, stänk, snöfall, löv, insekter i kod) flyttas hit först när ett andra avsnitt använder dem likadant.

**Uppslaget byggs en gång** (065 och mallen): `storyboard/uppslaget.js` har boken, korten, koordinaterna och vyerna i `byggUppslaget(scen)`, och både `storyboard/scen.js` (grind 5) och `scener/boken/boken.js` (grind 6) anropar den. Storyboarden lägger bara till sitt eget (figuren som platt kort, kritans konturer som platta ark, lägena per rad i `window.rad(s)`), scenen sitt (riggen, kritan, rörelserna). Flyttar man ett kort eller en vy efter Sannas kommentarer ändras båda. 062–064 har uppslaget kvar i båda filerna; flytta ut det på samma sätt om storyboarden ska byggas om.

**Nytt avsnitt:** kopiera `avsnitt/_mall-kritans-bok/` (se dess `README.md`). **Ändra modulen** bara med stillbilder före och efter i alla avsnitt som importerar den: `node avsnitt/NNN/scener/render.mjs avsnitt/NNN/scener/boken <tider>` till en egen mapp före och efter, jämförda bild för bild. Renderingen är deterministisk, så skillnaden ska vara 0.

## 6. Steg för steg

1. Välj tema, figur (med v2-rigg) och huvudsak ur temabladet. Kolla vad som redan finns i `popupbok/bilder/`, `assets/bakgrunder/` och `assets/rekvisita/`.
2. Grind 1: `manus.md` som 064 (statustabellen, kärnan, *Uppslaget – korten*, *Så rör det sig*, *Gissa, lära, lugnt*, replikblocket, regelkollen, öppet). Bokens färg och siluetten står i manuset. Räkna längden ur raderna.
3. Grind 2: `bildlista.md`. Kritans två teckningar (urklipp, tunn kant, kontur), de nya landskapskorten i Flow, det som ritas i kod, och kontrollbilderna i `grind2/`.
4. Grind 3–4: rösten och ljuden som bilderboken.
5. Grind 5: `storyboard/` som 065, stillbilderna i three.js-boken, animatiken.
6. Grind 6a: `scener/boken/` med layouten och vyerna ur storyboarden, en stillbild per rad ur den riktiga scenen, *Bokkollen*, och Sannas ja på stillbilderna.
7. Grind 6b: rörelsen, stillbildsprov för det som är osäkert, förhandsvisningen med `render-delat.mjs --snabb`. I varje feedbackrunda renderas bara de ändrade raderna, och hela filmen en gång när rundan är klar.
8. QA som bilderboken (`bash verktyg/qa-film.sh`, täta bilder runt varje rörelse) och *Bokkollen* en gång till på filmen, sedan feedbacksidan och `harriets-favoriter.md`.

## 7. Temablad

De fyra årstiderna är gjorda (raderna visar hur avsnitten blev, inte de första förslagen). Resten är förslag att utgå från. Figuren ska ha v2-rigg. Varje rad är en kärna, inte ett färdigt manus.

| Tema | Pärm och siluett | Figur | Det som saknas (teckning 1) | Problemet → hjälpsaken (teckning 2) | Temats lek | Barnet säger | Sista saken |
|---|---|---|---|---|---|---|---|
| **Sommar** (062) | orange, solen | grodan | solen på himlen | för varmt → en glass | *"Hopp … plask!"* mellan bladen, och grodan badar | blommorna: röd, gul, lila, rosa | sandslottet, som grodan bygger |
| **Höst** (063) | brun, det orange lövet | räven (först igelkotten), ekorren som statist | löven på eken: kritan ritar ett stort orange löv, och den kala eken fylls av löv som faller långsamt | det blåser och räven fryser → en halsduk, ritad i kod i mossgrönt och senapsgult | *"Hopp!"* i lövhögen, två gånger, och löv på huvudet | löven på marken: rött, gult, brunt, och ekollonen, som ekorren kommer fram till | en svamp, giftig, som man bara tittar på |
| **Vinter** (064) | blå, snöflingan | kaninen, tre småfåglar som statister | snön: kritan ritar en snöflinga, snön faller och marken blir vit | kalla öron → pannbandet från 039 (först en mössa) | *"Rulla, rulla … snöboll!"* tre bollar: stor, mellan, liten | fåglarna i trädet: en röd, en blå, en gul | snögubben av de tre bollarna |
| **Vår** (065) | grön, en tulpan i knopp | musen (först kycklingen), fjärilen och nyckelpigan i kod | blommorna: kritan ritar en gul tulpan, och knopparna slår ut | blommorna hänger, de är törstiga → en vattenkanna | *"Vattna, vattna … upp!"* och en blomma reser sig varje gång, räknade till tre | fjärilen och nyckelpigan på blommorna, och fjärilen landar på huvudet | fågelboet med tre ägg uppe i trädet |
| **Regn** | grå, ett moln | ankan | regnet: kritan ritar ett moln, det börjar regna lugnt | ankan blir blöt → ett paraply | *"Hopp … plask!"* i vattenpölarna (062:s ringar och stänk) | regnbågens färger, en i taget | regnbågen efter regnet, ritad av kritan |
| **En färg** (t.ex. röd) | röd, en färgklick | nyckelpigan | färgen: korten reser sig vita, och kritan fyller i det första röda | nyckelpigan har tappat sina prickar → kritan ritar prickarna | *"Pang … rött!"*: kritan färglägger en sak i taget | de röda sakerna: äpplet, bilen, bollen, jordgubben | en röd ballong (`rekvisita/ballong-rod`) |
| **Djur på en plats** (t.ex. bondgården) | grön, ladugården | kon | gräset på ängen: kritan ritar gräset, och det växer upp | kon är hungrig → en höstack | *"Mumsa, mumsa … mu!"* | djuren som står i uppslaget (platta statister med sina ljud): grisen, lammet, hönan | ladugårdsdörren som öppnas |

- **Färgavsnittet** ligger nära färgsångerna (`format/fargsang-v2.md`), men pratas i stället för sjungs. Ordet och färgen kommer samtidigt.
- **Djuravsnittet:** bara den riggade figuren pratar med Malin. De andra djuren är statister (högst 2 nya, `format/regler.md`), platta kort med ett ljud och en rörelse var. Kalla dem alltid vad de är.
- **En ny figur per årstid** blev det: grodan, räven, kaninen och musen. Pärmen byter färg och siluett per tema, så böckerna kan stå i en rad senare.

## Öppet (2026-11-27, efter genomgången av 062–065)

- Inget av de fyra avsnitten är slutgodkänt än. 062 är i runda 7, 063 och 065 i förhandsvisning, och 064 slutrenderas i molnet. Reglerna ovan bygger på Sannas kommentarer rundorna igenom. Läs avsnittets senaste `boken.js` och `manus.md` innan du kopierar.
- `uppslag.js` och `avsnitt/_mall-kritans-bok/` finns inte än (avsnitt 5). Arbetet är startat i en egen session 2026-11-27.
- Bokkollen i `verktyg/qa-scen.py` (`--bok`: kanten, skuggorna, längden) finns inte än, listan under *Bokkollen* görs för hand.
- Punkterna under *Puts att pröva* är förslag och väntar på Sannas val.
- Namnet på serien i bild och på YouTube (*Kritans bok*) är inte bestämt.
