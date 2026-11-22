#!/usr/bin/env python3
"""QA för line boil och avklippt röst. Anropas av qa-film.sh, går också att köra själv.
  python3 verktyg/qa-scen.py avsnitt/NNN-namn/film/avsnitt-NNN.mp4   film + avsnittets kod och rader.json
  python3 verktyg/qa-scen.py avsnitt/NNN-namn                          bara kod och rader.json
  python3 verktyg/qa-scen.py --alla                                    koden i alla avsnitt, verktyg/*.js och produktion/youtube
  python3 verktyg/qa-scen.py --pussel [filmnamn ...]                   Malins tider i pussel-prov.py (alla filmer om inga namn)
Raderna (tomt efter kolon = inget fel):
 boil kod: #boil-skala som är fast, större än 2,5 eller inte delad med kamerazoomen (regeln i CLAUDE.md).
 boil film: kanternas darr i px/s (styrka gånger takt, stilla kantpunkter, se boil_film). Hela filmens median över BOIL_FILM
   = för stark boil överallt; delar där 5 s-medianen går över BOIL_SPANN listas (introts 5 första s räknas inte).
   Kalibrerat 2026-11-22: 051 (2,5/zoom, 6/s) median 4,9 px/s, inga delar; 045 julköket (5/zoom, kanterna ändras i nästan varje ruta)
   median 14,7 px/s, delar upp till 59 px/s. Medianen fångar för stark boil i hela filmen, delarna pekar ut de värsta
   ställena. Måttet är inte px i absoluta tal, jämför bara med gränserna. Ca 30 s per 3 min film.
 röst rader: en replik (längden ur m4a-filen) som går in i nästa replik eller förbi filmens slut; "över raden" är bara info.
 röst tvärt vid klipp: tal (300–3000 Hz) som faller TVART_DB dB på 10 ms från minst −30 dB (utan avklingning) högst 0,2 s från
   ett bildklipp, som när en scen klipps mitt i en replik. Utan kravet på klipp gav ElevenLabs tvära stopp och effekter falsklarm.
   Prov 2026-11-22: repliker klippta mitt i ett ord i 051 hittades; 051 och 045 utan klippta repliker gav 2 falsklarm var utan klippkravet.
"""
import glob, json, os, re, subprocess, sys
from fractions import Fraction
import numpy as np

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BOIL_MAX = 2.5      # px i bild, CLAUDE.md
BOIL_FILM = 9       # px/s, hela filmens median (filmmåttet, se ovan)
BOIL_SPANN = 27     # px/s, 5 s-median för en del av filmen (051 har ritning/rörelse upp till 26)
TVART_DB = 15       # dB fall på 10 ms (en klippt replik över musik föll 19 dB)


# ---------- boil i koden ----------
SETTER = re.compile(r"""setAttribute\(\s*['"]scale['"]\s*,\s*([^;\n]+)""")

def boil_kod(fil):
    """Fel i en fil som en lista med korta texter."""
    s = open(fil, encoding='utf-8', errors='ignore').read()
    attr = re.findall(r'<filter[^>]*id="[^"]*boil[^"]*".*?</filter>', s, re.S)     # #boil, #boil-kort … (inte rivkant, trasig)
    attr = [a for a in attr if 'feDisplacementMap' in a]
    if not attr: return []
    fel, satt = [], []
    for rad in s.splitlines():
        m = SETTER.search(rad)
        if not m or not re.search(r'brus|boil', rad, re.I): continue
        satt.append(m.group(1))
        uttr = m.group(1).replace(' ', '')
        d = re.match(r'\(*([\d.]+)/', uttr)
        if not d: fel.append(f'fast skala {uttr[:30]}')
        elif float(d.group(1)) > BOIL_MAX: fel.append(f'{d.group(1)}/zoom > {BOIL_MAX}')
    if not satt:
        sk = [x for a in attr for x in re.findall(r'<feDisplacementMap[^>]*scale="([^"]+)"', a)]
        tal = [float(x) for x in sk if re.fullmatch(r'[\d.]+', x)]
        sk = f'{max(tal):g}' if len(tal) == len(sk) else ' '.join(sk)      # ${BOIL.skala} o.d. visas som det står
        if not tal or max(tal) > BOIL_MAX or 'zoom' in s.lower():        # utan kamerazoom räcker en fast skala på högst 2,5
            fel.append(f'fast skala {sk} (inte delad med zoom)')
    return sorted(set(fel))

