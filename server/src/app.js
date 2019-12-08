console.clear();

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');

const mutex = require('./helpers/mutex');
const responses = require('./helpers/responses');

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

const handleSearchRequest = async (lockID, searchKeywords, response) => {
  const state = await mutex(lockID, searchKeywords);
  return responses(state, response);
};

app.get('/search/:id', limiter, async (request, response) => {
  try {
    const searchKeywords = request.params.id;
    const lockID = request.ip;

    await handleSearchRequest(lockID, searchKeywords, response);
  } catch (error) {
    console.log(error);
  }
});

/* const cities = require('./cities');
app.get('/cities', limiter, async (request, response) => {
  try {
    const data = await cities();
    console.log(data);
    response.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}); */
