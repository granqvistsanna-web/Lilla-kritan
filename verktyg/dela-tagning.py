#!/usr/bin/env python3
"""Delar en ElevenLabs-tagning med många repliker i en fil per replik.

  python3 verktyg/dela-tagning.py <tagning.mp3> <lista.txt> [utmapp]

lista.txt: en rad per replik i samma ordning som i tagningen, "filnamn  [tagg] Text"
(samma format som kodblocken i manus.md). Raderna utan text hoppas över.
Utmapp är assets/ljud/roster/tittut om inget annat anges. Befintliga filer skrivs inte över.
Kräver ffmpeg och whisper-cli med modellen nedan. Skriver ut vad varje fil säger, så att det går att kontrollera.
"""
import re, subprocess, sys, tempfile, os, difflib

MODELL = os.path.expanduser('~/.flow-mcp/models/ggml-large-v3-turbo-q5_0.bin')
bokst = lambda s: re.sub(r'[^a-zåäö]', '', s.lower())

def whisper(wav, ord_for_ord):
    ut = subprocess.run(['whisper-cli', '-m', MODELL, '-l', 'sv', '-f', wav] + (['-ml', '1', '-sow'] if ord_for_ord else ['-nt']),
                        capture_output=True, text=True).stdout
    if not ord_for_ord: return ut.replace('\n', ' ').strip()
    t = lambda s: sum(float(x) * m for x, m in zip(s.split(':'), (3600, 60, 1)))
    return [(t(a), t(b), w) for a, b, w in re.findall(r'\[(\S+) --> (\S+)\]\s+(.*)', ut) if bokst(w)]

def main(tagning, lista, utmapp='assets/ljud/roster/tittut'):
    rader = [m.groups() for m in (re.match(r'\s*(\S+)\s+(?:\[[^\]]*\]\s*)?(.+)', r) for r in open(lista)) if m]
    tmp = tempfile.mkdtemp(); wav = f'{tmp}/t.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tagning, '-ar', '16000', '-ac', '1', wav], check=True)
    ord_ = whisper(wav, True)
    tyst = subprocess.run(['ffmpeg', '-i', wav, '-af', 'silencedetect=noise=-30dB:d=0.08', '-f', 'null', '-'], capture_output=True, text=True).stderr
    tyst = list(zip(map(float, re.findall(r'silence_start: ([\d.]+)', tyst)), map(float, re.findall(r'silence_end: ([\d.]+)', tyst))))
    slut = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav], capture_output=True, text=True).stdout)
    # gränsen efter varje replik: manusets bokstäver läggs mot det som hördes (difflib), så att ett utelämnat
    # "hihi" eller "shh" bara stör där det sitter
    hort, vem = '', []
    for k, (*_, w) in enumerate(ord_): hort += bokst(w); vem += [k] * len(bokst(w))
    manus = ''.join(bokst(t) for _, t in rader)
    block = difflib.SequenceMatcher(None, manus, hort, autojunk=False).get_matching_blocks()
    def hordPos(p):   # var i det hörda manusets bokstav p hamnar
        a, b, n = max((bl for bl in block if bl.a <= p and bl.size), key=lambda bl: bl.a, default=(0, 0, 1))
        return min(b + min(p - a, n - 1), len(vem) - 1)
    snitt, mal = [0.0], 0
    for _, text in rader[:-1]:
        mal += len(bokst(text))
        i = vem[hordPos(mal - 1)]
        a, b = ord_[i][1], ord_[min(i + 1, len(ord_) - 1)][0]
        nara = [p for p in tyst if p[1] > a - 0.45 and p[0] < b + 0.05]   # längsta pausen vid gränsen
        p = max(nara, key=lambda p: p[1] - p[0]) if nara else (a, b)
        snitt.append(round((p[0] + p[1]) / 2, 3))
    snitt.append(slut)
    os.makedirs(utmapp, exist_ok=True)
    for (namn, text), a, b in zip(rader, snitt, snitt[1:]):
        fil = f'{utmapp}/{namn}.m4a'
        if os.path.exists(fil): print(f'{namn:18} FINNS REDAN, hoppar över'); continue
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(a), '-to', str(b), '-i', tagning, '-af',
                        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,'
                        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse,afade=t=in:d=0.02',
                        '-c:a', 'aac', '-b:a', '128k', fil], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', fil, '-ar', '16000', '-ac', '1', wav], check=True)
        print(f'{namn:18} {b - a:4.1f} s  manus: {text:32} hörs: {whisper(wav, False)}')

if __name__ == '__main__':
    main(*sys.argv[1:])