def kodfiler(avsnitt=None):
    if avsnitt: m = [f'{avsnitt}/scener/**/index.html']
    else: m = ['avsnitt/*/scener/**/index.html', 'verktyg/*.js', 'produktion/youtube/**/*.html', 'produktion/youtube/**/*.js']
    filer = {f for p in m for f in glob.glob(os.path.join(REPO, p), recursive=True)}
    return sorted(f for f in filer if not re.search(r'/(aldre|gamla[^/]*|node_modules)/', f))


# ---------- boil i filmen ----------
def boil_film(film, w=640, h=360):
    """Kanternas darr i px/s (1080p) per sekund. Per bildpar: hur långt kanterna flyttar sig (skillnaden delad med
    kantens lutning, 90:e percentilen), bara kantpunkter som rör sig under ca 4 px (stilla delar, inte rörelse).
    Per sekund: summan av paren utom de 2 största (klipp). Fångar både styrka och takt (ny brusbild varje ruta i
    stället för 6/s blir också högt)."""
    import cv2
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', film, '-vf', f'scale={w}:{h}', '-pix_fmt', 'gray', '-f', 'rawvideo', '-'],
                         stdout=subprocess.PIPE)
    fps = round(Fraction(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate',
                                        '-of', 'csv=p=0', film], capture_output=True, text=True).stdout.split(',')[0].strip() or '30'))
    forra, per_s, n = None, {}, 0
    while len(b := p.stdout.read(w * h)) == w * h:
        a = cv2.GaussianBlur(np.frombuffer(b, np.uint8).reshape(h, w).astype(np.float32), (0, 0), 1.0)
        if forra is not None:
            g = np.hypot(cv2.Sobel(forra, cv2.CV_32F, 1, 0), cv2.Sobel(forra, cv2.CV_32F, 0, 1)) / 8
            r = np.abs(a - forra) / np.maximum(g, 1e-3)
            m = (g > 6) & (r < 1.3)
            per_s.setdefault(n // fps, []).append(np.percentile(r[m], 90) * 1080 / h if m.sum() > 300 else 0)
        forra, n = a, n + 1
    p.wait()
    return np.array([sum(sorted(v)[:-2]) for _, v in sorted(per_s.items())])

def boil_spann(s, grans=BOIL_SPANN, intro=5):
    """[(från, till, max)]: sekunder efter introt där 5 s-medianen ligger över gränsen."""
    med = [np.median(s[max(0, i - 2):i + 3]) for i in range(len(s))]
    ut = []
    for i in (i for i, v in enumerate(med) if v > grans and i >= intro):
        if ut and i == ut[-1][1] + 1: ut[-1] = (ut[-1][0], i, max(ut[-1][2], med[i]))
        else: ut.append((i, i, med[i]))
    return ut


# ---------- röst ----------
_langd = {}
def langd(f):
    if f not in _langd:
        r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True)
        _langd[f] = float(r.stdout.strip() or 0)
    return _langd[f]

def rostmapp(rj):
    """Röstmappen som scenkoden bredvid rader.json läser (assets/ljud/roster/<namn>/)."""
    for f in glob.glob(os.path.join(os.path.dirname(rj), '**/index.html'), recursive=True):
        m = re.search(r'assets/ljud/roster/([^/`\'"$]+)/', open(f, encoding='utf-8', errors='ignore').read())
        if m: return os.path.join(REPO, 'assets/ljud/roster', m.group(1))

def rost_rader(rj):
    d = json.load(open(rj)); RADER, ROST = d['RADER'], d.get('ROST') or []
    mapp = rostmapp(rj)
    rep, t = [], 0.0
    for r in RADER:
        for nr, o, *del_ in r.get('malin') or []:
            if nr - 1 >= len(ROST): rep.append((t + o, 0, f'#{nr}?', r['id'], r['d'], o)); continue
            rid, dur = ROST[nr - 1][0], ROST[nr - 1][1]
            f = mapp and os.path.join(mapp, rid + '.m4a')
            if f and os.path.exists(f): dur = langd(f)
            ss = del_[0] if del_ else 0                          # [nr, tid, ss, längd]: en del av repliken (045 rad 16 och 29)
            dur = del_[1] if len(del_) > 1 and del_[1] else dur - ss
            rep.append((t + o, dur, rid, r['id'], r['d'], o))
        t += r['d']
    fel = [f'{a[2]} (rad {a[3]}, {a[0]:.1f}s) slutar {a[0] + a[1] - b[0]:.2f}s inne i {b[2]}'
           for a, b in zip(sorted(rep), sorted(rep)[1:]) if a[0] + a[1] > b[0] + 0.02]
    fel += [f'{rid} (rad {rad}) går förbi filmens slut' for s, dur, rid, rad, d, o in rep if s + dur > t + 0.02]
    over = [f'{rid}({rad} +{o + dur - d:.1f}s)' for s, dur, rid, rad, d, o in rep if o + dur > d + 0.05]
    return fel, over

