/* ============================================================
   BYTECARE LAB — main.js
   Vanilla JS, IIFE, no modules, no fetch. Works over file://.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     SERVICE DATA (single source of truth for services.html cards
     and the symptom consultant on index.html)
     Prices are DEMO values: "prices are demonstration".
     ------------------------------------------------------------ */
  var SERVICES = [
    {
      id: 'cooler-cleaning',
      group: 'laptops',
      title: 'Чистка системы охлаждения ноутбука',
      desc: 'Разборка корпуса, продувка радиаторов и вентилятора, удаление пыли, замена термопрокладок по необходимости.',
      includes: ['Полная разборка до системы охлаждения', 'Чистка вентилятора и рёбер радиатора', 'Продувка и удаление пыли из корпуса', 'Контрольные замеры температур после работы'],
      extra: ['Замена термопрокладок — по необходимости', 'Замена термопасты — отдельная позиция', 'Замена вентилятора при износе'],
      time: '1,5–3 часа',
      priceFrom: 1800
    },
    {
      id: 'thermal-paste',
      group: 'laptops',
      title: 'Замена термопасты',
      desc: 'Снятие системы охлаждения, удаление старой пасты, нанесение новой качественной пасты с контролем слоя.',
      includes: ['Снятие кулерблока', 'Полное удаление старой термопасты', 'Нанесение новой пасты', 'Проверка температур под нагрузкой'],
      extra: ['Замена термопрокладок чипов памяти', 'Чистка системы охлаждения'],
      time: '1–2 часа',
      priceFrom: 1200
    },
    {
      id: 'os-install',
      group: 'laptops',
      title: 'Установка ОС и базового ПО',
      desc: 'Установка Windows или Linux, драйверов, обновлений. Перенос данных — по договорённости.',
      includes: ['Установка операционной системы', 'Установка всех драйверов', 'Обновления системы', 'Базовый набор программ'],
      extra: ['Перенос пользовательских данных', 'Настройка специфичного ПО', 'Лицензионные ключи — оплачиваются отдельно'],
      time: '1–2 часа',
      priceFrom: 1500
    },
    {
      id: 'ssd-upgrade',
      group: 'laptops',
      title: 'Замена или установка SSD и RAM',
      desc: 'Модернизация накопителя и памяти: перенос системы, клонирование диска, подбор совместимых модулей.',
      includes: ['Подбор совместимых комплектующих', 'Установка SSD и/или модулей памяти', 'Перенос системы и данных со старого диска', 'Проверка стабильности'],
      extra: ['Сами комплектующие (SSD, RAM) — оплачиваются отдельно'],
      time: '1–2 часа',
      priceFrom: 900
    },
    {
      id: 'keyboard',
      group: 'laptops',
      title: 'Замена или ремонт клавиатуры',
      desc: 'Замена клавиатуры целиком или отдельных клавиш, чистка после залития, восстановление шлейфов.',
      includes: ['Разборка и демонтаж клавиатуры', 'Установка новой клавиатуры', 'Проверка всех клавиш', 'Чистка контактов шлейфа'],
      extra: ['Новая клавиатура — оплачивается отдельно', 'Замена топкейса при повреждении креплений'],
      time: '1–2 часа',
      priceFrom: 1900
    },
    {
      id: 'screen',
      group: 'laptops',
      title: 'Замена матрицы ноутбука',
      desc: 'Подбор совместимой матрицы по модели и разрешению, аккуратная замена, проверка битых пикселей и подсветки.',
      includes: ['Подбор совместимой матрицы', 'Аккуратная замена', 'Проверка подсветки и равномерности', 'Тест битых пикселей'],
      extra: ['Матрица — оплачивается отдельно', 'Ремонт петель при люфте корпуса'],
      time: '1–2 часа',
      priceFrom: 2400
    },
    {
      id: 'liquid-diagnostics',
      group: 'laptops',
      title: 'Диагностика после залития жидкостью',
      desc: 'Разборка, оценка последствий залития, промывка платы, определение объёма необходимого ремонта.',
      includes: ['Полная разборка', 'Оценка коррозии и следов залития', 'Ультразвуковая или ручная промывка платы', 'Протокол: что ремонтируем, что под замену'],
      extra: ['Восстановительные работы на плате — по результату', 'Замена компонентов — отдельно'],
      time: '2–4 часа',
      priceFrom: 1400
    },
    {
      id: 'data-recovery',
      group: 'laptops',
      title: 'Восстановление данных',
      desc: 'Чтение данных с неисправных HDD/SSD и флешек. Восстановление логической структуры и удалённых файлов.',
      includes: ['Диагностика носителя', 'Восстановление файловой системы', 'Спасение данных на исправный носитель', 'Отчёт о восстановленных файлах'],
      extra: ['Работа с аппаратными неисправностями HDD', 'Новый носитель для записи данных'],
      time: '1–3 дня',
      priceFrom: 2500
    },
    {
      id: 'pc-repair',
      group: 'desktops',
      title: 'Ремонт ПК и апгрейд',
      desc: 'Диагностика стационарного компьютера, замена неисправных узлов, апгрейд под ваши задачи.',
      includes: ['Полная аппаратная диагностика', 'Проверка блока питания и температур', 'Замена или добавление узлов', 'Стресс-тест после работ'],
      extra: ['Комплектующие для апгрейда — оплачиваются отдельно'],
      time: '2–4 часа',
      priceFrom: 1200
    },
    {
      id: 'pc-build',
      group: 'build',
      title: 'Сборка ПК под ключ',
      desc: 'Подбор конфигурации под бюджет и задачи, сборка, укладка кабелей, установка системы и тесты.',
      includes: ['Подбор конфигурации и совместимости', 'Сборка и аккуратная укладка кабелей', 'Установка ОС и драйверов', 'Стресс-тесты и контроль температур'],
      extra: ['Комплектующие — по вашему бюджету', 'Дополнительное ПО по списку'],
      time: '1–2 дня',
      priceFrom: 3500
    },
    {
      id: 'gpu-service',
      group: 'desktops',
      title: 'Обслуживание видеокарты',
      desc: 'Чистка и замена термопасты на видеокартах, замена вентиляторов, диагностика артефактов.',
      includes: ['Полная разборка видеокарты', 'Замена термопасты GPU и памяти', 'Чистка рёбер радиатора и вентиляторов', 'Тест под нагрузкой'],
      extra: ['Вентиляторы — оплачиваются отдельно', 'Ремонт цепей питания — по результату диагностики'],
      time: '2–3 часа',
      priceFrom: 1500
    },
    {
      id: 'peripherals',
      group: 'peripherals',
      title: 'Ремонт периферии',
      desc: 'Клавиатуры, мыши, мониторы, гарнитуры и док-станции. Чистка, замена кабелей, восстановление разъёмов.',
      includes: ['Диагностика устройства', 'Чистка и восстановление контактов', 'Замена кабеля или разъёма', 'Тест после ремонта'],
      extra: ['Комплектующие (кабели, switches, панели) — отдельно'],
      time: 'от 1 часа',
      priceFrom: 700
    },
    {
      id: 'tuning',
      group: 'build',
      title: 'Ускорение и настройка системы',
      desc: 'Комплексная оптимизация Windows: автозагрузка, службы, охлаждение, свободное место, актуальные драйверы.',
      includes: ['Аудит автозагрузки и служб', 'Очистка системы от мусора', 'Обновление драйверов', 'Замеры производительности до/после'],
      extra: ['Апгрейд «железа», если настройки не помогут'],
      time: '1–2 часа',
      priceFrom: 1000
    },
    {
      id: 'diagnostics',
      group: 'laptops',
      title: 'Диагностика',
      desc: 'Аппаратная и программная диагностика по 24 точкам. Отдельная позиция прайса; при согласии на ремонт — входит в цену ремонта.',
      includes: ['Проверка по 24 точкам (см. страницу диагностики)', 'Замеры температур и напряжений', 'Проверка носителя и памяти', 'Письменное заключение'],
      extra: ['При согласии на ремонт — входит в цену ремонта', 'При отказе от ремонта — 700 ₽'],
      time: '40–90 минут',
      priceFrom: 700
    }
  ];

  /* symptom → service id mapping for the index consultant */
  var SYMPTOM_MAP = [
    { chip: 'Греется', service: 'cooler-cleaning' },
    { chip: 'Не включается', service: 'pc-repair' },
    { chip: 'Синий экран', service: 'diagnostics' },
    { chip: 'Долго грузится', service: 'ssd-upgrade' },
    { chip: 'Залили жидкостью', service: 'liquid-diagnostics' },
    { chip: 'Шумит и трещит', service: 'cooler-cleaning' },
    { chip: 'Упала производительность', service: 'tuning' }
  ];

  /* ------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------ */
  function fmtPrice(n) { return 'от ' + n.toLocaleString('ru-RU') + ' ₽'; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function buildSvgChecklist() {
    var tick = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M2.5 8.5l3.5 3.5 7-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    $all('[data-checklist]').forEach(function (list) {
      var items = $all('li', list);
      items.forEach(function (li) {
        if (!li.querySelector('.tick')) {
          var span = document.createElement('span');
          span.className = 'tick';
          span.innerHTML = tick;
          li.insertBefore(span, li.firstChild);
        }
      });
      /* staggered "live" checkmarks */
      var delay = 0;
      items.forEach(function (li, i) {
        var t = setTimeout(function () { li.classList.add('is-on'); }, delay);
        delay += 60;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          clearTimeout(t);
          li.classList.add('is-on');
        }
      });
    });
  }

  function buildServiceCards() {
    /* used on services.html: render detailed cards from SERVICES into groups */
    var root = $('#services-root .wrap') || $('#services-root');
    if (!root) return;
    var groups = [
      { key: 'laptops', code: 'GRP-01', title: 'Ноутбуки' },
      { key: 'desktops', code: 'GRP-02', title: 'Настольные ПК' },
      { key: 'build', code: 'GRP-03', title: 'Сборка и тюнинг' },
      { key: 'peripherals', code: 'GRP-04', title: 'Периферия' }
    ];
    var html = '';
    groups.forEach(function (g) {
      var items = SERVICES.filter(function (s) { return s.group === g.key; });
      if (!items.length) return;
      html += '<section class="group" id="' + g.key + '" aria-labelledby="' + g.key + '-title">';
      html += '<div class="group__head"><h2 id="' + g.key + '-title">' + g.title + '</h2><span class="group__code">' + g.code + '</span></div>';
      html += '<div class="cards-grid">';
      items.forEach(function (s) {
        html += '<article class="service-detail" id="' + s.id + '" tabindex="-1">';
        html += '<div><h3>' + s.title + '</h3><div class="meta-row">';
        html += '<span class="badge">' + fmtPrice(s.priceFrom) + '</span>';
        html += '<span class="badge">~ ' + s.time + '</span>';
        html += '</div><p class="desc">' + s.desc + '</p>';
        html += '<ul class="checklist" data-checklist>';
        s.includes.forEach(function (inc) { html += '<li>' + inc + '</li>'; });
        html += '</ul></div>';
        html += '<div><span class="coord">Оплачивается отдельно</span><ul style="margin-top:8px;color:var(--graphite);font-size:.92rem">';
        s.extra.forEach(function (e) { html += '<li>' + e + '</li>'; });
        html += '</ul>';
        html += '<p class="demo-note" style="margin-top:14px">Цена демонстрационная; итог зависит от модели и состояния устройства.</p>';
        html += '</div></article>';
      });
      html += '</div></section>';
    });
    root.innerHTML = html;
    buildSvgChecklist();
  }

  function buildIndexServiceCards() {
    /* short cards on index.html */
    var root = $('#index-services');
    if (!root) return;
    var shortList = ['cooler-cleaning', 'diagnostics', 'thermal-paste', 'ssd-upgrade', 'screen', 'keyboard', 'pc-repair', 'pc-build', 'data-recovery', 'liquid-diagnostics', 'tuning'];
    var html = '';
    shortList.forEach(function (id) {
      var s = SERVICES.filter(function (x) { return x.id === id; })[0];
      if (!s) return;
      html += '<article class="card" id="svc-' + s.id + '" data-service="' + s.id + '" tabindex="-1">';
      html += '<span class="card__id">' + s.id + '</span>';
      html += '<h3>' + s.title + '</h3>';
      html += '<p>' + s.desc + '</p>';
      html += '<div class="card__footer"><span class="card__price">' + fmtPrice(s.priceFrom) + '</span>';
      html += '<a class="card__link" href="./services.html#' + s.id + '">Подробнее →</a></div>';
      html += '</article>';
    });
    root.innerHTML = html;
  }

  function initChips() {
    var block = $('#consultant');
    if (!block) return;
    var chips = $all('.chip', block);
    var result = $('.chips-result', block);
    var title = $('#chips-result-title');
    var text = $('#chips-result-text');
    chips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () {
        var pressed = chip.getAttribute('aria-pressed') === 'true';
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        $all('.card.is-highlighted').forEach(function (c) { c.classList.remove('is-highlighted'); });
        if (pressed) { result.classList.remove('is-visible'); return; }
        chip.setAttribute('aria-pressed', 'true');
        var svcId = null;
        SYMPTOM_MAP.forEach(function (m) { if (m.chip === chip.textContent.trim()) svcId = m.service; });
        var card = $('#svc-' + svcId);
        if (!svcId || !card) return;
        card.classList.add('is-highlighted');
        if (title) title.textContent = 'Рекомендуем: ' + (function () {
          var s = SERVICES.filter(function (x) { return x.id === svcId; })[0];
          return s ? s.title : '';
        })();
        if (text) {
          var s2 = SERVICES.filter(function (x) { return x.id === svcId; })[0];
          text.innerHTML = s2.desc + ' Цена ' + fmtPrice(s2.priceFrom) + ', ориентировочно ' + s2.time + '.';
        }
        var link = $('#chips-result-link');
        if (link) link.setAttribute('href', './services.html#' + svcId);
        result.classList.add('is-visible');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  function initAccordion() {
    $all('.faq__item').forEach(function (item) {
      var btn = $('.faq__q', item);
      var ans = $('.faq__a', item);
      if (!btn || !ans) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', ans.id = ans.id || 'faq-a-' + Math.abs(hashCode(item.id || btn.textContent)));
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && item.classList.contains('is-open')) {
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function hashCode(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) | 0; }
    return h;
  }

  function initBurger() {
    var burger = $('.burger');
    var nav = $('.site-nav');
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
    $all('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initReveal() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = $all('.reveal');
    if (reduce) { els.forEach(function (el) { el.classList.add('is-visible'); }); return; }
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var nums = $all('[data-count]');
    if (!nums.length) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animate = function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      var target = parseInt(el.dataset.count, 10);
      if (isNaN(target) || reduce) { el.textContent = target.toLocaleString('ru-RU'); return; }
      var start = null, dur = 900;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('ru-RU');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window) || reduce) { nums.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function initCopyButtons() {
    $all('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.dataset.copy || '';
        var done = function () {
          btn.classList.add('is-copied');
          var old = btn.textContent;
          btn.textContent = 'Скопировано ✓';
          setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.textContent = old;
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(done, function () { fallbackCopy(value, done); });
        } else {
          fallbackCopy(value, done);
        }
      });
    });
  }

  function fallbackCopy(value, done) {
    var ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
    document.body.removeChild(ta);
    done();
  }

  function initForm() {
    var form = $('#request-form');
    if (!form) return;
    var success = $('#form-success');
    var phoneRe = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

    function setError(id, on) {
      var field = $('#' + id);
      if (!field) return;
      var wrap = field.closest('.field');
      if (wrap) wrap.classList.toggle('has-error', !!on);
      field.setAttribute('aria-invalid', on ? 'true' : 'false');
    }

    function validate() {
      var ok = true;
      var name = $('#f-name');
      var phone = $('#f-phone');
      var device = $('#f-device');
      var problem = $('#f-problem');
      if (!name.value.trim() || name.value.trim().length < 2) { setError('f-name', true); ok = false; } else setError('f-name', false);
      if (!phoneRe.test(phone.value.trim())) { setError('f-phone', true); ok = false; } else setError('f-phone', false);
      if (!device.value) { setError('f-device', true); ok = false; } else setError('f-device', false);
      if (problem.value.trim().length < 10) { setError('f-problem', true); ok = false; } else setError('f-problem', false);
      return ok;
    }

    ['f-name', 'f-phone', 'f-device', 'f-problem'].forEach(function (id) {
      var el = $('#' + id);
      if (el) el.addEventListener('input', function () { setError(id, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstErr = $('.field.has-error input, .field.has-error select, .field.has-error textarea', form);
        if (firstErr) firstErr.focus();
        if (success) success.classList.remove('is-visible');
        return;
      }
      if (success) {
        success.classList.add('is-visible');
      success.focus({ preventScroll: true });
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  }

  function markCurrentNav() {
    var path = location.pathname.split('/').pop() || 'index.html';
    $all('.site-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (path && href.slice(-path.length) === path) a.setAttribute('aria-current', 'page');
    });
  }

  function initStepsProgress() {
    /* stepped highlight while steps scroll into view */
    var steps = $all('.step');
    if (!steps.length || !('IntersectionObserver' in window)) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !reduce) {
          entry.target.classList.add('is-active');
          setTimeout(function () { entry.target.classList.remove('is-active'); }, 900);
        }
      });
    }, { threshold: 0.6 });
    steps.forEach(function (s) { io.observe(s); });
  }

  function initHighlightFromHash() {
    /* services.html#<id> — highlight target card briefly */
    var id = location.hash.replace('#', '');
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    setTimeout(function () {
      el.classList.add('is-highlighted');
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { el.classList.remove('is-highlighted'); }, 2500);
    }, 120);
  }

  /* ------------------------------------------------------------ */
  function init() {
    markCurrentNav();
    initBurger();
    buildIndexServiceCards();
    buildServiceCards();
    initChips();
    buildSvgChecklist();
    initAccordion();
    initReveal();
    initCounters();
    initCopyButtons();
    initForm();
    initStepsProgress();
    initHighlightFromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
