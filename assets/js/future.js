(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var toggle = document.querySelector('.fx-nav__toggle');
  var links = document.querySelector('.fx-nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.fx-nav__links a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  var revealEls = document.querySelectorAll('.rv');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function (el) { ro.observe(el); });
    }
  }

  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reduceMotion) {
    var ticking = false;
    function updateParallax() {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (center * -speed) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  var roleEl = document.querySelector('[data-role-cycle]');
  if (roleEl) {
    var roles = roleEl.getAttribute('data-role-cycle').split('|');
    var idx = 0;
    if (reduceMotion || roles.length < 2) {
      roleEl.textContent = roles[0];
    } else {
      roleEl.textContent = roles[0];
      setInterval(function () {
        idx = (idx + 1) % roles.length;
        roleEl.style.opacity = 0;
        setTimeout(function () {
          roleEl.textContent = roles[idx];
          roleEl.style.opacity = 1;
        }, 350);
      }, 2800);
    }
  }

  var loader = document.querySelector('.fx-loader');
  if (loader) {
    var seen = false;
    try { seen = sessionStorage.getItem('fx-intro-seen') === '1'; } catch (e) {}
    if (seen || reduceMotion) {
      loader.classList.add('is-done');
    } else {
      window.addEventListener('load', function () {
        setTimeout(function () {
          loader.classList.add('is-done');
          try { sessionStorage.setItem('fx-intro-seen', '1'); } catch (e) {}
        }, 1200);
      });
    }
  }

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('name').value.trim();
      var em = document.getElementById('email').value.trim();
      var s = document.getElementById('subject').value.trim();
      var m = document.getElementById('message').value.trim();
      var body = 'From: ' + n + '\nEmail: ' + em + '\n\n' + m;
      window.location.href = 'mailto:ezekiel@cyntraix.io?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(body);
    });
  }
})();
