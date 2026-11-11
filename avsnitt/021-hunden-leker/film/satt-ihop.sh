#!/bin/bash
# Sätter ihop avsnitt 021 (efter film/rendera.sh): det gemensamma bilderboksintrot (produktion/youtube/bilderbok-intro,
# längden läses ur filen och scenens ljud fördröjs lika mycket)
# och scenen med dess effekter (Malins repliker, hundens ljud, skogs- och lekplatsljudet i scener/lekplatsen/lekplatsen-effekter.wav).
# Ingen sång. Mixen som 020: effekter +6 dB; mastras i två pass till −14 LUFS / −1,5 dBTP, AAC 192k → film/avsnitt-021.mp4.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-021.mp4
I=../../produktion/youtube/bilderbok-intro
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
test -f $I/intro.mp4 && test -f $I/intro-effekter.wav || { echo "bilderboksintrot saknas i $I" >&2; exit 1; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i $I/intro.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i scener/lekplatsen/lekplatsen.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
ffmpeg -loglevel error -y -i $I/intro-effekter.wav -i scener/lekplatsen/lekplatsen-effekter.wav -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS[e];[i][e]amix=inputs=2:duration=longest:normalize=0,apad[m];[m]atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
# Mastring: −14 LUFS, true peak ≤ −1,5 dBTP. Loudnorm i två pass: mät först, sedan linjär normalisering med de mätta värdena.
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
