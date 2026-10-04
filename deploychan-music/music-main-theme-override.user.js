// ==UserScript==
// @name         Music Main Theme Override
// @namespace    music-theme-override
// @version      1.0
// @author       tab11pm
// @match        https://music.deploychan.webcam/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deploychan.webcam
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const applyTheme = () => {
        const main = document.querySelector('main');

        if (!main) return;

        main.setAttribute('data-tone', 'night');

        main.style.cssText += `
            --accent: #f3af91;
            --accent-soft: #e589ad;
            --accent-ink: #9e4567;
            --accent-soft-light: #b96d84;
            --wave-seconds: 8s;
        `;
    };

    applyTheme();

    const observer = new MutationObserver(() => {
        applyTheme();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
