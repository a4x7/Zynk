import jwt from "jsonwebtoken"

interface payloadType extends jwt.JwtPayload{
    username: string,
    type: string,
    password: string,
}

export type { payloadType };
