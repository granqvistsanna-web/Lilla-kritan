# Granskning: Kritans ABC, prov 3 (A)

Granskad 2026-11-18: `abc-prov.mp4` (1:53) i stillbilder varannan sekund, ljudet transkriberat med whisper, och tidslinjen läst ur `index.html`. Jag har inte kunnat lyssna på blandningen, så allt om ljudnivåer är räknat ur koden och ska provlyssnas.

Filmen är äldre än koden: i filmen har klossen fortfarande ett B på sidan och en gul bokstav på toppen. Koden har redan bara A. Det behövs alltså en ny rendering oavsett.

**Så här är filmen byggd i dag**

| Del | Tid | Längd |
|---|---|---|
| Klossen och A:et | 0:00–0:07 | 7 s |
| Apa | 0:07–0:35 | 28 s |
| Apelsin | 0:35–0:50 | 15 s |
| Ananas | 0:50–1:02 | 12 s |
| Vilken ska bort? | 1:02–1:38 | 36 s |
| Alla tillsammans | 1:38–1:53 | 15 s |

## 1. Det som fungerar

- **Klossen som faller och får sitt A** är en tydlig, egen bild för serien. Den går att känna igen i en miniatyr.
- **Gissa-motorn återanvänds.** Tiderna räknas ur replikernas längd, så en ny bokstav är mest data.
- **Teckningen blir den riktiga bilden och sedan ett klistermärke** är en bra kedja: gissa, se, samla.
- **Klossen hoppar på varje a-ord.** Det knyter ordet till bokstaven utan att någon förklarar.
- **Bilen tutar och kör iväg.** Ett roligt slut på leken, och *"B-b-bil"* följer regeln om stoppljud.
- **Pausen på 4 s** före varje svar hålls.
- **Slutbilden** (klossen över tre klistermärken) är ren och fungerar som miniatyr.

## 2. Problem, i rangordning

### 1. A-ljudet drunknar i kritljudet (0:01–0:04)
*"Lyssna! Aaaa."* sägs samtidigt som kritan ritar A:et, med tre kritljud på volym 4 under hela repliken. Whisper hör bara *"Lyssna!"*. Det är filmens viktigaste ljud. Gesten från Ljudjakten (gapa stort) är också borta, så barnet får aldrig säga ljudet själv.

**Förslag:** rita först, säg sedan. *"Lyssna!"*, kritan ritar A:et (bara kritljud), pling, och sedan *"Aaaa."* i tystnad medan klossen hoppar. Direkt efter: *"Kan du gapa stort? Aaaa!"* och 2,5 s paus. Den repliken finns redan inspelad (`a02-t1-lang`). `a01` klipps i två (*"Lyssna!"* och *"Aaaa."*), så inget behöver spelas in.

### 2. Bara apan får hela mönstret (0:44–0:50 och 0:58–1:02)
Apan får *"Säg du: apa!"*, paus och *"Ja! Apa börjar på bokstaven A."* Apelsinen och ananasen får bara namnet och blir klistermärken 1,5 s senare. Barnet säger alltså ett ord av tre, och kopplingen till A görs en gång. Delarna blir också ojämna (28, 15 och 12 s), så filmen känns som att den tappar fart.

**Förslag:** samma fem slag för alla tre ord, varje gång i samma ordning: utdraget ord, *"En apelsin!"*, saken gör sitt, *"Säg du: apelsin!"* med 2,5 s paus, *"Apelsin börjar också på A!"* medan klossen hoppar. Det är upprepningen som gör att barnet lär sig leken, och det är samma kod för varje ord.

### 3. Vilken ska bort? börjar med 11 s utan röst och en fråga som inte säger vad barnet ska leta efter (1:02–1:38)
- 1:02 säger Malin *"Nu leker vi: vilken ska bort?"*, innan rutnätet finns. Sedan ritas rutnätet, tre klistermärken flyttar in och bilen ritas, 1:05–1:13, utan ett ord. Frågan har ställts innan det finns något att svara på.
- Bilen ritas i en ruta som är 240 px. Kritan är större än bilen, så det går inte att se vad som ritas (1:08).
- *"Lyssna noga. Hur börjar de?"* är abstrakt för en tvååring.
- När frågan kommer (1:26) heter den bara *"Vilken ska bort?"*. Regeln sägs aldrig.
- Efter att bilen kört står en tom ruta kvar. Ingen jublar.
- Hela leken är en enda bild i 36 s.

