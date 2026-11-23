#!/usr/bin/env python3
"""Mäter en film för regelboken (format/regelbok.md). Bara siffror kommer ut: inga bilder, inga texter.

  python3 verktyg/mat-video.py film.mp4 [film2.mp4 …] [--sprak sv|en|auto] [--json ut.jsonl] [--utan-tal] [--modell ggml.bin]

Mäter
  bildbyten   hårda klipp (ett bildrutehopp) och övertoningar (mellanbilderna är en blandning av före och efter), bildlängder
  kamera      panorering och zoom per sekund (optiskt flöde, affin modell), andel stilla bilder, in- mot utzoom
  färg        median ljushet och mättnad (HSV 0–255) och sex huvudfärger (k-means) med andel
  tal         ord/min (whisper-cli, ordtider), pauser mellan ord, första ordet (introts längd), upprepning (4-ord-följder)
  tystnad     ordpaus före och efter varje bildbyte, andel bildbyten som ligger i en paus, ljudet under pauserna
  ljud        LUFS, true peak, LRA (ffmpeg ebur128, samma som qa-film.sh), andel tyst tid
Gränserna nedan är satta på de 14 filmerna i regelboken (november 2026). Figurer i bild räknas för hand på kontaktark.
"""
import argparse, json, os, re, subprocess, tempfile, wave
import numpy as np
import cv2

W, H = 160, 90          # analysbild
SW, SH = 64, 36         # liten bild för klipp och övertoningar
KLIPP_PD = 28           # medelpixelhopp (0–255) för ett hårt klipp …
KLIPP_GGR = 3.0         # … och så många gånger grannarnas median
OVER_DAB = 22           # före och efter måste skilja minst så här mycket för en övertoning
OVER_RES = 0.25         # mittbilden får avvika högst så här mycket från blandningen (andel av skillnaden)
MIN_BILD = 0.3          # bildbyten närmare än så räknas som ett
STILLA = 1.0            # %/s: under det står kameran still (både panorering och zoom)
AKNING = 8.0            # %/s: över det i minst 0,3 s är en kameraåkning till en ny vy
TYST_DB = -45           # dBFS: tyst


