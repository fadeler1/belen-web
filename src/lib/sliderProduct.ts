// @ts-nocheck
// ========================================
// SLIDER PRODUCT SYSTEM (Unified ES6 Class)
// ========================================

class ProductSlider {
    constructor(element) {
        this.container = element;
        this.track = this.container.querySelector('.sliderTrack');
        this.items = Array.from(this.track.querySelectorAll('.sliderItem'));
        this.btnPrev = this.container.querySelector('.sliderPrev');
        this.btnNext = this.container.querySelector('.sliderNext');
        this.btnIconLeft = this.btnPrev ? this.btnPrev.querySelector('i') : null;
        this.btnIconRight = this.btnNext ? this.btnNext.querySelector('i') : null;

        this.activeIndex = 0;

        // Touch / Drag State
        this.state = {
            isDragging: false,
            isHorizontal: false,
            isVertical: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            startTime: 0,
            startTransform: 0,
            unit: 'vw'
        };

        // Engine Config
        this.config = {
            minSwipeDistance: 40,
            minSwipeVelocity: 0.3,
            snapThreshold: 0.3,
            transitionDuration: 600
        };

        this.init();
    }

    init() {
        this.syncCssVariables();
        this.setupEvents();
        this.updateSlider();
    }

    getDeviceType() {
        const width = window.innerWidth;
        if (width >= 848) return 'pc';
        if (width >= 600) return 'tablet';
        return 'mobile';
    }

    syncCssVariables() {
        const setVar = (name, datasetKey, defaultVal) => {
            const val = parseFloat(this.container.dataset[datasetKey]) || defaultVal;
            this.container.style.setProperty(name, `${val}vw`);
        };
        setVar('--item-width-mobile', 'itemWidthMobile', 80);
        setVar('--item-width-tablet', 'itemWidthTablet', 40);
        setVar('--item-width-pc', 'itemWidthPc', 25);
    }

