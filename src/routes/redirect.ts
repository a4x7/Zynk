import { Router, type NextFunction, type Request, type Response } from 'express';

import { table } from '../db/db.js';
import { user } from '../db/db.js';
import { verifyToken } from './api.js';
import type { payloadType } from './authentication.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const redirectRouter = Router();

const redirectGet = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(req.params.string && !Array.isArray(req.params.string)) {
        const str = req.params.string;
        const token: string = req.cookies.authtoken;
        if(!token)
            next(new Error('Token not found'));
        const payload = verifyToken(token) as payloadType;
        const usr = await user.findOne({username: payload.username});
        if(!usr)
            throw 'User not found';
        const id = decoder(str);
        const doc = await table.findOne({_id: id});
        if(doc)
            return res.status(300).redirect(doc.URL);
    }
    next(new Error('An error occured'));
});

redirectRouter.route('/redirect/:string').get(redirectGet);

function decoder(str: string): number {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let id = 0;
    for(let i = 0; i !== str.length; i++) {
        id += chars.indexOf(str[i]!)*Math.pow(62, i);
    }
    return id;
}

export default redirectRouter;
