import process from 'node:process';
function cors(req, res, next) {
    let ALLOWED_ORIGINS = [];
    if (process.env.ALLOWED_ORIGINS)
        ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(', ');
    for (let i of ALLOWED_ORIGINS)
        if (i === req.get('origin')) {
            res.set('Access-Control-Allow-Origin', i);
            break;
        }
    next();
}
export default cors;
//# sourceMappingURL=cors.js.map