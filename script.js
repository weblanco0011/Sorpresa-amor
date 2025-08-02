// --- CONFIGURACIÓN DE LA LISTA DE CANCIONES (CON RUTA A LA CARPETA 'audio') ---
const playlist = [
    'cancion1.mp3',
    'cancion2.mp3',
    'cancion3.mp3',
    'cancion4.mp3',
    'cancion5.mp3',
    'cancion6.mp3'
];

let cancionActualIndex = 0;
const audio = document.getElementById('musicaFondo');
let musicaIniciada = false;

// Cargar la primera canción en el reproductor para que esté lista
audio.src = playlist[cancionActualIndex];

// Función para reproducir la siguiente canción de la lista
function reproducirSiguiente() {
    // Avanza al siguiente índice, y si llega al final, vuelve al principio (loop)
    cancionActualIndex = (cancionActualIndex + 1) % playlist.length;
    console.log("Cambiando a la siguiente canción:", playlist[cancionActualIndex]); // Mensaje para depurar
    audio.src = playlist[cancionActualIndex];
    audio.play();
}

// Escuchar el evento 'ended' que se dispara cuando una canción termina
audio.addEventListener('ended', reproducirSiguiente);


// --- CONFIGURACIÓN DEL JUEGO ---
const preguntas = [
    { pregunta: "¿Cuándo es mi cumpleaños, amor?", respuesta: "6 DE NOVIEMBRE" },
    { pregunta: "¿Cuántos años tengo, amor?", respuesta: "21" },
    { pregunta: "¿Qué jornada viví yo, amor?", respuesta: "15" },
    { pregunta: "¿En cuántos equipos de jornadas he participado con la XXIII, amor?", respuesta: "8" },
    { pregunta: "¿Qué deporte me gusta mucho, amor?", respuesta: "FUTBOL" },
    { pregunta: "¿Quién es mi ídolo en el fútbol, amor?", respuesta: "CRISTIANO RONALDO DOS SANTOS AVEIRO" },
    { pregunta: "¿Cuáles son mis equipos favoritos, amor?", respuesta: "ATLETICO NACIONAL Y REAL MADRID" },
    { pregunta: "¿Cuáles son mis colores favoritos, amor? (son tres)", respuesta: "VERDE, BLANCO Y NEGRO" },
    { pregunta: "¿Cuál es mi fruta favorita, amor?", respuesta: "GUANABANA" },
    { pregunta: "¿Quién es mi persona favorita, amor?", respuesta: "MI NOVIA" }
];
let preguntaActual = 0;

// --- CONTROL DE PANTALLAS ---
function mostrarPantalla(idPantalla) {
    // Iniciar la música con la primera interacción para cumplir con las políticas del navegador
    if (!musicaIniciada) {
        console.log("Primer clic detectado. Intentando reproducir música..."); // Mensaje para depurar
        audio.play().catch(error => {
            console.error("Error al intentar reproducir audio:", error); // Mensaje si falla
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