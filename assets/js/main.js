/* ═══════════════════════════════════════════════════════════
   Tanika — Interactions vanilla
   Navigation · Reveal · Compteurs · Pied de page
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Reduced motion ─────────────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── JS flag ────────────────────────────────────────────── */
  document.documentElement.classList.add('js');

  /* ── Current year (dynamic count years) ─────────────────── */
  var YEAR = new Date().getFullYear();
  var YEARS = YEAR - 2018;

  /* ══════════════════════════════════════════════════════════
     HEADER SCROLL VEIL
     ══════════════════════════════════════════════════════════ */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ══════════════════════════════════════════════════════════
     MOBILE NAV TOGGLE
     ══════════════════════════════════════════════════════════ */
  var navToggle = document.getElementById('navToggle');
  var navPanel = document.getElementById('siteNav');

  navToggle.addEventListener('click', function () {
    var open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navPanel.classList.toggle('open', !open);
    document.body.style.overflow = !open ? 'hidden' : '';
  });

  // Close on link click (mobile)
  navPanel.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on resize to desktop
  var bp = 1021;
  window.addEventListener('resize', function () {
    if (window.innerWidth >= bp && navPanel.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navPanel.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ══════════════════════════════════════════════════════════
     INTERSECTION OBSERVER — REVEAL + ARIA-CURRENT
     ══════════════════════════════════════════════════════════ */
  // Reveal
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reducedMotion) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var ioReveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          ioReveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { ioReveal.observe(el); });
  }

  // Aria-current on nav
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));
  var sectionMap = {};
  sections.forEach(function (s) {
    sectionMap[s.id] = navLinks.filter(function (a) { return a.getAttribute('href') === '#' + s.id; })[0];
  });

  var ioNav = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); a.classList.remove('is-active'); });
        var link = sectionMap[entry.target.id];
        if (link) { link.setAttribute('aria-current', 'true'); link.classList.add('is-active'); }
      }
    });
  }, { threshold: 0.0, rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { ioNav.observe(s); });

  /* ══════════════════════════════════════════════════════════
     CHIFFRES — COUNT UP ANIMATION
     ══════════════════════════════════════════════════════════ */
  var counters = Array.prototype.slice.call(document.querySelectorAll('.count[data-count]'));
  var chiffresSection = document.getElementById('chiffres');

  function animateCounters() {
    if (reducedMotion) {
      counters.forEach(function (el) {
        var raw = el.getAttribute('data-count');
        var target = raw === 'years' ? YEARS : parseInt(raw, 10);
        el.textContent = target;
      });
      return;
    }

    var duration = 1800;
    var startTime = null;

    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function tick(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutExpo(progress);

      counters.forEach(function (el) {
        var raw = el.getAttribute('data-count');
        var target = raw === 'years' ? YEARS : parseInt(raw, 10);
        var current = Math.round(target * eased);
        el.textContent = current;
      });

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (chiffresSection && !reducedMotion) {
    var ioCounters = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          ioCounters.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    ioCounters.observe(chiffresSection);
  } else {
    // Ensure final values without JS
    counters.forEach(function (el) {
      var raw = el.getAttribute('data-count');
      var target = raw === 'years' ? YEARS : parseInt(raw, 10);
      el.textContent = target;
    });
  }

  /* ══════════════════════════════════════════════════════════
     COURBE DE CUISSON — DESSIN AU SCROLL
     ══════════════════════════════════════════════════════════ */
  var roastSection = document.getElementById('savoir');
  var roastSvg = document.querySelector('.roast-svg');
  var roastPath = document.getElementById('roastPath');
  var roastDot = document.getElementById('roastDot');

  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

  if (roastSvg && roastPath && roastDot && roastSection) {
    if (reducedMotion) {
      roastSvg.classList.add('is-drawn');
      var pt0 = roastPath.getPointAtLength(roastPath.getTotalLength());
      roastDot.setAttribute('cx', pt0.x);
      roastDot.setAttribute('cy', pt0.y);
    } else {
      var ioRoast = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            roastSvg.classList.add('is-drawn');
            drawRoastDot();
            ioRoast.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      ioRoast.observe(roastSection);

      function drawRoastDot() {
        var total = roastPath.getTotalLength();
        var duration = 2800;
        var start = null;
        function step(now) {
          if (!start) start = now;
          var progress = Math.min((now - start) / duration, 1);
          var eased = easeOutExpo(progress);
          var len = total * eased;
          var pt = roastPath.getPointAtLength(len);
          roastDot.setAttribute('cx', pt.x);
          roastDot.setAttribute('cy', pt.y);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }
  }

  /* ══════════════════════════════════════════════════════════
     FOOTER YEAR
     ══════════════════════════════════════════════════════════ */
  var footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) footerYearEl.textContent = YEAR;

  /* ══════════════════════════════════════════════════════════
     SCROLL CUE HIDE
     ══════════════════════════════════════════════════════════ */
  var scrollCue = document.querySelector('.scroll-cue');
  if (scrollCue) {
    window.addEventListener('scroll', function () {
      scrollCue.style.opacity = window.scrollY > 300 ? '0' : '';
      scrollCue.style.transition = reducedMotion ? 'none' : 'opacity .6s';
      scrollCue.style.pointerEvents = window.scrollY > 300 ? 'none' : '';
    }, { passive: true });
  }

})();