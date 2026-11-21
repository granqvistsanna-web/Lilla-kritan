# 049 Kaninen går till tandläkaren – QA (grind 6, 2026-11-21)

Djup QA av kodscenen (`scener/mottagningen/`) efter feedback 1 (commit `22b80386`: tvådelad stol, riggarmen håller verktygen, tandläkaren 70 px närmare). Två stillbilder per rad (start och slut), alltså bilden på båda sidor om varje klipp, plus kontroll i kod av rader, röster och effekter.

## Ljud och tider (kontroll i kod)

- Alla röstfiler och effekter finns. Ingen replik går ut över sin rad, inga repliker överlappar och alla repliker används.
- Frågorna till barnet har 4–5 s paus. Före *"Tack!"* är pausen 2,5 s.
- Inga djurnamn i det som sägs. Tandläkaren säger bara `doktor-*`-ljud.

## Bild – hittat och rättat

| Rad | Fel | Rättning |
|---|---|---|
| Tandläkarens huvud | En liten mörk prick och vita nypor vid hakan (lösa pixlar längst ner i huvudurklippet) | Pixlarna under hakan som inte är hud är borttagna i `doktorn-b-head-nk.png` |
| Tandläkarens huvud | Vid riktningen (23b, frågetecknet) förskjuts hela huvudet 36 px, så att det ser påklistrat ut | Huvudet flyttas 24 px och ansiktet glider 12 px till inuti håret, så att det läses som en vändning (`uttryck.html`) |
| 16a | Spegeln och kritan ritades över tandläkarens ansikte (hon står närmare nu) | Spegeln ritas på den tomma väggen till höger om henne, och kritan väntar där |
| 31a, 31b | Tanden och kritan ritades över tandläkarens rock | Tanden ritas till vänster om kaninen, vid örat. Kritan kommer in, väntar och går ut åt vänster |
| 13 | Lampan såg avskuren ut i första QA:n | Med den nya stolen syns hela lampan och skenet landar på kaninen. Ingen ändring |

## Kvar att titta på i rörelse

- Huvudets nya vändning (23b, 25b) i full fart.
- Tanden som flyger från luften till magen (31b → 32) går nu från vänster.

## Feedback 2 (2026-11-21)

- 1:31 Stolen är 88 % stor, så sätet sitter ca 50 px lägre från början och kaninen hamnar inte så högt när stolen åker upp. Kolven skalas med.
- Tandläkarens tandborste är röd (`RODBORSTE`) och sitter djupt i fickan, bara huvudet och en bit skaft syns. Kaninens egen tandborste i tankebubblan är mint.
- 3:17 Bubblorna: först tandläkarens pratbubbla med frågan (godis ?, tandborste sol måne ?) i 25b och 25d, sedan kaninens tankebubbla med svaret i 25c och 25e (halvbild så att molnet får plats över stolsryggen). Vit kant, mörk kritlinje, poppar fram med liten översväng, tankeprickarna en i taget, gungar lugnt och krymper bort.
