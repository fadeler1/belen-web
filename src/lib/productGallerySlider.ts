// @ts-nocheck
// GALLERY
export function initProductGallerySlider() {
    const container = document.querySelector('.prodImageContainer');
    if (!container) return;

    const track = container.querySelector('.gallerySliderTrack');
    const slides = container.querySelectorAll('.gallerySliderSlide');
    const indicators = container.querySelectorAll('.gallerySliderIndicators .indicator');
    const prevBtn = container.querySelector('.gallerySliderBtn.prevBtn');
    const nextBtn = container.querySelector('.gallerySliderBtn.nextBtn');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;
    const autoplayInterval = 4500; // 5 segundos de permanencia por imagen

    // --- Touch Swipe Control (Soporte Táctil en Móvil) ---
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    // Actualiza la posición física del track y activa los indicadores correctos
    function updateSlider(index) {
        // Asegurar que el índice esté dentro del rango (infinito)
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Desplazar el track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar indicadores activos
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // --- Autoplay con Control de Pausa por Interacción ---
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, autoplayInterval);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    // Resetear el temporizador si el usuario interactúa manualmente
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // --- Navegación por Botones (Escritorio) ---
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            resetAutoplay();
        });
    }

    // --- Navegación por Indicadores ---
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            updateSlider(i);
            resetAutoplay();
        });
    });

    // --- Eventos Táctiles (Swipe) ---
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        stopAutoplay();
        track.style.transition = 'none'; // Desactivar transición mientras se arrastra
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;

        // Mover sutilmente la pista para feedback táctil instantáneo
        const offset = -currentIndex * container.offsetWidth + deltaX;
        track.style.transform = `translateX(${offset}px)`;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;

        track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

        const deltaX = currentX - startX;
        const swipeThreshold = 50; // Píxeles mínimos para pasar de slide

        if (Math.abs(deltaX) > swipeThreshold && currentX !== 0) {
            if (deltaX < 0) {
                updateSlider(currentIndex + 1); // Swipe izquierda -> siguiente
            } else {
                updateSlider(currentIndex - 1); // Swipe derecha -> anterior
            }
        } else {
            updateSlider(currentIndex); // Cancelar swipe y restaurar slide actual
        }

        currentX = 0;
        startAutoplay();
    });

    // Iniciar el slider
    updateSlider(0);
    startAutoplay();
}
