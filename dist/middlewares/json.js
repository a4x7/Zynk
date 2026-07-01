function json(req, res, next) {
    const content_type = req.get('Content-Type');
    const hasBody = parseInt(req.get('Content-Length')) > 0;
    if (!hasBody || content_type !== 'application/json')
        return next();
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString('utf-8');
    });
    req.on('end', () => {
        try {
            if (body !== '')
                req.body = JSON.parse(body);
            next();
        }
        catch (err) {
            return res.status(400).send('Invalid JSON structure');
        }
    });
}
export default json;
//# sourceMappingURL=json.js.map