#!/bin/bash
# Kritans ABC A–E som Shorts, stående 1080×1920 renderat ur filmernas egna kodscener (staende.sh, verktyg/render-staende.mjs). Filmtid = scentid.
# Två per bokstav: 1 "Vem är det?" (kritan ritar bokstaven, bokstaven hälsar, kritan ritar kompisen, gissningspausen, svaret, "Hej, …!")
# och 2 "Busiga kritan!" (kritan ritar fel sak, gissningspausen, Malin skrattar, "Hej då, …!"). Tiderna är replikernas start i window.LJUD:
# klippen börjar och slutar mellan Malins repliker, och musiken är instrumentala slingor, så den tonar in och ut på 0,3 s.
# Fönstret följer bokstavens figur (FIGUR, utan mellanslag: staende.sh delar på dem). --fast (scentid:skärmens x) låser det på bokstavsklossen
# i introt och medan kritan ritar figuren (960), på det felritade till höger (1150) från "Nu ritar kritan" tills bokstaven undrar,
# och längst till vänster (300, fönstret mot bildkanten) när figuren står till vänster i helbild, så att bokstavsmärket i hörnet syns helt
# i stället för halvt. I närbilderna följer fönstret figuren. Slutet ligger strax före kamerans nästa zoom (mätt i #topp:s viewBox).
# Kör från repots rot: bash produktion/youtube/shorts/abc/klipp.sh [a b c d e]
kor() {   # kor <bokstav> <namn>|<start>|<slut>[|fast]
  local l=$1 rad=$2; F=produktion/youtube/alfabet/abc-$l-recept-3/abc-$l-recept-3.mp4; SCENER=("produktion/youtube/alfabet/abc-$l-recept-3 0")
  O=produktion/youtube/shorts/abc/${rad%%|*}; mkdir -p $O
  source produktion/youtube/shorts/staende.sh <<< "$rad"
}
for l in ${@:-a b c d e}; do FIGUR='#saker>g:first-child'; case $l in
  a) kor a 'abc-a-1-vem-ar-det|2.3|44.4|2-27.9:960,42.0-44.4:300'
     kor a 'abc-a-2-busiga-kritan|61.0|86.6|61.0-72.6:1150,72.6-74.4:300,76.9-86.6:300' ;;
  b) kor b 'abc-b-1-vem-ar-det|2.3|43.9|2-27.9:960,41.5-43.9:300'
     kor b 'abc-b-2-busiga-kritan|59.7|86.2|59.7-73.1:1150,73.1-75.4:300,77.8-86.2:300' ;;
  c) kor c 'abc-c-1-vem-ar-det|2.3|43.4|2-27.9:960,41.0-43.4:300'
     kor c 'abc-c-2-busiga-kritan|62.3|84.65|62.3-72.6:1150,72.6-74.8:300,77.0-84.65:300' ;;
  d) FIGUR='#saker>g:nth-child(3)'   # dinon är tredje saken i D
     kor d 'abc-d-1-vem-ar-det|2.3|43.9|2-27.9:960,41.7-43.9:300'
     kor d 'abc-d-2-busiga-kritan|60.7|84.3|60.7-71.9:1150,71.9-73.6:300,76.0-84.3:300' ;;
  e) kor e 'abc-e-1-vem-ar-det|2.3|42.9|2-27.9:960,40.5-42.9:300'
     kor e 'abc-e-2-busiga-kritan|59.1|82.6|59.1-70.3:1150,70.3-72.2:300,74.4-82.6:300' ;;
esac; done
