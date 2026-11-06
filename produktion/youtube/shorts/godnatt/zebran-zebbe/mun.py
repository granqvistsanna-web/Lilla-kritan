# mun.json: munnens rörelse ur inläsningen (ljudstyrkan, 30 värden per s, 0–1). Kör i repots rot efter nya sida-N.m4a:
#   python3 produktion/youtube/shorts/godnatt/zebran-zebbe/mun.py
# Godnattljudets tagningar (GODNATT_LJUD i index.html) räknas med, så att munnen följer dem också.
import json, pathlib, subprocess, numpy as np
MAPP = pathlib.Path(__file__).parent
LJUD = 'bobo'   # samma som GODNATT_LJUD i index.html (TILLFÄLLIGT, tills zebrans frust finns)

def kurva(fil):
    raw = subprocess.run(['ffmpeg', '-v', 'quiet', '-i', str(fil), '-ac', '1', '-ar', '24000', '-f', 's16le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, np.int16) / 32768
    r = np.sqrt([np.mean(a[i:i + 800] ** 2) for i in range(0, len(a), 800)])
    return np.clip(r / np.percentile(r, 95), 0, 1).round(2).tolist()

mun = {str(n): kurva(f) for n in range(1, 13) if (f := MAPP / f'sida-{n}.m4a').exists()}
mun |= {f.stem: kurva(f) for f in sorted(pathlib.Path(f'assets/ljud/effekter/{LJUD}').glob('*.m4a'))}
(MAPP / 'mun.json').write_text(json.dumps(mun))
print(', '.join(f'{k}: {len(v)}' for k, v in mun.items()))
