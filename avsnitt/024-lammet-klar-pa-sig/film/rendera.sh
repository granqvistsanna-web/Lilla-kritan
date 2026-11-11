#!/bin/bash
# Renderar avsnitt 024 Lammet klär på sig: scenen ../scener/hallen (hela filmen efter introt: ritintrot på tomt papper, hallen
# och kritirisen; 157,27 s). Introt är det gemensamma bilderboksintrot (produktion/youtube/bilderbok-intro/intro.mp4) och
# renderas inte här; film/satt-ihop.sh lägger det först.
# Fyra delar, två åt gången (fyra samtidiga Chromium tappade ibland bilder, 019), effekterna för sig, sedan ihop till
# scener/hallen/hallen.mp4. Sedan: film/satt-ihop.sh.
# Bara nytt ljud (t.ex. när ba-gullig finns): cd ../scener && node render.mjs hallen --bara-ljud, sedan film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=hallen
G=(0 40 80 120 162.72)      # 162,72 = scenens DURATION (rader.mjs utan rad 00: 162,12 + 0,6 s svart)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null
cd $S
for i in 0 1 2 3; do echo "file '$S-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy $S.mp4
rm delar.txt $S-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $S.mp4
