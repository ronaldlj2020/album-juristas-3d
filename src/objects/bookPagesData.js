import pages from "./bookPages.json";

// En la versión web (npm run build:web) el álbum vive en una subcarpeta y los retratos
// se sirven en WebP; en desarrollo se usan los PNG originales desde la raíz.
const WEB = import.meta.env.VITE_WEB === "1";
const album = (name) => {
    const file = WEB ? name.replace(/\.png$/i, ".webp") : name;
    return `${import.meta.env.BASE_URL}album/${encodeURI(file.normalize("NFD"))}`;
};

const captionDefaults = {
    size: 0.04,
    fontFamily: "Caveat, cursive",
    fontWeight: 500,
    fontStyle: "normal",
    color: "#2c2c2c",
    align: "center",
    letterSpacing: 0,
};

function hydrateMedia(item) {
    return {
        ...item,
        src: album(item.src),
        ...(item.poster ? { poster: album(item.poster) } : {}),
    };
}

export const BOOK_PAGES = pages.map((page) => ({
    ...page,
    photos: (page.photos ?? []).map(hydrateMedia),
    texts: (page.texts ?? []).map((item) => ({ ...captionDefaults, ...item })),
    stamps: (page.stamps ?? []).map(hydrateMedia),
}));
