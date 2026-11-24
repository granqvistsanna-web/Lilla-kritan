#!/bin/bash
# Skarvar 3D-introt på en färdig lucka: introts bildrutor fram till OPPEN, sedan luckans egen film från samma ruta.
# Tiderna är lucka.js egna, så ljudet är luckans eget hela vägen (rösterna, jingeln och musiken ligger rätt) och de nya
# effekterna läggs ovanpå: tindra när guldramen tänds (PEK + 0,05) och glitter när ljuset strömmar ut (OPP0 + 0,05).
#   bash produktion/three-rum/julkalender-intro/skarva.sh            (lucka 24, prov)
# Tiderna står i window.TIDER på sidan (lucka 24: PEK 6,126, OPP0 10,114, OPPEN 10,933 = ruta 328).
set -euo pipefail
cd "$(dirname "$0")/../../.."
INTRO=produktion/three-rum/julkalender-intro/julkalender-intro.mp4
LUCKA=produktion/youtube/shorts/jul/24-bjornen-vaknar-pa-julafton/24-bjornen-vaknar-pa-julafton.mp4
UT=produktion/three-rum/julkalender-intro/lucka-24-3d-intro.mp4
RUTA=328 PEK=6.126 OPP0=10.114
E=assets/ljud/effekter
ffmpeg -y -loglevel error -i "$INTRO" -i "$LUCKA" -i $E/tindra/tindra-2.m4a -i $E/glitter/glitter-1.m4a -filter_complex "
  [0:v]trim=end_frame=$RUTA,setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=$RUTA,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v];
  [2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.36,adelay=$(echo "$PEK*1000/1" | bc):all=1[t];
  [3:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.32,adelay=$(echo "($OPP0+0.05)*1000/1" | bc):all=1[g];
  [1:a]aformat=sample_rates=48000:channel_layouts=stereo[l];[l][t][g]amix=inputs=3:normalize=0:duration=first[au]" \
  -map '[v]' -map '[au]' -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$UT"
echo "$UT"
