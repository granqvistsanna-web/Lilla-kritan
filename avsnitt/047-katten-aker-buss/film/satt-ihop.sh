#!/bin/bash
# Sätter ihop avsnitt 047 (efter node verktyg/render-delat.mjs avsnitt/047-katten-aker-buss/scener/resan [--snabb]) UTAN intro:
# filmen är en julkalenderlucka (som 040), kalenderramen är introt, så scentid = filmtid. Allt ljud (Malin, effekterna,
# vinterljudet och bussbrummet) ligger redan i scener/resan/resan-effekter.wav. Ingen musik än.
# Mastras i två pass till −14 LUFS / −1,5 dBTP, limiter sist → film/avsnitt-047.mp4 (med --snabb: film/avsnitt-047-snabb.mp4, 960×540).
set -e
cd "$(dirname "$0")/.."
if [ "$1" = "--snabb" ]; then UT=film/avsnitt-047-snabb.mp4; VF="scale=960:540"; R=15; else UT=film/avsnitt-047.mp4; VF="scale=1920:1080"; R=30; fi
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
ffmpeg -loglevel error -y -i scener/resan/resan.mp4 -vf $VF -c:v libx264 -pix_fmt yuv420p -r $R -an $T/bild.mp4
TOT=$(langd $T/bild.mp4)
ffmpeg -loglevel error -y -i scener/resan/resan-effekter.wav -af "aformat=sample_rates=48000:channel_layouts=stereo,apad,atrim=0:$TOT" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.75:level=false,volume=-0.5dB,alimiter=limit=0.78:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
