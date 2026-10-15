/* Внутренние страницы («О компании», «Проекты»): появление, схема, лента направлений, список проектов.
   Шапка, меню и подвал — в chrome.js, общие блоки — в blocks.js. */
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
})();
