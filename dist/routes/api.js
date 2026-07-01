import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Schema from 'mongoose';
import { table, counter, user } from '../db/db.js';
const apiRouter = Router();
const apiGet = async (req, res) => {
    try {
        const { token } = req.body || {};
        if (!token)
            return res.status(400).send({ success: false, received: req.body, response: 'No token found' });
        const payload = verifyToken(token);
        const usr = await user.findOne({ username: payload.username });
        const query = await table.find({ user: usr._id }).lean();
        res.status(200).send(query);
    }
    catch (err) {
        res.status(400).send({ success: false, received: req.body, response: err });
    }
};
const apiPost = async (req, res) => {
    if (!req.body)
        return res.status(200).send({ success: false, received: req.body, response: 'Empty body' });
    const { URL, token } = req.body;
    while (true) {
        try {
            const payload = verifyToken(token);
            const ctr = await counter.findOne({ id: 1 });
            const usr = await user.findOne({ username: payload.username });
            if (!ctr)
                throw 'Counter not found';
            const _id = Math.round(Date.now() / 1000 + Math.random() * 100000 + ctr.count + URL.length);
            const output = encoder(_id);
            const doc = {
                _id: _id,
                URL: URL,
                user: usr._id,
            };
            await table.create(doc);
            ctr.$inc('count', 1);
            await ctr.save();
            return res.status(201).send({ success: true, received: req.body, response: output });
        }
        catch (err) {
            if (err?.code === 11000)
                continue;
            return res.status(400).send({ success: false, received: req.body, response: err });
        }
    }
};
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
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358');
    }
    catch (err) {
        throw 'Invalid token';
    }
}
//# sourceMappingURL=api.js.map