import process from 'node:process'
import { Router, type Request, type Response } from 'express';
import { user } from '../db/db.js';
import { type userType } from '../db/schema.js';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

const authenticationRouter = Router();

const register = async (req: Request, res: Response) => {
    const data: userType = req.body;
    if(!data)
        return res.status(400).send({success: false, received: data, response: 'Empty body'});
    if(data.password.length < 8)
        return res.status(400).send({success: false, received: data, response: 'Password must have atleast 8 characters'});
    if(/^\d+$/.test(data.username))
        return res.status(400).send({success: false, received: data, response: 'Username must have atleast one character'});
    const encPass = encrypt(data.password);
    data.password = encPass;
    await user.create(data);
};

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body; 
    const usr = await user.findOne({username: username}).lean();
    if(!usr)
        return res.status(400).send({success: false, received: req.body, response: 'User not found'});
    const decrypted = decrypt(usr.password);
    if(password === decrypted){
        const token =jwt.sign({
            username: username,
            type: 'regular',
            password: usr.password,
        }, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358', { expiresIn: '10m' });
        return res.status(200).send({success: true, received: req.body, response: token});
    }
    return res.status(400).send({success: false, received: req.body, response: 'Invalid password'});
};
authenticationRouter.post('/register', register);
authenticationRouter.post('/login', login);

export interface payloadType extends jwt.JwtPayload{
    username: string,
    type: string,
    password: string,
}
export default authenticationRouter;

function encrypt(pass: string){
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(pass, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

function decrypt(encPass: string){
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = encPass.slice(0, 16);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encPass.slice(16), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
