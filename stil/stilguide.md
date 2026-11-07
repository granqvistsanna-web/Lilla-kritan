# Stilguide – Lilla Kritan

> **Ny riktning: [Lilla Kritan art direction v2](art-direction-v2.md)** (2026-11-07). Platta kritfigurer med konstens egen tjockare vita kant, gulligare ansikten i kod, kraftiga platta väggar utan saker på, och närbild som följer figuren. Det som står nedan är v1 och gäller för figurer och platser som inte gjorts om än.

## Känslan

Barnteckning med oljepastell och vaxkrita. Starka, glada färger, mycket luft och nästan inga detaljer. En figur, en sak och en färgad vägg räcker för att berätta en scen.

**Inspiration:** färgerna, texturen och kompositionen i SVT:s *Grisen Gris* (se [`referenser/stilanalys.md`](../referenser/stilanalys.md)).

> ⚠️ **Skriv aldrig namnet på serien i prompterna**, och kopiera inte dess figurer. Vi tar efter *hur* det är målat, inte *vad*. Våra figurer är egna djur och fordon, och ingen av dem är en rund rosa gris. Då är figurerna våra egna och kanalen går inte att anmäla för upphovsrätt på YouTube.

## Komposition: vägg och golv

Alla platser byggs på samma sätt:

```
┌───────────────────────────────┐
│                               │
│     VÄGG: en stark färg       │  ← ca 2/3 av bilden, platt men med kritstruktur
│     (byter färg per plats)    │     1–3 enkla saker: moln, tavla, träd, skylt
│                               │
├───────────────────────────────┤  ← rak horisontlinje
│     GOLV: vitt                │  ← ca 1/3. Här står figurerna
│        ( grå skugga )         │     med en mjuk grå oval under sig
└───────────────────────────────┘
```

- **Varje plats har sin egen väggfärg** (se `bakgrunder/README.md`). Barn känner igen platsen på färgen, och kritsvepet vid platsbyten görs i den färgen.
- Figuren står stort, i mitten eller lite åt sidan, med mycket tom yta runt sig.
- Ingen perspektiv: allt är platt, som klistermärken på ett papper.
- Saker får gärna stå utspridda på golvet och väggen, som leksaker.

## Figurer

- **Mjuka klumpformer.** Kroppen är en boll, droppe eller bönform. Huvud och kropp är ofta samma form.
- **Framifrån** eller lätt vridna. Figurer vänds åt vänster genom att spegla dem.
- **Ögon:** små svarta prickar i vita cirklar. Ögonen kan sitta en bit isär.
- **Armar och ben:** korta stumpar med **svarta spetsar** (tassar, klövar, fötter).
- **Detaljer:** några små krafsade streck, till exempel hårstrån på huvudet eller en krulle till svans.
- **Ingen mörk kontur runt figurerna.** Färgen tar slut med en tunn ljus, kritig kant.
- **Vit klistermärkeskant på allt** som är en figur eller sak: 3 px + 1 % av sakens höjd i bild, nästan hel vit med lite kritkorn och en lätt handklippt kant. Samma regel nära och långt bort. Se skillen `vita-kanter` och `verktyg/kant.js`.
- **Skugga:** en mjuk grå oval på golvet under figuren, en bit ifrån fötterna. Den gör det enkelt att få figuren att hoppa och studsa.
- Fordon och saker får ritas mer som en barnteckning, med lösa **svarta kritlinjer** och färg innanför.

## Material och textur

- Oljepastell och vaxkrita med **synlig, kornig struktur** i alla färgytor. Färgen är aldrig helt jämn.
- Kanterna är lite ojämna och klottriga.
- Väggarna har samma kritstruktur, men lugnare än figurerna.

## Färgpalett

| Namn | Hex | Används till |
|---|---|---|
| Solgul | `#F6C21C` | Vägg: Bondgården. Humla, kyckling |
| Himmelsblå | `#4FB3E8` | Vägg: Ängen, Himlen |
| Lila | `#8E44C9` | Vägg: Busshållplatsen |
| Orange | `#F26B1D` | Vägg: Äppelträdet |
| Turkos | `#2BB7A6` | Vägg: Dammen |
| Rosa | `#F06EAA` | Vägg: Glasskiosken |
| Golvvit | `#FAF8F2` | Golv, papper |
| Skuggrå | `#C9C6C0` | Skuggan under figurer |
| Laxrosa | `#F28C7C` | Logotypen |
| Äppelröd | `#E5302A` | Äpplen, bussen |
| Gräsgrön | `#3FA34D` | Gräs, blad, grodan |
| Ljusgrön | `#A6D86B` | Vägg: Vägen |
| Krita svart | `#1E1A18` | Ögon, tassar, linjer på saker |

## Bildformat

- **Avsnitt:** 16:9, 1920×1080 eller 3840×2160.
- **Shorts:** 9:16, 1080×1920. Horisontlinjen ligger lika högt så att samma figurer passar.
- **Figurer och delar:** kvadratisk bild på ren vit bakgrund, så att de är lätta att klippa ut.

## Grundprompt (engelska fungerar bäst i bildmodellerna)

Den här texten läggs först i varje prompt. `verktyg/prompt.py` gör det automatiskt. Väggen och golvet beskrivs i bakgrundens egen prompt.

```prompt
Children's TV cartoon illustration for toddlers, made with oil pastels and wax crayons. Every colour area is filled with visible grainy crayon texture and slightly uneven scribbled edges. Characters are very simple soft rounded blob shapes facing the viewer, with small black dot eyes in white circles, short stubby arms and legs with black tips, a few tiny scribbled lines for hair or details, a thin chalky light edge instead of a dark outline, and a soft grey oval shadow on the floor slightly below them. Small objects and vehicles look like a child's drawing, with loose black crayon lines and bright flat fills. Flat, no perspective, no gradients, no 3D, no photorealism, lots of empty space. Bright cheerful colours: sunshine yellow, sky blue, orange, purple, green, apple red, salmon pink. No text, no letters, no watermark.
```

## Saker att undvika

- Mörka konturer runt figurerna
- Stora ögon med glans (anime- eller Pixar-stil)
- Skuggor på figurerna, toningar och 3D-känsla
- Detaljrika bakgrunder, landskap med perspektiv
- Text i bilderna (lägg text i redigeringen istället)
- Läskiga saker: mörker, arga ansikten, stora tänder
- En rund rosa gris som huvudfigur (för likt förebilden)
