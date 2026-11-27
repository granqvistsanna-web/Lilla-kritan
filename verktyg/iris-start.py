#!/usr/bin/env python3
"""Var börjar kritirisen? Skriver tiden (s) för sista bildrutan före irisen, eller inget om filmen inte slutar med iris.
  python3 verktyg/iris-start.py <film.mp4> [slut-s]   slut: där det spelade slutar (till), annars filmens slut
Irisen är en krympande krit-cirkel mot svart (Y under 34: lokala filmer har svart på 16, molnets tv-omfång på 30): alla fyra hörnen blir svarta och förblir det till slutet. Strax före syns
cirkelns ljusa kant i hörnen, så snittet läggs på bildrutan före den första som avviker från scenen (Sanna 27/11, J11)."""
import subprocess, sys, re, statistics
film = sys.argv[1]
fps = eval(subprocess.check_output(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', film], text=True).strip().split(',')[0].split('\n')[0])
slut = float(sys.argv[2]) if len(sys.argv) > 2 else float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', film], text=True))
start = max(0, slut - 10)
def horn(x, y):   # YAVG per bildruta i ett hörn 24×24
    ut = subprocess.run(['ffmpeg', '-nostdin', '-ss', f'{start}', '-i', film, '-t', f'{slut - start}', '-an', '-vf',
        f'crop=24:24:{x}:{y},signalstats,metadata=print:key=lavfi.signalstats.YAVG', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return [float(v) for v in re.findall(r'YAVG=([\d.]+)', ut)]
forsta = []; n = 0
for x, y in (('0', '0'), ('iw-24', '0'), ('0', 'ih-24'), ('iw-24', 'ih-24')):
    Y = horn(x, y); n = len(Y)
    if len(Y) < 40 or Y[-1] >= 34: sys.exit(0)   # hörnet är inte svart i slutet: ingen iris
    b = len(Y) - 1
    while b > 0 and Y[b - 1] < 34: b -= 1        # svarta svansen börjar vid b
    if b < 31: sys.exit(0)
    med = statistics.median(Y[b - 31:b - 6])
    while b > 0 and abs(Y[b - 1] - med) > 8: b -= 1   # irisens kant före det svarta
    forsta.append(b)
k = min(forsta)   # första bildrutan (i klippet) som inte är scenen
if (n - k) / fps < 0.2: sys.exit(0)
print(f'{start + k / fps:.3f}')   # = till: sista spelade bildrutan är k-1
