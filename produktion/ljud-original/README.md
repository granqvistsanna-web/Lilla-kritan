# Ljudoriginal

Originalfilerna som laddats ner från ElevenLabs och Suno, med tydliga namn, så att de går att hitta igen. Filmerna använder inte de här filerna: de färdiga, trimmade ljuden ligger i `assets/ljud/` och i varje Short-mapp. Gå hit när du behöver en annan tagning eller vill göra om en trimning.

Själva ljudfilerna checkas inte in (39 MB, se `.gitignore`), bara den här listan.

## Mappar

| Mapp | Innehåll | Namn |
|---|---|---|
| `roster/gissa-teckningen/delade/` | Shortsens delade repliker: intro, hmm, frågan, hej då | `<replik>-tagning-N.mp3`, samma namn som i `assets/ljud/roster/` |
| `roster/gissa-teckningen/<tema>/<sak>/` | Svaret, namnet och sagan för varje Short | `svar-`, `namn-`, `saga-tagning-N.mp3`, samma mappar som i `produktion/youtube/shorts/gissa/` |
| `effekter/<namn>/` | ElevenLabs-effekterna | `<namn>-original-N`, samma namn som i `assets/ljud/effekter/` |
| `musik/007-vad-ar-brunt/` | Alla Suno-tagningar av sången i avsnitt 007 | `NN-sang-vX` = samma som avsnittets `sang-vX.m4a`, `ej-vald` = aldrig använd |
| `musik/gissa-bad/` | Suno-tagningar av Shortsens bakgrundsmusik | |
| `roster/gissa-teckningen/en-jenna/` | All engelsk Gissa-röst med den varmare rösten (Jenna – Warm, Relatable and Articulate, `s50 sim75 v4`, 7 november), ett manus per fil: `delade` (intro, hmm, frågan, hej då), `bondgarden` (samlingen + nio Shorts), `fordon-lekplatsen` (fjorton Shorts). Delade i 91 repliker i `assets/ljud/roster/en/` och `<short>/en/`; ordningen står i `produktion/youtube/shorts/gissa/ljud-att-gora.md` | `<block>-tagning-N.mp3` |
| `roster/013-roda-sangen/` | Avsnitt 013:s berättarrepliker (Malin, `s50 v3`, 9 november): `vad-ritar-kritan-runt-tagning-1` = "Vad ritar kritan? Något runt. Ett äpple! Ett rött äpple!", delad i `vad-ritar-kritan-runt-1.m4a` och `ett-rott-apple-4.m4a`; `titta-tagning-1` = tre "Titta!" (varm, mjuk, ljus), delad i `titta-1`–`titta-3` | `<replik>-tagning-N.mp3` |
| `roster/djuren-hittar-pa/` | Bilderbokserieintrots titel "Djuren hittar på!" (2026-11-11, ersätter "Hitta på!" och "Vad ska vi göra?", Malin, Eleven v3): `djuren-hittar-pa-tagning-1`–`6` ([happy]/[excited]/[cheerful] två var, s0,5 sim0,8 speed 0,9) → `assets/ljud/roster/djuren-hittar-pa/djuren-hittar-pa-1`–`6`; `djuren-hittar-pa-malin-tagning-1`/`2` ([excited], s0,5 sim0,75) → `djuren-hittar-pa-malin-1`/`2`. Klippta tätt (0,05 s före, 0,12 s efter), topp −3 dBFS, whisper (sv) hör "Djuren hittar på" i alla åtta | `<namn>-tagning-N.mp3` |
| `roster/hitta-pa/` | Ersatt av `djuren-hittar-pa`, används inte. Prov på nytt namn för bilderbokserieintrot, "Hitta på!" (2026-11-11, i stället för "Vad ska vi göra?", Malin, Eleven v3): `hitta-pa-tagning-1`–`6` ([happy]/[excited]/[cheerful] två var, samma inställningar som vad-ska-vi-gora-1–6: s0,5 sim0,8 speed 0,9) → `assets/ljud/roster/hitta-pa/hitta-pa-1`–`6`; `hitta-pa-malin-tagning-1`/`2` ([excited], s0,5 sim0,75) → `hitta-pa-malin-1`/`2`. Klippta tätt (0,05 s före, 0,12 s efter), topp −3 dBFS, whisper (sv) hör "Hitta på" i alla åtta | `<namn>-tagning-N.mp3` |
| `roster/vad-ska-vi-gora/` | Bilderbokserieintrots fråga "Vad ska vi göra?" (2026-11-11, ersätter "Bilderbok!", Malin, Eleven v3): `vad-ska-vi-gora-tagning-1`–`6` ([curious]/[happy]/[excited], samma inställningar som bilderbok-1–6: s0,5 sim0,8 speed 0,9) → `assets/ljud/roster/vad-ska-vi-gora/vad-ska-vi-gora-1`–`6`; `vad-ska-vi-gora-malin-tagning-1`/`2` ([curious], s0,5 sim0,75) → `vad-ska-vi-gora-malin-1`/`2` | `<namn>-tagning-N.mp3` |
| `roster/bilderbok/` | Det delade bilderboksintrots ord "Bilderbok!" (2026-11-11, Malin, Eleven v3): `bilderbok-tagning-a` = sex varianter i en tagning ([happy]/[excited]/[cheerful], Tittuts inställningar s0,5 sim0,8 speed 0,9), delad i `assets/ljud/roster/bilderbok/bilderbok-1`–`-6`; `bilderbok-malin-tagning-a`/`-b` = "[excited] Bilderbok!" (s0,5 sim0,75) → `bilderbok-malin-1`/`-2` | `<namn>-tagning-X.mp3` |
| `roster/tittut/` | Tittuts repliker, både delade och per figur | `<replik>-tagning-N.mp3`, samma namn som i `assets/ljud/roster/tittut/` |
| `roster/jul/` | Julkalenderns berättarrepliker, luckor 1–8 (Malin, Eleven v3, s0,5, 2026-11-11), delade med ljuddetektering och ordtider i `assets/ljud/roster/jul/` och `produktion/youtube/shorts/jul/01-stjarna/` (`svar`, `saga`): `ram` (lucka 1–8, vi ses i morgon), `gemensamma` (hej och hej då för grisen och björnen, nu dansar vi, räkna med mig …), `luckor-1-5`, `luckor-6-8`, `omtagning` (snögubben och wiii, en ny tagning) | `<tagning>-tagning-N.mp3` |

Tagningarna är numrerade i den ordning de gjordes (1 = först). ElevenLabs ger två tagningar per gång, så de flesta repliker har två eller fler. Rösterna från 5 november är gjorda med inställningarna `sp86 s50 sb75`, de från 6 november med `s50 sim75 v4` (Eleven v3), och de är oftast de som används.

Lägger du till nya original: samma mappar och namn, och en rad nedan.

## Alla filer

Kolumnen *Hörs* är vad taligenkänningen hörde, så stavningen är ibland fel ("Sanden år" = "Sanden yr").

