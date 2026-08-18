/**
 * CartService
 * -----------------------------------------------------------------------
 * Responsabilidad única: administrar el estado del carrito (agregar, quitar,
 * modificar cantidades, calcular totales) y notificar a quien esté
 * escuchando (patrón Observer simplificado) cuando el carrito cambia.
 *
 * Recibe el "storage" por constructor en lugar de acceder a localStorage
 * directamente → Inversión de Dependencias. Esto además permite testear la
 * clase con un storage falso (mock) sin depender del navegador.
 */
const CART_KEY = 'novatech_cart';

export class CartService {
  #storage;
  #items;
  #listeners = new Set();

  constructor(storage) {
    this.#storage = storage;
    this.#items = this.#storage.get(CART_KEY, []);
  }

  /** Suscribe una función que se ejecuta cada vez que el carrito cambia. */
  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notify() {
    this.#storage.set(CART_KEY, this.#items);
    this.#listeners.forEach((listener) => listener(this.getItems()));
  }

  getItems() {
    return [...this.#items];
  }

  getItemCount() {
    return this.#items.reduce((total, item) => total + item.cantidad, 0);
  }

  getTotal() {
    return this.#items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  addItem(product, cantidad = 1) {
    const existente = this.#items.find((item) => item.id === product.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.#items.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        cantidad,
      });
    }
    this.#notify();
  }

  updateQuantity(id, cantidad) {
    const item = this.#items.find((i) => i.id === Number(id));
    if (!item) return;
    item.cantidad = Math.max(1, Number(cantidad) || 1);
    this.#notify();
  }

  removeItem(id) {
    this.#items = this.#items.filter((i) => i.id !== Number(id));
    this.#notify();
  }

  clear() {
    this.#items = [];
    this.#notify();
  }
}
