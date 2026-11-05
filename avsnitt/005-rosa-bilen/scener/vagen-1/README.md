# Vägen 1 (005, bild 03a–05f)

Avsnittstid 0:30.4–1:11.6 (sångtid 0:19.4–1:00.6), 41,2 s. Scenens t = 0 är 03a. Alla bildgränser kommer ur `M.bild(...)` och raderna ur `M.rad(...)`.

| Bild | Scentid | Vad |
|---|---|---|
| 03a | 0–2,4 | Närbild. Musen vinkar mellan spöket (100°) och `VINK` (135°), ett vink per slag, och blinkar. "Pip pip!" ligger på två slag. |
| 03b | 2,4–4,1 | Närbild. Tassarna ligger på ratten och hon tittar framåt. |
| 04 | 4,1–28,1 | Körscen: `BIL_X = W/3`, `GV = 735`, `BIL_H = 480`, tilt −1. Bilen gungar lugnt, hjulen snurrar i 300 px/s och lövträd och rosa blomsterbuskar (`kit.vagsak`, Sanna) glider förbi bakom vägen, ca 2 s isär. Mellanspelet (något nytt var tredje sekund): kameran går sakta in mot Mille (till 1,4×) och ut igen till helbild före versen. Fjärilen Fia kommer in uppifrån, flyger två varv runt huvudet (Mille följer henne med blicken och skrattar) och flyger ut. Mille vaggar med huvudet i takt när rösten nynnar, och hon blinkar. Vers 1: bilen guppar på "brum, brum, brum". "Musen letar rosa nu": vänster tass över ögonen, hon tittar åt vänster och sedan åt höger, där en stor rosa buske glider förbi nära vägen. "jag och du": hon tittar in i kameran och pekar på oss med vänster tass på slagen, och kameran går in en bit. |
| 05a–05f | 28,1–41,2 | `refrang.ny(M, '05', S)` ritar refrängen. Scenen gömmer sina egna saker. |

Kritsvep (003:s `kritsvep.js`) in i refrängens himmel (`#a9dcf3`, samma som vagen-2): täcker vägen under 04:s sista 0,75 s och smular bort under refrängens första 0,5 s, med ett kort skrrrrt per kritdrag och swoosh (0,6). Efteråt är svepet helt borta (k = 0, inga smulor kvar). `kit.lager.overst` skalas 0,8 (inte W/1920), annars når klottret inte högerkanten.

Inget i scenen ritas i kod längre (utom kritsvepet): allt är utklippta bilder.

**Kamera, inga raka klipp (granskningen 2026-11-05):** scenen börjar i kritan-ritars sista bild (helbilden, samma pose). Kameran åker in till närbilden för 03a (0–0,8 s) och ut till helbilden i slutet av 03b, så att närbilden står ca 2,3 s. I mellanspelet åker den sakta in mot bilen (1,3×, hela bilen med hjulen) och ut igen. Varje versrad får en ny inställning: rad 1 bilen, rad 2 helbild, rad 3 helbild med busken, rad 4 ansiktet (1,7×). Åkningarna står i `T.KAM`. Närbildens inställning räknas en gång på bilen i vila (som `närbild()` i bygg.py).
**Händelser i mellanspelet:** hon tutar (K+1,6), Fia kommer och flyger två varv runt huvudet, hon nynnar och vaggar, tutar igen (K+12,6) och blinkar. I versen: guppar på "brum, brum, brum" och tutar på båda "iväg" (orden uppmätta i `stammor/vocals.wav`). Ingen blomma poppar upp, eftersom de rosa blommorna är upptäckten i 06–07.
**03a:** inga vift-streck och inga fartstreck (Sanna: små effektstreck tas bort om de inte behövs); vinket och blinkningen bär bilden. 03b: hon lutar huvudet i takt och blinkar.
Scenen slutar på 05f:s närbild och klipper rakt till `vagen-2` (06).

Ljud (allt mjukt, under sången): brum (loop till refrängen), plus ett litet brum på varje "brum" (0,35); tuta-tut i mellanspelet och på båda "väg"; fladder (Fia); swoosh (0,25) på åkningarna i sångpauserna (utzoomningen i 03b och in mot bilen före versen); plupp (0,25) på två avgaspuffar i mellanspelet. Fågelkvittret ligger i sammanklippningen, inte här. Refrängen lägger själv sina ljud.

Vit kant: `bilen.js` ritar en jämn vit klistermärkeskant (ca 7 px i full storlek) runt hela bilen och musen. De inbakade kanterna i bilderna trimmas bort, och ratten, tassarna och glassen har ingen egen vit ring.
**Saknas:** `pip`. Anropet ligger på "Pip pip!" i 03a och är tyst.

Avvikelser: vägplattan står still, så farten kommer från hjulen, träden och buskarna. Fjärilen ligger i mellanspelet i stället för i vers 1, så att de 15 sekunderna i samma inställning får något att följa. Blinkningarna visar stängda ögon (sleep-ögonen) och inte hoptryckta öppna ögon.

`jamforelse.jpg`: storyboarden till vänster och scenen till höger, en rad per bild.
