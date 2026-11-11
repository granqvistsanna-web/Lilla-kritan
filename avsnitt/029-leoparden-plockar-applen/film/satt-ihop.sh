#!/bin/bash
# Sätter ihop avsnitt 029 (efter film/rendera.sh): det gemensamma bilderbok-introt (produktion/youtube/bilderbok-intro:
# intro.mp4 och intro-effekter.wav med jingeln, popp och glitter) och sedan scenen med dess
# effekter (Malins repliker, ljudeffekterna och fågelkvittret ligger i scener/appeltradet/appeltradet-effekter.wav).
# Mixen som 020: introts ljud och effekterna +6 dB, scenens förskjutna med introts längd (läses ur filen); mastras till −14 LUFS / −1,5 dBTP (loudnorm i två pass).
set -e
cd "$(dirname "$0")/.."
UT=${UT:-film/avsnitt-029.mp4}   # förhandsvisning: UT=film/forhands-029.mp4
INTRO=../../produktion/youtube/bilderbok-intro
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i $INTRO/intro.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i scener/appeltradet/appeltradet.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
ffmpeg -loglevel error -y -i $INTRO/intro-effekter.wav -i scener/appeltradet/appeltradet-effekter.wav -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS[e];[i][e]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
