import { Router } from 'express';

import { apiDelete, apiGet, apiPost } from '../controllers/apiControllers.js';

const apiRouter = Router();

apiRouter.route('/api')
    .get(apiGet)
    .post(apiPost)
    .delete(apiDelete);

export default apiRouter;
