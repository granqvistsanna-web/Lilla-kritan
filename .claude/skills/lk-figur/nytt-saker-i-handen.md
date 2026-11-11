# Saker i handen: hålla, plocka, äta och dricka, klä på sig

Byggt på kaninen (2026-11-11, `assets/karaktarer/kaninen-kanel/premium/uttryck.html`). All gemensam kod ligger i ett
avsnitt i `verktyg/rigg-motor.js`, `// ---------- Saker i handen ----------`, direkt före tandborsten. Allt är avstängt
tills en sida ger figuren en sak (`sakIn`) eller kläder (`kladIn`), så andra riggar ritas pixel för pixel som förut.
Bara kaninen har det än. Provslingor och filmer:

| Rörelse | Provslinga | Film |
|---|---|---|
| hålla en sak (vid sidan, framför magen) | `?rorelse=halla&sak=mugg\|sked` | `kanel-halla.mp4` |
| plocka upp och lägga ner | `?rorelse=plocka` (golvet), `&fran=bord` (bordet) | `kanel-plocka.mp4` |
| äta och dricka | `?rorelse=ata&sak=mugg\|sked\|bulle` | `kanel-ata.mp4` |
| klä på och av | `?rorelse=kla&sak=mossa\|troja\|stovlar` | `kanel-kla.mp4` |

## I ett avsnitt

Varje rörelse ger `[ansikte, pose]` som alla andra (`tl => [f, p]`), och sakens läge ligger i posen, så den blandas och
klipps som allt annat (`blandaPose`, `filmSekvens`). Saken läggs i figuren en gång när scenen byggs:

```js
const fig = figur(960, 1000, 0.75);
sakIn(fig, sakBild('../../../rekvisita/muggen/cut/muggen.png', 804, 664, { grepp: [705, 330], greppFram: [40, 360], fot: [300, 640],
  skala: 0.26, folj: 0, kant: 7, mun: [300, 0] }));          // sakIn(fig, null) tar bort den
```

Sakens mått (sakens egna px): `grepp` där handen tar tag vid sidan, `greppFram` framför magen (handen på sakens inre sida,
annars hamnar armens tonade rot över saken), `fot` det den står på, `skala`, `folj` 0 = står upprätt (mugg, bulle) / 1 = sitter
fast i handen, `v` / `vFram` vinkel, `kant` den inbakade vita kanten (bilder ur rekvisita ca 1 % av höjden), `spegel`,
`mun` punkten som når munnen, `bett [[x, y, r], …]` tuggorna (klipps ur element med `class="sak-mat"`, `mat: true` = hela bilden),
`pa { punkt, drag }` där den bärs på kroppen (mössan). En sak ritad i kod: `sakKod('<svg-delar>', { … })`.

**Hålla.** Posen `hall: [1, 0]` = i vänster hand (bildens vänster). Vid sidan är saken bakom kroppen med armen; framför magen
med handkopian. Vägen från sidan till magen är `sakFramVag(u)` (u 0 → 1): armen glider in bakom kroppens kant, handen tonar över
till framsidan där den är gömd, och glider in över magen. Lägg dess `{ armar, fram, klapp, armY, sakGrepp }` i posen
(se `hallaSak`). Saken sitter alltid under handen.

**Plocka upp / lägga ner.** `plockaDel('upp' | 'ner', tl, d, o)`, d ca 2,2 s:
```js
tl => plockaDel('upp', tl, 2.2, { fri: [180, FOTTER, 0], boj: HAND.golv })                       // bollen på golvet bredvid
tl => plockaDel('upp', tl, 2.2, { fri: [400, 700, 0], boj: HAND.bord, fram: true, lyft: -60 })   // muggen på bordet framför
```
`fri` = sakens fot där den ligger (figurens ruta) och vinkel. Ögonen går först, figuren böjer sig, armen glider ut i ett stycke
till saken (`rack`, målet räknas ur det som ritats, så handen träffar exakt), saken går över till handen. `'ner'` är samma väg
baklänges. Med `fram: true` håller figuren saken framför magen efteråt; `lyft` höjer handen så att saken går fri från bordsskivan
(muggen ska stanna under nosen, annars skymmer den ansiktet).

**Äta och dricka.** Börjar och slutar med saken framför magen (som efter plocka från bordet):
```js
tl => ataDel('dricka', tl, 4.4, { vinkel: 12, lyft: -60 })   // muggen: blundar, två klunkar, ner, jätteglad
tl => ataDel('sked', tl, 4.6, { vinkel: 80 })                 // gapar, maten borta när skeden tas ut, två tuggor
tl => ataDel('bit', tl, 4.6, { bett: 0 })                     // en tugga ur bullen; nästa tugga: bett: 1
```
Handen glider i ett stycke tills sakens `mun`-punkt ligger i munnen (`sakMun`, `HAND.mun`). Den måste stanna ute på pälsen:
över magfläcken syns armens tonade rot som ett ljust band. Därför når saken bort till munnen: muggen och bullen åt sidan om
handen, skeden lutad mot munnen (`vinkel` 80). `sakBett` = tuggor som är borta; tuggan stannar (bara provslingan låter den
växa tillbaka).

