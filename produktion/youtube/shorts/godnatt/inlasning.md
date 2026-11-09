# Godnattsagorna – texter och inläsning

Gäller sömnsagorna efter Lage (format: `format/shorts.md#godnattsagan`). Texten i bild är exakt samma ord som inläsningen, utan taggarna.

**I bild:** högst två rader åt gången, med luft mellan raderna. `//` betyder att de två första raderna tonas ut och nästa par tonas in, ungefär när Malin kommer dit. Raderna i ett par står ihop.

**Godnatt-rutinen:** mjölk, potta, godnatt, gäspa, ner på kudden med nallen, tungt och mjukt, andas och sova. Saker: mjölkglas, potta, kudde och nallen (`rekvisita/nalle.md`). Fjärilen hoppar över pottan och landar på sitt grässtrå i stället för en kudde.

## Inläsningen (ElevenLabs, Malin)

- **Modell:** Eleven v3. Taggarna inom hakparentes läses inte upp, de styr rösten. Med Multilingual v2 tar du bort taggarna och sätter hastigheten till 0,9 på sida 1 och ner till 0,75 på sista sidan.
- **Ingen viskning i de nya sagorna** (kon, nyckelpigan, ankan, grodan): `[whispers]` blev för luftigt, så de tystaste raderna har `[quietly]` i stället. Rösten blir lägre men är kvar.
- **Inställningar:** stabilitet ca 0,6 (v3: *Natural*), style 0.
- **En tagning per saga** för de nya sagorna (kon, nyckelpigan, ankan, grodan): klistra in hela blocket, generera, och dela tagningen med `verktyg/dela-tagning.py` och sagans `sidor.txt`. Äldre sagor: **en tagning per sida**, sparad som `sida-1.m4a`, `sida-2.m4a` … i sagans mapp, till exempel `produktion/youtube/shorts/godnatt/zebran-zebbe/sida-1.m4a`.
- Sida 4, *"Godnatt, måne."*, är samma i alla sagor. Spela in den en gång och kopiera filen.

## Zebran, vid dammen (`zebran-zebbe/`)

```
1  [softly] Det är kväll vid dammen. … Zebran är sömnig. … [whispers] Är du också sömnig?
2  [softly] Zebran dricker sin mjölk. … Mmm, god mjölk.
3  [softly] Sen pottan. … [warmly] Sådär, bra!
4  [softly] Godnatt, måne.
5  [softly] Godnatt, näckros.
6  [softly] Godnatt, vass.
7  [softly] Zebran räknar sina ränder. … En … [slowly] två … [very slowly] tre … [yawns] Zebran gäspar. Gääsp. … [whispers] Kan du också gäspa?
8  [slowly] Zebran kryper ner på kudden. … Nallen får sova bredvid.
9  [slowly] Benen blir tunga. … Så tunga. … Vattnet är stilla. … [whispers] Allt är så mjukt.
10 [slowly] Zebran andas in … [exhales] och ut. … In … [exhales] och ut. … [whispers] Kan du också?
11 [whispers] Månen blundar. … Näckrosen blundar. … Vassen blundar. … Nallen blundar.
12 [whispers] Zebran blundar. … Nu sover zebran. … Godnatt, zebra. … Godnatt, du.
```

I bild: 1 *Det är kväll vid dammen. / Zebran är sömnig. // Är du också sömnig?* · 7 *Zebran räknar sina ränder. / En … två … tre … // Zebran gäspar. Gääsp. / Kan du också gäspa?* · 9 *Benen blir tunga. Så tunga. / Vattnet är stilla. // Allt är så mjukt.* · 10 *Zebran andas in … och ut. / In … och ut. // Kan du också?* · 11 *Månen blundar. / Näckrosen blundar. // Vassen blundar. / Nallen blundar.* · 12 *Zebran blundar. / Nu sover zebran. // Godnatt, zebra. / Godnatt, du.* Övriga sidor är 1–2 rader.

## Lammet, på bondgården (`lammet-ludde/`)

