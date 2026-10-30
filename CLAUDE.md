# CLAUDE.md — K.A.B. Comercio Global Inc. (sitio web)

Contexto para cualquier sesión de Claude Code abierta en esta carpeta. Léelo antes de tocar nada.

## Quién es el cliente

- **K.A.B. Comercio Global Inc.**, San Juan, Puerto Rico. Importa, comercializa y distribuye productos y equipos; es intermediario entre sus clientes y proveedores nacionales e internacionales.
- Lema: *"Conectamos mercados, impulsamos negocios."* / *"Su socio estratégico para construir, equipar y transformar sus proyectos."*
- 8 líneas de soluciones: construcción y acabados · puertas y ventanas (certificadas, acústicas, de seguridad) · casas modulares · diseño, muebles y lujo · negocios, discotecas y entretenimiento · maquinaria y tecnología · energía (solar, baterías, generadores, A/C) · proyectos especiales (coordinación con diseñadores, trámites y permisos).
- Financiamiento: siempre con la nota *"sujeto a disponibilidad, evaluación y aprobación de las partes o entidades correspondientes"*. Certificaciones: *"se verifican por producto según modelo y requisitos del proyecto"*. No prometer más que eso.
- Datos reales que **sí** se usan: San Juan PR 00915; productos que importan (barandas de cristal, escaleras flotantes, sistemas solares con baterías de litio, refrigeración comercial, máquinas de hielo, yeso, mármol, gabinetes, LED).
- **Orígenes — regla del cliente**: el alcance se presenta como **mundial**. **Nada de China, Europa ni Estados Unidos** (ni ciudades, puertos o rutas concretas) en textos, mapa ni SEO. El mapa de `Coverage` muestra rutas desde todo el mundo sin nombrar países.
- **Equipo (confirmado por el cliente)**: Alex Baez — CEO — (787) 307-4676; Patricio Gonzalez — Representante — (939) 881-9238. Viven en `TEAM` de `src/data.ts` y salen en la sección Equipo, en Contacto y en el footer.
- **No publicar**: nombres de sus proveedores, cantidad de envíos ni la dirección exacta ("1972 Avenidaa", parece incompleta) hasta que el cliente la confirme.

## Relación con ITP Cargo — regla estricta

- Este proyecto nació copiando la estructura de la demo de **ITP Cargo** (otra empresa, otro cliente). Hoy son **proyectos totalmente separados**:
  - ITP Cargo: `C:\Users\dante\OneDrive\Desktop\proyectos RD\itpcargo` · repo `dantegalansisa-sudo/itpcargo`
  - K.A.B.: esta carpeta · repo `dantegalansisa-sudo/KAB`
- **Nunca modificar nada de la carpeta ni del repo de ITP Cargo** desde aquí. Solo se trabaja dentro de esta carpeta.

## Publicación

- Repo GitHub: `https://github.com/dantegalansisa-sudo/KAB` (rama `main`). Vercel despliega desde `main`.
- Dominio: **https://www.kabcomercioglobalinc.com** (el dominio sin `www` redirige 308 al `www`).
- Al terminar cada cambio el usuario quiere que se **suba todo** (commit + push a `main`). Mensajes de commit en español.

## Stack y estructura

React 18 + TypeScript + Vite 5 + Framer Motion 11 + CSS plano (sin Tailwind).

