const lightbox = new PhotoSwipeLightbox({
  gallery: '.timeline', // Selecciona el contenedor con la clase pswp-gallery
  children: 'a', // Los elementos clickeables dentro son los enlaces <a>
  pswpModule: PhotoSwipe // El módulo principal de PhotoSwipe
});

lightbox.init();

// Aseguramos que la función sea global adjuntándola a "window"
window.startExperience = function() {
    document.getElementById('intro-overlay').classList.add('hidden');
    const main = document.getElementById('main-story');
    main.classList.add('visible');
    window.scrollTo(0, 0);
    
    // Iniciar la música automáticamente al entrar
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    
    // El .catch evita errores si el navegador bloquea el autoplay por seguridad
    audio.play().catch(error => console.log("Música en espera de interacción")); 
    
    btnMusica.innerHTML = '<i class="bi bi-pause-fill"></i>';
    btnMusica.classList.add('musica-activa');
};

// Aseguramos que la función de pausar sea global
window.toggleMusica = function() {
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');

    if (audio.paused) {
        audio.play();
        btnMusica.innerHTML = '<i class="bi bi-pause-fill"></i>';
        btnMusica.classList.add('musica-activa');
    } else {
        audio.pause();
        btnMusica.innerHTML = '<i class="bi bi-play-fill"></i>';
        btnMusica.classList.remove('musica-activa');
    }
};

// Contador de días (Desde el 7 de febrero de 2026)
function updateCounter() {
    const startDate = new Date('2026-02-07T00:00:00');
    const today = new Date();
    const diff = today - startDate;
    
    // Milisegundos a días
    const totalDays = diff / (1000 * 60 * 60 * 24);
    const daysInt = Math.floor(totalDays);
    
    // Cálculos solicitados
    const weeks = (totalDays / 7).toFixed(2);
    const months = (totalDays / 30.4375).toFixed(2); // Promedio de días por mes
    const years = (totalDays / 365.25).toFixed(2);

    // Actualizar el DOM
    const contadorPrincipal = document.getElementById('contador-principal');
    if (contadorPrincipal) {
        contadorPrincipal.innerHTML = `Llevamos <strong>${daysInt}</strong> días siendo inmensamente felices <i class="bi bi-stars"></i>`;
    }

    // Actualizar estadísticas detalladas
    document.getElementById('stat-semanas').textContent = weeks;
    document.getElementById('stat-meses').textContent = months;
    document.getElementById('stat-años').textContent = years;
}

// Generador de partículas de corazones en la pantalla inicial
function createHeart() {
    const overlay = document.getElementById('intro-overlay');
    // Si la capa está oculta, detenemos la creación de corazones
    if (overlay && overlay.classList.contains('hidden')) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    // Ícono de corazón usando clase de Bootstrap Icons, o un emoji si prefieres
    heart.innerHTML = '<i class="bi bi-heart-fill"></i>'; 
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    heart.style.opacity = Math.random();
    
    overlay.appendChild(heart);
    
    // Remueve el corazón después de 4 segundos para no saturar el DOM
    setTimeout(() => { heart.remove(); }, 4000);
}

// Iniciar procesos al cargar la ventana
window.addEventListener('DOMContentLoaded', () => {
    setInterval(createHeart, 400);
    updateCounter();
});

