import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const juristas = JSON.parse(readFileSync(join(__dirname, '../data/juristas/juristas.json'), 'utf8'));

const pages = [];

for (const j of juristas) {
    // PÁGINA IZQUIERDA: Retrato + frase
    pages.push({
        label: j.nombre,
        photos: [
            {
                src: `${j.id}.png`,
                x: 0.5,
                y: 0.45,
                rotation: 0,
                scale: 0.28,
                border: 0.02
            }
        ],
        texts: [
            {
                text: j.nombre,
                x: 0.5,
                y: 0.85,
                color: "#1a1a2e",
                size: 0.070,
                fontWeight: 700,
                align: "center"
            },
            {
                text: j.anios,
                x: 0.5,
                y: 0.76,
                color: "#4a4a6a",
                size: 0.040,
                align: "center"
            },
            {
                text: j.origen,
                x: 0.5,
                y: 0.70,
                color: "#4a4a6a",
                size: 0.034,
                align: "center"
            },
            {
                text: `"${j.frase}"`,
                x: 0.5,
                y: 0.16,
                color: "#2d5016",
                size: 0.036,
                fontStyle: "italic",
                align: "center",
                maxWidth: 0.65
            }
        ]
    });

    // PÁGINA DERECHA: Más texto, más grande, centrado
    // Máximo aprovechamiento del espacio UV con márgenes seguros
    pages.push({
        label: j.nombre + " - Aportes",
        photos: [],
        texts: [
            {
                text: "Resumen",
                x: 0.5,
                y: 0.85,
                color: "#1a1a2e",
                size: 0.055,
                fontWeight: 700,
                align: "center"
            },
            {
                text: j.resumen,
                x: 0.5,
                y: 0.68,
                color: "#2c2c2c",
                size: 0.038,
                align: "center",
                maxWidth: 0.60,
                lineHeight: 1.3
            },
            {
                text: "Aportes clave",
                x: 0.5,
                y: 0.48,
                color: "#1a1a2e",
                size: 0.048,
                fontWeight: 700,
                align: "center"
            },
            {
                text: j.aportes,
                x: 0.5,
                y: 0.34,
                color: "#2c2c2c",
                size: 0.034,
                align: "center",
                maxWidth: 0.60,
                lineHeight: 1.3
            },
            {
                text: "Obras: " + j.obras.join('  •  '),
                x: 0.5,
                y: 0.16,
                color: "#4a4a6a",
                size: 0.028,
                align: "center",
                maxWidth: 0.60
            }
        ]
    });
}

writeFileSync(join(__dirname, '../src/objects/bookPages.json'), JSON.stringify(pages, null, 4));
console.log(`Generado bookPages.json con ${pages.length} páginas`);
console.log('Tamaños +2 en todo, márgenes seguros mantenidos');