import type { Request, Response, NextFunction } from 'express';

type counterType = { ip: string, count: number };
let counters: counterType[] = [];

function ratelimiter(req: Request, res: Response, next: NextFunction){
    const ip = req.ip;
    if(!ip)
        return res.status(400).send('Bad request');
    for(let element of counters){
        if(element.ip === ip){
            if(element.count >= parseInt(process.env.RATE_LIMIT_COUNT || '5'))
                return res.status(400).send('Too many requests, try again later');
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
