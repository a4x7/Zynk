import jwt from 'jsonwebtoken';
declare const authenticationRouter: import("express-serve-static-core").Router;
export interface payloadType extends jwt.JwtPayload {
    username: string;
    type: string;
    password: string;
}
export default authenticationRouter;
//# sourceMappingURL=authentication.d.ts.map