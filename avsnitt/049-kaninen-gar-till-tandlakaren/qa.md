# 049 Kaninen går till tandläkaren – QA (grind 6, 2026-11-21)

Djup QA av kodscenen (`scener/mottagningen/`) efter feedback 1 (commit `22b80386`: tvådelad stol, riggarmen håller verktygen, tandläkaren 70 px närmare). Två stillbilder per rad (start och slut), alltså bilden på båda sidor om varje klipp, plus kontroll i kod av rader, röster och effekter.

## Ljud och tider (kontroll i kod)

- Alla röstfiler och effekter finns. Ingen replik går ut över sin rad, inga repliker överlappar och alla repliker används.
- Frågorna till barnet har 4–5 s paus. Före *"Tack!"* är pausen 2,5 s.
- Inga djurnamn i det som sägs. Tandläkaren säger bara `doktor-*`-ljud.

## Bild – hittat och rättat

| Rad | Fel | Rättning |
|---|---|---|
| Tandläkarens huvud | En liten mörk prick och vita nypor vid hakan (lösa pixlar längst ner i huvudurklippet) | Pixlarna under hakan som inte är hud är borttagna i `doktorn-b-head-nk.png` |
| Tandläkarens huvud | Vid riktningen (23b, frågetecknet) förskjuts hela huvudet 36 px, så att det ser påklistrat ut | Huvudet flyttas 24 px och ansiktet glider 12 px till inuti håret, så att det läses som en vändning (`uttryck.html`) |
| 16a | Spegeln och kritan ritades över tandläkarens ansikte (hon står närmare nu) | Spegeln ritas på den tomma väggen till höger om henne, och kritan väntar där |
| 31a, 31b | Tanden och kritan ritades över tandläkarens rock | Tanden ritas till vänster om kaninen, vid örat. Kritan kommer in, väntar och går ut åt vänster |
| 13 | Lampan såg avskuren ut i första QA:n | Med den nya stolen syns hela lampan och skenet landar på kaninen. Ingen ändring |

## Kvar att titta på i rörelse

- Huvudets nya vändning (23b, 25b) i full fart.
- Tanden som flyger från luften till magen (31b → 32) går nu från vänster.

## Feedback 2 (2026-11-21)

- 1:31 Stolen är 88 % stor, så sätet sitter ca 50 px lägre från början och kaninen hamnar inte så högt när stolen åker upp. Kolven skalas med.
- Tandläkarens tandborste är röd (`RODBORSTE`) och sitter djupt i fickan, bara huvudet och en bit skaft syns. Kaninens egen tandborste i tankebubblan är mint.
- 3:17 Bubblorna: först tandläkarens pratbubbla med frågan (godis ?, tandborste sol måne ?) i 25b och 25d, sedan kaninens tankebubbla med svaret i 25c och 25e (halvbild så att molnet får plats över stolsryggen). Vit kant, mörk kritlinje, poppar fram med liten översväng, tankeprickarna en i taget, gungar lugnt och krymper bort.

## Feedback 3 (2026-11-22)

- 0:09 Tandborsten är omritad: rundat skaft med greppfläck och glans, smal hals, borsttuss med rundad ljusblå topp. Ritintrots teckning är mindre (skala 3,8 → 2,9). Samma form överallt (tandläkarens röda, bubblorna).
- 1:46 Lampan (huvudet och armen) ritas en gång till framför figurerna (`#stollampa`), så att kaninens öra går bakom den.
- 2:03 Kaninen är lite mindre (0,55 → 0,5), elefanten med (200 → 185).
- 2:26 De påklistrade tänderna är borta. Det är riggens egna tänder i gapet: de går från matta till blanka två och två (20, 25) och riggens glansstjärna tänds i 21.
- 3:29 Bubblorna i kritstil: krämvit yta med kritkorn, mjuk skugga, vit kant och mörk kritlinje. Bubblan poppar med en liten gummistuds, sakerna poppar in en i taget och gungar, molnets bucklor andas. Större innehåll som klistermärken: randigt godis, sol och måne med små ansikten, den nya tandborsten. Båda bubblorna ligger lite lägre så att de inte nuddar bildens överkant.

## Feedback 4 (2026-11-22)

- 1:34 Fler reaktioner i 13: kaninen tittar upp mot lampan med öronen upp, gör ett litet hoppande "oj" på klicket och blir sedan glad. Tandläkaren vänder sig mot kaninen (rikt −0,8, blicken åt vänster) och nickar efter klicket, också i 14 och 15. I 14 tittar kaninen ner på elefanten och fnissar.
- 1:36 Ljuset utgår nu från glödlampan (`STOL.lampa` [282, 98], var [220, 115] utanför skärmen). Lampan blinkar till på klicket och tänds med en liten överglans, andas sedan lugnt. Skenet är smalt vid lampan, mjukt i kanterna, starkast vid lampan, och lägger en ljusfläck på kaninens ansikte (13, 15) och elefanten (14). Kameran i 13 har samma utsnitt som förut.
- 3:26 Bubblorna: pipen utgår från ovalens kant och är 90 px lång och lätt böjd, så att den syns. Sakerna i bubblorna har en tunn mörk kant och en liten skugga (den vita kanten syntes inte mot den krämvita ytan). Kaninens tandborste i bubblorna är en mörkare mint (`BUBBBORSTE`) och lite större.

