(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'portfolio-theme';

    const htmlElement = document.documentElement;

    const themes = ['frosted', 'neo', 'material', 'retro', 'slop'];

    const themeMap = {
        '1': 'frosted',
        '2': 'neo',
        '3': 'material',
        '4': 'retro',
        '5': 'slop'
    };

    function getRandomTheme() {
        return themes[Math.floor(Math.random() * themes.length)];
    }

    function setTheme(theme, saveToStorage) {
        htmlElement.setAttribute('data-theme', theme);
        if (saveToStorage) {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            } catch (e) {
                console.warn('Could not save theme to localStorage:', e);
            }
        }
    }

    function initTheme() {
        const randomTheme = getRandomTheme();
        setTheme(randomTheme, false);
    }

    function handleKeyPress(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
            return;
        }
        
        const theme = themeMap[event.key];
        if (theme) {
            event.preventDefault();
            setTheme(theme, true);
        }
    }

    document.addEventListener('keydown', handleKeyPress);

    initTheme();
})();
