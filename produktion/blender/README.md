# Blender-provet: Lilla Kritan i 3D

Två prov från 2026-11-12 av samma 4,5 sekunder ur avsnitt 030 (katten går in i badrummet, 0:15.6–0:20.1), i Blender 5.3.
Sanna vill ha en putsad 3D-version av tandborstfilmen med djuren och hela badrummet i 3D. Figurerna behöver inte kopieras exakt.

- **v2 (det här dokumentets första del):** katten är en riktig modell med armatur och filtludd, rummet är modellerat, allt renderas med Cycles.
- **v1 (längre ner):** 2D-urklippen uppblåsta till former. Ligger kvar orörd som jämförelse.

## v2: modellerad katt, riggad, i ett modellerat badrum

Allt byggs i kod, inget ritas eller modelleras för hand och inga bilder ur 2D-scenen används. Ett kommando bygger om allt:

```
bash produktion/blender/bygg3d.sh [ut-mapp för bildrutorna]
```

Det renderar 135 bildrutor (1920 × 1080) till ut-mappen (standard `/tmp/blender-3d-katt-v2`), lägger på ljudet ur `blender-3d-katt.mp4` och skriver
`avsnitt/030-…/provbild/blender-3d-katt-v2.mp4` och `…-v2-sida-vid-sida.mp4` (v1 till vänster, v2 till höger). Båda är 4,5 s (135 rutor, 30 bilder per sekund). En avbruten körning fortsätter där den slutade.

Blender 5.3 behövs, antingen programmet (`BLENDER=/sökväg`, `blender` i PATH eller Blender.app på Mac) eller Python-modulen (`pip install bpy`, sedan `PYTHON=/sökväg/till/python`). Provet renderades med Python-modulen i en molnsession utan grafikkort.

Bara vissa bildrutor, mindre bild eller en fil att öppna i Blender:

```
blender -b -P produktion/blender/bygg3d.py -- <ut-mapp> [--skala 50] [--rutor 1,60,120 | 1-45] [--prov 16] [--har 0.25] [--gpu] [--utsnitt 0,0.1,0.8,0.8] [--spara] [--om]
```

`--prov` = strålar per bildpunkt (16 räcker med det enkla luddet; provklippet gjordes med 32), `--utsnitt x0,y0,x1,y1` = bara en del av bilden (andelar, y nerifrån) för snabba materialprov, `--har` = luddets täthet (0 = inget ludd, för snabba rörelseprov), `--spara` = skriver `<ut-mapp>/scen.blend` med rörelsen som nyckelbilder, `--om` = renderar om rutor som redan finns. `--rutor 1-45` gör att rutorna kan delas på flera maskiner. `--gpu` renderar på grafikkortet om det finns ett (inte provat: molnsessionen har inget).

### Skripten

- `katt3d.py`: katten. Äggkropp, öron med rosa insida, armar med gräddvita tassar, ben med fötter och en böjd svans med gräddvit tipp, som rundade former. Ansiktet sitter på kroppens yta: gräddvita ögonlappar, blanka ögon, rosa nos, mun och rosa kinder. Armaturen och filtmaterialet. Måtten står överst.
- `rorelse3d.py`: rörelsen, som nyckelbilder på armaturen. Tiderna står överst (`STOPP`, `STEG`, `VRID`).
- `badrum3d.py`: rummet, ljuset och kameran. Måtten är 2D-scenens skärmpixlar, så sakerna står där de står i helbilden.
- `bygg3d.py` sätter ihop och renderar, `bygg3d.sh` gör också filmen.

### Katten

- **Filtytan är ett matt material med sammetsglans plus ett enkelt ludd av hårpartiklar** (ca 107 000 korta raka strån, 5 px, inga barnstrån). Varje strå lyses som ytan det sitter på (stråets riktning används som ytans normal), så luddet smälter ihop med kroppen och syns bara som en mjuk kant. Bara material ger en hård kontur; geometri för varje fiber är för tungt. Stråna kastar ingen skugga. Reglagen står överst i `katt3d.py` (`HAR_LANGD`, `HAR_TJOCK`, `HAR_ANTAL`, `SPRETIGT`, `SAMMET`).
  Första försöket (i provklippet `blender-3d-katt-v2.mp4`) hade 520 000 trassliga strån med egen ljussättning: pälsen blev knottrig och kornet ändrades med renderingens brus.
