# Ljud – Avsnitt 015 · Bä, bä, vita lamm

Ljudeffekterna bild för bild, i **sångtid** (som `storyboard.md` och `rader.txt`; avsnittstid = sångtid + 11 s). Namnen är mappar i `assets/ljud/effekter/` (se dess README). Samma händelse har alltid samma ljud. `render.mjs` lägger effekterna −8 dB under sången; högst 2–3 samtidigt.

**Tyst när det sjungs.** Under verserna bara korta, mjuka slag på handlingen (puff, plopp, pling), inget som tar över sången. **Tyst i frågepausen** (0:37.8–0:42.5), så att barnet hinner svara.

## Finns redan

| Ljud | Används till |
|---|---|
| `skrrrrt-lang`, `skrrrrt-kort` | kritan ritar lammet (01), krit-klottret när en tuss blir ett plagg (07) |
| `ba` | lammet bräker (01b), och kort och glatt när lammen skrattar (13, 14): riktigt fårbräkande, 3 s, klipps kort |
| `swoosh` | zoom in (02) |
| `fagelkvitter` | ängen, lågt under hela berättelsen (03–18), loopas |
| `fladder` | Fia fladdrar förbi (03) |
| `prassel-tyg` | Ludde skakar på sig (06) |
| `pling` | ett plagg dyker upp (07), kritirisen sluts (18) |
| `plopp` | strumporna landar i högen (08) |
| `huttra` | Ludde huttrar (10) |
| `glimt` | strumphögen blänker på "Strumporna!" (11), hjärtana (17) |
| `steg` | far och mor går fram (16) |

## Saknas (2 nya)

| Ljud | Vad | Sök |
|---|---|---|
| `puff` | en mjuk, luddig puff: en ulltuss landar i säcken (06) och växer ut igen (17). Mjukare än `pop` och `plopp` | Openverse först (CC0/BY): "soft poof", "fluffy puff", "cotton pillow pat". Annars ElevenLabs SFX: *"a single very soft fluffy poof, like a cotton ball landing on a pillow, cartoon, gentle, 0.4 seconds"* |
| `strumpa` | en strumpa dras på: kort tygdrag och ett litet mjukt knäpp (12, 13) | Openverse: "sock on", "fabric stretch", "cloth pull". Annars ElevenLabs SFX: *"a small sock being pulled onto a foot, short soft fabric stretch and a gentle snap, close-up, 0.7 seconds"* |

## Bild för bild

| # | Sångtid | Ljud | Tid (sångtid) |
|---|---|---|---|
| 01 | 0:00–0:06 | `skrrrrt-kort` (nosen, öronen), `skrrrrt-lang` (kroppen); tyst under frågepausen förutom kritan | 0:00.2, 0:01.2, 0:02.4 |
| 01b | 0:06–0:07 | `ba` | 0:06.1 |
| 02 | 0:07–0:09 | `swoosh` | 0:07.0 |
| 03 | 0:09–0:12.0 | `fagelkvitter` börjar, lågt (vol 0.35), loopas till 18 · `fladder` när Fia glider förbi (vol 0.5), efter repliken | 0:09.0 · 0:10.8 |
| 05 | 0:12.0–0:17.2 | (sången) | |
| 06 | 0:17.2–0:23.0 | `prassel-tyg` (skakar på sig) · `puff` ×4, en per tuss i säcken | 0:18.8 · 0:19.6, 0:20.3, 0:21.0, 0:21.7 |
| 07 | 0:23.0–0:28.4 | `skrrrrt-kort` + `pling` på "far" · samma på "mor" | 0:25.1 · 0:27.7 |
| 08 | 0:28.4–0:33.4 | `plopp` ×2, ett per par ("två", "strumpor") | 0:28.8, 0:29.7 |
| 10 | 0:33.4–0:36.0 | `huttra`, börjar med repliken | 0:33.6 |
| 11 | 0:36.0–0:38.6 | (berättaren frågar) | |
| 11b | 0:38.6–0:44.0 | tyst i pausen · `glimt` på strumphögen när berättaren säger "Strumporna!" | 0:42.8 |
| 12 | 0:44.0–0:49.2 | `strumpa` ×2, ett, två | 0:44.6, 0:47.0 |
| 13 | 0:49.2–0:55.0 | `strumpa` ×2 (händerna), tre, fyra · `ba` kort och glatt när Ludde skrattar | 0:49.8, 0:52.0 · 0:53.2 |
| 14 | 0:55.0–1:00.4 | `ba` (far och mor, vol 0.6) | 0:58.6 |
| 15 | 1:00.4–1:05.4 | (sången) | |
| 16 | 1:05.4–1:08.5 | `steg` ×2 (far, mor), när sången har tonat ner, före repliken | 1:06.0, 1:06.4 |
| 17 | 1:08.5–1:12.5 | `glimt` (hjärtana) · `puff` ×2 (ullen växer ut) efter "Bä-ä-ä, vad mysigt!" | 1:08.7 · 1:11.0, 1:11.8 |
| 18 | 1:12.5–≈1:16 | `fagelkvitter` tonas ut · `pling` när kritirisen sluts | 1:12.5 · 1:14.6 |

**Strumporna räknas med ljudet:** fyra `strumpa` med drygt 2 s emellan (0:44.6, 0:47.0, 0:49.8, 0:52.0), ett, två, tre, fyra. Berättaren kan inte räkna, för det sjungs.

`ba-fniss` används inte: lamm fnissar inte på riktigt (regeln om riktiga djurläten), så skrattet blir ett kort, glatt `ba`.

Rösterna (berättaren, far, mor, Ludde) står i `bildlista.md` och storyboarden; de är inte effekter.

När scenerna byggs: lägg till `puff` och `strumpa` i `LJUDFILER` i `scener/kit.js` och som rader i `assets/ljud/effekter/README.md` (källa och licens).
