import { formatCurrency } from '../../services/format.js';
import { icon } from '../icons.js';

export function renderCart(container, items, total) {
  if (!items.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Tu carrito está vacío.</p>
        <a class="btn btn--primary" href="listado_box.html">Ir al catálogo</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="table-wrapper">
      <table class="product-table cart-table">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio unit.</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr data-id="${item.id}">
              <td>
                <strong>${item.nombre}</strong>
                <p class="table-product__desc">${item.categoria}</p>
              </td>
              <td>${formatCurrency(item.precio)}</td>
              <td>
                <div class="qty-input qty-input--sm">
                  <button type="button" class="qty-minus" data-id="${item.id}" aria-label="Restar">−</button>
                  <input type="number" class="qty-value" data-id="${item.id}" value="${item.cantidad}" min="1" />
                  <button type="button" class="qty-plus" data-id="${item.id}" aria-label="Sumar">+</button>
                </div>
              </td>
              <td>${formatCurrency(item.precio * item.cantidad)}</td>
              <td>
                <button type="button" class="btn btn--ghost btn--sm btn--danger" data-remove="${item.id}" aria-label="Quitar producto">
                  ${icon('trash', 'icon icon--sm')}
                </button>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
    <div class="cart-total">
      <span>Total</span>
      <strong>${formatCurrency(total)}</strong>
    </div>
  `;
}
