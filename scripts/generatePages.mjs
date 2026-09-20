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
    // PÁGINA IZQUIERDA: Retrato + frase + nombre + lugar + fechas
    pages.push({
        label: j.nombre,
        photos: [
            {
                src: `./album/juristas/${j.imagen}`,
                x: 0.5,
                y: 0.42,
                rotation: 0,
                scale: 0.28,
                border: 0.02
            }
        ],
        texts: [
            {
                text: `"${j.frase}"`,
                x: 0.5,
                y: 0.85,
                color: BLACK_PEN,
                size: 0.032,
                fontStyle: "italic",
                fontWeight: 700,
                align: "center",
                maxWidth: 0.65
            },
            {
                text: j.nombre,
                x: 0.5,
                y: 0.12,
                color: BLUE_PEN,
                size: 0.065,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.lugar,
                x: 0.5,
                y: 0.06,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 600,
                align: "center"
            },
            {
                text: j.fechas,
                x: 0.5,
                y: 0.02,
                color: BLACK_PEN,
                size: 0.026,
                fontWeight: 600,
                align: "center"
            }
        ]
    });

    // PÁGINA DERECHA: Obras (negro), Aportes (azul/negro), Resumen (azul/negro)
    pages.push({
        label: j.nombre + " - Aportes",
        photos: [],
        texts: [
            {
                text: "Obras principales",
                x: 0.5,
                y: 0.85,
                color: BLACK_PEN,
                size: 0.050,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.obras.join('  •  '),
                x: 0.5,
                y: 0.75,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.65
            },
            {
                text: "Aportes clave",
                x: 0.5,
                y: 0.58,
                color: BLUE_PEN,
                size: 0.048,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.aportes.join('  •  '),
                x: 0.5,
                y: 0.46,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.65
            },
            {
                text: "Resumen",
                x: 0.5,
                y: 0.32,
                color: BLUE_PEN,
                size: 0.042,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.resumen,
                x: 0.5,
                y: 0.20,
                color: BLACK_PEN,
                size: 0.028,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.65
            }
        ]
    });
}

writeFileSync(join(__dirname, '../src/objects/bookPages.json'), JSON.stringify(pages, null, 4));
console.log(`Generado bookPages.json con ${pages.length} páginas (${juristas.length} juristas)`);
console.log('Diseño actualizado: frase negro arriba, nombre azul abajo, lugar y fechas negro');
console.log('Página derecha: obras negro, aportes azul/negro, resumen azul/negro');