# klipp_takt.py: klipper Suno-tagningar på taktslag (librosa). Jinglar: från början, N takter, mjuk uttoning.
# Bädd: 96 slag (24 takter) från slaget närmast en starttid, så att den går runt. Sången: oförändrad (bara omkodad).
# Kör med ~/.claude/skills/ai-video/.venv/bin/python -I verktyg/klipp_takt.py <wav-mapp> <ut-mapp>
import sys, subprocess, numpy as np, librosa, os
src, ut = sys.argv[1], sys.argv[2]
def slag(f):
    y, sr = librosa.load(f, sr=22050, mono=True); _, b = librosa.beat.beat_track(y=y, sr=sr); return librosa.frames_to_time(b, sr=sr)
def ff(f, a, b, fade, dst):
    d = b - a; af = f"afade=t=in:d=0.01,afade=t=out:st={max(0, d - fade):.3f}:d={fade}"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.3f}', '-t', f'{d:.3f}', '-i', f, '-af', af, '-c:a', 'aac', '-b:a', '192k', dst], check=True)
    print(f'{os.path.basename(dst):24s} {a:7.2f} → {b:7.2f}  ({d:.2f} s)')
JINGEL = {'oppning': (3, 1.4), 'avslut': (2, 1.6), 'julafton': (4, 2.0)}   # takter, uttoning
for t in 'ab':
    for n, (tk, fade) in JINGEL.items():
        f = f'{src}/jul-{n}-{t}.wav'; b = slag(f); a = 0.0
        ff(f, a, b[min(len(b) - 1, tk * 4)] + 0.6, fade, f'{ut}/jul-{n}-{t}.m4a')   # sista slaget får klinga 0,6 s in i uttoningen
    f = f'{src}/jul-badd-{t}.wav'; b = slag(f); i = int(np.argmin(abs(b - 30)))
    ff(f, b[i], b[i + 96], 0.005, f'{ut}/jul-badd-{t}.m4a')
    f = f'{src}/jul-sang-{t}.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-c:a', 'aac', '-b:a', '192k', f'{ut}/jul-sang-{t}.m4a'], check=True); print(f'jul-sang-{t}.m4a hel')
