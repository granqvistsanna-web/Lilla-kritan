# Blå hinken

En blå sandhink av plast från sidan. Kroppen smalnar lite nedåt, upptill en rundad kant, och över öppningen ett tunt blått handtag i en båge med luft under. En vit glansrand på sidan. Inget ansikte och inga konturer. Gjord i Google Flow (Nano Banana) med röda bilen och rosa bilen som stilreferens. Den följer teckningen i Shorten, så att barnet känner igen den när teckningen blir hinken.

Utklippet (`cut/hink-bla.png`) har luften under handtaget genomskinlig.

Används i: Gissa teckningen – hink (Shorts).

```prompt
A single small toy sand bucket for the beach, side view, like a small prop: one slightly lopsided hand-drawn tapered bucket shape, wide at the top and a bit narrower at the flat bottom, a rounded rim band across the top, no black outline, filled with bright clear blue wax crayon (#4696D2, sky blue, not dark navy, not purple) with a mottled, grainy, slightly streaky texture and visible paper grain, with only a thin uneven white rim around its edge. A thin curved blue handle arches up over the opening, attached at both ends of the rim, with clear empty white space inside the arch. One simple white crayon highlight stroke on the body. No sand, no spade, no face, no text. Very simple, bold, for 2-year-olds. Centered on a pure solid white background, no shadow, no ground, no text.
```

**Konturen (2026-11-22, för 050 Kaninen bygger torn):** `assets/rekvisita/hink-bla/cut/hink-bla-kontur.json` (`verktyg/kontur.py … --krymp 8 --mitt`, 59 stödpunkter, bbox [163, 70, 700, 878], mitt [513, 637]). Bara ytterkonturen såg ut som en kupol, så `drag` har tre drag i ritordning: ytterkonturen, hålet under handtaget (handtagets insida och kantens överkant, ur alfans hål vidgat 8 px) och kantbandets underkant (`M215 470 C400 477 620 471 812 462`). Kritan ritar `ritBana(K.drag)`. **Kanten:** 8 px = 0,9 % av höjden (863 px), ingen `-tunn` behövs.
Används också i: 050 Kaninen bygger torn i snön (kritan ritar den, tornen har dess form).
