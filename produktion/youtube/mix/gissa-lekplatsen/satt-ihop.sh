#!/bin/bash
# Gissa teckningen: Lekplatsen: alla Gissa teckningen-Shorts om lekplatsen i en stående video (1080×1920), på svenska och engelska.
# Bygger gissa-lekplatsen.mp4 och gissa-lekplatsen-en.mp4 med kapitel.txt, kapitel-en.txt och undertexter. Själva bygget: ../gissa-bygg.sh
# Kör: produktion/youtube/mix/gissa-lekplatsen/satt-ihop.sh
cd "$(dirname "$0")"
NAMN=gissa-lekplatsen
DELAR=(
  "boll|"
  "gunga|"
  "gungbrada|"
  "hink|"
  "rutschkana|"
  "sandlada|"
  "spade|"
)
source ../gissa-bygg.sh
