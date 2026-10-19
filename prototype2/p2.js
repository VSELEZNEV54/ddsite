/* Darlein Defense · Prototype 2: альтернативная главная в скругленных плитках.
   Тексты, проекты, направления и значки берутся из ../js/base.js, как на основной главной. */
(function () {
  'use strict';
  var $ = function (q) { return document.querySelector(q); };
  var $$ = function (q, r) { return [].slice.call((r || document).querySelectorAll(q)); };
  /* страница лежит в папке prototype2/, поэтому адреса сайта — на уровень выше */
  var U = function (h) { return /^(mailto:|#|https?:)/.test(h) ? h : '../' + DD.url(h); };
  var IMG = function (k) { return '../img/' + k + '.jpg'; };
  var href = function (name) { return U(name.toLowerCase() + '.html'); };
  var pad = function (n) { return ('0' + n).slice(-2); };
  var count = function (n) { return n + (n === 1 ? ' продукт' : ' продукта'); };
  var arrow = function (n) { return '<span class="btn__c">' + DD.ic(n || 'right', 'ic--s') + '</span>'; };
  var P = DD.projects, D = DD.dirs, X = DD.I;

  X.close = '<path d="M6 6l12 12M18 6L6 18"/>';
  X.up = '<path d="M12 20V4M6 10l6-6 6 6"/>';
  X.invest = '<path d="M4 19h16"/><path d="M6 15l4-4 3 3 5-6"/><path d="M14 8h4v4"/>';
  X.partner = '<rect x="9" y="3" width="6" height="6" rx="1.2"/><rect x="3" y="15" width="6" height="6" rx="1.2"/><rect x="15" y="15" width="6" height="6" rx="1.2"/><path d="M12 9v3M6 15v-3h12v3"/>';
  X.career = '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M18 8v6M15 11h6"/>';
  DD.icons();

  /* ---------- шапка и ссылки ---------- */
  $('#nav').innerHTML = DD.nav.map(function (n) { return '<a href="' + U(n[1]) + '">' + n[0] + '</a>'; }).join('');
  ['#hdDf', '#heroDf'].forEach(function (s) { $(s).href = href('DROPFIELD'); });
  ['#heroAll', '#prAll', '#abNum'].forEach(function (s) { $(s).href = U('projects.html'); });
  $('#newsAll').href = U('intel.html');

  /* ---------- мобильное меню: диалог ---------- */
  var mm = $('#mm'), opener = $('#mmOpen');
  mm.innerHTML = '<div class="mm__t"><img src="../assets/logo/logo3b.svg" alt="Darlein Defense"><button class="rb" type="button" id="mmX" aria-label="Закрыть меню">' + DD.ic('close') + '</button></div>' +
    '<nav class="mm__n" aria-label="Меню">' + DD.nav.map(function (n) { return '<a href="' + U(n[1]) + '"><span>' + n[0] + '</span><span class="rb rb--s">' + DD.ic('ne', 'ic--s') + '</span></a>'; }).join('') + '</nav>' +
    '<a class="btn mm__df" href="' + href('DROPFIELD') + '"><span class="st st--soon"><i></i>DROPFIELD</span>' + arrow('ne') + '</a>' +
    '<div class="mm__s"><span class="lbl">Язык</span><div class="seg" id="mmLang"><button type="button" class="on" aria-pressed="true">RU</button><button type="button" aria-pressed="false">EN</button></div></div>' +
    '<div class="mm__u">' + [[['investors.html', 'Инвесторам'], ['intel.html#media', 'Для СМИ']], [['legal.html', 'Политика обработки ПДн'], ['legal.html#terms', 'Пользовательское соглашение']], [['mailto:info@darlein.ru', 'info@darlein.ru'], ['#', 'Telegram']]].map(function (g) {
      return '<div class="mm__g">' + g.map(function (x) { return '<a href="' + U(x[0]) + '">' + x[1] + '</a>'; }).join('') + '</div>';
    }).join('') + '</div>';
  var menuOn = false;
  var setMenu = function (v) {
    if (v === menuOn) return; menuOn = v;
    if (v) { mm.hidden = false; void mm.offsetWidth; mm.classList.add('on'); }
    else { mm.classList.remove('on'); setTimeout(function () { if (!menuOn) mm.hidden = true; }, 450); }
    opener.setAttribute('aria-expanded', v ? 'true' : 'false');
    document.body.classList.toggle('mm-on', v);
    [].forEach.call(document.body.children, function (el) { if (el !== mm && el.tagName !== 'SCRIPT') el.inert = v; });
    (v ? $('#mmX') : opener).focus();
  };
  opener.addEventListener('click', function () { setMenu(true); });
  $('#mmX').addEventListener('click', function () { setMenu(false); });
  mm.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  mm.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1100) setMenu(false); });
  $$('#mmLang button').forEach(function (b) { b.addEventListener('click', function () {
    $$('#mmLang button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
  }); });

  /* ---------- первый экран: смена кадров проектов ---------- */
  var REEL = ['pr-dropfield', 'dr-soft', 'st-q-3', 'st-hangar', 'dr-uas', 'dr-gear', 'b-tower', 'dr-def', 'b-nomad-top', 'b-seal', 'pr-highfast-2', 'b-nomad', 'pr-arrowhead', 'st-prob-2'];
  var reel = $('#reel'), dots = $('#reelDots'), hero = $('.hero__main'), shots, cur = -1, timer = null, seen = true, ready = false;
  reel.innerHTML = REEL.map(function (k, i) { return '<img alt="" ' + (i < 2 ? 'src' : 'data-src') + '="' + IMG(k) + '">'; }).join('');
  dots.innerHTML = REEL.map(function () { return '<i></i>'; }).join('');
  shots = [].slice.call(reel.children);
  var load = function (i) { var im = shots[i % shots.length]; if (im.getAttribute('data-src')) { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); } };
  var show = function (i) {
    var prev = shots[cur]; if (prev) { prev.classList.remove('on'); prev.classList.add('was'); setTimeout(function () { prev.classList.remove('was'); }, 1400); }
    cur = i; shots[i].classList.add('on'); load(i + 1);
    [].forEach.call(dots.children, function (d, j) { d.classList.toggle('on', j === i); });
  };
  var play = function () {
    if (!ready) return;
    if (cur < 0) show(0);
    if (seen && !DD.reduced && !timer) timer = setInterval(function () { if (!document.hidden) show((cur + 1) % shots.length); }, 4500);
    if (!seen) { clearInterval(timer); timer = null; }
  };
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { seen = en[0].isIntersecting; play(); }).observe(hero);

  /* кольцо портфеля: дуга на направление, длина по числу продуктов */
  var perDir = D.map(function (d, i) { return P.filter(function (p) { return p[3] === i; }).length; });
  (function () {
    var GAP = 5, unit = (100 - GAP * D.length) / P.length, off = GAP / 2, s = '<circle class="tr" cx="100" cy="100" r="80"/><g transform="rotate(-90 100 100)">';
    D.forEach(function (d, i) {
      var len = unit * perDir[i];
      s += '<circle class="dn s-' + d.st + '" style="--i:' + i + '" cx="100" cy="100" r="80" pathLength="100" stroke-dasharray="' + len.toFixed(2) + ' ' + (100 - len).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '"><title>' + d.n + ' · ' + d.title + ': ' + count(perDir[i]) + '</title></circle>';
      off += len + GAP;
    });
    $('#donut svg').innerHTML = s + '</g>';
  })();

  /* ---------- кто мы ---------- */
  $('#whoT').textContent = DD.copy.who; $('#mis').textContent = DD.copy.mission; $('#goal').textContent = DD.copy.goal;

  /* ---------- экосистема: семь узлов на орбите вокруг материнского бренда ---------- */
  (function () {
    var st = $('#orbitSt'), orbit = $('#orbit'), R = 214, n = D.length, lines = '', nodes = [], now = -1, touched = false, auto = null, inView = false;
    var ddImg = $('#ddImg'), body = $('#dd .dd__b');
    var imgs = D.map(function (d) { var im = document.createElement('img'); im.alt = ''; im.loading = 'lazy'; im.src = IMG(d.img || 'dir-' + d.key); ddImg.appendChild(im); return im; });
    D.forEach(function (d, i) {
      var a = i / n * 2 * Math.PI - Math.PI / 2, c = Math.cos(a), s = Math.sin(a), x = 300 + R * c, y = 300 + R * s;
      lines += '<line class="sp" x1="' + (300 + 116 * c).toFixed(1) + '" y1="' + (300 + 116 * s).toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>';
      var b = document.createElement('button'); b.type = 'button'; b.className = 'nd';
      b.style.left = (x / 6).toFixed(3) + '%'; b.style.top = (y / 6).toFixed(3) + '%';
      b.setAttribute('aria-label', d.n + ' · ' + d.title + ', ' + d.stl); b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="nd__c">' + DD.ic(d.ic) + '<span class="st st--' + d.st + ' nd__s"><i></i></span></span><span class="nd__l" aria-hidden="true">' + d.n + ' · ' + d.short + '</span>';
      st.appendChild(b); nodes.push(b);
    });
    $('#orbitLinks').innerHTML = lines;
    var spokes = $$('#orbitLinks line');
    var pick = function (i, anim) {
      if (i === now) return; now = i; var d = D[i];
      nodes.forEach(function (b, j) { b.classList.toggle('on', j === i); b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      spokes.forEach(function (l, j) { l.classList.toggle('on', j === i); });
      imgs.forEach(function (im, j) { im.classList.toggle('on', j === i); });
      $('#ddN').textContent = d.n + ' / ' + pad(n);
      $('#ddIc').innerHTML = DD.ic(d.ic); $('#ddSt').innerHTML = DD.st(d.st, d.stl);
      $('#ddT').textContent = d.title; $('#ddD').textContent = DD.dirDesc[i];
      $('#ddP').innerHTML = P.filter(function (p) { return p[3] === i; }).map(function (p) {
        return '<a class="pl" href="' + href(p[0]) + '" title="' + p[0] + ' — ' + p[2] + '"><span class="st st--' + p[1] + '"><i></i><span class="latin">' + p[0] + '</span></span>' + DD.ic('ne', 'ic--s') + '</a>';
      }).join('');
      $('#ddGo').href = U('projects.html#dir-' + d.key);
      if (anim) { body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap'); }
    };
    var stop = function () { touched = true; clearInterval(auto); auto = null; };
    nodes.forEach(function (b, i) {
      b.addEventListener('click', function () { stop(); pick(i, true); });
      b.addEventListener('focus', function () { stop(); pick(i, true); });
      if (DD.fine) b.addEventListener('mouseenter', function () { stop(); pick(i, true); });
    });
    $('#dd').addEventListener('pointerenter', stop);
    pick(0, false);
    /* пока схема на экране и ее не трогали, направления сменяются сами; кольцо вращается только на экране */
    var run = function () {
      if (inView && !touched && !DD.reduced && !auto) auto = setInterval(function () { pick((now + 1) % n, true); }, 4200);
      if (!inView) { clearInterval(auto); auto = null; }
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { inView = en[0].isIntersecting; orbit.classList.toggle('live', inView); run(); }, { threshold: .35 }).observe(orbit);
  })();

  /* ---------- проблемы и решения ---------- */
  $('#probs').innerHTML = DD.problems.map(function (p, i) {
    return '<div class="prob" data-rv style="--d:' + i * 60 + 'ms">' +
      '<div class="tl tl--ph prob__ph"><img src="' + IMG(p.img) + '" alt="" loading="lazy"><span class="orb orb--n">' + p.n + '</span><h3 class="h3">' + p.title + '</h3></div>' +
      '<div class="tl prob__p"><span class="pl" style="align-self:flex-start">' + DD.ic('problem') + 'Проблема</span><p>' + p.p + '</p></div>' +
      '<span class="prob__ar" aria-hidden="true">' + DD.ic('right', 'ic--s') + '</span>' +
      '<div class="tl tl--lt prob__s"><span class="pl" style="align-self:flex-start">' + DD.ic('solution') + 'Решение</span><p>' + p.s + '</p></div></div>';
  }).join('');

  /* ---------- направления: лента ---------- */
  (function () {
    var rail = $('#rail'), nav = $('.rnav');
    rail.innerHTML = D.map(function (d, i) {
      var mine = P.filter(function (p) { return p[3] === i; });
      return '<article class="tl tl--ph rc"><img src="' + IMG(d.img || 'dir-' + d.key) + '" alt="" loading="lazy">' +
        '<div class="rc__t"><span class="orb orb--n">' + d.n + '</span><span class="pl pl--glass">' + count(mine.length) + '</span></div>' +
        '<div class="rc__b"><span class="orb orb--glass">' + DD.ic(d.ic) + '</span><h3 class="h3">' + d.title + '</h3><p>' + DD.dirDesc[i] + '</p><div class="chips">' + mine.map(function (p) {
          return '<a class="pl pl--glass" href="' + href(p[0]) + '" title="' + p[0] + ' — ' + p[2] + '"><span class="st st--' + p[1] + '"><i></i><span class="latin">' + p[0] + '</span></span>' + DD.ic('ne', 'ic--s') + '</a>';
        }).join('') + '</div></div></article>';
    }).join('') +
      '<a class="tl tl--lt rc rc--all" href="' + U('projects.html') + '"><div class="tl__top"><span class="pl">Все направления</span><span class="rb rb--s rb--dk">' + DD.ic('right', 'ic--s') + '</span></div>' +
      '<div><b>14</b><p class="lead">продуктов<br>в семи направлениях</p></div><span class="btn btn--dk">Все проекты' + arrow() + '</span></a>';
    var cards = $$('.rc', rail), now = $('#dirNow'), btns = $$('[data-step]', nav), drag = null;
    var step = function () { return cards[1].offsetLeft - cards[0].offsetLeft; };
    var go = function (k) {
      var i = Math.round(rail.scrollLeft / step()) + k;
      rail.scrollTo({ left: Math.max(0, i) * step(), behavior: DD.reduced ? 'auto' : 'smooth' });
    };
    var sync = function () {
      var end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      var i = end ? D.length - 1 : Math.min(D.length - 1, Math.max(0, Math.round(rail.scrollLeft / step())));
      now.textContent = pad(i + 1);
      btns.forEach(function (b) { b.disabled = b.getAttribute('data-step') === '-1' ? rail.scrollLeft < 4 : end; });
    };
    btns.forEach(function (b) { b.addEventListener('click', function () { go(parseInt(b.getAttribute('data-step'), 10)); }); });
    rail.addEventListener('scroll', sync, { passive: true }); window.addEventListener('resize', sync); sync();
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
      rail.scrollTo({ left: Math.round(rail.scrollLeft / step()) * step(), behavior: DD.reduced ? 'auto' : 'smooth' });
      setTimeout(function () { rail.classList.remove('drag'); }, DD.reduced ? 0 : 450);
    });
  })();

  /* ---------- наши проекты: мозаика из 14 плиток ---------- */
  var SIZE = { 0: 'xl', 1: 'w', 4: 'w', 8: 'w' };
  $('#pg').innerHTML = P.map(function (p, i) {
    var sz = SIZE[i], d = D[p[3]];
    return '<a class="tl tl--ph pt' + (sz ? ' pt--' + sz : '') + '" href="' + href(p[0]) + '" data-rv style="--d:' + (i % 4) * 60 + 'ms"><img src="' + IMG(p[6]) + '" alt="" loading="lazy">' +
      '<div class="pt__top"><span class="pl pl--glass">' + DD.st(p[1], p[2]) + '</span><span class="pt__i">' + pad(i + 1) + '</span></div>' +
      '<div class="pt__b"><div>' + (sz === 'xl' ? '<span class="pl pl--glass pt__d">' + d.n + ' · ' + d.title + '</span>' : '') + '<b class="latin">' + p[0] + '</b><p>' + (sz === 'xl' ? p[4] : p[5]) + '</p></div>' +
      (sz === 'xl' ? '<span class="btn">Открыть проект' + arrow() + '</span>' : '<span class="rb rb--s rb--glass">' + DD.ic('ne', 'ic--s') + '</span>') + '</div></a>';
  }).join('');

  /* роадмап: [тип, вид, колонка, ширина, текст, метка, ссылка] — те же данные, что на основной главной */
  var RM = {
    '2026': [['b', '', 2, 2, 'Бренд и корпоративный сайт', '2 кв.', 'company.html'], ['b', 'a', 3, 2, 'DROPFIELD · подготовка площадки', 'готовится', 'dropfield.html'], ['b', '', 4, 1, 'AGATA · архитектура платформы', 'Q4', 'agata.html'], ['m', 'a', 4, 1, 'Запуск DROPFIELD · Q4']],
    '2027': [['b', 'a', 1, 2, 'AGATA · карта, связь и задачи', 'Q1–Q2', 'agata.html#modules'], ['b', 'w', 3, 1, 'DROPFIELD · кабинет организации', 'Q3', 'dropfield.html#who'], ['b', '', 3, 2, 'AGATA · снабжение и подключение техники', 'Q3–Q4', 'agata.html#modules'], ['m', '', 2, 1, 'Пилот AGATA у заказчика']],
    '2028': [['b', '', 1, 3, 'Автономный комплекс · прототип', 'исследование', 'projects.html#directions'], ['b', '', 2, 3, 'Наземная платформа · концепция', 'исследование', 'projects.html#directions'], ['b', 'g', 3, 2, 'Проект партнера · резерв'], ['m', '', 4, 1, 'Испытания у партнера']],
    '2029': [['b', '', 1, 4, 'Производство и сервис · инфраструктурный контур', 'исследование', 'projects.html#directions'], ['b', 'g', 2, 2, 'Продукт N · по макету страницы продукта']]
  };
  var years = Object.keys(RM), rm = $('#rm');
  rm.innerHTML = '<div class="rm__h"><div><h3 class="h3">Роадмап</h3><p>План разработок по годам и кварталам · даты примерные</p></div>' +
    '<div class="seg" id="rmY">' + years.map(function (y, i) { return '<button type="button" class="' + (i ? '' : 'on') + '" aria-pressed="' + (i ? 'false' : 'true') + '" data-year="' + y + '">' + y + '</button>'; }).join('') + '</div></div>' +
    '<div class="rm__sc">' + years.map(function (y, i) {
      return '<div class="rm__b' + (i ? '' : ' on') + '" data-year="' + y + '"><div class="rm__q">Q1</div><div class="rm__q">Q2</div><div class="rm__q">Q3</div><div class="rm__q">Q4</div>' + RM[y].map(function (r, k) {
        var pos = ' style="grid-column:' + r[2] + '/span ' + r[3] + ';grid-row:' + (k + 2) + '"';
        if (r[0] === 'm') return '<div class="rms' + (r[1] ? ' rms--a' : '') + '"' + pos + '><i></i>' + r[4] + '</div>';
        var tag = r[6] ? 'a' : 'div';
        return '<' + tag + ' class="rbar' + (r[1] ? ' rbar--' + r[1] : '') + '"' + pos + (r[6] ? ' href="' + U(r[6]) + '"' : '') + '><span>' + r[4] + '</span>' + (r[5] ? '<span class="rbar__t">' + r[5] + '</span>' : '') + '</' + tag + '>';
      }).join('') + '</div>';
    }).join('') + '</div>' +
    '<div class="rm__lg"><span class="rbar rbar--a">текущий фокус</span><span class="rbar rbar--w">запуск</span><span class="rbar">в работе</span><span class="rbar rbar--g">резерв</span><span class="rms"><i></i>веха</span></div>';
  $$('#rmY button').forEach(function (b) { b.addEventListener('click', function () {
    var y = b.getAttribute('data-year');
    $$('#rmY button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    $$('.rm__b', rm).forEach(function (bd) { bd.classList.toggle('on', bd.getAttribute('data-year') === y); });
  }); });
  var views = { grid: $('#pg'), rm: rm };
  $$('#seg button').forEach(function (b) { b.addEventListener('click', function () {
    var v = b.getAttribute('data-view');
    $$('#seg button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
  }); });

  /* ---------- создаем вместе ---------- */
  var J = [
    ['investors.html', 'invest', 'Инвесторам', 'Фонды, стратегические и частные инвесторы', 'Инвестиции в компанию', 'Обсудим участие в Darlein Defense и направления роста компании.', 'Куда идут средства', ['Разработка продуктов', 'Прототипы и испытания', 'Подготовка производства'], 'Обсудить инвестиции'],
    ['partners.html', 'partner', 'Партнерам', 'Инженерные команды, владельцы технологий, производители', 'Развивайте технологии с нами', 'Включаем сильные разработки в наши продукты и приглашаем производственных партнеров.', 'Форматы участия', ['Присоединение команды', 'Покупка технологий и прав', 'Включение разработок в продукты', 'Производство компонентов и изделий'], 'Обсудить партнерство'],
    ['careers.html', 'career', 'Специалистам', 'Разработчики, инженеры, профильные специалисты', 'Присоединяйтесь к команде', 'Работайте над конкретным продуктом вместе с командами других направлений компании.', 'Кого приглашаем', ['Разработчиков', 'Инженеров', 'Профильных специалистов'], 'Принять участие в разработке']
  ];
  $('#join').innerHTML = J.map(function (j, i) {
    var lt = i !== 1;
    return '<a class="tl jc' + (lt ? ' tl--lt' : '') + '" href="' + U(j[0]) + '" data-rv style="--d:' + i * 90 + 'ms">' +
      '<div class="tl__top"><span class="orb orb--l">' + DD.ic(j[1]) + '</span><span class="pl">Сценарий 0' + (i + 1) + ' / 03</span></div>' +
      '<div class="jc__b"><span class="jc__who">' + j[2] + '</span><span class="jc__whom">' + j[3] + '</span><h3>' + j[4] + '</h3><p>' + j[5] + '</p>' +
      '<div class="jc__l"><span class="lbl">' + j[6] + '</span><div class="chips">' + j[7].map(function (x) { return '<span class="pl">' + x + '</span>'; }).join('') + '</div></div></div>' +
      '<span class="btn ' + (lt ? 'btn--dk' : '') + '">' + j[8] + arrow() + '</span></a>';
  }).join('');

  /* ---------- DefenseTech компания ---------- */
  var Q = [
    ['Один вход к отобранным продуктам', 'Рынок фрагментирован', 'Сильные производители, команды и технологии существуют отдельно. Darlein Defense дает заказчику один понятный вход к отобранным продуктам и сервисам.', 'Подробнее', 'company.html#problem', 'st-q-1'],
    ['Единый стандарт для всех', 'Единый стандарт', 'Качество, промышленный и цифровой дизайн, совместимость — одни требования для собственных разработок и для проектов партнеров.', 'Модель экосистемы', 'company.html#model', 'st-q-2'],
    ['Спокойно и фактами', 'Инженерная компания', 'Без милитари-пафоса. У каждого проекта честный статус: запущен, готовится или исследуется. Закрытые характеристики — по запросу.', 'Принципы работы', 'company.html#principles', 'st-q-3']
  ];
  $('#q').innerHTML = Q.map(function (x, i) {
    var kind = i === 0 ? 'tl--ph qt--big' : (i === 1 ? 'tl--lt qt--s' : 'tl--ph qt--s');
    return '<a class="tl qt ' + kind + '" href="' + U(x[4]) + '" data-rv style="--d:' + i * 80 + 'ms">' + (i !== 1 ? '<img src="' + IMG(x[5]) + '" alt="" loading="lazy">' : '') +
      '<div class="tl__top"><span class="' + (i === 1 ? 'orb' : 'orb orb--n') + '">' + pad(i + 1) + '</span>' + (i === 1 ? '<span class="orb qt__orb"><img src="' + IMG(x[5]) + '" alt="" loading="lazy"></span>' : '<span class="pl pl--glass">' + x[1] + '</span>') + '</div>' +
      '<div class="qt__t">' + (i === 1 ? '<span class="pl">' + x[1] + '</span>' : '') + '<h3 class="h3">' + x[0] + '</h3><p>' + x[2] + '</p><span class="btn btn--s ' + (i === 1 ? 'btn--dk' : '') + '">' + x[3] + arrow() + '</span></div></a>';
  }).join('');

  /* ---------- новости ---------- */
  $('#news').innerHTML = [['02.09.2026', 'Новости компании', 'Поданы заявки на регистрацию товарных знаков Darlein, Darlein Defense и Darlein Arsenal'], ['28.08.2026', 'Проекты', 'DROPFIELD: как устроен каталог и что входит в единую карточку товара'], ['19.08.2026', 'Инженерные заметки', 'Как AGATA работает без связи: локальные данные и синхронизация']].map(function (n, i) {
    return '<a class="tl nc" href="' + U('intel-article.html') + '" data-rv style="--d:' + i * 80 + 'ms"><div class="nc__top"><span class="pl">' + n[0] + '</span><span class="nc__c">' + n[1] + '</span></div>' +
      '<div class="nc__b"><b>' + n[2] + '</b><span class="rb">' + DD.ic('ne', 'ic--s') + '</span></div></a>';
  }).join('');

  /* ---------- подвал ---------- */
  var col = function (h, items) { return '<div><h3>' + h + '</h3><ul>' + items.map(function (x) { return '<li><a href="' + U(x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div>'; };
  $('#ft').innerHTML = '<div class="tl ft__p"><div class="ft__t"><div class="ft__br"><img src="../assets/logo/logo3b.svg" alt="Darlein Defense"><p>Российская DefenseTech-компания. Единая экосистема технологий и сервисов для оборонного и околовоенного рынка.</p></div>' +
    col('Компания', [['О компании', 'company.html'], ['Инвесторам', 'investors.html'], ['Карьера', 'careers.html'], ['Новости', 'intel.html'], ['Для СМИ', 'intel.html#media']]) +
    col('Проекты', [['Все проекты', 'projects.html'], ['DROPFIELD', 'dropfield.html'], ['AGATA', 'agata.html'], ['ELZA', 'elza.html'], ['BLACKFLY', 'blackfly.html'], ['WARDEN', 'warden.html'], ['Еще 9 проектов', 'projects.html#directions']]) +
    col('Связь', [['Контакты', 'contacts.html'], ['Партнерам и вендорам', 'partners.html'], ['info@darlein.ru', 'mailto:info@darlein.ru'], ['Telegram', '#']]) +
    '<div><h3>Реквизиты</h3><p class="ft__lg">ООО «ДАРЛЕЙН ДЕФЕНС»<br>ИНН ХХХХХХХХХХ · ОГРН ХХХХХХХХХХХХХ<br>г. Москва, ул. ХХХХХХХ, д. ХХ</p><ul>' +
    [['Политика обработки ПДн', 'legal.html#policy'], ['Согласие на обработку', 'legal.html#consent'], ['Пользовательское соглашение', 'legal.html#terms']].map(function (x) { return '<li><a href="' + U(x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div></div>' +
    '<div class="ft__e"><div><span>© ' + new Date().getFullYear() + ' Darlein Defense</span><span class="pl">Prototype 2</span></div><a class="btn btn--gh btn--s" href="#top">Наверх<span class="btn__c">' + DD.ic('up', 'ic--s') + '</span></a></div></div>';

  /* ---------- свет под курсором на плитках ---------- */
  if (DD.fine && !DD.reduced) document.addEventListener('pointermove', function (e) {
    var t = e.target.closest && e.target.closest('.tl'); if (!t) return;
    var r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ---------- загрузка: кольцо заполняется по реальной загрузке, затем экран сворачивается в круг ---------- */
  var ld = $('#ld'), pr = $('#ldPr'), num = $('#ldN');
  DD.load({ min: 1800, assets: ['../assets/logo/logo3b.svg', IMG(REEL[0])],
    onProgress: function (p) { pr.style.strokeDashoffset = 1 - p; num.textContent = Math.round(p * 100); },
    onDone: function () { setTimeout(function () {
      ld.classList.add('out'); document.body.classList.add('ready');
      ready = true; play(); DD.reveal(); DD.words($('#whoT'));
      setTimeout(function () { ld.remove(); }, 1300);
    }, 250); } });
})();
