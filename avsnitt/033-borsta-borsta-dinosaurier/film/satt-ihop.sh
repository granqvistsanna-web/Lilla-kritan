#!/bin/bash
# Grovklipp av avsnitt 033 Borsta, borsta (dinosaurier): introt (intro/, 013:s intro i turkos med titeln, 9,0 s, jingeln) och sedan
# scenen (scener/badet, hela sången). Introt slutar helt täckt av det turkosa kritsvepet och tonar över till badrummet på XF s.
# Avsnittstid = sångtid + (introts längd − XF) = sångtid + 8,6. Sången (sang.m4a) är oklippt.
# Mixen som 023, men scenens effekter +3 dB i stället för +6 (Sanna 2026-11-11: "lower sound effects a bit"); introts effekter +6 dB, mastrat till −14 LUFS / −1,5 dBTP (loudnorm i två pass).
# Kör efter: node scener/render.mjs intro   och   node scener/render.mjs scener/badet [--snabb]
set -e
cd "$(dirname "$0")/.."
UT=${1:-film/avsnitt-033-grovklipp.mp4}   # slutfilmen: film/satt-ihop.sh film/avsnitt-033.mp4
XF=0.4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; rm -rf $T; mkdir -p $T
IN=$(langd intro/intro.mp4); S0=$(awk "BEGIN{print $IN-$XF}"); MS=$(awk "BEGIN{printf \"%d\", $S0*1000}")
ffmpeg -loglevel error -y -i intro/intro.mp4 -i scener/badet/badet.mp4 -filter_complex \
  "[0:v]fps=30,scale=1920:1080,format=yuv420p,settb=AVTB[a];[1:v]fps=30,scale=1920:1080,format=yuv420p,settb=AVTB[b];[a][b]xfade=transition=fade:duration=$XF:offset=$S0[v]" \
  -map "[v]" -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p $T/bild.mp4
TOT=$(langd $T/bild.mp4)
ST="aformat=sample_rates=48000:channel_layouts=stereo"
ffmpeg -loglevel error -y -i intro/jingel.m4a -i intro/intro-effekter.wav -i sang.m4a -i scener/badet/badet-effekter.wav -filter_complex \
  "[0:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4,apad[j];[1:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4,volume=6dB[ie];[2:a]$ST,adelay=$MS|$MS[s];[3:a]$ST,volume=3dB,adelay=$MS|$MS[e];[j][ie][s][e]amix=inputs=4:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
