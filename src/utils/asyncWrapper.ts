import type { Request, Response, NextFunction } from 'express';

function asyncWrapper(fn:(req: Request, res: Response, next: NextFunction) => any){
    const wrapper = async (req: Request, res: Response, next: NextFunction) => {
        try{
            await fn(req, res, next);
        } catch(err){
            next(err);
        }
    };
    return wrapper;
}

export default asyncWrapper;
