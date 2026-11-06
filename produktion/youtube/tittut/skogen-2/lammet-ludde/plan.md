# Tittut: Lammet Ludde i skogen 2

**Status:** plan, inget byggt. Skriven 2026-11-06 utifrån utkastet i [`format/tittut.md`](../../../../../format/tittut.md).

En figur (Lammet Ludde, ✅ låst), en plats (skogen 2, [`bakgrunder/skogen.md`](../../../../../bakgrunder/skogen.md)) och tre gömställen: **lövhögen, trädet och stubben**. Ludde är lugn och lite sömnig, så filmen får ett något långsammare tempo än Kanels: han går lite långsammare mellan sakerna och gör ett mjukare hopp. Pausen är ändå 2–3 s, som i formatet.

Han kommer fram så här, enligt `format/tittut.md`:

| Runda | Gömställe | Han kommer fram |
|---|---|---|
| 1 | lövhögen | `upp` ur högen, löv yr upp |
| 2 | trädet | `sida`, ut vid sidan av stammen |
| 3 | stubben | ~~`upp` ovanför stubben~~ → **överraskningen:** `upp` ur lövhögen igen (se nedan) |

## Överraskningen: använd, i runda 3

Ludde glider ner bakom **stubben**, men under pausen prasslar och skakar **lövhögen** lite. *"Var är lammet?"* … och han kommer upp **ur lövhögen**, med löven som yr upp.

- Det är filmens enda överraskning och den ligger i sista rundan, inte i första.
- Skakningen är en ärlig ledtråd, ingen falsk: saken skakar där Ludde faktiskt är. Det blir regeln för hela filmen: **lövhögen skakar när Ludde är i den** (runda 1 och 3), inget annat skakar. Ett barn som tittat på runda 1 kan alltså gissa rätt i runda 3.
- Lövhögen med löven som flyger är filmens roligaste ögonblick, så det kommer två gånger: först och sist.
- Nackdel: stubbens egen `upp` syns aldrig. Vill Sanna hellre ha det helt rakt, är runda 3 bara `['stubbe', 'upp']` utan skakning (se frågorna).

## Ordningen i filmen

Ungefärliga tider. De slutliga tiderna räknas av motorn från ljudfilernas längd.

| # | Takt | Bild | Replik / ljud | Ca tid |
|---|---|---|---|---|
| 1 | Intro | Kritan ritar snabbt skogen 2: stigen, lövhögen, trädet, stubben | *"Tittut!"* (`tittut-2`) | 3 s |
| 2 | Ludde kommer in | Ludde glider in från vänster längs stigen och stannar till höger om lövhögen, vinkar | *"Hej lammet!"* (`lamm-hej`), `ba` | 4,5 s |
| 3a | Runda 1, lövhögen | Ludde glider bakom högen och ner. Borta. | *"Borta!"* (`borta-1`), `swoosh` | 2 s |
| 3b | | Paus. Lövhögen skakar lite en gång. | `prassel-lov`. Mitt i: *"Var är lammet?"* (`lamm-var`) | 2,5 s |
| 3c | | Ludde åker upp ur högen, löv yr upp. Står kvar, litet hopp. | *"Tittut!"*, `pop`, `ba`, `duns` | 2,5 s |
| 3d | | Ludde går lugnt bort till trädet | – | 2,5 s |
| 4a | Runda 2, trädet | Ludde glider in bakom stammen. Borta. | *"Borta!"*, `swoosh` | 2 s |
| 4b | | Paus. Inget rör sig. | Mitt i: *"Var är lammet?"* | 2,5 s |
| 4c | | Ludde glider ut vid sidan av stammen (höger sida, mot stubben). Litet hopp. | *"Tittut!"*, `pop`, `ba`, `duns` | 2,5 s |
| 4d | | Ludde går lugnt bort till stubben | – | 2,5 s |
| 5a | Runda 3, stubben | Ludde glider ner bakom stubben. Borta. | *"Borta!"*, `swoosh` | 2 s |
| 5b | | Paus. **Lövhögen** skakar lite (överraskningen). | `prassel-lov`. Mitt i: *"Var är lammet?"* | 2,5 s |
| 5c | | Ludde åker upp ur lövhögen, löv yr upp. Litet hopp. | *"Tittut!"*, `pop`, `ba`, `duns` | 3 s |
| 6 | Tassarna | Zoom in till närbild, Ludde vänd mot barnet. Klövarna framför ögonen. *"Var är lammet?"* Paus 2 s. Klövarna ut åt sidorna. *"Tittut!"* `ba`. Tre gånger. | `lamm-var`, `tittut-2`, `ba` | 3 × 5 s = 15 s, plus zoom 1 s |
| 7 | Hej då | Zoom ut. Ludde vinkar. | *"Hej då!"* (`hej-da-1`) | 3 s |

**Lång version:** ca 60 s (1 min). **Short (9:16):** takt 1, 2, 3a–3c, 6 och 7, ca 35 s.

Bädden (den gemensamma Suno-slingan) går lågt hela tiden och blir tystare under pauserna. Under den går `skogsljud-1` lågt och runt.

## Data

Koordinaterna gäller 1920×1080 och är **sakens fotpunkt**: mitten av underkanten, där den står på golvet. Uppmätta från `assets/bakgrunder/skogen-2/test-tre-saker.jpg`, golvlinjen ligger på ca 715 px. Storlekarna är de i `bakgrunder/skogen.md`.

