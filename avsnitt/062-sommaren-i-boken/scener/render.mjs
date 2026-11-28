// Scenen renderas med den delade renderaren (produktion/three-rum/render.mjs, som räknar ut repots rot själv). Filen finns kvar
// här för att verktyg/render-delat.mjs och verktyg/molnrender.sh letar efter <scenmapp>/../render.mjs. Samma flaggor som förut:
//   node avsnitt/NNN-namn/scener/render.mjs avsnitt/NNN-namn/scener/boken ['--snabb'] [tider …]
// (render-delat.mjs läser den här filen och letar efter texten '--snabb' innan den skickar flaggan vidare.)
import '../../../produktion/three-rum/render.mjs';
