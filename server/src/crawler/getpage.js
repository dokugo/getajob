const getPage = async (URL, page) => {
  try {
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 0 });

    const parsePage = await page.evaluate(() => {
      const selector = {
        nextPageUrl: () => {
          const result = document.querySelector('[data-qa=pager-next]')
            ? document.querySelector('[data-qa=pager-next]').href
            : null;
          return result;
        },

        itemsAmount: () => {
          return document.querySelectorAll('span.g-user-content > a.bloko-link')
            .length;
        },

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

      const nextPageUrl = selector.nextPageUrl();
      const itemsAmount = selector.itemsAmount();

      const data = [];
      for (let i = 0; i < itemsAmount; i++) {
        data.push({
          title: selector.title(i),
          salary: selector.salary(i),
          employer: selector.employer(i),
          date: selector.date(i),
          link: selector.link(i),
          id: selector.id(i)
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

module.exports = getPage;
