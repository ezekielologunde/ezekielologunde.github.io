/* Interactive story: scene rail, the self-drawing route graph, counters,
   discovery tally, CVE re-rank with reorder motion, evidence-graph tracing,
   threat-model explorer, model-card spec sheet (collapse, copy, typing).
   Plain JS, no libraries, no network, no storage.
   Spec: docs/superpowers/specs/2026-09-24-interactive-story-design.md */
(function () {
  'use strict';
  var doc = document.documentElement;
  var MOTION = doc.classList.contains('motion');
  var HAS_IO = 'IntersectionObserver' in window;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var headH = function () { var h = $('.site-head'); return h ? h.offsetHeight : 62; };
  var jump = function (y) {
    try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); }
  };
  /* Run fn once when el is reached, including when a jump (anchor link, Page Down)
     carries the reader straight past it, so no counter is ever left at zero. */
  var once = function (el, fn, margin) {
    if (!HAS_IO) { fn(); return; }
    var done = false, ticking = false;
    var fire = function () {
      if (done) return;
      done = true; io.disconnect();
      window.removeEventListener('scroll', check);
      fn();
    };
    var check = function () {
      if (ticking || done) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) fire();
      });
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.bottom < 0) fire(); });
    }, { rootMargin: margin || '0px 0px -15% 0px' });
    io.observe(el);
    window.addEventListener('scroll', check, { passive: true });
  };

  /* ---------- Old one-page anchors now live on their own scene pages ---------- */
  (function oldAnchors() {
    if (!document.body.classList.contains('home') || !location.hash) return;
    var h = location.hash.slice(1);
    var to = null;
    if (/^(route|route-text|timeline)$/.test(h) || /^n-[a-z]+$/.test(h)) to = 'route.html' + (h === 'route' || h === 'timeline' ? '' : '#' + h);
    else if (/^(evidence|exhibit-b|exhibit-c|exhibit-e|exhibit-f)$/.test(h)) to = 'evidence.html' + (h === 'evidence' ? '' : '#' + h);
    else if (/^(ai|exhibit-d)$/.test(h)) to = 'ai.html' + (h === 'ai' ? '' : '#' + h);
    else if (h === 'card' || h === 'custody' || /^mc-/.test(h)) to = 'about.html' + (h === 'custody' ? '#data' : /^mc-/.test(h) ? '#' + h.slice(3) : '');
    else if (h === 'report' || h === 'next') to = 'contact.html';
    if (to) location.replace(to);
  })();

  /* ---------- Page transition: a short fade out before moving to another scene ---------- */
  (function fadeOut() {
    if (!MOTION || ('onpagereveal' in window)) return; /* browsers with view transitions use CSS */
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href]');
      if (!a || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      var href = a.getAttribute('href');
      if (!/^[A-Za-z0-9_-]+\.html(#.*)?$/.test(href) || a.target) return;
      ev.preventDefault();
      document.body.classList.add('is-leaving');
      window.setTimeout(function () { location.href = href; }, 160);
    });
    window.addEventListener('pageshow', function () { document.body.classList.remove('is-leaving'); });
  })();

  /* ---------- Scene rail ---------- */
  (function rail() {
    var links = $$('.rail a[href^="#"]');
    if (!links.length || !HAS_IO) return;
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var set = function (id) {
      links.forEach(function (a) {
        if (a === byId[id]) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
      });
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) set(e.target.id); });
    }, { rootMargin: '-48% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    set('case');
  })();

  /* ---------- Details helpers: open a collapsed target before jumping ---------- */
  var openTarget = function (id) {
    var el = id && document.getElementById(id);
    if (!el) return;
    var d = el.closest('details');
    while (d) { d.open = true; d = d.parentElement && d.parentElement.closest('details'); }
  };
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (a && !a.hasAttribute('data-go') && !a.closest('svg')) openTarget(a.getAttribute('href').slice(1));
  });
  window.addEventListener('hashchange', function () { openTarget(location.hash.slice(1)); });

  /* ---------- The route ---------- */
  (function route() {
    var root = $('[data-route]');
    if (!root) return;
    var items = $$('.route-list > li');
    var N = items.length;
    if (!N) return;
    var T = N + 1.9;
    var entries = items.map(function (li, i) {
      var q = function (c) { var el = li.querySelector('.rn__' + c); return el ? el.textContent.trim() : ''; };
      var via = $$('.rn__edges li', li).filter(function (x) {
        var d = x.querySelector('.dir'); return d && d.textContent.trim() === 'in';
      }).map(function (x) {
        var a = x.querySelector('a'), t = x.querySelector('.tech');
        return { from: a ? a.textContent : '', tech: t ? t.textContent : '' };
      });
      return { li: li, id: li.getAttribute('data-id'), i: i, kind: li.getAttribute('data-kind') || '', tick: li.getAttribute('data-tick') || '',
        title: q('title'), date: q('date'), where: q('where'), story: q('story'), via: via };
    });
    var index = {};
    entries.forEach(function (e) { index[e.id] = e.i; });

    var cap = $('.route__caption', root);
    var live = $('.cap__live', cap);
    var el = {
      year: $('.cap__year', cap), step: $('.cap__step', cap), kind: $('.cap__kind', cap), title: $('.cap__title', cap),
      date: $('.cap__date', cap), where: $('.cap__where', cap), story: $('.cap__story', cap), via: $('.cap__via', cap),
      extra: $('.cap__extra', cap), resume: $('.cap__resume', cap)
    };
    var controls = $('.route__controls', root);
    var scrub = $('.route__scrub', root);
    var sheet = $('.route__sheet', root);
    var cam = $('.route__cam', root);
    var stage = $('.route__stage', root);
    var narrow = window.matchMedia('(max-width: 760px)');
    var armed = MOTION;
    var swap = false;

    function fill(k, full) {
      var e = entries[k];
      if (!e) return;
      el.year.textContent = e.tick;
      el.year.classList.toggle('is-exp', e.id === 'gwu');
      el.step.textContent = 'N-' + pad2(k + 1) + ' / ' + N;
      el.kind.textContent = e.kind;
      el.title.textContent = e.title;
      el.date.textContent = e.date;
      el.where.textContent = e.where;
      el.story.textContent = e.story;
      el.via.textContent = '';
      var lab = document.createElement('span');
      lab.textContent = e.via.length ? 'Reached by' : 'Entry point';
      el.via.appendChild(lab);
      if (!e.via.length) el.via.appendChild(document.createTextNode('where the whole route starts'));
      e.via.forEach(function (v, j) {
        if (j) el.via.appendChild(document.createTextNode('; '));
        var b = document.createElement('b'); b.textContent = v.tech;
        el.via.appendChild(b);
        el.via.appendChild(document.createTextNode(' from ' + v.from));
      });
      el.extra.textContent = '';
      if (full) {
        ['.rn__edges', '.rn__links'].forEach(function (s) {
          var src = e.li.querySelector(s);
          if (src) el.extra.appendChild(src.cloneNode(true));
        });
      }
      swap = !swap;
      live.classList.remove('swap-a', 'swap-b');
      if (MOTION) live.classList.add(swap ? 'swap-a' : 'swap-b');
    }

    /* Per-SVG model: nodes, edges with lengths, trace, scan line */
    function model(svg) {
      var m = { svg: svg, tall: svg.classList.contains('graph--tall'), nodes: [], pos: [], edges: [], ready: false };
      $$('a.node', svg).forEach(function (a) {
        var i = +a.getAttribute('data-i');
        var hit = a.querySelector('.hit');
        m.nodes[i] = a;
        m.pos[i] = { x: +hit.getAttribute('cx'), y: +hit.getAttribute('cy') };
      });
      $$('.edge', svg).forEach(function (g) {
        m.edges.push({ g: g, line: g.querySelector('.edge-line'), i: +g.getAttribute('data-i'), from: g.getAttribute('data-from'), to: g.getAttribute('data-to'), len: 0, last: -1, done: null });
      });
      m.trace = svg.querySelector('.trace');
      m.scan = svg.querySelector('.scan');
      m.onState = []; m.traceLast = -1; m.traced = null;
      return m;
    }
    function measure(m) {
      m.edges.forEach(function (e) {
        var l = e.line;
        if (l.tagName.toLowerCase() === 'line') {
          e.len = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value);
        } else {
          try { e.len = l.getTotalLength(); } catch (x) { e.len = 400; }
        }
        e.len = Math.ceil(e.len) + 2;
        l.style.strokeDasharray = e.len + ' ' + e.len;
        e.last = -1;
      });
      if (m.trace) {
        try { m.traceLen = Math.ceil(m.trace.getTotalLength()) + 2; } catch (x) { m.traceLen = 2000; }
        m.trace.style.strokeDasharray = m.traceLen + ' ' + m.traceLen;
        m.traceLast = -1;
      }
      m.ready = true;
    }
    var models = $$('svg.graph', root).map(model);
    var active = null;
    function pickActive() {
      var want = narrow.matches ? 'graph--tall' : 'graph--wide';
      active = models.filter(function (m) { return m.svg.classList.contains(want); })[0] || models[0];
      if (armed && active && !active.ready) measure(active);
      if (cam) cam.style.transform = '';
    }

    /* Tracing on hover or focus */
    function trace(m, id) {
      m.svg.classList.add('is-tracing');
      m.nodes.forEach(function (n) { n.classList.remove('is-lit'); });
      m.edges.forEach(function (e) {
        var hit = e.from === id || e.to === id;
        e.g.classList.toggle('is-lit', hit);
        if (hit) {
          m.nodes[index[e.from]].classList.add('is-lit');
          m.nodes[index[e.to]].classList.add('is-lit');
        }
      });
      if (m.nodes[index[id]]) m.nodes[index[id]].classList.add('is-lit');
    }
    function untrace(m) {
      m.svg.classList.remove('is-tracing');
      m.nodes.forEach(function (n) { n.classList.remove('is-lit'); });
      m.edges.forEach(function (e) { e.g.classList.remove('is-lit'); });
    }

    /* Scroll mapping */
    var geo = { top: 0, height: 1, stageH: 1, camH: 1, svgH: 1, vbH: 1 };
    function measureGeo() {
      geo.stageH = stage.offsetHeight;
      var r = root.getBoundingClientRect();
      geo.top = r.top + window.pageYOffset;
      geo.height = root.offsetHeight;
      if (active && active.tall && sheet) {
        geo.camH = sheet.clientHeight;
        geo.svgH = active.svg.getBoundingClientRect().height;
        geo.vbH = active.svg.viewBox.baseVal.height || 1;
      }
    }
    function scrollForStep(k) {
      var t = k >= N - 1 ? T - 0.02 : k + 0.75;
      var p = clamp((t - 0.6) / (T - 0.6), 0, 1);
      return geo.top - headH() + p * (geo.height - geo.stageH) + 1;
    }

    var step = -1, pinned = -1, lastT = -1;
    function render(t) {
      var m = active;
      if (!m) return;
      var k = clamp(Math.floor(t - 0.55), 0, N - 1);
      for (var i = 0; i < N; i++) {
        var on = t - i >= 0.55;
        if (m.onState[i] !== on) { m.onState[i] = on; m.nodes[i].classList.toggle('is-on', on); }
      }
      m.edges.forEach(function (e) {
        var d = clamp((t - e.i) / 0.55, 0, 1);
        d = Math.round(d * 500) / 500;
        if (d !== e.last) {
          e.last = d;
          e.line.style.strokeDashoffset = (e.len * (1 - d)).toFixed(1);
          var done = d >= 1;
          if (done !== e.done) { e.done = done; e.g.classList.toggle('is-done', done); }
        }
      });
      var tf = clamp((t - N) / 1.3, 0, 1);
      if (m.trace && tf !== m.traceLast) {
        m.traceLast = tf;
        m.trace.style.strokeDashoffset = (m.traceLen * (1 - tf)).toFixed(1);
        var traced = tf >= 1;
        if (traced !== m.traced) { m.traced = traced; m.svg.classList.toggle('is-traced', traced); }
      }
      var kk = clamp(Math.floor(t), 0, N - 1);
      var f = clamp(t - kk, 0, 1);
      var a = m.pos[kk], b = m.pos[Math.min(kk + 1, N - 1)];
      if (!m.tall && m.scan) {
        var x = a.x + (b.x - a.x) * f;
        m.scan.style.transform = 'translateX(' + x.toFixed(1) + 'px)';
      }
      if (m.tall && cam) {
        var y = (a.y + (b.y - a.y) * f) * (geo.svgH / geo.vbH);
        var ty = clamp(geo.camH * 0.7 - y, Math.min(0, geo.camH - geo.svgH), 0);
        cam.style.transform = 'translateY(' + ty.toFixed(1) + 'px)';
      }
      if (k !== step) {
        if (step >= 0 && m.nodes[step]) m.nodes[step].classList.remove('is-now');
        step = k;
        m.nodes[k].classList.add('is-now');
        if (pinned >= 0 && pinned !== k) unpin(true);
        if (pinned < 0) fill(k, false);
        if (scrub && document.activeElement !== scrub) scrub.value = String(k);
      }
    }
    function tFromScroll() {
      var r = root.getBoundingClientRect();
      var span = Math.max(1, geo.height - geo.stageH);
      var p = clamp((headH() - r.top) / span, 0, 1);
      if (sheet) sheet.style.setProperty('--grid-y', (-p * 60).toFixed(1) + 'px');
      return 0.6 + p * (T - 0.6);
    }
    var ticking = false, visible = false;
    function frame() {
      ticking = false;
      var t = tFromScroll();
      if (Math.abs(t - lastT) < 0.0005) return;
      lastT = t;
      render(t);
    }
    function onScroll() { if (visible && !ticking) { ticking = true; window.requestAnimationFrame(frame); } }

    /* Pinning a node's full story in the caption */
    function pin(k, focus) {
      var m = active;
      models.forEach(function (mm) { mm.nodes.forEach(function (n) { n.classList.remove('is-pinned'); }); });
      pinned = k;
      if (m && m.nodes[k]) m.nodes[k].classList.add('is-pinned');
      cap.classList.add('is-pinned');
      fill(k, true);
      el.resume.hidden = false;
      if (focus) el.title.focus({ preventScroll: true });
    }
    function unpin(silent) {
      if (pinned < 0) return;
      var was = pinned;
      pinned = -1;
      models.forEach(function (mm) { mm.nodes.forEach(function (n) { n.classList.remove('is-pinned'); }); });
      cap.classList.remove('is-pinned');
      el.resume.hidden = true;
      if (!silent) {
        fill(armed ? step : was, false);
        if (active && active.nodes[was]) active.nodes[was].focus({ preventScroll: true });
      }
    }
    function goTo(k, andPin) {
      if (armed) {
        measureGeo();
        if (k > step || !visible || andPin === 'scroll') jump(scrollForStep(k));
        lastT = -1;
        frame();
      } else {
        models.forEach(function (mm) { mm.nodes.forEach(function (n) { n.classList.remove('is-now'); }); });
        if (active && active.nodes[k]) active.nodes[k].classList.add('is-now');
        step = k;
        fill(k, false);
      }
      if (andPin) pin(k, andPin !== 'scroll');
    }

    models.forEach(function (m) {
      m.nodes.forEach(function (a, i) {
        var id = a.getAttribute('data-id');
        a.addEventListener('click', function (ev) { ev.preventDefault(); goTo(i, true); });
        a.addEventListener('keydown', function (ev) {
          if (ev.key === ' ' || ev.key === 'Spacebar') { ev.preventDefault(); goTo(i, true); }
        });
        a.addEventListener('mouseenter', function () { trace(m, id); });
        a.addEventListener('mouseleave', function () { untrace(m); });
        a.addEventListener('focus', function () {
          trace(m, id);
          /* After the browser's own focus scroll, move the story to this node */
          if (armed && (i > step || !visible)) {
            window.setTimeout(function () { measureGeo(); jump(scrollForStep(i)); visible = true; lastT = -1; frame(); }, 0);
          }
        });
        a.addEventListener('blur', function () { untrace(m); });
      });
    });
    el.resume.addEventListener('click', function () { unpin(false); });
    cap.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') unpin(false); });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && pinned >= 0 && root.contains(document.activeElement)) unpin(false);
    });
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('.readout a[data-go]');
      if (!a) return;
      ev.preventDefault();
      var k = index[a.getAttribute('data-go')];
      if (k == null) return;
      if (armed) goTo(k, 'scroll');
      else { stage.scrollIntoView({ block: 'start' }); goTo(k, true); }
      el.title.focus({ preventScroll: true });
    });

    if (controls && scrub) {
      controls.hidden = false;
      scrub.addEventListener('input', function () {
        var k = +scrub.value;
        if (pinned >= 0) unpin(true);
        goTo(k, false);
        if (armed) jump(scrollForStep(k));
      });
    }

    /* The text list starts collapsed once JS runs, unless a node is deep-linked */
    var list = $('#route-text');
    var deep = /^#n-[a-z]+$/.test(location.hash);
    if (list && !deep) list.open = false;

    pickActive();
    if (narrow.addEventListener) narrow.addEventListener('change', function () {
      models.forEach(function (m) { m.onState = []; m.edges.forEach(function (e) { e.last = -1; e.done = null; }); m.traceLast = -1; m.traced = null; });
      step = -1; pickActive(); measureGeo(); lastT = -1; if (armed) frame();
    });

    if (armed) {
      root.classList.add('is-armed');
      models.forEach(function (m) { m.nodes.forEach(function (n) { n.classList.remove('is-now'); }); });
      measureGeo();
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { visible = e.isIntersecting; if (visible) { measureGeo(); onScroll(); } });
      }, { rootMargin: '100px 0px 100px 0px' });
      io.observe(root);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', function () { measureGeo(); lastT = -1; onScroll(); }, { passive: true });
      visible = true; frame(); visible = false;
      window.addEventListener('load', function () { measureGeo(); lastT = -1; visible = true; frame(); });
    } else {
      step = N - 1;
      if (active && active.nodes[N - 1]) active.nodes[N - 1].classList.add('is-now');
    }
    if (deep) {
      var k0 = index[location.hash.slice(3)];
      if (k0 != null) pin(k0, false);
    }
  })();

  /* ---------- Counters ---------- */
  (function counters() {
    if (!MOTION) return;
    $$('[data-count]').forEach(function (dt) {
      var finalText = dt.textContent;
      var to = +dt.getAttribute('data-count');
      var pre = dt.getAttribute('data-prefix') || '';
      var vis = document.createElement('span');
      var sr = document.createElement('span');
      vis.setAttribute('aria-hidden', 'true');
      sr.className = 'visually-hidden';
      sr.textContent = finalText;
      vis.textContent = pre + '0';
      dt.textContent = '';
      dt.appendChild(vis); dt.appendChild(sr);
      once(dt, function () {
        var t0 = null, dur = to > 100 ? 1200 : 700;
        var tick = function (ts) {
          if (t0 === null) t0 = ts;
          var p = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
          vis.textContent = p < 1 ? pre + Math.round(to * e).toLocaleString('en-US') : finalText;
          if (p < 1) window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
      });
    });
  })();

  /* ---------- Discovery tally ---------- */
  (function tally() {
    var wrap = $('[data-tally]');
    if (!wrap || !MOTION) return;
    var cells = $$('.ledger-cells li', wrap);
    var n = {};
    $$('[data-tally-n]', wrap).forEach(function (d) { n[d.getAttribute('data-tally-n')] = d; });
    var c = { declared: 0, found: 0, infra: 0, admitted: 0, missed: 0 };
    wrap.classList.add('is-armed');
    Object.keys(c).forEach(function (k) { if (n[k]) n[k].textContent = '0'; });
    once(wrap, function () {
      var i = 0;
      var next = function () {
        var li = cells[i];
        if (!li) { if (n.phantom) n.phantom.classList.add('is-checked'); return; }
        li.classList.add('is-in');
        if (li.classList.contains('f')) { c.found++; c.declared++; c.admitted++; }
        else if (li.classList.contains('m')) { c.missed++; c.declared++; }
        else if (li.classList.contains('i')) { c.infra++; c.admitted++; }
        Object.keys(c).forEach(function (k) { if (n[k]) n[k].textContent = String(c[k]); });
        i++;
        window.setTimeout(next, 38);
      };
      next();
    }, '0px 0px -25% 0px');
  })();

  /* ---------- CVE re-rank (FLIP) and evidence-graph tracing ---------- */
  (function triage() {
    $$('[data-triage]').forEach(function (wrap) {
      var bar = $('.triage__bar', wrap), body = $('tbody', wrap), status = $('[data-triage-status]', wrap);
      if (!bar || !body) return;
      var rows = $$('tr', body);
      var buttons = $$('button[data-sort]', bar);
      bar.hidden = false;
      var sortBy = function (key) {
        var first = rows.map(function (r) { return r.getBoundingClientRect().top; });
        var sorted = rows.slice().sort(function (a, b) {
          var d = parseFloat(b.getAttribute('data-' + key)) - parseFloat(a.getAttribute('data-' + key));
          return d !== 0 ? d : parseFloat(b.getAttribute('data-score')) - parseFloat(a.getAttribute('data-score'));
        });
        sorted.forEach(function (r, i) {
          var rank = r.querySelector('[data-rank]');
          if (rank) rank.textContent = String(i + 1);
          body.appendChild(r);
        });
        if (MOTION) {
          rows.forEach(function (r, i) {
            var dy = first[i] - r.getBoundingClientRect().top;
            if (!dy) return;
            r.classList.add('is-moving');
            r.style.transition = 'none';
            r.style.transform = 'translateY(' + dy + 'px)';
          });
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              rows.forEach(function (r) {
                if (!r.style.transform) return;
                r.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
                r.style.transform = '';
                window.setTimeout(function () { r.classList.remove('is-moving'); r.style.transition = ''; }, 480);
              });
            });
          });
        }
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-sort') === key ? 'true' : 'false'); });
        if (status) {
          var firstRow = sorted[0].querySelector('th');
          status.textContent = (key === 'cvss' ? 'Ranked by CVSS only. ' : 'Ranked by fused score. ') + 'First: ' + (firstRow ? firstRow.textContent : '') + '.';
        }
      };
      buttons.forEach(function (b) { b.addEventListener('click', function () { sortBy(b.getAttribute('data-sort')); }); });

      var eg = $('svg.egraph');
      if (!eg) return;
      var gRows = {};
      $$('.eg-row', eg).forEach(function (g) { gRows[g.getAttribute('data-cve')] = g; });
      var light = function (cve) {
        eg.classList.add('is-tracing');
        Object.keys(gRows).forEach(function (k) { gRows[k].classList.toggle('is-lit', k === cve); });
        rows.forEach(function (r) { r.classList.toggle('is-lit', r.getAttribute('data-cve') === cve); });
      };
      var clear = function () {
        eg.classList.remove('is-tracing');
        Object.keys(gRows).forEach(function (k) { gRows[k].classList.remove('is-lit'); });
        rows.forEach(function (r) { r.classList.remove('is-lit'); });
      };
      Object.keys(gRows).forEach(function (k) {
        var g = gRows[k];
        g.addEventListener('mouseenter', function () { light(k); });
        g.addEventListener('focus', function () { light(k); });
        g.addEventListener('mouseleave', clear);
        g.addEventListener('blur', clear);
      });
      rows.forEach(function (r) {
        var k = r.getAttribute('data-cve');
        r.addEventListener('mouseenter', function () { light(k); });
        r.addEventListener('mouseleave', clear);
      });
    });
  })();

  /* ---------- Threat model explorer ---------- */
  (function threatModel() {
    var tm = $('[data-tm]');
    if (!tm) return;
    var panel = $('.tm__panel', tm);
    var threats = {};
    $$('tr[data-t]', tm).forEach(function (tr) {
      var td = tr.querySelectorAll('td');
      threats[tr.getAttribute('data-t')] = { tr: tr, name: td[1].textContent, through: td[2].textContent, control: td[3].textContent, src: td[4].querySelector('a') };
    });
    var nodes = $$('.tm__node', tm);
    var show = function (btn) {
      nodes.forEach(function (b) { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      var ids = btn.getAttribute('data-t').split(/\s+/);
      Object.keys(threats).forEach(function (k) { threats[k].tr.classList.toggle('is-lit', ids.indexOf(k) >= 0); });
      panel.textContent = '';
      var k = document.createElement('p');
      k.className = 'tm__panel-k';
      k.textContent = 'Threats at: ' + btn.querySelector('.tm__name').textContent;
      panel.appendChild(k);
      ids.forEach(function (id) {
        var t = threats[id];
        if (!t) return;
        var box = document.createElement('div'); box.className = 'tm__t';
        var h = document.createElement('h5');
        var s = document.createElement('span'); s.textContent = id;
        h.appendChild(s); h.appendChild(document.createTextNode(t.name));
        var p1 = document.createElement('p'); p1.textContent = 'Enters through: ' + t.through;
        var p2 = document.createElement('p'); p2.textContent = 'Control: ' + t.control;
        var p3 = document.createElement('p'); p3.className = 'tm__src'; p3.textContent = 'Source: ';
        if (t.src) p3.appendChild(t.src.cloneNode(true));
        box.appendChild(h); box.appendChild(p1); box.appendChild(p2); box.appendChild(p3);
        panel.appendChild(box);
      });
      panel.classList.remove('is-swap');
      if (MOTION) { void panel.offsetWidth; panel.classList.add('is-swap'); }
    };
    nodes.forEach(function (b) {
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('mouseenter', function () { show(b); });
      b.addEventListener('focus', function () { show(b); });
      b.addEventListener('click', function () { show(b); });
    });
    var text = $('.tm__text', tm);
    if (text) text.open = false;
    if (nodes[0]) show(nodes[0]);
    if (MOTION && HAS_IO) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { tm.classList.toggle('is-live', e.isIntersecting); });
      }, { threshold: 0.25 });
      io.observe($('.tm__flowwrap', tm));
    }
  })();

  /* ---------- Model card: spec sheet, copy, typing ---------- */
  (function modelCard() {
    var hash = location.hash.slice(1);
    $$('.sheet-wrap').forEach(function (wrap) {
      var specs = $$('details.spec', wrap);
      var bar = $('.sheet-bar', wrap);
      var btn = bar && $('.sheet-bar__all', bar);
      specs.forEach(function (d, i) { if (i > 0) d.open = false; });
      if (hash) openTarget(hash);
      var sync = function () {
        if (!btn) return;
        var allOpen = specs.every(function (d) { return d.open; });
        btn.textContent = allOpen ? 'Collapse all' : 'Expand all';
        btn.setAttribute('aria-expanded', allOpen ? 'true' : 'false');
      };
      if (bar && btn) {
        bar.hidden = false;
        btn.addEventListener('click', function () {
          var allOpen = specs.every(function (d) { return d.open; });
          specs.forEach(function (d) { d.open = !allOpen; });
          sync();
        });
      }
      specs.forEach(function (d) { d.addEventListener('toggle', sync); });
      sync();
    });

    $$('.bib__copy').forEach(function (b) {
      b.hidden = false;
      var src = document.getElementById(b.getAttribute('data-copy'));
      var status = b.closest('.bib').querySelector('.bib__status');
      var say = function (m) { if (status) status.textContent = m; };
      var select = function () {
        var r = document.createRange(); r.selectNodeContents(src);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      };
      b.addEventListener('click', function () {
        if (!src) return;
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(src.textContent).then(function () { say('Copied to the clipboard.'); },
            function () { select(); say('Selected. Press Ctrl+C to copy.'); });
        } else { select(); say('Selected. Press Ctrl+C to copy.'); }
      });
    });

    $$('pre.usage__code[data-type]').forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code || !MOTION) return;
      var segs = [];
      Array.prototype.forEach.call(code.childNodes, function (nd) {
        segs.push({ cls: nd.nodeType === 1 ? nd.className : '', text: nd.textContent });
      });
      var total = segs.reduce(function (s, x) { return s + x.text.length; }, 0);
      code.classList.add('usage__src');
      var typed = document.createElement('span');
      typed.className = 'usage__typed';
      typed.setAttribute('aria-hidden', 'true');
      pre.appendChild(typed);
      pre.classList.add('is-armed');
      once(pre, function () {
        var spans = segs.map(function (sg) {
          var s = document.createElement('span');
          if (sg.cls) s.className = sg.cls;
          typed.appendChild(s);
          return s;
        });
        var t0 = null, shown = 0;
        var tick = function (ts) {
          if (t0 === null) t0 = ts;
          var n = Math.min(total, Math.floor((ts - t0) / 16));
          if (n !== shown) {
            shown = n;
            var left = n;
            segs.forEach(function (sg, i) {
              var take = Math.max(0, Math.min(sg.text.length, left));
              if (spans[i].textContent.length !== take) spans[i].textContent = sg.text.slice(0, take);
              left -= sg.text.length;
            });
          }
          if (n < total) window.requestAnimationFrame(tick); else pre.classList.add('is-typed');
        };
        window.requestAnimationFrame(tick);
      }, '0px 0px -20% 0px');
    });

    /* Index highlight on the full card page */
    var idx = $$('.mc-index a[href^="#"]');
    if (idx.length && HAS_IO) {
      var set = function (id) {
        idx.forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      };
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) set(e.target.id); });
      }, { rootMargin: '-30% 0px -60% 0px' });
      idx.forEach(function (a) { var s = document.getElementById(a.getAttribute('href').slice(1)); if (s) io.observe(s); });
    }
  })();

  /* ---------- Report stamp lands again ---------- */
  (function report() {
    var s = $('.report__status');
    if (!s || !MOTION) return;
    s.classList.add('is-armed');
    once(s, function () { s.classList.add('in'); }, '0px 0px -20% 0px');
  })();
})();
