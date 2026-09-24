/* Case file site behavior: nav toggle, current page, reveals, reading
   progress, contact form hand-off. The home page scenes (route graph,
   triage re-rank, model card) live in investigation.js.
   No dependencies, no network, no storage. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  if (!reduceMotion && hasIO) doc.classList.add('js');

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  // Current page in the main nav
  var here = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  var section = document.body.getAttribute('data-section');
  document.querySelectorAll('.site-nav a[href]').forEach(function (a) {
    if (a.getAttribute('href').indexOf('#') !== -1) return;
    var href = a.getAttribute('href');
    if (href === here || (section && href === section)) a.setAttribute('aria-current', 'page');
  });

  // Reveals (hidden state exists only when the .js class is set)
  if (doc.classList.contains('js')) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.rv, .stamp--settle').forEach(function (el) { ro.observe(el); });
  }

  // Reading progress under the header
  var bar = document.querySelector('.progress__bar');
  if (bar) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  // Contact form: nothing is sent to a server; it opens the visitor's mail client
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var body = 'From: ' + val('name') + '\nEmail: ' + val('email') + '\n\n' + val('message');
      window.location.href = 'mailto:ologundeomotola@gmail.com?subject=' +
        encodeURIComponent(val('subject')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
