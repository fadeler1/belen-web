// ==========================================================================
// CONFIGURACIÓN CENTRAL DEL SISTEMA DE ALERTAS (TOAST NOTIFICATIONS)
// ==========================================================================
const toastConfig = {
    checkInterval: 500,             // ms - Frecuencia de chequeo de posición y condiciones
    cartCheckInterval: 45000,       // ms - Cada cuánto tiempo recordar productos en el carro (45 segundos)
    minDelayBetweenToasts: 9000,    // ms - Descanso mínimo para el usuario entre el cierre de un toast y el inicio del siguiente
    defaultScreenDuration: 8000,    // ms - Tiempo por defecto de un toast en pantalla si no lo define el JSON
    
    // Respaldo estático interno por si el navegador bloquea fetch de JSON local (CORS en file://)
    fallbackToasts: [
        {
            "id": "bienvenida",
            "active": true,
            "once": false,
            "tag": "¡Hola, Bienvenido!",
            "text": "Estamos aquí para guiarte en tu compra. Si tienes dudas, cuenta con nosotros.",
            "duration": 7000,
            "type": "info",
            "condition": {
                "type": "onModuleActive",
                "moduleClass": "heroSlider",
                "viewTime": 2000
            }
        },
        {
            "id": "recetas_consejo",
            "active": true,
            "once": false,
            "tag": "Consejo: Recetas Médicas",
            "text": "Puedes subir tu receta médica fácilmente haciendo clic en el botón 'Recetas' en el menú de arriba.",
            "duration": 11000,
            "type": "recipe",
            "condition": {
                "type": "onModuleActive",
                "moduleClass": "catContent",
                "viewTime": 2500
            }
        },
        {
            "id": "oferta_natural",
            "active": true,
            "once": false,
            "tag": "Oferta de Salud Natural",
            "text": "¡Cuida tu bienestar! Aprovecha hoy un 20% de descuento en Vitaminas y Suplementos Naturales.",
            "duration": 12000,
            "type": "natural",
            "condition": {
                "type": "onModuleActive",
                "moduleClass": "natOfferContent",
                "viewTime": 2500
            }
        },
        {
            "id": "oferta_belleza",
            "active": true,
            "once": true,
            "tag": "Cuidado Especial de la Piel",
            "text": "Protege y nutre tu piel con nuestras cremas y protectores solares con descuentos exclusivos.",
            "duration": 12000,
            "type": "beauty",
            "condition": {
                "type": "onModuleActive",
                "moduleClass": "beautyOfferContent",
                "viewTime": 2500
            }
        },
        {
            "id": "carrito_aviso",
            "active": true,
            "once": false,
            "tag": "Productos en tu Carrito",
            "text": "¡No olvides tus medicamentos! Tienes productos guardados. Toca 'Compras' abajo para verlos.",
            "duration": 10000,
            "type": "cart",
            "condition": {
                "type": "cartNotEmpty",
                "interval": 45000
            }
        }
    ]
};

