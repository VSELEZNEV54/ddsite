/* Общая часть всех страниц: шапка, выпадающее и мобильное меню, язык, cookie, подвал, вкладки. Данные те же, что в прототипе. */
(function () {
  'use strict';
  var $ = function (q) { return document.querySelector(q); }, R = '';
  /* язык страницы: английская версия лежит в папке en/ и собирается из русской (DD/design-tools/build_en.py) */
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'ru';
  DD.I.chev = '<path d="M5 9l7 7 7-7"/>';
  DD.I.tg = '<path d="M21 4L3 11l6 2 2 6 3-4 5 3z"/><path d="M9 13l9-8"/>';
  DD.I.vk = '<path d="M3 7c.5 8 4 11 9 11h1v-4c2 0 4 2 5 4h3c-1-3-3-5-5-6 2-1 4-3 5-5h-3c-1 2-3 4-5 4V7h-3v7C7 13 5 10 5 7z"/>';
  DD.I.yt = '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>';
  DD.I.close = '<path d="M6 6l12 12M18 6L6 18"/>';
  /* выпадающая панель только у «Проектов» (замечание 19.10.2026): остальные пункты шапки — простые ссылки на свои страницы */
  var M = {
    projects: ['Все разработки', '14 продуктов в семи направлениях: от программных платформ и связи до техники и систем защиты. У каждого проекта честный статус.', 'Проекты',
      [['projects.html#products', 'Все проекты'], ['dropfield.html', 'DROPFIELD'], ['agata.html', 'AGATA'], ['elza.html', 'ELZA'], ['eva.html', 'EVA'], ['blackfly.html', 'BLACKFLY'], ['warden.html', 'WARDEN'], ['hex.html', 'HEX'], ['echo.html', 'ECHO'], ['nomad.html', 'NOMAD'], ['seal.html', 'SEAL'], ['highfast.html', 'HIGHFAST'], ['backeye.html', 'BACKEYE'], ['shield.html', 'SHIELD'], ['arrowhead.html', 'ARROWHEAD / SPEAR']]]
  };

  /* ---------- шапка ---------- */
  var hd = $('#hd');
  $('#nav').innerHTML = DD.nav.map(function (n) { var k = n[1].replace('.html', ''); return '<a href="' + DD.url(n[1]) + '"' + (document.body.getAttribute('data-nav') === k ? ' class="here" aria-current="page"' : '') + '>' + n[0] + (M[k] ? DD.ic('chev', 'ic--s') : '') + '</a>'; }).join('');
  DD.onScroll(function (y) { hd.classList.toggle('sc', y > 12); });

  /* ---------- выпадающая панель ---------- */
  var mg = document.createElement('div'), bd = document.createElement('div');
  mg.className = 'mg'; mg.id = 'mg'; bd.className = 'mg__bd';
  mg.innerHTML = '<div class="mg__in">' + Object.keys(M).map(function (k) {
    var m = M[k];
    return '<div class="mg__p" data-menu="' + k + '"><div class="mg__d fr"><span class="svc">' + m[0] + '</span><p>' + m[1] + '</p>' + (m[4] ? '<div class="svc">' + DD.st(m[4][0], m[4][1]) + '</div>' : '') + '</div>' +
      '<div class="mg__r"><span class="svc">' + m[2] + '</span><div class="mg__l' + (m[3].length > 8 ? ' mg__l--3' : '') + '" style="--rows:' + Math.ceil(m[3].length / (m[3].length > 8 ? 3 : 2)) + '">' + m[3].map(function (it, i) {
        return '<a href="' + DD.url(it[0]) + '" style="--i:' + i + '"><span class="svc">' + ('0' + (i + 1)).slice(-2) + '</span><span' + (/^[A-Z]+$/.test(it[1]) ? ' class="latin"' : '') + '>' + it[1] + '</span>' + DD.ic('ne', 'ic--s') + '</a>';
      }).join('') + '</div></div></div>';
  }).join('') + '</div>';
  document.body.appendChild(bd); hd.parentNode.insertBefore(mg, hd.nextSibling);  /* панель сразу после шапки: ссылки идут за пунктами меню при обходе Tab */
  var triggers = [].slice.call(document.querySelectorAll('#nav a')).filter(function (a) { var k = a.getAttribute('href').replace(/^.*\/|\.html.*$/g, ''); if (M[k]) { a.setAttribute('data-menu', k); return true; } return false; });
  var skipOpen = false, timer = null, cur = null, inn = mg.querySelector('.mg__in');
  var open = function (k) {
    clearTimeout(timer); if (skipOpen || window.innerWidth <= 1100 || cur === k) return;
    if (DD.closeLang) DD.closeLang();
    /* высота панели плавно переходит от раздела к разделу */
    var was = cur ? inn.offsetHeight : 0; cur = k; inn.style.height = 'auto';
    mg.querySelectorAll('.mg__p').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-menu') === k); });
    var h = inn.offsetHeight; if (was && was !== h) { inn.style.height = was + 'px'; inn.offsetHeight; } inn.style.height = h + 'px';
    triggers.forEach(function (t) { var on = t.getAttribute('data-menu') === k; t.classList.toggle('cur', on); t.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    mg.classList.add('on'); bd.classList.add('on'); hd.classList.add('mgo');
  };
  var close = function (now) {
    clearTimeout(timer); timer = setTimeout(function () { cur = null; mg.classList.remove('on'); bd.classList.remove('on'); hd.classList.remove('mgo'); triggers.forEach(function (t) { t.classList.remove('cur'); t.setAttribute('aria-expanded', 'false'); }); }, now ? 0 : 160);
  };
  triggers.forEach(function (t) {
    t.addEventListener('mouseenter', function () { open(t.getAttribute('data-menu')); });
    t.addEventListener('focus', function () { open(t.getAttribute('data-menu')); });
  });
  /* панель, открытая с клавиатуры, закрывается, когда фокус уходит из шапки и панели */
  [hd, mg].forEach(function (el) { el.addEventListener('focusout', function (e) {
    var to = e.relatedTarget;
    if (!to && (hd.matches(':hover') || mg.matches(':hover'))) return;  /* клик по тексту внутри панели */
    if (!to || (!hd.contains(to) && !mg.contains(to))) close(true);
  }); });
  /* с клавиатуры: стрелка вниз или Enter на пункте ведут в открытую панель, Escape возвращает на пункт */
  triggers.forEach(function (t) { t.setAttribute('aria-haspopup', 'true'); t.setAttribute('aria-expanded', 'false'); t.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(t.getAttribute('data-menu')); var f = mg.querySelector('.mg__p.on a'); if (f) f.focus(); }
  }); });
  mg.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var t = triggers.filter(function (x) { return x.getAttribute('data-menu') === cur; })[0]; close(true); if (t) { skipOpen = true; t.focus(); skipOpen = false; } } });
  /* фокус на пунктах без панели (все, кроме «Проектов», язык) закрывает панель, как и наведение */
  hd.addEventListener('focusin', function (e) { var a = e.target.closest('a,button'); if (cur && a && !a.hasAttribute('data-menu')) close(true); });
  hd.addEventListener('mouseleave', function () { close(); }); hd.addEventListener('mouseenter', function () { clearTimeout(timer); });
  mg.addEventListener('mouseenter', function () { clearTimeout(timer); }); mg.addEventListener('mouseleave', function () { close(); });
  /* пункты без панели и остальная шапка закрывают панель */
  hd.addEventListener('mouseover', function (e) { var a = e.target.closest('a,button'); if (cur && a && !a.hasAttribute('data-menu')) close(); });
  bd.addEventListener('click', function () { close(true); });
  window.addEventListener('scroll', function () { if (cur) close(true); }, { passive: true });

  /* ---------- язык ---------- */
  var LANGS = [['ru', 'RU', 'Русский'], ['en', 'EN', 'English']];
  var ru = hd.querySelector('.hd__r > .svc');
  if (ru) {
    var lg = document.createElement('div'); lg.className = 'lg svc';
    lg.innerHTML = '<button type="button" class="lg__b" aria-haspopup="listbox" aria-expanded="false"><span>' + LANG.toUpperCase() + '</span>' + DD.ic('chev') + '</button><div class="lg__l" role="listbox">' +
      LANGS.map(function (l) { return '<button type="button" role="option" data-lang="' + l[0] + '"' + (l[0] === LANG ? ' class="on"' : '') + '><span>' + l[1] + '</span><span>' + l[2] + '</span></button>'; }).join('') + '</div>';
    ru.parentNode.replaceChild(lg, ru);
    var lb = lg.querySelector('.lg__b');
    var setOpenLang = function (v) { lg.classList.toggle('on', v); lb.setAttribute('aria-expanded', v ? 'true' : 'false'); };
    DD.closeLang = function () { setOpenLang(false); };
    lb.addEventListener('click', function (e) { e.stopPropagation(); setOpenLang(!lg.classList.contains('on')); close(true); });
    lg.querySelectorAll('.lg__l button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); setOpenLang(false); lb.focus(); }); });
    document.addEventListener('click', function () { setOpenLang(false); });
  }
  /* смена языка — переход на ту же страницу в другой версии: русская в корне, английская в en/ */
  function setLang(l) {
    if (l === LANG) return;
    var file = location.pathname.split('/').pop() || 'index.html';
    location.href = (LANG === 'en' ? '../' : 'en/') + file + location.search + location.hash;
  }

  /* ---------- мобильное меню ---------- */
  var mm = document.createElement('div'); mm.className = 'mm'; mm.id = 'mm'; mm.setAttribute('aria-hidden', 'true');
  mm.innerHTML = '<div class="mm__t"><img src="' + R + 'assets/logo/logo3b.svg" alt="Darlein Defense"><button class="bx bx--ic bx--s" type="button" id="mmX" aria-label="Закрыть меню"><span class="bx__f"></span>' + DD.ic('close') + '</button></div>' +
    '<nav class="mm__n" aria-label="Меню">' + DD.nav.map(function (n, i) { return '<a href="' + DD.url(n[1]) + '" style="--i:' + i + '">' + n[0] + DD.ic('ne') + '</a>'; }).join('') + '</nav>' +
    '<a class="bx bx--l svc mm__df" href="' + DD.url('dropfield.html') + '"><span class="bx__f"></span><span class="st st--soon"><i></i>DROPFIELD</span>' + DD.ic('ne', 'ic--s') + '</a>' +
    '<div class="mm__s"><span class="svc">Язык</span><div class="mm__lang">' + LANGS.map(function (l) { return '<button class="bx bx--s svc' + (l[0] === LANG ? ' bx--on' : '') + '" type="button" data-lang="' + l[0] + '"><span class="bx__f"></span>' + l[1] + '</button>'; }).join('') + '</div></div>' +
    '<div class="mm__u">' + [[['investors.html', 'Инвесторам'], ['intel.html#media', 'Для СМИ']], [['legal.html', 'Политика обработки ПДн'], ['legal.html#terms', 'Пользовательское соглашение']], [['mailto:info@darlein.ru', 'info@darlein.ru'], ['#', 'Telegram']]].map(function (g) {
      return '<div class="mm__g">' + g.map(function (x) { return '<a href="' + DD.url(x[0]) + '">' + x[1] + '</a>'; }).join('') + '</div>';
    }).join('') + '</div>';
  document.body.appendChild(mm);
  var burger = hd.querySelector('.hd__menu');
  if (burger) { burger.type = 'button'; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-controls', 'mm'); }
  mm.setAttribute('role', 'dialog'); mm.setAttribute('aria-modal', 'true'); mm.setAttribute('aria-label', 'Меню');
  /* пока меню открыто, остальная страница недоступна; фокус переходит в меню и возвращается на кнопку */
  var menu = function (v) {
    var was = mm.classList.contains('on'); if (v === was) return;
    mm.classList.toggle('on', v); mm.setAttribute('aria-hidden', v ? 'false' : 'true'); document.body.classList.toggle('lock', v);
    [].forEach.call(document.body.children, function (el) { if (el !== mm && el.tagName !== 'SCRIPT') el.inert = v; });
    if (burger) burger.setAttribute('aria-expanded', v ? 'true' : 'false');
    if (v) $('#mmX').focus(); else if (burger) burger.focus();
  };
  if (burger) burger.addEventListener('click', function () { menu(true); });
  $('#mmX').addEventListener('click', function () { menu(false); });
  mm.querySelectorAll('.mm__lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  window.addEventListener('resize', function () { close(true); if (window.innerWidth > 1100) menu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(true); menu(false); if (DD.closeLang) DD.closeLang(); } });

  /* ---------- cookie: согласие (замечание 25.10.2026). Необходимые cookie работают всегда, аналитические — только после «Принять».
     Выбор хранится в localStorage (dd_cookie: all | necessary) и доступен как DD.cookies; прежнее «Понятно» согласием не считается ---------- */
  var ckv = null; try { ckv = localStorage.getItem('dd_cookie'); } catch (e) {}
  DD.cookies = ckv === 'all' || ckv === 'necessary' ? ckv : null;
  if (!DD.cookies) {
    var ck = document.createElement('div'); ck.className = 'ck ck--c fr'; ck.id = 'cookie'; ck.setAttribute('role', 'dialog'); ck.setAttribute('aria-label', 'Согласие на cookie');
    ck.innerHTML = '<p>Мы используем файлы cookie. Необходимые обеспечивают работу сайта, аналитические помогают его улучшать — их включим только с вашего согласия. Подробнее — в <a href="' + DD.url('legal.html#policy') + '">политике обработки данных</a>.</p>' +
      '<div class="ck__b"><button class="bx bx--s bx--on" type="button" data-ck="all"><span class="bx__f"></span>Принять</button><button class="bx bx--s" type="button" data-ck="necessary"><span class="bx__f"></span>Только необходимые</button></div>';
    document.body.appendChild(ck);
    var wait = setInterval(function () { if (!document.body.classList.contains('is-loading')) { clearInterval(wait); setTimeout(function () { ck.classList.add('on'); }, 1200); } }, 200);
    ck.querySelectorAll('[data-ck]').forEach(function (b) { b.addEventListener('click', function () {
      DD.cookies = b.getAttribute('data-ck'); ck.classList.remove('on');
      try { localStorage.setItem('dd_cookie', DD.cookies); } catch (e) {}
      document.dispatchEvent(new CustomEvent('dd:cookies', { detail: DD.cookies }));   /* сюда подключается аналитика, если выбран вариант all */
      setTimeout(function () { ck.remove(); }, 700);
    }); });
  }
  /* ---------- вкладки: смена раз в 6 секунд до первого клика ---------- */
  DD.tabs = function (q) {
    var tabs = q.querySelectorAll('.q__tabs button'), panels = q.querySelectorAll('.q__p'), idx = 0, timer = null, manual = false, hov = false, vis = false;
    var show = function (i) { idx = i; tabs.forEach(function (t, j) { t.classList.toggle('on', j === i); t.setAttribute('aria-pressed', j === i ? 'true' : 'false'); }); panels.forEach(function (p, j) { p.classList.toggle('on', j === i); }); };
    show(0);
    var start = function () { if (DD.reduced || manual || timer) return; q.classList.add('auto'); timer = setInterval(function () { if (!manual && !hov && vis && !document.hidden) show((idx + 1) % tabs.length); }, 6000); };
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { manual = true; q.classList.remove('auto'); clearInterval(timer); timer = null; show(i); }); });
    q.addEventListener('mouseenter', function () { hov = true; }); q.addEventListener('mouseleave', function () { hov = false; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis) start(); }, { threshold: .25 }).observe(q); else { vis = true; start(); }
  };

  /* ---------- подвал ---------- */
  var ftp = $('#ftp');
  if (ftp) {
    var col = function (h, items) { return '<div><h3>' + h + '</h3><ul>' + items.map(function (x) { return '<li><a href="' + DD.url(x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div>'; };
    ftp.innerHTML = '<div class="ft__t"><div class="ft__br"><img src="' + R + 'assets/logo/logo3b.svg" alt="Darlein Defense"><p>Российская DefenseTech-компания. Единая экосистема технологий и сервисов для оборонного и околовоенного рынка.</p></div>' +
      col('Компания', [['О компании', 'company.html'], ['Инвесторам', 'investors.html'], ['Карьера', 'careers.html'], ['Новости', 'intel.html'], ['Для СМИ', 'intel.html#media']]) +
      col('Проекты', [['Все проекты', 'projects.html'], ['DROPFIELD', 'dropfield.html'], ['AGATA', 'agata.html'], ['ELZA', 'elza.html'], ['BLACKFLY', 'blackfly.html'], ['WARDEN', 'warden.html'], ['Еще 9 проектов', 'projects.html#directions']]) +
      col('Связь', [['Контакты', 'contacts.html'], ['Партнерам и вендорам', 'partners.html'], ['info@darlein.ru', 'mailto:info@darlein.ru'], ['Telegram', '#']]) +
      '<div><h3>Реквизиты</h3><p class="ft__lg">ООО «ДАРЛЕЙН ДЕФЕНС»<br>ИНН 9701331416<br>КПП 770101001<br>ОГРН 1267700273477</p><ul>' +
      [['Политика обработки ПДн', 'legal.html#policy'], ['Согласие на обработку', 'legal.html#consent'], ['Пользовательское соглашение', 'legal.html#terms']].map(function (x) { return '<li><a href="' + DD.url(x[1]) + '">' + x[0] + '</a></li>'; }).join('') + '</ul></div></div>' +
      /* требования к сайтам в РФ (19.10.2026): хранение персональных данных в России (152-ФЗ), без передачи третьим лицам, авторские права */
      '<div class="ft__law">' + [
        ['Хранение данных', 'Персональные данные пользователей хранятся и обрабатываются на серверах в Российской Федерации в соответствии с Федеральным законом от 27.07.2006&nbsp;№&nbsp;152-ФЗ «О&nbsp;персональных данных».'],
        ['Передача данных', 'Мы не распространяем персональные данные и не передаем их третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.'],
        ['Авторские права', 'Тексты, изображения и дизайн сайта — объекты авторского права ООО «ДАРЛЕЙН ДЕФЕНС». Копирование и использование материалов без письменного разрешения запрещено и преследуется по закону.']
      ].map(function (x) { return '<p><span class="svc">' + x[0] + '</span>' + x[1] + '</p>'; }).join('') + '</div>' +
      '<div class="ft__e"><div><img src="' + R + 'assets/logo/logo3b.svg" alt=""><span>© ' + new Date().getFullYear() + ' ООО «ДАРЛЕЙН ДЕФЕНС». Все права защищены.</span></div></div>';
  }
})();
