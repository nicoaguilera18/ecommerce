import { cartService } from '../app.js';
import { ProductRepository } from '../data/products.js';
import { renderProductBoxes } from '../ui/render/boxRenderer.js';

const resultsEl = document.getElementById('box-results');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const resultsCount = document.getElementById('results-count');

function populateCategories() {
  ProductRepository.getCategories().forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function handleAddToCart(id) {
  const product = ProductRepository.getById(id);
  if (product) cartService.addItem(product, 1);
}

function applySort(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case 'precio-asc':
      return sorted.sort((a, b) => a.precio - b.precio);
    case 'precio-desc':
      return sorted.sort((a, b) => b.precio - a.precio);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

function applyFilters() {
  const term = searchInput.value;
  const category = categoryFilter.value;

  let products = term ? ProductRepository.search(term) : ProductRepository.getAll();
  if (category !== 'todas') {
    products = products.filter((p) => p.categoria === category);
  }
  products = applySort(products, sortSelect.value);

  resultsCount.textContent = `${products.length} producto${products.length === 1 ? '' : 's'}`;
  renderProductBoxes(resultsEl, products, { onAddToCart: handleAddToCart });
}

populateCategories();
applyFilters();
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
