# Kiosken (storyboard 10–14e)

Avsnittstid 1:59.0–2:23.3, sångtid 1:48.0–2:12.3 (24,3 s). Tiderna läses ur `bygg.py` (`M.bild`); orden som rörelserna landar på (mums, plupp, kväk, hurra) är uppmätta i leadstämmans ljudstyrka (`stammor/vocals.wav`) och står som sångtid överst i `index.html`.

```bash
node render.mjs kiosken                 # → kiosken/kiosken.mp4 + kiosken-effekter.wav
node render.mjs kiosken 0.3 1.7 4.55    # stillbilder
```

`stills/jamforelse-1.jpg` och `-2.jpg`: storyboardbilden till vänster, scenen på bildens mitt till höger.

| Bild | Vad händer |
|---|---|
| 10–11 | En bild (molnen över skarven lägger `film/satt-ihop.sh`). Bilen kör in från vänster (brum), bromsar in vid 1,5 s (hjul-gnissel) och gungar till, medan grodan vinkar. Musen släpper ratten, sträcker upp armarna, hukar och hoppar ur bilen (boing) och landar vid disken (duns) vid 2,65 s. |
| 11a | Musen står vid disken och pekar upp på den stora struten. Kameran glider upp 190 px (`kiosk-topp`) tills kulan syns hel, och sedan ner och in till tvåbilden (`TVA`). Hon skrattar på "Glassen är rosa". |
| 11b | Närbild av den stående musen (från tvåbilden på 0,35 s): tuggansiktet på varje "mums". Bilden står 0,5 s längre än i storyboarden. |
| 11d | Närbild grodan över musens axel (1,5 s; kameran glider in från musens närbild och ut till tvåbilden, 0,45 s var, inga hårda klipp): "Hej, grodan!" (musen i bildkanten), kvak och hopp på "Kväk!", glassarna hoppar till en i taget (pop). |
| 11e | Tvåbilden. Musen pekar på den rosa (den hoppar till, ding), munnen rör sig på "Rosa, tack!". |
| 12 | Grodan tar den rosa och sträcker armen över disken (som i 13d) till musens tass ("Varsågod!", kiosk-pling). Tassarna möts en halv sekund, hon tar den (pling), "Tack!", och håller upp den. |
| 12a | Hon håller upp glassen och gungar på slagen, och tar den till munnen (mums). |
| 13a | Tvåbild. Tuggar, armen ut, kulan vickar, glider av och faller i 0,55 s, plattas till i golvet på "plupp" (kritklicken ligger kvar). Hon håller upp den tomma struten, båda tittar ner. |
| 13d | Håller fram struten framför disken; grodan hämtar två kulor bakom disken, armen går upp över kanten och ner framför disken till struten. En kula per "kväk" (pling ×2), studsar på den tredje. |
| 14c | Håller stolt upp glassberget och studsar på slagen. |
| 14d | En tugga per "mums" (tuggansiktet), glassen krymper: två kulor → en → struten. Grodan hoppar med armarna upp på varje slag. |
| 14e | Sista biten av struten i munnen (mums), sedan armarna upp med grodan på "hurra" (jubel). På andra "hurra" hoppar hon in i bilen igen (boing, duns) och kameran drar sig ut, så att discot börjar med henne i bilen. |

## Ljud
brum, hjul-gnissel, boing (×2, vol 0,45), duns (×2, låg), kiosk-pling (×2), kvak (×2), pop (×3), ding, pling (×3), plupp (`plupp-2`), mums (×5), jubel. Alla finns i `assets/ljud/effekter/`.

Plupp-tagningarna börjar med 0,6–1,6 s tystnad, så `plupp-2` läggs 0,73 s före landningen.

Replikerna i luckan ("Hej, grodan!", "Kväk! Vilken glass vill du ha?", "Rosa, tack!", "Varsågod!", "Tack!") är inte inspelade: bara munnarna rör sig (`kit.prat`), fördelade i luckan 1:56.0–2:02.6.

## Efter granskningen (2026-11-04)
- **En platta i full färg** (`kiosk-ra.png`) hela scenen, så att markisen och den stora struten aldrig byter färg. `kiosk.png` (den blekta) används inte. `kiosk-topp.png` ligger kvar för kameran i 11a.
- **Krita på allt som ritas i kod:** tuggansiktet (kinderna, nosen, munnen) går genom `#krita-f` (vingligt drag och papperskorn, som `#backkorn` i `kit.backar()`), och skuggan har `#kritkant`.
- **Tuggansiktet** (Sanna valde det före tungan): `mums()` i `index.html` ritar glada ögon, kinder som pöser och en ω-mun som tuggar, över musens ansikte efter `pose`. Det används i 11b, 13a, 14d och 14e. När `ansikten.js` får humöret `mums` byts det bara i `mums()`.
- **Musens glass när hon står** (12a–14e) är en egen bild framför henne, 1,3 gånger bilen.js-glassen, med tassen nära strutens spets. Då syns den tomma struten.
- **Grodans arm** ritas en gång till framför disken (`armForan()`), när han räcker över den (12, 13d). I 13d sträcks armen 1,25 gånger, så att den når ner till struten.

## Avvikelser från storyboarden
- Musen hoppar ur bilen redan i 11 (inte i 12a) och står vid disken från 11a; 11e–12a är tvåbilden. Hon hoppar in i bilen igen i slutet av 14e.
- 13d: musen håller struten framför disken, inte ut åt höger.
- 14d: glassen krymper för varje slick (storyboarden visar glassberget hela bilden), så att "sista biten" i 14e hänger ihop.
- Den tomma struten klipps under kulan, eftersom `lager/strut.png` har kvar kulans vita kant. Den fallande kulan är glassbilden klippt ovanför struten.
- 10 och 11 är en enda bild, utan kritsvep (bild 10 är bara 0,6 s); molnen över skarven lägger `film/satt-ihop.sh`.

## Efter granskning 2 (2026-11-05)
- **Musen kliver ur bilen** när den stannat (1,95 s, Sannas "runt 2:01") och står vid disken hela luckan. Hon får glassen där, och hoppar in i bilen igen på andra "hurra", så att discot börjar med henne i bilen. Hon är `bilen.musen` (samma mus på egna ben som i `refrang.glassberg`), och bytet mot musen i bilen sker på en bildruta där båda står likadant (ingen övertoning, aldrig två möss). Bilen stannar vid `TOM_X`, så att hjulet inte hamnar under hennes fötter.
- Grodan vinkar (och sträcker på sig) när bilen kör in. 11a slutar i tvåbilden i stället för helbilden.
- 11b står 0,5 s längre, och klippet till grodans närbild kommer senare.
- Små ljud i luckan, där replikerna saknar röst: pop när glassarna hoppar, ding när den rosa hoppar, kvak, och kiosk-pling när grodan lutar sig ut.
- Kulan syns falla i 0,55 s, och plupp landar på smällen (plupp-tagningarna börjar med 0,6–1,6 s tystnad).
- Den stora struten på taket står nu rakt (ny målning av `glasskiosken.png`, plattorna gjorda om med `gor-lager.py`); `kiosk-topp` passar mot markisen i 11a.
- Inga rörelse- eller ljudstreck (Sanna, 2026-11-05: de små strecken gjorde inget för bilden). Kulan som faller är kvar.
