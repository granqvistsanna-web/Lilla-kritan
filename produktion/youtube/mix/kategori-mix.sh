#!/bin/bash
# Motorn för kategorimixarna (Tittut-mixen, Vardagsberättelser …), byggd 2026-11-22 ur mix-5/satt-ihop.sh.
# Sanna 2026-11-22: "remove all intro and outro, only keep first and final, polish transitions":
# ingen egen mixintro – första delen behåller sitt intro (hopp 0), sista delen behåller sitt outro (kapa 0),
# alla andra hoppar sitt intro och kapas före sitt outro. Skarvarna är mixens kritsvep (mix-1/kritsvep) med skrrrrt-ljudet.
# Används så här (i mixens egen satt-ihop.sh):  UT=namn.mp4; DELAR=("typ|fil|färg|hopp|egen|kapa" …); source ../kategori-mix.sh
#   typ   tittut (nivå -15,5 LUFS) eller bok (bilderbok, ljudet orört)
#   färg  kritsvepets färg in i delen (tom på första delen)
#   hopp  sekunder som hoppas över i början (delens intro)
#   egen  delen börjar täckt av sitt eget kritsvep (020): mixens svep täcker bara slutet av delen före
#   kapa  sekunder som tas bort i slutet (outrot); ljudet tonas ut de sista 0,5 s
set -e
cd "$(dirname "$0")"
R=../../../..; E=$R/assets/ljud/effekter
T=.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -an"
AU="-ar 48000 -ac 2 -c:a pcm_s16le -vn"
niva() { local I=$(ffmpeg -nostats -ss $2 ${4:+-t $4} -i "$1" -vn -af ebur128 -f null - 2>&1 | grep -E "^ +I:" | tail -1 | awk '{print $2}')
  echo "volume=$(awk "BEGIN{print $3-($I)}")dB,alimiter=limit=0.89:level=false"; }
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

for d in "${DELAR[@]}"; do IFS='|' read -r _ fil _ <<< "$d"; [ -f "$fil" ] || { echo "saknas: $fil" >&2; exit 1; }; done
SV=../mix-1/kritsvep/bilder; FARG=(); for d in "${DELAR[@]}"; do IFS='|' read -r _ _ f _ <<< "$d"; FARG+=("$f"); done
P=${P:-4}
i=0; for d in "${DELAR[@]}"; do
  [ $i -gt 0 ] && [ $((i % P)) -eq 0 ] && wait
  (
  IFS='|' read -r typ fil farg hopp egen kapa <<< "$d"; n=$(printf %02d $i); nasta=${FARG[$((i+1))]:-}
  hopp=${hopp:-0}; kapa=${kapa:-0}
  L0=$(awk "BEGIN{print $(langd $fil)-$hopp-$kapa}")
  UTT=$(awk "BEGIN{print $L0-0.5}")
  if [ $typ = tittut ]; then LJ="$(niva $fil $hopp -15.5 $L0),"; else LJ=""; fi
  # -ss som indataflagga (afade räknas då från delens början), -t som utdataflagga (QA 2026-11-13)
  ffmpeg -loglevel error -y -ss $hopp -i $fil -t $L0 -af "${LJ}afade=t=out:st=$UTT:d=0.5" $AU $T/$n.wav
  ex=(); fk="[0:v]scale=1920:1080,fps=30[b0]"; sist=b0; k=1
  if [ -n "$farg" ] && [ -z "$egen" ]; then   # svepet smular bort i början av delen
    ex+=(-framerate 30 -start_number 27 -i $SV/$farg/%04d.png); fk="$fk;[$sist][$k:v]overlay=eof_action=pass[b$k]"; sist=b$k; k=$((k+1))
  fi
  if [ -n "$nasta" ]; then  # nästa dels svep täcker slutet av den här
    ex+=(-itsoffset $(awk "BEGIN{print $L0-0.9}") -framerate 30 -i $SV/$nasta/%04d.png)
    fk="$fk;[$k:v]trim=end_frame=27[t$k];[$sist][t$k]overlay=eof_action=pass[b$k]"; sist=b$k
  fi
  ffmpeg -loglevel error -y -ss $hopp -i $fil "${ex[@]}" -filter_complex "$fk" -map "[$sist]" $V -t $L0 $T/$n.mp4
  L=$(langd $T/$n.mp4)
  ffmpeg -loglevel error -y -i $T/$n.wav -af "apad,atrim=0:$L" $AU $T/$n-l.wav && mv $T/$n-l.wav $T/$n.wav
  echo "$typ|$fil|$farg|$L" > $T/$n.txt
  ) &
  i=$((i+1))
done
wait
[ $(ls $T/[0-9][0-9].txt | wc -l) -eq ${#DELAR[@]} ] || { echo "någon del misslyckades" >&2; exit 1; }
cat $T/[0-9][0-9].txt > $T/delar.txt
ls $T/[0-9]*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $T/bild.txt
ls $T/[0-9][0-9].wav | sed "s#.*/#file '#; s#\$#'#" > $T/ljud.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/hel.mp4
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/ljud.txt -c copy $T/hel.wav

# kritsvepets ljud (som mix-5)
ffmpeg -loglevel error -y -i $E/skrrrrt-kort/skrrrrt-kort-1.m4a -i $E/skrrrrt-kort/skrrrrt-kort-2.m4a -i $E/skrrrrt-kort/skrrrrt-kort-3.m4a \
  -i $E/skrrrrt-kort/skrrrrt-kort-4.m4a -i $E/swoosh/swoosh-1.m4a -filter_complex \
  "[0]adelay=0:all=1[a];[1]adelay=117:all=1[b];[2]adelay=234:all=1[c];[3]adelay=351:all=1[d];[0]adelay=450:all=1[e];[1]adelay=576:all=1[f];[2]adelay=702:all=1[g];[4]adelay=900:all=1,volume=0.6[h];[a][b][c][d][e][f][g][h]amix=inputs=8:normalize=0,volume=-10dB,aformat=sample_rates=48000:channel_layouts=stereo" \
  $AU $T/svep.wav

afk=""; m=0; j=0; : > $T/skarvar.txt
while IFS='|' read -r typ fil farg L; do
  echo "$j|$fil" >> $T/skarvar.txt
  if [ -n "$farg" ]; then
    m=$((m+1)); ms=$(awk "BEGIN{printf \"%d\", ($j-0.9)*1000}"); afk="$afk[x$m]adelay=$ms:all=1[s$m];"
  fi
  j=$(awk "BEGIN{print $j+$L}")
done < $T/delar.txt
cp $T/skarvar.txt skarvar.txt
x=""; s=""; for k in $(seq 1 $m); do x="$x[x$k]"; s="$s[s$k]"; done
ffmpeg -loglevel error -y -i $T/hel.wav -i $T/svep.wav -filter_complex \
  "[1]asplit=$m$x;$afk[0]${s}amix=inputs=$((m+1)):duration=first:normalize=0,alimiter=limit=0.84:level=false[a]" \
  -map "[a]" $AU $T/ljud.wav
ffmpeg -loglevel error -y -i $T/hel.mp4 -i $T/ljud.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart $UT
rm -rf $T
langd $UT; cat skarvar.txt
