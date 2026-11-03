#!/bin/bash
# Sätter ihop hela avsnitt 003 av de renderade scenerna, med jingeln, sången och ljudeffekterna.
# Introt är intro/intro-med-jingel.mp4 (med jingeln), annars intro/intro.mp4 (tyst).
# Sången läggs en gång under hela avsnittet, så att den inte hackar vid klippen.
# Effekterna tas från <scen>-effekter.wav där render.mjs har skrivit en, annars tystnad.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-003.mp4
T=film/.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

INTRO=intro/intro-med-jingel.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO $V $T/00.mp4
# kritan ritar fyller ut till scen A:s start i sången (A:s sångbit börjar där ritar slutar)
RITAR=kritan-ritar/kritan-ritar.mp4
ffmpeg -loglevel error -y -i $RITAR -vf "tpad=stop_mode=clone:stop_duration=1" $V $T/01.mp4
i=2
for s in a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken; do
  ffmpeg -loglevel error -y -i scener/$s/$s.mp4 $V $T/0$i.mp4; i=$((i+1))
done

# Effekter: en wav per del, lika lång som delens bild
n=0
for f in $T/0*.mp4; do
  L=$(langd $f); b=$(basename $f .mp4)
  case $b in 00) e="";; 01) e=kritan-ritar/kritan-ritar-effekter.wav;; *)
    s=$(sed -n "$((10#$b - 1))p" <<< $'a-busshallplatsen\nkorscen-1\nb-bondgarden\nkorscen-2\nc-glasskiosken'); e=scener/$s/$s-effekter.wav;; esac
  if [ -n "$e" ] && [ -f "$e" ]; then
    ffmpeg -loglevel error -y -i "$e" -af "apad,atrim=0:$L" $A $T/$b.wav; n=$((n+1))
  else
    ffmpeg -loglevel error -y -f lavfi -i anullsrc=r=48000:cl=stereo -t $L $A $T/$b.wav
  fi
done
ls $T/0*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $T/bild.txt
ls $T/0*.wav | sed "s#.*/#file '#; s#\$#'#" > $T/ljud.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/ljud.txt -c copy $T/effekter.wav

# Sången börjar när introt är slut; jingeln (introts eget ljud) ligger före
MS=$(langd $T/00.mp4 | awk '{printf "%d", $1*1000}')
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 $INTRO | grep -q .; then
  J="[1:a]apad[j];"; IN="[j][s][e]"; K=3
else
  J=""; IN="[s][e]"; K=2
fi
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $INTRO -i sang.m4a -i $T/effekter.wav -filter_complex \
  "${J}[2:a]adelay=$MS|$MS[s];[3:a]anull[e];${IN}amix=inputs=$K:duration=longest:normalize=0[m];[m]atrim=0:$(langd $T/bild.mp4)[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
echo "effekter från $n delar"; langd $UT
