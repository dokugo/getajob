const express = require('express');
const cors = require('cors');
const crawl = require('./crawler');

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));
app.use(cors());

console.clear();

app.use(express.json());

async function server() {
  const data = await crawl('vue');
  try {
    console.log(data);
    app.get('/', async function(req, res) {
      return res.status(200).send('GET root');
    });
    app.get('/api', async function(req, res) {
      res.status(200).send(data);
    });
  } catch (e) {
    console.error('Error: ', e);
  }
}

server();

app.get('/api/search/:id', async function(req, res) {
  try {
    // console.log(req);
    const searchRequest = req.params.id;
    const data = await crawl(searchRequest);
    console.log(data);
    // res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);

    /*       console.log(req.body);
  res.status(200).send(req.body); */

    // execute crawling with newCrawlingRequest
  } catch (err) {
    console.log(err);
  }
});

/* crawl()
  .then(data => {
    console.log(data);
    app.get('/', (req, res) => {
      return res.status(200).send('GET root');
    });
    app.get('/api', (req, res) => {
      res.status(200).send(data);
    });
  })
  .catch(function(e) {
    console.error('Error: ', e);
  }); */
