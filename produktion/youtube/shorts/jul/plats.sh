# Högst två luckbyggen åt gången (Sanna 27/11: åtta hel-video.sh samtidigt gav load ~800).
# Läses in av hel-video.sh och mastra.sh: `source ${0:A:h}/plats.sh`. Väntar tills en av LK_PLATSER (2) platser är ledig,
# tar den och släpper den när skriptet slutar. Platserna är kataloger i jul/.platser/ (ignoreras av git) med byggets pid;
# en plats vars pid inte lever längre (kraschat eller dödat bygge) räknas som ledig. Går mappen inte att skriva i körs
# bygget utan spärr. mastra.sh som körs inifrån hel-video.sh tar ingen egen plats (LK_PLATS är satt). LK_PLATSER=0 stänger av.
if [[ -z ${LK_PLATS:-} && ${LK_PLATSER:-2} != 0 ]]; then
  lk_dir=${0:A:h}/.platser
  if mkdir -p $lk_dir 2>/dev/null && [[ -w $lk_dir ]]; then
    lk_sagt=0
    while :; do
      for lk_i in $(seq 1 ${LK_PLATSER:-2}); do
        lk_p=$lk_dir/plats-$lk_i
        if [[ -d $lk_p ]] && ! kill -0 $(cat $lk_p/pid 2>/dev/null || echo 0) 2>/dev/null; then rm -rf $lk_p; fi   # övergiven plats
        if mkdir $lk_p 2>/dev/null; then echo $$ > $lk_p/pid; export LK_PLATS=$lk_p; break 2; fi
      done
      (( lk_sagt )) || { echo "väntar på en ledig plats för luckbygget (högst ${LK_PLATSER:-2} åt gången)" >&2; lk_sagt=1; }
      sleep ${LK_VANTA:-15}
    done
    trap 'rm -rf $LK_PLATS' EXIT INT TERM
  else
    echo "OBS: kan inte skriva i $lk_dir, luckbygget körs utan spärr" >&2
  fi
fi
