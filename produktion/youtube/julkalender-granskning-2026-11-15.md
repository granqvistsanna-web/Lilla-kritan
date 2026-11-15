# Julkalendern: granskning av de nybyggda luckorna (2026-11-15)

Fyra granskare (Opus) tittade på de 14 nybyggda luckorna i sina senaste renderingar, en bild per sekund plus täta bilder vid nyckelställen, och läste ett whisper-transkript och `qa-film.sh` för varje. Betyg: tydlighet / engagemang / animation, 1–5. **K** = bara kod, **N** = ny Malin-replik (kräver Sannas ok och ElevenLabs).

## Översikt

| Lucka | Betyg | Det viktigaste |
|---|---|---|
| J01 Stjärnan | 4 / 3 / 3 | Problem 2 står still (1:22–1:33), strålarna svävar fritt och kommer 5 s isär, slutet står still i 23 s |
| J02 Tittut | 2 / 3 / 2 | Luckan fyller bilden i 33 s och lammet syns inte. Draget öppnar knappt luckan. "Hurra" kommer 30 s för sent |
| J03 Jätteflingan | 4 / 4 / 3 | Barnets blås får inget svar på 5 s. "Snöbullar!" är fel ord (N) |
| J04 Pepparkakan | 4 / 4 / 4 | **Filmen har inget ljudspår** (kontrollerat med ffprobe). Björnens ansikte beskärs |
| J05 Pulkan | 3 / 3 / 3 | 2,3 s tyst (oinspelad replik, ersätt med `bjornen-ar-stark`), två orsaker, tomma bilder i åket. Inte mastrad (−17,4 LUFS, topp −0,9) |
| J06 Ljusen | 4 / 3 / 3 | Lammet når aldrig fönstret, så lösningen syns inte. Lågorna är pyttesmå |
| J07 Julkulan | 4 / 4 / 3,5 | Bäst. Fallet, spaden och den nya kulan i vidbild. Hunden "hjälper" utan att röra sig |
| J08 Snögubben | 4 / 2,5 / 2,5 | 39 s tyst pyssel efter lösningen, leendet skyms av hunden, inga närbilder, gammal bädd |
| J09 Paketet | 3 / 3 / 3 | 34 s snö innan barnet får blåsa, dubbel orsak till snöhögen, paketets ansikte för litet |
| J13 Lucia | 2 / 2 / 2 | 35 s utan ord (oinspelade repliker, fem inspelade ligger oanvända), sången 107 s i samma vidbild, grisen ser inte sömnig ut |
| J20 Fyra ljus | 3 / 2 / 2 | Arkiverad 11-15 (ersätts av julstrumpan). Behåll idén: ljuset växer ett steg per ord |
| J22 Julgranen | 3 / 3 / 3 | Grå och tänd slinga ser likadana ut, lutningen läses inte, pyntet krockar med ansiktet. Sannas öppna punkter gäller |
| J23 Kulorna | 3 / 4 / 4 | Räknefelet löst. Grisen står still medan kulorna flyger upp själva. Stjärnans närbild beskär |
| J24 Julafton | 3 / 3 / 2 | Lammet och björnen rör inte paketet när de "lyfter tillsammans", fem stumma repliker, inga närbilder, gammal bädd |

## Det som går igen

1. **Närbilder på ögonblicket som betyder något.** J07 och J23 (med `kam`) är tydligt bäst. J06, J08, J13 och J24 visar det viktigaste (lågan, nosen, leendet, kramen) i vidbild där det är några pixlar stort.
2. **Hjälparen måste synligt göra lösningen.** Lammet når inte fönstret (J06), hunden står still (J07), gästerna rör inte paketet (J24) och kulorna flyger upp av sig själva (J23).
3. **Barnets paus ska få något att hända efter 2–3 s.** Det gör den inte i J03, J06, J13 och J04.
4. **Inget parti över ca 6 s utan replik eller ny händelse.** J01 (slutet), J08 (pysslet), J09 (snön) och J13 bryter mot det.
5. **Oinspelade repliker blir tystnad** (J05, J13, J24). Flera ersättare finns redan inspelade (se varje lucka).
6. **Samma ramfraser.** *"Titta, där kommer X! → Kan du hjälpa till? → Hurra! Det gick! → Tack, X!"* i J02, J03 och J05, och björnen hjälper i tre luckor. `02-vill-inte-oppnas`, `bjornen-ar-stark` och `05-for-tung` är inspelade men oanvända.
7. **Äldre renderingar** (J08, J09, J13, J24) saknar närbilderna, lugnt `tass`-intåg och de nya bäddarna som står i deras `index.html`. De behöver renderas om oavsett.

## Ordning

1. **Mekaniskt, nu:** J04 ljud och J05 mastring (`mastra.sh`), sedan nya `-liten` och förhandsvisningar.
2. **Svagast och tidigast:** J02 (2 dec) och J13 (13 dec). Båda går att lyfta mycket med bara kod.
3. **Finalen:** J24, närbilder, gästerna vid paketet, sedan fem nya repliker.
4. **Snabba vinster med bara kod:** J01, J06, J08 och J09.
5. **J22 och J23:** sessionerna som redan arbetar med dem tar punkterna nedan.

