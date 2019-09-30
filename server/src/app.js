const express = require('express');
const cors = require('cors');
const crawl = require('./crawler');

const app = express();
app.use(express.json());
app.use(cors());
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

console.clear();

app.get('/api/search/:id', async function(req, res) {
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

async function run() {
  const data = await crawl('react');
  try {
    console.log(data);
    app.get('/', async function(req, res) {
      return res.status(200).send('GET root');
    });
    app.get('/api', async function(req, res) {
      res.status(200).send(data);
    });
  } catch (err) {
    console.error('Error: ', err);
  }
}
run();
