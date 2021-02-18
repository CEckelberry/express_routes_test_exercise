const ExpressError = require('./expressError')

function logger(req, res, next) {
    console.log(`RECEIVED a ${req.method} request to ${req.path}.`);
    return next();
}


module.exports = { logger }