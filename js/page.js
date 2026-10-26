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
  document.querySelectorAll('.mis .words').forEach(function (el) { DD.words(el); });

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

  /* «Читать полностью»: скрытые абзацы раскрываются, подпись кнопки меняется на «Свернуть» */
  document.querySelectorAll('.more__t').forEach(function (b) {
    var m = b.closest('.more'), t = b.querySelector('span'), label = t.textContent;
    b.addEventListener('click', function () {
      var v = !m.classList.contains('open'); m.classList.toggle('open', v);
      b.setAttribute('aria-expanded', v ? 'true' : 'false'); t.textContent = v ? b.getAttribute('data-less') : label;
    });
  });

  /* состав продукта: пункты открываются по клику, одновременно открыт один, первый открыт сразу */
  document.querySelectorAll('.acc--m, .acc--js').forEach(function (acc) {
    var items = [].slice.call(acc.querySelectorAll('.ai'));
    var setOpen = function (it, v) { it.classList.toggle('open', v); it.querySelector('.ai__h').setAttribute('aria-expanded', v ? 'true' : 'false'); };
    items.forEach(function (it) { it.querySelector('.ai__h').addEventListener('click', function () {
      var v = !it.classList.contains('open'); items.forEach(function (x) { setOpen(x, false); }); if (v) setOpen(it, true);
    }); });
    if (items[0]) setOpen(items[0], true);
  });

  /* цифры: число набирается от нуля, когда карточка появляется на экране; без движения — сразу итог */
  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length && !DD.reduced && 'IntersectionObserver' in window) {
    counters.forEach(function (el) {
      var src = el.getAttribute('data-count'), full = el.textContent, dec = (src.split(',')[1] || '').length, to = parseFloat(src.replace(',', '.'));
      var fmt = function (v) { return full.replace(src, v.toFixed(dec).replace('.', ',')); };
      el.textContent = fmt(0);
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return; io.disconnect();
        var t0 = performance.now(), dur = 1400;
        var tick = function (t) { var k = Math.min(1, (t - t0) / dur); el.textContent = k < 1 ? fmt(to * (1 - Math.pow(1 - k, 3))) : full; if (k < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }, { threshold: .6 });
      io.observe(el);
    });
  }

  var press = function (btns, on) { btns.forEach(function (b) { var v = on(b); b.classList.toggle('bx--on', v); b.setAttribute('aria-pressed', v ? 'true' : 'false'); }); };

  /* формы: отправка ведет на «Спасибо» с темой обращения (бэкенд подключается при переносе на площадку) */
  document.querySelectorAll('form[data-thanks]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); var from = f.getAttribute('data-thanks'), r = f.querySelector('[name="role"]'); if (r && r.value) from = r.value; location.href = 'thanks.html?from=' + encodeURIComponent(from); });
  });
  document.querySelectorAll('.file input').forEach(function (inp) { inp.addEventListener('change', function () { var t = inp.parentNode.querySelector('span'); if (t && inp.files[0]) t.textContent = inp.files[0].name; }); });

  /* «Партнерам»: три пути — карточки, вкладки над описанием и формат в форме работают вместе (правки 25.10.2026) */
  var routes = [].slice.call(document.querySelectorAll('.rt[data-route]'));
  if (routes.length) {
    var keys = routes.map(function (x) { return x.getAttribute('data-route'); });
    var roleBtns = [].slice.call(document.querySelectorAll('button[data-role]')), roleSel = document.querySelector('select[name="role"]');
    var setRoute = function (r, scroll) {
      routes.forEach(function (x) { var on = x.getAttribute('data-route') === r; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      document.querySelectorAll('.rp').forEach(function (p) { var on = p.getAttribute('data-route') === r; p.classList.toggle('on', on); if (on) p.querySelectorAll('[data-rv],.steps,[data-auto]').forEach(function (el) { el.classList.add('in'); }); });
      press(roleBtns, function (b) { return b.getAttribute('data-role') === r; });
      if (roleSel) roleSel.value = r;
      if (scroll) { var t = $('#route-detail'); if (t) t.scrollIntoView({ behavior: DD.reduced ? 'auto' : 'smooth', block: 'start' }); }
    };
    routes.forEach(function (x) { x.addEventListener('click', function () { setRoute(x.getAttribute('data-route'), true); }); });
    roleBtns.forEach(function (b) { b.addEventListener('click', function () { setRoute(b.getAttribute('data-role'), false); }); });
    if (roleSel) roleSel.addEventListener('change', function () { setRoute(roleSel.value, false); });
    var fromHash = function () { var hh = location.hash.replace('#', ''); return keys.indexOf(hh) > -1 ? hh : null; };
    setRoute(fromHash() || keys[0], false);
    window.addEventListener('hashchange', function () { var hh = fromHash(); if (hh) setRoute(hh, true); });
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
    var keys = docs.map(function (x) { return x.getAttribute('data-doc'); });
    var dh = location.hash.replace('#', ''); setDoc(keys.indexOf(dh) > -1 ? dh : 'policy');
    /* ссылки между документами (политика → cookie, согласие на рассылку) переключают документ на месте */
    window.addEventListener('hashchange', function () { var hh = location.hash.replace('#', ''); if (keys.indexOf(hh) > -1) { setDoc(hh); window.scrollTo({ top: 0, behavior: DD.reduced ? 'auto' : 'smooth' }); } });
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