- **Armaturen:** `hofter` (hela kroppen: läge, vridning, lutning, tryck ihop/sträck) och `brost` (överkroppen böjer sig i magen), `overarm`/`underarm`/`tass` per arm, `lar`/`vad`/`fot` per ben med IK mot `fot_ik` (foten står kvar på golvet medan kroppen rör sig), `ora`/`ora2` per öra, `oga` per öga och nio ben i svansen. `.V` och `.H` är vänster och höger i bild.
- **Ansiktet:** benen `oga.V`/`oga.H` flyttas för blicken och krymps när ögat stängs. Formnyckeln `stangd` på ögonlapparna drar ihop lappen till en glad båge (blink och glada ögon). Munnen har `leende` och `oppen`; öppen mun har tänder upptill och tunga nertill.
- `katt3d.stall(…)` ställer ett ben som en ändring i armaturens egna axlar (x höger, y bakåt, z upp), så rörelsen går att skriva utan att tänka på benens egna axlar.

### Rörelsen

Tiderna följer 2D-scenen (`prov-030-katt/figur/delar.json`): hon går till ungefär ruta 90, blir glad vid 95–100 och vinkar från 108. I 3D går hon vriden 50° åt gångriktningen och vänder sig mot kameran när hon kommer fram. Fötterna står stilla på golvet under varje steg (13 rutor per steg), kroppen gungar lite och lutar sig över stödbenet, armarna pendlar mot benen, vinkningen börjar i axeln med en liten sats och underarmen och tassen viftar med eftersläp, öronen och svansen följer med fjädrar. Svansen svänger ner och ut när hon vinkar, så att tassen syns fri.

Avvikelse från 2D: hon börjar ungefär 17 cm längre in i bilden (mitten på x ≈ 160 px i stället för −6). De korta benen hade annars behövt springa för att hinna fram i tid.

### Rummet

Handfatet är en svarvad skål med kant, botten och avlopp, med en böjd kran och två röda vred, på pallen. Tandkrämstuben står på kanten. Sidobordet med muggen och tre tandborstar, väggskåpet med luckor och hylla, fisktavlan, handduken på sin knopp, ankan, kaklad vägg, kaklat golv och golvlist. Nyckelljus snett uppifrån vänster (varmt), fyllnadsljus från höger (svalt), ett svagt toppljus och lite ljus från hela rummet. Skärpan ligger på kattens ansikte (bländare 2,2), väggen är lite mjuk.

Kameran står högre än i v1 (70 cm i stället för 45) och bilden är förskjuten neråt, så att man ser ner i skålen och mer av golvet. Handfatet ligger på samma plats i bilden som i v1.

### Renderingstid

På fyra processorkärnor utan grafikkort, 1920 × 1080, Cycles med brusrensning:

- **Med det enkla luddet: 47 sekunder per bildruta** med 16 strålar per bildpunkt (mätt på ruta 120), alltså ca 1 timme och 45 minuter för de 135 rutorna. Med 32 strålar tar rutan 84 sekunder och ser nästan likadan ut.
- **Provklippet** (första luddet, 32 strålar): i snitt 81 sekunder per ruta (77–88), 3 timmar och 2 minuter.
- Luddet i sig kostar nästan ingenting. Tiden går till mjukt ljus och skärpedjup i full bild, så det som gör renderingen snabbare är färre strålar, och det enkla luddet tål det.
- Ett rörelseprov (`--skala 34 --prov 12 --har 0.25`) tar 5 sekunder per ruta. Rummet står helt still mellan rutorna (samma brus i varje ruta).

### Kvar att göra (v2)

