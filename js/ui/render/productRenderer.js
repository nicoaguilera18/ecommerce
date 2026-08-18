import { formatCurrency, formatRating } from '../../services/format.js';
import { productMedia } from './mediaRenderer.js';
import { icon } from '../icons.js';

export function renderProductDetail(container, product) {
  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No encontramos el producto solicitado.</p>
        <a class="btn btn--primary" href="listado_box.html">Volver al catálogo</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__media">
        ${productMedia(product, { size: 'xl' })}
      </div>
      <div class="product-detail__info">
        <span class="badge">${product.categoria}</span>
        <h1>${product.nombre}</h1>
        <p class="product-detail__rating">${formatRating(product.rating)} <span>(${product.rating.toFixed(1)} / 5)</span></p>
        <p class="product-detail__desc">${product.descripcion}</p>

        <dl class="specs-list">
          ${product.specs
            .map(
              (s) => `
            <div class="specs-list__row">
              <dt>${s.label}</dt>
              <dd>${s.valor}</dd>
            </div>
          `
            )
            .join('')}
        </dl>

        <div class="product-detail__buybox">
          <div>
            <span class="product-detail__price">${formatCurrency(product.precio)}</span>
            <span class="${product.stock <= 5 ? 'cell-stock cell-stock--low' : 'cell-stock'}">${product.stock} unidades disponibles</span>
          </div>
          <div class="qty-input">
            <button type="button" id="qty-minus" aria-label="Restar cantidad">−</button>
            <input type="number" id="qty-value" value="1" min="1" max="${product.stock}" />
            <button type="button" id="qty-plus" aria-label="Sumar cantidad">+</button>
          </div>
          <button class="btn btn--primary" id="add-to-cart-btn">
            ${icon('cart', 'icon icon--sm')} Agregar al carrito
          </button>
          <p class="form-hint" id="add-feedback" role="status" aria-live="polite"></p>
        </div>
      </div>
    </div>
  `;
}

export function renderRelatedProducts(container, related) {
  if (!related.length) {
    container.closest('section')?.remove();
    return;
  }
  container.innerHTML = related
    .map(
      (p) => `
      <article class="product-card product-card--sm">
        <a class="product-card__media-link" href="producto.html?id=${p.id}">
          ${productMedia(p, { size: 'md' })}
        </a>
        <div class="product-card__body">
          <h3 class="product-card__title"><a href="producto.html?id=${p.id}">${p.nombre}</a></h3>
          <span class="product-card__price">${formatCurrency(p.precio)}</span>
        </div>
      </article>
    `
    )
    .join('');
}
