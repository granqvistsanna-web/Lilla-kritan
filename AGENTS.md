# Lilla Kritan – instruktioner för AI-agenter

Den här filen är till för agenter som inte är Claude (Kimi, Qwen, Codex …). Den samlar på ett ställe:

1. projektreglerna ur `CLAUDE.md`,
2. kärnan ur skills `lk-figur`, `bilderbok` och `vita-kanter` (de fullständiga filerna ligger i `.claude/skills/<namn>/SKILL.md` – läs dem innan du gör sådant arbete),
3. Sannas feedback som Claude har sparat utanför repot (regler som annars bara finns i Claudes minne).

**Om något krockar:** Sannas egna ord i chatten vinner, sedan den här filen, sedan `format/regler.md`, `format/bilderbok.md` och `stil/art-direction-v2.md`. Ändras en regel här ska `CLAUDE.md` eller skillen ändras på samma sätt, och tvärtom.

---

## 1. Projektet

Repot innehåller allt material för YouTube-kanalen *Lilla Kritan*: tecknade cut out-filmer med sånger och berättelser för små barn (ca 1–4 år).

**Lilla Kritan är världen, inte en figur.** Det finns ingen programledare. I ramen ritar en krita utan ansikte och en berättarröst (BERÄTTAREN i manus, rösten heter Malin) pratar till tittaren. Lilla Kvack (den gula ankungen från piloten) är en figur i Lilla Kritan-världen, inte ett eget varumärke: Kvack-videor läggs på Lilla Kritan-kanalen och nämner båda.

## 2. Hårda regler

- **Inga djurnamn i det som sägs eller sjungs.** Djur kallas alltid vad de är, i bestämd form: kaninen, lammet, kon, leoparden, lejonet, musen, kycklingen (på engelska "the bunny", "the lamb"). Gäller repliker, berättarröst, röstbanken (*"Hej kaninen!"*, *"Var är lammet?"*), röstfilernas namn (`kanin-hej`, `lamm-var`), sångtexter, Suno-prompter, shorts och YouTube-texter. Namnen i `karaktarer/` (Kanel, Ludde …) är bara interna filnamn. Kontrollera varje rad, även rader som kopieras från äldre filer.
- **Format först:** varje avsnitt följer `format/` – fast intro (logotyp, avsnittsnummer, titel) och outro, max 3 figurer och 2 platser, övergångarna zoom in, kritsvep och zoom ut (plus molnövergången och kritirisen, se `format/regler.md`). Föreslå aldrig manus som bryter mot `format/regler.md` utan att säga det.
- **Stil:** nya och omgjorda figurer, platser och saker följer art direction v2 (`stil/art-direction-v2.md`). `stil/stilguide.md` är v1 och gäller det som inte gjorts om än.
- **Figurer är låsta:** ändra inte utseende eller prompt för en figur med status `✅ Referensark klart`, om inte Sanna uttryckligen ber om det.
- **Rekvisita** skapas tillsammans med Sanna. Lägg inte till saker i `rekvisita/` på eget initiativ.
- **Bilder och ljud:** skapa inga bilder utan att bli ombedd. Fråga innan något kostar krediter.
- **Upphovsrätt:** nämn aldrig befintliga serier, figurer eller varumärken i prompter, manus eller sånger. Beskriv stilens egenskaper i stället. Sångerna ska vara egna, inte nya texter till kända melodier.
- **Språk:** allt innehåll (manus, sånger, dokumentation) på svenska. Bildprompter (```` ```prompt ````- och ```` ```delar ````-block) på engelska.
- **Innehåll för små barn:** korta meningar, upprepning, pauser för interaktion, inget läskigt. Problem löses med hjälp av kompisar.
- **Filnamn:** små bokstäver, bindestreck, inga å/ä/ö.
- **Oklar begäran:** nämner Sanna en sak som inte finns i filmen du arbetar med, fråga kort vad och var hon menar innan du gör något. Gissningar har kostat hela omrenderingar.

## 3. Struktur och arbetsflöde