```
1  [softly] Det är kväll på bondgården. … Lammet är sömnigt. … [whispers] Är du också sömnig?
2  [softly] Lammet dricker sin mjölk. … Mmm, god mjölk.
3  [softly] Sen pottan. … [warmly] Sådär, bra!
4  [softly] Godnatt, måne.
5  [softly] Godnatt, lada.
6  [softly] Godnatt, hö.
7  [softly] Lammet nickar till. … Pling, säger bjällran. … [yawns] Lammet gäspar. Gääsp. … [whispers] Kan du också gäspa?
8  [slowly] Lammet kryper ner på kudden. … Nallen får sova bredvid.
9  [slowly] Huvudet blir tungt. … Så tungt. … Höet är mjukt. … [whispers] Allt är så mjukt.
10 [slowly] Lammet andas in … [exhales] och ut. … In … [exhales] och ut. … [whispers] Kan du också?
11 [whispers] Månen blundar. … Ladan blundar. … Höet blundar. … Nallen blundar.
12 [whispers] Lammet blundar. … Nu sover lammet. … Godnatt, lamm. … Godnatt, du.
```

I bild: 1 *Det är kväll på bondgården. / Lammet är sömnigt. // Är du också sömnig?* · 7 *Lammet nickar till. / Pling, säger bjällran. // Lammet gäspar. Gääsp. / Kan du också gäspa?* · 9 *Huvudet blir tungt. Så tungt. / Höet är mjukt. // Allt är så mjukt.* · 10, 11 och 12 delas som hos zebran.

## Fjärilen, på ängen (`fjarilen-fia/`), 11 sidor

```
1  [softly] Det är kväll på ängen. … Fjärilen är sömnig. … [whispers] Är du också sömnig?
2  [softly] Fjärilen dricker sin mjölk. … Mmm, god mjölk.
3  [softly] Godnatt, måne.
4  [softly] Godnatt, blommor.
5  [softly] Godnatt, moln.
6  [softly] Fjärilen viker ihop sina vingar. … Sakta, sakta. … [yawns] Fjärilen gäspar. Gääsp. … [whispers] Kan du också gäspa?
7  [slowly] Fjärilen landar på ett grässtrå. … Nallen får sova bredvid.
8  [slowly] Antennerna blir tunga. … Så tunga. … Grässtrået gungar. … [whispers] Allt är så mjukt.
9  [slowly] Fjärilen andas in … [exhales] och ut. … In … [exhales] och ut. … [whispers] Kan du också?
10 [whispers] Månen blundar. … Blommorna blundar. … Molnet blundar. … Nallen blundar.
11 [whispers] Fjärilen blundar. … Nu sover fjärilen. … Godnatt, fjäril. … Godnatt, du.
```

Här är "Godnatt, måne." sida 3. I bild: 6 *Fjärilen viker ihop sina vingar. / Sakta, sakta. // Fjärilen gäspar. Gääsp. / Kan du också gäspa?* · 8 *Antennerna blir tunga. Så tunga. / Grässtrået gungar. // Allt är så mjukt.*

## Leoparden, i skogen (`leoparden-lova/`)

```
1  [softly] Det är kväll i skogen. … Leoparden är sömnig. … [whispers] Är du också sömnig?
2  [softly] Leoparden dricker sin mjölk. … Mmm, god mjölk.
3  [softly] Sen pottan. … [warmly] Sådär, bra!
4  [softly] Godnatt, måne.
5  [softly] Godnatt, träd.
6  [softly] Godnatt, lövhög.
7  [softly] Leoparden vill springa. … Vips! … [slowly] Nej, inte nu. … [yawns] Leoparden gäspar. Gääsp. … [whispers] Kan du också gäspa?
8  [slowly] Leoparden kryper ner på kudden. … Nallen får sova bredvid.
9  [slowly] Tassarna blir tunga. … Så tunga. … Löven är mjuka. … [whispers] Allt är så mjukt.
10 [slowly] Leoparden andas in … [exhales] och ut. … In … [exhales] och ut. … [whispers] Kan du också?
11 [whispers] Månen blundar. … Trädet blundar. … Lövhögen blundar. … Nallen blundar.
12 [whispers] Leoparden blundar. … Nu sover leoparden. … Godnatt, leopard. … Godnatt, du.
```

I bild: 7 *Leoparden vill springa. / Vips! … Nej, inte nu. // Leoparden gäspar. Gääsp. / Kan du också gäspa?* · 9 *Tassarna blir tunga. Så tunga. / Löven är mjuka. // Allt är så mjukt.*

## Kaninen, under äppelträdet (`kaninen-kanel/`)

