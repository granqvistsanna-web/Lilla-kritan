#!/bin/bash
# Sätter ihop avsnitt 039 (efter node verktyg/render-delat.mjs avsnitt/039-kaninen-aker-pulka/scener/pulka) UTAN intro: filmen är en
# julkalenderlucka (Sanna 2026-11-17: "this will be used for julkal so no need intro"). Scenen börjar på tomt papper, och dess effekter
# (Malin, kaninens ljud, kläderna, kritan, backens vindmatta) ligger i scener/pulka/pulka-effekter.wav.
# Ingen sång. Under hallen (rad 1 till rad 33) ligger en låg julkarol (karol-forsta-jul) i stället för den tickande klockan
# (feedback 18/11: "det finns ingen klocka"), jämn bädd ca −32 LUFS som 035/036, tonas in och ut. Effekter +6 dB som 036;
# mastras i två pass till −14 LUFS / −1,5 dBTP → film/avsnitt-039.mp4.
# Behövs introt igen (fristående YouTube-film): se versionen före 2026-11-17 i git.
set -e
cd "$(dirname "$0")/.."
UT=film/avsnitt-039.mp4
langd() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
T=film/.tmp; mkdir -p $T
ffmpeg -loglevel error -y -i scener/pulka/pulka.mp4 -vf scale=1920:1080 -c:v libx264 -pix_fmt yuv420p -r 30 -an $T/bild.mp4
TOT=$(langd $T/bild.mp4)
# hallens tider ur rader.json (rad 00 är inte med i scenen): H0 = rad 1 börjar, H1 = rad 33 (backen) börjar
read H0 H1 < <(node -e 'const j=require("./scener/pulka/rader.json");let s=0,h0,h1;for(const r of j.RADER){if(r.id==="00")continue;if(r.id==="1")h0=s;if(r.id==="33")h1=s;s+=r.d}console.log(h0,h1)')
HL=$(awk "BEGIN{print $H1-$H0+1.0}"); MS=$(awk "BEGIN{printf \"%d\", $H0*1000}")
MU=../../assets/ljud/musik/jul
ffmpeg -loglevel error -y -i scener/pulka/pulka-effekter.wav -stream_loop -1 -i $MU/karol-forsta-jul.mp3 -filter_complex \
  "[0:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=6dB,apad,atrim=0:$TOT[e];\
[1:a]aformat=sample_rates=48000:channel_layouts=stereo,loudnorm=I=-32:TP=-8,atrim=0:$HL,afade=t=in:d=2,afade=t=out:st=$(awk "BEGIN{print $HL-1.6}"):d=1.6,adelay=$MS|$MS,apad,atrim=0:$TOT[mu];\
[mu][e]amix=inputs=2:duration=longest:normalize=0,atrim=0:$TOT[a]" \
  -map "[a]" -c:a pcm_s24le $T/mix.wav
# Mastring: −14 LUFS, true peak ≤ −1,5 dBTP. Loudnorm i två pass, limiter sist.
M=$(ffmpeg -hide_banner -i $T/mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $T/bild.mp4 -i $T/mix.wav -filter_complex \
  "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,alimiter=limit=0.75:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k $UT
rm -rf $T
langd $UT