Nya repliker att godkänna: *"Snöbollar!"* (J03), *"Grisen kan blåsa!"* (J03), *"Kan du räkna?"* (J02, valfri), *"Stjärnan behöver lysa mer!"* och barnets turer *"Kan du peka på stjärnan?"* / *"Kan du blinka som stjärnan?"* (J01), *"Kan du också gå med små steg?"* (J13), *"Snögubben får knappar! Ett, två, tre."* (J08) och de fem i J24.

---

## Granskning A: J01, J09, J22 (2026-11-15)

Underlag: transkript (whisper), 1 bild/s plus närbilder, `qa-film.sh` (alla −16,1 LUFS, inga svarta, frysta eller tysta partier över 3 s). J22 granskades i `aldre/22-julgranen-202611152036.mp4`, eftersom en annan session renderar om den just nu (runda 6, större gran). Tiderna gäller filmen med ramen.

### J01 Stjärnan (2:10)

**Tydlig och söt första halva, men andra problemet är svagt och slutet står still.** Tydlighet 4 · engagemang 3 · animation 3

Det som fungerar
- Molnet framför stjärnan, den arga minen över kanten och de tre suddragen är solklara (0:36–0:57).
- Det glada skuttet och suddgummits pip och bugning ger personlighet.
- Stjärnan krymper på väg upp, så att orsaken till "så liten" syns (1:21).

Förbättringar
1. **1:22–1:33, 11 s nästan stilla.** Den lilla stjärnan sitter i toppen och inget händer mellan "så liten" och den första strålen. Fixen: låt stjärnan titta ner, vicka och sträcka på sig (`ror: 'skaka'`, kansla `ledsen`) i steget `01-stjarnan-sa-liten`, och korta `vanta` 3,6 + 3,2 till ca 2,5 + 2. *Bara kod.*
2. **1:33–1:44, strålarna svävar fritt.** Den första strålen ritas långt ovanför den pyttelilla stjärnan och ser ut som ett löst streck (bild 1:35). Fixen: låt stjärnan växa *först* och rita strålen kring den nya storleken, eller rita den första strålen nära 0,18-stjärnan. Strålarna kommer 5 s isär ("En stråle" 1:33, "En till" 1:38, "Och en till" 1:43). Planen sa ca 0,7 s, och 1,5–2 s räcker. Ändras i strålstegen och `flyg`-stegen mellan dem. *Bara kod.*
3. **Barnets tur saknas helt.** Plan 6.3 har "Kan du peka på stjärnan?" (5 s) och "Kan du blinka som stjärnan?" (4 s). Ingen av dem finns, och filmen är 2:10 i stället för ca 2:56. Den bästa platsen är efter "Hm … vad gör vi nu?", där stjärnan skimrar och barnet pekar. *Ny replik.*
4. **1:44–2:07, 23 s med samma bild.** Tindra, glittra, tack, tack: stjärnan står still i toppen med samma min. Fixen: slå ihop `tindra` och `vanta 2.5` och låt suddgummit skutta in till granen vid "Tack, suddgummit!". Kritan kan göra en liten nick vid "Tack, kritan!". *Bara kod.*
5. **0:44–0:49 och 1:02–1:06.** Arg-minen hålls 5 s och efter tacket står allt still 4 s. Korta `vanta` 4.4 → 3,4 och `vanta` 1.2 räcker. *Bara kod.*
6. Det andra problemet är logiskt tunt: strålar gör inte en stjärna större. Förslag: "Stjärnan behöver lysa mer!" före strålarna. *Ny replik.*

Från tidigare granskningar, inte gjort: strålarna i takt (punkt 2) och barnets två turer ur plan 6.3.

### J09 Paketet (3:06)

**Bra bus-tråd, men paketet är litet i bild och snöproblemet drar ut.** Tydlighet 3 · engagemang 3 · animation 3

Det som fungerar
- Det trassliga bandet, "Busiga krita!" och fnisset ger kritan personlighet.
- Suddet, och sedan rosetten med ett glatt skutt (1:28–1:31), ger tydlig betalning.
- Blåsturen gör något: snön slutar och molnet åker bort (2:16–2:21).

Förbättringar
1. **1:41–2:15, 34 s snö innan barnet får blåsa.** "Kan du blåsa?" kommer först ca 2:07. Fixen: korta `snoar`-steget (`vanta 3.5`) och de två `vanta 2.4`/`2.8` efter snöhögen, och flytta upp blåsfrågan. *Bara kod.*
2. **Dubbel orsak till snöhögen.** Det snöar ur molnet *och* kritan ritar högen (1:51). Det förvirrar. Låt högen växa ur snöfallet utan kritan och stryk "Kritan ritade snö på paketet!" och det andra "Busiga krita!". Molnet är redan kritans bus. *Bara kod* (stryk repliker).
3. **Ansiktet syns för lite.** Paketet är ca 20 % av bildens bredd, och trasslet (0:52–1:12) och snöhögen täcker överkanten, så det arga ansiktet är litet. Fixen: `PS` 0,5 → 0,6 och flytta upp `ansikte` något, eller zooma in lite under problemen. *Bara kod.*
4. **2:42–2:49, dansfrågan utan dans.** Paketet står still i 5 s efter "Kan du dansa som paketet?" och dansar sedan bara ca 4 s. Barnet har inget att härma. Fixen: `ror: 'dansa'` redan i frågesteget och en dans på 6–8 s som i J22. *Bara kod.*
5. **0:52–1:12, 20 s med trasslet.** Fyra repliker i rad medan bilden står still. Stryk `vanta 2.2` med "Kritan, kan du göra det fint?" här (den behövs bara en gång, vid snön). *Bara kod.*
6. **0:15, "Vad ritar kritan?" över julgransfoten.** Foten är en konstig första gissning. Rita foten utan fråga och ställ frågan när grankonturen börjar. *Bara kod.*

