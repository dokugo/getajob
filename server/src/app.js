console.clear();

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');

const mutex = require('./helpers/mutex');
const responseList = require('./helpers/responseList');

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

const requestHandler = async (lockID, searchKeywords) => {
  const request = await mutex(lockID, searchKeywords);
  return request;
};

const responseHandler = async (data, responseObject) => {
  const response = await responseList(data, responseObject);
  return response;
};

app.get('/search/:id', limiter, async (request, response) => {
  try {
    const searchKeywords = request.params.id;
    const lockID = request.ip;

    const data = await requestHandler(lockID, searchKeywords);
    const processedResponse = await responseHandler(data, response);

    return processedResponse;
  } catch (error) {
    console.log(error);
  }
});
