# Shorts för avsnitt 014 Gröna sången: stående 1080×1920 som 019:s, hela 16:9-bilden i mitten med en suddig, förstorad kopia ovanför och under,
# 0,3 s toning in och ut, och undertexter som SRT. Avsnittstid = sångtid + 11,0 (uppmätt mot sang.m4a i film/avsnitt-014.mp4 10 nov).
# Inget klipp tar med ritintrot, där sången sjunger "vad kan det vara?".
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp)
import subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, AV = HAR.parent / 'film/avsnitt-014.mp4', 11.0
X, W = 0, 1920
SHORTS = [
    (1, 'gront-betyder-kor', 27.4, 61.4, [
        (27.8, 'Leoparden kör sin gröna traktor,'), (30.6, 'putt, putt, putt – på vägen här!'), (33.2, 'Leoparden letar grönt nu,'),
        (35.8, 'leta med – jag och du!'), (39.1, 'Grönt! Grönt! Grönt!'), (41.6, 'Grönt betyder kör!'), (43.6, 'Grönt! Grönt!'),
        (47.3, 'Grön som en liten ärta!'), (50.2, 'Putt, putt, tut, tut – vad är grönt?'), (52.7, 'Titta ut!'),
        (53.5, 'Vad är grönt? Vad är grönt?'), (56.0, 'Titta där!'), (57.4, 'Grodan är grön –'), (58.7, 'hopp, hopp, hopp!')]),
    (2, 'kycklingen-hjalper', 125.5, 161.4, [
        (126.0, 'Oj, oj! Ärtan hoppar!'), (128.9, '(Åh nej!)'), (129.9, 'Rull, rull, rull – in under bänken …'),
        (132.8, 'En, två – men vi är tre!'), (134.7, '(Åh nej!)'), (136.2, 'Leoparden är ledsen – snyft, snyft.'),
        (138.7, 'Vem kan hjälpa?'), (141.6, 'Tick, tack …'), (144.2, 'Kycklingen!'), (145.9, 'Hoppar ner – oj, hon trillar!'),
        (147.9, 'Upp igen – pick, pick, pick!'), (150.0, 'Här är ärtan – tack, tack, tack!'), (152.1, 'En ärta var – till alla tre!'),
        (153.7, 'Mums, mums, mums – hurra!'), (156.2, 'Grönt! Nu kör vi!'), (159.7, 'Grönt! Nu kör vi!')]),
    (3, 'danspaus', 161.4, 188.0, [
        (161.5, 'Danspaus! Danspaus!'), (163.4, 'Hoppa, hoppa!'), (164.9, 'Vicka, vicka!'), (166.4, 'Flyga runt!'),
        (167.7, 'Alla dansar – grön dans!'), (170.6, 'Grodan – grön!'), (173.1, 'Lampan – grön!'),
        (176.0, 'Jacka, ärtor, traktor – grönt!'), (178.5, 'Grönt, grönt, grönt …'), (180.3, 'Grönt betyder kör,'),
        (181.1, 'grön som en liten ärta!'), (185.0, 'Hej då, hej då – putt, putt!')]),
]
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

for nr, namn, a, b, rader in SHORTS:
    if len(sys.argv) > 1 and str(nr) not in sys.argv[1:]: continue
    ut, d = HAR / f'{nr:02}-{namn}', b - a
    block = [(t - a, min(rader[i + 1][0] if i + 1 < len(rader) else b, b, t + 4) - a, tx)   # en rad står högst 4 s
             for i, (t, tx) in enumerate(rader)]
    ut.with_suffix('.srt').write_text(''.join(f'{i}\n{srt_tid(s)} --> {srt_tid(e)}\n{tx}\n\n' for i, (s, e, tx) in enumerate(block, 1)))
    h = round(1080 * 1080 / W / 2) * 2
    fk = (f'[0:v]crop={W}:1080:{X}:0,split[v][b];[b]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=0.04[bg];'
          f'[v]scale=1080:{h}[fg];[bg][fg]overlay=0:{(1920 - h) // 2},fade=in:d=0.3,fade=out:st={d - 0.3:.2f}:d=0.3,format=yuv420p[ut];'
          f'[0:a]afade=in:d=0.3,afade=out:st={d - 0.3:.2f}:d=0.3[a]')
    subprocess.run(['ffmpeg', '-nostdin', '-loglevel', 'error', '-y', '-ss', f'{a + AV:.2f}', '-t', f'{d:.2f}', '-i', FILM,
                    '-filter_complex', fk, '-map', '[ut]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-r', '30',
                    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', ut.with_suffix('.mp4')], check=True)
    print(ut.with_suffix('.mp4').name, f'{d:.1f} s', len(block), 'rader')
