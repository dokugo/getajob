const express = require('express');

const rp = require('request-promise');
const $ = require('cheerio');

const URL = 'https://yaroslavl.hh.ru/search/vacancy?order_by=publication_time&area=112&text=react';


/* const URL = 'https://yaroslavl.hh.ru/search/vacancy?L_is_autosearch=false&area=112&clusters=true&enable_snippets=true&text=react&page=1';
 */

/* const URL = 'https://yaroslavl.hh.ru/search/vacancy?area=112&st=searchVacancy&text=javascript';
 */
//const hhParse = require('./parser');

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000!'));

const cors = require("cors")
app.use(cors())


const getFirstPage = function (url = hh, count = 20) {
  return rp(url, count)
    .then(function (html) {

      const jobLinks = [];
      for (let i = 0; i < count; i++) {
        jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
      }
      // console.log(jobLinks);
      return jobLinks;
    })
    .catch(function (err) {
      //handle error
    });
};

const getNextPage = function (url, count) {
  return rp(url, count)
    .then(function (html) {

      const jobLinks = [];
      for (let i = 0; i < count; i++) {
        jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
      }
      // console.log(jobLinks);
      return jobLinks;
    })
    .catch(function (err) {
      //handle error
    });
};
const getNextPageInfo = function (html, vacanciesAmount) {
  const NEXT_PAGE = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
  const nextPageUrl = 'https://yaroslavl.hh.ru' + NEXT_PAGE;
  const count = vacanciesAmount - 20;
  //console.log(nextPageUrl, count);
  return getNextPage(nextPageUrl, count);
  /*     return Promise(
        getNextPage(nextPageUrl, count)
      ); */
}

const parseArr = () => {

}


rp(URL)
  .then(function (html) {
    const vacanciesAmountText = $('.HH-SearchVacancyDropClusters-Header', html).text();
    const vacanciesAmount = vacanciesAmountText.replace(/\D/g, '');
    console.log(vacanciesAmount, 'vacancies');

    /*     const vacanciesPages = Math.round(vacanciesAmount / 20);
        console.log(`${vacanciesPages} pages`); */

    let NEXT_PAGE = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
    let nextPageUrl = 'https://yaroslavl.hh.ru' + NEXT_PAGE;

    let NEXT_PAGE_BTN = $('.HH-Pager-Controls-Next', html)

    //console.log(NEXT_PAGE);

    let paginationBtnTxt = $('[data-qa=pager-block] .bloko-button_pressed', html).text();
    console.log(paginationBtnTxt, 'page')

    /*     let title = $('.HH-LinkModifier', html)[0].children[0].data;
        console.log(title) */

    let vacancies = [];
    for (let i = 0; i < 20; i++) {
      vacancies.push({
        page: paginationBtnTxt,
        number: i,
        title: $('.HH-LinkModifier', html)[i].children[0].data,
        date: $('.vacancy-serp-item__publication-date', html)[i].children[0].data,
        link: $('span.g-user-content > a.bloko-link', html)[i].attribs.href
      });
    }
    console.log(vacancies);
    //return vacancies;


    if (NEXT_PAGE) {
      /*       return rp(nextPageUrl, count = 20)
              .then(function (html) {
                const jobLinks = [];
                for (let i = 0; i < count; i++) {
                  jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
                }
                console.log(jobLinks);
                return jobLinks;
              })
              .catch(function (err) {
                //handle error
              }); */
    }


    /*     if (vacanciesAmount > 20) {
          return Promise.all(
            [getNextPageInfo(html, vacanciesAmount), getFirstPage()]
          )
        } else {
          return Promise.all(
            [getFirstPage()]
          )
          
        } */
  })
  .then(function (item) {
    //console.log(item)
    const linksArr = item[0].concat(item[1]);
    console.log(linksArr);
    //return linksArr;
    /*     app.get('/api', (req, res) => {
          res.status(200).send(linksArr);
        }); */
  })
  .catch(function (err) {
    //handle error
  });
