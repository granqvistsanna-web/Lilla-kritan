#!/bin/bash
# Sätter ihop hela avsnitt 003 av de renderade scenerna och lägger jingeln och sången under.
# Introt är intro/intro-med-jingel.mp4 (med jingeln), annars intro/intro.mp4 (tyst).
# Kör efter `node scener/render.mjs <scen>` för varje scen.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-003.mp4
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
INTRO=intro/intro-med-jingel.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO $V film/.intro.mp4
# kritan ritar är 17 s men sången ger den 18 s: håll sista bilden 1 s
ffmpeg -loglevel error -y -i kritan-ritar/kritan-ritar.mp4 -vf "tpad=stop_mode=clone:stop_duration=1" $V film/.ritar.mp4
for s in a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken; do
  ffmpeg -loglevel error -y -i scener/$s/$s.mp4 $V film/.$s.mp4
done
printf "file '.%s.mp4'\n" intro ritar a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken > film/.lista.txt
# Sången börjar när introt är slut; jingeln (introts eget ljud) ligger före
MS=$(ffprobe -v error -show_entries format=duration -of csv=p=0 film/.intro.mp4 | awk '{printf "%d", $1*1000}')
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 $INTRO | grep -q .; then
  MIX="[2:a]adelay=$MS|$MS[s];[1:a]apad[j];[j][s]amix=inputs=2:duration=shortest:normalize=0[a]"
else
  MIX="[2:a]adelay=$MS|$MS[a]"
fi
ffmpeg -loglevel error -y -f concat -safe 0 -i film/.lista.txt -i $INTRO -i sang.m4a \
  -filter_complex "$MIX" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $UT
rm -f film/.*.mp4 film/.lista.txt
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
