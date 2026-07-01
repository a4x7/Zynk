import { Router } from 'express';
import { table, counterTable } from '../db/db.js';
const apiRouter = Router();
const apiGet = async (_, res) => {
    try {
        const query = await table.find({});
        res.status(200).send(query);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const apiPost = async (req, res) => {
    const input = req.body.URL;
    if (!input)
        return res.status(200).send({ success: true, received: {}, response: 'Empty body' });
    while (true) {
        try {
            const counter = await counterTable.findOne({ id: 1 });
            if (!counter)
                throw 'Counter not found';
            const _id = Math.round(Date.now() / 1000 + Math.random() * 100000 + counter.count + input.length);
            const output = encoder(_id);
            const doc = {
                _id: _id,
                URL: input,
            };
            await table.create(doc);
            counter.$inc('count', 1);
            await counter.save();
            return res.status(201).send({ success: true, received: input, response: output });
        }
        catch (err) {
            if (err?.code === 11000)
                continue;
            return res.status(400).send({ success: false, received: input, response: err });
        }
    }
    ;
    apiRouter.route('/api')
        .get(apiGet)
        .post(apiPost);
    export default apiRouter;
    function encoder(id) {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ';
        let encodedStr = '';
        while (id !== 0) {
            const remainder = id % 62;
            encodedStr += chars[remainder];
            id = Math.floor(id / 62);
        }
        return encodedStr;
    }
};
//# sourceMappingURL=api.js.map