```
1  [softly] Det är kväll under äppelträdet. … Kaninen är sömnig. … [whispers] Är du också sömnig?
2  [softly] Kaninen dricker sin mjölk. … Mmm, god mjölk.
3  [softly] Sen pottan. … [warmly] Sådär, bra!
4  [softly] Godnatt, måne.
5  [softly] Godnatt, äppelträd.
6  [softly] Godnatt, äpplen.
7  [softly] Ett, två, tre … hopp! … [slowly] Det blev ett jättelitet hopp. … [yawns] Kaninen gäspar. Gääsp. … [whispers] Kan du också gäspa?
8  [slowly] Kaninen kryper ner på kudden. … Nallen får sova bredvid.
9  [slowly] Öronen blir tunga. … Så tunga. … Gräset är mjukt. … [whispers] Allt är så mjukt.
10 [slowly] Kaninen andas in … [exhales] och ut. … In … [exhales] och ut. … [whispers] Kan du också?
11 [whispers] Månen blundar. … Trädet blundar. … Äpplena blundar. … Nallen blundar.
12 [whispers] Kaninen blundar. … Nu sover kaninen. … Godnatt, kanin. … Godnatt, du.
```

I bild: 1 *Det är kväll under äppelträdet. / Kaninen är sömnig. // Är du också sömnig?* · 7 *Ett, två, tre … hopp! / Det blev ett jättelitet hopp. // Kaninen gäspar. Gääsp. / Kan du också gäspa?* · 9 *Öronen blir tunga. Så tunga. / Gräset är mjukt. // Allt är så mjukt.*

## Olika sorters sagor (från 2026-11-07)

Sagorna ska inte vara samma mall. Varje saga har en egen sort, och bara en eller två sidor frågar barnet något. Vällingen i flaskan ersätter mjölken från och med nu. Granskat av Kimi 2026-11-07.

| Saga | Sort | Barnet bjuds in att |
|---|---|---|
| Kon | omvända roller: kon nattar nallen | nynna |
| Ankan | vaggsaga: vattnet gungar, gupp … gupp | gäspa |
| Grodan | lyssnasaga: ljuden somnar ett i taget | lyssna |
| Lammet (färden) | en liten färd: först hit … sen hit … sen hem | titta ("Ser du kudden?") |
| Nyckelpigan | rutinsagan som de äldre (godnatt till saker, tungt, andas, alla blundar) | gäspa och andas |

Idé till nästa sort (Kimi): **en liten färd**, figuren ligger på fel ställe och går i tre lugna steg till sin bädd: *först hit … sen hit … sen hem.*

## Kon nattar nallen, på äppelbacken (`kon-kajsa/`), 15 sidor

Omskriven 2026-11-09 (Sanna: mindre text, en röd tråd, tydligt mål). Kort intro (kon, nallen, de har lekt, kväll), målet (*Dags att sova, nallen!* – *Nej!*), tre försök med omkvädet *Sover du, nallen? – Nej!* (välling, gunga, nynna), tredje gången en gäspning, och slutet. Texten i bild är orden utan taggarna, *Nej! säger nallen* med talstreck.

```
[softly] Det här är kon.

[softly] Och det här är nallen.

[warmly] De har lekt hela dagen.

[softly] Nu är det kväll.

[gently] Dags att sova, nallen!

[playfully] Nej! säger nallen.

[softly] Vill du ha välling? … Mmm.

[gently] Sover du, nallen? … [playfully] Nej!

[softly] Kon gungar nallen. … Fram … och tillbaka.

[gently] Sover du, nallen? … [playfully] Nej!

[softly] Kon nynnar. … Mmm … mmm.

[quietly] Sover du, nallen? … [yawns] Gääsp.

[slowly] Ner på kudden.

[quietly] Nu sover nallen.

[quietly] Och kon också. … Sov gott.
```

Delas med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/shorts/godnatt/kon-kajsa/sidor.txt produktion/youtube/shorts/godnatt/kon-kajsa`.

## Ankan gungar, vid bryggan (`ankan-agda/`)

Ankan har inget referensark än.

```
[softly] Det är kväll vid bryggan. … Ankan är sömnig. … [quietly] Är du också sömnig?

[softly] Ankan dricker välling ur sin flaska. … Mmm, god välling.

[softly] Godnatt, måne.

[softly] Ankan glider ut på vattnet. … Nära bryggan. … Sakta, sakta.

