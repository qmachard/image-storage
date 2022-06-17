import { Router } from 'express';
import fs from 'fs';

import { NotFoundException } from '~/utils/exceptions';

import { getFilepath } from '~/domains/image/image.service';

const ImageController = Router();

ImageController.get('/:filename', (req, res) => {
    const { filename } = req.params;

    const filepath = getFilepath(filename);

    if (!fs.existsSync(filepath)) {
        throw new NotFoundException(`Image not found.`);
    }

    return res
        .status(200)
        .sendFile(filepath);
});

export { ImageController };