Från tidigare granskningar, inte gjort: kritan som "ser skyldig ut" (bara vick), och "Paketet vi såg!" i J24 (inte min lucka).

### J22 Julgranen (3:01)

**Fin avslutning med paketen och dansen, men båda problemen är svåra att se.** Tydlighet 3 · engagemang 3 · animation 3

Sannas öppna punkter (större gran, tacket kommer sent, radio före dansen, ansiktet tidigare, högre musik, repliken vid 0:51, snabbare vid 1:51) stämmer. Det här lägger jag till:

1. **0:29–0:58, grå och tänd slinga ser nästan likadana ut.** Den tända slingan har bara blekgula prickar, inget sken (närbilder 0:33 och 0:58). Orsaken till "lyser inte" och lösningen syns knappt. Fixen: J01:s `stral-sken`-filter (gult glödsken som andas) på den gula slingan och ett litet tindra per lampa när den fylls i. Gör den grå slingan mörkare (`#7D838C` → mer grafit). *Bara kod.*
2. **1:20–1:50, lutningen syns knappt.** ±7° och en vingling på ±2,5–6° läses inte som "granen ramlar" i liten skärm. Det tar 30 s. Fixen: 12–14° med ett tydligt håll vid ytterläget och ansiktet `forvanad`, och stryk `vanta 2` mellan lutningarna. Det svarar också på "1:51 snabbare". *Bara kod.*
3. **Ansiktet krockar med pyntet.** Slingan går över ögonen och kulorna sitter vid kinderna (närbild 1:28), så minen blir rörig. Flytta `ansikte.mitt` till en slät yta eller lägg kulorna längre från ansiktet. Det hör ihop med "ansiktet tidigare". *Bara kod.*
4. **Paketen är pyttesmå (2:17–2:33).** Skala 0,14–0,2, alltså ca 3–5 % av bildhöjden. Det är svårt att räkna. Det blir bättre med större gran, och paketen kan få skala ×1,3. *Bara kod.*
5. **"Oj, kritan! Vad busig du är!" efter den grå slingan** står i granskningen (*infört*), men hörs inte i filmen. Antingen lägg in `jul/kritan-busig` (finns inspelad, används i J01) efter "lyser inte", eller stryk den ur granskningsdokumentet. *Bara kod.*
6. **2:44–2:59, "Dansa du också!" kommer sent i dansen** och följs av två tack med stillastående bild. Lägg repliken ca 1 s in i dansen och korta `vanta 3` före tacket. Det är en del av "tacket kommer sent". *Bara kod.*

Från tidigare granskningar, inte gjort: en kortare slingdel (problem 1 är fortfarande ca 50 s med pyntet). Att granen suckar var ett medvetet val att stryka, och jag håller med.

---

## Granskning B: J02–J05 (2026-11-15)

Underlag: whisper-transkript, kontaktark 1 bild/s, närbilder 2,5 bilder/s vid nyckelställen, `qa-film.sh`. Tider = filmtid (ramen tar ca 13,5 s först).

**Akut:** `04-bjornen-pepparkaka.mp4` (17:44) **saknar ljudspår helt**. `-liten.mp4` (16:55) är en äldre rendering. Transkriptet för J04 kommer från `aldre/…-fore-fb-fat-stjarna.mp4`.

**Samma i alla:** J02, J03 och J05 har exakt samma kedja: *"Titta, där kommer X!" → "Kan du hjälpa till?" → "Hurra! Det gick!" → "Tack, X!"*, och sedan hej då två gånger. Björnen är med i tre av fyra luckor (hjälpare i J02 och J05, huvudfigur i J04). J04 bryter mönstret, och det är bra.

---

### J02 Tittut – 2 / 3 / 2
Bra början, men problemet och lösningen är nästan osynliga: i 33 s fyller en röd lucka bilden.

**Fungerar**
- Ny julsak vid varje tittut (luva, rosett, stjärna) ger en överraskning varje gång.
- Björnen nickar när den kommer in, och lammet och björnen fnissar mot varandra efter tittut.
- Bollrullningen är en lugn och fin lek.

