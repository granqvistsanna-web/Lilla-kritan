# Kritans bok – receptet från 062 Sommaren i boken

**Kritans bok** är bilderboken ([bilderbok.md](bilderbok.md)) berättad i en uppfällbar bok i three.js. Boken ligger på ett skrivbord, pärmen slås upp, landskapet reser sig i papperskort, och berättelsen händer inne i uppslaget. Ingen sång: Malin (BERÄTTAREN) pratar med **en** djurfigur, som svarar med ljud, ögon och små hopp. Varje avsnitt har **ett tema** (en årstid, ett väder, en färg, djur på en plats) i stället för en vardagshändelse.

Förlagan är `avsnitt/062-sommaren-i-boken/` (grind 6, runda 4, 2026-11-27). Allt som inte står här gör man som i bilderboken: rösten, ljuden, grindarna, QA och YouTube. Det här receptet beskriver bara det som skiljer sig. **Skillen `bilderbok`** pekar hit för bokavsnitt.

## Formen

| Del | 062 | Scentid (s) |
|---|---|---|
| Intro | Lilla Kritans logotyp 1 s. Inget *"Djuren hittar på!"*-kort och inget ritintro på papper: boken är introt | före scenen |
| Boken öppnas | skrivbordet med den stängda boken (temats huvudsak i siluett på pärmen). Kameran driver lugnt mot boken, pärmen slås upp (0,9 s), korten fälls upp bakifrån och fram (ca 0,8 s), kameran glider in i boken (ca 4 s). *"Titta! En bok."* – *"Oj! Det är sommar i boken!"* | 0–9 |
| Något saknas | *"Himlen är blå. Men var är solen?"* Kritan ritar temats huvudsak inne i boken (solen på himlen), gisspaus 3 s, den fylls i | 9–21 |
| Hej, figuren | figurens kort fälls upp sist med ett `pop`. Hej, samtal (Malin frågar, figuren svarar i pausen) | 21–32 |
| Problemet | temat ger problemet (för varmt). Inget trots: figuren vill, men något i temat är svårt | 32–45 |
| Hjälpen | kritan ritar en hjälpsak på sidan (glassen), *"Varsågod"* – *"Tack, kritan!"*, leken med saken och en liten överraskning (glass på näsan) | 45–89 |
| Temats lek | en lek som hör till temat (svalka sig i dammen, *"Hopp … plask!"*) | 89–107 |
| Barnet hittar och säger | saker som syns i uppslaget hela tiden, barnet tittar och Malin säger dem med färgorden (*"Ser du några blommor?"* … *"En röd blomma! En gul blomma!"*), och figuren går dit och luktar | 107–136 |
| En sista sak poppar upp | på ordet (sandslottet på *"sandslott"*) | 136–141 |
| Hej då | hej då till figuren och till varje sak i boken, sedan *"Hej då! Vi ses snart!"* | 141–165 |
| Boken stängs | kameran glider ut, korten fälls ner i omvänd ordning (figuren först), pärmen slås igen. Ersätter kritirisen | 165–168 |

062 är ca 2:48 i runda 5 (2:15,5 i runda 1, hej då-delen har vuxit). Sikta på 2:30–3:15. Prenumerera-kortet och outrot läggs på efter stängningen som i alla avsnitt (`format/intro-outro.md`).

## Filerna

Samma som bilderboken (`manus.md`, `rost*.txt`, `ljud-effekter.md`, `storyboard/`), men scenen är en three.js-sida:

