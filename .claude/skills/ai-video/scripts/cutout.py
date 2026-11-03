# Cut a character on white out to a transparent PNG, keeping a thin white sticker rim.
#   cutout.py in.png out.png [rim_px=8] [max_hole_px=20000]
# Everything not near-white is the character; grow it by rim_px (that's the white rim), fill small holes
# (paper specks, eye whites, badges) but keep big enclosed gaps (inside a bucket handle) see-through, feather 1px.
import subprocess, sys
import numpy as np
from scipy import ndimage

src, dst = sys.argv[1], sys.argv[2]
rim = int(sys.argv[3]) if len(sys.argv) > 3 else 8
max_hole = int(sys.argv[4]) if len(sys.argv) > 4 else 20000
w, h = map(int, subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
                                '-of', 'csv=p=0', src], capture_output=True, text=True, check=True).stdout.strip().split(','))
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'], capture_output=True, check=True).stdout
img = np.frombuffer(raw, np.uint8).reshape(h, w, 4).copy()

ink = img[..., :3].min(axis=2) < 225
ink = ndimage.binary_opening(ink, iterations=1)  # drop paper-grain specks
mask = ndimage.binary_dilation(ink, iterations=rim)
holes, n = ndimage.label(ndimage.binary_fill_holes(mask) & ~mask)
sizes = ndimage.sum(np.ones_like(holes), holes, range(1, n + 1))
mask |= np.isin(holes, 1 + np.flatnonzero(sizes < max_hole))
img[..., 3] = (ndimage.gaussian_filter(mask.astype(float), 1) * 255).astype(np.uint8)

subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{w}x{h}', '-i', '-', dst],
               input=img.tobytes(), check=True)
