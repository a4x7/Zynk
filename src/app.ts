import path from 'node:path';
import url from 'node:url';

import express from 'express';
import cookieParser from 'cookie-parser';

import logger from './middlewares/logger.js';
import cors from './middlewares/cors.js';
import json from './middlewares/json.js';
import urlencoded from './middlewares/urlencoded.js';
import ratelimiter from './middlewares/ratelimiter.js';
import connectDB from './db/db.js';
import apiRouter  from './routes/api.js';
import redirectRouter from './routes/redirect.js';
import authenticationRouter from './routes/authentication.js';
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/user.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = parseInt(process.env.PORT || '8000');

const app = express();

app.use('/static', express.static('./public'));
app.use(cookieParser());

app.use(logger);
app.use(cors);
app.use(json);
app.use(urlencoded);
app.use(ratelimiter);

app.use('/', apiRouter);
app.use('/', redirectRouter);
app.use('/', authenticationRouter);
app.use('/', userRouter);

app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
});
