# delar.py slog ihop höger arm, svansen och höger ben till en bit (de nuddar varandra via den vita kanten), så den biten
# delas här efter läge: höger ben (x < 690, y > 800), höger arm (790 < x < 868, y < 628), resten är svansen. Samma utskärning som
# delar.py --egen-kant (delen + 45 px av figuren runt den), och vridpunkten i leden mot kroppen. Kör i premium/ efter delar.py.
import json
import numpy as np
from PIL import Image
from scipy import ndimage
A = np.asarray(Image.open('cut/rut-faceless.png'))[..., 3] > 128
B = np.asarray(Image.open('cut/rut-body.png'))[..., 3] > 128
l = ndimage.binary_opening(A & ~ndimage.binary_dilation(B, iterations=6), iterations=2)
lab, n = ndimage.label(l)
stor = 1 + np.argmax([((lab == i) & (np.arange(1024)[None, :] > 700)).sum() for i in range(1, n + 1)])
bit = lab == stor
yy, xx = np.mgrid[:1024, :1024]
delar = {'leg-r': bit & (xx < 690) & (yy > 800), 'arm-r': bit & (xx > 790) & (xx < 868) & (yy < 628)}
delar['tail'] = ndimage.binary_opening(bit & ~delar['leg-r'] & ~delar['arm-r'], iterations=3)
nara = ndimage.binary_dilation(B, iterations=20)
rigg = json.load(open('rut-rigg.json'))
fl = np.asarray(Image.open('cut/rut-faceless.png'))
for namn, d in delar.items():
    led = d & nara
    py, px = np.nonzero(led)
    ytan = (ndimage.binary_dilation(d, iterations=45) & A) | d
    # inte in i de andra delarna
    for m, o in delar.items():
        if m != namn: ytan &= ~ndimage.binary_dilation(o, iterations=4)
    b = fl.copy(); b[~ytan, 3] = 0
    Image.fromarray(b).save(f'cut/rut-{namn}.png')
    rigg['delar'][namn] = {'fil': f'cut/rut-{namn}.png', 'vridpunkt': [int(px.mean()), int(py.mean())]}
    print(namn, rigg['delar'][namn]['vridpunkt'], int(d.sum()))
json.dump(rigg, open('rut-rigg.json', 'w'), indent=2, ensure_ascii=False)
