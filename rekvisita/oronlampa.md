# Öronlampan

Doktorns öronlampa i 046 Kaninen går till doktorn, **ritad i kod** (Sanna 2026-11-20), ingen Flow-bild. Ett rakt handtag i turkos (`#2fa39b`, samma som doktorns kläder under rocken) med fyra räfflor, en silverfärgad ring, ett vitt rundat huvud och en grå tratt som pekar åt höger. Lampan tänds i trattens spets: en gul prick (`#ffd84a`) som växer, och tre korta gula streck när den lyser helt. Inget sken eller glöd. Platt färg med kritkorn (`#ds-korn`), ingen mörk kontur, vit klistermärkeskant.

**Kod:** `assets/rekvisita/doktorssaker/doktorssaker.js`
- `DS.oronlampa({ x, y, vinkel, ljus })`: greppet mitt på handtaget i (x, y); `ljus` 0–1 tänder lampan (över ca 0,4 s).
- Enheterna är doktorns 1024-ruta. I riggen ligger den i `.figuren` och får doktorns `#dkant`, i en närbild `kant.lagg(g, { andel: 0.01 })`.

**I 046:** rad 16 (närbild: handen glider in med öronlampan, ljuset tänds) och när doktorn tittar i kaninens öra.

Provark: `assets/rekvisita/doktorssaker/doktorssaker.html` (`?narbild=lampa`).
