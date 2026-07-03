import process from 'node:process'
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

import { Router, type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { user } from '../db/db.js';
import { type userType } from '../db/schema.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import apiResponse from '../utils/apiResponse.js';

const authenticationRouter = Router();

const register = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: userType = req.body;
    if(!data)
        return next(new Error('Empty body'));
    if(data.password.length < 8)
        return next(new Error('Password must have atleast 8 characters'));
    if(/^\d+$/.test(data.username))
        return next(new Error('Username must have atleast one character'));
    const encPass = encrypt(data.password);
    data.password = encPass;
    const newUsr = await user.create(data);
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    });
    apiResponse(req, res, 201, newUsr);
});

const login = asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body; 
    const usr = await user.findOne({username: username}).lean();
    if(!usr)
        return next(new Error('User not found'));
    const decrypted = decrypt(usr.password);
    if(password === decrypted){
        const token =jwt.sign({
            username: username,
            type: 'regular',
            password: usr.password,
        }, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358', { expiresIn: '10m' });
        const timeofExpiry = new Date(Date.now()+1000*60*10);
        console.log(timeofExpiry.toLocaleString());
        res
        .cookie('authtoken', token, {
            expires: timeofExpiry
        });
        return apiResponse(req, res, 200, {
            user: usr.username,
            email: usr.email
        });
    }
    next(new Error('Invalid Password'));
});

authenticationRouter.post('/register', register);
authenticationRouter.post('/login', login);

interface payloadType extends jwt.JwtPayload{
    username: string,
    type: string,
    password: string,
}

function encrypt(pass: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(pass, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

function decrypt(encPass: string): string {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(process.env.SECRET_KEY || '92q09jwadmjid102jep0fhnna0f9').digest('hex');
    const iv = encPass.slice(0, 32);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encPass.slice(32), 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

export type { payloadType };
export default authenticationRouter;
