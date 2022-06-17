import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { BadRequestException, NotFoundException } from '~/utils/exceptions';

import { uploadHandler } from '~/middlewares/upload.handler';

import { generateFilename, getProcessedImage, saveImage } from '~/domains/image/image.service';

const ImageController = Router();

ImageController.get('/:filename', expressAsyncHandler(async (req, res) => {
    const { filename } = req.params;
    const { w, h } = req.query;

    const processedImage = await getProcessedImage(filename, {
        width: 'string' === typeof w ? parseInt(w) : undefined,
        height: 'string' === typeof h ? parseInt(h) : undefined,
    });

    if (null === processedImage) {
        throw new NotFoundException(`Image not found.`);
    }

    res
        .status(200)
        .sendFile(processedImage);
}));

ImageController.post('/', uploadHandler.single('image'), expressAsyncHandler(async (req, res) => {
    if (!req.file) {
        throw new BadRequestException(`You must provide image file.`);
    }

    const { path, mimetype } = req.file;

    const filename = generateFilename(mimetype);

    saveImage(path, filename);

    res
        .status(201)
        .json({
            url: `/images/${filename}`,
            filename,
            mimetype,
        });
}));

export { ImageController };
