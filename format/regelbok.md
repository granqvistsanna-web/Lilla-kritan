# Regelbok: mätt på de mest sedda filmerna för små barn

Skriven från egna mätningar (23 november 2026) av 9 av de mest sedda filmerna på YouTube för barn 1–4 år, med 84 miljoner till 9,8 miljarder visningar var, och 7 egna filmer. Varje regel har sin räkning: "6 av 9" betyder sex av de nio referenserna. Ingen bild, inget transkript och inga namn på andra kanalers figurer finns i repot, bara siffrorna. Mätskriptet är `verktyg/mat-video.py`, så mätningen går att göra om.

Regelboken ersätter inte `regler.md`, `bildutsnitt.md` eller minnena. Där mätningen säger något annat än en befintlig regel står det under **Att besluta** längst ner, och den befintliga regeln gäller tills Sanna har bestämt.

**Inte för oss:** stickman-kitets tempo (215 ord/min, ny vy var 1,5 s, text i bild). Ingen av referenserna har det. De mest sedda barnfilmerna pratar och sjunger med 43–100 ord/min.

## Vad som mättes

| | Film | Typ | Längd | Visningar |
|---|---|---|---|---|
| R1 | trafiksång | 3D, sång | 3:49 | 9,8 mdr |
| R2 | badsång | 3D, sång | 2:53 | 7,7 mdr |
| R3 | vardagsrutiner | dockor, sång | 2:18 | 2,6 mdr |
| R4 | bondgårdssång | 2D, sång | 3:17 | 613 mn |
| R5 | tandborstsång | 2D, sång | 2:14 | 162 mn |
| R6 | djurlätessång | 3D + 2D, sång | 2:41 | 165 mn |
| R7 | svensk dans- och rörelsesång, 1–3 år | 2D urklipp, sång | 3:03 | 78 mn |
| R8 | godnattsaga med berättarröst | 3D i fotomiljö, saga | 7:03 | 84 mn |
| R9 | samling av sånger (de första 15 min) | 2D, sånger | 15:00 | 221 mn |
| E1 | 004 Bussen badar | vår, sång | 3:37 | flest av våra (434) |
| E2 | Borsta tänderna på bondgården | vår, sång | 2:47 | 185 |
| E3 | 007 Bruna sången | vår, sång | 3:51 | 156 |
| E4 | 003 Bussen hälsar på | vår, sång | 3:04 | 128 |
| E5 | 014 Gröna sången | vår, sång | 3:37 | 116 |
| N1 | 035 Katten hittar julklappar | vår nyaste, Malin berättar | 3:59 | – |
| N2 | 046 Kaninen går till doktorn | vår nyaste, bilderbok | 4:38 | – |

E1–E5 laddades ner från YouTube på samma sätt som referenserna. N1 och N2 är de färdiga filerna i repot och visar hur vi gör idag.

Mått som är osäkra står som det: **säkert** (räknat bildruta för bildruta och kontrollerat för hand), **ungefär** (whisper eller optiskt flöde, några fel per film), **för hand** (räknat på kontaktark).

## 1. Format

| Regel | Mätt | Vi idag |
|---|---|---|
| En sång är 2–4 min | 2:14–3:49, 7 av 7 sånger | ✅ 2:47–3:51 |
| En saga får vara längre | 7:03, 1 av 1 | ✅ N1 3:59, N2 4:38 |
| Innehållet börjar inom 8 s | logga eller titel 0–8 s, sedan direkt sång eller berättelse, 9 av 9 (median 5 s). R7 lägger loggan över första bilden | ⚠️ utanför: titelkort 8–11 s, sedan ritintrot; första bilden ur berättelsen kommer efter 20–32 s i 6 av 7 (E2 efter 9 s). *För hand.* |
| Ingen programledare, ingen inledning i ord | 9 av 9 börjar med sången eller berättelsen själv | ✅ |

## 2. Ord och sång

