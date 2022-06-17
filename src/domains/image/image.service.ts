import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export function getFilepath(filename: string, createIfNotExists: boolean = true): string {
    const a = filename.substring(0, 1);
    const b = filename.substring(1, 2);
    const c = filename.substring(2, 3);

    const filepath = `${process.env.IMAGE_STORAGE}/${a}/${b}/${c}`;

    if (!fs.existsSync(filepath) && createIfNotExists) {
        fs.mkdirSync(filepath, { recursive: true });
    }

    return filepath;
}

const mimeTypesMapping: Record<string, { extension: string }> = {
    'image/gif': { extension: 'gif' },
    'image/png': { extension: 'png' },
    'image/jpeg': { extension: 'jpeg' },
    'image/bmp': { extension: 'bmp' },
    'image/webp': { extension: 'webp' },
};

export function generateFilename(mimetype: string = 'image/jpeg'): string {
    const { extension } = mimeTypesMapping[mimetype];

    if (!extension) {
        throw new Error(`Unknown mimetype "${mimetype}".`);
    }

    return `${uuidv4()}.${extension}`;
}

export function saveImage(path: string, filename: string): string {
    const filepath = getFilepath(filename);

    // Copy file to destination
    fs.copyFileSync(path, `${filepath}/${filename}`);

    // Remove file from source
    fs.rmSync(path);

    return `${filepath}/${filename}`;
}
