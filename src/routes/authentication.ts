import process from 'node:process'
import { Router, type Request, type Response } from 'express';
import { user } from '../db/db.js';
import { type userType } from '../db/schema.js';
import crypto from 'node:crypto';

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

const login = async (usr: userType) => {
    const { username, password } = usr; 
    user.exists({username: username});
};
authenticationRouter.post('/register', register);
authenticationRouter.post('/login', login);

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
