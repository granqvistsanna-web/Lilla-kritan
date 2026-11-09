# Avsnitt 016 – Blinka lilla stjärna (plan)

**Status:** sången är tagen (`sang.m4a`, 2:30.0, tider i [rader.txt](rader.txt)). Storyboarden har tider: [storyboard.md](storyboard.md), och bildstoryboarden (24 bilder ur assets, byggs med `storyboard/bygg.py`) ligger i [storyboard/index.html](storyboard/index.html). Grovklippet (bilderna i takt med sången, 2:41) är `film/avsnitt-016-grovklipp.mp4`, byggs med `film/satt-ihop.sh [--snabb]`. Bildlista: [bildlista.md](bildlista.md), sången: [sang.md](sang.md). Nattkullen finns nu i 16:9 (`assets/bakgrunder/nattkullen/nattkullen-16x9.png`, 2026-11-07). **Kodscenerna är byggda (2026-11-07):** introt och sex scener i `scener/` (se `scener/README.md`), förhandsvisade med `--snabb`. Grovklippet `film/avsnitt-016-grovklipp.mp4` (2:41) har alla scenerna. Nästa steg: Sanna tittar på grovklippet, sedan röster och ljud, sedan slutrendering.

| | |
|---|---|
| **Titelkort** | Avsnitt 16 · Blinka lilla stjärna (tre ord) |
| **Figurer (3)** | Stjärnan (ansikte i kod, se nedan) · **v2-riggarna (2026-11-09)** · Lejonet Lage (gul, syns mot nattblått; har liggande sovpose och en replik om att gäspa) · Nyckelpigan Nicke (röd; har sovpose). Båda är låsta (✅) och ändras inte |
| **Platser (1)** | Nattkullen (finns, med månen, stjärnan och molnet som egna urklipp; 16:9-versionen `nattkullen-16x9.png`, kullens topp vid y 523 av 768). Inget platsbyte, så inget kritsvep |
| **Nya saker (0)** | inga. Picknickfilten, kudden och nallen finns |
| **I kod, inga nya bilder** | picknickfiltens rutor omfärgade från rött till lila `#968CC8` (vald 2026-11-07: lugnt mot natten, och Nicke är det enda röda; bilden i assets ändras inte) · stjärnans tindrande och glimt (skala och sken) och **stjärnans ansikte** (Sanna 2026-11-07: "face for star", ritat i kod: prickögon, kinder, leende, ^ ^, somnar i slutet; nu den tredje figuren) · dansstjärnorna i mellanspelet (26 små stjärnor tänds i en våg i takt med musiken) · fler små stjärnor av samma bild i olika storlekar · molnet som glider · månen som lyser upp sakta |
| **Kamerainställningar (5)** | kritan ritar · Nattkullen helbild · tvåbild Lage och Nicke på filten · närbild stjärnan · närbild Lage (och Nicke) |
| **Nya poser** | Lage sitter på filten (den liggande finns). Nicke: inga (stående rigg och sovpose finns) |
| **Statister** | inga |
| **Favoriter i bakgrunden** | 🧸 nallen ligger på filten och Lage somnar med den |
| **Kärna** | Lejonet och nyckelpigan bäddar en filt på kullen för att titta på stjärnan. De blinkar åt den, och den tindrar tillbaka. Ett moln glider förbi och stjärnan är borta! Var är stjärnan? De väntar, molnet glider vidare, och där är den igen. Under andra versen gäspar de och somnar, en i taget. |
| **Barnet övar på** | blinka, peka upp, vänta, tittut (borta – där!), lägga sig och sova, säga tack och varsågod |

Favoriter: 🧸 gosedjur (nallen) · nytt: ⭐ stjärna, 🌙 måne (bakgrund). Raden till `harriets-favoriter.md` är tillagd.

## Längden: 2:41, kortare än 3–4 min
Sången är 2:30 och klipps aldrig (avsnittstid = sångtid + 11 s intro). Det blir ett kort sång- och godnattavsnitt, som 015. Sanna valde att behålla 2:41 (2026-11-07).

## Problemet är litet och inte läskigt
Molnet är mjukt och ljust lavendelgrått (`moln-2.png`), glider sakta och har inget ansikte. Det är bara borta en stund: tittut som barnen känner igen. Molnet glider av sig självt, som riktiga moln, och figurerna väntar (verklighetsnära, se `format/regler.md`). Ingen mörk bild: månen lyser hela tiden.

## Regelkoll (`format/regler.md`)
- [x] 3 figurer (stjärnan fick ansikte 2026-11-07), 1 plats, 0 nya saker, 1 ny pose (Lage sitter)
- [x] Introt har titel och nummer. Slutet är kritirisen utan fast outro, samma avvikelse som 005–007, 014 och 015
- [x] Inget platsbyte, så inget kritsvep. Zoom in i teckningen i början
- [x] Sången går att klippa ut som Short: vers 1, 0:24–0:57 (33 s)
- [x] En fråga till tittaren med paus 4,5 s: *"Var är stjärnan?"* (mellanspelet), sedan visar stjärnan svaret
- [x] Vardagshandling: bädda filten och lägga sig att sova. Tack: Nicke ger Lage kudden, *"Varsågod!"* – *"Tack!"*
- [x] En sak i taget: stjärnan, sedan molnet, sedan månen, aldrig två som rör sig samtidigt
- [x] Inga djurnamn i det som sägs: "lejonet", "nyckelpigan"
- [x] Undantag godkända av Sanna (2026-11-07): traditionell visa i stället för egen sång, längden 2:41

## Öppet
1. ~~Längden~~ beslutat 2026-11-07: 2:41 behålls, ett kort sång- och godnattavsnitt.
2. ~~Nattkullen i 16:9~~ klar 2026-11-07, se `bakgrunder/nattkullen.md`.
3. ~~Picknickfilten~~ beslutat 2026-11-07: lila rutor i kod.
4. **Lyssna på vers 2 och pauserna.** Raderna i vers 2 är uppskattade (vers 1 + 60 s), och om det sjungs i mellanspelet eller svansen måste replikerna flyttas.
5. ~~Gäspningen~~ beslutat 2026-11-07: Lages replik *"Rrroar! … Oj, det blev visst en gäspning."* behålls i mellanspelet (1:18.5 sångtid).
