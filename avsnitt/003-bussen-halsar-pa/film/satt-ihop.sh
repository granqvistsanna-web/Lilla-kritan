#!/bin/bash
# Sätter ihop hela avsnitt 003 av de renderade scenerna och lägger sången under.
# Introt (bild 01) är storyboardbilden tills introscenen och jingeln finns.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-003.mp4
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -loop 1 -t 8 -i storyboard/frames/01.jpg -vf "scale=1920:1080,setsar=1" $V film/.intro.mp4
# kritan ritar är 17 s men sången ger den 18 s: håll sista bilden 1 s
ffmpeg -loglevel error -y -i kritan-ritar/kritan-ritar.mp4 -vf "tpad=stop_mode=clone:stop_duration=1" $V film/.ritar.mp4
for s in a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken; do
  ffmpeg -loglevel error -y -i scener/$s/$s.mp4 $V film/.$s.mp4
done
printf "file '.%s.mp4'\n" intro ritar a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken > film/.lista.txt
# Sången börjar efter introt (8 s)
ffmpeg -loglevel error -y -f concat -safe 0 -i film/.lista.txt -i sang.m4a \
  -filter_complex "[1:a]adelay=8000|8000[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest $UT
rm -f film/.*.mp4 film/.lista.txt
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
