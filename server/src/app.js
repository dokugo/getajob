console.clear();

const PORT = process.env.PORT || 9000;

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');
const { validateData } = require('./helpers/utils');
const lock = require('./helpers/lock');
const crawler = require('./crawler/crawler');
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

app.get('/search/:keywords', limiter, async (request, response, next) => {
  try {
    const lockId = request.ip;

    const isLocked = lock.acquire(lockId);
    if (isLocked) {
      response.statusMessage = 'Enhance Your Calm';

      lock.release(lockId);

      return response.status(420).send({
        message: `Server is busy.`,
        status: 'error'
      });
    }

    if (!request.params.keywords) {
      lock.release(lockId);

      return response
        .status(400)
        .send({ message: 'Missing data.', status: 'error' });
    }

    const searchKeywords = request.params.keywords.trim();

    if (!validateData(searchKeywords)) {
      lock.release(lockId);

      return response
        .status(400)
        .send({ message: 'Incorrect data.', status: 'error' });
    }

    const data = await crawler(searchKeywords);

    lock.release(lockId);

    if (data && data.length) {
      return response.status(200).send({
        message: `Data fetched successfully.`,
        status: 'OK',
        data: data
      });
    } else {
      return response.status(200).send({
        message: `Data not found.`,
        status: 'OK',
        data: null
      });
    }
  } catch (error) {
    lock.release(request.ip);
    next(error);
  }
});

app.use(errorHandler);
app.use(notFound404);