| Archivo / carpeta | Qué contiene |
|---|---|
| `src/i18n.tsx` | **Todos los textos ES/EN** (`es`, `en`; el tipo `Dict = typeof es`, ambos deben tener las mismas claves). El idioma lo define la URL: `/` español, `/en/` inglés. También `SITE_URL` (vacío por ahora) y los íconos por posición. |
| `src/data.ts` | `CONTACT` (WhatsApp, correo, Instagram **vacíos, pendientes**), `LINES` (8 líneas: id, ícono, tono), helpers `wa()` y `ctaLink()` (sin WhatsApp, los CTA llevan a `#contacto`). |
| `src/index.css` | Todo el CSS en un solo archivo, mobile-first; cortes en `760px` (tablet) y `1024px` (PC). Bloques añadidos al final por sección. |
| `src/sections/` | Una sección por archivo (ver orden abajo). |
| `src/components/` | Header (menú + selector ES/EN), Icon (SVG propios), RevealText, MagneticButton, AnimatedCounter, MobileTabBar, LineSheet, ScrollSheet, FloatingCTA. |
| `scripts/prerender-en.mjs` | Tras `vite build` genera `dist/en/index.html` con la cabecera SEO en inglés reemplazando textos de `index.html`. **Si cambias título/descr./noscript de `index.html`, actualiza este script** o el build falla. |
| `public/img/` | Imágenes optimizadas (webp). |
| `marketing/qr/` | QR personalizado → `https://www.kabcomercioglobalinc.com` (tarjeta, PNG, transparente, SVG). |
| `_material/recursos-cliente/` | Archivos originales del cliente (fuera de Git, ver `.gitignore`). |

### Orden de la página (`src/App.tsx`)
1. **Hero** — PC: `Hero.tsx` (contenedor flotante arrastrable 360°). Móvil: `HeroMobile.tsx` (portada tipo app: buscador, tarjeta oscura con el contenedor, 3 datos y accesos por línea que abren `LineSheet`).
2. **Story** — "Quiénes somos" (foto `kab-quienes-somos.webp`, estadísticas, cinta de productos).
3. **Services** (`#soluciones`) — índice editorial **fijo durante el scroll** (PC y móvil): las 8 líneas avanzan con el scroll, panel con número grande, ícono que se dibuja y color por línea. En móvil: nombre activo + 8 segmentos.
3b. **Showroom** (`#showroom`, `Showroom.tsx` + `src/showroom.ts`) — catálogo por espacios: grupos Hogar / Construcción / Entretenimiento → 9 áreas (sala, comedor, dormitorio, oficina, recibidor y bar, casas modulares, acabados interiores, iluminación y efectos, audio y eventos). Portada grande por área (en PC, mosaico de 4 si las fotos de origen son pequeñas), cuadrícula corta con "Ver más", buscador sin acentos (ES/EN) y visor a pantalla completa (flechas, teclado, deslizar). "Me interesa este estilo" pasa la foto al formulario (o a WhatsApp cuando exista).
4. **Operation** (`#proyectos`) — "Proyectos especiales": tarjetas apiladas con scroll fijo, fotos `kab-proyecto-1..3.webp`, botones de pasos grandes.
5. **Process** (`#proceso`) — 5 pasos con línea de tiempo y mini contenedor.
6. **Imports** (`#puertas`) — Puertas y ventanas: la tarjeta se abre como **ventana doble** con el scroll; productos entran girando sobre su bisagra.
7. **Tools** (`#cotizar`) — cotizador (línea, tipo de proyecto, financiamiento). Sin WhatsApp pasa los datos al formulario.
8. **Coverage** (`#cobertura`) — mapa de alcance mundial: rutas desde todo el mundo → San Juan (sin nombrar países).
9. **About** (`#nosotros`) + preguntas frecuentes.
10. **Team** (`#equipo`) — equipo de trabajo: tarjetas con foto (por ahora iniciales sobre degradado y "Foto próximamente"), cargo, nombre y teléfono.
11. **Contact** (`#contacto`) — formulario con validación; envía por WhatsApp, si no por correo, si no queda en "vista demo".
12. **Final** — CTA + footer.

En móvil (`< 760px`) hay además **barra de navegación inferior** (`MobileTabBar`, la pestaña "Más" abre el menú del Header con el evento `kab:menu`) y `ScrollSheet` envuelve varias secciones (animación de hoja al entrar). No envolver con `ScrollSheet` secciones con `position: sticky` (Services, Operation) ni Imports.

## Diseño (decisiones ya aprobadas por el usuario)

