# Tittut – ljud att göra

Inköpslistan för röstbanken och ljudeffekterna i Tittut. Formatet står i [`format/tittut.md`](../../../format/tittut.md). Omskriven 2026-11-06 för riktig tittut: borta, paus, tittut. Inget blunda, ingen räkning och inget letande.

## Röst (ElevenLabs)

Samma berättarröst och inställningar som i Gissa teckningen: Multilingual v2, stability 0,6, similarity 0,8, style 0, speaker boost på, speed 0,9. Rader med ljudtagg inom hakparentes görs med Eleven v3. Varm och lekfull, aldrig skrämmande. Klipp bort tystnaden och exportera m4a.

Filerna läggs i `assets/ljud/roster/tittut/`. Varje delad replik kan finnas i upp till fem varianter. En film använder samma variantnummer genom hela filmen, och om en variant saknas används en annan som finns. **Variant 1 av varje räcker för första filmen.**

### Delade repliker

**Borta!** (när figuren glider ner bakom saken, lite hemlighetsfullt)

| Fil | Text | Status |
|---|---|---|
| `borta-1.m4a` | `[whispers] Borta!` | **finns** |
| `borta-2.m4a` | `[playful] Borta!` | **finns** |
| `borta-3.m4a` | `[whispers] Borta… borta…` | saknas |
| `borta-4.m4a` | `[playful] Oj! Borta!` | **finns** |
| `borta-5.m4a` | `[whispers] Borta… var tog du vägen?` | **finns** |

**Tittut!** (glatt och lite överraskat, en liten paus mellan "Titt" och "ut")

| Fil | Text | Status |
|---|---|---|
| `tittut-1.m4a` | `[excited] Titt… ut!` | saknas |
| `tittut-2.m4a` | `[excited] Tittut!` | **finns** |
| `tittut-3.m4a` | `[laughs] Tittut!` | **finns** |
| `tittut-4.m4a` | `[surprised] Titt… ut! Där är du!` | **finns** |
| `tittut-5.m4a` | `[excited] Tittuuut!` | saknas |

**Hej då!**

| Fil | Text | Status |
|---|---|---|
| `hej-da-1.m4a` | `[warm] Hej då!` | saknas |
| `hej-da-2.m4a` | `[warm] Hej då! Vi leker igen snart.` | saknas |
| `hej-da-3.m4a` | `[warm] Hej då! Tittut en annan gång.` | saknas |
| `hej-da-4.m4a` | `[warm] Hej då! Vi ses snart.` | saknas |

Varianterna säger aldrig *hon/han* eller en plats, så att alla passar alla figurer och platser (ändrat 2026-11-06).
| `hej-da-5.m4a` | `[warm] Hej hej!` | saknas |

### Valfria repliker (2:30-filmerna, mindre upprepning)

Motorn hoppar över det som saknas. Flera tagningar av samma rad (`-1`, `-2`, `-3`) turas om.

| Fil | Text | Status |
|---|---|---|
| `lek-1.m4a` | `[warm] Ska vi leka tittut?` | saknas |
| `igen-1.m4a` | `[excited] En gång till!` | saknas |
| `borta-igen-1.m4a` | `[playful] Borta igen!` | saknas |
| `borta-igen-2.m4a` | `[whispers] Borta igen…` | saknas |
| `jag-sag-nagot-1.m4a` | `[whispers] Jag såg något…` | saknas |
| `dar-ar-du-1.m4a` | `[excited] Där är du!` | saknas |
| `dar-ar-du-2.m4a` | `[laughs] Där är du ju!` | saknas |
| `busig-1.m4a` | `[laughs] Vad busig du är!` | saknas |
| `busig-2.m4a` | `[playful] Busigt!` | saknas |
| `slut-1.m4a` | `[warm] Nu är leken slut.` | saknas |

"Hmm" lånas från Gissa teckningen (`assets/ljud/roster/hmm-1/3/4`).

### Per figur (spelas in en gång, används i alla filmer)

