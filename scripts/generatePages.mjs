import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const juristas = JSON.parse(readFileSync(join(__dirname, '../data/juristas/juristas.json'), 'utf8'));

// Colores de lapicero
const BLUE_PEN = "#0044CC";      // Azul lapicero
const RED_PEN = "#CC0000";       // Rojo lapicero
const BLACK_PEN = "#1a1a2e";     // Negro lapicero

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
                color: BLUE_PEN,
                size: 0.075,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.anios,
                x: 0.5,
                y: 0.76,
                color: BLACK_PEN,
                size: 0.042,
                fontWeight: 600,
                align: "center"
            },
            {
                text: j.origen,
                x: 0.5,
                y: 0.70,
                color: BLACK_PEN,
                size: 0.036,
                fontWeight: 600,
                align: "center"
            },
            {
                text: `"${j.frase}"`,
                x: 0.5,
                y: 0.16,
                color: RED_PEN,
                size: 0.038,
                fontStyle: "italic",
                fontWeight: 700,
                align: "center",
                maxWidth: 0.65
            }
        ]
    });

    // PÁGINA DERECHA: Más texto, colores lapicero, más grueso
    pages.push({
        label: j.nombre + " - Aportes",
        photos: [],
        texts: [
            {
                text: "Resumen",
                x: 0.5,
                y: 0.85,
                color: BLUE_PEN,
                size: 0.058,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.resumen,
                x: 0.5,
                y: 0.70,
                color: BLACK_PEN,
                size: 0.038,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.62,
                lineHeight: 1.35
            },
            {
                text: "Aportes clave",
                x: 0.5,
                y: 0.52,
                color: BLUE_PEN,
                size: 0.050,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.aportes,
                x: 0.5,
                y: 0.38,
                color: BLACK_PEN,
                size: 0.036,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.62,
                lineHeight: 1.35
            },
            {
                text: "Obras: " + j.obras.join('  •  '),
                x: 0.5,
                y: 0.22,
                color: RED_PEN,
                size: 0.030,
                fontWeight: 700,
                align: "center",
                maxWidth: 0.62
            }
        ]
    });
}

writeFileSync(join(__dirname, '../src/objects/bookPages.json'), JSON.stringify(pages, null, 4));
console.log(`Generado bookPages.json con ${pages.length} páginas`);
console.log('Colores lapicero: azul (#0044CC), rojo (#CC0000), negro (#1a1a2e)');
console.log('Grosor: fontWeight 600-800, tamaños aumentados');