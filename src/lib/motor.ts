// @ts-nocheck
// ==========================================================================
// CONFIGURACIÓN AVANZADA DEL MOTOR FÍSICO (Spring Physics & Dinámica Senior)
// ==========================================================================
const engineConfig = {
    maxVelocity: 4,              // Freno de velocidad terminal (px/ms) para evitar latigazos
    flightFriction: 0.86,        // 0.86 Mayor fricción en el aire (frena los rebotes de forma inmediata y madura)
    dragFriction: 0.35,          // 0.25 Fricción de arrastre táctil ultra-suave
    renderSmoothing: 0.12,       // Interpolación visual altamente fluida (butter smooth)
    mouseWheelTimeout: 80,       // ms - Ventana de estabilización de rueda del ratón

    // Parámetros de Swipe & Resorte Magnético (Spring Physics)
    swipeSoftThreshold: 0.15,    // px/ms - Velocidad mínima para interpretar un deslizamiento de sección
    swipeVelocityThreshold: 0.6, // px/ms - Velocidad para permitir inercia libre (coasting prolongado)
    springStiffness: 0.0002,     // 0.0022 Constante de rigidez de resorte más suave y relajada (snap sobrio)
    freeScrollTolerance: 100     // 180px - Tolerancia central en módulos altos para desactivar el snap
};

