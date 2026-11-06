# Räknar om mun.json ur sida-N.m4a (och godnatt-ljudet): ljudstyrkan, 30 värden per sekund, 0–1.
# Kör i repots rot: python3 produktion/youtube/shorts/godnatt/leoparden-lova/mun.py
import json, os, subprocess, sys
import numpy as np

MAPP = os.path.dirname(os.path.abspath(__file__))
GODNATT = [f'assets/ljud/effekter/bobo/bobo-{k}.m4a' for k in (1, 2, 4)]   # TILLFÄLLIGT: bobo tills ett spinn finns

def kurva(fil):
    pcm = subprocess.run(['ffmpeg', '-v', 'quiet', '-i', fil, '-ac', '1', '-ar', '24000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(pcm, np.int16).astype(float)
    rms = np.sqrt([np.mean(b ** 2) for b in np.array_split(x, max(1, len(x) // 800))])
    return [round(float(v), 2) for v in np.clip(rms / (np.percentile(rms, 90) or 1), 0, 1)]

ut = {}
for n in range(1, 11):
    f = os.path.join(MAPP, f'sida-{n}.m4a')
    if os.path.exists(f): ut[str(n)] = kurva(f)
for f in GODNATT:
    ut[os.path.basename(f)[:-4]] = kurva(f)
json.dump(ut, open(os.path.join(MAPP, 'mun.json'), 'w'))
print('mun.json:', ', '.join(ut))
