/* Внутренние страницы: появление, схема, лента направлений, список проектов, формы, маршруты «Партнерам»,
   фильтр новостей, документы, «Спасибо». Шапка, меню и подвал — в chrome.js, общие блоки — в blocks.js. */
(function () {
  'use strict';
  var $ = function (q) { return document.querySelector(q); };
  DD.eco($('#ecoBox'));
  DD.rail($('#rail'), $('.rnav'));
  DD.icons();
  /* загрузочный экран — один раз за сессию (метку ставит скрипт в <head>); потом заголовок выезжает, остальное по мере прокрутки */
  var start = function () { var t = $('#phT'); if (t) setTimeout(function () { t.classList.add('in'); }, 80); document.body.classList.add('ready'); DD.reveal(); };
  if (document.documentElement.classList.contains('ld-on')) { document.body.classList.add('is-loading'); DD.loader({ min: 1800, assets: ['assets/logo/logo3b.svg'], onOut: start }); }
  else { var ld = $('#ld'); if (ld) ld.remove(); start(); }
  document.querySelectorAll('.q').forEach(function (q) { DD.tabs(q); });

  /* «Проекты»: в списке слева подсвечивается панель, которая сейчас на экране */
  var pps = [].slice.call(document.querySelectorAll('.pp')), nav = $('.pj__nav');
  if (pps.length && nav) {
    var links = [].slice.call(nav.querySelectorAll('a')), cur = -1;
    DD.onScroll(function (y, vh) {
      var i = 0; pps.forEach(function (p, j) { if (p.getBoundingClientRect().top < vh * .5) i = j; });
      if (i === cur) return; cur = i;
      links.forEach(function (a, j) { a.classList.toggle('on', j === i); });
      var a = links[i], ol = a.closest('ol'); if (ol.scrollHeight > ol.clientHeight) ol.scrollTop = a.offsetTop - ol.offsetTop - ol.clientHeight / 2 + a.offsetHeight / 2;
    });
  }

  var press = function (btns, on) { btns.forEach(function (b) { var v = on(b); b.classList.toggle('bx--on', v); b.setAttribute('aria-pressed', v ? 'true' : 'false'); }); };

  /* формы: отправка ведет на «Спасибо» с темой обращения (бэкенд подключается при переносе на площадку) */
  document.querySelectorAll('form[data-thanks]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); var from = f.getAttribute('data-thanks'), r = f.querySelector('[name="role"]'); if (r && r.value) from = r.value; location.href = 'thanks.html?from=' + encodeURIComponent(from); });
  });
  document.querySelectorAll('.file input').forEach(function (inp) { inp.addEventListener('change', function () { var t = inp.parentNode.querySelector('span'); if (t && inp.files[0]) t.textContent = inp.files[0].name; }); });

  /* «Партнерам»: два маршрута — карточки, переключатель над описанием и роль в форме работают вместе */
  var routes = [].slice.call(document.querySelectorAll('.rt[data-route]'));
  if (routes.length) {
    var roleBtns = [].slice.call(document.querySelectorAll('[data-role]'));
    var setRoute = function (r, scroll) {
      routes.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-route') === r); x.setAttribute('aria-pressed', x.getAttribute('data-route') === r ? 'true' : 'false'); });
      document.querySelectorAll('.rp').forEach(function (p) { var on = p.getAttribute('data-route') === r; p.classList.toggle('on', on); if (on) p.querySelectorAll('[data-rv],.steps').forEach(function (el) { el.classList.add('in'); }); });
      press(roleBtns, function (b) { return b.getAttribute('data-role') === r; });
      var ri = document.querySelector('[name="role"]'); if (ri) ri.value = r;
      var subj = $('#formSubject'); if (subj) subj.textContent = r === 'vendor' ? 'Заявка вендора DROPFIELD' : 'Заявка партнера экосистемы';
      if (scroll) { var t = $('#route-detail'); if (t) t.scrollIntoView({ behavior: DD.reduced ? 'auto' : 'smooth', block: 'start' }); }
    };
    routes.forEach(function (x) { x.addEventListener('click', function () { setRoute(x.getAttribute('data-route'), true); }); });
    roleBtns.forEach(function (b) { b.addEventListener('click', function () { setRoute(b.getAttribute('data-role'), false); }); });
    var h = location.hash.replace('#', ''); setRoute(h === 'vendor' ? 'vendor' : 'partner', false);
    window.addEventListener('hashchange', function () { var hh = location.hash.replace('#', ''); if (hh === 'vendor' || hh === 'partner') setRoute(hh, true); });
  }

  /* «Новости»: фильтр по рубрике */
  var flt = [].slice.call(document.querySelectorAll('.flt [data-filter]'));
  flt.forEach(function (b) { b.addEventListener('click', function () {
    var f = b.getAttribute('data-filter'); press(flt, function (x) { return x === b; });
    document.querySelectorAll('.nr[data-rubric]').forEach(function (it) { it.hidden = f !== 'all' && it.getAttribute('data-rubric') !== f; });
  }); });

  /* «Документы»: три документа на одной странице, оглавление собирается по заголовкам */
  var docs = [].slice.call(document.querySelectorAll('.doc[data-doc]'));
  if (docs.length) {
    var docBtns = [].slice.call(document.querySelectorAll('button[data-doc]'));
    var setDoc = function (d) {
      docs.forEach(function (x) { x.hidden = x.getAttribute('data-doc') !== d; });
      press(docBtns, function (b) { return b.getAttribute('data-doc') === d; });
      var cur = document.querySelector('.doc[data-doc="' + d + '"]'), toc = $('#toc');
      if ($('#legalTitle')) $('#legalTitle').textContent = cur.getAttribute('data-title');
      if ($('#legalDate')) $('#legalDate').textContent = cur.getAttribute('data-date');
      if (toc) toc.innerHTML = [].map.call(cur.querySelectorAll('h2[id]'), function (h2) { return '<a href="#' + h2.id + '">' + h2.textContent + '</a>'; }).join('');
      if (history.replaceState) history.replaceState(null, '', '#' + d);
    };
    docBtns.forEach(function (b) { b.addEventListener('click', function () { setDoc(b.getAttribute('data-doc')); window.scrollTo({ top: 0, behavior: DD.reduced ? 'auto' : 'smooth' }); }); });
    var dh = location.hash.replace('#', ''); setDoc(dh === 'consent' || dh === 'terms' ? dh : 'policy');
  }

  /* «Спасибо»: текст по теме обращения */
  var th = [].slice.call(document.querySelectorAll('[data-from]'));
  if (th.length) {
    var q = new URLSearchParams(location.search).get('from') || 'contact';
    if (!th.some(function (el) { return el.getAttribute('data-from') === q; })) q = 'contact';
    th.forEach(function (el) { el.hidden = el.getAttribute('data-from') !== q; });
  }

  /* статья: копировать ссылку */
  document.querySelectorAll('[data-copy]').forEach(function (b) { b.addEventListener('click', function () {
    if (navigator.clipboard) navigator.clipboard.writeText(location.href);
    var t = b.querySelector('.bx__t'); if (t) t.textContent = 'Ссылка скопирована';
  }); });
})();
