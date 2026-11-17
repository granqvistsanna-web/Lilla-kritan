"""Ljudjakten, prov 1: bokstaven A, ett ord (apa). Se format/alfabet.md.

Lyssna! Aaaa (kritan ritar A:et på ljudet) → Kan du gapa stort? Aaaa! (apan... nej, A:et gungar) + paus →
A:et flyttar upp i hörnet → Aaaa … → svansen tittar fram från vänster → Vem är det? + gisspaus →
apan skuttar in → Aaaaa … pa! → närbild: En apa! och två glada hopp → Säg du: aaapa! + paus → Ja! Apa börjar på aaa.

Apan är stillbilder ur riggen (apa-stills.mjs → apa/*.png). Rösterna: assets/ljud/roster/alfabet/a/.
Kör: python3 produktion/youtube/alfabet/alfabet-prov.py  → produktion/youtube/alfabet/alfabet-prov-1.mp4"""
import os, math, subprocess, glob
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))
UT = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1280, 720, 30
PAPPER = (251, 247, 238)
A_FARG = (217, 74, 58)
ROST = os.path.join(REPO, 'assets/ljud/roster/alfabet/a/')
EFF = os.path.join(REPO, 'assets/ljud/effekter/')
rng = np.random.default_rng(7)

def kl(a, b, x): return max(a, min(b, x))
def mjuk(x): x = kl(0, 1, x); return x * x * (3 - 2 * x)
def ut(x): x = kl(0, 1, x); return 1 - (1 - x) ** 3
def fjader(x):   # landar med en liten efterstuds
    x = kl(0, 1, x); return 1 - math.exp(-6 * x) * math.cos(9 * x)
def langd(f): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f],
                                          capture_output=True, text=True).stdout)

# ---------- tidslinjen ----------
# (start, fil, volym). Repliker i ROST, effekter i EFF (en mapp = första tagningen, annars filen).
LJUD = []
def rost(t, namn): LJUD.append((t, ROST + namn + '.m4a', 2.4)); return t + langd(ROST + namn + '.m4a')
def eff(t, namn, vol=0.5):
    p = EFF + namn
    f = sorted(glob.glob(p + '/*.m4a') + glob.glob(p + '/*.mp3'))[0] if os.path.isdir(p) else p + '.m4a'
    LJUD.append((t, f, vol))

T = {}
t = 0.6
T['lyssna'] = t;  t = rost(t, 'a-lyssna-t2')               # "Lyssna!" 0–0,8, "Aaaa" 1,44–2,0
T['rita0'] = T['lyssna'] + 1.30                             # kritan ritar på aaa
T['rita1'] = T['rita0'] + 2.4
eff(T['rita0'] - 0.1, 'krita-ritar', 1.2)
t = T['rita1'] + 0.9
T['gapa'] = t;    t = rost(t, 'a-gapa-t2')                  # "Aaaa!" 2,05–3,09
T['gapaA'] = T['gapa'] + 2.05
T['paus1'] = t;   t += 2.6                                  # barnet gapar
T['flytt'] = t;   eff(t, 'swoosh', 0.25); t += 0.9          # A:et upp i hörnet
T['ljud'] = t;    t = rost(t, 'a-ljud-t2') - 1.0            # filen har 1 s tystnad sist
t += 0.5
T['svans'] = t;   eff(t, 'prassel-buske', 0.35); t += 1.1         # svansen tittar fram
T['vem'] = t;     t = rost(t, 'a-vem-t2')
T['gissa'] = t;   t += 2.8                                  # gisspaus
T['in'] = t;      t += 1.5                                  # apan skuttar in (3 hopp)
for k in range(3): eff(T['in'] + 0.5 * k + 0.25, 'landa-mjuk', 0.35)
T['utdraget'] = t; t = rost(t, 'a-apa-utdraget-t3a') + 0.3   # "Aaaa" 0–0,86, "pa" 1,37
T['nara'] = t     # klipp till närbild
t += 0.2
T['enapa'] = t;   t = rost(t, 'a-en-apa-t2') - 0.3
T['hopp'] = t;    eff(t, 'hopp-mjuk', 0.3); eff(t + 0.55, 'landa-mjuk', 0.35); eff(t + 0.8, 'hopp-mjuk', 0.3); eff(t + 1.35, 'landa-mjuk', 0.35)
eff(t + 0.2, 'jippi', 0.5)
t += 1.9
T['bred'] = t     # klipp tillbaka
t += 0.3
T['sagdu'] = t;   t = rost(t, 'a-sag-du-apa-t2')
T['paus2'] = t;   t += 2.6                                  # barnet säger aaapa
T['ja'] = t;      t = rost(t, 'a-ja-apa-t2')                # "aaa" 2,35–2,94
T['jaA'] = T['ja'] + 2.35
eff(T['ja'] + 0.1, 'jubel', 0.25)
T['slut'] = t + 1.6
eff(T['jaA'] + 0.2, 'glitter', 0.3)
LANGD = T['slut'] + 0.6

