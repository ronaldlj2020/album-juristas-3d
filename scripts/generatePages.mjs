import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const juristas = JSON.parse(readFileSync(join(__dirname, '../data/juristas/juristas.json'), 'utf8'));

const BLUE_PEN = "#0044CC";
const BLACK_PEN = "#1a1a2e";

const pages = [];

for (const j of juristas) {
    pages.push({
        label: j.nombre,
        photos: [
            {
                src: j.imagen,
                x: 0.5,
                y: 0.52,
                rotation: 0,
                scale: 0.38,
                border: 0.02
            }
        ],
        texts: [
            {
                text: `"${j.frase}"`,
                x: 0.5,
                y: 0.92,
                color: BLACK_PEN,
                size: 0.032,
                fontStyle: "italic",
                fontWeight: 700,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: j.nombre,
                x: 0.5,
                y: 0.18,
                color: BLUE_PEN,
                size: 0.065,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.lugar,
                x: 0.5,
                y: 0.12,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 600,
                align: "center"
            },
            {
                text: j.fechas,
                x: 0.5,
                y: 0.06,
                color: BLACK_PEN,
                size: 0.030,
                fontWeight: 700,
                align: "center"
            }
        ]
    });

    pages.push({
        label: j.nombre + " - Aportes",
        photos: [],
        texts: [
            {
                text: "Obras principales",
                x: 0.5,
                y: 0.88,
                color: BLUE_PEN,
                size: 0.053,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.obras.join('  •  '),
                x: 0.5,
                y: 0.80,
                color: BLACK_PEN,
                size: 0.038,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: "Aportes clave",
                x: 0.5,
                y: 0.65,
                color: BLUE_PEN,
                size: 0.050,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.aportes.join('  •  '),
                x: 0.5,
                y: 0.55,
                color: BLACK_PEN,
                size: 0.036,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            },
            {
                text: "Resumen",
                x: 0.5,
                y: 0.40,
                color: BLUE_PEN,
                size: 0.048,
                fontWeight: 800,
                align: "center"
            },
            {
                text: j.resumen,
                x: 0.5,
                y: 0.29,
                color: BLACK_PEN,
                size: 0.034,
                fontWeight: 600,
                align: "center",
                maxWidth: 0.60
            }
        ]
    });
}

writeFileSync(join(__dirname, '../src/objects/bookPages.json'), JSON.stringify(pages, null, 4));
console.log(`Generado bookPages.json con ${pages.length} páginas`);