# NiCommerce — Front-end (TP Paradigmas y Lenguajes de Programación III)

Proyecto de e-commerce **100% front-end** (HTML5 + CSS3 + JavaScript ES Modules,
sin frameworks ni build tools) desarrollado para la cátedra de Paradigmas y
Lenguajes de Programación III — UCP, Ingeniería en Sistemas de Información.

> **Aclaración importante:** este proyecto no tiene backend ni servidor propio.
> Todo el "estado" (carrito de compras, tema claro/oscuro) vive en el navegador
> mediante `localStorage`, a través de una capa de servicios (`CartService`,
> `ThemeService`) que en el futuro podría reemplazarse por llamadas a una API
> real sin tener que tocar el resto del código (Open/Closed + Dependency
> Inversion). Es java**script** de cliente, no un servidor Node/Express.

## Cómo ejecutarlo

No requiere instalación. Al usar `<script type="module">`, los navegadores
bloquean la carga de módulos desde `file://`, así que hay que servirlo con
cualquier servidor estático:

```bash
# Opción 1: Python (viene instalado en la mayoría de los sistemas)
cd nicommerce-frontend
python3 -m http.server 8080
# luego abrir http://localhost:8080

# Opción 2: extensión "Live Server" de VS Code
# clic derecho sobre index.html → "Open with Live Server"

# Opción 3: Node
npx serve .
```

## Páginas

| Archivo               | Contenido                                                        |
|------------------------|-------------------------------------------------------------------|
| `index.html`           | Portada: hero, categorías y productos destacados                 |
| `listado_tabla.html`   | Catálogo completo en formato **tabla**, con buscador y filtro     |
| `listado_box.html`     | Catálogo completo en formato **grid/tarjetas**, con orden y filtro|
| `producto.html?id=N`   | Ficha de producto individual + relacionados                      |
| `comprar.html`         | Formulario de compra + carrito editable                          |

## Estructura del código

```
├── index.html / listado_tabla.html / listado_box.html / producto.html / comprar.html
├── css/
│   └── styles.css          # Tokens de diseño (light/dark), layout, componentes, responsive
└── js/
    ├── app.js              # Composition root: instancia servicios e inyecta dependencias
    ├── data/
    │   └── products.js     # ProductRepository — única fuente de datos de productos
    ├── services/
    │   ├── StorageService.js  # Abstracción sobre localStorage (Dependency Inversion)
    │   ├── CartService.js     # Lógica de negocio del carrito
    │   ├── ThemeService.js    # Lógica de tema claro/oscuro
    │   └── format.js          # Helpers de formato (moneda, rating)
    ├── ui/
    │   ├── icons.js               # Set de íconos SVG inline
    │   ├── components/
    │   │   ├── Navbar.js           # Header + navegación + contador de carrito + toggle de tema
    │   │   └── Footer.js
    │   └── render/
    │       ├── tableRenderer.js    # Pinta listado_tabla.html
    │       ├── boxRenderer.js      # Pinta listado_box.html
    │       ├── productRenderer.js  # Pinta producto.html
    │       ├── cartRenderer.js     # Pinta el carrito en comprar.html
    │       └── mediaRenderer.js    # Miniatura visual del producto
    └── pages/
        ├── index.js / listadoTabla.js / listadoBox.js / producto.js / comprar.js
        # Un controlador por página: conecta Repository + Service + Renderer
```

## Principios SOLID aplicados

- **S — Single Responsibility:** cada módulo hace una sola cosa (repositorio de
  datos, lógica de carrito, renderizado de una vista, etc).
- **O — Open/Closed:** `ProductRepository` puede ganar nuevos métodos de
  consulta sin tocar `CartService`; se pueden agregar vistas nuevas
  (renderers) sin modificar las existentes.
- **L — Liskov Substitution:** cualquier objeto que implemente la interfaz de
  `StorageService` (`get/set/remove`) puede reemplazar a `LocalStorageService`
  sin romper `CartService`.
- **I — Interface Segregation:** la interfaz de `StorageService` es mínima (3
  métodos), no fuerza a implementar nada que no se use.
- **D — Dependency Inversion:** `CartService` depende de la abstracción
  `StorageService`, inyectada por constructor desde `app.js` (composition
  root), no de `localStorage` directamente.

## Documentación de análisis y diseño

El análisis (casos de uso, diagrama de clases, justificación de SOLID) está en
el documento `NiCommerce - Analisis y Diseno.pdf` entregado junto con este
código.

## Autor

Nicolás — 3er año, Ingeniería en Sistemas de Información, UCP (Comisión A).
