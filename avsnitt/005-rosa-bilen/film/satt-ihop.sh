#!/bin/bash
# Sätter ihop hela avsnitt 005 av de renderade scenerna, med jingeln, sången och ljudeffekterna (efter 004:s satt-ihop.sh).
# Ordning: intro (med jingel) → kritan ritar → vägen 1 → vägen 2 → kiosken → discot och slutet.
# Hela avsnittet är en sång ("Rosa sången"). Den läggs en gång under alla scener, så att den inte hackar vid klippen,
# börjar där introt slutar (scenerna är tajmade i sångtid) och tonas ut på 2 s i slutet (bilden tonas ut i discots sista bild).
# Effekterna tas från <scen>-effekter.wav där render.mjs har skrivit en, annars tystnad.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
# Engelska versionen: `film/satt-ihop.sh en` efter `node scener/render.mjs <scen> --en` → film/avsnitt-005-en.mp4,
# med en/sang.m4a, scenernas -en-filer och det engelska introt (intro/intro-med-jingel-en.mp4, se nedan).
set -e
cd "$(dirname "$0")/.."
X=; SANG=sang.m4a; [ "$1" = en ] && X=-en && SANG=en/sang.m4a
UT=film/avsnitt-005$X.mp4
T=film/.tmp$X; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
DELAR=(scener/kritan-ritar/kritan-ritar scener/vagen-1/vagen-1 scener/vagen-2/vagen-2 scener/kiosken/kiosken scener/discot/discot)

# Engelska introt (tiny crayon tv): intro/intro-en.mp4 (`node scener/render.mjs intro --en`) med den engelska jingeln
# ../../format/jingel-en.m4a (de första 9,9 s, som den svenska jingel.m4a) → intro/intro-med-jingel-en.mp4.
# Finns ingen engelsk jingel än ligger lågt fågelkvitter i jingelns plats (platshållare). Görs om vid varje `satt-ihop.sh en`.
if [ -n "$X" ]; then
  J=../../format/jingel-en.m4a; F=aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9.9
  if [ -f $J ]; then JF="[1:a]$F,afade=t=out:st=9.5:d=0.4,apad[a]"
  else J=../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a; JF="[1:a]$F,afade=t=in:d=0.4,afade=t=out:st=9.3:d=0.6,volume=0.35,apad[a]"; fi
  ffmpeg -loglevel error -y -i intro/intro-en.mp4 -i $J -filter_complex "$JF" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel-en.mp4
fi
INTRO=intro/intro-med-jingel$X.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO -vf scale=1920:1080 $V $T/00.mp4
i=1
for d in "${DELAR[@]}"; do ffmpeg -loglevel error -y -i $d$X.mp4 -vf scale=1920:1080 $V $T/0$i.mp4; i=$((i+1)); done

# Effekter: en wav per del, lika lång som delens bild (introts effekter ligger redan i intro-med-jingel)
for f in $T/0*.mp4; do
  L=$(langd $f); b=$(basename $f .mp4)
  [ $b = 00 ] && e=none || e=${DELAR[$((10#$b - 1))]}$X-effekter.wav
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
# FORSPEL: kritan ritar utan musik (skogsljud) i så här många sekunder innan sången börjar; samma värde som i scener/kritan-ritar
FORSPEL=8.6; [ -n "$X" ] && FORSPEL=0
TOT=$(langd $T/bild.mp4); SLUT=$(awk "BEGIN{print $TOT-$MS/1000-$FORSPEL}"); MSS=$(awk "BEGIN{printf \"%d\", $MS+$FORSPEL*1000}")
# Introts tystnad efter jingeln (ca 9 s → introts slut) fylls med lågt fågelkvitter som tonas in och ut, som i 004.
# Effekterna lyfts 6 dB (de låg ca 15 dB under sången); hela mixen 1,3 dB upp mot YouTubes −14 LUFS, en limiter tar topparna.
# Svenska: skogsljud från 0:09 genom kritans ritande (FORSPEL) och 1,2 s in i sången, tonas in på 1 s och ut på 1,6 s
# (Sanna 2026-11-08: "make the forest sound start around 0:09").
KV=$(awk "BEGIN{print $MS/1000-9}"); KF=fagelkvitter/fagelkvitter-3.m4a; KVOL=0.35
[ -z "$X" ] && KV=$(awk "BEGIN{print $MS/1000-9+$FORSPEL+1.2}") && KF=skogsljud/skogsljud-1.m4a && KVOL=0.9
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $INTRO -i $SANG -i $T/effekter.wav -i ../../assets/ljud/effekter/$KF -filter_complex \
  "[1:a]apad[j];[2:a]atrim=0:$SLUT,afade=t=out:st=$(awk "BEGIN{print $SLUT-2}"):d=2,adelay=$MSS|$MSS[s];[3:a]volume=6dB[e];[4:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:$KV,afade=t=in:d=1,afade=t=out:st=$(awk "BEGIN{print $KV-1.6}"):d=1.6,volume=$KVOL,adelay=9000|9000[k];[j][s][e][k]amix=inputs=4:duration=longest:normalize=0,volume=1.3dB,alimiter=limit=0.95[m];[m]atrim=0:$TOT[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
