import { Router, type Request, type Response } from 'express';
import { table } from '../db/db.js';

const redirectRouter = Router();

const redirectGet = async (req: Request, res: Response) => {
    if(req.params.string && !Array.isArray(req.params.string)){
        const str = req.params.string;
        let id = decoder(str);
        try {
            const doc = await table.findOne({_id: id});
            if(doc)
                return res.redirect(doc.URL);
        } catch(err) {
            return res.status(400).send(err);
        }
    }
    res.status(400).send('An error occured');
};

redirectRouter.route('/redirect/:string').get(redirectGet);

export default redirectRouter;

function decoder(str: string){
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
    let id = 0;
    for(let i = 0; i !== str.length; i++){
        id += chars.indexOf(str[i]!)*Math.pow(62, i);
    }
    return id;
}

