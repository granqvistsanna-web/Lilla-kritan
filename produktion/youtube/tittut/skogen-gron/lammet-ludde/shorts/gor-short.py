# Short för Tittut lammet vid granen (format/tittut.md: intro, figuren kommer in och hälsar, runda 1, hej då, högst 40 s), klippt ur den långa
# filmen (../lammet-ludde.mp4): delarna nedan efter varandra med raka klipp (ljudet tonas 0,05 s vid skarvarna), stående 1080×1920 med ett
# 4:3-utsnitt i mitten och en suddig, förstorad kopia ovanför och under, 0,3 s toning in och ut, och undertexter som SRT.
# Tiderna är filmens egna (window.TIDER i index.html: hej, rundor[0].ga–slut, mitt, vinka2). Kör: python3 shorts/gor-short.py
import subprocess, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, UT = HAR.parent / 'lammet-ludde.mp4', HAR / 'tittut-lammet'
X, W = 0, 1440   # utsnittets vänsterkant och bredd i 1920-bilden (4:3, med gömstället i runda 1)
DELAR = [(0, 13.0), (18.4, 36.0), (119.9, 125.6)]   # (start, slut) i filmen
RADER = [(0.8, 1.2, 'Tittut!'), (11.0, 2.0, 'Hej lammet!'), (22.98, 1.6, 'Borta!'), (24.8, 2.0, 'Var ska du gömma dig?'),
         (30.84, 2.5, 'Tittut! Där är du!'), (120.1, 2.2, 'Nu är leken slut.'), (122.74, 2.6, 'Hej då! Vi leker igen snart!')]   # (filmtid, längd, text)

def kort(t):   # filmtid → tid i shorten
    s = 0
    for a, b in DELAR:
        if a <= t < b: return s + t - a
        s += b - a
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'
D = sum(b - a for a, b in DELAR)
UT.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(kort(t))} --> {srt_tid(kort(t) + l)}\n{tx}\n\n' for i, (t, l, tx) in enumerate(RADER, 1)))
h = round(1080 * 1080 / W / 2) * 2
fk = ''.join(f'[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=in:d=0.05,afade=out:st={b - a - 0.05:.2f}:d=0.05[a{i}];'
             for i, (a, b) in enumerate(DELAR))
fk += ''.join(f'[v{i}][a{i}]' for i in range(len(DELAR))) + f'concat=n={len(DELAR)}:v=1:a=1[v][a0];'
fk += (f'[v]crop={W}:1080:{X}:0,split[f][b];[b]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=0.04[bg];'
       f'[f]scale=1080:{h}[fg];[bg][fg]overlay=0:{(1920 - h) // 2},fade=in:d=0.3,fade=out:st={D - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
       f'[a0]afade=in:d=0.3,afade=out:st={D - 0.3:.2f}:d=0.3[a]')
subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-i', FILM, '-filter_complex', fk, '-map', '[ut]', '-map', '[a]',
                '-c:v', 'libx264', '-crf', '18', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', UT.with_suffix('.mp4')], check=True)
print(UT.with_suffix('.mp4').name, f'{D:.1f} s', len(RADER), 'rader')
