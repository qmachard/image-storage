import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from '~/middlewares/exceptions.handler';

import { ImageController } from '~/domains/image/image.controller';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('src/public'));

app.get('/', async function (req, res) {
    await res.render('index');
});

app.use('/images', ImageController);

app.all('*', UnknownRoutesHandler);

app.use(ExceptionsHandler);

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server is running on PORT', port);
});
