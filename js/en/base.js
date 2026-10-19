/* Darlein Defense · общая часть: тексты, иконки, адреса страниц, загрузка, появление. */
(function () {
  'use strict';
  var DD = window.DD = {};
  DD.reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  DD.fine = !!(window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches);

  /* ---------- Тексты (те же, что в прототипе) ---------- */
  DD.nav = [['About', 'company.html'], ['Projects', 'projects.html'], ['Partners', 'partners.html'], ['Investors', 'investors.html'], ['Careers', 'careers.html'], ['News', 'intel.html'], ['Contact', 'contacts.html']];
  DD.dirs = [
    { n: '01', key: 'soft', img: 'dr-soft', ic: 'soft', short: 'Software and AI', title: 'Software and AI', products: ['AGATA', 'ELZA', 'EVA'], tip: 'The digital core of the ecosystem. AGATA is in development; ELZA and EVA are at the research stage.', desc: 'Platforms for management, analytics, and work assistance.', st: 'dev', stl: 'in development' },
    { n: '02', key: 'uas', img: 'dr-uas', ic: 'uas', short: 'Unmanned', title: 'Unmanned systems', products: ['BLACKFLY'], tip: 'A modular ecosystem: components, ready-made kits, and a software platform.', desc: 'Compatible components and kits for unmanned platforms.', st: 'research', stl: 'research' },
    { n: '03', key: 'ecom', img: 'dr-ecom', ic: 'ecom', short: 'Commerce', title: 'Digital commerce', products: ['DROPFIELD'], tip: 'The ecosystem’s first commercial product. Preparing for launch.', desc: 'A marketplace for choosing, buying, and selling gear.', st: 'soon', stl: 'preparing for launch' },
    { n: '04', key: 'gear', img: 'dr-gear', ic: 'gear', short: 'Equipment', title: 'Equipment', products: ['WARDEN'], tip: 'A kit in which protection, clothing, and wearable electronics are developed together.', desc: 'Modular equipment: protection, exoskeleton modules, and electronics.', st: 'research', stl: 'research' },
    { n: '05', key: 'comms', img: 'b-tower', ic: 'comms', short: 'Communications and sensors', title: 'Communications and sensors', products: ['HEX', 'ECHO'], tip: 'HEX connects people and machines into one network; ECHO provides observations from land, air, and sea.', desc: 'A network for people and vehicles, plus autonomous sensors.', st: 'research', stl: 'research' },
    { n: '06', key: 'tech', img: 'b-nomad', ic: 'tech', short: 'Vehicles', title: 'Vehicles', products: ['NOMAD', 'SEAL', 'HIGHFAST', 'BACKEYE'], tip: 'Platform families with interchangeable payloads and shared control systems.', desc: 'Ground, maritime, and aerial platforms.', st: 'research', stl: 'research' },
    { n: '07', key: 'def', img: 'dr-def', ic: 'def', short: 'Protection and air defense', title: 'Active protection and air defense', products: ['SHIELD', 'ARROWHEAD'], tip: 'Modular protection systems and a family of interceptors with shared digital integration.', desc: 'Protection for vehicles and sites; unmanned interceptors.', st: 'research', stl: 'research' }
  ];
  DD.problems = [
    { n: '01', title: 'The market is fragmented', img: 'st-prob-1',
      p: 'Strong manufacturers, teams, and technologies exist separately, are packaged differently, and are hard to combine into one system. The customer assembles a solution from parts and carries the risk alone.',
      s: 'One entry point to selected products, digital services, and integrated solutions. A clear choice, a transparent channel of communication, and support.' },
    { n: '02', title: 'Products are incompatible', img: 'st-prob-2',
      p: 'Products from different suppliers do not fit together: different interfaces, protocols, and quality requirements. Integration falls on the customer.',
      s: 'One standard of quality, design, and compatibility for our own and partner products. A shared environment where products work together.' },
    { n: '03', title: 'Developments get lost on the way to market', img: 'st-prob-3',
      p: 'Strong engineering developments get stuck between idea and scale: there is not enough funding, team, product expertise, production capacity, or market access.',
      s: 'One managed path from author to ecosystem product: team and rights, funding, product, design, production, and market launch under an umbrella brand.' }
  ];
  DD.copy = {
    who: 'Darlein Defense is a private Russian DefenseTech company. We are building a unified ecosystem of technologies and services for the defense and defense-adjacent market.',
    mission: 'To bring together engineering talent and promising technologies to create modern, high-quality, and practical products.',
    goal: 'To build Russia’s largest private DefenseTech ecosystem: from digital platforms to autonomous systems and robotics.'
  };

  /* все страницы сайта лежат в корне (с 18.10.2026); прежний прототип остается в папке prototype/ как архив.
     «Арсенал» — прежнее имя площадки DROPFIELD */
  DD.url = function (h) {
    var m = /^([a-z0-9-]+)\.html(.*)$/.exec(h); if (!m) return h;
    return (m[1] === 'arsenal' ? 'dropfield' : m[1]) + '.html' + m[2];
  };

  /* проекты: [название, статус, подпись статуса, номер направления, описание, назначение, кадр] */
  DD.projects = [
    ['DROPFIELD', 'soon', 'preparing for launch', 2, 'A specialized platform for choosing, buying, and selling gear and equipment.', 'Choosing and buying gear', 'pr-dropfield'],
    ['AGATA', 'dev', 'in development', 0, 'A software platform for coordinating people, equipment, and resources.', 'Management, data, and coordination', 'pr-agata'],
    ['ELZA', 'research', 'research', 0, 'An AI analytics platform for exploring events, processes, and risks.', 'Analytics and event research', 'pr-elza'],
    ['EVA', 'research', 'research', 0, 'An AI assistant for working with equipment and physical assets.', 'AI assistant for working with equipment', 'pr-eva'],
    ['BLACKFLY', 'research', 'research', 1, 'A modular ecosystem for building unmanned platforms.', 'Components for unmanned platforms', 'pr-blackfly'],
    ['WARDEN', 'research', 'research', 3, 'A modular personal equipment system.', 'Modular personal equipment', 'pr-warden'],
    ['HEX', 'research', 'research', 4, 'A family of network devices for wearable electronics, vehicles, unmanned platforms, and sensors.', 'Communications for people, vehicles, and sensors', 'b-hand'],
    ['ECHO', 'research', 'research', 4, 'A family of autonomous sensor systems for land, air, and sea.', 'Autonomous sensor systems', 'b-sensor'],
    ['NOMAD', 'research', 'research', 5, 'A family of robotic ground platforms with interchangeable payloads.', 'Robotic ground platforms', 'b-nomad-wheel'],
    ['SEAL', 'research', 'research', 5, 'A family of unmanned maritime platforms for surveillance, communications, transport, and specialized tasks.', 'Unmanned maritime platforms', 'b-seal-top'],
    ['HIGHFAST', 'research', 'research', 5, 'A family of compact vertical takeoff and landing aircraft for transporting people and critical cargo.', 'Vertical takeoff aircraft', 'b-highfast'],
    ['BACKEYE', 'research', 'research', 5, 'An external view system for remotely operated vehicles.', 'External views for vehicles', 'pr-backeye'],
    ['SHIELD', 'research', 'research', 6, 'A family of combat and protection systems for vehicles, robotic platforms, and fixed sites.', 'Modular protection systems', 'pr-shield'],
    ['ARROWHEAD', 'research', 'research', 6, 'A family of containerized unmanned interceptors.', 'A family of unmanned interceptors', 'pr-arrowhead']
  ];
  /* описания направлений для ленты */
  DD.dirDesc = [
    'Platforms for management, analytics, and work assistance. The digital foundation that the other products connect to.',
    'Compatible components, kits, and software tools for building unmanned platforms.',
    'A specialized marketplace for choosing, buying, and selling gear and equipment.',
    'Modular personal equipment: protection, clothing, exoskeleton modules, and wearable electronics.',
    'A distributed network for people and vehicles, and autonomous sensor systems for land, air, and sea.',
    'Ground, maritime, and aerial platforms with interchangeable payloads and shared control systems.',
    'Modular protection systems for vehicles and sites, and a family of unmanned interceptors.'
  ];

  /* ---------- Иконки: единый набор, сетка 24, контур 1.6 ---------- */
  var I = {
    soft: '<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.2"/><path d="M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5"/>',
    uas: '<circle cx="7" cy="7" r="3.7"/><circle cx="17" cy="7" r="3.7"/><circle cx="7" cy="17" r="3.7"/><circle cx="17" cy="17" r="3.7"/>',
    ecom: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    gear: '<path d="M4 14.5a8 8 0 0116 0V17a1.5 1.5 0 01-1.5 1.5H16L14.5 15H4z"/><path d="M4 14.5V17a1.5 1.5 0 001.5 1.5H9"/>',
    comms: '<path d="M3 8.2l2.7-4.6 2.7 4.6zM15.4 5.4l2.1-3.6 2.1 3.6zM16.8 15.6l2-3.4 2 3.4zM5.4 21.2l2-3.4 2 3.4z"/><path d="M7.9 6.4l7.8-1.9M7.4 8.2l10.2 5.2M6.6 8.4l.7 9.2"/>',
    tech: '<path d="M2.5 12.5l3.2-4.3h10.6l5.2 4.3v2.3h-19z"/><circle cx="6.6" cy="17.6" r="2.3"/><circle cx="12" cy="17.6" r="2.3"/><circle cx="17.4" cy="17.6" r="2.3"/>',
    def: '<path d="M12 3l7.5 3v5.4c0 4.4-3.1 7.9-7.5 9.6-4.4-1.7-7.5-5.2-7.5-9.6V6z"/><path d="M8.6 12.4a3.4 3.4 0 016.8 0"/><path d="M12 12.3v.01"/>',
    eco: '<path d="M10.6 10.6H6.4a3 3 0 01-3-3V6.4a3 3 0 013-3h1.2a3 3 0 013 3zM13.4 10.6V6.4a3 3 0 013-3h1.2a3 3 0 013 3v1.2a3 3 0 01-3 3zM10.6 13.4v4.2a3 3 0 01-3 3H6.4a3 3 0 01-3-3v-1.2a3 3 0 013-3zM13.4 13.4h4.2a3 3 0 013 3v1.2a3 3 0 01-3 3h-1.2a3 3 0 01-3-3z"/>',
    docs: '<path d="M4 5h13M4 9.7h16M4 14.3h11M4 19h16"/>',
    mission: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.6"/><path d="M12 1.8V4M12 20v2.2M1.8 12H4M20 12h2.2"/>',
    goal: '<path d="M3 20l6.2-10.5 4 6.4 2.4-3.4L21 20z"/><path d="M9.2 9.5V3.2l4.3 1.9-4.3 1.9"/>',
    problem: '<path d="M12 3.4l9.2 16.2H2.8z"/><path d="M12 10v4.4M12 17.2v.01"/>',
    solution: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.4"/><path d="M8.4 12.3l2.5 2.5 4.8-5.4"/>',
    ne: '<path d="M7 17L17 7M9 7h8v8"/>',
    right: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    left: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    down: '<path d="M12 4v16M6 14l6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M4 8.5h16M4 15.5h16"/>',
    code: '<path d="M8 6L3 12l5 6M16 6l5 6-5 6M14 4l-4 16"/>',
    signal: '<circle cx="12" cy="12" r="2"/><path d="M7.5 7.5a6.4 6.4 0 000 9M16.5 7.5a6.4 6.4 0 010 9M4.7 4.7a10.3 10.3 0 000 14.6M19.3 4.7a10.3 10.3 0 010 14.6"/>',
    layers: '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/>',
    factory: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 4v16"/>',
    replay: '<path d="M4.5 12a7.5 7.5 0 107.5-7.5H7.5"/><path d="M10.5 1.8l-3 2.7 3 2.7"/>'
  };
  DD.I = I; /* набор можно дополнять со страницы */
  DD.ic = function (name, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (I[name] || '') + '</svg>'; };
  DD.st = function (kind, label) { return '<span class="st st--' + kind + '"><i></i>' + label + '</span>'; };
  /* <i data-ic="name" data-cls="ic--l"></i> в разметке заменяется на иконку */
  DD.icons = function (root) {
    (root || document).querySelectorAll('[data-ic]').forEach(function (el) { el.outerHTML = DD.ic(el.getAttribute('data-ic'), el.getAttribute('data-cls') || ''); });
  };

  /* ---------- Знак логотипа одной линией (для загрузочных экранов) ---------- */
  DD.sign = '<svg viewBox="0 0 226.14 268.88" fill="none" aria-hidden="true"><path pathLength="1" d="M223.75 141.52L154.55 261.37C153.32 263.5 151.54 265.27 149.41 266.5C147.28 267.73 144.86 268.38 142.4 268.38L5.18 268.38C4.54 268.37 3.9 268.23 3.32 267.97C2.73 267.71 2.2 267.33 1.77 266.86C1.33 266.38 1.01 265.83 0.8 265.22C0.59 264.61 0.51 263.97 0.56 263.32C0.61 262.47 0.9 261.65 1.4 260.96L69.22 169.48C69.66 168.89 70.23 168.41 70.89 168.09C71.55 167.75 72.27 167.58 73.01 167.58C73.74 167.58 74.46 167.75 75.12 168.09C75.78 168.42 76.35 168.9 76.79 169.5L144.44 262.59C144.78 263.06 145.28 263.39 145.85 263.52C146.42 263.64 147.02 263.54 147.52 263.25C148.03 262.96 148.41 262.5 148.58 261.95C148.77 261.4 148.74 260.8 148.5 260.27L101.84 155.36C101.53 154.68 101.39 153.94 101.43 153.2C101.48 152.08 101.93 151.01 102.7 150.19C103.47 149.38 104.51 148.87 105.62 148.76L219.76 136.72C220.32 136.65 220.83 136.37 221.2 135.94C221.57 135.52 221.78 134.97 221.78 134.41C221.78 133.84 221.57 133.3 221.2 132.87C220.83 132.45 220.32 132.18 219.76 132.1L105.62 120.12C104.88 120.05 104.17 119.8 103.55 119.39C102.93 118.98 102.41 118.44 102.04 117.79C101.67 117.15 101.46 116.43 101.43 115.68C101.39 114.94 101.53 114.2 101.84 113.52L148.5 8.67C148.74 8.15 148.78 7.55 148.6 6.99C148.42 6.44 148.04 5.98 147.54 5.68C147.03 5.39 146.44 5.3 145.86 5.42C145.3 5.55 144.8 5.88 144.46 6.35L76.8 99.44C76.37 100.04 75.79 100.52 75.12 100.85C74.47 101.18 73.74 101.36 73.01 101.36C72.28 101.36 71.55 101.18 70.9 100.85C70.24 100.52 69.66 100.03 69.22 99.44L1.41 7.96C0.92 7.26 0.63 6.44 0.57 5.58C0.5 4.72 0.67 3.84 1.06 3.07C1.44 2.3 2.02 1.66 2.74 1.2C3.47 0.74 4.31 0.5 5.17 0.51L142.39 0.51C144.85 0.5 147.27 1.15 149.4 2.38C151.54 3.61 153.31 5.38 154.54 7.51L223.75 127.48C224.99 129.62 225.64 132.05 225.63 134.52C225.63 136.97 224.98 139.39 223.75 141.52Z"/></svg>';

  /* ---------- Загрузка: реальная предзагрузка картинок и шрифтов, но не короче min ---------- */
  DD.load = function (o) {
    var min = DD.reduced ? 300 : (o.min || 2000), t0 = Date.now(), done = 0, list = o.assets || [], total = list.length + 1, shown = 0, fin = false;
    var bump = function () { done++; };
    list.forEach(function (src) { var im = new Image(); im.onload = im.onerror = bump; im.src = src; });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(bump); else bump();
    setTimeout(function () { done = total; }, 6000); /* страховка: загрузка не висит дольше 6 секунд */
    var iv = setInterval(function () {
      var byTime = Math.min(1, (Date.now() - t0) / min), byNet = done / total;
      var target = Math.min(byTime, byNet * .9 + (byNet >= 1 ? .1 : 0));
      shown += (target - shown) * .18; if (target >= 1 && shown > .995) shown = 1;
      if (o.onProgress) o.onProgress(shown);
      if (shown >= 1 && !fin) { fin = true; clearInterval(iv); document.body.classList.remove('is-loading'); if (o.onDone) o.onDone(); }
    }, 16);
  };

  /* ---------- Появление при входе в экран, один раз ---------- */
  DD.reveal = function (root) {
    var els = (root || document).querySelectorAll('[data-rv],.lines[data-auto]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  };
  /* текст по словам для подсветки при прокрутке */
  DD.words = function (el) {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    var ws = el.querySelectorAll('.w');
    var up = function () {
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      var p = (vh * .82 - r.top) / (r.height + vh * .32); p = Math.max(0, Math.min(1, p));
      var k = Math.round(p * ws.length);
      ws.forEach(function (w, i) { w.classList.toggle('on', DD.reduced || i < k); });
    };
    window.addEventListener('scroll', up, { passive: true }); window.addEventListener('resize', up); up();
  };
  /* счетчик */
  DD.count = function (el, to, ms) {
    if (DD.reduced) { el.textContent = to; return; }
    var t0 = Date.now(), iv = setInterval(function () {
      var p = Math.min(1, (Date.now() - t0) / (ms || 1400)), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e); if (p >= 1) clearInterval(iv);
    }, 24);
  };
  /* прогресс прокрутки элемента: 0 когда верх у низа окна, 1 когда низ у верха */
  DD.onScroll = function (fn) { var f = function () { fn(window.pageYOffset || 0, window.innerHeight); }; window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f); f(); };

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
})();
