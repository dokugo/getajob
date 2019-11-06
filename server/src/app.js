const PromiseController = require('promise-controller');
const pc = new PromiseController();

const express = require('express');
const limit = require('express-rate-limit');
const cors = require('cors');
const crawl = require('./crawler');

const app = express();

const limiter = limit({
  windowMs: 5 * 1000, // 5 second
  max: 53, // requests per windowMs for each IP
  message: JSON.stringify({
    status: 'error',
    message:
      'Too many requests are being made from your IP, please try again after a second or two.'
  })
});

app.use(cors());
app.use(express.json());
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

console.clear();

app.get('/api/search/:id', limiter, async (req, res) => {
  try {
    const searchKeywords = req.params.id;
    console.log(pc.isPending);

    if (pc.isPending) {
      res.statusMessage = 'Enhance Your Calm';
      res.status(420).json({
        status: 'error',
        message: 'Previous request is processing now.'
      });
    } else {
      const promise = pc.call(() => crawl(searchKeywords));
      const data = await promise;

      console.log(data);

      if (data && data.length) {
        res.status(200).json({
          status: 'OK',
          message: 'Data successfully delivered.',
          data: data
        });
      } else {
        res.status(200).json({ status: 'OK', message: 'Found nothing.' });
      }
    }
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
