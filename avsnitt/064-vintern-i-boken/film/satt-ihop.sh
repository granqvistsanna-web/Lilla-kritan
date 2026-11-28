#!/bin/bash
# Sätter ihop avsnitt 064 (efter molnrenderingen, verktyg/molnrender.sh): scenen i boken med dess effekter (Malins repliker, kaninens
# ljud, effekterna och vinterljudet i scener/boken/boken-effekter.wav) och sist prenumerera-kortet. Ingen logotyp före
# (Sanna 2026-11-28: "remove lilla kritan intro and start with book"; boken är introt).
# Prenumerera-kortet: produktion/youtube/prenumerera. Mixen som 058: effekterna +6 dB; mastras i två pass till −14 LUFS / −1,5 dBTP, AAC 192k → film/avsnitt-064.mp4.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-064.mp4
PREN=../../produktion/youtube/prenumerera
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i scener/boken/boken.mp4 -vf scale=1920:1080 $V $T/01.mp4
ffmpeg -loglevel error -y -i $PREN/prenumerera.mp4 -vf scale=1920:1080 $V $T/02.mp4
printf "file '01.mp4'\nfile '02.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
SC=$(langd $T/01.mp4); TOT=$(langd $T/bild.mp4)
PS=$(awk "BEGIN{printf \"%d\", $SC*1000}")
ffmpeg -loglevel error -y -i scener/boken/boken-effekter.wav -i $PREN/prenumerera-effekter.wav -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB[e];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$PS|$PS[p];[e][p]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.76:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
