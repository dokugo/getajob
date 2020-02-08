console.clear();

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');
const mutex = require('./helpers/mutex');
const responseList = require('./helpers/responseList');
const { validateData } = require('./helpers/utils');

const PORT = process.env.PORT || 9000;
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

const requestHandler = async (lockId, searchKeywords) => {
  const request = await mutex(lockId, searchKeywords);
  return request;
};

const responseHandler = async (data, responseObject) => {
  const response = await responseList(data, responseObject);
  return response;
};

app.get('/search/:id', limiter, async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .send({ message: 'Missing data.', status: 'error' });
    }

    const searchKeywords = request.params.id.trim();

    if (!validateData(searchKeywords)) {
      return response
        .status(400)
        .send({ message: 'Incorrect data.', status: 'error' });
    }

    const lockId = request.ip;

    const data = await requestHandler(lockId, searchKeywords);
    const processedResponse = await responseHandler(data, response);

    return processedResponse;
  } catch (error) {
    console.log(error);
  }
});
