#!/bin/bash
# Sätter ihop avsnitt 019 (efter film/rendera.sh): introt med jingeln, sedan scenen (kritan ritar utan musik i FORSPEL s,
# sedan hela sången oklippt, se ../scener/index.html), med sången, scenens effekter och skogsljud som i 005:
# skogsljudet från 0:09 genom kritans ritande och 1,2 s in i sången. Mixen som 005: effekter +6 dB, allt +1,3 dB, limiter.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-019.mp4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
FORSPEL=7
# introt: jingelns första 9,9 s med introts effekter
ffmpeg -loglevel error -y -i intro/intro.mp4 -i intro/jingel.m4a -i intro/intro-effekter.wav -filter_complex \
  "[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9.9,afade=t=out:st=9.5:d=0.4,apad[j];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st=9.5:d=0.4,volume=6dB[e];[j][e]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel.mp4
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i intro/intro-med-jingel.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i scener/scener.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}"); MSS=$(awk "BEGIN{printf \"%d\", ($IN+$FORSPEL)*1000}")
KV=$(awk "BEGIN{print $IN-9+$FORSPEL+1.2}")
ffmpeg -loglevel error -y -i $T/bild.mp4 -i intro/intro-med-jingel.mp4 -i sang.m4a -i scener/scener-effekter.wav -i ../../assets/ljud/effekter/skogsljud/skogsljud-1.m4a -filter_complex \
  "[1:a]apad[j];[2:a]adelay=$MSS|$MSS[s];[3:a]volume=6dB,adelay=$MS|$MS[e];[4:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:$KV,afade=t=in:d=1,afade=t=out:st=$(awk "BEGIN{print $KV-1.6}"):d=1.6,volume=0.9,adelay=9000|9000[k];[j][s][e][k]amix=inputs=4:duration=longest:normalize=0,volume=1.3dB,alimiter=limit=0.95[m];[m]atrim=0:$TOT[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
