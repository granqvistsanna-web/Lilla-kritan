# Blå himmel i 019 Rosa sången (Sanna 2026-11-09, runda 3–4: "gör himmel blå", samma blå i hela filmen, grön kulle bakom vägen).
# Samma toning överallt: TOPP #44A9D3 (glasskioskens blå) uppe, HORISONT #B2E0F2 nere vid horisonten. Kritdragen behålls
# (varje pixels ljushet mot radens median läggs på den blå). Inga nya bilder, bara omfärgade.
# Kör: ~/.claude/skills/ai-video/.venv/bin/python -I assets/bakgrunder/vagen/gor-bla.py
from pathlib import Path
import numpy as np
from PIL import Image

ROT = Path(__file__).resolve().parents[3]
TOPP = np.array([68, 169, 211.]); HOR = np.array([178, 224, 242.])
LUM = [0.299, 0.587, 0.114]

def himmel(a, mask, hz):
    """Pixlarna i mask (himlen) blir den blå toningen, ljust vid hz."""
    ut = a.copy()
    for y in range(a.shape[0]):
        m = mask[y]
        if not m.any(): continue
        row = a[y, :, :3]; lum = row @ LUM; med = np.median(lum[m > 0.5] if (m > 0.5).any() else lum)
        t = TOPP + (HOR - TOPP) * min(1, y / hz)
        nb = np.clip(t + (lum - med)[:, None] * 1.1, 0, 255)
        k = m.astype(float)[:, None] if m.dtype == bool else m[:, None]
        ut[y, :, :3] = row * (1 - k) + nb * k
    return ut

def rosa_vagg(a):
    rgb = a[..., :3]; mx = rgb.max(-1); mn = rgb.min(-1); sat = (mx - mn) / np.maximum(mx, 1)
    return (sat > 0.12) & (rgb[..., 0] > rgb[..., 1] + 20) & (rgb[..., 2] > rgb[..., 1])

# vägen: väggen blå, med och utan en grön kulle bakom vägen
V = ROT / 'assets/bakgrunder/vagen'
a = np.asarray(Image.open(V / 'vagen-rosa.png').convert('RGBA')).astype(float)
vagg = rosa_vagg(a)
HZ = 560
Image.fromarray(himmel(a, vagg, HZ).astype(np.uint8)).save(V / 'vagen-bla.png')
yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]
kurva = 505 + 18 * np.sin(xx / 210 + 0.6) + 10 * np.sin(xx / 83 + 2.0)          # kullens överkant
kulle = vagg & (yy > kurva)
b = himmel(a, vagg & ~kulle, HZ)
lum = a[..., :3] @ LUM; med = np.median(lum[kulle])
gron = np.clip(np.array([166, 216, 107.]) + (lum - med)[..., None] * 0.9, 0, 255)
kant = kulle & (yy < kurva + 6)
gron[kant] = gron[kant] * 0.86                                                    # kritkant överst (som kullarna vid 1:58)
b[..., :3] = np.where(kulle[..., None], gron, b[..., :3])
Image.fromarray(b.astype(np.uint8)).save(V / 'vagen-bla-kulle.png')

# glassbergens himlar
G = ROT / 'assets/bakgrunder/glassberget/varianter'
a = np.asarray(Image.open(G / 'rosa-himmel.png').convert('RGBA')).astype(float)
m = np.zeros(a.shape[:2]); m[:640] = 1; m[640:662] = np.linspace(1, 0, 22)[:, None]
Image.fromarray(himmel(a, m, 640).astype(np.uint8)).save(G / 'bla-himmel.png')
a = np.asarray(Image.open(G / 'glassbergen-vy-rosa.png').convert('RGBA')).astype(float)
m = np.zeros(a.shape[:2]); m[:300] = 1; m[300:380] = np.linspace(1, 0, 80)[:, None]   # de avlägsna bergen blir blådisiga
Image.fromarray(himmel(a, m, 330).astype(np.uint8)).save(G / 'glassbergen-vy-bla.png')

# kiosken (005:s platta, en blå kopia i 019): himlen ovanför marken
K = ROT / 'avsnitt/005-rosa-bilen/scener/lager/kiosk-ra.png'
a = np.asarray(Image.open(K).convert('RGBA')).astype(float)
rgb = a[..., :3]
sky = (np.abs(rgb - [66, 167, 209]).sum(-1) < 70) & (np.mgrid[:a.shape[0], :a.shape[1]][0] < 590)
Image.fromarray(himmel(a, sky, 585).astype(np.uint8)).save(ROT / 'avsnitt/019-rosa-favoritfarg/scener/lager/kiosk-ra-bla.png')
print('vagen-bla, vagen-bla-kulle, bla-himmel, glassbergen-vy-bla, 019 kiosk-ra-bla')
