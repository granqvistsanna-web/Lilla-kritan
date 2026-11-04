# Kiosken (storyboard 10–14e)

Avsnittstid 1:59.0–2:23.3, sångtid 1:48.0–2:12.3 (24,3 s). Tiderna läses ur `bygg.py` (`M.bild`); orden som rörelserna landar på (mums, plupp, kväk, hurra) är uppmätta i leadstämmans ljudstyrka (`stammor/vocals.wav`) och står som sångtid överst i `index.html`.

```bash
node render.mjs kiosken                 # → kiosken/kiosken.mp4 + kiosken-effekter.wav
node render.mjs kiosken 0.3 1.7 4.55    # stillbilder
```

`stills/jamforelse-1.jpg` och `-2.jpg`: storyboardbilden till vänster, scenen på bildens mitt till höger.

| Bild | Vad händer |
|---|---|
| 10–11 | En bild. De rosa molnen som täcker slutet av 09 drar sig undan från kiosken på 1 s (`ref.moln`, swoosh), medan bilen kör in från vänster (brum), bromsar in vid kiosken (hjul-gnissel) och gungar till. Grodan följer den med blicken och vinkar. |
| 11a | Musen pekar upp på den stora struten, kameran glider upp 190 px (`kiosk-topp`) tills kulan syns hel, och sedan ner och in mot grodan och musen (`NARA`, zoom 1,45) före 11b. Skrattar på "Glassen är rosa". |
| 11b | Kameran åker in från 11a:s utsnitt på 0,35 s. Närbilden står 0,5 s längre än i storyboarden (klippet till 11d senare). Tuggansiktet, gungar och små streck på varje "mums". |
| 11d | Närbild grodan (1,5 s, replikerna tätare), tre glassar (rosa, grön, gul). Kiosk-pling, "Hej, grodan!" (musen utanför bild), kvak + litet hopp på "Kväk!", glassarna hoppar till en i taget på "Vilken glass vill du ha?" och grodan tittar på dem. |
| 11e | Närmare utsnitt av luckan (musen i bilen, grodan, glassarna). Musen pekar på den rosa (den hoppar till), munnen rör sig på "Rosa, tack!". |
| 12 | Samma utsnitt. Grodan lyfter den rosa och räcker den över disken ("Varsågod!"), musens tass möter den och de håller den en halv sekund, sedan går den över till hennes tass (pling, vita streck), "Tack!", hon håller upp den. |
| 12a | Hukar, hoppar ur bilen (boing) i en båge och landar vid disken; den tomma bilen rullar bakåt när hon tar sats. Kameran glider från luckans utsnitt ut till tvåbilden. |
| 13a | Tvåbild. Tuggar, armen ut, kulan vickar, glider av och faller i 0,5 s, plattas till i golvet på "plupp" (kritklicken ligger kvar). Hon håller upp den tomma struten, båda tittar ner. |
| 13d | Håller fram struten framför disken; grodan hämtar två kulor bakom disken, armen går upp över kanten och ner framför disken till struten. En kula per "kväk" (pling ×2), studsar på den tredje. Munnen stängd, öppen bara på "kväk". |
| 14c | Håller stolt upp glassberget och studsar på slagen. |
| 14d | En tugga per "mums" (tuggansiktet) (mums ×3, tyst), glassen krymper: två kulor → en → struten. Grodan hoppar med armarna upp på varje slag. |
| 14e | Sista biten av struten i munnen (mums), sedan armarna upp med grodan på "hurra" (jubel). De står stilla i hurra-posen de sista 0,7 s. |

## Ljud
swoosh, brum, hjul-gnissel, kiosk-pling (×2), kvak (×2), pop (×3), ding, pling (×3), boing (vol 0,6), plupp (`plupp-2`), mums (×4), jubel. Alla finns i `assets/ljud/effekter/`.

Plupp-tagningarna börjar med 0,6–1,6 s tystnad, så `plupp-2` läggs 0,73 s före landningen.

Replikerna i luckan ("Hej, grodan!", "Kväk! Vilken glass vill du ha?", "Rosa, tack!", "Varsågod!", "Tack!") är inte inspelade: bara munnarna rör sig (`kit.prat`), fördelade i luckan 1:56.0–2:02.6.

## Efter granskningen (2026-11-04)
- **En platta i full färg** (`kiosk-ra.png`) hela scenen, så att markisen och den stora struten aldrig byter färg. `kiosk.png` (den blekta) används inte. `kiosk-topp.png` ligger kvar för kameran i 11a.
- **Krita på allt som ritas i kod:** strecken och tuggansiktet (kinderna, nosen, munnen) går genom `#krita-s` och `#krita-f` (vingligt drag och papperskorn, som `#backkorn` i `kit.backar()`), och skuggan har `#kritkant`.
- **Tuggansiktet** (Sanna valde det före tungan): `mums()` i `index.html` ritar glada ögon, kinder som pöser och en ω-mun som tuggar, över musens ansikte efter `pose`. Det används i 11b, 13a, 14d och 14e. När `ansikten.js` får humöret `mums` byts det bara i `mums()`.
- **Musens glass när hon står** (12a–14e) är en egen bild framför henne, 1,3 gånger bilen.js-glassen, med tassen nära strutens spets. Då syns den tomma struten.
- **Grodans arm** ritas en gång till framför disken (`armForan()`), när han räcker över den (12, 13d). I 13d sträcks armen 1,25 gånger, så att den når ner till struten.

## Avvikelser från storyboarden
- 11e–12: närmare utsnitt av luckan än helbilden, så att glassarna och överlämningen syns. 12a glider ut till tvåbilden.
- 12a: den tomma bilen rullar bakåt 250 px, annars står framhjulet under musens fötter i tvåbilden.
- 13d: musen håller struten framför disken, inte ut åt höger.
- 14d: glassen krymper för varje slick (storyboarden visar glassberget hela bilden), så att "sista biten" i 14e hänger ihop.
- Den tomma struten klipps under kulan, eftersom `lager/strut.png` har kvar kulans vita kant. Den fallande kulan är glassbilden klippt ovanför struten.
- 10 och 11 är en enda bild: molnen öppnar sig över kiosken i stället för ett kritsvep (bild 10 är bara 0,6 s).

## Efter granskning 2 (2026-11-05)
- Grodan vinkar (och sträcker på sig) när bilen kör in. 11a slutar i ett närmare utsnitt av grodan och musen i stället för helbilden.
- 11b står 0,5 s längre, och klippet till grodans närbild kommer senare.
- Små ljud i luckan, där replikerna saknar röst: pop när glassarna hoppar, ding när den rosa hoppar, kvak och kiosk-pling när grodan lutar sig ut.
- Musen i bilen tonas över till musen som hoppar på 0,12 s, så bytet inte syns. Boing är 4,4 dB lägre.
- Kulan syns falla i 0,55 s, och plupp landar på smällen.
- Den stora struten på taket står still. Den lutar för att den är ritad så i `kiosk-ra.png`, och kulan är avskuren av bildkanten tills kameran glider upp. Att räta upp den kräver en ny platta.
