import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { ExceptionsHandler } from '~/middlewares/exceptions.handler';
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler';

import { ImageController } from '~/domains/image/image.controller';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('🏠'));

app.use('/images', ImageController);

app.all('*', UnknownRoutesHandler);

app.use(ExceptionsHandler);

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server is running on PORT', port);
});
