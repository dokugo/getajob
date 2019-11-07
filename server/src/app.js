console.clear();

const express = require('express');
const limit = require('express-rate-limit');
const cors = require('cors');
const mutex = require('./mutex');

const app = express();
app.use(cors());
app.use(express.json());
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

const limiter = limit({
  windowMs: 5 * 1000, // 5 second
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

app.get('/api/search/:id', limiter, async (req, res) => {
  try {
    const searchKeywords = req.params.id;
    const lockID = req.ip;

    handleSearchRequest(lockID, searchKeywords, res);
  } catch (error) {
    console.log(error);
  }
});

// run crawling on init for testing purposes
/* async function test() {
  const data = await crawl('vue');
  try {
    console.log(data);
    app.get('/', async (req, res) => {
      return res.status(200).send('GET root');
    });
    app.get('/api', async (req, res) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}
test(); */
