#!/bin/bash
# Mix 2 "Alla sångerna" (16:9): ett intro, alla sex sånger (004, 005, 006, 007, 014 och 003 sist som outro) och tolv
# Gissa teckningen-Shorts två och två emellan (de tolv som inte är med i Mix 1), plus de två Tittut-filmerna (kaninen efter 005,
# lammet efter 007), hela och ljudnormaliserade som Shortsen. Introt finns i intro/ (Mix 2, Alla sångerna); kritsvepen lånas från ../mix-1/.
# Avsnitten tas från introts slut (11,3 s) så att sångernas intro inte upprepas, och spelas sedan oförändrade: sångerna
# kortas aldrig. Varje skarv mot en ny del får 003:s kritsvep i delens färg; Short mot Short ligger på tomt papper.
# Kör: produktion/youtube/mix/mix-2/satt-ihop.sh   (färgerna: cd ../mix-1 && node kritsvep/render.mjs <färg> ...)
set -e
cd "$(dirname "$0")"
R=../../../..; A=$R/avsnitt; G=$R/produktion/youtube/shorts/gissa; TT=$R/produktion/youtube/tittut; E=$R/assets/ljud/effekter
UT=mix-2.mp4; T=.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -an"
AU="-ar 48000 -ac 2 -c:a pcm_s16le -vn"
INTRO=11.3
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

# delar: typ|fil|kritsvepets färg in i delen (tom = ingen svep)
# 014 är bara grovklippt än: slutklippet används när det finns, annars grovklippet
G14=$A/014-grona-traktorn/film/avsnitt-014.mp4; [ -f $G14 ] || G14=$A/014-grona-traktorn/film/avsnitt-014-grovklipp.mp4
DELAR=(
  "intro|intro/intro.mp4|"
  "short|$G/bondgarden/ko/ko-liggande.mp4|f2c230"
  "short|$G/bondgarden/far/far-liggande.mp4|"
  "avsnitt|$A/004-bussen-badar/film/avsnitt-004.mp4|3b8fe0"
  "short|$G/bondgarden/anka/anka-liggande.mp4|f2a33a"
  "short|$G/bondgarden/traktor/traktor-liggande.mp4|"
  "avsnitt|$A/005-rosa-bilen/film/avsnitt-005.mp4|e93c8f"
  "tittut|$TT/skogen/kaninen-kanel/kaninen-kanel.mp4|4fae4a"
  "short|$G/fordon/buss/buss-liggande.mp4|8e44c9"
  "short|$G/fordon/brandbil/brandbil-liggande.mp4|"
  "avsnitt|$A/006-orange-baten/film/avsnitt-006.mp4|f28d3c"
  "short|$G/fordon/tag/tag-liggande.mp4|f2a33a"
  "short|$G/fordon/bat/bat-liggande.mp4|"
  "avsnitt|$A/007-bruna-ladbilen/film/avsnitt-007.mp4|a8784e"
  "tittut|$TT/skogen-2/lammet-ludde/lammet-ludde.mp4|2fb3b5"
  "short|$G/fordon/flygplan/flygplan-liggande.mp4|3b8fe0"
  "short|$G/lekplatsen/gunga/gunga-liggande.mp4|"
  "avsnitt|$G14|4fae4a"
  "short|$G/lekplatsen/rutschkana/rutschkana-liggande.mp4|f2c230"
  "short|$G/fordon/cykel/cykel-liggande.mp4|"
  "avsnitt|$A/003-bussen-halsar-pa/film/avsnitt-003-youtube.mp4|2fb3b5"
)

