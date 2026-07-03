import type { Request, Response, NextFunction } from 'express';

type counterType = { ip: string, count: number };
let counters: counterType[] = [];

function ratelimiter(req: Request, _: Response, next: NextFunction): void {
    const ip = req.ip;
    if(!ip)
        return next(new Error('Bad request'));
    for(let element of counters){
        if(element.ip === ip) {
            if(element.count >= parseInt(process.env.RATE_LIMIT_COUNT || '5'))
                new Error('Too many requests, try again later');
            element.count++;
            return next();
        }
    };
    counters.push({ ip, count: 0 });
    setTimeout(() => {
        counters = counters.filter((element) => element.ip !== ip);
    }, 20000);
    next();
}

export default ratelimiter;
