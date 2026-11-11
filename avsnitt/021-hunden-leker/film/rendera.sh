#!/bin/bash
# Renderar avsnitt 021: scenen (../scener/lekplatsen, hela filmen efter introt, ca 211,0 s). Introt är det gemensamma
# bilderboksintrot (produktion/youtube/bilderbok-intro/intro.mp4) och renderas inte här. Scenen i fyra delar, två åt gången (fyra samtidiga Chromium tappade
# ibland bilder, 019). Delarna sätts ihop till scener/lekplatsen/lekplatsen.mp4. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=lekplatsen
G=(0 53 106 159 211)   # scenen är 211,0 s (0,6 s svart sist)   # heltal eller decimaler utan ",0" i slutet: render.mjs döper sista delen "…-211.mp4", "211.0" letade efter en fil som inte fanns
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null
cd $S
for i in 0 1 2 3; do echo "file '$S-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy $S.mp4
rm delar.txt $S-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $S.mp4
