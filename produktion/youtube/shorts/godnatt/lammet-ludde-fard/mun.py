# Räknar om mun.json ur sida-N.m4a i den här mappen: ljudstyrkan, 30 värden per sekund, 0–1.
# Kör efter varje ny inläsning: python3 produktion/youtube/shorts/godnatt/lammet-ludde-fard/mun.py
import json, subprocess, pathlib, numpy as np

mapp = pathlib.Path(__file__).parent
mun = {}
for f in sorted(mapp.glob('sida-*.m4a')):
    ljud = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(f), '-ac', '1', '-ar', '48000', '-f', 'f32le', '-'], capture_output=True).stdout
    a = np.frombuffer(ljud, np.float32)
    rms = np.array([np.sqrt(np.mean(a[i:i + 1600] ** 2)) for i in range(0, len(a), 1600)])
    tal = rms[rms > rms.max() * 0.05]
    mun[f.stem.split('-')[1]] = [round(float(v), 2) for v in np.clip(rms / np.percentile(tal, 80), 0, 1)]
(mapp / 'mun.json').write_text(json.dumps(mun))
print({k: len(v) for k, v in mun.items()})
