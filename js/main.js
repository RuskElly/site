/* ============================================================
   RTN Project — общий скрипт сайта
   - год в футере
   - кнопки «Скопировать IP»
   - живой статус сервера (api.mcsrvstat.us)
   - подгрузка новостей из news.json
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Год в футере ---------- */
    var yearEls = document.querySelectorAll('[data-year]');
    yearEls.forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* ---------- Подсветка активного пункта меню ---------- */
    (function () {
        var page = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.main-nav a').forEach(function (a) {
            if (a.getAttribute('href') === page) {
                a.setAttribute('aria-current', 'page');
            }
        });
    })();

    /* ---------- Копирование IP ---------- */
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        // Фолбэк для http / старых браузеров
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand('copy');
                resolve();
            } catch (e) {
                reject(e);
            } finally {
                document.body.removeChild(ta);
            }
        });
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-copy]');
        if (!btn) return;
        var text = btn.getAttribute('data-copy') || btn.textContent.trim();
        copyText(text)
            .then(function () {
                var old = btn.innerHTML;
                btn.innerHTML = '✅ Скопировано!';
                setTimeout(function () {
                    btn.innerHTML = old;
                }, 1600);
            })
            .catch(function () {
                btn.innerHTML = '⚠️ Не удалось скопировать';
                setTimeout(function () {
                    btn.innerHTML = '📋 ' + text;
                }, 2000);
            });
    });

    /* ---------- Статус сервера ---------- */
    function renderStatus(container) {
        var ip = container.getAttribute('data-ip') || 'mc.rtn.garden';

        var dot = container.querySelector('.dot');
        var meta = container.querySelector('.status-meta');

        function setState(state, html) {
            dot.className = 'dot ' + state;
            meta.innerHTML = html;
        }

        setState('', 'Проверяем статус сервера…');

        fetch('https://api.mcsrvstat.us/3/' + ip)
            .then(function (r) {
                if (!r.ok) throw new Error('bad response');
                return r.json();
            })
            .then(function (data) {
                if (data.online) {
                    var players = data.players && typeof data.players.online === 'number' ? data.players.online : '?';
                    var max = data.players && typeof data.players.max === 'number' ? data.players.max : '?';
                    var motd = '';
                    if (data.motd && data.motd.clean && data.motd.clean[0]) {
                        motd = data.motd.clean[0];
                    }
                    var version = data.version || '1.21.1';
                    setState('online',
                        '<strong>Онлайн</strong> · игроков: ' + players + ' / ' + max +
                        (version ? ' · версия: ' + version : '') +
                        (motd ? '<br><span style="opacity:.75">' + escapeHtml(motd) + '</span>' : '')
                    );
                } else {
                    setState('offline',
                        '<strong>Офлайн</strong> — сервер сейчас не отвечает.<br>' +
                        '<span style="opacity:.75">Возможно, идёт обновление. Проверь статус в Telegram.</span>'
                    );
                }
            })
            .catch(function () {
                setState('offline',
                    '<strong>Не удалось получить статус</strong><br>' +
                    '<span style="opacity:.75">Сайт не смог связаться с API статусов. Попробуй скопировать IP и зайти напрямую.</span>'
                );
            });
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    document.querySelectorAll('[data-status]').forEach(renderStatus);

    /* ---------- Новости ---------- */
    function formatDate(iso) {
        var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        var parts = String(iso).split('-');
        if (parts.length !== 3) return iso;
        var m = parseInt(parts[1], 10) - 1;
        return parseInt(parts[2], 10) + ' ' + (months[m] || parts[1]) + ' ' + parts[0];
    }

    function renderNews(container) {
        var limit = parseInt(container.getAttribute('data-limit'), 10) || 0;

        fetch('news.json', { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('no news');
                return r.json();
            })
            .then(function (data) {
                var items = (data && data.items) || [];
                if (limit > 0) items = items.slice(0, limit);

                if (!items.length) {
                    container.innerHTML =
                        '<div class="note">Новостей пока нет — загляни чуть позже! 🌲</div>';
                    return;
                }

                var html = items.map(function (n) {
                    return (
                        '<article class="news-item" id="' + (n.id || '') + '">' +
                        '<span class="news-date">' + formatDate(n.date || '') + '</span>' +
                        '<h3>' + escapeHtml(n.title || '') + '</h3>' +
                        '<p>' + escapeHtml(n.content || '') + '</p>' +
                        '</article>'
                    );
                }).join('');

                container.innerHTML = '<div class="news-list">' + html + '</div>';
            })
            .catch(function () {
                container.innerHTML =
                    '<div class="note">Новости пока не загрузились. Попробуй обновить страницу. 🌲</div>';
            });
    }

    document.querySelectorAll('[data-news]').forEach(renderNews);
})();