def tvara_slut(film, sr=16000):
    """Tider där talet faller tvärt utan avklingning."""
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', film, '-af', 'highpass=f=300,lowpass=f=3000', '-ac', '1', '-ar', str(sr),
                        '-f', 'f32le', '-'], capture_output=True)
    x = np.frombuffer(r.stdout, np.float32)
    v = sr // 200                                                # 5 ms
    x = x[:len(x) // v * v].reshape(-1, v)
    db = 10 * np.log10((x ** 2).mean(1) + 1e-12)
    ut, sist = [], -1
    for i in range(3, len(db) - 3):
        fore = db[i - 3:i].min()                                 # 15 ms jämnt tal före
        efter = db[i + 1:i + 3].max()                            # 5–15 ms efter
        if fore > -30 and fore - efter > TVART_DB and i * 0.005 - sist > 0.5:
            ut.append(i * 0.005); sist = i * 0.005
    return ut

def klipp(film, grans=0.3):
    """Tider för bildklipp (scenbyten)."""
    r = subprocess.run(['ffmpeg', '-hide_banner', '-i', film, '-vf', f"select='gt(scene,{grans})',showinfo", '-an', '-f', 'null', '-'],
                       capture_output=True, text=True)
    return [float(t) for t in re.findall(r'pts_time:([\d.]+)', r.stderr)]


# ---------- pussel ----------
def pussel(namn):
    pp = os.path.join(REPO, 'produktion/youtube/pussel/pussel-prov.py')
    if not namn:
        r = subprocess.run([sys.executable, '-c', 'import importlib.util as u,sys;s=u.spec_from_file_location("p",sys.argv[1]);'
                            'm=u.module_from_spec(s);s.loader.exec_module(m);print(*m.FILMER)', pp], capture_output=True, text=True, cwd=REPO)
        namn = r.stdout.split()
    for n in namn:
        r = subprocess.run([sys.executable, pp, n, '--tider'], capture_output=True, text=True, cwd=REPO)
        print(f' pussel {n}: {(r.stdout.strip() or r.stderr.strip()[-200:])}')


def main(a):
    if a and a[0] == '--pussel': return pussel(a[1:])
    if not a: return print(__doc__)
    film = a[0] if a[0].endswith('.mp4') else None
    m = re.search(r'(.*/avsnitt/[^/]+)', os.path.abspath(a[0]))
    avs = m and m.group(1)
    if avs or a[0] == '--alla':                                   # en film utanför avsnitt/ (mixar, shorts): bara filmkollen
        filer = kodfiler(avs)
        fel = [f'{os.path.relpath(f, REPO)}: {", ".join(e)}' for f in filer if (e := boil_kod(f))]
        print(f' boil kod ({len(filer)} filer): ' + ('\n   ' + '\n   '.join(fel) if fel else ''))
    if avs:
        for rj in sorted(glob.glob(f'{avs}/scener/**/rader.json', recursive=True)):
            f2, over = rost_rader(rj)
            print(f' röst rader {os.path.relpath(rj, avs)}: ' + '; '.join(f2) + (f'  (över raden, info: {" ".join(over)})' if over else ''))
    if film:
        b = boil_film(film); med = float(np.median(b))
        print(f' boil film (median {med:.1f} px/s, gräns {BOIL_FILM}): ' + ('FÖR STARK I HELA FILMEN ' if med > BOIL_FILM else '')
              + ' '.join(f'{s}-{e + 1}s({m:.0f})' for s, e, m in boil_spann(b)))
        kl = klipp(film)
        print(f' röst tvärt vid klipp ({len(kl)} klipp): ' + ' '.join(f'{t:.2f}s' for t in tvara_slut(film) if any(abs(t - k) < 0.2 for k in kl)))


if __name__ == '__main__':
    main(sys.argv[1:])
