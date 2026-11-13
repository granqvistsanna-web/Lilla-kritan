#!/bin/bash
# Högst två renderingar åt gången på datorn: väntar på en ledig plats, kör kommandot, släpper platsen.
# Kör: bash verktyg/rendera-plats.sh node verktyg/render-delat.mjs <scenmapp> --snabb
# En plats vars ägare har dött (pid finns inte längre) tas över.
P=${LK_PLATSER:-2}
while :; do
  for k in $(seq 1 $P); do
    D=/tmp/lk-render-plats-$k
    if [ -d $D ] && ! kill -0 "$(cat $D/pid 2>/dev/null)" 2>/dev/null; then rm -rf $D; fi
    if mkdir $D 2>/dev/null; then
      echo $$ > $D/pid; trap "rm -rf $D" EXIT
      echo "plats $k: $*"; "$@"; exit $?
    fi
  done
  sleep 15
done
