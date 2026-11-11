#!/bin/bash
# Renderar avsnitt 028: scenen (../scener/stranden, hela filmen efter
# introt, längden räknas ur storyboard/rader.mjs) i fyra delar, två åt gången (fyra samtidiga Chromium tappade ibland bilder, 019). Delarna sätts ihop
# till scener/stranden/stranden.mp4. Introt är det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro), som bara
# renderas om intro.mp4 saknas där. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=stranden
D=$(node -e "import('../storyboard/rader.mjs').then(m=>console.log(Math.ceil(m.RADER.reduce((s,r)=>s+r.d,0)+0.6)))")
Q=$(( (D + 3) / 4 )); G=(0 $Q $((2*Q)) $((3*Q)) $D)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
INTRO=../../../produktion/youtube/bilderbok-intro
node render.mjs $S --bara-ljud > /dev/null & { [ -f $INTRO/intro.mp4 ] || $INTRO/render.sh > /dev/null; } & wait
cd $S
for i in 0 1 2 3; do echo "file 'stranden-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy stranden.mp4
rm delar.txt stranden-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 stranden.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../$INTRO/intro.mp4
