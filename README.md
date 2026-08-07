# RTN Project — сайт

Статический сайт проекта Russian Trees Network. Хостится на GitHub Pages (домен `rtn.garden`).

## Как добавить новость

1. Открой файл `news.json`.
2. Добавь новую запись **в начало массива `items`**:

```json
{
  "id": "2026-08-15-update",
  "title": "Заголовок новости",
  "date": "2026-08-15",
  "category": "update",
  "content": "Текст новости. Появится на сайте и в Minecraft через мод.",
  "link": "https://rtn.garden/news.html#2026-08-15-update"
}
```

3. Запись автоматически появится на странице `news.html` и в блоке новостей на главной (последние 3).
4. Мод в Minecraft читает тот же `news.json` по адресу `https://rtn.garden/news.json`.

## Как менять IP сервера / ссылку на сборку

- IP сервера: `index.html`, `about.html`, `builds.html` + `js/main.js` (атрибут `data-ip`).
- Ссылка на сборку: `builds.html` (кнопка «Скачать»).

## Структура

```
index.html        — главная (hero, статус сервера, новости, состав, CTA)
about.html        — описание проекта и сервера
builds.html       — IP сервера + сборка + гайд «как начать»
news.html         — все новости + описание формата news.json
works.html        — моды собственной разработки
rules.html        — правила сервера
contacts.html     — контакты + сотрудничество
social.html       — соцсети
cooperation.html  — сотрудничество
404.html          — страница ошибки
css/style.css     — единый стиль сайта
js/main.js        — статус сервера, копирование IP, рендер новостей
news.json         — лента новостей (читает мод)
downloads/        — файлы модов для скачивания
img/              — логотип, favicon, OG-баннер
```

## Деплой

Этот репозиторий (`RuskElly/site`) разворачивается на GitHub Pages.
Домен `rtn.garden` подключается через `CNAME` + DNS-запись в панели регистратора домена.
