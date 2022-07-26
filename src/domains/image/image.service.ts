import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import sharp from 'sharp';

export function getFilepath(filename: string, createIfNotExists: boolean = true, subDir: string = 'original'): string {
    if (!process.env.IMAGE_STORAGE) {
        throw new Error('You must define a storage for image, check your .env');
    }

    const filepath = `${process.env.IMAGE_STORAGE}/${subDir}`;

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

interface ProcessedImageOptions {
    width?: number;
    height?: number;
}

export async function getProcessedImage(filename: string, options: ProcessedImageOptions): Promise<string | null> {
    const { width, height } = options;

    const filepath = getFilepath(filename, false);

    if (!fs.existsSync(`${filepath}/${filename}`)) {
        return null;
    }

    let prefix = '';

    if (width) {
        prefix += `w${width}_`;
    }

    if (height) {
        prefix += `h${height}_`;
    }

    if ('' === prefix) {
        return `${filepath}/${filename}`;
    }

    const cacheFilePath = getFilepath(filename, true, 'cache');
    const cacheFileName = `${prefix}${filename}`;

    if (!fs.existsSync(`${cacheFilePath}/${cacheFileName}`)) {
        await sharp(`${filepath}/${filename}`)
            .resize({
                width,
                height,
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .withMetadata()
            .toFile(`${cacheFilePath}/${cacheFileName}`);
    }

    return `${cacheFilePath}/${cacheFileName}`;
}