| Regel | Mätt | Vi idag |
|---|---|---|
| Lugnt ordtempo | 43–104 ord/min över hela filmen, 9 av 9; 50–127 ord/min när någon sjunger eller pratar. *Ungefär.* | ✅ sånger 76–85, Malin 44–62 (98–108 när hon pratar) |
| Sången fyller nästan hela filmen | det sjungs eller pratas 75–98 % av tiden, 9 av 9 | ✅ sånger 75–98 %; Malin-avsnitten 45–58 % (pauserna är medvetna) |
| **Sången upprepar sig nästan hela tiden** | 73–100 % av orden ingår i en fyraordsfras som kommer igen, 7 av 8 sånger (R6 upprepar mönstret i stället: *"X säger Y, Y, Y, Y"* på varje rad). Den mest upprepade frasen kommer 7–30 gånger. *Ungefär.* | ⚠️ utanför: 16–82 %, bara 1 av 5 inom (E2). Mest upprepade frasen 4–6 gånger i 4 av 5. E4:s refräng sjungs två gånger, resten är nya verser |
| Ord som dubbleras (*tut, tut, tut*) | 7–33 % av orden är samma ord som ordet före, 8 av 8 sånger (djurlätessången högst); sagan 0 % | ✅ sånger 11–22 %; Malin 3–7 % |
| Pauser för barnet finns, men få i sånger | pauser över 4 s: 0–2 per sång, 7 av 7; sagan 6 | ✅ sånger 0–3. Malin-avsnitten 11 (frågor med paus, `regler.md`) |
| Orden kommer strax efter bildbytet | median 0,17–0,76 s från bildbyte till nästa ord, 9 av 9; 0,3–0,8 s i 8 av 9. *Ungefär.* | ✅ 0,25–0,44 s; N1 1,73 s (Malin väntar längre) |
| Bildbytet ligger i sången, inte i pausen | 3–30 % av bildbytena ligger i en paus i orden, 9 av 9 | ✅ E1–E5 0–21 %; N1 90 %, N2 42 % (Malin pratar efter bytet, se [[malin-efter-handlingen]]) |

## 3. Bild och kamera

| Regel | Mätt | Vi idag |
|---|---|---|
| **Ny bild ungefär var 2,5–4:e sekund** | medianbilden 1,5–5,6 s, 9 av 9; 1,5–2,8 s i 5 av 9. Snittet (längd delat med antal bilder) 2,6–9,0 s, minst 2,9 s i 8 av 9. *Säkert.* | ✅ E1–E5 median 1,9–4,5 s. ⚠️ utanför: N1 23,8 s, N2 7,1 s |
| Bildbyten per minut | 6–23 per minut, 9 av 9; 9–23 i 8 av 9 | ✅ E1–E5 6,6–15. ⚠️ N1 2,5, N2 7,1 |
| Nästan bara hårda klipp i sånger | hårda klipp är 89–99 % av bytena i 7 av 7 sånger. Övertoningar (6–8 bildrutor) bara i sagan (29 av 74) och samlingen (31 av 170). *Säkert.* | ✅ vi klipper hårt eller åker med kameran; 0–2 övertoningar |
| Vybyten utan klipp: kameraåkningar på 0,3–0,9 s | 9–119 åkningar per film, median 0,3–0,9 s; ny vy (klipp eller åkning) med medianen 0,9–4,1 s, under 2,5 s i 8 av 9. *Ungefär: i 2D-filmer med stora figurer som rör sig räknas en del figurrörelse som åkning.* | E1–E5 vy 1,4–2,9 s ✅; N1 7,7 s och N2 5,8 s ⚠️ |
| 2D-filmernas kamera står mest still | andel bilder där kameran står still (under 1 %/s): 2D, dockor och sagan 20–67 % (7 av 7), 3D-sångerna 3–4 % (där far kameran 6–10 %/s hela tiden). *Ungefär.* | ✅ E1–E5 48–72 %, N1 100 %, N2 88 % (inom 2D:s sätt, se [[lugn-rorelse-inte-studsig]]) |
| Ingen regel om in- eller utzoom | andelen inzoom bland zoomande bilder spretar, 18–83 % | – |
| En figur i bild är det vanligaste | vanligaste antalet figurer i bild: 1 i 6 av 9, 2 i R7, en hel kör i R6, blandat i samlingen. Bilder med 3 eller fler figurer: ca 10 % (utom kören). *För hand, 12 bilder per film.* | ⚠️ E1 och E3 oftast 3, bilder med 3+ figurer ca 36 % i E1–E5. ✅ N1 1, N2 2 (kaninen och doktorn) |
| Närbilder på ansikten och saker | närbild eller detalj syns i 9 av 9 kontaktark (mun som borstas, nos, ansikte) | ✅ alla våra nya, enligt `bildutsnitt.md` |

## 4. Färg och ljus

| Regel | Mätt | Vi idag |
|---|---|---|
| Ljust | medianljushet (HSV, 0–255) 103–239; 2D-filmerna 190–239, 4 av 4 | ✅ 170–243 |
| 2D-filmerna är mättade | medianmättnad 2D 121–178, 4 av 4 (dockfilmen 75); 3D 38–188 | ⚠️ utanför: 55–109. Krämvitt papper (`#f0ede0`-hållet) är den största färgen i 4 av 7 av våra |
| En klar blå finns nästan alltid | en blå eller turkos bland de sex största färgerna i 8 av 9 | ✅ 7 av 7 |
| Mörk bild bara för natt och saga | en mörk färg är störst bara i sagan och i djurlätesfilmens scen (2 av 9) | ✅ N1:s blå natthimmel är 48 % men ljus nog (170) |

