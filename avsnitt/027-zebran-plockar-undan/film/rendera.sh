#!/bin/bash
# Renderar avsnitt 027: scenen (../scener/sovrummet, hela filmen efter introt) i fyra delar, två åt gången (fyra samtidiga
# Chromium tappade ibland bilder, 019; och högst två headless Chromium på maskinen). Sista delen går till scenens slut,
# så skriptet passar oavsett längd. Delarna sätts ihop till scener/sovrummet/sovrummet.mp4. Introt är det gemensamma
# bilderbok-introt (produktion/youtube/bilderbok-intro), som bara renderas om intro.mp4 saknas där. Sedan: film/satt-ihop.sh.
set -e -o pipefail
cd "$(dirname "$0")/../scener"
S=sovrummet
node render.mjs $S --fran 0 --till 40 > /dev/null & node render.mjs $S --fran 40 --till 80 > /dev/null & wait %1 && wait %2
node render.mjs $S --fran 80 --till 120 > /dev/null & node render.mjs $S --fran 120 > /dev/null & wait %1 && wait %2
INTRO=../../../produktion/youtube/bilderbok-intro
node render.mjs $S --bara-ljud > /dev/null & { [ -f $INTRO/intro.mp4 ] || $INTRO/render.sh > /dev/null; } & wait
cd $S
ls $S-*-*.mp4 | sort -t- -k2 -n | sed "s/.*/file '&'/" > delar.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i delar.txt -an -c copy $S.mp4
rm delar.txt $S-*-*.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 $S.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../$INTRO/intro.mp4
