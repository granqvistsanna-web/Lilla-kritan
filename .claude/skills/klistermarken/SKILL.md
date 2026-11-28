---
name: klistermarken
description: Lilla Kritan stickers (klistermärken) — a number, a letter or an object on a round sticker (white rim by the vita-kanter rule around a pale golden disc) that is slapped on at its word, so counting 1-2-3, a letter and a thing named on a word look the same in every episode. The look and crayon digit come from 063 Hösten i boken; the motion (slight tilt, falls in and squashes on the word, three gold sparkles) from 013 Röda sångens disco. Ships as verktyg/klistermarke.js (one call per sticker, SVG for #ov in the three.js book or any 2D scene). Use when the user says "klistermärke", "klistermärken", "sticker", "stickers", "siffror", "siffra", "räkna", "counting", "numbers", "bokstav", "letter", "ABC-märke", "letter mark", "saken på ordet", or a scene counts, names a letter or shows a thing on a word.
---

# Klistermärken

Ett klistermärke är **en sak i taget, på sitt ord**: Malin säger *"En!"*, *"B!"* eller *"äpplet"*, och märket slås upp precis då (`format/kritans-bok.md`, *Lära*: bilden visar det när Malin säger det). Alla märken ser likadana ut och rör sig likadant, oavsett avsnitt.

**All ny kod använder `verktyg/klistermarke.js`.** Siffrorna (färger, kant, skugga, tider) finns där på ett ställe. Provsidan är `verktyg/prov/klistermarke-prov.html` (`?t=2.0` visar en tid).

Förlagor (Sanna 2026-11-28): **063 Hösten i boken** (`siffror()` i `scener/boken/boken.js`, stillbild `stills/145.6.jpg`) för utseendet: vit kant, gyllene platta, siffran i krita — *"make numbers in stickers look better"*, *"add rim to the sticker"*. **013 Röda sångens disco** (`avsnitt/013-rod-brandbil/scener/discot/scen.js`, `slagUpp()` och `dekal()`, samma som 005:s) för rörelsen, lutningen och gnistorna — *"look at stickers from disco scene red song – animation and design visual"*.

## Utseendet

Märket ritas i egna enheter (diameter 160) och skalas till `d` px, så allt följer med storleken.

| Del | Värde |
|---|---|
| Vit kant | **som alla klistermärken** (skillen `vita-kanter`): 3 px + 1 % av märkets höjd i bild (ca 6 px på ett 290 px-märke), helt vit, lätt handklippt. Kanten är alltid kvar (Sanna 2026-11-28: *"add rim to the sticker"*) |
| Plattan innanför | `#F6DC94` ljust gyllene (063). Får följa avsnittets färger (013: `#FCE4E2`), men aldrig vit: då försvinner kanten |
| Skugga | mjuk, `rgba(70,45,20,0.22)`, förskjuten snett nedåt höger (063) |
| Lutning | varje märke lite snett, växla tecken: −5, 4, −4, 5 grader (013) |
| Siffra / bokstav | mitt i plattan, ca 64 % av märkets höjd, tjock varmbrun vaxkrita `#6B3F1D` (1,5 × `KRITAN.BRED` = 18 px på ett 290 px-märke), ritas streck för streck med `ritBana` (vaxkornet följer med) |
| Sak | urklippet med sin egen tunna kant (vita-kanter), ca 80 % av plattan. Ingen extra `kant.lagg` på saken |

**Storlek:** halvbild ca 250–300 px, en rad med många märken 160–200 px, en sak stor mitt i bild (005/013:s lista) ca 380 px.

## Rörelsen

1. **Faller in** 0,18 s före ordet: 46 px ovanifrån (vid 160 px), lite större (1,15) och vriden 10°.
2. **Fastnar på ordet** (`t0`): trycks ihop mot underkanten (x +12 %, y −14 %) och dallrar ut, vickar till 5° och lugnar sig (0,4 s).
3. **Tre gnistor** poppar snett runt märket när det landar (0,5 s).
4. **Siffran eller bokstaven ritas** 0,4 s från ordet (`ritfart`).
5. **Sitter** med ett lugnt gung (±1,2°, ±3 px). Studsar till på ett ord som gäller alla (013: *"röda!"*) — det gör scenen själv.
6. **Tonas ut** de sista 0,3 s före `t1`, när Malin har räknat klart eller nästa sak kommer.

**Lista med saker** (005/013): saken slås upp stor mitt i bild på sitt ord och flyger i en båge (70 px upp) till sin plats i en rad när nästa kommer. Scenen räknar `x, y, d` för varje bildruta (`lerp` från mitten till platsen); märket gör resten.

## Placering

- **Ovanför det den räknar**, aldrig över det: märkets underkant minst 10 % av `d` ovanför sakens topp (063: ekollonen). Täcker aldrig ett ansikte, kritan eller figurens väg.
- Tre märken i en rad med lika avstånd och i balans runt bildens mitt (013: *"balance stickers"*).
- Följer saken om kameran rör sig: räkna om `x, y, d` ur sakens läge varje bildruta.

## De tre sorterna

```js
klistermarke(t, { x, y, d, t0, t1, siffra: '2', tilt: 4 })                          // siffra 1–3 (färdiga banor)
klistermarke(t, { x, y, d, t0, t1, drag: ['M… '], mitt: 50, tilt: -4 })             // bokstav eller annan siffra: banor i en 100 × 140-ruta
klistermarke(t, { x, y, d, t0, t1, bild: url, hb: h / w, skiva: '#FCE4E2', tilt: 5 })   // sak: urklippet på plattan
```

- **Siffror:** räkna till tre (fyra–fem bara om manuset gör det). Nya siffror skrivs som banor i samma 100 × 140-ruta som `MARKE_SIFFROR` och läggs till där, inte i avsnittet.
- **Bokstav:** samma banor som bokstaven kritan ritar i avsnittet, i 100 × 140-rutan. **ABC-avsnitten** har sitt eget bokstavsmärke (klossen med `klister: true` i `produktion/youtube/alfabet/abc-e/klossar.js`, märket i hörnet) och sina ordmärken (`format/abc-recept-2-stora-bokstaven.md`, *Klistermärkena och tallrikarna*); de byts inte ut. Märket **säger bara sin bokstav** i toner (*"E!"*, *"E-e!"*), inga ord och inget utdraget.
- **Sak:** urklipp med tunn kant (mät den: ca 1 % av höjden, `tunn_kant.py`). Bara saken, inga figurer på märket.

## Så anropas den

**Kritans bok (three.js, `#ov`):** ladda `<script src="/verktyg/kritan-ritar.js"></script><script src="/verktyg/klistermarke.js"></script>` i `scener/boken/index.html` och lägg märkena i samma sträng som kritan:

```js
const p = sak.m.position.clone().add(v3(0, 0.09, 0)), [x, y] = skarm(p), [, y2] = skarm(p.clone().add(v3(0, 0.06, 0)));
ov += klistermarke(t, { x, y, d: Math.abs(y - y2), t0: ORD[i], t1: slut, siffra: String(i + 1), tilt: [-5, 4, -4][i] });
```

`skarm()` kommer från `kritan(cam)` i `popupbok/uppslag.js`. Diametern räknas ur en höjd i världen, så märket växer och krymper med kameran.

**2D-scen (SVG, `kit.js`):** ladda samma två skript och skriv märkena i ett eget lager överst varje bildruta: `$('marken').innerHTML = klistermarke(t, { … })`. Utan `#boil` på lagret — märket har sin egen vita kant. I en zoomad kamera: lägg lagret utanför kameragruppen och ge skärmens `x, y, d`, eller inne i den och dela inte `d` med zoomen.

## QA

Stillbilder på ordet (`t0`), 0,1 s efter och när märket sitter, plus täta bilder (6/s) runt landningen:

- [ ] Märket landar **på ordet** (lyssna), inte före eller efter. En sak i taget.
- [ ] Vit kant (3 px + 1 %) syns runt hela märket; plattan är inte vit; skuggan är mjuk och åt samma håll som scenens.
- [ ] Siffran/bokstaven står mitt i plattan, ritas i rätt ordning och är vaxkrita (korn), inte en slät linje.
- [ ] Märket täcker inte saken det räknar, ett ansikte, kritan eller en annan sak, och går inte ut ur bild.
- [ ] Märkena lutar åt olika håll och står i balans; inget går genom något när de flyger.
- [ ] Gnistorna är små och borta efter 0,5 s; inget märke hoppar eller studsar mer än i 013 (lugnt).
- [ ] Inga djurnamn eller ord på märkena, bara siffran, bokstaven eller saken.