**Förslag (Sannas egen formulering som fråga):**
1. *"Nu leker vi!"* Rutnätet ritas (2 s), och de tre flyttar in en i taget.
2. Den udda **ritas inte**. Den kommer in själv med sitt ljud (tut-tut, rullar in från höger och parkerar i sista rutan) och Malin säger *"Titta! En till."* Det tar 2 s i stället för 6, och ljudet ger den en egen röst.
3. *"Lyssna!"* och sedan en ruta i taget, som i dag: *"Aaapa. Aaapelsin. Aaananas. B-b-bil."*
4. Frågan i två led: ***"Vilken ska bort? Vilken börjar inte på A?"*** Paus 4 s.
5. *"Bilen!"*, *"Bil börjar inte på A."*, tut, *"Vinka hej då till bilen!"* medan den kör. Barnet får något att göra med kroppen.
6. Ett reaktionsslag: de tre som är kvar hoppar, klossen hoppar, `jippi`.
7. **En runda till** med en ny udda sak i den tomma rutan, till exempel kon (*"K-k-ko"*, muu, lunkar ut). Den går fortare: ingen genomgång av a-orden, bara *"K-k-ko."* och frågan. Andra gången kan barnet leken, och det är så leken blir längre utan nytt arbete.

**Den udda saken hämtas alltid ur Gissa teckningens bibliotek** (bil, buss, ko, gris, boll, hink …). Där finns redan urklipp och ljud, så den kostar ingenting per bokstav. Välj en som börjar på ett stoppljud eller ett tydligt annat ljud, och inte samma för grannbokstäverna.

### 4. Apans teckning liknar inte apan (0:07–0:21)
Teckningen är en smal figur med två bollar och sura ögon. Bilden den blir är en äggformad apa med stort huvud. Vid 0:21 ser det ut som ett byte, inte som att teckningen blir levande. Teckningen har 18 streck och tar 9 s, och efter 0:14 är det redan tydligt att det är en apa, så de sista 7 s före svaret gissar ingen.

**Förslag:** rita teckningen efter bilden (minnet *Flow-bild först*): samma äggform, armarna rakt ut, svansens snurra till höger, glada prickögon. Högst 10 streck, ca 6 s, med huvudets ansikte sist. Apelsinen och ananasen stämmer redan bra med sina bilder.

### 5. Allt är smått och långt ifrån (hela filmen)
Klossen är 200 px i hörnet och klistermärkena 200 px, och saken i märket fyller bara drygt halva cirkeln. Rutnätet tar 40 % av bildens bredd. Det finns inga närbilder alls, och små barn läser ansikten och saker bäst när de är stora.

**Förslag:**
- Klossen 260 px i hörnet, klistermärkena 250 px (`PSK` 0,42), och saken fyller tre fjärdedelar av cirkeln.
- Rutnätet 1100 × 820, så att det fyller bilden. Klossen ligger kvar uppe till vänster.
- Ett hårt klipp till närbild (hela scenen skalad 1,5 kring saken) på *"En apa!"* och under *"Säg du: apa!"*. Tillbaka till helbild när den blir klistermärke. Samma klipp för alla ord, en rad i motorn.

### 6. Kritan står kvar i bild när saken lever (0:21–0:35, 0:44–0:49, 0:58–1:01)
Den grå kritan vilar och gungar till höger medan apan hoppar och vinkar. Två saker rör sig, och blicken delas (regeln *En sak i taget*).

**Förslag:** kritan glider ut ur bild efter sista strecket och kommer in igen till nästa teckning.

### 7. Tystnad i början av varje teckning (0:07–0:12, 0:35–0:37, 0:50–0:51)
Före *"Vem är det?"* ritar kritan i 5 s utan röst. Gissa teckningen har ett *"Hmm …"* en tredjedel in av just det skälet.

**Förslag:** lägg in `hmm-1…7` (finns i röstbanken) en tredjedel in i varje teckning. Olika nummer för de tre.

### 8. Musiken tar slut mitt i filmen (1:01)
`gissa-bad.m4a` är 61 s och har ett tydligt slut. Den börjar om precis där Vilken ska bort? börjar, och en gång till om filmen blir längre.

**Förslag:** gör en slinga en gång (`gissa-bad-loop.m4a`, slutet tonat över i början, som `godnatt-bad-loop.m4a`). Ingen ny musik behövs. Provlyssna skarven.

### 9. Slutet är tvärt (1:51–1:53)
*"Hej då!"* och 1 s toning till tomt papper. Barnet får inte säga ljudet en sista gång, och filmen har ingen avsändare.

**Förslag:** efter *"Alla börjar på A."*: *"Säg du: Aaaa!"*, 2,5 s paus, klossen hoppar. *"Hej då!"*, alla vinkar, bilden står kvar 2 s och tonas sedan ut. Ingen lång outro, eftersom slutskärmar inte går på barnvideor.