| Fil | Vad |
|---|---|
| `storyboard/rader.mjs` | raderna som i bilderboken, plus `s` per rad: bokens läge (vy, pärm, kort, saker, figurens plats). Varje rad ärver läget från raden före |
| `storyboard/scen.js`, `scen.html`, `bygg.mjs` | stillbilderna i three.js-boken till animatiken (grind 5). Figuren är ett platt kort här, riggen kommer i grind 6 |
| `scener/boken/index.html` | sidan: canvasen, den dolda SVG:n `#kort` där riggen ritas, `#ov` där kritan ritar, vinjetten |
| `scener/boken/boken.js` | scenen. Läser `rader.mjs` direkt och sätter `window.seek`, `window.LJUD`, `window.DURATION` |
| `scener/render.mjs` | kopia av `produktion/three-rum/render.mjs`. `--snabb` för förhandsvisning, tider för stillbilder |
| `produktion/three-rum/popupbok/bok-parm.js` | **delad:** skrivbordet, boken (`skapaBok`), krit-ytor, `trim`, `tex`, `SIDA` |
| `produktion/three-rum/popupbok/bilder/` | Sannas Flow-bilder för boken (himmel, moln, kullar, sol, glass, sand …) |

Rendera: `node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken --snabb`, och slutrenderingen med `verktyg/render-delat.mjs` eller i molnet (`verktyg/molnrender.sh`).

## 1. Berättelsen

### Kärnan

Samma kärna som bilderboken, men problemet kommer ur temat:

1. **Boken öppnas och temat syns.** Malin säger temat i första repliken (*"Det är sommar i boken!"*).
2. **Något saknas.** Temats huvudsak fattas (solen). Kritan ritar den inne i boken, och den är också siluetten på pärmen. Kritans första teckning är alltid en sak, aldrig figuren.
3. **Hej, figuren.** Figuren kommer upp sist, på sitt kort. Hej och ett första samtal.
4. **Problemet** är temats: för varmt, för kallt, blött, blåsigt, något har tappat sin färg. Ett vardagsproblem utan trots.
5. **Kritan ritar en hjälpsak** på sidan. *"Varsågod, …"* – *"Tack, kritan!"* direkt. Leken med saken och en liten överraskning.
6. **Temats lek** med en fras som upprepas (*"Hopp … plask!"*).
7. **Barnet hittar och säger** saker i uppslaget: de syns hela tiden, barnet tittar, Malin säger namnet och färgen på varje.
8. **En sista sak** poppar upp på sitt ord.
9. **Hej då** till figuren och sakerna, och boken stängs.

### Fem saker byts per avsnitt

**Temat, figuren, huvudsaken (det som saknas), hjälpsaken och sakerna barnet hittar.** Allt annat (boken, skrivbordet, öppningen, stängningen, kameran, kritan) är samma. Se temabladet längst ner.

### Regler för manuset

Alla bilderbokens regler (inga djurnamn, v3-taggar utan `[excited]`, aldrig *"Vad kan det vara?"*, *"Vad säger man?"* eller *"Ska vi säga tack?"*, inga tomma medhåll, Malin efter handlingen, frågor före, inga utdragna ord). Dessutom, från 062:

- **Barnet letar inte efter något gömt.** Sakerna barnet ska hitta står synliga och utspridda i uppslaget hela tiden. Malin frågar *"Ser du några …?"*, barnet tittar 3 s, sedan säger Malin dem en i taget med färgen, och varje sak studsar och glimtar på sitt ord (runda 4).
- **Inte samma sak tre gånger med olika ord.** *"Solen skiner. Det blir varmt!"* – *"Puh! Grodan är så varm."* – *"Är du varm, grodan?"* blev för upprepande (runda 5). Säg det en gång och visa det i bilden.
- **Hej då till varje sak:** figuren, huvudsaken, sakerna och platsen, en kort bild per sak (*"Hej då, solen!"*, *"Hej då, blommorna!"*, *"Hej då, dammen!"*). Kameran visar saken när den nämns, och saken studsar och glimtar på sitt ord (runda 5, 062 rad 24–24d).
- **Varje sak som poppar upp gör det på sitt ord** (korten fälls upp på *"Ja, där är blommorna!"* och *"sandslott"*).

### Avstegen som receptet redan har

Ingen sång. Inget *"Djuren hittar på!"* och inget ritintro på papper. Kameran glider in i boken i början och ut i slutet i stället för zoom in och kritiris. Fler än 6 utsnitt. En plats (uppslaget) och inget platsbyte. Säg till Sanna om manuset bryter `format/regler.md` på något annat sätt.

