
// Modal para Jaid
const jaidBtn = document.getElementById("jaidBtn");
const modal = document.getElementById("modalJaid");

jaidBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "flex";
});

modal.addEventListener("click", () => {
    modal.style.display = "none";
});

// CARRUSEL DE IMÁGENES
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.carrusel-img');
    const indicadores = document.querySelectorAll('.indicador');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');
    let indexActual = 0;
    let intervalo;

    // Función para mostrar imagen según índice
    function mostrarImagen(index) {
        // Quitar clase active de todas
        imagenes.forEach(img => img.classList.remove('active'));
        indicadores.forEach(ind => ind.classList.remove('active'));
        
        // Asegurar que el índice esté en rango
        if (index < 0) index = imagenes.length - 1;
        if (index >= imagenes.length) index = 0;
        
        // Activar imagen e indicador correspondiente
        imagenes[index].classList.add('active');
        indicadores[index].classList.add('active');
        indexActual = index;
    }

    // Siguiente imagen
    function siguienteImagen() {
        mostrarImagen(indexActual + 1);
    }

    // Imagen anterior
    function anteriorImagen() {
        mostrarImagen(indexActual - 1);
    }

    // Iniciar auto-play
    function iniciarAutoplay() {
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(siguienteImagen, 4000); // Cambia cada 4 segundos
    }

    // Detener auto-play
    function detenerAutoplay() {
        clearInterval(intervalo);
    }

    // Event listeners para botones
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            anteriorImagen();
            detenerAutoplay();
            iniciarAutoplay(); // Reiniciar intervalo
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            siguienteImagen();
            detenerAutoplay();
            iniciarAutoplay(); // Reiniciar intervalo
        });
    }

    // Event listeners para indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            mostrarImagen(index);
            detenerAutoplay();
            iniciarAutoplay(); // Reiniciar intervalo
        });
    });

    // Pausar autoplay cuando el mouse está sobre el carrusel
    const carrusel = document.querySelector('.carrusel-container');
    if (carrusel) {
        carrusel.addEventListener('mouseenter', detenerAutoplay);
        carrusel.addEventListener('mouseleave', iniciarAutoplay);
    }

    // Iniciar autoplay al cargar
    iniciarAutoplay();

    // Mostrar primera imagen al inicio (por si acaso)
    mostrarImagen(0);
});