| Fil | Text | Status |
|---|---|---|
| `kanin-hej.m4a` | `[excited] Hej kaninen!` | **finns** |
| `kanin-var.m4a` | `[curious] Var är kaninen?` | **finns** |
| `lamm-hej.m4a` | `[excited] Hej lammet!` | **finns** |
| `lamm-var.m4a` | `[curious] Var är lammet?` | **finns** |
| `ko-hej.m4a` | `[excited] Hej kon!` | **finns** |
| `ko-var.m4a` | `[curious] Var är kon?` | **finns** |
| `leopard-hej.m4a` | `[excited] Hej leoparden!` | **finns** |
| `leopard-var.m4a` | `[curious] Var är leoparden?` | **finns** |
| `lejon-hej.m4a` | `[excited] Hej lejonet!` | **finns** |
| `lejon-var.m4a` | `[curious] Var är lejonet?` | **finns** |
| `kanin-hejda.m4a` | `[warm] Hej då kaninen!` | saknas |
| `lamm-hejda.m4a` | `[warm] Hej då lammet!` | saknas |
| `ko-hejda.m4a` | `[warm] Hej då kon!` | saknas |
| `leopard-hejda.m4a` | `[warm] Hej då leoparden!` | saknas |
| `lejon-hejda.m4a` | `[warm] Hej då lejonet!` | saknas |

### Figurens ljud när den tittar fram

| Figur | Ljud | Status |
|---|---|---|
| Kanel | `fniss` | finns |
| Ludde | `ba` | finns |
| Kajsa | `mu` | finns |
| Lova | `spinn` | finns |
| Lage | `lejon-skratt` | saknas, se ljudeffekterna |

### Strukna repliker

De här hörde till kurragömma-upplägget och används inte längre. Filerna som redan är gjorda ligger kvar i `assets/ljud/roster/tittut/`, men motorn använder dem inte: `blunda-1.m4a`, `dar-1.m4a` och `inte-dar-1.m4a`. Räkna ("Ett, två, tre!") och "Nu får du blunda!" behöver inte göras.

## Ljudeffekter (ElevenLabs SFX, 1,5–2 s)

Det här finns redan i `assets/ljud/effekter/`: `fniss` (Kanel när hon tittar fram), `duns` (det lilla hoppet), `pop` (när hon kommer fram), `swoosh` (när hon glider ner) och `skogsljud` (platsljudet).

Saknas (de markerade **finns** kommer från Openverse 2026-11-06, källor och licenser i `assets/ljud/effekter/README.md`; gardinen och täcket använder `prassel-tyg`):

| Fil | Används till | Prompt |
|---|---|---|
| `prassel-buske` **finns** | `skakar`: busken rör sig lite under pausen | `a small leafy bush rustling gently twice, soft leaves shaking, close, outdoors, no music, no voice` |
| `prassel-lov` **finns** | lövhögen när figuren kommer upp ur den (skogen 2) | `a pile of dry autumn leaves rustling and scattering softly, close, outdoors, no music, no voice` |
| `prassel-ho` **finns** | höstacken skakar (bondgården) | `dry hay rustling softly twice, a few straws falling, close, indoors barn, no music, no voice` |
| `prassel-tyg` **finns** | gardinen och täcket skakar (hemma) | `soft fabric rustling gently once, a curtain swaying, close, indoors, no music, no voice` |
| `spinn-fniss` | Lova: det busiga småljudet efter hej och vid tittut (Tittut 3, tyst tills det finns) | `a small friendly cartoon leopard cub giving a short soft playful purring giggle, cute and gentle, not scary, no music, no voice` |
| `lejon-skratt` | Lage när han tittar fram | `a big friendly cartoon lion giving a short soft deep happy chuckle, warm and gentle, not scary, no music` |

### Platsljud (ElevenLabs SFX, ca 60 s som går runt)

| Fil | Plats | Prompt |
|---|---|---|
| `gardsljud/gardsljud-1` **finns** | bondgården | `quiet countryside farmyard ambience, soft distant birdsong, a light breeze, an occasional faraway hen clucking, calm and gentle, no music, no voice, seamless loop` |
| `lekplatsljud/lekplatsljud-1` **finns** | lekplatsen | `a calm quiet park playground, soft distant birdsong, a gentle breeze in the trees, now and then a swing creaking softly far away, no children's voices, no music, no talking` |
| `hemmaljud/hemmaljud-1` **finns** | hemma | `a quiet cosy living room in the daytime, a soft clock ticking slowly far away, faint birds outside a closed window, very calm and soft, no music, no voice, no TV` |

| `angsljud/angsljud-1` saknas | ängen (Tittut 3) | `a sunny summer meadow ambience, soft distant birdsong, gentle buzzing of a bee now and then, a light breeze in tall grass, calm and gentle, no music, no voice, seamless loop` |

Skogen och skogen 2 använder `skogsljud`, som redan finns. När `angsljud` finns läggs `angen: 'angsljud/angsljud-1'` till i `PLATSLJUD` i `tittut.js`.

## Att göra till första filmen

1. `borta-1`: [whispers] Borta!
2. `hej-da-1`: [warm] Hej då!

Allt annat som behövs finns redan.
