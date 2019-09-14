const express = require('express');

const rp = require('request-promise');
const $ = require('cheerio');

const rootDomain = `https://yaroslavl.hh.ru/search/vacancy?`;
const params = `order_by=publication_time&area=112&text=`;

// const URL = `${rootDomain}${params}react+native`
const URL = `${rootDomain}${params}vue`;
// const URL = `${rootDomain}${params}react`;
// const URL = `${rootDomain}${params}javascript`;

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000'));

const cors = require('cors');
app.use(cors());

const getPage = url => {
  return rp(url)
    .then(html => {
      // get next page url if it is exists
      const NEXT_PAGE = $('.HH-Pager-Controls-Next', html).length
        ? $('.HH-Pager-Controls-Next', html)[0].attribs.href
        : null;
      const nextPageUrl = NEXT_PAGE
        ? `https://yaroslavl.hh.ru${NEXT_PAGE}`
        : null;

      // get current page number
      const paginationBtnTxt = $(
        '[data-qa=pager-block] .bloko-button_pressed',
        html
      ).length
        ? $('[data-qa=pager-block] .bloko-button_pressed', html).text()
        : '1';
      console.log(paginationBtnTxt, 'page');

      const getData = i => {
        return $('[data-qa=vacancy-serp__vacancy-title]', html)[i].parent.parent
          .parent.next.children[0]
          ? $('[data-qa=vacancy-serp__vacancy-title]', html)[i].parent.parent
              .parent.next.children[0].children[0].data
          : 'Зарплата не указана';
      };

      // get vacancies data and put it into array of objects
      const vacanciesAmountOnPage = $(
        'span.g-user-content > a.bloko-link',
        html
      ).length;
      const vacancies = [];
      for (let i = 0; i < vacanciesAmountOnPage; i++) {
        vacancies.push({
          page: paginationBtnTxt,
          number: i + 1 + '',
          title: $('[data-qa=vacancy-serp__vacancy-title]', html)[i].children[0]
            .data,
          compensation: getData(i),
          employer: $('[data-qa=vacancy-serp__vacancy-employer]', html)[
            i
          ].children[0].data.trim(),
          date: $('[data-qa=vacancy-serp__vacancy-date] span', html)[i]
            .children[0].data,
          link: $('span.g-user-content > a.bloko-link', html)[i].attribs.href
        });
      }

      if (nextPageUrl) {
        return { vacancies, nextPageUrl };
      } else {
        return { vacancies };
      }
    })
    .catch(function(err) {
      console.log('Error: ', err);
      console.error('Error: ', err);
    });
};

rp(URL)
  .then(html => {
    // get total amount of vacancies
    const vacanciesAmountTotalText = $(
      '.HH-SearchVacancyDropClusters-Header',
      html
    ).text();
    const vacanciesAmountTotal = vacanciesAmountTotalText.replace(/\D/g, '');
    console.log(vacanciesAmountTotal, 'total vacancies');

    // get first page
    return getPage(URL);
  })
  .then(result => {
    // console.log(result)
    const output = result.vacancies;

    // get next page if it is exists
    if (result.nextPageUrl) {
      const nextPageUrl = result.nextPageUrl;

      const getNextPageLoop = url =>
        getPage(url).then(result => {
          // concatenate next page data to previous pages data
          output.push(...result.vacancies);
          // console.log(result)
          if (result.nextPageUrl) {
            return getNextPageLoop(result.nextPageUrl);
          } else {
            console.log('last page');
          }
        });

      getNextPageLoop(nextPageUrl).then(() => console.log('end', output));
      return output;
    } else {
      console.log('last page');
      console.log('end', output);
      return output;
    }
  })
  .then(output => {
    app.get('/', (req, res) => {
      return res.status(200).send('GET root');
    });
    app.get('/api', (req, res) => {
      res.status(200).send(output);
    });
  })
  .catch(function(err) {
    console.log('Error: ', err);
    console.error('Error: ', err);
  });
