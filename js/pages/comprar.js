import { cartService } from '../app.js';
import { renderCart } from '../ui/render/cartRenderer.js';
import { formatCurrency } from '../services/format.js';

const cartMount = document.getElementById('cart-mount');
const form = document.getElementById('checkout-form');
const confirmation = document.getElementById('confirmation');
const submitBtn = document.getElementById('submit-btn');

function paint() {
  const items = cartService.getItems();
  renderCart(cartMount, items, cartService.getTotal());
  submitBtn.disabled = items.length === 0;
  attachCartHandlers();
}

function attachCartHandlers() {
  cartMount.querySelectorAll('.qty-minus').forEach((btn) =>
    btn.addEventListener('click', () => {
      const input = cartMount.querySelector(`.qty-value[data-id="${btn.dataset.id}"]`);
      cartService.updateQuantity(btn.dataset.id, Number(input.value) - 1);
    })
  );
  cartMount.querySelectorAll('.qty-plus').forEach((btn) =>
    btn.addEventListener('click', () => {
      const input = cartMount.querySelector(`.qty-value[data-id="${btn.dataset.id}"]`);
      cartService.updateQuantity(btn.dataset.id, Number(input.value) + 1);
    })
  );
  cartMount.querySelectorAll('.qty-value').forEach((input) =>
    input.addEventListener('change', () => {
      cartService.updateQuantity(input.dataset.id, input.value);
    })
  );
  cartMount.querySelectorAll('[data-remove]').forEach((btn) =>
    btn.addEventListener('click', () => cartService.removeItem(btn.dataset.remove))
  );
}

// --- Validación del formulario ---------------------------------------
const fieldValidators = {
  nombre: (v) => v.trim().length >= 3 || 'Ingresá tu nombre completo.',
  direccion: (v) => v.trim().length >= 5 || 'Ingresá una dirección válida.',
  telefono: (v) => /^[\d\s()+-]{6,20}$/.test(v.trim()) || 'Ingresá un teléfono válido.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Ingresá un e-mail válido.',
  medioPago: (v) => v !== '' || 'Seleccioná un medio de pago.',
};

function validateField(name, value) {
  const validator = fieldValidators[name];
  if (!validator) return true;
  const result = validator(value);
  const errorEl = form.querySelector(`[data-error-for="${name}"]`);
  const inputEl = form.elements[name];
  if (result === true) {
    if (errorEl) errorEl.textContent = '';
    inputEl.setAttribute('aria-invalid', 'false');
    return true;
  }
  if (errorEl) errorEl.textContent = result;
  inputEl.setAttribute('aria-invalid', 'true');
  return false;
}

Object.keys(fieldValidators).forEach((name) => {
  const input = form.elements[name];
  if (!input) return;
  input.addEventListener('blur', () => validateField(name, input.value));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  confirmation.hidden = true;

  const validations = Object.keys(fieldValidators).map((name) => validateField(name, form.elements[name].value));
  const items = cartService.getItems();

  if (items.length === 0) {
    return;
  }

  if (!validations.every(Boolean)) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  const orderData = {
    nombre: form.elements.nombre.value.trim(),
    direccion: form.elements.direccion.value.trim(),
    telefono: form.elements.telefono.value.trim(),
    email: form.elements.email.value.trim(),
    medioPago: form.elements.medioPago.value,
    productos: items,
    total: cartService.getTotal(),
  };

  showConfirmation(orderData);
  cartService.clear();
  form.reset();
});

function showConfirmation(order) {
  confirmation.hidden = false;
  confirmation.innerHTML = `
    <h2>¡Gracias, ${order.nombre}! 🎉</h2>
    <p>Tu pedido fue registrado correctamente. Te vamos a contactar a <strong>${order.email}</strong> para coordinar la entrega en <strong>${order.direccion}</strong>.</p>
    <ul class="confirmation-summary">
      ${order.productos.map((p) => `<li>${p.cantidad}× ${p.nombre} — ${formatCurrency(p.precio * p.cantidad)}</li>`).join('')}
    </ul>
    <p class="confirmation-total">Total abonado (${order.medioPago}): <strong>${formatCurrency(order.total)}</strong></p>
  `;
  confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

cartService.subscribe(paint);
paint();
