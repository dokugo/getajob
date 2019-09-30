const express = require('express');
const $ = require('cheerio');
const puppeteer = require('puppeteer-extra');

const stealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(stealth);
// const UserAgentPlugin = require('puppeteer-extra-plugin-anonymize-ua');
// puppeteer.use(UserAgentPlugin({ makeWindows: true }));

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));
const cors = require('cors');
app.use(cors());

/* const puppeteer = require('puppeteer'); */

const URL = `https://rateyourmusic.com/~Arves`;

// testing
// const URL = `https://bot.sannysoft.com`;
// const URL = `https://antoinevastel.com/bots`;
// const URL = `https://arh.antoinevastel.com/bots/areyouheadless`;

// const URL = `https://www.whoishostingthis.com/tools/user-agent`;

console.clear();

(async function test() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', req => {
      if (
        req.resourceType() === 'stylesheet' ||
        req.resourceType() === 'font' ||
        req.resourceType() === 'image'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    // await page.waitFor(1000);

    const result = await page.content();
    const targetHtmlContainer = $('.mbgen', result)[11];
    const items =
      targetHtmlContainer.children[0].children[1].children[0].children[1]
        .children;
    const dataArr = items.filter(item => {
      return item.name === 'a';
    });
    /*     const data = await dataArr.map(item => {
      return item.attribs.class === 'artist'
        ? { albumArtist: item.children[0].data }
        : {
            albumTitle: item.children[0].data,
            albumLink: `https://rateyourmusic.com${item.attribs.href}`
          };
    }); */
    /*     const abc = dataArr.forEach(element => {
      return element;
    });
    console.log(abc); */
    console.log(dataArr);
    // console.log(data);

    // console.log(targetHtmlContainer);
    // const targetHtmlContainer = await page.$('.mbgen');
    // console.log(targetHtmlContainer);

    // await page.screenshot({ path: 'stealth-test-result.png', fullPage: true });
    await browser.close();
  } catch (e) {
    console.error('Error: ', e);
  }
})();

/* puppeteer
  .launch({ headless: true })
  .then(browser => {
    return browser.newPage();
  })
  .then(page => {
    return page.goto(URL).then(() => {
      return page.content();
    });
  })
  .then(html => {
    // console.log(html);
    // const targetHtmlContainer = $('.mbgen', html);
    // console.log(targetHtmlContainer);
    console.log(html);
  })
  .catch(err => {
    console.log('Error: ', err);
    console.error('Error: ', err);
  }); */
