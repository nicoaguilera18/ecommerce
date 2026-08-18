import { icon } from '../icons.js';

/**
 * Genera el "thumbnail" de un producto sin usar imágenes externas: un
 * degradé de marca + el ícono de la categoría. Mantiene el proyecto 100%
 * autocontenido y funcionando offline.
 */
export function productMedia(product, { size = 'md' } = {}) {
  return `
    <div class="product-media product-media--${size}" style="--from:${product.color};">
      ${icon(product.icono, 'product-media__icon')}
    </div>
  `;
}
