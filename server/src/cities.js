const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const hiddenUserAgent = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(stealth);
puppeteer.use(hiddenUserAgent({ makeWindows: true }));

const getPage = async (URL, page) => {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    const parsePage = await page.evaluate(() => {
      const getVacancyData = {
        link: i => {
          return document
            .querySelectorAll('.clusters-value')
            [i].href.replace(/[\D]/g, '');
        },
        text: i => {
          return document
            .querySelectorAll('.clusters-value__name')
            [i].textContent.trim();
        }
      };

      const itemsAmountOnPage = document.querySelectorAll('.clusters-value')
        .length;

      const data = [];
      for (let i = 0; i < itemsAmountOnPage; i++) {
        data.push({
          link: getVacancyData.link(i),
          text: getVacancyData.text(i)
        });
      }

      return data;
    });

    return parsePage;
  } catch (error) {
    console.error('Error: ', error);
  }
};

let browser;

const cities = async () => {
  const URL = `https://yaroslavl.hh.ru/search/vacancy`;

  try {
    if (!browser) {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--window-size=1920,1080'
        ],
        defaultViewport: { width: 1920, height: 1080 },
        headless: false
      });
    }

    const page = await browser.newPage();

    page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'document') {
        request.continue();
      } else {
        request.abort();
      }
    });

    page.setViewport({ width: 1920, height: 937 });

    const result = await getPage(URL, page);
    const output = result;

    await page.close();
    return output;
  } catch (error) {
    console.error('Error: ', error);
  }
};

module.exports = cities;
