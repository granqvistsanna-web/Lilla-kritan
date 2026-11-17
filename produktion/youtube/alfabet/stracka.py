"""Drar ut a-ljudet i Malins repliker: den jämna mitten av vokalen tidsstretchas med ffmpeg atempo (samma tonhöjd),
början och slutet av vokalen och resten av repliken lämnas orörda. Skarvarna får 15 ms övertoning.
Kör: python3 produktion/youtube/alfabet/stracka.py  → assets/ljud/roster/alfabet/a/<namn>-lang.m4a
och produktion/youtube/alfabet/provlyssna-lang.m4a (före, efter, före, efter …)."""
import os, subprocess
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))
import sys
FILM = 'film' in sys.argv[1:]   # python3 stracka.py film → filmens repliker (a-film/)
A = os.path.join(REPO, 'assets/ljud/roster/alfabet/a-film/' if FILM else 'assets/ljud/roster/alfabet/a/')

# namn: (mittens start, slut, ny längd för mitten) i sekunder, mätt ur ljudstyrkan (20 ms-rutor)
STRACK = {
    'a-ljud-t2':          (0.14, 0.48, 1.15),
    'a-lyssna-t2':        (1.42, 1.80, 1.10),
    'a-gapa-t2':          (2.06, 2.70, 1.30),
    'a-apa-utdraget-t3a': (0.16, 0.70, 1.25),
    'a-sag-du-apa-t2':    (1.94, 2.04, 0.35),
    'a-ja-apa-t2':        (2.36, 2.56, 0.80),
}

# Filmens repliker (Apans fruktfest), mätta på samma sätt. Korta vokaler (apelsin, ambulans) dras ut mer än 5 gånger,
# vilket kan låta surrigt: lyssna i provlyssna-film-lang.m4a.
STRACK_FILM = {
    'a01-t1': (1.42, 1.82, 1.10), 'a02-t1': (2.06, 2.48, 1.10), 'a04-t1': (0.06, 0.22, 0.80),
    'a15-t1': (3.18, 3.34, 0.70), 'a19-t1': (0.05, 0.11, 0.55), 'a23-t1': (0.05, 0.18, 0.70),
    'a26-t1': (0.05, 0.15, 0.60), 'a32-t1': (0.05, 0.13, 0.60), 'a35-t1': (0.05, 0.16, 0.60),
    'a40-t1': (2.96, 3.26, 1.00),
}
if FILM: STRACK = STRACK_FILM

def tempo_kedja(t):
    """atempo tar 0,5–2 per steg, så små värden blir en kedja."""
    steg = []
    while t < 0.5: steg.append('atempo=0.5'); t /= 0.5
    steg.append(f'atempo={t:.4f}'); return ','.join(steg)

def stracka(namn, s0, s1, ny):
    src, dst = A + namn + '.m4a', A + namn + '-lang.m4a'
    k = tempo_kedja((s1 - s0) / ny)
    f = (f'[0:a]atrim=0:{s0 + 0.015},asetpts=PTS-STARTPTS[a];'
         f'[0:a]atrim={s0}:{s1},asetpts=PTS-STARTPTS,{k}[b];'
         f'[0:a]atrim={s1 - 0.015},asetpts=PTS-STARTPTS[c];'
         f'[a][b]acrossfade=d=0.015:c1=tri:c2=tri[ab];[ab][c]acrossfade=d=0.015:c1=tri:c2=tri[ut]')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-filter_complex', f, '-map', '[ut]', '-c:a', 'aac', '-b:a', '160k', dst], check=True)
    return src, dst

par = [stracka(n, *v) for n, v in STRACK.items()]
ins = sum([['-i', f] for p in par for f in p], [])
n = len(ins) // 2
f = ''.join(f'[{i}:a]apad=pad_dur={1.6 if i % 2 else 0.6}[p{i}];' for i in range(n)) + ''.join(f'[p{i}]' for i in range(n)) + f'concat=n={n}:v=0:a=1[ut]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', f, '-map', '[ut]', '-c:a', 'aac', '-b:a', '128k',
                os.path.join(REPO, 'produktion/youtube/alfabet/provlyssna-film-lang.m4a' if FILM else 'produktion/youtube/alfabet/provlyssna-lang.m4a')], check=True)
for (src, dst) in par: print(os.path.basename(dst))
