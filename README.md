# NiCommerce — Front-end (TP Paradigmas y Lenguajes de Programación III)

Proyecto de e-commerce **100% front-end** (HTML5 + CSS3 + JavaScript ES Modules,
sin frameworks ni build tools) desarrollado para la cátedra de Paradigmas y
Lenguajes de Programación III — UCP, Ingeniería en Sistemas de Información.

> **Aclaración:** este proyecto todavía no tiene backend ni servidor propio.
> Todo el "estado" vive en el navegador mediante `localStorage`.

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
│   └── styles.css          # Tokens de diseño (modo oscuro o claro), layout, componentes, responsive
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

## Documentación de análisis y diseño

El análisis (casos de uso, diagrama de clases, etc) está en
el documento  entregado junto con este
código.

## Autor

Leandro Nicolas Aguilera Danese — 3er año, Ingeniería en Sistemas de Información, UCP (Comisión A).
