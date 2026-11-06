# Tittut: Kon Kajsa på bondgården (plan)

**Status:** plan, inget byggt. Skriven 2026-11-06 utifrån [`format/tittut.md`](../../../../../format/tittut.md) (utkast).

| | |
|---|---|
| Plats | Bondgården ([`bakgrunder/bondgarden.md`](../../../../../bakgrunder/bondgarden.md), `assets/bakgrunder/bondgarden/bondgarden.png`): gul vägg, ladans röda dörr till vänster, vitt golv |
| Figur | Kon Kajsa ([`karaktarer/kon-kajsa.md`](../../../../../karaktarer/kon-kajsa.md), ✅ låst, utseendet ändras inte) |
| Gömställen | höstacken, vagnen, ladugårdsdörren |
| Ny pose | `tassar` (filmens en nya pose) |
| Längd | lång ca 65 s, 16:9. Short ca 25 s (runda 1 och tassarna), 9:16 |

## Gömställena

Kajsa är en stor, rund ko. Därför väljs tre saker som är **större än hon** eller har en öppning hon kan vara i:

| Runda | Gömställe | Hon kommer fram | Varför |
|---|---|---|---|
| 1 | **höstacken** (stor och rund, till höger) | `sida`: hon glider ut vid sidan av stacken, några strån trillar ner | Höet finns redan målat i bondgårdsbilderna. Rundan liknar stenen i skogen, och sida är lätt att se första gången |
| 2 | **vagnen** (mitten) | `upp`: hon sjunker ner i vagnslådan och åker upp ur den | Vagnen finns redan i kod (`avsnitt/014-grona-traktorn/scener/vagnen.js`) med lagren `bak` och `fram`, så att Kajsa kan läggas inuti lådan. En ko som sitter i en vagn är lite tokigt och därför roligt |
| 3 | **ladugårdsdörren** (till vänster, på väggen) | `ur`: dörren står på glänt med en mörk springa, och huvudet kommer ut ur springan | Dörren finns målad i `bondgarden.png`. Det är där en ko bor, så det känns rätt att hon går in i ladan |

**Tunnan väljs bort.** En tunna som är större än Kajsa ser konstig ut, och den finns inte någonstans än. Den passar bättre till en liten figur, till exempel en kyckling eller katten Kaj.

Ordningen går från höger till vänster: Kajsa kommer in från höger och slutar vid ladan, där hon bor.

## Filmens ordning

Tiderna är ungefärliga. Motorn tar de riktiga tiderna från ljudfilernas längd.

| # | Takt | Bild | Replik / ljud | Ca |
|---|---|---|---|---|
| 1 | Intro | Kritan ritar snabbt bondgården: väggen, dörren, vagnen, höstacken | *"Tittut!"* (`tittut-N`), platsljudet tonas in | 4 s |
| 2 | Kajsa kommer in | Hon går in från höger, lugnt (hon är lite långsam), stannar mitt på golvet och vinkar | *"Hej kon!"*, koskällan plingar | 4 s |
| 3a | Runda 1: höstacken | Hon går till höstacken och glider ner bakom den (`ner`, `swoosh`) | *"Borta!"* | 2 s |
| 3b | | Paus. Allt står still, höstacken skakar lite en gång (`skakar`) | (tystnad) | 1 s |
| 3c | | Mitt i pausen | *"Var är kon?"* | 1,5 s |
| 3d | | Hon glider ut vid sidan av stacken (`sida`, `pop`), fnissar och gör ett litet hopp (`duns`), några strån faller | *"Tittut!"*, fniss | 2,5 s |
| 3e | | Hon går till vagnen | (bädden) | 2,5 s |
| 4 | Runda 2: vagnen | Samma rytm. Hon står i vagnen, sjunker ner i lådan och kommer upp ovanför kanten (`upp`, lite över målet och tillbaka) | *"Borta!"* · paus · *"Var är kon?"* · *"Tittut!"*, fniss | 9,5 s |
| 5 | Runda 3: ladugårdsdörren | Samma rytm. Hon går in genom dörrspringan och är borta; dörren rör sig lite. Huvudet kommer ut ur springan (`ur`), sedan kliver hon ut | *"Borta!"* · paus · *"Var är kon?"* · *"Tittut!"*, fniss | 9,5 s |
| 6 | Tassarna | Närbild, Kajsa rakt mot barnet. Tassarna upp framför ögonen; paus 2 s; tassarna ut åt sidorna. Tre gånger | *"Var är kon?"* · paus · *"Tittut!"*, fniss (×3) | 18 s |
| 7 | Hej då | Helbild, Kajsa vinkar | *"Hej då!"*, koskällan plingar | 3 s |
| | | | **Totalt** | **ca 65 s** |

Short: takt 1, 2, runda 1 och tassarna (två gånger i stället för tre om det blir för långt), sedan hej då. Ca 25–30 s.

## Data (planerat)

1920 × 1080. Golvlinjen ligger på y ≈ 775 (bondgarden.png är 1376 × 768 med horisonten på y 555, skala 1,395). Kajsa är ca 300 px hög i helbilden. x/y är sakens mitt i underkant (där den står på golvet). För dörren är y väggens underkant.

```js
tittut({
  plats: 'bondgarden',
  figur: 'kon-kajsa',
  saker: {
    hostack: [1560, 900],   // stor och rund, ca 440 bred × 380 hög, så att Kajsa (300) försvinner helt
    vagn:    [ 980, 930],   // vagnen.js, h ca 360; Kajsa ligger mellan bak och fram
    dorr:    [ 185, 775],   // ladans dörr som den sitter i bondgarden.png, ca 245 × 400
  },
  rundor: [
    ['hostack', 'sida'],
    ['vagn', 'upp'],
    ['dorr', 'ur'],
  ],
  tassar: 3,
  kort: [0],
});
```