**Förbättringar**
1. **0:32–0:45: lammet syns inte alls.** Luckan täcker hela bilden, och QA hittar två frysta partier (35,7–39,6 och 40,7–44,6). *"Lammet puttar"* går inte att se. Fix: låt luckan fastna på glänt (dorr ca 0,85, `glant`), så att lammets ledsna ansikte och puttet syns i springan. Ändras i bit 9–10 (`ryck`). *Bara kod.*
2. **0:55–1:05: draget går inte att läsa.** Luckan öppnas bara 0,757 → 0,728 → 0,706, så glipan växer inte märkbart. Tassen når inte synligt luckan, och björnen är halvt utanför bildkanten. Fix: större steg (t.ex. 0,757 → 0,6 → 0,45 → 0), och flytta in björnen (GR) så att den syns hel. Ändras i dra-bitarna (`dorr`, `GR`). *Bara kod.*
3. **0:48–0:55: barnets tur är oklar.** *"Kan du hjälpa till?"* följs av 5 s med nickar, och barnet vet inte vad det ska göra. Fix: låt barnets tur vara att räkna. Dela `02-ett-tva-tre` på de tre dragen med ss/langd, som `05-heja-3` och `03-fff` redan gör, så att ett tal hörs per drag. *Bara kod.* Vill man ha en uppmaning först (*"Kan du räkna?"*) behövs en *ny replik*.
4. **1:35: *"Hurra! Det gick!"* kommer 30 s efter att luckan gick upp**, efter bollen, och hänger inte ihop med något. Fix: flytta hurra och tack till direkt efter *"En stjärna!"* (fniss-biten vid ca 1:08), och lägg bollen efteråt som lek. *Bara kod.*
5. **Genomgående: figurerna är små** (ca 1/3 av höjden) mot en blek bakgrund. Ge en närbild på lammets glada ansikte vid *"Lammet är glatt!"* (1:10). *Bara kod.*
6. Använd de inspelade `02-vill-inte-oppnas` och `bjornen-ar-stark` (finns, oanvända) vid problemet respektive när björnen kommer in. *Bara kod.*

**Kvar från tidigare granskningar:** *"Björnen är stark!"* och *"Den vill inte öppnas."* är inspelade men inte inlagda. Andra tittut med björnen (planen) finns inte med, och det behövs inte.

---

### J03 Jätteflingan – 4 / 4 / 3
Tydligast av de fyra. Orsaken syns (vindstrecken), hunden når inte, och grisen och barnet blåser ner flingan. Bra.

**Fungerar**
- Kedjan gapa → vind → granen → når inte → ledsen kan en 2-åring följa.
- Flingan landar på nosen, och slicket ("mums") är en rolig utdelning.
- Snöbollen på magen med *"Oj! Puff!"* och hundens fniss.

**Förbättringar**
1. **0:53–1:00: barnets blås får inget svar.** Efter *"Kan du blåsa? Fff!"* står allt still i ca 5 s, och sedan blåser grisen tre gånger. Fix: korta väntebiten (7,6 s → ca 3,5 s) och lägg grisens tre blås i pausen, ca 1,5 s isär, så att varje blås från barnet får flingan att gunga. *Bara kod.*
2. **1:29: *"Snöbullar!"* är fel ord** (`03-snobullar`). Barnen ska lära sig "snöbollar". *Ny replik* (*"Snöbollar!"*). Annars kan raden strykas, och då är det bara kod.
3. **0:33–0:35 och 1:00–1:08: flingan i toppen är liten** på en mobil. Fix: lugn inåkning mot granens topp när den fastnar och när den lossnar (`nara`, som J05). *Bara kod.*
4. **1:23–1:52: snöbollsdelen är lång** (29 s efter tacket). Kritan ritar fyra bollar på 6,8 s. Fix: rita två, ca 3,5 s. *Bara kod.*
5. **1:44–1:49: barnets kast är svagt.** Två små bollar landar och syns knappt. Fix: större snöstänk, och båda figurerna hoppar till. *Bara kod.*

**Kvar:** *"Grisen kan blåsa!"* (varför just grisen) är inte infört, och jag tycker fortfarande att det behövs (*ny replik*).

---

### J04 Pepparkaksdansen – 4 / 4 / 4 (när ljudet är tillbaka)
Den mest genomarbetade: kakorna sover, barnet klappar, de vaknar, sedan en riktig musikvideo. Bilden följer orden (hjärtat på "hjärtat" 1:05, gubben vinkar 1:10, stjärnan 1:27, luvan ritas på "luvan" 1:31–1:35).

**Fungerar**
- Klapp, klapp, klapp väcker en kaka per klapp. Barnets tur får något att hända.
- Varierade bilder i sången (rutnät, rosett, fyra rutor) med klipp på fraserna.
- Kakorna sover liggande på fatet och sätter sig upp. Det följer regeln.

**Förbättringar**
1. **Hela filmen: inget ljud.** Kör ljud- och mastringssteget igen (`mastra.sh` / `hel-video.sh`) och kontrollera med ffprobe att det finns ett ljudspår. *Mekaniskt.*
2. **0:20–0:30, 1:40–1:42 och 1:54–1:57: beskärning.** Björnens ansikte klipps vid vänsterkanten (ögat i kanten), och i 1:54–1:57 syns bara luvan och ögonen i 3–4 s medan kakorna är utanför bild. Fix: mindre zoom i kameralistan för de bitarna och i sångbilderna `[95,'N']` och `[119,'N']`. *Bara kod.*
3. **0:31–0:38: pausen efter *"Kan du klappa?"*** är ca 5 s där bara Zzz rör sig. Fix: björnen lägger tassen mot munnen ("sch") eller nickar mot barnet. *Bara kod.*
4. Ingen kompis och inget riktigt problem. Det är okej som omväxling: låt det vara så.

