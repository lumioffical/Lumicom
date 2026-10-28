/* VELTOR AUTO — scripts (demo site). Vanilla JS, IIFE, no external calls. */
(function () {
  'use strict';

  /* ============================================================
     DATA: services catalog (demo figures)
     ============================================================ */
  var SERVICES = [
    {
      id: 'computer-diagnostics',
      title: 'Компьютерная диагностика',
      category: 'Диагностика',
      priceFrom: 1500,
      priceNote: 'за блок или полный сценарий',
      time: '40–60 мин',
      short: 'Считываем и расшифровываем ошибки электронных блоков: двигатель, АКПП, ABS, SRS. Результат — заключение на русском, без «магии».',
      text: 'Подключаем дилерский сканер к OBD-порту и снимаем коды ошибок со всех доступных блоков. Затем смотрим датчики в реальном времени и, если нужно, устраиваем тест-драйв с записью данных. По итогам выдаём распечатку с расшифровкой и планом действий — так вы понимаете, что чинить сейчас, а что подождёт.',
      includes: [
        'Считывание и стирание кодов ошибок (двигатель, АКПП, ABS, SRS, климат)',
        'Анализ показаний датчиков в реальном времени',
        'Тест-драйв с записью параметров при «плавающей» неисправности',
        'Проверка состояния проводки и разъёмов по цепи ошибки',
        'Отчёт на русском языке с рекомендациями и приоритетами'
      ],
      extra: [
        'Углублённая проверка цепей осциллографом — от 900 ₽',
        'Адаптация и перепрошивка блоков — по договорённости',
        'Устранение самих неисправностей — цена по дефектовке'
      ],
      image: './images/obd-diagnostics.jpg',
      imageAlt: 'Мастер подключает диагностический ноутбук через OBD-адаптер к автомобилю',
      related: ['suspension-diagnostics', 'battery', 'maintenance']
    },
    {
      id: 'oil-change',
      title: 'Замена моторного масла',
      category: 'ТО',
      priceFrom: 2900,
      priceNote: 'работа + стандартный комплект',
      time: '40–50 мин',
      short: 'Замена масла и фильтра, подъёмник, осмотр на течи и контроль всех уровней. Уложимся в 30–40 минут ожидания.',
      text: 'Сливаем отработку на подъёмнике, меняем масляный фильтр, затягиваем сливную пробку с нормированным моментом. Масло и фильтр — ваш или наш: подбираем по VIN. После — сбрасываем сервисный интервал в бортовом компьютере и осматриваем двигатель на течи.',
      includes: [
        'Слив отработки на подъёмнике с утилизацией',
        'Замена масляного фильтра',
        'Залив масла до контрольного уровня',
        'Сброс сервисного интервала в бортовом компьютере',
        'Осмотр на подтёки: клапанной крышки, поддона, датчиков'
      ],
      extra: [
        'Масло и фильтр под ваш VIN — по прайсу наличия',
        'Промывка двигателя перед заливкой — от 1 200 ₽',
        'Замена воздушного или салонного фильтра — от 600 ₽'
      ],
      image: './images/oil-refill.jpg',
      imageAlt: 'Заливка свежего моторного масла через воронку',
      related: ['maintenance', 'computer-diagnostics', 'ac-service']
    },
    {
      id: 'suspension-diagnostics',
      title: 'Диагностика подвески',
      category: 'Подвеска',
      priceFrom: 1200,
      priceNote: '',
      time: '30–40 мин',
      short: 'Осмотр на подъёмнике с люкт-тестом: стойки, рычаги, сайлентблоки, шаровые, ступичные подшипники. С фотоотчётом.',
      text: 'Поднимаем автомобиль, вручную проверяем люфты в каждом узле и осматриваем амортизаторы на подтёки. Прокатываем машину через люкт-детектор, прослушиваем стуки. Вы получаете фотоотчёт и смету: что менять сейчас, что — в следующем цикле ТО.',
      includes: [
        'Осмотр всех узлов подвески на подъёмнике',
        'Люфт-тест рычагов, шаровых опор и рулевых тяг',
        'Проверка амортизаторов и опорных подшипников',
        'Контроль состояния пыльников и чехлов ШРУС',
        'Фотоотчёт и расчёт сметы с приоритетами'
      ],
      extra: [
        'Замена выявленных узлов — по смете',
        'Сход-развал после ремонта — от 2 700 ₽',
        'Проверка на диагностическом стенде тормозов'
      ],
      image: './images/suspension-measure.jpg',
      imageAlt: 'Мастер проверяет узлы подвески на подъёмнике',
      related: ['shock-absorbers', 'wheel-alignment', 'brake-pads']
    },
    {
      id: 'brake-pads',
      title: 'Замена тормозных колодок',
      category: 'Тормоза',
      priceFrom: 2500,
      priceNote: 'за одну ось',
      time: '1–2 ч',
      short: 'Колодки на переднюю или заднюю ось: снятие, очистка, замена, притирка. Проверяем диски и суппорты по ходу работы.',
      text: 'Снимаем колёса, отводим поршни суппортов, меняем колодки, чистим и смазываем направляющие. Заодно замеряем толщину дисков и осматриваем шланги — если ресурс на исходе, сразу скажем. После замены проверяем работу на ровном ходу и делаем контрольное торможение.',
      includes: [
        'Снятие и установка колёс',
        'Замена колодок на одной оси',
        'Очистка и смазка направляющих суппорта',
        'Замер толщины тормозных дисков',
        'Контрольный тест тормозов после установки'
      ],
      extra: [
        'Колодки — ваш или наш комплект по VIN',
        'Ремонт или ревизия суппорта — от 1 800 ₽',
        'Замена тормозной жидкости — от 1 100 ₽'
      ],
      image: './images/brake-caliper.jpg',
      imageAlt: 'Тормозной суппорт и диск крупным планом',
      related: ['brake-discs', 'maintenance', 'suspension-diagnostics']
    },
    {
      id: 'maintenance',
      title: 'Комплексное ТО',
      category: 'ТО',
      priceFrom: 5900,
      priceNote: 'от, по регламенту вашего VIN',
      time: '2–3 ч',
      short: 'Полное техобслуживание по регламенту: масла, фильтры, тормоза, подвеска, электрика — с письменным заключением.',
      text: 'Проходит по чек-листу из 60 пунктов: моторное масло и фильтры, свечи, тормозная система, подвеска, ремни, уровни техжидкостей, электрика и свет. По завершении — заключение с фотофиксацией: что заменено, что под наблюдением, что ждать через 10 000 км.',
      includes: [
        'Замена моторного масла и всех основных фильтров',
        'Осмотр тормозной системы и подвески на подъёмнике',
        'Проверка свечей, ремней и патрубков',
        'Диагностика света, АКБ и уровней жидкостей',
        'Заключение с фотофиксацией и планом на следующий цикл'
      ],
      extra: [
        'Оригинальные запчасти и масла — по прайсу',
        'Замена тормозной жидкости — от 1 100 ₽',
        'Сход-развал — от 2 700 ₽'
      ],
      image: './images/hero-workshop.jpg',
      imageAlt: 'Автомобиль на подъёмнике в мастерской во время ТО',
      related: ['oil-change', 'computer-diagnostics', 'brake-pads']
    },
    {
      id: 'brake-discs',
      title: 'Замена тормозных дисков',
      category: 'Тормоза',
      priceFrom: 4200,
      priceNote: 'за одну ось',
      time: '1,5–2,5 ч',
      short: 'Диски и колодки на ось: замена с чисткой ступицы, шумоизоляционными пластинами и контролем биения.',
      text: 'Снимаем старые диски, чистим привалочные плоскости ступицы — ржавчина и забоины здесь дают вибрацию на руле. Ставим новые диски с колодками, затягиваем по моменту производителя. Обязательно проверяем на боковое биение и делаем притирочный тест-драйв.',
      includes: [
        'Демонтаж изношенных дисков и колодок',
        'Очистка привалочных плоскостей ступицы',
        'Установка новых дисков по моменту затяжки',
        'Контроль бокового биения индикатором',
        'Притирка колодок и контрольная поездка'
      ],
      extra: [
        'Диски и колодки — по выбору из каталога',
        'Замена тормозной жидкости — от 1 100 ₽',
        'Проточка дисков без замены — от 2 000 ₽'
      ],
      image: './images/brake-caliper.jpg',
      imageAlt: 'Вентилируемый тормозной диск и суппорт',
      related: ['brake-pads', 'wheel-alignment', 'maintenance']
    },
    {
      id: 'shock-absorbers',
      title: 'Замена амортизаторов',
      category: 'Подвеска',
      priceFrom: 3800,
      priceNote: 'за пару',
      time: '2–4 ч',
      short: 'Амортизаторы или стойки в сборе: замена парой, с которыми подвеска снова становится предсказуемой.',
      text: 'Меняем амортизаторы только парой — с разным износом машина ведёт себя непредсказуемо в поворотах и на торможении. Распасовываем пружины стяжками, меняем стойки или картриджи, обновляем опорные подшипники и пыльники. После — проверка развала и поездка-тест.',
      includes: [
        'Разборка стойки со съёмом пружины стяжками',
        'Замена амортизаторов на оси (парой)',
        'Обновление опорных подшипников и пыльников',
        'Затяжка всех соединений по нормативам',
        'Пробная поездка и осмотр на подтёки'
      ],
      extra: [
        'Пружины и опоры — по прайсу каталога',
        'Сход-развал после замены — от 2 700 ₽',
        'Замена пружин отдельно — от 2 400 ₽'
      ],
      image: './images/suspension-work.jpg',
      imageAlt: 'Мастер работает с узлами подвески под поднятым автомобилем',
      related: ['suspension-diagnostics', 'wheel-alignment', 'maintenance']
    },
    {
      id: 'wheel-alignment',
      title: 'Сход-развал 3D',
      category: 'Подвеска',
      priceFrom: 2700,
      priceNote: '',
      time: '40–50 мин',
      short: 'Стенд с 3D-камерами: точные углы установки колёс, протокол до/после на ваше имя.',
      text: 'Устанавливаем автомобиль на стенд, считываем углы камерами и сверяем с заводскими нормами конкретно вашего кузова. Докручиваем тяги и эксцентрики до регламента. Кладём в бардачок протокол «до/после» — документ, который стоит показывать и при продаже.',
      includes: [
        'Установка авто на стенд и базирование',
        'Считывание текущих углов 3D-камерами',
        'Регулировка до заводских значений по VIN',
        'Печать протокола до/после',
        'Проверка рулевого колеса в прямом положении'
      ],
      extra: [
        'Замена изношенных рулевых тяг или наконечников — по смете',
        'Диагностика подвески перед стендом — от 1 200 ₽',
        'Углы для нестандартной посадки — по договорённости'
      ],
      image: './images/wheel-alignment.jpg',
      imageAlt: 'Автомобиль на стенде сход-развала с 3D-мишенями на колёсах',
      related: ['suspension-diagnostics', 'shock-absorbers', 'maintenance']
    },
    {
      id: 'battery',
      title: 'Диагностика и замена АКБ',
      category: 'Прочее',
      priceFrom: 900,
      priceNote: '',
      time: '30–40 мин',
      short: 'Нагрузочная вилка, тест генератора и утечек: скажем честно, жива ли батарея, и если нет — подберём по VIN.',
      text: 'Проверяем напряжение покоя и под нагрузкой, тестируем генератор и ток утечки в бортсети. Если батарея ещё жива — не станем навязывать замену. Если подошёл конец — подберём АКБ по ёмкости и габаритам вашего авто, установим и пропишем в бортовом компьютере при необходимости.',
      includes: [
        'Тест напряжения и ёмкости нагрузочной вилкой',
        'Проверка тока утечки бортовой сети',
        'Тест генератора и реле-регулятора',
        'Зачистка клемм и защита контактной смазкой',
        'Рекомендация: обслуживать, заряжать или менять'
      ],
      extra: [
        'Новый аккумулятор — по прайсу наличия',
        'Регистрация АКБ в электронике (VAG, BMW) — от 800 ₽',
        'Дозарядка стендом — от 500 ₽'
      ],
      image: './images/oil-cap.jpg',
      imageAlt: 'Моторный отсек с аккумулятором и масляной горловиной',
      related: ['computer-diagnostics', 'maintenance', 'oil-change']
    },
    {
      id: 'ac-service',
      title: 'Обслуживание кондиционера',
      category: 'Прочее',
      priceFrom: 3300,
      priceNote: '',
      time: '40–60 мин',
      short: 'Диагностика системы, эвакуация и заправка фреоном по весам, поиск утечек ультрафиолетом.',
      text: 'Подключаем станцию, замеряем давление, эвакуируем хладагент по весам. Если фреон ушёл — ищем утечку УФ-краской и заменяем уплотнители. Заправляем строго по норме конкретной модели, добавляем масло. В конце — замер температуры в салоне и проверка на шум и запах.',
      includes: [
        'Замер рабочего давления в контуре',
        'Эвакуация и взвешивание старого хладагента',
        'Вакуумирование системы и проверка герметичности',
        'Заправка фреоном по норме + масло для компрессора',
        'Дезинфекция испарителя при запахе — по запросу'
      ],
      extra: [
        'Замена трубок и уплотнителей — по смете',
        'Замена салонного фильтра — от 600 ₽',
        'Замена компрессора — по дефектовке'
      ],
      image: './images/oil-cap.jpg',
      imageAlt: 'Моторный отсек с элементами системы охлаждения',
      related: ['oil-change', 'computer-diagnostics', 'maintenance']
    }
  ];

  /* ============================================================
     Ping helpers
     ============================================================ */
  function findService(id) {
    var s = SERVICES;
    for (var i = 0; i < s.length; i++) {
      if (s[i].id === id) return i;
    }
    return -1;
  }

  function money(n) {
    return n.toLocaleString('ru-RU') + ' ₽';
  }

  function priceLabel(s) {
    return 'от ' + money(s.priceFrom);
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ============================================================
     Header: scroll state
     ============================================================ */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var update = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ============================================================
     Burger menu
     ============================================================ */
  function initNav() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.site-nav');
    if (!burger || !nav) return;

    var setState = function (open) {
      document.body.classList.toggle('menu-locked', open);
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    burger.addEventListener('click', function () {
      setState(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setState(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setState(false);
        burger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        setState(false);
      }
    });
  }

  /* ============================================================
     Reveal on scroll
     ============================================================ */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-visible');
      return;
    }

    var order = 0;
    var lastGroup = -1;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var groups = [];
    items.forEach(function (item) {
      var parent = item.parentElement;
      var gi = groups.indexOf(parent);
      if (gi === -1) {
        groups.push(parent);
        gi = groups.length - 1;
      }
      if (gi !== lastGroup) {
        order = 0;
        lastGroup = gi;
      } else {
        order++;
      }
      item.style.setProperty('--rd', Math.min(order * 70, 420) + 'ms');
      io.observe(item);
    });
  }

  /* ============================================================
     Counters
     ============================================================ */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var finish = function (node) {
      var target = parseFloat(node.getAttribute('data-count'));
      var after = node.getAttribute('data-after') || '';
      node.textContent = target.toLocaleString('ru-RU');
      node.setAttribute('data-after', after);
    };

    var animate = function (node) {
      if (reduced) { finish(node); return; }
      var target = parseFloat(node.getAttribute('data-count'));
      var after = node.getAttribute('data-after') || '';
      var dur = 1100;
      var start = null;
      var tick = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        node.textContent = val.toLocaleString('ru-RU');
        if (p < 1) {
          window.requestAnimationFrame(tick);
        } else {
          node.textContent = target.toLocaleString('ru-RU');
          node.setAttribute('data-after', after);
        }
      };
      window.requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(finish);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) {
      c.textContent = '0';
      io.observe(c);
    });
  }

  /* ============================================================
     Service detail page (?service=id)
     ============================================================ */
  function initServiceDetail() {
    var root = document.getElementById('service-detail');
    if (!root) return;

    function render(id) {
      var idx = findService(id);
      if (idx === -1) idx = 0;
      var current = SERVICES[idx];
      var s = current;

      /* Select */
      var select = document.getElementById('service-select');
      select.innerHTML = '';
      SERVICES.forEach(function (item) {
        var opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.title;
        if (item.id === s.id) opt.selected = true;
        select.appendChild(opt);
      });

      /* Title + breadcrumb */
      document.getElementById('detail-title').textContent = s.title;
      var crumb = document.getElementById('detail-crumb');
      crumb.textContent = s.title;
      document.title = 'VELTOR AUTO — ' + s.title;

      /* Figure */
      var img = document.getElementById('detail-image');
      img.src = s.image;
      img.alt = s.imageAlt;
      document.getElementById('detail-figure-cap').textContent = 'VT·' + String(1 + idx).padStart(2, '0') + ' — ' + s.category.toUpperCase();

      /* Text */
      document.getElementById('detail-text').textContent = s.text;
      document.getElementById('detail-short').textContent = s.short;

      /* Includes */
      var inc = document.getElementById('detail-includes');
      inc.innerHTML = '';
      s.includes.forEach(function (txt, i) {
        var li = el('li');
        li.setAttribute('data-i', String(i + 1).padStart(2, '0'));
        li.appendChild(el('span', null, txt));
        inc.appendChild(li);
      });

      /* Price + meta */
      document.getElementById('detail-price').textContent = priceLabel(s);
      document.getElementById('detail-price-note').textContent = s.priceNote || 'итог зависит от автомобиля и объёма работ';
      document.getElementById('detail-time').textContent = s.time;
      document.getElementById('detail-cat').textContent = s.category;

      /* Extra */
      var ex = document.getElementById('detail-extra');
      ex.innerHTML = '';
      s.extra.forEach(function (txt) {
        ex.appendChild(el('li', null, txt));
      });

      /* Form link */
      document.getElementById('detail-cta').href = './contacts.html?service=' + s.id + '#form';

      /* Related */
      var rel = document.getElementById('detail-related');
      rel.innerHTML = '';
      s.related.forEach(function (rid) {
        var ri = findService(rid);
        if (ri === -1) return;
        var r = SERVICES[ri];
        rel.appendChild(card(r, 3, ri));
      });
    }

    function card(s, catIdx, serviceIdx) {
      var li = el('li', 'card reveal is-visible');
      li.appendChild(el('span', 'card-index mono', 'VT·' + String(serviceIdx + 1).padStart(2, '0') + ' — ' + s.category.toUpperCase()));
      var link = document.createElement('a');
      link.href = './service-detail.html?service=' + s.id;
      link.appendChild(el('h3', null, s.title));
      var p = el('p', null, s.short);
      p.style.display = '-webkit-box';
      p.style.webkitLineClamp = '2';
      p.style.webkitBoxOrient = 'vertical';
      p.style.overflow = 'hidden';
      link.appendChild(p);
      link.setAttribute('aria-label', s.title + ' — подробнее и запись');
      li.appendChild(link);
      var meta = el('div', 'card-meta');
      meta.appendChild(el('span', 'card-price', priceLabel(s)));
      meta.appendChild(el('span', 'card-link', 'Подробнее'));
      li.appendChild(meta);
      return li;
    }

    render(getParam('service'));

    var select = document.getElementById('service-select');
    select.addEventListener('change', function () {
      var id = select.value;
      if (findService(id) === -1) return;
      try {
        window.location.replace('./service-detail.html?service=' + id);
      } catch (e) {
        window.location.href = './service-detail.html?service=' + id;
      }
    });
  }

  function getParam(name) {
    var search = window.location.search.replace(/^\?/, '');
    if (!search) return '';
    var parts = search.split('&');
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].split('=');
      if (decodeURIComponent(kv[0]) === name) {
        return decodeURIComponent(kv[1] || '').replace(/\+/g, ' ').trim();
      }
    }
    return '';
  }

  /* ============================================================
     FAQ accordion
     ============================================================ */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      var panel = item.querySelector('.faq-panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.classList.toggle('open', !open);
      });
    });
  }

  /* ============================================================
     Copy address
     ============================================================ */
  function initCopy() {
    var btn = document.getElementById('copy-address');
    if (!btn) return;
    var text = btn.getAttribute('data-copy') || btn.textContent;
    btn.addEventListener('click', function () {
      var done = function () {
        btn.classList.add('done');
        var label = btn.querySelector('.copy-label');
        if (label) label.textContent = 'Скопировано ✓';
        btn.setAttribute('aria-live', 'polite');
        window.setTimeout(function () {
          btn.classList.remove('done');
          if (label) label.textContent = 'Скопировать адрес';
        }, 2400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) { /* ensure not fatal */ }
    document.body.removeChild(ta);
  }

  /* ============================================================
     Booking form
     ============================================================ */
  function initForm() {
    var form = document.getElementById('booking-form');
    if (!form) return;

    /* Preselect service from ?service= */
    var wanted = getParam('service');
    var select = document.getElementById('f-service');
    if (wanted) {
      var i = findService(wanted);
      if (i !== -1) select.value = SERVICES[i].id;
    }

    var nameInput = document.getElementById('f-name');
    var phoneInput = document.getElementById('f-phone');
    var successBox = document.getElementById('form-success');

    function setErr(input, msg) {
      var err = document.getElementById(input.getAttribute('aria-describedby'));
      if (err) err.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    var PHONE_RE = /^(\+7|8)[\s\-\(]*(\d{3})[\s\-\)]*(\d{3})[\s\-]*(\d{2})[\s\-]*(\d{2})$/;

    function validName() {
      var v = nameInput.value.trim();
      if (v.length < 2) {
        setErr(nameInput, 'Укажите имя — минимум 2 символа.');
        return false;
      }
      setErr(nameInput, '');
      return true;
    }

    function validPhone() {
      if (!PHONE_RE.test(phoneInput.value.trim())) {
        setErr(phoneInput, 'Формат: +7 (912) 345-67-89 — российский мобильный.');
        return false;
      }
      setErr(phoneInput, '');
      return true;
    }

    nameInput.addEventListener('blur', validName);
    phoneInput.addEventListener('blur', validPhone);
    nameInput.addEventListener('input', function () { setErr(nameInput, ''); });
    phoneInput.addEventListener('input', function () { setErr(phoneInput, ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok1 = validName();
      var ok2 = validPhone();
      if (!ok1 || !ok2) {
        var firstInvalid = !ok1 ? nameInput : phoneInput;
        firstInvalid.focus();
        successBox.classList.add('hidden');
        successBox.setAttribute('aria-hidden', 'true');
        return;
      }
      successBox.classList.remove('hidden');
      successBox.setAttribute('aria-hidden', 'false');
      form.reset();
      document.getElementById('f-service').value = wanted && findService(wanted) !== -1 ? wanted : '';
    });
  }

  /* ============================================================
     Footer year
     ============================================================ */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ============================================================
     Boot
     ============================================================ */
  function boot() {
    initHeader();
    initNav();
    initReveal();
    initCounters();
    initServiceDetail();
    initFaq();
    initCopy();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
