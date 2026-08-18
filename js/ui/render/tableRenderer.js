import { formatCurrency } from '../../services/format.js';
import { productMedia } from './mediaRenderer.js';
import { icon } from '../icons.js';

/** Pinta el listado de productos en formato tabla dentro de `container`. */
export function renderProductTable(container, products, { onAddToCart }) {
  if (!products.length) {
    container.innerHTML = `<p class="empty-state">No se encontraron productos con ese criterio.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Rating</th>
            <th scope="col" class="table-actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (p) => `
            <tr data-id="${p.id}">
              <td>
                <div class="table-product">
                  ${productMedia(p, { size: 'sm' })}
                  <div>
                    <a class="table-product__name" href="producto.html?id=${p.id}">${p.nombre}</a>
                    <p class="table-product__desc">${p.descripcionCorta}</p>
                  </div>
                </div>
              </td>
              <td><span class="badge">${p.categoria}</span></td>
              <td class="cell-price">${formatCurrency(p.precio)}</td>
              <td class="${p.stock <= 5 ? 'cell-stock cell-stock--low' : 'cell-stock'}">${p.stock} u.</td>
              <td>${p.rating.toFixed(1)} ★</td>
              <td class="table-actions-col">
                <a class="btn btn--ghost btn--sm" href="producto.html?id=${p.id}">Ver</a>
                <button class="btn btn--primary btn--sm" data-add="${p.id}">
                  ${icon('cart', 'icon icon--sm')} Agregar
                </button>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;

  container.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => onAddToCart(Number(btn.dataset.add)));
  });
}
