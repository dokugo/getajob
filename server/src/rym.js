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

/* const puppeteer = require('puppeteer');
const browser = await puppeteer.launch();
const page = await browser.newPage(); */

const URL = `https://rateyourmusic.com/~Arves`;
// const URL = `https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html`;
// const URL = `https://antoinevastel.com/bots/`;

(async function test() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    // await page.waitFor(5000);
    // await page.screenshot({ path: 'stealth-test-result.png', fullPage: true });
    const result = await page.content();
    const targetHtmlContainer = await $('.mbgen', result)[11];
    const items = await targetHtmlContainer.children[0].children[1].children[0]
      .children[1];
    console.log(items);
    // console.log(targetHtmlContainer);
    // const targetHtmlContainer = await page.$('.mbgen');
    // console.log(targetHtmlContainer);

    await browser.close();
  } catch (e) {
    console.log('Error: ', e);
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
