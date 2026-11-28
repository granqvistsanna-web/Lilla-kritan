#!/bin/bash
# Sätter ihop avsnitt 063 (efter molnrenderingen, verktyg/molnrender.sh): Lilla Kritans logotyp 1 s (format/kritans-bok.md: boken är introt;
# logotypen som 020:s, introts färdiga bild som poppar in ur pappret, med pling-1 kortat till 1 s), sedan scenen i boken med dess effekter
# (Malins repliker, rävens och ekorrens ljud, effekterna och skogsljudet i scener/boken/boken-effekter.wav) och sist prenumerera-kortet
# (produktion/youtube/prenumerera). Mixen som 058: effekterna +6 dB; mastras i två pass till −14 LUFS / −1,5 dBTP, AAC 192k → film/avsnitt-063.mp4.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-063.mp4
LOGO=../020-grisen-badar/intro/intro.mp4
PREN=../../produktion/youtube/prenumerera
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
ffmpeg -loglevel error -y -ss 5.0 -i $LOGO -frames:v 1 $T/logo.png
ffmpeg -loglevel error -y -loop 1 -i $T/logo.png -vf "zoompan=z='1+0.14*pow(max(0\,1-on/9)\,2)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=30:s=1920x1080:fps=30,fade=t=in:st=0:d=0.15:color=0xFBF7EE,scale=1920:1080" -frames:v 30 $V $T/00.mp4
ffmpeg -loglevel error -y -i ../../assets/ljud/effekter/pling/pling-1.m4a -af "aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.0,afade=t=out:st=0.6:d=0.4,apad=whole_dur=1.0" -c:a pcm_s24le $T/logo.wav
ffmpeg -loglevel error -y -i scener/boken/boken.mp4 -vf scale=1920:1080 $V $T/01.mp4
ffmpeg -loglevel error -y -i $PREN/prenumerera.mp4 -vf scale=1920:1080 $V $T/02.mp4
printf "file '00.mp4'\nfile '01.mp4'\nfile '02.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); SC=$(langd $T/01.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}"); PS=$(awk "BEGIN{printf \"%d\", ($IN+$SC)*1000}")
ffmpeg -loglevel error -y -i $T/logo.wav -i scener/boken/boken-effekter.wav -i $PREN/prenumerera-effekter.wav -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,apad[i];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS[e];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$PS|$PS[p];[i][e][p]amix=inputs=3:duration=longest:normalize=0,apad,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.76:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