Positionerna är en första gissning. Kontrollera dem mot en stillbild innan de låses.

## Saknas

**Bilder (Sanna gör dem eller säger till):**
- [ ] **Höstacken som urklipp.** Höet är bara målat i bakgrunden (`bondgarden.png` till höger, `bondgarden-varv.png`). Det behövs ett eget urklipp, som `skogen-saker/`, alltså t.ex. `assets/bakgrunder/bondgarden-saker/hostack.png`. Det behövs också en bakgrundsplatta utan det målade höet, annars syns två höstackar.
- [ ] **Ladugårdsdörren som urklipp** (dörrbladet för sig), plus en mörk öppning bakom, så att Kajsa kan ligga mellan väggen och dörren. Öppningen kan ritas i kod. Dörren behöver också ett lager framför Kajsa när hon står i springan.
- Vagnen behöver ingen bild, den finns i kod (`vagnen.js` från 014). Den kanske behöver göras högre, se frågorna.
- `bondgarden.md` har inget `bondgarden-saker`-avsnitt. Om urklippen görs ska de skrivas in där i samma form som `bakgrunder/skogen.md`, så att `verktyg/prompt.py` hittar dem.

**Kajsas pose:**
- [ ] **`tassar`.** Kajsa har bara helbilden i `assets/karaktarer/kon-kajsa/cut/` (`kon-kajsa.png`, `kon-kajsa-faceless.png`). Hon har inga lösa armar och ingen rigg. Både `tassar` och `vinkar` kräver armar med vridpunkter, som `kanel-rigg.json`. Gör dem med `verktyg/delar.py` (nämns i hennes figurfil) eller som för Lova i 014 (`verktyg/rita-lemmar.py`). Utseendet ändras inte, så låsningen bryts inte. Hornen och öronen sticker ut över tassarna, men det gör inget.

**Röst** (`assets/ljud/roster/tittut/`, enligt [`ljud-att-gora.md`](../../ljud-att-gora.md)):
- [ ] `ko-hej.m4a`: `[excited] Hej kon!`
- [ ] `ko-var.m4a`: `[curious] Var är kon?`
- [ ] `borta-1.m4a` och `hej-da-1.m4a` saknas också (samma som för Kanels första film).
- Obs: `hej-da-4` är *"Vi ses i skogen"* och passar inte här. Motorn bör hoppa över den på bondgården, eller så skrivs den om till något utan plats.

**Platsljudet:**
- [ ] **Det finns inget gårdsljud.** I `assets/ljud/effekter/` finns `fagelkvitter`, `mu`, `pick` och `kluck`, men ingen loop för en bondgård (som `skogsljud`). Förslag: `gardsljud/gardsljud-1.m4a`, 60 s, går runt. ElevenLabs SFX-prompt:
  `quiet countryside farmyard ambience, soft distant birdsong, a light breeze, an occasional faraway hen clucking, calm and gentle, no music, no voice, seamless loop`
  Ingen ko i loopen, så att Kajsa är den enda kon som hörs. Nödlösning tills det finns: `fagelkvitter` lågt.

**Ljudeffekter:**
- [ ] `prassel-ho` för höstacken som skakar och stråna som faller: `dry hay rustling softly twice, a few straws falling, close, indoors barn, no music, no voice`
- [ ] Ett gnissel när dörren rör sig, kanske. Kan bytas mot `gung-knarr`, som redan finns.
- Kajsas fniss: `fniss` är Kanels. Se frågorna.

## Idéer och frågor till Sanna

1. **Är en ko bakom en höstack trovärdigt?** Ja, om stacken är tydligt större än hon (ca 380 hög mot hennes 300). Det är därför tunnan väljs bort. Är höstack, vagn och dörr okej?
2. **Vagnen:** i 014 är den liten (för Pip och Gurra). För Kajsa behöver lådans framsida vara så hög att hon försvinner helt när hon sjunker ner. Ska vagnen bli högre här, eller räcker det att hon sjunker ner bakom framsidan även om hornen syns lite?
3. **Dörren:** Kajsa glider *in* genom springan i stället för *ner* bakom dörren. Det bryter lite mot rörelsen `ner` i formatet. Är det okej, eller ska hon bara glida ner bakom dörrbladet?
4. **Koskällan som ledtråd:** under pausen kan koskällan plinga en gång i stället för att saken skakar. Då hör barnet att Kajsa finns kvar fast hon inte syns, och det är precis objektpermanens. Men pausen ska vara tyst, så: pling eller tyst?
5. **Kajsas fniss:** ska hon ha Kanels `fniss`, ett mjukt kort `mu` (`mu-*` finns redan, riktigt koljud) eller ett eget mysigt koskratt? Ett kort `mu` efter *"Tittut!"* är billigast och verklighetsnära.
6. **Tempot:** Kajsa är lugn och lite långsam. Ska hon gå långsammare mellan sakerna och glida lite långsammare än Kanel? Rytmen borta-paus-tittut ändras inte.
7. **Bakgrunden:** den gula väggen (`bondgarden.png`) eller den gröna gården med ladan (`bondgarden-varv.png`)? Den gula är enklare och dörren sitter lågt. På den gröna har ladan tak och fönster, men dörren är mindre.
