import type { Buffer } from 'node:buffer';

import type { Request, Response, NextFunction } from 'express';

function json(req: Request, res: Response, next: NextFunction) {
    const content_type = req.get('Content-Type');
    const hasBody = parseInt(req.get('Content-Length')!) > 0;
    if(!hasBody || content_type !== 'application/json')
        return next();
    let body = '';
    req.on('data', (chunk: Buffer) => {
        body += chunk.toString('utf-8');
    });
    req.on('end', () => {
        try{
            if(body !== '')
                req.body = JSON.parse(body);
            next();
        } catch(err) {
            return res.status(400).send('Invalid JSON structure');
        }
    });
}

export default json;
