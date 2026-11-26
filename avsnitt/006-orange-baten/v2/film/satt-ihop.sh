#!/bin/bash
# Grovklipp av 006 v2 Orangea sången: introt (v2/intro, 013:s intro i orange, 9,0 s, jingeln, slutar helt orange) med hårt klipp
# till kritan-ritar (som börjar med att det orange svepet glider undan), sjön, bryggan, discot (slutar i kritirisen) och
# prenumerera-kortet. Avsnittstid = sångtid + 9,0; sången (../sang.m4a) oklippt. Effekterna läggs där varje scen börjar.
# Mixen som 033: introts effekter +6 dB, scenernas +3 dB, −14 LUFS / −1,5 dBTP.
# Kör efter: node scener/render.mjs ../intro   och   node verktyg/render-delat.mjs <scen> [--snabb] för alla scener.
set -e
cd "$(dirname "$0")/.."
UT=${1:-film/avsnitt-006-v2-grovklipp.mp4}
SCENER=(kritan-ritar sjon bryggan discot)
PREN=../../../produktion/youtube/prenumerera
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; rm -rf $T; mkdir -p $T
{ echo "file '../../intro/intro.mp4'"; for s in "${SCENER[@]}"; do echo "file '../../scener/$s/$s.mp4'"; done; echo "file '$(cd $PREN && pwd)/prenumerera.mp4'"; } > $T/lista.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/lista.txt -an -vf "scale=1920:1080,fps=30,format=yuv420p" -c:v libx264 -preset veryfast -crf 20 $T/bild.mp4
TOT=$(langd $T/bild.mp4)
ST="aformat=sample_rates=48000:channel_layouts=stereo"
in=(-i intro/jingel.m4a -i intro/intro-effekter.wav -i ../sang.m4a)
fx="[0:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4[j];[1:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4,volume=6dB[ie];[2:a]$ST,adelay=9000|9000[s];"
fl="[j][ie][s]"; n=3; start=$(langd intro/intro.mp4)
for s in "${SCENER[@]}" pren; do
  [ $s = pren ] && w=$PREN/prenumerera-effekter.wav v=$PREN/prenumerera.mp4 || w=scener/$s/$s-effekter.wav v=scener/$s/$s.mp4
  d=$(python3 -c "print(round($start*1000))"); in+=(-i $w); fx="$fx[$n:a]$ST,volume=3dB,adelay=$d|$d[e$n];"; fl="$fl[e$n]"; n=$((n+1))
  start=$(python3 -c "print($start + $(langd $v))")
done
ffmpeg -loglevel error -y "${in[@]}" -filter_complex "${fx}${fl}amix=inputs=$n:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.76:level=false:attack=2:release=60[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
