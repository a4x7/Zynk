import { Router } from 'express';
import upload from '../middlewares/multer.js';

import { userGet, userPost, userPut, userDelete } from '../controllers/userControllers.js'

const userRouter = Router();

userRouter.route('/api/user')
    .get(userGet)
    .post(upload.single('avatar'), userPost)
    .put(upload.single('avatar'), userPut)
    .delete(userDelete);

export default userRouter;
