import { Router, type Request, type Response } from 'express';
import { table, counterTable } from '../db/db.js';
import type { tableType } from '../db/schema.js';

const apiRouter = Router();

const apiGet = async (_: Request, res: Response) => {
    try{
        const query = await table.find({}).lean();
        res.status(200).send(query);
    } catch(err) {
        res.status(400).send(err);
    }
};

const apiPost =  async (req: Request, res: Response) => {
    const input: string = req.body.URL;
    if(!input)
        return res.status(200).send({success: false, received: req.body, response: 'Empty body'});
    while(true){
        try {
            const counter = await counterTable.findOne({id: 1});
            if(!counter)
                throw 'Counter not found';
            const _id = Math.round(Date.now()/1000 + Math.random()*100000 + counter.count + input.length);
            const output = encoder(_id);
            const doc: tableType = {
                _id: _id,
                URL: input,
            }
            await table.create(doc);
            counter.$inc('count', 1); 
            await counter.save();
            return res.status(201).send({success: true, received: input, response: output});
        } catch(err: any) {
            if(err?.code === 11000)
                continue;
            return res.status(400).send({success: false, received: input, response: err});
        }
    }
};

apiRouter.route('/api')
    .get(apiGet)
    .post(apiPost);

export default apiRouter;

function encoder(id: number){
    const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let encodedStr: string = '';
    while(id !== 0){
        const remainder: number = id % 62;
        encodedStr += chars[remainder];
        id = Math.floor(id / 62);
    }
    return encodedStr;
}
