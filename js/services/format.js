/**
 * Funciones puras de formato. Se mantienen separadas del resto de la
 * lógica para poder reutilizarlas en cualquier renderer sin acoplamiento.
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatRating(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}