[gently] Vattnet gungar ankan. … Gupp … gupp. … Gupp … gupp.

[softly] En liten våg kommer. … Gupp. … [gently] En liten våg till. … Gupp.

[yawns] Ankan gäspar. Gääsp. … [quietly] Kan du också gäspa?

[slowly] Ankan stoppar näbben under vingen. … Så varmt. … Så mjukt.

[slowly] Vattnet gungar … gupp … [very slowly] gupp … [quietly] gupp.

[slowly] Ankan andas med vattnet. … In … [exhales] och ut. … In … [exhales] och ut.

[quietly] Vattnet är stilla. … Månen är stilla. … Ankan är stilla.

[quietly] Nu sover ankan. … Godnatt, anka. … Godnatt, du.
```

Delas med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/shorts/godnatt/ankan-agda/sidor.txt produktion/youtube/shorts/godnatt/ankan-agda`.

## Grodan lyssnar, vid sjön (`grodan-gurra/`), 9 sidor

Omskriven 2026-11-09 (Sanna: mindre text, en röd tråd, tydligt mål). Grodan vill sova men något låter. Samma mönster varje sida, *X, säger Y. Godnatt, Y.*, från högt till tyst: vågorna, vinden, båten, flaskan (vällingen) och sist grodans eget kväk. Sedan *Nu är allt tyst* och *Grodan sover. Sov gott.* Kudden och nallen står på ön från början: sängen är redo.

```
[softly] Grodan vill sova.

[softly] Men något låter. … [gently] Lyssna!

[softly] Plask, säger vågorna. … [gently] Godnatt, vågor.

[softly] Schhh, säger vinden. … [gently] Godnatt, vind.

[softly] Knirr, säger båten. … [gently] Godnatt, båt.

[softly] Glupp, säger flaskan. … [gently] Godnatt, flaska.

[quietly] Kväk, säger grodan. … Godnatt, groda.

[slowly] Nu är allt tyst.

[quietly] Grodan sover. … Sov gott.
```

Delas med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/shorts/godnatt/grodan-gurra/sidor.txt produktion/youtube/shorts/godnatt/grodan-gurra`.

## Nyckelpigan, bland molnen (`nyckelpigan-nicke/`), 11 sidor

Inläst 2026-11-07 och delad i `sida-1.m4a` … `sida-11.m4a`. Sida 2 säger mjölk, och det får vara kvar (Sanna 2026-11-07): texten i filmen säger också mjölk, och vällingflaskan visas. Den här sagan är den enda med mjölk.

Resten av texten står i `nyckelpigan-nicke/sidor.txt`.

## Lammet går hem, vid badplatsen (`lammet-ludde-fard/`), 11 sidor

En liten färd. Lammet ligger i sanden, som kittlar, och går i tre lugna steg hem till kudden och nallen: först till vattnet, sen till trädet, sen hem. Sida 10 upprepar vägen. Plats: badplatsen på natten (sanden, sjön, ett träd).

```
[softly] Det är kväll vid badplatsen. … Lammet är sömnigt. … Men lammet ligger i sanden.

[softly] Sanden kittlar. … Kittel, kittel. … [gently] Här kan lammet inte sova.

[softly] Godnatt, måne.

[softly] Lammet dricker välling ur sin flaska. … Mmm. … Nu ska lammet gå hem.

[softly] Först hit. … Tripp, tripp. … Till vattnet. … [gently] Godnatt, vatten.

[softly] Sen hit. … Tripp, tripp. … Till trädet. … [gently] Godnatt, träd.

[slowly] Sen hem. … Tripp … tripp. … Där är kudden. … Och nallen. … [quietly] Ser du kudden?

[yawns] Lammet gäspar. Gääsp. … [slowly] Så skönt att vara hemma.

[slowly] Lammet lägger sig på kudden. … Så mjukt. … Här kan lammet sova.

[slowly] Först sanden … [very slowly] sen vattnet … sen trädet … [quietly] och nu hem.

[quietly] Lammet blundar. … Nu sover lammet. … Godnatt, lamm. … Godnatt, du.
```

Delas med `python3 verktyg/dela-tagning.py <tagning> produktion/youtube/shorts/godnatt/lammet-ludde-fard/sidor.txt produktion/youtube/shorts/godnatt/lammet-ludde-fard`.
