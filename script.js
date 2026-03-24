/* =========================================
   RojoFan - script.js
   ========================================= */

// ── Configuración central ──────────────────
const NUMERO_WHATSAPP = "7225889112"; // Un solo lugar para cambiar el número

// ── Dark Mode ─────────────────────────────
const body = document.body;
// Seleccionar AMBOS botones de dark mode (escritorio y móvil)
const botonesToggle = document.querySelectorAll(".btn-dark-mode");

function aplicarTema(isDark) {
  body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  botonesToggle.forEach((btn) => {
    btn.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
  });
}

// Aplicar tema guardado al cargar
aplicarTema(localStorage.getItem("theme") === "dark");

// Un solo listener por botón, sin re-disparar el otro
botonesToggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    aplicarTema(!body.classList.contains("dark-mode"));
  });
});

// ── Menú hamburguesa ──────────────────────
const btnHamburguesa = document.getElementById("btn-hamburguesa");
const menuMobile = document.getElementById("menu-mobile");

btnHamburguesa.addEventListener("click", () => {
  const isOpen = menuMobile.classList.toggle("activo");
  btnHamburguesa.setAttribute("aria-expanded", isOpen);
  btnHamburguesa.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

// Cerrar menú al hacer clic en un enlace
menuMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuMobile.classList.remove("activo");
    btnHamburguesa.setAttribute("aria-expanded", "false");
    btnHamburguesa.setAttribute("aria-label", "Abrir menú");
  });
});

// ── Botón flotante WhatsApp ────────────────
const btnWhatsapp = document.getElementById("btn-whatsapp");
btnWhatsapp.href = `https://wa.me/52${NUMERO_WHATSAPP}?text=${encodeURIComponent(
  "Hola RojoFan, me interesa una playera 👹🔥"
)}`;

// ── Formulario de pedido ───────────────────
const formulario = document.getElementById("form-pedido");
const btnEnviar = formulario.querySelector(".btn-formulario");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const modeloSelect = document.getElementById("modelo");
  const modeloTexto = modeloSelect.options[modeloSelect.selectedIndex].text;

  // Estado de carga
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Abriendo WhatsApp…";

  const mensaje =
    `¡Hola RojoFan! 👹🔥\n\n` +
    `Soy *${nombre}*.\n` +
    `Me interesa encargar la playera modelo: *${modeloTexto}*.\n\n` +
    `Mi teléfono de contacto es: ${telefono}.\n\n` +
    `¡Quedo a la espera para coordinar la entrega!`;

  const urlWhatsApp = `https://wa.me/52${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(urlWhatsApp, "_blank");

  // Feedback de éxito
  mostrarMensajeExito();

  // Restaurar botón y limpiar formulario
  setTimeout(() => {
    formulario.reset();
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Enviar Pedido por WhatsApp";
  }, 3000);
});

function mostrarMensajeExito() {
  // Eliminar mensaje anterior si existía
  const anterior = document.getElementById("mensaje-exito");
  if (anterior) anterior.remove();

  const msg = document.createElement("div");
  msg.id = "mensaje-exito";
  msg.setAttribute("role", "alert");
  msg.innerHTML = `
    <span class="exito-icono">✅</span>
    <span>¡Listo! Te estamos redirigiendo a WhatsApp para confirmar tu pedido.</span>
  `;
  formulario.insertAdjacentElement("afterend", msg);

  setTimeout(() => msg.remove(), 5000);
}

// ── Carrusel infinito generado con JS ─────
const imagenes = [
  { src: "imagenes/PaulinhoRF.webp", alt: "Fan con playera RojoFan en el estadio" },
  { src: "imagenes/Aficion.webp",    alt: "Afición diabólica apoyando al equipo" },
  { src: "imagenes/PaulinhoRF.webp", alt: "Seguidor luciendo los colores rojos" },
  { src: "imagenes/Aficion.webp",    alt: "Fans en la tribuna con playeras RojoFan" },
  { src: "imagenes/PaulinhoRF.webp", alt: "Aficionado con diseño exclusivo RojoFan" },
];

function construirCarrusel() {
  const track = document.getElementById("carrusel-track");
  if (!track) return;

  // Doble copia para el loop infinito sin repetir HTML
  [...imagenes, ...imagenes].forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = "foto-carrusel";
    img.loading = "lazy";
    track.appendChild(img);
  });
}

construirCarrusel();

// ── Animación de entrada al hacer scroll ──
const observador = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observador.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".tarjeta-producto, .seccion-catalogo h2, .seccion-comunidad h2, .seccion-contacto h2").forEach((el) => {
  el.classList.add("fade-in");
  observador.observe(el);
});
