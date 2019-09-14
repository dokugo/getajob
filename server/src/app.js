const express = require('express')

const rp = require('request-promise')
const $ = require('cheerio')

const rootDomain = 'https://yaroslavl.hh.ru/search/vacancy?'

// const URL = `${rootDomain}order_by=publication_time&area=112&text=react+native`
// const URL = `${rootDomain}order_by=publication_time&area=112&text=vue`
const URL = `${rootDomain}order_by=publication_time&area=112&text=react`
// const URL = `${rootDomain}order_by=publication_time&area=112&text=javascript`

const app = express()
app.listen(9000, () => console.log('Nightcrawler app listening on port 9000!'))

const cors = require('cors')
app.use(cors())

const getPage = url => {
  return rp(url)
    .then(html => {
      if ($('.HH-Pager-Controls-Next', html).length) {
        var NEXT_PAGE = $('.HH-Pager-Controls-Next', html)[0].attribs.href
        var nextPageUrl = 'https://yaroslavl.hh.ru' + NEXT_PAGE
      } else {
        // eslint-disable-next-line no-redeclare
        var NEXT_PAGE = null
      }

      const paginationBtnTxt = $(
        '[data-qa=pager-block] .bloko-button_pressed',
        html
      ).length
        ? $('[data-qa=pager-block] .bloko-button_pressed', html).text()
        : '1'
      console.log(paginationBtnTxt, 'page')

      const vacanciesAmountOnPage = $(
        'span.g-user-content > a.bloko-link',
        html
      ).length
      const vacancies = []
      for (let i = 0; i < vacanciesAmountOnPage; i++) {
        vacancies.push({
          page: paginationBtnTxt,
          number: i,
          title: $('.HH-LinkModifier', html)[i].children[0].data,
          date: $('.vacancy-serp-item__publication-date', html)[i].children[0]
            .data,
          link: $('span.g-user-content > a.bloko-link', html)[i].attribs.href
        })
      }

      if (nextPageUrl) {
        return { vacancies, nextPageUrl }
      } else {
        return { vacancies }
      }
    })
    .catch(function(err) {
      console.log('Error: ', err)
      console.error('Error: ', err)
    })
}

rp(URL)
  .then(html => {
    const vacanciesAmountTotalText = $(
      '.HH-SearchVacancyDropClusters-Header',
      html
    ).text()
    const vacanciesAmountTotal = vacanciesAmountTotalText.replace(/\D/g, '')
    console.log(vacanciesAmountTotal, 'total vacancies')

    return getPage(URL)
  })
  .then(result => {
    // console.log(result)
    const output = result.vacancies
    if (result.nextPageUrl) {
      const nextPageUrl = result.nextPageUrl
      const getNextPageLoop = url =>
        getPage(url).then(result => {
          output.push(...result.vacancies)
          // console.log(result)
          if (result.nextPageUrl) {
            return getNextPageLoop(result.nextPageUrl)
          } else {
            console.log('last page')
          }
        })
      getNextPageLoop(nextPageUrl).then(() => console.log('end', output))
      return output
    } else {
      console.log('last page')
      console.log('end', output)
      return output
    }
  })
  .then(output => {
    app.get('/', (req, res) => {
      return res.send('GET HTTP method on user resource')
    })
    app.get('/api', (req, res) => {
      res.status(200).send(output)
    })
  })
  .catch(function(err) {
    console.log('Error: ', err)
    console.error('Error: ', err)
  })
