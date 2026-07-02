import qs from 'node:querystring';
import type { Buffer } from 'node:buffer';

import type { Request, Response, NextFunction } from 'express';

function urlencoded(req: Request, res: Response, next: NextFunction) {
    const content_type = req.get('Content-Type');
    const hasBody = parseInt(req.get('content-length')!) > 0;
    if(!hasBody || content_type !== 'application/x-www-form-urlencoded')
        return next();
    let body = '';
    req.on('data', (chunk: Buffer) => {
        body += chunk.toString('utf-8');
    });
    req.on('end', () => {
        try {
            if(body !== ''){
                req.body = qs.parse(body);
                console.log(req.body);
            }
            next();
        } catch(err) {
            return res.status(400).send('Invalid form data');
        }
    });
}

export default urlencoded;
