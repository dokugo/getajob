const rp = require('request-promise');
const $ = require('cheerio');
const hh = 'https://yaroslavl.hh.ru/search/vacancy?area=112&st=searchVacancy&text=react';
//const url = 'https://yaroslavl.hh.ru/search/vacancy?L_is_autosearch=false&amp;area=112&amp;clusters=true&amp;enable_snippets=true&amp;text=react&amp;page=1';

//const hhParse = require('./parser');

const getFirstPage = function(url = hh, count = 20) {
  return rp(url, count)
  .then(function(html) {

    const jobLinks = [];
    for (let i = 0; i < count; i++) {
      jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
    }
    console.log(jobLinks);
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
    for (let i = 0; i < 2; i++) {
      jobLinks.push($('span.g-user-content > a.bloko-link', html)[i].attribs.href);
    }
    console.log(jobLinks);
    return jobLinks;
  })
  .catch(function(err) {
    //handle error
  });
};

const getNextPageInfo = function(html, headerNumber) {
    const nextPageBtnHref = $('.HH-Pager-Controls-Next', html)[0].attribs.href;
    const nextPageUrl = 'https://yaroslavl.hh.ru' + nextPageBtnHref;
    const count = headerNumber - 20;
    console.log(nextPageUrl, count);
    getNextPage(nextPageUrl, count);
/*     return Promise(
      getNextPage(nextPageUrl, count)
    ); */
}

rp(hh)
  .then(function(html) {
    const headerText = $('.HH-SearchVacancyDropClusters-Header', html).text();
    const headerNumber = headerText.replace(/\D/g,'');
    console.log(headerNumber, 'main fn');
    getFirstPage()
    if (headerNumber > 20) {
      getNextPageInfo(html, headerNumber)
    }
  })
  .catch(function(err) {
    //handle error
  });

/* const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
      return {
        name: $('.firstHeading', html).text(),
        birthday: $('.bday', html).text(),
      };
    })
    .catch(function(err) {
      //handle error
    });
};

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function(html) {
    //success!
    const wikiUrls = [];
    for (let i = 0; i < 5; i++) {
      wikiUrls.push($('big > a', html)[i].attribs.href);
    }
    return Promise.all(
      wikiUrls.map(function(url) {
        return potusParse('https://en.wikipedia.org' + url);
      })
    );
  })
  .then(function(presidents) {
    console.log(presidents);
  })
  .catch(function(err) {
    //handle error
    console.log(err);
  });
 */