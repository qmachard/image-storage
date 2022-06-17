import cors from 'cors';
import express from 'express';

import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler';
import { ExceptionsHandler } from '~/middlewares/exceptions.handler';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('🏠'));

app.all('*', UnknownRoutesHandler)

app.use(ExceptionsHandler);

const port = process.env.API_PORT ?? 3000;

app.listen(port, () => console.log(`API listening port ${port}...`))
