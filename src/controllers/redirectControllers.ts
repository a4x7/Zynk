import type { Request, Response, NextFunction } from 'express';

import table from '../db/table.model.js';
import user from '../db/user.model.js';
import verifyToken from '../utils/jwtVerify.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { decoder } from '../utils/encoding.js';
import type { payloadType } from '../utils/payloadType.js';

const redirectGet = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    if(req.params.string && !Array.isArray(req.params.string)) {
        const str = req.params.string;
        const token: string = req.cookies.authtoken;
        if(!token)
            throw new Error('Token not found');
        const payload = verifyToken(token) as payloadType;
        const usr = await user.findOne({username: payload.username}).lean();
        if(!usr)
            throw new Error('User not found');
        const id = decoder(str);
        const doc = await table.findOne({_id: id}).lean();
        if(doc)
            return res.status(300).redirect(doc.URL);
    }
    new Error('An error occured');
});

export { redirectGet };