- **Nya figurer, platser och saker** följer formatet i `karaktarer/_mall.md`, `bakgrunder/*.md` och `rekvisita/*.md` så att `verktyg/prompt.py` kan läsa dem. Lägg också till dem i respektive README.
- **Nya avsnitt** skapas som `avsnitt/NNN-kort-namn/` utifrån `avsnitt/_mall/`. Uppdatera `harriets-favoriter.md` med avsnittsnumret.
- **Produktion:** `produktion/` är arbetsflödet från piloten Lilla Kvack. Skripten använder relativa sökvägar, så flytta inte mapparna inuti. Skills finns i `.claude/skills/` (`ai-video`, `crayon-cutout`, `lk-figur`, `bilderbok`, `vita-kanter`, `gissa-teckningen`, `miniatyrer`). Det är vanliga markdownfiler – läs den som passar uppgiften.
- **Färgsånger** byggs som 013 Röda sången enligt `format/fargsang-v2.md` (storyboardtabellen styr tiderna, gemensam `scen-kit.js`, en scen per plats, `satt-ihop.sh`). Kopiera 013:s filer, börja inte från noll.
- **Delad rendering:** `node verktyg/render-delat.mjs <scenmapp> [--bitar 4] [--samtidigt 2] [--snabb …]` renderar en scen i bitar med avsnittets egen `render.mjs`, i en egen tillfällig mapp per körning, kontrollerar antalet bildrutor och flyttar den gamla filmen till `aldre/`. Skriv inga nya `rendera.sh` med fasta bitnamn.
- **Snabba förhandsvisningar:** `node render.mjs <scen> --snabb` (960×540, 15 fps) och `film/satt-ihop.sh --snabb`. Full rendering bara en gång, när scenen är klar. Högst två renderingar samtidigt på datorn.
- **Molnrendering:** `bash verktyg/molnrender.sh <scenmapp> [--bitar 8] [--en …]` renderar på GitHub Actions. Committa och pusha scenen först. Använd molnet för slutrenderingar; förhandsvisningar görs lokalt.
- **Spara den gamla filmen före omrendering:** `*.mp4` är gitignorerade. Kopiera den färdiga filmen (t.ex. till `<namn>-fore.mp4`) innan du renderar om, så att "använd förra versionen" bara är en kopiering tillbaka.
- **Gamla versioner:** `aldre/`, `gamla*/` och `*-fore-*.mp4`/`*-forra.mp4` är kasserade versioner, inte original. Spara bara den senaste gamla versionen tills den nya är godkänd, och föreslå städning när disken är full.
- **Lagring i iCloud:** material utanför repot ligger i `~/Library/Mobile Documents/com~apple~CloudDocs/Lilla Kritan/` (`Ljud/`, `Kvack-produktion/`, `Avsnitt/`, `Shorts/`, `Bildbank/`, `Mixar/`). `produktion/videos` och `produktion/youtube/mix/mix-N/mix-N.mp4` är länkar dit – flytta dem inte. Nya färdiga mixar flyttas till `Mixar/` med en länk tillbaka. Nedladdningar som hör till kanalen sorteras dit, inte kvar i Downloads.
- **Kontroll:** `python3 verktyg/prompt.py --lista` ska lista alla figurer, platser och saker utan fel.

## 4. Rörelse och bild (Sannas feedback)