**Kvar:** lammet som hjälpare föll bort när luckan blev musikvideo. Det är rätt beslut.

---

### J05 Pulkan – 3 / 3 / 3
Bra utdelning (björnen åker med, *"Wiii!"*), men orsaken är rörig och mitten står still.

**Fungerar**
- Tre åk i början med snöyra, och grisen ser glad ut.
- Ett *"Heja!"* per knuff, och grisen hejar med.
- Segern är att de åker tillsammans (det tidigare förslaget är genomfört).

**Förbättringar**
1. **1:03–1:05: 2,3 s tystnad.** `jul/05-bjornen-stark` finns inte (inte inspelad). Byt till den inspelade `jul/bjornen-ar-stark` i bit E. *Bara kod.*
2. **0:30–0:52: två orsaker.** Repliken säger *"fastnat i en snödriva"* och sedan *"för tung att flytta själv"*. Säcken är liten och drivan diskret, och replikerna är 8–9 ord (för långt). Fix: välj en orsak. Använd de inspelade `05-for-tung` och `02-nej-fast`, och gör säcken tydligt stor (`SS` 0,42 → ca 0,6). *Bara kod.*
3. **1:00–1:16: björnen står still i ca 16 s** innan första knuffen. Fix: korta väntan (3 s-biten bort), och låt björnen lägga tassarna på pulkan vid *"Björnen kan knuffa!"*. *Bara kod.*
4. **1:16–1:27: knuffarna syns dåligt.** Med 130 px per heja ändras bilden knappt. Fix: större steg eller en snöpuff vid varje knuff, och pulkan lutar framåt. *Bara kod.*
5. **1:33–1:45: åken går ut ur bild och kommer tillbaka från vänster** med helt tomma bilder (1:35,4 och 1:38,2) och halva figurer (1:44,2). Det ser ut som ett fel. Fix: hårt klipp när pulkan går ut ur bild, eller en kamera som följer med (`glid` i djur.js). *Bara kod.*
6. **0:33–0:58:** närbild och helbild byts var 2–4 s. Behåll två närbilder (arg, trött) och stryk resten. *Bara kod.*

**Kvar:** *"Björnen är stark!"* är bara halvt infört (se 1).

---

### QA (qa-film.sh)
- J02: −16,1 LUFS. Fryst 35,7–39,7 och 40,7–44,6 (luckan, se J02:1).
- J03: −15,8 LUFS, inga frysningar och ingen tystnad.
- J04: inget ljudspår (ingen LUFS-mätning), inga frysningar.
- J05: −17,4 LUFS och topp −0,9 dBFS: inte mastrad (målet är −16 LUFS / −1,5 dBTP). `-liten.mp4` (16:47) är äldre än filmen (17:51). Kör `mastra.sh` igen, i samma vända som J04.

---

## Granskning C: J06, J07, J08, J20 (2026-11-15)

Underlag: transkript (whisper), 1 bild/s plus 5 bilder/s på nyckelställen, `qa-film.sh`. Alla fyra: −16 LUFS, inga frysta eller tysta partier. Tider nedan gäller i filmen (scenen börjar ca 13,4 s). **N** = ny Malin-replik (Sannas ok och ElevenLabs), **K** = bara kod.

**Viktigt först:** J20 *Björnen fyra ljus* arkiverades 2026-11-15 och ersätts av *Kaninen och julstrumpan* (`julkalender-j20-julstrumpan.md`). Den är granskad nedan ändå. J08 och J20 har fått nya bäddar i `index.html` (`baddFil` karol-pynta-salen och karol-forsta-jul) efter renderingen, så filmerna har fortfarande den gamla bädden.

---

### J06 Leoparden och ljusen (2:01)
**Tydlig och lagom lång. Lösningen (lammet stänger fönstret) syns dåligt.** Tydlighet 4 · engagemang 3 · animation 3

Det som fungerar:
- Orsaken syns: fönstret slår upp, vindstrecken går och lågorna lutar (33–36 s). Leoparden kisar och gråter med bra pauser.
- Tre försök med kortare tempo, och "Nej, vinden igen!" kommer på rätt ställe.
- Rummet är mysigt och varmt (lampan, fåtöljen, mattan).

