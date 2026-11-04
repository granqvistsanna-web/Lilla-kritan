#!/bin/bash
# Sätter ihop hela avsnitt 005 av de renderade scenerna, med jingeln, sången och ljudeffekterna (efter 004:s satt-ihop.sh).
# Ordning: intro (med jingel) → kritan ritar → vägen 1 → vägen 2 → kiosken → discot och slutet.
# Hela avsnittet är en sång ("Rosa sången"). Den läggs en gång under alla scener, så att den inte hackar vid klippen,
# börjar där introt slutar (scenerna är tajmade i sångtid) och tonas ut på 2 s i slutet (bilden tonas ut i discots sista bild).
# Effekterna tas från <scen>-effekter.wav där render.mjs har skrivit en, annars tystnad.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-005.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
DELAR=(scener/kritan-ritar/kritan-ritar scener/vagen-1/vagen-1 scener/vagen-2/vagen-2 scener/kiosken/kiosken scener/discot/discot)

INTRO=intro/intro-med-jingel.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO -vf scale=1920:1080 $V $T/00.mp4
i=1
for d in "${DELAR[@]}"; do ffmpeg -loglevel error -y -i $d.mp4 -vf scale=1920:1080 $V $T/0$i.mp4; i=$((i+1)); done

# Effekter: en wav per del, lika lång som delens bild (introts effekter ligger redan i intro-med-jingel)
for f in $T/0*.mp4; do
  L=$(langd $f); b=$(basename $f .mp4)
  [ $b = 00 ] && e=none || e=${DELAR[$((10#$b - 1))]}-effekter.wav
  if [ -f "$e" ]; then ffmpeg -loglevel error -y -i "$e" -filter_complex "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,apad,atrim=0:$L" $A $T/$b.wav
  else ffmpeg -loglevel error -y -f lavfi -i anullsrc=r=48000:cl=stereo -t $L $A $T/$b.wav; fi
done
ls $T/0*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $T/bild.txt
ls $T/0*.wav | sed "s#.*/#file '#; s#\$#'#" > $T/ljud.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/hel.mp4

# Rosa moln över varje skarv mellan scenerna (inte efter introt, det är formatets fasta intro): molnen täcker bilden på
# skarven och glider undan i nästa scen. Bilderna görs av `node film/moln/render.mjs` (1,6 s, genomskinliga PNG).
[ -d film/moln/bilder ] || node film/moln/render.mjs 1.6
in=(); fk=""; prev="[0:v]"; j=0; n=0
for f in $T/0*.mp4; do   # j = där delen efter f börjar
  j=$(awk "BEGIN{print $j+$(langd $f)}")
  [ $f = $T/00.mp4 ] || [ $f = $(ls $T/0*.mp4 | tail -1) ] && continue
  n=$((n+1)); in+=(-itsoffset $(awk "BEGIN{print $j-0.8}") -framerate 30 -i film/moln/bilder/%04d.png)
  fk="$fk${prev}[$n:v]overlay=eof_action=pass[m$n];"; prev="[m$n]"
done
ffmpeg -loglevel error -y -i $T/hel.mp4 "${in[@]}" -filter_complex "${fk%;}" -map "$prev" $V $T/bild.mp4
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/ljud.txt -c copy $T/effekter.wav

MS=$(langd $T/00.mp4 | awk '{printf "%d", $1*1000}')
TOT=$(langd $T/bild.mp4); SLUT=$(awk "BEGIN{print $TOT-$MS/1000}")
# Introts tystnad efter jingeln (ca 9 s → introts slut) fylls med lågt fågelkvitter som tonas in och ut, som i 004.
# Effekterna lyfts 6 dB (de låg ca 15 dB under sången); en limiter tar topparna.
KV=$(awk "BEGIN{print $MS/1000-9}")
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $INTRO -i sang.m4a -i $T/effekter.wav -i ../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a -filter_complex \
  "[1:a]apad[j];[2:a]atrim=0:$SLUT,afade=t=out:st=$(awk "BEGIN{print $SLUT-2}"):d=2,adelay=$MS|$MS[s];[3:a]volume=6dB[e];[4:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:$KV,afade=t=in:d=0.4,afade=t=out:st=$(awk "BEGIN{print $KV-0.6}"):d=0.6,volume=0.35,adelay=9000|9000[k];[j][s][e][k]amix=inputs=4:duration=longest:normalize=0,alimiter=limit=0.95[m];[m]atrim=0:$TOT[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
