# K.A.B. Comercio Global Inc. — sitio web

Sitio bilingüe (ES/EN) de K.A.B. Comercio Global Inc., San Juan, Puerto Rico.
Dominio: https://www.kabcomercioglobalinc.com

Proyecto independiente de ITP Cargo (otra carpeta y otro repositorio).

## Carpetas

| Carpeta | Contenido |
|---|---|
| `src/` | Código de la web (React + TypeScript + Vite + Framer Motion) |
| `src/i18n.tsx` | Todos los textos en español e inglés |
| `src/data.ts` | Datos de contacto (WhatsApp, correo, Instagram), equipo de trabajo y líneas de soluciones |
| `public/img/` | Imágenes optimizadas que usa la web |
| `marketing/qr/` | QR personalizado (tarjeta, PNG, transparente y SVG) |
| `_material/recursos-cliente/` | Archivos originales del cliente (no se suben a GitHub) |

## Comandos

```bash
npm install
npm run dev
npm run build
```

`npm run build` genera también `dist/en/index.html` (versión en inglés en `/en/`).

## Pendiente del cliente

- Logo oficial (hoy hay uno provisional en `public/img/logo.png`).
- WhatsApp, correo e Instagram → completar en `src/data.ts`. Sin WhatsApp, los botones de cotizar llevan al formulario.
- Fotos del equipo de trabajo → `TEAM` en `src/data.ts`.
- Dirección exacta (a confirmar).
