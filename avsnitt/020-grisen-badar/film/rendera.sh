#!/bin/bash
# Renderar avsnitt 020: introt och scenen (../scener/badet, hela filmen efter introt, ca 166 s) i delar, två åt gången
# (fyra samtidiga Chromium tappade ibland bilder, 019). Delarna sätts ihop till scener/badet/badet.mp4. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=badet
G=(0 62 124 186 247)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null & node render.mjs ../intro > /dev/null & wait
cd $S
for i in 0 1 2 3; do echo "file 'badet-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy badet.mp4
rm delar.txt badet-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 badet.mp4
