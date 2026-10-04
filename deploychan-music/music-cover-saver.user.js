// ==UserScript==
// @name         Music Cover Saver
// @namespace    http://tampermonkey.net/
// @version      2026-09-28
// @description  Автоматически сохраняет новые обложки и не повторяет их
// @author       You
// @match        https://music.deploychan.webcam/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deploychan.webcam
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const STORAGE_KEY = 'music-cover-saver-downloaded';
    let saved = [];

    try {
        saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        saved = [];
    }

    const downloaded = new Set(saved);
    const downloading = new Set();

    const saveState = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...downloaded]));
    };

    const hideCover = () => {
        const reel = document.querySelector('.mood-wave .cover-reel');
        if (!reel) return;
        reel.style.opacity = '0';
        reel.style.pointerEvents = 'none';
    };

    const showCover = () => {
        const reel = document.querySelector('.mood-wave .cover-reel');
        if (!reel) return;
        reel.style.opacity = '1';
        reel.style.pointerEvents = '';
    };

    const downloadloadingCheck = (url) => downloaded.has(url) || downloading.has(url);

    const downloadCover = async (url) => {
        if (downloadloadingCheck(url)) return;

        downloading.add(url);

        try {
            console.log('[Cover Saver] Новая:', url);
            showCover();

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const blob = await response.blob();
            const filename = new URL(url).pathname.split('/').pop() || `cover-${Date.now()}.jpg`;
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = blobUrl;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

            downloaded.add(url);
            saveState();
            console.log('[Cover Saver] ✅ Сохранено:', filename);
            hideCover();
        } catch (error) {
            console.error('[Cover Saver] ❌ Ошибка:', error);
            showCover();
        } finally {
            downloading.delete(url);
        }
    };

    const checkCover = () => {
        const img = document.querySelector('.mood-wave .wave-center img');
        if (!img) return;

        const src = img.getAttribute('src');
        if (!src) return;

        const url = new URL(src, location.href).href;

        if (downloaded.has(url)) {
            console.log('[Cover Saver] 🙈 Уже сохранена — скрываю:', url);
            hideCover();
            return;
        }

        if (downloading.has(url)) return;

        showCover();
        downloadCover(url);
    };

    const start = () => {
        console.log(`[Cover Saver v5] Запущен. Уже сохранено: ${downloaded.size}`);
        checkCover();

        const observer = new MutationObserver(checkCover);
        observer.observe(document.documentElement, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['src']
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
