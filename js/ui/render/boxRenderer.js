import { formatCurrency, formatRating } from '../../services/format.js';
import { productMedia } from './mediaRenderer.js';
import { icon } from '../icons.js';

/** Pinta el listado de productos en formato "box" (tarjetas) dentro de `container`. */
export function renderProductBoxes(container, products, { onAddToCart }) {
  if (!products.length) {
    container.innerHTML = `<p class="empty-state">No se encontraron productos con ese criterio.</p>`;
    return;
  }

  container.innerHTML = products
    .map(
      (p) => `
    <article class="product-card" data-id="${p.id}">
      <a class="product-card__media-link" href="producto.html?id=${p.id}">
        ${productMedia(p, { size: 'lg' })}
      </a>
      <div class="product-card__body">
        <span class="badge">${p.categoria}</span>
        <h3 class="product-card__title">
          <a href="producto.html?id=${p.id}">${p.nombre}</a>
        </h3>
        <p class="product-card__desc">${p.descripcionCorta}</p>
        <div class="product-card__meta">
          <span class="product-card__rating" title="${p.rating.toFixed(1)} de 5">${formatRating(p.rating)}</span>
          <span class="${p.stock <= 5 ? 'cell-stock cell-stock--low' : 'cell-stock'}">${p.stock} en stock</span>
        </div>
      </div>
      <div class="product-card__footer">
        <span class="product-card__price">${formatCurrency(p.precio)}</span>
        <button class="btn btn--primary btn--sm" data-add="${p.id}">
          ${icon('cart', 'icon icon--sm')} Agregar
        </button>
      </div>
    </article>
  `
    )
    .join('');

  container.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => onAddToCart(Number(btn.dataset.add)));
  });
}
