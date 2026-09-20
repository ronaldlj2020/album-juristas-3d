# Álbum 3D de los Grandes Juristas

Aplicación web interactiva basada en [personal-photo-album](https://github.com/franky-adl/personal-photo-album). 
Reutiliza la lógica del álbum 3D y la transforma en un recorrido por los grandes juristas de la historia, 
con una ambientación jurídica.

## Requisitos

- Node.js 18+ 
- npm / pnpm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Construcción para producción

```bash
npm run run build
```

El resultado queda en `dist/`.

## Estructura del proyecto

```
juristas-album/
├── data/
│   └── juristas/
│       └── juristas.json          ← Datos de los 7 juristas
├── assets/
│   └── images/
│       └── juristas/              ← Imágenes de los juristas (agregar aquí)
├── public/
│   └── album/                     ← Retratos SVG generados
├── scripts/
│   ├── generatePages.mjs          ← Genera bookPages.json desde juristas.json
│   └── generatePortraits.mjs      ← Genera retratos SVG
├── src/
│   ├── Experience.jsx             ← Escena 3D
│   ├── Camera.jsx                 ← Control de cámara
│   ├── Overlay.jsx                ← UI de créditos
│   ├── objects/
│   │   ├── MyDesk.jsx             ← Escritorio con álbum
│   │   ├── BookPages.jsx          ← Lógica de páginas
│   │   ├── bookPages.json         ← Layout de páginas generado
│   │   └── bookPagesData.js       ← Carga de datos
│   └── ...
└── package.json
```

## Juristas incluidos

1. Marco Tulio Cicerón (106 a.C. - 43 a.C.)
2. Ulpiano (170 - 228)
3. Barón de Montesquieu (1689 - 1755)
4. Alexis de Tocqueville (1805 - 1859)
5. Friedrich Karl von Savigny (1779 - 1861)
6. Giuseppe Chiovenda (1872 - 1937)
7. Hans Kelsen (1881 - 1973)

## Cómo agregar más juristas

1. Agrega el jurista en `data/juristas/juristas.json`
2. Coloca su imagen en `public/album/` con el nombre `id.svg` (o `.webp`)
3. Regenera las páginas: `node scripts/generatePages.mjs`
4. Regenera los retratos (si usas SVG): `node scripts/generatePortraits.mjs`
5. Reinicia el servidor de desarrollo

## Controles

- **Clic en el álbum** → Enfocar el libro
- **Clic en página** → Reproducir video (si tiene)
- **Flechas ← →** → Pasar páginas
- **"Back to desk"** → Volver a la vista del escritorio
- **Globe** → Arrastrar para girar

## Créditos

Adaptación de [personal-photo-album](https://github.com/franky-adl/personal-photo-album) 
por [franky-adl](https://github.com/franky-adl). Modelos 3D de BlendKit y Sketchfab 
(bajo licencias Royalty free y CC Attribution). Contenido basado en el artículo 
["Los siete juristas más grandes de la historia"](https://lpderecho.pe/siete-juristas-grandes-historia/) 
de LP Derechos.
