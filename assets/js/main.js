/**
 * Ivory Trails — site interactions: FAQ accordion, nav scroll state, mobile menu.
 */
(function () {
  'use strict';

  function initFaq() {
    document.querySelectorAll('.faq-item__trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panelId = btn.getAttribute('aria-controls');
        if (!panelId) return;
        var panel = document.getElementById(panelId);
        if (!panel) return;
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var next = !expanded;
        btn.setAttribute('aria-expanded', next ? 'true' : 'false');
        panel.classList.toggle('is-open', next);
      });
    });
  }

  function initNavScroll() {
    var nav = document.getElementById('site-nav');
    var hero = document.getElementById('hero');
    if (!nav) return;
    if (!hero || !('IntersectionObserver' in window)) {
      nav.classList.add('is-scrolled');
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          nav.classList.toggle('is-scrolled', !entry.isIntersecting);
        });
      },
      { root: null, threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(hero);
  }

  function initMobileMenu() {
    var nav = document.getElementById('site-nav');
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('nav-mobile-menu');
    if (!hamburger || !mobileMenu || !nav) return;

    function setOpen(open) {
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.classList.toggle('is-open', open);
      nav.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', function () {
      setOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function boot() {
    initFaq();
    initNavScroll();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
