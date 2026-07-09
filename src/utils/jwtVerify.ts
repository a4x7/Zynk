import process from 'node:process';

import jwt from 'jsonwebtoken';

function verifyToken(token: string): jwt.JwtPayload | string {
    try{
        return jwt.verify(token, process.env.JWT_KEY || 'wdin4w2#i%paso%aq0)(!oaimoa0i-qdmmvaapk[moncoan13091jm1iqj0358');
    } catch(err){
        throw new Error('Invalid token');
    }
}

export default verifyToken;
