#!/bin/bash
# Mix 3 "Sjung, lek och gissa" (16:9): ett intro, de fyra färgsångerna i art direction v2 (019 rosa, 013 röda, 007 bruna v2,
# 011 gula), 015 Bä, bä, vita lamm och 016 Blinka lilla stjärna sist, fem Tittut-filmer, de tre första "Vad ska vi göra?"-
# bilderböckerna (020, 021, 023) och fjorton Gissa teckningen två och två emellan (från Bondgården och Fordon, inga från Skogen). 45 minuter. Byggd som Mix 2: sångerna tas från sitt intros slut
# (fjärde fältet, sekunder) och spelas sedan oförändrade. Inga långa intron inne i mixen (Sanna 2026-11-11: det blir för mycket
# upprepning): Tittut börjar när kortet är borta, 020 efter sitt intro, och Shortsen är mixläget (<ord>-liggande-mix.mp4). Tittut och
# Shortsen ljudnormaliseras (-14 LUFS); sångerna och bilderböckerna ligger redan där och rörs inte. Varje skarv mot en ny del får
# kritsvepet i delens färg (bilderna i ../mix-1/kritsvep/bilder/); Short mot Short ligger på tomt papper.
# Skogens Shorts i liggande format: node avsnitt/004-bussen-badar/scener/render.mjs produktion/youtube/shorts/gissa/skogen/<ord> --liggande --mix
# Kör: produktion/youtube/mix/mix-3/satt-ihop.sh   (ny svepfärg: cd ../mix-1 && node kritsvep/render.mjs <färg>)
set -e
cd "$(dirname "$0")"
R=../../../..; A=$R/avsnitt; G=$R/produktion/youtube/shorts/gissa; TT=$R/produktion/youtube/tittut; E=$R/assets/ljud/effekter
UT=mix-3.mp4; T=.tmp; rm -rf $T; mkdir -p $T
V="-c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -r 30 -an"
AU="-ar 48000 -ac 2 -c:a pcm_s16le -vn"
INTRO=9
# jämn nivå utan att klippa: mät delen (från $2 s) och lyft eller sänk den till $3 LUFS, med en limiter för topparna
niva() { local I=$(ffmpeg -nostats -ss $2 -i "$1" -vn -af ebur128 -f null - 2>&1 | grep -E "^ +I:" | tail -1 | awk '{print $2}')
  echo "volume=$(awk "BEGIN{print $3-($I)}")dB,alimiter=limit=0.89:level=false"; }
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

# delar: typ|fil|kritsvepets färg in i delen (tom = ingen svep)|sekunder som hoppas över i början (delens eget intro)|egen|kapa (sekunder som tas bort i slutet)
# egen = delen börjar täckt av sitt eget kritsvep (013, 015, 011, 016, 020): mixens svep täcker bara slutet av delen före, i exakt
# samma färg (mätt ur filmen), och delens eget svep smular bort. Annars blev det två svep efter varandra (QA 2026-11-11).
L=$TT/lekplatsen; SK=$TT/skogen-gron
DELAR=(
  "intro|intro/intro.mp4|"
  "short|$G/bondgarden/traktor/traktor-liggande-mix.mp4|f7c225"
  "short|$G/bondgarden/hund/hund-liggande-mix.mp4|"
  "avsnitt|$A/019-rosa-favoritfarg/film/avsnitt-019.mp4|e93c8f|11.3"
  "short|$G/bondgarden/far/far-liggande-mix.mp4|f2c230"
  "short|$G/bondgarden/hast/hast-liggande-mix.mp4|"
  "tittut|$SK/kaninen-kanel/kaninen-kanel.mp4|4fae4a|3.9"
  "short|$G/fordon/brandbil/brandbil-liggande-mix.mp4|a8784e"
  "short|$G/fordon/bat/bat-liggande-mix.mp4|"
  "bok|$A/020-grisen-badar/film/avsnitt-020.mp4|f3a1bb|10.6|egen"
  "short|$G/fordon/buss/buss-liggande-mix.mp4|8e44c9"
  "short|$G/fordon/tag/tag-liggande-mix.mp4|"
  "avsnitt|$A/013-rod-brandbil/film/avsnitt-013-final.mp4|de4b2b|9|egen"
  "tittut|$SK/lammet-ludde/lammet-ludde.mp4|2fb3b5|3.9"
  "avsnitt|$A/015-ba-ba-vita-lamm/film/avsnitt-015.mp4|63ab54|9|egen"
  "short|$G/fordon/cykel/cykel-liggande-mix.mp4|f2a33a"
  "short|$G/bondgarden/hona/hona-liggande-mix.mp4|"
  "bok|$A/021-hunden-leker/film/avsnitt-021.mp4|8e44c9"
  "avsnitt|$A/007-bruna-ladbilen/film/avsnitt-007-v2-final.mp4|a8784e|9"
  "tittut|$L/leoparden-lova/leoparden-lova.mp4|f2c230|3.9"
  "short|$G/bondgarden/ko/ko-liggande-mix.mp4|f28d3c"
  "short|$G/bondgarden/gris/gris-liggande-mix.mp4|"
  "bok|$A/023-bjornen-tvattar-handerna/film/avsnitt-023.mp4|3b8fe0"
  "tittut|$L/hunden-hugo/hunden-hugo.mp4|df342f|3.9"
  "short|$G/fordon/bil/bil-liggande-mix.mp4|2fb3b5"
  "short|$G/lekplatsen/boll/boll-liggande-mix.mp4|"
  "tittut|$L/kaninen/kaninen.mp4|4fae4a|3.9"
  "short|$G/bondgarden/anka/anka-liggande-mix.mp4|f2a33a"
  "short|$G/bondgarden/katt/katt-liggande-mix.mp4|"
  "avsnitt|$A/011-gula-helikoptern/film/avsnitt-011.mp4|f7c225|9|egen"
  "avsnitt|$A/016-blinka-lilla-stjarna/film/avsnitt-016-grovklipp.mp4|435b9b|9|egen|3.4"
)
for d in "${DELAR[@]}"; do IFS='|' read -r _ fil _ <<< "$d"; [ -f "$fil" ] || { echo "saknas: $fil" >&2; exit 1; }; done

