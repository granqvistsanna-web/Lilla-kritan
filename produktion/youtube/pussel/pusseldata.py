"""De 21 pusslen i Vanliga och Jul (äpplet och bilen ligger i pussel-prov.py). Snitten är lagda för hand per bild.
Bitarna: 0 överst till vänster, 1 överst till höger, 2–4 nederst från vänster. ordning: (bit, id, replik). Sist avgör."""
B = 'produktion/youtube/pussel/bilder/cut/'
R = 'assets/rekvisita/'

NYA = [
    # ---------- Vanliga ----------
    dict(namn='kaninen', bild=B + 'kanin.png', bg=(200, 222, 246), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.50, topp=0.56, botten=(0.30, 0.62)),
         ordning=[(3, 'kaninen-brunt', '[curious] Något brunt.'), (2, 'kaninen-svans', '[curious] En rund svans.'),
                  (4, 'kaninen-tass', '[curious] En liten tass.'), (1, 'kaninen-oga', '[curious] Ett litet öga.'),
                  (0, 'kaninen-oron', '[excited] Långa öron!')],
         svar=('en-kanin', '[excited] En kanin!'), levande='skutta', ljud='kanin-gullig'),
    dict(namn='kon', bild=B + 'ko.png', bg=(222, 208, 238), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.30, topp=0.45, botten=(0.45, 0.68), agare=dict(h0=2)),
         ordning=[(1, 'kon-vitt', '[curious] Något vitt.'), (4, 'kon-svans', '[curious] En svans.'),
                  (3, 'kon-flackar', '[curious] Svarta fläckar.'), (0, 'kon-horn', '[curious] Två horn.'),
                  (2, 'kon-nos', '[excited] En stor rosa nos!')],
         svar=('en-ko', '[excited] En ko!'), levande='skutta', ljud='mu'),
    dict(namn='grisen', bild=B + 'gris.png', bg=(200, 226, 238), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.35, topp=0.55, botten=(0.38, 0.62), agare=dict(h0=2, b1=2)),
         ordning=[(3, 'grisen-rosa', '[curious] Något rosa.'), (1, 'grisen-knorr', '[curious] En liten knorr.'),
                  (4, 'grisen-ben', '[curious] Små ben.'), (0, 'grisen-ora', '[curious] Ett öra.'),
                  (2, 'grisen-tryne', '[excited] Ett tryne!')],
         svar=('en-gris', '[excited] En gris!'), levande='skutta', ljud='noff'),
    dict(namn='katten', bild=B + 'katt.png', bg=(200, 220, 246), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.50, topp=0.42, botten=(0.30, 0.62)),
         ordning=[(0, 'katten-orange', '[curious] Något orange.'), (4, 'katten-rander', '[curious] Ränder.'),
                  (2, 'katten-svans', '[curious] En lång svans.'), (3, 'katten-tassar', '[curious] Vita tassar.'),
                  (1, 'katten-morrhar', '[excited] Morrhår!')],
         svar=('en-katt', '[excited] En katt!'), levande='skutta', ljud='mjau-gullig'),
    dict(namn='hunden', bild=B + 'hund.png', bg=(204, 230, 200), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.42, topp=0.33, botten=(0.35, 0.66), agare=dict(topp=1)),
         ordning=[(2, 'hunden-brunt', '[curious] Något brunt.'), (4, 'hunden-svans', '[curious] En svans.'),
                  (3, 'hunden-tass', '[curious] En tass.'), (0, 'hunden-ora', '[curious] Ett långt öra.'),
                  (1, 'hunden-tunga', '[excited] En rosa tunga!')],
         svar=('en-hund', '[excited] En hund!'), levande='skutta', ljud='vov-gullig'),
    dict(namn='traktorn', bild=B + 'traktor.png', bg=(204, 230, 200), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.40, topp=0.58, botten=(0.49, 0.68), agare=dict(b1=2, h0=2, b2=4)),
         ordning=[(3, 'traktorn-rott', '[curious] Oj, något rött.'), (1, 'traktorn-ror', '[curious] Och ett rör.'),
                  (0, 'traktorn-ratt', '[excited] Titta, en ratt!'), (4, 'traktorn-litet-hjul', '[curious] Ett litet hjul.'),
                  (2, 'traktorn-stort-hjul', '[excited] Och ett stort hjul!')],
         svar=('en-traktor', '[excited] En traktor!'), levande='kora', ljud='tuff-tuff'),
    dict(namn='flygplanet', bild=B + 'flygplan.png', bg=(246, 228, 170), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.62, topp=0.72, botten=(0.35, 0.60)),
         ordning=[(3, 'flygplanet-rott', '[amused] Rött igen!'), (4, 'flygplanet-hjul', '[curious] Små, små hjul.'),
                  (2, 'flygplanet-mer-rott', '[curious] Ännu mer rött …'), (0, 'flygplanet-fonster', '[excited] Runda fönster!'),
                  (1, 'flygplanet-propeller', '[excited] Och en propeller!')],
         svar=('ett-flygplan', '[excited] Ett flygplan!'), levande='flyga', ljud='flygplan'),
    dict(namn='brandbilen', bild=R + 'brandbil-rod/cut/brandbil-hel.png', bg=(200, 222, 246), hojd=1.0, yfast=1.0,
         snitt=dict(y=0.32, topp=0.58, botten=(0.40, 0.60), agare=dict(b2=4)),
         ordning=[(3, 'brandbilen-rott', '[curious] Mycket rött.'), (2, 'brandbilen-slang', '[curious] Här är en slang.'),
                  (0, 'brandbilen-stege', '[excited] En stege!'), (4, 'brandbilen-hjul', '[curious] Ett hjul.'),
                  (1, 'brandbilen-blaljus', '[excited] Blåljus!')],
         svar=('en-brandbil', '[excited] En brandbil!'), levande='kora', ljud='siren'),
    dict(namn='baten', bild=B + 'bat.png', bg=(246, 228, 170), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.40, topp=0.58, botten=(0.33, 0.62), agare=dict(h1=0)),
         ordning=[(3, 'baten-rott', '[curious] Hmm … rött, här också.'), (1, 'baten-flagga', '[excited] Titta, en flagga!'),
                  (2, 'baten-vagor', '[curious] Vågor …'), (4, 'baten-streck', '[curious] Ett vitt streck.'),
                  (0, 'baten-skorsten', '[excited] En skorsten!')],
         svar=('en-bat', '[excited] En båt!'), levande='gunga', ljud='vagor'),
    # ---------- Jul ----------
    dict(namn='pepparkakan', bild=B + 'pepparkaka.png', bg=(200, 226, 238), hojd=1.25, yfast=0.3,
         snitt=dict(y=0.45, topp=0.30, botten=(0.33, 0.67)),
         ordning=[(2, 'pepparkakan-brunt', '[curious] Brunt …'), (0, 'pepparkakan-streck', '[curious] Vita, vita streck.'),
                  (3, 'pepparkakan-knappar', '[excited] Knappar!'), (4, 'pepparkakan-ben', '[curious] Och ett ben.'),
                  (1, 'pepparkakan-ansikte', '[excited] Ett glatt ansikte!')],
         svar=('en-pepparkaksgubbe', '[excited] En pepparkaksgubbe!'), levande='skutta', ljud='fniss'),
    dict(namn='julgranen', extra='lysa', bild=B + 'julgran.png', bg=(246, 228, 170), hojd=1.45, yfast=0.0,
         snitt=dict(y=0.45, topp=0.58, botten=(0.38, 0.62)),
         ordning=[(1, 'julgranen-gront', '[curious] Oj, grönt.'), (2, 'julgranen-kula', '[excited] En röd kula!'),
                  (4, 'julgranen-hjarta', '[curious] Ett hjärta.'), (3, 'julgranen-stam', '[curious] Och en stam.'),
                  (0, 'julgranen-stjarna', '[excited] En stjärna!')],
         svar=('en-julgran', '[excited] En julgran!'), levande='gunga', ljud='tindra'),
    dict(namn='tomten', extra='vinka', bild=R + 'tomte/cut/tomte.png', bg=(200, 226, 238), hojd=1.35, yfast=0.0,
         snitt=dict(y=0.40, topp=0.50, botten=(0.36, 0.64)),
         ordning=[(2, 'tomten-rott', '[curious] Något rött.'), (4, 'tomten-vante', '[excited] En vante!'),
                  (1, 'tomten-tofs', '[curious] En vit tofs.'), (0, 'tomten-luva', '[curious] Och en luva …'),
                  (3, 'tomten-skagg', '[excited] Ett vitt skägg!')],
         svar=('en-tomte', '[excited] En tomte!'), levande='skutta', ljud='hoho-tomte'),
    dict(namn='tomteluvan', bild=R + 'tomteluva/cut/tomteluva.png', bg=(204, 230, 200), hojd=1.0, yfast=1.0,
         snitt=dict(y=0.45, topp=0.62, botten=(0.35, 0.62)),
         ordning=[(4, 'tomteluvan-vitt', '[curious] Vitt …'), (2, 'tomteluvan-rott', '[curious] Och rött.'),
                  (3, 'tomteluvan-rott-vitt', '[curious] Rött och vitt …'), (0, 'tomteluvan-spets', '[curious] En liten spets.'),
                  (1, 'tomteluvan-tofs', '[excited] En tofs!')],
         svar=('en-tomteluva', '[excited] En tomteluva!'), levande='gunga', ljud='bjallror'),
    dict(namn='snoflingan', bild=R + 'snoflinga/cut/snoflinga.png', bg=(222, 208, 238), hojd=1.3, yfast=0.5,
         snitt=dict(y=0.42, topp=0.50, botten=(0.36, 0.64)),
         ordning=[(0, 'snoflingan-vitt', '[amused] Vitt igen!'), (4, 'snoflingan-blatt', '[curious] Något blått.'),
                  (2, 'snoflingan-gren', '[curious] Titta, en gren.'), (1, 'snoflingan-grenar', '[curious] Fler grenar!'),
                  (3, 'snoflingan-manga', '[excited] Så många grenar!')],
         svar=('en-snoflinga', '[excited] En snöflinga!'), levande='singla', ljud='tindra'),
    dict(namn='snogubben', extra='vinka', bild=R + 'snogubbe/cut/snogubbe.png', bg=(246, 214, 190), hojd=1.6, yfast=0.0,
         snitt=dict(y=0.42, topp=0.50, botten=(0.36, 0.64), agare=dict(h1=0, topp=1)),
         ordning=[(2, 'snogubben-vitt', '[amused] Ännu mer vitt!'), (4, 'snogubben-runt', '[curious] Runt och vitt.'),
                  (3, 'snogubben-halsduk', '[curious] En röd halsduk.'), (0, 'snogubben-ogon', '[curious] Två små ögon.'),
                  (1, 'snogubben-morot', '[excited] En morot!')],
         svar=('en-snogubbe', '[excited] En snögubbe!'), levande='gunga', ljud='jippi'),
    dict(namn='julklappen', bild=B + 'julklapp.png', bg=(204, 230, 200), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.48, topp=0.62, botten=(0.38, 0.64)),
         ordning=[(2, 'julklappen-rott', '[curious] Här är något rött.'), (4, 'julklappen-stjarnor', '[excited] Vita stjärnor!'),
                  (3, 'julklappen-snore', '[curious] Ett snöre.'), (1, 'julklappen-kvist', '[curious] Och en grankvist.'),
                  (0, 'julklappen-rosett', '[excited] En rosett!')],
         svar=('en-julklapp', '[excited] En julklapp!'), levande='studsa'),
    dict(namn='groten', extra='anga', bild=R + 'risgrynsgrot/cut/risgrynsgrot.png', bg=(246, 214, 190), hojd=1.0, yfast=1.0,
         snitt=dict(y=0.45, topp=0.62, botten=(0.33, 0.67), agare=dict(h1=0)),
         ordning=[(3, 'groten-blatt', '[curious] Något blått.'), (2, 'groten-prickar', '[curious] Små vita prickar.'),
                  (4, 'groten-runt', '[curious] Något runt.'), (1, 'groten-sked', '[excited] En sked!'),
                  (0, 'groten-smor', '[excited] Smör och kanel!')],
         svar=('risgrynsgrot', '[excited] Risgrynsgröt!'), levande='gunga', ljud='mums'),
    dict(namn='julskinkan', extra='anga', bild=R + 'julskinka/cut/julskinka.png', bg=(200, 226, 238), hojd=1.0, yfast=0.35, bredd=1.15, xfast=0.9,
         snitt=dict(y=0.52, topp=0.55, botten=(0.33, 0.70)),
         ordning=[(0, 'julskinkan-gult', '[curious] Något gult.'), (2, 'julskinkan-rosa', '[curious] Och rosa.'),
                  (1, 'julskinkan-rutor', '[curious] Rutor!'), (3, 'julskinkan-gult-rosa', '[curious] Gult och rosa …'),
                  (4, 'julskinkan-ben', '[excited] Ett litet ben!')],
         svar=('en-julskinka', '[excited] En julskinka!'), levande='gunga', ljud='mums'),
    dict(namn='kalken', riktning=-1, bild=B + 'kalke.png', bg=(222, 208, 238), hojd=1.0, yfast=0.5,
         snitt=dict(y=0.45, topp=0.50, botten=(0.30, 0.60)),
         ordning=[(1, 'kalken-brunt', '[curious] Något brunt.'), (2, 'kalken-snore', '[curious] Ett snöre.'),
                  (0, 'kalken-bradar', '[curious] Brädor av trä.'), (4, 'kalken-medar', '[excited] Två medar!'),
                  (3, 'kalken-boj', '[excited] En böj!')],
         svar=('en-kalke', '[excited] En kälke!'), levande='kora', ljud='glid'),
]

