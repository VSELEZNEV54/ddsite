/* Главная: блоки после «Проблем и решений». Тексты те же, что в прототипе. */
(function () {
  'use strict';
  var $ = function (q) { return document.querySelector(q); };

  /* значки, которых не было в первых блоках */
  var X = DD.I;
  X.invest = '<path d="M4 19h16"/><path d="M6 15l4-4 3 3 5-6"/><path d="M14 8h4v4"/>';
  X.partner = '<rect x="9" y="3" width="6" height="6" rx="1.2"/><rect x="3" y="15" width="6" height="6" rx="1.2"/><rect x="15" y="15" width="6" height="6" rx="1.2"/><path d="M12 9v3M6 15v-3h12v3"/>';
  X.career = '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M18 8v6M15 11h6"/>';

  var P = DD.projects;
  var href = function (name) { return DD.url(name.toLowerCase() + '.html'); };
  var count = function (n) { return n + (n === 1 ? ' product' : ' products'); };

  /* ---------- направления проектов ---------- */
  DD.rail($('#rail'), $('.rnav'));

  /* ---------- наши проекты ---------- */
  var list = $('#pbl'), pbp = $('#pbp'), box = $('#pbpImg'), layers = {}, cur = -1;
  list.innerHTML = P.map(function (p, i) {
    return '<a class="prow" href="' + href(p[0]) + '"><span class="svc">' + ('0' + (i + 1)).slice(-2) + '</span><b class="latin">' + p[0] + '</b><span class="prow__c">' + p[5] + '</span><span class="svc">' + DD.st(p[1], p[2]) + '</span><span class="prow__go">' + DD.ic('ne', 'ic--s') + '</span></a>';
  }).join('');
  var rows = [].slice.call(list.children);
  var pick = function (i, anim) {
    if (i === cur) return; cur = i; var p = P[i], d = DD.dirs[p[3]];
    rows.forEach(function (r, j) { r.classList.toggle('on', j === i); });
    if (!layers[p[6]]) { var im = document.createElement('img'); im.alt = ''; im.src = '../img/' + p[6] + '.jpg'; box.appendChild(im); layers[p[6]] = im; void im.offsetWidth; }
    Object.keys(layers).forEach(function (k) { layers[k].classList.toggle('on', k === p[6]); });
    pbp.href = href(p[0]); $('#pbpSt').innerHTML = DD.st(p[1], p[2]); $('#pbpDir').textContent = d.n + ' · ' + d.title; $('#pbpName').textContent = p[0]; $('#pbpDesc').textContent = p[4];
    if (anim) { var b = $('#pbpB'); b.classList.remove('swap'); void b.offsetWidth; b.classList.add('swap'); }
  };
  rows.forEach(function (r, i) { r.addEventListener('mouseenter', function () { pick(i, true); }); r.addEventListener('focus', function () { pick(i, true); }); });
  pick(0, false);

  /* роадмап: [тип, вид, колонка, ширина, текст, метка, ссылка] */
  var RM = {
    '2026': [['b', '', 2, 2, 'Brand and corporate website', 'Q2', 'company.html'], ['b', 'a', 3, 2, 'DROPFIELD · marketplace preparation', 'preparing', 'dropfield.html'], ['b', '', 4, 1, 'AGATA · platform architecture', 'Q4', 'agata.html'], ['m', 'a', 4, 1, 'DROPFIELD launch · Q4']],
    '2027': [['b', 'a', 1, 2, 'AGATA · map, communications, and tasks', 'Q1–Q2', 'agata.html#modules'], ['b', 'w', 3, 1, 'DROPFIELD · organization account', 'Q3', 'dropfield.html#who'], ['b', '', 3, 2, 'AGATA · supplies and equipment connections', 'Q3–Q4', 'agata.html#modules'], ['m', '', 2, 1, 'AGATA pilot with a customer']],
    '2028': [['b', '', 1, 3, 'Autonomous system · prototype', 'research', 'projects.html#directions'], ['b', '', 2, 3, 'Ground platform · concept', 'research', 'projects.html#directions'], ['b', 'g', 3, 2, 'Partner project · reserve'], ['m', '', 4, 1, 'Testing with a partner']],
    '2029': [['b', '', 1, 4, 'Production and service · infrastructure', 'research', 'projects.html#directions'], ['b', 'g', 2, 2, 'Product N · based on the product page layout']]
  };
  var years = Object.keys(RM);
  $('#rm').innerHTML = '<div class="rm__h"><div><h3 class="t-card">Roadmap</h3><span class="svc">Development plan by year and quarter · dates are approximate</span></div><span class="svc">2026–2029</span></div>' +
    '<div class="rm__y">' + years.map(function (y, i) { return '<button class="bx bx--s' + (i ? '' : ' bx--on') + '" type="button" aria-pressed="' + (i ? 'false' : 'true') + '" data-year="' + y + '"><span class="bx__f"></span>' + y + '</button>'; }).join('') + '</div>' +
    years.map(function (y, i) {
      return '<div class="rm__b' + (i ? '' : ' on') + '" data-year="' + y + '"><div class="rm__q svc">Q1</div><div class="rm__q svc">Q2</div><div class="rm__q svc">Q3</div><div class="rm__q svc">Q4</div>' + RM[y].map(function (r, k) {
        var pos = ' style="grid-column:' + r[2] + '/span ' + r[3] + ';grid-row:' + (k + 2) + '"';
        if (r[0] === 'm') return '<div class="rms' + (r[1] ? ' rms--a' : '') + '"' + pos + '><i></i>' + r[4] + '</div>';
        var tag = r[6] ? 'a' : 'div';
        return '<' + tag + ' class="rb' + (r[1] ? ' rb--' + r[1] : '') + '"' + pos + (r[6] ? ' href="' + DD.url(r[6]) + '"' : '') + '><span>' + r[4] + '</span>' + (r[5] ? '<span class="rb__t">' + r[5] + '</span>' : '') + '</' + tag + '>';
      }).join('') + '</div>';
    }).join('') +
    '<div class="rm__lg"><span class="rb rb--a">current focus</span><span class="rb rb--w">launch</span><span class="rb">in progress</span><span class="rb rb--g">reserve</span><span class="rms"><i></i>milestone</span></div>';
  var tog = $('#projToggle'), views = { tiles: $('#pb'), roadmap: $('#rm') };
  var setView = function (v) {
    tog.querySelectorAll('button').forEach(function (b) { var on = b.getAttribute('data-view') === v; b.classList.toggle('bx--on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
  };
  tog.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-view')); }); });
  setView(location.hash === '#roadmap' ? 'roadmap' : 'tiles');
  $('#rm').querySelectorAll('.rm__y button').forEach(function (b) { b.addEventListener('click', function () {
    var y = b.getAttribute('data-year');
    $('#rm').querySelectorAll('.rm__y button').forEach(function (x) { x.classList.toggle('bx--on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    $('#rm').querySelectorAll('.rm__b').forEach(function (bd) { bd.classList.toggle('on', bd.getAttribute('data-year') === y); });
  }); });

  /* ---------- создаем вместе ---------- (третье поле — кадр карточки; у белых карточек кадра нет) */
  var J = [
    ['investors.html', 'invest', '', 'Investors', 'Funds, strategic and private investors', 'Invest in the company', 'Let’s discuss participation in Darlein Defense and opportunities for the company’s growth.', 'Where the funds go', ['Product development', 'Prototypes and testing', 'Production preparation'], 'Discuss investment'],
    ['partners.html', 'partner', '', 'Partners', 'Engineering teams, technology owners, manufacturers', 'Develop technology with us', 'We incorporate strong developments into our products and invite manufacturing partners.', 'Ways to take part', ['Bringing a team on board', 'Acquiring technology and rights', 'Integrating developments into products', 'Manufacturing components and products'], 'Discuss a partnership'],
    ['careers.html', 'career', '', 'Specialists', 'Developers, engineers, specialists', 'Join the team', 'Work on a specific product alongside teams from the company’s other areas.', 'Who we are looking for', ['Developers', 'Engineers', 'Specialists'], 'Help build our products']
  ];
  $('#join').innerHTML = J.map(function (j, i) {
    return '<a class="jc" data-rv style="--d:' + i * 90 + 'ms" href="' + DD.url(j[0]) + '"><div class="jc__top svc"><span>Scenario 0' + (i + 1) + ' / 03</span>' + DD.ic(j[1]) + '</div>' +
      '<div class="jc__b"><div class="jc__who">' + j[3] + '</div><div class="jc__whom">' + j[4] + '</div><h3>' + j[5] + '</h3><p>' + j[6] + '</p>' +
      '<div class="jc__l"><span class="svc">' + j[7] + '</span><ul>' + j[8].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
      '<span class="bx bx--dk"><span class="bx__f"></span>' + j[9] + DD.ic('right', 'ic--s') + '</span></div></a>';
  }).join('');

  /* ---------- DefenseTech компания ---------- */
  var Q = [
    ['One entry point to selected products', 'The market is fragmented', 'Strong manufacturers, teams, and technologies exist separately. Darlein Defense gives the customer one clear entry point to selected products and services.', 'Learn more', 'company.html#problem', 'st-q-1'],
    ['One standard for everyone', 'One standard', 'Quality, industrial and digital design, compatibility — the same requirements for our own developments and for partner projects.', 'Ecosystem model', 'company.html#model', 'st-q-2'],
    ['Calm and factual', 'An engineering company', 'No military bravado. Every project has an honest status: launched, preparing, or in research. Restricted specifications are available on request.', 'Working principles', 'company.html#principles', 'st-q-3']
  ];
  var q = $('#q');
  q.innerHTML = '<div class="q__tabs">' + Q.map(function (x, i) { return '<button type="button" class="' + (i ? '' : 'on') + '">' + x[0] + '</button>'; }).join('') + '</div>' +
    Q.map(function (x, i) {
      return '<div class="q__p grain' + (i ? '' : ' on') + '"><div class="q__bg"><img src="../img/' + x[5] + '.jpg" alt="" loading="lazy"></div><div class="mc__br"></div>' +
        '<div class="q__num"><span class="svc">0' + (i + 1) + ' / 03</span><b>' + (i + 1) + '</b></div>' +
        '<div class="q__tx"><span class="svc">' + x[1] + '</span><p>' + x[2] + '</p><a class="bx" href="' + DD.url(x[4]) + '"><span class="bx__f"></span>' + x[3] + DD.ic('right', 'ic--s ic--mv') + '</a></div></div>';
    }).join('');
  DD.tabs(q);

  /* ---------- новости ---------- */
  $('#news').innerHTML = [['02.09.2026 · Company news', 'Trademark applications filed for Darlein, Darlein Defense, and Darlein Arsenal'], ['28.08.2026 · Projects', 'DROPFIELD: how the catalog works and what goes into a unified product card'], ['19.08.2026 · Engineering notes', 'How AGATA works without connectivity: local data and synchronization']].map(function (n) {
    var m = n[0].split(' · ');
    return '<a class="nr" href="' + DD.url('intel-article.html') + '"><span class="svc">' + m[0] + '</span><span class="svc">' + m[1] + '</span><b>' + n[1] + '</b><span class="bx bx--ic bx--s"><span class="bx__f"></span>' + DD.ic('ne', 'ic--s') + '</span></a>';
  }).join('');

  DD.icons();
})();
