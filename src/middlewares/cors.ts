import process from 'node:process';

import type { Request, Response, NextFunction } from 'express';

function cors(req: Request, res: Response, next: NextFunction): void {
    let ALLOWED_ORIGINS: string[] = [];
    if(process.env.ALLOWED_ORIGINS)
        ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');
    for(let i of ALLOWED_ORIGINS) {
        if(i === req.get('origin')) {
            res.set({
                'Access-Control-Allow-Origin': i,
                'Access-Control-Allow-Headers': 'Content-Type, Accept',
            });
            break;
        }
    }
    next();
}

export default cors;
