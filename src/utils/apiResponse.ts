import type { Request, Response } from 'express';

function apiResponse(req: Request, res: Response, status: number, message: Object | string, success: boolean = true){
    res.status(status).json({ success: success, received: req.body, response: message });
}

export default apiResponse;
