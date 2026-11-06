import json, subprocess, sys, array
mapp = sys.argv[1]; ut = {}
for n in range(1, 11):
    try: raw = subprocess.run(['ffmpeg', '-v', 'quiet', '-i', f'{mapp}/sida-{n}.m4a', '-ac', '1', '-ar', '24000', '-f', 's16le', '-'], capture_output=True, check=True).stdout
    except subprocess.CalledProcessError: continue
    s = array.array('h', raw); f = 800   # 30 värden per s
    rms = [(sum(x * x for x in s[i:i + f]) / f) ** 0.5 for i in range(0, len(s), f)]
    top = sorted(rms)[int(len(rms) * 0.95)] or 1
    ut[str(n)] = [round(min(1, r / top), 2) for r in rms]
json.dump(ut, open(f'{mapp}/mun.json', 'w'))
