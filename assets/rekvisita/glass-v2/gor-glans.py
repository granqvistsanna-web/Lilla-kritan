# Glansiga kioskglassar (019, Sanna 2026-11-09 runda 3: "improve ice cream at kiosk and 3.25"): samma glansiga stil som dansglassarna.
# Ur cut/glass-jordgubb.png (dansglassen), i v1-glassarnas rutor så att kiosken och bilen fungerar utan ändringar:
# 431 × 743 med skarven kula/strut på y 330, två och tre kulor 431 × 933 / 431 × 1123 (kulan 190 px upp per kula, varje ny kula framför den under).
# Gul och grön är kulan omfärgad. Inga nya bilder, bara dansglassen i andra rutor.
# Kör: ~/.claude/skills/ai-video/.venv/bin/python -I gor-glans.py
from pathlib import Path
import numpy as np
from PIL import Image

HAR = Path(__file__).resolve().parent
UT = HAR / 'cut'
src = Image.open(UT / 'glass-jordgubb.png').convert('RGBA')
a = np.asarray(src).astype(float)
h, w = a.shape[:2]
SKARV = 548                                   # kula/strut i dansglassen
r, g, b = a[..., 0], a[..., 1], a[..., 2]
kula = ((a[..., :3].max(2) - a[..., :3].min(2)) > 40) & (r > g + 40) & (b > g - 10)

def omfarga(mal):
    x = a.copy()
    lum = x[..., :3].mean(2, keepdims=True) / np.mean(x[..., :3][kula], 0).mean()
    x[..., :3] = np.where(kula[..., None], np.clip(np.array(mal) * lum, 0, 255), x[..., :3])
    return Image.fromarray(x.astype(np.uint8))

K = 0.6                                       # bredden 690 → 414
def i_ruta(im, W, H, skarv):
    s = im.resize((round(w * K), round(h * K)), Image.LANCZOS)
    ut = Image.new('RGBA', (W, H))
    ut.alpha_composite(s, (round(W / 2 - s.width / 2), round(skarv - SKARV * K)))
    return ut

i_ruta(src, 431, 743, 330).save(UT / 'glass-glans-rosa.png')
i_ruta(omfarga((246, 214, 92)), 431, 743, 330).save(UT / 'glass-glans-gul.png')
i_ruta(omfarga((138, 206, 98)), 431, 743, 330).save(UT / 'glass-glans-gron.png')
strut = ((a[..., :3].max(2) - a[..., :3].min(2)) > 40) & ~kula
from PIL import ImageFilter
bort = np.asarray(Image.fromarray((strut * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(13))) > 0
k_al = a.copy(); k_al[..., 3] = np.where(bort & ~kula & (np.mgrid[:h, :w][0] > 380), 0, k_al[..., 3])   # bara kulan, struten bort
kulan = Image.fromarray(k_al.astype(np.uint8)).crop((0, 0, w, SKARV + 14)).resize((round(w * K), round((SKARV + 14) * K)), Image.LANCZOS)
for n, H in ((2, 933), (3, 1123)):
    ut = i_ruta(src, 431, H, H - 743 + 330)
    for i in range(1, n):
        ut.alpha_composite(kulan, (round(215.5 - kulan.width / 2), round(H - 743 + 330 - SKARV * K - 190 * i)))
    ut.save(UT / f'glass-glans-{"tva" if n == 2 else "tre"}.png')
print('glass-glans-rosa, -gul, -gron (431 × 743), -tva (431 × 933), -tre (431 × 1123) i cut/')
