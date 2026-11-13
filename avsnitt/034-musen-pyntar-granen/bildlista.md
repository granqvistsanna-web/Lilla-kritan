# Bildlista och ljudlista – Avsnitt 034 Musen pyntar granen

Vad avsnittet behöver, vad som redan finns och vad som ska göras. Inget av det nya är gjort än (2026-11-13). **En ny bild behövs: vardagsrummets platta.** Allt annat finns.

## Figur

| Vad | Finns | Behöver göras |
|---|---|---|
| Musen Mille, v2-rigg (`assets/karaktarer/musen-mille/premium/uttryck.html`, `cut/`, `mille-rigg.json`) | ✅ referensark klart, v2 sedan 2026-11-07 | **Tunna kanter:** riggen har inget `cut-tunn/`. Lämnas som den är (figuren är låst); mät kanten i scenen och ta upp det med Sanna om den ser tjock ut |
| Poser: gång, vinka, kantklapp, riktningspose, kawaii | ✅ i riggen | — |
| Böja sig ner mot golvet | som kaninen i 022 (sjunk + lut i scenen) | provas i scenen |
| Arm upp med en sak i handens spets | vinkningens arm bakom kroppen + saken i spetsen (som tvålen i 020) | provas, se storyboardens prov 2 |
| Musens ansikte i kulan | — | i kod: riggens ansikte i liten skala i en `clipPath`-cirkel, lite ljusare. Provbild före grind 5 |

## Plats

| Vad | Finns | Behöver göras |
|---|---|---|
| Vardagsrummet, 16:9 | — | **ny platta**, Google Flow (Nano Banana), 2 färger × 2 tagningar, prompt i [platsen.md](platsen.md). Sanna väljer. Sedan `bakgrunder/vardagsrummet.md` + README-rad |
| Snö utanför fönstret | — | i kod: lugna runda flingor bakom fönsterramen, kvällshimmel, några landar på fönsterblecket |

## Saker

| Sak | Finns | Behöver göras |
|---|---|---|
| Julgranen utan pynt (`assets/rekvisita/julgran/cut/julgran.png`, kontur `julgran-kontur.json`) | ✅ (julkalendern) | ✅ kanten mätt: 8 px på 862 px (0,9 %), behålls. Granen står där från början |
| Julgransfoten (`assets/rekvisita/julgransfot/cut/julgransfot.png`) | ✅ (julkalendern) | ✅ **gjort 2026-11-13:** kanten var 12 px på en 387 px hög sak (3 %). `julgransfot-tunn.png` bredvid (`tunn_kant.py 4`, ca 1 %), kollad mot mörkblått. 034 använder den tunna; julkalendern är orörd |
| Julkulan, röd (`assets/rekvisita/julkula/cut/julkula.png`, kontur `julkula-kontur.json`, ögla i (510,8, 159,7)) | ✅ (julkalendern lucka 7) | gul och blå **tonas i kod** (rekvisitafilen säger att det går). ✅ kanten mätt: 9 px på 853 px (1,1 %), behålls. Kritan ritar konturen tre gånger |
| Gula stjärnan (`assets/rekvisita/stjarna-gul/cut/stjarna-gul.png`, kontur) | ✅ (julkalendern lucka 1) | inget ansikte i 034. ✅ kanten mätt: 8 px på 763 px (1,0 %), behålls. Kritan ritar konturen |
| Ljusslingan (`ljusslinga.png`) | ✅ | **används inte** i förslaget. Möjlig extra belöning (fråga 5) |
| Pallen | ✅ | används inte (stjärnan glider upp på barnets "upp!") |

Ingen ny sak ska göras med Sanna (grind 2 blir bara kantmätningen), om inte fråga 1 eller 5 ändrar det.

## Ljud

| Ljud | Finns | Behöver göras |
|---|---|---|
| Malins 36 repliker | — | **ElevenLabs**, Malin, v3, en tagning ur blocket i `manus.md` (ca 2 min tal, tecken ur kontot). Delas med `dela-tagning.py` mot `rost.txt` till `assets/ljud/roster/musen-pyntar-granen/`. Grind 3 |
| Musens röst | ✅ `mus-pip` 1–9 (korta pip från 019, ingen README-rad) | lyssna igenom och lägg på känslorna. Saknade känslor som ny familj `mus-gullig` (ElevenLabs Sound Effects, 4 tagningar per känsla, provlyssningsfil). Grind 4. Kostar tecken: fråga först |
| `mus-fniss` (långt sjungande fniss, 2,5–3,5 s) | — | ElevenLabs, som `noff-fniss`. Grind 4 |
| Kritan ritar | ✅ `krita-ritar` | — |
| Saken fylls i | ✅ `glitter` | — |
| Kulan sätter sig i granen, "pling" | ✅ `ding` (en liten klocka, en sak är på plats) | lyssna att den låter som glas och inte som en dörrklocka; annars Openverse "glass bauble tink" (CC0/BY) |
| Glimt, skimmer, stjärnan landar | ✅ `tindra-3`/`4` (inte 1/2, de är platshållare) | — |
| Kulan rullar | ✅ `rull` (en ärta på trägolv, loop) | lågt, kolla att det inte låter som en sten |
| Stjärnan glider upp | ✅ `swoosh` | mjukt, lågt |
| Fotsteg, skutt | ✅ `steg`, `tass`, `hopp-mjuk`, `landa-mjuk` | — |
| Klapp | ✅ `tass-klapp-tre` | — |
| Ritintrots matta | ✅ `skogsljud` | — |
| Rummets matta | ✅ `hemmaljud` (en klocka tickar i ett tyst rum, CC0) | låg och lugn. **Inte `brasa`:** Sanna avvisade den i julkalendern ("odd background noise", ingen brasa i bild) |
| Musik | — | ingen ny musik (minnesregeln). Ingen matta, som i 020–024 |
| Intro | ✅ `produktion/youtube/bilderbok-intro/` | — |

## Används inte

- `glas-klirr` (kulan går sönder): inget går sönder i 034.
- `brasa`: avvisad.

## Produktion efter grind 1 (påminnelse)

Mappen är bara en plan. När Sanna sagt ja: kopiera kodstrukturen från 020/022 (`storyboard/rader.mjs`, `bygg.mjs`, `scen.html`, `scener/render.mjs`, `scener/<plats>/index.html`, `film/rendera.sh`, `film/satt-ihop.sh`) enligt receptet avsnitt 8, skriv de riktiga ljuden direkt i `rader.mjs` (inget `BYT`/`GLADARE`), och lägg till avsnittet i `harriets-favoriter.md` (görs av huvudsessionen).
