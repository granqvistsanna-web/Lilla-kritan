# Glasskioskens rosa vägg blir ljusblå (som i storyboarden, blue_kiosk() i ../../storyboard/bygg.py), så att kaninen syns.
# Kör: python3 bla-vagg.py  →  glasskiosken-bla.png (1376×768, samma som plattan)
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

HAR = Path(__file__).resolve().parent
src = HAR.parents[3] / "assets/bakgrunder/glasskiosken/glasskiosken.png"
hsv = np.array(Image.open(src).convert("RGB").convert("HSV")).astype(int)
h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
wall = (h > 215) & (h < 250) & (s > 90)
lab, n = ndimage.label(ndimage.binary_closing(wall, iterations=2))
for i, (cy, cx) in enumerate(ndimage.center_of_mass(wall, lab, range(1, n + 1)), 1):
    if cy < 260 and 200 < cx < 400:  # glasskulan på taket behåller sin färg
        wall[lab == i] = False
wall |= ndimage.binary_dilation(wall, iterations=4) & (h > 200) & (s > 40)
hsv[..., 0] = np.where(wall, 140, h)
hsv[..., 1] = np.where(wall, (s * 0.55).astype(int), s)
hsv[..., 2] = np.where(wall, np.minimum(v + 10, 255), v)
Image.fromarray(hsv.astype("uint8"), "HSV").convert("RGB").save(HAR / "glasskiosken-bla.png")
