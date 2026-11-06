# Tittut – Lejonet Lage hemma (plan)

**Status:** plan, inget byggt. Skriven 2026-11-06 utifrån utkastet i [`format/tittut.md`](../../../../../format/tittut.md).

En figur (Lejonet Lage ✅), en plats (hemma, ett vardagsrum), tre gömställen. Lage är stor, snäll och lite sömnig, så filmen får sluta mjukt, nästan som en godnattstund.

## Gömställena: soffan, gardinen och täcket

Fyra kandidater i `format/tittut.md`: gardin, soffa, låda, täcke. Jag väljer **soffan, gardinen och täcket**.

| Runda | Gömställe | Han kommer fram | Varför |
|---|---|---|---|
| 1 | **soffan** (mitt i bild) | `upp`: upp ovanför ryggstödet | Den klassiska tittuten. Stor och bred nog att dölja hela Lage med manen. Står i mitten, så rundan går att beskära till 9:16 för Shorten. |
| 2 | **gardinen** (vänster) | `sida`: ut vid gardinens kant | Den enda höga saken, och det mest igenkännbara gömstället hemma: barn gömmer sig bakom gardinen själva. Hela manen kommer ut vid kanten. |
| 3 | **täcket** (höger), en mjuk hög på golvet | `ur`: huvudet ut under täckets ena ände | Passar Lage som är sömnig, och leder in i gäspningen och tassarna. Samma mekanik som stocken i skogen, så ingen ny rörelse behövs. |

**Varför inte lådan:** Lage är bred (ca 360 px med manen i 1920×1080), så lådan måste bli en stor flyttkartong för att dölja honom. Det blir ett ovanligare föremål för ett litet barn än de andra tre, och fyra går inte (max tre). Lådan passar bättre en mindre figur, till exempel Kanel eller Kaj i en annan hemma-film.

**Ingen ny rörelse behövs:** `upp`, `sida` och `ur` finns redan i utkastet. (Ett alternativ till gardinen står under *Idéer*: `glipa`.)

`skakar` under pausen, en per runda, alltid mjukt:
- soffan: en kudde guppar till lite.
- gardinen: gardinen svajar lite åt sidan och tillbaka, som av ett andetag.
- täcket: täcket höjs och sänks en gång, som om Lage andas därunder.

## Filmen, steg för steg

Ungefärliga tider. De riktiga sätts av ljudfilernas längd i motorn.

| # | Steg | Bild | Replik / ljud | Tid |
|---|---|---|---|---|
| 1 | Intro | Kritan ritar snabbt rummet: väggen, golvet, sedan soffan, gardinen och täcket | *"Tittut!"* (`tittut-N`) | ca 4 s |
| 2 | Lage kommer in | Glider in från höger, stannar bredvid soffan, vinkar | *"Hej lejonet!"* (`lejon-hej`) | ca 3 s |
| 3a | Runda 1: soffan | Glider ner bakom soffan (`ner`, `swoosh`) | *"Borta!"* (`borta-N`) | ca 1,5 s |
| 3b | | Paus, allt stilla, en kudde guppar (`skakar`) | mitt i pausen: *"Var är lejonet?"* (`lejon-var`) | 2–3 s |
| 3c | | `upp` ovanför ryggstödet, litet hopp (`pop`, `duns`) | *"Tittut!"* + Lages skratt | ca 2 s |
| 3d | | Glider fram till gardinen | (bädden) | ca 2 s |
| 4 | Runda 2: gardinen | `ner` bakom gardinen → paus, gardinen svajar → `sida` ut vid kanten | *"Borta!"* … *"Var är lejonet?"* … *"Tittut!"* + skratt | ca 8 s |
| 4d | | Glider fram till täcket | (bädden) | ca 2,5 s (längst väg) |
| 5 | Runda 3: täcket | `ner` bakom täcket → paus, täcket andas → `ur` huvudet under täckets vänstra ände | *"Borta!"* … *"Var är lejonet?"* … *"Tittut!"* + skratt, sedan en liten gäspning | ca 9 s |
| 6 | Tassarna | Närbild, Lage framifrån. Tassarna upp framför ögonen → paus 2 s → ut åt sidorna. **3 gånger** | *"Var är lejonet?"* … *"Tittut!"* + skratt | ca 15 s |
| 7 | Hej då | Lage vinkar | *"Hej då!"* (`hej-da-N`) | ca 3 s |

