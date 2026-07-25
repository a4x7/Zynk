import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import user, { type userType } from '../db/user.model.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import apiResponse from '../utils/apiResponse.js';
import bcrypt from 'bcrypt';

const login = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body; 
    const usr: userType | null = await user.findOne({username}).lean();
    if(!usr)
        throw new Error('User not found');
    if(await bcrypt.compare(password, usr.password)){
        const token =jwt.sign({
            username: username,
            type: 'regular',
            password: usr.password,
        }, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358', { expiresIn: `${parseInt(process.env.LOGIN_TIMEOUT || '10')}m` });
        res
        .cookie('authtoken', token, {
            maxAge: 1000*60*parseInt(process.env.LOGIN_TIMEOUT || '10')
        });
        return apiResponse(req, res, 200, {
            user: usr.username,
            email: usr.email
        });
    }
    throw new Error('Invalid Password');
});


const logout = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.authtoken
    if(!token)
        throw new Error('Token not found');
    res.clearCookie('authtoken');
    apiResponse(req, res, 200);
});

export { login, logout };
