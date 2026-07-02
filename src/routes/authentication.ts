import process from 'node:process'
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

import { Router, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { user } from '../db/db.js';
import { type userType } from '../db/schema.js';

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
    try{
        const newUsr = await user.create(data);
        res.status(201).send({success: true, received: data, response: newUsr});
    } catch(err){
        res.status(400).send({success: false, received: data, response: err});
    }
};

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body; 
    try{
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
            return res
                .cookie('authtoken', token, {
                    expires: new Date(Date.now()+1000*60*10),
                })
                .status(200).send({success: true, received: req.body, response: 'You are logged in'});
        }
        return res.status(400).send({success: false, received: req.body, response: 'Invalid password'});
    } catch(err) {
        return res.status(400).send({success: false, received: req.body, response: err});
    }
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
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(pass, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

function decrypt(encPass: string){
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = encPass.slice(0, 32);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encPass.slice(32), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
