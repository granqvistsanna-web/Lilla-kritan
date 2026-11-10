# Gretas hängöron (som Hugos): örats flik ligger FRAMFÖR huvudet, så örat tas som hela örat, också där det ligger
# över huvudet. Skillnaden mellan faceless och kroppsbilden (bara kroppen) ger fliken: utsidan, konturen inne i huvudet
# och fyllningen mellan dem. Örat läggs framför kroppen inne i #kropp i uttryck.html och vrids kring roten inne i
# huvudet (högst ±12°). Vit kant 10 px bara på utsidan (en kant mot huvudet blir en vit linje).
# Kör i premium/ efter delar.py (ersätter dess ear-l/-r och langre_rot; originalen ligger i cut/v1/).
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage
sys.path.insert(0, '/Users/sannagranqvist/Documents/Lilla-kritan/verktyg'); import tunn_kant
fa = np.asarray(Image.open('cut/greta-faceless.png').convert('RGBA'))
f = np.asarray(Image.open('greta-faceless.png').convert('RGB')).astype(int)
b = np.asarray(Image.open('greta-body.png').convert('RGB')).astype(int)
B = ndimage.binary_fill_holes(b.min(2) < 225)                 # kroppens fyllning (utan den vita kanten)
d = np.abs(f - b).sum(2) > 60
d[360:] = False
icke_vit = f.min(2) < 225
rigg = json.load(open('greta-rigg.json'))
for n, sida in [('ear-l', lambda x: x < 512), ('ear-r', lambda x: x >= 512)]:
    xx = np.arange(1024)[None, :].repeat(1024, 0)
    E = d & sida(xx) & icke_vit
    E = ndimage.binary_fill_holes(ndimage.binary_closing(E, iterations=5))
    lab, k = ndimage.label(E); E = lab == 1 + np.argmax(ndimage.sum(E, lab, range(1, k + 1)))
    E = ndimage.binary_opening(E, iterations=2)
    inne = E & B
    ys, xs = np.nonzero(inne)
    topp = ys.min()
    p = [int(xs[ys < topp + 30].mean()), int(topp + 22)]       # roten: där örat går in i huvudet, en bit in
    img = fa.copy(); img[..., 3] = np.where(E, 255, 0)
    img[E, :3] = f[E].astype(np.uint8)
    c, al = tunn_kant.ny_alfa(img, 10)
    al = np.where(B & ~E, 0, al)                                 # ingen kant inne i huvudet
    Image.fromarray(np.dstack([c, (al * 255).astype(np.uint8)])).save(f'cut/greta-{n}.png')
    rigg['delar'][n]['vridpunkt'] = p
    print(n, 'rot', p, 'px', int(E.sum()), 'i huvudet', int(inne.sum()))
json.dump(rigg, open('greta-rigg.json', 'w'), indent=2, ensure_ascii=False)
