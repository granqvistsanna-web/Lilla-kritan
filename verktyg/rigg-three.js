// three.js-ritare för rigg-sidorna (2026-11-15, provas på Kanels uttryck.html?film=1&tre=1).
// Riggen ritar som förut i sin SVG (rita(), rigg-motor.js, rigg-mesh.js är orörda). Varje bildruta läser den här filen av SVG:n
// och ritar samma sak med WebGL: bilder och mesh-canvasar blir plan, vektorerna (ansiktet, munnen, zzz …) ritas på små canvasar,
// klipp blir masker, #kamera blir three-kameran och boil-filtret blir ett efterpass. SVG:n ligger kvar osynlig.
//   const tegna = await treRitare(svg, { golv: 915 });  await tegna.klar;  sedan tegna({ dolly, dx }) efter varje render(t)
// Djup: data-z på ett element eller en grupp (+ längre bort, − närmare). Lagret flyttas bakåt och förstoras kring (mitten, golv), så att det
// ser ut som i SVG:n när kameran står i mitten. Ögat står i golvhöjd med förskjuten bild (lens shift), så golvlinjen ligger kvar
// under fötterna på alla djup när kameran åker in (dolly, px närmare) eller i sidled (dx, och följningen i #kamera).
// ponytail: bara xMidYMid (meet/slice/none), rect/path i klipp, gruppopacitet som produkt (SVG blandar gruppen först).
async function treRitare(svg, o = {}) {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  const W = svg.viewBox.baseVal.width, H = svg.viewBox.baseVal.height, kamera = svg.querySelector('#kamera');
  const R = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  R.setPixelRatio(1); R.setSize(W, H, false); R.outputColorSpace = THREE.LinearSRGBColorSpace; R.autoClear = false; R.setClearColor(0x222222);
  const cv = R.domElement; cv.id = 'tre'; cv.style.cssText = `width:${getComputedStyle(svg).width};height:auto;display:block`;
  svg.after(cv); svg.style.cssText += ';position:absolute;left:-99999px;visibility:hidden';
  const D = o.D || 540 / Math.tan(Math.PI / 12), GOLV = o.golv ?? H / 2;   // ögats avstånd till z = 0 (30° fov när hela bilden syns)
  const cam = new THREE.PerspectiveCamera(); cam.rotation.set(Math.PI, 0, 0);   // tittar mot +z med y nedåt som i SVG
  const lager = [new THREE.Scene(), new THREE.Scene(), new THREE.Scene()];   // före boil-gruppen, i den, efter den

  // Ett rutnät (0,0)–(1,1) med bildens överkant vid y = 0. Plan som böjs (öron, svans, kropp, armar) behöver rutorna, de andra struntar i dem.
  const N = 96, pos = [], uvs = [], idx = [];
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) { pos.push(i / N, j / N, 0); uvs.push(i / N, 1 - j / N); }
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * (N + 1) + i; idx.push(a, a + N + 1, a + 1, a + 1, a + N + 1, a + N + 2); }
  const kvadrat = new THREE.BufferGeometry();
  kvadrat.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); kvadrat.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); kvadrat.setIndex(idx);
  const VIT = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1); VIT.needsUpdate = true;
  // Böjningarna är verktyg/rigg-mesh.js bojFn / bulaFn / armFn rad för rad, i vertex-shadern (delens 1024-ruta).
  const planMaterial = () => new THREE.ShaderMaterial({ transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { map: { value: null }, mask: { value: VIT }, opacity: { value: 1 }, uvRuta: { value: new THREE.Vector4(0, 0, 1, 1) },
      rect: { value: new THREE.Vector4(0, 0, 1, 1) }, maskRect: { value: new THREE.Vector4(0, 0, 1, 1) }, typ: { value: 0 },
      P: { value: new THREE.Vector2() }, S: { value: new THREE.Vector2() }, a: { value: 0 }, b: { value: 0 }, fotter: { value: 947 } },
    vertexShader: `uniform vec4 rect, maskRect; uniform int typ; uniform vec2 P, S; uniform float a, b, fotter; varying vec2 vUv, vMask;
      vec2 boj(vec2 q, float th, float start) { if (abs(th) < 1e-3) return q;
        float L = length(S - P); vec2 d = (S - P) / L, n = vec2(-d.y, d.x), v = q - P; float s = dot(v, d), w = dot(v, n), s0 = start * L, A = L - s0;
        if (s <= s0) return q;
        float ex = max(0.0, s - L), ph = th * (s - ex - s0) / A, R = A / th, c = cos(ph), si = sin(ph);
        return P + (s0 + R * si + ex * c - w * si) * d + (R * (1.0 - c) + ex * si + w * c) * n; }
      vec2 bula(vec2 q, float k) { return vec2(512.0 + (q.x - 512.0) * (1.0 + k * sin(3.14159265 * clamp((q.y - 470.0) / (fotter - 470.0), 0.0, 1.0))), q.y); }
      vec2 arm(vec2 q, float lang, float tass) { if (abs(lang - 1.0) < 1e-3 && abs(tass) < 1e-3) return q;
        float L = length(S - P); vec2 d = (S - P) / L, n = vec2(-d.y, d.x), v = q - P; float s = dot(v, d), w = dot(v, n);
        if (s <= 0.0) return q;
        return P + s * lang * d + w * (1.0 + tass * smoothstep(0.0, 1.0, (s / L - 0.55) / 0.45)) * n; }
      void main(){ vUv = uv; vec2 q = rect.xy + position.xy * rect.zw;
        if (typ == 1) q = boj(q, a, b); else if (typ == 2) q = bula(q, a); else if (typ == 3) q = arm(q, a, b);
        vMask = vec2((q.x - maskRect.x) / maskRect.z, 1.0 - (q.y - maskRect.y) / maskRect.w);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 0.0, 1.0); }`,
    fragmentShader: `#define LOD -0.5   // lite skarpare mipmap, som Chromes nedskalning (små figurer på arken)
      uniform sampler2D map, mask; uniform float opacity; uniform vec4 uvRuta; varying vec2 vUv, vMask;
      void main(){ vec4 c = texture2D(map, uvRuta.xy + vUv * uvRuta.zw, LOD); gl_FragColor = c * (opacity * texture2D(mask, vMask).a); }` });
  // Delens böjning ur figurens pose (treMesh har märkt bilden), samma tal som meshIn i rigg-mesh.js.
  const bojning = (e, u) => { const B = e._bend, p = B?.fig.pose; u.typ.value = 0; if (!p) return;
    u.P.value.set(...B.P); u.S.value.set(...B.S); u.fotter.value = B.fotter;
    const [typ, a, b] = B.typ === 'ora' ? [1, B.tecken * p.oraBoj[B.i][0], p.oraBoj[B.i][1]] : B.typ === 'svans' ? [1, -p.svansBoj, 0]
      : B.typ === 'arm' ? [3, ...p.armForm[B.i]] : [2, p.bula, 0];
    u.typ.value = typ; u.a.value = typ === 1 ? a * Math.PI / 180 : a; u.b.value = b; };
  // Förmultiplicerad alfa: annars drar filtreringen in genomskinligt svart och ger mörka fransar runt kanter (syns när bilden förminskas).
  const textur = t => { t.colorSpace = THREE.NoColorSpace; t.premultiplyAlpha = true; t.anisotropy = 8; return t; };

  // Bilderna laddas en gång per fil. klar = alla bilder som fanns i SVG:n när ritaren skapades.
  const BILD = new Map();
  const bild = href => { const url = new URL(href, document.baseURI).href;
    if (!BILD.has(url)) BILD.set(url, new Promise(ok => new THREE.TextureLoader().load(url, t => ok(textur(t)), undefined, () => ok(null))).then(t => (BILD.set(url, t), t)));
    const b = BILD.get(url); return b instanceof Promise ? null : b; };
  const forsta = [...kamera.querySelectorAll('image')].map(e => bild(e.getAttribute('href')));
  const klar = Promise.all([...BILD.values()]);

  const ctm = e => DOMMatrix.fromMatrix(e.getCTM()), K = () => ctm(kamera).inverse();   // allt i #kameras koordinater (världen); kamerans egen transform blir cam
  const matris = (m, ut, z = 0) => ut.set(m.a, m.c, 0, m.e, m.b, m.d, 0, m.f, 0, 0, 1, z, 0, 0, 0, 1);
  // Utan data-z: bakgrunden (första <image> direkt i #scen) 1400, resten av #scen 350, #forgrund −260, figurerna 0.
  const djup = e => { if (o.djup === false) return 0; const a = e.closest('[data-z]'); if (a && kamera.contains(a)) return +a.dataset.z;
    if (e.closest('#forgrund')) return -260; const s = e.closest('#scen');
    return !s ? 0 : e === s.querySelector(':scope > image') ? 1400 : 350; };
  const djupM = z => { const k = (D + z) / D; return new DOMMatrix([k, 0, 0, k, W / 2 * (1 - k), GOLV * (1 - k)]); };
  const DOLD = new Set(['clipPath', 'defs', 'mask', 'filter', 'pattern', 'symbol']);
  const synlig = e => { let op = 1;
    for (let a = e; a && a !== svg; a = a.parentElement) {
      if (DOLD.has(a.tagName) || a.getAttribute('display') === 'none' || a.style?.display === 'none') return 0;
      if (a.hasAttribute('opacity')) op *= parseFloat(a.getAttribute('opacity')); }
    return op; };
  const iBoil = e => { for (let a = e; a && a !== svg; a = a.parentElement) if (a.hasAttribute('filter')) return true; return false; };

  // Klipp: clipPath-barnens form (rect, path) i elementets egna koordinater.
  const klippForm = (url, m = new DOMMatrix()) => { const cp = svg.querySelector(url.slice(4, -1).replace(/^#/, '#'));
    const ut = new Path2D(); if (!cp) return null;
    for (const c of cp.children) { const t = DOMMatrix.fromMatrix(c.transform?.baseVal.consolidate()?.matrix || new DOMMatrix()), p = new Path2D();
      if (c.tagName === 'rect') p.rect(+c.getAttribute('x') || 0, +c.getAttribute('y') || 0, +c.getAttribute('width'), +c.getAttribute('height'));
      else if (c.tagName === 'path') p.addPath(new Path2D(c.getAttribute('d')));
      ut.addPath(p, m.multiply(t)); }
    return { p: ut, regel: cp.firstElementChild?.getAttribute('clip-rule') === 'evenodd' ? 'evenodd' : 'nonzero', nyckel: cp.innerHTML }; };
  const MASK = new Map();
  const mask = (e, [x, y, w, h]) => { const url = e.getAttribute('clip-path'); if (!url) return VIT;
    const k = klippForm(url), nyckel = url + k.nyckel + [x, y, w, h];
    if (!MASK.has(nyckel)) { const c = document.createElement('canvas'); c.width = c.height = 1024; const g = c.getContext('2d');
      g.setTransform(1024 / w, 0, 0, 1024 / h, -x * 1024 / w, -y * 1024 / h); g.fill(k.p, k.regel); MASK.set(nyckel, textur(new THREE.CanvasTexture(c))); }
    return MASK.get(nyckel); };

  // Ett plan per <image>/<foreignObject>, återanvänt mellan bildrutorna.
  const PLAN = new WeakMap();
  const plan = e => { if (!PLAN.has(e)) { const m = new THREE.Mesh(kvadrat, planMaterial()); m.matrixAutoUpdate = false; m.frustumCulled = false; PLAN.set(e, m); } return PLAN.get(e); };
  const ruta = e => ['x', 'y', 'width', 'height'].map(n => parseFloat(e.getAttribute(n)) || 0);
  function bildPlan(e, M, op) {
    let map, [x, y, w, h] = ruta(e), uv = [0, 0, 1, 1];
    if (e.tagName === 'image') { map = bild(e.getAttribute('href')); if (!map) return null;
      const [iw, ih] = [map.image.width, map.image.height], par = e.getAttribute('preserveAspectRatio') || 'xMidYMid meet';
      if (!par.startsWith('none')) { const slice = par.includes('slice'), s = (slice ? Math.max : Math.min)(w / iw, h / ih);
        if (slice) { const fx = w / s / iw, fy = h / s / ih; uv = [(1 - fx) / 2, (1 - fy) / 2, fx, fy]; }
        else { x += (w - iw * s) / 2; y += (h - ih * s) / 2; w = iw * s; h = ih * s; } } }
    else { const c = e.querySelector('canvas'); if (!c) return null;
      map = e._tex ||= textur(new THREE.CanvasTexture(c)); map.needsUpdate = true; }
    const m = plan(e), u = m.material.uniforms;
    u.map.value = map; u.opacity.value = op; u.uvRuta.value.set(...uv); u.mask.value = mask(e, ruta(e));
    u.rect.value.set(x, y, w, h); u.maskRect.value.set(...ruta(e)); bojning(e, u);
    const z = djup(e); matris(djupM(z).multiply(M), m.matrix, z); return m; }

  // Vektorer i följd (utan bild emellan) ritas på en canvas som täcker deras yta i världen, i kamerans upplösning.
  const KORNING = new Map(), VEKTOR = new Set(['path', 'ellipse', 'circle', 'rect', 'line', 'polygon', 'polyline', 'text']);
  const form = e => { const p = new Path2D(), n = k => parseFloat(e.getAttribute(k)) || 0;
    if (e.tagName === 'path') { const d = e.getAttribute('d'); if (!d) return null; p.addPath(new Path2D(d)); }
    else if (e.tagName === 'ellipse') { if (n('rx') <= 0 || n('ry') <= 0) return null; p.ellipse(n('cx'), n('cy'), n('rx'), n('ry'), 0, 0, 2 * Math.PI); }
    else if (e.tagName === 'line') { p.moveTo(n('x1'), n('y1')); p.lineTo(n('x2'), n('y2')); }
    else if (e.tagName === 'polygon' || e.tagName === 'polyline') { const q = (e.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number);
      for (let i = 0; i + 1 < q.length; i += 2) p[i ? 'lineTo' : 'moveTo'](q[i], q[i + 1]); if (e.tagName === 'polygon') p.closePath(); }
    else if (e.tagName === 'text') return p;
    else if (e.tagName === 'circle') { if (n('r') <= 0) return null; p.arc(n('cx'), n('cy'), n('r'), 0, 2 * Math.PI); }
    else { if (n('width') <= 0 || n('height') <= 0) return null; p.rect(n('x'), n('y'), n('width'), n('height')); }
    return p; };
  function vektorPlan(run, Kinv, ppv, z) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const delar = run.map(([e, op]) => { const M = Kinv.multiply(ctm(e)), b = e.getBBox(), cs = getComputedStyle(e);
      const sw = parseFloat(cs.strokeWidth) || 0, pad = (cs.stroke !== 'none' ? sw : 0) * Math.hypot(M.a, M.b) + 2;
      for (const [px, py] of [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) {
        const q = M.transformPoint(new DOMPoint(px, py)); x0 = Math.min(x0, q.x - pad); y0 = Math.min(y0, q.y - pad); x1 = Math.max(x1, q.x + pad); y1 = Math.max(y1, q.y + pad); }
      return { e, op, M, cs }; });
    // canvasen börjar på en hel skärmpixel (gäller exakt utan djup och dolly), annars blir ansiktet och texten omsamplade och suddiga
    x0 = rutnat[0] + Math.floor((x0 - rutnat[0]) * ppv) / ppv; y0 = rutnat[1] + Math.floor((y0 - rutnat[1]) * ppv) / ppv;
    const cw = Math.ceil((x1 - x0) * ppv), ch = Math.ceil((y1 - y0) * ppv); if (!(cw > 0 && ch > 0) || cw * ch > 4e7) return null;
    let k = KORNING.get(run[0][0]);
    if (!k) { const c = document.createElement('canvas'); k = { c, g: c.getContext('2d'), tex: textur(new THREE.CanvasTexture(c)) }; k.tex.generateMipmaps = false; k.tex.minFilter = THREE.LinearFilter; KORNING.set(run[0][0], k); }
    if (k.c.width < cw || k.c.height < ch) { k.c.width = Math.max(k.c.width, cw); k.c.height = Math.max(k.c.height, ch); k.tex.dispose(); k.tex = textur(new THREE.CanvasTexture(k.c)); k.tex.generateMipmaps = false; k.tex.minFilter = THREE.LinearFilter; }
    const g = k.g, bas = new DOMMatrix([ppv, 0, 0, ppv, -x0 * ppv, -y0 * ppv]);
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, k.c.width, k.c.height);
    for (const { e, op, M, cs } of delar) { const p = form(e); if (!p) continue;
      g.save();
      for (let a = e; a && a !== svg; a = a.parentElement) { const url = a.getAttribute('clip-path'); if (!url) continue;
        const kf = klippForm(url); if (!kf) continue; g.setTransform(bas.multiply(Kinv.multiply(ctm(a)))); g.clip(kf.p, kf.regel); }
      g.setTransform(bas.multiply(M)); g.globalAlpha = op;
      if (e.tagName === 'text') { if (cs.fill !== 'none') { g.globalAlpha = op * (parseFloat(cs.fillOpacity) ?? 1); g.fillStyle = cs.fill;
          g.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; g.textBaseline = 'alphabetic';
          g.textAlign = { middle: 'center', end: 'right' }[cs.textAnchor] || 'left';
          g.fillText(e.textContent, parseFloat(e.getAttribute('x')) || 0, parseFloat(e.getAttribute('y')) || 0); }
        g.restore(); continue; }
      if (e.tagName !== 'line' && cs.fill !== 'none') { g.globalAlpha = op * (parseFloat(cs.fillOpacity) ?? 1); g.fillStyle = cs.fill; g.fill(p, cs.fillRule === 'evenodd' ? 'evenodd' : 'nonzero'); }
      if (cs.stroke !== 'none' && parseFloat(cs.strokeWidth) > 0) { g.globalAlpha = op * (parseFloat(cs.strokeOpacity) ?? 1);
        g.strokeStyle = cs.stroke; g.lineWidth = parseFloat(cs.strokeWidth); g.lineCap = cs.strokeLinecap; g.lineJoin = cs.strokeLinejoin;
        g.setLineDash(cs.strokeDasharray === 'none' ? [] : cs.strokeDasharray.split(/[\s,]+/).map(parseFloat)); g.stroke(p); }
      g.restore(); }
    k.tex.needsUpdate = true;
    const m = plan(run[0][0]), u = m.material.uniforms;
    u.map.value = k.tex; u.opacity.value = 1; u.mask.value = VIT; u.uvRuta.value.set(0, 1 - ch / k.c.height, cw / k.c.width, ch / k.c.height);
    u.rect.value.set(x0, y0, cw / ppv, ch / ppv); u.maskRect.value.set(x0, y0, cw / ppv, ch / ppv); u.typ.value = 0;
    matris(djupM(z), m.matrix, z); return m; }

  // Boil: gruppen med filter ritas till en egen yta och läggs på med samma slags brus som feTurbulence + feDisplacementMap
  // (båda förskjutningarna ur alfakanalen, som SVG:ns standard), i världens koordinater: frekvens 0,025, styrka 5.
  let rutnat = [0, 0];   // #kameras övre vänstra hörn i världen, sätts av tegna
  const yta = new THREE.WebGLRenderTarget(W, H, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });   // närmaste pixel, som Chromes feDisplacementMap: ger kritkantens knaggliga kant
  const boilMat = new THREE.ShaderMaterial({ transparent: true, depthTest: false, depthWrite: false,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    uniforms: { yta: { value: yta.texture }, seed: { value: 1 }, styrka: { value: 5 }, frekvens: { value: 0.025 }, varld: { value: new THREE.Vector4() } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }',
    fragmentShader: `uniform sampler2D yta; uniform float seed, styrka, frekvens; uniform vec4 varld; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)) + seed * 17.13) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + 1.0), f.x), f.y); }
      // Chrome räknar filtret i världens pixlar (en per enhet) och skalar upp: ruta och förskjutning i hela världspixlar, som där.
      void main(){ vec2 w = floor(varld.xy + vec2(vUv.x, 1.0 - vUv.y) * varld.zw) + 0.5, p = w * frekvens;
        float a = (n(p) + 0.5 * n(p * 2.0 + 3.7)) / 1.5, d = floor(styrka * (a - 0.5) + 0.5), u = (w.x + d - varld.x) / varld.z, v = (w.y + d - varld.y) / varld.w;
        gl_FragColor = texture2D(yta, vec2(u, 1.0 - v)); }` });
  const boilQuad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), boilMat), boilScen = new THREE.Scene(); boilQuad.frustumCulled = false; boilScen.add(boilQuad);
  const ortoPass = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  function tegna({ dolly = 0, dx = 0, mitt = GOLV } = {}) {   // mitt: den höjd (världen) som ligger kvar på samma rad när kameran åker in
    const Kinv = K(), km = DOMMatrix.fromMatrix(kamera.transform.baseVal.consolidate()?.matrix || new DOMMatrix());
    // Kameran: det SVG:ns #kamera visar, uttryckt i världen.
    const vx0 = -km.e / km.a, vy0 = -km.f / km.d, vw = W / km.a, vh = H / km.d, ppv = km.a;
    rutnat = [vx0, vy0]; const ex = vx0 + vw / 2, n = 10, avst = D - dolly, s = avst / D;
    const wy0 = mitt + (vy0 - mitt) * s, wy1 = mitt + (vy0 + vh - mitt) * s;   // bildens över- och underkant på z = 0
    cam.position.set(ex + dx, GOLV, -avst); cam.updateMatrixWorld();
    cam.projectionMatrix.makePerspective((vx0 - ex) * n / D, (vx0 + vw - ex) * n / D, -(wy0 - GOLV) * n / avst, -(wy1 - GOLV) * n / avst, n, 1e5);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
    const pxv = z => ppv * D * (D + z) / D / (D + z - dolly);   // skärmpixlar per världsenhet för ett lager på djup z
    lager.forEach(s => s.clear());
    let run = [], runLager = 0, runZ = 0, ordning = 0;
    const tomRun = () => { if (run.length) { const m = vektorPlan(run, Kinv, pxv(runZ), runZ); if (m) { m.renderOrder = ordning++; lager[runLager].add(m); } } run = []; };
    for (const e of svg.querySelectorAll('*')) {   // också det utanför #kamera (bakgrundsrutan, etiketterna), i världen på z = 0
      const ar = e.tagName === 'image' || e.tagName === 'foreignObject', vek = VEKTOR.has(e.tagName) && !e.closest('clipPath');
      if (!ar && !vek) continue;
      const op = synlig(e); if (op <= 0) continue;
      const l = iBoil(e) ? 1 : (lager[1].children.length || run.length && runLager === 1 ? 2 : 0);
      if (ar) { tomRun(); const m = bildPlan(e, Kinv.multiply(ctm(e)), op); if (m) { m.renderOrder = ordning++; lager[l].add(m); } }
      else { const z = djup(e); if (run.length && (runLager !== l || runZ !== z)) tomRun(); runLager = l; runZ = z; run.push([e, op]); }
    }
    tomRun();
    R.setRenderTarget(null); R.clear(); R.render(lager[0], cam);
    if (lager[1].children.length) {
      R.setRenderTarget(yta); R.setClearColor(0, 0); R.clear(); R.render(lager[1], cam); R.setRenderTarget(null); R.setClearColor(0x222222, 1);
      boilMat.uniforms.seed.value = +(svg.querySelector('feTurbulence')?.getAttribute('seed') || 1);
      boilMat.uniforms.varld.value.set(ex + dx + (vx0 - ex) * s, wy0, vw * s, vh * s); R.render(boilScen, ortoPass); }
    R.render(lager[2], cam);
  }
  tegna.klar = klar; tegna.R = R; tegna.THREE = THREE;
  return tegna;
}