- **Lugn rörelse, inte studsig.** Mer studs, ljusstrålar och gungande saker avvisades som "hektiskt" (011). Gör hellre berättelsen och sången tydligare.
- **Figurer snurrar aldrig.** De är 2D-urklipp: ingen rotation runt sig själva, ingen spegling (sx genom 0). Använd hopp, gung, lutning, squash och små bågar. Hopp är lugna: mjukt upp och landa.
- **Saker på ord blir klistermärken:** när sången räknar upp saker (*"Väst och apelsin och båt"*), gör som 005:s disco: bara saken, stor mitt i bild med vit kant, slås upp på sitt ord, flyger upp i en båge strax innan nästa. Inga figurer i de bilderna.
- **Bilden på orden:** det som sjungs eller sägs syns när det sägs (bubbla på "brunt", slick på "mums", ny plats på raden som nämner den). Lägg händelserna efter radtiderna i `rader.txt`.
- **Klipp aldrig sången.** Suno-tagningen används oförändrad: inga inlagda eller borttagna takter, inget kapat slut. Bilden anpassas. `INSATT` i storyboardens `bygg.py` ska vara tomt. Avsnittstid = sångtid + 11 s.
- **Malin efter handlingen:** när en replik beskriver något som animeras startar rörelsen först, och repliken börjar 0,4–0,8 s in eller när saken landar. Frågor och uppmaningar (*"Kan du se …?"*) kommer före.
- **Armar i en bit.** Inga böjda kodarmar, inget eftersläp eller fjädring på armar – det gav konstiga vinklar. Förbättra rörelsen inom de raka stumparna.
- **Vinkande arm bakom kroppen:** armen ligger bakom kroppen och pekar snett ut och upp (ca −60°) så att tassen syns utanför kanten. Rakt upp (−70° och brantare) döljer den. I fordon sitter ratten åt höger, mot fronten.
- **Långa rötter:** öron, svans och ben bakom kroppen ska nå ca 80 px in under kroppen (i 1024-rutan), i sin egen färg, rundade, riktade mot kroppens mitt (`verktyg/langre_rot.py`). Långa smala svansar och små öron rör sig bara ±3–5°.
- **Sova liggande:** en sovande figur blundar först och lägger sig sedan på sidan på golvet (huvudet åt vänster). Aldrig stående med slutna ögon.
- **Premium-finputs** (015): mjuk skugga under figurer och saker, varma tussar (#E4DCCB), gnistor och hjärtan som krit-klistermärken, mörkare krita längs fållar, parallax ca 12 % på förgrunden (aldrig på golvplattan), varm soft-light ca 0,07 och vinjett **högst 0,14**. Hjälpfunktioner i `avsnitt/015-ba-ba-vita-lamm/scener/lamm.js`.
- **Ritintro:** kritan ritar konturen i ett enda drag (ca 7 s, varm gråbrun linje #8F8172, ca 16 bred i 1024-rutan), sedan fylls figurens riktiga bild i inifrån medan linjen tonar bort, och ett litet andetag när den är klar. Skogsljudet `skogsljud-1` lågt under, kort väntan efteråt. Referens: `avsnitt/015-ba-ba-vita-lamm/scener/kritan-ritar/index.html`.
- **Kritsvep:** övergångar mellan platser är krit-svep med 006:s vaxkorn, ca 1,6 s, utan någon sak i svepet (`rodsvep`/`svepVax` i 013:s `scen-kit.js`).
- **Mysiga rum** (inomhus): som 034:s vardagsrum (`bakgrunder/vardagsrummet.md`) – fönster med snö som faller utanför (i kod), gardiner, fåtölj med filt, randig matta, varmt golv (inte helvitt), 1–3 saker. Ingen säng om det inte är ett sovrum.

## 5. Röst, ljud och musik

- **Känsla i Malins manus:** varje replik i `rost*.txt` får en Eleven v3-tagg på engelska före den svenska texten: `[excited] Oj! En gris!`, `[curious] Hm … vad blir det nu?`, `[warm] Hej då, grisen!`. Luta åt glatt och livligt.
- **Aldrig "Vad kan det vara?"** – låter stelt. Säg *"Hm … vad blir det nu?"* eller bara "hmm" och sedan svaret.
- **Aldrig "Vad säger man?"** – för skarpt. Säg *"Ska vi säga tack?"* (paus) – *"Tack!"*.
- **Ingen ny musik.** Skapa ingen ny musik och föreslå inga format som kräver ny Suno-låt; återanvänd `assets/ljud/musik/` och befintliga sånger. Skriv Suno-prompter bara när Sanna ber om dem. Instrumental till 031 gör Sanna själv i Mureka; generera ingen musik, tajma bilden ur ljudet när tagningen kommer.
- **Hela Suno-prompten:** när Sanna ber om en Suno-prompt, ge Title, Style, Exclude styles och Lyrics i var sitt kopieringsblock, fristående (skriv ut hela stilen, inget "samma som förut"). Spara den även i avsnittets `suno.md`.
- **Inga ljudeffekter i Suno:** inga sjungna läten eller ljud i texten; kören upprepar orden, ljuden läggs i klippet.
- **Openverse för ljud först:** sök ljudeffekter och platsljud på https://openverse.org/ (API `https://api.openverse.org/v1/audio/?q=…&license=cc0,by`) innan ElevenLabs. Bara CC0 eller CC BY; CC BY får en kreditrad i `assets/ljud/effekter/README.md`.
- **Godnattsagor:** figuren dricker välling i flaska, aldrig mjölk. Varje saga är en egen sort (se `produktion/youtube/shorts/godnatt/inlasning.md`), högst en eller två sidor frågar barnet. `[quietly]`/`[gently]`, aldrig `[whispers]`. Ge ett onumrerat klistra-in-block per saga plus `sidor.txt` för `verktyg/dela-tagning.py`.
- **Ljudnivåer:** tona aldrig ut en ljudfil från `st=0` (det tystar hela filen). Topp: röster −3 dBFS, mjuka effekter −9, långa mattor −12. Färdig film −14 LUFS, topp ≤ −1,5 dBFS.

## 6. Engelska versioner

Varje avsnitt får också en engelsk version (ny Suno-tagning från en rad-för-rad engelsk prompt, scenerna tajmade om). De svenska versionerna lämnas exakt som de är. Engelskan läggs bara till: `avsnitt/NNN/en/` (`suno.md`, `sang.m4a`, `rader.txt`) och `film/avsnitt-NNN-en.mp4`, bakom en växel vars standard är svenska. Kontrollera att den svenska renderingen är oförändrad innan något engelskt räknas som klart.

## 7. Generera själv

När ett avsnitt saknar ljud, repliker eller bilder: föreslå att göra dem själv med exakta prompter och kostnad, och fråga innan något kostar krediter eller innan bilder genereras.

- **Bilder:** Google Flow (gratis) eller OpenArt (kolla priset först). Fakta om Flow: "16:9" uppskalad 2K är 2752 × 1536 (43:24) – beskär till 2720 × 1530 när det måste vara exakt 16:9. Kön delas och kör en bild i taget; kontrollera att bilden som kommer är den beställda. Uppskalning kan hänga ca 10 min. Image2image ändrar inte en saks proportioner – förläng lokalt i stället. En vit sak i kanten av ett urklipp (snö): beställ den ljusblå (`#DCEBF5`), klipp, gör den vit efteråt.
- **Gissa teckningen-shorts:** gör Flow-bilden först och rita kodteckningen (`streck`) efter dess siluett, inte tvärtom. Visa Sanna bilden innan du ritar.
- **Röst och ljud:** ElevenLabs och Suno i webbläsaren där Sanna är inloggad. Skriv aldrig in lösenord – låt henne logga in själv. Fråga en gång per omgång innan nedladdning (vad, varifrån, storlek).
- **Arkivering:** filerna går direkt från `~/Downloads` till rätt mapp med repots namn: `assets/ljud/effekter/<namn>/<namn>-N.m4a` plus README-rad, `assets/ljud/roster/<avsnitt>/NN-namn.m4a`, `assets/rekvisita|karaktarer|bakgrunder/...` med `original/` och `cut/`.

## 8. Vita kanter (kärnan ur `vita-kanter`)

Varje figur och sak är ett pappersklistermärke med vit kant, och kanten följer **en regel**:

**kant i färdig bild = 3 px + 1 % av sakens höjd i bild** (i en 1920 px bred bild; för stående Shorts räknas långsidan).

- 1 % bakas in i bilderna: nya urklipp får kanten `round(0,01 × sakens höjd i px)`, minst 1 px.
- 3 px läggs till i kod av `verktyg/kant.js`, omräknat varje bildruta. Ladda `<script src="../../../../verktyg/kant.js"></script>` direkt efter `kit.js`. Figurer (`kit.figur`) får kanten automatiskt; saker får `window.kant?.lagg(g)` på gruppen som flyttas och skalas. Saker bara i kod: `kant.lagg(g, { andel: 0.01 })`. En klistermärke av flera delar (båten) får en kant runt hela gruppen, inte en per del.
- Scener utan `kit.js` (godnattsagorna): ladda `/verktyg/kant.js`, `kant.lagg` på varje urklippt `<image>`, `window.kant?.uppdatera()` sist i bildrutan. Inte via `<use>` ur `<defs>`.
- 013:s v2-scener bakar kanten med `verktyg/tunn_kant.py N fil.png` (`--skugga` om saken har grå skugga). Skriv `-tunn.png` bredvid originalet.
- **Kanterna blir för tjocka – om och om igen.** Flow och Nano Banana bakar in 2–4 %. Mät den inbakade kanten på varje nytt eller återanvänt urklipp innan det används, och tunna med `tunn_kant.py N`.
- Gör inte: egna `feMorphology`-filter, kant på bakgrundsplattor eller på saker inuti en vit klistermärkesskiva, ändra en låst figurs bild för att ändra kanten.
- Justera bara i toppen av `verktyg/kant.js` (`BAS`, `ANDEL`, `VAG`, `KORN`).

## 9. Figurer i art direction v2 (kärnan ur `lk-figur`)

Läs `.claude/skills/lk-figur/SKILL.md` (och `nytt-*.md` bredvid) innan du riggar, poserar eller animerar en figur. Referensfigur: `assets/karaktarer/kaninen-kanel/premium/`. För en ny figur: kopiera Ullas eller Ruts `uttryck.html` (mallen `templates/rigg.html` är äldre än motorn).

- **Urklipp:** `verktyg/delar.py` → delarna (`body, ear-l/r, arm-l/r, leg-l/r, tail`, alla 1024²) och `<namn>-rigg.json`. Sedan `langre_rot.py` (alltid), `tunn_kant.py N` (N = 5 px / visningsskala), `flackar.py` för mage och nos. Aldrig `--kant` på v2-konst (dubbel kant). Klipp alla delar ur EN bild.
- **Lager bak → fram:** öron → svans → ben → armar → kropp [`body-tom` → `mage` → ansikte]. Armar och ben ligger bakom kroppen så att rötterna döljs. Armar framför kroppen använder `-fram`-filerna och byter lager först vid `fram > 0.85`.
- **Ansiktet ritas i kod**, uppmätt med `scripts/ansikte_matt.py`.
- **Gemensam motor:** `verktyg/rigg-motor.js` har allt som är lika för alla figurer (`ansikte`, `pose`, `riktning`, `steg`, `klappNy`, `liv`, `vila`, `huvud`, `rorelser()`, filmhjälparna). En ändring där ändrar alla 22 riggar. Behåll formen `const ROR = {` … `};` – avsnittsladdarna skär ut riggkoden från `const RIGG` till den `};`.
- **Riktningspose:** kroppen alltid rakt fram; ansiktet glider åt sidan, öronen lutar, armar glider in och ut bakom kroppen (tonas aldrig). `rikt` vrider bara huvudet; båda armarna på en sida kräver `bada: 1`.
- **Klapp:** händerna möts framför bröstet, på kroppsfärg (inte på ansikte eller nos), med `-klapp`-armar från `verktyg/klapparm.py`.
- **Animation:** en ren `render(t)` utan tillstånd mellan bildrutor; `window.stilla = true` stoppar loopen så att en renderare kan anropa `render(t)` bildruta för bildruta. Rendera headless med `scripts/stills.mjs` (kontaktark om utfilen slutar på `.jpg`) och `scripts/film.mjs`.
- **Rörelsechecklista:** inga hopp på en bildruta (`node .claude/skills/lk-figur/scripts/ryck.mjs <rigg>` ska inte skriva något), inget fryser (andning, svans, öron lever), ögonen leder ca 0,2 s, en loop upprepas inte takt för takt längre än ca 4 s, och allt följer reglerna i avsnitt 4.
- **QA:** stillbilder vid vinktopp, mitt i steg, hopptopp, landning, varje pose och riktningsposen vid 0 / 0,5 / 1: samma kantbredd överallt, inga hack eller sömmar, inga rötter som sticker ut, kameran visar aldrig utanför plattan.

## 10. Bilderbok (kärnan ur `bilderbok`)

Avsnitt utan sång med EN figur, EN plats, en vardagsrutin, ca 3 min (serien *Djuren hittar på!*). Malin pratar med djuret; djuret svarar bara med läten, öron och ansikte. Läs `format/bilderbok.md` och `.claude/skills/bilderbok/SKILL.md` innan första steget; förlagan är `avsnitt/020-grisen-badar/` (läs dess senaste `rader.mjs` och scener, receptet kan ligga efter).

**Berättelsen:** 1) ett litet vardagsproblem, djuret vill inte; 2) kritan ritar en hjälpsak i scenen (kontur, kort gissningspaus, bilden fylls i), *"Varsågod!"*; 3) *"Ska vi säga tack?"* – *"Tack!"*; 4) lek med saken, en liten överraskning; 5) lös det tre gånger med samma fras, sista gången hjälper barnet: *"Kan du se var … är?"* (5 s paus), *"Ja, där!"*; 6) kort lek, hej då, kritiris.

