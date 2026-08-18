/**
 * ProductRepository
 * -----------------------------------------------------------------------
 * Responsabilidad única (S de SOLID): es la ÚNICA fuente de verdad sobre
 * los productos y su acceso. Ningún otro módulo conoce la forma en la que
 * los datos están almacenados (array en memoria, podría ser un fetch a una
 * API en el futuro sin romper a los consumidores → Open/Closed).
 */

const CATEGORIES = Object.freeze({
  AURICULARES: 'Auriculares',
  SMARTWATCH: 'Smartwatch',
  NOTEBOOKS: 'Notebooks',
  ACCESORIOS: 'Accesorios',
  PERIFERICOS: 'Periféricos',
});

const PRODUCTS = Object.freeze([
  {
    id: 1,
    nombre: 'NiBuds Pro',
    categoria: CATEGORIES.AURICULARES,
    precio: 89999,
    stock: 14,
    rating: 4.7,
    icono: 'headphones',
    color: '#F2B705',
    descripcionCorta: 'Auriculares TWS con cancelación activa de ruido.',
    descripcion:
      'Auriculares inalámbricos NiBuds Pro con cancelación activa de ruido (ANC), estuche de carga inalámbrica y hasta 32 horas de batería total. Ideales para viajes, estudio y llamadas gracias a su ecualización adaptativa.',
    specs: [
      { label: 'Autonomía', valor: '8h (32h con estuche)' },
      { label: 'Conectividad', valor: 'Bluetooth 5.3' },
      { label: 'Cancelación de ruido', valor: 'Activa (ANC) + modo ambiente' },
      { label: 'Resistencia', valor: 'IPX4' },
    ],
  },
  {
    id: 2,
    nombre: 'NiBuds Air',
    categoria: CATEGORIES.AURICULARES,
    precio: 54999,
    stock: 22,
    rating: 4.4,
    icono: 'headphones',
    color: '#4FD1C5',
    descripcionCorta: 'Livianos, compactos y con gran calidad de sonido.',
    descripcion:
      'Versión liviana de la línea NiBuds, pensada para uso diario. Estuche ultra compacto, controles táctiles y sonido balanceado con graves potentes.',
    specs: [
      { label: 'Autonomía', valor: '6h (24h con estuche)' },
      { label: 'Conectividad', valor: 'Bluetooth 5.2' },
      { label: 'Peso', valor: '4.2g por unidad' },
      { label: 'Resistencia', valor: 'IPX3' },
    ],
  },
  {
    id: 3,
    nombre: 'NiWatch S2',
    categoria: CATEGORIES.SMARTWATCH,
    precio: 129999,
    stock: 9,
    rating: 4.6,
    icono: 'watch',
    color: '#F2B705',
    descripcionCorta: 'Smartwatch con GPS, oxímetro y pantalla AMOLED.',
    descripcion:
      'El NiWatch S2 combina una pantalla AMOLED de 1.43", GPS integrado, monitoreo de frecuencia cardíaca y oxígeno en sangre, más de 100 modos deportivos y 10 días de batería.',
    specs: [
      { label: 'Pantalla', valor: 'AMOLED 1.43" 466x466' },
      { label: 'Batería', valor: 'Hasta 10 días' },
      { label: 'Resistencia al agua', valor: '5 ATM' },
      { label: 'Sensores', valor: 'GPS, SpO2, FC, acelerómetro' },
    ],
  },
  {
    id: 4,
    nombre: 'NiWatch Lite',
    categoria: CATEGORIES.SMARTWATCH,
    precio: 74999,
    stock: 17,
    rating: 4.2,
    icono: 'watch',
    color: '#4FD1C5',
    descripcionCorta: 'Ideal para empezar en el mundo fitness.',
    descripcion:
      'Diseño delgado y liviano con seguimiento de actividad física, notificaciones inteligentes y una autonomía de hasta 14 días. Perfecto como primer smartwatch.',
    specs: [
      { label: 'Pantalla', valor: 'IPS 1.1" color' },
      { label: 'Batería', valor: 'Hasta 14 días' },
      { label: 'Resistencia al agua', valor: 'IP68' },
      { label: 'Sensores', valor: 'FC, acelerómetro, sueño' },
    ],
  },
  {
    id: 5,
    nombre: 'NiBook 14 Slim',
    categoria: CATEGORIES.NOTEBOOKS,
    precio: 899999,
    stock: 5,
    rating: 4.8,
    icono: 'laptop',
    color: '#F2B705',
    descripcionCorta: 'Notebook ultraliviana para trabajo y estudio.',
    descripcion:
      'Notebook de 14" con procesador de última generación, 16GB de RAM y SSD de 512GB. Chasis de aluminio de 1.3kg, teclado retroiluminado y hasta 12 horas de batería.',
    specs: [
      { label: 'Procesador', valor: '8 núcleos, hasta 4.4GHz' },
      { label: 'RAM', valor: '16GB LPDDR5' },
      { label: 'Almacenamiento', valor: '512GB SSD NVMe' },
      { label: 'Batería', valor: 'Hasta 12 horas' },
    ],
  },
  {
    id: 6,
    nombre: 'NiBook 15 Creator',
    categoria: CATEGORIES.NOTEBOOKS,
    precio: 1349999,
    stock: 3,
    rating: 4.9,
    icono: 'laptop',
    color: '#4FD1C5',
    descripcionCorta: 'Potencia gráfica para diseño y desarrollo.',
    descripcion:
      'Pensada para creadores de contenido y desarrolladores: pantalla 2.5K de 15.6", GPU dedicada, 32GB de RAM y SSD de 1TB. Sistema de refrigeración dual para cargas exigentes.',
    specs: [
      { label: 'Pantalla', valor: '15.6" 2.5K 165Hz' },
      { label: 'RAM', valor: '32GB DDR5' },
      { label: 'GPU', valor: 'Dedicada 8GB VRAM' },
      { label: 'Almacenamiento', valor: '1TB SSD NVMe' },
    ],
  },
  {
    id: 7,
    nombre: 'NiMouse Wireless',
    categoria: CATEGORIES.PERIFERICOS,
    precio: 24999,
    stock: 40,
    rating: 4.3,
    icono: 'mouse',
    color: '#4FD1C5',
    descripcionCorta: 'Mouse ergonómico silencioso, 3 dispositivos.',
    descripcion:
      'Mouse inalámbrico con conexión simultánea a 3 dispositivos, clic silencioso y sensor óptico de alta precisión. Batería recargable con hasta 60 días de uso.',
    specs: [
      { label: 'Conectividad', valor: 'Bluetooth + Dongle 2.4GHz' },
      { label: 'DPI', valor: 'Hasta 4000' },
      { label: 'Batería', valor: 'Hasta 60 días' },
      { label: 'Botones', valor: '6 programables' },
    ],
  },
  {
    id: 8,
    nombre: 'NiKeyboard TKL',
    categoria: CATEGORIES.PERIFERICOS,
    precio: 59999,
    stock: 18,
    rating: 4.5,
    icono: 'keyboard',
    color: '#F2B705',
    descripcionCorta: 'Teclado mecánico compacto, switches táctiles.',
    descripcion:
      'Teclado mecánico formato TKL (sin numpad) con switches táctiles, retroiluminación RGB personalizable y estructura en aluminio. Conexión con cable USB-C desmontable.',
    specs: [
      { label: 'Switches', valor: 'Mecánicos táctiles' },
      { label: 'Retroiluminación', valor: 'RGB por tecla' },
      { label: 'Conexión', valor: 'USB-C desmontable' },
      { label: 'Formato', valor: 'TKL (87 teclas)' },
    ],
  },
  {
    id: 9,
    nombre: 'NiPower 20K',
    categoria: CATEGORIES.ACCESORIOS,
    precio: 39999,
    stock: 30,
    rating: 4.1,
    icono: 'battery',
    color: '#4FD1C5',
    descripcionCorta: 'Powerbank 20.000mAh con carga rápida 30W.',
    descripcion:
      'Batería portátil de 20.000mAh con carga rápida de 30W, dos puertos USB-A y un USB-C bidireccional. Permite cargar notebook, celular y auriculares al mismo tiempo.',
    specs: [
      { label: 'Capacidad', valor: '20.000 mAh' },
      { label: 'Carga rápida', valor: '30W USB-C PD' },
      { label: 'Puertos', valor: '2x USB-A, 1x USB-C' },
      { label: 'Peso', valor: '380g' },
    ],
  },
  {
    id: 10,
    nombre: 'NiHub USB-C 7 en 1',
    categoria: CATEGORIES.ACCESORIOS,
    precio: 29999,
    stock: 25,
    rating: 4.0,
    icono: 'hub',
    color: '#F2B705',
    descripcionCorta: 'Expandí tu notebook con 7 puertos en uno.',
    descripcion:
      'Hub USB-C con salida HDMI 4K, lector de tarjetas SD/microSD, dos puertos USB 3.0 y carga por USB-C PD pass-through. Ideal para notebooks ultraligeras.',
    specs: [
      { label: 'Salida de video', valor: 'HDMI 4K@30Hz' },
      { label: 'Puertos', valor: '2x USB 3.0, SD, microSD' },
      { label: 'Carga', valor: 'USB-C PD 100W pass-through' },
      { label: 'Material', valor: 'Aluminio' },
    ],
  },
  {
    id: 11,
    nombre: 'NiCam Stream',
    categoria: CATEGORIES.PERIFERICOS,
    precio: 44999,
    stock: 12,
    rating: 4.3,
    icono: 'camera',
    color: '#4FD1C5',
    descripcionCorta: 'Webcam Full HD con micrófono dual integrado.',
    descripcion:
      'Webcam Full HD 1080p a 60fps con enfoque automático, corrección de luz y micrófono dual con reducción de ruido. Perfecta para streaming, clases y videollamadas.',
    specs: [
      { label: 'Resolución', valor: '1080p @ 60fps' },
      { label: 'Enfoque', valor: 'Automático' },
      { label: 'Micrófono', valor: 'Dual, con reducción de ruido' },
      { label: 'Conexión', valor: 'USB-A' },
    ],
  },
  {
    id: 12,
    nombre: 'NiWatch Kids',
    categoria: CATEGORIES.SMARTWATCH,
    precio: 49999,
    stock: 20,
    rating: 3.9,
    icono: 'watch',
    color: '#F2B705',
    descripcionCorta: 'Smartwatch infantil con GPS y videollamada.',
    descripcion:
      'Diseñado para los más chicos: localización GPS, botón SOS, videollamada y resistencia al agua. Control total desde una app para los padres.',
    specs: [
      { label: 'Localización', valor: 'GPS + LBS' },
      { label: 'Extras', valor: 'Botón SOS, videollamada' },
      { label: 'Resistencia al agua', valor: 'IP67' },
      { label: 'Batería', valor: 'Hasta 5 días' },
    ],
  },
]);

export const ProductRepository = {
  getAll() {
    return [...PRODUCTS];
  },
  getById(id) {
    return PRODUCTS.find((p) => p.id === Number(id)) ?? null;
  },
  getByCategory(categoria) {
    if (!categoria || categoria === 'todas') return this.getAll();
    return PRODUCTS.filter((p) => p.categoria === categoria);
  },
  search(term) {
    const t = (term ?? '').trim().toLowerCase();
    if (!t) return this.getAll();
    return PRODUCTS.filter(
      (p) =>
        p.nombre.toLowerCase().includes(t) ||
        p.categoria.toLowerCase().includes(t) ||
        p.descripcionCorta.toLowerCase().includes(t)
    );
  },
  getCategories() {
    return Object.values(CATEGORIES);
  },
  getRelated(id, max = 4) {
    const product = this.getById(id);
    if (!product) return [];
    return PRODUCTS.filter((p) => p.categoria === product.categoria && p.id !== product.id).slice(0, max);
  },
};

export { CATEGORIES };
