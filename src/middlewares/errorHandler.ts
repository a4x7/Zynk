import fs from 'node:fs';

import type { Request, Response, NextFunction } from 'express';
import apiResponse from '../utils/apiResponse.js';

function errorHandler (err: Error, req: Request, res: Response, _: NextFunction): void {
    if(req.file)
        fs.rmSync(req.file.path);

    apiResponse(req, res, 400, err.message, false);
}

export default errorHandler;
