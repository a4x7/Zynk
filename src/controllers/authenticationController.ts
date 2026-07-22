import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import user, { type userType } from '../db/user.model.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import apiResponse from '../utils/apiResponse.js';
import verifyToken from '../utils/jwtVerify.js';
import type { payloadType } from '../utils/payloadType.js';
import bcrypt from 'bcrypt';

const register = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies.authtoken;
    if(token) {
        let flag: boolean = true;
        try {
            verifyToken(token) as payloadType;
        } catch(err: unknown){
            flag = false;
        }
        if(flag)
            throw new Error('You are already logged in');
    }
    const data: userType = req.body;
    if(!data)
        throw new Error('Empty body');
    if(data.password.length < 8)
        throw new Error('Password must have atleast 8 characters');
    if(/^\d+$/.test(data.username))
        throw new Error('Username must have atleast one character');
    const hashedPass = await bcrypt.hash(data.password, 10);
    data.password = hashedPass;
    const newUsr = await user.create(data);
    const newToken =jwt.sign({
        username: newUsr.username,
        type: 'regular',
        password: newUsr.password,
    }, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358', { expiresIn: `${parseInt(process.env.LOGIN_TIMEOUT || '10')}m` });
    res.cookie('authtoken', newToken, {
        maxAge: 1000*60*parseInt(process.env.LOGIN_TIMEOUT || '10')
    });
    apiResponse(req, res, 201, newUsr);
});

const login = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body; 
    const usr = await user.findOne({username: username}).lean();
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

const fetchUserInfo = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies.authtoken;
    if(!token)
        return apiResponse(req, res, 200, {isAuthenticated: false}); const payload = verifyToken(token) as payloadType; 
    const usr = await user.findOne({username: payload.username}).lean();
    if(!usr)
        return apiResponse(req, res, 200, { isAuthenticated: false});
    apiResponse(req, res, 200, {isAuthenticated: true, username: usr.username, email: usr.email});
});

const logout = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.authtoken
    if(!token)
        throw new Error('Token not found');
    res.clearCookie('authtoken');
    apiResponse(req, res, 200);
});

const deleteUser = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.authtoken;
    if(!token)
        throw new Error('Token not found');
    const payload = verifyToken(token) as payloadType;
    const usr = await user.findOneAndDelete({username: payload.username}).lean();
    if(!usr)
        throw new Error('User not found');
    apiResponse(req, res, 200, {
        username: usr.username,
        email: usr.email,
    });
});

export { register, login, fetchUserInfo, logout, deleteUser };
