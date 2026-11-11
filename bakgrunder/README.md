# Bakgrunder

Alla platser är byggda på samma sätt: **en färgad vägg och ett vitt golv**, med 1–3 enkla saker (se `stil/stilguide.md`). Varje plats har sin egen väggfärg. Barnen känner igen platsen på färgen, och kritsvepet vid platsbyten görs i nästa plats färg.

| Plats | Väggfärg | Fil |
|---|---|---|
| Ängen | himmelsblå `#4FB3E8` | [angen.md](angen.md) |
| Bondgården | solgul `#F6C21C` | [bondgarden.md](bondgarden.md) |
| Äppelträdet | orange `#F26B1D` (v2 utan träd och träd med bred stam som urklipp: 029) | [appeltradet.md](appeltradet.md) |
| Dammen | turkos `#2BB7A6` | [dammen.md](dammen.md) |
| Busshållplatsen | lila `#8E44C9` | [busshallplatsen.md](busshallplatsen.md) |
| Glasskiosken | rosa `#F06EAA` | [glasskiosken.md](glasskiosken.md) |
| Badplatsen | havsblå `#3A6FD8` | [badplatsen.md](badplatsen.md) |
| Vägen | ljusgrön `#A6D86B` (glider, för körscener) | [vagen.md](vagen.md) |
| Himlen | himmelsblå, inget golv | [himlen.md](himlen.md) |
| Glassberget | ljusblå `#A8DCF2`, inget golv | [glassberget.md](glassberget.md) |
| Sjön | ljusblå `#A8DCF2` himmel, sjöblått vatten (glider, för båten) | [sjon.md](sjon.md) |
| Bryggan | ljusblå `#A8DCF2` himmel, sjöblått vatten | [bryggan.md](bryggan.md) |
| Äppelbacken | teal `#2A8C7A`, en lång grön backe med äppelträd, v2 (refrängen i 013) | [appelbacken.md](appelbacken.md) |
| Jättesolen | gyllene orange `#F5A33C`, inget golv, jättestor sol utan ansikte (refrängen i 011) | [jattesolen.md](jattesolen.md) |
| Skogen | blek mint `#BFE6C8`, två bilder med tre gömställen var som egna urklipp (Tittut) | [skogen.md](skogen.md) |
| Skogen grön | gräsgrön `#5DB85C`, art direction v2, tom platta, tre gömställen som egna urklipp och två grästuvor i förgrunden (Tittut) | [skogen-gron.md](skogen-gron.md) |
| Lekplatsen | himmelsblå `#4FA3D9`, art direction v2, blekt staket och gunga i plattan, bollen, rutschkanekullen och sandlådan som egna urklipp (Tittut) | [lekplatsen.md](lekplatsen.md) |
| Nattkullen | nattblå `#2F3A6B`, grön kulle, måne, stjärna och moln som egna urklipp, 9:16 (Godnattsagan) | [nattkullen.md](nattkullen.md) |
| Lammets rum | skymningslila `#4A3F73`, ljust golv med rosa matta, runt fönster för månen, 9:16 (Godnattsagan, lammet) | [lammets-rum.md](lammets-rum.md) |
| Badrummet | havsgrön `#7CC8C4` med kakeltapet, vitt golv, v2, 16:9 (018) | [badrummet.md](badrummet.md) |
| Köket | solgul `#F5C542` med rutig tapet, vitt golv, v2, 16:9, tom platta (022) | [koket.md](koket.md) |
| Hallen | korall `#F07A5F`, dörr och krokrad i plattan, vitt golv, v2, 16:9 (024) | [hallen.md](hallen.md) |
| Sovrummet | väggfärg väljs (förslag blå `#3F6EA6`), runt tomt fönster och lampa i plattan, vitt golv, v2, 16:9 (026, 027) | [sovrummet.md](sovrummet.md) |
| Stranden | ljusblå himmel `#89CFF3`, havet, ljust grå-beige sand (inte gul), v2, tom platta (011) | [stranden.md](stranden.md) |
| Ängen på natten | djup nattblå `#283C78`, mörkt gräs, blomtuvor nere till vänster och höger, 9:16 (Godnattsagan: Fjärilen Fia) | [angen-natt.md](angen-natt.md) |
| Äppelträdet på natten | djup nattblå `#243972`, grön mark, äppelträdet vid högra kanten, 9:16 (Godnattsagan, Kanel) | [appeltradet-natt.md](appeltradet-natt.md) |
| Skogen på natten | nattblå himmel, rad av runda träd, stort träd till vänster, orange lövhög till höger, 9:16 (Godnattsagan) | [skogen-natt.md](skogen-natt.md) |
| Bondgården på natten | ockra vägg under mörk nattblå himmel `#051832`, röd ladugårdsdörr, höhög, 9:16 (Godnattsagan: Lammet Ludde) | [bondgarden-natt.md](bondgarden-natt.md) |
| Dammen på natten | djup nattblå `#20336D`, grön gräsmark, damm med näckros och vass nere till höger, 9:16 (Godnattsagan, Zebran Zebbe) | [dammen-natt.md](dammen-natt.md) |
| Vinterkullen | blek vinterhimmel `#C3E1F7`, gräddvit snökulle, snöiga granar längst ut i kanterna, tom mitt, v2, 16:9 (julkalendern) | [vinterkullen.md](vinterkullen.md) |
| Vinterkullen på kvällen | djup kvällsblå `#43639C`, samma snökulle och granar som Vinterkullen, ingen måne, v2, 16:9 (julkalenderns kvällsluckor) | [vinterkullen-natt.md](vinterkullen-natt.md) |
| Natthimlen | slät mörkblå kvällshimmel `#334E83`, ljusare neråt, sju små prickar, klippt till en rundad lapp på papperet, 16:9 (julkalendern, lucka 1) | [natthimmel.md](natthimmel.md) |

Generera: `python3 verktyg/prompt.py --plats glasskiosken`. Spara i `assets/bakgrunder/<fil-namn>/`.

**Tips:** Generera väggen och golvet tomma, och sakerna (moln, träd, skylt) separat. Då kan samma vägg återanvändas och sakerna flyttas eller röra sig lite.

**Ny plats:** välj en väggfärg som inte redan används och följ samma prompt-mall.