**Lång version:** ca 60–65 s. **Short (9:16):** steg 1, 2, runda 1 (soffan), tassarna och hej då, ca 35 s.

Allt är glidningar upp, ner och åt sidan. Lage vänds aldrig och snurrar inte (`regler.md`). Hoppen är små och lugna.

## Data till motorn

`[x, y]` = sakens mittpunkt nertill, där den står på golvet, i en bild som är 1920×1080. Golvlinjen ligger på ca y 710 (två tredjedelar ner, som i skogen). Siffrorna är grova och justeras när bakgrunden finns.

```js
tittut({
  plats: 'hemma',
  figur: 'lejonet-lage',
  saker: {
    gardin: [380, 800],   // ca 440 × 800, hänger från fönstret ner till golvet
    soffa:  [980, 800],   // ca 780 × 420, ryggstödet högre än Lage
    tacke:  [1560, 810],  // ca 660 × 300, en lång mjuk hög, öppen ände åt vänster
  },
  rundor: [
    ['soffa', 'upp'],
    ['gardin', 'sida'],
    ['tacke', 'ur'],
  ],
  tassar: 3,
  kort: [0],
});
```

Storleken på Lage: ca 380 px hög och 360 px bred med manen (rutan 1024 i `cut/lejonet-lage-body.png`, bbox 166–927 × 88–929, skalad till ungefär Kanels höjd). Varje gömställe måste vara bredare än honom.

## Saknas

### Bakgrunden
- **`bakgrunder/hemma.md` finns inte**, och det finns ingen hemma- eller sovrumsmiljö i repot. Godnattsagan med Lage utspelar sig på **Nattkullen** (`bakgrunder/nattkullen.md`): en nattblå himmel och en grön kulle, utomhus och i 9:16. Den går inte att återanvända här. Det som går att låna därifrån är tankesättet (en tom platta och sakerna som egna urklipp) och nattfärgerna som idé för täcket.
- Behövs: `bakgrunder/hemma.md` med en tom platta, vägg och golv, som `skogen.md`. Förslag: ljust duvblå eller lavendel vägg (så att Lages gula kropp och orange man syns, alltså inte gult, orange eller beige), ljust trägolv, ett fönster till vänster där gardinen hänger, kanske en tavla eller en lampa långt ut vid kanterna. Mitten tom.
- Bilderna: `assets/bakgrunder/hemma/hemma.png`, 2752×1536 som skogen.

### Gömställena (urklipp som hör till platsen)
Som i skogen är de en del av platsen och räknas inte som nya saker. De läggs i `assets/bakgrunder/hemma-saker/` och får prompter i `hemma.md`:
- **`soffa.png`**: en rund, mjuk tvåsitssoffa framifrån med högt ryggstöd och två kuddar, en färg som inte är gul (till exempel mjukt blågrön eller rosa). Kudden behöver kanske vara en egen bit för att kunna guppa, annars skakar hela soffan lite.
- **`gardin.png`**: en lång gardin som hänger ner till golvet, ljus med prickar eller ränder. Den behöver en tydlig kant att titta fram bakom.
- **`tacke.png`**: en mjuk, lång täckeshög liggande på golvet, ljusblå med små vita stjärnor eller månar (en blinkning till Godnattsagan). Ena änden öppen med ett mjukt veck, mörkare inuti men inte svart, som stockens öppning.