### 10. Mindre saker
- **Två olika kritor.** A:et ritas av en stor röd krita med etikett (klossarnas canvas), teckningarna av en platt grå. Låt A-kritan vara samma kritform, i rött.
- **Kritljudet.** `skrrrrt-lang` på volym 4 under varje streck ligger också under *"Vad blir det?"*. Sänk det till 2,5 medan Malin pratar. (Ritintrot bytte till `krita-ritar` för att `skrrrrt` knackade. Prova det här också.)
- **Betoningen.** *Apelsin* och *ananas* har svagt a. Det är rätt att apan kommer först. För kommande bokstäver: minst två av tre ord med ljudet i betonad stavelse.
- **Bokstavens namn eller ljud.** För A är de samma. Från M och framåt måste raden vara *"Måne börjar på mmm"*, inte *"på bokstaven M"* (*"em"*). Bestäm mallen nu, så att replikerna blir lika i hela serien.
- **Den udda och sorterna.** Apan är också udda (enda djuret). Det gör inget: de minsta väljer bilen för att den är ny, de större för ljudet. Men lägg aldrig in en udda sak av samma sort som två av de andra (ingen banan bland frukterna).

## 3. Intro

**Inget eget intro. Klossen är vinjetten.** Skälen:

- Det som händer de första sekunderna avgör om barnet stannar. Ett intro med logotyp och jingel på 8 s (`format/intro-outro.md`) skjuter upp det enda barnet väntar på.
- Serien ska också gå att lägga ihop till en lång film med alla bokstäver. Då spelas introt 29 gånger.
- Små barn känner igen en **ritual**, inte en logotyp: samma kloss som faller med samma duns och samma ord varje gång. Den är redan gjord och kostar inget per bokstav.

Det som saknas är bara seriens namn, sagt en gång. Titeln i text hör hemma i miniatyren.

| Tid | Bild | Ljud |
|---|---|---|
| 0:00–0:00,5 | Tomt krämvitt papper | musikens första takt |
| 0:00,5–0:01,4 | Klossen faller, trycks ihop och gungar till | `duns` |
| 0:01,5–0:03 | Klossen står stilla i mitten, bara trä | Malin: *"Kritans ABC!"* (ny, samma i alla filmer) |
| 0:03–0:03,8 | Kritan kommer in från höger | Malin: *"Lyssna!"* |
| 0:03,8–0:06,4 | Kritan ritar A:et i tre drag | bara kritljud |
| 0:06,6–0:08 | Klossen hoppar, kritan ut | `pling`, Malin: *"Aaaa."* |
| 0:08–0:12,5 | Klossen gungar, väntar | *"Kan du gapa stort? Aaaa!"*, paus 2,5 s |
| 0:12,5–0:13,5 | Klossen flyger till hörnet | `swoosh` |

## 4. Reviderad struktur

Ungefär 2:45. Det som är **samma i alla bokstäver** står i fet stil.