// I stället för meshIn (rigg-mesh.js) när three.js ritar: delarna böjs i shadern, inget ritas om på canvas. fig.mesh blir en tom lista,
// så att folj() (fjädrarna) och meshRita() körs som förut. Spetsen hittas som i meshIn (pixeln längst från roten).
const treMesh = (fig, delar) => { fig.mesh ||= [];
  return Promise.all(Object.entries(delar).flatMap(([klass, o]) => [...fig.querySelectorAll('image.' + klass)].map(async im => {
    const k = await meshKalla(im.getAttribute('href')), i = klass.includes('-r') ? 1 : 0, rigg = typeof RIGG !== 'undefined' && RIGG[klass.replace('2', '')];
    const P = o.rot || rigg || [512, FOTTER];
    im._bend = { typ: o.typ, P, S: o.spets || langst(k.a, k.box, P), i, tecken: i ? 1 : -1, fig, fotter: FOTTER }; }))); };

// Kroken: en <script src="…/rigg-three.js"> efter rigg-motor.js räcker. Sidans skript har körts när DOMContentLoaded kommer.
//   ?boil=0 tar bort alla filter (jämförelser). ?tre=1 ritar med three.js; ?djup=0 utan djup, ?kamera=0 utan window.treKamera.
// window.klar sätts när bilderna laddats (direkt utan ?tre=1). Sidans egen loop anropar sin lokala render, så här går en egen
// rAF-loop som tecknar efter den (window.stilla stoppar båda). window.render byts mot en som också tecknar, för bild-för-bild-rendering.
addEventListener('DOMContentLoaded', async () => {
  const sok = new URLSearchParams(location.search), svg = document.querySelector('svg');
  if (sok.get('boil') === '0') svg.querySelectorAll('[filter]').forEach(e => e.removeAttribute('filter'));
  if (!sok.get('tre')) { window.klar = true; return; }
  const tegna = await treRitare(svg, { golv: window.GOLV ?? 915, djup: sok.get('djup') !== '0' }); await tegna.klar;
  const kam = t => sok.get('kamera') === '0' ? {} : window.treKamera?.(t) ?? {};
  const r = window.render; window.render = t => { r(t); tegna(kam(t)); }; window.klar = true;
  const t0 = performance.now();
  (function loop() { if (!window.stilla) tegna(kam((performance.now() - t0) / 1000)); requestAnimationFrame(loop); })();
});
