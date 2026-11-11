#!/bin/bash
# Sätter ihop avsnitt 020 (efter film/rendera.sh): introt med jingelns första 9,9 s och introts effekter, sedan scenen med
# dess effekter (Malins repliker, ljudeffekterna och badrumsljudet ligger i scener/badet/badet-effekter.wav).
# Ingen sång än: Suno-bädden läggs in här när den finns. Mixen som 019: effekter +6 dB; mastras till −14 LUFS / −1 dBTP.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-020.mp4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
ffmpeg -loglevel error -y -i intro/intro.mp4 -i intro/jingel.m4a -i intro/intro-effekter.wav -filter_complex \
  "[1:a]aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:9.9,afade=t=out:st=9.5:d=0.4,apad[j];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,afade=t=out:st=9.5:d=0.4,volume=6dB[e];[j][e]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest intro/intro-med-jingel.mp4
T=film/.tmp; mkdir -p $T
V="-c:v libx264 -pix_fmt yuv420p -r 30 -an"
# Runda 7 ("add a super short intro with lilla kritan logo and a sound effect, about 1-2 sec"): 1,6 s före introt. Logotypen är introts
# färdiga bild (5,0 s in, före titelfläcken), den poppar in (mjuk inzoomning som landar) ur pappret, med pling-1 ("ta-da, logotypen är klar") kortat till 1,6 s.
ffmpeg -loglevel error -y -ss 5.0 -i intro/intro.mp4 -frames:v 1 $T/logo.png
ffmpeg -loglevel error -y -loop 1 -i $T/logo.png -vf "zoompan=z='1+0.14*pow(max(0\,1-on/11)\,2)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=48:s=1920x1080:fps=30,fade=t=in:st=0:d=0.18:color=0xFBF7EE,scale=1920:1080" -frames:v 48 $V $T/kort.mp4
ffmpeg -loglevel error -y -i ../../assets/ljud/effekter/pling/pling-1.m4a -af "aformat=sample_rates=48000:channel_layouts=stereo,atrim=0:1.6,afade=t=out:st=1.15:d=0.45,apad=whole_dur=1.6" -c:a pcm_s24le $T/kort.wav
ffmpeg -loglevel error -y -i intro/intro-med-jingel.mp4 -vf scale=1920:1080 $V $T/00i.mp4
printf "file 'kort.mp4'\nfile '00i.mp4'\n" > $T/intro.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/intro.txt -c copy $T/00.mp4
ffmpeg -loglevel error -y -i $T/kort.wav -i intro/intro-med-jingel.mp4 -filter_complex "[1:a]aformat=sample_rates=48000:channel_layouts=stereo[b];[0:a][b]concat=n=2:v=0:a=1[a]" -map "[a]" -c:a pcm_s24le $T/00a.wav
ffmpeg -loglevel error -y -i scener/badet/badet.mp4 -vf scale=1920:1080 $V $T/01.mp4
printf "file '00.mp4'\nfile '01.mp4'\n" > $T/bild.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i $T/bild.txt -c copy $T/bild.mp4
IN=$(langd $T/00.mp4); TOT=$(langd $T/bild.mp4)
MS=$(awk "BEGIN{printf \"%d\", $IN*1000}")
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/00a.wav -i scener/badet/badet-effekter.wav -filter_complex \
  "[1:a]apad[j];[2:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,adelay=$MS|$MS[e];[j][e]amix=inputs=2:duration=longest:normalize=0[m];[m]atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
# Mastring (QA 2026-11-10): −14 LUFS, true peak ≤ −1 dBTP. Loudnorm i två pass: mät först, sedan linjär normalisering med de mätta värdena.
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
