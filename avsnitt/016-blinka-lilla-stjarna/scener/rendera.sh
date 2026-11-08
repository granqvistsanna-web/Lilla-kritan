#!/bin/bash
# Kör render.mjs med högst två renderingar samtidigt (två platser: .las-1 och .las-2, mkdir är atomiskt).
# Användning som render.mjs: ./rendera.sh <scenmapp> [--snabb] [tider …]
cd "$(dirname "$0")"
while :; do
  for n in 1 2; do
    if mkdir .las-$n 2>/dev/null; then
      trap "rmdir .las-$n" EXIT INT TERM
      node render.mjs "$@"
      exit $?
    fi
  done
  sleep 3
done
