#!/bin/bash
# Renderar avsnitt 021: scenen (../scener/lekplatsen, hela filmen efter introt, ca 152,7 s). Introt är det gemensamma
# bilderboksintrot (produktion/youtube/bilderbok-intro/intro.mp4) och renderas inte här. Scenen i fyra delar, två åt gången (fyra samtidiga Chromium tappade
# ibland bilder, 019). Delarna sätts ihop till scener/lekplatsen/lekplatsen.mp4. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=lekplatsen
G=(0 40 80 120 160)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null
cd $S
for i in 0 1 2 3; do echo "file '$S-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy $S.mp4
rm delar.txt $S-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $S.mp4
