import type { Request, Response, NextFunction } from 'express';

function logger(req: Request, _: Response, next: NextFunction): void {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleString();
    console.log(method, url, time);
    next();
}

export default logger;
