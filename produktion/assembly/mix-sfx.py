# Lays the SFX cues (assembly/sfx-cues.json, read from each scene's window.SFX) onto the episode timeline.
# Usage: mix-sfx.py <scene=start_s>... <out.wav> <length_s>
import sys, json, random, numpy as np, librosa, soundfile as sf
SR = 44100
# cue name -> [file, trim from, trim to, gain dB]; several files alternate.
SOUNDS = {
  'step':   [['sfx/raw/step-4.mp3', .19, .48, -20]],
  'stomp':  [['sfx/raw/stomp-1.mp3', .12, .44, -7]],
  'bounce': [['sfx/new/ball-soft-3.mp3', a - .01, a + .25, -11] for a in (.85, 2.72, 4.27, 6.21, 7.84)],  # the small red ball
  'big-bounce': [['sfx/new/ball-large-3.mp3', 2.71, 3.2, -9], ['sfx/new/ball-large-3.mp3', 5.44, 5.95, -9]],  # the big teal ball
  'boing':  [['sfx/raw/boing-3.mp3', .12, .93, -8]],
  'hop':    [['sfx/raw/boing-1.mp3', 0, .21, -15]],
  'roll':   [['sfx/raw/roll-2.mp3', 0, 5.4, -17]],
  'bonk':   [['sfx/raw/bounce-2.mp3', 0, .30, -12]],
  'giggle': [['sfx/new/light-4.mp3', .1, .8, -10], ['sfx/new/light-4.mp3', 2.05, 3.0, -10], ['sfx/new/light-4.mp3', 3.6, 4.5, -10]],  # Kvack
  'laugh':  [['sfx/new/teddy-3.mp3', .2, 1.85, -10], ['sfx/new/teddy-3.mp3', 2.42, 3.78, -10], ['sfx/new/teddy-3.mp3', 4.52, 5.45, -10]],  # Nalle
  'engine': [['sfx/raw/engine-1.mp3', 0, 8.3, -21]],
  'brake':  [['sfx/raw/brake-1.mp3', .07, .75, -17]],
  'horn':   [['sfx/raw/horn-3.mp3', .04, 1.08, -12]],
  'door':   [['sfx/raw/door-2.mp3', .45, 1.6, -17]],
  'yawn':   [['sfx/raw/yawn-1.mp3', .04, 1.9, -10]],
  'quack':  [['sfx/new/quack-2b.mp3', a - .02, b + .08, -10] for a, b in ((.08, .29), (.93, 1.13), (1.72, 1.94), (2.53, 2.73), (4.18, 4.41))],  # Kvack talks
  'hello':  [['sfx/new/happy-3a.mp3', .05, 1.1, -11]],  # Kvack picks up the phone
  'phone-bear': [['sfx/new/muffled-4.mp3', a - .03, b + .1, -9] for a, b in ((.66, 1.29), (2.17, 3.01), (3.9, 4.99))],  # Nalle's voice down the phone
  'bear-hi': [['sfx/new/bear-4c.mp3', a - .03, b + .1, -11] for a, b in ((.17, 1.47), (2.19, 2.9), (3.54, 4.46))],  # Nalle says hi / bye
  'snore':  [['sfx/new/duck-3.mp3', 0, 1.6, -17], ['sfx/new/duck-3.mp3', 2.45, 3.85, -17], ['sfx/new/duck-3.mp3', 4.63, 5.85, -17]],
  'buzz':   [['sfx/new/bee-bzz-1.wav', 0, 2.6, -22], ['sfx/new/bee-bzz-2.wav', 0, 2.2, -22], ['sfx/new/bee-bzz-3.wav', 0, 2.6, -22]],  # soft cartoon bzz, made in code (3 pitches); the bee-bu* recordings sounded odd
  'woo':    [['sfx/new/teddy-happy-1b.mp3', 0, 1.0, -10], ['sfx/new/teddy-happy-1b.mp3', 1.7, 2.65, -10]],  # Nalle from the bus window
  'uhoh':   [['sfx/new/uhoh-2.mp3', .12, .82, -12]],  # Kvack, the ball is stuck
  'gasp':   [['sfx/new/surprised-2.mp3', .55, 1.35, -13]],  # Kvack surprised
  'hnnf':   [['sfx/new/hnnf-3.mp3', a - .03, b + .08, -14] for a, b in ((.10, .38), (1.50, 1.76), (2.30, 2.56), (3.04, 3.36))],  # Kvack jumping for the ball
  'wheee':  [['sfx/new/wheee-1.mp3', .5, 1.7, -15]],  # Kvack hopping after the bee
  'boop':   [['sfx/new/boop-2.mp3', 0, .25, -13]],  # the bee boops Kvack's beak
  'bee-hum': [['sfx/new/bee-happy-1.mp3', 0, 2.0, -19]],  # the bee circling, happy
  'idea':   [['sfx/new/teddy-idea-1.mp3', 4.0, 5.35, -12]],  # Nalle sees the big ball
  'hup':    [['sfx/new/hup-2.mp3', .4, .72, -12], ['sfx/new/hup-2.mp3', 2.22, 2.58, -12]],  # Nalle's stomp, Nalle's throw
  'mmm':    [['sfx/new/mmm-toddler-1.mp3', .1, 2.05, -13]],  # Kvack after her milk
  'rustle': [['sfx/new/leaves-3.mp3', .42, 1.6, -17]],  # the tree shakes
  'whoosh': [['sfx/new/whoosh-4.mp3', .19, 1.0, -16]],  # a ball thrown high
  'pop':    [['sfx/new/pop-4.mp3', .24, .6, -13]],  # the ball pops out of the leaves
  'byebye': [['sfx/new/teddy-byebye-2.mp3', .7, 1.52, -11]],  # Nalle waves goodbye before the bus
  'ooh':    [['sfx/new/ooh-teddy-4.mp3', 1.38, 2.6, -12], ['sfx/new/ooh-teddy-1.mp3', .33, 1.55, -12]],  # Nalle watching the bee
  'yay':    [['sfx/new/yay-duck-3.mp3', .43, 1.45, -12], ['sfx/new/yay-duck-2.mp3', 0, 1.12, -12]],  # Kvack cheers
  'yay-bear': [['sfx/new/yay-teddy-1.mp3', 0, 1.2, -11]],  # Nalle cheers
  'more':   [['sfx/new/more-4.mp3', .33, 1.0, -12]],  # Kvack asks for more berries
  'nom':    [['sfx/new/nom-3.mp3', .04, 1.0, -14], ['sfx/new/nom-2.mp3', .36, 1.46, -14]],  # munching berries
  'slurp':  [['sfx/new/slurp-4.mp3', .4, 2.4, -16]],  # Kvack drinks her milk (bedtime)
  'whimper': [['sfx/new/duck-whimper-1.mp3', .05, 1.9, -15]],  # Kvack sad at the tree
  'sigh':   [['sfx/new/duck-1.mp3', 0, .65, -15]],
  'twinkle': [['sfx/new/chime-2.mp3', .07, 4.64, -15], ['sfx/new/chime-4.mp3', 0, 3.9, -14]],  # the moon smiles, then the stars
  'ring':   [['sfx/new/ring-toy.wav', 0, .55, -16]],  # toy phone in the garden, synthesized bell trill
}
ENGINE_LEN = [3.5, 4.6]  # bus-goodbye: rolls in and stops, then drives off
ROLL_LEN = {'garden': 2.1, 'playground': 5.4, 'ballgame': 1.4}  # how long each scene's ball rolls
*starts, out, length = sys.argv[1:]
starts = dict(s.split('=') for s in starts)
cues = json.load(open('assembly/sfx-cues.json'))
cache, mix, n, missing = {}, np.zeros(int(float(length) * SR)), {}, set()
def clip(spec):
    f, a, b, db = spec
    if f not in cache: cache[f] = librosa.load(f, sr=SR, mono=True)[0]
    y = cache[f][int(a * SR):int(b * SR)].copy()
    y /= max(1e-6, np.abs(y).max())
    fade = min(len(y) // 4, int(.03 * SR)); y[-fade:] *= np.linspace(1, 0, fade)
    return y * 10 ** (db / 20)
random.seed(7)
for scene, t0 in starts.items():
    for t, name in cues.get(scene, []):
        if name not in SOUNDS: missing.add(name); continue  # no sound file picked yet
        k = n[name] = n.get(name, -1) + 1
        specs = SOUNDS[name]; y = clip(specs[k % len(specs)])
        if name == 'roll': y = y[:int(ROLL_LEN[scene] * SR)]; y *= np.minimum(1, np.linspace(1.6, 0, len(y)))  # rolls die away
        if name == 'engine':  # pitched up a little for a small bus; fades in, dies away as it stops or leaves
            y = librosa.resample(y, orig_sr=SR, target_sr=int(SR * .87))[:int(ENGINE_LEN[k % 2] * SR)]
            y *= np.minimum(np.minimum(1, np.linspace(0, len(y) / SR / .3, len(y))), np.linspace(1.5, 0, len(y)).clip(0, 1))
        if name in ('step', 'stomp', 'bounce'):  # tiny pitch and level changes so repeats don't sound copied
            y = librosa.resample(y, orig_sr=SR, target_sr=int(SR * random.uniform(.94, 1.06))) * random.uniform(.8, 1)
        i = int((float(t0) + t) * SR); mix[i:i + len(y)] += y[:len(mix) - i]
sf.write(out, np.clip(mix, -1, 1), SR)
print({k: v + 1 for k, v in n.items()}, 'peak', round(float(np.abs(mix).max()), 2), 'skipped', sorted(missing))
