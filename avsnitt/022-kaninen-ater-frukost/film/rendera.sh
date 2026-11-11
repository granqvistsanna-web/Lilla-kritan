#!/bin/bash
# Renderar avsnitt 022 (kopia av 020:s film/rendera.sh): hela filmen är EN scen, ../scener/koket, ca 173,5 s. Introt är det gemensamma
# bilderbok-introt (produktion/youtube/bilderbok-intro), satt-ihop.sh sätter det före; det renderas inte här.
# Fyra delar, två åt gången (fyra samtidiga Chromium tappade ibland bilder, 019). Delarna sätts ihop till scener/koket/koket.mp4.
# Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=koket
G=(0 44 88 132 173.6)   # runda 4: 173,5 s (klättringen och letleken; introt sätts före i satt-ihop.sh)
for i in 0 2; do node render.mjs $S --fran ${G[$i]} --till ${G[$((i+1))]} > /dev/null & node render.mjs $S --fran ${G[$((i+1))]} --till ${G[$((i+2))]} > /dev/null & wait %1 && wait %2; done
node render.mjs $S --bara-ljud > /dev/null
cd $S
for i in 0 1 2 3; do echo "file '$S-${G[$i]}-${G[$((i+1))]}.mp4'"; done > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy $S.mp4
rm delar.txt $S-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $S.mp4