# kritsvepet (bild 27 = täckt, på skarven) läggs på varje del innan delarna sätts ihop: andra halvan (bild 27–53) i början
# av delen med delens färg, första halvan (bild 0–26) i slutet av delen före. I ett enda pass över hela mixen tappade
# ffmpeg svepen efter ca 13 minuter, så korta förskjutningar per del i stället.
SV=../mix-1/kritsvep/bilder; FARG=(); for d in "${DELAR[@]}"; do IFS='|' read -r _ _ f <<< "$d"; FARG+=("$f"); done
i=0; for d in "${DELAR[@]}"; do
  IFS='|' read -r typ fil farg <<< "$d"; n=$(printf %02d $i); nasta=${FARG[$((i+1))]:-}
  case $typ in
    intro)   # bilden ur mixens intro, ljudet (jingel, pling, fågelkvitter) ur 004:s första 11,3 s
      kalla=(-t $INTRO -i $fil); VF="scale=1920:1080"; L0=$INTRO
      ffmpeg -loglevel error -y -i $A/004-bussen-badar/film/avsnitt-004.mp4 -t $INTRO $AU $T/$n.wav ;;
    avsnitt)
      kalla=(-ss $INTRO -i $fil); VF="scale=1920:1080"; L0=$(awk "BEGIN{print $(langd $fil)-$INTRO}")
      ffmpeg -loglevel error -y -i $fil -ss $INTRO $AU $T/$n.wav ;;
    short|tittut)   # Shorts (9:16) på papper; Tittut är 16:9 och spelas hel med sitt eget intro och slut
      if [ $typ = short ]; then VF="scale=-2:1080,pad=1920:1080:(ow-iw)/2:0:color=0xf5f0e6"; else VF="scale=1920:1080"; fi
      kalla=(-i $fil); L0=$(langd $fil)
      ffmpeg -loglevel error -y -i $fil -af "loudnorm=I=-14:TP=-1.5:LRA=11" $AU $T/$n.wav ;;
  esac
  ex=(); fk="[0:v]$VF[b0]"; sist=b0; k=1
  if [ -n "$farg" ]; then   # svepet smular bort i början av delen
    ex+=(-framerate 30 -start_number 27 -i $SV/$farg/%04d.png); fk="$fk;[$sist][$k:v]overlay=eof_action=pass[b$k]"; sist=b$k; k=$((k+1))
  fi
  if [ -n "$nasta" ]; then  # nästa dels svep täcker slutet av den här
    ex+=(-itsoffset $(awk "BEGIN{print $L0-0.9}") -framerate 30 -i $SV/$nasta/%04d.png)
    fk="$fk;[$k:v]trim=end_frame=27[t$k];[$sist][t$k]overlay=eof_action=pass[b$k]"; sist=b$k
  fi
  ffmpeg -loglevel error -y "${kalla[@]}" "${ex[@]}" -filter_complex "$fk" -map "[$sist]" $V $T/$n.mp4
  # ljudet exakt lika långt som bilden, så att inget glider isär över hela mixen
  L=$(langd $T/$n.mp4)
  ffmpeg -loglevel error -y -i $T/$n.wav -af "apad,atrim=0:$L" $AU $T/$n-l.wav && mv $T/$n-l.wav $T/$n.wav
  echo "$typ|$(basename $fil .mp4)|$farg|$L" >> $T/delar.txt
  i=$((i+1))
done

ls $T/[0-9]*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $T/bild.txt
ls $T/[0-9][0-9].wav | sed "s#.*/#file '#; s#\$#'#" > $T/ljud.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/hel.mp4
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/ljud.txt -c copy $T/hel.wav

# kritsvepets ljud (1,8 s): ett kort skrrrrt per kritdrag (k-värdena i 003:s kritsvep.LJUD × 1,8 s) och ett swoosh när det smular
ffmpeg -loglevel error -y -i $E/skrrrrt-kort/skrrrrt-kort-1.m4a -i $E/skrrrrt-kort/skrrrrt-kort-2.m4a -i $E/skrrrrt-kort/skrrrrt-kort-3.m4a \
  -i $E/skrrrrt-kort/skrrrrt-kort-4.m4a -i $E/swoosh/swoosh-1.m4a -filter_complex \
  "[0]adelay=0:all=1[a];[1]adelay=117:all=1[b];[2]adelay=234:all=1[c];[3]adelay=351:all=1[d];[0]adelay=450:all=1[e];[1]adelay=576:all=1[f];[2]adelay=702:all=1[g];[4]adelay=900:all=1,volume=0.6[h];[a][b][c][d][e][f][g][h]amix=inputs=8:normalize=0,volume=-10dB,aformat=sample_rates=48000:channel_layouts=stereo" \
  $AU $T/svep.wav

# skarvarna: kritsvepets ljud (bilden ligger redan i delarna); kapitlen skrivs samtidigt
afk=""; m=0; j=0; : > kapitel.txt
while IFS='|' read -r typ namn farg L; do
  s=$(awk "BEGIN{printf \"%d\", $j+0.5}"); printf "%d:%02d %s %s\n" $((s/60)) $((s%60)) $typ $namn >> kapitel.txt
  if [ -n "$farg" ]; then
    m=$((m+1)); ms=$(awk "BEGIN{printf \"%d\", ($j-0.9)*1000}"); afk="$afk[x$m]adelay=$ms:all=1[s$m];"
  fi
  j=$(awk "BEGIN{print $j+$L}")
done < $T/delar.txt
x=""; s=""; for k in $(seq 1 $m); do x="$x[x$k]"; s="$s[s$k]"; done
ffmpeg -loglevel error -y -i $T/hel.wav -i $T/svep.wav -filter_complex \
  "[1]asplit=$m$x;$afk[0]${s}amix=inputs=$((m+1)):duration=first:normalize=0,alimiter=limit=0.95[a]" \
  -map "[a]" $AU $T/ljud.wav
ffmpeg -loglevel error -y -i $T/hel.mp4 -i $T/ljud.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart $UT
rm -rf $T
langd $UT; cat kapitel.txt
