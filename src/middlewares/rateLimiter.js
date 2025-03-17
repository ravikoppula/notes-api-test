const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 50, // Allow only 1 request
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
 
module.exports = limiter;
