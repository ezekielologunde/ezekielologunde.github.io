(function () {
  var canvas = document.getElementById('fx-mesh');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W, H, DPR;
  var nodes = [];
  var pulses = [];
  var pointer = { x: -9999, y: -9999, active: false };

  var COLORS = ['59,108,255', '168,85,247', '255,79,216', '77,238,255'];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initNodes();
  }

  function initNodes() {
    var density = Math.max(24, Math.min(64, Math.floor((W * H) / 26000)));
    nodes = Array.from({ length: density }, function () {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    });
  }

  function maybeSpawnPulse() {
    if (Math.random() > 0.02 || nodes.length < 2) return;
    var a = nodes[Math.floor(Math.random() * nodes.length)];
    var candidates = nodes.filter(function (n) {
      if (n === a) return false;
      var d = Math.hypot(n.x - a.x, n.y - a.y);
      return d < 160;
    });
    if (!candidates.length) return;
    var b = candidates[Math.floor(Math.random() * candidates.length)];
    pulses.push({ a: a, b: b, t: 0, c: a.c });
  }

  function step() {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
      if (pointer.active) {
        var dx = pointer.x - n.x, dy = pointer.y - n.y;
        var dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0.01) {
          var pull = (140 - dist) / 140 * 0.012;
          n.x += dx * pull; n.y += dy * pull;
        }
      }
    }
    maybeSpawnPulse();
    for (var p = pulses.length - 1; p >= 0; p--) {
      pulses[p].t += 0.02;
      if (pulses[p].t >= 1) pulses.splice(p, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(140,160,255,' + (0.09 * (1 - d / 150)) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var node = nodes[k];
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + node.c + ',0.55)';
      ctx.fill();
    }

    for (var m = 0; m < pulses.length; m++) {
      var pu = pulses[m];
      var px = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
      var py = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
      var fade = Math.sin(pu.t * Math.PI);
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + pu.c + ',' + (0.9 * fade) + ')';
      ctx.shadowColor = 'rgba(' + pu.c + ',0.9)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (pointer.active) {
      var glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 130);
      glow.addColorStop(0, 'rgba(77,238,255,0.10)');
      glow.addColorStop(1, 'rgba(77,238,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(pointer.x - 130, pointer.y - 130, 260, 260);
    }
  }

  function tick() {
    step();
    draw();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', function (e) {
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
  });
  window.addEventListener('pointerleave', function () { pointer.active = false; });

  resize();
  if (reduceMotion) {
    draw();
  } else {
    tick();
  }
})();