// ==========================================================================
// MOTOR FÍSICO HÍBRIDO CON SPRING PHYSICS
// ==========================================================================
export function initMotor() {
    const root = document.getElementById('physicsRoot');
    const track = document.getElementById('physicsTrack');

    let currentY = 0;                  // Posición visual suavizada en pantalla
    let targetY = 0;                   // Posición física de destino
    let velocityY = 0;                 // Velocidad instantánea actual (px/ms)
    let isDragging = false;            // ¿Usuario arrastrando activamente?
    let activeSpringTarget = null;     // Destino forzado por atracción magnética de resorte

    let startY = 0;                    // Y inicial al hacer touch/mouse down
    let startX = 0;                    // X inicial al hacer touch down (tolerancia horizontal)
    let lastY = 0;                     // Último Y registrado en movimiento
    let lastTimestamp = 0;             // Última marca de tiempo en ms
    let dragStartY = 0;                // Y inicial del track al iniciar arrastre

    let maxScroll = 0;                 // Límite físico inferior de desplazamiento
    let navOffset = 0;                 // Alto del navbar para encuadres perfectos
    let gravityWells = [];             // Puntos óptimos de atracción magnética calculados

    let isMouseDragging = false;       // ¿Arrastrando con el ratón?
    let isWheeling = false;            // ¿Usuario usando la rueda del ratón?
    let wheelTimeout = null;           // Control de inercia de rueda
    let isCoasting = false;            // ¿En estado de vuelo libre inercial?

    // ----------------------------------------------------------------------
    // CÁLCULO DINÁMICO DE MÉTRICAS Y POZOS DE GRAVEDAD (CON FUSIÓN LÓGICA)
    // ----------------------------------------------------------------------
    function calculateMetrics() {
        const navBar = document.querySelector('.navBar');
        navOffset = navBar ? navBar.offsetHeight : 0;
        maxScroll = track.offsetHeight - window.innerHeight;

        const modules = Array.from(document.querySelectorAll('.snapModule'));
        const windowHeight = window.innerHeight - navOffset;
        const logicalModules = [];

        // Fusión dinámica de módulos de Título + Contenido consecutivos
        for (let i = 0; i < modules.length; i++) {
            const current = modules[i];
            const next = modules[i + 1];

            // Comprobar si la clase actual corresponde a un título
            const isTitle = Array.from(current.classList).some(cls => cls.endsWith('Title') || cls.includes('Title'));

            if (isTitle && next) {
                // Fusionar el Título y su Contenido inmediato en un único bloque lógico
                const combinedHeight = (next.offsetTop + next.offsetHeight) - current.offsetTop;
                logicalModules.push({
                    offsetTop: current.offsetTop,
                    offsetHeight: combinedHeight,
                    isLong: combinedHeight > windowHeight * 1.2
                });
                i++; // Saltar la sección de contenido ya integrada
            } else {
                // Módulo independiente estándar
                logicalModules.push({
                    offsetTop: current.offsetTop,
                    offsetHeight: current.offsetHeight,
                    isLong: current.offsetHeight > windowHeight * 1.2
                });
            }
        }

        const newWells = [];
        logicalModules.forEach(mod => {
            const yStart = mod.offsetTop - navOffset;
            const h = mod.offsetHeight;
            const yEnd = yStart + h - windowHeight;

            if (mod.isLong) {
                // Módulo lógico largo: posee entrada superior y salida inferior
                newWells.push(Math.max(0, Math.min(yStart, maxScroll)));
                newWells.push(Math.max(0, Math.min(yEnd, maxScroll)));
            } else {
                // Módulo lógico corto: solo entrada superior
                newWells.push(Math.max(0, Math.min(yStart, maxScroll)));
            }
        });

        // Asegurar que el final absoluto (Footer completo) sea siempre un pozo magnético
        newWells.push(maxScroll);

        // Limpiar duplicados matemáticos cercanos (dentro de 2px de diferencia) y ordenar
        newWells.sort((a, b) => a - b);
        gravityWells = newWells.filter((well, idx, arr) => {
            return idx === 0 || Math.abs(well - arr[idx - 1]) > 2;
        });
    }

    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);
    window.addEventListener('load', calculateMetrics);

    // ----------------------------------------------------------------------
    // EVALUACIÓN DE ZONAS LIBRES (FREE-SCROLL ZONES CON FUSIÓN LÓGICA)
    // ----------------------------------------------------------------------
    function isInFreeScrollZone(y) {
        const windowHeight = window.innerHeight - navOffset;
        const modules = Array.from(document.querySelectorAll('.snapModule'));
        const logicalModules = [];

        // Mismo agrupamiento para consistencia matemática perfecta
        for (let i = 0; i < modules.length; i++) {
            const current = modules[i];
            const next = modules[i + 1];
            const isTitle = Array.from(current.classList).some(cls => cls.endsWith('Title') || cls.includes('Title'));

            if (isTitle && next) {
                const combinedHeight = (next.offsetTop + next.offsetHeight) - current.offsetTop;
                logicalModules.push({
                    offsetTop: current.offsetTop,
                    offsetHeight: combinedHeight,
                    isLong: combinedHeight > windowHeight * 1.2
                });
                i++;
            } else {
                logicalModules.push({
                    offsetTop: current.offsetTop,
                    offsetHeight: current.offsetHeight,
                    isLong: current.offsetHeight > windowHeight * 1.2
                });
            }
        }

        for (const mod of logicalModules) {
            if (mod.isLong) {
                const yStart = mod.offsetTop - navOffset;
                const h = mod.offsetHeight;
                const yEnd = yStart + h - windowHeight;

                // ==========================================================
                // SISTEMA DE CONTROL DE SNAP Y ZONA LIBRE (INTERCAMBIABLE)
                // ==========================================================
                // [OPCIÓN 2] Alineación magnética sutil en extremos (60px)
                const margin = Math.min(60, (yEnd - yStart) * 0.1);
                const freeScrollStart = yStart + margin;
                const freeScrollEnd = yEnd - margin;

                // [OPCIÓN 1] Desconexión absoluta del snap interno (comentar Opción 2 arriba para usar esta)
                // const freeScrollStart = yStart;
                // const freeScrollEnd = yEnd;

                if (y >= freeScrollStart && y <= freeScrollEnd) {
                    return true;
                }
            }
        }
        return false;
    }

    // ----------------------------------------------------------------------
    // LOCALIZACIÓN DEL POZO DE GRAVEDAD MÁS CERCANO
    // ----------------------------------------------------------------------
    function getClosestWell(y) {
        if (gravityWells.length === 0) return y;
        let closest = gravityWells[0];
        let minDist = Math.abs(y - closest);

        for (let i = 1; i < gravityWells.length; i++) {
            const dist = Math.abs(y - gravityWells[i]);
            if (dist < minDist) {
                minDist = dist;
                closest = gravityWells[i];
            }
        }
        return closest;
    }

    // ----------------------------------------------------------------------
    // GESTIÓN DE FINALIZACIÓN DE ARRASTRE (Táctil / Ratón)
    // ----------------------------------------------------------------------
    function handleDragEnd() {
        isDragging = false;
        isMouseDragging = false;

        const speed = Math.abs(velocityY);
        const inFreeScroll = isInFreeScrollZone(targetY);

        if (speed > engineConfig.swipeVelocityThreshold) {
            // Coasting (Vuelo libre con inercia): dejamos volar al motor
            activeSpringTarget = null;
            isCoasting = true;
        } else if (speed > engineConfig.swipeSoftThreshold) {
            // Swipe Suave: Salto direccionado orgánico al siguiente/previo pozo
            if (inFreeScroll) {
                // Si el usuario hace un swipe suave estando dentro de las tarjetas, no lo forzamos a saltar de sección,
                // sino que le permitimos un coasting (desplazamiento libre con inercia natural suave).
                activeSpringTarget = null;
                isCoasting = true;
            } else {
                let targetWell = null;
                if (velocityY > 0) {
                    // Desplazando hacia abajo (avanzar contenido)
                    targetWell = gravityWells.find(w => w > dragStartY + 10);
                } else {
                    // Desplazando hacia arriba (retroceder contenido)
                    for (let i = gravityWells.length - 1; i >= 0; i--) {
                        if (gravityWells[i] < dragStartY - 10) {
                            targetWell = gravityWells[i];
                            break;
                        }
                    }
                }

                if (targetWell !== null && targetWell !== undefined) {
                    activeSpringTarget = Math.max(0, Math.min(targetWell, maxScroll));
                } else {
                    activeSpringTarget = getClosestWell(targetY);
                }
            }
        } else {
            // Arrastre Lento (Settle down): Snap al más cercano si no estamos en Zona Libre
            if (inFreeScroll) {
                activeSpringTarget = null;
            } else {
                activeSpringTarget = getClosestWell(targetY);
            }
        }
    }

    // ----------------------------------------------------------------------
    // MANEJADORES DE EVENTOS TÁCTILES
    // ----------------------------------------------------------------------
    root.addEventListener('touchstart', (e) => {
        isDragging = true;
        isCoasting = false;
        activeSpringTarget = null; // Detener cualquier snap activo

        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        lastY = startY;
        lastTimestamp = performance.now();
        velocityY = 0;
        dragStartY = currentY;
    }, { passive: false });

    root.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;
        const deltaX = currentTouchX - startX;
        const deltaY = currentTouchY - lastY;
        const totalDeltaY = currentTouchY - startY;

        // Tolerancia horizontal para respetar gestos deslizantes del Hero Slider
        if (Math.abs(deltaX) > Math.abs(totalDeltaY) && Math.abs(deltaX) > 10) {
            isDragging = false;
            return;
        }

        e.preventDefault();

        const currentTimestamp = performance.now();
        const deltaTime = currentTimestamp - lastTimestamp;

        targetY -= deltaY;

        // Efecto liga (rubber-banding) controlado en extremos superiores/inferiores
        if (targetY < 0) targetY = targetY * 0.5;
        if (targetY > maxScroll) targetY = maxScroll + ((targetY - maxScroll) * 0.5);

        if (deltaTime > 0) {
            velocityY = -deltaY / deltaTime;
            if (velocityY > engineConfig.maxVelocity) velocityY = engineConfig.maxVelocity;
            if (velocityY < -engineConfig.maxVelocity) velocityY = -engineConfig.maxVelocity;
        }

        lastY = currentTouchY;
        lastTimestamp = currentTimestamp;
    }, { passive: false });

    root.addEventListener('touchend', () => {
        if (isDragging) handleDragEnd();
    });

    // ----------------------------------------------------------------------
    // MANEJADORES DE EVENTOS DE MOUSE
    // ----------------------------------------------------------------------
    root.addEventListener('mousedown', (e) => {
        isMouseDragging = true;
        isDragging = true;
        isCoasting = false;
        activeSpringTarget = null;

        startY = e.clientY;
        lastY = startY;
        lastTimestamp = performance.now();
        velocityY = 0;
        dragStartY = currentY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();

        const currentMouseY = e.clientY;
        const currentTimestamp = performance.now();
        const deltaY = currentMouseY - lastY;
        const deltaTime = currentTimestamp - lastTimestamp;

        targetY -= deltaY;

        if (targetY < 0) targetY = targetY * 0.5;
        if (targetY > maxScroll) targetY = maxScroll + ((targetY - maxScroll) * 0.5);

        if (deltaTime > 0) {
            velocityY = -deltaY / deltaTime;
            if (velocityY > engineConfig.maxVelocity) velocityY = engineConfig.maxVelocity;
            if (velocityY < -engineConfig.maxVelocity) velocityY = -engineConfig.maxVelocity;
        }

        lastY = currentMouseY;
        lastTimestamp = currentTimestamp;
    });

    window.addEventListener('mouseup', () => {
        if (isMouseDragging) handleDragEnd();
    });

    // ----------------------------------------------------------------------
    // MANEJADOR DE RUEDA DE RATÓN (WHEEL GLIDE)
    // ----------------------------------------------------------------------
    root.addEventListener('wheel', (e) => {
        e.preventDefault();

        activeSpringTarget = null;
        isCoasting = false;
        isWheeling = true;

        targetY += e.deltaY;

        if (targetY < 0) targetY = 0;
        if (targetY > maxScroll) targetY = maxScroll;

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            isWheeling = false;
        }, engineConfig.mouseWheelTimeout);
    }, { passive: false });

    // ----------------------------------------------------------------------
    // BUCLE DE INTEGRACIÓN FÍSICA CONSTANTE (SPRING PHYSICS LOOP)
    // ----------------------------------------------------------------------
    function physicsLoop(currentTime) {
        if (isDragging) {
            // Modo interactivo: el renderizador visual sigue al dedo/cursor con fricción
            currentY += (targetY - currentY) * engineConfig.dragFriction;
        } else {
            // Vuelo libre y fuerzas de Gravedad / Resorte magnético
            targetY += velocityY * 16;
            velocityY *= engineConfig.flightFriction;

            // Clampeo absoluto fuera de límites
            if (targetY < 0) {
                targetY = 0;
                velocityY = 0;
                activeSpringTarget = null;
            }
            if (targetY > maxScroll) {
                targetY = maxScroll;
                velocityY = 0;
                activeSpringTarget = null;
            }

            const speed = Math.abs(velocityY);
            const inFreeScroll = isInFreeScrollZone(targetY);

            // Determinación de destino para el resorte
            let springTarget = null;

            if (activeSpringTarget !== null) {
                springTarget = activeSpringTarget;
            } else if (!inFreeScroll && !isWheeling) {
                // Atrapar solo si la inercia del scroll es baja
                if (speed < 0.8) {
                    springTarget = getClosestWell(targetY);
                }
            }

            // Aplicación del sistema de amortiguación magnética (Spring System)
            if (springTarget !== null) {
                const springForce = (springTarget - targetY) * engineConfig.springStiffness;
                velocityY += springForce;

                // Anclaje milimétrico final al estabilizarse
                if (Math.abs(targetY - springTarget) < 0.5 && speed < 0.01) {
                    targetY = springTarget;
                    velocityY = 0;
                    activeSpringTarget = null;
                }
            }

            // Suavizado visual butter-smooth
            currentY += (targetY - currentY) * engineConfig.renderSmoothing;
        }

        track.style.transform = `translateY(${-currentY}px)`;
        requestAnimationFrame(physicsLoop);
    }

    // ==========================================================================
    // LÓGICA DEL HERO SLIDER (Fase 3)
    // ==========================================================================
    const heroSliderConfig = {
        autoplayTime: 6000, //6000
        swipeThreshold: 50 // px
    };

    const heroCards = Array.from(document.querySelectorAll('.modHeroCard'));
    const heroPreviews = Array.from(document.querySelectorAll('.heroPreview'));
    const progressBar = document.querySelector('.heroProgressBar');
    const heroContainer = document.querySelector('.modHero');

    if (heroCards.length > 0) {
        let currentHeroIndex = 0;
        let heroAutoplayTimer = null;
        let isHeroSwiping = false;
        let heroStartX = 0;
        let heroStartY = 0;
        let heroCurrentX = 0;
        let heroIsHorizontal = null;

        function updateHeroSlider(newIndex) {
            currentHeroIndex = newIndex;
            if (currentHeroIndex >= heroCards.length) currentHeroIndex = 0;
            if (currentHeroIndex < 0) currentHeroIndex = heroCards.length - 1;

            const nextIndex = (currentHeroIndex + 1) % heroCards.length;

            heroCards.forEach((card, idx) => {
                // Reset inline styles applied by swiping
                card.style.transform = '';
                card.style.transition = '';
                card.style.opacity = '';

                card.classList.remove('modHeroCard--active', 'modHeroCard--next');

                if (idx === currentHeroIndex) {
                    card.classList.add('modHeroCard--active');
                } else if (idx === nextIndex) {
                    card.classList.add('modHeroCard--next');
                }
            });

            heroPreviews.forEach((preview, idx) => {
                if (idx === currentHeroIndex) {
                    preview.classList.add('heroPreview--active');
                } else {
                    preview.classList.remove('heroPreview--active');
                }
            });

            resetProgressBar();
            startHeroAutoplay();
        }

        function resetProgressBar() {
            if (progressBar) {
                progressBar.style.animation = 'none';
                progressBar.offsetHeight; /* trigger reflow */
                progressBar.style.animation = `progressFill ${heroSliderConfig.autoplayTime}ms linear infinite`;
                progressBar.style.animationPlayState = 'running';
            }
        }

        function startHeroAutoplay() {
            clearInterval(heroAutoplayTimer);
            heroAutoplayTimer = setInterval(() => {
                updateHeroSlider(currentHeroIndex + 1);
            }, heroSliderConfig.autoplayTime);
        }

        // Eventos Click en Previews (Desktop)
        heroPreviews.forEach((preview, idx) => {
            preview.addEventListener('click', () => {
                updateHeroSlider(idx);
            });
        });

        // Lógica Touch (Móvil - Tinder Swipe Híbrido)
        if (heroContainer) {
            heroContainer.addEventListener('touchstart', (e) => {
                isHeroSwiping = true;
                heroStartX = e.touches[0].clientX;
                heroStartY = e.touches[0].clientY;
                heroCurrentX = heroStartX;
                heroIsHorizontal = null;

                clearInterval(heroAutoplayTimer);
                if (progressBar) progressBar.style.animationPlayState = 'paused';

                const activeCard = heroCards[currentHeroIndex];
                if (activeCard) activeCard.style.transition = 'none';
            }, { passive: true });

            heroContainer.addEventListener('touchmove', (e) => {
                if (!isHeroSwiping) return;

                heroCurrentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const deltaX = heroCurrentX - heroStartX;
                const deltaY = currentY - heroStartY;

                // Determinar dirección en los primeros 5 píxeles de movimiento
                if (heroIsHorizontal === null && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        heroIsHorizontal = true;
                    } else {
                        heroIsHorizontal = false;
                    }
                }

                if (heroIsHorizontal) {
                    e.preventDefault(); // Prevenir scroll nativo o warnings
                    e.stopPropagation(); // Ocultar el evento al root de físicas verticales

                    const activeCard = heroCards[currentHeroIndex];
                    if (activeCard) {
                        const rotation = deltaX * 0.05;
                        const op = Math.max(0.3, 1 - Math.abs(deltaX) / window.innerWidth);
                        activeCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
                        activeCard.style.opacity = op;
                    }
                }
            }, { passive: false });

            heroContainer.addEventListener('touchend', (e) => {
                if (!isHeroSwiping) return;
                isHeroSwiping = false;

                const deltaX = heroCurrentX - heroStartX;
                const activeCard = heroCards[currentHeroIndex];

                if (activeCard) {
                    activeCard.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';

                    if (heroIsHorizontal && Math.abs(deltaX) > heroSliderConfig.swipeThreshold) {
                        // Swipe Exitoso
                        if (deltaX < 0) {
                            updateHeroSlider(currentHeroIndex + 1); // Izquierda -> Siguiente
                        } else {
                            updateHeroSlider(currentHeroIndex - 1); // Derecha -> Anterior
                        }
                    } else {
                        // Vuelve a su lugar (Swipe abortado o era movimiento vertical)
                        activeCard.style.transform = '';
                        activeCard.style.opacity = '';
                        startHeroAutoplay();
                        if (progressBar) progressBar.style.animationPlayState = 'running';
                    }
                }
            });
        }

        // Iniciar
        updateHeroSlider(0);
    }

    // ==========================================================================
    // CONTROLADOR DE CANTIDADES GENÉRICO Y UNIVERSAL (PREPARADO PARA EL CHECKOUT)
    // ==========================================================================
    document.addEventListener('click', (e) => {
        const btnMas = e.target.closest('.btn-mas');
        const btnMenos = e.target.closest('.btn-menos');

        if (btnMas) {
            const container = btnMas.closest('[class*="control"], .cantcontrolShopcart, .cantcontrolProduct, .cantidad-control');
            if (container) {
                const input = container.querySelector('input[type="number"], input');
                if (input) {
                    input.value = parseInt(input.value || 0) + 1;
                }
            }
        }

        if (btnMenos) {
            const container = btnMenos.closest('[class*="control"], .cantcontrolShopcart, .cantcontrolProduct, .cantidad-control');
            if (container) {
                const input = container.querySelector('input[type="number"], input');
                if (input) {
                    const min = parseInt(input.getAttribute('min') || 0);
                    const currentVal = parseInt(input.value || 0);
                    if (currentVal > min) {
                        input.value = currentVal - 1;
                    }
                }
            }
        }
    });

    // ==========================================================================
    // CONTROLADOR DEL CARRITO DE COMPRAS (.shopCart) - DELEGACIÓN TÁCTIL
    // ==========================================================================
    const shopCart = document.querySelector('.shopCart');

    // 1. Funciones de Control de Estado
    function openCart() {
        if (shopCart) {
            shopCart.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear el scroll de físicas del cuerpo si está abierto
        }
    }

    function closeCart() {
        if (shopCart) {
            shopCart.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    }

    // 2. Delegación de Eventos para Abrir el Carrito (Espacio para agregar infinitos botones)
    document.addEventListener('click', (e) => {
        // Abre el carrito si se hace clic en .cartBottom o en cualquier botón/enlace configurado para abrirlo
        const trigger = e.target.closest('.cartBottom, .btn-open-cart, [data-open-cart]');
        if (trigger) {
            e.preventDefault();
            openCart();
        }
    });

    // 3. Delegación de Eventos para Cerrar el Carrito (Botón y Área Externa)
    document.addEventListener('click', (e) => {
        // Cerrar al hacer clic en el botón de cierre (Cerrar X)
        if (e.target.closest('.shopcartClose')) {
            closeCart();
            return;
        }
        // Cerrar al hacer clic en el fondo difuminado oscuro pero fuera del contenedor del carrito
        if (shopCart && e.target === shopCart) {
            closeCart();
        }
    });

    // 4. Soporte para Tecla Escape (UX Premium)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && shopCart && shopCart.classList.contains('active')) {
            closeCart();
        }
    });

    // ==========================================================================
    // CONTROLADOR DEL MODULO DE LOGIN (.loginModule)
    // ==========================================================================
    const loginModule = document.querySelector('.loginModule');

    function setLoginSlide(slideIndex: number) {
        const track = document.querySelector('.loginSliderTrack');
        if (track instanceof HTMLElement) {
            const translatePercent = -slideIndex * 33.3333;
            track.style.transform = `translateX(${translatePercent}%)`;
        }

        const tabs = document.querySelector('.loginTabs');
        if (tabs instanceof HTMLElement) {
            if (slideIndex === 2) {
                tabs.style.opacity = '0';
                tabs.style.pointerEvents = 'none';
                setTimeout(() => {
                    if (tabs.style.opacity === '0') {
                        tabs.style.display = 'none';
                    }
                }, 300);
            } else {
                tabs.style.display = 'flex';
                setTimeout(() => {
                    tabs.style.opacity = '1';
                    tabs.style.pointerEvents = 'auto';
                }, 10);

                const tabButtons = tabs.querySelectorAll('.loginTab');
                tabButtons.forEach((btn, idx) => {
                    btn.classList.toggle('active', idx === slideIndex);
                });
            }
        }
    }

    function openLogin() {
        if (loginModule) {
            setLoginSlide(0);
            loginModule.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLogin() {
        if (loginModule) {
            loginModule.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                setLoginSlide(0);
                const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;
                const registerForm = document.getElementById('registerForm') as HTMLFormElement | null;
                loginForm?.reset();
                registerForm?.reset();
            }, 400);
        }
    }

    function showLoginSuccess(displayName: string, title: string) {
        const successMainTitle = document.getElementById('successMainTitle');
        const successDisplayName = document.getElementById('successDisplayName');
        if (successMainTitle) successMainTitle.textContent = title;
        if (successDisplayName) successDisplayName.textContent = displayName;

        document.querySelectorAll('.greetingName').forEach((greet) => {
            greet.textContent = displayName;
        });

        setLoginSlide(2);
    }

    document.addEventListener('submit', (e) => {
        const target = e.target;
        if (!(target instanceof HTMLFormElement)) return;

        if (target.id === 'loginForm') {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail') as HTMLInputElement | null;
            let displayName = 'María Teresa';
            if (emailInput?.value) {
                const parts = emailInput.value.split('@');
                displayName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            }

            showLoginSuccess(displayName, '¡Acceso Exitoso!');
        }

        if (target.id === 'registerForm') {
            e.preventDefault();

            const nameInput = document.getElementById('registerName') as HTMLInputElement | null;
            let displayName = nameInput?.value.trim() || 'María Teresa';
            if (displayName) {
                displayName = displayName.split(' ')[0];
            }

            showLoginSuccess(displayName, '¡Registro Exitoso!');
        }
    });

    document.addEventListener('click', (e) => {
        const toggleBtn = (e.target as Element).closest('.loginPasswordToggle');
        if (toggleBtn) {
            const group = toggleBtn.closest('.loginInputGroup');
            const input = group?.querySelector('.loginInputField') as HTMLInputElement | null;
            const icon = toggleBtn.querySelector('i');
            if (input && icon) {
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            }
        }
    });

    document.addEventListener('click', (e) => {
        const tab = (e.target as Element).closest('.loginTab');
        if (tab) {
            const container = tab.closest('.loginTabs');
            if (container) {
                const targetTab = tab.getAttribute('data-tab');
                if (targetTab === 'login') {
                    setLoginSlide(0);
                } else if (targetTab === 'register') {
                    setLoginSlide(1);
                }
            }
        }
    });

    document.addEventListener('click', (e) => {
        if ((e.target as Element).closest('.accessclientBtn')) {
            e.preventDefault();
            openLogin();
        }
    });

    document.addEventListener('click', (e) => {
        if ((e.target as Element).closest('.loginCloseBtn, .successCloseBtn')) {
            closeLogin();
            return;
        }
        if (loginModule && e.target === loginModule) {
            closeLogin();
        }
        if ((e.target as Element).closest('.loginForgotLink')) {
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModule && loginModule.classList.contains('active')) {
            closeLogin();
        }
    });

    requestAnimationFrame(physicsLoop);
}

export function destroyMotor() {}
