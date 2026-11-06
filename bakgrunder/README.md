# Bakgrunder

Alla platser är byggda på samma sätt: **en färgad vägg och ett vitt golv**, med 1–3 enkla saker (se `stil/stilguide.md`). Varje plats har sin egen väggfärg. Barnen känner igen platsen på färgen, och kritsvepet vid platsbyten görs i nästa plats färg.

| Plats | Väggfärg | Fil |
|---|---|---|
| Ängen | himmelsblå `#4FB3E8` | [angen.md](angen.md) |
| Bondgården | solgul `#F6C21C` | [bondgarden.md](bondgarden.md) |
| Äppelträdet | orange `#F26B1D` | [appeltradet.md](appeltradet.md) |
| Dammen | turkos `#2BB7A6` | [dammen.md](dammen.md) |
| Busshållplatsen | lila `#8E44C9` | [busshallplatsen.md](busshallplatsen.md) |
| Glasskiosken | rosa `#F06EAA` | [glasskiosken.md](glasskiosken.md) |
| Badplatsen | havsblå `#3A6FD8` | [badplatsen.md](badplatsen.md) |
| Vägen | ljusgrön `#A6D86B` (glider, för körscener) | [vagen.md](vagen.md) |
| Himlen | himmelsblå, inget golv | [himlen.md](himlen.md) |
| Glassberget | ljusblå `#A8DCF2`, inget golv | [glassberget.md](glassberget.md) |
| Sjön | ljusblå `#A8DCF2` himmel, sjöblått vatten (glider, för båten) | [sjon.md](sjon.md) |
| Bryggan | ljusblå `#A8DCF2` himmel, sjöblått vatten | [bryggan.md](bryggan.md) |
| Jättepumpan | ljusblå `#A8DCF2`, inget golv | [jattepumpan.md](jattepumpan.md) |
| Kanelbullsberget (struken i 007) | ljusblå `#A8DCF2`, inget golv | [kanelbullsberget.md](kanelbullsberget.md) |
| Kolasåshavet | himmelsblå `#5FB8EE`, gyllene kolahav (glider, refrängen i 007) | [kolasashavet.md](kolasashavet.md) |
| Äppelbacken | ljusblå `#A8DCF2` himmel, grön backe med röd rutschkana (refrängen i 013) | [appelbacken.md](appelbacken.md) |
| Jättesolen | gyllene orange `#F5A33C`, inget golv, jättestor sol utan ansikte (refrängen i 011) | [jattesolen.md](jattesolen.md) |
| Skogen | blek mint `#BFE6C8`, två bilder med tre gömställen var som egna urklipp (Tittut) | [skogen.md](skogen.md) |
| Nattkullen | nattblå `#2F3A6B`, grön kulle, måne, stjärna och moln som egna urklipp, 9:16 (Godnattsagan) | [nattkullen.md](nattkullen.md) |
| Ängen på natten | djup nattblå `#283C78`, mörkt gräs, blomtuvor nere till vänster och höger, 9:16 (Godnattsagan: Fjärilen Fia) | [angen-natt.md](angen-natt.md) |

Generera: `python3 verktyg/prompt.py --plats glasskiosken`. Spara i `assets/bakgrunder/<fil-namn>/`.

**Tips:** Generera väggen och golvet tomma, och sakerna (moln, träd, skylt) separat. Då kan samma vägg återanvändas och sakerna flyttas eller röra sig lite.

**Ny plats:** välj en väggfärg som inte redan används och följ samma prompt-mall.
