"""Discots ljusa bruna plåt (Sanna 2026-11-06, grovklipp tagning 5 #14: "kopiera 005 och 006 i brun version"):
006:s disco-prickar.png omfärgad till beige/ljusbrunt med den första bruna_discot() i bygg.py (nyans 20, mättnad ×1,05,
värde ×0,84, glittret vitt). Ligger här och inte i lager/ eftersom lager/disco-prickar.png (mörk choklad) görs av bygg.py.
    python3 gor-plat.py   → disco-beige.png"""
from pathlib import Path
import numpy as np
from PIL import Image

ROT = Path(__file__).resolve().parents[4]
hsv = np.asarray(Image.open(ROT / "avsnitt/006-orange-baten/scener/lager/disco-prickar.png").convert("RGB").convert("HSV"),
                 dtype=np.float32).copy()
farg = hsv[..., 1] > 25
hsv[..., 0] = np.where(farg, 20, hsv[..., 0])
hsv[..., 1] = np.where(farg, np.minimum(255, hsv[..., 1] * 1.05), hsv[..., 1])
hsv[..., 2] = np.where(farg, hsv[..., 2] * 0.84, hsv[..., 2])
Image.merge("HSV", [Image.fromarray(hsv[..., i].astype(np.uint8)) for i in range(3)]).convert("RGB") \
    .resize((1376, 768)).save(Path(__file__).with_name("disco-beige.png"))
