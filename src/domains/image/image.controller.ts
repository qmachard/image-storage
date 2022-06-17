import { Router } from 'express';
import fs from 'fs';

import { NotFoundException } from '~/utils/exceptions';

import { uploadHandler } from '~/middlewares/upload.handler';

import { generateFilename, getFilepath, saveImage } from '~/domains/image/image.service';

const ImageController = Router();

ImageController.get('/:filename', (req, res) => {
    const { filename } = req.params;

    const filepath = getFilepath(filename);

    if (!fs.existsSync(`${filepath}/${filename}`)) {
        throw new NotFoundException(`Image not found.`);
    }

    return res
        .status(200)
        .sendFile(`${filepath}/${filename}`);
});

ImageController.post('/', uploadHandler.single('image'), async (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json({
                error: 'You must provide image file.',
            });
    }

    const { path, mimetype } = req.file;

    const filename = generateFilename(mimetype);

    saveImage(path, filename);

    return res
        .status(201)
        .json({
            url: `/images/${filename}`,
            filename,
            mimetype,
        });
})

export { ImageController };