- **Provklippet är inte omrenderat** med det enkla luddet: `blender-3d-katt-v2.mp4` visar det första, knottriga luddet. Kör `bash produktion/blender/bygg3d.sh` för ett nytt klipp (ca 1 h 45 min på en maskin som molnsessionens).
- **Det enkla luddet är provat på stillbilder** (ruta 14 och 120), inte i rörelse.
- **Kranen är liten** och låg, för att inte skymma kattens mun. Kattens ansikte hamnar lägre mot handfatet än i 2D.
- **Vinkarmen är kort.** Vinkningen syns, men armarna är stubbar som i förlagan. Längre armar är ett mått överst i `katt3d.py` (`ARM`).
- **Munnen** är ett band på ytan, inte en riktig munhåla. Tänderna finns, men för borstningen behövs en mun som borsten kan gå in i.
- **Fötterna** har ingen tårullning, och benen sträcks upp till 8 % i de längsta stegen.
- **Kaninen och pandan**, det som rör sig i rummet (borstarna, tuben, skummet) och klippen (ansikte, mun) finns inte i 3D än.
- **Renderingstiden** för ett helt avsnitt (ca 5 200 rutor) är över 100 timmar på den här sortens maskin. Dela rutorna på flera maskiner (`--rutor`) eller rendera med grafikkort.
- `prov-030-katt/scen-v2.blend` är v2-scenen med rörelsen som nyckelbilder (skriven med `--spara`); `scen.blend` är v1.

---

## v1: urklippen som former

### Så fungerar det

Inget ritas eller modelleras för hand. Allt görs ur det som redan finns i avsnittets kodscen:

1. **Rummets bilder** tas ur scenen med `?lager=` (`scener/badet/index.html`) och `render.mjs --lager`: plattan, väggsakerna, bordet, handfatet och ankan, var för sig på genomskinlig botten.
2. **Figuren** tas ut med `figur.mjs`: varje del som egen bild, delens läge i varje bildruta (riggens rörelse) och ansiktet som bildföljd.
3. **`bygg.py`** blåser upp varje urklipp till en form (figuren rund som en kudde, sakerna som skivor med rundad kant), ställer dem på riktiga djup i rummet, lägger ansiktet på kroppen, sätter ljus och kamera och renderar.

```
cd avsnitt/030-borsta-borsta-gulliga-djur/scener
for l in platta vagg anka bakom kar,pafat; do node render.mjs badet --lager $l --fran 15.6 --till 15.64 --ut ../../../produktion/blender/prov-030-katt/lager/${l%%,*}; done
cd ../../..
node produktion/blender/figur.mjs produktion/blender/prov-030-katt/figur 15.6 20.1
/Applications/Blender.app/Contents/MacOS/Blender -b -P produktion/blender/bygg.py -- produktion/blender/prov-030-katt/lager produktion/blender/prov-030-katt/figur <ut-mapp> [--skala 50] [--rutor 30,110] [--spara]
```

Bildrutorna (`<ut-mapp>/NNNN.jpg`) sätts ihop med ffmpeg. 135 bildrutor tar ca 2 minuter i tre delar (`--rutor 1,2,…`) på den här datorn.

### Var allt ligger

- `bygg.py`, `figur.mjs`: skripten. Alla reglage står överst i `bygg.py` (djup, ljus, skuggton, skärpedjup, kamerans glidning, hur slät figuren är).
- `prov-030-katt/`: provets data (lager, figur) och `scen.blend`, som går att öppna i Blender. Figuren står still där: lägena sätts vid rendering.
- `avsnitt/030-…/provbild/blender-3d-katt.mp4` och `…-sida-vid-sida.mp4`: resultatet. `blender-prov*.mp4` är det första provet (platta urklipp i ett rum med djup).

### Kvar att göra för ett helt avsnitt (skrivet för v1)

- Kaninen och pandan (samma väg: `figur.mjs` tar i dag figuren som står i `#figurer`).
- Det som rör sig i rummet (borstarna, tuben, skummet, borsten i handen) som egna delar; i provet står rummet still.
- Klippen (helbild, ansikte, mun) i Blenders kamera; provet har bara helbilden.
- Handfatet är en skiva, inte en skål. En riktig skål, kran och ett rum med sidoväggar när utsnitten kräver det.
- Kattens kropp har kvar ritade kritstreck i glansen; en egen slät textur blir renare.
