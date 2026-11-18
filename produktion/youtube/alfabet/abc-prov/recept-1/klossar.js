// Bokstavsklossar för Ljudjakten (format/alfabet.md): träklossar i three.js, i en egen genomskinlig canvas ovanpå scenen.
// Klossen har trä med kritkorn och en ram på varje sida; framsidan kan få en bokstav som kritan ritar drag för drag.
// Kritan bor också här (ovanpå klossarna), styrd i skärmens pixlar.
//   const K = await bokstavsklossar(canvas, [{ fram: 'A', farg: '#E5302A', drag: [[[x, y], [x, y]], …], rund: 0.12 }, { sidor: 'BC' }, …])
//     rund: rundade kanter (andel av sidan, valfri; Kritans ABC använder 0,12); text: true ritar sidornas bokstäver med typsnitt
//     platta: ramfärg (valfri) – framsidan får en målad, krämvit platta med rundade hörn och en ram i den färgen (alfabetskloss);
//       då blir bokstaven tjock och rund, utan vit kant, med kritkorn. skala: bokstavens storlek (standard 1; 0,74 passar plattan).
//       tra: 'mer' ger tydligare ådring, breda årsband och en kvist eller två (valfri; standard som förut)
//       klister: true – bara plattan som ett platt klistermärke med vit kant (inget trä, inga sidor; använd rund: 0)
//       djup: klossens djup som andel av sidan (valfri, standard 1; 0,14 ger en tunn bokstavsplatta som hänger på väggen)
//       bakgrund: plattans färg (valfri, standard krämvit). Utan fram blir det en bildkloss: bara plattan, bilden läggs ovanpå i scenen (K.skarm ger var framsidan är)
//   K.rita({ klossar: [{ x, y, z, s, rx, ry, rz, sx, sy, syns, k }], krita: { x, y, syns } | { kloss, u, v, syns }, dx, opacitet, kam })
//     kam (valfri): { x, y, zoom } – kameran tittar på (x, y) i scenens px med zoom (1 = hela bilden); K.skarm ger då punkter i bilden
//     x, y = mitten i skärmens px, z = mot kameran (px), s = sidan i px (på z 0), r* = radianer, sy/sx = tryck (1 = inget),
//     k = hur mycket av bokstaven som är ritad (0–1, dragen i tur och ordning)
//   K.skarm(i, u, v) → [x, y] i skärmen för punkten (u, v) på kloss i:s framsida (−0,5 … 0,5, v uppåt)
// Bokstavens drag är i bokstavens egna mått, rutan −260 … 260 × −330 … 330 (som A:et i a-film), som fyller 78 % av sidan.
async function bokstavsklossar(cv, def) {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true, premultipliedAlpha: true });
  R.setPixelRatio(1); R.setSize(1920, 1080, false); R.outputColorSpace = THREE.SRGBColorSpace; R.setClearColor(0, 0); R.autoClear = false;
  const D = 540 / Math.tan(Math.PI / 12), cam = new THREE.PerspectiveCamera(30, 16 / 9, 10, 8000);
  const scen = new THREE.Scene();
  scen.add(new THREE.AmbientLight(0xffffff, 1.9));
  const sol = new THREE.DirectionalLight(0xfff4e6, 1.5); sol.position.set(-0.5, 0.9, 1); scen.add(sol);
  const slump = f => () => { f = (f * 16807) % 2147483647; return f / 2147483647; };

  // trä: varm grund, ådring, kritkorn, en mörkare ram och en ljus linje innanför
  const PX = 512, TRAV = 0.78 * PX / 660;
  const tra = (frö, ton = 0, mer = false) => { const c = document.createElement('canvas'); c.width = c.height = PX; const g = c.getContext('2d'), r = slump(frö);
    const gr = g.createLinearGradient(0, 0, 0, PX); gr.addColorStop(0, ton ? '#E3B474' : '#E8BC80'); gr.addColorStop(1, ton ? '#D29A5E' : '#D9A066');
    g.fillStyle = gr; g.fillRect(0, 0, PX, PX);
    if (mer) {   // mer trä: breda, mjuka årsband, tydlig ådring som böjer sig runt en kvist, och fina strimmor
      const kv = [[PX * (0.2 + r() * 0.6), PX * (0.2 + r() * 0.6), 10 + r() * 8]];
      if (r() < 0.5) kv.push([PX * (0.15 + r() * 0.7), PX * (0.15 + r() * 0.7), 6 + r() * 5]);
      const bojd = (x, y) => kv.reduce((d, [kx, ky, kr]) => { const dx = x - kx, dy = y - ky, a = Math.exp(-(dx * dx) / (2 * (kr * 5) ** 2));
        return d + Math.sign(dy || 1) * a * kr * 3 * Math.exp(-Math.abs(dy) / (kr * 4)); }, 0);
      for (let i = 0; i < 9; i++) { const y = r() * PX, f = 0.003 + r() * 0.006, p = r() * 6;
        g.strokeStyle = `rgba(${r() < 0.5 ? '150,95,45' : '255,225,180'},${0.08 + r() * 0.08})`; g.lineWidth = 10 + r() * 22; g.beginPath();
        for (let x = 0; x <= PX; x += 8) g.lineTo(x, y + 8 * Math.sin(x * f + p) + bojd(x, y)); g.stroke(); }
      for (let i = 0; i < 46; i++) { const y = r() * PX, a = 3 + r() * 8, f = 0.004 + r() * 0.01, p = r() * 6;
        g.strokeStyle = `rgba(120,72,30,${0.12 + r() * 0.22})`; g.lineWidth = 1 + r() * 2.6; g.beginPath();
        for (let x = 0; x <= PX; x += 6) g.lineTo(x, y + a * Math.sin(x * f + p) + bojd(x, y)); g.stroke(); }
      for (const [kx, ky, kr] of kv) for (let j = 4; j >= 1; j--) {   // kvisten: mörk kärna och några ringar
        g.strokeStyle = `rgba(110,62,25,${0.12 + 0.07 * (4 - j)})`; g.lineWidth = 2.5; g.beginPath(); g.ellipse(kx, ky, kr * j * 0.9, kr * j * 0.45, 0, 0, 2 * Math.PI); g.stroke();
        if (j === 1) { g.fillStyle = 'rgba(105,58,22,.45)'; g.fill(); } }
      for (let i = 0; i < 160; i++) { const x = r() * PX, y = r() * PX, l = 10 + r() * 40;   // fina strimmor längs fibrerna
        g.strokeStyle = r() < 0.5 ? 'rgba(255,238,205,.18)' : 'rgba(110,65,28,.14)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l, y + (r() - 0.5) * 2); g.stroke(); }
    }
    for (let i = 0; i < (mer ? 0 : 26); i++) { const y = r() * PX, a = 4 + r() * 10, f = 0.004 + r() * 0.01, p = r() * 6;
      g.strokeStyle = `rgba(138,90,42,${0.06 + r() * 0.1})`; g.lineWidth = 1 + r() * 3; g.beginPath();
      for (let x = 0; x <= PX; x += 8) g.lineTo(x, y + a * Math.sin(x * f + p)); g.stroke(); }
    for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? 'rgba(255,240,215,.22)' : 'rgba(120,75,35,.12)'; g.fillRect(r() * PX, r() * PX, 1 + r() * 2, 1 + r() * 2); }
    const ram = (b, f) => { g.strokeStyle = f; g.lineWidth = b; g.beginPath(); g.roundRect(b / 2 + 4, b / 2 + 4, PX - b - 8, PX - b - 8, 34); g.stroke(); };
    ram(20, 'rgba(160,100,45,.55)'); g.strokeStyle = 'rgba(255,236,200,.6)'; g.lineWidth = 5; g.beginPath(); g.roundRect(30, 30, PX - 60, PX - 60, 24); g.stroke();
    return c; };
  // ett drag med kritkorn: vit kant under, färgen över, små hål i vaxet
  const bokstav = (g, drag, farg, k, liten = 1) => { g.save(); g.translate(PX / 2, PX / 2); g.scale(TRAV * liten, TRAV * liten); g.lineCap = 'round';
    const n = drag.length, lag = (b, f) => { g.strokeStyle = f; g.lineWidth = b;
      drag.forEach(([a, c], i) => { const u = Math.min(1, Math.max(0, k * n - i)); if (u <= 0) return; g.beginPath(); g.moveTo(...a); g.lineTo(a[0] + (c[0] - a[0]) * u, a[1] + (c[1] - a[1]) * u); g.stroke(); }); };
    lag(104, '#fff'); lag(68, farg); g.restore(); };
  // den målade plattan på framsidan: krämvit, rundade hörn, färgad ram och en tunn skugga innanför ramen
  const platta = (g, farg, bak = '#FFF6E3') => { const m = PX * 0.1, w = PX - 2 * m; g.save();
    g.shadowColor = 'rgba(90,55,20,.35)'; g.shadowBlur = 6; g.shadowOffsetY = 3;
    g.fillStyle = farg; g.beginPath(); g.roundRect(m, m, w, w, 54); g.fill(); g.restore();
    g.fillStyle = bak; g.beginPath(); g.roundRect(m + 20, m + 20, w - 40, w - 40, 38); g.fill();
    g.strokeStyle = 'rgba(160,110,60,.18)'; g.lineWidth = 4; g.beginPath(); g.roundRect(m + 22, m + 22, w - 44, w - 44, 36); g.stroke(); };
  // klistermärke: plattan utan trä, med en vit klistermärkskant runt om (resten genomskinligt)
  const klister = (farg, bak) => { const c = document.createElement('canvas'); c.width = c.height = PX; const g = c.getContext('2d'), m = PX * 0.1 - 18;
    g.fillStyle = '#fff'; g.beginPath(); g.roundRect(m, m, PX - 2 * m, PX - 2 * m, 72); g.fill(); platta(g, farg, bak); return c; };
  // tjock, rund bokstav utan vit kant, med kritkorn: ritas på en egen duk och får ljusa och mörka korn bara på strecket
  const tjockDuk = document.createElement('canvas'); tjockDuk.width = tjockDuk.height = PX;
  const tjock = (g, drag, farg, k, liten) => { const t = tjockDuk.getContext('2d'), r = slump(5); t.clearRect(0, 0, PX, PX);
    t.save(); t.translate(PX / 2, PX / 2); t.scale(TRAV * liten, TRAV * liten); t.lineCap = t.lineJoin = 'round';
    const n = drag.length, lag = (b, f, dx = 0, dy = 0) => { t.strokeStyle = f; t.lineWidth = b;
      drag.forEach(([a, c], i) => { const u = Math.min(1, Math.max(0, k * n - i)); if (u <= 0) return; t.beginPath(); t.moveTo(a[0] + dx, a[1] + dy); t.lineTo(a[0] + (c[0] - a[0]) * u + dx, a[1] + (c[1] - a[1]) * u + dy); t.stroke(); }); };
    lag(132, farg); lag(126, farg, 4, -3); t.restore();
    t.globalCompositeOperation = 'source-atop';   // kritkornen: bara där det finns färg
    for (let i = 0; i < 2200; i++) { t.fillStyle = r() < 0.55 ? 'rgba(255,235,215,.32)' : 'rgba(110,20,15,.16)'; t.fillRect(r() * PX, r() * PX, 1 + r() * 2.5, 1 + r() * 2.5); }
    for (let i = 0; i < 26; i++) { const y = r() * PX; t.strokeStyle = 'rgba(255,230,210,.16)'; t.lineWidth = 2 + r() * 2; t.beginPath(); t.moveTo(0, y); t.lineTo(PX, y - 40 + r() * 80); t.stroke(); }
    t.globalCompositeOperation = 'source-over'; g.drawImage(tjockDuk, 0, 0); };
  const BOKSTAV_SIDA = { B: [[[-150, -260], [-150, 250]], [[-150, -260], [80, -230]], [[-150, 0], [100, 20]], [[-150, 250], [110, 230]]],
    C: [[[150, -200], [-150, -60]], [[-150, -60], [-140, 120]], [[-140, 120], [150, 220]]] };   // enkla kantiga former, bara pynt på sidorna

  const klossar = def.map((d, i) => {
    const sidor = [...Array(6)].map((_, j) => { const c = tra(11 + i * 7 + j, j % 2, d.tra === 'mer'); const s = d.sidor?.[j % d.sidor.length];
      const farg = ['#3B7FE0', '#3FA34D', '#F2B533'][j % 3];
      if (s && j !== 4 && d.text) { const g = c.getContext('2d'); g.font = `${PX * 0.5}px "Arial Rounded MT Bold", "Arial Black", sans-serif`;   // text: riktiga bokstäver på sidorna
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 26; g.strokeStyle = '#fff'; g.strokeText(s, PX / 2, PX / 2 + 8);
        g.fillStyle = farg; g.fillText(s, PX / 2, PX / 2 + 8); }
      else if (s && j !== 4 && BOKSTAV_SIDA[s]) bokstav(c.getContext('2d'), BOKSTAV_SIDA[s], farg, 1, 0.7);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; });
    const fram = (d.fram || d.platta) && { bas: d.klister ? klister(d.platta, d.bakgrund) : tra(11 + i * 7 + 4, 0, d.tra === 'mer'), c: document.createElement('canvas'), k: -1 };
    if (fram && d.platta && !d.klister) platta(fram.bas.getContext('2d'), d.platta, d.bakgrund);
    if (fram) { fram.c.width = fram.c.height = PX; sidor[4] = new THREE.CanvasTexture(fram.c); sidor[4].colorSpace = THREE.SRGBColorSpace; sidor[4].anisotropy = 4; }
    // rund: rundade kanter (andel av sidan), som en riktig träkloss; varje punkt läggs på en rundad låda kring den inre lådan
    let geo = new THREE.BoxGeometry(1, 1, 1);
    if (d.rund) { const r = d.rund, h = 0.5 - r, n = 24; geo = new THREE.BoxGeometry(1, 1, 1, n, n, n);
      const pos = geo.attributes.position, nor = geo.attributes.normal, p = new THREE.Vector3(), c = new THREE.Vector3();
      for (let j = 0; j < pos.count; j++) { p.fromBufferAttribute(pos, j); c.set(Math.max(-h, Math.min(h, p.x)), Math.max(-h, Math.min(h, p.y)), Math.max(-h, Math.min(h, p.z)));
        p.sub(c).normalize(); nor.setXYZ(j, p.x, p.y, p.z); p.multiplyScalar(r).add(c); pos.setXYZ(j, p.x, p.y, p.z); } }
    const m = new THREE.Mesh(geo, sidor.map(t => new THREE.MeshLambertMaterial({ map: t, transparent: true })));
    if (d.klister) m.material.forEach((mt, j) => { if (j !== 4) mt.visible = false; });   // bara framsidan syns
    scen.add(m); return { d, m, fram, tex: sidor[4] };
  });

  // kritan: samma bild som i scenerna, spetsen [742, 132], lutad 125°, skala 0,4, i en ortografisk scen ovanpå
  const kritaScen = new THREE.Scene(), orto = new THREE.OrthographicCamera(0, 1920, 0, -1080, -10, 10);
  const kt = await new THREE.TextureLoader().loadAsync('/assets/rekvisita/krita-rod/cut/krita-rod-tunn.png'); kt.colorSpace = THREE.SRGBColorSpace;
  const kg = new THREE.PlaneGeometry(755, 265); kg.translate(377.5 - 742, 132 - 132.5, 0);
  const krita = new THREE.Mesh(kg, new THREE.MeshBasicMaterial({ map: kt, transparent: true })); krita.rotation.z = -125 * Math.PI / 180; krita.scale.setScalar(0.4);
  kritaScen.add(krita);

  const placera = (k, o, dx) => { const m = k.m; m.visible = o.syns !== false;
    m.position.set(o.x, -o.y, o.z || 0); m.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0); m.scale.set(o.s * (o.sx ?? 1), o.s * (o.sy ?? 1), o.s * (k.d.djup ?? 1));
    if (k.fram && Math.abs((o.k ?? 1) - k.fram.k) > 1e-3) { const g = k.fram.c.getContext('2d'); g.clearRect(0, 0, PX, PX); g.drawImage(k.fram.bas, 0, 0);
      if (k.d.fram) (k.d.platta ? tjock : bokstav)(g, k.d.drag, k.d.farg, o.k ?? 1, k.d.skala ?? 1);
      k.fram.k = o.k ?? 1; k.tex.needsUpdate = true; } };
  function rita({ klossar: L = [], krita: kr, dx = 0, opacitet = 1, kam }) {
    const [kx, ky] = kam ? [kam.x, kam.y] : [960 + dx, 540];
    cam.position.set(kx, -ky, D); cam.lookAt(kx, -ky, 0);
    if (cam.zoom !== (kam?.zoom ?? 1)) { cam.zoom = kam?.zoom ?? 1; cam.updateProjectionMatrix(); }
    L.forEach((o, i) => placera(klossar[i], o, dx));
    for (const k of klossar) k.m.material.forEach(mt => { mt.opacity = opacitet; });
    R.clear(); R.render(scen, cam);
    if (typeof kr === 'function') kr = kr(skarm);   // kritan kan räknas ut när klossarna står på plats
    krita.visible = !!kr?.syns;   // kr: { x, y } i skärmen, eller { kloss, u, v } = en punkt på en klossframsida
    if (kr) { const [x, y] = kr.kloss != null ? skarm(kr.kloss, kr.u, kr.v) : [kr.x, kr.y]; krita.position.set(x, -y, 0); }
    krita.material.opacity = opacitet;
    R.clearDepth(); R.render(kritaScen, orto); }
  const skarm = (i, u, v) => { const k = klossar[i].m; k.updateMatrixWorld(); cam.updateMatrixWorld();
    const p = k.localToWorld(new THREE.Vector3(u, v, 0.5)).project(cam); return [(p.x + 1) * 960, (1 - p.y) * 540]; };
  return { rita, skarm, TRAV, PX };
}
