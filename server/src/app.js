console.clear();

const express = require('express');
const cors = require('cors');
const limit = require('express-rate-limit');

const mutex = require('./mutex');

const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log('Nightcrawler app listening on port 9000'));

const limiter = limit({
  windowMs: 5 * 1000, // 5 seconds
  max: 3, // requests per windowMs for each IP
  message: JSON.stringify({
    status: 'error',
    message:
      'Too many requests are being made from your IP, please try again after a second or two.'
  })
});

const handleSearchRequest = (lockID, searchKeywords, res) => {
  return mutex(lockID, searchKeywords, res);
};

app.get('/search/:id', limiter, async (req, res) => {
  try {
    const searchKeywords = req.params.id;
    const lockID = req.ip;

    handleSearchRequest(lockID, searchKeywords, res);
  } catch (error) {
    console.log(error);
  }
});

/* const cities = require('./cities');
app.get('/cities', limiter, async (req, res) => {
  try {
    const data = await cities();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}); */
