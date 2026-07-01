import process from 'node:process';
import path from 'node:path';
import url from 'node:url';
import express from 'express';
import logger from './middlewares/logger.js';
import cors from './middlewares/cors.js';
import json from './middlewares/json.js';
import urlencoded from './middlewares/urlencoded.js';
import { connectDB, counterTable } from './db/db.js';
import apiRouter from './routes/api.js';
import redirectRouter from './routes/redirect.js';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let PORT = parseInt(process.env.PORT || '8000');
const app = express();
app.use('/static', express.static('./public'));
console.log(__dirname);
app.use(logger);
app.use(cors);
app.use(json);
app.use(urlencoded);
app.use('/', apiRouter);
app.use('/', redirectRouter);
app.listen(PORT, async () => {
    try {
        await connectDB();
        const document = await counterTable.findOne({ id: 1 });
        if (!document)
            await counterTable.create({ id: 1 });
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Listening on port ${PORT}...`);
});
//fRWEW1
//# sourceMappingURL=app.js.map