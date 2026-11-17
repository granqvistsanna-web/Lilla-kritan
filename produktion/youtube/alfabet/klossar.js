// Bokstavsklossar för Ljudjakten (format/alfabet.md): träklossar i three.js, i en egen genomskinlig canvas ovanpå scenen.
// Klossen har trä med kritkorn och en ram på varje sida; framsidan kan få en bokstav som kritan ritar drag för drag.
// Kritan bor också här (ovanpå klossarna), styrd i skärmens pixlar.
//   const K = await bokstavsklossar(canvas, [{ fram: 'A', farg: '#E5302A', drag: [[[x, y], [x, y]], …] }, { sidor: 'BC' }, …])
//   K.rita({ klossar: [{ x, y, z, s, rx, ry, rz, sx, sy, syns, k }], krita: { x, y, syns } | { kloss, u, v, syns }, dx, opacitet })
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
  const tra = (frö, ton = 0) => { const c = document.createElement('canvas'); c.width = c.height = PX; const g = c.getContext('2d'), r = slump(frö);
    const gr = g.createLinearGradient(0, 0, 0, PX); gr.addColorStop(0, ton ? '#E3B474' : '#E8BC80'); gr.addColorStop(1, ton ? '#D29A5E' : '#D9A066');
    g.fillStyle = gr; g.fillRect(0, 0, PX, PX);
    for (let i = 0; i < 26; i++) { const y = r() * PX, a = 4 + r() * 10, f = 0.004 + r() * 0.01, p = r() * 6;
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
  const BOKSTAV_SIDA = { B: [[[-150, -260], [-150, 250]], [[-150, -260], [80, -230]], [[-150, 0], [100, 20]], [[-150, 250], [110, 230]]],
    C: [[[150, -200], [-150, -60]], [[-150, -60], [-140, 120]], [[-140, 120], [150, 220]]] };   // enkla kantiga former, bara pynt på sidorna

  const klossar = def.map((d, i) => {
    const sidor = [...Array(6)].map((_, j) => { const c = tra(11 + i * 7 + j, j % 2); const s = d.sidor?.[j % d.sidor.length];
      if (s && j !== 4 && BOKSTAV_SIDA[s]) bokstav(c.getContext('2d'), BOKSTAV_SIDA[s], ['#3B7FE0', '#3FA34D', '#F2B533'][j % 3], 1, 0.7);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; });
    const fram = d.fram && { bas: tra(11 + i * 7 + 4, 0), c: document.createElement('canvas'), k: -1 };
    if (fram) { fram.c.width = fram.c.height = PX; sidor[4] = new THREE.CanvasTexture(fram.c); sidor[4].colorSpace = THREE.SRGBColorSpace; sidor[4].anisotropy = 4; }
    const m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), sidor.map(t => new THREE.MeshLambertMaterial({ map: t, transparent: true })));
    scen.add(m); return { d, m, fram, tex: sidor[4] };
  });

  // kritan: samma bild som i scenerna, spetsen [742, 132], lutad 125°, skala 0,4, i en ortografisk scen ovanpå
  const kritaScen = new THREE.Scene(), orto = new THREE.OrthographicCamera(0, 1920, 0, -1080, -10, 10);
  const kt = await new THREE.TextureLoader().loadAsync('/assets/rekvisita/krita-rod/cut/krita-rod-tunn.png'); kt.colorSpace = THREE.SRGBColorSpace;
  const kg = new THREE.PlaneGeometry(755, 265); kg.translate(377.5 - 742, 132 - 132.5, 0);
  const krita = new THREE.Mesh(kg, new THREE.MeshBasicMaterial({ map: kt, transparent: true })); krita.rotation.z = -125 * Math.PI / 180; krita.scale.setScalar(0.4);
  kritaScen.add(krita);

  const placera = (k, o, dx) => { const m = k.m; m.visible = o.syns !== false;
    m.position.set(o.x, -o.y, o.z || 0); m.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0); m.scale.set(o.s * (o.sx ?? 1), o.s * (o.sy ?? 1), o.s);
    if (k.fram && Math.abs((o.k ?? 1) - k.fram.k) > 1e-3) { const g = k.fram.c.getContext('2d'); g.clearRect(0, 0, PX, PX); g.drawImage(k.fram.bas, 0, 0);
      bokstav(g, k.d.drag, k.d.farg, o.k ?? 1); k.fram.k = o.k ?? 1; k.tex.needsUpdate = true; } };
  function rita({ klossar: L = [], krita: kr, dx = 0, opacitet = 1 }) {
    cam.position.set(960 + dx, -540, D); cam.lookAt(960 + dx, -540, 0);
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