## 2. Grindarna

Bilderbokens sex grindar i samma ordning, med Sannas ja vid varje. Det som är annorlunda:

| # | Grind | Extra i Kritans bok |
|---|---|---|
| 1 | Manus | temat, huvudsaken, bokens färg och siluetten på pärmen bestäms här. Listan över kort i uppslaget (vad som finns, vad som är nytt) |
| 2 | Rekvisita | kritans två teckningar behöver urklipp med tunn kant och kontur: `verktyg/kontur.py` ger `<sak>-kontur.json` (kontur + 2–6 detaljstreck) bredvid `cut/<sak>.png`. Landskapskorten (himmel, kullar, moln) gör Sanna i Flow, de hamnar i `popupbok/bilder/` |
| 3 | Rösten | som bilderboken |
| 4 | Ljuden | som bilderboken. Befintliga ljud först (062 använde bara befintliga). En matta under hela scenen som passar temat |
| 5 | Animatik | stillbilderna ritas i three.js-boken (`storyboard/scen.js`), inte i 2D. Figuren är ett platt kort |
| 6 | Förhandsvisning | `boken.js` med `--snabb`. **Är en del osäker** (062:s bad), gör ett **stillbildsprov** först: varianter bakom en URL-parameter (`?bad=2`, `?prov=s`), stillbilder sida vid sida, och Sanna väljer innan rörelsen putsas |

## 3. Scenen

Börja från en kopia av 062:s `scener/` och `storyboard/` (eller från `uppslag.js` när den finns, se avsnitt 5). Byt bilderna, uppslagets layout, vyerna och figurens rörelser per rad.

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

- **Boken fyller bilden.** Inne i boken ska kanterna och bordet inte synas, utom i öppningen och stängningen (runda 5: *"can book be bigger so I don't see the edges outside book?"*). Gör boken större eller vyerna snävare hellre än att visa skrivbordet bakom.
- **Bredare bild, sakerna i skala.** Uppslaget ska kännas som ett landskap, inte några stora saker på ett bord (runda 4). Prova med `?prov=s` (sakerna × 0,72) om bilden känns trång.
- **Temats huvudsak är stor** och syns tydligt (runda 5: solen större, gärna med ett enkelt ansikte).
- **Sakerna barnet ska hitta står utspridda,** inte i en rad där de skymmer varandra (runda 5), och syns hela tiden.
- **En sak står på något:** sandslottet får en sandfläck under sig, en sak på gräset står på marken med sin kontaktskugga (runda 5).
- **Kontaktskugga, inte vikflik:** en mjuk rund skugga vid kortets fot. Den gröna vikfliken såg ut som en fyrkantig skugga (Sanna 27/11).
- **Lövträd bland granarna** och enskilda blomurklipp i stället för en blomgrupp (runda 4): ett uppslag blir levande av några olika sorter.
- Siluetten på pärmen är **temats huvudsak**, inte figuren (runda 5: *"book cover silhouette should be sun"*). `skapaBok(scen, { farg, figur: <huvudsakens urklipp> })`.

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
- **Figuren sjunker inte** genom sidan. I 062 valdes bad 3: figuren landar på ett tredje blad mitt i dammen och vattnet ringar sig runt bladet (stillbildsprovet, runda 4). Ett vågkort framför figuren (bad 1–2) fungerade sämre.
- **Droppar** har en tydlig väg: faller på huvudet, delar sig, rinner ner. Slumpade droppar *"make little sense"* (runda 3).
- Ett nytt väder (snö, regn, löv) är ett lager av små platta kort eller sfärer i kod som faller långsamt och lägger sig **på** sidan, aldrig genom den.

### Inget går genom något

