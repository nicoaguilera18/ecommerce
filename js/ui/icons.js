/**
 * Íconos SVG inline por producto/categoría. Evitan depender de imágenes
 * externas (más liviano, 100% offline y coherente visualmente).
 */
const ICONS = {
  headphones:
    '<path d="M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1v-1a6 6 0 0 0-12 0v1h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>',
  watch:
    '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3h6l.5 4h-7zM9 21h6l.5-4h-7z"/>',
  laptop:
    '<rect x="4" y="5" width="16" height="10" rx="1"/><path d="M2 19h20l-1.5-3h-17z"/>',
  mouse:
    '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 3v7"/>',
  keyboard:
    '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>',
  battery:
    '<rect x="3" y="8" width="16" height="8" rx="1.5"/><path d="M20 10.5v3"/><path d="M7 12h6"/>',
  hub: '<rect x="8" y="8" width="8" height="8" rx="1.5"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>',
  camera:
    '<rect x="3" y="7" width="14" height="11" rx="2"/><circle cx="10" cy="12.5" r="3.2"/><path d="M17 10l4-2v9l-4-2z"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  trash:
    '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  star: '<path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  table:
    '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18M9 4v16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
};

export function icon(name, className = 'icon') {
  const path = ICONS[name] ?? ICONS.grid;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
