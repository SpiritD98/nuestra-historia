const lightbox = new PhotoSwipeLightbox({
  gallery: '.timeline', // Selecciona el contenedor con la clase pswp-gallery
  children: 'a', // Los elementos clickeables dentro son los enlaces <a>
  pswpModule: PhotoSwipe // El módulo principal de PhotoSwipe
});

async function cargarTimeline() {
    try {
        // 1. Llamamos al archivo JSON
        const respuesta = await fetch('timeline.json');
        const historias = await respuesta.json();
        
        const contenedor = document.getElementById('timeline-container');
        let htmlCompleto = '';

        // 2. Recorremos cada historia del JSON
        historias.forEach(item => {
            
            // Preparamos el texto (si existe)
            let textoHtml = item.texto ? `<p>${item.texto}</p>` : '';

            // Preparamos las imágenes (si hay)
            let imagenesHtml = '';
            if (item.imagenes && item.imagenes.length > 0) {
                item.imagenes.forEach(img => {
                    imagenesHtml += `
                        <a href="${img.src}" data-pswp-width="${img.width}" data-pswp-height="${img.height}">
                            <img src="${img.src}" alt="${img.alt}" loading="lazy">
                        </a>
                    `;
                });
            }

            // Preparamos el GIF del personaje (si existe)
            let gifHtml = '';
            if (item.personajeGif) {
                gifHtml = `
                    <div class="timeline-character">
                        <img src="${item.personajeGif.src}" alt="${item.personajeGif.alt}" loading="lazy">
                    </div>
                `;
            }

            // 3. Ensamblamos la tarjeta completa
            htmlCompleto += `
                <div class="timeline-item ${item.posicion}">
                    <div class="content">
                        <h2>${item.titulo}</h2>
                        ${textoHtml}
                        ${imagenesHtml}
                    </div>
                    ${gifHtml}
                </div>
            `;
        });

        // 4. Inyectamos todo al HTML
        contenedor.innerHTML = htmlCompleto;

        // 5. ¡Ahora sí activamos el visor de fotos!
        lightbox.init();

    } catch (error) {
        console.error("Error al cargar la historia:", error);
        document.getElementById('timeline-container').innerHTML = 
            '<p class="text-center">Hubo un pequeño error recordando nuestra historia, pero mi amor por ti sigue intacto ❤️</p>';
    }
}

// Mes dinamico
const fechaInicio = new Date('2026-02-07');

const hoy = new Date();

let meses =
  (hoy.getFullYear() - fechaInicio.getFullYear()) * 12 +
  (hoy.getMonth() - fechaInicio.getMonth());

// Si el día de hoy es menor al día 7, restamos 1 mes porque aún no se cumple
if (hoy.getDate() < fechaInicio){
    meses--;
}

document.getElementById("meses-intro").textContent = meses;

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
        indice = Math.floor(Math.random() * razones.length);
    } while (indice === ultimaRazon);

    ultimaRazon = indice;

    // Actualiza el texto
    document.getElementById("love-reason").textContent = razones[indice];
    
    document.getElementById("modal-razones").classList.add("activo");

    // Reutilizamos tu función de corazones para que salgan chispas cuando lee una razón
    for(let i = 0; i < 5; i++) {
        setTimeout(createHeartInModal, i * 200);
    }
}

// Función para cerrar la ventana
window.cerrarRazon = function() {
    document.getElementById("modal-razones").classList.remove("activo");
}

// Pequeña función para que los corazones salgan sobre el modal y no abajo
function createHeartInModal() {
    const modal = document.getElementById('modal-razones');
    if (!modal.classList.contains('activo')) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '<i class="bi bi-heart-fill" style="color:#ff4d6d; z-index: 10000; position:absolute;"></i>'; 
    
    // Posición aleatoria dentro de la pantalla
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    modal.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 3000);
}

// --- NUEVO: LISTA DE REPRODUCCIÓN (PLAYLIST) ---
const playlist = [
    "music/FAKE LOVE (Rocking Vibe Mix).mp3",
    "music/Lights.mp3"
    // Se agregaran mas canciones Ej:
    // "music/Dynamite.mp3",
    // "music/SpringDay.mp3"
];

let currentSongIndex = 0;

window.startExperience = function() {
    document.getElementById('intro-overlay').classList.add('hidden');
    const main = document.getElementById('main-story');
    main.classList.add('visible');
    window.scrollTo(0, 0);
    
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');

    btnMusica.style.display = 'flex';

    if (!audio.src) {
        audio.src = playlist[currentSongIndex];
    }
    
    audio.play().then(() => {
        btnMusica.classList.add('musica-activa');
    }).catch(error => console.log("Música en espera de interacción")); 
};

window.toggleMusica = function() {
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');

    if (audio.paused) {
        audio.play();
        btnMusica.classList.add('musica-activa');
    } else {
        audio.pause();
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
    cargarTimeline();
    setInterval(updateAnniversaryCountdown, 60000);

    // Listener para cambiar de cancion cuando termine la actual
    const audio = document.getElementById('musica-fondo');
    audio.addEventListener('ended', () => {
        currentSongIndex++; // pasamos a la siguiente

        //Si se tocaron todas, se vuelve a la primera
        if (currentSongIndex >= playlist.length) {
            currentSongIndex = 0;
        }

        audio.src = playlist[currentSongIndex];
        audio.play();
    })
});