    calculateTransform(activeIndex) {
        const device = this.getDeviceType();

        if (device === 'pc' || device === 'tablet') {
            if (this.items.length === 0) return { value: 0, unit: 'px' };
            let scrollDistancePx = 0;
            if (this.items.length > 1) {
                // Distancia real incluyendo gaps
                scrollDistancePx = this.items[1].getBoundingClientRect().left - this.items[0].getBoundingClientRect().left;
            } else {
                scrollDistancePx = this.items[0].getBoundingClientRect().width;
            }
            return { value: -(scrollDistancePx * activeIndex), unit: 'px' };
        }

        // Mobile / Tablet (VW Centering)
        const itemWidthVw = parseFloat(this.container.dataset[`itemWidth${this.capitalize(device)}`]) || (device === 'mobile' ? 80 : 40);
        const checkpoint = (itemWidthVw * activeIndex) + (itemWidthVw / 2);

        const sliderWidthPx = this.container.offsetWidth;
        const sliderWidthVw = (sliderWidthPx / window.innerWidth) * 100;
        const centroSlider = sliderWidthVw / 2;

        return { value: centroSlider - checkpoint, unit: 'vw' };
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getCurrentTransform(unit = 'vw') {
        const style = window.getComputedStyle(this.track);
        const matrix = new WebKitCSSMatrix(style.transform);
        const translateX = matrix.m41; // Pixels
        if (unit === 'vw') {
            return (translateX / window.innerWidth) * 100;
        }
        return translateX;
    }

    updateSlider() {
        const device = this.getDeviceType();
        let maxIndex = this.items.length - 1;

        if (device === 'pc' || device === 'tablet') {
            const showItems = device === 'pc'
                ? (parseInt(this.container.dataset.showItemsPc) || 3)
                : (parseInt(this.container.dataset.showItemsTablet) || 2);
            maxIndex = Math.max(0, this.items.length - showItems);
            if (this.activeIndex > maxIndex) {
                this.activeIndex = maxIndex;
            }
        }

        const transform = this.calculateTransform(this.activeIndex);
        this.track.style.transform = `translateX(${transform.value}${transform.unit})`;

        // Update Active Classes & Opacity
        this.items.forEach((item, index) => {
            if (index === this.activeIndex) item.classList.add('active');
            else item.classList.remove('active');

            if (device === 'pc' || device === 'tablet') {
                const showItems = device === 'pc'
                    ? (parseInt(this.container.dataset.showItemsPc) || 3)
                    : (parseInt(this.container.dataset.showItemsTablet) || 2);
                if (index >= this.activeIndex && index < this.activeIndex + showItems) {
                    item.style.setProperty('opacity', '1', 'important');
                    item.style.pointerEvents = 'auto';
                } else {
                    item.style.setProperty('opacity', '0', 'important');
                    item.style.pointerEvents = 'none';
                }
            } else {
                item.style.removeProperty('opacity');
                item.style.pointerEvents = '';
            }
        });

        this.updateButtons(maxIndex);
    }

    updateButtons(maxIndex) {
        if (this.btnPrev) {
            this.btnPrev.style.opacity = this.activeIndex === 0 ? '0.5' : '1';
            this.btnPrev.style.width = this.activeIndex === 0 ? '20px' : '';
            this.btnPrev.style.pointerEvents = this.activeIndex === 0 ? 'none' : 'auto';
            if (this.btnIconLeft) this.btnIconLeft.style.color = this.activeIndex === 0 ? 'transparent' : '';
        }
        if (this.btnNext) {
            this.btnNext.style.opacity = this.activeIndex >= maxIndex ? '0.5' : '1';
            this.btnNext.style.width = this.activeIndex === maxIndex ? '20px' : '';
            this.btnNext.style.pointerEvents = this.activeIndex >= maxIndex ? 'none' : 'auto';
            if (this.btnIconRight) this.btnIconRight.style.color = this.activeIndex === maxIndex ? 'transparent' : '';
        }
    }

    move(direction) {
        const device = this.getDeviceType();
        const step = parseInt(this.container.dataset[`scrollStep${this.capitalize(device)}`]) || 1;

        let maxIndex = this.items.length - 1;
        if (device === 'pc' || device === 'tablet') {
            const showItems = device === 'pc'
                ? (parseInt(this.container.dataset.showItemsPc) || 3)
                : (parseInt(this.container.dataset.showItemsTablet) || 2);
            maxIndex = Math.max(0, this.items.length - showItems);
        }

        if (direction === 'next' && this.activeIndex < maxIndex) {
            this.activeIndex = Math.min(this.activeIndex + step, maxIndex);
        } else if (direction === 'prev' && this.activeIndex > 0) {
            this.activeIndex = Math.max(this.activeIndex - step, 0);
        } else if (typeof direction === 'number') {
            this.activeIndex = Math.max(0, Math.min(direction, maxIndex));
        }

        this.updateSlider();
    }

    // --- Pointer Events (Drag & Touch Unified) ---

    setupEvents() {
        if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.move('prev'));
        if (this.btnNext) this.btnNext.addEventListener('click', () => this.move('next'));

        this.track.addEventListener('pointerdown', (e) => this.onPointerDown(e));
        window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false });
        window.addEventListener('pointerup', (e) => this.onPointerUp(e));
        window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

        // Evitar que las imágenes arrastren fantasmas
        this.track.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', e => e.preventDefault());
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.syncCssVariables();
                this.updateSlider();
            }, 200);
        });
    }

    onPointerDown(e) {
        // Prevenir arrastre fantasma en desktop
        if (e.pointerType === 'mouse') e.preventDefault();

        this.track.style.transition = 'none';

        const device = this.getDeviceType();
        const unit = (device === 'pc' || device === 'tablet') ? 'px' : 'vw';

        this.state = {
            isDragging: true,
            isHorizontal: false,
            isVertical: false,
            startX: e.clientX,
            startY: e.clientY,
            currentX: e.clientX,
            startTime: Date.now(),
            startTransform: this.getCurrentTransform(unit),
            unit: unit
        };

        try {
            this.track.setPointerCapture(e.pointerId);
        } catch (err) { }
    }

    onPointerMove(e) {
        if (!this.state.isDragging) return;

        const deltaX = e.clientX - this.state.startX;
        const deltaY = e.clientY - this.state.startY;

        // Detectar intención del usuario
        if (!this.state.isHorizontal && !this.state.isVertical) {
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
                this.state.isHorizontal = true;
            } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
                this.state.isVertical = true;
                this.state.isDragging = false; // Ceder control al scroll vertical (motor.js)
                return;
            }
        }

        if (this.state.isHorizontal) {
            e.preventDefault(); // Bloquear scroll nativo
            this.state.currentX = e.clientX;

            let deltaTransform = 0;
            if (this.state.unit === 'vw') {
                deltaTransform = (deltaX / window.innerWidth) * 100;
            } else {
                deltaTransform = deltaX;
            }

            let newTransform = this.state.startTransform + deltaTransform;
            this.track.style.transform = `translateX(${newTransform}${this.state.unit})`;
        }
    }

    onPointerUp(e) {
        if (!this.state.isDragging || !this.state.isHorizontal) {
            this.state.isDragging = false;
            return;
        }

        this.state.isDragging = false;

        const deltaX = this.state.currentX - this.state.startX;
        const deltaTime = Date.now() - this.state.startTime;
        const velocity = Math.abs(deltaX) / deltaTime;

        const item = this.items[0];
        const itemWidthPx = item ? item.getBoundingClientRect().width : window.innerWidth;
        const dragPercentage = Math.abs(deltaX) / itemWidthPx;

        this.track.style.transition = `transform ${this.config.transitionDuration}ms cubic-bezier(0.029, 1.066, 0.61, 1.085)`;

        let direction = null;

        // Reglas de Salto
        if (velocity > this.config.minSwipeVelocity && Math.abs(deltaX) > this.config.minSwipeDistance) {
            direction = deltaX > 0 ? 'prev' : 'next';
        } else if (dragPercentage > this.config.snapThreshold) {
            direction = deltaX > 0 ? 'prev' : 'next';
        }

        if (direction) {
            this.move(direction);
        } else {
            this.updateSlider(); // Snap back
        }

        try {
            if (this.track.hasPointerCapture(e.pointerId)) {
                this.track.releasePointerCapture(e.pointerId);
            }
        } catch (err) { }
    }
}

// Auto-Discovery Inteligente (Se dispara al cargar)
// SLIDER
export function initProductSliders() {
    const sliders = document.querySelectorAll('.sliderProduct');

    // Intersection Observer para activar solo los sliders visibles en pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (!el.dataset.initialized) {
                    new ProductSlider(el);
                    el.dataset.initialized = "true";
                }
            }
        });
    }, { rootMargin: "50px" });

    sliders.forEach(el => observer.observe(el));
}
