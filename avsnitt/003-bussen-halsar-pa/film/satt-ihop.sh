#!/bin/bash
# Sätter ihop hela avsnitt 003 av de renderade scenerna, med jingeln, sången och ljudeffekterna.
# Introt är intro/intro-med-jingel.mp4 (med jingeln), annars intro/intro.mp4 (tyst).
# Sången läggs en gång under hela avsnittet, så att den inte hackar vid klippen.
# Effekterna tas från <scen>-effekter.wav där render.mjs har skrivit en, annars tystnad.
# Kör efter `node scener/render.mjs <scen>` för varje scen.
# Engelska versionen: `film/satt-ihop.sh en` efter `node scener/render.mjs <scen> --en` (kritan-ritar, intro och alla scener)
# → film/avsnitt-003-en.mp4, med en/sang.m4a, -en-filerna och det engelska introt. Tiderna (kritan-ritars utfyllnad,
# refrängklippen, sångens start) går genom samma karta som scenerna, en/rader.txt. Utan en är allt som förut.
set -e
cd "$(dirname "$0")/.."
X=; SANG=sang.m4a; [ "$1" = en ] && X=-en && SANG=en/sang.m4a
UT=film/avsnitt-003$X.mp4
T=film/.tmp$X; rm -rf $T; mkdir -p $T
# svensk sångtid → engelsk sångtid (styckvis linjärt mellan paren "M:SS.s … [sv M:SS.s]" i en/rader.txt, som kit.js); svenska: samma tid
sv2en() { [ -z "$X" ] && { echo $1; return; }
  awk -v s=$1 'function tid(x, a) { split(x, a, ":"); return a[1] * 60 + a[2] }
    /^[0-9]+:[0-9.]+.*\[sv [0-9]+:[0-9.]+\][ \t]*$/ { e = $1; sub(/≈/, "", e); match($0, /\[sv [0-9:.]+\]/); n++; S[n] = tid(substr($0, RSTART + 4, RLENGTH - 5)); E[n] = tid(e) }
    END { if (s < S[1]) r = s - S[1] + E[1]; else if (s >= S[n]) r = s - S[n] + E[n]
          else for (i = 2; i <= n; i++) if (S[i] > s) { r = E[i-1] + (s - S[i-1]) * (E[i] - E[i-1]) / (S[i] - S[i-1]); break }
          print r }' en/rader.txt; }
O=$(awk "BEGIN{print -($(sv2en 0))}")   # engelska: sången börjar 2,4 s in i kritan-ritar (svensk 0 = engelsk −2,4)

# Engelska introt (tiny crayon tv): intro/intro-en.mp4 (`node scener/render.mjs intro --en`) med den engelska jingeln
# ../../format/jingel-en.m4a (de första 9,9 s, som den svenska jingel.m4a) → intro/intro-med-jingel-en.mp4.
# Finns ingen engelsk jingel än ligger lågt fågelkvitter i jingelns plats (platshållare, som 005 och 007).
if [ -n "$X" ]; then
  J=../../format/jingel-en.m4a; F=aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9.9
  if [ -f $J ]; then JF="[1:a]$F,afade=t=out:st=9.5:d=0.4,apad[a]"
  else J=../../assets/ljud/effekter/fagelkvitter/fagelkvitter-3.m4a; JF="[1:a]$F,afade=t=in:d=0.4,afade=t=out:st=9.3:d=0.6,volume=0.35,apad[a]"; fi
  ffmpeg -loglevel error -y -i intro/intro-en.mp4 -i $J -filter_complex "$JF" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel-en.mp4
fi
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
A="-ar 48000 -ac 2 -c:a pcm_s16le"
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

INTRO=intro/intro-med-jingel$X.mp4; [ -f $INTRO ] || INTRO=intro/intro.mp4
ffmpeg -loglevel error -y -i $INTRO $V $T/00.mp4
# kritan ritar fyller ut till scen A:s start i sången (A:s sångbit börjar där ritar slutar)
RITAR=kritan-ritar/kritan-ritar$X.mp4
ffmpeg -loglevel error -y -i $RITAR -vf "tpad=stop_mode=clone:stop_duration=$(awk "BEGIN{print $(sv2en 18) - $(sv2en 17)}")" $V $T/01.mp4
i=2
for s in a-busshallplatsen korscen-1 b-bondgarden korscen-2 c-glasskiosken; do
  ffmpeg -loglevel error -y -i scener/$s/$s$X.mp4 $V $T/0$i.mp4; i=$((i+1))
done

# Effekter: en wav per del, lika lång som delens bild
n=0
for f in $T/0*.mp4; do
  L=$(langd $f); b=$(basename $f .mp4)
  case $b in 00)   # introt: fladder när Fia gör sig redo att lyfta (9,5 s) och svisch när kortet växer (10,4 s), annars är det tyst efter jingeln
    ffmpeg -loglevel error -y -f lavfi -t $L -i anullsrc=r=48000:cl=stereo \
      -i ../../assets/ljud/effekter/fladder/fladder-1.m4a -i ../../assets/ljud/effekter/swoosh/swoosh-1.m4a -filter_complex \
      "[1:a]aformat=sample_rates=48000:channel_layouts=stereo,silenceremove=start_periods=1:start_threshold=-50dB,atrim=0:1.4,afade=t=out:st=1:d=0.4,volume=1.5,adelay=9500|9500[f];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=0.4,adelay=10400|10400[s];[0:a][f][s]amix=inputs=3:normalize=0:duration=first" $A $T/$b.wav
    n=$((n+1)); continue;; 01) e=kritan-ritar/kritan-ritar$X-effekter.wav;; *)
    s=$(sed -n "$((10#$b - 1))p" <<< $'a-busshallplatsen\nkorscen-1\nb-bondgarden\nkorscen-2\nc-glasskiosken'); e=scener/$s/$s$X-effekter.wav;; esac
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

