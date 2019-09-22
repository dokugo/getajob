const puppeteer = require('puppeteer-extra');
/* const puppeteer = require('puppeteer'); */
const $ = require('cheerio');
const express = require('express');

const stealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(stealth);
// const UserAgentPlugin = require('puppeteer-extra-plugin-anonymize-ua');
// puppeteer.use(UserAgentPlugin({ makeWindows: true }));

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));
const cors = require('cors');
app.use(cors());

const search = searchRequest => {
  const rootDomain = `https://yaroslavl.hh.ru/search/vacancy?`;
  const params = `order_by=publication_time&area=112&text=`;
  const URL = `${rootDomain}${params}${searchRequest}`;
  return URL;

  // let searchRequest = searchRequests.react;
};

console.clear();

async function getPage(URL, page) {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });
    const html = await page.content();

    const NEXT_PAGE = $('.HH-Pager-Controls-Next', html).length
      ? $('.HH-Pager-Controls-Next', html)[0].attribs.href
      : null;
    const nextPageUrl = NEXT_PAGE
      ? `https://yaroslavl.hh.ru${NEXT_PAGE}`
      : null;
    // console.log(nextPageUrl);

    /*     const paginationBtnTxt = $(
      '[data-qa=pager-block] .bloko-button_pressed',
      html
    ).length
      ? $('[data-qa=pager-block] .bloko-button_pressed', html).text()
      : '1'; */
    // console.log(paginationBtnTxt, 'page');

    const getTitle = i => {
      return $('[data-qa=vacancy-serp__vacancy-title]', html)[i].children[0]
        .data;
    };
    const getCompensation = i => {
      return $('[data-qa=vacancy-serp__vacancy-title]', html)[i].parent.parent
        .parent.next.children[0]
        ? $('[data-qa=vacancy-serp__vacancy-title]', html)[i].parent.parent
            .parent.next.children[0].children[0].data
        : 'Зарплата не указана';
    };
    const getEmployer = i => {
      return $('[data-qa=vacancy-serp__vacancy-employer]', html)[
        i
      ].children[0].data.trim();
    };
    const getDate = i => {
      return $('[data-qa=vacancy-serp__vacancy-date] span', html)[i].children[0]
        .data;
    };
    const getLink = i => {
      return $('span.g-user-content > a.bloko-link', html)[i].attribs.href;
    };
    const getId = i => {
      return $('span.g-user-content > a.bloko-link', html)[
        i
      ].attribs.href.replace(/[^0-9]+/g, '');
    };

    // get vacancies data and put it into array of objects
    const vacanciesAmountOnPage = $('span.g-user-content > a.bloko-link', html)
      .length;
    const vacancies = [];
    for (let i = 0; i < vacanciesAmountOnPage; i++) {
      vacancies.push({
        /*         page: paginationBtnTxt,
        number: i + 1 + '', */
        title: getTitle(i),
        compensation: getCompensation(i),
        employer: getEmployer(i),
        date: getDate(i),
        link: getLink(i),
        id: getId(i)
      });
    }

    if (nextPageUrl) {
      return { vacancies, nextPageUrl };
    } else {
      return { vacancies };
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

async function crawl(searchRequest) {
  const URL = search(searchRequest);
  try {
    // console.clear();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.setRequestInterception(true);
    page.on('request', request => {
      if (
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'font' ||
        request.resourceType() === 'image' ||
        request.resourceType() === 'script'
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    page.setViewport({ width: 1920, height: 926 });

    const result = await getPage(URL, page);
    const output = result.vacancies;

    // get next page if it is exists
    if (result.nextPageUrl) {
      const nextPageUrl = result.nextPageUrl;

      // eslint-disable-next-line no-inner-declarations
      async function getNextPageLoop(nextPageUrl) {
        const result = await getPage(nextPageUrl, page);
        // concatenate next page data to previous pages data
        output.push(...result.vacancies);
        // console.log(result)
        if (result.nextPageUrl) {
          getNextPageLoop(result.nextPageUrl);
        }
      }

      await getNextPageLoop(nextPageUrl).then(() =>
        console.log('end' /* , output */)
      );
      await browser.close();
      return output;
    } else {
      console.log('last page');
      console.log('end' /* , output */);
      await browser.close();
      return output;
    }
    // console.log(output);
    // await page.screenshot({ path: 'stealth-ma-result.png', fullPage: true });
  } catch (e) {
    console.error('Error: ', e);
  }
}

app.use(express.json());

async function server() {
  const data = await crawl('vue');
  try {
    console.log(data);
    app.get('/', (req, res) => {
      return res.status(200).send('GET root');
    });
    app.get('/api', (req, res) => {
      res.status(200).send(data);
    });
  } catch (e) {
    console.error('Error: ', e);
  }
}

server();

app.post('/api/crawling', (req, res) => {
  const searchRequest = req.body.newCrawlingRequest;
  crawl(searchRequest)
    .then(data => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    })
    .then(data => console.log(data));

  /*       console.log(req.body);
  res.status(200).send(req.body); */

  // execute crawling with newCrawlingRequest
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