# ---------- bilder ----------
def ladda(namn, s):
    im = Image.open(os.path.join(UT, 'apa', namn + '.png')).convert('RGBA')
    im = im.resize((int(1920 * s), int(1080 * s)), Image.LANCZOS)
    return im, (960 * s, 1000 * s)          # fötternas punkt i bilden
APA = {}
def apa(namn, s):
    k = (namn, s)
    if k not in APA: APA[k] = ladda(namn, s)
    return APA[k]

svans = Image.open(os.path.join(REPO, 'assets/karaktarer/apan-alfons/premium/cut/alfons-tail.png')).convert('RGBA')
SV_PIVOT = (720, 756)
krita = Image.open(os.path.join(REPO, 'assets/rekvisita/krita-rod/cut/krita-rod-tunn.png')).convert('RGBA')
KS = 0.3
krita = krita.resize((int(krita.width * KS), int(krita.height * KS)), Image.LANCZOS)
KRITA_ROT = krita.rotate(-130, expand=True, resample=Image.BICUBIC)   # spetsen ner till vänster
_r = math.radians(130); _dx = (743 - 377.5) * KS
KRITA_SPETS = (KRITA_ROT.width / 2 + _dx * math.cos(_r), KRITA_ROT.height / 2 + _dx * math.sin(_r))

# A:et: tre drag, kritad linje med vaxkorn
DRAG = [[(500, 575), (640, 160)], [(640, 160), (780, 575)], [(557, 425), (723, 425)]]
DRAG_T = [(0.0, 0.95), (0.95, 1.85), (1.95, 2.4)]           # inom rita0 … rita1
BRED = 44
def punkt(drag, p):
    (x0, y0), (x1, y1) = drag; return (x0 + (x1 - x0) * p, y0 + (y1 - y0) * p)
KORN = [np.clip(rng.normal(1, 0.25, (H, W)), 0, 1) for _ in range(3)]
for k in KORN: k[k < 0.55] = 0.15   # papperet skymtar
def a_mask(tl):
    """Masken (L) för A:et tl sekunder in i ritandet, och spetsens punkt."""
    m = Image.new('L', (W, H), 0); d = ImageDraw.Draw(m); spets = None
    for drag, (a, b) in zip(DRAG, DRAG_T):
        p = kl(0, 1, (tl - a) / (b - a))
        if p <= 0: continue
        n = max(2, int(p * 80))
        for i in range(n + 1):
            x, y = punkt(drag, p * i / n)
            j = math.sin(i * 1.7 + len(drag)) * 2.2
            d.ellipse([x - BRED / 2 + j, y - BRED / 2 - j, x + BRED / 2 + j, y + BRED / 2 - j], fill=255)
        if p < 1: spets = punkt(drag, p)
    if spets is None and tl < DRAG_T[-1][1]:
        # mellan dragen: spetsen glider till nästa drag
        for (a, b), drag in zip(DRAG_T, DRAG):
            if tl < a: spets = drag[0]; break
    return m.filter(ImageFilter.GaussianBlur(1.2)), spets
