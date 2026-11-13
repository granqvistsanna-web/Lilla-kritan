# Gemensam del för Shorts som renderas stående ur avsnittets egna kodscener (källas av <avsnitt>/klipp.sh, kör från repots rot).
# Bilden: verktyg/render-staende.mjs (9:16-fönster som följer figuren, ritat i full upplösning). Ljudet: oförändrat ur den färdiga filmen.
# Valfritt: FIGUR=<css> om figurerna inte har klassen .kropp.
# Kräver: F (filmen), O (mappen för Shortsen), SCENER=("scenmapp filmstart" …) i ordning, och raderna på stdin: namn|start|slut (filmtid, s)[|fast: bilder utan figur där fönstret ska stå still, "a-b:x,…" i scentid, se verktyg/render-staende.mjs].
# Ett klipp som går över en scenskarv renderas i bitar, en per scen, och sätts ihop. 0,3 s toning i början och slutet.
T=$(mktemp -d)
while IFS='|' read -r namn a b fast; do
  : > $T/delar.txt
  for i in "${!SCENER[@]}"; do
    read -r d s <<< "${SCENER[$i]}"; e=99999; [ $((i + 1)) -lt ${#SCENER[@]} ] && e=${SCENER[$((i + 1))]#* }
    lo=$(echo "if ($a > $s) $a else $s" | bc); hi=$(echo "if ($b < $e) $b else $e" | bc)
    [ $(echo "$lo < $hi" | bc) = 1 ] || continue
    node verktyg/render-staende.mjs $d --fran $(echo "$lo - $s" | bc) --till $(echo "$hi - $s" | bc) ${fast:+--fast $fast} ${FIGUR:+--figur $FIGUR} --ut $T/$namn-$i.mp4 > /dev/null
    echo "file '$T/$namn-$i.mp4'" >> $T/delar.txt
  done
  ffmpeg -nostdin -v error -y -f concat -safe 0 -i $T/delar.txt -c copy $T/$namn.mp4
  d=$(echo "$b - $a" | bc); u=$(echo "$d - 0.3" | bc)
  ffmpeg -nostdin -v error -y -i $T/$namn.mp4 -ss $a -t $d -i $F -filter_complex \
    "[0:v]fade=in:0:st=0:d=0.3,fade=out:st=$u:d=0.3,format=yuv420p[v];[1:a]afade=in:d=0.3,afade=out:st=$u:d=0.3[a]" \
    -map "[v]" -map "[a]" -t $d -c:v libx264 -crf 20 -preset slow -c:a aac -b:a 192k -movflags +faststart $O/$namn.mp4
  echo "$namn $d s"
done
rm -r "$T"
