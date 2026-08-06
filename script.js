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
const fechaInicio = new Date('2026-02-07T00:00:00');

const hoy = new Date();

let meses =
  (hoy.getFullYear() - fechaInicio.getFullYear()) * 12 +
  (hoy.getMonth() - fechaInicio.getMonth());

// Si el día de hoy es menor al día 7, restamos 1 mes porque aún no se cumple
if (hoy.getDate() < fechaInicio.getDate()){
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
    // 1. Desvanecemos la carta y el ramo (El contenedor del juego)
    const juegoContainer = document.getElementById('juego-flores-container');
    juegoContainer.style.transition = 'opacity 1s ease';
    juegoContainer.style.opacity = '0';
    
    setTimeout(() => {
        juegoContainer.style.display = 'none';
    }, 1000);
    
    // 2. Revelamos tus fotos (Quitamos lo borroso)
    document.getElementById('fondo-borroso').classList.add('desbloqueado');
    
    // 3. Preparamos el timeline y la música
    const main = document.getElementById('main-story');
    main.style.display = 'block';
    main.style.opacity = '0';
    
    const audio = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    btnMusica.style.display = 'flex';

    if (!audio.src || audio.src === window.location.href) {
        audio.src = playlist[currentSongIndex];
    }
    
    audio.play().then(() => {
        btnMusica.classList.add('musica-activa');
    }).catch(error => console.log("Música en espera")); 

    // 4. El toque mágico: Esperamos 2.5 segundos para que aprecie el collage...
    // ...y luego deslizamos la pantalla hacia abajo suavemente
    setTimeout(() => {
        main.classList.add('visible');

        main.style.transition = 'opacity 2s ease-in-out';
        main.style.opacity = '1';

        window.scrollTo({
            top: window.innerHeight, // Hace scroll exactamente una pantalla hacia abajo
            behavior: 'smooth'
        });
    }, 2500);
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

// --- LÓGICA DEL TECLADO DE FLORES ---

// 1. Tu diccionario de recursos (Asegúrate de tener estas imágenes en tu carpeta img/)
const catalogoFlores = [
    'img/tulipanMorado.png',
    'img/girasol.png',      // 0
    'img/lirioRosado.png',        // 1
    'img/astromeliaNaranja.png',   // 2
    'img/rosaBlanca.png',  // 3
    'img/rosaRosada.png'
];

let floresEnRamo = []; // Aquí guardaremos el historial para poder borrar
const CLAVE_SECRETA = "NUBECITA";
let palabraEscrita = "";
const MAX_FLORES = 20; // Límite para que el ramo no explote

// Función matemática para que una letra siempre dé la misma flor
function obtenerFlorPorLetra(letra) {
    // Convierte la letra (ej. 'A') a un número y lo divide entre la cantidad de flores que tienes
    const indice = letra.charCodeAt(0) % catalogoFlores.length;
    return catalogoFlores[indice];
}

window.presionarTecla = function(letra) {
    if (floresEnRamo.length >= MAX_FLORES) {
        return; 
    }

    palabraEscrita += letra;
    document.getElementById('display-palabra').textContent = palabraEscrita;

    const contenedor = document.getElementById('flores-generadas');
    const rutaImagen = obtenerFlorPorLetra(letra);

    const nuevaFlor = document.createElement('img');
    nuevaFlor.src = rutaImagen;
    nuevaFlor.className = 'flor-teclado';
    
    // Nace oculta y pequeña
    nuevaFlor.style.transform = `translate(0px, 40px) scale(0) rotate(0deg)`;
    contenedor.appendChild(nuevaFlor);
    
    // --- LA MAGIA DEL ABANICO (Distribución pre-calculada) ---
    const index = floresEnRamo.length;
    
    // Coordenadas diseñadas a mano para crear un ramo perfecto (X, Y, Rotación)
    // Especialmente calibrado para las 8 letras de NUBECITA
    const posicionesAbanico = [
        { x: -25, y: -20, rot: -15 }, // 0 (N) - Izquierda
        { x: 25, y: -20, rot: 15 },   // 1 (U) - Derecha
        { x: -15, y: -20, rot: -5 },  // 2 (B) - Centro Izq, más alta
        { x: 15, y: -20, rot: 5 },    // 3 (E) - Centro Der, más alta
        { x: -25, y: -5, rot: -25 },  // 4 (C) - Extremo Izq, más baja
        { x: 25, y: -5, rot: 25 },    // 5 (I) - Extremo Der, más baja
        { x: 0, y: -25, rot: 0 },     // 6 (T) - Centro exacto, en la cima
        { x: 0, y: -10, rot: (Math.random() * 10 - 5) } // 7 (A) - Relleno central inferior
    ];

    let offsetX, offsetY, rotacion;

    // Si está dentro de las primeras 8 letras, usa el mapa perfecto
    if (index < posicionesAbanico.length) {
        offsetX = posicionesAbanico[index].x;
        offsetY = posicionesAbanico[index].y;
        rotacion = posicionesAbanico[index].rot;
    } else {
        // Si sigue escribiendo más de 8 letras, usa un azar controlado
        offsetX = (Math.random() - 0.5) * 80; 
        rotacion = offsetX * 0.5; 
        offsetY = (Math.random() * -30) - 10;
    }

    floresEnRamo.push(nuevaFlor);

    // Forzamos al navegador a leer el CSS
    nuevaFlor.getBoundingClientRect(); 

    // Aplicamos la posición final 
    nuevaFlor.style.opacity = "1";
    nuevaFlor.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1) rotate(${rotacion}deg)`;
};

window.borrarLetra = function() {
    if (floresEnRamo.length > 0) {

        palabraEscrita = palabraEscrita.slice(0, -1);
        document.getElementById('display-palabra').textContent = palabraEscrita;

        // Sacamos la última flor del historial
        const ultimaFlor = floresEnRamo.pop();
        
        // Hacemos que se encoja antes de morir
        ultimaFlor.style.opacity = "0";
        ultimaFlor.style.transform = `translate(0px, 40px) scale(0) rotate(0deg)`;
        
        // La eliminamos del HTML después de la animación
        setTimeout(() => {
            ultimaFlor.remove();
        }, 300);
    }
};

window.confirmarRamo = function() {
    // 1. VALIDACIÓN DE LA CONTRASEÑA
    if (palabraEscrita !== CLAVE_SECRETA) {
        const display = document.getElementById('display-palabra');
        display.style.color = "red";

        // Animación de temblor indicando error
        display.style.transform = "translateX(-10px)";
        setTimeout(() => display.style.transform = "translateX(10px)", 100);
        setTimeout(() => display.style.transform = "translateX(-10px)", 200);
        setTimeout(() => {
            display.style.transform = "translateX(0)";
            display.style.color = "var(--pink-hot)";
        }, 300);

        return; // Detiene la ejecución si se equivoca
    }

    // 2. Si es correcto, ocultar el juego
    document.getElementById('teclado-virtual').style.opacity = '0';
    document.getElementById('teclado-virtual').style.pointerEvents = 'none';
    document.getElementById('titulo-juego').style.opacity = '0';
    document.getElementById('instruccion-teclado').style.opacity = '0';
    document.getElementById('display-palabra').style.opacity = '0';

    // Hacer que la carta suba después de casi un segundo
    setTimeout(() => {
        const carta = document.getElementById('carta-secreta');
        carta.classList.add('revelada');
        
        // Empezar a escribir el mensaje
        escribirCarta();
    }, 800);
};

function escribirCarta() {
    // Puedes personalizar este mensaje como quieras. 
    // Usamos \n para los saltos de línea.
    const mensaje = "Como cada flor es única, así de única eres tú para mí.\n\nEste ramo lleva tu apodo, porque tú haces florecer mi vida todos los días.\n\nTe amo muchísimo ❤️";
    
    const elementoTexto = document.getElementById('texto-maquina');
    elementoTexto.innerHTML = ''; 
    let i = 0;

    const intervalo = setInterval(() => {
        if (i < mensaje.length) {
            // Manejar los saltos de línea para inyectar <br> en HTML
            if (mensaje.charAt(i) === '\n') {
                elementoTexto.innerHTML += '<br>';
            } else {
                elementoTexto.innerHTML += mensaje.charAt(i);
            }
            i++;
        } else {
            // Terminó de escribir
            clearInterval(intervalo);
            
            // 4. Mostrar el botón rojo para ir a la historia
            setTimeout(() => {
                const btn = document.getElementById('enter-btn');
                btn.classList.remove('hidden');
                btn.classList.add('animate__animated', 'animate__fadeInUp'); // Opcional si usas animate.css
                
                // Desaparecemos todo el juego al dar clic (Ya lo hace tu startExperience)
            }, 500); // Espera medio segundo tras terminar de escribir
        }
    }, 60); // 60ms por letra. (Hazlo más pequeño si quieres que escriba más rápido)
}

// --- TRANSICIÓN A LA TEMPORADA 2 ---
window.transicionMedioAno = function() {
    // 1. Mostrar la pantalla de fondo oscuro
    const pantalla = document.getElementById('pantalla-transicion');
    pantalla.classList.add('activa');

    // 2. Generar la ráfaga de pétalos
    const contenedorPetalos = document.getElementById('lluvia-petalos');
    
    // Creamos 60 pétalos para una lluvia tupida
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const petalo = document.createElement('div');
            petalo.classList.add('petalo-cae');
            
            // 50% de probabilidad de que sea rojo o morado
            if (Math.random() > 0.5) {
                petalo.classList.add('morado');
            }

            // Posicionamiento horizontal aleatorio a lo ancho de la pantalla
            petalo.style.left = (Math.random() * 100) + 'vw';
            
            // Tamaños aleatorios para simular profundidad
            const escala = (Math.random() * 0.8) + 0.5; 
            
            // Tiempos de caída aleatorios (entre 2 y 4 segundos)
            const duración = (Math.random() * 2) + 2; 
            
            petalo.style.animationDuration = duración + 's';
            petalo.style.transform = `scale(${escala})`;
            
            contenedorPetalos.appendChild(petalo);
        }, i * 40); // Aparecen rápidamente uno tras otro (cada 40 milisegundos)
    }

    // 3. Teletransportar a Brenda después de 3.5 segundos
    setTimeout(() => {
        window.location.href = 'temporada2.html';
    }, 3500);
};