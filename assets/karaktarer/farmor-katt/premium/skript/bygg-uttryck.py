"""uttryck.html för farmor och farfar, byggda ur kattens (Kaj) sida, som är låst och inte ändras.
Samma motor, poser, rörelser och film. Skillnader: delarna är de grå urklippen, öronen (i kod) grå, ögonen mörka direkt på
den grå pälsen (inga ögonfläckar), linjerna (bågar, bryn, lock, mun) mörka, och tillbehören i kod:
farmor runda tunna glasögon och en stickad sjal i varm rosa, farfar en keps i mörkgrönt och en stickad halsduk i senapsgult.
Sjalen och halsduken ligger på kroppen, klippta 14 px innanför dess kant, så de skymmer aldrig armarna (de sitter bakom kroppen).
Kör från repots rot: python3 assets/karaktarer/farmor-katt/premium/skript/bygg-uttryck.py"""
import re

KAJ = 'assets/karaktarer/katten-kaj/premium/uttryck.html'
src = open(KAJ, encoding='utf-8').read()

# Kroppens kontur 14 px innanför kanten (ur cut/*-body.png, samma för båda)
KROPP_D = ('M503 226 L434 238 L404 250 L382 262 L363 274 L348 286 L335 298 L324 310 L314 322 L305 334 L297 346 L290 358 L283 370 '
  'L276 382 L271 394 L265 406 L261 418 L257 430 L253 442 L250 454 L247 466 L245 478 L243 490 L241 502 L240 514 L239 526 L238 538 '
  'L238 550 L239 562 L240 574 L241 586 L243 598 L245 610 L248 622 L251 634 L255 646 L259 658 L264 670 L269 682 L276 694 L283 706 '
  'L292 718 L301 730 L312 742 L325 754 L341 766 L361 778 L386 790 L421 802 L486 814 L502 815 L521 815 L537 814 L599 802 L632 790 '
  'L656 778 L676 766 L693 754 L707 742 L719 730 L729 718 L738 706 L746 694 L752 682 L758 670 L764 658 L768 646 L771 634 L774 622 '
  'L776 610 L778 598 L779 586 L780 574 L781 562 L780 550 L780 538 L779 526 L777 514 L775 502 L773 490 L771 478 L768 466 L765 454 '
  'L761 442 L758 430 L753 418 L749 406 L744 394 L738 382 L732 370 L725 358 L717 346 L709 334 L700 322 L690 310 L679 298 L666 286 '
  'L651 274 L633 262 L611 250 L580 238 L514 226Z')

