const rateLimit = require('express-rate-limit');

const windowSeconds = 5;

const limitedRequestsHandler = (request, response) => {
  return response.status(429).send({
    message: `Too many requests. Please try again after ${windowSeconds} seconds`
  });
};

const options = {
  windowMs: windowSeconds * 1000, // milliseconds
  max: 10, // limit each IP to RATE_LIMIT_MAX requests per windowMs
  // skipFailedRequests: true,
  handler: limitedRequestsHandler
};

const limiter = rateLimit(options);

module.exports = limiter;
