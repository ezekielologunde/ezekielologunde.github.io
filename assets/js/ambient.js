/* Ambient background, one canvas per scene page, themed per page:
   drones (robot drones patrolling a grid), circuits (pulses along circuit traces),
   scan (a laser line sweeping a lattice), qubits (a Bloch sphere, qubit rings and
   one drone), waves (entangled particle pairs with expanding wavefunction rings).
   Low contrast, about 30 fps, paused when the tab is hidden, drawn once as a static
   frame under reduced motion, on low-power devices, or if frames prove too slow.
   No libraries, no network. The canvas is aria-hidden and ignores the pointer. */
(function () {
  'use strict';
  var cv = document.querySelector('canvas.ambient');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  if (!ctx) return;
  var theme = document.body.getAttribute('data-ambient') || 'drones';
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var lowPower = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  var W = 0, H = 0, DPR = 1, still = false, raf = 0, last = 0, t0 = 0;
  var bg = null; /* pre-rendered static layer */
  var probe = { n: 0, sum: 0 };
  var INK = '235,229,216', SIG = '240,113,79', GRN = '159,192,168';
  var rgba = function (c, a) { return 'rgba(' + c + ',' + a + ')'; };
  var TAU = Math.PI * 2;

  /* Deterministic pseudo-random so the static layer is stable between resizes */
  var seed = 7;
  var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  function layer(draw) {
    var c = document.createElement('canvas');
    c.width = Math.round(W * DPR); c.height = Math.round(H * DPR);
    var x = c.getContext('2d');
    x.setTransform(DPR, 0, 0, DPR, 0, 0);
    draw(x);
    return c;
  }

  /* ---------- shared: drone ---------- */
  function drone(x, y, t, dir, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);
    ctx.strokeStyle = rgba(INK, a);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-11, -4, 22, 8);
    ctx.moveTo(-11, -2); ctx.lineTo(-19, -7); ctx.moveTo(11, -2); ctx.lineTo(19, -7);
    ctx.moveTo(-4, 4); ctx.lineTo(-7, 9); ctx.moveTo(4, 4); ctx.lineTo(7, 9);
    ctx.stroke();
    var w = 8 * Math.abs(Math.cos(t / 60));
    ctx.beginPath();
    ctx.ellipse(-19, -8, w + 1, 1.4, 0, 0, TAU);
    ctx.ellipse(19, -8, w + 1, 1.4, 0, 0, TAU);
    ctx.stroke();
    ctx.fillStyle = rgba(SIG, a * 2.2 * (0.6 + 0.4 * Math.sin(t / 300)));
    ctx.fillRect(5, -1.5, 3, 3);
    var g = ctx.createLinearGradient(0, 8, 0, 70);
    g.addColorStop(0, rgba(SIG, a * 0.45)); g.addColorStop(1, rgba(SIG, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(-2, 8); ctx.lineTo(-22, 70); ctx.lineTo(22, 70); ctx.lineTo(2, 8); ctx.fill();
    ctx.restore();
  }
  var drones = [];
  function makeDrones(n) {
    drones = [];
    for (var i = 0; i < n; i++) {
      drones.push({ lane: 0.14 + (i / Math.max(1, n - 1)) * 0.72, speed: 0.018 + rnd() * 0.02, off: rnd() * 4000, dir: i % 2 ? -1 : 1, bob: rnd() * TAU });
    }
  }
  function drawDrones(t, a) {
    for (var i = 0; i < drones.length; i++) {
      var d = drones[i], span = W + 160;
      var p = ((t * d.speed + d.off) % span + span) % span - 80;
      var x = d.dir > 0 ? p : W - p;
      var y = d.lane * H + Math.sin(t / 900 + d.bob) * 12;
      drone(x, y, t, d.dir, a);
    }
  }

  /* ---------- themes ---------- */
  var T = {};
  T.drones = {
    init: function () {
      makeDrones(W < 700 ? 2 : 4);
      bg = layer(function (x) {
        x.strokeStyle = rgba(INK, 0.028); x.lineWidth = 1; x.beginPath();
        for (var gx = 0; gx < W; gx += 48) { x.moveTo(gx + 0.5, 0); x.lineTo(gx + 0.5, H); }
        for (var gy = 0; gy < H; gy += 48) { x.moveTo(0, gy + 0.5); x.lineTo(W, gy + 0.5); }
        x.stroke();
      });
    },
    draw: function (t) { drawDrones(t, 0.13); }
  };

  var traces = [];
  T.circuits = {
    init: function () {
      traces = [];
      var n = Math.round(W * H / 26000);
      for (var i = 0; i < n; i++) {
        var x = Math.round(rnd() * W / 24) * 24, y = Math.round(rnd() * H / 24) * 24, pts = [[x, y]], horiz = rnd() > 0.5;
        var segs = 2 + Math.floor(rnd() * 4);
        for (var s = 0; s < segs; s++) {
          var len = (2 + Math.floor(rnd() * 7)) * 24 * (rnd() > 0.5 ? 1 : -1);
          if (horiz) x += len; else y += len;
          pts.push([x, y]); horiz = !horiz;
        }
        var total = 0, lens = [];
        for (var k = 1; k < pts.length; k++) { var l = Math.abs(pts[k][0] - pts[k - 1][0]) + Math.abs(pts[k][1] - pts[k - 1][1]); lens.push(l); total += l; }
        traces.push({ pts: pts, lens: lens, total: total, speed: 0.05 + rnd() * 0.08, off: rnd() * 5000, live: rnd() < 0.35 });
      }
      bg = layer(function (x) {
        x.strokeStyle = rgba(INK, 0.04); x.fillStyle = rgba(INK, 0.06); x.lineWidth = 1;
        traces.forEach(function (tr) {
          x.beginPath(); x.moveTo(tr.pts[0][0] + 0.5, tr.pts[0][1] + 0.5);
          for (var k = 1; k < tr.pts.length; k++) x.lineTo(tr.pts[k][0] + 0.5, tr.pts[k][1] + 0.5);
          x.stroke();
          [tr.pts[0], tr.pts[tr.pts.length - 1]].forEach(function (p) { x.beginPath(); x.arc(p[0] + 0.5, p[1] + 0.5, 2.5, 0, TAU); x.fill(); });
        });
      });
    },
    draw: function (t) {
      ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      for (var i = 0; i < traces.length; i++) {
        var tr = traces[i];
        if (!tr.live) continue;
        var d = (t * tr.speed + tr.off) % (tr.total + 120);
        var head = at(tr, d), tail = at(tr, d - 36);
        if (!head) continue;
        ctx.strokeStyle = rgba(SIG, 0.28);
        ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(head[0], head[1]); ctx.stroke();
        ctx.fillStyle = rgba(SIG, 0.5);
        ctx.fillRect(head[0] - 1.5, head[1] - 1.5, 3, 3);
      }
    }
  };
  function at(tr, d) {
    if (d < 0) d = 0;
    if (d > tr.total) return null;
    for (var k = 0; k < tr.lens.length; k++) {
      if (d <= tr.lens[k]) {
        var a = tr.pts[k], b = tr.pts[k + 1], f = d / tr.lens[k];
        return [a[0] + (b[0] - a[0]) * f + 0.5, a[1] + (b[1] - a[1]) * f + 0.5];
      }
      d -= tr.lens[k];
    }
    return null;
  }

  var STEP = 30;
  T.scan = {
    init: function () {
      bg = layer(function (x) {
        x.fillStyle = rgba(INK, 0.07);
        for (var gy = STEP / 2; gy < H; gy += STEP) for (var gx = STEP / 2; gx < W; gx += STEP) x.fillRect(gx, gy, 1.5, 1.5);
        x.strokeStyle = rgba(INK, 0.025); x.beginPath();
        for (var gy2 = STEP / 2; gy2 < H; gy2 += STEP * 4) { x.moveTo(0, gy2 + 0.5); x.lineTo(W, gy2 + 0.5); }
        x.stroke();
      });
    },
    draw: function (t) {
      var y = (t * 0.07) % (H + 240) - 120;
      var g = ctx.createLinearGradient(0, y - 90, 0, y);
      g.addColorStop(0, rgba(SIG, 0)); g.addColorStop(1, rgba(SIG, 0.05));
      ctx.fillStyle = g; ctx.fillRect(0, y - 90, W, 90);
      ctx.strokeStyle = rgba(SIG, 0.22); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke();
      for (var gy = STEP / 2; gy < H; gy += STEP) {
        var dy = Math.abs(gy - y);
        if (dy > 50) continue;
        ctx.fillStyle = rgba(SIG, 0.28 * (1 - dy / 50));
        for (var gx = STEP / 2; gx < W; gx += STEP) ctx.fillRect(gx - 0.5, gy - 0.5, 2.5, 2.5);
      }
    }
  };

  T.qubits = {
    init: function () { makeDrones(1); drones[0].lane = 0.2; bg = null; },
    draw: function (t) {
      var r = W < 700 ? 64 : 110;
      var cx = W - r - (W < 700 ? 18 : 60), cy = H - r - (W < 700 ? 60 : 70);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(INK, 0.1);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
      var tilt = 0.28 + 0.06 * Math.sin(t / 4000);
      ctx.beginPath(); ctx.ellipse(cx, cy, r, r * tilt, 0, 0, TAU); ctx.stroke();
      var m = Math.cos(t / 3000);
      ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(m) * r + 0.1, r, 0, 0, TAU); ctx.stroke();
      ctx.strokeStyle = rgba(INK, 0.07);
      ctx.beginPath(); ctx.moveTo(cx, cy - r - 12); ctx.lineTo(cx, cy + r + 12); ctx.stroke();
      var th = 1.1 + 0.6 * Math.sin(t / 2600), ph = t / 1400;
      var px = cx + r * Math.sin(th) * Math.cos(ph), py = cy - r * Math.cos(th) + r * tilt * Math.sin(th) * Math.sin(ph) * 0.9;
      ctx.strokeStyle = rgba(SIG, 0.34); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
      ctx.fillStyle = rgba(SIG, 0.5); ctx.beginPath(); ctx.arc(px, py, 3, 0, TAU); ctx.fill();
      ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillStyle = rgba(INK, 0.18);
      ctx.fillText('|0⟩', cx + 6, cy - r - 14); ctx.fillText('|1⟩', cx + 6, cy + r + 22);
      /* qubit rings */
      for (var i = 0; i < 3; i++) {
        var qx = (W < 700 ? 40 : 70) + i * (W < 700 ? 34 : 52), qy = H * 0.34 + (i % 2) * 34, rr = 14 + i * 3;
        ctx.strokeStyle = rgba(GRN, 0.14); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(qx, qy, rr, rr * 0.4, (t / 2000) * (i % 2 ? -1 : 1) + i, 0, TAU); ctx.stroke();
        var a = t / (700 + i * 150);
        ctx.fillStyle = rgba(GRN, 0.35);
        ctx.beginPath(); ctx.arc(qx + Math.cos(a) * rr * 0.9, qy + Math.sin(a) * rr * 0.35, 1.8, 0, TAU); ctx.fill();
      }
      drawDrones(t, 0.12);
    }
  };

  var pairs = [];
  T.waves = {
    init: function () {
      pairs = [];
      var n = W < 700 ? 2 : 3;
      for (var i = 0; i < n; i++) pairs.push({ cx: (0.18 + 0.64 * (i / Math.max(1, n - 1))) * W, cy: (0.25 + 0.5 * ((i + 1) % 2)) * H, d: 70 + rnd() * 60, w: 0.00012 + rnd() * 0.0001, off: rnd() * 6000, col: i % 2 ? SIG : GRN });
      bg = null;
    },
    draw: function (t) {
      ctx.lineWidth = 1;
      for (var i = 0; i < pairs.length; i++) {
        var p = pairs[i], ang = t * p.w * TAU + i;
        var ax = p.cx + Math.cos(ang) * p.d, ay = p.cy + Math.sin(ang) * p.d * 0.5;
        var bx = p.cx - Math.cos(ang) * p.d, by = p.cy - Math.sin(ang) * p.d * 0.5;
        ctx.setLineDash([2, 5]); ctx.strokeStyle = rgba(INK, 0.07);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]);
        for (var k = 0; k < 3; k++) {
          var ph = ((t + p.off + k * 1400) % 4200) / 4200, rr = 6 + ph * 170, al = 0.16 * (1 - ph);
          ctx.strokeStyle = rgba(p.col, al);
          ctx.beginPath(); ctx.arc(ax, ay, rr, 0, TAU); ctx.stroke();
          ctx.beginPath(); ctx.arc(bx, by, rr, 0, TAU); ctx.stroke();
        }
        ctx.fillStyle = rgba(p.col, 0.45);
        ctx.beginPath(); ctx.arc(ax, ay, 2.5, 0, TAU); ctx.arc(bx, by, 2.5, 0, TAU); ctx.fill();
      }
    }
  };

  var th = T[theme] || T.drones;

  function size() {
    W = window.innerWidth; H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed = 7;
    if (W < 1 || H < 1) { bg = null; return; }
    th.init();
  }
  function paint(t) {
    if (W < 1 || H < 1) return; /* hidden or collapsed window */
    ctx.clearRect(0, 0, W, H);
    if (bg && bg.width > 0 && bg.height > 0) ctx.drawImage(bg, 0, 0, W, H);
    th.draw(t);
  }
  function frame(now) {
    raf = window.requestAnimationFrame(frame);
    if (now - last < 32) return; /* about 30 fps */
    last = now;
    var s = performance.now();
    paint(now - t0);
    if (probe.n < 45) {
      probe.sum += performance.now() - s; probe.n++;
      if (probe.n === 45 && probe.sum / probe.n > 8) stop(true); /* too slow here: settle to a still frame */
    }
  }
  function start() { if (!raf && !still && !document.hidden) { last = 0; raf = window.requestAnimationFrame(frame); } }
  function stop(settle) {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
    if (settle) { still = true; paint(12000); }
  }

  size();
  t0 = performance.now();
  still = mq.matches || lowPower;
  if (still) paint(12000); else start();
  document.documentElement.setAttribute('data-ambient-mode', still ? 'still' : 'live');

  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(false); else start(); });
  var rt = 0;
  window.addEventListener('resize', function () {
    window.clearTimeout(rt);
    rt = window.setTimeout(function () { size(); if (still) paint(12000); }, 150);
  }, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', function (e) { if (e.matches) stop(true); else { still = lowPower; start(); } });
})();
