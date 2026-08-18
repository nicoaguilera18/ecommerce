import { cartService } from '../app.js';
import { ProductRepository } from '../data/products.js';
import { renderProductDetail, renderRelatedProducts } from '../ui/render/productRenderer.js';
import { renderProductBoxes } from '../ui/render/boxRenderer.js';

const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id')) || 1;

const detailEl = document.getElementById('product-detail');
const relatedEl = document.getElementById('related-products');
const breadcrumbEl = document.getElementById('breadcrumb-product');

const product = ProductRepository.getById(id);
renderProductDetail(detailEl, product);

if (product) {
  if (breadcrumbEl) breadcrumbEl.textContent = product.nombre;
  document.title = `${product.nombre} · NiCommerce`;

  const related = ProductRepository.getRelated(id);
  renderProductBoxes(relatedEl, related, {
    onAddToCart: (relatedId) => {
      const relatedProduct = ProductRepository.getById(relatedId);
      if (relatedProduct) cartService.addItem(relatedProduct, 1);
    },
  });

  // Controles de cantidad + agregar al carrito
  const qtyInput = document.getElementById('qty-value');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const addBtn = document.getElementById('add-to-cart-btn');
  const feedback = document.getElementById('add-feedback');

  qtyMinus.addEventListener('click', () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  qtyPlus.addEventListener('click', () => {
    qtyInput.value = Math.min(product.stock, Number(qtyInput.value) + 1);
  });
  addBtn.addEventListener('click', () => {
    const cantidad = Math.min(product.stock, Math.max(1, Number(qtyInput.value) || 1));
    cartService.addItem(product, cantidad);
    feedback.textContent = `Agregaste ${cantidad} unidad${cantidad > 1 ? 'es' : ''} al carrito.`;
    setTimeout(() => (feedback.textContent = ''), 3000);
  });
}
