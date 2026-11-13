#!/bin/bash
# Avsnitt 017 Mors lilla Olle: introt (intro/intro-med-jingel.mp4, 9,0 s) följt av kodscenen skogen (scener/skogen/skogen.mp4,
# bild 01–28) med sang.mp3 oklippt och skogen-effekter.wav under. Avsnittstid = sångtid + 9 s.
# (Förra versionen var storyboardens animatic med 11 s intro; den behövs inte när hela filmen är en kodscen.)
# Kör från var som helst: film/satt-ihop.sh  → film/avsnitt-017-grovklipp.mp4
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-017-grovklipp.mp4
# bild: intro + scen (scenen kan vara --snabb, 15 fps, skalas upp) · ljud: introts jingel, sedan sången och scenens effekter från 9 s
ffmpeg -nostdin -loglevel error -y -i intro/intro-med-jingel.mp4 -i scener/skogen/skogen.mp4 -i sang.mp3 -i scener/skogen/skogen-effekter.wav \
  -filter_complex "[0:v]scale=1920:1080,fps=30,setsar=1[v0];[1:v]scale=1920:1080,fps=30,setsar=1[v1];[v0][v1]concat=n=2:v=1:a=0[v];[2:a]adelay=9000|9000[s];[3:a]adelay=9000|9000[e];[0:a][s][e]amix=inputs=3:duration=longest:normalize=0[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest $UT
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
