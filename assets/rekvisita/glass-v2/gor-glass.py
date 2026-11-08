# Glassarna i art direction v2 (005 kiosken, Sanna 2026-11-08: "need new improved assets", "more polished and slight more depth").
# Ur cut/glass-rosa-v2-ra.png (take 1 ur Google Flow, urklippt med verktyg/egen_kant.py): lite djup i kod (ljus överst till vänster
# på kulan, mörkare nere till höger och under kanten, strutens högra sida mörkare), sedan i v1-glassarnas rutor så att scenerna
# fungerar utan ändringar: 431 × 743 med skarven kula/strut på y 330 (strutklippet 0,445), glassberget 434 × 940 med skarven på 525.
# Gul och grön är den rosa kulan omfärgad. Kör: ~/.claude/skills/ai-video/.venv/bin/python -I gor-glass.py
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

HAR = Path(__file__).resolve().parent
a = np.asarray(Image.open(HAR / 'cut/glass-rosa-v2-ra.png').convert('RGBA')).astype(float)
h, w = a.shape[:2]
SKARV = 515                                   # kula/strut i originalet
r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3] / 255
farg = (a[..., :3].max(2) - a[..., :3].min(2)) > 40          # inte den vita kanten
kula = farg & (r > g + 40) & (b > g - 10)
strut = farg & ~kula
yy, xx = np.mgrid[:h, :w]

def mjuk(m, r_=25):
    return np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r_))) / 255

# djup: ljusare uppe till vänster på kulan, mörkare nere till höger, skugga under kanten på strutens topp, strutens högra sida mörkare
cx, cy = 230, 170
ljus = np.clip(1 - np.hypot(xx - cx, (yy - cy) * 1.2) / 260, 0, 1) ** 1.6 * kula
mork = np.clip((xx - 250) / 400 + (yy - 260) / 500, 0, 1) * kula
skugga = mjuk((yy > SKARV) & (yy < SKARV + 70) & strut, 18) * strut
hoger = np.clip((xx - (w / 2 + (yy - SKARV) * 0.0)) / (w * 0.35), 0, 1) * strut * (yy > SKARV)
rgb = a[..., :3].copy()
rgb = rgb + (255 - rgb) * (0.35 * ljus)[..., None]
rgb = rgb * (1 - (0.16 * mork + 0.22 * skugga + 0.14 * hoger))[..., None]
a[..., :3] = np.clip(rgb, 0, 255)
djup = Image.fromarray(a.astype(np.uint8), 'RGBA')
djup.save(HAR / 'cut/glass-rosa-v2.png')

def omfarga(im, mal):
    """Kulan i en annan färg: ljusheten behålls, färgen byts mot mal (r, g, b)."""
    x = np.asarray(im).astype(float)
    k = kula[..., None]
    lum = x[..., :3].mean(2, keepdims=True) / np.mean(x[..., :3][kula], 0).mean()
    x[..., :3] = np.where(k, np.clip(np.array(mal) * lum, 0, 255), x[..., :3])
    return Image.fromarray(x.astype(np.uint8), 'RGBA')

K = 0.64                                       # bredden 653 → 418 (v1 426)
def i_ruta(im, W, H, skarv):
    s = im.resize((round(w * K), round(h * K)), Image.LANCZOS)
    ut = Image.new('RGBA', (W, H))
    ut.alpha_composite(s, (round(W / 2 - s.width / 2), round(skarv - SKARV * K)))
    return ut

UT = HAR / 'cut'
i_ruta(djup, 431, 743, 330).save(UT / 'glass-rosa.png')
i_ruta(omfarga(djup, (246, 214, 92)), 431, 743, 330).save(UT / 'glass-gul.png')
i_ruta(omfarga(djup, (138, 206, 98)), 431, 743, 330).save(UT / 'glass-gron.png')
# glassberget: en andra kula bakom och ovanför den första (bara kulan, utan strut)
berg = i_ruta(djup, 434, 940, 525)
KK = 0.9 * K   # den övre kulan lite mindre, med sin kant (bågarna) hel, så att den sticker fram vid sidorna
ovre = djup.crop((0, 0, w, SKARV + 12))
ovre = ovre.resize((round(w * KK), round((SKARV + 12) * KK)), Image.LANCZOS)
bak = Image.new('RGBA', (434, 940))
bak.alpha_composite(ovre, (round(217 - ovre.width / 2), 6))
bak.alpha_composite(berg)
bak.save(UT / 'glass-berg.png')
print('glass-rosa, glass-gul, glass-gron (431 × 743), glass-berg (434 × 940) i cut/')
# den tomma struten (kiosken 13a): den rosa utan kulan, allt ovanför skarven bort (kiosken klipper den också på 0,445)
s = np.asarray(Image.open(UT / 'glass-rosa.png')).copy(); s[:334, :, 3] = 0
Image.fromarray(s).save(UT / 'glass-strut.png')
