# Storyboard 060 – Kaninen går på pottan (grind 5)

**Status:** animatiken 2026-11-27, byggd ur `../manus.md` (grind 1–3 godkända, ljuden valda bland befintliga) och Malins tagning 2026-11-27.

**Längd:** 3:56.6 med loggan (1 s), utan outro (räknat av bygg.mjs ur raderna).

En stillbild per rad i [`rader.mjs`](rader.mjs), ritade ur [`scen.html`](scen.html) med `node avsnitt/060-kaninen-gar-pa-pottan/storyboard/bygg.mjs` (`--animatik` gör också `animatik.mp4`). Bilderna i `frames/`, kontaktarket i `kontaktark.jpg`, korten i [`index.html`](index.html).

**Malins repliker är inspelade**: längderna i `ROST` är uppmätta efter normaliseringen (−3 dBFS, tystnaden klippt), ordtiderna för *"klart"* (`KLART`) och *"Schhh"* (`SCHHH`) med silencedetect. Takten som 059: 0,4 s extra luft per replik (`GLES`), slutet 0,9 s.

## Avsteg och val

- **Introt är 1 s logotyp** (platshållare här). Ritintrot är toarullen, och zoomen landar på rullen på golvet.
- **Den blå bollen ritas i kod** (klarblå med en vit rand, `rekvisita/boll-bla.md`): det finns ingen bild av den än. Röda bollen skulle krocka med den röda pottan.
- Uppställningen: handfatet med pallen till vänster, handduken på väggen, toaletten, pottan, lekytan, toarullen och badkarets vänstra del längst till höger.
- Bokens uppslag ritas i kod (moroten och en liten krit-kanin på pottan). Spolningen är `kran-1` lågpassad i animatiken.
- Röda streckade pilar och röd text visar rörelsen (bara i storyboarden).

## Raderna

