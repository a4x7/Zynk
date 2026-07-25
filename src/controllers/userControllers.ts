import fs from 'node:fs';

import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import asyncWrapper from "../utils/asyncWrapper.js";
import apiResponse from "../utils/apiResponse.js";
import user, { type userType } from '../db/user.model.js'
import authenticate from "../utils/authenticate.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import verifyToken from '../utils/jwtVerify.js';
import type { payloadType } from '../utils/payloadType.js';

const userGet = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies.authtoken;
    if(!token)
        return apiResponse(req, res, 200, {isAuthenticated: false}); const payload = verifyToken(token) as payloadType; 
    const usr = await user.findOne({username: payload.username}).lean();
    if(!usr)
        return apiResponse(req, res, 200, { isAuthenticated: false});
    apiResponse(req, res, 200, {isAuthenticated: true, username: usr.username, email: usr.email, avatar: usr.avatar});
});

const userPost = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    try {
        await authenticate(req);
        throw new Error('User is already logged in', {
            cause: 'logged',
        });
    } catch(err: unknown) {
        if(err instanceof Error && err.cause === 'logged')
            throw err;
    };
    const data: userType | undefined = req.body;
    const avatar = req.file;

    if(!data)
        throw new Error('Empty body');
    if(data.password.length < 8)
        throw new Error('Password must have atleast 8 characters');
    if(/^\d+$/.test(data.username))
        throw new Error('Username must have atleast one character');
    const hashedPass = await bcrypt.hash(data.password, 10);
    data.password = hashedPass;
    const exists = await user.exists({username: data.username});
    if(exists)
        throw new Error('User already exists');
    if(avatar){
        const response = await uploadOnCloudinary(avatar.path);
        if(response)
            data.avatar = response.url;
        fs.rmSync(avatar.path);
    }
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

const userPut = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const usrData: userType | null = await authenticate(req);
    const avatar = req.file;
    const usr = await user.findOne({_id: usrData._id});
    if(!usr)
        throw new Error('User not found');
    if(avatar) {
        const response = await uploadOnCloudinary(avatar.path);
        if(!response)
            throw new Error('Something went wrong');
        usr.avatar = response.url;
        fs.rmSync(avatar.path);
    }
    const { username, email } = req.body;
    if(username)
        usr.username = username;
    if(email)
        usr.email = email;
    await usr.save();
    apiResponse(req, res, 200, 'User details changed successfully');
});

const userDelete = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.authtoken;
    if(!token)
        throw new Error('Token not found');
    const payload = verifyToken(token) as payloadType;
    const usr = await user.findOneAndDelete({username: payload.username}).lean();
    if(!usr)
        throw new Error('User not found');
    if(usr.avatar)
        await deleteOnCloudinary(usr.avatar);
    res.clearCookie('authtoken');
    apiResponse(req, res, 200, {
        username: usr.username,
        email: usr.email,
    });
});


export { userGet, userPost, userPut, userDelete };
