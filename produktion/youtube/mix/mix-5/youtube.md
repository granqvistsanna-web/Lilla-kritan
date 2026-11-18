# Mix 5 – Sjung, pussla och gissa – text till YouTube

**Inte uppladdad än.** Filen: `mix-5.mp4` (68:54, byggd 18 nov med `satt-ihop.sh`; den första versionen på 47:53 ligger kvar som `mix-5-forra.mp4` tills den här är godkänd). Miniatyr: `thumbnail/miniatyr-strimma.png` (`node verktyg/miniatyr-render.mjs mix-5`): orange strimma, "Mix · sjung, pussla, gissa", "69 min", egen hjältebild (`thumbnail/hjalte/`: kaninen, leoparden och zebran på introts himmel och gräs; `node thumbnail/hjalte/figurer.mjs` och `render.mjs` från repots rot). Introt: `intro/` (Mix 4:s intro med titeln "Mix · sjung, pussla och gissa", 9,0 s; renderas med `node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/mix/mix-5/intro`).

**Inställningar:** Gjort för barn: **Ja**. Språk: svenska. Spellistor: lilla kritan – alla avsnitt, Färgsånger – lär dig färgerna, Barnsånger för de minsta – sjung med, Tittut – lek tittut med djuren. Inga slutskärmar eller kort (går inte på innehåll för barn).

## Titel
```
Stor mix: sjung, pussla och gissa! 🧩 Över en timme barnsånger, pussel och bilderböcker | lilla kritan
```

## Beskrivning
```
Sju sånger, nio små berättelser, sju pussel, två tittutlekar och tolv teckningar att gissa, i över en timme med lilla kritan. Sjung med i Bussen hälsar på, Röda sången, Orangea sången, Vi ska bada!, Gröna sången, Mors lilla Olle och Blinka lilla stjärna. Hjälp kaninen att äta frukost och åka pulka, grisen att bada, lammet att klä på sig, hunden att äta julmat, leoparden att bygga i sanden och plocka äpplen, och zebran att plocka undan och gå och lägga sig. Lägg pusslet bit för bit och gissa vad det blir. Säg "Tittut!" när leoparden och lammet kommer fram. Och mellan allt ritar kritan: ett flygplan, en gunga, en traktor, en båt … Vad blir det?

0:00 lilla kritan
0:09 Gissa teckningen
0:53 Bussen hälsar på
3:46 Kaninen äter frukost
6:40 Tittut med leoparden på ängen
8:28 Röda sången
11:02 Gissa teckningen
11:47 Grisen badar
15:54 Orangea sången
19:31 Lägg pussel
22:26 Lammet klär på sig
25:09 Gissa teckningen
25:57 Vi ska bada!
29:23 Leoparden bygger i sanden
33:19 Gissa teckningen
33:59 Gröna sången
37:25 Hunden äter julmat
41:09 Lägg pussel
43:20 Zebran plockar undan
47:38 Tittut med lammet i skogen
50:19 Mors lilla Olle
52:34 Kaninen åker pulka
56:57 Gissa teckningen
57:44 Leoparden plockar äpplen
61:41 Gissa teckningen
62:24 Zebran går och lägger sig
66:28 Blinka lilla stjärna

#barnsång #barnsånger #lillakritan
```

## Innehåll (68:54)

`kapitel.txt` (skrivs av `satt-ihop.sh`) har alla delar. Shortsen, två och två, i mixläget (`<ord>-liggande-mix.mp4`): flygplan, gunga · gungbräda, hink · traktor, ko · rutschkana, sandlåda · brandbil, båt · spade, boll. Inga från Skogen. Traktor, ko, brandbil, båt och boll var med i Mix 3 också (bara sju Gissa-filmer var oanvända).
Sångerna: 003, 013, 006, 004, 014, 017 och 016 Blinka lilla stjärna sist. Bilderböckerna: 022, 020, 024, 028, 036, 027, 039, 029 och 026. Tittut: leoparden på ängen (`tittut/angen`) och lammet i `skogen-2`. Pusslen: `pussel/pussel-mix-5.mp4` (äpplet, kaninen, kon, katten) och `pussel/pussel-mix-5b.mp4` (bilen, grisen, hunden); `python3 produktion/youtube/pussel/pussel-prov.py <namn>`.
**036 och 039 är jul och vinter**, så mixen passar bäst under december–februari.
**Inga långa intron inne i mixen** (Sanna 18 nov). 003/004/006/014 börjar efter det gamla kortet (11 s), 013 och 016 efter 9 s och 020 efter 10,6 s (alla tre under sitt eget kritsvep, som i Mix 3), 017 efter sitt eget blå svep (9,5 s), bilderböckerna efter "djuren hittar på!"-kortet (3,3 s), 039 har inget intro. Tittut börjar efter introkortet (3,9 s) och slutar när djuret landat i mitten: hela outrot är kapat (leoparden 24,2 s, lammet 23 s). Det svarta efter Blinka är kapat (3,6 s) och sista tonen tonas ut.
Ljudet: hela mixen −14,8 LUFS. Sångerna och pusslen jämnade till −15, Tittut −15,5, Shortsen −14, bilderböckerna orörda. **Bygg om mixen innan uppladdning om någon del renderas om** (039 renderades om 18 nov 12:55 och 016 är fortfarande grovklippet).
