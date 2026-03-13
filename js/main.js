/* =========================================================
   CYBERSECURITY PORTFOLIO – main.js
   ========================================================= */

(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Mobile nav toggle ── */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile nav when a link is clicked */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Typed-text effect ── */
  var phrases = [
    'Ethical Hacker',
    'CTF Player',
    'Penetration Tester',
    'Security Researcher',
    'Digital Forensics Analyst',
    'Bug Hunter'
  ];
  var typedEl  = document.getElementById('typed-text');
  var pIdx     = 0;
  var cIdx     = 0;
  var deleting = false;

  function typeLoop() {
    var current = phrases[pIdx];
    if (deleting) {
      cIdx--;
    } else {
      cIdx++;
    }
    typedEl.textContent = current.substring(0, cIdx);

    var delay = deleting ? 60 : 110;

    if (!deleting && cIdx === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  /* ── Intersection Observer – fade-in elements ── */
  var fadeEls = document.querySelectorAll(
    '.skill-card, .project-card, .cert-card, .about-text, .about-terminal, .contact-info, .contact-form'
  );
  fadeEls.forEach(function (el) { el.classList.add('fade-in'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el) { observer.observe(el); });

  /* ── Skill bar animation (triggered when section is visible) ── */
  var barFills = document.querySelectorAll('.bar-fill');
  var barsSection = document.getElementById('skills');

  var barObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      barFills.forEach(function (fill) {
        var w = fill.getAttribute('data-width');
        fill.style.width = w + '%';
      });
      barObserver.disconnect();
    }
  }, { threshold: 0.3 });

  barObserver.observe(barsSection);

  /* ── Smooth active nav link highlight ── */
  var sections   = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 80;
    sections.forEach(function (sec) {
      var top    = sec.offsetTop;
      var height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) { a.style.color = ''; });
        var active = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
        if (active) { active.style.color = 'var(--accent)'; }
      }
    });
  }, { passive: true });

  /* ── Contact form (static demo) ── */
  var form     = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = form.name.value.trim();
    var email   = form.email.value.trim();
    var message = form.message.value.trim();

    if (!name || !email || !message) {
      formNote.textContent = '⚠ Please fill in all fields.';
      formNote.className   = 'form-note error';
      return;
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      formNote.textContent = '⚠ Please enter a valid email address.';
      formNote.className   = 'form-note error';
      return;
    }

    formNote.textContent = '✔ Message received! I\'ll get back to you soon.';
    formNote.className   = 'form-note success';
    form.reset();

    setTimeout(function () {
      formNote.textContent = '';
      formNote.className   = 'form-note';
    }, 5000);
  });

  /* ── Footer year ── */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();
