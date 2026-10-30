// Compila el álbum para incrustarlo en una web (p. ej. https://sitio/album-3d/).
//   npm run build:web            -> dist-web/
//   npm run build:web -- <ruta>  -> además copia dist-web/ a <ruta> (borrando su contenido anterior)
//
// Qué hace distinto de `npm run build`:
//  - base relativa ("./"), para funcionar en cualquier subcarpeta
//  - solo incluye los retratos que usa el libro (src/objects/bookPages.json), convertidos a WebP
//  - deja fuera los archivos sueltos de public/album que no usa nadie
//  - sin sourcemaps
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const staged = path.join(root, ".web-public");
const pages = fs.readFileSync(path.join(root, "src/objects/bookPages.json"), "utf8");

// 1) carpeta pública preparada: todo public/ menos public/album
fs.rmSync(staged, { recursive: true, force: true });
fs.cpSync(path.join(root, "public"), staged, {
    recursive: true,
    filter: (src) => path.relative(path.join(root, "public"), src).split(path.sep)[0] !== "album",
});

// 2) solo los retratos referenciados, en WebP
const refs = [...new Set([...pages.matchAll(/"(?:src|poster)"\s*:\s*"([^"]+\.png)"/gi)].map((m) => m[1]))];
if (!refs.length) throw new Error("No se encontraron retratos en bookPages.json");

let before = 0;
let after = 0;
for (const ref of refs) {
    const input = path.join(root, "public/album", ref);
    const output = path.join(staged, "album", ref.replace(/\.png$/i, ".webp"));
    fs.mkdirSync(path.dirname(output), { recursive: true });
    before += fs.statSync(input).size;
    await sharp(input).webp({ quality: 84 }).toFile(output);
    after += fs.statSync(output).size;
}
console.log(`Retratos: ${refs.length} · ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB (WebP)`);

// 3) compilación
execFileSync("npx", ["vite", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, VITE_WEB: "1" },
});
fs.rmSync(staged, { recursive: true, force: true });

// 4) copia opcional al destino
const target = process.argv[2];
if (target) {
    const dest = path.resolve(target);
    fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(path.join(root, "dist-web"), dest, { recursive: true });
    console.log(`Copiado a ${dest}`);
}
