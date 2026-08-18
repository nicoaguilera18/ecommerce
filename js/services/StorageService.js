/**
 * StorageService
 * -----------------------------------------------------------------------
 * Interfaz mínima (I de SOLID: Interface Segregation) que abstrae el medio
 * de persistencia. CartService depende de ESTA abstracción y no del
 * localStorage del navegador (D de SOLID: Dependency Inversion). Si mañana
 * se necesita persistir en una API, alcanza con crear otra implementación
 * con los mismos tres métodos (get/set/remove) sin tocar CartService.
 */
export class LocalStorageService {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.error(`[StorageService] Error leyendo "${key}":`, error);
      return fallback;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error guardando "${key}":`, error);
      return false;
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}
