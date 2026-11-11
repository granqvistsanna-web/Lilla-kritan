#!/bin/bash
# Renderar avsnitt 023: scenen (../scener/badet, hela filmen efter
# introt, 171,6 s) i fyra delar, två åt gången (fyra samtidiga Chromium tappade ibland bilder, 019). Delarna sätts ihop
# till scener/badet/badet.mp4. Introt är det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro), som bara
# renderas om intro.mp4 saknas där. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=badet
G=(0 43 86 129 172)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
INTRO=../../../produktion/youtube/bilderbok-intro
node render.mjs $S --bara-ljud > /dev/null & { [ -f $INTRO/intro.mp4 ] || $INTRO/render.sh > /dev/null; } & wait
cd $S
for i in 0 1 2 3; do echo "file 'badet-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy badet.mp4
rm delar.txt badet-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 badet.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../$INTRO/intro.mp4