## Putsning med riggarnas nya lärdomar (2026-11-25)

- Kaninens vinkning (1, 37, 38) går genom riggens `ARMROR.vinka` (skärmvinklar ur riggens mått). Förut +150 i posens tal, som gömde armen bakom huvudet så att vinkningen knappt syntes.
- Tandläkarens armar hänger intill sidorna i vila (3D-lärdomen "som en fågelskrämma"): uttryckets armlyft (glad 16, skrattar 30) tas bort när posen inte lyfter armen. Vinkning, räckning, klapp och verktyg är som förut.
- Skutten (10, 26) har viktflytt: kroppen trycks ihop lite före avfärd och vid landning. Täta bilder (6/s) visar att kaninen inte går genom stolen.
- 35: kaninen bugar på "Tack, tandläkaren!" (`STUNDER.tack`) i stället för bara en nick.

## Feedback 5 (2026-11-25)

- 0:40 Kameran glider in på stolen och kaninen när Malin säger *"stor stol"* (1,4 s, från slutet av repliken) och står kvar under *"tandläkarstolen"*. Kameran kan nu glida mellan två utsnitt (`kam` → `kam2` med `kk`), inte bara klippa.
- 0:56 Inget hopp mellan 4, 5 och 6a: samma utsnitt (`kanin`) hela vägen, och kaninen står kvar där den backade (`BAK`, förut flyttade den sig 60 px i klippet till 6a). Den osäkra minen blir nyfiken när kritan kommer, och i 6b tar kaninen ett litet glatt skutt fram till elefanten.
- 2:56 Den röda tandborsten är större i fickan (0,42 → 0,52), och i 23c glider kameran ner till fickan strax efter frågan (förut ett klipp de sista 2 s), så att den syns länge innan glittret.
- 4:02 Replik 44 är ny: *"Elefanten får också en!"* [giggles] (förut *"Och en till elefanten!"*, som lät som "en till"). ElevenLabs v3, Malin – Professional Swedish Narration, Natural (0,5), tagning 1 av 2, rådata i `produktion/ljud-original/049/malin-elefanten-ocksa-*.mp3`, −3 dBFS i `44-elefanten-far-ocksa-en.m4a`. Den gamla filen ligger kvar tills Sanna godkänt.

## Feedback 6 (2026-11-25)

- 0:39 Malin säger *"Du ska få sitta i den här tandläkarstolen …"* innan kaninen blir nervös. I 4 tittar kaninen nyfiket upp på stolen medan Malin säger 7 och 51; 0,3 s efter repliken blir minen orolig, kaninen backar, skakar på huvudet och öronen faller, och det trumpna ljudet kommer 1,1 s efter repliken. Rad 4 är 0,4 s längre (12,6 s). Repliken 51 börjar 0,4 s efter 7 (förut 2 s).

## Slutrendering (2026-11-25)

- Förhandsvisning 5 godkänd. Slutrenderad med `verktyg/render-delat.mjs` (1920×1080, 30 fps, 8309 bildrutor) och mastrad med `film/satt-ihop.sh` (som 046) → `film/avsnitt-049.mp4`, 4:37, −13,8 LUFS, topp −1,3 dBFS.
- `qa-film.sh`: inget fryst eller tyst, boil 2,6 px/s (gräns 4,5), rösterna rena. Svart 275,6–277 s är outrots iris. `krita kod` flaggar egen krita, men regeln gäller från 052 och förhandsvisning 5 godkändes med den här kritan, så den är kvar.

## Feedback 7 (2026-11-26)

- 1:49 Musiken är lägre: slingan 0,075 → 0,05 (−3,5 dB mot Malin, i pauserna ca 4 dB lägre i den mastrade filmen).
- 2:15 *"Kan du också gapa?"* klipptes mitt i "gapa": tagningen var delad på fel ställe, så att 22 slutade på "ga-" och 23 (*"Aaa!"*) bara var "pa!". Båda är omklippta ur `malin-tagning.mp3` (22: 58,60–59,84 s, 23: 59,98–60,84 s, −3 dBFS), de gamla ligger i `scener/mottagningen/aldre/*-forra.m4a`. Pausen före *"Aaa!"* är 4 s igen, så rad 19 är 0,94 s längre.
- `film/satt-ihop.sh --snabb` skriver `film/avsnitt-049-snabb.mp4`, så att den godkända slutfilmen ligger kvar. Förhandsvisning (`--snabb`) renderad, `qa-film.sh` utan anmärkning (utom den kända `krita kod`).
