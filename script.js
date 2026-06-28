const lightbox = new PhotoSwipeLightbox({
  gallery: '.timeline', // Selecciona el contenedor con la clase pswp-gallery
  children: 'a', // Los elementos clickeables dentro son los enlaces <a>
  pswpModule: PhotoSwipe // El módulo principal de PhotoSwipe
});

lightbox.init();

// Mes dinamico
const fechaInicio = new Date('2026-02-07');

const hoy = new Date();

let meses =
  (hoy.getFullYear() - fechaInicio.getFullYear()) * 12 +
  (hoy.getMonth() - fechaInicio.getMonth());

document.getElementById("meses").textContent = meses;

const numerosTexto = [
  "",
  "Un",
  "Dos",
  "Tres",
  "Cuatro",
  "Cinco",
  "Seis",
  "Siete",
  "Ocho",
  "Nueve",
  "Diez",
  "Once",
  "Doce"
];

document.getElementById("tituloHistoria").textContent =
`${numerosTexto[meses]} Meses de Puro Amor`;

//Contador de dias restantes
function updateAnniversaryCountdown() {
    const fechaInicio = new Date('2026-02-07');
    const hoy = new Date();

    // Próximo día 7
    let proximoAniversario = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        7
    );

    // Si ya pasó el día 7 de este mes
    if (hoy.getDate() >= 7) {
        proximoAniversario.setMonth(
            proximoAniversario.getMonth() + 1
        );
    }

    const diferencia = proximoAniversario - hoy;

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const contador = document.getElementById(
        "contador-aniversario"
    );

    if (contador) {
        contador.innerHTML =
            `<i class="bi bi-hearts"></i> Faltan <strong>${dias}</strong> días, <strong>${horas}</strong> horas y <strong>${minutos}</strong> minutos para nuestro próximo mesversario`;
    }
}

const razones = [
    "Porque tu sonrisa tiene el poder de mejorar cualquier día.",
    "Porque eres la persona con la que más me gusta hablar.",
    "Porque me haces sentir querido incluso en mis peores días.",
    "Porque tus ojitos me enamoraron desde la primera vez que te vi.",
    "Porque contigo todo se siente más sencillo.",
    "Porque siempre encuentras la forma de hacerme reír.",
    "Porque me apoyas incluso cuando yo mismo dudo de mí.",
    "Porque eres tan bonita que debería ser ilegal.",
    "Porque cada recuerdo contigo se convierte en uno de mis favoritos.",
    "Porque eres mi lugar seguro.",
    "Porque amo escuchar tu voz.",
    "Porque haces que los días normales se vuelvan especiales.",
    "Porque me inspiras a ser una mejor persona.",
    "Porque tu felicidad se volvió importante para mí.",
    "Porque cada mes contigo supera al anterior.",
    "Porque eres mi nubecita favorita.",
    "Porque me encanta imaginar mi futuro contigo.",
    "Porque me haces sentir afortunado todos los días.",
    "Porque desde que llegaste mi vida tiene más color.",
    "Porque te amo exactamente como eres."
];

let ultimaRazon = -1;

window.mostrarRazon = function() {

    let indice;

    do {
        indice = Math.floor(
            Math.random() * razones.length
        );
    } while (indice === ultimaRazon);

    ultimaRazon = indice;

    document.getElementById("love-reason")
        .textContent = razones[indice];
}

// Aseguramos que la función sea global adjuntándola a "window"
window.startExperience = function() {
    document.getElementById('intro-overlay').classList.add('hidden');
    const main = document.getElementById('main-story');
    main.classList.add('visible');
    window.scrollTo(0, 0);
    
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    
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
    updateAnniversaryCountdown();
    mostrarRazon();
    setInterval(updateAnniversaryCountdown, 60000);
});

