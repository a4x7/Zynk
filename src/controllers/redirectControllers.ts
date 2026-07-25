import type { Request, Response } from 'express';

import table from '../db/table.model.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import { decoder } from '../utils/encoding.js';
import authenticate from '../utils/authenticate.js';
import type { userType } from '../db/user.model.js';

const redirectGet = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    if(req.params.string && !Array.isArray(req.params.string)) {
        const usr: userType = await authenticate(req);
        const str = req.params.string;
        const id = decoder(str);
        const doc = await table.findOne({_id: id, user: usr._id}).lean();
        if(doc)
            return res.status(302).redirect(doc.URL);
    }
    throw new Error('An error occured');
});

export { redirectGet };
