/* ===== Theme toggle (persistente) ===== */
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');

if (saved === 'light') {
  root.classList.add('light');
  if (themeToggle) themeToggle.textContent = '🌞';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light');
    themeToggle.textContent = isLight ? '🌞' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ===== Parallax suave con el mouse ===== */
const layers = document.querySelectorAll('.layer');

// Solo se activa si realmente hay elementos con .layer
if (layers.length) {
  window.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX - w / 2) / w;
    const y = (e.clientY - h / 2) / h;

    layers.forEach((el, i) => {
      const depth = (i + 1) * 6; // 6, 12, 18...
      el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}

/* ===== Botón: Escanear área ===== */
const scanBtn = document.getElementById('scan');
const scanResult = document.getElementById('scan-result');

const scans = [
  "🔎 No encontramos esta página en Marte. Mejor vuelve al inicio.",
  "🛰️ Señal perdida. La URL parece estar fuera de órbita.",
  "📡 No hay rastro de esta ruta. Comprueba la dirección o regresa a la base.",
  "🧭 Coordenadas erróneas. Esta zona del mapa marciano está vacía."
];

if (scanBtn && scanResult) {
  scanBtn.addEventListener('click', () => {
    scanBtn.disabled = true;
    scanResult.textContent = "Escaneando la superficie marciana…";

    setTimeout(() => {
      const msg = scans[Math.floor(Math.random() * scans.length)];
      scanResult.textContent = msg;
      scanBtn.disabled = false;
    }, 900);
  });
}

/* ===== Botón: Lanzar cohete ===== */
const rocket = document.querySelector('.rocket');
const launchBtn = document.getElementById('launch');

if (rocket && launchBtn) {
  launchBtn.addEventListener('click', () => {
    // Reiniciamos animación por si ya se lanzó antes
    rocket.classList.remove('launch');

    // Forzamos reflow para que la animación se pueda volver a disparar
    void rocket.offsetWidth;

    rocket.classList.add('launch');

    // Vibración opcional si el dispositivo lo soporta
    if (navigator.vibrate) {
      navigator.vibrate([40, 40, 40]);
    }
  });
}