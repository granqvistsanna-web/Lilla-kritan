#!/bin/bash
# Gemensam byggdel för Gissa teckningen-mixarna: stående (gissa-bondgarden, gissa-fordon, gissa-lekplatsen) och
# liggande 16:9 (gissa-<tema>-liggande, LIGG=1, se nedan).
# Varje mapps satt-ihop.sh sätter NAMN och DELAR och kör sedan den här filen med `source`.
# Bygger båda språken: <NAMN>.mp4 (svenska) och <NAMN>-en.mp4, med kapitel(-en).txt och undertexter <NAMN>(-en).srt.
#
# Shortsen sätts ihop hela, i 1080×1920: inget klipps och inget snabbas upp. Varje Short får en fast förstärkning
# till samma ljudstyrka (-16 LUFS, mätt med ebur128) och en limiter på toppar (-1,5 dBTP), så att ljudet är jämnt
# över skarvarna utan att musiken pumpar. Short mot Short ligger på tomt papper (de börjar och slutar på papperet).
# Där en ny del börjar (en färg i DELAR) kommer 003:s kritsvep, bilderna från ../mix-1/kritsvep/bilder/
# förstorade så att de täcker den stående bilden.
#
# DELAR: "ord|kritsvepets färg in i delen (tom = inget svep)", ord som i shorts/gissa/export/gissa-<ord>.mp4
#
# LIGG=1 (gissa-<tema>-liggande/): 16:9, som ett avsnitt. Formatets intro (intro/, kopierat från 015:s "Kort i himlen", med
# avsnittens jingel; engelska: format/jingel-en.m4a och tiny crayon tv), sedan Shortsen i mixläget (render.mjs --liggande --mix:
# <ord>-liggande-mix(-en).mp4, utan intro-replik och hej då; den sista med --sist, som säger hej då) och sist outrot (outro/,
# ../gissa-outro.js). Kritsvep (bara det) vid varje skarv, färgerna i tur och ordning; färgerna i DELAR används inte här.
# Introt normeras för sig, outrot får sista Shortens förstärkning (samma musik under). Undertexterna från
# shorts/undertexter/mix/ (srt.mjs --mix).
set -e
R=../../../..; G=$R/produktion/youtube/shorts/gissa/export; U=$R/produktion/youtube/shorts/undertexter
E=$R/assets/ljud/effekter; SV=../mix-1/kritsvep/bilder
[ -n "$LIGG" ] && SVF=null || SVF=scale=-2:1920,crop=1080:1920   # kritsvepets bilder är 1920×1080
if [ -n "$LIGG" ]; then
  PAL=(f28d3c 3b8fe0 4fae4a e93c8f 8e44c9 2fb3b5 f2c230)
  ORD=(); for d in "${DELAR[@]}"; do ORD+=("${d%%|*}"); done
  SISTA=${ORD[$((${#ORD[@]}-1))]}
  DELAR=("intro|"); i=0; for o in "${ORD[@]}" outro; do DELAR+=("$o|${PAL[$((i % ${#PAL[@]}))]}"); i=$((i+1)); done
fi
sist() { [ "$1" = "$SISTA" ] && [ "$1" != bondgarden-samling ] && echo -sist; }   # den sista Shorten säger hej då (samlingen gör det alltid)
kalla() {   # delens fil: $1 = ord, $2 = "" eller -en
  if [ "$1" = intro ]; then echo intro/intro-med-jingel$2.mp4
  elif [ "$1" = outro ]; then echo outro/outro$2.mp4
  elif [ -n "$LIGG" ]; then m=${1/bondgarden-samling/samling}; ls $R/produktion/youtube/shorts/gissa/*/$m/$m-liggande-mix$(sist $1)$2.mp4   # samlingen ligger i bondgarden/samling/
  else echo $G/gissa-$1$2.mp4; fi
}
V="-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -an"
AU="-ar 48000 -ac 2 -c:a pcm_s16le -vn"
MAL=-16
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
lufs() { ffmpeg -nostats -i "$1" -af ebur128 -f null - 2>&1 | grep -A3 Summary | awk '/I:/{print $2}'; }

T=.tmp; rm -rf $T; mkdir -p $T

# introt med jingeln, som avsnitten (014 film/satt-ihop.sh): svenska jingel.m4a, engelska de första 9,9 s av format/jingel-en.m4a
if [ -n "$LIGG" ]; then
  JF="[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9.9"
  ffmpeg -loglevel error -y -i intro/intro.mp4 -i $R/avsnitt/014-grona-traktorn/intro/jingel.m4a -filter_complex "$JF,apad[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel.mp4
  ffmpeg -loglevel error -y -i intro/intro-en.mp4 -i $R/format/jingel-en.m4a -filter_complex "$JF,afade=t=out:st=9.5:d=0.4,apad[a]" \
    -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel-en.mp4
fi

# kritsvepets ljud (1,8 s), samma som i mix 2: ett kort skrrrrt per kritdrag och ett swoosh när det smular
ffmpeg -loglevel error -y -i $E/skrrrrt-kort/skrrrrt-kort-1.m4a -i $E/skrrrrt-kort/skrrrrt-kort-2.m4a -i $E/skrrrrt-kort/skrrrrt-kort-3.m4a \
  -i $E/skrrrrt-kort/skrrrrt-kort-4.m4a -i $E/swoosh/swoosh-1.m4a -filter_complex \
  "[0]adelay=0:all=1[a];[1]adelay=117:all=1[b];[2]adelay=234:all=1[c];[3]adelay=351:all=1[d];[0]adelay=450:all=1[e];[1]adelay=576:all=1[f];[2]adelay=702:all=1[g];[4]adelay=900:all=1,volume=0.6[h];[a][b][c][d][e][f][g][h]amix=inputs=8:normalize=0,volume=-10dB,aformat=sample_rates=48000:channel_layouts=stereo" \
  $AU $T/svep.wav

for SPRAK in sv en; do
  [ $SPRAK = sv ] && { S=""; UT=$NAMN.mp4; KAP=kapitel.txt; SRT=$NAMN.srt; } || { S=-en; UT=$NAMN-en.mp4; KAP=kapitel-en.txt; SRT=$NAMN-en.srt; }
  D=$T/$SPRAK; mkdir -p $D
  FARG=(); for d in "${DELAR[@]}"; do IFS='|' read -r _ f <<< "$d"; FARG+=("$f"); done
  i=0; : > $D/delar.txt
  for d in "${DELAR[@]}"; do
    IFS='|' read -r ord farg <<< "$d"; fil=$(kalla $ord $S); n=$(printf %02d $i); nasta=${FARG[$((i+1))]:-}
    L0=$(langd $fil)
    # bilden: kritsvepet in i början av delen (bild 27–53) och nästa dels svep över slutet (bild 0–26), som i mix 2
    ex=(); fk="[0:v]null[b0]"; sist=b0; k=1
    if [ -n "$farg" ]; then
      ex+=(-framerate 30 -start_number 27 -i $SV/$farg/%04d.png)
      fk="$fk;[$k:v]$SVF[s$k];[$sist][s$k]overlay=eof_action=pass[b$k]"; sist=b$k; k=$((k+1))
    fi
    if [ -n "$nasta" ]; then
      ex+=(-itsoffset $(awk "BEGIN{print $L0-0.9}") -framerate 30 -i $SV/$nasta/%04d.png)
      fk="$fk;[$k:v]trim=end_frame=27,$SVF[t$k];[$sist][t$k]overlay=eof_action=pass[b$k]"; sist=b$k
    fi
    ffmpeg -loglevel error -y -i $fil "${ex[@]}" -filter_complex "$fk" -map "[$sist]" $V $D/$n.mp4
    # ljudet: fast förstärkning till MAL LUFS och limiter på topparna, sedan exakt lika långt som bilden (bara utfyllnad,
    # Shortsens ljud och bild skiljer högst ett par hundradelar)
    L=$(langd $D/$n.mp4); mat=$fil; [ $ord = outro ] && mat=$(kalla $SISTA $S)
    g=$(awk "BEGIN{print $MAL-($(lufs $mat))}")
    ffmpeg -loglevel error -y -i $fil -af "volume=${g}dB,alimiter=limit=0.84:attack=5:release=50:level=disabled,apad,atrim=0:$L" $AU $D/$n.wav
    echo "$ord|$farg|$L|$g" >> $D/delar.txt
    i=$((i+1))
  done

  ls $D/[0-9]*.mp4 | sed "s#.*/#file '#; s#\$#'#" > $D/bild.txt
  ls $D/[0-9][0-9].wav | sed "s#.*/#file '#; s#\$#'#" > $D/ljud.txt
  ffmpeg -loglevel error -y -f concat -safe 0 -i $D/bild.txt -c copy $D/hel.mp4
  ffmpeg -loglevel error -y -f concat -safe 0 -i $D/ljud.txt -c copy $D/hel.wav

  # skarvarna: kritsvepets ljud; kapitlen och undertexterna (Shortsens egna srt, förskjutna) skrivs samtidigt
  afk=""; m=0; j=0; : > $KAP; : > $D/srt.txt
  while IFS='|' read -r ord farg L g; do
    s=$(awk "BEGIN{printf \"%d\", $j+0.5}"); printf "%d:%02d %s\n" $((s/60)) $((s%60)) $(case $ord in (intro|outro) echo $ord;; (*) echo gissa-$ord$S;; esac) >> $KAP
    case $ord in intro|outro) ;; *) [ -n "$LIGG" ] && echo "$U/mix/gissa-$ord$(sist $ord)$S.srt|$j" >> $D/srt.txt || echo "$U/gissa-$ord$S.srt|$j" >> $D/srt.txt;; esac
    if [ -n "$farg" ]; then
      m=$((m+1)); ms=$(awk "BEGIN{printf \"%d\", ($j-0.9)*1000}"); afk="$afk[x$m]adelay=$ms:all=1[s$m];"
    fi
    j=$(awk "BEGIN{print $j+$L}")
  done < $D/delar.txt
  if [ $m -gt 0 ]; then
    x=""; s=""; for k in $(seq 1 $m); do x="$x[x$k]"; s="$s[s$k]"; done
    ffmpeg -loglevel error -y -i $D/hel.wav -i $T/svep.wav -filter_complex \
      "[1]asplit=$m$x;$afk[0]${s}amix=inputs=$((m+1)):duration=first:normalize=0,alimiter=limit=0.95:level=disabled[a]" \
      -map "[a]" $AU $D/ljud.wav
  else
    cp $D/hel.wav $D/ljud.wav
  fi
  ffmpeg -loglevel error -y -i $D/hel.mp4 -i $D/ljud.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart $UT

  python3 - $D/srt.txt $SRT <<'PY'
import re, sys
def tid(t):
    h, m, rest = t.split(':'); s, f = rest.split(','); return ((int(h)*60 + int(m))*60 + int(s))*1000 + int(f)
def ut(x):
    return '%02d:%02d:%02d,%03d' % (x//3600000, x//60000 % 60, x//1000 % 60, x % 1000)
rader, nr = [], 0
for rad in open(sys.argv[1]):
    fil, start = rad.strip().rsplit('|', 1); off = round(float(start)*1000)
    for block in open(fil, encoding='utf-8').read().strip().split('\n\n'):
        l = block.strip().split('\n'); a, b = [tid(x.strip()) for x in l[1].split('-->')]
        nr += 1; rader.append('%d\n%s --> %s\n%s\n' % (nr, ut(a+off), ut(b+off), '\n'.join(l[2:])))
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(rader))
PY
  echo "$UT $(langd $UT) s, förstärkning per Short (dB): $(cut -d'|' -f1,4 $D/delar.txt | tr '\n' ' ')"
done
rm -rf $T
