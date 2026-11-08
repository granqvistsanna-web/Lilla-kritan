# kritan-ritar – noter

Bild 01–02, sångtid 0:00–0:11.0 (avsnittstid 0:11–0:22). `kit.kor(render, 11, { sang: [0, 11] })`. Byggd på 015:s kritan-ritar (krita, vaxfilter, papper, hålet).

## Vad som händer (scentid)
- 0,02: den blekgula kritan (kropp `#F6E7A8`, ockra band `#D9B45A`, linjer `#B48C34`) poppar fram.
- 0,3–4,6: fem streck, en udd per streck (topp, höger, ner höger, ner vänster, vänster), sicksack från mitten ut mot spetsen. `skrrrrt-kort` på varje.
- 4,85–5,75: fyllningen, en spiral i mitten (`skrrrrt-lang`), sedan tonas resten av stjärnan in till 6,05. Stjärnan är `stjarna.png`, 340 px hög mitt på papperet.
- 1,0 "Vad kan det vara?" och 6,0 "En stjärna!": tysta (ingen inspelning).
- 6,0–6,8: kritan lyfter bort ut till höger. 6,05: vit kant (`kant.lagg`, andel 0,01 som den riktiga stjärnan). 6,0: ansiktet (`natt.stjarnAnsikte`, samma som N.stjarna) poppar fram. 6,2–6,9: tindrar en gång (7 % större och tillbaka) med glada ^ ^ och `pling`, sedan `glad` mot tittaren (titt 0, en blinkning vid 7,9).
- 9,0: `swoosh`. 9,0–10,3: papperet rusar mot tittaren (5 ×) och ett hål med vaxig kant växer ut från mitten (9,15–10,2). Under ligger Nattkullen, som zoomar ut från 1,35 till helbilden (9,0–10,3).
- 9,25–10,45: teckningen glider till stjärnans plats på himlen och krymper till dess storlek (målet räknas ur kamerans läge varje bildruta). 10,45: byts mot `N.stjarna` (samma bild, ansikte `glad` titt 0, plats och storlek), `glimt` och en liten glans (0 → 0,5 → 0 till 10,95).
- 11,0 = S0: kameran `kit.utsnitt(KAMERA.hel)`, glans 0, månen sken 0, små stjärnor 1, molnet dolt, Lage x −160, Nicke x −330, filten/kudden/nallen dolda, inget papper.

## Avvikelser och öppna punkter
- När den riktiga stjärnan tar över tänds dess sken (natt.js: opacity 0,2 vid glans 0, 0,35 när glans > 0). Det syns som att glansen börjar; inget hopp i själva stjärnan.
- Papperet är ritat i introts 1920-enheter (samma korn), men kit.js lägger sitt svaga `korn.png` ovanpå. Kontrollera att skarven intro → kritan-ritar är osynlig i grovklippet.
- Kritans väntläge efter fyllningen och tiderna för strecken är mina egna (inte ur storyboarden).