def kor(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.stdout + r.stderr


def fps_och_langd(f):
    r = kor(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate',
             '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).split()
    a, b = r[0].strip(',').split('/')
    return float(a) / float(b), float(r[-1])


def bildrutor(f):
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', f, '-an', '-vf', f'scale={W}:{H}:flags=area',
                          '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    n = W * H * 3
    while True:
        b = p.stdout.read(n)
        if len(b) < n:
            break
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3)
    p.wait()


def kamera(a, b):
    """Panorering (bildmittens förflyttning, andel av bredden) och skala mellan två gråbilder, eller None."""
    p0 = cv2.goodFeaturesToTrack(a, 200, 0.01, 4)
    if p0 is None or len(p0) < 12:
        return None
    p1, st, _ = cv2.calcOpticalFlowPyrLK(a, b, p0, None)
    ok = st.ravel() == 1
    if ok.sum() < 12:
        return None
    M, inl = cv2.estimateAffinePartial2D(p0[ok], p1[ok], method=cv2.RANSAC, ransacReprojThreshold=1.0)
    if M is None or inl.sum() < 10:
        return None
    s = float(np.hypot(M[0, 0], M[1, 0]))
    cx, cy = W / 2, H / 2
    dx, dy = M[0, 0] * cx + M[0, 1] * cy + M[0, 2] - cx, M[1, 0] * cx + M[1, 1] * cy + M[1, 2] - cy
    return float(np.hypot(dx, dy)) / W, s - 1


def bild(f):
    fps, langd = fps_och_langd(f)
    steg = max(1, round(fps / 10))
    sma, pd, rorelse, prov = [], [0.0], [], []
    forra_gra = None
    for i, r in enumerate(bildrutor(f)):
        s = cv2.resize(r, (SW, SH), interpolation=cv2.INTER_AREA).astype(np.float32)
        if sma:
            pd.append(float(np.abs(s - sma[-1]).mean()))
        sma.append(s)
        if i % steg == 0:
            g = cv2.cvtColor(r, cv2.COLOR_RGB2GRAY)
            if forra_gra is not None:
                k = kamera(forra_gra, g)
                if k:
                    rorelse.append((i / fps, k[0] * 100 * fps / steg, k[1] * 100 * fps / steg))
            forra_gra = g
        if i % round(fps) == 0:
            prov.append(cv2.resize(r, (80, 45), interpolation=cv2.INTER_AREA))
    pd = np.array(pd)
    n = len(sma)

    # hårda klipp: ett ensamt hopp mellan två bildrutor
    klipp = []
    for i in range(1, n):
        grannar = np.r_[pd[max(1, i - 6):i], pd[i + 1:i + 7]]
        if pd[i] > KLIPP_PD and pd[i] > KLIPP_GGR * (np.median(grannar) if len(grannar) else 0) + 4:
            klipp.append(i)
    ar_klipp = np.zeros(n + 1, bool)
    ar_klipp[klipp] = True

    # övertoningar: mittbilden är en blandning av bilden före och bilden efter
    over = []
    for i in range(2, n - 2, 2):
        for K in sorted({max(2, round(fps * x)) for x in (0.15, 0.3, 0.6)}):
            if i - K < 0 or i + K >= n or ar_klipp[i - K + 1:i + K + 1].any():
                continue
            A, B, M_, Q = sma[i - K], sma[i + K], sma[i], sma[i - K // 2]
            dab = float(np.abs(A - B).mean())
            if dab < OVER_DAB or pd[i - K + 1:i + K + 1].max() > 0.5 * dab:
                continue
            if (np.abs(M_ - (A + B) / 2).mean() / dab < OVER_RES and
                    np.abs(Q - (0.75 * A + 0.25 * B)).mean() / dab < OVER_RES + 0.05):
                over.append(i)
                break
    # slå ihop markeringar som hör till samma övertoning
    over_h = []
    for i in over:
        if over_h and i - over_h[-1][-1] <= fps * 0.5:
            over_h[-1].append(i)
        else:
            over_h.append([i])
    over_t = [float(np.mean(g)) / fps for g in over_h]

    # bildbyten och bildlängder
    byten = []
    for t, typ in sorted([(i / fps, 'k') for i in klipp] + [(t, 'o') for t in over_t]):
        if not byten or t - byten[-1][0] >= MIN_BILD:
            byten.append((t, typ))
    t_byten = [t for t, _ in byten]
    grans = [0.0] + t_byten + [n / fps]
    bilder = np.diff(grans)

    # kameraåkningar: minst 0,3 s där kameran far snabbare än AKNING %/s (zoom eller panorering) – ett vybyte utan klipp
    akn, kor_ = [], []
    for t, p, z in rorelse:
        snabb = max(p, abs(z)) > AKNING and not any(abs(t - b) < 0.15 for b in t_byten)
        if snabb and kor_ and t - kor_[-1] < 0.25:
            kor_.append(t)
        else:
            if len(kor_) >= 3:
                akn.append((kor_[0], kor_[-1]))
            kor_ = [t] if snabb else []
    if len(kor_) >= 3:
        akn.append((kor_[0], kor_[-1]))
    vyer = np.diff([0.0] + sorted(t_byten + [(a + b) / 2 for a, b in akn]) + [n / fps])

    # kamera per bild (prov som korsar ett bildbyte räknas inte)
    per_bild = []
    for a, b in zip(grans[:-1], grans[1:]):
        r = [(p, z) for t, p, z in rorelse if a + 0.2 < t < b - 0.05]
        if len(r) >= 3:
            p, z = np.array(r).T
            per_bild.append((float(np.median(p)), float(np.median(z))))
    pb = np.array(per_bild) if per_bild else np.zeros((0, 2))
    stilla = (pb[:, 0] < STILLA) & (np.abs(pb[:, 1]) < STILLA)
    rorlig_zoom = pb[np.abs(pb[:, 1]) >= STILLA, 1]

    # färg
    px = np.concatenate([p.reshape(-1, 3) for p in prov]).astype(np.float32)
    hsv = cv2.cvtColor(px.reshape(-1, 1, 3).astype(np.uint8), cv2.COLOR_RGB2HSV).reshape(-1, 3)
    urval = px[np.random.default_rng(1).choice(len(px), min(30000, len(px)), replace=False)]
    _, etik, cent = cv2.kmeans(urval, 6, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.5), 3,
                               cv2.KMEANS_PP_CENTERS)
    andel = np.bincount(etik.ravel(), minlength=6) / len(etik)
    farger = [('#%02x%02x%02x' % tuple(int(v) for v in cent[k]), round(float(andel[k]) * 100))
              for k in np.argsort(-andel)]

    return dict(
        langd_s=round(langd, 1), fps=round(fps, 2),
        bildbyten=len(byten), hårda_klipp=sum(1 for _, t in byten if t == 'k'),
        overtoningar=sum(1 for _, t in byten if t == 'o'),
        byten_per_min=round(len(byten) / langd * 60, 1),
        bild_median_s=round(float(np.median(bilder)), 1),
        bild_p10_s=round(float(np.percentile(bilder, 10)), 1), bild_p90_s=round(float(np.percentile(bilder, 90)), 1),
        bild_langsta_s=round(float(bilder.max()), 1),
        kameraakningar=len(akn), akning_median_s=round(float(np.median([b - a + 0.1 for a, b in akn])), 1) if akn else None,
        vyer=len(vyer), vy_median_s=round(float(np.median(vyer)), 1),
        kamera_stilla_andel=round(float(stilla.mean()) * 100) if len(pb) else None,
        kamera_pan_median=round(float(np.median(pb[:, 0])), 1) if len(pb) else None,
        kamera_zoom_median=round(float(np.median(np.abs(pb[:, 1]))), 1) if len(pb) else None,
        zoom_in_andel=round(float((rorlig_zoom > 0).mean()) * 100) if len(rorlig_zoom) else None,
        ljushet_median=int(np.median(hsv[:, 2])), mattnad_median=int(np.median(hsv[:, 1])),
        farger=farger,
    ), t_byten


def ljud(f, wav):
    r = kor(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'])
    summ = r[r.rfind('Summary:'):]
    hitta = lambda k: float(re.search(k + r':\s+(-?[\d.]+)', summ).group(1))
    with wave.open(wav) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    v = 800  # 50 ms vid 16 kHz
    rms = np.sqrt((x[:len(x) // v * v].reshape(-1, v) ** 2).mean(1) + 1e-10)
    db = 20 * np.log10(rms)
    tyst = db < TYST_DB
    langsta = max((len(m.group()) for m in re.finditer('1+', ''.join('1' if t else '0' for t in tyst))), default=0)
    return dict(lufs=hitta('I'), lra=hitta('LRA'), true_peak=hitta('Peak'),
                tyst_andel=round(float(tyst.mean()) * 100, 1), tyst_langsta_s=round(langsta * 0.05, 1)), db


def tal(wav, sprak, modell, langd, t_byten, db):
    with tempfile.TemporaryDirectory() as d:
        kor(['whisper-cli', '-m', modell, '-f', wav, '-l', sprak, '-ml', '1', '-sow', '-sns', '-np', '-oj',
             '-of', f'{d}/u'])
        seg = json.load(open(f'{d}/u.json'))['transcription']
    ord_ = [(s['offsets']['from'] / 1000, s['offsets']['to'] / 1000, s['text'].strip().lower()) for s in seg]
    ord_ = [(a, b, re.sub(r'[^\w\-]', '', t)) for a, b, t in ord_ if re.search(r'\w', t) and not t[:1] in '[(*♪']
    if len(ord_) < 5:
        return dict(ord=len(ord_))
    st = np.array([a for a, _, _ in ord_]); sl = np.array([b for _, b, _ in ord_])
    gap = st[1:] - sl[:-1]
    pauser = gap[gap >= 0.3]
    # fraser: ord med mindre än 1 s emellan
    talad = 0.0; a = st[0]
    for i in range(1, len(st)):
        if gap[i - 1] >= 1.0:
            talad += sl[i - 1] - a; a = st[i]
    talad += sl[-1] - a
    # upprepning: andel ord som ingår i en 4-ordsföljd som förekommer minst två gånger
    w = [t for _, _, t in ord_]
    g4 = [tuple(w[i:i + 4]) for i in range(len(w) - 3)]
    from collections import Counter
    c = Counter(g4)
    upprep = np.zeros(len(w), bool)
    for i, g in enumerate(g4):
        if c[g] >= 2:
            upprep[i:i + 4] = True
    # ljud under pauser mot ljud under ord
    idx = lambda t: min(len(db) - 1, int(t / 0.05))
    i_ord = np.concatenate([np.arange(idx(a), idx(b) + 1) for a, b, _ in ord_])
    i_paus = [np.arange(idx(sl[i]) + 2, idx(st[i + 1]) - 1) for i in range(len(gap)) if gap[i] >= 1.0]
    i_paus = np.concatenate(i_paus) if i_paus else np.array([], int)
    # bildbyten mot ord
    efter, i_paus_n = [], 0
    for t in t_byten:
        nasta = st[st >= t]
        if len(nasta):
            efter.append(nasta[0] - t)
        inne = ((st <= t) & (sl >= t)).any()
        fore = sl[sl <= t]; nst = st[st >= t]
        if not inne and len(fore) and len(nst) and nst[0] - fore[-1] >= 0.3:
            i_paus_n += 1
    return dict(
        ord=len(ord_), ord_per_min=round(len(ord_) / langd * 60),
        ord_per_talad_min=round(len(ord_) / max(talad, 1) * 60),
        talad_andel=round(talad / langd * 100),
        forsta_ord_s=round(float(st[0]), 1),
        pauser_per_min=round(len(pauser) / langd * 60, 1),
        paus_median_s=round(float(np.median(pauser)), 2) if len(pauser) else 0,
        pauser_over_2s=int((gap >= 2).sum()), pauser_over_4s=int((gap >= 4).sum()),
        upprepning_andel=round(float(upprep.mean()) * 100),
        mest_upprepad_4ord=max(c.values()),
        samma_ord_direkt_andel=round(sum(a == b for a, b in zip(w, w[1:])) / len(w) * 100),  # "tut, tut, tut"
        ljud_under_pauser_db=round(float(np.median(db[i_paus]) - np.median(db[i_ord])), 1) if len(i_paus) else None,
        ord_efter_bildbyte_median_s=round(float(np.median(efter)), 2) if efter else None,
        bildbyten_i_paus_andel=round(i_paus_n / len(t_byten) * 100) if t_byten else None,
    )


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument('filmer', nargs='+')
    ap.add_argument('--sprak', default='auto')
    ap.add_argument('--json')
    ap.add_argument('--utan-tal', action='store_true')
    ap.add_argument('--modell', default=os.path.expanduser('~/.flow-mcp/models/ggml-large-v3-turbo-q5_0.bin'))
    a = ap.parse_args()
    for f in a.filmer:
        b, t_byten = bild(f)
        with tempfile.TemporaryDirectory() as d:
            wav = f'{d}/a.wav'
            kor(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', '16000', wav])
            l, db = ljud(f, wav)
            t = {} if a.utan_tal else tal(wav, a.sprak, a.modell, b['langd_s'], t_byten, db)
        rad = dict(film=os.path.basename(f), **b, **l, **t)
        print(json.dumps(rad, ensure_ascii=False))
        if a.json:
            with open(a.json, 'a') as u:
                u.write(json.dumps(rad, ensure_ascii=False) + '\n')


if __name__ == '__main__':
    main()
