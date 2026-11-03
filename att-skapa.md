# Att skapa

Allt som saknas innan avsnitt 001 och 002 kan göras, och sedan resten. Bocka av när filen ligger i `assets/` (eller `produktion/`). Prioritet: **1** behövs till avsnitt 001, **2** till avsnitt 002, **3** senare.

Varje figur behöver tre saker: ett **referensark** (figuren framifrån, låst utseende), en **ansiktslös** version (ögon och mun ritas i kod) och **delar** (armar, ben och öron som egna bilder så att de går att animera). Se Kaninen Kanel för hur delarna görs.

## Format (görs en gång, `assets/format/`)

| Prio | Vad | Klar |
|---|---|---|
| 1 | `logotyp.png`: *Lilla Kritan* i kritbokstäver, genomskinlig bakgrund | ☐ |
| 1 | `papper.png`: krämvitt papper med struktur | ☐ |
| 1 | `titelkort-mall.png`: titelkort utan text | ☐ |
| 1 | Kritan som ritar (en krita utan ansikte, egen bild) | ☐ |
| 1 | `intro.mov`, `outro.mov`, `kritsvep.mov` | ☐ |
| 1 | `jingel-intro.wav`, `jingel-outro.wav` | ☐ |
| 2 | Regn: grått moln och droppar som eget lager | ☐ |

## Platser (`assets/bakgrunder/`)

Ingen plats har en bild än. Piloten har plattor i samma teknik men med andra väggfärger.

| Prio | Plats | Väggfärg | Avsnitt | Klar |
|---|---|---|---|---|
| 1 | Busshållplatsen | lila `#8E44C9` | 001 | ☐ |
| 1 | Bondgården (fjärilar och humla målade på väggen) | solgul `#F6C21C` | 001 | ☐ |
| 2 | Vägen (sömlös i sidled, för körscener) | ljusgrön `#A6D86B` | 002 | ☐ |
| 2 | Ängen | himmelsblå `#4FB3E8` | 002 | ☐ |
| 3 | Äppelträdet | orange `#F26B1D` | idé | ☐ |
| 3 | Dammen | turkos `#2BB7A6` | idé | ☐ |
| 3 | Glasskiosken | rosa `#F06EAA` | – | ☐ |
| 3 | Himlen (inget golv) | himmelsblå | idé | ☐ |

## Figurer (`assets/karaktarer/<figur>/`)

"Från piloten" betyder att det finns en liknande figur i `produktion/` att utgå från eller jämföra med.

| Prio | Figur | Avsnitt | Från piloten | Ark | Ansiktslös | Delar |
|---|---|---|---|---|---|---|
| 1 | Bussen Bettan | 001, 002 | `bus-red` | ☐ | ☐ | ☐ |
| 1 | Musen Mille | 001, 002 | `mouse-crayon` | ☐ | ☐ | ☐ |
| 1 | Kycklingen Pip | 001, 002 | `duckling-crayon` (form) | ☐ | ☐ | ☐ |
| 2 | Björnen Bulle | 002 | `bear-crayon` | ☐ | ☐ | ☐ |
| 2 | Igelkotten Igge (statist) | 002 | – | ☐ | ☐ | ☐ |
| 2 | Traktorn Tuff (statist) | 002 | – | ☐ | ☐ | ☐ |
| 3 | Kaninen Kanel | idé | – | ☑ | ☑ | ☑ |
| 3 | Humlan Humle | 001 (bakgrund) | `bee-crayon` | ☐ | ☐ | ☐ |
| 3 | Fjärilen Fia | 001 (bakgrund) | – | ☑ | ☑ | ☑ |
| 3 | Ankan Agda | – | `duckling-crayon` | ☐ | ☐ | ☐ |
| 3 | Flygplanet Pella | idé | – | ☐ | ☐ | ☐ |
| 3 | Bilen Brum | idé | – | ☐ | ☐ | ☐ |
| 3 | Grodan Gurra | idé | – | ☐ | ☐ | ☐ |
| 3 | Lammet Ludde | – | – | ☑ | ☑ | ☑ |
| 3 | Hunden Hugo, Hästen Hulda, Katten Kaj | – | – | ☐ | ☐ | ☐ |

## Nya poser (från bildlistorna)

| Prio | Pose | Avsnitt | Klar |
|---|---|---|---|
| 1 | Bettan som glassbuss: glass på taket, lucka öppen | 001 | ☐ |
| 1 | Mille håller en rosa glass | 001 | ☐ |
| 1 | Pip sträcker fram en gul glass | 001 | ☐ |
| 2 | Bulle knackar på (arm i delarna) | 002 | ☐ |
| 2 | Mille i bussfönstret (huvud och axlar) | 002 | ☐ |
| 2 | Pip med vingarna i luften | 002 | ☐ |
| 2 | Igge går och vinkar | 002 | ☐ |
| 2 | Tuff plöjer en liten åker | 002 | ☐ |
| 2 | Bettan med vindrutetorkare | 002 | ☐ |

Poser som bara är armar eller ögon görs i kod med delarna, inte som nya bilder.

## Rekvisita (`rekvisita/` och `assets/rekvisita/`)

Rekvisita skapas tillsammans (se `CLAUDE.md`). Piloten har redan buss, hus, bollar, hink, blomma och mjölkflaska.

| Prio | Sak | Avsnitt | Klar |
|---|---|---|---|
| 1 | Glass i fyra färger | 001 | ☐ |
| 1 | Glassboll i gräset | 001 | ☐ |
| 1 | Kritteckning: glass och buss | 001 | ☐ |
| 2 | Hus (färgas om till rött och gult; piloten har `house-red`) | 002 | ☐ |
| 2 | Kalasbord med tårta och tre ljus | 002 | ☐ |
| 2 | Lastbil utan ansikte | 002 | ☐ |
| 2 | Kritteckning: buss | 002 | ☐ |
| 3 | Äpple, morot (Kanel) | idé | ☐ |
