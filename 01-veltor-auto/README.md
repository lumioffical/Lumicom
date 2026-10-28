# VELTOR AUTO — демонстрационный сайт автосервиса

Многостраничный сайт вымышленного независимого автосервиса **VELTOR AUTO**.
Тёмная «техническая» тема (графит + один оранжевый акцент), редакционная сетка,
монофонтурные подписи. Весь сайт — статичный HTML/CSS + ванильный JavaScript
без сборки, зависимостей и внешних запросов.

**Все данные на сайте условные:** адрес, телефон, цены, команда и статистика —
демонстрационные, о чём прямо сказано на страницах.

## Страницы

| Файл | Назначение |
| --- | --- |
| `index.html` | Главная: услуги-карточки, этапы работы, цифры, CTA |
| `services.html` | Каталог 10 услуг по 5 категориям |
| `service-detail.html` | Шаблон страницы услуги (`?service=<id>`), рендер из данных JS |
| `prices.html` | Прайс-листы по категориям (таблицы с точечными отбивками) |
| `about.html` | История, принципы, команда, галерея, FAQ |
| `contacts.html` | Контакты, кнопка «скопировать адрес», форма записи |

## Запуск

Двойной клик по `index.html` — сайт работает через `file://`.
Никаких зависимостей: шрифты (woff2) и фотографии лежат локально.

Каталог услуг доступен с параметром, например:
`service-detail.html?service=brake-pads`. Неизвестный параметр
показывает первую услугу каталога.

## Публикация на GitHub Pages

1. Создайте репозиторий и загрузите содержимое папки (не саму папку) в ветку.
2. Settings → Pages → Source: ветка `main`, каталог `/ (root)`.
3. Сайт откроется по адресу вида `https://<логин>.github.io/<репозиторий>/`.

Все пути в файлах относительные — дополнительная настройка не нужна.

## Структура

```
01-veltor-auto/
├── index.html … contacts.html   # 5 страниц + шаблон detail
├── css/
│   ├── fonts.css                # @font-face с unicode-range
│   └── style.css                # дизайн-система
├── js/
│   └── main.js                  # данные услуг + вся логика (IIFE, 'use strict')
├── fonts/                       # Oswald, Inter, IBM Plex Mono (latin + cyrillic)
├── images/                      # 11 фотографий с Wikimedia Commons
└── README.md
```

## Логика (js/main.js)

- данные 10 услуг (цена, время, состав работ, доп. опции) — JS-объект внутри файла;
  без `fetch()`, ES-модулей и внешних JSON;
- «липкая» шапка (фон при прокрутке), бургер-меню < 900 px (Esc, клик мимо, aria);
- reveal-анимации через IntersectionObserver, счётчики цифр — единожды;
  всё отключается при `prefers-reduced-motion: reduce`;
- рендер `service-detail.html` из данных, переключатель услуг через `location.replace`;
- аккордеон FAQ, копирование адреса (Clipboard API с откатом на `execCommand`);
- валидация формы записи (имя ≥ 2 символов, телефон по маске +7/8);
  заявка формируется локально и на сервер не отправляется.

## Фото — Wikimedia Commons

Источники и лицензии (файлы переименованы по смыслу):

| Файл | Источник | Автор | Лицензия |
| --- | --- | --- | --- |
| hero-workshop.jpg | [LADA Vesta Sport, Wheel alignment](https://commons.wikimedia.org/wiki/File:LADA_Vesta_Sport,_Wheel_alignment.jpg) | Dmitry Racer | CC BY-SA 4.0 |
| wheel-alignment.jpg | [LADA Vesta Sport, Wheel alignment 2](https://commons.wikimedia.org/wiki/File:LADA_Vesta_Sport,_Wheel_alignment_2.jpg) | Dmitry Racer | CC BY-SA 4.0 |
| oil-cap.jpg | [Cover of refill oil tank in 1,2 HTP engine in Škoda Fabia I](https://commons.wikimedia.org/wiki/File:Cover_of_refill_oil_tank_in_1,2_HTP_engine_in_%C5%A0koda_Fabia_I.jpg) | Frettie | CC BY 3.0 |
| brake-caliper.jpg | [Disk brake dsc03682](https://commons.wikimedia.org/wiki/File:Disk_brake_dsc03682.jpg) | Unknown | CC BY-SA 3.0 |
| obd-diagnostics.jpg | [Man holding Obd2 jack for car software diagnostic](https://commons.wikimedia.org/wiki/File:Man_holding_Obd2_jack_for_car_software_diagnostic.jpg) | Nenad Stojkovic | CC BY 2.0 |
| wheel-balancing.jpg | [Wheel balancing](https://commons.wikimedia.org/wiki/File:Wheel_balancing.jpg) | ProjectManhattan | CC BY-SA 3.0 |
| history-mechanic.jpg | [Man under Volkswagen Beetle](https://commons.wikimedia.org/wiki/File:Man_under_Volkswagen_Beetle_(14168867527).jpg) | Free for Commercial Use | CC BY-SA 2.0 |
| suspension-work.jpg | [Femme mecanicienne33](https://commons.wikimedia.org/wiki/File:Femme_mecanicienne33.jpg) | Photokadaffi | CC BY-SA 4.0 |
| workshop-lift.jpg | [Hebebühne der Fa. Auto-TITAN Oranienburg](https://commons.wikimedia.org/wiki/File:Hebeb%C3%BChne_der_Fa._Auto-TITAN_Oranienburg_mit_Volkswagen_T2_2008.jpg) | Bukk | Public domain |
| suspension-measure.jpg | [Fahrwerksvermessung](https://commons.wikimedia.org/wiki/File:Fahrwerksvermessung.jpg) | CossimoMedia | CC BY-SA 3.0 |
| oil-refill.jpg | [Motor oil refill with funnel](https://commons.wikimedia.org/wiki/File:Motor_oil_refill_with_funnel.JPG) | Dvortygirl | CC BY-SA 3.0 |

Шрифты — [Google Fonts](https://fonts.google.com/) (Oswald, Inter, IBM Plex Mono),
лицензия SIL Open Font License; файлы woff2 лежат локально в `fonts/`.
