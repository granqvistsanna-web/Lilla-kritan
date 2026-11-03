#!/bin/bash
# 30s test cut on song v2: intro zoom | R1 | R1 last-frame hold | V1 | V1 last-frame hold, song on top.
set -e
cd "$(dirname "$0")"
R1=../videos/R1-chorus-guided.mp4
V1=../videos/V1-garden-ball.mp4
SONG="../audio/Lilla Kvack v2.m4a"
V="scale=854:480,fps=24,format=yuv420p,setsar=1"

# hold the last frame of a clip with a gentle 4% push-in for N seconds
hold() { # in out seconds
  ffmpeg -v error -y -sseof -0.1 -i "$1" -frames:v 1 -update 1 last.png
  ffmpeg -v error -y -loop 1 -i last.png -vf "scale=1708:960,zoompan=z='1+0.04*on/($3*24)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=854x480:fps=24,format=yuv420p,setsar=1" -t "$3" "$2"
}

ffmpeg -v error -y -i "$R1" -t 5.179 -vf "colorlevels=rimax=0.88:gimax=0.88:bimax=0.88,$V" -an r1.mp4          # 7.894-13.073
hold r1.mp4 r1-hold.mp4 6.982                                      # 13.073-20.055
ffmpeg -v error -y -i "$V1" -vf "$V" -an v1.mp4
V1LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 v1.mp4)
hold "$V1" v1-hold.mp4 "$(echo "10.294 - $V1LEN" | bc)"           # to 30.349

printf "file '%s'\n" intro.mp4 r1.mp4 r1-hold.mp4 v1.mp4 v1-hold.mp4 > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -i "$SONG" -map 0:v -map 1:a -t 30.35 \
  -vf "fade=out:st=29.6:d=0.75" -af "afade=out:st=29.3:d=1" -c:v libx264 -crf 18 -c:a aac -b:a 192k test-cut-30s.mp4
rm -f last.png list.txt
echo done; ffprobe -v error -show_entries format=duration -of csv=p=0 test-cut-30s.mp4
