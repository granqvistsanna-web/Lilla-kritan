# Publicera – 9 nov 2026

Kanal: **lilla kritan**. Alla: *Ja, det är gjort för barn*, svensk titel och beskrivning, miniatyr, SRT om den finns, rätt spellista, slutskärm.

## 1. Ladda upp och publicera

| | Video | Fil | Miniatyr | YouTube-text | Klart |
|---|---|---|---|---|---|
| [ ] | Rosa sången (ny) | `avsnitt/019-rosa-favoritfarg/film/avsnitt-019.mp4` (3:37, ny final efter runda 4 9 nov, se `granskning-2026-11-09.md`) | `avsnitt/019-rosa-favoritfarg/thumbnail/miniatyr-strimma.png` | `avsnitt/019-rosa-favoritfarg/youtube.md` | |
| [x] | Bruna sången (v2) (live 9 nov: https://youtu.be/UT2OcX_eo7s) | `avsnitt/007-bruna-ladbilen/film/avsnitt-007-v2-final.mp4` (3:51) | `avsnitt/007-bruna-ladbilen/thumbnail/v2/miniatyr-strimma.png` | `avsnitt/007-bruna-ladbilen/youtube.md` | |
| [x] | Röda sången (live 9 nov: https://youtu.be/b5Aw_kxjcUU) | `avsnitt/013-rod-brandbil/film/avsnitt-013-final.mp4` (2:43) | `avsnitt/013-rod-brandbil/thumbnail/miniatyr-strimma.png` | `avsnitt/013-rod-brandbil/youtube.md` | |
| [x] | Tittut kaninen (vid svampen) (live 9 nov: https://youtu.be/K4oDUGre5mg) | `produktion/youtube/tittut/skogen-gron/kaninen-kanel/kaninen-kanel.mp4` (2:29) | `…/kaninen-kanel/thumbnail/miniatyr-strimma.png` | `…/kaninen-kanel/youtube.md` | |
| [x] | Tittut lammet (vid granen) (live 9 nov: https://youtu.be/Sor8z2ECQSk) | `produktion/youtube/tittut/skogen-gron/lammet-ludde/lammet-ludde.mp4` (2:24, ny render 9 nov 15:20; den förra som `lammet-ludde-forra.mp4`) | `…/lammet-ludde/thumbnail/miniatyr-strimma.png` | `…/lammet-ludde/youtube.md` | |
| [x] | Tittut leoparden (lekplatsen) (live 9 nov: https://youtu.be/nEaVLSNTkYo) | `produktion/youtube/tittut/lekplatsen/leoparden-lova/leoparden-lova.mp4` (2:26) | `…/leoparden-lova/thumbnail/miniatyr-strimma.png` | `…/leoparden-lova/youtube.md` | |
| [x] | Bä, bä, vita lamm (live 9 nov: https://youtu.be/T4rOmKyDu9g) | `avsnitt/015-ba-ba-vita-lamm/film/avsnitt-015.mp4` (1:29, 9 nov 15:03, ny render 9 nov i full kvalitet; den förra som `avsnitt-015-forra.mp4`) | `avsnitt/015-ba-ba-vita-lamm/thumbnail/miniatyr-strimma.png` (ny 9 nov, skogen; gamla ängen som `-v1`) | `avsnitt/015-ba-ba-vita-lamm/youtube.md` (kapitlen stämda mot finalen, med CC BY-krediten för `puff`) | |

**Finalkontroll 9 nov (alla utom Rosa sången, som en egen session gör QA på):** varje mp4 ovan är renderad efter den senaste ändringen i sina scener, i delade riggar och ljud, och i git-loggen. Det är filerna som laddas upp.
- 007 v2 (13:29) och 013 (13:26): nyare än alla sina scener. Lammets ben fick långa rötter 13:30, efter båda, men benen ser hela ut i discona (stickprov: en bild i sekunden i 013:s disco, var fjärde sekund i 007 v2), så de renderas inte om.
- Tittut kaninen (8 nov 11:36) och leoparden (8 nov 11:50): nyare än `tittut.js`/`scener/kit.js` (8 nov 11:14), riggarna och rösterna (`assets/ljud/roster/tittut/`, 6–7 nov).
- Tittut lammet var från 8 nov 08:58, före koden och lammets nya ben, så det är omrenderat 9 nov 15:20, med samma röster som förut (de delade tittut-rösterna, inte Malins egna).
- Bä, bä: omrenderad 9 nov 15:03 ur alla scener i full kvalitet.

Att lösa före uppladdning:
- [x] Miniatyr till Rosa sången (skillen `miniatyrer`)
- [x] YouTube-text till Rosa, Röda och Bä, bä
- [x] Bä, bä: ny render 9 nov ur senaste scenerna (full kvalitet), och ny miniatyr ur den eftersom den gamla visade ängen
- [x] Kontroll 9 nov: alla sju filer finns, 1920×1080; miniatyrerna 1280×720, högst 1,1 MB, och minuterna i cirkeln stämmer med filmerna
- [ ] Lammet och leoparden: Malins egna tagningar saknas än – finalerna har de delade tittut-rösterna. Publicera nu eller vänta på hennes tagningar och rendera om? (Sanna bestämmer)

## 2. Gamla dubbletter → Privat

Gör privat (inte radera, så statistiken och länkarna finns kvar) när den nya versionen är live:

Kollat i Studio 9 nov – fyra är offentliga och har en ny version:

- [ ] Rosa sången 🚗💗 | … musen letar rosa (5 nov, 3:06)
- [x] Bruna sången 🚚🤎 | … björnen letar brunt (7 nov, 3:39)
- [x] Tittut! 🐰 | Lek tittut med kaninen i skogen (7 nov, 2:20)
- [x] Tittut! 🐑 | Lek tittut med lammet i skogen (7 nov, 2:19)

Röda sången, Bä, bä och Tittut med leoparden finns inte på kanalen än, så de har ingen dubblett.
- [ ] Byt ut gamla videor i spellistor och slutskärmar mot de nya

## 3. Shorts (egen session)

- [x] Shorts till de nya videorna, live 9 nov (Gjort för barn, länk till långvideon i beskrivningen):
  - Röda: Här kommer en brandbil! https://youtube.com/shorts/l6CcCMSSE-U · Vad är rött? https://youtube.com/shorts/0yZx8Dquh5g · Danspaus! https://youtube.com/shorts/SElTswB2l4c
  - Bruna v2: Brunt är den godaste färgen! https://youtube.com/shorts/BNKOWoT7SHg · En rutschkana! https://youtube.com/shorts/Dn6ZTB7Zakk · Är ni med? https://youtube.com/shorts/kpqX2ivo4nc
  - Tittut: kaninen https://youtube.com/shorts/U1mHrTz8RTM · lammet https://youtube.com/shorts/gRnjEs2R_2g · leoparden https://youtube.com/shorts/uqhishYDCLg
- [ ] Rosa sångens shorts: byggs om ur nya filmen och laddas upp när den är live
