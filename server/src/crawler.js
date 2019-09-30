/* const puppeteer = require('puppeteer'); */

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

async function getPage(URL, page) {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    const parsePage = await page.evaluate(() => {
      const nextPageUrl = document.querySelector('[data-qa=pager-next]')
        ? document.querySelector('[data-qa=pager-next]').href
        : null;

      const getVacancyData = {
        title: i => {
          return document.querySelectorAll(
            '[data-qa=vacancy-serp__vacancy-title]'
          )[i].textContent;
        },
        compensation: i => {
          return document.querySelectorAll(
            '[data-qa=vacancy-serp__vacancy-title]'
          )[i]
            ? document.querySelectorAll(
                '[data-qa=vacancy-serp__vacancy-title]'
              )[i].textContent
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

      const vacanciesAmountOnPage = document.querySelectorAll(
        'span.g-user-content > a.bloko-link'
      ).length;

      const vacancies = [];
      for (let i = 0; i < vacanciesAmountOnPage; i++) {
        vacancies.push({
          title: getVacancyData.title(i),
          compensation: getVacancyData.compensation(i),
          employer: getVacancyData.employer(i),
          date: getVacancyData.date(i),
          link: getVacancyData.link(i),
          id: getVacancyData.id(i)
        });
      }

      if (nextPageUrl) {
        return { vacancies, nextPageUrl };
      } else {
        return { vacancies };
      }
    });

    return parsePage;
  } catch (error) {
    console.error('Error: ', error);
  }
}

async function crawl(searchKeywords) {
  const URL = getSearchUrl(searchKeywords);
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

      await getNextPageLoop(
        nextPageUrl
      ) /* .then(() =>
        console.log('end' , output)
      ) */;
      await browser.close();
      return output;
    } else {
      // console.log('last page');
      // console.log('end' /* , output */);
      await browser.close();
      return output;
    }
    // console.log(output);
    // await page.screenshot({ path: 'stealth-ma-result.png', fullPage: true });
  } catch (error) {
    console.error('Error: ', error);
  }
}

module.exports = crawl;
