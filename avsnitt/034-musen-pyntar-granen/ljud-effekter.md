# 034 – ljudeffekter (ElevenLabs Sound Effects)

Musens röst är en familj som används i alla musens avsnitt. De nio befintliga `mus-pip` (019) sorteras på känslorna efter Sannas lyssning ([provlyssna-mus-pip.m4a](ljud/provlyssna-mus-pip.m4a)). Det som saknades gjordes 2026-11-13 i ElevenLabs SFX v3 (Openverse hade inga tecknade muspip): prompt influence 0,55, längden satt för hand, 4 tagningar per prompt, 80 krediter. Filerna heter efter känslan: `mus-hej`, `mus-suck`, `mus-trumpen`, `mus-hejda`, `mus-fniss` 1–4.

| Fil | Känsla (receptets nr) | Längd | Prompt |
|---|---|---|---|
| `mus-hej` | hej (1) | 1,2 s | Tiny cute cartoon baby mouse saying a happy little squeaky "hej!", one bright rising squeak that sounds like the Swedish word hej, sweet tiny voice, close dry recording, no music, no background |
| `mus-suck` | mysig suck (4) | 1,5 s | Tiny cute cartoon baby mouse giving a soft, cosy, contented little sigh with a tiny happy squeak at the end, "mmm-iii", sweet tiny voice, close dry recording, no music, no background |
| `mus-trumpen` | trumpen, vill inte (6) | 1,2 s | Tiny cute cartoon baby mouse making a small sulky, disappointed "hmph" squeak, short and soft, a little pouty, never angry, sweet tiny voice, close dry recording, no music, no background |
| `mus-hejda` | hej då (8) | 1,2 s | Tiny cute cartoon baby mouse saying a sweet little squeaky "hej då!", two soft squeaks, the second falling gently, sounding like the Swedish words hej då, sweet tiny voice, close dry recording, no music, no background |
| `mus-fniss` | långt fniss (tittut, slutet) | 3,0 s | Tiny cute cartoon baby mouse giggling happily in a little sing-song way, "hi-hi-hi, hi-hi", high squeaky delighted giggles, sweet tiny voice, close dry recording, no music, no background |

Hej och hej då kontrolleras med whisper på svenska (receptet, avsnitt 9: *"Svenska hälsningar"*).

## Musens röst i 034 (de 8 känslorna, receptets ordning)

Vald av Claude (Sanna 2026-11-13 "push on"); byt i `storyboard/rader.mjs`, konstanten `MUS`.

| Nr | Känsla | Fil |
|---|---|---|
| 1 | hej | `mus-hej-1` |
| 2 | förtjust | `mus-pip-4` |
| 3 | kort fniss | `mus-pip-7` |
| 4 | mysig suck | `mus-suck-1` |
| 5 | nyfiken | `mus-pip-6` |
| 6 | trumpen | `mus-trumpen-1` |
| 7 | pratar | `mus-pip-8` |
| 8 | hej då | `mus-hejda-1` |
| – | långt fniss (tittut, slutet) | `mus-fniss-4` |