**Klä på sig.** `klaDel(sort, tl, 3.4, o)`, `sort + '-av'` klär av (samma väg baklänges):
```js
sakIn(fig, PROVSAKER.hatt());                   tl => klaDel('mossa', tl, 3.4)    // ur handen upp på huvudet
kladIn(fig, { troja: PROVKLADER.troja });        tl => klaDel('troja', tl, 3.4)    // ner över huvudet, ärmarna på armarna
kladIn(fig, { stovlar: PROVKLADER.stovlar });    tl => klaDel('stovlar', tl, 3.4)  // en fot i taget
```
Armarna når inte upp på huvudet eller ner till fötterna (raka korta stumpar), så plaggen glider på själva, som i 024:
mössan lyfts så högt armen når bredvid huvudet och går sedan i en hög båge (först upp, sedan in ovanför huvudet, aldrig framför
kroppen) och sätter sig; tröjan glider ner medan armarna är uppe; stöveln glider in under den lyfta foten. När de sitter följer
de kroppen: mössan är stel men flyttas med tryck, sträckning, boj och 40 % av ansiktets nick (`pa.drag`); tröjan ligger i
`.kropp` och trycks ihop och böjs som kroppen; stövlarna har benets vridning och lyft. `kladRita(fig, p)` sist i `rita()`.

Tröjan är en ställföreträdare ritad i kod: en färg i kroppens egen form (kroppsbilden som mask, krympt innanför den vita
kanten) från halsen till fållen, och ärmarna i armbildernas form utom handen. När en riktig tröja görs (tillsammans med Sanna)
byts fyllningen mot bilden, maskerna kan vara kvar.

## Vad som lärdes av 024 (lammet klär på sig)

Det som fungerade och togs med: plaggen glider på själva (lammet tar aldrig i dem), mössan är ett stelt urklipp som flyttas
med kroppen men aldrig töjs ("edges stretches on going down on head"), en kort sättning (tryck ihop och tillbaka) när något
landar, och strumpan tonas bara kort (0,08 s) så att man aldrig ser benet genom ett halvgenomskinligt plagg.
Det som var klumpigt: 024 skrev all plaggkod i scenen (benens matriser, mössans skala ut ur kroppen, strumpor under stövlar)
och den gick inte att återanvända; stövlarna var för höga för korta ben och fick kortas ("kortare skaft"); benens långa tonade
rot syntes som en grå skugga ovanför strumpkanten och måste gömmas. Här ligger allt i motorn och läser riggens egna
transformer, och stövlarna täcker foten helt (benets tår stack ut förbi stövelns tå tills skaftets plats flyttades utåt).

## En ny rigg: det här måste mätas

Allt står i figurens sida (inget i motorn). Kaninens tal inom parentes.

1. `HAND = { l, r }`: handens mitt i armbilderna, armens yttersta klump (`[135, 643]`, `[875, 642]`).
2. `HAND.kant`: den vita kanten mätt i `cut-tunn`-bilderna, inte tunnings-talet (6 px, inte 10).
3. `HAND.byte = [in px, vinkel]`: där handen precis gömmer sig bakom kroppens kant med armens tonade rot över kroppen
   (`[110, -73]`). Mät mot kroppsbilden; byter den medan handen sticker ut syns roten som ett band mot bakgrunden.
4. `HAND.fram = [armvinkel, in px, ner px]`: handen framför magen, så låg att saken inte når ansiktet (`[-124, 70, 40]`).
5. `HAND.golv`, `HAND.bord`: böjposen när den hämtar på golvet bredvid / bordet framför (`luta, boj, strack, bred, armar`);
   pröva att den bortre foten inte lyfter (kaninen: `luta` −8 lyfte foten, −4 gör det inte).
6. `HAND.mun`: munnens mitt mellan leendet och den öppna munnen (`[512, 466]`).
7. Mössans `pa.punkt`: hjässan där plaggets fot sitter, och att öronen sticker upp rätt (`[512, 245]`, solhatten skala 0,37).
8. Tröjan: `hals`, `fall`, `topp` och `hand` (handens radie som lämnas fri) mot kroppsbilden (`515, 800, 150, 42`).
9. Stövlarna: `ben` = skaftets mitt vid sulan i varje benbild, flyttad mot tån tills foten inte sticker ut (`[405, 951]`,
   `[640, 942]`), `golv` där de står bredvid, `skala` (0,19), `spegel` (tån åt samma håll som foten).
10. POSE0 får `hall, rack, sakV, sakGrepp, sakLager, sakFri, sakMun, sakBett, sakPa, troja, stovlar`; `rita()` slutar med
    `huvud(fig, p); sakRita(fig, p); kladRita(fig, p);`.

Riggen måste ha samma byggnad som kaninen: tre kopior per arm i ordningen bakom kroppen, framför, bara handen (`-klapp`, med
tonad rot), två kopior per ben, och grupperna `.kropp`, `.drag` och `.munnen`. Alla v2-riggar utom fjärilen (inga armar och
ben av det slaget) har det, med tre saker att se upp med: ankan saknar `.munnen` (motorn tar då `.drag`, mät `HAND.mun` i den),
igelkotten har två `.kropp` och kantkopior som följer armen genom en MutationObserver, och Mor har en extra benkopia.
Kontroll efter varje rigg: `ryck.mjs <rigg>` ska bara skriva `klart`, kontaktark i närbild (saken lossnar aldrig från handen,
ingen rot sticker ut, inget svänger genom luften), och att andra riggar är oförändrade (fingeravtryck av `<svg>.outerHTML`
före och efter, se SKILL.md).
