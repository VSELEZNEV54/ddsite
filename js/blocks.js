/* Общие блоки страниц: схема экосистемы и лента направлений. Данные в base.js (DD.dirs, DD.projects, DD.dirDesc). */
(function () {
  'use strict';
  DD.I.left = DD.I.left || '<path d="M20 12H4M10 6l-6 6 6 6"/>';

  /* ---------- загрузочный экран: знак рисуется линией, счетчик и сегментная линия (на внутренних страницах еще четыре проверки); экран уезжает вверх шторой ----------
     Разметка #ld в странице. o.min — минимальная длительность, o.assets — что загрузить заранее, o.onOut — когда экран начинает уезжать */
  DD.loader = function (o) {
    var ld = document.getElementById('ld');
    if (!ld) { if (o.onOut) o.onOut(); return; }
    var sign = ld.querySelector('.ld__sign'), tr = ld.querySelector('.ld__tr'), ck = ld.querySelector('.ld__ck'), cks = ck ? ck.children : [], num = ld.querySelector('.ld__n span');  /* список проверок есть не на всех страницах */
    sign.innerHTML = DD.sign; var path = sign.querySelector('path');
    var NB = window.innerWidth > 900 ? 48 : 32, s = '', i; for (i = 0; i < 48; i++) s += '<i></i>'; tr.innerHTML = s; var blocks = tr.children;
    try { sessionStorage.setItem('dd_seen', '1'); } catch (e) {}
    DD.load({ min: o.min || 2400, assets: o.assets || [],
      onProgress: function (p) {
        var nb = Math.round(p * NB), j;
        num.textContent = Math.round(p * 100); path.style.strokeDashoffset = 1 - p; if (p > .97) sign.classList.add('full');
        for (j = 0; j < NB; j++) blocks[j].classList.toggle('on', j < nb);
        for (j = 0; j < cks.length; j++) { var a = j / cks.length, z = (j + 1) / cks.length; cks[j].classList.toggle('ok', p >= z - .005); cks[j].classList.toggle('run', p >= a && p < z - .005); }
      },
      onDone: function () { setTimeout(function () {
        ld.classList.add('out'); document.body.classList.add('ready');
        if (o.onOut) o.onOut();
        setTimeout(function () { ld.remove(); }, 1600);
      }, 420); } });
  };

  /* ---------- схема экосистемы: кольцо из блоков, как линия загрузки; карточки в скобках ----------
     box — .eco с .eco__st, .eco__svg и .port внутри (разметка как на главной) */
  DD.eco = function (box) {
    if (!box) return;
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
    box.querySelector('.eco__svg').innerHTML = svg;
    var st = box.querySelector('.eco__st'), port = box.querySelector('.port'), capN = port.querySelector('.port__cap b'), capT = port.querySelector('.port__cap .svc'), cap = box.querySelector('.eco__cap'), imgs = [];
    DD.dirs.forEach(function (d, i) {
      var im = document.createElement('img'); im.src = 'img/' + (d.img || 'dir-' + d.key) + '.jpg';  /* d.img — свой кадр направления (на главной из брендбука) */ im.alt = ''; im.loading = 'lazy'; port.insertBefore(im, port.querySelector('.port__logo')); imgs.push(im);
      var a = document.createElement('a'); a.className = 'dc' + (lay[i][2] ? '' : ' dc--b'); a.href = DD.url('projects.html#dir-' + d.key); a.setAttribute('data-i', i);
      a.style.cssText = 'left:' + (lay[i][0] / 12).toFixed(2) + '%;top:' + (lay[i][1] / 7.8).toFixed(2) + '%;--i:' + i;
      a.innerHTML = '<span class="dc__top svc"><span>' + DD.ic(d.ic) + d.n + ' · ' + d.short + '</span>' + DD.st(d.st, d.stl) + '</span><b class="latin">' + d.products.join(' · ') + '</b><p>' + d.desc + '</p>';
      st.appendChild(a);
      var on = function (v) {
        box.classList.toggle('hov', v);
        box.querySelectorAll('[data-i="' + i + '"]').forEach(function (e) { e.classList.toggle('on', v); });
        imgs.forEach(function (x, j) { x.classList.toggle('on', v && j === i); }); port.querySelector('img').classList.toggle('on', !v);
        if (v) { capN.textContent = d.n; capT.textContent = d.short; }
        if (cap) cap.textContent = v ? d.title + '. ' + d.tip : cap.getAttribute('data-default');
      };
      a.addEventListener('mouseenter', function () { on(true); }); a.addEventListener('mouseleave', function () { on(false); });
      a.addEventListener('focus', function () { on(true); }); a.addEventListener('blur', function () { on(false); });
      /* дуга кольца работает так же, как карточка */
      var hit = box.querySelector('[data-hit="' + i + '"]');
      hit.addEventListener('mouseenter', function () { on(true); }); hit.addEventListener('mouseleave', function () { on(false); });
      hit.addEventListener('click', function () { location.href = a.href; });
    });
    /* кольцо вращается и сигналы бегут, только пока схема на экране */
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { box.classList.toggle('live', en[0].isIntersecting); }).observe(box);
    else box.classList.add('live');
  };

  /* ---------- лента направлений: карточки с фото, листание кнопками, клавишами и мышью ----------
     rail — .rail, nav — блок со счетчиком (b или [data-now]) и кнопками [data-step] */
  DD.rail = function (rail, nav) {
    if (!rail) return;
    var href = function (name) { return DD.url(name.toLowerCase() + '.html'); };
    var count = function (n) { return n + (n === 1 ? ' продукт' : ' продукта'); };
    rail.innerHTML = DD.dirs.map(function (d, i) {
      var mine = DD.projects.filter(function (p) { return p[3] === i; });
      return '<article class="rc grain"><div class="rc__img"><img src="img/' + (d.img || 'dir-' + d.key) + '.jpg" alt="" loading="lazy"></div><div class="mc__br"></div>' +
        '<div class="rc__t"><span class="rc__n">' + d.n + '</span><span class="svc">' + DD.ic(d.ic) + '</span><span class="svc">' + count(mine.length) + '</span></div>' +
        '<div><h3>' + d.title + '</h3><p>' + DD.dirDesc[i] + '</p><div class="rc__ch">' + mine.map(function (p) {
          return '<a class="bx bx--s svc" href="' + href(p[0]) + '" title="' + p[0] + ' — ' + p[2] + '"><span class="bx__f"></span><span class="st st--' + p[1] + '"><i></i>' + p[0] + '</span>' + DD.ic('ne', 'ic--s') + '</a>';
        }).join('') + '</div></div></article>';
    }).join('') +
      '<a class="rc rc--all" href="' + DD.url('projects.html') + '"><div class="mc__br"></div><span class="svc" style="color:var(--on-dark-2)">Все направления</span><span><b>14</b><span class="t-lead" style="display:block">продуктов<br>в семи направлениях</span></span>' +
      '<span class="bx bx--on"><span class="bx__f"></span>Все проекты' + DD.ic('right', 'ic--s ic--mv') + '</span></a>';
    (function () {
      var cards = rail.querySelectorAll('.rc:not(.rc--all)'), now = nav.querySelector('[data-now]') || nav.querySelector('b'), btns = nav.querySelectorAll('[data-step]'), target = 0, settle = null, drag = null;
      var step = function () { return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth; };
      var max = function () { return Math.max(0, Math.ceil((rail.scrollWidth - rail.clientWidth - 4) / step())); };
      var go = function (k) { target = Math.max(0, Math.min(max(), target + k)); rail.scrollTo({ left: target * step(), behavior: DD.reduced ? 'auto' : 'smooth' }); };
      var sync = function () {
        var end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
        var i = end ? cards.length - 1 : Math.min(cards.length - 1, Math.max(0, Math.round(rail.scrollLeft / step())));
        now.textContent = ('0' + (i + 1)).slice(-2);
        btns.forEach(function (b) { b.disabled = b.getAttribute('data-step') === '-1' ? rail.scrollLeft < 4 : end; });
      };
      btns.forEach(function (b) { b.addEventListener('click', function () { go(parseInt(b.getAttribute('data-step'), 10)); }); });
      rail.addEventListener('scroll', function () { sync(); clearTimeout(settle); settle = setTimeout(function () { target = Math.round(rail.scrollLeft / step()); }, 180); }, { passive: true });
      window.addEventListener('resize', sync); sync();
      rail.addEventListener('keydown', function (e) { if (e.target === rail && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); go(e.key === 'ArrowRight' ? 1 : -1); } });
      rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
      rail.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse' && e.button === 0) drag = { x: e.clientX, left: rail.scrollLeft, moved: false }; });
      window.addEventListener('pointermove', function (e) {
        if (!drag) return; var dx = e.clientX - drag.x;
        if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; rail.classList.add('drag'); }
        if (drag.moved) rail.scrollLeft = drag.left - dx;
      });
      window.addEventListener('pointerup', function () {
        if (!drag) return; var moved = drag.moved; drag = null; if (!moved) return;
        var block = function (ev) { ev.preventDefault(); ev.stopPropagation(); };
        rail.addEventListener('click', block, true);
        rail.scrollTo({ left: Math.round(rail.scrollLeft / step()) * step(), behavior: DD.reduced ? 'auto' : 'smooth' });
        setTimeout(function () { rail.removeEventListener('click', block, true); }, 0);
        setTimeout(function () { rail.classList.remove('drag'); }, DD.reduced ? 0 : 450);
      });
    })();
  };
})();
