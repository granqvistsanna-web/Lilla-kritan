# Bondgårdens gula vägg får en stark kritfärg; höet, dörren och golvet behåller sina. Krittexturen följer med.
# Kör: python3 ny-vagg.py [turkos|bla|gron]  →  bondgarden-<färg>.png (1376×768, samma som plattan)
import sys
from pathlib import Path
import numpy as np
from PIL import Image

HAR = Path(__file__).resolve().parent
src = HAR.parents[3] / "assets/bakgrunder/bondgarden/bondgarden.png"
FARG = {"turkos": (124, 0.85, 0.80), "bla": (149, 0.80, 0.88), "gron": (78, 0.75, 0.74)}   # PIL-hue 0..255, S- och V-faktor
namn = sys.argv[1] if len(sys.argv) > 1 else "turkos"
hue, sk, vk = FARG[namn]
hsv = np.array(Image.open(src).convert("RGB").convert("HSV")).astype(int)
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
y, x = np.mgrid[:h.shape[0], :h.shape[1]]
vagg = (h >= 29) & (h <= 42) & (s > 60) & (y < 551)
ho = (x > 1165) & (y > 450)                                  # höet: bara ren väggul räknas som vägg här
vagg &= ~ho | (h >= 34)
hsv[..., 0] = np.where(vagg, hue, h)
hsv[..., 1] = np.where(vagg, (s * sk).astype(int), s)
hsv[..., 2] = np.where(vagg, (v * vk).astype(int), v)
Image.fromarray(hsv.clip(0, 255).astype("uint8"), mode="HSV", ).convert("RGB").save(HAR / f"bondgarden-{namn}.png")
