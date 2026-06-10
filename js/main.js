/* =========================================================================
   ELÍAS CONEO — main.js  (vanilla, sin dependencias)
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- CONFIGURACIÓN EDITABLE ----------
     Reemplaza estos datos por los reales del cliente. */
  var CONFIG = {
    whatsapp: '573214101991',            // número real (Elías Coneo Díaz)
    waText: 'Hola Elías Coneo, me gustaría agendar una asesoría de diseño interior.'
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ============================ LOADER (con progreso) ============================ */
  (function loader() {
    var el = $('#loader');
    if (!el) return;
    document.body.classList.add('is-locked');
    var bar = $('#loaderBar'), pct = $('#loaderPct');
    var MIN = reduceMotion ? 500 : 2600, start = Date.now(), loaded = false, finished = false, p = 0;
    // barra de progreso: avanza hasta 90% mientras carga, completa a 100% al estar listo
    var prog = setInterval(function () {
      var cap = loaded ? 100 : 90;
      p += Math.max(0.6, (cap - p) * 0.07);
      if (p > cap) p = cap;
      if (bar) bar.style.width = p.toFixed(1) + '%';
      if (pct) pct.textContent = Math.round(p) + '%';
      if (p >= 100) clearInterval(prog);
    }, 28);
    function reveal() {
      if (finished) return; finished = true;
      clearInterval(prog);
      if (bar) bar.style.width = '100%';
      if (pct) pct.textContent = '100%';
      setTimeout(function () {
        el.classList.add('is-done');
        document.body.classList.remove('is-locked');
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1100);
      }, 360);
    }
    function onReady() {
      loaded = true;
      setTimeout(reveal, Math.max(0, MIN - (Date.now() - start)));
    }
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady);
    setTimeout(function () { loaded = true; reveal(); }, 6000); // failsafe
  })();

  /* ============================ HERO · INCLINACIÓN 3D ============================ */
  (function heroTilt() {
    if (reduceMotion) return;
    var tilt = $('#heroTilt');
    if (!tilt) return;
    if (window.matchMedia('(hover: none)').matches) return; // saltar en pantallas táctiles
    var hero = tilt.closest('.hero');
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      tilt.style.transform = 'rotateY(' + (cx * 9).toFixed(2) + 'deg) rotateX(' + (-cy * 7).toFixed(2) + 'deg)';
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener('mouseleave', function () {
      tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop);
    });
  })();

  /* ============================ WHATSAPP LINKS ============================ */
  (function whatsapp() {
    var href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.waText);
    $$('[data-wa]').forEach(function (a) { a.setAttribute('href', href); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); });
  })();

  /* ============================ HEADER (scroll) ============================ */
  (function header() {
    var header = $('#header');
    if (!header) return;
    var last = 0;
    function onScroll() {
      var y = window.pageYOffset;
      header.classList.toggle('is-scrolled', y > 60);
      // ocultar al bajar, mostrar al subir (solo pasado el hero)
      if (y > 600) header.classList.toggle('is-hidden', y > last && y - last > 4);
      else header.classList.remove('is-hidden');
      last = y;
      var wa = $('.wa-float'); if (wa) wa.classList.toggle('is-visible', y > 700);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ============================ MENÚ MÓVIL ============================ */
  (function mobileMenu() {
    var toggle = $('#navToggle'), menu = $('#mobileMenu');
    if (!toggle || !menu) return;
    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      document.body.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open) $$('.mobile-menu__link', menu).forEach(function (l, i) { l.style.transitionDelay = (0.12 + i * 0.06) + 's'; });
    }
    toggle.addEventListener('click', function () { setOpen(!document.body.classList.contains('menu-open')); });
    $$('.mobile-menu__link, .mobile-menu__footer .btn', menu).forEach(function (l) {
      l.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  })();

  /* ============================ REVEAL ON SCROLL ============================ */
  (function reveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (i) { i.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var sibs = $$('.reveal', e.target.parentNode);
          var idx = sibs.indexOf(e.target);
          e.target.style.transitionDelay = Math.min(idx * 0.08, 0.4) + 's';
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (i) { io.observe(i); });
  })();

  /* ============================ PARALLAX SUTIL ============================ */
  (function parallax() {
    if (reduceMotion) return;
    var els = $$('[data-parallax] img');
    if (!els.length) return;
    els.forEach(function (img) { img.style.willChange = 'transform'; });
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var center = r.top + r.height / 2;
        var off = ((center - vh / 2) / vh) * -26; // px
        img.style.transform = 'scale(1.16) translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  /* ============================ COUNTDOWN ============================ */
  (function countdown() {
    var el = $('#countdown');
    if (!el) return;
    var target = new Date(el.getAttribute('data-launch')).getTime();
    var dE = $('[data-d]', el), hE = $('[data-h]', el), mE = $('[data-m]', el), sE = $('[data-s]', el);
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        el.innerHTML = '<span class="countdown__label">La colección ya está disponible</span>';
        clearInterval(timer); return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff % 86400000 / 3600000);
      var m = Math.floor(diff % 3600000 / 60000);
      var s = Math.floor(diff % 60000 / 1000);
      if (dE) dE.textContent = d;
      if (hE) hE.textContent = pad(h);
      if (mE) mE.textContent = pad(m);
      if (sE) sE.textContent = pad(s);
    }
    tick();
    var timer = setInterval(tick, 1000);
  })();

  /* ============================ TESTIMONIOS ============================ */
  (function testimonials() {
    var wrap = $('#testi'), dotsWrap = $('#testiDots');
    if (!wrap) return;
    var items = $$('.testi__item', wrap);
    if (items.length < 2) return;
    var i = 0, timer;
    items.forEach(function (_, idx) {
      var b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Testimonio ' + (idx + 1));
      if (idx === 0) b.classList.add('is-active');
      b.addEventListener('click', function () { go(idx); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = $$('button', dotsWrap);
    function go(n) {
      items[i].classList.remove('is-active'); dots[i].classList.remove('is-active');
      i = n;
      items[i].classList.add('is-active'); dots[i].classList.add('is-active');
    }
    function next() { go((i + 1) % items.length); }
    function reset() { clearInterval(timer); timer = setInterval(next, 6500); }
    reset();
  })();

  /* ============================ CONTADORES (stats) ============================ */
  (function counters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;
    function run(el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      var dur = 1600, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  /* ============================ FORMULARIO → WHATSAPP ============================ */
  (function form() {
    var f = $('#contactForm');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = $('#nombre'), ok = true;
      if (!nombre.value.trim()) { nombre.closest('.field').classList.add('is-error'); ok = false; nombre.focus(); }
      else nombre.closest('.field').classList.remove('is-error');
      if (!ok) return;
      var tel = $('#telefono').value.trim();
      var tipo = $('#tipo').value;
      var msg = $('#mensaje').value.trim();
      var text = 'Hola Elías Coneo, soy ' + nombre.value.trim() + '.' +
        '\n\nMe interesa: ' + tipo +
        (tel ? '\nTeléfono: ' + tel : '') +
        (msg ? '\n\n' + msg : '') +
        '\n\nMe gustaría agendar una asesoría.';
      window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
    $$('input,select,textarea', f).forEach(function (el) {
      el.addEventListener('input', function () { var fl = el.closest('.field'); if (fl) fl.classList.remove('is-error'); });
    });
  })();

  /* ============================ SMOOTH ANCHORS + AÑO ============================ */
  (function misc() {
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var top = t.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  })();

  /* ============================ CURSOR · MAGNÉTICOS · PROGRESO ============================ */
  (function interactions() {
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* Cursor personalizado (solo escritorio, respeta reduce-motion) */
    var cur = $('#cursor');
    if (cur && fine && !reduceMotion) {
      document.body.classList.add('has-cursor');
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy, started = false;
      function loop() {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        cur.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      }
      window.addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!started) { started = true; cur.classList.add('is-active'); loop(); }
      });
      var SEL = 'a,button,[data-magnetic],.project,.service,.media,input,textarea,select';
      document.addEventListener('mouseover', function (e) { if (e.target.closest && e.target.closest(SEL)) cur.classList.add('is-hover'); });
      document.addEventListener('mouseout', function (e) { if (e.target.closest && e.target.closest(SEL)) cur.classList.remove('is-hover'); });
      document.addEventListener('mouseleave', function () { cur.classList.remove('is-active'); });
      document.addEventListener('mouseenter', function () { cur.classList.add('is-active'); });
    }

    /* Botones magnéticos */
    if (fine && !reduceMotion) {
      $$('[data-magnetic]').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
          var r = btn.getBoundingClientRect();
          var mx = e.clientX - (r.left + r.width / 2), my = e.clientY - (r.top + r.height / 2);
          btn.style.transform = 'translate(' + (mx * 0.25).toFixed(1) + 'px,' + (my * 0.4).toFixed(1) + 'px)';
        });
        btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
      });
    }

    /* Barra de progreso de scroll */
    var bar = $('#scrollProgress');
    if (bar) {
      var updBar = function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h > 0 ? window.pageYOffset / h : 0;
        bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)).toFixed(4) + ')';
      };
      window.addEventListener('scroll', updBar, { passive: true });
      window.addEventListener('resize', updBar, { passive: true });
      updBar();
    }
  })();

  /* ============================ LIGHTBOX · GALERÍA POR PROYECTO ============================ */
  (function lightbox() {
    var lb = $('#lightbox');
    if (!lb) return;
    var cards = $$('.project');
    if (!cards.length) return;
    var wrap = $('#lbImgWrap'), nameEl = $('#lbName'), infoEl = $('#lbInfo'), countEl = $('#lbCount');
    var gallery = [], idx = 0, name = '', info = '';
    var PH = '<div class="lightbox__ph"><img src="assets/logo/icon-ink-320.png" alt="" /><span>Fotografía próximamente</span></div>';

    function render() {
      countEl.textContent = gallery.length > 1 ? (idx + 1) + ' / ' + gallery.length : '';
      nameEl.textContent = name;
      infoEl.textContent = info;
      $('#lbPrev').style.display = $('#lbNext').style.display = gallery.length > 1 ? '' : 'none';
      wrap.innerHTML = '';
      var src = gallery[idx];
      if (src) {
        var im = new Image();
        im.alt = name;
        im.onerror = function () { wrap.innerHTML = PH; };
        im.src = src;
        wrap.appendChild(im);
      } else { wrap.innerHTML = PH; }
    }
    function open(card) {
      var imgs = (card.getAttribute('data-images') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!imgs.length) { var im = card.querySelector('img'); imgs = im ? [im.getAttribute('src')] : []; }
      gallery = imgs;
      name = card.getAttribute('data-name') || '';
      info = card.getAttribute('data-info') || '';
      idx = 0; render();
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('is-locked');
    }
    function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('is-locked'); }
    function go(d) { if (gallery.length < 2) return; idx = (idx + d + gallery.length) % gallery.length; render(); }

    cards.forEach(function (c) { c.style.cursor = 'pointer'; c.addEventListener('click', function () { open(c); }); });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function () { go(-1); });
    $('#lbNext').addEventListener('click', function () { go(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    });
  })();

})();
