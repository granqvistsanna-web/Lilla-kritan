# Lugnar kritstrukturen i en v2-figurs urklipp (Sanna 2026-11-08, 005: "mouse body a bit more clean, less crayons, just subtle crayon").
# Bara fyllningen: den vita kanten (ljusa, omättade pixlar), kanten mot genomskinligt och ytan precis runt dem lämnas orörda.
# Fyllningen jämnas med en kantbevarande oskärpa (gaussisk inom fyllningen, vägd mot stora färgskillnader, så att t.ex. örats rosa
# inte blöder in i det grå) och blandas tillbaka med originalet: styrka 0 = original, 1 = helt slätt.
#   ~/.claude/skills/ai-video/.venv/bin/python -I verktyg/slata-krita.py <in-mapp> <ut-mapp> <styrka> [sigma] fil.png ...
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as nd

def slata(im, k, sigma=6.0):
    a = np.asarray(im.convert('RGBA')).astype(np.float32)
    rgb, al = a[..., :3], a[..., 3]
    nara = nd.distance_transform_edt(al > 0) < 40                              # kanten ligger ytterst (ca 15–25 px i 1024-rutan)
    vit = (rgb.min(-1) > 215) & (rgb.max(-1) - rgb.min(-1) < 25) & (al > 0) & nara   # den vita kanten, inte kritans ljusa streck inne i ytan
    halv = (al > 0) & (al < 250)                                               # utkanten mot genomskinligt
    fyll = (al >= 250) & ~nd.binary_dilation(vit | halv, iterations=3)
    m = fyll.astype(np.float32)
    nm = nd.gaussian_filter(m, sigma)
    jamn = np.stack([nd.gaussian_filter(rgb[..., c] * m, sigma) for c in range(3)], -1) / np.maximum(nm, 1e-4)[..., None]
    d = jamn - rgb
    # färggräns = skillnad i kulör (grått mot rosa), inte i ljushet: kritans ljusa och mörka streck jämnas, örats kant står kvar
    skill = 2.2 * np.abs(d - d.mean(-1, keepdims=True)).sum(-1) + 0.25 * np.abs(d.mean(-1)) * 3
    w = k * np.exp(-(skill / 90.0) ** 2) * nd.gaussian_filter(m, 1.5)   # mjuk övergång vid fyllningens kant
    ut = a.copy()
    ut[..., :3] = rgb * (1 - w[..., None]) + jamn * w[..., None]
    return Image.fromarray(np.clip(ut, 0, 255).astype(np.uint8))

if __name__ == '__main__':
    src, dst, k = Path(sys.argv[1]), Path(sys.argv[2]), float(sys.argv[3])
    sigma = float(sys.argv[4]) if sys.argv[4].replace('.', '').isdigit() else 6.0
    filer = sys.argv[5:] if sys.argv[4].replace('.', '').isdigit() else sys.argv[4:]
    dst.mkdir(parents=True, exist_ok=True)
    for f in filer:
        slata(Image.open(src / f), k, sigma).save(dst / f)
        print(dst / f)
