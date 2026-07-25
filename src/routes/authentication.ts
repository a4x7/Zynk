import { Router } from 'express';

import { login, logout } from '../controllers/authenticationControllers.js';

const authenticationRouter = Router();

authenticationRouter.post('/api/login', login);
authenticationRouter.get('/api/logout', logout);

export default authenticationRouter;
