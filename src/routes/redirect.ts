import { Router } from 'express';

import { redirectGet } from '../controllers/redirectControllers.js';

const redirectRouter = Router();

redirectRouter.route('/api/redirect/:string').get(redirectGet);

export default redirectRouter;