| Del | Tid | Bild | Malin |
|---|---|---|---|
| **Vinjett och ljudet** | 0:00–0:13 | Klossen faller, kritan ritar bokstaven, klossen hoppar och flyger till hörnet | ***"Kritans ABC!"*** · ***"Lyssna!"*** · *"Aaaa."* · *"Kan du gapa stort? Aaaa!"* (paus) |
| Ord 1: apa | 0:13–0:41 | Kritan ritar (ca 6 s), ansiktet sist. Paus 4 s. Teckningen blir bilden, apan hoppar. Närbild. Apan vinkar och väntar. Klossen hoppar. Klistermärke till raden. | ***"Hmm …"*** · *"Vem är det?"* · (paus) · *"Aaapa!"* · *"En apa!"* · *"Säg du: apa!"* (paus) · *"Ja! Apa börjar på bokstaven A."* |
| Ord 2: apelsin | 0:41–1:05 | Samma slag. Apelsinen studsar två gånger. | ***"Hmm …"*** · ***"Vad blir det?"*** · (paus) · *"Aaapelsin!"* · *"En apelsin!"* · *"Säg du: apelsin!"* (paus) · *"Apelsin börjar också på A!"* |
| Ord 3: ananas | 1:05–1:29 | Samma slag. Bladen vickar. | ***"Hmm …"*** · ***"Vad blir det?"*** · (paus) · *"Aaananas!"* · *"En ananas!"* · *"Säg du: ananas!"* (paus) · *"Ananas börjar också på A!"* |
| **Vilken ska bort?** runda 1 | 1:29–2:02 | Rutnätet ritas stort, de tre flyttar in en i taget. Bilen rullar in och parkerar. En ruta i taget växer. Paus 4 s. Bilen tutar och kör ut. De tre och klossen hoppar. | ***"Nu leker vi!"*** · ***"Titta! En till."*** · ***"Lyssna!"*** · *"Aaapa. Aaapelsin. Aaananas."* · *"B-b-bil."* · ***"Vilken ska bort?"*** *"Vilken börjar inte på A?"* (paus) · *"Bilen!"* · *"Bil börjar inte på A."* · *"Vinka hej då till bilen!"* |
| Runda 2 | 2:02–2:22 | Kon kommer in i den tomma rutan (muu). Bara kons ruta växer. Paus 4 s. Kon lunkar ut. Alla hoppar. | ***"En gång till!"*** · *"K-k-ko."* · ***"Vilken ska bort?"*** *"Vilken börjar inte på A?"* (paus) · *"Kon!"* · *"Ko börjar inte på A."* · ***"Hej då!"*** |
| **Alla tillsammans** | 2:22–2:42 | Rutnätet tonas bort. Klossen i mitten, de tre i rad under, var och en hoppar på sitt ord. Klossen hoppar på ljudet. | *"Aaapa. Aaapelsin. Aaananas."* · *"Alla börjar på bokstaven A. Aaa!"* · ***"Säg du:"*** *"Aaaa!"* (paus) |
| **Hej då** | 2:42–2:48 | Apan vinkar, alla hoppar en gång. Bilden står kvar 2 s och tonas ut. | ***"Hej då!"*** |

**Det som görs per bokstav** (allt annat är fast):
1. Tre ord: helst en figur med rigg och två urklipp som redan finns. Det starkaste ljudet först.
2. Tre teckningar som streckdata, ritade efter sina bilder, högst 10 streck.
3. Två udda saker ur Gissa-biblioteket.
4. Ungefär 20 korta repliker (blocket nedan är mallen: byt orden).
5. Bokstavens tre drag och färg på klossen.

Lägg bokstavens data (`SAKER`, orden, de udda, replikerna) i en egen fil per bokstav och låt motorn vara gemensam, som `gissa.js`. Då är en ny bokstav en datafil och en inspelning.

## 5. Nya repliker att spela in

Malin, Eleven v3, stability 0,5, en tagning per block, delas med `dela-tagning.py`. Skriv orden vanligt: utdragna a:n görs efteråt med `stracka.py`.

**Finns redan och används som de är:** `a01` (klipps i *"Lyssna!"* och *"Aaaa."*), `a02`, `a03`–`a07`, `a18`–`a20`, `a26`, `a27`, `a40`, `a41`, `hmm-1…7`.

**Block 1: gemensamt för hela serien (spelas in en gång)**

```
[excited] Kritans ABC!
[playful] Nu leker vi!
[surprised] Titta! En till.
[curious] Lyssna!
[curious] Vilken ska bort?
[excited] En gång till!
[warm] Säg du:
[warm] Hej då!
```

**Block 2: bokstaven A**

```
[warm] Säg du: apelsin!
[excited] Apelsin börjar också på A!
[warm] Säg du: ananas!
[excited] Ananas börjar också på A!
[curious] Vilken börjar inte på A?
[playful] B-b-bil.
[excited] Bilen!
[warm] Bil börjar inte på A.
[playful] Vinka hej då till bilen!
[playful] K-k-ko.
[excited] Kon!
[warm] Ko börjar inte på A.
[warm] Aaaa!
```

Att lyssna efter: *"B-b-bil"* och *"K-k-ko"* får inte bli *"be-be-bil"* eller *"kå-kå-ko"* (inget vokalljud efter konsonanten). Blir det fel, använd röstväxlaren som i `format/alfabet.md`. *"på A"* ska låta som ljudet *aaa*, och kan dras ut med `stracka.py`.

## De tre viktigaste förslagen

1. **Låt A-ljudet höras rent och ge barnet gesten:** rita först, säg *"Aaaa"* i tystnad, sedan *"Kan du gapa stort?"*. Klossen är vinjetten, och det enda nya är *"Kritans ABC!"*.
2. **Samma fem slag för alla tre ord,** med *"Säg du"* och *"börjar också på A"* varje gång, och en närbild på svaret.
3. **Gör om Vilken ska bort?:** den udda kommer in själv ur Gissa-biblioteket i stället för att ritas, frågan blir *"Vilken ska bort? Vilken börjar inte på A?"*, barnet får vinka hej då, och en snabb andra runda gör leken längre utan nytt arbete.
