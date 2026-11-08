# Röda brandbilen

Kaninens brandbil i 013 Röda sången, i **art direction v2** ([`stil/art-direction-v2.md`](../stil/art-direction-v2.md)). En liten rund leksaksbrandbil från sidan, **vänd åt höger: den kör alltid åt höger (→)** och vänds aldrig. Klarröd (`#DD4424`, samma som v2-bilen), inga konturer, en jämn vit klistermärkeskant, inget ansikte, ingen eld, ingen text.

Den ska läsas som en **brandbil** på en gång, inte som en röd bil, men kaninen måste sitta i den precis som i v2-bilen. Försöken 2026-11-08 (A, B, C i `assets/rekvisita/brandbil-rod/`) hade en hög låda bak, ett litet säte och en båge över föraren, så kaninen fick inte plats. Därför byggs brandbilen **på v2-bilens kropp**, som inte ändras:

- **Samma långa, låga balja** som v2-bilen: det öppna, gräddvita karet tar upp ungefär två tredjedelar av längden och har låga kanter, så att kaninen syns från midjan och upp. Ingenting ovanför eller runt föraren: ingen båge, ingen vindruta, ingen låda bak.
- **Stegen** ligger längs sidan, strax under kanten, på två små grå fästen, och sticker ut en bit bakom bilen. Den som fälls upp i 11b ritas i kod.
- **Två blåljus** på en kort grå fot på nosen framför ratten, fria från karossen så att de kan klippas ut och lysa i kod.
- **Slangrullen**, en rund ljusgrå rulle, på den bakre delen av sidan, under stegen.
- **En gräddvit rand** längs sidan under stegen, en ljusgrå stötfångare fram, den runda gula strålkastaren.
- Ratten på sin stång och de två stora hjulen som i v2-bilen. Inget avgasrör.

Byggs och klipps som v2-bilen (se "Fordon (bilen)" i art direction v2): alla delar ur **en** bild, kanten läggs på hela bilen innan den delas, 14 px kant i filen på skala 0,47. Gosekaninen sitter fastspänd bak i karet.

Används i: 013 Röda sången.

Gör den i OpenArt eller Google Flow (Nano Banana 2, image2image, 2K) med **bild 1 = v2-bilen** `assets/stiltest-premium/bil/hel-b.png` (stilen, sätet och ratten). v2-bilen är vänd åt vänster: spegla den först, så att bild 1 redan är vänd åt höger. Kroppen ska vara densamma, så att kaninens plats i karet och riggen från bilscenen gäller utan ändringar. Spara som `assets/rekvisita/brandbil-rod/brandbil-rod-v2.png`.

```prompt
Image 1 is the reference for STYLE, BUILD and SHAPE: keep its body EXACTLY - the same long low rounded tub, the same big open cream-coloured cockpit taking up about two thirds of the length with low edges, the same steering wheel on its column, the same two big wheels, the same flat wax-crayon technique (one even crayon fill with fine paper grain and visible soft scratchy crayon strokes, a little lighter than heavy hatching, no shading, no dark outline) and the same thick even white sticker border. Seen exactly from the side, FACING RIGHT (the round yellow headlight is on the right). Turn it into a TOY FIRE ENGINE a two-year-old recognises at once by ADDING, without changing the body shape: a long light grey ladder (#C9C6BE) with wide rungs lying flat along the upper side of the body just below the cockpit edge, held by two small grey brackets, sticking out a little past the back; two round blue lights (#468CE6) side by side on one short grey post on the front nose, in front of the steering wheel, with a gap of white around them; a round light grey hose reel with a rolled-up hose on the rear part of the side, below the ladder; one wide cream-white stripe along the side below the ladder; a light grey front bumper. Bright red body (#DD4424). Nothing above or around the cockpit: no arch, no roll bar, no windshield, no roof, no box behind the seat. The cockpit is empty, no driver. No exhaust pipe. Very simple, bold and cute, like a premium toddler picture-book illustration. No figures, no face, no eyes, no flames, no fire, no water, no text, no numbers, no logos. Centered with space around, pure solid white background, no shadow, no ground.
```

```delar
fire engine back (with the cream inside of the cockpit), front panel (everything below the cream inside's lower edge, with the ladder, hose reel and stripe), blue lights on their post, hose reel, steering wheel ring, steering column, front wheel, back wheel
```
