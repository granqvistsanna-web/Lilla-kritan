#!/bin/bash
# Sätter ihop avsnitt 040 (efter node verktyg/render-delat.mjs avsnitt/040-leoparden-gar-och-lagger-sig/scener/kvall) UTAN intro:
# filmen är julkalenderns lucka 3, och kalenderramen är introt (som 039). Allt ljud (Malin, leopardens ljud, effekterna och
# rumsljuden hemmaljud-1 / rosa-sovrummet och den mjuka julmusiken jul-kvall) ligger redan i scener/kvall/kvall-effekter.wav.
# Mastras i två pass till −14 LUFS / −1,5 dBTP, limiter sist → film/avsnitt-040.mp4.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-040.mp4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
ffmpeg -loglevel error -y -i scener/kvall/kvall.mp4 -vf scale=1920:1080 -c:v libx264 -pix_fmt yuv420p -r 30 -an $T/bild.mp4
TOT=$(langd $T/bild.mp4)
ffmpeg -loglevel error -y -i scener/kvall/kvall-effekter.wav -af "aformat=sample_rates=48000:channel_layouts=stereo,apad,atrim=0:$TOT" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.75:level=false,volume=-0.5dB,alimiter=limit=0.78:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