## 5. Ljud

| Regel | Mätt | Vi idag |
|---|---|---|
| Ljudnivå runt −14 LUFS | −20,5 till −11,1; −14,4 till −11,1 i 6 av 9. YouTube sänker allt som är starkare än −14, så starkare vinner inget | ✅ −16,6 till −13,7 (E1 och E5 lite svaga) |
| Jämn nivå i sånger | LRA 2,8–7,6 LU i 7 av 7 sånger; sagan 15,0, samlingen 10,7 | ✅ sånger 2,5–7,2. N1 12,6 och N2 8,4 (tal mot musik) |
| Musik under hela sången | ljudet i pauserna bara 0–6 dB under ljudet när det sjungs, 6 av 6 sånger som har pauser över 1 s; tyst (under −45 dBFS) 2–8 % av tiden i 8 av 8 | ✅ |
| Sagan vågar vara tyst | sagan: 38 % av tiden tyst, pauserna 16 dB under rösten (1 av 1) | N1 och N2 har musik under allt (0,1–0,9 % tyst, pauser 5–7 dB under) |
| True peak | kan inte jämföras: YouTube-filerna (AAC) går över 0 dBFS i 6 av 9 av sig själva | N1:s egen fil låg på +0,4 dBFS (klipp 0,8 s in i introt), över gränsen −1,5 i `qa-film.sh`; rättad 23/11 till −2,2 |

## Så görs mätningen om

```bash
uvx --from "yt-dlp[default]" yt-dlp -f "bv*[height<=360][ext=mp4]+ba[ext=m4a]" -o "r1.%(ext)s" <länk>   # i en tillfällig mapp utanför repot
python3 verktyg/mat-video.py r1.mp4 --sprak en --json matning.jsonl
```

yt-dlp behöver `deno` (`brew install deno`) för barnvideor, annars säger YouTube att videon "inte är tillgänglig". Ta bort filmerna efteråt. Gränserna i skriptet (klipp, övertoning, kameraåkning) är kontrollerade för hand mot kontaktark från de här filmerna.

## Att besluta

Här säger mätningen något annat än en befintlig regel eller ett minne. Inget av det är ändrat.

1. **Introt är 3–4 gånger längre än referensernas.** Referenserna är inne i sången eller sagan efter 0–8 s (9 av 9). Vårt titelkort (`format/intro-outro.md`, ca 8 s) plus ritintrot (`format/ritintro.md`, 14–15 s, och minnet [[ritintro-langsamt-med-skog]], "konturen ca 7 s") ger 20–32 s innan berättelsen börjar. Att besluta: kortare titelkort, kortare ritintro, eller ritintrot som en del av sången.
2. **Upprepning: 2–3 gånger mot 7–30 gånger.** `regler.md` säger att samma replik eller händelse kommer 2–3 gånger. I referensernas sånger kommer den mest upprepade frasen 7–30 gånger och 73–100 % av orden upprepas (7 av 8). Våra sånger ligger på 16–82 %. Att besluta: refrängen oftare och kortare verser i nya sånger. (Minnet [[ingen-ny-musik]] gäller: det handlar om nästa gång en sång görs.)
3. **De nyaste avsnitten byter bild mycket mer sällan än både referenserna och våra egna mest sedda.** N1 (035) har medianbild 23,8 s och 2,5 bildbyten per minut, N2 (046) 7,1 s. Referenserna: 1,5–5,6 s (9 av 9). Våra fem mest sedda: 1,9–4,5 s. Det stämmer med minnet [[reaktionstid-for-sma-barn]] (längre genom reaktioner och närbilder, inte segare rörelser) men inte med hur 035 blev. Att besluta: en ny bild (närbild på reaktionen) minst var 5:e sekund även i Malin-avsnitten?
4. **Mättnad.** Art direction v2 ger mjuka kritfärger på krämvitt papper, mättnad 55–109. 2D-referenserna ligger på 121–178. Stilen är låst; det här är bara en upplysning, om färgerna någon gång görs om.
5. **Figurer i bild.** `regler.md` tillåter 3 figurer, och de äldre sångerna visar ofta alla tre samtidigt (ca 36 % av bilderna). Referenserna visar oftast en (6 av 9), och 3 eller fler i ca 10 % av bilderna. De nya avsnitten (1–2 i bild) ligger redan där. Att besluta: en regel om att visa en figur i taget och samla alla tre bara i början och slutet?
6. **Tystnad i sagor.** Sagan (1 referens) är tyst 38 % av tiden; våra Malin-avsnitt har musik under allt. Bara en referens, så svag grund. Att prova på ett bilderboksavsnitt?