Förbättringar:
1. **82–87 s: lammet når aldrig fönstret.** Det går ca 200 px, hoppar lite (45) med huvudet framför rutan, och fönstret slår igen bakom huvudet. Det syns inte *att lammet* stänger. Fix: låt lammet gå ända fram till fönstret och hoppa högre (`luft` ca 120), stäng rutan när lammet är på topp och sträck ut armen. Kanske en närbild (`kam`) på fönstret som i J07. Bit E, `[6.5, 'tittar', … hamta …]`. K
2. **Ljusen och lågorna är små i en vid bild hela filmen.** Lågorna som slocknar (36 s, 50 s, 56 s) och "Nu lyser det!" (89–93 s) är det viktigaste, men de är några pixlar stora. Fix: lägg en `kam`-närbild på ljusbordet i C-bitarna, när de slocknar, och i F, när de tänds. K
3. **72–80 s: barnets tur gör inget.** Efter "Kan du peka på fönstret?" står allt still i ca 7 s. Fix: låt fönstret skimra eller gardinen fladdra efter 2 s, och låt lammet titta mot fönstret och nicka när paus är slut. Bit `[7.2, 'tittar', … 06-peka-fonstret]`. K
4. **Lammet står ovanpå fåtöljen och skymmer ljusbordet** (66–117 s). Det sitter på vänsterkanten och armen är utanför bilden. Fix: `gaster` dx −820 → ca −700 och flytta fåtöljen åt vänster, eller låt lammet stå till höger om leoparden. K

Från tidigare granskningar, inte gjort: "lågan lyser upp båda ansiktena" finns som `varmt`, men det syns knappt i bilden. Gör skenet starkare. "Lammet är mjukt och varmt" passar inte längre, eftersom handlingen nu är fönstret. Stryk den.

---

### J07 Lammet och julkulan (1:59)
**Bäst av de fyra. Snabb och varm, men tre viktiga ögonblick händer i en vid bild.** Tydlighet 4 · engagemang 4 · animation 3,5

Det som fungerar:
- Varningen gör att barnet förstår *varför* kulan går sönder. Det är bra berättande.
- Hjärtat över lammet när hunden tröstar (72–79 s) är en tydlig och fin känsla.
- Närbilderna med hårda klipp ger tempo. Tempot passar bra.

Förbättringar:
1. **34,1–35 s: själva fallet sker i den vida bilden** (kameran släpper vid 1,5 s när kulan faller), och skärvorna i `GOLVET`-bilden är små vita fläckar som delvis skyms av granfoten. Fix: håll `PUTT`-kameran till 2,6 s och tilta ner, och gör `GOLVET` närmare (zoom ca 2,2) och centrerad på skärvorna. Bit 6, `kam: [...PUTT, 0, 1.5]`, och `GOLVET`. K
2. **84–89 s: "Hunden hjälper till" stämmer inte med bilden.** Hunden står kvar till vänster, och bara lammet hoppar. Manuset säger att hunden tar snöret i munnen. Fix: låt hunden gå fram till kulan med `hamta gang` och hoppa *tillsammans* med lammet, och lägg det i en `TVA`-närbild så att den nya kulan syns när den landar. K
3. **41–47 s: spaden och kvasten ritas i en vid bild** och syns knappt. Fix: lägg `SOPA`-närbilden redan på ritbiten (`[7.6, … rit spade/kvast]`). K
4. **Kvasten står kvar lutad mot granen resten av filmen** (60–115 s) och sticker in i granen. Fix: låt kvasten åka ut med spaden (`kvastUt`), eller lägg den på golvet. K
5. **90–104 s: firandet i vid bild med små figurer**, 14 s. Fix: `TVA`-närbild redan på "Kan du gunga som kulan?" i stället för först vid "Hurra". K

Från tidigare granskningar: allt är gjort (ledset ansikte, finare silverkula, glädjehopp).

---

### J08 Hunden och snögubben (3:17, renderad 11-14)
**Rolig orsak (nysningen), men för lång. Halva sista minuten är tyst pyssel, och segern skyms.** Tydlighet 4 · engagemang 2,5 · animation 2,5

Det som fungerar:
- Nysningen: "Det kittlar … atjo!", och nosen flyger upp i granen (54–58 s). Orsaken syns, och det är roligt.
- Moroten syns i granen medan hunden letar. Barn älskar att se det som figuren inte ser.
- Sur snögubbe när nosen är borta, glad när den sitter.

Förbättringar:
1. **146–185 s: knappar och pinnarmar i 39 s utan att Malin säger något.** Det kommer efter att problemet är löst. Fix: korta till tre snabba knappar (ca 1,5 s var) och båda armarna i en bit (ca 6 s), och låt Malin räkna: *"Snögubben får knappar! Ett, två, tre."* N (utan repliken: bara kortningen, K). Bitarna 27–34.
2. **137–143 s: snögubbens leende (segern) skyms** av hundens huvud, eftersom hunden står bakom och överlappar den. Snögubben är också mindre än hundens huvud. Fix: hunden backar ett steg (`gang` −120) innan `ler`, och lägg en närbild (`kam`) på snögubben, som i J07. Bit 25. K
3. **Ingen närbild i hela filmen.** J07 (11-15) har `kam`, men J08 saknar det. Nysningen, morotens flykt och leendet behöver närbilder. K
4. **114–124 s: leoparden "klättrar" genom att sväva rakt upp** framför granen (`luft` 480), och den står framför stammen i 30 s (91–122 s). Fix: låt leoparden stå till höger om granen och klättra i tre små hopp längs kanten, eller låt den sträcka sig från en gren. Bit 20. K
5. **38–49 s: 11 s promenad runt snögubben utan replik**, och hunden går bakom den och skymmer den. Fix: korta till ca 6 s (`gang` 4,5 → 3). K
6. **Gamla bädden:** rendera om med `karol-pynta-salen` och dagens rigg. K

