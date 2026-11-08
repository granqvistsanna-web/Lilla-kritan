#!/bin/bash
# Mix 1 "Sjung och gissa" (16:9): ett intro, fyra sånger med Gissa teckningen-Shorts emellan, och 003:s slut som outro.
# Ordning: intro → 004 → 3 Shorts → 005 → 3 Shorts → 006 → 2 Shorts → 003 (slutar med logotypen och figurerna som vinkar).
# Avsnitten tas från introts slut (11,3 s) och spelas sedan oförändrade till slutet: sångerna kortas aldrig.
# Introt → 004 är samma skarv som i avsnitten (introt växer till kritan-ritars papper). Övriga skarvar får 003:s kritsvep
# (kritsvep/, 1,8 s, täcker bilden vid 0,9 s), lagt ovanpå så att inget klipps bort. Shorts mot Shorts: båda slutar och
# börjar på tomt papper, så den skarven syns inte. Shortsen är de liggande 16:9-versionerna (<ord>-liggande.mp4, render.mjs --liggande), så att inget klipps när saken går ut ur bild; ljudet lyfts till −14 LUFS.
# Kör: produktion/youtube/mix/mix-1/satt-ihop.sh   (efter `node kritsvep/render.mjs <färger>` och introts rendering)
set -e
cd "$(dirname "$0")"
R=../../../..; A=$R/avsnitt; G=$R/produktion/youtube/shorts/gissa; E=$R/assets/ljud/effekter
UT=mix-1.mp4; T=.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -an"
AU="-ar 48000 -ac 2 -c:a pcm_s16le -vn"
INTRO=11.3
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

# delar: typ|fil|kritsvepets färg in i delen (tom = ingen svep)
DELAR=(
  "intro|intro/intro.mp4|"
  "avsnitt|$A/004-bussen-badar/film/avsnitt-004.mp4|"
  "short|$G/bondgarden/gris/gris-liggande.mp4|f2c230"
  "short|$G/fordon/bil/bil-liggande.mp4|"
  "short|$G/bondgarden/hast/hast-liggande.mp4|"
  "avsnitt|$A/005-rosa-bilen/film/avsnitt-005.mp4|e93c8f"
  "short|$G/lekplatsen/boll/boll-liggande.mp4|4fae4a"
  "short|$G/bondgarden/hona/hona-liggande.mp4|"
  "short|$G/bondgarden/hund/hund-liggande.mp4|"
  "avsnitt|$A/006-orange-baten/film/avsnitt-006.mp4|f28d3c"
  "short|$G/lekplatsen/hink/hink-liggande.mp4|8e44c9"
  "short|$G/bondgarden/katt/katt-liggande.mp4|"
  "avsnitt|$A/003-bussen-halsar-pa/film/avsnitt-003-youtube.mp4|2fb3b5"
)

i=0; for d in "${DELAR[@]}"; do
  IFS='|' read -r typ fil farg <<< "$d"; n=$(printf %02d $i)
  case $typ in
    intro)   # bilden ur mixens intro, ljudet (jingel, pling, fågelkvitter) ur 004:s första 11,3 s
      ffmpeg -loglevel error -y -i $fil -t $INTRO -vf scale=1920:1080 $V $T/$n.mp4
      ffmpeg -loglevel error -y -i $A/004-bussen-badar/film/avsnitt-004.mp4 -t $INTRO $AU $T/$n.wav ;;
    avsnitt)
      ffmpeg -loglevel error -y -i $fil -ss $INTRO -vf scale=1920:1080 $V $T/$n.mp4
      ffmpeg -loglevel error -y -i $fil -ss $INTRO $AU $T/$n.wav ;;
    short)
      ffmpeg -loglevel error -y -i $fil -vf "scale=-2:1080,pad=1920:1080:(ow-iw)/2:0:color=0xf5f0e6" $V $T/$n.mp4
      ffmpeg -loglevel error -y -i $fil -af "loudnorm=I=-14:TP=-1.5:LRA=11" $AU $T/$n.wav ;;
  esac
  # ljudet exakt lika långt som bilden, så att inget glider isär över 16 minuter
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

# skarvarna: kritsvepet över bilden (bild 27 = täckt, på skarven) och dess ljud; kapitlen skrivs samtidigt
in=(); fk=""; prev="[0:v]"; ain=(); afk=""; n=0; m=0; j=0; : > kapitel.txt
while IFS='|' read -r typ namn farg L; do
  s=$(awk "BEGIN{printf \"%d\", $j+0.5}"); printf "%d:%02d %s %s\n" $((s/60)) $((s%60)) $typ $namn >> kapitel.txt
  if [ -n "$farg" ]; then
    n=$((n+1)); in+=(-itsoffset $(awk "BEGIN{print $j-0.9}") -framerate 30 -i kritsvep/bilder/$farg/%04d.png)
    fk="$fk${prev}[$n:v]overlay=eof_action=pass[m$n];"; prev="[m$n]"
    m=$((m+1)); ms=$(awk "BEGIN{printf \"%d\", ($j-0.9)*1000}"); afk="$afk[x$m]adelay=$ms:all=1[s$m];"
  fi
  j=$(awk "BEGIN{print $j+$L}")
done < $T/delar.txt
ffmpeg -loglevel error -y -i $T/hel.mp4 "${in[@]}" -filter_complex "${fk%;}" -map "$prev" $V $T/bild.mp4
x=""; s=""; for k in $(seq 1 $m); do x="$x[x$k]"; s="$s[s$k]"; done
ffmpeg -loglevel error -y -i $T/hel.wav -i $T/svep.wav -filter_complex \
  "[1]asplit=$m$x;$afk[0]${s}amix=inputs=$((m+1)):duration=first:normalize=0,alimiter=limit=0.95[a]" \
  -map "[a]" $AU $T/ljud.wav
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/ljud.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart $UT
rm -rf $T
langd $UT; cat kapitel.txt
