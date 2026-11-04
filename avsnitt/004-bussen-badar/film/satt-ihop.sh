#!/bin/bash
# Sätter ihop hela avsnitt 004 av de renderade scenerna, med jingeln, sången och ljudeffekterna (efter 003:s satt-ihop.sh).
# Ordning: intro (med jingel) → kritan ritar → körscen 1–3 (hela sången) → badplatsen (egen bädd i effekterna, ingen sång). Inget outro: avsnittet slutar på papperet i scen B.
# Sången läggs en gång under kritan ritar och körscenerna, så att den inte hackar vid klippen, och tonas ut när badplatsen börjar.
# Effekterna tas från <scen>-effekter.wav där render.mjs har skrivit en, annars tystnad.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-004.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
DELAR=(kritan-ritar/kritan-ritar scener/korscen-1/korscen-1 scener/korscen-2/korscen-2 scener/korscen-3/korscen-3 scener/b-badplatsen/b-badplatsen)

INTRO=intro/intro-med-jingel.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO $V $T/00.mp4
i=1
for d in "${DELAR[@]}"; do ffmpeg -loglevel error -y -i $d.mp4 $V $T/0$i.mp4; i=$((i+1)); done

# Effekter: en wav per del, lika lång som delens bild
for f in $T/0*.mp4; do
  L=$(langd $f); b=$(basename $f .mp4)
  if [ $b = 00 ]; then   # introt (samma som 003): fladder när Fia gör sig redo att lyfta (9,5 s) och svisch när kortet växer (10,4 s);
    # mjukt fågelkvitter 8,2–11,5 s fyller tystnaden efter jingeln (granskningen)
    ffmpeg -loglevel error -y -f lavfi -t $L -i anullsrc=r=48000:cl=stereo \
      -i ../../assets/ljud/effekter/fladder/fladder-1.m4a -i ../../assets/ljud/effekter/swoosh/swoosh-1.m4a -i ../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a -filter_complex \
      "[1:a]aformat=sample_rates=48000:channel_layouts=stereo,silenceremove=start_periods=1:start_threshold=-50dB,atrim=0:1.4,afade=t=out:st=1:d=0.4,volume=3,adelay=9500|9500[f];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.8,adelay=10400|10400[s];[3:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=17.5:20.8,asetpts=PTS-STARTPTS,afade=t=in:d=0.6,afade=t=out:st=2.6:d=0.7,volume=20dB,adelay=8200|8200[k];[0:a][f][s][k]amix=inputs=4:normalize=0:duration=first" $A $T/$b.wav
    continue
  fi
  d=${DELAR[$((10#$b - 1))]}
  e=$d-effekter.wav
  # badplatsen har ingen sång och låg ca 9 dB under sångdelen: +9,5 dB (granskningen), med en mjuk limiter mot topparna
  [ $b = 05 ] && G=",volume=9.5dB,alimiter=limit=0.7:level=false" || G=""
  if [ -f "$e" ]; then ffmpeg -loglevel error -y -i "$e" -af "apad,atrim=0:$L$G" $A $T/$b.wav
  else ffmpeg -loglevel error -y -f lavfi -i anullsrc=r=48000:cl=stereo -t $L $A $T/$b.wav; fi
done
ls $T/0*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $T/bild.txt
ls $T/0*.wav | sed "s#.*/#file '#; s#\$#'#" > $T/ljud.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/ljud.txt -c copy $T/effekter.wav

# Sången börjar när introt är slut och tonas ut på 0,4 s där badplatsen börjar (rakt klipp efter "stopp")
MS=$(langd $T/00.mp4 | awk '{printf "%d", $1*1000}')
SLUT=$(awk "BEGIN{print $(langd $T/01.mp4)+$(langd $T/02.mp4)+$(langd $T/03.mp4)+$(langd $T/04.mp4)}")
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $INTRO -i sang.m4a -i $T/effekter.wav -filter_complex \
  "[1:a]apad[j];[2:a]atrim=0:$SLUT,afade=t=out:st=$(awk "BEGIN{print $SLUT-0.4}"):d=0.4,adelay=$MS|$MS[s];[3:a]anull[e];[j][s][e]amix=inputs=3:duration=longest:normalize=0[m];[m]atrim=0:$(langd $T/bild.mp4)[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
