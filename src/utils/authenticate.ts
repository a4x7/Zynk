import type { Request } from "express";

import type { payloadType } from "../utils/payloadType.js";
import verifyToken from "../utils/jwtVerify.js";
import user, { type userType } from '../db/user.model.js'

async function authenticate(req: Request): Promise<userType>{
    const token: string = req.cookies.authtoken;
    if(!token)
        throw new Error('Token not found');
    const payload = verifyToken(token) as payloadType;
    const usr: userType | null = await user.findOne({username: payload.username}).lean();
    if(!usr)
        throw new Error('User not found');
    return usr;
}

export default authenticate;
