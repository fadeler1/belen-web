# Belén Web

Sitio web de **Farmacia Belén / Belén Express**, migrado desde HTML, CSS y JavaScript vanilla a **Next.js** manteniendo el diseño, la experiencia de usuario y la funcionalidad del sitio original.

## Descripción

Plataforma frontend para la farmacia en línea Belén Express. Incluye navegación con scroll físico por secciones, hero slider, catálogo de productos, búsqueda con filtros, detalle de producto, carrito lateral y sistema de notificaciones contextuales (toasts).

La migración replica fielmente el sitio estático original sin rediseños ni cambios en la lógica de negocio.

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework React con App Router |
| [React 19](https://react.dev/) | Componentes de interfaz |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| CSS vanilla (`stylo.css`) | Estilos heredados del sitio original |
| Google Fonts | Hanken Grotesk, Roboto |
| Bootstrap Icons | Iconografía |

## Características

- **Scroll físico con snap magnético** — Navegación vertical fluida entre módulos (`motor.ts`)
- **Hero slider** — Carrusel principal con autoplay y gestos táctiles
- **Sliders de productos** — Carruseles horizontales responsivos por categoría
- **Galería de producto** — Slider de imágenes en la ficha de detalle
- **Carrito lateral** — Panel deslizable con control de cantidades
- **Sistema de toasts** — Alertas dinámicas según sección visible y estado del carrito
- **Búsqueda** — Resultados con ordenamiento por precio, descuento y promoción
- **Redirecciones SEO** — Rutas `.html` originales redirigen a las nuevas URLs

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Home con categorías, ofertas y ubicación |
| `/search` | Búsqueda | Resultados y filtros de productos |
| `/categoria` | Categoría | Listado con hero y filtros |
| `/producto` | Producto | Detalle, galería y productos relacionados |

Redirecciones permanentes desde las URLs legacy:

- `/index.html` → `/`
- `/search.html` → `/search`
- `/categoria.html` → `/categoria`
- `/producto.html` → `/producto`

## Requisitos

- **Node.js** 18.18 o superior
- **npm** 9 o superior

## Instalación

```bash
git clone git@github.com:fadeler1/belen-web.git
cd belen-web
npm install
```

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:3000)
npm run build    # Compilación de producción
npm run start    # Servidor de producción
npm run lint     # Análisis estático con ESLint
```

## Estructura del proyecto

```
belen-web/
├── public/
│   ├── static/          # Imágenes, iconos, fuentes y catálogo
│   └── js/toasts.json   # Configuración de notificaciones
├── src/
│   ├── app/             # Páginas y layouts (App Router)
│   ├── components/
│   │   ├── layout/      # Navbar, carrito, toast, physics layout
│   │   └── pages/       # Contenido por página
│   ├── hooks/           # Hooks de inicialización y búsqueda
│   ├── lib/             # Motor de scroll, sliders y toasts
│   └── styles/          # Hoja de estilos principal
├── legacy/              # HTML y JS originales (referencia)
└── scripts/             # Utilidades de migración
```

## Arquitectura

### Layout compartido

Todas las páginas utilizan `PhysicsLayout`, que envuelve:

- `SiteChrome` — Barra de navegación, toast y carrito
- `physicsRoot` / `physicsTrack` — Contenedor del motor de scroll vertical

### Inicialización de scripts

Los módulos JavaScript originales se adaptaron como librerías TypeScript e inicializan en el cliente mediante `useBelenScripts`:

| Módulo | Responsabilidad |
|---|---|
| `motor.ts` | Scroll físico, hero slider y carrito |
| `sliderProduct.ts` | Sliders horizontales de productos |
| `productGallerySlider.ts` | Galería en ficha de producto |
| `toastSystem.ts` | Notificaciones contextuales |

### Metadatos SEO

Cada ruta define su `<title>` mediante la Metadata API de Next.js, preservando los títulos del sitio original.

## Assets

Los recursos estáticos se sirven desde `public/static/`:

- `icons/` — Iconografía SVG
- `images/` — Banners, hero y categorías
- `catalog/` — Imágenes de productos
- Fuentes locales: TWK Lausanne, Inter

## Desarrollo

### Caché de webpack

Si aparece un error `Cannot find module './XXX.js'` en desarrollo, limpia la caché y reinicia:

```bash
rm -rf .next
npm run dev
```

### Archivos legacy

La carpeta `legacy/` conserva los HTML y JS originales como referencia histórica. No se utilizan en tiempo de ejecución.

## Despliegue

El proyecto es compatible con cualquier plataforma que soporte Next.js (Vercel, Docker, Node.js):

```bash
npm run build
npm run start
```

## Repositorio

**GitHub:** [github.com/fadeler1/belen-web](https://github.com/fadeler1/belen-web)

## Licencia

Proyecto privado. Todos los derechos reservados — Farmacia Belén.
