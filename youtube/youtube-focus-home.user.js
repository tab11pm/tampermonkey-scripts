// ==UserScript==
// @name         YouTube Focus Home
// @namespace    youtube-focus
// @version      1.0
// @description  Убирает рекомендации с главной YouTube и напоминает о цели
// @author       You
// @match        https://www.youtube.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const GOAL = 'Зачем ты открыл YouTube?';

    const SUBTEXT =
        'Найди конкретное видео, которое тебе нужно, и возвращайся к своей задаче.';

    const style = document.createElement('style');

    style.textContent = `
        body.yt-focus-home ytd-rich-grid-renderer {
            display: none !important;
        }

        #yt-focus-goal {
            min-height: calc(100vh - 120px);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            text-align: center;

            padding: 40px;
            box-sizing: border-box;

            font-family: Roboto, Arial, sans-serif;
        }

        #yt-focus-goal h1 {
            font-size: 34px;
            font-weight: 600;
            margin: 0 0 16px;
            color: var(--yt-spec-text-primary);
        }

        #yt-focus-goal p {
            max-width: 600px;
            font-size: 18px;
            line-height: 1.6;
            margin: 0;

            color: var(--yt-spec-text-secondary);
        }
    `;

    document.head.appendChild(style);

    function isHomePage() {
        return (
            location.pathname === '/' ||
            location.pathname === '/feed/recommended'
        );
    }

    function removeGoal() {
        document
            .querySelector('#yt-focus-goal')
            ?.remove();

        document.body.classList.remove('yt-focus-home');
    }

    function renderGoal() {
        if (!isHomePage()) {
            removeGoal();
            return;
        }

        document.body.classList.add('yt-focus-home');

        if (document.querySelector('#yt-focus-goal')) {
            return;
        }

        const goal = document.createElement('div');

        goal.id = 'yt-focus-goal';

        goal.innerHTML = `
            <h1>${GOAL}</h1>

            <p>
                ${SUBTEXT}
            </p>
        `;

        const app = document.querySelector(
            'ytd-browse[page-subtype="home"]'
        );

        if (app) {
            app.prepend(goal);
        }
    }

    renderGoal();

    window.addEventListener(
        'yt-navigate-finish',
        renderGoal
    );

    new MutationObserver(renderGoal).observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );
})();
