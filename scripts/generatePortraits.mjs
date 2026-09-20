import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const juristas = JSON.parse(readFileSync(join(__dirname, '../data/juristas/juristas.json'), 'utf8'));

const colors = {
    ciceron:    { bg: '#1a1a2e', gold: '#c9a227', skin: '#d4a574', hair: '#2c1810' },
    ulpiano:    { bg: '#0d1b2a', gold: '#d4af37', skin: '#c9b037', hair: '#1a1a2e' },
    montesquieu:{ bg: '#2b0a0a', gold: '#c9a227', skin: '#e0c097', hair: '#4a3728' },
    tocqueville: { bg: '#1a2332', gold: '#c9a227', skin: '#d4a574', hair: '#3a2a1a' },
    savigny:    { bg: '#0d1b2a', gold: '#d4af37', skin: '#e8d5b7', hair: '#2c2c2c' },
    chiovenda:  { bg: '#1a1a1a', gold: '#c9a227', skin: '#d4a574', hair: '#1a1a2e' },
    kelsen:     { bg: '#0d0d0d', gold: '#c9a227', skin: '#e0c097', hair: '#3a3a3a' },
};

function portrait(j) {
    const c = colors[j.id] || colors.ciceron;
    const initial = j.nombre.split(' ').map(w => w[0]).join('').slice(0, 2);

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg_${j.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${c.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="light_${j.id}" cx="50%" cy="30%" r="60%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0" />
    </radialGradient>
  </defs>

  <!-- Fondo -->
  <rect width="800" height="1000" fill="url(#bg_${j.id})"/>
  <rect width="800" height="1000" fill="url(#light_${j.id})"/>

  <!-- Marco dorado -->
  <rect x="20" y="20" width="760" height="960" fill="none" stroke="${c.gold}" stroke-width="4"/>
  <rect x="30" y="30" width="740" height="940" fill="none" stroke="${c.gold}" stroke-width="1" opacity="0.5"/>

  <!-- Círculo del retrato -->
  <circle cx="400" cy="380" r="200" fill="${c.skin}" stroke="${c.gold}" stroke-width="4"/>
  <circle cx="400" cy="380" r="200" fill="url(#light_${j.id})"/>

  <!-- Cabello -->
  <path d="M200,300 Q200,150 400,150 Q600,150 600,300 L600,350 Q600,250 400,250 Q200,250 200,350 Z" fill="${c.hair}"/>

  <!-- Ojos -->
  <ellipse cx="330" cy="360" rx="20" ry="12" fill="${c.bg}"/>
  <ellipse cx="470" cy="360" rx="20" ry="12" fill="${c.bg}"/>
  <circle cx="330" cy="360" r="6" fill="#ffffff"/>
  <circle cx="470" cy="360" r="6" fill="#ffffff"/>

  <!-- Nariz -->
  <path d="M390,380 L400,440 L410,380" fill="none" stroke="${c.bg}" stroke-width="2" opacity="0.5"/>

  <!-- Boca -->
  <path d="M350,480 Q400,500 450,480" fill="none" stroke="${c.bg}" stroke-width="3" opacity="0.6"/>

  <!-- Toga / Ropa -->
  <path d="M250,600 L550,600 L600,900 L200,900 Z" fill="${c.gold}" opacity="0.3"/>
  <rect x="350" y="600" width="100" height="300" fill="${c.bg}" rx="10"/>
  <line x1="400" y1="620" x2="400" y2="880" stroke="${c.gold}" stroke-width="3"/>

  <!-- Iniciales -->
  <text x="400" y="780" font-family="Georgia, serif" font-size="80" fill="${c.gold}" text-anchor="middle" font-weight="bold">${initial}</text>

  <!-- Nombre -->
  <text x="400" y="920" font-family="Playfair Display, Georgia, serif" font-size="42" fill="#f6f4f0" text-anchor="middle" font-weight="700">${j.nombre}</text>

  <!-- Años -->
  <text x="400" y="960" font-family="Georgia, serif" font-size="24" fill="#888888" text-anchor="middle">${j.anios}</text>
</svg>`;
}

for (const j of juristas) {
    const svg = portrait(j);
    writeFileSync(join(__dirname, `../public/album/${j.id}.svg`), svg);
    console.log(`Generado ${j.id}.svg`);
}

console.log('\nListo: 7 retratos SVG generados.');
console.log('\nPara reemplazar por fotos reales, descarga las imágenes en:');
console.log('C:\\Users\\Ronald\\Documents\\Proyectos\\album-juristas-3d\\juristas-album\\public\\album\\');
console.log('Nombres: ciceron.svg, ulpiano.svg, montesquieu.svg, tocqueville.svg, savigny.svg, chiovenda.svg, kelsen.svg');
