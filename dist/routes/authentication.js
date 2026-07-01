import process from 'node:process';
import { Router } from 'express';
import {} from '../db/schema.js';
import crypto from 'node:crypto';
const authenticationRouter = Router();
const authenticationPost = async (req, res) => {
    const data = req.body;
    const algorithm = 'aes-256-cbc';
    const key = process.env.CIPHER_KEY || crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data.password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
};
authenticationRouter.route('/authenticate')
    .post(authenticationPost);
export default authenticationRouter;
//# sourceMappingURL=authentication.js.map