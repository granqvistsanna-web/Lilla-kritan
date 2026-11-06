# Plan: de publicerade filmerna på engelska (Tiny Crayon TV)

Gäller de fem publicerade avsnitten och de sju Shorts som finns på lilla kritan (6 nov 2026). Nya avsnitt (007, 011–014) görs på samma sätt när de är klara på svenska.

## Grundregel: nya sånger, bilden följer

Varje avsnitt får en **ny engelsk sång**, inte en översättning som sjungs på den svenska melodin. Suno-tagningen används oförändrad (vi klipper aldrig sången), så **bilden tajmas om efter den nya sången**. Historien, figurerna, platserna och scenerna är desamma.

## Beslut som behövs innan vi börjar

1. ~~Engelska figurnamn.~~ **Beslutat 6 nov: figurerna behåller sina svenska namn** (Gurra the frog, Agda the duck, Mille the mouse, Disa the dino, Kanel the rabbit, Ludde the lamb, Nalle). Undantag: Lilla Kvack heter **Lil Quack** på engelska (beslutat 6 nov, står redan i kanalbeskrivningen). Sångtexterna ska vara lätta att sjunga med namnen; skriv hur Suno ska uttala dem om det behövs.
2. ~~Brittisk eller amerikansk engelska.~~ **Beslutat 6 nov: amerikansk engelska** (color, favorite) i sånger, titlar och Suno ("clear American English diction"). Kanalbeskrivningen och sökorden på YouTube är ändrade.
3. **Pilot.** Förslag: 006 Orangea sången först (nyast, mest datadrivet via `storyboard/bygg.py`), sedan 005, 004, 003 och sist B som i Boll.

## Per avsnitt: steg

1. **Sångtext.** Ny engelsk text till samma händelse och samma ekon/rop ("Orange!", "Toot-toot!", "Stop!"), korta rader, mycket upprepning, pauser för barnet. Skrivs i `avsnitt/NNN-*/en/sang.md`.
2. **Suno.** Ny `en/suno.md` med samma stil och instrument som den svenska, men engelsk sångröst. Ta bort "english pronunciation" (och i Kvack-prompterna "English lyrics") ur exclude-raden. Den färdiga prompten klistras in hel i chatten. Tagningen sparas som `en/sang.m4a`.
3. **Rader.** `en/rader.txt` med tider från den nya tagningen, samma format som den svenska `rader.txt`.
4. **Tajma om bilden.** Det här är det stora jobbet:
   - Scenerna läser `rader.txt` via `kit.manus()`, men har också hårdkodade sekunder (t.ex. `BUSS_PRAT` i `003/scener/a-busshallplatsen/index.html:82`).
   - `film/satt-ihop.sh` har hårdkodade klipp i sången (004 hoppar över 24,967–29,8 s; 006 klipper i `klipp-sang.sh` vid 217,1 s). För engelska ska sången inte klippas alls.
   - Förskjutningen mellan sångtid och avsnittstid skiljer sig (+11 s i `rader.txt`, +8 s i 003:s `kit.js:299`). Bestäm en per avsnitt.
   - Förslag: låt scenerna välja språk med en flagga (som `#en` i `kanal.js`) och läsa `en/sang.m4a` och `en/rader.txt`. Flytta hårdkodade sekunder till rader/stötar så de följer med automatiskt.
5. **Intro.** Titelkortet ("Avsnitt N · …") och ordmärket "lilla kritan" i `intro/index.html` byts mot engelsk titel och "tiny crayon tv". Bokstäverna o, c, v och y finns redan i `kanal/kanal.js` (GLYF) och kopieras till introts GLYF. Kolla om `jingel.m4a` har svensk sång; i så fall behövs en engelsk jingel.
6. **Miniatyr.** Engelsk text i `thumbnail/index.html` / `miniatyr.js`.
7. **Bygg och granska.** `render.mjs` för varje scen (först `--snabb`), sedan `film/satt-ihop.sh`. Titta igenom hela filmen innan uppladdning.
8. **YouTube-text.** `en/youtube.md`: titel, beskrivning med kapitel, taggar. Avsedd för barn, språk engelska, spellistor.

## Avsnitten

| Avsnitt | Engelskt arbetsnamn | Att tänka på |
|---|---|---|
| 006 Orangea sången | The Orange Song | Pilot. Orange fungerar på engelska. `bygg.py`-SHOTS styr tajmingen. |
| 005 Rosa sången | The Pink Song | Körstämmor i `stammor/` behöver nya. |
| 004 Vi ska bada! | Let's Go Swimming! | Badplatsen har en egen sång (`badplatsen-sang-58.m4a`, `rader-badplatsen.txt`), alltså två sånger. |
| 003 Bussen hälsar på | The Bus Comes to Visit | Många hårdkodade tider i scenerna. Ingen berättare. |
| B som i Boll | B is for Ball | B fungerar (ball, bear, bee, blueberries, bus). Hela 3:33-klippet ligger utanför repot (`produktion/videos` → `~/Downloads/AI Video Tests`); bara 86 s-versionen kan byggas om (`assembly/build-full.sh`). Måste lösas först. |

## Shorts

- De fem avsnittsklippen klipps ur de engelska avsnitten när de är klara, med engelska undertexter.
- Gissa teckningen-Shorts: motorn läser tiden från ljudfilens längd, så de behöver bara engelska repliker (ElevenLabs) och undertexter. Bestäm röstinställningarna först: `ljud-att-gora.md` säger Multilingual v2 (0,6/0,8), skillen säger Eleven v3 (0,5/0,75).

## Kanalen

- Spellistor som på lilla kritan (All episodes, Kids songs, Color songs, Cars, buses and boats, Short clips) skapas när första avsnittet är uppe, och läggs som rader på fliken Hem.
- Länka gärna kanalerna till varandra i beskrivningen först när båda har innehåll.
