import Schema from 'mongoose';
import jwt from 'jsonwebtoken';
import { Router, type Request, type Response, type NextFunction } from 'express';

import { table, user } from '../db/db.js';
import type { tableType } from '../db/schema.js';
import type { payloadType } from './authentication.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import apiResponse from '../utils/apiResponse.js';

const apiRouter = Router();

const apiGet = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token: string = req.cookies.authtoken;
    if(!token)
        return next(new Error('No token found'));
    const payload = verifyToken(token) as payloadType;
    const usr = await user.findOne({username: payload.username});
    const query = await table.find({user: usr!._id}).lean();
    apiResponse(req, res, 200, query);
});

const apiPost =  asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!req.body)
        return next(new Error('Empty body'));
    const URL: string = req.body.URL;
    const token: string = req.cookies.authtoken;
    const payload = verifyToken(token) as payloadType;
    const usr = await user.findOne({username: payload.username});
    if(!usr)
        return next(new Error('User not found'));
    const _id = Math.round(Date.now()/1000 + Math.random()*10000000000 + URL.length);
    const output = encoder(_id);
    const doc: tableType = {
        _id: _id,
        URL: URL,
        user: usr!._id as Schema.Types.ObjectId,
    }
    while(true) {
        try {
            await table.create(doc);
            break;
        } catch(err: any) {
            if(err?.code === 11000 && err?.keyPattern?._id === 1)
                continue;
        }
    }
    apiResponse(req, res, 201, output);
});

apiRouter.route('/api')
    .get(apiGet)
    .post(apiPost);

function encoder(id: number): string {
    const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let encodedStr: string = '';
    while(id !== 0){
        const remainder: number = id % 62;
        encodedStr += chars[remainder];
        id = Math.floor(id / 62);
    }
    return encodedStr;
}

function verifyToken(token: string): jwt.JwtPayload | string {
    try{
        return jwt.verify(token, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358');
    } catch(err){
        throw new Error('Invalid token');
    }
}

export { verifyToken };
export default apiRouter;
