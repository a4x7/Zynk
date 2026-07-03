import type { Request, Response, NextFunction } from 'express';

function errorHandler (err: Error, req: Request, res: Response, _: NextFunction): void {
    res.status(400).send({
        success: false,
        received: req.body,
        response: err.message,
    });
}

export default errorHandler;
