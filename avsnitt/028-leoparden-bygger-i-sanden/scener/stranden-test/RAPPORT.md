# Rapport: fixrunda 028 stranden-test

Fyra feedbackpunkter fixade i `stranden-test/index.html` (enda filen som rörts). Blindtest: jag har inte tittat i git-historiken eller i `produktion/agent-test/` utöver briefen. Kontrollerat med egna stillbilder före och efter (`node render.mjs stranden-test <tider>`, bilder i `stills/`).

## 1. 1:56 – "hide spaden a bit more"

**Orsak:** Gömplatsen `SP_BAK` låg vid `KAKOR[2][0] + 62`. Spadens spets stod då precis vid hinkens högra kant, så hela det röda bladet och skaftet syntes fritt bredvid hinken i gömställets närbild (`K_GOM`) – inget var egentligen gömt.

**Ändring:** `SP_BAK = [KAKOR[2][0] + 34, 996]` (var +62). Vinkeln 34° är kvar, så gult skaft och handtag sticker upp bakom hinkens kant men bladet ligger nu bakom hinken.

**Varför:** Gissningsleken i rad 13–14 kräver att spaden är gömd men hittbar ("Kan du se var spaden är?"). Skimret i rad 13 följer automatiskt med eftersom det räknas ur spadens position.

**Kontrollerat:** 124 (K_GOM-närbild): bara skaft + handtag syns bakom hinkens högerkant, bladet dolt. 121 (K_SOK vidr bild): ett litet gult skaft skymtar – fortfarande hittbart för barnet, men inte givet.

## 2. 2:10 – "spaden moves for no reason"

**Orsak:** I rad 14 gled spaden på ordet "där" i en egen båge från gömstället tvärs över sanden till `SP_FRAM` (ca 500 px på 0,8 s) – medan leoparden stod kvar långt till vänster. Ingen rörde den, och rörelsen hände dessutom i närbild där inget sammanhang syntes.

**Ändring:** Rad 14: spaden ligger kvar på `[SP_BAK, 34]` hela raden; kvar är tindraljudet och skimret som markerar fyndet på "där". Rad 15 fyller nu hinken från `SP_BAK` (var `SP_FRAM`), så handlingen fortsätter där spaden faktiskt ligger; efter fyllningen ställs den på `SP_FRAM` som förut. `fylla()` fick parametern `hemV` (vilanvinkel i hemmet) så att rad 15 kan börja i 34° utan hopp – raderna 10/11 är opåverkade (standard 6°).

**Varför:** Hitta-momentet behöver ingen förflyttning – skimmer + "Ja, där! Bakom hinken!" räcker. Att spaden sedan rör sig under själva skopandet är scenens etablerade logik (den skopar "själv" även i raderna 3, 10, 11, som inte fått anmärkning).

**Kontrollerat:** 127, 129, 131 (rad 14): spaden ligger still bakom hinken, skimrar bara. 133 (rad 15, tl 0,9): spaden häller redan sand i hinken medan hon går tillbaka – mjukt övergang från 34°, inget ryck. 137: tredje kakan klar, spaden står på `SP_FRAM` precis som i slutläget före ändringen.

**Att notera:** Storyboardtexten i `storyboard/rader.mjs` rad 14 ("Skaftet skimrar tydligt och spaden glider fram på 'där'") stämmer inte längre med scenen. Jag fick bara röra scenfilen – uppdatera gärna den raden i rader.mjs.

## 3. "place white seashell in bg to the left"

**Orsak:** Den vita snäckan låg stor (143 px) i förgrunden till höger (`[1565, 1004]`, lagret `kakor`) och konkurrerade med handlingen.

**Ändring:** `SNACKA_VIT_POS = [400, 864]`, skala 0,2 → 0,13 (ca 93 px), från lagret `kakor` till `bak` (bakom figurerna), skuggan förminskad i samma mån. Närbildskameran i rad 17a följde med: `K_SNACKA = [2.4, 1565, 900]` → `[2.4, 400, 830]`.

**Varför:** Som bakgrundsdetalj till vänster balanserar den sandslottet till höger utan att störa. Närbilden i början av 17a är kvar som ett lugnt beat och visar snäckan tydligt en kort stund (den klagades tidigare på som osynlig).

**Kontrollerat:** 148.5 (17a-närbild): snäckan stor och tydlig mitt i bild medan hon passerar bakom. 155 (17b helbild): snäckan syns som en liten detalj i bakgrunden till vänster. 121/129: ligger diskret vid vänsterkanten i vid bild.

## 4. 3:38 – "improve the fitting of leo i badring"

**Orsak:** Ringen satt för lågt. `RING_MIDJA = 130` placerade ringens mitt 130 px över fötterna, under magen: hennes mage slutade ovanför hålet och vattenytan (`BAD_DJUP` 115) ritades framför kroppen, så en blå vattenremsa syntes mellan kroppen och ringen. Hon såg ut att stå bakom ringen i stället för att sitta i den.

**Ändring:** `RING_MIDJA = 158`. Hålets överkant når nu upp över magens nederkant, så ringens främre halva ligger an mot midjan och vattenremsan försvinner. Samma konstant styr lyftet i rad 18f (`lerp(4, RING_MIDJA, upp)`) och badraderna 18b–21, så passformen följer med överallt. Ringens storlek (`RIK`) och armarna (`RINGARM`) är orörda.

**Varför:** Med ringen i midjan läses hon som sittande i ringen; guppandet (`gy`) räknas ur hennes position så ringen och hon rör sig fortfarande ihop.

**Kontrollerat:** 202 (18f): hon kliver i ringen, benen syns i hålet – rätt. 208 (vadning), 216–217 (gupp/plask), 211 (plasknärbild K_BADNARA): ringen ligger an mot midjan, ingen vattenremsa, armarna vilar på ringen. 222 (rad 19-närbild på hinken): bara en liten blå glipa kvar i hålets nederkant i extrem närbild – naturligt, hon flyter ju i vatten. 229 (rad 20): oförändrat bra.

## Osäkerheter / kvarstående

- Punkt 1: jag valde att dölja bladet men lämna skaftet synligt. Om Sanna menade att nästan inget ska synas alls kan `SP_BAK` sänkas ytterligare (mot +20) – men då försvinner hittbarheten i gissningsleken.
- Punkt 3: närbilden i 17a är kvar men riktad om. Om "in bg" betydde att snäckan inte förtjänar en egen närbild längre kan `kam: tl < 1.4 ? K_SNACKA : K_HEL` tas bort – då försvinner det lugna beatet i gången ner till vattnet.
- Punkt 4: vid RING_MIDJA 158 syns en minimal blå glipa i hålets nederkant i de skarpaste närbilderna. Att höja ytterligare (mot 165) skulle troligen ta bort den men flytta ringen närmare bröstet – jag provade inte det, utan valde midjan. Siffran är lätt att justera om Sanna vill se skillnaden.

## Tid

Ca 20 minuter (läsning av brief/AGENTS/skills, fyre renderingar av stillbilder, fyra ändringar, visuell kontroll, rapport).