### Lages tassar-pose
- `karaktarer/lejonet-lage.md` har ingen pose för tassarna (bara *i helikoptern* och *ligger och sover*). Lage är ✅ låst, så posen läggs till som ett nytt avsnitt i hans fil, utan att figuren ändras.
- **Troligen behövs ingen ny bild.** Armarna är egna ritade delar med vridpunkter i `assets/karaktarer/lejonet-lage/lejonet-lage-rigg-lemmar.json` (axlarna i (290, 590) och (734, 590), armen ca 205 px lång). Ögonen sitter i (413, 401) och (604, 398) enligt `avsnitt/014-grona-traktorn/scener/kit.js`. Avståndet från axel till öga är ca 225 px, så tassarna når nästan upp. Det behövs ett test: om de inte räcker kan armarna för just den här posen ritas lite längre med `lemmar/rita-armar.py`, eller tassarna läggas strax under ögonen så att de ändå täcker dem.
- Ansiktet ritas i kod, så han kan blunda bakom tassarna och titta upp vid *"Tittut!"*.

### Repliker (`produktion/youtube/tittut/ljud-att-gora.md`)
- **Saknas:** `lejon-hej.m4a`: `[excited] Hej lejonet!` och `lejon-var.m4a`: `[curious] Var är lejonet?`.
- **Finns redan:** `tittut-2`. **Saknas fortfarande** (gemensamt med Kanel-filmen): `borta-1` och `hej-da-1`.
- **Krock i röstbanken:** två av de delade varianterna passar inte Lage hemma. `borta-5` (*"Hon är borta…"*) säger *hon*, och Lage är *han*. `hej-da-4` (*"Vi ses i skogen."*) är fel plats. Eftersom varianten väljs via en hash av mappnamnet kan den här filmen få dem. Se frågorna nedan.

### Ljud
- **Platsljud hemma** saknas (skogen har `skogsljud`). Förslag till ElevenLabs SFX, ca 60 s som går runt: `a quiet cosy living room in the daytime, a soft clock ticking slowly far away, faint birds outside a closed window, very calm and soft, no music, no voice, no TV`.
- **Lages skratt:** `fniss` är Kanels. Lage behöver ett eget litet ljud efter *"Tittut!"*, till exempel ett djupt mjukt skratt eller hans mysiga rrroar som blir en gäspning (`karaktarer/lejonet-lage.md`). Förslag: `lejon-skratt` (`a big friendly cartoon lion giving a short soft deep happy chuckle, warm and gentle, not scary, no music`) och `gasp-lage` (`a big friendly cartoon lion giving a soft sleepy cosy yawn that starts like a tiny gentle roar, not scary, no music`).
- **`skakar`-ljud:** `prassel-tyg` till gardinen och täcket (`soft fabric rustling gently once, a curtain swaying, close, indoors, no music, no voice`). För kudden räcker kanske `duns` lågt.
- Finns redan: `pop`, `duns`, `swoosh`.

## Idéer och frågor till Sanna

1. **Varianterna `borta-5` och `hej-da-4`.** Ska de göras neutrala (till exempel *"Borta… var tog du vägen?"* och *"Hej då! Vi leker igen."*) eller tas bort ur hashen för filmer där de inte passar? Det gäller också Kaj, Lage och andra han-figurer framöver.
2. **Gäspningen efter runda 3.** Lage kommer ut ur täcket och gäspar lite innan tassarna. Det är hans personlighet och en mjuk övergång. Okej, eller håller vi rytmen helt ren?
3. **`glipa` i stället för `sida` vid gardinen?** En ny rörelse: gardinen är två halvor som glider isär en bit, och Lages ansikte syns i glipan. Bara glidningar, ingen vändning. Det är roligare men kräver gardinen i två delar och en rörelse till i motorn. Jag har valt `sida` för att återanvända det som finns.
4. **Överraskningen** (han kommer fram på ett annat ställe): ska den vara med? Förslag i så fall i runda 3: han går ner bakom täcket men tittar fram ovanför soffan. Annars hoppar vi över den i den här filmen.
5. **Väggfärgen:** duvblå eller lavendel? Båda står ut mot Lages gula och orange. Ska samma rum användas till andra figurer kan väggen behöva fungera för Kanels bruna också.
6. **Sovrum i stället för vardagsrum?** Med säng, gardin och täcke blir det mer godnatt. Men soffan är det tydligaste `upp`-gömstället och en säng kräver att täcket ligger på den, så jag föreslår vardagsrummet.
