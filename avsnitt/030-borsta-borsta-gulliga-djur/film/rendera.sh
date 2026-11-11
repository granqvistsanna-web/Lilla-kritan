#!/bin/bash
# Slutrenderar avsnitt 030: scenen (../scener/badet, hela sången, tagning 2, 164,8 s) i 1920×1080 och 30 fps, i fyra delar, två åt gången
# (fyra samtidiga Chromium tappade ibland bilder, 019). Delarna sätts ihop till scener/badet/badet.mp4, och introt och scenens
# effektljud renderas om. Sedan: film/satt-ihop.sh film/avsnitt-030.mp4
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=badet
G=(0 41.2 82.4 123.6 164.8)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null & node render.mjs ../intro > /dev/null & wait
cd $S
for i in 0 1 2 3; do echo "file 'badet-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy badet.mp4
rm delar.txt badet-*-*.mp4
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate -of csv=p=0 badet.mp4
