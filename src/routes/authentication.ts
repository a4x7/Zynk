import { Router } from 'express';

import { register, login, fetchUserInfo, logout, deleteUser } from '../controllers/authenticationController.js';

const authenticationRouter = Router();

authenticationRouter.post('/api/register', register);
authenticationRouter.delete('/api/register', deleteUser);
authenticationRouter.post('/api/login', login);
authenticationRouter.get('/api/login', fetchUserInfo);
authenticationRouter.get('/api/logout', logout);

export default authenticationRouter;
