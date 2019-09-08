const express = require('express');

const rp = require('request-promise');
const $ = require('cheerio');

const hh = 'https://yaroslavl.hh.ru/search/vacancy?area=112&st=searchVacancy&text=react';

//const hhParse = require('./parser');

const app = express();
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000!'));

const cors = require("cors")
app.use(cors())


const getFirstPage = function(url = hh, count = 20) {
  return rp(url, count)
  .then(function(html) {

    const jobLinks = [];
    for (let i = 0; i < count; i++) {
      jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
    }
    // console.log(jobLinks);
    return jobLinks;
  })
  .catch(function(err) {
    //handle error
  });
};

const getNextPage = function(url, count) {
  return rp(url, count)
  .then(function(html) {

    const jobLinks = [];
    for (let i = 0; i < count; i++) {
      jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
    }
    // console.log(jobLinks);
    return jobLinks;
  })
  .catch(function(err) {
    //handle error
  });
};
const getNextPageInfo = function(html, vacanciesAmount) {
    const nextPageBtnHref = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
    const nextPageUrl = 'https://yaroslavl.hh.ru' + nextPageBtnHref;
    const count = vacanciesAmount - 20;
    //console.log(nextPageUrl, count);
    return getNextPage(nextPageUrl, count);
/*     return Promise(
      getNextPage(nextPageUrl, count)
    ); */
}

const parseArr = () => {

}

rp(hh)
  .then(function(html) {
    const vacanciesAmountText = $('.HH-SearchVacancyDropClusters-Header', html).text();
    const vacanciesAmount = vacanciesAmountText.replace(/\D/g,'');
    // console.log(vacanciesAmount, 'main fn');

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
  .then(function(item) {
    //console.log(item)
    const linksArr = item[0].concat(item[1]);
    console.log(linksArr);
    //return linksArr;
/*     app.get('/api', (req, res) => {
      res.status(200).send(linksArr);
    }); */
  })
  .catch(function(err) {
    //handle error
  });

