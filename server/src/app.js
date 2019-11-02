const express = require('express');
const limit = require('express-rate-limit');
const cors = require('cors');
const crawl = require('./crawler');

const app = express();

const limiter = limit({
  windowMs: 5 * 1000, // 5 second
  max: 10, // requests per windowMs for each IP
  message: JSON.stringify(
    'Too many requests are being made from your IP, please try again after a second or two.'
  )
});

app.use(cors());
app.use(express.json());
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

console.clear();

app.get('/api/search/:id', limiter, async (req, res) => {
  try {
    const searchKeywords = req.params.id;
    const data = await crawl(searchKeywords);
    console.log(data);
    // res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.error('Error: ', err);
  }
}
test(); */
