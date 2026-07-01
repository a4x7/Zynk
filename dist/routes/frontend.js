import { Router } from 'express';
const frontend = Router().get('/adajdia', (_, res) => {
    res.status(200).sendFile('./index.html');
});
export default frontend;
//# sourceMappingURL=frontend.js.map