def gra(hexf, bas, ton):   # samma omfärgning som gra-katt.py, för öronens päls i kod
    rgb = [int(hexf[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    L = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
    return '#' + ''.join(f'{round(min(1, (bas + L) * t) * 255):02x}' for t in ton)

# Tillbehören. {id} = figurens nummer (klippningarnas id). Allt i figurens 1024-ruta.
SJAL = """
    <g clip-path="url(#kropp-${id})"><g class="klader">
      <path d="M200 470 Q512 620 824 470 L824 600 Q690 630 512 728 Q334 630 200 600Z" fill="#000" opacity="0.12" transform="translate(0 10)"/>
      <clipPath id="sjal-${id}"><path d="M200 470 Q512 620 824 470 L824 600 Q690 630 512 728 Q334 630 200 600Z"/></clipPath>
      <path d="M200 470 Q512 620 824 470 L824 600 Q690 630 512 728 Q334 630 200 600Z" fill="${SJALF[0]}"/>
      <g clip-path="url(#sjal-${id})" fill="none" stroke-linecap="round">
        ${[0.16, 0.32, 0.48, 0.64, 0.8].map(k => { const y0 = 470 + 130 * k, ym = 545 + 183 * k;
          return `<path d="M200 ${y0} Q512 ${2 * ym - y0} 824 ${y0}" stroke="${SJALF[1]}" stroke-width="7" stroke-dasharray="12 9" opacity="0.55"/>`; }).join('')}
        <path d="M200 470 Q512 620 824 470" stroke="${SJALF[2]}" stroke-width="12" opacity="0.7"/>
        <path d="M200 600 Q334 630 512 728 Q690 630 824 600" stroke="${SJALF[1]}" stroke-width="10" stroke-dasharray="4 12" opacity="0.8"/></g>
    </g></g>"""

HALSDUK = """
    <g clip-path="url(#kropp-${id})"><g class="klader">
      <path d="M200 488 Q512 612 824 488 L824 560 Q512 684 200 560Z" fill="#000" opacity="0.12" transform="translate(0 9)"/>
      <path d="M594 586 L652 580 L672 748 L612 756Z" fill="#000" opacity="0.12" transform="translate(5 8)"/>
      <clipPath id="band-${id}"><path d="M200 488 Q512 612 824 488 L824 560 Q512 684 200 560Z"/><path d="M594 586 L652 580 L672 748 L612 756Z"/></clipPath>
      <path d="M594 586 L652 580 L672 748 L612 756Z" fill="${HALSF[0]}"/>
      <path d="M200 488 Q512 612 824 488 L824 560 Q512 684 200 560Z" fill="${HALSF[0]}"/>
      <g clip-path="url(#band-${id})" fill="none" stroke="${HALSF[1]}" stroke-width="6" opacity="0.5">
        ${Array.from({ length: 28 }, (_, j) => { const x = 222 + 21 * j; return `<path d="M${x} 470 L${x + 6} 700"/>`; }).join('')}
        ${[612, 642, 672, 702, 732].map(y => `<path d="M590 ${y} Q632 ${y - 6} 676 ${y - 4}"/>`).join('')}</g>
      <path d="M200 488 Q512 612 824 488" fill="none" stroke="${HALSF[2]}" stroke-width="10" opacity="0.7"/>
      <ellipse cx="616" cy="592" rx="34" ry="26" fill="${HALSF[0]}"/><path d="M590 590 Q616 578 642 590" fill="none" stroke="${HALSF[1]}" stroke-width="6" opacity="0.6"/>
      <g stroke="${HALSF[1]}" stroke-width="7" stroke-linecap="round">${[0, 1, 2, 3, 4].map(j =>
        `<path d="M${616 + 13 * j} ${755 - 1.6 * j} l${1 + j} 20"/>`).join('')}</g>
    </g></g>"""

GLAS = """
    <g class="glas" fill="none" stroke="${GLASF}" stroke-width="6" stroke-linecap="round">
      ${OGON.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="42" fill="#fff" fill-opacity="0.13"/>
        <path d="M${x - 22} ${y - 24} Q${x - 30} ${y - 14} ${x - 30} ${y - 4}" stroke="#fff" stroke-width="5" opacity="0.7"/>`).join('')}
      <path d="M${OGON[0][0] + 41} ${OGON[0][1] - 6} Q${(OGON[0][0] + OGON[1][0]) / 2} ${OGON[0][1] - 22} ${OGON[1][0] - 41} ${OGON[1][1] - 6}"/>
      <path d="M${OGON[0][0] - 42} ${OGON[0][1] - 4} L${OGON[0][0] - 92} ${OGON[0][1] - 12}"/>
      <path d="M${OGON[1][0] + 42} ${OGON[1][1] - 4} L${OGON[1][0] + 92} ${OGON[1][1] - 12}"/></g>"""

KEPS_D = 'M370 300 C366 236 430 194 512 192 C598 192 660 232 656 300 Q512 318 370 300Z'
SKARM_D = 'M360 296 Q512 322 666 296 Q670 316 652 324 Q512 350 374 324 Q356 316 360 296Z'
KEPS = f"""
    <g class="keps" transform="translate(0 -20)">
      <path d="{KEPS_D}" fill="#fff" stroke="#fff" stroke-width="22" stroke-linejoin="round"/><path d="{SKARM_D}" fill="#fff" stroke="#fff" stroke-width="22" stroke-linejoin="round"/>
      <path d="{KEPS_D}" fill="${{KEPSF[0]}}"/>
      <path d="M392 262 C410 222 458 202 512 200" fill="none" stroke="${{KEPSF[2]}}" stroke-width="12" stroke-linecap="round" opacity="0.6"/>
      <path d="M512 196 C506 236 486 274 452 306" fill="none" stroke="${{KEPSF[1]}}" stroke-width="5" stroke-dasharray="9 7" opacity="0.8"/>
      <path d="{SKARM_D}" fill="${{KEPSF[1]}}"/>
      <path d="M378 318 Q512 340 648 318" fill="none" stroke="${{KEPSF[0]}}" stroke-width="5" opacity="0.6"/>
      <circle cx="512" cy="195" r="10" fill="${{KEPSF[1]}}"/></g>"""

FIGURER = {
    'farmor': dict(bas=0.52, ton=(0.97, 1.0, 1.04), blink=31, titel='Farmor', kropp=SJAL, ansikte=GLAS,
                   farger="const SJALF = ['#d98a95', '#b5687a', '#f2b6be'], GLASF = '#6e4b3e';   // förslag: varm rosa sjal, tunna bruna bågar"),
    'farfar': dict(bas=0.40, ton=(1.04, 1.0, 0.95), blink=47, titel='Farfar', kropp=HALSDUK, ansikte=KEPS,
                   farger="const HALSF = ['#d9a52b', '#a8781a', '#f0c75e'], KEPSF = ['#3d6b4a', '#2a4c34', '#5f8f68'];   // förslag: senapsgul halsduk, mörkgrön keps"),
}

def byt(s, gammal, ny, n=1):
    assert s.count(gammal) == n, (gammal[:60], s.count(gammal))
    return s.replace(gammal, ny)

for namn, F in FIGURER.items():
    s = src
    pals = gra('#342d2a', F['bas'], F['ton'])
    s = byt(s, '<title>Katten v2 – uttryck och poser</title>', f'<title>{F["titel"]} (grå katt) – uttryck och poser</title>')
    s = byt(s, '<!-- Kattens uttryck', f'<!-- {F["titel"]}: kattens (Kaj) rigg omfärgad grå (skript/), byggd av farmor-katt/premium/skript/bygg-uttryck.py.\n     Ändra inte här: ändra skriptet och kör om. Ögonen mörka direkt på pälsen, tillbehören i kod.\n     Kattens uttryck')
    s = byt(s, 'cut/kaj-', f'cut/{namn}-', 2)
    s = byt(s, '#342d2a', pals, 2)
    # ögonen: mörka ellipser direkt på pälsen (inga gräddvita fläckar), glansen kvar; linjerna mörka
    s = byt(s, "const GRADDE = '#efe6d2', PUPILLF = '#2a1d1a', MUNFARG = '#7c2226', KIND = '#ec8f96';",
        "const GRADDE = '#3a2a24', PUPILLF = '#2a1d1a', MUNFARG = '#7c2226', KIND = '#ec8f96';   // GRADDE = linjerna, mörka på grå päls\n"
        "const OGA = [18, 25], MORRF = '#ffffff';   // ögonen rx ry (som kaninens), morrhåren vita\n" + F['farger'] + '\n'
        f"const KROPP_D = '{KROPP_D}';   // kroppen 14 px innanför kanten: kläderna klipps här")
    s = byt(s, '<g fill="none" stroke="${GRADDE}" stroke-width="4" stroke-linecap="round" opacity="0.9">${morr(-1)}',
               '<g fill="none" stroke="${MORRF}" stroke-width="4" stroke-linecap="round" opacity="0.75">${morr(-1)}')
    s = byt(s, '''<g clip-path="url(#lock-${id}-${i})"><ellipse class="flack" rx="44" ry="47" fill="${VITOGA}"/>
        <g class="pupill"><ellipse cx="${PUPILL[i][0]}" cy="${PUPILL[i][1]}" rx="19" ry="27" fill="${PUPILLF}"/>
        <circle cx="${PUPILL[i][0] - 6}" cy="${PUPILL[i][1] - 10}" r="6" fill="#fff"/></g></g>''',
        '''<g clip-path="url(#lock-${id}-${i})"><g class="pupill"><ellipse class="flack" rx="${OGA[0]}" ry="${OGA[1]}" fill="${PUPILLF}"/>
        <circle cx="-6" cy="-10" r="6" fill="#fff"/></g></g>''')
    s = byt(s, '<path class="glad" d="M-24 8 Q0 -20 24 8" fill="none" stroke="${GRADDE}" stroke-width="8"',
               '<path class="glad" d="M-21 7 Q0 -17 21 7" fill="none" stroke="${GRADDE}" stroke-width="7"')
    # kläderna på kroppen (före ansiktet), tillbehören på huvudet i ansiktsgruppen (följer riktning, skak och nick)
    s = byt(s, '<g class="kropp"><image href="cut/' + namn + '-body.png" width="1024" height="1024"/>\n    <g class="drag">',
        '<g class="kropp"><image href="cut/' + namn + '-body.png" width="1024" height="1024"/>\n    <clipPath id="kropp-${id}"><path d="${KROPP_D}"/></clipPath>'
        + F['kropp'] + '\n    <g class="drag">' + (F['ansikte'] if namn == 'farfar' else ''))
    s = byt(s, '<g class="munnen">', (F['ansikte'] if namn == 'farmor' else '') + '\n    <g class="munnen">')
    # rita(): pupillen följer blicken 0,6 (ögat är litet och har locket över sig), lock och bryn efter det mindre ögat
    s = byt(s, "pup[i].setAttribute('transform', `translate(${0.9 * f.titt[0]} ${0.9 * f.titt[1]})`);",
               "pup[i].setAttribute('transform', `translate(${0.6 * f.titt[0]} ${0.6 * f.titt[1]})`);")
    s = byt(s, 'const ly = -48 + f.lock[i] * 88, w = 44 * Math.sqrt(Math.max(0, 1 - (ly / 47) ** 2));',
               'const ly = -OGA[1] - 1 + f.lock[i] * (2 * OGA[1] - 4), w = OGA[0] * Math.sqrt(Math.max(0, 1 - (ly / OGA[1]) ** 2));')
    s = byt(s, 'M-60 ${ly} H${-w} Q0 ${ly + 12} ${w} ${ly} H60 V60 H-60Z', 'M-60 ${ly} H${-w} Q0 ${ly + 7} ${w} ${ly} H60 V60 H-60Z')
    s = byt(s, "lock[i].setAttribute('d', `M${-w} ${ly} Q0 ${ly + 12} ${w} ${ly}`);", "lock[i].setAttribute('d', `M${-w - 3} ${ly} Q0 ${ly + 7} ${w + 3} ${ly}`);")
    s = byt(s, '<path class="lock" fill="none" stroke="${GRADDE}" stroke-width="7"', '<path class="lock" fill="none" stroke="${GRADDE}" stroke-width="6"')
    s = byt(s, "${y - 64 + f.brynY[i] + dy}", "${y - 60 + f.brynY[i] + dy}")
    # glasögonen följer ögonens höjd; kläderna följer ansiktet 40 % (som en magfläck)
    s = byt(s, "  alla('.kind').forEach((c, i) => {",
        "  alla('.glas').forEach(e => e.setAttribute('transform', `translate(0 ${f.ogonY - 4 * u})`));\n"
        "  alla('.klader').forEach(e => e.setAttribute('transform', `translate(${0.4 * fx} ${0.4 * fy})`));\n"
        "  alla('.kind').forEach((c, i) => {")
    s = byt(s, 'const blinka = skapaBlinka(12);', f'const blinka = skapaBlinka({F["blink"]});')
    s = byt(s, 'boj: true, blick: 12 };', f'boj: true, blick: {F["blink"]} }};')
    s = byt(s, "etikett(960, 56, 'katten · uttryck', 40);", f"etikett(960, 56, '{namn} · uttryck', 40);")
    open(f'assets/karaktarer/{namn}-katt/premium/uttryck.html', 'w', encoding='utf-8').write(s)
    print(namn, 'klar, öronens päls', pals)