A_FULL = None
def a_lager(mask, f):
    arr = np.zeros((H, W, 4), np.uint8); arr[..., :3] = A_FARG
    korn = KORN[(f // 4) % 3]
    arr[..., 3] = (np.asarray(mask, np.float32) * (0.35 + 0.65 * korn)).astype(np.uint8)
    return Image.fromarray(arr, 'RGBA')
A_BBOX = (450, 110, 830, 625)

def papper():
    im = Image.new('RGB', (W, H), PAPPER)
    n = (rng.normal(0, 3.2, (H, W, 1))).astype(np.int16)
    return Image.fromarray(np.clip(np.asarray(im, np.int16) + n, 0, 255).astype(np.uint8))
PAPPER_IM = papper()

def skugga(bild, x, y, bredd, alfa=0.16):
    s = Image.new('L', (int(bredd * 1.3), int(bredd * 0.3)), 0)
    ImageDraw.Draw(s).ellipse([bredd * 0.15, bredd * 0.05, bredd * 1.15, bredd * 0.25], fill=int(255 * alfa))
    s = s.filter(ImageFilter.GaussianBlur(8))
    svart = Image.new('RGBA', s.size, (90, 60, 40, 0)); svart.putalpha(s)
    bild.alpha_composite(svart, (int(x - s.width / 2), int(y - s.height / 2)))

def rita_apa(bild, namn, x, y, s, lyft=0, sq=(1, 1)):
    im, (fx, fy) = apa(namn, s)
    if sq != (1, 1):
        im = im.resize((max(1, int(im.width * sq[0])), max(1, int(im.height * sq[1]))), Image.BILINEAR); fx *= sq[0]; fy *= sq[1]
    skugga(bild, x, y + 4, 300 * s / 0.55 * max(0.6, 1 - lyft / 400))
    bild.alpha_composite(im, (int(x - fx), int(y - fy - lyft)))

# ---------- en bildruta ----------
def ruta(f):
    tt = f / FPS
    bild = PAPPER_IM.convert('RGBA')
    global A_FULL
    nara = T['nara'] <= tt < T['bred']

    # --- A:et ---
    if tt >= T['rita0'] and not nara:
        tl = tt - T['rita0']
        if tl < 2.45:
            mask, spets = a_mask(tl)
        else:
            if A_FULL is None: A_FULL = a_mask(9)[0]
            mask, spets = A_FULL, None
        lag = a_lager(mask, f).crop(A_BBOX)
        # flytt upp till höger hörnet, och gungningar på aaa
        k = mjuk((tt - T['flytt']) / 0.8)
        sk = 1 - 0.58 * k
        cx = 640 + (1090 - 640) * k; cy = 368 + (150 - 368) * k
        puls = 0
        for t0, d in [(T['gapaA'], 1.0), (T['ljud'], 0.78), (T['utdraget'], 0.86), (T['jaA'], 0.6)]:
            if t0 <= tt < t0 + d + 0.25: puls = max(puls, math.sin(math.pi * kl(0, 1, (tt - t0) / (d + 0.25))))
        sk *= 1 + 0.09 * puls
        vick = math.sin(tt * 1.6) * 1.5 if T['paus1'] <= tt else 0
        lag = lag.resize((int(lag.width * sk), int(lag.height * (sk + 0.03 * puls))), Image.LANCZOS).rotate(vick, expand=True, resample=Image.BICUBIC)
        bild.alpha_composite(lag, (int(cx - lag.width / 2), int(cy - lag.height / 2)))
        # kritan
        if tl < 3.3:
            if spets is None:
                ut_k = ut((tl - 2.45) / 0.8); spets = (DRAG[-1][1][0] + 600 * ut_k, DRAG[-1][1][1] - 500 * ut_k)
            skak = math.sin(tt * 17 * 2 * math.pi) * 1.5
            bild.alpha_composite(KRITA_ROT, (int(spets[0] - KRITA_SPETS[0] + skak), int(spets[1] - KRITA_SPETS[1])))
    elif T['rita0'] - 0.6 <= tt < T['rita0']:   # kritan kommer in uppifrån höger
        k = 1 - ut((tt - T['rita0'] + 0.6) / 0.6); sp = (DRAG[0][0][0] + 600 * k, DRAG[0][0][1] - 500 * k)
        bild.alpha_composite(KRITA_ROT, (int(sp[0] - KRITA_SPETS[0]), int(sp[1] - KRITA_SPETS[1])))

    # --- svansen tittar fram från vänster ---
    if T['svans'] <= tt < T['in'] + 0.35 and not nara:
        k = ut((tt - T['svans']) / 0.6) * (1 - mjuk((tt - T['in']) / 0.35))
        vinkel = math.sin((tt - T['svans']) * 5) * 9 * (1.6 if T['gissa'] <= tt else 1)
        sv = svans.rotate(vinkel, center=SV_PIVOT, resample=Image.BICUBIC)
        px = -230 + 240 * k; py = 560
        bild.alpha_composite(sv, (int(px - SV_PIVOT[0]), int(py - SV_PIVOT[1])))

    # --- apan ---
    if nara:
        tl = tt - T['nara']; tl2 = tt - T['hopp']
        namn = 'glad' if tt < T['hopp'] else 'hurra'
        lyft = 0; sq = (1, 1)
        for h0 in (0.0, 0.8):
            h = (tl2 - h0) / 0.55
            if 0 <= h < 1: lyft = 70 * 4 * h * (1 - h)
            if -0.12 <= tl2 - h0 < 0: sq = (1.05, 0.95)
        rita_apa(bild, namn, 640, 690, 0.95, lyft, sq)
    elif tt >= T['in']:
        tl = tt - T['in']
        if tl < 1.5:
            k = tl / 1.5; x = -260 + (640 + 260) * k
            h = (tl % 0.5) / 0.5; lyft = 55 * 4 * h * (1 - h)
            namn = 'neutral'
        else:
            x, lyft = 640, 0
            if tt < T['sagdu']: namn = 'forvanad' if tt < T['utdraget'] + 0.9 else 'glad'
            elif tt < T['ja']: namn = 'kawaii'
            elif tt < T['jaA']: namn = 'glad'
            else: namn = 'hurra'
        # efter "aaa" i "Ja! Apa börjar på aaa": ett litet hopp
        h = (tt - T['jaA'] - 0.1) / 0.55
        if 0 <= h < 1: lyft = 50 * 4 * h * (1 - h)
        rita_apa(bild, namn, x, 640, 0.55, lyft)

    # slut: tona till papper
    if tt > T['slut']:
        k = mjuk((tt - T['slut']) / 0.6)
        bild = Image.blend(bild.convert('RGB'), PAPPER_IM, k).convert('RGBA')
    return bild.convert('RGB')

def main():
    vid = os.path.join(UT, 'alfabet-prov-1.tmp.mp4'); film = os.path.join(UT, 'alfabet-prov-1.mp4')
    n = int(LANGD * FPS)
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                          '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', vid], stdin=subprocess.PIPE)
    for f in range(n):
        p.stdin.write(ruta(f).tobytes())
        if f % 150 == 0: print(f'{f / FPS:5.1f} / {LANGD:.1f} s', flush=True)
    p.stdin.close(); p.wait()
    # ljudet
    ins, filt = ['-i', vid, '-stream_loop', '-1', '-i', os.path.join(REPO, 'assets/ljud/musik/gissa-bad.m4a')], []
    for i, (t0, fil, vol) in enumerate(LJUD):
        ins += ['-i', fil]; filt.append(f'[{i + 2}:a]volume={vol},adelay={int(t0 * 1000)}:all=1[a{i}]')
    filt.append(f'[1:a]volume=0.10,atrim=0:{LANGD:.2f},afade=t=out:st={LANGD - 1.5:.2f}:d=1.5[m]')
    filt.append(''.join(f'[a{i}]' for i in range(len(LJUD))) + f'[m]amix=inputs={len(LJUD) + 1}:normalize=0,alimiter=limit=0.95[ut]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(filt), '-map', '0:v', '-map', '[ut]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-t', f'{LANGD:.2f}', film], check=True)
    os.remove(vid); print(film)

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:   # stillbilder: python3 alfabet-prov.py 2.0 5.5 …
        for s in sys.argv[1:]: ruta(int(float(s) * FPS)).save(os.path.join(UT, f'still-{s}.png'))
        print({k: round(v, 2) for k, v in T.items()})
    else: main()
