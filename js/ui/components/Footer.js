export function initFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  const year = new Date().getFullYear();

  mount.innerHTML = `
    <div class="footer container">
      <div class="footer__brand">
        <span class="nav__brand-mark">N</span>
        <span>Ni<strong>Commerce</strong></span>
        <p>Tecnología pensada para tu día a día. Proyecto académico — Paradigmas y Lenguajes de Programación III.</p>
      </div>
      <div class="footer__col">
        <h4>Catálogo</h4>
        <a href="listado_tabla.html">Vista tabla</a>
        <a href="listado_box.html">Vista grid</a>
        <a href="comprar.html">Finalizar compra</a>
      </div>
      <div class="footer__col">
        <h4>Ayuda</h4>
        <a href="#">Medios de pago</a>
        <a href="#">Envíos</a>
        <a href="#">Preguntas frecuentes</a>
      </div>
      <div class="footer__bottom">© ${year} NiCommerce · UCP — Ingeniería en Sistemas de Información</div>
    </div>
  `;
}
