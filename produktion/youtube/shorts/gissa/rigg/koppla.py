# koppla.py <djur> <bildrad-fil>: byter (eller lägger till) bild-raden i Shortens index.html
import sys, re, os
TEMA = os.environ.get('TEMA', 'bondgarden')
djur, rad = sys.argv[1], open(sys.argv[2]).read().rstrip('\n')
p = f'/Users/sannagranqvist/Documents/Lilla-kritan/produktion/youtube/shorts/gissa/{TEMA}/{djur}/index.html'; s = open(p).read()
kom = "  // bilden är spårad från teckningen (samma form), utan öga: ögat ritas i kod och blinkar, och benen är egna bilder som går\n"
s = re.sub(r"  // bilden är spårad[^\n]*\n", "", s)
if re.search(r"\n  bild: \{", s): s = re.sub(r"\n  bild: \{.*?\},\n(?=  liv:)", "\n" + kom + rad + "\n", s, flags=re.S)
else: s = s.replace("\n  liv: {", "\n" + kom + rad + "\n  liv: {", 1)
open(p, 'w').write(s)