# kritsvepet (bild 27 = täckt, på skarven) läggs på varje del innan delarna sätts ihop: andra halvan (bild 27–53) i början
# av delen med delens färg, första halvan (bild 0–26) i slutet av delen före. I ett enda pass över hela mixen tappade
# ffmpeg svepen efter ca 13 minuter, så korta förskjutningar per del i stället.
SV=../mix-1/kritsvep/bilder; FARG=(); for d in "${DELAR[@]}"; do IFS='|' read -r _ _ f _ <<< "$d"; FARG+=("$f"); done
# delarna kodas parallellt, P åt gången (Sanna 2026-11-13: snabbare); varje del skriver sin rad i $T/NN.txt
P=${P:-4}
i=0; for d in "${DELAR[@]}"; do
  [ $i -gt 0 ] && [ $((i % P)) -eq 0 ] && wait
  (
  IFS='|' read -r typ fil farg hopp egen kapa <<< "$d"; n=$(printf %02d $i); nasta=${FARG[$((i+1))]:-}
  case $typ in
    intro)   # det nya introt (013:s, gult, 9,0 s; Sanna 2026-11-11): jingeln och introts effekter mixade som i avsnitten (030:s satt-ihop.sh).
      # Det slutar täckt av sitt eget gula kritsvep, så mixens svep läggs inte på slutet; första Shorten börjar med samma gula (f7c225) som smular bort.
      kalla=(-t $INTRO -i $fil); VF="scale=1920:1080"; L0=$INTRO; nasta=
      ST="aformat=sample_rates=48000:channel_layouts=stereo"
      ffmpeg -loglevel error -y -i intro/jingel.m4a -i intro/intro-effekter.wav -filter_complex \
        "[0:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4,apad[j];[1:a]$ST,atrim=0:9,afade=t=out:st=8.6:d=0.4,volume=6dB[ie];[j][ie]amix=inputs=2:duration=longest:normalize=0,atrim=0:$INTRO[a]" \
        -map "[a]" $AU $T/$n.wav ;;
    avsnitt)
      # sångerna låg mellan -13,4 och -17,8 LUFS: alla till -15 (Sanna 2026-11-11), bara nivån, sången klipps aldrig.
      # kapa = sekunder svart som tas bort i slutet, med sista 1,2 s uttonade (016: stjärnan på svart; Sanna 2026-11-11 "tona ut")
      L0=$(awk "BEGIN{print $(langd $fil)-$hopp-${kapa:-0}}"); kalla=(-ss $hopp -t $L0 -i $fil); VF="scale=1920:1080"
      ffmpeg -loglevel error -y -i $fil -ss $hopp -af "$(niva $fil $hopp -15)${kapa:+,afade=t=out:st=$(awk "BEGIN{print $L0-1.2}"):d=1.2}" $AU $T/$n.wav ;;
    bok)     # bilderböckerna: ljudet orört; 020 börjar efter sitt långa intro, 021 och 023 har bara det korta kortet (3,3 s)
      kalla=(-ss ${hopp:-0} -i $fil); VF="scale=1920:1080"; L0=$(awk "BEGIN{print $(langd $fil)-${hopp:-0}}")
      ffmpeg -loglevel error -y -i $fil -ss ${hopp:-0} $AU $T/$n.wav ;;
    short|tittut)   # Shortsen i mixläget (utan intro-replik och hej då); Tittut börjar när introkortet är borta (3,9 s)
      VF="scale=1920:1080"
      kalla=(-ss ${hopp:-0} -i $fil); L0=$(awk "BEGIN{print $(langd $fil)-${hopp:-0}}")
      if [ $typ = tittut ]; then   # loudnorm i ett pass lämnade Tittut på -17 till -18 LUFS (QA 2026-11-11): mät och lyft till -15,5 med en limiter
        LJ=$(niva $fil $hopp -15.5)
      else LJ="loudnorm=I=-14:TP=-1.5:LRA=11"; fi
      ffmpeg -loglevel error -y -i $fil -ss ${hopp:-0} -af "$LJ" $AU $T/$n.wav ;;
  esac
  ex=(); fk="[0:v]$VF[b0]"; sist=b0; k=1
  if [ -n "$farg" ] && [ -z "$egen" ]; then   # svepet smular bort i början av delen
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
  echo "$typ|$(basename $fil .mp4)|$farg|$L" > $T/$n.txt
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
