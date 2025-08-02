// --- CONFIGURACIÓN DE LA LISTA DE CANCIONES ---
const playlist = [
    { src: 'cancion1.mp3', title: 'Ella Es Mi Todo - Kaleth Morales' },
    { src: 'cancion2.mp3', title: 'Índigo - Camilo & Evaluna Montaner' },
    { src: 'cancion3.mp3', title: 'Robarte un Beso - Carlos Vives & Sebastián Yatra' },
    { src: 'cancion4.mp3', title: 'Me Rehúso - Danny Ocean' },
    { src: 'cancion5.mp3', title: 'Si No Me Falla El Corazón - Los Diablitos' },
    { src: 'cancion6.mp3', title: 'Una Lady Como Tú - Manuel Turizo' },
];

let cancionActualIndex = 0;

// Elementos del DOM
const audio = document.getElementById('musicaFondo');
const playPauseIcon = document.getElementById('play-pause-icon');
const songTitleEl = document.getElementById('song-title');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
let musicaDesbloqueada = false;

// --- FUNCIONES DEL REPRODUCTOR ---

function loadSong(songIndex) {
    const song = playlist[songIndex];
    songTitleEl.textContent = song.title;
    audio.src = song.src;
}

// --- INICIO DE LA NUEVA LÓGICA DE PRECARGA ---
function preloadNextSong() {
    const nextIndex = (cancionActualIndex + 1) % playlist.length;
    // Crea un elemento de audio temporal solo para forzar la descarga en caché
    const tempAudio = new Audio();
    tempAudio.src = playlist[nextIndex].src;
    console.log("Precargando:", playlist[nextIndex].title);
}
// --- FIN DE LA NUEVA LÓGICA DE PRECARGA ---

function playPause() {
    if (!musicaDesbloqueada) {
        audio.play().catch(e => console.error("Error al iniciar audio:", e));
        musicaDesbloqueada = true;
    } else if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function nextSong() {
    cancionActualIndex = (cancionActualIndex + 1) % playlist.length;
    loadSong(cancionActualIndex);
    if (musicaDesbloqueada) audio.play();
}

function prevSong() {
    cancionActualIndex = (cancionActualIndex - 1 + playlist.length) % playlist.length;
    loadSong(cancionActualIndex);
    if (musicaDesbloqueada) audio.play();
}

// --- LÓGICA DE LA BARRA DE PROGRESO ---
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    const { duration, currentTime } = audio;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function setProgress(e) {
    if (audio.duration) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    }
}

// --- EVENT LISTENERS ---
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audio.duration);
});
progressContainer.addEventListener('click', setProgress);

// Actualizar iconos y ¡precargar la siguiente canción!
audio.onplay = () => {
    playPauseIcon.className = 'fas fa-pause';
    preloadNextSong(); // <--- AQUÍ SE LLAMA A LA PRECARGA
};
audio.onpause = () => playPauseIcon.className = 'fas fa-play';

// Carga inicial
loadSong(cancionActualIndex);

// --- EL RESTO DEL CÓDIGO DEL JUEGO PERMANECE IGUAL ---
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
function mostrarPantalla(idPantalla){document.querySelectorAll(".pantalla").forEach(e=>e.classList.remove("activa")),document.getElementById(idPantalla).classList.add("activa"),"pantalla3"===idPantalla&&mostrarPregunta()}function validarFecha(){"2025-07-26"===document.getElementById("fechaNovios").value?mostrarPantalla("pantalla3"):document.getElementById("mensajeErrorFecha").textContent="Esa no es nuestra fecha, amor. ¡Inténtalo de nuevo!"}function mostrarPregunta(){const e=document.getElementById("juego");if(e.innerHTML="",preguntaActual<preguntas.length){const t=document.createElement("div");t.classList.add("pregunta"),t.innerHTML=`<p>${preguntas[preguntaActual].pregunta}</p><input type="text" id="respuestaUsuario" autofocus onkeydown="if(event.key==='Enter'){verificarRespuesta()}"><button onclick="verificarRespuesta()">Responder</button><p id="mensajeErrorJuego" class="error"></p>`,e.appendChild(t),document.getElementById("respuestaUsuario").focus()}else document.getElementById("juego").classList.add("hidden"),document.getElementById("cofre").classList.remove("hidden")}function verificarRespuesta(){const e=document.getElementById("respuestaUsuario").value.trim(),t=document.getElementById("mensajeErrorJuego"),a=preguntas[preguntaActual].respuesta;e.toUpperCase()===a?(preguntaActual++,mostrarPregunta()):t.textContent="Respuesta incorrecta. ¡Tú puedes, amor!"}