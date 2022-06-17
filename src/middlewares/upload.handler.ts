import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = process.env.IMAGE_TEMP_STORAGE ?? '/tmp/images';

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4());
    },
});

const acceptedMimeTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];

export const uploadHandler = multer({
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    storage,
    fileFilter: (req, file, cb) => {
        cb(null, acceptedMimeTypes.includes(file.mimetype));
    }
});
