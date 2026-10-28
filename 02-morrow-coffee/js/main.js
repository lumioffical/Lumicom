/* ============================================================
   MORROW COFFEE — main.js
   Vanilla JS, работает по file:// (без fetch, без модулей).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Данные меню (демонстрационные цены) ---------- */
  var MENU_ITEMS = [
    // Кофе
    { name: 'Эспрессо', category: 'coffee', desc: 'Плотный, с нотой тёмной карамели и какао. Основа всей нашей карты.', price: 170, size: '60 мл', image: null },
    { name: 'Американо', category: 'coffee', desc: 'Эспрессо с горячей водой — мягче по телу, дольше во вкусе.', price: 190, size: '250 мл', image: null },
    { name: 'Капучино', category: 'coffee', desc: 'Классика 1:1:1. Бархатная молочная пена поверх двойного эспрессо.', price: 260, size: '250 мл', allergy: 'молоко', image: 'cappuccino.jpg' },
    { name: 'Флэт уайт', category: 'coffee', desc: 'Двойной ристретто и микропена без воздушной шапки — кофейный акцент сильнее.', price: 280, size: '180 мл', allergy: 'молоко', image: null },
    { name: 'Фильтр-кофе', category: 'coffee', desc: 'Паур-овер V60. Яванская кислинка, чайная прозрачность, сахарный финиш.', price: 240, size: '250 мл', image: 'pour-over.jpg' },
    { name: 'Раф', category: 'coffee', desc: 'Сливки, ваниль и эспрессо, взбитые до шелковистой текстуры.', price: 320, size: '300 мл', allergy: 'молоко', image: null },
    // Не кофейное
    { name: 'Какао', category: 'noncoffee', desc: 'Бельгийский шоколад 54% на молоке, с щепоткой морской соли.', price: 250, size: '300 мл', allergy: 'молоко', image: null },
    { name: 'Чай листовой', category: 'noncoffee', desc: 'Тайваньский улун, ассам или ройбуш — завариваем в чайнике, подаём честно крепким.', price: 200, size: '450 мл', image: null },
    // Кофейня-выпечка
    { name: 'Круассан', category: 'bakery', desc: 'Слоёное тесто на французском масле 82,5%. Хрустит громко — будьте готовы.', price: 190, allergy: 'глютен, молоко', image: 'croissant.jpg' },
    { name: 'Шокобулочка', category: 'bakery', desc: 'Бриошь с тёмным шоколадом и морской солью. Ежедневно печём к 9 утра.', price: 220, allergy: 'глютен, молоко, яйца', image: 'chocolate-glazed-danish-bun.jpg' },
    { name: 'Десерт дня', category: 'bakery', desc: 'Сезонный десерт у кассы: спросите, что свежего сегодня. Показываем честно и отрезаем щедро.', price: 240, allergy: 'глютен, яйца', image: 'bakery-pastries.jpg' },
    { name: 'Тарт с ягодами', category: 'bakery', desc: 'Песочная основа, ванильный крем и сезонные ягоды.', price: 290, allergy: 'глютен, молоко, яйца', image: 'strawberry-tart.jpg' },
    { name: 'Чизкейк', category: 'bakery', desc: 'Запечённый нью-йорк на песочной базе, кислинка сливочного сыра.', price: 320, allergy: 'глютен, молоко, яйца', image: 'cheesecake.jpg' },
    { name: 'Банановый пирог', category: 'bakery', desc: 'На переспелых бананах, с грецким орехом и коричневым сахаром.', price: 240, allergy: 'глютен, орехи, яйца', image: null },
    // Зерно
    { name: 'Mysore «Эфиопия»', category: 'beans', desc: 'Ирга, жасмин, бергамот. Промывная обработка — самый «цветущий» лот нашей карты.', price: 950, size: '250 г', image: 'coffee-beans.jpg' },
    { name: '«Колумбия»', category: 'beans', desc: 'Молочный шоколад, красное яблоко, карамель — тот самый «всеобщий фаворит».', price: 900, size: '250 г', image: null },
    { name: '«Бразилия»', category: 'beans', desc: 'Фундук, какао, плотное тело. Идеальна для домашних эспрессо-машин.', price: 850, size: '250 г', image: null },
    { name: '«Эспрессо-бленд»', category: 'beans', desc: 'Наш фирменный купаж: 70% Бразилия + 30% Эфиопия. Работает и в молоке.', price: 800, size: '250 г', image: null }
  ];

  var CATEGORY_TITLES = {
    coffee: 'Кофе',
    noncoffee: 'Не кофейное',
    bakery: 'Выпечка',
    beans: 'Зерно'
  };

  var IMG_PATH = './images/';

  /* ---------- Утилиты ---------- */
  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ---------- Шапка: бургер ---------- */
  function initBurger() {
    var burger = q('.burger');
    var nav = q('.main-nav');
    if (!burger || !nav) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('menu-locked', open);
      nav.classList.toggle('open', open);
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    qa('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    nav.addEventListener('click', function (e) {
      if (e.target === nav) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = qa('.reveal');
    if (!items.length) return;
    var reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (err) { /* noop */ }
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('reveal-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- menu.html: рендер карточек + табы ---------- */
  function initMenuPage() {
    var grid = q('#menuGrid');
    var tabsBox = q('#catTabs');
    if (!grid || !tabsBox) return;

    function cardHtml(item) {
      var cat = CATEGORY_TITLES[item.category] || '';
      var img = item.image
        ? '<div class="mc-photo"><img src="' + IMG_PATH + item.image + '" alt="' + item.name + ' — MORROW COFFEE" loading="lazy" width="800" height="500"></div>'
        : '';
      var size = item.size ? '<span class="mc-size">' + item.size + '</span>' : '';
      var allergy = item.allergy ? '<p class="mc-allergy">Аллергены: ' + item.allergy + '</p>' : '';
      return (
        '<article class="menu-card" data-cat="' + item.category + '">' +
          img +
          '<div class="mc-body">' +
            '<span class="mc-cat">' + cat + '</span>' +
            '<div class="mc-title-row"><h3>' + item.name + '</h3>' + size + '</div>' +
            '<p class="mc-desc"><em class="flavor">' + item.desc + '</em></p>' +
            allergy +
            '<p class="mc-price"><strong>' + item.price + ' ₽</strong></p>' +
          '</div>' +
        '</article>'
      );
    }

    grid.innerHTML = MENU_ITEMS.map(cardHtml).join('');

    var cats = ['all', 'coffee', 'noncoffee', 'bakery', 'beans'];
    var tabs = tabsBox.querySelectorAll('.cat-tab');

    function countFor(cat) {
      if (cat === 'all') return MENU_ITEMS.length;
      return MENU_ITEMS.filter(function (it) { return it.category === cat; }).length;
    }

    tabs.forEach(function (tab) {
      var cat = tab.getAttribute('data-cat');
      var cnt = tab.querySelector('.cnt');
      if (cnt) cnt.textContent = countFor(cat);
      tab.setAttribute('aria-selected', cat === 'all' ? 'true' : 'false');
      tab.setAttribute('tabindex', cat === 'all' ? '0' : '-1');
    });

    function select(cat, focusTab, animateCards) {
      var reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      tabs.forEach(function (tab) {
        var isTarget = tab.getAttribute('data-cat') === cat;
        tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        tab.setAttribute('tabindex', isTarget ? '0' : '-1');
        if (isTarget && focusTab) tab.focus();
      });
      var shown = 0;
      qa('.menu-card', grid).forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-cat') === cat;
        if (match) {
          card.style.display = '';
          /* Мягкое каскадное появление карточек после смены категории */
          if (animateCards && !reduce) {
            card.classList.remove('card-in');
            void card.offsetWidth; /* перезапуск CSS-анимации */
            card.style.animationDelay = (shown * 35) + 'ms';
            card.classList.add('card-in');
          }
          shown++;
        } else {
          card.style.display = 'none';
          card.classList.remove('card-in');
        }
      });
      var empty = grid.querySelector('.menu-empty');
      if (shown === 0) {
        if (!empty) {
          empty = document.createElement('p');
          empty.className = 'menu-empty';
          empty.textContent = 'Ничего не найдено в этой категории.';
          grid.appendChild(empty);
        }
      } else if (empty) {
        empty.remove();
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { select(tab.getAttribute('data-cat'), false, true); });
      tab.addEventListener('keydown', function (e) {
        var idx = tabs.indexOf ? tabs.indexOf(tab) : Array.prototype.indexOf.call(tabs, tab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          var next = idx + 1 < tabs.length ? tabs[idx + 1] : tabs[0];
          select(next.getAttribute('data-cat'), true);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          var prev = idx > 0 ? tabs[idx - 1] : tabs[tabs.length - 1];
          select(prev.getAttribute('data-cat'), true);
        }
      });
    });

    var initial = window.location.hash.replace('#', '');
    if (cats.indexOf(initial) !== -1) select(initial, false);
  }

  /* ---------- coffee.html: напитки с размерами ---------- */
  function initCoffeePage() {
    var list = q('#drinkList');
    if (!list) return;

    var DRINKS = [
      { name: 'Эспрессо', note: 'Тёмная карамель, какао', sizes: [['250 мл', 170], ['350 мл', 210], ['450 мл', 250]] },
      { name: 'Американо', note: 'Мягче по телу, дольше во вкусе', sizes: [['250 мл', 190], ['350 мл', 230], ['450 мл', 270]] },
      { name: 'Капучино', note: 'Бархатная пена, двойной эспрессо', sizes: [['250 мл', 260], ['350 мл', 320], ['450 мл', 380]] },
      { name: 'Флэт уайт', note: 'Ристретто + микропена', sizes: [['250 мл', 280], ['350 мл', 340]] },
      { name: 'Фильтр-кофе', note: 'V60, чайная прозрачность', sizes: [['250 мл', 240], ['350 мл', 290], ['450 мл', 330]] },
      { name: 'Раф', note: 'Сливки, ваниль, шелковистая текстура', sizes: [['250 мл', 320], ['350 мл', 370], ['450 мл', 420]] },
      { name: 'Какао', note: 'Бельгийский шоколад, морская соль', sizes: [['250 мл', 250], ['350 мл', 300], ['450 мл', 340]] },
      { name: 'Чай листовой', note: 'Улун, ассам или ройбуш', sizes: [['250 мл', 200], ['350 мл', 240], ['450 мл', 270]] }
    ];

    list.innerHTML = DRINKS.map(function (d) {
      var chips = d.sizes.map(function (s) {
        return '<span class="size-chip"><span class="sz">' + s[0] + '</span><strong>' + s[1] + ' ₽</strong></span>';
      }).join('');
      return (
        '<div class="menu-line d-line">' +
          '<span class="ml-name">' + d.name + ' <em>— ' + d.note + '</em></span>' +
          '<span class="ml-dots"></span>' +
          '<span class="size-row ml-sizes">' + chips + '</span>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- contacts.html: форма бронирования ---------- */
  function initBookingForm() {
    var form = q('#bookingForm');
    if (!form) return;

    var dateInput = q('#bk-date');
    var timeSelect = q('#bk-time');
    var nameInput = q('#bk-name');
    var phoneInput = q('#bk-phone');
    var successBox = q('#bookingSuccess');
    var PHONE_RE = /^(\+7|8)[\s\-]?\(?9\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

    // Слоты 10:00–21:30 каждые 30 минут
    if (timeSelect && timeSelect.options.length <= 1) {
      for (var h = 10; h <= 21; h++) {
        for (var m = 0; m < 60; m += 30) {
          if (h === 21 && m > 30) continue;
          var label = (h < 10 ? '0' + h : h) + ':' + (m === 0 ? '00' : m);
          var opt = document.createElement('option');
          opt.value = label;
          opt.textContent = label;
          timeSelect.appendChild(opt);
        }
      }
    }

    // Дата: не вчера и раньше
    if (dateInput) {
      var now = new Date();
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
      dateInput.min = today;
    }

    function setError(input, msg) {
      var field = input.closest('.field');
      var msgEl = field ? field.querySelector('.error-msg') : null;
      if (msg) {
        input.classList.add('is-error');
        input.setAttribute('aria-invalid', 'true');
        if (msgEl) msgEl.textContent = msg;
      } else {
        input.classList.remove('is-error');
        input.removeAttribute('aria-invalid');
        if (msgEl) msgEl.textContent = '';
      }
    }

    [nameInput, phoneInput, dateInput, timeSelect].forEach(function (el) {
      if (el) {
        el.addEventListener('input', function () { setError(el, ''); });
        el.addEventListener('change', function () { setError(el, ''); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      var name = (nameInput.value || '').trim();
      if (name.length < 2) {
        setError(nameInput, 'Имя — минимум 2 символа.');
        ok = false; firstBad = firstBad || nameInput;
      } else setError(nameInput, '');

      var phone = (phoneInput.value || '').trim();
      if (!PHONE_RE.test(phone)) {
        setError(phoneInput, 'Формат: +7 912 345 67 89');
        ok = false; firstBad = firstBad || phoneInput;
      } else setError(phoneInput, '');

      var dateVal = dateInput.value;
      var isPast = false;
      if (!dateVal) {
        ok = false; firstBad = firstBad || dateInput; setError(dateInput, 'Выберите дату.');
      } else {
        var d = new Date(dateVal + 'T23:59:59');
        var now2 = new Date();
        if (d < now2) {
          isPast = true;
          ok = false; firstBad = firstBad || dateInput; setError(dateInput, 'Дата уже в прошлом.');
        } else setError(dateInput, '');
      }

      if (!timeSelect.value) {
        setError(timeSelect, 'Выберите время визита.');
        ok = false; firstBad = firstBad || timeSelect;
      } else setError(timeSelect, '');

      if (!ok) {
        if (firstBad) firstBad.focus();
        if (successBox) successBox.classList.remove('show');
        return;
      }

      if (successBox) {
        successBox.classList.add('show');
        successBox.setAttribute('tabindex', '-1');
        successBox.focus();
        if (successBox.scrollIntoView) successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      });
  }

  /* ---------- contacts.html: копировать адрес ---------- */
  function initCopyAddress() {
    var btn = q('#copyAddress');
    if (!btn) return;
    var addr = btn.getAttribute('data-address') || '';
    btn.addEventListener('click', function () {
      function done() {
        btn.classList.add('copied');
        var label = btn.querySelector('.ca-label');
        var old = label ? label.textContent : '';
        if (label) label.textContent = 'Скопировано';
        setTimeout(function () {
          btn.classList.remove('copied');
          if (label) label.textContent = old;
        }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done, function () { fallbackCopy(addr); done(); });
      } else {
        fallbackCopy(addr);
        done();
      }
    });

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) { /* noop */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- Старт ---------- */
  onReady(function () {
    initBurger();
    initReveal();
    initMenuPage();
    initCoffeePage();
    initBookingForm();
    initCopyAddress();
  });
})();
