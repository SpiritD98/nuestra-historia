// --- GENERADOR DE LLUVIA DE ESTRELLAS ---
function iniciarLluviaEstrellas() {
    const fondo = document.getElementById('pantalla-bienvenida');
    
    // Creamos el contenedor de las estrellas
    const contenedor = document.createElement('div');
    contenedor.id = 'estrellas-fondo';
    fondo.appendChild(contenedor); // Lo insertamos en la pantalla 1

    // Cada 300ms nace una nueva estrella
    setInterval(() => {
        const estrella = document.createElement('div');
        estrella.classList.add('estrella-fugaz');
        
        // Posición horizontal aleatoria
        estrella.style.left = Math.random() * 100 + 'vw';
        
        // Duración de caída aleatoria (entre 3 y 7 segundos para variedad)
        estrella.style.animationDuration = (Math.random() * 4 + 3) + 's';
        
        contenedor.appendChild(estrella);

        // Limpiamos la estrella del HTML después de que caiga (7 segundos)
        setTimeout(() => estrella.remove(), 7000);
    }, 300);
}

// Iniciar la lluvia de estrellas al cargar el script
iniciarLluviaEstrellas();


// --- CONFIGURACIÓN INICIAL ---
const mensajesAmor = [
    "Amo tu sonrisa más que a nada.",
    "Nuestros recuerdos están aquí, no en un celular.",
    "Eres mi persona favorita en todo el universo.",
    "Estos 6 meses son solo el inicio.",
    "Me haces inmensamente feliz, Nubecita."
];

let mensajesLeidos = 0;
let musicaIniciada = false;

// --- FUNCIÓN 1: TOCAR EL FRASCO ---
window.tocarFrasco = function(event) {
    if (!musicaIniciada) {
        const audio = document.getElementById('audio-ambiente');
        audio.volume = 0.15; 
        audio.play().catch(e => console.log("Interacción requerida para audio"));
        musicaIniciada = true;
    }

    const contenedor = document.getElementById('contenedor-estrellas');
    const estrella = document.createElement('div');
    estrella.classList.add('estrella');

    const posX = (Math.random() * 100) - 50; 
    estrella.style.left = `calc(50% + ${posX}px)`;

    // LA SOLUCIÓN AL CLIC Y EL FUEGO ARTIFICIAL
    estrella.addEventListener('pointerdown', function(e) {
        e.stopPropagation(); // Evita que se dispare el frasco de nuevo
        
        // Coordenadas exactas donde hizo clic
        const rect = estrella.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        const centerY = rect.top + (rect.height / 2);

        // Disparar los fuegos artificiales
        crearFuegoArtificial(centerX, centerY);
        
        // Desaparecer la estrella inmediatamente
        estrella.remove();

        // Mostrar el pop-up
        setTimeout(() => {
            abrirMensaje();
        }, 400); 
    });

    contenedor.appendChild(estrella);

    setTimeout(() => {
        if (estrella.parentNode) estrella.remove();
    }, 9000); // 9 segundos porque ahora son más lentas
}

// --- FUNCIÓN 2: GENERAR FUEGOS ARTIFICIALES ---
function crearFuegoArtificial(x, y) {
    const numChispas = 12; // Cantidad de partículas que explotan
    
    for (let i = 0; i < numChispas; i++) {
        const chispa = document.createElement('div');
        chispa.classList.add('chispa');
        
        // Posicionar justo donde estaba la esfera
        chispa.style.left = x + 'px';
        chispa.style.top = y + 'px';
        
        // Matemáticas para disparar en círculo (360 grados)
        const angulo = (i * 360) / numChispas;
        const distancia = 60 + Math.random() * 40; // Qué tan lejos llega la explosión
        
        const tx = Math.cos(angulo * Math.PI / 180) * distancia;
        const ty = Math.sin(angulo * Math.PI / 180) * distancia;
        
        // Pasamos las variables al CSS
        chispa.style.setProperty('--tx', `${tx}px`);
        chispa.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(chispa);
        
        // Limpiamos la chispa del HTML luego de la animación
        setTimeout(() => chispa.remove(), 600);
    }
}

// --- FUNCIÓN 3: ABRIR EL MENSAJE ---
window.abrirMensaje = function() {
    const modal = document.getElementById('modal-mensaje');
    const texto = document.getElementById('texto-pop-up');
    
    const mensajeActual = mensajesAmor[mensajesLeidos % mensajesAmor.length];
    
    texto.textContent = mensajeActual;

    modal.classList.remove('oculto');

    setTimeout(() => {
        modal.classList.add('activo');
    }, 10);
    
    mensajesLeidos++;

    if (mensajesLeidos === 4) {
        const btn = document.getElementById('btn-avanzar');
        btn.classList.remove('oculto');
        btn.style.display = 'block'; // Aseguramos que se vea

        setTimeout(() => {
            btn.style.opacity = '1';
        }, 50);
    }
}

