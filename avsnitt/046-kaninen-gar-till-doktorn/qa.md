# 046 Kaninen går till doktorn – QA (grind 6, 2026-11-20)

Djup QA av kodscenen (`scener/mottagningen/`) efter Sannas feedback på förhandsvisning 1–2. Två stillbilder per rad (start + 0,35 s och slut − 0,3 s), 45 rader, plus kontroll i kod av rader, röster och effekter.

## Ljud och tider (kontroll i kod)

- Längd 4:03.9 (G = 1,3, lugnare tempo).
- Alla röstfiler och effekter finns; ingen replik går ut över sin rad; inga överlappande repliker; inga kaninljud mitt i Malins repliker.
- Oanvända repliker (väntat): 3 (*"Oj! En kanin!"*, ritintrot är stetoskopet) och 11, 14, 17, 23, 30, 34, 35, 36, 38, 42, 47 (gamla *"nallen"*, ersatta av 50–60).
- Inga djurnamn i det som sägs. 9 frågor till barnet med paus, fniss på 4 rader (13, 19, 23, 33), inom receptets 3–4.
- Hjärtslagen: ElevenLabs-tagningarna `hjartslag-2` (leoparden) och `hjartslag-3` (kaninen), strax före *"dunk, dunk"*.

## Bild – hittat och rättat

| Rad | Fel | Rättning |
|---|---|---|
| 12 | Bröstdelen syntes inte: leoparden låg ovanpå doktorns hand | Leoparden i famnen ligger i ett eget lager mellan kaninen och doktorn |
| 6b, 7 | Närbilden skar av leoparden (det kaninen tittar på) | Ny kamera `kaninLeo`: kaninens ansikte och leoparden i samma bild |
| 6a | Kritan kom in över kaninens kind | Kritan kommer in lågt från höger |
| 31a, 31b | Stjärnan i luften skars av i överkanten | Stjärnan lägre (vid örats höjd), 31b i halvbild |
| 24 | Lampans sken skymde kaninens gap | Lampan bredvid munnen, skenet svagare; munnen öppnas och stängs mjukt |
| 2:27, 2:33 (23, 24) | För långt ifrån | Närbild på leopardens mun och kaninens mun |
| Doktorns närbilder | Huvudet inte i mitten | Centrerad på huvudet (`doktorNar`) |

## Kvar att titta på i rörelse

- 01c: zoomen in i teckningen slutar i en grå, oskarp bild innan den vita övergången (0,3 s).
- Kaninens vinkning (1, 37, 38): armen går ut åt sidan mer än upp.
- Leopardens fall (26) och skutten (10, 30) behöver ses i full fart.
- Ljudnivåerna (kritans ritljud, skutten) är inte finjusterade.
