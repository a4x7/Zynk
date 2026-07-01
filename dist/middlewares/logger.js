function logger(req, _, next) {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleString();
    console.log(method, url, time);
    next();
}
export default logger;
//# sourceMappingURL=logger.js.map