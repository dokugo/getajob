const express = require('express');

const rp = require('request-promise');
const $ = require('cheerio');

// const URL = 'https://yaroslavl.hh.ru/search/vacancy?order_by=publication_time&area=112&text=react+native';
// const URL = 'https://yaroslavl.hh.ru/search/vacancy?order_by=publication_time&area=112&text=react';
const URL = 'https://yaroslavl.hh.ru/search/vacancy?order_by=publication_time&area=112&text=javascript';


/* const URL = 'https://yaroslavl.hh.ru/search/vacancy?L_is_autosearch=false&area=112&clusters=true&enable_snippets=true&text=react&page=1';
 */

/* const URL = 'https://yaroslavl.hh.ru/search/vacancy?area=112&st=searchVacancy&text=javascript';
 */
//const hhParse = require('./parser');

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000!'));

const cors = require("cors")
app.use(cors())

const getNextPage = (nextPageUrl) => {
  return rp(nextPageUrl)
    .then(function (html) {

      const vacanciesAmountOnPage = $('span.g-user-content > a.bloko-link', html).length

      if ($('.HH-Pager-Controls-Next', html).length) {
        var NEXT_PAGE = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
        var nextPageUrl = 'https://yaroslavl.hh.ru' + NEXT_PAGE;
      } else {
        var NEXT_PAGE = null;
      }

      let paginationBtnTxt = $('[data-qa=pager-block] .bloko-button_pressed', html).text();
      console.log(paginationBtnTxt, 'page')

      let vacancies = [];

      for (let i = 0; i < 1; i++) {
        vacancies.push({
          page: paginationBtnTxt,
          number: i,
          title: $('.HH-LinkModifier', html)[i].children[0].data,
          date: $('.vacancy-serp-item__publication-date', html)[i].children[0].data,
          link: $('span.g-user-content > a.bloko-link', html)[i].attribs.href
        });
      }
      // console.log(vacancies);
      // console.log(nextPageUrl);
      if (nextPageUrl) {
        return { vacancies, nextPageUrl };
      } else {
        return { vacancies };
      }

    })
    .catch(function (err) {
      //handle error
    });
};

rp(URL)
  .then(html => {
    var a = 1;

    const vacanciesAmountTotalText = $('.HH-SearchVacancyDropClusters-Header', html).text();
    const vacanciesAmountTotal = vacanciesAmountTotalText.replace(/\D/g, '');
    console.log(vacanciesAmountTotal, 'total vacancies');
    const vacanciesAmountOnPage = $('span.g-user-content > a.bloko-link', html).length;

    if ($('.HH-Pager-Controls-Next', html).length) {
      var NEXT_PAGE = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
      var nextPageUrl = 'https://yaroslavl.hh.ru' + NEXT_PAGE;
    } else {
      var NEXT_PAGE = null;
    }

    const paginationBtnTxt = $('[data-qa=pager-block] .bloko-button_pressed', html).length ? $('[data-qa=pager-block] .bloko-button_pressed', html).text() : '1'
    console.log(paginationBtnTxt, 'page')

    let vacancies = [];
    for (let i = 0; i < 1; i++) {
      vacancies.push({
        page: paginationBtnTxt,
        number: i,
        title: $('.HH-LinkModifier', html)[i].children[0].data,
        date: $('.vacancy-serp-item__publication-date', html)[i].children[0].data,
        link: $('span.g-user-content > a.bloko-link', html)[i].attribs.href
      });
    }

    if (nextPageUrl) {
      return { vacancies, nextPageUrl };
    } else {
      return { vacancies };
    }
  })
  .then(result => {
    //console.log(result)

    // console.log(result.vacancies)
    // console.log(result.nextPageUrl)
    let output = result.vacancies;
    //console.log(output)
    if (result.nextPageUrl) {

      const nextPageUrl = result.nextPageUrl
      const getNextPageLoop = (url) =>
        getNextPage(url).then(result => {
          output.push(result.vacancies)
          //console.log(result)
          if (result.nextPageUrl) {
            return getNextPageLoop(result.nextPageUrl)
          } else {
            console.log('last page')
          }
        })
      getNextPageLoop(nextPageUrl).then(() => console.log('end', output))

    } else {
      console.log('last page')
      console.log('end')
    }
  })
  .catch(function (err) {
    //handle error
  });
