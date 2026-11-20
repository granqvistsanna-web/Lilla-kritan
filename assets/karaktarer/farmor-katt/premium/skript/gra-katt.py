"""Farmor och farfar ur kattens (Kaj) urklipp: den mörka pälsen (luminans < 0,55) blir grå, g = bas + L,
med en svag ton. Rosa öron, gräddvita tassar och den vita kanten lämnas orörda; övergången mjukas över L 0,55–0,62.
Pixlarna ligger kvar på samma plats, så kaj-rigg.json gäller (kopierad under nytt namn).
Kör från repots rot: python3 assets/karaktarer/farmor-katt/premium/skript/gra-katt.py"""
import json, glob, os
import numpy as np
from PIL import Image

KAJ = 'assets/karaktarer/katten-kaj/premium'
FIGURER = {   # namn: (bas, ton r g b)
    'farmor': (0.52, (0.97, 1.0, 1.04)),   # ljusgrå, lite kall
    'farfar': (0.40, (1.04, 1.0, 0.95)),   # mörkare grå, lite varm
}

def omfarga(src, dst, bas, ton):
    im = np.asarray(Image.open(src).convert('RGBA')).astype(np.float32) / 255
    rgb, a = im[..., :3], im[..., 3:]
    L = (0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2])[..., None]
    gra = np.clip((bas + L) * np.array(ton, np.float32), 0, 1)
    w = np.clip((0.62 - L) / 0.07, 0, 1)   # pälsen (L < 0,55) helt, mjuk kant 0,55–0,62 mot tassar och kant
    ut = np.concatenate([w * gra + (1 - w) * rgb, a], -1)
    Image.fromarray((ut * 255 + 0.5).astype(np.uint8)).save(dst)

for namn, (bas, ton) in FIGURER.items():
    mal = f'assets/karaktarer/{namn}-katt/premium'
    os.makedirs(f'{mal}/cut', exist_ok=True)
    for src in sorted(glob.glob(f'{KAJ}/cut/kaj-*.png')) + [f'{KAJ}/kaj-faceless.png']:
        dst = src.replace(KAJ, mal).replace('/kaj-', f'/{namn}-')
        omfarga(src, dst, bas, ton)
    rigg = json.load(open(f'{KAJ}/kaj-rigg.json'))
    rigg['kropp'] = rigg['kropp'].replace('kaj-', f'{namn}-')
    for d in rigg['delar'].values(): d['fil'] = d['fil'].replace('kaj-', f'{namn}-')
    json.dump(rigg, open(f'{mal}/{namn}-rigg.json', 'w'), indent=2, ensure_ascii=False)
    print(namn, 'klar')