| Fil | Originalnamn i Downloads | Hörs / anteckning |
|---|---|---|
| `effekter/bat-tut/bat-tut-original-1.mp3` | a_small_boat_horn_to_#1-1793968146019.mp3 | ElevenLabs SFX |
| `effekter/buss-dorr/buss-dorr-original-1.mp3` | a_city_bus_door_open_#1-1793968311496.mp3 | ElevenLabs SFX |
| `effekter/buss-dorr/buss-dorr-original-2.mp3` | a_city_bus_door_open_#1-1793968319771.mp3 | ElevenLabs SFX |
| `effekter/buss-dorr/buss-dorr-original-3.mp3` | a_city_bus_door_open_#1-1793968530573.mp3 | ElevenLabs SFX |
| `effekter/cykelklocka/cykelklocka-original-1.mp3` | a_bicycle_bell_ringi_#1-1793968178111.mp3 | ElevenLabs SFX |
| `effekter/flygplan/flygplan-original-1.mp3` | a_small_propeller_pl_#1-1793968170055.mp3 | ElevenLabs SFX |
| `effekter/glid/glid-original-1.mp3` | sliding_down_a_plast_#1-1793968261754.mp3 | ElevenLabs SFX |
| `effekter/gnagg/gnagg-original-1.mp3` | a_real_horse_neighin_#1-1793967988273.mp3 | ElevenLabs SFX |
| `effekter/grav/grav-original-1.mp3` | a_small_toy_shovel_d_#1-1793968279473.mp3 | ElevenLabs SFX |
| `effekter/gung-knarr/gung-knarr-original-1.mp3` | a_playground_swing_c_#1-1793968195124.mp3 | ElevenLabs SFX |
| `effekter/hink-dunk/hink-dunk-original-1.mp3` | a_small_plastic_toy__#1-1793968238739.mp3 | ElevenLabs SFX |
| `effekter/kluck/kluck-original-1.mp3` | a_real_hen_clucking__#1-1793968016106.mp3 | ElevenLabs SFX |
| `effekter/mjau/mjau-original-1.mp3` | a_real_kitten_meowin_#1-1793968054990.mp3 | ElevenLabs SFX |
| `effekter/mu/mu-original-1.mp3` | a_real_dairy_cow_moo_#1-1793967919867.mp3 | ElevenLabs SFX |
| `effekter/mu/mu-original-2.wav` | a_real_dairy_cow_moo_#1-1793967938168.wav | ElevenLabs SFX |
| `effekter/mu/mu-original-3.mp3` | a_real_dairy_cow_moo_#1-1793967941163.mp3 | ElevenLabs SFX |
| `effekter/mu/mu-original-4.mp3` | a_real_dairy_cow_moo_#1-1793967949314.mp3 | ElevenLabs SFX |
| `effekter/mu/mu-original-5.mp3` | a_real_dairy_cow_moo_#1-1793967950450.mp3 | ElevenLabs SFX |
| `effekter/noff/noff-original-1.mp3` | a_real_pig_grunting__#1-1793967964243.mp3 | ElevenLabs SFX |
| `effekter/pick/pick-original-1.mp3` | a_hen_pecking_the_gr_#1-1793968298101.mp3 | ElevenLabs SFX |
| `effekter/pip/pip-original-1.mp3` | a_single_soft_baby_c_#1-1793971871301.mp3 | ElevenLabs SFX |
| `effekter/plopp/plopp-original-1.mp3` | a_soft_cute_cartoon__#1-1793971846525.mp3 | ElevenLabs SFX |
| `effekter/rull/rull-original-1.mp3` | a_small_pea_rolling__#1-1793971824468.mp3 | ElevenLabs SFX |
| `effekter/sand/sand-original-1.mp3` | dry_sand_pouring_and_#1-1793968245023.mp3 | ElevenLabs SFX |
| `effekter/siren/siren-original-1.mp3` | a_Swedish_fire_engin_#1-1793968108625.mp3 | ElevenLabs SFX |
| `effekter/tag-tjoff/tag-tjoff-original-1.mp3` | a_small_steam_train__#1-1793968128723.mp3 | ElevenLabs SFX |
| `effekter/trav/trav-original-1.mp3` | a_horse_trotting_slo_#1-1793968000753.mp3 | ElevenLabs SFX |
| `effekter/vick/vick-original-1.mp3` | a_wooden_playground__#1-1793968212294.mp3 | ElevenLabs SFX |
| `effekter/vov/vov-original-1.mp3` | a_real_small_friendl_#1-1793968066855.mp3 | ElevenLabs SFX |
| `effekter/zipp/zipp-original-1.mp3` | a_short_soft_zipper__#1-1793971796932.mp3 | ElevenLabs SFX |
| `musik/007-vad-ar-brunt/01-sang-v1.m4a` | Vad är brunt_.m4a | = avsnittets sang-v1.m4a |
| `musik/007-vad-ar-brunt/02-sang-v2.m4a` | Brun Lastbil.m4a | = sang-v2.m4a |
| `musik/007-vad-ar-brunt/03-sang-v3.m4a` | Vad är brunt_ (1).m4a | = sang-v3.m4a |
| `musik/007-vad-ar-brunt/04-ej-vald.m4a` | Vad är brunt_ (2).m4a | inte använd |
| `musik/007-vad-ar-brunt/05-sang-v4.m4a` | Vad är brunt_ (3).m4a | = sang-v4.m4a |
| `musik/007-vad-ar-brunt/06-ej-vald.m4a` | Vad är brunt_ (4).m4a | inte använd |
| `musik/007-vad-ar-brunt/07-sang-vald.m4a` | Vad är brunt_ (5).m4a | = sang.m4a, den valda |
| `musik/007-vad-ar-brunt/08-ej-vald.m4a` | Vad är brunt_ (6).m4a | inte använd |
| `musik/gissa-bad/funkig-98bpm.m4a` | Gentle Funky Toddler Children's Music, Warm And Groovy, 98 Bpm, 4_4, Major Ke....m4a | inte använd |
| `musik/gissa-bad/gissa-bad-alt-original.m4a` | Classic Whimsical Children's Tv Drawing Music, Light And Curious, 100 Bpm, 4_... (1).m4a | = assets/ljud/musik/gissa-bad-alt-original.m4a |
| `musik/gissa-bad/gissa-bad-kort-17s.m4a` | Instrumental Classic Whimsical Children's Tv Drawing Music, Light And Curious....m4a | inte använd, för kort |
| `musik/gissa-bad/gissa-bad-original.m4a` | Classic Whimsical Children's Tv Drawing Music, Light And Curious, 100 Bpm, 4_....m4a | = assets/ljud/musik/gissa-bad-original.m4a |
| `roster/gissa-teckningen/bondgarden/anka/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_22_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en anka. |
| `roster/gissa-teckningen/bondgarden/anka/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T20_59_29_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Ankan säger kvack. |
| `roster/gissa-teckningen/bondgarden/anka/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_16_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En anka. |
| `roster/gissa-teckningen/bondgarden/far/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_03_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är ett får. |
| `roster/gissa-teckningen/bondgarden/far/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T20_59_41_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Fåret säger BÄ. |
| `roster/gissa-teckningen/bondgarden/far/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_57_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Ett får. |
| `roster/gissa-teckningen/bondgarden/gris/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_54_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en gris. |
| `roster/gissa-teckningen/bondgarden/gris/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_11_31_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en gris. |
| `roster/gissa-teckningen/bondgarden/gris/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_11_31_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en gris. |
| `roster/gissa-teckningen/bondgarden/gris/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_00_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Grisen säger nöff. |
| `roster/gissa-teckningen/bondgarden/gris/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_11_41_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Grisen säger nöff! |
| `roster/gissa-teckningen/bondgarden/gris/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_11_41_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Grisen säger nöff! |
| `roster/gissa-teckningen/bondgarden/gris/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_48_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En gris. |
| `roster/gissa-teckningen/bondgarden/gris/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_09_58_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | In Greece! |
| `roster/gissa-teckningen/bondgarden/gris/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_09_58_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En grus! |
| `roster/gissa-teckningen/bondgarden/gris/svar-tagning-4.mp3` | ElevenLabs_2026-11-06T12_10_51_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En gris! |
| `roster/gissa-teckningen/bondgarden/gris/svar-tagning-5.mp3` | ElevenLabs_2026-11-06T12_10_51_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En gris! |
| `roster/gissa-teckningen/bondgarden/hast/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_11_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en häst. |
| `roster/gissa-teckningen/bondgarden/hast/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_12_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en häst. |
| `roster/gissa-teckningen/bondgarden/hast/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_12_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en häst. |
| `roster/gissa-teckningen/bondgarden/hast/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_17_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hästen säger gnägg. |
| `roster/gissa-teckningen/bondgarden/hast/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_12_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hästen säger gnägg! |
| `roster/gissa-teckningen/bondgarden/hast/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_12_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hästen säger gnägg! |
| `roster/gissa-teckningen/bondgarden/hast/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_06_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En häst. |
| `roster/gissa-teckningen/bondgarden/hast/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_11_50_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En häst! |
| `roster/gissa-teckningen/bondgarden/hast/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_11_50_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En häst! |
| `roster/gissa-teckningen/bondgarden/hona/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_29_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en höna. |
| `roster/gissa-teckningen/bondgarden/hona/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_13_03_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en höna. |
| `roster/gissa-teckningen/bondgarden/hona/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_03_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en höna. |
| `roster/gissa-teckningen/bondgarden/hona/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_35_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hönan säger kluck, kluck. |
| `roster/gissa-teckningen/bondgarden/hona/saga-tagning-2.mp3` | ElevenLabs_2026-11-05T21_01_54_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hönan säger kakaka. |
| `roster/gissa-teckningen/bondgarden/hona/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_13_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hönan säger baka, kaka, kaka! |
| `roster/gissa-teckningen/bondgarden/hona/saga-tagning-4.mp3` | ElevenLabs_2026-11-06T12_13_13_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hönan säger: "Ba-ka-ka-ka!" |
| `roster/gissa-teckningen/bondgarden/hona/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_01_23_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En höna. |
| `roster/gissa-teckningen/bondgarden/hona/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_12_53_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En höna! |
| `roster/gissa-teckningen/bondgarden/hona/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_12_53_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En höna! |
| `roster/gissa-teckningen/bondgarden/hund/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_40_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en hund! |
| `roster/gissa-teckningen/bondgarden/hund/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_14_02_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en hund. |
| `roster/gissa-teckningen/bondgarden/hund/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_14_02_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en hund. |
| `roster/gissa-teckningen/bondgarden/hund/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_46_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hunden säger vov. |
| `roster/gissa-teckningen/bondgarden/hund/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_14_12_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hunden säger vov! |
| `roster/gissa-teckningen/bondgarden/hund/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_14_12_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hunden säger vov! |
| `roster/gissa-teckningen/bondgarden/hund/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_34_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En hund? |
| `roster/gissa-teckningen/bondgarden/hund/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_13_52_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En hund! |
| `roster/gissa-teckningen/bondgarden/hund/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_52_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En hund! |
| `roster/gissa-teckningen/bondgarden/katt/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_23_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en katt. |
| `roster/gissa-teckningen/bondgarden/katt/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_13_33_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en katt. |
| `roster/gissa-teckningen/bondgarden/katt/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_33_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en katt! |
| `roster/gissa-teckningen/bondgarden/katt/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_29_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Katten säger mjau. |
| `roster/gissa-teckningen/bondgarden/katt/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_13_43_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Katten säger mjau! |
| `roster/gissa-teckningen/bondgarden/katt/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_43_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Katten säger mjau! |
| `roster/gissa-teckningen/bondgarden/katt/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_17_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En katt! |
| `roster/gissa-teckningen/bondgarden/katt/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_13_23_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En katt! |
| `roster/gissa-teckningen/bondgarden/katt/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_13_23_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En katt! |
| `roster/gissa-teckningen/bondgarden/ko/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_01_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | DRNK. |
| `roster/gissa-teckningen/bondgarden/ko/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T20_59_24_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Konsejermö. |
| `roster/gissa-teckningen/bondgarden/ko/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_54_39_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | And cool! |
| `roster/gissa-teckningen/bondgarden/traktor/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_51_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en traktor. |
| `roster/gissa-teckningen/bondgarden/traktor/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T20_59_35_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Traktorn säger tuff, tuff. |
| `roster/gissa-teckningen/bondgarden/traktor/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_55_46_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En traktor. |
| `roster/gissa-teckningen/delade/hej-da-1-tagning-1.mp3` | ElevenLabs_2026-11-06T12_23_50_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej då! |
| `roster/gissa-teckningen/delade/hej-da-1-tagning-2.mp3` | ElevenLabs_2026-11-06T12_23_50_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej då! |
| `roster/gissa-teckningen/delade/hej-da-2-tagning-1.mp3` | ElevenLabs_2026-11-06T12_24_00_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej då! Vi ses snart! |
| `roster/gissa-teckningen/delade/hej-da-2-tagning-2.mp3` | ElevenLabs_2026-11-06T12_24_00_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej då! Vi ses snart! |
| `roster/gissa-teckningen/delade/hej-da-3-tagning-1.mp3` | ElevenLabs_2026-11-06T12_24_10_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Tack för att du gissade! Hej då! |
| `roster/gissa-teckningen/delade/hej-da-3-tagning-2.mp3` | ElevenLabs_2026-11-06T12_24_10_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Tack för att du gissade! Hej då! |
| `roster/gissa-teckningen/delade/hej-da-4-tagning-1.mp3` | ElevenLabs_2026-11-06T12_24_21_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej då! Snart ritar kritan något nytt. |
| `roster/gissa-teckningen/delade/hej-da-4-tagning-2.mp3` | ElevenLabs_2026-11-06T12_24_21_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej då! Snart ritar kritan något nytt. |
| `roster/gissa-teckningen/delade/hej-da-5-tagning-1.mp3` | ElevenLabs_2026-11-06T12_24_32_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej hej! Vi ritar mer än annan gång. |
| `roster/gissa-teckningen/delade/hej-da-5-tagning-2.mp3` | ElevenLabs_2026-11-06T12_24_32_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej hej! Vi ritar med er en annan gång. |
| `roster/gissa-teckningen/delade/hmm-1-tagning-1.mp3` | ElevenLabs_2026-11-06T12_05_46_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Hmm. |
| `roster/gissa-teckningen/delade/hmm-1-tagning-2.mp3` | ElevenLabs_2026-11-06T12_05_46_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Hmm. |
| `roster/gissa-teckningen/delade/hmm-2-tagning-1.mp3` | ElevenLabs_2026-11-06T12_06_16_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Hmm, vad blir det här? |
| `roster/gissa-teckningen/delade/hmm-2-tagning-2.mp3` | ElevenLabs_2026-11-06T12_06_16_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Hmm, vad blir det här? |
| `roster/gissa-teckningen/delade/hmm-3-tagning-1.mp3` | ElevenLabs_2026-11-06T12_06_27_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Oj, titta! |
| `roster/gissa-teckningen/delade/hmm-3-tagning-2.mp3` | ElevenLabs_2026-11-06T12_06_27_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Oj! Titta! |
| `roster/gissa-teckningen/delade/hmm-4-tagning-1.mp3` | ElevenLabs_2026-11-06T12_06_39_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Mm, jag undrar. |
| `roster/gissa-teckningen/delade/hmm-4-tagning-2.mp3` | ElevenLabs_2026-11-06T12_06_39_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Mm, jag undrar. |
| `roster/gissa-teckningen/delade/hmm-5-tagning-1.mp3` | ElevenLabs_2026-11-06T12_06_51_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Hmm, vad ritar klitan nu? |
| `roster/gissa-teckningen/delade/hmm-5-tagning-2.mp3` | ElevenLabs_2026-11-06T12_06_51_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Hmm, vad ritar kritan nu? |
| `roster/gissa-teckningen/delade/intro-1-tagning-1.mp3` | ElevenLabs_2026-11-06T12_21_32_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-1-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_32_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-1-tagning-3.mp3` | ElevenLabs_2026-11-06T12_23_00_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-1-tagning-4.mp3` | ElevenLabs_2026-11-06T12_23_00_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-2-tagning-1.mp3` | ElevenLabs_2026-11-06T12_21_42_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej! Nu ska vi gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-2-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_42_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej! Nu ska vi gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-2-tagning-3.mp3` | ElevenLabs_2026-11-06T12_23_10_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej! Nu ska vi gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-2-tagning-4.mp3` | ElevenLabs_2026-11-06T12_23_10_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej! Nu ska vi gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-3-tagning-1.mp3` | ElevenLabs_2026-11-06T12_21_52_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Gissa teckningen! Kritan ritar! |
| `roster/gissa-teckningen/delade/intro-3-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_52_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Gissa teckningen! Kritan ritar! |
| `roster/gissa-teckningen/delade/intro-3-tagning-3.mp3` | ElevenLabs_2026-11-06T12_23_20_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Gissa teckningen! Kritan ritar! |
| `roster/gissa-teckningen/delade/intro-3-tagning-4.mp3` | ElevenLabs_2026-11-06T12_23_20_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Gissa teckningen! Kritan ritar! |
| `roster/gissa-teckningen/delade/intro-4-tagning-1.mp3` | ElevenLabs_2026-11-06T12_22_02_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Titta! Kytan ritar! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-4-tagning-2.mp3` | ElevenLabs_2026-11-06T12_22_02_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Titta, kritan ritar! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-4-tagning-3.mp3` | ElevenLabs_2026-11-06T12_23_30_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Titta! Kritan ritar! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-4-tagning-4.mp3` | ElevenLabs_2026-11-06T12_23_30_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Titta! Krytan ritar! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-5-tagning-1.mp3` | ElevenLabs_2026-11-06T12_22_13_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej, hej! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-5-tagning-2.mp3` | ElevenLabs_2026-11-06T12_22_13_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej, hej! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-5-tagning-3.mp3` | ElevenLabs_2026-11-06T12_23_40_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Hej, hej! Gissa teckningen! |
| `roster/gissa-teckningen/delade/intro-5-tagning-4.mp3` | ElevenLabs_2026-11-06T12_23_40_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Hej hej! Gissa teckningen! |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-2-tagning-1.mp3` | ElevenLabs_2026-11-06T12_08_26_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hmm, vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-2-tagning-2.mp3` | ElevenLabs_2026-11-06T12_08_37_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hmm, vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-3-tagning-1.mp3` | ElevenLabs_2026-11-06T12_08_43_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad tror du att det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-3-tagning-2.mp3` | ElevenLabs_2026-11-06T12_08_48_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad tror du att det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-3-tagning-3.mp3` | ElevenLabs_2026-11-06T12_08_54_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad tror du att det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-4-tagning-1.mp3` | ElevenLabs_2026-11-06T12_09_00_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vet du vad det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-4-tagning-2.mp3` | ElevenLabs_2026-11-06T12_09_05_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vet du vad det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-4-tagning-3.mp3` | ElevenLabs_2026-11-06T12_09_11_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vet du vad det är? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-5-tagning-1.mp3` | ElevenLabs_2026-11-06T12_09_17_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan kritan ha ritat? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-5-tagning-2.mp3` | ElevenLabs_2026-11-06T12_09_22_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan kritan ha ritat? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-5-tagning-3.mp3` | ElevenLabs_2026-11-06T12_09_27_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan kritan ha ritat? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-tagning-1.mp3` | ElevenLabs_2026-11-05T20_59_18_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-tagning-2.mp3` | ElevenLabs_2026-11-06T12_07_27_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-tagning-3.mp3` | ElevenLabs_2026-11-06T12_07_41_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-tagning-4.mp3` | ElevenLabs_2026-11-06T12_07_47_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan det vara? |
| `roster/gissa-teckningen/delade/vad-kan-det-vara-tagning-5.mp3` | ElevenLabs_2026-11-06T12_08_31_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vad kan det vara? |
| `roster/gissa-teckningen/fordon/bat/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_27_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en båt. |
| `roster/gissa-teckningen/fordon/bat/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_08_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en båt! |
| `roster/gissa-teckningen/fordon/bat/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_08_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en båt. |
| `roster/gissa-teckningen/fordon/bat/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_33_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Båten guppar. |
| `roster/gissa-teckningen/fordon/bat/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_17_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Båten guppar! |
| `roster/gissa-teckningen/fordon/bat/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_17_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Båten guppar! |
| `roster/gissa-teckningen/fordon/bat/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_21_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En båt. |
| `roster/gissa-teckningen/fordon/bat/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_16_57_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En båt! |
| `roster/gissa-teckningen/fordon/bat/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_16_57_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En båt! |
| `roster/gissa-teckningen/fordon/bil/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_15_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en bil. |
| `roster/gissa-teckningen/fordon/bil/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_00_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Bilen säger tut tut. |
| `roster/gissa-teckningen/fordon/bil/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_09_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En bil. |
| `roster/gissa-teckningen/fordon/brandbil/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_03_51_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en brandbil. |
| `roster/gissa-teckningen/fordon/brandbil/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_34_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en brandbil. |
| `roster/gissa-teckningen/fordon/brandbil/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_34_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en brandbil. |
| `roster/gissa-teckningen/fordon/brandbil/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_03_57_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Brandbilen säger Io-Io. |
| `roster/gissa-teckningen/fordon/brandbil/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_45_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Brandbilen säger i-o-i-o! |
| `roster/gissa-teckningen/fordon/brandbil/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_45_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Brandbilen säger Io, Io! |
| `roster/gissa-teckningen/fordon/brandbil/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_03_44_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En brandbil. |
| `roster/gissa-teckningen/fordon/brandbil/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_24_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En brandbil! |
| `roster/gissa-teckningen/fordon/brandbil/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_24_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En brandbil! |
| `roster/gissa-teckningen/fordon/buss/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_58_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en buss. |
| `roster/gissa-teckningen/fordon/buss/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_05_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en buss. |
| `roster/gissa-teckningen/fordon/buss/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_05_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en puss. |
| `roster/gissa-teckningen/fordon/buss/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_03_04_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Bussen kör! |
| `roster/gissa-teckningen/fordon/buss/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_14_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Bussen kör! |
| `roster/gissa-teckningen/fordon/buss/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_14_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Bussen kör! |
| `roster/gissa-teckningen/fordon/buss/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_02_52_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En buss. |
| `roster/gissa-teckningen/fordon/buss/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_14_55_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En bus! |
| `roster/gissa-teckningen/fordon/buss/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_14_55_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En bus! |
| `roster/gissa-teckningen/fordon/cykel/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_29_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en cykel. |
| `roster/gissa-teckningen/fordon/cykel/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_18_08_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en cykel. |
| `roster/gissa-teckningen/fordon/cykel/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_18_08_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en cykel. |
| `roster/gissa-teckningen/fordon/cykel/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_35_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Cykeln säger pling-pling. |
| `roster/gissa-teckningen/fordon/cykel/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_18_19_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Cykeln säger pling-pling! |
| `roster/gissa-teckningen/fordon/cykel/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_18_19_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Cykeln säger pling-pling! |
| `roster/gissa-teckningen/fordon/cykel/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_23_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En cykel. |
| `roster/gissa-teckningen/fordon/cykel/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_58_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En cykel! |
| `roster/gissa-teckningen/fordon/cykel/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_58_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En cykel! |
| `roster/gissa-teckningen/fordon/flygplan/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_45_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är ett flygplan. |
| `roster/gissa-teckningen/fordon/flygplan/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_38_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är ett flygplan. |
| `roster/gissa-teckningen/fordon/flygplan/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_38_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är ett flygplan. |
| `roster/gissa-teckningen/fordon/flygplan/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_51_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Flygplanet flyger. |
| `roster/gissa-teckningen/fordon/flygplan/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_49_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Flygplanet flyger! |
| `roster/gissa-teckningen/fordon/flygplan/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_49_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Flygplanet flyger! |
| `roster/gissa-teckningen/fordon/flygplan/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_39_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Ett flygplan. |
| `roster/gissa-teckningen/fordon/flygplan/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_17_28_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Ett flygplan! |
| `roster/gissa-teckningen/fordon/flygplan/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_17_28_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Ett flygplan! |
| `roster/gissa-teckningen/fordon/tag/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_09_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är ett tåg. |
| `roster/gissa-teckningen/fordon/tag/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_16_05_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är ett tåg. |
| `roster/gissa-teckningen/fordon/tag/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_16_05_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är ett tåg. |
| `roster/gissa-teckningen/fordon/tag/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_15_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Tåget säger tjoff tjoff. |
| `roster/gissa-teckningen/fordon/tag/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_16_15_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Tåget säger tjoff tjoff! |
| `roster/gissa-teckningen/fordon/tag/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_16_15_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Tåget säger tjoff tjoff! |
| `roster/gissa-teckningen/fordon/tag/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_04_03_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Ett tåg. |
| `roster/gissa-teckningen/fordon/tag/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_15_55_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Ett tåg! |
| `roster/gissa-teckningen/fordon/tag/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_15_55_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Ett tåg! |
| `roster/gissa-teckningen/lekplatsen/boll/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_44_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en boll. |
| `roster/gissa-teckningen/lekplatsen/boll/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_05_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Bollen studsar. |
| `roster/gissa-teckningen/lekplatsen/boll/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_38_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En boll. |
| `roster/gissa-teckningen/lekplatsen/gunga/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_57_08_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en gunga. |
| `roster/gissa-teckningen/lekplatsen/gunga/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_17_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Gungan gungar. |
| `roster/gissa-teckningen/lekplatsen/gunga/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_57_02_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En gunga. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_59_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en gungbräda. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en gungbräda. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_21_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en gungbräda. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_07_05_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Gungbrädan går upp och ner. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Gungbrädan går upp och ner. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_21_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Gungbrädan går upp och ner. |
| `roster/gissa-teckningen/lekplatsen/gungbrada/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_53_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En gungbräda! |
| `roster/gissa-teckningen/lekplatsen/gungbrada/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_21_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En gungbräda! |
| `roster/gissa-teckningen/lekplatsen/gungbrada/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_21_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En gungbräda! |
| `roster/gissa-teckningen/lekplatsen/hink/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_56_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en hink. |
| `roster/gissa-teckningen/lekplatsen/hink/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_00_11_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hinken hoppar! |
| `roster/gissa-teckningen/lekplatsen/hink/saga-tagning-2.mp3` | ElevenLabs_2026-11-05T21_02_11_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Hinken heller. |
| `roster/gissa-teckningen/lekplatsen/hink/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T20_56_50_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En hink. |
| `roster/gissa-teckningen/lekplatsen/rutschkana/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_47_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en rutschkana. |
| `roster/gissa-teckningen/lekplatsen/rutschkana/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en rutschkana. |
| `roster/gissa-teckningen/lekplatsen/rutschkana/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en rutschkana. |
| `roster/gissa-teckningen/lekplatsen/rutschkana/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_53_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Vi nerför rutschkanan! |
| `roster/gissa-teckningen/lekplatsen/rutschkana/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Whee! Nerför rutschkanan! |
| `roster/gissa-teckningen/lekplatsen/rutschkana/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Wee! Nerför rutschkanan! |
| `roster/gissa-teckningen/lekplatsen/rutschkana/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_41_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En rutschkana! |
| `roster/gissa-teckningen/lekplatsen/rutschkana/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En rutschkana! |
| `roster/gissa-teckningen/lekplatsen/rutschkana/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En rutschkana! |
| `roster/gissa-teckningen/lekplatsen/sandlada/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_05_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en sandlåda. |
| `roster/gissa-teckningen/lekplatsen/sandlada/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_41_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en sandlåda. |
| `roster/gissa-teckningen/lekplatsen/sandlada/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_41_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en sandlåda. |
| `roster/gissa-teckningen/lekplatsen/sandlada/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_11_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Sanden år. |
| `roster/gissa-teckningen/lekplatsen/sandlada/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_51_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Sanden år! |
| `roster/gissa-teckningen/lekplatsen/sandlada/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_51_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Sanden år! |
| `roster/gissa-teckningen/lekplatsen/sandlada/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_05_59_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En sandlåda. |
| `roster/gissa-teckningen/lekplatsen/sandlada/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_19_31_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En sandlåda! |
| `roster/gissa-teckningen/lekplatsen/sandlada/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_19_31_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En sandlåda! |
| `roster/gissa-teckningen/lekplatsen/spade/namn-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_41_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Det är en spade. |
| `roster/gissa-teckningen/lekplatsen/spade/namn-tagning-2.mp3` | ElevenLabs_2026-11-06T12_20_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Det är en spade. |
| `roster/gissa-teckningen/lekplatsen/spade/namn-tagning-3.mp3` | ElevenLabs_2026-11-06T12_20_11_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Det är en spade. |
| `roster/gissa-teckningen/lekplatsen/spade/saga-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_47_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | Spaden gräver. |
| `roster/gissa-teckningen/lekplatsen/spade/saga-tagning-2.mp3` | ElevenLabs_2026-11-06T12_20_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | Spaden gräver! |
| `roster/gissa-teckningen/lekplatsen/spade/saga-tagning-3.mp3` | ElevenLabs_2026-11-06T12_20_22_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | Spaden gräver! |
| `roster/gissa-teckningen/lekplatsen/spade/svar-tagning-1.mp3` | ElevenLabs_2026-11-05T21_06_35_Malin - Professional Swedish Narration_pvc_sp86_s50_sb75_t2-5.mp3 | En spade. |
| `roster/gissa-teckningen/lekplatsen/spade/svar-tagning-2.mp3` | ElevenLabs_2026-11-06T12_20_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4.mp3 | En spade! |
| `roster/gissa-teckningen/lekplatsen/spade/svar-tagning-3.mp3` | ElevenLabs_2026-11-06T12_20_01_Malin - Professional Swedish Narration_pvc_s50_sim75_v4 (1).mp3 | En spade! |
| `roster/tittut/kanel-hej-tagning-1.mp3` | kanel-hej.mp3 | Hej kanel! |
| `roster/tittut/kanel-var-tagning-1.mp3` | kanel-var.mp3 | Vad är kanel? (= Var är Kanel?) |
| `roster/tittut/blunda-1-tagning-1.mp3` | blunda-1.mp3 | Blunda. |
| `roster/tittut/dar-1-tagning-1.mp3` | dar-1.mp3 | Där. |
| `roster/tittut/inte-dar-1-tagning-1.mp3` | inte-dar-1.mp3 | Nej, inte där! |
| `roster/tittut/tittut-2-tagning-1.mp3` | tittut-2.mp3 | Titit! (= Tittut!) |
| `roster/tittut/borta-1-tagning-1.mp3` | borta-1.mp3 | Brutta! (= Borta!, viskat) |
| `roster/tittut/borta-2-tagning-1.mp3` | borta-2.mp3 | Potta! (= Borta!) |
| `roster/tittut/borta-4-tagning-1.mp3` | borta-4.mp3 | Oj, borta! |
| `roster/tittut/borta-5-tagning-1.mp3` | borta-5.mp3 | Borta. Var tog du vägen? |
| `roster/tittut/tittut-3-tagning-1.mp3` | tittut-3.mp3 | Titt ut! |
| `roster/tittut/tittut-4-tagning-1.mp3` | tittut-4.mp3 | Titta ut! Där är du! |
| `roster/tittut/kanin-hej-tagning-1.mp3` | kanin-hej.mp3 | Hej kaminen! (= Hej kaninen!) |
| `roster/tittut/kanin-var-tagning-1.mp3` | kanin-var.mp3 | Var är kaninen? |
| `roster/tittut/lamm-hej-tagning-1.mp3` | lamm-hej.mp3 | Hej lammet! |
| `roster/tittut/lamm-var-tagning-1.mp3` | lamm-var.mp3 | Var är lammet? |
| `roster/tittut/ko-hej-tagning-1.mp3` | ko-hej.mp3 | Hej, korn! (= Hej kon!?) |
| `roster/tittut/ko-var-tagning-1.mp3` | ko-var.mp3 | Var det kon? (= Var är kon?) |
| `roster/tittut/leopard-hej-tagning-1.mp3` | leopard-hej.mp3 | Hej Leoparden! |
| `roster/tittut/leopard-var-tagning-1.mp3` | leopard-var.mp3 | Var är leoparden? |
| `roster/tittut/lejon-hej-tagning-1.mp3` | lejon-hej.mp3 | Hej Lejonette! (= Hej lejonet!) |
| `roster/tittut/lejon-var-tagning-1.mp3` | lejon-var.mp3 | Var är lejonet? |
| `effekter/prassel-ho/prassel-ho-original-1.mp3` | dry_hay_rustling_sof_#1-1793998907293.mp3 | (effekt: hö som prasslar) |
| `effekter/helikopter-surr/helikopter-surr-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/helikopter-start/helikopter-start-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/helikopter-stannar/helikopter-stannar-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/moln-puff/moln-puff-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/vind-hatt/vind-hatt-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/ryt-gasp/ryt-gasp-1…4.mp3` | ElevenLabs SFX 2026-11-10 | (effekt till 011, se `assets/ljud/effekter/README.md`) |
| `effekter/{nos,flamt-valp,vov-pip}/<familj>-original-N-v1…4.wav` | ElevenLabs SFX 2026-11-10 | (fler hundljud till Hugo i Tittut; `nos` tagning 1 var tyst och togs bort) |
| `effekter/{vov-babbel,vov-fniss,vov-ja,smyg,svansvift}/<familj>-original-N-v1…4.wav` | ElevenLabs SFX 2026-11-10 | (Hugos ljud i Tittut, alla 4 versionerna per rad, se `produktion/youtube/tittut/ljud-hugo.md`) |
| `roster/2026-11-10 Malin hund/tagning-1.mp3`, `tagning-2.mp3` | ElevenLabs_2026-11-10T21_00_04_Malin…_v3.mp3 och (1) | Hela `lekplatsen/hunden-hugo/rost.txt` plus "Hej hunden!". Tagning 1 används → `roster/tittut/hund-hej.m4a` och `roster/tittut/hund-lekplats/` |
| `roster/2026-11-10 Malin 011/tagning-1.mp3`, `tagning-2.mp3` | ElevenLabs_2026-11-10T15_54_29_Malin…_v3.mp3 och (1) | Titta! · Något långt. · En banan! En gul banan! · Nu flyger vi! → `titta-4/5`, `nagot-langt-1/2`, `en-banan-en-gul-banan-1/2`, `nu-flyger-vi-1/2` |
| `roster/gissa-teckningen/skogen/groda/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_19_24_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En groda! — används |
| `roster/gissa-teckningen/skogen/groda/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_19_24_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En groda! (hörs: "En gero buddha?") |
| `roster/gissa-teckningen/skogen/groda/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_19_50_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Grodan säger kvack. — används |
| `roster/gissa-teckningen/skogen/groda/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_19_50_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Grodan säger kvack. |
| `roster/gissa-teckningen/skogen/mus/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_20_12_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En mus! — används |
| `roster/gissa-teckningen/skogen/mus/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_20_12_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En mus! |
| `roster/gissa-teckningen/skogen/mus/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_20_23_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Musen säger pip. — används |
| `roster/gissa-teckningen/skogen/mus/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_20_23_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Musen säger pip. |
| `roster/gissa-teckningen/skogen/uggla/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_20_51_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En uggla! — används |
| `roster/gissa-teckningen/skogen/uggla/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_20_51_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En uggla! |
| `roster/gissa-teckningen/skogen/uggla/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_21_02_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ugglan säger hoho. (hörs: "cho-cho") |
| `roster/gissa-teckningen/skogen/uggla/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_21_02_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ugglan säger hoho. — används |
| `roster/gissa-teckningen/skogen/bi/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_21_13_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ett bi! — används |
| `roster/gissa-teckningen/skogen/bi/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_21_13_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ett bi. |
| `roster/gissa-teckningen/skogen/bi/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_21_24_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Biet surrar. (hörs: "Byet") |
| `roster/gissa-teckningen/skogen/bi/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_21_24_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Biet surrar! — används |
| `roster/gissa-teckningen/skogen/igelkott/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_21_50_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En igelkott! — används |
| `roster/gissa-teckningen/skogen/igelkott/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_21_50_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En igelkott! |
| `roster/gissa-teckningen/skogen/igelkott/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_22_01_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Igelkotten nosar. — används |
| `roster/gissa-teckningen/skogen/igelkott/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_22_01_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Igelkotten nosar. |
| `roster/gissa-teckningen/skogen/ekorre/svar-tagning-1.mp3` | ElevenLabs_2026-11-11T15_22_12_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En ekorre! — används |
| `roster/gissa-teckningen/skogen/ekorre/svar-tagning-2.mp3` | ElevenLabs_2026-11-11T15_22_12_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En ekorre! |
| `roster/gissa-teckningen/skogen/ekorre/saga-tagning-1.mp3` | ElevenLabs_2026-11-11T15_22_23_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ekorren hoppar! — används |
| `roster/gissa-teckningen/skogen/ekorre/saga-tagning-2.mp3` | ElevenLabs_2026-11-11T15_22_23_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ekorren hoppar! (hörs: "Äckorren") |
| `roster/jul/ram-tagning-1.mp3` | ElevenLabs_2026-11-11T17_58_55_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Idag öppnar vi lucka ett … åtta! + Vi ses i morgon! — 1 används för alla utom lucka 5, 2 för lucka 5 |
| `roster/jul/ram-tagning-2.mp3` | ElevenLabs_2026-11-11T17_58_55_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Idag öppnar vi lucka ett … åtta! + Vi ses i morgon! — 1 används för alla utom lucka 5, 2 för lucka 5 |
| `roster/jul/gemensamma-tagning-1.mp3` | ElevenLabs_2026-11-11T17_59_42_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Hej grisen! … En gång till! (nio repliker) — 2 används för Hej då grisen! och Nu dansar vi!, 1 för resten; "Hej grisen!" hörs som Grinsem/grusem, ny tagning i luckor-6-8 |
| `roster/jul/gemensamma-tagning-2.mp3` | ElevenLabs_2026-11-11T17_59_42_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Hej grisen! … En gång till! (nio repliker) — 2 används för Hej då grisen! och Nu dansar vi!, 1 för resten; "Hej grisen!" hörs som Grinsem/grusem, ny tagning i luckor-6-8 |
| `roster/jul/luckor-1-5-tagning-1.mp3` | ElevenLabs_2026-11-11T18_02_07_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En stjärna! … Kan du säga wiii? (elva repliker) — 2 används |
| `roster/jul/luckor-1-5-tagning-2.mp3` | ElevenLabs_2026-11-11T18_02_07_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En stjärna! … Kan du säga wiii? (elva repliker) — 2 används |
| `roster/jul/luckor-6-8-tagning-1.mp3` | ElevenLabs_2026-11-11T18_04_11_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ett … två. … Kan du vinka till snögubben? + Hej grisen! ×2 — 2 används (Hej grisen! från 1) |
| `roster/jul/luckor-6-8-tagning-2.mp3` | ElevenLabs_2026-11-11T18_04_11_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ett … två. … Kan du vinka till snögubben? + Hej grisen! ×2 — 2 används (Hej grisen! från 1) |
| `roster/jul/omtagning-tagning-1.mp3` | ElevenLabs_2026-11-11T18_10_55_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En snögubbe! ×3, Grisen åker pulka. Wiii!, Kan du säga wiii? — 2 används för snögubben och Wiii! |
| `roster/jul/omtagning-tagning-2.mp3` | ElevenLabs_2026-11-11T18_10_55_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En snögubbe! ×3, Grisen åker pulka. Wiii!, Kan du säga wiii? — 2 används för snögubben och Wiii! |
| `roster/jul/luckor-1-nytt-tagning-1.mp3` | ElevenLabs_2026-11-11T18_37_23_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Lucka 1 som liten berättelse: En mörkblå himmel. / Oj! Ett moln. / Var är stjärnan? / Här kommer suddgummit! / Sudd, sudd, sudd! / Tack, suddgummit! — 1 används för alla utom "Var är stjärnan?" (2; 1 hörs som "Var det stjärnamn") |
| `roster/jul/luckor-1-nytt-tagning-2.mp3` | ElevenLabs_2026-11-11T18_37_23_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Lucka 1 som liten berättelse: En mörkblå himmel. / Oj! Ett moln. / Var är stjärnan? / Här kommer suddgummit! / Sudd, sudd, sudd! / Tack, suddgummit! — 1 används för alla utom "Var är stjärnan?" (2; 1 hörs som "Var det stjärnamn") |
| `roster/jul/sudd-omtagning-tagning-1.mp3` | ElevenLabs_2026-11-11T18_39_13_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Sudd, sudd, sudd! ×3 (en längre tagning) — 1, första raden används som `01-sudd-sudd-sudd` |
| `roster/jul/sudd-omtagning-tagning-2.mp3` | ElevenLabs_2026-11-11T18_39_13_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Sudd, sudd, sudd! ×3 (en längre tagning) — 1, första raden används som `01-sudd-sudd-sudd` |
| `roster/jul/lucka-1-och-intro-tagning-1.mp3` | ElevenLabs_2026-11-11T20_44_43_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Hej och välkommen till julkalendern! … Jaha! Det var en julstjärna. Vad fint! (elva repliker) — 1 används |
| `roster/jul/lucka-1-och-intro-tagning-2.mp3` | ElevenLabs_2026-11-11T20_44_43_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Hej och välkommen till julkalendern! … Jaha! Det var en julstjärna. Vad fint! (elva repliker) — 1 används |
| `roster/jul/lucka-6-7-9-tagning-1.mp3` | ElevenLabs_2026-11-11T20_52_14_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Så fint det lyser. … Hm … vad gör vi nu? (elva repliker) — 1 används, utom Oj! Kulan gick sönder. (2); Spaden städar upp. och Vi öppnar det på julafton. kom från `omtagning-2` |
| `roster/jul/lucka-6-7-9-tagning-2.mp3` | ElevenLabs_2026-11-11T20_52_14_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Så fint det lyser. … Hm … vad gör vi nu? (elva repliker) — 1 används, utom Oj! Kulan gick sönder. (2); Spaden städar upp. och Vi öppnar det på julafton. kom från `omtagning-2` |
| `roster/jul/just-det-1-12-tagning-1.mp3` | ElevenLabs_2026-11-11T20_59_22_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Just det, ett! … tolv! — 1 används (2 sa "Just det är …" och hamnade fel) |
| `roster/jul/just-det-1-12-tagning-2.mp3` | ElevenLabs_2026-11-11T20_59_22_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Just det, ett! … tolv! — 1 används (2 sa "Just det är …" och hamnade fel) |
| `roster/jul/just-det-13-24-tagning-1.mp3` | ElevenLabs_2026-11-11T21_05_55_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Just det, tretton! … tjugofyra! — 1 används, utom tjugotvå (2) |
| `roster/jul/just-det-13-24-tagning-2.mp3` | ElevenLabs_2026-11-11T21_05_55_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Just det, tretton! … tjugofyra! — 1 används, utom tjugotvå (2) |
| `roster/jul/lucka-9-16-vi-ses-snart-tagning-1.mp3` | ElevenLabs_2026-11-11T21_09_59_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Idag öppnar vi lucka nio … sexton + Vi ses snart! — 1 används, utom lucka 10 (2); lucka 9 kom från `omtagning-2` |
| `roster/jul/lucka-9-16-vi-ses-snart-tagning-2.mp3` | ElevenLabs_2026-11-11T21_09_59_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Idag öppnar vi lucka nio … sexton + Vi ses snart! — 1 används, utom lucka 10 (2); lucka 9 kom från `omtagning-2` |
| `roster/jul/lucka-17-24-tagning-1.mp3` | ElevenLabs_2026-11-11T21_12_52_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Idag öppnar vi lucka sjutton … tjugofyra — 1 används, utom lucka 19 (`omtagning-2`) |
| `roster/jul/lucka-17-24-tagning-2.mp3` | ElevenLabs_2026-11-11T21_12_52_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Idag öppnar vi lucka sjutton … tjugofyra — 1 används, utom lucka 19 (`omtagning-2`) |
| `roster/jul/lucka-13-20-22-tagning-1.mp3` | ElevenLabs_2026-11-11T21_14_56_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Lucka 13, 20 och 22 (elva repliker) — 2 används, utom Granen lyser. (`omtagning-2`) |
| `roster/jul/lucka-13-20-22-tagning-2.mp3` | ElevenLabs_2026-11-11T21_14_56_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Lucka 13, 20 och 22 (elva repliker) — 2 används, utom Granen lyser. (`omtagning-2`) |
| `roster/jul/lucka-23-24-tagning-1.mp3` | ElevenLabs_2026-11-11T21_18_17_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Nu klär vi granen. … God jul! (nio repliker) — 1 används, utom Och stjärnan i toppen. (`omtagning-2`) |
| `roster/jul/lucka-23-24-tagning-2.mp3` | ElevenLabs_2026-11-11T21_18_17_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Nu klär vi granen. … God jul! (nio repliker) — 1 används, utom Och stjärnan i toppen. (`omtagning-2`) |
| `roster/jul/omtagning-2-tagning-1.mp3` | ElevenLabs_2026-11-11T21_21_42_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Omtagning av lucka 9 och 19, Spaden städar upp., Vi öppnar det på julafton., Granen lyser., Och stjärnan i toppen. (varje två gånger utom lucka 19) — 2 används för lucka 9, lucka 19, Spaden, Vi öppnar, Granen lyser; Och stjärnan i toppen från rad 1 |
| `roster/jul/omtagning-2-tagning-2.mp3` | ElevenLabs_2026-11-11T21_21_42_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Omtagning av lucka 9 och 19, Spaden städar upp., Vi öppnar det på julafton., Granen lyser., Och stjärnan i toppen. (varje två gånger utom lucka 19) — 2 används för lucka 9, lucka 19, Spaden, Vi öppnar, Granen lyser; Och stjärnan i toppen från rad 1 |
| `roster/jul/lucka-1-tre-minuter-tagning-1.mp3` | ElevenLabs_2026-11-12T05_39_30_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Oj! Stjärnan är så liten nu. … Tack, kritan! (sju repliker) — 2 används; tack-kritan kom från `raknerader-och-tack` (1 hördes som "Ritan") |
| `roster/jul/lucka-1-tre-minuter-tagning-2.mp3` | ElevenLabs_2026-11-12T05_39_30_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Oj! Stjärnan är så liten nu. … Tack, kritan! (sju repliker) — 2 används; tack-kritan kom från `raknerader-och-tack` (1 hördes som "Ritan") |
| `roster/jul/raknerader-och-tack-tagning-1.mp3` | ElevenLabs_2026-11-12T05_42_24_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | En stråle. / En till. / Och en till! + Ett hörn. / Ett till. / Och ett till! + Tack, kritan! ×3 — 2 används (tack-kritan: tredje; 1 hördes som "Ritam"); en till och Ett hörn höjdes med gain |
| `roster/jul/raknerader-och-tack-tagning-2.mp3` | ElevenLabs_2026-11-12T05_42_24_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | En stråle. / En till. / Och en till! + Ett hörn. / Ett till. / Och ett till! + Tack, kritan! ×3 — 2 används (tack-kritan: tredje; 1 hördes som "Ritam"); en till och Ett hörn höjdes med gain |
| `roster/jul/lucka-9-tre-minuter-tagning-1.mp3` | ElevenLabs_2026-11-12T05_45_53_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Oj! Snö föll från granen. … Nu är paketet torrt och glatt! (åtta repliker) — 1 används, utom Titta, snön faller bredvid! (2); Snö föll och Kan du skaka kom från `lucka-22-tre-minuter` |
| `roster/jul/lucka-9-tre-minuter-tagning-2.mp3` | ElevenLabs_2026-11-12T05_45_53_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Oj! Snö föll från granen. … Nu är paketet torrt och glatt! (åtta repliker) — 1 används, utom Titta, snön faller bredvid! (2); Snö föll och Kan du skaka kom från `lucka-22-tre-minuter` |
| `roster/jul/lucka-22-tre-minuter-tagning-1.mp3` | ElevenLabs_2026-11-12T05_49_00_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Granen är lite trött. … Granen dansar lugnt. (tio repliker) + Oj! Snö föll från granen. ×2 och Kan du skaka som paketet? ×2 — 1 används |
| `roster/jul/lucka-22-tre-minuter-tagning-2.mp3` | ElevenLabs_2026-11-12T05_49_00_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Granen är lite trött. … Granen dansar lugnt. (tio repliker) + Oj! Snö föll från granen. ×2 och Kan du skaka som paketet? ×2 — 1 används |
| `roster/jul/nya-repliker-01-tagning-1.mp3` | ElevenLabs_2026-11-12T14_54_37_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Dra, dra, dra! … Hunden är glad igen! (12 repliker) — används: a, utom Titta, den här är större! och Fff! Fff! Fff! (b; fff höjd +9 dB) |
| `roster/jul/nya-repliker-01-tagning-2.mp3` | ElevenLabs_2026-11-12T14_54_37_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Dra, dra, dra! … Hunden är glad igen! (12 repliker) — används: a, utom Titta, den här är större! och Fff! Fff! Fff! (b; fff höjd +9 dB) |
| `roster/jul/nya-repliker-02-tagning-1.mp3` | ElevenLabs_2026-11-12T14_57_29_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Flingan sitter kvar. Hunden fnissar! … Björnen dansar långsamt. Pepparkakan dansar fort. (12 repliker) — används: a |
| `roster/jul/nya-repliker-02-tagning-2.mp3` | ElevenLabs_2026-11-12T14_57_29_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Flingan sitter kvar. Hunden fnissar! … Björnen dansar långsamt. Pepparkakan dansar fort. (12 repliker) — används: a |
| `roster/jul/nya-repliker-03-tagning-1.mp3` | ElevenLabs_2026-11-12T14_58_15_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Oj! Musiken tog slut. … Pust! Den rör sig inte. (12 repliker) — används: a, utom Pepparkakan är glad! (b); Pust! höjd +2 dB |
| `roster/jul/nya-repliker-03-tagning-2.mp3` | ElevenLabs_2026-11-12T14_58_15_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Oj! Musiken tog slut. … Pust! Den rör sig inte. (12 repliker) — används: a, utom Pepparkakan är glad! (b); Pust! höjd +2 dB |
| `roster/jul/nya-repliker-04-tagning-1.mp3` | ElevenLabs_2026-11-12T15_00_10_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ljusen slocknade. Leoparden blir ledsen. … Lammet hoppar av glädje! (12 repliker) — används: b; Ljusen slocknade … och Nu lyser det! gjordes om i `nya-repliker-11` |
| `roster/jul/nya-repliker-04-tagning-2.mp3` | ElevenLabs_2026-11-12T15_00_10_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ljusen slocknade. Leoparden blir ledsen. … Lammet hoppar av glädje! (12 repliker) — används: b; Ljusen slocknade … och Nu lyser det! gjordes om i `nya-repliker-11` |
| `roster/jul/nya-repliker-05-tagning-1.mp3` | ElevenLabs_2026-11-12T15_02_37_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Ja, där är de! … Oj! Var är nosen? (12 repliker) — används: b, utom Hunden blir ledsen. (a) |
| `roster/jul/nya-repliker-05-tagning-2.mp3` | ElevenLabs_2026-11-12T15_02_37_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Ja, där är de! … Oj! Var är nosen? (12 repliker) — används: b, utom Hunden blir ledsen. (a) |
| `roster/jul/nya-repliker-06-tagning-1.mp3` | ElevenLabs_2026-11-12T15_04_47_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Vem gömde den där? … Det är sand i hinken. (12 repliker) — används: b, utom Titta! Grisen har sovit. (a); den och Lammet blir förvånat. höjda +4/+3 dB |
| `roster/jul/nya-repliker-06-tagning-2.mp3` | ElevenLabs_2026-11-12T15_04_47_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Vem gömde den där? … Det är sand i hinken. (12 repliker) — används: b, utom Titta! Grisen har sovit. (a); den och Lammet blir förvånat. höjda +4/+3 dB |
| `roster/jul/nya-repliker-07-tagning-1.mp3` | ElevenLabs_2026-11-12T15_06_48_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Lammet ska sjunga för grisen. … Oj! Ljuset är så litet. (12 repliker) — används: b, utom Kan du strö sand? (a); Ett högt ljus! höjd +2 dB |
| `roster/jul/nya-repliker-07-tagning-2.mp3` | ElevenLabs_2026-11-12T15_06_48_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Lammet ska sjunga för grisen. … Oj! Ljuset är så litet. (12 repliker) — används: b, utom Kan du strö sand? (a); Ett högt ljus! höjd +2 dB |
| `roster/jul/nya-repliker-08-tagning-1.mp3` | ElevenLabs_2026-11-12T15_08_58_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Grisen blir ledsen. Kulorna är borta. … Kan du vinka? (12 repliker) — används: b, utom Kan du vinka? (a) |
| `roster/jul/nya-repliker-08-tagning-2.mp3` | ElevenLabs_2026-11-12T15_08_58_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Grisen blir ledsen. Kulorna är borta. … Kan du vinka? (12 repliker) — används: b, utom Kan du vinka? (a) |
| `roster/jul/nya-repliker-09-tagning-1.mp3` | ElevenLabs_2026-11-12T15_12_37_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Kaninen suckar. … Tack, grisen! (12 repliker) — används: a (tagningen genererades om av misstag; första versionen laddades inte ner) |
| `roster/jul/nya-repliker-09-tagning-2.mp3` | ElevenLabs_2026-11-12T15_12_37_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Kaninen suckar. … Tack, grisen! (12 repliker) — används: a (tagningen genererades om av misstag; första versionen laddades inte ner) |
| `roster/jul/nya-repliker-10-tagning-1.mp3` | ElevenLabs_2026-11-12T15_13_23_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Tack, hunden! … Paketet blir arg! (12 repliker) — används: b |
| `roster/jul/nya-repliker-10-tagning-2.mp3` | ElevenLabs_2026-11-12T15_13_23_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Tack, hunden! … Paketet blir arg! (12 repliker) — används: b |
| `roster/jul/nya-repliker-11-tagning-1.mp3` | ElevenLabs_2026-11-12T15_14_58_Malin - Professional Swedish Narration_pvc_s50_v3.mp3 | Paketet är glad igen! … Nu lyser det! (8 repliker) — används: b, utom Ljusen slocknade … och Kritan ritar en julgransfot! (a); de två sista raderna är omtagningar från `nya-repliker-04` |
| `roster/jul/nya-repliker-11-tagning-2.mp3` | ElevenLabs_2026-11-12T15_14_58_Malin - Professional Swedish Narration_pvc_s50_v3 (1).mp3 | Paketet är glad igen! … Nu lyser det! (8 repliker) — används: b, utom Ljusen slocknade … och Kritan ritar en julgransfot! (a); de två sista raderna är omtagningar från `nya-repliker-04` |
