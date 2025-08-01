// --- CONFIGURACIÓN DEL JUEGO ---
const preguntas = [
    { pregunta: "¿Cuándo es mi cumpleaños, amor?", respuesta: "6 DE NOVIEMBRE" },
    { pregunta: "¿Cuántos años tengo, amor?", respuesta: "21" },
    { pregunta: "¿Qué jornada viví yo, amor?", respuesta: "15" },
    { pregunta: "¿En cuántos equipos de jornadas he participado con la XXIII, amor?", respuesta: "8" },
    { pregunta: "¿Qué deporte me gusta mucho, amor?", respuesta: "FUTBOL" },
    { pregunta: "¿Quién es mi ídolo en el fútbol, amor?", respuesta: "CRISTIANO RONALDO DOS SANTOS AVEIRO" },
    { pregunta: "¿Cuáles son mis equipos favoritos, amor?", respuesta: "ATLETICO NACIONAL Y REAL MADRID" },
    { pregunta: "¿Cuáles son mis colores favoritos, amor? (son tres)", respuesta: "VERDE BLANCO Y NEGRO" },
    { pregunta: "¿Cuál es mi fruta favorita, amor?", respuesta: "GUANABANA" },
    { pregunta: "¿Quién es mi persona favorita, amor?", respuesta: "MI NOVIA" }
];
let preguntaActual = 0;

// --- LÓGICA DE LA REPRODUCCIÓN DE MÚSICA ---
const audio = document.getElementById('musicaFondo');
const canciones = Array.from(audio.getElementsByTagName('source'));
let cancionActualIndex = 0;
let musicaIniciada = false;

// Función para reproducir la siguiente canción de la lista
const reproducirSiguiente = () => {
    cancionActualIndex = (cancionActualIndex + 1) % canciones.length;
    audio.src = canciones[cancionActualIndex].src;
    audio.play();
};

// Se activa cuando una canción termina para pasar a la siguiente
audio.addEventListener('ended', reproducirSiguiente);

// --- CONTROL DE PANTALLAS ---
function mostrarPantalla(idPantalla) {
    // IMPORTANTE: Iniciar la música con la primera interacción del usuario
    if (!musicaIniciada) {
        audio.play().catch(error => {
            console.log("El navegador bloqueó la reproducción automática. Esperando interacción.");
        });
        musicaIniciada = true;
    }
    
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    document.getElementById(idPantalla).classList.add('activa');

    if (idPantalla === 'pantalla3') {
        mostrarPregunta();
    }
}

// --- PANTALLA 2: LÓGICA DE LA FECHA ---
function validarFecha() {
    const fechaIngresada = document.getElementById('fechaNovios').value;
    const mensajeError = document.getElementById('mensajeErrorFecha');
    if (fechaIngresada === '2025-07-26') { 
        mostrarPantalla('pantalla3');
    } else {
        mensajeError.textContent = 'Esa no es nuestra fecha, amor. ¡Inténtalo de nuevo!';
    }
}

// --- PANTALLA 3: LÓGICA DEL JUEGO ---
function mostrarPregunta() {
    const contenedorJuego = document.getElementById('juego');
    contenedorJuego.innerHTML = '';

    if (preguntaActual < preguntas.length) {
        const divPregunta = document.createElement('div');
        divPregunta.classList.add('pregunta');
        divPregunta.innerHTML = `
            <p>${preguntas[preguntaActual].pregunta}</p>
            <input type="text" id="respuestaUsuario" autofocus onkeydown="if(event.key==='Enter'){verificarRespuesta()}">
            <button onclick="verificarRespuesta()">Responder</button>
            <p id="mensajeErrorJuego" class="error"></p>
        `;
        contenedorJuego.appendChild(divPregunta);
        document.getElementById('respuestaUsuario').focus();
    } else {
        document.getElementById('juego').classList.add('hidden');
        document.getElementById('cofre').classList.remove('hidden');
    }
}

function verificarRespuesta() {
    const respuestaUsuario = document.getElementById('respuestaUsuario').value.trim();
    const mensajeErrorJuego = document.getElementById('mensajeErrorJuego');
    const respuestaCorrecta = preguntas[preguntaActual].respuesta;

    if (respuestaUsuario.toUpperCase() === respuestaCorrecta) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        mensajeErrorJuego.textContent = 'Respuesta incorrecta. ¡Tú puedes, amor!';
    }
}