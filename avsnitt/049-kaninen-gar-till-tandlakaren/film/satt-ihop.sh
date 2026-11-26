#!/bin/bash
# Avsnitt 049 för YouTube: scenens film (molnrender eller render-delat, med Malin, effekterna och bädden) utan intro, så scentid = filmtid.
# Mastras i två pass till −14 LUFS / −1,5 dBTP med limiter sist (som 047) → film/avsnitt-049.mp4. Bilden kopieras.
# Med --snabb (efter render-delat --snabb) → film/avsnitt-049-snabb.mp4, så att den godkända slutfilmen ligger kvar.
set -e
cd "$(dirname "$0")/.."
IN=scener/mottagningen/mottagningen.mp4; UT=film/avsnitt-049.mp4; [ "$1" = "--snabb" ] && UT=film/avsnitt-049-snabb.mp4
M=$(ffmpeg -hide_banner -i $IN -vn -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | awk '/^\{/,/^\}/')
v() { echo "$M" | sed -n "s/.*\"$1\" : \"\(.*\)\".*/\1/p"; }
ffmpeg -loglevel error -y -i $IN -filter_complex \
  "[0:a]loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(v input_i):measured_TP=$(v input_tp):measured_LRA=$(v input_lra):measured_thresh=$(v input_thresh):offset=$(v target_offset):linear=true,aresample=48000,volume=1dB,alimiter=limit=0.80:level=false,volume=-0.3dB,alimiter=limit=0.84:level=false[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -movflags +faststart $UT
ffprobe -v error -show_entries format=duration -of csv=p=0 $UT
