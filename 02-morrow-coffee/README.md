# MORROW COFFEE — демонстрационный многостраничный сайт

Независимая specialty-кофейня: авторский кофе со своей обжаркой, свежая выпечка, спокойная атмосфера. Проект сделан как портфолио-работа (журнальная, тёплая светлая эстетика), **все данные, цены, адрес и команда — вымышленные/демонстрационные**.

## Что внутри

| Страница | Содержимое |
|---|---|
| `index.html` | Герой-редакция, full-bleed фото, демо-статистика, три направления, «как мы варим», таймлайн 2022–2026, CTA |
| `menu.html` | Полное меню: табы-категории (Всё / Кофе / Не кофейное / Выпечка / Зерно) — фильтрация без перезагрузки, карточки со строкой вкуса |
| `coffee.html` | Кофейная карта с объёмами 250/350/450 мл, профили обжарки, три происхождения зерна, пачки 250 г с помолом на выбор, мини-гайд «как выбрать» |
| `bakery.html` | Выпечка и десерты: состав, пометки аллергенов (глютен/молоко/орехи/яйца), ритм пекарни «что печётся к утру / в течение дня» |
| `about.html` | История (2022), три принципа, команда (4 вымышленные роли), галерея, цитата основателя, FAQ-аккордеон |
| `contacts.html` | Адрес, телефон, почта, часы, кнопка «скопировать адрес», форма брони столика с локальной проверкой и честным сообщением |

## Как посмотреть

Сайт работает **полностью офлайн по file://** — без сборки и CDN, только HTML/CSS/vanilla JS с локальными шрифтами (woff2) и локальными картинками.

Дважды щёлкните по `index.html` в проводнике — или откройте его в браузере адресной строкой: `file:///D:/PROJECT/Lumicom/02-morrow-coffee/index.html`.

### Публикация на GitHub Pages

1. Создайте репозиторий и загрузите в него содержимое папки `02-morrow-coffee` (саму папку по имени можно не копировать).
2. В настройках репозитория: **Settings → Pages → Source → Deploy from a branch → main → root**.
3. Через пару минут сайт будет доступен по адресу `https://<логин>.github.io/<репозиторий>/`.

## Кредиты изображений

Все фотографии — с Wikimedia Commons, включая кадры Unsplash CC0. Лицензии CC BY / CC BY-SA / CC0 / Public Domain допускают такое использование с указанием автора — оно приведено в таблице.

| Файл | Автор | Лицензия | Страница источника (Wikimedia Commons) |
|---|---|---|---|
| `cafe-bar-counter.jpg` | Shixart1985 | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Barista_preparing_espresso_in_a_cozy_coffee_shop_during_afternoon_rush_hour_with_warm_lighting_and_relaxed_ambiance.jpg |
| `espresso-machine.jpg` | Osman Bas | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Doppio.jpg |
| `cappuccino.jpg` | Acabashi | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Flat_white_coffee_at_Highdown_Gardens,_Worthing,_West_Sussex,_England.jpg |
| `coffee-beans.jpg` | MarkSweep | Public domain | https://commons.wikimedia.org/wiki/File:Roasted_coffee_beans.jpg |
| `croissant.jpg` | SKopp | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Croissant,_whole.jpg |
| `roaster.jpg` | ProtoplasmaKid | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Coffee_ceremony_of_Ethiopia_and_Eritrea_3.jpg |
| `pour-over.jpg` | Takeaway | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Drip_Coffee_Bangkok.jpg |
| `barista.jpg` | Work for hire for CHI Polska | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Barista_COSTA_COFFEE.JPG |
| `barista-tamping.jpg` | Shixart1985 | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Barista_prepares_espresso_at_coffee_shop.jpg |
| `strawberry-tart.jpg` | jenny cu | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Birthday_fruit_tart_for_Tim.jpg |
| `cheesecake.jpg` | Alex Dugger | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Mondays_at_Il_Forno_-_Cheesecake_with_strawberry_sauce.jpg |
| `chocolate-glazed-danish-bun.jpg` | Leon Brocard | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Cinnamon_danish_in_Copenhagen.jpg |
| `banana-cake.jpg` | Orangetopic | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Banana_bread_loaf_on_a_plate.jpg |
| `bakery-pastries.jpg` | Adam Baker | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Window_shopping_-_macaroons.jpg |

Фотографии иллюстрируют вымышленное заведение и не являются фотографиями реальной кофейни MORROW. Чужие товарные знаки в кадрах (Costa, Rancilio и др.) не используются сайтом и не являются его брендингом.

## Дисклеймер

Демонстрационный проект-портфолио. Не является реальным заведением; цены, статистика, имена и адрес условные.

## Структура

```
02-morrow-coffee/
├── index.html          # Главная
├── menu.html           # Меню с табами
├── coffee.html         # Кофе и зерно
├── bakery.html         # Выпечка и десерты
├── about.html          # О кофейне
├── contacts.html       # Контакты и бронь
├── css/style.css       # Единая дизайн-система
├── js/main.js          # Меню-табы, бургер, форма брони, FAQ-аккордеон
├── fonts/              # Локальные woff2 + fonts.css
├── images/             # 14 фотографий (Wikimedia Commons, см. кредиты)
└── _tools/             # Инструменты QA и данные кредитов (не публикуется на Pages)
```
