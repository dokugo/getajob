console.clear();

const PORT = process.env.PORT || 9000;

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');
const router = require('./router/router');
const { errorHandler, notFound404 } = require('./middlewares/middlewares');

const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));

const limiter = limit({
  windowMs: 5 * 1000, // 5 seconds
  max: 3, // requests per windowMs for each IP
  skipSuccessfulRequests: true,
  skipFailedRequests: true,
  message: JSON.stringify({
    status: 'error',
    message:
      'Too many requests are being made from your IP, please try again after a second or two.'
  })
});

app.use(router);
app.use(errorHandler);
app.use(notFound404);