**Grindar – stanna för Sannas ja vid varje:** 1 manus (`manus.md`), 2 rekvisita (4 tagningar per sak, hon väljer), 3 röst (Malins tagning delad och normaliserad), 4 djurläten (en familj om ca 8 känslor per figur, återanvänds i alla dess avsnitt), 5 animatik, 6 snabb förhandsvisning – sedan full rendering. Bygg aldrig förbi en grind som inte är godkänd.

**Regler som bryts oftast:** intro = 1 s logotyp (filmtid = scentid + 1,0); tydligt *"Hej, …! Hej, hej!"* med vinkning och *"Hej då! Vi ses snart!"*; korta repliker med luft (0,7 s extra per rad); bilden på ordet (fläcken försvinner exakt på *"borta!"*); tre frågor till barnet med 4–5 s paus; kamera = hårda klipp mellan stillastående utsnitt, enda zoomen är från papperet in i platsen; lugn rörelse, en sak i taget; glada ansikten har öppna ögon; kritan är liten (skala 0,33), har inget ansikte, vänder sig aldrig och knackar aldrig; högst 3–4 fniss per film; bilden står aldrig helt still (kör `bash verktyg/qa-film.sh` på varje full rendering).

**QA före Sanna:** längd (ffprobe), ljudstyrka (ebur128, −14 LUFS, topp ≤ −1,5), kontaktark, whisper i 30 s-bitar mot `rost*.txt`, pauserna efter frågorna, att djurlätena hörs. Lägg till avsnittet i `harriets-favoriter.md`.