FILMER = {
    'pussel-vanliga': ['applet', 'bilen', 'kaninen', 'kon', 'grisen', 'katten', 'hunden', 'traktorn', 'flygplanet', 'brandbilen', 'baten'],
    'pussel-jul': ['pepparkakan', 'julgranen', 'tomten', 'tomteluvan', 'snoflingan', 'snogubben', 'julklappen', 'groten', 'julskinkan', 'kalken'],
    'pussel-lucka-13': ['pepparkakan', 'tomten', 'kalken'],   # julkalenderns lucka 13 (Sanna 2026-11-17: tre pussel i stället för Lucia)
}


def anslut(PUSSEL, REPLIKER, FILMER_UT):
    """Lägger in pusslen ovan i motorns listor (de nya ersätter gamla med samma namn)."""
    namn = {p['namn'] for p in NYA}
    PUSSEL[:] = [p for p in PUSSEL if p['namn'] not in namn]
    for p in NYA:
        q = dict(p)
        for _, rid, text in p['ordning']:
            REPLIKER[rid] = text
        REPLIKER[p['svar'][0]] = p['svar'][1]
        q['ordning'] = [(bit, rid) for bit, rid, _ in p['ordning']]
        q['svar'] = p['svar'][0]
        PUSSEL.append(q)
    FILMER_UT.update(FILMER)
