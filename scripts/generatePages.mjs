import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const juristas = JSON.parse(readFileSync(join(__dirname, '../data/juristas/juristas.json'), 'utf8'));

// Colores de lapicero
const BLUE_PEN = "#0044CC";
const BLACK_PEN = "#1a1a2e";

const pages = [];

for (const j of juristas) {
    // PÁGINA IZQUIERDA: Frase arriba, foto centrada, nombre justo debajo
    pages.push({
        label: j.nombre,
        photos: [
            {
                src: j.imagen,
                x: 0.5,
                y: 0.45,
                rotation: 0,
                scale: 0.30,
                border: 0.02
            }
        ],
        texts: [
            {
                text: `"${j.frase}"`,
                x: 0.5,
                y: 0.90,
                color: BLACK_PEN,
                size: 0.030,
                fontStyle: "italic",
                fontWeight: 700,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: j.nombre,
                x: 0.5,
                y: 0.72,
                color: BLUE_PEN,
                size: 0.065,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.lugar,
                x: 0.5,
                y: 0.66,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 600,
                align: "center"
            },
            {
                text: j.fechas,
                x: 0.5,
                y: 0.60,
                color: BLACK_PEN,
                size: 0.026,
                fontWeight: 600,
                align: "center"
            }
        ]
    });

    // PÁGINA DERECHA: Obras, Aportes, Resumen (orden correcto)
    pages.push({
        label: j.nombre + " - Aportes",
        photos: [],
        texts: [
            {
                text: "Obras principales",
                x: 0.5,
                y: 0.88,
                color: BLUE_PEN,
                size: 0.045,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.obras.join('  •  '),
                x: 0.5,
                y: 0.80,
                color: BLACK_PEN,
                size: 0.028,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: "Aportes clave",
                x: 0.5,
                y: 0.65,
                color: BLUE_PEN,
                size: 0.042,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.aportes.join('  •  '),
                x: 0.5,
                y: 0.55,
                color: BLACK_PEN,
                size: 0.026,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: "Resumen",
                x: 0.5,
                y: 0.40,
                color: BLUE_PEN,
                size: 0.040,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.resumen,
                x: 0.5,
                y: 0.28,
                color: BLACK_PEN,
                size: 0.024,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            }
        ]
    });
}

writeFileSync(join(__dirname, '../src/objects/bookPages.json'), JSON.stringify(pages, null, 4));
console.log(`Generado bookPages.json con ${pages.length} páginas (${juristas.length} juristas)`);