Från tidigare granskningar, inte gjort: "försök 2 och 3 kortare". Leta-bitarna är 7,4, 4,6 och 6,0 s, så den tredje är längre igen. Korta den till ca 4 s.

---

### J20 Björnen och fyra ljus (2:54, renderad 11-12, arkiverad)
**För lik J06 och full av döda partier. Sanna gjorde rätt som arkiverade den.** Tydlighet 3 · engagemang 2 · animation 2

- Den är för lik J06: samma ljusstake, samma kritan tänder, samma "Räkna med mig … ett, två" och samma vaggande hej då. J06 är bättre på allt.
- **103–117 s: barnets tur är tyst.** `20-visa-hogt` och `20-hogre` spelades aldrig in, och ljuset växer utan att någon säger något.
- **35–62 s (27 s) och 118–134 s (16 s): ingen replik och nästan ingen rörelse.** Stumpen är en röd prick som man knappt ser.
- **72–79 s: hunden går framför ljusstaken** och skymmer just när den knuffar ut stumpen.

Om något återanvänds i julstrumpan: växandet steg för steg (`vaxer`) och "barnets ord driver bilden" fungerar. Lägg det i den nya luckan med inspelade repliker från början.

---

### Det som gäller alla fyra
- **Närbilder på det viktiga ögonblicket.** Det är den största skillnaden mellan J07 och resten. Saken (lågan, kulan, nosen) ska fylla bilden när den ändras.
- **Ingen bit ska vara längre än ca 6 s utan replik eller ny händelse** (J08 och J20 bryter mot det flera gånger).
- **Barnets paus ska få något att hända** efter 2–3 s (J06 fönstret, J20).

---

## Granskning D: J13, J23, J24 (2026-11-15)

Underlag: transkript (whisper), 1 bild/s plus 2–4 bilder/s vid nyckelställen, qa-film.sh (inga svarta, frysta eller tysta partier, −16 LUFS). **Obs:** J23 renderades om 21:28 av en annan session medan jag granskade. Bedömningen gäller den nya filmen (snöhögar, Malin räknar efter dinget, närbilder).

### J13 Lucia: 3:52
**Bra stämning, men barnets tur är stum och sången är 107 s i samma bild.** Tydlighet 2 · Engagemang 2 · Animation 2

Det som fungerar:
- Ljusen tänds och räknas (0:18–0:27), och kronan blinkar i takt under sången.
- Tre halk, där försök 2 och 3 är kortare, och en förvånad paus före "Oj! Isen är hal!" (0:41).
- Lugn kvällsbild och en hel, oklippt sång.

Förbättringar:
1. **1:01–1:36: 35 s utan ord.** De fyra nya replikerna (`13-grisen-sma-steg`, `13-kan-du-sma-steg`, `13-sma-steg-tass`, `13-tillsammans`) är inte inspelade, så barnet får aldrig veta att det ska gå med. Tre av dem finns redan inspelade och kan användas direkt (bara kod): `13-tass` "Tass, tass, tass." i biten E, `13-kom-fram` "Lammet kom fram." i stället för `13-tillsammans`, och `13-forvanat` efter första halket. *Kan du också gå med små steg?* behöver en ny replik (Sanna + ElevenLabs).
2. **1:37–3:25: sången är en enda vidbild.** Figurerna är små, står ihop framför dörren, och lammets ena arm står stelt ut hela tiden. Använd `kam` (finns i djur.js sedan 11-13, J23 använder den) i `sang(...)`-bitarna: närbild på lammet med kronan i versen, närbild på grisen som är sömnig, gäspar och sedan öppnar ögonen i refrängen (36 s, 2:14), tvåbild på "God morgon" (2:54) och vidbild till dansen. Ge grisen `uttryck: 'somnig'` → glad i stället för bara `vagga`. Bara kod.
3. **0:36–0:52: halket syns knappt.** Isfläcken är en blek ellips (`IS 0.6`), och lammet glider bara ca 150 px utan att luta sig. Gör isen större och blankare, låt lammet luta sig och vifta med armarna på `glid`, och lägg in en närbild på det förvånade ansiktet i `oj`-biten. Bara kod.
4. **0:58: dörren öppnas av sig själv.** Knackningen ströks, men `13-knackar` ("Lammet knackar. Knack, knack, knack.") och `13-kan-du-knacka` finns inspelade. Lägg in dem före `nyfiken`-biten (paus 4 s, tre knackljud). Då blir det barnets knack som väcker grisen. Bara kod.
5. **1:00: "Grisen har sovit", men grisen ser pigg ut.** Den syns liten i dörren och har öppna ögon. Använd ett sömnigt ansikte och en gäspning (`noff-sot` finns), och lägg en närbild på grisen. Bara kod.
6. **Under sången överlappar figurerna.** Grisen står delvis framför lammet och dörren. Flytta isär `GF`/`UTE`, så att båda syns hela. Bara kod.