- Korten fälls ner åt samma håll, och det som reser sig först ligger överst. Pärmen slås igen först när alla kort ligger platt.
- Figuren landar **på** ett blad, en sten eller marken. Saker i handen ligger i handens spets, framför tassen.
- Kameran stannar inne i boken och går aldrig under sidan eller bakom pärmen.
- Täta bilder (6 per sekund) i QA runt öppningen, varje hopp, varje kort som fälls upp, saken i handen och stängningen.

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

## 4. Ljudet

Som bilderboken: figurens ljudfamilj (8 känslor), `pop` när kort fälls upp, `prassel-tyg` när pärmen slås upp och igen, `landa-mjuk` när den stängs, `krita-ritar` som slinga medan kritan ritar, `glitter` och `tindra` när teckningen fylls i, `glimt` per sak som barnet hittar. **En matta under hela scenen** som hör till temat (062: `skogsljud` 0,3), Openverse först. Ingen ny musik.

## 5. Förslag: en delad modul

Nästa avsnitt blir mycket lättare om det som är gemensamt i 062:s `boken.js` (ca två tredjedelar av filen) flyttas till **`produktion/three-rum/popupbok/uppslag.js`**, bredvid `bok-parm.js`. Gör det **när 062 är godkänt**, ur den sista versionen, och låt 062 importera modulen: samma stillbilder före och efter visar att inget ändrats.

| Export | Vad den gör (ur 062) |
|---|---|
| `skapaUppslag(scen, { stor })` | `kort`, `platt`, `pa`, `bredare`, `vik`, `reser`, markarket (`mark(farg)`), kontaktskuggan, listan `KORT` |
| `kortOrdning(korten, oppna, stang)` och `fallKort(t, korten)` | upp bakifrån och fram, ner framifrån, vajande kort, kontaktskuggan bara när kortet står |
| `figurKort(scen, { rigg, fot, topp, hojd, hand })` | v2-riggen på ett kort: SVG → canvas → textur varje bildruta, boil och vit kant räknade mot kamerans avstånd, `fig2varld`, hoppen (`HOPP`, `SKUTT`) |
| `kritanPaYta(cam)` | `affin`, `teckning(namn, …)`, `rita(t)` för `#ov` |
| `djupskarpa(R, scen, cam, W, H, PR)` | kompositören med `BokehPass` och kortens djupmaterial, `fokus(vy)` |
| `kameraVyer(VY, RAD, { alias, glid, oppning, stangning })` | `vy`, `glid`, `lage`, `fran3`, `skjut`, öppningens och stängningens glidning, ger `platser` och `vyer` till `kameraplan` |
| `ljudUrRader(RAD, ROST, rostmapp, vol)` | Malin, effekterna, kritans ritslinga, mattan |

Kvar i avsnittets `boken.js` blir det som är temat: bildlistan, uppslagets koordinater, figurens platser, vyernas koordinater, rörelserna per rad och temats effekter. Effekterna (ringar, stänk, droppar) flyttas till modulen först när ett andra avsnitt använder dem. Gör sedan `avsnitt/_mall-kritans-bok/` med `storyboard/` och `scener/` som pekar på modulen.

## 6. Steg för steg

1. Välj tema, figur (med v2-rigg) och huvudsak ur temabladet. Kolla vad som redan finns i `popupbok/bilder/`, `assets/bakgrunder/` och `assets/rekvisita/`.
2. Grind 1: `manus.md` som 062 (kärnan, uppslagen, *Så rör det sig*, replikblocket, regelkollen, öppet). Bokens färg och siluetten står i manuset.
3. Grind 2: kritans två teckningar (urklipp, tunn kant, kontur) och de nya landskapskorten (Sanna i Flow).
4. Grind 3–4: rösten och ljuden som bilderboken.
5. Grind 5: `storyboard/` som 062, stillbilderna i three.js-boken, animatiken.
6. Grind 6: `scener/boken/`, `--snabb`, stillbildsprov för det som är osäkert.
7. QA som bilderboken (`bash verktyg/qa-film.sh`, täta bilder runt varje rörelse), feedbacksidan, `harriets-favoriter.md`.

## 7. Temablad