// ==========================================================================
// CONTROLADOR DEL SISTEMA DE ALERTAS (TOAST SYSTEM)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Referencias del DOM
    const toastEl = document.querySelector('.newsToast');
    if (!toastEl) return; // Si no existe el contenedor en el HTML, abortar silenciosamente

    const tagEl = toastEl.querySelector('.toastTag');
    const textEl = toastEl.querySelector('span.toastText');
    const closeBtn = toastEl.querySelector('.toastClose');

    // Variables de Estado del Sistema
    let toastDatabase = [];           // Almacenará los toasts cargados
    let activeToastId = null;         // ID del toast que está actualmente en pantalla
    let toastTimeout = null;          // Temporizador para auto-ocultado del toast activo
    let lastToastCloseTime = 0;       // Timestamp del último cierre de toast
    let lastCartReminderTime = 0;     // Timestamp de la última vez que avisamos del carrito
    const shownToasts = new Set();     // Registro de IDs que ya se mostraron (evitar spam repetitivo)
    const toastQueue = [];            // Cola para almacenar toasts listos para mostrar

    // Variables para el Motor de Permanencia en Viewport (Time-in-Viewport)
    let lastActiveModuleClass = null;  // Almacena la clase de la sección activa en el frame anterior
    let activeModuleStartTime = 0;     // Timestamp de cuándo el usuario comenzó a mirar la sección actual

    // ==========================================================================
    // 1. CARGA DE BASE DE DATOS (JSON + FALLBACK RESILIENTE + FILTRADO ACTIVE)
    // ==========================================================================
    async function loadToasts() {
        try {
            const response = await fetch('js/toasts.json');
            if (!response.ok) throw new Error('No se pudo leer el archivo JSON');
            const data = await response.json();
            
            // Regla de control dinámico: Ignorar por completo mensajes marcados como inactivos (active: false)
            toastDatabase = data.filter(toast => toast.active !== false);
            console.log(`Toast System: ${toastDatabase.length} alertas activas cargadas desde toasts.json`);
        } catch (error) {
            // Fallback impecable ante bloqueos de CORS o problemas locales
            toastDatabase = toastConfig.fallbackToasts.filter(toast => toast.active !== false);
            console.warn('Toast System: Cargando base de datos interna de respaldo:', error.message);
        }
    }

    // ==========================================================================
    // 2. GESTIÓN DE COLA Y VISUALIZACIÓN DE ALERTAS
    // ==========================================================================
    
    // Agrega un toast a la cola si califica
    function enqueueToast(toast) {
        // Omitir si está en pantalla, en la cola o ya fue mostrado (salvo excepciones repetibles como el carrito)
        if (activeToastId === toast.id || toastQueue.some(t => t.id === toast.id)) return;
        
        const isCart = toast.condition && toast.condition.type === 'cartNotEmpty';
        if (shownToasts.has(toast.id) && !isCart) return;

        // Regla de Persistencia: Si tiene 'once': true y ya fue descartado en localStorage en sesiones previas
        if (toast.once === true && localStorage.getItem('dismissed_toast_' + toast.id)) return;

        toastQueue.push(toast);
        processQueue();
    }

    // Procesa el siguiente toast en la cola de espera si el canal está libre
    function processQueue() {
        if (activeToastId !== null) return;
        
        // Mantener el respiro para no agobiar visualmente
        if (Date.now() - lastToastCloseTime < toastConfig.minDelayBetweenToasts) {
            setTimeout(processQueue, 800);
            return;
        }

        if (toastQueue.length === 0) return;

        const nextToast = toastQueue.shift();
        displayToast(nextToast);
    }

    // Muestra el toast en pantalla e inicializa sus tiempos y clases
    function displayToast(toast) {
        activeToastId = toast.id;

        // Limpiar temporizadores anteriores
        if (toastTimeout) clearTimeout(toastTimeout);

        // Inyectar contenido
        if (tagEl) tagEl.textContent = toast.tag;
        if (textEl) textEl.textContent = toast.text;

        // Asignar el tema y colores correspondientes (.toast--tipo)
        toastEl.className = 'newsToast';
        toastEl.classList.add(`toast--${toast.type || 'info'}`);

        // Animar entrada
        toastEl.classList.add('toast--visible');

        // Registrar como mostrado
        shownToasts.add(toast.id);

        // Auto-ocultado tras expirar la duración
        const duration = toast.duration || toastConfig.defaultScreenDuration;
        toastTimeout = setTimeout(() => {
            hideToast();
        }, duration);
    }

    // Oculta el toast mediante la animación de salida
    function hideToast() {
        if (activeToastId === null) return;

        if (toastTimeout) {
            clearTimeout(toastTimeout);
            toastTimeout = null;
        }

        // Persistir descarte en localStorage únicamente si el JSON declara 'once': true
        const currentToastObj = toastDatabase.find(t => t.id === activeToastId);
        if (currentToastObj && currentToastObj.once === true) {
            localStorage.setItem('dismissed_toast_' + activeToastId, 'true');
        }

        toastEl.classList.remove('toast--visible');
        toastEl.classList.add('toast--hidden');

        lastToastCloseTime = Date.now();
    }

    // Escuchar el término de la animación de salida para liberar el sistema
    toastEl.addEventListener('animationend', (e) => {
        if (e.animationName === 'toastSlideDown') {
            toastEl.classList.remove('toast--hidden');
            
            const closedToast = toastDatabase.find(t => t.id === activeToastId);
            if (closedToast && closedToast.condition.type === 'cartNotEmpty') {
                lastCartReminderTime = Date.now();
            }

            activeToastId = null;
            
            setTimeout(() => {
                if (activeToastId === null) {
                    if (tagEl) tagEl.textContent = '';
                    if (textEl) textEl.textContent = '';
                }
            }, 300);

            processQueue();
        }
    });

    // Cierre manual mediante botón (Pulsar en la cruz)
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hideToast();
        });
    }

    // ==========================================================================
    // 3. EVENTO DE CIERRE AL HACER SCROLL (NUEVA MEJORA UX)
    // ==========================================================================
    
    // Si el usuario hace scroll de cualquier tipo (táctil o rueda de mouse), ocultar la alerta de inmediato
    const dismissOnScroll = () => {
        if (activeToastId !== null) {
            hideToast();
        }
    };

    window.addEventListener('wheel', dismissOnScroll, { passive: true });
    window.addEventListener('touchmove', dismissOnScroll, { passive: true });

    // ==========================================================================
    // 4. MOTOR DE CONDICIONES EN TIEMPO REAL (SCROLL + permanencia viewTime)
    // ==========================================================================
    
    // Obtiene el módulo de físicas (snapModule) que tiene mayor presencia en pantalla
    function getActiveModule() {
        const modules = Array.from(document.querySelectorAll('.snapModule'));
        let activeModule = null;
        let maxOverlap = 0;
        const viewportHeight = window.innerHeight;

        modules.forEach(mod => {
            const rect = mod.getBoundingClientRect();
            const overlap = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                activeModule = mod;
            }
        });

        return activeModule;
    }

    // Verifica las condiciones de la base de datos cada cierto intervalo
    function checkConditions() {
        // Obtener sección más visible actual
        const activeModule = getActiveModule();
        
        // Extraer la clase representativa de la sección (ej. 'heroSlider', 'catContent', etc.)
        const currentClass = activeModule 
            ? Array.from(activeModule.classList).find(c => c !== 'snapModule' && c !== 'snapFlag' && c !== 'physicsTrack') 
            : null;

        // Regla de Viewport: Si la sección cambió, reiniciamos el reloj de permanencia continua
        if (currentClass !== lastActiveModuleClass) {
            lastActiveModuleClass = currentClass;
            activeModuleStartTime = Date.now();
        }

        // Si hay una alerta visible en pantalla, no evaluar nuevos disparos
        if (activeToastId !== null) return;

        // Evaluar condiciones de la base de datos
        toastDatabase.forEach(toast => {
            if (!toast.condition) return;

            // Condición A: Visualización y permanencia continua por sección (Time-in-Viewport)
            if (toast.condition.type === 'onModuleActive' && currentClass === toast.condition.moduleClass) {
                const timeViewed = Date.now() - activeModuleStartTime;
                const requiredTime = toast.condition.viewTime || 2000; // Por defecto 2 segundos de permanencia
                
                if (timeViewed >= requiredTime) {
                    enqueueToast(toast);
                }
            }

            // Condición B: Recordatorio periódico de productos en el carrito
            if (toast.condition.type === 'cartNotEmpty') {
                const now = Date.now();
                // Centralizar intervalo en el JSON: leer toast.condition.interval o usar cartCheckInterval de respaldo (45s)
                const interval = toast.condition.interval || toastConfig.cartCheckInterval;

                if (now - lastCartReminderTime >= interval &&
                    now - lastToastCloseTime >= toastConfig.minDelayBetweenToasts) {
                    
                    // ==================================================================
                    // NOTA PARA EL DESARROLLADOR DE BACKEND:
                    // Actualmente, evaluamos la presencia de productos leyendo el DOM (contador visual .cartBadge).
                    // En producción, cuando integres el carro de compras real con base de datos/sesiones,
                    // puedes reemplazar esta lógica por una consulta AJAX o lectura de objeto local.
                    // Ejemplo:
                    // fetch('/api/cart/count').then(r => r.json()).then(data => { if (data.count > 0) enqueueToast(toast); });
                    // ==================================================================
                    const cartBadge = document.querySelector('.cartBadge');
                    if (cartBadge) {
                        const count = parseInt(cartBadge.textContent.trim(), 10);
                        if (!isNaN(count) && count > 0) {
                            enqueueToast(toast);
                        }
                    }
                }
            }
        });
    }

    // ==========================================================================
    // 5. INICIALIZACIÓN
    // ==========================================================================
    loadToasts().then(() => {
        // Registrar el chequeo periódico una vez cargada la base de datos
        setInterval(checkConditions, toastConfig.checkInterval);
        
        // Margen inicial de gracia para el aviso del carrito
        lastCartReminderTime = Date.now();
        
        // Registrar tiempo inicial de visualización del módulo de carga
        activeModuleStartTime = Date.now();
    });
});
