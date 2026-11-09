# Shorts för avsnitt 019 Rosa sången: stående 1080×1920 (som 007:s men 9:16), ett 4:3-utsnitt ur slutklippet (film/avsnitt-019.mp4)
# i mitten med en suddig, förstorad kopia ovanför och under, 0,3 s toning in och ut, och undertexter som SRT (raderna nedan).
# Short 2 tar med hela mellanspelet (nya kulor, glassarna dansar) och slutar före "Nu dansar vi!". Avsnittstid = sångtid + 23,3 (introt 11,3 + kritan ritar 12; uppmätt mot sang.m4a). Sången klipps bara mellan hela fraser.
# Kör: python3 shorts/gor-shorts.py [nr …]   (från avsnittets mapp)
import subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, AV = HAR.parent / 'film/avsnitt-019.mp4', 23.3
X, W = 0, 1920   # utsnittets vänsterkant och bredd i 1920-bilden: hela bilden (bilen kör i vänsterkanten, dansarna står brett)
# nr, namn, start, slut (sångtid, s), rader (sångtid, text)
SHORTS = [
    (1, 'rosa-ballong', 55.4, 91.0, [
        (55.6, 'Titta där! (Vadå?)'), (58.2, 'En rosa ballong (Åh!)'), (60.6, 'Den flyger upp'), (61.9, 'Upp, upp, upp, upp'),
        (65.5, 'Vad finns där uppe? (Vad?)'), (67.2, 'Ett rosa moln (Wow!)'), (70.1, 'Mjukt och fluffigt (Så mjukt!)'),
        (72.1, 'Hej då, ballong! (Hej då!)'), (75.9, 'Rosa, rosa, min favoritfärg'), (80.3, 'Rosa, rosa, rosa som ett glassberg'),
        (84.8, 'Upp bland molnen'), (87.1, 'Allting är rosa')]),
    (2, 'en-rosa-bil', 97.7, 135.6, [
        (98.1, 'Vad kommer här? (Va?)'), (100.6, 'En rosa bil (Tut, tut!)'), (102.7, 'Brum, brum, brum'), (103.8, 'Nu kör vi (Ja!)'),
        (105.5, 'Vart ska vi åka? (Vart?)'), (107.5, 'Vi ska köpa glass (Glass!)'), (109.9, 'En rosa glass (Mums!)'),
        (112.4, 'Oj, den vinglar (Oj!)')]),
    (3, 'nu-dansar-vi', 135.6, 162.7, [
        (135.8, 'Nu dansar vi!'), (137.3, 'Dansa!'), (138.7, 'Klappa händer (Klapp, klapp!)'), (140.9, 'Gunga kroppen (Gung, gung!)'),
        (143.1, 'Hoppa högt (Hopp, hopp!)'), (145.7, 'Klappa, klappa (Klapp, klapp!)'), (148.0, 'Gunga, gunga (Gung, gung!)'),
        (150.1, 'Hoppa, hoppa (Hopp, hopp!)'), (153.1, 'Hurra! (Hurra!)'), (157.9, 'Rosa, rosa, min favoritfärg')]),
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
