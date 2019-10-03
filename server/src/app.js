const express = require('express');
const cors = require('cors');
const crawl = require('./crawler');

const app = express();
app.use(express.json());
app.use(cors());
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

console.clear();

app.get('/api/search/:id', async (req, res) => {
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
async function test() {
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
test();
