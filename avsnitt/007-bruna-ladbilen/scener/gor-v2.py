# Skriver v2-riggar.js: riggen, ansiktet och poserna för v2-figurerna (art direction v2), utdragna ur varje figurs
# assets/karaktarer/<mapp>/premium/uttryck.html (från "const RIGG" till raden före "const P = o"), plus mått ur urklippen
# (axlarna, armens vilriktning och längd till handen, figurens bbox). Kör om när en uttryck.html ändras:
#   ~/.claude/skills/ai-video/.venv/bin/python -I gor-v2.py
# Används av v2.js (v2.figur), som ger figurerna samma API som kit.figur hade.
import re
from pathlib import Path
import numpy as np
from PIL import Image

HAR = Path(__file__).resolve().parent
ROT = HAR.parents[2]
FIGURER = {'bjornen-bulle': 'bulle', 'lammet-ludde': 'ludde', 'grodan-gurra': 'gurra', 'musen-mille': 'mille', 'igelkotten-igge': 'igge'}

def alfa(p):
    return np.array(Image.open(p).convert('RGBA'))[..., 3] > 128

ut = ['// GENERERAD av gor-v2.py ur assets/karaktarer/*/premium/uttryck.html. Ändra inte här: ändra uttryck.html och kör om.',
      'window.v2riggar = {};']
for mapp, namn in FIGURER.items():
    prem = ROT / 'assets/karaktarer' / mapp / 'premium'
    rader = (prem / 'uttryck.html').read_text().split('\n')
    a = next(i for i, r in enumerate(rader) if r.startswith('const RIGG'))
    b = next(i for i, r in enumerate(rader) if r.startswith('const P = o'))
    # rörelserna (ROR: klappa, hoppa, ga, dansa, ligga …) med P, blinka och steg, ända till ROR:s slut (Sanna 2026-11-08: "use character sheet")
    r0 = next(i for i, r in enumerate(rader) if r.startswith('const ROR'))
    b = next(i for i in range(r0, len(rader)) if rader[i].startswith('};')) + 1
    kod = '\n'.join(rader[a:b])
    kod = kod.replace('href="cut/', 'href="${CUT}')
    kod = re.sub(r'^function figur\(x, y, skala\) \{', 'function figur(x, y, skala, parent) {', kod, flags=re.M)
    kod = kod.replace("document.querySelectorAll('#figurer > g').length", 'Math.floor(Math.random() * 1e9)')
    kod = kod.replace("document.getElementById('figurer').appendChild(g);", 'parent.appendChild(g);')
    piv = re.search(r"'arm-l': \[(\d+), (\d+)\], 'arm-r': \[(\d+), (\d+)\]", kod)
    PIV = {'l': [int(piv[1]), int(piv[2])], 'r': [int(piv[3]), int(piv[4])]}
    vila, arm = {}, {}
    for s in 'lr':   # armens vilriktning: från axeln mot den punkt i armen som ligger längst bort
        ys, xs = np.nonzero(alfa(prem / f'cut/{namn}-arm-{s}.png'))
        i = np.argmax((xs - PIV[s][0]) ** 2 + (ys - PIV[s][1]) ** 2)
        vila[s] = round(float(np.degrees(np.arctan2(ys[i] - PIV[s][1], xs[i] - PIV[s][0]))), 1)
        arm[s] = round(float(np.hypot(ys[i] - PIV[s][1], xs[i] - PIV[s][0])) - 20)   # handens mitt, inte spetsen
    m = np.zeros((1024, 1024), bool)
    for d in ['body', 'ear-l', 'ear-r', 'leg-l', 'leg-r']:
        p = prem / f'cut/{namn}-{d}.png'
        if p.exists(): m |= alfa(p)
    ys, xs = np.nonzero(m)
    bbox = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
    ut += [f'// ---- {mapp} ({prem.relative_to(ROT)}/uttryck.html, rad {a + 1}–{b}) ----', '(() => {',
           f"const CUT = kit.ROT + 'assets/karaktarer/{mapp}/premium/cut/';", 'const mjuk = k => k * k * (3 - 2 * k);   // ROR använder den (står längre ner i uttryck.html)', kod,
           f"window.v2riggar['{mapp}'] = {{ figur, rita, blanda, blandaPose, param, UTTRYCK, POSE0, POSER, ROR, RIGG, FOTTER,",
           f"  PIV: {PIV}, VILA: {vila}, ARM: {arm}, BBOX: {bbox} }};".replace("'", ''), '})();']
(HAR / 'v2-riggar.js').write_text('\n'.join(ut) + '\n')
print('v2-riggar.js:', ', '.join(FIGURER))