Förslag som inte är gjorda: berättelsegranskningens "grisen och lammet håller varandra, axel mot axel" finns i koden, men det syns inte att de håller varandra. Kronans ljus ska blinka per steg, och det gör det, men det syns inte i vidbilden.

### J23 Kulorna: 2:26 (ny rendering)
**Den bästa av de tre, med bra närbilder och tröst, men grisen står still medan hunden gör allt.** Tydlighet 3 · Engagemang 4 · Animation 4

Det som fungerar:
- Närbilderna: kulan faller (0:34), snön täcker kulorna (0:43), luvan glider ner (0:54), den ledsna grisen (0:59), tröst med hjärtan (1:14), hunden gräver (1:27) och hundens luva (1:57).
- Den nya orsaken: kulorna hamnar under snö och hunden nosar fram dem ("Hunden kan leta!", 1:08).
- Malin räknar nu efter dinget (Två ≈ 1:40, Tre ≈ 1:49). **Sannas "räknar fel" är löst.**

Förbättringar (sessionen som redan arbetar med J23 kan ta dem):
1. **1:22–1:50: grisen står passiv till vänster i alla tre rundorna.** Kulan flyger upp i granen av sig själv. Detta är kärnan i Sannas fråga om varför grisen inte hänger upp kulorna själv. Låt hunden gå till grisen med kulan (`runda`: c → `DX`), så att grisen tar den och hänger upp den (`arm`, ding). Grisen kan inte hitta kulorna, men den kan hänga upp dem. Bara kod.
2. **0:45–0:50: snöhögarna är små och ligger i hörnet, och grisen tittar aldrig på dem.** Låt grisen stanna vid högarna och titta förvirrat (`ser` mot `SPOT`) innan luvan glider ner. Barnet ska se att kulorna finns under snön. Bara kod.
3. **1:59: stjärnans närbild beskär stjärnan i överkanten, och ansiktena halvt i underkanten.** Den ändrade `KAM.stjarna` (960, 360, 1.6) är sämre. Prova (960, 400, 1.35) eller hellre en vidbild med ljuset. Bara kod.
4. **2:05–2:12: "Kan du peka på stjärnan?"** Grisens och hundens pekarmar syns knappt i vidbilden. Klipp till en halvnära bild (`kam`) medan de pekar. Bara kod.
5. **Lönen saknar närbild.** Ett klipp på grisens glada ansikte när första kulan sitter (ca 1:31) och när granen tänds (2:02) skulle ge belöningen. Bara kod.

Förslag som inte är gjorda: "grisen hänger upp dem med ett pling för var och en" (berättelsegranskningen och julkalender-granskningen) syns inte i bild. Se punkt 1.

### J24 Julafton: 1:55 (renderad 11-12)
**Finalen har rätt delar, men "tillsammans" syns inte, och fem repliker är stumma.** Tydlighet 3 · Engagemang 3 · Animation 2

Det som fungerar:
- Kameran glider förbi ljusen och stjärnan i granen (0:14–0:18), och knyter ihop J20, J01 och J23.
- Tre lyft, där 2 och 3 är kortare, en suck med ledset ansikte, och locket som går upp ett steg per tal.
- Paketet har J09:s ansikte, och nallen avslöjas.

Förbättringar:
1. **1:12–1:21: lammet och björnen rör inte paketet.** De lyfter armarna på sina platser, långt bort (lammet −490, björnen 830 bakom granen). Lösningen "tillsammans" syns inte. Flytta in dem till paketets sidor (`gaster`-x, eller `gang` i `rakna-med-oss`-biten) så att händerna är på locket. Bara kod.
2. **Stumma platser:** 0:19 (`24-paketet-vi-sag`), 1:03 (`24-tillsammans`), 1:23 (`24-nallen-vinkar`), 1:30 (`24-en-kram`) och 1:46 (`24-alla-tillsammans`). Utan dem säger ingen att det är J09:s paket, och nallens stund blir tyst. Tills de är inspelade kan `24-julafton` ("Idag är det julafton.") ligga i den första platsen (bara kod). Resten behöver nya repliker (Sanna + ElevenLabs).
3. **Ligger efter J23:** inga `kam`-närbilder. De behövs på det ledsna ansiktet vid sucken (0:47), nallen som tittar upp (1:21), kramen och hjärtat (1:30, hjärtat är pyttelitet nu) och "God jul" (1:48). Gästerna hoppar in (0:52, 0:55) i stället för det lugna `tass: true` som J23 fick 11-15. Bara kod.
4. **Indexet har ny bädd** (`karol-tyst-natt`) som inte är renderad. Filmen har den gamla bädden. Rendera om efter punkterna ovan.
5. **0:52–: ljusen beskärs av vänsterkanten, och lammet står framför dem.** Flytta ljusen in i bilden, eller lammet åt höger. Bara kod.
6. **Nallen är en stel sak som bara lutar.** Ge den ett litet ansikte som blinkar (som paketet), och kramen en närbild. Bara kod.

Förslag som inte är gjorda: replikerna "Paketet vi såg!" och "God jul alla tillsammans" (berättelsegranskningen) är skrivna men inte inspelade. Kulorna från J23 syns i granen men nämns inte, och kameran stannar bara 0,5 s på granen.

---

