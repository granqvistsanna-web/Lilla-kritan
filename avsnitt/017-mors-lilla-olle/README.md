# Avsnitt 017 – Mors lilla Olle (plan)

**Status:** kodscenen klar för förhandsvisning 2026-11-13: hela filmen efter introt är en kodscen, `scener/skogen/` (bild 01–28 i sångtid, Olle, mor och björnen som v2-riggar), och introt är 016:s med blåbärsblå titel (`intro/`, 9,0 s). Avsnittet blir 2:24 (sång 2:15 + intro 9 s). Byggs med `film/satt-ihop.sh` efter `node verktyg/render-delat.mjs avsnitt/017-mors-lilla-olle/scener/skogen`. Förra statusen: grovklipp 2026-11-13: `film/avsnitt-017-grovklipp.mp4` (2:26, storyboardens bilder i takt med sången, byggs med `film/satt-ihop.sh [--snabb]`). Versstarterna är bekräftade, ritintrot ligger i förspelet (bild 01–03), Olle har `uttryck.html`. Bildlista: [bildlista.md](bildlista.md). Storyboard: [storyboard.md](storyboard.md) och [storyboard/index.html](storyboard/index.html), sången: [sang.md](sang.md). Nästa steg: Sanna tittar på grovklippet och bestämmer rösterna, sedan kodscenerna som i 016.

| | |
|---|---|
| **Titelkort** | Avsnitt 17 · Mors lilla Olle (tre ord) |
| **Figurer (3)** | **Olle**, en liten pojke, och **mor**, hans mamma (nya: `karaktarer/pojken-olle.md`, `karaktarer/mamma-mor.md`) · **Björnen Bulle** (finns med rigg i `assets/karaktarer/bjornen-bulle/`; riggbilden har ingen keps, så han används som han är) |
| **Platser (1)** | Skogen 1 (`assets/bakgrunder/skogen/skogen.png`, mintgrön, med busken, stenen och stocken som urklipp). Inget platsbyte, så inget kritsvep |
| **Nya saker (0)** | inga. Korgen (halmgul) och blåbären finns |
| **I kod, inga nya bilder** | blåbär (kopior av `blabar`) på busken och i korgen · Olles mun blir blå · blå prickar på björnens nos · busken som gungar när björnen är bakom |
| **Kamerainställningar (5)** | kritan ritar · Skogen helbild · närbild Olle · tvåbild · närbild björnen |
| **Nya poser** | Olle bär korgen och räcker fram den · Björnen äter ur korgen · Mor räcker fram en näve bär |
| **Statister** | inga |
| **Favoriter** | 👅 mun, tunga (björnen slickar sig om nosen) · 🍽️ äta (blåbär). Raderna i `harriets-favoriter.md` är uppdaterade |
| **Kärna** | Olle plockar blåbär ensam i skogen. Det prasslar i busken, och fram kommer en snäll björn. De säger god dag, leker tittut bakom stenen, plockar bär tillsammans, och björnen äter nästan allt. Mor kommer, blir förvånad, och björnen gömmer sig bakom busken. Olle blir ledsen, men mor vinkar björnen tillbaka och ger honom blåbär. |
| **Barnet övar på** | brumma, plocka och räkna till tre, vinka god dag, klappa försiktigt, dela, säga tack och varsågod, tittut (borta – där!) |

## Längden: 2:24, kortare än 3–4 min
Sången är 2:15 och klipps aldrig (avsnittstid = sångtid + 9 s intro, 016:s kortare intro). Ett kort sångavsnitt, som 015 och 016.

## Sången slutar ledsen, avsnittet gör det inte
Visan slutar med att björnen har sprungit och Olle ber mor få honom att komma tillbaka. Svansen (2:02–2:15) visar att det blir bra: mor vinkar, björnen tittar fram ur busken och får blåbär av mor. Problemet löses tillsammans och ingen är elak (`format/regler.md`). I vers 4 blir mor bara förvånad, inget skrikljud läggs på, och björnen gömmer sig bakom busken i stället för att springa ut ur bild.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer, 1 plats, 0 nya saker, 1 ny pose per figur
- [x] Introt har titel och nummer. Slutet är kritirisen utan fast outro, samma avvikelse som 005–007 och 014–016
- [x] Inget platsbyte, så inget kritsvep. Zoom in i teckningen i början
- [x] Sången går att klippa ut som Short: 0:34.5–1:18.5 (44 s)
- [x] En fråga till tittaren med paus 4,5 s: *"Var är björnen?"* (mellanspel 1, björnen gömmer sig bakom stenen), sedan tittar han fram. Vers 1 och 2 sjungs i ett svep, så frågan kan inte ligga före vers 2
- [x] Vardagshandling: plocka bär i korgen och dela. Tack: mor ger björnen blåbär, *"Varsågod!"* – *"Tack!"*
- [x] Upprepning: "ett, två, tre blåbär" två gånger, tittut med björnen två gånger (stenen, busken)
- [x] En sak i taget: busken eller stenen rör sig bara när björnen är bakom den, inget annat rör sig i bakgrunden
- [x] Inga djurnamn i det vi skriver: "björnen". Sången säger själv "Olle" och "nalle"
- [ ] Undantag att godkänna: traditionell visa i stället för egen sång, längden 2:24

## Öppet
1. ~~Vem spelar Olle och mor?~~ beslutat 2026-11-07: en liten pojke och hans mamma, nya figurer.
2. ~~**Lyssna på versernas första rad**~~ bekräftat med pip 2026-11-13: (0:17, 0:34.5, 1:18.5, 1:44.2 är räknade bakåt från rad 2) och att svansen 2:02–2:15 är utan sång.
3. **Svansen är bara 13 s** (tonar ut från 2:11). Mor vinkar, björnen får bär och kritirisen ryms, men det går fort. Vill du ha 2–3 s tystnad efter sången för kritirisen?
4. **Provlyssning (2026-11-13):** [provlyssna-versstarter.m4a](provlyssna-versstarter.m4a), 49 s. Fyra klipp, ett per ≈-tid (0:17, 0:34.5, 1:18.5, 1:44.2), med ett litet pip där raden tros börja, 3 s in i varje klipp. Sist svansen från 1:59. Whisper bekräftar bara 1:44.2.
5. ~~**Storyboarden följer inte senare regler**~~ rättat 2026-11-13 (bild 01–03): bild 01 ska inte säga *"Vad kan det vara?"* utan *"Hm … vad blir det nu?"*. Ritintrot ska vara konturen i ett drag (ca 7 s, skogsljud under) och sedan bilden inifrån, så förspelets 17 s fördelas om (01–03). Berättarens repliker läggs efter handlingen.
6. ~~**Olle saknar `premium/uttryck.html`**~~ gjord 2026-11-13, testfilm `assets/karaktarer/pojken-olle/premium/olle-testfilm.mp4`: (ansikte, poser, rörelser). Det görs med skillen `lk-figur` före scenerna, med mors som förlaga.