// --- FUNCIÓN 4: CERRAR EL MENSAJE ---
window.cerrarMensaje = function() {
    const modal = document.getElementById('modal-mensaje');
    modal.classList.remove('activo');

    setTimeout(() => {
        modal.classList.add('oculto');
    }, 300);
}

// --- FUNCIÓN 5: AVANZAR SIN RETORNO (CORREGIDA) ---
window.irAAudios = function() {
    const pantalla1 = document.getElementById('pantalla-bienvenida');
    
    // Le damos un efecto de desvanecimiento hacia arriba
    pantalla1.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    pantalla1.style.opacity = "0";
    pantalla1.style.transform = "translateY(-100px)";

    setTimeout(() => {
        // ELIMINAMOS visualmente la pantalla 1 para siempre
        pantalla1.style.display = "none"; 
        
        // Aseguramos que la pantalla quede arriba
        window.scrollTo(0, 0); 
        
        // Aquí, en el futuro, haremos aparecer la caja Love Yourself
        const pantalla2 = document.getElementById('pantalla-audios');

        pantalla2.style.display = "flex";
        pantalla2.style.opacity = "0";

        setTimeout(() => {
            pantalla2.style.transition = "opacity 2s ease-in-out";
            pantalla2.style.opacity = "1";
        }, 50);
        
    }, 1500); // Espera a que termine la animación
}


// --- LÓGICA DEL ÁLBUM POLAROID ---
let albumAbierto = false;
let audioActual = null;
let iconoActual = null;

// NUEVO: Creamos un "inventario" para guardar los meses que ya escuchó
let audiosEscuchados = new Set(); 

window.abrirAlbum = function() {
    if (albumAbierto) return; 
    
    const contenedor = document.getElementById('album-container');
    contenedor.classList.add('abierto');
    
    document.getElementById('instruccion-album').textContent = "Toca una foto para recordar...";
    document.getElementById('instruccion-album').style.color = "var(--rosa-claro)";
    
    albumAbierto = true;
}

window.enfocarPolaroid = function(mes, event) {
    if (!albumAbierto) return;
    event.stopPropagation(); 
    const polaroid = document.getElementById(`polaroid-${mes}`);
    if (polaroid.classList.contains('enfocada')) return;

    document.getElementById('overlay-polaroid').classList.add('activo');
    polaroid.classList.add('enfocada');
}

window.cerrarPolaroid = function() {
    document.getElementById('overlay-polaroid').classList.remove('activo');
    const polaroids = document.querySelectorAll('.polaroid-mes');
    polaroids.forEach(p => p.classList.remove('enfocada'));

    if (audioActual) {
        audioActual.pause();
        iconoActual.classList.remove('bi-pause-circle');
        iconoActual.classList.add('bi-play-circle');
        const audioFondo = document.getElementById('audio-ambiente');
        if (audioFondo) audioFondo.volume = 0.15;
    }
}

// Reproducir/Pausar y Registrar el progreso
window.toggleAudio = function(mes, event) {
    event.stopPropagation(); 
    
    const nuevoAudio = document.getElementById(`audio-mes-${mes}`);
    const nuevoIcono = document.getElementById(`icono-audio-${mes}`);
    const audioFondo = document.getElementById('audio-ambiente');

    // Si se hace clic en el audio que ya estaba sonando...
    if (audioActual === nuevoAudio) {
        if (!nuevoAudio.paused) {
            // Lo pausamos
            nuevoAudio.pause();
            nuevoIcono.classList.remove('bi-pause-circle');
            nuevoIcono.classList.add('bi-play-circle');
            if (audioFondo) audioFondo.volume = 0.15; // Sube volumen de fondo
        } else {
            // Lo reanudamos
            // AQUÍ AGREGAMOS EL .catch() PARA EVITAR EL ERROR EN CONSOLA
            nuevoAudio.play().catch(e => console.log("Error al reanudar:", e));
            
            nuevoIcono.classList.remove('bi-play-circle');
            nuevoIcono.classList.add('bi-pause-circle');
            if (audioFondo) audioFondo.volume = 0.05; // Baja volumen de fondo
        }
        return;
    }

    if (audioActual) {
        audioActual.pause();
        audioActual.currentTime = 0;
        iconoActual.classList.remove('bi-pause-circle');
        iconoActual.classList.add('bi-play-circle');
    }

    nuevoAudio.play().catch(e => console.log("Archivo de audio faltante", e));
    nuevoIcono.classList.remove('bi-play-circle');
    nuevoIcono.classList.add('bi-pause-circle');
    if (audioFondo) audioFondo.volume = 0.05;

    audioActual = nuevoAudio;
    iconoActual = nuevoIcono;
    
    // NUEVO: Registramos que escuchó este mes
    verificarProgreso(mes);
    
    nuevoAudio.onended = function() {
        nuevoIcono.classList.remove('bi-pause-circle');
        nuevoIcono.classList.add('bi-play-circle');
        audioActual = null;
        iconoActual = null;
        if (audioFondo) audioFondo.volume = 0.15;
    };
}

