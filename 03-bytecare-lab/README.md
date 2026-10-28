# BYTECARE LAB — демонстрационный сайт компьютерной мастерской

Многостраничный сайт вымышленной мастерской «BYTECARE LAB»: ремонт компьютеров,
ноутбуков, игровых ПК и периферии. Светлая «лабораторная» тема, стиль —
технологичный минимализм.

**Важно:** это демонстрационный сайт. Все цены, телефоны, адреса, цифры статистики
и условия гарантии — условные, помечены на страницах как демонстрационные.
Форма заявки работает локально в браузере и не отправляет данные на сервер.

## Страницы

| Файл | Содержание |
|---|---|
| `index.html` | Герой, статистика, интерактивный «консультант» по симптомам, краткие услуги, процесс 01→06, гарантия, CTA |
| `services.html` | Полный каталог услуг по 4 группам (якоря `#<service-id>`), FAQ-аккордеон |
| `diagnostics.html` | 6 этапов процесса, чек-лист «что проверяем», статусы заказа |
| `prices.html` | Таблицы цен по категориям («услуга / в цену входит / цена») |
| `warranty.html` | 90 дней на работы: что покрывается / не покрывается, процедура обращения, FAQ |
| `contacts.html` | Копируемые контакты, часы работы, форма заявки с локальной валидацией |

## Запуск

Сайт работает без сети и без сборки:

- двойной клик по `index.html` (все пути относительные, работает через `file://`);
- либо локальный сервер: `python -m http.server` в этой папке → `http://localhost:8000`.

Технологии: HTML5 + CSS3 + ванильный JavaScript (IIFE, без модулей и `fetch`).
Данные услуг — объект `SERVICES` в `js/main.js`; карточки каталога строятся из него
на лету (это позволяет работать через `file://`).

## Деплой на GitHub Pages

1. Создайте репозиторий и загрузите содержимое папки (без scaffolding-скриптов).
2. Settings → Pages → Source: `main` ветка, корень (`/`).
3. Сайт будет доступен по `https://<user>.github.io/<repo>/` — все ссылки относительные,
   дополнительная настройка не нужна.

## Структура

```
03-bytecare-lab/
├── index.html · services.html · diagnostics.html
├── prices.html · warranty.html · contacts.html
├── css/style.css      # дизайн-система: токены, компоненты, 6 брейкпоинтов
├── js/main.js         # SERVICES-данные + вся интерактивность (IIFE)
├── fonts/             # IBM Plex Sans 400–700, IBM Plex Mono 400–500 (woff2, latin+cyrillic)
├── images/            # 13 фото с Wikimedia Commons (см. кредиты ниже)
└── README.md
```

## Шрифты

IBM Plex Sans (400/500/600/700) и IBM Plex Mono (400/500), subsets `latin` + `cyrillic`
с `unicode-range`. Файлы скачаны с Google Fonts (woff2) и подключены локально.

## Изображения и лицензии

Все фотографии — с Wikimedia Commons, уменьшены до ширины 1600px, JPEG.
Источники (файл · автор · лицензия):

| Локальный файл | Источник (Commons) | Автор | Лицензия |
|---|---|---|---|
| hero-laptop-repair.jpg | [Computer repair in progress](https://commons.wikimedia.org/wiki/File:Computer_repair_in_progress.jpg) | см. страницу файла | CC BY-SA 4.0 |
| workshop-tools.jpg | [Hacker repairs a computer — Linux Day Torino 2022](https://commons.wikimedia.org/wiki/File:Hacker_repairs_a_computer_-_Linux_Day_in_Torino_2022.jpg) | см. страницу файла | CC0 |
| pc-bench-disassembly.jpg | [81st SBCT S6 Soldier repairs computer while deployed in Ukraine](https://commons.wikimedia.org/wiki/File:81st_SBCT_S6_Soldier_repairs_computer_while_deployed_in_Ukraine_(6854196).jpg) | US Army | Public domain |
| cpu-motherboard.jpg | [2015 Gaming PC Build](https://commons.wikimedia.org/wiki/File:2015_Gaming_PC_Build.jpg) | см. страницу файла | CC0 |
| gpu-card.jpg | [Gigabyte GTX 970 Windforce](https://commons.wikimedia.org/wiki/File:Gigabyte_GTX_970_Windforce.jpg) | см. страницу файла | CC BY-SA 4.0 |
| gpu-dust-heatsink.jpg | [Staub 002 2024 08 07](https://commons.wikimedia.org/wiki/File:Staub_002_2024_08_07.jpg) | см. страницу файла | CC BY-SA 4.0 |
| soldering-ports.jpg | [USB port solder points on laptop motherboard](https://commons.wikimedia.org/wiki/File:USB_port_solder_points_on_laptop_motherboard.JPG) | см. страницу файла | CC BY-SA 4.0 |
| laptop-internals.jpg | [Compaq Presario CQ17 internals](https://commons.wikimedia.org/wiki/File:Compaq_Presario_CQ17_internals.jpg) | см. страницу файла | CC BY 2.0 |
| ssd-nvme.jpg | [Samsung 980 PRO PCIe 4.0 NVMe SSD 1TB](https://commons.wikimedia.org/wiki/File:Samsung_980_PRO_PCIe_4.0_NVMe_SSD_1TB-top_PNr%C2%B00915.jpg) | см. страницу файла | CC BY-SA 4.0 |
| workstation-open.jpg | [HP Z420 workstation opened](https://commons.wikimedia.org/wiki/File:HP_Z420_workstation_opened.jpg) | см. страницу файла | CC BY-SA 4.0 |
| ram-modules.jpg | [Memory modules](https://commons.wikimedia.org/wiki/File:Memory_modules.jpg) | см. страницу файла | CC BY-SA 4.0 |
| keyboard-laptop.jpg | [HP compaq 6910p keyboard](https://commons.wikimedia.org/wiki/File:HP_compaq_6910p_keyboard.jpg) | см. страницу файла | CC BY 2.0 |
| motherboard-macro.jpg | [Computer Motherboard Closeup](https://commons.wikimedia.org/wiki/File:Computer_Motherboard_Closeup.jpg) | см. страницу файла | CC0 |

Выбор и кадрирование — демонстрационные, бренды на фото не означают партнёрство.
