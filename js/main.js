/* Darlein Defense · прототип v0.2 · общий скрипт
   Шапка (с выпадающими панелями), подвал, навигатор прототипа собираются здесь.
   Без бэкенда: формы ведут на «Спасибо». */
(function () {
  'use strict';
  var body = document.body;
  var page = body.getAttribute('data-page') || '';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var WORD = '<span class="brand__word">Darlein Defense</span>';
  var IC_NE = '<svg class="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg>';
  var IC_DOWN = '<svg class="ic ic--down" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 2v12M3 9l5 5 5-5"/></svg>';

  /* ---------- Меню и выпадающие панели ---------- */
  var MENUS = {
    company: { href: 'company.html', title: 'Компания', label: 'О компании', heading: 'Компания',
      desc: 'Российская DefenseTech-компания с моделью экосистемы. Единый стандарт качества, дизайна и совместимости для собственных и партнерских продуктов.',
      items: [['company.html#problem', 'Проблема и ответ'], ['company.html#model', 'Модель экосистемы'], ['company.html#directions', 'Направления'], ['company.html#principles', 'Принципы работы'], ['company.html#team', 'Экспертиза'], ['company.html#legal', 'Юридический контур'], ['investors.html', 'Инвесторам']] },
    projects: { href: 'projects.html', title: 'Проекты', label: 'Все разработки', heading: 'Проекты',
      desc: 'Два продукта на публичной стадии и исследовательский контур по пяти направлениям. У каждого проекта честный статус.',
      items: [['projects.html#products', 'Все проекты'], ['arsenal.html', 'ARSENAL · готовится к запуску'], ['agata.html', 'AGATA · в разработке'], ['projects.html#research', 'Future Systems · исследование'], ['projects.html#directions', 'Направления и стадии'], ['company.html#model', 'Модель экосистемы']] },
    arsenal: { href: 'arsenal.html', title: 'ARSENAL', latin: true, label: 'Продукт · маркетплейс', heading: 'ARSENAL',
      desc: 'Специализированный маркетплейс экипировки и технологий для профессиональных пользователей и организаций. Первый коммерческий продукт экосистемы.', status: ['soon', 'готовится к запуску'],
      items: [['arsenal.html#what', 'Что это'], ['arsenal.html#categories', 'Категории каталога'], ['arsenal.html#who', 'Для кого'], ['arsenal.html#diff', 'Чем отличается'], ['arsenal.html#notify', 'Сообщить о запуске'], ['partners.html#vendor', 'Стать вендором']] },
    agata: { href: 'agata.html', title: 'AGATA', latin: true, label: 'Продукт · платформа', heading: 'AGATA',
      desc: 'Модульная платформа управления подразделениями и операционными процессами: связь, карты, задачи и логистика в одной среде.', status: ['dev', 'в разработке'],
      items: [['agata.html#what', 'Что это'], ['agata.html#modules', 'Модули'], ['agata.html#who', 'Для кого'], ['agata.html#diff', 'Чем отличается'], ['agata.html#request', 'Запросить презентацию'], ['partners.html#partner', 'Подключить свой модуль']] },
    partners: { href: 'partners.html', title: 'Партнерам', label: 'Два маршрута', heading: 'Партнерам',
      desc: 'Технологический партнер входит в экосистему со своим продуктом. Вендор продает на площадке ARSENAL. Разные модели отношений — разные условия.',
      items: [['partners.html#partner', 'Партнер экосистемы'], ['partners.html#vendor', 'Вендор ARSENAL'], ['partners.html#compare', 'Чем отличаются маршруты'], ['partners.html#apply', 'Подать заявку']] },
    investors: { href: 'investors.html', title: 'Инвесторам', label: 'Модель, стадия, контакт', heading: 'Инвесторам',
      desc: 'Материнский бренд и экосистема продуктов. Финансовые показатели и оценка не публикуются: материалы передаются после соглашения о конфиденциальности.',
      items: [['investors.html#model', 'Модель'], ['investors.html#stage', 'Стадия проектов'], ['investors.html#market', 'Рынок'], ['investors.html#contact', 'Написать']] },
    careers: { href: 'careers.html', title: 'Карьера', label: 'Работа в компании', heading: 'Карьера',
      desc: 'Инженерная компания на стадии запуска. Пять направлений, один стандарт качества, честный статус каждого проекта.',
      items: [['careers.html#directions', 'Где нужны люди'], ['careers.html#how', 'Как работаем'], ['careers.html#vacancies', 'Вакансии'], ['careers.html#apply', 'Открытый отклик']] },
    intel: { href: 'intel.html', title: 'Новости', label: 'Новости и материалы', heading: 'Новости',
      desc: 'Новости компании, ход проектов, инженерные заметки и материалы для СМИ. Каждый материал с датой.',
      items: [['intel.html', 'Все материалы'], ['intel.html#feed', 'Новости компании'], ['intel.html#feed', 'Проекты'], ['intel.html#feed', 'Инженерные заметки'], ['intel.html#media', 'Для СМИ']] }
  };
  var ORDER = ['company', 'projects', 'arsenal', 'partners', 'investors', 'careers', 'intel'];

  function navHTML() {
    return ORDER.map(function (k) {
      var m = MENUS[k];
      var cls = (m.latin ? 'nav__latin' : '') + ((page === k || (page === 'article' && k === 'intel')) ? ' is-active' : '');
      return '<div class="nav__item"><a href="' + m.href + '" class="' + cls.trim() + '" data-menu="' + k + '">' + m.title + '</a></div>';
    }).join('');
  }
  function megaHTML() {
    return '<div class="mega" id="mega">' + ORDER.map(function (k) {
      var m = MENUS[k];
      return '<div class="mega__panel" data-menu="' + k + '">' +
        '<div class="mega__desc"><div class="svc">' + m.label + '</div><p>' + m.desc + '</p>' +
          (m.status ? '<div style="margin-top:18px"><span class="status status--' + m.status[0] + '">' + m.status[1] + '</span></div>' : '') + '</div>' +
        '<div><div class="svc">' + m.heading + '</div><div class="mega__list">' +
          m.items.map(function (it, i) { return '<a href="' + it[0] + '" style="--i:' + i + '">' + it[1] + '</a>'; }).join('') +
        '</div></div></div>';
    }).join('') + '</div><div class="mega-backdrop" id="megaBackdrop"></div>';
  }

  var headerHTML =
    '<header class="hdr" id="header"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="Darlein Defense — на главную">' + WORD + '</a>' +
      '<nav class="nav" aria-label="Основное меню">' + navHTML() + '</nav>' +
      '<div class="hdr__right">' +
        '<div class="hdr__reserved" title="Резерв: появится вместе с EN-версией и DARLEIN ID"><span class="chip-reserved">RU · EN</span><span class="chip-reserved">Войти</span></div>' +
        '<a href="contacts.html" class="' + (page === 'contacts' ? 'is-active' : '') + '">Контакты</a>' +
        '<button class="burger" aria-label="Открыть меню" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>' +
      '</div>' +
    '</div></header>' + megaHTML() +
    '<div class="mobile-menu" id="mobileMenu" aria-hidden="true">' +
      '<button class="mobile-menu__close" aria-label="Закрыть меню"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<nav class="mobile-menu__list">' + ORDER.map(function (k, i) { var m = MENUS[k]; return '<a href="' + m.href + '" style="--i:' + i + '" class="' + (page === k ? 'is-active' : '') + '">' + m.title + IC_NE + '</a>'; }).join('') +
        '<a href="contacts.html" style="--i:6" class="' + (page === 'contacts' ? 'is-active' : '') + '">Контакты' + IC_NE + '</a></nav>' +
      '<div class="mobile-menu__sub"><a href="investors.html">Инвесторам</a><a href="intel.html#media">Для СМИ</a><a href="legal.html">Политика обработки ПДн</a><a href="legal.html#terms">Пользовательское соглашение</a><a href="mailto:info@darlein.ru">info@darlein.ru</a><a href="#" rel="noopener">Telegram</a></div>' +
    '</div>';

  /* ---------- Подвал ---------- */
  var year = new Date().getFullYear();
  var footerHTML =
    '<footer class="ftr" id="footer"><div class="ftr__panel">' +
      '<div class="ftr__top">' +
        '<div class="ftr__brand"><a class="brand" href="index.html">' + WORD + '</a>' +
          '<p>Российская DefenseTech-компания. Единая экосистема технологий и сервисов для оборонного и околовоенного рынка.</p></div>' +
        '<div><h4>Компания</h4><ul><li><a href="company.html">О компании</a></li><li><a href="investors.html">Инвесторам</a></li><li><a href="careers.html">Карьера</a></li><li><a href="intel.html">Новости</a></li><li><a href="intel.html#media">Для СМИ</a></li></ul></div>' +
        '<div><h4>Проекты</h4><ul><li><a href="projects.html">Все проекты</a></li><li class="latin"><a href="arsenal.html">ARSENAL</a></li><li class="latin"><a href="agata.html">AGATA</a></li><li><a href="projects.html#research">Future Systems</a></li></ul></div>' +
        '<div><h4>Связь</h4><ul><li><a href="contacts.html">Контакты</a></li><li><a href="partners.html">Партнерам и вендорам</a></li><li><a href="mailto:info@darlein.ru">info@darlein.ru</a></li><li><a href="#" rel="noopener">Telegram</a></li></ul></div>' +
        '<div><h4>Юридически</h4><p class="ftr__legal">ООО «ДАРЛЕЙН ДЕФЕНС»<br>ИНН ХХХХХХХХХХ · ОГРН ХХХХХХХХХХХХХ<br>г. Москва, ул. ХХХХХХХ, д. ХХ</p>' +
          '<ul style="margin-top:14px"><li><a href="legal.html#policy">Политика обработки ПДн</a></li><li><a href="legal.html#consent">Согласие на обработку</a></li><li><a href="legal.html#terms">Пользовательское соглашение</a></li></ul></div>' +
      '</div>' +
      '<div class="ftr__word" aria-hidden="true">DARLEIN DEFENSE</div>' +
      '<div class="ftr__bottom">' +
        '<div class="ftr__bottom-left"><span>© ' + year + ' Darlein Defense</span><span>Товарные знаки Darlein, Darlein Defense, Darlein Arsenal — в процессе регистрации</span></div>' +
        '<div class="socials" aria-label="Соцсети и каналы">' +
          '<a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 4L3 11l6 2 2 6 3-4 5 3z"/><path d="M9 13l9-8"/></svg></a>' +
          '<a href="#" aria-label="VK"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7c.5 8 4 11 9 11h1v-4c2 0 4 2 5 4h3c-1-3-3-5-5-6 2-1 4-3 5-5h-3c-1 2-3 4-5 4V7h-3v7C7 13 5 10 5 7z"/></svg></a>' +
          '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</div></footer>' +
    '<div class="cookie" id="cookie"><span>Сайт использует cookie для веб-аналитики. Подробнее — в <a href="legal.html#policy">политике обработки данных</a>.</span><button class="btn btn--ghost btn--sm" id="cookieOk">Понятно</button></div>';

  /* ---------- Навигатор прототипа ---------- */
  var PAGES = [['Шапка', null], ['index.html', 'Главная', '01 · уникальный'], ['Уровень 1', null], ['company.html', 'Компания', '02'], ['projects.html', 'Проекты', '02а · хаб'], ['arsenal.html', 'ARSENAL', '03 · продукт · в меню'], ['partners.html', 'Партнерам', '05 · два маршрута'], ['investors.html', 'Инвесторам', '07 · в меню'], ['careers.html', 'Карьера', '06'], ['intel.html', 'Новости', '08 · лента'], ['contacts.html', 'Контакты', '10'], ['Уровень 2', null], ['agata.html', 'AGATA', '04 · продукт'], ['intel-article.html', 'Новости · материал', '09 · шаблон'], ['legal.html', 'Юридический документ', '11 · шаблон ×3'], ['Служебные', null], ['404.html', '404', '12'], ['thanks.html?from=contact', 'Спасибо', '13']];
  var here = (location.pathname.split('/').pop() || 'index.html');
  var IC_MAP = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5.5" y="1.5" width="5" height="3.5" rx="1"/><rect x="1" y="11" width="4.5" height="3.5" rx="1"/><rect x="10.5" y="11" width="4.5" height="3.5" rx="1"/><path d="M8 5v3M3.25 11V8h9.5v3"/></svg>';
  var protoHTML = '<div class="proto" id="proto"><div class="proto__panel"><div class="proto__head"><span>Карта прототипа · 14 страниц</span><span>v0.3</span></div>' +
    '<a class="proto__main' + (here === 'sitemap.html' ? ' is-active' : '') + '" href="sitemap.html"><span>Структура сайта</span><span style="display:flex;align-items:center;gap:10px"><span class="svc">схема</span>' + IC_MAP + '</span></a>' +
    PAGES.map(function (p) { if (p[1] === null) return '<div class="proto__group">' + p[0] + '</div>'; var act = p[0].split('?')[0] === here ? ' is-active' : ''; return '<a href="' + p[0] + '" class="' + act + '"><span style="color:inherit;font-size:13px">' + p[1] + '</span><span>' + p[2] + '</span></a>'; }).join('') +
    '<div class="proto__toggle"><span>Резервные элементы и пометки</span><span class="sw" id="notesSw" role="switch" aria-checked="false" tabindex="0"></span></div></div>' +
    '<button class="proto__btn" id="protoBtn">' + IC_MAP + 'Прототип</button></div>';

  /* ---------- Монтаж ---------- */
  var mount = document.getElementById('site-header');
  if (mount) mount.outerHTML = headerHTML; else body.insertAdjacentHTML('afterbegin', headerHTML);
  var fmount = document.getElementById('site-footer');
  if (fmount) fmount.outerHTML = footerHTML; else body.insertAdjacentHTML('beforeend', footerHTML);
  body.insertAdjacentHTML('beforeend', protoHTML);

  /* Выпадающие панели: открываются при наведении на пункт, закрываются при уходе */
  var header = document.getElementById('header'), mega = document.getElementById('mega'), backdrop = document.getElementById('megaBackdrop');
  var closeTimer;
  function openMega(k) {
    clearTimeout(closeTimer);
    mega.querySelectorAll('.mega__panel').forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-menu') === k); });
    mega.classList.add('is-open'); backdrop.classList.add('is-open');
  }
  function closeMega() { closeTimer = setTimeout(function () { mega.classList.remove('is-open'); backdrop.classList.remove('is-open'); }, 120); }
  header.querySelectorAll('.nav a[data-menu]').forEach(function (a) {
    a.addEventListener('mouseenter', function () { openMega(a.getAttribute('data-menu')); });
    a.addEventListener('focus', function () { openMega(a.getAttribute('data-menu')); });
  });
  header.addEventListener('mouseleave', closeMega);
  mega.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
  mega.addEventListener('mouseleave', closeMega);
  header.querySelector('.brand').addEventListener('mouseenter', closeMega);
  header.querySelector('.hdr__right').addEventListener('mouseenter', closeMega);
  backdrop.addEventListener('mouseenter', closeMega);
  window.addEventListener('scroll', function () { if (mega.classList.contains('is-open')) { clearTimeout(closeTimer); mega.classList.remove('is-open'); backdrop.classList.remove('is-open'); } }, { passive: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { clearTimeout(closeTimer); mega.classList.remove('is-open'); backdrop.classList.remove('is-open'); } });

  /* Мобильное меню */
  var mm = document.getElementById('mobileMenu'), burger = header.querySelector('.burger');
  function openMenu(o) { mm.classList.toggle('is-open', o); mm.setAttribute('aria-hidden', o ? 'false' : 'true'); burger.setAttribute('aria-expanded', o ? 'true' : 'false'); document.documentElement.style.overflow = o ? 'hidden' : ''; }
  burger.addEventListener('click', function () { openMenu(true); });
  mm.querySelector('.mobile-menu__close').addEventListener('click', function () { openMenu(false); });
  mm.addEventListener('click', function (e) { if (e.target.closest('a')) openMenu(false); });

  /* Cookie */
  try { if (!localStorage.getItem('dd_cookie')) document.getElementById('cookie').classList.add('is-on'); } catch (e) { document.getElementById('cookie').classList.add('is-on'); }
  document.getElementById('cookieOk').addEventListener('click', function () { document.getElementById('cookie').classList.remove('is-on'); try { localStorage.setItem('dd_cookie', '1'); } catch (e) {} });

  /* Навигатор прототипа и слой пометок */
  var proto = document.getElementById('proto');
  document.getElementById('protoBtn').addEventListener('click', function () { proto.classList.toggle('is-open'); });
  document.addEventListener('click', function (e) { if (!proto.contains(e.target)) proto.classList.remove('is-open'); });
  var sw = document.getElementById('notesSw');
  function setNotes(on) { body.classList.toggle('show-notes', on); sw.setAttribute('aria-checked', on ? 'true' : 'false'); try { localStorage.setItem('dd_notes', on ? '1' : ''); } catch (e) {} }
  try { if (localStorage.getItem('dd_notes') === '1') setNotes(true); } catch (e) {}
  sw.addEventListener('click', function () { setNotes(!body.classList.contains('show-notes')); });
  sw.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); sw.click(); } });

  /* Появление блоков: каскад для сеток, reveal для остального */
  document.querySelectorAll('.tiles,.cells,.steps,.intel-list,.duo,.rows,.req,.intel-cards,.scheme__dirs,.modules,.routes').forEach(function (c) {
    if (c.closest('.stagger')) return;
    c.classList.remove('reveal'); c.classList.add('stagger');
    Array.prototype.forEach.call(c.children, function (ch, i) { ch.style.setProperty('--i', Math.min(i, 8)); });
  });
  document.querySelectorAll('.sec-head,.sec-intro,.cta,.dl,.table-wrap,.qual__tabs,.bus,.frame--xl,.panel,.article__body>*,.legal__body>*,.vac,.util__links,.doc-switch').forEach(function (el) {
    if (el.classList.contains('reveal') || el.classList.contains('stagger') || el.closest('.reveal,.stagger,.phero,.hero,.article__head')) return;
    el.classList.add('reveal');
  });
  var animEls = document.querySelectorAll('.reveal,.stagger');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting || en.boundingClientRect.bottom < 0) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -4% 0px', threshold: 0 });
    animEls.forEach(function (el) { io.observe(el); });
    var sweep = function () { animEls.forEach(function (el) { if (el.classList.contains('in')) return; var r = el.getBoundingClientRect(); if (r.bottom < 0 || (r.top < innerHeight * .96 && r.bottom > 0)) el.classList.add('in'); }); };
    setTimeout(sweep, 350);
    var sweepT; window.addEventListener('scroll', function () { clearTimeout(sweepT); sweepT = setTimeout(sweep, 120); }, { passive: true });
    window.addEventListener('hashchange', function () { setTimeout(sweep, 400); });
  } else { animEls.forEach(function (el) { el.classList.add('in'); }); }

  /* Шапка получает фон при прокрутке */
  var onScrollHdr = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScrollHdr(); window.addEventListener('scroll', onScrollHdr, { passive: true });

  /* Наведение: световое пятно за курсором */
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (fine && !reduced) {
    document.querySelectorAll('.tile,.cell,.step,.intel-card,.channel,.route,.duo__item,.panel,.qual__panel,.req>div,.module,.vac').forEach(function (el) {
      el.classList.add('spot');
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    });
  }

  /* ---------- Hero: тихое поле точек и линий (заглушка видео) ---------- */
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d'), W, H, dpr, pts = [], N, t = 0;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = Math.round(Math.min(150, Math.max(60, (W * H) / 13000))); pts = [];
      for (var i = 0; i < N; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16, r: Math.random() * 1.3 + .4, p: Math.random() * Math.PI * 2 });
    }
    function frame() {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      var link = Math.min(W, H) * 0.17;
      for (var i = 0; i < N; i++) { var a = pts[i]; a.x += a.vx + Math.sin(t + a.p) * .08; a.y += a.vy + Math.cos(t * .8 + a.p) * .08; if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20; if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20; }
      ctx.lineWidth = 1;
      for (var i2 = 0; i2 < N; i2++) for (var j = i2 + 1; j < N; j++) { var dx = pts[i2].x - pts[j].x, dy = pts[i2].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < link) { ctx.strokeStyle = 'rgba(244,245,245,' + (0.09 * (1 - d / link)).toFixed(3) + ')'; ctx.beginPath(); ctx.moveTo(pts[i2].x, pts[i2].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      for (var k = 0; k < N; k++) { ctx.fillStyle = 'rgba(244,245,245,0.3)'; ctx.beginPath(); ctx.arc(pts[k].x, pts[k].y, pts[k].r, 0, Math.PI * 2); ctx.fill(); }
      if (!reduced) requestAnimationFrame(frame);
    }
    resize(); frame();
    var tile = canvas.closest('.hero__tile');
    if (tile && fine && !reduced) {
      tile.addEventListener('mousemove', function (e) { var r = tile.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; tile.style.setProperty('--px', (x * 14).toFixed(1) + 'px'); tile.style.setProperty('--py', (y * 10).toFixed(1) + 'px'); });
      tile.addEventListener('mouseleave', function () { tile.style.setProperty('--px', '0px'); tile.style.setProperty('--py', '0px'); });
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduced) frame(); }, 120); });
  }

  /* ---------- Схема экосистемы: подсказка в строке под схемой ---------- */
  document.querySelectorAll('.scheme').forEach(function (scheme) {
    var cap = scheme.querySelector('.scheme__caption');
    scheme.querySelectorAll('.scheme__node').forEach(function (node) {
      node.addEventListener('mouseenter', function () { if (cap) cap.innerHTML = '<b>' + (node.getAttribute('data-title') || '') + '</b><span>' + (node.getAttribute('data-tip') || '') + '</span>'; });
      node.addEventListener('mouseleave', function () { if (cap) cap.innerHTML = '<span>' + (cap.getAttribute('data-default') || '') + '</span>'; });
      var href = node.getAttribute('data-href');
      if (href) { node.setAttribute('tabindex', '0'); node.setAttribute('role', 'link'); node.addEventListener('click', function () { location.href = href; }); node.addEventListener('keydown', function (e) { if (e.key === 'Enter') location.href = href; }); }
    });
  });

  /* ---------- Блок качеств с табами: автопрокрутка до первого клика ---------- */
  document.querySelectorAll('.qual').forEach(function (q) {
    var tabs = q.querySelectorAll('.qual__tabs button'), panels = q.querySelectorAll('.qual__panel'), idx = 0, timer = null, manual = false, hovered = false;
    function show(i) {
      idx = i; var k = tabs[i].getAttribute('data-q');
      tabs.forEach(function (x, j) { x.classList.toggle('is-active', j === i); });
      panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-q') === k); });
      if (tabs[i].scrollIntoView) tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    }
    function tick() { if (!manual && !hovered) show((idx + 1) % tabs.length); }
    function start() { if (reduced || manual) return; q.classList.add('is-auto'); timer = setInterval(tick, 6000); }
    tabs.forEach(function (b, i) { b.addEventListener('click', function () { manual = true; q.classList.remove('is-auto'); clearInterval(timer); show(i); }); });
    q.addEventListener('mouseenter', function () { hovered = true; }); q.addEventListener('mouseleave', function () { hovered = false; });
    if ('IntersectionObserver' in window) {
      var qio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { start(); qio.disconnect(); } }, { threshold: .3 });
      qio.observe(q);
    } else start();
  });

  /* ---------- Формы ---------- */
  document.querySelectorAll('form[data-thanks]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); var from = f.getAttribute('data-thanks'); var ri = f.querySelector('[name="role"]'); if (ri && ri.value) from = ri.value; location.href = 'thanks.html?from=' + encodeURIComponent(from); });
  });

  /* ---------- Партнерам: маршруты ---------- */
  var routes = document.querySelectorAll('.route[data-route]');
  if (routes.length) {
    function setRoute(r, scroll) {
      routes.forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-route') === r); });
      document.querySelectorAll('.route-panel').forEach(function (p) { var on = p.getAttribute('data-route') === r; p.classList.toggle('is-active', on); if (on) p.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); }); });
      document.querySelectorAll('.seg button[data-role]').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-role') === r); });
      var ri = document.querySelector('[name="role"]'); if (ri) ri.value = r;
      var subj = document.getElementById('formSubject'); if (subj) subj.textContent = r === 'vendor' ? 'Заявка вендора ARSENAL' : 'Заявка партнера экосистемы';
      if (scroll) { var target = document.getElementById('route-detail'); if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
    }
    routes.forEach(function (x) { x.addEventListener('click', function (e) { e.preventDefault(); setRoute(x.getAttribute('data-route'), true); }); });
    document.querySelectorAll('.seg button[data-role]').forEach(function (b) { b.addEventListener('click', function () { setRoute(b.getAttribute('data-role'), false); }); });
    var h = location.hash.replace('#', ''); setRoute(h === 'vendor' || h === 'partner' ? h : 'partner', false);
    window.addEventListener('hashchange', function () { var hh = location.hash.replace('#', ''); if (hh === 'vendor' || hh === 'partner') setRoute(hh, true); });
  }

  /* ---------- Intel: фильтр ---------- */
  var tabs = document.querySelectorAll('.tabs button[data-filter]');
  if (tabs.length) tabs.forEach(function (b) { b.addEventListener('click', function () { tabs.forEach(function (x) { x.classList.remove('is-active'); }); b.classList.add('is-active'); var f = b.getAttribute('data-filter'); document.querySelectorAll('.intel-item[data-rubric]').forEach(function (it) { it.classList.toggle('is-hidden', f !== 'all' && it.getAttribute('data-rubric') !== f); }); }); });

  /* ---------- Юридический документ ---------- */
  var docs = document.querySelectorAll('.legal-doc[data-doc]');
  if (docs.length) {
    var docBtns = document.querySelectorAll('.doc-switch button[data-doc]');
    function setDoc(d) {
      docs.forEach(function (x) { x.hidden = x.getAttribute('data-doc') !== d; });
      docBtns.forEach(function (b) { b.classList.toggle('btn--primary', b.getAttribute('data-doc') === d); b.classList.toggle('btn--ghost', b.getAttribute('data-doc') !== d); });
      var cur = document.querySelector('.legal-doc[data-doc="' + d + '"]'), title = document.getElementById('legalTitle'), date = document.getElementById('legalDate'), toc = document.getElementById('toc');
      if (cur && title) title.textContent = cur.getAttribute('data-title');
      if (cur && date) date.textContent = cur.getAttribute('data-date');
      if (cur && toc) { toc.innerHTML = ''; cur.querySelectorAll('h2[id]').forEach(function (h2) { var a = document.createElement('a'); a.href = '#' + h2.id; a.textContent = h2.textContent; toc.appendChild(a); }); }
      if (history.replaceState) history.replaceState(null, '', '#' + d);
    }
    docBtns.forEach(function (b) { b.addEventListener('click', function () { setDoc(b.getAttribute('data-doc')); window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); }); });
    var dh = location.hash.replace('#', ''); setDoc(dh === 'consent' || dh === 'terms' ? dh : 'policy');
  }

  /* ---------- Спасибо ---------- */
  var thanks = document.querySelectorAll('[data-from]');
  if (thanks.length) { var q = new URLSearchParams(location.search).get('from') || 'contact', found = false; thanks.forEach(function (el) { var ok = el.getAttribute('data-from') === q; el.hidden = !ok; if (ok) found = true; }); if (!found) thanks.forEach(function (el) { el.hidden = el.getAttribute('data-from') !== 'contact'; }); }

  /* Иконки: пустые span.ic-ne / span.ic-down заменяются на SVG */
  document.querySelectorAll('span.ic-ne').forEach(function (s) { s.outerHTML = IC_NE; });
  document.querySelectorAll('span.ic-down').forEach(function (s) { s.outerHTML = IC_DOWN; });
})();