<!-- tabell -->
| Bild | Tid | Längd | Plats, kamera | Malin säger (start) | I bild | Kaninen, ljud | Ansikte |
|---|---|---|---|---|---|---|---|
| [00](frames/00.jpg) | 0:00.0 | 1.0 s | Logga | – | Lilla Kritans logotyp, 1 s | – | – |
| [01a](frames/01a.jpg) | 0:01.0 | 3.2 s | Papperet, helbild | *"Kritan ritar …"* (0:01.4) | Kritan ritar toarullens kontur i ett drag (ca 2,8 s), sedan fliken och hålet i mitten | kritan ritar, skogsljud | – |
| [01b](frames/01b.jpg) | 0:04.2 | 4.8 s | Papperet, helbild | *"Hm … vad blir det nu?"* (0:04.2) | Konturen klar, kritan väntar bredvid och svajar (knackar aldrig): gisspaus 3 s | skogsljud | – |
| [01c](frames/01c.jpg) | 0:08.9 | 3.6 s | Papperet → zoom in | *"Oj! En toarulle!"* (0:09.4) | Den riktiga toarullen fylls i inifrån, krit-gnistor. Sista 0,8 s: zoom in i teckningen och in i badrummet, där rullen står på golvet på samma plats i bilden | `glitter` | – |
| [1](frames/1.jpg) | 0:12.5 | 4.7 s | Badrummet, helbild | *"Hej, kaninen! Hej, hej!"* (0:14.3) | Kaninen skuttar in från vänster till bollen, stannar och vinkar. Toarullen står på golvet, badkaret längst till höger. **Hej med vinkning** | `tass`, `kanin-hej-4` | jätteglad |
| [1b](frames/1b.jpg) | 0:17.2 | 6.2 s | Halvnära | *"Vad gör du, kaninen?"* (0:17.6) … *"Jaså, du leker med bollen!"* (0:20.5) | Kaninen tittar på oss. **Pausen:** puffar bollen med nosen, den rullar en bit | `hopp-mjuk`, `kanin-ny-jippi-1` | nyfiken → glad |
| [1r](frames/1r.jpg) | 0:23.4 | 0.8 s | Närbild (reaktionsslag) | – | Det glada ansiktet, öronen vippar | – | jätteglad |
| [2](frames/2.jpg) | 0:24.3 | 5.7 s | Närbild | *"Oj! Du vickar på dig. Behöver du kissa?"* (0:24.6) | Kaninen stannar mitt i leken och vickar från fot till fot, öronen spetsade. **Pausen:** tittar på bollen, skakar lite på huvudet | `tass` mjukt per vick, `kanin-ny-trumpen-1` (kort) | nyfiken → trumpen |
| [3a](frames/3a.jpg) | 0:29.9 | 5.0 s | Badrummet, helbild | *"Nähä? Du vill leka mer med bollen."* (0:30.7) | Kaninen puffar bollen igen (handlingen först). Bollen stöter till toarullen | `hopp-mjuk`, `rull`, `kanin-ny-fniss-1` | fnissig |
| [3b](frames/3b.jpg) | 0:34.9 | 1.6 s | Närbild toarullen (klipp) | – | Toarullen rullar lugnt över golvet, studsar mjukt mot badkaret och stannar bakom det: bara fliken sticker fram. Ingen replik | `rull` 1,6 s | – |
| [4](frames/4.jpg) | 0:36.5 | 4.7 s | Närbild | *"Oj, oj. Nu vickar du ännu mer!"* (0:36.9) | Kaninen vickar igen, snabbare, och tittar upp på oss med stora ögon. Fliken syns svagt bakom badkaret | `tass` per vick, `kanin-ny-fragande-1` | stora ögon |
| [4b](frames/4b.jpg) | 0:41.2 | 5.4 s | Halvnära | *"Jaha, du behöver kissa! Då går vi till pottan."* (0:42.0) | Kaninen nickar snabbt, öronen vippar, tittar mot pottan och skuttar runt bollen till dess högra sida (inte genom den) | `kanin-ny-ja-1` | glad |
| [5](frames/5.jpg) | 0:46.6 | 6.2 s | Halvbild → närbild bollen vid pottan | *"Lägg bollen bredvid pottan. Den kan vänta på dig."* (0:48.2) | Kaninen puffar bollen med foten, den rullar och stannar tätt intill pottan. Närbild på bollen vid pottan | `rull` kort, `kanin-gullig-5` | nyfiken |
| [6](frames/6.jpg) | 0:52.8 | 5.8 s | Halvnära | *"Ska du sätta dig på pottan nu?"* (0:53.1) … *"Ja, vad bra!"* (0:56.4) | Kaninen tittar på bollen, sedan på pottan. **Pausen:** nickar, öronen vippar | `kanin-ny-ja-2` | nyfiken → glad |
| [7](frames/7.jpg) | 0:58.6 | 3.9 s | Badrummet, helbild | *"Nu sitter du på pottan."* (1:00.0) | Kaninen skuttar upp och sätter sig på pottan (posen `sitter`, pottan framför benen) | `hopp-mjuk`, `landa-mjuk` | glad |
| [8](frames/8.jpg) | 1:02.6 | 4.3 s | Halvnära | *"Vänta, vänta … inget än."* (1:03.4) | Kaninen sitter, tittar ner, tittar upp, öronen lyssnar. På *"inget än"* sjunker öronen | tyst | lyssnar → öronen ner |
| [8r](frames/8r.jpg) | 1:06.9 | 1.4 s | Närbild (reaktionsslag) | – | Kaninen tittar frågande på oss | `kanin-gullig-7` (*hm-hm?*) | frågande |
| [9](frames/9.jpg) | 1:08.3 | 5.3 s | Halvnära | *"Hm. Det är svårt att sitta still och vänta."* (1:08.9) | Kaninen tittar mot bollen, lyfter sig lite från pottan och sätter sig igen, öronen på sned | `kanin-ny-trumpen-2` (kort) | trumpen |
| [10](frames/10.jpg) | 1:13.6 | 7.2 s | Utsnittet vid pottan | *"Titta! Kritan ritar något vid pottan."* (1:14.4) | Kritan kommer in uppe till höger och ritar en bok bredvid kaninen: pärmen, ryggen, moroten på framsidan. Väntar och svävar: gisspaus 3 s | kritan ritar, `kanin-ny-sniff-1` | nyfiken |
| [11](frames/11.jpg) | 1:20.8 | 6.6 s | Samma → närbild ögonen | *"En bok! En bilderbok! Varsågod, kaninen."* (1:21.4) | Boken fylls i inifrån, glimt. Kritan flyger ut. Kaninens ögon glittrar, öronen rakt upp. *Varsågod* | `glitter`, `kanin-ny-fortjust-1` | förtjust |
| [12](frames/12.jpg) | 1:27.4 | 3.3 s | Halvnära | *"Tack, kritan!"* (1:27.9) | Kaninen tittar på boken, sedan upp dit kritan flög ut. Nickar på *"Tack, kritan!"* | `kanin-tack-1` efter repliken | glad |
| [13](frames/13.jpg) | 1:30.7 | 6.9 s | Halvnära → närbild uppslaget | *"Du tittar i boken. Oj! En morot!"* (1:31.5) | Kaninen tar boken och öppnar den. Klipp till närbild på uppslaget: en stor morot | `blad`, `kanin-ny-mmm-1` | glad |
| [13b](frames/13b.jpg) | 1:37.6 | 6.8 s | Närbild kaninen bakom boken | *"Tycker du om morötter?"* (1:37.9) … *"Ja, morötter är goda!"* (1:41.0) | **Pausen:** kaninen nickar två gånger, nosen puffar | `kanin-ny-ja-3` | glad |
| [14](frames/14.jpg) | 1:44.4 | 4.7 s | Halvnära | *"Vänta, vänta … inget än."* (1:45.2) | Kaninen sänker boken lite, sitter stilla, öronen lyssnar. På *"inget än"* sjunker öronen, kaninen rycker på axlarna och tittar i boken igen | tyst, bara badrumsljudet | lyssnar → öronen ner |
| [15](frames/15.jpg) | 1:49.2 | 7.1 s | Närbild boken | *"Du vänder blad. Titta! En liten kanin på en potta."* (1:50.1) | Sidan vänds. Nytt uppslag: en liten kanin som sitter på en röd potta | `blad`, `kanin-gullig-2` | förtjust |
| [15b](frames/15b.jpg) | 1:56.2 | 3.3 s | Närbild | *"Precis som du!"* (1:56.6) | Kaninen tittar på bilden, sedan ner på sin egen potta, sedan på oss. Fnissar | `kanin-ny-fniss-2` | fnissig |
| [16](frames/16.jpg) | 1:59.5 | 4.2 s | Halvnära → push in mot närbild | *"Vänta, vänta …"* (2:00.7) | **Annorlunda än 8 och 14:** kaninen lägger ner boken och sitter helt stilla, kameran glider långsamt in. Öronen reser sig sakta, ögonen blir stora. Badrumsljudet tonas ner. Efter repliken 1 s tyst, sedan *plink*: förvånat ansikte, öronen rakt upp | nästan tyst, `plink` (`droppar-1`) efter pausen | stilla → förvånad |
| [16b](frames/16b.jpg) | 2:03.8 | 2.0 s | Närbild (reaktionsslag) | – | Ögonen halvslutna, öronen sjunker, mysig suck. Sedan öppna jätteglada ögon | `kanin-gullig-4` (mysig suck) | lättad → jätteglad |
| [17](frames/17.jpg) | 2:05.8 | 4.8 s | Halvnära | *"Ja! Du kissade i pottan!"* (2:06.2) | Kaninen ler stort, öronen vippar | `kanin-ny-jippi-2`, `tindra-3` | jätteglad |
| [17b](frames/17b.jpg) | 2:10.6 | 3.4 s | Närbild | *"Så bra, kaninen!"* (2:11.0) | Kaninen sträcker på sig, stolt, ett litet lugnt skutt på pottan | `kanin-ny-ja-1` | stolt |
| [18](frames/18.jpg) | 2:13.9 | 6.9 s | Halvbild | *"Nu behöver du papper. Men … var är toarullen?"* (2:14.5) | Kaninen lägger boken bredvid sig och tittar på golvet där rullen stod: tomt. Tittar åt vänster, sedan åt höger | `kanin-ny-fragande-2` | frågande |
| [19a](frames/19a.jpg) | 2:20.8 | 2.0 s | Badrummet, helbild | *"Kan du hjälpa kaninen? Var är toarullen?"* (2:21.2) | *Kan du hjälpa kaninen?* Klipp efter 2 s | tyst | frågande |
| [19b](frames/19b.jpg) | 2:22.8 | 6.7 s | Närbild badkarets ände (klipp) | – | Pappersfliken och en skymt av rullen bakom badkaret. Paus 5 s; efter 3 s skimrar fliken svagt | tyst, `glimt-2` svagt | – |
| [20](frames/20.jpg) | 2:29.5 | 4.8 s | Samma → klipp till kaninen | *"Ja, där! Bakom badkaret!"* (2:29.9) | Fliken skimrar tydligt. Klipp till kaninen: öronen upp, glad | `glimt-1`, `kanin-ny-fortjust-2` | förtjust |
| [21](frames/21.jpg) | 2:34.3 | 5.5 s | Badrummet, helbild | *"Du hämtar toarullen. Hopp, hopp!"* (2:35.5) | Kaninen kliver av pottan, skuttar till badkaret, rullen glider fram och upp i tassen, kaninen skuttar tillbaka | `tass`, `hopp-mjuk`, `rull` kort | glad |
| [22](frames/22.jpg) | 2:39.8 | 7.5 s | Halvnära, från magen och upp | *"Nu torkar du dig med papperet. Torka, torka … klart!"* (2:40.4) | Kaninen river av en lapp, tassen går ner ur bild och upp igen. **På *"klart"*:** kaninen nickar | `ritsch`, `kanin-ny-ja-2` | glad |
| [23](frames/23.jpg) | 2:47.3 | 4.3 s | Badrummet, helbild | *"Nu tömmer du pottan i toaletten."* (2:48.3) | Kaninen lyfter pottan, skuttar till toaletten och tippar pottan över kanten. Ställer tillbaka den | `hopp-mjuk`, `porl` (kort, tyst), `landa-mjuk` | glad |
| [24](frames/24.jpg) | 2:51.6 | 5.0 s | Halvnära vid toaletten | *"Och så spolar du. Schhh!"* (2:52.3) | Kaninen trycker på knappen. Rycker till av ljudet, öronen upp. Närbild: fnissar | `klick` (`lampa-klick-4`), `spol` (`kran-1` lågpassad), `kanin-ny-fniss-3` | förvånad → fnissig |
| [24b](frames/24b.jpg) | 2:56.6 | 3.0 s | Samma | *"Hej då, kisset!"* (2:56.9) | Kaninen vinkar kort åt toaletten | – | glad |
| [25](frames/25.jpg) | 2:59.6 | 7.0 s | Halvnära vid handfatet | *"Nu tvättar du tassarna med tvål och vatten. Tvätta, tvätta!"* (3:00.6) | Kaninen på pallen bakom handfatet, kranen rinner, tvålen mellan tassarna, skumtussen växer | `tass`, `kran`, `skrubb` | glad |
| [26](frames/26.jpg) | 3:06.6 | 6.1 s | Samma → närbild tassarna | *"Och torkar tassarna på handduken. Så!"* (3:07.6) | Kranen stängs, tre droppar. Handduken glider från kroken till tassarna, gnider och tillbaka. Närbild: rena tassar, kaninen myser | `droppar` ×3, `handduk-gnugg`, `kanin-gullig-4b` | myser |
| [27](frames/27.jpg) | 3:12.7 | 6.7 s | Badrummet, helbild → pottan | *"Titta! Kritan ritar igen."* (3:13.7) | Kaninen skuttar ner till pottan. Kritan flyger in och ritar en stjärna ovanför pottan: fem uddar i ett drag. Väntar och svävar: gisspaus 3 s | kritan ritar, `kanin-ny-sniff-2` | nyfiken |
| [28](frames/28.jpg) | 3:19.4 | 5.7 s | Samma → närbild | *"En stjärna! Ett klistermärke till dig."* (3:20.0) | Stjärnan fylls i gul, krit-gnistor. Den glider ner i kaninens tass. Kaninens ögon glittrar | `glitter`, `tindra-4`, `kanin-ny-fortjust-1` | förtjust |
| [28b](frames/28b.jpg) | 3:25.0 | 7.5 s | Halvnära → närbild stjärnan på pottan | *"Var vill du sätta stjärnan?"* (3:25.3) … *"På pottan! Bra idé!"* (3:28.6) | **Pausen:** kaninen tittar på stjärnan, sedan på pottan, och pekar mot den. Efter repliken trycker kaninen fast stjärnan på pottans framsida. Glimt | `kanin-ny-ja-3`, `klistra`, `glimt-1` | glad |
| [28c](frames/28c.jpg) | 3:32.5 | 3.4 s | Halvnära | *"Tack, kritan!"* (3:33.1) | Kaninen tittar upp mot kritan, som flyger ut uppe till höger | `kanin-tack-2` | glad |
| [29](frames/29.jpg) | 3:35.9 | 8.3 s | Badrummet, helbild | *"Vill du leka med bollen igen?"* (3:36.3) … *"Ja, bollen har väntat på dig!"* (3:39.5) | Kaninen tittar på bollen bredvid pottan. **Pausen:** glatt ja. Efter Malins reaktion puffar kaninen bollen och gör ett lugnt glatt skutt (leker 2 s) | `kanin-ny-jippi-1`, `hopp-mjuk`, `kanin-ny-fniss-4` | jätteglad |
| [30](frames/30.jpg) | 3:44.3 | 5.0 s | Halvbild | *"Hej då, kaninen! Hej då, pottan!"* (3:44.7) | Kaninen vinkar (armen bakom kroppen, snett ut förbi kanten), pottan med stjärnan och bollen bredvid. **Hej då med vinkning** | `kanin-hejda-2` | jätteglad |
| [31](frames/31.jpg) | 3:49.2 | 5.4 s | Halvbild | *"Hej då! Vi ses snart! [giggles]"* (3:49.6) | Kaninen vinkar klart och sänker armen | `kanin-hejda-1` | glad |
| [32](frames/32.jpg) | 3:54.6 | 2.0 s | Kritirisen | – | Kritirisen drar ihop sig runt kaninen, pottan med stjärnan och bollen. 0,6 s svart | – | glad |
<!-- /tabell -->
