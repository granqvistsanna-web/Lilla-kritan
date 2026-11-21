#!/bin/bash
# Sätter ihop avsnitt 034 (efter node verktyg/render-delat.mjs avsnitt/034-musen-pyntar-granen/scener/vardagsrummet): julvarianten av bilderbok-introt (produktion/youtube/bilderbok-intro-jul:
# intro.mp4 och intro-effekter.wav med jingeln, popp och glitter) och sedan scenen med dess
# effekter (Malins repliker, ljudeffekterna och rummets ljud ligger i scener/vardagsrummet/vardagsrummet-effekter.wav).
# Mixen som 020: introts ljud och effekterna +6 dB, scenens förskjutna med introts längd (läses ur filen); mastras till −14,5 LUFS (QA 2026-11-15: −13,7 var för högt) / −1,5 dBTP (loudnorm i två pass).
# Sanna 2026-11-15: Joy to the World (instrumental, karol-joy-to-the-world, samma bädd som 035 och 036) under hela filmen efter introt,
# ca −32 LUFS som 036, slingad, tonas in 2 s och ut sista 3 s, duckas under Malin och ljuden (sidechaincompress på scenens effekter).
set -e
cd "$(dirname "$0")/.."
UT=${UT:-film/avsnitt-034.mp4}   # UT=film/avsnitt-034-forhand.mp4 för en förhandsvisning
INTRO=../../produktion/youtube/bilderbok-intro-jul   # julintrot "Djuren hittar på!" som 035 och 040 (Sanna 2026-11-21: "add julkal intro")
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -i $INTRO/intro.mp4 -vf scale=1920:1080 $V $T/00.mp4
ffmpeg -loglevel error -y -i scener/vardagsrummet/vardagsrummet.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
MUSIK=../../assets/ljud/musik/jul/karol-joy-to-the-world.mp3
SC=$(awk "BEGIN{printf \"%.3f\", $TOT-$IN}"); FADE=$(awk "BEGIN{printf \"%.2f\", $TOT-$IN-3}")
ffmpeg -loglevel error -y -i $INTRO/intro-effekter.wav -i scener/vardagsrummet/vardagsrummet-effekter.wav -stream_loop -1 -i $MUSIK -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS,asplit[e][nyckel];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-32:TP=-8,atrim=0:$SC,afade=t=in:d=2,afade=t=out:st=$FADE:d=3,adelay=$MS|$MS,apad,atrim=0:$TOT[m0];[m0][nyckel]sidechaincompress=threshold=0.02:ratio=6:attack=30:release=600:makeup=1[m];[i][e][m]amix=inputs=3:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14.5:TP=-2.0:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14.5:TP=-2.0:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.75:attack=5:release=50:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -r $T
langd $UT
