import type { Request, Response, NextFunction } from 'express';

function logger(req: Request, _: Response, next: NextFunction): void {
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const time = new Date().toLocaleTimeString();
    console.log(method, url, time, ip);
    next();
}

export default logger;
