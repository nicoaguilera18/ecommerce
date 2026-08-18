import { cartService } from '../app.js';
import { ProductRepository } from '../data/products.js';
import { renderProductBoxes } from '../ui/render/boxRenderer.js';

const featuredEl = document.getElementById('featured-products');

function handleAddToCart(id) {
  const product = ProductRepository.getById(id);
  if (product) cartService.addItem(product, 1);
}

const featured = ProductRepository.getAll()
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

renderProductBoxes(featuredEl, featured, { onAddToCart: handleAddToCart });
