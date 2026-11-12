# Blender-provet: Lilla Kritan i 3D

Ett prov från 2026-11-12: 4,5 sekunder ur avsnitt 030 (katten går in i badrummet, 0:15.6–0:20.1) som riktig 3D i Blender 5.3.
Sanna vill ha en putsad 3D-version av tandborstfilmen med djuren och hela badrummet i 3D. Figurerna behöver inte kopieras exakt.

## Så fungerar det

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

## Var allt ligger

- `bygg.py`, `figur.mjs`: skripten. Alla reglage står överst i `bygg.py` (djup, ljus, skuggton, skärpedjup, kamerans glidning, hur slät figuren är).
- `prov-030-katt/`: provets data (lager, figur) och `scen.blend`, som går att öppna i Blender. Figuren står still där: lägena sätts vid rendering.
- `avsnitt/030-…/provbild/blender-3d-katt.mp4` och `…-sida-vid-sida.mp4`: resultatet. `blender-prov*.mp4` är det första provet (platta urklipp i ett rum med djup).

## Kvar att göra för ett helt avsnitt

- Kaninen och pandan (samma väg: `figur.mjs` tar i dag figuren som står i `#figurer`).
- Det som rör sig i rummet (borstarna, tuben, skummet, borsten i handen) som egna delar; i provet står rummet still.
- Klippen (helbild, ansikte, mun) i Blenders kamera; provet har bara helbilden.
- Handfatet är en skiva, inte en skål. En riktig skål, kran och ett rum med sidoväggar när utsnitten kräver det.
- Kattens kropp har kvar ritade kritstreck i glansen; en egen slät textur blir renare.