# Refrängklippen läggs över bilden på sin plats i sången, om de är renderade.
# Under klippet tystas scenens effekter och klippets egna läggs in.
I=$(langd $T/00.mp4)
# sångtiden där klippet börjar (SANG[0] i index.html) och ev. där det slutar; korscen-0 slutar efter närbilden på hjulet,
# så att bussen hinner rulla tillbaka in till hållplatsen i scen A före "Ett, två, tre"
for k in "korscen-0 43.46 53.564" "korscen-3 147.27"; do
  set -- $k; f=scener/$1/$1$X.mp4; [ -f $f ] || continue
  a=$(sv2en $2); L=$(langd $f); [ -n "$3" ] && L=$(awk "BEGIN{print $(sv2en $3)-$a}")
  t=$(awk "BEGIN{print $I+$O+$a}"); slut=$(awk "BEGIN{print $t+$L}"); ms=$(awk "BEGIN{printf \"%d\", $t*1000}")
  ffmpeg -loglevel error -y -i $T/bild.mp4 -i $f -filter_complex \
    "[1:v]setpts=PTS-STARTPTS+$t/TB[k];[0:v][k]overlay=enable='between(t,$t,$slut)':eof_action=pass" $V $T/bild2.mp4
  mv $T/bild2.mp4 $T/bild.mp4
  e=scener/$1/$1$X-effekter.wav; tyst="[0:a]volume=0:enable='between(t,$t,$slut)'"
  if [ -f $e ]; then
    ffmpeg -loglevel error -y -i $T/effekter.wav -i $e -filter_complex \
      "$tyst[b];[1:a]atrim=0:$L,afade=t=out:st=$(awk "BEGIN{print $L-0.15}"):d=0.15,adelay=$ms|$ms[c];[b][c]amix=inputs=2:duration=first:normalize=0" $A $T/eff2.wav
  else
    ffmpeg -loglevel error -y -i $T/effekter.wav -af "volume=0:enable='between(t,$t,$slut)'" $A $T/eff2.wav
  fi
  mv $T/eff2.wav $T/effekter.wav; echo "$1 inlagt vid $t s"
done

# Sången börjar när introt är slut; jingeln (introts eget ljud) ligger före
MS=$(langd $T/00.mp4 | awk "{printf \"%d\", (\$1+$O)*1000}")
if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 $INTRO | grep -q .; then
  J="[1:a]apad[j];"; IN="[j][s][e]"; K=3
else
  J=""; IN="[s][e]"; K=2
fi
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $INTRO -i $SANG -i $T/effekter.wav -filter_complex \
  "${J}[2:a]adelay=$MS|$MS[s];[3:a]anull[e];${IN}amix=inputs=$K:duration=longest:normalize=0[m];[m]atrim=0:$(langd $T/bild.mp4)[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
echo "effekter från $n delar"; langd $UT
