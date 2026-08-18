/**
 * ThemeService
 * -----------------------------------------------------------------------
 * Responsabilidad única: leer, aplicar y persistir el tema visual
 * (claro/oscuro). Se ejecuta lo antes posible (ver snippet inline en el
 * <head> de cada página) para evitar el "flash" de tema incorrecto, y
 * expone `initThemeToggle()` para que la Navbar conecte el botón visual.
 */
const THEME_KEY = 'nicommerce_theme';

export function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  applyTheme(getPreferredTheme());

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}
