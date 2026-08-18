import { LocalStorageService } from './services/StorageService.js';
import { CartService } from './services/CartService.js';
import { initNavbar } from './ui/components/Navbar.js';
import { initFooter } from './ui/components/Footer.js';

/**
 * Composition root: acá, y solo acá, se "cablean" las dependencias
 * concretas (Dependency Injection manual). El resto del código nunca
 * instancia StorageService ni CartService directamente.
 */
export const storageService = new LocalStorageService();
export const cartService = new CartService(storageService);

initNavbar(cartService);
initFooter();
