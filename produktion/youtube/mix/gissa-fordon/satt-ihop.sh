#!/bin/bash
# Gissa teckningen: Fordon: alla Gissa teckningen-Shorts om fordon i en stående video (1080×1920), på svenska och engelska.
# Bygger gissa-fordon.mp4 och gissa-fordon-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-fordon/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-fordon
DELAR=(
  "bil|"
  "buss|"
  "brandbil|"
  "tag|"
  "bat|"
  "flygplan|"
  "cykel|"
)
source ../gissa-bygg.sh
