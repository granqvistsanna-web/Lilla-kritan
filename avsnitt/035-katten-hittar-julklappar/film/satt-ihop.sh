#!/bin/bash
# Sätter ihop avsnitt 035 (efter node verktyg/render-delat.mjs avsnitt/035-katten-hittar-julklappar/scener/snogarden): det gemensamma bilderboksintrot (produktion/youtube/bilderbok-intro,
# längden läses ur filen och scenens ljud fördröjs lika mycket) och scenen, som börjar på tomt papper, med dess effekter
# (Malins repliker, kattens mjau-gullig, tassar, puff, plingar och vinterljudet i scener/snogarden/snogarden-effekter.wav).
# Ingen sång. Julkaroler som lugn bädd (assets/ljud/musik/jul/karol-*), Joy to the World först (Sanna 2026-11-14), börjar redan i introt, ca −30 LUFS och sänks under rösten. Mixen som 020/021: effekter +6 dB; mastras i två pass till −14 LUFS / −1,5 dBTP, AAC 192k → film/avsnitt-035.mp4.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-035.mp4
I=../../produktion/youtube/bilderbok-intro-jul   # julvariant av introt (Sanna 2026-11-14: "xmas flair")
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
test -f $I/intro.mp4 && test -f $I/intro-effekter.wav || { echo "bilderboksintrot saknas i $I" >&2; exit 1; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i $I/intro.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i scener/snogarden/snogarden.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
MU=../../assets/ljud/musik/jul
# bygg <effekter.wav> <ut.mp4>: mixen och mastringen. Körs två gånger: avsnittet och julkalenderns lucka 6 (J06 QA 26/11:
# avsnitt-035-lucka.mp4, samma bild men utan Malins "Hej då! Vi ses snart!", ur snogarden-lucka-effekter.wav = render.mjs --bara-ljud --lucka)
bygg() { EFF=$1; UT=$2
ffmpeg -loglevel error -y -i $I/intro-effekter.wav -i $EFF -i $MU/karol-joy-to-the-world.mp3 -i $MU/karol-forsta-jul.mp3 -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS[e];[i][e]amix=inputs=2:duration=longest:normalize=0,apad,atrim=0:$TOT,asplit[v1][v2];\
[2:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-30:TP=-8[m1];[3:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-30:TP=-8[m2];[m1][m2]acrossfade=d=3,atrim=0:$TOT,afade=t=in:d=1.5,afade=t=out:st=$(awk "BEGIN{print $TOT-4}"):d=4,apad,atrim=0:$TOT[mu];\
[mu][v1]sidechaincompress=threshold=0.015:ratio=4:attack=60:release=700[du];[du][v2]amix=inputs=2:duration=longest:normalize=0,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
# Mastring: −14 LUFS, true peak ≤ −1,5 dBTP. Loudnorm i två pass: mät först, sedan linjär normalisering med de mätta värdena.
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.8:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
}
bygg scener/snogarden/snogarden-effekter.wav $UT
(cd scener && node render.mjs snogarden --bara-ljud --lucka > /dev/null)
bygg scener/snogarden/snogarden-lucka-effekter.wav film/avsnitt-035-lucka.mp4
rm -rf $T
langd $UT
