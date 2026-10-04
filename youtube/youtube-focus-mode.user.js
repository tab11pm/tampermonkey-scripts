// ==UserScript==
// @name         YouTube Focus Mode
// @namespace    youtube-focus
// @version      1.1
// @description  Убирает рекомендации справа на странице просмотра YouTube
// @author       You
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');

    style.textContent = `
        ytd-watch-flexy #secondary {
            display: none !important;
        }
    `;

    document.head.appendChild(style);
})();
