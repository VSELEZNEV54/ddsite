/* Главная: схема экосистемы, проблемы, первый экран с роликом, загрузочный экран. */
(function () {
  var $ = function (q) { return document.querySelector(q); }, i, s;
  $('#whoT').textContent = DD.copy.who; $('#mis').textContent = DD.copy.mission; $('#goal').textContent = DD.copy.goal;

  /* ---------- схема экосистемы ---------- */
  DD.eco($('#ecoBox'));

  /* ---------- проблемы: сначала тексты, фото ниже ---------- */
  $('#acc').innerHTML = DD.problems.map(function (p) {
    return '<div class="ai fr"><h3 class="ai__hh"><button class="ai__h" type="button" aria-expanded="false"><span class="ai__n" aria-hidden="true">' + p.n + '</span><span class="ai__t t-card">' + p.title + '</span><span class="svc" aria-hidden="true">Проблема → решение</span>' +
      '<span class="bx bx--ic ai__x" aria-hidden="true"><span class="bx__f"></span>' + DD.ic('plus') + '</span></button></h3>' +
      '<div class="ai__b"><div class="ai__bi"><div class="ai__g">' +
      '<div class="ai__c ai__c--p"><span class="svc">' + DD.ic('problem') + 'Проблема</span><p>' + p.p + '</p></div><div class="ai__ar">' + DD.ic('right') + '</div>' +
      '<div class="ai__c ai__c--s"><span class="svc">' + DD.ic('solution') + 'Решение</span><p>' + p.s + '</p></div>' +
      '<div class="ai__ph grain"><img src="img/' + p.img + '.jpg" alt="" loading="lazy"></div></div></div></div></div>';
  }).join('');
  DD.icons();
  /* первая карточка открыта, остальные открываются по клику; одновременно открыта одна */
  var items = [].slice.call(document.querySelectorAll('.ai'));
  var setOpen = function (it, v) { it.classList.toggle('open', v); it.querySelector('.ai__h').setAttribute('aria-expanded', v ? 'true' : 'false'); };
  items.forEach(function (it) { it.querySelector('.ai__h').addEventListener('click', function () {
    var v = !it.classList.contains('open'); items.forEach(function (x) { setOpen(x, false); }); if (v) setOpen(it, true);
  }); });
  setOpen(items[0], true);

  /* ---------- первый экран: тихое поле точек и линий, пока нет видео ---------- */
  var cv = $('#heroCanvas'), hero = $('.hero'), dots = true, seen = true, ready = false, loop = null;
  /* временная смена кадров проектов вместо видео: кадр 4 с, следующий подгружается заранее; поле точек гаснет, когда показан первый кадр */
  /* кадры b-* — из брендбука (фотостиль), остальные — прежние кадры направлений */
  var REEL = ['b-highfast', 'dir-ecom', 'b-agata', 'b-nomad', 'dir-uas', 'b-seal-top', 'dir-gear', 'b-hand', 'dir-def', 'b-seal', 'b-nomad-wheel', 'b-nomad-top', 'hull', 'b-seal-bow'];
  var reel = $('#heroReel'), shots, cur = -1, timer = null;
  reel.innerHTML = REEL.map(function (k, i) { return '<img alt="" ' + (i < 2 ? 'src' : 'data-src') + '="img/' + k + '.jpg"' + (i % 2 ? ' class="r"' : '') + '>'; }).join('');
  shots = [].slice.call(reel.children);
  var load = function (i) { var im = shots[i % shots.length]; if (im.getAttribute('data-src')) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); } };
  var show = function (i) {
    var prev = shots[cur]; if (prev) { prev.classList.remove('on'); prev.classList.add('was'); setTimeout(function () { prev.classList.remove('was'); }, 1000); }
    cur = i; shots[i].classList.add('on'); load(i + 1);
  };
  var play = function () {
    if (!ready) return;
    if (cur < 0) { show(0); var go = function () { hero.classList.add('vid'); setTimeout(function () { dots = false; }, 1600); }; if (shots[0].complete) go(); else shots[0].addEventListener('load', go); }
    hero.classList.toggle('paused', !seen);
    if (seen && !DD.reduced && !timer) timer = setInterval(function () { if (!document.hidden) show((cur + 1) % shots.length); }, 4000);
    if (!seen) { clearInterval(timer); timer = null; }
  };
  /* все, что движется, останавливается, когда уходит из вида: кадры и поле точек на первом экране, кольцо и сигналы в схеме */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { seen = en[0].isIntersecting; play(); if (seen && loop) loop(); }).observe(hero);
  }
  (function () {
    var ctx = cv.getContext('2d'), W, H, dpr, pts = [], N, t = 0, running = false;
    var resize = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = Math.round(Math.min(150, Math.max(60, (W * H) / 13000))); pts = [];
      for (var i = 0; i < N; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16, r: Math.random() * 1.3 + .4, p: Math.random() * Math.PI * 2, a: Math.random() < .14 });
    };
    var frame = function () {
      t += .004; ctx.clearRect(0, 0, W, H); var link = Math.min(W, H) * .17, i, j, a, dx, dy, d;
      for (i = 0; i < N; i++) { a = pts[i]; a.x += a.vx + Math.sin(t + a.p) * .08; a.y += a.vy + Math.cos(t * .8 + a.p) * .08; if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20; if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20; }
      ctx.lineWidth = 1;
      for (i = 0; i < N; i++) for (j = i + 1; j < N; j++) { dx = pts[i].x - pts[j].x; dy = pts[i].y - pts[j].y; d = Math.sqrt(dx * dx + dy * dy); if (d < link) { ctx.strokeStyle = 'rgba(244,245,245,' + (.09 * (1 - d / link)).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      for (i = 0; i < N; i++) { ctx.fillStyle = pts[i].a ? 'rgba(103,255,217,.55)' : 'rgba(244,245,245,.3)'; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2); ctx.fill(); }
      if (!DD.reduced && dots && seen) requestAnimationFrame(frame); else running = false;
    };
    loop = function () { if (dots && !running && !DD.reduced) { running = true; frame(); } };
    resize(); running = true; frame();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); if (DD.reduced) frame(); }, 120); });
    if (DD.fine && !DD.reduced) {
      hero.addEventListener('mousemove', function (e) { var r = hero.getBoundingClientRect(); hero.style.setProperty('--px', (((e.clientX - r.left) / r.width - .5) * 14).toFixed(1) + 'px'); hero.style.setProperty('--py', (((e.clientY - r.top) / r.height - .5) * 10).toFixed(1) + 'px'); });
      hero.addEventListener('mouseleave', function () { hero.style.setProperty('--px', '0px'); hero.style.setProperty('--py', '0px'); });
    }
  })();

  /* ---------- загрузочный экран ---------- */
  DD.loader({ min: 2400, assets: ['assets/logo/logo3b.svg', 'img/prob-1.jpg'], onOut: function () {
    ready = true; play();
    setTimeout(function () { $('#heroT').classList.add('in'); }, 350);
    DD.reveal(); DD.words($('#whoT'));
  } });

})();
