import { cartService } from '../app.js';
import { ProductRepository } from '../data/products.js';
import { renderProductTable } from '../ui/render/tableRenderer.js';

const resultsEl = document.getElementById('table-results');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
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

function applyFilters() {
  const term = searchInput.value;
  const category = categoryFilter.value;

  let products = term ? ProductRepository.search(term) : ProductRepository.getAll();
  if (category !== 'todas') {
    products = products.filter((p) => p.categoria === category);
  }

  resultsCount.textContent = `${products.length} producto${products.length === 1 ? '' : 's'}`;
  renderProductTable(resultsEl, products, { onAddToCart: handleAddToCart });
}

populateCategories();
applyFilters();
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
