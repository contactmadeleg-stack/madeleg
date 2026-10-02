/* Parcours client avec un courtier en prêt immobilier — motion design 15 s, 1080×1920.
   La scène entière est une fonction pure du temps : window.__seek(t) positionne la
   timeline GSAP (en pause), applique les « acteurs » puis les rendus dérivés
   (odomètres, tracés, physique des confettis). Aucun état ne dépend de l'horloge. */
(async () => {
  'use strict';
  await Promise.all([
    document.fonts.load('800 96px "Schibsted Grotesk"'),
    document.fonts.load('600 32px "Instrument Sans"'),
  ]);
  await document.fonts.ready;

  const W = 1080, H = 1920, DURATION = 15;
  const C = {
    ink950: '#060B14', ink900: '#0B1220', ink800: '#121C2E', ink700: '#1C2841', ink600: '#2C3D5C',
    ink500: '#435777', ink400: '#64789A', ink300: '#93A6C1', ink200: '#C4CEDE', ink150: '#DCE3EE',
    ink100: '#E9EEF5', ink50: '#F3F6FA',
    em800: '#04503A', em700: '#066248', em600: '#00784F', em500: '#009463', em400: '#12B37D',
    em300: '#5FD6A6', em200: '#A8E9CB', em100: '#D9F5E8', em50: '#EFFBF5',
    am700: '#8A4E10', am600: '#A86216', am500: '#D98324', am400: '#F2A65A', am200: '#FBDAB5',
    am100: '#FDEBD6', am50: '#FDF5EC',
    sand200: '#EDE6DB', sand100: '#F6F2EA', sand50: '#FBF9F5', white: '#FFFFFF',
  };
  const FD = '"Schibsted Grotesk"';
  const FS = '"Instrument Sans"';
  const NBSP = ' ';
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('stage');

  // Repères temporels (s) — grille 120 BPM, tout tombe sur la croche.
  const T = { s1: 1.0, s2: 2.5, s3: 4.0, s4: 5.75, s5: 7.5, s6: 10.5, s7: 12.5, pop: 13.0 };

  /* ---------------------------------------------------------------- outils */
  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  const grp = (parent, attrs) => el('g', attrs, parent);
  let uidN = 0;
  const uid = (p) => `${p}${++uidN}`;

  function text(parent, str, o = {}) {
    const t = el('text', { x: o.x || 0, y: o.y || 0, fill: o.fill || C.ink900, 'text-anchor': o.anchor || 'start' }, parent);
    t.style.fontFamily = o.family || FS;
    t.style.fontSize = `${o.size || 32}px`;
    t.style.fontWeight = o.weight || 600;
    if (o.ls) t.style.letterSpacing = `${o.ls}px`;
    if (o.tnum) t.style.fontVariantNumeric = 'tabular-nums';
    if (o.opacity !== undefined) t.setAttribute('opacity', o.opacity);
    t.textContent = str;
    return t;
  }

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  function mix(a, b, t) {
    const A = hex2rgb(a), B = hex2rgb(b);
    t = Math.max(0, Math.min(1, t));
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
  }
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const easeOutExpo = (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
  const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);
  const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

  /* ------------------------------------------------- acteurs et rendus dérivés */
  const actors = [];
  const updaters = [];
  const onRender = (fn) => updaters.push(fn);

  function actor(node, init) {
    const a = Object.assign({ node, x: 0, y: 0, r: 0, s: 1, sx: 1, sy: 1, ky: 0, o: 1, ox: 0, oy: 0 }, init);
    actors.push(a);
    return a;
  }
  function applyActor(a) {
    const n = a.node;
    const sx = a.s * a.sx, sy = a.s * a.sy;
    const hidden = a.o <= 0.002 || Math.abs(sx) < 1e-4 || Math.abs(sy) < 1e-4;
    if (hidden) {
      if (n.__vis !== false) { n.setAttribute('display', 'none'); n.__vis = false; }
      return;
    }
    if (n.__vis === false) { n.removeAttribute('display'); n.__vis = true; }
    let tr = `translate(${a.x.toFixed(2)} ${a.y.toFixed(2)})`;
    if (a.r) tr += ` rotate(${a.r.toFixed(3)})`;
    if (a.ky) tr += ` skewY(${a.ky.toFixed(3)})`;
    if (sx !== 1 || sy !== 1) tr += ` scale(${sx.toFixed(5)} ${sy.toFixed(5)})`;
    if (a.ox || a.oy) tr += ` translate(${-a.ox} ${-a.oy})`;
    n.setAttribute('transform', tr);
    n.setAttribute('opacity', a.o >= 0.998 ? 1 : a.o.toFixed(4));
  }

  /* --------------------------------------------------------- cues sonores */
  const cues = [];
  const cue = (t, type, v = 1) => cues.push({ t: +t.toFixed(4), type, v });

  /* ---------------------------------------------------------------- defs */
  const defs = el('defs', null, svg);
  function shadowFilter(id, dy, std, op) {
    const f = el('filter', { id, x: '-50%', y: '-50%', width: '200%', height: '200%', 'color-interpolation-filters': 'sRGB' }, defs);
    el('feDropShadow', { dx: 0, dy, stdDeviation: std, 'flood-color': C.ink900, 'flood-opacity': op }, f);
  }
  shadowFilter('shCard', 22, 26, 0.13);
  shadowFilter('shSm', 8, 11, 0.12);
  shadowFilter('shXs', 4, 5, 0.14);

  const measureLayer = grp(svg, { opacity: 0 });
  function measure(str, o) {
    const t = text(measureLayer, str, o);
    const w = t.getComputedTextLength();
    t.remove();
    return w;
  }

  const ICON = {
    calendarCheck: ['M8 2v4', 'M16 2v4', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 10h18', 'm9 16 2 2 4-4'],
    fileCheck: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'm9 15 2 2 4-4'],
    landmark: ['M3 22h18', 'M6 18v-7', 'M10 18v-7', 'M14 18v-7', 'M18 18v-7', 'M12 2 20 7 4 7z'],
    scroll: ['M15 12h-5', 'M15 8h-5', 'M19 17V5a2 2 0 0 0-2-2H4', 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3'],
    stamp: ['M5 22h14', 'M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z', 'M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13'],
    heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
    trendingDown: ['M22 17 13.5 8.5 8.5 13.5 2 7', 'M16 17h6v-6'],
    houseDoor: ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8'],
    houseBody: ['M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
    mapPin: ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', 'M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
  };
  function lucide(parent, paths, o = {}) {
    const size = o.size || 48, k = size / 24;
    const g = grp(parent, { transform: `translate(${o.x || 0} ${o.y || 0}) scale(${k}) translate(-12 -12)` });
    for (const d of paths) {
      el('path', { d, fill: o.fill || 'none', stroke: o.color || C.ink900, 'stroke-width': o.sw || 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    }
    return g;
  }
  const topRoundRect = (x, y, w, h, r) => `M${x} ${y + h}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h}Z`;

  function card(parent, w, h, o = {}) {
    return el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: o.r || 36, fill: o.fill || C.white, filter: o.shadow === false ? null : `url(#${o.shadow || 'shCard'})` }, parent);
  }
  // Barre « squelette » de texte qui se dessine depuis la gauche.
  function bar(parent, x, y, w, o = {}) {
    const h = o.h || 16;
    const r = el('rect', { x, y: y - h / 2, width: w, height: h, rx: h / 2, fill: o.fill || C.ink100 }, parent);
    const d = { p: o.p === undefined ? 0 : o.p };
    onRender(() => {
      const ww = Math.max(0, w * d.p);
      r.setAttribute('width', ww.toFixed(2));
      r.setAttribute('display', ww < 0.5 ? 'none' : 'inline');
    });
    return d;
  }
  // Tracé qui se dessine (stroke-dashoffset).
  function drawable(path, p0 = 0) {
    const len = path.getTotalLength();
    const d = { p: p0, len };
    path.style.strokeDasharray = `${len} ${len + 2}`;
    onRender(() => {
      path.style.strokeDashoffset = (len * (1 - d.p)).toFixed(3);
      path.setAttribute('display', d.p <= 0.002 ? 'none' : 'inline');
    });
    return d;
  }
  function checkBadge(parent, r, o = {}) {
    const g = grp(parent);
    el('circle', { r: r + (o.ring || 6), fill: o.ringColor || C.white }, g);
    el('circle', { r, fill: o.fill || C.em600 }, g);
    const k = r / 44;
    const p = el('path', { d: `M${-16 * k} ${1 * k}L${-5 * k} ${12 * k}L${17 * k} ${-11 * k}`, fill: 'none', stroke: C.white, 'stroke-width': 8 * k, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return { g, draw: drawable(p, 1) };
  }

  /* Odomètre : chaque chiffre est une colonne 0-9 répétée qui défile dans une fenêtre. */
  function odometer(parent, template, o) {
    const size = o.size, lh = size * 1.02, rep = o.rep || 3;
    const style = { family: o.family || FD, size, weight: o.weight || 800, tnum: true };
    const dw = measure('0', style);
    const items = [];
    let x = 0;
    for (const ch of template) {
      if (ch === '0') { items.push({ kind: 'd', x, w: dw }); x += dw; }
      else if (ch === ' ') { x += size * 0.22; }
      else if (ch === ',') { const w = measure(ch, style); items.push({ kind: 's', ch, x: x - size * 0.05, w }); x += w - size * 0.1; }
      else { const w = measure(ch, style); items.push({ kind: 's', ch, x, w }); x += w; }
    }
    const total = x;
    const x0 = (o.anchor === 'middle' ? -total / 2 : o.anchor === 'end' ? -total : 0) + (o.x || 0);
    const root = grp(parent, { transform: `translate(${x0} ${o.y || 0})` });
    const cid = uid('odo');
    const cp = el('clipPath', { id: cid }, defs);
    el('rect', { x: -6, y: -size * 0.86, width: total + 12, height: size * 1.06 }, cp);
    const clipG = grp(root, { 'clip-path': `url(#${cid})` });
    const cols = [];
    for (const it of items) {
      if (it.kind === 's') { text(root, it.ch, Object.assign({ x: it.x, y: 0, fill: o.fill || C.ink900 }, style)); continue; }
      const colG = grp(clipG);
      const t = el('text', { x: it.x + it.w / 2, y: 0, fill: o.fill || C.ink900, 'text-anchor': 'middle' }, colG);
      t.style.fontFamily = style.family; t.style.fontSize = `${size}px`; t.style.fontWeight = style.weight;
      t.style.fontVariantNumeric = 'tabular-nums';
      for (let k = 0; k < 10 * rep; k++) {
        const sp = el('tspan', { x: it.x + it.w / 2, y: k * lh }, t);
        sp.textContent = String(k % 10);
      }
      const col = { pos: 0 };
      onRender(() => colG.setAttribute('transform', `translate(0 ${(-col.pos * lh).toFixed(2)})`));
      cols.push(col);
    }
    return { root, cols, total, x0 };
  }

  /* -------------------------------------------------------------- calques */
  const L = {};
  L.bg = grp(svg);
  L.world = grp(svg);
  L.worldInner = grp(L.world);
  L.night = grp(svg);
  L.hud = grp(svg);
  const flashRect = el('rect', { x: 0, y: 0, width: W, height: H, fill: C.white, opacity: 0 }, svg);
  const flash = { o: 0 };
  onRender(() => { flashRect.setAttribute('opacity', flash.o.toFixed(4)); flashRect.setAttribute('display', flash.o < 0.002 ? 'none' : 'inline'); });

  // Caméra : lente poussée continue (parallaxe avec le décor fixe), zoom final
  // dans le trou de la clé, secousses déterministes.
  const cam = { zd: 1, zk: 1, hx: 540, hy: 960 };
  const DRIFT_C = { x: 540, y: 1100 };
  const driftAt = (t) => 1 + 0.0042 * (Math.min(Math.max(t, 0.8), 12.5) - 0.8);
  const nightDriftAt = (t) => 1 + 0.012 * Math.max(0, t - 12.5);
  const shakes = [];
  const shake = (t0, amp, decay = 0.22, freq = 18) => shakes.push({ t0, amp, decay, freq });
  function shakeAt(t) {
    let x = 0, y = 0;
    for (const s of shakes) {
      const dt = t - s.t0;
      if (dt < 0 || dt > s.decay * 6) continue;
      const e = s.amp * Math.exp(-dt / s.decay);
      x += e * Math.sin(2 * Math.PI * s.freq * dt);
      y += e * Math.cos(2 * Math.PI * s.freq * 1.31 * dt + 0.7);
    }
    return [x, y];
  }

  /* ------------------------------------------------------------- timeline */
  gsap.defaults({ overwrite: false });
  const tl = gsap.timeline({ paused: true });
  const to = (t, v, at) => tl.to(t, Object.assign({ immediateRender: false, lazy: false }, v), at);
  const ft = (t, a, b, at) => tl.fromTo(t, a, Object.assign({ immediateRender: false, lazy: false }, b), at);

  /* ============================================================ FOND */
  el('rect', { x: 0, y: 0, width: W, height: H, fill: C.sand100 }, L.bg);
  const haloG = grp(L.bg);
  const haloRing = el('circle', { r: 520, fill: 'none', stroke: C.sand200, 'stroke-width': 3 }, haloG);
  const haloC = el('circle', { r: 440, fill: C.sand200 }, haloG);
  const halo = actor(haloG, { x: 540, y: 1100, s: 0.7, o: 0 });
  const haloColors = [C.sand200, C.ink100, C.em100, C.am100, C.ink100, C.em100, C.am100, C.am100];
  const haloCol = { i: 0 };
  onRender(() => {
    const i = Math.min(Math.floor(haloCol.i), haloColors.length - 1), f = haloCol.i - i;
    const col = mix(haloColors[i], haloColors[Math.min(i + 1, haloColors.length - 1)], f);
    haloC.setAttribute('fill', col);
  });
  ft(halo, { s: 0.7, o: 0 }, { s: 1, o: 1, duration: 1.1, ease: 'expo.out' }, 0);
  [T.s1, T.s2, T.s3, T.s4, T.s5, T.s6].forEach((t, i) => {
    to(haloCol, { i: i + 1, duration: 0.5, ease: 'power2.inOut' }, t - 0.2);
  });
  // Respiration du halo à chaque changement d'étape.
  const haloPulse = { k: 0 };
  [T.s1, T.s2, T.s3, T.s4, T.s5, T.s6].forEach((t) => {
    ft(haloPulse, { k: 0 }, { k: 1, duration: 0.7, ease: 'none' }, t - 0.1);
  });
  onRender(() => {
    const k = haloPulse.k;
    const bump = k > 0 && k < 1 ? Math.sin(Math.PI * k) * (1 - k) * 0.06 : 0;
    haloRing.setAttribute('r', (520 + bump * 900).toFixed(2));
    haloRing.setAttribute('opacity', (0.55 + bump * 6).toFixed(3));
  });

  /* ============================================================ HUD : stepper */
  const ST = { y: 262, x0: 150, dx: 130, r: 26 };
  const stepG = grp(L.hud);
  const stLines = [];
  for (let i = 0; i < 6; i++) {
    const xa = ST.x0 + i * ST.dx + ST.r + 12, xb = ST.x0 + (i + 1) * ST.dx - ST.r - 12;
    const base = el('path', { d: `M${xa} ${ST.y}H${xb}`, stroke: C.ink150, 'stroke-width': 4, 'stroke-linecap': 'round', fill: 'none' }, stepG);
    const prog = el('path', { d: `M${xa} ${ST.y}H${xb}`, stroke: C.em600, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none' }, stepG);
    stLines.push({ base: drawable(base), prog: drawable(prog) });
  }
  const stNodes = [];
  for (let i = 0; i < 7; i++) {
    const ng = grp(stepG);
    const a = actor(ng, { x: ST.x0 + i * ST.dx, y: ST.y, s: 0 });
    const pulseG = grp(ng);
    el('circle', { r: ST.r, fill: 'none', stroke: C.em600, 'stroke-width': 3 }, pulseG);
    const pulse = actor(pulseG, { s: 1, o: 0 });
    el('circle', { r: ST.r, fill: C.white, stroke: C.ink200, 'stroke-width': 3 }, ng);
    const num = text(ng, String(i + 1), { x: 0, y: 9, size: 25, weight: 700, family: FD, fill: C.ink400, anchor: 'middle' });
    const fillG = grp(ng);
    const fill = actor(fillG, { s: 0 });
    el('circle', { r: ST.r + 1.5, fill: C.em600 }, fillG);
    const numWG = grp(fillG);
    const numW = actor(numWG, { o: 1 });
    text(numWG, String(i + 1), { x: 0, y: 9, size: 25, weight: 700, family: FD, fill: C.white, anchor: 'middle' });
    const ck = el('path', { d: 'M-10 1L-3 8L11 -7', fill: 'none', stroke: C.white, 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, fillG);
    stNodes.push({ a, pulse, fill, numW, check: drawable(ck), num });
  }
  // Apparition du stepper (intro).
  stNodes.forEach((n, i) => ft(n.a, { s: 0 }, { s: 1, duration: 0.45, ease: 'back.out(2.2)' }, 0.32 + i * 0.055));
  stLines.forEach((l, i) => ft(l.base, { p: 0 }, { p: 1, duration: 0.3, ease: 'power2.out' }, 0.38 + i * 0.055));
  stNodes.forEach((n, i) => cue(0.32 + i * 0.055, 'tick', 0.55 + i * 0.05));

  function stepActivate(i, t) {
    const n = stNodes[i];
    ft(n.fill, { s: 0 }, { s: 1, duration: 0.42, ease: 'back.out(1.8)' }, t);
    ft(n.pulse, { s: 1, o: 0.7 }, { s: 1.85, o: 0, duration: 0.7, ease: 'power2.out' }, t + 0.05);
    if (i > 0) {
      const p = stNodes[i - 1];
      ft(p.numW, { o: 1 }, { o: 0, duration: 0.12 }, t - 0.2);
      ft(p.check, { p: 0 }, { p: 1, duration: 0.3, ease: 'power2.out' }, t - 0.16);
      ft(stLines[i - 1].prog, { p: 0 }, { p: 1, duration: 0.38, ease: 'power2.inOut' }, t - 0.3);
    }
  }
  [T.s1, T.s2, T.s3, T.s4, T.s5, T.s6, T.s7].forEach((t, i) => {
    stepActivate(i, t);
    if (i > 0) cue(t - 0.16, 'check', 0.6);
  });
  // Dernière coche + vague de célébration.
  ft(stNodes[6].numW, { o: 1 }, { o: 0, duration: 0.1 }, T.pop - 0.02);
  ft(stNodes[6].check, { p: 0 }, { p: 1, duration: 0.3, ease: 'power2.out' }, T.pop);
  stNodes.forEach((n, i) => {
    ft(n.a, { s: 1 }, { s: 1.28, duration: 0.14, ease: 'power2.out' }, T.pop + 0.05 + i * 0.045);
    to(n.a, { s: 1, duration: 0.42, ease: 'back.out(2)' }, T.pop + 0.19 + i * 0.045);
  });

  /* ============================================================ HUD : pastille d'étape */
  const pillG = grp(L.hud);
  const pill = actor(pillG, { x: 540, y: 368, s: 0.7, o: 0 });
  const pillStyle = { family: FS, size: 30, weight: 600 };
  const wA = measure(`Étape${NBSP}`, pillStyle);
  const wD = measure('0', Object.assign({ tnum: true }, pillStyle));
  const wB = measure(`${NBSP}sur 7`, pillStyle);
  const pillTextW = wA + wD + wB, pillW = pillTextW + 58;
  el('rect', { x: -pillW / 2, y: -31, width: pillW, height: 62, rx: 31, fill: C.em100 }, pillG);
  const px0 = -pillTextW / 2;
  text(pillG, `Étape${NBSP}`, Object.assign({ x: px0, y: 10.5, fill: C.em700 }, pillStyle));
  const pillOdo = odometer(pillG, '0', { x: px0 + wA, y: 10.5, size: 30, weight: 600, family: FS, fill: C.em700, rep: 1 });
  text(pillG, `${NBSP}sur 7`, Object.assign({ x: px0 + wA + wD, y: 10.5, fill: C.em700 }, pillStyle));
  pillOdo.cols[0].pos = 1;
  ft(pill, { s: 0.7, o: 0 }, { s: 1, o: 1, duration: 0.5, ease: 'back.out(2)' }, T.s1 - 0.05);
  [T.s2, T.s3, T.s4, T.s5, T.s6, T.s7].forEach((t, i) => {
    ft(pillOdo.cols[0], { pos: i + 1 }, { pos: i + 2, duration: 0.45, ease: 'power3.inOut' }, t - 0.1);
  });

  /* ============================================================ HUD : titres cinétiques */
  const HL = { size: 96, lh: 104, y: 502 };
  const hlStyle = (size, weight, family) => ({ family: family || FD, size, weight: weight || 800, ls: -0.035 * size });
  function headline(lines, o = {}) {
    const size = o.size || HL.size, lh = o.lh || HL.lh, y0 = o.y || HL.y;
    const family = o.family || FD, weight = o.weight || 800, color = o.color || C.ink900;
    const ls = o.ls !== undefined ? o.ls : -0.035 * size;
    const root = grp(o.parent || L.hud);
    const words = [];
    const spaceW = measure('H H', { family, size, weight, ls }) - measure('HH', { family, size, weight, ls });
    lines.forEach((line, li) => {
      const y = y0 + li * lh;
      const cid = uid('hl');
      const cp = el('clipPath', { id: cid }, defs);
      el('rect', { x: 0, y: y - size * 1.02, width: W, height: size * 1.34 }, cp);
      const lg = grp(root, { 'clip-path': `url(#${cid})` });
      const tokens = (typeof line === 'string' ? line.split(' ').map((t) => ({ t })) : line);
      const widths = tokens.map((tk) => measure(tk.t, { family, size, weight: tk.weight || weight, ls }));
      const lineW = widths.reduce((a, b) => a + b, 0) + spaceW * (tokens.length - 1);
      let x = 540 - lineW / 2;
      tokens.forEach((tk, i) => {
        const wg = grp(lg);
        text(wg, tk.t, { x: 0, y: 0, family, size, weight: tk.weight || weight, ls, fill: tk.color || color });
        const a = actor(wg, { x, y: y + size * 1.3 });
        words.push({ a, li, y, size, node: wg, x });
        x += widths[i] + spaceW;
      });
    });
    return { root, words, size };
  }
  function hlIn(h, at, o = {}) {
    const ws = h.words.filter((w) => !o.lines || o.lines.includes(w.li));
    ws.forEach((w, i) => {
      ft(w.a, { y: w.y + w.size * 1.3 }, { y: w.y, duration: o.dur || 0.75, ease: 'expo.out' }, at + i * (o.stagger || 0.04));
    });
  }
  // Ancien et nouveau titre se déplacent ensemble, décalés d'une hauteur de masque :
  // ils ne se chevauchent jamais à l'écran.
  function hlSwap(oldH, newH, at, o = {}) {
    const dur = o.dur || 0.62, ease = o.ease || 'power4.inOut', ls = 0.06;
    oldH.words.forEach((w) => to(w.a, { y: w.y - w.size * 1.3, duration: dur, ease }, at + w.li * ls));
    newH.words.filter((w) => !o.lines || o.lines.includes(w.li)).forEach((w) => {
      ft(w.a, { y: w.y + w.size * 1.3 }, { y: w.y, duration: dur, ease }, at + w.li * ls);
    });
  }
  function hlOut(h, at, o = {}) {
    h.words.forEach((w, i) => {
      to(w.a, { y: w.y - w.size * 1.25, duration: o.dur || 0.34, ease: 'power3.in' }, at + i * (o.stagger || 0.018));
    });
  }

  /* ============================================================ INTRO (0 → 1 s) */
  // Titre d'ouverture → devient l'en-tête persistant (FLIP mot à mot).
  const introWords = [['Le', 'parcours'], ['avec', 'un', 'courtier']];
  const headerY = 178, headerSize = 30, kHeader = headerSize / HL.size;
  const headerLsLocal = 1.2 / kHeader;
  const intro = headline(introWords.map((l) => l.join(' ')));
  {
    // Disposition cible : une ligne, graisse 600, interlettrage positif.
    const flat = introWords.flat();
    const st = { family: FD, size: HL.size, weight: 600, ls: headerLsLocal };
    const sp = measure('H H', st) - measure('HH', st);
    const ws = flat.map((w) => measure(w, st));
    const total = ws.reduce((a, b) => a + b, 0) + sp * (flat.length - 1);
    let x = 540 - (total * kHeader) / 2;
    const hdr = { p: 0 };
    intro.words.forEach((w, i) => {
      w.hx = x; x += (ws[i] + sp) * kHeader;
      w.textNode = w.node.firstChild;
    });
    hlIn(intro, 0.06, { stagger: 0.04, dur: 0.55 });
    const tF = 0.8;
    intro.words.forEach((w, i) => {
      to(w.a, { x: w.hx, y: headerY, s: kHeader, duration: 0.62, ease: 'power3.inOut' }, tF + i * 0.025);
    });
    to(hdr, { p: 1, duration: 0.6, ease: 'power2.inOut' }, tF);
    const night = { p: 0 };
    to(night, { p: 1, duration: 0.4, ease: 'power1.inOut' }, T.s7 - 0.2);
    onRender((t) => {
      const lg = intro.root.childNodes;
      for (const g of lg) {
        if (t >= tF - 0.01) g.removeAttribute('clip-path');
        else if (g.__clip) g.setAttribute('clip-path', g.__clip);
      }
      intro.words.forEach((w) => {
        const tn = w.textNode;
        tn.style.fontWeight = (800 - 200 * hdr.p).toFixed(1);
        tn.style.letterSpacing = `${(-0.035 * HL.size * (1 - hdr.p) + headerLsLocal * hdr.p).toFixed(3)}px`;
        tn.setAttribute('fill', night.p > 0 ? mix(C.ink500, C.ink300, night.p) : mix(C.ink900, C.ink500, hdr.p));
      });
    });
    for (const g of intro.root.childNodes) g.__clip = g.getAttribute('clip-path');
  }

  // Maison dessinée au trait au centre de la scène.
  const introHouseG = grp(L.worldInner);
  const introHouse = actor(introHouseG, { x: 540, y: 1092, s: 1 });
  const hk = 13.5;
  const hIcon = grp(introHouseG, { transform: `scale(${hk}) translate(-12 -12)` });
  const doorFill = el('path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8z', fill: C.am400 }, hIcon);
  const doorA = actor(doorFill, { o: 0 });
  const hBody = el('path', { d: ICON.houseBody[0], fill: 'none', stroke: C.ink900, 'stroke-width': 0.68, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, hIcon);
  const hDoor = el('path', { d: ICON.houseDoor[0], fill: 'none', stroke: C.ink900, 'stroke-width': 0.68, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, hIcon);
  const dBody = drawable(hBody), dDoor = drawable(hDoor);
  // les transforms internes de hIcon restent fixes ; on anime introHouse
  ft(dBody, { p: 0 }, { p: 1, duration: 0.7, ease: 'power2.inOut' }, 0.08);
  ft(dDoor, { p: 0 }, { p: 1, duration: 0.4, ease: 'power2.inOut' }, 0.42);
  ft(doorA, { o: 0 }, { o: 1, duration: 0.25 }, 0.62);
  to(introHouse, { s: 0.4, o: 0, duration: 0.22, ease: 'power3.in' }, 0.7);
  cue(0.08, 'draw', 0.5);

  /* ============================================================ S1 — Premier rendez-vous */
  const hl1 = headline(['Premier', 'rendez-vous']);
  hlIn(hl1, T.s1 + 0.06);

  const s1G = grp(L.worldInner);
  const s1 = actor(s1G, { x: 540, y: 1092, s: 0.6, o: 0 });
  card(s1G, 500, 500, { r: 40 });
  el('path', { d: topRoundRect(-250, -250, 500, 128, 40), fill: C.ink900 }, s1G);
  text(s1G, 'Rendez-vous', { x: 0, y: -175, size: 34, weight: 600, fill: C.white, anchor: 'middle' });
  for (const rx of [-150, 150]) el('rect', { x: rx - 11, y: -284, width: 22, height: 64, rx: 11, fill: C.ink600 }, s1G);
  const dateOdo = odometer(s1G, '00', { x: 0, y: 76, size: 210, weight: 800, anchor: 'middle', rep: 2 });
  const s1MetaG = grp(s1G);
  const s1Meta = actor(s1MetaG, { y: 14, o: 0 });
  text(s1MetaG, `Mardi · 10${NBSP}h${NBSP}00`, { x: 0, y: 160, size: 34, weight: 600, fill: C.ink500, anchor: 'middle' });
  const s1BadgeG = grp(s1G);
  const s1Badge = actor(s1BadgeG, { x: 238, y: -238, s: 0 });
  checkBadge(s1BadgeG, 44);

  function avatar(parent, r, bg, fg) {
    const g = grp(parent);
    const cid = uid('av');
    const cp = el('clipPath', { id: cid }, defs);
    el('circle', { r }, cp);
    el('circle', { r: r + 8, fill: C.white, filter: 'url(#shSm)' }, g);
    el('circle', { r, fill: bg }, g);
    const inner = grp(g, { 'clip-path': `url(#${cid})` });
    const k = r / 100;
    el('circle', { cx: 0, cy: -20 * k, r: 33 * k, fill: fg }, inner);
    el('path', { d: `M${-68 * k} ${104 * k}C${-68 * k} ${44 * k} ${-38 * k} ${24 * k} 0 ${24 * k}C${38 * k} ${24 * k} ${68 * k} ${44 * k} ${68 * k} ${104 * k}Z`, fill: fg }, inner);
    return g;
  }
  const avClientG = grp(L.worldInner);
  const avClient = actor(avClientG, { x: -220, y: 1150, o: 1 });
  avatar(avClientG, 88, C.am100, C.am600);
  text(avClientG, 'Vous', { x: 0, y: 150, size: 30, weight: 600, fill: C.ink700, anchor: 'middle' });
  const avBrokerG = grp(L.worldInner);
  const avBroker = actor(avBrokerG, { x: 1300, y: 1150, o: 1 });
  avatar(avBrokerG, 88, C.ink100, C.ink700);
  text(avBrokerG, 'Votre courtier', { x: 0, y: 150, size: 30, weight: 600, fill: C.ink700, anchor: 'middle' });

  ft(s1, { s: 0.6, o: 0, y: 1180, r: -6 }, { s: 1, o: 1, y: 1092, r: 0, duration: 0.65, ease: 'expo.out' }, T.s1 - 0.12);
  cue(T.s1 - 0.18, 'whoosh', 0.6);
  ft(avClient, { x: -220, r: -14 }, { x: 176, r: 0, duration: 0.6, ease: 'expo.out' }, T.s1 + 0.04);
  ft(avBroker, { x: 1300, r: 14 }, { x: 904, r: 0, duration: 0.6, ease: 'expo.out' }, T.s1 + 0.1);
  cue(T.s1 + 0.04, 'swish', 0.45);
  ft(dateOdo.cols[0], { pos: 0 }, { pos: 11, duration: 0.6, ease: 'power3.out' }, T.s1 + 0.2);
  ft(dateOdo.cols[1], { pos: 0 }, { pos: 14, duration: 0.75, ease: 'power3.out' }, T.s1 + 0.2);
  cue(T.s1 + 0.2, 'roll', 0.5);
  ft(s1Meta, { y: 14, o: 0 }, { y: 0, o: 1, duration: 0.45, ease: 'expo.out' }, T.s1 + 0.55);
  ft(s1Badge, { s: 0 }, { s: 1, duration: 0.45, ease: 'back.out(2.4)' }, T.s1 + 0.85);
  cue(T.s1 + 0.85, 'ding', 0.8);
  // petit hochement des deux personnages
  to(avClient, { x: 196, duration: 0.14, ease: 'power2.out' }, T.s1 + 0.86);
  to(avClient, { x: 176, duration: 0.24, ease: 'power2.inOut' }, T.s1 + 1.0);
  to(avBroker, { x: 884, duration: 0.14, ease: 'power2.out' }, T.s1 + 0.9);
  to(avBroker, { x: 904, duration: 0.24, ease: 'power2.inOut' }, T.s1 + 1.04);
  // sortie : les avatars s'écartent, la carte bascule vers le document
  to(avClient, { x: -260, r: -10, duration: 0.36, ease: 'power3.in' }, T.s2 - 0.24);
  to(avBroker, { x: 1340, r: 10, duration: 0.36, ease: 'power3.in' }, T.s2 - 0.22);

  /* ============================================================ S2 — Attestation de financement */
  const hl2 = headline(['Attestation', 'de financement']);
  hlSwap(hl1, hl2, T.s2 - 0.2);

  function docHeader(parent, iconPaths, title, subtitle) {
    el('circle', { cx: -200, cy: -268, r: 42, fill: C.ink100 }, parent);
    lucide(parent, iconPaths, { x: -200, y: -268, size: 46, color: C.ink900, sw: 2 });
    text(parent, title, { x: -140, y: -272, size: 40, weight: 700, family: FD, ls: -1 });
    text(parent, subtitle, { x: -140, y: -232, size: 28, weight: 500, fill: C.ink500 });
    el('rect', { x: -230, y: -188, width: 460, height: 3, rx: 1.5, fill: C.ink100 }, parent);
  }
  function stampRect(parent, label, o = {}) {
    const g = grp(parent);
    g.style.mixBlendMode = 'multiply';
    const col = o.color || C.em600;
    const tw = measure(label, { family: FD, size: o.size || 40, weight: 800, ls: -0.5 });
    const iconW = 40, gap = 12, total = iconW + gap + tw;
    const w = Math.max(o.w || 300, total + 68), h = o.h || 104;
    g.__w = w;
    el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 18, fill: 'none', stroke: col, 'stroke-width': 7 }, g);
    el('rect', { x: -w / 2 + 11, y: -h / 2 + 11, width: w - 22, height: h - 22, rx: 10, fill: 'none', stroke: col, 'stroke-width': 2.5 }, g);
    const xs = -total / 2;
    el('path', { d: `M${xs + 2} ${0}L${xs + 14} ${12}L${xs + 38} ${-13}`, fill: 'none', stroke: col, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    text(g, label, { x: xs + iconW + gap, y: (o.size || 40) * 0.36, size: o.size || 40, weight: 800, family: FD, fill: col, ls: -0.5 });
    return g;
  }
  function slam(a, at, o = {}) {
    // tampon : chute rapide, impact, onde de choc
    ft(a, { s: o.from || 2.3, o: 0, r: (o.r || -10) - 14 }, { s: 1, o: 1, r: o.r || -10, duration: 0.17, ease: 'power3.in' }, at);
    cue(at + 0.16, o.sound || 'stamp', o.v || 1);
    shake(at + 0.17, o.shake || 7, 0.12, 22);
  }
  function shockwave(parent, x, y, at, o = {}) {
    const g = grp(parent);
    el('rect', { x: -(o.w || 300) / 2, y: -(o.h || 104) / 2, width: o.w || 300, height: o.h || 104, rx: 22, fill: 'none', stroke: o.color || C.em600, 'stroke-width': 4 }, g);
    const a = actor(g, { x, y, s: 1, o: 0, r: o.r || -10 });
    ft(a, { s: 1, o: 0.7 }, { s: 1.45, o: 0, duration: 0.45, ease: 'power2.out' }, at);
    return a;
  }

  const s2G = grp(L.worldInner);
  const s2 = actor(s2G, { x: 540, y: 1100, sx: 0, o: 1 });
  card(s2G, 560, 720, { r: 36 });
  const s2Head = grp(s2G);
  const s2HeadA = actor(s2Head, { o: 0, y: 10 });
  docHeader(s2Head, ICON.fileCheck, 'Attestation', 'de financement');
  const s2Bars = [bar(s2G, -230, -138, 420), bar(s2G, -230, -102, 350)];
  const s2LabelG = grp(s2G);
  const s2Label = actor(s2LabelG, { o: 0 });
  text(s2LabelG, 'Capacité d’achat', { x: -230, y: -16, size: 30, weight: 600, fill: C.ink500 });
  const s2Odo = odometer(s2G, `000 000${NBSP}€`, { x: -230, y: 78, size: 92, weight: 800, rep: 3 });
  const s2Bars2 = [bar(s2G, -230, 150, 440), bar(s2G, -230, 186, 260)];
  const s2StampG = grp(s2G);
  const s2Stamp = actor(s2StampG, { x: 92, y: 268, s: 2.3, o: 0, r: -10 });
  stampRect(s2StampG, 'Budget validé', { w: 330, h: 104, size: 38 });
  const s2Wave = shockwave(s2G, 92, 268, T.s2 + 0.98, { w: s2StampG.firstChild.__w || 330, h: 104 });

  // bascule calendrier → attestation
  const flipAt2 = T.s2 - 0.26;
  ft(s1, { sx: 1, ky: 0 }, { sx: 0, ky: -7, duration: 0.17, ease: 'power2.in' }, flipAt2);
  ft(s2, { sx: 0, ky: 7, y: 1110 }, { sx: 1, ky: 0, y: 1100, duration: 0.3, ease: 'power3.out' }, flipAt2 + 0.17);
  cue(flipAt2, 'flip', 0.8);
  ft(s2HeadA, { o: 0, y: 10 }, { o: 1, y: 0, duration: 0.4, ease: 'expo.out' }, T.s2 + 0.08);
  s2Bars.forEach((b, i) => ft(b, { p: 0 }, { p: 1, duration: 0.4, ease: 'expo.out' }, T.s2 + 0.14 + i * 0.05));
  ft(s2Label, { o: 0 }, { o: 1, duration: 0.3 }, T.s2 + 0.18);
  const s2Digits = [3, 5, 0, 0, 0, 0];
  s2Odo.cols.forEach((c, i) => {
    ft(c, { pos: 0 }, { pos: s2Digits[i] + 10 * (1 + (i > 1 ? 1 : 0)), duration: 0.5 + i * 0.07, ease: 'power3.out' }, T.s2 + 0.2);
  });
  cue(T.s2 + 0.2, 'roll', 0.8);
  s2Bars2.forEach((b, i) => ft(b, { p: 0 }, { p: 1, duration: 0.4, ease: 'expo.out' }, T.s2 + 0.5 + i * 0.05));
  slam(s2Stamp, T.s2 + 0.82, { r: -10 });
  ft(s2, { s: 1 }, { s: 0.975, duration: 0.06, ease: 'power2.out' }, T.s2 + 0.99);
  to(s2, { s: 1, duration: 0.3, ease: 'back.out(2)' }, T.s2 + 1.05);
  // sortie vers la gauche
  to(s2, { x: -520, r: -9, duration: 0.42, ease: 'power3.in' }, T.s3 - 0.22);
  cue(T.s3 - 0.2, 'whoosh', 0.9);

  /* ============================================================ S3 — Visites, puis offre d'achat */
  const hl3 = headline([[{ t: 'Visites,' }], [{ t: 'puis', weight: 600, color: C.ink400 }, { t: 'offre' }, { t: 'd’achat' }]]);
  hlSwap(hl2, hl3, T.s3 - 0.2, { lines: [0] });
  hlIn(hl3, T.s3 + 0.82, { lines: [1], dur: 0.6 });

  function houseIllu(parent, o) {
    const g = grp(parent, { transform: `translate(${o.x || 0} ${o.y || 0}) scale(${o.k || 1})` });
    el('circle', { cx: 92, cy: -44, r: 30, fill: o.tree || C.am200 }, g);
    el('rect', { x: 89, y: -20, width: 6, height: 20, rx: 3, fill: C.ink500 }, g);
    el('rect', { x: 34, y: -150, width: 20, height: 44, rx: 3, fill: o.chimney || C.ink600 }, g);
    el('rect', { x: -70, y: -92, width: 140, height: 92, fill: o.body || C.white }, g);
    el('path', { d: 'M-88 -84L0 -152L88 -84', fill: 'none', stroke: o.roof, 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    el('rect', { x: -15, y: -52, width: 30, height: 52, rx: 5, fill: o.door || C.ink800 }, g);
    el('rect', { x: -54, y: -72, width: 26, height: 24, rx: 4, fill: o.win || C.ink150 }, g);
    el('rect', { x: 28, y: -72, width: 26, height: 24, rx: 4, fill: o.win || C.ink150 }, g);
    el('rect', { x: -112, y: -2, width: 230, height: 6, rx: 3, fill: o.ground || C.ink150 }, g);
    return g;
  }
  const houses = [
    { panel: C.ink100, roof: C.ink600, door: C.am400, price: `295${NBSP}000${NBSP}€`, x: 196 },
    { panel: C.am100, roof: C.am500, door: C.ink800, price: `335${NBSP}000${NBSP}€`, x: 540 },
    { panel: C.sand200, roof: C.ink400, door: C.am500, price: `348${NBSP}000${NBSP}€`, x: 884 },
  ].map((h, i) => {
    const g = grp(L.worldInner);
    const a = actor(g, { x: h.x + 1100, y: 1080, o: 1 });
    card(g, 304, 404, { r: 32 });
    el('rect', { x: -132, y: -182, width: 264, height: 214, rx: 22, fill: h.panel }, g);
    houseIllu(g, { x: -8, y: 10, k: 0.92, roof: h.roof, door: h.door, tree: [C.ink150, C.am200, C.am100][i] });
    lucide(g, ICON.mapPin, { x: -114, y: 84, size: 30, color: C.ink400, sw: 2.2 });
    bar(g, -92, 84, 110, { p: 1, h: 14 });
    text(g, h.price, { x: -128, y: 152, size: 36, weight: 700, family: FD, ls: -0.8 });
    return Object.assign(h, { g, a });
  });
  const hB = houses[1];
  const heartG = grp(hB.g);
  const heart = actor(heartG, { x: 100, y: -146, s: 0 });
  el('circle', { r: 30, fill: C.white, filter: 'url(#shXs)' }, heartG);
  lucide(heartG, ICON.heart, { x: 0, y: 1, size: 32, color: C.am500, fill: C.am500, sw: 1.6 });

  houses.forEach((h, i) => {
    ft(h.a, { x: h.x + 1100, r: 8 }, { x: h.x, r: 0, duration: 0.7, ease: 'expo.out' }, T.s3 - 0.12 + i * 0.07);
  });
  cue(T.s3 - 0.1, 'swish', 0.7);
  // sélection du coup de cœur
  const tSel = T.s3 + 0.45;
  to(hB.a, { s: 1.08, duration: 0.35, ease: 'back.out(2)' }, tSel);
  [houses[0], houses[2]].forEach((h) => to(h.a, { s: 0.9, o: 0.45, duration: 0.35, ease: 'power2.out' }, tSel));
  ft(heart, { s: 0 }, { s: 1, duration: 0.45, ease: 'back.out(3)' }, tSel + 0.08);
  cue(tSel + 0.08, 'pop', 0.8);
  // offre d'achat
  const tOff = T.s3 + 0.82;
  to(houses[0].a, { x: -260, duration: 0.32, ease: 'power3.in' }, tOff);
  to(houses[2].a, { x: 1340, duration: 0.32, ease: 'power3.in' }, tOff);
  to(hB.a, { y: 990, s: 0.92, duration: 0.5, ease: 'expo.out' }, tOff + 0.02);

  const offerG = grp(L.worldInner);
  const offer = actor(offerG, { x: 540, y: 2240, o: 1 });
  card(offerG, 600, 206, { r: 32 });
  text(offerG, 'Votre offre d’achat', { x: -262, y: -36, size: 26, weight: 600, fill: C.ink500 });
  const offerOdo = odometer(offerG, `000 000${NBSP}€`, { x: -262, y: 48, size: 60, weight: 800, rep: 3 });
  const btnG = grp(offerG, { transform: 'translate(172 6)' });
  const btnA = actor(btnG, { x: 172, y: 6 });
  const btnRect = el('rect', { x: -94, y: -36, width: 188, height: 72, rx: 36, fill: C.ink900 }, btnG);
  const btnCol = { p: 0 };
  onRender(() => btnRect.setAttribute('fill', mix(C.ink900, C.em600, btnCol.p)));
  const btnCid = uid('btn');
  const btnCp = el('clipPath', { id: btnCid }, defs);
  el('rect', { x: -94, y: -36, width: 188, height: 72, rx: 36 }, btnCp);
  const btnClip = grp(btnG, { 'clip-path': `url(#${btnCid})` });
  const btnLabels = ['Envoyer', 'Envoyée', 'Acceptée'].map((s, i) => {
    const lg = grp(btnClip);
    text(lg, s, { x: 0, y: 10, size: 28, weight: 600, fill: C.white, anchor: 'middle' });
    return actor(lg, { y: i === 0 ? 0 : 60 });
  });
  const rippleG = grp(btnClip);
  el('circle', { r: 60, fill: C.white }, rippleG);
  const ripple = actor(rippleG, { s: 0, o: 0 });
  const offerBadgeG = grp(offerG);
  const offerBadge = actor(offerBadgeG, { x: 286, y: -92, s: 0 });
  checkBadge(offerBadgeG, 30);

  ft(offer, { y: 2240 }, { y: 1338, duration: 0.6, ease: 'expo.out' }, tOff + 0.06);
  cue(tOff + 0.05, 'swish', 0.6);
  const offerDigits = [3, 2, 0, 0, 0, 0];
  offerOdo.cols.forEach((c, i) => ft(c, { pos: 0 }, { pos: offerDigits[i] + 10 * (1 + (i > 1 ? 1 : 0)), duration: 0.42 + i * 0.06, ease: 'power3.out' }, tOff + 0.2));
  cue(tOff + 0.2, 'roll', 0.6);

  // curseur : arrive, clique, repart
  const cursorG = grp(L.worldInner);
  const cursor = actor(cursorG, { x: 980, y: 1700, o: 0 });
  el('path', { d: 'M0 0L0 50L13 38L23 60L33 55L23 34L41 34Z', fill: C.white, stroke: C.ink900, 'stroke-width': 3.5, 'stroke-linejoin': 'round', filter: 'url(#shXs)' }, cursorG);
  const tTap = T.s3 + 1.45;
  ft(cursor, { x: 990, y: 1720, o: 0 }, { x: 722, y: 1352, o: 1, duration: 0.42, ease: 'expo.out' }, tTap - 0.42);
  ft(cursor, { s: 1 }, { s: 0.84, duration: 0.07, ease: 'power2.in' }, tTap);
  to(cursor, { s: 1, duration: 0.2, ease: 'back.out(3)' }, tTap + 0.07);
  ft(btnA, { s: 1 }, { s: 0.94, duration: 0.07, ease: 'power2.in' }, tTap);
  to(btnA, { s: 1, duration: 0.24, ease: 'back.out(3)' }, tTap + 0.07);
  ft(ripple, { s: 0, o: 0.35 }, { s: 2.2, o: 0, duration: 0.45, ease: 'power2.out' }, tTap + 0.04);
  cue(tTap + 0.02, 'click', 1);
  ft(btnLabels[0], { y: 0 }, { y: -60, duration: 0.3, ease: 'power3.inOut' }, tTap + 0.1);
  ft(btnLabels[1], { y: 60 }, { y: 0, duration: 0.3, ease: 'power3.inOut' }, tTap + 0.1);
  to(cursor, { x: 860, y: 1560, o: 0, duration: 0.3, ease: 'power3.in' }, tTap + 0.32);

  /* ============================================================ S4 — Offre acceptée, compromis signé */
  const hl4 = headline(['Offre acceptée,', 'compromis signé']);
  hlSwap(hl3, hl4, T.s4 - 0.2, { lines: [0] });
  hlIn(hl4, T.s4 + 0.85, { lines: [1], dur: 0.6 });

  // Notification système
  const notifG = grp(L.worldInner);
  const notif = actor(notifG, { x: 540, y: 690, o: 0 });
  card(notifG, 700, 160, { r: 38, shadow: 'shCard' });
  const nb = grp(notifG, { transform: 'translate(-280 0)' });
  checkBadge(nb, 40, { ring: 0 });
  text(notifG, 'Offre acceptée', { x: -218, y: -8, size: 38, weight: 700, family: FD, ls: -0.8 });
  text(notifG, 'Le vendeur a accepté votre offre', { x: -218, y: 36, size: 27, weight: 500, fill: C.ink500 });
  text(notifG, 'à l’instant', { x: 318, y: -30, size: 22, weight: 500, fill: C.ink400, anchor: 'end' });
  ft(notif, { y: 690, o: 0 }, { y: 808, o: 1, duration: 0.55, ease: 'expo.out' }, T.s4 - 0.02);
  cue(T.s4 - 0.02, 'notif', 1);
  ft(btnCol, { p: 0 }, { p: 1, duration: 0.3, ease: 'power2.out' }, T.s4 + 0.12);
  ft(btnLabels[1], { y: 0 }, { y: -60, duration: 0.3, ease: 'power3.inOut' }, T.s4 + 0.12);
  ft(btnLabels[2], { y: 60 }, { y: 0, duration: 0.3, ease: 'power3.inOut' }, T.s4 + 0.12);
  ft(offerBadge, { s: 0 }, { s: 1, duration: 0.42, ease: 'back.out(2.6)' }, T.s4 + 0.2);
  cue(T.s4 + 0.2, 'ding', 0.6);

  // Bascule maison + offre → compromis
  const flipAt4 = T.s4 + 0.5;
  ft(hB.a, { sx: 1, ky: 0 }, { sx: 0, ky: -7, duration: 0.17, ease: 'power2.in' }, flipAt4);
  ft(offer, { sx: 1, ky: 0 }, { sx: 0, ky: -7, duration: 0.17, ease: 'power2.in' }, flipAt4);
  to(notif, { y: 700, o: 0, duration: 0.3, ease: 'power3.in' }, flipAt4 + 0.06);
  cue(flipAt4, 'flip', 0.8);

  const s4G = grp(L.worldInner);
  const s4 = actor(s4G, { x: 540, y: 1100, sx: 0 });
  card(s4G, 560, 720, { r: 36 });
  docHeader(s4G, ICON.scroll, 'Compromis', 'de vente');
  const s4Bars = [bar(s4G, -230, -138, 440), bar(s4G, -230, -102, 400), bar(s4G, -230, -66, 300)];
  const sigBoxes = [{ x: -250, label: 'L’acheteur' }, { x: 12, label: 'Le vendeur' }].map((b) => {
    el('rect', { x: b.x, y: 16, width: 238, height: 228, rx: 22, fill: C.ink50, stroke: C.ink150, 'stroke-width': 2 }, s4G);
    text(s4G, b.label, { x: b.x + 22, y: 58, size: 25, weight: 600, fill: C.ink500 });
    el('path', { d: `M${b.x + 22} 200H${b.x + 216}`, stroke: C.ink200, 'stroke-width': 3, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }, s4G);
    const bg = grp(s4G);
    const ba = actor(bg, { x: b.x + 220, y: 34, s: 0 });
    checkBadge(bg, 18, { ring: 4 });
    return Object.assign(b, { badge: ba });
  });
  const sigA = el('path', { d: 'M-222 186C-214 140 -196 112 -186 128C-178 142 -196 176 -188 186C-180 196 -170 150 -160 146C-150 142 -156 184 -146 184C-136 184 -132 152 -122 152C-110 152 -116 182 -102 180C-88 178 -82 150 -70 156C-60 162 -66 182 -52 178C-40 174 -36 166 -30 164', fill: 'none', stroke: C.ink900, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, s4G);
  const sigB = el('path', { d: 'M40 180C46 150 58 120 72 124C86 128 64 176 78 180C92 184 98 140 112 140C124 140 116 178 130 176C146 174 150 146 164 148C176 150 168 178 184 174C196 170 206 158 222 150', fill: 'none', stroke: C.ink900, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, s4G);
  const dSigA = drawable(sigA), dSigB = drawable(sigB);

  ft(s4, { sx: 0, ky: 7, y: 1110 }, { sx: 1, ky: 0, y: 1100, duration: 0.3, ease: 'power3.out' }, flipAt4 + 0.17);
  s4Bars.forEach((b, i) => ft(b, { p: 0 }, { p: 1, duration: 0.4, ease: 'expo.out' }, flipAt4 + 0.3 + i * 0.05));

  // Stylo qui suit les signatures
  function makePen(parent) {
    const g = grp(parent);
    const body = grp(g, { transform: 'rotate(38)' });
    el('path', { d: 'M0 0L-11 -34H11Z', fill: C.am500 }, body);
    el('rect', { x: -13, y: -80, width: 26, height: 50, rx: 6, fill: C.ink600 }, body);
    el('rect', { x: -15, y: -262, width: 30, height: 190, rx: 15, fill: C.ink900 }, body);
    el('rect', { x: 9, y: -236, width: 8, height: 92, rx: 4, fill: C.am400 }, body);
    el('rect', { x: -15, y: -276, width: 30, height: 26, rx: 10, fill: C.am400 }, body);
    el('rect', { x: -9, y: -250, width: 5, height: 160, rx: 2.5, fill: C.white, opacity: 0.18 }, body);
    return g;
  }
  const penG = makePen(L.worldInner);
  const pen = actor(penG, { x: 900, y: 1500, o: 0 });
  function penFollow(path, d, docActor) {
    const pt = path.getPointAtLength(d.len * clamp01(d.p));
    // document centré en (docActor.x, docActor.y), échelle 1 : repère local → monde
    return [docActor.x + pt.x, docActor.y + pt.y];
  }
  const tSigA = T.s4 + 0.95, tSigB = T.s4 + 1.33;
  ft(dSigA, { p: 0 }, { p: 1, duration: 0.34, ease: 'power1.inOut' }, tSigA);
  ft(dSigB, { p: 0 }, { p: 1, duration: 0.26, ease: 'power1.inOut' }, tSigB);
  cue(tSigA, 'scribble', 0.9);
  cue(tSigB, 'scribble', 0.8);
  sigBoxes.forEach((b, i) => {
    ft(b.badge, { s: 0 }, { s: 1, duration: 0.4, ease: 'back.out(2.6)' }, (i === 0 ? tSigA + 0.34 : tSigB + 0.26) + 0.02);
  });
  cue(tSigB + 0.28, 'pop', 0.5);
  // le compromis signé est remis au courtier
  const tHand = T.s5 - 0.12;
  to(s4, { y: 1386, s: 0.14, r: -10, duration: 0.5, ease: 'power3.inOut' }, tHand);
  to(s4, { o: 0, duration: 0.12 }, tHand + 0.4);
  cue(tHand, 'whoosh', 0.7);

  /* ============================================================ S5 — Négociation avec les banques */
  const hl5 = headline(['Négociation', 'avec les banques']);
  hlSwap(hl4, hl5, T.s5 - 0.2);

  const brokerG = grp(L.worldInner);
  const broker = actor(brokerG, { x: 540, y: 1386, s: 0.4, o: 0 });
  avatar(brokerG, 70, C.ink100, C.ink700);
  text(brokerG, 'Votre courtier', { x: 0, y: 116, size: 28, weight: 600, fill: C.ink700, anchor: 'middle' });
  ft(broker, { s: 0.4, o: 0 }, { s: 1, o: 1, duration: 0.4, ease: 'back.out(2)' }, T.s5 - 0.08);
  ft(broker, { s: 1 }, { s: 1.12, duration: 0.1, ease: 'power2.out' }, tHand + 0.48);
  to(broker, { s: 1, duration: 0.3, ease: 'back.out(3)' }, tHand + 0.58);
  cue(tHand + 0.48, 'pop', 0.5);

  const bankDefs = [
    { x: 212, from: [3, 8, 5], r1: [3, 6, 2], r2: [3, 4, 8] },
    { x: 540, from: [3, 9, 0], r1: [3, 5, 1], r2: [3, 2, 0] },
    { x: 868, from: [3, 7, 9], r1: [3, 6, 0], r2: [3, 5, 5] },
  ];
  const linkG = grp(L.worldInner);
  const links = bankDefs.map((b) => {
    const p = el('path', { d: `M540 1318Q${b.x} 1250 ${b.x} 1150`, fill: 'none', stroke: C.ink300, 'stroke-width': 4, 'stroke-linecap': 'round' }, linkG);
    return { path: p, d: drawable(p), b };
  });
  const linkA = actor(linkG, { o: 1 });
  const pulses = links.map((l) => {
    const g = grp(L.worldInner);
    el('circle', { r: 12, fill: C.em600, stroke: C.white, 'stroke-width': 4 }, g);
    const a = actor(g, { o: 0 });
    const st = { p: 0 };
    onRender(() => {
      const pt = l.path.getPointAtLength(l.d.len * clamp01(st.p));
      a.x = pt.x; a.y = pt.y;
    });
    return { a, st };
  });
  const banks = bankDefs.map((b, i) => {
    const g = grp(L.worldInner);
    const a = actor(g, { x: b.x, y: 1020, s: 0.5, o: 0 });
    const box = el('rect', { x: -135, y: -160, width: 270, height: 320, rx: 32, fill: C.white, filter: 'url(#shCard)' }, g);
    const border = el('rect', { x: -135, y: -160, width: 270, height: 320, rx: 32, fill: 'none', stroke: C.em600, 'stroke-width': 6 }, g);
    const borderA = { o: 0 };
    const contentG = grp(g);
    const content = actor(contentG, { o: 1 });
    el('circle', { cx: 0, cy: -72, r: 56, fill: C.ink100 }, contentG);
    lucide(contentG, ICON.landmark, { x: 0, y: -74, size: 62, color: C.ink800, sw: 2 });
    bar(contentG, -55, 4, 110, { p: 1, h: 14 });
    const odo = odometer(contentG, `0,00${NBSP}%`, { x: 0, y: 92, size: 58, weight: 800, anchor: 'middle', rep: 3 });
    odo.cols.forEach((c, k) => { c.pos = b.from[k] + 10; });
    const arrowG = grp(contentG);
    const arrow = actor(arrowG, { x: 96, y: -124, s: 0 });
    el('circle', { r: 26, fill: C.em100 }, arrowG);
    lucide(arrowG, ICON.trendingDown, { x: 0, y: 0, size: 30, color: C.em700, sw: 2.6 });
    onRender(() => {
      border.setAttribute('opacity', borderA.o.toFixed(3));
      border.setAttribute('display', borderA.o < 0.01 ? 'none' : 'inline');
    });
    return Object.assign(b, { g, a, box, border, borderA, content, odo, arrow, i });
  });

  banks.forEach((b, i) => ft(b.a, { y: 1020, s: 0.5, o: 0 }, { y: 980, s: 1, o: 1, duration: 0.55, ease: 'back.out(1.7)' }, T.s5 + 0.05 + [0.06, 0, 0.12][i]));
  cue(T.s5 + 0.05, 'pop', 0.7);
  cue(T.s5 + 0.11, 'pop', 0.6);
  cue(T.s5 + 0.17, 'pop', 0.55);
  links.forEach((l, i) => ft(l.d, { p: 0 }, { p: 1, duration: 0.3, ease: 'power2.out' }, T.s5 + 0.3 + i * 0.04));
  const rounds = [T.s5 + 0.45, T.s5 + 0.9];
  rounds.forEach((tr, ri) => {
    pulses.forEach((pu, i) => {
      ft(pu.a, { o: 0 }, { o: 1, duration: 0.06 }, tr + i * 0.05);
      ft(pu.st, { p: 0 }, { p: 1, duration: 0.3, ease: 'power1.inOut' }, tr + i * 0.05);
      to(pu.a, { o: 0, duration: 0.08 }, tr + i * 0.05 + 0.3);
    });
    cue(tr, 'pulse', 0.6);
    banks.forEach((b, i) => {
      const target = ri === 0 ? b.r1 : b.r2;
      const tHit = tr + i * 0.05 + 0.3;
      b.odo.cols.forEach((c, k) => {
        const fromD = ri === 0 ? b.from[k] : b.r1[k];
        if (fromD === target[k]) return;
        ft(c, { pos: fromD + 10 }, { pos: target[k] + 10 - (target[k] > fromD ? 10 : 0), duration: 0.42, ease: 'power3.out' }, tHit);
      });
      if (ri === 0) ft(b.arrow, { s: 0 }, { s: 1, duration: 0.4, ease: 'back.out(3)' }, tHit);
      else {
        ft(b.arrow, { s: 1 }, { s: 1.25, duration: 0.1, ease: 'power2.out' }, tHit);
        to(b.arrow, { s: 1, duration: 0.3, ease: 'back.out(3)' }, tHit + 0.1);
      }
    });
    cue(tr + 0.3, 'tickdown', 0.7);
  });
  // la meilleure proposition se détache
  const tWin = T.s5 + 1.5;
  const bW = banks[1];
  to(bW.a, { s: 1.1, y: 958, duration: 0.3, ease: 'back.out(1.8)' }, tWin);
  ft(bW.borderA, { o: 0 }, { o: 1, duration: 0.25 }, tWin);
  [banks[0], banks[2]].forEach((b) => to(b.a, { s: 0.9, o: 0.4, duration: 0.35, ease: 'power2.out' }, tWin));
  to(linkA, { o: 0, duration: 0.3 }, tWin);
  cue(tWin, 'rise', 0.6);
  const s5StampG = grp(bW.g);
  const s5Stamp = actor(s5StampG, { x: 0, y: -40, s: 2.3, o: 0, r: -9 });
  stampRect(s5StampG, 'Accord de prêt', { w: 312, h: 96, size: 34 });
  const tAcc = T.s5 + 1.65;
  slam(s5Stamp, tAcc, { r: -9, v: 1 });
  const s5Wave = shockwave(bW.g, 0, -40, tAcc + 0.17, { w: s5StampG.firstChild.__w || 312, h: 96, r: -9 });
  ft(bW.a, { s: 1.1 }, { s: 1.07, duration: 0.06 }, tAcc + 0.17);
  to(bW.a, { s: 1.1, duration: 0.1, ease: 'power2.out' }, tAcc + 0.23);

  // la carte gagnante devient l'offre de prêt
  const tMorph = T.s5 + 2.05;
  const morph = { w: 270, h: 320 };
  onRender(() => {
    for (const r of [bW.box, bW.border]) {
      r.setAttribute('x', (-morph.w / 2).toFixed(2)); r.setAttribute('y', (-morph.h / 2).toFixed(2));
      r.setAttribute('width', morph.w.toFixed(2)); r.setAttribute('height', morph.h.toFixed(2));
    }
  });
  to(morph, { w: 560, h: 720, duration: 0.5, ease: 'expo.inOut' }, tMorph);
  to(bW.a, { y: 1100, s: 1, duration: 0.5, ease: 'expo.inOut' }, tMorph);
  to(bW.content, { o: 0, duration: 0.14 }, tMorph);
  to(bW.borderA, { o: 0, duration: 0.3 }, tMorph);
  to(s5Stamp, { x: 108, y: 270, s: 0.9, duration: 0.5, ease: 'expo.inOut' }, tMorph);
  to(banks[0].a, { x: -260, duration: 0.34, ease: 'power3.in' }, tMorph - 0.04);
  to(banks[2].a, { x: 1340, duration: 0.34, ease: 'power3.in' }, tMorph - 0.04);
  to(broker, { y: 2200, duration: 0.36, ease: 'power3.in' }, tMorph - 0.04);
  cue(tMorph, 'whoosh', 0.7);
  const loanG = grp(bW.g);
  const loan = actor(loanG, { o: 0, y: 14 });
  docHeader(loanG, ICON.landmark, 'Offre de prêt', 'Banque retenue');
  text(loanG, 'Taux', { x: -230, y: -120, size: 30, weight: 600, fill: C.ink500 });
  text(loanG, `3,20${NBSP}%`, { x: -230, y: -24, size: 104, weight: 800, family: FD, ls: -2 });
  text(loanG, 'sur 25 ans', { x: -230, y: 30, size: 30, weight: 600, fill: C.ink500 });
  bar(loanG, -230, 94, 440, { p: 1 });
  bar(loanG, -230, 130, 360, { p: 1 });
  bar(loanG, -230, 166, 250, { p: 1 });
  ft(loan, { o: 0, y: 14 }, { o: 1, y: 0, duration: 0.32, ease: 'expo.out' }, tMorph + 0.16);
  // l'ordre de dessin met le tampon au-dessus du contenu
  bW.g.appendChild(s5StampG);
  bW.g.appendChild(s5Wave.node);

  /* ============================================================ S6 — Acte signé, clés récupérées */
  const hl6 = headline(['Acte signé,', 'clés récupérées']);
  hlSwap(hl5, hl6, T.s6 - 0.2, { lines: [0] });

  // l'acte authentique se pose sur l'offre de prêt (pile de documents)
  const s6G = grp(L.worldInner);
  const s6 = actor(s6G, { x: 540, y: 2420 });
  card(s6G, 560, 720, { r: 36 });
  docHeader(s6G, ICON.stamp, 'Acte', 'authentique');
  const s6Bars = [bar(s6G, -230, -138, 440), bar(s6G, -230, -102, 410), bar(s6G, -230, -66, 330), bar(s6G, -230, -30, 200)];
  el('rect', { x: -250, y: 28, width: 500, height: 200, rx: 22, fill: C.ink50, stroke: C.ink150, 'stroke-width': 2 }, s6G);
  text(s6G, 'Signature', { x: -228, y: 70, size: 25, weight: 600, fill: C.ink500 });
  el('path', { d: 'M-228 186H200', stroke: C.ink200, 'stroke-width': 3, 'stroke-dasharray': '2 9', 'stroke-linecap': 'round' }, s6G);
  const sigC = el('path', { d: 'M-200 178C-192 136 -176 104 -164 112C-150 122 -176 170 -160 176C-146 182 -136 140 -122 136C-110 132 -118 172 -104 172C-88 172 -84 128 -66 130C-52 132 -64 170 -48 170C-30 170 -24 138 -6 140C8 142 0 168 16 166C36 164 50 140 74 128', fill: 'none', stroke: C.ink900, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, s6G);
  const dSigC = drawable(sigC);
  // Sceau notarial (cachet ambré)
  const sealG = grp(s6G);
  const seal = actor(sealG, { x: 168, y: 238, s: 2.3, o: 0, r: -14 });
  {
    let d = '';
    const n = 18;
    for (let k = 0; k <= n * 2; k++) {
      const ang = (k / (n * 2)) * Math.PI * 2, rr = k % 2 === 0 ? 82 : 72;
      d += `${k === 0 ? 'M' : 'L'}${(Math.cos(ang) * rr).toFixed(2)} ${(Math.sin(ang) * rr).toFixed(2)}`;
    }
    el('path', { d: `${d}Z`, fill: C.am500, 'stroke-linejoin': 'round', stroke: C.am500, 'stroke-width': 6 }, sealG);
    el('circle', { r: 58, fill: 'none', stroke: C.am200, 'stroke-width': 3 }, sealG);
    lucide(sealG, ICON.houseBody.concat(ICON.houseDoor), { x: 0, y: -2, size: 56, color: C.white, sw: 2.2 });
  }
  const tStack = T.s6 - 0.14;
  ft(s6, { y: 2420, r: 7 }, { y: 1100, r: 0, duration: 0.6, ease: 'expo.out' }, tStack);
  to(bW.a, { s: 0.9, o: 0, duration: 0.42, ease: 'power2.in' }, tStack + 0.06);
  cue(tStack, 'swish', 0.8);
  s6Bars.forEach((b, i) => ft(b, { p: 0 }, { p: 1, duration: 0.4, ease: 'expo.out' }, tStack + 0.22 + i * 0.04));
  const tSigC = T.s6 + 0.45;
  ft(dSigC, { p: 0 }, { p: 1, duration: 0.32, ease: 'power1.inOut' }, tSigC);
  cue(tSigC, 'scribble', 0.9);
  // Stylo : un seul pilotage, fonction pure du temps, pour les trois signatures.
  function penEnter(t, t0, dur, path, doc) {
    const f = clamp01((t - t0) / dur), e = easeOutExpo(f);
    const a = path.getPointAtLength(0);
    return [960 + (doc.x + a.x - 960) * e, 1580 + (doc.y + a.y - 1580) * e, Math.min(1, f * 3)];
  }
  function penLeave(t, t0, dur, path, d, doc) {
    const f = clamp01((t - t0) / dur), e = f * f * f;
    const b = path.getPointAtLength(d.len);
    return [doc.x + b.x + e * 420, doc.y + b.y + e * 360, 1 - e];
  }
  onRender((t) => {
    let st = null;
    if (t >= tSigA - 0.24 && t < tSigA) st = penEnter(t, tSigA - 0.24, 0.24, sigA, s4);
    else if (t >= tSigA && t < tSigB - 0.06) st = penFollow(sigA, dSigA, s4).concat(1);
    else if (t >= tSigB - 0.06 && t < tSigB) {
      const f = (t - (tSigB - 0.06)) / 0.06, e = easeInOutCubic(f);
      const a = sigA.getPointAtLength(dSigA.len), b = sigB.getPointAtLength(0);
      st = [s4.x + a.x + (b.x - a.x) * e, s4.y + a.y + (b.y - a.y) * e - Math.sin(Math.PI * f) * 30, 1];
    } else if (t >= tSigB && t < tSigB + 0.26) st = penFollow(sigB, dSigB, s4).concat(1);
    else if (t >= tSigB + 0.26 && t < tSigB + 0.5) st = penLeave(t, tSigB + 0.26, 0.24, sigB, dSigB, s4);
    else if (t >= tSigC - 0.22 && t < tSigC) st = penEnter(t, tSigC - 0.22, 0.22, sigC, s6);
    else if (t >= tSigC && t < tSigC + 0.32) st = penFollow(sigC, dSigC, s6).concat(1);
    else if (t >= tSigC + 0.32 && t < tSigC + 0.58) st = penLeave(t, tSigC + 0.32, 0.26, sigC, dSigC, s6);
    if (st) { pen.x = st[0]; pen.y = st[1]; pen.o = st[2]; } else { pen.o = 0; }
  });
  const tSeal = T.s6 + 0.8;
  slam(seal, tSeal, { r: -14, from: 2.4, sound: 'stamp', v: 1 });
  ft(s6, { s: 1 }, { s: 0.975, duration: 0.06 }, tSeal + 0.17);
  to(s6, { s: 1, duration: 0.25, ease: 'back.out(2)' }, tSeal + 0.23);
  // les clés tombent devant l'acte, qui s'efface ensuite vers le bas
  const keyDrop = T.s6 + 0.98;
  hlIn(hl6, keyDrop + 0.05, { lines: [1], dur: 0.6 });
  to(s6, { y: 2480, r: 8, duration: 0.45, ease: 'power3.in' }, keyDrop + 0.22);
  cue(keyDrop + 0.22, 'whoosh', 0.5);

  // Trousseau : anneau + clé + porte-clés maison
  const keyPivot = { x: 540, y: 742 };
  const keyG = grp(L.worldInner);
  const key = actor(keyG, { x: keyPivot.x, y: keyPivot.y - 1500 });
  const tagG = grp(keyG);
  const tagA = actor(tagG, { x: 0, y: 30 });
  {
    const tg = grp(tagG, { transform: 'rotate(-26)' });
    el('rect', { x: -5, y: 0, width: 10, height: 44, rx: 5, fill: C.ink300 }, tg);
    el('path', { d: 'M-58 104L0 52L58 104V196Q58 212 42 212H-42Q-58 212 -58 196Z', fill: C.em600, 'stroke-linejoin': 'round', stroke: C.em600, 'stroke-width': 10 }, tg);
    el('circle', { cx: 0, cy: 92, r: 11, fill: C.am100 }, tg);
    el('rect', { x: -16, y: 150, width: 32, height: 48, rx: 6, fill: C.em700 }, tg);
  }
  el('circle', { cx: 0, cy: 0, r: 50, fill: 'none', stroke: C.ink300, 'stroke-width': 11 }, keyG);
  const keyBodyG = grp(keyG);
  const keyHole = { x: 0, y: 62, r: 25 };
  {
    const bow = `M0 ${100 - 92}A92 92 0 1 1 0 ${100 + 92}A92 92 0 1 1 0 ${100 - 92}Z M0 ${keyHole.y - keyHole.r}A${keyHole.r} ${keyHole.r} 0 1 0 0 ${keyHole.y + keyHole.r}A${keyHole.r} ${keyHole.r} 0 1 0 0 ${keyHole.y - keyHole.r}Z`;
    el('rect', { x: -27, y: 170, width: 54, height: 360, rx: 10, fill: C.am400 }, keyBodyG);
    el('path', { d: 'M27 410H64V444H44V470H64V506H27Z', fill: C.am400, 'stroke-linejoin': 'round' }, keyBodyG);
    el('rect', { x: -46, y: 188, width: 92, height: 34, rx: 12, fill: C.am500 }, keyBodyG);
    el('path', { d: bow, fill: C.am400, 'fill-rule': 'evenodd' }, keyBodyG);
    el('circle', { cx: 0, cy: 100, r: 92, fill: 'none', stroke: C.am500, 'stroke-width': 6, opacity: 0.6 }, keyBodyG);
    el('rect', { x: -14, y: 240, width: 9, height: 270, rx: 4.5, fill: C.white, opacity: 0.28 }, keyBodyG);
    el('circle', { cx: 0, cy: keyHole.y, r: keyHole.r + 7, fill: 'none', stroke: C.am500, 'stroke-width': 5 }, keyBodyG);
  }
  ft(key, { y: keyPivot.y - 1500 }, { y: keyPivot.y, duration: 0.55, ease: 'expo.out' }, keyDrop);
  cue(keyDrop + 0.12, 'keys', 1);
  onRender((t) => {
    const dt = t - keyDrop;
    if (dt <= 0) { key.r = 0; tagA.r = 0; return; }
    const env = Math.exp(-dt / 0.34);
    key.r = 24 * env * Math.sin(2 * Math.PI * 1.55 * dt + 0.25) * clamp01(dt / 0.05 + 0.6);
    const dt2 = Math.max(0, dt - 0.07);
    tagA.r = 30 * Math.exp(-dt2 / 0.42) * Math.sin(2 * Math.PI * 1.3 * dt2);
  });
  // étincelles
  const sparkles = [[352, 930, 1.0], [748, 1090, 0.8], [400, 1240, 0.7], [700, 820, 0.9], [330, 1100, 0.55]].map((p, i) => {
    const g = grp(L.worldInner);
    el('path', { d: 'M0 -34C5 -7 7 -5 34 0C7 5 5 7 0 34C-5 7 -7 5 -34 0C-7 -5 -5 -7 0 -34Z', fill: C.am500 }, g);
    const a = actor(g, { x: p[0], y: p[1], s: 0 });
    const t0 = keyDrop + 0.36 + i * 0.06;
    ft(a, { s: 0, r: -40 }, { s: p[2], r: 0, duration: 0.3, ease: 'back.out(2.5)' }, t0);
    to(a, { s: 0, r: 40, duration: 0.3, ease: 'power2.in' }, t0 + 0.32);
    return a;
  });
  cue(keyDrop + 0.36, 'sparkle', 0.8);

  hlOut(hl6, T.s7 - 0.16);

  /* ============================================================ S7 — Champagne ! */
  // Passage dans le trou de la clé → la nuit de la fête.
  const zoomAt = T.s7 - 0.32;
  const zoom = { p: 0 };
  ft(zoom, { p: 0 }, { p: 1, duration: 0.5, ease: 'power3.in' }, zoomAt);
  cue(zoomAt - 0.05, 'riser', 1);
  const nightCid = uid('night');
  const nightCp = el('clipPath', { id: nightCid }, defs);
  const nightCircle = el('circle', { cx: 540, cy: 960, r: 0 }, nightCp);
  const nightG = grp(L.night, { 'clip-path': `url(#${nightCid})` });
  el('rect', { x: -40, y: -40, width: W + 80, height: H + 80, fill: C.ink900 }, nightG);
  const nightInner = grp(nightG);
  const nHaloG = grp(nightInner);
  el('circle', { r: 440, fill: C.ink800 }, nHaloG);
  el('circle', { r: 520, fill: 'none', stroke: C.ink800, 'stroke-width': 3 }, nHaloG);
  const nHalo = actor(nHaloG, { x: 540, y: 1100, s: 0.6 });
  ft(nHalo, { s: 0.6 }, { s: 1, duration: 0.9, ease: 'expo.out' }, T.s7 - 0.05);

  onRender((t) => {
    const zk = Math.pow(70, zoom.p);
    const zd = driftAt(t);
    // centre du trou de la clé dans le monde, puis à l'écran (après la dérive de caméra)
    const rr = (key.r * Math.PI) / 180;
    const hx = key.x - Math.sin(rr) * keyHole.y, hy = key.y + Math.cos(rr) * keyHole.y;
    const hsx = DRIFT_C.x + (hx - DRIFT_C.x) * zd, hsy = DRIFT_C.y + (hy - DRIFT_C.y) * zd;
    cam.zd = zd; cam.zk = zoom.p > 0 ? zk : 1; cam.hx = hsx; cam.hy = hsy;
    if (zoom.p > 0) {
      nightCircle.setAttribute('cx', hsx.toFixed(2)); nightCircle.setAttribute('cy', hsy.toFixed(2));
      nightCircle.setAttribute('r', (keyHole.r * zd * zk * (zoom.p >= 1 ? 3 : 1)).toFixed(2));
      L.night.removeAttribute('display');
    } else {
      L.night.setAttribute('display', 'none');
    }
    L.world.setAttribute('display', zoom.p >= 1 ? 'none' : 'inline');
  });

  // Étoiles discrètes dans la nuit
  const rnd = mulberry32(7);
  for (let i = 0; i < 16; i++) {
    const g = grp(nightInner);
    const x = 70 + rnd() * 940, y = 700 + rnd() * 900;
    if (Math.abs(x - 540) < 170 && y > 780) continue;
    const s = 0.18 + rnd() * 0.22;
    el('path', { d: 'M0 -34C5 -7 7 -5 34 0C7 5 5 7 0 34C-5 7 -7 5 -34 0C-7 -5 -5 -7 0 -34Z', fill: rnd() < 0.5 ? C.am400 : C.ink600 }, g);
    const a = actor(g, { x, y, s: 0 });
    const ph = rnd() * 6.28, sp = 2 + rnd() * 3;
    onRender((t) => { a.s = t < T.s7 ? 0 : s * (0.6 + 0.4 * Math.sin(ph + t * sp)) * clamp01((t - T.s7) * 3); applyActor(a); });
  }

  // Bouteille
  const bottleBase = { x: 540, y: 1510 };
  const bottleG = grp(nightInner);
  const bottle = actor(bottleG, { x: bottleBase.x, y: bottleBase.y + 900 });
  const NECK_TOP = -712;
  {
    el('path', { d: `M-90 -24Q-90 0 -66 0H66Q90 0 90 -24V-380C90 -450 34 -480 34 -545V${NECK_TOP + 12}Q34 ${NECK_TOP} 22 ${NECK_TOP}H-22Q-34 ${NECK_TOP} -34 ${NECK_TOP + 12}V-545C-34 -480 -90 -450 -90 -380Z`, fill: C.em700 }, bottleG);
    el('path', { d: 'M-66 -360V-70', stroke: C.white, 'stroke-width': 14, 'stroke-linecap': 'round', opacity: 0.16 }, bottleG);
    el('path', { d: 'M-22 -560V-660', stroke: C.white, 'stroke-width': 8, 'stroke-linecap': 'round', opacity: 0.16 }, bottleG);
    el('path', { d: `M-38 -548H38V${NECK_TOP + 8}Q38 ${NECK_TOP - 6} 24 ${NECK_TOP - 6}H-24Q-38 ${NECK_TOP - 6} -38 ${NECK_TOP + 8}Z`, fill: C.am400 }, bottleG);
    el('rect', { x: -40, y: -566, width: 80, height: 22, rx: 6, fill: C.am500 }, bottleG);
    el('rect', { x: -74, y: -336, width: 148, height: 176, rx: 16, fill: C.sand50 }, bottleG);
    el('circle', { cx: 0, cy: -270, r: 30, fill: C.am400 }, bottleG);
    lucide(bottleG, ICON.houseBody.concat(ICON.houseDoor), { x: 0, y: -271, size: 32, color: C.ink900, sw: 2.2 });
    el('rect', { x: -44, y: -220, width: 88, height: 12, rx: 6, fill: C.ink150 }, bottleG);
    el('rect', { x: -30, y: -194, width: 60, height: 12, rx: 6, fill: C.ink150 }, bottleG);
  }
  // Bouchon (attaché puis libre)
  function corkShape(parent) {
    const g = grp(parent);
    el('rect', { x: -24, y: -54, width: 48, height: 58, rx: 10, fill: C.sand200 }, g);
    el('path', { d: 'M-30 -50Q-30 -78 0 -80Q30 -78 30 -50Z', fill: C.am200 }, g);
    el('path', { d: 'M-24 -10H24M-18 -32H18', stroke: C.am600, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    return g;
  }
  const corkAttachedG = grp(bottleG, { transform: `translate(0 ${NECK_TOP - 4})` });
  corkShape(corkAttachedG);
  const corkFreeG = grp(nightInner);
  corkShape(corkFreeG);
  const corkFree = actor(corkFreeG, { o: 0 });

  const bottleY = { v: bottleBase.y + 900 };
  ft(bottleY, { v: bottleBase.y + 900 }, { v: bottleBase.y, duration: 0.55, ease: 'expo.out' }, T.s7 + 0.02);
  cue(T.s7 + 0.02, 'swish', 0.7);
  // inclinaison/secousse/recul : fonction pure du temps
  const tiltMax = 12;
  const bottleTilt = (t) => {
    let r = 0;
    if (t > T.s7 + 0.22 && t < T.pop) {
      const f = (t - (T.s7 + 0.22)) / (T.pop - T.s7 - 0.22);
      r = 5.5 * Math.sin(2 * Math.PI * 9 * (t - T.s7 - 0.22)) * Math.min(1, f * 1.6);
    }
    if (t >= T.pop) r = tiltMax * easeOutExpo((t - T.pop) / 0.45);
    return r;
  };
  cue(T.s7 + 0.24, 'shake', 0.7);
  onRender((t) => {
    bottle.r = bottleTilt(t);
    const dt = t - T.pop;
    bottle.y = bottleY.v + (dt > 0 && dt < 0.5 ? 18 * Math.exp(-dt / 0.09) * Math.sin(dt * 38) : 0);
    corkAttachedG.setAttribute('display', t < T.pop ? 'inline' : 'none');
  });
  const neckAt = (t) => {
    const r = (bottleTilt(t) * Math.PI) / 180;
    const ly = NECK_TOP - 6;
    return [bottleBase.x - Math.sin(r) * ly, bottleBase.y + Math.cos(r) * ly, r];
  };
  // Physique fermée (traînée linéaire + gravité) — position exacte à tout t.
  // v' = g - k v  ⇒  y = y0 + (g/k) t + (vy - g/k)(1 - e^{-kt})/k  (y écran vers le bas)
  function ballistic(p, dt) {
    const k = p.k, e = Math.exp(-k * dt);
    return [p.x0 + (p.vx / k) * (1 - e), p.y0 + (p.g / k) * dt + ((p.vy - p.g / k) / k) * (1 - e)];
  }
  onRender((t) => {
    const dt = t - T.pop;
    if (dt < 0) { corkFree.o = 0; applyActor(corkFree); return; }
    const [nx, ny, nr] = neckAt(T.pop);
    const p = { x0: nx, y0: ny - 40, vx: 900 + 1800 * Math.sin(nr), vy: -4200, k: 0.6, g: 2600 };
    const [x, y] = ballistic(p, dt);
    corkFree.x = x; corkFree.y = y; corkFree.r = dt * 900; corkFree.o = 1;
    applyActor(corkFree);
  });

  // Écume + confettis
  const partBack = grp(nightInner);
  const titleLayer = grp(nightInner);
  const partFront = grp(L.night);
  const confColors = [C.am400, C.am200, C.em300, C.em400, C.sand50, C.white, C.am500, C.em200];
  const rngC = mulberry32(2024);
  const confetti = [];
  // Émetteurs : le goulot (suit l'inclinaison de la bouteille) et deux canons en bas d'écran.
  function addConfetti(n, t0, spreadT, o = {}) {
    for (let i = 0; i < n; i++) {
      const isFront = rngC() < (o.front || 0.1);
      const layer = isFront ? partFront : partBack;
      const g = grp(layer);
      const col = confColors[Math.floor(rngC() * confColors.length)];
      const kind = rngC();
      const sz = (isFront ? 1.35 : 0.9) * (0.75 + rngC() * 0.6);
      if (kind < 0.62) el('rect', { x: -9 * sz, y: -15 * sz, width: 18 * sz, height: 30 * sz, rx: 3 * sz, fill: col }, g);
      else if (kind < 0.84) el('circle', { r: 9 * sz, fill: col }, g);
      else el('path', { d: `M${-16 * sz} 0C${-8 * sz} ${-14 * sz} ${0} ${14 * sz} ${8 * sz} 0S${20 * sz} ${-10 * sz} ${24 * sz} 0`, fill: 'none', stroke: col, 'stroke-width': 6 * sz, 'stroke-linecap': 'round' }, g);
      const a = actor(g, { o: 0 });
      confetti.push({
        a, t0: t0 + rngC() * spreadT, origin: o.origin || 'neck', dir: o.dir || 0,
        ang: (rngC() * 2 - 1) * (o.spread || 0.8),
        sp: (o.vmin || 1800) + rngC() * ((o.vmax || 4300) - (o.vmin || 1800)),
        k: 3.6 + rngC() * 3.2, g: 1350,
        fl: 6 + rngC() * 10, ph: rngC() * 6.28, rot: (rngC() * 2 - 1) * 420, r0: rngC() * 360,
        sw: 14 + rngC() * 26, sws: 3 + rngC() * 4,
      });
    }
  }
  addConfetti(80, T.pop, 0.12, { spread: 0.62, vmin: 2000, vmax: 4600 });
  addConfetti(48, T.pop + 0.04, 0.1, { origin: [-30, 1640], dir: 0.62, spread: 0.32, vmin: 2600, vmax: 4600 });
  addConfetti(48, T.pop + 0.06, 0.1, { origin: [1110, 1640], dir: -0.62, spread: 0.32, vmin: 2600, vmax: 4600 });
  addConfetti(22, T.pop + 0.3, 0.45, { spread: 0.9, vmin: 1200, vmax: 3000 });
  const foam = [];
  const rngF = mulberry32(99);
  for (let i = 0; i < 34; i++) {
    const g = grp(partBack);
    el('circle', { r: 5 + rngF() * 10, fill: rngF() < 0.6 ? C.white : C.sand50 }, g);
    foam.push({ a: actor(g, { o: 0 }), t0: T.pop + rngF() * 0.3, ang: (rngF() * 2 - 1) * 0.3, sp: 700 + rngF() * 1700, life: 0.45 + rngF() * 0.5 });
  }
  onRender((t) => {
    for (const c of confetti) {
      const dt = t - c.t0;
      if (dt < 0) { c.a.o = 0; applyActor(c.a); continue; }
      let nx, ny, dir;
      if (c.origin === 'neck') { const n = neckAt(c.t0); nx = n[0]; ny = n[1]; dir = n[2] + c.ang; }
      else { nx = c.origin[0]; ny = c.origin[1]; dir = c.dir + c.ang; }
      const p = { x0: nx, y0: ny, vx: Math.sin(dir) * c.sp, vy: -Math.cos(dir) * c.sp, k: c.k, g: c.g };
      const [x, y] = ballistic(p, dt);
      const sway = c.sw * Math.sin(c.ph + dt * c.sws) * clamp01(dt / 0.5);
      c.a.x = x + sway; c.a.y = y; c.a.r = c.r0 + c.rot * dt;
      c.a.sy = Math.cos(c.ph + dt * c.fl);
      c.a.o = clamp01(dt / 0.03);
      applyActor(c.a);
    }
    for (const f of foam) {
      const dt = t - f.t0;
      if (dt < 0 || dt > f.life) { f.a.o = 0; applyActor(f.a); continue; }
      const [nx, ny, nr] = neckAt(f.t0);
      const dir = nr + f.ang;
      const p = { x0: nx, y0: ny, vx: Math.sin(dir) * f.sp, vy: -Math.cos(dir) * f.sp, k: 2.2, g: 2600 };
      const [x, y] = ballistic(p, dt);
      f.a.x = x; f.a.y = y; f.a.s = 1 - 0.5 * (dt / f.life); f.a.o = 1 - Math.pow(dt / f.life, 2);
      applyActor(f.a);
    }
  });
  ft(flash, { o: 0 }, { o: 0.16, duration: 0.03 }, T.pop);
  to(flash, { o: 0, duration: 0.3, ease: 'power2.out' }, T.pop + 0.03);
  shake(T.pop, 18, 0.2, 20);
  cue(T.pop, 'cork', 1);
  cue(T.pop + 0.02, 'confetti', 1);

  // Titre « Champagne ! » lettre par lettre
  const champ = 'Champagne' + NBSP + '!';
  const cSize = 150, cStyle = { family: FD, size: cSize, weight: 900, ls: -0.04 * cSize };
  const cW = measure(champ, cStyle);
  const cK = Math.min(1, 940 / cW);
  const cG = grp(titleLayer, { transform: `translate(540 548) scale(${cK}) translate(${-cW / 2} 0)` });
  const letters = [];
  for (let i = 0; i < champ.length; i++) {
    const ch = champ[i];
    if (ch === NBSP) continue;
    const xOff = i === 0 ? 0 : measure(champ.slice(0, i) + 'H', cStyle) - measure('H', cStyle);
    const lw = measure(ch, cStyle);
    const lg = grp(cG);
    const tn = text(lg, ch, Object.assign({ x: -lw / 2, y: 0, fill: ch === '!' ? C.am400 : C.white }, cStyle));
    Object.assign(tn.style, { paintOrder: 'stroke', stroke: C.ink900, strokeWidth: '14px', strokeLinejoin: 'round' });
    const a = actor(lg, { x: xOff + lw / 2, y: 0, o: 0 });
    letters.push({ a, i });
  }
  const rngL = mulberry32(31);
  letters.forEach((l, k) => {
    const rr = (rngL() * 2 - 1) * 16;
    ft(l.a, { s: 0.2, y: 70, r: rr, o: 0 }, { s: 1, y: 0, r: 0, o: 1, duration: 0.6, ease: 'back.out(2.2)' }, T.pop + 0.04 + k * 0.032);
  });
  const tagline = headline(['Votre courtier vous accompagne', 'du premier rendez-vous aux clés.'], { parent: titleLayer, size: 40, lh: 52, y: 650, family: FS, weight: 500, color: C.ink200, ls: 0 });
  tagline.words.forEach((w) => Object.assign(w.node.firstChild.style, { paintOrder: 'stroke', stroke: C.ink900, strokeWidth: '9px', strokeLinejoin: 'round' }));
  hlIn(tagline, T.pop + 0.62, { stagger: 0.03, dur: 0.7 });

  /* ============================================================ rendu */
  // Ordre d'empilement final dans le monde : la clé et les étincelles au-dessus des cartes.
  L.worldInner.appendChild(keyG);
  L.worldInner.appendChild(penG);
  L.worldInner.appendChild(cursorG);

  // ?cover : image de couverture, stepper figé à sa taille finale.
  const COVER = new URLSearchParams(location.search).has('cover');
  function render(t) {
    tl.seek(Math.max(0, Math.min(DURATION, t)), true);
    for (const f of updaters) f(t);
    if (COVER) for (const n of stNodes) n.a.s = 1;
    for (const a of actors) applyActor(a);
    // caméra (après les acteurs : certains updaters la pilotent)
    const [sx, sy] = shakeAt(t);
    let wt = `translate(${DRIFT_C.x} ${DRIFT_C.y}) scale(${cam.zd.toFixed(5)}) translate(${-DRIFT_C.x} ${-DRIFT_C.y})`;
    if (cam.zk !== 1) wt = `translate(${cam.hx.toFixed(2)} ${cam.hy.toFixed(2)}) scale(${cam.zk.toFixed(5)}) translate(${(-cam.hx).toFixed(2)} ${(-cam.hy).toFixed(2)}) ${wt}`;
    L.world.setAttribute('transform', wt);
    L.worldInner.setAttribute('transform', `translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);
    const zn = nightDriftAt(t);
    nightInner.setAttribute('transform', `translate(${sx.toFixed(2)} ${sy.toFixed(2)}) translate(540 1100) scale(${zn.toFixed(5)}) translate(-540 -1100)`);
    partFront.setAttribute('transform', `translate(${(sx * 1.4).toFixed(2)} ${(sy * 1.4).toFixed(2)})`);
  }

  // Les updaters s'exécutent avant applyActor : ceux qui pilotent des acteurs
  // appellent applyActor eux-mêmes ; applyActor final est idempotent.
  tl.seek(DURATION, true);
  tl.seek(0, true);
  render(0);

  window.__video = { duration: DURATION, cues, render, T };
  window.__ready = true;
})();
