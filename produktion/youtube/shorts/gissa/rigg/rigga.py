# rigga.py <djur> <flowbild> <sak> [ogonfarg]: klipper ut, delar i kropp + ben, skriver rigg och skriver ut bild-raden
import sys, re, json, os, shutil, subprocess, numpy as np
from PIL import Image
djur, flow, sak = sys.argv[1:4]; ogfarg = sys.argv[4] if len(sys.argv) > 4 else None
ROT = '/Users/sannagranqvist/Documents/Lilla-kritan'; S = os.path.dirname(os.path.abspath(__file__))
TEMA = os.environ.get('TEMA', 'bondgarden')   # TEMA=skogen för andra teman
src = open(f'{ROT}/produktion/youtube/shorts/gissa/{TEMA}/{djur}/index.html').read()
C = json.load(open(f'{S}/spar/ctm.json'))[djur]
A = f'{ROT}/assets/rekvisita/{sak}'; os.makedirs(f'{A}/cut', exist_ok=True)
if os.path.exists(f'{A}/{sak}.png') and not os.path.exists(f'{A}/v1'):   # gammal fri bild sparas i v1/
    os.makedirs(f'{A}/v1/cut'); shutil.move(f'{A}/{sak}.png', f'{A}/v1/')
    for f in os.listdir(f'{A}/cut'): shutil.move(f'{A}/cut/{f}', f'{A}/v1/cut/')
Image.open(flow).convert('RGB').save(f'{A}/{sak}.png')
PY = os.path.expanduser('~/.claude/skills/ai-video/.venv/bin/python')
klipp = f'{S}/flodklipp.py' if os.environ.get('FLOD') else f'{ROT}/.claude/skills/ai-video/scripts/cutout.py'
subprocess.run([PY, '-I', klipp, f'{A}/{sak}.png', f'{A}/cut/{sak}-hel.png'], check=True)
a = np.array(Image.open(f'{A}/cut/{sak}-hel.png')); al = a[..., 3] > 40
ys, xs = np.where(al); ib = [xs.min(), ys.min(), xs.max(), ys.max()]
s_, e, f = C['a'], C['e'], C['f']; b = C['bbox']
db = [(b[0]-e)/s_, (b[1]-f)/s_, (b[2]-e)/s_, (b[3]-f)/s_]   # teckningens ruta i teckningens koordinater
sk = ((db[2]-db[0])/(ib[2]-ib[0]) + (db[3]-db[1])/(ib[3]-ib[1])) / 2
X, Y = db[0] - ib[0]*sk, db[3] - ib[3]*sk          # vänsterkant och botten (fötterna) ska ligga rätt
img = lambda x, y: ((x-X)/sk, (y-Y)/sk)
m_ = re.search(r"liv: \{[^\n]*?ben: (\[\[[^\]]*\](?:, \[[^\]]*\])*\])", src)   # djur utan svängande ben (skutta, flyga): inga benbilder
par = json.loads(m_.group(1).replace("'", '"')) if m_ else []
ben = {}
for id_ in sum(par, []):
    d = re.search(r"\['%s', '(M[^']*)'" % id_, src).group(1); n = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    xs_, ys_ = n[0::2], n[1::2]; x0, y0 = img(min(xs_), min(ys_)); x1, y1 = img(max(xs_), max(ys_)); ben[id_] = [x0, y0, x1, y1]
ordn = sorted(ben, key=lambda k: ben[k][0]); rut = dict(ben)
kropp = a.copy(); rad = []
for i, k in enumerate(ordn):
    x0, y0, x1, y1 = rut[k]
    vg = rut[ordn[i-1]][2] if i else -1e9; hg = rut[ordn[i+1]][0] if i+1 < len(ordn) else 1e9
    m0 = int(max(x0 - 30, (x0+vg)/2)); m1 = int(min(x1 + 30, (x1+hg)/2)); kant = int(y0 + 12); topp = int(y0 - 50)
    bb = np.zeros_like(a); bb[topp:, m0:m1] = a[topp:, m0:m1]
    Image.fromarray(bb).save(f'{A}/cut/{sak}-{k}.png'); kropp[kant:, m0:m1] = 0
    ben[k] = (f'assets/rekvisita/{sak}/cut/{sak}-{k}.png', [int((x0+x1)/2), int(y0+4)])
Image.fromarray(kropp).save(f'{A}/cut/{sak}.png')
ogon = []
for m in re.finditer(r"\['(?:oga|pupill)\d?', spiral\((\d+), (\d+), (\d+)", src):
    x, y = img(int(m[1]), int(m[2])); o = [int(x), int(y), max(9, round(int(m[3])*1.5/sk))]
    if ogfarg: o.append(ogfarg)
    ogon.append(o)
json.dump({'kropp': f'cut/{sak}.png', 'ben': {k: v for k, v in ben.items()}, 'oga': ogon, 'x': X, 'y': Y, 'skala': sk}, open(f'{A}/{sak}-rigg.json', 'w'), ensure_ascii=False, indent=1)
R = lambda p: json.dumps(p, ensure_ascii=False).replace('"', "'")
benrad = '[' + ', '.join('[' + ', '.join(f"['{ben[k][0]}', {ben[k][1]}]" for k in p) + ']' for p in par) + ']'
oga = R(ogon[0]) if len(ogon) == 1 else R(ogon)
print(f"  bild: {{ fil: 'assets/rekvisita/{sak}/cut/{sak}.png', x: {X:.0f}, y: {Y:.0f}, skala: {sk:.3f}, oga: {oga}" + (f",\n    ben: {benrad} }}," if par else " },"))
