# Shorts – egna regler

Shorts som klipps ur avsnitten följer [`produktion/youtube/shorts-plan.md`](../produktion/youtube/shorts-plan.md). Den här filen gäller Shorts som görs från början, utan avsnitt. Än så länge finns en serie: **Gissa teckningen** (skill: `gissa-teckningen`).

## Gissa teckningen

Kritan ritar en sak streck för streck. Berättaren frågar *"Vad kan det vara?"*, det blir tyst i 4 s och sedan kommer svaret och namnet en gång till. Sist **blir teckningen levande**: den låter som den riktiga saken och gör en enkel sak som passar den. Kon säger "Muu" och går ut ur bild, bilen kör iväg, bollen studsar bort. Sedan är papperet tomt och Shorten går runt.

| | Gissa teckningen | Avsnitten (`regler.md`) |
|---|---|---|
| Längd | ca 23 s | 3–4 min |
| Saker per film | **1** | – |
| Intro och outro | inga, första sekunden är kritan | fasta |
| Platser | 1: papperet | max 2 |
| Figurer | inga, bara teckningen och kritan | max 3 |
| Slut | teckningen blir levande och lämnar bilden | kritirisen och outrot |
| Musik | samma instrumentala slinga i alla (`assets/ljud/musik/gissa-bad.m4a`) | en sång per avsnitt |
| Röst | berättaren (ElevenLabs), bara korta repliker | sång och berättare |
| Bild | 9:16, 1080×1920, inget viktigt under 75 % av höjden | 16:9 |

Det här bryter mot `regler.md` och är medvetet: ingen berättelse, ingen sång, inget intro och ingen vardagshandling. Allt annat gäller fortfarande, särskilt pedagogiken.

Teckningarna ritas i kod med krita och vit kant (`verktyg/kant.js`, andel 0,01). Som dekorationerna i `regler.md` räknas de inte som nya saker i `rekvisita/`. Men läggs en sak sedan till i ett avsnitt, blir den rekvisita som vanligt.

## Pedagogik (Montessori)

1. **En sak i taget.** En teckning per Short. Ingenting i bakgrunden, och under pausen rör sig bara kritan, lugnt.
2. **Verklighetsnära.** Riktiga färger (en svartvit ko, inte en rosa) och riktiga ljud (en inspelad ko, inte ett tecknat "boing" över lätet). Teckningarna har inga ansikten med mun: de är saker, inte figurer.
3. **Det riktiga ordet.** "Ko", inte "kossa". "Rutschkana", inte "rutschis". Med artikel: *"En ko!"*
4. **Namnet två gånger.** Svaret (*"En ko!"*) och sedan lugnt *"Det är en ko."* Det är första steget i en namngivningslektion (det här är …).
5. **Gissningen är en inbjudan, inte ett prov.** Svaret kommer alltid, och ingen gissning är fel. Pausen är 4 s (regel 4 i `regler.md`).
6. **Ordningen gör gissningen.** Rita först det som kan vara många saker (en låda på ben), sedan ledtrådar (fläckarna) och det som avgör sist (huvudet med hornen), medan frågan ställs.
7. **Lugnt tempo.** En krita, inga blinkningar, inga snabba klipp, ingen text i bild.

Andra steget i namngivningen (*"Var är kon?"*) kräver flera saker att välja bland. Det passar i ett samlingsavsnitt per tema: alla teckningarna efter varandra, och sist tre bredvid varandra med frågan, en paus, och sedan hoppar rätt sak.

## Tidsmall (ca 23 s)

| Del | Tid | Ljud |
|---|---|---|
| Kritan poppar fram och ritar ledtrådarna | ca 5 s | `pop`, `skrrrrt-lang` |
| *"Vad kan det vara?"* medan det som avgör ritas | ca 2,5 s | berättaren |
| Paus, barnet gissar | 4 s | musiken sänks |
| *"En ko!"*, teckningen poppar och får vit kant | ca 1,5 s | `pop`, `pling`, berättaren |
| *"Det är en ko."*, saken står still, kritan lyfter ut | ca 1,8 s | berättaren |
| Lätet och ett litet hopp | ca 0,5 s | riktigt läte |
| Den blir levande och lämnar bilden, papperet blir tomt (går runt) | ca 3,5 s | rörelsens ljud (`steg`), musiken tonas ut |

Namnet sägs medan saken står still, och den blir levande först efteråt. Barnet ska se saken när det hör ordet.

## Levande

En enda rörelse, som den riktiga saken gör. Samma regel som i avsnitten: urklippen **vänds aldrig och snurrar inte**. De rör sig bara åt det håll de redan tittar (rita saken vänd åt höger), med lugna steg och hopp. Saker som inte kan lämna bilden (gungan, sandlådan) gör sin rörelse på plats och tonar sedan bort.

## Teman

| Bondgården | Blir levande |
|---|---|
| ko | säger "Muu" och går lugnt ut åt höger |
| gris | säger "Nöff" och lunkar ut med små hopp |
| får | säger "Bä" och skuttar ut |
| häst | gnäggar och travar ut |
| höna | kacklar, pickar två gånger och tultar ut |
| anka | säger "Kvack" och vaggar ut |
| katt | säger "Mjau" och smyger ut |
| hund | säger "Vov" och springer glatt ut |
| traktor | kör fram och stannar, tuffar och kör ut åt höger |

| Fordon | Blir levande |
|---|---|
| bil | tutar och kör en runda: fram och bromsar, backar, runt och in från vänster, över ett gupp, tutar hej då och kör iväg |

| Lekplatsen | Blir levande |
|---|---|
| gunga | gungar fram och tillbaka (knarr), tonar sedan bort |
| rutschkana | kritan åker ner för den, "wiii" |
| sandlåda | lite sand yr upp och lägger sig, tonar sedan bort |
| spade | gräver två tag och hoppar ut |
| hink | hoppar, skvätter lite och hoppar ut |
| boll | studsar iväg ut ur bild |
| gungbräda | vickar upp och ner, tonar sedan bort |