- **Paleta tierra** (el usuario rechazó el azul eléctrico): tokens en `:root` — `--cream #eee8df` (lino), `--paper #f8f4ee`, `--ink #2b2520` (espresso), `--accent #a86a45` (arcilla), `--accent-2 #d3a27f`, `--accent-soft`, `--sage #7d8466`. Usar las variables, no colores sueltos.
- Tipografías: Sora (títulos) y Manrope (texto).
- Sin fondos punteados/patrones de puntos (el usuario los rechazó). Cursor normal del sistema (sin cursor animado).
- Estilo: elegante, mucha animación al hacer scroll, nada "plano o estático", poca información por pantalla. **Móvil debe sentirse como una app**, distinto a PC.
- **Contenedor oficial**: `public/img/container-kab.webp` (diseño real del cliente, naranja `#fc6501` + negro). No alterar sus colores.
- **Logo oficial** (entregado por el cliente: globo azul marino + órbitas doradas, "KAB COMERCIO GLOBAL INC."): `logo-kab.png` (fondos claros), `logo-kab-light.png` (fondos oscuros: azul → crema, dorado igual), `favicon-kab.png` y `apple-touch-icon-kab.png` (solo el globo). Original: `data de servicios/WhatsApp Image 2026-10-29 at 6.53.46 PM.jpeg`. No alterar sus colores.

## Catálogos del cliente (Showroom)

- Fuente: carpeta `KAB/data de servicios/` (PDF pesados, **fuera de Git** por `.gitignore`): Living room, Dining room, Bedroom, Office, Public space (muebles), catálogo de casas modulares, iluminación de escenario y audio profesional. Las páginas son **imágenes**, sin texto extraíble.
- Las fotos se recortaron con PyMuPDF + OpenCV (foto principal de cada página; portadas recortadas a mano para quitar textos y logo del fabricante) y se guardaron en `public/img/cat/<area>-NN.webp` (grande, máx. 1600 px) y `-s.webp` (miniatura 720 px). Medidas en `AREAS[].sizes` de `src/showroom.ts`; títulos ES/EN en `t.showroom.areas` (mismo orden).
- **Regla**: nada que delate el origen. Se descartaron fotos con letras chinas, interiores de estilo chino, marcas de agua y logos de fabricantes (muebles, audio, iluminación). Al añadir fotos nuevas, revisarlas una por una.
- Pendiente del cliente: faltan más carpetas/catálogos (p. ej. piscinas, frentes de casa); se añaden como nuevas áreas en `AREAS` + textos en i18n.

## Pendiente

- WhatsApp, correo e Instagram → `src/data.ts` (`CONTACT`).
- Más catálogos del cliente → nuevas áreas del Showroom.
- Fotos del equipo → webp en `public/img/` y ruta en `photo` de `TEAM` (`src/data.ts`).
- Confirmar dirección exacta. Confirmar si alguno de los teléfonos del equipo es el WhatsApp de la empresa (`CONTACT.whatsapp`).
- SEO con el dominio: `SITE_URL` en `i18n.tsx`, canonical + hreflang en `index.html`, `sitemap.xml`, `Sitemap:` en `robots.txt`, alta en Google Search Console (como se hizo en ITP Cargo).

## Notas técnicas aprendidas (Windows)

- `vercel.json` cachea `/img/*` 30 días: **al reemplazar una imagen, usa un nombre de archivo nuevo** y actualiza las referencias, o el navegador seguirá mostrando la vieja.
- La herramienta Bash a veces falla en este equipo; PowerShell 5.1 rompe los `python -c` con comillas → escribir scripts `.py` en un archivo y ejecutarlos.
- Verificación visual: `npm run build`, `npx vite preview --port <n>` y capturas con Playwright (Python) usando `channel='msedge'`, siempre en **390×844 (móvil)** y **1440×900 (PC)**.
- Imágenes: optimizar a webp con Pillow antes de ponerlas en `public/img/`.
- Mensajes de commit con la línea de coautoría que indique el sistema.