## 11. YouTube

- Beskriv aldrig sångerna som lugna i YouTube-texter (inte "lugn sång", "lugnt tempo", engelska "calm") – de är glada. Skriv hellre glad, sjung med, en sak i taget.
- Sanna drar själv upp mp4-filen (över 10 MB); miniatyrer och SRT kan laddas upp av agenten.
- I Studio laddar spellisterutan sent: klicka innan den laddat och spara, så rensas videons andra spellistor. Vänta ca 3 s, sätt hela önskade läget och läs tillbaka. Säkrast: spellistans sida "Lägg till videor → Välj befintliga videor". Loopa aldrig genom videor i dolda iframes.
- Barnvideor får inga slutskärmar eller kort; länka den långa videon i shortens beskrivning. En publicerad film kan inte få en ny videofil.
- Spellistor: lilla kritan – alla avsnitt, Färgsånger, Barnsånger för de minsta, Bilar bussar och båtar, Tittut, Godnattsagor, Gissa teckningen ×3 (+ Skogen), Korta klipp (shorts), Vardagsberättelser (bilderböckerna 020–).

## 12. Feedback och pågående spår

- **Feedbacksidan:** Sanna granskar videor på https://claude.ai/artifact/HFdD8xZpyrqo22kmeDHPga (källa `produktion/youtube/feedback.html`). Datan där kan bara Claude läsa och skriva; en annan agent får be Sanna klistra in de öppna punkterna. Avsluta alltid med länken när en video är klar för granskning.
- **3D-spåret:** ett Blender-prov av 030 finns i `produktion/blender/` (läs `README.md`, "Kvar att göra"). Fortsätt där i stället för att börja om. Hyrda GPU:er kostar – fråga först.
- **Parallellt arbete:** Sanna vill gärna köra flera sessioner parallellt (t.ex. en per avsnitt). Krediter i Suno och ElevenLabs är däremot dyra: fråga före större omgångar (över ca 3 000 krediter).
