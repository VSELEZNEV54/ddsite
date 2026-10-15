/* Главная: схема экосистемы, проблемы, первый экран с роликом, загрузочный экран. */
(function () {
  var $ = function (q) { return document.querySelector(q); }, i, s;
  $('#whoT').textContent = DD.copy.who; $('#mis').textContent = DD.copy.mission; $('#goal').textContent = DD.copy.goal;

  /* ---------- схема экосистемы: кольцо из блоков, как линия загрузки; карточки в скобках ---------- */
  var CX = 600, CY = 370, R = 216, NB = 8, n = DD.dirs.length, step = 360 / n, gap = 5;
  /* правые карточки: [внутренний край по x, радиус излома линии]; левые зеркально, 04 стоит под кольцом */
  var EDGE = [[765, 310], [880, 262], [850, 290]];
  var pt = function (a, r) { var t = (a - 90) * Math.PI / 180; return [+(CX + r * Math.cos(t)).toFixed(1), +(CY + r * Math.sin(t)).toFixed(1)]; };
  var arc = function (a0, a1, r) { return 'M' + pt(a0, r) + ' A' + r + ' ' + r + ' 0 0 1 ' + pt(a1, r); };
  var svg = '<circle class="ro" cx="600" cy="370" r="254"/>', lay = [];
  DD.dirs.forEach(function (d, i) {
    var a0 = i * step + gap, a1 = (i + 1) * step - gap, am = (a0 + a1) / 2, w = (a1 - a0) / NB, k, at = ' data-i="' + i + '" style="--i:' + i + '"';
    for (k = 0; k < NB; k++) svg += '<path class="bk s-' + d.st + '" data-i="' + i + '" style="--k:' + (i * NB + k) + ';--j:' + k + '" d="' + arc(a0 + k * w + .45, a0 + (k + 1) * w - .45, R) + '"/>';
    var nd = pt(am, R + 13), side = i === 3 ? 0 : (i < 3 ? 1 : -1), path, end, num = pt(am, R - 24);
    if (!side) { path = 'M' + nd + ' V632'; end = [600, 632]; lay.push([440, 640, 0]); }
    else {
      var m = EDGE[i < 3 ? i : 6 - i], e = pt(am, m[1]), edge = side > 0 ? m[0] : 1200 - m[0], hx = edge - side * 8;
      path = 'M' + nd + ' L' + e + ' H' + hx; end = [hx, e[1]]; lay.push([side > 0 ? edge : edge - 320, e[1], 1]);
    }
    svg += '<path class="hit" data-hit="' + i + '" d="' + arc(a0, a1, R) + '"/><path class="ln" pathLength="1"' + at + ' d="' + path + '"/><path class="sg" pathLength="1" style="--i:' + i + '" d="' + path + '"/>' +
      '<rect class="nd"' + at + ' x="' + (nd[0] - 3.5) + '" y="' + (nd[1] - 3.5) + '" width="7" height="7"/><rect class="ne"' + at + ' x="' + (end[0] - 2.5) + '" y="' + (end[1] - 2.5) + '" width="5" height="5"/>' +
      '<text class="dn"' + at + ' x="' + num[0] + '" y="' + num[1] + '">' + d.n + '</text>';
  });
  $('#ecoSvg').innerHTML = svg;
  var st = $('#ecoSvg').parentNode, port = $('#port'), box = $('#ecoBox'), imgs = [];
  DD.dirs.forEach(function (d, i) {
    var im = document.createElement('img'); im.src = 'img/dir-' + d.key + '.jpg'; im.alt = ''; im.loading = 'lazy'; port.insertBefore(im, port.querySelector('.port__logo')); imgs.push(im);
    var a = document.createElement('a'); a.className = 'dc' + (lay[i][2] ? '' : ' dc--b'); a.href = DD.url('projects.html#dir-' + d.key); a.setAttribute('data-i', i);
    a.style.cssText = 'left:' + (lay[i][0] / 12).toFixed(2) + '%;top:' + (lay[i][1] / 7.8).toFixed(2) + '%;--i:' + i;
    a.innerHTML = '<span class="dc__top svc"><span>' + DD.ic(d.ic) + d.n + ' · ' + d.short + '</span>' + DD.st(d.st, d.stl) + '</span><b class="latin">' + d.products.join(' · ') + '</b><p>' + d.desc + '</p>';
    st.appendChild(a);
    var on = function (v) {
      box.classList.toggle('hov', v);
      box.querySelectorAll('[data-i="' + i + '"]').forEach(function (e) { e.classList.toggle('on', v); });
      imgs.forEach(function (x, j) { x.classList.toggle('on', v && j === i); }); port.querySelector('img').classList.toggle('on', !v);
      if (v) { $('#portN').textContent = d.n; $('#portT').textContent = d.short; }
    };
    a.addEventListener('mouseenter', function () { on(true); }); a.addEventListener('mouseleave', function () { on(false); });
    a.addEventListener('focus', function () { on(true); }); a.addEventListener('blur', function () { on(false); });
    /* дуга кольца работает так же, как карточка */
    var hit = box.querySelector('[data-hit="' + i + '"]');
    hit.addEventListener('mouseenter', function () { on(true); }); hit.addEventListener('mouseleave', function () { on(false); });
    hit.addEventListener('click', function () { location.href = a.href; });
  });

  /* ---------- проблемы: сначала тексты, фото ниже ---------- */
  $('#acc').innerHTML = DD.problems.map(function (p) {
    return '<div class="ai fr"><button class="ai__h" type="button" aria-expanded="false"><span class="ai__n">' + p.n + '</span><h3 class="t-card">' + p.title + '</h3><span class="svc">Проблема → решение</span>' +
      '<span class="bx bx--ic ai__x"><span class="bx__f"></span>' + DD.ic('plus') + '</span></button>' +
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
  var REEL = ['dir-ecom', 'dir-soft', 'qual-3', 'join-career', 'dir-uas', 'dir-gear', 'dir-comms', 'dir-def', 'hero-platform', 'hero-boat', 'hero-evtol', 'dir-tech', 'hull', 'prob-2'];
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
    new IntersectionObserver(function (en) { $('#ecoBox').classList.toggle('live', en[0].isIntersecting); }).observe($('#ecoBox'));
  } else $('#ecoBox').classList.add('live');
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
  $('#ldSign').innerHTML = DD.sign;
  var tr = $('#ldTr'), NB = window.innerWidth > 900 ? 48 : 32; for (i = 0, s = ''; i < 48; i++) s += '<i></i>'; tr.innerHTML = s;
  var blocks = tr.children, cks = $('#ldCk').children, ld = $('#ld'), sign = $('#ldSign'), path = sign.querySelector('path');
  DD.load({ min: 2400, assets: ['assets/logo/logo3b.svg', 'img/prob-1.jpg'],
    onProgress: function (p) {
      var nb = Math.round(p * NB), j;
      $('#ldN').textContent = Math.round(p * 100); path.style.strokeDashoffset = 1 - p; if (p > .97) sign.classList.add('full');
      for (j = 0; j < NB; j++) blocks[j].classList.toggle('on', j < nb);
      for (j = 0; j < cks.length; j++) { var a = j / cks.length, b = (j + 1) / cks.length; cks[j].classList.toggle('ok', p >= b - .005); cks[j].classList.toggle('run', p >= a && p < b - .005); }
    },
    onDone: function () { setTimeout(function () {
      ld.classList.add('out'); document.body.classList.add('ready');
      ready = true; play();
      setTimeout(function () { $('#heroT').classList.add('in'); }, 350);
      DD.reveal(); DD.words($('#whoT')); setTimeout(function () { ld.remove(); }, 1600);
    }, 420); } });

})();
