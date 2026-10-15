/* Главная: блоки после «Проблем и решений». Тексты те же, что в прототипе. */
(function () {
  'use strict';
  var $ = function (q) { return document.querySelector(q); };

  /* значки, которых не было в первых блоках */
  var X = DD.I;
  X.left = '<path d="M20 12H4M10 6l-6 6 6 6"/>';
  X.invest = '<path d="M4 19h16"/><path d="M6 15l4-4 3 3 5-6"/><path d="M14 8h4v4"/>';
  X.partner = '<rect x="9" y="3" width="6" height="6" rx="1.2"/><rect x="3" y="15" width="6" height="6" rx="1.2"/><rect x="15" y="15" width="6" height="6" rx="1.2"/><path d="M12 9v3M6 15v-3h12v3"/>';
  X.career = '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M18 8v6M15 11h6"/>';

  /* ---------- данные ---------- */
  var P = [
    ['DROPFIELD', 'soon', 'готовится к запуску', 2, 'Специализированная платформа для выбора, покупки и продажи снаряжения и оборудования.', 'Выбор и покупка снаряжения', 'dir-ecom'],
    ['AGATA', 'dev', 'в разработке', 0, 'Программная платформа для координации людей, техники и ресурсов.', 'Управление, данные и координация', 'dir-soft'],
    ['ELZA', 'research', 'исследование', 0, 'Аналитическая ИИ-платформа для исследования событий, процессов и рисков.', 'Аналитика и исследование событий', 'qual-3'],
    ['EVA', 'research', 'исследование', 0, 'ИИ-помощник для работы с оборудованием и физическими объектами.', 'ИИ-помощник для работы с оборудованием', 'join-career'],
    ['BLACKFLY', 'research', 'исследование', 1, 'Модульная экосистема для создания беспилотных платформ.', 'Компоненты беспилотных платформ', 'dir-uas'],
    ['WARDEN', 'research', 'исследование', 3, 'Модульная система индивидуальной экипировки.', 'Модульная экипировка', 'dir-gear'],
    ['HEX', 'research', 'исследование', 4, 'Семейство сетевых устройств для носимой электроники, техники, беспилотных платформ и сенсоров.', 'Связь для людей, техники и сенсоров', 'dir-comms'],
    ['ECHO', 'research', 'исследование', 4, 'Семейство автономных сенсорных систем для земли, воздуха и моря.', 'Автономные сенсорные системы', 'dir-def'],
    ['NOMAD', 'research', 'исследование', 5, 'Семейство наземных роботизированных платформ со сменным оснащением.', 'Наземные роботизированные платформы', 'hero-platform'],
    ['SEAL', 'research', 'исследование', 5, 'Семейство безэкипажных морских платформ для наблюдения, связи, перевозки и специализированных задач.', 'Безэкипажные морские платформы', 'hero-boat'],
    ['HIGHFAST', 'research', 'исследование', 5, 'Семейство компактных аппаратов вертикального взлета и посадки для перевозки людей и важных грузов.', 'Аппараты вертикального взлета', 'hero-evtol'],
    ['BACKEYE', 'research', 'исследование', 5, 'Система внешнего обзора для дистанционно управляемой техники.', 'Внешний обзор для техники', 'dir-tech'],
    ['SHIELD', 'research', 'исследование', 6, 'Семейство боевых и защитных систем для техники, роботизированных платформ и стационарных объектов.', 'Модульные системы защиты', 'hull'],
    ['ARROWHEAD', 'research', 'исследование', 6, 'Семейство контейнеризированных беспилотных перехватчиков.', 'Семейство беспилотных перехватчиков', 'prob-2']
  ];
  var DESC = [
    'Платформы управления, аналитики и помощи в работе. Цифровая основа, к которой подключаются остальные продукты.',
    'Совместимые компоненты, комплекты и программные инструменты для создания беспилотных платформ.',
    'Специализированная площадка для выбора, покупки и продажи снаряжения и оборудования.',
    'Модульная индивидуальная экипировка: защита, одежда, экзоскелетные модули и носимая электроника.',
    'Распределенная сеть для людей и техники и автономные сенсорные системы для земли, воздуха и моря.',
    'Наземные, морские и воздушные платформы со сменным оснащением и общими системами управления.',
    'Модульные системы защиты техники и объектов и семейство беспилотных перехватчиков.'
  ];
  var href = function (name) { return DD.url(name.toLowerCase() + '.html'); };
  var count = function (n) { return n + (n === 1 ? ' продукт' : ' продукта'); };

  /* ---------- направления проектов ---------- */
  var rail = $('#rail');
  rail.innerHTML = DD.dirs.map(function (d, i) {
    var mine = P.filter(function (p) { return p[3] === i; });
    return '<article class="rc grain"><div class="rc__img"><img src="img/dir-' + d.key + '.jpg" alt="" loading="lazy"></div><div class="mc__br"></div>' +
      '<div class="rc__t"><span class="rc__n">' + d.n + '</span><span class="svc">' + DD.ic(d.ic) + '</span><span class="svc">' + count(mine.length) + '</span></div>' +
      '<div><h3>' + d.title + '</h3><p>' + DESC[i] + '</p><div class="rc__ch">' + mine.map(function (p) {
        return '<a class="bx bx--s svc" href="' + href(p[0]) + '" title="' + p[0] + ' — ' + p[2] + '"><span class="bx__f"></span><span class="st st--' + p[1] + '"><i></i>' + p[0] + '</span>' + DD.ic('ne', 'ic--s') + '</a>';
      }).join('') + '</div></div></article>';
  }).join('') +
    '<a class="rc rc--all" href="' + DD.url('projects.html') + '"><div class="mc__br"></div><span class="svc" style="color:var(--on-dark-2)">Все направления</span><span><b>14</b><span class="t-lead" style="display:block">продуктов<br>в семи направлениях</span></span>' +
    '<span class="bx bx--on"><span class="bx__f"></span>Все проекты' + DD.ic('right', 'ic--s ic--mv') + '</span></a>';
  (function () {
    var cards = rail.querySelectorAll('.rc:not(.rc--all)'), now = $('#dirNow'), btns = document.querySelectorAll('.rnav .bx'), target = 0, settle = null, drag = null;
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

  /* ---------- наши проекты ---------- */
  var list = $('#pbl'), pbp = $('#pbp'), box = $('#pbpImg'), layers = {}, cur = -1;
  list.innerHTML = P.map(function (p, i) {
    return '<a class="prow" href="' + href(p[0]) + '"><span class="svc">' + ('0' + (i + 1)).slice(-2) + '</span><b class="latin">' + p[0] + '</b><span class="prow__c">' + p[5] + '</span><span class="svc">' + DD.st(p[1], p[2]) + '</span><span class="prow__go">' + DD.ic('ne', 'ic--s') + '</span></a>';
  }).join('');
  var rows = [].slice.call(list.children);
  var pick = function (i, anim) {
    if (i === cur) return; cur = i; var p = P[i], d = DD.dirs[p[3]];
    rows.forEach(function (r, j) { r.classList.toggle('on', j === i); });
    if (!layers[p[6]]) { var im = document.createElement('img'); im.alt = ''; im.src = 'img/' + p[6] + '.jpg'; box.appendChild(im); layers[p[6]] = im; void im.offsetWidth; }
    Object.keys(layers).forEach(function (k) { layers[k].classList.toggle('on', k === p[6]); });
    pbp.href = href(p[0]); $('#pbpSt').innerHTML = DD.st(p[1], p[2]); $('#pbpDir').textContent = d.n + ' · ' + d.title; $('#pbpName').textContent = p[0]; $('#pbpDesc').textContent = p[4];
    if (anim) { var b = $('#pbpB'); b.classList.remove('swap'); void b.offsetWidth; b.classList.add('swap'); }
  };
  rows.forEach(function (r, i) { r.addEventListener('mouseenter', function () { pick(i, true); }); r.addEventListener('focus', function () { pick(i, true); }); });
  pick(0, false);

  /* роадмап: [тип, вид, колонка, ширина, текст, метка, ссылка] */
  var RM = {
    '2026': [['b', '', 2, 2, 'Бренд и корпоративный сайт', '2 кв.', 'company.html'], ['b', 'a', 3, 2, 'DROPFIELD · подготовка площадки', 'готовится', 'dropfield.html'], ['b', '', 4, 1, 'AGATA · архитектура платформы', 'Q4', 'agata.html'], ['m', 'a', 4, 1, 'Запуск DROPFIELD · Q4']],
    '2027': [['b', 'a', 1, 2, 'AGATA · карта, связь и задачи', 'Q1–Q2', 'agata.html#modules'], ['b', 'w', 3, 1, 'DROPFIELD · кабинет организации', 'Q3', 'dropfield.html#who'], ['b', '', 3, 2, 'AGATA · снабжение и подключение техники', 'Q3–Q4', 'agata.html#modules'], ['m', '', 2, 1, 'Пилот AGATA у заказчика']],
    '2028': [['b', '', 1, 3, 'Автономный комплекс · прототип', 'исследование', 'projects.html#directions'], ['b', '', 2, 3, 'Наземная платформа · концепция', 'исследование', 'projects.html#directions'], ['b', 'g', 3, 2, 'Проект партнера · резерв'], ['m', '', 4, 1, 'Испытания у партнера']],
    '2029': [['b', '', 1, 4, 'Производство и сервис · инфраструктурный контур', 'исследование', 'projects.html#directions'], ['b', 'g', 2, 2, 'Продукт N · по макету страницы продукта']]
  };
  var years = Object.keys(RM);
  $('#rm').innerHTML = '<div class="rm__h"><div><h3 class="t-card">Роадмап</h3><span class="svc">План разработок по годам и кварталам · даты примерные</span></div><span class="svc">2026–2029</span></div>' +
    '<div class="rm__y" role="tablist">' + years.map(function (y, i) { return '<button class="bx bx--s' + (i ? '' : ' bx--on') + '" type="button" data-year="' + y + '"><span class="bx__f"></span>' + y + '</button>'; }).join('') + '</div>' +
    years.map(function (y, i) {
      return '<div class="rm__b' + (i ? '' : ' on') + '" data-year="' + y + '"><div class="rm__q svc">Q1</div><div class="rm__q svc">Q2</div><div class="rm__q svc">Q3</div><div class="rm__q svc">Q4</div>' + RM[y].map(function (r, k) {
        var pos = ' style="grid-column:' + r[2] + '/span ' + r[3] + ';grid-row:' + (k + 2) + '"';
        if (r[0] === 'm') return '<div class="rms' + (r[1] ? ' rms--a' : '') + '"' + pos + '><i></i>' + r[4] + '</div>';
        var tag = r[6] ? 'a' : 'div';
        return '<' + tag + ' class="rb' + (r[1] ? ' rb--' + r[1] : '') + '"' + pos + (r[6] ? ' href="' + DD.url(r[6]) + '"' : '') + '><span>' + r[4] + '</span>' + (r[5] ? '<span class="rb__t">' + r[5] + '</span>' : '') + '</' + tag + '>';
      }).join('') + '</div>';
    }).join('') +
    '<div class="rm__lg"><span class="rb rb--a">текущий фокус</span><span class="rb rb--w">запуск</span><span class="rb">в работе</span><span class="rb rb--g">резерв</span><span class="rms"><i></i>веха</span></div>';
  var tog = $('#projToggle'), views = { tiles: $('#pb'), roadmap: $('#rm') };
  var setView = function (v) {
    tog.querySelectorAll('button').forEach(function (b) { b.classList.toggle('bx--on', b.getAttribute('data-view') === v); });
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
  };
  tog.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-view')); }); });
  if (location.hash === '#roadmap') setView('roadmap');
  $('#rm').querySelectorAll('.rm__y button').forEach(function (b) { b.addEventListener('click', function () {
    var y = b.getAttribute('data-year');
    $('#rm').querySelectorAll('.rm__y button').forEach(function (x) { x.classList.toggle('bx--on', x === b); });
    $('#rm').querySelectorAll('.rm__b').forEach(function (bd) { bd.classList.toggle('on', bd.getAttribute('data-year') === y); });
  }); });

  /* ---------- создаем вместе ---------- */
  var J = [
    ['investors.html', 'invest', 'join-invest', 'Инвесторам', 'Фонды, стратегические и частные инвесторы', 'Инвестиции в компанию', 'Обсудим участие в Darlein Defense и направления роста компании.', 'Куда идут средства', ['Разработка продуктов', 'Прототипы и испытания', 'Подготовка производства'], 'Обсудить инвестиции'],
    ['partners.html', 'partner', 'join-partner', 'Партнерам', 'Инженерные команды, владельцы технологий, производители', 'Развивайте технологии с нами', 'Включаем сильные разработки в наши продукты и приглашаем производственных партнеров.', 'Форматы участия', ['Присоединение команды', 'Покупка технологий и прав', 'Включение разработок в продукты', 'Производство компонентов и изделий'], 'Обсудить партнерство'],
    ['careers.html', 'career', 'join-career', 'Специалистам', 'Разработчики, инженеры, профильные специалисты', 'Присоединяйтесь к команде', 'Работайте над конкретным продуктом вместе с командами других направлений компании.', 'Кого приглашаем', ['Разработчиков', 'Инженеров', 'Профильных специалистов'], 'Принять участие в разработке']
  ];
  $('#join').innerHTML = J.map(function (j, i) {
    return '<a class="jc" data-rv style="--d:' + i * 90 + 'ms" href="' + DD.url(j[0]) + '"><div class="jc__top svc"><span>Сценарий 0' + (i + 1) + ' / 03</span>' + DD.ic(j[1]) + '</div>' +
      '<div class="jc__b"><div class="jc__who">' + j[3] + '</div><div class="jc__whom">' + j[4] + '</div><h3>' + j[5] + '</h3><p>' + j[6] + '</p>' +
      '<div class="jc__l"><span class="svc">' + j[7] + '</span><ul>' + j[8].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
      '<span class="bx bx--dk"><span class="bx__f"></span>' + j[9] + DD.ic('right', 'ic--s') + '</span></div></a>';
  }).join('');

  /* ---------- DefenseTech компания ---------- */
  var Q = [
    ['Один вход к отобранным продуктам', 'Рынок фрагментирован', 'Сильные производители, команды и технологии существуют отдельно. Darlein Defense дает заказчику один понятный вход к отобранным продуктам и сервисам.', 'Подробнее', 'company.html#problem', 'qual-1'],
    ['Единый стандарт для всех', 'Единый стандарт', 'Качество, промышленный и цифровой дизайн, совместимость — одни требования для собственных разработок и для проектов партнеров.', 'Модель экосистемы', 'company.html#model', 'qual-2'],
    ['Спокойно и фактами', 'Инженерная компания', 'Без милитари-пафоса. У каждого проекта честный статус: запущен, готовится или исследуется. Закрытые характеристики — по запросу.', 'Принципы работы', 'company.html#principles', 'qual-3']
  ];
  var q = $('#q');
  q.innerHTML = '<div class="q__tabs" role="tablist">' + Q.map(function (x, i) { return '<button type="button" class="' + (i ? '' : 'on') + '">' + x[0] + '</button>'; }).join('') + '</div>' +
    Q.map(function (x, i) {
      return '<div class="q__p grain' + (i ? '' : ' on') + '"><div class="q__bg"><img src="img/' + x[5] + '.jpg" alt="" loading="lazy"></div><div class="mc__br"></div>' +
        '<div class="q__num"><span class="svc">0' + (i + 1) + ' / 03</span><b>' + (i + 1) + '</b></div>' +
        '<div class="q__tx"><span class="svc">' + x[1] + '</span><p>' + x[2] + '</p><a class="ul" href="' + DD.url(x[4]) + '">' + x[3] + ' ' + DD.ic('ne', 'ic--s') + '</a></div></div>';
    }).join('');
  DD.tabs(q);

  /* ---------- новости ---------- */
  $('#news').innerHTML = [['02.09.2026 · Новости компании', 'Поданы заявки на регистрацию товарных знаков Darlein, Darlein Defense и Darlein Arsenal'], ['28.08.2026 · Проекты', 'DROPFIELD: как устроен каталог и что входит в единую карточку товара'], ['19.08.2026 · Инженерные заметки', 'Как AGATA работает без связи: локальные данные и синхронизация']].map(function (n) {
    var m = n[0].split(' · ');
    return '<a class="nr" href="' + DD.url('intel-article.html') + '"><span class="svc">' + m[0] + '</span><span class="svc">' + m[1] + '</span><b>' + n[1] + '</b><span class="bx bx--ic bx--s"><span class="bx__f"></span>' + DD.ic('ne', 'ic--s') + '</span></a>';
  }).join('');

  DD.icons();
})();
