import { icon } from '../icons.js';
import { initThemeToggle } from '../../services/ThemeService.js';

/**
 * Navbar
 * -----------------------------------------------------------------------
 * Responsabilidad única: pintar la barra de navegación, resaltar la página
 * activa y mantener el contador del carrito sincronizado suscribiéndose al
 * CartService (Open/Closed: agregar un link nuevo no rompe el resto).
 */
const LINKS = [
  { href: 'index.html', label: 'Inicio', match: ['index.html', ''] },
  { href: 'listado_tabla.html', label: 'Catálogo (tabla)', match: ['listado_tabla.html'] },
  { href: 'listado_box.html', label: 'Catálogo (grid)', match: ['listado_box.html'] },
  { href: 'comprar.html', label: 'Comprar', match: ['comprar.html'] },
];

export function initNavbar(cartService) {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  const current = window.location.pathname.split('/').pop();

  mount.innerHTML = `
    <div class="nav container">
      <a class="nav__brand" href="index.html">
        <span class="nav__brand-mark">N</span>
        <span class="nav__brand-text">Ni<strong>Commerce</strong></span>
      </a>

      <nav class="nav__links" id="nav-links" aria-label="Navegación principal">
        ${LINKS.map(
          (link) => `<a href="${link.href}" class="${link.match.includes(current) ? 'is-active' : ''}">${link.label}</a>`
        ).join('')}
      </nav>

      <div class="nav__actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar tema claro/oscuro">
          ${icon('sun', 'icon theme-toggle__sun')}
          ${icon('moon', 'icon theme-toggle__moon')}
        </button>
        <a class="cart-pill" href="comprar.html" aria-label="Ver carrito">
          ${icon('cart', 'icon')}
          <span class="cart-pill__count" id="cart-count">0</span>
        </a>
        <button class="nav__toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
          ${icon('menu', 'icon')}
        </button>
      </div>
    </div>
  `;

  initThemeToggle();

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = icon(isOpen ? 'close' : 'menu', 'icon');
  });

  const updateCount = (items) => {
    const count = items.reduce((total, item) => total + item.cantidad, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = String(count);
  };

  updateCount(cartService.getItems());
  cartService.subscribe(updateCount);
}
