#!/bin/bash
# Sätter ihop avsnitt 037 (efter node verktyg/render-delat.mjs avsnitt/037-kaninen-stadar/scener/stada): det gemensamma
# bilderbok-introt (produktion/youtube/bilderbok-intro: intro.mp4 och intro-effekter.wav) och sedan scenen med sången (sang.m4a)
# och scenens ljud (stada-effekter.wav: popp, duns, glitter och Malins slutreplik). Mastras till −14 LUFS / −1,5 dBTP (loudnorm i två pass), som 034.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-037.mp4
INTRO=scener/intro   # eget intro "städtid 5 minuter!" (Sanna 2026-11-14: inte "Djuren hittar på")
SCEN=scener/stada/stada.mp4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i $INTRO/intro.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i $SCEN -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
# render-delat ger bilden utan ljud och ljuden i stada-effekter.wav; sången läggs under här, från scenens början (som render.mjs)
ffmpeg -loglevel error -y -i $INTRO/intro-effekter.wav -i scener/stada/stada-effekter.wav -i sang.m4a -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay=$MS|$MS[e];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st=300.1:d=0.45,adelay=$MS|$MS[s];[i][e][s]amix=inputs=3:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-13.2:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-13.2:TP=-2.0:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.7:attack=5:release=50:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -r $T
langd $UT
