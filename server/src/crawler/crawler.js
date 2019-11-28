const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const hiddenUserAgent = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(stealth);
puppeteer.use(hiddenUserAgent({ makeWindows: true }));

const getSearchUrl = searchKeywords => {
  const rootDomain = `https://yaroslavl.hh.ru/search/vacancy?`;
  const params = `order_by=publication_time&area=112&text=`;
  const URL = `${rootDomain}${params}${searchKeywords}`;
  return URL;
};

const getPage = async (URL, page) => {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    const parsePage = await page.evaluate(() => {
      const nextPageUrl = document.querySelector('[data-qa=pager-next]')
        ? document.querySelector('[data-qa=pager-next]').href
        : null;

      const getData = {
        title: i => {
          return document.querySelectorAll(
            '[data-qa=vacancy-serp__vacancy-title]'
          )[i].textContent;
        },
        salary: i => {
          return document.querySelectorAll(
            '[data-qa=vacancy-serp__vacancy-title]'
          )[i].parentNode.parentNode.parentNode.nextSibling.firstChild
            ? document.querySelectorAll(
                '[data-qa=vacancy-serp__vacancy-title]'
              )[i].parentNode.parentNode.parentNode.nextSibling.firstChild
                .textContent
            : 'Зарплата не указана';
        },
        employer: i => {
          return document
            .querySelectorAll('[data-qa=vacancy-serp__vacancy-employer]')
            [i].textContent.trim();
        },
        date: i => {
          return document.querySelectorAll(
            '[data-qa=vacancy-serp__vacancy-date] span'
          )[i].textContent;
        },
        link: i => {
          return document.querySelectorAll(
            'span.g-user-content > a.bloko-link'
          )[i].href;
        },
        id: i => {
          return document
            .querySelectorAll('span.g-user-content > a.bloko-link')
            [i].href.replace(/[^0-9]+/g, '');
        }
      };

      const itemsAmount = document.querySelectorAll(
        'span.g-user-content > a.bloko-link'
      ).length;

      const data = [];
      for (let i = 0; i < itemsAmount; i++) {
        data.push({
          title: getData.title(i),
          salary: getData.salary(i),
          employer: getData.employer(i),
          date: getData.date(i),
          link: getData.link(i),
          id: getData.id(i)
        });
      }

      if (nextPageUrl) {
        return { data, nextPageUrl };
      } else {
        return { data };
      }
    });

    return parsePage;
  } catch (error) {
    console.error('Error: ', error);
  }
};

let browser;

const crawl = async searchKeywords => {
  try {
    const URL = getSearchUrl(searchKeywords);

    if (!browser) {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--window-size=1920,1080'
        ],
        defaultViewport: { width: 1920, height: 1080 },
        headless: true
      });
    }

    const page = await browser.newPage();

    // default Chromium window.innerWidth & window.innerHeight: 1980x937 (969 window.innerHeight if bookmarks bar isn't present)
    page.setViewport({ width: 1920, height: 937 });

    page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'document') {
        request.continue();
      } else {
        request.abort();
      }

      // custom request interception; icons aren't blocked
      /*       if (
        request.resourceType() === 'stylesheet' ||
        request.resourceType() === 'font' ||
        request.resourceType() === 'image' ||
        request.resourceType() === 'script' ||
        request.resourceType() === 'media'
      ) {
        request.abort();
      } else {
        request.continue();
      } */
    });

    const result = await getPage(URL, page);

    const { data, nextPageUrl } = result;

    // get next page if it exists
    if (nextPageUrl) {
      let multipageData = [...data];

      const getNextPageLoop = async nextPageUrl => {
        const result = await getPage(nextPageUrl, page);
        // concatenate next page data to previous pages data
        multipageData = [...multipageData, ...result.data];
        if (result.nextPageUrl) {
          await getNextPageLoop(result.nextPageUrl);
        }
      };

      await getNextPageLoop(nextPageUrl);

      // await page.screenshot({ path: 'screenshot.png', fullPage: true });
      // await browser.close();

      await page.close();
      return multipageData;
    } else {
      // await page.screenshot({ path: 'screenshot.png', fullPage: true });
      // await browser.close();

      await page.close();
      return data;
    }
  } catch (error) {
    console.error('Error: ', error);
  }
};

module.exports = crawl;