```js
tittut({
  plats: 'skogen-2',
  figur: 'lammet-ludde',
  hojd: 310,                 // NYTT fält (förslag): Luddes höjd i bild, se nedan
  ljud: 'ba',                // NYTT fält (förslag): figurens ljud i stället för Kanels fniss
  saker: {
    lovhog: [520, 745],      // ca 560 × 480, till vänster om stigen
    trad:   [1085, 730],     // ca 1150 px högt, kronan går ut ur bild upptill, stammen ca 280 px bred
    stubbe: [1600, 790],     // ca 520 × 300, lite närmare kameran än de andra
  },
  start: [820, 770],         // där Ludde stannar efter att ha kommit in: på stigen, höger om lövhögen
  skakar: 'lovhog',          // bara lövhögen skakar, och bara när Ludde är i den
  rundor: [
    ['lovhog', 'upp'],
    ['trad',   'sida'],
    ['stubbe', 'upp', 'lovhog'],  // NYTT (förslag): tredje värdet = där han kommer fram. Överraskningen.
  ],
  tassar: 3,
  kort: [0],
});
```

Utan överraskningen blir sista rundan `['stubbe', 'upp']`.

**Luddes storlek.** Kanel är ca 300 px utan öronen. Ludde har inga långa öron, så **310 px** hög (skala ca 0,43 av bilden på 1024 px) gör dem lika stora. Då är han ca 240 px bred utan armarna och ca 270 px med, så han ryms helt bakom stammen (ca 280 px) och lövhögen (560 px). **Stubben är trång:** toppen är bara ca 270 px bred. Testa i förhandsvisningen. Sticker armstumparna ut, lägg stubben lite större (ca 580 px bred) i stället för att krympa Ludde.

**Shorten.** Runda 1 är vid lövhögen (x ≈ 520). Ett 9:16-utsnitt ur 16:9 är ca 610 px brett, så det bör centreras runt x ≈ 560 (lövhögen plus platsen där Ludde står), inte mitt i bilden.

## Saknas

**Bilder och urklipp: skogen 2 finns redan.**
- [x] Bakgrunden `assets/bakgrunder/skogen-2/skogen-2.png`
- [x] Urklippen `assets/bakgrunder/skogen-saker/lovhog.png`, `trad.png`, `stubbe.png`
- [ ] Prompten för **stubben** saknas i `bakgrunder/skogen.md` (busken, stenen, trädet, stocken och lövhögen har sina). Bilden finns, så det gäller bara dokumentationen.
- [ ] Löven som yr upp: görs i kod (enligt `skogen.md`). Behöver några lösa löv, till exempel urklippta ur `lovhog.png` eller dess original, 4–6 st.

**Luddes `tassar`-pose: saknas, och den går inte att göra bara med rotation.**
Ludde har små armstumpar. Vridpunkterna sitter på (208, 576) och (807, 571) och ögonen på y ≈ 402, alltså ca 175 px ovanför axlarna. Armarna är ca 80 px långa och når inte upp. Ludde är låst (✅), så utseendet ändras inte. Två vägar:
1. **I kod, ingen ny bild (förslag att testa först):** flytta armdelarna (inte bara vrida) så att de mörka klövarna hamnar över ögonen. Klövarna är ungefär lika stora som ögonen (radie 26), och ögonen ritas ändå i kod och kan döljas. Risken är att armarna ser lösa ut från kroppen.
2. **En ny posebild `ludde-tassar.png`:** samma Ludde med båda klövarna uppe framför ögonen, image2image från `ludde.png`. Räknas som hans en nya pose. Görs bara om Sanna vill det.

**Röst, per figur** (läggs i `assets/ljud/roster/tittut/`, samma inställningar som Kanels):
- [ ] `lamm-hej.m4a`: `[excited] Hej lammet!`
- [ ] `lamm-var.m4a`: `[curious] Var är lammet?`

**Delat, som också saknas** (står redan på listan för Kanels film i `ljud-att-gora.md`):
- [ ] `borta-1.m4a`: `[whispers] Borta!`
- [ ] `hej-da-1.m4a`: `[warm] Hej då!`
- [ ] Ljudeffekten `prassel-lov` (lövhögen)

Finns redan: `tittut-2`, `ba` (fyra tagningar), `pop`, `duns`, `swoosh`, `skogsljud`.

## Idéer och frågor till Sanna

1. **Överraskningen i runda 3** (bakom stubben, upp ur lövhögen, och lövhögen prasslar som ledtråd). Behålla, eller ska Luddes film vara helt rak, så att stubbens `upp` också syns?
2. **Tassarna:** prova armarna i kod först, eller gör vi en posebild `ludde-tassar.png` direkt?
3. **`ba` i stället för `fniss`:** ett lamm som fnissar känns fel. Ska Ludde säga ett kort *bä* när han tittar fram? Bjällran (`pling`) är ett annat alternativ, men den är svårare att höra som ett "jag är här!".
4. **Kontrast:** Ludde är vitkrämig och golvet är benvitt (`#FAF8F2`). Ovanför lövhögen och vid stammen syns han mot det mintgröna, men när han går på golvet flyter benen och underkroppen ihop med golvet. En mjuk skugga under honom, eller räcker den vita kanten?
5. **Fötterna under trädet:** i testbilden syns Kanels fötter under stammen. Ska Luddes klövar synas där som en ärlig ledtråd ("jag ser dina fötter!"), eller ska motorn dölja dem så att han är helt borta?
6. **Gömma sig bakom trädet:** formatets `ner` är glida ner bakom saken, men trädet är högt. Föreslår att han glider åt sidan in bakom stammen och kommer ut på andra sidan. Okej att motorn gör `sida` åt båda hållen?
7. **"Där är du!"** (`tittut-4`) passar perfekt till överraskningen, men en film använder samma variantnummer hela vägen. Ska överraskningsrundan få använda en annan variant?
8. **Engelska versionen, om den görs:** djuret får inget namn på engelska. Replikerna per figur blir då till exempel *"Hello, little lamb!"* och *"Where is the lamb?"*, inte *"Hi Ludde!"*.
