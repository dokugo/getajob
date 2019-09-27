const puppeteer = require('puppeteer-extra');
/* const puppeteer = require('puppeteer'); */
const $ = require('cheerio');

const stealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(stealth);
// const UserAgentPlugin = require('puppeteer-extra-plugin-anonymize-ua');
// puppeteer.use(UserAgentPlugin({ makeWindows: true }));

const search = searchRequest => {
  const rootDomain = `https://yaroslavl.hh.ru/search/vacancy?`;
  const params = `order_by=publication_time&area=112&text=`;
  const URL = `${rootDomain}${params}${searchRequest}`;
  return URL;

  // let searchRequest = searchRequests.react;
};

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
      // await browser.close();
      return output;
    } else {
      console.log('last page');
      console.log('end' /* , output */);
      // await browser.close();
      return output;
    }
    // console.log(output);
    // await page.screenshot({ path: 'stealth-ma-result.png', fullPage: true });
  } catch (e) {
    console.error('Error: ', e);
  }
}

module.exports = crawl;
