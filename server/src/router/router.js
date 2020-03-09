const router = require('express').Router();
const { validateData } = require('../helpers/utils');
const lock = require('../helpers/lock');
const crawler = require('../crawler/crawler');

router.get('/search/:keywords', async (request, response, next) => {
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

router.get('/', (request, response, next) => {
  return response.send('Index.');
});

module.exports = router;
