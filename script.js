document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. LÓGICA DE PANTALLA DE CARGA (Con Barra de Progreso) --- */
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    let width = 0;

    // Simular carga de 0 a 100%
    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            loadingText.innerText = "SISTEMA LISTO";
            // Activar la apertura de compuertas
            setTimeout(() => {
                document.body.classList.add('loaded');
                // Eliminar overlay después de la animación para poder hacer clic
                setTimeout(() => {
                    document.getElementById('loader-overlay').style.display = 'none';
                }, 1000);
            }, 500);
        } else {
            width++;
            progressBar.style.width = width + '%';
            // Efecto de texto cambiante aleatorio
            if(width % 20 === 0) loadingText.innerText = "CARGANDO " + width + "%...";
        }
    }, 30); // Velocidad de carga


    /* --- 2. GESTIÓN DE SECCIONES (Modales) --- */
    window.openSection = function(id) {
        document.querySelectorAll('.modal-content').forEach(m => m.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    window.closeSection = function(id) {
        document.getElementById(id).classList.remove('active');
        // Si cerramos Mixes, pausar música
        if(id === 'mixes') stopAllAudio();
    }


    /* --- 3. GALERÍA (Slider) --- */
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    window.changeSlide = function(n) {
        // Ocultar actual
        slides[slideIndex].classList.remove('active');
        
        // Calcular nuevo índice
        slideIndex += n;
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        
        // Mostrar nuevo
        slides[slideIndex].classList.add('active');
    }


    /* --- 4. REPRODUCTOR DE AUDIO --- */
    window.togglePlay = function(audioId, btnElement) {
        const audio = document.getElementById(audioId);
        const icon = btnElement.querySelector('i');
        const wrapper = btnElement.parentElement.parentElement;

        // Si está pausado, reproducir
        if (audio.paused) {
            stopAllAudio(); // Pausar otros antes de tocar este
            audio.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            wrapper.classList.add('playing'); // Efecto visual en onda
        } else {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            wrapper.classList.remove('playing');
        }
    }

    function stopAllAudio() {
        document.querySelectorAll('audio').forEach(aud => {
            aud.pause();
            aud.currentTime = 0;
            // Resetear iconos visuales
            const btn = aud.nextElementSibling.querySelector('.play-btn i');
            if(btn) {
                btn.classList.remove('fa-pause');
                btn.classList.add('fa-play');
            }
            aud.parentElement.parentElement.classList.remove('playing');
        });
    }

});