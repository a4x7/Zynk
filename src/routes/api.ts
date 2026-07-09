import { Router } from 'express';

import { apiGet, apiPost } from '../controllers/apiControllers.js';

const apiRouter = Router();

apiRouter.route('/api')
    .get(apiGet)
    .post(apiPost);

export default apiRouter;
