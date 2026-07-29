import crypto from 'node:crypto';

import type { Request, Response } from 'express';

import type { userType } from '../db/user.model.js';
import table, { type tableType } from '../db/table.model.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import apiResponse from '../utils/apiResponse.js';
import { encoder } from '../utils/encoding.js';
import authenticate from '../utils/authenticate.js';

const apiGet = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const usr: userType | null = await authenticate(req);
    const query = await table.find({user: usr!._id}).lean();
    const result: {URL: string, short: string, expireAt?: Date | undefined}[] = [];
    for(let i of query){
        result.push({
            URL: i.URL,
            short: encoder(i._id),
            expireAt: i.expireAt
        });
    }
    apiResponse(req, res, 200, result);
});

const apiPost =  asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    if(!req.body)
        throw new Error('Empty body');
    const URL: string = req.body.URL;
    const expireAt: number | undefined = req.body.expireAt;
    const usr: userType | null = await authenticate(req);
    const _id = crypto.randomInt(Math.pow(10, 9), Math.pow(10, 10));
    const output = encoder(_id);
    const doc: tableType = {
        _id,
        URL,
        user: usr!._id,
    }
    if(expireAt)
        doc.expireAt = new Date(Date.now()+1000*expireAt);
    while(true) {
        try {
            await table.create(doc);
            break;
        } catch(err: any) {
            if(err?.code === 11000 && err?.keyPattern?._id === 1)
                continue;
            throw err;
        }
    }
    apiResponse(req, res, 201, output);
});

const apiDelete = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    if(!req.body)
        throw new Error('Empty body');
    const URL: string = req.body.URL;
    const usr: userType | null = await authenticate(req);
    const doc = await table.findOneAndDelete({user: usr._id, URL}).lean() as tableType;
    apiResponse(req, res, 200, doc);
});

export { apiGet, apiPost, apiDelete };