// NUEVO: La función que evalúa si ya desbloqueó el final
function verificarProgreso(mes) {
    audiosEscuchados.add(mes); // Añade el número de mes al inventario
    
    // Si el inventario tiene exactamente 6 elementos distintos...
    if (audiosEscuchados.size === 6) {
        const btnFinal = document.getElementById('btn-final');
        
        // Hacemos que nazca visible pero transparente
        btnFinal.style.display = 'block';
        
        // Un pequeño retraso para que el CSS procese la animación
        setTimeout(() => {
            btnFinal.style.opacity = '1';
            btnFinal.style.transform = 'translateY(0)';
        }, 100);
    }
}

// --- FUNCIÓN PARA MOSTRAR LA PANTALLA FINAL ---
window.irAlFinal = function() {
    // Si hay un audio sonando, lo apagamos para el momento íntimo
    if (audioActual) {
        audioActual.pause();
    }
    
    // Subimos la música de fondo un poco
    const audioFondo = document.getElementById('audio-ambiente');
    if (audioFondo) audioFondo.volume = 0.25;

    const pantalla2 = document.getElementById('pantalla-audios');
    const pantalla3 = document.getElementById('pantalla-final');

    // Transición visual
    pantalla2.style.display = 'none'; 
    pantalla3.style.display = 'flex';
    pantalla3.style.opacity = '0';
    
    // Fade in suave
    setTimeout(() => {
        pantalla3.style.transition = "opacity 1.5s ease";
        pantalla3.style.opacity = '1';
    }, 50);

    // Arrancamos el motor del lienzo
    iniciarRaspaYGana();
}

// --- EL MOTOR DEL RASPA Y GANA ---
function iniciarRaspaYGana() {
    const canvas = document.getElementById("lienzo-raspa");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    // 1. Igualar el tamaño del canvas interno con su tamaño en CSS
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 2. Pintar la capa superior (Un degradado espacial)
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#4a00e0"); // Violeta
    gradient.addColorStop(1, "#2b0014"); // Vino
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Escribir un texto directamente en la capa que se va a raspar
    ctx.font = "22px 'Poppins', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.textAlign = "center";
    ctx.fillText("Raspa para revelar...", canvas.width / 2, canvas.height / 2);

    let dibujando = false;

    // 3. Funciones para borrar
    const empezarDibujo = (e) => {
        dibujando = true;
        raspar(e);
    };

    const detenerDibujo = () => {
        dibujando = false;
        verificarPorcentaje(); // Revisa si ya raspó lo suficiente
    };

    const raspar = (e) => {
        if (!dibujando) return;
        e.preventDefault();

        // Obtener la posición exacta del dedo o mouse
        const rect = canvas.getBoundingClientRect();
        // Soporta PC (clientX) y Celular (touches[0])
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

        // La magia de la goma de borrar
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2); // 30 es el grosor del borrador
        ctx.fill();
    };

    // 4. Asignar los eventos para PC
    canvas.addEventListener("mousedown", empezarDibujo);
    canvas.addEventListener("mousemove", raspar);
    canvas.addEventListener("mouseup", detenerDibujo);
    canvas.addEventListener("mouseleave", detenerDibujo);

    // 5. Asignar los eventos para Celulares (Touch)
    canvas.addEventListener("touchstart", empezarDibujo, { passive: false });
    canvas.addEventListener("touchmove", raspar, { passive: false });
    canvas.addEventListener("touchend", detenerDibujo);

    // 6. Función para auto-completar el raspado
    function verificarPorcentaje() {
        // Tomamos los pixeles del lienzo
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixelesTransparentes = 0;
        
        // Saltamos de 40 en 40 para no saturar el celular con cálculos
        for (let i = 3; i < imageData.data.length; i += 40) {
            // Si el canal Alpha (transparencia) es 0, está borrado
            if (imageData.data[i] === 0) {
                pixelesTransparentes++;
            }
        }

        const totalPixelesRevisados = imageData.data.length / 40;
        const porcentajeBorrado = pixelesTransparentes / totalPixelesRevisados;

        // Si ya borró más del 45% de la imagen, hacemos la magia
        if (porcentajeBorrado > 0.45) {
            canvas.style.opacity = "0"; // Desvanece suavemente el polvo restante
            
            setTimeout(() => {
                canvas.style.display = "none"; 
                
                const msjFinal = document.getElementById("mensaje-final-amor");
                const btnVolver = document.getElementById("btn-volver");
                
                msjFinal.classList.remove('oculto');
                btnVolver.classList.remove('oculto');
                btnVolver.style.display = 'inline-block';
                
                // Retraso minúsculo para disparar las transiciones lentas
                setTimeout(() => {
                    msjFinal.classList.add("revelado");
                    btnVolver.classList.add("revelado");
                }, 50);
                
            }, 1500);
        }
    }
}

// NUEVA FUNCIÓN: Regresar a la página principal
window.volverAlInicio = function() {
    // Si tu página inicial se llama index.html, esto la llevará de vuelta
    window.location.href = 'index.html'; 
}