Förslag att utgå från. Figuren ska ha v2-rigg. Varje rad är en kärna, inte ett färdigt manus.

| Tema | Pärm och siluett | Figur | Det som saknas (teckning 1) | Problemet → hjälpsaken (teckning 2) | Temats lek | Barnet säger | Sista saken |
|---|---|---|---|---|---|---|---|
| **Sommar** (062) | orange, solen | grodan | solen på himlen | för varmt → en glass | *"Hopp … plask!"* i dammen | blommorna: röd, gul, lila, rosa | sandslottet |
| **Höst** | brun, ett löv | igelkotten | löven på trädet: kritan ritar ett stort orange löv, och trädet fylls av löv som faller långsamt | det blåser och är kallt → en halsduk (`rekvisita/halsduk`) | *"Hopp … prassel!"* i lövhögen | löven: rött, gult, brunt, och ekollonen | en svamp |
| **Vinter** | blå, en snöflinga | kaninen | snön: kritan ritar en snöflinga, snön faller och marken blir vit | kalla öron → en mössa (`rekvisita/mossa-oronhal`) | *"Rulla, rulla … snöboll!"* tre bollar | fåglarna i trädet: en röd, en blå, en gul | snögubben (`rekvisita/snogubbe`) poppar upp på *"snögubbe"* |
| **Vår** | grön, en knopp | kycklingen | blommorna: kritan ritar en tulpan, knopparna slår ut | blommorna hänger, de är törstiga → en vattenkanna | *"Vattna, vattna … upp!"* och en blomma reser sig varje gång | fjärilen och nyckelpigan på blommorna | ett fågelbo med ägg |
| **Regn** | grå, ett moln | ankan | regnet: kritan ritar ett moln, det börjar regna lugnt | ankan blir blöt → ett paraply | *"Hopp … plask!"* i vattenpölarna (062:s ringar och stänk) | regnbågens färger, en i taget | regnbågen efter regnet, ritad av kritan |
| **En färg** (t.ex. röd) | röd, en färgklick | nyckelpigan | färgen: korten reser sig vita, och kritan fyller i det första röda | nyckelpigan har tappat sina prickar → kritan ritar prickarna | *"Pang … rött!"*: kritan färglägger en sak i taget | de röda sakerna: äpplet, bilen, bollen, jordgubben | en röd ballong (`rekvisita/ballong-rod`) |
| **Djur på en plats** (t.ex. bondgården) | grön, ladugården | kon | gräset på ängen: kritan ritar gräset, och det växer upp | kon är hungrig → en höstack | *"Mumsa, mumsa … mu!"* | djuren som står i uppslaget (platta statister med sina ljud): grisen, lammet, hönan | ladugårdsdörren som öppnas |

- **Färgavsnittet** ligger nära färgsångerna (`format/fargsang-v2.md`), men pratas i stället för sjungs. Ordet och färgen kommer samtidigt.
- **Djuravsnittet:** bara den riggade figuren pratar med Malin. De andra djuren är statister (högst 2 nya, `format/regler.md`), platta kort med ett ljud och en rörelse var. Kalla dem alltid vad de är.
- **Samma figur i flera teman** (grodan på hösten, på vintern) går också. Sanna har inte bestämt det än (062 Öppet 7).

## Öppet när receptet skrevs (2026-11-27)

- Runda 5 av 062 rättades medan receptet skrevs: pärmens siluett som solen, större sol med ansikte, ringarna lugnare och under bladen, glassen äts upp i stället för att hoppa ur handen, större bok, blommorna mer utspridda, sandfläck under sandslottet, hej då till varje sak. Reglerna ovan bygger på Sannas kommentarer, inte på en godkänd lösning. Läs 062:s senaste `boken.js` och `manus.md` innan du kopierar.
- `uppslag.js` och `avsnitt/_mall-kritans-bok/` finns inte än (avsnitt 5).
- Namnet på serien i bild och på YouTube (*Kritans bok*) är inte bestämt.
