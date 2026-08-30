import { useState, useEffect } from 'react';

const THEME_KEY = 'asm_theme_preference';

export function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

export function useTheme() {
  const [theme, setThemeState] = useState(getSavedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
