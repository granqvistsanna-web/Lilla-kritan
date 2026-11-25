#!/bin/bash
# Skarvar 3D-introt och 3D-outrot på en färdig lucka: introts bildrutor fram till OPPEN, luckans egen film däremellan,
# och outrots bildrutor i stället för luckans sista SLUTRUTOR (lucka.js stänger luckan och visar alla luckor där).
# Tiderna är lucka.js egna, så ljudet är luckans eget hela vägen (rösterna, jingeln och musiken ligger rätt) och de nya
# effekterna läggs ovanpå: tindra när guldramen tänds (PEK + 0,05), glitter när ljuset strömmar ut (OPP0 + 0,05) och
# tindra på sista "Hurra!" i outrot (RA[2] - 0,15, alltså SLUT_TINDRA s in i outrot).
#   bash produktion/three-rum/julkalender-intro/skarva.sh            (lucka 24, prov)
# Tiderna står i window.TIDER på sidan (lucka 24: PEK 6,126, OPP0 10,114, OPPEN 10,933 = ruta 328, T0 13,933,
# RA[2] 21,784, slutRutor 350).
set -euo pipefail
cd "$(dirname "$0")/../../.."
D=produktion/three-rum/julkalender-intro
INTRO=$D/julkalender-intro.mp4 SLUT=$D/julkalender-slut.mp4
LUCKA=produktion/youtube/shorts/jul/24-bjornen-vaknar-pa-julafton/24-bjornen-vaknar-pa-julafton.mp4
UT=$D/lucka-24-3d.mp4
RUTA=328 PEK=6.126 OPP0=10.114 SLUTRUTOR=350 SLUT_TINDRA=7.7006
N=$(ffprobe -v error -count_packets -select_streams v -show_entries stream=nb_read_packets -of csv=p=0 "$LUCKA" | tr -d ,)
S0=$((N - SLUTRUTOR))
ms() { echo "$1*1000/1" | bc; }
E=assets/ljud/effekter
ffmpeg -y -loglevel error -i "$INTRO" -i "$LUCKA" -i "$SLUT" -i $E/tindra/tindra-2.m4a -i $E/glitter/glitter-1.m4a -i $E/tindra/tindra-3.m4a -filter_complex "
  [0:v]trim=end_frame=$RUTA,setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=$RUTA:end_frame=$S0,setpts=PTS-STARTPTS[b];
  [2:v]trim=end_frame=$SLUTRUTOR,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v];
  [3:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.36,adelay=$(ms $PEK):all=1[t];
  [4:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.32,adelay=$(ms "($OPP0+0.05)"):all=1[g];
  [5:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.36,adelay=$(ms "($S0/30+$SLUT_TINDRA)"):all=1[h];
  [1:a]aformat=sample_rates=48000:channel_layouts=stereo[l];[l][t][g][h]amix=inputs=4:normalize=0:duration=first[au]" \
  -map '[v]' -map '[au]' -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$UT"
echo "$UT"
