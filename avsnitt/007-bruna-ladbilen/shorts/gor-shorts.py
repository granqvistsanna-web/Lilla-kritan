# Shorts för avsnitt 007, som 006:s: kvadratiska 1080×1080, en 4:3-bild (eller hela 16:9-bilden) ur slutklippet (film/avsnitt-007.mp4) med en suddig,
# förstorad kopia ovanför och under, 0,3 s toning in och ut, och undertexter som SRT ur rader.txt (avsnittstid = sångtid + 11).
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp; mp4 utanför git, SRT i git)
import re, subprocess, sys, pathlib
os = pathlib.Path(__file__).resolve().parent
FILM, AV = os.parent / 'film/avsnitt-007.mp4', 11.0
# nr, namn, start, slut (avsnittstid, s), utsnittets vänsterkant och bredd i 1920-bilden (240, 1440 = 4:3 i mitten; 0, 1920 = hela
# bilden, för rutschbanan som fyller hela bredden)
SHORTS = [
    (1, 'vad-kan-det-vara-lastbil', 11.0, 34.0, 240, 1440),
    (2, 'rutscha-ner-i-kolasas', 55.0, 84.9, 0, 1920),
    (3, 'vem-kan-hjalpa', 143.3, 168.4, 240, 1440),
    (4, 'danspaus', 168.4, 186.6, 240, 1440),
]
tid = lambda s: sum(float(x) * 60 ** i for i, x in enumerate(reversed(s.split(':'))))
rader = []
for m in re.finditer(r'^(\d+:\d+(?:\.\d+)?)≈?\s+(.+)$', (os.parent / 'rader.txt').read_text(), re.M):
    text = re.sub(r'\((\d+:\d+(?:\.\d+)?) ', '(', m[2]).strip()   # "(1:45.1 Brun, brun!)" → "(Brun, brun!)"
    rader.append((tid(m[1]) + AV, text))
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

for nr, namn, a, b, x, w in SHORTS:
    if len(sys.argv) > 1 and str(nr) not in sys.argv[1:]: continue
    ut = os / f'{nr:02}-{namn}'
    block = []
    for i, (t, text) in enumerate(rader):
        slut = min(rader[i + 1][0] if i + 1 < len(rader) else b, b)
        if text.startswith('(instrumental') or text == 'slut' or slut - max(t, a) < 0.5 or t >= b: continue   # inte en rest av raden före
        block.append((max(t, a) - a, slut - a, text))
    ut.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(s)} --> {srt_tid(e)}\n{tx}\n\n' for i, (s, e, tx) in enumerate(block, 1)))
    d = b - a
    h = round(1080 * 1080 / w / 2) * 2
    fk = (f'[0:v]crop={w}:1080:{x}:0,split[v][b];[b]scale=-2:1080,crop=1080:1080,gblur=sigma=40,eq=brightness=0.04[bg];'
          f'[v]scale=1080:{h}[fg];[bg][fg]overlay=0:{(1080 - h) // 2},fade=in:d=0.3,fade=out:st={d - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
          f'[0:a]afade=in:d=0.3,afade=out:st={d - 0.3:.2f}:d=0.3[a]')
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(a), '-t', f'{d:.2f}', '-i', FILM, '-filter_complex', fk,
                    '-map', '[ut]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-r', '30', '-c:a', 'aac', '-b:a', '192k',
                    ut.with_suffix('.mp4')], check=True)
    print(ut.with_suffix('.mp4').name, f'{d:.1f} s', len(block), 'rader')
