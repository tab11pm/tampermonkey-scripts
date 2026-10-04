# Tampermonkey Scripts

Набор пользовательских скриптов для расширения [Tampermonkey](https://www.tampermonkey.net/).

## Установка

1. Установите расширение Tampermonkey в браузер.
2. Откройте нужный файл `.user.js` из репозитория.
3. Tampermonkey предложит установить скрипт — подтвердите установку.

## Скрипты

### Deploychan Music

| Скрипт | Назначение |
| --- | --- |
| [Music Cover Saver](deploychan-music/music-cover-saver.user.js) | Автоматически скачивает новые обложки и скрывает уже сохранённые. |
| [Music Main Theme Override](deploychan-music/music-main-theme-override.user.js) | Применяет ночную цветовую тему к основной области сайта. |

### YouTube

| Скрипт | Назначение |
| --- | --- |
| [YouTube Focus Home](youtube/youtube-focus-home.user.js) | Скрывает рекомендации на главной и показывает напоминание о цели. |
| [YouTube Focus Mode](youtube/youtube-focus-mode.user.js) | Убирает правую колонку рекомендаций на странице просмотра. |

## Вклад

Каждый скрипт хранится отдельным файлом с расширением `.user.js` и должен содержать заголовок Tampermonkey. Перед добавлением проверьте, что `@match` ограничивает запуск нужными сайтами и что в исходном коде нет личных данных.
