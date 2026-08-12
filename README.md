# RTN Project — сайт

Статический сайт проекта Russian Trees Network. Хостится на GitHub Pages (домен `rtn.garden`).

## 🚀 Как включить хостинг (GitHub Pages) — по шагам

1. Убедись, что сайт лежит в ветке `main` (смёржи пул-реквест в `main`, если ещё не смёржен).
2. Открой репозиторий **RuskElly/site** → вкладка **Settings**.
3. В левом меню выбери **Pages**.
4. В блоке **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**, папка: **/ (root)**
   - Нажми **Save**.
5. В том же разделе ниже — блок **Custom domain**:
   - Впиши **rtn.garden** → **Save**.
   - GitHub предложит добавить DNS-запись — добавь её у регистратора домена (см. ниже).
6. Дождись, пока GitHub подтвердит домен, затем поставь галочку **Enforce HTTPS** (и оставь её включённой).
7. Подожди 1–5 минут после деплоя и открой **https://rtn.garden** (или **https://RuskElly.github.io/site/** до настройки домена).

### DNS у регистратора домена rtn.garden

Так как `rtn.garden` — домен без поддомена (apex), нужны A-записи:

```
rtn.garden.  A  185.199.108.153
rtn.garden.  A  185.199.109.153
rtn.garden.  A  185.199.110.153
rtn.garden.  A  185.199.111.153
```

Файл `CNAME` с `rtn.garden` уже лежит в репозитории — GitHub подхватит его сам.

> ⚠️ Если GitHub напишет «Domain is already assigned to another repository» —
> это потому, что домен раньше был привязан к старому репозиторию `RussianTreesNetwork/site`
> (доступ к нему потерян). В этом случае напиши в GitHub Support (github.com/contact)
> со скриншотами панели DNS домена — подтверждение владения доменом обычно решает вопрос за пару дней.

### Проверка после запуска

- Открой https://rtn.garden — должна открыться главная с оранжевым hero.
- Проверь https://rtn.garden/news.json — мод должен читать новости из этого файла.
- Проверь страницы: /about.html, /builds.html, /news.html, /works.html, /rules.html, /contacts.html, /social.html, /cooperation.html, /404.html.

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
