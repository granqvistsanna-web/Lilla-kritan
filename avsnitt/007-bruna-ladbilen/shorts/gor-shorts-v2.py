# Shorts för 007 v2 (Bruna sången, art direction v2): stående 1080×1920, hela 16:9-bilden ur slutklippet
# (film/avsnitt-007-v2-final.mp4) i mitten med en suddig, förstorad kopia ovanför och under, 0,3 s toning in och ut, och undertexter
# som SRT (raderna nedan: v2/rader.txt, omtajmade med Whisper large-v3-turbo 2026-11-09). Avsnittstid = sångtid + 29,0
# (uppmätt mot v2/sang.m4a). Sången klipps bara mellan hela fraser. Filerna heter v2-…; de gamla 01–04 är ur v1 (gor-shorts.py).
# Kör: python3 shorts/gor-shorts-v2.py [nr …]   (från avsnittets mapp)
import subprocess, sys, pathlib
HAR = pathlib.Path(__file__).resolve().parent
FILM, AV = HAR.parent / 'film/avsnitt-007-v2-final.mp4', 29.0
X, W = 0, 1920   # utsnittets vänsterkant och bredd i 1920-bilden: hela bilden
# nr, namn, start, slut (sångtid, s), rader (sångtid, text)
SHORTS = [
    (1, 'brunt-ar-den-godaste-fargen', 30.5, 67.5, [
        (30.7, 'Brunt, brunt, brunt –'), (32.5, 'mums, mums, mums!'), (34.6, 'Brunt är den godaste färgen! (Mums!)'),
        (39.7, 'Tänk om det fanns ett brunt, brunt land'), (42.7, 'med chokladträd och kolastrand!'), (45.7, 'Brunt, brunt, brunt –'),
        (47.7, 'mums, mums, mums!'), (49.3, 'Åka rutschkana'), (50.7, 'rakt ner i kolasås –'), (52.7, 'swish, swish, plask!'),
        (54.3, 'Mums, mums, mums!'), (55.7, 'Vilken färg? (Brunt!)'), (57.7, 'Vilken färg? (Brunt!)'),
        (59.7, 'Brunt är den godaste färgen!'), (65.5, '(Mums!)')]),
    (2, 'en-rutschkana', 75.6, 111.3, [
        (76.3, 'Uppför trappan – ett, två, tre'), (79.0, 'Titta ner, vad kan jag se?'), (82.0, 'En rutschkana!'), (84.0, 'Här ska jag åka –'),
        (86.0, 'swish, swish, ner i såsen (såsen!)'), (89.0, 'Plask, plask, plask!'), (91.0, 'Mums, mums, mums!'),
        (94.0, 'Tänk om det fanns ett brunt, brunt land'), (98.0, 'med chokladträd och kolastrand!'), (101.0, 'Brunt, brunt, brunt –'),
        (103.0, 'mums, mums, mums!'), (104.0, 'Åka rutschkana (-kana, -kana!)'), (106.0, 'rakt ner i kolasås –'),
        (108.3, 'swish, swish, plask!'), (109.8, 'Mums, mums, mums!')]),
    (3, 'ar-ni-med', 124.7, 157.6, [
        (125.0, 'En, två, tre – är ni med?'), (127.6, 'En, två, tre – är ni med?'), (131.2, 'Men vänta lite …'), (133.3, 'Nu dansar vi!'),
        (147.7, 'Klappa, klappa!'), (149.5, 'Snurra runt!'), (151.4, 'Hoppa, hoppa!'), (152.8, 'Plask!')]),
]
srt_tid = lambda t: f'{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}'

for nr, namn, a, b, rader in SHORTS:
    if len(sys.argv) > 1 and str(nr) not in sys.argv[1:]: continue
    ut, d = HAR / f'v2-{nr:02}-{namn}', b - a
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
